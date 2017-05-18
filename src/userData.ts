import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";
import { credentials } from "../secret/credentials";
import { IHabiticaData } from "src/IHabiticaData";

export function requestUserData(onEnd: (userData: IHabiticaData) => void) {
    const options: RequestOptions = {
        method: "GET",
        host: "habitica.com",
        path: "/export/userdata.json",
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        }
    }
    
    const req = request(options, (res) => {
        console.log(">>>> user data status code", res.statusCode);
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            const userData: IHabiticaData = JSON.parse(body);
            onEnd(userData);
        });
    });
    
    req.end();
}