//=============================================================================
// Drill_EventMutiSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        物体 - 计数开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventMutiSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当计数开关的钥匙数量满足一定条件时，会开启相应条件的锁。
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
 *   (1.计数开关被划分为触发器类。
 *      触发器是连接开关与门的中间体，用于控制门的开启条件。
 *      当计数开关的钥匙数量满足一定条件时，会开启相应条件的锁。
 *   (2.钥匙的注释设置 不跨事件页。
 *      锁的注释设置 跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.计数开关只记录钥匙的数量，不考虑钥匙的顺序。
 *      计数开关所有钥匙、锁必须在同一张地图中。
 *   (2.与 序列开关 不同，序列开关要求指定每个事件的条件,是有顺序的。
 * 钥匙/锁：
 *   (1.钥匙和锁最好是不同的事件，不然逻辑会混乱。
 *   (2.你可以设置 多个钥匙对应一把锁 或者 一个钥匙对应多把锁 。
 * 设计：
 *   (1.计数开关常用于点亮多个开关的闯关/解谜类游戏。
 *      游戏设计中，你可能需要考虑开关开启后 事件的缓冲动作，即大门
 *      打开/关闭的动作过程。具体可以参考重力开关的缓冲动作。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 钥匙
 * 你需要设置指定开关为某个钥匙，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>计数开关 : 钥匙 : 红机关
 *
 * 1.其中"红机关"是完全可以自定义的条件关键字。
 * 2.钥匙的设置不跨事件页，事件页有钥匙的注释，即钥匙+1。
 *   如果事件页中没有注释，则退回钥匙。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 锁
 * 你需要设置指定门给它上某种锁，使用下面的注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>计数开关 : 锁 : 红机关 : 4 : 触发独立开关 : A
 * 事件注释：=>计数开关 : 锁 : 红机关 : 不满足条件自动OFF
 * 
 * 事件注释：=>计数开关 : 锁 : 红机关 : 大于[4] : 触发独立开关 : A
 * 事件注释：=>计数开关 : 锁 : 红机关 : 小于[4] : 触发独立开关 : A
 * 事件注释：=>计数开关 : 锁 : 红机关 : 等于[4] : 触发独立开关 : A
 * 事件注释：=>计数开关 : 锁 : 红机关 : 大于等于[4] : 触发独立开关 : A
 * 事件注释：=>计数开关 : 锁 : 红机关 : 小于等于[4] : 触发独立开关 : A
 *
 * 1.红机关后面的数字为满足条件，如果只有一个数字"4"，表示默认
 *   "大于等于[4]"。
 * 2.你可以设置多个钥匙对应一把锁，或者一个钥匙对应多把锁，多对
 *   多也可以。
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
 * 测试方法：   去物体管理层、脉冲开关设计关卡，复制足够多的计数事件，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【10.14ms】
 *              100个事件的地图中，平均消耗为：【8.29ms】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.计数开关虽然每帧都会被监听一次，但是不会出现消耗量大的情况。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 添加了插件性能说明。
 * [v1.3]
 * 修复了切换事件页 + 离开地图 + 再回来，开关失效的bug。
 * 修改了注释说明，添加了大于、小于、等于的条件设置。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EMS（Event_Muti_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EMS_xxx
//		存储数据变量	$gameMap.drill_EMS_needRefresh （不完全算存储，离开地图就被清除重做）
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	脉冲开关设计关卡
//		★性能测试消耗	8.29ms
//		★最坏情况		暂无
//		★备注			消耗太小，一般消耗列表中找不到该插件。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			计数开关：
//				->每次刷事件页，更新key
//				->减少刷新key次数
//
//		★必要注意事项：
//			1._pattern与方向没有关系，该插件不需要考虑方向问题。
//			
//		★其它说明细节：
//			1.每次改变事件页的时候，检查一遍钥匙，根据钥匙开启锁。
//			2.优化：如果地图里面一个计数开关都没有，则不作多余计算。
//			3.优化：统计全部条件放在update里面，侦测到setupPage才执行一次，因为setupPage有可能会在一帧里面刷很多次。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventMutiSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventMutiSwitch');


//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 初始化
//==============================
var _drill_EMS_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_EMS_initialize.call(this);
	this._drill_EMS = {};
	this._drill_EMS.keys = {};
	this._drill_EMS.locks = {};
}
//==============================
// * 注释初始化
//==============================
var _drill_EMS_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EMS_initMembers.call(this);
	this._drill_EMS_isFirstBirth = true;
};
var _drill_EMS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EMS_event_setupPage.call(this);
    this.drill_EMS_setupMutiSwitch();
};
Game_Event.prototype.drill_EMS_setupMutiSwitch = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EMS_isFirstBirth ){ 
		this._drill_EMS_isFirstBirth = false;
		this.drill_EMS_readPage( this.event().pages[0].list );
	}
	
	// > 每次刷正常事件页时，更新keys
	this._drill_EMS.keys = {};
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EMS_readPage( this.list() );
	}
	
}
//==============================
// * 读取注释
//==============================
Game_Event.prototype.drill_EMS_readPage = function( page_list ) {	
	page_list.forEach( function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>计数开关"){
				if(args.length == 4){	//=>计数开关 : 钥匙 : 红机关
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "钥匙" ){
						this._drill_EMS.keys[temp2] = true;
					}
				}
				if(args.length == 6){	//=>计数开关 : 锁 : 红机关 : 不满足条件自动OFF
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					if( temp1 == "锁" && temp3 == "不满足条件自动OFF" ){
						if(!this._drill_EMS.locks[temp2] ){
							this._drill_EMS.locks[temp2] = {
								"name":temp2,
								"_switch":"",
								"condition":"",
								"num":0,
								"autoOff":false,
							};
						}
						this._drill_EMS.locks[temp2].autoOff = true;
					}
				}
				if(args.length == 10){	//=>计数开关 : 锁 : 红机关 : 4 : 触发独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					var temp4 = String(args[7]);
					var temp5 = String(args[9]);
					if( temp1 == "锁" && temp4 == "触发独立开关" ){
						var condition = "";
						var num = 0;
						if( temp3.indexOf("大于等于[") != -1 ){
							temp3 = temp3.replace("大于等于[","");
							temp3 = temp3.replace("]","");
							condition = "大于等于";
						}else if( temp3.indexOf("小于等于[") != -1 ){
							temp3 = temp3.replace("小于等于[","");
							temp3 = temp3.replace("]","");
							condition = "小于等于";
						}else if( temp3.indexOf("等于[") != -1 ){
							temp3 = temp3.replace("等于[","");
							temp3 = temp3.replace("]","");
							condition = "等于";
						}else if( temp3.indexOf("大于[") != -1 ){
							temp3 = temp3.replace("大于[","");
							temp3 = temp3.replace("]","");
							condition = "大于";
						}else if( temp3.indexOf("小于[") != -1 ){
							temp3 = temp3.replace("小于[","");
							temp3 = temp3.replace("]","");
							condition = "小于";
						}
						num = Number(temp3);
						
						this._drill_EMS.locks[temp2] = {
							"name":temp2,
							"_switch":temp5,
							"condition":condition,
							"num":num,
							"autoOff":false,
						};
						//alert(JSON.stringify(this._drill_EMS.locks[temp2]));
					}
				}
				$gameMap._drill_EMS_hasSwitch = true;
			};
		};
	}, this);
	
	$gameMap.drill_EMS_needRefresh = true;	//默认都刷新（有注释，少了注释，都有影响）
};

//==============================
// * 读取地图
//==============================
var _drill_EMS_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	this._drill_EMS_hasSwitch = false;		//如果地图里面一个计数开关都没有，则不作多余计算
	_drill_EMS_onMapLoaded.call(this);
};
//=============================================================================
// ** 地图帧刷新
//=============================================================================
var _drill_EMS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_EMS_map_update.call(this,sceneActive);
	
	//在刷新启动时，刷新全部
	if( this._drill_EMS_hasSwitch == true && this.drill_EMS_needRefresh == true ){
		this.drill_EMS_needRefresh = false;
		this.drill_EMS_refreshMutiSwitch();
	}
};

//=============================================================================
// ** 统计全部条件，并触发开关
//=============================================================================
Game_Map.prototype.drill_EMS_refreshMutiSwitch = function() {	//该函数每次改变时只进入一次，而不是不停刷新
	var events = this.events();
	
	// > 钥匙统计
	var all_keys = {};
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		var temp_keys = temp_event._drill_EMS.keys;
		for(var key in temp_keys ){
			if( temp_keys[key] == true ){
				//添加钥匙
				if( all_keys[key] == undefined ){
					all_keys[key] = 1;
				}else{
					all_keys[key] += 1;
				}
			}
		}
	}
	//alert(JSON.stringify(all_keys));
	
	// > 条件开锁
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		var temp_locks = temp_event._drill_EMS.locks;
		for(var lockname in temp_locks ){
			var lock = temp_locks[lockname];
			if( all_keys[ lock['name'] ] == undefined ){
				all_keys[ lock['name'] ] = 0;
			}
			
			if( lock['condition'] == "" || lock['condition'] == "大于等于" ){
				if( all_keys[ lock['name'] ] >= lock['num'] ){			//满足足够多的锁条件，开锁
					this.drill_EMS_turnOn( temp_event,lock );
				}else if( lock['autoOff'] == true ){		//不满足时，上锁
					this.drill_EMS_turnOff( temp_event,lock );
				}
			}
			if( lock['condition'] == "小于等于" ){
				if( all_keys[ lock['name'] ] <= lock['num'] ){	
					this.drill_EMS_turnOn( temp_event,lock );
				}else if( lock['autoOff'] == true ){	
					this.drill_EMS_turnOff( temp_event,lock );
				}
			}
			if( lock['condition'] == "等于" ){
				if( all_keys[ lock['name'] ] == lock['num'] ){	
					this.drill_EMS_turnOn( temp_event,lock );
				}else if( lock['autoOff'] == true ){	
					this.drill_EMS_turnOff( temp_event,lock );
				}
			}
			if( lock['condition'] == "大于" ){
				if( all_keys[ lock['name'] ] > lock['num'] ){	
					this.drill_EMS_turnOn( temp_event,lock );
				}else if( lock['autoOff'] == true ){	
					this.drill_EMS_turnOff( temp_event,lock );
				}
			}
			if( lock['condition'] == "小于" ){
				if( all_keys[ lock['name'] ] < lock['num'] ){	
					this.drill_EMS_turnOn( temp_event,lock );
				}else if( lock['autoOff'] == true ){	
					this.drill_EMS_turnOff( temp_event,lock );
				}
			}
		}
	}
	
};
//==============================
// * 控制 - 打开开关
//==============================
Game_Map.prototype.drill_EMS_turnOn = function( e, lock ) {
	var s_key = [this._mapId, e._eventId, lock['_switch'] ];
	if( $gameSelfSwitches.value(s_key) !== true){
		$gameSelfSwitches.drill_EMS_setValueWithOutChange(s_key,true);
		$gameMap.requestRefresh();
	}
}
//==============================
// * 控制 - 关闭开关
//==============================
Game_Map.prototype.drill_EMS_turnOff = function( e, lock ) {
	var s_key = [this._mapId, e._eventId, lock['_switch'] ];
	if( $gameSelfSwitches.value(s_key) !== false){
		$gameSelfSwitches.drill_EMS_setValueWithOutChange(s_key,false);
		$gameMap.requestRefresh();
	}
}

//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_EMS_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};


