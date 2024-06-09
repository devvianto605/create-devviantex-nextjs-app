import * as p from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

import { CREATE_T3_APP, DEFAULT_APP_NAME } from "~/consts.js";
import {
  type AvailablePackages,
  type DatabaseProvider,
} from "~/installers/index.js";
import { getVersion } from "~/utils/getT3Version.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { IsTTYError } from "~/utils/isTTYError.js";
import { logger } from "~/utils/logger.js";
import { validateAppName } from "~/utils/validateAppName.js";
import { validateImportAlias } from "~/utils/validateImportAlias.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;

  /** @internal Used in CI. */
  CI: boolean;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
  databaseProvider: DatabaseProvider;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: [
    "nextAuthWithGoogle", 
    "prisma", 
    "tailwind", 
    "trpc", 
  ],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    CI: false,
    importAlias: "~/",
  },
  databaseProvider: "sqlite",
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;

  const program = new Command()
    .name(CREATE_T3_APP)
    .description("A CLI for creating web applications with the t3 stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new devviantex-app",
      false
    )
    /** START CI-FLAGS */
    /**
     * @experimental Used for CI E2E tests. If any of the following option-flags are provided, we
     *               skip prompting.
     */
    .option("--CI", "Boolean value if we're running in CI", false)
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "-i, --import-alias",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags.importAlias
    )
    /** END CI-FLAGS */
    .version(getVersion(), "-v, --version", "Display the version number")
    .addHelpText(
      "afterAll",
      `\n The t3 stack was inspired by ${chalk
        .hex("#E8DCFF")
        .bold(
          "@t3dotgg"
        )} and has been used to build awesome fullstack applications like ${chalk
        .hex("#E24A8D")
        .underline("https://ping.gg")} \n`
    )
    .parse(process.argv);

  // FIXME: TEMPORARY WARNING WHEN USING YARN 3. SEE ISSUE #57
  if (process.env.npm_config_user_agent?.startsWith("yarn/3")) {
    logger.warn(`  WARNING: It looks like you are using Yarn 3. This is currently not supported,
  and likely to result in a crash. Please run create-devviantex-app with another
  package manager such as pnpm, npm, or Yarn Classic.
  See: https://github.com/t3-oss/create-t3-app/issues/57`);
  }

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  /** @internal Used for CI E2E tests. */
  if (cliResults.flags.CI) {
    cliResults.packages = [];
    cliResults.databaseProvider = "sqlite";

    return cliResults;
  }

  if (cliResults.flags.default) {
    return cliResults;
  }

  // Explained below why this is in a try/catch block
  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
  can provide the arguments from the CLI directly: https://create.t3.gg/en/installation#experimental-usage to skip the prompts.`);

      throw new IsTTYError("Non-interactive environment");
    }

    // if --CI flag is set, we are running in CI mode and should not prompt the user

    const pkgManager = getUserPkgManager();

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: "What will your project be called?",
              defaultValue: cliProvidedName,
              validate: validateAppName,
            }),
        }),
        styling: () => {
          return p.select({
            message: "Which library would you be using for styling?",
            options: [
              { value: "none", label: "None" },
              { value: "tailwind", label: "Tailwind Css" },
              { value: "shadcn", label: "Shadcn Ui (unfinished: only provided form components prototype)" },
              { value: "chakra", label: "Chakra Ui (unfinished: only provided form components)" },
            ],
            initialValue: "none",
          });
        },
        authentication: () => {
          return p.select({
            message: "What authentication provider would you like to use?",
            options: [
              { value: "none", label: "None" },
              { value: "next-auth-google", label: "NextAuth.js with Google OAuth and Prisma/Drizzle Adapter(optional)" },
              { value: "next-auth-firebase", label: "NextAuth.js with Firebase Adapter (unimplemented)" },
              { value: "next-auth-mock", label: "NextAuth.js with mock user data to be used with encryption service (unimplemented)" },
            ],
            initialValue: "none",
          });
        },
        database: async ({results}) => {
          if (results.authentication === "next-auth-google" || results.authentication === "none") {
             return p.select({
            message: "What database ORM would you like to use?",
            options: [
              { value: "none", label: "None" },
              { value: "prisma", label: "Prisma" },
              { value: "drizzle", label: "Drizzle" },
            ],
            initialValue: "none",
          });
          }
         return "none"
        },
        encryption: async ({results}) => {
          if ((results.authentication === "next-auth-google" && results.database === "none") 
            || (results.authentication === "none" && results.database === "none")
            || results.authentication === "next-auth-mock") {
           return p.confirm({
            message: "Do you want to include encryption service into the project to use self-implemented encryption (not use third-party adapter)? (unfinished: not integrated)",
            initialValue: false,
          });
          }
         return false
        },

        databaseProvider: ({ results }) => {
          if (results.database === "none") return;
          return p.select({
            message: "What database provider would you like to use?",
            options: [
              { value: "sqlite", label: "SQLite (LibSQL)" },
              { value: "mysql", label: "MySQL" },
              { value: "postgres", label: "PostgreSQL" },
              { value: "planetscale", label: "PlanetScale" },
            ],
            initialValue: "sqlite",
          });
        },
        trpc: async ({results}) => {
          if (results.authentication === "next-auth-google" || results.authentication === "none") { 
             return p.confirm({
            message: "Would you like to use tRPC? (Recommended if using NextAuth.js with Google OAuth and Prisma/Drizzle Adapter as full-stack app)",
          });
          }
          return false
         
        },
        intl: () => {
          return p.confirm({
         message: "Would you like to use next-intl for localization? (with translation management service) (unfinished: all config's done, not integrated)",
         initialValue: false,
       });
     },
        ...(!cliResults.flags.noGit && {
          git: () => {
            return p.confirm({
              message:
                "Should we initialize a Git repository and stage the changes?",
              initialValue: !defaultOptions.flags.noGit,
            });
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message:
                `Should we run '${pkgManager}` +
                (pkgManager === "yarn" ? `'?` : ` install' for you?`),
              initialValue: !defaultOptions.flags.noInstall,
            });
          },
        }),
        importAlias: () => {
          return p.text({
            message: "What import alias would you like to use?",
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          });
        },
      },
      {
        onCancel() {
          process.exit(1);
        },
      }
    );

    const packages: AvailablePackages[] = [];
    if (project.styling === "tailwind") packages.push("tailwind");
    if (project.styling === "shadcn") packages.push("shadcn");
    if (project.styling === "chakra") packages.push("chakra");

    if (project.trpc) packages.push("trpc");

    if (project.authentication === "next-auth-google") packages.push("nextAuthWithGoogle");
    if (project.database === "prisma") packages.push("prisma");
    if (project.database === "drizzle") packages.push("drizzle");
  
    if (project.authentication === "next-auth-firebase") packages.push("nextAuthWithFirebase");
    if (project.authentication === "next-auth-mock") packages.push("nextAuthWithMockUserEncryption");

    if (project.encryption) packages.push("encryption");

    if (project.intl) packages.push("intl");

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      databaseProvider:
        (project.databaseProvider as DatabaseProvider) || "sqlite",
      flags: {
        ...cliResults.flags,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.install || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
    };
  } catch (err) {
    // If the user is not calling create-devviantex-app from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default Devviantex app
    if (err instanceof IsTTYError) {
      logger.warn(`
  ${CREATE_T3_APP} needs an interactive terminal to provide options`);

      const shouldContinue = await p.confirm({
        message: `Continue scaffolding a default Devviantex app?`,
        initialValue: true,
      });

      if (!shouldContinue) {
        logger.info("Exiting...");
        process.exit(0);
      }

      logger.info(`Bootstrapping a default Devviantex app in ./${cliResults.appName}`);
    } else {
      throw err;
    }
  }

  return cliResults;
};
