//=============================================================================
// Drill_DialogMessageSpeed.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        窗口字符 - 对话文字速度
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
 * 使得你可以通过窗口字符控制对话框的文本播放速度。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框。
 * 2.了解更多速度相关，可以去看看 "23.窗口字符 > 关于对话文字速度.docx"。
 * 细节：
 *   (1.插件本质上只修改 每个字的间隔时长。
 *      分为"慢中快"模式，是为了适配 选项界面 的接口设定。
 * 设计：
 *   (1.默认情况下文字播放速度为快。
 *      如果你希望播放速度慢一点，可以调整模式为中或慢。
 *      最好不要用\|\.类似的等待字符来卡玩家时间，因为对于想
 *      打多结局的玩家，已经玩过一遍主线，想跳剧情，对话时被
 *      这些等待字符卡住时间，非常煎熬。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 常用参数
 * 你可以通过插件指令手动控制边框的属性：
 * 
 * 插件指令：>对话文字速度 : 修改速度 : 指定间隔[3]
 * 插件指令：>对话文字速度 : 修改模式 : 模式-慢
 * 插件指令：>对话文字速度 : 修改模式 : 模式-中
 * 插件指令：>对话文字速度 : 修改模式 : 模式-快
 * 插件指令：>对话文字速度 : 修改模式 : 模式-瞬间
 * 插件指令：>对话文字速度 : 修改模式 : 默认模式
 * 插件指令：>对话文字速度 : 暂存当前的模式
 * 插件指令：>对话文字速度 : 恢复暂存的模式
 * 
 * 1.修改后永久有效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口字符修改
 * 你可以使用下列窗口字符实时修改速度：
 * 
 * 窗口字符：\dDMS[慢]
 * 窗口字符：\dDMS[中]
 * 窗口字符：\dDMS[快]
 * 窗口字符：\dDMS[瞬间]
 * 窗口字符：\dDMS[默认]
 * 窗口字符：\dDMS[指定间隔:3]
 * 
 * 1."\dDMS[慢]"表示之后的字符，全部以慢速来进行播放。
 *   "dDMS"指drill插件下的"DialogMessageSpeed"插件，该插件简称为DMS。
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
 * 测试方法：   在不同界面进行测试。
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
 * 
 * 
 * 
 * @param 默认对话速度模式
 * @type select
 * @option 快
 * @value 快
 * @option 中
 * @value 中
 * @option 慢
 * @value 慢
 * @option 瞬间
 * @value 瞬间
 * @desc 默认的对话速度模式。
 * @default 中
 * 
 * @param 模式-慢的播放间隔
 * @type number
 * @min 1
 * @desc 模式-慢 情况下，每个字播放的间隔时长，单位帧。（1秒60帧）
 * @default 5
 * 
 * @param 模式-中的播放间隔
 * @type number
 * @min 1
 * @desc 模式-中 情况下，每个字播放的间隔时长，单位帧。（1秒60帧）
 * @default 3
 * 
 * @param 模式-快的播放间隔
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
//		★性能测试消耗	4.86ms（drill_COWC_processNewEffectChar_Combined） 0.8ms（drill_DMS_getInterval）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话文字速度：
//				->模式
//				->插件指令设置
//				->窗口字符设置
//			
//		★必要注意事项：
//			1.
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
　　Imported.Drill_DialogMessageSpeed = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogMessageSpeed');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DMS_defaultSpeedMode = String(DrillUp.parameters["默认对话速度模式"] || "中");
	DrillUp.g_DMS_modeSlow = Number(DrillUp.parameters["模式-慢的播放间隔"] || 5);
	DrillUp.g_DMS_modeMiddle = Number(DrillUp.parameters["模式-中的播放间隔"] || 3);
	DrillUp.g_DMS_modeFast = Number(DrillUp.parameters["模式-快的播放间隔"] || 1);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_DMS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DMS_pluginCommand.call(this, command, args);
	if( command === ">对话文字速度" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "暂存当前的模式" ){	
				$gameSystem._drill_DMS_speedSavedMode = $gameSystem._drill_DMS_speedMode;
			}
			if( type == "恢复暂存的模式" ){	
				$gameSystem._drill_DMS_speedMode = $gameSystem._drill_DMS_speedSavedMode;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改速度" ){	
				if( temp1.indexOf("指定间隔[") != -1 ){
					temp1 = temp1.replace("指定间隔[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DMS_speedMode = "指定";
					$gameSystem._drill_DMS_modeLockInterval = Number(temp1);
				}
			}
			if( type == "修改模式" ){	
				if( temp1 == "模式-慢" ){	
					$gameSystem._drill_DMS_speedMode = "慢";
				}
				if( temp1 == "模式-中" ){	
					$gameSystem._drill_DMS_speedMode = "中";
				}
				if( temp1 == "模式-快" ){	
					$gameSystem._drill_DMS_speedMode = "快";
				}
				if( temp1 == "模式-瞬间" ){	
					$gameSystem._drill_DMS_speedMode = "瞬间";
				}
				if( temp1 == "默认模式" ){	
					$gameSystem._drill_DMS_speedMode = DrillUp.g_DMS_defaultSpeedMode;
				}
			}
		}
	}
};

//=============================================================================
// * 效果字符 - 对话文字速度
//=============================================================================
var _drill_DMS_COWC_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DMS_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDMS" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( temp1 == "慢" ){
				$gameSystem._drill_DMS_speedMode = "慢";
			}
			if( temp1 == "中" ){
				$gameSystem._drill_DMS_speedMode = "中";
			}
			if( temp1 == "快" ){
				$gameSystem._drill_DMS_speedMode = "快";
			}
			if( temp1 == "瞬间" ){
				$gameSystem._drill_DMS_speedMode = "瞬间";
			}
			if( temp1 == "默认" ){
				$gameSystem._drill_DMS_speedMode = DrillUp.g_DMS_defaultSpeedMode;
			}
			this.drill_COWC_charSubmit_Effect( 0, 0 );
		}
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			if( temp1 == "指定间隔" ){
				$gameSystem._drill_DMS_speedMode = "指定";
				$gameSystem._drill_DMS_modeLockInterval = Number(temp2);
			}
			this.drill_COWC_charSubmit_Effect( 0, 0 );
		}
	}
}

//#############################################################################
// ** 【标准模块】存储数据
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
	
	// > 模式
	this._drill_DMS_speedMode = DrillUp.g_DMS_defaultSpeedMode;
	this._drill_DMS_speedSavedMode = DrillUp.g_DMS_defaultSpeedMode;
	
	// > 播放间隔
	this._drill_DMS_modeSlowInterval = DrillUp.g_DMS_modeSlow;
	this._drill_DMS_modeMiddleInterval = DrillUp.g_DMS_modeMiddle;
	this._drill_DMS_modeFastInterval = DrillUp.g_DMS_modeFast;
	this._drill_DMS_modeLockInterval = 1;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DMS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DMS_speedMode == undefined ){
		this.drill_DMS_initSysData();
	}
	
};
//==============================
// * 存储数据 - 获取速度
//==============================
Game_System.prototype.drill_DMS_getInterval = function() {
	if( this._drill_DMS_speedMode == "慢" ){
		return Math.max( this._drill_DMS_modeSlowInterval-1, 0);
	}
	if( this._drill_DMS_speedMode == "中" ){
		return Math.max( this._drill_DMS_modeMiddleInterval-1, 0);
	}
	if( this._drill_DMS_speedMode == "快" ){
		return Math.max( this._drill_DMS_modeFastInterval-1, 0);
	}
	if( this._drill_DMS_speedMode == "指定" ){
		return Math.max( this._drill_DMS_modeLockInterval-1, 0);
	}
	return 0;
}

//=============================================================================
// ** 字符间隔
//=============================================================================
//==============================
// * 字符间隔 - 初始化
//==============================
var _drill_DMS_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(){
	_drill_DMS_initialize.call(this);
	this._drill_DMS_waitCount = 0;
}
//==============================
// * 字符间隔 - 阻塞绘制速度
//==============================
var _drill_DMS_updateMessage = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function(){
	
	// > 阻塞绘制速度
	if( this._drill_DMS_waitCount > 0 ){
		this._drill_DMS_waitCount -= 1;
		
		// > 按确定键 瞬间显示当前页
		this.updateShowFast();
		return true;
	}
	
	// > 不阻塞，返回原函数
	return _drill_DMS_updateMessage.call(this);
}
//==============================
// * 字符间隔 - 初始化
//==============================
var _drill_DMS_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
Window_Message.prototype.processNormalCharacter = function( textState ){
	_drill_DMS_processNormalCharacter.call( this, textState );
	
	// > 跳出时，才开始标记
	if( this.drill_COWC_canBreakProcess() == true ){
		
		// > 延迟输入标记
		this._drill_DMS_waitCount = $gameSystem.drill_DMS_getInterval();
	}
}
//==============================
// * 字符间隔 - 跳出的条件
//==============================
var _drill_COWC_DMS_canBreakProcess = Window_Message.prototype.drill_COWC_canBreakProcess;
Window_Message.prototype.drill_COWC_canBreakProcess = function(){
	
	// > 瞬间的情况
	if( $gameSystem._drill_DMS_speedMode == "瞬间" ){ return false; }
	
	// > 原函数
	var result = _drill_COWC_DMS_canBreakProcess.call( this );
	
	// > 含延迟输入时，跳出
	if( result == false && this._drill_DMS_waitCount > 0 ){ return true; }
	return result;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogMessageSpeed = false;
		alert(
			"【Drill_DialogMessageSpeed.js 窗口字符-对话文字速度】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心"
		);
}


