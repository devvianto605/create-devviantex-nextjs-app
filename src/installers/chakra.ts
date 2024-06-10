import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const chakraInstaller: Installer = ({
  projectDir,
  packages
}) => {
  const deps: AvailableDependencies[] = [
    "@chakra-ui/icons",
    "@chakra-ui/next-js",
    "@chakra-ui/react",
    "@emotion/react",
    "@emotion/styled",
    "@hookform/resolvers",
    "react-hook-form",
    "framer-motion"];

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

  copyFolder("chakra/components", "src/components");
  copyFolder("chakra/themes", "src/themes");
  copyFolder("chakra/providers", "src/providers");

};
