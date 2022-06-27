import type { PkgInstallerMap } from "../installers";
import chalk from "chalk";
import { getUserPkgManager } from "../utils/getUserPkgManager";
import { logger } from "../utils/logger";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = (
  projectName: string,
  packages: PkgInstallerMap,
) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  logger.info(` cd ${chalk.cyan.bold(projectName)}`);

  if (packages.prisma.inUse) {
    if (pkgManager !== "npm") {
      logger.info(`  ${pkgManager} prisma db push`);
    } else {
      logger.info(`  npx prisma db push`);
    }
  }

  if (pkgManager !== "npm") {
    logger.info(`  ${pkgManager} dev`);
  } else {
    logger.info("  npm run dev");
  }
};
