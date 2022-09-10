//=============================================================================
// Drill_CoreOfMoveRoute.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        移动路线 - 移动路线核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfMoveRoute +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件用于防止部分错误的移动路线指令拖慢游戏速度。
 * ★★必须放在所有 物体类型 插件的最前面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 该插件为基础核心，可以作用于下列插件。
 * 作用于：
 *   - Drill_RouteCommandGroup   移动路线-指令集
 *   - Drill_RouteAlongTheWall   移动路线-贴墙移动路线
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、事件指令的移动路线设置。
 * 脚本拦截：
 *   (1.插件可以防止错误的路线指令频繁输出错误信息，拖慢游戏速度。
 * 路线记忆：
 *   (1.事件自主移动时，切换事件页后，指令会重置。
 *      开启路线记忆后，事件页切换不会重置移动路线。
 *   (2.考虑到部分有路线记忆的事件反而不易控制。
 *      你可以使用事件注释 关闭/开启 路线记忆。
 * 特殊指令：
 *   (1.">核心:上一条指令再执行:次数[n]"指令可以实现上一条移动路线指令执行多次。
 * 旧版本：
 *   (1.旧版本的 移动路线核心 是包含指令集和路线记忆的各项功能的。
 *      新版本考虑到 插件性能优化 因素，所以将上述两大功能分离成了两个插件。
 *   (2.注意，部分旧版本的移动路线指令被修改为新的格式，
 *      比如 "上移10步" 被改为 ">指令集:上移:步数[n]" 。
 *      请用新的格式来写移动路线，因为旧的格式会增加性能消耗负担。
 * 设计：
 *   (1.如果你希望事件根据变量值走n步，
 *      可以用 "向上移动" 和 ">核心:上一条指令再执行:次数变量[n]" 组合实现。
 *      也可以用插件 移动路线-指令集 的 ">指令集:上移:步数变量[n]" 实现。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 路线记忆
 * 部分有路线记忆的事件反而不易控制，你可以添加注释进行开关。
 * 
 * 事件注释：=>移动路线核心 : 路线记忆 : 关闭
 * 事件注释：=>移动路线核心 : 路线记忆 : 开启
 * 
 * 插件指令：>移动路线核心 : 本事件 : 重置路线记忆
 * 插件指令：>移动路线核心 : 事件[10] : 重置路线记忆
 * 插件指令：>移动路线核心 : 事件变量[21] : 重置路线记忆
 * 插件指令：>移动路线核心 : 批量事件[10,11] : 重置路线记忆
 * 插件指令：>移动路线核心 : 批量事件变量[21,22] : 重置路线记忆
 * 
 * 1.在指定事件中添加注释即可。
 * 2.如果你的事件设置了位移，并且切换了事件页，可能会由于路线记忆，
 *   事件仍然会保持上一次的路线记忆，按照原来的走法移动。
 *   如果你希望事件位移后，重置路线记忆，调用插件指令即可重置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 特殊指令
 * 你可以设置移动路线的特殊指令：
 * 
 * 移动路线指令：>核心:上一条指令再执行:次数[n]
 * 移动路线指令：>核心:上一条指令再执行:次数变量[n]
 * 
 * 1.注意，原指令 和 该指令的执行，一共会执行 n+1 次。
 * 2.如果没有上一条指令，或者上一条指令就是"上一条指令"，则没有任何效果。
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
 * 时间复杂度： o(n)*o(事件移动路线) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【15.75ms】
 *              100个事件的地图中，平均消耗为：【13.53ms】
 *               50个事件的地图中，平均消耗为：【13.49ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件分离后，核心本身消耗的性能不大，因为只提供基础的路线脚本功能。
 * 3.旧版本的插件在消除砖块设计关卡中消耗为 143.69ms 。
 *   经过优化后，降低到了 122.96ms，
 *   并且优化后，明显不会再出现第一次进入鼠标管理层卡爆的问题了。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了错误处理。
 * [v1.2]
 * 添加了 移动n步遇障碍结束 的功能。
 * [v1.3]
 * 添加了地图活动镜头的缩放兼容。
 * [v1.4]
 * 修复了插件导致 事件跳跃 插件不能跳跃的bug。
 * [v1.5]
 * 添加了 位置 移动路线指令。
 * [v1.6]
 * 添加了 上一条指令再执行变量n值的次数 移动路线指令。
 * [v1.7]
 * 分离了核心插件中的 指令集 功能，将移动路线核心的基础功能重新整理规划。
 * [v1.8]
 * 优化了内部接口结构。
 * [v1.9]
 * 添加了路线记忆重置的功能。
 * [v2.0]
 * 修改了插件分类。
 * 
 * 
 * @param 是否开启路线记忆
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 当事件页从1切换到2，再切换回1，如果关闭记忆，移动路线会被重置。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COMR (Core_Of_Move_Route)
//		临时全局变量	DrillUp.g_COMR_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(事件移动路线) 每帧
//		★性能测试因素	鼠标管理层9个事件，消除砖块关卡125个事件
//		★性能测试消耗	嵌套跳转执行递归：	15.75ms（平常）
//											235.41ms（消除砖块关卡，浏览器的帧数降到1，几乎无法游戏）
//						优化递归后：	26.25ms（9个下落事件，drill_COMR_skipToNext）
//										14.14ms（9个下落事件，processMoveCommand）
//										192.96ms（消除砖块关卡，浏览器的帧数能稳定到5，drill_COMR_skipToNext）
//		★最坏情况		无
//		★备注			高配电脑能稳定在18-20帧。
//		
//		★优化记录		
//			2022/5/1优化
//				插件原来是靠递归完成的，但是递归会造成性能测试非常难测。（函数记录太多，高配电脑也吃不消）
//				部分转成for循环之后，单从帧率上看，的确优化了许多。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			移动路线核心：
//				->脚本转义
//					->执行转义【标准接口】
//					->提交转义【标准函数】
//					->上一条指令再执行n次
//				->指令拦截
//					->执行指令【标准接口】
//					->阻止错误的脚本
//				->嵌套跳转
//					->进入下一个移动指令【标准函数】
//				->路线记忆
//					->记忆指令
//					->事件页刷新时复原
//					->清除记忆
//
//		★必要注意事项：
//			1.移动路线指令的执行流程如下：
//				脚本转义阶段 -> 执行转义【标准接口】 -> 指令执行阶段 -> 执行指令【标准接口】
//			2.嵌套跳转 - 进入下一个移动指令 是一个比较难缠的函数。
//			  留意原理以及说明，这一块对性能影响巨大。
//		
//		★其它说明细节：
//			1.字符串性能比较（执行150万次）：
//				"=="：8    ".substr(0,1) == "：48    ".match":116
//			  所以尽可能减少match函数的使用。
//			2.initMembers函数中，this.event()未加载完全，还没有值。
//
//		★核心接口说明：
//			1.核心中含有 标准接口/标准函数 ，这是其它子插件的底座，无论核心内容怎么变，标准接口一定不能动。
//			2.路线记忆 是一个附属的小功能，不具备标准接口。
//			
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfMoveRoute = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfMoveRoute');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_COMR_remainRoute = String(DrillUp.parameters["是否开启路线记忆"] || "true") === "true";

	
//#############################################################################
// ** 标准接口（脚本转义阶段）
//
//			说明：	即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 脚本转义阶段 - 执行转义【标准接口】
//					
//			参数：	> command 字符串   （当前的指令）
//					> args 字符串列表  （当前的参数列表）
//					> this._drill_COMR_tran_curData 动态参数对象（后续更新在该对象提供更多数据）
//					> this._drill_COMR_tran_curData['lastRoute'] 移动路线（上一条的移动路线指令）
//					> this._drill_COMR_tran_curData['curRouteList'] 移动路线列表（此移动路线之前所有的移动路线列表）
//			返回：	> 无
//					
//			说明：	> 此函数，能够识别指定的 移动路线指令，并转义成其他移动路线指令。
//					> 如果成功转义，需要调用函数： this.drill_COMR_routeSubmit_Transform( [] );
//					  若未调用此函数，则会进入后面阶段执行指令阶段。
//			示例：	> 具体应用，可见当前插件的函数： _drill_COMR_routeTransform_copy
//##############################
Game_Character.prototype.drill_COMR_routeTransform = function( command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 脚本转义阶段 - 提交转义【标准函数】
//
//			参数：	> submit_route_list 移动路线列表（当前的移动路线，可以转义成多个其他移动路线指令）
//			返回：	> 无
//					
//			说明：	> 此函数只在 转义字符阶段 有效。
//##############################
Game_Character.prototype.drill_COMR_routeSubmit_Transform = function( submit_route_list ){
	this._drill_COMR_tran_success = true;
	this._drill_COMR_tran_routes = submit_route_list;
}

//#############################################################################
// ** 标准接口（指令执行阶段）
//#############################################################################
//##############################
// * 指令执行阶段 - 执行指令【标准接口】
//				
//			参数：	> command 字符串   （当前的指令）
//					> args 字符串列表  （当前的参数列表）
//					> this._drill_COMR_cmd_curData 动态参数对象（后续更新在该对象提供更多数据）
//			返回：	> 无
//					
//			说明：	> 与插件指令类似，执行移动路线指令。
//			示例：	> 具体应用，可见插件： 移动路线指令集
//##############################
Game_Character.prototype.drill_COMR_routeCommand = function( command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 指令执行阶段 - 进入下一个移动指令【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 该函数调用后，可以立即跳转并执行下一条移动路线指令。
//					> 多用于 遇障碍结束 的条件移动。
//##############################
Game_Character.prototype.drill_COMR_skipToNext = function(){
	this.drill_COMR_skipToNext_Private();
}


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_COMR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COMR_pluginCommand.call(this, command, args);
	if( command === ">移动路线核心" ){
		
		/*-----------------对象组获取------------------*/
		var char_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( char_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_COMR_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_COMR_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_COMR_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_COMR_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
		}
			
		/*-----------------对象组获取------------------*/
		if( char_list != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "重置路线记忆" ){	
				for( var i=0; i < char_list.length; i++ ){
					char_list[i].drill_COMR_clearCheck();	//清理记忆
					char_list[i]._moveRouteIndex = 0;		//重刷路线索引
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_COMR_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_CoreOfMoveRoute.js 移动路线 - 移动路线核心】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// * 物体参数初始化
//=============================================================================
var _drill_COMR_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_COMR_c_initialize.call(this);
	
	// > 路线记忆
	this._drill_COMR_memoryData = {};
	this._drill_COMR_memoryData['enable'] = DrillUp.g_COMR_remainRoute;		//路线记忆 - 开关
	this._drill_COMR_memoryData['inited'] = false;							//路线记忆 - 初始化开关
	this._drill_COMR_memoryData['mrList'] = [];								//路线记忆 - 路线列表
	this._drill_COMR_memoryData['lastPage'] = 0;							//路线记忆 - 上一个事件页
	this._drill_COMR_memoryData['lastIndex'] = 0;							//路线记忆 - 上一个移动路线索引
	
	// > 嵌套跳转
	this._drill_COMR_skipData = {};
	this._drill_COMR_skipData['isInOneUpdate'] = true;						//嵌套跳转 - 每帧标记
	this._drill_COMR_skipData['isSkiping'] = false;							//嵌套跳转 - 正在跳转循环中
}


//=============================================================================
// ** 指令拦截（核心功能扩展）
//=============================================================================
//==============================
// * 指令执行阶段 - 临时全局变量
//==============================
DrillUp.g_COMR_errorMsgTank = [];				//脚本拦截容器
//==============================
// * 指令执行阶段 - 添加拦截的指令
//==============================
DrillUp.drill_COMR_addScript = function( temp_script ){
	var message = "【移动路线-移动路线核心】不能识别脚本：\""+ temp_script +"\"";
	if( DrillUp.g_COMR_errorMsgTank.indexOf(message) == -1 ){
		DrillUp.g_COMR_errorMsgTank.push(message);
		console.log("%c"+message, "color:#f67; font-size:14px;");
	}
};
//==============================
// * 指令执行阶段 - 阻止
//==============================
var _drill_COMR_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function( command ){
    var params = command.parameters;
	if( command.code == Game_Character.ROUTE_SCRIPT ){
		var temp_script = String(params[0]);
		
		// > 阻止 ">xxx"
		if( temp_script.substr(0,1) == ">" ){
			var args = temp_script.split(/[ :：]+/);
			var command = args.shift();
				
			// > 可用参数 初始化
			this._drill_COMR_cmd_curData = {};
			
			
			// > 执行 子函数
			this.drill_COMR_routeCommand( command, args );
			
			
			return; 
		}
		
		// > 阻止 "没有括号的函数"
		if( temp_script.indexOf("=") == -1 && ( temp_script.indexOf("(") == -1 || temp_script.indexOf(")") == -1 ) ){
			DrillUp.drill_COMR_addScript( temp_script );
			return; 
		}
	}
	_drill_COMR_processMoveCommand.call( this,command );
}


//=============================================================================
// ** 核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 移动路线初始优化
//
//			说明：	在执行setMoveRoute时，初始化原移动路线。（此操作防止_originalMoveRoute为空 报错。）
//==============================
var _drill_COMR_setMoveRoute = Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function( moveRoute ){
	if( !this._moveRouteForcing ){
		_drill_COMR_setMoveRoute.call( this, moveRoute );
	}else{
		this._originalMoveRoute = moveRoute;
		this._originalMoveRouteIndex = 0;
	}
};


//=============================================================================
// ** 脚本转义阶段（核心功能扩展）
//=============================================================================
//==============================
// * 脚本转义 - 自主移动 - 设置
//==============================
var _drill_COMR_setMoveRoute2 = Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function( moveRoute ){
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_setMoveRoute2.call(this, moveRoute);
};
//==============================
// * 脚本转义 - 强制路线 - 执行路线
//==============================
var _drill_COMR_forceMoveRoute = Game_Character.prototype.forceMoveRoute;
Game_Character.prototype.forceMoveRoute = function( moveRoute ){
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_forceMoveRoute.call(this, moveRoute);
};
//==============================
// * 脚本转义 - 修改路线内容
//
//			说明：	> 这里将原路线指令遍历一遍，并且将部分 特殊指令 替换成新的 指令集。
//					> 替换后和替换前的 指令集数量 可以不一样。
//==============================
Game_Character.prototype.drill_COMR_scriptTransform = function( org_route_list ){
	this._drill_COMR_lastRoute = null;
	
	// > 脚本转义
	var new_route_list = [];
	for( var k=0; k < org_route_list.length; k++ ){
		var temp_route = org_route_list[k];
		if( temp_route.code === Game_Character.ROUTE_SCRIPT ){
			var temp_script = temp_route.parameters[0];
			
			// > 移动路线指令
			if( temp_script.substr(0,1) == ">" ){
				var args = temp_script.split(/[:：]+/);
				var command = args.shift();
				var temp_count = org_route_list.length;
				
				// > 提交数据 初始化
				this._drill_COMR_tran_success = false;
				this._drill_COMR_tran_routes = null;
				
				// > 可用参数 初始化
				this._drill_COMR_tran_curData = {};
				this._drill_COMR_tran_curData['lastRoute'] = this._drill_COMR_lastRoute;
				this._drill_COMR_tran_curData['curRouteList'] = new_route_list;
				
				
				// > 执行 子函数
				this.drill_COMR_routeTransform( command, args );
				
				
				// > 提交转义时，添加内容
				if( this._drill_COMR_tran_success == true ){
					for( var j = 0; j < this._drill_COMR_tran_routes.length; j++ ){
						var route = this._drill_COMR_tran_routes[j];
						new_route_list.push(route);
						this._drill_COMR_lastRoute = route;
					}
					
				// > 未提交，直接添加
				}else{
					new_route_list.push(temp_route);
					this._drill_COMR_lastRoute = temp_route;
				}
				
			// > 普通脚本指令
			}else{
				new_route_list.push(temp_route);
				this._drill_COMR_lastRoute = temp_route;
			}
			
		// > 普通指令
		}else{
			new_route_list.push(temp_route);
			this._drill_COMR_lastRoute = temp_route;
		}
	}
	return new_route_list;
}
//==============================
// * 脚本转义 - 上一条指令执行n次
//==============================
var _drill_COMR_routeTransform_copy = Game_Character.prototype.drill_COMR_routeTransform;
Game_Character.prototype.drill_COMR_routeTransform = function( command, args ){
	_drill_COMR_routeTransform_copy.call( this, command, args );
	
	if( command == ">核心" ){
		if( args.length == 2 ){
			var type = args[0];
			var temp1 = args[1];
			if( type == "上一条指令再执行" ){
				var last_route = this._drill_COMR_tran_curData['lastRoute'];
				if( last_route == null ){ return; }
				
				if( temp1.indexOf("次数[") != -1 ){
					temp1 = temp1.replace("次数[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var route_list = [];
					for( var i=0; i < temp1; i++ ){
						route_list.push(last_route);
					}
					this.drill_COMR_routeSubmit_Transform( route_list );
					return;
					
				}else if( temp1.indexOf("次数变量[") != -1 ){
					temp1 = temp1.replace("次数变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					var route_list = [];
					for( var i=0; i < temp1; i++ ){
						route_list.push(last_route);
					}
					this.drill_COMR_routeSubmit_Transform( route_list );
					return;
				}
			}
		}
	}
	
	if( command.substr(0,9) == ">上一条指令再执行" ){
		
		// > 旧指令 - 再执行n次
		if( command.match( /^>上一条指令再执行(\d+)次/ ) ){
			var last_route = this._drill_COMR_tran_curData['lastRoute'];
			if( last_route == null ){ return; }
			var route_list = [];
			for( var i=0; i < Number(RegExp.$1); i++ ){
				route_list.push(last_route);
			}
			this.drill_COMR_routeSubmit_Transform( route_list );
			return;
		}
		
		// > 旧指令 - 再执行变量n次
		if( command.match( /^>上一条指令再执行变量(\d+)值的次数/ ) ){
			var last_route = this._drill_COMR_tran_curData['lastRoute'];
			if( last_route == null ){ return; }
			var v_value = $gameVariables.value( Number(RegExp.$1) );
			var route_list = [];
			for( var i=0; i < v_value; i++ ){
				route_list.push(last_route);
			}
			this.drill_COMR_routeSubmit_Transform( route_list );
			return;
		}
	}
}


//=============================================================================
// ** 嵌套跳转
//=============================================================================
//==============================
// * 嵌套跳转 - 每帧设置
//==============================
var _drill_COMR_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function() {
	this._drill_COMR_skipData['isInOneUpdate'] = true;	//（每帧开启跳转功能）
	_drill_COMR_updateRoutineMove.call( this );
}
//==============================
// * 嵌套跳转 - 进入下一个移动指令
//
//			原理：	> 每帧只执行一条移动路线指令。
//					> (遇障碍结束)功能，要求如果遇到了障碍，这一帧不能浪费，而是直接跳转到下一条指令。
//
//			说明：	> 可以不执行当前的移动指令，直接跳到下一个移动指令，
//					  但是这样非常容易死循环，系统卡死。
//					> 为了防止无限嵌套：
//					  - 重复的指令，直接跳过。
//					  - 每帧添加锁，该函数每帧最多被调用一次。
//					  - 用for循环，防止嵌套递归
//==============================
Game_Character.prototype.drill_COMR_skipToNext_Private = function() {
	var data = this._drill_COMR_skipData;
	
	// > 嵌套递归标记
	data['isSkiping'] = true;
	
	// > 嵌套跳转锁
	if( data['isInOneUpdate'] == false ){ return; }
	data['isInOneUpdate'] = false;	
	
	// > 嵌套递归（for循环代替真实递归）
	var list_count = this._moveRoute.list.length;
	for( var i=0; i < 3; i++ ){
		
		// > 寻找下一条不重复的指令
		var cur_index = this._moveRouteIndex;
		var cur_command = this._moveRoute.list[ cur_index ];	
		for(var j=0; j < list_count; j++){
			
			// > 索引+1
			cur_index += 1;
			
			// > 若 指令循环 则索引从零再开始
			if( this._moveRoute.repeat && cur_index >= list_count-1 ){
				cur_index = 0;
			}
			
			// > 重复的，继续循环
			var next_command = this._moveRoute.list[ cur_index ];
			if( next_command.code == 45 && cur_command.code == 45 &&
				next_command.parameters[0] == cur_command.parameters[0] ){
				continue;
				
			// > 非重复的，跳出循环
			}else{
				break;	
			}
		}
		
		// > 重复的指令索引，直接放弃跳转
		if( this._moveRouteIndex == cur_index ){
			return;
		}
		
		// > 转移到该索引
		this._moveRouteIndex = cur_index;
		
		// > 进入下一个指令
		data['isSkiping'] = false;	//（根据嵌套递归标记，确定是否放弃跳转）
		var next_command = this._moveRoute.list[this._moveRouteIndex];
		this.processMoveCommand( next_command );
		if( data['isSkiping'] == false ){ return; }
	}
}


//=============================================================================
// ** 路线记忆标记
//=============================================================================
//==============================
// * 物体 - 事件注释初始化
//==============================
var _drill_COMR_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_COMR_initMembers.call(this);
	this._drill_COMR_isFirstBirth = true;
};
var _drill_COMR_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_COMR_setupPage.call(this);
    this.drill_COMR_setupPage();
};
Game_Event.prototype.drill_COMR_setupPage = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_COMR_isFirstBirth ){ 
		this._drill_COMR_isFirstBirth = false;
		this.drill_COMR_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_COMR_readPage( this.list() );
	}
}
//==============================
// * 物体 - 读取注释
//==============================
Game_Event.prototype.drill_COMR_readPage = function( page_list ) {		
	page_list.forEach( function(l){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>移动路线核心" ){
				if( args.length == 4 ){		//=>移动路线核心 : 路线记忆 : 关闭
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "路线记忆" ){
						if( temp2 == "开启" ){
							this._drill_COMR_memoryData['enable'] = true;
						}
						if( temp2 == "关闭" ){
							this._drill_COMR_memoryData['enable'] = false;
						}
					}
				}
			};
		};
	}, this);
};

//=============================================================================
// ** 路线记忆
//=============================================================================
//==============================
// * 路线记忆 - 刷新事件页
//==============================
var _drill_COMR_ev_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function() {
	
	// > 路线初始化
	this.drill_COMR_initCheck();
	
	// > 记录旧路线
	this._drill_COMR_memoryData['lastPage'] = this._pageIndex;			//当前事件页
	this._drill_COMR_memoryData['lastIndex'] = this._moveRouteIndex;	//当前移动路线索引
	
	// > 刷新事件页
	_drill_COMR_ev_refresh.call(this);
	
	// > 刷新新路线
	this.drill_COMR_refreshChange();
}
//==============================
// * 路线记忆 - 路线初始化
//==============================
Game_Event.prototype.drill_COMR_initCheck = function() {
	var data = this._drill_COMR_memoryData;
	if( data['inited'] == true ){ return; }
	data['inited'] = true;
	
	this.drill_COMR_clearCheck();
}
//==============================
// * 路线记忆 - 清理全部记忆（接口）
//==============================
Game_Event.prototype.drill_COMR_clearCheck = function() {
	var data = this._drill_COMR_memoryData;
	data['mrList'] = [];
	var ev_data = this.event();
	if( ev_data ){
		var pages = ev_data.pages;
		for (var i = 0; i < pages.length; i++) {
			var page = pages[i];
			var mr = {};
			mr._index = 0;
			data['mrList'][i] = mr;		//（容器中暂时只有 mr:{ _index:0 } 一个参数）
		}
	}
}
//==============================
// * 路线记忆 - 刷新新路线
//==============================
Game_Event.prototype.drill_COMR_refreshChange = function() {
	var data = this._drill_COMR_memoryData;
	if( data['enable'] == false ){ return; }
	
	// > 如果 新旧路线 处于同一个事件页，则不操作
	var old_page = data['lastPage'];
	var new_page = this._erased ? -1 : this.findProperPageIndex();
	if( new_page < 0 ){ return; }
	if( old_page < 0 ){ return; }
	if( old_page === new_page ){ return; }
	
	// > 不同时，存储 旧路线 的位置
	data['mrList'][ old_page ]._index = data['lastIndex'];
	var new_mIndex = data['mrList'][ new_page ]._index || 0;
	if( new_mIndex < this._moveRoute.list.length ){
		this._moveRouteIndex = new_mIndex;
	}
}

