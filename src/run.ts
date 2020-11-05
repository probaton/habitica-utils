#!/usr/bin/env node
import toDo from "./tasks/ToDo";
import { findUserMessages, searchMessages } from "./messages/findMessages";

function performCommand(command, arg) {
    switch (command) {
        case "to-do": return toDo(arg);
        case "user-messages": return findUserMessages(arg);
        case "search-messages": return searchMessages(arg);
        default: return new Promise(resolve => resolve(`${command} is not a valid command`));
    }
}

performCommand(process.argv[2], process.argv[3])
    .then(res => console.log(res))
    .catch(e => console.error(e));
