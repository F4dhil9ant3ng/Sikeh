Ext.define('PL.view.dataView', {

    extend: 'Ext.view.View',
    alias : 'widget.pldataview',
    style: {
        position: 'absolute'
    },
    x: 0, y: 0,
    trackOver: true,

    store: Ext.create('PL.store.stores', {
        fields: ['kode','name','iconCls','modul',{name: 'kolom', type: 'int'},{name: 'baris', type: 'int'}],
        url: 'store/shortcutStore.php'
    }),

    tpl  : Ext.create('Ext.XTemplate',
            '<tpl for=".">',                
                '<div style="position:absolute; top:{baris}px; left:{kolom}px;">',
                    '<div class="ux-desktop-shortcut" id="{kode}-shortcut">',
                        '<center><div class="ux-desktop-shortcut-icon {iconCls}">',
//                            '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}" >',
                        '</div></center>',
                        '<span class="ux-desktop-shortcut-text">{name}</span>',
                    '</div>',
                '</div>',
            '</tpl>'
    ),

   
    id: 'phones',

    itemSelector: 'div.ux-desktop-shortcut',
    overItemCls : 'x-view-over'
    

});