import { request, RequestOptions } from "https";
import { credentials } from "../secret/credentials";

export function getHabReqOpts(method: "POST" | "GET", apiPathSuffix: string): RequestOptions {
    const options: RequestOptions = {
        method: method,
        host: "habitica.com",
        path: apiPathSuffix,
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        }
    }

return options;
}

export function callHabApi(options: RequestOptions, onEnd?: (data?) => void): any {
    const req = request(options, (res) => {
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
            if (onEnd) { 
                const jsonData = JSON.parse(body);
                onEnd(jsonData);
            }
        });
    });
    req.end();
}