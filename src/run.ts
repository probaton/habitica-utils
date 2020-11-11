#!/usr/bin/env node
import { fppTestToDo, toDo } from "./tasks/ToDo";
import { findUserMessages, searchMessages } from "./messages/findMessages";
import downloadUserData from "./userData/downloadUserData";
import clearNotifications from "./notifications/clearNotifications";

function performCommand(command, arg) {
    switch (command) {
        case "clear-notifications": return clearNotifications();
        case "to-do": return toDo(arg);
        case "fpp-test-to-do": return fppTestToDo(arg);
        case "search-messages": return searchMessages(arg);
        case "user-messages": return findUserMessages(arg);
        case "dl-data":
        case "downloadData": return downloadUserData();
        default: return new Promise(resolve => resolve(`${command} is not a valid command`));
    }
}

performCommand(process.argv[2], process.argv[3])
    .then(res => console.log(res))
    .catch(e => console.error(e));
