sap.ui.define([
	"ehb/Project/controller/BaseController",
	"sap/m/MessageToast",
		"ehb/Project/model/Service",	"sap/ui/model/json/JSONModel",
			"ehb/Project/model/formatter"
], function (BaseController, MessageToast,Service,JSONModel,formatter) {
	"use strict";

	return BaseController.extend("ehb.Project.controller.CreateEvaluatie", {
		
	
		
		maakEval: function(){
			
			var project = this.byId("project").getSelectedKey();
			
			var teamlidid = this.byId("teamlidid").getSelectedKey();
			 var evaluatie = this.byId("evaluatie").valueOf().mProperties.value;
			 var score = this.byId("score").valueOf().mProperties.value;
		var score2 = parseInt(score);
				var properties = {
				  "Id" : 1,
					"Projectid" :parseInt(project),
					"Teamlidid" : parseInt(teamlidid),
					"Evaluatie" : evaluatie,
					"Score" : score2
				};
	
		
			this.getView().getModel().create("/evaluatieSet",properties,
			{
				success : function(data)
				{
					MessageToast.show("SaveDone!");
				},
				
				error : function(data)
				{
					MessageToast.show("Error");
				}
			});
			
		}
		
		
	});
});