//=============================================================================
// Drill_GaugeTimerHud.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        UI - 时间计时器
 * @author Drill_up
 * 
 * @Drill_LE_param "计时框样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GTH_data_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeTimerHud +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以针对时间计时器进行美化，包括相关插件指令操作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGaugeMeter       系统-参数条核心★★v1.5及以上★★
 *   - Drill_CoreOfGaugeNumber      系统-参数数字核心★★v1.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   专用于计时监听。
 * 2.详细说明可以去看看文档"13.UI > 关于时间计时器.docx"。
 * 计时框样式：
 *   (1.地图时间计时器 = 1个参数条 + 1个参数数字 + 2个外框。
 *   (2.计时框样式是基于 参数条核心样式 和 参数数字样式 的贴图，具体
 *      配置方式可以去看看参数条核心与参数数字核心。
 *   (3.你可以将计时框样式放置在地图层级的 上层、图片层、最顶层 中。
 *      或者战斗层级的 上层、图片层、最顶层 中。
 * 参数条：
 *   (1.参数值：　固定为剩余时间。
 *      遮罩：　　可自定义。
 *      旋转：　　可自定义。
 *      段上限：　固定为剩余时间最大值。
 *      流动效果：可自定义。
 *      凹槽条：　可自定义。
 *      弹出条：　可自定义。
 *      粒子：　　可自定义。
 *      游标：　　可自定义。
 *      加满动画：关闭。
 *   (2.参数条样式配置在 参数条核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 参数数字：
 *   (1.参数值：　固定为剩余时间。
 *      旋转：　　可自定义。
 *      滚动效果：可自定义。
 *      符号：　　可自定义。
 *      前缀后缀：可自定义。
 *      对齐方式：可自定义。
 *      额定值：　固定为剩余时间最大值。
 *      额定符号：可自定义。
 *      时间格式：可自定义，一般建议开启。
 *   (2.参数数字样式配置在 参数数字核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 设计：
 *   (1.你可以结合插件"时间计时器到零时公共事件"，
 *      来设计小游戏的倒计时，倒计时结束后，执行失败界面。
 *      如果成功了，那么停止计时。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__visualTimer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__visualTimer文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 资源-固定框背景
 * 资源-固定框前景
 * 
 * 注意，参数条、参数数字的资源设置，需要在核心中配置。
 * 参数条核心 的资源路径为 img/Special__meter 。
 * 参数数字核心 的资源路径为 img/Special__Number 。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以使用下面的插件指令，给计时器进行更多扩展操作：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>时间计时器 : 开始计时 : 秒数[60]
 * 插件指令：>时间计时器 : 停止计时
 * 插件指令：>时间计时器 : 暂停
 * 插件指令：>时间计时器 : 恢复
 * 插件指令：>时间计时器 : 剩余时间增加 : 秒数[+10]
 * 插件指令：>时间计时器 : 剩余时间乘积 : 比例[1.20]
 *
 * 1."秒数[60]"指60秒，也就是一分钟。
 *   注意这里单位为秒，平时的插件指令的时间默认都为帧。
 * 2.如果你要 减少剩余时间，使用"秒数[-10]"即可。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 框显示
 * 你可以使用下面的插件指令，控制框的情况：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>时间计时器 : 修改样式 : 样式[1]
 * 插件指令：>时间计时器 : 恢复默认样式
 * 
 * 插件指令：>时间计时器 : 到零后保持框显示 : 开启
 * 插件指令：>时间计时器 : 到零后保持框显示 : 关闭
 * 
 * 1.你可以使用"样式[0]"，表示使用最原始的计时框样式。
 * 2.计时器时间为0之后，默认框不会消失。需要你手动执行“停止计时”，
 *   框才会消失。
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
 * 测试方法：   开启时间计时器，并进行测试。
 * 测试结果：   地图界面中，平均消耗为：【34.38ms】
 *              战斗界面中，平均消耗为：【26.28ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于时间计时器带了一个参数条和一个参数数字，所以运行时，会有
 *   部分消耗。
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
 * @param 是否到零后保持框显示
 * @type boolean
 * @on 保持
 * @off 到零后隐藏
 * @desc true - 保持，false - 到零后隐藏
 * @default true
 *
 * @param 计时框默认样式
 * @type number
 * @min 0
 * @desc 计时框的默认样式。0表示使用最原始的计时器结构。
 * @default 1
 * 
 * @param ----计时框样式集合----
 * @default 
 * 
 * @param 计时框样式-1
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-2
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-3
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-4
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-5
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-6
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-7
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-8
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-9
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * @param 计时框样式-10
 * @parent ----计时框样式集合----
 * @type struct<DrillGTHStyle>
 * @desc 计时框样式的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGTHStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的计时框样式==
 *
 * @param ---常规---
 * @desc 
 *
 * @param 平移-位置 X
 * @parent ---常规---
 * @desc x轴方向平移，单位像素，0为贴在最左边。正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-位置 Y
 * @parent ---常规---
 * @desc y轴方向平移，单位像素，0为贴在最上面。正数向下，负数向上。
 * @default 0
 *
 * @param 计时器显现时长
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc 计时器透明显现/消失的时长，单位帧。（1秒60帧）
 * @default 30
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
 * @desc 计时框样式所在的地图层级。
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
 * @desc 计时框样式所在的战斗层级。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---层级---
 * @desc 时间数字所处在的图片层级。
 * @default 120
 * 
 * 
 * @param ---参数条---
 * @desc 
 * 
 * @param 是否显示参数条
 * @parent ---参数条---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 参数条样式
 * @parent 是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 平移-参数条 X
 * @parent 是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 平移-参数条 Y
 * @parent 是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * 
 * @param ---参数数字---
 * @desc 
 * 
 * @param 是否显示参数数字
 * @parent ---参数数字---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 参数数字样式
 * @parent 是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 平移-参数数字 X
 * @parent 是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 平移-参数数字 Y
 * @parent 是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 *
 * 
 * @param ---外框---
 * @desc 
 *
 * @param 资源-固定框背景
 * @parent ---外框---
 * @desc 固定框背景的图片资源。
 * @default (需配置)地图计时框样式背景-默认
 * @require 1
 * @dir img/Special__visualTimer/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ---外框---
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ---外框---
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ---外框---
 * @desc 固定框前景的图片资源，可以遮住生命条、魔法条、怒气条。
 * @default (需配置)地图计时框样式前景-默认
 * @require 1
 * @dir img/Special__visualTimer/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ---外框---
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ---外框---
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GTH (Gauge_Timer_Hud)
//		临时全局变量	DrillUp.g_GTH_xxx
//		临时局部变量	this._drill_GTH_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理)  每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	34.38ms（drill_GTH_updatePosition）
//		★最坏情况		暂无
//		★备注			UI管理层只有5帧左右，菜单矩形框插件 的消耗也在 35.61ms，性能录制事件可能偏长了25000ms。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			时间计时器：
//				->结构
//					->时间数字
//					->时间条
//					->固定框背景
//					->固定框前景
//				->指令控制
//					->原 事件指令
//					->绑定公共事件（此功能被分离到其他插件中）
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的计时框样式如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeTimerHud = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeTimerHud');
	
	
	//==============================
	// * 变量获取 - 计时框样式
	//				（~struct~DrillGTHStyle）
	//==============================
	DrillUp.drill_GTH_initParam = function( dataFrom ) {
		var data = {};
		
		// > 基本属性
		data['x'] = Number( dataFrom["平移-位置 X"] || 0);
		data['y'] = Number( dataFrom["平移-位置 Y"] || 0);
		data['foldTimeMax'] = Number( dataFrom["计时器显现时长"] || 30);
		data['map_layerIndex'] = String( dataFrom["地图层级"] || "图片层");
		data['battle_layerIndex'] = String( dataFrom["战斗层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 参数条
		data['meter_enable'] = String( dataFrom["是否显示参数条"] || "true") === "true";
		data['meter_id'] = Number( dataFrom["参数条样式"] || 0 );
		data['meter_x'] = Number( dataFrom["平移-参数条 X"] || 0 );
		data['meter_y'] = Number( dataFrom["平移-参数条 Y"] || 0 );
		
		// > 参数数字
		data['number_enable'] = String( dataFrom["是否显示参数数字"] || "true") === "true";
		data['number_id'] = Number( dataFrom["参数数字样式"] || 0 );
		data['number_x'] = Number( dataFrom["平移-参数数字 X"] || 0 );
		data['number_y'] = Number( dataFrom["平移-参数数字 Y"] || 0 );
		
		// > 外框
		data['background_src'] = String( dataFrom["资源-固定框背景"] || "" );
		data['background_file'] = "img/Special__visualTimer/";
		data['background_x'] = Number( dataFrom["平移-固定框背景 X"] || 0 );
		data['background_y'] = Number( dataFrom["平移-固定框背景 Y"] || 0 );
		data['foreground_src'] = String( dataFrom["资源-固定框前景"] || "" );
		data['foreground_file'] = "img/Special__visualTimer/";
		data['foreground_x'] = Number( dataFrom["平移-固定框前景 X"] || 0 );
		data['foreground_y'] = Number( dataFrom["平移-固定框前景 Y"] || 0 );
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_GTH_keepShowing = String(DrillUp.parameters["是否到零后保持框显示"] || "true") === "true";
	DrillUp.g_GTH_defaultStyle = Number(DrillUp.parameters["计时框默认样式"] || 1); 
	
	/*-----------------计时框样式集合------------------*/
	DrillUp.g_GTH_data_length = 10;
	DrillUp.g_GTH_data = [];
	for( var i = 0; i < DrillUp.g_GTH_data_length; i++ ){
		if( DrillUp.parameters["计时框样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["计时框样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["计时框样式-" + String(i+1) ]);
			DrillUp.g_GTH_data[i] = DrillUp.drill_GTH_initParam( data );
			DrillUp.g_GTH_data[i]['inited'] = true;
		}else{
			DrillUp.g_GTH_data[i] = DrillUp.drill_GTH_initParam( {} );
			DrillUp.g_GTH_data[i]['inited'] = false;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGaugeMeter &&
	Imported.Drill_CoreOfGaugeNumber ){
	
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GTH_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GTH_pluginCommand.call(this, command, args);
	if( command === ">时间计时器" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "停止计时" ){
				$gameTimer.stop();
			}
			if( type == "暂停" ){
				$gameTimer.drill_GTH_pause();
			}
			if( type == "恢复" ){
				$gameTimer.drill_GTH_continue();
			}
			if( type == "恢复默认样式" ){
				$gameSystem._drill_GTH_curStyle = DrillUp.g_GTH_defaultStyle;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "开始计时" ){
				temp1 = temp1.replace("秒数[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameTimer.start( temp1 * 60 );
			}
			if( type == "剩余时间增加" ){
				temp1 = temp1.replace("秒数[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameTimer.drill_GTH_addTime( temp1 * 60 );
			}
			if( type == "剩余时间乘积" ){
				temp1 = temp1.replace("比例[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameTimer.drill_GTH_multiplyTime( temp1 );
			}
			if( type == "修改样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameSystem._drill_GTH_curStyle = temp1;
			}
			
			if( type == "到零后保持框显示" ){
				if( temp1 == "开启" ){
					$gameSystem._drill_GTH_keepShowing = true;
				}
				if( temp1 == "关闭" ){
					$gameSystem._drill_GTH_keepShowing = false;
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
DrillUp.g_GTH_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GTH_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GTH_sys_initialize.call(this);
	this.drill_GTH_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GTH_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GTH_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_GTH_saveEnabled == true ){	
		$gameSystem.drill_GTH_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_GTH_initSysData();
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
Game_System.prototype.drill_GTH_initSysData = function() {
	this.drill_GTH_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_GTH_checkSysData = function() {
	this.drill_GTH_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_GTH_initSysData_Private = function() {
	
	this._drill_GTH_curStyle = DrillUp.g_GTH_defaultStyle;
	this._drill_GTH_keepShowing = DrillUp.g_GTH_keepShowing;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_GTH_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_GTH_keepShowing == undefined ){
		this.drill_GTH_initSysData();
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
Scene_Map.prototype.drill_GTH_layerAddSprite = function( sprite, layer_index ){
	this.drill_GTH_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_GTH_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_GTH_sortByZIndex = function () {
    this.drill_GTH_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 镜头参照）
//					> y 数字              （y位置，当前为 镜头参照）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_GTH_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_GTH_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 上层
//==============================
var _drill_GTH_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GTH_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_GTH_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GTH_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_GTH_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GTH_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_GTH_sortByZIndex_Private = function () {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_GTH_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_GTH_layerCameraMoving_Private = function( xx, yy, layer, option ){
	//   （由于镜头位置_displayX是独立出来的，每个事件、对象都需各自叠加镜头位置，因此此参照系 有无 的效果都是一样的）
	
	// > 镜头参照 -> 地图参照
	if( layer == "下层" || layer == "中层" || layer == "上层" ){
		//（不需要变换）
		return {'x':xx, 'y':yy };
	}
	
	// > 镜头参照 -> 镜头参照
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
var _drill_GTH_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GTH_layer_createAllWindows2.call(this);
	
	// > 创建贴图
	var temp_sprite = new Drill_GTH_TimerSprite();
	this._drill_GTH_sprite = temp_sprite;
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GTH_map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {	
	_drill_GTH_map_updateMain.call(this);
	
	this.drill_GTH_updateLayer();		//帧刷新 - 计时框样式变化
	this.drill_GTH_updatePosition();	//帧刷新 - 位置变化
};
//==============================
// * 帧刷新 - 计时框样式变化
//==============================
Scene_Map.prototype.drill_GTH_updateLayer = function() {
	var temp_sprite = this._drill_GTH_sprite;
	var temp_data = DrillUp.g_GTH_data[ $gameSystem._drill_GTH_curStyle -1 ];
	if( temp_data == undefined ){ return; }
	if( temp_data['inited'] == false ){ return; }
	if( temp_sprite._drill_curLayer == temp_data['map_layerIndex'] ){
		return;
	}
	
	temp_sprite._drill_curLayer = temp_data['map_layerIndex'];
	temp_sprite.zIndex = temp_data['zIndex'];
	
	this.drill_GTH_layerAddSprite( temp_sprite, temp_data['map_layerIndex'] );
	this.drill_GTH_sortByZIndex();
};
//==============================
// * 帧刷新 - 位置变化
//==============================
Scene_Map.prototype.drill_GTH_updatePosition = function() {
	var temp_sprite = this._drill_GTH_sprite;
	var temp_data = temp_sprite._drill_data;
	if( temp_data == null ){ return; }
	if( temp_sprite.visible == false ){ return; }
	
	var xx = temp_data['x'];
	var yy = temp_data['y'];
	
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
	var pos = this.drill_GTH_layerCameraMoving(xx, yy, temp_data['map_layerIndex'], {});
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
Scene_Battle.prototype.drill_GTH_layerAddSprite = function( sprite, layer_index ){
	this.drill_GTH_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_GTH_layerRemoveSprite = function( sprite ){
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
Scene_Battle.prototype.drill_GTH_sortByZIndex = function () {
    this.drill_GTH_sortByZIndex_Private();
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
Scene_Battle.prototype.drill_GTH_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_GTH_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_GTH_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GTH_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_GTH_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_GTH_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_GTH_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_GTH_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_GTH_sortByZIndex_Private = function() {
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_GTH_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Battle.prototype.drill_GTH_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 镜头参照 -> 战斗参照
	if( layer == "下层" || layer == "上层" ){
		xx -= this._spriteset._baseSprite.x;	//（由于 Spriteset_Battle 的 _baseSprite 坐标始终是(0,0)，所以两个参照没有区别。）
		yy -= this._spriteset._baseSprite.y;
		
		// > 战斗镜头位移（在图层内）
		if( Imported.Drill_BattleCamera ){
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
		}else{
			xx -= this._spriteset._battleField.x;	//（处于 Spriteset_Battle 的 _battleField 情况。）
			yy -= this._spriteset._battleField.y;
		}
		
		return {'x':xx, 'y':yy };
	}
	
	// > 镜头参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		
		// > 战斗镜头位移（在图层外）
		//				 （其实 图片层、最顶层 执行不到这里，因为可以直接粘在镜头上，走镜头参照的分支了）
		//var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		//xx -= camera_pos.x;
		//yy -= camera_pos.y;
		//var camera_pos2 = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( xx, yy );
		//xx = camera_pos2.x;
		//yy = camera_pos2.y;
		
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
var _drill_GTH_battle_createAllWindows2 = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_GTH_battle_createAllWindows2.call(this);
	
	// > 创建贴图
	var temp_sprite = new Drill_GTH_TimerSprite();
	this._drill_GTH_sprite = temp_sprite;
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GTH_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_GTH_battle_update.call(this);
	
	this.drill_GTH_updateLayer();		//帧刷新 - 计时框样式变化
	this.drill_GTH_updatePosition();	//帧刷新 - 位置变化
};
//==============================
// * 帧刷新 - 计时框样式变化
//==============================
Scene_Battle.prototype.drill_GTH_updateLayer = function() {
	var temp_sprite = this._drill_GTH_sprite;
	var temp_data = DrillUp.g_GTH_data[ $gameSystem._drill_GTH_curStyle -1 ];
	if( temp_data == undefined ){ return; }
	if( temp_data['inited'] == false ){ return; }
	if( temp_sprite._drill_curLayer == temp_data['battle_layerIndex'] ){
		return;
	}
	
	temp_sprite._drill_curLayer = temp_data['battle_layerIndex'];
	temp_sprite.zIndex = temp_data['zIndex'];
	
	this.drill_GTH_layerAddSprite( temp_sprite, temp_data['battle_layerIndex'] );
	this.drill_GTH_sortByZIndex();
};
//==============================
// * 帧刷新 - 位置变化
//==============================
Scene_Battle.prototype.drill_GTH_updatePosition = function() {
	var temp_sprite = this._drill_GTH_sprite;
	var temp_data = temp_sprite._drill_data;
	if( temp_data == null ){ return; }
	if( temp_sprite.visible == false ){ return; }
	
	var xx = temp_data['x'];
	var yy = temp_data['y'];
	
	
	// > 层级与镜头的位移（镜头参照）
	var pos = this.drill_GTH_layerCameraMoving(xx, yy, temp_data['battle_layerIndex'], {});
	xx = pos['x'];
	yy = pos['y'];
	
	
	temp_sprite.x = xx;
	temp_sprite.y = yy;
};



//=============================================================================
// ** 时间计时器【Drill_GTH_TimerSprite】
//
//			代码：	> 范围 - 该类只对 时间计时器 进行可视化。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [ ●单个 /多个] 
//					> 创建 - [ ●一次性/ 自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 计时器样式修改后，贴图根据样式自动调整。
//=============================================================================
//==============================
// * 时间计时器 - 定义
//==============================
function Drill_GTH_TimerSprite() {
    this.initialize.apply(this, arguments);
}
Drill_GTH_TimerSprite.prototype = Object.create(Sprite.prototype);
Drill_GTH_TimerSprite.prototype.constructor = Drill_GTH_TimerSprite;
//==============================
// * 时间计时器 - 初始化
//==============================
Drill_GTH_TimerSprite.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._drill_time = 0;				//计时器
	this._drill_foldTime = 0;			//渐变时间
	this._drill_data = null;			//样式数据
	this._drill_curStyle = -1;			//当前样式
	this._drill_curLayer = "";			//当前层级
};
//==============================
// * 时间计时器 - 帧刷新
//==============================
Drill_GTH_TimerSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this._drill_time += 1;
	this.drill_updateStyle();			//帧刷新样式
	
	if( this._drill_data == null ){ return; }
	this.drill_updateOpacity();			//帧刷新透明度
	this.drill_updateValue();			//帧刷新参数值
};
//==============================
// * 帧刷新 - 样式
//==============================
Drill_GTH_TimerSprite.prototype.drill_updateStyle = function() {
	if( this._drill_curStyle == $gameSystem._drill_GTH_curStyle ){ return; }
	this._drill_curStyle = $gameSystem._drill_GTH_curStyle;
	
	// > 最原始的样式
	if( this._drill_curStyle == 0 ){
		this.visible = false;
	}else{
		this.visible = true;
	}
	
	// > 样式设置
	var temp_data = DrillUp.g_GTH_data[ this._drill_curStyle -1 ];
	if( temp_data == undefined ){ return; }
	if( temp_data['inited'] == false ){ return; }
	this._drill_data = temp_data;
	
	this.drill_createLayer();			//创建层级
};
//==============================
// * 创建 - 层级
//==============================
Drill_GTH_TimerSprite.prototype.drill_createLayer = function() {
	var data = this._drill_data;
	
	// > 清理旧贴图
	if( this._drill_background_sprite != undefined ){
		this.removeChild( this._drill_background_sprite );
		this._drill_background_sprite = null;
	}
	if( this._drill_meterSprite != undefined ){
		this._drill_meterSprite.drill_COGM_destroy();	//（参数条销毁）
		this.removeChild( this._drill_meterSprite );
		this._drill_meterSprite = null;
	}
	if( this._drill_numberSprite != undefined ){
		this._drill_numberSprite.drill_COGN_destroy();	//（参数数字销毁）
		this.removeChild( this._drill_numberSprite );
		this._drill_numberSprite = null;
	}
	if( this._drill_foreground_sprite != undefined ){
		this.removeChild( this._drill_foreground_sprite );
		this._drill_foreground_sprite = null;
	}
	
	
	// > 固定框背景
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( data['background_file'], data['background_src'], 0, true);
	temp_sprite.x = data['background_x'];
	temp_sprite.y = data['background_y'];
	this.addChild(temp_sprite);
	this._drill_background_sprite = temp_sprite;
	
	// > 参数条 贴图初始化
	if( data['meter_enable'] == true ){
		this._drill_meterData = DrillUp.drill_COGM_getCopyedData( data['meter_id'] -1 );
		this._drill_meterData['level_max'] = 100;									//段上限
		this._drill_meterData['x'] = data['meter_x'];								//x
		this._drill_meterData['y'] = data['meter_y'];								//y
		this._drill_meterData['anchor_x'] = 0.0;									//中心锚点x
		this._drill_meterData['anchor_y'] = 0.0;									//中心锚点y
		this._drill_meterData['filling_enable'] = false;							//关闭加满动画
		
		var temp_sprite = new Drill_COGM_MeterSprite( this._drill_meterData );
		this.addChild( temp_sprite );
		this._drill_meterSprite = temp_sprite;
	}
	
	// > 参数数字 贴图初始化
	if( data['number_enable'] == true ){
		this._drill_numberData = DrillUp.drill_COGN_getCopyedData( data['number_id'] -1 );
		this._drill_numberData['x'] = data['number_x'];								//x
		this._drill_numberData['y'] = data['number_y'];								//y
		this._drill_numberData['anchor_x'] = 0.5;									//中心锚点x
		this._drill_numberData['anchor_y'] = 0.5;									//中心锚点y
		this._drill_numberData['rolling_mode'] = "瞬间变化";						//瞬间变化
		
		var temp_sprite = new Drill_COGN_NumberSprite( this._drill_numberData );
		this.addChild( temp_sprite );
		this._drill_numberSprite = temp_sprite;
	}
	
	// > 固定框前景
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( data['foreground_file'], data['foreground_src'], 0, true);
	temp_sprite.x = data['foreground_x'];
	temp_sprite.y = data['foreground_y'];
	this.addChild(temp_sprite);
	this._drill_foreground_sprite = temp_sprite;
};
//==============================
// * 帧刷新 - 透明度
//==============================
Drill_GTH_TimerSprite.prototype.drill_updateOpacity = function() {
	var data = this._drill_data;
	
	// > 显现/消失过程
	if( $gameTimer.isWorking() ){
		this._drill_foldTime += 1;
	}else{
		this._drill_foldTime -= 1;
	}
	if( this._drill_foldTime < 0 ){ this._drill_foldTime = 0; }
	if( this._drill_foldTime > data['foldTimeMax'] ){ this._drill_foldTime = data['foldTimeMax']; }
	
	this.opacity = 255 * this._drill_foldTime / data['foldTimeMax'];
};
//==============================
// * 帧刷新 - 刷新值
//==============================
Drill_GTH_TimerSprite.prototype.drill_updateValue = function() {
	var data = this._drill_data;
	
	if( this._drill_meterSprite ){
		
		// > 参数条 - 段上限
		this._drill_meterSprite.drill_COGM_setLevelMax( $gameTimer._drill_GTH_maxFrame );
		
		// > 参数条 - 值
		this._drill_meterSprite.drill_COGM_reflashValue( $gameTimer._frames );
		
	}
	if( this._drill_numberSprite ){
		
		// > 参数数字 - 额定值
		this._drill_numberSprite.drill_COGN_setSpecifiedNum( $gameTimer._drill_GTH_maxFrame );
		
		// > 参数数字 - 值
		this._drill_numberSprite.drill_COGN_reflashValue( $gameTimer._frames );
	}
	
}


//=============================================================================
// ** 时间计时器 绑定
//=============================================================================
//==============================
// * 计时器 - 初始化
//==============================
var _drill_GTH_timer_initialize = Game_Timer.prototype.initialize;
Game_Timer.prototype.initialize = function(){	
	_drill_GTH_timer_initialize.call(this);
	this._drill_GTH_maxFrame = 10;
}
//==============================
// * 计时器 - 开始计时（单位帧）
//==============================
var _drill_GTH_timer_start = Game_Timer.prototype.start;
Game_Timer.prototype.start = function( count ){	
	_drill_GTH_timer_start.call( this, count );
	this._drill_GTH_maxFrame = count;
	this._drill_GTH_pause = false;
}
//==============================
// * 简单计时器 - 帧刷新
//==============================
var _drill_GTH_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function( sceneActive ){
	
	// > 暂停
    if( sceneActive && this._working && this._frames > 0 ){
		if( this._drill_GTH_pause == true ){
			this._frames += 1;
		}
	}
	
	// > 原函数
	_drill_GTH_timer_update.call( this, sceneActive );
	
	// > 锁定0
	if( this._frames <= 0 ){
		this._frames = 0;
	}
}

//==============================
// * 计时器 - 添加时间
//==============================
Game_Timer.prototype.drill_GTH_addTime = function( time ){	
	this._frames += time;
	this._drill_GTH_maxFrame += time;
}
//==============================
// * 计时器 - 乘积时间
//==============================
Game_Timer.prototype.drill_GTH_multiplyTime = function( m ){	
	var time = this._frames * (m - 1);
	this._frames += time;
	this._drill_GTH_maxFrame += time;
}
//==============================
// * 计时器 - 暂停
//==============================
Game_Timer.prototype.drill_GTH_pause = function(){	
	this._drill_GTH_pause = true;
}
//==============================
// * 计时器 - 恢复
//==============================
Game_Timer.prototype.drill_GTH_continue = function(){	
	this._drill_GTH_pause = false;
}
//==============================
// * 计时器贴图 - 刷新显示
//==============================
var _drill_GTH_sp_updateVisibility = Sprite_Timer.prototype.updateVisibility;
Sprite_Timer.prototype.updateVisibility = function(){
	_drill_GTH_sp_updateVisibility.call( this );
	if( $gameTimer.isWorking() ){
		if( $gameSystem._drill_GTH_curStyle == 0 ){
			this.visible = true;
		}else{
			this.visible = false;
		}
	}
};

//=============================================================================
// ** 在SceneManager运行时才加载插件函数
//=============================================================================
var _drill_GTH_sc_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_GTH_sc_initialize.call(this);
	
	//==============================
	// * 计时器 - 到零时操作
	//==============================
	var _drill_GTH_timer_onExpire = Game_Timer.prototype.onExpire;
	Game_Timer.prototype.onExpire = function(){	
		_drill_GTH_timer_onExpire.call( this );
		
		// > 到零时，停止计时
		if( $gameSystem._drill_GTH_keepShowing == false ){
			this.stop();
		}
	}
}




//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeTimerHud = false;
		alert(
			"【Drill_GaugeTimerHud.js 地图UI - 时间计时器】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGaugeMeter 系统-参数条核心"+
			"\n- Drill_CoreOfGaugeNumber 系统-参数数字核心"
		);
}

