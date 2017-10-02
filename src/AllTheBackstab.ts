import { IHabit, getHighestValueHabit } from "./IHabiticaData";
import { useSkill, Skills } from "./useSkill";
import { getUserData } from "./userData";

function multiStab(stabCount: number) {
    getUserData((userData) => {
        const habit = getHighestValueHabit(userData.tasks.habits);

        function stab() {
            console.log(">>>> ?", stabCount);
            useSkill("backStab", habit.id, () => {
                stabCount -= 1;
                if (stabCount > 0) {
                    stab();
                }
            });
        }

        stab();
    });
}

const stabCount = +process.argv[2];
if (isNaN(stabCount)) {
    console.log("Non-numeric input parameter");
    process.exit(1);
}
console.log(">>>>> wtf mate");
multiStab(stabCount);
