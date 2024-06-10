import { PKG_ROOT } from "~/consts";
import path from "path";
import fs from "fs-extra";

const extrasDir = path.join(PKG_ROOT, "template/extras");

export const copyFile = ({ projectDir, src, dest }: { projectDir: string, src: string, dest: string }) => {
    const srcFile = src;
    const destFile = dest;
    const srcFilePath = path.join(extrasDir, srcFile);
    const destFilePath = path.join(projectDir, destFile);
    fs.copySync(srcFilePath, destFilePath);
}

// Function to copy an entire folder
export const copyFolder = ({ projectDir, srcFolder, destFolder }: { projectDir: string, srcFolder: string, destFolder: string }) => {
    const srcFolderPath = path.join(extrasDir, srcFolder);
    const destFolderPath = path.join(projectDir, destFolder);
    fs.copySync(srcFolderPath, destFolderPath);
};