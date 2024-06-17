//=============================================================================
// Drill_CoreOfEventTags.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体管理 - 事件标签核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfEventTags +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 给指定事件添加各种标签，用于子插件捕获使用。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件，才能运行，并作用于其他子插件。
 * 基于：
 *   - Drill_CoreOfNumberArray     系统-变量数组核心
 * 可作用于：
 *   - Drill_CoreOfEventTags       物体触发-固定区域核心
 *     插件的筛选器可以支持"必须含指定标签的事件"的捕获。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.更多相关内容，去看看 "28.物体管理 > 关于事件标签核心.docx"。
 * 标签与筛选器：
 *   (1.标签属于辅助性功能，用于区分不同事件的特殊属性。
 *   (2.标签可以与固定区域核心的筛选器一起使用，
 *      实现某些特定标签免疫特定的攻击，或者遭受特定的弱点打击。
 *      你需要留意 标签 与 被触发条件 之间的关系。
 * 获取事件id：
 *   (1.你可以根据 事件名、标签 ，获取到事件id。
 *      只对当前地图的所有事件有效，如果没有找到，会赋值 -1 。
 *   (2.如果你想获取 复制的新事件 中符合标签/事件名的事件id，
 *      需要用 "获取事件id(最后)" ，因为新事件的id都是最大值。
 *   (3.注意，如果你给事件添加标签后瞬间获取，是获取不到的。
 *      需要等待至少1帧后才可以获取到。
 * 设计：
 *   (1.事件标签相当于一种特殊的筛选器。
 *      比如，游戏中生成了一堆乱走的小爱丽丝和小动物，然后你需要
 *      随机选定一个小爱丽丝进行舞蹈。通过事件标签，能够快速获取
 *      到小爱丽丝。并且如果出现没有小爱丽丝的情况，也能根据返回
 *      的-1值得知。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 如果你需要设置标签，使用下面事件注释或插件指令：
 * （注意，冒号左右有空格）
 * 
 * 事件注释：=>标签核心 : 添加标签 : 标签[被动技_躲避斩击]
 *
 * 插件指令：>标签核心 : 本事件 : 添加标签 : 标签[被动技_躲避斩击]
 * 插件指令：>标签核心 : 事件[10] : 添加标签 : 标签[被动技_躲避斩击]
 * 插件指令：>标签核心 : 事件变量[10] : 添加标签 : 标签[被动技_躲避斩击]
 * 插件指令：>标签核心 : 批量事件[10,11,12] : 添加标签 : 标签[被动技_躲避斩击]
 * 插件指令：>标签核心 : 批量事件变量[25,26] : 添加标签 : 标签[被动技_躲避斩击]
 * 
 * 插件指令：>标签核心 : 本事件 : 添加标签 : 标签[被动技_躲避斩击]
 * 插件指令：>标签核心 : 本事件 : 去除标签 : 标签[被动技_躲避斩击]
 * 插件指令：>标签核心 : 本事件 : 去除全部标签
 * 
 * 1."被动技_躲避斩击"是可以完全自定义的字符串。
 *   之所以叫做"躲避斩击"，是因为该标签可以避免筛选器捕获到该事件。
 *   但并不代表免疫触发，如果要免疫触发，需要关掉 被触发 条件。
 *   你需要留意 标签 与 被触发条件 之间的关系。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取事件id
 * 你可以根据事件名、标签来获取到事件的id：
 * 
 * 插件指令：>标签核心 : 获取事件id组 : 根据事件名 : 事件名[小爱丽丝] : 变量数组[3]
 * 插件指令：>标签核心 : 获取事件id组 : 根据事件名 : 事件名[小爱丽丝] : 变量数组[某数组]
 * 插件指令：>标签核心 : 获取事件id(最前) : 根据事件名 : 事件名[小爱丽丝] : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(最后) : 根据事件名 : 事件名[小爱丽丝] : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(随机) : 根据事件名 : 事件名[小爱丽丝] : 变量[21]
 * 
 * 插件指令：>标签核心 : 获取事件id组 : 根据标签 : 标签[被动技_躲避斩击] : 变量数组[3]
 * 插件指令：>标签核心 : 获取事件id组 : 根据标签 : 标签[被动技_躲避斩击] : 变量数组[某数组]
 * 插件指令：>标签核心 : 获取事件id(最前) : 根据标签 : 标签[被动技_躲避斩击] : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(最后) : 根据标签 : 标签[被动技_躲避斩击] : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(随机) : 根据标签 : 标签[被动技_躲避斩击] : 变量[21]
 *
 * 1.如果有多个事件名相同的的事件，或者标签相同的事件，
 *   "获取事件id(最前)" 获取到的是事件id最小的那个；
 *   "获取事件id(最后)" 获取的是id最大的那个；
 *   "获取事件id(随机)" 获取的是其中任意一个。
 *   只对当前地图的所有事件有效，如果没有找到，会赋值 -1 。
 * 2.如果你想获取 复制的新事件 中符合标签/事件名的事件id，
 *   需要用 "获取事件id(最后)" ，因为新事件的id都是最大值。
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
 * 测试方法：   去各个管理层跑一圈，测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.标签只是附加在事件身上的一个属性，如果没有子插件反复使用这个
 *   属性，插件是不会出现任何多余计算量的。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 修改了插件分类。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COET（Core_Of_Event_Tags）
//		临时全局变量	无
//		临时局部变量	this._drill_COET_tag
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	各个管理层跑一圈
//		★性能测试消耗	消耗列表中找不到
//		★最坏情况		无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			
//			->☆物体的属性
//			->☆获取器
//				->获取事件列表 - 含指定标签（开放函数）
//				->获取事件列表 - 含任一标签（开放函数）
//				->获取事件列表 - 根据事件名（开放函数）
//			->☆筛选器
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
//			1.该插件准确地说，【不是一个标准的核心】。
//			  没有完整的必要功能，子插件用法还没搭建起来。
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这里只是提供了一系列"通过标签"快速筛选的功能和方法。
//			  需要持续与子插件进行配合。
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
	DrillUp.g_COET_PluginTip_curName = "Drill_CoreOfEventTags.js 物体管理-事件标签核心";
	DrillUp.g_COET_PluginTip_baseList = ["Drill_CoreOfNumberArray.js 系统-变量数组核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COET_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COET_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COET_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COET_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COET_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_COET_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_COET_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfEventTags = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfEventTags');

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfNumberArray ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_COET_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COET_pluginCommand.call(this, command, args);
	if( command === ">标签核心" ){
		
		/*-----------------对象组获取------------------*/
		var e_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
		}
		
		/*-----------------设置标签------------------*/
		if( e_list != null && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			temp2 = temp2.replace("标签[","");
			temp2 = temp2.replace("]","");
			if( type == "添加标签" ){
				for( var k=0; k < e_list.length; k++ ){
					var e = e_list[k];
					e.drill_COET_addTag(temp2);
				}
			}
			if( type == "去除标签" ){
				for( var k=0; k < e_list.length; k++ ){
					var e = e_list[k];
					e.drill_COET_removeTag(temp2);
				}
			}
		}
		if( e_list != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除全部标签" ){
				for( var k=0; k < e_list.length; k++ ){
					var e = e_list[k];
					e.drill_COET_removeAllTag();
				}
			}
		}
		
		/*-----------------获取事件id------------------*/
		if( args.length == 8 ){			//>标签核心 : 获取事件id : 根据事件名 : 小爱丽丝 : 变量[21]
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			temp2 = temp2.replace("事件名[","");
			temp2 = temp2.replace("标签[","");
			temp2 = temp2.replace("]","");
			
			if( type == "根据事件名" ){
				var events = $gameMap.drill_COET_getEventsByName( temp2 );
				if( temp1 == "获取事件id组" ){
					temp3 = temp3.replace("变量数组[","");
					temp3 = temp3.replace("]","");
					var ids = [];
					for( var i=0; i < events.length; i++ ){
						ids[i] = events[i]._eventId;
					}
					$gameNumberArray.setValue( temp3, ids );
				}
				if( temp1 == "获取事件id(最前)" || temp1 == "获取事件id" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					if( events.length > 0 ){
						$gameVariables.setValue( Number(temp3), events[0]._eventId );
					}else{
						$gameVariables.setValue( Number(temp3), -1 );
					}
				}
				if( temp1 == "获取事件id(最后)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					if( events.length > 0 ){
						$gameVariables.setValue( Number(temp3), events[ events.length-1 ]._eventId );
					}else{
						$gameVariables.setValue( Number(temp3), -1 );
					}
				}
				if( temp1 == "获取事件id(随机)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					if( events.length > 0 ){
						$gameVariables.setValue( Number(temp3), events[ Math.floor( Math.random()*events.length ) ]._eventId );
					}else{
						$gameVariables.setValue( Number(temp3), -1 );
					}
				}
			}
			if( type == "根据标签" ){
				var events = $gameMap.drill_COET_getEventsByTag( temp2 );
				if( temp1 == "获取事件id组" ){
					temp3 = temp3.replace("变量数组[","");
					temp3 = temp3.replace("]","");
					var ids = [];
					for( var i=0; i < events.length; i++ ){
						ids[i] = events[i]._eventId;
					}
					$gameNumberArray.setValue( temp3, ids );
				}
				if( temp1 == "获取事件id(最前)" || temp1 == "获取事件id" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					if( events.length > 0 ){
						$gameVariables.setValue( Number(temp3), events[0]._eventId );
					}else{
						$gameVariables.setValue( Number(temp3), -1 );
					}
				}
				if( temp1 == "获取事件id(最后)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					if( events.length > 0 ){
						$gameVariables.setValue( Number(temp3), events[ events.length-1 ]._eventId );
					}else{
						$gameVariables.setValue( Number(temp3), -1 );
					}
				}
				if( temp1 == "获取事件id(随机)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					if( events.length > 0 ){
						$gameVariables.setValue( Number(temp3), events[ Math.floor( Math.random()*events.length ) ]._eventId );
					}else{
						$gameVariables.setValue( Number(temp3), -1 );
					}
				}
			}
		}
	}
}
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_COET_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_COET_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_COET_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_COET_c_setupPageSettings.call(this);
    this.drill_COET_setupPageSettings();
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_COET_setupPageSettings = function() {
	var page = this.page();
	if( page == undefined ){ return; }
	
	var temp_list = this.list();
	for(var k = 0; k < temp_list.length; k++ ){
		var l = temp_list[k];
		if( l.code === 108 ){
			
			/*-----------------标准注释------------------*/
			var row = l.parameters[0];
			var args = row.split(/[ ]+/);
			var command = args.shift();
			if( command == "=>标签核心" ){	//=>标签核心 : 添加标签 : 标签[斩击躲避]
				if( args.length == 4 ){
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					temp2 = temp2.replace("标签[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "添加标签" ){
						this.drill_COET_addTag(temp2);
					}
				}
			}
		};
	};
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
var _drill_COET_e_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_COET_tag = [];				//标签列表（不重复）
	_drill_COET_e_initMembers.call(this);
}
//==============================
// * 物体的属性 - 添加标签（开放函数）
//==============================
Game_Event.prototype.drill_COET_addTag = function( tag ){
	if( this.drill_COET_hasTag(tag) == true ){ return; }
	this._drill_COET_tag.push(tag);
}
//==============================
// * 物体的属性 - 去除标签（开放函数）
//==============================
Game_Event.prototype.drill_COET_removeTag = function( tag ){
	var index = this._drill_COET_tag.indexOf(tag);
	if( index == -1 ){ return; }
	this._drill_COET_tag.splice(index,1);
}
//==============================
// * 物体的属性 - 去除全部标签（开放函数）
//==============================
Game_Event.prototype.drill_COET_removeAllTag = function() {
	this._drill_COET_tag = [];
}
//==============================
// * 物体的属性 - 是否含指定标签（开放函数）
//==============================
Game_Event.prototype.drill_COET_hasTag = function( tag ){
	return this._drill_COET_tag.indexOf(tag) != -1;
}
//==============================
// * 物体的属性 - 是否含任一标签（开放函数）
//==============================
Game_Event.prototype.drill_COET_hasAnyTag = function( tag_list ){
	for(var i = 0; i < tag_list.length; i++){
		var tag = tag_list[i];
		if( this.drill_COET_hasTag(tag) == true ){
			return true;
		}
	}
	return false;
}


//=============================================================================
// ** ☆获取器
//
//			说明：	> 此模块提供 获取函数 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 获取器 - 获取事件列表 - 含指定标签（开放函数）
//==============================
Game_Map.prototype.drill_COET_getEventsByTag = function( tag ){
	var result_list = [];
	var event_list = this._events;		//（全部事件遍历）
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_COET_hasTag(tag) ){
			result_list.push( temp_event );
		}
	}
	return result_list;
}
//==============================
// * 获取器 - 获取事件列表 - 含任一标签（开放函数）
//==============================
Game_Map.prototype.drill_COET_getEventsByTaglist = function( tag_list ){
	var result_list = [];
	var event_list = this._events;		//（全部事件遍历）
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_COET_hasAnyTag(tag_list) ){
			result_list.push( temp_event );
		}
	}
	return result_list;
}
//==============================
// * 获取器 - 获取事件列表 - 根据事件名（开放函数）
//==============================
Game_Map.prototype.drill_COET_getEventsByName = function( name ){
	var result_list = [];
	var event_list = this._events;		//（全部事件遍历）
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.event().name == name ){
			result_list.push( temp_event );
		}
	}
	return result_list;
}


//=============================================================================
// ** ☆筛选器
//
//			说明：	> 此模块提供 筛选器 相关函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 筛选器 - 指定列表中 含任一标签
//==============================
Game_Map.prototype.drill_COET_selectEventsByTaglist = function( event_list, tag_list ){
	var result_list = [];
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_COET_hasAnyTag(tag_list) ){
			result_list.push( temp_event );
		}
	}
	return result_list;
}



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


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfEventTags = false;
		var pluginTip = DrillUp.drill_COET_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

