//=============================================================================
// Drill_PictureAdditionalTextArea.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 图片附加的文本域
 * @author Drill_up
 * 
 * @Drill_LE_param "文本内容-%d"
 * @Drill_LE_parentKey "---文本内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PATA_context_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureAdditionalTextArea +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在图片上面写字，自定义添加文本内容。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只对图片有效。
 * 2.详细介绍可以去看看 "16.图片 > 关于图片附加的文本域.docx"。
 * 细节：
 *   (1.文本域的高宽就是图片的高宽，若文字过多或者字体太大是写不下图片的。
 *      你需要使用窗口字符来控制设计文本。
 *   (2.文本域的文本可以定时重绘，
 *      但前提是这些字符可能会在不同的时间变成其它文本，所以才需要刷新。
 * 逐个绘制：
 *   (1.该文本域 支持 消息输入字符。
 *   (2.该文本域的绘制方式为 逐个绘制，即在一段时间内持续绘制文本。
 *      持续绘制时如果重置文本，则会重新 逐个绘制 。
 *   (3.该插件只能通过 插件指令 来启用逐个绘制。
 * 设计：
 *   (1.你可以通过图片附加的文本域，来设计一张自定义卡片。
 *      并且卡片内的内容（比如数值）能够定时重绘。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置插件指令，给指定图片添加自定义文本：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>图片附加的文本域 : 图片[1] : 设置文本 : 文本[这是一段文本内容]
 * 插件指令：>图片附加的文本域 : 图片变量[21] : 设置文本 : 文本[这是一段文本内容]
 * 插件指令：>图片附加的文本域 : 批量图片[2,3] : 设置文本 : 文本[这是一段文本内容]
 * 插件指令：>图片附加的文本域 : 批量图片变量[21,22] : 设置文本 : 文本[这是一段文本内容]
 * 
 * 插件指令：>图片附加的文本域 : 图片[1] : 设置文本 : 文本[这是一段文本内容]
 * 插件指令：>图片附加的文本域 : 图片[1] : 设置文本 : 文本内容[1]
 * 插件指令：>图片附加的文本域 : 图片[1] : 设置文本 : 字符串[1]
 * 
 * 1.前面部分（图片[1]）和后面设置（设置文本 : 文本[这是一段文本内容]）可以随意组合。
 *   一共有4*3种组合方式。
 * 2.注意，文本域的高宽就是图片的高宽，若文字过多或者字体太大是写不下图片的。
 *   你需要使用窗口字符来控制设计文本。
 * 3.注意，必须先 "启用逐个绘制" 然后 "设置文本"。
 *   因为 "设置文本" 默认是一次性的，瞬间就能绘制出来，所以必须先 "启用逐个绘制"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 定时重绘
 * 你可以通过插件指令，设置定时重绘：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>图片附加的文本域 : 图片[1] : 开启并设置定时重绘 : 间隔时间[60]
 * 插件指令：>图片附加的文本域 : 图片[1] : 关闭定时重绘
 * 
 * 1.显示图片后，需要手动"开启并设置定时重绘"。
 *   删除图片会自动关闭定时重绘。
 *   注意，定时重绘 和 逐个绘制 功能相互不兼容，开启这个会自动关闭另一个功能。
 * 2.定时重绘主要用于 指代字符、表达式 的实时变化，比如"\v[21]"变量。
 *   注意，只有在不同的时间会变成其它文本的文本，才需要刷新。
 *   普通文本没必要刷新。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逐个绘制
 * 你可以通过插件指令，设置定时重绘：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>图片附加的文本域 : 图片[1] : 启用逐个绘制
 * 插件指令：>图片附加的文本域 : 图片[1] : 关闭逐个绘制
 * 
 * 插件指令：>图片附加的文本域 : 图片[1] : 修改逐个绘制设置 : 间隔时间[4]
 * 插件指令：>图片附加的文本域 : 图片[1] : 重新逐个绘制
 * 
 * 1.显示图片后，需要手动"启用逐个绘制"。
 *   删除图片会自动关闭逐个绘制。
 *   注意，定时重绘 和 逐个绘制 功能相互不兼容，开启这个会自动关闭另一个功能。
 * 2.最好先 "启用逐个绘制" 然后 "设置文本"。
 *   因为"设置文本"默认一次性绘制，执行后瞬间就出来了，所以最好先 "启用逐个绘制"。
 *   当然，你也可以把开启放后面，然后再执行一次 "重新逐个绘制"，也能实现一样的效果。
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
 * 时间复杂度： o(n^2)*o(图片数量)*o(贴图处理) 每帧
 * 测试方法：   在图片管理层，批量对10个图片，进行文本域添加并绘制。
 * 测试结果：   200个事件的地图中，平均消耗为：【121.00ms】
 *              100个事件的地图中，平均消耗为：【49.40ms】
 *               50个事件的地图中，平均消耗为：【31.01ms】
 * 测试方法2：  在战斗界面中进行文本域添加并绘制。
 * 测试结果2：  战斗界面中，平均消耗为：【32.15ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件在文本域绘制时会消耗比较多的性能，如果这时候地图界面的
 *   事件也多，那么插件的压力会很大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 默认逐个绘制间隔时间
 * @type number
 * @min 1
 * @desc 启用逐个绘制时，绘制的间隔时间，单位 帧/个。
 * @default 4
 * 
 * @param ----文本内容----
 * @default 
 *
 * @param ---文本内容组 1至20---
 * @parent ----文本内容----
 * @default 
 *
 * @param 文本内容-1
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-2
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-3
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-4
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-5
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-6
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-7
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-8
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-9
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-10
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-11
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-12
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-13
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-14
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-15
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-16
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-17
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-18
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-19
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-20
 * @parent ---文本内容组 1至20---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param ---文本内容组21至40---
 * @parent ----文本内容----
 * @default 
 *
 * @param 文本内容-21
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-22
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-23
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-24
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-25
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-26
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-27
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-28
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-29
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-30
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-31
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-32
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-33
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-34
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-35
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-36
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-37
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-38
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-39
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-40
 * @parent ---文本内容组21至40---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param ---文本内容组41至60---
 * @parent ----文本内容----
 * @default 
 *
 * @param 文本内容-41
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-42
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-43
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-44
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-45
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-46
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-47
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-48
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-49
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-50
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-51
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-52
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-53
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-54
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-55
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-56
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-57
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-58
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-59
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-60
 * @parent ---文本内容组41至60---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param ---文本内容组61至80---
 * @parent ----文本内容----
 * @default 
 *
 * @param 文本内容-61
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-62
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-63
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-64
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-65
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-66
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-67
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-68
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-69
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-70
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-71
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-72
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-73
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-74
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-75
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-76
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-77
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-78
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-79
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 * @param 文本内容-80
 * @parent ---文本内容组61至80---
 * @type note
 * @desc 图片中可添加的文本内容。
 * @default 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PATA（Picture_Additional_Text_Area）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(图片数量)*o(贴图处理) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2025/4/30：
//							》121.0ms（drill_PATA_rebuildContextBitmap）2.6ms（drill_PATA_removeContextBitmap）49.4ms（drill_PATA_refreshText）
//		★最坏情况		暂无
//		★备注			目前知道的是rebuild浪费的性能有点多，但还没优化。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆场景容器之图片贴图
//				>图片对象层 的图片贴图
//				>最顶层 的图片贴图
//				>图片层 的图片贴图
//
//			->☆图片的属性
//				->显示图片
//				->消除图片
//				->消除图片（command235）
//			->☆图片控制
//				->宽度变化时
//				->锚点变化时
//				->文本变化时
//				->定时刷新文本
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 图片资源切换脚本说明.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			暂无
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
	DrillUp.g_PATA_PluginTip_curName = "Drill_PictureAdditionalTextArea.js 图片-图片附加的文本域";
	DrillUp.g_PATA_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PATA_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PATA_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PATA_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PATA_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PATA_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PATA_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PATA_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureAdditionalTextArea = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureAdditionalTextArea');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PATA_timing_defaultInterval = String(DrillUp.parameters["默认逐个绘制间隔时间"] || "true") === "true";
	
	/*-----------------文本内容------------------*/
	DrillUp.g_PATA_context_list_length = 80;
	DrillUp.g_PATA_context_list = [];
	for( var i = 0; i < DrillUp.g_PATA_context_list_length ; i++ ){
		if( DrillUp.parameters["文本内容-" + String(i+1) ] != undefined &&
			DrillUp.parameters["文本内容-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["文本内容-" + String(i+1)] );
			DrillUp.g_PATA_context_list[i] = data;
		}else{
			DrillUp.g_PATA_context_list[i] = null;
		}
	};
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PATA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PATA_pluginCommand.call(this, command, args);
	this.drill_PATA_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PATA_pluginCommand = function( command, args ){
	if( command === ">图片附加的文本域" ){ 
		
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		var pic_ids = null;			// 图片ID组（图片对象本身没有id值）
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				pic_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PATA_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
					pic_ids.push( pic_id );
				}
			}
			else if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				pic_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PATA_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
					pic_ids.push( pic_id );
				}
			}
			else if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PATA_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
					pic_ids.push( pic_id );
			}
			else if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PATA_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
					pic_ids.push( pic_id );
			}
		}
		
		
		/*-----------------文本------------------*/
		if( pics != null && args.length >= 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "设置文本" ){
				if( temp1.indexOf("文本内容[") != -1 ){
					temp1 = temp1.replace("文本内容[","");
					temp1 = temp1.replace("]","");
					var str = String( DrillUp.g_PATA_context_list[ Number(temp1) -1 ] );
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PATA_setDataText( str );
					}
					return;
				}
				if( temp1.indexOf("字符串[") != -1 ){
					if( Imported.Drill_CoreOfString ){
						temp1 = temp1.replace("字符串[","");
						temp1 = temp1.replace("]","");
						var str = $gameStrings.value( Number(temp1) );
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PATA_setDataText( str );
						}
					}
					return;
				}
				if( temp1.indexOf("文本[") != -1 ){
					var data_str = "";		//（支持空格的多行结构）
					for(var m = 5; m < args.length ; m++ ){
						data_str += String(args[ m ]);
						if( m < args.length-1 ){  data_str += " "; }
					}
					if( data_str.indexOf("文本[") != -1 ){
						data_str = data_str.replace("文本[","");
						data_str = data_str.replace(/\]$/,"");	//（去掉末尾的]）
					}
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PATA_setDataText( data_str );
					}
					return;
				}
			}
		}
		
		/*-----------------定时重绘------------------*/
		if( pics != null && args.length >= 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "开启并设置定时重绘" ){
				temp1 = temp1.replace("间隔时间[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PATA_setDataTimedRedraw_Time( Number(temp1) );
					pics[k].drill_PATA_setDataTiming_Enabled( false );	//（功能互斥）
				}
			}
		}
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "关闭定时重绘" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PATA_clearDataTimedRedraw();
				}
			}
		}
		
		/*-----------------逐个绘制------------------*/
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "启用逐个绘制" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PATA_setDataTiming_Enabled( true );
					pics[k].drill_PATA_clearDataTimedRedraw();			//（功能互斥）
				}
			}
			if( type == "关闭逐个绘制" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PATA_setDataTiming_Enabled( false );
				}
			}
		}
		if( pics != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改逐个绘制设置" ){
				temp1 = temp1.replace("间隔时间[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PATA_setDataTiming_Interval( Number(temp1) );
				}
			}
		}
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "重新逐个绘制" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PATA_setDataTiming_Redraw();
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PATA_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PATA_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - STG兼容『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_PATA_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PATA_pluginCommand.call(this, command, args);
		this.drill_PATA_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PATA_pluginCommand = Game_Interpreter.prototype.drill_PATA_pluginCommand;
};


//#############################################################################
// ** 【标准模块】图片贴图容器 ☆场景容器之图片贴图
//#############################################################################
//##############################
// * 图片贴图容器 - 获取 - 全部图片贴图【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数返回所有图片贴图，包括被转移到 图片层、最顶层 的图片。
//##############################
Game_Temp.prototype.drill_PATA_getAllPictureSprite = function(){
	return this.drill_PATA_getAllPictureSprite_Private();
}
//##############################
// * 图片贴图容器 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//					> 注意，被转移到 图片层、最顶层 的图片，不在此容器内。
//##############################
Game_Temp.prototype.drill_PATA_getPictureSpriteTank = function(){
	return this.drill_PATA_getPictureSpriteTank_Private();
}
//##############################
// * 图片贴图容器 - 获取 - 根据图片ID【标准函数】
//			
//			参数：	> picture_id 数字（图片ID）
//			返回：	> 贴图对象       （图片贴图）
//          
//			说明：	> 图片id和图片贴图一一对应。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//					> 注意，图片数据类 与 图片贴图 为 多对一，图片数据类在战斗界面和地图界面分两类，而图片贴图不分。
//					> 此函数能获取到被转移到 图片层、最顶层 的图片。
//##############################
Game_Temp.prototype.drill_PATA_getPictureSpriteByPictureId = function( picture_id ){
	return this.drill_PATA_getPictureSpriteByPictureId_Private( picture_id );
}
//=============================================================================
// ** 场景容器之图片贴图（实现）
//=============================================================================
//==============================
// * 图片贴图容器 - 获取 - 容器（私有）
//==============================
Game_Temp.prototype.drill_PATA_getPictureSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	if( SceneManager._scene._spriteset._pictureContainer == undefined ){ return null; }
	return SceneManager._scene._spriteset._pictureContainer.children;
};
//==============================
// * 图片贴图容器 - 获取 - 最顶层容器（私有）
//==============================
Game_Temp.prototype.drill_PATA_getPictureSpriteTank_SenceTopArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._drill_SenceTopArea == undefined ){ return null; }
	return SceneManager._scene._drill_SenceTopArea.children;
};
//==============================
// * 图片贴图容器 - 获取 - 图片层容器（私有）
//==============================
Game_Temp.prototype.drill_PATA_getPictureSpriteTank_PicArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene instanceof Scene_Battle ){		//『多场景与图片-战斗界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_battlePicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_battlePicArea.children;
	}
	if( SceneManager._scene instanceof Scene_Map ){			//『多场景与图片-地图界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_mapPicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_mapPicArea.children;
	}
	return null;
};
//==============================
// * 图片贴图容器 - 获取 - 全部图片贴图（私有）
//==============================
Game_Temp.prototype.drill_PATA_getAllPictureSprite_Private = function(){
	var result_list = [];
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PATA_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PATA_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PATA_getPictureSpriteTank_PicArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	return result_list;
};
//==============================
// * 图片贴图容器 - 获取 - 根据图片ID（私有）
//==============================
Game_Temp.prototype.drill_PATA_getPictureSpriteByPictureId_Private = function( picture_id ){
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PATA_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				if( sprite._pictureId == picture_id ){
					return sprite;
				}
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PATA_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				if( sprite._pictureId == picture_id ){
					return sprite;
				}
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PATA_getPictureSpriteTank_PicArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				if( sprite._pictureId == picture_id ){
					return sprite;
				}
			}
		}
	}
	return null;
};



//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PATA_p_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PATA_text = undefined;				//（要放前面，不然会盖掉子类的设置）
	
	this._drill_PATA_timedRedraw_time = undefined;	//定时重绘
	
	this._drill_PATA_timing_enabled = undefined;	//逐个绘制 - 开关
	this._drill_PATA_timing_interval = undefined;	//逐个绘制 - 间隔时间
	this._drill_PATA_timing_needRedraw = undefined;	//逐个绘制 - 重新逐个绘制
	
	_drill_PATA_p_initialize.call(this);
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PATA_removeData = function(){
	this._drill_PATA_text = undefined;
	
	this._drill_PATA_timedRedraw_time = undefined;	//定时重绘
	
	this._drill_PATA_timing_enabled = undefined;	//逐个绘制 - 开关
	this._drill_PATA_timing_interval = undefined;	//逐个绘制 - 间隔时间
	this._drill_PATA_timing_needRedraw = undefined;	//逐个绘制 - 重新逐个绘制
}
//==============================
// * 图片的属性 - 设置文本（开放函数）
//
//			说明：	> 参数 text 可以被赋值为 null。
//==============================
Game_Picture.prototype.drill_PATA_setDataText = function( text ){
	this._drill_PATA_text = text;
}
//==============================
// * 图片的属性 - 设置定时重绘（开放函数）
//==============================
Game_Picture.prototype.drill_PATA_setDataTimedRedraw_Time = function( time ){
	this._drill_PATA_timedRedraw_time = time;
}
//==============================
// * 图片的属性 - 关闭定时重绘（开放函数）
//==============================
Game_Picture.prototype.drill_PATA_clearDataTimedRedraw = function(){
	this._drill_PATA_timedRedraw_time = undefined;
}
//==============================
// * 图片的属性 - 设置逐个绘制 开关（开放函数）
//==============================
Game_Picture.prototype.drill_PATA_setDataTiming_Enabled = function( enabled ){
	this._drill_PATA_timing_enabled = enabled;
}
//==============================
// * 图片的属性 - 设置逐个绘制 间隔时间（开放函数）
//==============================
Game_Picture.prototype.drill_PATA_setDataTiming_Interval = function( time ){
	this._drill_PATA_timing_interval = time;
}
//==============================
// * 图片的属性 - 设置逐个绘制 重新逐个绘制（开放函数）
//==============================
Game_Picture.prototype.drill_PATA_setDataTiming_Redraw = function(){
	this._drill_PATA_timing_needRedraw = true;
}

//==============================
// * 图片的属性 - 显示图片（对应函数showPicture）
//==============================
var _drill_PATA_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_PATA_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this.drill_PATA_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PATA_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PATA_p_erase.call( this );
	this.drill_PATA_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PATA_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PATA_removeData();		//（删除数据）
	}
	_drill_PATA_p_erasePicture.call( this, pictureId );
}


//=============================================================================
// ** ☆图片控制
//
//			说明：	> 此模块专门管理 图片 的图标变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片控制 - 贴图 初始化
//==============================
var _drill_PATA_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	
	// > 初始化（要放前面，因为 图片贴图initialize中会执行一次update）
	this._drill_PATA_sp_lastText = undefined;		//（要放前面，不然会盖掉子类的设置）
	this._drill_PATA_sp_lastWidth = 0;
	this._drill_PATA_sp_lastHeight = 0;
	this._drill_PATA_sp_curTime = 0;
	
	// > 原函数
	_drill_PATA_sp_initialize.call( this, pictureId );
}
//==============================
// * 图片控制 - 贴图 删除
//
//			说明：	> 贴图删除后，参数也要全部清空，不然会导致帧刷新监听时遗漏判定。
//==============================
Sprite_Picture.prototype.drill_PATA_removeContextBitmap = function(){
	this.removeChild( this._drill_PATA_sprite );
	this._drill_PATA_bitmap = null;
	this._drill_PATA_sprite = null;
}
//==============================
// * 图片控制 - 贴图 重建
//==============================
Sprite_Picture.prototype.drill_PATA_rebuildContextBitmap = function(){
	
	// > 删除贴图
	this.drill_PATA_removeContextBitmap();
	
	// > 画布
	var temp_bitmap = new Bitmap( this.bitmap.width, this.bitmap.height );
	this._drill_PATA_bitmap = temp_bitmap;
	
	// > 贴图
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.anchor.x = this.anchor.x;
	temp_sprite.anchor.y = this.anchor.y;
	this.addChild(temp_sprite);
	this._drill_PATA_sprite = temp_sprite;
}
//==============================
// * 图片控制 - 贴图 设置文本
//
//			说明：	> 由于一帧内 先刷新 图片的属性，后刷新 贴图的属性。
//					  所以修改图片的属性后，不能立即操作贴图bitmap。『图片bitmap切换慢一帧』
//					> 如果急用，外部函数需要考虑同时 数据赋值+贴图赋值。
//==============================
Sprite_Picture.prototype.drill_PATA_setContextBitmap = function( text ){
	this._drill_PATA_sp_lastText = text;
	this.drill_PATA_refreshText();		//（刷新文本）
}
//==============================
// * 图片控制 - 贴图 刷新文本
//==============================
Sprite_Picture.prototype.drill_PATA_refreshText = function(){
	var temp_sprite = this._drill_PATA_sprite;
	if( temp_sprite == undefined ){ return; }
	
	// > 参数准备 - 校验
	var temp_bitmap = this._drill_PATA_bitmap;
	if( temp_bitmap == undefined ){ return; }
	var org_text = this._drill_PATA_sp_lastText;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 清空画布（固定高宽只需要清空）
	temp_bitmap.clear();
	
	
    var picture = this.picture();
    if( picture != undefined ){
		
		if( picture._drill_PATA_timing_enabled != true ){
			
			// > 『字符主流程』 - DEBUG显示画布范围【窗口字符 - 窗口字符核心】
			//temp_bitmap.drill_COWC_debug_drawRect();
			
			// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
			temp_bitmap.drill_COWC_drawText( org_text, options );
			
		}else{
			
			// > 『字符逐个绘制流程』 - 设置计时器间隔【窗口字符 - 窗口字符核心】
			var interval = picture._drill_PATA_timing_interval;
			if( interval == undefined || interval < 1 ){
				interval = DrillUp.g_PATA_timing_defaultInterval;
			}
			temp_bitmap.drill_COWC_timing_setPerTick( interval );
				
			// > 『字符逐个绘制流程』 - 逐个绘制初始化【窗口字符 - 窗口字符核心】
			temp_bitmap.drill_COWC_timing_initDrawText( org_text, options );
			
		}
	}
	
	// > 『字符贴图流程』 - 刷新当前的字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_sprite.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * 图片控制 - 贴图 帧刷新
//==============================
var _drill_PATA_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_PATA_sp_update.call(this);
    var picture = this.picture();
    if( picture != undefined ){
		
		// > 宽度变化时
		if( this.bitmap != undefined ){
			if( this._drill_PATA_sp_lastWidth  != this.bitmap.width ||
				this._drill_PATA_sp_lastHeight != this.bitmap.height ){
				this._drill_PATA_sp_lastWidth  = this.bitmap.width;
				this._drill_PATA_sp_lastHeight = this.bitmap.height;
				this._drill_PATA_sp_curTime = 0;			//（刷新文本）
				
				if( this._drill_PATA_sp_lastWidth > 0 &&
					this._drill_PATA_sp_lastHeight > 0 ){	
					this.drill_PATA_rebuildContextBitmap();	//（重建贴图）
				}else{
					this.drill_PATA_removeContextBitmap();	//（删除贴图）
				}
			}
		}
		
		// > 锚点变化时
		if( this._drill_PATA_sprite != undefined ){
			if( this._drill_PATA_sprite.anchor.x != this.anchor.x ){
				this._drill_PATA_sprite.anchor.x  = this.anchor.x;
			}
			if( this._drill_PATA_sprite.anchor.y != this.anchor.y ){
				this._drill_PATA_sprite.anchor.y  = this.anchor.y;
			}
		}
		
		// > 文本变化时
		if( this._drill_PATA_sp_lastText != picture._drill_PATA_text ){
			this._drill_PATA_sp_lastText =  picture._drill_PATA_text;
			this.drill_PATA_setContextBitmap( picture._drill_PATA_text );	//（设置文本）
		}
		
		
		// > 『定时重绘』 时间+1
		this._drill_PATA_sp_curTime += 1;
		
		// > 『定时重绘』 执行
		if( picture._drill_PATA_timedRedraw_time != undefined ){			
			if( this._drill_PATA_sp_curTime % picture._drill_PATA_timedRedraw_time == 1 ){	//（不要在0值刷新，可能会浪费刷很多次）
				this.drill_PATA_refreshText();	//（刷新文本）
			}
		}
		
		
		// > 逐个绘制 - 重新逐个绘制
		if( picture._drill_PATA_timing_enabled == true ){
			if( picture._drill_PATA_timing_needRedraw != undefined ){			
				picture._drill_PATA_timing_needRedraw = undefined;
				this.drill_PATA_refreshText();	//（刷新文本）
			}
		}
		
		// > 逐个绘制 - 『字符逐个绘制流程』 - 逐个绘制帧刷新【窗口字符 - 窗口字符核心】
		if( picture._drill_PATA_timing_enabled == true ){
			if( this._drill_PATA_bitmap != undefined ){
				this._drill_PATA_bitmap.drill_COWC_timing_updateTick();
			}
		}
		
	// > 无数据时『图片数据根除时』
	}else{
		if( this._drill_PATA_sp_lastText != undefined ){
			this._drill_PATA_sp_lastText = undefined;
			this._drill_PATA_sp_lastWidth = 0;
			this._drill_PATA_sp_lastHeight = 0;
			this._drill_PATA_sp_curTime = 0;
			this.drill_PATA_removeContextBitmap();
		}
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureAdditionalTextArea = false;
		var pluginTip = DrillUp.drill_PATA_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


