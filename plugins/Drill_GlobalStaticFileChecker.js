//=============================================================================
// Drill_GlobalStaticFileChecker.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        管理器 - 静态文件密钥校验器
 * @author Drill_up
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_GlobalStaticFileChecker +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以检测到游戏的静态文件是否被改动。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于游戏系统的文件。
 * 2.具体去看看小工具： 静态文件密钥生成器 。
 * 细节：
 *   (1.该插件可以在迷宫密钥的基础上，再进行一次密钥加密。
 *   (2.插件支持安卓打包后，在手机平台的密钥校验。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   开启游戏即可测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.该插件只在启动游戏后会执行一次。
 *   执行结束后，将不再工作。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 * 
 * 
 *
 * @param 校验器开关
 * @type switch
 * @desc 如果静态文件未被修改，校验通过，指定的变量会为ON，未通过则为OFF。
 * @default 0
 * 
 * @param 校验失败-缺少md5库时
 * @type note
 * @desc 此内容表示在缺少md5库时输出的提示文字，为空则不提示。
 * @default "【Drill_GlobalStaticFileChecker.js 管理器 - 静态文件密钥校验器】\n缺少外部md5库，你需要手动添加该库。\n具体去看看文档'关于静态文件秘钥生成器.docx'。"
 * 
 * @param 校验失败-缺少密钥数据时
 * @type note
 * @desc 此内容表示在缺少密钥设置时输出的提示文字，为空则不提示。
 * @default "【Drill_GlobalStaticFileChecker.js 管理器 - 静态文件密钥校验器】\n插件缺少密钥数据，插件至少要一个密钥才能工作。\n具体去看看文档'关于静态文件秘钥生成器.docx'。"
 * 
 * @param 校验失败-检测到外部改动时
 * @type note
 * @desc 此内容表示在没有一个校验正确时输出的提示文字，为空则不提示。
 * @default "警告，游戏内静态文件数据被改动！"
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GSFC（Global_Static_File_Checker）
//		临时全局变量	DrillUp.g_GSFC_xxx
//		临时局部变量	无
//		存储数据变量	this._drill_GSFC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//	
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	初始点
//		★性能测试消耗	未找到
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			静态文件密钥校验器：
//				->校验规则
//
//		★必要注意事项：
//			1.插件没有做加密处理，也没必要加密。
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GlobalStaticFileChecker = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GlobalStaticFileChecker');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_GSFC_var = Number(DrillUp.parameters['校验器开关'] || 0);
    DrillUp.g_GSFC_msg_noDepends = JSON.parse( String(DrillUp.parameters['校验失败-缺少md5库时'] || "") );
    DrillUp.g_GSFC_msg_noData = JSON.parse( String(DrillUp.parameters['校验失败-缺少密钥数据时'] || "") );
    DrillUp.g_GSFC_msg_fail = JSON.parse( String(DrillUp.parameters['校验失败-检测到外部改动时'] || "") );
	
	/*-----------------秘钥列表------------------*/
    DrillUp.g_GSFC_data = [
		"N4IgZglgNgpg+lCBnALiAXAbVAaxgTwxAE4wAGAFjIBMAmANmoEMmB2AZgGNqYAOARlYVaAVnojW9MELBMRIADQgADkxQALIsxRMA9AEFOKAPYAnJADoAVkmMA7EAF8AukryF0IaqehQnQA=",
	];
	
	
//=============================================================================
// * >>>>库检测>>>>
//=============================================================================
if( typeof(md5) != "undefined" ){

	//==============================
	// * 文件 - 版本遍历
	//==============================
	DataManager.drill_GSFC_checkData = function() {
		
		// > 数据转换
		var data_tank = [];
		for(var i=0; i < DrillUp.g_GSFC_data.length; i++ ){
			var data_str = DrillUp.g_GSFC_data[i];
			if( data_str == "" ){ continue; }
			var data = JSON.parse( LZString.decompressFromBase64(data_str) );
			data_tank.push( data );
		}
		if( data_tank.length == 0 ){ return "noData"; }
		
		// > key校验
		var key_first = data_tank[0]['key'];
		for( var i = 1; i < data_tank.length; i++ ){
			if( key_first != data_tank[i]['key'] ){
				return "keyError";
			}
		}
		
		// > 文件校验
		this._drill_GSFC_data = [];
		for( var i = 0; i < data_tank.length; i++ ){
			var file_list = data_tank[i]['file_list'];
			if( file_list == undefined ){ return "fail" }
			if( file_list.length == 0  ){ return "fail" }
			var flag = true;
			for( var j = 0; j < file_list.length; j++ ){
				var file_data = file_list[j];
				this._drill_GSFC_data.push( {"data":file_data,"state":"sending"} );
				this.drill_GSFC_loadDataFile( file_data['path'] );
			}
		}
		return "sended"
	}
	
		
	//==============================
	// * 数据库文件 - 读取单文件
	//
	//				说明：	如果读取失败，全局的name，将会为null。
	//==============================
	DataManager.drill_GSFC_loadDataFile = function( src_path ){
		
		// > 发送请求
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src_path );
		xhr.overrideMimeType('application/x-www-form-urlencoded');
		xhr.onload = function() {
			if( xhr.status < 400 ){
				DataManager.drill_GSFC_onLoad( src_path, xhr.responseText);
			}
		};
		xhr.onerror = this._mapLoader || function() {		//（读取失败时，留下错误路径）
			DataManager._errorUrl = DataManager._errorUrl || src_path;
		};
		xhr.send();
	};
	//==============================
	// * 数据库文件 - 解析文件（这里会反复执行多次）
	//==============================
	DataManager.drill_GSFC_onLoad = function( src_path, responseText ){
		
		// > 防止反复校验
		for(var i = 0; i < this._drill_GSFC_data.length; i++ ){
			var data = this._drill_GSFC_data[i]
			if( data['state'] == "fail" ){
				return;
			}
		}
		
		// > 填入值
		for(var i = 0; i < this._drill_GSFC_data.length; i++ ){
			var data = this._drill_GSFC_data[i]
			if( data['data']['path'] == src_path ){
				var key = md5( responseText );
				if( key == data['data']['key'] ){
					data['state'] = "pass";
				}else{
					data['state'] = "fail";
					if( DrillUp.g_GSFC_msg_fail != "" ){
						alert(DrillUp.g_GSFC_msg_fail);
					}
					return;
				}
				break;
			}
		}
		
		// > 通过校验
		for(var i = 0; i < this._drill_GSFC_data.length; i++ ){
			var data = this._drill_GSFC_data[i]
			if( data['state'] != "pass" ){
				return;
			}
		}
		
		this.drill_GSFC_msg = "pass";
	};
	
	//==============================
	// * 文件 - 信息标记
	//==============================
	DataManager.drill_GSFC_msg = DataManager.drill_GSFC_checkData();
	if( DataManager.drill_GSFC_msg == "noData" ){
		if( DrillUp.g_GSFC_msg_noData != "" ){
			alert(DrillUp.g_GSFC_msg_noData);
		}
	};
	if( DataManager.drill_GSFC_msg == "keyError" ){
		if( DrillUp.g_GSFC_msg_fail != "" ){
			alert(DrillUp.g_GSFC_msg_fail);
		}
	};
	
	
	//==============================
	// * 新游戏 - 数据赋值
	//==============================
	var _drill_GSFC_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function() {
		_drill_GSFC_setupNewGame.call( this );
		if( DrillUp.g_GSFC_var > 0 &&
			DataManager.drill_GSFC_msg == "pass" ){
			$gameSwitches._data[ DrillUp.g_GSFC_var ] = true;
		}else{
			$gameSwitches._data[ DrillUp.g_GSFC_var ] = false;
		}
	}
		
	//==============================
	// * 载入存档 - 数据赋值
	//==============================
	var _drill_GSFC_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function( contents ){
		_drill_GSFC_extractSaveContents.call( this, contents );
		if( DrillUp.g_GSFC_var > 0 &&
			DataManager.drill_GSFC_msg == "pass" ){
			$gameSwitches._data[ DrillUp.g_GSFC_var ] = true;
		}else{
			$gameSwitches._data[ DrillUp.g_GSFC_var ] = false;
		}
	}


//=============================================================================
// * <<<<库检测<<<<
//=============================================================================
}else{
		Imported.Drill_GlobalStaticFileChecker = false;
		if( DrillUp.g_GSFC_msg_noDepends != "" ){
			alert( DrillUp.g_GSFC_msg_noDepends );
		}
}