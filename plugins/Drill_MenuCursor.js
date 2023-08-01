//=============================================================================
// Drill_MenuCursor.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        主菜单 - 多样式菜单指针
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
 *   (1.你可以通过插件指令修改默认样式。
 *      插件指令隐藏、显示都是瞬间且永久有效。
 *   (2.所有drill面板插件中的 含选项的窗口 都支持指针样式自定义。
 *      你可以针对特定的窗口配置自定义的样式。
 *   (3.指针可以设置摇晃效果、缩放效果、浮动效果、持续自旋转。
 *      虽然这些效果都可以叠加，但是叠加后并不好看。
 * 移动设置：
 *   (1.由于指针是比较常用的短时间指向的标识物，
 *      所以建议指针的移动时间不要大于18帧。
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
 * [v1.2]
 * 大幅度优化了内部结构。
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
 * @default {"标签":"==默认指针==","---常规---":"","偏移-指针 X":"-5","偏移-指针 Y":"0","资源-菜单指针":"[\"菜单指针-默认\"]","帧间隔":"4","是否倒放":"false","混合模式":"0","---移动方式---":"","指针所在矩形位置":"矩形左侧","移动类型":"弹性移动","移动时长":"10","移动延迟":"0","---指针动画---":"","摇晃效果":"关闭","摇晃速度":"8.0","摇晃幅度范围":"12","缩放效果":"关闭","缩放速度":"8.0","缩放幅度范围":"0.2","浮动效果":"左右浮动","浮动速度":"7.0","浮动偏移量":"8","持续自旋转":"关闭","自旋转速度":"10.0"}
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
 * @default ==新的指针样式==
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
 * @param 初始角度
 * @parent ---常规---
 * @type number
 * @min 0
 * @min 360
 * @desc 指正初始的旋转角度。
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
 * 
 * @param ---透明度---
 * @desc 
 *
 * @param 最大透明度
 * @parent ---透明度---
 * @type number
 * @min 0
 * @min 255
 * @desc 开始变化前的等待时间，单位帧。（1秒60帧）
 * @default 255
 * 
 * @param 透明度变化方式
 * @parent ---透明度---
 * @type select
 * @option 瞬间变化
 * @value 瞬间变化
 * @option 匀速变化
 * @value 匀速变化
 * @desc 当前透明度的变化方式。
 * @default 匀速变化
 *
 * @param 透明度变化时长
 * @parent ---透明度---
 * @type number
 * @min 1
 * @desc 透明度逐渐显现/逐渐消失所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 透明度变化延迟
 * @parent ---透明度---
 * @type number
 * @min 0
 * @desc 开始变化前的等待时间，单位帧。（1秒60帧）
 * @default 0
 * 
 * 
 * @param ---自变化效果---
 * @desc 
 * 
 * @param 摇晃效果
 * @parent ---自变化效果---
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
 * @parent ---自变化效果---
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
 * @parent ---自变化效果---
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
 * @parent ---自变化效果---
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
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			->☆插件指令
//			->☆存储数据
//			->☆地图层级
//			->☆战斗层级
//			->☆菜单层级
//
//			->☆核心漏洞修复
//				->强制鼠标滚轮切换选项
//			->☆对外接口
//				->是否启用指针
//				->当前指针样式
//			->☆窗口扩展
//				->确认后等待指针播放动画完毕 ?
//
//			->☆实体类容器
//			->☆实体类绑定
//			->菜单指针 实体类【Drill_MCu_Bean】
//
//			->☆控制器与贴图
//				->界面创建
//				->控制器帧刷新
//				->主体属性变化
//				->销毁
//			->菜单指针控制器【Drill_MCu_Controller】
//				->A主体
//				->B指针目标
//				->D播放GIF
//				->E自变化效果
//			->菜单指针贴图【Drill_MCu_Sprite】
//				->A主体
//				->B指针目标
//				->C对象绑定
//				->D播放GIF
//				->E自变化效果
//
//
//		★家谱：
//			无
//		
//		★插件私有类：
//			* 菜单指针 实体类【Drill_MCu_Bean】
//			* 菜单指针控制器【Drill_MCu_Controller】
//			* 菜单指针贴图【Drill_MCu_Sprite】
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
//			1.使用 this.x + rect.x 总会有一些偏移，经测试不是资源图片问题。（已解决）
//			  【已解决】除了窗口x、矩形x，还有画布的内边距，因为窗口坐标和画布坐标直接有内边距，所以出现了偏移。
//			2. 2023/7/30: 界面切换时，指针会停留在它默认的位置，然后再开始移动。
//			  但是，位移和透明度弹道总是晚了半秒。这种误差可能是 失去目标时 透明度归零造成的。
//			  目前情况是 透明度已经全亮了，然后看见指针开始移动，非常突兀。
//			  现在我要实现 第一次进入界面时，只有开始移动到新目标时，指针才允许变透明度。
//			  实现部分可见 透明度强制归零 ，但没能成功，可能涉及更深的 目标关系。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_MCu_PluginTip_curName = "Drill_MenuCursor.js 主菜单-多样式菜单指针";
	DrillUp.g_MCu_PluginTip_baseList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MCu_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MCu_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MCu_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MCu_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MCu_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆变量获取
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
		
		// > 控制器
		data['visible'] = true;
		data['pause'] = false;
		
		// > 贴图
		if( dataFrom["资源-菜单指针"] != "" &&
			dataFrom["资源-菜单指针"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-菜单指针"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Menu__ui/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = "最顶层";
		data['zIndex'] = 100;
		
		// > A主体
		data['x'] = Number( dataFrom["偏移-指针 X"] || 0);
		data['y'] = Number( dataFrom["偏移-指针 Y"] || 0);
		data['rotate'] = Number( dataFrom["初始角度"] || 0);
		
		// > B指针目标
		data['move_rectPos'] = String( dataFrom["指针所在矩形位置"] || "矩形中心");
		data['move_type'] = String( dataFrom["移动类型"] || "匀速移动");
		data['move_time'] = Number( dataFrom["移动时长"] || 12);
		data['move_delay'] = Number( dataFrom["移动延迟"] || 0);
		
		data['opacity_org'] = Number( dataFrom["最大透明度"] || 255);
		data['opacity_type'] = String( dataFrom["透明度变化方式"] || "匀速变化");
		data['opacity_time'] = Number( dataFrom["透明度变化时长"] || 20);
		data['opacity_delay'] = Number( dataFrom["透明度变化延迟"] || 0);
		
		// > D播放GIF
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_initFrame'] = Number( dataFrom["锁定帧数"] || 0);
		
		// > E自变化效果
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
// ** ☆插件指令
//=============================================================================
var _drill_MCu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MCu_pluginCommand.call(this, command, args);
	if( command === ">菜单指针" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示" ){	
				$gameSystem._drill_MCu_controller.drill_controller_setVisible( true );
			}
			if( type == "隐藏" ){	
				$gameSystem._drill_MCu_controller.drill_controller_setVisible( false );
			}
		}
		if( args.length == 4 ){
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
// ** 【标准模块】存储数据 ☆存储数据
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
	
	// > 当前样式
	var style_id = DrillUp.g_MCu_defaultStyle;
	this._drill_MCu_style = style_id;
	
	// > 控制器（单个）
	var data = DrillUp.g_MCu_list[ style_id -1 ];
	var temp_controller = new Drill_MCu_Controller( data );
	temp_controller._drill_curStyleId = style_id;
	this._drill_MCu_controller = temp_controller;
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MCu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MCu_controller == undefined ){
		this.drill_MCu_initSysData();
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
Scene_Map.prototype.drill_MCu_layerAddSprite = function (sprite, layer_index) {
    this.drill_MCu_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_MCu_layerRemoveSprite = function( sprite ){
	this.drill_MCu_layerRemoveSprite_Private( sprite );
};
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_MCu_sortByZIndex = function () {
    this.drill_MCu_sortByZIndex_Private();
};
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_MCu_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_MCu_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
};
//==============================
// * 地图层级 - 中层
//==============================
var _drill_MCu_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_MCu_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
};
//==============================
// * 地图层级 - 上层
//==============================
var _drill_MCu_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MCu_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
};
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_MCu_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MCu_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
};
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_MCu_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MCu_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_MCu_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_MCu_layerRemoveSprite_Private = function( sprite ) {
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_MCu_layerAddSprite_Private = function( sprite, layer_index ){
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
};


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
Scene_Battle.prototype.drill_MCu_layerAddSprite = function( sprite, layer_index ){
	this.drill_MCu_layerAddSprite_Private( sprite, layer_index );
};
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_MCu_layerRemoveSprite = function( sprite ){
	this.drill_MCu_layerRemoveSprite_Private( sprite );
};
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_MCu_sortByZIndex = function () {
    this.drill_MCu_sortByZIndex_Private();
};
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_MCu_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_MCu_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_MCu_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_MCu_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_MCu_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_MCu_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
};
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_MCu_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MCu_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_MCu_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_MCu_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_MCu_layerAddSprite_Private = function( sprite, layer_index ){
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
};


//#############################################################################
// ** 【标准模块】菜单层级 ☆菜单层级
//#############################################################################
//##############################
// * 菜单层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_MenuBase.prototype.drill_MCu_layerAddSprite = function( sprite, layer_index ){
    this.drill_MCu_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从菜单层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MCu_layerRemoveSprite = function( sprite ){
	this.drill_MCu_layerRemoveSprite_Private( sprite );
};
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，菜单层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MCu_sortByZIndex = function () {
    this.drill_MCu_sortByZIndex_Private();
};
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MCu_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MCu_menuLayer_update.call(this);
	
	if(!this._backgroundSprite ){		//菜单后面层（防止覆写报错）
		this._backgroundSprite = new Sprite();
	}
	if(!this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MCu_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 去除贴图（私有）
//==============================
Scene_MenuBase.prototype.drill_MCu_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//
//			说明：	> 此处兼容了 战斗界面、地图界面 的层级名词。
//==============================
Scene_MenuBase.prototype.drill_MCu_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};



//=============================================================================
// ** ☆核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 强制鼠标滚轮切换选项
//
//			说明：	> 默认的鼠标滚动只翻页，而不是切换选项。
//					> 强制滚轮为切换选项，用于按钮组的滚轮情况。
//==============================
var _drill_MCu_processWheel = Window_Selectable.prototype.processWheel;
Window_Selectable.prototype.processWheel = function() {
	_drill_MCu_processWheel.call(this);
	
    if( this.isOpenAndActive() && this.maxItems() > 0 ){
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
// ** ☆对外接口
//			
//			说明：	> 菜单指针对外的接口。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 对外接口 - 是否启用指针
//
//			说明：	> 子类继承用接口，注意必须是 可选项窗口 才能自定义菜单指针。
//==============================
Window_Selectable.prototype.drill_MCu_cursorEnabled = function() {
	return true;
};
//==============================
// * 对外接口 - 当前指针样式
//
//			说明：	> 子类继承用接口，注意必须是 可选项窗口 才能自定义菜单指针。
//==============================
Window_Selectable.prototype.drill_MCu_cursorStyleId = function() {
	return $gameSystem._drill_MCu_style;
};



//=============================================================================
// ** ☆窗口扩展
//			
//			说明：	> 菜单指针对 可选项窗口 的扩展功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口扩展 - 确认后等待指针播放动画完毕
//==============================
//...（此处要控制窗口延迟执行 确定键 ，等完成 可滚动窗口核心 后考虑）



//=============================================================================
// ** ☆实体类容器
//
//			说明：	> 此模块在 各界面 建立一个实体类容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_MCu_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MCu_temp_initialize.call(this);
	this._drill_MCu_beanTank = [];			//实体类容器
};
//==============================
// * 容器 - 界面销毁时（场景基类）
//==============================
var _drill_MCu_scene_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
	_drill_MCu_scene_terminate.call(this);
	$gameTemp._drill_MCu_beanTank = [];		//实体类容器
};
//==============================
// * 容器 - 界面销毁时（地图界面）
//==============================
var _drill_MCu_sceneMap_terminate2 = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_MCu_sceneMap_terminate2.call(this);
	$gameTemp._drill_MCu_beanTank = [];		//实体类容器
};
//==============================
// * 容器 - 界面销毁时（战斗界面）
//==============================
var _drill_MCu_sceneBattle_terminate2 = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_MCu_sceneBattle_terminate2.call(this);
	$gameTemp._drill_MCu_beanTank = [];		//实体类容器
};
//==============================
// * 容器 - 界面销毁时（菜单界面）
//==============================
var _drill_MCu_sceneMenu_terminate2 = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MCu_sceneMenu_terminate2.call(this);
	$gameTemp._drill_MCu_beanTank = [];		//实体类容器
};


//=============================================================================
// ** ☆实体类绑定
//
//			说明：	> 此模块根据ui插件的具体位置，进行实体类创建与触发区域绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 实体类绑定 - 帧刷新
//==============================
var _drill_MCu_updateArrows = Window_Selectable.prototype.updateArrows
Window_Selectable.prototype.updateArrows = function() {
    _drill_MCu_updateArrows.call(this);
	
	
	// > 实体类创建
	if( this._drill_MCu_bean == undefined ){
		this._drill_MCu_bean = new Drill_MCu_Bean();
		$gameTemp._drill_MCu_beanTank.push( this._drill_MCu_bean );
	}
	
	
	// > 实体类
	var bean = this._drill_MCu_bean;
	
	// > 实体类 - 启用/关闭
	bean.drill_bean_setEnable( this.drill_MCu_isEnabled() );
	
	// > 实体类 - 按钮组样式
	var style_id = this.drill_MCu_cursorStyleId();	//（子类可继承此方法，来锁定指针样式）
	if( this._drill_COSB_isOccupyed == true ){
		style_id = this._drill_COSB_forceCursorStyle;
	}
	bean.drill_bean_setStyleId( style_id );
	
	// > 按钮组情况
	if( this._drill_COSB_isOccupyed == true &&
		this._drill_COSB_selectedBtnX != 0 ){
		
		// > 实体类 - 设置目标中心
		bean.drill_bean_setCenterPosition( this._drill_COSB_selectedBtnX, this._drill_COSB_selectedBtnY );
		
		// > 实体类 - 设置选项索引
		bean.drill_bean_setIndex( this.index() );
		
		// > 实体类 - 设置矩形范围
		bean.drill_bean_setRect( 0, 0, 0, 0 );
		
		//（'isPointingButton'标记？）
		return;
	}
	
	// > 实体类 - 设置目标中心
	var rect = this.itemRect(this.index());
	var c_x = this.x + this.standardPadding() + rect.x + (rect.width * 0.5);	//默认中心（注意要包含画布的内边距位置）
	var c_y = this.y + this.standardPadding() + rect.y + (rect.height * 0.5);
	if( this.parent != undefined && this.parent.x != undefined && this.parent.y != undefined ){
		c_x += this.parent.x;
		c_y += this.parent.y;
	}
	bean.drill_bean_setCenterPosition( c_x, c_y );
	
	// > 实体类 - 设置选项索引
	bean.drill_bean_setIndex( this.index() );
	
	// > 实体类 - 设置矩形范围
	bean.drill_bean_setRect( rect.x, rect.y, rect.width, rect.height );
	
};
//==============================
// * 实体类绑定 - 开启情况
//
//			说明：	> 如果该可选项窗口不满足要求，则实体类关闭。（菜单指针就会失去一个 指针目标 ）
//==============================
Window_Selectable.prototype.drill_MCu_isEnabled = function() {
	
	// > 条件 - 子类继承的 开启/关闭 情况
	if( this.drill_MCu_cursorEnabled() != true ){ return false; }
	
	// > 条件 - 该窗口被激活才能显示（场景中每次只有一个窗口会被激活）
	if( this.active != true ){ return false; }
	if( this.visible != true ){ return false; }
	if( this.index() == -1 ){ return false; }
	
	// > 条件 - 窗口开关动画时隐藏
	if( this._opening == true ){ return false; }
	if( this._closing == true ){ return false; }
	if( this.isClosed() == true ){ return false; }
	
	return true;
};


//=============================================================================
// ** 菜单指针 实体类【Drill_MCu_Bean】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **					->被动赋值
// **						> 可见
// **						> 位置
// **						> 贴图框架值
// **						> 状态和buff
// **						> 所在层级
// **		
// **		说明：	> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_MCu_Bean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_MCu_Bean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 实体类 - 启用/关闭【开放函数】
//			
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Drill_MCu_Bean.prototype.drill_bean_setEnable = function( enable ){
	this._drill_enabled = enable;
};
//##############################
// * 实体类 - 设置当前样式【开放函数】
//			
//			参数：	> style_id 数字
//			返回：	> 无
//##############################
Drill_MCu_Bean.prototype.drill_bean_setStyleId = function( style_id ){
	this._drill_styleId = style_id;
};
//##############################
// * 实体类 - 设置目标中心【开放函数】
//			
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//			
//			说明：	> 实体类记录目标中心。
//##############################
Drill_MCu_Bean.prototype.drill_bean_setCenterPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置选项索引【开放函数】
//			
//			参数：	> index 数字
//			返回：	> 无
//##############################
Drill_MCu_Bean.prototype.drill_bean_setIndex = function( index ){
	this._drill_index = index;
};
//##############################
// * 实体类 - 设置矩形范围【开放函数】
//			
//			参数：	> rect_x,rect_y,rect_w,rect_h 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，如果没有矩形则赋值全零。
//##############################
Drill_MCu_Bean.prototype.drill_bean_setRect = function( rect_x, rect_y, rect_w, rect_h ){
	this._drill_rect_x = rect_x;
	this._drill_rect_y = rect_y;
	this._drill_rect_w = rect_w;
	this._drill_rect_h = rect_h;
};
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_MCu_Bean.prototype.drill_bean_initData = function(){
	
	this._drill_enabled = true;				//实体类 - 可见
	
	this._drill_styleId = 0;				//实体类 - 当前样式
	
	this._drill_x = 0;						//实体类 - 目标中心x
	this._drill_y = 0;						//实体类 - 目标中心y
	
	this._drill_index = 0;					//实体类 - 选项索引
	
	this._drill_rect_x = 0;					//实体类 - 矩形x
	this._drill_rect_y = 0;					//实体类 - 矩形y
	this._drill_rect_w = 0;					//实体类 - 矩形宽度
	this._drill_rect_h = 0;					//实体类 - 矩形高度
};


//=============================================================================
// ** ☆控制器与贴图
//
//			说明：	> 此模块专门管理 控制器与贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器与贴图 - 容器初始化
//==============================
var _drill_MCu_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_MCu_temp_initialize2.call(this);
	this._drill_MCu_sprite = null;				//贴图（单个）
};
//==============================
// * 控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_MCu_sceneMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_MCu_sceneMap_terminate.call(this);
	$gameTemp._drill_MCu_sprite = null;			//贴图（单个）
};
//==============================
// * 控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_MCu_sceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_MCu_sceneMap_update.call(this);
	this.drill_MCu_updateController();			//帧刷新 - 控制器
	this.drill_MCu_updateAttr();				//帧刷新 - 主体属性变化
	this.drill_MCu_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（地图界面）
//==============================
var _drill_MCu_sceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MCu_sceneMap_createAllWindows.call(this);
	this.drill_MCu_create();
};
//==============================
// * 控制器与贴图 - 界面创建
//==============================
Scene_Map.prototype.drill_MCu_create = function() {
	
	var temp_controller = $gameSystem._drill_MCu_controller;
	if( temp_controller != undefined ){
		var data = temp_controller._drill_data;
		
		// > 透明度强制归零
		temp_controller._drill_opacity = 0;
		temp_controller._drill_lastOpacity = -2000;
		temp_controller._drill_opacityForce = true;
		
		// > 创建贴图
		var temp_sprite = new Drill_MCu_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		temp_sprite._drill_curSerial = temp_controller._drill_controllerSerial;
		
		// > 添加贴图到层级
		$gameTemp._drill_MCu_sprite = temp_sprite;
		this.drill_MCu_layerAddSprite( temp_sprite, data['layerIndex'] );
		
		// > 层级排序
		this.drill_MCu_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 控制器
//==============================
Scene_Map.prototype.drill_MCu_updateController = function() {
	
	// > 控制器帧刷新（单个）
	if( $gameSystem._drill_MCu_controller != undefined ){
		$gameSystem._drill_MCu_controller.drill_controller_update();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 主体属性变化
//==============================
Scene_Map.prototype.drill_MCu_updateAttr = function() {
	var has_layerChange = false;
	
	if( $gameTemp._drill_MCu_sprite != undefined ){
		var temp_sprite = $gameTemp._drill_MCu_sprite;
		var temp_controller = temp_sprite._drill_controller;
		var temp_data = temp_controller._drill_data;
		
		// > 混合模式
		if( temp_sprite.blendMode != temp_data['blendMode'] ){
			temp_sprite.blendMode =  temp_data['blendMode'];
			temp_sprite._drill_layerSprite.blendMode = temp_data['blendMode'];
			temp_sprite._drill_childGIFSprite.blendMode = temp_data['blendMode'];
		}
		// > 地图层级
		if( temp_sprite.layerIndex != temp_data['layerIndex'] ){
			temp_sprite.layerIndex =  temp_data['layerIndex'];
			this.drill_MCu_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
			has_layerChange = true;
		}
		// > 图片层级
		if( temp_sprite.zIndex != temp_data['zIndex'] ){
			temp_sprite.zIndex =  temp_data['zIndex'];
			has_layerChange = true;
		}
	};
	
	// > 层级排序
	if( has_layerChange == true ){
		this.drill_MCu_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 销毁
//==============================
Scene_Map.prototype.drill_MCu_updateDestroy = function() {
	
	// > 自动销毁 - 控制器（单个）
	if( $gameSystem._drill_MCu_controller != undefined &&
		$gameSystem._drill_MCu_controller.drill_controller_isDead() ){
		$gameSystem._drill_MCu_controller = null;
	}
	
	// > 自动销毁 - 贴图（单个）
	var temp_sprite = $gameTemp._drill_MCu_sprite;
	if( temp_sprite != undefined &&
		temp_sprite.drill_sprite_isNeedDestroy() ){
		this.drill_MCu_layerRemoveSprite( temp_sprite );	//（销毁贴图）
		temp_sprite.drill_sprite_destroy();
		$gameTemp._drill_MCu_sprite = null;
	}
};

//==============================
// * 控制器与贴图 - 销毁时（战斗界面）
//==============================
var _drill_MCu_sceneBattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_MCu_sceneBattle_terminate.call(this);
	$gameTemp._drill_MCu_sprite = null;			//贴图（单个）
};
//==============================
// * 控制器与贴图 - 帧刷新（战斗界面）
//==============================
var _drill_MCu_sceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_MCu_sceneBattle_update.call(this);
	this.drill_MCu_updateController();			//帧刷新 - 控制器
	this.drill_MCu_updateAttr();				//帧刷新 - 主体属性变化
	this.drill_MCu_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（战斗界面）
//==============================
var _drill_MCu_sceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MCu_sceneBattle_createAllWindows.call(this);
	this.drill_MCu_create();
};
//==============================
// * 控制器与贴图 - 界面创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_MCu_create = Scene_Map.prototype.drill_MCu_create;
//==============================
// * 控制器与贴图 - 控制器（战斗界面）
//==============================
Scene_Battle.prototype.drill_MCu_updateController = Scene_Map.prototype.drill_MCu_updateController;
//==============================
// * 控制器与贴图 - 主体属性变化（战斗界面）
//==============================
Scene_Battle.prototype.drill_MCu_updateAttr = Scene_Map.prototype.drill_MCu_updateAttr;
//==============================
// * 控制器与贴图 - 销毁（战斗界面）
//==============================
Scene_Battle.prototype.drill_MCu_updateDestroy = Scene_Map.prototype.drill_MCu_updateDestroy;

//==============================
// * 控制器与贴图 - 销毁时（菜单界面）
//==============================
var _drill_MCu_sceneMenu_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MCu_sceneMenu_terminate.call(this);
	$gameTemp._drill_MCu_sprite = null;			//贴图容器
};
//==============================
// * 控制器与贴图 - 帧刷新（菜单界面）
//==============================
var _drill_MCu_sceneMenu_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MCu_sceneMenu_update.call(this);
	this.drill_MCu_updateCreate();				//帧刷新 - 菜单界面创建
	this.drill_MCu_updateController();			//帧刷新 - 控制器
	this.drill_MCu_updateAttr();				//帧刷新 - 主体属性变化
	this.drill_MCu_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 菜单界面创建（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_MCu_updateCreate = function() {
	if( this._drill_MCu_menu_sprite != undefined ){ return; }
	
	var temp_controller = $gameSystem._drill_MCu_controller;
	if( temp_controller != undefined ){
		var data = temp_controller._drill_data;
		
		// > 透明度强制归零
		temp_controller._drill_opacity = 0;
		temp_controller._drill_lastOpacity = -2000;
		temp_controller._drill_opacityForce = true;
		
		// > 创建贴图
		var temp_sprite = new Drill_MCu_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		temp_sprite._drill_curSerial = temp_controller._drill_controllerSerial;
		
		// > 添加贴图到层级
		this._drill_MCu_menu_sprite = temp_sprite;
		$gameTemp._drill_MCu_sprite = temp_sprite;
		this.drill_MCu_layerAddSprite( temp_sprite, data['layerIndex'] );
		
		// > 层级排序
		this.drill_MCu_sortByZIndex();
	}
};
//==============================
// * 控制器与贴图 - 控制器（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_MCu_updateController = Scene_Map.prototype.drill_MCu_updateController;
//==============================
// * 控制器与贴图 - 主体属性变化（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_MCu_updateAttr = Scene_Map.prototype.drill_MCu_updateAttr;
//==============================
// * 控制器与贴图 - 销毁（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_MCu_updateDestroy = Scene_Map.prototype.drill_MCu_updateDestroy;



//=============================================================================
// ** 菜单指针控制器【Drill_MCu_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制菜单指针的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B指针目标
// **						->帧刷新实体类
// **						->目标位置
// **						->目标透明度
// **					->D播放GIF
// **						->设置帧
// **						->锁定帧/解锁帧
// **						->单次播放
// **					->E自变化效果
// **						> 主体贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>摇晃效果
// **						> GIF层>缩放效果
// **						> GIF层>持续自旋转
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_MCu_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_MCu_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_MCu_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	this.drill_controller_initChange();										//初始化子功能 - B指针目标（特殊）
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_MCu_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();						//帧刷新 - A主体
	this.drill_controller_updateChange_Bean();				//帧刷新 - B指针目标 - 实体类
	this.drill_controller_updateChange_Position();			//帧刷新 - B指针目标 - 位置
	this.drill_controller_updateChange_Opacity();			//帧刷新 - B指针目标 - 透明度
	this.drill_controller_updateGIF();						//帧刷新 - D播放GIF
	this.drill_controller_updateEffect();					//帧刷新 - E自变化效果
	this.drill_controller_updateCheckNaN();					//帧刷新 - A主体 - 校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_MCu_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MCu_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MCu_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_MCu_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_MCu_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * D播放GIF - 设置帧【标准函数】
//
//			参数：	> cur_frame 数字（当前帧）
//			返回：	> 无
//			
//			说明：	> 从帧数0开始计数。
//##############################
Drill_MCu_Controller.prototype.drill_controller_GIF_setFrame = function( cur_frame ){
	var data = this._drill_data;
	
	// > 设置帧
	this._drill_GIF_time = cur_frame * data['interval'];
	if( this._drill_GIF_time < 0 ){ this._drill_GIF_time = 0; }
	
	// > 刷新索引
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
};
//##############################
// * D播放GIF - 锁定帧/解锁帧【标准函数】
//
//			参数：	> locked 布尔
//			返回：	> 无
//##############################
Drill_MCu_Controller.prototype.drill_controller_GIF_setLocked = function( locked ){
	var data = this._drill_data;
	data['gif_lock'] = locked;
	this._drill_GIF_oncePlay = false;
};
//##############################
// * D播放GIF - 单次播放【标准函数】
//
//			参数：	> once_type 字符串（forwardRun正向播放/backRun反向播放）
//			返回：	> 无
//##############################
Drill_MCu_Controller.prototype.drill_controller_GIF_setOncePlay = function( once_type ){
	var data = this._drill_data;
	this._drill_GIF_oncePlay = true;
	this._drill_GIF_onceType = once_type;
	this._drill_GIF_time = 0;
	this._drill_GIF_onceTarTime = data['src_img_gif'].length * data['interval'];
};

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_MCu_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };									//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };										//控制器 - 暂停情况
	
	// > 贴图
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };								//贴图 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Menu__ui/" };				//贴图 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };									//贴图 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };								//贴图 - 是否倒放
	
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//贴图 - 混合模式
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//贴图 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//贴图 - 图像-模糊边缘
	
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "最顶层" };							//贴图 - 地图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };													//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//A主体 - 平移Y
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };										//A主体 - 初始角度
	
	// > B指针目标（位置）
	if( data['move_rectPos'] == undefined ){ data['move_rectPos'] = "矩形中心" };					//B指针目标 - 指针所在矩形位置
	if( data['move_type'] == undefined ){ data['move_type'] = "匀速移动" };							//B指针目标 - 移动类型
	if( data['move_time'] == undefined ){ data['move_time'] = 12 };									//B指针目标 - 移动时长
	if( data['move_delay'] == undefined ){ data['move_delay'] = 0 };								//B指针目标 - 移动延迟
	
	// > B指针目标（透明度）
	if( data['opacity_org'] == undefined ){ data['opacity_org'] = 255 };							//B指针目标 - 最大透明度
	if( data['opacity_type'] == undefined ){ data['opacity_type'] = "匀速变化" };					//B指针目标 - 透明度变化方式
	if( data['opacity_time'] == undefined ){ data['opacity_time'] = 20 };							//B指针目标 - 透明度变化时长
	if( data['opacity_delay'] == undefined ){ data['opacity_delay'] = 0 };							//B指针目标 - 透明度变化延迟
	
	// > D播放GIF
	if( data['gif_lock'] == undefined ){ data['gif_lock'] = false };								//D播放GIF - 初始是否锁定帧
	if( data['gif_initFrame'] == undefined ){ data['gif_initFrame'] = 0 };							//D播放GIF - 锁定帧数
	
	// > E自变化效果
	//	（见 变量获取）
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_MCu_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	//this.drill_controller_initChange();		//初始化子功能 - B指针目标（特殊，只在类创建时执行一次，重刷指针样式时不执行）
	this.drill_controller_refreshChange();		//初始化子功能 - B指针目标
	this.drill_controller_initGIF();			//初始化子功能 - D播放GIF
	this.drill_controller_initEffect();			//初始化子功能 - E自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_MCu_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_MCu_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	this._drill_curStyleId = 0;			//常规 - 当前样式
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
	
	// > 根据 实体类 改变样式
	for(var i=0; i < $gameTemp._drill_MCu_beanTank.length; i++ ){
		var bean = $gameTemp._drill_MCu_beanTank[i];
		if( bean._drill_enabled != true ){ continue; }
		
		if( this._drill_curStyleId != bean._drill_styleId ){
			
			if( bean._drill_styleId > 0 ){
				var new_data = DrillUp.g_MCu_list[ bean._drill_styleId -1 ];
				this.drill_controller_resetData( new_data );
			}
			this._drill_curStyleId =  bean._drill_styleId;	//（注意样式赋值要在reset之后）
		}
	}
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_MCu_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_MCu_checkNaN = false;
			alert( DrillUp.drill_MCu_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_MCu_checkNaN = false;
			alert( DrillUp.drill_MCu_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_MCu_checkNaN = false;
			alert( DrillUp.drill_MCu_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_MCu_checkNaN = false;
			alert( DrillUp.drill_MCu_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_MCu_checkNaN = false;
			alert( DrillUp.drill_MCu_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}


//==============================
// * B指针目标 - 初始化子功能
//
//			说明：	> 由于-2000是初始无效值，因此这里只在初始化时执行。
//==============================
Drill_MCu_Controller.prototype.drill_controller_initChange = function() {
	
	// > 贴图 - 位置
	this._drill_x = -2000;
	this._drill_y = -2000;
	this._drill_curX = -2000;
	this._drill_curY = -2000;
	this._drill_lastTarX = -2000;
	this._drill_lastTarY = -2000;
	this._drill_changeMove_curTime = 0;
	
	// > 贴图 - 透明度
	this._drill_opacity = 0;
	this._drill_lastOpacity = -2000;
	this._drill_changeOpacity_curTime = 0;
}
//==============================
// * B指针目标 - 刷新子功能
//==============================
Drill_MCu_Controller.prototype.drill_controller_refreshChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	//	（不影响当前位置）
	
	// > 贴图 - 透明度
	this._drill_opacity = 0;
	this._drill_lastOpacity = -2000;
	this._drill_changeOpacity_curTime = 0;
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	
	// > 贴图 - 旋转
	this._drill_rotation = data['rotate'];		//父贴图（整体再旋转角度）
}
//==============================
// * B指针目标 - 刷新弹道（位置）
//
//			说明：	> 弹道设置 和 弹道列表 直接存控制器里面。
//==============================
Drill_MCu_Controller.prototype.drill_controller_refreshBallisticsMove = function( tar_x, tar_y ){
	var data = this._drill_data;
	
	// > 弹道（移动）
	this._drill_changeMove_curTime = 0;
	//this._drill_changeMove_tarTime = data['move_time'] +1;	//（暂未使用）
	var b_data = {};
	b_data['movementNum'] = 1; 
	b_data['movementTime'] = data['move_time']; 
	b_data['movementDelay'] = data['move_delay'];
	b_data['movementMode'] = "两点式"; 
	b_data['twoPointType'] = data['move_type']; 
	b_data['twoPointDifferenceX'] = tar_x - this._drill_curX; 
	b_data['twoPointDifferenceY'] = tar_y - this._drill_curY; 
	$gameTemp.drill_COBa_setBallisticsMove( b_data );
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, this._drill_curX, this._drill_curY );
	this._drill_change_ballisticsX = this['_drill_COBa_x'];
	this._drill_change_ballisticsY = this['_drill_COBa_y'];
	this['_drill_COBa_x'] = null;
	this['_drill_COBa_y'] = null;
}
//==============================
// * B指针目标 - 刷新弹道（透明度）
//
//			说明：	> 弹道设置 和 弹道列表 直接存控制器里面。
//==============================
Drill_MCu_Controller.prototype.drill_controller_refreshBallisticsOpacity = function( tar_opacity ){
	var data = this._drill_data;
	
	// > 弹道（透明度）
	this._drill_changeOpacity_curTime = 0;
	//this._drill_changeOpacity_tarTime = data['opacity_time'] +1;	//（暂未使用）
	var b_data = {};
	b_data['opacityNum'] = 1;
	b_data['opacityTime'] = data['opacity_time']; 
	b_data['opacityDelay'] = data['opacity_delay'];
	b_data['opacityMode'] = "目标值模式"; 
	b_data['targetType'] = data['opacity_type']; 
	b_data['targetDifference'] = tar_opacity - this._drill_opacity; 
	$gameTemp.drill_COBa_setBallisticsOpacity( b_data );
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, this._drill_opacity );
	this._drill_change_ballisticsOpacity = this['_drill_COBa_opacity'];
	this['_drill_COBa_opacity'] = null;
	
	//alert( this._drill_opacity + " ~ " + tar_opacity );
	//alert( this._drill_change_ballisticsOpacity );
	//alert( data['opacity_type'] );
}
//==============================
// * B指针目标 - 帧刷新 实体类
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateChange_Bean = function(){
	var data = this._drill_data;
	
	var tar_x = -2000;
	var tar_y = -2000;
	var tar_o = -2000;
	
	// > 根据实体类 找目标（瞬间确定）
	for(var i=0; i < $gameTemp._drill_MCu_beanTank.length; i++ ){
		var bean = $gameTemp._drill_MCu_beanTank[i];
		if( bean._drill_enabled != true ){ continue; }
		
		tar_x = bean._drill_x;
		tar_y = bean._drill_y;
		if( data['move_rectPos'] == "矩形左侧" ){
			tar_x -= bean._drill_rect_w*0.5;
		}
		if( data['move_rectPos'] == "矩形右侧" ){
			tar_x += bean._drill_rect_w*0.5;
		}
		if( data['move_rectPos'] == "矩形上侧" ){
			tar_y -= bean._drill_rect_h*0.5;
		}
		if( data['move_rectPos'] == "矩形下侧" ){
			tar_y += bean._drill_rect_h*0.5;
		}
		
		// > 有位置确定时
		tar_o = data['opacity_org'];
	}
	tar_x = Math.floor( tar_x );
	tar_y = Math.floor( tar_y );
	tar_o = Math.floor( tar_o );
	
	// > 场景切换时，失去目标
	if( SceneManager.isSceneChanging() ){
		tar_x = -2000;
		tar_y = -2000;
		tar_o = -2000;
	}
	
	// > 失去目标时（位置）
	//if( tar_x == -2000 && tar_y == -2000 ){	//（不归位）
	//	tar_x = Graphics.boxWidth*0.5;
	//	tar_y = Graphics.boxHeight*0.5;
	//}
	
	// > 失去目标时（透明度）
	if( tar_o == -2000 ){	//（透明度归零）
		tar_o = 0;
	}
	
	
	// > 目标位置
	if( tar_x != -2000 && tar_y != -2000 ){
		
		if( this._drill_lastTarX == tar_x &&
			this._drill_lastTarY == tar_y ){
			//（目标相同，不操作）
		}else{
			this._drill_lastTarX = tar_x;
			this._drill_lastTarY = tar_y;
			this.drill_controller_refreshBallisticsMove( tar_x, tar_y );
			
			//// > 透明度强制归零（存在疑问）
			////	（第一次进入界面时，只有开始移动到新目标时，指针才允许变透明度）
			//if( this._drill_opacityForce == true ){
			//	this._drill_opacityForce = false;
			//	this._drill_changeOpacity_curTime = 0;
			//}
			//this._drill_changeOpacity_curTime = 0;
		}
	}
	
	// > 目标透明度
	if( tar_o != -2000 ){
		
		if( this._drill_lastOpacity == tar_o ){
			//（目标相同，不操作）
		}else{
			this._drill_lastOpacity = tar_o;
			this.drill_controller_refreshBallisticsOpacity( tar_o );
		}
	}
}
//==============================
// * B指针目标 - 帧刷新 位置
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	var xx = 0;
	var yy = 0;
	xx += data['x'];	//（偏移值）
	yy += data['y'];
	
	// > 弹道（移动）
	if( this._drill_change_ballisticsX == null ){
		this._drill_curX = 0;
		this._drill_curY = 0;
	}else{
		
		// > 播放弹道
		var time = this._drill_changeMove_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_change_ballisticsX.length-1 ){ time = this._drill_change_ballisticsX.length-1; }
		this._drill_curX = this._drill_change_ballisticsX[time];
		this._drill_curY = this._drill_change_ballisticsY[time];
		
		// > 时间+1
		this._drill_changeMove_curTime += 1;
	}
	xx += this._drill_curX;
	yy += this._drill_curY;
	
	this._drill_x = xx;
	this._drill_y = yy;
}
//==============================
// * B指针目标 - 帧刷新 透明度
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateChange_Opacity = function(){
	var data = this._drill_data;
	var oo = 0;
	
	// > 场景切换时，瞬间隐藏
	if( SceneManager.isSceneChanging() ){
		oo = 0;
	}
	
	// > 弹道（透明度）
	if( this._drill_change_ballisticsOpacity == null ){
		oo = data['opacity_org'];
	}else{
		
		// > 播放弹道
		var time = this._drill_changeOpacity_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_change_ballisticsOpacity.length-1 ){ time = this._drill_change_ballisticsOpacity.length-1; }
		oo = this._drill_change_ballisticsOpacity[time];
		
		// > 时间+1
		this._drill_changeOpacity_curTime += 1;
	}
	
	this._drill_opacity = oo;
}


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_MCu_Controller.prototype.drill_controller_initGIF = function() {
	var data = this._drill_data;
	
	// > 播放GIF
	this.drill_controller_GIF_setFrame( data['gif_initFrame'] -1 );		//播放GIF - 当前时间
	this._drill_GIF_index = 0;											//播放GIF - 当前索引
	
	// > 单次播放
	this._drill_GIF_oncePlay = false;
	this._drill_GIF_onceType = "forwardRun";	//（forwardRun正向播放/backRun反向播放）
	this._drill_GIF_onceTarTime = 0;
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateGIF = function(){
	var data = this._drill_data;
	
	// > 单次播放
	if( this._drill_GIF_oncePlay == true ){
		
		// > 播放GIF
		var inter = this._drill_GIF_time;
		inter = inter / data['interval'];
		inter = inter % data['src_img_gif'].length;
		if( this._drill_GIF_onceType == "backRun" ){
			inter = data['src_img_gif'].length - 1 - inter;
		}
		this._drill_GIF_index = Math.floor(inter);
		
		// > 时间+1（放后面）
		this._drill_GIF_time += 1;
		
		// > 播放完毕后，锁定帧
		if( this._drill_GIF_time > this._drill_GIF_onceTarTime ){
			this._drill_GIF_oncePlay = false;
			this.drill_controller_GIF_setLocked( true );
		}
		return;
	}
	
	
	// > 锁定帧时（注意，锁定帧时 _drill_GIF_index 不刷新）
	if( data['gif_lock'] == true ){ return; }
	
	// > 播放GIF
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
	
	// > 时间+1（放后面）
	this._drill_GIF_time += 1;
}


//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_MCu_Controller.prototype.drill_controller_initEffect = function() {
	var data = this._drill_data;
	this._drill_curEffectTime = 0;
	
	this._drill_childGIF_rotation = 0;									//子贴图（自旋转）
	this._drill_childGIF_rotateSpeed = data['cursor_rotatingSpeed'];	//子贴图（自旋转速度）
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_MCu_Controller.prototype.drill_controller_updateEffect = function(){
	var data = this._drill_data;
	this._drill_curEffectTime += 1;
	
	// > 贴图 - 旋转（子贴图）
	if( data['cursor_rotating'] == "开启" ){
		this._drill_childGIF_rotation += this._drill_childGIF_rotateSpeed;
	}
}



//=============================================================================
// ** 菜单指针贴图【Drill_MCu_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个菜单指针贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B指针目标
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D播放GIF
// **					->E自变化效果
// **						> 主体贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>摇晃效果
// **						> GIF层>缩放效果
// **						> GIF层>持续自旋转
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [ ●单个 /多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [不可修改/ ●自变化 /外部变化] 
//=============================================================================
//==============================
// * 菜单指针贴图 - 定义
//==============================
function Drill_MCu_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_MCu_Sprite.prototype = Object.create(Sprite.prototype);
Drill_MCu_Sprite.prototype.constructor = Drill_MCu_Sprite;
//==============================
// * 菜单指针贴图 - 初始化
//==============================
Drill_MCu_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 菜单指针贴图 - 帧刷新
//==============================
Drill_MCu_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B指针目标
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateGIF();					//帧刷新 - D播放GIF
	this.drill_sprite_updateEffect();				//帧刷新 - E自变化效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_MCu_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_MCu_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B指针目标
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initGIF();				//初始化子功能 - D播放GIF
	this.drill_sprite_initEffect();				//初始化子功能 - E自变化效果
};

//##############################
// * 菜单指针贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_MCu_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 菜单指针贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_MCu_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;		//（由于场景复杂，且指针只有一个，此处不优化）
};
//##############################
// * 菜单指针贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_MCu_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 菜单指针贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_MCu_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 菜单指针贴图 - 贴图初始化（私有）
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 菜单指针贴图 - 销毁子功能（私有）
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childGIFSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childGIFSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B指针目标
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - D播放GIF
	//	（无）
	
};
//==============================
// * 菜单指针贴图 - 销毁自身（私有）
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = false;
	this.blendMode = data['blendMode'];
	this.layerIndex = data['layerIndex'];
	this.zIndex = data['zIndex'];
	
	
	// > 资源对象组
	this._drill_bitmapTank = [];
	for(var j = 0; j < data['src_img_gif'].length; j++ ){
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_gif'][j], data['tint'], data['smooth'] );
		this._drill_bitmapTank.push( bitmap );
	}
	
	// > GIF 贴图
	var temp_sprite = new Sprite(); 
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.blendMode = data['blendMode'];
	temp_sprite.bitmap = this._drill_bitmapTank[0];
	this._drill_childGIFSprite = temp_sprite;
	
	// > GIF 层
	var temp_layer = new Sprite();		//GIF样式两层容器
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	temp_layer.blendMode = data['blendMode'];
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_childGIFSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 序列号不一致时，重刷贴图
	if( this._drill_curSerial != this._drill_controller._drill_controllerSerial ){
		
		// > 销毁子功能
		this.drill_sprite_destroyChild();
		
		// > 初始化子功能
		this.drill_sprite_initChild();
		
		this._drill_curSerial =  this._drill_controller._drill_controllerSerial;
	}
	
	// > 可见
	this.visible = data['visible'];
	
	// > 缩放
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	
	// > 透明度
	this.opacity = this._drill_controller._drill_opacity;
	
	// > 旋转
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;	//（整体再旋转角度)
	this._drill_childGIFSprite.rotation = this._drill_controller._drill_childGIF_rotation *Math.PI/180;
}


//==============================
// * B指针目标 - 初始化子功能
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B指针目标 - 帧刷新
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置 - 层级位置修正
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	this.x = xx;
	this.y = yy;
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_initGIF = function(){
	var data = this._drill_controller._drill_data;
	//	（无）
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_updateGIF = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图Bitmap
	this._drill_childGIFSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
}

//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_initEffect = function() {
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_MCu_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller._drill_data;
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
		this.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x -= value;
		this.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 摇晃效果
	if( data['effect_swing'] == "开启" ){
		var speed = data['effect_swingSpeed'];
		var range = data['effect_swingRange'];
		var value = range / 180 * Math.PI * Math.sin( cur_time * speed /180*Math.PI );
		this.rotation += value;
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
		this._drill_layerSprite.scale.y += value;
	}
	// > 持续自旋转
	//	（见 drill_sprite_updateAttr ）
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MenuCursor = false;
		var pluginTip = DrillUp.drill_MCu_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


