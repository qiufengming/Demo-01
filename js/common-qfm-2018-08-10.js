
/*******************************************		ajax 封装 start		******************************************************/
/* 全局ajax设置 */
$.ajaxSetup({
	cache:false, /* 防止get请求缓存问题 */
	crossDomain:false,/* 跨域请求头带上cookie */
	xhrFields: {withCredentials: false} /* 跨域请求头带上cookie */
});
/**
 * ajax方法
 * @param url	请求地址（接口）
 * @param data	参数
 * @param callBack	成功回调函数
 * @param async
 * @param dataType
 * @returns
 */
function hackPost(url, data, callBack, async, dataType) {

    var dataTypeVal;
    var asyncTF = true;
    
    if(async == undefined){
    	dataType = "json";
    }else if((typeof async) == 'boolean'){
    	asyncTF = async;
		if (dataType == undefined){
			dataTypeVal = "json";
		}else{
			dataTypeVal = dataType;
		}
    }else{
    	dataTypeVal= async; 
    }
    
    console.log('方法的名称：'+hackPost.caller.name)
    
    //判断是否为跨域对应的ajax方法
    if(hackPost.caller.name != "crossPost"){
    	
    	var projectName = getUrlProjectName();//获取url地址中的项目名 
    	//判断网址中是否有项目名，若没有，则在ajax的接口地址前加上项目名
    	if(projectName == undefined){
    		url = '/项目名称/' + url;	
    	}
    	
    }
    
   
    /* charset=utf-8 */
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: dataType,
        async:asyncTF,
        contentType:'application/x-www-form-urlencoded',
//        contentType:'application/json;charset=utf-8',
        beforeSend:function(request){
        	console.log(hackPost.caller.name);
        	if(!(hackPost.caller.name == "crossPost")){
            	if(getlocalStorage('token')){
            		request.setRequestHeader("token",getlocalStorage('token'));
            	}
        	}
        	
        },
        success: function (res) {
            if (res != null && res != "") {
                if (callBack) {
                    if ($.isFunction(callBack)) {
                        callBack(res);
                    } else {
                        console.log("callBack is not a function");
                    }                
                }            
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	console.log(JSON.stringify(XMLHttpRequest),JSON.stringify(textStatus),JSON.stringify(errorThrown),'111111122223333333333');
        	
            
            
        }

    });
    
}
//跨域ajax
function crossPost(url, data, callBack, dataType){
	
	data.token = 'token值';
	/* 从服务端读取 支付请求地址 */
	var payUrl = '跨域的地址';
	
	hackPost(payUrl+url,data,callBack,dataType);
}

/*******************************************		ajax 封装 end		******************************************************/

/**
 * 获取url地址中的项目名
 * @returns
 */
function getUrlProjectName(){
	
	var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); 
    
//    window.document.location.pathname.substring(0,pathName.substr(1).indexOf('/')+1);
    
    console.log(projectName);
    
    return projectName;
}



/*******************************************		本地存储 start		******************************************************/
/**
 * 设置 localStorage 存储信息
 * @param k
 * @param v
 * @returns
 */
function setlocalStorage(k,v){
//	localStorage.k = escape(JSON.stringify(v));
	
    localStorage.setItem(k, escape(JSON.stringify(v)));
}
/**
 * 获取 localStorage 中存储的信息
 * @param k
 */
function getlocalStorage(k){
//	var myUser = localStorage.k;
//    if(myUser)myUser = unescape(myUser);
//    return JSON.parse(myUser || "{}");
    
    return JSON.parse(unescape(localStorage.getItem(k)));
}
/**
 * 设置 cookie 值
 * @param k
 * @param v
 * @returns
 */
function setCookie(k,v){
	
	/*var Days = 1; //此 cookie 将被保存 1 天
	var exp = new Date(); //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();*/
	
	if(k!=null&&k!=''){
		document.cookie=k+"="+escape(v);
	}
}
/**
 * 获取 cookie 值
 * @param cname
 * @returns
 */
function getCookie(cname){
	
	/*var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if(arr != null){
		return unescape(arr[2]);
	}
	return null;*/
	
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++){
		var c = ca[i].trim();
		if (c.indexOf(name)==0){
	    	var val = c.substring(name.length,c.length);
	    	return unescape(val);
	    }
	}
	return "";
}
/**
 * 删除 cookie 值
 * @param cname
 */
function delCookie(cname){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(cname);
	if(cval!=null){
		document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

/*******************************************		本地存储 end		******************************************************/

/**
 * rsa 公钥加密函数
 * @param password 密码
 * @param publicKeyObj 公钥
 * @returns
 * 页面需要引入以下脚本
 * <script src="plugins/rsa/Barrett.js"></script>
 * <script src="plugins/rsa/BigInt.js"></script>
 * <script src="plugins/rsa/RSA.js"></script>
 * <script src="plugins/rsa/RsaDataUtil.js"></script>
 * <script src="plugins/rsa/security.js"></script>
 */
function rsaEncryption(password){
	//公钥
	var publicKeyObj = {
		"module": "b0853c9949755a1a4a73082ae68e8b7785c4dfd69337f9feea529717da21b371c0b4410d12742b4552a935c52dde94cb0189a51551e465c6d825088588a145c48fab25cf3471385876a16e20f85e86ceef90bd2d136cc513a75d3bc337aaa2e5031e7e422ec26ec7d72ae821751781fd8c40d26748c00d56b495064377e39e51",
		"empoent": "10001"
	};
	
    RSAUtils.setMaxDigits(200);
    //生成RSA加密后文本
    var key = new RSAUtils.getKeyPair(publicKeyObj.empoent,"",publicKeyObj.module);
    return RSAUtils.encryptedString(key,password);
}
/**
 * 判断当前设备
 * @returns
 */
function currDevice(){
	var u = navigator.userAgent;
	var app = navigator.appVersion;// appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
	var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();	//获取浏览器语言
	
	var deviceBrowser = function(){
		return{
			trident: u.indexOf('Trident') > -1,  //IE内核
			presto: u.indexOf('Presto') > -1,  //opera内核
			webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1,  //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1,  //是否iPad
			webApp: u.indexOf('Safari') == -1,  //是否web应用程序，没有头部和底部
			weixin: u.indexOf('MicroMessenger') > -1,  //是否微信
			qq: u.match(/\sQQ/i) == " qq",  //是否QQ
		}
	}();
	
	console.log(deviceBrowser);
	
}
/**
 * 获取设备、浏览器的宽度和高度
 * @returns
 */
function deviceBrowserWH(){
	//获取浏览器窗口的内部宽高 - IE9+、chrome、firefox、Opera、Safari：
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	// HTML文档所在窗口的当前宽高 - IE8.7.6.5
	document.documentElement.clientWidth;
	document.documentElement.clientHeight;
	document.body.clientWidth;
	document.body.clientHeight;
	
	var screenW = window.screen.width;//设备的宽度
	var screenH = document.body.clientHeight;
	
	//网页可见区域宽高，不包括工具栏和滚动条（浏览器窗口可视区域大小）
	var webpageVisibleW = document.documentElement.clientWidth || document.body.clientWidth;
	var webpageVisibleH = document.documentElement.clientHeight || document.body.clientHeight;
	
	//网页正文全文宽高(不包括滚动条)
	var webpageW = document.documentElement.scrollWidth || document.body.scrollWidth;
	var webpageH = document.documentElement.scrollHeight || document.body.scrollHeight;
	
	//网页可见区域宽高，包括滚动条等边线（会随窗口的显示大小改变）
	var webpageVisibleW2 = document.documentElement.offsetWidth || document.body.offsetWidth ;
	var webpageVisibleH2 = document.documentElement.offsetHeight || document.body.offsetHeight ;
	
	console.log(w+'*'+h);
	console.log(screenW+'*'+screenH);
	console.log(webpageVisibleW+'*'+webpageVisibleH);
	console.log(webpageW+'*'+webpageH);
	console.log(webpageVisibleW2+'*'+webpageVisibleH2);
	//网页卷去的距离与偏移量
	/*
	1.scrollLeft:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离；

	2.scrollTop:设置或获取位于给定对象最顶端与窗口中目前可见内容的最左端之间的距离；

	3.offsetLeft:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算左侧位置；

	4.offsetTop:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算顶端位置；
*/

}

/**
 * 生成从min到max的随机数
 * @param min
 * @param max
 * @returns
 */
function randomByTo(min,max){
//	arguments.length表示的是实际上向函数传入了多少个参数,这个数字可以比形参数量大,也可以比形参数量小(形参数量的值可以通过Function.length获取到).
	switch(arguments.length){
		case 1:
			return parseInt(Math.random()*min+1,10); 
			break;
		case 2:
			return parseInt(Math.random()*(max-min+1)+min,10); 
			break;
		default: 
			return 0;
			break;
	}
}


/**
 * 将传入的数字转换成 0.00 的格式
 * @param num
 * @returns {String}
 */
function valToFloat2(num){
	num = num.toString();
	if(num.indexOf(".")< 0){
		num = num +'.00';
	}else{
		if(num.split('.')[1].length==0){
			num = num + '00';
		}else if(num.split('.')[1].length==1){
			num = num + '0';
		}else{
			num = num.split('.')[0]+'.'+num.split('.')[1].substr(1,2);
		}
	}
//	num = parseFloat(num);
	return num;
}

/**
 * 截取小数
 * @param val 需要截取的值
 * @param n	截取小数的位数
 * @returns {String}
 */
function cutDecimal(val,n){
	
	var num = val.toString();
	
	if(num.indexOf(".") < 0){
		num = num+'.';
		for(var i=0; i<n; i++){
			num += '0';
		}
	}else{
		var len = num.split('.')[1].length;
		if(len<n){
			num = num;
			for(var i=0; i<(n-len); i++){
				num += '0';
			}
			
		}else{
			num = num.split('.')[0]+'.'+num.split('.')[1].substr(0,n);
		}
	}
//	num = parseFloat(num);
	return num;
	
}
/**
 * 将科学计数法转换成正常数值显示
 * @param num
 * @returns
 */
function scientificToNum(num){
	let result = String(num);
	if(result.indexOf('-') >= 0){
		result = '0' + String(Number(result) + 1).substr(1);
	}
	return result;
}



/*******************************************		控制input输入 start		******************************************************/
/**
 * 设置 input 只能输入正整数
 * @param a
 */
function inputInt(a){
	$(a).off('keyup').on('keyup',function(){
		if(this.value.length==1){
			this.value=this.value.replace(/[^1-9]/g,'');
		}else{
			this.value=this.value.replace(/\D/g,'');
		}
	});
	$(a).off('paste').on('paste',function(){
		var textArea = $(this);
	    setTimeout(function(){
	    	if(textArea.val().length==1){
	    		textArea.val(textArea.val().replace(/[^1-9]/g,''));
			}else{
				textArea.val(textArea.val().replace(/\D/g,''));
			}
	    }, 200);	    
	});
	$(a).off('change').on('change',function(){
		if(this.value!='' && this.value!=null){
			if(this.value.indexOf(".")< 0){
				this.value =  this.value;
			}else{
				this.value = this.value.split('.')[0];
			}	
		}else{
			this.value =  '0';
		}
	});	
}
/**
 * 限制输入框正整数2
 * @param a	input选择器
 * @returns
 */
function inputInt2(a){
	
    $(a).off('keyup').on('keyup',function(){        
        this.value=this.value.replace(/[^\d]/g,'');         
    });
    $(a).off('paste').on('paste',function(){            
    	this.value=this.value.replace(/[^\d]/g,''); 
    });
    $(a).off('change').on('change',function(){            
    	this.value=this.value.replace(/[^\d]/g,''); 
    });
}

/**
 * 设置 input 只能输入正数，并且显示小数点后两位
 * @param a
 */
function inputZFloat2(a){
	
	$(a).off('keyup').on('keyup',function(){
		this.value=this.value.replace(/[^\d.]/g,'');	//清除“数字”和“.”以外的字符  
		this.value=this.value.replace(/\.{2,}/g,".");	//只保留第一个. 清除多余的 
		this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
		if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){			
			this.value = parseFloat(this.value); 
		}
		
	});
	$(a).off('paste').on('paste',function(){
		var textArea = $(this);
	    setTimeout(function(){
	    	this.value=this.value.replace(/[^\d.]/g,'');	//清除“数字”和“.”以外的字符  
			this.value=this.value.replace(/\.{2,}/g,".");	//只保留第一个. 清除多余的 
			this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
			if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){			
				this.value = parseFloat(this.value); 
			}
	    }, 200);
	});
	$(a).off('change').on('change',function(){
		if(this.value!='' && this.value!=null){
			if(this.value.indexOf(".")< 0){
				this.value =  this.value+'.00';
			}else{
				if(this.value.split('.')[1].length==0){
					this.value =  this.value+'00';
				}else if(this.value.split('.')[1].length==1){
					this.value =  this.value+'0';
				}else{
					this.value =  this.value;
				}
			}	
		}else{
			this.value =  '0.00';
		}
			
	});
}
/**
 * 限制输入框小数位
 * @param a	输入框选择器
 * @param digit	小数位长度
 */
function inputFloatDigit(a,digit){
	eval("var reg = /^(\-)*(\d+)\.(\d{"+digit+"}).*$/");
	console.log(digit);
	
	$(a).off('keyup').on('keyup',function(){
		this.value=this.value.replace(/[^\d.]/g,'');	//清除“数字”和“.”以外的字符  
		this.value=this.value.replace(/\.{2,}/g,".");	//只保留第一个. 清除多余的 
		this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		this.value = this.value.replace(reg,'$1$2.$3');//只能输入两个小数  
		if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){			
			this.value = parseFloat(this.value); 
		}
	});
	$(a).off('paste').on('paste',function(){
		this.value=this.value.replace(/[^\d.]/g,'');	//清除“数字”和“.”以外的字符  
		this.value=this.value.replace(/\.{2,}/g,".");	//只保留第一个. 清除多余的 
		this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		this.value = this.value.replace(reg,'$1$2.$3');//只能输入digit个小数  
		if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){			
			this.value = parseFloat(this.value); 
		}
	});
	$(a).off('change').on('change',function(){
		if(this.value!='' && this.value!=null){
			if(this.value.indexOf(".")< 0){
				this.value =  this.value+'.';
				for(var i=0; i<digit; i++){
					this.value += '0';
				}
			}else{
				var len = this.value.split('.')[1].length;
				if(len<digit){
					this.value = this.value
					for(var i=0; i<(digit-len); i++){
						this.value += '0';
					}
				}else{
					this.value = this.value.split('.')[0]+'.'+this.value.split('.')[1].substr(0,digit);
				}
				
			}	
		}else{
			this.value =  '0.';
			for(var i=0; i<digit; i++){
				this.value += '0';
			}
		}
	});	
	
}
/**
 * 限制输入框小数位
 * @param a	input选择器
 * @param decimal	限制小数位
 * @returns
 */
function inputDecimal(a,decimal){
	if(decimal == undefined){
		decimal='0,'
	}
    var reg = new RegExp("(\\d+)(\\.?)(\\d{"+decimal+"}).*$");
    $(a).off('keyup').on('keyup',function(){
        
        this.value=this.value.replace(/[^\d.]/g,'');    //清除“数字”和“.”以外的字符  
        this.value=this.value.replace('.','$#$').replace(/\./g,'').replace("$#$",".");   //只保留第一个. 清除多余的 
        this.value=this.value.replace(reg,'$1$2$3');
        if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){
            this.value = parseFloat(this.value); 
        }
    });
    $(a).off('paste').on('paste',function(){            
        this.value=this.value.replace(/[^\d.]/g,''); 
        this.value=this.value.replace('.','$#$').replace(/\./g,'').replace("$#$",".");
        this.value=this.value.replace(reg,'$1$2$3');
        if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){
            this.value = parseFloat(this.value); 
        }
    });
    $(a).off('change').on('change',function(){            
        this.value=this.value.replace(/[^\d.]/g,''); 
        this.value=this.value.replace('.','$#$').replace(/\./g,'').replace("$#$",".");
        this.value=this.value.replace(reg,'$1$2$3');
        if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){
            this.value = parseFloat(this.value); 
        }
    });
}
/**
 * 限制输入框输入长度
 * @param a	输入框选择器
 * @param len 限制长度
 * @param type 用于判断该输入框是否只能输入数字还是任意字符
 */
function inputLen(a,len,type){
	if(type!=undefined){
		eval("var reg = /^(\d{1,"+len+"})/");
	}else{
		eval("var reg = /^(.{1,"+len+"})/");
	}
	
	
	var strLen = 0;
	$(a).off('keyup').on('keyup',function(){
		this.value=this.value.replace(reg,'$1');
		if(this.value!='' && this.value!=null){			
			this.value = this.value; 
		}
	});
	$(a).off('paste').on('paste',function(){
		this.value=this.value.replace(reg,'$1');
		if(this.value!='' && this.value!=null){			
			this.value = this.value; 
		}
	});
	$(a).off('change').on('change',function(){
		if(this.value!='' && this.value!=null){
			strLen = this.value.length;
			if(strLen>len){
				this.value = this.value.substr(0,len);
			}else{
				this.value = this.value;
			}
		}else{
			this.value =  '0.';
			for(var i=0; i<digit; i++){
				this.value += '0';
			}
		}
	});	
}
/**
 * 限制input只能输入正数
 * @param  {[type]} a       [description]
 * @param  {[type]} decimal [description]
 * @return {[type]}         [description]
 */
function inputPlusNum(a,decimal){
	if(decimal==undefined){
		decimal = '0,';
	}
	var reg = new RegExp("(\\d+)(\\.?)(\\d{"+decimal+"}).*$");

    $(a).off('keyup').on('keyup',function(){
            
        this.value=this.value.replace(/[^\d.]/g,'');    //清除“数字”和“.”以外的字符  
        this.value=this.value.replace('.','$#$').replace(/\./g,'').replace("$#$",".");   //只保留第一个. 清除多余的 
        this.value=this.value.replace(reg,'$1$2$3');
        if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){
            this.value = parseFloat(this.value); 
        }
    });
    $(a).off('paste').on('paste',function(){            
        this.value=this.value.replace(/[^\d.]/g,'');    //清除“数字”和“.”以外的字符  
        this.value=this.value.replace('.','$#$').replace(/\./g,'').replace("$#$",".");   //只保留第一个. 清除多余的 
        this.value=this.value.replace(reg,'$1$2$3');
        if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){
            this.value = parseFloat(this.value); 
        }
    });
    $(a).off('change').on('change',function(){            
        this.value=this.value.replace(/[^\d.]/g,'');    //清除“数字”和“.”以外的字符  
        this.value=this.value.replace('.','$#$').replace(/\./g,'').replace("$#$",".");   //只保留第一个. 清除多余的 
        this.value=this.value.replace(reg,'$1$2$3');
        if(this.value.indexOf(".")< 0 && this.value!='' && this.value!=null){
            this.value = parseFloat(this.value); 
        }
    });
}
/**
 * 限制有 data-maxlen 该属性的输入框的可输入长度,例如：
 * <input type="text" class="f-ctl name" placeholder="请输入姓名" data-maxlen="3" data-type="num">
 * @returns
 */
function inputMaxLen(){
	var maxLen,reg;
    var strLen = 0;
    
//    var regTest = new RegExp("(\\d+)(\\.?)(\\d{"+decimal+"}).*$");
    
    $('[data-maxlen]').off('keyup').on('keyup',function(){
    	maxLen = $(this).data('maxlen');
    	if(!!$(this).data('type')){
    		if($(this).data('type')=='num'){
    			reg = new RegExp("^(\\d{1,"+maxLen+"})");
    		}else{
    			reg = new RegExp("^(.{1,"+maxLen+"})");
    		}
    	}else{
    		reg = new RegExp("^(.{1,"+maxLen+"})");
    	}
    	
    	
        this.value=this.value.replace(reg,'$1');
        if(this.value!='' && this.value!=null){         
            this.value = this.value; 
        }
    });
    $('[data-maxlen]').off('paste').on('paste',function(){
    	maxLen = $(this).data('maxlen');
    	if(!!$(this).data('type')){
    		if($(this).data('type')=='num'){
    			reg = new RegExp("^(\\d{1,"+maxLen+"})");
    		}else{
    			reg = new RegExp("^(.{1,"+maxLen+"})");
    		}
    	}else{
    		reg = new RegExp("^(.{1,"+maxLen+"})");
    	}
    	
        this.value=this.value.replace(reg,'$1');
        if(this.value!='' && this.value!=null){         
            this.value = this.value; 
        }
    });
    $('[data-maxlen]').off('change').on('change',function(){
    	maxLen = $(this).data('maxlen');
    	if(!!$(this).data('type')){
    		if($(this).data('type')=='num'){
    			reg = new RegExp("^(\\d{1,"+maxLen+"})");
    		}else{
    			reg = new RegExp("^(.{1,"+maxLen+"})");
    		}
    	}else{
    		reg = new RegExp("^(.{1,"+maxLen+"})");
    	}
    	
        if(this.value!='' && this.value!=null){
            strLen = this.value.length;
            if(strLen>maxLen){
                this.value = this.value.substr(0,maxLen);
            }else{
                this.value = this.value;
            }
        }else{
            this.value = this.value;
        }
    }); 
}
/*******************************************		控制input输入 end		******************************************************/

/*******************************************		正则表达式验证 start		******************************************************/
/**
 * 验证身份证号
 * @param card
 * @returns {Boolean}
 */
function isCardNo(card) {   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X   
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;   
	if(reg.test(card) === false)   {     
//		mui.toast("请输入正确的身份证号");     
		return false;   
	} else{
		return true;   
	}
	  
}
/**
 * 验证护照号码
 * @param code
 * @returns {Boolean}
 */
function ispassport(code){
	
//	var reg = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/;  
	
	var reg = /^(\w){1,10}?$/;  
	
	if(!code || !reg.test(code)){
		return false;   
	}else{
		return true;   
	}
}
/**
 * 验证驾驶证
 * @param code
 * @returns {Boolean}
 */
function isDriverLicense(code){
	var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;  
	if(!reg.test(code)){
		return false;   
	}else{
		return true;   
	}
}
/**
 * 验证真实姓名
 * @param name
 * @returns {Boolean}
 */
function isName(name){
	var reg = /^[\u4e00-\u9fa5]{2,4}$/;  
	if(!reg.test(name)){
		return false;   
	}else{
		return true;   
	}
}
/**
 * 验证手机号
 * @param num
 * @returns {Boolean}
 */
function isPhone(phone){
	
//	var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;  
	
	var reg = /^[1][3,4,5,7,8][0-9]{9}$/;  
	
	if((phone.length!=11) || !reg.test(phone)){
		return false;   
	}else{
		return true;   
	}
}

/**
 * 验证邮箱地址
 * @param email
 * @returns {Boolean}
 */
function isEmail(email){
	var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;  
	
	if(!reg.test(email)){
		return false;   
	}else{
		return true;   
	}
}


/**
 * 验证码字符串是否为纯数字
 * @param str
 * @returns {Boolean}
 */
function isNum(str){
//	var reg = /^[0-9]*[1-9][0-9]*$/;
	var reg = /(^\d+$)/;
	if (reg.test(str)) {    
		return true;  
	} 
	return false;
}
/**
 * 验证日期格式 yyyy-MM-dd
 * @param date
 * @returns {Boolean}
 */
function isYMD(date){
	
	var reg = /^(\d{4})(\-)([01][0-9])(\-)([0123][0-9])/;
	
	if (reg.test(date)) {    
		return true;  
	} 
	return false;
}
//match：唯一参数是一个正则表达式（或通过RegExp()构造函数将其转换为正则表达式），返回的是一个有匹配结果组成的数组。如歌正则表达式设置了修饰符g，则该方法返回的数组包含字符串中的所有匹配结果。
//		 如果正则表达式没有设置修饰符g，match()就不会进行全局检索，只检索第一个匹配
//		 如果match()返回一个数组a，那么a[0]存放的是完整的匹配，a[1]存放的则是与第一个圆括号括起来相匹配的子串，以此类推
//		 为了和方法replace()保持一致，a[n]存放的是$n的内容。

// ^：匹配字符串的开头，在多行检索中，匹配一行的开头
// [...]：方括号内的任意字符
// \：将下一个字符标记为或特殊字符、或原义字符、或向后引用、或八进制转义符。例如， 'n' 匹配字符 'n'。'\n' 匹配换行符。序列 '\\' 匹配 "\"，而 '\(' 则匹配 "("。
// ?：匹配前一项0次或者1次，也就是说前一项是可选的，等价于{0,1}
// \d：任何ASCII数字，等价于[0-9]
// *：匹配前一项0次或者多次，等价于{0,}
// $：匹配字符串的结尾，在多行检索中，匹配一行的结尾
// ( )：标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。要匹配这些字符，请使用 \( 和 \)。
//		用圆括号将所有选择项括起来，相邻的选择项之间用|分隔。但用圆括号会有一个副作用，使相关的匹配会被缓存，此时可用?:放在第一个选项前来消除这种副作用。
//		其中 ?: 是非捕获元之一，还有两个非捕获元是 ?= 和 ?!，这两个还有更多的含义，前者为正向预查，在任何开始匹配圆括号内的正则表达式模式的位置来匹配搜索字符串，后者为负向预查，在任何开始不匹配该正则表达式模式的位置来匹配搜索字符串。
// +：匹配前一项1次或者多次，等价于{1,}
/**
 * 手机号码、电话号码格式验证
 * @param a
 */
function isPhoneTel(a){
	String.prototype.Trim = function() {
	    var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	    return (m == null) ? "" : m[1];
	}
	String.prototype.isMobile = function() {
	    return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(this.Trim()));
	}
	String.prototype.isTel = function() {
	    //"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)" 
	    //return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(this.Trim())); 
	    return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.Trim()));
	}
	$(a).off('change');
	$(a).on('change',function(){
		if($(a).val().isMobile() || $(a).val().isTel()){
			$(a).val($(a).val().Trim());
			return true;
		}else{
			alert("请输入正确的手机号码或电话号码\n\n例如:13916752109或0712-3614072");
			$(a).focus();
	        return false;
		}
	});
	
}
/*******************************************		正则表达式验证 end		******************************************************/

/*******************************************		关于url start		******************************************************/
/**
 * 获取URL地址--域名
 * @returns {String}
 */
function getDomain(){
	var project = '/';//项目名
	var domainName = location.protocol + '//'+window.location.host;//获取域名
//	var domainName = location.origin;
	
	if(location.href.indexOf('项目名') != -1){
		project = "/项目名/";	
	}
	
	domainName += project;
	
	return domainName;
}
/**
 * 获取 URL 相对路径
 * @returns
 */
function getDomainName(){
	var url = document.location.toString();
	var arrUrl = url.split("//");
	var start = arrUrl[1].indexOf("/");
	var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
	if(relUrl.indexOf("?") != -1){
		relUrl = relUrl.split("?")[0];
	}
	return relUrl;
}

/*******************************************		关于url end		******************************************************/
/**
 * 鼠标单击获取鼠标的坐标
 * @param event
 * @returns
 */
var mouseX;
var mouseY;
function getMousePos(event) {
	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	var event = event || window.event;
	
	mouseX = event.clientX;
	mouseY = event.clientY+scrollY;
	
	console.log('mouseX='+mouseX+',mouseY='+mouseY);
}

/**
 * 解决中文问题
 * @param str
 * @returns
 */
function toUtf8(str) {    
    var out, i, len, c;    
    out = "";    
    len = str.length;    
    for(i = 0; i < len; i++) {    
        c = str.charCodeAt(i);    
        if ((c >= 0x0001) && (c <= 0x007F)) {    
            out += str.charAt(i);    
        } else if (c > 0x07FF) {    
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        } else {    
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
        }    
    }    
    return out;    
} 


function aboutIframe(){
	//父级页面获取 iframe 页面中的元素
	$('父级页面中的iframe').contents().find('iframe页面中元素的选择器').click(function(){});
}

/*******************************************		自定义分页 start	******************************************************/
/**
 * 自定义分页
 * @param wrapId	最外层选择器
 * @param count	总计数量
 * @param rows	每页显示数量
 * @param totalP	总页数
 * @param currP	当前页
 * @param func	翻页回调函数
 * @returns
 */
function createPage(wrapId,count,rows,totalP,currP,func){
	
	
	
	totalP = Number(totalP);
	currP = Number(currP);
	
	var inputs = '', inner = '', prevStr = '', nextStr = '', pageList = '';
	var minP,maxP;
	
	inner = '<ul style="display: inline-block;vertical-align: middle;">';
	
	inputs = '<input value="'+count+'" type="hidden" name="count" class="count">'
			+'<input value="'+rows+'" type="hidden" name="rows" class="rows">'
			+'<input value="'+totalP+'" type="hidden" name="totalP" class="totalP">'
			+'<input value="'+currP+'" type="hidden" name="currP" class="currP">';	
	
	prevStr = '<li style="float: left;"><a href="javascript:'+func+'(\''+wrapId+'\',\''+count+'\',\''+rows+'\',\''+totalP+'\',\''+(currP-1)+'\',\''+func+'\');" class="prev ">上一页</a></li>'
				+'<li style="float: left;"><a href="javascript:'+func+'(\''+wrapId+'\',\''+count+'\',\''+rows+'\',\''+totalP+'\',\''+1+'\',\''+func+'\');" class="firstP">首页</a></li>';
	
	nextStr = '<li style="float: left;"><a href="javascript:'+func+'(\''+wrapId+'\',\''+count+'\',\''+rows+'\',\''+totalP+'\',\''+totalP+'\',\''+func+'\');" class="lastP">尾页</a></li>'
				+'<li style="float: left;"><a href="javascript:'+func+'(\''+wrapId+'\',\''+count+'\',\''+rows+'\',\''+totalP+'\',\''+(currP+1)+'\',\''+func+'\');" class="next">下一页</a></li>';
	
	
	
	
	if(totalP<=10){
		minP = 1;
		maxP = totalP;
		
	}else{
		if(currP<=6){
			minP = 1;
			maxP = 10;
		}else{
			if((currP+4)<totalP){
				minP = currP-5;
				maxP = currP+4;
			}else{
				minP = totalP-9;
				maxP = totalP;
			}
		}
		
	}
	
//	console.log('totalP:'+totalP+';currP:'+currP+';minP:'+minP+';maxP:'+maxP);
	
	for(var i=minP; i<=maxP; i++){
		if(i == currP){
			pageList += '<li style="float: left;"><a href="javascript:'+func+'(\''+wrapId+'\',\''+count+'\',\''+rows+'\',\''+totalP+'\',\''+i+'\',\''+func+'\');" class="active">'+i+'</a></li>';
		}else{
			pageList += '<li style="float: left;"><a href="javascript:'+func+'(\''+wrapId+'\',\''+count+'\',\''+rows+'\',\''+totalP+'\',\''+i+'\',\''+func+'\');" class="">'+i+'</a></li>';
		}
	}
	inner += prevStr + pageList + nextStr;
	inner += '</ul>';
	inner += inputs;
	
	$(wrapId).html(inner);
	
	//css样式
	$(wrapId).css({
		'text-align':'center',
		'padding':'10px'
	});
	$(wrapId).find('a').css({
		'height': '34px',
		'min-width':'40px',
		'width': '40px',
		'line-height': '32px',
		'border': '1px solid #ddd',
		'border-right-width': '0',
		'font-size': '12px',
		'display': 'inline-block',
		'text-decoration-line': 'none',
		'color': '#168dd1'
	});
	$(wrapId).find('a.prev,a.firstP,a.lastP,a.next').css({
		'width':'auto',
		'padding':'0 15px'
	});
	$(wrapId).find('a.prev').css({
		'border-top-left-radius':'4px',
		'border-bottom-left-radius':'4px'
	});
	$(wrapId).find('a.next').css({
		'border-top-right-radius':'4px',
		'border-bottom-right-radius':'4px',
		'border-right-width':'1px'
	});
	$(wrapId).find('a').hover(function(){
		$(this).css('background','#eee');
	},function(){
		$(this).css('background','transparent');
	});
	
	$(wrapId).find('a.active').css({
		'background':'#168dd1',
		'color':'#fff'
	});
	$(wrapId).find('a.disabled').css({
		'background':'transparent',
		'color':'#ddd',
		'cursor':'not-allowed'
	});
	
	if(currP<2){
		$(wrapId).find('.prev').addClass('disabled');
		$(wrapId).find('.firstP').addClass('disabled');
	}
	if(currP == totalP){
		$(wrapId).find('.lastP').addClass('disabled');
		$(wrapId).find('.next').addClass('disabled');
	}
}
/**
 * 翻页
 * @param wrapId
 * @param count
 * @param rows
 * @param totalP
 * @param currP
 * @param func
 * @returns
 */
function pageTurn(wrapId,count,rows,totalP,currP,func){
	totalP = Number(totalP);
	currP = Number(currP);

	if(currP<1){
		currP = 1;
	}
	if(currP>totalP){
		currP = totalP;
	}
	
	createPage(wrapId,count,rows,totalP,currP,func);
	console.log('当前第 '+currP+' 页');
	
	
	
}
/*******************************************		自定义分页 	end		******************************************************/

/*******************************************		自定义单选列表 start	******************************************************/
/**
 * 自定义单选列表
 * @param wrapSelector
 * @param wrapSelector
 * @returns
 */
function createRadio(name,wrapSelector){
	var parent = '';
	var input = '<input type="hidden" class="'+name+'" value="">';
//	var input = "<input type=\"hidden\" class=\""+name+"\" value=\"\">";
	
	if(wrapSelector == undefined){
		parent = '';
	}else{
		parent = wrapSelector;
	}
	
	$(parent+' [data-myRadio='+name+']').eq(0).before(input);
	
	$(parent+' [data-myRadio='+name+']').off('click').on('click',function(){
		$(parent+' [data-myRadio='+name+']').removeClass('active');
		$(this).addClass('active');
		$('.'+name).val($(this).data('value'));
		
	});
	
	//前端HTML代码如下
	/*<label>
		<a data-myRadio="cdtTime" data-value="3">最近3天</a>
		<a data-myRadio="cdtTime" data-value="7">最近7天</a>
		<a data-myRadio="cdtTime" data-value="15">最近15天</a>
		<a data-myRadio="cdtTime" data-value="30">最近30天</a>
		<a data-myRadio="cdtTime" data-value="30s">30天以前</a>
	</label>*/
}
/*******************************************		自定义单选列表 end		******************************************************/




/**
 * 绑定全选/取消全选
 * @param checkAll	全选复选框
 * @param checkOne	单个复选框
 */
function onCheckBox(checkAll,checkOne){
	checkAll.off('change');
	checkOne.off('change');
	checkAll.on("change",function(){
		var isCheck = $(this).is(":checked");
		if(isCheck){
			checkOne.prop("checked",true);//全选			
		}else{
			checkOne.prop("checked",false);//全不选
			
		}
	});
	checkOne.on("change",function(){
		checkOne.each(function() {
			var isCheck = $(this).is(":checked");			
			if(!isCheck){
				checkAll.prop("checked",false);	//取消全选
				return false;
			}else{
				checkAll.prop("checked",true);	//全选
			}
		});
	});
}

/**
 * 禁止图片复制
 */
function cantCopyImg(){
	$("img").on("contextmenu",function(){
		
		return false;
	});
	$("img").on("selectstart",function(){
		return false;
	});
}



/*******************************************		日期、时间 start	******************************************************/
/**
 * 获取当前时间
 */
function getCurrTime(){
	var now = new Date();
	
	var year = now.getFullYear();
	
	var month = now.getMonth() + 1;
	month = month>=10?month:("0"+month);
	
	var day = now.getDate();
	day = day>=10?day:("0"+day);
	
	var hour = now.getHours();
	hour = hour>=10?hour:("0"+hour);
	
	var minute = now.getMinutes();
	minute = minute>=10?minute:("0"+minute);
	
	var second = now.getSeconds();
	second = second>=10?second:("0"+second);
	
	var week = now.getDay();
	var todayWeek = "";
	switch(week){
		case 0:
			todayWeek = "星期日";
			break;
		case 1:
			todayWeek = "星期一";
			break;
		case 2:
			todayWeek = "星期二";
			break;
		case 3:
			todayWeek = "星期三";
			break;
		case 4:
			todayWeek = "星期四";
			break;
		case 5:
			todayWeek = "星期五";
			break;
		case 6:
			todayWeek = "星期六";
			break;
	};
	
	var today = year + "年" + month + "月" + day + "日";
	var nowTime = hour + ":" + minute + ":" + second;
	
	
	console.log(today+' '+nowTime+' '+todayWeek);
}

/**
 * 获取时间戳
 * @returns
 */
function getTimestamp(){
	return new Date().getTime();
}

/**
 * easyUI-datebox 日期格式
 * @param a
 */
function dateboxFormat(a){
	$(a).datebox({
		formatter:function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
		},
		parser:function(s){			
			if (!s) return new Date();
			var ss = (s.split('-'));
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}
		},
		currentText: false,
		onSelect: function(date){ }
	});
}

/**
 * 时间格式化
 * 把Long类型的日期还原yyyy-MM-dd 00:00:00格式日期   
 * @param longTypeDate
 * @returns
 */ 
function longToDate(longTypeDate){    
        
    var dateTypeDate = "";    
    var date = new Date(); 
    
    date.setTime(longTypeDate);   
    
    dateTypeDate += date.getFullYear();   //年    
    dateTypeDate += "-" + ((date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)); //月     
    dateTypeDate += "-" + (date.getDate()<10?'0'+date.getDate():date.getDate());   //日    
    dateTypeDate += " " + (date.getHours()<10?'0'+date.getHours():date.getHours());   //时    
    dateTypeDate += ":" + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());     //分  
    dateTypeDate += ":" + (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());     //分  
   
    return dateTypeDate;     
} 


/*******************************************		日期、时间 end		******************************************************/

/**
 * 浏览器窗口改变大小事件
 * @returns
 */
function browserResize(){
	window.onresize = function(){}
}
/*******************************************		自定义自动隐藏的弹出提示 start	******************************************************/
function tipFun(msg){
		//创建元素
		var bodyW = document.documentElement.clientWidth || document.body.clientWidth;
		var creatTip = document.createElement('div');
		creatTip.classList.add('tip-wrap');
		document.body.appendChild(creatTip);		

		creatTip.style.position='fixed';
		creatTip.style['text-align']='center';
		creatTip.style.color='#FFFFFF';
		creatTip.style.bottom='20px';
		creatTip.style.left='0';
		creatTip.style.right='0';
		creatTip.style.margin='0 auto';
		creatTip.innerHTML = '<span style="display: inline-block;background-color:rgba(0, 0, 0, 0.7); padding: 6px 12px; border-radius: 5px;">'+msg+'</span>';

		var speed = 50;
		var opacity = 0;//初始化透明度变化值为0 
		var val = 100; 
		var tip = document.getElementsByClassName('tip-wrap')[0];
		var body = document.body;

		var base = {
			Id: function(name){
				return document.getElementById(name);
			},
			Class: function(name){
				return document.getElementsByClassName(name);
			},
			setOpacity: function(ele, v){//设置元素透明度,透明度值按IE规则计,即0~100 
				ele.filters?ele.style.filter='alpha(opacity='+v+')' : ele.style.opacity=v/100;
			}
		};
		var effect = {
			out: function(){
				(function(){
					base.setOpacity(tip,val);
					val -= 5;
					if(val>=opacity){
						setTimeout(arguments.callee, speed); 
					}else if(val < 0){
						body.removeChild(tip); // 元素透明度为0后隐藏元素 
					}
				})();
			}
		};

		setTimeout(effect.out,1000);
	}
/*******************************************		自定义自动隐藏的弹出提示 end		******************************************************/

/*******************************************		自定义加载中效果 start	******************************************************/
var isShowLoad = true;
function loading(){	
	// 创建元素	
	var loadMask = document.createElement('div');
	loadMask.classList.add('load-mask');
	loadMask.id = 'load-mask';
	document.body.appendChild(loadMask);
	// 给创建元素添加样式
	loadMask.style.position='fixed';
	loadMask.style.top='0';	
	loadMask.style.left='0';	
	loadMask.style['background-color']='rgba(0,0,0,.5)';	
	loadMask.style['z-index']='9999';	
	loadMask.style.width='100vw';	
	loadMask.style.height='100vh';		

	loadMask.innerHTML = '<div style="width: 100%;height: 100%;position: relative;background-color: rgba(245,127,69,.5);display:table;text-align: center;"><div style="display: table-cell;vertical-align: middle;"><i>loading</i><i class="spot" style="display: inline-block;width: 50px;text-align: left;">...</i></div></div>';


	var mask  = document.getElementById('load-mask');
	var spot = mask.getElementsByClassName('spot')[0];
	var spotNum = 0;
	console.log('loading...');

	var effect = {
		load: function(){
			var isLoad = isShowLoad;
			if(isLoad){
				(function(){
					if(spotNum<3){ spotNum ++; }
					else{ spotNum = 0; }

					if(spotNum==1){ spot.innerText = '.'; }
					else if(spotNum==2){ spot.innerText = '..'; }
					else if(spotNum==3){ spot.innerText = '...'; }
					else{ spot.innerText = ''; }
					setTimeout(effect.load,500);
				})();
			}else{
				document.body.removeChild(mask); 
			}					
		}
	};
	effect.load();

	// setTimeout(function(){isShowLoad=false;},5000);
			
}
/*******************************************		自定义加载中效果 end		******************************************************/

/*******************************************		aaaaa start	******************************************************/

/*******************************************		aaaaa end		******************************************************/



