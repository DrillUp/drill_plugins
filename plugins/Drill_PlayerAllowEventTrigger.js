//=============================================================================
// Drill_PlayerAllowEventTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 允许操作事件触发
 * @author Drill_up
 * 
 * @Drill_LE_param "触发权限-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_PAlET_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerAllowEventTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供一种权限，权限能控制 是否允许 操作事件的触发。
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
 *   (1.操作事件触发：是指通过 确定键、玩家接触、事件接触 三种方式触发
 *      事件指令的过程。主动事件 为主动方。
 *      允许操作事件触发：指一种权限，权限能控制 是否允许 操作事件的触发。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令绑定事件：
 * 
 * 插件指令：>允许操作事件触发 : 本事件 : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件触发 : 事件[10] : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件触发 : 事件变量[21] : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件触发 : 批量事件[10,11] : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件触发 : 批量事件变量[21,22] : 绑定权限 : 权限[1]
 * 
 * 插件指令：>允许操作事件触发 : 本事件 : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件触发 : 本事件 : 取消权限绑定
 * 
 * 1.事件绑定后，默认开启 键盘、手柄、鼠标、触屏 的控制功能。
 *   如果你只希望事件能被 键盘与手柄控制，可以设置关闭 鼠标与触屏控制。
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
 * 2.插件提供事件触发和操作触发权限，被控制时才工作，所以消耗不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * 
 * @param ---权限列表---
 * @default 
 *
 * @param 触发权限-1
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default {"标签":"==完整权限==","触发-确定键时":"true","触发-接触到事件时":"true","触发-被事件接触时":"true"}
 *
 * @param 触发权限-2
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-3
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-4
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-5
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-6
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-7
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-8
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-9
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 *
 * @param 触发权限-10
 * @parent ---权限列表---
 * @type struct<DrillPAlETPermission>
 * @desc 当前触发权限的配置。
 * @default 
 * 
 */
/*~struct~DrillPAlETPermission:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的触发权限==
 * 
 * 
 * @param 触发-确定键时
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，详细介绍去看看文档。
 * @default true
 *
 * @param 触发-接触到事件时
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，详细介绍去看看文档。
 * @default true
 *
 * @param 触发-被事件接触时
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，详细介绍去看看文档。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		PAlET (Player_Allow_Event_Trigger)
//		临时全局变量	DrillUp.g_PAlET_xxx
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
//		★性能测试消耗	7.1ms（drill_PAlET_isBeingControled）
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
//			->☆插件指令
//			
//			->☆被控制事件容器
//			->☆事件的属性
//			
//			->☆事件触发权限
//				x->事件条件
//				x->移动路线条件
//				x->载具条件
//			->☆事件控制
//			->☆事件执行触发
//				->触发-确定键时
//				->触发-接触到事件时
//			->☆被事件接触时
//				->触发-被事件接触时
//			->☆锁定朝向
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
	DrillUp.g_PAlET_PluginTip_curName = "Drill_PlayerAllowEventTrigger.js 互动-允许操作事件触发";
	DrillUp.g_PAlET_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_PAlET_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_PAlET_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PlayerAllowEventTrigger = true;
　　var DrillUp = DrillUp || {};
    DrillUp.parameters = PluginManager.parameters('Drill_PlayerAllowEventTrigger');
	
	
	//==============================
	// * 静态数据 - 触发权限
	//				（~struct~DrillPAlETPermission）
	//==============================
	DrillUp.drill_PAlET_initData = function( dataFrom ){
		var data = {};
		
		data['onKeyOK'] = String( dataFrom["触发-确定键时"] || "true") === "true";
		data['onCollided'] = String( dataFrom["触发-接触到事件时"] || "true") === "true";
		data['onBeingCollided'] = String( dataFrom["触发-被事件接触时"] || "true") === "true";
		
		return data;
	}
	
	/*-----------------权限列表------------------*/
	DrillUp.g_PAlET_list_length = 10;
	DrillUp.g_PAlET_list = [];
	for( var i = 0; i < DrillUp.g_PAlET_list_length; i++ ){
		if( DrillUp.parameters['触发权限-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['触发权限-' + String(i+1) ]);
			DrillUp.g_PAlET_list[i] = DrillUp.drill_PAlET_initData( temp );
		}else{
			DrillUp.g_PAlET_list[i] = null;
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PAlET_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PAlET_pluginCommand.call(this, command, args);
	if( command === ">允许操作事件触发" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_PAlET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_PAlET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_PAlET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_PAlET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 		
		
		/*-----------------绑定权限------------------*/	
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "绑定权限" ){
				temp1 = temp1.replace("权限[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_PAlET_setDataId( Number(temp1) -1 );
				}
				$gameTemp._drill_PAlET_needRestatistics = true;
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "取消权限绑定" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_PAlET_setDataId( -1 );
				}
				$gameTemp._drill_PAlET_needRestatistics = true;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_PAlET_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_PAlET_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆被控制事件容器
//
//			说明：	> 此模块专门定义 被控制事件 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_PAlET_clearTemp = function() {	
	this._drill_PAlET_eventTank = [];					//被控制事件容器
	this._drill_PAlET_lastEvent = null;					//上一个主动事件
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_PAlET_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_PAlET_temp_initialize.call(this);
	this.drill_PAlET_clearTemp();
	this._drill_PAlET_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_PAlET_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_PAlET_clearTemp();
	$gameTemp._drill_PAlET_needRestatistics = true;
	_drill_PAlET_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_PAlET_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp.drill_PAlET_clearTemp();
	$gameTemp._drill_PAlET_needRestatistics = true;
	_drill_PAlET_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_PAlET_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_PAlET_map_update.call( this, sceneActive );
	this.drill_PAlET_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_PAlET_updateRestatistics = function() {
	if( !$gameTemp._drill_PAlET_needRestatistics ){ return }
	$gameTemp._drill_PAlET_needRestatistics = false;
	
	$gameTemp._drill_PAlET_eventTank = [];
	
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._erased == true ){ continue; }
		
		// > 统计 被控制事件
		if( temp_event.drill_PAlET_isBeingControled() == true ){
			$gameTemp._drill_PAlET_eventTank.push(temp_event);
		}
	}
};
	
	
//=============================================================================
// ** ☆事件的属性
//
//			说明：	> 此模块专门定义 事件的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件的属性 - 初始化
//==============================
var _drill_PAlET_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_PAlET_bindData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PAlET_initMembers.call(this);
};
//==============================
// * 事件的属性 - 初始化
//
//			说明：	> 这里的数据在要用时才初始化。『节约事件数据存储空间』
//==============================
Game_Event.prototype.drill_PAlET_checkBindData = function(){
	if( this._drill_PAlET_bindData != undefined ){ return; }
	this._drill_PAlET_bindData = {};
	this._drill_PAlET_bindData['PermissionId'] = -1;		//权限ID
};
//==============================
// * 事件的属性 - 绑定数据ID
//==============================
Game_Event.prototype.drill_PAlET_setDataId = function( permissionId ){
	this.drill_PAlET_checkBindData();
	this._drill_PAlET_bindData['PermissionId'] = permissionId;
};
//==============================
// * 事件的属性 - 获取数据
//==============================
Game_Event.prototype.drill_PAlET_getData = function(){
	if( this._drill_PAlET_bindData == undefined ){ return null; }
	if( this._drill_PAlET_bindData['PermissionId'] < 0 ){ return null; }
	return DrillUp.g_PAlET_list[ this._drill_PAlET_bindData['PermissionId'] ];
};
//==============================
// * 事件的属性 - 是否被控制
//==============================
Game_Event.prototype.drill_PAlET_isBeingControled = function(){
	if( this._drill_PAlET_bindData == undefined ){ return false; }
	return this._drill_PAlET_bindData['PermissionId'] >= 0;
};

//==============================
// * 事件的属性 - 是否允许触发 确定键时
//==============================
Game_Event.prototype.drill_PAlET_isEnableOnKeyOK = function() {
	var data = this.drill_PAlET_getData();
	if( data == null ){ return false; }
	return data['onKeyOK'] == true;
};
//==============================
// * 事件的属性 - 是否允许触发 接触到事件时
//==============================
Game_Event.prototype.drill_PAlET_isEnableOnCollided = function() {
	var data = this.drill_PAlET_getData();
	if( data == null ){ return false; }
	return data['onCollided'] == true;
};
//==============================
// * 事件的属性 - 是否允许触发 被事件接触时
//==============================
Game_Event.prototype.drill_PAlET_isEnableOnBeingCollided = function() {
	var data = this.drill_PAlET_getData();
	if( data == null ){ return false; }
	return data['onBeingCollided'] == true;
};


	
//=============================================================================
// ** ☆事件触发权限
//
//			说明：	> 此模块专门管理 事件触发权限（独立函数） 的控制功能。
//					> 注意，具体如何触发，该模块不管。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件触发权限 - 是否允许触发（基函数）
//==============================
Game_Event.prototype.drill_PAlET_canStartLocalEvents = function(){
	
	// > 允许触发 - 事件条件
	//	（无）
	
	// > 允许触发 - 移动路线条件
	//	（无）
	
	// > 允许触发 - 载具条件
	//	（无）
	
	return true;
};


//=============================================================================
// ** ☆事件控制
//
//			说明：	> 此模块专门管理 玩家-3E按键移动 的控制功能。
//					> 注意触发规则：
//						目标事件（被动方）	主动事件（主动方）
//						目标事件-0确定键   = 主动事件-确定键时
//						目标事件-1玩家接触 = 主动事件-确定键时 或 主动事件-接触到事件时
//						目标事件-2事件接触 = 主动事件-确定键时 或 主动事件-接触到事件时 或 主动事件-被事件接触时
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件控制 - 帧刷新
//==============================
var _drill_PAlET_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    var wasMoving = this.isMoving();
	
	// > 原函数
	_drill_PAlET_update.call(this);
	
	if( this.drill_PAlET_isBeingControled() == false ){ return; }	//帧刷新 - 是否被控制
    if( !this.isMoving() ){
		this.drill_PAlET_updateNonmoving( wasMoving );				//帧刷新 - 暂停移动时
	}
};
//==============================
// * 事件控制 - 帧刷新 暂停移动时
//
//			说明：	> 注意，wasMoving为true的时候，表示在 玩家移动然后静止 的那一帧执行。
//					  wasMoving为false的时候，才表示在 帧刷新。
//==============================
Game_Event.prototype.drill_PAlET_updateNonmoving = function( wasMoving ){
    if( !$gameMap.isEventRunning() ){
		
		// > 移动接触触发（非帧刷新，1玩家接触，2事件接触）
        if( wasMoving ){
            this.drill_PAlET_checkEventTriggerHere([1,2]);		//（根据图块给事件绑定start标记）
            if( $gameMap.setupStartingEvent() ){				//（如果有事件成功绑定start标记，那么执行事件）
                return;
            }
        }
		
		// > 静止时触发（帧刷新）
        if( this.drill_PAlET_triggerAction() ){
            return;
        }
    }
};


//=============================================================================
// ** ☆事件执行触发
//
//			说明：	> 此模块专门提供 玩家-3G触发事件 的控制功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件执行触发 - 执行触发（基函数）（绑定start标记）
//
//			参数：	> x,y 数字          （触发位置点）
//					> triggers 数字列表 （如[0,1,2]，数字值为 0确定键 1玩家接触 2事件接触 3自动执行 4并行处理）
//					> normal 布尔       （判断是否为 与人物相同 的优先级）
//
//			说明：	> 该模块的所有函数，最终都会执行到该 基函数 中执行。
//					> 此函数复刻来自 Game_Player.prototype.startMapEvent 。
//					> 该函数本质上只是绑定一个start标记，真实执行位置见函数Game_Map.prototype.setupStartingMapEvent，该函数根据事件start标记，插入 事件指令 序列。
//==============================
Game_Event.prototype.drill_PAlET_startMapEvent = function( x, y, triggers, normal ){
    if( !$gameMap.isEventRunning() ){
		
		// > 记录主动事件
		$gameTemp._drill_PAlET_lastEvent = this;
		
		//// > 触发-确定键时 关闭（不能精确控制，暂时关闭）
		//if( this.drill_PAlET_isEnableOnKeyOK() == false ){
		//	triggers = $gameTemp.drill_PAlET_removeValueInArray( triggers, 0 );
		//}
		//// > 触发-接触到事件时 关闭
		//if( this.drill_PAlET_isEnableOnCollided() == false ){
		//	triggers = $gameTemp.drill_PAlET_removeValueInArray( triggers, 1 );
		//}
		//// > 触发-被事件接触时 关闭
		//if( this.drill_PAlET_isEnableOnBeingCollided() == false ){
		//	triggers = $gameTemp.drill_PAlET_removeValueInArray( triggers, 2 );
		//}
		
		// > 执行触发
        $gameMap.eventsXy(x, y).forEach(function( event ){
            if( event.isTriggerIn(triggers) && event.isNormalPriority() === normal ){
                event.start();
            }
        });
    }
};
//==============================
// * 事件执行触发 - 从数组中移除某元素
//==============================
Game_Temp.prototype.drill_PAlET_removeValueInArray = function( tar_list, tar_value ){
	var result_list = [];
	for(var i = 0; i < tar_list.length; i++ ){
		var temp_value = tar_list[i];
		if( temp_value == tar_value ){ continue; }
		result_list.push( temp_value );
	}
	return temp_value;
}
//==============================
// * 事件执行触发 - 执行触发 - 接触触发
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.checkEventTriggerTouch 。
//==============================
Game_Event.prototype.drill_PAlET_checkEventTriggerTouch = function( x, y ){
    if( this.drill_PAlET_canStartLocalEvents() ){		//（是否允许触发）
        this.drill_PAlET_startMapEvent(x, y, [1,2], true);
    }
};
//==============================
// * 事件执行触发 - 执行触发 - 脚下位置触发
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.checkEventTriggerHere 。
//==============================
Game_Event.prototype.drill_PAlET_checkEventTriggerHere = function( triggers ){
    if( this.drill_PAlET_canStartLocalEvents() ){		//（是否允许触发）
        this.drill_PAlET_startMapEvent(this.x, this.y, triggers, false);
    }
};
//==============================
// * 事件执行触发 - 执行触发 - 前方位置触发
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.checkEventTriggerThere 。
//==============================
Game_Event.prototype.drill_PAlET_checkEventTriggerThere = function( triggers ){
    if( this.drill_PAlET_canStartLocalEvents() ){		//（是否允许触发）
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, direction);
        var y2 = $gameMap.roundYWithDirection(y1, direction);
        this.drill_PAlET_startMapEvent(x2, y2, triggers, true);
        if( !$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2) ){
            var x3 = $gameMap.roundXWithDirection(x2, direction);
            var y3 = $gameMap.roundYWithDirection(y2, direction);
            this.drill_PAlET_startMapEvent(x3, y3, triggers, true);
        }
    }
};


//==============================
// * 事件执行触发 - 静止时触发
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.triggerAction 。
//					> 静止时，是指玩家站在原地，然后按一下 键盘/手柄 的触发效果。
//					  或者，鼠标/触屏指向目的后，玩家暂停移动时，执行一次 鼠标/触屏 的触发效果。
//==============================
Game_Event.prototype.drill_PAlET_triggerAction = function(){
	if( this.drill_PAlET_triggerButtonAction() ){
		return true;
	}
	if( this.drill_PAlET_triggerTouchAction() ){
		return true;
	}
    return false;
};
//==============================
// * 事件执行触发 - 静止时触发（键盘/手柄）
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.triggerButtonAction 。
//==============================
Game_Event.prototype.drill_PAlET_triggerButtonAction = function(){
    if( Input.isTriggered('ok') ){
        //if( this.getOnOffVehicle() ){
        //    return true;
        //}
        this.drill_PAlET_checkEventTriggerHere([0]);		//（根据图块给事件绑定start标记）
        if( $gameMap.setupStartingEvent() ){				//（如果有事件成功绑定start标记，那么执行事件）
            return true;
        }
        this.drill_PAlET_checkEventTriggerThere([0,1,2]);	//（根据图块给事件绑定start标记）
        if( $gameMap.setupStartingEvent() ){				//（如果有事件成功绑定start标记，那么执行事件）
            return true;
        }
    }
    return false;
};
//==============================
// * 事件执行触发 - 静止时触发（鼠标/触屏）
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.triggerTouchAction 。
//==============================
Game_Event.prototype.drill_PAlET_triggerTouchAction = function(){
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
            return this.drill_PAlET_triggerTouchActionD1(x1, y1);
        }else if( destX === x2 && destY === y2 ){
            return this.drill_PAlET_triggerTouchActionD2(x2, y2);
        }else if( destX === x3 && destY === y3 ){
            return this.drill_PAlET_triggerTouchActionD3(x2, y2);
        }
    }
    return false;
};
//==============================
// * 事件执行触发 - 静止时触发（鼠标/触屏） - 脚下情况
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.triggerTouchActionD1 。
//==============================
Game_Event.prototype.drill_PAlET_triggerTouchActionD1 = function( x1, y1 ){
    if( $gameMap.airship().pos(x1, y1) ){
        if( TouchInput.isTriggered() && this.getOnOffVehicle() ){
            return true;
        }
    }
    this.drill_PAlET_checkEventTriggerHere([0]);			//（根据图块给事件绑定start标记）
    return $gameMap.setupStartingEvent();					//（如果有事件成功绑定start标记，那么执行事件）
};
//==============================
// * 事件执行触发 - 静止时触发（鼠标/触屏） - 前方一图块情况
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.triggerTouchActionD2 。
//==============================
Game_Event.prototype.drill_PAlET_triggerTouchActionD2 = function( x2, y2 ){
    //if( $gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2) ){
    //    if( TouchInput.isTriggered() && this.getOnVehicle() ){
    //        return true;
    //    }
    //}
    //if( this.isInBoat() || this.isInShip() ){
    //    if( TouchInput.isTriggered() && this.getOffVehicle() ){
    //        return true;
    //    }
    //}
    this.drill_PAlET_checkEventTriggerThere([0,1,2]);		//（根据图块给事件绑定start标记）
    return $gameMap.setupStartingEvent();					//（如果有事件成功绑定start标记，那么执行事件）
};
//==============================
// * 事件执行触发 - 静止时触发（鼠标/触屏） - 前方两图块情况（桌子）
//
//			说明：	> 此函数复刻来自 Game_Player.prototype.triggerTouchActionD3 。
//==============================
Game_Event.prototype.drill_PAlET_triggerTouchActionD3 = function( x2, y2 ){
    if( $gameMap.isCounter(x2, y2) ){
        this.drill_PAlET_checkEventTriggerThere([0,1,2]);	//（根据图块给事件绑定start标记）
    }														//
    return $gameMap.setupStartingEvent();					//（如果有事件成功绑定start标记，那么执行事件）
};


//=============================================================================
// ** ☆被事件接触时
//
//			说明：	> 此模块专门管理 触发-被事件接触时 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 被事件接触时 - 执行触发
//==============================
var _drill_PAlET_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
Game_Event.prototype.checkEventTriggerTouch = function( x, y ){
	_drill_PAlET_checkEventTriggerTouch.call( this, x, y );
	
    if( $gameMap.isEventRunning() == true ){ return; }						//有事件运行时，跳出
    if( this._trigger != 2 ){ return; }										//目标事件不是 2事件接触 时，跳出
    if( this.drill_PAlET_isEnableOnBeingCollided() == false ){ return; }	//被事件接触时 禁用时，跳出
	
	// > 寻找接触点是否有 主动事件
	var has_binded_event = false;
	for(var i = 0; i < $gameTemp._drill_PAlET_onBeingCollided_eventTank.length; i++ ){
		var e = $gameTemp._drill_PAlET_onBeingCollided_eventTank[i];
		if( e.pos(x, y) == true ){
			has_binded_event = true;
			
			// > 记录主动事件
			$gameTemp._drill_PAlET_lastEvent = e;
			break;
		}
	}
	if( has_binded_event == false ){ return; }
	
	// > 有主动事件，执行触发
	if( !this.isJumping() && this.isNormalPriority() ){
		this.start();
	}
};


//=============================================================================
// ** ☆锁定朝向
//
//			说明：	> 此模块专门管理 主动事件触发后，目标事件看向主动事件并锁定朝向 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_PAlET_lock = Game_Event.prototype.lock;
Game_Event.prototype.lock = function(){
	
	// > 玩家关闭时【互动 - 允许操作玩家触发】
	if( Imported.Drill_PlayerAllowTrigger &&
		$gameSystem.drill_PAlT_isPlayerEnabled() != true ){
		
		// > 获取 主动事件
		var last_event = $gameTemp._drill_PAlET_lastEvent;
		if( last_event != undefined ){
			
			// > 目标事件看向主动事件 并锁定朝向
			if( !this._locked ){
			    this._prelockDirection = this.direction();
			    this.turnTowardCharacter( last_event );
			    this._locked = true;
			}
			return;
		}
	}
	
	// > 原函数
	_drill_PAlET_lock.call(this);
};


