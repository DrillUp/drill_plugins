//=============================================================================
// Drill_EventPositionRecorder.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体 - 位置存储器
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventPositionRecorder +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令存储事件的位置，以及位置记忆功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 位置存储：
 *   (1.你可以将位置存储到指定的槽中，需要时能随时取出值赋给变量。
 *   (2.通过位置槽，你可以存储很多位置数据，需要时自动取出并使用。
 *   (3.注意，位置存储 和 位置记忆 是两个分开的功能。
 *      一个是专门存储位置数据的容器，另一个用于确保刷地图时位置不变的功能。
 * 位置记忆：
 *   (1.所有事件的位置在刷地图后会将位置重置。
 *      你可以添加 事件注释，来确定具体的某些事件位置是否重置。
 *   (2.你还可以通过插件指令开关位置记忆。
 *      但注意，插件指令"开启位置记忆"只能记忆一次。
 * 设计：
 *   (1.多用于箱子之类的解谜游戏。启动事件记忆位置后，玩家操作箱子按压开关，
 *      离开地图然后回到地图后，箱子会处于按压的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 位置存储
 * 你需要通过插件指令来存储位置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 玩家位置
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 本事件
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 事件[10]
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 事件变量[21]
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 位置[10,10]
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 位置变量[25,26]
 * 插件指令：>位置存储器 : 位置槽[位置1] : 保存位置 : 位置槽[位置2]
 * 
 * 插件指令：>位置存储器 : 位置槽[位置1] : 位置变化 : 位置X[+10]
 * 插件指令：>位置存储器 : 位置槽[位置1] : 位置变化 : 位置Y[-10]
 * 插件指令：>位置存储器 : 位置槽[位置1] : 位置变化 : 位置X[+5] : 位置Y[+5]
 * 
 * 插件指令：>位置存储器 : 位置槽[位置1] : 位置值给 : 变量[25,26]
 * 插件指令：>位置存储器 : DEBUG查看位置槽全部数据
 * 
 * 1.存储到指定槽后，永久有效。
 *   "位置1"是可完全自定义的名称，你可以将位置数据存储到自定义的名称中。
 * 2.重复保存到相同的名称的槽，可以覆盖该槽的原数据。
 *   通过"位置值给"，即可将值赋值给变量。
 * 3.注意，位置存储 和 位置记忆 是两个分开的功能。
 *   一个是专门存储位置数据的容器，另一个用于确保刷地图时位置不变的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 位置记忆
 * 你需要设置指定的事件，位置能保持，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>位置存储器 : 开启位置记忆
 * 事件注释：=>位置存储器 : 关闭位置记忆
 * 
 * 1."位置记忆"是指玩家 刷地图 后，事件仍然保持在原来位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 位置记忆
 * 你可以使用插件指令，直接设置事件的位置记忆开关：
 * 
 * 插件指令：>位置存储器 : 本事件 : 开启位置记忆
 * 插件指令：>位置存储器 : 事件[10] : 开启位置记忆
 * 插件指令：>位置存储器 : 事件变量[21] : 开启位置记忆
 * 插件指令：>位置存储器 : 批量事件[10,11] : 开启位置记忆
 * 插件指令：>位置存储器 : 批量事件变量[21,22] : 开启位置记忆
 * 插件指令：>位置存储器 : 全图事件 : 开启位置记忆
 * 
 * 插件指令：>位置存储器 : 本事件 : 开启位置记忆
 * 插件指令：>位置存储器 : 本事件 : 关闭位置记忆
 * 
 * 1.前半部分（玩家）和 后半部分（开启位置记忆）
 *   的参数可以随意组合。一共有6*2种组合方式。
 * 2.注意，插件指令"开启位置记忆"只能记忆一次，
 *   而事件注释一直有效。
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
 * 测试方法：   去物体管理层，复制足够多的花盆，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.位置存储只在 进入/离开 地图时触发 保存/载入 坐标数据。
 *   并且只执行一次，因此几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了该插件对旧存档的兼容性。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EPR（Event_Position_Recorder）
//		临时全局变量	无
//		临时局部变量	this._drill_EPR_xxx
//		存储数据变量	$gameSystem._drill_EPR_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	物体管理层
//		★性能测试消耗	（太小，未找到）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			位置存储器：
//				->位置存储
//				->位置记忆
//
//		★必要注意事项：
//			1.考虑到性能节省，这里【不需要】容器法。
//			  只在地图变化时控制。
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
　　Imported.Drill_EventPositionRecorder = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventPositionRecorder');


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EPR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EPR_pluginCommand.call(this, command, args);
	if( command === ">位置存储器" ){
		
		/*-----------------位置槽------------------*/
		if( args.length > 2  ){
			var tag = String(args[1]);
			if( tag.indexOf("位置槽[") != -1 ){
				tag = tag.replace("位置槽[","");
				tag = tag.replace("]","");
				
				if( args.length == 6 ){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					if( type == "保存位置" ){
						if( temp1 == "玩家位置" ){
							$gameSystem.drill_EPR_savePosition( tag, $gamePlayer.x, $gamePlayer.y );
						}
						else if( temp1 == "本事件" ){
							var e = $gameMap.event( this._eventId );
							$gameSystem.drill_EPR_savePosition( tag, e.x, e.y );
						}
						else if( temp1.indexOf("事件变量[") != -1 ){
							temp1 = temp1.replace("事件变量[","");
							temp1 = temp1.replace("]","");
							var e_id = $gameVariables.value(Number(temp1));
							if( $gameMap.drill_EPR_isEventExist( e_id ) == false ){ return; }
							var e = $gameMap.event( e_id );
							$gameSystem.drill_EPR_savePosition( tag, e.x, e.y );
						}
						else if( temp1.indexOf("事件[") != -1 ){
							temp1 = temp1.replace("事件[","");
							temp1 = temp1.replace("]","");
							var e_id = Number(temp1);
							if( $gameMap.drill_EPR_isEventExist( e_id ) == false ){ return; }
							var e = $gameMap.event( e_id );
							$gameSystem.drill_EPR_savePosition( tag, e.x, e.y );
						}
						else if( temp1.indexOf("位置变量[") != -1 ){
							temp1 = temp1.replace("位置变量[","");
							temp1 = temp1.replace("]","");
							var temp_arr = temp1.split(/[,，]/);
							if( temp_arr.length >= 2 ){
								$gameSystem.drill_EPR_savePosition( tag, 
									$gameVariables.value(Number(temp_arr[0])), 
									$gameVariables.value(Number(temp_arr[1])) );
							}
						}
						else if( temp1.indexOf("位置[") != -1 ){
							temp1 = temp1.replace("位置[","");
							temp1 = temp1.replace("]","");
							var temp_arr = temp1.split(/[,，]/);
							if( temp_arr.length >= 2 ){
								$gameSystem.drill_EPR_savePosition( tag, Number(temp_arr[0]), Number(temp_arr[1]) );
							}
						}
						else if( temp1.indexOf("位置槽[") != -1 ){
							temp1 = temp1.replace("位置槽[","");
							temp1 = temp1.replace("]","");
							var pos_tar = $gameSystem._drill_EPR_paramTank[ temp1 ];
							if( pos_tar != undefined ){
								$gameSystem.drill_EPR_savePosition( tag, pos_tar['x'], pos_tar['y'] );
							}
						}
					}
					if( type == "位置变化" ){
						if( temp1.indexOf("位置X[") != -1 ){
							temp1 = temp1.replace("位置X[","");
							temp1 = temp1.replace("]","");
							$gameSystem._drill_EPR_paramTank[ tag ]['x'] += Number(temp1);
						}
						else if( temp1.indexOf("位置Y[") != -1 ){
							temp1 = temp1.replace("位置Y[","");
							temp1 = temp1.replace("]","");
							$gameSystem._drill_EPR_paramTank[ tag ]['y'] += Number(temp1);
						}
					}
					if( type == "位置值给" ){
						temp1 = temp1.replace("变量[","");
						temp1 = temp1.replace("]","");
						var temp_arr = temp1.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							var pos = $gameSystem._drill_EPR_paramTank[ tag ];
							$gameVariables.setValue( Number(temp_arr[0]), pos['x'] );
							$gameVariables.setValue( Number(temp_arr[1]), pos['y'] );
						}
					}
				}
				if( args.length == 8 ){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					if( type == "位置变化" ){
						if( temp1.indexOf("位置X[") != -1 && temp2.indexOf("位置Y[") != -1 ){
							temp1 = temp1.replace("位置X[","");
							temp1 = temp1.replace("]","");
							temp2 = temp2.replace("位置Y[","");
							temp2 = temp2.replace("]","");
							$gameSystem._drill_EPR_paramTank[ tag ]['x'] += Number(temp1);
							$gameSystem._drill_EPR_paramTank[ tag ]['y'] += Number(temp2);
						}
					}
				}
				return;
			}
		}
		/*-----------------DEBUG查看位置槽全部数据------------------*/
		if( args.length == 2  ){
			var type = String(args[1]);
			if( type == "DEBUG查看位置槽全部数据" ){
				alert( $gameSystem.drill_EPR_outputParamTank() );
			}
		}
		
		/*-----------------位置记忆 - 对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				e_chars = [ e ];
			}
			if( e_chars == null && unit == "全图事件" ){
				e_chars = $gameMap.events();
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EPR_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EPR_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EPR_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EPR_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
		}
		if( e_chars == null ){ return }; 		
		
		/*-----------------位置记忆 - 设置属性------------------*/	
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "开启位置记忆" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k]._drill_EPR_remainEnable = true;
				}
			}
			if( type == "关闭位置记忆" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k]._drill_EPR_remainEnable = false;
				}
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EPR_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventPositionRecorder.js 物体 - 位置存储器】\n" +
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
DrillUp.g_EPR_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EPR_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EPR_sys_initialize.call(this);
	this.drill_EPR_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EPR_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EPR_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EPR_saveEnabled == true ){	
		$gameSystem.drill_EPR_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EPR_initSysData();
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
Game_System.prototype.drill_EPR_initSysData = function() {
	this.drill_EPR_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EPR_checkSysData = function() {
	this.drill_EPR_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EPR_initSysData_Private = function() {
	
	this._drill_EPR_paramTank = {};				//位置存储容器
	this._drill_EPR_mapPosTank = [];			//位置记忆容器（二维列表）
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EPR_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EPR_mapPosTank == undefined ){
		this.drill_EPR_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，注释激活时才赋值）
};
//==============================
// * 存储数据 - 保存位置
//==============================
Game_System.prototype.drill_EPR_savePosition = function( tag, x, y ){
	var pos = {};
	pos['x'] = x;
	pos['y'] = y;
	this._drill_EPR_paramTank[ tag ] = pos;
}
//==============================
// * 存储数据 - 打印位置
//==============================
Game_System.prototype.drill_EPR_outputParamTank = function(){
	var result = "";
    var keys = Object.keys(this._drill_EPR_paramTank);
    for(var i = 0; i < keys.length; i++ ){
		var key = keys[i];
		var v = this._drill_EPR_paramTank[ key ];
		result += key + ": (" + v.x + "," + v.y + ")";
		result += "\n";
	}
	return result;
}


//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_EPR_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_EPR_initialize.call(this);
	this._drill_EPR_remainEnable = false;		//位置记忆
}
//==============================
// * 物体 - 注释初始化
//==============================
var _drill_EPR_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EPR_initMembers.call(this);
	this._drill_EPR_isFirstBirth = true;
};
var _drill_EPR_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EPR_setupPage.call(this);
    this.drill_EPR_setupPressSwitch();
};
Game_Event.prototype.drill_EPR_setupPressSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EPR_isFirstBirth ){ 
		this._drill_EPR_isFirstBirth = false;
		this.drill_EPR_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EPR_readPage( this.list() );
	}
}
//==============================
// * 物体 - 读取注释
//==============================
Game_Event.prototype.drill_EPR_readPage = function( page_list ) {		
	page_list.forEach( function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>位置存储器" ){
				if( args.length == 2 ){		//=>位置存储器 : 开启位置记忆
					var temp1 = String(args[1]);
					if( temp1 == "开启位置记忆" ){
						this._drill_EPR_remainEnable = true;
					}
					if( temp1 == "关闭位置记忆" ){
						this._drill_EPR_remainEnable = false;
					}
				}
			};
		};
	}, this);
};


//=============================================================================
// ** 位置记忆
//=============================================================================
//==============================
// * 位置记忆 - 赋值
//==============================
var _drill_EPR_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	
	// > 上一个地图的存储
	this.drill_EPR_saveMapPos( this._mapId );
	
	// > 执行赋值
	_drill_EPR_setup.call( this, mapId );
	
	// > 载入
	this.drill_EPR_loadMapPos( mapId );
}
//==============================
// * 位置记忆 - 存储
//==============================
Game_Map.prototype.drill_EPR_saveMapPos = function( mapId ){
	if( mapId <= 0 ){ return; }
	
	// > 事件位置存储
	var posTank = [];
	var event_tank = this.events();
	if( event_tank == undefined ){ return; }
	for(var i = 0; i < event_tank.length; i++){
		var e = event_tank[i];
		if( e == undefined ){ continue; }
		if( e._drill_EPR_remainEnable != true ){ continue; }
		var pos = {};
		pos['x'] = e.x;
		pos['y'] = e.y;
		pos['eventId'] = e._eventId;
		posTank[ i ] = pos;
	}
	
	// > 存储到容器
	if( $gameSystem._drill_EPR_mapPosTank == undefined ){ $gameSystem._drill_EPR_mapPosTank = []; }
	$gameSystem._drill_EPR_mapPosTank[ mapId ] = posTank;
}
//==============================
// * 位置记忆 - 载入
//==============================
Game_Map.prototype.drill_EPR_loadMapPos = function( mapId ){
	if( mapId <= 0 ){ return; }
	
	// > 清空当前容器
	this._drill_EPR_curPosTank = [];		//（此容器暂时没用到）
	
	// > 事件位置赋值
	var posTank = $gameSystem._drill_EPR_mapPosTank[ mapId ];
	if( posTank == undefined ){ return; }
	for(var i = 0; i < posTank.length; i++){
		var pos = posTank[i];
		if( pos == undefined ){ continue; }
		
		// > 事件位移
		var e = this.event( pos['eventId'] );
		if( e == undefined ){ continue; }
		if( e._drill_EPR_remainEnable != true ){ continue; }
		e.locate( pos['x'], pos['y'] );
	}	
	this._drill_EPR_curPosTank = posTank;
}

