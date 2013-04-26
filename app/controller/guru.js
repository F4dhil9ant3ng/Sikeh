Ext.define('PL.controller.guru', {
    extend: 'Ext.app.Controller',   

    models: ['guru.edit'],

    views: ['guru.list','guru.edit'],

    init: function() {

        this.control({

            'gurulist button[action=baru]': {
                click: this.tambah
            },

            'gurulist button[action=view]': {
                click: this.edit
            },
            'gurulist button[action=edit]': {
                click: this.edit
            },

            'gurulist button[action=hapus]': {
                click: this.hapus
            },

            'guruedit button[action=simpan]': {
                click: this.simpan
            },

            'guruedit button[action=upload]': {
                click: this.upload
            },

            'gurulist button[action=print]': {
                click: this.print
            }

        });
    },

    tambah: function(b) {
        var win = new Ext.create('PL.view.guru.edit', {
            title: 'Tambah Data guru',
            parent: b.up('gurulist'),
            url: 'store/guru/save.php',
            modal: true
        }).show();

        win.down('textfield[name=no]').focus(true, 10);
    },

    edit: function(b) {

        var win = new Ext.create('PL.view.guru.edit', {
            isEdit: true,
            isView: b.action=='view',
            title: (b.action=='view'?'View':'Edit') + ' Data guru',
            parent: b.up('gurulist'),
            url: 'store/guru/update.php',
            modal: true
        });
        if(b.action=='view')
            new PL.view.akses().viewDetail(win);

        win.show();

        var form = win.down('form');
        form.getForm().waitMsgTarget = form.up('window').getEl();
        form.getForm().load({
            params: {no: b.up('gurulist').down('#selected').getValue()},
            url: 'store/guru/dataLoad.php',
            waitMsg: 'Loading...',
            success: function() {
                win.showPicture();
                win.down('textfield[name=no]').focus(true, 10);
            }
        });
    },

    hapus: function(button) {

        Ext.MessageBox.show({
            title: 'Konfirmasi',
            msg: 'Yakin untuk hapus data guru yang dipilih?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn, text) {
                if(btn=='yes') {
                    var win = button.up('gurulist'),
                        form = win.down('form');

                    form.getForm().waitMsgTarget = win.getEl();
                    form.getForm().submit({
                        method:'POST',
                        url: 'store/guru/delete.php',
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
                                icon: Ext.MessageBox.ERROR
                            })
                        }
                    });
                }
            },
            icon: Ext.MessageBox.WARNING
        });
    },

    simpan: function(b) {

        var win = b.up('window'),
            form = win.down('form');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk simpan data guru?', function(btn,text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.up('window').getEl();
                form.getForm().submit({
                    method:'POST',
                    waitMsg: 'Simpan...',
                    success:function(form, action) {
                        Ext.Msg.alert('Sukses', action.result.message, function(btn, text) {
                            win.close();
                            win.parent.down('plgrid').store.loadPage(1);
                        });
                    },
                    failure:function(f, action){
                        Ext.MessageBox.show({
                            title: 'Gagal',
                            msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                });
            }
        });
    },

    upload: function(b) {
        var form = b.up('form[name=formupload]');

        form.getForm().waitMsgTarget = form.up('window').getEl();
        form.getForm().submit({
            method:'POST',
            url: 'store/photoSave.php',
            waitMsg: 'Upload...',
            success: function(form, action) {
                b.up('guruedit').down('hiddenfield[name=session_id]').setValue(action.result.session_id);
                b.up('guruedit').showPicture(true);
            },
            failure:function(form, action){
                Ext.MessageBox.show({
                    title: 'Gagal',
                    msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        });
    },

    print: function(b) {
        var form = b.up('gurulist').down('form');

        form.getForm().waitMsgTarget = form.up('gurulist').getEl();
        form.getForm().submit({
            method:'POST',
            url: 'store/cetak.php',
            params: {report_path: 'guru.jrxml', tipelap: 'pdf'},
            waitMsg: 'Cetak...',
            success:function(f, a) {
                if(a.result.fileext=='xls')
                    window.location = 'store/readFile.php' +
                        '?name=' + a.result.filename +
                        '&ext=' + a.result.fileext;
                else
                    window.open('store/readFile.php' +
                    '?name=' + a.result.filename +
                    '&ext=' + a.result.fileext, a.result.filename,
                    'width=715,height=565,toolbar=no,menubar=no,scrollbars=yes');

            }
        });
    }

});


