//=============================================================================
// Drill_Jump.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        互动 - 跳跃能力
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_Jump +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得控制台能够控制玩家的跳跃。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于跳跃插件才能运行。
 * 基于：
 *   - Drill_EventJump            物体-事件跳跃
 *     需要该插件才能执行普通跳跃。
 * 被扩展：
 *   - Drill_OperateHud           鼠标-鼠标辅助操作面板
 *     该插件提供鼠标、触碰辅助控制跳跃的支持。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对玩家有效。
 * 2.更多详细的介绍，去看看 "10.互动 > 关于跳跃能力.docx"。
 * 基础设置:
 *   (1.该插件可以使得控制台能够控制玩家的跳跃。
 *      且控制的跳跃均为只能向前的普通跳跃。
 *   (2.悬崖高度、禁止跳跃区、普通跳跃等概念见基础插件，这里不再赘述。
 * 跳跃能力:
 *   (1.载具不能跳跃。
 *   (2.跳跃过程中可以扔花盆。
 *   (3.跳跃过程中可以放置炸弹，并且放的是玩家当前位置的正下方。
 *   (4.鼠标长按可以自动跳跃。
 * 跳跃触发事件:
 *   (1.玩家的跳跃会触发扫过的事件的独立开关。
 *      如果同时扫过了多个事件，则事件执行的先后顺序由事件id大小决定。
 * 设计:
 *   (1.你可以用跳跃触发事件的功能，制作解谜中必须跳起才能弄破的泡泡。
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 键盘、手柄
 * 键盘 - "Q"键跳跃
 * 手柄 - "LB"键跳跃
 *
 * -----------------------------------------------------------------------------
 * ----知识点 - 鼠标、触屏
 * 鼠标 - 鼠标双击跳跃，或者长按，在不能移动的地方自动跳跃。
 * 触屏 - 双触碰跳跃，或者长触碰，在不能移动的地方自动跳跃。
 *
 * 单独可以支持，也可以通过 Drill_OperateHud 鼠标辅助操作面板 获得辅助支持。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 跳跃能力
 * 你可以通过插件指令设置调整角色的跳跃能力：
 * （注意，冒号左右有两个空格）
 * 
 * 插件指令：>玩家跳跃 : 开启能力
 * 插件指令：>玩家跳跃 : 关闭能力
 * 插件指令：>玩家跳跃 : 修改属性-跳跃距离 : 图块距离[2]
 * 插件指令：>玩家跳跃 : 修改属性-跳跃延迟 : 时间[60]
 *
 * 1.距离和延迟最小为0，0距离只能原地跳，0延迟可以无限跳。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>角色跳跃开启
 * 插件指令(旧)：>角色跳跃关闭
 * 插件指令(旧)：>角色跳跃 : 设置距离 : 2
 * 插件指令(旧)：>角色跳跃 : 设置延迟 : 60
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 跳跃触发事件
 * 如果你需要设置某些必须跳跃才能触发的开关，使用下面事件注释：
 * （注意，冒号左右有两个空格）
 * 
 * 事件注释：=>玩家跳跃 : 跳跃触发独立开关 : A
 * 事件注释：=>玩家跳跃 : 跳跃触发开关 : 开关[1]
 *
 * 1.注意，必须是玩家跳跃时，掠过的事件，才会被触发。
 * 2."跳跃触发独立开关"为事件的独立开关。
 *   "跳跃触发开关"为开关变量。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   去各个管理层进行跳跃测试。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.跳跃能力在不同管理层的消耗量大致相似，在3ms与5ms之间，毕竟
 *   该插件只作用于玩家。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了跳跃识别障碍物的一些bug。
 * [v1.2]
 * 修正了跳跃能力控制，添加了禁止跳跃区域以及跳跃触发开关功能。
 * [v1.3]
 * 修改了插件分类。
 * [v1.4]
 * 修改了插件指令，添加了插件性能测试说明。
 * 分离了插件的功能，使得事件也可以进行普通跳跃。
 * [v1.5]
 * 优化了跳跃的一些设定细节。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ---常规---
 * @default 
 * 
 * @param 初始是否开启跳跃能力
 * @parent ---常规---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 跳跃音效
 * @parent ---常规---
 * @desc 跳跃时，播放的音效。
 * @require 1
 * @dir audio/se/
 * @type file
 * @default Jump1
 *
 * @param 跳跃距离
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 跳跃到目的地的距离长度，单位图块。0表示只能原地跳跃。
 * @default 2
 *
 * @param 跳跃延迟
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 跳跃后，下次跳跃需要等待的时间，单位帧。（1秒60帧）
 * @default 60
 * 
 * @param ---扩展设定---
 * @default 
 * 
 * @param 奔跑时跳跃距离+1
 * @parent ---扩展设定---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		jump（不需要简称）
//		临时全局变量	DrillUp.g_jump_xxx
//		临时局部变量	this._drill_jump_xxx
//		存储数据变量	$gameSystem._drill_jump_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	乱跑
//		★性能测试消耗	镜像管理层3.74ms，体积管理层4.97ms
//		★最坏情况		未知
//		★备注			该跳跃插件只有玩家一个人，消耗不大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			跳跃能力：
//				->适应性
//					->移动到目的地后跳跃，暂时禁用目的地，防止跳跃后回撤
//					->奔跑时跳跃距离+1
//				->跳跃距离判定
//				->跳跃触发事件
//
//		★必要注意事项：
//			1.互动之间如果有较复杂的接口，必须遵循下面的格式：
//				drill_canXxxx_Normal()			静态约束条件（无提示音）
//				drill_canXxxx_Conditional()		外力限制条件（有提示音）
//				drill_doXxxx()					执行操作
//				drill_isXxxxControl()			键盘按键条件
//			  面板通过上述四个接口 主动调用 能力插件中的函数。
//
//		★其它说明细节：
//			1.该插件根据跳跃能力添加了多重判断，会出现好几个函数分别往下降层级描述的复合情况。
//			2.跳跃流程： 跳跃基本条件 >> 跳跃按钮触发 >>（ 禁止跳跃情况 >> 跳跃位置识别）
//			  跳跃基本条件相当于 显示与隐藏，未达到条件，跳跃触发无效。
//			  禁止跳跃情况相当于 可用与不可用，禁止时触发跳跃，就会发出错误声音。
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_Jump = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_Jump');


	/*-----------------杂项------------------*/
	DrillUp.g_jump_enable = String(DrillUp.parameters['初始是否开启跳跃能力'] || "true") === "true";
	DrillUp.g_jump_mouse = false;
	DrillUp.g_jump_delay = Number(DrillUp.parameters['跳跃延迟'] || 60);
	DrillUp.g_jump_distance = Number(DrillUp.parameters['跳跃距离'] || 2);
	DrillUp.g_jump_se = String(DrillUp.parameters['跳跃音效']);
	DrillUp.g_jump_dashDistance = String(DrillUp.parameters['奔跑时跳跃距离+1'] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventJump ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_jump_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args ){
	_drill_jump_pluginCommand.call(this,command, args);
	
	/*-----------------玩家跳跃------------------*/
	if( command === ">玩家跳跃" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "开启能力" ){
				$gameSystem._drill_jump_enable = true;
			}
			if( type == "关闭能力" || type == "禁用能力" ){
				$gameSystem._drill_jump_enable = false;
			}
		}
		if(args.length == 4){
			var temp1 = String(args[3]);
			var type = String(args[1]);
			if( type == "设置距离" || type == "修改属性-跳跃距离" ){
				temp1 = temp1.replace("图块距离[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_jump_distance = Math.max( Number(temp1),0 );
			}
			if( type == "设置延迟" || type == "修改属性-跳跃延迟" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_jump_delay = Math.max( Number(temp1),0 );
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">角色跳跃开启" ){ $gameSystem._drill_jump_enable = true;};
	if( command === ">角色跳跃关闭" ){ $gameSystem._drill_jump_enable = false;};
	if( command === ">角色跳跃" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "设置距离" ){
				$gameSystem._drill_jump_distance = Math.max(temp1,0);
			}
			if( type == "设置延迟" ){
				$gameSystem._drill_jump_delay = Math.max(temp1,0);
			}
		}
	}
};

//=============================================================================
// ** 鼠标长按触发跳跃
//=============================================================================
//==============================
// * 鼠标点击 - 初始化
//==============================
var _drill_jump_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function( ){
    _drill_jump_temp_initialize.call(this);
	this._drill_jump_dest_push = true;				//目的地取消标记-锁
	this._drill_jump_dest_count = 0;				//目的地取消次数
	this._drill_jump_dest_timer = 0;				//长按间隔
	this._drill_jump_mouse_forbiddenTimer = 0;		//目的地禁用时间
};
//==============================
// * 鼠标点击 - 点击位置
//==============================
var _drill_jump_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function( x, y ){
	
	// > 禁用目的地情况
	if( this._drill_jump_mouse_forbiddenTimer > 0 ){	
		return;
	}
	
	_drill_jump_setDestination.call(this,x,y);
	
	// > 目的地取消标记-锁（被取消移动，或者没有移动，只会被捕获一次）
	if( this._drill_jump_dest_push ){	
		this._drill_jump_dest_push = false;
	}
};
//==============================
// * 鼠标点击 - 消除位置
//==============================
var _drill_jump_clearDestination = Game_Temp.prototype.clearDestination;
Game_Temp.prototype.clearDestination = function( ){
	_drill_jump_clearDestination.call(this);
	if(!this._drill_jump_dest_push){
		this._drill_jump_dest_push = true;
		
		this._drill_jump_dest_count += 1;			//目的地取消次数+1
		this._drill_jump_dest_timer = 0;
		if( this._drill_jump_dest_count >= 2 ){		//长按鼠标计数器
			this._drill_jump_dest_count = 0;
			DrillUp.g_jump_mouse = true;
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
DrillUp.g_jump_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_jump_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_jump_sys_initialize.call(this);
	this.drill_jump_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_jump_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_jump_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_jump_saveEnabled == true ){	
		$gameSystem.drill_jump_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_jump_initSysData();
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
Game_System.prototype.drill_jump_initSysData = function() {
	this.drill_jump_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_jump_checkSysData = function() {
	this.drill_jump_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_jump_initSysData_Private = function() {
	
	this._drill_jump_enable = DrillUp.g_jump_enable;
	this._drill_jump_delay = DrillUp.g_jump_delay;
	this._drill_jump_distance = DrillUp.g_jump_distance;
	this._drill_jump_se = DrillUp.g_jump_se;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_jump_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_jump_enable == undefined ){
		this.drill_jump_initSysData();
	}
	
};

//==============================
// * 玩家 - 能力初始化
// *（Game_Player初始化时，$gameSystem已载入存储数据。）
//==============================
var _drill_jump_p_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function( ){
	_drill_jump_p_initialize.call(this);
	this._drill_jump_delay_time = 0;				//跳跃延迟时间
};
//==============================
// * 玩家 - 帧刷新
//==============================
var _drill_jump_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive ){
	_drill_jump_player_update.call(this,sceneActive);
	
	// > 跳跃延迟时间
	this._drill_jump_delay_time += 1;
	
	// > 目的地长按间隔
	$gameTemp._drill_jump_dest_timer += 1;
	if( $gameTemp._drill_jump_dest_timer >= 18 ){	//（间隔过长的两次鼠标点击，不会跳）
		$gameTemp._drill_jump_dest_timer = 0;
		$gameTemp._drill_jump_dest_count = 0;
		DrillUp.g_jump_mouse = false;
	}
	
	// > 目的地禁用时间
	$gameTemp._drill_jump_mouse_forbiddenTimer -= 1;
}
//==============================
// * 玩家 - 按键控制
//==============================
var _drill_jump_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function( ){
	
    if(  this.drill_canJump_Normal() ){ 			//基本跳跃条件
		if( this.drill_isJumpControl() ){			//跳跃按钮按下
			this._drill_jump_delay_time = 0;		//消耗一次跳跃机会，防止不停触发
			if( this.drill_canJump_Conditional() ){	//限制跳跃条件
				this.drill_doJump();	
			}else{
				SoundManager.playBuzzer();
			}	
		}
	}
	_drill_jump_moveByInput.call(this);	
};

//==============================
// * 跳跃 - 键盘按键条件
//==============================
Game_Player.prototype.drill_isJumpControl = function( ){
	//Q键 + 长按鼠标
	return Input.isPressed('pageup') || DrillUp.g_jump_mouse;
}
//==============================
// * 跳跃 - 静态约束条件
//				
//			程序执行流程中，必须禁止该能力的条件，一般不播放错误音。
//==============================
Game_Player.prototype.drill_canJump_Normal = function( ){
	if( this.isJumping() ){return false};						//跳跃时
	if( !this.canMove() ){return false};						//无法移动时
	if( this._drill_jump_delay_time <= $gameSystem._drill_jump_delay){return false};	//跳跃间隔未结束
	return true;
}
//==============================
// * 跳跃 - 外力限制条件
//				
//			由能力关闭、封印、数量限制等因素造成的，一般会播放错误提示音。
//==============================
Game_Player.prototype.drill_canJump_Conditional = function( ){
	if( this.isInVehicle() ){return false};						//载具中禁止跳跃
	if( this.drill_EJu_isInJumpForbiddenArea() ){return false};	//跳跃禁区禁止跳跃
	if( !$gameSystem._drill_jump_enable ){return false};		//关闭跳跃能力，禁止跳跃
	return true;
}

//==============================
// * 跳跃 - 执行操作
//==============================
Game_Player.prototype.drill_doJump = function( ){
	
	// > 数据赋值
	this._drill_EJu_jump['distance'] = $gameSystem._drill_jump_distance;
	this._drill_EJu_jump['sound'] = $gameSystem._drill_jump_se;
	
	// > 移动到目的地后跳跃，暂时禁用目的地，防止跳跃后回撤
	if( this._x == $gameTemp.destinationX() &&
		this._y == $gameTemp.destinationY() ){
		$gameTemp.clearDestination();
		$gameTemp._drill_jump_mouse_forbiddenTimer = 60;
	}
	
	// > 奔跑时跳跃距离+1
	if( DrillUp.g_jump_dashDistance && this.isDashing() ){
		this._drill_EJu_jump['distance'] += 1;
	}
	
	// > 执行普通跳跃
	this.drill_EJu_commonJump();
	
}



//=============================================================================
// ** 跳跃触发事件
//=============================================================================
//==============================
// * 跳跃触发 - 注释初始化
//==============================
var _drill_jump_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function( ){
	_drill_jump_event_setupPage.call(this);
    this.drill_jump_setJumpTrigger();
};
Game_Event.prototype.drill_jump_setJumpTrigger = function( ){
	this._drill_jump_trigger = false;		//是否含触发
	if( !this._erased && this.page() ){this.list().forEach(function(l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>角色跳跃" || command == "=>玩家跳跃" ){
				var type = String(args[1]);
				var temp1 = String(args[3]);
				if( type == "跳跃触发独立开关" ){
					this._drill_jump_trigger = true;
					this._drill_jump_trigger_self_switch = temp1;
				}
				if( type == "跳跃触发开关" ){
					temp1 = temp1.replace("开关[","");
					temp1 = temp1.replace("]","");
					this._drill_jump_trigger = true;
					this._drill_jump_trigger_var_switch = Number(temp1);
				}
			};
		};
	}, this);};
};
//==============================
// * 跳跃触发 - 接触触发
//==============================
var _drill_jump_p_jumpTouch = Game_Player.prototype.drill_EJu_jumpTouch;
Game_Player.prototype.drill_EJu_jumpTouch = function( x, y  ){
	_drill_jump_p_jumpTouch.call(this, x, y);		//继承事件跳跃的 接触函数
	
	var events = $gameMap.eventsXy(x,y);
	for(var i=0; i < events.length; i++){
		if(  events[i]._drill_jump_trigger == true ){
			if( events[i]._drill_jump_trigger_self_switch != undefined ){
				var key = [events[i]._mapId, events[i]._eventId, events[i]._drill_jump_trigger_self_switch ];
				$gameSelfSwitches.setValue(key,true);
			}
			if( events[i]._drill_jump_trigger_var_switch != undefined ){
				$gameSwitches.setValue( Number(events[i]._drill_jump_trigger_var_switch),true );
			}
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_Jump = false;
		alert(
			"【Drill_Jump.js 互动 - 跳跃能力】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventJump 物体-事件跳跃"
		);
}


