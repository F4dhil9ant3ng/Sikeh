Ext.define('PL.view.utama', {
    
    extend: 'Ext.container.Viewport',
    alias : 'widget.utama',
    id: 'utama',
    layout: 'border',
    autoShow: true,
    title: 'NRB Online',

    initComponent: function() {
        var me = this;

        this.aksesStore = Ext.create('PL.store.stores', {
            fields: ['tipe', 'iduser', 'namauser', 'idmodul', 'idgrup', 'akses'],
            url: 'store/aksesStore.php'
        });

        this.items = [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> Sistem Informasi Kehadiran</h1>',
            height: 30
        }, {
            xtype: 'form',
            region: 'center',
            name: 'utama',
            url: 'store/cekSession.php',
            layout: 'border',
            border: false,
            flex: 1,
            items: [{
                xtype: 'tabpanel',
                name: 'utama',
                region: 'center'
            }, {
                xtype: 'panel',                
                split: true,
                width: 225,
                title: 'Panel Navigasi',
                region: 'west',
                collapsible: true,
                animCollapse: true,
                layout: 'border',
                items: [
                    Ext.create('Ext.tree.Panel', {
                    region: 'center',
                    itemId: 'mainmenu',
                    title: 'Menu',
                    useArrows: true,
                    rootVisible: false,
                    border: false,
                    store: Ext.create('Ext.data.TreeStore', {
                        model: 'PL.model.mainmenu',
                        proxy: {
                            type: 'ajax',
                            url: 'store/mainmenuStore.php',
                            actionMethods: {
                                read: 'POST'
                            }
                        }
                    }),
                    hideHeaders: true,
                    columns: [
                        {xtype: 'treecolumn', flex: 1, dataIndex: 'keterangan'}
                    ]
                }), {
                    xtype: 'panel',
                    region: 'south',
                    height: 100,
                    title: 'Personalisasi',
                    name: 'setting',
                    split: true,
                    border: false,
                    collapsible: true,
                    animCollapse: true,
                    bbar: Ext.create('PL.view.StatusBar', {
                        id: 'status',
                        items: ['->', {
                            xtype: 'tbtext',
                            name: 'nameuser'
                        }]
                    }),
                    layout: 'fit',
                    items: [{
                        xtype: 'dataview',
                        name: 'setting',
                        autoScroll: true,
                        trackOver: true,
                        store: Ext.create('PL.store.stores', {
                            fields: ['text', 'modul','cls'],
                            url: 'store/menuSettingStore.php'
                        }),
                        cls: 'setting-list',
                        itemSelector: '.setting-list-item',
                        overItemCls: 'setting-list-item-hover',
                        tpl: '<tpl for="."><div class="setting-list-item"><div class="{cls}">{text}</div></div></tpl>'
                    }]
                }]
            }]
        }];        
        this.callParent(arguments);
    }
});
