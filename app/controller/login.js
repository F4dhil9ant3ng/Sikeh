Ext.define('PL.controller.login', {
    extend: 'Ext.app.Controller',

    views: ['login.loginForm','login.loginWindow'],

    init: function() {

        this.control({
            'loginform button[action=reload]': {
                click: this.reload
            },
            'loginform button[action=login]': {
                click: this.login
            }
        });
    },   

    reload: function(button) {
        var me = this,
          form = button.up('loginform');
        me.showPicture(form);
        form.down('textfield[name=kode]').focus(true, 10);
    },

    login: function(button) {
        var me = this,
            form = button.up('loginform'),
            formUtama = form.up('loginpanel').formUtama;

        if(!form.getForm().isValid()) return;

        
        form.getForm().waitMsgTarget = form.up('loginpanel').getEl();
        form.getForm().submit({
            params: {task: 'login'},
            url: 'store/login.php',
            waitMsg: 'Login...',
            success:function(f, action) {
                formUtama.up('utama').down('#tablogin').close();
                formUtama.myMask = new Ext.LoadMask(formUtama.up('utama').getEl(), {msg:"Loading..."});
                formUtama.up('utama').aksesStore.loadPage(1);
                formUtama.myMask.show();
            },
            failure:function(f, action){
                Ext.MessageBox.show({
                    title: 'Gagal',
                    msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR //,
//                    fn: function() {
//                        form.down('textfield[name=kode]').focus(true, 10);
//                    }
                })
            }
        });
    },

    showPicture: function(form) {
        
        form.down('#captcha').loadRecord(null,null,'store/captcha/CaptchaSecurityImages.php?width=160&height=80&characters=4&t=' + new Date().getTime());
    }

});