import { types } from "../../src"

// tiny
export const Treasure = types.model("Treasure", {
    trapped: types.boolean,
    gold: types.optional(types.number, 0)
})

// medium
export const HeroRoles = ["warrior", "wizard", "cleric", "thief"]

export const Hero = types.model("Hero", {
    id: types.identifier(types.number),
    name: types.string,
    description: types.string,
    level: types.optional(types.number, 1),
    role: types.union(...HeroRoles.map(types.literal)),
    get descriptionLength() {
        return this.description.length
    }
})

// large
export const Monster = types.model("Monster", {
    id: types.identifier(types.string),
    freestyle: types.frozen,
    level: types.number,
    maxHp: types.number,
    hp: types.number,
    warning: types.maybe(types.string),
    createdAt: types.maybe(types.Date),
    treasures: types.optional(types.array(Treasure), []),
    eatenHeroes: types.maybe(types.array(Hero)),
    hasFangs: types.optional(types.boolean, false),
    hasClaws: types.optional(types.boolean, false),
    hasWings: types.optional(types.boolean, false),
    hasGrowl: types.optional(types.boolean, false),
    stenchLevel: types.optional(types.number, 0),
    fearsFire: types.optional(types.boolean, false),
    fearsWater: types.optional(types.boolean, false),
    fearsWarriors: types.optional(types.boolean, false),
    fearsClerics: types.optional(types.boolean, false),
    fearsMages: types.optional(types.boolean, false),
    fearsThieves: types.optional(types.boolean, false),
    fearsProgrammers: types.optional(types.boolean, true),

    get isAlive() {
        return this.hp > 0
    },

    get isFlashingRed() {
        return this.isAlive && this.hp < this.maxHp && this.hp === 1
    },

    get weight() {
        const victimWeight = this.eatenHeroes ? this.eatenHeroes.length : 0
        const fangWeight = this.hasFangs ? 10 : 5
        const wingWeight = this.hasWings ? 12 : 4

        return (victimWeight + fangWeight + wingWeight) * this.level > 5 ? 2 : 1
    }
})
