Ext.define('PL.view.login.loginWindow',{
    extend 	: 'Ext.Window',
    
    layout: 'fit',
    modal	: false,
    width	: 520,
    height	: 330,
    closable	: false,
    draggable 	: false,
    resizable	: false,
    
    initComponent: function() {

        this.items = [{
            xtype: 'panel',
            border: false,
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            bodyPadding	: 10,
            items:[{
                xtype: 'panel',
                height: 170,
                bodyStyle: "background: url('images/profitlook.png'); background-size: 100%;"
            },
            Ext.create('PL.view.login.loginForm', {flex: 1})]
        }];

        this.callParent();
    }
});