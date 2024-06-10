import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyFile, copyFolder } from "~/helpers/copy";

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

  copyFolder({ projectDir, srcFolder: "shadcn/components/form", destFolder: "src/components/form" });

  copyFile({
    projectDir,
    src: "shadcn/lib/utils.ts",
    dest: "src/lib/utils.ts"
  })

  copyFile({
    projectDir,
    src: "shadcn/lib/utils.ts",
    dest: "src/lib/utils.ts"
  })

  copyFile({
    projectDir,
    src: "shadcn/components.json",
    dest: "src/components.json"
  })

  // TODO: Still does't adapt core component required to use Shadcn CLI to import components
};
