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