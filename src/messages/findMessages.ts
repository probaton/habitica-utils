import callHabApi from "../requests/callHabitica";
import { Skills } from "../skills/useSkill";

function addLeadingZeroes(number: number, expectedDigits: number) {
    let result = number.toString();
    while ((expectedDigits - result.length)) {
        result = `0${result}`;
    }
    return result;
}

function parseMsgList(msgs: IHabiticaChatMessage[]) {
    return msgs
        .map(msg => {
            const date = new Date(msg.timestamp);
            const month = addLeadingZeroes(date.getMonth(), 2);
            const dayOfMonth = addLeadingZeroes(date.getDate(), 2);
            const hours = addLeadingZeroes(date.getHours(), 2);
            const minutes = addLeadingZeroes(date.getMinutes(), 2);
            const formattedDate = `${date.getFullYear()}-${month}-${dayOfMonth} ${hours}:${minutes}`;
            return `[${formattedDate}] ${msg.unformattedText}`;
        })
        .reduce((aggregate, msg) => `${aggregate}\n${msg}`);
}

async function findMessages(predicate: (msg) => boolean): Promise<any> {
    const chat = (await callHabApi("get", "/api/v3/groups/party/chat"))["data"] as IHabiticaChatMessage[];
    if (!chat) {
        return "Failed to retrieve messages";
    }

    const relevantMsgs = chat.filter(predicate);
    return relevantMsgs.length > 0 ? `Found ${relevantMsgs.length} messages\n\n${parseMsgList(relevantMsgs)}` : "No results";
}

export function findUserMessages(userName) {
    return findMessages(msg => msg.info.user == userName);
}

export function searchMessages(search) {
    return findMessages(msg => msg.unformattedText.indexOf(search) != -1);
}

interface IHabiticaChatMessage { 
    flagCount: number;
    _id: string;
    flags: {};
    id: string;
    text: string;
    unformattedText: string;
    info: {
        type: string;
        user: string;
        class: string;
        spell: Skills;
    };
    timestamp: 1604592519994;
    likes: {};
    uuid: string;
    groupId: string; 
}
