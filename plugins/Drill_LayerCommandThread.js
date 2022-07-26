//=============================================================================
// Drill_LayerCommandThread.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        地图 - 多线程
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerCommandThread +++
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
 * 作用于：
 *   - Drill_GaugeButton          鼠标-地图按钮集
 *   - Drill_OperateHud           鼠标-鼠标辅助操作面板
 *   - Drill_WindowMenuButton     控件-主菜单选项按钮管理器
 *   - Drill_SecretCode           键盘-秘籍输入器
 *     该插件可以使得上述目标插件具有串行与并行的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
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
 * 你可以通过插件指令手动修改生成的一些基本设置。
 * 
 * 插件指令：>多线程 : 串行执行 : 公共事件[1]
 * 插件指令：>多线程 : 并行执行 : 公共事件[1]
 * 
 * 1.注意，该插件指令只能在地图界面中有效。
 * 2.不建议在公共事件中嵌套多个并行执行的插件指令。
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
 * 测试方法：   在各个地图建立5个并行执行的公共事件。
 * 测试结果：   200个事件的地图中，消耗为：【36.14ms】
 *              100个事件的地图中，消耗为：【29.57ms】
 *               50个事件的地图中，消耗为：【28.94ms】
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
 * 添加了公共事件校验功能。
 * [v1.2]
 * 优化了内部结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LCT （Layer_Command_Thread）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_LCT_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	地图初始点
//		★性能测试消耗	28.94ms
//		★最坏情况		大量事件并行	
//		★备注			由于直接建立了管道事件，这里的消耗统计明显被区分开来，28.94ms是直接从管道事件update中找来的。
//						不会与事件自身的update统计纠缠在一起。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多线程：
//				->地图容器
//					->标准模块
//						->添加公共事件【标准函数】
//					->自动清除
//				->管道物体
//					->串行
//					->并行处理
//		
//		★私有类如下：
//			* Drill_LCT_GamePipeEvent		管道物体
//
//		★必要注意事项：
//			1.简单来说，有list有interpreter就可以执行。
//			  串行就是使用map的interpreter，将list输入栈。
//			  并行就是event自带interpreter，然后update。
//			2.这里部分保持了原来的event结构。（不过貌似理解难度加大了，原来的脚本结构就是这样绕来绕去难理解……）
//			
//		★其它说明细节：
//			1.	2020/8/3
//			  原本的想法是，在event基础上new一个，然后嵌套。但是后来发现event的不确定性太多了，而且性能消耗巨大。
//			  编写一个管道物体进行辅助执行interpreter效果会好的多。而且有助于后期分离结构。
//			  插件和事件复制器没有任何关系。
//				2020/8/4
//			  并行能够完美运行了，但是串行的施法后可乱跑的bug仍然存在，而且好像还不是_waitMode的问题。
//			  不过，加上有实体的事件的id，bug就消失了。
//			
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerCommandThread = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerCommandThread');
	
	
	
//#############################################################################
// ** 【标准模块】公共事件容器
//#############################################################################
//##############################
// * 容器 - 添加公共事件【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['type'] 字符串（填 公共事件 ，目前只有这一个选项）
//					> data['pipeType'] 字符串（填 并行/串行 ）
//					> data['commonEventId'] 数字（填 公共事件的id值）
//					> data['callBack_str'] 字符串（脚本指令，公共事件执行完毕后，回调的字符串脚本）
//			返回：	无
//			
//			说明：	> 按照参数对象执行函数即可，只能在地图界面执行。
//					> 注意，回调函数必须是字符串，不能为 函数对象，因为需要考虑存储数据问题。
//##############################
Game_Map.prototype.drill_LCT_addPipeEvent = function( data ){
	this.drill_LCT_addPipeEvent_private( data );
}


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LCT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LCT_pluginCommand.call(this, command, args);
	if( command === ">多线程" ){
		
		if(args.length == 4){		//>多线程 : 串行执行 : 公共事件[1]
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "串行执行" ){
				temp1 = temp1.replace("公共事件[","");
				temp1 = temp1.replace("]","");
				var data = {
					'type':"公共事件",
					'pipeType':"串行",
					'commonEventId':Number(temp1),
				};
				$gameMap.drill_LCT_addPipeEvent( data );
			}
			if( type == "并行执行" ){
				temp1 = temp1.replace("公共事件[","");
				temp1 = temp1.replace("]","");
				var data = {
					'type':"公共事件",
					'pipeType':"并行",
					'commonEventId':Number(temp1),
				};
				$gameMap.drill_LCT_addPipeEvent( data );
			}
		}
	}
}
	
	
//=============================================================================
// * 地图容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_LCT_map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_LCT_map_initialize.call(this);
    this._drill_LCT_pipeEventTank = [];
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_LCT_map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
	_drill_LCT_map_setupEvents.call(this);
    this._drill_LCT_pipeEventTank = [];
}
//==============================
// * 容器 - 添加公共事件（私有）
//
//			说明：	添加的格式为： { 'type':"公共事件", 'pipeType':"并行", 'commonEventId': Number(temp1)  };
//==============================
Game_Map.prototype.drill_LCT_addPipeEvent_private = function( data ){
	
	// > 校验
    var commonEvent = $dataCommonEvents[ data['commonEventId'] ];
    if( commonEvent == undefined ){
		
		alert( "【Drill_LayerCommandThread.js 地图 - 多线程】\n" +
				"参数错误，游戏中并不存在id为"+data['commonEventId']+"的公共事件。");
		return;
    }else if( commonEvent.list.length == 0 ){
		
		alert( "【Drill_LayerCommandThread.js 地图 - 多线程】\n" +
				"参数错误，游戏中id为"+data['commonEventId']+"的公共事件是空的，没有任何事件指令。");
		return;
	}
	
	// > 添加
	this._drill_LCT_pipeEventTank.push( new Drill_LCT_GamePipeEvent( data ) );
}
//==============================
// * 容器 - 自动清除
//==============================
var _drill_LCT_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ) {
	_drill_LCT_map_update.call( this, sceneActive );
	
	for( var i=this._drill_LCT_pipeEventTank.length-1; i >= 0; i-- ){
		var temp_event = this._drill_LCT_pipeEventTank[i];
		if( temp_event._drill_erased == true ){
			this._drill_LCT_pipeEventTank.splice(i,1);
			delete temp_event;
		}
	}
}
//==============================
// * 容器 - 获取容器
//==============================
Game_Map.prototype.drill_LCT_pipeEvents = function() {
	return this._drill_LCT_pipeEventTank;
}
//==============================
// * 容器 - 刷新（不需要）
//==============================
//var _drill_LCT_map_refresh = Game_Map.prototype.refresh;
//Game_Map.prototype.refresh = function() {
//    this.drill_LCT_pipeEvents().forEach(function(event) {
//        event.refresh();
//    });
//	_drill_LCT_map_refresh.call(this);
//};


//=============================================================================
// ** 地图界面捕获
//=============================================================================
//==============================
// * 串行捕获 - 事件输入栈
//==============================
var _drill_LCT_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent;
Game_Map.prototype.setupStartingMapEvent = function() {
	
	// > 依附事件
	var available_events = this._events.filter(function(event) {
		if( event == null ){ return false }
		if( event._erased == true ){ return false }
		return true;
	});
	if( available_events.length > 0 ){
		
		// > 管道事件
		var events = this.drill_LCT_pipeEvents();
		for(var i = 0; i < events.length; i++ ){
			var event = events[i];
			if( event.isStarting() ){
				event.clearStartingFlag();
				this._interpreter.setup( event.list(), available_events[available_events.length -1]._eventId );	//随机依附一个eventid（id为0玩家可以乱跑，不明原因）
				return true;
			}
		}
	}
	return _drill_LCT_setupStartingMapEvent.call(this);
};
//==============================
// * 串行捕获 - 事件start判断
//==============================
var _drill_LCT_isAnyEventStarting = Game_Map.prototype.isAnyEventStarting;
Game_Map.prototype.isAnyEventStarting = function() {	
	return	_drill_LCT_isAnyEventStarting.call(this) ||
			this.drill_LCT_pipeEvents().some(function(event) {
				return event.isStarting();
			});
};
//==============================
// * 并行捕获 - 事件帧刷新
//==============================
var _drill_LCT_updateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function() {
	_drill_LCT_updateEvents.call(this);
    this.drill_LCT_pipeEvents().forEach(function(event) {
        event.update();
    });
};


//=============================================================================
// ** 管道物体【Drill_LCT_GamePipeEvent】
//
//			说明：	用于构建 串行/并行 的小型事件，执行公共事件用。
//=============================================================================
//==============================
// * 管道物体 - 定义
//==============================
function Drill_LCT_GamePipeEvent() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 管道物体 - 初始化
//==============================
Drill_LCT_GamePipeEvent.prototype.initialize = function( data ) {
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();				//初始化数据
	this.drill_initObject();			//初始化对象
}
//==============================
// * 管道物体 - 帧刷新
//==============================
Drill_LCT_GamePipeEvent.prototype.update = function() {
	if( this._drill_erased == true ){ return; }
    this.drill_updateStart();			//帧刷新 - 串行开关
    this.drill_updateParallel();		//帧刷新 - 并行处理
}

//==============================
// * 初始化 - 数据
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	if( data['type'] == undefined ){ data['type'] = "公共事件" };					//物体类型
	if( data['pipeType'] == undefined ){ data['pipeType'] = "并行" };				//管道类型（串行/并行））
	if( data['commonEventId'] == undefined ){ data['commonEventId'] = 0 };			//公共事件id
	if( data['callBack_str'] == undefined ){ data['callBack_str'] = "" };			//回调函数
}
//==============================
// * 初始化 - 对象
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_initObject = function() {
	var data = this._drill_data;

	// > 私有对象初始化
	this._drill_erased = false;					//对象 - 删除
	this._drill_trigger = null;					//对象 - 触发方式（3自动执行，4并行处理）
	this._drill_starting = false;				//串行 - 输入栈的开关
	this._drill_startingSetuped = false;		//串行 - 输入栈设置
	this._drill_interpreter = null;				//并行 - 拦截器对象
	this._drill_interpreterSetuped = false;		//并行 - 拦截器设置
	
	// > 初始化
	if( data['pipeType'] == "串行" ){ this._drill_trigger = 3; }
	if( data['pipeType'] == "并行" ){ this._drill_trigger = 4; }
	if( this._drill_trigger === 3 ){
		this.start();
	}
    if( this._drill_trigger === 4 ){
        this._drill_interpreter = new Game_Interpreter();
    }
}
//==============================
// * 管道物体 - 事件页指令列表
//
//			说明：	返回格式： "list":[{"code":117,"indent":0,"parameters":[10]},……]
//==============================
Drill_LCT_GamePipeEvent.prototype.list = function() {
	
	// > 指令准备
	var result = [];
	var data = this._drill_data;
	
	// > 指令 - 执行公共事件
	if( data['type'] == "公共事件" ){
		var c_id = data['commonEventId'];
		var command = {"code":117,"indent":0,"parameters":[c_id] };
		result.push( command );
	}
	
	// > 指令 - 脚本（回调函数，只能存字符串，因为要考虑存储数据问题）
	if( typeof data['callBack_str'] === 'string' && data['callBack_str'] != "" ){
		var script_str = data['callBack_str'];
		var command = {"code":355,"indent":0,"parameters":[ script_str ] };
		result.push( command );
	}
	
	// > 指令 - 结尾指令
	var command = {"code":0,"indent":0,"parameters":[]};
	result.push( command );
	
	return result;
};

//==============================
// * 并行 - 帧刷新并行处理
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_updateParallel = function() {
    if( this._drill_trigger != 4 ){ return; }
    if( this._drill_interpreter == null ){ return };
	
	// > 设置
	if(!this._drill_interpreter.isRunning() ){
		if( this._drill_interpreterSetuped == false ){
			this._drill_interpreter.setup( this.list() );		//无eventid设置
			this._drill_interpreterSetuped = true;
		}
	}
	// > 帧刷新
	this._drill_interpreter.update();
	
	// > 运行判断
	if(!this._drill_interpreter.isRunning() ){
		if( this._drill_interpreterSetuped == true ){
			this._drill_interpreter = null;
			this._drill_erased = true;	//并行执行结束，清除
		}
	}
};

//==============================
// * 串行 - 帧刷新串行开关
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_updateStart = function() {
    if( this._drill_trigger != 3 ){ return; }
	
	// > 运行判断
	if( this._drill_startingSetuped == true && 
		this._drill_starting == false &&
		!$gameMap.isEventRunning() ){
		this._drill_erased = true;		//串行分配结束，清除
	}
};
//==============================
// * 串行 - 开始事件指令
//==============================
Drill_LCT_GamePipeEvent.prototype.start = function() {
	var list = this.list();
	if( list && list.length > 1 ){		//注意至少两条指令
		this._drill_starting = true;
		this._drill_startingSetuped = true;
	}
};
//==============================
// * 串行 - 是否正在阻塞
//==============================
Drill_LCT_GamePipeEvent.prototype.isStarting = function() {
    return this._drill_starting;
};
//==============================
// * 串行 - 清理阻塞状态
//==============================
Drill_LCT_GamePipeEvent.prototype.clearStartingFlag = function() {
    this._drill_starting = false;
};




