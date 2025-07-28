//=============================================================================
// Drill_DialogSingleRollerSprite.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        对话框 - 滚动的长画布贴图
 * @author Drill_up
 * 
 * @Drill_LE_param "阶段-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSRS_stepList_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogSingleRollerSprite +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将长画布贴图，加入到对话框流程中并显示。
 * ★★必须放在 对话框-对话框变形器 插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfScreenRoller      窗口字符-长画布贴图核心
 *     必须基于该插件才能建立长画布并播放内容。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于最顶层。
 * 2.长画布的播放原理，去看看 "18.面板 > 关于长画布贴图核心.docx"。
 * 细节：
 *   (1.贴图固定放在最顶层。
 *   (2.对话框可以阻塞流程进度。玩家必须点击确定键才能继续。
 *      滚动的长画布贴图与对话框阻塞原理一样，必须播放完毕才能继续下一个对话框。
 *   (3.根据流程阻塞关系，对话框和 滚动的长画布贴图 不会同时存在。
 * 设计：
 *   (1.你可以在对话框播放流程中，加入长画布贴图的滚动播放功能。
 *      适合图文故事背景、卷轴书画、名单列表等。地图界面、战斗界面都能播放。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__dialogRoller （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__dialogRoller文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 阶段1 资源-单图
 * 阶段1 资源-GIF
 * 阶段2 资源-单图
 * 阶段2 资源-GIF
 * 阶段3 资源-单图
 * 阶段3 资源-GIF
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令，设置显示：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>滚动的长画布贴图 : 播放阶段 : 批量阶段[1,2,3,4,5,6]
 * 插件指令：>滚动的长画布贴图 : 播放阶段 : 全部阶段
 * 
 * 插件指令：>滚动的长画布贴图 : 按键退出功能 : 开启
 * 插件指令：>滚动的长画布贴图 : 按键退出功能 : 关闭
 * 
 * 1.根据流程阻塞关系，对话框和 滚动的长画布贴图 不会同时存在。
 * 2."按键退出功能"是指，播放长画布贴图后，玩家可以按取消键退出长画布。
 *   注意，此设置要放在"播放阶段"前，后执行就作用不到了。
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
 * 测试方法：   在对话框管理层中测试功能。
 * 测试结果：   战斗界面中，平均消耗为：【18.84ms】
 *              200个事件的地图中，平均消耗为：【51.27ms】
 *              100个事件的地图中，平均消耗为：【46.10ms】
 *               50个事件的地图中，平均消耗为：【20.51ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只控制一个贴图，消耗并不多。
 *   但由于这里是在地图界面，创建一个巨大的画布时，难免会因为资源
 *   占用而在工作时消耗较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ----杂项----
 * @default 
 * 
 * @param 图片层级
 * @parent ----杂项----
 * @type number
 * @min 0
 * @desc 长画布贴图固定处于最顶层，这里为所在的图片层级。
 * @default 50
 *
 * @param 资源-内容遮罩
 * @parent ----杂项----
 * @desc 内容遮罩的图片资源。静态放置在内容上层，将遮住长画布的内容。
 * @default 滚动的长画布贴图-内容遮罩
 * @require 1
 * @dir img/Special__dialogRoller/
 * @type file
 *
 * @param 是否初始阶段渐变显示
 * @parent ----杂项----
 * @type boolean
 * @on 渐变显示
 * @off 立即显示
 * @desc true - 渐变显示，false - 立即显示
 * @default true
 * 
 * @param 渐变速度
 * @parent 是否初始阶段渐变显示
 * @desc 初始阶段渐变中，渐变显示的速度。
 * @default 2
 *
 * @param 是否开启按键退出功能
 * @parent ----杂项----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。此设置可以通过插件指令修改。
 * @default true
 * 
 * 
 * @param ----滚动内容----
 * @default 
 *
 * @param 阶段-1
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-2
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-3
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-4
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-5
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-6
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-7
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-8
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-9
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-10
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-11
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-12
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-13
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-14
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-15
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-16
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-17
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-18
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-19
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-20
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-21
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-22
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-23
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-24
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-25
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-26
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-27
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-28
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-29
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-30
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-31
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-32
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-33
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-34
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-35
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-36
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-37
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-38
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-39
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-40
 * @parent ----滚动内容----
 * @type struct<DSRSStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 * 
 * 
 */
/*~struct~DSRSStep:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的滚动阶段==
 * 
 * 
 * @param 阶段高度
 * @type number
 * @min 0
 * @desc 当前阶段所占用长画布的高度，高度可以为0，0高度将会和下一个阶段的内容重合在一起。
 * @default 624
 *
 * @param 阶段滚动速度
 * @desc 当前阶段时滚动的速度，单位像素/帧。
 * @default 1.5
 *
 * @param 当前阶段BGM设置
 * @type select
 * @option 播放新的BGM
 * @value 播放新的BGM
 * @option 不操作
 * @value 不操作
 * @option 暂停之前的BGM
 * @value 暂停之前的BGM
 * @desc 当前阶段设置BGM。
 * @default 不操作
 *
 * @param 资源-BGM
 * @parent 当前阶段BGM设置
 * @desc 滚动到当前阶段时，可以播放指定BGM，也可以不操作。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 * 
 * 
 * @param 显示模式
 * @type select
 * @option 单图模式
 * @value 单图模式
 * @option GIF模式
 * @value GIF模式
 * @option 文本模式
 * @value 文本模式
 * @desc 当前阶段显示的模式。
 * @default 单图模式
 * 
 * 
 * @param ---单图模式---
 * @desc 
 * 
 * @param 资源-单图
 * @parent ---单图模式---
 * @default 
 * @require 1
 * @dir img/Special__dialogRoller/
 * @type file
 * 
 * @param 平移-单图 X
 * @parent ---单图模式---
 * @desc x轴方向平移，单位像素。0为贴在中间，正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-单图 Y
 * @parent ---单图模式---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 * 
 * 
 * @param ---GIF模式---
 * @desc 
 * 
 * @param 资源-GIF
 * @parent ---GIF模式---
 * @desc png图片资源组，多张构成gif。
 * @default []
 * @require 1
 * @dir img/Special__dialogRoller/
 * @type file[]
 * 
 * @param 平移-GIF X
 * @parent ---GIF模式---
 * @desc x轴方向平移，单位像素。0为贴在中间，正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-GIF Y
 * @parent ---GIF模式---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 * 
 * @param 开始播放延迟
 * @parent ---GIF模式---
 * @type number
 * @min 0
 * @desc 当滚动到当前阶段时，gif才开始播放。这里设置开始播放的额外延迟时间。（1秒60帧）
 * @default 60
 *
 * @param 帧间隔
 * @parent ---GIF模式---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---GIF模式---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param GIF到末尾是否重播
 * @parent ---GIF模式---
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播
 * @default true
 * 
 * 
 * @param ---文本模式---
 * @desc 
 * 
 * @param 文本内容
 * @parent ---文本模式---
 * @type note
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default ""
 *
 * @param 文本字体大小
 * @parent ---文本模式---
 * @type number
 * @min 1
 * @desc 文本中的字体大小。
 * @default 24
 *
 * @param 文本对齐方式
 * @parent ---文本模式---
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 文本的对齐方式。
 * @default 居中
 *
 * @param 行高控制模式
 * @parent ---文本模式---
 * @type select
 * @option 默认补正
 * @value 默认补正
 * @option 自定义补正
 * @value 自定义补正
 * @option 锁定行高
 * @value 锁定行高
 * @option 关闭行高控制
 * @value 关闭行高控制
 * @desc 行高的控制模式。你也可以关闭行高控制，用窗口字符来修改行高设置。
 * @default 默认补正
 *
 * @param 自定义补正值
 * @parent 行高控制模式
 * @type number
 * @min 0
 * @desc 行高控制模式为"自定义补正"时，每行文本的行高补正值。（默认补正为36，因为默认字体就为28，所以补正值大）
 * @default 30
 *
 * @param 锁定行高值
 * @parent 行高控制模式
 * @type number
 * @min 0
 * @desc 行高控制模式为"锁定行高"时，锁定的行高值。
 * @default 30
 * 
 * @param 平移-文本 X
 * @parent ---文本模式---
 * @desc x轴方向平移，单位像素。0为贴在中间，正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-文本 Y
 * @parent ---文本模式---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSRS（Dialog_Single_Sprite）
//		临时全局变量	DrillUp.g_DSRS_xxx
//		临时局部变量	this._drill_DSRS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2025/7/27：
//							》46.1ms（drill_DSRS_createRoller）0.8ms（drill_DSRS_updateRoller）1.2ms（drill_DSRS_updateWindowHide）
//		★最坏情况		暂无
//		★备注			只有一个贴图控制，不需要担心消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆地图层级
//			->☆战斗层级
//			
//			->☆滚动窗口控制
//			->☆播放控制
//				->滚动窗口 执行打开
//				->滚动窗口 执行关闭
//			->☆贴图控制
//				->贴图层
//				->内容遮罩
//				->长画布贴图
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//			
//		★其它说明细节：
//			无
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
	DrillUp.g_DSRS_PluginTip_curName = "Drill_DialogSingleRollerSprite.js 对话框-滚动的长画布贴图";
	DrillUp.g_DSRS_PluginTip_baseList = ["Drill_CoreOfScreenRoller.js 窗口字符-长画布贴图核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DSRS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DSRS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DSRS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DSRS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DSRS_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogSingleRollerSprite = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSingleRollerSprite');
	
	//==============================
	// * 静态数据 - 阶段
	//				（~struct~DSRSStep）
	//==============================
	DrillUp.drill_DSRS_initStep = function( dataFrom ){
		var data = {};
		
		// > B阶段
		data['stepVisible'] = String(dataFrom["阶段是否可见"] || "true") == "true";
		data['speed'] = Number(dataFrom["阶段滚动速度"] || 1.5);
		data['height'] = Number(dataFrom["阶段高度"] || 0);
		data['mode'] = String(dataFrom["显示模式"] || "单图模式");
		
		// > B阶段 - 单图模式
		data['img_src'] = String(dataFrom["资源-单图"] || "");
		data['img_src_file'] = "img/Special__dialogRoller/";
		data['img_x'] = Number(dataFrom["平移-单图 X"] || 0);
		data['img_y'] = Number(dataFrom["平移-单图 Y"] || 0);
		
		// > B阶段 - GIF模式
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/Special__dialogRoller/";
		data['gif_x'] = Number(dataFrom["平移-GIF X"] || 0);
		data['gif_y'] = Number(dataFrom["平移-GIF Y"] || 0);
		data['gif_delay'] = Number(dataFrom["开始播放延迟"] || 60);
		data['gif_interval'] = Number(dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String(dataFrom["是否倒放"] || "false") == "true";
		data['gif_replay'] = String(dataFrom["GIF到末尾是否重播"] || "false") == "true";
		
		// > B阶段 - 文本模式
		if( dataFrom["文本内容"] != "" &&
			dataFrom["文本内容"] != undefined ){
			data['text_context'] = String( JSON.parse(dataFrom["文本内容"]) );
		}else{
			data['text_context'] = "";
		}
		data['text_fontSize'] = Number(dataFrom["文本字体大小"] || 24);
		data['text_align'] = String(dataFrom["文本对齐方式"] || "居中");
		data['text_lineheight_type'] = String(dataFrom["行高控制模式"] || "默认补正");
		data['text_lineheight_custom'] = Number(dataFrom["自定义补正值"] || 30);
		data['text_lineheight_lock'] = Number(dataFrom["锁定行高值"] || 30);
		data['text_x'] = Number(dataFrom["平移-文本 X"] || 0);
		data['text_y'] = Number(dataFrom["平移-文本 Y"] || 0);
		
		// > E音乐切换
		data['bgm_set'] = String(dataFrom["当前阶段BGM设置"] || "不操作");
		data['bgm_src'] = String(dataFrom["资源-BGM"] || "");
		
		return data;
	}
	
	/*-----------------阶段------------------*/
	DrillUp.g_DSRS_stepList_length = 40;
	DrillUp.g_DSRS_stepList = [];
	for (var i = 0; i < DrillUp.g_DSRS_stepList_length; i++) {
		if( DrillUp.parameters["阶段-" + String(i+1) ] != undefined &&
			DrillUp.parameters["阶段-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["阶段-" + String(i+1) ]);
			DrillUp.g_DSRS_stepList[i] = DrillUp.drill_DSRS_initStep( data );
		}else{
			DrillUp.g_DSRS_stepList[i] = null;
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSRS_layerIndex = Number(DrillUp.parameters["图片层级"] || 50);
    DrillUp.g_DSRS_contextMask = String(DrillUp.parameters["资源-内容遮罩"] || "");
    DrillUp.g_DSRS_opacityShow = String(DrillUp.parameters["是否初始阶段渐变显示"] || "true") == "true";
    DrillUp.g_DSRS_opacitySpeed = Number(DrillUp.parameters["渐变速度"] || 2);
    DrillUp.g_DSRS_cancelEnabled = String(DrillUp.parameters["是否开启按键退出功能"] || "true") == "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfScreenRoller ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DSRS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DSRS_pluginCommand.call( this, command, args );
	this.drill_DSRS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DSRS_pluginCommand = function( command, args ){
	if( command === ">滚动的长画布贴图" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			if( type == "播放阶段" ){
				if( temp1 == "全部阶段" ){
					var index_list = [];
					for( var i = 0; i < DrillUp.g_DSRS_stepList.length; i++ ){
						var temp_data = DrillUp.g_DSRS_stepList[i];
						if( temp_data == undefined ){ continue; }
						index_list.push( String(i) );
					}
					temp1 = index_list.join(",");
				}else{
					temp1 = temp1.replace("批量阶段[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.replace(/[,，]+/g,",");
				}
				
				// > 播放控制
				$gameMessage.newPage();
				$gameMessage.setScroll( 0.001, false );
				$gameMessage.add("_drill_DSRS_stepIndexList" + temp1);
				this.setWaitMode('message');		//『强制等待』
			}
			
			if( type == "按键退出功能" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_DSRS_cancelEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_DSRS_cancelEnabled = false;
				}
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DSRS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSRS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSRS_sys_initialize.call(this);
	this.drill_DSRS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSRS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSRS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSRS_saveEnabled == true ){	
		$gameSystem.drill_DSRS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSRS_initSysData();
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
Game_System.prototype.drill_DSRS_initSysData = function() {
	this.drill_DSRS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSRS_checkSysData = function() {
	this.drill_DSRS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSRS_initSysData_Private = function() {
	
	this._drill_DSRS_cancelEnabled = DrillUp.g_DSRS_cancelEnabled;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSRS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSRS_cancelEnabled == undefined ){
		this.drill_DSRS_initSysData();
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
Scene_Map.prototype.drill_DSRS_layerAddSprite = function( sprite, layer_index ){
	this.drill_DSRS_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_DSRS_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_DSRS_sortByZIndex = function () {
    this.drill_DSRS_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_DSRS_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_DSRS_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_DSRS_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_DSRS_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_DSRS_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_DSRS_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_DSRS_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_DSRS_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_DSRS_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DSRS_map_createAllWindows.call(this);		//对话框集合 < 最顶层
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
Scene_Map.prototype.drill_DSRS_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_DSRS_layerAddSprite_Private = function( sprite, layer_index ){
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


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
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
Scene_Battle.prototype.drill_DSRS_layerAddSprite = function( sprite, layer_index ){
	this.drill_DSRS_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_DSRS_layerRemoveSprite = function( sprite ){
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
Scene_Battle.prototype.drill_DSRS_sortByZIndex = function () {
    this.drill_DSRS_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_DSRS_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function(){    
	_drill_DSRS_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_DSRS_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function(){
    _drill_DSRS_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_DSRS_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function(){
	_drill_DSRS_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_DSRS_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_DSRS_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 参数定义
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
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_DSRS_sortByZIndex_Private = function(){
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_DSRS_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
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



//=============================================================================
// ** ☆滚动窗口控制
//			
//			说明：	> 此模块专门控制 对话框 。
//					> 播放 长画布贴图 时，需要隐藏滚动窗口。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 滚动窗口控制 - 初始化
//==============================
var _drill_DSRS_initialize = Window_ScrollText.prototype.initialize;
Window_ScrollText.prototype.initialize = function() {
	_drill_DSRS_initialize.call(this);
	this._drill_DSRS_spriteData = {};					//
	this._drill_DSRS_spriteData['orgX'] = -1;			//原坐标x
	this._drill_DSRS_spriteData['orgY'] = -1;			//原坐标y
	this._drill_DSRS_spriteData['lastState'] = false;	//变化锁
}
//==============================
// * 滚动窗口控制 - 滚动窗口 帧刷新（兼容）
//==============================
var _drill_DSRS_update = Window_ScrollText.prototype.update;
Window_ScrollText.prototype.update = function() {
	_drill_DSRS_update.call(this);
	this.drill_DSRS_updateWindowHide();			//帧刷新变换
};
if( Imported.Drill_CoreOfDialog ){
	//==============================
	// * 滚动窗口控制 - 滚动窗口 帧刷新（对话框优化核心）
	//==============================
	// （暂无）
}
//==============================
// * 滚动窗口控制 - 帧刷新变换
//==============================
Window_ScrollText.prototype.drill_DSRS_updateWindowHide = function() {
	
	// > 播放隐藏
	if( $gameTemp.drill_DSRS_isPlaying() == true ){				//（是否正在播放）
		if( this._drill_DSRS_spriteData['lastState'] == false ){
			this._drill_DSRS_spriteData['lastState'] = true;	//锁-开始播放时
			
			this._drill_DSRS_spriteData['orgX'] = this.x;		//（记录位置）
			this._drill_DSRS_spriteData['orgY'] = this.y;
			
			this.x += 0;
			this.y += Graphics.boxHeight * 2;
		}
		
	// > 关闭隐藏
	}else{
		if( this._drill_DSRS_spriteData['lastState'] == true ){
			this._drill_DSRS_spriteData['lastState'] = false;	//锁-结束播放时
			
			// > 立即归位
			this.drill_DSRS_homingPosition();
		}
	}
}
//==============================
// * 滚动窗口控制 - 执行归位（开放函数）
//==============================
Window_ScrollText.prototype.drill_DSRS_homingPosition = function() {
	if( this._drill_DSRS_spriteData['orgX'] == -1 &&
		this._drill_DSRS_spriteData['orgY'] == -1 ){ return; }
	this.x = this._drill_DSRS_spriteData['orgX'];
	this.y = this._drill_DSRS_spriteData['orgY'];
	this._drill_DSRS_spriteData['orgX'] = -1;			//（清理原坐标）
	this._drill_DSRS_spriteData['orgY'] = -1;			//
}


//=============================================================================
// ** ☆播放控制
//			
//			说明：	> 此模块专门控制 播放 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 播放控制 - 初始化
//==============================
var _drill_DSRS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_DSRS_temp_initialize.call(this);
	this._drill_DSRS_stepIndexList = [];
};
//==============================
// * 播放控制 - 检查播放
//==============================
Game_Temp.prototype.drill_DSRS_checkStepIndex = function() {
	var context = $gameMessage.allText();
	if( context.contains("_drill_DSRS_stepIndexList") ){
		var index_str = context.replace("_drill_DSRS_stepIndexList","");
		var index_list = index_str.trim().split(",");
		this._drill_DSRS_stepIndexList = index_list;
	}else{
		this._drill_DSRS_stepIndexList.length = 0;
	}
};
//==============================
// * 播放控制 - 是否正在播放（开放函数）
//==============================
Game_Temp.prototype.drill_DSRS_isPlaying = function() {
	if( this._drill_DSRS_stepIndexList.length > 0 ){ return true; }
	return false;
};

//==============================
// * 播放控制 - 滚动窗口 执行打开（兼容）
//==============================
var _drill_DSRS_startMessage = Window_ScrollText.prototype.startMessage;
Window_ScrollText.prototype.startMessage = function() {
	_drill_DSRS_startMessage.call(this);
	/*
		实现原理：
			1. 通过插件指令播放 $gameMessage.setScroll() 和 $gameMessage.add() 来捕获参数，进入到滚动模式。
			2. 进入到此函数后，开启 drill_DSRS_isPlaying 判定。
			3. 根据判定，自动隐藏滚动窗口，显示长画布贴图。
	*/
	$gameTemp.drill_DSRS_checkStepIndex();
};
//==============================
// * 播放控制 - 滚动窗口 执行关闭（兼容）
//==============================
var _drill_DSRS_terminateMessage = Window_ScrollText.prototype.terminateMessage;
Window_ScrollText.prototype.terminateMessage = function() {
    _drill_DSRS_terminateMessage.call(this);
	$gameTemp._drill_DSRS_stepIndexList.length = 0;
};
if( Imported.Drill_CoreOfDialog ){
	//==============================
	// * 播放控制 - 滚动窗口 执行打开（对话框优化核心）
	//==============================
	// （暂无）
}


//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门管理 长画布贴图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 贴图层 - 创建绑定（地图界面）
//==============================
var _drill_DSRS_mapSprite_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DSRS_mapSprite_createAllWindows.call(this);
	this.drill_DSRS_createLayer();		//创建 - 贴图层
	this.drill_DSRS_createMask();		//创建 - 内容遮罩
};
//==============================
// * 贴图控制 - 贴图层 - 创建（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_createLayer = function() {
	
	// > 『界面简单加载』
	this._drill_DSRS_src_bitmaps = [];
	for( var i=0; i < DrillUp.g_DSRS_stepList.length; i++ ){
		var temp_data = DrillUp.g_DSRS_stepList[i];
		if( temp_data == undefined ){ continue; }
		this._drill_DSRS_src_bitmaps.push( ImageManager.loadBitmap( temp_data['img_src_file'], temp_data['img_src'], 0, true ) );
		for( var j=0; j < temp_data['gif_src'].length; j++ ){
			this._drill_DSRS_src_bitmaps.push( ImageManager.loadBitmap( temp_data['gif_src_file'], temp_data['gif_src'][j], 0, true ) );
		}
	}
	
	// > 贴图初始化
	var temp_layer = new Sprite();
	temp_layer.zIndex = DrillUp.g_DSRS_layerIndex;
	this._drill_DSRS_layer = temp_layer;
	
	this.drill_DSRS_layerAddSprite( temp_layer, "最顶层" );
	this.drill_DSRS_sortByZIndex();
};
//==============================
// * 贴图控制 - 贴图层 - 帧刷新绑定（地图界面）
//==============================
var _drill_DSRS_mapSprite_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_DSRS_mapSprite_update.call(this);
	if( this.isActive() ){
		this.drill_DSRS_updateLayer();
		this.drill_DSRS_updateMask();
	}
};
//==============================
// * 贴图控制 - 贴图层 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_updateLayer = function() {
	
	if( $gameTemp.drill_DSRS_isPlaying() == true ){
		
		// > 长画布贴图 - 创建
		if( this._drill_rollerSprite == undefined ){
			this.drill_DSRS_createRoller();
		}
		
		// > 长画布贴图 - 帧刷新
		this.drill_DSRS_updateRoller();
		
	}else{
		
		// > 长画布贴图 - 销毁
		if( this._drill_rollerSprite != undefined ){
			this.drill_DSRS_destroyRoller();
		}
	}
};

//==============================
// * 贴图控制 - 贴图层 - 创建绑定（战斗界面）
//==============================
var _drill_DSRS_battleSprite_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _drill_DSRS_battleSprite_createDisplayObjects.call(this);
	this.drill_DSRS_createLayer();		//创建 - 贴图层
	this.drill_DSRS_createMask();		//创建 - 内容遮罩
};
//==============================
// * 贴图控制 - 贴图层 - 创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_createLayer = Scene_Map.prototype.drill_DSRS_createLayer;
//==============================
// * 贴图控制 - 贴图层 - 帧刷新绑定（战斗界面）
//==============================
var _drill_DSRS_battleSprite_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_DSRS_battleSprite_update.call(this);
	if( this.isActive() ){
		this.drill_DSRS_updateLayer();
		this.drill_DSRS_updateMask();
	}
};
//==============================
// * 贴图控制 - 贴图层 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_updateLayer = Scene_Map.prototype.drill_DSRS_updateLayer;



//==============================
// * 贴图控制 - 内容遮罩 - 创建（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_createMask = function() {
	var mask_src = DrillUp.g_DSRS_contextMask;
	if( mask_src == undefined ){ return; }
	if( mask_src == "" ){ return; }
	this._drill_rollerMask = new Sprite( ImageManager.loadBitmap("img/Special__dialogRoller/", mask_src, 0, true) );
	this._drill_rollerMask_needResize = true;
	this._drill_DSRS_layer.addChild(this._drill_rollerMask);	
	this._drill_DSRS_layer.mask = this._drill_rollerMask;			//『遮罩赋值』
};
//==============================
// * 贴图控制 - 内容遮罩 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_updateMask = function() {
	if( this._drill_rollerMask_needResize == true &&
		this._drill_rollerMask.bitmap.isReady() ){
		this._drill_rollerMask_needResize = false;
		
		var w = this._drill_rollerMask.bitmap.width;
		var h = this._drill_rollerMask.bitmap.height;
		this._drill_rollerMask.scale.x = Graphics.boxWidth / w;
		this._drill_rollerMask.scale.y = Graphics.boxHeight / h;
	}
}
//==============================
// * 贴图控制 - 内容遮罩 - 创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_createMask = Scene_Map.prototype.drill_DSRS_createMask;
//==============================
// * 贴图控制 - 内容遮罩 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_updateMask = Scene_Map.prototype.drill_DSRS_updateMask;



//==============================
// * 长画布贴图 - 创建（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_createRoller = function() {
	
	// > 阶段列表
	var step_data = JSON.parse(JSON.stringify( DrillUp.g_DSRS_stepList ));
	for( var i = 0; i < step_data.length; i++ ){
		var temp_data = step_data[i];
		if( temp_data == undefined ){ continue; }
		if( $gameTemp._drill_DSRS_stepIndexList.contains( String(i) ) ){
			temp_data['stepVisible'] = true;
		}else{
			temp_data['stepVisible'] = false;
		}
	}
	
	// > 长画布贴图 - 数据
	var sprite_data = {
		"opacityShow": DrillUp.g_DSRS_opacityShow,		//开始时渐变显示 开关
		"opacitySpeed": DrillUp.g_DSRS_opacitySpeed,	//开始时渐变显示 速度
		"steps": step_data,								//阶段列表
	};
	
	// > 长画布贴图
	this._drill_rollerSprite = new Drill_COSR_Sprite( sprite_data );
	this._drill_DSRS_layer.addChild(this._drill_rollerSprite);
	
	// > 长画布贴图 - 开始滚动
	this._drill_rollerSprite.drill_COSR_start();
}
//==============================
// * 长画布贴图 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_updateRoller = function() {
	
	// > 按键加速
	var b = TouchInput.isPressed() || Input.isPressed("ok");
	this._drill_rollerSprite.drill_COSR_speedUp(b);
	
	// > 按键退出
	if( $gameSystem._drill_DSRS_cancelEnabled == true ){
		if( TouchInput.isCancelled() || Input.isTriggered("cancel") ){
			SoundManager.playCancel();
			this._scrollTextWindow.terminateMessage();	//（必须通过 滚动窗口 来结束，直接去掉参数来结束会有滚动窗口的残留bug）
			return;
		};
	}
	
	// > 结束播放退出
	if( this._drill_rollerSprite.drill_COSR_isAtEnd() ){
		this._scrollTextWindow.terminateMessage();	//（必须通过 滚动窗口 来结束，直接去掉参数来结束会有滚动窗口的残留bug）
		return;
	}
}
//==============================
// * 长画布贴图 - 销毁（地图界面）
//==============================
Scene_Map.prototype.drill_DSRS_destroyRoller = function() {
	this._drill_rollerSprite.drill_sprite_destroy();
	this._drill_DSRS_layer.removeChild(this._drill_rollerSprite);
	this._drill_rollerSprite = null;
}
//==============================
// * 长画布贴图 - 创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_createRoller = Scene_Map.prototype.drill_DSRS_createRoller;
//==============================
// * 长画布贴图 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_updateRoller = Scene_Map.prototype.drill_DSRS_updateRoller;
//==============================
// * 长画布贴图 - 销毁（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSRS_destroyRoller = Scene_Map.prototype.drill_DSRS_destroyRoller;


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogSingleRollerSprite = false;
		var pluginTip = DrillUp.drill_DSRS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
