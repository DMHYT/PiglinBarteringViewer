RV.RecipeTypeRegistry.register("piglin_bartering", new (class extends RV.RecipeType {

    constructor() {
        super(Translation.translate("jepb.bartering"), 266, FileTools.ReadJSON(`${__dir__}/ui.json`));
    }

    readonly getAllList = () => PIGLIN_BARTERING_LIST;

    public onOpen(elements: java.util.HashMap<string, jUIElement>, recipe: PiglinBarteringPattern): void {
        (elements.get("textAmount") as jUIElement)
            .setBinding<string>("text", recipe.minCount === recipe.maxCount ? recipe.minCount == 1 ? "" : `${recipe.minCount}` : `${recipe.minCount}-${recipe.maxCount}`);
        (elements.get("textChance") as jUIElement)
            .setBinding<string>("text", java.lang.String.format(Translation.translate("jepb.chance"), [ recipe.chance === 0 ? "<0.01" : `${recipe.chance}` ]));
    }

}));