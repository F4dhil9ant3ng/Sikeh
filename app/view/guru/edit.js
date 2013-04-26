Ext.define('PL.view.guru.edit', {

    extend: 'Ext.window.Window',
    alias:'widget.guruedit',

    modulId: 'GR',
    layout: 'border',
    width: 675,
    height: 455,

    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
    
            items: [{
                xtype: 'form',
                region: 'center',
                layout: 'border',
                border: false,
                url: c.url,
                reader: new Ext.data.JsonReader({
                    model: 'PL.model.guru.edit',
                    root: 'results',
                    totalProperty: 'total'
                }),
                items:[{
                    xtype: 'panel',
                    region: 'center',
                    border: false,
                    layout: 'border',
                    bodyPadding: 10,
                    items: [{
                        xtype: 'form',
                        region: 'center',
                        layout: 'border',
                        border: false,
                        fieldDefaults: {
                            msgTarget: 'side',
                            labelWidth: 135
                        },
                        items:[{
                            xtype: 'container',
                            region: 'center',
                            layout: 'anchor',
                            items:[{
                                xtype: 'hiddenfield',
                                name: 'session_id'
                            }, {
                                xtype: 'hiddenfield',
                                name: 'noedit'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'No. Guru',
                                name:'no',
                                anchor: '60%',
                                maskRe: /[0-9]/
                            }, {
                                xtype: 'textfield',
                                fieldLabel : 'NUPTK',
                                name:'nuptk',
                                anchor: '60%',
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Nama',
                                name:'nama',
                                anchor: '98%',
                                allowBlank: false
                            }, {
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Jenis Kelamin',
                                defaultType: 'radiofield',
                                anchor: '75%',
                                defaults: {
                                    flex: 1
                                },
                                layout: 'hbox',
                                items: [{
                                    boxLabel  : 'Laki-laki',
                                    name      : 'kelamin',
                                    inputValue: 'L',
                                    id        : 'radio1'
                                }, {
                                    boxLabel  : 'Perempuan',
                                    name      : 'kelamin',
                                    inputValue: 'P',
                                    id        : 'radio2'
                               }]
                            }, {
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Tempat, Tanggal Lahir',
                                anchor: '98%',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    msgTarget: 'side',
                                    name: 'tptlahir',
                                    flex: 1.9,
                                    allowBlank: false
                                }, {
                                    xtype: 'container',
                                    width: 3
                                },{
                                    xtype: 'datefield',
                                    msgTarget: 'side',
                                    name: 'tgllahir',
                                    format: 'd-m-Y',
                                    flex: 1,
                                    allowBlank: false
                               }]
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Agama',
                                name:'agama',
                                anchor: '98%'
                            }, {
                                xtype: 'fieldcontainer',
                                fieldLabel : 'Golongan Darah',
                                anchor: '98%',
                                defaultType: 'radiofield',
                                defaults: {flex: 1},
                                style: 'border-width: 0px',
                                layout: 'hbox',
                                items: [{
                                    boxLabel  : 'A',
                                    name      : 'goldarah',
                                    inputValue: 'A',
                                    id        : 'goldarah1'
                                }, {
                                    boxLabel  : 'B',
                                    name      : 'goldarah',
                                    inputValue: 'B',
                                    id        : 'goldarah2'
                                }, {
                                    boxLabel  : 'AB',
                                    name      : 'goldarah',
                                    inputValue: 'AB',
                                    id        : 'goldarah3'
                                }, {
                                    boxLabel  : 'O',
                                    name      : 'goldarah',
                                    inputValue: 'O',
                                    id        : 'goldarah4'
                               }]
                            }, {
                                xtype: 'container',
                                layout: {
                                    align: 'stretch',
                                    type: 'absolute'
                                },
                                anchor: '98%',
                                height: 51,
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel : 'Alamat',
                                    x:0,
                                    y:0,
                                    name: 'alamat1',
                                    anchor: '100%'

                                }, {
                                    xtype: 'textfield',
                                    fieldLabel : ' ',
                                    labelSeparator: ' ',
                                    x:0,
                                    y:23,
                                    name: 'alamat2',
                                    anchor: '100%'
                               }]
                            }, {
                                xtype: 'textfield',
                                maskRe: /[0-9]/,
                                fieldLabel: 'No. Telepon',
                                name:'telepon',
                                anchor: '70%',
                                maxLength: 50
                            }, {
                                xtype: 'textfield',
                                maskRe: /[0-9]/,
                                fieldLabel: 'No. HP',
                                name:'hp',
                                anchor: '70%',
                                maxLength: 50
                            }, {
                                xtype: 'container',
                                height: 5
                            }, {
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Pendidikan Terakhir',
                                anchor: '98%',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'combobox',
                                    name: 'pendidikan',
                                    store: Ext.create('PL.store.stores', {
                                        fields: ['kode'],
                                         data: [
                                            {'kode': 'SD'},
                                            {'kode': 'SMP'},
                                            {'kode': 'SMA'},
                                            {'kode': 'D1'},
                                            {'kode': 'D2'},
                                            {'kode': 'D3'},
                                            {'kode': 'S1'},
                                            {'kode': 'S2'},
                                            {'kode': 'S3'}
                                         ]
                                    }),
                                    valueField: 'kode',
                                    displayField: 'kode',
                                    queryMode: 'local',
                                    typeAhead: true,
                                    flex: 0.3
                                }, {
                                    xtype: 'container',
                                    width: 10
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal Lulus',
                                    labelWidth: 80,
                                    msgTarget: 'side',
                                    name: 'tgllulus',
                                    format: 'd-m-Y',
                                    flex: 1,
                                    allowBlank: false
                               }]
                            }, {
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Status',
                                defaultType: 'radiofield',
                                anchor: '98%',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'combobox',
                                    name: 'pegawai',
                                    store: Ext.create('PL.store.stores', {
                                        fields: ['kode'],
                                         data: [
                                            {'kode': 'GTT'},
                                            {'kode': 'GTY'}
                                         ]
                                    }),
                                    valueField: 'kode',
                                    displayField: 'kode',
                                    queryMode: 'local',
                                    typeAhead: true,
                                    flex: 0.5
                                }, {
                                    xtype: 'container',
                                    width: 40
                                }, {
                                    boxLabel  : 'Aktif',
                                    name      : 'status',
                                    inputValue: 'A',
                                    listeners : {
                                        change: function(e) {
                                            if(!e.getValue()) return;
                                            me.down('datefield[name=tglselesai]').setValue();
                                            me.down('datefield[name=tglselesai]').setDisabled(true);
                                        }
                                    },
                                    flex: 0.7
                                }, {
                                    boxLabel  : 'Pensiun',
                                    name      : 'status',
                                    inputValue: 'P',
                                    listeners : {
                                        change: function(e) {
                                            if(!e.getValue()) return;
                                            me.down('datefield[name=tglselesai]').setDisabled(false);
                                        }
                                    },
                                    flex: 0.7
                                }]
                            }, {
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Tanggal. Mulai Tugas',
                                defaultType: 'datefield',
                                anchor: '98%',
                                layout: 'hbox',
                                items: [{
                                    name: 'tmt',
                                    format: 'd-m-Y',
                                    flex: 0.52
                                }, {
                                    xtype: 'container',
                                    width: 5
                                }, {

                                    name: 'tglselesai',
                                    disabled: true,
                                    fieldLabel: 'Tgl. Pensiun',
                                    format: 'd-m-Y',
                                    flex: 0.95,
                                    labelWidth: 75
                                }]
                            }]
                        }]
                    }, {
                        xtype: 'container',
                        region: 'east',
                        layout: {
                            align: 'stretch',
                            type: 'vbox'
                        },
                        width: 215,
                        items: [{
                            xtype: 'label',
                            text: 'Photo:',
                            style: 'font-weight: bold; font-style:italic;'
                        },{
                            xtype: 'container',
                            height: 2
                        }, Ext.create('PL.view.gambar', {
                            itemId: 'viewlogo',
                            region: 'east',
                            width: 215,
                            height: 300,
                            border: true
                        }), {
                            xtype: 'container',
                            height: 1
                        }, {
                            xtype: 'form',
                            hidden: c.isView,
                            height: 50,
                            name: 'formupload',
                            layout: 'border',
                            border: false,
                            items: [{
                                xtype: 'fieldcontainer',
                                region: 'center',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'filefield',
                                    name: 'filename',
                                    emptyText: 'Pilih file ...',
                                    buttonText: '...',
                                    flex: 1
                                }, {
                                    xtype: 'container',
                                    width: 3
                                },{
                                    xtype: 'button',
                                    text: 'Upload',
                                    action: 'upload'
                                }]
                            }, {
                                xtype: 'label',
                                region: 'south',
                                text: 'Ukuran file tidak boleh lebih dari 64Kb.'
                            }]
                        }]
                    }]
                }]
            }, {
                xtype: 'container',
                region: 'south',
                items: [{
                    xtype: 'container',
                    height: 5
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items:[{
                        xtype: 'container',
                        flex: 1
                    },{
                        xtype: 'button',
                        action: 'simpan',
                        text: c.isEdit?'Update':'Simpan',
                        width: 80
                    }, {
                        xtype: 'container',
                        width: 5
                    }, {
                        xtype: 'button',
                        text: 'Batal',
                        width: 80,
                        scope: this,
                        handler: this.close
                    }, {
                        xtype: 'container',
                        width: 5
                    }]
                },{
                    xtype: 'container',
                    height: 5
                }]
            }]
        });

        this.callParent(arguments);
     },

    showPicture: function(update) {
        this.down('#viewlogo').loadRecord(null,null,'store/photo.php?'+
            this.down(update?'hiddenfield[name=session_id]':'hiddenfield[name=noedit]').getValue() + '&' +
            (update?'1':'') + '&guru&no&');
    }
});
                    
