//=============================================================================
// Drill_GlobalVariable.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        管理器 - 跨存档的变量
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalVariable +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置某个 变量/开关 能够跨存档作用。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     必须基于核心才能全局存储。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于整个游戏，包括存档。
 * 全局存储：
 *   (1.该插件控制的变量/开关设置存储在全局文件中。
 *      如果游戏中修改了指定的变量/开关，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 * 设计：
 *   (1.你可以设置整个游戏中只有一次的奖励。
 *   (2.你可以将游戏做成metagame，游戏中人物知道玩家做过什么事情，
 *      并在游戏中给玩家灵魂质问，给玩家造成心理阴影。
 *      但一定要谨慎设置 跨存档变量，逻辑整理清楚后再设置，
 *      不然你的剧情线会被搅得一团糟。
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
 * 测试方法：   修改变量值时，强制执行10000次。
 * 测试结果：   执行10000次，消耗为：【2.61ms】
 * 测试方法2：  在各界面运行时，测试平均消耗。
 * 测试结果2：  地图界面中，消耗为：【5ms以下】
 *              战斗界面中，消耗为：【5ms以下】
 *              菜单界面中，消耗为：【5ms以下】
 * 
 * 1.消耗性能太小，检测工具可能得不到更精确的值。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.性能测试是在加了 全局存储性能优化[扩展] 插件为前提进行的。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.3]
 * 修改了插件分类。
 * 
 * 
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID，该插件的数据将存储到指定的文件路径中，具体去 全局存储核心 看看。
 * @default 1
 * 
 * @param 跨存档的开关
 * @type switch[]
 * @desc 设置指定的开关能够跨存档存储。
 * @default ["0"]
 * 
 * @param 跨存档的变量
 * @type variable[]
 * @desc 设置指定的变量能够跨存档存储。
 * @default ["22"]
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		GVa（Global_Variable）
//		临时全局变量	DrillUp.g_GVa_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	DrillUp.g_GVa_switch
//						DrillUp.g_GVa_variable
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			只提供插件指令。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全局变量：
//				->变量控制
//				->开关控制
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.插件附着在 .setValue 方法上。只要setValue，就存储全局变量。
//			2.插件需要 Drill_X_GlobalOptimization 插件优化，不然会卡。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GlobalVariable = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GlobalVariable');
	
	/*-----------------杂项------------------*/
    DrillUp.g_GVa_saveFileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);
	if( DrillUp.parameters['跨存档的开关'] != undefined && 
		DrillUp.parameters['跨存档的开关'] != "" ){
		DrillUp.g_GVa_switch_id = JSON.parse(DrillUp.parameters['跨存档的开关']);
	}else{
		DrillUp.g_GVa_switch_id = [];
	}
	if( DrillUp.parameters['跨存档的变量'] != undefined && 
		DrillUp.parameters['跨存档的变量'] != "" ){
		DrillUp.g_GVa_variable_id = JSON.parse(DrillUp.parameters['跨存档的变量']);
	}else{
		DrillUp.g_GVa_variable_id = [];
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave ){
	
	
//=============================================================================
// ** 全局存储
//=============================================================================
//==============================
// * 全局 - 读取
//==============================
	var global_fileId = DrillUp.g_GVa_saveFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "GVa" );
	
	// > 开关列表
	if( DrillUp.global_GVa_switchTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_switchTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_GVa_switchTank = data;
	}
	// > 变量列表
	if( DrillUp.global_GVa_variableTank == null ){	
		var data = global_data["global_variableTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_GVa_variableTank = data;
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_GVa_saveData = function(){
	var file_id = DrillUp.g_GVa_saveFileId;
	var data = {};
	data["global_switchTank"] = DrillUp.global_GVa_switchTank;
	data["global_variableTank"] = DrillUp.global_GVa_variableTank;
	this.drill_COGS_saveData( file_id, "GVa", data );
};

//=============================================================================
// ** 赋值
//=============================================================================
//==============================
// * 赋值 - 读取地图
//==============================
var _drill_GVa_map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _drill_GVa_map_initialize.call(this);
	for(var i = 0; i< DrillUp.g_GVa_variable_id.length ;i++ ){
		var v_id = Number(DrillUp.g_GVa_variable_id[i]);
		var v_value = DrillUp.global_GVa_variableTank[v_id];
		if( v_value != undefined ){
			$gameVariables._data[v_id] = v_value;
		}
	}
	for(var i = 0; i< DrillUp.g_GVa_switch_id.length ;i++ ){
		var v_id = Number(DrillUp.g_GVa_switch_id[i]);
		var v_value = DrillUp.global_GVa_switchTank[v_id];
		if( v_value != undefined ){
			$gameSwitches._data[v_id] = v_value;
		}
	}
};
//==============================
// * 赋值 - 读取存档
//==============================
var _drill_GVa_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	_drill_GVa_extractSaveContents.call(this,contents);
	for(var i = 0; i< DrillUp.g_GVa_variable_id.length ;i++ ){
		var v_id = Number(DrillUp.g_GVa_variable_id[i]);
		var v_value = DrillUp.global_GVa_variableTank[v_id];
		if( v_value != undefined ){
			$gameVariables._data[v_id] = v_value;
		}
	}
	for(var i = 0; i< DrillUp.g_GVa_switch_id.length ;i++ ){
		var v_id = Number(DrillUp.g_GVa_switch_id[i]);
		var v_value = DrillUp.global_GVa_switchTank[v_id];
		if( v_value != undefined ){
			$gameSwitches._data[v_id] = v_value;
		}
	}
}

//=============================================================================
// ** 开关控制
//=============================================================================
var _drill_GVa_S_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    _drill_GVa_S_setValue.call( this, switchId, value);
	
	for(var i=0; i< DrillUp.g_GVa_switch_id.length ;i++ ){
		if( DrillUp.g_GVa_switch_id[i] == switchId ){
			DrillUp.global_GVa_switchTank[switchId] = value;
			StorageManager.drill_GVa_saveData();	//值变化后，立即保存
			break;
		}
	}
};
//=============================================================================
// ** 变量控制
//=============================================================================
var _drill_GVa_V_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(switchId, value) {
    _drill_GVa_V_setValue.call( this, switchId, value);
	
	for(var i=0; i< DrillUp.g_GVa_variable_id.length ;i++ ){
		if( DrillUp.g_GVa_variable_id[i] == switchId ){
			DrillUp.global_GVa_variableTank[switchId] = value;
			StorageManager.drill_GVa_saveData();	//值变化后，立即保存
			break;
		}
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GlobalVariable = false;
		alert(
			"【Drill_GlobalVariable.js 管理器-跨存档的变量】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"
		);
}
