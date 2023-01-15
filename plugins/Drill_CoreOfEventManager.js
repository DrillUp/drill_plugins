//=============================================================================
// Drill_CoreOfEventManager.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体管理 - 事件管理核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfEventManager +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件掌控事件的创建、删除。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 有部分插件依赖该插件。
 * 可作用于：
 *   - Drill_EventDuplicator        物体管理-事件复制器
 *     该插件给目标插件提供基础的复制功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 细节：
 *   (1.该核心提供基础的 创建、删除 功能。
 *      创建包括 直接生成事件、复制事件。
 *      删除包括 暂时消除、彻底删除。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 删除事件
 * 你可以通过插件指令手动修改生成的一些基本设置。
 * 
 * 插件指令：>事件管理核心 : 本事件 : 彻底删除
 * 插件指令：>事件管理核心 : 事件[10] : 彻底删除
 * 插件指令：>事件管理核心 : 事件变量[21] : 彻底删除
 * 插件指令：>事件管理核心 : 批量事件[10,11] : 彻底删除
 * 插件指令：>事件管理核心 : 批量事件变量[21,22] : 彻底删除
 * 
 * 插件指令：>事件管理核心 : 本事件 : 暂时消除事件
 * 插件指令：>事件管理核心 : 本事件 : 彻底删除
 * 
 * 1.前半部分（本事件）后半部分（彻底删除）的参数可以随意组合。
 *   一共有5*2种组合方式。
 * 2."暂时消除事件"并不是真的删除了事件，你仍然可以获取到事件的坐标。
 *   而"彻底删除"是指在内存上完全删除，删除后若尝试获取该事件，会报错。
 * 3.只有"彻底删除"才能完全避免创建事件过多造成的积压问题。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   在大部分管理层中，建立许多事件。（放置炸弹）
 * 测试结果：   200个事件的地图中，消耗为：【28.05ms】
 *              100个事件的地图中，消耗为：【20.33ms】
 *               50个事件的地图中，消耗为：【18.72ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件比较特殊，单次执行虽然消耗的性能不多，但是事件新建之后消耗
 *   的性能就不能确定了，这个需要由它自己带的各种属性与其它插件的综合
 *   关系来决定。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COEM （Core_Of_Event_Manager）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_COEM_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	放置超级多的炸弹
//		★性能测试消耗	28.05ms
//		★最坏情况		无	
//		★备注			建立事件不消耗，消耗的是事件建立后的各种行为。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件管理核心：
//				->版本检验
//				->流程
//					->复制本地图的事件
//					->复制其它地图的事件
//				->原代容器
//					->创建事件【标准函数】
//					->删除事件【标准函数】
//					->获取 - 是否为原代事件【标准函数】
//					->获取 - 所有原代事件【标准函数】
//					->获取 - 所有原代事件贴图【标准函数】
//				->子代容器
//					->创建事件（主流程）【标准函数】
//					->创建事件（根据数据）【标准函数】
//					->删除事件【标准函数】
//					->获取 - 是否为子代事件【标准函数】
//					->获取 - 所有子代事件【标准函数】
//					->获取 - 所有子代事件贴图【标准函数】
//					->获取 - 上一个子代事件【标准函数】
//					->获取 - 上一个子代事件贴图【标准函数】
//				->事件常用函数
//					->全部事件【标准函数】
//					->有效事件容器指针【标准函数】
//					->有效事件容器备份【标准函数】
//					->删除全部独立开关【标准函数】
//				->地图读取器
//
//		★必要注意事项：
//			1.事件的独立开关是独立于事件的，需要额外刷新。
//			2.如果你需要引用该插件来创建一个外部地图的事件，
//			  那么必须先加载地图文本数据，再创建事件。（可参考 Drill_EventForPlayer ）
//			
//		★其它说明细节：
//			1.先有事件数据，再通过事件数据new事件。
//			  事件存储数据 -> 即时事件数据 -> 事件对象
//			2.上一个复制事件的id，可以在插件指令中记录。
//
//		★存在的问题：
//			1.低版本的rmmv中没有ResourceHandler的定义。（已解决，通过添加版本限制）
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfEventManager = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfEventManager');
	
	
//=============================================================================
// * 版本检验
//=============================================================================
if( !Utils.RPGMAKER_VERSION || Utils.RPGMAKER_VERSION < "1.5.0" ){
	
	alert("【Drill_CoreOfEventManager.js 物体管理 - 事件管理核心】\n检测到你的rmmv工程版本太低，事件管理核心无法使用。\n会报ResourceHandler资源指针错误。\n你可以使用\"rmmv软件版本.docx\"中的升级工程的方法来升级你的工程。 ");
	Imported.Drill_CoreOfEventManager = false;
	
}else{
	
	
//#############################################################################
// ** 【标准模块】原代容器primary
//          
//			说明：	> 原代事件指：通过游戏编辑器中，手动添加的独立事件。
//					  进入地图前会完整创建，离开地图后会全销毁。
//					> 这些事件的数据在 Map00X.json 中是真实存在的。
//#############################################################################
//##############################
// * 原代容器 - 创建事件【标准函数】
//          
//			说明：	> 该插件，不控制此功能，具体去看看 Game_Map.prototype.setupEvents 。
//##############################
//（无）

//##############################
// * 原代容器 - 删除事件【标准函数】
//				
//			参数：	> e_id 数字  （目标事件ID）
//			返回：	> 无
//          
//			说明：	> 只能删除当前地图的事件，其它地图的 事件对象 本来就未创建。
//					> 删除 事件 和 事件贴图，不包括 事件数据 。
//					> 事件删除后，总容器长度不变，指定位置为null值。原代容器长度会变化。
//##############################
Game_Map.prototype.drill_COEM_primary_deleteEvent = function( e_id ){
	this.drill_COEM_primary_deleteEvent_Private( e_id );
};
//##############################
// * 原代容器 - 获取 - 是否为原代事件【标准函数】
//			
//			参数：	> e_id 数字（要判断的事件ID）
//			返回：	> 布尔
//##############################
Game_Map.prototype.drill_COEM_primary_isPrimaryEvent = function( e_id ){
	return e_id < $dataMap.events.length;
};
//##############################
// * 原代容器 - 获取 - 所有原代事件【标准函数】
//			
//			参数：	> 无
//			返回：	> 事件对象列表（指针）
//          
//			说明：	> 此函数返回的容器不含子代事件。
//##############################
Game_Map.prototype.drill_COEM_primary_getAllEvent = function(){
	return $gameTemp._drill_COEM_primaryEventTank;
};
//##############################
// * 原代容器 - 获取 - 所有原代事件贴图【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图对象列表（指针）
//          
//			说明：	> 此函数返回的容器不含子代事件贴图。不含载具贴图、玩家贴图。
//##############################
Game_Map.prototype.drill_COEM_primary_getAllSprite = function(){
	return $gameTemp._drill_COEM_primarySpriteTank;
};


//#############################################################################
// ** 【标准模块】子代容器offspring
//          
//			说明：	> 子代事件指：游戏过程中，在当前地图中即时生成的事件。
//					  需要延迟创建，离开地图后会全销毁。
//					> 这些事件的数据来源于 原代事件，也可能会被高度自定义（比如炸弹人的炸弹）。
//#############################################################################
//##############################
// * 子代容器 - 创建事件（主流程）【标准函数】
//				
//			参数：	> map_id 数字   （被复制事件的地图ID）
//					> event_id 数字 （被复制事件的事件ID）
//					> tar_x 数字    （新事件放置位置X）
//					> tar_y 数字    （新事件放置位置X）
//			返回：	> 事件对象      （新事件对象）
//          
//			说明：	> 此函数可以复制指定地图的事件，但前提是地图数据已加载。
//##############################
Game_Map.prototype.drill_COEM_offspring_createEvent = function( map_id, event_id, tar_x, tar_y ){
	return this.drill_COEM_offspring_createEvent_Private( map_id, event_id, tar_x, tar_y );
};
//##############################
// * 子代容器 - 创建事件（根据数据）【标准函数】
//				
//			参数：	> data 动态对象  （事件json数据）
//			返回：	> 事件对象       （新事件对象）
//          
//			说明：	> 根据 事件数据，创建事件对象。
//##############################
Game_Map.prototype.drill_COEM_offspring_createEventByData = function( data ){
	return this.drill_COEM_offspring_createEventByData_Private( data );
};
//##############################
// * 子代容器 - 删除事件【标准函数】
//				
//			参数：	> e_id 数字  （目标事件ID）
//			返回：	> 无
//          
//			说明：	> 只能删除当前地图的事件，其它地图的 事件对象 本来就未创建。
//					> 事件删除后，总容器长度不变，指定位置为null值。子代容器长度会变化。
//##############################
Game_Map.prototype.drill_COEM_offspring_deleteEvent = function( e_id ){
	this.drill_COEM_offspring_deleteEvent_Private( e_id );
};
//##############################
// * 子代容器 - 获取 - 是否为子代事件【标准函数】
//			
//			参数：	> e_id 数字（要判断的事件ID）
//			返回：	> 布尔
//##############################
Game_Map.prototype.drill_COEM_offspring_isOffspringEvent = function( e_id ){
	return e_id >= $dataMap.events.length;
};
//##############################
// * 子代容器 - 获取 - 所有子代事件【标准函数】
//			
//			参数：	> 无
//			返回：	> 事件对象列表（指针）
//          
//			说明：	> 此函数返回的容器不含原代事件。
//##############################
Game_Map.prototype.drill_COEM_offspring_getAllEvent = function(){
	return $gameTemp._drill_COEM_offspringEventTank;
};
//##############################
// * 子代容器 - 获取 - 所有子代事件贴图【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图对象列表（指针）
//          
//			说明：	> 此函数返回的容器不含原代事件贴图。不含载具贴图、玩家贴图。
//##############################
Game_Map.prototype.drill_COEM_offspring_getAllSprite = function(){
	return $gameTemp._drill_COEM_offspringSpringTank;
};
//##############################
// * 子代容器 - 获取 - 上一个子代事件【标准函数】
//			
//			参数：	> 无
//			返回：	> 事件对象
//##############################
Game_Map.prototype.drill_COEM_offspring_getLastCreatedEvent = function(){
	return $gameTemp._drill_COEM_offspringLastCreatedEvent;
};
//##############################
// * 子代容器 - 获取 - 上一个子代事件贴图【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图对象
//##############################
Game_Map.prototype.drill_COEM_offspring_getLastCreatedSprite = function(){
	return $gameTemp._drill_COEM_offspringLastCreatedSprite;
};


//#############################################################################
// ** 【标准模块】事件常用函数
//#############################################################################
//##############################
// * 事件 - 获取全部事件【标准函数】
//				
//			参数：	> 
//			返回：	> 事件对象      （新事件对象）
//          
//			说明：	> 即 原代容器+子代容器 的所有事件。
//##############################
Game_Map.prototype.drill_COEM_getAllEvent = function(){
	return this._events;
};
//##############################
// * 事件 - 获取有效事件容器指针【标准函数】
//			
//			参数：	无
//			返回：	> 有效容器指针
//			
//			说明：	> 返回的是一个指针，使用时必须 只读 。
//					> 有效事件指 非空、未被清除 的事件。
//					> 固定区域下，统一用该接口来获取 有效事件 。
//##############################
Game_Map.prototype.drill_COEM_getAvailableEventTank_Pointer = function(){
	return this.drill_COEM_getAvailableEventTank_Pointer_Private();
}
//##############################
// * 事件 - 获取有效事件容器备份【标准函数】
//			
//			参数：	无
//			返回：	> 有效容器指针
//			
//			说明：	> 返回一个新数组，可以对数组随意操作。
//					> 有效事件指 非空、未被清除 的事件。
//					> 固定区域下，统一用该接口来获取 有效事件 。
//##############################
Game_Map.prototype.drill_COEM_getAvailableEventTank_Copyed = function(){
	return this.drill_COEM_getAvailableEventTank_Copyed_Private();
}
//##############################
// * 事件 - 删除全部独立开关【标准函数】
//				
//			参数：	> map_id 数字（目标事件的地图ID）
//					> e_id 数字  （目标事件的事件ID）
//			返回：	> 无
//          
//			说明：	> 清除后，不会刷新地图，需要手动标记刷新。
//##############################
Game_SelfSwitches.prototype.drill_COEM_deleteEventKeys = function( map_id, e_id ){
	this.drill_COEM_deleteEventKeys_Private( map_id, e_id );
};

	
//#############################################################################
// ** 【标准模块】地图读取器
//#############################################################################
//##############################
// * 地图读取器 - 获取资源【标准函数】
//				
//			参数：	> map_id 数字  （指定地图的id）
//			返回：	> 地图数据对象 （地图json数据）
//          
//			说明：	> 注意，由于含异步请求，如果未提前加载，则不能立即返回数据。
//##############################
DataManager.drill_COEM_getMapData = function( map_id ){
	return this.drill_COEM_getMapData_Private( map_id );
};
//##############################
// * 地图读取器 - 提前加载资源【标准函数】
//				
//			参数：	> map_id 数字  （指定地图的id）
//			返回：	> 无
//          
//			说明：	> 执行可以提前加载地图数据，防止要用时来不及读取。
//##############################
DataManager.drill_COEM_loadMapData = function( map_id ){
	this.drill_COEM_loadMapData_Private( map_id );
};
//##############################
// * 地图读取器 - 地图资源是否存在【标准函数】
//				
//			参数：	> map_id 数字  （指定地图的id）
//			返回：	> 布尔
//          
//			说明：	> 通过此函数来判断地图资源是否存在。
//##############################
DataManager.drill_COEM_isMapExist = function( map_id ){
	return this.drill_COEM_isMapExist_Private( map_id );
};
Game_Temp.prototype.drill_COEM_isMapExist = function( map_id ){
	return DataManager.drill_COEM_isMapExist_Private( map_id );
};



//=============================================================================
// * 插件指令
//=============================================================================
var _drill_COEM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COEM_pluginCommand.call(this, command, args);
	if( command === ">事件管理核心" ){
		
		/*-----------------对象组获取------------------*/
		var e_ids = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( unit == "本事件" ){
				e_ids = [ this._eventId ];
			}else if( unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}else if( unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}else if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}else if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
		}
		
		/*-----------------执行删除------------------*/
		if( e_ids != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "彻底删除" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];		//（删除事件不需要校验是否存在）
					$gameSelfSwitches.drill_COEM_deleteEventKeys( this._mapId, e_id );
					$gameMap.drill_COEM_primary_deleteEvent( e_id );	//（直接删除）
					$gameMap.drill_COEM_offspring_deleteEvent( e_id );
				}
			}
			if( type == "暂时消除事件" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_COEM_isEventExist( e_id ) == false ){ continue; }
					$gameMap.eraseEvent( e_id );
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_COEM_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_CoreOfEventManager.js 物体管理 - 事件管理核心】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 原代容器
//=============================================================================
//==============================
// * 原代容器 - 场景初始化
//==============================
var _drill_COEM_temp_p_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_COEM_temp_p_initialize.call(this);
	this._drill_COEM_primaryEventTank = [];				//原代事件容器
	this._drill_COEM_primarySpriteTank = [];			//原代事件贴图容器
};
//==============================
// * 原代容器 - 场景清空
//==============================
var _drill_COEM_p_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_COEM_p_terminate.call(this);
	$gameTemp._drill_COEM_primaryEventTank = [];		//原代事件容器
	$gameTemp._drill_COEM_primarySpriteTank = [];		//原代事件贴图容器
};
//==============================
// * 原代容器 - 捕获 - 地图切换
//==============================
var _drill_COEM_p_map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function(){
	_drill_COEM_p_map_setupEvents.call(this);
	for(var i=0; i < this._events.length; i++){			//原代事件容器
		$gameTemp._drill_COEM_primaryEventTank.push( this._events[i] );
	}
};
//==============================
// * 原代容器 - 捕获 - 行走图贴图创建
//==============================
var _drill_COEM_p_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	_drill_COEM_p_createCharacters.call( this );
	for(var i=0; i < this._characterSprites.length; i++){	//原代事件贴图容器
		var temp_sprite = this._characterSprites[i];
		if( temp_sprite._character instanceof Game_Event ){
			$gameTemp._drill_COEM_primarySpriteTank.push(temp_sprite);
		}
	}
}
//==============================
// * 原代容器 - 删除事件（私有）
//==============================
Game_Map.prototype.drill_COEM_primary_deleteEvent_Private = function( e_id ){
	
	// > 只允许删除 原代事件
	if( this.drill_COEM_primary_isPrimaryEvent( e_id ) == false ){ return; }
	
	// > 执行删除
	this.drill_COEM_deleteEvent_Private( e_id );
};


//=============================================================================
// ** 子代容器
//=============================================================================
//==============================
// * 子代容器 - 场景初始化
//==============================
var _drill_COEM_temp_o_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_COEM_temp_o_initialize.call(this);
	this._drill_COEM_offspringEventTank = [];				//子代事件容器
	this._drill_COEM_offspringSpringTank = [];				//子代事件贴图容器
	this._drill_COEM_offspringLastCreatedEvent = null;		//上一个子代事件
	this._drill_COEM_offspringLastCreatedSprite = null;		//上一个子代事件贴图
};
//==============================
// * 子代容器 - 场景清空
//==============================
var _drill_COEM_o_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_COEM_o_terminate.call(this);
	$gameTemp._drill_COEM_offspringEventTank = [];				//子代事件容器
	$gameTemp._drill_COEM_offspringSpringTank = [];				//子代事件贴图容器
	$gameTemp._drill_COEM_offspringLastCreatedEvent = null;		//上一个子代事件
	$gameTemp._drill_COEM_offspringLastCreatedSprite = null;	//上一个子代事件贴图
};
//==============================
// * 子代容器 - 地图初始化
//==============================
var _drill_COEM_o_map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_COEM_o_map_initialize.call(this);
	this._drill_COEM_offspringDataTank = [];					//事件数据容器
};
//==============================
// * 子代容器 - 地图切换
//==============================
var _drill_COEM_o_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_COEM_o_map_setup.call(this,mapId);
	this._drill_COEM_offspringDataTank = [];					//事件数据容器
};
//==============================
// * 子代容器 - 获取 事件数据
//==============================
var _drill_COEM_o_event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
	
	// > 子代事件 的 事件数据
	if( $gameMap.drill_COEM_offspring_isOffspringEvent(this._eventId) == true ){
		var e_tank = $gameMap._drill_COEM_offspringDataTank;
		for(var i = 0; i< e_tank.length; i++){
			if( e_tank[i]['id'] == this._eventId ){
				return e_tank[i];
			}
		}
	}
	// > 原函数
	return _drill_COEM_o_event.call(this);
};


//==============================
// * 子代容器 - 创建事件 - 主流程（私有）
//
//			说明：	创建 事件 和 事件贴图。
//==============================
Game_Map.prototype.drill_COEM_offspring_createEvent_Private = function( map_id, event_id, tar_x, tar_y ){
	if( this._mapId == map_id ){
		
		// > 检查 源事件
		var src_event = this.event( event_id );
		if( src_event == undefined ){
			alert( "【Drill_CoreOfEventManager.js 物体管理 - 事件管理核心】\n" +
					"复制事件时错误，当前地图并不存在id为"+event_id+"的事件。");
			return null;
		}
					
		// > 获取事件数据
		var e_data = JSON.parse(JSON.stringify( src_event.event() ));
		e_data['x'] = tar_x;
		e_data['y'] = tar_y;
		if( !e_data['meta'] ){ e_data['meta'] = {}; }	//（兼容镜像错误）
		
		// > 根据数据生成事件对象
		var e = this.drill_COEM_offspring_createEventByData_Private( e_data );
		return e;
		
	}else{
		
		// > 获取map文件
		var map_data = DataManager.drill_COEM_getMapData( map_id );
		if( map_data ){
		
			// > 检查 源事件
			var src_eventData = map_data.events[event_id];
			if( src_eventData == undefined ){
				alert( "【Drill_CoreOfEventManager.js 物体管理 - 事件管理核心】\n" +
						"复制事件时错误，地图["+map_id+"]并不存在id为"+event_id+"的事件。");
				return null;
			}
			
			// > 获取事件数据
			var e_data = JSON.parse(JSON.stringify( src_eventData ));
			e_data['x'] = tar_x;
			e_data['y'] = tar_y;
			if( !e_data['meta'] ){ e_data['meta'] = {}; }	//（兼容镜像错误）
			
			// > 自定义独立开关 兼容
			if( Imported.Drill_EventSelfSwitch ){
				$gameTemp.drill_ESS_dataCovert( e_data );
			}
			
			// > 根据数据生成事件对象
			var e = this.drill_COEM_offspring_createEventByData_Private( e_data );
			return e;
			
		}else{
			
			return null;
		}
	}
}
//==============================
// * 子代容器 - 创建事件 - 根据数据（私有）
//==============================
Game_Map.prototype.drill_COEM_offspring_createEventByData_Private = function( data ){
	
	// > 分配id
	var new_id = $dataMap.events.length + this._drill_COEM_offspringDataTank.length;	//注意，$dataMap 和 $gameMap._events 存在数量不一致的情况
	data['id'] = new_id;
	this._drill_COEM_offspringDataTank.push(data);
	
	// > 清理独立开关
	$gameSelfSwitches.drill_COEM_deleteEventKeys( this._mapId, new_id );
	
	// > 创建事件
	var new_event = new Game_Event(this._mapId, new_id);
	this._events[new_id] = new_event;
	
	// > 创建事件贴图
	var new_sprite = SceneManager._scene._spriteset.drill_COEM_offspring_createSprite( new_event );
	
	// > 标记
	$gameTemp._drill_COEM_offspringEventTank.push( new_event );
	$gameTemp._drill_COEM_offspringSpringTank.push( new_sprite );
	$gameTemp._drill_COEM_offspringLastCreatedEvent = new_event;
	$gameTemp._drill_COEM_offspringLastCreatedSprite = new_sprite;
	
	return new_event;
}
//==============================
// * 子代容器 - 创建事件 - 创建事件贴图
//==============================
Spriteset_Map.prototype.drill_COEM_offspring_createSprite = function( character ){
	if( this._characterSprites == undefined ){ this._characterSprites = []; }
	var len = this._characterSprites.length;
	
	var temp_sprite = new Sprite_Character( character );
	temp_sprite.update();
	this._tilemap.addChild( temp_sprite );
	this._characterSprites[len] = temp_sprite;
	
	return temp_sprite;
};
//==============================
// * 子代容器 - 删除事件（私有）
//==============================
Game_Map.prototype.drill_COEM_offspring_deleteEvent_Private = function( e_id ){
	
	// > 只允许删除 子代事件
	if( this.drill_COEM_offspring_isOffspringEvent( e_id ) == false ){ return; }
	
	// > 执行删除
	this.drill_COEM_deleteEvent_Private( e_id );
};


//=============================================================================
// * 删除事件（私有）
//
//			说明：	此删除不分 原代容器 和 子代容器。
//=============================================================================
Game_Map.prototype.drill_COEM_deleteEvent_Private = function( e_id ){
	var tar_event = this._events[ e_id ];
	if( tar_event == null ){ return; }
	var spriteSet = SceneManager._scene._spriteset;
	
	// > 由于其他子插件大量存储事件对象的指针，无法彻底删除，此设置暂时为权宜之计
	tar_event._erased = true;
	
	// > 删除镜像贴图
	if( Imported.Drill_LayerReverseReflection ){
		spriteSet.drill_LRR_deleteEventReflect( e_id );
	}
	if( Imported.Drill_LayerSynchronizedReflection ){
		spriteSet.drill_LSR_deleteEventReflect( e_id );
	}
	
	// > 删除事件贴图
	for(var i = spriteSet._characterSprites.length-1; i >= 0; i--){
		var temp_sprite = spriteSet._characterSprites[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._character == tar_event ){
			
			// > 去除贴图
			temp_sprite._character = null;
			spriteSet._tilemap.removeChild( temp_sprite );
			
			// > 断开关联
			spriteSet._characterSprites.splice( i, 1 );
			
			// > 上一个子代事件贴图
			if( $gameTemp._drill_COEM_offspringLastCreatedSprite == temp_sprite ){
				$gameTemp._drill_COEM_offspringLastCreatedSprite = null;
			}
		}
	}
	
	// > 删除事件（原代容器）
	for(var i = $gameTemp._drill_COEM_primaryEventTank.length-1; i >= 0; i--){
		var temp_event = $gameTemp._drill_COEM_primaryEventTank[i];
		if( temp_event == tar_event ){
			
			// > 断开关联
			$gameTemp._drill_COEM_primaryEventTank.splice( i, 1 );
			$gameTemp._drill_COEM_primarySpriteTank.splice( i, 1 );
			break;
		}
	}
	
	// > 删除事件（子代容器）
	for(var i = $gameTemp._drill_COEM_offspringEventTank.length-1; i >= 0; i--){
		var temp_event = $gameTemp._drill_COEM_offspringEventTank[i];
		if( temp_event == tar_event ){
			
			// > 断开关联
			$gameTemp._drill_COEM_offspringEventTank.splice( i, 1 );
			$gameTemp._drill_COEM_offspringSpringTank.splice( i, 1 );
			
			// > 上一个子代事件
			if( $gameTemp._drill_COEM_offspringLastCreatedEvent == temp_event ){
				$gameTemp._drill_COEM_offspringLastCreatedEvent = null;
			}
			break;
		}
	}
	
	// > 事件置空
	this._events[ e_id ] = null;
	delete tar_event;
};
//=============================================================================
// * 删除全部独立开关（私有）
//=============================================================================
Game_SelfSwitches.prototype.drill_COEM_deleteEventKeys_Private = function( map_id, e_id ){
	
	// > 获取键
	var org_keys = Object.keys(this._data);
	var del_keys = [];
	for(var i=0; i < org_keys.length; i++){
		var key = org_keys[i].split(",");
		if( Number(key[0]) == Number(map_id) && Number(key[1]) == Number(e_id) ){
			del_keys.push( org_keys[i] );
		}
	}
	
	// > 测试 - 查看被删的独立开关
	//if( del_keys.length > 0 ){ alert(JSON.stringify(del_keys)); }
	
	// > 删除键
	for(var i=0; i < del_keys.length; i++){
		delete this._data[ del_keys[i] ];
	}
};


//=============================================================================
// ** 核心功能扩展 - 有效事件容器
//
//			说明：	有效事件指：非空、未被清除 的事件。
//					注意，容器的序号不与id对应。
//=============================================================================
//==============================
// * 容器 - 校验值
//==============================
DrillUp.g_COEM_checkATank = true;
//==============================
// * 容器 - 初始化
//==============================
var _drill_COEM_aTank_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function(){
	_drill_COEM_aTank_initialize.call(this);
	this._drill_COEM_availableTank = [];	//有效事件容器
	this._drill_COEM_countPrivate = 0;		//容器监听数量标记（私有参数）
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_COEM_aTank_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	this._drill_COEM_availableTank = [];	//有效事件容器
	this._drill_COEM_countPrivate = 0;		//容器监听数量标记（私有参数）
	
	// > 原函数
	_drill_COEM_aTank_setup.call( this, mapId );
	
	// > 强制刷新容器
	this.drill_COEM_updateTank();			//帧刷新 - 容器变化监听
	this.drill_COEM_updateEvents();			//帧刷新 - 容器内事件检查
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_COEM_aTank_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_COEM_aTank_update.call(this,sceneActive);
	this.drill_COEM_updateTank();			//帧刷新 - 容器变化监听
	this.drill_COEM_updateEvents();			//帧刷新 - 容器内事件检查
	this.drill_COEM_updateCheck();			//帧刷新 - 校验值
};
//==============================
// * 帧刷新 - 容器变化监听
//==============================
Game_Map.prototype.drill_COEM_updateTank = function(){
	
	// > 等于时（跳过）
	if( this._drill_COEM_countPrivate == this._events.length ){ return; }
	
	// > 小于时（新的事件加入容器）
	if( this._drill_COEM_countPrivate < this._events.length ){
		for( var i = this._drill_COEM_countPrivate; i < this._events.length; i++ ){
			this._drill_COEM_availableTank.push( this._events[i] );
		}
		this._drill_COEM_countPrivate = this._events.length;
	}
	
	// > 大于时（异常情况，事件容器常规情况只增不减）
	if( this._drill_COEM_countPrivate > this._events.length ){
		this._drill_COEM_availableTank = [];
		for( var i = 0; i < this._events.length; i++ ){
			this._drill_COEM_availableTank.push( this._events[i] );
		}
		this._drill_COEM_countPrivate = this._events.length;
	}
};
//==============================
// * 帧刷新 - 容器内事件检查
//==============================
Game_Map.prototype.drill_COEM_updateEvents = function(){
	for( var i = this._drill_COEM_availableTank.length-1; i >= 0; i-- ){
		var ev = this._drill_COEM_availableTank[i];
		if( ev == undefined ){		//（空事件排除）
			this._drill_COEM_availableTank.splice( i, 1 );
			continue;
		}
		if( ev._erased == true ){	//（清除的事件排除）
			this._drill_COEM_availableTank.splice( i, 1 );
			continue;
		}
	}
};
//==============================
// * 帧刷新 - 校验值
//==============================
Game_Map.prototype.drill_COEM_updateCheck = function(){
	
	// > 校验值
	if( DrillUp.g_COEM_checkATank == true ){
		if( this._drill_COEM_availableTank.length > this._drill_COEM_countPrivate ){
			DrillUp.g_COEM_checkATank = false;
			alert(
				"【Drill_CoreOfEventManager.js 物体管理 - 事件管理核心】\n"+
				"有效事件容器 的事件数量异常，请及时检查你的指针调用。"
			);
		}
	}
};
//==============================
// * 容器 - 获取有效事件容器 指针（私有）
//
//			说明：	返回的是容器指针，注意确保对容器只读，对事件随意操作。
//					容器中所有事件非空。
//==============================
Game_Map.prototype.drill_COEM_getAvailableEventTank_Pointer_Private = function(){
	return this._drill_COEM_availableTank;
}
//==============================
// * 容器 - 获取有效事件容器 备份容器（私有）
//
//			说明：	返回的是一个新数组，可以对该数组随意操作。
//==============================
Game_Map.prototype.drill_COEM_getAvailableEventTank_Copyed_Private = function(){
	var result = [];
	for( var i = 0; i < this._drill_COEM_availableTank.length; i++ ){
		result.push( this._drill_COEM_availableTank[i] );
	}
	return result;
}


//=============================================================================
// ** 地图读取器
//=============================================================================
//==============================
// * 地图读取器 - 获取资源（私有）
//==============================
DataManager.drill_COEM_getMapData_Private = function( map_id ){
	var map_data = window[ "_drill_mapData_"+map_id ];
	if( map_data == undefined ){
		DataManager.drill_COEM_loadMapData( map_id );
		return null;
	}else{
		return map_data;
	}
}
//==============================
// * 地图读取器 - 加载资源（私有）
//==============================
DataManager.drill_COEM_loadMapData_Private = function( map_id ){
	if( this.drill_COEM_isMapExist( map_id ) == false ){ return; }
	
	// > 绑定加载数据
	if( window[ "_drill_mapData_"+map_id ] == undefined ){
		var filename = 'Map%1.json'.format(map_id.padZero(3));
		var param_name = "_drill_mapData_" + map_id;
		
		ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, param_name, filename));		//（this._mapLoader是一个完全没用的变量）
		this.loadDataFile(param_name, filename);
	}
};
//==============================
// * 地图读取器 - 地图资源是否存在（私有）
//==============================
DataManager.drill_COEM_isMapExist_Private = function( map_id ){
	for( var j=0; j < $dataMapInfos.length; j++ ){
		var temp_info = $dataMapInfos[j];
		if( temp_info == undefined ){ continue; }
		if( temp_info['id'] == map_id ){
			return true;
		}
	}
	return false;
};

//=============================================================================
// ** 核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 屏蔽根据版本重刷地图
//
//			说明：	此功能会刷掉旧存档的存储数据，因为版本不一样会强制重进地图。
//					而这样做只是 刷新旧存档的当前地图而已，没任何好处。
//==============================
Scene_Load.prototype.reloadMapIfUpdated = function() {
	// （禁止重刷）
};


}
