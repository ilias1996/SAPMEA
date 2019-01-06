sap.ui.define([
 "ehb/Project/controller/BaseController",
 	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController,Filter,FilterOperator) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.TeamLid", {


	NavToCre: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("createTeamLid");
		}
	,	onPress: function (oEvent) {
				var oList = oEvent.getSource(),
					bSelected = oEvent.getParameter("selected");

				// skip navigation when deselecting an item in multi selection mode
				if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
					// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
					this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
				}
		},
			_showDetail : function (oItem) {
		//		var bReplace = !Device.system.phone;
				// set the layout property of FCL control to show two columns
			//	this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
				this.getRouter().navTo("createTeam", {
					objectId : oItem.getBindingContext().getProperty("Id")
				}, false);
			},
					onFilterTeam : function(oEvent){
				// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Voornaam", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("TeamlidList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
			}
	});
});