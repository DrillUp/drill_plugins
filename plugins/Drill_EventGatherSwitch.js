//=============================================================================
// Drill_EventGatherSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 聚集开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventGatherSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当聚集开关聚集的数量超过一定值时，可以触发独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 传感器：
 *   (1.聚集开关被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      当聚集开关聚集的数量超过一定值时，独立开关会自动开启。
 *   (2.聚集开关的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.开关必须完全静止2帧之后，才会触发。
 *      并且三个开关同时被触发独立开关，如果你设置的为"自动执行"，
 *      那么id小的事件会先执行指令。
 *   (2.相同的聚集开关的聚集数量最好一致,不然数量少的开关会先触发。
 *   (3.假设聚集数量为2，但是碰巧有2个事件相隔，中间插入了第3个，
 *      那么这3个事件都会被同时触发。
 *   (4.如果你设计了方块消失，那么你还需要在消失状态的页设置关闭注
 *      释。防止消失的方块能够和其它方块继续产生聚集效果。
 * 聚集标签：
 *   (1.你可以指定必须含有相同标签的聚集开关，聚集才能触发。
 *      考虑到性能因素，同一个事件最多只能拥有一个聚集标签。
 *   (2.如果你需要获取聚集触发的数量，可以使用插件指令获取上一次。
 * 设计：
 *   (1.多用于三消类型的游戏，聚集的事件会一起被消除。
 *      注意示例中的消除砖块的设计中，鼠标拖移时需要等1帧，聚集开关
 *      判定需要再等1帧，这样就需要静止2帧缓冲时间，再触发砖块消除。
 *   (2.你也可以以此制作基于华容道但必须要求全部同色方块相邻才能通过
 *      的解谜。比如连接两头远距离的不可移动同色方块，形成一座桥。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定开关为重力，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>聚集开关 : 聚集数量[2] : 作用于独立开关 : A
 * 事件注释：=>聚集开关 : 关闭聚集开关
 * 
 * 1.相同的聚集开关的聚集数量最好一致,不然数量少的开关会先触发。
 * 2.假设聚集数量为2，但是碰巧有2个事件相隔，中间插入了第3个，
 *   那么这3个事件都会被同时触发。
 * 3.如果你设计了方块消失，那么你还需要在消失状态的页设置关闭注释。
 *   防止消失的方块能够和其它方块继续产生聚集效果。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 聚集标签
 * 你可以设置只有含有重力钥匙的事件才能触发重力锁的开关。
 * 
 * 事件注释：=>聚集开关 : 聚集标签 : 红方块
 * 
 * 1.聚集钥匙的关键字可以完全自定义。
 *   如果你没有指定聚集标签，则聚集标签为默认。
 * 2.考虑到性能因素，同一个事件最多只能拥有一个聚集标签。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 聚集触发数量
 * 你可以获取到上一次的发生聚集反应后，相关事件的数量。
 * 
 * 插件指令：>聚集开关 : 变量[21] : 获取上一次触发聚集的数量
 * 
 * 1.获取到的数量，为独立开关触发后聚集的总数量。
 *   如果独立开关一开始就是都开的，则没有效果。
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
 * 时间复杂度： o(n^4) 每帧
 * 测试方法：   去消除砖块关卡中进行测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【44.83ms】
 *              100个事件的地图中，平均消耗为：【38.98ms】
 *               50个事件的地图中，平均消耗为：【25.34ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.聚集开关由于结构特殊，只能用 深度优先遍历/广度优先遍历，其他
 *   的优化算法都受限，所以消耗量比较大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EGS（Event_Gather_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EGS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	消除砖块关卡
//		★性能测试消耗	38.98ms
//		★最坏情况		暂无
//		★备注			由于消除砖块和移动核心的持续下移(重力)有关，这里的性能消耗比较不稳定。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			聚集开关：
//				->必须在停稳之后才可以触发（3帧）
//				->开启关闭触发
//				->优化，一个开关都没有则不作计算
//				->事件容器
//				->指定钥匙(标签)的聚集开关
//				->获取上一次消除的连接数量
//				->被动聚集者、万能聚集者	?
//
//		★必要注意事项：
//			1.【这里开关的结构和变量关系比较绕】，
//				赋值的_c_switch是单个的聚集开关，_s_key和_s_lock是键值组。
//			3.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			
//		★其它说明细节：
//			1.每次检查坐标情况，来确定开关是否被压住。
//			2.优化：如果地图里面一个聚集开关都没有，则不作多余计算。
//			3.钥匙赋值为：{"开关_A":true,"开关_B":true} 只看键是否存在。
//			  锁赋值为：  {"开关_A":"A", "开关_B":"A"}  需要检查键，并且对应的值是开启的独立开关。
//			  如果没有触发，则锁的所有键对应的开关会关闭。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventGatherSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventGatherSwitch');

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EGS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EGS_pluginCommand.call(this, command, args);
	if( command === ">聚集开关" ){	// >聚集开关 : 变量[21] : 获取上一次触发聚集的数量
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "获取上一次触发聚集的数量"){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameVariables.setValue( temp1,$gameTemp._drill_EGS_count );
			}
		}
	}
};

//=============================================================================
// ** 临时变量初始化
//=============================================================================
var _drill_EGS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_EGS_temp_initialize.call(this);
	this._drill_EGS_count = 0;
};

//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 初始化
//==============================
var _drill_EGS_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_EGS_initialize.call(this);
	this._drill_EGS = {};
	this._drill_EGS._time = 0;			//判定延迟
	this._drill_EGS._num = 0;			//聚集数量
	this._drill_EGS._switch = "";		//触发开关
	this._drill_EGS._tag = "";			//聚集标签
}

//==============================
// * 注释初始化
//==============================
var _drill_EGS_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EGS_initMembers.call(this);
	this._drill_EGS_isFirstBirth = true;
};
var _drill_EGS_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EGS_setupPage.call(this);
    this.drill_EGS_setupSwitch();
};
Game_Event.prototype.drill_EGS_setupSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EGS_isFirstBirth ){ 
		this._drill_EGS_isFirstBirth = false;
		this.drill_EGS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EGS_readPage( this.list() );
	}
}
//==============================
// * 读取注释
//==============================
Game_Event.prototype.drill_EGS_readPage = function( page_list ) {	
	page_list.forEach( function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>聚集开关"){
				if(args.length == 6){	//=>聚集开关 : 聚集数量[2] : 作用于独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					if( temp2 == "作用于独立开关" ){
						temp1 = temp1.replace("聚集数量[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						
						this._drill_EGS._num = temp1;
						this._drill_EGS._switch = temp3;
						if( this._drill_EGS._tag == "" ){
							this._drill_EGS._tag = "default";
						}
						$gameTemp._drill_EGS_needRestatistics = true;
					}
				}
				if(args.length == 2){	//=>聚集开关 : 关闭聚集开关
					var temp1 = String(args[1]);
					if( temp1 == "关闭聚集开关" ){
						this._drill_EGS._switch = "";
						this._drill_EGS._tag = "";
						$gameTemp._drill_EGS_needRestatistics = true;
					}
				}
				if(args.length == 4){	//=>聚集开关 : 聚集标签 : 红方块
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "聚集标签" ){
						this._drill_EGS._tag = temp2;
						$gameTemp._drill_EGS_needRestatistics = true;
					}
				}
			};
		};
	}, this);
};
//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_EGS_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EGS_temp_initialize2.call(this);
	this._drill_EGS_tags = [];
	this._drill_EGS_switchs = {};
	this._drill_EGS_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EGS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_EGS_tags = [];
	$gameTemp._drill_EGS_switchs = {};
	$gameTemp._drill_EGS_needRestatistics = true;
	_drill_EGS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EGS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EGS_tags = [];
	$gameTemp._drill_EGS_switchs = {};
	$gameTemp._drill_EGS_needRestatistics = true;
	_drill_EGS_smap_createCharacters.call(this);
}

//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EGS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EGS_map_update.call( this, sceneActive );
	this.drill_EGS_updateRestatistics();	//帧刷新 - 刷新统计
	this.drill_EGS_updateSwitch();			//帧刷新 - 聚集开关
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EGS_updateRestatistics = function() {
	if( !$gameTemp._drill_EGS_needRestatistics ){ return }
	$gameTemp._drill_EGS_needRestatistics = false;
	
	var events = this.events();
	$gameTemp._drill_EGS_tags = [];
	$gameTemp._drill_EGS_switchs = {};
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event._drill_EGS._switch != "" &&
			temp_event._drill_EGS._tag != "" ){
			var tag = temp_event._drill_EGS._tag;
			if( $gameTemp._drill_EGS_tags.indexOf(tag) == -1 ){
				$gameTemp._drill_EGS_tags.push(tag);
				$gameTemp._drill_EGS_switchs[tag] = [];
			}
			$gameTemp._drill_EGS_switchs[tag].push(temp_event);
		}
	}
}
//=============================================================================
// * 触发 - 聚集开关
//=============================================================================
Game_Map.prototype.drill_EGS_updateSwitch = function() {
	if( !$gameTemp._drill_EGS_switchs ){ return }
	if( !$gameTemp._drill_EGS_tags ){ return }
	if( $gameTemp._drill_EGS_tags.length === 0 ){ return }
	
	for (var i = 0; i < $gameTemp._drill_EGS_tags.length; i++) {  
		var temp_tag = $gameTemp._drill_EGS_tags[i];
		
		// >筛选
		var temp_group = [];
		for (var j = 0; j < $gameTemp._drill_EGS_switchs[temp_tag].length; j++) {
			var temp_event = $gameTemp._drill_EGS_switchs[temp_tag][j];
			if( temp_event && temp_event._erased == false ){
				temp_group.push(temp_event);
			}
		}
		
		// > 延时控制
		for (var j = 0; j < temp_group.length; j++) {
			var temp_event = temp_group[j];
			if( temp_event.isStopping() ){
				temp_event._drill_EGS._time += 1;
			}else{
				temp_event._drill_EGS._time = 0;
			}
		}
		
		// > 相邻判断
		for (var j = 0; j < temp_group.length; j++) {
			var temp_event = temp_group[j];
			
			var e_tank = [];
			this.drill_EGS_eventsNearBy( temp_event, e_tank );
			if( e_tank.length <= 1 ){ 
				this.drill_EGS_turnOff( temp_event );
				continue;
			}
			
			// >延时判断
			var isInGroup = true;
			for(var k=0; k < e_tank.length; k++ ){
				var e = e_tank[k];
				if( e._drill_EGS._time < 2 ){	//只等2帧
					isInGroup = false;
				}
			}
			
			// >聚集触发
			if( isInGroup ){
				for(var k=0; k < e_tank.length; k++ ){
					var e = e_tank[k];
					if( e._drill_EGS._num <= e_tank.length ){
						// > 打开开关
						var s_key = [this._mapId, e._eventId, e._drill_EGS._switch ];
						if( $gameSelfSwitches.value(s_key) !== true){
							$gameTemp._drill_EGS_count = e_tank.length;	//记录数量
							$gameSelfSwitches.drill_EGS_setValueWithOutChange(s_key,true);
							$gameSelfSwitches.onChange();
						}
					}
				}
			}else{
				//当两个事件开启时，第三个事件接近，第三个事件开启，其他两个不变
			}
		}
	}
	
};
//==============================
// * 触发 - 单个事件附近的聚集开关（深度优先遍历，tank为容器指针）
//==============================
Game_Map.prototype.drill_EGS_eventsNearBy = function( e, tank ) {
	if( tank.indexOf(e) != -1 ){ return; }
	
	tank.push(e);
	var tag = e._drill_EGS._tag;
	var temp_group = $gameTemp._drill_EGS_switchs[tag];
	for( var i = 0; i < temp_group.length; i++ ){
		var temp_event = temp_group[i];
		if( tank.indexOf(temp_event) != -1 ){ continue; }
		
		if( $gameMap.distance(temp_event.x, temp_event.y, e.x, e.y) == 1 ){	//距离为1的即相邻
			this.drill_EGS_eventsNearBy( temp_event, tank );
		}
	}
}
//==============================
// * 触发 - 关闭开关
//==============================
Game_Map.prototype.drill_EGS_turnOff = function( e ) {
	var s_key = [this._mapId, e._eventId, e._drill_EGS._switch ];
	if( $gameSelfSwitches.value(s_key) !== false){
		$gameSelfSwitches.drill_EGS_setValueWithOutChange(s_key,false);
		$gameSelfSwitches.onChange();
	}
}
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_EGS_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};


