import { IHabit, getLowestValueHabit } from "../userData/IHabiticaData";
import { useSkill } from "./useSkill";
import { getUserData } from "../userData/userData";


function bumpHabitValue(habit: IHabit, str: number) {
    const smashMod = 2.5 * str / (str + 35);
    habit.value += smashMod;
}

async function multiSmash(smashCount: number) {
    const userData = await getUserData();
    const habit = getLowestValueHabit(userData.tasks.habits);

    function smash() {
        useSkill("smash", habit.id, () => {
            bumpHabitValue(habit, userData.stats.str);
            smashCount -= 1;
            if (smashCount > 0) {
                smash();
            }
        });
    }

    smash();
}

// Count defaults to arbitrary high number as a poor man's version of 'spam until OOM'.
const count = isNaN(+process.argv[2]) ? 1000 : +process.argv[2];

multiSmash(count);
