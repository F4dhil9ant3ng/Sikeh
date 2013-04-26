Ext.define('PL.view.login.loginWindow',{
    extend 	: 'Ext.panel.Panel',
    alias       : 'widget.loginpanel',
    layout      : 'fit',
    title       : 'Login Terlebih Dahulu',
    width	: 400,
    height	: 210,
    
    initComponent: function() {

        this.items = [{
            xtype: 'panel',
            border: false,
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            bodyPadding	: 10,
            items:[Ext.create('PL.view.login.loginForm')]
        }];

        this.callParent();
    }
});