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
 * 该插件可以单独使用。
 * 该插件为基础核心，是以下插件的依赖。
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
 * 事件注释：=>标签核心 : 添加标签 : 被动技_躲避斩击
 *
 * 插件指令：>标签核心 : 本事件 : 添加标签 : 被动技_躲避斩击
 * 插件指令：>标签核心 : 事件[10] : 添加标签 : 被动技_躲避斩击
 * 插件指令：>标签核心 : 事件变量[10] : 添加标签 : 被动技_躲避斩击
 * 插件指令：>标签核心 : 批量事件[10,11,12] : 添加标签 : 被动技_躲避斩击
 * 插件指令：>标签核心 : 批量事件变量[25,26] : 添加标签 : 被动技_躲避斩击
 * 
 * 插件指令：>标签核心 : 本事件 : 添加标签 : 被动技_躲避斩击
 * 插件指令：>标签核心 : 本事件 : 去除标签 : 被动技_躲避斩击
 * 插件指令：>标签核心 : 本事件 : 去除全部标签
 * 
 * 1."被动技_躲避斩击"是可以完全自定义的字符串。
 *   之所以叫做"躲避斩击"，是因为该标签可以避免筛选器捕获到该事件。
 *   但并不代表免疫触发，如果要免疫触发，需要关掉 被触发 条件。
 *   你需要留意 标签 与 被触发条件 之间的关系。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以根据事件名、标签来获取到事件的id：
 * 
 * 插件指令：>标签核心 : 获取事件id组 : 根据事件名 : 小爱丽丝 : 变量数组[3]
 * 插件指令：>标签核心 : 获取事件id组 : 根据事件名 : 小爱丽丝 : 变量数组[某数组]
 * 插件指令：>标签核心 : 获取事件id(最前) : 根据事件名 : 小爱丽丝 : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(最后) : 根据事件名 : 小爱丽丝 : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(随机) : 根据事件名 : 小爱丽丝 : 变量[21]
 * 
 * 插件指令：>标签核心 : 获取事件id组 : 根据标签 : 被动技_躲避斩击 : 变量数组[3]
 * 插件指令：>标签核心 : 获取事件id组 : 根据标签 : 被动技_躲避斩击 : 变量数组[某数组]
 * 插件指令：>标签核心 : 获取事件id(最前) : 根据标签 : 被动技_躲避斩击 : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(最后) : 根据标签 : 被动技_躲避斩击 : 变量[21]
 * 插件指令：>标签核心 : 获取事件id(随机) : 根据标签 : 被动技_躲避斩击 : 变量[21]
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
//		★性能测试因素	到处跑
//		★性能测试消耗	消耗列表中找不到
//		★最坏情况		无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件标签核心：
//				->设置标签
//				->获取事件（根据标签）
//				->获取事件（根据事件名）
//				->获取方式
//					->筛选法获取
//					->容器法获取 x
//				
//		★必要注意事项：
//			1.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//
//		★其它说明细节：
//			1.这里只是提供了一系列"通过标签"快速筛选的功能和方法。
//			  需要持续与子插件进行配合。
//
//		★核心接口说明：
//			1.该插件准确地说，【不是一个标准的核心】。
//			  没有对外接口。
//				
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfEventTags = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfEventTags');

	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_COET_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COET_pluginCommand.call(this, command, args);
	if( command === ">标签核心" ){
		
		/*-----------------对象组获取------------------*/
		var e_ids = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( unit == "本事件" ){
				e_ids = [ this._eventId ];
			}
			if( unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
		}
		
		/*-----------------设置标签------------------*/
		if( e_ids && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除全部标签" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e.drill_COET_removeAllTag();
				}
				$gameTemp._drill_COET_needRestatistics = true;
			}
		}
		if( e_ids && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "去除标签" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e.drill_COET_removeTag(temp2);
				}
				$gameTemp._drill_COET_needRestatistics = true;
			}
			if( type == "添加标签" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_COET_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e.drill_COET_addTag(temp2);
				}
				$gameTemp._drill_COET_needRestatistics = true;
			}
		}
		
		/*-----------------获取事件id------------------*/
		if(args.length == 8){			//>标签核心 : 获取事件id : 根据事件名 : 小爱丽丝 : 变量[21]
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			
			if( type == "根据事件名" ){
				var events = $gameMap.drill_COET_getEventsByName_direct(temp2);
				if( temp1 == "获取事件id组" || Imported.Drill_CoreOfNumberArray ){
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
				var events = $gameMap.drill_COET_getEventsByTag_container(temp2);
				if( temp1 == "获取事件id组" || Imported.Drill_CoreOfNumberArray ){
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
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_COET_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_CoreOfEventTags.js 物体管理 - 事件标签核心】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// * 注释绑定
//=============================================================================
//==============================
// * 注释绑定 - 初始化
//==============================
var _drill_COET_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_COET_event_setupPage.call(this);
    this.drill_COET_setupPage();
};
//==============================
// * 注释绑定 - 标记
//==============================
Game_Event.prototype.drill_COET_setupPage = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>标签核心"){	//=>标签核心 : 添加标签 : 斩击躲避
				if(args.length == 4){
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "添加标签" ){
						this.drill_COET_addTag(temp2);
					}
				}
			};
		};
	}, this);};
};	


//=============================================================================
// * 事件标签
//=============================================================================
//==============================
// * 事件标签 - 初始化
//==============================
var _drill_COET_e_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_COET_tag = [];				//标签列表（不重复）
	_drill_COET_e_initMembers.call(this);
}
//==============================
// * 事件标签 - 含指定标签
//==============================
Game_Event.prototype.drill_COET_hasTag = function( tag ){
	return this._drill_COET_tag.indexOf(tag) != -1 ;
}
//==============================
// * 事件标签 - 含指定标签组任意一个
//==============================
Game_Event.prototype.drill_COET_hasAnyTag = function( tag_list ) {
	for(var i=0; i < tag_list.length; i++){
		if( this.drill_COET_hasTag( tag_list[i] ) ){
			return true;
		}
	}
	return false;
}
//==============================
// * 事件标签 - 添加标签
//==============================
Game_Event.prototype.drill_COET_addTag = function( tag ){
	if( this.drill_COET_hasTag(tag) == false ){
		this._drill_COET_tag.push(tag);
	}
}
//==============================
// * 事件标签 - 去除标签
//==============================
Game_Event.prototype.drill_COET_removeTag = function( tag ){
	if( this.drill_COET_hasTag(tag) == true ){
		var index = this._drill_COET_tag.indexOf(tag);
		this._drill_COET_tag.splice(index,1);
	}
}
//==============================
// * 事件标签 - 去除全部标签
//==============================
Game_Event.prototype.drill_COET_removeAllTag = function() {
	this._drill_COET_tag = [];
}


//=============================================================================
// * 直接操作
//=============================================================================
//==============================
// * 直接操作 - 获取事件（接口，根据单标签）
//==============================
Game_Map.prototype.drill_COET_getEventsByTag_direct = function( tag ) {
	var result = [];
	var events = this.events();
	for (var i = 0; i < events.length ; i++) {
		if( events[i].drill_COET_hasTag(tag) ){
			result.push(events[i]);
		}
	}
	return result;
}
//==============================
// * 直接操作 - 获取事件（接口，根据多个标签）
//==============================
Game_Map.prototype.drill_COET_getEventsByTaglist_direct = function( tag_list ) {
	var result = [];
	var events = this.events();
	for (var i = 0; i < events.length ; i++) {
		if( events[i].drill_COET_hasAnyTag(tag_list) ){
			result.push(events[i]);
		}
	}
	return result;
}
//==============================
// * 直接操作 - 获取事件（接口，根据事件名）
//==============================
Game_Map.prototype.drill_COET_getEventsByName_direct = function( name ) {
	var result = [];
	var events = this.events();
	for (var i = 0; i < events.length ; i++) {
		if( events[i].event().name == name ){
			result.push(events[i]);
		}
	}
	return result;
}
//==============================
// * 筛选器 - 筛选事件（根据多个标签）
//==============================
Game_Map.prototype.drill_COET_selectEventsByTaglist = function( event_list, tag_list ){
	var result = [];
	for (var i = 0; i < event_list.length ; i++) {
		if( event_list[i].drill_COET_hasAnyTag(tag_list) ){
			result.push(event_list[i]);
		}
	}
	return result;
}


//=============================================================================
// * 分类容器
//=============================================================================
//==============================
// * 分类容器 - 获取事件（接口，根据单标签）
//==============================
Game_Map.prototype.drill_COET_getEventsByTag_container = function( tag ){
	var result = $gameTemp._drill_COET_eventTank[tag];
	if( result == undefined ){
		return [];
	}
	return result;
}
//==============================
// * 分类容器 - 获取事件（接口，根据多个标签）
//
//			说明：	注意，Set类是ES6的，ES5中没有。
//==============================
Game_Map.prototype.drill_COET_getEventsByTaglist_container = function( tag_list ){
	var result = [];
	for(var i=0; i < tag_list.length; i++ ){
		var tag = tag_list[i];
		result.concat( this.drill_COET_getEventsByTag_container(tag) );
	}
	
	// > 去重
	for(var i=0; i < result.length; i++){
		for(var j= i+1; j < result.length; j++){
			if( arr[i] == arr[j] ){
				arr.splice(j,1);
				j--;
			}
		}
	}
	
	return result;
}

//==============================
// * 容器 - 初始化
//==============================
var _drill_COET_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_COET_temp_initialize.call(this);
	this._drill_COET_eventTank = {};			//分类容器
	this._drill_COET_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_COET_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_COET_eventTank = {};
	$gameTemp._drill_COET_needRestatistics = true;
	_drill_COET_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_COET_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_COET_eventTank = {};
	$gameTemp._drill_COET_needRestatistics = true;
	_drill_COET_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_COET_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_COET_map_update.call( this,sceneActive );
	this.drill_COET_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_COET_updateRestatistics = function() {
	if( !$gameTemp._drill_COET_needRestatistics ){ return }
	$gameTemp._drill_COET_needRestatistics = false;
	
	$gameTemp._drill_COET_eventTank = {};
	var events = this.events();
	for(var i = 0; i < events.length; i++ ){  
		var temp_event = events[i];
		for(var j = 0; j < temp_event._drill_COET_tag.length; j++ ){  
			var temp_tag = temp_event._drill_COET_tag[j];
			
			// > 每个tag放置该事件的指针
			if( $gameTemp._drill_COET_eventTank[temp_tag] == undefined ){
				$gameTemp._drill_COET_eventTank[temp_tag] = [];
			}
			$gameTemp._drill_COET_eventTank[temp_tag].push(temp_event);
		}
	}
}

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

