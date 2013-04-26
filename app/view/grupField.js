Ext.define('PL.view.grupField', {

    extend:'Ext.form.field.ComboBox',
    alias: 'widget.grupfield',

    constructor: function(config) {

        Ext.apply(config, {
            store: Ext.create('PL.store.stores', {
                fields: ['idgrup', 'keterangan'],
                url: 'store/grupStore.php',
                autoLoad: config.isAutoLoad
            }),
            valueField: 'idgrup',
            displayField: 'keterangan',
            queryMode: 'local',
            typeAhead: true //,
        });

        this.callParent(arguments);
    }

});

