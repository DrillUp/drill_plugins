//=============================================================================
// Drill_PlayerAllowMove.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 允许操作玩家移动
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerAllowMove +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供一种权限，权限能控制 是否允许 操作玩家的移动。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于玩家。
 * 2.详细去看看文档："10.互动 > 关于允许操作移动.docx"。
 * 细节：
 *   (1.操作玩家移动：指通过 键盘/手柄/鼠标/触屏 控制玩家移动的过程。
 *      允许操作玩家移动：指一种权限，权限能控制 是否允许 操作玩家的移动。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>允许操作玩家移动 : 开启
 * 插件指令：>允许操作玩家移动 : 关闭
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
 * 工作类型：   持续执行
 * 时间复杂度： o(n) 每帧
 * 测试方法：   去允许操作管理层进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只管理玩家是否允许移动，所以消耗并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * @param 初始是否允许
 * @type boolean
 * @on 允许
 * @off 不允许
 * @desc true - 允许，false - 不允许
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PAlM (Player_Allow_Move)
//		临时全局变量	DrillUp.g_PAlM_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	允许操作管理层
//		★性能测试消耗	4.6ms（drill_PAlM_canMoveCondition_MoveRoute）
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
//			->☆管辖权
//			->☆插件指令
//			->☆存储数据
//			
//			->☆玩家移动权限
//				->事件条件
//				->移动路线条件
//				->载具条件
//			->☆允许开关
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
//			1.见 管辖权 的注释。
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
	DrillUp.g_PAlM_PluginTip_curName = "Drill_PlayerAllowMove.js 互动-允许操作玩家移动";
	DrillUp.g_PAlM_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 兼容冲突
	//==============================
	DrillUp.drill_PAlM_getPluginTip_CompatibilityTDDP = function(){
		return  "【" + DrillUp.g_PAlM_PluginTip_curName + "】\n"+
				"检测到你开启了 TDDP_PlayerTouchPassage插件。\n"+
				"请及时关闭该插件，该插件与 允许操作玩家移动 存在兼容冲突。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PlayerAllowMove = true;
	var DrillUp = DrillUp || {};
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerAllowMove');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PAlM_enabled = String(DrillUp.parameters["初始是否允许"] || "true") == "true"; 
	
	
//=============================================================================
// ** 启动时校验
//=============================================================================
var _drill_PAlM_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_PAlM_scene_initialize.call(this);
	
	if( Imported.TDDP_PlayerTouchPassage ){
		alert( DrillUp.drill_PAlM_getPluginTip_CompatibilityTDDP() );
	}
};
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 3E按键移动《互动-允许操作玩家移动》 - 帧刷新
//==============================
Game_Player.prototype.moveByInput = function(){
    if( !this.isMoving() && this.canMove() ){
		
		// > 当前若为键盘操作，则 关闭鼠标指向标
        var direction = this.getInputDirection();
        if( direction > 0 ){
            $gameTemp.clearDestination();
		
		// > 当前若为鼠标操作，则设定位置
        }else if( $gameTemp.isDestinationValid() ){
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);		//2C自动寻迹
        }
		
		// > 执行移动
        if( direction > 0 ){
            this.executeMove(direction);
        }
    }
};
//==============================
// * 3E按键移动《互动-允许操作玩家移动》 - 是否允许操作移动
//==============================
Game_Player.prototype.canMove = function(){
    if( $gameMap.isEventRunning() || $gameMessage.isBusy() ){
        return false;
    }
    if( this.isMoveRouteForcing() || this.areFollowersGathering() ){
        return false;
    }
    if( this._vehicleGettingOn || this._vehicleGettingOff ){
        return false;
    }
    if( this.isInVehicle() && !this.vehicle().canMove() ){
        return false;
    }
    return true;
};
//==============================
// * 3E按键移动《互动-允许操作玩家移动》 - 获取按键方向
//==============================
Game_Player.prototype.getInputDirection = function(){
    return Input.dir4;
};
//==============================
// * 3E按键移动《互动-允许操作玩家移动》 - 执行移动
//==============================
Game_Player.prototype.executeMove = function( direction ){
    this.moveStraight(direction);
};
*/
/*
	键盘/手柄 的控制函数：
		Game_Player.prototype.getInputDirection（Input.dir4直接就是键盘输出结果）
	鼠标/触屏 的控制函数：
		Scene_Map.prototype.updateDestination（目的地指向标 的功能）
		Scene_Map.prototype.isMapTouchOk
		Scene_Map.prototype.processMapTouch
*/
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PAlM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PAlM_pluginCommand.call(this, command, args);
	this.drill_PAlM_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PAlM_pluginCommand = function( command, args ){
	if( command === ">允许操作玩家移动" ){
		
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
				$gameSystem._drill_PAlM_enabled = true;
			}
			if( temp1 == "关闭" || temp1 == "禁用" ){
				$gameSystem._drill_PAlM_enabled = false;
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
DrillUp.g_PAlM_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlM_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PAlM_sys_initialize.call(this);
	this.drill_PAlM_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlM_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PAlM_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PAlM_saveEnabled == true ){	
		$gameSystem.drill_PAlM_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PAlM_initSysData();
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
Game_System.prototype.drill_PAlM_initSysData = function() {
	this.drill_PAlM_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PAlM_checkSysData = function() {
	this.drill_PAlM_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PAlM_initSysData_Private = function() {
	
	this._drill_PAlM_enabled = DrillUp.g_PAlM_enabled;	//允许开关
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PAlM_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PAlM_enabled == undefined ){
		this.drill_PAlM_initSysData();
	}
};
//==============================
// * 存储数据 - 允许开关（开放函数）
//==============================
Game_System.prototype.drill_PAlM_isPlayerEnabled = function() {
	return this._drill_PAlM_enabled == true;
};
Game_Temp.prototype.drill_PAlM_isPlayerEnabled = function() {
	return $gameSystem._drill_PAlM_enabled == true;
};
	
	
//=============================================================================
// ** ☆玩家移动权限
//
//			说明：	> 此模块专门管理 玩家移动权限（来自 玩家-3E按键移动）的控制功能。
//					> 注意，具体如何移动，该模块不管。
//					> 该模块提供【统一函数】，子插件可以继承并作为 玩家移动权限 的条件。
//					  也就是说，所有用到了 Game_Player.prototype.canMove 的子插件，都要继承此插件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 玩家移动权限 - 是否允许操作移动（覆写）
//==============================
Game_Player.prototype.canMove = function(){
	
	// > 允许移动 - 事件条件
    if( this.drill_PAlM_canMoveCondition_Event() == false ){ return false; }
	
	// > 允许移动 - 移动路线条件
    if( this.drill_PAlM_canMoveCondition_MoveRoute() == false ){ return false; }
	
	// > 允许移动 - 载具条件
    if( this.drill_PAlM_canMoveCondition_Vehicle() == false ){ return false; }
	
    return true;
};
//==============================
// * 玩家移动权限 - 是否允许操作移动 - 事件条件（子插件可继承）
//
//			说明：	> 不允许 则返回false，允许/继续判定 则返回true。
//==============================
Game_Player.prototype.drill_PAlM_canMoveCondition_Event = function(){
	if( $gameMap.isEventRunning() ){ return false; }			//事件在自动执行时，不允许
	if( $gameMessage.isBusy() ){ return false; }				//出现对话框时，不允许
	return true;
};
//==============================
// * 玩家移动权限 - 是否允许操作移动 - 移动路线条件（子插件可继承）
//
//			说明：	> 不允许 则返回false，允许/继续判定 则返回true。
//==============================
Game_Player.prototype.drill_PAlM_canMoveCondition_MoveRoute = function(){
	if( this.isMoveRouteForcing() ){ return false; }			//强制移动时，不允许
	if( this.areFollowersGathering() ){ return false; }			//集合队伍时，不允许
	return true;
};
//==============================
// * 玩家移动权限 - 是否允许操作移动 - 载具条件（子插件可继承）
//
//			说明：	> 不允许 则返回false，允许/继续判定 则返回true。
//==============================
Game_Player.prototype.drill_PAlM_canMoveCondition_Vehicle = function(){
	if( this._vehicleGettingOn  == true ){ return false; }		//上载具时，不允许
	if( this._vehicleGettingOff == true ){ return false; }		//下载具时，不允许
	
    if( this.isInVehicle() && 									//在载具中且载具不能移动时，不允许
		this.vehicle().canMove() == false ){ return false; }	//
	
	return true;
};


//=============================================================================
// ** ☆允许开关
//
//			说明：	> 此模块实现 允许开关 的功能。主开关，关了就绝对 不允许 移动。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 允许开关 - 允许玩家移动（继承）
//
//			说明：	> 注意，这个函数不能放在前面，因为前面的函数 覆写 了。
//==============================
var _drill_PAlM_enabled_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function(){
	if( $gameSystem._drill_PAlM_enabled == false ){ return false; }	//（开关关闭，则不允许）
	return _drill_PAlM_enabled_canMove.call(this);
};
//==============================
// * 允许开关 - 3G串行触发事件 - 暂停移动时（非帧刷新，继承）
//==============================
var _drill_PAlM_enabled_updateNonmoving = Game_Player.prototype.updateNonmoving;
Game_Player.prototype.updateNonmoving = function( wasMoving ){
	if( $gameSystem._drill_PAlM_enabled == false ){ return; }		//（开关关闭，则关闭 3G串行触发事件 ）
	_drill_PAlM_enabled_updateNonmoving.call( this, wasMoving );
};
	
	
	