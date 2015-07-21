/** 
* @preserve jQuery Plugin: xHashchange v0.2.2 
*
* LICENSE: http://hail2u.mit-license.org/2009
*/ 
;(function($){
	"use strict";
	function hasOnhashchange(){
		return typeof window.onhashchange!=="undefined"
	}
	$.fn.hashchange=function(handler){
		$(window).bind("hashchange",handler);
		return this
	};
	$.xHashchange=function(){
		var o=$.xHashchange.defaults,hash=null,intervalID=null,interval=0;
		if(hasOnhashchange()){
			$(window).trigger("hashchange")
		}else{
			if(hash===null){
				hash=location.hash
			}if(intervalID!==null){
				clearInterval(intervalID)
			}if(interval!==o.interval){
				intervalID=setInterval(function(){
					if(hash!==location.hash){
						hash=location.hash;
						$(window).trigger("hashchange")
					}
				},o.interval);
				interval=o.interval
			}
		}return this
	};
	$.xHashchange.defaults={interval:500};
	$.xHashchange()
})(jQuery);

/*
 * jQuery hash plugin used for storage hash name-value pairs
 * into browser locaiton's hash string.
 *
 * You can set or save hash name-value，one time one name-value and handle onhashchange
 * @ $.hash("name", "value");
 *
 * You can get hash name's value
 * @ $.hash("name");
 *
 * You can delete hash name-value pairs
 * @ $.hash("name", null);
 *
 * You can reset hash whith name=# and value like "a=1&c=2"
 * @ $.hash("#","value")
 */
;(function($) {

	if ($.hash) {
		return;
	}

	$.hash = function(name, value) {
		// jQuery doesn't support a is string judgement, so I made it by myself.
		function isString(obj) {
			return typeof obj == "string" || Object.prototype.toString.call(obj) === "[object String]";
		}
		if (!isString(name) || name == "") {
			return;
		}

		var clearReg = new RegExp("(&" + name + "=[^&]*)|(\\b" + name + "=[^&]*&)|(\\b" + name + "=[^&]*)", "ig");
		var getReg   = new RegExp("&*\\b" + name + "=[^&]*", "i");
		if (typeof value == "undefined") {
			// get name-value pair's value
			var result = location.hash.match(getReg);
			return result ? decodeURIComponent($.trim(result[0].split("=")[1])) : null;
		}else if (value === null) {
			// remove a specific name-value pair
			location.hash = location.hash.replace(clearReg, "");
		}else if(name == "#"){
			//重定义hash的值
			location.hash = name + value;
		}else {
			value = value + "";

			// clear all relative name-value pairs 
			var temp = location.hash.replace(clearReg, "");

			// build a new hash value-pair to save it
			temp += ((temp.indexOf("=") != -1) ? "&" : "") + name + "=" + encodeURIComponent(value);
			location.hash = temp;
		}
	};
	//url格式参数转换为对象数组
	$.hash.getObject = function(){
		var hash = location.hash;
		if(hash){
			hash = hash.substr(1);
			var res = new Object();
			
			var temp = hash.split("&");

			for(var i in temp){
				var kv = temp[i].split("=");
				res[kv[0]] = kv[1];
			}
			return res;
		}else{
			return null;
		}
		
	};
	//对象数组，设置hash参数
	$.hash.setHash = function(object){
	    if(null!=object && "undefined"!=object){
			var res = "";
			for(var o in object){
				res += "&"+o+"="+object[o];
			}
			res = res.substr(1);
			$.hash("#",res);
		}
	};

})(jQuery);

/**
*  ajax
*  @ $.hashAjax(method,baseUrl,callback,type)
*  @ $.$.hash.setHash(Object);
*/
;(function($) {

	if ($.hashAjax) {
		return;
	}
	
	var hashAjax = function(method,baseUrl,callback,type) {
		
		hashAjax.option = {};
		hashAjax.option.method = method;
		hashAjax.option.baseUrl = baseUrl;
		hashAjax.option.callback = callback;
		hashAjax.option.type = type?type:"json";

		if(location.hash){ 
			var param = $.hash.getObject();
			hashAjax.request(param);
		}

		$(window).bind("hashchange",function(){
			var param = $.hash.getObject();
			location.href += "";//IE下后退问题
			hashAjax.request(param);

		});
	}

	hashAjax.request = function(data){
		
		if(hashAjax.option.method.toLowerCase() == "get"){
			$.get(hashAjax.option.baseUrl, data,hashAjax.option.callback ,hashAjax.option.type);
		}else{
			$.post(hashAjax.option.baseUrl, data,hashAjax.option.callback ,hashAjax.option.type);
		}

	}

	$.hashAjax = hashAjax;

})(jQuery);