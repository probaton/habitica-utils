import { IHabit, getLowestValueHabit } from "./IHabiticaData";
import { useSkill, Skills } from "./useSkill";
import { getUserData } from "./userData";


function bumpHabitValue(habit: IHabit, str: number) {
    const smashMod = 2.5 * str / (str + 35);
    habit.value += smashMod;
}

function multiSmash(smashCount: number) {
    getUserData((userData) => {
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
    });
}

const smashCount = +process.argv[2];
if (isNaN(smashCount)) {
    console.log("Non-numeric input parameter");
    process.exit(1);
}

multiSmash(smashCount);
