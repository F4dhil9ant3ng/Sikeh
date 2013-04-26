Ext.define('PL.controller.user', {
    extend: 'Ext.app.Controller',

    views: ['user.list'],

    init: function() {

        this.control({
            'userlist button[action=baru]': {
                click: this.baru
            },

            'userlist button[action=edit]': {
                click: this.edit
            },

            'userlist button[action=hapus]': {
                click: this.hapus
            }

        });
    },

    baru: function(button) {
        var win = new Ext.create('PL.view.usergrup.edit', {
            title: 'User Baru',
            parent: button.up('userlist'),
            path: 'user',
            save: 'save'
        });       

        win.setItems('user');
        win.show();

        win.isReady = true;
        win.tsAllowLoad = true;
        win.down('#tree').store.load();
        win.down('textfield[name=userid]').focus(true, 10);
    },

    edit: function(button) {

        var win = new Ext.create('PL.view.usergrup.edit', {
            title: 'Edit User',
            parent: button.up('userlist'),
            path: 'user',
            save: 'update'
        });

        win.down('form').getForm().load({
            params: {id: button.up('userlist').down('#selected').getValue()},
            url: 'store/user/dataLoad.php',
            waitMsg: 'Loading...',
            success: function(f, a) {

                if (f.reader.jsonData.status=='A') {
                    win.close();
                    Ext.MessageBox.show({
                        title: 'Oops!',
                        msg: 'User dengan ID <b>' +button.up('userlist').down('#selected').getValue() + '</b> tidak bisa diedit.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }

                win.setItems('user', true);
                win.show();

                var store = win.down('#tree').store,
                    proxy = store.getProxy();

                win.isReady = true;
                win.tsAllowLoad = true;
                proxy.extraParams['iduser']=button.up('userlist').down('#selected').getValue();
                store.load();
                win.down('textfield[name=userid]').focus(true, 10);

            },
            failure:function(form, action) {
                win.close();
            }
        });
    },

    hapus: function(button) {
        var win = button.up('userlist');

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {
                win.down('form').getForm().waitMsgTarget = win.getEl();
                win.down('form').getForm().submit({
                    method:'POST',
                    url: 'store/user/delete.php',
                    waitMsg: 'Delete...',
                    success:function(form, action) {
                        Ext.Msg.alert('Sukses', action.result.message, function(btn, text){
                            win.down('plgrid').store.loadPage(1);
                        });
                    },
                    failure:function(form, action){
                        Ext.MessageBox.show({
                            title: 'Gagal',
                            msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn: function() {
                                win.down('plgrid').store.loadPage(1);
                            }
                        })
                    }
                });
            }
        });
    }

});