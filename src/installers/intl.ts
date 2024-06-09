import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const intlInstaller: Installer = ({
  projectDir,
  packages
}) => {
  const deps: AvailableDependencies[] = ["next-intl"];

  const usingAuth = packages?.nextAuthWithGoogle.inUse || packages?.nextAuthWithMockUserEncryption.inUse || packages?.nextAuthWithFirebase.inUse;

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const copyFile = ({src,dest}:{src:string,dest:string}) => {
    const srcFile = src ;
    const destFile = dest;
    const srcFilePath = path.join(extrasDir, srcFile);
    const destFilePath = path.join(projectDir, destFile);
     fs.copySync(srcFilePath, destFilePath);
  }

  copyFile({
    src: "intl/message/en/en.json",
    dest: "message/en/en.json"
  })

  copyFile({
    src: "intl/message/th/th.json",
    dest: "message/th/th.json"
  })

  copyFile({
    src: "intl/src/app/layout.tsx",
    dest: "src/app/layout.tsx"
  })

  copyFile({
    src: "intl/src/app/not-found.tsx",
    dest: "src/app/not-found.tsx"
  })

  copyFile({
    src: "intl/src/libs/next-intl/navigation.ts",
    dest: "src/libs/next-intl/navigation.ts"
  })

  copyFile({
    src: "intl/src/libs/next-intl/index.ts",
    dest: "src/libs/next-intl/index.ts"
  })

  copyFile({
    src: "intl/src/i18n.ts",
    dest: "src/i18n.ts"
  })

  if(usingAuth) {
    copyFile({
    src: "intl/src/middleware-intl-auth.ts",
    dest: "src/middleware.ts"
  })
  } else {
    copyFile({
        src: "intl/src/middleware-intl.ts",
        dest: "src/middleware.ts"
    })
  }
  
  // TODO: Wrap up translation-management-service and copy it to created project
}
