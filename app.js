Ext.Loader.setConfig({enabled:true});

Ext.application({
    name: 'PL',

    controllers: [
        'utama',
        'login',
        'guru',
        'kehadiran',
        'user'
    ],
    
    appFolder: 'app',

    launch: function() {        

        Ext.create('PL.view.utama');
        
    }
});