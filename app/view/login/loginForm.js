Ext.define('PL.view.login.loginForm', {


    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    border: false,
    
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 70
    },
    
    initComponent: function() {

        this.items = [{
            xtype: 'container',
            height: 5
        },{
            xtype: 'container',
            layout: 'hbox',
            items: [Ext.create('PL.view.gambar', {
                border: false,
                itemId: 'captcha',
                width: 128,
                height: 128,
                html: '<center><img src="images/user-info.png" /></center>'
            }), {
                xtype: 'container',
                width: 5
            }, {
                xtype: 'container',
                flex: 1,
                region: 'center',
                layout: 'anchor',
                items	: [{
                    xtype: 'container',
                    height: 1
                },{
                    xtype: 'displayfield',
                    fieldLabel  : '<B>Id User</B>',
                    anchor      : '100%'
                },{
                    xtype       : 'textfield',
                    hideLabel   : true,
                    msgTarget   : 'side',
                    name        : 'username',
                    allowBlank  : false,
                    anchor      : '100%'
                },{
                    xtype: 'displayfield',
                    fieldLabel  : '<B>Password</B>',
                    anchor      : '100%'
                },{
                    xtype       : 'textfield',
                    hideLabel   : true,
                    msgTarget   : 'side',
                    inputType   : 'password',
                    name        : 'password',
                    allowBlank  : false,
                    anchor      : '100%'
//                } ,{
//                    xtype: 'container',
//                    anchor: '100%',
//                    layout:'hbox',
//                    items: [{
//                        xtype       : 'textfield',
//                        msgTarget   : 'side',
//                        fieldLabel  : '<B>Kode Validasi</B>',
//                        name        : 'kode',
//                        allowBlank  : false,
//                        flex        : 1
//                    },{
//                        xtype: 'container',
//                        width: 2
//                    }, {
//                        xtype: 'button',
//                        action: 'reload',
//                        text: '<B>Coba kode baru</B>'
//                    }]
                }]
            }]
        }, {
            xtype: 'container',
            height: 5
        },{
            xtype: 'container',
            region: 'south',
            layout:  'hbox',
            items: [{
                xtype   : 'container',
                flex   : 1
            },{
                xtype   : 'button',
                text    : '<B>Login</B>',
                action  : 'login'
            }]
        }];

        this.callParent();

    }
    
});