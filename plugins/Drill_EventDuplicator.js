//=============================================================================
// Drill_EventDuplicator.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        物体管理 - 事件复制器
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
 * 该插件 不能 单独使用。
 * 需要基于核心，也可以作用于其它插件。
 * 基于：
 *   - Drill_CoreOfEventManager     物体管理-事件管理核心
 * 扩展于：
 *   - Drill_EventSelfSwitch        物体-独立开关★★v1.7及以上★★
 *     复制的事件可以支持自定义E、F、G 等的独立开关。
 *   - Drill_EventForPlayer         物体管理-玩家的事件
 *     目标插件基于该插件才能进行对玩家事件的创建。
 *   - Drill_BombCore               炸弹人-游戏核心
 *     目标插件基于该插件才能进行对炸弹的基本操作。
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
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件变量[21] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件变量[21] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件变量[21] : 指定位置(变量) : 25 : 26
 *
 * 1.第一条参数为：被复制的事件id，复制到位置的事件id。
 * 2.第二条参数为：被复制的事件id，复制到位置x，复制到位置y。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 复制其他图事件
 * 你可以通过插件指令手动修改生成的一些基本设置。
 *
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 指定位置(变量) : 25 : 26
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件变量[21] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件变量[21] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件变量[21] : 指定位置(变量) : 25 : 26
 * 
 * 1.第一条参数为：地图id，被复制的事件id，复制到位置的事件id。
 * 2.第二条参数为：地图id，被复制的事件id，复制到位置x，复制到位置y。
 * 3."地图[1]"的数值不能设置为变量，因为插件指令需要对此地图id对应的资源进行预加载。
 *   建议你将需要复制的事件，都放置到统一的地图中，再进行复制。（比如示例的模板管理层）
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
 * [v1.7]
 * 修改了插件分类。
 * [v1.8]
 * 添加了 "源事件变量" 的设置。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
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
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventManager ){
	
	
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
				var e_id = 0;
				if( temp1.indexOf("源事件[") != -1 ||
					temp1.indexOf("原事件[") != -1 ){
					temp1 = temp1.replace("源事件[","");
					temp1 = temp1.replace("原事件[","");
					temp1 = temp1.replace("]","");
					e_id = Number(temp1);
				}
				if( temp1.indexOf("源事件变量[") != -1 ||
					temp1.indexOf("原事件变量[") != -1 ){
					temp1 = temp1.replace("源事件变量[","");
					temp1 = temp1.replace("原事件变量[","");
					temp1 = temp1.replace("]","");
					e_id = $gameVariables.value( Number(temp1) );
				}
				if( pos == "指定位置" ){
					if( $gameMap.drill_EDu_isEventExist( e_id ) == false ){ return; }
					// > 生成事件
					var e = $gameMap.drill_COEM_offspring_createEvent( $gameMap._mapId, e_id, temp2, temp3 );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
					// > 设置透明度
					if( $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "指定位置(变量)" ){
					if( $gameMap.drill_EDu_isEventExist( e_id ) == false ){ return; }
					temp2 = $gameVariables.value(temp2);
					temp3 = $gameVariables.value(temp3);
					// > 生成事件
					var e = $gameMap.drill_COEM_offspring_createEvent( $gameMap._mapId, e_id, temp2, temp3 );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
					// > 设置透明度
					if( $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "事件位置" ){
					if( $gameMap.drill_EDu_isEventExist( e_id ) == false ){ return; }
					if( $gameMap.drill_EDu_isEventExist( temp2 ) == false ){ return; }
					var xx = $gameMap.event(temp2)._x;
					var yy = $gameMap.event(temp2)._y;
					// > 生成事件
					$gameMap.drill_COEM_offspring_createEvent( $gameMap._mapId, e_id, xx, yy );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
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
				var e_id = 0;
				if( temp2.indexOf("源事件[") != -1 ||
					temp2.indexOf("原事件[") != -1 ){
					temp2 = temp2.replace("源事件[","");
					temp2 = temp2.replace("原事件[","");
					temp2 = temp2.replace("]","");
					e_id = Number(temp2);
				}
				if( temp2.indexOf("源事件变量[") != -1 ||
					temp2.indexOf("原事件变量[") != -1 ){
					temp2 = temp2.replace("源事件变量[","");
					temp2 = temp2.replace("原事件变量[","");
					temp2 = temp2.replace("]","");
					e_id = $gameVariables.value( Number(temp2) );
				}
				if( pos == "指定位置" ){
					if( $gameTemp.drill_COEM_isMapExist( temp1 ) == false ){ return; }
					// > 生成事件
					var xx = Number(temp3);
					var yy = Number(temp4);
					var e = $gameMap.drill_COEM_offspring_createEvent( temp1, e_id, xx, yy );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
					// > 设置透明度
					if( e && $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "指定位置(变量)" ){
					if( $gameTemp.drill_COEM_isMapExist( temp1 ) == false ){ return; }
					// > 生成事件
					var xx = $gameVariables.value(temp3);
					var yy = $gameVariables.value(temp4);
					var e = $gameMap.drill_COEM_offspring_createEvent( temp1, e_id, xx, yy );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
					// > 设置透明度
					if( e && $gameSystem._drill_EDu_is_opacity ){ e._opacity = 0; }
				}
				if( pos == "事件位置" ){
					if( $gameTemp.drill_COEM_isMapExist( temp1 ) == false ){ return; }
					if( $gameMap.drill_EDu_isEventExist( temp3 ) == false ){ return; }
					// > 生成事件
					var xx = $gameMap.event(temp3)._x;
					var yy = $gameMap.event(temp3)._y;
					var e = $gameMap.drill_COEM_offspring_createEvent( temp1, e_id, xx, yy );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
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
		alert( "【Drill_EventDuplicator.js 物体管理 - 事件复制器】\n" +
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
		if( $gameTemp.drill_COEM_isMapExist( key ) == false ){
			alert(
				"【Drill_EventDuplicator.js 物体管理 - 事件复制器】\n" + 
				"插件指令指定要复制地图"+ key +"中的某个事件。\n"+
				"但是系统并没有找到这个地图文件。\n"+
				"请检查你的地图文件是否存在，或者修改插件指令。"
			);
		}
		DataManager.drill_COEM_loadMapData( key );
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EDu_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EDu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EDu_sys_initialize.call(this);
	this.drill_EDu_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EDu_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EDu_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EDu_saveEnabled == true ){	
		$gameSystem.drill_EDu_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EDu_initSysData();
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
Game_System.prototype.drill_EDu_initSysData = function() {
	this.drill_EDu_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EDu_checkSysData = function() {
	this.drill_EDu_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EDu_initSysData_Private = function() {
	
	this._drill_EDu_last_id = 0;			//上一个生成的事件id
	this._drill_EDu_is_opacity = false;		//透明度（只限于本插件的指令）

};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EDu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EDu_last_id == undefined ){
		this.drill_EDu_initSysData();
	}
	
};

//=============================================================================
// ** 旧插件 函数的兼容
//=============================================================================
//==============================
// * 创建事件（主流程）
//==============================
Game_Map.prototype.drill_EDu_createEvent = function( map_id, event_id, tar_x, tar_y ){
	return this.drill_COEM_offspring_createEvent( map_id, event_id, tar_x, tar_y );
};
//==============================
// * 创建事件（根据数据）
//==============================
Game_Map.prototype.drill_newEvent_createEvent = function( data ){
	return this.drill_COEM_offspring_createEventByData_Private( data );
};
//==============================
// * 删除全部独立开关
//==============================
Game_SelfSwitches.prototype.drill_newEvent_clearKeys = function( map_id, e_id ){
	this.drill_COEM_deleteEventKeys_Private( map_id, e_id );
};
//==============================
// * 地图读取器 - 获取资源
//==============================
DataManager.drill_getMapData = function( map_id ){
	return this.drill_COEM_getMapData_Private( map_id );
};
//==============================
// * 地图读取器 - 提前加载资源
//==============================
DataManager.drill_loadMapData = function( map_id ){
	this.drill_COEM_loadMapData_Private( map_id );
};
//==============================
// * 地图读取器 - 地图资源是否存在
//==============================
Game_Temp.prototype.drill_EDu_hasMapId = function( map_id ){
	return this.drill_COEM_isMapExist( map_id );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventDuplicator = false;
		alert(
			"【Drill_EventDuplicator.js 物体管理 - 事件复制器】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfEventManager 物体管理-事件管理核心"
		);
}

