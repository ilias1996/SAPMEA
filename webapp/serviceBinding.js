function initModel() {
	var sUrl = "/SAPGateway/sap/opu/odata/SAP/ZGS_PROJECT_093_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}