import callHabApi from "../requests/callHabitica";
import { Skills } from "../skills/useSkill";

function parseMsgList(msgs: IHabiticaChatMessage[]) {
    return msgs
        .map(msg => msg.unformattedText)
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
