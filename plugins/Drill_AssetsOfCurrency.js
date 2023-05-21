//=============================================================================
// Drill_AssetsOfCurrency.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        管理器 - 货币素材库
 * @author Drill_up
 * 
 * @Drill_LE_param "货币样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_AsOC_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AssetsOfCurrency +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将所有与"货币"相关的素材配置到该插件，并关联到其他子插件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于地图UI、菜单面板等。
 * 细节：
 *   (1.Assets是指"素材库"，作用于战斗界面、地图界面、菜单界面。
 *      素材库的意义是对某些通用的数据，只配置一次，就能应用到所有相关子插件中。
 *      而不需要每个插件都去配置一次资源素材。
 *   (2.插件指令修改样式，只是给游戏默认的货币进行换皮。
 *      如果你希望定义多种不同的货币，建议直接用物品来作为特殊货币。
 * 设计：
 *   (1.货币素材库可以换样式，你可以根据游戏剧情，设计不同时代的货币，
 *      玩家在多个章节中，货币的样子不断地在改，但是并不改变货币的面值。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Assets__Currency （Assets后面有两个下划线）
 * 先确保项目img文件夹下是否有Assets__Currency文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 资源-透明小图
 * 资源-透明中型图
 * 资源-透明高清图
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改样式：
 * 
 * 插件指令：>货币素材库 : 修改样式 : 样式[1]
 * 
 * 1.注意，插件指令修改样式，只是给游戏默认的货币进行换皮。
 *   如果你希望定义多种不同的货币，建议直接用物品来作为特殊货币。
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
 * 测试方法：   在各个界面中进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行，提供对应的素材数据。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 *
 * @param 默认货币样式
 * @type number
 * @min 1
 * @desc 默认的货币样式。
 * @default 1
 * 
 * @param ---货币样式组---
 * @default 
 * 
 * @param 货币样式-1
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==金币==","---常规---":"","用语-货币文本":"金币","用语-货币文本颜色":"17","货币图标":"536","---资源---":"","资源-透明小图":"金币_小图_64x64","资源-透明中型图":"金币_中型图_96x96","资源-透明高清图":"金币_高清图_512x512"}
 * 
 * @param 货币样式-2
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-3
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-4
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-5
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-6
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-7
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-8
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-9
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-10
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 */
/*~struct~DrillAsOCStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的货币样式==
 * 
 * 
 * @param ---常规---
 * @default 
 * 
 * @param 用语-货币文本
 * @parent ---常规---
 * @desc 货币的用语文本。
 * @default 金币
 *
 * @param 用语-货币文本颜色
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 货币文本的颜色。
 * @default 17
 *
 * @param 货币图标
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 货币的图标序号。
 * @default 536
 * 
 * 
 * @param ---资源---
 * @default 
 *
 * @param 资源-透明小图
 * @parent ---资源---
 * @desc 货币作为透明小图时的资源，建议大小为64x64。
 * @default (需配置)货币素材库-透明小图
 * @require 1
 * @dir img/Assets__Currency/
 * @type file
 *
 * @param 资源-透明中型图
 * @parent ---资源---
 * @desc 货币作为透明中型图时的资源，建议大小为96x96。
 * @default (需配置)货币素材库-透明中型图
 * @require 1
 * @dir img/Assets__Currency/
 * @type file
 *
 * @param 资源-透明高清图
 * @parent ---资源---
 * @desc 货币作为透明高清图时的资源，建议大小为512x512。
 * @default (需配置)货币素材库-透明高清图
 * @require 1
 * @dir img/Assets__Currency/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AsOC (Assets_Of_Currency)
//		临时全局变量	DrillUp.g_AsOC_xxx
//		临时局部变量	this._drill_AsOC_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	
//		★性能测试消耗	
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			->☆插件指令
//			->☆存储数据
//			
//			->☆素材库
//				->样式变化（子插件继承用）
//				->获取 - 货币文本
//				->获取 - 货币文本颜色
//				->获取 - 货币图标
//				->获取 - 完整描述文本
//				->获取 - 透明小图
//				->获取 - 透明中型图
//				->获取 - 透明高清图
//			
//			
//		★家谱：
//			无
//			
//		★插件私有类：
//			无
//			
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_AsOC_PluginTip_curName = "Drill_AssetsOfCurrency.js 管理器-货币素材库";
	DrillUp.g_AsOC_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AssetsOfCurrency = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AssetsOfCurrency');
	
	
	//==============================
	// * 变量获取 - 货币样式
	//				（~struct~DrillAsOCStyle）
	//==============================
	DrillUp.drill_AsOC_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 常规
		data['currency_text'] = String( dataFrom["用语-货币文本"] || "金币");
		data['currency_textColor'] = Number( dataFrom["用语-货币文本颜色"] || 17);
		data['currency_icon'] = Number( dataFrom["货币图标"] || 536);
		
		// > 资源
		data['currency_src_img_small'] = String( dataFrom["资源-透明小图"] || "");
		data['currency_src_img_middle'] = String( dataFrom["资源-透明中型图"] || "");
		data['currency_src_img_big'] = String( dataFrom["资源-透明高清图"] || "");
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_AsOC_defaultStyleId = Number(DrillUp.parameters["默认货币样式"] || 1); 
	
	/*-----------------货币样式集合------------------*/
	DrillUp.g_AsOC_style_length = 10;
	DrillUp.g_AsOC_style = [];
	for( var i = 0; i < DrillUp.g_AsOC_style_length; i++ ){
		if( DrillUp.parameters["货币样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["货币样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["货币样式-" + String(i+1) ]);
			DrillUp.g_AsOC_style[i] = DrillUp.drill_AsOC_initStyle( temp );
		}else{
			DrillUp.g_AsOC_style[i] = DrillUp.drill_AsOC_initStyle( {} );
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_AsOC_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_AsOC_pluginCommand.call(this, command, args);
	if( command === ">货币素材库" ){
		
		/*-----------------修改样式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_AsOC_styleId = Number(temp1);
				$gameTemp.drill_AsOC_dataChanged();
			}
		}
		
	};
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_AsOC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_AsOC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_AsOC_sys_initialize.call(this);
	this.drill_AsOC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_AsOC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_AsOC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_AsOC_saveEnabled == true ){	
		$gameSystem.drill_AsOC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_AsOC_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_AsOC_initSysData = function() {
	this.drill_AsOC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_AsOC_checkSysData = function() {
	this.drill_AsOC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_AsOC_initSysData_Private = function() {
	
	this._drill_AsOC_styleId = DrillUp.g_AsOC_defaultStyleId;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_AsOC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_AsOC_styleId == undefined ){
		this.drill_AsOC_initSysData();
	}
	
};


//=============================================================================
// ** ☆素材库
//=============================================================================
//==============================
// * 素材库 - 样式变化（子插件继承用）
//==============================
Game_Temp.prototype.drill_AsOC_dataChanged = function() {
	//（当样式发生变化时，此函数会被调用，子插件可以继承此函数，即时监听并变化）
	//（你也可以将监听放在帧刷新中同步，但是那样更消耗性能）
};

//==============================
// * 素材库 - 获取 - 货币文本（开放函数）
//==============================
Game_Temp.prototype.drill_AsOC_getDataText = function() {
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	return data['currency_text'];
};
//==============================
// * 素材库 - 获取 - 货币文本颜色（开放函数）
//==============================
Game_Temp.prototype.drill_AsOC_getDataTextColor = function() {
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	return data['currency_textColor'];
};
//==============================
// * 素材库 - 获取 - 货币图标（开放函数）
//==============================
Game_Temp.prototype.drill_AsOC_getDataIcon = function() {
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	return data['currency_icon'];
};
//==============================
// * 素材库 - 获取 - 完整描述文本（开放函数）
//
//			说明：	> type（只图标/只文本/图标+文本）
//==============================
Game_Temp.prototype.drill_AsOC_getFullTextByType = function( type ){
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	var context = "";
	if( type == "只图标" ){
		context += "\\i[" + data['currency_icon'] + "]";
	}
	if( type == "只文本" ){
		context += "\\csave\\c[" + data['currency_textColor'] + "]";
		context += data['currency_text'];
		context += "\\cload";
	}
	if( type == "图标+文本" ){
		context += "\\i[" + data['currency_icon'] + "]";
		context += "\\csave\\c[" + data['currency_textColor'] + "]";
		context += data['currency_text'];
		context += "\\cload";
	}
	return context;
};

//==============================
// * 素材库 - 获取 - 透明小图（开放函数）
//==============================
Game_Temp.prototype.drill_AsOC_getDataSrcImg_Small = function() {
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	return ImageManager.loadBitmap( "img/Assets__Currency/", data['currency_src_img_small'], 0, true );
};
//==============================
// * 素材库 - 获取 - 透明中型图（开放函数）
//==============================
Game_Temp.prototype.drill_AsOC_getDataSrcImg_Middle = function() {
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	return ImageManager.loadBitmap( "img/Assets__Currency/", data['currency_src_img_middle'], 0, true );
};
//==============================
// * 素材库 - 获取 - 透明高清图（开放函数）
//==============================
Game_Temp.prototype.drill_AsOC_getDataSrcImg_Big = function() {
	var data = DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
	return ImageManager.loadBitmap( "img/Assets__Currency/", data['currency_src_img_big'], 0, true );
};


