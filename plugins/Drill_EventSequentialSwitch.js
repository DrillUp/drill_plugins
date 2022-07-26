//=============================================================================
// Drill_EventSequentialSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 序列开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventSequentialSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置某个锁，必须在按照指定的顺序开启/关闭时，才会被激活。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 触发器：
 *   (1.序列开关被划分为触发器类。
 *      触发器是连接开关与门的中间体，用于控制门的开启条件。
 *      当序列开关的固定顺序开关满足开启/关闭条件时，才会被激活。
 *   (2.序列开关的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.序列开关必须指定每一个事件的开关状态作为调节，是有顺序的。
 *   (2.你可以写大量条件注释，这些注释与 分歧条件 指令的原理一样。
 *      但是必须所有条件全部同时满足才能够触发。
 *   (3.与 计数开关 不同，计数开关只监听钥匙数量，没有严格的条件。
 * 钥匙/锁：
 *   (1.序列开关所有条件都直接写在锁中。
 *      钥匙就是 条件 中指定的事件。
 *   (2.由于条件严格，即使你切换了锁的事件页，只要有条件未满足，
 *      锁会立即关闭。
 * 设计：
 *   (1.多用于事件图案、规律图形、规定放置顺序的解谜类游戏。
 *      游戏设计中，你可能需要考虑开关开启后 事件的缓冲动作，即大门
 *      打开/关闭的动作过程。具体可以参考重力开关的缓冲动作。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 条件
 * 你需要设置该锁的开启条件，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>序列开关 : 独立开关条件 : 本事件 : A : 开启
 * 事件注释：=>序列开关 : 独立开关条件 : 事件[10] : A : 开启
 * 事件注释：=>序列开关 : 独立开关条件 : 事件变量[11] : A : 开启
 * 事件注释：=>序列开关 : 独立开关条件 : 批量事件[11,10] : A : 开启
 * 
 * 事件注释：=>序列开关 : 独立开关条件 : 事件[10] : A : 开启
 * 事件注释：=>序列开关 : 独立开关条件 : 事件[10] : A : 关闭
 * 
 * 1.序列开关不区分"钥匙"与"锁"，所有条件直接写在锁中。
 * 2.你可以写大量条件注释，这些注释与 分歧条件 指令的原理一样。
 *   但是必须所有条件全部同时满足才能够有效。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 开锁
 * 你需要设置指定开关为某个钥匙，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>序列开关 : 满足全部条件时触发独立开关 : A
 * 事件注释：=>序列开关 : 满足指定数量条件时触发独立开关 : 5 : A
 * 
 * 事件注释：=>序列开关 : 不满足条件自动OFF
 *
 * 1.满足条件时，固定开启触发的独立开关。
 *   如果你还需要在不满足时关闭，需要加上"不满足条件自动OFF"的指令。
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
 * 测试方法：   去鼠标管理层、逻辑图形关卡，复制足够多序列条件事件，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【8.61ms】
 *              100个事件的地图中，平均消耗为：【5.15ms】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.序列开关虽然每帧都会被监听一次，但是不会出现消耗量大的情况。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了游戏注释说明。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESeS（Event_Sequential_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_ESeS_xxx
//		存储数据变量	$gameMap.drill_ESeS_needRefresh （不完全算存储，离开地图就被清除重做）
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	去逻辑图形设计关卡
//		★性能测试消耗	8.61ms
//		★最坏情况		每个事件都有乱七八糟的条件。(其实也不影响性能)
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			序列开关：
//				->每次切换独立开关，更新条件
//				->节约刷新次数
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.每次改变事件页的时候，检查一遍条件，根据条件开启锁。
//			2.优化：如果地图里面一个序列开关都没有，则不作多余计算。
//			3.优化：统计全部条件放在update里面，侦测到setupPage才执行一次，因为setupPage有可能会在一帧里面刷很多次。
//
//		★存在的问题：
//			1.当鼠标靠近时，开启了独立开关，然后保存，读档，所有跨事件页的事件会保持停滞的锁死状态。
//			  正常情况都会停留回原来有注释页的那一面。正常状态下保存，则没有任何问题。
//			  该问题目前没有解决方法。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventSequentialSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventSequentialSwitch');



//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件初始化
//==============================
var _drill_ESeS_e_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_ESeS_e_initMembers.call(this);
	this._drill_ESeS_conditions = [];		//条件
	this._drill_ESeS_locks = [];				//锁
	this._drill_ESeS_lockAutoOff = false;	//自动OFF（直接对所有锁有效）
};
//==============================
// * 注释初始化
//==============================
var _drill_ESeS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ESeS_event_setupPage.call(this);
    this.drill_ESeS_setupSwitch();
};
Game_Event.prototype.drill_ESeS_setupSwitch = function() {		
	if (!this._erased && this.page()) {
		var pages = this.event().pages;
		for( var n=0; n < pages.length; n++){
			this.drill_ESeS_readPage( pages[n].list );			//强制检查全部注释，防止切换事件页保存读取后失效。
		}
	};
	$gameMap.drill_ESeS_needRefresh = true;	//刷新锁（有注释，少了注释，都有影响）
};
//==============================
// * 读取注释
//==============================
Game_Event.prototype.drill_ESeS_readPage = function( page_list ) {		
	page_list.forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>序列开关"){
				
				/*-----------------条件------------------*/
				if(args.length == 8){	//=>序列开关 : 独立开关条件 : 本事件 : A : 开启
					var type = String(args[1]);
					var unit = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					var e_ids = null;
					
					if( unit == "本事件" ){
						e_ids = [ this._eventId ];
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
					
					if( e_ids && type == "独立开关条件" ){
						for( var k=0; k < e_ids.length; k++ ){
							var condition = {
								'type':type,
								'id':e_ids[k],
								'switch':temp1,
								'value':temp2==="开启",
							};
							this._drill_ESeS_conditions.push(condition);
						}
					}
				}
				
				/*-----------------锁------------------*/
				if(args.length == 4){	//=>序列开关 : 满足全部条件时触发独立开关 : A
					var type = String(args[1]);
					var temp2 = String(args[3]);
					if( type == "满足全部条件时触发独立开关" ){
						var lock = {
							'type':type,
							'num':0,
							'switch':temp2,
						};
						this._drill_ESeS_locks.push(lock);
						$gameMap._drill_ESeS_hasSwitch = true;
					}
				}
				if(args.length == 6){	//=>序列开关 : 满足指定数量条件时触发独立开关 : 5 : A
					var type = String(args[1]);
					var temp1 = Number(args[3]);
					var temp2 = String(args[5]);
					if( type == "满足指定数量条件时触发独立开关" ){
						var lock = {
							'type':type,
							'num':temp1,
							'switch':temp2,
						};
						this._drill_ESeS_locks.push(lock);
						$gameMap._drill_ESeS_hasSwitch = true;
					}
				}
				if(args.length == 2){
					var type = String(args[1]);
					if( type == "不满足条件自动OFF" ){
						this._drill_ESeS_lockAutoOff = true;
					}
				}
			};
		};
	}, this);
}

//==============================
// * 独立开关侦听
//==============================
var _drill_ESeS_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function(key, value) {
	_drill_ESeS_setValue.call(this, key, value);
	$gameMap.drill_ESeS_needRefresh = true;
};


//=============================================================================
// ** 地图
//=============================================================================
//==============================
// * 读取初始化
//==============================
var _drill_ESeS_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	this._drill_ESeS_hasSwitch = false;		//如果地图里面一个序列开关都没有，则不作多余计算
	_drill_ESeS_onMapLoaded.call(this);
};
//==============================
// ** 帧刷新
//==============================
var _drill_ESeS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_ESeS_map_update.call(this,sceneActive);
	
	//在刷新启动时，刷新全部
	if( this._drill_ESeS_hasSwitch == true && this.drill_ESeS_needRefresh == true ){
		this.drill_ESeS_needRefresh = false;
		this.drill_ESeS_refreshSwitch();
	}
};

//==============================
// ** 统计全部条件，并触发开关
//==============================
Game_Map.prototype.drill_ESeS_refreshSwitch = function() {	//该函数每次改变时只进入一次，而不是不停刷新
	var events = this.events();
	var need_refresh = false;	
	
	// > 遍历锁
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		var temp_conditions = temp_event._drill_ESeS_conditions;
		var temp_locks = temp_event._drill_ESeS_locks;
		if( temp_locks.length == 0 ){ continue; }
		
		// > 条件初始化
		var is_all_fit = true;
		var fit_num = 0;
		for( var j=0; j < temp_conditions.length; j++ ){
			var condition = temp_conditions[j];
			var s_key = [this._mapId, condition['id'], condition['switch'] ];
			if( $gameSelfSwitches.value(s_key) == condition['value'] ){
				fit_num += 1;
			}else{
				is_all_fit = false;
			}
		}
		
		// > 开锁
		for( var j=0; j < temp_locks.length; j++ ){
			var lock = temp_locks[j];
			if( lock['type'] == "满足全部条件时触发独立开关" ){
				if( is_all_fit ){
					var s_key = [this._mapId, temp_event._eventId, lock['switch'] ];
					if( $gameSelfSwitches.value(s_key) !== true){
						$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
						need_refresh = true;
					}
				}else if( temp_event._drill_ESeS_lockAutoOff == true ){
					var s_key = [this._mapId, temp_event._eventId, lock['switch'] ];
					if( $gameSelfSwitches.value(s_key) !== false){
						$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
						need_refresh = true;
					}
				}
			}
			if( lock['type'] == "满足指定数量条件时触发独立开关" ){
				if( fit_num >= lock['num'] ){
					var s_key = [this._mapId, temp_event._eventId, lock['switch'] ];
					if( $gameSelfSwitches.value(s_key) !== true){
						$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
						need_refresh = true;
					}
				}else if( temp_event._drill_ESeS_lockAutoOff == true ){
					var s_key = [this._mapId, temp_event._eventId, lock['switch'] ];
					if( $gameSelfSwitches.value(s_key) !== false){
						$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
						need_refresh = true;
					}
				}
			}
		}
		
	}
	
	if(need_refresh){
		$gameMap.requestRefresh();	//变化后手动刷新
	}
};

//==============================
// * 优化 - 独立开关赋值时不刷新地图（防止反复调用value函数时出现死循环）
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};


