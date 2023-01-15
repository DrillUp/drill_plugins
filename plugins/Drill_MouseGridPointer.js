//=============================================================================
// Drill_MouseGridPointer.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        鼠标 - 网格指向标
 * @author Drill_up
 * 
 * @Drill_LE_param "指向标-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MGP_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseGridPointer +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 玩家鼠标移动到地图的任意区域时，都会有一个网格指向标跟随。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于鼠标。
 * 指向标：
 *   (1.指向标只能在固定的网格中进行移动。
 *      并且只能对鼠标有效，触屏无效。
 *   (2.你可以切换样式来控制不同风格的指向标。
 *      并且指向标能兼容镜头缩放的效果。
 * 设计：
 *   (1.网格指向标的资源可以是单张图片，也可以是GIF图像。
 *      你可以切换样式来控制不同风格的指向标。
 *      指向标的资源不一定必须是48x48的图片，你可以用稍微大一点的图像。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_mouse （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_mouse文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 指向标1 资源-指向标GIF
 * 指向标2 资源-指向标GIF
 * 指向标3 资源-指向标GIF
 * ……
 *
 * 所有素材都放在Map__ui_mouse文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制网格指向标：
 * 
 * 插件指令：>网格指向标 : 显示
 * 插件指令：>网格指向标 : 隐藏
 * 插件指令：>网格指向标 : 开启不可通行自动隐藏
 * 插件指令：>网格指向标 : 关闭不可通行自动隐藏
 * 插件指令：>网格指向标 : 切换样式 : 1
 *
 * 1.数字表示对应配置的指向标编号。
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
 * 测试方法：   开启网格，去各个管理层测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于地图界面中只有网格指向标这一个贴图，所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的 旋转单位 为角度。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 不可通行时是否隐藏
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc 当鼠标指向的图块位置为不可通行区域时，自动隐藏指向标。
 * @default true
 *
 * @param 当前指向标
 * @type number
 * @min 1
 * @desc 当前对应的指向标。
 * @default 1
 * 
 * @param ----指向标----
 * @default 
 *
 * @param 指向标-1
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default {"标签":"==方形框-蓝==","---贴图---":"","资源-指向标GIF":"[\"网格指向标-a1\",\"网格指向标-a1\",\"网格指向标-a1\",\"网格指向标-a1\",\"网格指向标-a2\"]","帧间隔":"4","是否倒放":"false","偏移-指向标 X":"0","偏移-指向标 Y":"0","透明度":"255","混合模式":"0","---效果---":"","旋转速度":"0","是否使用缩放效果":"false","缩放幅度":"0.08","缩放速度":"5.5","是否使用闪烁效果":"false","闪烁速度":"7.0"}
 *
 * @param 指向标-2
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default {"标签":"==方形框-紫红==","---贴图---":"","资源-指向标GIF":"[\"网格指向标-b1\",\"网格指向标-b1\",\"网格指向标-b1\",\"网格指向标-b1\",\"网格指向标-b2\"]","帧间隔":"4","是否倒放":"false","偏移-指向标 X":"0","偏移-指向标 Y":"0","透明度":"255","混合模式":"0","---效果---":"","旋转速度":"0","是否使用缩放效果":"false","缩放幅度":"0.08","缩放速度":"5.5","是否使用闪烁效果":"false","闪烁速度":"7.0"}
 *
 * @param 指向标-3
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-4
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-5
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-6
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-7
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-8
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-9
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-10
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 * 
 */
/*~struct~DrillMGPSprite:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的指向标样式==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-指向标GIF
 * @parent ---贴图---
 * @desc 指向标的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default ["(需配置)网格指向标"]
 * @require 1
 * @dir img/Map__ui_mouse/
 * @type file[]
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
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 * 
 * @param ---效果---
 * @default 
 *
 * @param 旋转速度
 * @parent ---效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周) 
 * @default 0 
 *
 * @param 是否使用缩放效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 *
 * @param 缩放幅度
 * @parent 是否使用缩放效果
 * @desc 缩放的幅度，0.08表示图像大小的8%。
 * @default 0.08
 *
 * @param 缩放速度
 * @parent 是否使用缩放效果
 * @desc 缩放效果的速度。
 * @default 5.5
 *
 * @param 是否使用闪烁效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 * 
 * @param 闪烁速度
 * @parent 是否使用闪烁效果
 * @desc 闪烁效果的速度。
 * @default 7.0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MGP（Mouse_Destination）
//		临时全局变量	DrillUp.g_MGP_xxx
//		临时局部变量	this._drill_MGP_xxx
//		存储数据变量	$gameSystem._drill_MGP_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	乱跑
//		★性能测试消耗	1.22ms（全图只有这一个sprite）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			网格指向标：
//				->网格位置
//				->样式gif
//				->不可通行自动隐藏
//				->缩放效果/闪烁效果
//
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			1.这里被镜头缩放的问题给绕晕了。
//			  镜头缩放时，只要考虑【与镜头相关的变量】。
//			  这个插件中只有 鼠标位置 有变。那么就把鼠标位置转一下就可以了。
//			  图块的实际大小、displayXY是没有任何变化的。
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseGridPointer = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseGridPointer');
	
	
	//==============================
	// * 变量获取 - 网格指向标
	//				（~struct~DrillMGPSprite）
	//==============================
	DrillUp.drill_MGP_initGridData = function( dataFrom ) {
		var data = {};
		if( dataFrom["资源-指向标GIF"] != undefined &&
			dataFrom["资源-指向标GIF"] != "" ){
			data['src_img'] = JSON.parse( dataFrom["资源-指向标GIF"] || [] );
		}else{
			data['src_img'] = [];
		}
		data['interval'] = Number( dataFrom["帧间隔"] || 4 );
		data['back_run'] = String( dataFrom["是否倒放"] || "false") === "true";
		data['x'] = Number( dataFrom["偏移-指向标 X"] || 0 );
		data['y'] = Number( dataFrom["偏移-指向标 Y"] || 0 );
		data['opacity'] = Number( dataFrom["透明度"] || 255 );
		data['blendMode'] = Number( dataFrom["混合模式"] || 0 );
		data['src_bitmaps'] = [];
		
		data['rotate'] = Number( dataFrom["旋转速度"] || 0 );
		data['zoom_enable'] = String( dataFrom["是否使用缩放效果"] || "false") === "true";
		data['zoom_range'] = Number( dataFrom["缩放幅度"] || 0.08 );
		data['zoom_speed'] = Number( dataFrom["缩放速度"] || 5.5 );
		data['flicker_enable'] = String( dataFrom["是否使用闪烁效果"] || "false") === "true";
		data['flicker_speed'] = Number( dataFrom["闪烁速度"] || 7.0 );
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_MGP_visible = String(DrillUp.parameters['是否初始显示'] || 'true') === 'true';
	DrillUp.g_MGP_checkPassage = String(DrillUp.parameters['不可通行时是否隐藏'] || 'true') === 'true';
	DrillUp.g_MGP_curStyle = Number(DrillUp.parameters['当前指向标'] || 0);
	
	/*-----------------网格指向标------------------*/
	DrillUp.g_MGP_list_length = 10;
	DrillUp.g_MGP_list = [];
	for( var i = 0; i < DrillUp.g_MGP_list_length; i++ ){
		if( DrillUp.parameters['指向标-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['指向标-' + String(i+1) ]);
			DrillUp.g_MGP_list[i] = DrillUp.drill_MGP_initGridData( temp );
		}else{
			DrillUp.g_MGP_list[i] = null;
		}
	}

//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapUiMouse = function(filename) {
    return this.loadBitmap('img/Map__ui_mouse/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MGP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MGP_pluginCommand.call(this, command, args);
	if( command === ">网格指向标" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示" ){
				$gameSystem._drill_MGP_visible = true;
			}
			if( type == "隐藏" ){
				$gameSystem._drill_MGP_visible = false;
			}
			if( type == "开启不可通行自动隐藏" ){
				$gameSystem._drill_MGP_checkPassage = true;
			}
			if( type == "关闭不可通行自动隐藏" ){
				$gameSystem._drill_MGP_checkPassage = false;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换样式"){
				$gameSystem._drill_MGP_curStyle = Number(temp1) - 1;
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MGP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MGP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MGP_sys_initialize.call(this);
	this.drill_MGP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MGP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MGP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MGP_saveEnabled == true ){	
		$gameSystem.drill_MGP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MGP_initSysData();
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
Game_System.prototype.drill_MGP_initSysData = function() {
	this.drill_MGP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MGP_checkSysData = function() {
	this.drill_MGP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MGP_initSysData_Private = function() {
	
	this._drill_MGP_visible = DrillUp.g_MGP_visible;				//显示状态
	this._drill_MGP_checkPassage = DrillUp.g_MGP_checkPassage;		//不可通行时是否隐藏
	this._drill_MGP_curStyle = DrillUp.g_MGP_curStyle - 1;			//当前样式
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MGP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MGP_curStyle == undefined ){
		this.drill_MGP_initSysData();
	}
	
};


//=============================================================================
// ** 图层
//=============================================================================
//==============================
// * 图层 - 创建目的地
//==============================
var _drill_MGP_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MGP_createDestination.call(this);
	
	this._drill_MGP_sprite = new Drill_MGP_GridSprite();
	this._drill_MGP_sprite.z = 9;
	this._tilemap.addChild(this._drill_MGP_sprite);
};


//=============================================================================
// ** 网格指向标
//
// 			代码：	> 范围 - 仅用于可视化。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [ ●单个 /多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 样式在贴图帧刷新中自变化。
//=============================================================================
//==============================
// * 贴图 - 定义
//==============================
function Drill_MGP_GridSprite() {
	this.initialize.apply(this, arguments);
}
Drill_MGP_GridSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_MGP_GridSprite.prototype.constructor = Drill_MGP_GridSprite;
//==============================
// * 贴图 - 初始化
//==============================
Drill_MGP_GridSprite.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this);
	
	// > 私有属性初始化
	this.anchor.x = 0.5;				//中心锚点
	this.anchor.y = 0.5;				//
	this._drill_time = 0;				//计时器
	this._drill_data = null;			//样式数据
	this._drill_curStyle = -1;			//当前样式
};
//==============================
// * 贴图 - 帧刷新
//==============================
Drill_MGP_GridSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	this._drill_time += 1;
	
	this.visible = $gameSystem._drill_MGP_visible;					//显示状态
	if( this._drill_curStyle != $gameSystem._drill_MGP_curStyle ){	//重刷结构
		this._drill_curStyle = $gameSystem._drill_MGP_curStyle;
		this.drill_MGP_refreshAll();
	}
	
	this.drill_MGP_updatePosition();					//位置
	this.drill_MGP_updateGif();							//播放gif
	this.drill_MGP_updateCheck();						//不可通行自动隐藏
	this.drill_MGP_updateEffects();						//效果控制
};
//==============================
// * 帧刷新 - 位置
//==============================
Drill_MGP_GridSprite.prototype.drill_MGP_updatePosition = function() {
	
	// > 鼠标坐标
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	
	// > 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){										//（网格指向标贴图 处于中层、上层 之间）
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );		//【不需要】多考虑图块缩放后变小的问题
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );
	}
	
	// > 网格坐标
	var x = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
	var y = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
	x = Math.floor( x );		//修正后的网格坐标
	y = Math.floor( y );
	
	
	// > 坐标修正
	x = $gameMap.adjustX(x + 0.5) * $gameMap.tileWidth();
	y = $gameMap.adjustY(y + 0.5) * $gameMap.tileHeight();
	
	this.x = x;
	this.y = y ;
};

//==============================
// * 帧刷新 - 重刷结构
//==============================
Drill_MGP_GridSprite.prototype.drill_MGP_refreshAll = function() {
	var temp = DrillUp.g_MGP_list[ this._drill_curStyle ];
	if( !temp ){ return; }
	this._drill_data = JSON.parse(JSON.stringify( temp ));
	
	// > 建立sprite
	var temp_sprite = new Sprite();
	var temp_sprite_data = this._drill_data;
	for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
		temp_sprite_data['src_bitmaps'].push(ImageManager.load_MapUiMouse(temp_sprite_data['src_img'][j]));
	}
	temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = temp_sprite_data['x'];
	temp_sprite.y = temp_sprite_data['y'];
	temp_sprite.opacity = temp_sprite_data['opacity'];
	temp_sprite.blendMode = temp_sprite_data['blendMode'];
	
	// > 重添sprite
	if( this._drill_MGP_sprite ){this.removeChild( this._drill_MGP_sprite ); }
	this._drill_MGP_sprite = temp_sprite;
	this.addChild(temp_sprite);
}
//==============================
// * 帧刷新 - 播放gif
//==============================
Drill_MGP_GridSprite.prototype.drill_MGP_updateGif = function() {
	if(!this._drill_data ){ return; }
	if(!this._drill_MGP_sprite ){ return; }
	
	var t_gif = this._drill_MGP_sprite;
	var t_gif_data = this._drill_data;
	
	// > 播放gif
	var inter = this._drill_time ;
	inter = inter / t_gif_data['interval'];
	inter = inter % t_gif_data['src_bitmaps'].length;
	if(t_gif_data['back_run']){
		inter = t_gif_data['src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	t_gif.bitmap = t_gif_data['src_bitmaps'][inter];
	
	// > 自旋转
	t_gif.rotation += t_gif_data['rotate'] /180*Math.PI;
	
}
//==============================
// * 帧刷新 - 不可通行自动隐藏
//==============================
Drill_MGP_GridSprite.prototype.drill_MGP_updateCheck = function() {
	if( $gameSystem._drill_MGP_checkPassage != true ){ return; }
	
	// > 鼠标坐标
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	
	// > 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){	//（网格指向标贴图 处于中层、上层 之间）
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );	
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );	
	}
	
	// > 网格坐标
	var x = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
	var y = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
	x = Math.floor( x );		//修正后的网格坐标
	y = Math.floor( y );
	
	if( $gameMap.isPassable(x, y, 2)||$gameMap.isPassable(x, y, 4)||$gameMap.isPassable(x, y, 6)||$gameMap.isPassable(x, y, 8) ){
		//可通行
		this.visible = $gameSystem._drill_MGP_visible;
	}else{
		//不可通行
		this.visible = false;
	}
}

//==============================
// * 帧刷新 - 效果控制
//==============================
Drill_MGP_GridSprite.prototype.drill_MGP_updateEffects = function() {
	if(!this._drill_data ){ return; }
	var data = this._drill_data;
	
	// > 缩放效果
	if( data['zoom_enable'] == true ){
		var zoom_value = data['zoom_range'];
		var zoom_speed = data['zoom_speed'];
		var scale_value = 1 + zoom_value * Math.cos( this._drill_time*zoom_speed /180*Math.PI );
		this.scale.x = scale_value;
		this.scale.y = scale_value;
	}
	// > 闪烁效果
	if( data['flicker_enable'] == true ){
		var flicker_speed = data['flicker_speed'];
		this.opacity = 127 + 126 * Math.cos( this._drill_time*flicker_speed /180*Math.PI );
	}
}


//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}
