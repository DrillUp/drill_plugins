//=============================================================================
// Drill_EventActionSequenceAutomation.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - GIF动画序列全自动播放
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
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_EventActionSequence       行走图-GIF动画序列★★v1.2及以上★★
 * 可作用于：
 *   - Drill_EventActionSequenceBind   行走图-GIF动画序列全绑定
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细内容，去看看 "7.行走图 > 关于行走图GIF动画序列.docx"。
 * 全自动播放：
 *   (1.如果你配置了行走图动画序列，那么事件将会根据情况，自动对符合
 *      标签条件的 状态节点/状态元 进行切换。
 *   (2.标签中包含 静止、移动、跳跃、奔跑 等，具体去看看文档中
*       全自动播放 的章节。
 * 设计：
 *   (1.你可以将一个行走图拆分成 行走图动画序列，再配置给事件或玩家。
 *      跑通后再进行更复杂的 状态节点 连接，实现更复杂的动画效果。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全自动播放
 * 你需要通过下面插件指令来操作动画序列：
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家领队 : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家全员 : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家队员[1] : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家队员变量[21] : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 本事件 : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 事件[1] : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 事件变量[1] : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 批量事件[10,11] : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 批量事件变量[21,22] : 全自动播放 : 关闭
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 全自动播放 : 关闭
 * 插件指令：>行走图动画序列 : 事件[1] : 全自动播放 : 开启
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
 * [v1.1]
 * 较大幅度更新了 动画序列底层，该插件重新兼容。
 * [v1.2]
 * 重新归纳了播放 状态节点 的结构。
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
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	4.10ms
//		★最坏情况		状态元的注解超级多。（不过目前算法并不会造成注解解析困难）
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			GIF动画序列全自动播放：
//				->物体
//					->检查 - 未开启功能
//					->检查 - 控制器为空
//					->检查 - 镜头范围外
//					->注解
//						->@行走图-静止
//						->@行走图-移动
//						->@行走图-奔跑
//						->@行走图-跳跃
//						->@行走图-滑行
//						->@行走图-被举起
//						->@行走图-举花盆
//					->变化锁
//				->动画序列 继承
//				->固定帧
//
//		★必要注意事项：
//			1.该插件需要随时控制 播放 状态节点。
//			2.@行走图-移动 要注意移动速度变化对帧速度的影响。
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
		
		
		/*-----------------全自动播放------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "全自动播放" || type == "自动化" ){
				if( temp1 == "开启" ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k]._Drill_EASA_enabled = true;
						e_chars[k]._Drill_EASA_lastAnnotation = "";
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k]._Drill_EASA_enabled = true;
						p_chars[k]._Drill_EASA_lastAnnotation = "";
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
		alert( "【Drill_EventActionSequenceAutomation.js 事件 - GIF动画序列全自动播放】\n" +
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
var _Drill_EASA_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_EASA_c_initialize.call(this);
	this._Drill_EASA_enabled = false;		//自动化开关（默认关闭）
	this._Drill_EASA_lastAnnotation = "";	//上一个标签
	this._Drill_EASA_lastChangeDelay = 0;	//上一个标签 变化锁
}
//==============================
// * 物体 - 帧刷新
//==============================
var _drill_EASA_ch_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EASA_ch_update.call(this);
	
	// > 检查 - 未开启功能，跳过
	if( this._Drill_EASA_enabled != true ){ return; }
	
	// > 检查 - 控制器为空，跳过
	if( this._Drill_EASe_controller == undefined ){
		this._Drill_EASA_lastAnnotation = "";
		return;
	}
	
	// > 检查 - 镜头范围外，跳过
	if( this.drill_EASA_posIsInCamera( this._realX, this._realY ) == false ){
		this._Drill_EASA_lastAnnotation = "";
		return;
	}
	
	
	// > 注解 - 初始化
	var cur_annotation = "";
	
	
	// > 注解 - 第一层
	if( this.slipperyPose != undefined && this.slipperyPose() == true && 
		(this instanceof Game_Player || this instanceof Game_Follower ) ){	//（YEP_SlipperyTiles 物体滑行）
		cur_annotation = "@行走图-滑行";
		
	}else if( this.drill_LST_isOnSlipperyFloor != undefined && 
			  this.drill_LST_isOnSlipperyFloor() == true ){	//（Drill_LayerSlipperyTile 物体滑行）
		cur_annotation = "@行走图-滑行";
		
	}else if( this._drill_PT_is_being_lift == true ){		//（Drill_PickThrow 举起花盆）
		cur_annotation = "@行走图-被举起";
	
	}else if( this.isMoving() ){
		if( this.isDashing() ){
			cur_annotation = "@行走图-奔跑";
		}else{
			cur_annotation = "@行走图-移动";
		}
	
	}else if( this.isJumping() ){
		cur_annotation = "@行走图-跳跃";
	
	}else if( this.isStopping() ){
		cur_annotation = "@行走图-静止";
	}
	
	
	// > 注解 - 第二层
	if( this._drill_PT_is_lifting == true ){
		cur_annotation = "@行走图-举花盆";
	}
	
	
	// > 变化锁
	if( this._Drill_EASA_lastAnnotation == cur_annotation ){
		this._Drill_EASA_lastChangeDelay = 3;		//（注解变化后，需要至少持续3帧）
		return;
	}
	this._Drill_EASA_lastChangeDelay -= 1;
	if( this._Drill_EASA_lastChangeDelay > 0 ){ return; }
	this._Drill_EASA_lastAnnotation = cur_annotation;
	
	
	// > 播放状态元/状态节点 根据标签
	this.drill_EASA_setAnnotation( cur_annotation );
}
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Game_CharacterBase.prototype.drill_EASA_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}


//=============================================================================
// ** 动画序列
//=============================================================================
//==============================
// * 动画序列 - 播放默认的状态元集合（继承）
//==============================
var _drill_EASA_EASe_setStateNodeDefault = Game_Character.prototype.drill_EASe_setStateNodeDefault;
Game_Character.prototype.drill_EASe_setStateNodeDefault = function(){
	this._Drill_EASA_enabled = false;		//（执行状态元变化时，立即关闭自动化）
	_drill_EASA_EASe_setStateNodeDefault.call(this);
}
//==============================
// * 动画序列 - 播放状态节点（继承）
//==============================
var _drill_EASA_EASe_setStateNode = Game_Character.prototype.drill_EASe_setStateNode;
Game_Character.prototype.drill_EASe_setStateNode = function( node_name ){
	this._Drill_EASA_enabled = false;
	_drill_EASA_EASe_setStateNode.call( this, node_name );
}
//==============================
// * 动画序列 - 播放简易状态节点（继承）
//==============================
var _drill_EASA_EASe_setSimpleStateNode = Game_Character.prototype.drill_EASe_setSimpleStateNode;
Game_Character.prototype.drill_EASe_setSimpleStateNode = function( state_nameList ){
	this._Drill_EASA_enabled = false;
	_drill_EASA_EASe_setSimpleStateNode.call( this, state_nameList );
}
//==============================
// * 动画序列 - 播放状态元/状态节点 根据标签（继承）
//
//			说明：	状态元/状态节点名称中含有特定注解的，会被捕获。
//==============================
Game_Character.prototype.drill_EASA_setAnnotation = function( annotation ){
	this._Drill_EASe_controller.drill_COAS_setAnnotation( annotation );
}


//=============================================================================
// ** 固定帧
//=============================================================================
//...


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventActionSequenceAutomation = false;
		alert(
			"【Drill_EventActionSequenceAutomation.js 行走图 - GIF动画序列自动化】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventActionSequence  行走图-GIF动画序列"
		);
}


