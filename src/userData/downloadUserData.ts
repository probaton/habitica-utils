import * as fs from "fs";
import { getUserData } from "../userData/userData";

getUserData(userData => {
    ensureDirSync("data");
    fs.writeFileSync("data/userData.json", JSON.stringify(userData));
    console.log(`Data saved in ${process.cwd()}/data/userData.json`);
});

function ensureDirSync(dirPath: string) {
    try {
        fs.mkdirSync(dirPath, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}
  