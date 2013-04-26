Ext.define('PL.view.guru.list', {

    extend: 'Ext.panel.Panel',
    alias:'widget.gurulist',

    modulId: 'GR',
    title:'Data Guru',

    layout: 'fit',
    border: false,   

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'panel',
                border: false,
                layout: 'fit',
                items:[{
                    xtype: 'plgrid',
                    layout: 'fit',
                    flex: 1,
                    store: Ext.create('PL.store.stores', {
                        fields: ['no','nama', 'nip', 'nuptk', 'kelamin', 'pendidikan', 'tmt', 'status_pegawai', 'status'],
                        url: 'store/guru/dataStore.php',
                        autoLoad: true
                    }),
                    columns: [
                        {text: 'No.', flex: 0.2, sortable: true, dataIndex: 'no', align: 'center'},
                        {text: 'Nama', flex: 1, sortable: true, dataIndex: 'nama'},
                        {text: 'NUPTK', flex: 0.5, sortable: true, dataIndex: 'nuptk', align: 'center'},
                        {text: 'Jenis Kelamin', flex: 0.4, sortable: true, dataIndex: 'kelamin', align: 'center'},
                        {text: 'Pendidikan', flex: 0.4, sortable: true, dataIndex: 'pendidikan', align: 'center'},
                        {text: 'TMT', flex: 0.5, sortable: true, dataIndex: 'tmt', align: 'center'},
                        {text: 'Pegawai', flex: 0.5, sortable: true, dataIndex: 'status_pegawai', align: 'center'},
                        {text: 'Status', flex: 0.5, sortable: true, dataIndex: 'status', align: 'center'}
                    ],
                    idProp: 'no'
                }]
            }]
        });

        me.callParent(arguments);
    }
});