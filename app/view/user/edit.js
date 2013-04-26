Ext.define('PL.view.usergrup.edit', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.usergrupedit',

    layout: 'fit',
    modal: true,

    width: 720,
    height: 455,
    border: false,

    initComponent: function() {
        var me = this;

//        var header = new Array('Tambah','Edit','Hapus','Approve','Cetak','View');
//        var dataIndex = new Array('tambah','edit','hapus','approve','cetak','view');
//
//        var checkColumn = new Array();
//        for(var i=0; i<header.length; i++)
//            checkColumn[i] = new Ext.create('PL.view.CheckColumn', {
//                header: header[i],
//                width: 60,
//                sortable: false,
//                align: 'center',
//                dataIndex: dataIndex[i]
//            });
//
//        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
//            groupHeaderTpl: '{name} '
//        });
//        var groupingFeature1 = Ext.create('Ext.grid.feature.Grouping', {
//            groupHeaderTpl: '&nbsp;'
//        });


        Ext.apply(Ext.form.field.VTypes, {
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },

            passwordText: 'Passwords tidak sama.'
        });
        
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'PL.model.usergrup.list',
            proxy: {
                type: 'ajax',
                url: 'store/usergrup/modulStore.php',
                actionMethods: {
                    read: 'POST'
                }
            },
            listeners: {
                beforeload: function() {
                    return me.tsAllowLoad?me.tsAllowLoad:false;
                },
                load: function(a, node, records, successful, eOpts) {
                    me.tsAllowLoad = !successful;
//                    if(successful)
//                        me.down('textfield[name=namagrup]').focus(true, 10);
                }
            }
        });

        me.items = [{
            xtype: 'form',
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            bodyPadding: 10,
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 85
            },
            reader: Ext.create('Ext.data.JsonReader', {
                model: 'PL.model.usergrup.edit',
                root: 'results',
                totalProperty: 'total'
            }),

            items: [{
                xtype: 'container',
                itemId: 'grup',
                hidden: true,
                items: [{
                    xtype: 'textfield',
                    name: 'idgrup',
                    fieldLabel: 'ID Grup',
                    width: 150,
                    readOnly: true,
                    value: 'auto'
                }, {
                    xtype: 'textfield',
                    maxLength: 150,
                    name: 'namagrup',
                    allowBlank: false,
                    fieldLabel: 'Nama Grup',
                    width: 250
                }]
            }, {
                xtype: 'container',
                itemId: 'user',
                hidden: true,
                layout: 'hbox',
                height: 90,
                items:[{
                    xtype: 'container',
                    flex: 1,
                    items: [{xtype: 'hiddenfield', name: 'iduser'}, {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'userid',
                        fieldLabel: 'User ID',
                        width: 150,
                        minLength: 5,
                        maxLength: 25
                    }, {
                        xtype: 'textfield',
                        allowBlank: false,
                        maxLength: 150,
                        name: 'namauser',
                        fieldLabel: 'Nama User',
                        width: 250
                    },{
                        xtype: 'checkbox',
                        fieldLabel: 'Status Aktif',
                        name: 'nonaktif',
                        boxLabel: 'Non Aktif'
                    }]
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    xtype: 'container',
                    flex: 1,
                    items: [{
                        xtype: 'checkbox',
                        name: 'password',
                        boxLabel: 'Ganti Password',
                        hidden: true,
                        listeners: {
                            change: function(d) {
                                var win = d.up('window');
                                win.down('textfield[name=pass]').setDisabled(!d.getValue());
                                win.down('textfield[name=pass-cfrm]').setDisabled(!d.getValue());
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        allowBlank: false,
                        inputType: 'password',
                        fieldLabel: 'Password',
                        labelWidth: 120,
                        name: 'pass',
                        id: 'pass'
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        fieldLabel: 'Konfirmasi Password',
                        labelWidth: 120,
                        name: 'pass-cfrm',
                        vtype: 'password',
                        initialPassField: 'pass',
                        allowBlank: false
                    }]
                }]

            }, Ext.create('Ext.tree.Panel', {
                itemId: 'tree',
                title: 'Menu Akses',
                useArrows: true,
                rootVisible: false,
                layout: 'fit',                
                flex: 1,
                store: store,
                hideHeaders: true,
                columns: [
                    {xtype: 'treecolumn', flex: 1, dataIndex: 'keterangan'}
                ],
                listeners: {
                    checkchange: function(node, check) {
                        for(var i=0; i<node.childNodes.length; i++) {
                            node.childNodes[i].set('checked', check);
                            this.fireEvent('checkchange', node.childNodes[i], check);
                        }

                        if(!check && node.getDepth()==3) node.parentNode.set('checked', check);
                        if(check && node.getDepth()==3) {
                            for(i=0; i<node.parentNode.childNodes.length; i++)
                                if(node.parentNode.childNodes[i].data['checked']==false) return;

                            node.parentNode.set('checked', check);
                        }
                    }
                }
            }), {
                xtype: 'container',
                height: 10
            }, {
                xtype: 'container',
                layout: 'hbox',
                height: 22,
                items: [{
                    xtype: 'container',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'Simpan',
                    action: 'save'
                }, {
                    xtype: 'container',
                    width: 5
                }, {
                    xtype: 'button',
                    text: 'Batal',
                    scope: this,
                    handler: this.close
                }]
            }]
            
        }];
        me.callParent(arguments);
    },

    getData: function(akses) {
        var str = '',
            getAkses = false;

        for(var i=0; i<akses.length; i++) {
            if(!getAkses) getAkses = (akses[i] && akses[i]=='Y');
            str += akses[i]?akses[i]:'N';
        }

        return getAkses?str:'';
    },

    getDetail: function() {

        var tree = this.down('#tree'),
            root = tree.getRootNode(),
            parent = new Array(),
            str = '';
            
        for(var i=0; i<root.childNodes.length; i++) {
            parent[i] = root.childNodes[i];
            for(var j=0; j<parent[i].childNodes.length; j++) {
                parent[i][j] = parent[i].childNodes[j];
                var akses = new Array();
            
                for(var k=0; k<parent[i][j].childNodes.length; k++) {
                    parent[i][j][k] = parent[i][j].childNodes[k];
                    akses[eval(parent[i][j][k].data['idmodul'])] = parent[i][j][k].data['checked']?'Y':'N';
                }

                var getData = this.getData(akses);
                if(getData.length) str += (str!=''?'\n':'') + parent[i][j].data['idmodul'] + '\t' + getData;
            }
        }

        //alert(str);
        return str;
    },

    grupchange: function(combo) {
        var win = combo.up('window');
        if(!win.isReady) return;

        win.down('textfield[name=id' + combo.name + ']').setValue('');
    },

    grupselect: function(combo) {
        var win = combo.up('window');
        if(!win.isReady) return;

        var tree = win.down('#tree'),
            store = tree.store,
            proxy = store.getProxy(),
            v = combo.getValue(),
            r = combo.findRecord(combo.valueField || combo.displayField, v),
            index = combo.store.indexOf(r);

        win.down('textfield[name=id' + combo.name + ']').setValue(index==-1?'':combo.store.getAt(index).get('idgrup'));
        proxy.extraParams['idgrup']=win.down('textfield[name=id' + combo.name + ']').getValue();

        win.tsAllowLoad = true;
        tree.getRootNode().removeAll();
        store.load();
    },

    setItems: function(item, isEdit) {
        this.down('#' + item).setVisible(true);

        //jika grup
        this.down('textfield[name=namagrup]').setDisabled(item=='user');

        //jika user
        this.down('textfield[name=userid]').setDisabled(item=='grup');
        this.down('textfield[name=namauser]').setDisabled(item=='grup');

        this.down('button[action=save]').setText(!isEdit?'Simpan':'Update');

        this.down('checkbox[name=password]').setVisible(isEdit);

        this.down('textfield[name=pass]').setDisabled(item=='grup' || (item=='user' && isEdit));
        this.down('textfield[name=pass-cfrm]').setDisabled(item=='grup' || (item=='user' && isEdit));

    }
});