sap.ui.define([
	"ehb/Project/controller/BaseController",
	"sap/m/MessageToast",
		"ehb/Project/model/Service",	"sap/ui/model/json/JSONModel",
			"ehb/Project/model/formatter"
			,"sap/ui/model/Filter", "sap/ui/model/FilterType",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast,Service,JSONModel,formatter,Filter, FilterType, FilterOperator) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.CreateTeam", {
	formatter: formatter,
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("createTeam").attachPatternMatched(this._onObjectMatched, this);
				var oViewModel = new JSONModel({
					busy : false,
					delay : 0
				});



				this.getRouter().getRoute("createTeam").attachPatternMatched(this._onObjectMatched, this);

				this.setModel(oViewModel, "detailView");

				this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onObjectMatched : function (oEvent) {
				var sObjectId =  oEvent.getParameter("arguments").objectId;
			//	this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("teamlidSet", {
						Id :  parseInt(sObjectId)
					});
					this._bindView("/" + sObjectPath);
				}.bind(this));
			},
				_bindView : function (sObjectPath) {
				// Set busy indicator during view binding
				var oViewModel = this.getModel("detailView");

				// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
				oViewModel.setProperty("/busy", false);

				this.getView().bindElement({
					path : sObjectPath,
					events: {
						change : this._onBindingChange.bind(this),
						dataRequested : function () {
							oViewModel.setProperty("/busy", true);
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},
				_onMetadataLoaded : function () {
				// Store original busy indicator delay for the detail view
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
					oViewModel = this.getModel("detailView");

				// Make sure busy indicator is displayed immediately when
				// detail view is displayed for the first time
				oViewModel.setProperty("/delay", 0);

				// Binding the view will set it to not busy - so the view is always busy if it is not bound
				oViewModel.setProperty("/busy", true);
				// Restore original busy indicator delay for the detail view
				oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
			},
				_onBindingChange : function () {
				var oView = this.getView(),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("detailObjectNotFound");
					// if object could not be found, the selection in the master list
					// does not make sense anymore.
				//	this.getOwnerComponent().oListSelector.clearMasterListSelection();
					return;
				}

				var sPath = oElementBinding.getPath();
				/*	oResourceBundle = this.getResourceBundle(),
					oObject = oView.getModel().getObject(sPath),
					sObjectId = oObject.Id,
					sObjectName = oObject.Naam,
					oViewModel = this.getModel("detailView");*/

				this.getOwnerComponent().oListSelector.selectAListItem(sPath);

			
			},
			
					onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("createTeamLid");
		},

			SaveTeam: function () {
			MessageToast.show("Success");
		},
		
		filterP: function (oEvent) {
			var aFilter = [];
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();
			var sPath = oElementBinding.getPath(),


				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.Id;

			//var Projectid = this.getView().getModel();
			aFilter.push(new Filter("Teamlidid", FilterOperator.EQ, sObjectId));

			var oList = this.byId("lijstje");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
	});
});