//=============================================================================
// Drill_CoreOfMoveRoute.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        物体 - 移动路线核心
 * @author Drill_up
 *
 *
 * @param 是否开启路线记忆
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 当事件页从1切换到2，再切换回1，如果关闭记忆，移动路线会被重置。
 * @default true
 *
 * @param 接近到重叠位置时是否停下
 * @type boolean
 * @on 停下
 * @off 随机移动
 * @desc 使用接近玩家/接近事件时，如果已经在目标位置下并且重叠，该事件停下。
 * @default true
 *
 * @param 接近/远离时是否随机
 * @type boolean
 * @on 随机
 * @off 固定
 * @desc 当接近/远离有两种方向选择时，事件会随机选择一个方向移动。
 * @default true
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfMoveRoute +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件用于防止部分错误的路线指令拖慢游戏速度。
 * 以及提供一些特别的路线指令设置。
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
 * 指令集：
 *   (1.后面提供了许多方便的 移动路线脚本。注意，是移动路线的脚本。
 *      打开移动路线后，点击脚本，输入中文即可。
 *   (2."遇障碍结束"表示：如果移动遇到障碍，则当前这条指令直接无效，
 *      进入下一条指令。功能与"无法移动时跳过指令"相似，但是这里的
 *      指令不会产生过多的等待时间。
 *   (3.">>上一条指令再执行n次"指令可以实现上一条移动路线指令执行多次。
 * 设计：
 *   (1.该核心提供了接近鼠标、接近位置功能，你可以通过这种方式，实现
 *      鼠标控制特定的事件。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 以下为移动路线脚本快速指令，以及一些新加的功能指令：
 * 
 * 移动路线脚本：>上移n步
 * 移动路线脚本：>下移n步
 * 移动路线脚本：>左移n步
 * 移动路线脚本：>右移n步
 * 移动路线脚本：>左下移n步
 * 移动路线脚本：>左上移n步
 * 移动路线脚本：>右下移n步
 * 移动路线脚本：>右上移n步
 * 移动路线脚本：>前进n步
 * 移动路线脚本：>后退n步
 * 移动路线脚本：>上移n步(遇障碍结束)
 * 移动路线脚本：>下移n步(遇障碍结束)
 * 移动路线脚本：>左移n步(遇障碍结束)
 * 移动路线脚本：>右移n步(遇障碍结束)
 * 移动路线脚本：>左下移n步(遇障碍结束)
 * 移动路线脚本：>左上移n步(遇障碍结束)
 * 移动路线脚本：>右下移n步(遇障碍结束)
 * 移动路线脚本：>右上移n步(遇障碍结束)
 * 移动路线脚本：>前进n步(遇障碍结束)
 * 移动路线脚本：>后退n步(遇障碍结束)
 * 
 * 移动路线脚本：>随机移动
 * 移动路线脚本：>随机移动n步
 * 移动路线脚本：>随机移动(只横向)
 * 移动路线脚本：>随机移动(只纵向)
 * 
 * 移动路线脚本：>接近玩家
 * 移动路线脚本：>接近玩家n步
 * 移动路线脚本：>接近玩家(只横向)
 * 移动路线脚本：>接近玩家(只纵向)
 * 移动路线脚本：>远离玩家
 * 移动路线脚本：>远离玩家n步
 * 移动路线脚本：>远离玩家(只横向)
 * 移动路线脚本：>远离玩家(只纵向)
 * 
 * 移动路线脚本：>接近鼠标
 * 移动路线脚本：>接近鼠标n步
 * 移动路线脚本：>接近鼠标(只横向)
 * 移动路线脚本：>接近鼠标(只纵向)
 * 移动路线脚本：>远离鼠标
 * 移动路线脚本：>远离鼠标n步
 * 移动路线脚本：>远离鼠标(只横向)
 * 移动路线脚本：>远离鼠标(只纵向)
 * 
 * 移动路线脚本：>接近事件[10]
 * 移动路线脚本：>接近事件[10]n步
 * 移动路线脚本：>接近事件[10](只横向)
 * 移动路线脚本：>接近事件[10](只纵向)
 * 移动路线脚本：>接近事件变量[10]
 * 移动路线脚本：>接近事件变量[10]n步
 * 移动路线脚本：>接近事件变量[10](只横向)
 * 移动路线脚本：>接近事件变量[10](只纵向)
 * 移动路线脚本：>远离事件[10]
 * 移动路线脚本：>远离事件[10]n步
 * 移动路线脚本：>远离事件[10](只横向)
 * 移动路线脚本：>远离事件[10](只纵向)
 * 移动路线脚本：>远离事件变量[10]
 * 移动路线脚本：>远离事件变量[10]n步
 * 移动路线脚本：>远离事件变量[10](只横向)
 * 移动路线脚本：>远离事件变量[10](只纵向)
 * 
 * 移动路线脚本：>接近位置[30,32]
 * 移动路线脚本：>接近位置[30,32]n步
 * 移动路线脚本：>接近位置[30,32](只横向)
 * 移动路线脚本：>接近位置[30,32](只纵向)
 * 移动路线脚本：>接近位置变量[25,26]
 * 移动路线脚本：>接近位置变量[25,26]n步
 * 移动路线脚本：>接近位置变量[25,26](只横向)
 * 移动路线脚本：>接近位置变量[25,26](只纵向)
 * 移动路线脚本：>远离位置[30,32]
 * 移动路线脚本：>远离位置[30,32]n步
 * 移动路线脚本：>远离位置[30,32](只横向)
 * 移动路线脚本：>远离位置[30,32](只纵向)
 * 移动路线脚本：>远离位置变量[25,26]
 * 移动路线脚本：>远离位置变量[25,26]n步
 * 移动路线脚本：>远离位置变量[25,26](只横向)
 * 移动路线脚本：>远离位置变量[25,26](只纵向)
 * 
 * 1."接近事件"后的数字，表示事件id。
 *   "接近事件变量"后的数字，表示变量的值对应的事件id。
 * 2.只横向/只纵向一般用于不封路却专门拦住玩家的事件。
 * 3."遇障碍结束"表示，如果移动遇到障碍，则当前这条指令直接无效，
 *   进入下一条指令。功能与"无法移动时跳过指令"相似，但是这里的
 *   指令不会产生额外等待时间。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 保持距离
 * 你可以设置事件之间保持某个距离值。
 * 
 * 移动路线脚本：>与玩家保持距离4
 * 移动路线脚本：>与玩家保持距离5
 * 移动路线脚本：>与鼠标保持距离4
 * 移动路线脚本：>与鼠标保持距离5
 * 移动路线脚本：>与事件[10]保持距离4
 * 移动路线脚本：>与事件[10]保持距离5
 * 移动路线脚本：>与事件变量[10]保持距离4
 * 移动路线脚本：>与事件变量[10]保持距离5
 * 
 * 1.距离范围为菱形区域，距离值为保持的菱形区域的距离大小。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 特殊指令
 * 你可以设置移动路线的特殊指令：
 * 
 * 移动路线脚本：>>上一条指令再执行n次
 * 
 * 1.注意，由于指令特殊需要区分开，这里前缀为两个">"。
 *   原指令和指令再执行n次，一共执行了n+1次。
 * 2.如果没有上一条指令，或者上一条指令就是该指令，则没有任何效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 路线记忆开关
 * 部分有路线记忆的事件反而不易控制，你可以添加注释进行开关。
 * 
 * 事件注释：=>移动路线核心 : 路线记忆 : 关闭
 * 事件注释：=>移动路线核心 : 路线记忆 : 开启
 * 
 * 1.在指定事件中添加注释即可。
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
 * 测试方法：   消除砖块设计关卡。
 * 测试结果：   150个事件的地图中，平均消耗为：【143.69ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.该插件并不消耗多少性能，因为只提供单一的快捷路线脚本功能。
 * 3.由于消除砖块设计关卡中，大量事件使用"移动12步(遇障碍结束)"指令，
 *   而且是循环不断地执行指令，使得低配电脑会有些吃不消。
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
//		性能测试因素	125个事件
//		性能测试消耗	15.75ms
//						嵌套跳转执行递归：235.41ms（浏览器的帧数降到1，几乎无法游戏）
//		最坏情况		无
//		备注			整个插件几乎没有循环，都是原生设置上扩展。
//						不知道会不会增加其他插件的负担。
//		
//
//插件记录：
//		★大体框架与功能如下：
//			移动路线核心：
//				->脚本拦截
//					->阻止错误的脚本
//				->路线记忆
//					->记忆指令
//					->事件页刷新时复原
//					->清除记忆
//				->嵌套跳转
//					->进入下一个移动指令
//				->脚本转义（指令集）
//					->遇障碍结束
//					->接近/远离
//						->接近玩家
//						->接近鼠标
//						->接近事件
//						->接近位置
//						->接近(只横向)
//						->接近(只纵向)
//					->保持距离
//
//		★必要注意事项：
//			1.initMembers函数中，this.event()未加载完全，还没有值。
//			2.嵌套-进入下一个移动指令 是一个比较难缠的函数。
//			  留意原理以及说明，这一块对性能影响巨大。
//		
//		★其它说明细节：
//			1.注意匹配顺序，">接近玩家n步" 要放在 ">接近玩家" 前面。
//
//		★核心接口说明：
//			1.该插件准确地说，【不是一个标准的核心】。
//			  没有对外接口。
//			  扩展的功能碎片非常多，只是一个功能合集插件。
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
    DrillUp.g_COMR_towardStop = String(DrillUp.parameters["接近到重叠位置时是否停下"] || "true") === "true";
    DrillUp.g_COMR_towardRandom = String(DrillUp.parameters["接近/远离时是否随机"] || "true") === "true";
    DrillUp.g_COMR_remainRoute = String(DrillUp.parameters["是否开启路线记忆"] || "true") === "true";
	
	/*-----------------临时全局变量------------------*/
	DrillUp.g_COMR_errorMsgTank = [];				//脚本拦截容器
	DrillUp.g_COMR_skip_checkDevOpen = false;		//嵌套跳转开关


//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _drill_COMR_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_COMR_c_initialize.call(this);
	this._drill_COMR = {};				
	this._drill_COMR['remain_enable'] = DrillUp.g_COMR_remainRoute;		//路线记忆 - 开关
	this._drill_COMR['remain_mrListNeedInit'] = true;					//路线记忆 - 索引初始化开关
	this._drill_COMR['remain_mrList'] = [];								//路线记忆 - 索引初始化
	this._drill_COMR['remain_lastPage'] = 0;							//路线记忆 - 上一个事件页
	this._drill_COMR['remain_lastIndex'] = 0;							//路线记忆 - 上一个索引
	this._drill_COMR['skip_count'] = 0;									//嵌套跳转 - 计数器
}
//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 注释初始化
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
// * 读取注释
//==============================
Game_Event.prototype.drill_COMR_readPage = function( page_list ) {		
	page_list.forEach( function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>移动路线核心"){
				if(args.length == 4){	//=>移动路线核心 : 路线记忆 : 关闭
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "路线记忆" ){
						if( temp2 == "关闭" ){
							this._drill_COMR['remain_enable'] = false;
						}
						if( temp2 == "开启" ){
							this._drill_COMR['remain_enable'] = true;
						}
					}
				}
			};
		};
	}, this);
};


//=============================================================================
// ** 脚本拦截
//=============================================================================
//==============================
// * 脚本拦截 - 阻止
//==============================
var _drill_COMR_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
    var params = command.parameters;
	if( command.code == Game_Character.ROUTE_SCRIPT ){		//阻止">xxx"和"没有括号的函数"
		var temp_script = params[0];
		if( temp_script.substr(0,1) == ">" ){
			var message = "【物体-移动路线核心】不能识别指令：\""+ temp_script +"\"";
			if( DrillUp.g_COMR_errorMsgTank.indexOf(message) == -1 ){
				DrillUp.g_COMR_errorMsgTank.push(message);
				console.log("%c"+message, "color:#f67; font-size:14px;");
			}
			return; 
		}
		if( temp_script.indexOf("=") == -1 && ( temp_script.indexOf("(") == -1 || temp_script.indexOf(")") == -1 ) ){
			var message = "【物体-移动路线核心】不能识别指令：\""+ temp_script +"\"";
			if( DrillUp.g_COMR_errorMsgTank.indexOf(message) == -1 ){
				DrillUp.g_COMR_errorMsgTank.push(message);
				console.log("%c"+message, "color:#f67; font-size:14px;");
			}
			return; 
		}
	}
	_drill_COMR_processMoveCommand.call( this,command );
}

//=============================================================================
// ** 路线记忆
//=============================================================================
//==============================
// * 路线记忆 - 刷新事件页
//==============================
var _drill_COMR_ev_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function() {
	// > 索引初始化
	this.drill_COMR_mrListInit();
	// > 索引记录
	var data = this._drill_COMR;
	data['remain_lastPage'] = this._pageIndex;
	data['remain_lastIndex'] = this._moveRouteIndex;
	
	// > 刷新事件页
	_drill_COMR_ev_refresh.call(this);
	
	// > 修正索引
	this.drill_COMR_mrsChangeIndex();
}
//==============================
// * 路线记忆 - 索引初始化
//==============================
Game_Event.prototype.drill_COMR_mrListInit = function() {
	var data = this._drill_COMR;
	if( data['remain_mrListNeedInit'] == false ){ return }
	data['remain_mrListNeedInit'] = false;
	
	data['remain_mrList'] = [];
	var ev_data = this.event();
	if( ev_data ){
		var pages = ev_data.pages;
		for (var i = 0; i < pages.length; i++) {
			var page = pages[i];
			var mr = {};
			mr._index = 0;
			data['remain_mrList'][i] = mr;	//（容器中暂时只有 mr:{ _index:0 } 一个参数）
		}
	}
}
//==============================
// * 路线记忆 - 修正索引
//==============================
Game_Event.prototype.drill_COMR_mrsChangeIndex = function() {
	var data = this._drill_COMR;
	if( data['remain_enable'] == false ){ return }
	
	var old_page = data['remain_lastPage'];
	var new_page = this._erased ? -1 : this.findProperPageIndex();
	if( new_page < 0 ){ return; }
	if( old_page < 0 ){ return; }
	if( old_page === new_page ){ return; }
	
	data['remain_mrList'][ old_page ]._index = data['remain_lastIndex'];	//存储旧移动路线的顺序
	var new_mIndex = data['remain_mrList'][ new_page ]._index || 0;
	if( new_mIndex < this._moveRoute.list.length ){
		this._moveRouteIndex = new_mIndex;
	}
}


//=============================================================================
// * 嵌套跳转
//=============================================================================
//==============================
// * 嵌套 - 帧刷新
//==============================
var _drill_COMR_c_update = Game_CharacterBase.prototype.update;	//注意，不是Game_Character.prototype.update（该写法会造成跳跃指令失效）
Game_CharacterBase.prototype.update = function() {
	this._drill_COMR['skip_count'] = 0;
	_drill_COMR_c_update.call(this);
}
//==============================
// * 嵌套 - 检查F8按下
//==============================
var _drill_COMR_c_onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function( event ){
	_drill_COMR_c_onKeyDown.call(this,event);
	
    //if( !event.ctrlKey && !event.altKey ){		//测试状态才激活
	//	if( event.keyCode == 119 ){ // F8
	//		DrillUp.g_COMR_skip_checkDevOpen = true;
	//	}
	//	if( event.keyCode == 123 ){ // F12
	//		DrillUp.g_COMR_skip_checkDevOpen = true;
	//	}
    //}
};
//==============================
// * 嵌套 - 进入下一个移动指令
//
//			说明：该函数需要外部调用，调用后，可以立即跳转并执行下一条移动路线指令。
//==============================
Game_Character.prototype.drill_COMR_skipToNext = function() {
	if( DrillUp.g_COMR_skip_checkDevOpen == true ){ return; }
	//嵌套由来：
	//		1.rmmv每帧只执行一条移动路线指令。
	//		2.(遇障碍结束)功能，要求如果遇到了障碍，这一帧不能浪费，而是直接跳转到下一条指令。
	//嵌套说明：
	//		1.rmmv可以不执行当前的移动指令，之间跳到下一个移动指令，但是非常容易死循环，系统卡死。
	//		2.打开开发工具后，必须关闭该函数。（因为会严重拖慢游戏速度）
	//			require('nw.gui').Window.get().isDevToolsOpen(); 在mv1.52以下才有效，检查是否开启工具包
	//		3.为了防止无限嵌套：
	//			- 这里使用 this._drill_COMR['skip_count'] 制约。
	//			- 重复的(遇障碍结束)的指令，也不判断了，直接跳过。（第一个指令不通过，后面的一定都不通过）
	
	// > 重复指令跳过
	var len = this._moveRoute.list.length;
	var last_command = this._moveRoute.list[this._moveRouteIndex];	
	for(var i=0; i < len; i++){
		// > 当前索引+1
		this._moveRouteIndex += 1;
        if (this._moveRoute.repeat && this._moveRouteIndex >= len-1 ) {
            this._moveRouteIndex = 0;
			break;
        }
		// > 判断重复的移动路线
		var cur_command = this._moveRoute.list[this._moveRouteIndex];
		if( cur_command.code == 45 && last_command.code == 45 &&
			cur_command.parameters[0] == last_command.parameters[0] ){
			continue;
		}else{
			break;	
		}
	}
	
	// > 进入下一个指令
	var cur_command = this._moveRoute.list[this._moveRouteIndex];
	if( cur_command && this._drill_COMR['skip_count'] < 1 ){
		this._drill_COMR['skip_count'] += 1;
		this.processMoveCommand(cur_command);				//（command反复eval会极大地消耗性能）
	}
}


//=============================================================================
// ** 脚本转义
//=============================================================================
//==============================
// * 脚本转义 - 事件默认路线
//==============================
var _drill_COMR_setMoveRoute = Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function( moveRoute ) {
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_setMoveRoute.call(this, moveRoute);
};
//==============================
// * 脚本转义 - 函数设置路线
//==============================
var _drill_COMR_forceMoveRoute = Game_Character.prototype.forceMoveRoute;
Game_Character.prototype.forceMoveRoute = function(moveRoute) {
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_forceMoveRoute.call(this, moveRoute);
};
//==============================
// * 脚本转义 - 修改路线内容
//==============================
Game_Character.prototype.drill_COMR_scriptTransform = function(route_list) {
	
	// > 特殊指令 - 上一个脚本执行N次
	var last_route = null;
	var route_list_ex = [];
	for(var k=0; k<route_list.length; k++){
		var temp_route = route_list[k];
		if (temp_route.code === 45) {		//脚本
			var temp_script = temp_route.parameters[0];
			if (temp_script.match( /^>>上一条指令再执行(\d+)次/ )) {
				if( last_route != null ){
					for (var i=0; i < Number(RegExp.$1); i++){
						route_list_ex.push(last_route);
					}
				}
			}else{
				route_list_ex.push(temp_route);
			}
		}else{
			route_list_ex.push(temp_route);
		}
		last_route = temp_route;
	}
	
	// > 普通指令
	var r_list = [];
	for(var k=0; k < route_list_ex.length; k++){
		var temp_route = route_list_ex[k];
		if (temp_route.code === 45) {		//脚本
			var temp_script = temp_route.parameters[0];
			if (temp_script.match( /^(下移|>下移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveStraight(2);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(左移|>左移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveStraight(4);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(右移|>右移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveStraight(6);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(上移|>上移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveStraight(8);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(左下移|>左下移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveDiagonally(4, 2);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(右下移|>右下移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveDiagonally(6, 2);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(右上移|>右上移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveDiagonally(6, 8);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(左上移|>左上移)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveDiagonally(4, 8);";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(前进|>前进)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveStraight(this.direction());";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(后退|>后退)(\d+)步\(遇障碍结束\)/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveStraight(this.reverseDir(this.direction()));";
					r_list.push({code:45,parameters:[_script] });
				}
				
			} else if (temp_script.match( /^(下移|>下移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:1});
				}
			} else if (temp_script.match( /^(左移|>左移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:2});
				}
			} else if (temp_script.match( /^(右移|>右移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:3});
				}
			} else if (temp_script.match( /^(上移|>上移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:4});
				}
			} else if (temp_script.match( /^(左下移|>左下移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:5});
				}
			} else if (temp_script.match( /^(右下移|>右下移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:6});
				}
			} else if (temp_script.match( /^(右上移|>右上移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:7});
				}
			} else if (temp_script.match( /^(左上移|>左上移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:8});
				}
			} else if (temp_script.match( /^(前进|>前进)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:12});
				}
			} else if (temp_script.match( /^(后退|>后退)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:13});
				}
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(随机移动|>随机移动)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:9});
				}
			} else if (temp_script.match( /^(随机移动\(只横向\)|>随机移动\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveRandom_X();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(随机移动\(只纵向\)|>随机移动\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveRandom_Y();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(随机移动|>随机移动)/ )) {	
				r_list.push({code:9});
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近玩家|>接近玩家)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:10});
				}
			} else if (temp_script.match( /^(接近玩家\(只横向\)|>接近玩家\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_X($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近玩家\(只纵向\)|>接近玩家\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_Y($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近玩家|>接近玩家)/ )) {
				r_list.push({code:10});
			} else if (temp_script.match( /^(远离玩家|>远离玩家)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:11});
				}
			} else if (temp_script.match( /^(远离玩家\(只横向\)|>远离玩家\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_X($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离玩家\(只纵向\)|>远离玩家\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_Y($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离玩家|>远离玩家)/ )) {
				r_list.push({code:11});
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveTowardCharacter($gameMap.event("+Number(RegExp.$2)+"));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_X($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_Y($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\]/ )) {
				var _script = "this.moveTowardCharacter($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveAwayFromCharacter($gameMap.event("+Number(RegExp.$2)+"));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_X($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_Y($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\]/ )) {
				var _script = "this.moveAwayFromCharacter($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveTowardCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_X($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_Y($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\]/ )) {
				var _script = "this.moveTowardCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveAwayFromCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_X($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_Y($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\]/ )) {
				var _script = "this.moveAwayFromCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近位置|>接近位置)\[(\d+),(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$4); i++){
					var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
					var _script = "this.moveTowardCharacter( "+pos+" );";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近位置|>接近位置)\[(\d+),(\d+)\]\(只横向\)/ )) {
				var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
				var _script = "this.drill_COMR_moveTowardCharacter_X( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近位置|>接近位置)\[(\d+),(\d+)\]\(只纵向\)/ )) {
				var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
				var _script = "this.drill_COMR_moveTowardCharacter_Y( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近位置|>接近位置)\[(\d+),(\d+)\]/ )) {
				var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
				var _script = "this.moveTowardCharacter( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离位置|>远离位置)\[(\d+),(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$4); i++){
					var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
					var _script = "this.moveAwayFromCharacter( "+pos+" );";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离位置|>远离位置)\[(\d+),(\d+)\]\(只横向\)/ )) {
				var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
				var _script = "this.drill_COMR_moveAwayCharacter_X( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离位置|>远离位置)\[(\d+),(\d+)\]\(只纵向\)/ )) {
				var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
				var _script = "this.drill_COMR_moveAwayCharacter_Y( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离位置|>远离位置)\[(\d+),(\d+)\]/ )) {
				var pos = "{'x':"+Number(RegExp.$2)+",'y':"+Number(RegExp.$3)+"}"
				var _script = "this.moveAwayFromCharacter( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近位置变量|>接近位置变量)\[(\d+),(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$4); i++){
					var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
					var _script = "this.moveTowardCharacter( "+pos+" );";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近位置变量|>接近位置变量)\[(\d+),(\d+)\]\(只横向\)/ )) {
				var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
				var _script = "this.drill_COMR_moveTowardCharacter_X( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近位置变量|>接近位置变量)\[(\d+),(\d+)\]\(只纵向\)/ )) {
				var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
				var _script = "this.drill_COMR_moveTowardCharacter_Y( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近位置变量|>接近位置变量)\[(\d+),(\d+)\]/ )) {
				var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
				var _script = "this.moveTowardCharacter( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离位置变量|>远离位置变量)\[(\d+),(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$4); i++){
					var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
					var _script = "this.moveAwayFromCharacter( "+pos+" );";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离位置变量|>远离位置变量)\[(\d+),(\d+)\]\(只横向\)/ )) {
				var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
				var _script = "this.drill_COMR_moveAwayCharacter_X( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离位置变量|>远离位置变量)\[(\d+),(\d+)\]\(只纵向\)/ )) {
				var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
				var _script = "this.drill_COMR_moveAwayCharacter_Y( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离位置变量|>远离位置变量)\[(\d+),(\d+)\]/ )) {
				var pos = "{'x':$gameVariables.value("+Number(RegExp.$2)+"),'y':$gameVariables.value("+Number(RegExp.$3)+")}"
				var _script = "this.moveAwayFromCharacter( "+pos+" );";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近鼠标|>接近鼠标)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveTowardMouse();";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近鼠标\(只横向\)|>接近鼠标\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveTowardMouse_X();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近鼠标\(只纵向\)|>接近鼠标\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveTowardMouse_Y();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近鼠标|>接近鼠标)/ )) {
				var _script = "this.drill_COMR_moveTowardMouse();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离鼠标|>远离鼠标)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveAwayMouse();";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离鼠标\(只横向\)|>远离鼠标\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveAwayMouse_X();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离鼠标\(只纵向\)|>远离鼠标\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveAwayMouse_Y();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离鼠标|>远离鼠标)/ )) {
				var _script = "this.drill_COMR_moveAwayMouse();";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			
			
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(与玩家保持距离|>与玩家保持距离)(\d+)/ )) {
				var _script = "this.drill_COMR_keepDistance($gamePlayer,"+Number(RegExp.$2)+");";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(与鼠标保持距离|>与鼠标保持距离)(\d+)/ )) {
				var _script = "this.drill_COMR_mouseKeepDistance("+Number(RegExp.$2)+");";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(与事件|>与事件)\[(\d+)\]保持距离(\d+)/ )) {
				var _script = "this.drill_COMR_keepDistance($gameMap.event("+Number(RegExp.$2)+"),"+Number(RegExp.$3)+");";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(与事件变量|>与事件变量)\[(\d+)\]保持距离(\d+)(\d+)/ )) {
				var _script = "this.drill_COMR_keepDistance($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")),"+Number(RegExp.$3)+");";
				r_list.push({code:45,parameters:[_script] });
			
			//-----------------------------------------------------------------------------
			} else {
				r_list.push(temp_route);
			}
		} else {
			r_list.push(temp_route);
		}
	}
	return r_list;
};

//=============================================================================
// * 遇障碍结束
//=============================================================================
//==============================
// * 路线动作 - 直线移动
//==============================
Game_Character.prototype.drill_COMR_moveStraight = function(d) {
	if( this.canPass(this._x, this._y, d) ){
		this.moveStraight(d);
	}else{
		this.drill_COMR_skipToNext();
	}
};
//==============================
// * 路线动作 - 对角移动
//==============================
Game_Character.prototype.drill_COMR_moveDiagonally = function(horz, vert) {
	if( this.canPassDiagonally(this._x, this._y, horz, vert) ){
		this.moveDiagonally(horz, vert);
	}else{
		this.drill_COMR_skipToNext();
	}
};

//=============================================================================
// * 接近/远离
//=============================================================================
//==============================
// * 路线动作 - 接近（修正）
//==============================
var _drill_COMR_moveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
Game_Character.prototype.moveTowardCharacter = function(character) {
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		if( DrillUp.g_COMR_towardStop ){
			return;
		}else{
			this.moveRandom();
			return;
		}
	}
	if( DrillUp.g_COMR_towardRandom ){
		if( sx != 0 && sy != 0 ){
			if ( !this.canPass(this.x, this.y, sx > 0 ? 4 : 6) && !this.canPass(this.x, this.y, sy > 0 ? 8 : 2) ) {
				return;
			}
			if( Math.randomInt(2) == 0 ){
				this.moveStraight(sx > 0 ? 4 : 6);
				if (!this.isMovementSucceeded() && sy !== 0) {
					this.moveStraight(sy > 0 ? 8 : 2);
				}
			}else{
				this.moveStraight(sy > 0 ? 8 : 2);
				if (!this.isMovementSucceeded() && sx !== 0) {
					this.moveStraight(sx > 0 ? 4 : 6);
				}
			}
			return;
		}
	}
	_drill_COMR_moveTowardCharacter.call(this,character);
}
//==============================
// * 路线动作 - 接近（只X/只Y）
//==============================
Game_Character.prototype.drill_COMR_moveTowardCharacter_X = function(character) {
    var sx = this.deltaXFrom(character.x);
	if( sx == 0 ){
		this.turnTowardCharacter(character);
	}else{
		this.moveStraight(sx > 0 ? 4 : 6);
	}
};
Game_Character.prototype.drill_COMR_moveTowardCharacter_Y = function(character) {
    var sy = this.deltaYFrom(character.y);
	if( sy == 0 ){
		this.turnTowardCharacter(character);
	}else{
		this.moveStraight(sy > 0 ? 8 : 2);
	}
}
//==============================
// * 路线动作 - 远离（修正）
//==============================
var _drill_COMR_moveAwayFromCharacter = Game_Character.prototype.moveAwayFromCharacter;
Game_Character.prototype.moveAwayFromCharacter = function(character) {
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		this.moveRandom();
		return;
	}
	if( DrillUp.g_COMR_towardRandom ){
		if( sx != 0 && sy != 0 ){
			if ( !this.canPass(this.x, this.y, sx > 0 ? 6 : 4) && !this.canPass(this.x, this.y, sy > 0 ? 2 : 8) ) {
				return;
			}
			if( Math.randomInt(2) == 0 ){
				this.moveStraight(sx > 0 ? 6 : 4);
				if (!this.isMovementSucceeded() && sy !== 0) {
					this.moveStraight(sy > 0 ? 2 : 8);
				}
			}else{
				this.moveStraight(sy > 0 ? 2 : 8);
				if (!this.isMovementSucceeded() && sx !== 0) {
					this.moveStraight(sx > 0 ? 6 : 4);
				}
			}
			return;
		}
	}
	_drill_COMR_moveAwayFromCharacter.call(this,character);
}
//==============================
// * 路线动作 - 远离（只X/只Y）
//==============================
Game_Character.prototype.drill_COMR_moveAwayCharacter_X = function(character) {
    var sx = this.deltaXFrom(character.x);
	this.moveStraight(sx > 0 ? 6 : 4);
};
Game_Character.prototype.drill_COMR_moveAwayCharacter_Y = function(character) {
    var sy = this.deltaYFrom(character.y);
	this.moveStraight(sy > 0 ? 2 : 8);
}

//==============================
// * 路线动作 - 随机（只X/只Y）
//==============================
Game_Character.prototype.drill_COMR_moveRandom_X = function() {
    var d = 4 + Math.randomInt(2) * 2;
    if (this.canPass(this.x, this.y, d)) {
        this.moveStraight(d);
    }
};
Game_Character.prototype.drill_COMR_moveRandom_Y = function() {
    var d = 2 + Math.randomInt(2) * 6;
    if (this.canPass(this.x, this.y, d)) {
        this.moveStraight(d);
    }
};

//==============================
// * 路线动作 - 鼠标接近
//==============================
Game_Character.prototype.drill_COMR_moveTowardMouse = function() {
	var m = this.drill_COMR_getMousePoint();
	this.moveTowardCharacter(m);
}
Game_Character.prototype.drill_COMR_moveTowardMouse_X = function() {
	var m = this.drill_COMR_getMousePoint();
	this.drill_COMR_moveTowardCharacter_X(m);
}
Game_Character.prototype.drill_COMR_moveTowardMouse_Y = function() {
	var m = this.drill_COMR_getMousePoint();
	this.drill_COMR_moveTowardCharacter_Y(m);
}
//==============================
// * 路线动作 - 鼠标远离
//==============================
Game_Character.prototype.drill_COMR_moveAwayMouse = function() {
	var m = this.drill_COMR_getMousePoint();
	this.moveAwayFromCharacter(m);
}
Game_Character.prototype.drill_COMR_moveAwayMouse_X = function() {
	var m = this.drill_COMR_getMousePoint();
	this.drill_COMR_moveAwayCharacter_X(m);
}
Game_Character.prototype.drill_COMR_moveAwayMouse_Y = function() {
	var m = this.drill_COMR_getMousePoint();
	this.drill_COMR_moveAwayCharacter_Y(m);
}

//=============================================================================
// ** 保持距离
//=============================================================================
//==============================
// * 路线动作 - 保持距离
//==============================
Game_Character.prototype.drill_COMR_keepDistance = function(character, distance) {
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		this.moveRandom();
	}
	if( Math.abs(sx) + Math.abs(sy) == distance ){
		this.turnTowardCharacter(character);
	}
	if( Math.abs(sx) + Math.abs(sy) > distance ){
		this.moveTowardCharacter(character);
	}
	if( Math.abs(sx) + Math.abs(sy) < distance ){
		this.moveAwayFromCharacter(character);
	}
}
//==============================
// * 路线动作 - 鼠标保持距离
//==============================
Game_Character.prototype.drill_COMR_mouseKeepDistance = function(distance) {
	var m = this.drill_COMR_getMousePoint();
	this.drill_COMR_keepDistance(m,distance);
}


//=============================================================================
// ** 鼠标 - 获取点
//=============================================================================
Game_Character.prototype.drill_COMR_getMousePoint = function() {
	// > 鼠标坐标
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	if( Imported.Drill_LayerCamera ){		//镜头缩放
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );	
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );	
	}
	// > 坐标转换
	var m = {}
	m.x = Math.floor( $gameMap._displayX + mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + mouse_y / $gameMap.tileHeight() );
	
	return m;
}
//=============================================================================
// ** 鼠标 - 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}
if( typeof(_drill_touchPad_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_touchPad_getCurPos = TouchInput._onTouchMove;
	TouchInput._onTouchMove = function(event) {
		_drill_touchPad_getCurPos.call(this,event);	//触屏位置
			
		if(event.changedTouches && event.changedTouches[0]){
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
	};
}
