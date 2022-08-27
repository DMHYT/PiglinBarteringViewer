ConfigureMultiplayer({
	name: "Piglin Bartering Viewer",
	version: "1.1",
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
	if(typeof api.getKEXVersionCode === "function") {
		let code = api.getKEXVersionCode();
		if(code >= 300) {
			scope.KEX = api;
			if(scope.RV != null) Launch(scope);
		} else Logger.Log("Failed to launch Piglin Bartering Viewer. You must have at least 3.0 version of KernelExtension, you have: " + code.toString().split("").join("."));
	} else Logger.Log("Failed to launch Piglin Bartering Viewer. You must have at least 3.0 version of KernelExtension, you have: <1.3.0");
});