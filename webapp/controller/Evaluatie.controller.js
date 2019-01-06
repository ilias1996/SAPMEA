sap.ui.define([
 "ehb/Project/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',"sap/m/MessageBox"
], function (BaseController,Filter,FilterOperator,Export,ExportTypeCSV,MessageBox) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.Evaluatie", {




	NavToCre: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("createEvaluatie");
		},

onDataExport: sap.m.Table.prototype.exportData || function (oEvent) {

		var oExport = new Export({

			// Type that will be used to generate the content. Own ExportType's can be created to support other formats
			exportType: new ExportTypeCSV({
				separatorChar: ";"
			}),

			// Pass in the model created above
			models: this.getView().getModel(),

			// binding information for the rows aggregation
			rows: {
				path: "/evaluatieSet"
			},

			// column definitions with column name and binding info for the content

			columns: [{
				name: "ID",
				template: {
					content: "{Id}"
				}
			}, {
				name: "teamlid ID",
				template: {
					content: "{Teamlidid}"
				}
			}, {
				name: "Projectid",
				template: {
					content: "{Projectid}"
				}
			}, {
				name: "Score",
				template: {
					content: "{Score}"
					}
					// "{Width} x {Depth} x {Height} {DimUnit}"
				
			}, {
				name: "Evaluatie",
				template: {
					content: "{Evaluatie}"
				}
			}
			]
		});

		// download exported file
		oExport.saveFile().catch(function (oError) {
			MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
		}).then(function () {
			oExport.destroy();
		});
	}
,
	
		onPress : function (oEvent) {
				var oList = oEvent.getSource(),
					bSelected = oEvent.getParameter("selected");

				// skip navigation when deselecting an item in multi selection mode
				if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
					// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
					this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
				}
				
			//	MessageToast.show("mamam");
		},
			_showDetail : function (oItem) {
		//		var bReplace = !Device.system.phone;
				// set the layout property of FCL control to show two columns
			//	this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
				this.getRouter().navTo("createEval", {
					objectId : oItem.getBindingContext().getProperty("Id")
				}, false);
},
	onFilterEvaluatie : function(oEvent){
				// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Teamlidid", FilterOperator.Equals, sQuery));
			}

			// filter binding
			var oList = this.byId("EvaluatieList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
			}

		
	});
});