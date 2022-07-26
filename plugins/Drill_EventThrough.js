//=============================================================================
// Drill_EventThrough.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        体积 - 事件穿透关系
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventThrough +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得具有相同 穿透标签 的事件之间能相互穿透。
 * ★★尽量放在 物体 插件的靠后位置★★
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
 *   (1.直接勾选事件穿透，则无视所有直接穿透，不存在任何筛选穿透关系。
 *      并且事件可以在地图任何角落行走/漂浮，无视图块的通行情况。
 * 事件穿透：
 *   (1.事件可以拥有多个不同的穿透标签。
 *   (2.如果你想做事件A能穿透B和C，但是BC之间并不能穿透的效果。
 *      那么你需要设置AB为一个标签，AC为另一个标签。
 *   (3.该插件放在任意位置都不会出bug，只是如果它放在跳跃插件的后面时，
 *      跳跃插件就不知道事件之间存在的穿透关系，而识别为障碍物，所以该
 *      插件最好尽量往前面放。
 * 设计：
 *   (1.你可以根据穿透关系，可以设置敌人不能穿过的墙 或 玩家不能进入
 *      的NPC区域。例如，小爱丽丝具备标签："穿透板子"，而玩家不具备。
 *      这样，玩家就会被板子挡住去路，而小爱丽丝不会。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 如果你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有空格）
 * 
 * 事件注释：=>事件穿透关系 : 穿透标签 : 炸弹人-角色
 * 事件注释：=>事件穿透关系 : 穿透标签 : 穿透玩家
 * 
 * 1.其中"炸弹人-角色"与"穿透玩家"是完全可以自定义的条件关键字。
 * 2.设置后，如果事件的关键字与其他事件或者玩家的标签对应上，将会相互
 *   穿透。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置这些穿透标签：
 * （注意，冒号左右有空格）
 *
 * 插件指令：>事件穿透关系 : 玩家 : 添加标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 玩家 : 去除标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 本事件 : 添加标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 本事件 : 去除标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 事件[10] : 添加标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 事件[10] : 去除标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 事件变量[10] : 添加标签 : 炸弹人-角色
 * 插件指令：>事件穿透关系 : 事件变量[10] : 去除标签 : 炸弹人-角色
 *
 * 1.你可以指定某个事件"事件[n]"，或者变量对应的事件id号"事件变量[n]"。
 * 2.玩家添加了炸弹人标签后，表示进入了整个"炸弹人-角色"群体，它们两两
 *   之间全都可以穿透。
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
 * 
 * 
 * 
 * @param 玩家穿透标签
 * @type text[]
 * @desc 玩家具有的穿透标签。
 * @default ["炸弹人-角色","穿透玩家"]
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ETh （Event_Through）
//		临时全局变量	DrillUp.g_ETh_xxx
//		临时局部变量	this._drill_ETh_xxxx
//		存储数据变量	【无】玩家穿透存在$gamePlayer中
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
//		★大体框架与功能如下：
//			事件穿透关系：
//				->穿透标签
//				->事件之间穿透
//				->事件与玩家穿透
//
//		★必要注意事项：
//			1.碰撞关系见：Game_CharacterBase.prototype.canPass
//			2.旧版本错误判定：eventsXyNt + isNormalPriority 【穿透性 + 优先级 同时满足】才阻塞。 
//			  修正版本后判定：pos + drill_ETh_canThroughTagList 【指定位置 + 含同类穿透】才穿透。
//			  注意，只判断穿透情况，让穿透就穿透（返回false），其他情况【不要覆盖】了。
//		
//		★其它说明细节：
//			1.关于同类穿透：事件判定比较绕，因为专门区分了 事件、玩家、载具 的关系，以及地图本身的穿透性问题。
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
// ** 变量获取
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
// * 插件指令
//=============================================================================
var _drill_ETh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ETh_pluginCommand.call(this, command, args);
	if( command === ">事件穿透关系" ){
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			
			if( temp1 == "玩家" && type == "添加标签" ){
				$gamePlayer._drill_ETh_char[temp3] = true;
			}
			if( temp1 == "玩家" && type == "去除标签" ){
				delete $gamePlayer._drill_ETh_char[temp3];
			}
			
			if( temp1 == "本事件" ){
				var e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				var e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				var e_id = $gameVariables.value(Number(temp1));
			}
			if( e_id == undefined ){		//兼容旧版本设置
				var e_id = Number(temp1);
			}
			if( e_id && type == "添加标签" ){
				if( $gameMap.drill_ETh_isEventExist( e_id ) == false ){ return; }
				$gameMap.event(e_id)._drill_ETh_char[temp3] = true;
			}
			if( e_id && type == "去除标签" ){
				if( $gameMap.drill_ETh_isEventExist( e_id ) == false ){ return; }
				delete $gameMap.event(e_id)._drill_ETh_char[temp3];
			}
			
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ETh_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventThrough.js 体积 - 事件穿透关系】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_ETh_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ETh_setupPage.call(this);
    this.drill_ETh_setupThough();
};
Game_Event.prototype.drill_ETh_setupThough = function() {
	//this._drill_ETh_char = {};	（不刷新穿透设置）
	if( !this._erased && this.page() ){ this.list().forEach(function(l) {
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>事件穿透关系" ){	//=>事件穿透关系 : 穿透标签 : 炸弹人
				if(args.length >= 4){
					if(args[1]){ var type = String(args[1]); }
					if(args[3]){ var temp1 = String(args[3]); }
					if(args[5]){ var temp2 = String(args[5]); }
					if( type == "穿透标签" ){
						this._drill_ETh_char[temp1] = true;
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// * 物体（ 事件、玩家 的父类 ）
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_ETh_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_ETh_c_initMembers.call(this);
	this._drill_ETh_char = {};
}
//==============================
// * 物体 - 同类穿透
//==============================
Game_CharacterBase.prototype.drill_ETh_hasThroughTag = function() {
	if( !this._drill_ETh_char ){ return false }
	for(var i in this._drill_ETh_char ){ return true; }
	return false;
}
//==============================
// * 物体 - 同类穿透判断（单标签）
//
//			说明：	含标签返回true，不含返回false。
//==============================
Game_CharacterBase.prototype.drill_ETh_canThroughTag = function(tag) {
	return this._drill_ETh_char[tag] === true ;
}
//==============================
// * 物体 - 同类穿透判断（标签列表）
//
//			说明：	含任一标签返回true，不含返回false。
//==============================
Game_CharacterBase.prototype.drill_ETh_canThroughTagList = function(tag_list) {
	for(var i=0; i< tag_list.length; i++){
		if( this._drill_ETh_char[tag_list[i]] === true ){
			return true;
		}
	}
	return false;
}
//==============================
// * 物体 - 获取事件 - 不可通行 + 玩家同级 + 不含同类穿透（单标签）
//==============================
Game_Map.prototype.drill_ETh_eventsXyNtEx1 = function( x, y, tag ){
    return this.events().filter(function(event) {
        return event.posNt(x, y) && !event.drill_ETh_canThroughTag(tag) && event.isNormalPriority() ;
    });
};
//==============================
// * 物体 - 获取事件 - 不可通行 + 玩家同级 + 不含同类穿透（标签列表）
//==============================
Game_Map.prototype.drill_ETh_eventsXyNtEx2 = function( x, y, tag_list ){
    return this.events().filter(function(event) {
        return event.posNt(x, y) && !event.drill_ETh_canThroughTagList(tag_list) && event.isNormalPriority() ;
    });
};
//==============================
// * 物体 - 获取事件 - 指定位置 + 含同类穿透（标签列表）
//==============================
Game_Map.prototype.drill_ETh_eventsXyTag = function( x, y, tag_list ){
    return this.events().filter(function(event) {
        return event.pos(x, y) && event.drill_ETh_canThroughTagList(tag_list) == true ;
    });
};
//==============================
// * 物体 - 同类穿透判定
//
//			说明：	注意，只判断穿透情况，让穿透就穿透（返回false），其他情况【不要覆盖】了。
//					（旧版本直接return，把 制动开关的阻塞 的功能给覆盖了。）
//==============================
var _drill_ETh_isCollidedWithCharacters = Game_CharacterBase.prototype.isCollidedWithCharacters;
Game_CharacterBase.prototype.isCollidedWithCharacters = function(x, y) {
    if( this.drill_ETh_hasThroughTag() ){
		var block_chars = $gameMap.drill_ETh_eventsXyTag(x, y, Object.keys(this._drill_ETh_char) );
		if( block_chars.length > 0 ){
			return false;
		}
    }
	return _drill_ETh_isCollidedWithCharacters.call(this, x, y );
};


//=============================================================================
// ** 玩家
//=============================================================================
//==============================
// * 玩家 - 初始化 
//==============================
var _drill_ETh_p_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_drill_ETh_p_initialize.call(this);
	for(var i =0; i< DrillUp.g_ETh_player_tags.length ;i++){
		this._drill_ETh_char[ DrillUp.g_ETh_player_tags[i] ] = true;
	}
	//alert(JSON.stringify(this._drill_ETh_char));
}
//==============================
// * 事件 对 玩家 同类穿透判定
//
//			说明：	注意，只判断穿透情况，让穿透就穿透（碰撞返回false），其他情况【不要覆盖】了。
//==============================
var _drill_ETh_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function( x, y ){
    if( this.drill_ETh_hasThroughTag() ){
		if( $gamePlayer.isCollided(x, y) && 	//（与玩家碰撞时，有任何的标签符合，则穿透）
			this.drill_ETh_canThroughTagList( Object.keys($gamePlayer._drill_ETh_char) ) == true ){
			return false;
		}
	}
	return _drill_ETh_isCollidedWithPlayerCharacters.call(this,x,y);
};

