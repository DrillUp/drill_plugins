//=============================================================================
// Drill_DialogSingleSprite.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        对话框 - 简易对话图
 * @author Drill_up
 * 
 * @Drill_LE_param "对话图-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSS_pics_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogSingleSprite +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将单张图片作为对话显示。
 * ★★必须放在 对话框-对话框变形器 插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于最顶层。
 * 细节：
 *   (1.贴图固定放在最顶层。
 *   (2.对话框可以阻塞流程进度。玩家必须点击确定键才能继续。
 *      对话图与对话框阻塞原理一样，必须点击确定键才能往下下一步指令。
 *   (3.根据流程阻塞关系，对话框和对话图不会同时存在，也无法同时存在。
 * 设计：
 *   (1.该插件一般用于 地图界面 或者 战斗界面 的简易教程图示。
 *      必须按确定键才能进入下一步，这样能够引起玩家注意。
 *   (2.插件的功能完全可以用纯事件做：
 *      先控制显示图片，再播放一个隐形对话框（背景透明+空内容），效果
 *      是一模一样的。
 *      不过，纯事件有一个小瑕疵，你能看见对话框的小箭头，而该插件没有。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__dialogPic （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__dialogPic文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 对话图1
 * 对话图2
 * 对话图3
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令，设置对话图：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>简易对话图 : 执行 : 图[1]
 * 
 * 1.根据流程阻塞关系，对话框和对话图不会同时存在，也无法同时存在。
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
 * 测试方法：   在对话框管理层中测试单张对话图功能。
 * 测试结果：   战斗界面中，平均消耗为：【8.82ms】
 *              200个事件的地图中，平均消耗为：【9.04ms】
 *              100个事件的地图中，平均消耗为：【8.65ms】
 *               50个事件的地图中，平均消耗为：【8.79ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只控制一个贴图，所以消耗并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * 
 * 
 * 
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 对话图固定处于最顶层，这里为对话图所在的图片层级。
 * @default 50
 * 
 * @param 贴图显现时间
 * @type number
 * @min 1
 * @desc 对话图的显现时间。
 * @default 20
 * 
 * @param ----对话图组----
 * @default 
 *
 * @param 对话图-1
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-2
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-3
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-4
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-5
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-6
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-7
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-8
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-9
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-10
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-11
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-12
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-13
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-14
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-15
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-16
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-17
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-18
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-19
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-20
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-21
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-22
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-23
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-24
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-25
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-26
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-27
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-28
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-29
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-30
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-31
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-32
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-33
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-34
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-35
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-36
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-37
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-38
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-39
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-40
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-41
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-42
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-43
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-44
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-45
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-46
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-47
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-48
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-49
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-50
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-51
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-52
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-53
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-54
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-55
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-56
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-57
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-58
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-59
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-60
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-61
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-62
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-63
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-64
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-65
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-66
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-67
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-68
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-69
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-70
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-71
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-72
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-73
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-74
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-75
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-76
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-77
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-78
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-79
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 * @param 对话图-80
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSS（Dialog_Single_Sprite）
//		临时全局变量	DrillUp.g_DSS_xxx
//		临时局部变量	this._drill_DSS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	对话框管理层
//		★性能测试消耗	8.79ms
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
//			->☆地图层级
//			->☆战斗层级
//			
//			->☆对话框控制
//			->☆播放控制
//				->对话框 执行打开
//				->对话框 执行关闭
//			->☆贴图控制
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
//			1.这里有一个比较不稳定的因素：对话框开启、关闭的时间。
//			  这里被设置为强制delay 8帧左右时间，就是为了不让对话框瞬间恢复自己的位置。
//			2. 2021-7-25
//			  原先采用 固定帧初始值，强制固定了Window_Message对话框的位置。
//			  后来考虑到，坐标固定并不适合叠加功能，窗口也不存在变换的概念，
//			  所以这里改回为临时修改窗口位置的方法。
//			
//		★其它说明细节：
//			1.在对话框出现某个关键字段的时候，把对话框下移到别的位置。
//			  然后显示指定的图片。
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
	DrillUp.g_DSS_PluginTip_curName = "Drill_DialogSingleSprite.js 对话框-简易对话图";
	DrillUp.g_DSS_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogSingleSprite = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSingleSprite');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSS_layerIndex = Number(DrillUp.parameters["图片层级"] || 50);	
	DrillUp.g_DSS_fadeTime = Number(DrillUp.parameters["贴图显现时间"] || 20);	
	
	/*-----------------对话图------------------*/
	DrillUp.g_DSS_pics_length = 80;
	DrillUp.g_DSS_pics = [];
	for( var i = 0; i < DrillUp.g_DSS_pics_length; i++ ){
		DrillUp.g_DSS_pics[i] = String(DrillUp.parameters["对话图-" + String(i+1) ] || "");
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DSS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DSS_pluginCommand.call( this, command, args );
	this.drill_DSS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DSS_pluginCommand = function( command, args ){
	if( command === ">简易对话图" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "执行" ){
				temp1 = temp1.replace("图[","");
				temp1 = temp1.replace("]","");
				
				// > 播放控制
				$gameMessage.newPage();
				$gameMessage.add("_drill_DSS_picIndex" + temp1);
				this.setWaitMode('message');		//『强制等待』
			}
		}
	}
}


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
Scene_Map.prototype.drill_DSS_layerAddSprite = function( sprite, layer_index ){
	this.drill_DSS_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_DSS_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_DSS_sortByZIndex = function () {
    this.drill_DSS_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_DSS_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_DSS_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_DSS_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_DSS_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_DSS_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_DSS_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_DSS_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_DSS_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_DSS_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DSS_map_createAllWindows.call(this);		//对话框集合 < 最顶层
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
Scene_Map.prototype.drill_DSS_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_DSS_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Battle.prototype.drill_DSS_layerAddSprite = function( sprite, layer_index ){
	this.drill_DSS_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_DSS_layerRemoveSprite = function( sprite ){
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
Scene_Battle.prototype.drill_DSS_sortByZIndex = function () {
    this.drill_DSS_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_DSS_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function(){    
	_drill_DSS_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_DSS_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function(){
    _drill_DSS_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_DSS_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function(){
	_drill_DSS_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_DSS_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_DSS_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Battle.prototype.drill_DSS_sortByZIndex_Private = function(){
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_DSS_layerAddSprite_Private = function( sprite, layer_index ){
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
// ** ☆对话框控制
//			
//			说明：	> 此模块专门控制 对话框 。
//					> 播放 简易对话图 时，需要隐藏对话框。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 对话框控制 - 初始化
//==============================
var _drill_DSS_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_DSS_initialize.call(this);
	this._drill_DSS_spriteData = {};					//
	this._drill_DSS_spriteData['orgX'] = -1;			//原坐标x
	this._drill_DSS_spriteData['orgY'] = -1;			//原坐标y
	this._drill_DSS_spriteData['delay'] = 0;			//变动延迟
	this._drill_DSS_spriteData['lastState'] = false;	//变化锁
}
//==============================
// * 对话框控制（兼容） - 对话框 帧刷新
//==============================
var _drill_DSS_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
	_drill_DSS_update.call(this);
	this.drill_DSS_updateWindowHide();			//帧刷新变换
};
if( Imported.Drill_CoreOfDialog ){
	//==============================
	// * 对话框控制（对话框优化核心） - 对话框 帧刷新
	//==============================
	var _drill_DSS_CODi_message_update = Window_Message.prototype.drill_CODi_message_update;
	Window_Message.prototype.drill_CODi_message_update = function(){
		_drill_DSS_CODi_message_update.call(this);
		this.drill_DSS_updateWindowHide();		//帧刷新变换
	}
}
//==============================
// * 对话框控制 - 帧刷新变换
//==============================
Window_Message.prototype.drill_DSS_updateWindowHide = function() {
	
	// > 时间+1
	this._drill_DSS_spriteData['delay'] += 1;
	
	// > 播放隐藏
	if( $gameTemp.drill_DSS_isPlaying() == true ){				//（是否正在播放）
		if( this._drill_DSS_spriteData['lastState'] == false ){
			this._drill_DSS_spriteData['lastState'] = true;		//锁-开始播放时
			
			this._drill_DSS_spriteData['orgX'] = this.x;		//（记录位置）
			this._drill_DSS_spriteData['orgY'] = this.y;
			
			this.x += 0;
			this.y += Graphics.boxHeight * 2;
		}
		
	// > 关闭隐藏
	}else{
		if( this._drill_DSS_spriteData['lastState'] == true ){
			this._drill_DSS_spriteData['lastState'] = false;		//锁-结束播放时
			
			this._drill_DSS_spriteData['delay'] = 0;
		}
		
		// > 延迟归位（8帧后 执行一次归位，已经归位则不执行）
		if( this._drill_DSS_spriteData['lastState'] == false && 
			this._drill_DSS_spriteData['delay'] > 8 ){
			this.drill_DSS_homingPosition();
		}
	}
}
//==============================
// * 对话框控制 - 执行归位（开放函数）
//==============================
Window_Message.prototype.drill_DSS_homingPosition = function() {
	if( this._drill_DSS_spriteData['orgX'] == -1 &&
		this._drill_DSS_spriteData['orgY'] == -1 ){ return; }
	this.x = this._drill_DSS_spriteData['orgX'];
	this.y = this._drill_DSS_spriteData['orgY'];
	this._drill_DSS_spriteData['orgX'] = -1;			//（清理原坐标）
	this._drill_DSS_spriteData['orgY'] = -1;			//
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
var _drill_DSS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_DSS_temp_initialize.call(this);
	this._drill_DSS_picIndex = -1;			//当前对话图的bitmap索引
};
//==============================
// * 播放控制 - 检查播放
//==============================
Game_Temp.prototype.drill_DSS_checkPicIndex = function() {
	var context = $gameMessage.allText();
	if( context.contains("_drill_DSS_picIndex") ){
		var index_str = context.replace("_drill_DSS_picIndex","");
		var index = Number(index_str.trim());
		if( isNaN( index ) ){
			this._drill_DSS_picIndex = -1;
		}else{
			this._drill_DSS_picIndex = index -1;
		}
	}else{
		this._drill_DSS_picIndex = -1;
	}
};
//==============================
// * 播放控制 - 是否正在播放（开放函数）
//==============================
Game_Temp.prototype.drill_DSS_isPlaying = function() {
	if( this._drill_DSS_picIndex >= 0 ){ return true; }
	return false;
};

//==============================
// * 播放控制 - 对话框 执行打开（兼容）
//==============================
var _drill_DSS_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	_drill_DSS_startMessage.call(this);
	/*
		实现原理：
			1. 通过插件指令播放 $gameMessage.add() 来捕获参数，进入对话框。
			2. 进入到此函数后，开启 drill_DSS_isPlaying 判定。
			3. 根据判定，自动隐藏对话框，显示对话图。
	*/
	$gameTemp.drill_DSS_checkPicIndex();
};
//==============================
// * 播放控制 - 对话框 执行关闭（兼容）
//==============================
var _drill_DSS_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    _drill_DSS_terminateMessage.call(this);
	$gameTemp._drill_DSS_picIndex = -1;
};
if( Imported.Drill_CoreOfDialog ){
	//==============================
	// * 播放控制 - 对话框 执行打开（对话框优化核心）
	//==============================
	var _drill_DSS_CODi_message_newPage = Window_Message.prototype.drill_CODi_message_newPage;
	Window_Message.prototype.drill_CODi_message_newPage = function() {
		_drill_DSS_CODi_message_newPage.call(this);
		$gameTemp.drill_DSS_checkPicIndex();
	};
	//==============================
	// * 播放控制 - 对话框 执行关闭（对话框优化核心）
	//==============================
	var _drill_DSS_CODi_message_doTerminate = Window_Message.prototype.drill_CODi_message_doTerminate;
	Window_Message.prototype.drill_CODi_message_doTerminate = function() {
		_drill_DSS_CODi_message_doTerminate.call(this);
		$gameTemp._drill_DSS_picIndex = -1;
	};
}


//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门管理 对话图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 创建绑定（地图界面）
//==============================
var _drill_DSS_mapSprite_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DSS_mapSprite_createAllWindows.call(this);
	this.drill_DSS_createSprite();	
};
//==============================
// * 贴图控制 - 创建（地图界面）
//==============================
Scene_Map.prototype.drill_DSS_createSprite = function() {
	
	// > 『界面简单加载』
	this._drill_DSS_src_bitmaps = [];
	for( var i=0; i < DrillUp.g_DSS_pics.length; i++ ){
		this._drill_DSS_src_bitmaps[i] = ImageManager.loadBitmap( "img/Special__dialogPic/", DrillUp.g_DSS_pics[i], 0, true );
	}
	
	// > 贴图初始化
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = Graphics.boxWidth/2;
	temp_sprite.y = Graphics.boxHeight/2;
	temp_sprite.zIndex = DrillUp.g_DSS_layerIndex;
	this._drill_DSS_sprite = temp_sprite;
	
	this.drill_DSS_layerAddSprite( temp_sprite, "最顶层" );
	this.drill_DSS_sortByZIndex();
}
//==============================
// * 贴图控制 - 帧刷新绑定（地图界面）
//==============================
var _drill_DSS_mapSprite_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_DSS_mapSprite_update.call(this);
	if( this.isActive() ){
		this.drill_DSS_updateSprite();
	}
};
//==============================
// * 贴图控制 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_DSS_updateSprite = function() {
	var temp_sprite = this._drill_DSS_sprite;
	
	// > 切换对话图
	if( $gameTemp.drill_DSS_isPlaying() == true ){
		temp_sprite.visible = true;
		temp_sprite.opacity += 255/DrillUp.g_DSS_fadeTime;
		temp_sprite.bitmap = this._drill_DSS_src_bitmaps[ $gameTemp._drill_DSS_picIndex ];
		return;
	}
	
	// > 隐藏对话图
	temp_sprite.visible = false;
	temp_sprite.opacity = 0;
}

//==============================
// * 贴图控制 - 创建绑定（战斗界面）
//==============================
var _drill_DSS_battleSprite_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _drill_DSS_battleSprite_createDisplayObjects.call(this);
	this.drill_DSS_createSprite();	
}
//==============================
// * 贴图控制 - 创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSS_createSprite = Scene_Map.prototype.drill_DSS_createSprite;
//==============================
// * 贴图控制 - 帧刷新绑定（战斗界面）
//==============================
var _drill_DSS_battleSprite_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_DSS_battleSprite_update.call(this);
	if( this.isActive() ){
		this.drill_DSS_updateSprite();
	}
};
//==============================
// * 贴图控制 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_DSS_updateSprite = Scene_Map.prototype.drill_DSS_updateSprite;
	
	
