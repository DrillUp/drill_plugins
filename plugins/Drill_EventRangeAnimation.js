//=============================================================================
// Drill_EventRangeAnimation.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        物体触发 - 固定区域 & 播放并行动画
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventRangeAnimation +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得事件能够使得事件 范围内 的区域，批量播放并行动画。
 * 只播放动画。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFixedArea        物体触发-固定区域核心
 *     需要该核心才能进行区域动画播放。
 * 可被扩展：
 *   - Drill_EventRangeTrigger      物体触发-固定区域 & 条件触发
 *     如果使用目标插件，插件指令的"上一次触发的"、"读取区域"可以生效。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件，坐标点。
 * 2.更多详细介绍，去看看 "9.物体触发 > 关于物体触发-固定区域.docx"。
 * 并行动画：
 *   (1.以指定的事件为中心，在事件周围固定区域批量播放动画。
 *   (2.你可以播放无限时间的动画，但是只要离开地图或者读档，动画就消失。
 *   (3.你需要留意 触发与动画 的关系，
 *      有些图块的触发有效,但不会播放动画，比如炸弹炸到的可炸物。
 *      也有可能只播放一次动画，却触发了多次，比如连续的爆炸伤害。
 * 固定区域：
 *   (1.默认有 菱形、方形、圆形、十字、横条、竖条 六种形状，都与方向无关。
 *   (2.你可以 自定义区域，自定义区域与方向有关，可在核心中配置。
 *   (3.上述的区域都可经过筛选器筛选，筛选条件见 固定区域核心 。
 * 记录区域：
 *   (1.记录区域只记录触发的区域。与动画区域无关。
 *   (2.你可以将上一次触发过的区域，进行动画播放。
 *      或者将保存在一个容器中区域取出，进行动画播放。
 *   (3.注意，保存的区域，是经过筛选器筛选后的剩余区域。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 范围播放
 * 你可以通过插件指令设置触发的条件。
 * （注意，冒号左右有空格）
 *
 * 插件指令：>物体范围动画 : 玩家位置 : 菱形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 本事件 : 菱形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 事件[10] : 菱形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 事件变量[10] : 菱形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 位置[10,10] : 菱形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 位置变量[10,10] : 菱形区域 : 1 : 动画[80]
 *
 * 插件指令：>物体范围动画 : 本事件 : 菱形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 本事件 : 方形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 本事件 : 圆形区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 本事件 : 十字区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 本事件 : 横条区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 本事件 : 竖条区域 : 1 : 动画[80]
 * 
 * 1.六种形状的区域不需要方向，所以只要找到一个点即可展开面积并触发。
 *   区域后面的数字表示范围，0表示只有坐标点自己。
 *   再比如，"方形区域 : 1"表示事件的位置以及周围8个图块的区域。
 *   玩家自己不是事件，也没有独立开关，所以这里特别标注为"玩家位置"。
 * 2.前半部分（本事件）和后半部分（xx区域）的参数可以随意组合。
 *   一共有6*6种组合方式。
 * 3."动画[80]"中数字表示对应的动画id。
 * 4."事件变量"为变量值对应的事件id，通过变量可以操作 事件复制器 复制出
 *   来的新事件。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自定义区域
 * 你可以通过插件指令设置播放的自定义区域：
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>物体范围动画 : 本事件 : 自定义区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 事件[10] : 自定义区域 : 1 : 动画[80]
 * 插件指令：>物体范围动画 : 事件变量[10] : 自定义区域 : 1 : 动画[80]
 *
 * 1.自定义区域只对事件有效，如果是玩家，可以建立一个时刻跟随的玩家事件。
 * 2.区域后面的数字，对应 区域核心配置 的自定义区域编号。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 筛选器
 * 上述的区域，有可能需要再经过一次额外的筛选，来满足复杂地形的条件：
 * 
 * 插件指令：>物体范围动画 : 固定区域 : 开启筛选器 : 1
 * 插件指令：>物体范围动画 : 固定区域 : 关闭筛选器
 * 
 * 1.筛选器对应 固定区域核心 中的筛选器配置编号。
 *   开启指定的筛选器，后面的触发区域都会被筛选，留下符合条件的区域。
 * 2.比如，某种爆炸不能在冰面上点燃，配置一个过滤冰面的筛选器并开启，
 *   就可以使得接下来的触发都不会在冰面区域上起效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 上一次触发区域
 * 通过相关的插件支持，你可以使用上一次触发的区域：
 * （注意，冒号左右有空格）
 *
 * 插件指令：>物体范围动画 : 固定区域 : 上一次触发的 : 动画[81]
 * 
 * 插件指令：>物体范围动画 : 固定区域 : 上一次事件的 : 本事件 : 动画[81]
 * 插件指令：>物体范围动画 : 固定区域 : 上一次事件的 : 事件[10] : 动画[81]
 * 插件指令：>物体范围动画 : 固定区域 : 上一次事件的 : 事件变量[10] : 动画[81]
 * 
 * 1.上一次触发，是指 任意事件 的上一次。
 *   上一次事件，是指 指定事件 的上一次。
 * 2.该操作将对上一次触发的区域，再播放一次动画。
 * 3.注意，上一次的区域，是经过筛选器筛选后的剩余区域。
 * 
 * 插件指令：>物体范围动画 : 固定区域 : 读取区域 : 10 : 动画[81]
 *
 * 1.区域读取的是 固定区域&条件触发 的插件中保存的地图坐标。
 *
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
 * 工作类型：   短时间持续
 * 时间复杂度： o(n^2)*o(动画数量)*o(图片处理) 每帧
 * 测试方法：   批量播放菱形区域范围4的动画，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【317.01ms】
 *              100个事件的地图中，平均消耗为：【258.42ms】
 *               50个事件的地图中，平均消耗为：【220.96ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.播放并行动画的功能比较特殊，因为是基于自定义动画，并且批量
 *   同时播放，消耗量不言而喻。
 * 3.与激光区域不同，斩击动画、激光动画都没出现掉帧情况，但是运行时
 *   会卡一下。
 * 4.如果你觉得性能消耗太大承受不起，可以在释放点只播放一个动画，通
 *   过设计拼接，形成固定的技能动画。不过代价也比较大，由于单独动画
 *   极度缺乏灵活性，你只能一个技能一个动画。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了内部结构，并添加了上一次区域的使用。
 * [v1.2]
 * 分离了固定区域核心，并添加了筛选器功能。添加了插件性能测试说明。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ERA （Event_Range_Animation）
//		临时全局变量	DrillUp.g_ERA_xxx
//		临时局部变量	this._drill_ERA_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		短时间持续
//		★时间复杂度		o(n^2)*o(动画数量)*o(图片处理) 每帧
//		★性能测试因素	125个事件 菱形区域攻击
//		★性能测试消耗	258.42ms
//		★最坏情况		大量事件释放大量动画技能。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			固定区域：
//				->六种形状区域
//				->自定义区域
//				->播放动画
//				->筛选器
//				->记录区域
//
//		★必要注意事项：
//			1.六种形状区域、自定义区域、筛选器 都来自于核心，并调用了其中的接口。
//
//		★其它说明细节：
//			1.触发可以是从一个点展开一个区域，但是，没有方向。
//			  如果已事件为基准的话，事件有方向，就可以规划了。（变量还是不要开太多，开太多会增加复杂度）
//			  （计算图块的坐标就非常绕，要注意）
//			2.要播放动画，必须先放置Sprite_Base，用于动画绑定。
//
//		★存在的问题：
//			暂无
//
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventRangeAnimation = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventRangeAnimation');

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFixedArea ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ERA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ERA_pluginCommand.call(this, command, args);
	if (command === ">物体范围动画") {
		/*-----------------形状区域------------------*/
		if(args.length == 8){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var anim = String(args[7]);
			var _x = -1;
			var _y = -1;
			
			if( unit == "玩家位置" ){
				_x = $gamePlayer._x;
				_y = $gamePlayer._y;
			}
			if( unit == "本事件" ){
				var e_id = this._eventId;
				var e = $gameMap.event( e_id );
				_x = e._x;
				_y = e._y;
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ERA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				_x = e._x;
				_y = e._y;
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ERA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				_x = e._x;
				_y = e._y;
			}
			if( unit.indexOf("位置[") != -1 ){
				unit = unit.replace("位置[","");
				unit = unit.replace("]","");
				var pos = unit.split(/[,，]/);
				if( pos.length >=2 ){
					_x = Number(pos[0]);
					_y = Number(pos[1]);
				}
			}
			if( unit.indexOf("位置变量[") != -1 ){
				unit = unit.replace("位置变量[","");
				unit = unit.replace("]","");
				var pos = unit.split(/[,，]/);
				if( pos.length >=2 ){
					_x = $gameVariables.value(Number(pos[0]));
					_y = $gameVariables.value(Number(pos[1]));
				}
			}
			
			if( type == "菱形区域" || type == "方形区域"  || type == "圆形区域"  || 
				type == "十字区域" || type == "横条区域"  || type == "竖条区域" ){
				var range = Number(temp3);
				anim = anim.replace("动画[","");
				anim = anim.replace("]","");
				var a_id = Number(anim);
				$gameMap.drill_ERA_triggerTypeArea( _x,_y,type,range,a_id );
			}
			
		}
		/*-----------------自定义区域------------------*/
		if(args.length == 8){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var anim = String(args[7]);
			
			if( unit == "本事件" ){
				var e_id = this._eventId;
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
			}
			
			if( type == "自定义区域"){
				var self_id = Number(temp3)-1;
				anim = anim.replace("动画[","");
				anim = anim.replace("]","");
				var a_id = Number(anim);
				$gameMap.drill_ERA_triggerSelfArea( e_id, self_id, a_id);
			}
			
		}
		/*-----------------筛选器------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var s_id = Number(args[5]);
			if( type == "固定区域" && type2 == "开启筛选器"){
				$gameSystem._drill_ERA_curCondition = DrillUp.g_COFA_condition_list[ s_id-1 ];
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var type2 = String(args[3]);
			if( type == "固定区域" && type2 == "关闭筛选器"){
				$gameSystem._drill_ERA_curCondition = {};
			}
		}
		
		/*-----------------上一次区域------------------*/
		if(args.length == 6 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var anim = String(args[5]);
			anim = anim.replace("动画[","");
			anim = anim.replace("]","");
			var a_id = Number(anim);
			if( type == "固定区域" && type2 == "上一次触发的" && Imported.Drill_EventRangeTrigger){	//【物体触发 - 固定区域 & 条件触发】
				var last_area = $gameSystem.drill_ERT_getLastArea() || [];
				//var point = $gameSystem.drill_ERT_getLastPoint();	//中心点暂时用不上
				$gameMap.drill_ERA_triggerArea( last_area, a_id );
			}
		}
		if(args.length == 8 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			
			var anim = String(args[7]);		//动画id
			anim = anim.replace("动画[","");
			anim = anim.replace("]","");
			var a_id = Number(anim);
			var e_id = -1;
			
			var unit = String(args[5]);		//事件id
			if( unit == "本事件" ){
				e_id = this._eventId;
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_id = Number(unit);
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_id = $gameVariables.value(Number(unit));
			}
			if( e_id == -1 ){
				e_id = Number(unit);
			}
			
			if( type == "固定区域" && type2 == "上一次事件的" && Imported.Drill_EventRangeTrigger){		//【物体触发 - 固定区域 & 条件触发】
				if( $gameMap.drill_ERA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				var area = e._ERT_area || [];
				$gameMap.drill_ERA_triggerArea( area, a_id );
			}
			if( type == "固定区域" && type2 == "读取区域" && Imported.Drill_EventRangeTrigger){			//【物体触发 - 固定区域 & 条件触发】
				var area = $gameSystem.drill_ERT_loadArea( Number(unit) ) || [];	//这个unit是区域容器的编号
				$gameMap.drill_ERA_triggerArea( area, a_id );
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ERA_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventRangeAnimation.js 物体触发 - 固定区域 & 播放并行动画】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ERA_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ERA_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ERA_sys_initialize.call(this);
	this.drill_ERA_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ERA_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ERA_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ERA_saveEnabled == true ){	
		$gameSystem.drill_ERA_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ERA_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_ERA_initSysData = function() {
	this.drill_ERA_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ERA_checkSysData = function() {
	this.drill_ERA_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ERA_initSysData_Private = function() {
	
	this._drill_ERA_curCondition = {};		//当前筛选器
};	
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ERA_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ERA_curCondition == undefined ){
		this.drill_ERA_initSysData();
	}
	
};


//=============================================================================
// * 范围动画
//=============================================================================
//==============================
// * 范围动画 - 固定区域（xy点、区域类型、区域范围、条件）
//==============================
Game_Map.prototype.drill_ERA_triggerTypeArea = function( _x, _y, type, range, a_id ) {
	if( _x == -1 || _y == -1 ){ return }
	var cal_area = this.drill_COFA_getShapePointsWithCondition( _x, _y, type, range, $gameSystem._drill_ERA_curCondition );	//获取固定形状区域
	this.drill_ERA_triggerArea( cal_area, a_id );
}
//==============================
// * 范围动画 - 自定义区域（事件id，中心区域，条件）
//==============================
Game_Map.prototype.drill_ERA_triggerSelfArea = function( e_id, self_id, a_id ) {
	var cal_area = this.drill_COFA_getCustomPointsByIdWithCondition( e_id, self_id, $gameSystem._drill_ERA_curCondition );	//获取自定义区域
	this.drill_ERA_triggerArea( cal_area, a_id );
}
//==============================
// * 范围动画 - 触发区域（实际区域[{x:21,y:31,block:true},{x:22,y:32,block:true}]，动画id，播放范围）
//==============================
Game_Map.prototype.drill_ERA_triggerArea = function( area, a_id ) {
	for (var j = 0; j < area.length ; j++) {    	//事件朝向与范围有关系
		var temp_point = area[j];
		this.drill_ERA_playAnimInPos(a_id, temp_point.x, temp_point.y);
	}
}



//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_ERA_m_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_ERA_m_initialize.call(this);
	this._drill_ERA_datas = [];
}
//==============================
// * 物体 - 播放动画
//==============================
Game_Map.prototype.drill_ERA_playAnimInPos = function( a_id, x, y ) {
	this._drill_ERA_datas.push( {"a_id":a_id, "x":x, "y":y } );
}
//==============================
// * 场景 - 初始化
//==============================
var _drill_ERA_s_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
	_drill_ERA_s_initialize.call(this);
	this._drill_ERA_animTank = [];
}

//==============================
// * 场景 - 地图ui层
//==============================
var _drill_ERA_s_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_drill_ERA_s_createSpriteset.call(this);	
	if (!this._drill_map_ui_board) {
		this._drill_map_ui_board = new Sprite();
		this.addChild(this._drill_map_ui_board);
	};
};
//==============================
// * 帧刷新
//==============================
var _drill_ERA_s_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
	_drill_ERA_s_updateScene.call(this);
	this.drill_ERA_updateAnimAdd();
	this.drill_ERA_updateAnimUpdate();
	this.drill_ERA_updateAnimRemove();
}
//==============================
// * 帧刷新 - 添加动画
//==============================
Scene_Map.prototype.drill_ERA_updateAnimAdd = function() {
	
	for(var i=$gameMap._drill_ERA_datas.length-1; i>= 0; i--){
		var data = $gameMap._drill_ERA_datas[i];
		var sprite = new Sprite_Base();
		sprite.origin_x = data.x;
		sprite.origin_y = data.y;
		this._drill_ERA_animTank.push(sprite);
		this._drill_map_ui_board.addChild(sprite);
		
		var animation = $dataAnimations[data.a_id];
		sprite.startAnimation(animation, false, 0);
	
		$gameMap._drill_ERA_datas.splice(i,1);
	}	
}
//==============================
// * 帧刷新 - 刷新动画位置
//==============================
Scene_Map.prototype.drill_ERA_updateAnimUpdate = function() {
	
	for(var i=0; i<this._drill_ERA_animTank.length; i++){
		var sprite = this._drill_ERA_animTank[i];
		sprite.x = $gameMap.tileWidth() * $gameMap.adjustX(sprite.origin_x) + $gameMap.tileWidth()/2 ;
		sprite.y = $gameMap.tileHeight() * $gameMap.adjustY(sprite.origin_y) + $gameMap.tileHeight()/2 ;
	}
	
}
//==============================
// * 帧刷新 - 去除动画
//==============================
Scene_Map.prototype.drill_ERA_updateAnimRemove = function() {
	for(var i=this._drill_ERA_animTank.length-1; i>=0; i--){
		var sprite = this._drill_ERA_animTank[i];
		if( !sprite.isAnimationPlaying() ){
			this._drill_map_ui_board.removeChild(sprite);
			this._drill_ERA_animTank.splice(i,1);
		}
	}
}

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventRangeAnimation = false;
		alert(
			"【Drill_EventRangeAnimation.js 物体触发 - 固定区域 & 播放并行动画】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"
		);
}




