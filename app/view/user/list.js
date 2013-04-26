Ext.define('PL.view.user.list' ,{

    extend: 'Ext.panel.Panel',
    alias : 'widget.userlist',

    title : 'Data Pengguna',
    modulId: 'PE',
    layout: 'fit',    

    initComponent: function() {
        
        this.items = [
            Ext.create('PL.view.plgrid', {
                layout: 'fit',
                border: false,
                loadFirst: true,
                flex: 1,
                store: Ext.create('PL.store.stores', {
                    fields: [
                        {name: 'id', type: 'string'},
                        {name: 'iduser', type: 'string'},
                        {name: 'nama', type: 'string'},
                        {name: 'aktif', type: 'string'},
                        {name: 'status', type: 'string'}
                     ],
                    url: 'store/user/dataStore.php',
                    autoLoad: true
                }),
                columns: [
                    {text: 'User ID', width: 90, sortable: true, dataIndex: 'iduser'},
                    {text: 'Nama User', flex: 1, sortable: true, dataIndex: 'nama'},
                    {text: 'Status', width: 70, align: 'center', sortable: true, dataIndex: 'aktif'}
                ]
            })
        ];
        
        this.callParent(arguments);
    }
});