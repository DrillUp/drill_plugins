//=============================================================================
// Drill_EventOtherCondition.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体 - 事件页出现条件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventOtherCondition +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置事件拥有更多的出现条件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 出现条件：
 *   (1.事件页的条件可以受到注释<<出现条件>>的影响。
 *      看条件时，你需要留意事件页是否有这个注释。
 *   (2.通常事件页的出现条件分为三种：开关、变量、独立开关。
 *      所有其他复杂条件，都可以先绑定开关/变量，再对开关/变量进行赋值。
 *   (3.详细机制可以去看看 "8.物体 > 独立开关与事件页.docx"。
 * 细节：
 *   (1.你可以写多个变量、开关条件，写多条注释即可。
 *      事件页含多条注释时，必须同时满足 所有条件，事件页才能被激活。
 *   (2.举个例子，如果你想设置背包中的物品达到一定数量时开启事件页。
 *      那么你应该让事件页先绑定到变量，再将物品数量赋给那个变量。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 要设置更多的出现条件，直接在指定页添加下面的注释即可：
 * 
 * 事件注释：<<出现条件>> : 开关[10] : 必须为ON
 * 事件注释：<<出现条件>> : 开关[10] : 必须为OFF
 * 事件注释：<<出现条件>> : 变量[10] : 大于 : 10
 * 事件注释：<<出现条件>> : 变量[10] : 小于 : 10
 * 事件注释：<<出现条件>> : 变量[10] : 等于 : 10
 * 事件注释：<<出现条件>> : 变量[10] : 大于等于 : 10
 * 事件注释：<<出现条件>> : 变量[10] : 小于等于 : 10
 * 
 * 1.由于注释修改的是"出现条件"，指令特殊，所以与其他注释有区别。
 * 2.如果你有多个条件，那么写多条注释即可。
 *   注意，如果写两条，表示必须同时满足 条件1 和 条件2，事件页才能激活。
 *   而如果你要设置的是 条件1 或 条件2，那么应该写两个事件页，一个条件1
 *   事件页，另一个条件2事件页。
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
 * 测试方法：   以正常流程进行游戏，查看插件消耗情况。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只修改条件识别，并不附加多余工作量，所以不会造成多少消
 *   耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了注释英文拼写错误的bug，改为 ON和NO 写法都有效。
 * [v1.2]
 * 改进优化了内部数据结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EOC（Event_Other_Condition）
//		临时全局变量	无
//		临时局部变量	无（直接操作）
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	任意地图
//		★性能测试消耗	
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//
//			->☆出现条件
//				->读取事件数据的页
//				->出现条件控制
//			->☆事件数据的属性
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
//			暂无
//			
//		★其它说明细节：
//			1.其他物体插件都是通过独立开关入口来确定事件页的，如果可以设置更多的未知条件。
//			  那么独立开关的串行性可能会被打破。
//
//		★存在的问题：
//			1.问题：如果事件通过事件复制器复制，不知道datamap能不能初始化<<出现条件>>。
//			  解决：【未解决】
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EOC_PluginTip_curName = "Drill_EventOtherCondition.js 物体-事件页出现条件";
	DrillUp.g_EOC_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventOtherCondition = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventOtherCondition');

	

//=============================================================================
// ** ☆出现条件
//
//			说明：	> 此模块管理 事件页出现条件 的控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 出现条件 - 绑定
//==============================
var _drill_EOC_eventData_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	
	// > 读取事件数据（该位置的$dataMap数据正好加载完毕）
	$gameTemp.drill_EOC_eventData_readAll();
	
	// > 原函数
	_drill_EOC_eventData_onMapLoaded.call(this);
};
//==============================
// * 出现条件 - 读取事件数据
//==============================
Game_Temp.prototype.drill_EOC_eventData_readAll = function(){
	
	// > 事件数据
	for( var i = 0; i < $dataMap.events.length; i++ ){
		var eventData = $dataMap.events[i];
		if( eventData == undefined ){ continue; }
		if( eventData.pages == undefined ){ continue; }
		
		// > 事件页列表
		for( var j = 0; j < eventData.pages.length; j++ ){
			var page = eventData.pages[j];
			if( page == undefined ){ continue; }
			this.drill_EOC_eventData_readOnePage( i, page );
		}
	}
};
//==============================
// * 出现条件 - 读取事件数据的页
//==============================
Game_Temp.prototype.drill_EOC_eventData_readOnePage = function( eventId, page ){
	var pageOfList = page.list;
	if( pageOfList == undefined ){ return; }
	
	// > 事件注释
	for(var n = 0; n < pageOfList.length; n++){
		var l = pageOfList[n];
		if( l.code != 108 ){ continue; }
		var l_str = l.parameters[0];
		var args = l_str.split(' ');
		var command = args.shift();
		if( command == "<<出现条件>>" ){
			
			/*-----------------开关------------------*/
			if( args.length == 4 ){
				var temp1 = String(args[1]);
				var temp2 = String(args[3]);
				if( temp1.indexOf("开关[") != -1 ){
					temp1 = temp1.replace("开关[","");
					temp1 = temp1.replace("]","");
					if( temp2 == "必须为NO" || temp2 == "必须为ON"  ){
						this.drill_EOC_addData_Switch( page, Number(temp1), true );
					}
					if( temp2 == "必须为OFF"  ){
						this.drill_EOC_addData_Switch( page, Number(temp1), false );
					}
				}
			}
			/*-----------------变量------------------*/
			if( args.length == 6 ){
				var temp1 = String(args[1]);
				var temp2 = String(args[3]);
				var temp3 = String(args[5]);
				if( temp1.indexOf("变量[") != -1 ){
					temp1 = temp1.replace("变量[","");
					temp1 = temp1.replace("]","");
					this.drill_EOC_addData_Variable( page, Number(temp1), Number(temp3), temp2 );
				}
			}
		}
	}
};
//==============================
// * 出现条件 - 出现条件控制
//==============================
var _drill_EOC_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function( page ){
	
	// > 出现条件控制
	var result = this.drill_EOC_meetsConditions( page );
	if( result == false ){ return false; }
	if( result == null ){ } //（不操作，继续进入原函数）
	
	// > 原函数
	return _drill_EOC_meetsConditions.call(this, page );
};


//=============================================================================
// ** ☆事件数据的属性
//
//			说明：	> 此模块专门定义 事件数据的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件数据的属性 - 初始化 数据
//==============================
Game_Temp.prototype.drill_EOC_checkData = function( page ){
	if( page._drill_EOC_conditionTank != undefined ){ return; }
	page._drill_EOC_conditionTank = [];		//（这里就不要放在 page.conditions 数据下面了）
};
//==============================
// * 事件数据的属性 - 添加数据 - 开关
//==============================
Game_Temp.prototype.drill_EOC_addData_Switch = function( page, switch_id, switch_value ){
	this.drill_EOC_checkData( page );
	var conditionData = {};
	conditionData['type'] = "switch";
	conditionData['id'] = Number(switch_id);
	conditionData['value'] = switch_value;
	page._drill_EOC_conditionTank.push( conditionData );
};
//==============================
// * 事件数据的属性 - 添加数据 - 变量
//==============================
Game_Temp.prototype.drill_EOC_addData_Variable = function( page, variable_id, variable_value, variable_symbol ){
	this.drill_EOC_checkData( page );
	var conditionData = {};
	conditionData['type'] = "variable";
	conditionData['id'] = Number(variable_id);
	conditionData['value'] = variable_value;
	conditionData['symbol'] = variable_symbol;
	page._drill_EOC_conditionTank.push( conditionData );
};

//==============================
// * 事件数据的属性 - 出现条件控制
//
//			说明：	> 该函数只会返回 false 和 null 两种值。
//					> 添加多个出现条件，表示多个限制。
//					> 原函数的出现条件要求 所有条件全部满足 才能返回true。
//==============================
Game_Event.prototype.drill_EOC_meetsConditions = function( page ){
	if( page._drill_EOC_conditionTank == undefined ){ return null; }
	for( var i = 0; i < page._drill_EOC_conditionTank.length; i++ ){
		var condition = page._drill_EOC_conditionTank[i];
		
		// > 开关
		if( condition['type'] == "switch" ){
			var temp_value = $gameSwitches.value( condition['id'] );
			if( temp_value != condition['value'] ){
				return false;
			}
		}
		
		// > 变量
		if( condition['type'] == "variable" ){
			var temp_value = $gameVariables.value( condition['id'] );
			if( condition['symbol'] == "大于" && ( !( temp_value > condition['value'] )) ){
				return false;
			}
			else if( condition['symbol'] == "小于" && ( !( temp_value < condition['value'] )) ){
				return false;
			}
			else if( condition['symbol'] == "等于" && ( !( temp_value == condition['value'] )) ){
				return false;
			}
			else if( condition['symbol'] == "大于等于" && ( !( temp_value >= condition['value'] )) ){
				return false;
			}
			else if( condition['symbol'] == "小于等于" && ( !( temp_value <= condition['value'] )) ){
				return false;
			}
		}
	}
	return null;
};

