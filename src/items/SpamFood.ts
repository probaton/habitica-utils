import { callHabApi, getHabReqOpts } from "../requests/HabiticaRequest";
import { getUserData } from"../userData/userData";
import { IHabiticaData } from "src/userData/IHabiticaData";

interface FoodCount {
    food: string, 
    count: number,
}

function collectLikedFoods(petType: string): string[] {
    const foodTypes = [
        { petType: "Base", likedFood: "Meat" },
        { petType: "White", likedFood: "Milk" },
        { petType: "Desert", likedFood: "Potatoe" },
        { petType: "Red", likedFood: "Strawberry" },
        { petType: "Shade", likedFood: "Chocolate" },
        { petType: "Skeleton", likedFood: "Fish" },
        { petType: "Zombie", likedFood: "RottenMeat" },
        { petType: "CottonCandyPink", likedFood: "CottonCandyPink" },
        { petType: "CottonCandyBlue", likedFood: "CottonCandyBlue" },
        { petType: "Golden", likedFood: "Honey" },
    ]

    const foodMatch = foodTypes.find(foodType => foodType.petType == petType);
    const likedFoodTypes = foodMatch ? [foodMatch] : foodTypes;
    let likedFoods = [];
    likedFoodTypes.forEach(foodType => {
        likedFoods.push(foodType.likedFood);
        likedFoods.push("Candy_" + foodType.petType);
        likedFoods.push("Cake_" + foodType.petType);
    });
    return likedFoods;
}

function makeFoodCounter(likedFoods: string[], userData: IHabiticaData): FoodCount[] {
    const userFood = userData["items"]["food"];
    return likedFoods.map(food => { return { food: food, count: userFood[food] } });
} 

function feedPet(petId: string, petType: string, food: string): void {
    const feedOpts = getHabReqOpts("post", `/api/v3/user/feed/${petId}-${petType}/${food}`); 
    callHabApi(feedOpts, () => {
        
        console.log("Omnomnom")
    });
}

function spamFood(petId: string, petType: string): void {
    const likedFoods = collectLikedFoods(petType);
    getUserData(userData => {
        makeFoodCounter(likedFoods, userData)
            .forEach(foodCount => {
                while (foodCount.count > 0) {
                    feedPet(petId, petType, foodCount.food);
                    foodCount.count--;
                }
            });
    });
}

const petId = process.argv[2];
if (!petId) { 
    console.log("No pet id");
} else {
    const petAttributes = petId.split("-");
    if (petAttributes.length != 2) {
        console.log("Invalid pet id");
    } else {
        spamFood(petAttributes[0], petAttributes[1]);
    }
}
