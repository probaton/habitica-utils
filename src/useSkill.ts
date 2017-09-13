import { getHabReqOpts, callHabApi } from "./HabiticaRequest";


export function useSkill(skill: Skills, habitId: string, onEnd?: () => void) {
    const skillApiSuffix = `/api/v3/user/class/cast/${skill}?targetId=${habitId}`;
    const skillCallOpts = getHabReqOpts("POST", skillApiSuffix);
    callHabApi(skillCallOpts, onEnd);
}

export type Skills =
    "fireball" |
    "mpHeal" |
    "earth" |
    "frost" |
    "smash" |
    "defensiveStance" |
    "valorousPresence" |
    "intimidate" |
    "pickPocket" |
    "backStab" |
    "toolsOfTrade" |
    "stealth" |
    "heal" |
    "protectAura" |
    "brightness" |
    "healAll";
