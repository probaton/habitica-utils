import * as fs from "fs";
import { getUserData } from "../userData/userData";

export default async function downloadUserData() {
    const userData = await getUserData();
    ensureDirSync("data");
    fs.writeFileSync("data/userData.json", JSON.stringify(userData, undefined, 2));
    return `Data saved in ${process.cwd()}/data/userData.json`;
}

function ensureDirSync(dirPath: string) {
    try {
        fs.mkdirSync(dirPath, { recursive: true });
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }
}
  