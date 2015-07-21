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


})(jQuery);

/**
*  以键值对存储
*  @ $.hashAjax(method,baseUrl,callback,type)
*  @ $.$.hash.setHash(Object);
*/
;(function($) {

	if ($.hashMap) {
		return;
	}

	$.hashMap = function() {
		var struct = function(key, value) {
			this.key = key;
			this.value = value;
		};

		var put = function(key, value) {
			for (var i = 0; i < this.arr.length; i++) {
				if (this.arr[i].key === key) {
					this.arr[i].value = value;
					return;
				}
			}
			this.arr[this.arr.length] = new struct(key, value);
			this._keys[this._keys.length] = key;
		};

		var get = function(key) {
			for (var i = 0; i < this.arr.length; i++) {
				if (this.arr[i].key === key) {
					return this.arr[i].value;
				}
			}
			return null;
		};

		var remove = function(key) {
			var v;
			for (var i = 0; i < this.arr.length; i++) {
				v = this.arr.pop();
				if (v.key === key) {
					continue;
				}
				this.arr.unshift(v);
				this._keys.unshift(v);
			}
		};

		var size = function() {
			return this.arr.length;
		};

		var keys = function() {
			return this._keys;
		};

		var isEmpty = function() {
			return this.arr.length <= 0;
		};

		this.arr = new Array();
		this._keys = new Array();
		this.keys = keys;
		this.get = get;
		this.put = put;
		this.remove = remove;
		this.size = size;
		this.isEmpty = isEmpty;
	}
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
	var hashAjax = {};
	hashAjax.option = new $.hashMap();		
	hashAjax.__aurl = "__aurl";

	//注册需要处理的ajax
	hashAjax.register = function(method,baseUrl,callback,type) {
		
		var option = {};
		option.method = method;
		option.baseUrl = baseUrl;
		option.callback = callback;
		option.type = type?type:"json";

		hashAjax.option.put(encodeURIComponent(baseUrl),option);
	};
	//处理hash，
	hashAjax.execute = function(){

		if(location.hash){ 
			var param = $.hash.getObject();
			hashAjax.ajax(param);
		}

		$(window).bind("hashchange",function(){
			var param = $.hash.getObject();
			location.href += "";//IE下后退问题
			if(param){
				hashAjax.ajax(param);
			}
		});
	
	};

	//处理ajax请求
	hashAjax.ajax = function(data){

		var url = data[hashAjax.__aurl];
		url = encodeURIComponent(url);
		
		var obj = hashAjax.option.get(url);

		if(!obj){//如果没有设置aurl，取第一个
			if(hashAjax.option.isEmpty()){
				return false;
			}
			obj=hashAjax.option.arr[0].value;
		}
	/*	if(obj.method.toLowerCase() == "get"){
			$.get(obj.baseUrl, data,obj.callback ,obj.type);
		}else{
			$.post(obj.baseUrl, data,obj.callback ,obj.type);
		}*/
		
		$.ajax({
			   type:obj.method,
			   url: obj.baseUrl,
			   data: data,
			   dataType:obj.type,
			   error:function(XMLResponse){alert(XMLResponse.responseText)},
			   success: obj.callback
		});

	}

	//对象数组，设置hash参数
	hashAjax.request = function(ajaxUrl,object){
	    if(null!=object && "undefined"!=object){

			var res = "";
			for(var o in object){
				res += o+"="+object[o]+"&";
			}
			res += hashAjax.__aurl+"="+encodeURIComponent(ajaxUrl);
			$.hash("#",res);
		}
	};

	$.hashAjax = hashAjax;

})(jQuery);

