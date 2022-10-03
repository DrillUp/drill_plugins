//=============================================================================
// Drill_EventDirection.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 事件转向
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventDirection +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以让事件/玩家执行转向操作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfMoveRoute      移动路线 - 移动路线核心★★v1.7以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 细节：
 *   (1.插件指令执行后会立即转向。
 *      但是如果 朝向被锁定，那么转向会失效。
 *   (2.朝向锁定情况包括：
 *      固定朝向时、玩家和事件正在对话时相互面对时、朝向一体化插件时。
 * 特殊情况：
 *   (1.如果你站在 光滑图块 上，需要强制转向，
 *      可以使用插件指令强制转向，但是执行指令时会有停顿时间差。
 *      所以最好直接用 光滑图块插件 本身提供的 转向毯功能 设置转向。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置移动路线指令，控制事件转向：
 * （注释冒号两边都有一个空格，移动路线两边没有空格）
 * 
 * 移动路线指令：>朝向上方
 * 移动路线指令：>朝向下方
 * 移动路线指令：>朝向左方
 * 移动路线指令：>朝向右方
 * 
 * 1.在指定的移动路线中添加指令，即可实现事件转向。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用下面插件指令操作事件转向：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>事件转向 : 玩家 : 朝向上方
 * 插件指令：>事件转向 : 本事件 : 朝向上方
 * 插件指令：>事件转向 : 事件[10] : 朝向上方
 * 插件指令：>事件转向 : 事件变量[21] : 朝向上方
 * 插件指令：>事件转向 : 批量事件[10,11] : 朝向上方
 * 插件指令：>事件转向 : 批量事件变量[21,22] : 朝向上方
 * 
 * 插件指令：>事件转向 : 本事件 : 朝向上方
 * 插件指令：>事件转向 : 本事件 : 朝向下方
 * 插件指令：>事件转向 : 本事件 : 朝向左方
 * 插件指令：>事件转向 : 本事件 : 朝向右方
 * 插件指令：>事件转向 : 本事件 : 右转90度
 * 插件指令：>事件转向 : 本事件 : 左转90度
 * 插件指令：>事件转向 : 本事件 : 朝向反方向
 * 插件指令：>事件转向 : 本事件 : 随机朝向
 * 插件指令：>事件转向 : 本事件 : 朝向 : 玩家
 * 插件指令：>事件转向 : 本事件 : 朝向 : 事件[10]
 * 插件指令：>事件转向 : 本事件 : 朝向 : 事件变量[21]
 * 插件指令：>事件转向 : 本事件 : 背向 : 玩家
 * 插件指令：>事件转向 : 本事件 : 背向 : 事件[10]
 * 插件指令：>事件转向 : 本事件 : 背向 : 事件变量[21]
 * 插件指令：>事件转向 : 本事件 : 模仿朝向于 : 玩家
 * 插件指令：>事件转向 : 本事件 : 模仿朝向于 : 事件[10]
 * 插件指令：>事件转向 : 本事件 : 模仿朝向于 : 事件变量[21]
 * 插件指令：>事件转向 : 本事件 : 模仿反向于 : 玩家
 * 插件指令：>事件转向 : 本事件 : 模仿反向于 : 事件[10]
 * 插件指令：>事件转向 : 本事件 : 模仿反向于 : 事件变量[21]
 * 
 * 1.前面部分（本事件）和后面设置（朝向上方）可以随意组合。
 *   一共有6*20种组合方式。
 * 3."模仿朝向于"表示 事件 模仿 玩家的朝向，
 *   "模仿反向于"表示 事件 模仿 玩家的朝向并朝反方向。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 斜向朝向
 * 你可以使用下面插件指令操作事件斜向的朝向：
 * 
 * 插件指令：>事件转向 : 本事件 : 朝向左上方
 * 插件指令：>事件转向 : 本事件 : 朝向左下方
 * 插件指令：>事件转向 : 本事件 : 朝向右上方
 * 插件指令：>事件转向 : 本事件 : 朝向右下方
 * 
 * 1.前面部分（本事件）和后面设置（朝向上方）可以随意组合。
 *   一共有6*4种组合方式。
 * 2.注意，斜向朝向 只影响 向前/向后一步 时，是否为斜向行走的情况。
 *   不会影响事件的行走图贴图以及其他设定。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 反射朝向
 * 你可以通过设置事件注释，控制事件反射的朝向：
 * 
 * 插件指令：>事件转向 : 本事件 : 按/反射方向
 * 插件指令：>事件转向 : 本事件 : 按\反射方向
 * 插件指令：>事件转向 : 本事件 : 按|反射方向
 * 插件指令：>事件转向 : 本事件 : 按-反射方向
 * 
 * 1.前面部分（本事件）和后面设置（朝向上方）可以随意组合。
 *   一共有6*4种组合方式。
 * 2."按|反射方向"表示物体在竖直板上的弹射方向变化，
 *   比如朝右反射"|"后，会变成朝左弹回；朝上朝下则不变。
 *   斜向进入时，会以斜向方法垂直弹走。
 * 3."按/反射方向"表示物体在倾斜板上的弹射方向变化，
 *   比如朝右反射"/"后，会变成朝上；朝下反射"/"后，会变成朝左。
 *   斜向进入时，如果是横向入射，则弹回，竖直入射则不变。
 * 4.具体反射情况去 示例中的物体管理层 发射弹丸区域去看看，
 *   文字的描述表达有限。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 随机朝向
 * 你可以通过设置事件注释，控制事件初始的朝向：
 * 
 * 事件注释：=>事件转向 : 当前事件页随机朝向
 * 事件注释：=>事件转向 : 当前事件页随机朝向(固定随机种子)
 * 
 * 1.该事件注释针对指定事件页生效，设置后，切换到事件页后会随机朝向。
 *   注意，这里的随机朝向只含 上下左右，仅用于方便行走图定义用。
 * 2.默认情况下，如果玩家离开重进地图，那么转向会再次随机。
 *   "固定随机种子"可以使得玩家重进地图，转向不再随机变化，而是固定的随机值。
 * 3.该设置能够和 行走图-锁定帧 插件合并使用。
 *   顺序固定为 先执行随机朝向，再永久锁定帧。
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
 * 测试方法：   在物体触发管理层中，设置20个事件使用转向指令。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于事件转向都是单次执行的插件指令，所以消耗并不高。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		EDi (Event_Direction)
//		临时全局变量	无
//		临时局部变量	this._drill_EDi_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	弹丸反射关卡
//		★性能测试消耗	1.32ms（pluginCommand）
//		★最坏情况		暂无
//		★备注			主要是单次执行的指令，基本找不到性能消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件转向：
//				->插件指令
//				->移动路线指令
//				->斜向朝向
//					->45度角前进移动
//				->反射转向
//					->垂直反射
//					->斜向反射
//					->45度角反射 x
//				->事件页随机朝向
//					> 固定四个朝向
//		
//		★必要注意事项：
//			1.这里 斜向反射，是该插件单独控制的功能，仅对 前进一步/后退一步 有效。
//
//		★其它说明细节：
//          1.注意，如果 事件和玩家 的位置重合，则事件的"朝向玩家"指令是无效的，事件仍然保持原朝向。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventDirection = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventDirection');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfMoveRoute ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EDi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EDi_pluginCommand.call(this, command, args);
	if( command === ">事件转向" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "玩家" ){
				var e = $gameMap.event( this._eventId );
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
					if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 	
		
		/*-----------------朝向------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "朝向上方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].setDirection(8);
				}
			}
			if( type == "朝向下方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].setDirection(2);
				}
			}
			if( type == "朝向左方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].setDirection(4);
				}
			}
			if( type == "朝向右方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].setDirection(6);
				}
			}
			if( type == "右转90度" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].turnRight90();
				}
			}
			if( type == "左转90度" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].turnLeft90();
				}
			}
			if( type == "朝向反方向" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].turn180();
				}
			}
			if( type == "随机朝向" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].turnRandom();
				}
			}
			
			if( type == "朝向左上方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_setDirection(4,true);
				}
			}
			if( type == "朝向左下方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_setDirection(2,true);
				}
			}
			if( type == "朝向右上方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_setDirection(8,true);
				}
			}
			if( type == "朝向右下方" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_setDirection(6,true);
				}
			}
			
			if( type == "按/反射方向" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_reflectByLeftSlash();
				}
			}
			if( type == "按\\反射方向" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_reflectByRightSlash();
				}
			}
			if( type == "按|反射方向" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_reflectByVertical();
				}
			}
			if( type == "按-反射方向" ){
				for( var i=0; i < c_chars.length; i++ ){
					c_chars[i].drill_EDi_reflectByHorizontal();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "朝向" ){
				if( temp1 == "玩家" ){
					for( var i=0; i < c_chars.length; i++ ){
						c_chars[i].turnTowardCharacter($gamePlayer);
					}
					
				}else if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					var e_id = Number(temp1);
					if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					for( var i=0; i < c_chars.length; i++ ){
						c_chars[i].turnTowardCharacter( e );
					}
					
				}else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					var e_id = $gameVariables.value(Number(temp1));
					if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					for( var i=0; i < c_chars.length; i++ ){
						c_chars[i].turnTowardCharacter( e );
					}
				}
			}
			if( type == "背向" ){
				if( temp1 == "玩家" ){
					for( var i=0; i < c_chars.length; i++ ){
						c_chars[i].turnAwayFromCharacter($gamePlayer);
					}
					
				}else if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					var e_id = Number(temp1);
					if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					for( var i=0; i < c_chars.length; i++ ){
						c_chars[i].turnAwayFromCharacter( e );
					}
					
				}else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					var e_id = $gameVariables.value(Number(temp1));
					if( $gameMap.drill_EDi_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					for( var i=0; i < c_chars.length; i++ ){
						c_chars[i].turnAwayFromCharacter( e );
					}
				}
			}
			if (type == "模仿朝向于") {
			    if (temp1 == "玩家") {
			        for (var i = 0; i < c_chars.length; i++) {
			            c_chars[i].setDirection($gamePlayer.direction());
			        }

			    } else if (temp1.indexOf("事件[") != -1) {
			        temp1 = temp1.replace("事件[", "");
			        temp1 = temp1.replace("]", "");
			        var e_id = Number(temp1);
			        if ($gameMap.drill_EDi_isEventExist(e_id) == false) { return; }
			        var e = $gameMap.event(e_id);
			        for (var i = 0; i < c_chars.length; i++) {
			            c_chars[i].setDirection(e.direction());
			        }

			    } else if (temp1.indexOf("事件变量[") != -1) {
			        temp1 = temp1.replace("事件变量[", "");
			        temp1 = temp1.replace("]", "");
			        var e_id = $gameVariables.value(Number(temp1));
			        if ($gameMap.drill_EDi_isEventExist(e_id) == false) { return; }
			        var e = $gameMap.event(e_id);
			        for (var i = 0; i < c_chars.length; i++) {
			            c_chars[i].setDirection(e.direction());
			        }
			    }
			}
			if (type == "模仿反向于") {
			    if (temp1 == "玩家") {
			        for (var i = 0; i < c_chars.length; i++) {
			            c_chars[i].setDirection($gamePlayer.reverseDir($gamePlayer.direction()));
			        }

			    } else if (temp1.indexOf("事件[") != -1) {
			        temp1 = temp1.replace("事件[", "");
			        temp1 = temp1.replace("]", "");
			        var e_id = Number(temp1);
			        if ($gameMap.drill_EDi_isEventExist(e_id) == false) { return; }
			        var e = $gameMap.event(e_id);
			        for (var i = 0; i < c_chars.length; i++) {
			            c_chars[i].setDirection(e.reverseDir(e.direction()));
			        }

			    } else if (temp1.indexOf("事件变量[") != -1) {
			        temp1 = temp1.replace("事件变量[", "");
			        temp1 = temp1.replace("]", "");
			        var e_id = $gameVariables.value(Number(temp1));
			        if ($gameMap.drill_EDi_isEventExist(e_id) == false) { return; }
			        var e = $gameMap.event(e_id);
			        for (var i = 0; i < c_chars.length; i++) {
			            c_chars[i].setDirection(e.reverseDir(e.direction()));
			        }
			    }
			}
		}
	}
}
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EDi_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventDirection.js 物体 - 事件转向】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 移动路线设置
//=============================================================================
//==============================
// * 指令 - 执行移动路线指令（继承）
//==============================
var _drill_EDi_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	_drill_EDi_routeCommand.call( this, command, args );
	if( args.length == 0 && command == ">朝向上方" ){
		this.setDirection(8);
	}
	if( args.length == 0 && command == ">朝向下方" ){
		this.setDirection(2);
	}
	if( args.length == 0 && command == ">朝向左方" ){
		this.setDirection(4);
	}
	if( args.length == 0 && command == ">朝向右方" ){
		this.setDirection(6);
	}
};


//=============================================================================
// ** 事件页随机朝向
//=============================================================================
//==============================
// * 事件页 - 注释初始化
//==============================
var _drill_EDi_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	this.drill_EDi_setupPage();
	_drill_EDi_event_setupPage.call(this);
};
Game_Event.prototype.drill_EDi_setupPage = function() {
    if( this._pageIndex < 0 ){ return; }
    if( this._erased != false ){ return; }
	var page = this.page();
    if( page == undefined ){ return; }
	
	var li = this.list();
	for(var k=0; k < li.length; k++){
		var l = li[k];
		if( l.code !== 108 ){ continue; }
		var args = l.parameters[0].split(' ');
		var command = args.shift();
		if( command == "=>事件转向" ){
			if( args.length == 2 ){			//=>事件转向 : 当前事件页随机朝向
				var type = String(args[1]);
				if( type == "当前事件页随机朝向" ){
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 朝向设置
						page.image.direction = 2 + Math.randomInt(4)*2;
					}
					
				}
				if( type == "当前事件页随机朝向(固定随机种子)" ){
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 随机种子（与 地图id、事件id、事件页id 相关）
						var seed = this._mapId * this._eventId * (this._pageIndex+1) + this._eventId * this._eventId - this._pageIndex +11;
						var ran = this.drill_EDi_getRandomInSeed( seed );
						
						// > 朝向设置
						page.image.direction = 2 + Math.floor(ran*4) *2;
					}
					
				}
			}
		};
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
Game_Event.prototype.drill_EDi_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};

//=============================================================================
// ** 斜向朝向
//=============================================================================
//==============================
// * 物体 - 设置朝向
//==============================
var _drill_EDi_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	_drill_EDi_initialize.call(this);
	this._drill_EDi_directionDiagonal = false;
}
//==============================
// * 物体 - 设置朝向
//
//			说明：	（参数d： 2下/4左/6右/8上）
//==============================
var _drill_EDi_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function( d ){
	_drill_EDi_setDirection.call( this, d );
	if( this.isDirectionFixed() == false ){
		this._drill_EDi_directionDiagonal = false;
	}
}
//==============================
// * 物体 - 设置朝向（含斜向）
//
//			说明：	（参数d： 2下/4左/6右/8上，斜向d：2左下/4左上/6右下/8右上）
//==============================
Game_CharacterBase.prototype.drill_EDi_setDirection = function( d, b ){
	this.setDirection(d);
	this._drill_EDi_directionDiagonal = b;
}
//==============================
// * 物体 - 判断是否斜向
//==============================
Game_CharacterBase.prototype.drill_EDi_isDirectionDiagonal = function(){
	return this._drill_EDi_directionDiagonal;
}
//==============================
// * 物体 - 获取斜向朝向分量
//
//			说明：	比如 2 + 斜向标记 = 2,4方向。返回[4,2]。
//==============================
Game_CharacterBase.prototype.drill_EDi_getDiagonalDirection = function( d ){
	if( this.direction() == 2 ){ return [4,2]; }
	else if( this.direction() == 4 ){ return [4,8]; }
	else if( this.direction() == 6 ){ return [6,2]; }
	else if( this.direction() == 8 ){ return [6,8]; }
	return [];
}
//==============================
// * 物体 - 移动 - 执行移动（斜向）
//==============================
var _drill_EDi_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function( horz, vert ){
	var b = this._drill_EDi_directionDiagonal;
	_drill_EDi_moveDiagonally.call( this, horz, vert );
	this._drill_EDi_directionDiagonal = b;		//（保持斜向）
}
//==============================
// * 物体 - 移动 - 前进一步（斜向，半覆写）
//==============================
var _drill_EDi_moveForward = Game_Character.prototype.moveForward;
Game_Character.prototype.moveForward = function(){
	if( this.drill_EDi_isDirectionDiagonal() ){
		
		if( this.direction() == 2 ){ this.moveDiagonally(4,2); }
		else if( this.direction() == 4 ){ this.moveDiagonally(4,8); }
		else if( this.direction() == 6 ){ this.moveDiagonally(6,2); }
		else if( this.direction() == 8 ){ this.moveDiagonally(6,8); }
		
	}else{
		_drill_EDi_moveForward.call(this);
	}
}
//==============================
// * 物体 - 移动 - 后退一步（斜向，半覆写）
//==============================
var _drill_EDi_moveBackward = Game_Character.prototype.moveBackward;
Game_Character.prototype.moveBackward = function(){
	if( this.drill_EDi_isDirectionDiagonal() ){
		var lastDirectionFix = this.isDirectionFixed();
		this.setDirectionFix(true);
		
		if( this.reverseDir(this.direction()) == 2 ){ this.moveDiagonally(4,2); }
		else if( this.reverseDir(this.direction()) == 4 ){ this.moveDiagonally(4,8); }
		else if( this.reverseDir(this.direction()) == 6 ){ this.moveDiagonally(6,2); }
		else if( this.reverseDir(this.direction()) == 8 ){ this.moveDiagonally(6,8); }
		
		this.setDirectionFix(lastDirectionFix);
	}else{
		_drill_EDi_moveBackward.call(this);
	}
}


//=============================================================================
// ** 反射朝向
//=============================================================================
//==============================
// * 事件转向 - 按/反射方向
//==============================
Game_Character.prototype.drill_EDi_reflectByLeftSlash = function(){
	
	// > 斜向入射
	if( this.drill_EDi_isDirectionDiagonal() ){
		if( this.direction() == 6 ){ this.drill_EDi_setDirection(4,true); }
		else if( this.direction() == 4 ){ this.drill_EDi_setDirection(6,true); }
		
	// > 垂直入射
	}else{
		if( this.direction() == 6 ){ this.setDirection(8); }
		else if( this.direction() == 8 ){ this.setDirection(6); }
		else if( this.direction() == 2 ){ this.setDirection(4); }
		else if( this.direction() == 4 ){ this.setDirection(2); }
	}
}
//==============================
// * 事件转向 - 按\反射方向
//==============================
Game_Character.prototype.drill_EDi_reflectByRightSlash = function(){
	
	// > 斜向入射
	if( this.drill_EDi_isDirectionDiagonal() ){
		if( this.direction() == 2 ){ this.drill_EDi_setDirection(8,true); }
		else if( this.direction() == 8 ){ this.drill_EDi_setDirection(2,true); }
		
	// > 垂直入射
	}else{
		if( this.direction() == 6 ){ this.setDirection(2); }
		else if( this.direction() == 2 ){ this.setDirection(6); }
		else if( this.direction() == 8 ){ this.setDirection(4); }
		else if( this.direction() == 4 ){ this.setDirection(8); }
	}
}
//==============================
// * 事件转向 - 按|反射方向
//==============================
Game_Character.prototype.drill_EDi_reflectByVertical = function(){
	
	// > 斜向入射
	if( this.drill_EDi_isDirectionDiagonal() ){
		if( this.direction() == 6 ){ this.drill_EDi_setDirection(2,true); }
		else if( this.direction() == 2 ){ this.drill_EDi_setDirection(6,true); }
		else if( this.direction() == 8 ){ this.drill_EDi_setDirection(4,true); }
		else if( this.direction() == 4 ){ this.drill_EDi_setDirection(8,true); }
		
	// > 垂直入射
	}else{
		if( this.direction() == 6 ){ this.setDirection(4); }
		else if( this.direction() == 4 ){ this.setDirection(6); }
	}
}
//==============================
// * 事件转向 - 按-反射方向
//==============================
Game_Character.prototype.drill_EDi_reflectByHorizontal = function(){
	
	// > 斜向入射
	if( this.drill_EDi_isDirectionDiagonal() ){
		if( this.direction() == 6 ){ this.drill_EDi_setDirection(8,true); }
		else if( this.direction() == 8 ){ this.drill_EDi_setDirection(6,true); }
		else if( this.direction() == 2 ){ this.drill_EDi_setDirection(4,true); }
		else if( this.direction() == 4 ){ this.drill_EDi_setDirection(2,true); }
		
	// > 垂直入射
	}else{
		if( this.direction() == 2 ){ this.setDirection(8); }
		else if( this.direction() == 8 ){ this.setDirection(2); }
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventDirection = false;
		alert(
			"【Drill_EventDirection.js 物体 - 事件转向】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfMoveRoute 移动路线-移动路线核心"
		);
}
