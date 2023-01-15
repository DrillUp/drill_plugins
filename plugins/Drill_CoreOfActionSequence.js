//=============================================================================
// Drill_CoreOfActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        系统 - GIF动画序列核心
 * @author Drill_up
 * 
 * @Drill_LE_param "动画序列-%d"
 * @Drill_LE_parentKey "---动画序列%d至%d---"
 * @Drill_LE_var "DrillUp.g_COAS_list_length"
 * 
 * @Drill_LE_param "状态元-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_COAS_stateList_length"
 * 
 * @Drill_LE_param "状态节点-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_COAS_stateNodeList_length"
 * 
 * @Drill_LE_param "动作元-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_COAS_actList_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_CoreOfActionSequence +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够将多个GIF与状态机系统结合，形成动画序列。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 可作用于：
 *   - Drill_ActorPortraitureExtend   战斗UI-高级角色肖像
 *   - Drill_PictureActionSequence    图片-GIF动画序列
 *   - Drill_EventActionSequence      行走图-GIF动画序列
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于大部分贴图。
 * 2.更多详细内容，去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * 动画序列：
 *   (1.动画序列与 状态机 类似。
 *      有三个主要结构：状态元、状态节点 和 动作元。
 *   (2.以角色的动画序列为例，
 *      状态元是指 角色持续执行的状态。
 *      动作元是指 角色只执行一次的动作。
 *      状态节点是指 角色持续执行复杂嵌套的状态元结构。
 *   (3.动画序列可以对各种情况作出不同gif动作，
 *      具体可以去看看相关 子插件 的动画序列动作的说明。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__actionSeq （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__actionSeq文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。这里需要在角色组中手动配置：
 * 
 * 动画序列1 状态元1 资源-状态元
 * 动画序列1 状态元2 资源-状态元
 * 动画序列1 状态元3 资源-状态元
 * 动画序列1 动作元1 资源-动作元
 * 动画序列1 动作元2 资源-动作元
 * 动画序列1 动作元3 资源-动作元
 * 动画序列2 …
 * ……
 *
 * 你可以配置每个动作元、状态元的设置，并且还可以是组成GIF的多张图像。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 动画核心提供了测试动作元、状态元的方法：
 * 
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示Debug窗口
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 关闭Debug窗口
 * 
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示当前状态元名称
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示当前状态元名称（全路径）
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示全部状态元名称
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示全部状态节点名称
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示全部动作元名称
 * 插件指令：>动画序列核心DEBUG : 上一个创建的动画序列 : 显示符合注解的状态元名[@向上移动]
 * 
 * 1.注意，这里是动画核心，单独使用没有效果。插件指令只是辅助调试用。
 *   你需要去 子插件 看具体功能。
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
 * 测试方法：   运行子插件时，进行相关的性能测试。
 * 测试结果：   地图界面中，动画序列的消耗为：【40.40ms】
 *              战斗界面中，动画序列的消耗为：【25.70ms】
 *              菜单界面中，动画序列的消耗为：【26.13ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.核心的主要消耗来源于图片资源加载，正常帧刷新的消耗并不大。
 *   你需要多注意子插件的消耗情况。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 色调值、模糊边缘、帧间隔明细表 设置，
 * 并实现了小工具交互功能。
 * [v1.2]
 * 添加了部分适配接口。
 * [v1.3]
 * 修复了 动作元和状态元 优先级相同时，动作元不能播放的bug。
 * [v1.4]
 * 优化了 单独播放动作元后，进入空状态元时，动作元图像不消失的bug。
 * [v1.5]
 * 大幅度优化改进了底层，添加了 状态节点 功能，能支持更复杂的动画序列设计。
 * 
 * 
 *
 * @param ---动画序列 1至20---
 * @default
 *
 * @param 动画序列-1
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-2
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-3
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-4
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-5
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-6
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-7
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-8
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-9
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-10
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-11
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-12
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-13
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-14
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-15
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-16
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-17
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-18
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-19
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-20
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param ---动画序列21至40---
 * @default
 *
 * @param 动画序列-21
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-22
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-23
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-24
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-25
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-26
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-27
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-28
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-29
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-30
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-31
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-32
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-33
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-34
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-35
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-36
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-37
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-38
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-39
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-40
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillCOASSequence:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的动画序列--
 * 
 * @param 默认的状态元集合
 * @type text[]
 * @desc 动画序列会随机在该序列中，抽取并播放一个状态。如果只有一个状态，则反复播放该状态。可用插件指令控制修改序列。
 * @default ["小爱丽丝静止1"]
 * 
 * @param ---状态元---
 * @default
 * 
 * @param 状态元-1
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-2
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-3
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-4
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-5
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-6
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-7
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-8
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-9
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-10
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-11
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-12
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-13
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-14
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-15
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-16
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-17
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-18
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-19
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-20
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-21
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-22
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-23
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-24
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-25
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-26
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-27
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-28
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-29
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-30
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default
 * 
 * @param ---状态节点---
 * @default
 * 
 * @param 状态节点-1
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-2
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-3
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-4
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-5
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-6
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-7
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-8
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-9
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-10
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-11
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-12
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-13
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-14
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-15
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-16
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-17
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-18
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-19
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-20
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-21
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-22
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-23
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-24
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-25
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-26
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-27
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-28
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-29
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-30
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default
 * 
 * @param ---动作元---
 * @default
 * 
 * @param 动作元-1
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-2
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-3
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-4
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-5
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-6
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-7
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-8
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-9
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-10
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-11
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-12
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-13
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-14
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-15
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-16
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-17
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-18
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-19
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-20
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default
 * 
 */
/*~struct~DrillCOASState:
 * 
 * 
 * @param 状态元名称
 * @desc 状态元的标识性名称，注意不要与其他名称重复。
 * @default 小爱丽丝静止1
 * 
 * @param 状态元权重
 * @type number
 * @min 1
 * @desc 如果设置多个状态元时，系统会随机抽取任意一个状态元并进行播放，这里为状态元的播放权重几率。
 * @default 40
 * 
 * @param 状态元优先级
 * @type number
 * @min 0
 * @desc 状态元优先级是针对动作元设置的，优先级高的状态元，不会被优先级低的动作元中断。
 * @default 0
 * 
 * 
 * @param ---GIF---
 * @default
 * 
 * @param 资源-状态元
 * @parent ---GIF---
 * @desc 该状态元下的资源图片。可以是单张图片，也可以是多张组成的gif。
 * @default []
 * @require 1
 * @dir img/Special__actionSeq/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---GIF---
 * @type number
 * @min 1
 * @desc 默认gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 * 
 * @param 帧间隔-明细表
 * @parent ---GIF---
 * @type number[]
 * @min 1
 * @desc GIF中，每帧的详细间隔，间隔与配置的资源一一对应。不对应的则用默认的帧间隔。
 * @default []
 *
 * @param 是否倒放
 * @parent ---GIF---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 图像-色调值
 * @parent ---GIF---
 * @type number
 * @min 0
 * @max 360
 * @desc GIF图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---GIF---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 可以模糊GIF图像的边缘，防止出现像素锯齿。
 * @default false
 * 
 * 
 * @param 备注
 * @type note
 * @desc 备注的文本，在动画序列中并不起实际作用。
 * @default ""
 *
 */
/*~struct~DrillCOASStateNode:
 * 
 * 
 * @param 节点名称
 * @desc 状态元的标识性名称，注意不要与其他名称重复。
 * @default 小爱丽丝拍裙子流程
 * 
 * @param 节点权重
 * @type number
 * @min 1
 * @desc 如果设置多个状态元时，系统会随机抽取任意一个状态元并进行播放，这里为状态元的播放权重几率。
 * @default 40
 * 
 * @param 节点优先级
 * @type number
 * @min 0
 * @desc 节点优先级是针对动作元设置的，优先级高的状态节点，不会被优先级低的动作元中断。
 * @default 0
 * 
 * 
 * @param ---播放---
 * @default
 *
 * @param 播放方式
 * @parent ---播放---
 * @type select
 * @option 随机播放状态元
 * @value 随机播放状态元
 * @option 顺序播放状态元
 * @value 顺序播放状态元
 * @option 随机播放嵌套集合
 * @value 随机播放嵌套集合
 * @option 顺序播放嵌套集合
 * @value 顺序播放嵌套集合
 * @desc 地图所在的层级位置，具体关系看看插件说明。
 * @default 随机播放状态元
 * 
 * @param 随机播放状态元
 * @parent 播放方式
 * @type text[]
 * @desc 方式为"随机播放状态元"时，播放的名称列表，这里填 状态元名称 。
 * @default []
 * 
 * @param 顺序播放状态元
 * @parent 播放方式
 * @type text[]
 * @desc 方式为"顺序播放状态元"时，播放的名称列表，这里填 状态元名称 。
 * @default []
 * 
 * @param 随机播放嵌套集合
 * @parent 播放方式
 * @type text[]
 * @desc 方式为"随机播放嵌套集合"时，播放的名称列表，这里填 节点名称 。
 * @default []
 * 
 * @param 顺序播放嵌套集合
 * @parent 播放方式
 * @type text[]
 * @desc 方式为"顺序播放嵌套集合"时，播放的名称列表，这里填 节点名称 。
 * @default []
 * 
 * @param 随机播放的次数上限
 * @parent ---播放---
 * @type number
 * @min 1
 * @desc 设为随机播放时的次数上限，达到上限后，跳出集合。
 * @default 5
 * 
 * 
 * @param 备注
 * @type note
 * @desc 备注的文本，在动画序列中并不起实际作用。
 * @default ""
 *
 */
/*~struct~DrillCOASAct:
 * 
 * 
 * @param 动作元名称
 * @desc 动作元的标识性名称，注意不要与其他名称重复。
 * @default 小爱丽丝攻击
 * 
 * @param 动作元优先级
 * @type number
 * @min 0
 * @desc 优先级高的动作，可以中断 状态元 和正在播放的低优先级动作元，优先级相同或低的，则不影响。
 * @default 20
 * 
 * 
 * @param ---GIF---
 * @default
 *
 * @param 资源-动作元
 * @parent ---GIF---
 * @desc 该动作元下的资源图片。可以是单张图片，也可以是多张组成的gif。
 * @default []
 * @require 1
 * @dir img/Special__actionSeq/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---GIF---
 * @type number
 * @min 1
 * @desc 默认gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 * 
 * @param 帧间隔-明细表
 * @parent ---GIF---
 * @type number[]
 * @min 1
 * @desc GIF中，每帧的详细间隔，间隔与配置的资源一一对应。不对应的则用默认的帧间隔。
 * @default []
 *
 * @param 是否倒放
 * @parent ---GIF---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 图像-色调值
 * @parent ---GIF---
 * @type number
 * @min 0
 * @max 360
 * @desc GIF图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---GIF---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 可以模糊GIF图像的边缘，防止出现像素锯齿。
 * @default false
 * 
 * 
 * @param 备注
 * @type note
 * @desc 备注的文本，在动画序列中并不起实际作用。
 * @default ""
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COAS（Core_Of_Action_Sequence）
//		临时全局变量	无
//		临时局部变量	this._drill_COAS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	地图界面的小爱丽丝全绑定
//		★性能测试消耗	25.7ms（Drill_COAS_SpriteDecorator.prototype.update）40.4ms（Drill_COAS_SpriteDecorator.prototype.isReady）
//		★最坏情况		无
//		★备注			主要消耗来源于图片资源加载，正常并不消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			动画序列核心：
//				->数据访问器
//					->动画序列
//					->状态元
//					->状态节点
//					->动作元
//				->数据校验器
//					->空检查
//					->嵌套检查
//				->动画序列核心DEBUG
// 
//		★私有类如下：
//			* Drill_COAS_StateController【状态元控制器】
//			* Drill_COAS_StateNodeController【状态节点控制器】
//			* Drill_COAS_ActController【动作元控制器】
//			* Drill_COAS_MainController【动画序列数据】
//			* Drill_COAS_SpriteDecorator【动画序列对象】
//			
//		★其它说明细节：
//			1. 2022/11/13：原插件只有状态元和动作元，后来引入了状态节点的结构。
//				插件的底层变化特别大，但实际使用时，变化不大。
//
//		★核心接口说明：
//			1.整个核心只提供了两个分离的类，数据 和 对象。
//			  具体见类的说明。
//			2.如果只在一个 简单贴图 里面使用，直接new，然后手动update即可。
//				this._Drill_xxx_data = new Drill_COAS_MainController( DrillUp.g_COAS_list[ 0 ] );
//				this._Drill_xxx_decorator = new Drill_COAS_SpriteDecorator( this, this._Drill_xxx_data );
//				this._Drill_xxx_data.update();
//				this._Drill_xxx_decorator.update();
//			  但是如果你需要将 二者分离，且 数据 能保存，则：
//				见插件 Drill_PictureActionSequence 。
//			3.如果要对data进行相关操作，可见标注"（接口）"的函数。
//				
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfActionSequence = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfActionSequence');
	
	
	//==============================
	// * 变量获取 - 状态元
	//				（~struct~DrillCOASState）
	//==============================
	DrillUp.drill_COAS_initState = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['name'] = String( dataFrom["状态元名称"] || "");
		if( dataFrom["状态元标签"] != "" &&
			dataFrom["状态元标签"] != undefined ){
			data['tag_tank'] = JSON.parse( dataFrom["状态元标签"] );
		}else{
			data['tag_tank'] = [];
		}
		data['priority'] = Number( dataFrom["状态元优先级"] || 0);
		data['proportion'] = Number( dataFrom["状态元权重"] || 40);
		data['canBeInterrupted'] = String( dataFrom["可被动作元打断"] || "false") == "true";
		
		// > GIF
		if( dataFrom["资源-状态元"] != "" &&
			dataFrom["资源-状态元"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-状态元"] );
		}else{
			data['gif_src'] = [];
		}
		if( dataFrom["帧间隔-明细表"] != "" &&
			dataFrom["帧间隔-明细表"] != undefined ){
			data['gif_intervalTank'] = JSON.parse( dataFrom["帧间隔-明细表"] );
		}else{
			data['gif_intervalTank'] = [];
		}
		data['gif_src_file'] = "img/Special__actionSeq/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['gif_preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > 声音
		//data['se_src'] = String( dataFrom["声音-声音资源"] || "");
		//data['se_delay'] = Number( dataFrom["声音-播放延迟"] || 0);
		
		// > 图像
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		// > 杂项
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		return data;
	}
	//==============================
	// * 变量获取 - 状态节点
	//				（~struct~DrillCOASStateNode）
	//==============================
	DrillUp.drill_COAS_initStateNode = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['name'] = String( dataFrom["节点名称"] || "");
		if( dataFrom["节点标签"] != "" &&
			dataFrom["节点标签"] != undefined ){
			data['tag_tank'] = JSON.parse( dataFrom["节点标签"] );
		}else{
			data['tag_tank'] = [];
		}
		data['priority'] = Number( dataFrom["节点优先级"] || 0);
		data['proportion'] = Number( dataFrom["节点权重"] || 40);
		data['canBeInterrupted'] = String( dataFrom["可被动作元打断"] || "false") == "true";
		
		// > 播放列表
		data['play_type'] = String( dataFrom["播放方式"] || "随机播放状态元");
		if( dataFrom["随机播放状态元"] != "" &&
			dataFrom["随机播放状态元"] != undefined ){
			data['play_randomStateSeq'] = JSON.parse( dataFrom["随机播放状态元"] );
		}else{
			data['play_randomStateSeq'] = [];
		}
		if( dataFrom["顺序播放状态元"] != "" &&
			dataFrom["顺序播放状态元"] != undefined ){
			data['play_plainStateSeq'] = JSON.parse( dataFrom["顺序播放状态元"] );
		}else{
			data['play_plainStateSeq'] = [];
		}
		if( dataFrom["随机播放嵌套集合"] != "" &&
			dataFrom["随机播放嵌套集合"] != undefined ){
			data['play_randomNodeSeq'] = JSON.parse( dataFrom["随机播放嵌套集合"] );
		}else{
			data['play_randomNodeSeq'] = [];
		}
		if( dataFrom["顺序播放嵌套集合"] != "" &&
			dataFrom["顺序播放嵌套集合"] != undefined ){
			data['play_plainNodeSeq'] = JSON.parse( dataFrom["顺序播放嵌套集合"] );
		}else{
			data['play_plainNodeSeq'] = [];
		}
		data['play_randomMax'] = Number( dataFrom["随机播放的次数上限"] || 5);
		
		// > 杂项
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		return data;
	}
	//==============================
	// * 变量获取 - 动作元
	//				（~struct~DrillCOASAct）
	//==============================
	DrillUp.drill_COAS_initAct = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['name'] = String( dataFrom["动作元名称"] || "");
		if( dataFrom["动作元标签"] != "" &&
			dataFrom["动作元标签"] != undefined ){
			data['tag_tank'] = JSON.parse( dataFrom["动作元标签"] );
		}else{
			data['tag_tank'] = [];
		}
		data['priority'] = Number( dataFrom["动作元优先级"] || 20);
		
		// > GIF
		if( dataFrom["资源-动作元"] != "" &&
			dataFrom["资源-动作元"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-动作元"] );
		}else{
			data['gif_src'] = [];
		}
		if( dataFrom["帧间隔-明细表"] != "" &&
			dataFrom["帧间隔-明细表"] != undefined ){
			data['gif_intervalTank'] = JSON.parse( dataFrom["帧间隔-明细表"] );
		}else{
			data['gif_intervalTank'] = [];
		}
		data['gif_src_file'] = "img/Special__actionSeq/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['gif_preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > 图像
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		// > 杂项
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		return data;
	}
	//==============================
	// * 变量获取 - 动画序列
	//				（~struct~DrillCOASSequence）
	//==============================
	DrillUp.g_COAS_stateList_length = 30;
	DrillUp.g_COAS_stateNodeList_length = 30;
	DrillUp.g_COAS_actList_length = 20;
	DrillUp.drill_COAS_initSequence = function( dataFrom ){
		var data = {};
		
		// > 容器 - 默认的状态元集合
		data['state_default_randomSeq'] = [];
		if( dataFrom["默认的状态元集合"] != "" &&
			dataFrom["默认的状态元集合"] != undefined ){
			data['state_default_randomSeq'] = JSON.parse( dataFrom["默认的状态元集合"] );
		}else{
			data['state_default_randomSeq'] = [];
		}
		
		// > 容器 - 状态元
		data['state_tank'] = [];
		for (var j = 0; j < DrillUp.g_COAS_stateList_length; j++) {
			if( dataFrom["状态元-" + String(j+1) ] != undefined &&
				dataFrom["状态元-" + String(j+1) ] != "" ){
				var state = JSON.parse( dataFrom["状态元-" + String(j+1)] );
				data['state_tank'][j] = DrillUp.drill_COAS_initState( state );
			}else{
				data['state_tank'][j] = DrillUp.drill_COAS_initState( {} );
			}
		}
		
		// > 容器 - 状态节点
		data['stateNode_tank'] = [];
		for (var j = 0; j < DrillUp.g_COAS_stateNodeList_length; j++) {
			if( dataFrom["状态节点-" + String(j+1) ] != undefined &&
				dataFrom["状态节点-" + String(j+1) ] != "" ){
				var state = JSON.parse( dataFrom["状态节点-" + String(j+1)] );
				data['stateNode_tank'][j] = DrillUp.drill_COAS_initStateNode( state );
			}else{
				data['stateNode_tank'][j] = DrillUp.drill_COAS_initStateNode( {} );
			}
		}
		
		// > 容器 - 动作元
		data['act_tank'] = [];
		for (var j = 0; j < DrillUp.g_COAS_actList_length; j++) {
			if( dataFrom["动作元-" + String(j+1) ] != undefined &&
				dataFrom["动作元-" + String(j+1) ] != "" ){
				var act = JSON.parse( dataFrom["动作元-" + String(j+1)] );
				data['act_tank'][j] = DrillUp.drill_COAS_initAct( act );
			}else{
				data['act_tank'][j] = DrillUp.drill_COAS_initAct( {} );
			}
		}
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_COAS_list_length = 40;
	DrillUp.g_COAS_list = [];
	for (var i = 0; i < DrillUp.g_COAS_list_length; i++) {
		if( DrillUp.parameters["动画序列-" + String(i+1) ] != undefined &&
			DrillUp.parameters["动画序列-" + String(i+1) ] != "" ){
			var sequence = JSON.parse(DrillUp.parameters["动画序列-" + String(i+1) ]);
			DrillUp.g_COAS_list[i] = DrillUp.drill_COAS_initSequence( sequence );
			DrillUp.g_COAS_list[i]['id'] = i;
			DrillUp.g_COAS_list[i]['inited'] = true;
		}else{
			DrillUp.g_COAS_list[i] = DrillUp.drill_COAS_initSequence( {} );
			DrillUp.g_COAS_list[i]['id'] = i;
			DrillUp.g_COAS_list[i]['inited'] = false;
		}
	}
	
	
	//=============================================================================
	// ** 数据访问器
	//=============================================================================
	//==============================
	// * 数据访问器 - 获取 - 动画序列
	//==============================
	DrillUp.drill_COAS_getSequenceData = function( sequence_id ){
		if( sequence_id < 0 ){ return null; }
		if( sequence_id >= DrillUp.g_COAS_list.length ){ return null; }
		return DrillUp.g_COAS_list[ sequence_id ];
	};
	//==============================
	// * 数据访问器 - 获取 - 状态元
	//==============================
	DrillUp.drill_COAS_getStateData = function( sequence_id, state_name ){
		if( state_name == "" ){ return null; }
		var sequence_data = DrillUp.drill_COAS_getSequenceData( sequence_id );
		if( sequence_data == undefined ){ return null; }
		for(var i=0; i < sequence_data['state_tank'].length; i++ ){
			var data = sequence_data['state_tank'][i];
			if( data['name'] == state_name ){
				return data;
			}
		}
		return null;
	};
	//==============================
	// * 数据访问器 - 获取 - 状态节点
	//==============================
	DrillUp.drill_COAS_getStateNodeData = function( sequence_id, stateNode_name ){
		if( stateNode_name == "" ){ return null; }
		var sequence_data = DrillUp.drill_COAS_getSequenceData( sequence_id );
		if( sequence_data == undefined ){ return null; }
		for(var i=0; i < sequence_data['stateNode_tank'].length; i++ ){
			var data = sequence_data['stateNode_tank'][i];
			if( data['name'] == stateNode_name ){
				return data;
			}
		}
		return null;
	};
	//==============================
	// * 数据访问器 - 获取 - 动作元
	//==============================
	DrillUp.drill_COAS_getActData = function( sequence_id, act_name ){
		if( act_name == "" ){ return null; }
		var sequence_data = DrillUp.drill_COAS_getSequenceData( sequence_id );
		if( sequence_data == undefined ){ return null; }
		for(var i=0; i < sequence_data['act_tank'].length; i++ ){
			var data = sequence_data['act_tank'][i];
			if( data['name'] == act_name ){
				return data;
			}
		}
		return null;
	};
	//==============================
	// * 数据访问器 - 是否存在 状态元
	//==============================
	DrillUp.drill_COAS_hasState = function( sequence_id, state_name ){
		var data = DrillUp.drill_COAS_getStateData( sequence_id, state_name );
		if( data == undefined ){ return false; }
		return true;
	};
	//==============================
	// * 数据访问器 - 是否存在 状态节点
	//==============================
	DrillUp.drill_COAS_hasStateNode = function( sequence_id, stateNode_name ){
		var data = DrillUp.drill_COAS_getStateNodeData( sequence_id, stateNode_name );
		if( data == undefined ){ return false; }
		return true;
	};
	//==============================
	// * 数据访问器 - 是否存在 动作元
	//==============================
	DrillUp.drill_COAS_hasAct = function( sequence_id, act_name ){
		var data = DrillUp.drill_COAS_getActData( sequence_id, act_name );
		if( data == undefined ){ return false; }
		return true;
	};

	//=============================================================================
	// ** 数据校验器
	//=============================================================================
	//==============================
	// * 数据校验器 - 检查 动画序列
	//==============================
	DrillUp.g_drill_COAS_stateMiss_list = [];
	DrillUp.g_drill_COAS_stateNodeMiss_list = [];
	DrillUp.drill_COAS_checkSequenceData = function( sequence_data ){
		
		// > 清空校验信息
		DrillUp.g_drill_COAS_stateMiss_list = [];
		DrillUp.g_drill_COAS_stateNodeMiss_list = [];
		
		// > 开始校验
		for(var i=0; i < sequence_data['stateNode_tank'].length; i++ ){
			var stateNode_data = sequence_data['stateNode_tank'][i];
			
			// > 开始空校验
			DrillUp.drill_COAS_checkStateNodeMiss( sequence_data, stateNode_data );
			
			// > 开始迭代校验
			DrillUp.drill_COAS_checkStateNodeRecursion( sequence_data, stateNode_data, 0 );
		}
		
		// > 空校验信息
		if( DrillUp.g_drill_COAS_stateMiss_list.length > 0 ){
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，动画序列"+String(sequence_data['id'])+"中没有状态元\""+
					DrillUp.g_drill_COAS_stateMiss_list.join("、")
				+"\"。"
			);
		}
		if( DrillUp.g_drill_COAS_stateNodeMiss_list.length > 0 ){
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，动画序列"+String(sequence_data['id'])+"中没有状态节点\""+
					DrillUp.g_drill_COAS_stateNodeMiss_list.join("、")
				+"\"。"
			);
		}
	}
	//==============================
	// * 数据校验器 - 子节点空检查 状态节点
	//==============================
	DrillUp.drill_COAS_checkStateNodeMiss = function( sequence_data, stateNode_data ){
		if( sequence_data == undefined ){ return; }
		if( stateNode_data == undefined ){ return; }
		
		// > 检查状态元
		if( stateNode_data['play_type'] == "随机播放状态元" ){
			for(var i=0; i < stateNode_data['play_randomStateSeq'].length; i++ ){
				var state_name = stateNode_data['play_randomStateSeq'][i];
				if( DrillUp.drill_COAS_hasState( sequence_data['id'], state_name ) == false ){
					if( DrillUp.g_drill_COAS_stateMiss_list.contains( state_name ) == false ){
						DrillUp.g_drill_COAS_stateMiss_list.push( state_name );
					}
				}
			}
		}
		if( stateNode_data['play_type'] == "顺序播放状态元" ){
			for(var i=0; i < stateNode_data['play_plainStateSeq'].length; i++ ){
				var state_name = stateNode_data['play_plainStateSeq'][i];
				if( DrillUp.drill_COAS_hasState( sequence_data['id'], state_name ) == false ){
					if( DrillUp.g_drill_COAS_stateMiss_list.contains( state_name ) == false ){
						DrillUp.g_drill_COAS_stateMiss_list.push( state_name );
					}
				}
			}
		}
		
		// > 检查状态节点
		if( stateNode_data['play_type'] == "随机播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_randomNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_randomNodeSeq'][i];
				if( DrillUp.drill_COAS_hasStateNode( sequence_data['id'], node_name ) == false ){
					if( DrillUp.g_drill_COAS_stateNodeMiss_list.contains( node_name ) == false ){
						DrillUp.g_drill_COAS_stateNodeMiss_list.push( node_name );
					}
				}
			}
		}
		if( stateNode_data['play_type'] == "顺序播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_plainNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_plainNodeSeq'][i];
				if( DrillUp.drill_COAS_hasStateNode( sequence_data['id'], node_name ) == false ){
					if( DrillUp.g_drill_COAS_stateNodeMiss_list.contains( node_name ) == false ){
						DrillUp.g_drill_COAS_stateNodeMiss_list.push( node_name );
					}
				}
			}
		}
	}
	//==============================
	// * 数据校验器 - 数据空检查 状态节点
	//
	//			说明：	配置为空则返回false。
	//==============================
	DrillUp.drill_COAS_checkStateNodeIsEmpty = function( stateNode_data ){
		if( stateNode_data == undefined ){ return true; }
		if( stateNode_data['name'] == undefined ){ return true; }
		if( stateNode_data['name'] == "" ){ return true; }
		if( stateNode_data['play_type'] == undefined ){ return true; }
		
		if( stateNode_data['play_type'] == "随机播放状态元" ){	//（状态节点必须配置对应的 状态元或状态节点，否则为空）
			if( stateNode_data['play_randomStateSeq'] == undefined ){ return true; }
			if( stateNode_data['play_randomStateSeq'].length == 0 ){ return true; }
			return false;
		}
		if( stateNode_data['play_type'] == "顺序播放状态元" ){
			if( stateNode_data['play_plainStateSeq'] == undefined ){ return true; }
			if( stateNode_data['play_plainStateSeq'].length == 0 ){ return true; }
			return false;
		}
		if( stateNode_data['play_type'] == "随机播放嵌套集合" ){
			if( stateNode_data['play_randomNodeSeq'] == undefined ){ return true; }
			if( stateNode_data['play_randomNodeSeq'].length == 0 ){ return true; }
			return false;
		}
		if( stateNode_data['play_type'] == "顺序播放嵌套集合" ){
			if( stateNode_data['play_plainNodeSeq'] == undefined ){ return true; }
			if( stateNode_data['play_plainNodeSeq'].length == 0 ){ return true; }
			return false;
		}
		return true;
	}
	//==============================
	// * 数据校验器 - 嵌套检查 状态节点
	//==============================
	DrillUp.drill_COAS_checkStateNodeRecursion = function( sequence_data, stateNode_data, layer ){
		if( sequence_data == undefined ){ return; }
		if( stateNode_data == undefined ){ return; }
		
		// > 校验
		if( layer >= 20 ){
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，状态节点\""+stateNode_data['name']+"\"的嵌套出现死循环。"
			);
			return;
		}
		
		var cur_name = stateNode_data['name'];
		
		// > 检查状态节点
		if( stateNode_data['play_type'] == "随机播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_randomNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_randomNodeSeq'][i];
				if( node_name == cur_name ){
					alert(
						"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
						"错误，状态节点\""+node_name+"\"不能自己嵌套自己。"
					);
					return;
				}
				var next_node = DrillUp.drill_COAS_getStateNodeData( sequence_data, node_name );
				DrillUp.drill_COAS_checkStateNodeRecursion( sequence_data, next_node, layer+1 );
			}
		}
		if( stateNode_data['play_type'] == "顺序播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_plainNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_plainNodeSeq'][i];
				if( node_name == cur_name ){
					alert(
						"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
						"错误，状态节点\""+node_name+"\"不能自己嵌套自己。"
					);
					return;
				}
				var next_node = DrillUp.drill_COAS_getStateNodeData( sequence_data, node_name );
				DrillUp.drill_COAS_checkStateNodeRecursion( sequence_data, next_node, layer+1 );
			}
		}
	};
	//==============================
	// * 数据校验器 - 执行校验
	//==============================
	for(var i = 0; i < DrillUp.g_COAS_list.length; i++ ){
		var sequence_data = DrillUp.g_COAS_list[i];
		DrillUp.drill_COAS_checkSequenceData( sequence_data );
	};

	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_COAS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_COAS_pluginCommand.call(this, command, args);
	if( command === ">动画序列核心DEBUG" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "上一个创建的动画序列" ){
				var main_controller = $gameTemp._drill_COAS_lastCreatedMainController;
				if( main_controller == undefined ){ return; }
				if( temp2 == "显示Debug窗口" ){
					var spriteset = SceneManager._scene._spriteset;
					if( spriteset == undefined ){ return; }
					if( spriteset._drill_COAS_debugWindow == undefined ){
						var temp_window = new Drill_COAS_DebugWindow();
						temp_window.drill_COAS_setMainController( main_controller );
						spriteset.addChild( temp_window );
						spriteset._drill_COAS_debugWindow = temp_window;
					}
				}
				if( temp2 == "关闭Debug窗口" ){
					var spriteset = SceneManager._scene._spriteset;
					if( spriteset == undefined ){ return; }
					if( spriteset._drill_COAS_debugWindow != undefined ){
						spriteset.removeChild( spriteset._drill_COAS_debugWindow );
						spriteset._drill_COAS_debugWindow = null;
					}
				}
				if( temp2 == "显示当前状态元名称" ){
					var name = main_controller.drill_COAS_getCurStateName();
					alert( name );
				}
				if( temp2 == "显示当前状态元名称（全路径）" ){
					var name = main_controller.drill_COAS_getCurStateName_AllRoot();
					alert( name );
				}
				if( temp2 == "显示全部状态元名称" ){
					var name_list = main_controller.drill_COAS_getStateData_AllName();
					alert( JSON.stringify(name_list) );
				}
				if( temp2 == "显示全部状态节点名称" ){
					var name_list = main_controller.drill_COAS_getStateNodeData_AllName();
					alert( JSON.stringify(name_list) );
				}
				if( temp2 == "显示全部动作元名称" ){
					var name_list = main_controller.drill_COAS_getActData_AllName();
					alert( JSON.stringify(name_list) );
				}
				if( temp2.indexOf("显示符合注解的状态元名[") != -1 ){
					temp2 = temp2.replace("显示符合注解的状态元名[","");
					temp2 = temp2.replace("]","");
					//main_controller.drill_COAS_setSimpleStateNodeByAnnotation( temp2 );
					//var seq = main_controller.drill_COAS_getCurrentStateSeqName();
					//alert( JSON.stringify(seq) );
				}
			}
		}
	}
}


//=============================================================================
// ** 临时变量初始化
//=============================================================================
//==============================
// * 临时变量 - 初始化
//==============================
var _drill_COAS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_COAS_temp_initialize.call(this);
	this._drill_COAS_lastCreatedMainController = null;		//（上一个创建的动画序列）
	this.drill_COAS_preloadInit();
}
//==============================
// * 临时变量 - 资源提前预加载
//
//			说明：	遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_COAS_preloadInit = function() {
	this._drill_COAS_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_COAS_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_COAS_list.length; i++ ){
		var temp_data = DrillUp.g_COAS_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] == false ){ continue; }
		
		// > 状态元 预加载
		for( var j = 0; j < temp_data['state_tank'].length; j++ ){
			var state_data = temp_data['state_tank'][j];
			if( state_data['gif_preload'] == true ){
				
				// > 状态元 的资源列表
				var gif_src = state_data['gif_src'];
				for( var k = 0; k < gif_src.length; k++ ){
					this._drill_COAS_preloadTank.push( 
						ImageManager.reserveBitmap( state_data['gif_src_file'], gif_src[k], state_data['tint'], state_data['smooth'], this._drill_COAS_cacheId ) 
					);
				}
			}
		}
		// > 动作元 预加载
		for( var j = 0; j < temp_data['act_tank'].length; j++ ){
			var act_data = temp_data['act_tank'][j];
			if( act_data['gif_preload'] == true ){
				
				// > 动作元 的资源列表
				var gif_src = act_data['gif_src'];
				for( var k = 0; k < gif_src.length; k++ ){
					this._drill_COAS_preloadTank.push( 
						ImageManager.reserveBitmap( act_data['gif_src_file'], gif_src[k], act_data['tint'], act_data['smooth'], this._drill_COAS_cacheId ) 
					);
				}
			}
		}
	}
}



//=============================================================================
// ** 状态元 控制器【Drill_COAS_StateController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	> 定义一个专门控制 状态元 的数据类。
// **					> 该类可被存到存档中。
// ** 		子功能：	->帧刷新
// **					->重设数据
// **						->序列号
// **					->输出数据
// **						> 当前的对象名
// **						> 当前的路径
// **						> 当前的色调
// **						> 当前的模糊
// **					->节点
// **						->当前状态元名称
// **						->当前状态元优先级
// **						->是否结束播放
// **					->GIF
// **						->播放（增量刷新）
// **						->帧间隔列表
// **		
// **		说明：	> 该类的update函数需要手动调用。
// **				> 【该类在c++工具中存在 复刻类 ，修改后注意同步复刻 】
//=============================================================================
//==============================
// * 状态元 - 定义
//==============================
function Drill_COAS_StateController() {
	this.initialize.apply(this, arguments);
};
//==============================
// * 状态元 - 初始化
//==============================
Drill_COAS_StateController.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData_State();											//初始化数据
    this.drill_initPrivateData_State();										//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_COAS_resetData_State( data );
};
//##############################
// * 状态元 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_StateController.prototype.drill_COAS_update = function(){
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_COAS_updateState();		//帧刷新 - 状态元
};
//##############################
// * 状态元 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_COAS_StateController.prototype.drill_COAS_resetData_State = function( data ){
	this.drill_COAS_resetData_State_Private( data );
};
//##############################
// * 状态元 - 输出数据 - 当前的对象名【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateController.prototype.drill_COAS_curBitmapName = function(){
	return this._drill_curBitmapName;
};
//##############################
// * 状态元 - 输出数据 - 当前的路径【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateController.prototype.drill_COAS_curBitmapPath = function(){
	return this._drill_curBitmapPath;
};
//##############################
// * 状态元 - 输出数据 - 当前的色调【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateController.prototype.drill_COAS_curBitmapTint = function(){
	return this._drill_curBitmapTint;
};
//##############################
// * 状态元 - 输出数据 - 当前的模糊【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateController.prototype.drill_COAS_curBitmapSmooth = function(){
	return this._drill_curBitmapSmooth;
};
//##############################
// * 状态元 - 节点 - 当前状态元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateController.prototype.drill_COAS_getCurStateName = function(){
	return this._drill_data['name'];
};
//##############################
// * 状态元 - 节点 - 当前状态元优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateController.prototype.drill_COAS_getCurStatePriority = function(){
	return this._drill_data['priority'];
};
//##############################
// * 状态元 - 节点 - 可被动作元打断【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateController.prototype.drill_COAS_canBeInterrupted = function(){
	return this._drill_data['canBeInterrupted'];
};
//##############################
// * 状态元 - 节点 - 是否结束播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateController.prototype.drill_COAS_isStateEnd = function(){
	return this._drill_curIndex >= this._drill_tarIndex;
};
//##############################
// * 状态元 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_COAS_StateController.prototype.drill_initData_State = function() {
	var data = this._drill_data;
	
	// > 常规
	if( data['name'] == undefined ){ data['name'] = "" };										//状态元名称
	if( data['tag_tank'] == undefined ){ data['tag_tank'] = [] };								//状态元标签
	if( data['priority'] == undefined ){ data['priority'] = 0 };								//状态元优先级
	if( data['proportion'] == undefined ){ data['proportion'] = 40 };							//状态元权重
	if( data['canBeInterrupted'] == undefined ){ data['canBeInterrupted'] = false };			//可被动作元打断
	
	// > GIF
	if( data['gif_src'] == undefined ){ data['gif_src'] = [] };									//GIF - 资源
	if( data['gif_src_file'] == undefined ){ data['gif_src_file'] = "img/Special__actionSeq/"};	//GIF - 资源文件夹
	if( data['gif_intervalTank'] == undefined ){ data['gif_intervalTank'] = [] };				//GIF - 帧间隔-明细表
	if( data['gif_interval'] == undefined ){ data['gif_interval'] = 4 };						//GIF - 帧间隔
	if( data['gif_back_run'] == undefined ){ data['gif_back_run'] = false };					//GIF - 是否倒放
	if( data['gif_preload'] == undefined ){ data['gif_preload'] = false };						//GIF - 是否预加载
	
	// > 声音（这部分可以单独分离出插件）
	//if( data['se_src'] == undefined ){ data['se_src'] = "" };									//声音 - 声音资源
	//if( data['se_delay'] == undefined ){ data['se_delay'] = 0 };								//声音 - 播放延迟
	
	// > 图像
	if( data['tint'] == undefined ){ data['tint'] = 0 };										//图像 - 色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };								//图像 - 模糊边缘
	
	// > 杂项
	if( data['note'] == undefined ){ data['note'] = "" };										//杂项 - 备注
	
	//this._drill_data = data;	//（c++中，注意此处的指针，需要重新赋值）
};
//==============================
// * 状态元 - 私有数据初始化
//==============================
Drill_COAS_StateController.prototype.drill_initPrivateData_State = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;								//常规 - 当前时间
	this._drill_needDestroy = false;						//常规 - 销毁
	
	// > 播放时间重置
	this.drill_COAS_resetTimer(data);
	
	// > GIF - 帧间隔列表 计算
	this._drill_curIntervalTank = [];
	for( var i=0; i < data['gif_src'].length; i++ ){
		var interval = data['gif_interval'];
		if( i < data['gif_intervalTank'].length ){
			interval = Number(data['gif_intervalTank'][i]);
		}
		this._drill_curIntervalTank.push( Number(interval) );
	}
};
//==============================
// * 状态元 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_COAS_StateController.prototype.drill_COAS_resetData_State_Private = function( data ){
	
	// > 播放时间重置
	this.drill_COAS_resetTimer(data);
	
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
    this.drill_initData_State();											//初始化数据
    this.drill_initPrivateData_State();										//私有数据初始化
};
//==============================
// * 状态元 - 播放时间重置
//
//			说明：	特殊重置项，将播放时间置零。
//==============================
Drill_COAS_StateController.prototype.drill_COAS_resetTimer = function( data ){
	if( data == undefined ){ data = this._drill_data; }
	
	// > GIF - 输出数据
	this._drill_curBitmapName = "";							//输出数据 - 当前的对象名
	this._drill_curBitmapPath = data['gif_src_file'] || "";	//输出数据 - 当前的路径
	this._drill_curBitmapTint = data['tint'] || 0;			//输出数据 - 当前的色调
	this._drill_curBitmapSmooth = data['smooth'] || false;	//输出数据 - 当前的模糊
	
	// > GIF - 播放
	this._drill_curTickTime = 0;							//播放 - 当前累计时间
	this._drill_curIndex = 0;								//播放 - 当前索引
	this._drill_tarIndex = 0;								//播放 - 索引结束位置
	if( data['gif_src'] != undefined ){
		this._drill_tarIndex = data['gif_src'].length;
	}
};
//==============================
// * 状态元 - 帧刷新状态元
//
//			说明：	此处的 curIndex 为增量刷新，不是定量刷新。
//==============================
Drill_COAS_StateController.prototype.drill_COAS_updateState = function(){
	var data = this._drill_data;	
	
	// > 当前索引
	var cur_index = this._drill_curIndex;
	if( data['gif_back_run'] == true ){		//（倒放情况）
		cur_index = this._drill_curIntervalTank.length-1 -this._drill_curIndex;
	}
	if( cur_index < 0 ){ cur_index = 0; }	//【状态元 播放完毕后，保持在最后一帧，等待 状态节点 控制新的一轮。】
	if( cur_index >= this._drill_curIntervalTank.length ){ cur_index = this._drill_curIntervalTank.length-1; }
	if (this._drill_curIntervalTank.length == 0){ return; }
	
	// > 帧间隔列表
	var cur_time = this._drill_curTickTime;
	var tar_time = this._drill_curIntervalTank[ cur_index ];
	if( cur_time >= tar_time ){
		// > 当前索引+1
		this._drill_curIndex += 1;		//（达到帧间隔后，索引+1）
		this._drill_curTickTime = 0;
	}
	
	// > 输出数据
	this._drill_curBitmapName = data['gif_src'][ cur_index ];
	this._drill_curBitmapPath = data['gif_src_file'];
	this._drill_curBitmapTint = data['tint'];
	this._drill_curBitmapSmooth = data['smooth'];
	
	// > 当前累计时间+1
	this._drill_curTickTime += 1;
};


//=============================================================================
// ** 状态节点 控制器【Drill_COAS_StateNodeController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	> 定义一个专门控制状态节点的数据类。
// **					> 该类可被存到存档中。
// ** 		子功能：	->帧刷新
// **					->重设数据
// **						->序列号
// **					->输出数据
// **						> 当前的对象名（子节点的）
// **						> 当前的路径（子节点的）
// **						> 当前的色调（子节点的）
// **						> 当前的模糊（子节点的）
// **					->节点
// **						->父数据id
// **						->当前层数
// **						->当前是否为 状态元类型
// **						->当前是否为 集合类型
// **						->当前是否为 随机播放
// **						->当前是否为 顺序播放
// **					->子节点
// **						->刷新子节点
// **		
// **		说明：	> 该类的update函数需要手动调用。
// **				> 【该类在c++工具中存在 复刻类 ，修改后注意同步复刻 】
//=============================================================================
//==============================
// * 状态节点 - 定义
//==============================
function Drill_COAS_StateNodeController() {
	this.initialize.apply(this, arguments);
};
//==============================
// * 状态节点 - 初始化
//==============================
Drill_COAS_StateNodeController.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData_Node();												//初始化数据
    this.drill_initPrivateData_Node();										//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_COAS_resetData_Node( data );
};
//##############################
// * 状态节点 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_update = function(){
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_COAS_updateNode();		//帧刷新 - 集合
};
//##############################
// * 状态节点 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//					> 【重设数据 不会 重建节点】
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_resetData_Node = function( data ){
	this.drill_COAS_resetData_Node_Private( data );
};
//##############################
// * 状态节点 - 数据 - 当前的对象名【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_curBitmapName = function(){
	if( this.drill_COAS_isTypeState() ){
		return this._drill_curState.drill_COAS_curBitmapName();
	}
	if( this.drill_COAS_isTypeNode() ){
		return this._drill_curNode.drill_COAS_curBitmapName();
	}
	return "";
};
//##############################
// * 状态节点 - 数据 - 当前的路径【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_curBitmapPath = function(){
	if( this.drill_COAS_isTypeState() ){
		return this._drill_curState.drill_COAS_curBitmapPath();
	}
	if( this.drill_COAS_isTypeNode() ){
		return this._drill_curNode.drill_COAS_curBitmapPath();
	}
	return "";
};
//##############################
// * 状态节点 - 数据 - 当前的色调【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_curBitmapTint = function(){
	if( this.drill_COAS_isTypeState() ){
		return this._drill_curState.drill_COAS_curBitmapTint();
	}
	if( this.drill_COAS_isTypeNode() ){
		return this._drill_curNode.drill_COAS_curBitmapTint();
	}
	return 0;
};
//##############################
// * 状态节点 - 数据 - 当前的模糊【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_curBitmapSmooth = function(){
	if( this.drill_COAS_isTypeState() ){
		return this._drill_curState.drill_COAS_curBitmapSmooth();
	}
	if( this.drill_COAS_isTypeNode() ){
		return this._drill_curNode.drill_COAS_curBitmapSmooth();
	}
	return false;
};
//##############################
// * 状态节点 - 节点 - 当前是否为 状态元类型【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_isTypeState = function(){
	if( this._drill_curState == null ){ return false; }
	return this._drill_data['play_type'] == "随机播放状态元" || 
		this._drill_data['play_type'] == "顺序播放状态元";
};
//##############################
// * 状态节点 - 节点 - 当前是否为 集合类型【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_isTypeNode = function(){
	if( this._drill_curNode == null ){ return false; }
	return this._drill_data['play_type'] == "随机播放嵌套集合" || 
		this._drill_data['play_type'] == "顺序播放嵌套集合";
};
//##############################
// * 状态节点 - 节点 - 当前是否为 随机播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_isRandomPlay = function(){
	return this._drill_data['play_type'] == "随机播放状态元" || 
		this._drill_data['play_type'] == "随机播放嵌套集合";
};
//##############################
// * 状态节点 - 节点 - 当前是否为 顺序播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_isPlainPlay = function(){
	return this._drill_data['play_type'] == "顺序播放状态元" || 
		this._drill_data['play_type'] == "顺序播放嵌套集合";
};
//##############################
// * 状态节点 - 节点 - 设置父数据id【开放函数】
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 创建此控制器时，必须绑定父数据id（动画序列数据）。
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_setParentDataId = function( data_id ){
	this._drill_parentDataId = data_id;
};
//##############################
// * 状态节点 - 节点 - 设置当前层数【开放函数】
//			
//			参数：	> layer 数字
//			返回：	> 无
//			
//			说明：	> 创建此控制器时，必须赋值层数，用于嵌套校验。
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_setLayer = function( layer ){
	this._drill_curLayer = layer;
};
//##############################
// * 状态节点 - 节点 - 是否结束播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_isNodeEnd = function(){
	return this._drill_curIndex >= this._drill_tarIndex;
};
//##############################
// * 状态节点 - 节点 - 当前状态元优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_getCurStatePriority = function(){
	var priority = this._drill_data['priority'];
	if( this.drill_COAS_isTypeState() ){
		return Math.max( priority, this._drill_curState.drill_COAS_getCurStatePriority() );
	}
	if( this.drill_COAS_isTypeNode() ){
		return Math.max( priority, this._drill_curNode.drill_COAS_getCurStatePriority() );
	}
	return priority;
};
//##############################
// * 状态节点 - 节点 - 可被动作元打断【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_canBeInterrupted = function(){
	if( this._drill_data['canBeInterrupted'] == true ){ return true; }
	if( this.drill_COAS_isTypeState() ){
		return this._drill_curState.drill_COAS_canBeInterrupted();
	}
	if( this.drill_COAS_isTypeNode() ){
		return this._drill_curNode.drill_COAS_canBeInterrupted();
	}
	return false;
};
//##############################
// * 状态节点 - 子节点 - 刷新子节点【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//
//			说明：	重刷 当前集合的子节点 以及所有子节点集合的内容。
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_refreshNext = function(){
	this.drill_COAS_refreshNext_Private();
};
//##############################
// * 状态节点 - 子节点 - 获取当前状态元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//
//			说明：	获取到最底层 正在播放 的状态元名称。
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_getCurStateName = function(){
	if( this.drill_COAS_isTypeState() ){
		return this._drill_curState.drill_COAS_getCurStateName();
	}
	if( this.drill_COAS_isTypeNode() ){
		return this._drill_curNode.drill_COAS_getCurStateName();
	}
	return "";
};
//##############################
// * 状态节点 - 子节点 - 获取当前状态元名称（全路径）【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//
//			说明：	逐步获取节点名称，直到最底层 正在播放 的状态元名称。
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_getCurStateName_AllRoot = function(){
	var data = this._drill_data;
	if( this.drill_COAS_isTypeState() ){
		var context = data['name'];
		if( this.drill_COAS_isPlainPlay() ){
			context += "(";
			context +=  this._drill_curIndex+1;
			context += "/";
			context +=  this._drill_tarIndex;
			context += ")";
		}
		context += " > ";
		context += this._drill_curState.drill_COAS_getCurStateName();
		return context;
	}
	if( this.drill_COAS_isTypeNode() ){
		var context = data['name'];
		if( this.drill_COAS_isPlainPlay() ){
			context += "(";
			context +=  this._drill_curIndex+1;
			context += "/";
			context +=  this._drill_tarIndex;
			context += ")";
		}
		context += " > ";
		context += this._drill_curNode.drill_COAS_getCurStateName_AllRoot();
		return context;
	}
	return "";
};
//##############################
// * 状态节点 - 操作 - 播放简单状态元集合【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_setNewStateNameList = function( state_nameList ){
	if (state_nameList.length == 0){ return; }
	var data = this._drill_data;
	data['play_type'] = "随机播放状态元";
	data['play_randomStateSeq'] = state_nameList;
	//this._drill_data = data;	//（c++中，注意此处的指针，需要重新赋值）
	this.drill_COAS_refreshNext();
};
//##############################
// * 状态节点 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_COAS_StateNodeController.prototype.drill_initData_Node = function() {
	var data = this._drill_data;
	
	// > 常规
	if( data['name'] == undefined ){ data['name'] = "" };								//节点名称
	if( data['tag_tank'] == undefined ){ data['tag_tank'] = [] };						//节点标签
	if( data['priority'] == undefined ){ data['priority'] = 0 };						//节点优先级
	if( data['proportion'] == undefined ){ data['proportion'] = 40 };					//节点权重
	if( data['canBeInterrupted'] == undefined ){ data['canBeInterrupted'] = false };	//可被动作元打断
	
	// > 播放列表
	if( data['play_type'] == undefined ){ data['play_type'] = "随机播放状态元" };		//播放列表 - 播放方式
	if( data['play_randomStateSeq'] == undefined ){ data['play_randomStateSeq'] = [] };	//播放列表 - 随机播放状态元
	if( data['play_plainStateSeq'] == undefined ){ data['play_plainStateSeq'] = [] };	//播放列表 - 顺序播放状态元
	if( data['play_randomNodeSeq'] == undefined ){ data['play_randomNodeSeq'] = [] };	//播放列表 - 随机播放嵌套集合
	if( data['play_plainNodeSeq'] == undefined ){ data['play_plainNodeSeq'] = [] };		//播放列表 - 顺序播放嵌套集合
	if( data['play_randomMax'] == undefined ){ data['play_randomMax'] = 5 };			//播放列表 - 随机播放的次数上限
	
	// > 杂项
	if( data['note'] == undefined ){ data['note'] = "" };								//杂项 - 备注
	
	//this._drill_data = data;	//（c++中，注意此处的指针，需要重新赋值）
}
//==============================
// * 状态节点 - 私有数据初始化
//==============================
Drill_COAS_StateNodeController.prototype.drill_initPrivateData_Node = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;					//常规 - 当前时间
	this._drill_needDestroy = false;			//常规 - 销毁
	
	// > 节点
	this._drill_parentDataId = -1;				//节点 - 父数据ID
	this._drill_curLayer = 0;					//节点 - 当前层数
	
	// > 集合对象初始化
	//this._drill_curState = null;	//（不要置空，后续可能还会再次使用）
	//this._drill_curNode = null;
	
	// > 播放时间重置
	this.drill_COAS_resetTimer(data);
}
//==============================
// * 状态节点 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_resetData_Node_Private = function( data ){
	
	// > 播放时间重置
	this.drill_COAS_resetTimer(data);
	
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
    this.drill_initData_Node();												//初始化数据
    this.drill_initPrivateData_Node();										//私有数据初始化
}
//==============================
// * 状态节点 - 播放时间重置
//
//			说明：	特殊重置项，将播放时间置零。
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_resetTimer = function( data ){
	if( data == undefined ){ data = this._drill_data; }
	
	// > 播放
	this._drill_curIndex = 0;					//播放 - 当前索引
	this._drill_tarIndex = 0;					//播放 - 索引结束位置
	
	// > 播放 - 索引结束位置
	if( data['play_type'] == "随机播放状态元" ){
		this._drill_tarIndex = data['play_randomMax'] || 5;	//（随机播放的次数上限）
	}
	if( data['play_type'] == "顺序播放状态元" ){
		this._drill_tarIndex = data['play_plainStateSeq'].length || 0;
	}
	if( data['play_type'] == "随机播放嵌套集合" ){
		this._drill_tarIndex = data['play_randomMax'] || 5;	//（随机播放的次数上限）
	}
	if( data['play_type'] == "顺序播放嵌套集合" ){
		this._drill_tarIndex = data['play_plainNodeSeq'].length || 0;
	}
}
//==============================
// * 状态节点 - 子节点 - 刷新子节点
//
//			说明：	重刷 当前集合的子节点 以及所有子节点集合的内容。
//					（因为所有子节点 执行 resetData ）
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_refreshNext_Private = function(){
	var data = this._drill_data;
	
	// > 结束播放后，停止刷新子节点
	if( this.drill_COAS_isNodeEnd() ){ return; }
	
	if( data['play_type'] == "随机播放状态元" ){
		
		// > 准备数据
		var data_list = [];
		for( var i=0; i < data['play_randomStateSeq'].length; i++ ){
			var state_data = DrillUp.drill_COAS_getStateData( this._drill_parentDataId, data['play_randomStateSeq'][i] );
			if( state_data == undefined ){ continue; }
			data_list.push( state_data );
		}
		
		// > 随机抽取数据
		var next_data = this.drill_COAS_rollObjData( data_list );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，状态节点\""+data['name']+"\"未找到资源名列表。\n"+
				"当前为\""+data['play_type']+"\"，序列数据为：" + data['play_randomStateSeq'].join(",") + "。"
			);
			data['play_type'] = ""; 
			return;
		}
		
		// > 刷新状态元
		this.drill_COAS_refreshNextState( next_data );
	}
	if( data['play_type'] == "顺序播放状态元" ){
		
		// > 顺序抽取数据
		var next_name = data['play_plainStateSeq'][ this._drill_curIndex ];
		var next_data = DrillUp.drill_COAS_getStateData( this._drill_parentDataId, next_name );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，状态节点\""+data['name']+"\"未找到资源名列表。\n"+
				"当前为\""+data['play_type']+"\"，序列数据为：" + data['play_plainStateSeq'].join(",") + "。"
			);
			data['play_type'] = ""; 
			return;
		}
		
		// > 刷新状态元
		this.drill_COAS_refreshNextState( next_data );
	}
	
	if( data['play_type'] == "随机播放嵌套集合" ){
		
		// > 准备数据
		var data_list = [];
		for( var i=0; i < data['play_randomNodeSeq'].length; i++ ){
			var node_data = DrillUp.drill_COAS_getStateNodeData( this._drill_parentDataId, data['play_randomNodeSeq'][i] );
			if( node_data == undefined ){ continue; }
			data_list.push( node_data );
		}
		
		// > 随机抽取数据
		var next_data = this.drill_COAS_rollObjData( data_list );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，状态节点\""+data['name']+"\"未找到资源名列表。\n"+
				"当前为\""+data['play_type']+"\"，序列数据为：" + data['play_randomNodeSeq'].join(",") + "。"
			);
			data['play_type'] = ""; 
			return;
		}
		
		// > 刷新状态节点
		this.drill_COAS_refreshNextNode( next_data );
	}
	if( data['play_type'] == "顺序播放嵌套集合" ){
		
		// > 顺序抽取数据
		var next_name = data['play_plainNodeSeq'][ this._drill_curIndex ];
		var next_data = DrillUp.drill_COAS_getStateNodeData( this._drill_parentDataId, next_name );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert(
				"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
				"错误，状态节点\""+data['name']+"\"未找到资源名列表。\n"+
				"当前为\""+data['play_type']+"\"，序列数据为：" + data['play_plainNodeSeq'].join(",") + "。"
			);
			data['play_type'] = ""; 
			return;
		}
		
		// > 刷新状态节点
		this.drill_COAS_refreshNextNode( next_data );
	}
}
//==============================
// * 状态节点 - 子节点 - 根据权重随机抽取
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_rollObjData = function( objData_list ){
	if( objData_list == undefined ){ return null; }
	if( objData_list.length == 0 ){ return null; }
	if( objData_list.length == 1 ){ return objData_list[0]; }
	
	var result_data = null;
	var total_proportion = 0;
	for( var i=0; i < objData_list.length; i++ ){
		var objData = objData_list[i];
		var proportion = objData['proportion'];
		if( proportion <= 0 ){ proportion = 1; }
		total_proportion += proportion;
	}
	for( var i=0; i < objData_list.length; i++ ){
		var objData = objData_list[i];
		var proportion = objData['proportion'];
		if( proportion <= 0 ){ proportion = 1; }
		
		// > 概率命中，则返回数据
		if( Math.random() <= proportion / total_proportion ){
			return objData;
		}
		
		// > 没命中，则减去当前的概率，再进入下一轮抽取
		total_proportion -= proportion;
	}
	return result_data;
}
//==============================
// * 状态节点 - 子节点 - 重设数据 状态元
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_refreshNextState = function( next_data ){
	
	// > 创建状态元
	if( this._drill_curState == undefined ){
		this._drill_curState = new Drill_COAS_StateController( next_data );
	}
	
	// > 重设数据
	this._drill_curState.drill_COAS_resetData_State( next_data );
	this._drill_curState.drill_COAS_update();	//（设置数据后，立即强制刷新）
}
//==============================
// * 状态节点 - 子节点 - 重设数据 状态节点
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_refreshNextNode = function( next_data ){
	
	// > 检查层级
	var next_layer = this._drill_curLayer + 1;
	if( next_layer >= 20 ){		//（层级溢出，则跳出）
		this._drill_curNode = null;
		alert(
			"【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n"+
			"错误，状态节点\""+next_data['name']+"\"的嵌套出现死循环。"
		);
		return;
	}
	
	// > 创建状态节点
	if( this._drill_curNode == undefined ){
		this._drill_curNode = new Drill_COAS_StateNodeController( next_data );
	}
	
	// > 重设数据
	this._drill_curNode.drill_COAS_resetData_Node( next_data );
	this._drill_curNode.drill_COAS_setParentDataId( this._drill_parentDataId );
	this._drill_curNode.drill_COAS_setLayer( next_layer );
	this._drill_curNode.drill_COAS_refreshNext();
	this._drill_curNode.drill_COAS_update();	//（设置数据后，立即强制刷新）
}
//==============================
// * 状态节点 - 帧刷新
//
//			说明：	此处的index为增量刷新，不是定量刷新。
//==============================
Drill_COAS_StateNodeController.prototype.drill_COAS_updateNode = function(){
	var data = this._drill_data;	
	
	// > 帧刷新 状态元类型
	if( this.drill_COAS_isTypeState() ){
		this._drill_curState.drill_COAS_update();
		
		// > 等待子节点 播放结束
		if( this._drill_curState.drill_COAS_isStateEnd() == true ){
			this._drill_curIndex += 1;		//（结束后，索引+1）
			if( this.drill_COAS_isNodeEnd() == false ){
				this.drill_COAS_refreshNext();
			}
		}
	}
	
	// > 帧刷新 状态节点类型
	if( this.drill_COAS_isTypeNode() ){
		this._drill_curNode.drill_COAS_update();
		
		// > 等待子节点 播放结束
		if( this._drill_curNode.drill_COAS_isNodeEnd() == true ){
			this._drill_curIndex += 1;		//（结束后，索引+1）
			if( this.drill_COAS_isNodeEnd() == false ){
				this.drill_COAS_refreshNext();
			}
		}
	}
};


//=============================================================================
// ** 动作元 控制器【Drill_COAS_ActController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	> 定义一个专门控制 动作元 的数据类。
// **					> 该类可被存到存档中。
// ** 		子功能：	->帧刷新
// **					->重设数据
// **						->序列号
// **					->输出数据
// **						> 当前的对象名
// **						> 当前的路径
// **						> 当前的色调
// **						> 当前的模糊
// **					->节点
// **						->是否结束播放
// **					->GIF
// **						->播放（增量刷新）
// **						->帧间隔列表
// **		
// **		说明：	> 该类的update函数需要手动调用。
// **				> 【该类在c++工具中存在 复刻类 ，修改后注意同步复刻 】
//=============================================================================
//==============================
// * 动作元 - 定义
//==============================
function Drill_COAS_ActController() {
	this.initialize.apply(this, arguments);
};
//==============================
// * 动作元 - 初始化
//==============================
Drill_COAS_ActController.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData_Act();												//初始化数据
    this.drill_initPrivateData_Act();										//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_COAS_resetData_Act( data );
};
//##############################
// * 动作元 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_ActController.prototype.drill_COAS_update = function(){
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_COAS_updateAct();		//帧刷新 - 动作元
};
//##############################
// * 动作元 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_COAS_ActController.prototype.drill_COAS_resetData_Act = function( data ){
	this.drill_COAS_resetData_Act_Private( data );
};
//##############################
// * 动作元 - 输出数据 - 当前的对象名【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_ActController.prototype.drill_COAS_curBitmapName = function(){
	return this._drill_curBitmapName;
};
//##############################
// * 动作元 - 输出数据 - 当前的路径【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_ActController.prototype.drill_COAS_curBitmapPath = function(){
	return this._drill_curBitmapPath;
};
//##############################
// * 动作元 - 输出数据 - 当前的色调【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_ActController.prototype.drill_COAS_curBitmapTint = function(){
	return this._drill_curBitmapTint;
};
//##############################
// * 动作元 - 输出数据 - 当前的模糊【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_ActController.prototype.drill_COAS_curBitmapSmooth = function(){
	return this._drill_curBitmapSmooth;
};
//##############################
// * 动作元 - 节点 - 是否结束播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_ActController.prototype.drill_COAS_isActEnd = function(){
	return this._drill_curIndex >= this._drill_tarIndex;
};
//##############################
// * 动作元 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_COAS_ActController.prototype.drill_initData_Act = function() {
	var data = this._drill_data;
	
	// > 常规
	if( data['name'] == undefined ){ data['name'] = "" };										//动作元名称
	if( data['tag_tank'] == undefined ){ data['tag_tank'] = [] };								//动作元标签
	if( data['priority'] == undefined ){ data['priority'] = 0 };								//动作元优先级
	
	// > GIF
	if( data['gif_src'] == undefined ){ data['gif_src'] = [] };									//GIF - 资源
	if( data['gif_src_file'] == undefined ){ data['gif_src_file'] = "img/Special__actionSeq/"};	//GIF - 资源文件夹
	if( data['gif_intervalTank'] == undefined ){ data['gif_intervalTank'] = [] };				//GIF - 帧间隔-明细表
	if( data['gif_interval'] == undefined ){ data['gif_interval'] = 4 };						//GIF - 帧间隔
	if( data['gif_back_run'] == undefined ){ data['gif_back_run'] = false };					//GIF - 是否倒放
	if( data['gif_preload'] == undefined ){ data['gif_preload'] = false };						//GIF - 是否预加载
	
	// > 图像
	if( data['tint'] == undefined ){ data['tint'] = 0 };										//图像 - 色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };								//图像 - 模糊边缘
	
	// > 杂项
	if( data['note'] == undefined ){ data['note'] = "" };										//杂项 - 备注
	
	//this._drill_data = data;	//（c++中，注意此处的指针，需要重新赋值）
};
//==============================
// * 动作元 - 私有数据初始化
//==============================
Drill_COAS_ActController.prototype.drill_initPrivateData_Act = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;								//常规 - 当前时间
	this._drill_needDestroy = false;						//常规 - 销毁
	
	// > 播放时间重置
	this.drill_COAS_resetTimer(data);
	
	// > GIF - 帧间隔列表 计算
	this._drill_curIntervalTank = [];
	for( var i=0; i < data['gif_src'].length; i++ ){
		var interval = data['gif_interval'];
		if( i < data['gif_intervalTank'].length ){
			interval = Number(data['gif_intervalTank'][i]);
		}
		this._drill_curIntervalTank.push( Number(interval) );
	}
};
//==============================
// * 动作元 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_COAS_ActController.prototype.drill_COAS_resetData_Act_Private = function( data ){
	
	// > 播放时间重置
	this.drill_COAS_resetTimer(data);
	
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
    this.drill_initData_Act();												//初始化数据
    this.drill_initPrivateData_Act();										//私有数据初始化
};
//==============================
// * 动作元 - 播放时间重置
//
//			说明：	特殊重置项，将播放时间置零。
//==============================
Drill_COAS_ActController.prototype.drill_COAS_resetTimer = function( data ){
	if( data == undefined ){ data = this._drill_data; }
	
	// > GIF - 输出数据
	this._drill_curBitmapName = "";							//输出数据 - 当前的对象名
	this._drill_curBitmapPath = data['gif_src_file'] || "";	//输出数据 - 当前的路径
	this._drill_curBitmapTint = data['tint'] || 0;			//输出数据 - 当前的色调
	this._drill_curBitmapSmooth = data['smooth'] || false;	//输出数据 - 当前的模糊
	
	// > GIF - 播放
	this._drill_curTickTime = 0;							//播放 - 当前累计时间
	this._drill_curIndex = 0;								//播放 - 当前索引
	this._drill_tarIndex = 0;								//播放 - 索引结束位置
	if( data['gif_src'] != undefined ){
		this._drill_tarIndex = data['gif_src'].length;
	}
}
//==============================
// * 动作元 - 帧刷新动作元
//
//			说明：	此处的 curIndex 为增量刷新，不是定量刷新。
//==============================
Drill_COAS_ActController.prototype.drill_COAS_updateAct = function(){
	var data = this._drill_data;	
	
	// > 当前索引
	var cur_index = this._drill_curIndex;
	if( data['gif_back_run'] == true ){		//（倒放情况）
		cur_index = this._drill_curIntervalTank.length-1 -this._drill_curIndex;
	}
	if( cur_index < 0 ){ cur_index = 0; }	//【状态元 播放完毕后，保持在最后一帧。】
	if( cur_index >= this._drill_curIntervalTank.length ){ cur_index = this._drill_curIntervalTank.length-1; }
	if (this._drill_curIntervalTank.length == 0){ return; }
	
	// > 帧间隔列表
	var cur_time = this._drill_curTickTime;
	var tar_time = this._drill_curIntervalTank[ cur_index ];
	if( cur_time >= tar_time ){
		// > 当前索引+1
		this._drill_curIndex += 1;		//（达到帧间隔后，索引+1）
		this._drill_curTickTime = 0;
	}
	
	// > 输出数据
	this._drill_curBitmapName = data['gif_src'][ cur_index ];
	this._drill_curBitmapPath = data['gif_src_file'];
	this._drill_curBitmapTint = data['tint'];
	this._drill_curBitmapSmooth = data['smooth'];
	
	// > 当前累计时间+1
	this._drill_curTickTime += 1;
};


//=============================================================================
// ** 动画序列 主控制器【Drill_COAS_MainController】
// **
// **		索引：	COAS（可从子插件搜索到函数、类用法）
// **		来源：	独立数据
// **		实例：	> 
// **		应用：	> 见 高级战斗肖像插件 函数
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	> 定义一个专门控制动画序列的数据类。
// **					> 该类可被存到存档中。
// ** 		子功能：	->帧刷新
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->重设数据
// **						->序列号
// **					->动画序列-状态元
// **						->获取数据
// **					->动画序列-状态节点
// **						->获取数据
// **						->播放默认的状态元集合
// **						->播放状态节点
// **						->播放简单状态元集合
// **					->动画序列-动作元
// **						->获取数据
// **						->播放动作元
// **						->立刻终止动作
// **		
// **		说明：	> 该类的update函数需要手动调用。
// **				> 你可以重设数据，也可以随时new新的Drill_COAS_MainController，但是要注意销毁装饰器对象。
// **				> 【该类在c++工具中存在 复刻类 ，修改后注意同步复刻 】
//=============================================================================
//==============================
// * 动画序列 - 定义
//==============================
function Drill_COAS_MainController() {
	this.initialize.apply(this, arguments);
};
//==============================
// * 动画序列 - 初始化
//==============================
Drill_COAS_MainController.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData_Main();												//初始化数据
    this.drill_initPrivateData_Main();										//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_COAS_resetData_Main( data );
	$gameTemp._drill_COAS_lastCreatedMainController = this;					//（记录上一个动画序列）
};
//##############################
// * 动画序列 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_MainController.prototype.update = function(){ this.drill_COAS_update(); };
Drill_COAS_MainController.prototype.drill_COAS_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_COAS_updateStateNode();	//帧刷新 - 状态节点
	this.drill_COAS_updateAct();		//帧刷新 - 动作元
};
//##############################
// * 动画序列 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_resetData_Main = function( data ){
	this.drill_COAS_resetData_Main_Private( data );
};
//##############################
// * 动画序列 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 动画序列 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 动画序列 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_MainController.prototype.drill_COAS_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 动画序列 - 刷新/不刷新框架【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setBitmapRefreshFrame = function( enabled ){
	var data = this._drill_data;
	data['bitmapRefreshFrame'] = enabled;
};

//##############################
// * 动画序列-状态元 - 获取数据 - 全部【开放函数】
//			
//			参数：	> 无
//			返回：	> 数据对象列表
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getStateData_All = function(){
	return this.drill_COAS_getStateData_All_Private();
};
//##############################
// * 动画序列-状态元 - 获取数据 - 根据名称【开放函数】
//			
//			参数：	> state_name 字符串
//			返回：	> 数据对象
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getStateData_ByName = function( state_name ){
	return this.drill_COAS_getStateData_ByName_Private( state_name );
};
//##############################
// * 动画序列-状态元 - 获取数据 - 全部名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串列表
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getStateData_AllName = function(){
	return this.drill_COAS_getStateData_AllName_Private();
};

//##############################
// * 动画序列-状态节点 - 获取数据 - 全部【开放函数】
//			
//			参数：	> 无
//			返回：	> 数据对象列表
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getStateNodeData_All = function(){
	return this.drill_COAS_getStateNodeData_All_Private();
};
//##############################
// * 动画序列-状态节点 - 获取数据 - 根据名称【开放函数】
//			
//			参数：	> stateNode_name 字符串
//			返回：	> 数据对象
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getStateNodeData_ByName = function( stateNode_name ){
	return this.drill_COAS_getStateNodeData_ByName_Private( stateNode_name );
};
//##############################
// * 动画序列-状态节点 - 获取数据 - 全部名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串列表
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getStateNodeData_AllName = function(){
	return this.drill_COAS_getStateNodeData_AllName_Private();
};
//##############################
// * 动画序列-状态节点 - 操作 - 获取当前状态元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getCurStateName = function(){
	return this.drill_COAS_getCurStateName_Private();
};
//##############################
// * 动画序列-状态节点 - 操作 - 获取当前状态元名称（全路径）【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getCurStateName_AllRoot = function(){
	return this.drill_COAS_getCurStateName_AllRoot_Private();
};
//##############################
// * 动画序列-状态节点 - 操作 - 获取当前状态元优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getCurStatePriority = function(){
	return this.drill_COAS_getCurStatePriority_Private();
};
//##############################
// * 动画序列-状态节点 - 操作 - 播放默认的状态元集合【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数执行一次就重置一次，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setStateNodeDefault = function(){
	this.drill_COAS_setStateNode("默认的状态元集合");
};
//##############################
// * 动画序列-状态节点 - 操作 - 播放状态节点【开放函数】
//			
//			参数：	> node_name 字符串
//			返回：	> 无
//			
//			说明：	> 此函数执行一次就重置一次，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setStateNode = function( node_name ){
	this.drill_COAS_setStateNode_Private( node_name );
};
//##############################
// * 动画序列-状态节点 - 操作 - 播放简单状态元集合【开放函数】
//			
//			参数：	> state_nameList 字符串列表
//			返回：	> 无
//			
//			说明：	> 设置简单的状态节点，只需要状态元的 名称列表，即可随机播放状态元。
//					> 此函数执行一次就重置一次，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setSimpleStateNode = function( state_nameList ){
	this.drill_COAS_setSimpleStateNode_Private( state_nameList );
};
//##############################
// * 动画序列-状态节点 - 操作 - 播放状态元/状态节点 根据标签【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 无
//			
//			说明：	> 找到一个满足标签的状态元/状态节点，并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行一次就重置一次，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAnnotation = function( annotation ){
	return this.drill_COAS_setAnnotation_Private( annotation );
};

//##############################
// * 动画序列-动作元 - 获取数据 - 全部【开放函数】
//			
//			参数：	> 无
//			返回：	> 数据对象列表
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getActData_All = function(){
	return this.drill_COAS_getActData_All_Private();
};
//##############################
// * 动画序列-动作元 - 获取数据 - 根据名称【开放函数】
//			
//			参数：	> act_name 字符串
//			返回：	> 数据对象
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getActData_ByName = function( act_name ){
	return this.drill_COAS_getActData_ByName_Private( act_name );
};
//##############################
// * 动画序列-动作元 - 获取数据 - 全部名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串列表
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getActData_AllName = function(){
	return this.drill_COAS_getActData_AllName_Private();
};
//##############################
// * 动画序列-动作元 - 操作 - 获取当前动作元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_MainController.prototype.drill_COAS_getCurActName = function(){
	return this.drill_COAS_getCurActName_Private();
};
//##############################
// * 动画序列-动作元 - 操作 - 播放动作元【开放函数】
//			
//			参数：	> act_name 字符串
//			返回：	> 无
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAct = function( act_name ){
	this.drill_COAS_setAct_Private( act_name );
};
//##############################
// * 动画序列-动作元 - 操作 - 立刻终止动作【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COAS_MainController.prototype.drill_COAS_stopAct = function(){
	this.drill_COAS_stopAct_Private();
};

//##############################
// * 动画序列 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_COAS_MainController.prototype.drill_initData_Main = function() {
	var data = this._drill_data;
	
	// > 常规
	if( data['id'] == undefined ){ data['id'] = -1 };											//标识
	if( data['visible'] == undefined ){ data['visible'] = true };								//显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };									//暂停情况
	
	// > 容器
	if( data['state_tank'] == undefined ){ data['state_tank']=[] };								//容器 - 状态元
	if( data['stateNode_tank'] == undefined ){ data['stateNode_tank']=[] };						//容器 - 状态节点
	if( data['act_tank'] == undefined ){ data['act_tank']=[] };									//容器 - 动作元
	if( data['state_default_randomSeq'] == undefined ){ data['state_default_randomSeq']=[] };	//默认的状态元集合
	
	// > 子插件用参数
	if( data['waitForPreload'] == undefined ){ data['waitForPreload'] = true };					//加载等待
	if( data['bitmapRefreshFrame'] == undefined ){ data['bitmapRefreshFrame'] = true };			//bitmap刷新框架开关
	
	//this._drill_data = data;	//（c++中，注意此处的指针，需要重新赋值）
};
//==============================
// * 动画序列 - 私有数据初始化
//==============================
Drill_COAS_MainController.prototype.drill_initPrivateData_Main = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;										//常规 - 当前时间
	this._drill_needDestroy = false;								//常规 - 销毁
	this._drill_checkArrayEnabled = true;							//常规 - 校验数据是否为数组
	
	// > GIF - 输出数据
	this._drill_curBitmapName = "";									//输出数据 - 当前的对象名
	this._drill_curBitmapPath = "";									//输出数据 - 当前的路径
	this._drill_curBitmapTint = 0;									//输出数据 - 当前的色调
	this._drill_curBitmapSmooth = false;							//输出数据 - 当前的模糊
	
	
	// > 默认的状态元集合
	var node_data = {};
	node_data['name'] = "默认的状态元集合";
	node_data['priority'] = 0;
	node_data['proportion'] = 40;
	node_data['play_type'] = "随机播放状态元";
	node_data['play_randomStateSeq'] = data['state_default_randomSeq'];
	node_data['play_randomMax'] = 5;
	node_data['note'] = "";
	data['stateNode_tank'].push( node_data );
	//this._drill_data = data;	//（c++中，注意此处的指针，需要重新赋值）
	
	// > 状态节点
	//this._drill_node_curName = "";	//（立刻变化，没有缓冲设置）
	this._drill_node_curSerial = -1;
	this._drill_node_curController = new Drill_COAS_StateNodeController( node_data );
	this._drill_node_curController.drill_COAS_setParentDataId( data['id'] );
	this._drill_node_curController.drill_COAS_setLayer( 0 );
	
	// > 动作元
	this._drill_act_curName = "";
	this._drill_act_curSerial = -1;									
	this._drill_act_curController = new Drill_COAS_ActController();
	this._drill_act_interrupt = false;
	
	// > 数据量查看
	//alert( JSON.stringify( this ) );
};
//==============================
// * 动画序列 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_COAS_MainController.prototype.drill_COAS_resetData_Main_Private = function( data ){
	
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
    this.drill_initData_Main();												//初始化数据
    this.drill_initPrivateData_Main();										//私有数据初始化
};
//==============================
// * 动画序列 - 校验数据是否为数组
//==============================
Drill_COAS_MainController.prototype.drill_COAS_checkArray = function( arr ){
	if( this._drill_checkArrayEnabled != true ){ return; }
		
	if( Array.isArray( arr ) ){
		// > 通过
	}else{
		// > 报错提示
		alert( "【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n" +
				"接口调用错误，数组接口获取到了 非数组 参数："+ arr +" 。");
		this._drill_checkArrayEnabled = false;
	}	
};


//==============================
// * 动画序列-状态元 - 获取数据 - 全部（私有）
//
//			说明：	当前动画序列中操作的 状态元 数据。
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getStateData_All_Private = function(){
	return this._drill_data['state_tank'];
};
//==============================
// * 动画序列-状态元 - 获取数据 - 根据名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getStateData_ByName_Private = function( state_name ){
	if( state_name == "" ){ return null; }
	var data = this._drill_data;	
	for( var i=0; i < data['state_tank'].length; i++ ){
		var data_state = data['state_tank'][i];
		if( data_state['name'] == state_name ){
			return data_state;
		}
	}
	return null;
};
//==============================
// * 动画序列-状态元 - 获取数据 - 全部名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getStateData_AllName_Private = function(){
	var data = this._drill_data;
	var result_list = [];	
	for( var i=0; i < data['state_tank'].length; i++ ){
		var data_state = data['state_tank'][i];
		if( data_state['name'] != "" ){
			result_list.push( data_state['name'] );
		}
	}
	return result_list;
};


//==============================
// * 动画序列-状态节点 - 获取数据 - 全部（私有）
//
//			说明：	当前动画序列中操作的 状态节点 数据。
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getStateNodeData_All_Private = function(){
	return this._drill_data['stateNode_tank'];
};
//==============================
// * 动画序列-状态节点 - 获取数据 - 根据名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getStateNodeData_ByName_Private = function( stateNode_name ){
	if( stateNode_name == "" ){ return null; }
	var data = this._drill_data;	
	for( var i=0; i < data['stateNode_tank'].length; i++ ){
		var data_node = data['stateNode_tank'][i];
		if( data_node['name'] == stateNode_name ){
			return data_node;
		}
	}
	return null;
};
//==============================
// * 动画序列-状态节点 - 获取数据 - 全部名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getStateNodeData_AllName_Private = function(){
	var data = this._drill_data;
	var result_list = [];	
	for( var i=0; i < data['stateNode_tank'].length; i++ ){
		var data_node = data['stateNode_tank'][i];
		if( data_node['name'] != "" ){
			result_list.push( data_node['name'] );
		}
	}
	return result_list;
};
//==============================
// * 动画序列-状态节点 - 帧刷新
//==============================
Drill_COAS_MainController.prototype.drill_COAS_updateStateNode = function() {
	if( this.drill_COAS_isPlayingAct() == true ){ return; }		//动作播放时，不操作
	
	// > 动作元打断
	if( this._drill_act_interrupt == true ){
		this._drill_act_interrupt = false;
		if( this._drill_node_curController.drill_COAS_canBeInterrupted() ){
			this._drill_node_curController.drill_COAS_resetTimer();
			this._drill_node_curController.drill_COAS_refreshNext();
		}
	}
	
	// > 状态节点 数据刷新情况
	if( this._drill_node_curSerial != this._drill_node_curController._drill_controllerSerial ){
		this._drill_node_curController.drill_COAS_resetTimer();
		this._drill_node_curController.drill_COAS_refreshNext();
		this._drill_node_curSerial = this._drill_node_curController._drill_controllerSerial;
	}
	
	// > 状态节点 播放完毕情况
	if( this._drill_node_curController.drill_COAS_isNodeEnd() == true ){
		this._drill_node_curController.drill_COAS_resetTimer();
		this._drill_node_curController.drill_COAS_refreshNext();
	}
	
	// > 状态节点 帧刷新
	this._drill_node_curController.drill_COAS_update();
	this._drill_curBitmapName = this._drill_node_curController.drill_COAS_curBitmapName();
	this._drill_curBitmapPath = this._drill_node_curController.drill_COAS_curBitmapPath();
	this._drill_curBitmapTint = this._drill_node_curController.drill_COAS_curBitmapTint();
	this._drill_curBitmapSmooth = this._drill_node_curController.drill_COAS_curBitmapSmooth();
};
//==============================
// * 动画序列-状态节点 - 操作 - 获取当前状态元名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getCurStateName_Private = function(){
	return this._drill_node_curController.drill_COAS_getCurStateName();
};
//==============================
// * 动画序列-状态节点 - 操作 - 获取当前状态元名称（全路径）（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getCurStateName_AllRoot_Private = function(){
	return this._drill_node_curController.drill_COAS_getCurStateName_AllRoot();
};
//==============================
// * 动画序列-状态节点 - 操作 - 获取当前状态元优先级（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getCurStatePriority_Private = function(){
	return this._drill_node_curController.drill_COAS_getCurStatePriority();
};
//==============================
// * 动画序列-状态节点 - 操作 - 播放状态节点（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_setStateNode_Private = function( node_name ){
	var data = this._drill_data;
	var node_data = this.drill_COAS_getStateNodeData_ByName( node_name );
	if( node_data == null ){ return; }
	this._drill_node_curController.drill_COAS_resetData_Node( node_data );		//集合 - 重设数据
	this._drill_node_curController.drill_COAS_setParentDataId( data['id'] );	//集合 - 设置父数据id
	this._drill_node_curController.drill_COAS_setLayer( 0 );					//集合 - 设置当前层数
	this._drill_node_curController.drill_COAS_refreshNext();					//集合 - 刷新子节点
};
//==============================
// * 动画序列-状态节点 - 操作 - 播放简单状态元集合（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_setSimpleStateNode_Private = function( state_nameList ){
	this.drill_COAS_checkArray( state_nameList );
	this._drill_node_curController.drill_COAS_setNewStateNameList( state_nameList );
};
//==============================
// * 动画序列-状态节点 - 操作 - 播放状态元/状态节点 根据标签（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_setAnnotation_Private = function( annotation ){
	
	// > 状态节点 播放
	var stateNodeData_list = this.drill_COAS_getStateNodeData_All();
	for( var i=0; i < stateNodeData_list.length; i++ ){
		var stateNodeData = stateNodeData_list[i];
		if( stateNodeData['tag_tank'].contains( annotation ) ){
			this.drill_COAS_setStateNode( stateNodeData['name'] );
			return true;
		}
	}
	
	// > 状态元 播放
	var stateData_list = this.drill_COAS_getStateData_All();
	for( var i=0; i < stateData_list.length; i++ ){
		var stateData = stateData_list[i];
		if( stateData['tag_tank'].contains( annotation ) ){
			var name_list = [];
			name_list.push( stateData['name'] );
			this.drill_COAS_setSimpleStateNode( name_list );
			return true;
		}
	}
	
	return false;
};
//==============================
// * 动画序列-状态节点 - 操作 - 播放状态元 根据标签列表（私有）
//
//			说明：	此函数是根据 标签列表，找到 状态元列表，然后播放，结构太复杂，暂时弃用。
//==============================
/*
Drill_COAS_MainController.prototype.drill_COAS_setAnnotationList_Private = function( annotation_list ){
	
	// > 找到符合注解数量最多的状态元名
	var max_fit_count = 0;			//（最大符合数量）
	var fit_seq = [];				//（最大符合的索引列表）
	var stateData_list = this.drill_COAS_getStateData_All_Private();
	for( var i=0; i < stateData_list.length; i++ ){
		var stateData = stateData_list[i];
		var tag_tank = stateData['tag_tank'];
		if( tag_tank.length == 0 ){ continue; }
		
		// > 记录注解符合数量
		var fit_count = 0;
		for(var j=0; j < annotation_list.length; j++){
			var annotation = annotation_list[j];
			if( tag_tank.contains(annotation) == true ){
				fit_count += 1;
			}
		}
		
		// > 符合数量更大时，清空序列，重新添加
		if( fit_count > max_fit_count ){
			fit_seq = [];
			max_fit_count = fit_count;
			
			var fit = {};
			fit['index'] = i;
			fit['count'] = fit_count;
			fit['name'] = stateData['name'];
			fit_seq.push( fit );
		
		// > 符合数量相等，累计
		}else if( fit_count == max_fit_count ){
			var fit = {};
			fit['index'] = i;
			fit['count'] = fit_count;
			fit['name'] = stateData['name'];
			fit_seq.push( fit );
			
		// > 符合数量少了，跳过
		}else{
			continue; 
		}
	}
	if( fit_seq.length == 0 ){ return false; }
	
	// > 根据最大值的下标取出符合的名称
	var stateName_list = [];
	for( var i=0; i < fit_seq.length; i++ ){
		stateName_list.push( fit_seq[i]['name'] );
	}
	
	// > 播放简单状态元集合
	this.drill_COAS_setSimpleStateNode_Private( stateName_list );
	return true;
};
*/


//==============================
// * 动画序列-动作元 - 获取数据 - 全部（私有）
//
//			说明：	当前动画序列中操作的 动作元 数据。
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getActData_All_Private = function(){
	return this._drill_data['act_tank'];
};
//==============================
// * 动画序列-动作元 - 获取数据 - 根据名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getActData_ByName_Private = function( act_name ){
	if( act_name == "" ){ return null; }
	var data = this._drill_data;	
	for( var i=0; i < data['act_tank'].length; i++ ){
		var data_act = data['act_tank'][i];
		if( data_act['name'] == act_name ){
			return data_act;
		}
	}
	return null;
};
//==============================
// * 动画序列-动作元 - 获取数据 - 全部名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getActData_AllName_Private = function(){
	var data = this._drill_data;
	var result_list = [];	
	for( var i=0; i < data['act_tank'].length; i++ ){
		var data_act = data['act_tank'][i];
		if( data_act['name'] != "" ){
			result_list.push( data_act['name'] );
		}
	}
	return result_list;
};
//==============================
// * 动画序列-动作元 - 帧刷新
//==============================
Drill_COAS_MainController.prototype.drill_COAS_updateAct = function() {
	if( this.drill_COAS_isPlayingAct() == false ){ return; }	//动作未播放时，不操作
	
	// > 动作元打断 锁
	this._drill_act_interrupt = true;
	
	// > 动作元 数据刷新情况
	if( this._drill_act_curSerial != this._drill_act_curController._drill_controllerSerial ){
		var data_act = this.drill_COAS_getActData_ByName( this._drill_act_curName );
		if( data_act != undefined ){
			this._drill_act_curController.drill_COAS_resetData_Act( data_act );
		}
		this._drill_act_curSerial = this._drill_act_curController._drill_controllerSerial;
	}
	
	// > 动作元 播放完毕情况
	if( this._drill_act_curController.drill_COAS_isActEnd() == true ){
		this._drill_act_curName = "";
		this._drill_act_curSerial = -1;
	}
	
	// > 动作元 帧刷新
	this._drill_act_curController.drill_COAS_update();
	this._drill_curBitmapName = this._drill_act_curController.drill_COAS_curBitmapName();
	this._drill_curBitmapPath = this._drill_act_curController.drill_COAS_curBitmapPath();
	this._drill_curBitmapTint = this._drill_act_curController.drill_COAS_curBitmapTint();
	this._drill_curBitmapSmooth = this._drill_act_curController.drill_COAS_curBitmapSmooth();
};
//==============================
// * 动画序列-动作元 - 判断播放
//==============================
Drill_COAS_MainController.prototype.drill_COAS_isPlayingAct = function(){
	return this._drill_act_curName != "";
};
//==============================
// * 动画序列-动作元 - 操作 - 获取当前动作元名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_getCurActName_Private = function(){
	return this._drill_act_curName;
};
//==============================
// * 动画序列-动作元 - 操作 - 播放动作元（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_setAct_Private = function( act_name ){
	if( this._drill_act_curName === act_name ){ return; }
	
	// > 检查高优先级状态元
	if( this._drill_act_curName == "" ){
		var data_act = this.drill_COAS_getActData_ByName( act_name );
		var state_priority = this.drill_COAS_getCurStatePriority();
		if( state_priority > data_act['priority'] ){	//（同级的动作元可以覆盖状态元）
			return;
		}
	}
		
	// > 动作正在播放时
	if( this._drill_act_curName != "" ){
		var data_act = this.drill_COAS_getActData_ByName( act_name );
		var cur_act = this.drill_COAS_getActData_ByName( this._drill_act_curName );
		
		if( cur_act['priority'] >= data_act['priority'] ){	//（只能覆盖小的优先级，不包括同级）
			return;
		}
	}
	
	this._drill_act_curName = act_name;
};
//==============================
// * 动画序列-动作元 - 操作 - 立刻终止动作（私有）
//==============================
Drill_COAS_MainController.prototype.drill_COAS_stopAct_Private = function(){
	this._drill_act_curName = "";
	this._drill_act_curSerial = -1;
};



//=============================================================================
// ** 动画序列对象 装饰器【Drill_COAS_SpriteDecorator】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	> 定义一个专门控制动画序列的数据类。
// **					> 该类可被存到存档中。
// ** 		子功能：	->帧刷新
// **						->显示/隐藏
// **						->是否就绪
// **						->优化策略
// **						->销毁
// **					->父操作
// **						->添加父类
// **						->去除父类
// **						->外部资源重置
// **						->设置资源对象
// **						->还原资源对象
// **				
// **		说明：	> 操作父对象的bitmap。能够切换单个，还可以切换多个父类的bitmap。
// **				> 该类的update函数需要在父贴图中手动调用。
// **				> 需要执行销毁函数。
//=============================================================================
//==============================
// * 装饰器 - 定义
//==============================
function Drill_COAS_SpriteDecorator() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 装饰器 - 初始化
//==============================
Drill_COAS_SpriteDecorator.prototype.initialize = function( parent, main_controller ){
	this._drill_parents = [];								//操作的父对象
	this._drill_parents.push( parent );						//
	this._drill_parentBitmapTank = [];						//操作的bitmap
	this._drill_parentBitmapTank.push( parent.bitmap );		//
	this._drill_controller = main_controller;				//控制该对象的数据类
	this.drill_initSprite();								//对象初始化
};
//##############################
// * 装饰器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在父类中手动调用 帧刷新 执行。
//##############################
Drill_COAS_SpriteDecorator.prototype.update = function(){ this.drill_COAS_update(); }
Drill_COAS_SpriteDecorator.prototype.drill_COAS_update = function(){
	if( this.drill_COAS_isReady() == false ){ return; }
	if( this.drill_COAS_isOptimizationPassed() == false ){ return; }
	this.drill_COAS_updateParentBitmap();		//帧刷新 - 父对象
};
//##############################
// * 装饰器 - 父操作 - 添加父类【开放函数】
//			
//			参数：	> parent 父类对象
//			返回：	> 无
//			
//			说明：	> 可以多次调用，设置多个父对象。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_addParent = function( parent ){
	this.drill_COAS_addParent_Private( parent );
};
//##############################
// * 装饰器 - 父操作 - 去除父类【开放函数】
//			
//			参数：	> parent 父类对象
//			返回：	> 无
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_removeParent = function( parent ){
	this.drill_COAS_removeParent_Private( parent );
};
//##############################
// * 装饰器 - 父操作 - 外部资源重置【开放函数】
//			
//			参数：	> parent 父类对象
//					> bitmap 资源对象
//			返回：	> 无
//			
//			说明：	> 部分插件可能会对父类单图的bitmap做修改，子插件需要确保关闭动画序列后，单图能还原。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_parentBitmapChanged = function( parent, bitmap ){
	this.drill_COAS_parentBitmapChanged_Private( parent, bitmap );
};
//##############################
// * 装饰器 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里需要 考虑 延迟加载问题。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this.drill_COAS_isAllBitmapReady() == false ){ return false; }
    return true;
};
//##############################
// * 装饰器 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 装饰器 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 装饰器 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_destroy = function(){
	this.drill_COAS_destroy_Private();
};
//==============================
// * 装饰器 - 对象初始化
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_initSprite = function() {
	if( this._drill_controller == null ){ return; }
	var data = this._drill_controller._drill_data;	
	
	// > 私有变量初始化
	this._drill_COAS_stateBitmap = [];
	this._drill_COAS_actBitmap = [];
	
	// > 加载 - 状态元资源
	for(var i = 0; i < data['state_tank'].length ; i++){
		var temp_state = data['state_tank'][i];
		for(var j = 0; j < temp_state['gif_src'].length ; j++){
			var obj_bitmap = ImageManager.loadBitmap( temp_state['gif_src_file'], temp_state['gif_src'][j], temp_state['tint'], temp_state['smooth']);
			this._drill_COAS_stateBitmap.push( obj_bitmap );
		};
	};
	
	// > 加载 - 动作元资源
	for(var i = 0; i < data['act_tank'].length ; i++){
		var temp_act = data['act_tank'][i];
		for(var j = 0; j < temp_act['gif_src'].length ; j++){
			var obj_bitmap = ImageManager.loadBitmap( temp_act['gif_src_file'], temp_act['gif_src'][j], temp_act['tint'], temp_act['smooth']);
			this._drill_COAS_actBitmap.push( obj_bitmap );
		};
	};
	
	// > 测试图片
	//if( data['state_tank'].length > 0 &&
	//	data['state_tank'][0]['gif_src_bitmap'].length > 0 ){
	//	this.drill_COAS_setParentBitmap( data['state_tank'][0]['gif_src_bitmap'][0] );
	//}
};
//==============================
// * 装饰器 - 销毁（私有）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_destroy_Private = function(){
	
	// > 还原资源对象
	this.drill_COAS_resetParentBitmap();
	
	// > 清除数据
	this._drill_controller = null;
	this._drill_parents = [];
	this._drill_parentBitmapTank = [];
};
//==============================
// * 装饰器 - 判断图片加载情况
//
//			说明：	注意，此加载有 加载等待 的标记，并不是必须的。
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isAllBitmapReady = function(){
	
	// > 加载等待 标记
	var data = this._drill_controller._drill_data;	
	if( data['waitForPreload'] == false ){ return; }
	
	// > 加载判断 - 状态元资源
	for(var i = 0; i < this._drill_COAS_stateBitmap.length ; i++){
		if( this._drill_COAS_stateBitmap[i].isReady() == false ){
			return false;
		}
	};
	
	// > 加载判断 - 动作元资源
	for(var i = 0; i < this._drill_COAS_actBitmap.length ; i++){
		if( this._drill_COAS_actBitmap[i].isReady() == false ){
			return false;
		}
	};
	
	return true;
};

//==============================
// * 装饰器-父操作 - 添加父类（私有）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_addParent_Private = function( parent ){
	this._drill_parents.push( parent );
	this._drill_parentBitmapTank.push( parent.bitmap );
};
//==============================
// * 装饰器-父操作 - 去除父类（私有）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_removeParent_Private = function( parent ){
	for( var i=this._drill_parents.length-1; i >= 0; i-- ){
		if( this._drill_parents[i] == parent ){
			this._drill_parents.splice(i,1);
			this._drill_parentBitmapTank.splice(i,1);
			break;
		}
	}
};
//==============================
// * 装饰器-父操作 - 外部资源重置（私有）
//
//			说明：	部分插件可能会对父类单图的bitmap做修改，子插件需要确保关闭动画序列后，单图能还原。
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_parentBitmapChanged_Private = function( parent, bitmap ){
	for( var i=0; i < this._drill_parents.length; i++ ){
		if( this._drill_parents[i] == parent ){
			this._drill_parentBitmapTank[i] = bitmap;
			break;
		}
	}
};
//==============================
// * 装饰器-父操作 - 帧刷新
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_updateParentBitmap = function(){
	var data = this._drill_controller._drill_data;
	
	// > 设置资源对象
	if( data['visible'] == true ){
		var temp_bitmap = ImageManager.loadBitmap( 
								this._drill_controller._drill_curBitmapPath, 
								this._drill_controller._drill_curBitmapName, 
								this._drill_controller._drill_curBitmapTint, 
								this._drill_controller._drill_curBitmapSmooth );
		this.drill_COAS_setParentBitmap( temp_bitmap );
		
	// > 还原资源对象
	}else{
		this.drill_COAS_resetParentBitmap();
	}
};
//==============================
// * 装饰器-父操作 - 设置资源对象
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_setParentBitmap = function( bitmap ){
	var data = this._drill_controller._drill_data;
	for(var i=0; i < this._drill_parents.length; i++ ){
		var temp_parent = this._drill_parents[i];
		
		// > 禁止刷新框架
		if( data['bitmapRefreshFrame'] == false ){
			temp_parent._Drill_COAS_noRefreshFrame = true;	
		}
		
		temp_parent.bitmap = bitmap;
		
		if( data['bitmapRefreshFrame'] == false ){
			temp_parent._Drill_COAS_noRefreshFrame = false;
		}
	}
};
//==============================
// * 装饰器-父操作 - 还原资源对象
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_resetParentBitmap = function(){
	var data = this._drill_controller._drill_data;
	for(var i = 0; i < this._drill_parents.length; i++ ){
		var temp_parent = this._drill_parents[i];
		
		// > 禁止刷新框架
		if( data['bitmapRefreshFrame'] == false ){
			temp_parent._Drill_COAS_noRefreshFrame = true;	
		}
		
		temp_parent.bitmap = this._drill_parentBitmapTank[i];
		
		if( data['bitmapRefreshFrame'] == false ){
			temp_parent._Drill_COAS_noRefreshFrame = false;
		}
	}
};
//==============================
// * 装饰器-父操作 - 禁止刷新框架控制
//
//			说明：	切换bitmap时，默认会刷新框架，这时候会出现闪框架的问题。
//==============================
var _drill_COAS__onBitmapLoad = Sprite.prototype._onBitmapLoad;
Sprite.prototype._onBitmapLoad = function( bitmapLoaded ){
	if( this._Drill_COAS_noRefreshFrame == true ){
		this._refreshFrame = false;
	}
	_drill_COAS__onBitmapLoad.call( this, bitmapLoaded );
};



//=============================================================================
// ** 动画序列Debug窗口【Drill_COAS_DebugWindow】
//			
//			作用域：	地图界面、战斗界面、菜单界面
//			主功能：	定义一个窗口，用于描述 指定动画序列控制器 的内容信息。
//			子功能：	->控制器绑定
//						->内容显示
//						
//			说明：	> 临时的调试窗口。
//=============================================================================
//==============================
// * Debug窗口 - 定义
//==============================
function Drill_COAS_DebugWindow() {
    this.initialize.apply(this, arguments);
};
Drill_COAS_DebugWindow.prototype = Object.create(Window_Base.prototype);
Drill_COAS_DebugWindow.prototype.constructor = Drill_COAS_DebugWindow;
//==============================
// * Debug窗口 - 初始化
//==============================
Drill_COAS_DebugWindow.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 8, 8, 800, 160);	//（固定矩形范围）
	this.drill_initPrivateData();		//初始化数据
};
//==============================
// * Debug窗口 - 帧刷新
//==============================
Drill_COAS_DebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateContext();			//帧刷新 - 内容
};
//==============================
// * Debug窗口 - 窗口属性
//==============================
Drill_COAS_DebugWindow.prototype.lineHeight = function(){ return 18; };
Drill_COAS_DebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * Debug窗口 - 设置控制器（开放函数）
//==============================
Drill_COAS_DebugWindow.prototype.drill_COAS_setMainController = function( controller ){
	this._drill_mainController = controller;
};
//==============================
// * Debug窗口 - 初始化数据
//==============================
Drill_COAS_DebugWindow.prototype.drill_initPrivateData = function() {
	
	// > 控制器对象
	this._drill_mainController = null;
	
	// > 上一次内容
	this._drill_lastContext = "";
	
	// > 图片层级
	this.zIndex = 999;
	
	// > 窗口内容刷新
    this.contents.clear();
	this.createContents();
};
//==============================
// * Debug窗口 - 帧刷新内容
//==============================
Drill_COAS_DebugWindow.prototype.drill_updateContext = function() {
	if( this._drill_mainController == undefined ){ return; }
	
	// > 内容设置
	var context = "";
	context += "\\c[24]动画序列id：\\c[0]" + (this._drill_mainController._drill_data['id']+1) + "\n";
	context += "\\c[24]当前状态元：\\c[0]" + this._drill_mainController.drill_COAS_getCurStateName() + "\n";
	context += "\\c[24]当前动作元：\\c[0]" + this._drill_mainController.drill_COAS_getCurActName() + "\n";
	context += "\\c[24]当前状态节点全路径：\\c[0]\n" + this._drill_mainController.drill_COAS_getCurStateName_AllRoot() + "\n";
	
	// > 内容校验
	if( this._drill_lastContext == context ){ return; }
	this._drill_lastContext = context;
	
	// > 绘制设置
	if( Imported.Drill_CoreOfWindowAuxiliary ){
		var context_list = context.split("\n");
		var options = {
			'width':this.width,
			'lineheight':18,
			'align':"左对齐",
		};
		this.drill_COWA_drawTextListEx( context_list, options);
	}
};


//=============================================================================
// ** 核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 屏蔽根据版本重刷地图
//
//			说明：	此功能会刷掉旧存档的存储数据，因为版本不一样会强制重进地图。
//					而这样做只是 刷新旧存档的当前地图而已，没任何好处。
//==============================
Scene_Load.prototype.reloadMapIfUpdated = function() {
	// （禁止重刷）
};


