//=============================================================================
// Drill_EventActionSequenceAutomation.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        行走图 - GIF动画序列自动化
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventActionSequenceAutomation +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 开启自动化后，动画序列将根据条件自动切换状态元。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件必须基于插件才能运行：
 * 基于：
 *   - Drill_EventActionSequence    行走图 - GIF动画序列
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细内容，去看看 "7.行走图 > 关于行走图GIF动画序列核心.docx"。
 * 自动化：
 *   (1.如果你配置了行走图动画序列，那么事件将会根据情况，自动对符合
 *      注解条件的状态元进行切换。
 *   (2.注解包含 静止、移动、跳跃、奔跑 四项。具体去看看文档。
 * 设计：
 *   (1.你可以将一个行走图拆分成 行走图动画序列，再配置给事件或玩家。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自动化
 * 你需要通过下面插件指令来操作动画序列：
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 玩家领队 : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 玩家全员 : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 玩家队员[1] : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 玩家队员变量[21] : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 本事件 : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 事件[1] : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 事件变量[1] : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 批量事件[10,11] : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 批量事件变量[21,22] : 自动化 : 关闭
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 自动化 : 关闭
 * 插件指令：>行走图动画序列 : 事件[1] : 自动化 : 开启
 * 
 * 1.如果你配置了行走图动画序列，那么事件将会根据情况，自动对
 *   符合注解条件的状态元进行切换。
 * 2.注解包含 静止、移动、跳跃、奔跑 许多状态条件。具体去看看文档。
 * 3.如果你要执行一段特殊的动作，需要先关闭自动注解。
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
 * 测试方法：   在对话管理层设置10个事件，加载小爱丽丝动画序列。
 * 测试结果：   200个事件的地图中，平均消耗为：【8.20ms】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每次事件需要改变移动路线时，自动化才会触发一次，所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EASA（Event_Action_Sequence_Automation）
//		临时全局变量	无
//		临时局部变量	this._drill_EASA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2) 每帧
//		性能测试因素	对话管理层
//		性能测试消耗	4.10ms
//		最坏情况		状态元的注解超级多。（不过目前算法并不会造成注解解析困难）
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			行走图动画序列自动化：
//				->事件
//					->注解调用
//
//		★必要注意事项：
//			1.该插件相当于一个自驱动器，随时控制变化状态元命令。
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
　　Imported.Drill_EventActionSequenceAutomation = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventActionSequenceAutomation');
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventActionSequence ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_EASA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_EASA_pluginCommand.call(this, command, args);
	
	if( command === ">行走图动画序列" ){ 
	
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
					if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ return; }
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
		if( e_chars == null ){ e_chars = []; }
		if( p_chars == null ){ p_chars = []; }
		
		
		/*-----------------自动化------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "自动化" ){
				if( temp1 == "开启" ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k]._Drill_EASA_enabled = true;
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k]._Drill_EASA_enabled = true;
					}
				}
				if( temp1 == "关闭" ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k]._Drill_EASA_enabled = false;
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k]._Drill_EASA_enabled = false;
					}
				}
			}
		}
	}
		
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EASA_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventActionSequenceAutomation.js 事件 - GIF动画序列自动化】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_EASA_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EASA_sys_initialize.call(this);
	
	//（暂无）
}


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _Drill_EASA_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_EASA_c_initialize.call(this);	
	
	this._Drill_EASA_enabled = false;		//自动化开关（默认关闭）
}
//==============================
// * 动画序列 - 还原默认状态元集合（继承）
//==============================
var _drill_EASA_EASe_setSequenceDefault = Game_Character.prototype.drill_EASe_setSequenceDefault;
Game_Character.prototype.drill_EASe_setSequenceDefault = function(){
	this._Drill_EASA_enabled = false;		//（执行状态元变化时，立即关闭自动化）
	_drill_EASA_EASe_setSequenceDefault.call(this);
}
//==============================
// * 动画序列 - 设置状态元集合（继承）
//==============================
var _drill_EASA_EASe_setSequence = Game_Character.prototype.drill_EASe_setSequence;
Game_Character.prototype.drill_EASe_setSequence = function( seq ){
	this._Drill_EASA_enabled = false;
	_drill_EASA_EASe_setSequence.call( this,seq );
}
//==============================
// * 动画序列 - 设置状态元集合，立刻改变（继承）
//==============================
var _drill_EASA_EASe_setSequenceImmediate = Game_Character.prototype.drill_EASe_setSequenceImmediate;
Game_Character.prototype.drill_EASe_setSequenceImmediate = function( seq ){
	this._Drill_EASA_enabled = false;
	_drill_EASA_EASe_setSequenceImmediate.call( this,seq );
}
//==============================
// * 动画序列 - 设置状态元集合（根据注解）
//
//			说明：	状态元名称中含有特定注解的，会被捕获。
//==============================
Game_Character.prototype.drill_EASA_setSequenceByAnnotation = function( annotation ){
	this._Drill_EASe_data.drill_COAS_setSequenceImmediateByAnnotation( annotation );		//立刻改变
}


//=============================================================================
// ** 注解调用 状态元命令
//=============================================================================
//==============================
// * 注解调用 - 静止动作
//==============================
var _drill_EASA_ch_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EASA_ch_update.call(this);
	if( this._Drill_EASA_enabled != true ){ return; }
	
	// > 第一层注解
	var command = "";
	if( this._direction == 2 ){ command = command + "@向下"; }
	if( this._direction == 4 ){ command = command + "@向左"; }
	if( this._direction == 6 ){ command = command + "@向右"; }
	if( this._direction == 8 ){ command = command + "@向上"; }
	
	// > 第二层注解
	if( this.slipperyPose != undefined && this.slipperyPose() == true && 
		(this instanceof Game_Player || this instanceof Game_Follower ) ){	//（YEP_SlipperyTiles插件）
		command = command + "@滑行";
		
	}else if( this._drill_PT_is_being_lift == true ){		//（Drill_PickThrow插件）
		command = command + "@被举起";
	
	}else if( this.isStopping() ){
		command = command + "@静止";
	
	}else if( this.isMoving() ){
		if( this.isDashing() ){
			command = command + "@奔跑";
		}else{
			command = command + "@移动";
		}
		//"@滑行"
	
	}else if( this.isJumping() ){
		command = command + "@跳跃";
	}
	
	// > 第三层注解
	if( this._drill_PT_is_lifting == true ){
		command = command + "@举花盆";
	}
	
	
	this.drill_EASA_setSequenceByAnnotation( command );
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventActionSequenceAutomation = false;
		alert(
			"【Drill_EventActionSequenceAutomation.js 行走图-GIF动画序列自动化】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventActionSequence  行走图-GIF动画序列"
		);
}


