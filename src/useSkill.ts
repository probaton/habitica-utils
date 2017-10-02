import { getHabReqOpts, callHabApi } from "./HabiticaRequest";


export function useSkill(skill: Skills, habitId?: string, onEnd?: () => void) {
    let apiSuffix = `/api/v3/user/class/cast/${skill}`;
    apiSuffix += habitId ? `?targetId=${habitId}`: "";
    const skillCallOpts = getHabReqOpts("post", apiSuffix);
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
