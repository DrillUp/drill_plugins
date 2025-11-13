//=============================================================================
// Drill_PlayerAllowTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 允许操作玩家触发
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerAllowTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供一种权限，权限能控制 是否允许 操作玩家的触发。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于玩家。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 *   详细也可以去看看文档："10.互动 > 关于允许操作触发.docx"。
 * 细节：
 *   (1.操作玩家触发：是指通过 确定键、玩家接触、事件接触 三种方式触发
 *      事件指令的过程。玩家 为主动方。
 *      允许操作玩家触发：指一种权限，权限能控制 是否允许 操作玩家的触发。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>允许操作玩家触发 : 开启
 * 插件指令：>允许操作玩家触发 : 关闭
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
 * 2.插件只管理玩家是否允许触发，所以消耗并不多。
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
//		插件简称		PAlT (Player_Allow_Trigger)
//		临时全局变量	DrillUp.g_PAlT_xxx
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
//			->☆管辖权
//			->☆插件指令
//			->☆存储数据
//			
//			->☆玩家触发权限
//				x->事件条件
//				x->移动路线条件
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
	DrillUp.g_PAlT_PluginTip_curName = "Drill_PlayerAllowTrigger.js 互动-允许操作玩家触发";
	DrillUp.g_PAlT_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PlayerAllowTrigger = true;
	var DrillUp = DrillUp || {};
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerAllowTrigger');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PAlT_enabled = String(DrillUp.parameters["初始是否允许"] || "true") == "true"; 
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 是否允许触发
//==============================
Game_Player.prototype.canStartLocalEvents = function(){
    return !this.isInAirship();
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - D对象操作 - 接触触发（继承）
//==============================
Game_Player.prototype.checkEventTriggerTouch = function( x, y ){
    if( this.canStartLocalEvents() ){		//（是否允许触发）
        this.startMapEvent(x, y, [1,2], true);
    }
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 执行触发（绑定start标记）
//
//			说明：	> triggers为数组，主要包含[0,1,2]的判断。（0确定键 1玩家接触 2事件接触 3自动执行 4并行处理）
//					> normal为布尔，判断是否为 与人物相同 的优先级。
//					> 该函数本质上只是绑定一个start标记，真实执行位置见函数Game_Map.prototype.setupStartingMapEvent，该函数根据事件start标记，插入 事件指令 序列。
//==============================
Game_Player.prototype.startMapEvent = function( x, y, triggers, normal ){
    if( !$gameMap.isEventRunning() ){
        $gameMap.eventsXy(x, y).forEach(function( event ){
            if( event.isTriggerIn(triggers) && event.isNormalPriority() === normal ){
                event.start();
            }
        });
    }
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 执行触发 - 脚下位置触发
//==============================
Game_Player.prototype.checkEventTriggerHere = function( triggers ){
    if( this.canStartLocalEvents() ){		//（是否允许触发）
        this.startMapEvent(this.x, this.y, triggers, false);
    }
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 执行触发 - 前方位置触发
//==============================
Game_Player.prototype.checkEventTriggerThere = function( triggers ){
    if( this.canStartLocalEvents() ){		//（是否允许触发）
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, direction);
        var y2 = $gameMap.roundYWithDirection(y1, direction);
        this.startMapEvent(x2, y2, triggers, true);
        if( !$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2) ){
            var x3 = $gameMap.roundXWithDirection(x2, direction);
            var y3 = $gameMap.roundYWithDirection(y2, direction);
            this.startMapEvent(x3, y3, triggers, true);
        }
    }
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 暂停移动时（帧刷新）
//
//			说明：	> 注意，wasMoving为true的时候，表示在 玩家移动然后静止 的那一帧执行。
//					  wasMoving为false的时候，才表示在 帧刷新。
//==============================
Game_Player.prototype.updateNonmoving = function( wasMoving ){
    if( !$gameMap.isEventRunning() ){
		
		// > 移动接触触发（非帧刷新，1玩家接触，2事件接触）
        if( wasMoving ){
            
			$gameParty.onPlayerWalk();	//（队伍-每步时执行）
			
            this.checkEventTriggerHere([1,2]);		//（根据图块给事件绑定start标记）
            if( $gameMap.setupStartingEvent() ){	//（如果有事件成功绑定start标记，那么执行事件）
                return;
            }
        }
		
		// > 静止时触发（帧刷新）
        if( this.triggerAction() ){
            return;
        }
		
		// > 3C遇敌 - 遇敌计数（非帧刷新）
        if( wasMoving ){
            this.updateEncounterCount();
			
		// > 关闭鼠标指向标
		//		（注意，静止时触发 约束了关闭条件，此处要理解起来非常绕）
		//		（其实直接判断 isMovementSucceeded() == false 移动失败就行了，移动失败就关闭指向标）
        }else{
            $gameTemp.clearDestination();
        }
    }
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 静止时触发
//
//			说明：	> 静止时，是指玩家站在原地，然后按一下 键盘/手柄 的触发效果。
//					  或者，鼠标/触屏指向目的后，玩家暂停移动时，执行一次 鼠标/触屏 的触发效果。
//==============================
Game_Player.prototype.triggerAction = function(){
    if( this.canMove() ){
        if( this.triggerButtonAction() ){
            return true;
        }
        if( this.triggerTouchAction() ){
            return true;
        }
    }
    return false;
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 静止时触发（键盘/手柄）
//==============================
Game_Player.prototype.triggerButtonAction = function(){
    if( Input.isTriggered('ok') ){
        if( this.getOnOffVehicle() ){
            return true;
        }
        this.checkEventTriggerHere([0]);		//（根据图块给事件绑定start标记）
        if( $gameMap.setupStartingEvent() ){	//（如果有事件成功绑定start标记，那么执行事件）
            return true;
        }
        this.checkEventTriggerThere([0,1,2]);	//（根据图块给事件绑定start标记）
        if( $gameMap.setupStartingEvent() ){	//（如果有事件成功绑定start标记，那么执行事件）
            return true;
        }
    }
    return false;
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 静止时触发（鼠标/触屏）
//==============================
Game_Player.prototype.triggerTouchAction = function(){
    if( $gameTemp.isDestinationValid() ){
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, direction);
        var y2 = $gameMap.roundYWithDirection(y1, direction);
        var x3 = $gameMap.roundXWithDirection(x2, direction);
        var y3 = $gameMap.roundYWithDirection(y2, direction);
        var destX = $gameTemp.destinationX();
        var destY = $gameTemp.destinationY();
        if( destX === x1 && destY === y1 ){
            return this.triggerTouchActionD1(x1, y1);
        }else if( destX === x2 && destY === y2 ){
            return this.triggerTouchActionD2(x2, y2);
        }else if( destX === x3 && destY === y3 ){
            return this.triggerTouchActionD3(x2, y2);
        }
    }
    return false;
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 静止时触发（鼠标/触屏） - 脚下情况
//==============================
Game_Player.prototype.triggerTouchActionD1 = function( x1, y1 ){
    if( $gameMap.airship().pos(x1, y1) ){
        if( TouchInput.isTriggered() && this.getOnOffVehicle() ){
            return true;
        }
    }
    this.checkEventTriggerHere([0]);		//（根据图块给事件绑定start标记）
    return $gameMap.setupStartingEvent();	//（如果有事件成功绑定start标记，那么执行事件）
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 静止时触发（鼠标/触屏） - 前方一图块情况
//==============================
Game_Player.prototype.triggerTouchActionD2 = function( x2, y2 ){
    if( $gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2) ){
        if( TouchInput.isTriggered() && this.getOnVehicle() ){
            return true;
        }
    }
    if( this.isInBoat() || this.isInShip() ){
        if( TouchInput.isTriggered() && this.getOffVehicle() ){
            return true;
        }
    }
    this.checkEventTriggerThere([0,1,2]);	//（根据图块给事件绑定start标记）
    return $gameMap.setupStartingEvent();	//（如果有事件成功绑定start标记，那么执行事件）
};
//==============================
// * 3G串行触发事件《互动-允许操作玩家触发》 - 静止时触发（鼠标/触屏） - 前方两图块情况（桌子）
//==============================
Game_Player.prototype.triggerTouchActionD3 = function( x2, y2 ){
    if( $gameMap.isCounter(x2, y2) ){
        this.checkEventTriggerThere([0,1,2]);	//（根据图块给事件绑定start标记）
    }											//
    return $gameMap.setupStartingEvent();		//（如果有事件成功绑定start标记，那么执行事件）
};
*/
/*
//==============================
// * 3E串行触发事件《互动-允许操作玩家触发》 - D对象操作 - 接触触发（继承）
//
//			说明：	> 此处为事件激活 触发条件-2事件接触 的功能，其他触发见 玩家-3G串行触发事件。
//==============================
Game_Event.prototype.checkEventTriggerTouch = function( x, y ){
    if( !$gameMap.isEventRunning() ){
        if( this._trigger === 2 && $gamePlayer.pos(x, y) ){
            if( !this.isJumping() && this.isNormalPriority() ){
                this.start();
            }
        }
    }
};
*/
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PAlT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PAlT_pluginCommand.call(this, command, args);
	this.drill_PAlT_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PAlT_pluginCommand = function( command, args ){
	if( command === ">允许操作玩家触发" ){
		
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
				$gameSystem._drill_PAlT_enabled = true;
			}
			if( temp1 == "关闭" || temp1 == "禁用" ){
				$gameSystem._drill_PAlT_enabled = false;
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
DrillUp.g_PAlT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PAlT_sys_initialize.call(this);
	this.drill_PAlT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PAlT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PAlT_saveEnabled == true ){	
		$gameSystem.drill_PAlT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PAlT_initSysData();
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
Game_System.prototype.drill_PAlT_initSysData = function() {
	this.drill_PAlT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PAlT_checkSysData = function() {
	this.drill_PAlT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PAlT_initSysData_Private = function() {
	
	this._drill_PAlT_enabled = DrillUp.g_PAlT_enabled;	//允许开关
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PAlT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PAlT_enabled == undefined ){
		this.drill_PAlT_initSysData();
	}
};
//==============================
// * 存储数据 - 允许开关（开放函数）
//==============================
Game_System.prototype.drill_PAlT_isPlayerEnabled = function() {
	return this._drill_PAlT_enabled == true;
};
Game_Temp.prototype.drill_PAlT_isPlayerEnabled = function() {
	return $gameSystem._drill_PAlT_enabled == true;
};
	
	
//=============================================================================
// ** ☆玩家触发权限
//
//			说明：	> 此模块专门管理 玩家触发权限（来自 3G串行触发事件）的控制功能。
//					> 注意，具体如何触发，该模块不管。
//					> 该模块提供【统一函数】，子插件可以继承并作为 玩家触发权限 的条件。
//					  也就是说，用到了 Game_Player.prototype.canStartLocalEvents 的子插件，都要继承此插件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 玩家触发权限 - 是否允许触发（覆写）
//==============================
Game_Player.prototype.canStartLocalEvents = function(){
	
	// > 允许触发 - 事件条件
	//	（无）
	
	// > 允许触发 - 移动路线条件
	//	（无）
	
	// > 允许触发 - 载具条件
    if( this.drill_PAlT_canTriggerCondition_Vehicle() == false ){ return false; }
	
    return true;
};
//==============================
// * 玩家触发权限 - 是否允许触发 - 载具条件（子插件可继承）
//
//			说明：	> 不允许 则返回false，允许/继续判定 则返回true。
//==============================
Game_Player.prototype.drill_PAlT_canTriggerCondition_Vehicle = function(){
    if( this.isInAirship() == true ){ return false; }	//在飞艇中，不允许
	return true;
};


//=============================================================================
// ** ☆允许开关
//
//			说明：	> 此模块实现 允许开关 的功能。主开关，关了就绝对 不允许 触发。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 允许开关 - 是否允许触发（继承）
//
//			说明：	> 注意，这个函数不能放在前面，因为前面的函数 覆写 了。
//==============================
var _drill_PAlT_enabled_canStartLocalEvents = Game_Player.prototype.canStartLocalEvents;
Game_Player.prototype.canStartLocalEvents = function(){
	if( $gameSystem._drill_PAlT_enabled == false ){ return false; }	//（开关关闭，则不允许）
	return _drill_PAlT_enabled_canStartLocalEvents.call(this);
};
//==============================
// * 允许开关 - 事件接触触发（继承）
//==============================
var _drill_PAlT_enabled_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
Game_Event.prototype.checkEventTriggerTouch = function( x, y ){
	if( $gameSystem._drill_PAlT_enabled == false ){ return false; }	//（开关关闭，则不允许）
	return _drill_PAlT_enabled_checkEventTriggerTouch.call( this, x, y );
};
	
	
	
	