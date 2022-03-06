class PiglinBarteringRecipe extends RV.RecipeType {
    constructor() {
        super(Translation.translate("jepb.bartering"), 266, {
            drawing: [ { type: "bitmap", bitmap: "pbv.gui", x: 115, y: 174 } ],
            elements: {
                input0: { type: "slot", x: 178, y: 232, bitmap: "_default_slot_empty", isTransparentBackground: true, size: 94 },
                output0: { type: "slot", x: 673, y: 232, bitmap: "_default_slot_empty", isTransparentBackground: true, size: 94 },
                textAmount: { type: "text", x: 720, y: 326, width: 114, height: 40, font: { alignment: UI.Font.ALIGN_CENTER, color: android.graphics.Color.BLACK, size: 40 } },
                textChance: { type: "text", x: 720, y: 138, width: 150, height: 40, font: { alignment: UI.Font.ALIGN_CENTER, color: android.graphics.Color.BLACK, size: 40 } }
            } as {[key: string]: Partial<UI.Elements>}
        });
    }
    readonly getAllList = () => PIGLIN_BARTERING_LIST;
    public onOpen(elements: java.util.HashMap<string, jUIElement>, recipe: PiglinBarteringPattern): void {
        (elements.get("textAmount") as jUIElement)
            .setBinding<string>("text", recipe.minCount === recipe.maxCount ? recipe.minCount == 1 ? "" : `${recipe.minCount}` : `${recipe.minCount}-${recipe.maxCount}`);
        (elements.get("textChance") as jUIElement)
            .setBinding<string>("text", formatChance(recipe.chance));
    }
}


RV.RecipeTypeRegistry.register("piglin_bartering", new PiglinBarteringRecipe());