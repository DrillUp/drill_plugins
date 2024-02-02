//=============================================================================
// Drill_PlayerAllowTouchNonstop.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 允许鼠标寻路不停止
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerAllowTouchNonstop +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件可以使得鼠标寻路时不被经过的简单事件停住。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_PlayerAllowMove      互动-允许操作玩家移动
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、事件指令的移动路线设置。
 * 细节：
 *   (1.鼠标单击某一个地方，如果中途触发了某个事件，玩家就会停下来。
 *      该插件可以使得玩家不停走动。（比如一路捡钱，不停止走动。）
 *      如果遇到对话框或者阻止角色移动的事件，玩家还是会停止走动的。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>允许鼠标寻路不停止 : 开启
 * 插件指令：>允许鼠标寻路不停止 : 关闭
 * 
 * 1.插件指令修改后永久有效。
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
 * 测试方法：   去允许操作管理层进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只在单次判定时执行。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * @param 初始是否允许
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		PAlTN (Player_Allow_Touch_Nonstop)
//		临时全局变量	DrillUp.g_PAlTN_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	允许操作管理层
//		★性能测试消耗	0.1ms（drill_PAlTN_isPlayerRefuse）
//		★最坏情况		无
//		★备注			无
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
//			->☆寻路不停止
//				->YEP兼容
//				->事件执行时 是否拒绝
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			10.互动 > 关于允许操作（脚本）.docx
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
	DrillUp.g_PAlTN_PluginTip_curName = "Drill_PlayerAllowTouchNonstop.js 互动-允许鼠标寻路不停止";
	DrillUp.g_PAlTN_PluginTip_baseList = [ "Drill_PlayerAllowMove.js 互动-允许操作玩家移动" ];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PAlTN_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PAlTN_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PAlTN_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PAlTN_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PAlTN_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 兼容冲突
	//==============================
	DrillUp.drill_PAlTN_getPluginTip_CompatibilityTDDP = function(){
		return  "【" + DrillUp.g_PAlTN_PluginTip_curName + "】\n"+
				"检测到你开启了 TDDP_PlayerTouchPassage插件。\n"+
				"请及时关闭该插件，该插件与 允许鼠标寻路不停止 存在兼容冲突。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PlayerAllowTouchNonstop = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PlayerAllowTouchNonstop');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PAlTN_enabled = String(DrillUp.parameters["初始是否允许"] || "true") == "true"; 
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_PlayerAllowMove ){
	
//=============================================================================
// ** 启动时校验
//=============================================================================
var _drill_PAlTN_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_PAlTN_scene_initialize.call(this);
	
	if( Imported.TDDP_PlayerTouchPassage ){
		alert( DrillUp.drill_PAlTN_getPluginTip_CompatibilityTDDP() );
	}
};

	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PAlTN_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PAlTN_pluginCommand.call(this, command, args);
	if( command === ">允许鼠标寻路不停止" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
				$gameSystem._drill_PAlTN_enabled = true;
			}
			if( type == "关闭" || type == "禁用" ){
				$gameSystem._drill_PAlTN_enabled = false;
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
DrillUp.g_PAlTN_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlTN_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PAlTN_sys_initialize.call(this);
	this.drill_PAlTN_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlTN_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PAlTN_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PAlTN_saveEnabled == true ){	
		$gameSystem.drill_PAlTN_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PAlTN_initSysData();
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
Game_System.prototype.drill_PAlTN_initSysData = function() {
	this.drill_PAlTN_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PAlTN_checkSysData = function() {
	this.drill_PAlTN_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PAlTN_initSysData_Private = function() {
	
	this._drill_PAlTN_enabled = DrillUp.g_PAlTN_enabled;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PAlTN_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PAlTN_enabled == undefined ){
		this.drill_PAlTN_initSysData();
	}
};
	
	
//=============================================================================
// ** ☆寻路不停止
//
//			说明：	> 此模块专门提供 寻路不停止 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 寻路不停止 - 是否允许操作移动 - 事件条件（继承）
//==============================
var _drill_PAlTN_canMoveCondition_Event = Game_Player.prototype.drill_PAlM_canMoveCondition_Event;
Game_Player.prototype.drill_PAlM_canMoveCondition_Event = function() {
	if( $gameSystem._drill_PAlTN_enabled == true ){ return true };	//跳过此判定
	return _drill_PAlTN_canMoveCondition_Event.call(this);
}
//==============================
// * 寻路不停止 - 移动判断绑定
//==============================
var _drill_PAlTN_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	
	if( $gameSystem._drill_PAlTN_enabled == true ){
		
		// > 事件条件 - 出现对话框时，不阻止移动
		if( $gameMessage.isBusy() ){ return false; }
		
		// > YEP兼容
		if( Imported.YEP_RegionEvents ){
			if( $gameMap.isEventRunning() && $gameMap.moveAfterCommonEvent() ){ return true; }
		}
		
		// > 事件条件 - 事件执行时
		if( $gameMap.isEventRunning() ){
			if( this.drill_PAlTN_isPlayerRefuse() ){ return false; }
		}
		
		// > 其他情况默认
		return _drill_PAlTN_canMove.call(this);
	}
	
	// > 原函数
	return _drill_PAlTN_canMove.call(this);
}
//==============================
// * 寻路不停止 - 事件执行时 是否拒绝
//
//			说明：	> 返回false则允许，返回true则拒绝。
//					> 此处根据 解释器的指令 来重新判断玩家移动是否会被拒绝。
//==============================
Game_Player.prototype.drill_PAlTN_isPlayerRefuse = function(){
	if( $gameMap == undefined ){ return false; }
	if( $gameMap._interpreter == undefined ){ return false; }
	if( $gameMap._interpreter._list == undefined ){ return false; }
	var list = $gameMap._interpreter._list;
	var e_id = $gameMap._interpreter._eventId;
	var e = $gameMap.event(e_id);
	if( e == undefined ){ return false; }		//空事件，跳过
	if( e._erased == true ){ return false; }	//已销毁的事件，跳过
	
	if( e._trigger == 0 ){ return true; }		//触发条件 - 确定键，拒绝
	if( e._trigger == 1 ){ }					//触发条件 - 玩家接触，继续判断
	if( e._trigger == 2 ){ }					//触发条件 - 事件接触，继续判断
	if( e._trigger == 3 ){ return true; }		//触发条件 - 自动执行，拒绝
	if( e._trigger == 4 ){ return true; }		//触发条件 - 并行执行，拒绝
	
	if( e.isThrough() == false && e._priorityType == 0 ){ }					//地面的，继续判断
	if( e.isThrough() == false && e._priorityType == 1 ){ return true; }	//同阶，拒绝
	if( e.isThrough() == false && e._priorityType == 2 ){ return true; }	//飞行的，拒绝
	
	// > 拒绝移动的指令
	for(var i = 0; i < list.length; i++ ){
		var command = list[i];
		if( command.code == 201 ){ return true; }		//指令 - 【移动 > 场所移动】
		if( command.code == 205 ){ return true; }		//指令 - 【移动 > 设置移动路线】
		if( command.code == 230 ){ return true; }		//指令 - 【计时 > 等待】
		if( command.code == 232 ){ return true; }		//指令 - 【图片 > 移动图片】（因为有等待）
		if( command.code == 261 ){ return true; }		//指令 - 【音频&视频 > 播放影像】
		if( command.code == 301 ){ return true; }		//指令 - 【场景控制 > 战斗处理】
	}
	
	// > 其余的情况，放行
	return false;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PlayerAllowTouchNonstop = false;
		var pluginTip = DrillUp.drill_PAlTN_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

