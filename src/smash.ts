import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";
import { credentials } from "../secret/credentials";
import { IHabit } from "src/IHabiticaData";


export function postSmash(habitId: string, onEnd: (res: IncomingMessage) => void) {
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
        res.setEncoding("utf8");
        if (res.statusCode != 200) {
            res.on("data", (chunk) => {
                console.log("Skill request failed with the following response:", chunk);
            });
        }
        res.on("end", onEnd);
    });

    req.end();
}