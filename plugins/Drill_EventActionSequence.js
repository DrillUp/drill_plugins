//=============================================================================
// Drill_EventActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        行走图 - GIF动画序列
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventActionSequence +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以使得 行走图 具有动画序列功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件必须基于核心插件才能运行：
 * 基于：
 *   - Drill_CoreOfActionSequence    系统 - GIF动画序列核心★★v1.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细内容，去看看 "7.行走图 > 关于行走图GIF动画序列核心.docx"。
 * 细节：
 *   (1.事件的 GIF动画序列 可以与消失/显现/持续动作效果叠加。
 *   (2.如果你配置的事件数量特别多，那么必然会造成显示延迟。
 *      事件在执行"设置动画序列"后才会全加载，你可以提前把事件
 *      设为透明放上并设置动画序列。
 * 设计：
 *   (1.动画序列可以是一个简单的GIF，也可以是一组动作集。
 *      比如，单纯的事件动画播放，或者事件根据 变量 播放不同的动作。
 *      你需要先 动画序列核心 ，然后通过该插件调用指令实现事件GIF切换。
 *      具体可以去看看 "1.系统 > 关于GIF动画序列核心.docx" ，了解通过
 *      小工具配置GIF动画序列的方法。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 动画序列
 * 你需要通过下面插件指令来激活动画序列：
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家领队 : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家全员 : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家队员[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家队员变量[21] : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 本事件 : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件变量[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 批量事件[10,11] : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 批量事件变量[21,22] : 设置动画序列 : 动画序列[1]
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 关闭动画序列
 * 
 * 1.前半部分（事件[1]）和 后半部分（设置动画序列 : 动画序列[1]）
 *   的参数可以随意组合。一共有10*2种组合方式。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 动作元与状态元
 * 你需要通过下面插件指令来操作动画序列：
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 修改状态元集合 : 集合[小爱丽丝静止1,小爱丽丝静止2]
 * 插件指令：>行走图动画序列 : 事件[1] : 修改状态元集合(立即切换) : 集合[小爱丽丝静止1,小爱丽丝静止2]
 * 插件指令：>行走图动画序列 : 事件[1] : 还原默认状态元集合
 * 插件指令：>行走图动画序列 : 事件[1] : 播放动作 : 动作元[小爱丽丝发火]
 * 插件指令：>行走图动画序列 : 事件[1] : 立即停止动作
 * 
 * 1.必须设置动画序列后，才能使用上述操作，插件指令对当前动画序列进行操作。
 *   如果动画序列中，没有指定的 状态元和动作元，则没有效果。
 * 2.组合方式与前面一样，一共有10*5种组合方式。
 * 3."集合[]"中，填入 状态元名 ，填入多个表示随机播放的几个状态。
 *   "动作元[]"中，填入 动作元名 ，填入后只播放一次动作；
 *   如果动作元优先级不够，则没有效果。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在对话管理层设置10个事件，加载小爱丽丝动画序列。
 * 测试结果：   200个事件的地图中，平均消耗为：【18.16ms】
 *              100个事件的地图中，平均消耗为：【12.29ms】
 *               50个事件的地图中，平均消耗为：【9.52ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.动画序列和一般的行走图功能是相似的，本身处理播放的控制器并不
 *   消耗计算量，都以实际配置的资源为准。由于行走图动画序列配置的
 *   图片都很小，所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EASe（Event_Action_Sequence）
//		临时全局变量	无
//		临时局部变量	this._drill_EASe_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理) 每帧
//		性能测试因素	对话管理层
//		性能测试消耗	12.29ms, 18.78ms（drill_EASe_isPlaying 执行）
//		最坏情况		所有事件都用动画序列。（其实也不坏…）
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			行走图动画序列：
//				->动画序列
//					->数据绑定
//					->对象绑定
//				->事件
//					->隔离原行走图
//					->离开地图仍然保持动作序列？
//
//		★必要注意事项：
//			1.该插件将 核心插件 的接口进行了一一对应。
//			  只修改贴图的 bitmap，其它都不影响。
//			2.注意，数据（data）和 贴图装饰器（decorator）是分离的。
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
　　Imported.Drill_EventActionSequence = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventActionSequence');
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfActionSequence ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_EASe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_EASe_pluginCommand.call(this, command, args);
	
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
					if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ return; }
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
		
		
		/*-----------------关闭动画序列------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "关闭动画序列" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_removeActionSequence();
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_removeActionSequence();
				}
			}
		}
		/*-----------------设置动画序列------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置动画序列" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setActionSequence( Number(temp1)-1 );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setActionSequence( Number(temp1)-1 );
				}
			}
		}
			
		/*-----------------动画序列操作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "还原默认集合" || type == "还原默认状态元集合" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setSequenceDefault();
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setSequenceDefault();
				}
			}
			if( type == "立即停止动作" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_stopAct();
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_stopAct();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改集合" || type == "修改状态元集合" ){
				temp1 = temp1.replace("集合[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setSequence( temp1.split(",") );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setSequence( temp1.split(",") );
				}
			}
			if( type == "修改集合(立即切换)" || type == "修改状态元集合(立即切换)"  ){
				temp1 = temp1.replace("集合[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setSequenceImmediate( temp1.split(",") );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setSequenceImmediate( temp1.split(",") );
				}
			}
			if( type == "播放动作" ){
				temp1 = temp1.replace("动作元[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setAct( temp1 );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setAct( temp1 );
				}
			}
		}
		
	}
		
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EASe_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventActionSequence.js 事件 - GIF动画序列】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_EASe_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EASe_sys_initialize.call(this);
	
	//（暂无）
}


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _Drill_EASe_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_EASe_c_initialize.call(this);	
	
	this._Drill_EASe_enabled = false;				//开关
	this._Drill_EASe_data = null;					//动画序列数据
	
	this._Drill_EASe_commandInit = false;			//指令-对象初始化开关
	this._Drill_EASe_commandDestroy = false;		//指令-对象销毁开关
}
//==============================
// * 事件 - 帧刷新
//==============================
var _Drill_EASe_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_Drill_EASe_c_update.call(this);	
	
	// > 数据帧刷新
	if( this._Drill_EASe_data != undefined ){
		this._Drill_EASe_data.update();
	}
}
//==============================
// * 事件 - 销毁
//==============================
var _Drill_EASe_c_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_Drill_EASe_c_erase.call(this);	
	
	this._Drill_EASe_commandDestroy = true;		//强制执行销毁指令
}

//==============================
// * 事件 - 设置动画序列
//==============================
Game_Character.prototype.drill_EASe_setActionSequence = function( as_id ){
	this._Drill_EASe_enabled = true;
	var data = JSON.parse(JSON.stringify( DrillUp.g_COAS_list[ as_id ] ));
	data['waitForPreload'] = true;			//（开启预加载等待）
	this._Drill_EASe_data = new Drill_COAS_Data( data );
	this._Drill_EASe_commandInit = true;
}
//==============================
// * 事件 - 去除动画序列
//==============================
Game_Character.prototype.drill_EASe_removeActionSequence = function(){
	this._Drill_EASe_enabled = false;
	this._Drill_EASe_data = null;
	this._Drill_EASe_commandDestroy = true;
}
//==============================
// * 动画序列 - 还原默认状态元集合
//
//			说明：	直接调用核心提供的接口即可，
//					注意，不要为了简化，让插件指令直接去操作COAS核心函数。
//==============================
Game_Character.prototype.drill_EASe_setSequenceDefault = function(){
	this._Drill_EASe_data.drill_COAS_setSequence( this._Drill_EASe_data.drill_COAS_getDefaultStateGroup() );
}
//==============================
// * 动画序列 - 设置状态元集合
//==============================
Game_Character.prototype.drill_EASe_setSequence = function( seq ){
	this._Drill_EASe_data.drill_COAS_setSequence( seq );
}
//==============================
// * 动画序列 - 设置状态元集合，立刻改变
//==============================
Game_Character.prototype.drill_EASe_setSequenceImmediate = function( seq ){
	this._Drill_EASe_data.drill_COAS_setSequenceImmediate( seq );
}
//==============================
// * 动画序列 - 添加动作
//==============================
Game_Character.prototype.drill_EASe_setAct = function( act_name ){
	this._Drill_EASe_data.drill_COAS_setAct( act_name );
}
//==============================
// * 动画序列 - 立刻终止动作
//==============================
Game_Character.prototype.drill_EASe_stopAct = function(){
	this._Drill_EASe_data.drill_COAS_stopAct();
}


//=============================================================================
// ** 事件贴图
//
//			说明：	行走图的动画序列支持镜像反射。
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
var _drill_EASe_sp_initialize = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function(){
    _drill_EASe_sp_initialize.call( this );
	
	this._drill_EASe_decorator = null;	//动画序列对象
}
//==============================
// * 事件贴图 - 帧刷新
//==============================
var _Drill_EASe_sp_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_Drill_EASe_sp_update.call(this);	
	
	if( this._character == undefined ){ return; }
	
	// > 指令 - 初始化动画序列对象 
	if( this._character._Drill_EASe_commandInit == true ){
		this._character._Drill_EASe_commandInit = false;	
		
		if( this._drill_EASe_decorator != null ){		//（销毁旧对象）
			this._drill_EASe_decorator.drill_COAS_destroy(); 
		}
		this._drill_EASe_decorator = new Drill_COAS_SpriteDecorator( this, this._character._Drill_EASe_data );
	}
	
	// > 跨地图，贴图销毁时重建（要在初始化指令后面，防止new执行后立即销毁）
	if( this._character._Drill_EASe_enabled == true &&
		this._character._Drill_EASe_data != null &&
		this._drill_EASe_decorator == null ){
		
		this._drill_EASe_decorator = new Drill_COAS_SpriteDecorator( this, this._character._Drill_EASe_data );
	}
	
	// > 动画序列对象 帧刷新
	if( this._character._Drill_EASe_enabled == true &&
		this._drill_EASe_decorator != null ){
		this._drill_EASe_decorator.update();
	} 
	
	// > 指令 - 动画序列对象 销毁
	if( this._character._Drill_EASe_commandDestroy == true ){
		this._character._Drill_EASe_commandDestroy = false;	
		if( this._drill_EASe_decorator != null ){		//（销毁旧对象）
			this._drill_EASe_decorator.drill_COAS_destroy(); 
		}
	}
};
//==============================
// * 事件贴图 - 阻塞 - 原贴图刷新
//==============================
Sprite_Character.prototype.drill_EASe_isPlaying = function() {
	if( this._character == undefined ){ return false; }
	return this._character._Drill_EASe_enabled;
}
//==============================
// * 事件贴图 - 阻塞 - 原贴图刷新
//==============================
var _drill_EASe_sp_updateBitmap = Sprite_Character.prototype.updateBitmap;
Sprite_Character.prototype.updateBitmap = function() {
	if( this.drill_EASe_isPlaying() == true ){ return; }
	_drill_EASe_sp_updateBitmap.call(this);
}
//==============================
// * 事件贴图 - 阻塞 - 原贴图刷新
//==============================
var _drill_EASe_sp_updateFrame = Sprite_Character.prototype.updateFrame;
Sprite_Character.prototype.updateFrame = function() {
	if( this.drill_EASe_isPlaying() == true ){
		var pw = this.patternWidth();
		var ph = this.patternHeight();
		var sx = 0;
		var sy = 0;
		this.setFrame(sx, sy, pw, ph);
		return;
	}
	_drill_EASe_sp_updateFrame.call(this);
}
//==============================
// * 事件贴图 - 固定 - 原贴图切割宽
//==============================
var _drill_EASe_sp_patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function() {
	if( this.drill_EASe_isPlaying() == true ){
		return this.bitmap.width;
	}
	return _drill_EASe_sp_patternWidth.call(this);
};
//==============================
// * 事件贴图 - 固定 - 原贴图切割高
//==============================
var _drill_EASe_sp_patternHeight = Sprite_Character.prototype.patternHeight;
Sprite_Character.prototype.patternHeight = function() {
	if( this.drill_EASe_isPlaying() == true ){
		return this.bitmap.height;
	}
	return _drill_EASe_sp_patternHeight.call(this);
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventActionSequence = false;
		alert(
			"【Drill_EventActionSequence.js 行走图-GIF动画序列】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfActionSequence  系统-GIF动画序列核心"
		);
}


