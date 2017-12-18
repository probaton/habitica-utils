import { IHabit } from "./IHabiticaData";
import { useSkillOnHighestValueHabit, Skills, useSkill } from "./useSkill";

function multiStab(stabCount: number) {
    useSkillOnHighestValueHabit("backStab", stabCount);
}

const stabCount = +process.argv[2];
if (isNaN(stabCount)) {
    console.log("Non-numeric input parameter");
    process.exit(1);
}
multiStab(stabCount);
