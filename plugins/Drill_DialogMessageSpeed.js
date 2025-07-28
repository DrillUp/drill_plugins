//=============================================================================
// Drill_DialogMessageSpeed.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        窗口字符 - 逐个绘制的播放速度
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogMessageSpeed +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得逐个绘制每个字符时，修改播放速度。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 可被扩展：
 *   - Drill_CoreOfDialog            对话框-对话框优化核心
 *     如果没有对话框优化核心，则播放速度的设置在对话框中不起作用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框。
 * 2.了解更多速度相关，可以去看看 "23.窗口字符 > 关于逐个绘制的播放速度.docx"。
 * 细节：
 *   (1.窗口字符设置"\dDMS[慢]"的优先级比插件指令"修改模式"设置的高。
 *      如果窗口字符修改了间隔，那么按窗口字符来修改。
 *      但窗口字符的修改，只临时有效，对话框中下一页 或 执行重新绘制，都会被重置。
 *   (2.插件本质上只修改 每个字的间隔时长。
 *      分为"慢中快"模式，是为了适配 选项界面 的接口设定。
 * 设计：
 *   (1.默认情况下文字播放速度为快。
 *      如果你希望播放速度慢一点，可以调整模式为中或慢。
 *      最好不要用\|\.类似的等待字符来卡玩家时间，因为对于想
 *      打多结局的玩家，已经玩过一遍主线，想跳剧情，对话时被
 *      这些等待字符卡住时间，非常煎熬。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用下列窗口字符实时修改速度：
 * 
 * 窗口字符：\dDMS[慢]
 * 窗口字符：\dDMS[中]
 * 窗口字符：\dDMS[快]
 * 窗口字符：\dDMS[指定间隔:3]
 * 
 * 1."\dDMS[慢]"表示之后的字符，全部以慢速来进行播放。
 *   "dDMS"指drill插件下的"DialogMessageSpeed"插件，该插件简称为DMS。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>逐个绘制的播放速度 : 所有文本 : 修改模式 : 模式-慢
 * 插件指令：>逐个绘制的播放速度 : 所有文本 : 修改模式 : 模式-中
 * 插件指令：>逐个绘制的播放速度 : 所有文本 : 修改模式 : 模式-快
 * 插件指令：>逐个绘制的播放速度 : 所有文本 : 修改指定间隔 : 指定间隔[3]
 * 插件指令：>逐个绘制的播放速度 : 所有文本 : 恢复默认模式
 * 
 * 插件指令：>逐个绘制的播放速度 : 对话框 : 修改模式 : 模式-慢
 * 插件指令：>逐个绘制的播放速度 : 对话框 : 修改模式 : 模式-中
 * 插件指令：>逐个绘制的播放速度 : 对话框 : 修改模式 : 模式-快
 * 插件指令：>逐个绘制的播放速度 : 对话框 : 修改指定间隔 : 指定间隔[3]
 * 插件指令：>逐个绘制的播放速度 : 对话框 : 恢复默认模式
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
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
 * 测试方法：   窗口字符管理层和战斗界面进行性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在每个字符显示时，单次执行，产生的消耗几乎可以忽略不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * [v1.2]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 * 
 * 
 * @param ---全局默认值---
 * @desc 
 *
 * @param 所有文本-默认播放速度模式
 * @parent ---全局默认值---
 * @type select
 * @option 快
 * @value 快
 * @option 中
 * @value 中
 * @option 慢
 * @value 慢
 * @desc 默认的播放速度模式。
 * @default 中
 * 
 * @param 对话框-默认播放速度模式
 * @parent ---全局默认值---
 * @type select
 * @option 快
 * @value 快
 * @option 中
 * @value 中
 * @option 慢
 * @value 慢
 * @desc 默认的播放速度模式。
 * @default 快
 * 
 * 
 * @param ---模式属性---
 * @desc 
 * 
 * @param 模式-慢的播放间隔
 * @parent ---模式属性---
 * @type number
 * @min 1
 * @desc 模式-慢 情况下，每个字播放的间隔时长，单位帧。（1秒60帧）
 * @default 5
 * 
 * @param 模式-中的播放间隔
 * @parent ---模式属性---
 * @type number
 * @min 1
 * @desc 模式-中 情况下，每个字播放的间隔时长，单位帧。（1秒60帧）
 * @default 3
 * 
 * @param 模式-快的播放间隔
 * @parent ---模式属性---
 * @type number
 * @min 1
 * @desc 模式-快 情况下，每个字播放的间隔时长，单位帧。（1秒60帧）
 * @default 1
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DMS（Dialog_Message_Speed）
//		临时全局变量	无
//		临时局部变量	this._drill_DMS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	4.86ms（drill_COWC_effect_processCombined） 0.8ms（drill_DMS_getIntervalValue）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			
//			->☆窗口字符应用之效果字符
//				> \dDMS[慢]
//				> \dDMS[中]
//				> \dDMS[快]
//				> \dDMS[指定间隔:3]
//			->☆全局默认值
//				->准备绘制配置（继承）
//				->准备绘制配置（对话框）
//			x->☆重置控制
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.
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
	DrillUp.g_DMS_PluginTip_curName = "Drill_DialogMessageSpeed.js 窗口字符-逐个绘制的播放速度";
	DrillUp.g_DMS_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DMS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DMS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DMS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DMS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DMS_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogMessageSpeed = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogMessageSpeed');
	
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_DMS_globalSpeedMode = String(DrillUp.parameters["所有文本-默认播放速度模式"] || "中");
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_DMS_dialogSpeedMode = String(DrillUp.parameters["对话框-默认播放速度模式"] || "中");
	
	/*-----------------杂项------------------*/
	DrillUp.g_DMS_modeSlow = Number(DrillUp.parameters["模式-慢的播放间隔"] || 5);
	DrillUp.g_DMS_modeMiddle = Number(DrillUp.parameters["模式-中的播放间隔"] || 3);
	DrillUp.g_DMS_modeFast = Number(DrillUp.parameters["模式-快的播放间隔"] || 1);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DMS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DMS_pluginCommand.call(this, command, args);
	this.drill_DMS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DMS_pluginCommand = function( command, args ){
	if( command === ">逐个绘制的播放速度" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认模式" ){
						$gameSystem._drill_DMS_globalSpeedMode = DrillUp.g_DMS_globalSpeedMode;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					if( temp1 == "修改速度" ){	
						if( temp2.indexOf("指定间隔[") != -1 ){
							temp2 = temp2.replace("指定间隔[","");
							temp2 = temp2.replace("]","");
							$gameSystem._drill_DMS_globalSpeedMode = "指定";
							$gameSystem._drill_DMS_globalLockInterval = Number(temp2);
						}
					}
					if( temp1 == "修改模式" ){	
						if( temp2 == "模式-慢" ){
							$gameSystem._drill_DMS_globalSpeedMode = "慢";
						}
						if( temp2 == "模式-中" ){
							$gameSystem._drill_DMS_globalSpeedMode = "中";
						}
						if( temp2 == "模式-快" ){
							$gameSystem._drill_DMS_globalSpeedMode = "快";
						}
					}
				}
			}
		}
		
		/*-----------------『全局默认值』对话框（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认模式" ){	
						$gameSystem._drill_DMS_dialogSpeedMode = DrillUp.g_DMS_dialogSpeedMode;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					if( temp1 == "修改速度" ){	
						if( temp2.indexOf("指定间隔[") != -1 ){
							temp2 = temp2.replace("指定间隔[","");
							temp2 = temp2.replace("]","");
							$gameSystem._drill_DMS_dialogSpeedMode = "指定";
							$gameSystem._drill_DMS_dialogLockInterval = Number(temp2);
						}
					}
					if( temp1 == "修改模式" ){	
						if( temp2 == "模式-慢" ){	
							$gameSystem._drill_DMS_dialogSpeedMode = "慢";
						}
						if( temp2 == "模式-中" ){	
							$gameSystem._drill_DMS_dialogSpeedMode = "中";
						}
						if( temp2 == "模式-快" ){	
							$gameSystem._drill_DMS_dialogSpeedMode = "快";
						}
					}
				}
			}
		}
		
	}
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DMS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DMS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DMS_sys_initialize.call(this);
	this.drill_DMS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DMS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DMS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DMS_saveEnabled == true ){	
		$gameSystem.drill_DMS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DMS_initSysData();
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
Game_System.prototype.drill_DMS_initSysData = function() {
	this.drill_DMS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DMS_checkSysData = function() {
	this.drill_DMS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DMS_initSysData_Private = function() {
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_DMS_globalSpeedMode = DrillUp.g_DMS_globalSpeedMode;	//所有文本 - 当前模式
	this._drill_DMS_globalLockInterval = 1;								//所有文本 - 指定间隔（插件指令修改）
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_DMS_dialogSpeedMode = DrillUp.g_DMS_dialogSpeedMode;	//对话框 - 当前模式
	this._drill_DMS_dialogLockInterval = 1;								//对话框 - 指定间隔（插件指令修改）
	
	// > 模式属性
	this._drill_DMS_modeSlowInterval = DrillUp.g_DMS_modeSlow;
	this._drill_DMS_modeMiddleInterval = DrillUp.g_DMS_modeMiddle;
	this._drill_DMS_modeFastInterval = DrillUp.g_DMS_modeFast;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DMS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DMS_dialogSpeedMode == undefined ){
		this.drill_DMS_initSysData();
	}
};
//==============================
// * 存储数据 - 获取 播放间隔值
//==============================
Game_System.prototype.drill_DMS_getIntervalValue = function( mode, isDialog ){
	if( mode == "慢" ){
		return Math.max( this._drill_DMS_modeSlowInterval, 0 );
	}
	if( mode == "中" ){
		return Math.max( this._drill_DMS_modeMiddleInterval, 0 );
	}
	if( mode == "快" ){
		return Math.max( this._drill_DMS_modeFastInterval, 0 );
	}
	if( mode == "指定" ){
		if( isDialog == true ){
			return Math.max( this._drill_DMS_dialogLockInterval, 0 );
		}else{
			return Math.max( this._drill_DMS_globalLockInterval, 0 );
		}
	}
	return 0;
}


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置
//==============================
var _drill_DMS_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_DMS_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDMS" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			
			// > 『窗口字符定义』 - 修改计时器间隔（\dDMS[慢]）
			if( temp1 == "慢" ){
				var value = $gameSystem.drill_DMS_getIntervalValue( "慢" );
				this.drill_COWC_effect_submitCombined( "@@@_ti[" + value + "]" );
			}
			
			// > 『窗口字符定义』 - 修改计时器间隔（\dDMS[中]）
			if( temp1 == "中" ){
				var value = $gameSystem.drill_DMS_getIntervalValue( "中" );
				this.drill_COWC_effect_submitCombined( "@@@_ti[" + value + "]" );
			}
			
			// > 『窗口字符定义』 - 修改计时器间隔（\dDMS[快]）
			if( temp1 == "快" ){
				var value = $gameSystem.drill_DMS_getIntervalValue( "快" );
				this.drill_COWC_effect_submitCombined( "@@@_ti[" + value + "]" );
			}
		}
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			
			// > 『窗口字符定义』 - 修改计时器间隔（\dDMS[指定间隔:3]）
			//		（此处直接使用底层字符 @@@_ti[3] ）
			if( temp1 == "指定间隔" ){
				var value = Number(temp2);
				this.drill_COWC_effect_submitCombined( "@@@_ti[" + value + "]" );
			}
		}
	}
};


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处提供 全局默认值，使得可以作用于所有文本。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 准备绘制配置（继承）
//
//			说明：	> 由于 Bitmap 没有存放相关参数，所以直接继承函数 drill_COCD_initOptions 进行初始化。
//==============================
var _drill_DMS_COCD_initOptions = Game_Temp.prototype.drill_COCD_initOptions;
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	_drill_DMS_COCD_initOptions.call( this, o_data, o_bitmap );
	if( $gameSystem == undefined ){ return; }
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_Interval = $gameSystem.drill_DMS_getIntervalValue( $gameSystem._drill_DMS_globalSpeedMode, false );
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( o_bitmap != undefined &&
		o_bitmap.drill_COWC_isInMessageWindow() ){
		
		cur_Interval = $gameSystem.drill_DMS_getIntervalValue( $gameSystem._drill_DMS_dialogSpeedMode, true );
	}
	
	// > 『全局默认值』 - 使用值
	if( o_data['blockParam']['perTick'] == undefined ){ o_data['blockParam']['perTick'] = cur_Interval; }
}
//==============================
// * 全局默认值 - 最后继承1级
//==============================
var _drill_DMS_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DMS_scene_initialize.call(this);
	
	if( Imported.Drill_CoreOfDialog ){
		
		//==============================
		// * 全局默认值 - 准备绘制配置（对话框）
		//==============================
		var _drill_DMS_CODi_message_initOptions = Window_Message.prototype.drill_CODi_message_initOptions;
		Window_Message.prototype.drill_CODi_message_initOptions = function( o_data ){
			
			// > 『全局默认值』 - 使用值（对话框）
			var cur_Interval = $gameSystem.drill_DMS_getIntervalValue( $gameSystem._drill_DMS_dialogSpeedMode, true );
			if( o_data['blockParam'] == undefined ){ o_data['blockParam'] = {}; }
			if( o_data['blockParam']['perTick'] == undefined ){ o_data['blockParam']['perTick'] = cur_Interval; }
			
			// > 原函数
			_drill_DMS_CODi_message_initOptions.call( this, o_data );
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogMessageSpeed = false;
		var pluginTip = DrillUp.drill_DMS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


