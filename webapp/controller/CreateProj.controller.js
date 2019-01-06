sap.ui.define([
	"ehb/Project/controller/BaseController",
	"sap/m/MessageToast",
	"ehb/Project/model/Service", "sap/ui/model/json/JSONModel",
	"ehb/Project/model/formatter", "sap/ui/model/Filter", "sap/ui/model/FilterType",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast, Service, JSONModel, formatter, Filter, FilterType, FilterOperator) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.CreateProj", {
		formatter: formatter,
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("createProj").attachPatternMatched(this._onObjectMatched, this);
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			this.getRouter().getRoute("createProj").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "detailView");

			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			
			//	this.filterS();
		},
		_onObjectMatched: function (oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			//	this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("projectSet", {
					Id: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));

		},
		_bindView: function (sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("detailView");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},
		_onMetadataLoaded: function () {
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
		_onBindingChange: function () {
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

		filterS: function (oEvent) {
			var aFilter = [];
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();
			var sPath = oElementBinding.getPath(),


				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.Id;

			//var Projectid = this.getView().getModel();
			aFilter.push(new Filter("Projectid", FilterOperator.EQ, sObjectId));

			var oList = this.byId("TeamRolIDList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		/**
		 * Lock UI when changing data in the input controls
		 * @param {sap.ui.base.Event} oEvt - Event data
		 */
		onInputChange: function (oEvt) {
			/*	if (oEvt.getParameter("escPressed")) {
					this._setUIChanges();
				} else {
					this._setUIChanges(true);
					// Check if the username in the changed table row is empty and set the appView property accordingly
					if (oEvt.getSource().getParent().getBindingContext().getProperty("UserName")) {
						this.getView().getModel("appView").setProperty("/usernameEmpty", false);
					}
				}*/
		},
		_updateMyModel: function (sProperty, oValue) {
			this.getView().getModel("ActiveAccountsModel").setProperty(sProperty, oValue);
		},
		UpdateProj: function () {

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();
			var sPath = oElementBinding.getPath(),

				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.Id;
				
				
				var begindatum = this.byId("begindatum").getDateValue();
				var einddatum = this.byId("einddatum").getDateValue();

			var JSONM = {
				"Id": sObjectId,
				"Begindatum": begindatum ,
				"Einddatum": einddatum
			};
			var oModel = this.getView().getModel();
			oModel.update("/projectSet(" + sObjectId + ")", JSONM, {
				method: "PUT",
				success: function (data) {
					MessageToast.show("Record have been changed");
				},
				error: function (e) {
					MessageToast.show(e.toString());
				}
			});

		},
		onFilter: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Projectid", FilterOperator.Equals, sQuery));
			}

			// filter binding
			var oList = this.byId("TeamRolIDList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onCreate : function () {
/*			var oList = this.byId("TeamRolIDList"),
				oBinding = oList.getBinding("items"),
				oContext = oBinding.create({
					"Id" : "",
					"Projectid" : "",
					"Teamlidid" : "",
					"Rolid" : ""
				});

			oContext.created().then(function () {
				oBinding.refresh();
			});

			this._setUIChanges();
			this.getView().getModel("appView").setProperty("/usernameEmpty", true);

			oList.getItems().some(function (oItem) {
				if (oItem.getBindingContext() === oContext) {
					oItem.focus();
					oItem.setSelected(true);
					return true;
				}
			});*/
			
			MessageToast.show("add");
		},
		naarTeamToewijzen : function(){
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("teamAanProject");
		}

	});
});