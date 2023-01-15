//=============================================================================
// Drill_EventSightSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 镜头视野开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventSightSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当该开关进入镜头视野时，可以自动触发独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也能够被镜头插件扩展。
 * 被扩展：
 *   - Drill_LayerCamera           地图 - 活动地图镜头
 *     目标插件支持镜头缩放，该插件也能够兼容缩放后的视野范围。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于地图镜头。
 * 细节：
 *   (1.当指定事件进入视野范围内之后，触发指定的独立开关。
 *   (2.视野触发设置跨事件页，并且长期有效。
 *   (3.镜头放大或缩小时，也会影响到开关的开启与关闭。
 *      如果你通过镜头制作了某些放大缩小的特效，
 *      可能会在不经意间开启镜头视野开关。
 * 传感器：
 *   (1.镜头视野开关被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      任何一个事件停止移动时，立即计时，超过限定时间后，开启开关。
 *      若事件继续移动，则关闭开关，重新计时。
 *   (2.镜头视野开关的注释设置全都跨事件页。
 *      但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 * 设计：
 *   (1.镜头可以绑定在事件上，如果该事件在不断移动，可以以此做机关逼近的
 *      镜头地图。配合视野触发功能，能够对漏单的玩家进行惩罚。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 视野触发
 * 你可以通过事件注释，设置指定事件进入视野范围内触发：
 * 
 * 事件注释：=>镜头视野开关 : 进入视野 : 触发独立开关 : A
 * 事件注释：=>镜头视野开关 : 离开视野 : 关闭独立开关 : A
 * 
 * 1.插件固定为进入视野开启开关，离开视野关闭开关。
 * 2.注释只能设置一个独立开关，如果事件页中同时写了A开关的注释 和
 *   B开关的注释，那么将以B开关为准。
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
 * 测试方法：   在UI管理层，设置镜头视野开关，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【19.68ms】
 *              100个事件的地图中，平均消耗为：【15.80ms】
 *               50个事件的地图中，平均消耗为：【13.05ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只依靠镜头位置来触发开关，性能消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESiS（Event_Sight_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_ESiS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	2.99ms（update）15.80ms（drill_ESiS_updateSightSwitch）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			镜头视野开关：
//				->
//
//		★必要注意事项：
//			1.
//			
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventSightSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventSightSwitch');


//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ESiS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_ESiS_temp_initialize.call(this);
	this._drill_ESiS_sightEvents = [];			//含视野触发的事件
	this._drill_ESiS_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_ESiS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_ESiS_sightEvents = [];		//含视野触发的事件
	$gameTemp._drill_ESiS_needRestatistics = true;
	_drill_ESiS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_ESiS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_ESiS_sightEvents = [];
	$gameTemp._drill_ESiS_needRestatistics = true;
	_drill_ESiS_smap_createCharacters.call(this);
}
//==============================
// ** 容器 - 帧刷新
//==============================
var _drill_ESiS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ESiS_map_update.call( this, sceneActive );
	this.drill_ESiS_updateRestatistics();	//帧刷新 - 刷新统计
};
//==============================
// ** 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_ESiS_updateRestatistics = function() {
	if( !$gameTemp._drill_ESiS_needRestatistics ){ return }
	$gameTemp._drill_ESiS_needRestatistics = false;
	
	var events = this.events();
	$gameTemp._drill_ESiS_sightEvents = [];
	for( var i = 0; i < events.length; i++ ){ 
		var temp_event = events[i];
		if( temp_event._drill_ESiS_sightOn != null && 
			temp_event._drill_ESiS_sightOn != "") {
			$gameTemp._drill_ESiS_sightEvents.push(temp_event);
		}
		if( temp_event._drill_ESiS_sightOff != null && 
			temp_event._drill_ESiS_sightOff != "") {
			$gameTemp._drill_ESiS_sightEvents.push(temp_event);
		}
	}
}
//=============================================================================
// ** 事件注释
//=============================================================================
var _drill_ESiS_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_ESiS_c_setupPageSettings.call(this);
	
	// > 视野触发 - 跨事件页
	if( this._drill_ESiS_sightOn == undefined  ){ this._drill_ESiS_sightOn = ""; }
	if( this._drill_ESiS_sightOff == undefined ){ this._drill_ESiS_sightOff = ""; }
	
	var page = this.page();
    if( page ){
		this.list().forEach(function(l) {	//将页面注释转成插件指令格式
			if( l.code === 108 ){
				var args = l.parameters[0].split(' ');
				var command = args.shift();
				if( command == "=>镜头视野开关" ){
					if( args.length == 6 ){
						if( args[1] ){ var type  = String(args[1]);}
						if( args[3] ){ var type2 = String(args[3]);}
						if( args[5] ){ var temp1 = String(args[5]);}
						if( type == "进入视野" && type2 == "触发独立开关" ){
							this._drill_ESiS_sightOn = temp1;
							$gameTemp._drill_ESiS_needRestatistics = true;
						}
						if( type == "离开视野" && type2 == "关闭独立开关" ){
							this._drill_ESiS_sightOff = temp1;
							$gameTemp._drill_ESiS_needRestatistics = true;
						}
					}
				};  
			};
		}, this);
    }
}


//=============================================================================
// ** 视野触发
//=============================================================================
//==============================
// ** 视野 - 帧刷新
//==============================
var _drill_ESiS_sight_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ESiS_sight_update.call(this,sceneActive);
	this.drill_ESiS_updateSightSwitch();
};
Game_Map.prototype.drill_ESiS_updateSightSwitch = function() {
	
	// > 视野事件
	for(var i = 0; i < $gameTemp._drill_ESiS_sightEvents.length; i++){
		var temp_event = $gameTemp._drill_ESiS_sightEvents[i];
		
		// > 事件触发
		var isTriggered = this.drill_ESiS_posIsInCamera(temp_event._realX, temp_event._realY);
		
		// > 切换开关
		if( isTriggered ){
			var s_key = [this._mapId, temp_event._eventId, temp_event._drill_ESiS_sightOn ];
			if( $gameSelfSwitches.value(s_key) !== true){
				$gameSelfSwitches.drill_ESiS_setValueWithOutChange(s_key,true);
				$gameSelfSwitches.onChange();
			}
		}else{
			var s_key = [this._mapId, temp_event._eventId, temp_event._drill_ESiS_sightOff ];
			if( $gameSelfSwitches.value(s_key) !== false){
				$gameSelfSwitches.drill_ESiS_setValueWithOutChange(s_key,false);
				$gameSelfSwitches.onChange();
			}
		}
	}
}
DrillUp.g_LCa_alert = true;
//==============================
// * 视野 - 判断点是否在镜头内
//==============================
Game_Map.prototype.drill_ESiS_posIsInCamera = function( realX, realY ){
	//alert($gameMap.adjustX(realX)+","+$gameMap.adjustX(realY));
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert("【Drill_EventSightSwitch.js 物体 - 镜头视野开关】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
			DrillUp.g_LCa_alert = false;
		}
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 0.5 && 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 0.5 ;
}
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_ESiS_setValueWithOutChange = function( key, value ){
    if( value ){
        this._data[key] = true;
    }else{
        delete this._data[key];
    }
};


