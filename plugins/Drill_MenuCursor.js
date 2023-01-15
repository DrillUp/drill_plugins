//=============================================================================
// Drill_MenuCursor.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        主菜单 - 多样式菜单指针
 * @author Drill_up
 * 
 * @Drill_LE_param "菜单指针样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MCu_list_length"
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuCursor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当前菜单项会漂浮一个菜单指针，用于帮助显示当前选择的菜单项。
 * ★★必须放在所有 面板类 插件之前★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。也可以与其他插件组合使用。
 * 基于：
 *   - Drill_CoreOfBallistics        系统-弹道核心★★v1.5以上★★
 * 可作用于：
 *   - Drill_CoreOfSelectableButton  系统-按钮组核心
 *     可以使得该指针指向按钮组核心中的按钮。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 菜单指针样式1 资源-菜单指针
 * 菜单指针样式2 资源-菜单指针
 * 菜单指针样式3 资源-菜单指针
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   菜单指针处于最顶层，作用于所有含选项的窗口。
 * 2.详细内容去看看 "17.主菜单 > 关于指针与边框.docx"。
 * 细节：
 *   (1.指针可以设置摇晃效果、缩放效果、浮动效果、持续自旋转。
 *      虽然这些效果都可以叠加，但是叠加后并不好看。
 * 多样式：
 *   (1.你可以通过插件指令修改默认样式。
 *      隐藏、显示都是即时的，且永久有效。
 *   (2.所有drill面板插件中的 含选项的窗口 都支持指针样式锁定。
 *      你可以针对特定的窗口配置自定义的样式。
 * 移动方式：
 *   (1.由于指针是比较常用的短时间指向的标识物，
 *      所以建议指针的移动时间不要大于15帧。
 *   (2.指针会根据指向的目标变化而转移，
 *      如果目标也正在不断移动，那么指针也会在后面追随。
 * 设计：
 *   (1.配置指针可以是圆环，可以是一个指向标，也可以是一个大外框。
 *      还支持gif多张图设计一个动态指针。
 *      并且可以在不同按钮组中，专门指定一个自定义的指针样式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制指针的属性：
 * 
 * 插件指令：>菜单指针 : 显示
 * 插件指令：>菜单指针 : 隐藏
 * 插件指令：>菜单指针 : 修改样式 : 样式[2]
 * 
 * 1.修改样式后，对所有窗口都有效，但不包括锁定了指针的窗口。
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【25.73ms】
 *              地图界面中，平均消耗为：【7.33ms】
 *              菜单界面中，平均消耗为：【9.56ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于菜单指针在界面中只有一个，所以相对消耗一直为固定值。
 *   战斗界面中，由于菜单元素过多，进行筛选时可能会造成一些消耗。
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
 * @param 默认指针样式
 * @type number
 * @min 1
 * @desc 菜单指针默认使用的样式。
 * @default 1
 *
 * @param ---菜单指针样式集---
 * @default
 *
 * @param 菜单指针样式-1
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default {"标签":"--默认指针--","---常规---":"","偏移-指针 X":"-5","偏移-指针 Y":"0","资源-菜单指针":"[\"菜单指针-默认\"]","帧间隔":"4","是否倒放":"false","混合模式":"0","---移动方式---":"","指针所在矩形位置":"矩形左侧","移动类型":"弹性移动","移动时长":"10","移动延迟":"0","---指针动画---":"","摇晃效果":"关闭","摇晃速度":"8.0","摇晃幅度范围":"12","缩放效果":"关闭","缩放速度":"8.0","缩放幅度范围":"0.2","浮动效果":"左右浮动","浮动速度":"7.0","浮动偏移量":"8","持续自旋转":"关闭","自旋转速度":"10.0"}
 * 
 * @param 菜单指针样式-2
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-3
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-4
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-5
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-6
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-7
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-8
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-9
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-10
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-11
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-12
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-13
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-14
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-15
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-16
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-17
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-18
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-19
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 *
 * @param 菜单指针样式-20
 * @parent ---菜单指针样式集---
 * @type struct<DrillMCuStyle>
 * @desc GIF菜单指针的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillMCuStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的指针样式--
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 偏移-指针 X
 * @parent ---常规---
 * @desc 以指针的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 偏移-指针 Y
 * @parent ---常规---
 * @desc 以指针的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * @param 资源-菜单指针
 * @parent ---常规---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default ["(需配置)菜单指针"]
 * @require 1
 * @dir img/Menu__ui/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---常规---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 混合模式
 * @parent ---常规---
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
 * @param ---移动方式---
 * @desc 
 *
 * @param 指针所在矩形位置
 * @parent ---移动方式---
 * @type select
 * @option 矩形中心
 * @value 矩形中心
 * @option 矩形左侧
 * @value 矩形左侧
 * @option 矩形右侧
 * @value 矩形右侧
 * @option 矩形上侧
 * @value 矩形上侧
 * @option 矩形下侧
 * @value 矩形下侧
 * @desc 指针所处的矩形的位置。矩形是指当前选中项的矩形范围。如果是按钮组，则不分矩形，只有一个点。
 * @default 矩形中心
 *
 * @param 移动类型
 * @parent ---移动方式---
 * @type select
 * @option 瞬间移动
 * @value 瞬间移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "1.系统 > 关于弹道.docx"。
 * @default 弹性移动
 *
 * @param 移动时长
 * @parent ---移动方式---
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 12
 *
 * @param 移动延迟
 * @parent ---移动方式---
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 * 
 * @param ---指针动画---
 * @desc 
 * 
 * @param 摇晃效果
 * @parent ---指针动画---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前选中的按钮，会来回摇晃。
 * @default 关闭
 * 
 * @param 摇晃速度
 * @parent 摇晃效果
 * @desc 来回摇晃变化的速度。
 * @default 8.0
 * 
 * @param 摇晃幅度范围
 * @parent 摇晃效果
 * @type number
 * @min 1
 * @desc 来回摇晃的幅度范围。单位角度。
 * @default 12
 *
 * @param 缩放效果
 * @parent ---指针动画---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右缩放
 * @value 左右缩放
 * @option 上下缩放
 * @value 上下缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 当前选中的按钮，会来回缩放。
 * @default 关闭
 * 
 * @param 缩放速度
 * @parent 缩放效果
 * @desc 缩放大小变化的速度。
 * @default 8.0
 * 
 * @param 缩放幅度范围
 * @parent 缩放效果
 * @desc 缩放变化的比例幅度范围。
 * @default 0.2
 *
 * @param 浮动效果
 * @parent ---指针动画---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @desc 当前选中的按钮，会来回浮动。
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
 * @param 持续自旋转
 * @parent ---指针动画---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前选中的按钮，会来回摇晃。
 * @default 关闭
 * 
 * @param 自旋转速度
 * @parent 持续自旋转
 * @desc 自旋转的旋转速度，单位角度/帧。
 * @default 10.0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MCu（Menu_Cursor）
//		临时全局变量	无
//		临时局部变量	this._drill_MCu_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	技能面板
//		★性能测试消耗	菜单：9.56ms、8.36ms
//						地图：7.33ms
//						战斗：30.87ms，25.73ms
//		★最坏情况		无
//		★备注			指针。边框、滚动条这三个插件在性能中出现的频率非常高，很难确定实际消耗量。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多样式菜单指针：
//				->强制鼠标滚轮切换选项
//				->指针属性
//				->移动到位置
//				->指针动画
//					x->闪烁效果
//					->摇晃效果
//					->缩放效果
//					->浮动效果
//					->持续自旋转
// 
//		★私有类如下：
//			* Drill_MCu_Sprite【菜单指针贴图】
//
//		★必要注意事项：
//			1.多样式菜单指针，是一个实现原理简单，但是实现过程【坑一大堆】的功能。
//			
//		★其它说明细节：
//			1.由于菜单指针的目标直接是 Scene_Base ，所以就存在子类后继承覆盖问题：
//			  比如 Scene_Base.prototype.update，必须在面板插件继承Scene_MenuBase子类的update之前继承。不然子类就没有继承到效果。
//			  插件的先后顺序就非常重要了。
//			2.//由于直接在Scene_Base下addChild，所以设置 this.anchor.x=0.5 并【不能】产生位移。
//				上述情况不适用，因为后来发现不是这个问题，是画布内边距的问题。
//			3.在子类继承方面稍微有点混乱。
//			  由于菜单界面的层级没有统一，所以要转移到菜单前面层，不然指针会被遮住。
//			4.默认的鼠标滚动，真就是翻页，而不是切换选项。
//	
//		★存在的问题：
//			1.使用 this.x + rect.x 总会有一些偏移，经测试不是资源图片问题。
//			  解决：除了窗口x、矩形x，还有画布的内边距，因为窗口坐标和画布坐标直接有内边距，所以出现了偏移。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuCursor = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MenuCursor');

	//==============================
	// * 变量获取 - 样式
	//				（~struct~DrillMCuStyle）
	//==============================
	DrillUp.drill_MCu_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 常规
		data['x'] = Number( dataFrom["偏移-指针 X"] || 0);
		data['y'] = Number( dataFrom["偏移-指针 Y"] || 0);
		if( dataFrom["资源-菜单指针"] != "" &&
			dataFrom["资源-菜单指针"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-菜单指针"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/Menu__ui/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		
		// > 移动方式
		data['move_rectPos'] = String( dataFrom["指针所在矩形位置"] || "矩形中心");
		data['move_type'] = String( dataFrom["移动类型"] || "匀速移动");
		data['move_time'] = Number( dataFrom["移动时长"] || 12);
		data['move_delay'] = Number( dataFrom["移动延迟"] || 0);
		
		// > 指针动画
		data['cursor_swing'] = String( dataFrom["摇晃效果"] || "关闭");
		data['cursor_swingSpeed'] = Number( dataFrom["摇晃速度"] || 4.0);
		data['cursor_swingRange'] = Number( dataFrom["摇晃幅度范围"] || 12);
		data['cursor_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['cursor_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['cursor_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		data['cursor_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['cursor_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['cursor_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['cursor_rotating'] = String( dataFrom["持续自旋转"] || "关闭");
		data['cursor_rotatingSpeed'] = Number( dataFrom["自旋转速度"] || 10);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_MCu_init_x = 0;		//（最初点，这个位置Graphics.boxWidth还没建立）
	DrillUp.g_MCu_init_y = 0;		//
	DrillUp.g_MCu_defaultStyle = Number(DrillUp.parameters["默认指针样式"] || 1);
	
	/*-----------------样式集------------------*/
	DrillUp.g_MCu_list_length = 20;
	DrillUp.g_MCu_list = [];
	for( var i = 0; i < DrillUp.g_MCu_list_length; i++ ){
		if( DrillUp.parameters["菜单指针样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["菜单指针样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["菜单指针样式-" + String(i+1) ]);
			DrillUp.g_MCu_list[i] = DrillUp.drill_MCu_initStyle( data );
		}else{
			DrillUp.g_MCu_list[i] = DrillUp.drill_MCu_initStyle( {} );
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MCu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MCu_pluginCommand.call(this, command, args);
	if( command === ">菜单指针" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "显示" ){	
				$gameSystem._drill_MCu_visible = true;
			}
			if( type == "隐藏" ){	
				$gameSystem._drill_MCu_visible = false;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改样式" ){	
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_MCu_style = Number(temp1);
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MCu_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MCu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MCu_sys_initialize.call(this);
	this.drill_MCu_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MCu_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MCu_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MCu_saveEnabled == true ){	
		$gameSystem.drill_MCu_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MCu_initSysData();
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
Game_System.prototype.drill_MCu_initSysData = function() {
	this.drill_MCu_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MCu_checkSysData = function() {
	this.drill_MCu_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MCu_initSysData_Private = function() {
	
	this._drill_MCu_visible = true;
	this._drill_MCu_style = DrillUp.g_MCu_defaultStyle;
	DrillUp.g_MCu_init_x = Graphics.boxWidth*0.5;		//（最初点）
	DrillUp.g_MCu_init_y = Graphics.boxHeight*0.5;		//
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MCu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MCu_style == undefined ){
		this.drill_MCu_initSysData();
	}
	
};


//=============================================================================
// ** 强制鼠标滚轮切换选项（默认的鼠标滚动，真就是翻页，而不是切换选项）
//=============================================================================
var _drill_MCu_processWheel = Window_Selectable.prototype.processWheel;
Window_Selectable.prototype.processWheel = function() {
	_drill_MCu_processWheel.call(this);
	
    if (this.isOpenAndActive() && this.maxItems() > 0) {
		var srow = this.maxTopRow() === 0 ? 1 : this.maxCols();
        var threshold = 20;
		var idx = this._index;
        if( TouchInput.wheelY >= threshold ){
            this._index += srow;
			if( this._index > (this.maxItems() - 1) ){ this._index = this.maxItems() - 1 }
			this.select(this._index);
			if( idx != this._index ){ SoundManager.playCursor(); }
        };
        if( TouchInput.wheelY <= -threshold ){
            this._index -= srow;
			if( this._index < 0 ){ this._index = 0 };
			this.select(this._index);
			if( idx != this._index ){ SoundManager.playCursor(); }
        };
    };
};


//=============================================================================
// ** 位置标记
//=============================================================================
//==============================
// * 位置标记 - 初始化
//==============================
var _drill_MCu_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MCu_temp_initialize.call(this);
	
	this._drill_MCu_sign = {};
	this._drill_MCu_sign['enable'] = false;					//启用
	this._drill_MCu_sign['isPointingButton'] = false;		//指向一个按钮（暂时未用到）
	this._drill_MCu_sign['c_x'] = DrillUp.g_MCu_init_x;		//目标中心x（接口参数）
	this._drill_MCu_sign['c_y'] = DrillUp.g_MCu_init_y;		//目标中心y（接口参数）
	this._drill_MCu_sign['rect'] = null;					//矩形（接口参数，如果选中的只有一个点，则设为null）
	this._drill_MCu_sign['index'] = 0;						//选项索引
	
	this._drill_MCu_cursorSprite = null;					//指针对象本体
}
//==============================
// * 位置标记 - 含选项的窗口
//==============================
var _drill_MCu_updateArrows = Window_Selectable.prototype.updateArrows
Window_Selectable.prototype.updateArrows = function() {
    _drill_MCu_updateArrows.call(this);
	this.drill_MCu_setPositionSign();
}
Window_Selectable.prototype.drill_MCu_setPositionSign = function() {
	if( $gameTemp._drill_MCu_cursorSprite == undefined ){ return; }
	
	// > 条件 - 子类继承控制
	if( this.drill_MCu_cursorEnabled() != true ){ return; }
	
	// > 条件 - 该窗口被激活才能显示（场景中每次只有一个窗口会被激活）
	if( this.active != true ){ return; }
	if( this.visible != true ){ return; }
	if( this.index() == -1 ){ return; }
	
	// > 条件 - 窗口开关动画时隐藏
	if( this._opening == true ){ return; }
	if( this._closing == true ){ return; }
	if( this.isClosed() == true ){ return; }
	
	// > 条件 - 场景转换时隐藏
	if( SceneManager.isSceneChanging() ){ return; }
	
	
	// > 按钮组样式
	var style_id = this.drill_MCu_cursorStyleId();	//（子类可继承此方法，来锁定指针样式）
	if( this._drill_COSB_isOccupyed == true ){
		style_id = this._drill_COSB_forceCursorStyle;
	}
	$gameTemp._drill_MCu_cursorSprite.drill_MCu_changeStyle( style_id );
	
	// > 按钮组情况
	if( this._drill_COSB_isOccupyed == true &&
		this._drill_COSB_selectedBtnX != 0 ){
		$gameTemp._drill_MCu_sign['enable'] = true;
		$gameTemp._drill_MCu_sign['isPointingButton'] = true;
		$gameTemp._drill_MCu_sign['c_x'] = this._drill_COSB_selectedBtnX ;
		$gameTemp._drill_MCu_sign['c_y'] = this._drill_COSB_selectedBtnY ;
		$gameTemp._drill_MCu_sign['index'] = this.index();
		$gameTemp._drill_MCu_sign['rect'] = null;
		return;
	}
	
	// > 设置标记（这里会反复执行）
	var rect = this.itemRect(this.index());
	$gameTemp._drill_MCu_sign['enable'] = true;
	$gameTemp._drill_MCu_sign['isPointingButton'] = false;
	$gameTemp._drill_MCu_sign['c_x'] = this.x + this.standardPadding() + rect.x + (rect.width * 0.5);	//默认中心（注意要包含画布的内边距位置）
	$gameTemp._drill_MCu_sign['c_y'] = this.y + this.standardPadding() + rect.y + (rect.height * 0.5);
	if( this.parent != undefined && this.parent.x != undefined && this.parent.y != undefined ){
		$gameTemp._drill_MCu_sign['c_x'] += this.parent.x ;
		$gameTemp._drill_MCu_sign['c_y'] += this.parent.y ;
	}
	$gameTemp._drill_MCu_sign['index'] = this.index();
	$gameTemp._drill_MCu_sign['rect'] = rect;
}
//==============================
// * 位置标记 - 是否启用指针（子类继承用接口）
//==============================
Window_Selectable.prototype.drill_MCu_cursorEnabled = function() {
	return true;
}
//==============================
// * 位置标记 - 当前指针样式（子类继承用接口）
//==============================
Window_Selectable.prototype.drill_MCu_cursorStyleId = function() {
	return $gameSystem._drill_MCu_style;
}



//=============================================================================
// ** 界面
//=============================================================================
//==============================
// * 界面 - 初始化
//==============================
var _drill_MCu_s_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
	_drill_MCu_s_initialize.call(this);
	this._drill_MCu_cursor = null;
	this._drill_SenceWindowTopArea = null;
}
//==============================
// * 界面 - 窗口顶层（战斗界面、地图界面）（比最顶层低）
//==============================
var _drill_MCu_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
	_drill_MCu_createWindowLayer.call(this);
	
	// > 窗口顶层
	if( !this._drill_SenceWindowTopArea ){
		this._drill_SenceWindowTopArea = new Sprite();
		this.addChild(this._drill_SenceWindowTopArea);	
		//alert("窗口顶层已创建（未被继承覆盖）");
	}
}
//==============================
// * 界面 - 窗口顶层（比最顶层低）
//==============================
var _drill_MCu_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
	
	// > 刷新前，清零统计
	if( $gameTemp != undefined ){
		$gameTemp._drill_MCu_sign['enable'] = false;
	}
	
	_drill_MCu_update.call(this);
	
	// > 建立指针
	if( $gameTemp != undefined &&
		this._drill_SenceWindowTopArea != undefined &&
		this._drill_MCu_cursor == undefined ){
			
		var temp_cursor = new Drill_MCu_Sprite();
		this._drill_MCu_cursor = temp_cursor;
		this._drill_SenceWindowTopArea.addChild( temp_cursor );
		$gameTemp._drill_MCu_cursorSprite = temp_cursor;
		
		//alert("指针已创建（未被继承覆盖）");
	}
	
	// > 菜单前面层（菜单界面）
	if( this instanceof Scene_MenuBase &&		//（如果有菜单前面层，那么往前面层转移，因为窗口顶层会被遮住）
		this._foregroundSprite != undefined &&
		this._drill_MCu_cursor != undefined &&
		this._drill_MCu_cursor._drill_layer == "_drill_SenceWindowTopArea" ){
		this._drill_MCu_cursor._drill_layer = "_foregroundSprite";
		this._foregroundSprite.addChild( this._drill_MCu_cursor );
	}
	
}


//=============================================================================
// ** 菜单指针贴图【Drill_MCu_Sprite】
//
//	 		代码：	> 范围 - 该类对单独的指针进行可视化。
//					> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并，外部只能改样式。
//					> 数量 - [ ●单个 /多个] 界面中只有一个。
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁 ] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 所有样式的参数都在贴图内部自变化。
//=============================================================================
//==============================
// * 菜单指针 - 定义
//==============================
function Drill_MCu_Sprite() {
	this.initialize.apply(this, arguments);
}
Drill_MCu_Sprite.prototype = Object.create(Sprite_Base.prototype);
Drill_MCu_Sprite.prototype.constructor = Drill_MCu_Sprite;
//==============================
// * 菜单指针 - 初始化
//==============================
Drill_MCu_Sprite.prototype.initialize = function(){
	Sprite_Base.prototype.initialize.call(this);
	this._drill_curStyleId = DrillUp.g_MCu_defaultStyle;
	this._drill_curStyle = JSON.parse(JSON.stringify( DrillUp.g_MCu_list[ this._drill_curStyleId-1 ] ));	//深拷贝数据
	
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 菜单指针 - 帧刷新
//==============================
Drill_MCu_Sprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 菜单指针 - 修改样式（接口）
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_changeStyle = function( style_id ){
	if( style_id == 0 ){ return; }
	if( this._drill_curStyleId == style_id ){ return; }
	this._drill_curStyleId = style_id;
	this._drill_curStyle = JSON.parse(JSON.stringify( DrillUp.g_MCu_list[ this._drill_curStyleId-1 ] ));	//深拷贝数据
	this.drill_initSprite();			//强制重新初始化;
}
//==============================
// * 创建 - 初始化对象
//==============================
Drill_MCu_Sprite.prototype.drill_initSprite = function() {
	var data = this._drill_curStyle;	
	
	// > 私有变量初始化
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = data['blendMode'];
	
	this._drill_time = 0;								//持续时间
	this._drill_foldTime = 0;							//当前弹道时间
	this._drill_gif_src = [];							//资源序列
	this._drill_gif_src_bitmaps = [];					//bitmap对象序列
	this._drill_layer = "_drill_SenceWindowTopArea";	//所在层级
	this._drill_rotation_inc = 0;						//旋转累加值
	this._drill_last_signX = DrillUp.g_MCu_init_x;		//目标位置X
	this._drill_last_signY = DrillUp.g_MCu_init_y;		//目标位置Y
	this['_drill_COBa_x'] = [DrillUp.g_MCu_init_x];
	this['_drill_COBa_y'] = [DrillUp.g_MCu_init_y];
	
	this['_x'] = 0;
	this['_y'] = 0;
	this['_rotation'] = 0;
	this['_scale_x'] = 1.0;
	this['_scale_y'] = 1.0;
	//this['_skew_x'] = 0.0;
	//this['_skew_y'] = 0.0;
	
	// > 资源读取
	for(var j = 0; j < data['gif_src'].length ; j++){
		var src_str = data['gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['gif_src_file'], src_str, 0, true);
		this._drill_gif_src.push( src_str );
		this._drill_gif_src_bitmaps.push( obj_bitmap );
	};
	if( this._drill_gif_src_bitmaps.length > 0 ){
		this.bitmap = this._drill_gif_src_bitmaps[0] ;
	}
}
//==============================
// * 帧刷新对象
//==============================
Drill_MCu_Sprite.prototype.drill_updateSprite = function() {
	if( this.bitmap.isReady() == false ){ return; }
	this._drill_time += 1;						//时间+1
	this.drill_MCu_updateVisible();				//显示控制
	this.drill_MCu_updateAttrInit();			//固定帧初始值
	this.drill_MCu_updateGIF();					//播放gif
	this.drill_MCu_updateMoving();				//移动动画
	this.drill_MCu_updateCursorAnim();			//指针动画
	this.drill_MCu_updateOpacity();				//显现/隐藏
	this.drill_MCu_updateAttrSet();				//固定帧赋值
}
//==============================
// * 帧刷新 - 固定帧初始值
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateAttrInit = function() {
	this['_x'] = 0;
	this['_y'] = 0;
	this['_rotation'] = 0;
	this['_scale_x'] = 1.0;
	this['_scale_y'] = 1.0;
	//this['_skew_x'] = 0.0;
	//this['_skew_y'] = 0.0;
}
//==============================
// * 帧刷新 - 固定帧初始值
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateAttrSet = function() {
	if( this.x != this['_x'] ){ this.x = this['_x']; }								// x
	if( this.y != this['_y'] ){ this.y = this['_y']; }								// y
																					// 透明度（无）
	if( this.rotation != this['_rotation'] ){ this.rotation = this['_rotation']; }	// 旋转
	if( this.scale.x != this['_scale_x'] ){ this.scale.x = this['_scale_x']; }		// 缩放x
	if( this.scale.y != this['_scale_y'] ){ this.scale.y = this['_scale_y']; }		// 缩放y
	//if( this.skew.x != this['_skew_x'] ){ this.skew.x = this['_skew_x']; }			// 斜切x
	//if( this.skew.y != this['_skew_y'] ){ this.skew.y = this['_skew_y']; }			// 斜切y
}
//==============================
// * 帧刷新 - 显示控制
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateVisible = function() {
	
	// > 全关情况
	if( $gameSystem._drill_MCu_visible == false ){
		this.visible = false;
		return;
	}
	
	this.visible = true;
}
//==============================
// * 帧刷新 - 播放gif
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateGIF = function() {
	var data = this._drill_curStyle;	
	if( this._drill_gif_src_bitmaps.length == 0 ){ return; }
	
	// > 播放gif
	var inter = this._drill_time;
	inter = inter / data['gif_interval'];
	inter = inter % this._drill_gif_src_bitmaps.length;
	if( data['gif_back_run'] ){
		inter = this._drill_gif_src_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	this.bitmap = this._drill_gif_src_bitmaps[inter] ;
}	
//==============================
// * 帧刷新 - 指针动画
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateCursorAnim = function() {
	var temp_data = this._drill_curStyle;	
	var cur_time = this._drill_time;
	
	// > 摇晃效果
	if( temp_data['cursor_swing'] == "开启" ){
		var speed = temp_data['cursor_swingSpeed'];
		var range = temp_data['cursor_swingRange'];
		var value = range / 180 * Math.PI * Math.sin( cur_time * speed /180*Math.PI );
		this['_rotation'] += value;
	}
	// > 缩放效果
	if( temp_data['cursor_zoom'] == "左右缩放" ){
		var speed = temp_data['cursor_zoomSpeed'];
		var range = temp_data['cursor_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this['_scale_x'] += value;
	}
	if( temp_data['cursor_zoom'] == "上下缩放" ){
		var speed = temp_data['cursor_zoomSpeed'];
		var range = temp_data['cursor_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this['_scale_y'] += value;
	}
	if( temp_data['cursor_zoom'] == "整体缩放" ){
		var speed = temp_data['cursor_zoomSpeed'];
		var range = temp_data['cursor_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this['_scale_x'] += value;
		this['_scale_y'] += value;
	}
	// > 浮动效果
	if( temp_data['cursor_float'] == "左右浮动" ){
		var speed = temp_data['cursor_floatSpeed'];
		var range = temp_data['cursor_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this['_x'] += value;
	}
	if( temp_data['cursor_float'] == "上下浮动" ){
		var speed = temp_data['cursor_floatSpeed'];
		var range = temp_data['cursor_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this['_y'] += value;
	}
	// > 持续自旋转
	if( temp_data['cursor_rotating'] == "开启" ){
		this._drill_rotation_inc += temp_data['cursor_rotatingSpeed'] /180*Math.PI;
		this['_rotation'] += this._drill_rotation_inc;
	}
}
//==============================
// * 帧刷新 - 移动动画
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateMoving = function() {
	var data = this._drill_curStyle;	
	
	// > 瞬间移动（单独独立出来）
	if( data['move_type'] == "瞬间移动" ){
		this._drill_last_signX = $gameTemp._drill_MCu_sign['c_x'];
		this._drill_last_signY = $gameTemp._drill_MCu_sign['c_y'];
		var tar_x = this.drill_MCu_tarX();
		var tar_y = this.drill_MCu_tarY();
		this['_x'] += tar_x;
		this['_y'] += tar_y;
		
		return;
	}
	
	// > 检测目标变化
	if( this._drill_last_signX != $gameTemp._drill_MCu_sign['c_x'] ||
		this._drill_last_signY != $gameTemp._drill_MCu_sign['c_y'] ){
		this._drill_last_signX = $gameTemp._drill_MCu_sign['c_x'];
		this._drill_last_signY = $gameTemp._drill_MCu_sign['c_y'];
		
		// > 弹道设置
		var cur_x = this.drill_MCu_curX();
		var cur_y = this.drill_MCu_curY();
		var tar_x = this.drill_MCu_tarX();
		var tar_y = this.drill_MCu_tarY();
		
		var b_data = {};
		b_data['movementMode'] = "两点式";
		b_data['movementTime'] = data['move_time'];
		b_data['movementDelay']= data['move_delay'];
		b_data['twoPointType'] = data['move_type'];
		b_data['twoPointDifferenceX'] = tar_x - cur_x;
		b_data['twoPointDifferenceY'] = tar_y - cur_y;
		
		// > 弹道初始化
		$gameTemp.drill_COBa_setBallisticsMove( b_data );							//初始化
		$gameTemp.drill_COBa_preBallisticsMove( this, 0, cur_x, cur_y );			//推演赋值
		this._drill_foldTime = 0;													//播放帧时间置零
		
	}
	
	// > 播放弹道
	this['_x'] += this['_drill_COBa_x'][ this._drill_foldTime ] ;
	this['_y'] += this['_drill_COBa_y'][ this._drill_foldTime ] ;
	
	this._drill_foldTime += 1;
	if( this._drill_foldTime >= this['_drill_COBa_x'].length ){
		this._drill_foldTime = this['_drill_COBa_x'].length-1;
	}
}
//==============================
// * 帧刷新 - 显现/隐藏
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_updateOpacity = function() {
	var data = this._drill_curStyle;	
	
	// > 根据enable显示
	if( $gameTemp._drill_MCu_sign['enable'] == true ){
		this.opacity += 255/ (data['move_time']*0.5);
	}else{
		this.opacity -= 255/ (data['move_time']*0.5);
	}
	
	// > 场景切换时，直接隐藏
	if( SceneManager.isSceneChanging() ){
		this.opacity = 0;
	}
}

//=============================================================================
// ** 坐标（由于累加的偏移值过多，这里必须梳理清楚）
//=============================================================================
//==============================
// * 坐标 - 当前位置（除动画偏移的）（必须分函数，不然绕晕）
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_curX = function() {
	var data = this._drill_curStyle;	
	var cur_x = DrillUp.g_MCu_init_x;
	var xx = this['_drill_COBa_x'][ this._drill_foldTime ];		//（当前播放弹道的位置）
	if( xx != undefined && isNaN(xx) == false ){
		cur_x = xx;
	}
	return cur_x;
}
Drill_MCu_Sprite.prototype.drill_MCu_curY = function() {
	var data = this._drill_curStyle;	
	var cur_y = DrillUp.g_MCu_init_y;
	var yy = this['_drill_COBa_y'][ this._drill_foldTime ];
	if( yy != undefined && isNaN(yy) == false ){
		cur_y = yy;
	}
	return cur_y;
}
//==============================
// * 坐标 - 目标位置（除动画偏移的）（必须分函数，不然绕晕）
//==============================
Drill_MCu_Sprite.prototype.drill_MCu_tarX = function() {
	var data = this._drill_curStyle;	
	
	var tar_x = $gameTemp._drill_MCu_sign['c_x'];	//标记位置
	tar_x += data['x']; 							//偏移
	
	// > 矩形偏移
	if( $gameTemp._drill_MCu_sign['rect'] != undefined ){
		if( data['move_rectPos'] == "矩形左侧" ){
			tar_x -= $gameTemp._drill_MCu_sign['rect'].width * 0.5;
		}
		if( data['move_rectPos'] == "矩形右侧" ){
			tar_x += $gameTemp._drill_MCu_sign['rect'].width * 0.5;
		}
	}
	
	return tar_x;
}
Drill_MCu_Sprite.prototype.drill_MCu_tarY = function() {
	var data = this._drill_curStyle;	
	
	var tar_y = $gameTemp._drill_MCu_sign['c_y'];	//标记位置
	tar_y += data['y']; 							//偏移
	
	// > 矩形偏移
	if( $gameTemp._drill_MCu_sign['rect'] != undefined ){
		if( data['move_rectPos'] == "矩形上侧" ){
			tar_y -= $gameTemp._drill_MCu_sign['rect'].height * 0.5;
		}
		if( data['move_rectPos'] == "矩形下侧" ){
			tar_y -= $gameTemp._drill_MCu_sign['rect'].height * 0.5;
		}
	}
	
	return tar_y;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MenuCursor = false;
		alert(
			"【Drill_MenuCursor.js 主菜单 - 多样式菜单指针】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心"
		);
}


