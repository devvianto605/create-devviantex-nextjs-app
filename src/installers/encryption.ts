import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const encryptionInstaller: Installer = ({
  projectDir,
}) => {
  const deps: AvailableDependencies[] = ["crypto-js"];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const srcFile = "encryption/lib/encryption.ts";
  const destFile = "src/lib/encryption.ts";

  const srcFilePath = path.join(extrasDir, srcFile);
  const destFilePath = path.join(projectDir, destFile);

  fs.copySync(srcFilePath, destFilePath);
};
