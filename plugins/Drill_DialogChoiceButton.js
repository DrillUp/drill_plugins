//=============================================================================
// Drill_DialogChoiceButton.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        对话框 - 对话选项按钮组
 * @author Drill_up
 * 
 * @Drill_LE_param "对话选项样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DCB_data_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogChoiceButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以把对话框的选项转换成按钮组的形式。
 * ★★必须放在 对话框变形器 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfSelectableButton   系统-按钮组核心★★v1.6及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于对话框选项窗口。
 * 2.详细去看看文档 "15.对话框 > 关于对话选项按钮组.docx"
 * 对话选项样式：
 *   (1.你需要先在按钮组核心中，配置 排列方式、按钮名称模式、
 *      指针、动画效果 等样式，然后在此插件中关联样式。
 *   (2.该插件的选项与资源序列为 顺序对应。
 *      即第一个选项，将使用资源序列的第一个背景作为按钮背景。
 * 设计：
 *   (1.由于默认的对话选项有字数限制，你可以结合字符串核心，
 *      制作多行、长文本的按钮组。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_messageBtn （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_messageBtn文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 对话选项样式1-默认按钮贴图
 * 对话选项样式1-按钮贴图序列
 * 对话选项样式2-默认按钮贴图
 * 对话选项样式2-按钮贴图序列
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要提前设置下面的插件指令，将选项窗口替换成按钮组：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>对话选项按钮组 : 切换为按钮组 : 样式[1]
 * 插件指令：>对话选项按钮组 : 恢复为选项窗口
 * 
 * 1.最好在对话开始前，先替换样式。
 *   如果插件指令 夹在 对话指令与选择项指令中间，会使得对话时，
 *   对话框和选项窗口分开成两步显示。
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
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法：   开启对话选项按钮组，并进行测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【47.41ms】
 *              100个事件的地图中，平均消耗为：【32.61ms】
 *               50个事件的地图中，平均消耗为：【22.74ms】
 * 测试方法2：  在战斗界面中，进行按钮测试。
 * 测试结果2：  战斗界面中，平均消耗为：【26.22ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.按钮组的按钮数量可能会造成一定的消耗。如果频繁切换不同的按钮
 *   样式，也会造成额外的消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了与战斗活动镜头的变换关系。
 * 优化了与地图活动镜头的变换关系。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * 
 * @param 默认是否启用按钮组
 * @type boolean
 * @on 启用
 * @off 使用选项窗口
 * @desc true - 启用，false - 使用选项窗口
 * @default false
 *
 * @param 对话选项默认样式
 * @type number
 * @min 1
 * @desc 对话选项的默认样式。
 * @default 1
 * 
 * @param ----对话选项样式集合----
 * @default 
 * 
 * @param 对话选项样式-1
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-2
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-3
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-4
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-5
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-6
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-7
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-8
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-9
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * @param 对话选项样式-10
 * @parent ----对话选项样式集合----
 * @type struct<DrillDCBStyle>
 * @desc 对话选项样式的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillDCBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的对话选项样式==
 *
 * @param ---常规---
 * @desc 
 *
 * @param 平移-按钮组 X
 * @parent ---常规---
 * @desc x轴方向平移，单位像素，0为贴在最左边。正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-按钮组 Y
 * @parent ---常规---
 * @desc y轴方向平移，单位像素，0为贴在最上面。正数向下，负数向上。
 * @default 0
 *
 * @param 按钮组样式
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 按钮组对应的样式配置，对应 按钮组核心 的样式id。
 * @default 0
 * 
 * @param ---按钮贴图---
 * @desc 
 * 
 * @param 默认按钮贴图
 * @parent ---按钮贴图---
 * @desc 默认按钮的图片资源。
 * @default 按钮-默认
 * @require 1
 * @dir img/Menu__ui_messageBtn/
 * @type file
 *
 * @param 按钮贴图序列
 * @parent ---按钮贴图---
 * @desc 按钮序列与选项是一一对应的，比如序列中编号1表示第1个选项按钮。如果没有，则用默认的。
 * @default []
 * @require 1
 * @dir img/Menu__ui_messageBtn/
 * @type file[]
 *
 * @param ---层级---
 * @desc 
 *
 * @param 地图层级
 * @parent ---层级---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 对话选项样式所在的地图层级。
 * @default 图片层
 *
 * @param 战斗层级
 * @parent ---层级---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 对话选项样式所在的战斗层级。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---层级---
 * @desc 时间数字所处在的图片层级。
 * @default 120
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCB (Dialog_Choice_Button)
//		临时全局变量	DrillUp.g_DCB_xxx
//		临时局部变量	this._drill_DCB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理)  每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	11.74ms（Drill_DCB_BtnLayerSprite.prototype.update）
//		★最坏情况		暂无
//		★备注			主要消耗出现在 按钮组核心 57.41ms，该插件只提供了一个图层进行变换。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话选项按钮组：
//				->结构
//					->按钮组
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的对话选项样式如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//			3.为了保持贴图不会修改到数据，这里使用 _drill_DCB_serial 序列号 来进行同步。
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
　　Imported.Drill_DialogChoiceButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogChoiceButton');
	
	
	//==============================
	// * 变量获取 - 对话选项样式
	//				（~struct~DrillDCBStyle）
	//==============================
	DrillUp.drill_DCB_initParam = function( dataFrom ) {
		var data = {};
		
		// > 基本属性
		data['map_layerIndex'] = String( dataFrom["地图层级"] || "图片层");
		data['battle_layerIndex'] = String( dataFrom["战斗层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		
		// > 按钮组 - 主体
		data['style_id'] = Number( dataFrom["按钮组样式"] || 0);
		data['x'] = Number( dataFrom["平移-按钮组 X"] || 0);
		data['y'] = Number( dataFrom["平移-按钮组 Y"] || 0);
		data['btn_constructor'] = "Window_Selectable";
		//		（选择项有个很愚蠢的操作： this.addCommand(choices[i], 'choice'); ）
		//		（6个选项，全是一样的关键字，而且这个窗口还按 Window_Command 来继承，没办法，就按数组一一对应吧）
		
		// > 按钮组 - 按钮贴图
		data['btn_src_default'] = String( dataFrom["默认按钮贴图"] || "");
		data['btn_src_file'] = "img/Menu__ui_messageBtn/";
		if( dataFrom["按钮贴图序列"] != "" &&
			dataFrom["按钮贴图序列"] != undefined ){
			data['btn_src'] = JSON.parse( dataFrom["按钮贴图序列"] );
		}else{
			data['btn_src'] = [];
		}
		data['btn_srcKeyword'] = [];
		
		// > 按钮组 - 激活
		data['active_enableMouseOk'] = true;	//（鼠标ok点击 开启）
		data['active_hide'] = false;			//（激活后是否瞬间隐藏，克隆选中按钮用）
		data['active_out'] = false;				//（激活后不出列）
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCB_enable = String(DrillUp.parameters["默认是否启用按钮组"] || "false") === "true";
	DrillUp.g_DCB_defaultStyle = Number(DrillUp.parameters["对话选项默认样式"] || 1); 
	
	/*-----------------对话选项样式集合------------------*/
	DrillUp.g_DCB_data_length = 10;
	DrillUp.g_DCB_data = [];
	for( var i = 0; i < DrillUp.g_DCB_data_length; i++ ){
		if( DrillUp.parameters["对话选项样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["对话选项样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["对话选项样式-" + String(i+1) ]);
			DrillUp.g_DCB_data[i] = DrillUp.drill_DCB_initParam( data );
			DrillUp.g_DCB_data[i]['inited'] = true;
		}else{
			DrillUp.g_DCB_data[i] = DrillUp.drill_DCB_initParam( {} );
			DrillUp.g_DCB_data[i]['inited'] = false;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfSelectableButton ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_DCB_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DCB_pluginCommand.call(this, command, args);
	if( command === ">对话选项按钮组" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "恢复为选项窗口" ){
				$gameSystem._drill_DCB_enable = false;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换为按钮组" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_DCB_enable = true;
				$gameSystem._drill_DCB_curStyle = Number(temp1);
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
DrillUp.g_DCB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DCB_sys_initialize.call(this);
	this.drill_DCB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DCB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DCB_saveEnabled == true ){	
		$gameSystem.drill_DCB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DCB_initSysData();
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
Game_System.prototype.drill_DCB_initSysData = function() {
	this.drill_DCB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DCB_checkSysData = function() {
	this.drill_DCB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DCB_initSysData_Private = function() {
	
	this._drill_DCB_enable = DrillUp.g_DCB_enable;
	this._drill_DCB_curStyle = DrillUp.g_DCB_defaultStyle;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCB_curStyle == undefined ){
		this.drill_DCB_initSysData();
	}
	
};


//#############################################################################
// ** 【标准模块】地图层级
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
Scene_Map.prototype.drill_DCB_layerAddSprite = function( sprite, layer_index ){
	this.drill_DCB_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_DCB_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_DCB_sortByZIndex = function () {
    this.drill_DCB_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 镜头参照）
//					> y 数字              （y位置，当前为 镜头参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_DCB_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_DCB_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 上层
//==============================
var _drill_DCB_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_DCB_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_DCB_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_DCB_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_DCB_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DCB_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_DCB_sortByZIndex_Private = function () {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_DCB_layerAddSprite_Private = function( sprite, layer_index ){
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
//==============================
// * 地图层级 - 层级与镜头的位移（私有）
//==============================
Scene_Map.prototype.drill_DCB_layerCameraMoving_Private = function( xx, yy, layer, option ){
		
	// > 镜头参照 -> 地图参照
	if( layer == "下层" || layer == "中层" || layer == "上层" ){
		//（不需要变换）
		return {'x':xx, 'y':yy };
	}
	
	// > 镜头参照 -> 镜头参照
	//  （由于镜头位置_displayX是独立出来的，每个事件、对象都需各自叠加镜头位置，因此此参照系 有无 的效果都是一样的）
	if( layer == "图片层" || layer == "最顶层" ){
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}
//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 创建
//==============================
var _drill_DCB_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DCB_layer_createAllWindows2.call(this);
	
	if( this._messageWindow == undefined ){ return; }
	if( this._messageWindow._choiceWindow == undefined ){ return; }
	
	// > 创建贴图
	var temp_sprite = new Drill_DCB_BtnLayerSprite( this._messageWindow._choiceWindow );
	this._drill_DCB_sprite = temp_sprite;
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_DCB_map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {	
	_drill_DCB_map_updateMain.call(this);
	
	if( this._drill_DCB_sprite == undefined ){ return; }
	
	this.drill_DCB_updateLayer();		//帧刷新 - 对话选项样式变化
	this.drill_DCB_updatePosition();	//帧刷新 - 位置变化
};
//==============================
// * 帧刷新 - 对话选项样式变化
//==============================
Scene_Map.prototype.drill_DCB_updateLayer = function() {
	var temp_sprite = this._drill_DCB_sprite;
	var temp_data = DrillUp.g_DCB_data[ $gameSystem._drill_DCB_curStyle -1 ];
	if( temp_data == undefined ){ return; }
	if( temp_data['inited'] == false ){ return; }
	if( temp_sprite._drill_curLayer == temp_data['map_layerIndex'] ){
		return;
	}
	
	temp_sprite._drill_curLayer = temp_data['map_layerIndex'];
	temp_sprite.zIndex = temp_data['zIndex'];
	
	this.drill_DCB_layerAddSprite( temp_sprite, temp_data['map_layerIndex'] );
	this.drill_DCB_sortByZIndex();
};
//==============================
// * 帧刷新 - 位置变化
//==============================
Scene_Map.prototype.drill_DCB_updatePosition = function() {
	var temp_sprite = this._drill_DCB_sprite;
	var temp_data = temp_sprite._drill_data;
	if( temp_data == null ){ return; }
	
	var xx = 0;
	var yy = 0;
	
	// > 镜头缩放与位移【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		var layer = temp_data['map_layerIndex'];
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			temp_sprite.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
			temp_sprite.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
			//（暂不考虑缩放位移偏转）
		}
		if( layer == "图片层" || layer == "最顶层" ){
			//（不需偏移）
		}
	}
	
	
	// > 层级与镜头的位移（镜头参照）
	var pos = this.drill_DCB_layerCameraMoving(xx, yy, temp_data['map_layerIndex'], {});
	xx = pos['x'];
	yy = pos['y'];
	
	
	temp_sprite.x = xx;
	temp_sprite.y = yy;
};


//#############################################################################
// ** 【标准模块】战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_DCB_layerAddSprite = function( sprite, layer_index ){
	this.drill_DCB_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_DCB_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_DCB_sortByZIndex = function () {
    this.drill_DCB_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 镜头参照）
//					> y 数字              （y位置，当前为 镜头参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_DCB_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_DCB_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_DCB_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_DCB_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_DCB_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_DCB_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_DCB_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_DCB_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_DCB_sortByZIndex_Private = function() {
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_DCB_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_DCB_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 镜头参照 -> 战斗参照
	if( layer == "下层" || layer == "上层" ){
		xx -= this._spriteset._baseSprite.x;
		yy -= this._spriteset._baseSprite.y;
		
		// > 战斗镜头位移（在图层内）
		if( Imported.Drill_BattleCamera ){
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
		}else{
			xx -= this._spriteset._battleField.x;
			yy -= this._spriteset._battleField.y;
		}
		return {'x':xx, 'y':yy };
	}
	
	// > 镜头参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		//（不操作）
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}
//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 地图 - 创建
//==============================
var _drill_DCB_battle_createAllWindows2 = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_DCB_battle_createAllWindows2.call(this);
	
	if( this._messageWindow == undefined ){ return; }
	if( this._messageWindow._choiceWindow == undefined ){ return; }
	
	// > 创建贴图
	var temp_sprite = new Drill_DCB_BtnLayerSprite( this._messageWindow._choiceWindow );
	this._drill_DCB_sprite = temp_sprite;
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_DCB_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_DCB_battle_update.call(this);
	
	if( this._drill_DCB_sprite == undefined ){ return; }
	
	this.drill_DCB_updateLayer();			//帧刷新 - 对话选项样式变化
	this.drill_DCB_updatePosition();		//帧刷新 - 位置变化
};
//==============================
// * 帧刷新 - 对话选项样式变化
//==============================
Scene_Battle.prototype.drill_DCB_updateLayer = function() {
	var temp_sprite = this._drill_DCB_sprite;
	var temp_data = DrillUp.g_DCB_data[ $gameSystem._drill_DCB_curStyle -1 ];
	if( temp_data == undefined ){ return; }
	if( temp_data['inited'] == false ){ return; }
	if( temp_sprite._drill_curLayer == temp_data['battle_layerIndex'] ){
		return;
	}
	
	temp_sprite._drill_curLayer = temp_data['battle_layerIndex'];
	temp_sprite.zIndex = temp_data['zIndex'];
	
	this.drill_DCB_layerAddSprite( temp_sprite, temp_data['battle_layerIndex'] );
	this.drill_DCB_sortByZIndex();
};
//==============================
// * 帧刷新 - 位置变化
//==============================
Scene_Battle.prototype.drill_DCB_updatePosition = function() {
	var temp_sprite = this._drill_DCB_sprite;
	var temp_data = temp_sprite._drill_data;
	if( temp_data == null ){ return; }
	
	var xx = 0;
	var yy = 0;
	
	
	// > 层级与镜头的位移（镜头参照）
	var pos = this.drill_DCB_layerCameraMoving(xx, yy, temp_data['battle_layerIndex'], {});
	xx = pos['x'];
	yy = pos['y'];
	
	
	temp_sprite.x = xx;
	temp_sprite.y = yy;
};


//=============================================================================
// ** 绑定
//=============================================================================
//==============================
// * 对话框 - 捕获刷新
//==============================
var _drill_DCB_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function(){
    _drill_DCB_start.call( this );
    this._drill_DCB_serial = new Date().getTime();	//（生成一个不重复的序列号）
};
//==============================
// * 子窗口 - 选择项窗口 - 捕获位置刷新
//==============================
var _drill_DCB_c_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function(){
	_drill_DCB_c_updatePlacement.call(this);
	
	if( $gameSystem._drill_DCB_enable == true ){
		this.y = Graphics.boxHeight * 2;
	}
}


//=============================================================================
// ** 按钮组层【Drill_DCB_BtnLayerSprite】
//
//			代码：	> 范围 - 该类只对 选项按钮窗口 进行可视化。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [ ●单个 /多个] 
//					> 创建 - [ ●一次性/ 自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 计时器样式修改后，贴图根据样式自动调整。
//=============================================================================
//==============================
// * 按钮组层 - 定义
//==============================
function Drill_DCB_BtnLayerSprite() {
    this.initialize.apply(this, arguments);
}
Drill_DCB_BtnLayerSprite.prototype = Object.create(Sprite.prototype);
Drill_DCB_BtnLayerSprite.prototype.constructor = Drill_DCB_BtnLayerSprite;
//==============================
// * 按钮组层 - 初始化
//==============================
Drill_DCB_BtnLayerSprite.prototype.initialize = function( choiceWindow ){
	Sprite.prototype.initialize.call(this);
	this._drill_choiceWindow = choiceWindow;
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._drill_data = null;			//样式数据
	this._drill_curStyle = -1;			//当前样式
	this._drill_curSerial = -1;			//当前序列号
	this._drill_curLayer = "";			//当前层级
};
//==============================
// * 按钮组层 - 帧刷新
//==============================
Drill_DCB_BtnLayerSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateVisible();			//帧刷新可见
	
	if( $gameSystem._drill_DCB_enable != true ){ return; }
	
	this.drill_updateStyle();			//帧刷新样式
	this.drill_updateRebuild();			//帧刷新重建监听
};
//==============================
// * 帧刷新 - 样式
//==============================
Drill_DCB_BtnLayerSprite.prototype.drill_updateStyle = function() {
	if( this._drill_curStyle == $gameSystem._drill_DCB_curStyle ){ return; }
	this._drill_curStyle = $gameSystem._drill_DCB_curStyle;
	
	// > 样式设置
	var temp_data = DrillUp.g_DCB_data[ this._drill_curStyle -1 ];
	if( temp_data == undefined ){ return; }
	if( temp_data['inited'] == false ){ return; }
	this._drill_data = temp_data;
	
	// > 修改序列号
	this._drill_curSerial = -1;
};
//==============================
// * 帧刷新 - 重建监听
//==============================
Drill_DCB_BtnLayerSprite.prototype.drill_updateRebuild = function() {
	if( this._drill_curSerial == this._drill_choiceWindow._drill_DCB_serial ){ return; }
	this._drill_curSerial = this._drill_choiceWindow._drill_DCB_serial;
	
	this.drill_rebuildLayer();			//重建层级
};
//==============================
// * 创建 - 重建层级
//
//			说明：	此重建过于频繁，会造成 较高 的性能消耗，后期最好改进这里的结构。
//==============================
Drill_DCB_BtnLayerSprite.prototype.drill_rebuildLayer = function() {
	var data = this._drill_data;
	
	this.drill_destroyLayer();
	
	// > 准备按钮组参数
	var data_org = data;					//（该插件的设置）
	var data_style = DrillUp.drill_COSB_getCopyedBtnData( data_org['style_id']-1 );	//深拷贝数据
	var keys = Object.keys(data_org);
	for(var i = 0; i < keys.length; i++){	//（传入值）
		var key = keys[i];
		data_style[key] = data_org[key];
	}
	
	// > 按钮组
	var temp_sprite = new Drill_COSB_LayerSprite( data_style, this._drill_choiceWindow );
	this.addChild(temp_sprite);
	this._drill_layer_sprite = temp_sprite;
};
//==============================
// * 创建 - 重建层级
//==============================
Drill_DCB_BtnLayerSprite.prototype.drill_destroyLayer = function() {	
	if( this._drill_layer_sprite == undefined ){ return; }
	
	// > 清理旧贴图
	this._drill_layer_sprite.drill_COSB_destroy();
	this.removeChild( this._drill_layer_sprite );
	this._drill_layer_sprite = null;
};
//==============================
// * 帧刷新 - 可见设置
//==============================
Drill_DCB_BtnLayerSprite.prototype.drill_updateVisible = function() {
	
	// > 可见设置
	if( this.visible != $gameSystem._drill_DCB_enable ){
		this.visible = $gameSystem._drill_DCB_enable;
	}
	
	// > 不可见时，销毁
	if( $gameSystem._drill_DCB_enable == false &&
		this._drill_layer_sprite != undefined ){
		this.drill_destroyLayer();
	}
};




//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogChoiceButton = false;
		alert(
			"【Drill_DialogChoiceButton.js 对话框 - 对话选项按钮组】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfSelectableButton 系统-按钮组核心"
		);
}

