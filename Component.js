sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/Device',	
	'sap/m/routing/Router',
	'sap/ui/model/resource/ResourceModel',
	'sap/ui/model/json/JSONModel',
    'sap/ui/demo/SapRestDemo/model/Config',
	'sap/ui/demo/SapRestDemo/localService/RestModel/RestModel'
], function (UIComponent,
			Device,
			Router,
			ResourceModel,
			JSONModel,
			mORMotModel) {

	return UIComponent.extend("sap.ui.demo.SapRestDemo.Component", {
		
		metadata: {
            manifest: "json"
        },
		
		init: function () {
			// call overwritten init (calls createContent)
			UIComponent.prototype.init.apply(this, arguments);

			var oModel = new sap.ui.model.rest.RestModel("https://api.github.com");
			oModel.setKey("login");			

			this.setModel(oModel);

			// set device model
			var oDeviceModel = new JSONModel({
				isTouch: sap.ui.Device.support.touch,
				isNoTouch: !sap.ui.Device.support.touch,
				isPhone: sap.ui.Device.system.phone,
				isNoPhone: !sap.ui.Device.system.phone,
				listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
				listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive"
			});
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			this._router = this.getRouter();

			//navigate to initial page for !phone
			if (!sap.ui.Device.system.phone) {
				this._router.getTargets().display("welcome");
			}

			// initialize the router
			this._router.initialize();

		},

		createContent: function () {
			// create root view
			return sap.ui.view({
				viewName: "sap.ui.demo.SapRestDemo.view.App",
				type: "XML"
			});
		}
	});

});
