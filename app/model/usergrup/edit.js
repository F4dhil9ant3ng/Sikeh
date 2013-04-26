Ext.define('PL.model.usergrup.edit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idgrup', type: 'string'},
        {name: 'namagrup', type: 'string'},

        {name: 'iduser', type: 'string'},
        {name: 'userid', type: 'string'},
        {name: 'namauser', type: 'string'},
        {name: 'grup', type: 'string'},
        {name: 'nonaktif', type: 'bool'}

    ]
});