ConfigureMultiplayer({
	name: "Piglin Bartering Viewer",
	version: "1.0",
	isClientOnly: true
});

var scope = {
	RV: null,
	KEX: null
}

ModAPI.addAPICallback("RecipeViewer", function(api) {
	scope.RV = api;
	if(scope.KEX != null) Launch(scope);
});
ModAPI.addAPICallback("KernelExtension", function(api) {
	scope.KEX = api;
	if(scope.RV != null) {
		if(typeof api.getKEXVersionCode === "function" && api.getKEXVersionCode() >= 130) {
			Launch(scope);
		} else Logger.Log("Failed to launch Piglin Bartering Viewer. You must have at least 1.2 version of KernelExtension!", "PBV");
	}
});