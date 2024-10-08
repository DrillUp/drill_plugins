//=============================================================================
// Drill_CoreOfEventManager.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体管理 - 事件管理核心
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
 * 2.详细内容去看看 "28.物体管理 > 关于事件管理核心.docx"。
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
 * 测试方法：   在地图界面中，测试创建事件，如放置10个炸弹。
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
 * 优化了刷菜单时已销毁事件不创建贴图的设置。
 * 新创建的事件兼容了行走图优化核心的堆叠级定义。
 * [v1.2]
 * 完善了地图加载的功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COEM（Core_Of_Event_Manager）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	物体管理管理层
//		★性能测试消耗	2024/8/8：
//							》9.0ms（drill_COEM_updateAvailableEventRemove）27.3ms（drill_COEM_offspring_createEventByData_Private）
//		★最坏情况		无	
//		★备注			建立事件不消耗，消耗的是事件建立后的各种行为。
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
//			->☆管辖权
//			->☆管辖函数覆写
//			
//			->☆原代容器 标准模块
//				->创建事件【标准函数】
//				->删除事件【标准函数】
//				->获取 - 是否为原代事件【标准函数】
//				->获取 - 所有原代事件【标准函数】
//				->获取 - 所有原代事件贴图【标准函数】
//			->☆子代容器 标准模块
//				->创建事件（主流程）【标准函数】
//				->创建事件（根据数据）【标准函数】
//				->删除事件【标准函数】
//				->获取 - 是否为子代事件【标准函数】
//				->获取 - 所有子代事件【标准函数】
//				->获取 - 所有子代事件贴图【标准函数】
//				->获取 - 上一个子代事件【标准函数】
//				->获取 - 上一个子代事件贴图【标准函数】
//			->☆地图读取器 标准模块
//				->获取资源【标准函数】
//				->加载资源【标准函数】
//				->资源是否已加载【标准函数】
//				->资源是否存在【标准函数】
//			->☆事件常用函数 标准模块
//				->删除全部独立开关【标准函数】
//				
//			->☆原代容器
//				->容器初始化
//				->捕获事件
//				->删除事件
//			->☆子代容器
//				->容器初始化
//				->流程
//					->复制本地图的事件
//					->复制其它地图的事件
//				->删除事件
//			->☆地图读取器
//			->☆删除流程
//				->删除事件
//				->删除全部独立开关
//			
//			->☆有效事件容器 标准模块
//				->获取事件容器指针【标准函数】
//				->获取事件容器备份【标准函数】
//				->是否为有效事件【标准函数】
//				->获取有效事件容器指针【标准函数】
//				->获取有效事件容器备份【标准函数】
//			->☆有效事件容器（实现）
//			
//			->☆核心漏洞修复
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
//		★核心说明：
//			无
//		
//		★必要注意事项：
//			1.事件的独立开关是独立于事件的，需要额外刷新。
//			2.如果你需要引用该插件来创建一个外部地图的事件，
//			  那么必须先加载地图文本数据，再创建事件。（可参考 Drill_EventForPlayer ）
//			3.【暂时消除事件】的事件无法还原。
//			
//		★其它说明细节：
//			1.先有事件数据，再通过事件数据new事件。
//			  事件存储数据 -> 即时事件数据 -> 事件对象
//			2.上一个复制事件的id，可以在插件指令中记录。
//
//		★存在的问题：
//			1.问题：低版本的rmmv中没有ResourceHandler的定义。
//			  解决：【已解决】，通过添加版本限制。
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_COEM_PluginTip_curName = "Drill_CoreOfEventManager.js 物体管理-事件管理核心";
	DrillUp.g_COEM_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 版本过低
	//==============================
	DrillUp.drill_COEM_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_COEM_PluginTip_curName + "】\n游戏底层版本过低，事件管理核心无法使用。\n会报ResourceHandler资源指针错误。\n你可以使用\"rmmv软件版本.docx\"中的升级工程的方法来升级你的工程。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_COEM_getPluginTip_NeedUpdate_COEF = function(){
		return "【" + DrillUp.g_COEM_PluginTip_curName + "】\n行走图优化核心插件版本过低，你需要更新 核心插件 至少v1.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_COEM_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_COEM_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 复制事件错误
	//==============================
	DrillUp.drill_COEM_getPluginTip_CopyEventError = function( e_id ){
		return "【" + DrillUp.g_COEM_PluginTip_curName + "】\n复制事件时错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 复制事件错误2
	//==============================
	DrillUp.drill_COEM_getPluginTip_CopyEventError2 = function( map_id, e_id ){
		return "【" + DrillUp.g_COEM_PluginTip_curName + "】\n复制事件时错误，地图["+map_id+"]并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 事件数量异常
	//==============================
	DrillUp.drill_COEM_getPluginTip_CopyEventNum = function(){
		return "【" + DrillUp.g_COEM_PluginTip_curName + "】\n有效事件容器 的事件数量异常，请及时检查你的指针调用。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfEventManager = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfEventManager');
	
	
//=============================================================================
// ** 版本检验
//=============================================================================
if( !Utils.RPGMAKER_VERSION || Utils.RPGMAKER_VERSION < "1.5.0" ){
	
	alert( DrillUp.drill_COEM_getPluginTip_LowVersion() );
	Imported.Drill_CoreOfEventManager = false;
	
}else{


//=============================================================================
// ** ☆插件指令
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
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_COEM_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_COEM_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * C事件容器『物体管理-事件管理核心』 - 载入初始化
//
//			说明：	> 只在 载入地图时 执行一次。
//==============================
Game_Map.prototype.setupEvents = function(){
	
	// > 创建事件（根据地图数据库）
    this._events = [];
    for( var i = 0; i < $dataMap.events.length; i++ ){
        if( $dataMap.events[i] ){
            this._events[i] = new Game_Event(this._mapId, i);
        }
    }
	// > 创建公共事件（根据公共事件数据库）
    this._commonEvents = this.parallelCommonEvents().map(function( commonEvent ){
        return new Game_CommonEvent(commonEvent.id);
    });
	
	// > 刷新 图块行走图 事件
    this.refreshTileEvents();
};
//==============================
// * C事件容器『物体管理-事件管理核心』 - 移除事件（根据id，command214）
//==============================
Game_Map.prototype.eraseEvent = function( eventId ){
    this._events[eventId].erase();
};
//==============================
// * C事件容器『物体管理-事件管理核心』 - 帧刷新
//==============================
Game_Map.prototype.updateEvents = function(){
    this.events().forEach(function( event ){
        event.update();
    });
    this._commonEvents.forEach(function( event ){
        event.update();
    });
};
//==============================
// * C事件容器『物体管理-事件管理核心』 - 获取 - 全部事件
//==============================
Game_Map.prototype.events = function(){
    return this._events.filter(function( event ){
        return !!event;
    });
};
//==============================
// * C事件容器『物体管理-事件管理核心』 - 获取 - 事件（根据id）
//==============================
Game_Map.prototype.event = function( eventId ){
    return this._events[eventId];
};
*/


//=============================================================================
// ** ☆管辖函数覆写
//
//			说明：	> 此模块 覆写函数，防止其它插件对函数覆写后，影响功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管辖函数覆写『物体管理-事件管理核心』 - C事件容器 - 帧刷新（覆写）
//
//			说明：	> 注意，此函数覆写的位置较晚，其它插件继承时注意避开。
//==============================
Game_Map.prototype.updateEvents = function() {
	
	// > 非空事件 帧刷新
	//		（之所以选择 非空事件 而不是 有效事件，是因为要考虑 『装饰延时销毁』 的情况）
	//var event_list = this.drill_COEM_getAvailableEventTank_Pointer();
	var event_list = this.drill_COEM_getEventTank_Pointer();
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event != undefined ){
			temp_event.update();
		}
	}
	
	// > 公共事件 帧刷新
	var common_list = this._commonEvents;
	for(var i = 0; i < common_list.length; i++ ){
		var common = common_list[i];
		if( common != undefined ){
			common.update();
		}
	}
};
//==============================
// * 管辖函数覆写『物体管理-事件管理核心』 - C事件容器 - 获取全部事件（覆写）
//
//			说明：	> 此函数强制 返回 有效事件容器备份。
//==============================
Game_Map.prototype.events = function(){
	return this.drill_COEM_getAvailableEventTank_Copyed();	//『有效事件容器』
};

	
	
//#############################################################################
// ** 【标准模块】原代容器primary ☆原代容器
//          
//			说明：	> 原代事件指：通过游戏编辑器中，手动添加的独立事件。
//					  进入地图前会完整创建，离开地图后会全销毁。
//					> 这些事件的数据在 Map00X.json 中真实存在。
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
// ** 【标准模块】子代容器offspring ☆子代容器
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
// ** 【标准模块】地图读取器 ☆地图读取器
//#############################################################################
//##############################
// * 地图读取器 - 获取资源【标准函数】
//			
//			参数：	> map_id 数字  （指定地图的id）
//			返回：	> 地图数据对象 （地图json数据）
//					> null         （未加载时）
//          
//			说明：	> 由于含异步请求，如果未提前加载，则返回空数据。
//					> 如果是在插件指令中执行，你需要加 等待类型 的判定。
//##############################
DataManager.drill_COEM_getMapData = function( map_id ){
	return this.drill_COEM_getMapData_Private( map_id );
};
//##############################
// * 地图读取器 - 加载资源【标准函数】
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
// * 地图读取器 - 资源是否已加载【标准函数】
//			
//			参数：	> map_id 数字  （指定地图的id）
//			返回：	> 布尔
//##############################
DataManager.drill_COEM_isMapLoaded = function( map_id ){
	return this.drill_COEM_isMapLoaded_Private( map_id );
};
//##############################
// * 地图读取器 - 资源是否存在【标准函数】
//			
//			参数：	> map_id 数字  （指定地图的id）
//			返回：	> 布尔
//##############################
DataManager.drill_COEM_isMapExist = function( map_id ){
	return this.drill_COEM_isMapExist_Private( map_id );
};


//#############################################################################
// ** 【标准模块】事件常用函数 ☆事件常用函数
//#############################################################################
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



//=============================================================================
// ** ☆原代容器
//
//			说明：	> 此模块专门管理 原代容器。
//					> 原代事件指：通过游戏编辑器中，手动添加的独立事件。
//					  进入地图前会完整创建，离开地图后会全销毁。
//					（插件完整的功能目录去看看：功能结构树）
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
	
	// > 删除流程
	this.drill_COEM_deleteEvent_Private( e_id );
};


//=============================================================================
// ** ☆子代容器
//
//			说明：	> 此模块专门管理 子代容器。
//					> 子代事件指：游戏过程中，在当前地图中即时生成的事件。
//					  需要延迟创建，离开地图后会全销毁。
//					（插件完整的功能目录去看看：功能结构树）
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
	
	// > 原函数	（放前面，原代容器优先）
	//			（因为 编辑器中添加事件，然后读取旧存档，会出现事件数据重合情况）
	var data = _drill_COEM_o_event.call(this);
	if( data != undefined ){ return data; }
	
	// > 子代事件 的 事件数据
	if( $gameMap.drill_COEM_offspring_isOffspringEvent(this._eventId) == true ){
		var e_tank = $gameMap._drill_COEM_offspringDataTank;
		for(var i = 0; i < e_tank.length; i++){
			if( e_tank[i]['id'] == this._eventId ){
				return e_tank[i];
			}
		}
	}
	
	return null;
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
			alert( DrillUp.drill_COEM_getPluginTip_CopyEventError( event_id ) );
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
				alert( DrillUp.drill_COEM_getPluginTip_CopyEventError2( map_id, event_id ) );
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
	this._tilemap.addChild( temp_sprite );		//（层级，添加到 物体原层级，自动根据z和zIndex排序）
	this._characterSprites[len] = temp_sprite;	//（层级，添加到 物体贴图容器，即使贴图在其他层级，也不影响此容器）
	
	return temp_sprite;
};
//==============================
// * 子代容器 - 删除事件（私有）
//==============================
Game_Map.prototype.drill_COEM_offspring_deleteEvent_Private = function( e_id ){
	
	// > 只允许删除 子代事件
	if( this.drill_COEM_offspring_isOffspringEvent( e_id ) == false ){ return; }
	
	// > 删除流程
	this.drill_COEM_deleteEvent_Private( e_id );
};


//=============================================================================
// ** ☆地图读取器
//
//			说明：	> 此模块专门管理 地图读取。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图读取器 - 获取资源（私有）
//==============================
DataManager.drill_COEM_getMapData_Private = function( map_id ){
	var param_name = "_drill_mapData_" + map_id;
	
	var map_data = window[ param_name ];
	if( map_data == undefined ){
		DataManager.drill_COEM_loadMapData( map_id );
		return null;
	}else{
		return map_data;
	}
}
//==============================
// * 地图读取器 - 加载资源（私有）
//
//			说明：	> 该函数复刻了 DataManager.loadMapData ，该函数与原函数相互独立。
//==============================
DataManager.drill_COEM_loadMapData_Private = function( map_id ){
	var param_name = "_drill_mapData_" + map_id;
	
	// > 资源不存在，则跳出
	if( this.drill_COEM_isMapExist( map_id ) == false ){ return; }
	
	// > 绑定加载数据
	if( window[ param_name ] == undefined ){
		var filename = "Map%1.json".format(map_id.padZero(3));
		
		ResourceHandler.createLoader( "data/" + filename, this.loadDataFile.bind(this, param_name, filename) );		//（this._mapLoader是一个完全没用的变量）
		this.loadDataFile(param_name, filename);	//（将文件的json数据，传给指定的参数）
	}
};
//==============================
// * 地图读取器 - 资源是否已加载（私有）
//==============================
DataManager.drill_COEM_isMapLoaded_Private = function( map_id ){
	var param_name = "_drill_mapData_" + map_id;
	if( window[ param_name ] == undefined ){ return false; }
	return true;
};
//==============================
// * 地图读取器 - 资源是否存在（私有）
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
// ** ☆删除流程
//
//			说明：	> 此模块专门管理 删除流程。
//					> 此删除不分 原代容器 和 子代容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 删除流程 - 删除事件（私有）
//==============================
Game_Map.prototype.drill_COEM_deleteEvent_Private = function( e_id ){
	var tar_event = this._events[ e_id ];
	if( tar_event == null ){ return; }
	var spriteSet = SceneManager._scene._spriteset;
	
	// > 执行清除
	//		（由于其他子插件大量存储事件对象的指针，无法彻底删除，此设置暂时为权宜之计）
	tar_event.erase();
	
	// > 删除镜像贴图【行走图 - 图块倒影镜像】
	if( Imported.Drill_LayerReverseReflection ){
		spriteSet.drill_LRR_deleteEventReflect( e_id );
	}
	// > 删除镜像贴图【行走图 - 图块同步镜像】
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
			temp_sprite.parent.removeChild( temp_sprite );	//（层级，找父类删除此贴图，因为贴图可能在别的层级）
			
			// > 断开容器关联
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
//==============================
// * 删除流程 - 删除全部独立开关（私有）
//==============================
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
//==============================
// * 删除流程 - 强制更新提示
//
//			说明：	> 这里的 创建贴图/删除贴图，要适配 行走图优化核心 的层级定义。（在该插件搜索"层级"）
//==============================
if( Imported.Drill_CoreOfEventFrame ){
	
	// > 强制更新提示
	if( Game_Temp.prototype.drill_COEF_whenRefreshLayer == undefined ){
		alert( DrillUp.drill_COEM_getPluginTip_NeedUpdate_COEF() );
	}
}



//#############################################################################
// ** 【标准模块】有效事件容器 ☆有效事件容器 『有效事件容器』
//#############################################################################
//##############################
// * 有效事件容器 - 获取事件容器指针【标准函数】
//			
//			参数：	无
//			返回：	> 对象  （容器指针）
//          
//			说明：	> 返回一个指针，使用时必须 只读 。
//##############################
Game_Map.prototype.drill_COEM_getEventTank_Pointer = function(){
	return this._events;
};
//##############################
// * 有效事件容器 - 获取事件容器备份【标准函数】
//			
//			参数：	无
//			返回：	> 对象  （备份的容器）
//			
//			说明：	> 返回一个新数组，可以对数组随意操作。
//##############################
Game_Map.prototype.drill_COEM_getEventTank_Copyed = function(){
	var result_list = [];
	for(var i = 0; i < this._events.length; i++ ){
		result_list.push( this._events[i] );
	}
	return result_list;
};
//##############################
// * 有效事件容器 - 是否为有效事件【标准函数】
//			
//			参数：	> temp_event 对象
//			返回：	> 布尔
//##############################
Game_Map.prototype.drill_COEM_isAvailableEvent = function( temp_event ){
	this.drill_COEM_checkAvailableEventTank();
	return this._drill_COEM_availableEventTank.indexOf( temp_event ) >= 0;
};
//##############################
// * 有效事件容器 - 获取有效事件容器指针【标准函数】
//			
//			参数：	无
//			返回：	> 指针  （容器指针）
//			
//			说明：	> 返回一个指针，使用时必须 只读 。
//					> 有效事件指 非空、未被清除 的事件。
//					> 注意，容器的序号不与事件id依次对应。
//##############################
Game_Map.prototype.drill_COEM_getAvailableEventTank_Pointer = function(){
	this.drill_COEM_checkAvailableEventTank();
	return this._drill_COEM_availableEventTank;
};
//##############################
// * 有效事件容器 - 获取有效事件容器备份【标准函数】
//			
//			参数：	无
//			返回：	> 对象  （备份的容器）
//			
//			说明：	> 返回一个新数组，可以对数组随意操作。
//					> 有效事件指 非空、未被清除 的事件。
//					> 注意，容器的序号不与事件id依次对应。
//##############################
Game_Map.prototype.drill_COEM_getAvailableEventTank_Copyed = function(){
	this.drill_COEM_checkAvailableEventTank();
	var result_list = [];
	for(var i = 0; i < this._drill_COEM_availableEventTank.length; i++ ){
		result_list.push( this._drill_COEM_availableEventTank[i] );
	}
	return result_list;
};


//=============================================================================
// ** ☆有效事件容器（实现）
//
//			说明：	> 此模块专门管理 有效事件容器 。
//					> 有效事件指 非空、未被清除 的事件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 有效事件容器 - 初始化
//==============================
var _drill_COEM_available_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function(){
	_drill_COEM_available_initialize.call(this);
	this._drill_COEM_availableEventTank = [];		//有效事件容器
	this._drill_COEM_availableEventCounter = 0;		//容器监听数量标记（私有参数）
}
//==============================
// * 有效事件容器 - 切换地图时
//==============================
var _drill_COEM_available_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	this._drill_COEM_availableEventTank = [];		//有效事件容器
	this._drill_COEM_availableEventCounter = 0;		//容器监听数量标记（私有参数）
	
	// > 原函数
	_drill_COEM_available_setup.call( this, mapId );
	
	// > 强制刷新容器
	this.drill_COEM_updateAvailableEventChanged();	//帧刷新 - 容器变化监听
	this.drill_COEM_updateAvailableEventRemove();	//帧刷新 - 容器内事件排除
}
//==============================
// * 有效事件容器 - 帧刷新
//==============================
var _drill_COEM_available_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_COEM_available_update.call(this,sceneActive);
	this.drill_COEM_updateAvailableEventChanged();	//帧刷新 - 容器变化监听
	this.drill_COEM_updateAvailableEventRemove();	//帧刷新 - 容器内事件排除
	this.drill_COEM_updateAvailableEventCheck();	//帧刷新 - 校验值
};
//==============================
// * 有效事件容器 - 帧刷新 - 容器变化监听
//==============================
Game_Map.prototype.drill_COEM_updateAvailableEventChanged = function(){
	
	// > 等于时（跳过）
	if( this._drill_COEM_availableEventCounter == this._events.length ){ return; }
	
	// > 小于时（新的事件加入容器）
	if( this._drill_COEM_availableEventCounter < this._events.length ){
		for( var i = this._drill_COEM_availableEventCounter; i < this._events.length; i++ ){
			this._drill_COEM_availableEventTank.push( this._events[i] );
		}
		this._drill_COEM_availableEventCounter = this._events.length;
	}
	
	// > 大于时（异常情况，事件容器常规情况只增不减）
	if( this._drill_COEM_availableEventCounter > this._events.length ){
		this._drill_COEM_availableEventTank = [];
		for( var i = 0; i < this._events.length; i++ ){
			this._drill_COEM_availableEventTank.push( this._events[i] );
		}
		this._drill_COEM_availableEventCounter = this._events.length;
	}
};
//==============================
// * 有效事件容器 - 帧刷新 - 容器内事件排除
//==============================
Game_Map.prototype.drill_COEM_updateAvailableEventRemove = function(){
	for( var i = this._drill_COEM_availableEventTank.length-1; i >= 0; i-- ){
		var ev = this._drill_COEM_availableEventTank[i];
		if( ev == undefined ){		//（空事件排除）
			this._drill_COEM_availableEventTank.splice( i, 1 );
			continue;
		}
		if( ev._erased == true ){	//（清除的事件排除）
			this._drill_COEM_availableEventTank.splice( i, 1 );
			continue;
		}
	}
};
//==============================
// * 有效事件容器 - 校验值参数
//==============================
DrillUp.g_COEM_availableEventTank = true;
//==============================
// * 有效事件容器 - 帧刷新 - 校验值
//==============================
Game_Map.prototype.drill_COEM_updateAvailableEventCheck = function(){
	if( DrillUp.g_COEM_availableEventTank == true ){
		if( this._drill_COEM_availableEventTank.length > this._drill_COEM_availableEventCounter ){
			DrillUp.g_COEM_availableEventTank = false;
			alert( DrillUp.drill_COEM_getPluginTip_CopyEventNum() );
		}
	}
};
//==============================
// * 有效事件容器 - 数据容器校验
//==============================
Game_Map.prototype.drill_COEM_checkAvailableEventTank = function(){	
	if( this._drill_COEM_availableEventTank == undefined ){
		
		// > 程序能进入到这里，说明 插件刚加入+读取旧存档 的情况
		this._drill_COEM_availableEventTank = [];
		this._drill_COEM_availableEventCounter = 0;
		this.drill_COEM_updateAvailableEventChanged();
		this.drill_COEM_updateAvailableEventRemove();
	}
};


//=============================================================================
// ** ☆核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 『屏蔽根据版本重刷地图』
//
//			说明：	> 此功能会刷掉旧存档的存储数据，因为版本不一样会强制重进地图。
//					  而这样做只是 刷新旧存档的当前地图而已，没任何好处。
//					> 屏蔽后会有一些小bug（如在编辑器删除事件后读取旧存档会报错），
//					  这些bug统一在 存档管理器插件 中修复。
//==============================
Scene_Load.prototype.reloadMapIfUpdated = function() {
	// （禁止重刷）
};


}
