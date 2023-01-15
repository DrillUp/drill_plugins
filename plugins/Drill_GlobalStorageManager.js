//=============================================================================
// Drill_GlobalStorageManager.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        管理器 - 存档管理器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalStorageManager +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得事件指令或脚本 直接 执行保存/载入操作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于游戏存档。
 * 细节：
 *   (1.注意称呼：
 *          存档（名词）、保存（动词）、载入（动词）
 *      这里固定使用这三个词称呼。
 *      口语中，存档、存储、保存、读档、读取、载入，都是混着用的。
 *      所以这里统一为：保存存档，载入存档。
 *   (2.你可以使用插件指令手动保存、载入。
 *      并且可以获取当前存档ID以及存档数量。
 * 设计：
 *   (1.由于该插件提供立即保存、立即载入功能，
 *      你可以手动设计游戏中特殊战斗失败后，自动回档重来的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用下面插件指令：
 * 
 * 插件指令：>存档管理器 : 当前存档 : 立即保存
 * 插件指令：>存档管理器 : 存档[4] : 立即保存
 * 插件指令：>存档管理器 : 存档[4] : 立即载入
 * 插件指令：>存档管理器 : 存档[4] : 删除存档文件
 * 插件指令：>存档管理器 : 存档变量[21] : 立即保存
 * 插件指令：>存档管理器 : 存档变量[21] : 立即载入
 * 插件指令：>存档管理器 : 存档变量[21] : 删除存档文件
 * 
 * 1.你可以使用插件指令，立即保存或载入存档。
 *   注意，插件指令执行后，后面执行的事件指令都会被断开，
 *   尽量确保改插件指令放最后。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取存档信息
 * 你可以使用下面插件指令获取信息：
 * 
 * 插件指令：>存档管理器 : 变量[21] : 获取值 : 当前存档的ID
 * 插件指令：>存档管理器 : 变量[21] : 获取值 : 存档文件数量
 * 插件指令：>存档管理器 : 开关[21] : 获取值 : 存档[4]是否存在
 * 
 * 1.获取后，指定变量得到的数字为结果值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧存档校验
 * 你可以使用下面插件指令获取存档相关信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>存档管理器 : 当前存档 : 检查存档是否为旧存档 : 开关[21]
 * 
 * 1.旧存档相关内容可以去看看："21.管理器 > 数据更新与旧存档.docx"
 * 2.旧存档指你对游戏工程进行 保存/部署 操作后，以前该游戏任何时间存储过的存档，
 *   都会被列为旧存档。只有用新版游戏再次存档后，旧存档标记才会消失。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 存档转移校验
 * 你可以使用下面插件指令获取存档相关信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>存档管理器 : 当前存档 : 检查存档是否在同一机器上运行 : 开关[21]
 * 
 * 1.插件添加后，每个存档会额外存储用户当前使用的电脑型号、操作系统数据。
 *   如果存档未被转移，获取后的开关值为true。
 *   如果存档被转移到 别的电脑 或 系统被重装为其它版本，获取后的开关值为false。
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
 * 测试方法：   分别在地图界面和战斗界面进行保存。
 * 测试结果：   地图界面中使用插件指令保存，消耗为：【11.27ms】
 *              战斗界面中使用插件指令保存，消耗为：【10.66ms】
 *              （注意，真实保存消耗无法确定，此插件只调用了接口）
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只提供了保存存档，载入存档的调用接口功能。
 *   真实的保存过程，牵涉到数据量的大小，以及系统创建文件、转码
 *   文件等一系列复杂操作，所以真实消耗无法确定。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 检查存档 插件指令无效的bug。
 * 添加了旧存档的识别指令。
 * [v1.2]
 * 修改了插件分类。
 * [v1.3]
 * 添加了删除存档功能。
 * 
 * 
 * 
 * @param 自动存档槽位
 * @type number
 * @min 0
 * @desc 
 * @default 1
 * 
 * @param 场所移动时是否自动存档
 * @type boolean
 * @on 存档
 * @off 关闭
 * @desc true - 存档，false - 关闭
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		GSM (Global_Save_Manager)
//		临时全局变量	DrillUp.drill_GSM_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	使用插件指令保存
//		★性能测试消耗	11.27ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			存档管理器：
//				->手动存档
//				->自动存档
//				->存档校验
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
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GlobalStorageManager = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GlobalStorageManager');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_GSM_autoSaveSlot = Number(DrillUp.parameters['自动存档槽位'] || 1);
	DrillUp.g_GSM_autoTransferSave = String(DrillUp.parameters['场所移动时是否自动存档'] || "false") == "true";
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_GSM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GSM_pluginCommand.call(this, command, args);
	if( command === ">存档管理器" ){
		
		/*-----------------存档文件------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var save_id = null;
			
			if( temp1 == "当前存档" ){
				save_id = DataManager._lastAccessedId;
			}
			if( temp1.indexOf("存档变量[") != -1 ){
				temp1 = temp1.replace("存档变量[","");
				temp1 = temp1.replace("]","");
				save_id = $gameVariables.value(Number(temp1));
			}
			if( temp1.indexOf("存档[") != -1 ){
				temp1 = temp1.replace("存档[","");
				temp1 = temp1.replace("]","");
				save_id = Number(temp1);
			}
			
			if( save_id != null ){
				if( type == "立即保存" ){
					DataManager.drill_GSM_doSave( save_id );
				}
				if( type == "立即载入" ){
					DataManager.drill_GSM_doLoad( save_id );
				}
				if( type == "删除存档文件" ){
					DataManager.drill_GSM_doDelete( save_id );
				}
			}
		}
		
		/*-----------------变量赋值------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			
			if( type == "获取值" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("开关[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				
				if( temp2 == "当前存档的ID" ){
					$gameVariables.setValue( temp1, DataManager._lastAccessedId );
				}
				if( temp2 == "存档文件数量" ){
					var globalInfo = DataManager.loadGlobalInfo();
					var numSavefiles = Math.max(0, globalInfo.length - 1);
					$gameVariables.setValue( temp1, numSavefiles );
				}
				if( temp2.indexOf("]是否存在") != -1 ){
					temp2 = temp2.replace("存档[","");
					temp2 = temp2.replace("]是否存在","");
					temp2 = Number(temp2);
					$gameSwitches.setValue( temp1, StorageManager.exists(temp2) );
				}
			}
			if( type == "检查存档是否为旧存档" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DrillUp.g_GSM_isOldSave );
			}
			if( type == "检查存档是否在同一机器上运行" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DrillUp.g_GSM_isSameSave );
			}
		}
		
	}
}

//=============================================================================
// ** 存档管理器
//=============================================================================
//==============================
// * 存档管理器 - 执行保存
//==============================
DataManager.drill_GSM_doSave = function( save_file_id ){
	$gameSystem.onBeforeSave();
	var success = DataManager.saveGame( save_file_id );
	return success;
}
//==============================
// * 存档管理器 - 执行载入
//==============================
DataManager.drill_GSM_doLoad = function( save_file_id ){
	var success = DataManager.loadGame( save_file_id );
	if( success ){
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
	}
	return success;
}
//==============================
// * 存档管理器 - 执行删除
//==============================
DataManager.drill_GSM_doDelete = function( save_file_id ){
	StorageManager.remove( save_file_id );
	StorageManager.cleanBackup( save_file_id );
}


//=============================================================================
// ** 自动存档
//=============================================================================
//==============================
// * 自动存档 - 场所移动时
//==============================
var _drill_GSM_command201 = Game_Interpreter.prototype.command201;
Game_Interpreter.prototype.command201 = function() {
	_drill_GSM_command201.call(this);
	
	if( $gamePlayer.isTransferring() && DrillUp.g_GSM_autoTransferSave == true ){
		DataManager.drill_GSM_doSave( DrillUp.g_GSM_autoSaveSlot );
	}
};


//=============================================================================
// ** 旧存档识别
//=============================================================================
//==============================
// * 校验 - 参数标记
//==============================
DrillUp.g_GSM_isOldSave = false;
//==============================
// * 新游戏 - 容器初始化
//==============================
var _drill_GSM_createGameObjects2 = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_drill_GSM_createGameObjects2.call( this );
	DrillUp.g_GSM_isOldSave = false;		//（刷新标记）
}
//==============================
// * 存档文件 - 保存存档 - 数据获取
//==============================
var _drill_GSM_makeSaveContents2 = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _drill_GSM_makeSaveContents2.call(this);
	contents._drill_GSM_versionId = $dataSystem.versionId;
    return contents;
};
//==============================
// * 存档文件 - 载入存档 - 数据赋值
//==============================
var _drill_GSM_extractSaveContents2 = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GSM_extractSaveContents2.call( this, contents );
	
	// > 比较存档
	if( contents._drill_GSM_versionId == undefined ){
		DrillUp.g_GSM_isOldSave = true;
	}else{
		if( contents._drill_GSM_versionId == $dataSystem.versionId ){
			DrillUp.g_GSM_isOldSave = false;
		}else{
			DrillUp.g_GSM_isOldSave = true;
		}
	}
};


//=============================================================================
// ** 存档转移校验
//=============================================================================
//==============================
// * 校验 - 参数标记
//==============================
DrillUp.g_GSM_isSameSave = true;
//==============================
// * 新游戏 - 容器初始化
//==============================
var _drill_GSM_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_drill_GSM_createGameObjects.call( this );
	DrillUp.g_GSM_isSameSave = true;		//（刷新标记）
}
//==============================
// * 存档文件 - 保存存档 - 数据获取
//==============================
var _drill_GSM_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _drill_GSM_makeSaveContents.call(this);
	
	// > 相同存档时，保存信息
	if( DrillUp.g_GSM_isSameSave == true ){
		contents._drill_GSM_checkInfo = DataManager.drill_GSM_getInfoData();
	}
	
    return contents;
};
//==============================
// * 存档文件 - 载入存档 - 数据赋值
//==============================
var _drill_GSM_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GSM_extractSaveContents.call( this, contents );
	
	// > 比较存档
	var info = contents._drill_GSM_checkInfo;
	DrillUp.g_GSM_isSameSave = (info == DataManager.drill_GSM_getInfoData() );
};
//==============================
// * 存档文件 - 获取字符串信息
//==============================
DataManager.drill_GSM_getInfoData = function(){
	
	// > 本地文件模式
	var info = "";
    if( StorageManager.isLocalMode() ){
		
		var os = require("os");
		info += os.platform();		//操作系统
		info += os.release();		//系统版本
		info += os.type();			//系统名称
		info += os.arch();			//CPU架构
	
	// > 本地网页模式
	}else{
		
		info += navigator.appCodeName;
		info += navigator.appName;
		info += navigator.appVersion;
		info += navigator.userAgent;
	}
	return info
}
/*
	var os = require("os");
	 
	var osInfo; 
	osInfo += "操作系统=" + os.platform();
	osInfo += "系统版本=" + os.release();
	osInfo += "系统名称=" + os.type();
	osInfo += "CPU架构=" + os.arch();
	 
	console.log(osInfo);
*/
/*
	浏览器模式
	navigator.appCodeName
	navigator.appName
	navigator.appVersion
	navigator.cookieEnabled
	navigator.platform（只输出win32……）
	navigator.userAgent
	
	https://www.runoob.com/jsref/obj-navigator.html
*/

