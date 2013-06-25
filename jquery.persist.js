/*
	jquery-persist 201203*pike
	
	persist form values in cookies
	
	example usage:
	
		$('input,select,textarea').persist();

*/

jQuery.fn.persist = function(options) {
	options = jQuery.extend({}, jQuery.persist.defaults, options);
	$(this).each(function() {
		var name = $(this).attr('name');
		//console.log(name);
    	if(jQuery.cookie(options['prefix']+name )){
    		var val = jQuery.cookie(options['prefix']+name);
    		switch(this.tagName.toLowerCase()) {
    			case  'input':
					switch($(this).attr('type')) {
						case 'radio':
							$(this).parents('form').eq(0)
								.find('input[name="'+name+'"]').each(function() {
								this.checked = ($(this).val()==val);
							});
							break;
						case 'checkbox':
							var vals = val.split('//');
							$(this).parents('form').eq(0)
								.find('input[name="'+name+'"]').each(function() {
								this.checked = (jQuery.inArray($(this).val(),vals)!=-1);
							});
							break;
						default:
							$(this).val(val);
					}
					break;
				case 'select':
					if ($(this).attr('multiple')) {
						var vals = val.split('//');
						$(this).children('option').each(function() {
							this.selected = (jQuery.inArray($(this).val(),vals)!=-1);
						});
					} else {
						$(this).val(val);
					}
					break;	
				default:
					$(this).val(val);
    		}
    	}
	}).change(function(){
		var name = $(this).attr('name');
		//console.log(name);
		switch(this.tagName.toLowerCase()) {
    		case  'input':
    			switch($(this).attr('type')) {
					case "checkbox":
						var vals = [];
						$(this).parents('form').eq(0)
							.find('input[name="'+name+'"]').each(function() {
							if (this.checked) vals.push($(this).val());
						});
						jQuery.cookie(options['prefix']+name,vals.join('//'), { 
							path: options['path'], 
							expires: options['expires']
						});
						break;
					default:
						jQuery.cookie(options['prefix']+name, $(this).val(), { 
							path: options['path'], 
							expires: options['expires']
						});
				}
				break;
			case "select":
				if ($(this).attr('multiple')) {
					var vals = [];
					$(this).children('option').each(function() {
						if (this.selected) vals.push($(this).val());
					});
					jQuery.cookie(options['prefix']+name,vals.join('//'), { 
						path: options['path'], 
						expires: options['expires']
					});
				} else {
					jQuery.cookie(options['prefix']+name, $(this).val(), { 
						path: options['path'], 
						expires: options['expires']
					});
				}
				break;
			default:
				jQuery.cookie(options['prefix']+name, $(this).val(), { 
					path: options['path'], 
					expires: options['expires']
				});
		}
	});
}
jQuery.persist = {
	defaults: {
		prefix 	: 'JQP-',
		path	: '/',
		expires	: 365
	}
};
