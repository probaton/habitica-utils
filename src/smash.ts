import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";
import { credentials } from "../secret/credentials";
import { IHabit } from "src/IHabiticaData";


export function postSmash(habitId: string, onEnd: () => void) {
    const options: RequestOptions = {
        method: "POST",
        host: "habitica.com",
        path: "/api/v3/user/class/cast/smash?targetId=" + habitId,
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken,
        }
    }

    const req = request(options, (res) => {
        console.log(">>>> smash status code", res.statusCode);
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            if (res.statusCode != 200) {
                const bodyJson = JSON.parse(body);
                console.log(`${res.statusCode} ${bodyJson["error"]}: ${bodyJson["message"]}`);
            }
            onEnd();
        });
    });
    req.end();
}
