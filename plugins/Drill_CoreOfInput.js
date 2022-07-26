//=============================================================================
// Drill_CoreOfInput.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        系统 - 输入设备核心
 * @author Drill_up、汗先生
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfInput +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 提供输入设备等相关功能操作。鼠标、手柄、键盘、触屏 都是输入设备。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 该插件为基础核心，可以作用于下列插件。
 * 作用于：
 *   - Drill_SecretCode          键盘-秘籍输入器
 *   - Drill_OperateHud          鼠标-鼠标辅助操作面板
 *   - Drill_MiniPlateForEvent   鼠标-事件说明窗口
 *   - Drill_MiniPlateForState   鼠标-状态和buff说明窗口
 *   - Drill_MouseTriggerEvent   鼠标-鼠标触发事件
 *   - Drill_MouseTriggerPicture 鼠标-鼠标触发图片
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   主要改进游戏的输入设备控制，但仅限drill插件，不干扰其他插件。
 * 2.你需要了解基本的按键定义，去看看 "1.系统 > 关于输入设备核心.docx"。
 * 鼠标与触屏:
 *   (1.鼠标有三个键位，左键、中键、右键。而触屏比较特殊，只有一个键位，开
 *      启触屏联动可能会影响多种鼠标键位操作，需要仔细考虑。
 *      按下和释放的联动最好同时为true或false，不然逻辑会乱。
 *   (2.注意，触屏联动不是针对所有rmmv的触屏功能，而是仅限【drill插件】有效。
 *      只有禁用鼠标右键菜单和双指菜单，会影响到rmmv地图界面进入菜单的功能。
 * 键盘与手柄:
 *   (1.物理按键：指真实世界键盘上/手柄上存在的按键，比如z,x,c,v键等。
 *      逻辑按键：指游戏中用于划分特定功能的按键，比如确定键,取消键,跳跃键等。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制部分配置。
 * 
 * 插件指令：>输入设备核心 : 地图鼠标左键移动 : 开启
 * 插件指令：>输入设备核心 : 地图鼠标左键移动 : 关闭
 * 插件指令：>输入设备核心 : 鼠标右键菜单 : 开启
 * 插件指令：>输入设备核心 : 鼠标右键菜单 : 关闭
 * 插件指令：>输入设备核心 : 触屏双指菜单 : 开启
 * 插件指令：>输入设备核心 : 触屏双指菜单 : 关闭
 * 
 * 1.插件指令配置执行后，永久有效，且能够被存储到存档中。
 *   关闭 与 禁用 的意思是一样的。
 * 2.注意，关闭后，一定要设计清楚什么时候恢复开启状态，
 *   如果没有恢复，会造成玩家在游戏中不能操作，属于恶性bug。
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
 * 时间复杂度： o(n)*o(子插件调用次数) 每帧
 * 测试方法：   以正常流程进行游戏，记录三种界面下的消耗。
 * 测试结果：   地图界面，平均消耗为：【24.99ms】
 *              战斗界面，平均消耗为：【41.76ms】
 *              菜单界面，平均消耗为：【26.21ms】
 * 
 * 1.该核心在任何情况下都工作并消耗性能。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.在核心分离前，相同功能插件的消耗为菜单界面【55.27ms】战斗界面【62.38ms】。
 * 3.插件会根据玩家按键情况动态变化计算量，战斗界面按键比较频繁，所以消耗较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了注释说明。
 * [v1.2]
 * 优化了内部接口的结构。
 * [v1.3]
 * 给右键菜单功能添加了插件指令开关。
 * [v1.4]
 * 添加了控制 鼠标左键目的地移动 的功能。
 * [v1.5]
 * 修复了持续按键时，按键暂停的细节bug。
 * 
 * 
 * 
 * @param 键盘双击判定时长
 * @type number
 * @min 4
 * @desc drill插件中，按下第一次键盘按键后，在设置的帧数内再按一次，被判定为双击。(1秒60帧)
 * @default 12
 * 
 * @param 手柄双击判定时长
 * @type number
 * @min 4
 * @desc drill插件中，按下第一次手柄按键后，在设置的帧数内再按一次，被判定为双击。(1秒60帧)
 * @default 12
 * 
 * @param 鼠标双击判定时长
 * @type number
 * @min 4
 * @desc drill插件中，按下第一次鼠标按键后，在设置的帧数内再按一次，被判定为双击。(1秒60帧)
 * @default 12
 *
 * @param ----触屏联动----
 * @default 
 * 
 * @param 触屏按下>>鼠标左键按下
 * @parent ----触屏联动----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏按下能触发 drill插件中 鼠标左键按下功能。
 * @default false
 * 
 * @param 触屏按下>>鼠标中键按下
 * @parent ----触屏联动----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏按下能触发 drill插件中 鼠标中键按下功能。
 * @default true
 * 
 * @param 触屏按下>>鼠标右键按下
 * @parent ----触屏联动----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏按下能触发 drill插件中 鼠标右键按下功能。
 * @default true
 * 
 * @param 触屏释放>>鼠标左键释放
 * @parent ----触屏联动----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏释放能触发 drill插件中 鼠标左键释放功能。
 * @default false
 * 
 * @param 触屏释放>>鼠标中键释放
 * @parent ----触屏联动----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏释放能触发 drill插件中 鼠标中键释放功能。
 * @default true
 * 
 * @param 触屏释放>>鼠标右键释放
 * @parent ----触屏联动----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏释放能触发 drill插件中 鼠标右键释放功能。
 * @default true
 *
 * @param ----地图----
 * @default 
 *
 * @param 是否禁用鼠标左键地图移动
 * @parent ----地图----
 * @type boolean
 * @on 禁用
 * @off 不操作
 * @desc true - 禁用，false - 不操作。地图界面中，鼠标左键移动的rmmv功能会被禁用。
 * @default false
 *
 * @param ----菜单----
 * @default 
 *
 * @param 是否禁用鼠标右键菜单
 * @parent ----菜单----
 * @type boolean
 * @on 禁用
 * @off 不操作
 * @desc true - 禁用，false - 不操作。地图界面中，鼠标右键直接进入菜单的rmmv功能会被禁用。
 * @default true
 *
 * @param 是否禁用触屏双指菜单
 * @parent ----菜单----
 * @type boolean
 * @on 禁用
 * @off 不操作
 * @desc true - 禁用，false - 不操作。地图界面中，触屏按下两个手指后进入菜单的rmmv功能会被禁用。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COI (Core_Of_Input)
//		临时全局变量	DrillUp.g_COI_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)	每帧	【直接for】
//						o(n^2)	每帧	【自动打盹】
//		★性能测试因素	标题界面
//		★性能测试消耗	62.38ms		【直接for】（这个在标题界面就有很大的占比，需要优化）
//						27.21ms		【自动打盹】
//		★最坏情况		玩家一直按键，不停歇，则消耗将保持在62.38ms。
//						不过一般玩家不可能做到每半秒按一次，毕竟这又不是竞技游戏。
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			输入设备核心：
//				->鼠标按键
//					->鼠标失去窗口焦点优化
//				->手柄按键
//				->键盘按键
//				->触屏辅助联动
//				->优化，手柄按键自动打盹
//				->优化，键盘按键自动打盹
//				->禁用设置
//					->右键菜单
//					->触屏双指菜单
//
//		★必要注意事项：
//			1.键盘/手柄按键自动打盹：键位触发后，如果超过一定时间，就认定为打盹。
//			  也就是说，玩家未操作键盘超过一定时间时，将不做多余计算。打盹状态下，键盘/手柄肯定都是没有被按的。
//			2.手柄可能存在多个手柄连接情况，这里只考虑一个手柄情况。
//			3.鼠标和触屏有很大的区别，电脑上基本很难测试触屏功能。
//			  鼠标只有一个，而触屏可以有两个以上的手指，来自于：touches（当前的触点） 和 changedTouches（事件的触点）
//			  【必须先锁定触屏的位置，再进行联动触发。】
//
//		★其它说明细节：
//			1.目前只有键盘按键设置了打盹，因为鼠标和手柄按键非常少。
//		
//		★核心接口说明：
//			1.核心提供一系列零散碎片函数。	
//				具体看看下面的类。鼠标、触屏、键盘、手柄。
//
//		★存在的问题：
//			1.按键核 与 键盘改键设置 的按键范围不一样。
//			2.触屏双击触发有个小瑕疵，第一次按任意地方，只要第二次落在事件上，就算双击。
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfInput = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfInput');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_COI_mouse_judgeTime = Number(DrillUp.parameters['键盘双击判定时长'] || 12); 
	DrillUp.g_COI_pads_judgeTime = Number(DrillUp.parameters['手柄双击判定时长'] || 12); 
	DrillUp.g_COI_keys_judgeTime = Number(DrillUp.parameters['鼠标双击判定时长'] || 12); 

	DrillUp.g_COI_touchPad_l_down = String(DrillUp.parameters['触屏按下>>鼠标左键按下'] || "false") === "true";
	DrillUp.g_COI_touchPad_m_down = String(DrillUp.parameters['触屏按下>>鼠标中键按下'] || "true") === "true";
	DrillUp.g_COI_touchPad_r_down = String(DrillUp.parameters['触屏按下>>鼠标右键按下'] || "true") === "true";
	DrillUp.g_COI_touchPad_l_up = String(DrillUp.parameters['触屏释放>>鼠标左键释放'] || "false") === "true";
	DrillUp.g_COI_touchPad_m_up = String(DrillUp.parameters['触屏释放>>鼠标中键释放'] || "true") === "true";
	DrillUp.g_COI_touchPad_r_up = String(DrillUp.parameters['触屏释放>>鼠标右键释放'] || "true") === "true";
	
	DrillUp.g_COI_map_leftMouse = String(DrillUp.parameters['是否禁用鼠标左键地图移动'] || "false") === "true";
	DrillUp.g_COI_menu_mouse = String(DrillUp.parameters['是否禁用鼠标右键菜单'] || "true") === "true";
	DrillUp.g_COI_menu_touchPad = String(DrillUp.parameters['是否禁用触屏双指菜单'] || "true") === "true";


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_COI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COI_pluginCommand.call(this, command, args);
	if( command === ">输入设备核心" ){
		var type = String(args[1]);
		var temp2 = String(args[3]);
		if( type == "地图鼠标左键移动" ){
			if( temp2 == "开启" || temp2 == "启用" ){ $gameSystem._drill_COI_map_leftMouse = false;  }
			if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem._drill_COI_map_leftMouse = true; }
		}
		if( type == "鼠标右键菜单" ){
			if( temp2 == "开启" || temp2 == "启用" ){ $gameSystem._drill_COI_menu_mouse = false;  }
			if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem._drill_COI_menu_mouse = true; }
		}
		if( type == "触屏双指菜单" ){
			if( temp2 == "开启" || temp2 == "启用" ){ $gameSystem._drill_COI_menu_touchPad = false;  }
			if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem._drill_COI_menu_touchPad = true; }
		}
	}
}


//=============================================================================
// ** 存储数据变量初始化
//=============================================================================
var _drill_COI_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
	_drill_COI_initialize.call(this);
	this._drill_COI_map_leftMouse = DrillUp.g_COI_map_leftMouse;	//禁用 鼠标右键菜单
	this._drill_COI_menu_mouse = DrillUp.g_COI_menu_mouse;			//禁用 鼠标右键菜单
	this._drill_COI_menu_touchPad = DrillUp.g_COI_menu_touchPad;	//禁用 触屏双指菜单
}


//=============================================================================
// ** 禁用设置
//=============================================================================
//==============================
// * 禁用 - 地图鼠标左键移动
//==============================
var _drill_COI_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function(){	
	if( $gameSystem && $gameSystem._drill_COI_map_leftMouse == true ){ return; }
	_drill_COI_processMapTouch.call(this);
};
//==============================
// * 禁用 - 右键菜单（地图）
//==============================
var _drill_COI_onRightButtonDown = TouchInput._onRightButtonDown;
TouchInput._onRightButtonDown = function( event ){
	if( ($gameSystem && $gameSystem._drill_COI_menu_mouse == true) && 
		SceneManager._scene.constructor.name === "Scene_Map" ){
		
	}else{
		_drill_COI_onRightButtonDown.call(this,event);
	}
};
//==============================
// * 禁用 - 触屏双指菜单（地图）
//==============================
var _drill_COI_onTouchStart = TouchInput._onTouchStart;
TouchInput._onTouchStart = function( event ){
	if( ($gameSystem && $gameSystem._drill_COI_menu_touchPad == true) && 
		SceneManager._scene.constructor.name === "Scene_Map" ){
		if( event.touches.length >= 2 ){
			this._drill_COI_forbid_menu = true;
		}
	}
	_drill_COI_onTouchStart.call(this,event);
};
//==============================
// * 禁用 - 触屏双指菜单 延迟锁
//==============================
var _drill_COI_onCancel = TouchInput._onCancel;
TouchInput._onCancel = function( x, y ){
	if( this._drill_COI_forbid_menu === true ){
		this._drill_COI_forbid_menu = false;
		return ;
	}
	_drill_COI_onCancel.call(this,x, y);
};

//=============================================================================
// ** 鼠标失去窗口焦点优化（添加焦点函数）
//=============================================================================
var _drill_COI__setupEventHandlers = TouchInput._setupEventHandlers;
TouchInput._setupEventHandlers = function(){
	_drill_COI__setupEventHandlers.call(this);
    window.addEventListener("blur", this._onLostFocus.bind(this));
};
TouchInput._onLostFocus = function(){
    this.clear();
};



//=============================================================================
// ** 鼠标
//		
//			类型：	装饰函数集
//			功能：	获取鼠标指针、鼠标按键数据。
//			接口：	var xx = _drill_mouse_x;						// 鼠标指针位置（全局变量，直接使用即可）
//					var yy = _drill_mouse_y;
//					if( TouchInput.drill_isWheelUp() ){ }			// 滚轮向上[一帧]
//					if( TouchInput.drill_isWheelDown() ){ }			// 滚轮向下[一帧]
//					if( TouchInput.drill_isLeftPressed() ){ }		// 左键按下[持续]
//					if( TouchInput.drill_isLeftTriggered() ){ }		// 左键按下[一帧]
//					if( TouchInput.drill_isLeftReleased() ){ }		// 左键释放[一帧]
//					if( TouchInput.drill_isLeftDoubled() ){ }		// 左键双击[一帧]
//					if( TouchInput.drill_isMiddlePressed() ){ }		// 中键按下[持续]
//					if( TouchInput.drill_isMiddleTriggered() ){ }	// 中键按下[一帧]
//					if( TouchInput.drill_isMiddleReleased() ){ }	// 中键释放[一帧]
//					if( TouchInput.drill_isMiddleDoubled() ){ }		// 中键双击[一帧]
//					if( TouchInput.drill_isRightPressed() ){ }		// 右键按下[持续]
//					if( TouchInput.drill_isRightTriggered() ){ }	// 右键按下[一帧]
//					if( TouchInput.drill_isRightReleased() ){ }		// 右键释放[一帧]
//					if( TouchInput.drill_isRightDoubled() ){ }		// 右键双击[一帧]
//
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//=============================================================================
//==============================
// ** 鼠标 - 指针位置
//==============================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义（该函数在许多插件都用到了）

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function( event ){			//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}

//==============================
// ** 鼠标 - 滚轮监听
//==============================
var _drill_mouseWheel_onWheel = TouchInput._onWheel;
TouchInput._onWheel = function( event ){
	//if( event.deltaY != 0 ){					//暂时用rmmv原函数
	//	this._drill_COI_wheel_delta = event.deltaY;
	//}
	_drill_mouseWheel_onWheel.call(this,event);
};
//==============================
// ** 鼠标 - 滚轮监听（可用函数集）
//==============================
TouchInput.drill_isWheelUp = function(){		//滚轮向上[一帧]
	var threshold = 20;
	return TouchInput.wheelY <= -threshold;
}
TouchInput.drill_isWheelDown = function(){		//滚轮向下[一帧]
	var threshold = 20;
	return TouchInput.wheelY >= threshold;
}

//==============================
// * 触发绑定 - 鼠标按下
//
//			说明：原函数绑定了（dom 'mousedown'）
//==============================
var _drill_mouseInput_pressed = TouchInput._onMouseDown;
TouchInput._onMouseDown = function( event ){	
	if( event.button === 0 ){			//左键
		this.drill_onLeftDown(event);
	}else if( event.button === 1 ){		//中键
		this.drill_onMiddleDown(event);
	}else if( event.button === 2 ){		//右键
		this.drill_onRightDown(event);
	}
	_drill_mouseInput_pressed.call(this,event);
};
//==============================
// * 触发绑定 - 鼠标按下 - 左键
//==============================
TouchInput.drill_onLeftDown = function( event ){		//鼠标左键按下事件
	var x = Graphics.pageToCanvasX(event.pageX);
	var y = Graphics.pageToCanvasY(event.pageY);
	if( Graphics.isInsideCanvas(x, y) ){
		if( this._drill_LeftPressedTime >= 1 ){
			this._drill_LeftDoubledTime = 0;		//双击
		}
		this._drill_LeftPressed = true;
		this._drill_LeftPressedTime = 0;
	}
}
//==============================
// * 触发绑定 - 鼠标按下 - 中键
//==============================
TouchInput.drill_onMiddleDown = function( event ){	//鼠标滚轮按下事件
	var x = Graphics.pageToCanvasX(event.pageX);
	var y = Graphics.pageToCanvasY(event.pageY);
	if( Graphics.isInsideCanvas(x, y) ){
		if( this._drill_MiddlePressedTime >= 1 ){
			this._drill_MiddleDoubledTime = 0;		//双击
		}
		this._drill_MiddlePressed = true;
		this._drill_MiddlePressedTime = 0;
	}
}
//==============================
// * 触发绑定 - 鼠标按下 - 右键
//==============================
TouchInput.drill_onRightDown = function( event ){	//鼠标右键按下事件
	var x = Graphics.pageToCanvasX(event.pageX);
	var y = Graphics.pageToCanvasY(event.pageY);
	if( Graphics.isInsideCanvas(x, y) ){
		if( this._drill_RightPressedTime >= 1 ){
			this._drill_RightDoubledTime = 0;		//双击
		}
		this._drill_RightPressed = true;
		this._drill_RightPressedTime = 0;
	}
}

//==============================
// ** 触发绑定 - 鼠标释放
//
//			说明：原函数绑定了（dom 'mouseup'）
//==============================
var _drill_mouseInput_released = TouchInput._onMouseUp;
TouchInput._onMouseUp = function( event ){
	if( event.button === 0 ){			//左键
		this.drill_onLeftUp(event);
	}else if( event.button === 1 ){		//中键
		this.drill_onMiddleUp(event);
	}else if( event.button === 2 ){		//右键
		this.drill_onRightUp(event);
	}
	_drill_mouseInput_released.call(this,event);
};
//==============================
// * 触发绑定 - 鼠标释放 - 左键
//==============================
TouchInput.drill_onLeftUp = function( event ){
	this._drill_LeftPressed = false;
	this._drill_LeftReleasedTime = 0;
}
//==============================
// * 触发绑定 - 鼠标释放 - 中键
//==============================
TouchInput.drill_onMiddleUp = function( event ){
	this._drill_MiddlePressed = false;
	this._drill_MiddleReleasedTime = 0;
}
//==============================
// * 触发绑定 - 鼠标释放 - 右键
//==============================
TouchInput.drill_onRightUp = function( event ){
	this._drill_RightPressed = false;
	this._drill_RightReleasedTime = 0;
}


//==============================
// ** 鼠标 - 帧刷新
//==============================
var _drill_mouseInput_update = TouchInput.update;
TouchInput.update = function(){
	_drill_mouseInput_update.call(this);
	
	// > 左键双击处理
	if( this.drill_isLeftPressed() ){
		if(this._drill_LeftPressedTime != -1){ this._drill_LeftPressedTime++; }
	}else{
		if(this._drill_LeftReleasedTime != -1){ this._drill_LeftReleasedTime++; }
	}
	if( this._drill_LeftDoubledTime != -1){ this._drill_LeftDoubledTime ++; }
	
	if( this._drill_LeftReleasedTime > DrillUp.g_COI_mouse_judgeTime ){		//释放时间超过一定值时，重置
		this._drill_LeftPressedTime = -1;
		this._drill_LeftReleasedTime = -1;
		this._drill_LeftDoubledTime = -1;
	}
	
	// > 中键双击处理
	if( this.drill_isMiddlePressed() ){
		if( this._drill_MiddlePressedTime != -1){ this._drill_MiddlePressedTime++; }
	}else{
		if( this._drill_MiddleReleasedTime != -1){ this._drill_MiddleReleasedTime++; }
	}
	if( this._drill_MiddleDoubledTime != -1){ this._drill_MiddleDoubledTime ++; }
	
	if( this._drill_MiddleReleasedTime > DrillUp.g_COI_mouse_judgeTime ){	//释放时间超过一定值时，重置
		this._drill_MiddlePressedTime = -1;
		this._drill_MiddleReleasedTime = -1;
		this._drill_MiddleDoubledTime = -1;
	}
	
	// > 右键双击处理
	if( this.drill_isRightPressed() ){
		if(this._drill_RightPressedTime != -1){ this._drill_RightPressedTime++; }
	}else{
		if(this._drill_RightReleasedTime != -1){ this._drill_RightReleasedTime++; }
	}
	if(this._drill_RightDoubledTime != -1){ this._drill_RightDoubledTime ++; }
	
	if( this._drill_RightReleasedTime > DrillUp.g_COI_mouse_judgeTime ){	//释放时间超过一定值时，重置
		this._drill_RightPressedTime = -1;
		this._drill_RightReleasedTime = -1;
		this._drill_RightDoubledTime = -1;
	}
}

//==============================
// ** 鼠标 - 按键（可用函数集）
//==============================
TouchInput.drill_isLeftPressed = function(){		//左键按下[持续]
	return this._drill_LeftPressed;
}
TouchInput.drill_isLeftTriggerd = function(){		//左键按下[一帧]
	return (this._drill_LeftPressed && this._drill_LeftPressedTime == 1);
}
TouchInput.drill_isLeftReleased = function(){		//左键释放[一帧]
	return (!this._drill_LeftPressed && this._drill_LeftReleasedTime == 1);
}
TouchInput.drill_isLeftDoubled = function(){		//左键双击[一帧]
	return this._drill_LeftDoubledTime == 1 ;
}
TouchInput.drill_isMiddlePressed = function(){		//滚轮按下[持续]
	return this._drill_MiddlePressed;
}
TouchInput.drill_isMiddleTriggerd = function(){		//滚轮按下[一帧]
	return (this._drill_MiddlePressed && this._drill_MiddlePressedTime == 1);
}
TouchInput.drill_isMiddleReleased = function(){		//滚轮释放[一帧]
	return (!this._drill_MiddlePressed && this._drill_MiddleReleasedTime == 1);
}
TouchInput.drill_isMiddleDoubled = function(){		//滚轮双击[一帧]
	return this._drill_MiddleDoubledTime == 1 ;
}
TouchInput.drill_isRightPressed = function(){		//右键按下[持续]
	return this._drill_RightPressed;
}
TouchInput.drill_isRightTriggerd = function(){		//右键按下[一帧]
	return (this._drill_RightPressed && this._drill_RightPressedTime == 1);
}
TouchInput.drill_isRightReleased = function(){		//右键释放[一帧]
	return (!this._drill_RightPressed && this._drill_RightReleasedTime == 1);
}
TouchInput.drill_isRightDoubled = function(){		//右键双击[一帧]
	return this._drill_RightDoubledTime == 1 ;
}
TouchInput.drill_isLeftTriggered = TouchInput.drill_isLeftTriggerd;		//（拼写错误修复）
TouchInput.drill_isMiddleTriggered = TouchInput.drill_isMiddleTriggerd
TouchInput.drill_isRightTriggered = TouchInput.drill_isRightTriggerd



//=============================================================================
// ** 触屏
//		
//			类型：	装饰函数集
//			功能：	获取触屏指针、触屏按键数据。
//			接口：	var xx = _drill_mouse_x;						// 触屏指针位置（全局变量，直接使用即可）
//					var yy = _drill_mouse_y;
//					if( TouchInput.drill_isLeftPressed() ){ }		// 左键按下[持续] （触屏联动）
//					if( TouchInput.drill_isLeftTriggered() ){ }		// 左键按下[一帧] （触屏联动）
//					if( TouchInput.drill_isLeftReleased() ){ }		// 左键释放[一帧] （触屏联动）
//					if( TouchInput.drill_isLeftDoubled() ){ }		// 左键双击[一帧] （触屏联动）
//					if( TouchInput.drill_isMiddlePressed() ){ }		// 中键按下[持续] （触屏联动）
//					if( TouchInput.drill_isMiddleTriggered() ){ }	// 中键按下[一帧] （触屏联动）
//					if( TouchInput.drill_isMiddleReleased() ){ }	// 中键释放[一帧] （触屏联动）
//					if( TouchInput.drill_isMiddleDoubled() ){ }		// 中键双击[一帧] （触屏联动）
//					if( TouchInput.drill_isRightPressed() ){ }		// 右键按下[持续] （触屏联动）
//					if( TouchInput.drill_isRightTriggered() ){ }	// 右键按下[一帧] （触屏联动）
//					if( TouchInput.drill_isRightReleased() ){ }		// 右键释放[一帧] （触屏联动）
//					if( TouchInput.drill_isRightDoubled() ){ }		// 右键双击[一帧] （触屏联动）
//					
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//					> 触屏的接口使用的与鼠标 一模一样 。
//					  通过触屏联动，可以使得触屏能够触发和鼠标按键一样的功能。但是仅限使用了上述条件的插件。
//=============================================================================
//==============================
// ** 触屏 - 位置
//==============================
if( typeof(_drill_touchPad_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_touchPad_getCurPos = TouchInput._onTouchMove;
	TouchInput._onTouchMove = function( event ){
		_drill_touchPad_getCurPos.call(this,event);	//触屏位置
			
		if(event.changedTouches && event.changedTouches[0]){
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
	};
}
//==============================
// ** 触屏 - 按下（与鼠标联动）
//==============================
var _drill_touchPad_pressed = TouchInput._onTouchStart;
TouchInput._onTouchStart = function( event ){
	_drill_touchPad_pressed.call(this,event);
	if( this._screenPressed == true){
		if(event.changedTouches && event.changedTouches[0]){	//强制触屏位移
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
	
		if(DrillUp.g_COI_touchPad_l_down){		//确认触屏后，直接生效
			if( this._drill_LeftPressedTime >= 1 ){
				this._drill_LeftDoubledTime = 0;	
			}
			this._drill_LeftPressed = true;
			this._drill_LeftPressedTime = 0;
		}
		if(DrillUp.g_COI_touchPad_m_down){ 
			if( this._drill_MiddlePressedTime >= 1 ){
				this._drill_MiddleDoubledTime = 0;	
			}
			this._drill_MiddlePressed = true;
			this._drill_MiddlePressedTime = 0;
		}
		if(DrillUp.g_COI_touchPad_r_down){ 
			if( this._drill_RightPressedTime >= 1 ){
				this._drill_RightDoubledTime = 0;	
			}
			this._drill_RightPressed = true;
			this._drill_RightPressedTime = 0;
		}
	}
};
//==============================
// ** 触屏 - 释放（与鼠标联动）
//==============================
var _drill_touchPad_released = TouchInput._onTouchEnd;
TouchInput._onTouchEnd = function( event ){
	_drill_touchPad_released.call(this,event);
	if( this._screenPressed == false ){//确认触屏结束后，直接生效
		if(event.changedTouches && event.changedTouches[0]){	//强制触屏位移
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
		
		if(DrillUp.g_COI_touchPad_l_up){ this.drill_onLeftUp(null); }
		if(DrillUp.g_COI_touchPad_m_up){ this.drill_onMiddleUp(null); }
		if(DrillUp.g_COI_touchPad_r_up){ this.drill_onRightUp(null); }
	}
};

	

//=============================================================================
// ** 键盘
//		
//			类型：	装饰函数集
//			功能：	获取键盘按键数据。
//			接口：	if( Input.drill_isKeyPressed("a") ){ }			// A键按下[持续]
//					if( Input.drill_isKeyTriggered("a") ){ }		// A键按下[一帧]
//					if( Input.drill_isKeyReleased("a") ){ }			// A键释放[一帧]
//					if( Input.drill_isKeyDoubled("a") ){ }			// A键双击[一帧]
//					if( Input.drill_isKeyPressed("b") ){ }			// B键按下[持续]
//					if( Input.drill_isKeyTriggered("b") ){ }		// B键按下[一帧]
//					if( Input.drill_isKeyReleased("b") ){ }			// B键释放[一帧]
//					if( Input.drill_isKeyDoubled("b") ){ }			// B键双击[一帧]
//					……												// ……
//					if( Input.drill_isAnyKeyTriggered() ){ }		// 任意键按下[一帧]
//					if( Input.drill_isAnyKeyReleased() ){ }			// 任意键释放[一帧]
//					
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//					> 输入的按键字符必须【小写】。
//					> 这里全为【物理按键】，如果要判断 逻辑按键 是否触发，去用原函数。
//=============================================================================
//==============================
// ** 键盘 - 映射键位
//==============================
DrillUp.g_COI_keys_listenerTime = 0;		//自动打盹
DrillUp.g_COI_keys_pressed = {};
DrillUp.g_COI_keys_pressedTime = {};
DrillUp.g_COI_keys_releasedTime = {};
DrillUp.g_COI_keys_doubleTime = {};
DrillUp.g_COI_keys = {						//【全部小写，按键值和字符 一对一】
	//'~':192,   '!':49,  '@':50,   '#':51,  '$':52,  '%':53,   '^':54,  '&':55,  '*':56,  '(':57,  ')':48,  '_':189,  '+':187,
	'`':192,   '1':49,  '2':50,   '3':51,  '4':52,  '5':53,   '6':54,  '7':55,  '8':56,  '9':57,  '0':48,  '-':189,  '=':187,
	//'TAB':109, 'Q':81,  'W':87,   'E':69,  'R':82,  'T':84,   'Y':89,  'U':85,  'I':73,  'O':79,  'P':80,  '{':219,  '}':221,  '|':220,
	'tab':109, 'q':81,  'w':87,   'e':69,  'r':82,  't':84,   'y':89,  'u':85,  'i':73,  'o':79,  'p':80,  '[':219,  ']':221,  '\\':220,
	//           'A':65,  'S':83,   'D':68,  'F':70,  'G':71,   'H':72,  'J':74,  'K':75,  'L':76,  ':':186,  '"':222,
			   'a':65,  's':83,   'd':68,  'f':70,  'g':71,   'h':72,  'j':74,  'k':75,  'l':76,  ';':186,  "'":222,
	//'SHIFT':16,'Z':90,  'X':88,   'C':67,  'V':86,  'B':66,   'N':78,  'M':77,  '<':188,  '>':190,  '?':191,
	'shift':16,'z':90,  'x':88,   'c':67,  'v':86,  'b':66,   'n':78,  'm':77,  ',':188,  '.':190,  '/':191,
	/*'CTRL':17, 'ALT':18,'空格':32,*/' ':32,  'alt':18,'ctrl':17,'上':38, '下':40, '左':37,  '右':39,  
};
for( var key in DrillUp.g_COI_keys ){
	DrillUp.g_COI_keys_pressed[key] = false;
	DrillUp.g_COI_keys_pressedTime[key] = -1;
	DrillUp.g_COI_keys_releasedTime[key] = -1;
	DrillUp.g_COI_keys_doubleTime[key] = -1;
}

//==============================
// ** 键盘 - 按下
//==============================
var _drill_keyInput_pressed = Input._onKeyDown;
Input._onKeyDown = function( event ){
	for( var key in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys[key] == event.keyCode ){
			if( DrillUp.g_COI_keys_pressed[key] == true ){	//未释放的情况下，出现重复按下问题
				DrillUp.g_COI_keys_pressedTime[key] = -1;
				DrillUp.g_COI_keys_releasedTime[key] = -1;
				DrillUp.g_COI_keys_doubleTime[key] = -1;
			}
			if( DrillUp.g_COI_keys_pressedTime[key] >= 1 ){
				DrillUp.g_COI_keys_doubleTime[key] = 0;		//双击
			}
			DrillUp.g_COI_keys_pressed[key] = true;
			DrillUp.g_COI_keys_pressedTime[key] = 0;
			DrillUp.g_COI_keys_listenerTime = DrillUp.g_COI_keys_judgeTime + 5;
			break;
		}
	}
	_drill_keyInput_pressed.call(this,event);
}
//==============================
// ** 键盘 - 释放
//==============================
var _drill_keyInput_released = Input._onKeyUp;
Input._onKeyUp = function( event ){
	for( var key in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys[key] == event.keyCode ){
			DrillUp.g_COI_keys_pressed[key] = false;
			DrillUp.g_COI_keys_releasedTime[key] = 0;
			DrillUp.g_COI_keys_listenerTime = DrillUp.g_COI_keys_judgeTime + 5;
			break;
		}
	}
	_drill_keyInput_released.call(this,event);
}

//==============================
// ** 键盘 - 帧刷新
//==============================
var _drill_keyInput_update = Input.update;
Input.update = function(){
	_drill_keyInput_update.call(this);
	
	if( DrillUp.g_COI_keys_listenerTime > 0 ){		//自动打盹
		this.drill_COI_updateKeysAction();
		DrillUp.g_COI_keys_listenerTime -= 1;
	}
}
//==============================
// ** 帧刷新 - 键盘动作监听
//==============================
Input.drill_COI_updateKeysAction = function(){
	for( var key in DrillUp.g_COI_keys ){
		if( this.drill_isKeyPressed(key)  ){
			if( DrillUp.g_COI_keys_pressedTime[key] != -1){ DrillUp.g_COI_keys_pressedTime[key] += 1; }
		}else{
			if( DrillUp.g_COI_keys_releasedTime[key] != -1){ DrillUp.g_COI_keys_releasedTime[key] += 1; }
		}
		if( DrillUp.g_COI_keys_doubleTime[key] != -1){ DrillUp.g_COI_keys_doubleTime[key] += 1; }
		
		if( DrillUp.g_COI_keys_releasedTime[key] > DrillUp.g_COI_keys_judgeTime ){	//释放时间超过一定值时，重置
			DrillUp.g_COI_keys_pressedTime[key] = -1;
			DrillUp.g_COI_keys_releasedTime[key] = -1;
			DrillUp.g_COI_keys_doubleTime[key] = -1;
		}
	}
}

//==============================
// ** 键盘 - 键位判断（可用函数集）
//==============================
Input.drill_isKeyPressed = function( key ){				//键盘按下[持续]
	return DrillUp.g_COI_keys_pressed[key] == true;		//	（持续按时，不要打盹）
}
Input.drill_isKeyTriggerd = function( key ){			//键盘按下[一帧]
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	return (DrillUp.g_COI_keys_pressed[key] == true && DrillUp.g_COI_keys_pressedTime[key] == 1 );
}
Input.drill_isKeyReleased = function( key ){			//键盘释放[一帧]
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	return (DrillUp.g_COI_keys_pressed[key] == false && DrillUp.g_COI_keys_releasedTime[key] == 1 );
}
Input.drill_isKeyDoubled = function( key ){				//键盘双击[一帧]
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	return DrillUp.g_COI_keys_doubleTime[key] == 1  ;
}
Input.drill_isAnyKeyTriggerd = function(){				//任意键按下[一帧]
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	for( var key in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys_pressed[key] == true && DrillUp.g_COI_keys_pressedTime[key] == 1 ){
			return true;
		}
	}
	return false;
}
Input.drill_isAnyKeyReleased = function(){				//任意键释放[一帧]
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	for( var key in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys_pressed[key] == false && DrillUp.g_COI_keys_releasedTime[key] == 1 ){
			return true;
		}
	}
	return false;
}
Input.drill_isKeyTriggered = Input.drill_isKeyTriggerd;		//（拼写错误修复）
Input.drill_isAnyKeyTriggered = Input.drill_isAnyKeyTriggerd;
	

	

//=============================================================================
// ** 手柄
//		
//			类型：	装饰函数集
//			功能：	获取手柄按键数据。
//			接口：	if( Input.drill_isPadPressed("LB") ){ }			// LB键按下[持续]
//					if( Input.drill_isPadTriggered("LB") ){ }		// LB键按下[一帧]
//					if( Input.drill_isPadReleased("LB") ){ }		// LB键释放[一帧]
//					if( Input.drill_isPadDoubled("LB") ){ }			// LB键双击[一帧]
//					if( Input.drill_isPadPressed("RB") ){ }			// RB键按下[持续]
//					if( Input.drill_isPadTriggered("RB") ){ }		// RB键按下[一帧]
//					if( Input.drill_isPadReleased("RB") ){ }		// RB键释放[一帧]
//					if( Input.drill_isPadDoubled("RB") ){ }			// RB键双击[一帧]
//					……												// ……
//					if( Input.drill_isAnyPadTriggered() ){ }		// 任意键按下[一帧]
//					if( Input.drill_isAnyPadReleased() ){ }			// 任意键释放[一帧]
//					
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//				  	> 可能会出现多个手柄连接情况，这里只考虑一个手柄情况。
//				  	> 输入的按键字符必须对应 DrillUp.g_COI_pads 中的键。
//					> 这里全为【物理按键】，如果要判断 逻辑按键 是否触发，去用原函数。
//=============================================================================
//==============================
// ** 手柄 - 映射键位
//==============================
DrillUp.g_COI_pads_listenerTime = 0;		//自动打盹
DrillUp.g_COI_pads_pressed = {};
DrillUp.g_COI_pads_pressedTime = {};
DrillUp.g_COI_pads_releasedTime = {};
DrillUp.g_COI_pads_doubleTime = {};
DrillUp.g_COI_pads = {						//【固定按键，全部大写】
	'A': 0,  'B': 1,  'X': 2,  'Y': 3,  'LB':4,  'RB':5,
	'上':12, '下':13, '左':14, '右':15,
};	
for( var pad in DrillUp.g_COI_pads ){
	DrillUp.g_COI_pads_pressed[pad] = false;
	DrillUp.g_COI_pads_pressedTime[pad] = -1;
	DrillUp.g_COI_pads_releasedTime[pad] = -1;
	DrillUp.g_COI_pads_doubleTime[pad] = -1;
}

//==============================
// ** 手柄 - 键位扫描
//==============================
var _drill_padInput_updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function( gamepad ){
	//在core修改newstate前，遍历刷新按下和释放动作
	var lastStates = JSON.parse(JSON.stringify( this._gamepadStates[gamepad.index] || [] ));
	_drill_padInput_updateGamepadState.call( this,gamepad );
	var newStates = this._gamepadStates[gamepad.index] || [];
	for(var j=0; j<lastStates.length; j++){
		if( newStates[j] !== lastStates[j] ){
			for( var pad in DrillUp.g_COI_pads ){
				if( DrillUp.g_COI_pads[pad] == j ){
					
					if( newStates[j] == true ){	//手柄按下
						if( DrillUp.g_COI_pads_pressed[pad] == true ){	//未释放的情况下，出现重复按下问题
							DrillUp.g_COI_pads_pressedTime[pad] = -1;
							DrillUp.g_COI_pads_releasedTime[pad] = -1;
							DrillUp.g_COI_pads_doubleTime[pad] = -1;
						}
						if( DrillUp.g_COI_pads_pressedTime[pad] >= 1 ){
							DrillUp.g_COI_pads_doubleTime[pad] = 0;		//双击
						}
						DrillUp.g_COI_pads_pressed[pad] = true;
						DrillUp.g_COI_pads_pressedTime[pad] = 0;	
						DrillUp.g_COI_pads_listenerTime = DrillUp.g_COI_pads_judgeTime + 5;
						
					}else{	//手柄释放
						DrillUp.g_COI_pads_pressed[pad] = false;
						DrillUp.g_COI_pads_releasedTime[pad] = 0;
						DrillUp.g_COI_pads_listenerTime = DrillUp.g_COI_pads_judgeTime + 5;
					
					}
				}
			}
		}
	}
}

//==============================
// ** 手柄 - 帧刷新
//==============================
var _drill_padInput_update = Input.update;
Input.update = function(){
	_drill_padInput_update.call(this);
	
	if( DrillUp.g_COI_pads_listenerTime > 0 ){		//自动打盹
		this.drill_COI_updatePadsAction();
		DrillUp.g_COI_pads_listenerTime -= 1;
	}
}
//==============================
// ** 帧刷新 - 手柄动作监听
//==============================
Input.drill_COI_updatePadsAction = function(){
	for( var pad in DrillUp.g_COI_pads ){
		if( this.drill_isPadPressed(pad)  ){
			if( DrillUp.g_COI_pads_pressedTime[pad] != -1){ DrillUp.g_COI_pads_pressedTime[pad] += 1; }
		}else{
			if( DrillUp.g_COI_pads_releasedTime[pad] != -1){ DrillUp.g_COI_pads_releasedTime[pad] += 1; }
		}
		if( DrillUp.g_COI_pads_doubleTime[pad] != -1){ DrillUp.g_COI_pads_doubleTime[pad] += 1; }
		
		if( DrillUp.g_COI_pads_releasedTime[pad] > DrillUp.g_COI_pads_judgeTime ){	//释放时间超过一定值时，重置
			DrillUp.g_COI_pads_pressedTime[pad] = -1;
			DrillUp.g_COI_pads_releasedTime[pad] = -1;
			DrillUp.g_COI_pads_doubleTime[pad] = -1;
		}
	}
}
//==============================
// ** 键盘 - 键位判断（可用函数集）
//==============================
Input.drill_isPadPressed = function( pad ){				//手柄按下[持续]
	return DrillUp.g_COI_pads_pressed[pad] == true;		//	（持续按时，不要打盹）
}
Input.drill_isPadTriggerd = function( pad ){			//手柄按下[一帧]
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	return (DrillUp.g_COI_pads_pressed[pad] == true && DrillUp.g_COI_pads_pressedTime[pad] == 1 );
}
Input.drill_isPadReleased = function( pad ){			//手柄释放[一帧]
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	return (DrillUp.g_COI_pads_pressed[pad] == false && DrillUp.g_COI_pads_releasedTime[pad] == 1 );
}
Input.drill_isPadDoubled = function( pad ){				//手柄双击[一帧]
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	return DrillUp.g_COI_pads_doubleTime[pad] == 1  ;
}
Input.drill_isAnyPadTriggerd = function(){				//任意键按下[一帧]
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	for( var pad in DrillUp.g_COI_pads ){
		if( DrillUp.g_COI_pads_pressed[pad] == true && DrillUp.g_COI_pads_pressedTime[pad] == 1 ){
			return true;
		}
	}
	return false;
}
Input.drill_isAnyPadReleased = function(){				//任意键释放[一帧]
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	for( var pad in DrillUp.g_COI_pads ){
		if( DrillUp.g_COI_pads_pressed[pad] == false && DrillUp.g_COI_pads_releasedTime[pad] == 1 ){
			return true;
		}
	}
	return false;
}
Input.drill_isPadTriggered = Input.drill_isPadTriggerd;		//（拼写错误修复）
Input.drill_isAnyPadTriggered = Input.drill_isAnyPadTriggerd;

	
