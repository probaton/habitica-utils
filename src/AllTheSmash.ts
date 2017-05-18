import { IHabit } from "src/IHabiticaData";
import { postSmash } from "./smash";
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

function multiSmash(numberOfSmashes: number) {
    requestUserData((userData) => {
        const habit = getLowestValueHabit(userData.tasks.habits);
        console.log(">>>> lowest habit", habit.text, habit.value);
        postSmash(habit.id, () => {
            bumpHabitValue(habit, userData.stats.str);
        });
    });
}

const smashCount = +process.argv[2];
if (isNaN(smashCount)) {
    console.log("Non-numeric input parameter");
    process.exit(1);
}
multiSmash(smashCount);
