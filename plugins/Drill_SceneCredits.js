//=============================================================================
// Drill_SceneCredits.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        标题 - 制作组
 * @author Drill_up
 * 
 * @Drill_LE_param "阶段-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_SCr_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_SceneCredits +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供制作组功能，能以滚动播放图片、文字、GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfScreenRoller     窗口字符-长画布贴图核心
 *     必须基于该插件才能建立长画布并播放内容。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.制作组属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SCr
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 结构：
 *   (1.插件包含：1个长画布贴图
 *      进入面板后，可以滚动播放图片、文字、GIF。
 *   (2.如果你想开始绘制内容，见 "18.面板 > 关于长画布贴图核心.docx"。
 * 内容：
 *   (1.一个阶段的显示模式为GIF模式时，画面滚动到该阶段，GIF才开始播放。
 *      你可以设置GIF播放延迟，用于设计某个静态图片突然开始动了的效果。
 *   (2.内容遮罩控制内容的整体透明度，
 *      白色表示不透明部分，黑色表示透明部分。
 *   (3.一个阶段的显示模式为文本模式时，
 *      其文本内容支持所有窗口字符，包括动态的窗口字符。
 *      可以去看看文档 "23.窗口字符 > 关于窗口字符表.docx"。
 * 细节：
 *   (1.该界面直接添加到标题选项中，没有全局存储的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles2
 * 先确保项目img文件夹下是否有titles2文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 使用制作组插件，需要配置资源文件：
 * 
 * 资源-整体布局
 * 资源-内容遮罩
 * 
 * 阶段-1 资源-单图
 * 阶段-1 资源-GIF
 * 阶段-2 资源-单图
 * 阶段-2 资源-GIF
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 打开制作组面板，可以使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>制作组 : 打开面板
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
 * 时间复杂度： o(n^2)*o(场景元素) 每帧
 * 测试方法：   直接进入该信息面板进行测试。
 * 测试结果：   在菜单界面中，基本元素消耗为：【10.97ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为一个界面，在该插件的界面中，地图界面、战斗界面处于完全
 *   暂停状态，所以该界面占用的图形资源、计算资源充足，消耗也低。
 * 3.该界面中的元素数量有限，消耗也上不去。暂无与消耗相关的线性关系量。
 *   （地图的线性关系量：事件，因为50/100/200事件对于消耗影响较大。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了修改游戏分辨率时，遮罩挡住字幕的问题。
 * 遮罩资源会根据游戏分辨率自动缩放。
 * [v1.2]
 * 添加了插件指令。
 * [v1.3]
 * 更新并兼容了新的窗口字符底层。
 * 
 * 
 * @param ----杂项----
 * @default 
 *
 * @param 用语-制作组
 * @parent ----杂项----
 * @desc 标题窗口中的表示"制作组"的按钮名称。
 * @default 制作组
 * 
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 整体布局的图片资源。静态放置在面板最上层，一般为面板的框架图像。
 * @default 制作组-整体布局
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param 资源-内容遮罩
 * @parent ----杂项----
 * @desc 内容遮罩的图片资源。静态放置在内容上层，将遮住长画布的内容。
 * @default 制作组-内容遮罩
 * @require 1
 * @dir img/titles2/
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
 * @param ----滚动内容----
 * @default 
 *
 * @param 阶段-1
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-2
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-3
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-4
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-5
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-6
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-7
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-8
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-9
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-10
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-11
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-12
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-13
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-14
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-15
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-16
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-17
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-18
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-19
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-20
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-21
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-22
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-23
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-24
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-25
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-26
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-27
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-28
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-29
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-30
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-31
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-32
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-33
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-34
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-35
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-36
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-37
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-38
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-39
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-40
 * @parent ----滚动内容----
 * @type struct<SCrStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 * 
 * 
 */
/*~struct~SCrStep:
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
 * @dir img/titles2/
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
 * @dir img/titles2/
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
//		插件简称		SCr（Scene_Credits）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	13.65ms  10.97ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆标题选项
//			
//			->制作组面板【Scene_Drill_SCr】
//				->A主体
//				->B内容遮罩
//				->C长画布控制
//					->画布加速（ok键）
//					->退出窗口（cancel键）
//				->☆原型链规范（Scene_Drill_SCr）
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 制作组面板【Scene_Drill_SCr】
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.核心具备默认值，即使给的参数缺项，也不会造成插件报错。
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
	DrillUp.g_SCr_PluginTip_curName = "Drill_SceneCredits.js 标题-制作组";
	DrillUp.g_SCr_PluginTip_baseList = ["Drill_CoreOfScreenRoller.js 窗口字符-长画布贴图核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_SCr_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_SCr_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_SCr_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_SCr_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_SCr_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SceneCredits = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SceneCredits');
	
	//==============================
	// * 静态数据 - 阶段
	//				（~struct~SCrStep）
	//==============================
	DrillUp.drill_SCr_initStep = function( dataFrom ){
		var data = {};
		
		data['height'] = Number(dataFrom["阶段高度"] || 0);
		data['speed'] = Number(dataFrom["阶段滚动速度"] || 1.5);
		
		// > D播放GIF
		data['bgm_set'] = String(dataFrom["当前阶段BGM设置"] || "不操作");
		data['bgm_src'] = String(dataFrom["资源-BGM"] || "");
		
		
		// > 阶段
		data['mode'] = String(dataFrom["显示模式"] || "单图模式");
		
		// > 阶段 - 单图模式
		data['img_src'] = String(dataFrom["资源-单图"] || "");
		data['img_src_file'] = "img/titles2/";
		data['img_x'] = Number(dataFrom["平移-单图 X"] || 0);
		data['img_y'] = Number(dataFrom["平移-单图 Y"] || 0);
		
		// > 阶段 - GIF模式
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/titles2/";
		data['gif_x'] = Number(dataFrom["平移-GIF X"] || 0);
		data['gif_y'] = Number(dataFrom["平移-GIF Y"] || 0);
		data['gif_delay'] = Number(dataFrom["开始播放延迟"] || 60);
		data['gif_interval'] = Number(dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String(dataFrom["是否倒放"] || "false") == "true";
		data['gif_replay'] = String(dataFrom["GIF到末尾是否重播"] || "false") == "true";
		
		// > 阶段 - 文本模式
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
		
		return data;
	}
	
	/*-----------------阶段------------------*/
	DrillUp.g_SCr_list_length = 40;
	DrillUp.g_SCr_list = [];
	for (var i = 0; i < DrillUp.g_SCr_list_length; i++) {
		if( DrillUp.parameters["阶段-" + String(i+1) ] != undefined &&
			DrillUp.parameters["阶段-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["阶段-" + String(i+1) ]);
			DrillUp.g_SCr_list[i] = DrillUp.drill_SCr_initStep( data );
		}else{
			DrillUp.g_SCr_list[i] = DrillUp.drill_SCr_initStep( {} );
		}
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_SCr_commandName = String(DrillUp.parameters["用语-制作组"] || "制作组");
    DrillUp.g_SCr_layout = String(DrillUp.parameters["资源-整体布局"] || "");
    DrillUp.g_SCr_contextMask = String(DrillUp.parameters["资源-内容遮罩"] || "");
    DrillUp.g_SCr_opacityShow = String(DrillUp.parameters["是否初始阶段渐变显示"] || "true") == "true";
    DrillUp.g_SCr_opacitySpeed = Number(DrillUp.parameters["渐变速度"] || 2);
	
	
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
var _drill_SCr_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_SCr_pluginCommand.call(this, command, args);
	this.drill_SCr_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_SCr_pluginCommand = function( command, args ){
	if( command === ">制作组" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){
				SceneManager.push(Scene_Drill_SCr);
			}
		}
	}
}
	

//=============================================================================
// ** ☆标题选项
//
//			说明：	> 此模块专门关联标题选项，选项进入后跳转到 制作组面板 界面。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================	
var _drill_SCr_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SCr_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SCr_command',  this.drill_SCr_commandCredits.bind(this));
};
Scene_Title.prototype.drill_SCr_commandCredits = function() {
    this._commandWindow.close();
    SceneManager.push( Scene_Drill_SCr );
};
var _drill_SCr_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SCr_makeCommandList.call(this);
	this.addCommand( DrillUp.g_SCr_commandName,   'Drill_SCr_command' );
};	


//=============================================================================
// ** 制作组面板【Scene_Drill_SCr】
// **
// **		作用域：	菜单界面
// **		主功能：	滚动画布界面的基本功能。
// **		子功能：
// **					->界面重要函数
// **						> 初始化（initialize）
// **						> 创建（create）
// **						> 帧刷新（update）
// **						x> 开始运行（start）
// **						x> 结束运行（stop）
// **						x> 忙碌状态（isBusy）
// **						x> 析构函数（terminate）
// **						x> 判断加载完成（isReady）
// **						x> 判断是否激活/启动（isActive）
// **						x> 当前角色切换时（onActorChange）
// **						x> 创建 - 菜单背景（createBackground）
// **						x> 创建 - 帮助窗口（createHelpWindow）
// **					
// **					->A主体
// **					->B内容遮罩
// **					->C长画布控制
// **						->画布加速（ok键）
// **						->退出窗口（cancel键）
// **		界面成员：
// **					> ._drill_field				布局层
// **						> ._drill_rollerMask		内容遮罩
// **						> ._drill_rollerSprite		长画布贴图
// **					> ._drill_layout			整体布局贴图
// **				
// **		说明：	> 暂无。
//=============================================================================
//==============================
// * 制作组面板 - 定义
//==============================
function Scene_Drill_SCr() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SCr.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SCr.prototype.constructor = Scene_Drill_SCr;
//==============================
// * 制作组面板 - 初始化（继承）
//==============================
Scene_Drill_SCr.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//==============================
// * 制作组面板 - 创建（继承）
//==============================
Scene_Drill_SCr.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.drill_createAttr();			//创建 - A主体
	this.drill_createMask();			//创建 - B内容遮罩
	this.drill_createRoller();			//创建 - C长画布控制
};
//==============================
// * 制作组面板 - 帧刷新（继承）
//==============================
Scene_Drill_SCr.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
										//帧刷新 - A主体（无）
	this.drill_updateMask();			//帧刷新 - B内容遮罩
	this.drill_updateRoller();			//帧刷新 - C长画布控制
};

//==============================
// * A主体 - 创建
//==============================
Scene_Drill_SCr.prototype.drill_createAttr = function() {
	
	// > 布局层（先画，其图层都被放在后面）
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);
	
	// > 整体布局贴图
	this._drill_layout = new Sprite( ImageManager.loadTitle2(DrillUp.g_SCr_layout) );
	this.addChild(this._drill_layout);	
};

//==============================
// * B内容遮罩 - 创建
//==============================
Scene_Drill_SCr.prototype.drill_createMask = function() {
	this._drill_rollerMask = new Sprite( ImageManager.loadTitle2(DrillUp.g_SCr_contextMask) );
	this._drill_rollerMask_needResize = true;
	this._drill_field.addChild(this._drill_rollerMask);	
	this._drill_field.mask = this._drill_rollerMask;		//『遮罩赋值』
};
//==============================
// * B内容遮罩 - 帧刷新
//==============================
Scene_Drill_SCr.prototype.drill_updateMask = function() {
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
// * C长画布控制 - 创建
//==============================
Scene_Drill_SCr.prototype.drill_createRoller = function() {
	var data = {
		"opacityShow": DrillUp.g_SCr_opacityShow,		//开始时渐变显示 开关
		"opacitySpeed": DrillUp.g_SCr_opacitySpeed,		//开始时渐变显示 速度
		"steps": DrillUp.g_SCr_list,					//阶段列表
	};
	
	// > 长画布贴图
	this._drill_rollerSprite = new Drill_COSR_Sprite( data );
	this._drill_field.addChild(this._drill_rollerSprite);	
	
	// > 长画布贴图 - 开始滚动
	this._drill_rollerSprite.drill_COSR_start();
};
//==============================
// * C长画布控制 - 帧刷新
//==============================
Scene_Drill_SCr.prototype.drill_updateRoller = function() {
	
	// > 按键加速
	var enabled = TouchInput.isPressed() || Input.isPressed("ok");
	this._drill_rollerSprite.drill_COSR_speedUp( enabled );
	
	// > 按键退出
	if( TouchInput.isCancelled() || Input.isTriggered("cancel") ) {
		SoundManager.playCursor();
		SceneManager.pop();
	};	 
	
	// > 结束播放退出
	if( this._drill_rollerSprite.drill_COSR_isAtEnd() ){
		SceneManager.pop();
	}
}


//=============================================================================
// ** ☆原型链规范（Scene_Drill_SCr）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 制作组面板（场景基类） - 初始化
//==============================
//Scene_Drill_SCr.prototype.initialize = function() {
//    Scene_MenuBase.prototype.initialize.call(this);
//};
//==============================
// * 制作组面板（场景基类） - 创建
//==============================
//Scene_Drill_SCr.prototype.create = function() {
//    Scene_MenuBase.prototype.create.call(this);
//};
//==============================
// * 制作组面板（场景基类） - 帧刷新
//==============================
//Scene_Drill_SCr.prototype.update = function() {
//    Scene_MenuBase.prototype.update.call(this);
//};
//==============================
// * 制作组面板（场景基类） - 开始运行
//==============================
Scene_Drill_SCr.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
//==============================
// * 制作组面板（场景基类） - 结束运行
//==============================
Scene_Drill_SCr.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
};
//==============================
// * 制作组面板（场景基类） - 忙碌状态
//==============================
Scene_Drill_SCr.prototype.isBusy = function() {
	return Scene_MenuBase.prototype.isBusy.call(this);
};
//==============================
// * 制作组面板（场景基类） - 析构函数
//==============================
Scene_Drill_SCr.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};
//==============================
// * 制作组面板（场景基类） - 判断加载完成
//==============================
Scene_Drill_SCr.prototype.isReady = function() {
	return Scene_MenuBase.prototype.isReady.call(this);
};
//==============================
// * 制作组面板（场景基类） - 判断是否激活/启动
//==============================
Scene_Drill_SCr.prototype.isActive = function() {
	return Scene_MenuBase.prototype.isActive.call(this);
};

//==============================
// * 制作组面板（菜单界面基类） - 当前角色切换时
//==============================
Scene_Drill_SCr.prototype.onActorChange = function() {
	Scene_MenuBase.prototype.onActorChange.call(this);
};
//==============================
// * 制作组面板（菜单界面基类） - 创建 - 菜单背景
//==============================
Scene_Drill_SCr.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};
//==============================
// * 制作组面板（菜单界面基类） - 创建 - 帮助窗口
//==============================
Scene_Drill_SCr.prototype.createHelpWindow = function() {
	Scene_MenuBase.prototype.createHelpWindow.call(this);
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneCredits = false;
		var pluginTip = DrillUp.drill_SCr_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


