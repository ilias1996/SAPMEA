sap.ui.define([
 "ehb/Project/controller/BaseController",
 	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (BaseController,Filter,FilterOperator,MessageToast) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.TeamAanProject", {



	NavToCre : function(){
		//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//	oRouter.navTo("createProject");
				this.getRouter().getTargets().display("createProject");
	},

	
maak:function(){

var projectid = this.byId("projectid").getSelectedKey();
var rolid = this.byId("rolid").getSelectedKey();
var teamlidid = this.byId("teamlidid").getSelectedKey();

	
			
			
		var properties = {
			 "Id" : 1,
        "Projectid" : parseInt(projectid),
        "Teamlidid" : parseInt(teamlidid),
        "Rolid" :  parseInt(rolid),
		};
		
			this.getView().getModel().create("/ProjTeamRolSet",properties,
			{
				success : function(data)
				{
					MessageToast.show("Save Done!");
				},
				
				error : function(data)
				{
					MessageToast.show("Error");
				}
			});
			
		
}


		
	});
});