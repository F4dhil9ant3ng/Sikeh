Ext.define('PL.view.currencyField', {

    extend:'Ext.form.field.Text',
    alias: 'widget.currencyfield',
    i: 0,
    constructor: function(config) {
        
        this.func = new PL.view.currency();
        Ext.apply(config, {
            maskRe: config.minus?(config.tipe=='diskon'?/([0-9\s.\-+%]+)$/:/([0-9\s.\-]+)$/):
                    (config.tipe=='diskon'?/([0-9\s.+%]+)$/:/([0-9\s.]+)$/)
        });
                
        this.callParent(arguments);
    },

    onChange: function(v) {
        this.setValue(v);
    },

    setValue: function(v) {
	this.callParent(arguments);

        var t = this, f = t.func;
        this.setRawValue(t.tipe?(t.tipe=='diskon'?f.diskon(v):f.currency(v)):f.currency(v));
    }
    
});

