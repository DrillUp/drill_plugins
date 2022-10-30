//=============================================================================
// Drill_EventPressureSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        物体 - 重力开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventPressureSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 任何事件踩到开关时，立即按下，离开开关时，立即弹出。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.详细介绍可以去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.重力开关在事件完全踩在它身上之前，就会立即做出反应。
 *      队伍跟随的成员不会对重力开关有任何影响，只有领队与事件可以。
 *   (2.插件本身不会提供按下、弹起的缓冲过程，此功能需要你自己写事件页
 *      来控制。你可以参考示例中的开关，直接复制粘贴也可以。
 *      在示例中 物体管理层 右上角区域。
 * 传感器：
 *   (1.重力开关被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      任何一个事件踩到开关时，立即按下，离开开关时，立即弹出。
 *   (2.重力开关的注释设置全都跨事件页。
 *      但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 * 脉冲开关：
 *   (1.脉冲开关即踩第一次，按下，离开后踩第二次，弹出，如此往复。
 *   (2.重力开关二次迭代可以制作成脉冲开关，原理可见文档。
 *      你也可以直接参考示例中的开关，或者复制粘贴。
 * 钥匙/锁：
 *   (1.你可以设置 重力钥匙事件 和 重力锁事件 。
 *      只有指定的钥匙，压在上面才可以开启指定的重力锁。
 *   (2.同一个事件可以带上多个钥匙，或者多把锁。
 *      只要锁和钥匙的关键字相互对应上，压着才能够触发重力开关。
 * 设计：
 *   (1.多用于箱子与按压板之类的解谜游戏。
 *      通常与 计数开关 结合，制作箱子按压多个开关才能开启门的解谜。
 *   (2.注意，如果你设计了arpg事件战斗的游戏，事件死亡切换事件页后，
 *      需要关闭重力作用，不然该事件将会持续按压重力开关，使得开关
 *      无法弹起或再次触发。
 *   (3.两个重力开关如果相互碰撞，会相互触发重力，注意避免此情况。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定开关为重力开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>重力开关 : 作用于独立开关 : A
 * 
 * 1.重力开关的注释设置全都跨事件页。
 * 2.但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 如果你要设置一个对重力开关不起作用的事件，可以添加下面注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>重力开关 : 关闭重力作用
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 钥匙/锁
 * 你可以设置只有含有重力钥匙的事件才能触发重力锁的开关。
 * 
 * 事件注释：=>重力开关 : 重力钥匙 : 钥匙_A
 * 事件注释：=>重力开关 : 重力锁 : 钥匙_A : 作用于独立开关 : A
 *
 * 1.重力钥匙和重力锁的关键字可以完全自定义。
 * 2.同一个事件可以带上多个钥匙，或者多把锁。
 *   只要锁和钥匙的关键字相互对应上，压着才能够触发重力开关。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令控制
 * 你可以使用插件指令，直接设置事件的重力属性：
 * 
 * 插件指令：>重力开关 : 玩家 : 开启重力作用
 * 插件指令：>重力开关 : 本事件 : 开启重力作用
 * 插件指令：>重力开关 : 事件[10] : 开启重力作用
 * 插件指令：>重力开关 : 事件变量[21] : 开启重力作用
 * 插件指令：>重力开关 : 批量事件[10,11] : 开启重力作用
 * 插件指令：>重力开关 : 批量事件变量[21,22] : 开启重力作用
 * 
 * 插件指令：>重力开关 : 玩家 : 开启重力作用
 * 插件指令：>重力开关 : 玩家 : 关闭重力作用
 * 插件指令：>重力开关 : 玩家 : 添加重力钥匙 : 钥匙_B
 * 插件指令：>重力开关 : 玩家 : 去掉重力钥匙 : 钥匙_B
 * 插件指令：>重力开关 : 玩家 : 去掉全部重力钥匙
 * 
 * 1.前半部分（玩家）和 后半部分（开启重力作用）
 *   的参数可以随意组合。一共有6*5种组合方式。
 * 2.重力作用被关闭后，将不对重力开关产生任何触发。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取对象
 * 你可以使用插件指令，获取触发重力后的对象：
 * 
 * 插件指令：>重力开关 : 本事件 : 获取上一个触发重力的事件ID : 变量[21]
 * 插件指令：>重力开关 : 事件[10] : 获取上一个触发重力的事件ID : 变量[21]
 * 插件指令：>重力开关 : 事件变量[21] : 获取上一个触发重力的事件ID : 变量[21]
 * 
 * 1.每个重力开关触发重力后，会记录上一个触发的重力事件ID。
 *   由于可能存在多个事件几乎同时触发重力开关的情况，
 *   所以此插件指令只适用于触发重力后立即执行的事件页。
 * 2.如果没有任何重力事件触发，那么变量值会赋予"-1"，
 *   由于玩家不是事件，所以如果是玩家触发的重力，那么变量值会赋予"-2"。
 *   如果多个事件处于开关上，那么将获取到id最小的事件（玩家按-2算）。
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
 * 测试方法：   去物体管理层、华容道设计关卡，复制足够多的重力开关，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【12.44ms】
 *              100个事件的地图中，平均消耗为：【10.37ms】
 *               50个事件的地图中，平均消耗为：【6.22ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.重力开关虽然每帧都有相关执行量，但是并没有出现消耗量巨大的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 添加了重力钥匙和重力锁的功能，并添加了插件性能说明。
 * [v1.3]
 * 修复了切换事件页 + 离开地图 + 再回来，开关失效的bug。
 * 修改了注释说明。
 * [v1.4]
 * 添加了插件指令控制。
 * [v1.5]
 * 添加了 获取上一个触发重力的事件ID 的功能，修复了 事件消除 后，重力仍然存在的bug。
 * [v1.6]
 * 优化了底层，提升了性能，减轻了脉冲开关关卡地图的卡顿问题。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EPS（Event_Pressure_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EPS
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	华容道关卡
//		★性能测试消耗	6.22ms
//		★最坏情况		暂无
//		★备注			消耗太小，一般消耗列表中找不到该插件。
//		
//		★优化记录
//			2022-10-6优化：
//				每次帧刷新都 翻新一次坐标容器，减少每个锁遍历 全图事件 的次数。
//				脉冲开关关卡极端情况 4305.9ms，优化后降低到 271.8ms。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			重力开关：
//				->实时检查按下
//				->开启关闭触发
//				->优化，一个开关都没有则不作计算
//				->事件容器
//				->指定钥匙的重力开关
//				->给玩家添加钥匙	x
//
//		★必要注意事项：
//			1.【这里开关的结构和变量关系比较绕】，
//				赋值的commonSwitch是单个的重力开关，specialKey和specialLock是键值组。
//			2.诡异bug：
//				$gameTemp._drill_EPS_needRestatistics 如果切换地图后，没重刷，从物体管理层 到 炸弹人关卡，伦琴就不能动，伦琴事件无法开启独立开关A。
//				初步判定是指针出现了错误，事件被移除后，而指针却仍然存留。
//			3.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			
//		★其它说明细节：
//			1.每次检查坐标情况，来确定开关是否被压住。
//			2.优化：如果地图里面一个重力开关都没有，则不作多余计算。
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
　　Imported.Drill_EventPressureSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventPressureSwitch');


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EPS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EPS_pluginCommand.call(this, command, args);
	if( command === ">重力开关" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "玩家" ){
				c_chars = [ $gamePlayer ];
			}
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 		
		
		/*-----------------设置属性------------------*/	
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "开启重力作用" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EPS_data['canPress'] = true;
				}
			}
			if( type == "关闭重力作用" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EPS_data['canPress'] = false;
				}
			}
			if( type == "去掉全部重力钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EPS_data['specialKey'] = {};
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "添加重力钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EPS_data['specialKey'][ temp1 ] = true;
				}
			}
			if( type == "去掉重力钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EPS_data['specialKey'][ temp1 ] = null;
				}
			}
		}
		
		/*-----------------获取对象------------------*/	
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "获取上一个触发重力的事件ID" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				if( c_chars.length > 0 ){
					var id = c_chars[0]._drill_EPS_data['lastKey'];
					$gameVariables.setValue( temp1, id );
				}
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EPS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventPressureSwitch.js 物体 - 重力开关】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

		
//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_EPS_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_EPS_initialize.call(this);
	this._drill_EPS_data = {};
	this._drill_EPS_data['commonSwitch'] = null;		//普通重力开关
	this._drill_EPS_data['specialKey'] = {};			//重力钥匙
	this._drill_EPS_data['specialLock'] = {};			//重力锁
	this._drill_EPS_data['canPress'] = true;			//可用情况
	this._drill_EPS_data['lastKey'] = -1;				//上一个触发的事件
}
//==============================
// * 物体 - 注释初始化
//==============================
var _drill_EPS_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EPS_initMembers.call(this);
	this._drill_EPS_isFirstBirth = true;
};
var _drill_EPS_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EPS_setupPage.call(this);
    this.drill_EPS_setupPressSwitch();
};
Game_Event.prototype.drill_EPS_setupPressSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EPS_isFirstBirth ){ 
		this._drill_EPS_isFirstBirth = false;
		this.drill_EPS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EPS_readPage( this.list() );
	}
}
//==============================
// * 物体 - 读取注释
//==============================
Game_Event.prototype.drill_EPS_readPage = function( page_list ){		
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>重力开关" ){
				if(args.length == 4){	//=>重力开关 : 作用于独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "作用于独立开关" ){
						this._drill_EPS_data['commonSwitch'] = temp2;
						$gameTemp._drill_EPS_needRestatistics = true;
					}
					if( temp1 == "重力钥匙" ){
						this._drill_EPS_data['specialKey'][temp2] = true;
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				if(args.length == 8){	//=>重力开关 : 重力锁 : 钥匙_A : 作用于独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					var temp4 = String(args[7]);
					if( temp1 == "重力锁" && temp3 == "作用于独立开关" ){
						this._drill_EPS_data['specialLock'][temp2] = temp4;
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				if(args.length == 2){	//=>重力开关 : 关闭重力作用
					var temp1 = String(args[1]);
					if( temp1 == "关闭重力作用" ){
						this._drill_EPS_data['canPress'] = false;
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
			};
		};
	}, this);
};
//==============================
// * 物体 - 判断锁
//==============================
Game_Character.prototype.drill_EPS_hasLocks = function() {	
	if( !this._drill_EPS_data['specialLock'] ){ return false; }
	var locks = this._drill_EPS_data['specialLock'];
	for(var key in locks ){
		if( locks[key] !== undefined ){ return true; }
	}
	return false;
}
//==============================
// * 物体 - 判断钥匙
//==============================
Game_Character.prototype.drill_EPS_hasKeys = function() {
	if( !this._drill_EPS_data['specialKey'] ){ return false; }
	var keys = this._drill_EPS_data['specialKey'];
	for(var key in keys ){
		if( keys[key] === true ){ return true; }
	}
	return false;
}


//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_EPS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EPS_temp_initialize.call(this);
	this.drill_EPS_clearTemp();
	this._drill_EPS_needRestatistics = true;
};
Game_Temp.prototype.drill_EPS_clearTemp = function() {	
	this._drill_EPS_commonSwitchTank = [];		//普通重力开关容器
	this._drill_EPS_specialLockTank = [];		//重力锁容器
	this._drill_EPS_specialKeyTank = [];		//重力钥匙容器
	this._drill_EPS_positionTank = {};			//坐标容器
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EPS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EPS_clearTemp();
	$gameTemp._drill_EPS_needRestatistics = true;
	_drill_EPS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EPS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp.drill_EPS_clearTemp();
	$gameTemp._drill_EPS_needRestatistics = true;
	_drill_EPS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EPS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EPS_map_update.call( this, sceneActive );
	this.drill_EPS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EPS_updateRestatistics = function() {
	if( !$gameTemp._drill_EPS_needRestatistics ){ return }
	$gameTemp._drill_EPS_needRestatistics = false;
	
	$gameTemp._drill_EPS_commonSwitchTank = [];		//普通重力开关容器
	$gameTemp._drill_EPS_specialLockTank = [];     	//重力锁容器
	$gameTemp._drill_EPS_specialKeyTank = [];      	//重力钥匙容器
	
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event._drill_EPS_data['commonSwitch'] != undefined){
			$gameTemp._drill_EPS_commonSwitchTank.push(temp_event);
		}
		if( temp_event.drill_EPS_hasLocks() ){
			$gameTemp._drill_EPS_specialLockTank.push(temp_event);
		}
		if( temp_event.drill_EPS_hasKeys() ){
			$gameTemp._drill_EPS_specialKeyTank.push(temp_event);
		}
	}
	if( $gamePlayer.drill_EPS_hasKeys() ){	//玩家带的钥匙
		$gameTemp._drill_EPS_specialKeyTank.push($gamePlayer);
	}
}


//=============================================================================
// ** 重力开关
//=============================================================================
//==============================
// * 重力开关 - 帧刷新
//==============================
var _drill_EPS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EPS_map_update2.call( this, sceneActive );
	if( this.drill_EPS_isOptimizationPassed() == false ){ return; }
	this.drill_EPS_updatePositionTank();		//帧刷新 - 坐标容器
	this.drill_EPS_updateCommonSwitch();		//帧刷新 - 普通重力开关触发
	this.drill_EPS_updateSpecialSwitch();		//帧刷新 - 钥匙重力开关触发
}
//==============================
// * 帧刷新 - 优化策略
//==============================
Game_Map.prototype.drill_EPS_isOptimizationPassed = function() {
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_EPS_commonSwitchTank.length == 0 &&
		$gameTemp._drill_EPS_specialLockTank.length == 0 &&
		$gameTemp._drill_EPS_specialKeyTank.length == 0 ){
		return false;
	}
	return true;
}
//==============================
// * 帧刷新 - 坐标容器
//==============================
Game_Map.prototype.drill_EPS_updatePositionTank = function() {
	$gameTemp._drill_EPS_positionTank = {};
	
	// > 如果有 事件管理核心，用核心的函数，节约性能
	if( Imported.Drill_CoreOfEventManager ){
		
		// > 事件容器指针（注意指针不要加东西，只读）
		var character_list = this.drill_COEM_getAvailableEventTank_Pointer();
		for( var i = 0; i < character_list.length; i++ ){
			var character = character_list[i];
			var slot_id = this.drill_EPS_getSlotId( character );
		
			if( $gameTemp._drill_EPS_positionTank[slot_id] == undefined ){
				$gameTemp._drill_EPS_positionTank[slot_id] = [];
			}
			$gameTemp._drill_EPS_positionTank[slot_id].push( character );
		}
		
		// > 玩家后加入
		var slot_id = this.drill_EPS_getSlotId( $gamePlayer );
		if( $gameTemp._drill_EPS_positionTank[slot_id] == undefined ){
			$gameTemp._drill_EPS_positionTank[slot_id] = [];
		}
		$gameTemp._drill_EPS_positionTank[slot_id].push( $gamePlayer );
		
		
	// > 没加核心那只能手动筛选了
	}else{
		var character_list = this.events();
		character_list.unshift($gamePlayer);
		for( var i = 0; i < character_list.length; i++ ){
			var character = character_list[i];
			var slot_id = this.drill_EPS_getSlotId( character );
			
			// > 排除 空事件
			if( character == undefined ){ continue; }
			// > 排除 删除的事件
			if( character._erased == true ){ continue; }
			
			if( $gameTemp._drill_EPS_positionTank[slot_id] == undefined ){
				$gameTemp._drill_EPS_positionTank[slot_id] = [];
			}
			$gameTemp._drill_EPS_positionTank[slot_id].push( character );
		}
	}
}
//==============================
// * 帧刷新 - 坐标容器
//==============================
Game_Map.prototype.drill_EPS_getSlotId = function( character ){
	return Math.floor( character.x ) * 100000 + Math.floor( character.y );
}
//==============================
// * 帧刷新 - 普通重力开关
//==============================
Game_Map.prototype.drill_EPS_updateCommonSwitch = function() {
	if( $gameTemp._drill_EPS_commonSwitchTank.length == 0 ){ return; }
	
	for( var i = 0; i < $gameTemp._drill_EPS_commonSwitchTank.length; i++ ){
		var temp_lock = $gameTemp._drill_EPS_commonSwitchTank[i];
		var slot_id = this.drill_EPS_getSlotId( temp_lock );
		
		var ch_list = $gameTemp._drill_EPS_positionTank[slot_id];
		if( ch_list == undefined ){ continue; }
		
		// > 事件触发
		var isTriggered = false;
		for( var j = 0; j < ch_list.length; j++ ){
			var temp_key = ch_list[j];
			if( this.drill_EPS_triggerCheck( temp_lock, temp_key ) ){
				
				// > 上一个触发的事件 标记
				if( temp_key == $gamePlayer ){
					temp_lock._drill_EPS_data['lastKey'] = -2;
				}else{
					temp_lock._drill_EPS_data['lastKey'] = temp_key._eventId;
				}
				
				// > 激活触发
				isTriggered = true;
				break;
			}
		}
		
		// > 切换开关
		if(isTriggered){
			var s_key = [this._mapId, temp_lock._eventId, temp_lock._drill_EPS_data['commonSwitch'] ];
			if( $gameSelfSwitches.value(s_key) !== true){
				$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
				$gameSelfSwitches.onChange();
			}
		}else{
			var s_key = [this._mapId, temp_lock._eventId, temp_lock._drill_EPS_data['commonSwitch'] ];
			if( $gameSelfSwitches.value(s_key) !== false){
				$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
				$gameSelfSwitches.onChange();
			}
		}
	}
	
};

//=============================================================================
// ** 帧刷新 - 钥匙重力开关触发
//=============================================================================
Game_Map.prototype.drill_EPS_updateSpecialSwitch = function() {
	if( $gameTemp._drill_EPS_specialLockTank.length == 0 ){ return; }
	if( $gameTemp._drill_EPS_specialKeyTank.length == 0 ){ return; }
	
	for (var i = 0; i < $gameTemp._drill_EPS_specialLockTank.length; i++) {  
		var temp_lock = $gameTemp._drill_EPS_specialLockTank[i];
		var slot_id = this.drill_EPS_getSlotId( temp_lock );
		
		var ch_list = $gameTemp._drill_EPS_positionTank[slot_id];
		if( ch_list == undefined ){ continue; }
		
		// > 事件+玩家触发
		var isTriggered = false;
		var trigger_switch = "";
		for( var j = 0; j < ch_list.length; j++ ){
			var temp_key = ch_list[j];
			
			// > 非重力钥匙，跳过
			if( $gameTemp._drill_EPS_specialKeyTank.contains( temp_key ) == false ){ continue; }
			
			if( this.drill_EPS_triggerCheck( temp_lock, temp_key ) ){
				
				// > 标签对应
				var locks = temp_lock._drill_EPS_data['specialLock'];
				for( var l in locks ){
					if( temp_key._drill_EPS_data['specialKey'][ l ] === true ){
				
						// > 上一个触发的事件 标记
						if( temp_key == $gamePlayer ){
							temp_lock._drill_EPS_data['lastKey'] = -2;
						}else{
							temp_lock._drill_EPS_data['lastKey'] = temp_key._eventId;
						}
						
						// > 激活触发
						isTriggered = true;
						trigger_switch = locks[ l ];
						
						break;
					}
				}
			}
		}
		// > 切换开关
		if( isTriggered ){
			var s_key = [this._mapId, temp_lock._eventId, trigger_switch ];
			if( $gameSelfSwitches.value(s_key) !== true){
				$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
				$gameSelfSwitches.onChange();
			}
		}else{
			var locks = temp_lock._drill_EPS_data['specialLock'];	//未触发，则全部锁标签弹出
			for( var l in locks ){
				var s_key = [this._mapId, temp_lock._eventId, locks[l] ];
				if( $gameSelfSwitches.value(s_key) !== false){
					$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
					$gameSelfSwitches.onChange();
				}
			}
		}
	}
}
//==============================
// ** 判断 - 重力开关是否触发
//==============================
Game_Map.prototype.drill_EPS_triggerCheck = function( ev_lock, ev_key ){
	if( ev_key == ev_lock ){ return false; }							//排除 自己
	if( ev_key._drill_EPS_data['canPress'] == false ){ return false; }	//排除 无重力事件 
	
	// > 位置判定
	if( ev_lock.pos( ev_key.x,ev_key.y ) == false ){
		return false;
	}
	return true;
};

//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function(key, value) {
    if( value ){
        this._data[key] = true;
    }else{
        delete this._data[key];
    }
};


