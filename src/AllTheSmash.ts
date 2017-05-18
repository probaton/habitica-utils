import { IHabit } from "src/IHabiticaData";
import { useSkill, Skills } from "./useSkill";
import { requestUserData } from "./userData";

function getLowestValueHabit(habits: IHabit[]): IHabit {
    let res: IHabit;
    let lowestValue: number;
    habits.forEach((habit) => {
        if (habit.value < lowestValue || lowestValue === undefined) {
            res = habit;
            lowestValue = habit.value;
        }
    });
    return res;
}

function bumpHabitValue(habit: IHabit, str: number) {
    const smashMod = 2.5 * str / (str + 35);
    habit.value += smashMod;
}

function multiSmash(smashCount: number) {
    requestUserData((userData) => {
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
