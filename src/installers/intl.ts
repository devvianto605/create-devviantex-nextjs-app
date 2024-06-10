import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyFile } from "~/helpers/copy";

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


  copyFile({
    projectDir,
    src: "intl/messages/en/en.json",
    dest: "messages/en/en.json"
  })

  copyFile({
    projectDir,
    src: "intl/messages/th/th.json",
    dest: "messages/th/th.json"
  })

  copyFile({
    projectDir,
    src: "intl/src/app/layout.tsx",
    dest: "src/app/layout.tsx"
  })

  copyFile({
    projectDir,
    src: "intl/src/app/not-found.tsx",
    dest: "src/app/not-found.tsx"
  })

  copyFile({
    projectDir,
    src: "intl/src/lib/next-intl/navigation.ts",
    dest: "src/lib/next-intl/navigation.ts"
  })

  copyFile({
    projectDir,
    src: "intl/src/lib/next-intl/index.ts",
    dest: "src/lib/next-intl/index.ts"
  })

  copyFile({
    projectDir,
    src: "intl/src/i18n.ts",
    dest: "src/i18n.ts"
  })

  if (usingAuth) {
    copyFile({
      projectDir,
      src: "intl/src/middleware-intl-auth.ts",
      dest: "src/middleware.ts"
    })
    copyFile({
      projectDir,
      src: "intl/src/routes.ts",
      dest: "src/routes.ts"
    })
  } else {
    copyFile({
      projectDir,
      src: "intl/src/middleware-intl.ts",
      dest: "src/middleware.ts"
    })
  }

  // TODO: Wrap up translation-management-service and copy it to created project
}
