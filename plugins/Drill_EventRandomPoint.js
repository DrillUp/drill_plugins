//=============================================================================
// Drill_EventRandomPoint.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        物体触发 - 固定区域 & 随机点
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventRandomPoint +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在指定的固定区域内，获取一个随机的坐标。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFixedArea     物体触发-固定区域核心
 *     需要该核心才能进行区域中的随机点选取。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 随机出生点：
 *   (1.随机出生点可以经过筛选器，只在可通行的空余空间出现。
 *      出生的事件也可以避开id小于它的事件，因为事件是根据id顺序建立的。
 *      但是事件重叠的可能性仍然存在。
 *   (2.如果设置了随机出生点，使用归位指令回到的是出生点。
 *   (3.注意，"使用筛选器"的注释，必须写在xx区域注释的前面。
 * 获取随机坐标：
 *   (1.如果指令没有获取到符合条件的坐标，则变量会被赋值为（-1,-1）。
 * 其它随机：
 *   (1.事件朝向的随机，可见 物体-事件转向 插件。
 *   (2.事件初始帧的随机，可见 行走图-多帧行走图 插件。
 * 设计：
 *   (1.许多技能的释放、道具的掉落，都需要提前规划好随机点，然后逐步
 *      执行。你可以先用该插件并设置筛选器，并选择随机一块合适的落脚
 *      点范围，再进行随机，这样能有效防止物品误飞到不可通行区域。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 随机出生点
 * 你可以指定某个事件，载入地图时，出现在原位置范围内的随机区域：
 * 
 * 事件注释：=>随机出生点 : 菱形区域 : 1
 * 事件注释：=>随机出生点 : 方形区域 : 1
 * 事件注释：=>随机出生点 : 圆形区域 : 1
 * 事件注释：=>随机出生点 : 十字区域 : 1
 * 事件注释：=>随机出生点 : 横条区域 : 1
 * 事件注释：=>随机出生点 : 竖条区域 : 1
 * 事件注释：=>随机出生点 : 自定义区域 : 1
 * 
 * 1.数字表示区域的范围，0表示只有出生点自己。
 *   再比如，"方形区域 : 1"表示事件的位置以及周围8个图块的区域。
 * 2.注意，此注释必须写在事件页第一页才能生效。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定随机种子
 * 你可以指定某个事件，载入地图时，出现在原位置范围内的随机区域：
 * 
 * 事件注释：=>随机出生点 : 固定随机种子
 * 
 * 1.默认情况下，如果玩家离开重进地图，那么出生点会再次随机。
 *   "固定随机种子"可以使得玩家重进地图时，帧数不再随机变化，而是固定的随机值。
 * 2.注意，此注释必须写在事件页第一页才能生效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 出生点筛选器
 * 上述的区域，有可能需要再经过一次额外的筛选，来满足复杂地形的条件：
 * 
 * 插件指令：=>随机出生点 : 使用筛选器 : 1
 * 
 * 1.筛选器对应 固定区域核心 中的筛选器配置编号。
 *   开启指定的筛选器，后面的区域会被筛选，留下符合条件的区域。
 * 2.你可以经过筛选，使得事件只出生在 可通行 的区域点。
 * 3.注意，"使用筛选器"的注释，必须写在上述区域注释的前面。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 获取随机坐标
 * 要设置更多的独立开关，直接在指定页添加下面的注释即可：
 * （注意，只有冒号左右有空格，其余地方都不能有空格）
 *
 * 插件指令：>获取随机坐标 : 玩家位置 : 菱形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 本事件 : 菱形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 事件[10] : 菱形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 事件变量[10] : 菱形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 位置[10,10] : 菱形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 位置变量[10,10] : 菱形区域 : 1 : 变量[25,26]
 * 
 * 插件指令：>获取随机坐标 : 本事件 : 菱形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 本事件 : 方形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 本事件 : 圆形区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 本事件 : 十字区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 本事件 : 横条区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 本事件 : 竖条区域 : 1 : 变量[25,26]
 * 
 * 1.六种形状的区域不需要方向，所以只要找到一个点即可展开面积并触发。
 *   区域后面的数字表示范围，0表示只有坐标点自己。
 *   再比如，"方形区域 : 1"表示事件的位置以及周围8个图块的区域。
 *   玩家自己不是事件，也没有独立开关，所以这里特别标注为"玩家位置"。
 * 2.前半部分（本事件）和后半部分（xx区域）的参数可以随意组合。
 *   一共有6*6种组合方式。
 * 3."变量[25,26]"将会被赋值找到的随机坐标xy值。
 *   如果插件指令没有获取到符合条件的坐标，则变量会被赋值为（-1,-1）。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自定义区域
 * 你可以通过插件指令设置主动触发的自定义区域：
 * （注意，冒号左右有空格）
 *
 * 插件指令：>获取随机坐标 : 本事件 : 自定义区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 事件[10] : 自定义区域 : 1 : 变量[25,26]
 * 插件指令：>获取随机坐标 : 事件变量[10] : 自定义区域 : 1 : 变量[25,26]
 *
 * 1.自定义区域只对事件有效，如果是玩家，可以建立一个时刻跟随的玩家事件。
 * 2.区域后面的数字，对应 区域核心配置 的自定义区域编号。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 筛选器
 * 上述的区域，有可能需要再经过一次额外的筛选，来满足复杂地形的条件：
 * 
 * 插件指令：>获取随机坐标 : 固定区域 : 开启筛选器 : 1
 * 插件指令：>获取随机坐标 : 固定区域 : 关闭筛选器
 * 
 * 1.筛选器对应 固定区域核心 中的筛选器配置编号。
 *   开启指定的筛选器，后面的触发区域都会被筛选，留下符合条件的区域。
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
 * 时间复杂度： o(n^3)
 * 测试方法：   在不同地图开启筛选器选择多个随机点，测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【7.16ms】
 *              100个事件的地图中，平均消耗为：【6.25ms】
 *               50个事件的地图中，平均消耗为：【5.34ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行几乎没有消耗，并且单次触发的消耗不大，但是播放的动画消耗
 *   非常大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 固定随机种子 功能。
 * [v1.2]
 * 修复了切换事件页后，固定随机种子 不固定的bug。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ERP （Event_Random_Point）
//		临时全局变量	DrillUp.g_ERP_xxx
//		临时局部变量	this._drill_ERP_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^3) 
//		★性能测试因素	125个事件
//		★性能测试消耗	6.25ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			位置与位移：
//				->载入地图时处在随机出生点
//				->获取随机坐标
//				->不重复的随机坐标	x
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.获取随机点的原理只有3行代码，其它全是调用接口、指令格式。
//
//		★存在的问题：
//			暂无
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventRandomPoint = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventRandomPoint');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFixedArea ){
	

//=============================================================================
// ** 随机出生点
//=============================================================================
//==============================
// * 事件初始化
//==============================
var _drill_ERP_event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	this._drill_ERP_isInInit = true;
	_drill_ERP_event_initialize.call(this, mapId, eventId);
};
//==============================
// * 注释初始化
//==============================
var _drill_ERP_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ERP_event_setupPage.call(this);
	this.drill_ERP_setupPage();
};
Game_Event.prototype.drill_ERP_setupPage = function() {
	if( this._drill_ERP_isInInit != true ){ return; } 	//（进入地图后只执行一次）
	this._drill_ERP_isInInit = false;
	var cur_condition = {};				//筛选器
	
	if( this.event().pages[0] ){		//（强制读取第一页）
		var li = this.event().pages[0].list;
		var seed_lock = false;
		for(var k=0; k < li.length; k++){
			var l = li[k];
			if( l.code !== 108 ){ continue }
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>随机出生点" ){	//=>随机出生点 : 固定随机种子
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "固定随机种子" ){
						seed_lock = true;
						break;
					}
				}
			}
		}
		for(var k=0; k < li.length; k++){
			var l = li[k];
			if( l.code !== 108 ){ continue }
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>随机出生点" ){
				
				if( args.length == 4 ){		//=>随机出生点 : 使用筛选器 : 1
					var type = String(args[1]);
					var temp1 = Number(args[3]);
					if( type == "使用筛选器" ){
						cur_condition = DrillUp.g_COFA_condition_list[ temp1-1 ];
					}
				}
				
				var c_area = null;
				if( args.length == 4 ){		//=>随机出生点 : 菱形区域 : 1
					var type = String(args[1]);
					var temp1 = Number(args[3]);
					if( type == "菱形区域" || type == "方形区域"  || type == "圆形区域"  || 
						type == "十字区域" || type == "横条区域"  || type == "竖条区域" ){
						var range = Number(temp1);
						c_area = $gameMap.drill_COFA_getShapePointsWithCondition( this._x,this._y,type,range, cur_condition );
					}
					if( type == "自定义区域" ){
						var a_id = Number(temp1);
						c_area = $gameMap.drill_COFA_getCustomPointsByIdWithCondition( this._eventId, a_id, cur_condition );
					}
					
					if( c_area != null ){		//从符合条件的点集合中，随机选出一个点并放置
						if( c_area.length == 0 ){ c_area.push({'x':this.x,'y':this.y }) }
						
						var ran = 0;
						if( seed_lock == false ){
							
							// > 位置设置
							ran = Math.floor( Math.random()*c_area.length );
						}else{
							
							// > 随机种子（与 地图id、事件id 相关，与事件页无关）
							var seed = this._mapId * this._eventId + this._eventId * this._eventId +101;
							var random_num = this.drill_ERP_getRandomInSeed( seed );
							
							// > 位置设置
							ran = Math.floor( random_num*c_area.length );
						}
						var p = c_area[ ran ];
						
						this.locate(p.x,p.y);
						this.event().x = p.x;
						this.event().y = p.y;
					}
				}
			};
		}
	}
};
//==============================
// * 数学 - 生成随机数（随机种子）
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
Game_Event.prototype.drill_ERP_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};
	
//=============================================================================
// * 获取随机坐标
//=============================================================================
var _drill_ERP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ERP_pluginCommand.call(this, command, args);
	if( command === ">获取随机坐标" ){
		
		/*-----------------形状区域------------------*/
		if(args.length == 8){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var temp4 = String(args[7]);
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
				if( $gameMap.drill_ERP_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				_x = e._x;
				_y = e._y;
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ERP_isEventExist( e_id ) == false ){ return; }
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
				var c_area = $gameMap.drill_COFA_getShapePointsWithCondition( _x,_y,type,range, $gameSystem._drill_ERP_cur_condition );
				if( c_area.length == 0 ){ c_area.push({'x':_x,'y':_y }) }
				var p = c_area[ Math.floor( Math.random()*c_area.length ) ]
				if( temp4.indexOf("变量[") != -1 ){
					temp4 = temp4.replace("变量[","");
					temp4 = temp4.replace("]","");
					var v = temp4.split(/[,，]/);
					if( v.length >=2 ){
						$gameVariables.setValue( Number(v[0]),p.x );
						$gameVariables.setValue( Number(v[1]),p.y );
					}
				}
			}
			
		}
		/*-----------------自定义区域------------------*/
		if(args.length == 8){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var temp4 = String(args[7]);
			
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
			
			if( e_id && type == "自定义区域"){
				var self_id = Number(temp3)-1;
				c_area = $gameMap.drill_COFA_getCustomPointsByIdWithCondition( e_id, self_id, $gameSystem._drill_ERP_cur_condition );
				if( c_area.length == 0 ){ c_area.push({'x':_x,'y':_y }) }
				var p = c_area[ Math.floor( Math.random()*c_area.length ) ]
				if( temp4.indexOf("变量[") != -1 ){
					temp4 = temp4.replace("变量[","");
					temp4 = temp4.replace("]","");
					var v = temp4.split(/[,，]/);
					if( v.length >=2 ){
						$gameVariables.setValue( Number(v[0]),p.x );
						$gameVariables.setValue( Number(v[1]),p.y );
					}
				}
			}
		}
		
		/*-----------------筛选器------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var s_id = Number(args[5]);
			if( type == "固定区域" && type2 == "开启筛选器"){
				$gameSystem._drill_ERP_cur_condition = DrillUp.g_COFA_condition_list[ s_id-1 ];
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var type2 = String(args[3]);
			if( type == "固定区域" && type2 == "关闭筛选器"){
				$gameSystem._drill_ERP_cur_condition = {};
			}
		}
	
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ERP_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventRandomPoint.js 物体触发 - 固定区域 & 随机点】\n" +
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
DrillUp.g_ERP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ERP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ERP_sys_initialize.call(this);
	this.drill_ERP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ERP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ERP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ERP_saveEnabled == true ){	
		$gameSystem.drill_ERP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ERP_initSysData();
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
Game_System.prototype.drill_ERP_initSysData = function() {
	this.drill_ERP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ERP_checkSysData = function() {
	this.drill_ERP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ERP_initSysData_Private = function() {
	
	this._drill_ERP_cur_condition = {};		//当前筛选器
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ERP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ERP_cur_condition == undefined ){
		this.drill_ERP_initSysData();
	}
	
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventRandomPoint = false;
		alert(
			"【Drill_EventRandomPoint.js 物体触发 - 固定区域 & 随机点】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"
		);
}

