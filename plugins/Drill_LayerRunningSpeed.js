//=============================================================================
// Drill_LayerRunningSpeed.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        地图 - 长按加速控制
 * @author Drill_up
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_LayerRunningSpeed +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 地图界面中默认自带长按加速，你可以对该功能进行控制修改。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   作用于界面运行监听。
 * 细节：
 *   (1.在地图界面中进行事件对话时，长按可以加速所有事件执行。
 *      为二倍速执行。
 *   (2.你可以通过插件指令 开启/关闭 长按加速功能。
 *      加速后，声音的速度并不会变，变化的只是地图事件处理的速度。
 * 性能：
 *   (1.注意，该插件虽然只轻微改改配置，但是修改的影响类似于变速齿轮。
 *      如果开了五倍速，整体消耗会增加，最坏情况会达到五倍消耗。
 *   (2.如果你要开多倍加速功能，尽可能让玩家在事件少的地图中开启。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制加速设置：
 * 
 * 插件指令：>长按加速控制 : 开启
 * 插件指令：>长按加速控制 : 关闭
 * 插件指令：>长按加速控制 : 设置倍速 : 二倍速
 * 插件指令：>长按加速控制 : 设置倍速 : 三倍速
 * 插件指令：>长按加速控制 : 设置倍速 : 四倍速
 * 插件指令：>长按加速控制 : 设置倍速 : 五倍速
 *
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 工作类型：   倍率持续
 * 时间复杂度： o(n)*o(游戏整体运行速度)
 * 测试方法：   无
 * 测试结果：   无
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件虽然只轻微改改配置，但是修改的影响类似于变速齿轮。
 *   如果开了五倍速，整体消耗可能会乘以五倍。
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
 * 
 * @param 长按加速开关
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 长按倍速
 * @type select
 * @option 二倍速
 * @value 二倍速
 * @option 三倍速
 * @value 三倍速
 * @option 四倍速
 * @value 四倍速
 * @option 五倍速
 * @value 五倍速
 * @desc 注意，加速后，声音的速度并不会变，变化的只是地图事件处理的速度。
 * @default 二倍速
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LRS（Layer_Running_Speed）
//		临时全局变量	DrillUp.g_LRS_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_LRS_xxx
//		全局存储变量	无
//		覆盖重写方法	Scene_Map.prototype.isFastForward
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		无法确定
//		★性能测试因素	无
//		★性能测试消耗	无法测试
//		★最坏情况		该插件可能造成指数型上升消耗，具体看装载的其他插件。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			长按加速控制：
//				->功能设置
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
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerRunningSpeed = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerRunningSpeed');
	
	/*-----------------杂项------------------*/
	DrillUp.g_LRS_enabled = String(DrillUp.parameters["长按加速开关"] || "true") == "true"; 
	DrillUp.g_LRS_type = String(DrillUp.parameters["长按倍速"] || "二倍速"); 
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LRS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LRS_pluginCommand.call(this, command, args);
	if( command === ">长按加速控制" ){
		if( args.length == 2 ){				//>长按加速控制 : 开启
			var type = String(args[1]);
			if( type == "开启" ){
				$gameSystem._drill_LRS_enabled = true;
			}
			if( type == "关闭" ){
				$gameSystem._drill_LRS_enabled = false;
			}
		}
		if( args.length == 4 ){				//>长按加速控制 : 设置倍速 : 二倍速
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "设置倍速" ){
				if( temp1 == "二倍速" || temp1 == "三倍速" || temp1 == "四倍速" || temp1 == "五倍速" ){
					$gameSystem._drill_LRS_type = temp1;
				}
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_LRS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LRS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LRS_sys_initialize.call(this);
	this.drill_LRS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LRS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LRS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LRS_saveEnabled == true ){	
		$gameSystem.drill_LRS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LRS_initSysData();
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
Game_System.prototype.drill_LRS_initSysData = function() {
	this.drill_LRS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LRS_checkSysData = function() {
	this.drill_LRS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LRS_initSysData_Private = function() {
	
	this._drill_LRS_enabled = DrillUp.g_LRS_enabled;
	this._drill_LRS_type = DrillUp.g_LRS_type;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LRS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LRS_enabled == undefined ){
		this.drill_LRS_initSysData();
	}
	
};


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图界面 - 执行运行
//==============================
var _drill_LRS_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
Scene_Map.prototype.updateMainMultiply = function() {
	_drill_LRS_updateMainMultiply.call( this );
	
    if( this.isFastForward() && $gameSystem._drill_LRS_type == "三倍速" ){
        this.updateMain();
    }
    if( this.isFastForward() && $gameSystem._drill_LRS_type == "四倍速" ){
        this.updateMain();
        this.updateMain();
    }
    if( this.isFastForward() && $gameSystem._drill_LRS_type == "五倍速" ){
        this.updateMain();
        this.updateMain();
        this.updateMain();
    }
}
//==============================
// * 地图界面 - 加速运行条件
//==============================
var _drill_LRS_isFastForward = Scene_Map.prototype.isFastForward;
Scene_Map.prototype.isFastForward = function() {
	if( $gameSystem._drill_LRS_enabled == false ){ return false; }
	return _drill_LRS_isFastForward.call(this);
};


