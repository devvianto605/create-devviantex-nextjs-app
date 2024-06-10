import { Installer } from "~/installers/index.js";
import { copyFolder } from "~/helpers/copy";

export const translationInstaller: Installer = ({
  projectDir,
}) => {

  copyFolder({ projectDir, srcFolder: "intl/translation-management-service/", destFolder: "translation-management-service" });
};
