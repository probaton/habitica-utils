import { request, RequestOptions } from "https";
import { credentials } from "../secret/credentials";
import { IHabiticaData } from "src/IHabiticaData";
import { getHabReqOpts, callHabApi } from "./HabiticaRequest";

export function getUserData(onEnd: (userData: IHabiticaData) => void) {
    const userDataCallOpts = getHabReqOpts("get", "/export/userdata.json");
    callHabApi(userDataCallOpts, onEnd); 
}
