import { IHabiticaData, IHabit } from "src/IHabiticaData";
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
    requestUserData((res) => {
        console.log(">>>> user data status code", res.statusCode);
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            const userData: IHabiticaData = JSON.parse(body);
            const habit = getLowestValueHabit(userData.tasks.habits);
            console.log(">>>> lowest habit", habit.text); 
            postSmash(habit.id, () => {
                console.log(">>>> before value", habit.value);
                bumpHabitValue(habit, userData.stats.str);
                console.log(">>>> after value", habit.value);
            });
        });
    });
}

multiSmash(1);
