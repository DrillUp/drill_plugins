//=============================================================================
// Drill_LayerCameraConsole.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        地图UI - 活动地图镜头控制台
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerCameraConsole +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 用于辅助表现地图镜头 观光模式下 的控制台UI结构。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_LayerCamera          系统-活动地图镜头★★v1.9及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于鼠标。
 * 细节：
 *   (1.该插件只对地图镜头的 观光模式 进行UI美化。
 *      暂时只包含 边界移动指向标 的功能。 
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_cameraConsole （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_cameraConsole文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-正上方-指向标
 * 资源-左上方-指向标
 *
 * 所有素材都放在Map__ui_cameraConsole文件夹下。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   地图UI管理层开启镜头控制台，进行测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【22.13ms】
 *              100个事件的地图中，平均消耗为：【16.39ms】
 *               50个事件的地图中，平均消耗为：【14.70ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件目前只有移动指向标在工作，所以消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 *
 * 
 * @param ---边界移动指向标---
 * @default 
 * 
 * @param 是否启用边界移动指向标
 * @parent ---边界移动指向标---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 * 
 * @param 边界移动指向标配置
 * @parent ---边界移动指向标---
 * @type struct<DrillLCCMouseBorderSprite>
 * @desc 边界移动指向标的样式配置。
 * @default {}
 * 
 */
/*~struct~DrillLCCMouseBorderSprite:
 * 
 * @param ---资源---
 * @default 
 *
 * @param 资源-正上方-指向标
 * @parent ---资源---
 * @desc 指向标的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default ["(需配置)正上方-边界移动指向标"]
 * @require 1
 * @dir img/Map__ui_cameraConsole/
 * @type file[]
 *
 * @param 资源-左上方-指向标
 * @parent ---资源---
 * @desc 指向标的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default ["(需配置)左上方-边界移动指向标"]
 * @require 1
 * @dir img/Map__ui_cameraConsole/
 * @type file[]
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 偏移-指向标 X
 * @parent ---贴图---
 * @desc 以指向标的点为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-指向标 Y
 * @parent ---贴图---
 * @desc 以指向标的点为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0 
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LCC（Layer_Camera_Console）
//		临时全局变量	DrillUp.g_LCC_xxx
//		临时局部变量	this._drill_LCC_xxx
//		存储数据变量	$gameSystem._drill_LCC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	地图UI管理层
//		★性能测试消耗	14.7ms（update）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆地图层级
//			
//			->☆贴图控制
//			->边界移动指向标 贴图【Drill_LCC_MouseBorderSprite】
//				->A主体
//				->B播放GIF
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 边界移动指向标 贴图【Drill_LCC_MouseBorderSprite】
//		
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.
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
	DrillUp.g_LCC_PluginTip_curName = "Drill_LayerCameraConsole.js 地图UI-活动地图镜头控制台";
	DrillUp.g_LCC_PluginTip_baseList = ["Drill_LayerCamera.js 地图-活动地图镜头"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LCC_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LCC_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LCC_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LCC_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LCC_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerCameraConsole = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerCameraConsole');
	
	
	//==============================
	// * 静态数据 - 鼠标指向标
	//				（~struct~DrillLCCMouseBorderSprite）
	//==============================
	DrillUp.drill_LCC_initMouseBorderSpriteData = function( dataFrom ){
		var data = {};
		if( dataFrom["资源-左上方-指向标"] != undefined &&
			dataFrom["资源-左上方-指向标"] != "" ){
			data['src_img_7'] = JSON.parse( dataFrom["资源-左上方-指向标"] || [] );
		}else{
			data['src_img_7'] = [];
		}
		if( dataFrom["资源-正上方-指向标"] != undefined &&
			dataFrom["资源-正上方-指向标"] != "" ){
			data['src_img_8'] = JSON.parse( dataFrom["资源-正上方-指向标"] || [] );
		}else{
			data['src_img_8'] = [];
		}
		data['src_img_file'] = "img/Map__ui_cameraConsole/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4 );
		data['back_run'] = String( dataFrom["是否倒放"] || "false") === "true";
		data['x'] = Number( dataFrom["偏移-指向标 X"] || 0 );
		data['y'] = Number( dataFrom["偏移-指向标 Y"] || 0 );
		data['opacity'] = Number( dataFrom["透明度"] || 255 );
		data['blendMode'] = Number( dataFrom["混合模式"] || 0 );
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LCC_mouseBorder_visible = String(DrillUp.parameters['是否启用边界移动指向标'] || 'true') === 'true';
	DrillUp.g_LCC_mouseBorder_data = DrillUp.drill_LCC_initMouseBorderSpriteData( JSON.parse(DrillUp.parameters['边界移动指向标配置']) );
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerCamera ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LCC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LCC_pluginCommand.call(this, command, args);
	this.drill_LCC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LCC_pluginCommand = function( command, args ){
	//...
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_LCC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LCC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LCC_sys_initialize.call(this);
	this.drill_LCC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LCC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LCC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LCC_saveEnabled == true ){	
		$gameSystem.drill_LCC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LCC_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_LCC_initSysData = function() {
	this.drill_LCC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LCC_checkSysData = function() {
	this.drill_LCC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LCC_initSysData_Private = function() {
	
	this._drill_LCC_mouseBorder_visible = DrillUp.g_LCC_mouseBorder_visible;	//显示状态
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LCC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LCC_mouseBorder_visible == undefined ){
		this.drill_LCC_initSysData();
	}
	
};


//#############################################################################
// ** 【标准模块】地图层级 ☆地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_LCC_layerAddSprite = function( sprite, layer_index ){
	this.drill_LCC_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LCC_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_LCC_sortByZIndex = function () {
    this.drill_LCC_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LCC_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function(){
	_drill_LCC_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LCC_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function(){
	_drill_LCC_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LCC_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function(){
	_drill_LCC_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LCC_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function(){
	_drill_LCC_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LCC_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_LCC_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LCC_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LCC_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_mapDownArea.addChild( sprite );
	}
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}



//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块管理 边界移动指向标的贴图 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 帧刷新
//==============================
var _drill_LCC_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LCC_update.call(this);
	
	// > 创建贴图
	if( this._drill_LCC_MouseBorderSprite == undefined ){
		var temp_sprite = new Drill_LCC_MouseBorderSprite( DrillUp.g_LCC_mouseBorder_data );
		this.drill_LCC_layerAddSprite( temp_sprite, "最顶层" );
		this._drill_LCC_MouseBorderSprite = temp_sprite;
	}
}


//=============================================================================
// ** 边界移动指向标 贴图【Drill_LCC_MouseBorderSprite】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个 鼠标接近边界时 显示的指向标贴图。
// **		子功能：	
// **					->贴图
// **						->帧刷新
// **					->A主体
// **					->B播放GIF
// **					
// **		说明：	> 该贴图的中心锚点会根据情况变化。
// **
// **		代码：	> 范围 - 仅用于可视化。
// **				> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
// **				> 数量 - [ ●单个 /多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
// **				> 样式 - [不可修改/ ●自变化 /外部变化] 样式在贴图帧刷新中自变化。
//=============================================================================
//==============================
// * 贴图 - 定义
//==============================
function Drill_LCC_MouseBorderSprite() {
	this.initialize.apply(this, arguments);
}
Drill_LCC_MouseBorderSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_LCC_MouseBorderSprite.prototype.constructor = Drill_LCC_MouseBorderSprite;
//==============================
// * 贴图 - 初始化
//==============================
Drill_LCC_MouseBorderSprite.prototype.initialize = function( data ){
	Sprite_Base.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
    this.drill_spriteBorder_initChild();					//初始化子功能
};
//==============================
// * 贴图 - 帧刷新
//==============================
Drill_LCC_MouseBorderSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	this.drill_spriteBorder_updateAttr();			//帧刷新 - A主体
	this.drill_spriteBorder_updateAttr_Position();	//帧刷新 - A主体 - 位置
	this.drill_spriteBorder_updateAttr_Rotation();	//帧刷新 - A主体 - 旋转
	this.drill_spriteBorder_updateAttr_Visible();	//帧刷新 - A主体 - 可见
	this.drill_spriteBorder_updateGIF();			//帧刷新 - B播放GIF
};
//==============================
// * 贴图 - 初始化子功能
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_initChild = function(){
	this.drill_spriteBorder_initAttr();				//初始化子功能 - A主体
	this.drill_spriteBorder_initGIF();				//初始化子功能 - B播放GIF
};

//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_initAttr = function(){
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//当前时间
	this._drill_curDirection = 0;		//当前边界方向
	this._drill_curMouseX = 0;			//当前鼠标位置X
	this._drill_curMouseY = 0;			//当前鼠标位置Y
	
	// > 主体贴图
	this.opacity = data['opacity'];
	this.blendMode = data['blendMode'];
};
//==============================
// * A主体 - 帧刷新
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_updateAttr = function() {
	this._drill_curTime += 1;
	
	// > 地图镜头信息获取
	this._drill_curDirection = $gameSystem._drill_LCa_controller._drill_tourist_mouseDirection;
	this._drill_curMouseX = $gameSystem._drill_LCa_controller._drill_tourist_mouseX;
	this._drill_curMouseY = $gameSystem._drill_LCa_controller._drill_tourist_mouseY;
};
//==============================
// * A主体 - 帧刷新 位置
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_updateAttr_Position = function() {
	var data = this._drill_data;
    
	// > 位置
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	xx += this._drill_curMouseX;
	yy += this._drill_curMouseY;
	
	// > 边界设置
	if( xx < 0 ){ xx = 0; }
	if( yy < 0 ){ yy = 0; }
	if( xx > Graphics.boxWidth  ){ xx = Graphics.boxWidth; }
	if( yy > Graphics.boxHeight ){ yy = Graphics.boxHeight; }
	
	this.x = xx;
	this.y = yy;
};
//==============================
// * A主体 - 帧刷新 旋转
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_updateAttr_Rotation = function() {
	var direction = this._drill_curDirection;
	
	// > 旋转 - 正上方
	if( direction == 8 ){
		this.anchor.x = 0.5;
		this.anchor.y = 0;
		this.rotation = 0;
	}
	// > 旋转 - 正右方
	if( direction == 6 ){
		this.anchor.x = 0.5;
		this.anchor.y = 0;
		this.rotation = Math.PI *0.5;
	}
	// > 旋转 - 正下方
	if( direction == 2 ){
		this.anchor.x = 0.5;
		this.anchor.y = 0;
		this.rotation = Math.PI *1.0;
	}
	// > 旋转 - 正左方
	if( direction == 4 ){
		this.anchor.x = 0.5;
		this.anchor.y = 0;
		this.rotation = Math.PI *1.5;
	}
	// > 旋转 - 左上方
	if( direction == 7 ){
		this.anchor.x = 0;
		this.anchor.y = 0;
		this.rotation = 0;
	}
	// > 旋转 - 右上方
	if( direction == 9 ){
		this.anchor.x = 0;
		this.anchor.y = 0;
		this.rotation = Math.PI *0.5;
	}
	// > 旋转 - 右下方
	if( direction == 3 ){
		this.anchor.x = 0;
		this.anchor.y = 0;
		this.rotation = Math.PI *1.0;
	}
	// > 旋转 - 左下方
	if( direction == 1 ){
		this.anchor.x = 0;
		this.anchor.y = 0;
		this.rotation = Math.PI *1.5;
	}
};
//==============================
// * A主体 - 帧刷新 可见
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_updateAttr_Visible = function() {
	var direction = this._drill_curDirection;
	
	// > 鼠标处于正常位置时，不显示贴图
	if( direction == 5 || direction == 0 ){
		this.visible = false;
		//document.body.style.cursor="auto";	//（隐藏鼠标）
		return;
	}
	
	this.visible = true;
	//document.body.style.cursor="none";
};

//==============================
// * B播放GIF - 初始化子功能
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_initGIF = function(){
	var data = this._drill_data;
	
	// > 资源容器 - 正上方
	this._drill_bitmapTank_8 = [];
	for(var j = 0; j < data['src_img_8'].length ; j++){
		var temp_bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_8'][j], 0, true);
		this._drill_bitmapTank_8.push(temp_bitmap);
	}
	
	// > 资源容器 - 左上方
	this._drill_bitmapTank_7 = [];
	for(var j = 0; j < data['src_img_7'].length ; j++){
		var temp_bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_7'][j], 0, true);
		this._drill_bitmapTank_7.push(temp_bitmap);
	}
	
	this.bitmap = null;
};
//==============================
// * B播放GIF - 帧刷新
//==============================
Drill_LCC_MouseBorderSprite.prototype.drill_spriteBorder_updateGIF = function() {
	if( this.visible == false ){ return; }
	var data = this._drill_data;
	var inter = this._drill_curTime;
	var direction = this._drill_curDirection;
	
	// > 播放GIF - 正上方
	if( direction == 2 || direction == 4 || direction == 6 || direction == 8 ){
		inter = inter / data['interval'];
		inter = Math.floor(inter);
		inter = inter % this._drill_bitmapTank_8.length;
		if( data['back_run'] ){
			inter = this._drill_bitmapTank_8.length - 1 - inter;
		}
		inter = Math.floor(inter);
		this.bitmap = this._drill_bitmapTank_8[inter];
	}
	
	// > 播放GIF - 左上方
	if( direction == 1 || direction == 3 || direction == 7 || direction == 9 ){
		inter = inter / data['interval'];
		inter = Math.floor(inter);
		inter = inter % this._drill_bitmapTank_7.length;
		if( data['back_run'] ){
			inter = this._drill_bitmapTank_7.length - 1 - inter;
		}
		inter = Math.floor(inter);
		this.bitmap = this._drill_bitmapTank_7[inter];
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerCameraConsole = false;
		var pluginTip = DrillUp.drill_LCC_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
