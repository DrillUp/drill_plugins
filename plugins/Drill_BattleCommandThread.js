//=============================================================================
// Drill_BattleCommandThread.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        战斗 - 多线程
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleCommandThread +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得公共事件串行或并行执行。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以辅助扩展下列插件。
 * 可作用于：
 *   - Drill_SecretCode           键盘-秘籍输入器
 *     该插件可以使得上述目标插件具有串行与并行的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   只作用于事件。
 * 细节：
 *   (1.注意，这里的"多线程"并不是CPU硬件分配意义上的多线程。
 *      而是 事件与并行事件 之间指令执行上的多线程。
 * 公共事件：
 *   (1.你可以选择串行与并行执行公共事件，
 *      具体可以看看 "31.公共事件 > 关于公共事件与并行.docx"。
 *   (2.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强
 *      制串行，阻塞其他所有事件的线程。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动执行公共事件。
 * 
 * 插件指令：>战斗多线程 : 串行执行 : 公共事件[1]
 * 插件指令：>战斗多线程 : 并行执行 : 公共事件[1]
 * 
 * 1.注意，该插件指令只能在战斗界面中有效。
 * 2.不建议在公共事件中嵌套多个并行执行的插件指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 强制插入
 * 你可以通过插件指令手动插入串行执行的指令。
 * 
 * 插件指令：>战斗多线程 : 强制插入串行执行 : 公共事件[1]
 * 
 * 1.注意，该插件指令只能在战斗界面中有效。
 * 2.该指令可强制将公共事件插入到正在串行执行的指令集中。
 *   如果在串行事件中执行，那么相当于指令 "流程控制 > 公共事件"，
 *   如果在并行事件中执行，那么是立即暂停当前串行，去执行其它公共事件。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 分支条件
 * 你可以将下面的指令写到分支条件脚本中：
 * 
 * 分支条件：>战斗多线程:处于地图界面时
 * 分支条件：>战斗多线程:处于战斗界面时
 * 
 * 1.处于指定界面时才会通过，否则不通过。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   在一场战斗通过鼠标建立10个以上并行执行公共事件。
 * 测试结果：   在战斗界面中，消耗为：【62.60ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件中使用 管道事件 来执行并行指令，管道事件是一个单独的程
 *   序执行体，不含行走图、碰撞判定，所以不会造成额外的处理消耗。
 * 3.不过仍然要注意控制并行事件不能太多，过多并行事件造成的消耗
 *   量是指数级的。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了强制插入串行执行的功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BCT （Battle_Command_Thread）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_BCT_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	2024/5/2：
//							》62.6ms（drill_controller_updateParallel）
//		★最坏情况		大量事件并行
//		★备注			由于添加了鼠标点击的小爆炸功能，性能消耗突然非常大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//
//			->☆多线程
//				->添加公共事件【标准函数】
//
//			->☆管道容器
//			->☆管道容器控制
//				->帧刷新 物体
//				->帧刷新 自动销毁
//				->串行处理
//					->解释器对象（$gameTroop._interpreter）
//
//			->管道物体【Drill_BCT_GamePipeEvent】
//				->A主体
//				->B并行处理
//					->解释器对象（this._drill_parallel_interpreter = new Game_Interpreter()）
//				->C串行标记
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 管道物体【Drill_BCT_GamePipeEvent】
//		
//		★必要注意事项：
//			1.简单来说，有list有interpreter就可以执行。
//			  串行就是使用$gameTroop的interpreter，将list输入栈。
//			  并行就是event自带interpreter，然后update。
//			
//		★其它说明细节：
//			1.
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
	DrillUp.g_BCT_PluginTip_curName = "Drill_BattleCommandThread.js 战斗-多线程";
	DrillUp.g_BCT_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 参数不存在
	//==============================
	DrillUp.drill_BCT_getPluginTip_ErrorDataNull = function( commonEventId ){
		return "【" + DrillUp.g_BCT_PluginTip_curName + "】\n参数错误，游戏中并不存在id为"+commonEventId+"的公共事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 参数指向公共事件为空
	//==============================
	DrillUp.drill_BCT_getPluginTip_ErrorDataEmpty = function( commonEventId ){
		return "【" + DrillUp.g_BCT_PluginTip_curName + "】\n参数错误，游戏中id为"+commonEventId+"的公共事件是空的，没有任何事件指令。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleCommandThread = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleCommandThread');
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_BCT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BCT_pluginCommand.call(this, command, args);
	if( command === ">战斗多线程" ){
		
		if( args.length == 4 ){		//>战斗多线程 : 串行执行 : 公共事件[1]
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			if( type == "串行执行" ){
				temp1 = temp1.replace("公共事件[","");
				temp1 = temp1.replace("]","");
				var data = {
					'type': "公共事件",
					'pipeType': "串行",
					'commonEventId': Number(temp1),
					'callBack_str': "",
				};
				$gameTroop.drill_BCT_addPipeEvent( data );
			}
			
			if( type == "并行执行" ){
				temp1 = temp1.replace("公共事件[","");
				temp1 = temp1.replace("]","");
				var data = {
					'type': "公共事件",
					'pipeType': "并行",
					'commonEventId': Number(temp1),
					'callBack_str': "",
				};
				$gameTroop.drill_BCT_addPipeEvent( data );
			}
			
			if( type == "强制插入串行执行" ){
				temp1 = temp1.replace("公共事件[","");
				temp1 = temp1.replace("]","");
				var data = {
					'type': "公共事件",
					'pipeType': "串行",
					'commonEventId': Number(temp1),
					'callBack_str': "",
				};
				$gameMap.drill_BCT_forceInsertPipeEvent( data );
			}
		}
	}
}


//=============================================================================
// ** ☆分支指令
//=============================================================================
var _drill_BCT_COCB_conditionCommand = Game_Interpreter.prototype.drill_COCB_conditionCommand;
Game_Interpreter.prototype.drill_COCB_conditionCommand = function(command, args) {
	_drill_BCT_COCB_conditionCommand.call(this, command, args);
	if( command === ">战斗多线程" ){
		
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( temp1 == "处于地图界面时" ){
				var passed = SceneManager._scene instanceof Scene_Map;
				this.drill_COCB_conditionSubmit( passed );
			}
			if( temp1 == "处于战斗界面时" ){
				var passed = SceneManager._scene instanceof Scene_Battle;
				this.drill_COCB_conditionSubmit( passed );
			}
		}
	}
};
	
	
	
//#############################################################################
// ** 【标准模块】多线程 ☆多线程
//#############################################################################
//##############################
// * 多线程 - 添加公共事件【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['type'] 字符串        （填 公共事件 ，目前只有这一个选项）
//					> data['pipeType'] 字符串    （填 并行/串行 ）
//					> data['commonEventId'] 数字 （填 公共事件的id值）
//					> data['callBack_str'] 字符串（脚本指令，公共事件执行完毕前，执行的指令）
//			返回：	无
//			
//			说明：	> 按照参数对象执行函数即可，只能在战斗界面执行。
//					> 注意，回调函数必须是字符串，不能为 函数对象，因为需要考虑存储数据问题。
//##############################
Game_Troop.prototype.drill_BCT_addPipeEvent = function( data ){
	this.drill_BCT_addPipeEvent_private( data );
}
//##############################
// * 多线程 - 强制插入串行公共事件【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['type'] 字符串        （填 公共事件 ，目前只有这一个选项）
//					> data['pipeType'] 字符串    （填 并行/串行，该参数在这里没用，会被强制串行）
//					> data['commonEventId'] 数字 （填 公共事件的id值）
//					> data['callBack_str'] 字符串（脚本指令，公共事件执行完毕前，执行的指令）
//			返回：	无
//			
//			说明：	> 该函数可强制将公共事件插入到正在串行执行的指令集中。
//					  插入位置为正在执行的指令的后一条，如果正在执行"战斗处理"，那么插入位置为战斗结束之后的位置。
//##############################
Game_Troop.prototype.drill_BCT_forceInsertPipeEvent = function( data ){
	data['pipeType'] = "串行";
	this.drill_BCT_forceInsertPipeEvent_private( data );
}



//=============================================================================
// ** ☆管道容器
//
//			说明：	> 此模块定义一个 管道容器 ，存储 管道物体。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管道容器 - 初始化
//==============================
var _drill_BCT_troop_initialize = Game_Troop.prototype.initialize;
Game_Troop.prototype.initialize = function() {
	_drill_BCT_troop_initialize.call(this);
    this._drill_BCT_pipeEventTank = [];
}
//==============================
// * 管道容器 - 切换敌群时
//==============================
var _drill_BCT_troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function( troopId ) {
	_drill_BCT_troop_setup.call( this, troopId );
    this._drill_BCT_pipeEventTank = [];
}
//==============================
// * 管道容器 - 添加公共事件（私有）
//==============================
Game_Troop.prototype.drill_BCT_addPipeEvent_private = function( data ){
	
	// > 校验
    var commonEvent = $dataCommonEvents[ data['commonEventId'] ];
    if( commonEvent == undefined ){
		alert( DrillUp.drill_BCT_getPluginTip_ErrorDataNull( data['commonEventId'] ) );
		return;
    }else if( commonEvent.list.length == 0 ){
		alert( DrillUp.drill_BCT_getPluginTip_ErrorDataEmpty( data['commonEventId'] ) );
		return;
	}
	
	// > 添加
	var pipe_event = new Drill_BCT_GamePipeEvent( data );
	this._drill_BCT_pipeEventTank.push( pipe_event );
	
	
	// > 无返回值，类 Drill_BCT_GamePipeEvent 不要对外开放
	//	（无）
}
//==============================
// * 管道容器 - 强制插入串行公共事件（私有）
//==============================
Game_Troop.prototype.drill_BCT_forceInsertPipeEvent_private = function( data ){
	
	// > 校验
    var commonEvent = $dataCommonEvents[ data['commonEventId'] ];
    if( commonEvent == undefined ){
		alert( DrillUp.drill_BCT_getPluginTip_ErrorDataNull( data['commonEventId'] ) );
		return;
    }else if( commonEvent.list.length == 0 ){
		alert( DrillUp.drill_BCT_getPluginTip_ErrorDataEmpty( data['commonEventId'] ) );
		return;
	}
	
	// > 添加
	var pipe_event = new Drill_BCT_GamePipeEvent( data );
	this._drill_BCT_pipeEventTank.unshift( pipe_event );	//（从头部插入）
	
	
	// > 插入串行 - 清理阻塞状态
	var main_interpreter = this._interpreter;
	pipe_event.drill_clearStartingFlag();
		
	// > 插入串行 - 没有串行执行时，执行串行
    if( main_interpreter.isRunning() != true ){
		this.setupBattleEvent();
		
	// > 插入串行 - 有串行执行时，作为 子事件指令 插入
	}else{
		main_interpreter.setupChild( pipe_event.drill_list(), 0 );		//（注意事件id为0）
	}
	
	// > 插入串行 - 帧刷新
	pipe_event.drill_controller_update();
}


//=============================================================================
// ** ☆管道容器控制
//
//			说明：	> 此模块专门管理 管道容器 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管道容器控制 - 帧刷新 物体
//==============================
var _drill_BCT_troop_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_BCT_troop_update.call(this);
	
	for(var i = 0; i < $gameTroop._drill_BCT_pipeEventTank.length; i++ ){
		var pipe_event = $gameTroop._drill_BCT_pipeEventTank[i];
		pipe_event.drill_controller_update();
	}
};
//==============================
// * 管道容器控制 - 帧刷新 自动销毁
//==============================
var _drill_BCT_troop_update2 = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_BCT_troop_update2.call(this);
	
	for(var i = $gameTroop._drill_BCT_pipeEventTank.length-1; i >= 0; i-- ){
		var temp_event = $gameTroop._drill_BCT_pipeEventTank[i];
		if( temp_event._drill_erased == true ){
			$gameTroop._drill_BCT_pipeEventTank.splice(i,1);
			delete temp_event;
		}
	}
}

//==============================
// * 管道容器控制 - 串行处理 - 事件执行队列
//==============================
var _drill_BCT_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
Game_Troop.prototype.setupBattleEvent = function() {
	
    if( this._interpreter.isRunning() != true ){
		
		// > 管道事件
		for(var i = 0; i < this._drill_BCT_pipeEventTank.length; i++ ){
			var pipe_event = this._drill_BCT_pipeEventTank[i];
			if( pipe_event.drill_isStarting() == true ){
				
				// > 塞入指令
				pipe_event.drill_clearStartingFlag();
				this._interpreter.setup( pipe_event.drill_list(), 0 );		//（注意事件id为0）
				return;
			}
		}
	}
	
	// > 原函数
	_drill_BCT_setupBattleEvent.call(this);
};
//==============================
// * 管道容器控制 - 串行处理 - 是否正在阻塞
//==============================
var _drill_BCT_isEventRunning = Game_Troop.prototype.isEventRunning;
Game_Troop.prototype.isEventRunning = function() {
	var b = _drill_BCT_isEventRunning.call( this );
	if( b == false ){
		
		// > 没有事件运行时，检查 管道容器
		for(var i = 0; i < this._drill_BCT_pipeEventTank.length; i++ ){
			var pipe_event = this._drill_BCT_pipeEventTank[i];
			if( pipe_event.drill_isStarting() == true ){	//（有管道物体运行，则阻塞全部事件）
				return true;
			}
		}
	}
	return b;
};



//=============================================================================
// ** 管道物体【Drill_BCT_GamePipeEvent】
// **		
// **		作用域：	战斗界面
// **		主功能：	> 定义一个构建 串行/并行 的小型事件，执行公共事件用。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->销毁
// **					->A主体
// **					->B并行处理
// **						->解释器对象
// **					->C串行标记
// **
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 管道物体 - 定义
//==============================
function Drill_BCT_GamePipeEvent() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 管道物体 - 初始化
//==============================
Drill_BCT_GamePipeEvent.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 管道物体 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_BCT_GamePipeEvent.prototype.drill_controller_update = function(){
	if( this._drill_erased == true ){ return; }
    this.drill_controller_updateBlock();		//帧刷新 - C串行标记
    this.drill_controller_updateParallel();		//帧刷新 - B并行处理
}
//##############################
// * 管道物体 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_BCT_GamePipeEvent.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};

//##############################
// * 管道物体 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_BCT_GamePipeEvent.prototype.drill_controller_initData = function() {
	var data = this._drill_data;
	
	if( data['type'] == undefined ){ data['type'] = "公共事件" };				//物体类型
	if( data['pipeType'] == undefined ){ data['pipeType'] = "并行" };			//管道类型（串行/并行）
	if( data['commonEventId'] == undefined ){ data['commonEventId'] = 0 };		//公共事件id
	if( data['callBack_str'] == undefined ){ data['callBack_str'] = "" };		//回调函数
}
//==============================
// * 管道物体 - 初始化子功能
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initParallel();			//初始化子功能 - B并行处理
	this.drill_controller_initBlock();				//初始化子功能 - C串行标记
}
//==============================
// * 管道物体 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_initAttr = function() {
	this._drill_erased = false;					//A主体 - 删除
	this._drill_trigger = 0;					//A主体 - 触发方式（3自动执行，4并行处理）
	
	// > 触发方式 初始化
	var data = this._drill_data;
	if( data['pipeType'] == "串行" ){ this._drill_trigger = 3; }
	if( data['pipeType'] == "并行" ){ this._drill_trigger = 4; }
}
//==============================
// * A主体 - 获取 事件页指令列表
//
//			说明：	> 返回格式与事件数据的list一致：[{"code":117,"indent":0,"parameters":[10]},……]
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_list = function() {
	var result_list = [];
	var data = this._drill_data;
	
	// > 指令 - 执行公共事件
	if( data['type'] == "公共事件" ){
		var c_id = data['commonEventId'];
		var command = {"code":117,"indent":0,"parameters":[c_id] };
		result_list.push( command );
	}
	
	// > 指令 - 脚本（执行回调函数，只能存字符串，因为要考虑存储数据问题）
	if( typeof data['callBack_str'] === 'string' && data['callBack_str'] != "" ){
		var script_str = data['callBack_str'];
		var command = {"code":355,"indent":0,"parameters":[ script_str ] };
		result_list.push( command );
	}
	
	// > 指令 - 结尾指令
	var command = {"code":0,"indent":0,"parameters":[]};
	result_list.push( command );
	
	return result_list;
};


//==============================
// * B并行处理 - 初始化子功能
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_initParallel = function() {
	this._drill_parallel_interpreter = null;		//B并行处理 - 解释器对象
	this._drill_parallel_setuped = false;			//B并行处理 - 解释器设置
	
	// > 解释器对象 初始化
    if( this._drill_trigger === 4 ){
        this._drill_parallel_interpreter = new Game_Interpreter();
    }
}
//==============================
// * B并行处理 - 帧刷新
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_updateParallel = function() {
    if( this._drill_trigger != 4 ){ return; }
    if( this._drill_parallel_interpreter == null ){ return };
	
	// > 开始并行
	if( this._drill_parallel_interpreter.isRunning() != true ){
		if( this._drill_parallel_setuped == false ){
			this._drill_parallel_interpreter.setup( this.drill_list() );		//无eventid设置
			this._drill_parallel_setuped = true;
		}
	}
	
	// > 帧刷新
	this._drill_parallel_interpreter.update();
	
	// > 结束并行
	if( this._drill_parallel_interpreter.isRunning() != true ){
		if( this._drill_parallel_setuped == true ){
			this._drill_parallel_interpreter = null;
			this._drill_erased = true;		//（结束并行后，销毁）
		}
	}
};


//==============================
// * C串行标记 - 初始化子功能
//
//			说明：	> 此处只进行串行标记，串行处理 在前面函数：Game_Troop.prototype.setupStartingMapEvent。
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_initBlock = function() {
	this._drill_block_starting = false;			//C串行标记 - 输入栈的开关
	this._drill_block_setuped = false;			//C串行标记 - 输入栈设置
	
	// > 开始串行
	if( this._drill_trigger === 3 ){
		this.drill_start();
	}
}
//==============================
// * C串行标记 - 帧刷新
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_controller_updateBlock = function() {
    if( this._drill_trigger != 3 ){ return; }
	
	// > 结束串行
	if( this._drill_block_setuped == true && 
		this._drill_block_starting == false &&
		!$gameTroop.isEventRunning() ){
		this._drill_erased = true;		//（结束串行后，销毁）
	}
};
//==============================
// * C串行标记 - 开始事件指令
//
//			说明：	> 此处的代码 与 Game_Event.prototype.start 相似。
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_start = function() {
	var list = this.drill_list();
	if( list && list.length > 1 ){		//（注意至少两条指令，因为最后一条是 结尾指令）
		this._drill_block_starting = true;
		this._drill_block_setuped = true;
	}
};
//==============================
// * C串行标记 - 是否正在阻塞（开放函数）
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_isStarting = function() {
    return this._drill_block_starting;
};
//==============================
// * C串行标记 - 清理阻塞状态（开放函数）
//==============================
Drill_BCT_GamePipeEvent.prototype.drill_clearStartingFlag = function() {
    this._drill_block_starting = false;
};




