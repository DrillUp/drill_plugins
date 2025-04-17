//=============================================================================
// Drill_PlayerAllowEventMove.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 允许操作事件移动
 * @author Drill_up
 * 
 * @Drill_LE_param "操作移动权限-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_PAlEM_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerAllowEventMove +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供一种权限，权限能控制 是否允许 操作事件的移动。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于玩家。
 * 2.详细去看看文档："10.互动 > 关于允许操作移动.docx"。
 * 细节：
 *   (1.操作事件移动：指通过 键盘/手柄/鼠标/触屏 控制事件移动的过程。
 *      允许操作事件移动：指一种权限，权限能控制 是否允许 操作事件的移动。
 *   (2.事件需要先绑定权限，才能 操作移动。
 *   (3.注意，由于指向标只有一个，
 *      不能分别控制两组或更多组的小爱丽丝去移动。
 *      因此该插件功能不能实现RTS的操作设计，只能作为近似的小功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令绑定事件：
 * 
 * 插件指令：>允许操作事件移动 : 本事件 : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件移动 : 事件[10] : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件移动 : 事件变量[21] : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件移动 : 批量事件[10,11] : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件移动 : 批量事件变量[21,22] : 绑定权限 : 权限[1]
 * 
 * 插件指令：>允许操作事件移动 : 本事件 : 绑定权限 : 权限[1]
 * 插件指令：>允许操作事件移动 : 本事件 : 取消权限绑定
 * 
 * 1.事件绑定后，默认开启 键盘、手柄、鼠标、触屏 的控制功能。
 *   如果你只希望事件能被 键盘与手柄控制，可以设置关闭 鼠标与触屏控制。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 鼠标设置
 * 你可以通过插件指令控制：
 * 
 * 插件指令：>允许操作事件移动 : 清除当前的鼠标目的地
 * 
 * 1.控制事件后(尤其是多事件)，鼠标目的地会在一些情况下不能及时清除。
 *   你可以手动控制清除。
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
 * 测试结果：   200个事件的地图中，平均消耗为：【41.24ms】
 *              100个事件的地图中，平均消耗为：【33.20ms】
 *               50个事件的地图中，平均消耗为：【14.02ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件提供事件移动和操作移动权限，被控制时才工作，所以消耗不多。
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
 * @param 操作移动权限-1
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default {"标签":"==完整权限==","键盘与手柄控制":"true","鼠标与触屏控制":"true","无法移动时是否熄灭指向标":"true"}
 *
 * @param 操作移动权限-2
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default {"标签":"==只键盘与手柄权限==","键盘与手柄控制":"true","鼠标与触屏控制":"false","无法移动时是否熄灭指向标":"false"}
 *
 * @param 操作移动权限-3
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-4
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-5
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-6
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-7
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-8
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-9
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 *
 * @param 操作移动权限-10
 * @parent ---权限列表---
 * @type struct<DrillPAlEMPermission>
 * @desc 当前操作移动权限的配置。
 * @default 
 * 
 */
/*~struct~DrillPAlEMPermission:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的操作移动权限==
 * 
 *
 * @param 键盘与手柄控制
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 *
 * @param 鼠标与触屏控制
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 *
 * @param 无法移动时是否熄灭指向标
 * @parent 鼠标与触屏控制
 * @type boolean
 * @on 熄灭
 * @off 不熄灭
 * @desc true - 熄灭，false - 不熄灭
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PAlEM (Player_Allow_Event_Move)
//		临时全局变量	DrillUp.g_PAlEM_xxx
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
//		★性能测试消耗	33.2ms（drill_PAlEM_moveByInput）
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
//			->☆事件移动权限
//				->事件条件
//				->移动路线条件
//				x->载具条件
//			->☆事件控制
//			->☆鼠标兼容
//				->是否可以放置目的地
//				->关闭目的地
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
	DrillUp.g_PAlEM_PluginTip_curName = "Drill_PlayerAllowEventMove.js 互动-允许操作事件移动";
	DrillUp.g_PAlEM_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_PAlEM_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_PAlEM_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PlayerAllowEventMove = true;
	var DrillUp = DrillUp || {};
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerAllowEventMove');
	
	
	//==============================
	// * 静态数据 - 操作移动权限
	//				（~struct~DrillPAlEMPermission）
	//==============================
	DrillUp.drill_PAlEM_initData = function( dataFrom ){
		var data = {};
		
		data['keyPad_control'] = String( dataFrom["键盘与手柄控制"] || "true") === "true";
		data['mouseTouch_control'] = String( dataFrom["鼠标与触屏控制"] || "true") === "true";
		data['mouseTouch_canOffDest'] = String( dataFrom["无法移动时是否熄灭指向标"] || "true") === "true";
		
		return data;
	}
	
	/*-----------------权限列表------------------*/
	DrillUp.g_PAlEM_list_length = 10;
	DrillUp.g_PAlEM_list = [];
	for( var i = 0; i < DrillUp.g_PAlEM_list_length; i++ ){
		if( DrillUp.parameters['操作移动权限-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['操作移动权限-' + String(i+1) ]);
			DrillUp.g_PAlEM_list[i] = DrillUp.drill_PAlEM_initData( temp );
		}else{
			DrillUp.g_PAlEM_list[i] = null;
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PAlEM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PAlEM_pluginCommand.call(this, command, args);
	this.drill_PAlEM_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PAlEM_pluginCommand = function( command, args ){
	if( command === ">允许操作事件移动" ){
		
		/*-----------------鼠标设置------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "清除当前的鼠标目的地" ){
				$gameTemp.clearDestination();
			}
		}
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_PAlEM_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_PAlEM_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_PAlEM_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_PAlEM_isEventExist( e_id ) == false ){ return; }
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
					c_chars[k].drill_PAlEM_setDataId( Number(temp1) -1 );
				}
				$gameTemp._drill_PAlEM_needRestatistics = true;
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "取消权限绑定" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_PAlEM_setDataId( -1 );
				}
				$gameTemp._drill_PAlEM_needRestatistics = true;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_PAlEM_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_PAlEM_getPluginTip_EventNotFind( e_id ) );
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
Game_Temp.prototype.drill_PAlEM_clearTemp = function() {	
	this._drill_PAlEM_eventTank = [];			//被控制事件容器
	this._drill_PAlEM_mouse_eventTank = [];		//被鼠标控制事件容器
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_PAlEM_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_PAlEM_temp_initialize.call(this);
	this.drill_PAlEM_clearTemp();
	this._drill_PAlEM_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_PAlEM_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_PAlEM_clearTemp();
	$gameTemp._drill_PAlEM_needRestatistics = true;
	_drill_PAlEM_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_PAlEM_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp.drill_PAlEM_clearTemp();
	$gameTemp._drill_PAlEM_needRestatistics = true;
	_drill_PAlEM_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_PAlEM_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_PAlEM_map_update.call( this, sceneActive );
	this.drill_PAlEM_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_PAlEM_updateRestatistics = function() {
	if( !$gameTemp._drill_PAlEM_needRestatistics ){ return }
	$gameTemp._drill_PAlEM_needRestatistics = false;
	
	$gameTemp._drill_PAlEM_eventTank = [];
	$gameTemp._drill_PAlEM_mouse_eventTank = [];
	
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		// > 统计 被控制事件
		if( temp_event.drill_PAlEM_isBeingControled() == true ){
			$gameTemp._drill_PAlEM_eventTank.push(temp_event);
		}
		
		// > 统计 被鼠标控制事件
		var data = temp_event.drill_PAlEM_getData();
		if( data == null ){ continue; }
		if( data['mouseTouch_control'] == true ){
			$gameTemp._drill_PAlEM_mouse_eventTank.push(temp_event);
		}
	}
};
//==============================
// * 容器 - 是否有 被鼠标控制 事件（开放函数）
//==============================
Game_Temp.prototype.drill_PAlEM_hasMouseControledEvent = function() {
	return this._drill_PAlEM_mouse_eventTank.length > 0;
};
//==============================
// * 容器 - 获取一个 被鼠标控制 的事件（开放函数）
//==============================
Game_Temp.prototype.drill_PAlEM_getOneMouseControledEvent = function() {
	if( this._drill_PAlEM_mouse_eventTank.length == 0 ){ return null; }
	return this._drill_PAlEM_mouse_eventTank[0];
};
//==============================
// * 容器 - 是否有任何一个 被鼠标控制 事件允许移动（开放函数）
//==============================
Game_Temp.prototype.drill_PAlEM_isAnyMouseControledEventCanMove = function() {
	for(var i = 0; i < this._drill_PAlEM_mouse_eventTank.length; i++ ){
		var e = this._drill_PAlEM_mouse_eventTank[i];
		if( e.drill_PAlEM_canMove() == true ){ return true; }		//（是否允许操作移动）
	}
	return false;
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
var _drill_PAlEM_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_PAlEM_bindData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PAlEM_initMembers.call(this);
};
//==============================
// * 事件的属性 - 初始化
//
//			说明：	> 这里的数据在要用时才初始化。『节约事件数据存储空间』
//==============================
Game_Event.prototype.drill_PAlEM_checkBindData = function(){
	if( this._drill_PAlEM_bindData != undefined ){ return; }
	this._drill_PAlEM_bindData = {};
	this._drill_PAlEM_bindData['PermissionId'] = -1;		//权限ID
};
//==============================
// * 事件的属性 - 绑定数据ID
//==============================
Game_Event.prototype.drill_PAlEM_setDataId = function( permissionId ){
	this.drill_PAlEM_checkBindData();
	this._drill_PAlEM_bindData['PermissionId'] = permissionId;
};
//==============================
// * 事件的属性 - 获取数据
//==============================
Game_Event.prototype.drill_PAlEM_getData = function(){
	if( this._drill_PAlEM_bindData == undefined ){ return null; }
	if( this._drill_PAlEM_bindData['PermissionId'] < 0 ){ return null; }
	return DrillUp.g_PAlEM_list[ this._drill_PAlEM_bindData['PermissionId'] ];
};
//==============================
// * 事件的属性 - 是否被控制
//==============================
Game_Event.prototype.drill_PAlEM_isBeingControled = function(){
	if( this._drill_PAlEM_bindData == undefined ){ return false; }
	return this._drill_PAlEM_bindData['PermissionId'] >= 0;
};


	
//=============================================================================
// ** ☆事件移动权限
//
//			说明：	> 此模块专门管理 事件移动权限（独立函数） 的控制功能。
//					> 注意，具体如何移动，该模块不管。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件移动权限 - 是否允许操作移动（基函数）
//==============================
Game_Event.prototype.drill_PAlEM_canMove = function(){
	
	// > 允许移动 - 事件条件
    if( this.drill_PAlEM_canMoveCondition_Event() == false ){ return false; }
	
	// > 允许移动 - 移动路线条件
    if( this.drill_PAlEM_canMoveCondition_MoveRoute() == false ){ return false; }
	
	// > 允许移动 - 载具条件
	//	（无）
	
    return true;
};
//==============================
// * 事件移动权限 - 是否允许操作移动 - 事件条件（子插件可继承）
//
//			说明：	> 不允许 则返回false，允许/继续判定 则返回true。
//==============================
Game_Event.prototype.drill_PAlEM_canMoveCondition_Event = function(){
	if( $gameMap.isEventRunning() ){ return false; }			//事件在自动执行时，不允许
	if( $gameMessage.isBusy() ){ return false; }				//出现对话框时，不允许
	return true;
};
//==============================
// * 事件移动权限 - 是否允许操作移动 - 移动路线条件（子插件可继承）
//
//			说明：	> 不允许 则返回false，允许/继续判定 则返回true。
//==============================
Game_Event.prototype.drill_PAlEM_canMoveCondition_MoveRoute = function(){
	if( this.isMoveRouteForcing() ){ return false; }			//强制移动时，不允许
	return true;
};


//=============================================================================
// ** ☆事件控制
//
//			说明：	> 此模块专门模仿 玩家-3E按键移动 的写法，实现事件控制功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件控制 - 帧刷新
//==============================
var _drill_PAlEM_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
	_drill_PAlEM_updateStop.call(this);
	
	if( this.drill_PAlEM_isBeingControled() == false ){ return; }	//帧刷新 - 是否被控制
	this.drill_PAlEM_moveByInput();									//帧刷新 - 操作移动
};
//==============================
// * 事件控制 - 帧刷新 操作移动
//==============================
Game_Event.prototype.drill_PAlEM_moveByInput = function(){
	if( this.isMoving() == true ){ return; }
	if( this.drill_PAlEM_canMove() == false ){ return; }		//（是否允许操作移动）
	
	// > 当前若为键盘操作，则 关闭鼠标指向标
	var direction = this.drill_PAlEM_getInputDirection();
	if( direction > 0 ){
		$gameTemp.clearDestination();
	
	// > 当前若为鼠标操作，则设定位置
	}else if( $gameTemp.isDestinationValid() ){
		var x = $gameTemp.destinationX();
		var y = $gameTemp.destinationY();
		direction = this.findDirectionTo(x, y);		//2C自动寻迹
	}
	
	// > 执行移动
	if( direction > 0 ){
		this.drill_PAlEM_executeMove(direction);
	}
};
//==============================
// * 事件控制 - 获取按键方向
//==============================
Game_Event.prototype.drill_PAlEM_getInputDirection = function(){
	var data = this.drill_PAlEM_getData();
	if( data == null ){ return 0; }
	if( data['keyPad_control'] == false ){ return 0; }	//（若 键盘/手柄控制 被关闭，则返回无方向）
    return Input.dir4;
};
//==============================
// * 事件控制 - 执行移动
//==============================
Game_Event.prototype.drill_PAlEM_executeMove = function( direction ){
    this.moveStraight(direction);
};


//=============================================================================
// ** ☆鼠标兼容
//
//			说明：	> 此模块专门管理 鼠标 的控制功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 鼠标兼容 - 是否可以放置目的地
//
//			说明：	> 具体放置目的地的功能，可见函数：
//					  Scene_Map.prototype.updateDestination
//					  Scene_Map.prototype.processMapTouch
//==============================
var _drill_PAlEM_isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function() {
	var enabled = _drill_PAlEM_isMapTouchOk.call(this);
	if( enabled == true ){ return true; }
	
	// > 玩家关闭，但有被控制事件时
	if( $gameTemp.drill_PAlEM_hasMouseControledEvent() ){
		if( $gameTemp.drill_PAlEM_isAnyMouseControledEventCanMove() == true ){
			return true;
		}else{
			return false;
		}
	}
	
    return false;
};
//==============================
// * 鼠标兼容 - 添加目的地
//==============================
var _drill_PAlEM_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
	if( TouchInput.isTriggered() || this._touchCount > 0 ){
		if( TouchInput.isPressed() ){
			if( this._touchCount === 0 || this._touchCount >= 15 ){
				
				// > 设置 移动标记
				for(var i = 0; i < $gameTemp._drill_PAlEM_mouse_eventTank.length; i++ ){
					var e = $gameTemp._drill_PAlEM_mouse_eventTank[i];
					e._drill_PAlEM_touchMoving = true;
				}
			}
		}
	}
	
	// > 原函数
	_drill_PAlEM_processMapTouch.call(this);
};
//==============================
// * 鼠标兼容 - 初始化
//==============================
var _drill_PAlEM_initMembers2 = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_PAlEM_touchMoving = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PAlEM_initMembers2.call(this);
};
//==============================
// * 鼠标兼容 - 帧刷新 事件
//==============================
var _drill_PAlEM_event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
	_drill_PAlEM_event_update.call( this );
	
	if( this.drill_PAlEM_isBeingControled() == false ){ return; }	//帧刷新 - 是否被控制
	this.drill_PAlEM_updateDestinationOff();						//帧刷新 - 关闭目的地
};
//==============================
// * 鼠标兼容 - 帧刷新 事件 - 关闭目的地标记
//==============================
Game_Event.prototype.drill_PAlEM_updateDestinationOff = function(){
	if( this.isMoving() == true ){ return; }
    if( $gameMap.isEventRunning() == true ){ return; }
	
	// > 权限检查
	var data = this.drill_PAlEM_getData();
	if( data == null ){ return; }
	if( data['mouseTouch_control'] == false ){ return; }
	
	// > 有事件到达 目的地
	var x = $gameTemp.destinationX();
	var y = $gameTemp.destinationY();
	if( x == this.x && y == this.y ){
		this._drill_PAlEM_touchMoving = undefined;		//删除 移动标记
		return;
	}
	
	// > 事件无法移动时
	if( data['mouseTouch_canOffDest'] == true ){
		if( this.isMovementSucceeded() == false ){		//（只要移动失败，就表示无法移动了）
			this._drill_PAlEM_touchMoving = undefined;	//删除 移动标记
			return;
		}
	}
};
//==============================
// * 鼠标兼容 - 帧刷新
//==============================
var _drill_PAlEM_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
	_drill_PAlEM_updateMain.call(this);
	if( $gameTemp.drill_PAlEM_hasMouseControledEvent() == false ){ return; }		//没有控制的鼠标事件时，跳出
	
	var is_all_end = true;
	for(var i = 0; i < $gameTemp._drill_PAlEM_mouse_eventTank.length; i++ ){
		var e = $gameTemp._drill_PAlEM_mouse_eventTank[i];
		if( e._drill_PAlEM_touchMoving == true ){
			is_all_end = false;
		}
	}
	if( is_all_end == true ){
		$gameTemp.clearDestination();
	}
};


