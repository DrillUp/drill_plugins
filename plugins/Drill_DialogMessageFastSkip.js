//=============================================================================
// Drill_DialogMessageFastSkip.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        窗口字符 - 对话加速键
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogMessageFastSkip +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在对话时，按键加速对话。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心★★v1.9及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于 对话框 。
 * 加速键：
 *   (1.插件中有各种各样的加速键设置，详细可以去看看文档：
 *      "1.系统 > 关于输入设备核心.docx" 的 所有加速键 章节。
 *   (2.该插件支持对话加速，按对话加速键时，能够快速跳过对话框中的对话。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改设置：
 * 
 * 插件指令：>对话加速键 : 启用
 * 插件指令：>对话加速键 : 关闭
 * 
 * 1.对话加速键按下后，对话框转为瞬间显示，能够跳过非常多的文本剧情。
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
 * 2.对话加速键只改变一个状态位，所以几乎不考虑其消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 *
 * 
 *
 * @param 初始是否启用
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 启用 - true，关闭 - false。
 * @default true
 *
 * @param 对话加速键
 * @type select
 * @option 基本键-加速键
 * @value shift
 * @option 基本键-上一页
 * @value pageup
 * @option 基本键-下一页
 * @value pagedown
 * @desc 对话加速键与逻辑按键直接绑定。逻辑键位修改可以去看看插件 键盘-键盘手柄按键修改器。
 * @default pagedown
 * 
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DMFS (Dialog_Message_Fast_Skip)
//		临时全局变量	DrillUp.g_DMFS_xxx
//		临时局部变量	this._drill_DMFS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	2024/5/10：
//							》未找到，消耗太小。
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
//			->☆对话加速键
//				->按键监听
//				->跳过 等待按键输入字符 的功能
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
	DrillUp.g_DMFS_PluginTip_curName = "Drill_DialogMessageFastSkip.js 窗口字符-对话加速键";
	DrillUp.g_DMFS_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DMFS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DMFS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DMFS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DMFS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DMFS_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogMessageFastSkip = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogMessageFastSkip');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DMFS_fastSkipEnabled = String(DrillUp.parameters["初始是否启用"] || "true") == "true"; 
	DrillUp.g_DMFS_fastSkipKey = String(DrillUp.parameters["对话加速键"] || "pagedown"); 
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_DMFS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
    _drill_DMFS_pluginCommand.call(this, command, args);
    if( command === ">对话加速键" ){
		
        if( args.length == 2 ){
            var type = String(args[1]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
                $gameSystem._drill_DMFS_fastSkipEnabled = true;
            }
            if( type == "关闭" || type == "禁用" ){
                $gameSystem._drill_DMFS_fastSkipEnabled = false;
            }
        }
    }
}
	
	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DMFS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DMFS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DMFS_sys_initialize.call(this);
	this.drill_DMFS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DMFS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DMFS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DMFS_saveEnabled == true ){	
		$gameSystem.drill_DMFS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DMFS_initSysData();
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
Game_System.prototype.drill_DMFS_initSysData = function() {
	this.drill_DMFS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DMFS_checkSysData = function() {
	this.drill_DMFS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DMFS_initSysData_Private = function() {

	this._drill_DMFS_fastSkipEnabled = DrillUp.g_DMFS_fastSkipEnabled;
	this._drill_DMFS_fastSkipKey = DrillUp.g_DMFS_fastSkipKey;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DMFS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DMFS_fastSkipKey == undefined ){
		this.drill_DMFS_initSysData();
	}

};



//=============================================================================
// ** ☆对话加速键
//
//			说明：	> 此模块专门 监听、控制 对话加速键。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//=============================
// * 对话加速键 - 条件判定
//=============================
Window_Message.prototype.drill_DMFS_isFastSkip = function() {
	
	// > 按键开关
	if( $gameSystem._drill_DMFS_fastSkipEnabled != true ){ return false; }
	
	// > 逻辑按键条件
	return Input.isPressed( $gameSystem._drill_DMFS_fastSkipKey );
}
//=============================
// * 对话加速键 - 帧刷新输入
//=============================
var _drill_DMFS_msg_updateInput = Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if( this.pause && this.drill_DMFS_isFastSkip() ){
		if( !this._textState ){
			this.pause = false;
			this.terminateMessage();
		}
    }
	return _drill_DMFS_msg_updateInput.call(this);
}
//=============================
// * 对话加速键 - 强制快速显示
//=============================
var _drill_DMFS_msg_updateShowFast = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if( this.drill_DMFS_isFastSkip() ){
		this._showFast = true;	//开启瞬间显示（此参数为 Window_Message 的内部参数）
	}
	_drill_DMFS_msg_updateShowFast.call(this);
}
//=============================
// * 对话加速键 - 禁止等待
//=============================
var _drill_DMFS_msg_updateWait = Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if( this.drill_DMFS_isFastSkip() ){
		return false;
	}
	return _drill_DMFS_msg_updateWait.call(this);
}
//=============================
// * 对话加速键 - 等待时间归零
//=============================
var _drill_DMFS_msg_startWait = Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function( count ){
	_drill_DMFS_msg_startWait.call( this, count );
    if( this.drill_DMFS_isFastSkip() ){
		this._waitCount = 0;
	}
}
//=============================
// * 对话加速键 - 跳过 等待按键输入字符 的功能
//=============================
var _drill_DMFS_msg_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function( code, textState ){
	if( code == "!" && this.drill_DMFS_isFastSkip() ){
		this.startPause();
		return;
	}
	_drill_DMFS_msg_processEscapeCharacter.call( this, code, textState );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogMessageFastSkip = false;
		var pluginTip = DrillUp.drill_DMFS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

