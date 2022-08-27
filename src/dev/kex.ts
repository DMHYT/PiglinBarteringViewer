interface PiglinBarteringPattern extends RecipePattern {
    minCount: number,
    maxCount: number,
    chance: number
}


const PIGLIN_BARTERING_LIST: PiglinBarteringPattern[] = [];


KEX.LootModule.createLootTableModifier("entities/piglin_barter")
    .addJSPostModifyCallback(json => {
        PIGLIN_BARTERING_LIST.splice(0, PIGLIN_BARTERING_LIST.length);
        let totalWeight: number = 0;
        json.pools[0].entries.forEach(entry => {
            if(entry.type === "item") {
                const pattern: PiglinBarteringPattern = {
                    input: [ { id: 266, count: 1, data: 0 } ],
                    output: [ { id: 0, count: 0, data: 0 } ],
                    minCount: 1, maxCount: 1, chance: 0
                }
                if(typeof entry.weight === "number") {
                    pattern.chance = entry.weight;
                    totalWeight += entry.weight;
                }
                if(entry.name.startsWith("minecraft:")) {
                    const id = KEX.AddonUtils.getNumericIdFromIdentifier(entry.name.replace("minecraft:", ""));
                    if(id != -1){ 
                        const out = pattern.output[0];
                        out.id = id;
                        if(typeof entry.count === "number") {
                            pattern.minCount = entry.count;
                            pattern.maxCount = entry.count;
                        }
                        if(Array.isArray(entry.functions)) {
                            entry.functions.forEach(func => {
                                if(func.function === "set_count") {
                                    if(typeof func.count === "object") {
                                        pattern.minCount = func.count.min;
                                        pattern.maxCount = func.count.max;
                                    } else {
                                        pattern.minCount = func.count;
                                        pattern.maxCount = func.count;
                                    }
                                }
                                if(func.function === "set_data" && typeof func.data === "number") out.data = func.data;
                                if(func.function === "set_damage" && typeof func.damage === "number") out.data = func.damage;
                                if(func.function === "specific_enchants") {
                                    if(id === VanillaItemID.book) out.id = VanillaItemID.enchanted_book;
                                    out.extra = new ItemExtraData();
                                    func.enchants.forEach(ench => {
                                        if(
                                            typeof ench.id === "string" &&
                                            typeof EEnchantment[ench.id.toUpperCase()] === "number"
                                        ) {
                                            out.extra.addEnchant(EEnchantment[ench.id.toUpperCase()], 1);
                                        }
                                    });
                                }
                            });
                        }
                        if(out.id !== 0 && out.count === 0) out.count = 1;
                        PIGLIN_BARTERING_LIST.push(pattern);
                    }
                }
            }
        });
        const divider = totalWeight / 100;
        PIGLIN_BARTERING_LIST.forEach(pattern => Math.round(pattern.chance / divider * 100) / 100);
    });