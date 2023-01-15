//=============================================================================
// Drill_X_EventTextTransparent.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        行走图 - 事件漂浮文字自动显现[扩展]
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_EventTextTransparent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置事件漂浮文字能够根据条件自动显现。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_EventText              行走图-事件漂浮文字★★v1.9及以上★★
 *     需要该插件才能设置自动显现。
 * 可作用于：
 *   - Drill_X_EventTextBackground  行走图-事件漂浮文字的背景[扩展]
 *   - Drill_X_EventTextLine        行走图-事件漂浮文字批注线[扩展]
 *     该插件可以给扩展的内容，进行透明度变化、遮罩变化设置。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件漂浮文字。
 * 2.具体可以去看看 "7.行走图 > 关于事件漂浮文字.docx"。
 * 细节：
 *   (1.该插件能够给 批注线、背景，设置自定义的变化模式。
 * 设计：
 *   (1.你可以给事件漂浮文字的几个部件设置延迟时间。
 *      使得它们先后依次显现，提升流畅效果。
 *   (2.默认设定下，玩家必须接近事件一定范围后才能进行显现。
 *      你也可以通过插件指令，手动控制 强制显现，实现简单的
 *      文字描述动画效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要添加下面的事件注释：
 *
 * 事件注释：=>事件漂浮文字自动显现 : 开启
 * 事件注释：=>事件漂浮文字自动显现 : 关闭
 * 
 * 1.该设置不跨事件页，切换事件页后默认关闭，需要重新添加注释来开启。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 属性设置
 * 你可以添加下面的事件注释，修改自动显现的属性：
 *
 * 事件注释：=>事件漂浮文字自动显现 : 漂浮文字 : 持续时长[20] : 延迟时间[30]
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 持续时长[30] : 延迟时间[0]
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 持续时长[30] : 延迟时间[0]
 * 
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 透明度变化
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 遮罩变化-自动
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 遮罩变化-从右往左
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 遮罩变化-从左往右
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 透明度变化
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 遮罩变化-自动
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 遮罩变化-从右往左
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 遮罩变化-从左往右
 * 
 * 1.该设置不跨事件页，切换事件页后默认关闭，需要重新添加注释来开启。
 * 2."遮罩变化-自动"指根据 偏移值的正负 来决定 从右往左 或 从左往右。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自动显现范围
 * 你可以通过插件指令临时修改属性：
 * 
 * 插件指令：>事件漂浮文字自动显现 : 修改自动显现范围 : 图块[4]
 * 插件指令：>事件漂浮文字自动显现 : 修改自动显现范围 : 默认值
 * 
 * 1.此设置修改后永久有效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令临时修改属性：
 * 
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 开启
 * 插件指令：>事件漂浮文字自动显现 : 事件[5] : 开启
 * 插件指令：>事件漂浮文字自动显现 : 事件变量[5] : 开启
 * 
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 开启
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 关闭
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 强制显现
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 取消强制显现
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 漂浮文字 : 持续时长[20] : 延迟时间[30]
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 持续时长[30] : 延迟时间[0]
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 持续时长[30] : 延迟时间[0]
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 透明度变化
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 遮罩变化-自动
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 遮罩变化-从右往左
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 遮罩变化-从左往右
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 透明度变化
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 遮罩变化-自动
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 遮罩变化-从右往左
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 遮罩变化-从左往右
 * 
 * 1.前半部分（本事件）和 后半部分（开启）
 *   的参数可以随意组合。一共有3*15种组合方式。
 * 2.修改的设置离开当前地图后将失效。
 * 3."强制显现"是指通过插件指令，强制执行显现，不需要玩家接近激活。
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
 * 工作类型：   持续执行
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   20个事件，添加自动透明功能，分别放置测试。
 * 测试结果：   200个事件的地图中，消耗为：【25.08ms】
 *              100个事件的地图中，消耗为：【21.70ms】
 *               50个事件的地图中，消耗为：【10.47ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件基于 事件漂浮文字，消耗与含设置的事件数量有关，但消耗并不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 *
 * @param 自动显现范围
 * @type number
 * @min 1
 * @desc 事件进入玩家的方形区域内后，会自动显现事件漂浮文字。
 * @default 4
 *
 * @param 漂浮文字-持续时长
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，变化持续的时长。
 * @default 20
 *
 * @param 漂浮文字-延迟时间
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，延迟变化时间。你可以让该部件延迟，等其他部件显示完毕后，在显示此部件。
 * @default 30
 *
 * @param 批注线-持续时长
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，变化持续的时长。
 * @default 30
 *
 * @param 批注线-延迟时间
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，延迟变化时间。你可以让该部件延迟，等其他部件显示完毕后，在显示此部件。
 * @default 0
 *
 * @param 批注线-变化模式
 * @type select
 * @option 透明度变化
 * @value 透明度变化
 * @option 遮罩变化-自动
 * @value 遮罩变化-自动
 * @option 遮罩变化-从右往左
 * @value 遮罩变化-从右往左
 * @option 遮罩变化-从左往右
 * @value 遮罩变化-从左往右
 * @desc 该部件显现的变化模式，详细可以去看看文档说明。
 * @default 遮罩变化-自动
 *
 * @param 背景-持续时长
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，变化持续的时长。
 * @default 30
 *
 * @param 背景-延迟时间
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，延迟变化时间。你可以让该部件延迟，等其他部件显示完毕后，在显示此部件。
 * @default 0
 *
 * @param 背景-变化模式
 * @type select
 * @option 透明度变化
 * @value 透明度变化
 * @option 遮罩变化-自动
 * @value 遮罩变化-自动
 * @option 遮罩变化-从右往左
 * @value 遮罩变化-从右往左
 * @option 遮罩变化-从左往右
 * @value 遮罩变化-从左往右
 * @desc 该部件显现的变化模式，详细可以去看看文档说明。
 * @default 遮罩变化-自动
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XETT（X_Event_Text_Transparent）
//		临时全局变量	DrillUp.g_XETT_xxx
//		临时局部变量	this._drill_XETT_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	初始点
//		★性能测试消耗	7.30ms 10.47ms 21.70ms（drill_XETT_updateChange）
//		★最坏情况		暂无
//		★备注			在低配本中，测的是10ms以内，高配本能测出21.70ms。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件漂浮文字自动显现：
//				->绑定控制器数据
//				->对象透明度控制
//					> 漂浮文字
//					> 批注线
//					> 背景
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_EventTextTransparent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_EventTextTransparent');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_XETL_triggerRange = Number(DrillUp.parameters["自动显现范围"] || 4 );
	DrillUp.g_XETL_text_time = Number(DrillUp.parameters["漂浮文字-持续时长"] || 20 );
	DrillUp.g_XETL_text_delay = Number(DrillUp.parameters["漂浮文字-延迟时间"] || 30 );
	DrillUp.g_XETL_line_time = Number(DrillUp.parameters["批注线-持续时长"] || 20 );
	DrillUp.g_XETL_line_delay = Number(DrillUp.parameters["批注线-延迟时间"] || 0 );
	DrillUp.g_XETL_line_mode = String(DrillUp.parameters["批注线-变化模式"] || "遮罩变化-自动" );
	DrillUp.g_XETL_background_time = Number(DrillUp.parameters["背景-持续时长"] || 20 );
	DrillUp.g_XETL_background_delay = Number(DrillUp.parameters["背景-延迟时间"] || 0 );
	DrillUp.g_XETL_background_mode = String(DrillUp.parameters["背景-变化模式"] || "遮罩变化-自动" );
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventText ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XETT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XETT_pluginCommand.call(this, command, args);
	if( command === ">事件漂浮文字自动显现" ){
		
		/*-----------------对象组获取------------------*/
		var e_id = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "本事件" ){
				var e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				var e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				var e_id = $gameVariables.value(Number(temp1));
			}
		}
		
		/*-----------------指令设置------------------*/
		if( e_id != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "开启" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETT_setEnabled( true );
			}
			if( type == "关闭" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETT_setEnabled( false );
			}
			if( type == "强制显现" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETT_setForceActived( true );
			}
			if( type == "取消强制显现" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETT_setForceActived( false );
			}
		}
		if( e_id != null && args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "漂浮文字" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				if( temp1.indexOf("持续时长[") != -1 ){
					temp1 = temp1.replace("持续时长[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					temp2 = temp2.replace("延迟时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETT_setTextAnimTime( temp1, temp2 );
				}
			}
			if( type == "批注线" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				if( temp1.indexOf("持续时长[") != -1 ){
					temp1 = temp1.replace("持续时长[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					temp2 = temp2.replace("延迟时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETT_setLineAnimTime( temp1, temp2 );
				}
				if( temp1 == "修改变化模式" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETT_setLineAnimMode( temp2 );
				}
			}
			if( type == "背景" ){
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				if( temp1.indexOf("持续时长[") != -1 ){
					temp1 = temp1.replace("持续时长[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					temp2 = temp2.replace("延迟时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETT_setBackgroundAnimTime( temp1, temp2 );
				}
				if( temp1 == "修改变化模式" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETT_setBackgroundAnimMode( temp2 );
				}
			}
		}
		
		/*-----------------自动显现范围------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "修改自动显现范围" ){
				if( temp2 == "默认值" ){
					$gameSystem._drill_XETL_triggerRange = DrillUp.g_XETL_triggerRange;
				}else{
					temp2 = temp2.replace("图块[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameSystem._drill_XETL_triggerRange = temp2;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_XETT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_X_EventTextTransparent.js 行走图 - 事件漂浮文字自动显现[扩展]】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_XETL_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XETL_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_XETL_sys_initialize.call(this);
	this.drill_XETL_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XETL_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_XETL_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_XETL_saveEnabled == true ){	
		$gameSystem.drill_XETL_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_XETL_initSysData();
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
Game_System.prototype.drill_XETL_initSysData = function() {
	this.drill_XETL_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_XETL_checkSysData = function() {
	this.drill_XETL_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_XETL_initSysData_Private = function() {
	
	this._drill_XETL_triggerRange = DrillUp.g_XETL_triggerRange;	//自动显现范围
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_XETL_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_XETL_triggerRange == undefined ){
		this.drill_XETL_initSysData();
	}
	
};


//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_XETT_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_XETT_c_setupPageSettings.call(this);
	this.drill_XETT_refreshBackground();
}
Game_Event.prototype.drill_XETT_refreshBackground = function() {
	
	// > 默认情况下，关闭自动显现
	if( this._drill_ET_controller != null ){
		this._drill_ET_controller.drill_XETT_setEnabled( false );
	}
	
	var page = this.page();
    if( page ){
		this.list().forEach(function(l){
			if( l.code === 108 ){
				var l_str = l.parameters[0];
				
				/*-----------------注释------------------*/
				var args = l_str.split(/[ ]+/);	
				var command = args.shift();
				if( command == "=>事件漂浮文字自动显现" ){
					if( args.length == 2 ){
						var type = String(args[1]);
						if( type == "开启" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETT_setEnabled( true );
						}
						if( type == "关闭" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETT_setEnabled( false );
						}
					}
					if( args.length == 6 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "漂浮文字" ){
							if( temp1.indexOf("持续时长[") != -1 ){
								temp1 = temp1.replace("持续时长[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								temp2 = temp2.replace("延迟时间[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setTextAnimTime( temp1, temp2 );
							}
						}
						if( type == "批注线" ){
							if( temp1.indexOf("持续时长[") != -1 ){
								temp1 = temp1.replace("持续时长[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								temp2 = temp2.replace("延迟时间[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setLineAnimTime( temp1, temp2 );
							}
							if( temp1 == "修改变化模式" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setLineAnimMode( temp2 );
							}
						}
						if( type == "背景" ){
							if( temp1.indexOf("持续时长[") != -1 ){
								temp1 = temp1.replace("持续时长[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								temp2 = temp2.replace("延迟时间[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setBackgroundAnimTime( temp1, temp2 );
							}
							if( temp1 == "修改变化模式" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setBackgroundAnimMode( temp2 );
							}
						}
					}
				};
			};
		}, this);
    }
}

//=============================================================================
// ** 漂浮文字控制器（继承）
//=============================================================================
//==============================
// * 控制器 - 初始化（继承）
//==============================
var _drill_XETT_ET_c_initData = Drill_ET_Controller.prototype.drill_initData;
Drill_ET_Controller.prototype.drill_initData = function(){
	_drill_XETT_ET_c_initData.call(this);
	var data = this._drill_data;
	
	// > 默认值
	if( data['animEnabled'] == undefined ){ data['animEnabled'] = false };												//动画开关
	if( data['animForceActived'] == undefined ){ data['animForceActived'] = false };									//强制显现
	if( data['animText_time'] == undefined ){ data['animText_time'] = DrillUp.g_XETL_text_time };						//文字 - 动画时长
	if( data['animText_delay'] == undefined ){ data['animText_delay'] = DrillUp.g_XETL_text_delay };					//文字 - 动画延迟
	if( data['animLine_time'] == undefined ){ data['animLine_time'] = DrillUp.g_XETL_line_time };						//批注线 - 动画时长
	if( data['animLine_delay'] == undefined ){ data['animLine_delay'] = DrillUp.g_XETL_line_delay };					//批注线 - 动画延迟
	if( data['animLine_mode'] == undefined ){ data['animLine_mode'] = DrillUp.g_XETL_line_mode };						//批注线 - 动画模式
	if( data['animBackground_time'] == undefined ){ data['animBackground_time'] = DrillUp.g_XETL_background_time };		//背景 - 动画时长
	if( data['animBackground_delay'] == undefined ){ data['animBackground_delay'] = DrillUp.g_XETL_background_delay };	//背景 - 动画延迟
	if( data['animBackground_mode'] == undefined ){ data['animBackground_mode'] = DrillUp.g_XETL_background_mode };		//背景 - 动画模式
}
//==============================
// * 控制器 - 设置可用（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setEnabled = function( enable ){
	var data = this._drill_data;
	data['animEnabled'] = enable;
}
//==============================
// * 控制器 - 设置强制显现（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setForceActived = function( enable ){
	var data = this._drill_data;
	data['animForceActived'] = enable;
}
//==============================
// * 控制器 - 设置漂浮文字 时间（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setTextAnimTime = function( time, delay ){
	var data = this._drill_data;
	data['animText_time'] = time;
	data['animText_delay'] = delay;
}
//==============================
// * 控制器 - 设置批注线 时间（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setLineAnimTime = function( time, delay ){
	var data = this._drill_data;
	data['animLine_time'] = time;
	data['animLine_delay'] = delay;
}
//==============================
// * 控制器 - 设置批注线 模式（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setLineAnimMode = function( mode ){
	var data = this._drill_data;
	data['animLine_mode'] = mode;
}
//==============================
// * 控制器 - 设置背景 时间（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setBackgroundAnimTime = function( time, delay ){
	var data = this._drill_data;
	data['animBackground_time'] = time;
	data['animBackground_delay'] = delay;
}
//==============================
// * 控制器 - 设置背景 模式（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setBackgroundAnimMode = function( mode ){
	var data = this._drill_data;
	data['animBackground_mode'] = mode;
}
//==============================
// * 控制器 - 获取最大时长（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETT_getMaxTime = function(){
	var data = this._drill_data;
	var t1 = data['animText_time'] + data['animText_delay'];
	var t2 = data['animLine_time'] + data['animLine_delay'];
	var t3 = data['animBackground_time'] + data['animBackground_delay'];
	if( t1 < t2 ){ t1 = t2; }
	if( t1 < t3 ){ t1 = t3; }
	return t1;
}


//=============================================================================
// ** 漂浮文字贴图（继承）
//=============================================================================
//==============================
// * 文字贴图 - 初始化
//==============================
var _drill_XETT_ET_sp_initialize = Drill_ET_WindowSprite.prototype.initialize;
Drill_ET_WindowSprite.prototype.initialize = function( obj_event ){
    _drill_XETT_ET_sp_initialize.call( this, obj_event );
	
	this._drill_XETT_curTime = 0;
	this._drill_XETT_maxTime = 0;
}
//==============================
// * 文字贴图 - 帧刷新
//==============================
var _drill_XETT_ET_sp_update = Drill_ET_WindowSprite.prototype.update;
Drill_ET_WindowSprite.prototype.update = function() {
	_drill_XETT_ET_sp_update.call(this);
	if( this._drill_controller == undefined ){ return; }
	this.drill_XETT_updateTime();			//帧刷新 - 时间流逝
	this.drill_XETT_updateChange();			//帧刷新 - 变化过程
}
//==============================
// * 帧刷新 - 时间流逝
//
//			说明：	此流逝在贴图中进行，与控制器无关。
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_updateTime = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['animEnabled'] == false ){ return; }
	
	// > 最大时间
	this._drill_XETT_maxTime = this._drill_controller.drill_XETT_getMaxTime();
	
	// > 显现
	if( this.drill_XETT_canShow() ){
		
		// > 时间+1
		this._drill_XETT_curTime += 1;
		if( this._drill_XETT_curTime > this._drill_XETT_maxTime ){
			this._drill_XETT_curTime = this._drill_XETT_maxTime;
		}
	
	// > 隐藏
	}else{
		
		// > 时间-1
		this._drill_XETT_curTime -= 1;
		if( this._drill_XETT_curTime < 0 ){
			this._drill_XETT_curTime = 0;
		}
	}
}
//==============================
// * 帧刷新 - 变化过程
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_updateChange = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['animEnabled'] == false ){ return; }
	
	// > 文字透明度
	var time = this._drill_XETT_curTime - d_data['animText_delay'];
	if( time < 0 ){ time = 0; }
	this.contentsOpacity = this._drill_controller._drill_textOpacity * time / d_data['animText_time'];
	
	// > 批注线透明度
	if( this._drill_XETL_curSprite ){
		var time = this._drill_XETT_curTime - d_data['animLine_delay'];
		if( time < 0 ){ time = 0; }
		if( d_data['animLine_mode'] == "透明度变化" ){
			this._drill_XETL_curSprite.opacity = 255 * time / d_data['animLine_time'];
		}
		var bitmap = this._drill_XETL_curSprite.bitmap;
		var ww = bitmap.width * time / d_data['animLine_time'];
		if( d_data['animLine_mode'] == "遮罩变化-自动" ){
			if( d_data['x'] < 0 ){	//（从右往左）
				var xx = bitmap.width - ww;
				if( xx < 0 ){ xx = 0; }
				this._drill_XETL_curSprite.x += xx;		//（从该基础上增加）
				this._drill_XETL_curSprite.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height ); 
			}else{					//（从左往右）
				this._drill_XETL_curSprite.drill_XETT_setFrame( 0, 0, ww, bitmap.height ); 
			}
		}
		if( d_data['animLine_mode'] == "遮罩变化-从右往左" ){
			var xx = bitmap.width - ww;
			if( xx < 0 ){ xx = 0; }
			this._drill_XETL_curSprite.x += xx;			//（从该基础上增加）
			this._drill_XETL_curSprite.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height );
		}
		if( d_data['animLine_mode'] == "遮罩变化-从左往右" ){
			this._drill_XETL_curSprite.drill_XETT_setFrame( 0, 0, ww, bitmap.height );
		}
	}
	
	// > 背景透明度
	if( this._drill_XETB_curBackground ){
		var time = this._drill_XETT_curTime - d_data['animBackground_delay'];
		if( time < 0 ){ time = 0; }
		if( d_data['animBackground_mode'] == "透明度变化" ){
			this._drill_XETB_curBackground.opacity = 255 * time / d_data['animBackground_time'];
		}
		var bitmap = this._drill_XETB_curBackground.bitmap;
		var ww = bitmap.width * time / d_data['animBackground_time'];
		if( d_data['animBackground_mode'] == "遮罩变化-自动" ){
			if( d_data['x'] < 0 ){	//（从右往左）
				var xx = bitmap.width - ww;
				if( xx < 0 ){ xx = 0; }
				this._drill_XETB_curBackground.x += xx;		//（从该基础上增加）
				this._drill_XETB_curBackground.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height ); 
			}else{					//（从左往右）
				this._drill_XETB_curBackground.drill_XETT_setFrame( 0, 0, ww, bitmap.height ); 
			}
		}
		if( d_data['animBackground_mode'] == "遮罩变化-从右往左" ){
			var xx = bitmap.width - ww;
			if( xx < 0 ){ xx = 0; }
			this._drill_XETB_curBackground.x += xx;			//（从该基础上增加）
			this._drill_XETB_curBackground.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height );
		}
		if( d_data['animBackground_mode'] == "遮罩变化-从左往右" ){
			this._drill_XETB_curBackground.drill_XETT_setFrame( 0, 0, ww, bitmap.height ); 
		}
	}
}
//==============================
// * 文字贴图 - 显现条件
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_canShow = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['animForceActived'] == true ){ return true; }
	if( Math.abs( this._drill_event.x - $gamePlayer.x ) < $gameSystem._drill_XETL_triggerRange &&
		Math.abs( this._drill_event.y - $gamePlayer.y ) < $gameSystem._drill_XETL_triggerRange ){
		return true;
	}
	return false;
}
//=============================================================================
// * 优化 - 浮点数过滤
//
//			说明：	用floor防止 浮点数 比较时，造成frame的反复刷新。
//=============================================================================
Sprite.prototype.drill_XETT_setFrame = function( x, y, width, height ){
	this.setFrame( Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height) );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_EventTextTransparent = false;
		alert(
			"【Drill_X_EventTextTransparent.js 行走图 - 事件漂浮文字自动显现[扩展]】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventText 行走图-事件漂浮文字"
		);
}


