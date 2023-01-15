//=============================================================================
// Drill_EventFrameParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        行走图 - 多层行走图粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey "---粒子样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_EFPa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_EventFrameParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加粒子，绑定在事件或玩家的行走图上面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v2.0及以上★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（个体装饰）.docx"。
 * 细节：
 *   (1.粒子的基本配置如下：出现范围、方向、速度、透明度、缩放。
 *      由于为 个体装饰，粒子的出现范围只能以 个体的半径圆 的范围来出现。
 *   (2.粒子能设置双层效果。
 *   (3.粒子支持弹道倒放，能使得四周扩散的粒子，转变为四周聚集。
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
 * 粒子样式-1 资源-粒子
 * 粒子样式-2 资源-粒子
 * 粒子样式-3 资源-粒子
 * ……
 *
 * 你可以在同一个行走图里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过添加事件注释来添加粒子：
 * 
 * 事件注释：=>多层行走图粒子 : 槽[1] : 设置粒子 : 样式[1]
 * 事件注释：=>多层行走图粒子 : 槽[1] : 删除粒子
 * 事件注释：=>多层行走图粒子 : 清空当前全部粒子
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你也可以通过插件指令来进行设置：
 * 
 * 插件指令：>多层行走图粒子 : 玩家 : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 玩家领队 : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 玩家全员 : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 玩家队员[1] : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 玩家队员变量[21] : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 事件[10] : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 事件变量[21] : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 批量事件[10,11] : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 批量事件变量[21,22] : 槽[1] : 设置粒子 : 样式[1]
 * 
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 设置粒子 : 样式[1]
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 删除粒子
 * 插件指令：>多层行走图粒子 : 本事件 : 清空当前全部粒子
 * 
 * 1.前半部分（玩家）和 后半部分（槽[1] : 设置粒子 : 样式[1]）
 *   的参数可以随意组合。一共有10*3种组合方式。
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
 * 时间复杂度： o(n^3)*o(粒子数量)*o(贴图处理) 每帧
 * 测试方法：   在个体装饰管理层，绑定10个粒子，并性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【81.31ms】
 *              100个事件的地图中，平均消耗为：【72.18ms】
 *               50个事件的地图中，平均消耗为：【65.40ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于事件、玩家添加粒子非常方便，一不小心给10个以上事件加上了。
 *   每个粒子变化时需要进行大量计算。因此消耗比较大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了双层粒子无效的bug。优化了插件的性能。
 *
 *
 *
 * @param ---粒子样式组 1至20---
 * @default
 *
 * @param 粒子样式-1
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-2
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-3
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-4
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-5
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-6
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-7
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-8
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-9
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-10
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-11
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-12
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-13
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-14
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-15
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-16
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-17
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-18
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-19
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-20
 * @parent ---粒子样式组 1至20---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组21至40---
 * @default
 *
 * @param 粒子样式-21
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-22
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-23
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-24
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-25
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-26
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-27
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-28
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-29
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-30
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-31
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-32
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-33
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-34
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-35
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-36
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-37
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-38
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-39
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-40
 * @parent ---粒子样式组21至40---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组41至60---
 * @default
 *
 * @param 粒子样式-41
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-42
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-43
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-44
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-45
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-46
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-47
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-48
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-49
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-50
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-51
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-52
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-53
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-54
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-55
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-56
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-57
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-58
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-59
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-60
 * @parent ---粒子样式组41至60---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组61至80---
 * @default
 *
 * @param 粒子样式-61
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-62
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-63
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-64
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-65
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-66
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-67
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-68
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-69
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-70
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-71
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-72
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-73
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-74
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-75
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-76
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-77
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-78
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-79
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-80
 * @parent ---粒子样式组61至80---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组81至100---
 * @default
 *
 * @param 粒子样式-81
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-82
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-83
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-84
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-85
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-86
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-87
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-88
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-89
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-90
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-91
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-92
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-93
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-94
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-95
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-96
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-97
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-98
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-99
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-100
 * @parent ---粒子样式组81至100---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组101至120---
 * @default
 *
 * @param 粒子样式-101
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-102
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-103
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-104
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-105
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-106
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-107
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-108
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-109
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-110
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-111
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-112
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-113
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-114
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-115
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-116
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-117
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-118
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-119
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-120
 * @parent ---粒子样式组101至120---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组121至140---
 * @default
 *
 * @param 粒子样式-121
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-122
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-123
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-124
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-125
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-126
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-127
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-128
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-129
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-130
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-131
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-132
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-133
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-134
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-135
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-136
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-137
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-138
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-139
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-140
 * @parent ---粒子样式组121至140---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组141至160---
 * @default
 *
 * @param 粒子样式-141
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-142
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-143
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-144
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-145
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-146
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-147
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-148
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-149
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-150
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-151
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-152
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-153
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-154
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-155
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-156
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-157
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-158
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-159
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-160
 * @parent ---粒子样式组141至160---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组161至180---
 * @default
 *
 * @param 粒子样式-161
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-162
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-163
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-164
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-165
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-166
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-167
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-168
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-169
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-170
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-171
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-172
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-173
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-174
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-175
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-176
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-177
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-178
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-179
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-180
 * @parent ---粒子样式组161至180---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组181至200---
 * @default
 *
 * @param 粒子样式-181
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-182
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-183
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-184
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-185
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-186
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-187
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-188
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-189
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-190
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-191
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-192
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-193
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-194
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-195
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-196
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-197
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-198
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-199
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-200
 * @parent ---粒子样式组181至200---
 * @type struct<EFPaStyle>
 * @desc 行走图粒子样式的详细配置信息。
 * @default 
 */
/*~struct~EFPaStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的行走图粒子样式==
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
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)多层行走图粒子
 * @require 1
 * @dir img/Map__characterLayer/
 * @type file
 *
 * @param 平移-粒子 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-粒子 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default -24
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
 * @param 行走图层级
 * @parent ---贴图---
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在行走图前面
 * @value 在行走图前面
 * @desc 该样式所属的行走图层级。父贴图后面是指：地图中物体贴图的后面。
 * @default 在行走图前面
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个行走图中，并且在同一层级时，先后排序的位置，0表示最后面。
 * @default 0
 * 
 * 
 * @param ---粒子效果---
 * @desc 
 * 
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 出现的粒子数量。
 * @default 15
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 45
 *
 * @param 粒子自旋转速度
 * @parent ---粒子效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 *
 * @param 粒子出现范围
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 以贴图中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
 * @default 15
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
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散(随机)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
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
 * @default 1.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 1.0
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
 * @default (需配置)第二层粒子
 * @require 1
 * @dir img/Map__characterLayer/
 * @type file
 *
 * @param 第二层粒子行走图层级
 * @parent ---双层效果---
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在行走图前面
 * @value 在行走图前面
 * @desc 第二次粒子所属的行走图层级。父贴图后面是指：地图中物体贴图的后面。
 * @default 在行走图前面
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 3
 * 
 * 
 * @param ---特殊功能---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---特殊功能---
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
 * @param 粒子弹道是否倒放
 * @parent ---特殊功能---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭。开启倒放后，四周扩散效果 可以变成 四周吸收效果。
 * @default false
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFPa（Event_Frame_Particle）
//		临时全局变量	DrillUp.g_EFPa_xxx
//		临时局部变量	this._drill_EFPa_xxx
//		存储数据变量	$gameSystem._drill_EFPa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(粒子数量)*o(贴图处理)
//		★性能测试因素	个体装饰管理层
//		★性能测试消耗	108.53ms（drill_updateChild）83.68ms（Sprite_Character.prototype.update）92.6ms（按简称筛选统计的消耗）
//		★最坏情况		事件附带了大量粒子装饰贴图。
//		★备注			即使粒子小，也架不住粒子多而产生的额外消耗。
//		
//		★优化记录		
//			2022-10-4优化失败：
//				本来尝试预设15个迭代的随机弹道，然后所有粒子在这15个弹道里轮播。但是这样反而性能消耗增加了，变120.6ms了。
//			2022-10-5优化：
//				添加了接口 优化策略【标准函数】，镜头范围外，直接全部关闭刷新，贴图也关闭帧刷新。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			行走图粒子：
//				->个体层级
//					->添加贴图到层级【标准函数】
//					->去除贴图【标准函数】
//					->图片层级排序（界面装饰）【标准函数】
//					->图片层级排序（个体装饰）【标准函数】
//				->物体容器
//					->统计含控制器的物体
//				->事件
//					->创建控制器（接口）
//					->删除控制器（接口）
//					->删除全部控制器（接口）
//					->控制器帧刷新
//					->控制器销毁
//				->外部控制
//					->创建贴图
//						->控制器与序列号判定
//					->贴图自动销毁
//				->优化策略
//					->判断贴图是否在镜头范围内
//
//				->行走图粒子控制器【Drill_EFPa_Controller】
//				->行走图粒子贴图【Drill_EFPa_Sprite】
//		
//		★私有类如下：
//			* Drill_EFPa_Controller	【行走图粒子控制器】
//			* Drill_EFPa_Sprite		【行走图粒子贴图】
//			* Drill_EFPa_SecSprite	【行走图粒子贴图（第二层）】
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
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFrameParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFrameParticle');
	
	
	//==============================
	// * 变量获取 - 粒子样式
	//				（~struct~EFPaStyle）
	//==============================
	DrillUp.drill_EFPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 资源
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Map__characterLayer/";
		
		// > 贴图
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['anim_index'] = String( dataFrom["行走图层级"] || "在行走图前面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_selfRotate'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 40);
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_animIndex'] = String( dataFrom["第二层粒子行走图层级"] || "在行走图前面");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		// > 特殊功能
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		
		return data;
	}
	
	/*-----------------粒子样式------------------*/
	DrillUp.g_EFPa_style_length = 200;
	DrillUp.g_EFPa_style = [];
	for (var i = 0; i < DrillUp.g_EFPa_style_length; i++) {
		if( DrillUp.parameters['粒子样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['粒子样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['粒子样式-' + String(i+1) ]);
			DrillUp.g_EFPa_style[i] = DrillUp.drill_EFPa_styleInit( data );
			DrillUp.g_EFPa_style[i]['id'] = i+1;
			DrillUp.g_EFPa_style[i]['inited'] = true;
		}else{
			DrillUp.g_EFPa_style[i] = DrillUp.drill_EFPa_styleInit( {} );
			DrillUp.g_EFPa_style[i]['id'] = i+1;
			DrillUp.g_EFPa_style[i]['inited'] = false;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EFPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFPa_pluginCommand.call(this, command, args);
	if( command === ">多层行走图粒子" ){
		
		/*-----------------对象组获取------------------*/
		var char_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( char_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EFPa_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EFPa_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFPa_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFPa_isEventExist( e_id ) == false ){ return; }
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
			if( temp1 == "清空当前全部粒子" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_removeControllerAll();
				}
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			if( type == "删除粒子" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_removeController( Number(temp1)-1 );
				}
			}
		}
		if( args.length == 8 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "设置粒子" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_createController( Number(temp1)-1, Number(temp2)-1 );
				}
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFPa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventFrameParticle.js 行走图 - 多层行走图粒子】\n" +
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
var _drill_EFPa_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFPa_c_setupPageSettings.call(this);
	this.drill_EFPa_setupPageSettings();
}
Game_Event.prototype.drill_EFPa_setupPageSettings = function() {
	
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
				if( command == "=>多层行走图粒子" ){
					
					if( args.length == 2 ){
						var temp1 = String(args[1]);
						if( temp1 == "清空当前全部粒子" ){
							this.drill_EFPa_removeControllerAll();
						}
					}
					if( args.length == 4 ){
						var temp1 = String(args[1]);
						var type = String(args[3]);
						if( type == "删除粒子" ){
							temp1 = temp1.replace("槽[","");
							temp1 = temp1.replace("]","");
							this.drill_EFPa_removeController( Number(temp1)-1 );
						}
					}
					if( args.length == 6 ){
						var temp1 = String(args[1]);
						var type = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "设置粒子" ){
							temp1 = temp1.replace("槽[","");
							temp1 = temp1.replace("]","");
							temp2 = temp2.replace("样式[","");
							temp2 = temp2.replace("]","");
							this.drill_EFPa_createController( Number(temp1)-1, Number(temp2)-1 );
						}
					}
				};
				
			};
		};
    }
}


//=============================================================================
// ** 临时变量初始化
//=============================================================================
var _drill_EFPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_EFPa_temp_initialize.call(this);
	this._drill_EFPa_spriteTank = [];		//粒子贴图容器
};


//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_EFPa_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}


//#############################################################################
// ** 【标准模块】个体层级
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
Game_Temp.prototype.drill_EFPa_layerAddSprite = function( sprite, layer_index, individual_sprite ){
    this.drill_EFPa_layerAddSprite_Private( sprite, layer_index, individual_sprite );
}
//##############################
// * 个体层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从父层级中移除。
//##############################
Game_Temp.prototype.drill_EFPa_layerRemoveSprite = function( sprite ){
	this.drill_EFPa_layerRemoveSprite_Private( sprite );
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
Game_Temp.prototype.drill_EFPa_sortByZIndex_Scene = function(){
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
Sprite_Character.prototype.drill_EFPa_sortByZIndex_Individual = function(){
	this._drill_characterUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});				//行走图前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 行走图前面层
//==============================
var _drill_EFPa_layer_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFPa_layer_update.call(this);
	if( this._drill_characterUpArea == undefined ){				//行走图前面层
		this._drill_characterUpArea = new Sprite();
		this.addChild(this._drill_characterUpArea);
	}
};
//==============================
// * 个体层级 - 父贴图后面层 - 地图界面
//==============================
var _drill_EFPa_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( this._drill_characterPBackArea == undefined ){			//父贴图后面层
		this._drill_characterPBackArea = new Sprite();
		this._drill_characterPBackArea.z = 0.85;				//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_characterPBackArea);
	}
	
	_drill_EFPa_layer_createCharacters.call(this);
};
//==============================
// * 个体层级 - 添加贴图到层级（私有）
//==============================
Game_Temp.prototype.drill_EFPa_layerAddSprite_Private = function( sprite, layer_index, individual_sprite ){
	if( layer_index == "父贴图后面层" || layer_index == "在父贴图后面" ){
		if( $gameTemp._drill_spritesetCreated != true ){ return; }
		var cur_scene = SceneManager._scene;
		if( cur_scene instanceof Scene_Map ){
			sprite._drill_isAtAnimPBackArea = true;		//（标记 - 在父贴图后面）
			cur_scene._spriteset._drill_characterPBackArea.addChild( sprite );
		}
	}
	if( layer_index == "行走图前面层" || layer_index == "在行走图前面" ){
		individual_sprite._drill_characterUpArea.addChild( sprite );
	}
};
//==============================
// * 个体层级 - 层级 锁
//==============================
var _drill_EFPa_layerMap_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	$gameTemp._drill_spritesetCreated = false;
	_drill_EFPa_layerMap_createDisplayObjects.call(this);
	$gameTemp._drill_spritesetCreated = true;
};
//==============================
// * 个体层级 - 去除贴图（私有）
//==============================
Game_Temp.prototype.drill_EFPa_layerRemoveSprite_Private = function( sprite ){
	if( sprite == undefined ){ return; }
	
	// > 销毁
	sprite.drill_EFPa_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};



//=============================================================================
// ** 物体容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_EFPa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EFPa_temp_initialize2.call(this);
	this._drill_EFPa_characterTank = [];			//（含粒子的事件）
	this._drill_EFPa_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EFPa_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_EFPa_characterTank = [];		//（含粒子的事件）
	$gameTemp._drill_EFPa_needRestatistics = true;
	
	// > 原函数
	_drill_EFPa_gmap_setup.call( this, mapId );
	
	this.drill_EFPa_updateRestatistics();		//（强制刷新统计一次，确保刚加载就有）
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EFPa_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EFPa_characterTank = [];
	$gameTemp._drill_EFPa_needRestatistics = true;
	$gameMap.drill_EFPa_updateRestatistics();	//（强制刷新统计一次，确保刚加载就有）
	_drill_EFPa_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 地图销毁时
//==============================
var _drill_EFPa_map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_EFPa_map_terminate.call(this);
	$gameTemp._drill_EFPa_characterTank = [];
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EFPa_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive){
	_drill_EFPa_map_update.call(this,sceneActive);
	this.drill_EFPa_updateRestatistics();			//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EFPa_updateRestatistics = function() {
	if( $gameTemp._drill_EFPa_needRestatistics != true ){ return }
	$gameTemp._drill_EFPa_needRestatistics = false;
	
	$gameTemp._drill_EFPa_characterTank = [];		//容器中的物体，只增不减，除非清零
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._drill_EFPa_controllerTank == undefined ){ continue; }
		if( temp_event._drill_EFPa_controllerTank.length == 0 ){ continue; }
		$gameTemp._drill_EFPa_characterTank.push(temp_event);
	}
}


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _drill_EFPa_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function(){
	this._drill_EFPa_controllerTank = null;
	_drill_EFPa_c_initMembers.call( this );
}
//==============================
// * 事件 - 创建控制器（接口）
//==============================
Game_CharacterBase.prototype.drill_EFPa_createController = function( slot_id, style_id ){
	if( this._drill_EFPa_controllerTank == undefined ){
		this._drill_EFPa_controllerTank = [];
	}
	
	// > 销毁原来的
	this.drill_EFPa_removeController( slot_id );
	
	// > 创建控制器
	var data = JSON.parse(JSON.stringify( DrillUp.g_EFPa_style[ style_id ] ));
	var controller = new Drill_EFPa_Controller( data );
	this._drill_EFPa_controllerTank[ slot_id ] = controller;
	
	// > 刷新统计
	$gameTemp._drill_EFPa_needRestatistics = true;
}
//==============================
// * 事件 - 去除控制器（接口）
//==============================
Game_CharacterBase.prototype.drill_EFPa_removeController = function( slot_id ){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_EFPa_controllerTank[ slot_id ].drill_EFPa_destroy();
	this._drill_EFPa_controllerTank[ slot_id ] = null;
}
//==============================
// * 事件 - 去除全部控制器（接口）
//==============================
Game_CharacterBase.prototype.drill_EFPa_removeControllerAll = function(){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		this.drill_EFPa_removeController( i );
	}
	this._drill_EFPa_controllerTank = null;
}
//==============================
// * 事件 - 帧刷新
//==============================
var _drill_EFPa_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EFPa_c_update.call(this);
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank.length == 0 ){ return; }
	
	// > 控制器帧刷新
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		var controller = this._drill_EFPa_controllerTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_EFPa_update();
	}
	
	// > 自动销毁 - 控制器
	var is_all_empty = true;
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		var controller = this._drill_EFPa_controllerTank[i];
		if( controller == undefined ){ continue; }
		is_all_empty = false;
		if( controller.drill_EFPa_isDead() ){
			this._drill_EFPa_controllerTank[i] = null;
		}
	}
	if( is_all_empty == true ){
		this._drill_EFPa_controllerTank = null;
	}
}



//=============================================================================
// ** 外部控制
//=============================================================================
//==============================
// * 外部控制 - 创建贴图
//==============================
var _drill_EFPa_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFPa_update.call( this );
	if( this._character == undefined ){ return; }
	if( this._character._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._character._drill_EFPa_controllerTank.length == 0 ){ return; }
	if( $gameTemp._drill_spritesetCreated != true ){ return; }
	
	// > 过滤镜像情况
	if( $gameTemp.drill_EFPa_isReflectionSprite( this ) ){ return; }
	
	// > 初始化
	if( this._drill_EFPa_childSprites == undefined ){
		this._drill_EFPa_childSprites = [];
	}
	
	// > 控制器遍历
	for( var i=0; i < this._character._drill_EFPa_controllerTank.length; i++ ){
		var controller = this._character._drill_EFPa_controllerTank[i];
		if( controller == undefined ){ continue; }
		
		// > 过滤生命周期结束情况
		if( controller.drill_EFPa_isDead() == true ){ continue; }
		
		// > 有绑定控制器的贴图时，跳过
		if( this.drill_EFPa_hasSpriteBinding( controller._drill_controllerSerial ) == true ){ continue; }
		
		// > 创建贴图
		var data = controller._drill_data;
		var temp_sprite = new Drill_EFPa_Sprite();
		temp_sprite._drill_curSerial = controller._drill_controllerSerial;	//（标记序列号）
		temp_sprite.drill_EFPa_setController( controller );
		temp_sprite.drill_EFPa_setIndividualSprite( this );
		temp_sprite.drill_EFPa_initSprite();
		this._drill_EFPa_childSprites.push( temp_sprite );
		$gameTemp._drill_EFPa_spriteTank.push( temp_sprite );
		
		// > 添加贴图到层级
		$gameTemp.drill_EFPa_layerAddSprite( temp_sprite, data['anim_index'], this );
		
		
		// > 双层效果
		if( data['second_enable'] == true ){
			
			// > 双层效果 - 创建贴图
			var temp_secSprite = new Drill_EFPa_SecSprite( temp_sprite );
			$gameTemp._drill_EFPa_spriteTank.push( temp_secSprite );
			
			// > 双层效果 - 添加贴图到层级
			$gameTemp.drill_EFPa_layerAddSprite( temp_secSprite, data['second_animIndex'], this );
		}
	}
	
	// > 层级排序
	this.drill_EFPa_sortByZIndex_Individual();
	$gameTemp.drill_EFPa_sortByZIndex_Scene();
	
}
//==============================
// * 外部控制 - 是否含有绑定控制器的贴图
//==============================
Sprite_Character.prototype.drill_EFPa_hasSpriteBinding = function( serial ){
	for( var i=0; i < this._drill_EFPa_childSprites.length; i++){
		if( this._drill_EFPa_childSprites[i]._drill_curSerial == serial ){
			return true;
		}
	}
	return false;
}
//==============================
// * 外部控制 - 帧刷新 - 地图界面
//==============================
var _drill_EFPa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_EFPa_smap_update.call(this);
	this.drill_EFPa_updateInScene();
}
Scene_Map.prototype.drill_EFPa_updateInScene = function() {
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_EFPa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_EFPa_spriteTank[i];
		
		// > 自动销毁 - 贴图本身为空
		if( temp_sprite == undefined ){
			$gameTemp._drill_EFPa_spriteTank.splice(i,1);
			continue;
		}
		
		// > 自动销毁 - 控制器生命周期结束
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ||
			temp_controller.drill_EFPa_isDead() ){
			$gameTemp.drill_EFPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_EFPa_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};



//=============================================================================
// ** 行走图粒子控制器【Drill_EFPa_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制行走图粒子的数据类。
// **		子功能：	->帧刷新
// **						->显示/隐藏
// **						->暂停/继续
// **						> 平移
// **						> 旋转
// **						> 缩放
// **					->重设数据
// **						->序列号
// **					->粒子播放
// **					->随机位置
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_EFPa_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_EFPa_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_EFPa_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_EFPa_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_EFPa_Controller.prototype.drill_EFPa_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_EFPa_updateParData();	//帧刷新 - 粒子数据
	this.drill_EFPa_updatePosition();	//帧刷新 - 位置
	this.drill_EFPa_updateCheckNaN();	//帧刷新 - 校验值
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
Drill_EFPa_Controller.prototype.drill_EFPa_resetData = function( data ){
	this.drill_EFPa_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFPa_Controller.prototype.drill_EFPa_setVisible = function( visible ){
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
Drill_EFPa_Controller.prototype.drill_EFPa_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFPa_Controller.prototype.drill_EFPa_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFPa_Controller.prototype.drill_EFPa_isDead = function(){
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
Drill_EFPa_Controller.prototype.drill_initData = function(){
	var data = this._drill_data;
	
	// > 绑定
	if( data['visible'] == undefined ){ data['visible'] = true };				//显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };					//暂停情况
	
	// > 资源
	if( data['src_img'] == undefined ){ data['src_img'] = "" };										//资源 - 粒子
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Map__characterLayer/" };	//资源 - 文件夹
	
	// > 贴图
	if( data['x'] == undefined ){ data['x'] = 0 };								//贴图 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };								//贴图 - 平移Y
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };				//贴图 - 混合模式
	if( data['anim_index'] == undefined ){ data['anim_index'] = "在行走图前面" };//贴图 - 行走图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };					//贴图 - 图片层级
	
	// > 粒子效果
	if( data['par_count'] == undefined ){ data['par_count'] = 15 };							//粒子效果 - 粒子数量
	if( data['par_life'] == undefined ){ data['par_life'] = 30 };							//粒子效果 - 粒子生命周期
	if( data['par_selfRotate'] == undefined ){ data['par_selfRotate'] = 1.0 };				//粒子效果 - 粒子自旋转速度
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };				//粒子效果 - 粒子出现范围
	if( data['par_scaleMode'] == undefined ){ data['par_scaleMode'] = "固定缩放值" };		//粒子效果 - 粒子缩放模式
	if( data['par_scaleBase'] == undefined ){ data['par_scaleBase'] = 1.0 };				//粒子效果 - 粒子缩放值
	if( data['par_scaleRandom'] == undefined ){ data['par_scaleRandom'] = 0.2 };			//粒子效果 - 粒子缩放随机波动量
	
	if( data['par_dirMode'] == undefined ){ data['par_dirMode'] = "四周扩散(随机)" };		//粒子效果 - 粒子方向模式
	if( data['par_dirFix'] == undefined ){ data['par_dirFix'] = 90.0 };						//粒子效果 - 粒子固定方向
	if( data['par_dirSectorFace'] == undefined ){ data['par_dirSectorFace'] = 45.0 };		//粒子效果 - 粒子扇形朝向
	if( data['par_dirSectorDegree'] == undefined ){ data['par_dirSectorDegree'] = 30.0 };	//粒子效果 - 粒子扇形角度
	if( data['par_speedMode'] == undefined ){ data['par_speedMode'] = "只初速度" };			//粒子效果 - 粒子速度模式
	if( data['par_speedBase'] == undefined ){ data['par_speedBase'] = 0.5 };				//粒子效果 - 粒子初速度
	if( data['par_speedRandom'] == undefined ){ data['par_speedRandom'] = 2.0 };			//粒子效果 - 粒子速度随机波动量
	if( data['par_opacityMode'] == undefined ){ data['par_opacityMode'] = "先显现后消失" };	//粒子效果 - 粒子透明度模式
	
	// > 双层效果
	if( data['second_enable'] == undefined ){ data['second_enable'] = false };				//双层效果 - 是否开启双层效果
	if( data['second_src_img'] == undefined ){ data['second_src_img'] = "" };				//双层效果 - 第二层粒子资源
	if( data['second_animIndex'] == undefined ){ data['second_animIndex'] = "在行走图前面" };//双层效果 - 第二层粒子个体层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };					//双层效果 - 第二层粒子图片层级
	
	// > 特殊功能
	if( data['seed_enable'] == undefined ){ data['seed_enable'] = false };					//特殊功能 - 是否固定随机种子
	if( data['seed_value'] == undefined ){ data['seed_value'] = 0.20221002 };				//特殊功能 - 固定随机种子
	if( data['par_backrun'] == undefined ){ data['par_backrun'] = false };					//特殊功能 - 粒子弹道是否倒放
}
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_EFPa_Controller.prototype.drill_initPrivateData = function(){
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	
	
	// > 控制器 - 贴图属性
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_opacity = 255;
	this._drill_rotation = data['parentRotate'];	//（整体再旋转角度）
	
	
	// > 粒子群弹道 - 随机因子
	this._drill_randomFactor_speed = Math.random();
	this._drill_randomFactor_dir = Math.random();
	this._drill_randomFactor_opacity = Math.random();
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_speed = data['seed_value'] %1;
		this._drill_randomFactor_dir = data['seed_value'] *41 %1;
		this._drill_randomFactor_opacity = data['seed_value'] *71 %1;
	}
	
	// > 粒子群弹道 - 粒子属性
	this._drill_parNum = data['par_count'];			//粒子数量
	this._drill_parList_x = [];						//粒子 - X
	this._drill_parList_y = [];						//粒子 - Y
	this._drill_parList_opacity = [];				//粒子 - 透明度
	this._drill_parList_rotation = [];				//粒子 - 旋转
	this._drill_parList_scaleX = [];				//粒子 - 缩放X
	this._drill_parList_scaleY = [];				//粒子 - 缩放Y
	this._drill_parList_curTime = [];				//粒子 - 当前时间
	this._drill_parList_randomIteration = [];		//粒子 - 迭代次数
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_x[i] = 0;
		this._drill_parList_y[i] = 0;
		this._drill_parList_opacity[i] = 0;
		this._drill_parList_rotation[i] = Math.floor( 360*this.drill_EFPa_curRandom(i) );		//（随机旋转角度）
		if( data['par_selfRotate'] == 0 ){ this._drill_parList_rotation[i] = 0; }
		this._drill_parList_scaleX[i] = 1.0;
		this._drill_parList_scaleY[i] = 1.0;
		this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );	//（线性的初始时间，保持粒子均匀）
		this._drill_parList_randomIteration[i] = 0;
		this.drill_EFPa_resetParticles( i );		//（重设）
	}
	
	// > 粒子群弹道 - 弹道初始化
	this._drill_EFPa_ballistics_move = {};
	this._drill_EFPa_ballistics_opacity = {};
    this.drill_initBallisticsMove( data, data, data['par_life'] );		//弹道初始化（坐标）
    this.drill_initBallisticsOpacity( data, data['par_life'] );			//弹道初始化（透明度）
}
//==============================
// * 粒子群弹道 - 弹道初始化（坐标）
//
//			说明：	> 只存 弹道配置，不存 实际弹道。包括随机因子、随机迭代次数。
//					> 实际弹道只在贴图中进行推演并使用。
//==============================
Drill_EFPa_Controller.prototype.drill_initBallisticsMove = function( data, b_data, sustain ){
	
	// > 弹道初始化（坐标）
	var temp_b_move = {}
	
	//   移动（movement）
	temp_b_move['movementNum'] = this._drill_parNum;							//数量
	temp_b_move['movementTime'] = sustain;										//时长
	temp_b_move['movementDelay'] = 0;											//延迟
	temp_b_move['movementEndDelay'] = 0;										//延迟
	temp_b_move['movementOrderDelay'] = 0;										//依次延迟时间
	temp_b_move['movementMode'] = "极坐标模式";									//移动模式
	//   极坐标（polar）
	temp_b_move['polarSpeedType'] = b_data["par_speedMode"];					//极坐标 - 速度 - 类型
	temp_b_move['polarSpeedBase'] = b_data["par_speedBase"];					//极坐标 - 速度 - 初速度
	temp_b_move['polarSpeedRandom'] = b_data["par_speedRandom"];				//极坐标 - 速度 - 速度随机波动量
	temp_b_move['polarSpeedInc'] = null;										//极坐标 - 速度 - 加速度
	temp_b_move['polarSpeedMax'] = null;										//极坐标 - 速度 - 最大速度
	temp_b_move['polarSpeedMin'] = null;										//极坐标 - 速度 - 最小速度
	temp_b_move['polarDistanceFormula'] = null;									//极坐标 - 速度 - 路程计算公式
	temp_b_move['polarDirType'] = b_data["par_dirMode"];						//极坐标 - 方向 - 类型
	temp_b_move['polarDirFixed'] = b_data["par_dirFix"];						//极坐标 - 方向 - 固定方向
	temp_b_move['polarDirSectorFace'] = b_data["par_dirSectorFace"];			//极坐标 - 方向 - 扇形朝向
	temp_b_move['polarDirSectorDegree'] = b_data["par_dirSectorDegree"];		//极坐标 - 方向 - 扇形角度
	temp_b_move['polarDirFormula'] = null;										//极坐标 - 方向 - 方向计算公式
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系。）
	temp_b_move['polarSpeedRandomFactor'] = this._drill_randomFactor_speed;	//极坐标 - 速度 - 随机因子
	temp_b_move['polarDirRandomFactor'] = this._drill_randomFactor_dir;		//极坐标 - 方向 - 随机因子
	// > 随机迭代次数（RandomIteration）
	//		（每个粒子对应一个随机迭代次数，变换弹道用。）
	temp_b_move['polarSpeedRandomIterationList'] = this._drill_parList_randomIteration;
	temp_b_move['polarDirRandomIterationList'] = this._drill_parList_randomIteration;
	
	// > 生成参数数据
	this._drill_EFPa_ballistics_move = $gameTemp.drill_COBa_setBallisticsMove( temp_b_move );
}
//==============================
// * 粒子群弹道 - 弹道初始化（透明度）
//
//			说明：	> 只存 弹道配置，不存 实际弹道。包括随机因子、随机迭代次数。
//					> 实际弹道只在贴图中进行推演并使用。
//==============================
Drill_EFPa_Controller.prototype.drill_initBallisticsOpacity = function( data, sustain ){
	
	// > 弹道初始化（透明度）
	var temp_b_opacity = {};
	temp_b_opacity['opacityNum'] = this._drill_parNum;		//数量
	temp_b_opacity['opacityTime'] = sustain;				//时长
	temp_b_opacity['opacityDelay'] = 0;						//延迟
	temp_b_opacity['opacityEndDelay'] = 0;					//延迟
	temp_b_opacity['opacityOrderDelay'] = 0;				//依次延迟时间
	temp_b_opacity['opacityMode'] = "时间锚点模式";			//变化模式
	
	if( data['par_opacityMode'] == "逐渐消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失(慢速)" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':45,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':55,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':25,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':75,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失(快速)" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':10,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':90,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "保持原透明度" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':255} );
	}
	else if( data['par_opacityMode'] == "一闪一闪" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':30,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':35,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':40,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':45,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':50,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':70,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':75,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':80,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':85,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':90,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else{
		alert(
			"【Drill_EventFrameParticle.js 行走图-多层行走图粒子】\n"+
			"透明度类型错误，没有类型'" + data['par_opacityMode'] + "'。"
		);
	}
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系。）
	temp_b_opacity['randomFactor'] = this._drill_randomFactor_opacity;
	// > 随机迭代次数（RandomIteration）
	//		（每个粒子对应一个随机迭代次数，变换弹道用。）
	temp_b_opacity['randomIterationList'] = this._drill_parList_randomIteration;
	
	// > 生成参数数据
	this._drill_EFPa_ballistics_opacity = $gameTemp.drill_COBa_setBallisticsOpacity( temp_b_opacity );
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_resetData_Private = function( data ){
	
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
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
}

//==============================
// * 帧刷新 - 粒子数据
//
//			说明：	注意，控制器中不含 实际弹道 ，实际弹道在贴图中推演展开。
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_updateParData = function(){
	var data = this._drill_data;
	for( var i=0; i < this._drill_parNum; i++ ){
		
		// > 位置（弹道在贴图中叠加）
		//（无）
		
		// > 透明度（弹道在贴图中叠加）
		//（无）
		
		// > 自旋转
		this._drill_parList_rotation[i] += data['par_selfRotate'];
		
		// > 缩放（重设中才变化）
		//（无）
		
		// > 当前时间
		this._drill_parList_curTime[i] += 1;
		if( this._drill_parList_curTime[i] >= data['par_life'] ){
			this._drill_parList_curTime[i] = 0;
			
			//（生命周期结束时，重设）
			this.drill_EFPa_resetParticles( i );
		}
		
		// > 迭代次数（重设中才变化）
		//（无）
	}
};
//==============================
// * 粒子数据 - 重设
//==============================	
Drill_EFPa_Controller.prototype.drill_EFPa_resetParticles = function( i ){
	var data = this._drill_data;
	var iteration = this._drill_parList_randomIteration[i];
	
	// > 位置
	var angle = 360 * this.drill_EFPa_curRandom( iteration*i );
	var radius = data['par_birthRange'] * this.drill_EFPa_curRandom( iteration*i +1000 );
	var xx = radius * Math.cos( angle *Math.PI/180 );
	var yy = radius * Math.sin( angle *Math.PI/180 );
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
		
	// > 透明度
	//（无）
	
	// > 自旋转
	//（无）
	
	// > 缩放
	if( data['par_scaleMode'] == "固定缩放值" ){
		this._drill_parList_scaleX[i] = data['par_scaleBase'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		this._drill_parList_scaleX[i] = data['par_scaleBase'] + (this.drill_EFPa_curRandom( iteration*i +2000 ) - 0.5) * data['par_scaleRandom'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'] + (this.drill_EFPa_curRandom( iteration*i +2000 ) - 0.5) * data['par_scaleRandom'];
	}
	
	// > 当前时间
	//（无）
	
	// > 迭代次数
	this._drill_parList_randomIteration[i] += 1;
	
};
//==============================
// * 粒子数据 - 当前的随机数
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_curRandom = function( iteration ){
	return this.drill_EFPa_getRandomInIteration( this._drill_randomFactor_opacity, iteration );
};
//==============================
// * 数学 - 生成随机数（随机种子）
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};
//==============================
// * 数学 - 生成随机数（迭代）
//			
//			参数：	> org_ran 数字   （0~1原随机数）
//					> iteration 数字 （正整数，迭代次数）
//			返回：	> 数字           （0~1新随机数）
//			
//			说明：	> 经过迭代后，能够得到乱序的随机数。
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_getRandomInIteration = function( org_ran, iteration ){
	var prime = DrillUp.drill_EFPa_primeList[ iteration % DrillUp.drill_EFPa_primeList.length ];
	var temp_ran = ( (org_ran + iteration) * 9301 + 49297 ) % 233280;
	temp_ran = temp_ran / prime;
	var new_ran = (temp_ran + org_ran * iteration * prime) %1;
	return new_ran;
};
//==============================
// * 数学 - 质数表（1000以内）
//==============================
DrillUp.drill_EFPa_primeList = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
	73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,
	191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,
	311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,
	439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,
	577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,
	709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,
	857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];

//==============================
// * 位置 - 帧刷新
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_updatePosition = function(){
	var data = this._drill_data;
	
	// > 位置平移
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	
	this._drill_x = xx;
	this._drill_y = yy;
}

//==============================
// * 帧刷新 - 校验值
//==============================
Drill_EFPa_Controller.prototype.drill_EFPa_updateCheckNaN = function(){
	
	// > 校验值
	if( DrillUp.g_EFPa_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_EFPa_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图粒子】\n"+
				"检测到控制器参数_drill_x出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_EFPa_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图粒子】\n"+
				"检测到控制器参数_drill_y出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_EFPa_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图粒子】\n"+
				"检测到控制器参数_drill_opacity出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_EFPa_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图粒子】\n"+
				"检测到控制器参数_drill_scaleX出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_EFPa_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图粒子】\n"+
				"检测到控制器参数_drill_scaleY出现了NaN值，请及时检查你的函数。"
			);
		}
	}
}



//=============================================================================
// ** 行走图粒子贴图【Drill_EFPa_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	> 定义一个粒子贴图。
// **		子功能：	->对象绑定
// **						->设置控制器
// **						->设置个体贴图
// **					->贴图初始化（手动）
// **					->销毁（手动）
// **					->层级位置修正
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的行走图装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 贴图与数据合并。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，在 _spriteset 创建后，再创建此贴图。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_EFPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_EFPa_Sprite.prototype = Object.create(Sprite.prototype);
Drill_EFPa_Sprite.prototype.constructor = Drill_EFPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_EFPa_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//物体对象
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_EFPa_Sprite.prototype.update = function() {
	if( this.drill_EFPa_isReady() == false ){ return; }
	if( this.drill_EFPa_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_updateLayer();					//帧刷新 - 层级
	this.drill_updateChild();					//帧刷新 - 粒子
}
//##############################
// * 粒子贴图 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * 粒子贴图 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
	this._character = this._drill_individualSprite._character;
};
//##############################
// * 粒子贴图 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行初始化。
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_initSprite = function(){
	this.drill_EFPa_initSprite_Private();
};
//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this._drill_individualSprite == undefined ){ return false; }
    return true;
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_isOptimizationPassed = function(){
    return this.drill_EFPa_isOptimizationPassed_Private();
};
//##############################
// * 粒子贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_destroy = function(){
	this.drill_EFPa_destroy_Private();
};
//==============================
// * 粒子贴图 - 贴图初始化（私有）
//==============================
Drill_EFPa_Sprite.prototype.drill_EFPa_initSprite_Private = function(){
	
	// > 私有数据初始化
	var data = this._drill_controller._drill_data;
	
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	
	// > 粒子集合
	this._drill_EFPa_parSprite = [];		//粒子贴图容器
	for( var j = 0; j < this._drill_controller._drill_parNum; j++ ){	
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], 0, true );
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.blendMode = data['blendMode'];
		temp_sprite.opacity = 0;
		this._drill_EFPa_parSprite.push(temp_sprite);
		this.addChild(temp_sprite);
	}
	
	// > 粒子弹道
	this._drill_EFPa_curIteration = [];		//（当前迭代次数）
	this._drill_EFPa_parBMoveX = [];
	this._drill_EFPa_parBMoveY = [];
	this._drill_EFPa_parBOpacity = [];
	for( var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		this._drill_EFPa_curIteration[i] = 1;
		this.drill_refreshBallistics( i );
	}
	
};
//==============================
// * 粒子贴图 - 销毁（私有）
//==============================
Drill_EFPa_Sprite.prototype.drill_EFPa_destroy_Private = function(){
	
	// > 贴图销毁
	for( var i=0; i < this._drill_EFPa_parSprite.length; i++ ){
		var par_sprite = this._drill_EFPa_parSprite[i];
		this.removeChild( par_sprite );
	}
	this._drill_EFPa_parSprite = null;
	
	// > 指针清空
	this._drill_controller = null;				//控制器对象
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//父对象
};
//==============================
// * 帧刷新 - 层级
//==============================
Drill_EFPa_Sprite.prototype.drill_updateLayer = function() {
	var data = this._drill_controller._drill_data;
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	
	
	// > 层级位置修正
	var cur_layer = this._drill_EFPa_curLayer;
	
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
	
	
	// > 贴图 - 贴图属性
	this.x = xx;
	this.y = yy;
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.opacity = this._drill_controller._drill_opacity;
	this.visible = data['visible'];
	
}
//==============================
// * 粒子群弹道 - 重新推演弹道
//==============================
Drill_EFPa_Sprite.prototype.drill_refreshBallistics = function( i ){
	
	// > 粒子群弹道 - 预推演（坐标）
	var org_x = this._drill_controller._drill_parList_x[i];
	var org_y = this._drill_controller._drill_parList_y[i];
	$gameTemp._drill_COBa_moveData = this._drill_controller._drill_EFPa_ballistics_move;
	$gameTemp.drill_COBa_preBallisticsMove( this, i, org_x, org_y );
	this._drill_EFPa_parBMoveX[i] = this._drill_COBa_x;
	this._drill_EFPa_parBMoveY[i] = this._drill_COBa_y;
	this._drill_COBa_x = null;
	this._drill_COBa_y = null;
	
	// > 粒子群弹道 - 预推演（透明度）
	$gameTemp._drill_COBa_commonData = this._drill_controller._drill_EFPa_ballistics_opacity;
	$gameTemp.drill_COBa_preBallisticsOpacity( this, i, 0 );
	this._drill_EFPa_parBOpacity[i] = this._drill_COBa_opacity;
	this._drill_COBa_opacity = null;
}
//==============================
// * 粒子 - 帧刷新
//==============================
Drill_EFPa_Sprite.prototype.drill_updateChild = function() {
	var data = this._drill_controller._drill_data;
	
	// > 每次迭代变化时，重新推演弹道
	for(var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		if( this._drill_EFPa_curIteration[i] != this._drill_controller._drill_parList_randomIteration[i] ){
			this._drill_EFPa_curIteration[i] =  this._drill_controller._drill_parList_randomIteration[i];
			
			this.drill_refreshBallistics( i );
		}
	}
	
	// > 贴图 - 粒子属性
	for(var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		var par_sprite = this._drill_EFPa_parSprite[i];
		var time = this._drill_controller._drill_parList_curTime[i];
		
		// > 粒子弹道倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		var xx = this._drill_controller._drill_parList_x[i];
		var yy = this._drill_controller._drill_parList_y[i];
		var oo = this._drill_controller._drill_parList_opacity[i];
		var rr = this._drill_controller._drill_parList_rotation[i];
		var scale_x = this._drill_controller._drill_parList_scaleX[i];
		var scale_y = this._drill_controller._drill_parList_scaleY[i];
		
		// > 位置（粒子群弹道）
		xx += this._drill_EFPa_parBMoveX[i][ time ];
		yy += this._drill_EFPa_parBMoveY[i][ time ];
		// > 位置
		par_sprite.x = xx;
		par_sprite.y = yy;
		
		// > 透明度（粒子群弹道）
		oo = this._drill_EFPa_parBOpacity[i][ time ];
		// > 透明度
		par_sprite.opacity = oo;
		
		// > 自旋转
		par_sprite.rotation = rr *Math.PI /180;
		
		// > 缩放
		par_sprite.scale.x = scale_x;
		par_sprite.scale.y = scale_y;
	};
}
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_EFPa_Sprite.prototype.drill_EFPa_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	if( this.drill_EFPa_posIsInCamera( this._character._realX, this._character._realY ) == false ){
		this.visible = false;
		return false;
	}
	return true;
}
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_EFPa_Sprite.prototype.drill_EFPa_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert("【Drill_EventFrameParticle.js 行走图 - 多层行走图粒子】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
			DrillUp.g_LCa_alert = false;
		}
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}



//=============================================================================
// ** 行走图粒子贴图（第二层）【Drill_EFPa_SecSprite】
//
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_EFPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_EFPa_SecSprite.prototype = Object.create(Sprite.prototype);
Drill_EFPa_SecSprite.prototype.constructor = Drill_EFPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_EFPa_SecSprite.prototype.initialize = function( parentSprite ){
	Sprite.prototype.initialize.call(this);
	this._drill_parentSprite = parentSprite;	//设置父类
	this._drill_controller = this._drill_parentSprite._drill_controller;
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
	this.opacity = 0;
	this.visible = false;
	
	this.drill_createParticle();				//创建 - 粒子	
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_EFPa_SecSprite.prototype.update = function() {
	if( this.drill_EFPa_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_updateChild();					//帧刷新 - 粒子
}
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_EFPa_SecSprite.prototype.drill_EFPa_isOptimizationPassed = function(){
    return this.drill_EFPa_isOptimizationPassed_Private();
};
//==============================
// * 第二层粒子 - 创建粒子
//==============================
Drill_EFPa_SecSprite.prototype.drill_createParticle = function() {
	var p_data = this._drill_controller._drill_data;
	
	// > 粒子集合
	this._drill_EFPa_particleTankSec = [];			//粒子贴图容器
	for( var j = 0; j < p_data['par_count'] ; j++ ){	
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadBitmap( p_data['src_img_file'], p_data['second_src_img'], 0, true );
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.blendMode = this._drill_parentSprite.blendMode;
		temp_sprite.opacity = 0;
		this._drill_EFPa_particleTankSec.push(temp_sprite);
		this.addChild(temp_sprite);
	}
}
//==============================
// * 第二层粒子 - 帧刷新粒子
//==============================
Drill_EFPa_SecSprite.prototype.drill_updateChild = function(){
	var data = this._drill_controller._drill_data;
	
	this.x = this._drill_parentSprite.x;
	this.y = this._drill_parentSprite.y;
	this.scale.x = this._drill_parentSprite.scale.x;
	this.scale.y = this._drill_parentSprite.scale.y;
	this.opacity = this._drill_parentSprite.opacity;
	this.visible = this._drill_parentSprite.visible;
	
	// > 贴图 - 粒子属性
	//		（最好不要用 par_sprite.x = org_sprite.x 的方式来赋值，会产生1帧的延迟问题 ）
	for(var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		var par_sprite = this._drill_EFPa_particleTankSec[i];
		var time = this._drill_controller._drill_parList_curTime[i];
		
		// > 粒子弹道倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		var xx = this._drill_controller._drill_parList_x[i];
		var yy = this._drill_controller._drill_parList_y[i];
		var oo = this._drill_controller._drill_parList_opacity[i];
		var rr = this._drill_controller._drill_parList_rotation[i];
		var scale_x = this._drill_controller._drill_parList_scaleX[i];
		var scale_y = this._drill_controller._drill_parList_scaleY[i];
		
		// > 位置（粒子群弹道）
		xx += this._drill_parentSprite._drill_EFPa_parBMoveX[i][ time ];
		yy += this._drill_parentSprite._drill_EFPa_parBMoveY[i][ time ];
		// > 位置
		par_sprite.x = xx;
		par_sprite.y = yy;
		
		// > 透明度（粒子群弹道）
		oo = this._drill_parentSprite._drill_EFPa_parBOpacity[i][ time ];
		// > 透明度
		par_sprite.opacity = oo;
		
		// > 自旋转
		par_sprite.rotation = rr *Math.PI /180;
		
		// > 缩放
		par_sprite.scale.x = scale_x;
		par_sprite.scale.y = scale_y;
	};
}
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_EFPa_SecSprite.prototype.drill_EFPa_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	var ch = this._drill_parentSprite._character;
	if( this.drill_EFPa_posIsInCamera( ch._realX, ch._realY ) == false ){
		this.visible = false;
		return false;
	}
	return true;
}
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_EFPa_SecSprite.prototype.drill_EFPa_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert("【Drill_EventFrameParticle.js 行走图 - 多层行走图粒子】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
			DrillUp.g_LCa_alert = false;
		}
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFrameParticle = false;
		alert(
			"【Drill_EventFrameParticle.js 行走图-多层行走图粒子】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心"
		);
}

