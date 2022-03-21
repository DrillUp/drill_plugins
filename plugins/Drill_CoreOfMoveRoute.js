//=============================================================================
// Drill_CoreOfMoveRoute.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        物体 - 移动路线核心
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
 *      也可以用插件 物体-移动路线指令集 的 ">指令集:上移:步数变量[n]" 实现。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 路线记忆
 * 部分有路线记忆的事件反而不易控制，你可以添加注释进行开关。
 * 
 * 事件注释：=>移动路线核心 : 路线记忆 : 关闭
 * 事件注释：=>移动路线核心 : 路线记忆 : 开启
 * 
 * 1.在指定事件中添加注释即可。
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
//		工作类型		持续执行
//		时间复杂度		o(n)*o(事件移动路线) 每帧
//		性能测试因素	鼠标管理层9个事件，消除砖块关卡125个事件
//		性能测试消耗	嵌套跳转执行递归：	15.75ms（平常）
//											235.41ms（消除砖块关卡，浏览器的帧数降到1，几乎无法游戏）
//						优化递归后：	26.25ms（9个下落事件，drill_COMR_skipToNext）
//										14.14ms（9个下落事件，processMoveCommand）
//										192.96ms（消除砖块关卡，浏览器的帧数能稳定到5，drill_COMR_skipToNext）
//		最坏情况		无
//		备注			插件原来是靠递归完成的，但是递归会造成性能测试非常难测。（函数记录太多，高配电脑也吃不消）
//						部分转成for循环之后，单从帧率上看，的确优化了许多。（高配电脑能稳定在18-20帧）
//
//插件记录：
//		★大体框架与功能如下：
//			移动路线核心：
//				->指令拦截
//					->执行移动路线指令（继承接口）
//					->阻止错误的脚本
//				->路线记忆
//					->记忆指令
//					->事件页刷新时复原
//					->清除记忆
//				->嵌套跳转
//					->进入下一个移动指令（接口）
//				->脚本转义
//					->多层转义指令（继承接口）
//					->上一条指令再执行n次
//
//		★必要注意事项：
//			1.initMembers函数中，this.event()未加载完全，还没有值。
//			2.嵌套跳转 - 进入下一个移动指令 是一个比较难缠的函数。
//			  留意原理以及说明，这一块对性能影响巨大。
//		
//		★其它说明细节：
//			1.字符串性能比较（执行150万次）：
//				"=="：8    ".substr(0,1) == "：48    ".match":116
//			  所以尽可能减少match函数的使用。
//
//		★核心接口说明：
//			1.该插件整合了移动路线的结构，提供了解析功能。
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
	

//=============================================================================
// ** 指令拦截（核心功能扩展）
//=============================================================================
//==============================
// * 指令 - 临时全局变量
//==============================
DrillUp.g_COMR_errorMsgTank = [];				//脚本拦截容器
//==============================
// * 指令 - 阻止
//==============================
var _drill_COMR_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
    var params = command.parameters;
	if( command.code == Game_Character.ROUTE_SCRIPT ){
		var temp_script = String(params[0]);
		
		// > 阻止 ">xxx"
		if( temp_script.substr(0,1) == ">" ){
			var args = temp_script.split(/[ :：]+/);
			var command = args.shift();
			
			// > 执行移动路线指令
			this.drill_COMR_routeCommand(command, args);
			
			return; 
		}
		
		// > 阻止 "没有括号的函数"
		if( temp_script.indexOf("=") == -1 && ( temp_script.indexOf("(") == -1 || temp_script.indexOf(")") == -1 ) ){
			var message = "【物体-移动路线核心】不能识别脚本：\""+ temp_script +"\"";
			if( DrillUp.g_COMR_errorMsgTank.indexOf(message) == -1 ){
				DrillUp.g_COMR_errorMsgTank.push(message);
				console.log("%c"+message, "color:#f67; font-size:14px;");
			}
			return; 
		}
	}
	_drill_COMR_processMoveCommand.call( this,command );
}
//==============================
// * 指令 - 执行移动路线指令（继承接口）
//
//			说明：	> 这里根据指令执行具体移动路线功能。
//					> 继承后，要返回0，返回1表示跳到下一条指令，返回-1表示 指令不识别 的提示。
//==============================
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	//（待子类继承写内容）
}


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
// * 嵌套跳转 - 进入下一个移动指令（接口）
//
//			原理：	> rmmv每帧只执行一条移动路线指令。
//					> (遇障碍结束)功能，要求如果遇到了障碍，这一帧不能浪费，而是直接跳转到下一条指令。
//
//			说明：	> rmmv可以不执行当前的移动指令，直接跳到下一个移动指令，
//					  但是这样非常容易死循环，系统卡死。
//					> 为了防止无限嵌套：
//					  - 重复的指令，直接跳过。
//					  - 每帧添加锁，该函数每帧最多被调用一次。
//					  - 用for循环，防止嵌套递归
//
//			用法：	该函数需要外部调用，调用后，可以立即跳转并执行下一条移动路线指令。
//==============================
Game_Character.prototype.drill_COMR_skipToNext = function() {
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


//=============================================================================
// ** 脚本转义（核心功能扩展）
//=============================================================================
//==============================
// * 脚本转义 - 自主移动 - 设置
//==============================
var _drill_COMR_setMoveRoute = Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function( moveRoute ){
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_setMoveRoute.call(this, moveRoute);
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
	var route_list = [];
	for( var k=0; k < org_route_list.length; k++ ){
		var temp_route = org_route_list[k];
		if( temp_route.code === Game_Character.ROUTE_SCRIPT ){
			var temp_script = temp_route.parameters[0];
			
			// > 移动路线指令
			if( temp_script.substr(0,1) == ">" ){
				var args = temp_script.split(/[:：]+/);
				var command = args.shift();
				var temp_count = org_route_list.length;
				
				// > 脚本转义 - 上一条指令执行n次
				this.drill_COMR_routeTransformCopy(command, args, route_list);
				
				// > 脚本转义 - 多层转义
				this.drill_COMR_routeTransform(command, args, route_list);
				
				// > 非脚本转义时，直接添加
				if( temp_count == org_route_list.length ){
					route_list.push(temp_route);
					this._drill_COMR_lastRoute = temp_route;
				}
				
			// > 普通脚本指令
			}else{
				route_list.push(temp_route);
				this._drill_COMR_lastRoute = temp_route;
			}
			
		// > 普通指令
		}else{
			route_list.push(temp_route);
			this._drill_COMR_lastRoute = temp_route;
		}
	}
	return route_list;
}
//==============================
// * 脚本转义 - 上一条指令执行n次
//==============================
Game_Character.prototype.drill_COMR_routeTransformCopy = function(command, args, route_list){
	var last_route = this._drill_COMR_lastRoute;
	
	if( command == ">核心" ){
		if( args.length == 2 ){
			var type = args[0];
			var temp1 = args[1];
			if( type == "上一条指令再执行" ){
				if( last_route == null ){ return; }
				
				if( temp1.indexOf("次数[") != -1 ){
					temp1 = temp1.replace("次数[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					for( var i=0; i < temp1; i++ ){
						route_list.push(last_route);
					}
					this._drill_COMR_lastRoute = null;	//（清空上一条指令）
					
					return;
				}else if( temp1.indexOf("次数变量[") != -1 ){
					temp1 = temp1.replace("次数变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					for( var i=0; i < temp1; i++ ){
						route_list.push(last_route);
					}
					this._drill_COMR_lastRoute = null;	//（清空上一条指令）
					
					return;
				}
			}
		}
	}
	
	if( command.substr(0,9) == ">上一条指令再执行" ){
		// > 旧指令 - 再执行n次
		if( command.match( /^>上一条指令再执行(\d+)次/ ) ){
			if( last_route == null ){ return; }
			for( var i=0; i < Number(RegExp.$1); i++ ){
				route_list.push(last_route);
			}
			this._drill_COMR_lastRoute = null;	//（清空上一条指令）
			return;
		}
		
		// > 旧指令 - 再执行变量n次
		if( command.match( /^>上一条指令再执行变量(\d+)值的次数/ ) ){
			if( last_route == null ){ return; }
			var v_value = $gameVariables.value( Number(RegExp.$1) );
			for( var i=0; i < v_value; i++ ){
				route_list.push(last_route);
			}
			this._drill_COMR_lastRoute = null;	//（清空上一条指令）
			return;
		}
	}
}
//==============================
// * 脚本转义 - 多层转义指令（继承接口）
//
//			说明：	你可以根据指令，来将指令转义成相应内容，并push到 route_list 中。
//==============================
Game_Character.prototype.drill_COMR_routeTransform = function(command, args, route_list){
	//（待子类继承写内容）
}


