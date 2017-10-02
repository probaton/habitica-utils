import { getHabReqOpts, callHabApi } from "./HabiticaRequest";
import * as request from "request";
import { credentials } from "../secret/credentials";


function newToDo(message: string) {
    const body = {
        text: message, 
        type: "todo",
        priority: "1.5",
    }
    const toDoOpts = getHabReqOpts("post", "/api/v3/tasks/user", body);
    callHabApi(toDoOpts);
}

const toDoMessage = process.argv[2];
if (!toDoMessage) {
    console.log("No to-do message");
    process.exit(1);
}
newToDo(toDoMessage);
