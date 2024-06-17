//=============================================================================
// Drill_EventFrameSurround.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 多层行走图环绕球
 * @author Drill_up
 * 
 * @Drill_LE_param "环绕球样式-%d"
 * @Drill_LE_parentKey "---环绕球样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_EFSu_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_EventFrameSurround +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加环绕球，绑定在事件或玩家的行走图上面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（个体装饰）.docx"。
 * 细节：
 *   (1.环绕球实质上是绕椭圆移动，并辗转于 行走图前面层与父贴图后面层 之间的
 *      贴图，通过不断切换层级与位置，使其看起来像在先后移动一样。
 *   (2.环绕球还支持 自动调整效果。
 *      根据球所在的y轴位置，稍微变暗或者变小，然后恢复。以强化物体远近的感受。
 * 绑定：
 *   (1.多个样式可以绑定同一个行走图。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__characterLayer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__characterLayer文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 环绕球样式-1 资源-环绕球
 * 环绕球样式-2 资源-环绕球
 * 环绕球样式-3 资源-环绕球
 * ……
 *
 * 你可以在同一个行走图里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过添加事件注释来添加环绕球：
 * 
 * 事件注释：=>多层行走图环绕球 : 槽[1] : 设置环绕球 : 样式[1]
 * 事件注释：=>多层行走图环绕球 : 槽[1] : 删除环绕球
 * 事件注释：=>多层行走图环绕球 : 清空当前全部环绕球
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你也可以通过插件指令来进行设置：
 * 
 * 插件指令：>多层行走图环绕球 : 玩家 : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 玩家领队 : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 玩家全员 : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 玩家队员[1] : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 玩家队员变量[21] : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 本事件 : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 事件[10] : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 事件变量[21] : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 批量事件[10,11] : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 批量事件变量[21,22] : 槽[1] : 设置环绕球 : 样式[1]
 * 
 * 插件指令：>多层行走图环绕球 : 本事件 : 槽[1] : 设置环绕球 : 样式[1]
 * 插件指令：>多层行走图环绕球 : 本事件 : 槽[1] : 删除环绕球
 * 插件指令：>多层行走图环绕球 : 本事件 : 清空当前全部环绕球
 * 
 * 1.前半部分（玩家）和 后半部分（槽[1] : 设置环绕球 : 样式[1]）
 *   的参数可以随意组合。一共有6*3种组合方式。
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
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法：   在个体装饰管理层，设置5个环绕球，性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【44.46ms】
 *              100个事件的地图中，平均消耗为：【28.34ms】
 *               50个事件的地图中，平均消耗为：【22.23ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每个事件配置了很多环绕球，但总体消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了插件的性能。
 * [v1.2]
 * 大幅度优化了内部结构。
 *
 *
 *
 * @param ---环绕球样式组 1至20---
 * @default
 *
 * @param 环绕球样式-1
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-2
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-3
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-4
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-5
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-6
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-7
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-8
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-9
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-10
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-11
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-12
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-13
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-14
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-15
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-16
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-17
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-18
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-19
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-20
 * @parent ---环绕球样式组 1至20---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组21至40---
 * @default
 *
 * @param 环绕球样式-21
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-22
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-23
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-24
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-25
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-26
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-27
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-28
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-29
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-30
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-31
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-32
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-33
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-34
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-35
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-36
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-37
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-38
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-39
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-40
 * @parent ---环绕球样式组21至40---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组41至60---
 * @default
 *
 * @param 环绕球样式-41
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-42
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-43
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-44
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-45
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-46
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-47
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-48
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-49
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-50
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-51
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-52
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-53
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-54
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-55
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-56
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-57
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-58
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-59
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-60
 * @parent ---环绕球样式组41至60---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组61至80---
 * @default
 *
 * @param 环绕球样式-61
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-62
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-63
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-64
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-65
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-66
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-67
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-68
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-69
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-70
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-71
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-72
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-73
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-74
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-75
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-76
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-77
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-78
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-79
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-80
 * @parent ---环绕球样式组61至80---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组81至100---
 * @default
 *
 * @param 环绕球样式-81
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-82
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-83
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-84
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-85
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-86
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-87
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-88
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-89
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-90
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-91
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-92
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-93
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-94
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-95
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-96
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-97
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-98
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-99
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-100
 * @parent ---环绕球样式组81至100---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组101至120---
 * @default
 *
 * @param 环绕球样式-101
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-102
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-103
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-104
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-105
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-106
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-107
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-108
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-109
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-110
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-111
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-112
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-113
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-114
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-115
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-116
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-117
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-118
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-119
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-120
 * @parent ---环绕球样式组101至120---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组121至140---
 * @default
 *
 * @param 环绕球样式-121
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-122
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-123
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-124
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-125
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-126
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-127
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-128
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-129
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-130
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-131
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-132
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-133
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-134
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-135
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-136
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-137
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-138
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-139
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-140
 * @parent ---环绕球样式组121至140---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组141至160---
 * @default
 *
 * @param 环绕球样式-141
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-142
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-143
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-144
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-145
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-146
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-147
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-148
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-149
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-150
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-151
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-152
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-153
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-154
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-155
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-156
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-157
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-158
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-159
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-160
 * @parent ---环绕球样式组141至160---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组161至180---
 * @default
 *
 * @param 环绕球样式-161
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-162
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-163
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-164
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-165
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-166
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-167
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-168
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-169
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-170
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-171
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-172
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-173
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-174
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-175
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-176
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-177
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-178
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-179
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-180
 * @parent ---环绕球样式组161至180---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组181至200---
 * @default
 *
 * @param 环绕球样式-181
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-182
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-183
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-184
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-185
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-186
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-187
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-188
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-189
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-190
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-191
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-192
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-193
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-194
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-195
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-196
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-197
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-198
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-199
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-200
 * @parent ---环绕球样式组181至200---
 * @type struct<EFSuStyle>
 * @desc 行走图环绕球样式的详细配置信息。
 * @default 
 */
/*~struct~EFSuStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的行走图环绕球样式==
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 初始是否显示
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 * 
 * @param 资源-环绕球
 * @parent ---贴图---
 * @desc 环绕球的图片资源，可以是单张图片，也可以是多张图片构成的GIF。
 * @default ["(需配置)多层行走图环绕球"]
 * @require 1
 * @dir img/Map__characterLayer/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc 环绕球每帧播放间隔时间，单位帧。（1秒60帧）
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
 * @param 平移-环绕球 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-环绕球 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default -24
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
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 图像-色调值
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 360
 * @desc 资源图像的色调值，范围为0至360。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---贴图---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 此参数为缩放设置，设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
 * @default false
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 环绕球在同一个行走图中，并且在同一层级下，先后排序的位置，0表示最后面。
 * @default 0
 *
 * @param 自旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 0.0
 * 
 * @param ---环绕轨迹---
 * @desc 
 * 
 * @param 长轴长度
 * @parent ---环绕轨迹---
 * @type number
 * @min 1
 * @desc 环绕球的轨迹为椭圆，短轴长度 指该椭圆的长轴长度。
 * @default 40
 * 
 * @param 短轴长度
 * @parent ---环绕轨迹---
 * @type number
 * @min 1
 * @desc 环绕球的轨迹为椭圆，短轴长度 指该椭圆的短轴长度。
 * @default 8
 * 
 * @param 环绕速度
 * @parent ---环绕轨迹---
 * @desc 环绕球的环绕速度，单位 角度/帧，正数顺时针，负数逆时针。(1秒60帧)
 * @default -3.0
 * 
 * @param 起始角度
 * @parent ---环绕轨迹---
 * @type number
 * @min 0
 * @max 360
 * @desc 环绕球的开始移动时，所在椭圆轨道的起始角度。
 * @default 0
 * 
 * @param 轨迹整体角度
 * @parent ---环绕轨迹---
 * @type number
 * @min 0
 * @max 360
 * @desc 环绕球轨迹的整体旋转角度。
 * @default 0
 * 
 * @param ---自动调整效果---
 * @desc 
 *
 * @param 是否自动调整阴影
 * @parent ---自动调整效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，环绕球会根据所处轨迹的Y位置，变化调整阴影亮度。用于增强前后的距离感。
 * @default false
 * 
 * @param 自动阴影的变化幅度
 * @parent 是否自动调整阴影
 * @type number
 * @min 0
 * @max 255
 * @desc 自动变化时，阴影的变化幅度，范围为0至255。填30表示在0至30的暗度之间变化。
 * @default 60
 *
 * @param 是否自动调整大小
 * @parent ---自动调整效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，环绕球会根据所处轨迹的Y位置，变化调整额外缩放大小。用于增强前后的距离感。
 * @default false
 * 
 * @param 自动大小的变化幅度
 * @parent 是否自动调整大小
 * @desc 自动变化时，大小的变化幅度。填0.2表示在1.00至0.80的缩放大小之间变化。
 * @default 0.20
 * 
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 整体缩放 X
 * @parent ---3d效果---
 * @desc 环绕球的缩放X值，默认比例1.0。缩放将会使得环绕球看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体缩放 Y
 * @parent ---3d效果---
 * @desc 环绕球的缩放Y值，默认比例1.0。缩放将会使得环绕球看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体斜切 X
 * @parent ---3d效果---
 * @desc 环绕球的斜切X值，默认比例0.0。斜切将会使得环绕球看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体斜切 Y
 * @parent ---3d效果---
 * @desc 环绕球的斜切Y值，默认比例0.0。斜切将会使得环绕球看起来旋转具有一定角度。
 * @default 0.0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFSu（Event_Frame_Surround）
//		临时全局变量	DrillUp.g_EFSu_xxx
//		临时局部变量	this._drill_EFSu_xxx
//		存储数据变量	$gameSystem._drill_EFSu_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理)
//		★性能测试因素	个体装饰管理层
//		★性能测试消耗	44.46ms（Sprite_Character.prototype.update）22.23ms（drill_EFSu_updateInScene）14.38ms（drill_updateBall）36.4ms（按简称筛选统计的消耗）
//		★最坏情况		事件附带了大量装饰贴图。
//		★备注			无
//		
//		★优化记录		
//			2022-10-5优化：
//				添加了接口 优化策略【标准函数】，镜头范围外，直接全部关闭刷新，贴图也关闭帧刷新。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			->☆个体层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序（界面装饰）【标准函数】
//				->图片层级排序（个体装饰）【标准函数】
//				> 行走图前面层/父贴图前面层（_drill_characterUpArea）
//				> 父贴图后面层（_drill_characterPBackArea）
//			
//			->☆物体容器（未使用）
//				->统计含控制器的物体
//			->☆物体绑定
//				->创建控制器（开放函数）
//				->删除控制器（开放函数）
//				->删除全部控制器（开放函数）
//				->控制器帧刷新
//				->控制器销毁
//			->☆贴图控制
//				->创建
//					->控制器与序列号判定
//				->帧刷新
//					->自动销毁
//			
//			->行走图环绕球控制器【Drill_EFSu_Controller】
//				->A主体
//				->B变化控制
//				->C播放GIF
//				->D环绕轨迹
//					->层级变化
//					->行走图前面层/父贴图后面层
//				->E自动调整效果
//			->行走图环绕球贴图【Drill_EFSu_Sprite】
//				->A主体
//				->B变化控制
//				->C对象绑定
//				->D环绕轨迹
//				->E自动调整效果
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 行走图环绕球控制器【Drill_EFSu_Controller】
//			* 行走图环绕球贴图【Drill_EFSu_Sprite】
//		
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_characterPBackArea 			父贴图后面层
//				_drill_characterUpArea				行走图前面层
//			2.这三层关系如下：
//				┕-	父贴图后面层（_drill_characterPBackArea）
//				┕-	行走图贴图列表（不受控）
//					┕-	行走图贴图
//					┕-	行走图前面层（_drill_characterUpArea）
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
	DrillUp.g_EFSu_PluginTip_curName = "Drill_EventFrameSurround.js 行走图-多层行走图环绕球";
	DrillUp.g_EFSu_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFSu_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFSu_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_EFSu_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_EFSu_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_EFSu_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_EFSu_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFrameSurround = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFrameSurround');
	
	
	//==============================
	// * 静态数据 - 环绕球样式
	//				（~struct~EFSuStyle）
	//==============================
	DrillUp.drill_EFSu_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器（绑定）
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		if( dataFrom["资源-环绕球"] != "" &&
			dataFrom["资源-环绕球"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-环绕球"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Map__characterLayer/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体
		data['x'] = Number( dataFrom["平移-环绕球 X"] || 0);
		data['y'] = Number( dataFrom["平移-环绕球 Y"] || 0);
		
		// > A主体 - 3d效果
		data['scale_x'] = Number( dataFrom["整体缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["整体缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["整体斜切 X"] || 0.0);
		data['skew_y'] = Number( dataFrom["整体斜切 Y"] || 0.0);
		
		// > B变化控制
		data['rotate'] = Number( dataFrom["自旋转速度"] || 0);
		
		// > D环绕轨迹
		data['a'] = Number( dataFrom["长轴长度"] || 100);
		data['b'] = Number( dataFrom["短轴长度"] || 20);
		data['surroundSpeed'] = Number( dataFrom["环绕速度"] || 3.0);
		data['startAngle'] = Number( dataFrom["起始角度"] || 0);
		data['surroundRotate'] = Number( dataFrom["轨迹整体角度"] || 0);
		
		// > E自动调整效果
		data['auto_shadow'] = String( dataFrom["是否自动调整阴影"] || "false") == "true";
		data['auto_shadowRange'] = Number( dataFrom["自动阴影的变化幅度"] || 30);
		data['auto_size'] = String( dataFrom["是否自动调整大小"] || "false") == "true";
		data['auto_sizeRange'] = Number( dataFrom["自动大小的变化幅度"] || 0.2);
		
		return data;
	}
	
	/*-----------------环绕球样式------------------*/
	DrillUp.g_EFSu_style_length = 200;
	DrillUp.g_EFSu_style = [];
	for (var i = 0; i < DrillUp.g_EFSu_style_length; i++) {
		if( DrillUp.parameters['环绕球样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['环绕球样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['环绕球样式-' + String(i+1) ]);
			DrillUp.g_EFSu_style[i] = DrillUp.drill_EFSu_styleInit( data );
			DrillUp.g_EFSu_style[i]['id'] = i+1;
			DrillUp.g_EFSu_style[i]['inited'] = true;
		}else{
			DrillUp.g_EFSu_style[i] = DrillUp.drill_EFSu_styleInit( {} );
			DrillUp.g_EFSu_style[i]['id'] = i+1;
			DrillUp.g_EFSu_style[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EFSu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFSu_pluginCommand.call(this, command, args);
	if( command === ">多层行走图环绕球" ){
		
		/*-----------------对象组获取------------------*/
		var char_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( char_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EFSu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EFSu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFSu_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFSu_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit == "玩家" ){
				char_list = [ $gamePlayer ];
			}
			if( char_list == null && unit == "玩家领队" ){
				char_list = [ $gamePlayer ];
			}
			if( char_list == null && unit == "玩家全员" ){
				char_list = $gamePlayer.followers().visibleFollowers();
				char_list.unshift($gamePlayer);
			}
			if( char_list == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				char_list = [];
				char_list.push(group[ Number(unit) ]);
			}
			if( char_list == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				char_list = [];
				char_list.push(group[ $gameVariables.value(Number(unit)) ]);
			}
		}
		
		/*-----------------指令------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[3]);
			if( temp1 == "清空当前全部环绕球" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFSu_removeControllerAll();
				}
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			if( type == "删除环绕球" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFSu_removeController( Number(temp1)-1 );
				}
			}
		}
		if( args.length == 8 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "设置环绕球" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFSu_createController( Number(temp1)-1, Number(temp2)-1 );
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFSu_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFSu_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_EFSu_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFSu_c_setupPageSettings.call(this);
	this.drill_EFSu_setupPageSettings();
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EFSu_setupPageSettings = function() {
	
	var page = this.page();
    if( page ){
		
		var temp_list = this.list();
		for(var k = 0; k < temp_list.length; k++ ){
			var l = temp_list[k];
			if( l.code === 108 ){
				
				/*-----------------标准注释------------------*/
				var row = l.parameters[0];
				var args = row.split(/[ ]+/);
				var command = args.shift();
				if( command == "=>多层行走图环绕球" ){
					
					if( args.length == 2 ){
						var temp1 = String(args[1]);
						if( temp1 == "清空当前全部环绕球" ){
							this.drill_EFSu_removeControllerAll();
						}
					}
					if( args.length == 4 ){
						var temp1 = String(args[1]);
						var type = String(args[3]);
						if( type == "删除环绕球" ){
							temp1 = temp1.replace("槽[","");
							temp1 = temp1.replace("]","");
							this.drill_EFSu_removeController( Number(temp1)-1 );
						}
					}
					if( args.length == 6 ){
						var temp1 = String(args[1]);
						var type = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "设置环绕球" ){
							temp1 = temp1.replace("槽[","");
							temp1 = temp1.replace("]","");
							temp2 = temp2.replace("样式[","");
							temp2 = temp2.replace("]","");
							this.drill_EFSu_createController( Number(temp1)-1, Number(temp2)-1 );
						}
					}
				};
				
			};
		};
    }
}


//#############################################################################
// ** 【标准模块】个体层级 ☆个体层级
//#############################################################################
//##############################
// * 个体层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图           （添加的贴图对象）
//					> layer_index 字符串    （添加到的层级名，行走图前面层/父贴图后面层）
//					> individual_sprite 贴图（被装饰的个体贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//					> 注意，此函数必须在 _spriteset 图层 建立之后执行。见锁 $gameTemp._drill_spritesetCreated 。
//##############################
Game_Temp.prototype.drill_EFSu_layerAddSprite = function( sprite, layer_index, individual_sprite ){
    this.drill_EFSu_layerAddSprite_Private( sprite, layer_index, individual_sprite );
}
//##############################
// * 个体层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从父层级中移除。
//##############################
Game_Temp.prototype.drill_EFSu_layerRemoveSprite = function( sprite ){
	this.drill_EFSu_layerRemoveSprite_Private( sprite );
}
//##############################
// * 个体层级 - 图片层级排序（界面装饰）【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，子贴图按照zIndex属性来进行先后排序。值越大，越靠前。
//					> 注意，由于个体装饰的差异性，此函数分为 界面装饰 和 个体装饰。
//##############################
Game_Temp.prototype.drill_EFSu_sortByZIndex_Scene = function(){
	var cur_scene = SceneManager._scene;
	if( cur_scene instanceof Scene_Map ){
		cur_scene._spriteset._drill_characterPBackArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//父贴图后面层
	}
}
//##############################
// * 个体层级 - 图片层级排序（个体装饰）【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，子贴图按照zIndex属性来进行先后排序。值越大，越靠前。
//					> 注意，由于个体装饰的差异性，此函数分为 界面装饰 和 个体装饰。
//##############################
Sprite_Character.prototype.drill_EFSu_sortByZIndex_Individual = function(){
	this._drill_characterUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});				//行走图前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 行走图前面层
//==============================
var _drill_EFSu_layer_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFSu_layer_update.call(this);
	if( this._drill_characterUpArea == undefined ){				//行走图前面层
		this._drill_characterUpArea = new Sprite();
		this.addChild(this._drill_characterUpArea);
	}
};
//==============================
// * 个体层级 - 父贴图后面层 - 地图界面
//==============================
var _drill_EFSu_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( this._drill_characterPBackArea == undefined ){			//父贴图后面层
		this._drill_characterPBackArea = new Sprite();
		this._drill_characterPBackArea.z = 0.85;				//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_characterPBackArea);
	}
	
	_drill_EFSu_layer_createCharacters.call(this);
};
//==============================
// * 个体层级 - 添加贴图到层级（私有）
//==============================
Game_Temp.prototype.drill_EFSu_layerAddSprite_Private = function( sprite, layer_index, individual_sprite ){
	if( layer_index == "父贴图后面层" || layer_index == "在父贴图后面" ){
		if( $gameTemp._drill_spritesetCreated != true ){ return; }
		var cur_scene = SceneManager._scene;
		if( cur_scene instanceof Scene_Map ){
			sprite._drill_isAtAnimPBackArea = true;		//（标记 - 在父贴图后面）
			cur_scene._spriteset._drill_characterPBackArea.addChild( sprite );
		}
	}
	if( layer_index == "行走图前面层" || layer_index == "在行走图前面" ||
		layer_index == "父贴图前面层" || layer_index == "在父贴图前面" ){
		individual_sprite._drill_characterUpArea.addChild( sprite );
	}
};
//==============================
// * 个体层级 - 层级 锁
//==============================
var _drill_EFSu_layerMap_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	$gameTemp._drill_spritesetCreated = false;
	_drill_EFSu_layerMap_createDisplayObjects.call(this);
	$gameTemp._drill_spritesetCreated = true;
};
//==============================
// * 个体层级 - 去除贴图（私有）
//==============================
Game_Temp.prototype.drill_EFSu_layerRemoveSprite_Private = function( sprite ){
	if( sprite == undefined ){ return; }
	
	// > 销毁
	sprite.drill_sprite_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};


//=============================================================================
// ** ☆物体容器（未使用）
//
//			说明：	> 此模块能随时刷新捕获拥有 该个体装饰 的事件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_EFSu_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EFSu_temp_initialize2.call(this);
	this._drill_EFSu_characterTank = [];			//（含环绕球的事件）
	this._drill_EFSu_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EFSu_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_EFSu_characterTank = [];		//（含环绕球的事件）
	$gameTemp._drill_EFSu_needRestatistics = true;
	
	// > 原函数
	_drill_EFSu_gmap_setup.call( this, mapId );
	
	this.drill_EFSu_updateRestatistics();		//（强制刷新统计一次，确保刚加载就有）
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EFSu_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EFSu_characterTank = [];
	$gameTemp._drill_EFSu_needRestatistics = true;
	$gameMap.drill_EFSu_updateRestatistics();	//（强制刷新统计一次，确保刚加载就有）
	_drill_EFSu_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 地图销毁时
//==============================
var _drill_EFSu_map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_EFSu_map_terminate.call(this);
	$gameTemp._drill_EFSu_characterTank = [];
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EFSu_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive){
	_drill_EFSu_map_update.call(this,sceneActive);
	this.drill_EFSu_updateRestatistics();			//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EFSu_updateRestatistics = function() {
	if( $gameTemp._drill_EFSu_needRestatistics != true ){ return }
	$gameTemp._drill_EFSu_needRestatistics = false;
	
	$gameTemp._drill_EFSu_characterTank = [];		//容器中的物体，只增不减，除非清零
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){  
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event._drill_EFSu_controllerTank == undefined ){ continue; }
		if( temp_event._drill_EFSu_controllerTank.length == 0 ){ continue; }
		$gameTemp._drill_EFSu_characterTank.push(temp_event);
	}
}


//=============================================================================
// ** ☆物体绑定
//
//			说明：	> 此模块专门管理 控制器 对象。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体绑定 - 初始化
//==============================
var _drill_EFSu_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function(){
	this._drill_EFSu_controllerTank = undefined;
	_drill_EFSu_c_initMembers.call( this );
}
//==============================
// * 物体绑定 - 创建控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFSu_createController = function( slot_id, style_id ){
	if( this._drill_EFSu_controllerTank == undefined ){
		this._drill_EFSu_controllerTank = [];
	}
	
	// > 销毁原来的
	this.drill_EFSu_removeController( slot_id );
	
	// > 创建控制器
	var data = JSON.parse(JSON.stringify( DrillUp.g_EFSu_style[ style_id ] ));
	var controller = new Drill_EFSu_Controller( data );
	this._drill_EFSu_controllerTank[ slot_id ] = controller;
	
	// > 刷新统计
	$gameTemp._drill_EFSu_needRestatistics = true;
}
//==============================
// * 物体绑定 - 去除控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFSu_removeController = function( slot_id ){
	if( this._drill_EFSu_controllerTank == undefined ){ return; }
	if( this._drill_EFSu_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_EFSu_controllerTank[ slot_id ].drill_controller_destroy();
	this._drill_EFSu_controllerTank[ slot_id ] = null;
}
//==============================
// * 物体绑定 - 去除全部控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFSu_removeControllerAll = function(){
	if( this._drill_EFSu_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_EFSu_controllerTank.length; i++ ){
		this.drill_EFSu_removeController( i );
	}
	this._drill_EFSu_controllerTank = undefined;
}
//==============================
// * 物体绑定 - 帧刷新
//
//			说明：	当前直接在物体中帧刷新，也可以通过 物体容器 进行遍历帧刷新。
//==============================
var _drill_EFSu_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EFSu_c_update.call(this);
	if( this._drill_EFSu_controllerTank == undefined ){ return; }
	if( this._drill_EFSu_controllerTank.length == 0 ){ return; }
	
	// > 控制器帧刷新
	for( var i=0; i < this._drill_EFSu_controllerTank.length; i++ ){
		var controller = this._drill_EFSu_controllerTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_controller_update();
	}
	
	// > 自动销毁 - 控制器
	var is_all_empty = true;
	for( var i=0; i < this._drill_EFSu_controllerTank.length; i++ ){
		var controller = this._drill_EFSu_controllerTank[i];
		if( controller == undefined ){ continue; }
		is_all_empty = false;
		if( controller.drill_controller_isDead() ){
			this._drill_EFSu_controllerTank[i] = null;
		}
	}
	if( is_all_empty == true ){
		this._drill_EFSu_controllerTank = undefined;
	}
}
//==============================
// * 物体绑定 - 事件销毁时
//==============================
var _drill_EFSu_c_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function(){
	_drill_EFSu_c_erase.call(this);
	if( this._drill_EFSu_controllerTank == undefined ){ return; }
	if( this._drill_EFSu_controllerTank.length == 0 ){ return; }
	for( var i=0; i < this._drill_EFSu_controllerTank.length; i++ ){
		var controller = this._drill_EFSu_controllerTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_controller_destroy();		//（执行销毁）
	}
}


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 对象。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 初始化
//==============================
var _drill_EFSu_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_EFSu_temp_initialize.call(this);
	this._drill_EFSu_spriteTank = [];		//环绕球贴图容器
};
//==============================
// * 贴图控制 - 创建
//==============================
var _drill_EFSu_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFSu_update.call( this );
	if( this._character == undefined ){ return; }
	if( this._character._drill_EFSu_controllerTank == undefined ){ return; }
	if( this._character._drill_EFSu_controllerTank.length == 0 ){ return; }
	if( $gameTemp._drill_spritesetCreated != true ){ return; }
	
	// > 过滤镜像情况
	if( $gameTemp.drill_EFSu_isReflectionSprite( this ) ){ return; }
	
	// > 初始化
	if( this._drill_EFSu_childSprites == undefined ){
		this._drill_EFSu_childSprites = [];
	}
	
	// > 控制器遍历
	for( var i=0; i < this._character._drill_EFSu_controllerTank.length; i++ ){
		var controller = this._character._drill_EFSu_controllerTank[i];
		if( controller == undefined ){ continue; }
		
		// > 过滤生命周期结束情况
		if( controller.drill_controller_isDead() == true ){ continue; }
		
		// > 有绑定控制器的贴图时，跳过
		if( this.drill_EFSu_hasSpriteBinding( controller._drill_controllerSerial ) == true ){ continue; }
		
		// > 创建贴图
		var temp_sprite = new Drill_EFSu_Sprite();
		temp_sprite._drill_curSerial = controller._drill_controllerSerial;	//（标记序列号）
		temp_sprite.drill_sprite_setController( controller );
		temp_sprite.drill_sprite_setIndividualSprite( this );
		temp_sprite.drill_sprite_initChild();
		this._drill_EFSu_childSprites.push( temp_sprite );
		$gameTemp._drill_EFSu_spriteTank.push( temp_sprite );
		
		// > 添加贴图到层级
		//	（先不着急添加）
		
	}
	
}
//==============================
// * 贴图控制 - 是否含有绑定控制器的贴图
//==============================
Sprite_Character.prototype.drill_EFSu_hasSpriteBinding = function( serial ){
	for( var i=0; i < this._drill_EFSu_childSprites.length; i++){
		if( this._drill_EFSu_childSprites[i]._drill_curSerial == serial ){
			return true;
		}
	}
	return false;
}
//==============================
// * 贴图控制 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_EFSu_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}
//==============================
// * 贴图控制 - 帧刷新（地图界面）
//==============================
var _drill_EFSu_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_EFSu_smap_update.call(this);
	this.drill_EFSu_updateInScene();
}
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_Map.prototype.drill_EFSu_updateInScene = function() {
	
	
	// > 层级变化
	for(var i = 0; i < $gameTemp._drill_EFSu_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_EFSu_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		var layer = temp_controller._drill_surround_curLayer;
		if( layer == temp_sprite._drill_curLayer ){ continue; }
		temp_sprite._drill_curLayer = layer;
		
		// > 改变图层
		var i_sprite = temp_sprite._drill_individualSprite;
		$gameTemp.drill_EFSu_layerAddSprite( temp_sprite, layer, i_sprite );
		//alert( temp_controller._drill_surround_curLayer );
		
		// > 层级排序
		$gameTemp.drill_EFSu_sortByZIndex_Scene();
		i_sprite.drill_EFSu_sortByZIndex_Individual();
	}
	
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_EFSu_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_EFSu_spriteTank[i];
		
		// > 自动销毁 - 贴图本身为空
		if( temp_sprite == undefined ){
			$gameTemp._drill_EFSu_spriteTank.splice(i,1);
			continue;
		}
		
		// > 自动销毁 - 控制器生命周期结束
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ||
			temp_controller.drill_controller_isDead() ){
			$gameTemp.drill_EFSu_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_EFSu_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};
//==============================
// * 贴图控制 - 析构函数（地图界面）
//
//			说明：	退出该场景/切换场景 前，执行的函数。
//==============================
var _drill_EFSu_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_EFSu_smap_terminate.call(this);
	this.drill_EFSu_terminate();
}
//==============================
// * 贴图控制 - 析构函数
//==============================
Scene_Map.prototype.drill_EFSu_terminate = function() {
	
	// > 全部销毁 - 贴图
	for(var i = $gameTemp._drill_EFSu_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_EFSu_spriteTank[i];
		$gameTemp.drill_EFSu_layerRemoveSprite( temp_sprite );	//（销毁贴图）
	}
	$gameTemp._drill_EFSu_spriteTank = [];
};



//=============================================================================
// ** 行走图环绕球控制器【Drill_EFSu_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制行走图环绕球的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B变化控制
// **					->C播放GIF
// **					->D环绕轨迹
// **						->层级变化
// **						->行走图前面层/父贴图前面层/父贴图后面层
// **					->E自动调整效果
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_EFSu_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_EFSu_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_EFSu_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_EFSu_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();					//帧刷新 - A主体
	this.drill_controller_updateSurround();				//帧刷新 - D环绕轨迹（优先控制 位置）
	this.drill_controller_updateChange_Position();		//帧刷新 - B变化控制 - 平移
	this.drill_controller_updateChange_Rotation();		//帧刷新 - B变化控制 - 旋转
	this.drill_controller_updateGIF();					//帧刷新 - C播放GIF
														//帧刷新 - E自动调整效果（无）
	this.drill_controller_updateCheckNaN();				//帧刷新 - A主体 - 校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_EFSu_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFSu_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFSu_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFSu_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFSu_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_EFSu_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };								//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };									//控制器 - 暂停情况
	
	// > 贴图
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };							//贴图 - GIF
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Map__characterLayer/" };//贴图 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };								//贴图 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };							//贴图 - 是否倒放
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };								//贴图 - 混合模式
	if( data['tint'] == undefined ){ data['tint'] = 0 };										//贴图 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };								//贴图 - 图像-模糊边缘
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };									//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };												//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };												//A主体 - 平移Y
	
	// > A主体 - 3d效果
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };								//A主体 - 3d效果 - 整体缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };								//A主体 - 3d效果 - 整体缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };									//A主体 - 3d效果 - 整体斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };									//A主体 - 3d效果 - 整体斜切Y
	
	// > B变化控制
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };									//B变化控制 - 自旋转速度（单位角度）
	
	// > C播放GIF（无）
	
	// > D环绕轨迹
	if( data['a'] == undefined ){ data['a'] = 100 };											//D环绕轨迹 - 长轴长度
	if( data['b'] == undefined ){ data['b'] = 20 };												//D环绕轨迹 - 短轴长度
	if( data['surroundSpeed'] == undefined ){ data['surroundSpeed'] = 3.0 };					//D环绕轨迹 - 环绕速度
	if( data['startAngle'] == undefined ){ data['startAngle'] = 0 };							//D环绕轨迹 - 起始角度
	if( data['surroundRotate'] == undefined ){ data['surroundRotate'] = 0 };					//D环绕轨迹 - 轨迹整体角度（单位角度）
	
	// > E自动调整效果
	if( data['auto_shadow'] == undefined ){ data['auto_shadow'] = false };						//E自动调整效果 - 是否自动调整阴影
	if( data['auto_shadowRange'] == undefined ){ data['auto_shadowRange'] = 30 };				//E自动调整效果 - 自动阴影的变化幅度
	if( data['auto_size'] == undefined ){ data['auto_size'] = false };							//E自动调整效果 - 是否自动调整大小
	if( data['auto_sizeRange'] == undefined ){ data['auto_sizeRange'] = 0.2 };					//E自动调整效果 - 自动大小的变化幅度
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_EFSu_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initChange();			//初始化子功能 - B变化控制
	this.drill_controller_initGIF();			//初始化子功能 - C播放GIF
	this.drill_controller_initSurround();		//初始化子功能 - D环绕轨迹
	this.drill_controller_initAuto();			//初始化子功能 - E自动调整效果
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_EFSu_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
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
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_EFSu_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	
	// > 贴图属性
	this._drill_x = 0;					//（B变化控制 控制）
	this._drill_y = 0;					//（B变化控制 控制）
	this._drill_scaleX = 1;				//（暂无控制）
	this._drill_scaleY = 1;				//（暂无控制）
	this._drill_opacity = 255;			//（暂无控制）
	this._drill_yPer = 0;
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_EFSu_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_EFSu_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_EFSu_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_EFSu_checkNaN = false;
			alert( DrillUp.drill_EFSu_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_EFSu_checkNaN = false;
			alert( DrillUp.drill_EFSu_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_EFSu_checkNaN = false;
			alert( DrillUp.drill_EFSu_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_EFSu_checkNaN = false;
			alert( DrillUp.drill_EFSu_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_EFSu_checkNaN = false;
			alert( DrillUp.drill_EFSu_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}


//==============================
// * B变化控制 - 初始化子功能
//==============================
Drill_EFSu_Controller.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 控制器 - 层级属性（无）
	
	// > 控制器 - 环绕球属性
	this._drill_ball_rotation = 0;
	this._drill_ball_scaleX = data['scale_x'];
	this._drill_ball_scaleY = data['scale_y'];
	this._drill_ball_skewX = data['skew_x'];
	this._drill_ball_skewY = data['skew_y'];
}
//==============================
// * B变化控制 - 帧刷新 位置
//==============================
Drill_EFSu_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 位置平移
	this._drill_x += data['x'];
	this._drill_y += data['y'];
}
//==============================
// * B变化控制 - 帧刷新 旋转
//==============================
Drill_EFSu_Controller.prototype.drill_controller_updateChange_Rotation = function(){
	var data = this._drill_data;
	
	// > 自旋转
	this._drill_ball_rotation += data['rotate'];
}


//==============================
// * C播放GIF - 初始化子功能
//==============================
Drill_EFSu_Controller.prototype.drill_controller_initGIF = function() {
	var data = this._drill_data;
	
	// > GIF播放
	this._drill_GIF_time = 0;			//GIF播放 - 当前时间
	this._drill_GIF_index = 0;			//GIF播放 - 当前索引
}
//==============================
// * C播放GIF - 帧刷新
//==============================
Drill_EFSu_Controller.prototype.drill_controller_updateGIF = function(){
	var data = this._drill_data;
	
	// > gif播放
	this._drill_GIF_time += 1;
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
}


//==============================
// * D环绕轨迹 - 初始化子功能
//==============================
Drill_EFSu_Controller.prototype.drill_controller_initSurround = function() {
	var data = this._drill_data;
	
	// > 层级变化
	this._drill_surround_time = 0;
	this._drill_surround_curLayer = "行走图前面层";
}
//==============================
// * D环绕轨迹 - 帧刷新
//==============================
Drill_EFSu_Controller.prototype.drill_controller_updateSurround = function(){
	var data = this._drill_data;
	
	// > 层级变化（实际在界面中 drill_EFSu_updateInScene 进行层级变化）
	this._drill_surround_time += 1;
	var time = this._drill_surround_time * data['surroundSpeed'] + data['startAngle'];
	time = (time %360 + 360) %360;
	if( time < 180 ){
		this._drill_surround_curLayer = "父贴图后面层";
	}else{
		this._drill_surround_curLayer = "行走图前面层";
	}
	
	
	// > 椭圆极坐标公式（实际效果的速度不均匀）
	//var aa = 100;
	//var bb = 30;
	//var theta = this._drill_surround_time*3 /180*Math.PI;
	//var a_t = Math.cos( theta )*Math.cos( theta )/aa/aa;
	//var b_t = Math.sin( theta )*Math.sin( theta )/bb/bb;
	//var r = Math.sqrt( 1/(a_t + b_t) );
	//var xx = r*Math.cos( theta );
	//var yy = r*Math.sin( theta );
	
	// > 变换公式 - 圆公式
	var aa = data['a'];
	var bb = data['b'];
	var theta = time /180*Math.PI;
	var max_r = Math.max( aa, bb );
	var min_r = Math.min( aa, bb );
	var xx = max_r*Math.cos( theta );
	var yy = max_r*Math.sin( theta );
	
	// > y位置的比例
	this._drill_yPer = (yy + max_r)/(max_r*2);
	
	
	// > 变换公式 - 按比例压缩成椭圆
	if( aa > bb ){
		yy = yy * min_r / max_r;
	}else{
		xx = xx * min_r / max_r;
	}
	
	// > 变换公式 - 再次整体旋转
	var new_r = Math.sqrt( Math.pow(xx,2) + Math.pow(yy,2) );
	var new_degree = Math.atan(yy/xx);	
	new_degree = Math.PI - new_degree;
	if( xx < 0 ){ new_degree = Math.PI + new_degree; }
	var new_a = data['surroundRotate'] /180*Math.PI;
	xx = new_r*Math.cos( new_a - new_degree );
	yy = new_r*Math.sin( new_a - new_degree );
	
	this._drill_x = xx;
	this._drill_y = yy;
}
	
	
//==============================
// * E自动调整效果 - 初始化子功能
//==============================
Drill_EFSu_Controller.prototype.drill_controller_initAuto = function() {
	var data = this._drill_data;
	// （无）
}



//=============================================================================
// ** 行走图环绕球贴图【Drill_EFSu_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	> 定义一个环绕球贴图，能够环绕 行走图 进行变化。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B变化控制
// **						->层级位置修正
// **					->C对象绑定
// **						->设置控制器
// **						->设置个体贴图
// **						->贴图初始化（手动）
// **					->D环绕轨迹
// **					->E自动调整效果
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的行走图装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 贴图控制 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 环绕球贴图 - 定义
//==============================
function Drill_EFSu_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_EFSu_Sprite.prototype = Object.create(Sprite.prototype);
Drill_EFSu_Sprite.prototype.constructor = Drill_EFSu_Sprite;
//==============================
// * 环绕球贴图 - 初始化
//==============================
Drill_EFSu_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 环绕球贴图 - 帧刷新
//==============================
Drill_EFSu_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();				//帧刷新 - A主体
	this.drill_sprite_updateChange();			//帧刷新 - B变化控制
												//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateSurround();			//帧刷新 - D环绕轨迹
	this.drill_sprite_updateAuto();				//帧刷新 - E自动调整效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//			
//			说明：	> 由于贴图随时会变换图层，贴图必须标记个体贴图。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
	this._character = this._drill_individualSprite._character;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行初始化。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B变化控制
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initSurround();			//初始化子功能 - D环绕轨迹
	this.drill_sprite_initAuto();				//初始化子功能 - E自动调整效果
};

//##############################
// * 环绕球贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this._drill_individualSprite == undefined ){ return false; }
    return true;
};
//##############################
// * 环绕球贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return this.drill_sprite_isOptimizationPassed_Private();
};
//##############################
// * 环绕球贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 环绕球贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_EFSu_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 环绕球贴图 - 初始化自身（私有）
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
	this._drill_individualSprite = null;		//个体贴图（指针）
	this._character = null;						//物体（指针）
};
//==============================
// * 环绕球贴图 - 销毁子功能（私有）
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_ballSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_ballSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B变化控制
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - D环绕轨迹
	//	（无）
	
	// > 销毁 - E自动调整效果
	//	（无）
};
//==============================
// * 环绕球贴图 - 销毁自身（私有）
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
	this._drill_individualSprite = null;		//个体贴图（指针）
	this._character = null;						//物体（指针）
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	
	// > 资源对象组
	this._drill_bitmapTank = [];
	for(var j = 0; j < data['src_img_gif'].length; j++ ){
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_gif'][j], data['tint'], data['smooth'] );
		this._drill_bitmapTank.push( bitmap );
	}
	
	// > 环绕球 贴图
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = this._drill_bitmapTank[0];
	this._drill_ballSprite = temp_sprite;
	
	// > 环绕球 层
	var temp_layer = new Sprite();
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_ballSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_updateAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 贴图属性
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.opacity = this._drill_controller._drill_opacity;
	this.visible = data['visible'];
	
	// > 贴图 - 层级属性
	//	（无）
}


//==============================
// * B变化控制 - 初始化子功能
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//	（无）
}
//==============================
// * B变化控制 - 帧刷新
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_updateChange = function(){
	var data = this._drill_controller._drill_data;
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	
	
	// > 层级位置修正（实际在界面中 drill_EFSu_updateInScene 进行层级变化）
	var cur_layer = this._drill_controller._drill_surround_curLayer;
	
	if( cur_layer == "行走图前面层" || cur_layer == "在行走图前面" ){
		//（无操作）
	}
	
	if( cur_layer == "父贴图后面层" || cur_layer == "在父贴图后面" ){
		xx += this._character.screenX();		//（直接保持与行走图位置一致）
		yy += this._character.screenY();
		//xx += this._drill_individualSprite.x;	//（不能用父类的位置，会有1帧延迟问题）
		//yy += this._drill_individualSprite.y;
		
		// > 其他插件位置修正
		if( Imported.Drill_EventContinuedEffect ){ //【行走图 - 持续动作效果】
			if( this._character._Drill_ECE != undefined ){
				xx += this._character._Drill_ECE.x;
				yy += this._character._Drill_ECE.y;
			}
		}
		if( Imported.Drill_EventFadeInEffect ){ //【行走图 - 显现动作效果】
			if( this._character._Drill_EFIE != undefined ){
				xx += this._character._Drill_EFIE.x;
				yy += this._character._Drill_EFIE.y;
			}
		}
		if( Imported.Drill_EventFadeOutEffect ){ //【行走图 - 持续动作效果】
			if( this._character._Drill_EFOE != undefined ){
				xx += this._character._Drill_EFOE.x;
				yy += this._character._Drill_EFOE.y;
			}
		}
	}
	this.x = xx;
	this.y = yy;
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D环绕轨迹 - 初始化子功能
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_initSurround = function(){
	var data = this._drill_controller._drill_data;
	this._drill_curLayer = "";			//当前所在层级（与 控制器 延迟同步）
}
//==============================
// * D环绕轨迹 - 帧刷新
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_updateSurround = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 环绕球属性
	this._drill_ballSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
	this._drill_ballSprite.rotation = this._drill_controller._drill_ball_rotation *Math.PI/180;
	this._drill_ballSprite.skew.x  = this._drill_controller._drill_ball_skewX;
	this._drill_ballSprite.skew.y  = this._drill_controller._drill_ball_skewY;
}


//==============================
// * E自动调整效果 - 初始化子功能
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_initAuto = function(){
	var data = this._drill_controller._drill_data;
	
	// > 自动调整 - 大小
	//	（无）
	
	// > 自动调整 - 阴影
	if( data['auto_shadow'] == true ){
		var temp_sprite = new Sprite();
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.bitmap = this._drill_bitmapTank[0];
		temp_sprite.setBlendColor([0, 0, 0, 255]);
		temp_sprite.opacity = 255;
		this._drill_ballShadowSprite = temp_sprite;
		this._drill_layerSprite.addChild( this._drill_ballShadowSprite );
	}
}
//==============================
// * E自动调整效果 - 帧刷新
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_updateAuto = function(){
	var data = this._drill_controller._drill_data;
	
	// > 自动调整 - 大小
	var scale_x = this._drill_controller._drill_ball_scaleX;
	var scale_y = this._drill_controller._drill_ball_scaleY;
	if( data['auto_size'] == true ){
		scale_x -= data['auto_sizeRange'] * this._drill_controller._drill_yPer;
		scale_y -= data['auto_sizeRange'] * this._drill_controller._drill_yPer;
	}
	this._drill_ballSprite.scale.x = scale_x;
	this._drill_ballSprite.scale.y = scale_y;
	
	// > 自动调整 - 阴影
	if( data['auto_shadow'] == true ){
		this._drill_ballShadowSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
		this._drill_ballShadowSprite.opacity = data['auto_shadowRange'] * this._drill_controller._drill_yPer;
		this._drill_ballShadowSprite.rotation = this._drill_ballSprite.rotation;
		this._drill_ballShadowSprite.skew.x = this._drill_ballSprite.skew.x;
		this._drill_ballShadowSprite.skew.y = this._drill_ballSprite.skew.y;
		this._drill_ballShadowSprite.scale.x = this._drill_ballSprite.scale.x;
		this._drill_ballShadowSprite.scale.y = this._drill_ballSprite.scale.y;
	}
}

//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_EFSu_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	if( this.drill_EFSu_posIsInCamera( this._character._realX, this._character._realY ) == false ){
		this.visible = false;
		return false;
	}
	return true;
}
// > 强制更新提示 锁
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_EFSu_Sprite.prototype.drill_EFSu_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】镜头范围内+缩放
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert( DrillUp.drill_EFSu_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LCa_alert = false;
		}
		
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}

