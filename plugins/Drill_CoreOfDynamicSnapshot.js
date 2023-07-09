//=============================================================================
// Drill_CoreOfDynamicSnapshot.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        游戏窗体 - 动态屏幕快照核心
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_CoreOfDynamicSnapshot +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 提供创建动态快照的一系列功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 插件基于弹道核心，可以作用于所有需要用到动态快照的子插件。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v1.8及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于地图的各个层级。
 * 2.更多详细内容，去看看文档 "1.系统 > 大家族-屏幕快照.docx"。
 * 细节：
 *   (1.天窗层是在整个游戏画面之上的特殊层级，比最顶层还高，
 *      只有天窗层才能使用动态快照效果。
 *   (2.游戏中所有的画面都会被动态快照实时播放，
 *      但不包括天窗层的贴图，以及动态快照自己。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令进行Debug测试：
 * 
 * 插件指令：>动态快照核心 : DEBUG测试
 * 插件指令：>动态快照核心 : 关闭DEBUG测试
 * 
 * 1.注意，此测试默认被注释掉，为减少消耗。
 *   如果要测试使用，需要在核心代码中去掉注释。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 工作类型：   倍率持续
 * 时间复杂度： o(n)*o(渲染器处理)
 * 测试方法：   在特效管理层进行性能测试。
 * 测试方法：   无
 * 测试结果：   无
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于动态快照核心直接接管了游戏渲染器，所以消耗无法确定该插件
 *   的具体消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		CODS (Core_Of_Dynamic_Snapshot)
//		临时全局变量	无
//		临时局部变量	this._drill_CODS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		倍率持续
//		★时间复杂度		o(n)*o(渲染器处理)
//		★性能测试因素	特效管理层
//		★性能测试消耗	2724.5ms（Graphics.drill_CODS_render）
//		★最坏情况		无
//		★备注			由于动态快照核心直接接管了渲染器，所以消耗有那么多。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			->☆插件指令
//			
//			->☆渲染器 标准模块
//				->获取 动态快照 材质【标准函数】
//				->获取 动态快照 新贴图【标准函数】
//				->获取 天窗层【标准函数】
//				->清空 天窗层【标准函数】
//			->☆渲染器
//				> 动态快照材质
//				> 天窗层底图
//				> 天窗层
//			->☆DEBUG测试
//			
//			
//		★家谱：
//			大家族-屏幕快照
//			核心
//			
//		★插件私有类：
//			无
//			
//		★必要注意事项：
//			1.经过测试，开启动态快照后，会产生额外一部分消耗。（降低了5帧左右）
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_CODS_PluginTip_curName = "Drill_CoreOfDynamicSnapshot.js 系统-动态快照核心";
	DrillUp.g_CODS_PluginTip_baseList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_CODS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_CODS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_CODS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_CODS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_CODS_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfDynamicSnapshot = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfDynamicSnapshot');
	
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_CODS_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_CODS_pluginCommand.call(this, command, args);
	if( command === ">动态快照核心" ){
		if( args.length == 2 ){
			var unit = String(args[1]);
			if( unit == "DEBUG测试" ){
				$gameTemp._drill_CODS_DebugCreate = true;
			}
			if( unit == "关闭DEBUG测试" ){
				$gameTemp._drill_CODS_DebugDestroy = true;
			}
		}
	};
};



//#############################################################################
// ** ☆渲染器 标准模块
//
//			说明：	即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 渲染器 - 获取 动态快照 材质【标准函数】
//				
//			参数：	> 无
//			返回：	> 材质对象
//
//			说明：	> 材质对象不能作为bitmap使用。
//##############################
Graphics.drill_CODS_getTexture = function(){
	return this._drill_CODS_renderTexture;
}
//##############################
// * 渲染器 - 获取 动态快照 新贴图【标准函数】
//				
//			参数：	> 无
//			返回：	> 贴图对象
//
//			说明：	> 获取到的贴图，只能在 天窗层 工作。
//##############################
Graphics.drill_CODS_getNewSprite = function(){
	var sprite = new Sprite();
	sprite.texture = this._drill_CODS_renderTexture;
	return sprite;
}
//##############################
// * 天窗层 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//			返回：	> 无
//
//			说明：	> 强行规范的接口，将指定贴图添加到天窗层中。
//##############################
Graphics.drill_CODS_overstoryLayerAddSprite = function( sprite ){
	this._drill_CODS_overstoryLayer.addChild( sprite );
	this._drill_CODS_renderEnabled = true;
}
//##############################
// * 天窗层 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从天窗层中移除。
//##############################
Graphics.drill_CODS_overstoryLayerRemoveSprite = function( sprite ){
	this._drill_CODS_overstoryLayer.removeChild( sprite );
	if( this._drill_CODS_overstoryLayer.children.length == 0 ){
		this._drill_CODS_renderEnabled = false;
	}
}
//##############################
// * 天窗层 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，天窗层的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Graphics.drill_CODS_sortByZIndex = function () {
	this._drill_CODS_overstoryLayer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
}
//##############################
// * 天窗层 - 清空 天窗层【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 清空即关闭动态快照。
//##############################
Graphics.drill_CODS_overstoryLayerClear = function(){
	this.drill_CODS_removeChildConnect( this._drill_CODS_overstoryLayer );
	this._drill_CODS_renderEnabled = false;
}


//=============================================================================
// ** ☆渲染器
//			
//			说明：	> 此模块专门提供渲染器的 天窗层和动态快照材质 。
//					> 注意，处于天窗层的贴图，常规场景贴图的销毁够不到此层，需要手动 drill_CODS_clearOverstoryLayer 。
//					> 如果是材质赋值，使用 temp_sprite.texture = temp_texture; 而不是bitmap。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 渲染器 - 初始化
//==============================
var _drill_CODS_Graphics_initialize = Graphics.initialize;
Graphics.initialize = function( width, height, type ){
	_drill_CODS_Graphics_initialize.call( this, width, height, type );
	
	// > 材质初始化（动态快照材质）
	var temp_texture = PIXI.RenderTexture.create( this._boxWidth, this._boxHeight );
	this._drill_CODS_renderTexture = temp_texture;
	
	// > 贴图初始化（天窗层底图）
	var temp_sprite = new Sprite();
	temp_sprite.texture = temp_texture;		//（必须要底图，否则游戏画面都没了）
	this._drill_CODS_overstoryBackground = temp_sprite;
	
	// > 贴图初始化（天窗层）
	var temp_sprite = new Sprite();
	this._drill_CODS_overstoryLayer = temp_sprite;
	this._drill_CODS_overstoryBackground.addChild( temp_sprite );
	
	// > 渲染开关
	this._drill_CODS_renderEnabled = false;
};
//==============================
// * 渲染器 - 最后继承
//==============================
var _drill_CODS_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_CODS_scene_initialize.call(this);
	
	//==============================
	// * 渲染器 - 渲染绑定（半覆写）
	//
	//			说明：	由于是最后继承，因此不会被 核心漏洞修复插件 覆写。
	//==============================
	var _drill_CODS_Graphics_render = Graphics.render;
	Graphics.render = function( stage ){
		if( this.drill_CODS_isRendering() == true ){
			this.drill_CODS_render( stage );
			return;
		}
		_drill_CODS_Graphics_render.call( this, stage );
	};
	//==============================
	// * 渲染器 - 渲染开关
	//			
	//			说明：	只要天窗层下添加了子类，那么开始渲染天窗层。
	//==============================
	Graphics.drill_CODS_isRendering = function(){
		if( this._drill_CODS_renderEnabled == true ){ return true; }
		return false;
	};
	//==============================
	// * 渲染器 - 渲染动态快照
	//==============================
	Graphics.drill_CODS_render = function( stage ){
		if( this._skipCount <= 0 ){		// "=== 0" 的符号bug修复【Drill_RmmvCoreFix 系统-rmmv核心漏洞修复】
			var startTime = Date.now();
			if( stage ){
				
				// > 先渲染到 动态快照材质
				this._renderer.render( stage, this._drill_CODS_renderTexture );
				
				// > 再渲染 天窗层底图
				this._renderer.render( this._drill_CODS_overstoryBackground );
				
				if( this._renderer.gl && this._renderer.gl.flush ){
					this._renderer.gl.flush();
				}
			}
			var endTime = Date.now();
			var elapsed = endTime - startTime;
			this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
			this._rendered = true;
		}else{
			this._skipCount--;
			this._rendered = false;
		}
		this.frameCount++;
	};
	//==============================
	// * 渲染器 - 天窗层底图 帧刷新
	//
	//			说明：	天窗层底图帧刷新 与 场景帧刷新 一样，基于updateScene来执行。
	//==============================
	var _drill_CODS_updateScene = SceneManager.updateScene;
	SceneManager.updateScene = function() {
		_drill_CODS_updateScene.call( this );
		if( this._scene ){
			
			// > 场景已启动，则持续帧刷新
			if( this.isCurrentSceneStarted() == true &&
				Graphics.drill_CODS_isRendering() == true ){
				Graphics._drill_CODS_overstoryBackground.update();
			}
		}
	};
	//==============================
	// * 渲染器 - 销毁 - 递归断开连接（私有）
	//==============================
	Graphics.drill_CODS_removeChildConnect = function( parent_sprite ){
		if( parent_sprite == undefined ){ return; }
		var sprite_list = parent_sprite.children;
		if( sprite_list == undefined ){ return; }
		for( var i = sprite_list.length-1; i >= 0; i-- ){
			var sprite = sprite_list[i];
			if( sprite == undefined ){ continue; }
			parent_sprite.removeChild( sprite );
			this.drill_CODS_removeChildConnect( sprite );
		}
	};
};


/*
//=============================================================================
// ** ☆DEBUG测试
//			
//			说明：	> 此模块专门提供渲染器的 DEBUG贴图创建测试 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG测试 - 帧刷新
//==============================
var _drill_CODS_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_CODS_update.call(this);
    this.drill_CODS_updateDebugCreate();		//帧刷新 - 创建贴图
    this.drill_CODS_updateDebugSprite();		//帧刷新 - 贴图帧刷新
    this.drill_CODS_updateDebugDestroy();		//帧刷新 - 销毁贴图
}
//==============================
// * DEBUG测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_CODS_updateDebugCreate = function() {
    if( $gameTemp._drill_CODS_DebugCreate != true ){ return; }
	$gameTemp._drill_CODS_DebugCreate = false;
	
	var texture = Graphics.drill_CODS_getTexture();
	var ww = texture.width;
	var hh = texture.height;
	
	// > 清理旧贴图
	if( this._drill_CODS_overstory_sprite1 != undefined ){
		Graphics.drill_CODS_overstoryLayerRemoveSprite( this._drill_CODS_overstory_sprite1 );
	}
	if( this._drill_CODS_overstory_sprite2 != undefined ){
		Graphics.drill_CODS_overstoryLayerRemoveSprite( this._drill_CODS_overstory_sprite2 );
	}
	if( this._drill_CODS_overstory_sprite3 != undefined ){
		Graphics.drill_CODS_overstoryLayerRemoveSprite( this._drill_CODS_overstory_sprite3 );
	}
	if( this._drill_CODS_overstory_sprite4 != undefined ){
		Graphics.drill_CODS_overstoryLayerRemoveSprite( this._drill_CODS_overstory_sprite4 );
	}
	
	// > 创建贴图
	var temp_sprite = new Sprite();
	temp_sprite.texture = Graphics.drill_CODS_getTexture();
	temp_sprite.x = 0;
	temp_sprite.y = 0;
	temp_sprite.scale.x = 0.5;
	temp_sprite.scale.y = 0.5;
	temp_sprite.visible = false;
	temp_sprite._drill_time = 0;
	Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	this._drill_CODS_overstory_sprite1 = temp_sprite;
	
	var temp_sprite = Graphics.drill_CODS_getNewSprite();
	temp_sprite.x = ww*0.5;
	temp_sprite.y = 0;
	temp_sprite.scale.x = 0.5;
	temp_sprite.scale.y = 0.5;
	temp_sprite.visible = false;
	temp_sprite._drill_time = 0;
	Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	this._drill_CODS_overstory_sprite2 = temp_sprite;
	
	var temp_sprite = Graphics.drill_CODS_getNewSprite();
	temp_sprite.x = 0;
	temp_sprite.y = hh*0.5;
	temp_sprite.scale.x = 0.5;
	temp_sprite.scale.y = 0.5;
	temp_sprite.visible = false;
	temp_sprite._drill_time = 0;
	Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	this._drill_CODS_overstory_sprite3 = temp_sprite;
	
	var temp_sprite = Graphics.drill_CODS_getNewSprite();
	temp_sprite.x = ww*0.5;
	temp_sprite.y = hh*0.5;
	temp_sprite.scale.x = 0.5;
	temp_sprite.scale.y = 0.5;
	temp_sprite.visible = false;
	temp_sprite._drill_time = 0;
	Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	this._drill_CODS_overstory_sprite4 = temp_sprite;
	
	Graphics.drill_CODS_sortByZIndex();
	
	//问：如果渲染对象放到了渲染对象本身，那么会递归套进去？
	//答：不会，你放进去了就直接不渲染，所有sprite必须独立开来，才能渲染。
}
//==============================
// * DEBUG测试 - 贴图帧刷新
//==============================
Scene_Map.prototype.drill_CODS_updateDebugSprite = function() {
	
	// > 时间流逝
	if( this._drill_CODS_overstory_sprite1 != undefined ){
		this._drill_CODS_overstory_sprite1._drill_time += 1;
	}
	if( this._drill_CODS_overstory_sprite2 != undefined ){
		this._drill_CODS_overstory_sprite2._drill_time += 1;
	}
	if( this._drill_CODS_overstory_sprite3 != undefined ){
		this._drill_CODS_overstory_sprite3._drill_time += 1;
	}
	if( this._drill_CODS_overstory_sprite4 != undefined ){
		this._drill_CODS_overstory_sprite4._drill_time += 1;
	}
	
	
	if( this._drill_CODS_overstory_sprite1 != undefined &&
		this._drill_CODS_overstory_sprite1._drill_time > 45 ){
		this._drill_CODS_overstory_sprite1.visible = true;
	}
	if( this._drill_CODS_overstory_sprite2 != undefined &&
		this._drill_CODS_overstory_sprite2._drill_time > 90 ){
		this._drill_CODS_overstory_sprite2.visible = true;
	}
	if( this._drill_CODS_overstory_sprite3 != undefined &&
		this._drill_CODS_overstory_sprite3._drill_time > 135 ){
		this._drill_CODS_overstory_sprite3.visible = true;
	}
	if( this._drill_CODS_overstory_sprite4 != undefined &&
		this._drill_CODS_overstory_sprite4._drill_time > 180 ){
		this._drill_CODS_overstory_sprite4.visible = true;
	}
	
	if( this._drill_CODS_overstory_sprite1 != undefined &&
		this._drill_CODS_overstory_sprite1._drill_time > 210 ){
		this._drill_CODS_overstory_sprite1.x += 1;
	}
	if( this._drill_CODS_overstory_sprite2 != undefined &&
		this._drill_CODS_overstory_sprite2._drill_time > 210 ){
		this._drill_CODS_overstory_sprite2.y += 1;
	}
	if( this._drill_CODS_overstory_sprite3 != undefined &&
		this._drill_CODS_overstory_sprite3._drill_time > 210 ){
		this._drill_CODS_overstory_sprite3.y -= 1;
	}
	if( this._drill_CODS_overstory_sprite4 != undefined &&
		this._drill_CODS_overstory_sprite4._drill_time > 210 ){
		this._drill_CODS_overstory_sprite4.x -= 1;
	}
}
//==============================
// * DEBUG测试 - 销毁贴图
//==============================
Scene_Map.prototype.drill_CODS_updateDebugDestroy = function() {
    if( $gameTemp._drill_CODS_DebugDestroy != true ){ return; }
	$gameTemp._drill_CODS_DebugDestroy = false;
	
	Graphics.drill_CODS_overstoryLayerClear();
	this._drill_CODS_overstory_sprite1 = null;
	this._drill_CODS_overstory_sprite2 = null;
	this._drill_CODS_overstory_sprite3 = null;
	this._drill_CODS_overstory_sprite4 = null;
}
*/


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfDynamicSnapshot = false;
		var pluginTip = DrillUp.drill_CODS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

