import { useSkill, Skills } from "./useSkill";
import { IChatMessage } from "./IChatMessage";
import { getHabReqOpts, callHabApi } from "./HabiticaRequest";
import { getUserData } from "./userData";

export function getPartyChat(onEnd: (chat: IChatMessage[]) => void)  {
    const options = getHabReqOpts("GET", "/api/v3/groups/party/chat");
    callHabApi(options, (data) => {
        onEnd(data["data"]);
    });
}

function buffAfterCron() {
    getUserData((userData) => {
        const cron = new Date(userData.lastCron).getTime();

        getPartyChat((chat) => {
            chat.some((message) => {
                if (message.timestamp > cron) {
                    if (message.text === "`Your quest, Attack of the Mundane, Part 3: The Laundromancer, has started.`") {
                        useSkill("toolsOfTrade");
                        return true;
                    }
                } else { return true; }
            });
        });
    });
}

buffAfterCron();
