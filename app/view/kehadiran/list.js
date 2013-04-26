Ext.define('PL.view.kehadiran.list' ,{

    extend: 'Ext.panel.Panel',
    alias : 'widget.kehadiranlist',

    title : 'Data Kehadiran',
    modulId: 'KH',
    layout: 'border',

    initComponent: function() {
        var me = this;

        var jammasuk = Ext.create('Ext.form.field.Time', {
            format:'H:i:s',
            fieldStyle: 'text-align: right'
        });

        var jamkeluar = Ext.create('Ext.form.field.Time', {
            format:'H:i:s',
            fieldStyle: 'text-align: right'
        });

        this.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                canceledit: function(g, e) {

                    e.record.set('id', this.oldRecord[0]);
                    e.record.set('tanggal', this.oldRecord[1]);
                    e.record.set('no', this.oldRecord[2]);
                    e.record.set('nama', this.oldRecord[3]);
                    e.record.set('nuptk', this.oldRecord[4]);
                    e.record.set('masuk', this.oldRecord[5]);
                    e.record.set('pulang', this.oldRecord[6]);

                    e.record.commit();
                    this.oldRecord = undefined;
                },

                beforeEdit: function(f, e) {
                    if(me.down('#editButton').hidden) return false;
                    if(!this.oldRecord) {
                        this.oldRecord = new Array(
                            e.record.data['id'],
                            e.record.data['tanggal'],
                            e.record.data['no'],
                            e.record.data['nama'],
                            e.record.data['nuptk'],
                            e.record.data['masuk'],
                            e.record.data['pulang']);
                    }
                },
                edit: function(g, e) {

                    var form = me.down('form');
                    var grid = me.down('plgrid');
                    form.getForm().waitMsgTarget = form.up('kehadiranlist').getEl();
                    form.getForm().submit({
                        method:'POST',
                        params: {                            
                            masuk: me.konversiJam(jammasuk.getValue()),
                            pulang: me.konversiJam(jamkeluar.getValue())
                        },

                        url: 'store/kehadiran/update.php',
                        waitMsg: 'Update...',
                        success:function(f, a) {
                            e.record.set('masuk', me.konversiJam(jammasuk.getValue()));
                            e.record.set('pulang', me.konversiJam(jamkeluar.getValue()));
                            e.record.commit();
                            this.oldRecord = undefined;
                        },
                        failure:function(form, action){
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR,
                                fn: function() {
                                    var row = grid.store.indexOf(e.record);
                                    me.rowEditor.startEdit(row, 1);
                                }
                            })
                        }
                    });
                }
            }
        });


        this.items = [{
                xtype: 'panel',
                height: 27,
                region: 'north',
                layout: 'border',
                items: [{
                    xtype: 'container',
                    region: 'center',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'datefield',
                        name: 'dari',
                        fieldLabel: '&nbsp;Dari Tanggal',
                        width: 190,
                        labelWidth: 80,
                        value: new Date(),
                        format: 'd-m-Y'
                    }, {
                        xtype: 'container',
                        width: 10
                    }, {
                        xtype: 'datefield',
                        name: 'sd',
                        fieldLabel: 'sd. Tanggal',
                        width: 190,
                        labelWidth: 80,
                        value: new Date(),
                        format: 'd-m-Y'
                    }]
                }]
            },
            Ext.create('PL.view.plgrid', {
                region: 'center',
                layout: 'fit',
                border: false,                
                flex: 1,
                plugins: [me.rowEditor],
                store: Ext.create('PL.store.stores', {
                    fields: [
                        {name: 'id', type: 'string'},
                        {name: 'tanggal', type: 'string'},
                        {name: 'no', type: 'string'},
                        {name: 'nama', type: 'string'},
                        {name: 'nuptk', type: 'string'},
                        {name: 'masuk', type: 'string'},
                        {name: 'pulang', type: 'string'}
                     ],
                    url: 'store/kehadiran/dataStore.php'
                }),
                columns: [
                    {text: 'Tanggal', flex: 0.1, sortable: true, dataIndex: 'tanggal'},
                    {text: 'No. Guru', flex: 0.1, align: 'center', sortable: true, dataIndex: 'no'},
                    {text: 'Nama Guru', flex: 0.35, sortable: true, dataIndex: 'nama'},
                    {text: 'NUPTK', flex: 0.15, align: 'center', sortable: true, dataIndex: 'nuptk'},
                    {text: 'Masuk', flex: 0.15, align: 'center', sortable: true, dataIndex: 'masuk', editor: jammasuk},
                    {text: 'Pulang', flex: 0.15, align: 'center', sortable: true, dataIndex: 'pulang', editor: jamkeluar}
                ]
            })
        ];
        
        this.callParent(arguments);
    },

    editRecord: function() {
        var grid = this.down('plgrid');

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            this.rowEditor.startEdit(row, 4);
        }
    },

    validTanggal: function(tanggal) {

        if(tanggal==null || tanggal=='') return false;

        var dt = new Date(tanggal);
        if(isNaN(dt)) return false;

        return true;

    },

    konversiJam: function(tanggal) {

        if(!this.validTanggal(tanggal)) return '';

        var dt = new Date(tanggal);
	dt.setDate(dt.getDate());

        return ((String(dt.getHours()).length==1?'0':'') + dt.getHours()) + ':' +
               ((String(dt.getMinutes()).length==1?'0':'') + (dt.getMinutes())) + ':' +
               ((String(dt.getSeconds()).length==1?'0':'') + (dt.getSeconds()));

    }
});