Ext.define('PL.controller.kehadiran', {
    extend: 'Ext.app.Controller',   

    views: ['kehadiran.list'],

    init: function() {

        this.control({

            'kehadiranlist': {
                afterrender: this.afterrender
            },

            'kehadiranlist datefield[name=dari]': {
                change: this.reloadstore
            },

            'kehadiranlist datefield[name=sd]': {
                click: this.reloadstore
            },

            'kehadiranlist button[action=print]': {
                click: this.print
            },

            'kehadiranlist button[action=edit]': {
                click: this.edit
            },

            'kehadiranlist button[action=hapus]': {
                click: this.hapus
            }
        });
    },

    edit: function(button) {
        button.up('kehadiranlist').editRecord();
    },

    hapus: function(button) {

        Ext.MessageBox.show({
            title: 'Konfirmasi',
            msg: 'Yakin untuk hapus data kehadiran yang dipilih?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn, text) {
                if(btn=='yes') {
                    var win = button.up('kehadiranlist'),
                        form = win.down('form');

                    form.getForm().waitMsgTarget = win.getEl();
                    form.getForm().submit({
                        method:'POST',
                        url: 'store/kehadiran/delete.php',
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

    afterrender: function(p) {
        p.down('datefield[name=dari]').fireEvent('change', p.down('datefield[name=dari]'));
        p.down('#viewButton').setVisible(false);
    },

    reloadstore: function(b) {
        var panel = b.up('kehadiranlist');
        var dari = this.konversiTanggal(panel.down('datefield[name=dari]').getValue());
        var sd = this.konversiTanggal(panel.down('datefield[name=sd]').getValue());
        var store = panel.down('plgrid').getStore();

        store.getProxy().extraParams['dari'] = dari;
        store.getProxy().extraParams['sd'] = sd;
        store.loadPage(1);
    },

    validTanggal: function(tanggal) {

        if(tanggal==null || tanggal=='') return false;

        var dt = new Date(tanggal);
        if(isNaN(dt)) return false;

        return true;

    },

    konversiTanggal: function(tanggal) {

        if(!this.validTanggal(tanggal)) return '';

        var dt = new Date(tanggal);
	dt.setDate(dt.getDate());

        return ((String(dt.getDate()).length==1?'0':'') + dt.getDate()) + '-' +
               ((String(dt.getMonth()+1).length==1?'0':'') + (dt.getMonth()+1)) + '-' +
               dt.getFullYear();

    },
    
    print: function(b) {
        var form = b.up('kehadiranlist').down('form');
        var panel = b.up('kehadiranlist');
        var dari = this.konversiTanggal(panel.down('datefield[name=dari]').getValue());
        var sd = this.konversiTanggal(panel.down('datefield[name=sd]').getValue());
        var query = panel.down('searchfield').getValue();

        form.getForm().waitMsgTarget = form.up('kehadiranlist').getEl();
        form.getForm().submit({
            method:'POST',
            url: 'store/cetak.php',
            params: {report_path: 'kehadiran.jrxml', tipelap: 'pdf', dari: dari, sd: sd, query: query},
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


