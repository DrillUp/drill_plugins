//=============================================================================
// Drill_X_GaugeForFloorDamage.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图块 - 地形伤害漂浮数字[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "自定义地形伤害-%d-绑定数字"
 * @Drill_LE_parentKey "---自定义地形伤害集---"
 * @Drill_LE_var "DrillUp.g_XGFFD_bind_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_GaugeForFloorDamage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你受到地形伤害/治愈时，弹出相应的伤害数字。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_LayerDamageFloor       图块-地形伤害与地形治愈
 *   - Drill_GaugeFloatingNum       地图UI-临时漂浮参数数字
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 地形伤害 。
 * 2.更多详细的介绍，去看看 "26.图块 > 关于地形伤害与地形治愈.docx"。
 * 细节：
 *   (1.此插件用于绑定 地形伤害和漂浮数字 两个插件。
 *      玩家受到指定的地形伤害时，所有队伍成员弹出相应的伤害数字。
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
 * 测试方法：   去地图管理层，建立一堆上方图块的围栏。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只提供连接的功能，单独并不消耗多少性能。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 *
 * @param 漂浮数字出现模式
 * @type select
 * @option 只领队出现数字
 * @value 只领队出现数字
 * @option 所有队员出现数字
 * @value 所有队员出现数字
 * @desc 受到伤害/治愈时，漂浮参数数字出现的模式。
 * @default 所有队员出现数字
 * 
 * @param 默认地形伤害-绑定数字(伤害时)
 * @type number
 * @min 0
 * @desc 伤害触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 默认地形伤害-绑定数字(治愈时)
 * @type number
 * @min 0
 * @desc 治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param ---自定义地形伤害集---
 * @default
 * 
 * @param 自定义地形伤害-1-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-2-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-3-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-4-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-5-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-6-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-7-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-8-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-9-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 * 
 * @param 自定义地形伤害-10-绑定数字
 * @parent ---自定义地形伤害集---
 * @type number
 * @min 0
 * @desc 伤害/治愈触发时，立即弹出绑定的漂浮参数数字。0表示没有。具体样式和弹出设置去看看插件"地图UI-临时漂浮参数数字"。
 * @default 0
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XGFFD （Gauge_For_Floor_Damage）
//		临时全局变量	DrillUp.g_XGFFD_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	UI管理层
//		★性能测试消耗	未找到
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			地形伤害与地形治愈：
//				->默认地形伤害
//					->公式设置
//					->伤害闪烁效果
//				->自定义地形伤害
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
　　Imported.Drill_X_GaugeForFloorDamage = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_GaugeForFloorDamage');


	/*-----------------杂项------------------*/
	DrillUp.g_XGFFD_mode = String(DrillUp.parameters["漂浮数字出现模式"] || "所有队员出现数字");
	DrillUp.g_XGFFD_defaultBind1 = Number(DrillUp.parameters["默认地形伤害-绑定数字(伤害时)"] || 0);
	DrillUp.g_XGFFD_defaultBind2 = Number(DrillUp.parameters["默认地形伤害-绑定数字(治愈时)"] || 0);
	
	/*----------------自定义地形伤害-----------------*/
	DrillUp.g_XGFFD_bind_length = 10;
	DrillUp.g_XGFFD_bind = [];
	for( var i = 0; i < DrillUp.g_XGFFD_bind_length; i++ ){
		DrillUp.g_XGFFD_bind[i] = Number( DrillUp.parameters["自定义地形伤害-"+String(i+1)+"-绑定数字"] || 0);
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerDamageFloor &&
	Imported.Drill_GaugeFloatingNum ){
	

//=============================================================================
// * 地形伤害 - 伤害效果（默认）
//=============================================================================
var _drill_XGFFD_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
Game_Actor.prototype.executeFloorDamage = function(){
	_drill_XGFFD_executeFloorDamage.call(this);
	
    if( !$gameParty.inBattle() ){
		
		// > 出现判断
		var enable = false;
		var index = this.index();
		if( DrillUp.g_XGFFD_mode == "只领队出现数字" && index == 0 ){
			enable = true;
		}
		if( DrillUp.g_XGFFD_mode == "所有队员出现数字" && index < $gameParty.maxBattleMembers() ){
			enable = true;
		}
		if( enable == false ){ return; }
		
		// > 队员位置获取
		var e_pos = [];
		if( index == 0 ){
			e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
		}else{
			var ch = $gamePlayer.followers().follower( index-1 );
			e_pos = [ ch._realX, ch._realY ];
		}
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		var pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
					Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
		
		// > 出现数字（默认地形伤害，注意显示的数字 伤害为负数 治愈为正数）
		var damage_str = String( -1* this._drill_LDF_lastDamage_default );
		if( this._drill_LDF_lastDamage_default < 0 ){
			damage_str = "+" + damage_str;
		}
		if( this._drill_LDF_lastDamage_default > 0 ){
			var data = {
				'x': pos[0],
				'y': pos[1],
				'style_id': DrillUp.g_XGFFD_defaultBind1 -1,
				'symbol_data': damage_str,
				'sustain_time': 120,
			}
			if( data['style_id'] == -1 ){ return; }	//（未配置则跳过）
			$gameTemp._drill_GFN_commandSeq.push( data );
		}
		if( this._drill_LDF_lastDamage_default < 0 ){
			var data = {
				'x': pos[0],
				'y': pos[1],
				'style_id': DrillUp.g_XGFFD_defaultBind2 -1,
				'symbol_data': damage_str,
				'sustain_time': 120,
			}
			if( data['style_id'] == -1 ){ return; }	//（未配置则跳过）
			$gameTemp._drill_GFN_commandSeq.push( data );
		}
	}
};

//=============================================================================
// * 地形伤害 - 伤害效果（自定义）
//=============================================================================
var _drill_XGFFD_LDF_executeFloorDamage = Game_Actor.prototype.drill_LDF_executeFloorDamage;
Game_Actor.prototype.drill_LDF_executeFloorDamage = function(){
	_drill_XGFFD_LDF_executeFloorDamage.call(this);
	
    if( !$gameParty.inBattle() ){
		
		// > 出现判断
		var enable = false;
		var index = this.index();
		if( DrillUp.g_XGFFD_mode == "只领队出现数字" && index == 0 ){
			enable = true;
		}
		if( DrillUp.g_XGFFD_mode == "所有队员出现数字" && index < $gameParty.maxBattleMembers() ){
			enable = true;
		}
		if( enable == false ){ return; }
		
		// > 队员位置获取
		var e_pos = [];
		if( index == 0 ){
			e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
		}else{
			var ch = $gamePlayer.followers().follower( index-1 );
			e_pos = [ ch._realX, ch._realY ];
		}
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		var pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
					Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
		
		// > 出现数字（自定义地形伤害，注意显示的数字 伤害为负数 治愈为正数）
		var damage_str = String( -1* this._drill_LDF_lastDamage_custom );
		if( this._drill_LDF_lastDamage_custom < 0 ){
			damage_str = "+" + damage_str;
		}
		if( this._drill_LDF_lastDamage_custom == 0 ){ return; }
		var data = {
			'x': pos[0],
			'y': pos[1],
			'style_id': DrillUp.g_XGFFD_bind[ $gamePlayer._drill_LDF_lastCustomType ] -1,
			'symbol_data': damage_str,
			'sustain_time': 120,
		}
		if( data['style_id'] == -1 ){ return; }	//（未配置则跳过）
		$gameTemp._drill_GFN_commandSeq.push( data );
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_GaugeForFloorDamage = false;
		alert(
			"【Drill_X_GaugeForFloorDamage.js 图块 - 地形伤害漂浮数字[扩展]】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_LayerDamageFloor 图块-地形伤害与地形治愈"+
			"\n- Drill_GaugeFloatingNum 地图UI-临时漂浮参数数字"
		);
}



