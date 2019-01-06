sap.ui.define(["sap/ui/base/Object", "sap/m/BusyDialog"], function(Object, BusyDialog) {
	"use strict";
	var Service = Object.extend("ehb.Project.view.model.Service", {
		constructor: function() {},
		setModel: function(model) {
			this.model = model;
			this.UserId = 1;
		},
		getProject : function(id) {
			var me = this;
			return new Promise(function(resolve, reject) {
				me.model.read("/projectSet(" + id + ")", {
					
					success: function(data) {
						resolve(data.results);
					},
					error: function(error) {
						reject(error);

					}
				});
			});
		}
		,
			getTeamlid : function(id) {
			var me = this;
			return new Promise(function(resolve, reject) {
				me.model.read("/teamlidSet(" + id + ")", {
					
					success: function(data) {
						resolve(data.results);
					},
					error: function(error) {
						reject(error);

					}
				});
			});
		}
		
		,
			getRol : function(id) {
			var me = this;
			return new Promise(function(resolve, reject) {
				me.model.read("/rolSet(" + id + ")", {
					
					success: function(data) {
						resolve(data.results);
					},
					error: function(error) {
						reject(error);

					}
				});
			});
		}
	});
});