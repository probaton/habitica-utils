import got from "got";

import { credentials } from "../../secret/credentials";

export default async function callHabitica(method: "get" | "post", endpoint: string, options?) {
    const callFunction = (method == "get") ? got : got.post;

    const fullOptions = Object.assign({}, {
        https: {
            rejectUnauthorized: false,
        },
        headers: {
            "x-client": credentials.habId + "-habitica-utils",
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        },
    }, options);
  
    let response;
    try {
        response = await callFunction(`https://habitica.com${endpoint}`, fullOptions);
    } catch (e) {
        throw new Error(`${(fullOptions.errorMessage || 'Request failed')}:\n${e}`);
    }
  
    if (!fullOptions.returnType || fullOptions.returnType == 'json') {
        try {
        return JSON.parse(response.body);
        // eslint-disable-next-line
        } catch (e) {}
    }
    return response.body || response;
  }
