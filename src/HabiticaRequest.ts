import * as request from "request";
import { credentials } from "../secret/credentials";

export function getHabReqOpts(method: "post" | "get", apiSuffix: string, body?) {
    const options = {
        method: method,
        json: true,
        url: "https://habitica.com" + apiSuffix,
        body: body,
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        }
    };

    return options;
}

export function callHabApi(options, onEnd?: (data?) => void): any {
    request(options, function (err, res, body) {
        if (err) {
          console.error("Request failed: ", err);
          throw err;
        }
        if (res.statusCode != 200) {
            const bodyJson = JSON.parse(body);
            console.log(`${res.statusCode} ${bodyJson["error"]}: ${bodyJson["message"]}`);
        }
        if (onEnd) {
            onEnd(body);
        }
    });
}
