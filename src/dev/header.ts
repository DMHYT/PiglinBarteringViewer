declare const RV: RecipeViewerAPI;
declare const KEX: KEXAPI;


Translation.addTranslation("jepb.bartering", { en: "Piglin Bartering", ru: "Обмен с пиглинами" });
Translation.addTranslation("jepb.chance", { en: "Chance: %s%%", ru: "Шанс: %s%%" });


const formatChance = (chance: number) => {
    chance = Math.round(chance * 100) / 100;
    return java.lang.String.format(Translation.translate("jepb.chance"), [ chance === 0 ? "<0.01" : `${chance}` ]);
}

type jUIElement = com.zhekasmirnov.innercore.api.mod.ui.elements.UIElement;