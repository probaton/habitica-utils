import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";
import { credentials } from "../secret/credentials";
import { IHabit } from "src/IHabiticaData";


export function postSmash(habitId: string, onEnd: (res: IncomingMessage) => void) {
    // const requestBody = JSON.stringify({ "targetId": habitId });
    // console.log(">>>> request body", requestBody);
    const options: RequestOptions = {
        method: "POST",
        host: "habitica.com",
        path: "/api/v3/user/class/cast/smash?targetId=" + habitId,
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken,
            // "Content-Type": "application/json",
            // "Content-Length": Buffer.byteLength(requestBody)
        }
    }
    
    console.log(">>>> request URL", options.host + options.path);
    
    const req = request(options, (res) => {
        console.log(">>>> smash status code", res.statusCode);
        console.log(">>>> smash message", res.rawHeaders);
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            console.log(">>>> response body", chunk);
        });
        res.on("end", onEnd);
    });

    // req.write(requestBody);
    req.end();
}