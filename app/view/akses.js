Ext.define('PL.view.akses', {

    cekMenu: function(store, win) {
        var index = store.indexOf(store.findRecord('idmodul', win.modulId)),
            akses = store.getAt(index).data['akses'];
        if(win.down('#baruButton')) win.down('#baruButton').setVisible(akses[0]=='Y');
        if(win.down('#editButton')) win.down('#editButton').setVisible(akses[1]=='Y');
        if(win.down('#removeButton')) win.down('#removeButton').setVisible(akses[2]=='Y');
        if(win.down('#importButton')) win.down('#importButton').setVisible(akses[3]=='Y');
        if(win.down('#exportButton')) win.down('#exportButton').setVisible(akses[4]=='Y');
        if(win.down('#viewButton')) win.down('#viewButton').setVisible(akses[5]=='Y');
        if(win.down('#printButton')) win.down('#printButton').setVisible(akses[6]=='Y');
    },

    cekAksesUtama: function(store, grupId, itemId, aksi) {
        for(var i=0; i<store.getCount(); i++) {
            if(grupId && grupId==store.getAt(i).data['idgrup']) return true;
            
            if(itemId && itemId==store.getAt(i).data['idmodul'])
                return (aksi!=undefined)?store.getAt(i).data['akses'][aksi]=='Y':true;
            
        }
        return false;
    },

    getAllChildenIds: function(panel, aksesStore) {

        /*Get all child items. */
        var children = this.getAllChilden(panel);

        /*Replace items with their ids.*/
        for (var i=0; i<children.length; i++) {
            if(children[i].grupId)
                children[i].setVisible(this.cekAksesUtama(aksesStore, children[i].grupId, null));

            if(children[i].itemId)
                children[i].setVisible(this.cekAksesUtama(aksesStore, null, children[i].itemId, children[i].aksi));
        }



    },

    getAllChilden: function(panel) {

        var me = this;
        /*Get children of passed panel or an empty array if it doesn't have thems.*/
        var children = panel.items ? panel.items.items : [];
        /*For each child get their children and concatenate to result.*/
        Ext.each(children, function (child) {
            children = children.concat(me.getAllChilden(child));
        })
        return children;
    },

    viewDetail: function(panel) {

        var children = this.getAllChilden(panel);

        for (var i=0; i<children.length; i++) {
            if(children[i].action=='simpan')
                children[i].setVisible(false);
            if(children[i].xtype=='button' && children[i].text=='Batal')
                children[i].text = 'Tutup';
            else {
                children[i].readOnly = true;
            }
        }


    }
});