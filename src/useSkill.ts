import { getHabReqOpts, callHabApi } from "./HabiticaRequest";
import { getHighestValueHabit } from "./IHabiticaData";
import { getUserData } from "./userData";


export function useSkill(skill: Skills, habitId?: string, onEnd?: () => void) {
    let apiSuffix = `/api/v3/user/class/cast/${skill}`;
    apiSuffix += habitId ? `?targetId=${habitId}`: "";
    const skillCallOpts = getHabReqOpts("post", apiSuffix);
    callHabApi(skillCallOpts, onEnd);
}

export function useSkillOnHighestValueHabit(skill: Skills, count: number) {
    getUserData((userData) => {
        const habit = getHighestValueHabit(userData.tasks.habits);

        function iterate() {
            useSkill(skill, habit.id, () => {
                count -= 1;
                if (count > 0) { iterate(); }
            });
        }

        iterate();
    });

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
