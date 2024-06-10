import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextAuthInstaller: Installer = ({
  projectDir,
  packages,
}) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const usingNextAuthWithFirebase = packages?.nextAuthWithFirebase.inUse;
  const usingNextAuthWithMockUserEncryption = packages?.nextAuthWithMockUserEncryption.inUse;

  const usingEncryption = packages?.encryption.inUse

  const deps: AvailableDependencies[] = ["next-auth"];
  if (usingPrisma) deps.push("@auth/prisma-adapter");
  if (usingDrizzle) deps.push("@auth/drizzle-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const routeHandlerFile = "src/app/api/auth/[...nextauth]/route.ts";
  const srcToUse = routeHandlerFile ;

  const apiHandlerSrc = path.join(extrasDir, srcToUse);
  const apiHandlerDest = path.join(projectDir, srcToUse);

  const authConfigSrc = path.join(
    extrasDir,
    "src/server",
     "auth-app",
    usingPrisma
      ? "with-prisma.ts"
      : usingDrizzle
        ? "with-drizzle.ts"
        : usingNextAuthWithFirebase
          ? "base.ts" // TODO: implement case: usingNextAuthWithFirebase
          : usingNextAuthWithMockUserEncryption
            ? usingEncryption ? "with-encryption.ts": "with-credential.ts" // TODO: improve readability
            : "base.ts"
  );
  const authConfigDest = path.join(projectDir, "src/server/auth.ts");

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(authConfigSrc, authConfigDest);

  // TODO: copy mock user data if usingNextAuthWithMockUserEncryption wit encrypt data or not depends on usingEncryption
};
