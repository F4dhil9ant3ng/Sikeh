Ext.define('PL.view.plgrid', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.plgrid',
    
    columnLines: true,    
    layout: 'fit',
    border: true,

    constructor: function(c) {
        var me = this;        

        Ext.apply(c, {
            selModel: (c.sm?false:Ext.create('Ext.selection.CheckboxModel', {
                listeners: {
                    selectionchange: function(sm, selections) {
                        if(me.isEdit) return;
                        
                        var idSelect='';
                        for(var i=0; i<sm.getSelection().length; i++)
                            idSelect=idSelect + (idSelect!=''?',':'') + sm.getSelection()[i].data[c.idProp?c.idProp:'id'];
                        me.down('#selected').setValue(idSelect);

                        me.down('#removeButton').setDisabled(selections.length == 0);
                        me.down('#editButton').setDisabled(selections.length != 1);
                        me.down('#viewButton').setDisabled(selections.length != 1);
                    }
                }
            })),
            dockedItems: [{
                hidden: c.hidedockedItems,
                xtype: 'toolbar',
                items: [{
                    itemId: 'baruButton',
                    text:'Baru',
                    tooltip:'Tambah data baru',
                    iconCls:'add',
                    hidden: c.hideBaru?c.hideBaru:false,
                    action: 'baru'
                }, {
                    itemId: 'editButton',
                    text:'Edit',
                    tooltip:'Edit data yang dipilh',
                    iconCls:'edit',
                    hidden: c.hideEdit?c.hideEdit:false,
                    disabled: true,
                    action: 'edit'
                },{
                    itemId: 'removeButton',
                    text:'Hapus',
                    tooltip:'Hapus data yang dipilih',
                    iconCls:'remove',
                    hidden: c.hideHapus?c.hideHapus:false,
                    disabled: true,
                    action: 'hapus'
                }, {
                    itemId: 'viewButton',
                    text:'View',
                    tooltip:'Lihat data yang dipilih',
                    iconCls:'view',
                    hidden: c.hideView?c.hideView:false,
                    disabled: true,
                    action: 'view'
                }, {
                    xtype: 'container',
                    width: 100
                }, Ext.create('PL.view.searchField', {
                        hidden: c.hideSearch,
                        store: c.store,
                        flex: 1
                }), {                    
                    itemId: 'exportButton',
                    tooltip:'Ekspor data',
                    iconCls:'export',
                    hidden: true,
                    action: 'export'
                }, {
                    itemId: 'importButton',
                    tooltip:'Impor data',
                    iconCls:'import',
                    hidden: true,
                    action: 'import'
                }, {
                    itemId: 'printButton',
                    tooltip:'Cetak',
                    iconCls:'cetak',
                    hidden: true,
                    action: 'print'
                }, {
                   xtype: 'container',
                   width: 35
                }, {
                    xtype: 'form',
                    hidden: true,
                    border: false,
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'selected',
                        itemId: 'selected'
                    }]
                }]
            }],        
            bbar: Ext.create('Ext.PagingToolbar', {
                hidden: c.hidePaging,
                store: c.store,
                displayInfo: true,
                displayMsg: 'Data {0} - {1} dari {2} data',
                emptyMsg: 'Tidak ada data untuk ditampilkan'
            })
        });

        this.callParent(arguments);

//    },
//
//    afterRender: function(){
//        this.callParent();
//
//        if(this.loadFirst) this.store.loadPage(1);
    }
    
});