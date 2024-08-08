//=============================================================================
// Drill_EventForPlayer.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        物体管理 - 玩家的事件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventForPlayer +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以创建一个事件并时刻与玩家位置重合，还够与玩家一起跨地图。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_EventDuplicator        物体管理-事件复制器★★v1.5及以上版本★★
 *     跨地图时，需要该插件才能复制事件。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于玩家。
 * 2.详细内容去看看 "28.物体管理 > 关于事件管理核心.docx"。
 * 玩家的事件：
 *   (1.插件原理为：创建一个始终与玩家重合的事件。
 *      如果玩家进入新地图，那么事件也会在新地图中被创建。
 *   (2.玩家的事件可以代替玩家执行自定义事件指令，
 *      相当于一个触发接收器。
 *   (3.玩家释放技能、召唤事件等，从设计上不属于该插件的功能。
 *      你应该用事件复制器，在模板管理地图中进行复制使用。
 * 细节：
 *   (1.被绑定事件的触发条件："确定键"，"玩家接近"，"事件接近"等
 *      将会完全失效，由于时刻跟随玩家，所以不能执行这些触发。
 *   (2.事件进入新地图时，事件id会变化。
 *      另外，事件独立开关开启后永久有效，可以跨地图，且不会被重置。
 *   (3.你可以使用插件指令，使得事件的贴图保持与玩家贴图同步。
 * 设计：
 *   (1.炸弹爆炸时，玩家对于炸弹的触发毫无反应，因为玩家不是事件。
 *      你可以添加 玩家的事件，这样事件被炸弹触发时，可以执行受伤流程。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 绑定
 * 你需要使用插件指令来将事件绑定到玩家：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>玩家的事件 : 永久绑定到玩家 : 地图[21] : 事件名[玩家事件-伤害]
 * 
 * 1.事件名是唯一标识，不能绑定重复的事件名。
 * 2.绑定后是永久性的，无法解除，如果你要消除该事件，切换事件页为空事件页即可。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 获取事件id
 * 你需要在使用玩家的变量进行：
 * 
 * 插件指令：>玩家的事件 : 事件名[玩家事件-伤害] : 赋值事件id给变量 : 变量[10]
 * 
 * 1.由于进入不同的地图，玩家的事件变量id的值会变。
 *   所以使用前，需要先执行插件指令获取到事件id。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 其它控制
 * 你可以使用下面的插件指令：
 * 
 * 插件指令：>玩家的事件 : 事件名[玩家事件-伤害] : 事件贴图与玩家同步 : 开启
 * 插件指令：>玩家的事件 : 事件名[玩家事件-伤害] : 事件贴图与玩家同步 : 关闭
 * 
 * 插件指令：>玩家的事件 : DEBUG显示当前的绑定情况
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
 * 测试方法：   绑定了5个事件后，在物体管理层和其他管理层穿梭之间来回穿梭。
 * 测试结果：   地图界面中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.玩家的事件不要绑定太多，最好不要超过10个，因为进入新地图后，
 *   事件会被新复制到地图中，增加地图事件的数量。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了事件贴图与玩家贴图同步的功能。
 * [v1.2]
 * 修改了插件分类。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * [v1.4]
 * 优化了内部结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFP （Event_For_Player）
//		临时全局变量	DrillUp.g_EFP_xxx
//		临时局部变量	this._drill_EFP_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	物体管理层、其他管理层穿梭
//		★性能测试消耗	3.70ms
//		★最坏情况		如果绑定了20个以上的事件，不仅给插件加大消耗，而且还给地图带来更多负担。
//		★备注			暂无
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
//				->绑定容器（跨地图）（容器只增不减）
//			
//			->☆创建管理
//				->延迟创建容器
//				->事件对象容器
//				->帧刷新
//					->延迟创建列表（玩家临时用插件指令绑定了新事件时）
//					->监听创建时机
//						->执行创建
//				->获取
//					->指定地图的事件数据（根据事件名）
//					->本地图的事件对象（根据事件名）
//			
//			->☆独立开关跨地图
//			->☆物体的属性
//			->☆数据同步
//				->无视确定键的触发
//			->☆贴图同步
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//			
//		★其它说明细节：
//			1.从原理实现上，就是复制一个事件然后绑定。
//			  只是由于附带条件太多，藕断丝连。事件id随时变，开关需要存储，所以关联在一起非常复杂。
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
	DrillUp.g_EFP_PluginTip_curName = "Drill_EventForPlayer.js 物体管理-玩家的事件";
	DrillUp.g_EFP_PluginTip_baseList = [
		"Drill_EventSelfSwitch.js 物体-独立开关",
		"Drill_EventDuplicator.js 物体管理-事件复制器"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EFP_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EFP_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EFP_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EFP_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EFP_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFP_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFP_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 地图文件丢失
	//==============================
	DrillUp.drill_EFP_getPluginTip_MapLost = function( key ){
		return "【" + DrillUp.g_EFP_PluginTip_curName + "】\n"+
				"插件指令指定要复制地图"+ key +"中的某个事件。\n"+
				"但是系统并没有找到这个地图文件。\n"+
				"请检查你的地图文件是否存在，或者修改插件指令。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件（名称）
	//==============================
	DrillUp.drill_EFP_getPluginTip_EventNameNotFind = function( mapId, eventName ){
		return "【" + DrillUp.g_EFP_PluginTip_curName + "】\n"+
				"插件指令指定的地图"+ mapId +"中，\n"+
				"并没有名称为"+ eventName +" 的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventForPlayer = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventForPlayer');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventSelfSwitch &&
	Imported.Drill_EventDuplicator ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EFP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFP_pluginCommand.call(this, command, args);
	if( command === ">玩家的事件" ){
			
		/*-----------------绑定------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( temp1 == "永久绑定到玩家" ){
				temp2 = temp2.replace("地图[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				temp3 = temp3.replace("事件名[","");
				temp3 = temp3.replace("]","");
				temp3 = String(temp3);
				var data = {
					'map_id': temp2,
					'eventName': temp3,
					'spriteSynchronized': false,
				}
				$gameSystem.drill_EFP_pushBind( data );
			}
		}
		/*-----------------绑定数据操作------------------*/
		if( args.length == 6 ){
			var event_name = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( event_name.indexOf("事件名[") != -1 ){
				event_name = event_name.replace("事件名[","");
				event_name = event_name.replace("]","");
				
				var e = $gameMap.drill_EFP_getCurMapEventByName( event_name );
				if( e == undefined ){ return; }
				
				var e_id = e._eventId;
				if( temp2 == "赋值事件id给变量" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					$gameVariables.setValue( Number(temp3), e_id );
				}
			}
		}
		/*-----------------绑定数据操作------------------*/
		if( args.length == 6 ){
			var event_name = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( event_name.indexOf("事件名[") != -1 ){
				event_name = event_name.replace("事件名[","");
				event_name = event_name.replace("]","");
				
				if( temp2 == "事件贴图与玩家同步" ){
					if( temp3 == "启用" || temp3 == "开启" || temp3 == "打开" || temp3 == "启动" ){
						var data = $gameSystem.drill_EFP_getBindByName( event_name );
						data['spriteSynchronized'] = true;
						$gameSystem.drill_EFP_setBindByName( event_name, data );
					}
					if( temp3 == "关闭" || temp3 == "禁用" ){
						var data = $gameSystem.drill_EFP_getBindByName( event_name );
						data['spriteSynchronized'] = false;
						$gameSystem.drill_EFP_setBindByName( event_name, data );
					}
				}
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "DEBUG显示当前的绑定情况" ){
				
				var context = "【" + DrillUp.g_EFP_PluginTip_curName + "】\n";
				for(var i = 0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
					var bind = $gameSystem._drill_EFP_bindTank[i];
					var e = $gameMap._drill_EFP_eventTank[i];
					context += "【";
					context += String( i+1 );
					context += "】事件名：";
					context += bind['eventName'];
					context += "，来自地图：";
					context += bind['map_id'];
					context += "，事件id(当前地图)：";
					context += String( e._eventId );
					context += "\n";
				}
				if( $gameSystem._drill_EFP_bindTank.length == 0 ){
					context += "【无】";
				}
				alert( context );
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFP_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFP_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EFP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EFP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EFP_sys_initialize.call(this);
	this.drill_EFP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EFP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EFP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EFP_saveEnabled == true ){	
		$gameSystem.drill_EFP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EFP_initSysData();
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
Game_System.prototype.drill_EFP_initSysData = function() {
	this.drill_EFP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EFP_checkSysData = function() {
	this.drill_EFP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EFP_initSysData_Private = function() {
	
	this._drill_EFP_bindTank = [];			//绑定容器（跨地图）（容器只增不减）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EFP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EFP_bindTank == undefined ){
		this.drill_EFP_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令使用时才赋值）
};

//==============================
// * 存储数据 - 添加绑定
//==============================
Game_System.prototype.drill_EFP_pushBind = function( bind ){
	
	// > 默认值
	if( bind['map_id'] == undefined ){ bind['map_id'] = 0 };
	if( bind['eventName'] == undefined ){ bind['eventName'] = "" };
	if( bind['spriteSynchronized'] == undefined ){ bind['spriteSynchronized'] = true };
	if( bind['switchTank'] == undefined ){ bind['switchTank'] = {} };
	
	
	// > 去空（事件名为唯一标识）
	if( bind['eventName'] == "" ){ return; }
	
	// > 去重（事件名为唯一标识）
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_EFP_bindTank[i];
		if( temp_bind['eventName'] == bind['eventName'] ){
			return;
		}
	}
	
	this._drill_EFP_bindTank.push( bind );
};
//==============================
// * 存储数据 - 设置 绑定数据
//==============================
Game_System.prototype.drill_EFP_setBindByName = function( eventName, data ){
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_EFP_bindTank[i];
		if( temp_bind['eventName'] == eventName ){
			$gameSystem._drill_EFP_bindTank[i] = data;
			break;
		}
	}
};
//==============================
// * 存储数据 - 获取 绑定数据
//==============================
Game_System.prototype.drill_EFP_getBindByName = function( eventName ){
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_EFP_bindTank[i];
		if( temp_bind['eventName'] == eventName ){
			return temp_bind;
		}
	}
	return {}
};



//=============================================================================
// ** ☆创建管理
//
//			说明：	> 此模块专门控制 创建事件 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 创建管理 - 初始化
//==============================
var _drill_EFP_map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_EFP_map_initialize.call( this );
	
	this._drill_EFP_isCreateList = [];		//延迟创建容器（与 _drill_EFP_bindTank 的数据下标一一对应）
	this._drill_EFP_eventTank = [];			//事件对象容器（与 _drill_EFP_bindTank 的数据下标一一对应）
}
//==============================
// * 创建管理 - 切换地图时
//==============================
var _drill_EFP_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_EFP_map_setup.call( this, mapId );
	
	// > 重置容器
	this._drill_EFP_isCreateList = [];
	this._drill_EFP_eventTank = [];
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		this._drill_EFP_isCreateList[i] = false;	//延迟创建
		this._drill_EFP_eventTank[i] = null;		//事件对象
	}
	
	// > 加载地图
	var temp_map = {};
	for(var i = 0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var bind_data = $gameSystem._drill_EFP_bindTank[i];
		DataManager.drill_COEM_loadMapData( bind_data['map_id'] );
	}
}
//==============================
// * 创建管理 - 帧刷新
//==============================
var _drill_EFP_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EFP_map_update.call( this,sceneActive );
	if( sceneActive ){
		this.drill_EFP_updateCreateList();			//帧刷新 - 延迟创建列表
		this.drill_EFP_updateCreateEvent();			//帧刷新 - 监听创建时机
	}
}
//==============================
// * 创建管理 - 帧刷新 - 延迟创建列表
//
//			说明：	> 玩家临时用插件指令绑定了新事件时，自动扩充延迟创建容器。
//==============================
Game_Map.prototype.drill_EFP_updateCreateList = function(){
	if( this._drill_EFP_isCreateList.length < $gameSystem._drill_EFP_bindTank.length ){
		
		// > 添加到容器
		var new_index = this._drill_EFP_isCreateList.length;
		this._drill_EFP_isCreateList[ new_index ] = false;	//延迟创建
		this._drill_EFP_eventTank[ new_index ] = null;		//事件对象
		
		// > 加载地图
		var bind_data = $gameSystem._drill_EFP_bindTank[ new_index ];
		if( bind_data == undefined ){ return; }
		DataManager.drill_COEM_loadMapData( bind_data['map_id'] );
	}
}
//==============================
// * 创建管理 - 帧刷新 - 监听创建时机
//==============================
Game_Map.prototype.drill_EFP_updateCreateEvent = function(){
	for(var i = 0; i < this._drill_EFP_isCreateList.length; i++ ){
		var is_created = this._drill_EFP_isCreateList[i];
		if( is_created == false ){
			
			// > 地图加载未加载完成，跳出
			var bind_data = $gameSystem._drill_EFP_bindTank[i];
			if( bind_data == undefined ){ continue; }
			if( DataManager.drill_COEM_isMapLoaded( bind_data['map_id'] ) == false ){ continue; }
			
			// > 执行创建事件
			this.drill_EFP_createEvent( i );
			
			// > 标记 已创建
			this._drill_EFP_isCreateList[i] = true;
		}
	}
}
//==============================
// * 创建管理 - 执行创建
//
//			参数：	> i 数字 （容器下标值）
//			返回：	> 对象   （创建的事件）
//
//			说明：	> 下面三个容器的 下标 都是一一对应的，因此只需要输入 索引i 即可。
//						$gameSystem_drill_EFP_bindTank[i]
//						$gameMap._drill_EFP_isCreateList[i]
//						$gameMap._drill_EFP_eventTank[i]
//==============================
Game_Map.prototype.drill_EFP_createEvent = function( i ){
	var bind_data = $gameSystem._drill_EFP_bindTank[i];
	
	// > 获取事件数据
	var e_data = this.drill_EFP_getTarMapEventDataByName( bind_data['map_id'], bind_data['eventName'] );
	if( e_data == null ){ return; }
	
	// > 创建事件对象（根据事件数据）
	var e = this.drill_COEM_offspring_createEventByData( e_data );
	this._drill_EFP_eventTank[i] = e;
	
	// > 绑定索引
	e.drill_EFP_setBind( i );
	
	//alert( JSON.stringify(bind_data) );
	//alert( i );
	return e;
}

//==============================
// * 创建管理 - 获取 - 指定地图的事件数据（根据事件名）
//==============================
Game_Map.prototype.drill_EFP_getTarMapEventDataByName = function( mapId, eventName ){
	if( this._mapId == mapId ){
		
		// > 本地图
		var e = this.drill_EFP_getCurMapEventByName( eventName );
		return e.event();
		
	}else{
		
		// > 获取map文件
		var map_data = DataManager.drill_COEM_getMapData( mapId );
		if( map_data ){
			
			// > 获取事件数据
			for(var i = 0; i < map_data.events.length; i++ ){
				var e_data = map_data.events[i];
				if( e_data && e_data.name == eventName ){
					return e_data;
				}
			}
			alert( DrillUp.drill_EFP_getPluginTip_EventNameNotFind( mapId, eventName ) );
			return {};
			
		}else{
			return null;
		}
	}
}
//==============================
// * 创建管理 - 获取 - 本地图的事件对象（根据事件名）
//==============================
Game_Map.prototype.drill_EFP_getCurMapEventByName = function( eventName ){
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){  
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.event().name == String(eventName) ){
			return temp_event;
		}
	}
	return null;
}


//=============================================================================
// ** ☆独立开关跨地图
//
//			说明：	> 此模块专门控制 独立开关跨地图 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 独立开关跨地图 - 创建事件时
//==============================
var _drill_EFP_EFP_createEvent = Game_Map.prototype.drill_EFP_createEvent;
Game_Map.prototype.drill_EFP_createEvent = function( i ){
	var e = _drill_EFP_EFP_createEvent.call( this, i );
	
	// > 取出值，并赋值
	var switch_data = $gameSystem._drill_EFP_bindTank[i]['switchTank'];
	var switch_keys = Object.keys(switch_data);
	for(var j = 0; j < switch_keys.length; j++ ){
		var key = switch_keys[j];
		if( switch_data[ key ] == true ){
			var s_key = [ this._mapId, e._eventId, key ];
			$gameSelfSwitches._data[s_key] = true;
		}
	}
	return e;
}
//==============================
// * 独立开关跨地图 - 赋值时
//==============================
var _drill_EFP_ESS_valueChanged = Game_SelfSwitches.prototype.drill_ESS_valueChanged;
Game_SelfSwitches.prototype.drill_ESS_valueChanged = function( key, value ){
	_drill_EFP_ESS_valueChanged.call( this, key, value );
	
	// > 记录值
	//		（key的结构：[this._mapId, this._eventId, 'A' ]）
	if( $gameMap._mapId === key[0] ){
		
		for(var i = 0; i < $gameMap._drill_EFP_eventTank.length; i++ ){
			var p_event = $gameMap._drill_EFP_eventTank[i];
			if( p_event != null && Number(key[1]) == Number(p_event._eventId) ){
				
				var switch_data = $gameSystem._drill_EFP_bindTank[i]['switchTank'];
				switch_data[ String(key[2]) ] = value;		//（存入键值：{ 'A':true,'B':false } ）
			}
		}
	}
};


//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EFP_bind_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){
	this._drill_EFP_bindIndex = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EFP_bind_initMembers.call(this);
}
//==============================
// * 物体的属性 - 绑定索引
//==============================
Game_Event.prototype.drill_EFP_setBind = function( i ){
	this._drill_EFP_bindIndex = i;
}
//==============================
// * 物体的属性 - 是否绑定
//
//			说明：	> 注意此函数基于类 Game_CharacterBase，用于 物体贴图的_character 判断。
//==============================
Game_CharacterBase.prototype.drill_EFP_isBinded = function(){
	return this._drill_EFP_bindIndex != undefined;
}
//==============================
// * 物体的属性 - 是否贴图同步
//==============================
Game_Event.prototype.drill_EFP_isSpriteSynchronized = function(){
	var bind_data = $gameSystem._drill_EFP_bindTank[ this._drill_EFP_bindIndex ];
	return bind_data['spriteSynchronized'];
}


//=============================================================================
// ** ☆数据同步
//
//			说明：	> 此模块专门控制 玩家与玩家的事件 数据同步 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 数据同步 - 帧刷新
//==============================
var _drill_EFP_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EFP_map_update2.call( this, sceneActive );
	this.drill_EFP_updateEventLocks();
}
//==============================
// * 数据同步 - 帧刷新
//==============================
Game_Map.prototype.drill_EFP_updateEventLocks = function(){
	
	// > 遍历容器
	for(var i = 0; i < this._drill_EFP_eventTank.length; i++ ){
		var e = this._drill_EFP_eventTank[i];
		if( e == undefined ){ continue; }
		
		e._x = $gamePlayer._x;						//坐标x
		e._y = $gamePlayer._y;						//坐标y
		e._realX = $gamePlayer._realX;				//小数坐标x
		e._realY = $gamePlayer._realY;				//小数坐标y
		e._direction = $gamePlayer._direction;		//朝向
		e._pattern = $gamePlayer._pattern;			//帧数
		
		e._through = true;												//强制穿透
		if( e._trigger === 0 || e._trigger === 1 || e._trigger === 2 ){	//去掉 确定键/玩家接近/事件接近 的触发条件
			e._trigger = null;
		}
		
	}
}


//=============================================================================
// ** ☆贴图同步
//
//			说明：	> 此模块专门控制 玩家与玩家的事件 贴图同步 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图同步 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_EFP_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}
//==============================
// * 贴图同步 - 帧刷新
//==============================
var _drill_EFP_sprite_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    _drill_EFP_sprite_update.call(this);
	if( $gameTemp.drill_EFP_isReflectionSprite(this) ){ return; }	//（屏蔽镜像情况）
	this.drill_EFP_updatePlayerSprite();							//帧刷新 - 玩家贴图属性记录
	this.drill_EFP_updateEventSprite();								//帧刷新 - 事件贴图属性
}
//==============================
// * 贴图同步 - 帧刷新 - 玩家贴图属性记录
//==============================
Sprite_Character.prototype.drill_EFP_updatePlayerSprite = function() {
	if( this._character == undefined ){ return; }
	if( this._character instanceof Game_Player != true ){ return; }
	
	$gameTemp._drill_EFP_playerSpite_visible = this.visible;		//可见
	$gameTemp._drill_EFP_playerSpite_x = this.x;					//位置X
	$gameTemp._drill_EFP_playerSpite_y = this.y;					//位置Y
	$gameTemp._drill_EFP_playerSpite_scale_x = this.scale.x;		//缩放X
	$gameTemp._drill_EFP_playerSpite_scale_y = this.scale.y;		//缩放Y
	$gameTemp._drill_EFP_playerSpite_opacity = this.opacity;		//透明度
	$gameTemp._drill_EFP_playerSpite_skew_x = this.skew.x;			//斜切X
	$gameTemp._drill_EFP_playerSpite_skew_y = this.skew.y;			//斜切Y
	$gameTemp._drill_EFP_playerSpite_rotation = this.rotation;		//旋转
}
//==============================
// * 贴图同步 - 帧刷新 - 事件贴图属性
//==============================
Sprite_Character.prototype.drill_EFP_updateEventSprite = function() {
	if( this._character == undefined ){ return; }
	if( this._character.drill_EFP_isBinded() != true ){ return; }
	if( this._character.drill_EFP_isSpriteSynchronized() != true ){ return; }
	if( $gameTemp._drill_EFP_playerSpite_x == undefined ){ return; }
	
	this.visible = $gameTemp._drill_EFP_playerSpite_visible;
	this.x = $gameTemp._drill_EFP_playerSpite_x;
	this.y = $gameTemp._drill_EFP_playerSpite_y;
	this.scale.x = $gameTemp._drill_EFP_playerSpite_scale_x;
	this.scale.y = $gameTemp._drill_EFP_playerSpite_scale_y;
	this.opacity = $gameTemp._drill_EFP_playerSpite_opacity;
	this.skew.x = $gameTemp._drill_EFP_playerSpite_skew_x;
	this.skew.y = $gameTemp._drill_EFP_playerSpite_skew_y;
	this.rotation = $gameTemp._drill_EFP_playerSpite_rotation;
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventForPlayer = false;
		var pluginTip = DrillUp.drill_EFP_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


