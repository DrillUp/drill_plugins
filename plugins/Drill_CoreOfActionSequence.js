//=============================================================================
// Drill_CoreOfActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        系统 - GIF动画序列核心
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
 * 该插件可以单独使用。
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
 * 小工具：
 *   (1.防止你看不见：
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *   (2.小工具能导入 行走图、序列大图、GIF文件 等资源，
 *      然后小工具能将配置转移到插件 GIF动画序列核心 中。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
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
 * [v1.6]
 * 进一步优化了动画序列底层。
 * [v1.7]
 * 优化了动画序列存储底层，子插件功能需要全部同步更新。
 * [v1.8]
 * 完善了贴图创建细节，确保设置动画序列后能立即显示预加载的图片。
 * [v1.9]
 * 更新并兼容了新的窗口字符底层。
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
 * @param ---动画序列41至60---
 * @default
 * 
 * @param 动画序列-41
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-42
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-43
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-44
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-45
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-46
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-47
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-48
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-49
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-50
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-51
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-52
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-53
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-54
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-55
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-56
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-57
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-58
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-59
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-60
 * @parent ---动画序列41至60---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param ---动画序列61至80---
 * @default
 * 
 * @param 动画序列-61
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-62
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-63
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-64
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-65
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-66
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-67
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-68
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-69
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-70
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-71
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-72
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-73
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-74
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-75
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-76
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-77
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-78
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-79
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * @param 动画序列-80
 * @parent ---动画序列61至80---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default
 * 
 */
/*~struct~DrillCOASSequence:
 * 
 * @param 标签
 * @desc 动画序列的标签名称。
 * @default 新的动画序列
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
 * @param 状态元-31
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-32
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-33
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-34
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-35
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-36
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-37
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-38
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-39
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-40
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-41
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-42
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-43
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-44
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-45
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-46
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-47
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-48
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-49
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-50
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
 * @param 状态节点-31
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-32
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-33
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-34
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-35
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-36
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-37
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-38
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-39
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-40
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-41
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-42
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-43
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-44
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-45
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-46
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-47
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-48
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-49
 * @parent ---状态节点---
 * @type struct<DrillCOASStateNode>
 * @desc 单个状态节点的列表配置。
 * @default 
 * 
 * @param 状态节点-50
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
 * @param 是否预加载
 * @parent ---GIF---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
 *
 * @param 图像-色调值
 * @parent ---GIF---
 * @type number
 * @min 0
 * @max 360
 * @desc 资源图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---GIF---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 此参数为缩放设置，设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
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
 * @param 是否预加载
 * @parent ---GIF---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
 *
 * @param 图像-色调值
 * @parent ---GIF---
 * @type number
 * @min 0
 * @max 360
 * @desc 资源图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---GIF---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 此参数为缩放设置，设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
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
//		★性能测试因素	动画序列管理层
//		★性能测试消耗	2024/1/22：
//							》动画序列管理层80事件：677.8ms（Drill_COAS_SpriteDecorator.drill_spriteMain_update）
//							》体积管理层70事件：244.8ms（Drill_COAS_SpriteDecorator.update）
//						2024/6/15：
//							》动画序列管理层80事件：34.9ms（Drill_COAS_SpriteDecorator.drill_spriteMain_update）5.8ms（Drill_COAS_MainController.update）
//							》这次测试的消耗可能被转移到了 行走图-GIF动画序列 插件中。
//		★最坏情况		无
//		★备注			主要消耗来源于图片资源加载，正常情况下消耗可能会乱指向。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//				->☆静态数据校验器
//					->空检查
//					->嵌套检查
//				->☆静态数据访问器
//					> 动画序列
//					> 状态元
//					> 状态节点
//					> 动作元
//			->☆插件指令
//			->☆预加载
//			
//			->☆核心漏洞修复
//			
//			->状态元 控制器【Drill_COAS_StateController】
//				->A主体
//				->B输出数据
//				->C播放GIF
//				->D变速播放
//			->状态节点 控制器【Drill_COAS_StateNodeController】
//				->A主体
//				->B输出数据
//				->C节点
//				->D子节点
//			->动作元 控制器【Drill_COAS_ActController】
//				->A主体
//				->B输出数据
//				->C播放GIF
//				->D变速播放
//			
//			->动画序列 主控制器【Drill_COAS_MainController】
//				->A主体
//				->B输出数据
//				->C管理状态元
//				->D管理状态节点
//				->E管理动作元
//				->F管理标签
//				->G管理装饰器
//				->H变速播放
//			->动画序列对象 装饰器【Drill_COAS_SpriteDecorator】
//				->A主体
//				->B父操作
//			
//			->动画序列Debug窗口【Drill_COAS_DebugWindow】
//		
//		
//		★家谱：
//			大家族-GIF动画序列
//			核心
//		
//		★脚本文档：
//			1.系统 > 大家族-GIF动画序列（脚本）.docx
//		
//		★插件私有类：
//			* 状态元 控制器【Drill_COAS_StateController】
//			* 状态节点 控制器【Drill_COAS_StateNodeController】
//			* 动作元 控制器【Drill_COAS_ActController】
//			* 动画序列 主控制器【Drill_COAS_MainController】
//			* 动画序列对象 装饰器【Drill_COAS_SpriteDecorator】
//			* 动画序列Debug窗口【Drill_COAS_DebugWindow】
//		
//		★核心说明：
//			1.整个核心只提供了两个分离的类，数据 和 对象。
//			  具体见类的说明。
//			2.只看这里的内容意义不大，快去看看文档、脚本文档。
//				┏┳━━━━━━━━━━━━━┓
//				┣┫█████████████┃
//				┃┃████████┏━━┓█┃
//				┣┫████████┃动┃█┃
//				┃┃████████┃画┃█┃
//				┣┫████████┃序┃█┃
//				┃┃████████┃列┃█┃
//				┣┫████████┗━━┛█┃
//				┃┃█████████████┃
//				┗┻━━━━━━━━━━━━━┛
//		
//		★必要注意事项：
//			1.如果只在一个 简单贴图 里面使用，直接new，然后手动update即可。
//				this._Drill_xxx_data = new Drill_COAS_MainController( 0 );	//（注意id为静态数据的索引号）
//				this._Drill_xxx_decorator = new Drill_COAS_SpriteDecorator( this, this._Drill_xxx_data );
//				this._Drill_xxx_data.update();
//				this._Drill_xxx_decorator.update();
//			  但是如果你需要将 二者分离，且 数据 能保存，则：
//				见插件 Drill_PictureActionSequence 或 Drill_EventActionSequence。
//			
//		★其它说明细节：
//			1. 2022/11/13：原插件只有状态元和动作元，后来引入了状态节点的结构。
//				插件的底层变化特别大，但实际使用时，变化不大。
//			2. 2023/9/5：最后我还是来了一遍大更新。不过也就只是给功能分类，不影响主体功能。弄了一整天。
//			3. 2024/1/23：为了优化存储空间，所有 data 变成了函数获取。
//			4. 2024/3/24：预加载的图片能在创建 装饰器后 立即显示，见：drill_spriteMain_initParent。
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
	DrillUp.g_COAS_PluginTip_curName = "Drill_CoreOfActionSequence.js 系统-GIF动画序列核心";
	DrillUp.g_COAS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 非数组对象
	//==============================
	DrillUp.drill_COAS_getPluginTip_NotArray = function( arr ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n接口调用错误，数组接口获取到了 非数组 参数："+arr+"。";
	};
	//==============================
	// * 提示信息 - 报错 - 动画序列 - 不是id值（initialize）
	//==============================
	DrillUp.drill_COAS_getPluginTip_Sequence_NotId = function( class_name ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，动画序列 类对象 "+class_name+" 在initialize初始化时，获取到了非数字参数，初始化失败。\n建议更新全部动画序列相关插件。";
	};
	//==============================
	// * 提示信息 - 报错 - 动画序列 - 不是id值（resetData）
	//==============================
	DrillUp.drill_COAS_getPluginTip_Sequence_NotId2 = function( class_name ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，动画序列 类对象 "+class_name+" 在resetData重置数据时，获取到了非数字参数，初始化失败。\n建议更新全部动画序列相关插件。";
	};
	//==============================
	// * 提示信息 - 报错 - 动画序列 - 没有状态元
	//==============================
	DrillUp.drill_COAS_getPluginTip_Sequence_NoState = function( seq_name, stateName_list ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，动画序列"+seq_name+"中没有状态元\""+ stateName_list.join("、") +"\"。";
	};
	//==============================
	// * 提示信息 - 报错 - 动画序列 - 没有状态节点
	//==============================
	DrillUp.drill_COAS_getPluginTip_Sequence_NoStateNode = function( seq_name, stateNodeName_list ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，动画序列"+seq_name+"中没有状态节点\""+ stateNodeName_list.join("、") +"\"。";
	};
	//==============================
	// * 提示信息 - 报错 - 状态节点 - 死循环
	//==============================
	DrillUp.drill_COAS_getPluginTip_StateNode_DeadLoop = function( node_name ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，状态节点\""+node_name+"\"的嵌套出现死循环。";
	};
	//==============================
	// * 提示信息 - 报错 - 状态节点 - 自连接
	//==============================
	DrillUp.drill_COAS_getPluginTip_StateNode_SelfConnect = function( node_name ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，状态节点\""+node_name+"\"不能自己嵌套自己。";
	};
	//==============================
	// * 提示信息 - 报错 - 状态节点 - 抽取时未找到资源
	//==============================
	DrillUp.drill_COAS_getPluginTip_StateNode_RollError = function( node_name, play_type, play_randomStateSeq ){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n错误，状态节点\""+node_name+"\"未找到资源名列表。\n"+
				"当前为\""+ play_type +"\"，序列数据为："+ play_randomStateSeq.join(",") +"。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_COAS_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_COAS_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_COAS_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfActionSequence = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfActionSequence');
	
	
	//==============================
	// * 静态数据 - 状态元
	//				（~struct~DrillCOASState）
	//==============================
	DrillUp.drill_COAS_initState = function( dataFrom ){
		var data = {};
		
		// > A主体
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
		
		// > A主体 - 杂项
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		// > B输出数据
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
	
		// > C播放GIF
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
		
		// > D声音
		//data['se_src'] = String( dataFrom["声音-声音资源"] || "");
		//data['se_delay'] = Number( dataFrom["声音-播放延迟"] || 0);
		
		return data;
	}
	//==============================
	// * 静态数据 - 状态节点
	//				（~struct~DrillCOASStateNode）
	//==============================
	DrillUp.drill_COAS_initStateNode = function( dataFrom ){
		var data = {};
		
		// > A主体
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
		
		// > A主体 - 杂项
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		// > C节点
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
		
		return data;
	}
	//==============================
	// * 静态数据 - 动作元
	//				（~struct~DrillCOASAct）
	//==============================
	DrillUp.drill_COAS_initAct = function( dataFrom ){
		var data = {};
		
		// > A主体
		data['name'] = String( dataFrom["动作元名称"] || "");
		if( dataFrom["动作元标签"] != "" &&
			dataFrom["动作元标签"] != undefined ){
			data['tag_tank'] = JSON.parse( dataFrom["动作元标签"] );
		}else{
			data['tag_tank'] = [];
		}
		data['priority'] = Number( dataFrom["动作元优先级"] || 20);
		
		// > A主体 - 杂项
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		// > B输出数据
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		// > C播放GIF
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
		
		return data;
	}
	//==============================
	// * 静态数据 - 动画序列
	//				（~struct~DrillCOASSequence）
	//==============================
	DrillUp.g_COAS_stateList_length = 50;
	DrillUp.g_COAS_stateNodeList_length = 50;
	DrillUp.g_COAS_actList_length = 20;
	DrillUp.drill_COAS_initSequence = function( dataFrom ){
		var data = {};
		
		// > A主体
		data['name'] = String( dataFrom["标签"] || "" );
		
		// > C管理状态元 - 状态元容器
		data['state_tank'] = [];
		for (var j = 0; j < DrillUp.g_COAS_stateList_length; j++) {
			if( dataFrom["状态元-" + String(j+1) ] != undefined &&
				dataFrom["状态元-" + String(j+1) ] != "" ){
				var state = JSON.parse( dataFrom["状态元-" + String(j+1)] );
				data['state_tank'][j] = DrillUp.drill_COAS_initState( state );
				data['state_tank'][j]['id'] = j;
			}else{
				data['state_tank'][j] = DrillUp.drill_COAS_initState( {} );
				data['state_tank'][j]['id'] = j;
			}
		}
		
		// > D管理状态节点 - 状态节点容器
		data['stateNode_tank'] = [];
		for (var j = 0; j < DrillUp.g_COAS_stateNodeList_length; j++) {
			if( dataFrom["状态节点-" + String(j+1) ] != undefined &&
				dataFrom["状态节点-" + String(j+1) ] != "" ){
				var state = JSON.parse( dataFrom["状态节点-" + String(j+1)] );
				data['stateNode_tank'][j] = DrillUp.drill_COAS_initStateNode( state );
				data['stateNode_tank'][j]['id'] = j;
			}else{
				data['stateNode_tank'][j] = DrillUp.drill_COAS_initStateNode( {} );
				data['stateNode_tank'][j]['id'] = j;
			}
		}
		
		// > D管理状态节点 - 默认的状态元集合
		data['state_default_randomSeq'] = [];
		if( dataFrom["默认的状态元集合"] != "" &&
			dataFrom["默认的状态元集合"] != undefined ){
			data['state_default_randomSeq'] = JSON.parse( dataFrom["默认的状态元集合"] );
		}else{
			data['state_default_randomSeq'] = [];
		}
		
		// > D管理状态节点 - 默认的状态元集合（放在最后一个）
		var default_nodeData = DrillUp.drill_COAS_initStateNode( {} );
		default_nodeData['id'] = data['stateNode_tank'].length;
		default_nodeData['name'] = "默认的状态元集合";
		default_nodeData['priority'] = 0;
		default_nodeData['proportion'] = 40;
		default_nodeData['canBeInterrupted'] = true;
		default_nodeData['play_type'] = "随机播放状态元";
		default_nodeData['play_randomStateSeq'] = data['state_default_randomSeq'];
		default_nodeData['play_randomMax'] = 5;
		data['stateNode_tank'].push( default_nodeData );
		
		
		// > E管理动作元 - 动作元容器
		data['act_tank'] = [];
		for (var j = 0; j < DrillUp.g_COAS_actList_length; j++) {
			if( dataFrom["动作元-" + String(j+1) ] != undefined &&
				dataFrom["动作元-" + String(j+1) ] != "" ){
				var act = JSON.parse( dataFrom["动作元-" + String(j+1)] );
				data['act_tank'][j] = DrillUp.drill_COAS_initAct( act );
				data['act_tank'][j]['id'] = j;
			}else{
				data['act_tank'][j] = DrillUp.drill_COAS_initAct( {} );
				data['act_tank'][j]['id'] = j;
			}
		}
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_COAS_list_length = 80;
	DrillUp.g_COAS_list = [];
	for( var i = 0; i < DrillUp.g_COAS_list_length; i++ ){
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
	// ** ☆静态数据校验器
	//
	//			说明：	> 此模块提供 动画序列、状态节点 的校验函数。
	//					  此模块只在载入插件时执行一次，见函数 "静态数据校验器 - 执行校验"。
	//					（插件完整的功能目录去看看：功能结构树）
	//=============================================================================
	//==============================
	// * 静态数据校验器 - 检查 动画序列
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
			alert( DrillUp.drill_COAS_getPluginTip_Sequence_NoState( String(sequence_data['id']+1), DrillUp.g_drill_COAS_stateMiss_list ) );
		}
		if( DrillUp.g_drill_COAS_stateNodeMiss_list.length > 0 ){
			alert( DrillUp.drill_COAS_getPluginTip_Sequence_NoStateNode( String(sequence_data['id']+1), DrillUp.g_drill_COAS_stateNodeMiss_list ) );
		}
	}
	//==============================
	// * 静态数据校验器 - 子节点空检查 状态节点
	//==============================
	DrillUp.drill_COAS_checkStateNodeMiss = function( sequence_data, stateNode_data ){
		if( sequence_data == undefined ){ return; }
		if( stateNode_data == undefined ){ return; }
		
		// > 检查状态元
		if( stateNode_data['play_type'] == "随机播放状态元" ){
			for(var i=0; i < stateNode_data['play_randomStateSeq'].length; i++ ){
				var state_name = stateNode_data['play_randomStateSeq'][i];
				if( DrillUp.drill_COAS_hasStateName( sequence_data['id'], state_name ) == false ){
					if( DrillUp.g_drill_COAS_stateMiss_list.contains( state_name ) == false ){
						DrillUp.g_drill_COAS_stateMiss_list.push( state_name );
					}
				}
			}
		}
		if( stateNode_data['play_type'] == "顺序播放状态元" ){
			for(var i=0; i < stateNode_data['play_plainStateSeq'].length; i++ ){
				var state_name = stateNode_data['play_plainStateSeq'][i];
				if( DrillUp.drill_COAS_hasStateName( sequence_data['id'], state_name ) == false ){
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
				if( DrillUp.drill_COAS_hasStateNodeName( sequence_data['id'], node_name ) == false ){
					if( DrillUp.g_drill_COAS_stateNodeMiss_list.contains( node_name ) == false ){
						DrillUp.g_drill_COAS_stateNodeMiss_list.push( node_name );
					}
				}
			}
		}
		if( stateNode_data['play_type'] == "顺序播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_plainNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_plainNodeSeq'][i];
				if( DrillUp.drill_COAS_hasStateNodeName( sequence_data['id'], node_name ) == false ){
					if( DrillUp.g_drill_COAS_stateNodeMiss_list.contains( node_name ) == false ){
						DrillUp.g_drill_COAS_stateNodeMiss_list.push( node_name );
					}
				}
			}
		}
	}
	//==============================
	// * 静态数据校验器 - 数据空检查 状态节点（未使用）
	//
	//			说明：	> 配置为空则返回false。此处未被使用，但在c++工具中有对应功能函数。
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
	// * 静态数据校验器 - 嵌套检查 状态节点
	//==============================
	DrillUp.drill_COAS_checkStateNodeRecursion = function( sequence_data, stateNode_data, layer ){
		if( sequence_data == undefined ){ return; }
		if( stateNode_data == undefined ){ return; }
		
		// > 校验
		if( layer >= 20 ){
			alert( DrillUp.drill_COAS_getPluginTip_StateNode_DeadLoop( stateNode_data['name'] ) );
			return;
		}
		
		var cur_name = stateNode_data['name'];
		
		// > 检查状态节点
		if( stateNode_data['play_type'] == "随机播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_randomNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_randomNodeSeq'][i];
				if( node_name == cur_name ){
					alert( DrillUp.drill_COAS_getPluginTip_StateNode_SelfConnect( node_name ) );
					return;
				}
				var next_node = DrillUp.drill_COAS_getStateNodeData_ByName( sequence_data, node_name );
				DrillUp.drill_COAS_checkStateNodeRecursion( sequence_data, next_node, layer+1 );
			}
		}
		if( stateNode_data['play_type'] == "顺序播放嵌套集合" ){
			for(var i=0; i < stateNode_data['play_plainNodeSeq'].length; i++ ){
				var node_name = stateNode_data['play_plainNodeSeq'][i];
				if( node_name == cur_name ){
					alert( DrillUp.drill_COAS_getPluginTip_StateNode_SelfConnect( node_name ) );
					return;
				}
				var next_node = DrillUp.drill_COAS_getStateNodeData_ByName( sequence_data, node_name );
				DrillUp.drill_COAS_checkStateNodeRecursion( sequence_data, next_node, layer+1 );
			}
		}
	};
	//==============================
	// * 静态数据校验器 - 执行校验
	//
	//			说明：	> 插件载入时，对所有 动画序列 进行一次校验检查。
	//==============================
	var _drill_COAS_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_COAS_scene_initialize.call(this);
		for(var i = 0; i < DrillUp.g_COAS_list.length; i++ ){
			var sequence_data = DrillUp.g_COAS_list[i];
			DrillUp.drill_COAS_checkSequenceData( sequence_data );
		};
	}
	
	
	//=============================================================================
	// ** ☆静态数据访问器
	//
	//			说明：	> 此模块提供 动画序列、状态元、状态节点、动作元 的获取函数。
	//					（插件完整的功能目录去看看：功能结构树）
	//=============================================================================
	//==============================
	// * 静态数据访问器 - 动画序列 - 设置（根据ID）
	//==============================
	//DrillUp.drill_COAS_setSequenceData_ById = function( sequence_id, sequence_data ){ }
	//==============================
	// * 静态数据访问器 - 动画序列 - 设置（根据名称）
	//==============================
	//DrillUp.drill_COAS_setSequenceData_ByName = function( sequence_name, sequence_data ){ }
	//==============================
	// * 静态数据访问器 - 动画序列 - 获取列表
	//
	//			说明：	> 返回值 为 静态数据列表的指针。
	//==============================
	DrillUp.drill_COAS_getSequenceData_List = function(){
		return DrillUp.g_COAS_list;
	};
	//==============================
	// * 静态数据访问器 - 动画序列 - 获取（根据ID）
	//
	//			说明：	> 返回值 为 静态数据的指针。
	//					> ID值即列表索引值，从0开始计数。
	//==============================
	DrillUp.drill_COAS_getSequenceData_ById = function( sequence_id ){
		if( sequence_id < 0 ){ return null; }
		if( sequence_id >= DrillUp.g_COAS_list.length ){ return null; }
		return DrillUp.g_COAS_list[ sequence_id ];
	};
	//==============================
	// * 静态数据访问器 - 动画序列 - 获取（根据名称）
	//
	//			说明：	> 返回值 为 静态数据的指针。
	//==============================
	DrillUp.drill_COAS_getSequenceData_ByName = function( sequence_name ){
		if( sequence_name == "" ){ return null; }
		for(var i=0; i < DrillUp.g_COAS_list.length; i++ ){
			var data = DrillUp.g_COAS_list[i];
			if( data['name'] == sequence_name ){
				return data;
			}
		}
		return null;
	};
	//==============================
	// * 静态数据访问器 - 动画序列 - 获取全部ID
	//
	//			说明：	> 返回值 为 数字列表。ID值即列表索引值，空数据不会返回ID值。
	//==============================
	DrillUp.drill_COAS_getSequenceData_AllId = function(){
		var result_list = [];
		for(var i=0; i < DrillUp.g_COAS_list.length; i++ ){
			var data = DrillUp.g_COAS_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['id'] );
		}
		return result_list;
	};
	//==============================
	// * 静态数据访问器 - 动画序列 - 获取全部名称
	//
	//			说明：	> 返回值 为 字符串列表。不含空字符串。
	//==============================
	DrillUp.drill_COAS_getSequenceData_AllName = function(){
		var result_list = [];
		for(var i=0; i < DrillUp.g_COAS_list.length; i++ ){
			var data = DrillUp.g_COAS_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['name'] );
		}
		return result_list;
	};
	
	//==============================
	// * 静态数据访问器 - 状态元 - 设置（根据ID）
	//==============================
	//DrillUp.drill_COAS_setStateData_ById = function( sequence_id, state_id, state_data ){ }
	//==============================
	// * 静态数据访问器 - 状态元 - 设置（根据名称）
	//==============================
	//DrillUp.drill_COAS_setStateData_ByName = function( sequence_id, state_name, state_data ){ }
	//==============================
	// * 静态数据访问器 - 状态元 - 获取列表
	//
	//			说明：	> 返回值 为 静态数据列表的指针。
	//==============================
	DrillUp.drill_COAS_getStateData_List = function( sequence_id ){
		var sequence_data = DrillUp.g_COAS_list[ sequence_id ];
		if( sequence_data == undefined ){ return null; }
		return sequence_data['state_tank'];
	};
	//==============================
	// * 静态数据访问器 - 状态元 - 获取（根据ID）
	//
	//			说明：	> 返回值 为 静态数据的指针。
	//					> ID值即列表索引值，从0开始计数。
	//==============================
	DrillUp.drill_COAS_getStateData_ById = function( sequence_id, state_id ){
		var sequence_data = DrillUp.g_COAS_list[ sequence_id ];
		if( sequence_data == undefined ){ return null; }
		var data = sequence_data['state_tank'][ state_id ];
		if( data == undefined ){ return null; }
		return data;
	};
	//==============================
	// * 静态数据访问器 - 状态元 - 获取（根据名称）
	//
	//			说明：	> 返回值 为 静态数据的指针。
	//==============================
	DrillUp.drill_COAS_getStateData_ByName = function( sequence_id, state_name ){
		if( state_name == "" ){ return null; }
		var sequence_data = DrillUp.drill_COAS_getSequenceData_ById( sequence_id );
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
	// * 静态数据访问器 - 状态元 - 获取全部ID
	//
	//			说明：	> 返回值 为 数字列表。ID值即列表索引值，空数据不会返回ID值。
	//==============================
	DrillUp.drill_COAS_getStateData_AllId = function( sequence_id ){
		var data_list = this.drill_COAS_getStateData_List( sequence_id );
		var result_list = [];
		for(var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['id'] );
		}
		return result_list;
	};
	//==============================
	// * 静态数据访问器 - 状态元 - 获取全部名称
	//
	//			说明：	> 返回值 为 字符串列表。不含空字符串。
	//==============================
	DrillUp.drill_COAS_getStateData_AllName = function( sequence_id ){
		var data_list = this.drill_COAS_getStateData_List( sequence_id );
		var result_list = [];
		for(var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['name'] );
		}
		return result_list;
	};
	
	//==============================
	// * 静态数据访问器 - 状态节点 - 设置（根据ID）
	//==============================
	//DrillUp.drill_COAS_setStateNodeData_ById = function( sequence_id, stateNode_id, stateNode_data ){ }
	//==============================
	// * 静态数据访问器 - 状态节点 - 设置（根据名称）
	//==============================
	//DrillUp.drill_COAS_setStateNodeData_ByName = function( sequence_id, stateNode_name, stateNode_data ){ }
	//==============================
	// * 静态数据访问器 - 状态节点 - 获取列表
	//
	//			说明：	> 返回值 为 静态数据列表的指针。
	//==============================
	DrillUp.drill_COAS_getStateNodeData_List = function( sequence_id ){
		var sequence_data = DrillUp.g_COAS_list[ sequence_id ];
		if( sequence_data == undefined ){ return null; }
		return sequence_data['stateNode_tank'];
	};
	//==============================
	// * 静态数据访问器 - 状态节点 - 获取（根据ID）
	//
	//			说明：	> 返回值 为 静态数据的指针。
	//					> ID值即列表索引值，从0开始计数。
	//==============================
	DrillUp.drill_COAS_getStateNodeData_ById = function( sequence_id, stateNode_id ){
		var sequence_data = DrillUp.g_COAS_list[ sequence_id ];
		if( sequence_data == undefined ){ return null; }
		var data = sequence_data['stateNode_tank'][ stateNode_id ];
		if( data == undefined ){ return null; }
		return data;
	};
	//==============================
	// * 静态数据访问器 - 状态节点 - 获取（根据名称）
	//
	//			说明：	> 返回值 为 静态数据的指针。
	//==============================
	DrillUp.drill_COAS_getStateNodeData_ByName = function( sequence_id, stateNode_name ){
		if( stateNode_name == "" ){ return null; }
		var sequence_data = DrillUp.drill_COAS_getSequenceData_ById( sequence_id );
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
	// * 静态数据访问器 - 状态节点 - 获取全部ID
	//
	//			说明：	> 返回值 为 数字列表。ID值即列表索引值，空数据不会返回ID值。
	//==============================
	DrillUp.drill_COAS_getStateNodeData_AllId = function( sequence_id ){
		var data_list = this.drill_COAS_getStateNodeData_List( sequence_id );
		var result_list = [];
		for(var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['id'] );
		}
		return result_list;
	};
	//==============================
	// * 静态数据访问器 - 状态节点 - 获取全部名称
	//
	//			说明：	> 返回值 为 字符串列表。不含空字符串。
	//==============================
	DrillUp.drill_COAS_getStateNodeData_AllName = function( sequence_id ){
		var data_list = this.drill_COAS_getStateNodeData_List( sequence_id );
		var result_list = [];
		for(var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['name'] );
		}
		return result_list;
	};
	
	//==============================
	// * 静态数据访问器 - 动作元 - 设置（根据ID）
	//==============================
	//DrillUp.drill_COAS_setActData_ById = function( sequence_id, act_id, act_data ){ }
	//==============================
	// * 静态数据访问器 - 动作元 - 设置（根据名称）
	//==============================
	//DrillUp.drill_COAS_setActData_ByName = function( sequence_id, act_name, act_data ){ }
	//==============================
	// * 静态数据访问器 - 动作元 - 获取列表
	//
	//			说明：	> 返回值 为 静态数据列表的指针。
	//==============================
	DrillUp.drill_COAS_getActData_List = function( sequence_id ){
		var sequence_data = DrillUp.g_COAS_list[ sequence_id ];
		if( sequence_data == undefined ){ return null; }
		return sequence_data['act_tank'];
	};
	//==============================
	// * 静态数据访问器 - 动作元 - 获取（根据ID）
	//
	//			说明：	> ID值即列表索引值，从0开始计数。
	//==============================
	DrillUp.drill_COAS_getActData_ById = function( sequence_id, act_id ){
		var sequence_data = DrillUp.g_COAS_list[ sequence_id ];
		if( sequence_data == undefined ){ return null; }
		var data = sequence_data['act_tank'][ act_id ];
		if( data == undefined ){ return null; }
		return data;
	};
	//==============================
	// * 静态数据访问器 - 动作元 - 获取（根据名称）
	//==============================
	DrillUp.drill_COAS_getActData_ByName = function( sequence_id, act_name ){
		if( act_name == "" ){ return null; }
		var sequence_data = DrillUp.drill_COAS_getSequenceData_ById( sequence_id );
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
	// * 静态数据访问器 - 动作元 - 获取全部ID
	//
	//			说明：	> 返回值 为 数字列表。ID值即列表索引值，空数据不会返回ID值。
	//==============================
	DrillUp.drill_COAS_getActData_AllId = function( sequence_id ){
		var data_list = this.drill_COAS_getActData_List( sequence_id );
		var result_list = [];
		for(var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['id'] );
		}
		return result_list;
	};
	//==============================
	// * 静态数据访问器 - 动作元 - 获取全部名称
	//
	//			说明：	> 返回值 为 字符串列表。不含空字符串。
	//==============================
	DrillUp.drill_COAS_getActData_AllName = function( sequence_id ){
		var data_list = this.drill_COAS_getActData_List( sequence_id );
		var result_list = [];
		for(var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data['name'] == "" ){ continue; }
			result_list.push( data['name'] );
		}
		return result_list;
	};
	
	//==============================
	// * 静态数据访问器 - 是否存在 动画序列名称
	//==============================
	DrillUp.drill_COAS_hasSequenceName = function( sequence_name ){
		var data = DrillUp.drill_COAS_getSequenceData_ByName( sequence_name );
		if( data == undefined ){ return false; }
		return true;
	};
	//==============================
	// * 静态数据访问器 - 是否存在 状态元名称
	//==============================
	DrillUp.drill_COAS_hasStateName = function( sequence_id, state_name ){
		var data = DrillUp.drill_COAS_getStateData_ByName( sequence_id, state_name );
		if( data == undefined ){ return false; }
		return true;
	};
	//==============================
	// * 静态数据访问器 - 是否存在 状态节点名称
	//==============================
	DrillUp.drill_COAS_hasStateNodeName = function( sequence_id, stateNode_name ){
		var data = DrillUp.drill_COAS_getStateNodeData_ByName( sequence_id, stateNode_name );
		if( data == undefined ){ return false; }
		return true;
	};
	//==============================
	// * 静态数据访问器 - 是否存在 动作元名称
	//==============================
	DrillUp.drill_COAS_hasActName = function( sequence_id, act_name ){
		var data = DrillUp.drill_COAS_getActData_ByName( sequence_id, act_name );
		if( data == undefined ){ return false; }
		return true;
	};

	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_COAS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COAS_pluginCommand.call(this, command, args);
	this.drill_COAS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_COAS_pluginCommand = function( command, args ){
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
						temp_window.drill_window_setMainController( main_controller );
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
					var name = main_controller.drill_controllerMain_Node_getCurStateName();
					alert( name );
				}
				if( temp2 == "显示当前状态元名称（全路径）" ){
					var name = main_controller.drill_controllerMain_Node_getCurStateName_AllRoot();
					alert( name );
				}
				if( temp2 == "显示全部状态元名称" ){
					var name_list = main_controller.drill_controllerMain_getStateData_AllName();
					alert( JSON.stringify(name_list) );
				}
				if( temp2 == "显示全部状态节点名称" ){
					var name_list = main_controller.drill_controllerMain_getNodeData_AllName();
					alert( JSON.stringify(name_list) );
				}
				if( temp2 == "显示全部动作元名称" ){
					var name_list = main_controller.drill_controllerMain_getActData_AllName();
					alert( JSON.stringify(name_list) );
				}
			}
		}
	}
}


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_COAS_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_COAS_preload_initialize.call(this);
	this._drill_COAS_lastCreatedMainController = null;		//（上一个创建的动画序列）
	this.drill_COAS_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_COAS_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
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
// ** ☆核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 『屏蔽根据版本重刷地图』
//
//			说明：	> 此功能会刷掉旧存档的存储数据，因为版本不一样会强制重进地图。
//					  而这样做只是 刷新旧存档的当前地图而已，没任何好处。
//					> 屏蔽后会有一些小bug（如在编辑器删除事件后读取旧存档会报错），
//					  这些bug统一在 存档管理器插件 中修复。
//==============================
Scene_Load.prototype.reloadMapIfUpdated = function() {
	// （禁止重刷）
};



//=============================================================================
// ** 状态元 控制器【Drill_COAS_StateController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	定义一个专门控制 状态元 的数据类。该类可被存到存档中。
// ** 		子功能：	
// **					->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->空的静态数据
// **						->获取静态数据
// **					->A主体
// **						->获取名称
// **						->获取优先级
// **						->可被动作元打断
// **					->B输出数据
// **						> 当前的资源名
// **						> 当前的路径
// **						> 当前的色调
// **						> 当前的模糊
// **					->C播放GIF
// **						->帧刷新（增量刷新）
// **						->帧间隔列表
// **						->播放
// **							->是否结束播放
// **							->重置播放
// **							->设置指定帧
// **					->D变速播放
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
Drill_COAS_StateController.prototype.initialize = function( sequenceData_id, stateData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ||
		typeof stateData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_StateController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_StateController") );
		return;
	}
	
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_stateData_id = stateData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerState_initData();									//初始化数据
    this.drill_controllerState_initChild();									//初始化子功能
    this.drill_controllerState_resetData( sequenceData_id, stateData_id );
};
//##############################
// * 状态元 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_update = function(){
	this.drill_controllerState_updateAttr();		//帧刷新 - A主体
													//帧刷新 - B输出数据（无）
	this.drill_controllerState_updateGIF();			//帧刷新 - C播放GIF
};
//##############################
// * 状态元 - 重设数据【标准函数】
//			
//			参数：	> sequenceData_id 数字
//					> stateData_id 数字
//			返回：	> 无
//			
//			说明：	> 此操作将重连 id对应的静态数据，并且当前控制器的所有数据都会被重置。
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_resetData = function( sequenceData_id, stateData_id ){
	this.drill_controllerState_resetData_Private( sequenceData_id, stateData_id );
};
//##############################
// * 状态元 - 空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_COAS_StateController.emptyData = {};
//##############################
// * 状态元 - 获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_COAS_StateController.prototype.drill_data = function(){
	var data = DrillUp.drill_COAS_getStateData_ById( this._drill_sequenceData_id, this._drill_stateData_id );
	if( data == undefined ){ return Drill_COAS_StateController.emptyData; }
	return data;
};

//##############################
// * 状态元 - A主体 - 获取名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_getName = function(){
	return this.drill_data()['name'];
};
//##############################
// * 状态元 - A主体 - 获取优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_getPriority = function(){
	return this.drill_data()['priority'];
};
//##############################
// * 状态元 - A主体 - 可被动作元打断【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_canBeInterrupted = function(){
	return this.drill_data()['canBeInterrupted'];
};

//##############################
// * 状态元 - B输出数据 - 当前的资源名【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_curBitmapName = function(){
	return this._drill_curBitmapName;
};
//##############################
// * 状态元 - B输出数据 - 当前的路径【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_curBitmapPath = function(){
	return this.drill_data()['gif_src_file'];
};
//##############################
// * 状态元 - B输出数据 - 当前的色调【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_curBitmapTint = function(){
	return this.drill_data()['tint'];
};
//##############################
// * 状态元 - B输出数据 - 当前的模糊【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_curBitmapSmooth = function(){
	return this.drill_data()['smooth'];
};

//##############################
// * 状态元 - C播放GIF - 是否结束播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_isEnd = function(){
	return this._drill_curIndex >= this._drill_tarIndex;
};
//##############################
// * 状态元 - C播放GIF - 重置播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 重置播放即恢复到第1帧的图像。
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_resetTimer = function(){
	this.drill_controllerState_setCurIndex_Private( 0 );
};
//##############################
// * 状态元 - C播放GIF - 设置指定帧【开放函数】
//			
//			参数：	> index 数字
//			返回：	> 无
//
//			说明：	> 如果要固定帧，需要先暂停，再设置。
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_setCurIndex = function( index ){
	this.drill_controllerState_setCurIndex_Private( index );
};

//##############################
// * 状态元 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_COAS_StateController.prototype.drill_controllerState_initData = function() {
	var data = this.drill_data();		//（此处会修改到 静态数据 的指针值）
	
	// > A主体
	if( data['name'] == undefined ){ data['name'] = "" };										//A主体 - 名称
	if( data['tag_tank'] == undefined ){ data['tag_tank'] = [] };								//A主体 - 标签
	if( data['priority'] == undefined ){ data['priority'] = 0 };								//A主体 - 优先级
	if( data['proportion'] == undefined ){ data['proportion'] = 40 };							//A主体 - 权重
	if( data['canBeInterrupted'] == undefined ){ data['canBeInterrupted'] = false };			//A主体 - 可被动作元打断
	if( data['note'] == undefined ){ data['note'] = "" };										//A主体 - 备注
	
	// > B输出数据
	if( data['tint'] == undefined ){ data['tint'] = 0 };										//B输出数据 - 色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };								//B输出数据 - 模糊边缘
	
	// > C播放GIF
	if( data['gif_src'] == undefined ){ data['gif_src'] = [] };									//C播放GIF - 资源
	if( data['gif_src_file'] == undefined ){ data['gif_src_file'] = "img/Special__actionSeq/"};	//C播放GIF - 资源文件夹
	if( data['gif_intervalTank'] == undefined ){ data['gif_intervalTank'] = [] };				//C播放GIF - 帧间隔-明细表
	if( data['gif_interval'] == undefined ){ data['gif_interval'] = 4 };						//C播放GIF - 帧间隔
	if( data['gif_back_run'] == undefined ){ data['gif_back_run'] = false };					//C播放GIF - 是否倒放
	if( data['gif_preload'] == undefined ){ data['gif_preload'] = false };						//C播放GIF - 是否预加载
	
	// > D变速播放（无）
	
	// > E声音（后续考虑，这部分可以单独分离出插件）
	//if( data['se_src'] == undefined ){ data['se_src'] = "" };									//D声音 - 声音资源
	//if( data['se_delay'] == undefined ){ data['se_delay'] = 0 };								//D声音 - 播放延迟
	
	
	//（c++中注意此处，data是堆栈对象而非指针，需要重新赋值）
};
//==============================
// * 状态元 - 初始化子功能
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_initChild = function() {
	this.drill_controllerState_initAttr();			//初始化子功能 - A主体
	this.drill_controllerState_initBitmapParam();	//初始化子功能 - B输出数据
	this.drill_controllerState_initGIF();			//初始化子功能 - C播放GIF
	this.drill_controllerState_initSpeed();			//初始化子功能 - D变速播放
};
//==============================
// * 状态元 - 重设数据（私有）
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_resetData_Private = function( sequenceData_id, stateData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ||
		typeof stateData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_StateController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_StateController") );
		return;
	}
	
	// > C播放GIF - 重置播放
	this.drill_controllerState_setCurIndex_Private( 0 );
	
	// > 执行重置
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_stateData_id = stateData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerState_initData();									//初始化数据
    this.drill_controllerState_initChild();									//初始化子功能
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_initAttr = function() {
	this._drill_curTime = 0;				//A主体 - 当前时间（暂未用到）
	this._drill_needDestroy = false;		//A主体 - 销毁（暂未用到）
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_updateAttr = function() {
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B输出数据 - 初始化子功能
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_initBitmapParam = function() {
	this._drill_curBitmapName = "";			//B输出数据 - 当前的资源名
											//B输出数据 - 当前的路径（从数据中直接获取）
											//B输出数据 - 当前的色调（从数据中直接获取）
											//B输出数据 - 当前的模糊（从数据中直接获取）
}

//==============================
// * C播放GIF - 初始化子功能
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_initGIF = function() {
	var data = this.drill_data();
	
	// > 播放参数
	this._drill_curTickTime = 0;			//播放参数 - 当前累计时间
	this._drill_curIndex = 0;				//播放参数 - 当前索引
	this._drill_tarIndex = 0;				//播放参数 - 索引结束位置
	if( data['gif_src'] != undefined ){
		this._drill_tarIndex = data['gif_src'].length;
	}
}
//==============================
// * C播放GIF - 获取帧间隔 长度
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_getIntervalLength = function(){
	return this.drill_data()['gif_src'].length;
}
//==============================
// * C播放GIF - 获取帧间隔 根据索引
//
//			说明：	> 此函数不含遍历，而是直接获取值，可以放在帧刷新中使用。
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_getIntervalByIndex = function( index ){
	var data = this.drill_data();
	if( index < 0 ){ return Number(data['gif_interval']); }		//（帧间隔列表越界，则用默认帧间隔）
	if( index >= data['gif_intervalTank'].length ){ return Number(data['gif_interval']); }
	return Number(data['gif_intervalTank'][ index ]);
}
//==============================
// * C播放GIF - 设置指定帧
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_setCurIndex_Private = function( index ){
	if( index >= this._drill_tarIndex ){
		index = this._drill_tarIndex -1;
	}
	
	// > B输出数据 - 重设对象名
	this._drill_curBitmapName = "";
	
	// > 播放参数
	this._drill_curTickTime = 0;			//播放参数 - 当前累计时间
	this._drill_curIndex = index;			//播放参数 - 当前索引
};
//==============================
// * C播放GIF - 帧刷新（状态元）
//
//			说明：	> 此处的 _drill_curIndex 为增量刷新，不是定量刷新。
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_updateGIF = function(){
	var data = this.drill_data();	
	
	// > 当前索引
	var interval_length = this.drill_controllerState_getIntervalLength();
	if( interval_length == 0 ){ return; }
	var cur_index = this._drill_curIndex;
	if( data['gif_back_run'] == true ){		//（倒放情况）
		cur_index = interval_length-1 -this._drill_curIndex;
	}
	if( cur_index < 0 ){ cur_index = 0; }	//【状态元 播放完毕后，保持在最后一帧，等待 状态节点 控制新的一轮。】
	if( cur_index >= interval_length ){ cur_index = interval_length-1; }
	
	// > 帧间隔列表
	var cur_time = this._drill_curTickTime;
	var tar_time = this.drill_controllerState_getIntervalByIndex( cur_index );
	if( cur_time >= tar_time ){
		// > 当前索引+1
		this._drill_curIndex += 1;		//（达到帧间隔后，索引+1）
		this._drill_curTickTime = 0;
	}
	
	// > B输出数据 - 记录对象名
	this._drill_curBitmapName = data['gif_src'][ cur_index ];
	
	// > 当前累计时间+1 （D变速播放）
	this._drill_curTickTime += this._drill_curSpeed;
};

//==============================
// * D变速播放 - 初始化子功能
//
//			说明：	> 最快速度也只能是每帧都播放一张图片，不会跳帧播放。
//==============================
Drill_COAS_StateController.prototype.drill_controllerState_initSpeed = function() {
	this._drill_curSpeed = 1;
};


//=============================================================================
// ** 状态节点 控制器【Drill_COAS_StateNodeController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	定义一个专门控制状态节点的数据类。该类可被存到存档中。
// ** 		子功能：	
// **					->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->空的静态数据
// **						->获取静态数据
// **					->A主体
// **						->当前是否为 状态元类型
// **						->当前是否为 集合类型
// **						->当前是否为 随机播放
// **						->当前是否为 顺序播放
// **						->当前优先级
// **						->可被动作元打断
// **					->B输出数据
// **						> 当前的资源名（子节点的）
// **						> 当前的路径（子节点的）
// **						> 当前的色调（子节点的）
// **						> 当前的模糊（子节点的）
// **					->C节点
// **						->播放
// **							->是否结束播放
// **							->重置播放
// **							->设置指定节点/状态元索引
// **						->父数据id
// **						->当前层数
// **						->播放简单状态元集合
// **					->D子节点
// **						->刷新子节点
// **						->获取当前状态元对象
// **						->获取当前状态元名称
// **						->获取当前状态元名称（全路径）
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
Drill_COAS_StateNodeController.prototype.initialize = function( sequenceData_id, stateNodeData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ||
		typeof stateNodeData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_StateNodeController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_StateNodeController") );
		return;
	}
	
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_stateNodeData_id = stateNodeData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerNode_initData();									//初始化数据
    this.drill_controllerNode_initChild();									//初始化子功能
    this.drill_controllerNode_resetData( sequenceData_id, stateNodeData_id );
};
//##############################
// * 状态节点 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_update = function(){
	this.drill_controllerNode_updateAttr();			//帧刷新 - A主体
													//帧刷新 - B输出数据（无）
	this.drill_controllerNode_updateNode();			//帧刷新 - C节点
													//帧刷新 - D子节点（无）
};
//##############################
// * 状态节点 - 重设数据【标准函数】
//			
//			参数：	> sequenceData_id 数字
//					> stateNodeData_id 数字
//			返回：	> 无
//			
//			说明：	> 此操作将重连 id对应的静态数据，并且当前控制器的所有数据都会被重置。
//					> 【重设数据 不会 重建节点】
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_resetData = function( sequenceData_id, stateNodeData_id ){
	this.drill_controllerNode_resetData_Private( sequenceData_id, stateNodeData_id );
};
//##############################
// * 状态节点 - 空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_COAS_StateNodeController.emptyData = {};
//##############################
// * 状态节点 - 获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_COAS_StateNodeController.prototype.drill_data = function(){
	var data = DrillUp.drill_COAS_getStateNodeData_ById( this._drill_sequenceData_id, this._drill_stateNodeData_id );
	if( data == undefined ){ return Drill_COAS_StateNodeController.emptyData; }
	return data;
};

//##############################
// * 状态节点 - A主体 - 当前是否为 状态元类型【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_isTypeState = function(){
	if( this._drill_curState == null ){ return false; }
	return this._drill_play_type == "随机播放状态元" || 
		this._drill_play_type == "顺序播放状态元";
};
//##############################
// * 状态节点 - A主体 - 当前是否为 集合类型【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_isTypeNode = function(){
	if( this._drill_curNode == null ){ return false; }
	return this._drill_play_type == "随机播放嵌套集合" || 
		this._drill_play_type == "顺序播放嵌套集合";
};
//##############################
// * 状态节点 - A主体 - 当前是否为 随机播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_isRandomPlay = function(){
	return this._drill_play_type == "随机播放状态元" || 
		this._drill_play_type == "随机播放嵌套集合";
};
//##############################
// * 状态节点 - A主体 - 当前是否为 顺序播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_isPlainPlay = function(){
	return this._drill_play_type == "顺序播放状态元" || 
		this._drill_play_type == "顺序播放嵌套集合";
};
//##############################
// * 状态节点 - A主体 - 当前优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_getPriority = function(){
	var priority = this.drill_data()['priority'];
	if( this.drill_controllerNode_isTypeState() ){
		return Math.max( priority, this._drill_curState.drill_controllerState_getPriority() );
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return Math.max( priority, this._drill_curNode.drill_controllerNode_getPriority() );
	}
	return priority;
};
//##############################
// * 状态节点 - A主体 - 可被动作元打断【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_canBeInterrupted = function(){
	if( this.drill_data()['canBeInterrupted'] == true ){ return true; }
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState.drill_controllerState_canBeInterrupted();
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_canBeInterrupted();
	}
	return false;
};

//##############################
// * 状态节点 - B输出数据 - 当前的资源名【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_curBitmapName = function(){
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState.drill_controllerState_curBitmapName();
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_curBitmapName();
	}
	return "";
};
//##############################
// * 状态节点 - B输出数据 - 当前的路径【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_curBitmapPath = function(){
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState.drill_controllerState_curBitmapPath();
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_curBitmapPath();
	}
	return "";
};
//##############################
// * 状态节点 - B输出数据 - 当前的色调【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_curBitmapTint = function(){
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState.drill_controllerState_curBitmapTint();
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_curBitmapTint();
	}
	return 0;
};
//##############################
// * 状态节点 - B输出数据 - 当前的模糊【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_curBitmapSmooth = function(){
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState.drill_controllerState_curBitmapSmooth();
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_curBitmapSmooth();
	}
	return false;
};

//##############################
// * 状态节点 - C节点 - 是否结束播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_isEnd = function(){
	return this._drill_curIndex >= this._drill_tarIndex;
};
//##############################
// * 状态节点 - C节点 - 重置播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 重置播放即恢复到第1帧的节点/状态元索引。
//					> 仅限当前节点，不会影响到子节点。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_resetTimer = function(){
	this.drill_controllerNode_setCurIndex_Private( 0 );
};
//##############################
// * 状态节点 - C节点 - 设置指定节点/状态元索引【开放函数】
//			
//			参数：	> index 数字
//			返回：	> 无
//
//			说明：	> 如果要固定帧，不要用该接口，去控制 状态元。
//					> 仅限当前节点，不会影响到子节点。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_setCurIndex = function( index ){
	this.drill_controllerNode_setCurIndex_Private( index );
};
//##############################
// * 状态节点 - C节点 - 设置当前层数【开放函数】
//			
//			参数：	> layer 数字
//			返回：	> 无
//			
//			说明：	> 创建此控制器时，必须赋值层数，用于嵌套校验。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_setLayer = function( layer ){
	this._drill_curLayer = layer;
};
//##############################
// * 状态节点 - C节点 - 播放简单状态元集合【开放函数】
//			
//			参数：	> state_nameList 字符串列表
//			返回：	> 无
//##############################
Drill_COAS_StateNodeController.prototype.drill_COAS_setNewStateNameList = function( state_nameList ){
	if( state_nameList.length == 0 ){ return; }
	
	this._drill_play_type = "随机播放状态元";
	this._drill_play_randomStateSeq = state_nameList;
	
	this.drill_controllerNode_resetTimer();		//（重置播放）
	this.drill_controllerNode_refreshNext();	//（刷新子节点）
};

//##############################
// * 状态节点 - D子节点 - 刷新子节点【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 重刷 当前集合的子节点 以及所有子节点集合的内容。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_refreshNext = function(){
	this.drill_controllerNode_refreshNext_Private();
};
//##############################
// * 状态节点 - D子节点 - 获取当前状态元对象【开放函数】
//			
//			参数：	> 无
//			返回：	> 控制器对象
//
//			说明：	> 获取到节点叶子 正在播放 的状态元对象。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_getState = function(){
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState;
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_getState();
	}
	return null;
};
//##############################
// * 状态节点 - D子节点 - 获取当前状态元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//
//			说明：	> 获取到节点叶子 正在播放 的状态元名称。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_getStateName = function(){
	if( this.drill_controllerNode_isTypeState() ){
		return this._drill_curState.drill_controllerState_getName();
	}
	if( this.drill_controllerNode_isTypeNode() ){
		return this._drill_curNode.drill_controllerNode_getStateName();
	}
	return "";
};
//##############################
// * 状态节点 - D子节点 - 获取当前状态元名称（全路径）【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//
//			说明：	> 逐步获取节点名称，直到最底层 正在播放 的状态元名称。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_getStateName_AllRoot = function(){
	var data = this.drill_data();
	if( this.drill_controllerNode_isTypeState() ){
		var context = data['name'];
		if( this.drill_controllerNode_isPlainPlay() ){
			context += "(";
			context +=  this._drill_curIndex+1;
			context += "/";
			context +=  this._drill_tarIndex;
			context += ")";
		}
		context += " > ";
		context += this._drill_curState.drill_controllerState_getName();
		return context;
	}
	if( this.drill_controllerNode_isTypeNode() ){
		var context = data['name'];
		if( this.drill_controllerNode_isPlainPlay() ){
			context += "(";
			context +=  this._drill_curIndex+1;
			context += "/";
			context +=  this._drill_tarIndex;
			context += ")";
		}
		context += " > ";
		context += this._drill_curNode.drill_controllerNode_getStateName_AllRoot();
		return context;
	}
	return "";
};

//##############################
// * 状态节点 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_COAS_StateNodeController.prototype.drill_controllerNode_initData = function() {
	var data = this.drill_data();		//（此处会修改到 静态数据 的指针值）
	
	// > A主体
	if( data['name'] == undefined ){ data['name'] = "" };								//A主体 - 名称
	if( data['tag_tank'] == undefined ){ data['tag_tank'] = [] };						//A主体 - 标签
	if( data['priority'] == undefined ){ data['priority'] = 0 };						//A主体 - 优先级
	if( data['proportion'] == undefined ){ data['proportion'] = 40 };					//A主体 - 权重
	if( data['canBeInterrupted'] == undefined ){ data['canBeInterrupted'] = false };	//A主体 - 可被动作元打断
	if( data['note'] == undefined ){ data['note'] = "" };								//A主体 - 备注
	
	// > B输出数据（无）
	
	// > C节点
	if( data['play_type'] == undefined ){ data['play_type'] = "随机播放状态元" };		//C节点 - 播放方式
	if( data['play_randomStateSeq'] == undefined ){ data['play_randomStateSeq'] = [] };	//C节点 - 随机播放状态元
	if( data['play_plainStateSeq'] == undefined ){ data['play_plainStateSeq'] = [] };	//C节点 - 顺序播放状态元
	if( data['play_randomNodeSeq'] == undefined ){ data['play_randomNodeSeq'] = [] };	//C节点 - 随机播放嵌套集合
	if( data['play_plainNodeSeq'] == undefined ){ data['play_plainNodeSeq'] = [] };		//C节点 - 顺序播放嵌套集合
	if( data['play_randomMax'] == undefined ){ data['play_randomMax'] = 5 };			//C节点 - 随机播放的次数上限
	
	// > D子节点（无）
	
	
	//（c++中注意此处，data是堆栈对象而非指针，需要重新赋值）
}
//==============================
// * 状态节点 - 初始化子功能
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_initChild = function() {
	this.drill_controllerNode_initAttr();			//初始化子功能 - A主体
	this.drill_controllerNode_initBitmapParam();	//初始化子功能 - B输出数据
	this.drill_controllerNode_initNode();			//初始化子功能 - C节点
	this.drill_controllerNode_initNext();			//初始化子功能 - D子节点
}
//==============================
// * 状态节点 - 重设数据（私有）
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_resetData_Private = function( sequenceData_id, stateNodeData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ||
		typeof stateNodeData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_StateNodeController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_StateNodeController") );
		return;
	}
	
	// > C节点 - 重置播放
	this.drill_controllerNode_setCurIndex_Private( 0 );
	
	// > 执行重置
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_stateNodeData_id = stateNodeData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerNode_initData();									//初始化数据
    this.drill_controllerNode_initChild();									//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_initAttr = function() {
	this._drill_curTime = 0;				//A主体 - 当前时间（暂未用到）
	this._drill_needDestroy = false;		//A主体 - 销毁（暂未用到）
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_updateAttr = function() {
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B输出数据 - 初始化子功能
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_initBitmapParam = function() {
											//B输出数据 - 当前的资源名（通过函数获取）
											//B输出数据 - 当前的路径（通过函数获取）
											//B输出数据 - 当前的色调（通过函数获取）
											//B输出数据 - 当前的模糊（通过函数获取）
}

//==============================
// * C节点 - 初始化子功能
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_initNode = function() {
	var data = this.drill_data();
	
	// > 数据赋值
	this._drill_play_type = data['play_type'];
	this._drill_play_randomStateSeq = JSON.parse(JSON.stringify( data['play_randomStateSeq'] ));
	this._drill_play_plainStateSeq = JSON.parse(JSON.stringify( data['play_plainStateSeq'] ));
	this._drill_play_randomNodeSeq = JSON.parse(JSON.stringify( data['play_randomNodeSeq'] ));
	this._drill_play_plainNodeSeq = JSON.parse(JSON.stringify( data['play_plainNodeSeq'] ));
	this._drill_play_randomMax = data['play_randomMax'] || 5;
	
	this._drill_curLayer = 0;					//C节点 - 当前层数
	
	this._drill_curIndex = 0;					//C节点 - 播放 - 当前索引
	this._drill_tarIndex = 0;					//C节点 - 播放 - 索引结束位置
	
	// > 播放 - 索引结束位置
	if( this._drill_play_type == "随机播放状态元" ){
		this._drill_tarIndex = this._drill_play_randomMax;	//（随机播放的次数上限）
	}
	if( this._drill_play_type == "顺序播放状态元" ){
		this._drill_tarIndex = this._drill_play_plainStateSeq.length;
	}
	if( this._drill_play_type == "随机播放嵌套集合" ){
		this._drill_tarIndex = this._drill_play_randomMax;	//（随机播放的次数上限）
	}
	if( this._drill_play_type == "顺序播放嵌套集合" ){
		this._drill_tarIndex = this._drill_play_plainNodeSeq.length;
	}
}
//==============================
// * C节点 - 设置指定节点/状态元索引
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_setCurIndex_Private = function( index ){
	if( index >= this._drill_tarIndex ){
		index = this._drill_tarIndex -1;
	}
	
	// > 播放参数
	this._drill_curIndex = index;			//播放参数 - 当前索引
}
//==============================
// * C节点 - 帧刷新（状态节点）
//
//			说明：	> 此处的 _drill_curIndex 为增量刷新，不是定量刷新。
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_updateNode = function(){
	var data = this.drill_data();
	
	// > 帧刷新 状态元类型
	if( this.drill_controllerNode_isTypeState() ){
		this._drill_curState.drill_controllerState_update();
		
		// > 等待子节点 播放结束
		if( this._drill_curState.drill_controllerState_isEnd() == true ){
			this._drill_curIndex += 1;		//（结束后，索引+1）
			if( this.drill_controllerNode_isEnd() == false ){
				this.drill_controllerNode_refreshNext();
			}
		}
	}
	
	// > 帧刷新 状态节点类型
	if( this.drill_controllerNode_isTypeNode() ){
		this._drill_curNode.drill_controllerNode_update();
		
		// > 等待子节点 播放结束
		if( this._drill_curNode.drill_controllerNode_isEnd() == true ){
			this._drill_curIndex += 1;		//（结束后，索引+1）
			if( this.drill_controllerNode_isEnd() == false ){
				this.drill_controllerNode_refreshNext();
			}
		}
	}
};

//==============================
// * D子节点 - 初始化子功能
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_initNext = function() {
	
	// > 集合对象初始化
	//this._drill_curState = null;	//（此处不要置空，重设数据时可能还会再次使用）
	//this._drill_curNode = null;
}
//==============================
// * D子节点 - 刷新子节点
//
//			说明：	重刷 当前集合的子节点 以及所有子节点集合的内容。
//					（因为所有子节点 执行 resetData ）
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_refreshNext_Private = function(){
	var data = this.drill_data();
	var parent_id = this._drill_sequenceData_id;
	
	// > 结束播放后，停止刷新子节点
	if( this.drill_controllerNode_isEnd() ){ return; }
	
	if( this._drill_play_type == "随机播放状态元" ){
		
		// > 准备数据
		var data_list = [];
		for( var i=0; i < this._drill_play_randomStateSeq.length; i++ ){
			var state_data = DrillUp.drill_COAS_getStateData_ByName( parent_id, this._drill_play_randomStateSeq[i] );
			if( state_data == undefined ){ continue; }
			data_list.push( state_data );
		}
		
		// > 随机抽取数据
		var next_data = this.drill_controllerNode_nextRollObjData( data_list );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert( DrillUp.drill_COAS_getPluginTip_StateNode_RollError( data['name'], this._drill_play_type, this._drill_play_randomStateSeq ) );
			this._drill_play_type = ""; 
			return;
		}
		
		// > 刷新状态元
		this.drill_controllerNode_refreshNextState( parent_id, next_data['id'] );
	}
	else if( this._drill_play_type == "顺序播放状态元" ){
		
		// > 顺序抽取数据
		var next_name = this._drill_play_plainStateSeq[ this._drill_curIndex ];
		var next_data = DrillUp.drill_COAS_getStateData_ByName( parent_id, next_name );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert( DrillUp.drill_COAS_getPluginTip_StateNode_RollError( data['name'], this._drill_play_type, this._drill_play_plainStateSeq ) );
			this._drill_play_type = ""; 
			return;
		}
		
		// > 刷新状态元
		this.drill_controllerNode_refreshNextState( parent_id, next_data['id'] );
	}
	
	else if( this._drill_play_type == "随机播放嵌套集合" ){
		
		// > 准备数据
		var data_list = [];
		for( var i=0; i < this._drill_play_randomNodeSeq.length; i++ ){
			var node_data = DrillUp.drill_COAS_getStateNodeData_ByName( parent_id, this._drill_play_randomNodeSeq[i] );
			if( node_data == undefined ){ continue; }
			data_list.push( node_data );
		}
		
		// > 随机抽取数据
		var next_data = this.drill_controllerNode_nextRollObjData( data_list );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert( DrillUp.drill_COAS_getPluginTip_StateNode_RollError( data['name'], this._drill_play_type, this._drill_play_randomNodeSeq ) );
			this._drill_play_type = ""; 
			return;
		}
		
		// > 刷新状态节点
		this.drill_controllerNode_refreshNextNode( parent_id, next_data['id'] );
	}
	else if( this._drill_play_type == "顺序播放嵌套集合" ){
		
		// > 顺序抽取数据
		var next_name = this._drill_play_plainNodeSeq[ this._drill_curIndex ];
		var next_data = DrillUp.drill_COAS_getStateNodeData_ByName( parent_id, next_name );
		if( next_data == undefined ){	//（空数据时直接报错提示）
			alert( DrillUp.drill_COAS_getPluginTip_StateNode_RollError( data['name'], this._drill_play_type, this._drill_play_plainNodeSeq ) );
			this._drill_play_type = ""; 
			return;
		}
		
		// > 刷新状态节点
		this.drill_controllerNode_refreshNextNode( parent_id, next_data['id'] );
	}
}
//==============================
// * D子节点 - 刷新子节点 - 根据权重随机抽取
//
//			说明：	> 传入静态数据列表，返回一个静态数据的指针。
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_nextRollObjData = function( objData_list ){
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
		var randomValue_proportion = Math.random();				//『随机因子-图像用』
		if( randomValue_proportion * total_proportion <= proportion ){
			return objData;
		}
		
		// > 没命中，则减去当前的概率，再进入下一轮抽取
		total_proportion -= proportion;
	}
	return result_data;
}
//==============================
// * D子节点 - 刷新子节点 - 重设数据 状态元
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_refreshNextState = function( sequenceData_id, next_stateData_id ){
	
	// > 创建状态元
	if( this._drill_curState == undefined ){
		this._drill_curState = new Drill_COAS_StateController( sequenceData_id, next_stateData_id );
	}
	
	// > 重设数据
	this._drill_curState.drill_controllerState_resetData( sequenceData_id, next_stateData_id );
	this._drill_curState.drill_controllerState_update();	//（设置数据后，立即强制刷新）
	
	// > 置空（重设数据后，不要同时存两组对象，节约存储空间）
	this._drill_curNode = null;
}
//==============================
// * D子节点 - 刷新子节点 - 重设数据 状态节点
//==============================
Drill_COAS_StateNodeController.prototype.drill_controllerNode_refreshNextNode = function( sequenceData_id, next_nodeData_id ){
	
	// > 检查层级
	var next_layer = this._drill_curLayer + 1;
	if( next_layer >= 20 ){		//（层级溢出，则跳出）
		this._drill_curNode = null;
		alert( DrillUp.drill_COAS_getPluginTip_StateNode_DeadLoop( this.drill_data()['name'] ) );
		return;
	}
	
	// > 创建状态节点
	if( this._drill_curNode == undefined ){
		this._drill_curNode = new Drill_COAS_StateNodeController( sequenceData_id, next_nodeData_id );
	}
	
	// > 重设数据
	this._drill_curNode.drill_controllerNode_resetData( sequenceData_id, next_nodeData_id );
	this._drill_curNode.drill_controllerNode_setLayer( next_layer );
	this._drill_curNode.drill_controllerNode_refreshNext();
	this._drill_curNode.drill_controllerNode_update();	//（设置数据后，立即强制刷新）
	
	// > 置空（重设数据后，不要同时存两组对象，节约存储空间）
	this._drill_curState = null;
}


//=============================================================================
// ** 动作元 控制器【Drill_COAS_ActController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	定义一个专门控制 动作元 的数据类。该类可被存到存档中。
// ** 		子功能：	
// **					->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->空的静态数据
// **						->获取静态数据
// **					->A主体
// **						->获取名称
// **						->获取优先级
// **					->B输出数据
// **						> 当前的资源名
// **						> 当前的路径
// **						> 当前的色调
// **						> 当前的模糊
// **					->C播放GIF
// **						->帧刷新（增量刷新）
// **						->帧间隔列表
// **						->播放
// **							->是否结束播放
// **							->重置播放
// **							->设置指定帧
// **					->D变速播放
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
Drill_COAS_ActController.prototype.initialize = function( sequenceData_id, actData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ||
		typeof actData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_ActController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_ActController") );
		return;
	}
	
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_actData_id = actData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerAct_initData();									//初始化数据
    this.drill_controllerAct_initChild();									//初始化子功能
    this.drill_controllerAct_resetData( sequenceData_id, actData_id );
};
//##############################
// * 动作元 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_update = function(){
	this.drill_controllerAct_updateAttr();		//帧刷新 - A主体
												//帧刷新 - B输出数据（无）
	this.drill_controllerAct_updateGIF();		//帧刷新 - C播放GIF
												//帧刷新 - D变速播放（无）
};
//##############################
// * 动作元 - 重设数据【标准函数】
//			
//			参数：	> sequenceData_id 数字
//					> actData_id 数字
//			返回：	> 无
//			
//			说明：	> 此操作将重连 id对应的静态数据，并且当前控制器的所有数据都会被重置。
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_resetData = function( sequenceData_id, actData_id ){
	this.drill_controllerAct_resetData_Private( sequenceData_id, actData_id );
};
//##############################
// * 动作元 - 空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_COAS_ActController.emptyData = {};
//##############################
// * 动作元 - 获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_COAS_ActController.prototype.drill_data = function(){
	var data = DrillUp.drill_COAS_getActData_ById( this._drill_sequenceData_id, this._drill_actData_id );
	if( data == undefined ){ return Drill_COAS_ActController.emptyData; }
	return data;
};

//##############################
// * 动作元 - A主体 - 获取名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_getName = function(){
	return this.drill_data()['name'];
};
//##############################
// * 动作元 - A主体 - 获取优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_getPriority = function(){
	return this.drill_data()['priority'];
};

//##############################
// * 动作元 - B输出数据 - 当前的资源名【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_curBitmapName = function(){
	return this._drill_curBitmapName;
};
//##############################
// * 动作元 - B输出数据 - 当前的路径【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_curBitmapPath = function(){
	return this.drill_data()['gif_src_file'];
};
//##############################
// * 动作元 - B输出数据 - 当前的色调【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_curBitmapTint = function(){
	return this.drill_data()['tint'];
};
//##############################
// * 动作元 - B输出数据 - 当前的模糊【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_curBitmapSmooth = function(){
	return this.drill_data()['smooth'];
};

//##############################
// * 动作元 - C播放GIF - 是否结束播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_isEnd = function(){
	return this._drill_curIndex >= this._drill_tarIndex;
};
//##############################
// * 动作元 - C播放GIF - 重置播放【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 重置播放即恢复到第1帧的图像。
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_resetTimer = function(){
	this.drill_controllerAct_setCurIndex_Private( 0 );
};
//##############################
// * 动作元 - C播放GIF - 设置指定帧【开放函数】
//			
//			参数：	> index 数字
//			返回：	> 无
//
//			说明：	> 如果要固定帧，需要先暂停，再设置。
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_setCurIndex = function( index ){
	this.drill_controllerAct_setCurIndex_Private( index );
};

//##############################
// * 动作元 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_COAS_ActController.prototype.drill_controllerAct_initData = function() {
	var data = this.drill_data();		//（此处会修改到 静态数据 的指针值）
	
	// > A主体
	if( data['name'] == undefined ){ data['name'] = "" };										//A主体 - 名称
	if( data['tag_tank'] == undefined ){ data['tag_tank'] = [] };								//A主体 - 标签
	if( data['priority'] == undefined ){ data['priority'] = 0 };								//A主体 - 优先级
	if( data['note'] == undefined ){ data['note'] = "" };										//A主体 - 备注
	
	// > B输出数据
	if( data['tint'] == undefined ){ data['tint'] = 0 };										//B输出数据 - 色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };								//B输出数据 - 模糊边缘
	
	// > C播放GIF
	if( data['gif_src'] == undefined ){ data['gif_src'] = [] };									//C播放GIF - 资源
	if( data['gif_src_file'] == undefined ){ data['gif_src_file'] = "img/Special__actionSeq/"};	//C播放GIF - 资源文件夹
	if( data['gif_intervalTank'] == undefined ){ data['gif_intervalTank'] = [] };				//C播放GIF - 帧间隔-明细表
	if( data['gif_interval'] == undefined ){ data['gif_interval'] = 4 };						//C播放GIF - 帧间隔
	if( data['gif_back_run'] == undefined ){ data['gif_back_run'] = false };					//C播放GIF - 是否倒放
	if( data['gif_preload'] == undefined ){ data['gif_preload'] = false };						//C播放GIF - 是否预加载
	
	// > D变速播放（无）
	
	
	//（c++中注意此处，data是堆栈对象而非指针，需要重新赋值）
};
//==============================
// * 动作元 - 初始化子功能
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_initChild = function() {
	this.drill_controllerAct_initAttr();			//初始化子功能 - A主体
	this.drill_controllerAct_initBitmapParam();		//初始化子功能 - B输出数据
	this.drill_controllerAct_initGIF();				//初始化子功能 - C播放GIF
	this.drill_controllerAct_initSpeed();			//初始化子功能 - D变速播放
};
//==============================
// * 动作元 - 重设数据（私有）
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_resetData_Private = function( sequenceData_id, actData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ||
		typeof actData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_ActController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_ActController") );
		return;
	}
	
	// > C播放GIF - 重置播放
	this.drill_controllerAct_setCurIndex_Private( 0 );
	
	// > 执行重置
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_actData_id = actData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerAct_initData();									//初始化数据
    this.drill_controllerAct_initChild();									//初始化子功能
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_initAttr = function() {
	this._drill_curTime = 0;				//A主体 - 当前时间（暂未用到）
	this._drill_needDestroy = false;		//A主体 - 销毁（暂未用到）
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_updateAttr = function() {
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B输出数据 - 初始化子功能
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_initBitmapParam = function() {
	this._drill_curBitmapName = "";			//B输出数据 - 当前的资源名
											//B输出数据 - 当前的路径（从数据中直接获取）
											//B输出数据 - 当前的色调（从数据中直接获取）
											//B输出数据 - 当前的模糊（从数据中直接获取）
}

//==============================
// * C播放GIF - 初始化子功能
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_initGIF = function() {
	var data = this.drill_data();
	
	// > 播放参数
	this._drill_curTickTime = 0;			//播放参数 - 当前累计时间
	this._drill_curIndex = 0;				//播放参数 - 当前索引
	this._drill_tarIndex = 0;				//播放参数 - 索引结束位置
	if( data['gif_src'] != undefined ){
		this._drill_tarIndex = data['gif_src'].length;
	}
}
//==============================
// * C播放GIF - 获取帧间隔 长度
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_getIntervalLength = function(){
	return this.drill_data()['gif_src'].length;
}
//==============================
// * C播放GIF - 获取帧间隔 根据索引
//
//			说明：	> 此函数不含遍历，而是直接获取值，可以放在帧刷新中使用。
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_getIntervalByIndex = function( index ){
	var data = this.drill_data();
	if( index < 0 ){ return Number(data['gif_interval']); }		//（帧间隔列表越界，则用默认帧间隔）
	if( index >= data['gif_intervalTank'].length ){ return Number(data['gif_interval']); }
	return Number(data['gif_intervalTank'][ index ]);
}
//==============================
// * C播放GIF - 设置指定帧
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_setCurIndex_Private = function( index ){
	if( index >= this._drill_tarIndex ){
		index = this._drill_tarIndex -1;
	}
	
	// > B输出数据 - 重设对象名
	this._drill_curBitmapName = "";
	
	// > 播放参数
	this._drill_curTickTime = 0;			//播放参数 - 当前累计时间
	this._drill_curIndex = index;			//播放参数 - 当前索引
};
//==============================
// * C播放GIF - 帧刷新（动作元）
//
//			说明：	> 此处的 _drill_curIndex 为增量刷新，不是定量刷新。
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_updateGIF = function(){
	var data = this.drill_data();	
	
	// > 当前索引
	var interval_length = this.drill_controllerAct_getIntervalLength();
	if( interval_length == 0 ){ return; }
	var cur_index = this._drill_curIndex;
	if( data['gif_back_run'] == true ){		//（倒放情况）
		cur_index = interval_length-1 -this._drill_curIndex;
	}
	if( cur_index < 0 ){ cur_index = 0; }	//【动作元 播放完毕后，保持在最后一帧。】
	if( cur_index >= interval_length ){ cur_index = interval_length-1; }
	
	// > 帧间隔列表
	var cur_time = this._drill_curTickTime;
	var tar_time = this.drill_controllerAct_getIntervalByIndex( cur_index );
	if( cur_time >= tar_time ){
		// > 当前索引+1
		this._drill_curIndex += 1;		//（达到帧间隔后，索引+1）
		this._drill_curTickTime = 0;
	}
	
	// > B输出数据 - 记录对象名
	this._drill_curBitmapName = data['gif_src'][ cur_index ];
	
	// > 当前累计时间+1 （D变速播放）
	this._drill_curTickTime += this._drill_curSpeed;
};

//==============================
// * D变速播放 - 初始化子功能
//
//			说明：	> 最快速度也只能是每帧都播放一张图片，不会跳帧播放。
//==============================
Drill_COAS_ActController.prototype.drill_controllerAct_initSpeed = function() {
	this._drill_curSpeed = 1;
};



//=============================================================================
// ** 动画序列 主控制器【Drill_COAS_MainController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	定义一个专门控制动画序列的数据类。该类可被存到存档中。
// ** 		子功能：	
// **					->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->空的静态数据
// **						->获取静态数据
// **						->显示/隐藏
// **						->暂停/继续
// **						->设置销毁
// **						x->是否销毁
// **					->A主体
// **					->B输出数据
// **					->C管理状态元
// **						->获取数据 - 全部
// **						->获取数据 - 根据名称
// **						->获取数据 - 全部名称
// **					->D管理状态节点
// **						->获取数据 - 全部
// **						->获取数据 - 根据名称
// **						->获取数据 - 全部名称
// **						->获取当前状态元对象
// **						->获取当前状态元名称
// **						->获取当前状态元名称（全路径）
// **						->获取当前优先级
// **						->操作 - 播放默认的状态元集合
// **						->操作 - 播放状态节点
// **						->操作 - 播放简单状态元集合
// **					->E管理动作元
// **						->获取数据 - 全部
// **						->获取数据 - 根据名称
// **						->获取数据 - 全部名称
// **						->获取当前动作元名称
// **						->操作 - 播放动作元
// **						->操作 - 立刻终止动作
// **						->操作 - 是否正在播放动作元
// **					->F管理标签
// **						->获取数据 - 是否含指定标签 - 状态元
// **						->获取数据 - 是否含指定标签 - 状态节点
// **						->获取数据 - 是否含指定标签 - 动作元
// **						->操作 - 播放指定标签 - 状态元
// **						->操作 - 播放指定标签 - 状态节点
// **						->操作 - 播放指定标签 - 动作元
// **						->操作 - 播放指定标签 - 状态元+状态节点+动作元
// **					->G管理装饰器
// **						->是否刷新框架
// **					->H变速播放
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
Drill_COAS_MainController.prototype.initialize = function( sequenceData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_MainController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId("Drill_COAS_MainController") );
		return;
	}
	
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerMain_initData();									//初始化数据
    this.drill_controllerMain_initChild();									//初始化子功能
    this.drill_controllerMain_resetData( sequenceData_id );
	
    this.drill_controllerMain_update();										//（创建后需要帧刷新一次，确保 _drill_curBitmapName 不为空字符串）
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
Drill_COAS_MainController.prototype.update = function(){ this.drill_controllerMain_update(); };
Drill_COAS_MainController.prototype.drill_COAS_update = function(){ this.drill_controllerMain_update(); };
Drill_COAS_MainController.prototype.drill_controllerMain_update = function(){
	if( this._drill_pause == true ){ return; }
	this.drill_controllerMain_updateSpeed();			//帧刷新 - H变速播放
	this.drill_controllerMain_updateAttr();				//帧刷新 - A主体
														//帧刷新 - B输出数据（无）
														//帧刷新 - C管理状态元（无）
	this.drill_controllerMain_updateStateAndNode();		//帧刷新 - D管理状态节点
	this.drill_controllerMain_updateAct();				//帧刷新 - E管理动作元
														//帧刷新 - F管理标签（无）
														//帧刷新 - G管理装饰器（无）
};
//##############################
// * 动画序列 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 此操作将重连 id对应的静态数据，并且当前控制器的所有数据都会被重置。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_resetData = function( sequenceData_id ){
	this.drill_controllerMain_resetData_Private( sequenceData_id );
};
//##############################
// * 动画序列 - 空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_COAS_MainController.emptyData = {};
//##############################
// * 动画序列 - 获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_COAS_MainController.prototype.drill_data = function(){
	var sequenceData = DrillUp.g_COAS_list[ this._drill_sequenceData_id ];
	if( sequenceData == undefined ){ return Drill_COAS_MainController.emptyData; }
	return sequenceData;
};

//##############################
// * 动画序列 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 动画序列 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 动画序列 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_MainController.prototype.drill_COAS_destroy = function(){ this.drill_controllerMain_destroy(); };
Drill_COAS_MainController.prototype.drill_controllerMain_destroy = function(){
	this._drill_needDestroy = true;
};

//##############################
// * C管理状态元 - 获取数据 - 全部【开放函数】
//			
//			参数：	> 无
//			返回：	> 数据对象列表
//			
//			说明：	> 动画序列中，没有状态元对象，因此这里只提供获取状态元数据。
//					> 如果要获取状态元对象，见函数 drill_controllerMain_Node_getCurState 。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getStateData_All = function(){
	return this.drill_controllerMain_getStateData_All_Private();
};
//##############################
// * C管理状态元 - 获取数据 - 根据名称【开放函数】
//			
//			参数：	> state_name 字符串
//			返回：	> 数据对象
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getStateData_ByName = function( state_name ){
	return this.drill_controllerMain_getStateData_ByName_Private( state_name );
};
//##############################
// * C管理状态元 - 获取数据 - 全部名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串列表
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getStateData_AllName = function(){
	return this.drill_controllerMain_getStateData_AllName_Private();
};

//##############################
// * D管理状态节点 - 获取数据 - 全部【开放函数】
//			
//			参数：	> 无
//			返回：	> 数据对象列表
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getNodeData_All = function(){
	return this.drill_controllerMain_getNodeData_All_Private();
};
//##############################
// * D管理状态节点 - 获取数据 - 根据名称【开放函数】
//			
//			参数：	> stateNode_name 字符串
//			返回：	> 数据对象
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getNodeData_ByName = function( stateNode_name ){
	return this.drill_controllerMain_getNodeData_ByName_Private( stateNode_name );
};
//##############################
// * D管理状态节点 - 获取数据 - 全部名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串列表
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getNodeData_AllName = function(){
	return this.drill_controllerMain_getNodeData_AllName_Private();
};
//##############################
// * D管理状态节点 - 获取当前状态元对象【开放函数】
//			
//			参数：	> 无
//			返回：	> 控制器对象
//
//			说明：	> 获取到节点叶子 正在播放 的状态元对象。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurState = function(){
	return this.drill_controllerMain_Node_getCurState_Private();
};
//##############################
// * D管理状态节点 - 获取当前状态元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//
//			说明：	> 获取到节点叶子 正在播放 的状态元名称。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurStateName = function(){
	return this.drill_controllerMain_Node_getCurStateName_Private();
};
//##############################
// * D管理状态节点 - 获取当前状态元名称（全路径）【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//
//			说明：	> 逐步获取节点名称，直到节点叶子 正在播放 的状态元名称。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurStateName_AllRoot = function(){
	return this.drill_controllerMain_Node_getCurStateName_AllRoot_Private();
};
//##############################
// * D管理状态节点 - 获取当前优先级【开放函数】
//			
//			参数：	> 无
//			返回：	> 数字
//
//			说明：	> 获取到节点叶子 正在播放 的状态元优先级。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurPriority = function(){
	return this.drill_controllerMain_Node_getCurPriority_Private();
};
//##############################
// * D管理状态节点 - 操作 - 播放默认的状态元集合【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setStateNodeDefault = function(){ this.drill_controllerMain_setStateNodeDefault(); }
Drill_COAS_MainController.prototype.drill_controllerMain_setStateNodeDefault = function(){
	this.drill_controllerMain_setStateNode("默认的状态元集合");
};
//##############################
// * D管理状态节点 - 操作 - 播放状态节点【开放函数】
//			
//			参数：	> node_name 字符串
//			返回：	> 无
//			
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setStateNode = function( node_name ){ this.drill_controllerMain_setStateNode( node_name ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setStateNode = function( node_name ){
	this.drill_controllerMain_setStateNode_Private( node_name );
};
//##############################
// * D管理状态节点 - 操作 - 播放简单状态元集合【开放函数】
//			
//			参数：	> state_nameList 字符串列表
//			返回：	> 无
//			
//			说明：	> 设置简单的状态节点，只需要状态元的 名称列表，即可随机播放状态元。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setSimpleStateNode = function( state_nameList ){ this.drill_controllerMain_setSimpleStateNode( state_nameList ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setSimpleStateNode = function( state_nameList ){
	this.drill_controllerMain_setSimpleStateNode_Private( state_nameList );
};

//##############################
// * E管理动作元 - 获取数据 - 全部【开放函数】
//			
//			参数：	> 无
//			返回：	> 数据对象列表
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getActData_All = function(){
	return this.drill_controllerMain_getActData_All_Private();
};
//##############################
// * E管理动作元 - 获取数据 - 根据名称【开放函数】
//			
//			参数：	> act_name 字符串
//			返回：	> 数据对象
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getActData_ByName = function( act_name ){
	return this.drill_controllerMain_getActData_ByName_Private( act_name );
};
//##############################
// * E管理动作元 - 获取数据 - 全部名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串列表
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_getActData_AllName = function(){
	return this.drill_controllerMain_getActData_AllName_Private();
};
//##############################
// * E管理动作元 - 获取当前动作元对象【开放函数】
//			
//			参数：	> 无
//			返回：	> 控制器对象
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_Act_getCurAct = function(){
	return this.drill_controllerMain_Act_getCurAct_Private();
};
//##############################
// * E管理动作元 - 获取当前动作元名称【开放函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_Act_getCurName = function(){
	return this.drill_controllerMain_Act_getCurName_Private();
};
//##############################
// * E管理动作元 - 操作 - 播放动作元【开放函数】
//			
//			参数：	> act_name 字符串
//			返回：	> 无
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAct = function( act_name ){ this.drill_controllerMain_Act_setAct( act_name ); }
Drill_COAS_MainController.prototype.drill_controllerMain_Act_setAct = function( act_name ){
	this.drill_controllerMain_Act_setAct_Private( act_name );
};
//##############################
// * E管理动作元 - 操作 - 立刻终止动作【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COAS_MainController.prototype.drill_COAS_stopAct = function(){ this.drill_controllerMain_Act_stopAct(); }
Drill_COAS_MainController.prototype.drill_controllerMain_Act_stopAct = function(){
	this.drill_controllerMain_Act_stopAct_Private();
};
//##############################
// * E管理动作元 - 操作 - 是否正在播放动作元【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COAS_MainController.prototype.drill_COAS_isPlayingAct = function(){ return this.drill_controllerMain_Act_isPlayingAct(); }
Drill_COAS_MainController.prototype.drill_controllerMain_Act_isPlayingAct = function(){
	return this.drill_controllerMain_Act_isPlayingAct_Private();
};

//##############################
// * F管理标签 - 获取数据 - 是否含指定标签 - 状态元【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_hasAnnotation_StateOnly = function( annotation ){ return this.drill_controllerMain_hasAnnotation_StateOnly( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_hasAnnotation_StateOnly = function( annotation ){
	return this.drill_controllerMain_hasAnnotation_StateOnly_Private( annotation );
};
//##############################
// * F管理标签 - 获取数据 - 是否含指定标签 - 状态节点【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_hasAnnotation_StateNodeOnly = function( annotation ){ return this.drill_controllerMain_hasAnnotation_StateNodeOnly( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_hasAnnotation_StateNodeOnly = function( annotation ){
	return this.drill_controllerMain_hasAnnotation_StateNodeOnly_Private( annotation );
};
//##############################
// * F管理标签 - 获取数据 - 是否含指定标签 - 动作元【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_hasAnnotation_ActOnly = function( annotation ){ return this.drill_controllerMain_hasAnnotation_ActOnly( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_hasAnnotation_ActOnly = function( annotation ){
	return this.drill_controllerMain_hasAnnotation_ActOnly_Private( annotation );
};
//##############################
// * F管理标签 - 操作 - 播放指定标签 - 状态元【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAnnotation_StateOnly = function( annotation ){ return this.drill_controllerMain_setAnnotation_StateOnly( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation_StateOnly = function( annotation ){
	return this.drill_controllerMain_setAnnotation_StateOnly_Private( annotation );
};
//##############################
// * F管理标签 - 操作 - 播放指定标签 - 状态节点【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAnnotation_StateNodeOnly = function( annotation ){ return this.drill_controllerMain_setAnnotation_StateNodeOnly( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation_StateNodeOnly = function( annotation ){
	return this.drill_controllerMain_setAnnotation_StateNodeOnly_Private( annotation );
};
//##############################
// * F管理标签 - 操作 - 播放指定标签 - 动作元【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAnnotation_ActOnly = function( annotation ){ return this.drill_controllerMain_ActOnly_setAnnotation( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_ActOnly_setAnnotation = function( annotation ){
	return this.drill_controllerMain_setAnnotation_ActOnly_Private( annotation );
};
//##############################
// * F管理标签 - 操作 - 播放指定标签 - 状态元+状态节点+动作元【开放函数】
//			
//			参数：	> annotation 字符串
//			返回：	> 布尔
//			
//			说明：	> 找到一个满足标签的并播放。
//					  播放成功返回true；若任何条件都不满足，则返回false。
//					> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setAnnotation = function( annotation ){ return this.drill_controllerMain_setAnnotation( annotation ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation = function( annotation ){
	return this.drill_controllerMain_setAnnotation_Private( annotation );
};

//##############################
// * G管理装饰器 - 是否刷新框架【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//
//			说明：	> 切换bitmap时，默认会刷新框架，这时候会出现闪框架的问题。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setBitmapRefreshFrame = function( enabled ){ this.drill_controllerMain_setBitmapRefreshFrame( enabled ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setBitmapRefreshFrame = function( enabled ){
	this._drill_bitmapRefreshFrame = enabled;
};

//##############################
// * H变速播放 - 设置速度【开放函数】
//			
//			参数：	> speed 速度
//			返回：	> 无
//
//			说明：	> 此函数由子插件内部控制调用，能在帧刷新中实时赋值。
//##############################
Drill_COAS_MainController.prototype.drill_COAS_setCurSpeed = function( speed ){ this.drill_controllerMain_setCurSpeed( speed ); }
Drill_COAS_MainController.prototype.drill_controllerMain_setCurSpeed = function( speed ){
	this._drill_curSpeed = speed;
};

//##############################
// * 动画序列 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_COAS_MainController.prototype.drill_controllerMain_initData = function() {
	var data = this.drill_data();		//（此处会修改到 静态数据 的指针值）
	
	// > A主体（无）
	
	// > B输出数据（无）
	
	// > C管理状态元
	if( data['state_tank'] == undefined ){ data['state_tank']=[] };								//C管理状态元 - 容器
	
	// > D管理状态节点
	if( data['stateNode_tank'] == undefined ){ data['stateNode_tank']=[] };						//D管理状态节点 - 容器
	if( data['state_default_randomSeq'] == undefined ){ data['state_default_randomSeq']=[] };	//D管理状态节点 - 默认的状态元集合
	
	// > E管理动作元
	if( data['act_tank'] == undefined ){ data['act_tank']=[] };									//E管理动作元 - 容器
	
	// > F管理标签（无）
	
	// > G管理装饰器（无）
	
	// > H变速播放（无）
	
	
	//（c++中注意此处，data是堆栈对象而非指针，需要重新赋值）
};
//==============================
// * 动画序列 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initChild = function() {
	this.drill_controllerMain_initAttr();			//初始化子功能 - A主体
	this.drill_controllerMain_initBitmapParam();	//初始化子功能 - B输出数据
	this.drill_controllerMain_initState();			//初始化子功能 - C管理状态元
	this.drill_controllerMain_initNode();			//初始化子功能 - D管理状态节点
	this.drill_controllerMain_initAct();			//初始化子功能 - E管理动作元
	this.drill_controllerMain_initAnnotation();		//初始化子功能 - F管理标签
	this.drill_controllerMain_initDecorator();		//初始化子功能 - G管理装饰器
	this.drill_controllerMain_initSpeed();			//初始化子功能 - H变速播放
};
//==============================
// * 动画序列 - 重设数据（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_resetData_Private = function( sequenceData_id ){
	
	// > 参数检查
	if( typeof sequenceData_id != "number" ){
		alert( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_MainController") );
		throw Error( DrillUp.drill_COAS_getPluginTip_Sequence_NotId2("Drill_COAS_MainController") );
		return;
	}
	
	// > 执行重置
	this._drill_sequenceData_id = sequenceData_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerMain_initData();									//初始化数据
    this.drill_controllerMain_initChild();									//初始化子功能
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initAttr = function() {
	this._drill_visible = true;						//A主体 - 显示/隐藏
	this._drill_pause = false;						//A主体 - 暂停/继续
	
	this._drill_curTime = 0;						//A主体 - 当前时间
	this._drill_needDestroy = false;				//A主体 - 销毁
	this._drill_checkArrayEnabled = true;			//A主体 - 校验数据是否为数组
}
//==============================
// * A主体 - 校验数据是否为数组
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_checkArray = function( arr ){
	if( this._drill_checkArrayEnabled != true ){ return; }
		
	if( Array.isArray( arr ) ){
		// > 通过
	}else{
		// > 报错提示
		alert( DrillUp.drill_COAS_getPluginTip_NotArray( arr ) );
		this._drill_checkArrayEnabled = false;
	}	
};
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_updateAttr = function() {
	
	// > 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B输出数据 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initBitmapParam = function() {
	this._drill_curBitmapName = "";					//B输出数据 - 当前的资源名
	this._drill_curBitmapPath = "";					//B输出数据 - 当前的路径
	this._drill_curBitmapTint = 0;					//B输出数据 - 当前的色调
	this._drill_curBitmapSmooth = false;			//B输出数据 - 当前的模糊
}


//==============================
// * C管理状态元 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initState = function() {
	//（无）
}
//==============================
// * C管理状态元 - 获取数据 - 全部（私有）
//
//			说明：	> 当前动画序列中操作的 状态元 数据。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getStateData_All_Private = function(){
	return this.drill_data()['state_tank'];
};
//==============================
// * C管理状态元 - 获取数据 - 根据名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getStateData_ByName_Private = function( state_name ){
	if( state_name == "" ){ return null; }
	var data = this.drill_data();	
	for( var i=0; i < data['state_tank'].length; i++ ){
		var data_state = data['state_tank'][i];
		if( data_state['name'] == state_name ){
			return data_state;
		}
	}
	return null;
};
//==============================
// * C管理状态元 - 获取数据 - 全部名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getStateData_AllName_Private = function(){
	var data = this.drill_data();
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
// * D管理状态节点 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initNode = function() {
	var data = this.drill_data();
	
	// > 默认的状态元集合（放在最后一个）
	var node_id = data['stateNode_tank'].length -1;
	
	// > 状态节点
	//this._drill_node_curName = "";	//（立刻变化，没有缓冲设置）
	this._drill_node_curSerial = -1;
	this._drill_node_curController = new Drill_COAS_StateNodeController( this._drill_sequenceData_id, node_id );
	this._drill_node_curController.drill_controllerNode_setLayer( 0 );
	
	// > 数据量查看
	//alert( JSON.stringify( this ) );
}
//==============================
// * D管理状态节点 - 帧刷新
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_updateStateAndNode = function() {
	if( this.drill_controllerMain_Act_isPlayingAct() == true ){ return; }		//动作播放时，不操作
	
	// > 动作元打断
	if( this._drill_act_interrupt == true ){
		this._drill_act_interrupt = false;
		if( this._drill_node_curController.drill_controllerNode_canBeInterrupted() ){
			this._drill_node_curController.drill_controllerNode_resetTimer();
			this._drill_node_curController.drill_controllerNode_refreshNext();
		}
	}
	
	// > 状态节点 数据刷新情况
	if( this._drill_node_curSerial != this._drill_node_curController._drill_controllerSerial ){
		this._drill_node_curController.drill_controllerNode_resetTimer();
		this._drill_node_curController.drill_controllerNode_refreshNext();
		this._drill_node_curSerial = this._drill_node_curController._drill_controllerSerial;
	}
	
	// > 状态节点 播放完毕情况
	if( this._drill_node_curController.drill_controllerNode_isEnd() == true ){
		this._drill_node_curController.drill_controllerNode_resetTimer();
		this._drill_node_curController.drill_controllerNode_refreshNext();
	}
	
	// > 状态节点 - 帧刷新
	this._drill_node_curController.drill_controllerNode_update();
	
	// > 状态节点 - B输出数据
	this._drill_curBitmapName = this._drill_node_curController.drill_controllerNode_curBitmapName();
	this._drill_curBitmapPath = this._drill_node_curController.drill_controllerNode_curBitmapPath();
	this._drill_curBitmapTint = this._drill_node_curController.drill_controllerNode_curBitmapTint();
	this._drill_curBitmapSmooth = this._drill_node_curController.drill_controllerNode_curBitmapSmooth();
};
//==============================
// * D管理状态节点 - 获取数据 - 全部（私有）
//
//			说明：	> 当前动画序列中操作的 状态节点 数据。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getNodeData_All_Private = function(){
	return this.drill_data()['stateNode_tank'];
};
//==============================
// * D管理状态节点 - 获取数据 - 根据名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getNodeData_ByName_Private = function( stateNode_name ){
	if( stateNode_name == "" ){ return null; }
	var data = this.drill_data();	
	for( var i=0; i < data['stateNode_tank'].length; i++ ){
		var data_node = data['stateNode_tank'][i];
		if( data_node['name'] == stateNode_name ){
			return data_node;
		}
	}
	return null;
};
//==============================
// * D管理状态节点 - 获取数据 - 全部名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getNodeData_AllName_Private = function(){
	var data = this.drill_data();
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
// * D管理状态节点 - 获取当前状态元对象（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurState_Private = function(){
	return this._drill_node_curController.drill_controllerNode_getState();
};
//==============================
// * D管理状态节点 - 获取当前状态元名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurStateName_Private = function(){
	return this._drill_node_curController.drill_controllerNode_getStateName();
};
//==============================
// * D管理状态节点 - 获取当前状态元名称（全路径）（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurStateName_AllRoot_Private = function(){
	return this._drill_node_curController.drill_controllerNode_getStateName_AllRoot();
};
//==============================
// * D管理状态节点 - 获取当前优先级（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Node_getCurPriority_Private = function(){
	return this._drill_node_curController.drill_controllerNode_getPriority();
};
//==============================
// * D管理状态节点 - 操作 - 播放状态节点（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_setStateNode_Private = function( node_name ){
	var node_data = this.drill_controllerMain_getNodeData_ByName( node_name );
	if( node_data == null ){ return; }
	
	// > 重设数据
	this._drill_node_curController.drill_controllerNode_resetData( this._drill_sequenceData_id, node_data['id'] );
	this._drill_node_curController.drill_controllerNode_setLayer( 0 );
	this._drill_node_curController.drill_controllerNode_refreshNext();
	this._drill_node_curController.drill_controllerNode_update();	//（设置数据后，立即强制刷新）
};
//==============================
// * D管理状态节点 - 操作 - 播放简单状态元集合（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_setSimpleStateNode_Private = function( state_nameList ){
	this.drill_controllerMain_checkArray( state_nameList );
	this._drill_node_curController.drill_COAS_setNewStateNameList( state_nameList );
};


//==============================
// * E管理动作元 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initAct = function() {
	
	// > 动作元
	this._drill_act_curName = "";
	this._drill_act_curSerial = -1;
	this._drill_act_curController = new Drill_COAS_ActController( this._drill_sequenceData_id, -1 );
	this._drill_act_interrupt = false;
}
//==============================
// * E管理动作元 - 帧刷新
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_updateAct = function() {
	if( this.drill_controllerMain_Act_isPlayingAct() == false ){ return; }	//动作未播放时，不操作
	
	// > 动作元打断 锁
	this._drill_act_interrupt = true;
	
	// > 动作元 重设数据
	if( this._drill_act_curSerial != this._drill_act_curController._drill_controllerSerial ){
		var data_act = this.drill_controllerMain_getActData_ByName( this._drill_act_curName );
		if( data_act != undefined ){
			this._drill_act_curController.drill_controllerAct_resetData( this._drill_sequenceData_id, data_act['id'] );
		}
		this._drill_act_curSerial = this._drill_act_curController._drill_controllerSerial;
	}
	
	// > 动作元 播放完毕情况
	if( this._drill_act_curController.drill_controllerAct_isEnd() == true ){
		this._drill_act_curName = "";
		this._drill_act_curSerial = -1;
	}
	
	// > 动作元 - 帧刷新
	this._drill_act_curController.drill_controllerAct_update();
	
	// > 动作元 - B输出数据
	this._drill_curBitmapName = this._drill_act_curController.drill_controllerAct_curBitmapName();
	this._drill_curBitmapPath = this._drill_act_curController.drill_controllerAct_curBitmapPath();
	this._drill_curBitmapTint = this._drill_act_curController.drill_controllerAct_curBitmapTint();
	this._drill_curBitmapSmooth = this._drill_act_curController.drill_controllerAct_curBitmapSmooth();
};
//==============================
// * E管理动作元 - 获取数据 - 全部（私有）
//
//			说明：	当前动画序列中操作的 动作元 数据。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getActData_All_Private = function(){
	return this.drill_data()['act_tank'];
};
//==============================
// * E管理动作元 - 获取数据 - 根据名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getActData_ByName_Private = function( act_name ){
	if( act_name == "" ){ return null; }
	var data = this.drill_data();	
	for( var i=0; i < data['act_tank'].length; i++ ){
		var data_act = data['act_tank'][i];
		if( data_act['name'] == act_name ){
			return data_act;
		}
	}
	return null;
};
//==============================
// * E管理动作元 - 获取数据 - 全部名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_getActData_AllName_Private = function(){
	var data = this.drill_data();
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
// * E管理动作元 - 获取当前动作元对象（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Act_getCurAct_Private = function(){
	return this._drill_act_curController;
};
//==============================
// * E管理动作元 - 获取当前动作元名称（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Act_getCurName_Private = function(){
	return this._drill_act_curName;
};
//==============================
// * E管理动作元 - 操作 - 播放动作元（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Act_setAct_Private = function( act_name ){
	if( this._drill_act_curName === act_name ){ return; }
	
	// > 检查高优先级状态元
	if( this._drill_act_curName == "" ){
		var data_act = this.drill_controllerMain_getActData_ByName( act_name );
		if( data_act == null ){ return; }
		var state_priority = this.drill_controllerMain_Node_getCurPriority();
		if( state_priority > data_act['priority'] ){	//（同级的动作元可以覆盖状态元）
			return;
		}
	}
		
	// > 动作正在播放时
	if( this._drill_act_curName != "" ){
		var data_act = this.drill_controllerMain_getActData_ByName( act_name );
		var cur_act = this.drill_controllerMain_getActData_ByName( this._drill_act_curName );
		
		if( cur_act['priority'] >= data_act['priority'] ){	//（只能覆盖小的优先级，不包括同级）
			return;
		}
	}
	
	this._drill_act_curName = act_name;
};
//==============================
// * E管理动作元 - 操作 - 立刻终止动作（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Act_stopAct_Private = function(){
	this._drill_act_curName = "";
	this._drill_act_curSerial = -1;
};
//==============================
// * E管理动作元 - 操作 - 是否正在播放动作元（私有）
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_Act_isPlayingAct_Private = function(){
	return this._drill_act_curName != "";
};


//==============================
// * F管理标签 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initAnnotation = function() {
	//（无）
};
//==============================
// * F管理标签 - 获取数据 - 是否含指定标签 - 状态元（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_hasAnnotation_StateOnly_Private = function( annotation ){
	var stateData_list = this.drill_controllerMain_getStateData_All();
	for( var i=0; i < stateData_list.length; i++ ){
		var stateData = stateData_list[i];
		if( stateData['tag_tank'].contains( annotation ) ){
			return true;
		}
	}
	return false;
};
//==============================
// * F管理标签 - 获取数据 - 是否含指定标签 - 状态节点（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_hasAnnotation_StateNodeOnly_Private = function( annotation ){
	var stateNodeData_list = this.drill_controllerMain_getNodeData_All();
	for( var i=0; i < stateNodeData_list.length; i++ ){
		var stateNodeData = stateNodeData_list[i];
		if( stateNodeData['tag_tank'].contains( annotation ) ){
			return true;
		}
	}
	return false;
};
//==============================
// * F管理标签 - 获取数据 - 是否含指定标签 - 动作元（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_hasAnnotation_ActOnly_Private = function( annotation ){
	var actData_list = this.drill_controllerMain_getActData_All();
	for( var i=0; i < actData_list.length; i++ ){
		var actData = actData_list[i];
		if( actData['tag_tank'].contains( annotation ) ){
			return true;
		}
	}
	return false;
};
//==============================
// * F管理标签 - 操作 - 播放指定标签 - 状态元（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation_StateOnly_Private = function( annotation ){
	var stateData_list = this.drill_controllerMain_getStateData_All();
	for( var i=0; i < stateData_list.length; i++ ){
		var stateData = stateData_list[i];
		if( stateData['tag_tank'].contains( annotation ) ){
			var name_list = [];
			name_list.push( stateData['name'] );
			this.drill_controllerMain_setSimpleStateNode( name_list );			//（播放状态元）
			return true;
		}
	}
	return false;
};
//==============================
// * F管理标签 - 操作 - 播放指定标签 - 状态节点（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation_StateNodeOnly_Private = function( annotation ){
	var stateNodeData_list = this.drill_controllerMain_getNodeData_All();
	for( var i=0; i < stateNodeData_list.length; i++ ){
		var stateNodeData = stateNodeData_list[i];
		if( stateNodeData['tag_tank'].contains( annotation ) ){
			this.drill_controllerMain_setStateNode( stateNodeData['name'] );	//（播放状态节点）
			return true;
		}
	}
	return false;
};
//==============================
// * F管理标签 - 操作 - 播放指定标签 - 动作元（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation_ActOnly_Private = function( annotation ){
	var actData_list = this.drill_controllerMain_getActData_All();
	for( var i=0; i < actData_list.length; i++ ){
		var actData = actData_list[i];
		if( actData['tag_tank'].contains( annotation ) ){
			this.drill_controllerMain_Act_setAct( actData['name'] );			//（播放动作元）
			return true;
		}
	}
	return false;
};
//==============================
// * F管理标签 - 操作 - 播放指定标签 - 状态元+状态节点+动作元（私有）
//
//			说明：	> 播放不成功时，表示没有标签，返回false。
//					> 该核心只提供 播放函数，标签分类/标签顺序/标签复合处理 等操作全部由 子插件 自己管理，可见 Drill_EventActionSequenceAutomation 。
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotation_Private = function( annotation ){
	
	// > 状态节点 播放
	var success = this.drill_controllerMain_setAnnotation_StateNodeOnly_Private( annotation );
	if( success == true ){ return true; }
	
	// > 状态元 播放
	var success = this.drill_controllerMain_setAnnotation_StateOnly_Private( annotation );
	if( success == true ){ return true; }
	
	// > 动作元 播放
	var success = this.drill_controllerMain_setAnnotation_ActOnly_Private( annotation );
	if( success == true ){ return true; }
	
	return false;
};
//==============================
// * F管理标签 - 操作 - 只播放状态元 根据标签列表（旧）
//
//			说明：	> 此函数是根据 标签列表，找到 状态元列表，然后播放。暂时弃用。
//==============================
/*
Drill_COAS_MainController.prototype.drill_controllerMain_setAnnotationList = function( annotation_list ){
	
	// > 找到符合注解数量最多的状态元名
	var max_fit_count = 0;			//（最大符合数量）
	var fit_seq = [];				//（最大符合的索引列表）
	var stateData_list = this.drill_controllerMain_getStateData_All_Private();
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
	this.drill_controllerMain_setSimpleStateNode_Private( stateName_list );
	return true;
};
*/


//==============================
// * G管理装饰器 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initDecorator = function() {
	this._drill_waitForPreload = true;				//G管理装饰器 - 加载等待
	this._drill_bitmapRefreshFrame = true;			//G管理装饰器 - bitmap刷新框架开关
};


//==============================
// * H变速播放 - 初始化子功能
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_initSpeed = function() {
	this._drill_curSpeed = 1;
};
//==============================
// * H变速播放 - 帧刷新
//==============================
Drill_COAS_MainController.prototype.drill_controllerMain_updateSpeed = function() {
	
	var state = this.drill_controllerMain_Node_getCurState_Private();
	if( state != undefined ){
		state._drill_curSpeed = this._drill_curSpeed;
	}
	
	var act = this._drill_act_curController;
	if( act != undefined ){
		act._drill_curSpeed = this._drill_curSpeed;
	}
};



//=============================================================================
// ** 动画序列对象 装饰器【Drill_COAS_SpriteDecorator】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// ** 		主功能：	定义一个专门控制 动画序列对象 的贴图容器。
// ** 		子功能：	
// **					->装饰器
// **						->帧刷新
// **						->是否就绪
// **						->优化策略
// **						->销毁
// **					->A主体
// **					->B父操作
// **						->添加父贴图
// **						->去除父贴图
// **						->外部资源重置
// **						->帧刷新
// **							->设置资源对象
// **							->还原资源对象
// **							->禁止刷新框架
// **				
// **		说明：	> 操作父贴图的bitmap。可以控制多个父贴图的bitmap切换。
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
Drill_COAS_SpriteDecorator.prototype.initialize = function( parentSprite, main_controller ){
	
	this._drill_parentSpriteTank = [];							//B父操作 - 操作的父贴图
	this._drill_parentSpriteTank.push( parentSprite );			//
	this._drill_parentBitmapTank = [];							//B父操作 - 操作的bitmap
	this._drill_parentBitmapTank.push( parentSprite.bitmap );	//
	
	this._drill_controller = main_controller;				//控制器
	this.drill_spriteMain_initChild();						//初始化子功能
};
//##############################
// * 装饰器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在父贴图中手动调用 帧刷新 执行。
//##############################
Drill_COAS_SpriteDecorator.prototype.update = function(){ this.drill_spriteMain_update(); }
Drill_COAS_SpriteDecorator.prototype.drill_COAS_update = function(){ this.drill_spriteMain_update(); }
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_update = function(){
	if( this.drill_spriteMain_isReady() == false ){ return; }
	if( this.drill_spriteMain_isOptimizationPassed() == false ){ return; }
														//帧刷新 - A主体（无）
	this.drill_spriteMain_updateParentBitmap();			//帧刷新 - B父贴图
};

//##############################
// * B父操作 - 添加父贴图【开放函数】
//			
//			参数：	> parentSprite 父贴图
//			返回：	> 无
//			
//			说明：	> 可以控制多个父贴图的bitmap切换。
//					> 虽然叫"父贴图"，但实际上是 操作器和被操作的多个贴图 关系。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_addParent = function( parentSprite ){
	this.drill_spriteMain_addParent_Private( parentSprite );
};
//##############################
// * B父操作 - 去除父贴图【开放函数】
//			
//			参数：	> parentSprite 父贴图
//			返回：	> 无
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_removeParent = function( parentSprite ){
	this.drill_spriteMain_removeParent_Private( parentSprite );
};
//##############################
// * B父操作 - 外部资源重置【开放函数】
//			
//			参数：	> parentSprite 父贴图
//					> bitmap 资源对象
//			返回：	> 无
//			
//			说明：	> 其它插件可能会对父贴图单图的bitmap做修改，这里需要一起被修改。
//					> 确保关闭动画序列后，单图能还原。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_parentBitmapChanged = function( parentSprite, bitmap ){ this.drill_spriteMain_parentBitmapChanged( parentSprite, bitmap ); }
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_parentBitmapChanged = function( parentSprite, bitmap ){
	this.drill_spriteMain_parentBitmapChanged_Private( parentSprite, bitmap );
};

//##############################
// * 装饰器 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里需要 考虑 延迟加载问题。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isReady = function(){ return this.drill_spriteMain_isReady(); }
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this.drill_spriteMain_isAllBitmapReady() == false ){ return false; }
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
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isOptimizationPassed = function(){ return this.drill_spriteMain_isOptimizationPassed(); }
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_isOptimizationPassed = function(){
    return true;	//（此部分交给子插件来考虑，可以继承子类覆写，也可以直接选择不执行 drill_spriteMain_update ）
};
//##############################
// * 装饰器 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isNeedDestroy = function(){ return this.drill_spriteMain_isNeedDestroy(); }
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_isNeedDestroy = function(){
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
Drill_COAS_SpriteDecorator.prototype.drill_COAS_destroy = function(){ this.drill_spriteMain_destroy(); }
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_destroy = function(){
	this.drill_spriteMain_destroy_Private();
};
//==============================
// * 装饰器 - 初始化子功能
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_initChild = function() {
	if( this._drill_controller == null ){ return; }
	this.drill_spriteMain_initAttr();				//初始化子功能 - A主体
	this.drill_spriteMain_initParent();				//初始化子功能 - B父操作
};
//==============================
// * 装饰器 - 销毁（私有）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_destroy_Private = function(){
	
	// > 还原资源对象
	this.drill_spriteMain_resetParentBitmap();
	
	// > 清除数据
	this._drill_controller = null;
	this._drill_parentSpriteTank = [];
	this._drill_parentBitmapTank = [];
};


//==============================
// * A主体 - 初始化子功能
//
//			说明：	> 注意，此加载有 加载等待 的标记，并不是必须的。
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_initAttr = function(){
	var data = this._drill_controller.drill_data();
	
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
	//	this.drill_spriteMain_setParentBitmap( data['state_tank'][0]['gif_src_bitmap'][0] );
	//}
}
//==============================
// * A主体 - 判断图片加载情况
//
//			说明：	> 注意，此加载有 加载等待 的标记，并不是必须的。
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_isAllBitmapReady = function(){
	
	// > 加载等待 标记
	if( this._drill_controller._drill_waitForPreload == false ){ return; }
	
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
// * B父操作 - 初始化子功能
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_initParent = function(){
	//（部分操作提前到 initialize 函数执行）
	
	// > 初始化时，强制刷新，确保bitmap已被赋值
	this.drill_spriteMain_updateParentBitmap();
}
//==============================
// * B父操作 - 帧刷新
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_updateParentBitmap = function(){
	
	// > 设置资源对象
	if( this._drill_controller._drill_visible == true ){
		var temp_bitmap = ImageManager.loadBitmap( 
								this._drill_controller._drill_curBitmapPath, 
								this._drill_controller._drill_curBitmapName, 
								this._drill_controller._drill_curBitmapTint, 
								this._drill_controller._drill_curBitmapSmooth );
		this.drill_spriteMain_setParentBitmap( temp_bitmap );
		
	// > 还原资源对象
	}else{
		this.drill_spriteMain_resetParentBitmap();
	}
};
//==============================
// * B父操作 - 帧刷新 - 设置资源对象
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_setParentBitmap = function( bitmap ){
	var bitmapRefreshFrame = this._drill_controller._drill_bitmapRefreshFrame;
	for(var i=0; i < this._drill_parentSpriteTank.length; i++ ){
		var temp_parent = this._drill_parentSpriteTank[i];
		if( temp_parent == undefined ){ continue; }		//（如果父贴图被销毁，则跳过设置）
		
		// > 禁止刷新框架
		if( bitmapRefreshFrame == false ){
			temp_parent._Drill_COAS_noRefreshFrame = true;	
		}
		
		temp_parent.bitmap = bitmap;
		
		if( bitmapRefreshFrame == false ){
			temp_parent._Drill_COAS_noRefreshFrame = false;
		}
	}
};
//==============================
// * B父操作 - 帧刷新 - 还原资源对象
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_resetParentBitmap = function(){
	var bitmapRefreshFrame = this._drill_controller._drill_bitmapRefreshFrame;
	for(var i = 0; i < this._drill_parentSpriteTank.length; i++ ){
		var temp_parent = this._drill_parentSpriteTank[i];
		if( temp_parent == undefined ){ continue; }		//（如果父贴图被销毁，则跳过还原）
		
		// > 禁止刷新框架
		if( bitmapRefreshFrame == false ){
			temp_parent._Drill_COAS_noRefreshFrame = true;	
		}
		
		temp_parent.bitmap = this._drill_parentBitmapTank[i];
		
		if( bitmapRefreshFrame == false ){
			temp_parent._Drill_COAS_noRefreshFrame = false;
		}
	}
};
//==============================
// * B父操作 - 添加父贴图（私有）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_addParent_Private = function( parentSprite ){
	this._drill_parentSpriteTank.push( parentSprite );
	this._drill_parentBitmapTank.push( parentSprite.bitmap );
};
//==============================
// * B父操作 - 去除父贴图（私有）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_removeParent_Private = function( parentSprite ){
	for( var i=this._drill_parentSpriteTank.length-1; i >= 0; i-- ){
		if( this._drill_parentSpriteTank[i] == parentSprite ){
			this._drill_parentSpriteTank.splice(i,1);
			this._drill_parentBitmapTank.splice(i,1);
			break;
		}
	}
};
//==============================
// * B父操作 - 外部资源重置（私有）
//
//			说明：	> 其它插件可能会对父贴图单图的bitmap做修改，这里需要一起被修改。
//					> 确保关闭动画序列后，单图能还原。
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_spriteMain_parentBitmapChanged_Private = function( parentSprite, bitmap ){
	for( var i=0; i < this._drill_parentSpriteTank.length; i++ ){
		if( this._drill_parentSpriteTank[i] == parentSprite ){
			this._drill_parentBitmapTank[i] = bitmap;
			break;
		}
	}
};
//==============================
// * B父操作 - 禁止刷新框架控制
//
//			说明：	> 切换bitmap时，默认会刷新框架，这时候会出现闪框架的问题。
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
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个窗口，用于描述 指定动画序列控制器 的内容信息。
// **		子功能：	
// **					->控制器绑定
// **					->内容显示
// **					
// **		说明：	> 临时的调试窗口。
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
	this.drill_window_initChild();		//初始化子功能
};
//==============================
// * Debug窗口 - 帧刷新
//==============================
Drill_COAS_DebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_window_updateContext();	//帧刷新 - 内容
};
//==============================
// * Debug窗口 - 窗口属性
//==============================
Drill_COAS_DebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * Debug窗口 - 设置控制器（开放函数）
//==============================
Drill_COAS_DebugWindow.prototype.drill_window_setMainController = function( controller ){
	this._drill_mainController = controller;
};
//==============================
// * Debug窗口 - 初始化子功能
//==============================
Drill_COAS_DebugWindow.prototype.drill_window_initChild = function() {
	
	// > 控制器对象
	this._drill_mainController = null;
	
	// > 上一次内容
	this._drill_lastContext = "";
	
	// > 图片层级/堆叠级
	this.zIndex = 999;
	
	// > 窗口内容刷新
    this.contents.clear();
	this.createContents();
};
//==============================
// * Debug窗口 - 帧刷新内容
//==============================
Drill_COAS_DebugWindow.prototype.drill_window_updateContext = function() {
	if( this._drill_mainController == undefined ){ return; }
	
	// > 内容设置
	var context = "";
	context += "\\c[24]动画序列id：\\c[0]" + (this._drill_mainController._drill_sequenceData_id+1) + "\n";
	context += "\\c[24]当前状态元：\\c[0]" + this._drill_mainController.drill_controllerMain_Node_getCurStateName() + "\n";
	context += "\\c[24]当前动作元：\\c[0]" + this._drill_mainController.drill_controllerMain_Act_getCurName() + "\n";
	context += "\\c[24]当前状态节点全路径：\\c[0]\n" + this._drill_mainController.drill_controllerMain_Node_getCurStateName_AllRoot() + "\n";
	
	// > 内容校验
	if( this._drill_lastContext == context ){ return; }
	this._drill_lastContext = context;
	
	// > 绘制设置
	if( Imported.Drill_CoreOfWindowCharacter ){
		
		// > 窗口字符底层校验
		if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
			alert( DrillUp.drill_COAS_getPluginTip_NeedUpdate_drawText() );
			return;
		};
		
		// > 参数准备
		var options = {};
		options['infoParam'] = {};
		options['infoParam']['x'] = 0;
		options['infoParam']['y'] = 0;
		options['infoParam']['canvasWidth']  = this.width;
		options['infoParam']['canvasHeight'] = this.height;
		
		// > 参数准备 - 自定义
		options['blockParam'] = {};			//『清零字符默认间距』
		options['blockParam']['paddingTop'] = 0;
		options['rowParam'] = {};
		options['rowParam']['lineHeight_upCorrection'] = 0;
		
		options['baseParam'] = {};
		options['baseParam']['fontSize'] = this.standardFontSize();	//（使用当前窗口的字体大小）
		
		// > 清空画布（固定高宽只需要清空）
		this.contents.clear();
		
		
		// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
		this.drill_COWC_drawText( context, options );
		
	}else{
		this.drawText("缺少核心插件，无法显示文本。", 2, 2, this.width, 'left');
		this.drawText("需要 Drill_CoreOfWindowCharacter 窗口字符-窗口字符核心★★v2.0及以上★★。", 2, 22, this.width, 'left');
	}
};

