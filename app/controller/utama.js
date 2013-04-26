Ext.define('PL.controller.utama', {
    extend: 'Ext.app.Controller',

    models: ['mainmenu'],

    views: ['utama','gambar','wallpaper','autoComplete','plgrid','CheckColumn','Month',
            'searchField','akses','dataView','StatusBar'],

    render: function(comp) {
        var me = this,
            form = comp.down('form[name=utama]');
        
        form.getForm().submit({
            params: {first: 'Y'},
            success:function(f, action) {
                comp.aksesStore.loadPage(1);
            },
            failure:function() {
                me.offline(comp);
                me.removeMask();
            }
        });

        comp.aksesStore.on({
            load: function(store, records, successful, eOpts) {
                if(successful) {                    
                    if(store.getCount()==0)
                        me.offline(comp);
                    else
                        me.online(comp);

                    me.removeMask();
                    if(form.myMask) form.myMask.hide();
                }
            }
        });

    },

    removeMask: function() {
        if(Ext.get('loading-mask')) {
            Ext.get('loading').remove();
            Ext.get('loading-mask').fadeOut({remove:true});
        }
    },

    init: function() {

        this.control({

            'utama': {
                render: this.render
            },

            'utama button[action=logout]': {
                click: this.logout
            },

            'utama treepanel[itemId=mainmenu]': {
                itemclick: this.openModul
            },

            'utama dataview[name=setting]': {
                itemclick: this.onSelectionChange
            }
        });
    },
    

    onSelectionChange: function(dv, selected) {

        var comp = Ext.getCmp('utama');        
        if(selected) {
            if(selected.data['text']=='Logout') this.logout(comp);
            else Ext.create(selected.data['modul'], {modal: true}).show();
        }

    },

    openModul: function(tp, record) {
        
        if(record && record.data['modul']!='') {
            var me = this,
                comp = Ext.getCmp('utama'),
                tabpanel = comp.down('tabpanel[name=utama]');
            for(var i=0; i<tabpanel.items.length; i++) {
                if(record.data['idmodul']==tabpanel.items.getAt(i).modulId) {
                    tabpanel.setActiveTab(i);
                    return;
                }
            }

            var win = Ext.create(record.data['modul'], {
                    closable: true,
                    aksesStore: comp.aksesStore
                }),
                store = comp.aksesStore;
            new PL.view.akses().cekMenu(store, win);

            tabpanel.add(win).show();
        }
    },

    logout: function(comp) {
        var me = this,
            form = comp.down('form[name=utama]');

        form.getForm().waitMsgTarget = form.getEl();
        form.getForm().load({
            waitMsg: 'Keluar...',
            url: 'store/logout.php',
            failure:function() {
                var tabpanel = comp.down('tabpanel[name=utama]');
                for(var i=tabpanel.items.length-1; i>=0; i--)
                    tabpanel.items.getAt(i).close();

                me.offline(comp);
            }
        });
   },

    showWindow: function(tab, w) {
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});
        myMask.show();

        var f = function(){
            return function() {
                if(tab.popup==undefined)
                    tab.popup = new Array();

                tab.add(w);
                tab.popup[tab.popup.length] = w;
                w.on('close', function() {
                   w.closed = true;
                   delete w; //this.popup[tab.popup.length] = undefined;
                }, tab, { single: true });
                w.show();
                myMask.hide();
            };
        };

        setTimeout(f(), 0);
    },

    tabchange: function(tab) {
        if (tab.popup !== undefined) 
            for(var i=0; i<tab.popup.length; i++) 
                if(!tab.popup[i].closed) tab.popup[i].show();
    },

    offline: function(comp) {

        var tab = Ext.create('Ext.panel.Panel', {
            itemId: 'tablogin',
            title: 'Silahkan Login',
            layout: {
                    align: 'stretch',
                    type: 'hbox'
            },
            items: [{
                xtype: 'container',
                flex: 1
            }, {
                xtype: 'container',
                width: 400,
                layout: {
                    align: 'stretch',
                    type: 'vbox'
                },
                items: [{
                    xtype: 'container',
                    flex: 1
                }, Ext.create('PL.view.login.loginWindow', {
                    formUtama: comp.down('form[name=utama]'),
                    constrain: true
                }), {
                    xtype: 'container',
                    flex: 1
                }]

            }, {
                xtype: 'container',
                flex: 1
            }]
        });

        comp.down('tabpanel[name=utama]').add(tab).show();

        Ext.getCmp('status').setStatus({
            text: 'Offline',
            iconCls: 'x-status-error'
        });
        comp.down('tbtext[name=nameuser]').setText('No User Login');
        comp.down('#mainmenu').getRootNode().removeAll();
        comp.down('dataview[name=setting]').getStore().removeAll();

    },

    online: function(comp) {

        Ext.getCmp('status').setStatus({
            text: 'Online',
            iconCls: 'x-status-valid'
        });

        comp.down('tbtext[name=nameuser]').setText(comp.aksesStore.getAt(0).data['namauser']);
        comp.down('#mainmenu').getStore().load();
        comp.down('dataview[name=setting]').getStore().loadPage(1);


    }
});