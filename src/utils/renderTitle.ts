import figlet from "figlet";
import gradient from "gradient-string";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  orange: "#FF7605",
  cyan: "#ffbe0b",
  red: "#ff006e",
  green: "#5de4c7",
  magenta: "#8338ec",
  yellow: "#3a86ff",
  deep_orange: "#fb5607",
};

export const renderTitle = () => {
  const t3Gradient = gradient(Object.values(poimandresTheme));

  // resolves weird behavior where the ascii is offset
  const pkgManager = getUserPkgManager();
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("");
  }
  console.log(t3Gradient.multiline(figlet.textSync("Devviantex App")));
};
