//=============================================================================
// Drill_PlayerTimerTiming.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        公共事件 - 时间计时器到零时
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerTimerTiming +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以针对时间计时器到零时，执行公共事件。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于多线程插件才能运行。
 * 基于：
 *   - Drill_LayerCommandThread     地图-多线程★★v1.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   专用于时间计时器。
 * 2.详细说明可以去看看文档"13.UI > 关于时间计时器.docx"。
 * 计时器规则：
 *   (1.默认的计时器，在地图中使用只会跑一个时间，没其他效果。
 *      在战斗中使用，归零后会立即判定游戏失败。
 *   (2.你可以通过此插件来修改公共事件执行，自定义到零后的操作。
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
 * 时间复杂度： o(1)
 * 测试方法：   在不同界面中进行测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在特定条件满足时，才进行触发判定，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * 
 *
 * 
 * @param ---战斗界面---
 * @default 
 * 
 * @param 战斗界面到零时执行
 * @parent ---战斗界面---
 * @type select
 * @option 游戏失败
 * @value 游戏失败
 * @option 公共事件
 * @value 公共事件
 * @desc 默认情况下，到零时执行游戏失败过程，你可以换成公共事件。
 * @default 游戏失败
 * 
 * @param 战斗公共事件执行方式
 * @parent 战斗界面到零时执行
 * @type select
 * @option 串行
 * @value 串行
 * @desc 公共事件的执行方式。
 * @default 串行
 * 
 * @param 战斗的公共事件
 * @parent 战斗界面到零时执行
 * @type common_event
 * @desc 符合条件时，触发执行的公共事件。
 * @default 0
 * 
 * @param ---地图界面---
 * @default 
 * 
 * @param 地图公共事件执行方式
 * @parent ---地图界面---
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。
 * @default 并行
 * 
 * @param 地图的公共事件
 * @parent ---地图界面---
 * @type common_event
 * @desc 符合条件时，触发执行的公共事件。
 * @default 0
 * 
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PTT (Player_Timer_Timing)
//		临时全局变量	DrillUp.g_PTT_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_Timer.prototype.onExpire
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(1)
//		★性能测试因素	UI管理层
//		★性能测试消耗	（插件条件没执行到，没有找到插件消耗）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			时间计时器到零时公共事件：
//				->判定执行
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
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PlayerTimerTiming = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PlayerTimerTiming');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PTT_battle_mode = String(DrillUp.parameters["战斗界面到零时执行"] || "游戏失败");
	DrillUp.g_PTT_battle_pipeType = String(DrillUp.parameters["战斗公共事件执行方式"] || "串行");
	DrillUp.g_PTT_battle_commonEventId = Number(DrillUp.parameters["战斗的公共事件"] || 0); 
	DrillUp.g_PTT_map_pipeType = String(DrillUp.parameters["地图公共事件执行方式"] || "串行");
	DrillUp.g_PTT_map_commonEventId = Number(DrillUp.parameters["地图的公共事件"] || 0); 


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerCommandThread ){


//=============================================================================
// ** 时间计时器 绑定
//=============================================================================
//==============================
// * 计时器 - 归零时操作（覆写）
//==============================
Game_Timer.prototype.onExpire = function(){
	
	// > 地图界面情况
	if( SceneManager._scene instanceof Scene_Map &&
		DrillUp.g_PTT_map_commonEventId > 0 ){
		
		// > 执行公共事件
		var e_data = {
			'type':"公共事件",
			'pipeType': DrillUp.g_PTT_map_pipeType,
			'commonEventId': DrillUp.g_PTT_map_commonEventId,
		};
		$gameMap.drill_LCT_addPipeEvent( e_data );
	}
	
	// > 战斗界面情况
	if( SceneManager._scene instanceof Scene_Battle &&
		DrillUp.g_PTT_battle_commonEventId > 0  ){
		
		if( DrillUp.g_PTT_battle_mode == "游戏失败" ){
			BattleManager.abort();
		}else{
		
			// > 执行公共事件（直接并行）
			var e_data = {
				'type':"公共事件",
				'pipeType': DrillUp.g_PTT_battle_pipeType,
				'commonEventId': DrillUp.g_PTT_battle_commonEventId,
			};
			var e_list = [
				{"code":117,"indent":0,"parameters":[ commonEventId ]},
				{"code":0,"indent":0,"parameters":[]}
			];
			$gameTroop._interpreter.setup(e_list);
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PlayerTimerTiming = false;
		alert(
			"【Drill_PlayerTimerTiming.js 公共事件 - 时间计时器到零时】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}

