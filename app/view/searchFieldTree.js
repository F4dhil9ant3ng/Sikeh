Ext.define('PL.view.searchFieldTree', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchfieldtree',

    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch : false,
    paramName : 'query',

    initComponent: function(){
        this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },

    afterRender: function(){
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click : function(){

        var me = this,
            store = Ext.data.StoreManager.lookup(me.store),
            proxy = store.getProxy();

        if (me.hasSearch) {
            me.setValue('');
            
            //console.log(me.initParams);
            //if(me.initParams) proxy.extraParams = me.initParams;
            proxy.extraParams[me.paramName] = '';
            proxy.extraParams['start'] = 0;
            proxy.extraParams['count'] = 2;

            if(me.treeGrid) store.load();
            else store.loadPage(1);

            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.doComponentLayout();
        }
    },

    onTrigger2Click : function(){

        var me = this,
            store = Ext.data.StoreManager.lookup(me.store),
            proxy = store.getProxy(),
            value = me.getValue();

        if (value.length < 1) {
            me.onTrigger1Click();
            return;
        }

        //console.log(me.initParams);
        //if(me.initParams) proxy.extraParams = me.initParams;
        proxy.extraParams[me.paramName] = value;
        proxy.extraParams['start'] = 0;
        proxy.extraParams['count'] = 2;

        if(me.treeGrid) store.load();
        else store.loadPage(1);

        me.hasSearch = true;
        me.triggerCell.item(0).setDisplayed(true);
        me.doComponentLayout();
    }
});
