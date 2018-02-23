import { IHabit } from "./IHabiticaData";
import { useSkillOnHighestValueHabit, Skills, useSkill } from "./useSkill";

function multiFireball(fireCount: number) {
    useSkillOnHighestValueHabit("fireball", fireCount, "Fuego!");
}

const fireCount = +process.argv[2];
if (isNaN(fireCount)) {
    console.log("Non-numeric input parameter");
    process.exit(1);
}
multiFireball(fireCount);
