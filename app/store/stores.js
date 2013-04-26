Ext.define('PL.store.stores', {
    extend: 'Ext.data.Store',

    constructor: function(config) {

        if(!config.noPage) this.pageSize = 50;

        Ext.apply(config, {
            storeId: '',
            remoteSort: true,
            proxy: {
                type: 'ajax',
                url: config.url, 
                actionMethods: {
                    read: 'POST'
                },
                extraParams: config.params?config.params:null,
                reader: {
                    type: 'json',
                    root: 'topics',
                    totalProperty: 'totalCount',
                    idProperty: 'xxx'
                },
                simpleSortMode: true
            }
        });

        this.callParent(arguments);

    }

});