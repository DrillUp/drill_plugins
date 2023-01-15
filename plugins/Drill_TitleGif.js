//=============================================================================
// Drill_TitleGIF.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        标题 - 多层标题GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "GIF-%d"
 * @Drill_LE_parentKey "---GIF组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TGi_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleGIF +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中放置一个或者多个GIF。
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
 *   (1.标题GIF可以设置 漂浮效果和呼吸效果。
 *      并且GIF可以像魔法圈一样自旋转。
 * 预加载：
 *   (1.该插件默认对所有资源预加载，也就是说开游戏时就加载资源。
 *      但注意，如果你一开始游戏就进入标题界面，那么这段加载的时间就不够了。
 *   (2.如果你配置的资源数量极其庞大（比如100多张资源），那么系统加载资源会
 *      消耗很多时间。由于加载是并行的，所以加载期间，资源图片会延迟显示。
 *   (3.若出现了资源延迟显示的情况，建议配置 启动界面 先加载单张图片，让玩
 *      家先看2秒的logo，延长预加载的时间。
 * 设计：
 *   (1.这里的GIF，必须拆散成多张png图片，然后配置在资源中。
 *      你可以在同一个标题里面加入非常多的GIF。
 *      结合 播放/GIF遮罩 制作出不同的动态效果。
 *   (2.你可以直接在标题中配置300多张图片作为GIF开场的高清视频，
 *      这可以弥补播放标题视频时视频画质很差的缺陷。
 *      虽然这是可行的，但还是建议压缩一下图片，因为图片太多非常占容量。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1 
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * GIF-1 资源-GIF
 * GIF-2 资源-GIF
 * GIF-3 资源-GIF
 * ……
 *
 * 所有素材都放在titles1文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题GIF的显示情况：
 * 
 * 插件指令：>标题GIF : GIF[2] : 显示
 * 插件指令：>标题GIF : GIF[2] : 隐藏
 * 插件指令：>标题GIF : 隐藏全部
 *
 * 1.数字表示GIF对应配置的编号。
 * 2.GIF没有默认，都是一个个贴在指定菜单中的。
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
 * 测试方法：   打开标题界面，进行性能测试。
 * 测试结果：   菜单界面中，gif的消耗为：【8.50ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.gif会持续播放、位移、旋转，由于数量并不多，所以消耗也不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令设置。
 * [v1.2]
 * 添加了漂浮、呼吸效果设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了GIF遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * 添加了GIF的3d效果设置。旋转速度单位改为 角度/帧。
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
 * @param ---GIF组 1至20---
 * @default
 *
 * @param GIF-1
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-2
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-3
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-4
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-5
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-6
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-7
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-8
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-9
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-10
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-11
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-12
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-13
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-14
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-15
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-16
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-17
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-18
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-19
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-20
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组21至40---
 * @default
 *
 * @param GIF-21
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-22
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-23
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-24
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-25
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-26
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-27
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-28
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-29
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-30
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-31
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-32
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-33
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-34
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-35
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-36
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-37
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-38
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-39
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-40
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组41至60---
 * @default
 *
 * @param GIF-41
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-42
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-43
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-44
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-45
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-46
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-47
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-48
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-49
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-50
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-51
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-52
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-53
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-54
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-55
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-56
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-57
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-58
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-59
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-60
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组61至80---
 * @default
 *
 * @param GIF-61
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-62
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-63
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-64
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-65
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-66
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-67
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-68
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-69
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-70
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-71
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-72
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-73
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-74
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-75
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-76
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-77
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-78
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-79
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-80
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 */
/*~struct~TitleGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题GIF==
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
 * @param 资源-GIF
 * @parent ---贴图---
 * @desc png图片资源组，多张构成gif。
 * @default ["(需配置)标题GIF"]
 * @require 1
 * @dir img/titles1/
 * @type file[]
 * 
 * @param 资源-GIF遮罩
 * @parent ---贴图---
 * @desc GIF遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-GIF Y
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
 * @default 0.0
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
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 缩放 X
 * @parent ---3d效果---
 * @desc GIF的缩放X值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent ---3d效果---
 * @desc GIF的缩放Y值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent ---3d效果---
 * @desc GIF的斜切X值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent ---3d效果---
 * @desc GIF的斜切Y值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param ---呼吸效果---
 * @desc 
 *
 * @param 是否使用呼吸效果
 * @parent ---呼吸效果---
 * @type boolean
 * @on 使用
 * @off 关闭
 * @desc true - 使用，false - 关闭。注意，开启后，y轴的中心会偏移至正下方。
 * @default false
 *
 * @param 呼吸周期
 * @parent ---呼吸效果---
 * @type number
 * @min 10
 * @desc 一次呼吸的周期时长，单位帧。（1秒60帧）
 * @default 70
 *
 * @param 呼吸幅度
 * @parent ---呼吸效果---
 * @type number
 * @min 0
 * @desc 呼吸时引起gif缩放的百分比值，10表示10%的图片大小幅度。
 * @default 8
 *
 * @param 呼吸类型
 * @parent ---呼吸效果---
 * @type select
 * @option 上下缩放
 * @value 上下缩放
 * @option 左右缩放
 * @value 左右缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 呼吸的类型。
 * @default 上下缩放
 * 
 * @param ---漂浮效果---
 * @desc 
 *
 * @param 是否使用漂浮效果
 * @parent ---漂浮效果---
 * @type boolean
 * @on 使用
 * @off 关闭
 * @desc true - 使用，false - 关闭。
 * @default false
 *
 * @param 漂浮速度
 * @parent ---漂浮效果---
 * @desc 漂浮的速度，可为小数负数。负数反向漂浮。
 * @default 1.0
 *
 * @param 漂浮幅度
 * @parent ---漂浮效果---
 * @type number
 * @min 0
 * @desc 漂浮的移动量，单位像素。
 * @default 30
 *
 * @param 漂浮类型
 * @parent ---漂浮效果---
 * @type select
 * @option 上下漂浮
 * @value 上下漂浮
 * @option 左右漂浮
 * @value 左右漂浮
 * @desc 漂浮的类型。
 * @default 上下漂浮
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TGi（Title_GIF）
//		临时全局变量	DrillUp.g_TGi_xxx
//		临时局部变量	this._drill_TGi_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TGi_visibleTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	8.50ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			标题GIF：
//				->菜单层级
//				->显示/隐藏
//				->呼吸效果/漂浮效果
//				->GIF遮罩
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
　　Imported.Drill_TitleGIF = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleGIF');
	
	//==============================
	// * 变量获取 - GIF
	//				（~struct~TitleGIF）
	//==============================
	DrillUp.drill_TGi_gifInit = function( dataFrom ) {
		var data = {};
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "false") == "true";
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['src_img'] = [];
		}
		data['src_bitmaps'] = [];
		data['src_img_mask'] = String( dataFrom["资源-GIF遮罩"] || "");
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['x'] = Number( dataFrom["平移-GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-GIF Y"] || 0);
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
		
		// > 呼吸效果
		data['breath'] = String( dataFrom["是否使用呼吸效果"] || "false") == "true";
		data['breath_period'] = Number( dataFrom["呼吸周期"] || 70);
		data['breath_spread'] = Number( dataFrom["呼吸幅度"] || 8);
		data['breath_type'] = String( dataFrom["呼吸类型"] || '上下缩放');
		
		// > 漂浮效果
		data['float'] = String( dataFrom["是否使用漂浮效果"] || "false") == "true";
		data['float_speed'] = Number( dataFrom["漂浮速度"] || 70);
		data['float_spread'] = Number( dataFrom["漂浮幅度"] || 8);
		data['float_type'] = String( dataFrom["漂浮类型"] || '上下漂浮');

		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_TGi_dataFileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);
	
	/*-----------------GIF------------------*/
	DrillUp.g_TGi_list_length = 80;
	DrillUp.g_TGi_list = [];
	for (var i = 0; i < DrillUp.g_TGi_list_length; i++) {
		if( DrillUp.parameters["GIF-" + String(i+1) ] != undefined &&
			DrillUp.parameters["GIF-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["GIF-" + String(i+1) ]);
			DrillUp.g_TGi_list[i] = DrillUp.drill_TGi_gifInit( temp );
			DrillUp.g_TGi_list[i]['inited'] = true;
		}else{
			DrillUp.g_TGi_list[i] = DrillUp.drill_TGi_gifInit( {} );
			DrillUp.g_TGi_list[i]['inited'] = false;
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
DrillUp.drill_TGi_gCheckData_visible = function(){
	for( var i = 0; i < DrillUp.g_TGi_list_length ; i++ ){
		var temp_c = DrillUp.g_TGi_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_TGi_visibleTank[i] == null ){
			if( temp_c['inited'] == false ){		//（无配置，跳过）
				DrillUp.global_TGi_visibleTank[i] = null;
			}else{									//（有配置，初始化默认）
				DrillUp.global_TGi_visibleTank[i] = temp_c['visible'];
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
	var global_fileId = DrillUp.g_TGi_dataFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TGi" );
	
	// > 显示情况
	if( DrillUp.global_TGi_visibleTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_visibleTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_TGi_visibleTank = data;
		DrillUp.drill_TGi_gCheckData_visible();				//（检查时自动赋新值）
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_TGi_saveData = function(){
	var file_id = DrillUp.g_TGi_dataFileId;
	var data = {};
	data["global_visibleTank"] = DrillUp.global_TGi_visibleTank;
	this.drill_COGS_saveData( file_id, "TGi", data );
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TGi_pluginCommand.call(this, command, args);
	if( command === ">标题GIF" || command === ">标题gif" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("GIF[","");
			temp1 = temp1.replace("gif[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var type = String(args[3]);
			if (type === "显示") {
				DrillUp.global_TGi_visibleTank[temp1] = true;
				StorageManager.drill_TGi_saveData();
			}
			if (type === "隐藏") {
				DrillUp.global_TGi_visibleTank[temp1] = false;
				StorageManager.drill_TGi_saveData();
			}
			/*	（呼吸改变中心锚点）
			if (type === '开启呼吸') {
				DrillUp._drill_TGi_spriteTank_breath[temp1] = true;
			}
			if (type === '关闭呼吸') {
				DrillUp._drill_TGi_spriteTank_breath[temp1] = false;
			}*/
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TGi_visibleTank.length; i++){
					DrillUp.global_TGi_visibleTank[i] = false;
				}
				StorageManager.drill_TGi_saveData();
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
var _drill_TGi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_TGi_temp_initialize.call(this);
	
    this._drill_TGi_preloadTank = [];			//bitmap容器
	for (var i = 0; i < DrillUp.g_TGi_list.length; i++) {
		var temp_data = DrillUp.g_TGi_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		var src_img_list = temp_data['src_img'];
		for(var j = 0; j < src_img_list.length ; j++){
			this._drill_TGi_preloadTank.push( ImageManager.loadTitle1( src_img_list[j] ) );	
		}
	}
}


//=============================================================================
// ** 标题
//=============================================================================
//==============================
// * 标题 - 创建GIF
//==============================
var _drill_TGi_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	// > GIF初始化
	SceneManager._drill_TGi_created = false;	
   	this._drill_TGi_spriteTank = [];
   	this._drill_TGi_dataTank = [];
	
	_drill_TGi_createBackground.call(this);		//与背景一同创建
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// * 标题 - 退出界面
//==============================
var _drill_TGi_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TGi_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_TGi_created = false;
};
//==============================
// * 标题 - 层级排序
//==============================
Scene_Title.prototype.drill_TGi_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题 - 帧刷新
//==============================
var _drill_TGi_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TGi_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_TGi_created ) {
		this.drill_TGi_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_TGi_created ){
		this.drill_TGi_update();
	}
};

//=============================================================================
// ** GIF
//=============================================================================
//==============================
// * GIF - 创建
//==============================
Scene_Title.prototype.drill_TGi_create = function() {	
	SceneManager._drill_TGi_created = true;
	
	if(!this._drill_TGi_spriteTank){
		this._drill_TGi_spriteTank = [];		//防止某些覆写的菜单报错
		this._drill_TGi_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	// > 配置的GIF
	for (var i = 0; i < DrillUp.g_TGi_list.length; i++) {
		var temp_data = DrillUp.g_TGi_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		// > GIF贴图
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
		for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
			temp_sprite_data['src_bitmaps'].push(ImageManager.loadTitle1(temp_sprite_data['src_img'][j]));
		}
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
		temp_sprite._time = 0;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.x = temp_sprite_data['x'];
		temp_sprite.y = temp_sprite_data['y'];
		temp_sprite._org_x = temp_sprite.x;
		temp_sprite._org_y = temp_sprite.y;
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.scale.x = temp_sprite_data['scale_x'];
		temp_sprite.scale.y = temp_sprite_data['scale_y'];
		temp_sprite.skew.x = temp_sprite_data['skew_x'];
		temp_sprite.skew.y = temp_sprite_data['skew_y'];
		temp_sprite.visible = DrillUp.global_TGi_visibleTank[i] || false;
		
		temp_sprite._breath = Math.random() * temp_sprite_data['breath_period'];
		temp_sprite._breath_dir = Math.floor(Math.random() * 2);
		temp_sprite._f_time = 0;
		this._drill_TGi_spriteTank.push(temp_sprite);
		this._drill_TGi_dataTank.push(temp_sprite_data);
		
		// > GIF父级
		var temp_layer = new Sprite();
		temp_layer.addChild(temp_sprite);
		temp_layer.zIndex = temp_sprite_data['zIndex'];
		
		// > GIF遮罩
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
	this.drill_TGi_sortByZIndex();
};


//==============================
// * GIF - 帧刷新
//==============================
Scene_Title.prototype.drill_TGi_update = function() {
	for (var i = 0; i < this._drill_TGi_spriteTank.length; i++) {
		var t_gif = this._drill_TGi_spriteTank[i];
		var t_gif_data = this._drill_TGi_dataTank[i];
		
		// > 播放gif
		t_gif._time += 1;
		var inter = this._drill_TGi_spriteTank[i]._time ;
		inter = inter / t_gif_data['interval'];
		inter = inter % t_gif_data['src_bitmaps'].length;
		if( t_gif_data['back_run'] ){
			inter = t_gif_data['src_bitmaps'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		t_gif.bitmap = t_gif_data['src_bitmaps'][inter];
		
		// > 旋转
		t_gif.rotation += t_gif_data['rotate'] /180*Math.PI;
		
		// > 呼吸效果
		if( t_gif_data['breath'] ){
			if( t_gif._breath_dir == 0 ){
				t_gif._breath += 2.1;
				if( t_gif._breath >= t_gif_data['breath_period'] ){
					t_gif._breath_dir = 1;
				}
			}
			if( t_gif._breath_dir == 1 ){
				t_gif._breath -= 1.3;
				if( t_gif._breath <= 0 ){
					t_gif._breath_dir = 0;
				}
			}
			t_gif.anchor.y = 1;
			if(t_gif_data['breath_type'] == '上下缩放' || t_gif_data['breath_type'] == '整体缩放'){
				t_gif.scale.y = 1.00 + (t_gif._breath/t_gif_data['breath_period'] * t_gif_data['breath_spread']/100 );
			}
			if(t_gif_data['breath_type'] == '左右缩放' || t_gif_data['breath_type'] == '整体缩放'){
				t_gif.scale.x = 1.00 + (t_gif._breath/t_gif_data['breath_period'] * t_gif_data['breath_spread']/100 );
			}
		}
		// > 漂浮效果
		if( t_gif_data['float'] ){
			t_gif._f_time += t_gif_data['float_speed'];
			if(t_gif._f_time > 360){ t_gif._f_time -= 360; }
			if(t_gif._f_time < 360){ t_gif._f_time += 360; }
			if(t_gif_data['float_type'] == '上下漂浮' ){
				t_gif.y = t_gif._org_y + Math.sin( t_gif._f_time / 180 * Math.PI ) * t_gif_data['float_spread'];
			}
			if(t_gif_data['float_type'] == '左右漂浮' ){
				t_gif.x = t_gif._org_x + Math.sin( t_gif._f_time / 180 * Math.PI ) * t_gif_data['float_spread'];
			}
		}
	};
};

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleGIF = false;
		alert(
			"【Drill_TitleGIF.js 标题 - 多层标题GIF】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"
		);
}


