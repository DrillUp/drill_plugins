//=============================================================================
// Drill_X_EventTextBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        行走图 - 事件漂浮文字的背景[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "背景样式-%d"
 * @Drill_LE_parentKey "---背景样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_XETB_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_EventTextBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置一个一直跟随行走图的漂浮背景。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_EventText             行走图-事件漂浮文字★★v1.9及以上★★
 *     需要该插件才能绘制背景。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效，放置在 地图上层 。
 * 2.具体可以去看看 "7.行走图 > 关于事件漂浮文字.docx"。
 * 细节：
 *   (1.漂浮背景在漂浮文字下方，图片层级与漂浮文字图片层级一样。
 *      （比如上层且图片层级大于100的地图背景，可以挡住漂浮文字+背景，反之则在下面）
 *   (2.你可以通过换事件页，来切换头顶的漂浮背景。
 *   (3.事件变形、位移时，漂浮背景会一直跟着事件，但仅仅是跟着。
 * 设计：
 *   (1.你可以单独设置事件的漂浮背景，设置文字为看不见的中文空格。
 *      并且，漂浮背景可以是GIF，可以作为头顶的广告牌用。
 *      （示例在 对话管理层 中被作为五毛特效展示。）
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 事件中，添加注释，在注释中填入以下指令：
 *（中英文冒号都可以，旧注释冒号左右不能有空格，新注释冒号左右都有一个空格。）
 *
 * 事件注释（旧）：事件漂浮背景:设置背景:1
 * 事件注释（旧）：事件漂浮背景:背景偏移:5:5
 * 事件注释（旧）：事件漂浮背景:去掉背景
 *
 * 事件注释：=>事件漂浮背景 : 设置背景 : 1
 * 事件注释：=>事件漂浮背景 : 背景偏移 : 5 : 5
 * 事件注释：=>事件漂浮背景 : 去掉背景
 *
 * 1.你可以单独设置漂浮背景，不设置文字。
 * 2.背景的偏移，与文字的偏移相互独立不影响，并且都是中心在事件头顶的位置。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__eventBackground （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__eventBackground文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 背景样式-1 资源-图片序列
 * 背景样式-2 资源-图片序列
 * 背景样式-3 资源-图片序列
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令强制修改事件的漂浮文字背景：
 * 
 * 插件指令：>事件漂浮背景 : 本事件 : 设置背景 : 2
 * 插件指令：>事件漂浮背景 : 事件[5] : 设置背景 : 2
 * 插件指令：>事件漂浮背景 : 事件变量[5] : 设置背景 : 2
 * 
 * 插件指令：>事件漂浮背景 : 本事件 : 设置背景 : 2
 * 插件指令：>事件漂浮背景 : 本事件 : 去掉背景
 * 插件指令：>事件漂浮背景 : 本事件 : 背景偏移 : 5 : -5
 * 插件指令：>事件漂浮背景 : 本事件 : 背景偏移(变量) : 5 : -5
 * 
 * 1.修改的设置离开当前地图后将失效。
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
 * 测试方法：   20个事件，添加单张图片的背景，分别放置测试。
 * 测试结果：   200个事件的地图中，消耗为：【41.39ms】
 *              100个事件的地图中，消耗为：【32.74ms】
 *               50个事件的地图中，消耗为：【28.17ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了最大值编辑的支持。
 * [v1.2]
 * 优化了内部结构。
 * [v1.3]
 * 更新了版本兼容结构。
 * 
 * 
 * 
 * @param ---背景样式组 1至20---
 * @default
 *
 * @param 背景样式-1
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-2
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-3
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-4
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-5
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-6
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-7
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-8
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-9
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-10
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-11
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-12
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-13
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-14
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-15
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-16
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-17
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-18
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-19
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-20
 * @parent ---背景样式组 1至20---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组21至40---
 * @default
 *
 * @param 背景样式-21
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-22
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-23
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-24
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-25
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-26
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-27
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-28
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-29
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-30
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-31
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-32
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-33
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-34
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-35
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-36
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-37
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-38
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-39
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-40
 * @parent ---背景样式组21至40---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组41至60---
 * @default
 *
 * @param 背景样式-41
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-42
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-43
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-44
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-45
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-46
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-47
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-48
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-49
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-50
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-51
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-52
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-53
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-54
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-55
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-56
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-57
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-58
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-59
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-60
 * @parent ---背景样式组41至60---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组61至80---
 * @default
 *
 * @param 背景样式-61
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-62
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-63
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-64
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-65
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-66
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-67
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-68
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-69
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-70
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-71
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-72
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-73
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-74
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-75
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-76
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-77
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-78
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-79
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-80
 * @parent ---背景样式组61至80---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组81至100---
 * @default
 *
 * @param 背景样式-81
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-82
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-83
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-84
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-85
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-86
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-87
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-88
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-89
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-90
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-91
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-92
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-93
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-94
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-95
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-96
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-97
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-98
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-99
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-100
 * @parent ---背景样式组81至100---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组101至120---
 * @default
 *
 * @param 背景样式-101
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-102
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-103
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-104
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-105
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-106
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-107
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-108
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-109
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-110
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-111
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-112
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-113
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-114
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-115
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-116
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-117
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-118
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-119
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-120
 * @parent ---背景样式组101至120---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组121至140---
 * @default
 *
 * @param 背景样式-121
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-122
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-123
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-124
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-125
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-126
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-127
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-128
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-129
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-130
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-131
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-132
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-133
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-134
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-135
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-136
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-137
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-138
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-139
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-140
 * @parent ---背景样式组121至140---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组141至160---
 * @default
 *
 * @param 背景样式-141
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-142
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-143
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-144
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-145
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-146
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-147
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-148
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-149
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-150
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-151
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-152
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-153
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-154
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-155
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-156
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-157
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-158
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-159
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-160
 * @parent ---背景样式组141至160---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组161至180---
 * @default
 *
 * @param 背景样式-161
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-162
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-163
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-164
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-165
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-166
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-167
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-168
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-169
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-170
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-171
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-172
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-173
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-174
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-175
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-176
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-177
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-178
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-179
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-180
 * @parent ---背景样式组161至180---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param ---背景样式组181至200---
 * @default
 *
 * @param 背景样式-181
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-182
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-183
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-184
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-185
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-186
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-187
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-188
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-189
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-190
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-191
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-192
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-193
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-194
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-195
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-196
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-197
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-198
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-199
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 * @param 背景样式-200
 * @parent ---背景样式组181至200---
 * @type struct<EventTextGIF>
 * @desc 背景样式的配置信息，可以为单张图片，也可以为GIF。
 * @default 
 *
 */
/*~struct~EventTextGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的背景样式==
 *
 * @param 资源-图片序列
 * @desc 背景可以设置为GIF，如果要为单张图片，只设置一个图片就可以。
 * @default ["(需配置)事件漂浮文字背景"]
 * @require 1
 * @dir img/Map__eventBackground/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XETB（X_Event_Text_Background）
//		临时全局变量	DrillUp.g_XETB_xxx
//		临时局部变量	this._drill_XETB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)	每帧
//		★性能测试因素	乱跑
//		★性能测试消耗	10.55ms ~ 6.22ms
//		★最坏情况		所有事件都有背景设置。
//		★备注			不确定实际的消耗量，还要看贴图的大小和数量，但是小图肯定不担心。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件漂浮文字背景：
//				->绑定控制器数据
//				->贴图GIF播放
//
//		★私有类如下：
//			* Drill_ET_Controller【漂浮文字控制器】
//			* Drill_ET_WindowSprite【漂浮文字贴图】
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.该插件附着在漂浮文字插件上。
//			  包含 _drill_XETB_layer层 和 背景自身。
//			2.背景是根据漂浮文字反向位移，才看起来背景和文字是两个东西。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_EventTextBackground = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_EventTextBackground');
	
	
	//==============================
	// * 变量获取 - 背景样式
	//				（~struct~EventTextGIF）
	//==============================
	DrillUp.drill_XETB_initEventTextGIF = function( dataFrom ) {
		var data = {};
		
		if( dataFrom["资源-图片序列"] != "" &&
			dataFrom["资源-图片序列"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-图片序列"] );
		}else{
			data['src_img'] = [];
		}
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		
		//data['rotate'] = Number( dataFrom["旋转速度"] || 0.0);
		//data['scale_x'] = Number( dataFrom["缩放 X"] || 1.0);
		//data['scale_y'] = Number( dataFrom["缩放 Y"] || 1.0);
		//data['skew_x'] = Number( dataFrom["斜切 X"] || 0);
		//data['skew_y'] = Number( dataFrom["斜切 Y"] || 0);
		return data;
	}
	
	/*-----------------背景样式------------------*/
	DrillUp.g_XETB_list_length = 200;
	DrillUp.g_XETB_list = [];
	for (var i = 0; i < DrillUp.g_XETB_list_length; i++) {
		if( DrillUp.parameters["背景样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["背景样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["背景样式-" + String(i+1) ]);
			DrillUp.g_XETB_list[i] = DrillUp.drill_XETB_initEventTextGIF( temp );
			DrillUp.g_XETB_list[i]['inited'] = true;
		}else{
			DrillUp.g_XETB_list[i] = DrillUp.drill_XETB_initEventTextGIF( {} );
			DrillUp.g_XETB_list[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventText ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapEventBackground = function(filename) {
    return this.loadBitmap('img/Map__eventBackground/', filename, 0, true);
};
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XETB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XETB_pluginCommand.call(this, command, args);
	if( command === ">事件漂浮背景" ){ 	//	>事件漂浮背景 : 本事件 : 设置背景 : 2
		
		/*-----------------对象组获取------------------*/
		var e_id = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "本事件" ){
				var e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				var e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				var e_id = $gameVariables.value(Number(temp1));
			}
		}
		
		/*-----------------指令设置------------------*/
		if( e_id != null && args.length == 6 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "设置背景" ){
				if( $gameMap.drill_XETB_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETB_setBackgroundId( Number(temp3)-1 );
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去掉背景" ){
				if( $gameMap.drill_XETB_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETB_setBackgroundId( -1 );
			}
		}
		if( e_id != null && args.length == 8 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			if( type == "背景偏移" ){
				if( $gameMap.drill_XETB_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETB_setOffset( Number(temp3),Number(temp4) );
			}
			if( type == "背景偏移(变量)" ){
				if( $gameMap.drill_XETB_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETB_setOffset( 
					$gameVariables.value(Number(temp3)),
					$gameVariables.value(Number(temp4)) 
				);
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_XETB_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_X_EventTextBackground.js 行走图 - 事件漂浮文字的背景[扩展]】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_XETB_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_XETB_c_setupPageSettings.call(this);
	this.drill_XETB_refreshBackground();
}
Game_Event.prototype.drill_XETB_refreshBackground = function() {
	
	// > 默认情况下，归位并置空
	if( this._drill_ET_controller != null ){
		this._drill_ET_controller.drill_XETB_setBackgroundId( -1 );
		this._drill_ET_controller.drill_XETB_setOffset( 0,0 );
	}
	
	var page = this.page();
    if( page ){
		this.list().forEach(function(l){
			if( l.code === 108 ){
				var l_str = l.parameters[0];
				
				/*-----------------注释------------------*/
				var args = l_str.split(/[ ]+/);	
				var command = args.shift();
				if( command == "=>事件漂浮背景" ){
					if( args.length == 2 ){
						var type = String(args[1]);
						if( type == "去掉背景" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETB_setBackgroundId( -1 );
						}
					}
					if( args.length == 4 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						if( type == "设置背景" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETB_setBackgroundId( Number(temp1)-1 );
						}
					}
					if( args.length == 6 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "背景偏移" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETB_setOffset( Number(temp1),Number(temp2) );
						}
					}
				};  
				
				/*-----------------旧注释------------------*/
				var comment = l_str.split(/[:：]/);
				if( comment[0].toLowerCase() === "事件漂浮背景"){
					if( comment.length == 2 && comment[1].toLowerCase() == "去掉背景" ){
						this.drill_ET_createController();
						this._drill_ET_controller.drill_XETB_setBackgroundId( -1 );
					}
					if( comment.length == 3 && comment[1].toLowerCase() == "设置背景" ){
						this.drill_ET_createController();
						this._drill_ET_controller.drill_XETB_setBackgroundId( Number(comment[2])-1 );
					}
					if( comment.length == 4 && comment[1].toLowerCase() == "背景偏移" ){
						this.drill_ET_createController();
						this._drill_ET_controller.drill_XETB_setOffset( Number(comment[2]),Number(comment[3]) );
					}
				};
			};
		}, this);
    }
}

//=============================================================================
// ** 漂浮文字控制器（继承）
//=============================================================================
//==============================
// * 控制器 - 初始化（继承）
//==============================
var _drill_XETB_ET_c_initData = Drill_ET_Controller.prototype.drill_initData;
Drill_ET_Controller.prototype.drill_initData = function(){
	_drill_XETB_ET_c_initData.call(this);
	var data = this._drill_data;
	
	// > 默认值
	if( data['background_id'] == undefined ){ data['background_id'] = -1 };		//背景ID
	if( data['background_x'] == undefined ){ data['background_x'] = 0 };		//背景偏移x
	if( data['background_y'] == undefined ){ data['background_y'] = 0 };		//背景偏移y
}
//==============================
// * 控制器 - 私有初始化（继承）
//==============================
var _drill_XETB_ET_c_initPrivateData = Drill_ET_Controller.prototype.drill_initPrivateData;
Drill_ET_Controller.prototype.drill_initPrivateData = function(){
	_drill_XETB_ET_c_initPrivateData.call(this);
	var data = this._drill_data;
	
	// > 初始化 - 私有变量
	this._drill_XETB_curTime = 0;
}
//==============================
// * 控制器 - 设置偏移（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETB_setBackgroundId = function( id ){
	var data = this._drill_data;
	data['background_id'] = id;
}
//==============================
// * 控制器 - 设置偏移（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETB_setOffset = function( x, y ){
	var data = this._drill_data;
	data['background_x'] = x;
	data['background_y'] = y;
}
//==============================
// * 控制器 - 帧刷新（继承）
//==============================
var _drill_XETB_ET_c_update = Drill_ET_Controller.prototype.drill_ET_update;
Drill_ET_Controller.prototype.drill_ET_update = function(){
	_drill_XETB_ET_c_update.call(this);
	var data = this._drill_data;
	if( data['background_id'] == -1 ){ return; }
	
	// > 时间+1
	this._drill_XETB_curTime += 1;
}


//=============================================================================
// ** 漂浮文字贴图（继承）
//=============================================================================
//==============================
// * 文字贴图 - 初始化（继承）
//==============================
var _drill_XETB_ET_sp_initialize = Drill_ET_WindowSprite.prototype.initialize;
Drill_ET_WindowSprite.prototype.initialize = function( obj_event ){
    _drill_XETB_ET_sp_initialize.call( this,obj_event );
	
	// > 背景层
	this._drill_XETB_layer = new Sprite();
	this.addChildAt( this._drill_XETB_layer, 0 );
	
	// > 背景贴图
	this._drill_XETB_curBackground = null;		//当前背景
	this._drill_XETB_curIndex = -1;				//当前背景样式
};
//==============================
// * 文字贴图 - 销毁（继承）
//==============================
var _drill_XETB_ET_sp_destroy_Private = Drill_ET_WindowSprite.prototype.drill_ET_destroy_Private;
Drill_ET_WindowSprite.prototype.drill_ET_destroy_Private = function(){
    _drill_XETB_ET_sp_destroy_Private.call( this );
	
	// > 移除层
	this.removeChild(this._drill_XETB_layer);
	
	// > 断开连接
	this._drill_XETB_layer = null;
	this._drill_XETB_curBackground = null;
}

//==============================
// * 文字贴图 - 帧刷新
//==============================
var _drill_XETB_ET_sp_update = Drill_ET_WindowSprite.prototype.update;
Drill_ET_WindowSprite.prototype.update = function() {
	_drill_XETB_ET_sp_update.call(this);
	if( this._drill_controller == undefined ){ return; }
	this.drill_XETB_updateRebuild();		//帧刷新 - 重建背景监听
	if( this._drill_XETB_curBackground == undefined ){ return; }
	this.drill_XETB_updateGIF();			//帧刷新 - 播放GIF
	this.drill_XETB_updatePosition();		//帧刷新 - 背景位置
}
//==============================
// * 帧刷新 - 重建背景监听
//==============================
Drill_ET_WindowSprite.prototype.drill_XETB_updateRebuild = function() {
	var d_data = this._drill_controller._drill_data;
	
	// > 背景样式不一样时，切换背景
	if( this._drill_XETB_curIndex != d_data['background_id'] ){
		this._drill_XETB_curIndex = d_data['background_id'];
		this.drill_XETB_rebuildBackground();
	}
}
//==============================
// * 文字贴图 - 重建背景
//==============================
Drill_ET_WindowSprite.prototype.drill_XETB_rebuildBackground = function() {
	var index = this._drill_XETB_curIndex;
	
	// > 移除当前背景
	if( this._drill_XETB_curBackground != null ){
		this._drill_XETB_layer.removeChild(this._drill_XETB_curBackground);
		this._drill_XETB_curBackground = null;
	}
	if( index == -1 ){ return; }
	
	// > 资源初始化
	var s_data = DrillUp.g_XETB_list[ index ];
	this._drill_XETB_bitmapTank = [];
	for(var j = 0; j < s_data['src_img'].length; j++){
		var temp_bitmap = ImageManager.load_MapEventBackground( s_data['src_img'][j] );
		this._drill_XETB_bitmapTank.push( temp_bitmap );
	}
	
	// > 创建背景贴图
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = 0;
	temp_sprite.y = 0;
	temp_sprite.bitmap = this._drill_XETB_bitmapTank[0];
	temp_sprite.opacity = s_data['opacity'];
	temp_sprite.blendMode = s_data['blendMode'];
	
	this._drill_XETB_curBackground = temp_sprite;
	this._drill_XETB_layer.addChild(temp_sprite);
}
//==============================
// * 帧刷新 - 播放GIF
//==============================
Drill_ET_WindowSprite.prototype.drill_XETB_updateGIF = function() {
	var index = this._drill_XETB_curIndex;
	if( index == -1 ){ return; }
	var s_data = DrillUp.g_XETB_list[ index ];
	
	// > 播放GIF
	var inter = this._drill_controller._drill_XETB_curTime;
	inter = inter / s_data['interval'];
	inter = inter % this._drill_XETB_bitmapTank.length;
	if( s_data['back_run'] == true ){
		inter = this._drill_XETB_bitmapTank.length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_XETB_curBackground.bitmap = this._drill_XETB_bitmapTank[inter];
}
//==============================
// * 帧刷新 - 背景位置
//==============================
Drill_ET_WindowSprite.prototype.drill_XETB_updatePosition = function() {
	var d_data = this._drill_controller._drill_data;
	
	// > 位置
	var xx = 0;
	var yy = 0;
	xx += d_data['background_x'];
	yy += d_data['background_y'];
	xx += this.width/2;		//（窗口位置居中）
	yy += this.height/2;
	this._drill_XETB_curBackground.x = xx;
	this._drill_XETB_curBackground.y = yy;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_EventTextBackground = false;
		alert(
			"【Drill_X_EventTextBackground.js 行走图 - 事件漂浮文字的背景[扩展]】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventText 行走图-事件漂浮文字"
		);
}




