//=============================================================================
// Drill_TitleParticle.js
//=============================================================================

/*:
 * @plugindesc [v2.3]        标题 - 多层标题粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子-%d"
 * @Drill_LE_parentKey "---粒子组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TPa_style_length"
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中放置一种或者多种粒子。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfParticle         系统-粒子核心★★v1.2及以上★★
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     由于在标题界面，插件的数据固定全局存储。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 3.要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-菜单界面）.docx"。
 * 全局存储：
 *   (1.该插件控制的显示/隐藏数据将存储在全局文件中。
 *      如果游戏中修改了显示/隐藏，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 *   (3.留意全局存储的机制，开游戏就生效。
 *      如果你遇到了图片设置后不显示/不变化的问题，要注意清除全部存档。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认粒子
 *
 * 背景1 资源-粒子
 * 背景2 资源-粒子
 * 背景3 资源-粒子
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 显示/隐藏
 * 你可以通过插件指令控制标题粒子的显示情况：
 * 
 * 插件指令：>标题粒子 : 粒子[3] : 显示
 * 插件指令：>标题粒子 : 粒子[4] : 隐藏
 * 插件指令：>标题粒子 : 隐藏全部
 * 
 * 1."粒子[3]"中的数字表示对应插件配置的编号，只能一个一个改。
 * 2.如果你想制作不同的风格的标题界面，可以先用多层装饰插件的配置一种风格，
 *   然后关闭"初始是否显示"，再配置下一种风格，
 *   并在游戏中使用显示/隐藏指令来进行切换，实现多种风格。
 * 3.注意，插件指令做出的改变是全局的。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，粒子的消耗为：【50.90ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于一次性设定数十个粒子移动，每个粒子都是独立的贴图。消耗是有的，
 *   但实际并不会太多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得你可以通过插件指令控制标题粒子的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了粒子遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * 旋转速度单位改为 角度/帧。
 * [v1.6]
 * 给插件添加了预加载功能。
 * [v1.7]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.8]
 * 加强了粒子效果的配置，包括添加双层粒子效果。
 * [v1.9]
 * 结合粒子核心，加强了粒子相关功能。
 * [v2.0]
 * 添加了粒子 彩虹化 功能。
 * [v2.1]
 * 整理改进了内部结构。
 * [v2.2]
 * 再次改进了结构。
 * [v2.3]
 * 翻新并兼容了新的粒子底层。
 *
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID,该插件的数据将存储到指定文件路径,具体看看"21.管理器 > 关于全局存储.docx"。
 * @default 1
 *
 * @param ---粒子组 1至20---
 * @default
 *
 * @param 粒子-1
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-2
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-3
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-4
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-5
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-6
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-7
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-8
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-9
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-10
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-11
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-12
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-13
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-14
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-15
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-16
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-17
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-18
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-19
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-20
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组21至40---
 * @default
 *
 * @param 粒子-21
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-22
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-23
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-24
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-25
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-26
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-27
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-28
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-29
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-30
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-31
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-32
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-33
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-34
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-35
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-36
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-37
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-38
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-39
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-40
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组41至60---
 * @default
 *
 * @param 粒子-41
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-42
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-43
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-44
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-45
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-46
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-47
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-48
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-49
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-50
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-51
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-52
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-53
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-54
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-55
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-56
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-57
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-58
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-59
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-60
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组61至80---
 * @default
 *
 * @param 粒子-61
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-62
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-63
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-64
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-65
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-66
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-67
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-68
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-69
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-70
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-71
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-72
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-73
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-74
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-75
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-76
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-77
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-78
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-79
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-80
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 * 
 */
/*~struct~TitleParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题粒子==
 * 
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
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)标题粒子
 * @require 1
 * @dir img/titles1/
 * @type file
 * 
 * @param 资源-粒子遮罩
 * @parent ---贴图---
 * @desc 粒子遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍去看看："1.系统 > 关于预加载.docx"。
 * @default false
 *
 * @param 图像-色调值
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 360
 * @desc 资源图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---贴图---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 此参数可以看看："0.基本定义 > 缩放模式.docx"。设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
 * @default false
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
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc 此参数可以看看："0.基本定义 > 混合模式.docx"。pixi的渲染混合模式。0-普通,1-发光,2-实色混合,3-浅色,4-叠加。
 * @default 0
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 粒子所属的菜单层级。
 * @default 菜单后面层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 8
 * 
 * 
 * @param ---粒子效果---
 * @desc 
 *
 * @param 粒子类型
 * @parent ---粒子效果---
 * @type select
 * @option 基础粒子
 * @value 基础粒子
 * @option 复杂粒子
 * @value 复杂粒子
 * @desc 基础粒子低消耗,复杂粒子高消耗,若游戏画面出现100以上该粒子,则建议用基础粒子。去看文档"1.系统 > 大家族-粒子效果.docx"。
 * @default 基础粒子
 *
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 1
 * @desc 界面中的粒子数量。
 * @default 10
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 180
 *
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
 *
 * @param 粒子出现模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机出现
 * @value 随机出现
 * @option 左侧出现
 * @value 左侧出现
 * @option 右侧出现
 * @value 右侧出现
 * @option 顶部出现
 * @value 顶部出现
 * @option 底部出现
 * @value 底部出现
 * @option 固定点范围出现
 * @value 固定点范围出现
 * @desc 随机出现指整个游戏窗口，左右顶底对应游戏窗口长方形的四个边的区域。
 * @default 随机出现
 *
 * @param 粒子固定点 X
 * @parent 粒子出现模式
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。x轴方向平移，单位像素。0为贴在窗口最左边。
 * @default 0
 *
 * @param 粒子固定点 Y
 * @parent 粒子出现模式
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 粒子固定点范围
 * @parent 粒子出现模式
 * @type number
 * @min 0
 * @desc 选择"固定点范围出现"时，以该点为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。
 * @default 120
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @desc 粒子出现后，朝向的方向模式设置。
 * @default 四周扩散(随机)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，碎片固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
 * @default 90.0
 * 
 * @param 粒子扇形朝向
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形的朝向角度。0朝右，90朝下，180朝左，270朝上。
 * @default 45.0
 * 
 * @param 粒子扇形角度
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形弧的角度数。
 * @default 30.0
 *
 * @param 粒子速度模式
 * @parent ---粒子效果---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @desc 粒子出现后，移动速度的模式设置。
 * @default 只初速度
 * 
 * @param 粒子初速度
 * @parent 粒子速度模式
 * @desc 粒子的基本速度，单位 像素/帧。
 * @default 0.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 *
 * @param 粒子透明度模式
 * @parent ---粒子效果---
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失
 *
 * @param 粒子自旋转模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机角度
 * @value 随机角度
 * @option 固定角度
 * @value 固定角度
 * @option 始终与朝向一致
 * @value 始终与朝向一致
 * @desc 粒子自旋转的模式。
 * @default 固定角度
 *
 * @param 粒子自旋转初始角度
 * @parent 粒子自旋转模式
 * @desc 粒子自旋转的初始角度，单位角度。
 * @default 0.0
 *
 * @param 粒子自旋转速度
 * @parent 粒子自旋转模式
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 *
 * @param 粒子缩放模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定缩放值
 * @value 固定缩放值
 * @option 缩放值+波动量
 * @value 缩放值+波动量
 * @desc 粒子出现后，缩放的模式设置。
 * @default 固定缩放值
 * 
 * @param 粒子缩放值
 * @parent 粒子缩放模式
 * @desc 粒子的缩放大小，1.0 表示 100%。
 * @default 1.0
 * 
 * @param 粒子缩放随机波动量
 * @parent 粒子缩放模式
 * @desc 粒子缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
 * 
 * 
 * @param ---双层效果---
 * @default 
 *
 * @param 是否开启双层效果
 * @parent ---双层效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 资源-第二层粒子
 * @parent ---双层效果---
 * @desc 第二层粒子的图片资源。
 * @default (需配置)标题第二层粒子
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 第二层粒子菜单层级
 * @parent ---双层效果---
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 第二层粒子所属的菜单层级。
 * @default 菜单后面层
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 7
 * 
 * 
 * @param ---随机种子---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---随机种子---
 * @type boolean
 * @on 固定
 * @off 关闭
 * @desc true - 固定，false - 关闭，固定随机种子，能使得所有该样式的粒子，随机轨迹都一模一样。
 * @default false
 * 
 * @param 固定随机种子
 * @parent 是否固定随机种子
 * @desc 固定的随机种子值，范围在0.0000至1.0000之间。
 * @default 0.20221002
 * 
 * 
 * @param ---直线拖尾效果---
 * @desc 
 *
 * @param 是否开启直线拖尾效果
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，拖尾贴图会根据粒子的方向进行旋转。
 * @default false
 *
 * @param 是否固定拖尾在粒子中心
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 固定在中心
 * @off 正右方锚点
 * @desc true - 固定在中心，false - 正右方锚点。
 * @default false
 *
 * @param 资源-直线拖尾
 * @parent ---直线拖尾效果---
 * @desc 粒子的图片资源。
 * @default (需配置)直线拖尾贴图
 * @require 1
 * @dir img/titles1/
 * @type file
 * 
 * 
 * @param ---彩虹化---
 * @desc 
 *
 * @param 是否开启彩虹化-粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-第二层粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个第二层粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-直线拖尾
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子的拖尾都会根据彩虹进行染色变化。
 * @default false
 * 
 * @param 彩虹化色彩数量
 * @parent ---彩虹化---
 * @type number
 * @min 1
 * @max 360
 * @desc 彩虹化色彩的数量，最大值为360。
 * @default 20
 *
 * @param 彩虹化是否锁定色调值
 * @parent ---彩虹化---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default false
 * 
 * @param 锁定的色调值列表
 * @parent 彩虹化是否锁定色调值
 * @type number[]
 * @min 0
 * @max 360
 * @desc 彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default []
 *
 */

 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		TPa（Title_Particle）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	标题界面
//		★性能测试消耗	2026/7/17：
//							》50.9ms（Drill_TPa_Sprite.update）8.6ms（Drill_TPa_Sprite.drill_sprite_updateTransform_Position）
//		★最坏情况		大量粒子被同时创建并播放。
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
//				->『变换特性-粒子贴图』
//					->只有显示隐藏指令
//			->☆全局存储
//			->☆标题层级
//			->☆预加载（标题）
//			
//			->☆贴图创建标记
//			->☆贴图控制
//				x->帧刷新 自动销毁
//			
//			->粒子控制器【Drill_TPa_Controller】
//			->粒子贴图【Drill_TPa_Sprite】
//			->粒子贴图（第二层）【Drill_TPa_SecSprite】
//		
//		
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 粒子控制器【Drill_TPa_Controller】
//			* 粒子贴图【Drill_TPa_Sprite】
//			* 粒子贴图（第二层）【Drill_TPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@    /@@@@@@  │
//			  │  /@@__  @@  /@@__  @@  /@@__  @@ │
//			  │ | @@  \ @@ | @@  \ @@ | @@  \__/ │
//			  │ | @@  | @@ | @@  | @@ | @@@@@@@  │
//			  │ | @@  | @@ | @@  | @@ | @@__  @@ │
//			  │ | @@  | @@ | @@  | @@ | @@  \ @@ │
//			  │ |  @@@@@@/ |  @@@@@@/ |  @@@@@@/ │
//			  │  \______/   \______/   \______/  │
//			  └──────────────────────────────────┘
//			2.标题与菜单不同的地方：
//				全局数据在 全局-读取 中进行初始化。
//				只作用于Scene_Title。
//				this._backgroundSprite要手动建立。
//				注释和资源文件夹变化。
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
	DrillUp.g_TPa_PluginTip_curName = "Drill_TitleParticle.js 标题-多层标题粒子";
	DrillUp.g_TPa_PluginTip_baseList = [
		"Drill_CoreOfParticle.js 系统-粒子核心",
		"Drill_CoreOfGlobalSave.js 管理器-全局存储核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_TPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_TPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_TPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_TPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_TPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_TPa_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_TPa_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_TPa_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_TPa_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_TPa_getPluginTip_NeedUpdate_Particle = function(){
		return "【" + DrillUp.g_TPa_PluginTip_curName + "】\n粒子核心插件版本过低，你需要更新 粒子核心 至少v1.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_TitleParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleParticle');
	
	//==============================
	// * 静态数据 - 粒子
	//				（~struct~TitleParticle）
	//==============================
	DrillUp.drill_TPa_particleInit = function( dataFrom ){
		var data = {};
		
		// > 预加载
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/titles1/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["菜单层级"] || "菜单后面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		
		
		// > B变换特性
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = 0;
		data['par_x'] = 0;
		data['par_y'] = 0;
		data['par_scale_x'] = 1.0;
		data['par_scale_y'] = 1.0;
		data['par_rotate'] = 0;
		
		// > C校验值（无）
		
		// > D指令叠加变化（无）
		
		// > E延迟指令（无）
		
		// > F周期指令（无）
		
		
		// > H粒子群弹道
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		data['par_birthMode'] = String( dataFrom["粒子出现模式"] || "随机出现");
		data['par_birthX'] = Number( dataFrom["粒子固定点 X"] || 0);
		data['par_birthY'] = Number( dataFrom["粒子固定点 Y"] || 0);
		data['par_birthRange'] = Number( dataFrom["粒子固定点范围"] || 120);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > I随机因子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > J粒子变化（无）
		
		// > K粒子重设（无）
		
		// > L粒子生命周期（无）
		
		
		// > O贴图加载（无）
		
		// > P直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/titles1/";
		
		// > Q双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_layerIndex'] = String( dataFrom["第二层粒子菜单层级"] || "菜单后面层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		
		// > 2A粒子类型
		data['parType_type'] = String( dataFrom["粒子类型"] || "基础粒子");
		
		// > 2B彩虹化
		data['rainbow_enable'] = String( dataFrom["是否开启彩虹化-粒子"] || "false") == "true";
		data['rainbow_enableSecond'] = String( dataFrom["是否开启彩虹化-第二层粒子"] || "false") == "true";
		data['rainbow_enableTrailing'] = String( dataFrom["是否开启彩虹化-直线拖尾"] || "false") == "true";
		data['rainbow_num'] = Number( dataFrom["彩虹化色彩数量"] || 20);
		data['rainbow_lockTint'] = String( dataFrom["彩虹化是否锁定色调值"] || "false") == "true";
		if( dataFrom["锁定的色调值列表"] != undefined &&
			dataFrom["锁定的色调值列表"] != "" ){
			data['rainbow_tintList'] = JSON.parse( dataFrom["锁定的色调值列表"] || [] );
		}else{
			data['rainbow_tintList'] = [];
		}
		
		// > 控制器 - 『控制器与贴图的样式-静态数据-指针初始化』
		Drill_TPa_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_TPa_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_TPa_scene_initialize.call(this);
		
		/*-----------------粒子------------------*/
		for( var i = 0; i < DrillUp.g_TPa_style.length; i++ ){
			var temp = DrillUp.g_TPa_style[i];
			if( temp != undefined ){
				DrillUp.g_TPa_style[i] = DrillUp.drill_TPa_particleInit( temp );
			}
		}
	}
	/*-----------------粒子------------------*/
	DrillUp.g_TPa_style_length = 80;
	DrillUp.g_TPa_style = [];
	for (var i = 0; i < DrillUp.g_TPa_style_length; i++) {
		if( DrillUp.parameters["粒子-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子-" + String(i+1) ] != "" ){
			DrillUp.g_TPa_style[i] = JSON.parse(DrillUp.parameters["粒子-" + String(i+1) ]);
		}else{
			DrillUp.g_TPa_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_TPa_dataFileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle &&
	Imported.Drill_CoreOfGlobalSave ){
	
	if( typeof(Drill_COPa_ComplexPar_Controller) == "undefined" ){	//（粒子核心版本检测）
		alert( DrillUp.drill_TPa_getPluginTip_NeedUpdate_Particle() );
	}


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_TPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_TPa_pluginCommand.call(this, command, args);
	this.drill_TPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_TPa_pluginCommand = function( command, args ){
	if( command === ">标题粒子" ){
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			if( temp1 == "默认粒子" ){
				b_id = 0;
			}else{
				temp1 = temp1.replace("粒子[","");
				temp1 = temp1.replace("]","");
				b_id = Number(temp1) - 1;
			}
			
			if( b_id >= 0 && type === "显示" ){
				DrillUp.global_TPa_visibleTank[b_id] = true;
				StorageManager.drill_TPa_saveData();
				return;
			}
			if( b_id >= 0 && type === "隐藏" ){
				DrillUp.global_TPa_visibleTank[b_id] = false;
				StorageManager.drill_TPa_saveData();
				return;
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TPa_visibleTank.length; i++){
					DrillUp.global_TPa_visibleTank[i] = false;
				}
				StorageManager.drill_TPa_saveData();
				return;
			}
		}
	}
};


//=============================================================================
// ** ☆全局存储
//=============================================================================
//==============================
// * 全局存储 - 最后继承1级
//
//			说明：	> 由于 静态数据 有最后继承，而此处要根据静态数据进行 全局存储 初始化，所以这里也要最后继承。
//==============================
var _drill_TPa_scene_initialize2 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_TPa_scene_initialize2.call(this);
	
	//==============================
	// * 『全局存储』 - 载入时检查数据 - 显示情况
	//==============================
	DrillUp.drill_TPa_gCheckData_visible = function(){
		for( var i = 0; i < DrillUp.g_TPa_style_length; i++ ){
			var temp_c = DrillUp.g_TPa_style[i];
			
			// > 指定数据为空时
			if( DrillUp.global_TPa_visibleTank[i] == null ){
				if( temp_c == undefined ){				//（无配置，跳过）
					DrillUp.global_TPa_visibleTank[i] = null;
				}else{									//（有配置，初始化默认）
					DrillUp.global_TPa_visibleTank[i] = temp_c['visible'];
				}
				
			// > 不为空则跳过检查
			}else{
				//（不操作）
			}
		}
	}
	//==============================
	// * 『全局存储』 - 载入
	//==============================
		var global_fileId = DrillUp.g_TPa_dataFileId;
		var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TPa" );  //『全局存储执行函数』
		
		// > 显示情况
		if( DrillUp.global_TPa_visibleTank == null ){			//（游戏没关时，不会为null)
			var data = global_data["global_visibleTank"];
			if( data == undefined ){ data = [] };
			DrillUp.global_TPa_visibleTank = data;
			DrillUp.drill_TPa_gCheckData_visible();				//（检查时自动赋新值）
		}
		
	//==============================
	// * 『全局存储』 - 存储
	//==============================
	StorageManager.drill_TPa_saveData = function(){
		var file_id = DrillUp.g_TPa_dataFileId;
		var data = {};
		data["global_visibleTank"] = DrillUp.global_TPa_visibleTank;
		this.drill_COGS_saveData( file_id, "TPa", data );  //『全局存储执行函数』
	};
}


//#############################################################################
// ** 【标准模块】标题层级 ☆标题层级
//#############################################################################
//##############################
// * 标题层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Title.prototype.drill_TPa_layerAddSprite = function( sprite, layer_index ){
    this.drill_TPa_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 标题层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从标题层级中移除。
//##############################
Scene_Title.prototype.drill_TPa_layerRemoveSprite = function( sprite ){
	this.drill_TPa_layerRemoveSprite_Private( sprite );
};
//##############################
// * 标题层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，标题层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Title.prototype.drill_TPa_sortByZIndex = function () {
    this.drill_TPa_sortByZIndex_Private();
};
//=============================================================================
// ** 标题层级（接口实现）
//=============================================================================
//==============================
// * 标题层级 - 创建
//==============================
var _drill_TPa_titleLayer_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	_drill_TPa_titleLayer_createBackground.call(this);
	
	// > 『菜单后面层-创建』（注意，Scene_Title 没有继承 Scene_MenuBase，提前创建）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
	
	// > 『菜单前面层-创建』
	if( this._foregroundSprite == undefined ){
		this._foregroundSprite = new Sprite();
	}
};
//==============================
// * 标题层级 - 帧刷新
//==============================
var _drill_TPa_titleLayer_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TPa_titleLayer_update.call(this);
	
	// > 菜单后面层（防止覆写报错）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
	}
	
	// > 菜单前面层（防止覆写报错）
	if( this._foregroundSprite == undefined ){
		this._foregroundSprite = new Sprite();
	}
	
	// > 『菜单前面层-顺序控制』
	if( this._foregroundSprite_hasAddChild == undefined ){
		this._foregroundSprite_hasAddChild = true;
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 标题层级 - 参数定义
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
			if( this.__drill_zIndex == undefined ){ return 20250701; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 标题层级 - 图片层级排序（私有）
//==============================
Scene_Title.prototype.drill_TPa_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题层级 - 去除贴图（私有）
//==============================
Scene_Title.prototype.drill_TPa_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 标题层级 - 添加贴图到层级（私有）
//==============================
Scene_Title.prototype.drill_TPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === "0" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === "1" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};


//=============================================================================
// ** ☆预加载（标题）
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					> 此处需要在进入标题界面前进行加载，不能用Game_Temp。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_TPa_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 最后继承1级
//
//			说明：	> 在这个时候执行预加载，且只执行一次。
//==============================
var _drill_TPa_scene_initialize3 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_TPa_scene_initialize3.call(this);
	
	// > 执行资源预加载
	DrillUp.drill_TPa_preloadInit();
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
DrillUp.drill_TPa_preloadInit = function(){
	this._drill_TPa_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_TPa_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_TPa_style.length; i++ ){
		var temp_data = DrillUp.g_TPa_style[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_TPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], data['tint'], data['smooth'], this._drill_TPa_cacheId ) 
		);
		this._drill_TPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], data['tint'], data['smooth'], this._drill_TPa_cacheId ) 
		);
		if( temp_data['second_enable'] == true ){
			this._drill_TPa_preloadTank.push( 
				ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['second_src_img'], data['tint'], data['smooth'], this._drill_TPa_cacheId ) 
			);
		}
		if( temp_data['trailing_enable'] == true ){
			this._drill_TPa_preloadTank.push( 
				ImageManager.reserveBitmap( temp_data['trailing_src_img_file'], temp_data['trailing_src_img'], data['tint'], data['smooth'], this._drill_TPa_cacheId ) 
			);
		}
	}
}



//=============================================================================
// ** ☆贴图创建标记
//			
//			说明：	> 此模块管理 创建标记，确保只创建一次。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图创建标记 - 初始化
//==============================
var _drill_TPa_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	
	// > 粒子初始化
	SceneManager._drill_TPa_created = false;	
   	this._drill_TPa_spriteTankOrg = [];
   	this._drill_TPa_spriteTankSec = [];
   	this._drill_TPa_controllerTank = [];
	
	// > 原函数
	_drill_TPa_createBackground.call(this);
};
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_TPa_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TPa_terminate.call(this);
	SceneManager._drill_TPa_created = false;	//（下次进入界面需重新创建）
};
//==============================
// * 贴图创建标记 - 帧刷新
//==============================
var _drill_TPa_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TPa_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_TPa_created != true ){
		this.drill_TPa_create();
	}
	// > 帧刷新
	if( SceneManager._drill_TPa_created == true ){
		this.drill_TPa_update();
	};
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 创建
//==============================
Scene_Title.prototype.drill_TPa_create = function() {	
	SceneManager._drill_TPa_created = true;
	
	// > 防止报错
	if( this._drill_TPa_spriteTankOrg == undefined ){
		this._drill_TPa_spriteTankOrg = [];
	}
	if( this._drill_TPa_spriteTankSec == undefined ){
		this._drill_TPa_spriteTankSec = [];
	}
	if( this._drill_TPa_controllerTank == undefined ){
		this._drill_TPa_controllerTank = [];
	}
	
	// > 配置的数据
	for( var i = 0; i < DrillUp.g_TPa_style.length; i++ ){
		var temp_data = DrillUp.g_TPa_style[i];
		if( temp_data == undefined ){ continue; }
			
		// > 创建控制器
		var temp_controller = new Drill_TPa_Controller( i );
		this._drill_TPa_controllerTank.push( temp_controller );
		
		// > 创建贴图
		var temp_sprite = new Drill_TPa_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 创建贴图（双层效果）
		if( temp_data['second_enable'] == true ){
			
			// > 双层效果 - 创建贴图
			var temp_secSprite = new Drill_TPa_SecSprite( temp_sprite );
			
			// > 双层效果 - 添加贴图到层级
			this._drill_TPa_spriteTankSec.push( temp_secSprite );
			this.drill_TPa_layerAddSprite( temp_secSprite, temp_data['second_layerIndex'] );
			
			// > 双层效果 - 粒子遮罩
			if( temp_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], temp_data['tint'], temp_data['smooth'] ));
				temp_secSprite.addChild(temp_mask);
				temp_secSprite.mask = temp_mask;		//『遮罩赋值』
			}
		}
		
		// > 添加贴图到层级
		this._drill_TPa_spriteTankOrg.push( temp_sprite );
		this.drill_TPa_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
		
		// > 粒子遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite( ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], temp_data['tint'], temp_data['smooth'] ) );
			temp_sprite.addChild(temp_mask);
			temp_sprite.mask = temp_mask;		//『遮罩赋值』
		}

	}
	this.drill_TPa_sortByZIndex();
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_Title.prototype.drill_TPa_update = function() {
	this.drill_TPa_updateController();		//帧刷新 - 控制器
	this.drill_TPa_updateAttr();			//帧刷新 - 基础特性
											//帧刷新 - 自动销毁（无）
}
//==============================
// * 贴图控制 - 帧刷新 控制器
//==============================
Scene_Title.prototype.drill_TPa_updateController = function(){
	for(var i = 0; i < this._drill_TPa_controllerTank.length; i++ ){
		var temp_controller = this._drill_TPa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 贴图控制 - 帧刷新 基础特性
//==============================
Scene_Title.prototype.drill_TPa_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < this._drill_TPa_spriteTankOrg.length; i++){
		var temp_sprite = this._drill_TPa_spriteTankOrg[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 菜单层级
		if( temp_sprite.layerIndex != temp_controller._drill_layerIndex ){
			temp_sprite.layerIndex =  temp_controller._drill_layerIndex;
			this.drill_TPa_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
			has_layerChange = true;
		}
		// > 基础特性 - 图片层级
		if( temp_sprite.zIndex != temp_controller._drill_zIndex ){
			temp_sprite.zIndex =  temp_controller._drill_zIndex;
			has_layerChange = true;
		}
	};
	
	// > 层级排序
	if( has_layerChange == true ){
		this.drill_TPa_sortByZIndex();
	}
}
//==============================
// * 贴图控制 - 帧刷新 自动销毁
//==============================
	//（无）



//=============================================================================
// ** 粒子控制器【Drill_TPa_Controller】
// **		
// **		作用域：	标题界面
// **		主功能：	定义一个专门控制动画粒子的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->控制器标记销毁
// **						->控制器是否销毁
// **					
// **					->A主体
// **					->B变换特性
// **					->C校验值
// **					->D指令叠加变化『变换特性-粒子贴图』
// **						x> 主体贴图-整体移动到
// **						> 主体贴图-整体透明度
// **						> 主体贴图-整体旋转
// **						> 粒子贴图组-粒子移动到
// **						> 粒子贴图组-粒子缩放X
// **						> 粒子贴图组-粒子缩放Y
// **						> 粒子贴图组-粒子旋转
// **					->E延迟指令
// **					->F周期指令
// **					
// **					->H粒子群弹道
// **					->I随机因子
// **					->J粒子变化
// **					->K粒子重设
// **					->L粒子生命周期
// **					
// **					->O贴图加载
// **					->P直线拖尾贴图
// **					->Q双层效果
// **					
// **					->2A粒子类型
// **					->2B彩虹化
// **					->2Z镜头参数
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_TPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_TPa_Controller.prototype = Object.create(Drill_COPa_ComplexPar_Controller.prototype);
Drill_TPa_Controller.prototype.constructor = Drill_TPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_TPa_Controller.prototype.initialize = function( data_id ){
    Drill_COPa_ComplexPar_Controller.prototype.initialize.call( this, data_id );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_TPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_ComplexPar_Controller.prototype.drill_controller_update.call( this );
}
//##############################
// * 控制器 - 重设数据【标准函数】
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//##############################
// * 控制器 - 暂停/继续【标准函数】
//##############################
// * 控制器 - 控制器标记销毁【标准函数】
//##############################
// * 控制器 - 控制器是否销毁【标准函数】
//##############################

//==============================
// * A主体 - 切换混合模式（开放函数）
//==============================
// * A主体 - 切换层级（开放函数）
//==============================
// * A主体 - 切换堆叠级（开放函数）
//==============================
// * A主体 - 还原混合模式（开放函数）
//==============================
// * A主体 - 还原层级（开放函数）
//==============================
// * A主体 - 还原堆叠级（开放函数）
//==============================


//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_TPa_notFindStyleAlertOnce = true;
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』获取数据指针【标准函数】（覆写）
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，所以只读静态数据。不要存储到存档中，也不要挂载到控制器身上。
//					> 该函数直接获取指针，可以放在帧刷新中使用。
//					> 该函数覆写了粒子核心的函数。
//##############################
Drill_TPa_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_TPa_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_TPa_notFindStyleAlertOnce == true ){
			DrillUp.g_TPa_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_TPa_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return {};
	}
	return cur_styleData;
};
//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_TPa_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_COPa_ComplexPar_Controller.drill_controller_initData( data );
	
	// > A主体 - 基础特性
	data['src_img_file'] = "img/titles1/";
	data['trailing_src_img_file'] = "img/titles1/";
	
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "菜单后面层" };					//A主体 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };									//A主体 - 图片层级（贴图用）
	
	// > B变换特性（无）
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	
	// > H粒子群弹道（无）
	
	// > I随机因子（无）
	
	// > J粒子变化
	data['par_holdingBirthPosition'] = false;													//J粒子变化 - 粒子是否滞留
	
	// > K粒子重设
	if( data['par_birthMode'] == undefined ){ data['par_birthMode'] = "随机出现" };				//K粒子重设 - 粒子出现模式
	if( data['par_birthX'] == undefined ){ data['par_birthX'] = 0 };							//K粒子重设 - 粒子固定点 X
	if( data['par_birthY'] == undefined ){ data['par_birthY'] = 0 };							//K粒子重设 - 粒子固定点 Y
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };					//K粒子重设 - 粒子出现范围
	
	// > L粒子生命周期
	data['par_lifeType'] = "跳过产生过程";
	
	
	// > O贴图加载（无）
	
	// > P直线拖尾贴图（无）
	
	// > Q双层效果
	if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "菜单后面层" };	//Q双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };						//Q双层效果 - 第二层粒子图片层级
	
	
	// > 2A粒子类型
	if( data['parType_type'] == undefined ){ data['parType_type'] = "基础粒子" };				//2A粒子类型 - 粒子类型
	
	// > 2B彩虹化（无）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_TPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChild.call( this );
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_TPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initAttr.call( this );
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_TPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * A主体 - 是否 显示/隐藏（覆写）
//==============================
Drill_TPa_Controller.prototype.drill_controller_isVisible = function(){
	if( DrillUp.global_TPa_visibleTank[ this._drill_data_id ] === false ){ return false; }	//（如果已经创建，则设置禁用后立即不显示）
	return true;	//（标题的 visibleTank 直接控制显示情况）
}
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_TPa_Controller.prototype.drill_controller_initChange = function(){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChange.call( this );
}
//##############################
// * B变换特性 - 数据最终变换值
//##############################
//==============================
// * C校验值 - 初始化子功能
//==============================
// * D指令叠加变化 - 初始化子功能
//==============================
// * E延迟指令 - 初始化子功能
//==============================
// * F周期指令 - 初始化子功能
//==============================

//==============================
// * H粒子群弹道 - 初始化子功能
//==============================
// * I随机因子 - 初始化子功能
//==============================
//==============================
// * J粒子变化 - 初始化子功能
//==============================
Drill_TPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//##############################
// * K粒子重设 - 执行重设 - 粒子平移【标准函数】（继承）
//
//			说明：	> 因此起始点为 一个矩形内随机出现 。
//##############################
Drill_TPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this.drill_data();
	var cur_iteration = this._drill_parList_randomIteration[i];
	var xx = 0;
	var yy = 0;
	var mww = this.drill_controller_getBitmapMargin_Width();
	var mhh = this.drill_controller_getBitmapMargin_Height();
	var ran1 = this.drill_controller_curRandom( cur_iteration*i +41*i );
	var ran2 = this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
	
	if( data['par_birthMode'] == "随机出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "左侧出现" ){
		xx = 0 - mww*0.5;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "右侧出现" ){
		xx = Graphics.boxWidth + mww*0.5;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "顶部出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = 0 - mhh*0.5;
	}
	if( data['par_birthMode'] == "底部出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = Graphics.boxHeight + mhh*0.5;
	}
	if( data['par_birthMode'] == "固定点范围出现" ){
		angle = 360 * ran1;
		radius = data['par_birthRange'] * ran2;
		xx = radius * Math.cos( angle *Math.PI/180 );
		yy = radius * Math.sin( angle *Math.PI/180 );
	}
	
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
}
//##############################
// * K粒子重设 - 执行重设 - 粒子缩放【标准函数】
//##############################
// * K粒子重设 - 执行重设 - 粒子透明度【标准函数】
//##############################
// * K粒子重设 - 执行重设 - 粒子旋转【标准函数】
//##############################
//==============================
// * L粒子生命周期 - 初始化子功能
//==============================
// * O贴图加载 - 初始化子功能
//==============================
// * P直线拖尾贴图 - 初始化子功能
//==============================
// * Q双层效果 - 初始化子功能
//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
// * 2B彩虹化 - 初始化子功能
//==============================



//=============================================================================
// ** 粒子贴图【Drill_TPa_Sprite】
// **
// **		作用域：	标题界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_TPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_TPa_Sprite.prototype = Object.create(Drill_COPa_ComplexPar_Sprite.prototype);
Drill_TPa_Sprite.prototype.constructor = Drill_TPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_TPa_Sprite.prototype.initialize = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_TPa_Sprite.prototype.update = function() {
	Drill_COPa_ComplexPar_Sprite.prototype.update.call(this);
	//if( this.drill_sprite_isReady() == false ){ return; }
	//if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
												//帧刷新 - （无）
}

//##############################
// * C对象绑定 - 设置控制器【标准函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initChild.call( this );
												//初始化子功能 - （无）
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_isReady = function(){
    return Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 粒子贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 粒子贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_TPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_TPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_TPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroySelf.call( this );
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_TPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initAttr.call( this );
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 粒子层（_drill_COPa_parSpriteLayer）
			- - - 粒子贴图组（_drill_COPa_parSpriteTank）
			- - 直线拖尾层（_drill_COPa_trailingSpriteLayer）
			- - - 直线拖尾贴图组（_drill_COPa_trailingSpriteTank）
	*/
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_TPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
};
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_TPa_Sprite.prototype.drill_sprite_initChange = function() {
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initChange.call( this );
};
//==============================
// * C对象绑定 - 初始化子功能
//==============================
// * D指令叠加变化-控制器用 - 初始化子功能
//==============================
// * E延迟指令 - 初始化子功能
//==============================
// * F周期指令 - 初始化子功能
//==============================

//==============================
// * H粒子群弹道 - 初始化子功能
//==============================
// * I随机因子 - 初始化子功能
//==============================
//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_TPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	
	
	// > 粒子过边界时（取余，不要重置粒子）（该函数执行次数非常多，尽量减少计算次数）
	var mww = this._drill_controller.drill_controller_getBitmapMargin_Width();
	var mhh = this._drill_controller.drill_controller_getBitmapMargin_Height();
	var ww = Graphics.boxWidth  + mww*2;
	var hh = Graphics.boxHeight + mhh*2;
	
	// > 边界取余（取余有负数值情况）
	this._drill_par_x %= ww;
	if( this._drill_par_x < 0 ){ this._drill_par_x += ww; }
	this._drill_par_x -= mww;
	this._drill_par_y %= hh;
	if( this._drill_par_y < 0 ){ this._drill_par_y += hh; }
	this._drill_par_y -= mhh;
}
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】
//##############################
//==============================
// * K粒子重设 - 初始化子功能
//==============================
// * L粒子生命周期 - 初始化子功能
//==============================
// * O贴图加载 - 初始化子功能
//==============================
// * P直线拖尾贴图 - 初始化子功能
//==============================
// * Q双层效果 - 初始化子功能
//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
// * 2B彩虹化 - 初始化子功能
//==============================



//=============================================================================
// ** 粒子贴图（第二层）【Drill_TPa_SecSprite】
// **
// **		作用域：	标题界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 第二层粒子与 父贴图 的 J粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_TPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_TPa_SecSprite.prototype = Object.create(Drill_COPa_ComplexPar_SecSprite.prototype);
Drill_TPa_SecSprite.prototype.constructor = Drill_TPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_TPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_ComplexPar_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_TPa_SecSprite.prototype.update = function() {
	Drill_COPa_ComplexPar_SecSprite.prototype.update.call(this);
}
//##############################
// * 第二层粒子 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_TPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isReady.call(this);
};
//##############################
// * 第二层粒子 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_TPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isOptimizationPassed.call(this);
};
//##############################
// * 第二层粒子 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_TPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isNeedDestroy.call(this);
};
//##############################
// * 第二层粒子 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_TPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_TPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_TPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_TPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_TPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};

//==============================
// * A贴图主体（第二层） - 初始化子功能
//==============================
Drill_TPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller.drill_data()['second_zIndex'];
};
//==============================
// * B变换特性（第二层） - 初始化子功能
//==============================
Drill_TPa_SecSprite.prototype.drill_spriteSec_initChange = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initChange.call( this );
};

//==============================
// * H粒子群弹道（第二层） - 初始化子功能
//==============================
// * I随机因子（第二层） - 初始化子功能
//==============================
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_TPa_SecSprite.prototype.drill_spriteSec_updateTransform_Position = function( i, time ) {
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_updateTransform_Position.call( this, i, time );
	
	
	// > 粒子过边界时（取余，不要重置粒子）（该函数执行次数非常多，尽量减少计算次数）
	var mww = this._drill_controller.drill_controller_getBitmapMargin_Width();
	var mhh = this._drill_controller.drill_controller_getBitmapMargin_Height();
	var ww = Graphics.boxWidth  + mww*2;
	var hh = Graphics.boxHeight + mhh*2;
	
	// > 边界取余（取余有负数值情况）
	this._drill_parSec_x %= ww;
	if( this._drill_parSec_x < 0 ){ this._drill_parSec_x += ww; }
	this._drill_parSec_x -= mww;
	this._drill_parSec_y %= hh;
	if( this._drill_parSec_y < 0 ){ this._drill_parSec_y += hh; }
	this._drill_parSec_y -= mhh;
}
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子缩放【标准函数】
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子透明度【标准函数】
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子旋转【标准函数】
//##############################
//==============================
// * K粒子重设（第二层） - 初始化子功能
//==============================
// * L粒子生命周期（第二层） - 初始化子功能
//==============================
// * O贴图加载（第二层） - 初始化子功能
//==============================
// * P直线拖尾贴图（第二层） - 初始化子功能
//==============================
// * Q双层效果（第二层） - 初始化子功能
//==============================
// * 2A粒子类型（第二层） - 初始化子功能
//==============================
// * 2B彩虹化（第二层） - 初始化子功能
//==============================



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleParticle = false;
		var pluginTip = DrillUp.drill_TPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


