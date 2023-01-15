//=============================================================================
// Drill_MenuCursorBorder.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        主菜单 - 多样式菜单选项边框
 * @author Drill_up
 * 
 * @Drill_LE_param "选项边框样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MCB_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuCursorBorder +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以装饰含选项的窗口的选中项的矩形区域。
 * ★★必须放在所有 面板类 插件之前★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于所有含选项的窗口。
 * 2.详细内容去看看 "17.主菜单 > 关于指针与边框.docx"。
 * 资源划分：
 *   (1.边框会根据资源划分的厚度，划分成9个部分。
 *      资源可以不是正方形，可以是任意大小的边框资源。
 *   (2.具体可以去看看文档的图解。
 * 多样式：
 *   (1.你可以通过插件指令修改默认样式。
 *      隐藏、显示都是即时的，且永久有效。
 *   (2.所有drill面板插件中的 含选项的窗口 都支持指针样式锁定。
 *      你可以针对特定的窗口配置自定义的样式。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 选项边框样式1 资源-边框
 * 选项边框样式1 资源-边角
 * 选项边框样式2 资源-边框
 * 选项边框样式2 资源-边角
 * 选项边框样式3 资源-边框
 * 选项边框样式3 资源-边角
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制边框的属性：
 * 
 * 插件指令：>菜单选项边框 : 显示
 * 插件指令：>菜单选项边框 : 隐藏
 * 插件指令：>菜单选项边框 : 修改样式 : 样式[2]
 * 
 * 1.修改样式后，对所有窗口都有效，但不包括锁定了边框的窗口。
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
 * 时间复杂度： o(n^2)*o(贴图处理)*o(选项窗口数) 每帧
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【56.60ms】
 *              地图界面中，平均消耗为：【29.31ms】
 *              菜单界面中，平均消耗为：【21.51ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于战斗界面中选项窗口较多，所以有很多的选项边框在同时工作。
 *   相对消耗基本在适中范围。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了选项边框设置偏移位置功能。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * @param 默认边框样式
 * @type number
 * @min 1
 * @desc 菜单边框默认使用的样式。
 * @default 1
 *
 * @param ---选项边框样式集---
 * @default
 *
 * @param 选项边框样式-1
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default {"标签":"--默认边框样式--","---边框---":"","资源-边框":"[\"菜单选项边框-默认\"]","边框帧间隔":"4","边框是否倒放":"false","边框混合模式":"0","边框划分厚度":"5","边框拉伸方式":"缩放拉伸","---边角---":"","资源-边角":"[\"菜单选项边角-默认\"]","边角帧间隔":"4","边角是否倒放":"false","边角混合模式":"0","浮动效果":"开启","浮动速度":"7.0","浮动偏移量":"8"}
 * 
 * @param 选项边框样式-2
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-3
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-4
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-5
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-6
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-7
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-8
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-9
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-10
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-11
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-12
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-13
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-14
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-15
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-16
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-17
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-18
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-19
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 *
 * @param 选项边框样式-20
 * @parent ---选项边框样式集---
 * @type struct<DrillMCBStyle>
 * @desc GIF菜单边框的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillMCBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的选项边框样式--
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 偏移-框 X
 * @parent ---常规---
 * @desc 以自动适应的位置为基准，x轴方向平移，正右负左，单位像素。
 * @default 0
 * 
 * @param 偏移-框 Y
 * @parent ---常规---
 * @desc 以自动适应的位置为基准，y轴方向平移，正下负上，单位像素。
 * @default 0
 * 
 * @param 未激活时透明度
 * @parent ---常规---
 * @type number
 * @min 0
 * @min 255
 * @desc 选项边框在窗口未激活时的透明度。0为完全透明，255为完全不透明。
 * @default 125
 * 
 * @param ---边框---
 * @desc 
 * 
 * @param 资源-边框
 * @parent ---边框---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default ["(需配置)菜单选项边框"]
 * @require 1
 * @dir img/Menu__ui/
 * @type file[]
 * 
 * @param 边框帧间隔
 * @parent ---边框---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 边框是否倒放
 * @parent ---边框---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 *
 * @param 边框混合模式
 * @parent ---边框---
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
 * @param 边框划分厚度
 * @parent ---边框---
 * @type number
 * @min 1
 * @desc 插件将从资源图片的边界向内划分一定像素的厚度，并切割成九份，具体可见文档描述。
 * @default 5
 * 
 * @param 边框拉伸方式
 * @parent ---边框---
 * @type select
 * @option 循环平铺
 * @value 循环平铺
 * @option 缩放拉伸
 * @value 缩放拉伸
 * @option 保持切割原样
 * @value 保持切割原样
 * @desc 边框的拉伸方式。
 * @default 循环平铺
 * 
 * @param ---边角---
 * @desc 
 * 
 * @param 资源-边角
 * @parent ---边角---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default ["(需配置)菜单选项边角"]
 * @require 1
 * @dir img/Menu__ui/
 * @type file[]
 * 
 * @param 边角帧间隔
 * @parent ---边角---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 边角是否倒放
 * @parent ---边角---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 *
 * @param 边角混合模式
 * @parent ---边角---
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
 * @param 浮动效果
 * @parent ---边角---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 四个边角，可以来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 7.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 8
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MCB（Menu_Cursor_Border）
//		临时全局变量	无
//		临时局部变量	this._drill_MCB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)*o(选项窗口数)
//		★性能测试因素	技能面板
//		★性能测试消耗	菜单：21.51ms（drill_MCB_updateCorner函数）20.31ms（drill_MCB_updateBorder函数）
//						地图：29.31ms
//						战斗：56.60ms
//		★最坏情况		暂无
//		★备注			指针。边框、滚动条这三个插件在性能中出现的频率非常高，很难确定实际消耗量。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			菜单选项边框：
//				->闪烁白矩形
//				->边框
//					->9区域剪切
//				->边角
//					->4区域剪切
//					->4区域移动动画
//
//		★私有类如下：
//			* Drill_MCB_Sprite【选项边框贴图】
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这个插件原理很简单，平铺用TilingSprite，拉伸用scale.x。
//			  只是切割比较麻烦，要说明清楚。
//			
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuCursorBorder = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuCursorBorder');

	//==============================
	// * 变量获取 - 样式
	//				（~struct~DrillMCBStyle）
	//==============================
	DrillUp.drill_MCB_initStyle = function( dataFrom ) {
		var data = {};
		data['shifting_x'] = Number( dataFrom["偏移-框 X"] || 0);
		data['shifting_y'] = Number( dataFrom["偏移-框 Y"] || 0);
		data['opacity'] = Number( dataFrom["未激活时透明度"] || 125);
		
		// > 边框
		if( dataFrom["资源-边框"] != "" &&
			dataFrom["资源-边框"] != undefined ){
			data['border_gif_src'] = JSON.parse( dataFrom["资源-边框"] );
		}else{
			data['border_gif_src'] = [];
		}
		data['border_gif_src_file'] = "img/Menu__ui/";
		data['border_gif_interval'] = Number( dataFrom["边框帧间隔"] || 4);
		data['border_gif_back_run'] = String( dataFrom["边框是否倒放"] || "false") == "true";
		data['border_blendMode'] = Number( dataFrom["边框混合模式"] || 0);
		data['border_width'] = Number( dataFrom["边框划分厚度"] || 5);
		data['border_type'] = String( dataFrom["边框拉伸方式"] || "循环平铺");
		
		// > 边角
		if( dataFrom["资源-边角"] != "" &&
			dataFrom["资源-边角"] != undefined ){
			data['corner_gif_src'] = JSON.parse( dataFrom["资源-边角"] );
		}else{
			data['corner_gif_src'] = [];
		}
		data['corner_gif_src_file'] = "img/Menu__ui/";
		data['corner_gif_interval'] = Number( dataFrom["边角帧间隔"] || 4);
		data['corner_gif_back_run'] = String( dataFrom["边角是否倒放"] || "false") == "true";
		data['corner_blendMode'] = Number( dataFrom["边角混合模式"] || 0);
		data['corner_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['corner_floatSpeed'] = Number( dataFrom["浮动速度"] || 7.0);
		data['corner_floatRange'] = Number( dataFrom["浮动偏移量"] || 8);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_MCB_defaultStyle = Number(DrillUp.parameters["默认边框样式"] || 1); 
	
	/*-----------------样式集------------------*/
	DrillUp.g_MCB_list_length = 20;
	DrillUp.g_MCB_list = [];
	for( var i = 0; i < DrillUp.g_MCB_list_length; i++ ){
		if( DrillUp.parameters["选项边框样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["选项边框样式-" + String(i+1) ] != "" ){
			var sequence = JSON.parse(DrillUp.parameters["选项边框样式-" + String(i+1) ]);
			DrillUp.g_MCB_list[i] = DrillUp.drill_MCB_initStyle( sequence );
		}else{
			DrillUp.g_MCB_list[i] = DrillUp.drill_MCB_initStyle( {} );
		}
	}

	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MCB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MCB_pluginCommand.call(this, command, args);
	if( command === ">菜单选项边框" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "显示" ){	
				$gameSystem._drill_MCB_visible = true;
			}
			if( type == "隐藏" ){	
				$gameSystem._drill_MCB_visible = false;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改样式" ){	
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_MCB_style = Number(temp1);
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MCB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MCB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MCB_sys_initialize.call(this);
	this.drill_MCB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MCB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MCB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MCB_saveEnabled == true ){	
		$gameSystem.drill_MCB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MCB_initSysData();
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
Game_System.prototype.drill_MCB_initSysData = function() {
	this.drill_MCB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MCB_checkSysData = function() {
	this.drill_MCB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MCB_initSysData_Private = function() {
	
	this._drill_MCB_visible = true;
	this._drill_MCB_style = DrillUp.g_MCB_defaultStyle;
	this._drill_MCB_glimmerRect_visible = true;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MCB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MCB_style == undefined ){
		this.drill_MCB_initSysData();
	}
	
};


//=============================================================================
// * 闪烁白矩形
//=============================================================================
//==============================
// * 闪烁白矩形 - 基类捕获
//==============================
var _drill_MCB__updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
	_drill_MCB__updateCursor.call(this);
	if( this.isOpen() == true ){
		this._windowCursorSprite.visible = this.drill_MCB_glimmerRectVisible();
	}
}
//==============================
// * 闪烁白矩形 - 可见控制（子类继承用接口）
//==============================
Window.prototype.drill_MCB_glimmerRectVisible = function() {
	return $gameSystem._drill_MCB_glimmerRect_visible;
}


//=============================================================================
// * 选项边框
//=============================================================================
//==============================
// * 选项边框 - 初始化
//==============================
var _drill_MCB_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function( x, y, width, height ){
	_drill_MCB_initialize.call(this,x, y, width, height);
	
	// > 选项层
	if( this._drill_selectable_layer == undefined ){
		this._drill_selectable_layer = new Sprite();
		this.addChild( this._drill_selectable_layer );
	}
	
	// > 选项边框
	this._drill_MCB_needRefresh = false;
	this._drill_MCB_sprite = new Drill_MCB_Sprite( this );
	this._drill_MCB_sprite.zIndex = 10;
	this._drill_selectable_layer.addChild( this._drill_MCB_sprite );
	
	// > 层级排序
	this._drill_selectable_layer.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 选项边框 - 捕获
//==============================
var _drill_MCB_setCursorRect = Window_Selectable.prototype.setCursorRect;
Window_Selectable.prototype.setCursorRect = function( x, y, width, height ){
	_drill_MCB_setCursorRect.call(this,x, y, width, height);
	
	// > 刷新标记
	this._drill_MCB_needRefresh = true;
	
	// > 按钮组样式
	if( this._drill_MCB_sprite ){
		var style_id = this.drill_MCB_borderStyleId();	//（子类可继承此方法，来锁定样式）
		this._drill_MCB_sprite.drill_MCB_changeStyle( style_id );
	}
};
//==============================
// * 选项边框 - 是否启用边框（子类继承用接口）
//==============================
Window_Selectable.prototype.drill_MCB_borderEnabled = function() {
	return $gameSystem._drill_MCB_visible;
}
//==============================
// * 选项边框 - 当前边框样式（子类继承用接口）
//==============================
Window_Selectable.prototype.drill_MCB_borderStyleId = function() {
	return $gameSystem._drill_MCB_style;
}


//=============================================================================
// ** 选项边框贴图【Drill_MCB_Sprite】
//
//	 		代码：	> 范围 - 该类对选项窗口的矩形区域进行可视化。
//					> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并，外部只能改样式。
//					> 数量 - [单个/ ●多个 ] 每个选项窗口带一个。
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁 ] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 所有样式的参数都在贴图内部自变化。
//=============================================================================
//==============================
// * 边框贴图 - 定义
//==============================
function Drill_MCB_Sprite() {
	this.initialize.apply(this, arguments);
}
Drill_MCB_Sprite.prototype = Object.create(Sprite_Base.prototype);
Drill_MCB_Sprite.prototype.constructor = Drill_MCB_Sprite;
//==============================
// * 边框贴图 - 初始化
//==============================
Drill_MCB_Sprite.prototype.initialize = function( parent ){
	Sprite_Base.prototype.initialize.call(this);
	this._drill_parent = parent;
	this._drill_curStyleId = DrillUp.g_MCB_defaultStyle;
	this._drill_curStyle = JSON.parse(JSON.stringify( DrillUp.g_MCB_list[ this._drill_curStyleId-1 ] ));	//深拷贝数据
	
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 边框贴图 - 帧刷新
//==============================
Drill_MCB_Sprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	if( this._drill_parent == undefined ){ return; }
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 边框贴图 - 修改样式（接口）
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_changeStyle = function( style_id ){
	if( style_id == 0 ){ return; }
	if( this._drill_curStyleId == style_id ){ return; }
	this._drill_curStyleId = style_id;
	this._drill_curStyle = JSON.parse(JSON.stringify( DrillUp.g_MCB_list[ this._drill_curStyleId-1 ] ));	//深拷贝数据
	this.drill_initSprite();			//强制重新初始化;
};
//==============================
// * 创建 - 初始化对象
//==============================
Drill_MCB_Sprite.prototype.drill_initSprite = function() {
	var data = this._drill_curStyle;	
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.opacity = 0;
	
	// > 私有变量初始化
	this._drill_time = 0;								//持续时间
	this._drill_gifTime = 0;							//当前gif播放时间
	this._drill_border_bitmaps = [];					//边框bitmap对象序列
	this._drill_corner_bitmaps = [];					//边角bitmap对象序列
	
	// > 资源读取
	for(var j = 0; j < data['border_gif_src'].length ; j++){
		var src_str = data['border_gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['border_gif_src_file'], src_str, 0, true);
		this._drill_border_bitmaps.push( obj_bitmap );
	};
	for(var j = 0; j < data['corner_gif_src'].length ; j++){
		var src_str = data['corner_gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['corner_gif_src_file'], src_str, 0, true);
		this._drill_corner_bitmaps.push( obj_bitmap );
	};
	
	this.drill_createBorder();
	this.drill_createCorner();
}
//==============================
// * 创建 - 边框
//==============================
Drill_MCB_Sprite.prototype.drill_createBorder = function() {
	var data = this._drill_curStyle;	
	var rect = this.drill_MCB_getRect();
	
	// > 清理贴图
	if( this._borderSprite_1 != undefined ){ this.removeChild( this._borderSprite_1 ); }
	if( this._borderSprite_2 != undefined ){ this.removeChild( this._borderSprite_2 ); }
	if( this._borderSprite_3 != undefined ){ this.removeChild( this._borderSprite_3 ); }
	if( this._borderSprite_4 != undefined ){ this.removeChild( this._borderSprite_4 ); }
	if( this._borderSprite_6 != undefined ){ this.removeChild( this._borderSprite_6 ); }
	if( this._borderSprite_7 != undefined ){ this.removeChild( this._borderSprite_7 ); }
	if( this._borderSprite_8 != undefined ){ this.removeChild( this._borderSprite_8 ); }
	if( this._borderSprite_9 != undefined ){ this.removeChild( this._borderSprite_9 ); }
	
	// > 建立 2468 区域
	if( data['border_type'] == "循环平铺" ){
		this._borderSprite_2 = new TilingSprite();	//TilingSprite平铺图层
		this._borderSprite_2.move(0, 0, 0, 0);
		this._borderSprite_2.origin.x = 0;
		this._borderSprite_2.origin.y = 0;
		this._borderSprite_4 = new TilingSprite();
		this._borderSprite_4.move(0, 0, 0, 0);
		this._borderSprite_4.origin.x = 0;
		this._borderSprite_4.origin.y = 0;
		this._borderSprite_6 = new TilingSprite();
		this._borderSprite_6.move(0, 0, 0, 0);
		this._borderSprite_6.origin.x = 0;
		this._borderSprite_6.origin.y = 0;
		this._borderSprite_8 = new TilingSprite();
		this._borderSprite_8.move(0, 0, 0, 0);
		this._borderSprite_8.origin.x = 0;
		this._borderSprite_8.origin.y = 0;
	}else if( data['border_type'] == "缩放拉伸" ){
		this._borderSprite_2 = new Sprite();
		this._borderSprite_2.anchor.x = 0.5;
		this._borderSprite_2.anchor.y = 1.0;
		this._borderSprite_4 = new Sprite();
		this._borderSprite_4.anchor.x = 1.0;
		this._borderSprite_4.anchor.y = 0.5;
		this._borderSprite_6 = new Sprite();
		this._borderSprite_6.anchor.x = 0.0;
		this._borderSprite_6.anchor.y = 0.5;
		this._borderSprite_8 = new Sprite();
		this._borderSprite_8.anchor.x = 0.5;
		this._borderSprite_8.anchor.y = 0.0;
	}else if( data['border_type'] == "保持切割原样" ){
		this._borderSprite_2 = new Sprite();
		this._borderSprite_2.anchor.x = 0.5;
		this._borderSprite_2.anchor.y = 1.0;
		this._borderSprite_4 = new Sprite();
		this._borderSprite_4.anchor.x = 1.0;
		this._borderSprite_4.anchor.y = 0.5;
		this._borderSprite_6 = new Sprite();
		this._borderSprite_6.anchor.x = 0.0;
		this._borderSprite_6.anchor.y = 0.5;
		this._borderSprite_8 = new Sprite();
		this._borderSprite_8.anchor.x = 0.5;
		this._borderSprite_8.anchor.y = 0.0;
	}
	this._borderSprite_2.blendMode = data['border_blendMode'];
	this._borderSprite_4.blendMode = data['border_blendMode'];
	this._borderSprite_6.blendMode = data['border_blendMode'];
	this._borderSprite_8.blendMode = data['border_blendMode'];
	this.addChild( this._borderSprite_2 );
	this.addChild( this._borderSprite_4 );
	this.addChild( this._borderSprite_6 );
	this.addChild( this._borderSprite_8 );
	
	// > 建立 1379 区域
	this._borderSprite_1 = new Sprite();
	this._borderSprite_1.anchor.x = 1.0;
	this._borderSprite_1.anchor.y = 1.0;
	this._borderSprite_1.blendMode = data['border_blendMode'];
	this.addChild( this._borderSprite_1 );
	this._borderSprite_3 = new Sprite();
	this._borderSprite_3.anchor.x = 0.0;
	this._borderSprite_3.anchor.y = 1.0;
	this._borderSprite_3.blendMode = data['border_blendMode'];
	this.addChild( this._borderSprite_3 );
	this._borderSprite_7 = new Sprite();
	this._borderSprite_7.anchor.x = 1.0;
	this._borderSprite_7.anchor.y = 0.0;
	this._borderSprite_7.blendMode = data['border_blendMode'];
	this.addChild( this._borderSprite_7 );
	this._borderSprite_9 = new Sprite();
	this._borderSprite_9.anchor.x = 0.0;
	this._borderSprite_9.anchor.y = 0.0;
	this._borderSprite_9.blendMode = data['border_blendMode'];
	this.addChild( this._borderSprite_9 );

	if( this._drill_border_bitmaps.length > 0 ){
		this._borderSprite_1.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_2.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_3.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_4.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_6.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_7.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_8.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_9.bitmap = this._drill_border_bitmaps[0];
	}
}
//==============================
// * 创建 - 边角
//==============================
Drill_MCB_Sprite.prototype.drill_createCorner = function() {
	var data = this._drill_curStyle;	
	
	// > 清理贴图
	if( this._cornerSprite_1 != undefined ){ this.removeChild( this._cornerSprite_1 ); }
	if( this._cornerSprite_2 != undefined ){ this.removeChild( this._cornerSprite_2 ); }
	if( this._cornerSprite_3 != undefined ){ this.removeChild( this._cornerSprite_3 ); }
	if( this._cornerSprite_4 != undefined ){ this.removeChild( this._cornerSprite_4 ); }
	
	// > 建立 左上、右上、左下、右下 区域
	this._cornerSprite_1 = new Sprite();
	this._cornerSprite_1.anchor.x = 0.5;
	this._cornerSprite_1.anchor.y = 0.5;
	this._cornerSprite_1.blendMode = data['corner_blendMode'];
	this.addChild( this._cornerSprite_1 );
	this._cornerSprite_2 = new Sprite();
	this._cornerSprite_2.anchor.x = 0.5;
	this._cornerSprite_2.anchor.y = 0.5;
	this._cornerSprite_2.blendMode = data['corner_blendMode'];
	this.addChild( this._cornerSprite_2 );
	this._cornerSprite_3 = new Sprite();
	this._cornerSprite_3.anchor.x = 0.5;
	this._cornerSprite_3.anchor.y = 0.5;
	this._cornerSprite_3.blendMode = data['corner_blendMode'];
	this.addChild( this._cornerSprite_3 );
	this._cornerSprite_4 = new Sprite();
	this._cornerSprite_4.anchor.x = 0.5;
	this._cornerSprite_4.anchor.y = 0.5;
	this._cornerSprite_4.blendMode = data['corner_blendMode'];
	this.addChild( this._cornerSprite_4 );

	if( this._drill_corner_bitmaps.length > 0 ){
		this._cornerSprite_1.bitmap = this._drill_corner_bitmaps[0];
		this._cornerSprite_2.bitmap = this._drill_corner_bitmaps[0];
		this._cornerSprite_3.bitmap = this._drill_corner_bitmaps[0];
		this._cornerSprite_4.bitmap = this._drill_corner_bitmaps[0];
	}
	
}
//==============================
// * 帧刷新对象
//==============================
Drill_MCB_Sprite.prototype.drill_updateSprite = function() {
	this._drill_time += 1;						//时间+1
	if( this._drill_parent.active ){ this._drill_gifTime += 1; }	//gif播放+1
	this.drill_MCB_updateVisible();				//显示控制
	this.drill_MCB_updateOpacity();				//透明度控制
	this.drill_MCB_refreshPosition();			//位置刷新
	
	this.drill_MCB_updateBorder();				//帧刷新 边框
	this.drill_MCB_updateCorner();				//帧刷新 边角
	
	// > 关闭刷新状态位
	if( this._drill_parent._drill_MCB_needRefresh != false ){
		this._drill_parent._drill_MCB_needRefresh = false;		
	}
}
//==============================
// * 帧刷新 - 显示控制
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_updateVisible = function() {
	
	// > 全关情况
	if( $gameSystem._drill_MCB_visible == false ){
		this.visible = false;
		return;
	}
	
	// > 继承控制不显示
	if( this._drill_parent.drill_MCB_borderEnabled() == false ){
		this.visible = false;
		return;
	}
	
	// > 检测父类 - 窗口关闭
	if( this._drill_parent.isClosed() == true ){
		this.visible = false;
		return;
	}
	
	// > 检测父类 - 窗口被完全隐藏
	if( this._drill_parent.opacity <= 0 && this._drill_parent.contentsOpacity <= 0 ){
		this.visible = false;
		return;
	}
	
	// > 矩形长宽太小
	if( this.drill_MCB_getRect().width <= 2 || this.drill_MCB_getRect().height <= 2 ){
		this.visible = false;
		return;
	}
	
	this.visible = true;
}
//==============================
// * 帧刷新 - 透明度控制
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_updateOpacity = function() {
	var data = this._drill_curStyle;	
	
	// > 初始化前情况
	if( this._drill_parent.active == false && this.opacity == 0 ){ return; }
	
	// > 根据激活状态刷新透明度
	if( this._drill_parent.active == true ){
		this.opacity += 15;
	}else{
		this.opacity -= 25;
	}
	
	// > 未激活时，处于最低透明度
	if( this.opacity < data['opacity'] ){
		this.opacity = data['opacity'];
	}
}
//==============================
// * 位置刷新
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_refreshPosition = function() {
	if( this._drill_parent._drill_MCB_needRefresh == false ){ return; }
	var data = this._drill_curStyle;	
	var rect = this.drill_MCB_getRect();
	
	this.x = rect.x + rect.width*0.5  + this._drill_parent.standardPadding() + data['shifting_x'];	//默认中心（注意要包含画布的内边距位置）
	this.y = rect.y + rect.height*0.5 + this._drill_parent.standardPadding() + data['shifting_y'];
}
//==============================
// * 帧刷新 - 边框
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_updateBorder = function() {
	var data = this._drill_curStyle;	
	if( this._drill_border_bitmaps.length == 0 ){ return; }
	
	// > 播放gif
	var inter = this._drill_gifTime;
	inter = inter / data['border_gif_interval'];
	inter = inter % this._drill_border_bitmaps.length;
	if( data['border_gif_back_run'] ){
		inter = this._drill_border_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	var temp_bitmap = this._drill_border_bitmaps[inter];
	
	// > 分区划片
	if( temp_bitmap.isReady() == false ){ return; }
	this._borderSprite_1.bitmap = temp_bitmap;
	this._borderSprite_2.bitmap = temp_bitmap;
	this._borderSprite_3.bitmap = temp_bitmap;
	this._borderSprite_4.bitmap = temp_bitmap;
	this._borderSprite_6.bitmap = temp_bitmap;
	this._borderSprite_7.bitmap = temp_bitmap;
	this._borderSprite_8.bitmap = temp_bitmap;
	this._borderSprite_9.bitmap = temp_bitmap;
	
	var ww = temp_bitmap.width;
	var hh = temp_bitmap.height;
	var bb = data['border_width'];
	this._borderSprite_1.setFrame( 0,       0,      bb,       bb );
	this._borderSprite_2.setFrame( bb,      0,      ww-bb*2,  bb );
	this._borderSprite_3.setFrame( ww-bb,   0,      bb,       bb );
	this._borderSprite_4.setFrame( 0,       bb,     bb,       hh-bb*2 );
	this._borderSprite_6.setFrame( ww-bb,   bb,     bb,       hh-bb*2 );
	this._borderSprite_7.setFrame( 0,       hh-bb,  bb,       bb );
	this._borderSprite_8.setFrame( bb,      hh-bb,  ww-bb*2,  bb );
	this._borderSprite_9.setFrame( ww-bb,   hh-bb,  bb,       bb );
	
	// > 位置
	var rect = this.drill_MCB_getRect();
	var rww = rect.width*0.5;
	var rhh = rect.height*0.5;
	
	// > 位置 - 2468 区域刷新
	if( data['border_type'] == "循环平铺" ){
		this._borderSprite_2.x = -1 * rww;		//（TilingSprite没有anchor）
		this._borderSprite_2.y = -1 * rhh - bb;
		this._borderSprite_4.x = -1 * rww - bb;
		this._borderSprite_4.y = -1 * rhh;
		this._borderSprite_6.x =  1 * rww;
		this._borderSprite_6.y = -1 * rhh;
		this._borderSprite_8.x = -1 * rww;
		this._borderSprite_8.y =  1 * rhh;
		
		this._borderSprite_2._width  = rect.width ;
		this._borderSprite_2._height = bb ;
		this._borderSprite_4._width  = bb ;
		this._borderSprite_4._height = rect.height ;
		this._borderSprite_6._width  = bb ;
		this._borderSprite_6._height = rect.height ;
		this._borderSprite_8._width  = rect.width ;
		this._borderSprite_8._height = bb ;
		
	}else if( data['border_type'] == "缩放拉伸" ){
		this._borderSprite_2.x =  0 * rww;
		this._borderSprite_2.y = -1 * rhh;
		this._borderSprite_4.x = -1 * rww;
		this._borderSprite_4.y =  0 * rhh;
		this._borderSprite_6.x =  1 * rww;
		this._borderSprite_6.y =  0 * rhh;
		this._borderSprite_8.x =  0 * rww;
		this._borderSprite_8.y =  1 * rhh;
		
		this._borderSprite_2.scale.x = (rect.width +1) / (ww-bb*2) ;	//多1像素用来缝合边
		this._borderSprite_4.scale.y = (rect.height+1) / (hh-bb*2) ;
		this._borderSprite_6.scale.y = (rect.height+1) / (hh-bb*2) ;
		this._borderSprite_8.scale.x = (rect.width +1) / (ww-bb*2) ;
		
	}else if( data['border_type'] == "保持切割原样" ){
		this._borderSprite_2.x =  0 * rww;
		this._borderSprite_2.y = -1 * rhh;
		this._borderSprite_4.x = -1 * rww;
		this._borderSprite_4.y =  0 * rhh;
		this._borderSprite_6.x =  1 * rww;
		this._borderSprite_6.y =  0 * rhh;
		this._borderSprite_8.x =  0 * rww;
		this._borderSprite_8.y =  1 * rhh;
	}
	
	// > 位置 - 1379 区域刷新
	this._borderSprite_1.x = -1 * rww;
	this._borderSprite_1.y = -1 * rhh;
	this._borderSprite_3.x =  1 * rww;
	this._borderSprite_3.y = -1 * rhh;
	this._borderSprite_7.x = -1 * rww;
	this._borderSprite_7.y =  1 * rhh;
	this._borderSprite_9.x =  1 * rww;
	this._borderSprite_9.y =  1 * rhh;
}	
//==============================
// * 帧刷新 - 边角
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_updateCorner = function() {
	var data = this._drill_curStyle;	
	if( this._drill_corner_bitmaps.length == 0 ){ return; }
	
	// > 播放gif
	var inter = this._drill_gifTime;
	inter = inter / data['corner_gif_interval'];
	inter = inter % this._drill_corner_bitmaps.length;
	if( data['corner_gif_back_run'] ){
		inter = this._drill_corner_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	var temp_bitmap = this._drill_corner_bitmaps[inter];
	
	// > 分区划片
	if( temp_bitmap.isReady() == false ){ return; }
	this._cornerSprite_1.bitmap = temp_bitmap;
	this._cornerSprite_2.bitmap = temp_bitmap;
	this._cornerSprite_3.bitmap = temp_bitmap;
	this._cornerSprite_4.bitmap = temp_bitmap;
	
	var ww = temp_bitmap.width;
	var hh = temp_bitmap.height;
	this._cornerSprite_1.setFrame( 0,       0,       ww*0.5,  hh*0.5 );
	this._cornerSprite_2.setFrame( ww*0.5,  0,       ww*0.5,  hh*0.5 );
	this._cornerSprite_3.setFrame( 0,       hh*0.5,  ww*0.5,  hh*0.5 );
	this._cornerSprite_4.setFrame( ww*0.5,  hh*0.5,  ww*0.5,  hh*0.5 );
	
	// > 位置
	var rect = this.drill_MCB_getRect();
	var rww = rect.width*0.5;
	var rhh = rect.height*0.5;
	this._cornerSprite_1.x = -1 * rww;
	this._cornerSprite_1.y = -1 * rhh;
	this._cornerSprite_2.x =  1 * rww;
	this._cornerSprite_2.y = -1 * rhh;
	this._cornerSprite_3.x = -1 * rww;
	this._cornerSprite_3.y =  1 * rhh;
	this._cornerSprite_4.x =  1 * rww;
	this._cornerSprite_4.y =  1 * rhh;
	
	// > 浮动效果
	if( data['corner_float'] == "开启" ){
		var range = data['corner_floatRange'];
		var speed = data['corner_floatSpeed'];
		var f_move = range * Math.sin( (this._drill_gifTime * speed + 180) /180*Math.PI );
		this._cornerSprite_1.x += -1 * f_move;
		this._cornerSprite_1.y += -1 * f_move;
		this._cornerSprite_2.x +=  1 * f_move;
		this._cornerSprite_2.y += -1 * f_move;
		this._cornerSprite_3.x += -1 * f_move;
		this._cornerSprite_3.y +=  1 * f_move;
		this._cornerSprite_4.x +=  1 * f_move;
		this._cornerSprite_4.y +=  1 * f_move;
	}
}

//==============================
// * 边框贴图 - 获取矩形
//==============================
Drill_MCB_Sprite.prototype.drill_MCB_getRect = function(){
   return this._drill_parent._cursorRect
};

