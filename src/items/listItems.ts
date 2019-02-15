import { getUserData } from "../userData/userData";

const itemType = process.argv[2];
if (!itemType) {
    getUserData(userData => console.log(userData.items[itemType] || "Specified item type does not exist"));
} else {
    console.log("Specify an item type");
}
