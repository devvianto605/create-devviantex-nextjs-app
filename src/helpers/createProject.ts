import * as fs from "fs";
import path from "path";

import { PKG_ROOT } from "~/consts.js";
import { installPackages } from "~/helpers/installPackages.js";
import { scaffoldProject } from "~/helpers/scaffoldProject.js";
import {
  selectLayoutFile,
  selectPageFile,
} from "~/helpers/selectBoilerplate.js";
import {
  type DatabaseProvider,
  type PkgInstallerMap,
} from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { getAppDestIndexPath } from "~/helpers/getPath.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  scopedAppName: string;
  noInstall: boolean;
  importAlias: string;
  databaseProvider: DatabaseProvider;
}

export const createProject = async ({
  projectName,
  scopedAppName,
  packages,
  noInstall,
  databaseProvider,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    scopedAppName,
    noInstall,    
    databaseProvider,
  });

  // Install the selected packages
  installPackages({
    projectName,
    scopedAppName,
    projectDir,
    pkgManager,
    packages,
    noInstall,
    databaseProvider,
  });

  // Select necessary _app,index / layout,page files
    // Replace next.config
    fs.copyFileSync(
      path.join(PKG_ROOT, "template/extras/config/next-config-appdir.js"),
      path.join(projectDir, "next.config.js")
    );

    selectLayoutFile({ projectDir, packages });
    selectPageFile({ projectDir, packages });

  // TODO: Implement protected path and create middleware example if NextAuth is available to demonstrate middleware usage

  // If no tailwind, select use css modules
  if (!packages.tailwind.inUse) {

    const usingIntl = packages.intl.inUse;
    const usingNextAuth = packages.nextAuthWithGoogle.inUse;

    const indexModuleCss = path.join(
      PKG_ROOT,
      "template/extras/src/index.module.css"
    );
    const indexModuleCssDest = path.join(
      projectDir,
      getAppDestIndexPath({usingNextAuth, usingIntl}),
      "index.module.css"
    );
    fs.copyFileSync(indexModuleCss, indexModuleCssDest);
  }

  return projectDir;
};
