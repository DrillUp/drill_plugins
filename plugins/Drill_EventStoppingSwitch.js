//=============================================================================
// Drill_EventStoppingSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 制动开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventStoppingSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 物体停止移动超过限时时间后，立即触发独立开关。
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
 *   (1.制动 即 "刹车"，是指将运行的汽车立即停下、减速的过程。 
 *      制动开关 即 制动监听器一类的开关。
 *      专门监听事件被阻塞不能移动/停止移动的情况，超过限定时间后立即触发。
 *   (2.一般触发制动开关的情况，分为下面两种：
 *      移动路线指令控制持续移动，但是遇到阻碍，不能继续移动，被迫暂停。
 *      移动路线指令执行时，遇到等待帧的指令。
 * 传感器：
 *   (1.制动开关被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      任何一个事件停止移动时，立即计时，超过限定时间后，开启开关。
 *      若事件继续移动，则关闭开关，重新计时。
 *   (2.制动开关的注释设置全都跨事件页。
 *      但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 * 阻塞设置：
 *   (1.默认物体在上方（飞行）或下方（地面），相互是没有碰撞阻塞的。
 *      没有碰撞，自然也不能让制动开关因为阻塞停下的功能生效了，
 *      所以加阻塞的注释可以让飞行/地面物体也能阻塞。
 * 撞击位置：
 *   (1.制动开关触发后，系统会自动记录被撞击的位置，
 *      即触发开关后，事件的朝向的后一格图块。
 *   (2.被撞击的位置可能是墙壁，也可能是一个事件。
 *      你需要考虑击空的情况。
 * 设计：
 *   (1.多用于限时子弹类的事件，碰壁后立即爆炸。
 *      可以与 事件复制器 插件配合使用。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定开关为制动开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>制动开关 : 最大暂停时间[5] : 作用于独立开关 : A
 * 
 * 1."最大暂停时间"的单位为 帧，1秒60帧。
 *   时间最小为1，时间0和时间1的效果一样。不过一般都设置2至6的缓冲时间来触发。
 * 2.制动开关的注释设置全都跨事件页。
 *   但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 飞行/地面阻塞
 * 如果你需要激活飞行/地面物体的阻塞，使用下面注释：
 * 
 * 事件注释：=>制动开关 : 开启全面阻塞
 * 
 * 1.默认物体在上方（飞行）或下方（地面），相互是没有碰撞的。
 *   没有碰撞，自然也不能让制动开关因为阻塞停下的功能生效了，
 *   所以加此注释可以让飞行/地面物体也能阻塞。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以使用插件指令，直接设置属性：
 * 
 * 插件指令：>制动开关 : 本事件 : 最大暂停时间[5] :作用于独立开关 : A
 * 插件指令：>制动开关 : 事件[10] : 最大暂停时间[5] :作用于独立开关 : A
 * 插件指令：>制动开关 : 事件变量[21] : 最大暂停时间[5] :作用于独立开关 : A
 * 插件指令：>制动开关 : 批量事件[10,11] : 最大暂停时间[5] :作用于独立开关 : A
 * 插件指令：>制动开关 : 批量事件变量[21,22] : 最大暂停时间[5] :作用于独立开关 : A
 * 
 * 插件指令：>制动开关 : 本事件 : 最大暂停时间[5] :作用于独立开关 : A
 * 插件指令：>制动开关 : 本事件 : 开启全面阻塞
 * 插件指令：>制动开关 : 本事件 : 恢复默认阻塞
 * 
 * 1.前面部分（本事件）和后面设置（最大暂停时间[5] :作用于独立开关 : A）可以随意组合。
 *   一共有5*3种组合方式。
 * 2.注意，插件指令设置后立即生效，如果目标事件没有移动，可能会立即开启独立开关。
 *   离开重进地图后，插件指令的设置会失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取对象
 * 你可以使用插件指令，获取触发制动后的对象：
 * 
 * 插件指令：>制动开关 : 本事件 : 获取上一个撞击位置 : 变量[25,26]
 * 插件指令：>制动开关 : 事件[10] : 获取上一个撞击位置 : 变量[25,26]
 * 插件指令：>制动开关 : 事件变量[21] : 获取上一个撞击位置 : 变量[25,26]
 * 
 * 1.制动开关触发后，系统会自动记录被撞击的位置，
 *   即触发开关后，事件的朝向的后一格图块。
 * 2.被撞击的位置可能是墙壁，也可能是一个事件。
 *   你需要考虑击空的情况。
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
 * 测试方法：   去弹丸反射设计关卡，复制20个含制动开关的弹丸，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【22.19ms】
 *              100个事件的地图中，平均消耗为：【14.14ms】
 *               50个事件的地图中，平均消耗为：【11.89ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.制动开关需要实时判定弹丸事件是否停下，有部分消耗，不过并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EStS（Event_Stopping_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EStS
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	弹丸反射关卡
//		★性能测试消耗	14.14ms（Game_CharacterBase.prototype.update）2.64ms（drill_EStS_readPage）11.89ms（drill_EStS_updateCommonSwitch）
//		★最坏情况		暂无
//		★备注			弹丸反射关卡中，低配电脑只稳定到5帧左右。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			制动开关：
//				->停止时计时
//
//		★必要注意事项：
//			1.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			
//		★其它说明细节：
//			2022-2-1：
//			━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━
//			╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮
//			|小 ||爱 ||丽 ||丝 ||祝 ||你 ||虎 ||年 ||大 ||吉 |
//			╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventStoppingSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventStoppingSwitch');


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EStS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EStS_pluginCommand.call(this, command, args);
	if( command === ">制动开关" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
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
					if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 		
		
		/*-----------------设置属性------------------*/	
		if( args.length == 8 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( temp2 == "作用于独立开关" ){
				temp1 = temp1.replace("最大暂停时间[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EStS_data['switch'] = temp3;
					c_chars[k]._drill_EStS_data['maxTime'] = Math.max( Number(temp1), 1 );
				}
			}
		}
		if( args.length == 4 ){
			var temp1 = String(args[3]);
			if( temp1 == "开启全面阻塞" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EStS_data['allBlock'] = true;
				}
			}
			if( temp1 == "恢复默认阻塞" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k]._drill_EStS_data['allBlock'] = false;
				}
			}
		}
		
		/*-----------------获取对象------------------*/	
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "获取上一个撞击位置" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				var pos_var = temp2.split(/[,，]/);
				if( pos_var.length >= 2 && c_chars.length > 0 ){
					var xx = c_chars[0]._drill_EStS_data['lastTriggeredX'];
					var yy = c_chars[0]._drill_EStS_data['lastTriggeredY'];
					$gameVariables.setValue( Number(pos_var[0]), xx );
					$gameVariables.setValue( Number(pos_var[1]), yy );
				}
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EStS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventStoppingSwitch.js 物体 - 制动开关】\n" +
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
var _drill_EStS_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	_drill_EStS_initialize.call(this);
	this._drill_EStS_data = {};
	this._drill_EStS_data['switch'] = null;				//触发的开关
	this._drill_EStS_data['maxTime'] = 1;				//最大暂停时间
	this._drill_EStS_data['allBlock'] = false;			//阻塞标记
	this._drill_EStS_data['lastTriggeredX'] = -1;		//上一次碰撞位置X
	this._drill_EStS_data['lastTriggeredY'] = -1;		//上一次碰撞位置Y
	this._drill_EStS_curTime = 0;						//当前延时时间
}
//==============================
// * 物体 - 注释初始化
//==============================
var _drill_EStS_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EStS_initMembers.call(this);
	this._drill_EStS_isFirstBirth = true;
};
var _drill_EStS_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EStS_setupPage.call(this);
    this.drill_EStS_setupSwitch();
};
Game_Event.prototype.drill_EStS_setupSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EStS_isFirstBirth ){ 
		this._drill_EStS_isFirstBirth = false;
		this.drill_EStS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EStS_readPage( this.list() );
	}
}
//==============================
// * 物体 - 读取注释
//==============================
Game_Event.prototype.drill_EStS_readPage = function( page_list ){		
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>制动开关" ){
				if(args.length == 6){		//=>制动开关 : 最大暂停时间[5] : 作用于独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					if( temp2 == "作用于独立开关" ){
						temp1 = temp1.replace("最大暂停时间[","");
						temp1 = temp1.replace("]","");
						$gameTemp._drill_EStS_needRestatistics = true;
						this._drill_EStS_data['switch'] = temp3;
						this._drill_EStS_data['maxTime'] = Math.max( Number(temp1), 1 );
					}
				}
				if(args.length == 2){
					var temp1 = String(args[1]);
					if( temp1 == "开启全面阻塞" ){
						this._drill_EStS_data['allBlock'] = true;
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
var _drill_EStS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EStS_temp_initialize.call(this);
	this._drill_EStS_switchTank = [];			//制动开关容器
	this._drill_EStS_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EStS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_EStS_switchTank = [];		//制动开关容器
	$gameTemp._drill_EStS_needRestatistics = true;
	_drill_EStS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EStS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EStS_switchTank = [];		//制动开关容器
	$gameTemp._drill_EStS_needRestatistics = true;
	_drill_EStS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EStS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_EStS_map_update.call(this,sceneActive);
	this.drill_EStS_updateRestatistics();		//帧刷新 - 刷新统计
	this.drill_EStS_updateCommonSwitch();		//帧刷新 - 制动开关触发
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EStS_updateRestatistics = function() {
	if( !$gameTemp._drill_EStS_needRestatistics ){ return }
	$gameTemp._drill_EStS_needRestatistics = false;
	
	$gameTemp._drill_EStS_switchTank = [];		//制动开关容器
	
	var events = this.events();
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event._drill_EStS_data['switch'] != undefined){
			$gameTemp._drill_EStS_switchTank.push(temp_event);
		}
	}
}
//=============================================================================
// ** 制动开关触发
//=============================================================================
//==============================
// * 帧刷新 - 时间计时
//==============================
var _drill_EStS_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_EStS_update.call(this);
	
	if( this.isStopping() ){
		this._drill_EStS_curTime += 1;
	}else{
		this._drill_EStS_curTime = 0;
	}
}
//==============================
// * 帧刷新 - 制动开关触发
//==============================
Game_Map.prototype.drill_EStS_updateCommonSwitch = function() {
	if( $gameTemp._drill_EStS_switchTank == undefined ){ return }
	if( $gameTemp._drill_EStS_switchTank.length === 0 ){ return }
	
	for (var i = 0; i < $gameTemp._drill_EStS_switchTank.length; i++) {  
		var temp_event = $gameTemp._drill_EStS_switchTank[i];
		
		// > 事件触发
		var isTriggered = false;
		if( temp_event._drill_EStS_curTime > temp_event._drill_EStS_data['maxTime'] ){
			isTriggered = true;
			
			// > 标记上一次碰撞位置（斜向朝向情况）【物体 - 事件转向】
			if( Imported.Drill_EventDirection &&
				temp_event.drill_EDi_isDirectionDiagonal() ){
				var di = temp_event.drill_EDi_getDiagonalDirection( temp_event.direction() );
				var xx = temp_event._x;
				var yy = temp_event._y;
				xx = this.roundXWithDirection( xx, di[0] );	//（斜向有两个方向分量，前进两步）
				yy = this.roundXWithDirection( yy, di[0] );
				xx = this.roundXWithDirection( xx, di[1] );
				yy = this.roundXWithDirection( yy, di[1] );
				temp_event._drill_EStS_data['lastTriggeredX'] = xx;
				temp_event._drill_EStS_data['lastTriggeredY'] = yy;
				
			// > 标记上一次碰撞位置（默认）
			}else{
				temp_event._drill_EStS_data['lastTriggeredX'] = this.roundXWithDirection(temp_event._x, temp_event.direction() );
				temp_event._drill_EStS_data['lastTriggeredY'] = this.roundYWithDirection(temp_event._y, temp_event.direction() );
			}
			
		}else{
			isTriggered = false;
		}
		
		// > 切换开关
		if( isTriggered ){
			var s_key = [this._mapId, temp_event._eventId, temp_event._drill_EStS_data['switch'] ];
			if( $gameSelfSwitches.value(s_key) !== true){
				$gameSelfSwitches.drill_EStS_setValueWithOutChange(s_key,true);
				$gameSelfSwitches.onChange();
			}
		}else{
			var s_key = [this._mapId, temp_event._eventId, temp_event._drill_EStS_data['switch'] ];
			if( $gameSelfSwitches.value(s_key) !== false){
				$gameSelfSwitches.drill_EStS_setValueWithOutChange(s_key,false);
				$gameSelfSwitches.onChange();
			}
		}
	}
	
};
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_EStS_setValueWithOutChange = function(key, value) {
    if( value ){
        this._data[key] = true;
    }else{
        delete this._data[key];
    }
};

//=============================================================================
// ** 制动开关阻塞
//=============================================================================
//==============================
// * 可通行 - 判断 - 物体碰撞（与事件）
//
//			说明：	注意，只考虑碰撞（返回true）的情况，其他情况不要覆盖了。
//==============================
var _drill_EStS_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
Game_Event.prototype.isCollidedWithEvents = function( x, y ){
	if( this._drill_EStS_data['allBlock'] == true ){
		var events = $gameMap.eventsXyNt(x, y);
		if( events.length > 0 ){
			return true;
		}
	}
	return _drill_EStS_isCollidedWithEvents.call( this, x, y );
}

//==============================
// * 可通行 - 判断 - 物体碰撞（与玩家）
//==============================
var _drill_EStS_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function( x, y ){
	if( this._drill_EStS_data['allBlock'] == true ){
		if( $gamePlayer.isCollided(x, y) ){
			return true;
		}
	}
	return _drill_EStS_isCollidedWithPlayerCharacters.call( this, x, y );
}

