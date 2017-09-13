export interface IHabiticaData {
    stats: {
        per: number
        int: number
        con: number
        str: number
        points: number
        class: string
        lvl: number
        gp: number
        exp: number
        mp: number
        hp: number
    }
    tasks: {
        habits: IHabit[]
    }
    lastCron: Date
}

export interface IHabit {
    _id: string
    userId: string
    text: string
    updatedAt: string
    createdAt: string
    challenge: {}
    attribute: string
    priority: number
    value: number
    tags: string[]
    notes: string
    type: string
    history: Object[][]
    frequency: string
    counterDown: number
    counterUp: number
    down: false
    up: true
    id: string
}

export function getLowestValueHabit(habits: IHabit[]): IHabit {
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

export function getHighestValueHabit(habits: IHabit[]): IHabit {
    let res: IHabit;
    let highestValue: number;
    habits.forEach((habit) => {
        if (habit.value > highestValue || highestValue === undefined) {
            res = habit;
            highestValue = habit.value;
        }
    });
    return res;
}