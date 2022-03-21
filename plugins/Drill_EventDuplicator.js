//=============================================================================
// Drill_EventDuplicator.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        物体 - 事件复制器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventDuplicator +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以通过插件指令复制一个事件。
 * 复制的事件是临时的，离开地图后消失。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。有部分插件依赖该插件。
 * 扩展于：
 *   - Drill_EventSelfSwitch        物体 - 独立开关★★v1.7及以上★★
 *     复制的事件可以支持自定义E、F、G 等的独立开关。
 *   - Drill_BombCore               炸弹人 - 游戏核心
 *     目标插件基于该插件才能进行对炸弹的基本操作。
 *   - Drill_EventForPlayer         物体 - 玩家的事件
 *     目标插件基于该插件才能进行对玩家事件的创建。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 细节：
 *   (1.复制器不建议复制自身，因为会出现死循环。
 *   (2.复制出来的事件独立开关是全部关闭的，不会随 复制源 变化。
 * 注意事项：
 *   (1.该指令在【进地图后立即使用是无效的】，因为此时还需初始化外部
 *      地图的事件数据。你可能需要等90帧再进行。
 *   (2.其中v1.5以下低版本的rmmv工程不支持事件复制。
 * 设计：
 *   (1.你可以设置初始事件透明，配合 事件显现动作 插件，使得事件像是
 *      跳出来或者召唤出来一样。
 *   (2.你可以建立一个模板管理层，并通过事件复制器复制任何你想要的
 *      事件，比如一个可拾取的物品事件、一个炸弹、一个弹丸等。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 复制本图事件
 * 你可以通过插件指令手动修改生成的一些基本设置。
 *
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件[1] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件[1] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件[1] : 指定位置(变量) : 25 : 26
 *
 * 1.第一条参数为：被复制的事件id，复制到位置的事件id
 * 2.第二条参数为：被复制的事件id，复制到位置x，复制到位置y
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 复制其他图事件
 * 你可以通过插件指令手动修改生成的一些基本设置。
 *
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 指定位置(变量) : 25 : 26
 * 
 * 1.第一条参数为：地图id，被复制的事件id，复制到位置的事件id
 * 2.第二条参数为：地图id，被复制的事件id，复制到位置x，复制到位置y
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 初始透明
 * 你也可以设置初始的事件的透明情况。
 *
 * 插件指令：>事件复制器 : 事件透明开启
 * 插件指令：>事件复制器 : 事件透明关闭
 * 
 * 1.透明开启后，接下来复制的全部事件，都是透明的。并且永久有效。
 *   你需要根据情况手动关闭。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取新事件id
 * 你可以通过插件指令获取到复制的新事件的id：
 * 
 * 插件指令：>事件复制器 : 获取上一个复制事件的id : 变量[25]
 * 
 * 1.数字是 变量 的编号，新事件的id会被复制到这个变量的值中。
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
 * [v1.1]
 * 添加了初始透明、获取新事件的id功能。
 * [v1.2]
 * 添加了版本检测。
 * [v1.3]
 * 添加了性能测试说明。
 * [v1.4]
 * 添加了游戏时，对地图id的校验检查功能。
 * [v1.5]
 * 优化了内部整体结构。
 * [v1.6]
 * 添加了 指定位置(变量) 插件指令。
 * 添加了 自定义独立开关 的支持。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EDu （Event_Duplicator）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_EDu_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		单次执行
//		时间复杂度		o(n)
//		性能测试因素	放置超级多的炸弹
//		性能测试消耗	28.05ms
//		最坏情况		无	
//		备注			建立事件不消耗，消耗的是事件建立后的各种行为。
//
//插件记录：
//		★大体框架与功能如下：
//			事件复制器：
//				->流程
//					->复制本地图的事件
//					->复制其它地图的事件
//				->地图读取器
//				->事件容器
//					->分配id
//					->创建事件
//					->创建事件贴图
//					->清理独立开关
//				->版本检验
//
//		★必要注意事项：
//			1.事件的独立开关是独立于事件的，需要额外刷新。
//			2.如果你需要引用该插件来创建一个外部地图的事件，
//			  那么必须先预加载地图文本数据，再创建事件。（可参考 Drill_EventForPlayer ）
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
　　Imported.Drill_EventDuplicator = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventDuplicator');
	
//=============================================================================
// * 版本检验
//=============================================================================
if( !Utils.RPGMAKER_VERSION || Utils.RPGMAKER_VERSION < "1.5.0" ){
	
	alert("【Drill_EventDuplicator.js 物体 - 事件复制器】\n检测到你的rmmv工程版本太低，事件复制器无法使用。\n会报ResourceHandler资源指针错误。\n你可以使用\"rmmv软件版本.docx\"中的升级工程的方法来升级你的工程。 ");
	Imported.Drill_EventDuplicator = false;
	
}else{
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EDu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EDu_pluginCommand.call(this, command, args);
	if( command === ">事件复制器" ){
		
		/*-----------------复制本图事件------------------*/
		if(args.length >= 8){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var pos = String(args[5]);
			var temp2 = Number(args[7]);
			if(args[9]){ var temp3 = Number(args[9]) };
			
			if( type == "复制本图事件" ){
				temp1 = temp1.replace("源事件[","");
				temp1 = temp1.replace("原事件[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( pos == "指定位置" ){
					if( $gameMap.drill_EDu_isEventExist( temp1 ) == false ){ return; }
					// > 生成事件
					var e = $gameMap.drill_EDu_createEvent( $gameMap._mapId, temp1, temp2, temp3 );
					// > 设置透明度
					if( $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "指定位置(变量)" ){
					if( $gameMap.drill_EDu_isEventExist( temp1 ) == false ){ return; }
					temp2 = $gameVariables.value(temp2);
					temp3 = $gameVariables.value(temp3);
					// > 生成事件
					var e = $gameMap.drill_EDu_createEvent( $gameMap._mapId, temp1, temp2, temp3 );
					// > 设置透明度
					if( $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "事件位置" ){
					if( $gameMap.drill_EDu_isEventExist( temp1 ) == false ){ return; }
					if( $gameMap.drill_EDu_isEventExist( temp2 ) == false ){ return; }
					var xx = $gameMap.event(temp2)._x;
					var yy = $gameMap.event(temp2)._y;
					// > 生成事件
					$gameMap.drill_EDu_createEvent( $gameMap._mapId, temp1, xx, yy );
					// > 设置透明度
					if( $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
			}
		}
		
		/*-----------------复制其他图事件------------------*/
		if(args.length >= 10){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var pos = String(args[7]);
			var temp3 = Number(args[9]);
			if(args[11]){ var temp4 = Number(args[11]) };
			
			if( type == "复制其他图事件" ){
				temp1 = temp1.replace("地图[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				temp2 = temp2.replace("源事件[","");
				temp2 = temp2.replace("原事件[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( pos == "指定位置" ){
					if( $gameTemp.drill_EDu_hasMapId( temp1 ) == false ){ return; }
					// > 生成事件
					var xx = Number(temp3);
					var yy = Number(temp4);
					var e = $gameMap.drill_EDu_createEvent( temp1, temp2, xx, yy );
					// > 设置透明度
					if( e && $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "指定位置(变量)" ){
					if( $gameTemp.drill_EDu_hasMapId( temp1 ) == false ){ return; }
					// > 生成事件
					var xx = $gameVariables.value(temp3);
					var yy = $gameVariables.value(temp4);
					var e = $gameMap.drill_EDu_createEvent( temp1, temp2, xx, yy );
					// > 设置透明度
					if( e && $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "事件位置" ){
					if( $gameTemp.drill_EDu_hasMapId( temp1 ) == false ){ return; }
					if( $gameMap.drill_EDu_isEventExist( temp3 ) == false ){ return; }
					// > 生成事件
					var xx = $gameMap.event(temp3)._x;
					var yy = $gameMap.event(temp3)._y;
					var e = $gameMap.drill_EDu_createEvent( temp1, temp2, xx, yy );
					// > 设置透明度
					if( e && $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
					
				}
			}
		}
		
		/*-----------------初始透明------------------*/
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "事件透明开启" ){
				$gameSystem._drill_EDu_is_opacity = true;
			}
			if( type == "事件透明关闭" ){
				$gameSystem._drill_EDu_is_opacity = false;
			}
		}
		
		/*-----------------获取新事件id------------------*/
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "获取上一个复制事件的id" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameVariables.setValue(temp1, $gameSystem._drill_EDu_last_id);
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EDu_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventDuplicator.js 物体 - 事件复制器】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - 解析地图id（预加载地图数据）
//==============================
var _drill_EDu_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	this.drill_EDu_loadMapData();
    _drill_EDu_onMapLoaded.call(this);
};
Scene_Map.prototype.drill_EDu_loadMapData = function() {	
	
	// > 获取当前地图的全部插件指令
	var temp_map = {};
	var dataString = JSON.stringify( $dataMap.events );
	
	// > 全词匹配
	var matches = dataString.match( />事件复制器 : 复制其他图事件 : (\d+) :/g ) ;
	if( matches ){
		for( var i=0; i< matches.length; i++ ){		//（标记地图id）
			var str = matches[i].match( />事件复制器 : 复制其他图事件 : (\d+) :/ );
			temp_map[Number(str[1])] = true;
		}
	}
	var matches = dataString.match( />事件复制器 : 复制其他图事件 : 地图\[(\d+)\] :/g ) ;
	if( matches ){
		for( var i=0; i< matches.length; i++ ){
			var str = matches[i].match( />事件复制器 : 复制其他图事件 : 地图\[(\d+)\] :/ );
			temp_map[Number(str[1])] = true;
		}
	}
	
	// > 加载地图id
	for( var key in temp_map ){
		if( $gameTemp.drill_EDu_hasMapId( key ) == false ){
			alert(
				"【Drill_EventDuplicator.js 物体 - 事件复制器】\n" + 
				"插件指令指定要复制地图"+ key +"中的某个事件。\n"+
				"但是系统并没有找到这个地图文件。\n"+
				"请检查你的地图文件是否存在，或者修改插件指令。"
			);
		}
		DataManager.drill_loadMapData( key );
	}
};
//==============================
// ** 插件指令 - 检查地图id
//==============================
Game_Temp.prototype.drill_EDu_hasMapId = function( map_id ) {	
	for( var j=0; j < $dataMapInfos.length; j++ ){
		var temp_info = $dataMapInfos[j];
		if( temp_info != undefined && temp_info['id'] == map_id ){
			return true;
		}
	}
	return false;
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_EDu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EDu_sys_initialize.call(this);
	this._drill_EDu_last_id = 0;			//上一个生成的事件id
	this._drill_EDu_is_opacity = false;		//透明度（只限于本插件的指令）
}


//=============================================================================
// ** 	地图读取器
//		
//		主功能：	通过调用主函数，返回一个地图json类。
//					
//		说明：		注意，由于含异步请求，如果未提前加载，则不能立即返回数据。
//		调用方法：	DataManager.drill_loadMapData( map_id );					//预加载
//					var map_data = DataManager.drill_getMapData( map_id );		//调用数据
//=============================================================================
//==============================
// * 读取器 - 获取资源
//==============================
DataManager.drill_getMapData = function( map_id ){
	var map_data = window[ "_drill_mapData_"+map_id ];
	if( map_data == undefined ){
		DataManager.drill_loadMapData( map_id );
		return null;
	}else{
		return map_data;
	}
}
//==============================
// * 读取器 - 读取资源
//==============================
DataManager.drill_loadMapData = function( map_id ){
	if( map_id > 0 && window[ "_drill_mapData_"+map_id ] == undefined ){
		var filename = 'Map%1.json'.format(map_id.padZero(3));
		var param_name = "_drill_mapData_" + map_id;
		
		ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, param_name, filename));		//（this._mapLoader是一个完全没用的变量）
		this.loadDataFile(param_name, filename);
	}
};


//=============================================================================
// ** 	事件容器
//		
//		主功能：	通过调用主函数，快速新建一个事件。
//		
//		说明：		调用时注意，是要单独的函数，还是要一个整体的创建流程。
//		调用方法：	var event = $gameMap.drill_EDu_createEvent( map_id, event_id, tar_x, tar_y );		//整体流程
//					var event = $gameMap.drill_newEvent_createEvent( data );							//单独函数
//=============================================================================
//==============================
// * 流程 - 创建事件（接口）
//
//			参数： 来源地图id，来源事件id，放置位置x，方式位置y
//			说明： 该流程进行了部分兼容处理，执行成功，返回事件，执行失败，返回null。
//==============================
Game_Map.prototype.drill_EDu_createEvent = function( map_id, event_id, tar_x, tar_y ){
	if( this._mapId == map_id ){
		
		// > 检查 源事件
		var src_event = this.event( event_id );
		if( src_event == undefined ){
			alert( "【Drill_EventDuplicator.js 物体 - 事件复制器】\n" +
					"复制事件时错误，当前地图并不存在id为"+event_id+"的事件。");
			return null;
		}
					
		// > 获取事件数据
		var e_data = JSON.parse(JSON.stringify( src_event.event() ));
		e_data['x'] = tar_x;
		e_data['y'] = tar_y;
		if( !e_data['meta'] ){ e_data['meta'] = {}; }	//（兼容镜像错误）
		
		// > 根据数据生成事件对象
		var e = this.drill_newEvent_createEvent( e_data );
		
		// > 记录上一个id
		$gameSystem._drill_EDu_last_id = e._eventId;
		return e;
		
	}else{
		
		// > 获取map文件
		var map_data = DataManager.drill_getMapData( map_id );
		if( map_data ){
		
			// > 检查 源事件
			var src_eventData = map_data.events[event_id];
			if( src_eventData == undefined ){
				alert( "【Drill_EventDuplicator.js 物体 - 事件复制器】\n" +
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
			var e = this.drill_newEvent_createEvent( e_data );
			
			// > 记录上一个id
			$gameSystem._drill_EDu_last_id = e._eventId;
			return e;
			
		}else{
			
			return null;
		}
	}
}
//==============================
// * 容器 - 地图初始化
//==============================
var _drill_newEvent_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_newEvent_initialize.call(this);
	this._drill_newEvents_dataTank = [];
}
//==============================
// * 容器 - 切换地图
//==============================
var _drill_newEvent_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_newEvent_setup.call(this,mapId);
	this._drill_newEvents_dataTank = [];
}
//==============================
// * 容器 - 创建事件对象（接口）
//
//			参数： 事件json数据
//			说明： 函数可以单独调用，返回一个事件，但是没有对特殊情况进行处理，需要额外加工。
//==============================
Game_Map.prototype.drill_newEvent_createEvent = function( data ) {
	
	// > 分配id
	var new_id = $dataMap.events.length + this._drill_newEvents_dataTank.length;	//注意，$dataMap 和 $gameMap._events 存在数量不一致的情况
	data['id'] = new_id;
	this._drill_newEvents_dataTank.push(data);
	
	// > 清理独立开关
	$gameSelfSwitches.drill_newEvent_clearKeys( this._mapId, new_id );
	
	// > 建立事件对象
	var new_event = new Game_Event(this._mapId, new_id);
	this._events[new_id] = new_event;
	
	// > 添加事件贴图
	SceneManager._scene._spriteset.drill_newEvent_createSprite(new_event);
	return new_event;
}
//==============================
// * 容器 - 获取数据
//==============================
var _drill_newEvent_event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
	
	// > 新建的事件
	if( Number(this._eventId) >= $dataMap.events.length ){	//（新事件id >= map.json本体的事件数量）
		var e_tank = $gameMap._drill_newEvents_dataTank;
		for(var i = 0; i< e_tank.length; i++){
			if( e_tank[i]['id'] == this._eventId ){
				return e_tank[i];
			}
		}
	}
	// > 原地图设置的事件
	return _drill_newEvent_event.call(this);
};
//==============================
// * 容器 - 清除指定事件的全部独立开关（不刷新地图）
//==============================
Game_SelfSwitches.prototype.drill_newEvent_clearKeys = function( map_id, e_id ) {
	
	// > 获取键
	var org_keys = Object.keys(this._data);
	var del_keys = [];
	for(var i=0; i < org_keys.length; i++){
		var key = org_keys[i].split(",");
		if( Number(key[0]) == Number(map_id) && Number(key[1]) == Number(e_id) ){
			del_keys.push( org_keys[i] );
		}
	}
	//if( del_keys.length > 0 ){ alert(JSON.stringify(del_keys)); }	//检测id初始化前，就有的相关开启的独立开关
	
	// > 删除键
	for(var i=0; i < del_keys.length; i++){
		delete this._data[ del_keys[i] ];
	}
};
//==============================
// ** 容器 - 添加事件贴图
//==============================
Spriteset_Map.prototype.drill_newEvent_createSprite = function( target ){
	this._characterSprites = this._characterSprites || [];
	var len = this._characterSprites.length;
	this._characterSprites[len] = new Sprite_Character(target);
	this._characterSprites[len].update();
	this._tilemap.addChild(this._characterSprites[len]);
};


}
