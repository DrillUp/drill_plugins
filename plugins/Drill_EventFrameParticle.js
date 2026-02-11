//=============================================================================
// Drill_EventFrameParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        行走图 - 多层行走图粒子
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
 *   - Drill_CoreOfParticle       系统-粒子核心
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
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
 * 
 * 1.如果切换事件页时，"槽[1]"的前一页和后一页样式设置相同，则粒子不会变化。
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
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 显示
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 隐藏
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 暂停
 * 插件指令：>多层行走图粒子 : 本事件 : 槽[1] : 继续
 * 插件指令：>多层行走图粒子 : 本事件 : 全部粒子显示
 * 插件指令：>多层行走图粒子 : 本事件 : 全部粒子隐藏
 * 插件指令：>多层行走图粒子 : 本事件 : 全部粒子暂停
 * 插件指令：>多层行走图粒子 : 本事件 : 全部粒子继续
 * 
 * 1.前半部分（玩家）和 后半部分（槽[1] : 设置粒子 : 样式[1]）
 *   的参数可以随意组合。一共有10*11种组合方式。
 *   "显示/隐藏"并不会销毁粒子，只有"删除粒子"才会彻底删除粒子。
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
 * [v1.2]
 * 强化了粒子核心底层，并进行兼容适配。
 * [v1.3]
 * 添加了粒子 彩虹化 功能。
 * [v1.4]
 * 添加了重复设置槽与样式时，不重建装饰的功能。
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
 * @desc true - 显示，false - 不显示，若为不显示，可以通过插件指令控制其显示出来。
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
 * @param 粒子产生方式
 * @parent ---粒子效果---
 * @type select
 * @option 跳过产生过程
 * @value 跳过产生过程
 * @option 同时产生
 * @value 同时产生
 * @option 依次产生
 * @value 依次产生
 * @desc 粒子的产生方式，详细区别可以去看看文档 "1.系统 > 大家族-粒子效果.docx"。
 * @default 跳过产生过程
 *
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭。开启倒放后，四周扩散效果 可以变成 四周吸收效果。
 * @default false
 *
 * @param 粒子是否滞留
 * @parent ---粒子效果---
 * @type boolean
 * @on 滞留
 * @off 保持位置同步
 * @desc true - 滞留，false - 保持位置同步。滞留意思为粒子发出后，不会跟随 装饰的个体 一起移动。
 * @default false
 *
 * @param 粒子出现范围
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 以贴图中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
 * @default 16
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
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
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 等一半时间后逐渐消失
 * @value 等一半时间后逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
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
 * @default 随机角度
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
 * @default (需配置)多层行走图粒子直线拖尾贴图
 * @require 1
 * @dir img/Map__characterLayer/
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
//		★性能测试消耗	108.53ms（drill_updateTransform）7.0ms（drill_updateReset）83.68ms（Sprite_Character.prototype.update）92.6ms（按简称筛选统计的消耗）
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
//				->帧刷新（地图界面）
//				->自动销毁
//
//			->行走图粒子控制器【Drill_EFPa_Controller】
//				->控制器
//					->销毁
//				->A主体
//				->B粒子群弹道
//					->弹道初始化（坐标）
//					->弹道初始化（透明度）
//				->C随机因子
//				->D粒子变化
//					> 位置
//					> 透明度
//					> 自旋转
//					> 缩放
//				->E粒子重设
//				->F双层效果
//				->G直线拖尾贴图
//			->行走图粒子贴图【Drill_EFPa_Sprite】
//				->贴图
//					->优化策略
//					->销毁
//				->A主体
//				->B粒子群弹道
//				->C对象绑定
//				->D粒子变化
//				->E粒子重设
//				->F双层效果
//				->G直线拖尾贴图
//			->行走图粒子贴图（第二层）【Drill_EFPa_SecSprite】
//				->贴图
//					->优化策略
//					->销毁
//				->A主体
//				->B粒子群弹道（无）
//				->C对象绑定（无）
//				->D粒子变化
//				->E粒子重设（无）
//				->F双层效果（无）
//				->G直线拖尾贴图（无）
//		
//		
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 行走图粒子控制器【Drill_EFPa_Controller】
//			* 行走图粒子贴图【Drill_EFPa_Sprite】
//			* 行走图粒子贴图（第二层）【Drill_EFPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_characterPBackArea 			父贴图后面层
//				_drill_characterUpArea				父贴图前面层
//			3.这三层关系如下：
//				┕-	父贴图后面层（_drill_characterPBackArea）
//				┕-	行走图贴图列表（不受控）
//					┕-	行走图贴图
//					┕-	父贴图前面层（_drill_characterUpArea）
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@      /@@    │
//			  │  /@@__  @@  /@@__  @@   /@@@@    │
//			  │ | @@  \ @@ |__/  \ @@  |_  @@    │
//			  │ | @@  | @@    /@@@@@/    | @@    │
//			  │ | @@  | @@   |___  @@    | @@    │
//			  │ | @@  | @@  /@@  \ @@    | @@    │
//			  │ |  @@@@@@/ |  @@@@@@/   /@@@@@@  │
//			  │  \______/   \______/   |______/  │
//			  └──────────────────────────────────┘
//			2.该插件的数据存储在事件中，作为控制器对象而存在。
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
	DrillUp.g_EFPa_PluginTip_curName = "Drill_EventFrameParticle.js 行走图-多层行走图粒子";
	DrillUp.g_EFPa_PluginTip_baseList = ["Drill_CoreOfParticle.js 系统-粒子核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EFPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EFPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EFPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EFPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EFPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFPa_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFPa_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_EFPa_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_EFPa_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_EFPa_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_EFPa_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventFrameParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFrameParticle');
	
	
	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~EFPaStyle）
	//==============================
	DrillUp.drill_EFPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Map__characterLayer/";
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['opacity'] = 255;
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['individualIndex'] = String( dataFrom["行走图层级"] || "在行走图前面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_lifeCustomType'] = String( dataFrom["粒子产生方式"] || "跳过产生过程");
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 32);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "随机角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_individualIndex'] = String( dataFrom["第二层粒子行走图层级"] || "在行走图前面");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Map__characterLayer/";
		
		// > 彩虹化
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
			DrillUp.g_EFPa_style[i]['inited'] = true;
		}else{
			DrillUp.g_EFPa_style[i] = DrillUp.drill_EFPa_styleInit( {} );
			DrillUp.g_EFPa_style[i]['inited'] = false;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EFPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EFPa_pluginCommand.call(this, command, args);
	this.drill_EFPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EFPa_pluginCommand = function( command, args ){
	if( command === ">多层行走图粒子" ){
		
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
			if( char_list == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var p_id = $gameVariables.value(Number(unit));
				if( p_id == -2 ){  //『玩家id』
					char_list = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					char_list = [];
					char_list.push(group[ p_id-1 ]);
				}
			}
			if( char_list == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var p_id = Number(unit);
				if( p_id == -2 ){  //『玩家id』
					char_list = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					char_list = [];
					char_list.push(group[ p_id-1 ]);
				}
			}
		}
		
		/*-----------------设置/删除------------------*/
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
		if( args.length == 4 ){
			var temp1 = String(args[3]);
			if( temp1 == "清空当前全部粒子" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_removeControllerAll();
				}
			}
		}
		
		/*-----------------显示/隐藏/暂停/继续------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			if( type == "显示" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setVisible( Number(temp1)-1, true );
				}
			}
			if( type == "隐藏" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setVisible( Number(temp1)-1, false );
				}
			}
			if( type == "暂停" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setPause( Number(temp1)-1, true );
				}
			}
			if( type == "继续" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setPause( Number(temp1)-1, false );
				}
			}
		}
		if( args.length == 4 ){
			var temp1 = String(args[3]);
			if( temp1 == "全部粒子显示" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setVisibleAll( true );
				}
			}
			if( temp1 == "全部粒子隐藏" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setVisibleAll( false );
				}
			}
			if( temp1 == "全部粒子暂停" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setPauseAll( true );
				}
			}
			if( temp1 == "全部粒子继续" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFPa_setPauseAll( false );
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFPa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFPa_getPluginTip_EventNotFind( e_id ) );
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
var _drill_EFPa_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFPa_c_setupPageSettings.call(this);
	this.drill_EFPa_setupPageSettings();
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EFPa_setupPageSettings = function() {
	var page = this.page();
	if( page == undefined ){ return; }
	
	var temp_list = this.list();
	for(var k = 0; k < temp_list.length; k++ ){
		var l = temp_list[k];
		if( l.code === 108 ){
			
			/*-----------------标准注释------------------*/
			var row = l.parameters[0];
			var args = row.split(/[ ]+/);	
			var command = args.shift();
			if( command == "=>多层行走图粒子" ){
				
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
				if( args.length == 4 ){
					var temp1 = String(args[1]);
					var type = String(args[3]);
					if( type == "删除粒子" ){
						temp1 = temp1.replace("槽[","");
						temp1 = temp1.replace("]","");
						this.drill_EFPa_removeController( Number(temp1)-1 );
					}
					//if( type == "显示" ){
					//	temp1 = temp1.replace("槽[","");
					//	temp1 = temp1.replace("]","");
					//	this.drill_EFPa_setVisible( Number(temp1)-1, true );
					//}
					//if( type == "隐藏" ){
					//	temp1 = temp1.replace("槽[","");
					//	temp1 = temp1.replace("]","");
					//	this.drill_EFPa_setVisible( Number(temp1)-1, false );
					//}
					//if( type == "暂停" ){		//（注释中不能暂停，因为不会初始化）
					//	temp1 = temp1.replace("槽[","");
					//	temp1 = temp1.replace("]","");
					//	this.drill_EFPa_setPause( Number(temp1)-1, true );
					//}
					//if( type == "继续" ){
					//	temp1 = temp1.replace("槽[","");
					//	temp1 = temp1.replace("]","");
					//	this.drill_EFPa_setPause( Number(temp1)-1, false );
					//}
				}
			};
			
		};
	};
}


//#############################################################################
// ** 【标准模块】个体层级 ☆个体层级
//#############################################################################
//##############################
// * 个体层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图           （添加的贴图对象）
//					> layer_index 字符串    （添加到的层级名，父贴图前面层/父贴图后面层）
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
	this._drill_characterUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});				//父贴图前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 父贴图前面层
//==============================
var _drill_EFPa_layer_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFPa_layer_update.call(this);
	if( this._drill_characterUpArea == undefined ){				//父贴图前面层
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
	if( layer_index == "行走图前面层" || layer_index == "在行走图前面" ||
		layer_index == "父贴图前面层" || layer_index == "在父贴图前面" ){
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
	
	this.drill_controller_updateRestatistics();		//（强制刷新统计一次，确保刚加载就有）
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EFPa_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EFPa_characterTank = [];
	$gameTemp._drill_EFPa_needRestatistics = true;
	$gameMap.drill_controller_updateRestatistics();	//（强制刷新统计一次，确保刚加载就有）
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
	this.drill_controller_updateRestatistics();			//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_controller_updateRestatistics = function() {
	if( $gameTemp._drill_EFPa_needRestatistics != true ){ return }
	$gameTemp._drill_EFPa_needRestatistics = false;
	
	$gameTemp._drill_EFPa_characterTank = [];			//容器中的物体，只增不减，除非清零
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){  
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event._drill_EFPa_controllerTank == undefined ){ continue; }
		if( temp_event._drill_EFPa_controllerTank.length == 0 ){ continue; }
		$gameTemp._drill_EFPa_characterTank.push(temp_event);
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
var _drill_EFPa_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function(){
	this._drill_EFPa_controllerTank = undefined;				//粒子容器
	this._drill_EFPa_controllerDyingTank = undefined;			//粒子容器（延时销毁）
	_drill_EFPa_c_initMembers.call( this );
}
//==============================
// * 物体绑定 - 创建控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_createController = function( slot_id, style_id ){
	if( this._drill_EFPa_controllerTank == undefined ){
		this._drill_EFPa_controllerTank = [];
	}
	
	// > 旧控制器
	var old_controller = this.drill_EFPa_getController( slot_id );
	if( old_controller != undefined ){
		
		// > 旧控制器 - 重复设置，跳出
		if( old_controller._drill_lastStyleId == style_id ){
			return;
			
		// > 旧控制器 - 不重复设置，销毁
		}else{
			this.drill_EFPa_removeController( slot_id );
		}
	}
	
	// > 『控制器与贴图的样式-』 - 校验+提示信息
	var cur_styleId   = style_id +1;
	var cur_styleData = DrillUp.g_EFPa_style[ style_id ];
	if( cur_styleData == undefined || 
		cur_styleData['inited'] == false ){
		alert( DrillUp.drill_EFPa_getPluginTip_StyleNotFind(cur_styleId) );
		return;
	}
	
	// > 『控制器与贴图的样式-』 - 创建控制器
	var controller = new Drill_EFPa_Controller( cur_styleData );
	controller._drill_lastStyleId = style_id;		//（直接在对象身上暂挂样式id）
	this._drill_EFPa_controllerTank[ slot_id ] = controller;
	
	// > 刷新统计
	$gameTemp._drill_EFPa_needRestatistics = true;
}
//==============================
// * 物体绑定 - 去除控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_removeController = function( slot_id ){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank[ slot_id ] == undefined ){ return; }
	
	// > 『装饰延时销毁』
	//	（不能直接销毁替换，需要转移到另一个容器中，让其自己销毁）
	var controller = this._drill_EFPa_controllerTank[ slot_id ];
	controller.drill_controller_destroyWithDelay();		
	
	if( this._drill_EFPa_controllerDyingTank == undefined ){
		this._drill_EFPa_controllerDyingTank = [];
	}
	this._drill_EFPa_controllerTank[ slot_id ] = null;
	this._drill_EFPa_controllerDyingTank.push( controller );
}
//==============================
// * 物体绑定 - 去除全部控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_removeControllerAll = function(){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	for(var i = 0; i < this._drill_EFPa_controllerTank.length; i++ ){
		this.drill_EFPa_removeController( i );
	}
	this._drill_EFPa_controllerTank = undefined;
}
//==============================
// * 物体绑定 - 获取控制器（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_getController = function( slot_id ){
	if( this._drill_EFPa_controllerTank == undefined ){ return null; }
	if( this._drill_EFPa_controllerTank[ slot_id ] == undefined ){ return null; }
	return this._drill_EFPa_controllerTank[ slot_id ];
}
//==============================
// * 物体绑定 - 显示/隐藏（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_setVisible = function( slot_id, visible ){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_EFPa_controllerTank[ slot_id ].drill_controller_setVisible( visible );
}
//==============================
// * 物体绑定 - 暂停/继续（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_setPause = function( slot_id, pause ){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_EFPa_controllerTank[ slot_id ].drill_controller_setPause( pause );
}
//==============================
// * 物体绑定 - 显示/隐藏 全部（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_setVisibleAll = function( visible ){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		this.drill_EFPa_setVisible( i, visible );
	}
}
//==============================
// * 物体绑定 - 暂停/继续 全部（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFPa_setPauseAll = function( pause ){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		this.drill_EFPa_setPause( i, pause );
	}
}
//==============================
// * 物体绑定 - 帧刷新
//
//			说明：	当前直接在物体中帧刷新，也可以通过 物体容器 进行遍历帧刷新。
//==============================
var _drill_EFPa_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EFPa_c_update.call(this);
	this.drill_EFPa_updateController();			//帧刷新 - 控制器
	this.drill_EFPa_updateControllerDying();	//帧刷新 - 控制器延时销毁
}
//==============================
// * 物体绑定 - 帧刷新 - 控制器
//==============================
Game_CharacterBase.prototype.drill_EFPa_updateController = function(){
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank.length == 0 ){ return; }
	
	// > 控制器 - 帧刷新
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		var controller = this._drill_EFPa_controllerTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_controller_update();
	}
	
	// > 自动销毁 - 控制器（正常销毁）
	var is_all_empty = true;
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		var controller = this._drill_EFPa_controllerTank[i];
		if( controller == undefined ){ continue; }
		is_all_empty = false;
		if( controller.drill_controller_isDead() ){
			this._drill_EFPa_controllerTank[i] = null;
		}
	}
	if( is_all_empty == true ){
		this._drill_EFPa_controllerTank = undefined;
	}
}
//==============================
// * 物体绑定 - 帧刷新 - 控制器延时销毁
//==============================
Game_CharacterBase.prototype.drill_EFPa_updateControllerDying = function(){
	if( this._drill_EFPa_controllerDyingTank == undefined ){ return; }
	if( this._drill_EFPa_controllerDyingTank.length == 0 ){ return; }
	
	// > 控制器 - 帧刷新『装饰延时销毁』
	for( var i=0; i < this._drill_EFPa_controllerDyingTank.length; i++ ){
		var controller = this._drill_EFPa_controllerDyingTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_controller_update();
	}
	
	// > 自动销毁 - 控制器『装饰延时销毁』
	var is_all_empty = true;
	for( var i=0; i < this._drill_EFPa_controllerDyingTank.length; i++ ){
		var controller = this._drill_EFPa_controllerDyingTank[i];
		if( controller == undefined ){ continue; }
		is_all_empty = false;
		if( controller.drill_controller_isDead() ){
			this._drill_EFPa_controllerDyingTank[i] = null;
		}
	}
	if( is_all_empty == true ){
		this._drill_EFPa_controllerDyingTank = undefined;
	}
}
//==============================
// * 物体绑定 - 事件销毁时
//==============================
var _drill_EFPa_c_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function(){
	_drill_EFPa_c_erase.call(this);
	if( this._drill_EFPa_controllerTank == undefined ){ return; }
	if( this._drill_EFPa_controllerTank.length == 0 ){ return; }
	for( var i=0; i < this._drill_EFPa_controllerTank.length; i++ ){
		var controller = this._drill_EFPa_controllerTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_controller_destroyWithDelay();		//『装饰延时销毁』
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
var _drill_EFPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_EFPa_temp_initialize.call(this);
	this._drill_EFPa_spriteTank = [];		//粒子贴图容器
};
//==============================
// * 贴图控制 - 创建
//==============================
var _drill_controller_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_controller_update.call( this );
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
		if( controller.drill_controller_isDead() == true ){ continue; }
		
		// > 有绑定控制器的贴图时，跳过
		if( this.drill_EFPa_hasSpriteBinding( controller._drill_controllerSerial ) == true ){ continue; }
		
		// > 创建贴图
		var data = controller._drill_data;
		var temp_sprite = new Drill_EFPa_Sprite();
		temp_sprite._drill_curSerial = controller._drill_controllerSerial;	//（标记序列号）
		temp_sprite.drill_sprite_setController( controller );
		temp_sprite.drill_EFPa_setIndividualSprite( this );
		temp_sprite.drill_sprite_initChild();
		this._drill_EFPa_childSprites.push( temp_sprite );
		$gameTemp._drill_EFPa_spriteTank.push( temp_sprite );
		
		// > 添加贴图到层级
		$gameTemp.drill_EFPa_layerAddSprite( temp_sprite, data['individualIndex'], this );
		
		
		// > 双层效果
		if( data['second_enable'] == true ){
			
			// > 双层效果 - 创建贴图
			var temp_secSprite = new Drill_EFPa_SecSprite( temp_sprite );
			$gameTemp._drill_EFPa_spriteTank.push( temp_secSprite );
			
			// > 双层效果 - 添加贴图到层级
			$gameTemp.drill_EFPa_layerAddSprite( temp_secSprite, data['second_individualIndex'], this );
		}
	}
	
	// > 层级排序
	this.drill_EFPa_sortByZIndex_Individual();
	$gameTemp.drill_EFPa_sortByZIndex_Scene();
	
}
//==============================
// * 贴图控制 - 是否含有绑定控制器的贴图
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
// * 贴图控制 - 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_EFPa_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}
//==============================
// * 贴图控制 - 帧刷新（地图界面）
//==============================
var _drill_EFPa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_EFPa_smap_update.call(this);
	this.drill_controller_updateInScene();
}
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_Map.prototype.drill_controller_updateInScene = function() {
	
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
			temp_controller.drill_controller_isDead() ){
			$gameTemp.drill_EFPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_EFPa_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};



//=============================================================================
// ** 行走图粒子控制器【Drill_EFPa_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个专门控制行走图粒子的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					
// **					->A主体
// **						->平移
// **						->校验值
// **					->B粒子群弹道
// **						->弹道初始化（坐标）
// **						->弹道初始化（透明度）
// **					->C随机因子
// **					->D粒子变化
// **						> 位置
// **						> 透明度
// **						> 自旋转
// **						> 缩放
// **					->E粒子重设
// **						> 粒子 当前时间
// **						> 粒子 迭代次数
// **						->起始点
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_EFPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_EFPa_Controller.prototype = Object.create(Drill_COPa_Controller.prototype);
Drill_EFPa_Controller.prototype.constructor = Drill_EFPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_EFPa_Controller.prototype.initialize = function( data ){
    Drill_COPa_Controller.prototype.initialize.call( this, data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_EFPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
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
Drill_EFPa_Controller.prototype.drill_controller_resetData = function( data ){
    Drill_COPa_Controller.prototype.drill_controller_resetData.call( this, data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFPa_Controller.prototype.drill_controller_setVisible = function( visible ){
    Drill_COPa_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFPa_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFPa_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFPa_Controller.prototype.drill_controller_isDead = function(){
	return Drill_COPa_Controller.prototype.drill_controller_isDead.call( this );
};

//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_EFPa_Controller.prototype.drill_controller_initData = function(){
	Drill_COPa_Controller.prototype.drill_controller_initData.call( this );
	var data = this._drill_data;
	
	// > 贴图
	data['src_img_file'] = "img/Map__characterLayer/";
	data['trailing_src_img_file'] = "img/Map__characterLayer/";
	if( data['individualIndex'] == undefined ){ data['individualIndex'] = "在行走图前面" };				//贴图 - 行走图层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//贴图 - 图片层级（贴图用）
	
	// > D粒子变化
	if( data['par_holdingBirthPosition'] == undefined ){ data['par_holdingBirthPosition'] = false };	//D粒子变化 - 粒子是否滞留
	
	// > E粒子重设
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };							//E粒子重设 - 粒子出现范围
	
	// > F双层效果
	if( data['second_individualIndex'] == undefined ){ data['second_individualIndex'] = "在行走图前面" };//F双层效果 - 第二层粒子个体层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };								//F双层效果 - 第二层粒子图片层级
	
	// > I粒子生命周期
	if( data['par_lifeCustomType'] == "跳过产生过程" ){ data['par_lifeType'] = "跳过产生过程";	}
	if( data['par_lifeCustomType'] == "同时产生" ){ data['par_lifeType'] = "同时产生"; }
	if( data['par_lifeCustomType'] == "依次产生" ){ data['par_lifeType'] = "依次产生"; }
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_EFPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_EFPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_Controller.prototype.drill_controller_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_EFPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_EFPa_Controller.prototype.drill_controller_initBallistics = function() {
	Drill_COPa_Controller.prototype.drill_controller_initBallistics.call( this );
}
//==============================
// * C随机因子 - 初始化子功能
//==============================
Drill_EFPa_Controller.prototype.drill_controller_initRandom = function() {
	Drill_COPa_Controller.prototype.drill_controller_initRandom.call( this );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_EFPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_EFPa_Controller.prototype.drill_controller_initReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_initReset.call( this );
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_EFPa_Controller.prototype.drill_controller_updateReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_updateReset.call( this );
}
//==============================
// * E粒子重设 - 执行重设 - 位置
//
//			说明：	> 由于当前插件为 个体装饰，因此起始点为 一个圆内随机出现 。
//==============================	
Drill_EFPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	
	var angle = 360 * this.drill_controller_curRandom( cur_iteration*i +41*i );		//（一个圆内随机出现）
	var radius = data['par_birthRange'] * this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
	var xx = radius * Math.cos( angle *Math.PI/180 );
	var yy = radius * Math.sin( angle *Math.PI/180 );
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
}
//==============================
// * F双层效果 - 初始化子功能
//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
// * H贴图高宽 - 初始化子功能
//==============================
// * I粒子生命周期 - 初始化子功能
//==============================



//=============================================================================
// ** 行走图粒子贴图【Drill_EFPa_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A主体
// **						->层级位置修正
// **					->B粒子群弹道
// **						->推演赋值（坐标）
// **						->推演赋值（透明度）
// **					->C对象绑定
// **						->设置控制器
// **						->设置个体贴图
// **						->贴图初始化（手动）
// **					->D粒子变化
// **						->倒放
// **						> 位置
// **						> 透明度
// **						> 自旋转
// **						> 缩放
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的行走图装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 贴图与数据分离。
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
Drill_EFPa_Sprite.prototype = Object.create(Drill_COPa_Sprite.prototype);
Drill_EFPa_Sprite.prototype.constructor = Drill_EFPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_EFPa_Sprite.prototype.initialize = function(){
    Drill_COPa_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_EFPa_Sprite.prototype.update = function() {
	Drill_COPa_Sprite.prototype.update.call(this);
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_EFPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//##############################
Drill_EFPa_Sprite.prototype.drill_EFPa_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
	this._character = this._drill_individualSprite._character;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行初始化。
//##############################
Drill_EFPa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initChild.call( this );
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_EFPa_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_individualSprite == undefined ){ return false; }		//（必须配置个体贴图）
    return Drill_COPa_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_EFPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 粒子贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_EFPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_EFPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initSelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//物体指针
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroySelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//物体指针
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	if( this.drill_EFPa_posIsInCamera( this._character._realX, this._character._realY ) == false ){
		this.visible = false;
		return false;
	}
	
	return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private.call( this );
}
// > 强制更新提示 锁
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_EFPa_Sprite.prototype.drill_EFPa_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】镜头范围内+缩放
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert( DrillUp.drill_EFPa_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LCa_alert = false;
		}
		
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_EFPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
	var data = this._drill_controller._drill_data;
	var xx = 0;
	var yy = 0;
	
	// > 层级位置修正
	var cur_layer = data['individualIndex'];
	if( cur_layer == "行走图前面层" || cur_layer == "在行走图前面" ||
		cur_layer == "父贴图前面层" || cur_layer == "在父贴图前面" ){
		//（无操作）
	}
	if( cur_layer == "父贴图后面层" || cur_layer == "在父贴图后面" ){
		xx += this._character.screenX();		//（直接保持与行走图位置一致）
		yy += this._character.screenY();
		//xx += this._drill_individualSprite.x;	//（不能用父类的位置，会有1帧延迟问题）
		//yy += this._drill_individualSprite.y;
		
		// > 其他插件位置修正
		if( Imported.Drill_EventContinuedEffect ){ //【行走图 - 持续动作效果】
			if( this._character._drill_ECE_spriteData != undefined ){
				xx += this._character._drill_ECE_spriteData.x;
				yy += this._character._drill_ECE_spriteData.y;
			}
		}
		if( Imported.Drill_EventFadeInEffect ){ //【行走图 - 显现动作效果】
			if( this._character._drill_EFIE_spriteData != undefined ){
				xx += this._character._drill_EFIE_spriteData.x;
				yy += this._character._drill_EFIE_spriteData.y;
			}
		}
		if( Imported.Drill_EventFadeOutEffect ){ //【行走图 - 消失动作效果】
			if( this._character._drill_EFOE_spriteData != undefined ){
				xx += this._character._drill_EFOE_spriteData.x;
				yy += this._character._drill_EFOE_spriteData.y;
			}
		}
	}
	
	this._drill_x += xx;
	this._drill_y += yy;
};
//==============================
// * A主体 - 帧刷新 - 可见（覆写）
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Visible.call( this );
};
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_initBallistics = function() {
	var data = this._drill_controller._drill_data;
	
	// > 粒子 出生时父类位置标记
	this._drill_COPa_parList_birthParentX = [];
	this._drill_COPa_parList_birthParentY = [];
	for( var i = 0; i < data['par_count']; i++ ){
		this._drill_COPa_parList_birthParentX[i] = -2000;
		this._drill_COPa_parList_birthParentY[i] = -2000;
	}
	
    Drill_COPa_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * B粒子群弹道 - 推演弹道
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
	
	// > 粒子 出生时父类位置标记
	if( this._drill_individualSprite instanceof Sprite_Character ){	//（物体位置）
		this._drill_COPa_parList_birthParentX[i] = this._drill_individualSprite._character._realX;
		this._drill_COPa_parList_birthParentY[i] = this._drill_individualSprite._character._realY;
	}
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_initTransform = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initTransform.call( this );
}
//==============================
// * D粒子变化 - 帧刷新 - 位置
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	var data = this._drill_controller._drill_data;
	
	// > 位置（粒子滞留）
	if( data['par_holdingBirthPosition'] == true ){
		if( this._drill_COPa_parList_birthParentX[i] != -2000 &&
			this._drill_COPa_parList_birthParentY[i] != -2000 ){
			
			// > 粒子滞留 - 物体位置
			if( this._drill_individualSprite instanceof Sprite_Character ){
				this._drill_par_x -= $gameMap.roundX( this._drill_individualSprite._character._realX - this._drill_COPa_parList_birthParentX[i] )*$gameMap.tileWidth();
				this._drill_par_y -= $gameMap.roundY( this._drill_individualSprite._character._realY - this._drill_COPa_parList_birthParentY[i] )*$gameMap.tileHeight();
			}
		}
	}
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_EFPa_Sprite.prototype.drill_sprite_initReset = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initReset.call( this );
}
//==============================
// * F双层效果 - 初始化子功能
//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
// * H贴图高宽 - 初始化子功能
//==============================
// * I粒子生命周期 - 初始化子功能
//==============================



//=============================================================================
// ** 行走图粒子贴图（第二层）【Drill_EFPa_SecSprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A主体
// **					->B粒子群弹道（无）
// **					->C对象绑定（无）
// **					->D粒子变化
// **						->倒放
// **						> 位置
// **						> 透明度
// **						> 自旋转
// **						> 缩放
// **					->E粒子重设（无）
// **					->F双层效果（无）
// **					->G直线拖尾贴图（无）
// **					->H贴图高宽（无）
// **					->I粒子生命周期（无）
// **					
// **		说明：	> 第二层粒子与 父贴图 的 D粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_EFPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_EFPa_SecSprite.prototype = Object.create(Drill_COPa_SecSprite.prototype);
Drill_EFPa_SecSprite.prototype.constructor = Drill_EFPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_EFPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_EFPa_SecSprite.prototype.update = function() {
	Drill_COPa_SecSprite.prototype.update.call(this);
}
//##############################
// * 第二层粒子 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_EFPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isReady.call(this);
};
//##############################
// * 第二层粒子 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_EFPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed.call(this);
};
//##############################
// * 第二层粒子 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_EFPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy.call(this);
};
//##############################
// * 第二层粒子 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_EFPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
	this._drill_individualSprite = parentSprite._drill_individualSprite;	//个体贴图
	this._character = null;													//物体指针
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//物体指针
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	var ch = this._drill_parentSprite._character;
	if( this.drill_EFPa_posIsInCamera( ch._realX, ch._realY ) == false ){
		this.visible = false;
		return false;
	}
	
	return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private.call( this );
}
// > 强制更新提示 锁
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_EFPa_SecSprite.prototype.drill_EFPa_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】镜头范围内+缩放
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert( DrillUp.drill_EFPa_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LCa_alert = false;
		}
		
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}

//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
};
//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics.call( this );
};
//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform.call( this );
}
//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_EFPa_SecSprite.prototype.drill_spriteSec_initReset = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initReset.call( this );
};
//==============================
// * F双层效果（第二层） - 初始化子功能
//==============================
// * G直线拖尾贴图（第二层） - 初始化子功能
//==============================
// * H贴图高宽（第二层） - 初始化子功能
//==============================
// * I粒子生命周期（第二层） - 初始化子功能
//==============================



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFrameParticle = false;
		var pluginTip = DrillUp.drill_EFPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

