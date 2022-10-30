//=============================================================================
// Drill_EventPosition.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        物体 - 位置与位移
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventPosition +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以通过插件指令快速批量操作事件的位置、计算距离，以及获取事件id。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   位移只作用于事件，计算距离可以作用于玩家、事件、位置。
 * 2.该插件的大部分功能都可以用纯事件指令做，插件指令只是相对更方便一些。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 立即归位：
 *   (1.对于复制产生的事件，立即归位的位置为它产生的位置。
 *   (2.如果添加了随机出生点指令，则以出生点的位置为准。
 * 移动到：
 *   (1.这里所有的移动，都是瞬间移动到指定位置。
 *      并且无视任何条件，直接指定坐标放置。
 *   (2.事件与事件可以交换位置，事件指令本身就有。
 *   (3.玩家瞬间移动后，队伍成员也会集合在目标位置。
 * 计算距离：
 *   (1.循环地图中，计算的距离为循环两点的最短距离。
 *   (2.距离的结果为浮点数四舍五入值，
 *      比如事件行走在两个图块间，得出的距离为5.67个图块，则按6个图块算。
 * 获取事件ID：
 *   (1.你可以通过插件指令，获取到一个点的事件id。
 *      如果事件重叠在一起，只能获取到第一个，如果没有事件，则赋值-1。
 *      另外，玩家不属于事件，不过会被赋值-2。
 *   (2.如果你想获取自定义区域内的事件，需要设置"只事件的筛选器"并使用
 *      获取随机坐标指令，不过只能获取到一个，局限性比较大。
 * 设计：
 *   (1.你可以使用 立即归位 指令，将所有事件立即归位。常用于重置关卡。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 立即归位：
 * 实现快速位移，可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>位置与位移 : 本事件 : 立即归位
 * 插件指令：>位置与位移 : 全图事件 : 立即归位
 * 插件指令：>位置与位移 : 事件[10] : 立即归位
 * 插件指令：>位置与位移 : 事件变量[21] : 立即归位
 * 插件指令：>位置与位移 : 批量事件[10,11] : 立即归位
 * 插件指令：>位置与位移 : 批量事件变量[21,22] : 立即归位
 * 
 * 插件指令：>位置与位移 : 事件[10] : 立即归位
 * 插件指令：>位置与位移 : 事件[10] : 立即归位包括朝向
 * 
 * 1.前面部分（本事件）和后面设置（立即归位）可以随意组合。
 *   一共有6*2种组合方式。
 * 2."立即归位"表示地图载入时，事件回到最初位置。
 *   对于复制产生的事件，立即归位的位置为它产生的位置。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>位置与位移 : 指定事件 : 10 : 立即归位
 * 插件指令(旧)：>位置与位移 : 指定事件 : 10,21,32 : 立即归位
 * 插件指令(旧)：>位置与位移 : 指定事件(变量) : 22 : 立即归位
 * 插件指令(旧)：>位置与位移 : 指定事件(变量) : 22,23,24 : 立即归位
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 移动到：
 * 实现快速位移，可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>位置与位移 : 玩家 : 移动到 : 位置[3,3]
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 位置[3,3]
 * 插件指令：>位置与位移 : 事件[10] : 移动到 : 位置[3,3]
 * 插件指令：>位置与位移 : 事件变量[21] : 移动到 : 位置[3,3]
 * 插件指令：>位置与位移 : 批量事件[10,11] : 移动到 : 位置[3,3]
 * 插件指令：>位置与位移 : 批量事件变量[21,22] : 移动到 : 位置[3,3]
 * 
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 位置[3,3]
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 位置变量[25,26]
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 相对坐标[0,1]
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 相对坐标变量[0,1]
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 相对朝向坐标[0,1]
 * 插件指令：>位置与位移 : 本事件 : 移动到 : 相对朝向坐标变量[0,1]
 *
 * 1.前面部分（本事件）和后面设置（位置[3,3]）可以随意组合。
 *   一共有6*6种组合方式。
 * 2."位置"即当前地图的坐标。
 *   "相对坐标"为以事件为准的偏移坐标，x正右负左，y正下负上。
 * 3."相对朝向坐标"表示以当前事件的朝向为准，
 *   0,1为前进 0,-1为后退 1,0为右手边位移 -1,0为左手边位移
 *   位移不改变事件的朝向。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>位置与位移 : 本事件 : 移动到绝对位置 : 3 : 3
 * 插件指令(旧)：>位置与位移 : 指定事件 : 10 : 移动到绝对位置 : 3 : 3
 * 插件指令(旧)：>位置与位移 : 指定事件 : 10 : 移动到朝向的相对位置 : 3 : 3
 * 插件指令(旧)：>位置与位移 : 指定事件 : 10,21 : 移动到相对位置 : 3 : 3
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 计算距离：
 * 你可以快速计算两个点之间的距离，使用下面插件指令：
 * 
 * 插件指令：>位置与位移 : 变量[21] : 计算距离 : 事件[10] : 玩家
 * 插件指令：>位置与位移 : 变量[21] : 计算距离 : 事件[10] : 本事件
 * 插件指令：>位置与位移 : 变量[21] : 计算距离 : 事件[10] : 位置[20,10]
 * 插件指令：>位置与位移 : 变量[21] : 计算距离 : 事件[10] : 位置变量[20,10]
 * 插件指令：>位置与位移 : 变量[21] : 计算距离 : 事件[10] : 事件[12]
 * 插件指令：>位置与位移 : 变量[21] : 计算距离 : 事件[10] : 事件变量[12]
 * 
 * 1."变量[21]"将会存放算出的距离结果。
 *   后面两个参数 "事件[10]"和"玩家" 可以随意对调。
 *   一共有7*7种组合方式。
 * 2.计算的距离为 x轴距离与y轴距离之和。
 *   比如"计算距离 : 位置[11,12] : 位置[10,10]"算出来的距离为3。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取值：
 * 你可以获取使用下面插件指令获取数据：
 * 
 * 插件指令：>位置与位移 : 变量[21] : 获取指定位置的事件ID : 位置[10,10]
 * 插件指令：>位置与位移 : 变量[21] : 获取指定位置的事件ID : 位置变量[25,26]
 * 插件指令：>位置与位移 : 变量[25,26] : 获取玩家的位置值
 * 插件指令：>位置与位移 : 变量[25,26] : 获取指定事件的位置值 : 本事件
 * 插件指令：>位置与位移 : 变量[25,26] : 获取指定事件的位置值 : 事件[10]
 * 插件指令：>位置与位移 : 变量[25,26] : 获取指定事件的位置值 : 事件变量[21]
 * 
 * 1.如果指定位置有多个事件重叠在一起，那么只能获取到第一个事件ID，
 *   如果指定位置没有事件，则赋值-1，如果是玩家，会被赋值-2。
 * 2.注意，如果你有更多关于位置的操作的需求，
 *   可以去看看插件： 物体-位置存储器
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
 * 时间复杂度： o(n^2)
 * 测试方法：   在大部分管理层中，对大量事件使用归位指令。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件为单次执行，性能几乎可以忽略。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令快速计算距离、获取事件id功能。
 * [v1.2]
 * 添加了玩家移动到相对位置的功能。
 * [v1.3]
 * 完善了部分插件指令的参数。
 * [v1.4]
 * 添加了全图事件的功能。
 * [v1.5]
 * 添加了玩家位置获取。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		EPo (Event_Position)
//		临时全局变量	无
//		临时局部变量	this._drill_EPo_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	地理管理层、炸弹管理层石头归位、华容道归位
//		★性能测试消耗	未找到
//		★最坏情况		无	
//		★备注			目前性能列表中，没找到该插件的消耗。（又找了一遍，太小了，找不到）
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			位置与位移：
//				->迅速归位
//				->朝向移动
//				->移动到相对/绝对位置
//				->计算距离
//				->获取事件id
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.只是简单调用已经提供好了的事件的方法。
//			  实现快速批量操作。
//			2.不用担心相对位移结果超出了地图时的问题，实测发现函数自动round了。
//			3.每次遇到东南西北与上下左右转换的时候，就头晕。
//			4.需要注意，每次获取事件时，都会包括 _erased 的事件，需要手动排除掉。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventPosition = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventPosition');
	
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EPo_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EPo_pluginCommand.call(this, command, args);
	if( command === ">位置与位移" ){
		
		/*-----------------立即归位------------------*/
		if( args.length == 4 ){				//>位置与位移 : 本事件 : 立即归位
			var unit = String(args[1]);
			var type = String(args[3]);
			var e_ids = null;
			
			if( e_ids == null && unit == "本事件" ){
				e_ids = [ this._eventId ];
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
			if( e_ids == null && unit == "全图事件" ){
				var all_e = $gameMap._events;
				e_ids = [];
				for( var i=0; i < all_e.length; i++ ){
					if( !all_e[i] ){ continue; }
					e_ids.push( all_e[i]._eventId );
				}
			}
			
			if( e_ids && type == "立即归位" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if(!e ){ continue; }
					var data = e.event();		//当前事件的初始化数据
					e.locate(data.x, data.y);
				}
			}
			if( e_ids && type == "立即归位包括朝向" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if(!e ){ continue; }
					var data = e.event();
					e.locate(data.x, data.y);
					e.setDirection(e.page().image.direction);
				}
			}
		}
		/*-----------------立即归位（旧指令）------------------*/
		if( args.length == 6 ){				//（旧指令）>位置与位移 : 指定事件 : 10,21,32 : 立即归位
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var type = String(args[5]);
			if( temp1 == "指定事件" ){
				if(type == "立即归位" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = Number(e_list[i]);
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						var data = e.event();
						e.locate(data.x, data.y);
					}
				}
				if(type == "立即归位包括朝向" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = Number(e_list[i]);
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						var data = e.event();
						e.locate(data.x, data.y);
						e.setDirection(e.page().image.direction);
					}
				}
			}
			if( temp1 == "指定事件(变量)" ){
				if(type == "立即归位" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = $gameVariables.value( Number(e_list[i]) );
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						var data = e.event();
						e.locate(data.x, data.y);
					}
				}
				if(type == "立即归位包括朝向" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = $gameVariables.value( Number(e_list[i]) );
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						var data = e.event();
						if( e == undefined ){ return; }
						e.locate(data.x, data.y);
						e.setDirection(e.page().image.direction);
					}
				}
			}
		}
		
		/*-----------------移动到------------------*/
		if( args.length == 6 ){				//>位置与位移 : 玩家 : 移动到 : 位置[3,3]
			var unit = String(args[1]);
			var type = String(args[3]);
			var pos = String(args[5]);
			var e_ids = null;
			var e_pos = null;
			if( type == "移动到" && unit != "玩家" ){
				if( unit == "本事件" ){
					e_ids = [ this._eventId ];
				}
				if( unit.indexOf("批量事件变量[") != -1 ){
					unit = unit.replace("批量事件变量[","");
					unit = unit.replace("]","");
					e_ids = [];
					var temp_arr = unit.split(/[,，]/);
					for( var k=0; k < temp_arr.length; k++ ){
						e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
					}
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
				
				
				if( pos.indexOf("位置变量[") != -1 ){
					pos = pos.replace("位置变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
								  
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.locate( e_pos[0], e_pos[1] );
						}
					}
				}
				if( pos.indexOf("相对朝向坐标变量[") != -1 ){
					pos = pos.replace("相对朝向坐标变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							if (e.direction() === 2) {		//下
								e.locate(e.x + e_pos[0], e.y + e_pos[1]);
							} else if (e.direction() === 4) {	//左
								e.locate(e.x - e_pos[1], e.y + e_pos[0]);
							} else if (e.direction() === 6) {	//右
								e.locate(e.x + e_pos[1], e.y - e_pos[0]);
							} else if (e.direction() === 8) {	//上
								e.locate(e.x - e_pos[0], e.y - e_pos[1]);
							}
						}
					}
				}
				if( pos.indexOf("相对坐标变量[") != -1 ){
					pos = pos.replace("相对坐标变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.locate(e.x + e_pos[0], e.y + e_pos[1]);
						}
					}
				}
				if( pos.indexOf("位置[") != -1 ){
					pos = pos.replace("位置[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.locate( e_pos[0], e_pos[1] );
						}
					}
				}
				if( pos.indexOf("相对朝向坐标[") != -1 ){
					pos = pos.replace("相对朝向坐标[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							if (e.direction() === 2) {		//下
								e.locate(e.x + e_pos[0], e.y + e_pos[1]);
							} else if (e.direction() === 4) {	//左
								e.locate(e.x - e_pos[1], e.y + e_pos[0]);
							} else if (e.direction() === 6) {	//右
								e.locate(e.x + e_pos[1], e.y - e_pos[0]);
							} else if (e.direction() === 8) {	//上
								e.locate(e.x - e_pos[0], e.y - e_pos[1]);
							}
						}
					}
				}
				if( pos.indexOf("相对坐标[") != -1 ){
					pos = pos.replace("相对坐标[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.locate(e.x + e_pos[0], e.y + e_pos[1]);
						}
					}
				}
			}
			if( type == "移动到" && unit == "玩家" ){
				
				if( pos.indexOf("位置变量[") != -1 ){
					pos = pos.replace("位置变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var p_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
								  
						$gamePlayer.drill_EPo_locate( p_pos[0], p_pos[1] );
					}
				}
				if( pos.indexOf("位置[") != -1 ){
					pos = pos.replace("位置[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var p_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						$gamePlayer.drill_EPo_locate( p_pos[0], p_pos[1] );
					}
				}
				if( pos.indexOf("相对朝向坐标[") != -1 ){
					pos = pos.replace("相对朝向坐标[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var p_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						if ($gamePlayer.direction() === 2) {		//下
							$gamePlayer.locate($gamePlayer.x + p_pos[0], $gamePlayer.y + p_pos[1]);
						} else if ($gamePlayer.direction() === 4) {	//左
							$gamePlayer.locate($gamePlayer.x - p_pos[1], $gamePlayer.y + p_pos[0]);
						} else if ($gamePlayer.direction() === 6) {	//右
							$gamePlayer.locate($gamePlayer.x + p_pos[1], $gamePlayer.y - p_pos[0]);
						} else if ($gamePlayer.direction() === 8) {	//上
							$gamePlayer.locate($gamePlayer.x - p_pos[0], $gamePlayer.y - p_pos[1]);
						}
					}
				}
				if( pos.indexOf("相对坐标[") != -1 ){
					pos = pos.replace("相对坐标[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var p_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						$gamePlayer.locate($gamePlayer.x + p_pos[0], $gamePlayer.y + p_pos[1]);
					}
				}
			}
		}
		/*-----------------移动到（旧指令）------------------*/
		if( args.length == 8 ){				//（旧指令）>位置与位移 : 本事件 : 移动到相对位置 : 3 : 3
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = parseInt(args[5]);
			var temp3 = parseInt(args[7]);
			if( temp1 == "本事件" ){
				if(type == "移动到绝对位置" ){
					var e = $gameMap.event(this._eventId);
					e.locate( temp2, temp3 );
				}
				if(type == "移动到相对位置" ){
					var e = $gameMap.event(this._eventId);
					e.locate(e.x + temp2, e.y + temp3);
				}
				if(type == "移动到朝向的相对位置" ){
					var e = $gameMap.event(this._eventId);
					if (e.direction() === 2) {		//下
						e.locate(e.x + temp2, e.y + temp3);
					} else if (e.direction() === 4) {	//左
						e.locate(e.x - temp3, e.y + temp2);
					} else if (e.direction() === 6) {	//右
						e.locate(e.x + temp3, e.y - temp2);
					} else if (e.direction() === 8) {	//上
						e.locate(e.x - temp2, e.y - temp3);
					}
				}
			}
			if( temp1 == "玩家" ){
				if(type == "移动到绝对位置" ){
					$gamePlayer.drill_EPo_locate( temp2, temp3 );
				}
				if(type == "移动到相对位置" ){
					$gamePlayer.drill_EPo_locate( $gamePlayer.x + temp2, $gamePlayer.y + temp3 );
				}
				if(type == "移动到朝向的相对位置" ){
					if ($gamePlayer.direction() === 2) {		//下
						$gamePlayer.drill_EPo_locate($gamePlayer.x + temp2, $gamePlayer.y + temp3);
					} else if ($gamePlayer.direction() === 4) {	//左
						$gamePlayer.drill_EPo_locate($gamePlayer.x - temp3, $gamePlayer.y + temp2);
					} else if ($gamePlayer.direction() === 6) {	//右
						$gamePlayer.drill_EPo_locate($gamePlayer.x + temp3, $gamePlayer.y - temp2);
					} else if ($gamePlayer.direction() === 8) {	//上
						$gamePlayer.drill_EPo_locate($gamePlayer.x - temp2, $gamePlayer.y - temp3);
					}
				}
			}
		}
		if( args.length == 10 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var type = String(args[5]);
			var temp4 = parseInt(args[7]);
			var temp5 = parseInt(args[9]);
			if( temp1 == "指定事件" ){
				if(type == "移动到绝对位置" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = Number(e_list[i]);
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						e.locate( temp4, temp5 );
					}
				}
				if(type == "移动到相对位置" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = Number(e_list[i]);
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						e.locate( e.x + temp4, e.y + temp5);
					}
				}
				if(type == "移动到朝向的相对位置" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = Number(e_list[i]);
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						if (e.direction() === 2) {		//下
							e.locate(e.x + temp4, e.y + temp5);
						} else if (e.direction() === 4) {	//左
							e.locate(e.x - temp5, e.y + temp4);
						} else if (e.direction() === 6) {	//右
							e.locate(e.x + temp5, e.y - temp4);
						} else if (e.direction() === 8) {	//上
							e.locate(e.x - temp4, e.y - temp5);
						}
					}
				}
			}
			if( temp1 == "指定事件(变量)" ){
				if(type == "移动到绝对位置" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = $gameVariables.value( Number(e_list[i]) );
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						e.locate( temp4, temp5 );
					}
				}
				if(type == "移动到相对位置" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = $gameVariables.value( Number(e_list[i]) );
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						e.locate( e.x + temp4, e.y + temp5);
					}
				}
				if(type == "移动到朝向的相对位置" ){
					var e_list = temp2.split(/[,，]/);
					for(var i=0; i < e_list.length; i++){
						var e_id = $gameVariables.value( Number(e_list[i]) );
						if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event(e_id);
						if( e == undefined ){ return; }
						if (e.direction() === 2) {		//下
							e.locate(e.x + temp4, e.y + temp5);
						} else if (e.direction() === 4) {	//左
							e.locate(e.x - temp5, e.y + temp4);
						} else if (e.direction() === 6) {	//右
							e.locate(e.x + temp5, e.y - temp4);
						} else if (e.direction() === 8) {	//上
							e.locate(e.x - temp4, e.y - temp5);
						}
					}
				}
			}
		}
		
		/*-----------------计算距离------------------*/
		if( args.length == 8 ){				//>位置与位移 : 21 : 计算距离 : 事件[10] : 玩家
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "计算距离"){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				
				// > 计算距离 - A对象
				if( temp2 == "玩家" ){
					var x1 = $gamePlayer._realX;
					var y1 = $gamePlayer._realY;
				}
				if( temp2 == "本事件" ){
					var e_id = this._eventId;
					var x1 = $gameMap.event(e_id)._realX;
					var y1 = $gameMap.event(e_id)._realY;
				}
				if( temp2.indexOf("事件[") != -1 ){
					temp2 = temp2.replace("事件[","");
					temp2 = temp2.replace("]","");
					var e_id = Number(temp2);
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ return; }
					var x1 = $gameMap.event(e_id)._realX;
					var y1 = $gameMap.event(e_id)._realY;
				}
				if( temp2.indexOf("事件变量[") != -1 ){
					temp2 = temp2.replace("事件变量[","");
					temp2 = temp2.replace("]","");
					var e_id = $gameVariables.value(Number(temp2));
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ return; }
					var x1 = $gameMap.event(e_id)._realX;
					var y1 = $gameMap.event(e_id)._realY;
				}
				if( temp2.indexOf("位置[") != -1 ){
					temp2 = temp2.replace("位置[","");
					temp2 = temp2.replace("]","");
					var pos = temp2.split(/[,，]/);
					if( pos.length >=2 ){
						x1 = Number(pos[0]);
						y1 = Number(pos[1]);
					}
				}
				if( temp2.indexOf("位置变量[") != -1 ){
					temp2 = temp2.replace("位置变量[","");
					temp2 = temp2.replace("]","");
					var pos = temp2.split(/[,，]/);
					if( pos.length >=2 ){
						x1 = $gameVariables.value(Number(pos[0]));
						y1 = $gameVariables.value(Number(pos[1]));
					}
				}
				
				// > 计算距离 - B对象
				if( temp3 == "玩家" ){
					var x2 = $gamePlayer._realX;
					var y2 = $gamePlayer._realY;
				}
				if( temp3 == "本事件" ){
					var e_id = this._eventId;
					var x2 = $gameMap.event(e_id)._realX;
					var y2 = $gameMap.event(e_id)._realY;
				}
				if( temp3.indexOf("事件[") != -1 ){
					temp3 = temp3.replace("事件[","");
					temp3 = temp3.replace("]","");
					var e_id = Number(temp3);
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ return; }
					var x2 = $gameMap.event(e_id)._realX;
					var y2 = $gameMap.event(e_id)._realY;
				}
				if( temp3.indexOf("事件变量[") != -1 ){
					temp3 = temp3.replace("事件变量[","");
					temp3 = temp3.replace("]","");
					var e_id = $gameVariables.value(Number(temp3));
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ return; }
					var x2 = $gameMap.event(e_id)._realX;
					var y2 = $gameMap.event(e_id)._realY;
				}
				if( temp3.indexOf("位置[") != -1 ){
					temp3 = temp3.replace("位置[","");
					temp3 = temp3.replace("]","");
					var pos = temp3.split(/[,，]/);
					if( pos.length >=2 ){
						x2 = Number(pos[0]);
						y2 = Number(pos[1]);
					}
				}
				if( temp3.indexOf("位置变量[") != -1 ){
					temp3 = temp3.replace("位置变量[","");
					temp3 = temp3.replace("]","");
					var pos = temp3.split(/[,，]/);
					if( pos.length >=2 ){
						x2 = $gameVariables.value(Number(pos[0]));
						y2 = $gameVariables.value(Number(pos[1]));
					}
				}
				
				// > 计算距离 - AB对象计算
				if( x1 != undefined && x2 != undefined &&
				    y1 != undefined && y2 != undefined ){
					$gameVariables.setValue( Number(temp1) , Math.round( $gameMap.distance(x1, y1, x2, y2) ) );
				}
			}
		}
		
		/*-----------------获取值------------------*/
		if( args.length == 6 ){				//>位置与位移 : 变量[21] : 获取指定位置的事件ID : 位置变量[25,26]
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "获取事件id" || type == "获取指定位置的事件ID" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( temp2.indexOf("位置[") != -1 ){
					temp2 = temp2.replace("位置[","");
					temp2 = temp2.replace("]","");
					var pos = temp2.split(/[,，]/);
					if( pos.length >=2 ){
						x1 = Number(pos[0]);
						y1 = Number(pos[1]);
					}
				}
				if( temp2.indexOf("位置变量[") != -1 ){
					temp2 = temp2.replace("位置变量[","");
					temp2 = temp2.replace("]","");
					var pos = temp2.split(/[,，]/);
					if( pos.length >=2 ){
						x1 = $gameVariables.value(Number(pos[0]));
						y1 = $gameVariables.value(Number(pos[1]));
					}
				}
				
				if( x1 != undefined && y1 != undefined ){
					var e_id = -1;
					var events = $gameMap.eventsXy(x1,y1);
					if( events.length != 0 ){
						var e = events[0];
						if( e._erased == true ){	//移除的事件不算
							e_id = -1;
						}else{
							e_id = e.eventId()
						}
					}
					if( e_id == -1 && x1 == $gamePlayer._x && y1 == $gamePlayer._y ){
						e_id = -2;
					}
					$gameVariables.setValue( Number(temp1) , e_id );
				}
			}
			if( type == "获取指定事件的位置值" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				var pos = temp1.split(/[,，]/);
				if( pos.length < 2 ){ return; }
				if( temp2 == "本事件" ){
					$gameVariables.setValue( Number(pos[0]) , this.x );
					$gameVariables.setValue( Number(pos[1]) , this.y );
				}
				else if( temp2.indexOf("事件[") != -1 ){
					temp2 = temp2.replace("事件[","");
					temp2 = temp2.replace("]","");
					var e_id = Number(temp2);
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					$gameVariables.setValue( Number(pos[0]) , e.x );
					$gameVariables.setValue( Number(pos[1]) , e.y );
				}
				else if( temp2.indexOf("事件变量[") != -1 ){
					temp2 = temp2.replace("事件变量[","");
					temp2 = temp2.replace("]","");
					var e_id = $gameVariables.value(Number(temp2));
					if( $gameMap.drill_EPo_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					$gameVariables.setValue( Number(pos[0]) , e.x );
					$gameVariables.setValue( Number(pos[1]) , e.y );
				}
			}
		}
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "获取玩家的位置值" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				var pos = temp1.split(/[,，]/);
				if( pos.length < 2 ){ return; }
				$gameVariables.setValue( Number(pos[0]), $gamePlayer.x );
				$gameVariables.setValue( Number(pos[1]), $gamePlayer.y );
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EPo_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventPosition.js 物体 - 位置与位移】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 玩家瞬移
//=============================================================================
Game_Player.prototype.drill_EPo_locate = function( x, y ){
	Game_Character.prototype.locate.call( this, x, y );
	if( this.isInVehicle() ){
		this.vehicle().refresh();
	}
	this._followers.synchronize(x, y, this.direction());
};




