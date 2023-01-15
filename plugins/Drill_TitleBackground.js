//=============================================================================
// Drill_TitleBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        标题 - 多层标题背景
 * @author Drill_up
 * 
 * @Drill_LE_param "背景-%d"
 * @Drill_LE_parentKey "---背景组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TBa_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中放置一个或者多个背景。
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
 * 预加载：
 *   (1.该插件默认对所有资源预加载，也就是说开游戏时就加载资源。
 *      但注意，如果你一开始游戏就进入标题界面，那么这段加载的时间就不够了。
 *   (2.如果你配置的资源数量极其庞大（比如100多张资源），那么系统加载资源会
 *      消耗很多时间。由于加载是并行的，所以加载期间，资源图片会延迟显示。
 *   (3.若出现了资源延迟显示的情况，建议配置 启动界面 先加载单张图片，让玩
 *      家先看2秒的logo，延长预加载的时间。
 * 设计：
 *   (1.你可以在同一个菜单里面加入非常多的平铺背景。
 *      结合 速度/背景遮罩 制作出不同的动态效果。
 *      并且，你可以配置两种不同风格的背景，根据剧情的变化使用不同的标题背景。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1 
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 资源-默认背景
 * 
 * 背景1 资源-背景
 * 背景2 资源-背景
 * 背景3 资源-背景
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题背景的显示情况：
 * 
 * 插件指令：>标题背景 : 背景[3] : 显示
 * 插件指令：>标题背景 : 背景[4] : 隐藏
 * 插件指令：>标题背景 : 隐藏全部
 * 
 * 1.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   背景，然后使用显示/隐藏背景指令来进行风格切换。
 * 2.注意，插件指令做出的改变是全局的。
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
 * 测试结果：   菜单界面中，背景消耗为：【6.37ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.标题背景相当于单张运动的图片，消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得你可以通过插件指令控制标题背景的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了背景遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * [v1.6]
 * 给插件添加了预加载功能。
 * [v1.7]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.8]
 * 添加了背景的浮动效果设置。
 *
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID，该插件的数据将存储到指定的文件路径中，具体去 全局存储核心 看看。
 * @default 1
 *
 * @param ---背景组 1至20---
 * @default
 *
 * @param 背景-1
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-2
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-3
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-4
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-5
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-6
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-7
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-8
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-9
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-10
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-11
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-12
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-13
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-14
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-15
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-16
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-17
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-18
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-19
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-20
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组21至40---
 * @default
 *
 * @param 背景-21
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-22
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-23
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-24
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-25
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-26
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-27
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-28
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-29
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-30
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-31
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-32
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-33
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-34
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-35
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-36
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-37
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-38
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-39
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-40
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组41至60---
 * @default
 *
 * @param 背景-41
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-42
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-43
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-44
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-45
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-46
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-47
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-48
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-49
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-50
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-51
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-52
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-53
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-54
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-55
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-56
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-57
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-58
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-59
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-60
 * @parent ---背景组41至60---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组61至80---
 * @default
 *
 * @param 背景-61
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-62
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-63
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-64
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-65
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-66
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-67
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-68
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-69
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-70
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-71
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-72
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-73
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-74
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-75
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-76
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-77
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-78
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-79
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-80
 * @parent ---背景组61至80---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 */
/*~struct~TitleBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题背景==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 初始是否显示
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 资源-背景
 * @parent ---贴图---
 * @desc 背景的图片资源。
 * @default (需配置)标题背景
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 资源-背景遮罩
 * @parent ---贴图---
 * @desc 背景遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-背景 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
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
 * @param 背景X速度
 * @parent ---贴图---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 背景Y速度
 * @parent ---贴图---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 背景所在的层级位置，具体关系看看插件说明。
 * @default 0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 2
 * 
 * 
 * @param ---浮动效果---
 * @default 
 *
 * @param 是否开启浮动效果
 * @parent ---浮动效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 浮动模式
 * @parent ---浮动效果---
 * @type select
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @option 左上右下斜向浮动
 * @value 左上右下斜向浮动
 * @option 右上左下斜向浮动
 * @value 右上左下斜向浮动
 * @desc 来回浮动的模式。
 * @default 上下浮动
 * 
 * @param 浮动周期
 * @parent ---浮动效果---
 * @type number
 * @min 1
 * @desc 浮动一个来回的周期时间，单位帧。(1秒60帧)
 * @default 240
 *
 * @param 浮动偏移量
 * @parent ---浮动效果---
 * @type number
 * @min 1
 * @desc 浮动范围的偏移位置量，单位像素。
 * @default 20
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TBa（Title_Background）
//		临时全局变量	DrillUp.g_TBa_xxx
//		临时局部变量	this._drill_TBa_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TBa_visibleTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	4.78ms 6.37ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			标题背景：
//				->菜单层级
//				->显示/隐藏
//				->默认背景
//				->背景遮罩
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
　　Imported.Drill_TitleBackground = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleBackground');
	
	//==============================
	// * 变量获取 - 背景
	//				（~struct~TitleBackground）
	//==============================
	DrillUp.drill_TBa_backgroundInit = function( dataFrom ) {
		var data = {};
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_img_mask'] = String( dataFrom["资源-背景遮罩"] || "");
		data['x'] = Number( dataFrom["平移-GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-GIF Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['x_speed'] = Number( dataFrom["背景X速度"] || 0.0);
		data['y_speed'] = Number( dataFrom["背景Y速度"] || 0.0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 浮动效果
		data['float_enabled'] = String( dataFrom["是否开启浮动效果"] || "false") == "true";
		data['float_mode'] = String( dataFrom["浮动模式"] || "上下浮动");
		data['float_period'] = Number( dataFrom["浮动周期"] || 240);
		data['float_range'] = Number( dataFrom["浮动偏移量"] || 20);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_TBa_dataFileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);
	
	/*-----------------背景------------------*/
	DrillUp.g_TBa_list_length = 80;
	DrillUp.g_TBa_list = [];
	for (var i = 0; i < DrillUp.g_TBa_list_length; i++) {
		if( DrillUp.parameters["背景-" + String(i+1) ] != undefined &&
			DrillUp.parameters["背景-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["背景-" + String(i+1) ]);
			DrillUp.g_TBa_list[i] = DrillUp.drill_TBa_backgroundInit( temp );
			DrillUp.g_TBa_list[i]['inited'] = true;
		}else{
			DrillUp.g_TBa_list[i] = DrillUp.drill_TBa_backgroundInit( {} );
			DrillUp.g_TBa_list[i]['inited'] = false;
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
DrillUp.drill_TBa_gCheckData_visible = function(){
	for( var i = 0; i < DrillUp.g_TBa_list_length ; i++ ){
		var temp_c = DrillUp.g_TBa_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_TBa_visibleTank[i] == null ){
			if( temp_c['inited'] == false ){		//（无配置，跳过）
				DrillUp.global_TBa_visibleTank[i] = null;
			}else{									//（有配置，初始化默认）
				DrillUp.global_TBa_visibleTank[i] = temp_c['visible'];
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
	var global_fileId = DrillUp.g_TBa_dataFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TBa" );
	
	// > 显示情况
	if( DrillUp.global_TBa_visibleTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_visibleTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_TBa_visibleTank = data;
		DrillUp.drill_TBa_gCheckData_visible();				//（检查时自动赋新值）
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_TBa_saveData = function(){
	var file_id = DrillUp.g_TBa_dataFileId;
	var data = {};
	data["global_visibleTank"] = DrillUp.global_TBa_visibleTank;
	this.drill_COGS_saveData( file_id, "TBa", data );
};
	

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TBa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TBa_pluginCommand.call(this, command, args);
	if( command === ">标题背景" ){
		
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			if( temp1 == "默认背景" ){
				b_id = 0;
			}else{
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				b_id = Number(temp1) - 1;
			}
			
			if( b_id >= 0 && type === "显示" ){
				DrillUp.global_TBa_visibleTank[b_id] = true;
				StorageManager.drill_TBa_saveData();
			}
			if( b_id >= 0 && type === "隐藏" ){
				DrillUp.global_TBa_visibleTank[b_id] = false;
				StorageManager.drill_TBa_saveData();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i < DrillUp.global_TBa_visibleTank.length; i++){
					DrillUp.global_TBa_visibleTank[i] = false;
				}
				StorageManager.drill_TBa_saveData();
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
var _drill_TBa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_TBa_temp_initialize.call(this);
	
    this._drill_TBa_preloadTank = [];			//bitmap容器
	for (var i = 0; i < DrillUp.g_TBa_list.length; i++) {
		var temp_data = DrillUp.g_TBa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		this._drill_TBa_preloadTank.push( ImageManager.loadTitle1( temp_data['src_img'] ) );
	}
}


//=============================================================================
// ** 标题
//=============================================================================
//==============================
// * 标题 - 创建背景
//==============================
var _drill_TBa_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	// > 背景初始化
	SceneManager._drill_TBa_created = false;	
   	this._drill_TBa_spriteTank = [];
   	this._drill_TBa_dataTank = [];		//注意，该数组与DrillUp.g_TBa_list数组的下标不同步，要使用data
	
	_drill_TBa_createBackground.call(this);
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// * 标题 - 退出界面
//==============================
var _drill_TBa_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TBa_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_TBa_created = false;
};
//==============================
// * 标题 - 层级排序
//==============================
Scene_Title.prototype.drill_TBa_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题 - 帧刷新
//==============================
var _drill_TBa_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TBa_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_TBa_created ) {
		this.drill_TBa_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_TBa_created ){
		this.drill_TBa_update();
	};
};

//=============================================================================
// ** 背景
//=============================================================================
//==============================
// * 背景 - 创建
//==============================
Scene_Title.prototype.drill_TBa_create = function() {	
	SceneManager._drill_TBa_created = true;
	
	if(!this._drill_TBa_spriteTank){
		this._drill_TBa_spriteTank = [];	//防止某些覆写的菜单报错
		this._drill_TBa_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	// > 配置的背景
	for (var i = 0; i < DrillUp.g_TBa_list.length; i++) {
		var temp_data = DrillUp.g_TBa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		// > 背景贴图
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));		//深拷贝数据（杜绝引用造成的修改）
		var temp_sprite = new TilingSprite(ImageManager.loadTitle1(temp_sprite_data['src_img']));	//TilingSprite平铺图层
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);
		temp_sprite.origin.x = temp_sprite_data['x'];
		temp_sprite.origin.y = temp_sprite_data['y'];
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.visible = DrillUp.global_TBa_visibleTank[i] || false;
		temp_sprite['_time'] = 0;
			
		this._drill_TBa_spriteTank.push(temp_sprite);
		this._drill_TBa_dataTank.push(temp_sprite_data);
		
		// > 背景父级
		var temp_layer = new Sprite();
		temp_layer.addChild(temp_sprite);
		temp_layer.zIndex = temp_sprite_data['zIndex'];
		
		// > 背景遮罩
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
	this.drill_TBa_sortByZIndex();
};
//==============================
// * 背景 - 帧刷新
//==============================
Scene_Title.prototype.drill_TBa_update = function() {
	for (var i = 0; i < this._drill_TBa_spriteTank.length; i++) {
		var temp_sprite = this._drill_TBa_spriteTank[i];
		var temp_data = this._drill_TBa_dataTank[i];
		temp_sprite['_time'] += 1;
		var time = temp_sprite['_time'];
		
		// > 平移
		var xx = 0;
		var yy = 0;
		xx += temp_data['x'];
		yy += temp_data['y'];
		
		// > 背景速度
		xx += time * temp_data['x_speed'];
		yy += time * temp_data['y_speed'];
		
		// > 浮动效果
		if( temp_data['float_enabled'] == true ){
			if( temp_data['float_mode'] == "左右浮动" ){
				xx += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
			if( temp_data['float_mode'] == "上下浮动" ){
				yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
			if( temp_data['float_mode'] == "左上右下斜向浮动" ){
				xx += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
			if( temp_data['float_mode'] == "右上左下斜向浮动" ){
				xx -= temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
		}
		
		temp_sprite.origin.x = xx;
		temp_sprite.origin.y = yy;
	};
};

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleBackground = false;
		alert(
			"【Drill_TitleBackground.js 标题 - 多层标题背景】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"
		);
}

