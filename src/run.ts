#!/usr/bin/env node

import toDo from "./tasks/ToDo";

function performCommand(command, arg) {
    switch (command) {
        case "toDo": return toDo(arg);
        default: return new Promise(resolve => resolve(`${command} is not a valid command`));
    }
}

performCommand(process.argv[2], process.argv[3])
    .then(res => console.log(res))
    .catch(e => console.error(e));
