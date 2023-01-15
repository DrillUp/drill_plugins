//=============================================================================
// Drill_GaugeButton.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        鼠标 - 地图按钮集
 * @author Drill_up
 * 
 * @Drill_LE_param "按钮-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GBu_button_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面建立多个公共事件按钮。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput          系统-输入设备核心
 *   - Drill_LayerCommandThread   地图-多线程
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图。
 * 2.详细内容可以去看看 "14.鼠标 > 关于鼠标地图按钮集.docx"。
 * 地图层级：
 *   (1.你只可以将按钮放置在地图层级的 图片层 或 最顶层 中。
 *   (2.你可以在对话框进行时，按钮可按，但是要注意公共事件必须要等
 *      事件结束执行完结束阻塞之后才能运行。
 * 细节：
 *   (1.由于在地图界面中不考虑键盘与手柄，所以按钮没有选中状态。
 *   (2.封印状态的按钮，无法被按下，并且点击后会播放错误提示音。
 *   (3.你可以隐藏按钮，隐藏效果与其他按钮插件中的”禁用”原理一样。
 * 点击触发：
 *   (1.按钮添加后，点击可以执行公共事件。
 *      公共事件在地图界面中并行执行。
 *   (2.你配置的资源图片的矩形大小，决定你按钮的大小。
 *      如果你打算用在移动端，建议使用大图片，不然手指会按不到位置。
 *   (3.如果点击了两个按钮重叠的部分，则高亮的那个按钮起效果。
 * 公共事件：
 *   (1.公共事件的执行通过 地图-多线程 插件来控制。
 *      可选择串行与并行，具体看看 "31.公共事件 > 关于公共事件与并行.docx"。
 *   (2.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强
 *      制串行，阻塞其他所有事件的线程。
 * 设计：
 *   (1.你可以制作地图UI中一些简单的按钮，比如执行某技能效果、
 *      弹丸发射、舞蹈动作、物品机关等功能。
 *      但注意，该插件的功能范围非常局限，只是方便做简单的，
 *      不建议以此来做 虚拟按键、技能按键 等特别复杂的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_gaugeButton （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_gaugeButton文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-面板布局
 * 按钮1 资源-按钮
 * 按钮1 资源-封印图片
 * 按钮1 资源-高亮图片
 * 按钮1 资源-按下图片
 * 按钮2 资源-按钮
 * 按钮2 资源-封印图片
 * 按钮2 资源-高亮图片
 * 按钮2 资源-按下图片
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制按钮集：
 * 
 * 插件指令：>地图按钮集 : 按钮[1] : 显示
 * 插件指令：>地图按钮集 : 按钮[1] : 隐藏
 * 插件指令：>地图按钮集 : 按钮[1] : 设置状态 : 激活
 * 插件指令：>地图按钮集 : 按钮[1] : 设置状态 : 封印
 * 
 * 1.按钮封印后，点击不能执行公共事件。
 *   按钮隐藏后，直接不可见。
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
 * 测试方法：   去物体管理层、地理管理层、初始点跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【21.29ms】
 *              100个事件的地图中，平均消耗为：【20.52ms】
 *               50个事件的地图中，平均消耗为：【18.28ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每个按钮都对应各种状态的贴图，鼠标靠近会即时切换，所以相对
 *   有一些消耗，不过影响不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构，修复了镜头缩放时按钮被缩小的bug。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 *
 * 
 * @param ----按钮集----
 * @default 
 * 
 * @param 按钮-1
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-2
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-3
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-4
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-5
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-6
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-7
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-8
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-9
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-10
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-11
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-12
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-13
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-14
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-15
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-16
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-17
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-18
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-19
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * @param 按钮-20
 * @parent ----按钮集----
 * @type struct<DrillGBuBtn>
 * @desc 按钮的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGBuBtn:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的按钮==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 是否显示按钮
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 按钮初始状态
 * @parent ---贴图---
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @desc 按钮所处的状态。
 * @default 激活
 * 
 * @param 执行的公共事件
 * @parent ---贴图---
 * @type common_event
 * @desc 按钮按下后执行的公共事件。
 * @default 0
 *
 * @param 公共事件执行方式
 * @parent ---贴图---
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。
 * @default 并行
 *
 * @param 平移-按钮 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素，0为中心贴在按钮面板的中心。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-按钮 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素，0为中心贴在按钮面板的中心。正数向下，负数向上。
 * @default 0
 *
 * @param 地图层级
 * @parent ---贴图---
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 地图所在的层级位置，具体关系看看插件说明。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 同一个地图层级中，先后排序的位置，0表示最后面。
 * @default 10
 * 
 * @param ---激活状态---
 * @default 
 * 
 * @param 资源-激活图片
 * @parent ---激活状态---
 * @desc 按钮的图片资源。
 * @default ["(需配置)按钮集-激活图片"]
 * @require 1
 * @dir img/Map__ui_gaugeButton/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---激活状态---
 * @type number
 * @min 1
 * @desc 返回按钮每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---激活状态---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 高亮效果
 * @parent ---激活状态---
 * @type select
 * @option 关闭效果
 * @value 关闭效果
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @option 透明度切换
 * @value 透明度切换
 * @desc 鼠标靠近时，"图片切换"将换成高亮图片。"图片叠加"将直接在按钮上叠加高亮图片。
 * @default 关闭效果
 *
 * @param 资源-高亮图片
 * @parent 高亮效果
 * @desc 返回按钮高亮的图片资源。
 * @default (需配置)按钮集-高亮图片
 * @require 1
 * @dir img/Map__ui_gaugeButton/
 * @type file
 *
 * @param 未高亮透明度
 * @parent 高亮效果
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标未接触面板按钮时按钮的透明度。
 * @default 160
 *
 * @param 高亮透明度
 * @parent 高亮效果
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标接触面板按钮时按钮的透明度。
 * @default 255
 * 
 * @param 按下效果
 * @parent ---激活状态---
 * @type select
 * @option 关闭效果
 * @value 关闭效果
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @desc 鼠标按下时，"图片切换"将换成按下图片。"图片叠加"将直接在按钮上叠加按下图片。
 * @default 关闭效果
 *
 * @param 资源-按下图片
 * @parent 按下效果
 * @desc 返回按钮按下的图片资源。
 * @default (需配置)按钮集-按下图片
 * @require 1
 * @dir img/Map__ui_gaugeButton/
 * @type file
 * 
 * @param ---封印状态---
 * @default 
 * 
 * @param 资源-封印图片
 * @parent ---封印状态---
 * @desc 按钮封印时的图片资源。
 * @default (需配置)按钮集-封印图片
 * @require 1
 * @dir img/Map__ui_gaugeButton/
 * @type file
 * 
 * @param 封印时高亮效果
 * @parent ---封印状态---
 * @type select
 * @option 关闭效果
 * @value 关闭效果
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @option 透明度切换
 * @value 透明度切换
 * @desc 鼠标靠近时，"图片切换"将换成高亮图片。"图片叠加"将直接在按钮上叠加高亮图片。
 * @default 关闭效果
 *
 * @param 资源-封印时高亮图片
 * @parent 封印时高亮效果
 * @desc 返回按钮高亮的图片资源。
 * @default (需配置)按钮集-封印时高亮图片
 * @require 1
 * @dir img/Map__ui_gaugeButton/
 * @type file
 *
 * @param 封印时未高亮透明度
 * @parent 封印时高亮效果
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标未接触面板按钮时按钮的透明度。
 * @default 160
 *
 * @param 封印时高亮透明度
 * @parent 封印时高亮效果
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标接触面板按钮时按钮的透明度。
 * @default 255
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GBu (Gauge_Button)
//		临时全局变量	DrillUp.g_GBu_xxx
//		临时局部变量	this._drill_GBu_xxx
//		存储数据变量	$gameSystem._drill_GBu_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	地图初始点
//		★性能测试消耗	18.28ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			地图按钮集：（鼠标+触屏）
//				->地图点击拦截
//				->激活状态
//					->正常
//					->高亮
//					->按下
//				->封印状态
//					->封印
//					->高亮
//				->功能按钮
//					->自定义公共事件
//					->按钮移动
//		
//		
//		★配置参数结构体如下：
//			~struct~DrillGBuBtn:		按钮参数
//		
//		
//		★私有类如下：
//			* Drill_GBu_ButtonSprite		固定按钮
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的按钮如果放在 图片层 ，需要对其进行相关的镜头缩放控制。
//
//		★其它说明细节：
//			1.鼠标是个很复杂的持续性动作，在update中会持续触发。需要加锁。
//			  只有 高亮 + 点击 才能触发高亮的按钮动作。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeButton');
	
	
	//==============================
	// * 变量获取 - 按钮参数（必须写在前面）
	//				（~struct~DrillGBuBtn）
	//==============================
	DrillUp.drill_GBu_initParam = function( dataFrom ) {
		var data = {};
		// > 贴图
		data['visible'] = String( dataFrom["是否显示按钮"] || "false") === "true";	
		data['status'] = String( dataFrom["按钮初始状态"] || "激活");
		data['commonEventId'] = Number( dataFrom["执行的公共事件"] || 0);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "并行");
		data['x'] = Number( dataFrom["平移-按钮 X"] || 0);
		data['y'] = Number( dataFrom["平移-按钮 Y"] || 0);
		data['layer_index'] = String( dataFrom["地图层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		// > 激活状态
		if( dataFrom["资源-激活图片"] != undefined &&
			dataFrom["资源-激活图片"] != "" ){
			data['gif_src'] = JSON.parse( dataFrom["资源-激活图片"] || [] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 0);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "true") === "true";	
		data['hover_mode'] = String( dataFrom["高亮效果"] || "关闭效果");
		data['hover_src_img'] = String( dataFrom["资源-高亮图片"] || "");
		data['hover_opacity'] = Number( dataFrom["未高亮透明度"] || 160);
		data['hover_lightOpacity'] = Number( dataFrom["高亮透明度"] || 255);
		data['press_mode'] = String( dataFrom["按下效果"] || "关闭效果");
		data['press_src_img'] = String( dataFrom["资源-按下图片"] || "");
		// > 封印状态
		data['lock_src'] = String( dataFrom["资源-封印图片"] || "");
		data['lockHover_mode'] = String( dataFrom["封印时高亮效果"] || "关闭效果");
		data['lockHover_src_img'] = String( dataFrom["资源-高亮图片"] || "");
		data['lockHover_opacity'] = Number( dataFrom["未高亮透明度"] || 160);
		data['lockHover_lightOpacity'] = Number( dataFrom["高亮透明度"] || 255);
		
		return data;
	}
	
	/*-----------------按钮集------------------*/
	DrillUp.g_GBu_button_length = 20;
	DrillUp.g_GBu_button = [];
	for (var i = 0; i < DrillUp.g_GBu_button_length; i++) {
		if( DrillUp.parameters["按钮-" + String(i+1) ] != undefined &&
			DrillUp.parameters["按钮-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["按钮-" + String(i+1) ]);
			DrillUp.g_GBu_button[i] = DrillUp.drill_GBu_initParam( data );
		}else{
			DrillUp.g_GBu_button[i] = null;		//（强制设为空值，节约存储资源）
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_LayerCommandThread ){
	
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapGaugeButton = function(filename) {
    return this.loadBitmap('img/Map__ui_gaugeButton/', filename, 0, true);
};
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GBu_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GBu_pluginCommand.call(this, command, args);
	if( command === ">地图按钮集" ){
		
		/*-----------------按钮控制------------------*/
		if( args.length == 4 ){				//>地图按钮集 : 按钮[1] : 显示
			var btn = String(args[1]);
			var type = String(args[3]);
			
			if( btn.indexOf("按钮[") != -1 ){
				btn = btn.replace("按钮[","");
				btn = btn.replace("]","");
				btn = Number(btn) - 1;
				if( type == "显示" ){
					$gameSystem._drill_GBu_dataTank[ btn ]['visible'] = true;
				}
				if( type == "隐藏" ){
					$gameSystem._drill_GBu_dataTank[ btn ]['visible'] = false;
				}
			}
		}
		if( args.length == 6 ){				//>地图按钮集 : 按钮[1] : 设置状态 : 激活
			var btn = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( btn.indexOf("按钮[") != -1 ){
				btn = btn.replace("按钮[","");
				btn = btn.replace("]","");
				btn = Number(btn) - 1;
				
				if( type == "设置状态" ){
					if( temp1 == "激活" || temp1 == "封印" ){
						$gameSystem._drill_GBu_dataTank[ btn ]['status'] = temp1;
					}
				}
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
DrillUp.g_GBu_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GBu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GBu_sys_initialize.call(this);
	this.drill_GBu_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GBu_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GBu_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_GBu_saveEnabled == true ){	
		$gameSystem.drill_GBu_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_GBu_initSysData();
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
Game_System.prototype.drill_GBu_initSysData = function() {
	this.drill_GBu_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_GBu_checkSysData = function() {
	this.drill_GBu_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_GBu_initSysData_Private = function() {
	
	this._drill_GBu_dataTank = [];							//按钮数据容器
	for( var i=0; i < DrillUp.g_GBu_button.length; i++ ){
		var temp_data = DrillUp.g_GBu_button[i];
		if( temp_data == undefined ){ continue; }
		this._drill_GBu_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_GBu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_GBu_dataTank == undefined ){
		this.drill_GBu_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_GBu_button.length; i++ ){
		var temp_data = DrillUp.g_GBu_button[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_GBu_dataTank[i] == undefined ){
				this._drill_GBu_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 地图点击拦截
//=============================================================================
//==============================
// * 拦截 - 点击监听
//==============================
var _drill_GBu_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_GBu_isOnGaugeButton() ){ return; }	//ui按钮按下（阻止目的地+鼠标辅助面板）
	_drill_GBu_processMapTouch.call(this);
};
//==============================
// * 拦截 - 条件
//==============================
Scene_Map.prototype.drill_GBu_isOnGaugeButton = function() {	
	for(var i=0; i < this._drill_GBu_spriteTank.length; i++){
		if( this.drill_GBu_isHoverInTank( i ) ){
			return true;
		}
	}
	return false;	
}


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
Scene_Map.prototype.drill_GBu_layerAddSprite = function( sprite, layer_index ){
	this.drill_GBu_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_GBu_layerRemoveSprite = function( sprite ){
	//（无）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_GBu_sortByZIndex = function(){
    this.drill_GBu_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_GBu_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GBu_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if(!this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_GBu_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GBu_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_GBu_sortByZIndex_Private = function() {
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_GBu_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}



//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_GBu_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GBu_map_initialize.call(this);
	this._drill_GBu_hoveringOne = null;				//高亮 - 高亮的对象
	this._drill_GBu_pressingOne = null;				//按下 - 按下的对象
};
//==============================
// * 地图 - 创建
//==============================
var _drill_GBu_map_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GBu_map_createAllWindows2.call(this);
	
	this.drill_GBu_createButton();			//创建按钮
}
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GBu_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GBu_map_update.call(this);
	if( this.isActive() ){
		this.drill_GBu_updateHoverHighlight();		//高亮捕获
		this.drill_GBu_updatePlayerInput();			//操作监听
		this.drill_GBu_updateButtonAttr();			//按钮属性刷新
	}
};
//==============================
// * 创建 - 按钮
//==============================
Scene_Map.prototype.drill_GBu_createButton = function() {
	this._drill_GBu_spriteTank = [];
	for( var i=0; i < $gameSystem._drill_GBu_dataTank.length; i++ ){
		var data = $gameSystem._drill_GBu_dataTank[i];
		if( data == null ){
			this._drill_GBu_spriteTank[i] = null;	//data和贴图一对一，null也包括
			continue;
		}
		
		// > 创建按钮贴图
		var temp_sprite = new Drill_GBu_ButtonSprite( data );
		
		// > 贴图层级
		this.drill_GBu_layerAddSprite( temp_sprite, data['layer_index'] );
		this._drill_GBu_spriteTank[i] = temp_sprite;
	}
	
	// > 层级排序
	this.drill_GBu_sortByZIndex();
};
//==============================
// * 帧刷新 - 按钮属性刷新
//==============================
Scene_Map.prototype.drill_GBu_updateButtonAttr = function() {	
	for( var i=0; i < this._drill_GBu_spriteTank.length; i++ ){
		var data = $gameSystem._drill_GBu_dataTank[i];
		var sprite = this._drill_GBu_spriteTank[i];
		if( data == null ){ continue; }
		if( sprite == null ){ continue; }
		
		sprite.drill_setStatus( data['status'] );		//实时赋值 状态数据
		sprite.drill_setVisible( data['visible'] );		//实时赋值 显示数据
		
		if( this._drill_GBu_hoveringOne == sprite ){	//实时赋值 高亮情况
			sprite.drill_setHover( true );
		}else{
			sprite.drill_setHover( false );
		}
		
		if( this._drill_GBu_pressingOne == sprite ){	//实时赋值 按下情况
			sprite.drill_setPress( true );
		}else{
			sprite.drill_setPress( false );
		}
		
	}
}


//=============================================================================
// * 高亮控制
//=============================================================================
//==============================
// * 高亮 - 高亮捕获
//==============================
Scene_Map.prototype.drill_GBu_updateHoverHighlight = function() {
	//高亮说明：
	//		1.按钮集合中，只能同时高亮一个按钮。
	//		2.如果鼠标悬浮于两个按钮间，最前面的按钮优先权最高。

	for(var i = 0 ; i < this._drill_GBu_spriteTank.length ; i++){	
		var sprite = this._drill_GBu_spriteTank[i];
		var data = $gameSystem._drill_GBu_dataTank[i];
		if( data == null ){ continue; }
		if( sprite == null ){ continue; }
		
		if( this.drill_GBu_isHoverInTank( i ) ){			//判断高亮
			this.drill_GBu_setHoverInTank( i );				//设置高亮
			break;
		}else{
			this.drill_GBu_setUnhoverInTank( i );			//设置未高亮（如果按钮关闭，高亮会立即摘除）
		}
	}
};
//==============================
// * 高亮 - 设置高亮
//==============================
Scene_Map.prototype.drill_GBu_setHoverInTank = function( index ){
	var data = $gameSystem._drill_GBu_dataTank[ index ];
	var sprite = this._drill_GBu_spriteTank[ index ];
	
	// > 找到了层级更高的高亮按钮
	if( this._drill_GBu_hoveringOne != sprite ){
		this._drill_GBu_hoveringOne = null;
	};
	// > 正在高亮的按钮，返回
	if( this._drill_GBu_hoveringOne != null ){ return };
	
	// > 设置高亮
	this._drill_GBu_hoveringOne = sprite;
	SoundManager.playCursor();
}
//==============================
// * 高亮 - 设置未高亮
//==============================
Scene_Map.prototype.drill_GBu_setUnhoverInTank = function( index ){
	var data = $gameSystem._drill_GBu_dataTank[ index ];
	var sprite = this._drill_GBu_spriteTank[ index ];
	
	// > 非正在高亮的按钮，返回
	if( sprite != this._drill_GBu_hoveringOne ){ return };
	
	// > 设置未高亮
	this._drill_GBu_hoveringOne = null;
}
//==============================
// * 高亮 - 判断指定按钮高亮
//==============================
Scene_Map.prototype.drill_GBu_isHoverInTank = function( index ){
	var data = $gameSystem._drill_GBu_dataTank[ index ];
	var sprite = this._drill_GBu_spriteTank[ index ];
	
	if( sprite == null ){ return false };
	if( sprite.bitmap == null ){ return false };
	if( !sprite.bitmap.isReady() ){ return false };
	if( sprite.visible === false ){ return false };
	if( data == null ){ return false };
	if( data['visible'] == false ){ return false };
	
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.drill_getUIposX() ;
	var cy = sprite.drill_getUIposY() ;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( _x < this.x + cx - cw*sprite.anchor.x + 0  ){return false};
	if( _x > this.x + cx - cw*sprite.anchor.x + cw ){return false};
	if( _y < this.y + cy - ch*sprite.anchor.y + 0  ){return false};
	if( _y > this.y + cy - ch*sprite.anchor.y + ch ){return false};
	return true;	
};


//=============================================================================
// ** 按钮操作
//=============================================================================
//==============================
// ** 操作 - 监听
//==============================
Scene_Map.prototype.drill_GBu_updatePlayerInput = function() {
	
	// > 鼠标按下
	if( this._drill_GBu_pressingOne == null && TouchInput.isTriggered() ){
		for(var i=0; i < this._drill_GBu_spriteTank.length; i++ ){
			var sprite = this._drill_GBu_spriteTank[i];
			var data = $gameSystem._drill_GBu_dataTank[i];
			if( data == null ){ continue; }
			if( sprite == null ){ continue; }
			
			if( this._drill_GBu_hoveringOne == sprite ){
				this._drill_GBu_pressingOne = sprite;		//记录按下的按钮
				break;
			}
		}
	}
	
	// > 鼠标抬起
	if( this._drill_GBu_pressingOne != null && TouchInput.isReleased() ){
		for(var i=0; i < this._drill_GBu_spriteTank.length; i++ ){
			var sprite = this._drill_GBu_spriteTank[i];
			var data = $gameSystem._drill_GBu_dataTank[i];
			if( data == null ){ continue; }
			if( sprite == null ){ continue; }
			
			if( this._drill_GBu_pressingOne == sprite ){
				this._drill_GBu_pressingOne = null;
				
				if( data['status'] == "封印" ){
					SoundManager.playBuzzer();
					break;
				}
				
				if( data['status'] == "激活" ){
					// > 执行公共事件
					//$gameTemp.reserveCommonEvent( data['commonEventId'] );
					SoundManager.playOk();
					var e_data = {
						'type':"公共事件",
						'pipeType': data['pipeType'],
						'commonEventId': data['commonEventId'],
					};
					$gameMap.drill_LCT_addPipeEvent( e_data );
					break;
				}
			}
		}
	}
	
}


//=============================================================================
// ** 固定按钮
// 
// 			说明：	这里将按钮的各个状态封装在一起。
//					初始化设置资源后，调用接口状态切换，能够随时切换到指定的按钮状态。
//					
//			代码：	> 范围 - 该类显示固定的按钮。
//					> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁 ] 
//					> 样式 - [不可修改/自变化/ ●外部变化 ] 通过外部修改样式设置高亮情况。
//=============================================================================
//==============================
// * 固定按钮 - 定义
//==============================
function Drill_GBu_ButtonSprite() {
    this.initialize.apply(this, arguments);
}
Drill_GBu_ButtonSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_GBu_ButtonSprite.prototype.constructor = Drill_GBu_ButtonSprite;
//==============================
// * 固定按钮 - 初始化
//==============================
Drill_GBu_ButtonSprite.prototype.initialize = function( data ) {
	Sprite_Base.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	this._drill_bitmapTank = {};
	
	this.drill_initData();		//初始化数据
	this.drill_initSprite();	//初始化对象
};
//==============================
// * 固定按钮 - 帧刷新
//==============================
Drill_GBu_ButtonSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 初始化 - 数据
//==============================
Drill_GBu_ButtonSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	if( data['visible'] == undefined ){ data['visible'] = true };					//贴图 - 显示/隐藏
	if( data['status'] == undefined ){ data['status'] = "激活" };					//贴图 - 激活
	if( data['commonEventId'] == undefined ){ data['commonEventId'] = 0 };			//贴图 - 执行的公共事件
	if( data['pipeType'] == undefined ){ data['pipeType'] = "并行" };				//贴图 - 公共事件执行方式
	if( data['x'] == undefined ){ data['x'] = 0 };									//贴图 - x
	if( data['y'] == undefined ){ data['y'] = 0 };									//贴图 - y
	if( data['layer_index'] == undefined ){ data['layer_index'] = "图片层" };		//贴图 - 地图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 10 };						//贴图 - 图片层级
	// （其他参数见 函数DrillUp.drill_GBu_initParam ）
	
};
//==============================
// * 初始化 - 对象
//==============================
Drill_GBu_ButtonSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_cur_time = 0;					//当前时间
	this._drill_isHovering = false;				//状态 - 选中
	this._drill_isPressing = false;				//状态 - 被按下
	this._drill_status = data['status'];		//状态 - 激活
	this._drill_visible = data['visible'];		//状态 - 显示/隐藏
	
	// > 自身属性初始化
	this.x = data['x'];
	this.y = data['y'];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = data['visible'];
	this.zIndex = data['zIndex'];	//图片层级
	
	this.drill_createBitmapTank();			//创建bitmap容器
	this.drill_createAddtionSprite();		//创建叠加贴图
};
//==============================
// * 接口 - 设置激活状态
//==============================
Drill_GBu_ButtonSprite.prototype.drill_setStatus = function( status ) {
	this._drill_status = status;
}
//==============================
// * 接口 - 设置显示/隐藏
//==============================
Drill_GBu_ButtonSprite.prototype.drill_setVisible = function( v ) {
	this._drill_visible = v;
}
//==============================
// * 接口 - 设置高亮
//==============================
Drill_GBu_ButtonSprite.prototype.drill_setHover = function( h ) {
	this._drill_isHovering = h;
}
//==============================
// * 接口 - 设置按下
//==============================
Drill_GBu_ButtonSprite.prototype.drill_setPress = function( p ) {
	this._drill_isPressing = p;
}
//==============================
// * 创建 - bitmap容器
//==============================
Drill_GBu_ButtonSprite.prototype.drill_createBitmapTank = function() {
	var data = this._drill_data;
	
	// > gif图片
	var bitmapObj = {};
	bitmapObj['bitmap_gif'] = [];															
	for( var j=0; j < data['gif_src'].length; j++ ){	
		bitmapObj['bitmap_gif'][j] = ImageManager.load_MapGaugeButton( data['gif_src'] );
	}
	// > 高亮图片 
	if( data['hover_mode'] == "图片切换" || data['hover_mode'] == "图片叠加" ){
		bitmapObj['bitmap_hover'] = ImageManager.load_MapGaugeButton( data['hover_src_img'] );
	}else{
		bitmapObj['bitmap_hover'] = null;
	}
	// > 按下图片
	if( data['press_mode'] == "图片切换" || data['press_mode'] == "图片叠加" ){
		bitmapObj['bitmap_press'] = ImageManager.load_MapGaugeButton( data['press_src_img'] );
	}else{
		bitmapObj['bitmap_press'] = null;
	}
	
	// > 封印图片
	bitmapObj['bitmap_lock'] = ImageManager.load_MapGaugeButton( data['lock_src'] );		
	
	// > 封印高亮图片
	if( data['lockHover_mode'] == "图片切换" || data['lockHover_mode'] == "图片叠加" ){
		bitmapObj['bitmap_lockHover'] = ImageManager.load_MapGaugeButton( data['lockHover_src_img'] );
	}else{
		bitmapObj['bitmap_lockHover'] = null;
	}
	
	this._drill_bitmapTank = bitmapObj;
	this.bitmap = this._drill_bitmapTank['bitmap_gif'][0];
}
//==============================
// * 创建 - 叠加贴图
//==============================
Drill_GBu_ButtonSprite.prototype.drill_createAddtionSprite = function() {
	
	// > 叠加贴图
	var addition_sprite = new Sprite();
	addition_sprite.anchor.x = 0.5;
	addition_sprite.anchor.y = 0.5;
	this.addChild(addition_sprite);
	
	this._drill_GBu_additionSprite = addition_sprite;
}
//==============================
// * 帧刷新对象
//==============================
Drill_GBu_ButtonSprite.prototype.drill_updateSprite = function() {
	
	this._drill_cur_time += 1;
	this.drill_updateBitmap();			//刷新bitmap
	this.drill_updatePosition();		//镜头与位置
}
//==============================
// * 帧刷新 - 刷新bitmap
//==============================
Drill_GBu_ButtonSprite.prototype.drill_updateBitmap = function() {
	var data = this._drill_data;
	var bitmapObj = this._drill_bitmapTank;
	
	// > 显示/隐藏
	if( this.visible != this._drill_visible ){
		this.visible = this._drill_visible;		
	}
	// > 激活
	if( this._drill_status == "激活" ){
		
		// > 高亮bitmap
		if( this._drill_isHovering == true ){
			if( data['hover_mode'] == "关闭效果" ){
				// （不操作）
			}
			if( data['hover_mode'] == "图片切换" ){
				this.bitmap = bitmapObj['bitmap_hover'];		
			}
			if( data['hover_mode'] == "图片叠加" ){
				this._drill_GBu_additionSprite.bitmap = bitmapObj['bitmap_hover'];	
			}
			if( data['hover_mode'] == "透明度切换" ){
				this.opacity = data['hover_lightOpacity'];
			}
		}else{
			if( data['hover_mode'] == "关闭效果" ){
				// （不操作）
			}
			if( data['hover_mode'] == "图片切换" ){
				// （不操作）
			}
			if( data['hover_mode'] == "图片叠加" ){
				this._drill_GBu_additionSprite.bitmap = null;
			}
			if( data['hover_mode'] == "透明度切换" ){
				this.opacity = data['hover_opacity'];
			}
		}
		
		// > 按下bitmap
		if( this._drill_isPressing == true ){
			if( data['press_mode'] == "关闭效果" ){
				// （不操作）
			}
			if( data['press_mode'] == "图片切换" ){
				this.bitmap = bitmapObj['bitmap_press'];
			}
			if( data['press_mode'] == "图片叠加" ){
				this._drill_GBu_additionSprite.bitmap = bitmapObj['bitmap_press'];	
			}
			return;
		}
		
		// > 播放GIF
		var inter = this._drill_cur_time ;
		inter = inter / data['gif_interval'];
		inter = inter % bitmapObj['bitmap_gif'].length;
		if( data['gif_back_run'] ){
			inter = bitmapObj['bitmap_gif'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		this.bitmap = bitmapObj['bitmap_gif'][inter];
	}
	
	// > 封印
	if( this._drill_status == "封印" ){	
		
		// > 封印高亮bitmap
		if( this._drill_isHovering == true ){
			if( data['lockHover_mode'] == "关闭效果" ){
				// （不操作）
			}
			if( data['lockHover_mode'] == "图片切换" ){
				this.bitmap = bitmapObj['bitmap_lockHover'];		
			}
			if( data['lockHover_mode'] == "图片叠加" ){
				this._drill_GBu_additionSprite.bitmap = bitmapObj['bitmap_lockHover'];	
			}
			if( data['lockHover_mode'] == "透明度切换" ){
				this.opacity = data['lockHover_lightOpacity'];
			}
		}else{
			if( data['lockHover_mode'] == "关闭效果" ){
				// （不操作）
			}
			if( data['lockHover_mode'] == "图片切换" ){
				// （不操作）
			}
			if( data['lockHover_mode'] == "图片叠加" ){
				this._drill_GBu_additionSprite.bitmap = null;
			}
			if( data['lockHover_mode'] == "透明度切换" ){
				this.opacity = data['lockHover_opacity'];
			}
		}
	
		// > 封印bitmap
		this.bitmap = bitmapObj['bitmap_lock'];		
	}
}
//==============================
// * 帧刷新 - 镜头与位置
//==============================
Drill_GBu_ButtonSprite.prototype.drill_updatePosition = function() {
	var data = this._drill_data;
	
	var xx = data['x'];
	var yy = data['y'];
	
	// > 镜头缩放与位移【地图 - 活动地图镜头】
	//		（由于按钮 只在 图片层和最顶层，下面的函数执行不到。）
	if( Imported.Drill_LayerCamera ){
		var layer = data['layer_index'];
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			this.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
			this.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
			//（暂不考虑缩放位移偏转）
		}
		if( layer == "图片层" || layer == "最顶层" ){
			//（不需偏移）
		}
	}
	
	this.x = Math.floor(xx);
	this.y = Math.floor(yy);
}
//==============================
// * 获取 - 按钮在ui上的位置（ui位置与实际sprite位置不一定重合）
//==============================
Drill_GBu_ButtonSprite.prototype.drill_getUIposX = function() {
	var data = this._drill_data;
	return data['x'];
}
Drill_GBu_ButtonSprite.prototype.drill_getUIposY = function() {
	var data = this._drill_data;
	return data['y'];
}




//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeButton = false;
		alert(
			"【Drill_GaugeButton.js 地图UI - 地图公共事件按钮集】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心" + 
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}

