//=============================================================================
// Drill_MoveSpeed.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        物体 - 移动速度
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_MoveSpeed +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以将游戏中移动速度细分为更精确的数值。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。也可以被其他插件扩展。
 * 基于：
 *   - Drill_CoreOfMoveRoute   移动路线-移动路线核心★★v1.7以上★★
 * 作用于：
 *   - Drill_EventUnification  体积-事件一体化★★v1.1以上★★
 *     使得一体化的事件，能够支持精确速度的一体化。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 细节：
 *   (1.游戏标准速度 与 精确速度的关系：
 *        无法移动   = 精确速度 0
 *        标准速度 1 = 精确速度 1
 *        标准速度 2 = 精确速度 2
 *        标准速度 3 = 精确速度 4
 *        标准速度 4 = 精确速度 8
 *        标准速度 5 = 精确速度 16
 *        标准速度 6 = 精确速度 32
 *      如果你设置精确速度为7，则获取到的标准速度值为4。
 *      如果你设置精确速度为20，则获取到的标准速度值为5。
 *      如果速度为0，事件无法移动，玩家无法跳跃且无法展开鼠标面板。
 *   (2."增加速度"指令没有上限。"减少速度"指令最低为1。
 *      只有设置速度0才可以使得速度为0。0速度是完全不能移动的。
 *   (3.根据群友测试，速度上限为48，
 *      这是因为图块判定的限制，最快只能每帧跑1个图块。
 * 注意事项：
 *   (1.禁止移动时，所有移动相关的 移动路线指令 是被阻塞的。
 *      如果要修改某些移动路线相关属性，需要使用 插件指令。
 *   (2.另外，移动路线的 脚本 也是被阻塞的，只有解除禁用后才会执行。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 移动路线指令
 * 你可以在事件的 默认移动路线/移动路线函数 中添加修改指令：
 *
 * 移动路线指令：>移动速度:标准速度[4]
 * 移动路线指令：>移动速度:标准速度变量[21]
 * 移动路线指令：>移动速度:精确速度[8]
 * 移动路线指令：>移动速度:精确速度变量[22]
 * 
 * 1.注意，标准速度的范围为：0-6；精确速度的范围为：0-48。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改移动速度
 * 你可以通过插件指令手动设置精确速度。
 *
 * 插件指令：>移动速度 : 玩家 : 设置速度 : 速度[2]
 * 插件指令：>移动速度 : 本事件 : 设置速度 : 速度[2]
 * 插件指令：>移动速度 : 事件[10] : 设置速度 : 速度[2]
 * 插件指令：>移动速度 : 事件变量[21] : 设置速度 : 速度[2]
 * 插件指令：>移动速度 : 批量事件[10,11] : 设置速度 : 速度[2]
 * 插件指令：>移动速度 : 批量事件变量[21,22] : 设置速度 : 速度[2]
 *
 * 插件指令：>移动速度 : 玩家 : 设置速度 : 速度[2]
 * 插件指令：>移动速度 : 玩家 : 增加速度 : 速度[2]
 * 插件指令：>移动速度 : 玩家 : 减少速度 : 速度[2]
 * 插件指令：>移动速度 : 玩家 : 设置速度(变量) : 速度变量[21]
 * 插件指令：>移动速度 : 玩家 : 增加速度(变量) : 速度变量[21]
 * 插件指令：>移动速度 : 玩家 : 减少速度(变量) : 速度变量[21]
 * 插件指令：>移动速度 : 玩家 : 禁止移动
 * 插件指令：>移动速度 : 玩家 : 允许移动
 * 插件指令：>移动速度 : 玩家 : 禁止奔跑
 * 插件指令：>移动速度 : 玩家 : 允许奔跑
 *
 * 1.前半部分（玩家）和 后半部分（设置速度 : 速度[2]）
 *   的参数可以随意组合。一共有6*10种组合方式。
 * 2.由于标准速度太局限，这里的插件指令只对 精确速度 进行操作。
 * 3.事件速度修改后，离开地图后复原；
 *   玩家速度修改后，永久有效。
 *   速度值最低可以为0，0表示无法移动。
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
 * 测试方法：   直接去物体管理层、地图管理层、镜像管理层转一圈即可。
 * 测试结果：   200个事件的地图中，消耗为：【26.17ms】
 *              100个事件的地图中，消耗为：【17.80ms】
 *               50个事件的地图中，消耗为：【14.54ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件几乎没有消耗，但由于该插件的每个事件都有执行移动，
 *   所以插件的函数调用次数较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了速度为0时无法移动的情况。
 * [v1.2]
 * 添加了插件性能测试说明。
 * [v1.3]
 * 添加了与事件一体化的相关支持。
 * [v1.4]
 * 优化了插件指令结构，以及添加了禁止奔跑功能。
 * [v1.5]
 * 优化了 禁止移动 时，使得部分移动路线可以使用。
 * [v1.6]
 * 优化了物体移动时，细微位置差的问题。
 * [v1.7]
 * 优化了物体移动不流畅，轻微颤动的问题。
 * [v1.8]
 * 优化了 移动路线指令 的结构。
 * 
 * 
 *
 * @param 奔跑增加的精确速度
 * @type number
 * @min 0
 * @desc 角色在奔跑情况下，增加的精确速度值。
 * @default 8
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MS（Move_Speed）
//		临时全局变量	DrillUp.g_MS_xxx
//		临时局部变量	this._drill_MS_xxx
//		存储数据变量	$gameSystem._drill_xxx
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.updateMove
//						Game_CharacterBase.prototype.distancePerFrame
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	随便乱跑
//		★性能测试消耗	17.80ms
//		★最坏情况		事件越多，情况越坏。
//		★备注			偶然测试的时候，会看到该插件消耗的身影，但一般都找不到。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			移动速度：
//				->精确速度
//					->速度细节误差修复
//					->无法移动情况
//				->功能接口
//					->默认速度
//					->精确速度
//					->禁止移动
//						->只禁用部分移动路线
//					->禁止奔跑
//
//		★必要注意事项：
//			1.this._realX 是当前的浮点坐标。
//			  this._x 是当前的图块坐标。
//			2.由于 Game_CharacterBase.prototype.isMoving 的判断条件
//			  是 this._realX !== this._x || this._realY !== this._y;
//			  所以 this._realX与this._x 碰撞时，必须存储误差，加到下次移动中。
//
//		★其它说明细节：
//			1.该插件需要参照注释大全来看，单独看非常绕。
//			2.移动误差 还是用绝对值靠谱，因为事件瞬间转身后，误差是按 事件方向 来进行补正的。
//			  如果按照事件多偏移出的位置来算，会有转身差，这让物体管理层排队的小爱丽丝会走的难看。
//
//		★存在的问题：
//			1.即使关闭此插件，玩家和跟随队员仍然会轻微颤抖。 2021/6
//			  这种不平滑的感觉个人而言非常难受。以后专研透了，需要好好修复一下。（已修复，是事件移动一体化 造成的变速bug）
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MoveSpeed = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MoveSpeed');
	
	
	/*-----------------杂项------------------*/	
    DrillUp.g_MS_dashSpeed = Number(DrillUp.parameters["奔跑增加的精确速度"] || 8);



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfMoveRoute ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MS_pluginCommand.call(this, command, args);
	
	/*-----------------对象组获取------------------*/
	if( command === ">移动速度" ){
		var chars = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				chars = [ $gamePlayer ];
			}
			if( chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				chars = [ e ];
			}
			if( chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_MS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					chars.push( e );
				}
			}
			if( chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_MS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					chars.push( e );
				}
			}
			if( chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_MS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
			if( chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_MS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
			if( chars == null ){		//（纯数字时）
				var e_id = Number(unit);
				if( $gameMap.drill_MS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
		}
		
		if( chars != null && args.length == 4 ){
			var type = String(args[3]);
			if( type === "禁止移动" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					ch.drill_MS_setMoveForbidden( true );
				}
			}
			if( type === "允许移动" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					ch.drill_MS_setMoveForbidden( false );
				}
			}
			if( type === "禁止奔跑" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					ch.drill_MS_setDashForbidden( true );
				}
			}
			if( type === "允许奔跑" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					ch.drill_MS_setDashForbidden( false );
				}
			}
		}
		
		if( chars != null && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			temp2 = temp2.replace("速度变量[","");
			temp2 = temp2.replace("速度[","");
			temp2 = temp2.replace("]","");
			
			if( type === "设置速度" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					var speed = Number(temp2);
					ch.drill_MS_setASpeed( speed );
				}
			}
			if( type === "增加速度" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					var speed = ch.drill_MS_getASpeed() + Number(temp2);
					ch.drill_MS_setASpeed( speed );
				}
			}
			if( type === "减少速度" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					var speed = ch.drill_MS_getASpeed() - Number(temp2);
					ch.drill_MS_setASpeed( speed );
				}
			}
			if( type === "设置速度(变量)" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					var speed = $gameVariables.value( Number(temp2) );
					ch.drill_MS_setASpeed( speed );
				}
			}
			if( type === "增加速度(变量)" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					var speed = ch.drill_MS_getASpeed() + $gameVariables.value( Number(temp2) );
					ch.drill_MS_setASpeed( speed );
				}
			}
			if( type === "减少速度(变量)" ){
				for( var i=0; i < chars.length; i++ ){
					var ch = chars[i];
					var speed = ch.drill_MS_getASpeed() - $gameVariables.value( Number(temp2) );
					ch.drill_MS_setASpeed( speed );
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_MS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_MoveSpeed.js 物体 - 移动速度】\n" +
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
var _drill_MS_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	_drill_MS_routeCommand.call( this, command, args );
	if( command == ">移动速度" ){
		
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( temp1.indexOf("标准速度[") != -1 ){
				temp1 = temp1.replace("标准速度[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				this.drill_MS_setDSpeed( temp1 );
			}
			else if( temp1.indexOf("标准速度变量[") != -1 ){
				temp1 = temp1.replace("标准速度变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) );
				this.drill_MS_setDSpeed( temp1 );
			}
			else if( temp1.indexOf("精确速度[") != -1 ){
				temp1 = temp1.replace("精确速度[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				this.drill_MS_setASpeed( temp1 );
			}
			else if( temp1.indexOf("精确速度变量[") != -1 ){
				temp1 = temp1.replace("精确速度变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) );
				this.drill_MS_setASpeed( temp1 );
			}
		}
	}
	
	// > 旧指令支持
	else if( command.substr(0,5) == ">精确速度" ){
		var data = command.substr(5);
		this.drill_MS_setASpeed( Number(data) );
	}
}


//=============================================================================
// ** 物体接口
//=============================================================================
//==============================
// * 默认速度 - 获取属性值（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_getDSpeed = function() {
    return this.moveSpeed();
};
//==============================
// * 默认速度 - 设置属性值（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_setDSpeed = function(move_speed) {
    this.setMoveSpeed(move_speed);
};
//==============================
// * 默认速度 - 获取实际值（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_getRealDSpeed = function() {
	return this.realMoveSpeed();
};
//==============================
// * 精确速度 - 获取属性值（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_getASpeed = function() {
	if( this._drill_MS_ASpeed == -1 ){
		if( this._moveSpeed == 0 ){ return 0; }
		if( this._moveSpeed == 1 ){ return 1; }
		if( this._moveSpeed == 2 ){ return 2; }
		if( this._moveSpeed == 3 ){ return 4; }
		if( this._moveSpeed == 4 ){ return 8; }
		if( this._moveSpeed == 5 ){ return 16; }
		if( this._moveSpeed == 6 ){ return 32; }
	}
    return this._drill_MS_ASpeed;
};
//==============================
// * 精确速度 - 设置属性值（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_setASpeed = function( accurate_speed ){
	this._drill_MS_ASpeed = Number(accurate_speed);
	
	// > 零速度情况
	if( this._drill_MS_ASpeed == 0 ){ 
		this._moveSpeed = 0;
	}
	
	// > 速度分布
	if( this._drill_MS_ASpeed == 1 ){  this._moveSpeed = 1; }
	if( this._drill_MS_ASpeed == 2 ){  this._moveSpeed = 2; }
	if( this._drill_MS_ASpeed >= 3 && this._drill_MS_ASpeed <= 5 ){ this._moveSpeed = 3; }
	if( this._drill_MS_ASpeed >= 6 && this._drill_MS_ASpeed <= 10 ){ this._moveSpeed = 4; }
	if( this._drill_MS_ASpeed >= 11 && this._drill_MS_ASpeed <= 24 ){ this._moveSpeed = 5; }
	if( this._drill_MS_ASpeed >= 25 ){ this._moveSpeed = 6; }
};
//==============================
// * 精确速度 - 获取实际值（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_getRealASpeed = function() {
	var result = this.drill_MS_getASpeed();
	if( this.isDashing() ){
		result += this._drill_MS_ASpeed_dash;	//奔跑只加固定速度
	}
    return result;
};
//==============================
// * 禁止移动 - 设置（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_setMoveForbidden = function( enable ){
	this._drill_MS_isMoveForbidden = enable; 
};
//==============================
// * 禁止移动 - 获取（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_isMoveForbidden = function(){
	
	// > 零速度表示禁止移动
	if( this._moveSpeed == 0 && this._drill_MS_ASpeed == 0 ){ return true; }
	
	// > 禁止移动标记
	return this._drill_MS_isMoveForbidden == true;
};
//==============================
// * 禁止奔跑 - 设置（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_setDashForbidden = function( enable ){
	this._drill_MS_isDashForbidden = enable; 
};
//==============================
// * 禁止奔跑 - 获取（接口）
//==============================
Game_CharacterBase.prototype.drill_MS_isDashForbidden = function(){
	return this._drill_MS_isDashForbidden == true;
};


//=============================================================================
// ** 物体属性
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_MS_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _drill_MS_initMembers.call(this);
	
	this._drill_MS_ASpeed = -1;								//当前精确速度
	this._drill_MS_ASpeed_dash = DrillUp.g_MS_dashSpeed;	//奔跑时增加的精确速度
	this._drill_MS_fixX = 0;								//速度位置修正x（绝对值）
	this._drill_MS_fixY = 0;								//速度位置修正y（绝对值）
	this._drill_MS_dirX = 0;								//移动时朝向修正判定x
	this._drill_MS_dirY = 0;								//移动时朝向修正判定y
	
	this._drill_MS_isMoveForbidden = false;					//禁止移动 标记
	this._drill_MS_isDashForbidden = false;					//禁止奔跑 标记
};
//==============================
// * 物体 - 设置标准速度
//==============================
var _drill_MS_setMoveSpeed = Game_CharacterBase.prototype.setMoveSpeed;
Game_CharacterBase.prototype.setMoveSpeed = function( moveSpeed ){
	this._drill_MS_ASpeed = -1;
    _drill_MS_setMoveSpeed.call(this,moveSpeed);
};
//==============================
// * 物体 - 移动速度（每帧分量）
//
//			说明：	返回的是绝对值距离。
//==============================
var _drill_MS_distancePerFrame = Game_CharacterBase.prototype.distancePerFrame;
Game_CharacterBase.prototype.distancePerFrame = function() {
	
	return this.drill_MS_getRealASpeed() /128;		//（这里算覆写，因为如果按照默认的来，那么玩家奔跑的增量速度将会失效）
													//（精确速度是为了代替标准速度而存在的）
	//return _drill_MS_distancePerFrame.call(this);
};

//==============================
// * 物体 - 移动速度细节修正（this._realX与this._x碰撞时，存储误差，加到下次移动中）
//==============================
var _drill_MS_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	this._drill_MS_dirX = 0;			//（初始化偏移，未移动、跳跃时则不修正位置）
	this._drill_MS_dirY = 0;
	
	_drill_MS_update.call( this );
}
//==============================
// * 物体 - 移动速度细节修正（this._realX与this._x碰撞时，存储误差，加到下次移动中）
//==============================
Game_CharacterBase.prototype.updateMove = function() {
		
	// > 向左移动
    if( this._x < this._realX ){
		this._drill_MS_dirX = -1;		//（标记移动方向）
		var temp_x = this._realX - this.distancePerFrame();
		if( this._drill_MS_fixX != 0 ){	//（移动并修正速度）
			temp_x -= this._drill_MS_fixX;
			this._drill_MS_fixX = 0;
		}
		if( temp_x < this._x ){			//（修正过头时，重新积累修正值）
			this._drill_MS_fixX = Math.abs(this._x - temp_x);
			temp_x = this._x;
		}
        this._realX = temp_x;
    }
	// > 向右移动
    if( this._x > this._realX ){
		this._drill_MS_dirX = 1;
		var temp_x = this._realX + this.distancePerFrame();
		if( this._drill_MS_fixX != 0 ){
			temp_x += this._drill_MS_fixX;
			this._drill_MS_fixX = 0;
		}
		if( temp_x > this._x ){
			this._drill_MS_fixX = Math.abs(this._x - temp_x);
			temp_x = this._x;
		}
        this._realX = temp_x;
    }
	// > 向上移动
    if( this._y < this._realY ){
		this._drill_MS_dirY = -1;
		var temp_y = this._realY - this.distancePerFrame();
		if( this._drill_MS_fixY != 0 ){
			temp_y -= this._drill_MS_fixY;
			this._drill_MS_fixY = 0;
		}
		if( temp_y < this._y ){
			this._drill_MS_fixY = Math.abs(this._y - temp_y);
			temp_y = this._y;
		}
        this._realY = temp_y;
    }
	// > 向下移动
    if( this._y > this._realY ){
		this._drill_MS_dirY = 1;
		var temp_y = this._realY + this.distancePerFrame();
		if( this._drill_MS_fixY != 0 ){
			temp_y += this._drill_MS_fixY;
			this._drill_MS_fixY = 0;
		}
		if( temp_y > this._y ){
			this._drill_MS_fixY = Math.abs(this._y - temp_y);
			temp_y = this._y;
		}
        this._realY = temp_y;
    }
	
	// > 刷新灌木丛高度
    if( !this.isMoving() ){
        this.refreshBushDepth();
    }
};
//==============================
// * 坐标补正 - 相对镜头所在位置X（图块单位）
//==============================
var _drill_MS_scrolledX = Game_CharacterBase.prototype.scrolledX;
Game_CharacterBase.prototype.scrolledX = function(){
	var xx = _drill_MS_scrolledX.call( this );
	if( this._drill_MS_dirX == 1  ){ return xx + this._drill_MS_fixX; }		//（根据方向修正位置）
	if( this._drill_MS_dirX == -1 ){ return xx - this._drill_MS_fixX; }
	return xx;
};
//==============================
// * 坐标补正 - 相对镜头所在位置Y（图块单位）
//==============================
var _drill_MS_scrolledY = Game_CharacterBase.prototype.scrolledY;
Game_CharacterBase.prototype.scrolledY = function(){
	var yy = _drill_MS_scrolledY.call( this );
	if( this._drill_MS_dirY == 1  ){ return yy + this._drill_MS_fixY; }
	if( this._drill_MS_dirY == -1 ){ return yy - this._drill_MS_fixY; }
	return yy;
};
//==============================
// * 玩家 - 跟随队员的速度同步
//==============================
var _drill_MS_p_chaseCharacter = Game_Follower.prototype.chaseCharacter;
Game_Follower.prototype.chaseCharacter = function( character ){
	_drill_MS_p_chaseCharacter.call( this, character );
	var speed = $gamePlayer.drill_MS_getRealASpeed();	//（这里修正没什么用，一样会前前后后）
    this.drill_MS_setASpeed( speed );
}

//==============================
// * 禁止奔跑 - 事件禁止
//==============================
var _drill_MS_e_isDashing = Game_Event.prototype.isDashing;
Game_Event.prototype.isDashing = function() {
	if( this.drill_MS_isDashForbidden() ){ return false; }
	return _drill_MS_e_isDashing.call(this);
}
//==============================
// * 禁止奔跑 - 玩家禁止
//==============================
var _drill_MS_p_updateDashinge = Game_Player.prototype.updateDashing;
Game_Player.prototype.updateDashing = function(){
    if( this.drill_MS_isDashForbidden() ){
		this._dashing = false;		//（注意要确保成员 _dashing 为false）
        return;
    }
	_drill_MS_p_updateDashinge.call( this );
}


//=============================================================================
// ** 移动路线阻塞（禁止移动）
//=============================================================================
//==============================
// * 禁止移动 - 玩家禁止
//==============================
var _drill_MS_p_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	if( this.drill_MS_isMoveForbidden() == true ){ return false; }
	return _drill_MS_p_canMove.call(this);
}
//==============================
// * 移动路线 - 初始化
//==============================
var _drill_MS_mr_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_MS_mr_initialize.call(this);
	this['_drill_MS_moveRouteBlock'] = false;		//移动路线阻塞 标记
};
//==============================
// * 移动路线 - 路线帧刷新
//==============================
var _drill_MS_mr_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function(){
	
	// > 禁止移动被解除时，取消阻塞
	if( this.drill_MS_isMoveForbidden() == false ){	
		this['_drill_MS_moveRouteBlock'] = false;
    }
	
	// > 阻塞
	if( this['_drill_MS_moveRouteBlock'] == true ){ return; }
	
	_drill_MS_mr_updateRoutineMove.call(this);
};
//==============================
// * 移动路线 - 执行单条移动路线
//==============================
var _drill_MS_mr_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function( command ){
	
	// > 阻塞标记识别
	if( this.drill_MS_isMoveForbidden() == true ){
		var gc = Game_Character;
		switch( command.code ){
			case gc.ROUTE_MOVE_DOWN:			//向下移动
			case gc.ROUTE_MOVE_LEFT:			//向左移动
			case gc.ROUTE_MOVE_RIGHT:			//向右移动
			case gc.ROUTE_MOVE_UP:				//向上移动
			case gc.ROUTE_MOVE_LOWER_L:			//向左下移动
			case gc.ROUTE_MOVE_LOWER_R:			//向右下移动
			case gc.ROUTE_MOVE_UPPER_L:			//向左上移动
			case gc.ROUTE_MOVE_UPPER_R:			//向右上移动
			case gc.ROUTE_MOVE_RANDOM:			//随机移动
			case gc.ROUTE_MOVE_TOWARD:			//接近玩家
			case gc.ROUTE_MOVE_AWAY:			//远离玩家
			case gc.ROUTE_MOVE_FORWARD:			//前进一步
			case gc.ROUTE_MOVE_BACKWARD:		//后退一步
			case gc.ROUTE_TURN_DOWN:			//朝向下方
			case gc.ROUTE_TURN_LEFT:			//朝向左方
			case gc.ROUTE_TURN_RIGHT:			//朝向右方
			case gc.ROUTE_TURN_UP:				//朝向上方
			case gc.ROUTE_TURN_90D_R:			//右转90°
			case gc.ROUTE_TURN_90D_L:			//左转90°
			case gc.ROUTE_TURN_180D:			//后转180°
			case gc.ROUTE_TURN_90D_R_L:			//向左或向右转90°
			case gc.ROUTE_TURN_RANDOM:			//随机转向
			case gc.ROUTE_TURN_TOWARD:			//朝向玩家
			case gc.ROUTE_TURN_AWAY:			//背向玩家
			case gc.ROUTE_SCRIPT:				//脚本...
				this['_drill_MS_moveRouteBlock'] = true;
				break;
		}
	}
	
	// > 阻塞
	if( this['_drill_MS_moveRouteBlock'] == true ){ return; }
	
	_drill_MS_mr_processMoveCommand.call( this, command );
};
//==============================
// * 移动路线 - 移动路线索引+1
//==============================
var _drill_MS_mr_advanceMoveRouteIndex = Game_Character.prototype.advanceMoveRouteIndex;
Game_Character.prototype.advanceMoveRouteIndex = function(){
	if( this['_drill_MS_moveRouteBlock'] == true ){ return; }	//（阻塞）
	_drill_MS_mr_advanceMoveRouteIndex.call( this );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MoveSpeed = false;
		alert(
			"【Drill_MoveSpeed.js 物体 - 移动速度】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfMoveRoute 移动路线-移动路线核心"
		);
}

