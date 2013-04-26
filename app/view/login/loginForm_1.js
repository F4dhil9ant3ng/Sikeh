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
        labelWidth: 90
    },
    
    initComponent: function() {

        this.items = [{
            xtype: 'container',
            height: 10
        },{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                region: 'center',
                layout: 'anchor',
                items	: [{
                    xtype: 'container',
                    height: 1
                },{
                    xtype       : 'textfield',
                    msgTarget   : 'side',
                    fieldLabel  : '<B>Id User</B>',
                    name        : 'username',
                    allowBlank  : false,
                    anchor      : '100%'
                },{
                    xtype       : 'textfield',
                    msgTarget   : 'side',
                    inputType   : 'password',
                    fieldLabel  : '<B>Password</B>',
                    name        : 'password',
                    allowBlank  : false,
                    anchor      : '100%'
                },{
                    xtype: 'container',
                    anchor: '100%',
                    layout:'hbox',
                    items: [{
                        xtype       : 'textfield',
                        msgTarget   : 'side',
                        fieldLabel  : '<B>Kode Validasi</B>',
                        name        : 'kode',
                        allowBlank  : false,
                        flex        : 1
                    },{
                        xtype: 'container',
                        width: 2
                    }, {
                        xtype: 'button',
                        action: 'reload',
                        text: '<B>Coba kode baru</B>'
                    }]
                }]
            }, {
                xtype: 'container',
                width: 5
            }, Ext.create('PL.view.gambar', {
                itemId: 'captcha',
                region: 'east',
                width: 160,
                height: 80,
                html: '<center><img src="store/captcha/CaptchaSecurityImages.php?width=160&height=80&characters=4&t=' + new Date().getTime() + '" width="160" height="80" /></center>'
            })]
        }, {
            xtype: 'container',
            height: 10
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