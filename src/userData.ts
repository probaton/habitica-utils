import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";
import { credentials } from "../secret/credentials";

export function requestUserData(callback: (res: IncomingMessage) => void) {
    const options: RequestOptions = {
        method: "GET",
        host: "habitica.com",
        path: "/export/userdata.json",
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        }
    }

    const req = request(options, callback);
    req.end();
}