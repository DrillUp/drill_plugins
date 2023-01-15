//=============================================================================
// Drill_TitleParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        标题 - 多层标题粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子-%d"
 * @Drill_LE_parentKey "---粒子组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TPa_list_length"
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
 * ----可选设定
 * 你可以通过插件指令控制标题粒子的显示情况：
 * 
 * 插件指令：>标题粒子 : 粒子[3] : 显示
 * 插件指令：>标题粒子 : 粒子[4] : 隐藏
 * 插件指令：>标题粒子 : 隐藏全部
 * 
 * 1.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   粒子，然后使用显示/隐藏粒子指令来进行风格切换。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，粒子的消耗为：【12.74ms】
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
 *
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID，该插件的数据将存储到指定的文件路径中，具体去 全局存储核心 看看。
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
 */
/*~struct~TitleParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题粒子==
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
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 粒子所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 8
 *
 * @param ---粒子效果---
 * @desc 
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
 * @param 粒子自旋转速度
 * @parent ---粒子效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 1.5
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
 * @option 方向聚焦于粒子固定点
 * @value 方向聚焦于粒子固定点
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
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 第二层粒子所属的菜单层级。
 * @default 0
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 7
 * 
 *
 */

 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TPa（Title_Particle）
//		临时全局变量	DrillUp.g_TPa_xxx
//		临时局部变量	this._drill_TPa_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TPa_visibleTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	6.43ms 11.77ms 12.74ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			标题粒子：
//				->基本属性
//					->显示/隐藏
//					->透明度
//					->菜单层级
//					->遮罩
//				->粒子效果
//					->数量
//					->生命周期
//					->自旋转
//					->出现模式
//						->固定点
//					->方向模式
//					->速度模式
//					->透明度模式
//						->时间锚点公式
//						->一闪一闪
//					->缩放模式
//				->双层效果
//
//		★必要注意事项：
//			1.该插件不依赖弹道核心，因为部分公式直接写在插件的代码里了。
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
　　Imported.Drill_TitleParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleParticle');
	
	//==============================
	// * 变量获取 - 粒子
	//				（~struct~TitleParticle）
	//==============================
	DrillUp.drill_TPa_particleInit = function( dataFrom ) {
		var data = {};
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_selfRotate'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
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
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_menuIndex'] = Number( dataFrom["第二层粒子菜单层级"] || 0);
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_TPa_dataFileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);
	
	/*-----------------粒子------------------*/
	DrillUp.g_TPa_list_length = 80;
	DrillUp.g_TPa_list = [];
	for (var i = 0; i < DrillUp.g_TPa_list_length; i++) {
		if( DrillUp.parameters["粒子-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["粒子-" + String(i+1) ]);
			DrillUp.g_TPa_list[i] = DrillUp.drill_TPa_particleInit( temp );
			DrillUp.g_TPa_list[i]['inited'] = true;
		}else{
			DrillUp.g_TPa_list[i] = DrillUp.drill_TPa_particleInit( {} );
			DrillUp.g_TPa_list[i]['inited'] = false;
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
DrillUp.drill_TPa_gCheckData_visible = function(){
	for( var i = 0; i < DrillUp.g_TPa_list_length; i++ ){
		var temp_c = DrillUp.g_TPa_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_TPa_visibleTank[i] == null ){
			if( temp_c['inited'] == false ){		//（无配置，跳过）
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
// * 全局 - 读取
//==============================
	var global_fileId = DrillUp.g_TPa_dataFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TPa" );
	
	// > 显示情况
	if( DrillUp.global_TPa_visibleTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_visibleTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_TPa_visibleTank = data;
		DrillUp.drill_TPa_gCheckData_visible();				//（检查时自动赋新值）
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_TPa_saveData = function(){
	var file_id = DrillUp.g_TPa_dataFileId;
	var data = {};
	data["global_visibleTank"] = DrillUp.global_TPa_visibleTank;
	this.drill_COGS_saveData( file_id, "TPa", data );
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TPa_pluginCommand.call(this, command, args);
	if( command === ">标题粒子" ){
		
		if(args.length == 4){
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
			}
			if( b_id >= 0 && type === "隐藏" ){
				DrillUp.global_TPa_visibleTank[b_id] = false;
				StorageManager.drill_TPa_saveData();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TPa_visibleTank.length; i++){
					DrillUp.global_TPa_visibleTank[i] = false;
				}
				StorageManager.drill_TPa_saveData();
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
var _drill_TPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_TPa_temp_initialize.call(this);
	
    this._drill_TPa_preloadTank = [];			//bitmap容器
	for (var i = 0; i < DrillUp.g_TPa_list.length; i++) {
		var temp_data = DrillUp.g_TPa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		this._drill_TPa_preloadTank.push( ImageManager.loadTitle1( temp_data['src_img'] ) );
	}
}


//=============================================================================
// ** 标题
//=============================================================================
//==============================
// * 标题 - 创建粒子
//==============================
var _drill_TPa_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	// > 粒子初始化
	SceneManager._drill_TPa_created = false;	
   	this._drill_TPa_spriteTankOrg = [];
   	this._drill_TPa_spriteTankSec = [];
   	this._drill_TPa_dataTank = [];
	
	_drill_TPa_createBackground.call(this);		//与背景一同创建
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// * 标题 - 退出界面
//==============================
var _drill_TPa_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TPa_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_TPa_created = false;
};
//==============================
// * 标题 - 层级排序
//==============================
Scene_Title.prototype.drill_TPa_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题 - 帧刷新
//==============================
var _drill_TPa_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TPa_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_TPa_created ) {
		this.drill_TPa_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_TPa_created ){
		this.drill_TPa_update();
	};
};

//=============================================================================
// ** 粒子
//=============================================================================
//==============================
// * 粒子 - 创建
//==============================
Scene_Title.prototype.drill_TPa_create = function() {	
	SceneManager._drill_TPa_created = true;
	
	if(!this._drill_TPa_spriteTankOrg){
		this._drill_TPa_spriteTankOrg = [];		//防止某些覆写的菜单报错
		this._drill_TPa_spriteTankSec = [];
		this._drill_TPa_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	// > 配置的粒子
	for (var i = 0; i < DrillUp.g_TPa_list.length; i++) {
		var temp_data = DrillUp.g_TPa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		// > 粒子层
		var temp_layer = new Sprite();
		temp_layer.opacity = temp_data['opacity'];
		temp_layer.zIndex = temp_data['zIndex'];
		temp_layer.visible = DrillUp.global_TPa_visibleTank[i] || false;
		
		// > 粒子集合
		for( var j = 0; j < temp_data['par_count'] ; j++ ){	
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = ImageManager.loadTitle1(temp_sprite_data['src_img']);
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.opacity = 0;
			
			this._drill_TPa_spriteTankOrg.push(temp_sprite);
			this._drill_TPa_dataTank.push(temp_sprite_data);
			temp_layer.addChild(temp_sprite);
			
			// > 粒子初始化
			this.drill_TPa_resetParticles(this._drill_TPa_dataTank.length-1);
			temp_sprite['_time'] = Math.floor( temp_sprite_data['par_life'] * Math.random() );
		}
		
		// > 粒子层 - 菜单层级
		if( temp_data['menu_index'] == 0 ){
			this._backgroundSprite.addChild(temp_layer);
		}else{
			this._foregroundSprite.addChild(temp_layer);
		}
		
		// > 粒子层 - 粒子遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite(ImageManager.loadTitle1(temp_data['src_img_mask']));
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;
		}
		
		// > 双层效果
		if( temp_data['second_enable'] == true ){
			
			// > 第二层
			var temp_layerSec = new Sprite();
			temp_layerSec.opacity = temp_layer.opacity;
			temp_layerSec.zIndex = temp_data['second_zIndex'];
			temp_layerSec.visible = temp_layer.visible;
			
			// > 粒子集合
			for( var j = 0; j < temp_layer.children.length; j++ ){	
				var org_sprite = temp_layer.children[j];
				
				var temp_sprite = new Sprite();
				temp_sprite.bitmap = ImageManager.loadTitle1(temp_data['second_src_img']);
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				temp_sprite.blendMode = org_sprite.blendMode;
				temp_sprite.opacity = 0;
				temp_sprite.scale.x = org_sprite.scale.x;
				temp_sprite.scale.y = org_sprite.scale.y;
				temp_sprite._followingSprite = org_sprite;
				
				this._drill_TPa_spriteTankSec.push(temp_sprite);
				temp_layerSec.addChild(temp_sprite);
			}
		
			// > 第二层 - 菜单层级
			if( temp_data['second_menuIndex'] == 0 ){
				this._backgroundSprite.addChild(temp_layerSec);
			}else{
				this._foregroundSprite.addChild(temp_layerSec);
			}
			
			// > 第二层 - 粒子遮罩
			if( temp_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.loadTitle1(temp_data['src_img_mask']));
				temp_layerSec.addChild(temp_mask);
				temp_layerSec.mask = temp_mask;
			}
		}

	}
	this.drill_TPa_sortByZIndex();
};

//==============================
// * 粒子 - 帧刷新
//==============================
Scene_Title.prototype.drill_TPa_update = function() {
	
	// > 粒子贴图
	for(var i = 0; i < this._drill_TPa_spriteTankOrg.length; i++ ){
		var spr = this._drill_TPa_spriteTankOrg[i];
		var data = this._drill_TPa_dataTank[i];
		spr['_time'] += 1;
		
		// > 位置
		var xx = 0;
		var yy = 0;
		xx += data['start_x'];
		yy += data['start_y'];
		xx += spr['_time'] * data['cur_speed'] * Math.cos( data['start_dir'] );
		yy += spr['_time'] *data['cur_speed'] * Math.sin( data['start_dir'] );
		spr.x = xx;
		spr.y = yy;
		
		// > 透明度
		var index = spr['_time'];
		if( index >= data['_drill_COBa_opacity'].length ){
			index = data['_drill_COBa_opacity'].length -1;
		}
		spr.opacity = data['_drill_COBa_opacity'][index];
		
		// > 自旋转
		spr.rotation += data['par_selfRotate'] /180*Math.PI;
		
		// > 过界刷新
    	if( this.drill_TPa_isNeedResetParticles(i) ){
			this.drill_TPa_resetParticles(i);
		};
	};
	
	// > 第二层贴图
	for(var i = 0; i < this._drill_TPa_spriteTankSec.length; i++ ){
		var spr_sec = this._drill_TPa_spriteTankSec[i];
		if( spr_sec._followingSprite == undefined ){ return; }
		
		// > 位置
		spr_sec.x = spr_sec._followingSprite.x;
		spr_sec.y = spr_sec._followingSprite.y;
		
		// > 透明度
		spr_sec.opacity = spr_sec._followingSprite.opacity;
		
		// > 缩放大小
		spr_sec.scale.x = spr_sec._followingSprite.scale.x;
		spr_sec.scale.y = spr_sec._followingSprite.scale.y;
		
		// > 自旋转
		spr_sec.rotation = spr_sec._followingSprite.rotation;
		
	};
};

//==============================
// * 粒子 - 重设条件
//==============================	
Scene_Title.prototype.drill_TPa_isNeedResetParticles = function( i ){
	var spr = this._drill_TPa_spriteTankOrg[i];
	var data = this._drill_TPa_dataTank[i];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	// > 过边界
	if( spr.x < 0 - ww ){ return true };
	if( spr.x > Graphics.boxWidth + ww ){ return true };
	if( spr.y < 0 - hh ){ return true };
	if( spr.y > Graphics.boxHeight + hh ){ return true };
	
	// > 生命周期结束
	if( spr['_time'] > data['par_life'] ){ return true; }
	
	return false;
};

//==============================
// * 粒子 - 重设起始点
//==============================	
Scene_Title.prototype.drill_TPa_resetParticles = function( i ){
	var spr = this._drill_TPa_spriteTankOrg[i];
	var data = this._drill_TPa_dataTank[i];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	spr['_time'] = 0;
	spr.rotation = 2*Math.PI*Math.random();
	
	// > 粒子出现模式
	if( data['par_birthMode'] == "随机出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['par_birthMode'] == "左侧出现" ){
		data['start_x'] = 0 - ww*0.5;
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['par_birthMode'] == "右侧出现" ){
		data['start_x'] = Graphics.boxWidth + ww*0.5;
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['par_birthMode'] == "顶部出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = 0 - hh*0.5;
	}
	if( data['par_birthMode'] == "底部出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = Graphics.boxHeight + hh*0.5;
	}
	if( data['par_birthMode'] == "固定点范围出现" ){
		data['start_x'] = data['par_birthX'] + data['par_birthRange'] * Math.cos( 2*Math.PI*Math.random() );
		data['start_y'] = data['par_birthY'] + data['par_birthRange'] * Math.sin( 2*Math.PI*Math.random() );
	}
	
	// > 粒子方向模式
	if( data['par_dirMode'] == "固定方向" ){
		data['start_dir'] = data['par_dirFix'];
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "四周扩散(随机)" ){
		data['start_dir'] = 360 * Math.random();
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "扇形范围方向(随机)" ){
		data['start_dir'] = data['par_dirSectorFace'] + (Math.random() - 0.5) * data['par_dirSectorDegree'];
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "方向聚焦于粒子固定点" ){
		data['start_dir'] = this.drill_TPa_getPointToPointDegree( data['start_x'],data['start_y'], data['par_birthX'],data['par_birthY'] );
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	
	// > 粒子速度模式
	if( data['par_speedMode'] == "只初速度" ){
		data['cur_speed'] = data['par_speedBase'];
	}
	if( data['par_speedMode'] == "初速度+波动量" ){
		data['cur_speed'] = data['par_speedBase'] + (Math.random() - 0.5) * data['par_speedRandom'];
	}
	
	// > 粒子透明度模式
	if( data['par_opacityMode'] == "逐渐消失" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失(慢速)" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':45,'o':255} );
		data['anchorPointTank'].push( {'t':55,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':25,'o':255} );
		data['anchorPointTank'].push( {'t':75,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失(快速)" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':10,'o':255} );
		data['anchorPointTank'].push( {'t':90,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "保持原透明度" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':255} );
	}
	if( data['par_opacityMode'] == "一闪一闪" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':30,'o':125} );
		data['anchorPointTank'].push( {'t':35,'o':255} );
		data['anchorPointTank'].push( {'t':40,'o':125} );
		data['anchorPointTank'].push( {'t':45,'o':255} );
		data['anchorPointTank'].push( {'t':50,'o':125} );
		data['anchorPointTank'].push( {'t':70,'o':125} );
		data['anchorPointTank'].push( {'t':75,'o':255} );
		data['anchorPointTank'].push( {'t':80,'o':125} );
		data['anchorPointTank'].push( {'t':85,'o':255} );
		data['anchorPointTank'].push( {'t':90,'o':125} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	
	// > 粒子透明度模式（复刻至"弹道核心 - 时间锚点公式"）
	data['_drill_COBa_opacity'] = [ 0 ];
	if( data['anchorPointTank'] != undefined ){
		data['_drill_COBa_opacity'] = [];
		
		// > 起点值
		data['_drill_COBa_opacity'].push( 0 );
		
		// > 时间锚点初始化
		if( data['anchorPointTank'].length < 2 ){	//（至少要两个点才能计算）
			data['anchorPointTank'] = [];
			data['anchorPointTank'].push( {'t':0,'o':0} );
			data['anchorPointTank'].push( {'t':100,'o':255} );
		}
		
		// > 开始找点（这里默认 data['anchorPointTank'] 已根据 t 排序 ）
		for(var time = 1; time <= data['par_life']; time++){
			var time_per = time * 100 / data['par_life'];	//（时间百分比） 
			
			// > 找到百分比的落脚点
			var start_index = 0;
			var end_index = 0;
			for( var i = 0; i < data['anchorPointTank'].length; i++ ){
				var p = data['anchorPointTank'][i];
				if( time_per < p['t'] ){
					start_index = i-1;
					end_index = i;
					break;
				}
			}
			
			// > 直接找到末尾点
			if( end_index == 0 ){
				data['_drill_COBa_opacity'].push( data['anchorPointTank'][ data['anchorPointTank'].length-1 ]['o'] );
				continue;
			}
			// > 开头点都没接触到
			if( start_index == -1 ){
				data['_drill_COBa_opacity'].push( data['anchorPointTank'][0]['o'] );
				continue;
			}
			
			// > 计算通用落点
			var p_start = data['anchorPointTank'][start_index];
			var p_end = data['anchorPointTank'][end_index];
			var d_time = p_end['t'] - p_start['t'];
			var cur_time = time_per - p_start['t'];
			var cc = cur_time / d_time * ( p_end['o'] - p_start['o'] ) + p_start['o'];
			data['_drill_COBa_opacity'].push( cc );
		}
	}
	
	// > 粒子缩放模式
	if( data['par_scaleMode'] == "固定缩放值" ){
		spr.scale.x = data['par_scaleBase'];
		spr.scale.y = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		var ran = Math.random();
		spr.scale.x = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
		spr.scale.y = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
	}
	
};
//==============================
// * 数学 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	0度朝右，90度朝下，180度朝左，270度朝上。
//==============================
Scene_Title.prototype.drill_TPa_getPointToPointDegree = function( x1,y1,x2,y2 ){
	var degree = 0;
	
	// > arctan不能为0情况
	if( x2 == x1 ){
		if( y2 > y1 ){
			degree = 90;
		}else{
			degree = 270;
		}
	}else if( y2 == y1 ){
		if( x2 > x1 ){
			degree = 0;
		}else{
			degree = 180;
		}
	
	// > arctan正常计算
	}else{
		degree = Math.atan( (y2 - y1)/(x2 - x1) );
		degree = degree / Math.PI * 180;
		if( x2 < x1 ){
			degree += 180;
		}
	}
	
	// > 修正值
	degree = degree % 360;
	if( degree < 0 ){ degree += 360; }
	
	return degree;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleParticle = false;
		alert(
			"【Drill_TitleParticle.js 标题 - 多层标题粒子】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"
		);
}


