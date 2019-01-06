sap.ui.define([
 "ehb/Project/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.App", {
goEvaluatie : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("evaluatie");
		},
		
goProject : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("project");
		},
		
goTeamLid : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("teamLid");
		}
	});
});