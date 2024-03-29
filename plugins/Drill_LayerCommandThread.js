//=============================================================================
// Drill_LayerCommandThread.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        地图 - 多线程
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
 * 可作用于：
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
 * [v1.3]
 * 大幅度优化了内部结构。
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
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//
//			->☆管道容器
//				->添加公共事件【标准函数】
//				->帧刷新 自动销毁
//			->☆管道容器控制
//			->管道物体【Drill_LCT_GamePipeEvent】
//				->A主体
//				->B并行处理
//				->C串行处理
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 管道物体【Drill_LCT_GamePipeEvent】
//		
//		★必要注意事项：
//			1.简单来说，有list有interpreter就可以执行。
//			  串行就是使用map的interpreter，将list输入栈。
//			  并行就是event自带interpreter，然后update。
//			2.这里部分保持了原来的event结构，可见 C串行处理 。
//			  （不过貌似理解难度加大了，原来的脚本结构就是这样绕来绕去难理解……）
//			
//		★其它说明细节：
//			1.	2020/8/3
//			  原本的想法是，在event基础上new一个，然后嵌套。但是后来发现event的不确定性太多了，而且性能消耗巨大。
//			  编写一个管道物体进行辅助执行interpreter效果会好的多。而且有助于后期分离结构。
//			  插件和事件复制器没有任何关系。
//				2020/8/4
//			  并行能够完美运行了，但是串行的施法后可乱跑的bug仍然存在，而且好像还不是_waitMode的问题。
//			  不过，加上有实体的事件的id，bug就消失了。
//				2023/8/30
//			  将各个功能进行分类，标准化。
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
	DrillUp.g_LCT_PluginTip_curName = "Drill_LayerCommandThread.js 地图-多线程";
	DrillUp.g_LCT_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 参数不存在
	//==============================
	DrillUp.drill_LCT_getPluginTip_ErrorDataNull = function( commonEventId ){
		return "【" + DrillUp.g_LCT_PluginTip_curName + "】\n参数错误，游戏中并不存在id为"+commonEventId+"的公共事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 参数指向公共事件为空
	//==============================
	DrillUp.drill_LCT_getPluginTip_ErrorDataEmpty = function( commonEventId ){
		return "【" + DrillUp.g_LCT_PluginTip_curName + "】\n参数错误，游戏中id为"+commonEventId+"的公共事件是空的，没有任何事件指令。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerCommandThread = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerCommandThread');
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_LCT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LCT_pluginCommand.call(this, command, args);
	if( command === ">多线程" ){
		
		if( args.length == 4 ){		//>多线程 : 串行执行 : 公共事件[1]
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
				$gameMap.drill_LCT_addPipeEvent( data );
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
				$gameMap.drill_LCT_addPipeEvent( data );
			}
		}
	}
}
	
	
//#############################################################################
// ** 【标准模块】管道容器 ☆管道容器
//#############################################################################
//##############################
// * 管道容器 - 添加公共事件【标准函数】
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
// ** 管道容器（实现）
//=============================================================================
//==============================
// * 管道容器 - 初始化
//==============================
var _drill_LCT_map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_LCT_map_initialize.call(this);
    this._drill_LCT_pipeEventTank = [];
}
//==============================
// * 管道容器 - 切换地图时
//==============================
var _drill_LCT_map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
	_drill_LCT_map_setupEvents.call(this);
    this._drill_LCT_pipeEventTank = [];
}
//==============================
// * 管道容器 - 添加公共事件（私有）
//==============================
Game_Map.prototype.drill_LCT_addPipeEvent_private = function( data ){
	
	// > 校验
    var commonEvent = $dataCommonEvents[ data['commonEventId'] ];
    if( commonEvent == undefined ){
		alert( DrillUp.drill_LCT_getPluginTip_ErrorDataNull( data['commonEventId'] ) );
		return;
    }else if( commonEvent.list.length == 0 ){
		alert( DrillUp.drill_LCT_getPluginTip_ErrorDataEmpty( data['commonEventId'] ) );
		return;
	}
	
	// > 添加
	var pipe_event = new Drill_LCT_GamePipeEvent( data );
	this._drill_LCT_pipeEventTank.push( pipe_event );
}
//==============================
// * 管道容器 - 帧刷新 自动销毁
//==============================
var _drill_LCT_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ) {
	_drill_LCT_map_update.call( this, sceneActive );
	
	for(var i = this._drill_LCT_pipeEventTank.length-1; i >= 0; i-- ){
		var temp_event = this._drill_LCT_pipeEventTank[i];
		if( temp_event._drill_erased == true ){
			this._drill_LCT_pipeEventTank.splice(i,1);
			delete temp_event;
		}
	}
}



//=============================================================================
// ** ☆管道容器控制
//
//			说明：	> 此模块专门管理 管道容器 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管道容器控制 - 串行 - 事件执行队列
//==============================
var _drill_LCT_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent;
Game_Map.prototype.setupStartingMapEvent = function() {
	
	// > 有效事件（非空、未被清除 的事件）
	var available_events = this._events.filter(function(event) {
		if( event == null ){ return false }
		if( event._erased == true ){ return false }
		return true;
	});
	if( available_events.length > 0 ){
		
		// > 管道事件 依附
		//	 （随机依附一个eventid，依附的id为0时，玩家可以乱跑）
		for(var i = 0; i < this._drill_LCT_pipeEventTank.length; i++ ){
			var pipe_event = this._drill_LCT_pipeEventTank[i];
			if( pipe_event.isStarting() ){
				pipe_event.clearStartingFlag();
				this._interpreter.setup( pipe_event.list(), available_events[available_events.length -1]._eventId );
				return true;
			}
		}
	}
	
	// > 原函数
	return _drill_LCT_setupStartingMapEvent.call(this);
};
//==============================
// * 管道容器控制 - 串行 - 判断事件 执行中
//==============================
var _drill_LCT_isAnyEventStarting = Game_Map.prototype.isAnyEventStarting;
Game_Map.prototype.isAnyEventStarting = function() {
	var b = _drill_LCT_isAnyEventStarting.call( this );
	if( b == false ){
		
		// > 没有事件运行时，检查 管道容器
		for(var i = 0; i < this._drill_LCT_pipeEventTank.length; i++ ){
			var pipe_event = this._drill_LCT_pipeEventTank[i];
			if( pipe_event.isStarting() == true ){	//（有管道物体运行，则阻塞全部事件）
				return true;
			}
		}
	}
	return b;
};
//==============================
// * 管道容器控制 - 并行 - 事件帧刷新
//==============================
var _drill_LCT_updateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function() {
	_drill_LCT_updateEvents.call(this);
	
	for(var i = 0; i < this._drill_LCT_pipeEventTank.length; i++ ){
		var pipe_event = this._drill_LCT_pipeEventTank[i];
		pipe_event.drill_controller_update();
	}
};
//==============================
// * 管道容器控制 - 并行 - 刷新（不需要）
//==============================
//var _drill_LCT_map_refresh = Game_Map.prototype.refresh;
//Game_Map.prototype.refresh = function() {
//	（刷新操作）
//	_drill_LCT_map_refresh.call(this);
//};



//=============================================================================
// ** 管道物体【Drill_LCT_GamePipeEvent】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个构建 串行/并行 的小型事件，执行公共事件用。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->销毁
// **					->A主体
// **					->B并行处理
// **					->C串行处理
// **
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
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
Drill_LCT_GamePipeEvent.prototype.drill_controller_update = function(){
	if( this._drill_erased == true ){ return; }
    this.drill_controller_updateBlock();		//帧刷新 - C串行处理
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
Drill_LCT_GamePipeEvent.prototype.drill_controller_resetData = function( data ){
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
Drill_LCT_GamePipeEvent.prototype.drill_controller_initData = function() {
	var data = this._drill_data;
	
	if( data['type'] == undefined ){ data['type'] = "公共事件" };				//物体类型
	if( data['pipeType'] == undefined ){ data['pipeType'] = "并行" };			//管道类型（串行/并行）
	if( data['commonEventId'] == undefined ){ data['commonEventId'] = 0 };		//公共事件id
	if( data['callBack_str'] == undefined ){ data['callBack_str'] = "" };		//回调函数（只并行有效）
}
//==============================
// * 管道物体 - 初始化子功能
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initParallel();			//初始化子功能 - B并行处理
	this.drill_controller_initBlock();				//初始化子功能 - C串行处理
}
//==============================
// * 管道物体 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_controller_resetData_Private = function( data ){
	
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
Drill_LCT_GamePipeEvent.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	this._drill_erased = false;					//A主体 - 删除
	this._drill_trigger = 0;					//A主体 - 触发方式（3自动执行，4并行处理）
	
	// > 触发方式 初始化
	if( data['pipeType'] == "串行" ){ this._drill_trigger = 3; }
	if( data['pipeType'] == "并行" ){ this._drill_trigger = 4; }
}
//==============================
// * A主体 - 获取 事件页指令列表
//
//			说明：	> 返回格式： "list":[{"code":117,"indent":0,"parameters":[10]},……]
//==============================
Drill_LCT_GamePipeEvent.prototype.list = function() {
	
	// > 指令准备
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
Drill_LCT_GamePipeEvent.prototype.drill_controller_initParallel = function() {
	this._drill_interpreter = null;				//B并行处理 - 拦截器对象
	this._drill_interpreterSetuped = false;		//B并行处理 - 拦截器设置
	
	// > 拦截器对象 初始化
    if( this._drill_trigger === 4 ){
        this._drill_interpreter = new Game_Interpreter();
    }
}
//==============================
// * B并行处理 - 帧刷新并行处理
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_controller_updateParallel = function() {
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
			this._drill_erased = true;	//并行执行结束，销毁
		}
	}
};


//==============================
// * C串行处理 - 初始化子功能
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_controller_initBlock = function() {
	this._drill_starting = false;				//C串行处理 - 输入栈的开关
	this._drill_startingSetuped = false;		//C串行处理 - 输入栈设置
	
	// > 串行 初始化
	if( this._drill_trigger === 3 ){
		this.start();
	}
}
//==============================
// * C串行处理 - 帧刷新
//==============================
Drill_LCT_GamePipeEvent.prototype.drill_controller_updateBlock = function() {
    if( this._drill_trigger != 3 ){ return; }
	
	// > 运行判断
	if( this._drill_startingSetuped == true && 
		this._drill_starting == false &&
		!$gameMap.isEventRunning() ){
		this._drill_erased = true;		//串行分配结束，销毁
	}
};
//==============================
// * C串行处理 - 开始事件指令
//
//			说明：	> 此处的代码 与 事件的串行执行函数 保持一致。
//==============================
Drill_LCT_GamePipeEvent.prototype.start = function() {
	var list = this.list();
	if( list && list.length > 1 ){		//注意至少两条指令
		this._drill_starting = true;
		this._drill_startingSetuped = true;
	}
};
//==============================
// * C串行处理 - 是否正在阻塞
//==============================
Drill_LCT_GamePipeEvent.prototype.isStarting = function() {
    return this._drill_starting;
};
//==============================
// * C串行处理 - 清理阻塞状态
//==============================
Drill_LCT_GamePipeEvent.prototype.clearStartingFlag = function() {
    this._drill_starting = false;
};




