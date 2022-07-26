//=============================================================================
// Drill_EventExtraShifting.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 额外位置偏移量
 * @author Drill_up
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_EventExtraShifting +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以修改事件的额外位置偏移量，多用于摆放的静态事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以通过下列插件支持更多功能。
 * 可被扩展：
 *   - Drill_CoreOfMoveRoute      移动路线-移动路线核心★★v1.7以上★★
 *     通过移动路线核心，该插件可以在移动路线中设置额外偏移量。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 细节：
 *   (1.偏移后，倒影能够对应偏移的位置正常显示，不会产生高度差。
 * 设计：
 *   (1.你可以给桌子椅子设置一定的偏移，使它们靠在一起看起来像是一体的，
 *      或者随意摆放的，而不像独立对象规整地放在网格中。
 *   (2.剧情场景设计中，如果几个小爱丽丝需要挤在同一个图块中，可以在她们
 *      挤一起前设置从0偏移到1~16像素的插件指令，这样看起来相对比较自然。
 *      反之，从1~16像素偏移为0，可以使得她们像自发地排好了网格站队顺序。
 *      这些配置可以在移动路线指令中设置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 如果你需要设置事件的偏移，使用下面事件注释：
 * （注意，冒号左右有空格）
 * 
 * 事件注释：=>行走图额外位置偏移量 : 像素偏移[0,-12]
 * 
 * 1."像素偏移[0,-12]"中，x方向正数向右负数向左，y方向正数向下负数向上。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以使用下列插件指令设置偏移：
 * 
 * 插件指令：>行走图额外位置偏移量 : 本事件 : 像素偏移[0,-16] : 时间[20]
 * 插件指令：>行走图额外位置偏移量 : 事件[10] : 像素偏移[0,-16] : 时间[20]
 * 插件指令：>行走图额外位置偏移量 : 事件变量[21] : 像素偏移[0,-16] : 时间[20]
 * 插件指令：>行走图额外位置偏移量 : 批量事件[10,11] : 像素偏移[0,-16] : 时间[20]
 * 插件指令：>行走图额外位置偏移量 : 批量事件变量[21,22] : 像素偏移[0,-16] : 时间[20]
 * 
 * 插件指令：>行走图额外位置偏移量 : 本事件 : 像素偏移[0,-16] : 时间[20]
 * 插件指令：>行走图额外位置偏移量 : 本事件 : 条件-移动时才偏移 : 开启
 * 插件指令：>行走图额外位置偏移量 : 本事件 : 条件-移动时才偏移 : 关闭
 * 
 * 1."像素偏移"是指相对于事件本来应该处在的基准点，额外偏移到的位置。
 *   注意，插件指令偏移后，刷菜单或保存时不会归位，但切换地图后会归位。
 * 2.执行指令时，你可以开启条件"移动时才偏移"，
 *   这样可以避免事件暂停移动时，却仍然在缓慢偏移的突兀感。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以在移动路线指令中设置偏移：
 * 
 * 移动路线指令：>行走图偏移量:像素偏移[0,-16]:时间[20]
 * 移动路线指令：>行走图偏移量:条件-移动时才偏移:开启
 * 移动路线指令：>行走图偏移量:条件-移动时才偏移:关闭
 * 
 * 1.该指令与其它移动路线指令并行执行，
 *   也就是说角色可以在移动的同时设置额外偏移，让角色看起来在不稳定地移动。
 * 2.执行指令时，你可以开启条件"移动时才偏移"，
 *   这样可以避免事件暂停移动时，却仍然在缓慢偏移的突兀感。
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
 * 测试方法：   在UI管理层放置20个偏移的事件。
 * 测试结果：   200个事件的地图中，消耗为：【9.32ms】
 *              100个事件的地图中，消耗为：【7.68ms】
 *               50个事件的地图中，消耗为：【6.40ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只改变坐标，由于与其他坐标、变换、镜像类插件叠加在一起，
 *   会有部分性能消耗，但该插件的消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了插件指令控制偏移出错的bug。
 * [v1.2]
 * 添加了 移动路线指令 功能。
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EES（Event_Extra_Shifting）
//		临时全局变量	DrillUp.g_EES_xxx
//		临时局部变量	this._drill_EES_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	UI管理层测试
//		★性能测试消耗	7.68ms（Game_CharacterBase.prototype.update）
//		★最坏情况		出现大量事件，都偏移，并且实时变化偏移位置。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			额外位置偏移量：
//				->事件指令
//				->插件指令
//					->微移移动
//				->移动路线指令
//					->移动时才偏移
//				->偏移不影响倒影镜像
//
//		★必要注意事项：
//			1.
//
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventExtraShifting = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventExtraShifting');
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EES_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EES_pluginCommand.call(this, command, args);
	if( command === ">行走图额外位置偏移量" ){
		
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		var p_chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EES_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EES_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EES_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EES_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			
			if( p_chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				p_chars = [ $gamePlayer ];
			}
			if( p_chars == null && unit == "玩家全员" ){
				p_chars = $gamePlayer.followers().visibleFollowers();
				p_chars.unshift($gamePlayer);
			}
			if( p_chars == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ $gameVariables.value(Number(unit)) ]);
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ Number(unit) ]);
			}
		}
		
		/*-----------------像素偏移------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1.indexOf("像素偏移[") != -1 ){
				temp1 = temp1.replace("像素偏移[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.split(/[,，]/);
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( temp1.length >= 2 ){
					if( e_chars != null){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_EES_setShifting( Number(temp1[0]), Number(temp1[1]), temp2 );
						}
					}
					if( p_chars != null){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_EES_setShifting( Number(temp1[0]), Number(temp1[1]), temp2 );
						}
					}
				}
				
			}
			if( temp1 == "条件-移动时才偏移" ){
				if( temp2 == "开启" ){
					if( e_chars != null){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_EES_setMovingConditionEnabled( true );
						}
					}
					if( p_chars != null){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_EES_setMovingConditionEnabled( true );
						}
					}
				}
				if( temp2 == "关闭" ){
					if( e_chars != null){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_EES_setMovingConditionEnabled( false );
						}
					}
					if( p_chars != null){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_EES_setMovingConditionEnabled( false );
						}
					}
				}
			}
		}	
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EES_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventExtraShifting.js 行走图 - 额外位置偏移量】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// * 注释初始化
//=============================================================================
var _drill_EES_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EES_event_setupPage.call(this);
    this.drill_EES_setupPage();
};
Game_Event.prototype.drill_EES_setupPage = function() {
	if( !this._erased && this.page() ){ this.list().forEach(function( l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>行走图额外位置偏移量" ){		//=>行走图额外位置偏移量 : 像素偏移[0,-12]
				if( args.length == 2 ){
					var temp1 = String(args[1]);
					if( temp1.indexOf("像素偏移[") != -1 ){
						temp1 = temp1.replace("像素偏移[","");
						temp1 = temp1.replace("]","");
						temp1 = temp1.split(/[,，]/);
						if( temp1.length >= 2 ){
							this._drill_EES_x = Number(temp1[0]);
							this._drill_EES_y = Number(temp1[1]);
							this._drill_EES_change['org_x'] = Number(temp1[0]);
							this._drill_EES_change['org_y'] = Number(temp1[1]);
						}
					}
				}
			};
		};
	}, this);};
};	


//=============================================================================
// * 移动路线指令
//=============================================================================
var _drill_EES_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_EES_scene_initialize.call(this);		//（此方法放到最后再继承）
	if( Imported.Drill_CoreOfMoveRoute ){
		
		var _drill_EES_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
		Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
			_drill_EES_routeCommand.call( this, command, args );
			if( command == ">行走图偏移量" ){
				
				if( args.length == 2 ){
					var temp1 = String(args[0]);
					var temp2 = String(args[1]);
					if( temp1.indexOf("像素偏移[") != -1 ){
						temp1 = temp1.replace("像素偏移[","");
						temp1 = temp1.replace("]","");
						temp1 = temp1.split(/[,，]/);
						temp2 = temp2.replace("时间[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						if( temp1.length >= 2 ){
							this.drill_EES_setShifting( Number(temp1[0]), Number(temp1[1]), temp2 );
						}
						
					}
					if( temp1 == "条件-移动时才偏移" ){
						if( temp2 == "开启" ){
							this.drill_EES_setMovingConditionEnabled( true );
						}
						if( temp2 == "关闭" ){
							this.drill_EES_setMovingConditionEnabled( false );
						}
					}
				}	
			}
		};
		
	}
}


//=============================================================================
// ** 物体属性
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_EES_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	_drill_EES_initialize.call(this);
	
	this._drill_EES_x = 0;			//当前偏移坐标X
	this._drill_EES_y = 0;			//当前偏移坐标Y
	
	this._drill_EES_change = {};						//变化容器
	this._drill_EES_change['org_x'] = 0;				//原位置x
	this._drill_EES_change['org_y'] = 0;				//原位置y
	this._drill_EES_change['x_speed'] = 0;				//速度x
	this._drill_EES_change['y_speed'] = 0;				//速度y
	this._drill_EES_change['cur_time'] = 0;				//当前时间
	this._drill_EES_change['tar_time'] = 0;				//移动时长
	this._drill_EES_change['condition_moving'] = false;	//条件 - 必须移动时
}
//==============================
// * 物体 - 相对镜头所在位置Y（像素单位）
//==============================
var _drill_EES_screenX = Game_CharacterBase.prototype.screenX;
Game_CharacterBase.prototype.screenX = function(){
	var xx = _drill_EES_screenX.call( this );
	return xx + this._drill_EES_x;
}
//==============================
// * 物体 - 相对镜头所在位置Y（像素单位）
//==============================
var _drill_EES_screenY = Game_CharacterBase.prototype.screenY;
Game_CharacterBase.prototype.screenY = function(){
	var yy = _drill_EES_screenY.call( this );
	return yy + this._drill_EES_y;
}

//==============================
// * 物体 - 设置偏移（接口）
//==============================
Game_CharacterBase.prototype.drill_EES_setShifting = function( x_offset, y_offset, time ){
	if( time < 1 ){ time = 1; }
	var dx = x_offset - this._drill_EES_x;
	var dy = y_offset - this._drill_EES_y;
	
	this._drill_EES_change['org_x'] = this._drill_EES_x;	
	this._drill_EES_change['org_y'] = this._drill_EES_y;	
	this._drill_EES_change['x_speed'] = dx/time;	
	this._drill_EES_change['y_speed'] = dy/time;	
	this._drill_EES_change['cur_time'] = 0;			
	this._drill_EES_change['tar_time'] = time;		
}
//==============================
// * 物体 - 设置移动条件（接口）
//==============================
Game_CharacterBase.prototype.drill_EES_setMovingConditionEnabled = function( b ){
	this._drill_EES_change['condition_moving'] = b;		
}

//==============================
// * 物体 - 帧刷新
//==============================
var _drill_EES_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EES_update.call( this );
	this.drill_updateShifting();
}
Game_CharacterBase.prototype.drill_updateShifting = function(){
	var data = this._drill_EES_change;
	
	// > 条件 移动时才偏移
	if( data['condition_moving'] == true ){
		if( this.isMoving() ){
			data['cur_time'] += 1;
			if( data['cur_time'] > data['tar_time'] ){
				data['cur_time'] = data['tar_time'];
			}
		}else{
			//（不满足条件时，不偏移）
		}
		
	// > 关闭条件
	}else{
		data['cur_time'] += 1;
		if( data['cur_time'] > data['tar_time'] ){
			data['cur_time'] = data['tar_time'];
		}
	}
	
	this._drill_EES_x = data['org_x'] + data['x_speed'] * data['cur_time'];
	this._drill_EES_y = data['org_y'] + data['y_speed'] * data['cur_time'];
}


//=============================================================================
// ** 插件扩展
//=============================================================================
//==============================
// * 物体 - 偏移补正值X
//
//			说明：	此函数用于 镜像、黑影 的位置偏移补正值。
//==============================
var _drill_EES_reverseOffsetX = Game_CharacterBase.prototype.drill_reverseOffsetX;
Game_CharacterBase.prototype.drill_reverseOffsetX = function(){
	var xx = 0;
	if( _drill_EES_reverseOffsetX != undefined ){		//（函数继承捕获，如果此插件放在 倒影插件 前面，则创建该函数，否则直接继承）
		xx = _drill_EES_reverseOffsetX.call( this );
	}
	return xx + this._drill_EES_x;
}
//==============================
// * 物体 - 偏移补正值Y
//
//			说明：	此函数用于 镜像、黑影 的位置偏移补正值。
//==============================
var _drill_EES_reverseOffsetY = Game_CharacterBase.prototype.drill_reverseOffsetY;
Game_CharacterBase.prototype.drill_reverseOffsetY = function(){
	var yy = 0;
	if( _drill_EES_reverseOffsetY != undefined ){
		yy = _drill_EES_reverseOffsetY.call( this );
	}
	return yy + this._drill_EES_y;
}


