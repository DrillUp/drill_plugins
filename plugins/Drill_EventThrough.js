//=============================================================================
// Drill_EventThrough.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        体积 - 事件穿透关系
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventThrough +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得具有相同 穿透标签 的物体之间能相互穿透。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 默认的穿透：
 *   (1.若勾选事件的穿透配置，则该事件会对所有物体都穿透，
 *      不存在任何有筛选的穿透关系，且该事件还无视图块的通行情况，
 *      可以在地图任何角落行走/漂浮。
 * 事件穿透：
 *   (1.事件可以拥有多个不同的穿透标签。
 *   (2.如果你想做事件A能穿透B和C，但是BC之间并不能穿透的效果。
 *      那么你需要设置AB为一个标签，AC为另一个标签。
 * 设计：
 *   (1.你可以根据穿透关系，可以设计敌人不能穿过的墙 或 玩家不能进入
 *      的NPC区域。例如，小爱丽丝具备标签："穿透板子"，而玩家不具备。
 *      这样，玩家就会被板子挡住去路，而小爱丽丝不会。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 如果你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有空格）
 * 
 * 事件注释：=>事件穿透关系 : 绑定穿透标签 : 标签[炸弹人-角色]
 * 事件注释：=>事件穿透关系 : 绑定穿透标签 : 标签[穿透玩家]
 * 
 * 1.其中"炸弹人-角色"与"穿透玩家"是完全可以自定义的条件关键字。
 *   添加标签后，具有相同标签的物体之间相互可以穿透。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置这些穿透标签：
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>事件穿透关系 : 玩家 : 添加标签 : 标签[炸弹人-角色]
 * 插件指令：>事件穿透关系 : 本事件 : 添加标签 : 标签[炸弹人-角色]
 * 插件指令：>事件穿透关系 : 事件[10] : 添加标签 : 标签[炸弹人-角色]
 * 插件指令：>事件穿透关系 : 事件变量[21] : 添加标签 : 标签[炸弹人-角色]
 * 插件指令：>事件穿透关系 : 批量事件[10,11] : 添加标签 : 标签[炸弹人-角色]
 * 插件指令：>事件穿透关系 : 批量事件变量[21,22] : 添加标签 : 标签[炸弹人-角色]
 * 
 * 插件指令：>事件穿透关系 : 本事件 : 添加标签 : 标签[炸弹人-角色]
 * 插件指令：>事件穿透关系 : 本事件 : 去除标签 : 标签[炸弹人-角色]
 * 
 * 1.插件指令前面部分（本事件）和后面设置（添加标签 : 标签[炸弹人-角色]）可以随意组合。
 *   一共有6*2种组合方式。
 * 1.添加标签后，具有相同标签的物体之间相互可以穿透。
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
 * 测试方法：   在炸弹人管理层、华容道关卡中，测试性能。
 * 测试结果：   200个事件的地图中，消耗为：【8.88ms】
 *              100个事件的地图中，消耗为：【5.45ms】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为单次执行，但是由于事件一体化、炸弹人管理层中，频繁
 *   使用该插件中的函数，能稍微看到一点点消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令。
 * [v1.2]
 * 添加了插件性能测试说明。
 * [v1.3]
 * 优化了穿透数据判定关系。
 * [v1.4]
 * 修改了插件分类。
 * [v1.5]
 * 优化了内部结构。
 * 
 * 
 * 
 * @param 玩家穿透标签
 * @type text[]
 * @desc 玩家具有的穿透标签。
 * @default ["炸弹人-角色","穿透玩家"]
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ETh （Event_Through）
//		临时全局变量	DrillUp.g_ETh_xxx
//		临时局部变量	this._drill_ETh_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	炸弹管理层、华容道关卡
//		★性能测试消耗	3.81ms ~ 8.88ms （200事件的物体管理层）
//		★最坏情况		无	
//		★备注			偶尔能出现，但消耗还是不多。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			->☆原型链规范（isCollided）
//
//			->☆物体的属性
//			->☆穿透判断
//				->穿透判断（物体基类） - 物体碰撞（与事件）
//				->穿透判断（物体基类） - 物体碰撞（与载具）
//				->穿透判断（物体基类） - 物体碰撞（与玩家）
//				->穿透判断（事件） - 物体碰撞（与事件）
//				->穿透判断（事件） - 物体碰撞（与载具）
//				->穿透判断（事件） - 物体碰撞（与玩家）
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.碰撞关系见：Game_CharacterBase.prototype.canPass
//			2.旧版本错误判定：eventsXyNt + isNormalPriority 【穿透性 + 优先级 同时满足】才阻塞。 
//			  修正版本后判定：pos + drill_ETh_canThroughTagList 【指定位置 + 含同类标签】才穿透。
//			  注意，只判断穿透情况，让穿透就穿透（返回false），其他情况【不要覆盖】了。
//		
//		★其它说明细节：
//			1.关于同类标签：事件判定比较绕，因为专门区分了 事件、玩家、载具 的关系，以及地图本身的穿透性问题。
//			  原理为：eventsXyNt + isNormalPriority 根据 穿透性 + 优先级 二者进行判断。
//		 	  二者都为true，才算作这个事件阻挡了你，不可通行。
//			    Game_CharacterBase.prototype.isCollidedWithCharacters
//			    Game_Event.prototype.isCollidedWithCharacters
//			  注意，event继承了characters的碰撞方法，并且单独添加了自己与玩家之间的碰撞条件。
//			2.碰撞关系：（Game_CharacterBase.prototype.canPass）
//			  1).是否超出地图 
//			  2).自身是否穿透 
//			  3).从某方向进入图块是否可行（验证两个图块相交的两个可通行设置）
//			  4).是否被事件阻止
//				4.1这个事件是否穿透
//				4.2这个事件是否为同级
//				4.3是否为玩家
//			3.注意，要去除标签，【直接delete】，如果设为false，还要处理成json传进去一大堆麻烦事。
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
	DrillUp.g_ETh_PluginTip_curName = "Drill_EventThrough.js 体积-事件穿透关系";
	DrillUp.g_ETh_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_ETh_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_ETh_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventThrough = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventThrough');


	/*-----------------杂项------------------*/
	if( DrillUp.parameters['玩家穿透标签'] != undefined &&
		DrillUp.parameters['玩家穿透标签'] != "" ){
		DrillUp.g_ETh_player_tags = JSON.parse(DrillUp.parameters['玩家穿透标签']);
	}else{
		DrillUp.g_ETh_player_tags = [];
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_ETh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ETh_pluginCommand.call(this, command, args);
	if( command === ">事件穿透关系" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			//（事件+玩家）
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "玩家" ){
				c_chars = [ $gamePlayer ];
			}
			if( c_chars == null && unit == "领队" ){
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
					if( $gameMap.drill_ETh_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_ETh_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ETh_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ETh_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null ){	//（单个数字的事件id）
				var e_id = Number(unit);
				var e = $gameMap.event( e_id );
				if( e == undefined ){ return; }
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return };
		
		/*-----------------设置标签------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			temp3 = temp3.replace("标签[","");
			temp3 = temp3.replace("]","");
			
			if( type == "添加标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_ETh_addTag( temp3 );
				}
			}
			if( type == "去除标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_ETh_removeTag( temp3 );
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ETh_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_ETh_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_ETh_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_ETh_event_initMembers.call(this);
	this._drill_ETh_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_ETh_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ETh_event_setupPage.call(this);
    this.drill_ETh_setupEvent();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_ETh_setupEvent = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_ETh_isFirstBirth == true ){ 
		this._drill_ETh_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_ETh_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_ETh_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_ETh_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>事件穿透关系" ){	//=>事件穿透关系 : 穿透标签 : 炸弹人
				if( args.length >= 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					temp1 = temp1.replace("标签[","");
					temp1 = temp1.replace("]","");
					if( type == "穿透标签" || type == "绑定穿透标签" ){
						this.drill_ETh_addTag( temp1 );
					}
				}
			};
		};
	}, this);
};


//=============================================================================
// ** ☆原型链规范（isCollided）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体基类 - E可通行 - 判断 - 物体碰撞
//
//			说明：	> 碰撞返回true，没碰撞返回flase。
//==============================
//Game_CharacterBase.prototype.isCollidedWithCharacters = function( x, y ){
//    return this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y);
//};
//==============================
// * 物体基类 - E可通行 - 判断 - 物体碰撞（与事件）
//==============================
//Game_CharacterBase.prototype.isCollidedWithEvents = function( x, y ){
//    var events = $gameMap.eventsXyNt(x, y);
//    return events.some(function( event ){
//        return event.isNormalPriority();
//    });
//};
//==============================
// * 物体基类 - E可通行 - 判断 - 物体碰撞（与载具）
//==============================
//Game_CharacterBase.prototype.isCollidedWithVehicles = function( x, y ){
//    return $gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y);
//};
//==============================
// * 物体基类 - E可通行 - 判断 - 物体碰撞（与玩家）
//==============================
// （无）

//==============================
// * 物体 - E可通行 - 判断 - 物体碰撞
//
//			说明：	> 碰撞返回true，没碰撞返回flase。
//==============================
Game_Character.prototype.isCollidedWithCharacters = function( x, y ){
    return Game_CharacterBase.prototype.isCollidedWithCharacters.call( this, x, y );
};
//==============================
// * 物体 - E可通行 - 判断 - 物体碰撞（与事件）
//==============================
Game_Character.prototype.isCollidedWithEvents = function( x, y ){
    return Game_CharacterBase.prototype.isCollidedWithEvents.call( this, x, y );
};
//==============================
// * 物体 - E可通行 - 判断 - 物体碰撞（与载具）
//==============================
Game_Character.prototype.isCollidedWithVehicles = function( x, y ){
    return Game_CharacterBase.prototype.isCollidedWithVehicles.call( this, x, y );
};
//==============================
// * 物体 - E可通行 - 判断 - 物体碰撞（与玩家）
//==============================
// （无）

//==============================
// * 玩家 - E可通行 - 判断 - 物体碰撞
//
//			说明：	> 碰撞返回true，没碰撞返回flase。
//==============================
Game_Player.prototype.isCollidedWithCharacters = function( x, y ){
    return Game_Character.prototype.isCollidedWithCharacters.call( this, x, y );
};
//==============================
// * 玩家 - E可通行 - 判断 - 物体碰撞（与事件）
//==============================
Game_Player.prototype.isCollidedWithEvents = function( x, y ){
    return Game_Character.prototype.isCollidedWithEvents.call( this, x, y );
};
//==============================
// * 玩家 - E可通行 - 判断 - 物体碰撞（与载具）
//==============================
Game_Player.prototype.isCollidedWithVehicles = function( x, y ){
    return Game_Character.prototype.isCollidedWithVehicles.call( this, x, y );
};
//==============================
// * 玩家 - E可通行 - 判断 - 物体碰撞（与玩家）
//==============================
// （无）

//==============================
// * 玩家队员 - E可通行 - 判断 - 物体碰撞
//
//			说明：	> 碰撞返回true，没碰撞返回flase。
//==============================
Game_Follower.prototype.isCollidedWithCharacters = function( x, y ){
    return Game_Character.prototype.isCollidedWithCharacters.call( this, x, y );
};
//==============================
// * 玩家队员 - E可通行 - 判断 - 物体碰撞（与事件）
//==============================
Game_Follower.prototype.isCollidedWithEvents = function( x, y ){
    return Game_Character.prototype.isCollidedWithEvents.call( this, x, y );
};
//==============================
// * 玩家队员 - E可通行 - 判断 - 物体碰撞（与载具）
//==============================
Game_Follower.prototype.isCollidedWithVehicles = function( x, y ){
    return Game_Character.prototype.isCollidedWithVehicles.call( this, x, y );
};
//==============================
// * 玩家队员 - E可通行 - 判断 - 物体碰撞（与玩家）
//==============================
// （无）

//==============================
// * 事件 - E可通行 - 判断 - 物体碰撞
//
//			说明：	> 碰撞返回true，没碰撞返回flase。
//==============================
//Game_Event.prototype.isCollidedWithCharacters = function( x, y ){
//    return (Game_Character.prototype.isCollidedWithCharacters.call(this, x, y) ||
//            this.isCollidedWithPlayerCharacters(x, y));
//};
//==============================
// * 事件 - E可通行 - 判断 - 物体碰撞（与事件）
//==============================
//Game_Event.prototype.isCollidedWithEvents = function( x, y ){
//    var events = $gameMap.eventsXyNt(x, y);
//    return events.length > 0;
//};
//==============================
// * 事件 - E可通行 - 判断 - 物体碰撞（与载具）
//==============================
Game_Event.prototype.isCollidedWithVehicles = function( x, y ){
    return Game_Character.prototype.isCollidedWithVehicles.call( this, x, y );
};
//==============================
// * 事件 - E可通行 - 判断 - 物体碰撞（与玩家）
//==============================
//Game_Event.prototype.isCollidedWithPlayerCharacters = function( x, y ){
//    return this.isNormalPriority() && $gamePlayer.isCollided(x, y);
//};



//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_ETh_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_ETh_c_initMembers.call(this);
	this._drill_ETh_char = undefined;
}
//==============================
// * 物体的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_CharacterBase.prototype.drill_ETh_checkData = function(){
	if( this._drill_ETh_char != undefined ){ return; }
	this._drill_ETh_char = {};
}
//==============================
// * 物体的属性 - 标签
//==============================
Game_CharacterBase.prototype.drill_ETh_hasAnyTag = function(){
	if( this._drill_ETh_char == undefined ){ return false }
	var keys = Object.keys( this._drill_ETh_char );
	if( keys.length > 0 ){ return true; }
	return false;
}
//==============================
// * 物体的属性 - 标签 - 获取单个
//==============================
Game_CharacterBase.prototype.drill_ETh_hasTag = function( tag ){
	if( this._drill_ETh_char == undefined ){ return false; }
	return this._drill_ETh_char[ tag ] == true;
}
//==============================
// * 物体的属性 - 标签 - 获取列表
//==============================
Game_CharacterBase.prototype.drill_ETh_getTagList = function(){
	if( this._drill_ETh_char == undefined ){ return []; }
	return Object.keys( this._drill_ETh_char );
}
//==============================
// * 物体的属性 - 标签 - 添加单个
//==============================
Game_CharacterBase.prototype.drill_ETh_addTag = function( tag ){
	this.drill_ETh_checkData();
	this._drill_ETh_char[tag] = true;
}
//==============================
// * 物体的属性 - 标签 - 添加多个
//==============================
Game_CharacterBase.prototype.drill_ETh_addTagList = function( tag_list ){
	this.drill_ETh_checkData();
	for(var i = 0; i < tag_list.length; i++){
		this._drill_ETh_char[ tag_list[i] ] = true;
	}
}
//==============================
// * 物体的属性 - 标签 - 删除
//==============================
Game_CharacterBase.prototype.drill_ETh_removeTag = function( tag ){
	this.drill_ETh_checkData();
	this._drill_ETh_char[tag] = undefined;
	delete this._drill_ETh_char[tag];
}
//==============================
// * 物体的属性 - 玩家初始化 
//==============================
var _drill_ETh_p_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_drill_ETh_p_initialize.call(this);
	
	// > 玩家标签初始化
	this.drill_ETh_addTagList( DrillUp.g_ETh_player_tags );
	//alert(JSON.stringify(this._drill_ETh_char));
}


//=============================================================================
// ** ☆穿透判断
//
//			说明：	> 此模块专门根据 穿透情况 进行控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 穿透判断 - 同类标签判断（单个标签）
//
//			说明：	> 含标签返回true，不含返回false。
//==============================
Game_CharacterBase.prototype.drill_ETh_canThroughTag = function( tag ){
	return this.drill_ETh_hasTag( tag );
}
//==============================
// * 穿透判断 - 同类标签判断（多个标签）
//
//			说明：	> 含列表中任一标签返回true，全不含返回false。
//==============================
Game_CharacterBase.prototype.drill_ETh_canThroughTagList = function( tag_list ){
	for(var i=0; i < tag_list.length; i++){
		if( this.drill_ETh_hasTag( tag_list[i] ) == true ){
			return true;
		}
	}
	return false;
}
//==============================
// * 穿透判断 - 同类标签判断（指定位置的全部事件）
//
//			说明：	> 指定位置的阻塞事件，全部含同类标签返回true，只要有一个不含返回false。
//==============================
Game_CharacterBase.prototype.drill_ETh_canThroughEventsInPos = function( x, y ){
	
	var events = $gameMap.eventsXyNt(x, y);		//（事件列表 比较）
	for(var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._erased == true ){ continue; }
		
		var tag_list = temp_event.drill_ETh_getTagList();
		if( this.drill_ETh_canThroughTagList( tag_list ) == false ){
			return false;	//（同位置的事件里面，只要有一个事件阻塞，就无法穿透）
		}
	}
	return true;
}
//==============================
// * 穿透判断 - 获取事件 - 不可通行 + 与人物相同 + 不含同类标签（单个标签）
//==============================
Game_Map.prototype.drill_ETh_eventsXyNtEx1 = function( x, y, tag ){
    return this.events().filter(function(event) {
        return event.posNt(x, y) && !event.drill_ETh_canThroughTag(tag) && event.isNormalPriority() ;
    });
};
//==============================
// * 穿透判断 - 获取事件 - 不可通行 + 与人物相同 + 不含同类标签（多个标签）
//==============================
Game_Map.prototype.drill_ETh_eventsXyNtEx2 = function( x, y, tag_list ){
    return this.events().filter(function(event) {
        return event.posNt(x, y) && !event.drill_ETh_canThroughTagList(tag_list) && event.isNormalPriority() ;
    });
};


//==============================
// * 穿透判断 - 最后继承
//==============================
var _drill_ETh_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_ETh_scene_initialize.call(this);		//（此方法放到最后再继承）
	
	//==============================
	// * 穿透判断（物体基类） - 物体碰撞（与事件）『体积的阻塞与穿透』
	//
	//			说明：	> 只判断是否穿透，若穿透就返回false，注意其他判断返回值情况【不要覆盖】了。
	//==============================
	var _drill_ETh_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
	Game_CharacterBase.prototype.isCollidedWithEvents = function( x, y ){
		
		if( this.drill_ETh_hasAnyTag() ){
			var canThough = this.drill_ETh_canThroughEventsInPos( x, y );	//（事件 比较）
			if( canThough == true ){
				return false;
			}
		}
		
		// > 原函数
		return _drill_ETh_isCollidedWithEvents.call( this, x, y );
	};
	//==============================
	// * 穿透判断（物体基类） - 物体碰撞（与载具）『体积的阻塞与穿透』
	//
	//			说明：	> 只判断是否穿透，若穿透就返回false，注意其他判断返回值情况【不要覆盖】了。
	//==============================
	var _drill_ETh_isCollidedWithVehicles = Game_CharacterBase.prototype.isCollidedWithVehicles;
	Game_CharacterBase.prototype.isCollidedWithVehicles = function( x, y ){
		
		if( this.drill_ETh_hasAnyTag() ){
			if( $gameMap.boat().posNt(x, y) == true ){	//（小船 比较）
				var tagList_boat = $gameMap.boat().drill_ETh_getTagList();
				if( this.drill_ETh_canThroughTagList( tagList_boat ) == true ){
					return false;
				}
			}
			if( $gameMap.ship().posNt(x, y) == true ){	//（大船 比较）
				var tagList_ship = $gameMap.ship().drill_ETh_getTagList();
				if( this.drill_ETh_canThroughTagList( tagList_ship ) == true ){
					return false;
				}
			}
		}
		
		// > 原函数
		return _drill_ETh_isCollidedWithVehicles.call( this, x, y );
	};
	//==============================
	// * 穿透判断（物体基类） - 物体碰撞（与玩家）『体积的阻塞与穿透』
	//==============================
	// （无）
	
	//==============================
	// * 穿透判断（事件） - 物体碰撞（与事件）『体积的阻塞与穿透』
	//
	//			说明：	> 只判断是否穿透，若穿透就返回false，注意其他判断返回值情况【不要覆盖】了。
	//==============================
	var _drill_ETh_isCollidedWithEvents2 = Game_Event.prototype.isCollidedWithEvents;
	Game_Event.prototype.isCollidedWithEvents = function( x, y ){
		
		if( this.drill_ETh_hasAnyTag() ){
			var canThough = this.drill_ETh_canThroughEventsInPos( x, y );	//（事件 比较）
			if( canThough == true ){
				return false;
			}
		}
		
		// > 原函数
		return _drill_ETh_isCollidedWithEvents2.call( this, x, y );
	};
	//==============================
	// * 穿透判断（事件） - 物体碰撞（与载具）『体积的阻塞与穿透』
	//==============================
	// （无）
	//==============================
	// * 穿透判断（事件） - 物体碰撞（与玩家）『体积的阻塞与穿透』
	//
	//			说明：	> 只判断是否穿透，若穿透就返回false，注意其他判断返回值情况【不要覆盖】了。
	//==============================
	var _drill_ETh_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
	Game_Event.prototype.isCollidedWithPlayerCharacters = function( x, y ){
		
		if( this.drill_ETh_hasAnyTag() ){
			if( $gamePlayer.isCollided(x, y) ){			//（玩家 比较）
				var tagList_player = $gamePlayer.drill_ETh_getTagList();
				if( this.drill_ETh_canThroughTagList( tagList_player ) == true ){
					return false;
				}
			}
		}
		
		// > 原函数
		return _drill_ETh_isCollidedWithPlayerCharacters.call(this,x,y);
	};
}

