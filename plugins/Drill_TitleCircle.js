//=============================================================================
// Drill_TitleCircle.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        标题 - 多层标题魔法圈
 * @author Drill_up
 * 
 * @Drill_LE_param "魔法圈-%d"
 * @Drill_LE_parentKey "---魔法圈组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TCi_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleCircle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中放置一个或者多个魔法圈。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     由于在标题界面，插件的数据固定全局存储。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 全局存储：
 *   (1.该插件控制的显示/隐藏数据将存储在全局文件中。
 *      如果游戏中修改了显示/隐藏，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 *   (3.留意全局存储的机制，开游戏就生效。
 *      如果你遇到了图片设置后不显示/不变化的问题，要注意清除全部存档。
 * 层级:
 *   (1.标题设置中有 菜单层级 和 图片层级。
 *      菜单层级分 菜单前面层和菜单后面层 ，对应 标题窗口元素 的前面和后面。
 *      相同 菜单层级 下，背景、魔法圈、gif都根据 图片层级 先后排序。
 * 效果：
 *   (1.魔法圈可以通过缩放/斜切设置简单类似3d的效果。
 * 预加载：
 *   (1.该插件默认对所有资源预加载，也就是说开游戏时就加载资源。
 *      但注意，如果你一开始游戏就进入标题界面，那么这段加载的时间就不够了。
 *   (2.如果你配置的资源数量极其庞大（比如100多张资源），那么系统加载资源会
 *      消耗很多时间。由于加载是并行的，所以加载期间，资源图片会延迟显示。
 *   (3.若出现了资源延迟显示的情况，建议配置 启动界面 先加载单张图片，让玩
 *      家先看2秒的logo，延长预加载的时间。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 魔法圈1 资源-魔法圈
 * 魔法圈2 资源-魔法圈
 * 魔法圈3 资源-魔法圈
 * ……
 *
 * 所有素材都放在titles1文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的魔法圈。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题魔法圈的显示情况：
 * 
 * 插件指令：>标题魔法圈 : 魔法圈[1] : 显示
 * 插件指令：>标题魔法圈 : 魔法圈[1] : 隐藏
 * 插件指令：>标题魔法圈 : 隐藏全部
 *
 * 1.数字表示GIF对应配置的编号。
 * 2.魔法圈没有默认，都是一个个贴在指定菜单中的。
 * 3.注意，插件指令做出的改变是全局的。
 * 
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
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，魔法圈的消耗为：【7.18ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.魔法圈相当于单张运动+自旋转的图片，消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了魔法圈3d效果处理的功能。
 * 使得你可以通过插件指令控制魔法圈的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了魔法圈遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * 旋转速度单位改为 角度/帧。
 * [v1.6]
 * 给插件添加了预加载功能。
 * [v1.7]
 * 大幅度修改了全局存储的文件存储结构。
 *
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID，该插件的数据将存储到指定的文件路径中，具体去 全局存储核心 看看。
 * @default 1
 *
 * @param ---魔法圈组 1至20---
 * @default
 *
 * @param 魔法圈-1
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-2
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-3
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-4
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-5
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-6
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-7
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-8
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-9
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-10
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-11
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-12
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-13
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-14
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-15
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-16
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-17
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-18
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-19
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-20
 * @parent ---魔法圈组 1至20---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组21至40---
 * @default
 *
 * @param 魔法圈-21
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-22
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-23
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-24
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-25
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-26
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-27
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-28
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-29
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-30
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-31
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-32
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-33
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-34
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-35
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-36
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-37
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-38
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-39
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-40
 * @parent ---魔法圈组21至40---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组41至60---
 * @default
 *
 * @param 魔法圈-41
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-42
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-43
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-44
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-45
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-46
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-47
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-48
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-49
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-50
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-51
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-52
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-53
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-54
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-55
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-56
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-57
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-58
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-59
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-60
 * @parent ---魔法圈组41至60---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组61至80---
 * @default
 *
 * @param 魔法圈-61
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-62
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-63
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-64
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-65
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-66
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-67
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-68
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-69
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-70
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-71
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-72
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-73
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-74
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-75
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-76
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-77
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-78
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-79
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-80
 * @parent ---魔法圈组61至80---
 * @type struct<TitleCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 */
/*~struct~TitleCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新标题魔法圈==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 初始是否显示
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-魔法圈
 * @parent ---贴图---
 * @desc 魔法圈的图片资源。
 * @default (需配置)标题魔法圈
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 资源-魔法圈遮罩
 * @parent ---贴图---
 * @desc 魔法圈遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-魔法圈 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-魔法圈 Y
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最上面。
 * @default 0
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
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
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 1.5
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 背景所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 缩放 X
 * @parent ---3d效果---
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent ---3d效果---
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent ---3d效果---
 * @desc 魔法圈的斜切X值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent ---3d效果---
 * @desc 魔法圈的斜切Y值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TCi（Title_Circle）
//		临时全局变量	DrillUp.g_TCi_xxx
//		临时局部变量	this._drill_TCi_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TCi_visibleTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	7.18ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			标题魔法圈：
//				->标题层级
//				->显示/隐藏
//				->魔法圈遮罩
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.标题与菜单不同的地方：
//				全局数据在 全局-读取 中进行初始化。
//				只作用于Scene_Title。
//				this._backgroundSprite要手动建立。
//				注释和资源文件夹变化。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleCircle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleCircle');
	
	//==============================
	// * 变量获取 - 魔法圈
	//				（~struct~TitleCircle）
	//==============================
	DrillUp.drill_TCi_circleInit = function( dataFrom ) {
		var data = {};
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-魔法圈"] || "");
		data['src_img_mask'] = String( dataFrom["资源-魔法圈遮罩"] || "");
		data['x'] = Number( dataFrom["平移-魔法圈 X"] || 0);
		data['y'] = Number( dataFrom["平移-魔法圈 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0.0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 3d效果
		data['scale_x'] = Number( dataFrom["缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["斜切 X"] || 0);
		data['skew_y'] = Number( dataFrom["斜切 Y"] || 0);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_TCi_dataFileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);
	
	/*-----------------魔法圈------------------*/
	DrillUp.g_TCi_list_length = 80;
	DrillUp.g_TCi_list = [];
	for (var i = 0; i < DrillUp.g_TCi_list_length; i++) {
		if( DrillUp.parameters["魔法圈-" + String(i+1) ] != undefined &&
			DrillUp.parameters["魔法圈-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["魔法圈-" + String(i+1) ]);
			DrillUp.g_TCi_list[i] = DrillUp.drill_TCi_circleInit( temp );
			DrillUp.g_TCi_list[i]['inited'] = true;
		}else{
			DrillUp.g_TCi_list[i] = DrillUp.drill_TCi_circleInit( {} );
			DrillUp.g_TCi_list[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave ){


//=============================================================================
// ** 全局存储
//=============================================================================
//==============================
// * 全局 - 检查数据 - 显示情况
//==============================
DrillUp.drill_TCi_gCheckData_visible = function(){
	for( var i = 0; i < DrillUp.g_TCi_list_length ; i++ ){
		var temp_c = DrillUp.g_TCi_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_TCi_visibleTank[i] == null ){
			if( temp_c['inited'] == false ){		//（无配置，跳过）
				DrillUp.global_TCi_visibleTank[i] = null;
			}else{									//（有配置，初始化默认）
				DrillUp.global_TCi_visibleTank[i] = temp_c['visible'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 全局 - 读取
//==============================
	var global_fileId = DrillUp.g_TCi_dataFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TCi" );
	
	// > 显示情况
	if( DrillUp.global_TCi_visibleTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_visibleTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_TCi_visibleTank = data;
		DrillUp.drill_TCi_gCheckData_visible();				//（检查时自动赋新值）
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_TCi_saveData = function(){
	var file_id = DrillUp.g_TCi_dataFileId;
	var data = {};
	data["global_visibleTank"] = DrillUp.global_TCi_visibleTank;
	this.drill_COGS_saveData( file_id, "TCi", data );
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TCi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TCi_pluginCommand.call(this, command, args);
	if( command === ">标题魔法圈" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("魔法圈[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var type = String(args[3]);
			if (type === "显示") {
				DrillUp.global_TCi_visibleTank[temp1] = true;
				StorageManager.drill_TCi_saveData();
			}
			if (type === "隐藏") {
				DrillUp.global_TCi_visibleTank[temp1] = false;
				StorageManager.drill_TCi_saveData();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TCi_visibleTank.length; i++){
					DrillUp.global_TCi_visibleTank[i] = false;
				}
				StorageManager.drill_TCi_saveData();
			}
		}
	}
};


//=============================================================================
// ** 资源预加载
//=============================================================================
//==============================
// ** 资源预加载 - 初始化
//==============================
var _drill_TCi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_TCi_temp_initialize.call(this);
	
    this._drill_TCi_preloadTank = [];			//bitmap容器
	for (var i = 0; i < DrillUp.g_TCi_list.length; i++) {
		var temp_data = DrillUp.g_TCi_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		this._drill_TCi_preloadTank.push( ImageManager.loadTitle1( temp_data['src_img'] ) );
	}
}


//=============================================================================
// ** 标题
//=============================================================================
//==============================
// * 标题 - 创建魔法圈
//==============================
var _drill_TCi_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	// > 魔法圈初始化
	SceneManager._drill_TCi_created = false;	
   	this._drill_TCi_spriteTank = [];
   	this._drill_TCi_spriteChildTank = [];
   	this._drill_TCi_dataTank = [];
	
	_drill_TCi_createBackground.call(this);
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// * 标题 - 退出界面
//==============================
var _drill_TCi_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TCi_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_TCi_created = false;
};
//==============================
// * 标题 - 层级排序
//==============================
Scene_Title.prototype.drill_TCi_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题 - 帧刷新
//==============================
var _drill_TCi_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TCi_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_TCi_created ) {
		this.drill_TCi_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_TCi_created ){
		this.drill_TCi_update();
	}
};

//=============================================================================
// ** 魔法圈
//=============================================================================
//==============================
// * 魔法圈 - 创建
//==============================
Scene_Title.prototype.drill_TCi_create = function() {	
	SceneManager._drill_TCi_created = true;
	
	if(!this._drill_TCi_spriteTank){
		this._drill_TCi_spriteTank = [];		//防止某些覆写的菜单报错
		this._drill_TCi_spriteChildTank = [];
		this._drill_TCi_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	// > 配置的魔法圈
	for (var i = 0; i < DrillUp.g_TCi_list.length; i++) {
		var temp_data = DrillUp.g_TCi_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
				
		// > 魔法圈贴图
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));		//深拷贝数据（杜绝引用造成的修改）
		
		var temp_sprite_bitmap = new Sprite(ImageManager.loadTitle1(temp_sprite_data['src_img']));
		temp_sprite_bitmap.anchor.x = 0.5;
		temp_sprite_bitmap.anchor.y = 0.5;
		this._drill_TCi_spriteChildTank.push(temp_sprite_bitmap);
		
		var temp_sprite = new Sprite();
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.x = temp_sprite_data['x'];
		temp_sprite.y = temp_sprite_data['y'];
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.scale.x = temp_sprite_data['scale_x'];
		temp_sprite.scale.y = temp_sprite_data['scale_y'];
		temp_sprite.skew.x = temp_sprite_data['skew_x'];
		temp_sprite.skew.y = temp_sprite_data['skew_y'];
		temp_sprite.visible = DrillUp.global_TCi_visibleTank[i] || false;
		temp_sprite.addChild(temp_sprite_bitmap);
		
		this._drill_TCi_spriteTank.push(temp_sprite);
		this._drill_TCi_dataTank.push(temp_sprite_data);
		
		// > 魔法圈父级
		var temp_layer = new Sprite();
		temp_layer.addChild(temp_sprite);
		temp_layer.zIndex = temp_sprite_data['zIndex'];
		
		// > 魔法圈遮罩
		if( temp_sprite_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite(ImageManager.loadTitle1(temp_sprite_data['src_img_mask']));
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;
		}
		if( temp_sprite_data['menu_index'] == 0 ){
			this._backgroundSprite.addChild(temp_layer);
		}else{
			this._foregroundSprite.addChild(temp_layer);
		}
	}
	this.drill_TCi_sortByZIndex();
};

//==============================
// * 魔法圈 - 帧刷新
//==============================
Scene_Title.prototype.drill_TCi_update = function() {
	for (var i = 0; i < this._drill_TCi_spriteChildTank.length; i++) {
		this._drill_TCi_spriteChildTank[i].rotation += this._drill_TCi_dataTank[i]['rotate'] /180*Math.PI;
	};
};

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleCircle = false;
		alert(
			"【Drill_TitleCircle.js 标题 - 多层标题魔法圈】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"
		);
}


