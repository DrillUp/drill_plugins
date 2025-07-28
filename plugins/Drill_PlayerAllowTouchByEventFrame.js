//=============================================================================
// Drill_PlayerAllowTouchByEventFrame.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 允许鼠标点击行走图寻路
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerAllowTouchByEventFrame +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件可以使得鼠标点击指定事件的行走图后，寻路到该事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_PlayerAllowMove             互动-允许操作玩家移动
 *   - Drill_CoreOfEventFrameWithMouse   行走图-行走图与鼠标控制核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于玩家、事件。
 * 2.详细去看看文档："10.互动 > 关于允许操作移动.docx"。
 * 细节：
 *   (1.该插件文字描述可能不太好理解，去看看文档的图，就能理解了。
 *   (2.玩家寻路：指玩家用鼠标点击地图的图块时，会跳出一个目的地指向标。
 *      然后玩家移动到目的地指向标。
 *   (3.如果事件的行走图很大，点击后，目的地会出现在行走图的身后。
 *      寻路操作有点不合适。
 *      此插件可以使得目的地切换到该事件的脚下，来实现寻路并接触事件。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要给事件绑定功能：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>允许鼠标点击行走图寻路 : 开启
 * 事件注释：=>允许鼠标点击行走图寻路 : 关闭
 * 
 * 事件注释：=>允许鼠标点击行走图寻路 : 寻路偏移 : 相对图块位置[-1,0]
 * 
 * 1.该注释跨事件页，将注释写在第一页就能生效。
 * 2.行走图被点击后，寻路位置会在事件脚下。
 *   如果你想偏移到其它地方，可以再加"寻路偏移"的注释。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制总开关：
 * 
 * 插件指令：>允许鼠标点击行走图寻路 : 总开关 : 开启
 * 插件指令：>允许鼠标点击行走图寻路 : 总开关 : 关闭
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
 * 时间复杂度： o(n)
 * 测试方法：   去允许操作管理层、动画序列小房间进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件使用核心提供的 鼠标悬停结果 来判断是否点击行走图，
 *   所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
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
//		插件简称		PAlTBEF (Player_Allow_Touch_By_Event_Frame)
//		临时全局变量	DrillUp.g_PAlTBEF_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	动画序列小房间
//		★性能测试消耗	2025/7/8：
//							》常规遍历：（鼠标实时监听）
//								0.6ms、1.2ms（drill_PAlTBEF_updateRestatistics）
//		★最坏情况		无
//		★备注			该插件的功能，只使用鼠标碰撞体的结果，产生不了多少消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆事件注释
//			
//			->☆行走图的属性
//			->☆事件容器
//			->☆寻路管理
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
	DrillUp.g_PAlTBEF_PluginTip_curName = "Drill_PlayerAllowTouchByEventFrame.js 互动-允许鼠标点击行走图寻路";
	DrillUp.g_PAlTBEF_PluginTip_baseList = [
		"Drill_PlayerAllowMove.js 互动-允许操作玩家移动",
		"Drill_CoreOfEventFrameWithMouse.js 行走图-行走图与鼠标控制核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PAlTBEF_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PAlTBEF_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PAlTBEF_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PAlTBEF_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PAlTBEF_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PlayerAllowTouchByEventFrame = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerAllowTouchByEventFrame');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PAlTBEF_enabled = String(DrillUp.parameters["初始是否允许"] || "true") == "true"; 
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_PlayerAllowMove &&
	Imported.Drill_CoreOfEventFrameWithMouse ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PAlTBEF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PAlTBEF_pluginCommand.call(this, command, args);
	this.drill_PAlTBEF_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PAlTBEF_pluginCommand = function( command, args ){
	if( command === ">允许鼠标点击行走图寻路" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "总开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_PAlTBEF_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_PAlTBEF_enabled = false;
				}
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
DrillUp.g_PAlTBEF_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlTBEF_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PAlTBEF_sys_initialize.call(this);
	this.drill_PAlTBEF_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAlTBEF_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PAlTBEF_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PAlTBEF_saveEnabled == true ){	
		$gameSystem.drill_PAlTBEF_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PAlTBEF_initSysData();
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
Game_System.prototype.drill_PAlTBEF_initSysData = function() {
	this.drill_PAlTBEF_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PAlTBEF_checkSysData = function() {
	this.drill_PAlTBEF_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PAlTBEF_initSysData_Private = function() {
	
	this._drill_PAlTBEF_enabled = DrillUp.g_PAlTBEF_enabled;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PAlTBEF_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PAlTBEF_enabled == undefined ){
		this.drill_PAlTBEF_initSysData();
	}
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_PAlTBEF_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_PAlTBEF_event_initMembers.call(this);
	this._drill_PAlTBEF_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_PAlTBEF_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_PAlTBEF_event_setupPage.call(this);
    this.drill_PAlTBEF_setupSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_PAlTBEF_setupSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_PAlTBEF_isFirstBirth == true ){ 
		this._drill_PAlTBEF_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_PAlTBEF_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_PAlTBEF_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_PAlTBEF_readPage = function( page_list ){
	
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>允许鼠标点击行走图寻路" ){
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "开启" ){
						this.drill_PAlTBEF_setDataEnabled( true );
					}
					if( type == "关闭" ){
						this.drill_PAlTBEF_setDataEnabled( false );
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "寻路偏移" ){
						temp1 = temp1.replace("相对图块位置[","");
						temp1 = temp1.replace("]","");
						var pos = temp1.split(/[,，]/);
						if( pos.length >=2 ){
							this.drill_PAlTBEF_setDataOffset( Number(pos[0]), Number(pos[1]) );
						}
					}
				}
			};
		};
	}, this);
};



//=============================================================================
// ** ☆行走图的属性
//
//			说明：	> 此模块专门定义 行走图的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图的属性 - 初始化
//==============================
var _drill_PAlTBEF_mouse_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_PAlTBEF_mouseData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PAlTBEF_mouse_initialize.call(this);
}
//==============================
// * 行走图的属性 - 初始化 数据（私有）
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：mouseData，一对一。
//==============================
Game_Character.prototype.drill_PAlTBEF_checkData = function(){	
	if( this._drill_PAlTBEF_mouseData != undefined ){ return; }
	
	// > 执行绑定【行走图 - 行走图与鼠标控制核心】
	this.drill_COEFWM_checkData();
	
	this._drill_PAlTBEF_mouseData = {};
	this._drill_PAlTBEF_mouseData['trackingEnabled'] = true;	//寻路开关
	this._drill_PAlTBEF_mouseData['offsetX'] = 0;				//寻路偏移X
	this._drill_PAlTBEF_mouseData['offsetY'] = 0;				//寻路偏移Y
}
//==============================
// * 行走图的属性 - 删除数据（私有）
//==============================
Game_Character.prototype.drill_PAlTBEF_removeData = function(){
	this._drill_PAlTBEF_mouseData = undefined;
}
//==============================
// * 行走图的属性 - 事件销毁时
//==============================
var _drill_PAlTBEF_e_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function(){
	_drill_PAlTBEF_e_erase.call( this );
	this.drill_PAlTBEF_removeData();	//（删除数据）
}
//==============================
// * 行走图的属性 - 设置寻路开关（开放函数）
//==============================
Game_Character.prototype.drill_PAlTBEF_setDataEnabled = function( enabled ){
	this.drill_PAlTBEF_checkData();
	this._drill_PAlTBEF_mouseData['trackingEnabled'] = enabled;
	$gameTemp._drill_PAlTBEF_needRestatistics = true;
}
//==============================
// * 行走图的属性 - 设置寻路偏移（开放函数）
//==============================
Game_Character.prototype.drill_PAlTBEF_setDataOffset = function( offsetX, offsetY ){
	this.drill_PAlTBEF_checkData();
	this._drill_PAlTBEF_mouseData['offsetX'] = offsetX;
	this._drill_PAlTBEF_mouseData['offsetY'] = offsetY;
	$gameTemp._drill_PAlTBEF_needRestatistics = true;
}
	
	
//=============================================================================
// ** ☆事件容器
//			
//			说明：	> 此模块专门标记事件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件容器 - 初始化
//==============================
var _drill_PAlTBEF_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_PAlTBEF_temp_initialize.call(this);
	this._drill_PAlTBEF_eventTank = [];				//（标记的事件）
	this._drill_PAlTBEF_needRestatistics = true;
};
//==============================
// * 事件容器 - 切换地图时
//==============================
var _drill_PAlTBEF_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_PAlTBEF_eventTank = [];		//（标记的事件）
	$gameTemp._drill_PAlTBEF_needRestatistics = true;
	
	// > 原函数
	_drill_PAlTBEF_gmap_setup.call( this, mapId );
	
	this.drill_PAlTBEF_updateRestatistics();		//（强制刷新统计一次，确保刚加载就有）
}
//==============================
// * 事件容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_PAlTBEF_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_PAlTBEF_eventTank = [];
	$gameTemp._drill_PAlTBEF_needRestatistics = true;
	$gameMap.drill_PAlTBEF_updateRestatistics();	//（强制刷新统计一次，确保刚加载就有）
	_drill_PAlTBEF_smap_createCharacters.call(this);
}
//==============================
// * 事件容器 - 地图销毁时
//==============================
var _drill_PAlTBEF_map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_PAlTBEF_map_terminate.call(this);
	$gameTemp._drill_PAlTBEF_eventTank = [];
}
//==============================
// * 事件容器 - 帧刷新
//==============================
var _drill_PAlTBEF_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive){
	_drill_PAlTBEF_map_update.call(this,sceneActive);
	this.drill_PAlTBEF_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 事件容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_PAlTBEF_updateRestatistics = function() {
	if( $gameTemp._drill_PAlTBEF_needRestatistics != true ){ return }
	$gameTemp._drill_PAlTBEF_needRestatistics = false;
	
	$gameTemp._drill_PAlTBEF_eventTank = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event._drill_PAlTBEF_mouseData == undefined ){ continue; }
		if( temp_event._drill_PAlTBEF_mouseData['trackingEnabled'] != true ){ continue; }
		$gameTemp._drill_PAlTBEF_eventTank.push(temp_event);
	}
}
	
	
//=============================================================================
// ** ☆寻路管理
//
//			说明：	> 此模块专门提供 寻路管理 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 寻路管理 - 设置目的地（继承）
//==============================
var _drill_PAlTBEF_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function( x, y ){
	
	// > 图块值偏转
	//		（此处的参数xy是图块位置）
	if( $gameSystem != undefined &&
		$gameSystem._drill_PAlTBEF_enabled == true ){
		for(var i = 0; i < this._drill_PAlTBEF_eventTank.length; i++){
			var e = this._drill_PAlTBEF_eventTank[i];
			if( e.drill_COEFWM_isOnHover() ){
				x = e.x;									//事件位置X
				y = e.y;									//事件位置Y
				x += e._drill_PAlTBEF_mouseData['offsetX'];	//寻路偏移X
				y += e._drill_PAlTBEF_mouseData['offsetY'];	//寻路偏移Y
				break;
			}
		}
	}
	
	// > 原函数
    _drill_PAlTBEF_setDestination.call( this, x, y );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PlayerAllowTouchByEventFrame = false;
		var pluginTip = DrillUp.drill_PAlTBEF_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

