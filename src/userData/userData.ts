import { IHabiticaData } from "./IHabiticaData";
import callHabApi from "../requests/callHabitica";

export async function getUserData(): Promise<IHabiticaData> {
    return callHabApi("get", "/export/userdata.json");
}
