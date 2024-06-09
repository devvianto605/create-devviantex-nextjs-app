import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const shadcnInstaller: Installer = ({
  projectDir,
  packages
}) => {
  const deps: AvailableDependencies[] = [
    "@hookform/resolvers",
    "react-hook-form",
  ];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  // Function to copy an entire folder
  const copyFolder = (srcFolder: string, destFolder: string) => {
    const srcFolderPath = path.join(extrasDir, srcFolder);
    const destFolderPath = path.join(projectDir, destFolder);
    fs.copySync(srcFolderPath, destFolderPath);
  };

  copyFolder("shadcn/components/form", "src/components/form");

  const copyFile = ({src,dest}:{src:string,dest:string}) => {
    const srcFile = src ;
    const destFile = dest;
    const srcFilePath = path.join(extrasDir, srcFile);
    const destFilePath = path.join(projectDir, destFile);
     fs.copySync(srcFilePath, destFilePath);
  }

  copyFile({
    src: "shadcn/lib/utils.ts",
    dest: "src/lib/utils.ts"
  })

  copyFile({
    src: "shadcn/lib/utils.ts",
    dest: "src/lib/utils.ts"
  })

  copyFile({
    src: "shadcn/components.json",
    dest: "src/components.json"
  })

  // TODO: Still does't adapt core component required to use Shadcn CLI to import components
};
