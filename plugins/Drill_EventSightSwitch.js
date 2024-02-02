//=============================================================================
// Drill_EventSightSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 镜头视野开关
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
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
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
 * ----激活条件 - 镜头视野开关
 * 你需要设置指定开关为镜头视野开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 在镜头视野时开启
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 不在镜头视野时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发" 就是 "在镜头视野时开启"的触发+"不在镜头视野时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"不在镜头视野时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 绑定持续触发(逆向)
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 在镜头视野时关闭
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 不在镜头视野时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发(逆向)" 就是 "在镜头视野时关闭"的触发+"不在镜头视野时开启"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>镜头视野开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>镜头视野开关 : 独立开关[B] : 绑定持续触发
 * 事件注释：=>镜头视野开关 : 独立开关[C] : 绑定持续触发(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 旧指令的格式相对没有那么规范，但是一样有效：
 * 
 * 事件注释(旧)：=>镜头视野开关 : 进入视野 : 触发独立开关 : A
 * 事件注释(旧)：=>镜头视野开关 : 离开视野 : 关闭独立开关 : A
 * 
 * 1.旧指令固定为进入视野开启开关，离开视野关闭开关。
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
 * [v1.1]
 * 大幅度优化了底层结构，节约了事件数据存储空间。
 * 实现了多个独立开关的镜头视野触发功能。
 * 
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
//		★性能测试因素	机关管理层
//		★性能测试消耗	3.5ms（drill_ESiS_updateSightSwitch）
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
//			->☆事件注释
//
//			->☆开关的属性
//				->可多个独立开关触发
//				->触发设置
//					> 在镜头视野时开启
//					> 不在镜头视野时关闭
//					> 在镜头视野时关闭
//					> 不在镜头视野时开启
//			->☆镜头视野开关容器
//				->开关的容器
//				->事件清除时
//
//			->☆开关控制
//
//
//		★家谱：
//			大家族-开关
//		
//		★脚本文档：
//			8.物体 > 大家族-开关（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//			
//		★其它说明细节：
//			1.drill_ESiS_posIsInCamera是一个通用的镜头判定函数，在其他的插件里都有这个函数的类似写法。
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
	DrillUp.g_ESiS_PluginTip_curName = "Drill_EventSightSwitch.js 物体-镜头视野开关";
	DrillUp.g_ESiS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_ESiS_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_ESiS_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventSightSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventSightSwitch');


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_ESiS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_ESiS_event_initMembers.call(this);
	this._drill_ESiS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_ESiS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ESiS_event_setupPage.call(this);
    this.drill_ESiS_setupMutiSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_ESiS_setupMutiSwitch = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_ESiS_isFirstBirth == true ){ 
		this._drill_ESiS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_ESiS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_ESiS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_ESiS_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>镜头视野开关" ){
				
				/*-----------------触发设置------------------*/	
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定持续触发" ){
						this.drill_ESiS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESiS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_ESiS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_ESiS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
					if( type == "在镜头视野时开启" ){
						this.drill_ESiS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESiS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
					if( type == "不在镜头视野时关闭" ){
						this.drill_ESiS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_ESiS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
					if( type == "绑定持续触发(逆向)" ){
						this.drill_ESiS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_ESiS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_ESiS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_ESiS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
					if( type == "在镜头视野时关闭" ){
						this.drill_ESiS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_ESiS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
					if( type == "不在镜头视野时开启" ){
						this.drill_ESiS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_ESiS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
				}
				
				/*-----------------旧指令------------------*/	
				if( args.length == 6 ){
					if( args[1] ){ var type  = String(args[1]);}
					if( args[3] ){ var type2 = String(args[3]);}
					if( args[5] ){ var switch_str = String(args[5]);}
					if( type == "进入视野" && type2 == "触发独立开关" ){
						this.drill_ESiS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESiS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
					if( type == "离开视野" && type2 == "关闭独立开关" ){
						this.drill_ESiS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_ESiS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_ESiS_needRestatistics = true;
					}
				}
			}
		}
	}, this);
}


//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_ESiS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_ESiS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_ESiS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_ESiS_checkSwitchData = function(){	
	if( this._drill_ESiS_switchData != undefined ){ return; }
	this._drill_ESiS_switchData = {};
	this._drill_ESiS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 初始化独立开关
//
//			说明：	> 注意，多个注释能触发多个独立开关。
//==============================
Game_Character.prototype.drill_ESiS_checkSwitchData_Switch = function( switch_str ){
	this.drill_ESiS_checkSwitchData()
	if( this._drill_ESiS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredOn'] = false;			//在镜头视野时开启
	switch_data['notTriggeredOff'] = false;		//不在镜头视野时关闭
	switch_data['triggeredOff'] = false;		//在镜头视野时关闭
	switch_data['notTriggeredOn'] = false;		//不在镜头视野时开启
	
	this._drill_ESiS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_ESiS_hasAnySwitch = function(){
	return this.drill_ESiS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_ESiS_getSwitchList = function(){
	if( this._drill_ESiS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_ESiS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_ESiS_removeSwitch = function( switch_str ){
	this.drill_ESiS_checkSwitchData()
	this._drill_ESiS_switchData['switch'][switch_str] = undefined;
	delete this._drill_ESiS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_ESiS_clearSwitchList = function(){
	this.drill_ESiS_checkSwitchData()
	this._drill_ESiS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 触发设置 - 在镜头视野时开启
//==============================
Game_Character.prototype.drill_ESiS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_ESiS_checkSwitchData();
	this.drill_ESiS_checkSwitchData_Switch( switch_str );
	this._drill_ESiS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不在镜头视野时关闭
//==============================
Game_Character.prototype.drill_ESiS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_ESiS_checkSwitchData();
	this.drill_ESiS_checkSwitchData_Switch( switch_str );
	this._drill_ESiS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 在镜头视野时关闭
//==============================
Game_Character.prototype.drill_ESiS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_ESiS_checkSwitchData();
	this.drill_ESiS_checkSwitchData_Switch( switch_str );
	this._drill_ESiS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不在镜头视野时开启
//==============================
Game_Character.prototype.drill_ESiS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_ESiS_checkSwitchData();
	this.drill_ESiS_checkSwitchData_Switch( switch_str );
	this._drill_ESiS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}


//=============================================================================
// ** ☆镜头视野开关容器
//
//			说明：	> 此模块专门定义 镜头视野开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_ESiS_clearTemp = function(){
	this._drill_ESiS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_ESiS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_ESiS_temp_initialize.call(this);
	this.drill_ESiS_clearTemp();
	this._drill_ESiS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_ESiS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_ESiS_clearTemp();
	$gameTemp._drill_ESiS_needRestatistics = true;
	_drill_ESiS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_ESiS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_ESiS_clearTemp();
	$gameTemp._drill_ESiS_needRestatistics = true;
	_drill_ESiS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_ESiS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ESiS_map_update.call( this, sceneActive );
	this.drill_ESiS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_ESiS_updateRestatistics = function(){
	if( $gameTemp._drill_ESiS_needRestatistics != true ){ return }
	$gameTemp._drill_ESiS_needRestatistics = false;
	
	$gameTemp._drill_ESiS_switchTank = [];
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._erased == true ){ continue; }
		if( temp_event.drill_ESiS_hasAnySwitch() ){
			$gameTemp._drill_ESiS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_ESiS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_ESiS_erase.call(this);
	if( this.drill_ESiS_hasAnySwitch() ){
		$gameTemp._drill_ESiS_needRestatistics = true;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 镜头视野开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 参数
//==============================
DrillUp.g_LCa_alert = true;		//（强制更新提示 锁）
//==============================
// * 开关控制 - 判断点是否在镜头内
//==============================
Game_Map.prototype.drill_ESiS_posIsInCamera = function( realX, realY ){
	//alert($gameMap.adjustX(realX)+","+$gameMap.adjustX(realY));
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】镜头范围内+缩放
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert( DrillUp.drill_ESiS_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LCa_alert = false;
		}
		
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 0.5 && 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 0.5 ;
}
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_ESiS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ESiS_map_update2.call( this, sceneActive );
	this.drill_ESiS_updateSightSwitch();
};
//==============================
// * 开关控制 - 帧刷新 开关
//==============================
Game_Map.prototype.drill_ESiS_updateSightSwitch = function() {
	
	// > 镜头视野开关
	for(var i = 0; i < $gameTemp._drill_ESiS_switchTank.length; i++){
		var temp_switchEv = $gameTemp._drill_ESiS_switchTank[i];
		
		// > 镜头视野开关 - 获取独立开关列表
		var switch_list = temp_switchEv.drill_ESiS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
		
			// > 事件触发
			var isTriggered = this.drill_ESiS_posIsInCamera( temp_switchEv._realX, temp_switchEv._realY );
			
			// > 触发 - 在镜头视野时
			if( isTriggered ){
				
				if( temp_switchEv._drill_ESiS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
					this.drill_ESiS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
				if( temp_switchEv._drill_ESiS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
					this.drill_ESiS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				
			// > 触发 - 不在镜头视野时
			}else{
				
				if( temp_switchEv._drill_ESiS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
					this.drill_ESiS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				if( temp_switchEv._drill_ESiS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
					this.drill_ESiS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
			}
			
		}
	}
}
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_ESiS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};


