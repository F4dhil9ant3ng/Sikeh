Ext.define('PL.view.autoComplete', {

    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.autoComplete',

    isExpanding: true,
    submitValue: '',

    constructor: function(config) {
        var me = this;
        //console.log(config.multiSelect);
        var store = config.store?config.store:
        Ext.create('PL.store.stores', {
            fields: config.fields,
            url: config.url,
            listeners: {
                load: function(e, records, successful, eOpts) {
                    if(successful && me.isInitValue) {

                        me.isInitValue = false;
                        me.storeOnLoad = true;
                        var proxy = me.store.getProxy();

                        proxy.extraParams['initVal'] = '';
                        me.submitValue = me.getDisplayValue()==''?'':(me.store.getCount()>0?me.store.getAt(0).data[me.valueField]:me.getValue());
                        me.setValue(me.getDisplayValue()==''?'':(me.store.getCount()>0?me.store.getAt(0).data[me.displayField]:me.getValue()));

                        if(me.listenLoad!=undefined) me.listenLoad(me);
                        me.store.removeAll();

                        me.updateExtraParamCombo();
                        me.storeOnLoad = false;

                    }
                }
            }
        });

        Ext.apply(config, {
            store: store,
            queryMode: 'remote',
            queryDelay: 100,
            typeAhead: !config.multiSelect, //true,
            minChars:0,
            listConfig: {
                loadingText: 'Loading...',
                getInnerTpl: function() {
                    return config.textTpl;
                }
            },
            listeners: {
                select: this.onSelected
            },
            pageSize: config.noPage?null:store.pageSize
        });

        this.callParent(arguments);

    },

    onChange: function(v) {
        if(v=='') this.isInitValue = false;

        if(this.isInitValue) { // && v.length>0) {
            var proxy = this.store.getProxy();
            proxy.extraParams['initVal'] = v;
            this.submitValue = v;
            this.store.load();
        } else if(!this.storeOnLoad) {
            this.submitValue = v;
            this.resetValiabels();
            this.updateExtraParamCombo();
        }
        if(this.listenChange != undefined) this.listenChange(v);

    },

    resetValiabels: function() {
        if(!this.variables) return;
        for(var i=0; i<this.variables.length; i++)
            if(this.up('window').down('autoComplete[name=' + this.variables[i] + ']')) this.up('window').down('autoComplete[name=' + this.variables[i] + ']').setValue('');
    },

    onExpand: function() {
        if(this.isExpanding) return;

        this.store.load();
        this.isExpanding = true;
    },

    onSelected: function(e) {

//        alert(this.listenSelect);
        this.submitValue = e.getValue();
        this.resetValiabels();
        this.updateExtraParamCombo();

        if(this.listenSelect != undefined) this.listenSelect(e);
    },

    updateExtraParamCombo: function() {
        if(!this.variables) return;

        var win = this.up('window'), combo, store, proxy;
        for(var i=0; i<this.variables.length; i++) {
            if(win.down('autoComplete[name=' + this.variables[i] + ']')) {
                combo = win.down('autoComplete[name=' + this.variables[i] + ']'),
                store = combo.store,
                proxy = store.getProxy();
                proxy.extraParams[this.parameters] = this.submitValue;
                combo.isExpanding = false;
            }
        }
    },

    getSubmitValue: function() {
        //if(this.name=='sales') alert(this.submitValue);
        //return this.getDisplayValue()==''?'':this.submitValue;
        return this.submitValue;
    }
});
