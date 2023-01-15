//=============================================================================
// Drill_EventFrameGif.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        行走图 - 多层行走图GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "GIF样式-%d"
 * @Drill_LE_parentKey "---GIF样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_EFGi_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_EventFrameGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加GIF，绑定在事件或玩家的行走图上面。
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
 *   (1.注意，此GIF与行走图只是绑定关系，不能作为动画序列GIF使用。
 *   (2.GIF可以开启随机位置。
 *      即播放完毕后，换个位置再播放一次，如此往复。
 * 绑定：
 *   (1.多个样式可以绑定同一个行走图。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__characterLayer_gif （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__characterLayer_gif文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * GIF样式-1 资源-GIF
 * GIF样式-2 资源-GIF
 * GIF样式-3 资源-GIF
 * ……
 *
 * 你可以在同一个行走图里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过添加事件注释来添加GIF：
 * 
 * 事件注释：=>多层行走图GIF : 槽[1] : 设置GIF : 样式[1]
 * 事件注释：=>多层行走图GIF : 槽[1] : 删除GIF
 * 事件注释：=>多层行走图GIF : 清空当前全部GIF
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你也可以通过插件指令来进行设置：
 * 
 * 插件指令：>多层行走图GIF : 玩家 : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 玩家领队 : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 玩家全员 : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 玩家队员[1] : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 玩家队员变量[21] : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 本事件 : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 事件[10] : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 事件变量[21] : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 批量事件[10,11] : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 批量事件变量[21,22] : 槽[1] : 设置GIF : 样式[1]
 * 
 * 插件指令：>多层行走图GIF : 本事件 : 槽[1] : 设置GIF : 样式[1]
 * 插件指令：>多层行走图GIF : 本事件 : 槽[1] : 删除GIF
 * 插件指令：>多层行走图GIF : 本事件 : 清空当前全部GIF
 * 
 * 1.前半部分（玩家）和 后半部分（槽[1] : 设置GIF : 样式[1]）
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在个体装饰管理层，设置5个GIF，性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【15.69ms】
 *              100个事件的地图中，平均消耗为：【11.41ms】
 *               50个事件的地图中，平均消耗为：【10.18ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每个事件配置了很多GIF，但总体消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了插件的性能。
 *
 *
 *
 * @param ---GIF样式组 1至20---
 * @default
 *
 * @param GIF样式-1
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-2
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-3
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-4
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-5
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-6
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-7
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-8
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-9
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-10
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-11
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-12
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-13
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-14
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-15
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-16
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-17
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-18
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-19
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-20
 * @parent ---GIF样式组 1至20---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组21至40---
 * @default
 *
 * @param GIF样式-21
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-22
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-23
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-24
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-25
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-26
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-27
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-28
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-29
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-30
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-31
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-32
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-33
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-34
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-35
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-36
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-37
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-38
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-39
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-40
 * @parent ---GIF样式组21至40---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组41至60---
 * @default
 *
 * @param GIF样式-41
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-42
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-43
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-44
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-45
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-46
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-47
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-48
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-49
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-50
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-51
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-52
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-53
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-54
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-55
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-56
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-57
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-58
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-59
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-60
 * @parent ---GIF样式组41至60---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组61至80---
 * @default
 *
 * @param GIF样式-61
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-62
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-63
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-64
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-65
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-66
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-67
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-68
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-69
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-70
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-71
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-72
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-73
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-74
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-75
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-76
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-77
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-78
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-79
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-80
 * @parent ---GIF样式组61至80---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组81至100---
 * @default
 *
 * @param GIF样式-81
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-82
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-83
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-84
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-85
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-86
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-87
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-88
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-89
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-90
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-91
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-92
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-93
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-94
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-95
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-96
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-97
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-98
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-99
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-100
 * @parent ---GIF样式组81至100---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组101至120---
 * @default
 *
 * @param GIF样式-101
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-102
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-103
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-104
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-105
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-106
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-107
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-108
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-109
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-110
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-111
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-112
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-113
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-114
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-115
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-116
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-117
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-118
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-119
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-120
 * @parent ---GIF样式组101至120---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组121至140---
 * @default
 *
 * @param GIF样式-121
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-122
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-123
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-124
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-125
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-126
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-127
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-128
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-129
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-130
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-131
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-132
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-133
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-134
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-135
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-136
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-137
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-138
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-139
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-140
 * @parent ---GIF样式组121至140---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组141至160---
 * @default
 *
 * @param GIF样式-141
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-142
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-143
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-144
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-145
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-146
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-147
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-148
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-149
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-150
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-151
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-152
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-153
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-154
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-155
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-156
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-157
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-158
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-159
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-160
 * @parent ---GIF样式组141至160---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组161至180---
 * @default
 *
 * @param GIF样式-161
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-162
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-163
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-164
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-165
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-166
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-167
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-168
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-169
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-170
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-171
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-172
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-173
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-174
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-175
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-176
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-177
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-178
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-179
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-180
 * @parent ---GIF样式组161至180---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组181至200---
 * @default
 *
 * @param GIF样式-181
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-182
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-183
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-184
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-185
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-186
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-187
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-188
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-189
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-190
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-191
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-192
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-193
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-194
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-195
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-196
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-197
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-198
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-199
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-200
 * @parent ---GIF样式组181至200---
 * @type struct<EFGiStyle>
 * @desc 行走图GIF样式的详细配置信息。
 * @default 
 */
/*~struct~EFGiStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的行走图GIF样式==
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
 * @param 资源-GIF
 * @parent ---贴图---
 * @desc GIF的图片资源，可以是单张图片，也可以是多张图片构成的GIF。
 * @default ["(需配置)多层行走图GIF"]
 * @require 1
 * @dir img/Map__characterLayer_gif/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc GIF每帧播放间隔时间，单位帧。（1秒60帧）
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
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-GIF Y
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
 * @desc GIF在同一个行走图中，并且在同一层级时，先后排序的位置，0表示最后面。
 * @default 0
 *
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 0.0
 * 
 * @param ---随机位置---
 * @desc 
 *
 * @param 是否启用随机位置
 * @parent ---随机位置---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 随机位置的范围宽度
 * @parent ---随机位置---
 * @type number
 * @min 0
 * @desc 随机位置为矩形范围，矩形中心为GIF的位置。这里填矩形范围的宽度。
 * @default 50
 *
 * @param 随机位置的范围高度
 * @parent ---随机位置---
 * @type number
 * @min 0
 * @desc 随机位置为矩形范围，矩形中心为GIF的位置。这里填矩形范围的高度。
 * @default 50
 *
 * @param 是否在每次播放GIF完毕后变化位置
 * @parent ---随机位置---
 * @type boolean
 * @on 变化
 * @off 关闭
 * @desc true - 变化，false - 关闭
 * @default false
 *
 * @param 是否随机GIF初始帧
 * @parent ---随机位置---
 * @type boolean
 * @on 随机
 * @off 关闭
 * @desc true - 随机，false - 关闭
 * @default false
 * 
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 整体缩放 X
 * @parent ---3d效果---
 * @desc GIF的缩放X值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体缩放 Y
 * @parent ---3d效果---
 * @desc GIF的缩放Y值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体斜切 X
 * @parent ---3d效果---
 * @desc GIF的斜切X值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体斜切 Y
 * @parent ---3d效果---
 * @desc GIF的斜切Y值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体再旋转角度
 * @parent ---3d效果---
 * @desc 在上述效果的基础上，GIF再旋转的角度。
 * @default 0.0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFGi（Event_Frame_Gif）
//		临时全局变量	DrillUp.g_EFGi_xxx
//		临时局部变量	this._drill_EFGi_xxx
//		存储数据变量	$gameSystem._drill_EFGi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)
//		★性能测试因素	个体装饰管理层
//		★性能测试消耗	15.69ms（drill_EFGi_updateInScene）15.4ms（按简称筛选统计的消耗）
//		★最坏情况		事件附带了大量装饰贴图。
//		★备注			无
//		
//		★优化记录		
//			2022-10-5优化：
//				添加了接口 优化策略【标准函数】，镜头范围外，直接全部关闭刷新，贴图也关闭帧刷新。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			行走图GIF：
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
//				->行走图GIF控制器【Drill_EFGi_Controller】
//				->行走图GIF贴图【Drill_EFGi_Sprite】
//		
//		★私有类如下：
//			* Drill_EFGi_Controller	【行走图GIF控制器】
//			* Drill_EFGi_Sprite		【行走图GIF贴图】
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
　　Imported.Drill_EventFrameGif = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFrameGif');
	
	
	//==============================
	// * 变量获取 - GIF样式
	//				（~struct~EFGiStyle）
	//==============================
	DrillUp.drill_EFGi_styleInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 资源
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Map__characterLayer_gif/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		// > 贴图
		data['x'] = Number( dataFrom["平移-GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-GIF Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['anim_index'] = String( dataFrom["行走图层级"] || "在行走图前面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0);
		
		// > 随机位置
		data['randomPos_enable'] = String( dataFrom["是否启用随机位置"] || "false") == "true";
		data['randomPos_width'] = Number( dataFrom["随机位置的范围宽度"] || 50);
		data['randomPos_height'] = Number( dataFrom["随机位置的范围高度"] || 50);
		data['randomPos_autoChange'] = String( dataFrom["是否在每次播放GIF完毕后变化位置"] || "false") == "true";
		data['randomPos_gifFrame'] = String( dataFrom["是否随机GIF初始帧"] || "false") == "true";
		
		// > 3d效果
		data['scale_x'] = Number( dataFrom["整体缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["整体缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["整体斜切 X"] || 0.0);
		data['skew_y'] = Number( dataFrom["整体斜切 Y"] || 0.0);
		data['parentRotate'] = Number( dataFrom["整体再旋转角度"] || 0.0);
		
		return data;
	}
	
	/*-----------------GIF样式------------------*/
	DrillUp.g_EFGi_style_length = 200;
	DrillUp.g_EFGi_style = [];
	for (var i = 0; i < DrillUp.g_EFGi_style_length; i++) {
		if( DrillUp.parameters['GIF样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['GIF样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['GIF样式-' + String(i+1) ]);
			DrillUp.g_EFGi_style[i] = DrillUp.drill_EFGi_styleInit( data );
			DrillUp.g_EFGi_style[i]['id'] = i+1;
			DrillUp.g_EFGi_style[i]['inited'] = true;
		}else{
			DrillUp.g_EFGi_style[i] = DrillUp.drill_EFGi_styleInit( {} );
			DrillUp.g_EFGi_style[i]['id'] = i+1;
			DrillUp.g_EFGi_style[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EFGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFGi_pluginCommand.call(this, command, args);
	if( command === ">多层行走图GIF" ){
		
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
					if( $gameMap.drill_EFGi_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EFGi_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFGi_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFGi_isEventExist( e_id ) == false ){ return; }
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
			if( temp1 == "清空当前全部GIF" ){
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFGi_removeControllerAll();
				}
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			if( type == "删除GIF" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFGi_removeController( Number(temp1)-1 );
				}
			}
		}
		if( args.length == 8 ){
			var temp1 = String(args[3]);
			var type = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "设置GIF" ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				for( var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch.drill_EFGi_createController( Number(temp1)-1, Number(temp2)-1 );
				}
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFGi_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventFrameGif.js 行走图 - 多层行走图GIF】\n" +
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
var _drill_EFGi_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFGi_c_setupPageSettings.call(this);
	this.drill_EFGi_setupPageSettings();
}
Game_Event.prototype.drill_EFGi_setupPageSettings = function() {
	
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
				if( command == "=>多层行走图GIF" ){
					
					if( args.length == 2 ){
						var temp1 = String(args[1]);
						if( temp1 == "清空当前全部GIF" ){
							this.drill_EFGi_removeControllerAll();
						}
					}
					if( args.length == 4 ){
						var temp1 = String(args[1]);
						var type = String(args[3]);
						if( type == "删除GIF" ){
							temp1 = temp1.replace("槽[","");
							temp1 = temp1.replace("]","");
							this.drill_EFGi_removeController( Number(temp1)-1 );
						}
					}
					if( args.length == 6 ){
						var temp1 = String(args[1]);
						var type = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "设置GIF" ){
							temp1 = temp1.replace("槽[","");
							temp1 = temp1.replace("]","");
							temp2 = temp2.replace("样式[","");
							temp2 = temp2.replace("]","");
							this.drill_EFGi_createController( Number(temp1)-1, Number(temp2)-1 );
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
var _drill_EFGi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_EFGi_temp_initialize.call(this);
	this._drill_EFGi_spriteTank = [];		//GIF贴图容器
};


//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_EFGi_isReflectionSprite = function( sprite ){
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
Game_Temp.prototype.drill_EFGi_layerAddSprite = function( sprite, layer_index, individual_sprite ){
    this.drill_EFGi_layerAddSprite_Private( sprite, layer_index, individual_sprite );
}
//##############################
// * 个体层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从父层级中移除。
//##############################
Game_Temp.prototype.drill_EFGi_layerRemoveSprite = function( sprite ){
	this.drill_EFGi_layerRemoveSprite_Private( sprite );
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
Game_Temp.prototype.drill_EFGi_sortByZIndex_Scene = function(){
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
Sprite_Character.prototype.drill_EFGi_sortByZIndex_Individual = function(){
	this._drill_characterUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});				//行走图前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 行走图前面层
//==============================
var _drill_EFGi_layer_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFGi_layer_update.call(this);
	if( this._drill_characterUpArea == undefined ){				//行走图前面层
		this._drill_characterUpArea = new Sprite();
		this.addChild(this._drill_characterUpArea);
	}
};
//==============================
// * 个体层级 - 父贴图后面层 - 地图界面
//==============================
var _drill_EFGi_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( this._drill_characterPBackArea == undefined ){			//父贴图后面层
		this._drill_characterPBackArea = new Sprite();
		this._drill_characterPBackArea.z = 0.85;				//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_characterPBackArea);
	}
	
	_drill_EFGi_layer_createCharacters.call(this);
};
//==============================
// * 个体层级 - 添加贴图到层级（私有）
//==============================
Game_Temp.prototype.drill_EFGi_layerAddSprite_Private = function( sprite, layer_index, individual_sprite ){
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
var _drill_EFGi_layerMap_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	$gameTemp._drill_spritesetCreated = false;
	_drill_EFGi_layerMap_createDisplayObjects.call(this);
	$gameTemp._drill_spritesetCreated = true;
};
//==============================
// * 个体层级 - 去除贴图（私有）
//==============================
Game_Temp.prototype.drill_EFGi_layerRemoveSprite_Private = function( sprite ){
	if( sprite == undefined ){ return; }
	
	// > 销毁
	sprite.drill_EFGi_destroy();
	
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
var _drill_EFGi_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EFGi_temp_initialize2.call(this);
	this._drill_EFGi_characterTank = [];			//（含GIF的事件）
	this._drill_EFGi_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EFGi_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_EFGi_characterTank = [];		//（含GIF的事件）
	$gameTemp._drill_EFGi_needRestatistics = true;
	
	// > 原函数
	_drill_EFGi_gmap_setup.call( this, mapId );
	
	this.drill_EFGi_updateRestatistics();		//（强制刷新统计一次，确保刚加载就有）
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EFGi_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EFGi_characterTank = [];
	$gameTemp._drill_EFGi_needRestatistics = true;
	$gameMap.drill_EFGi_updateRestatistics();	//（强制刷新统计一次，确保刚加载就有）
	_drill_EFGi_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 地图销毁时
//==============================
var _drill_EFGi_map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_EFGi_map_terminate.call(this);
	$gameTemp._drill_EFGi_characterTank = [];
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EFGi_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive){
	_drill_EFGi_map_update.call(this,sceneActive);
	this.drill_EFGi_updateRestatistics();			//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EFGi_updateRestatistics = function() {
	if( $gameTemp._drill_EFGi_needRestatistics != true ){ return }
	$gameTemp._drill_EFGi_needRestatistics = false;
	
	$gameTemp._drill_EFGi_characterTank = [];		//容器中的物体，只增不减，除非清零
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._drill_EFGi_controllerTank == undefined ){ continue; }
		if( temp_event._drill_EFGi_controllerTank.length == 0 ){ continue; }
		$gameTemp._drill_EFGi_characterTank.push(temp_event);
	}
}


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _drill_EFGi_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function(){
	this._drill_EFGi_controllerTank = null;
	_drill_EFGi_c_initMembers.call( this );
}
//==============================
// * 事件 - 创建控制器（接口）
//==============================
Game_CharacterBase.prototype.drill_EFGi_createController = function( slot_id, style_id ){
	if( this._drill_EFGi_controllerTank == undefined ){
		this._drill_EFGi_controllerTank = [];
	}
	
	// > 销毁原来的
	this.drill_EFGi_removeController( slot_id );
	
	// > 创建控制器
	var data = JSON.parse(JSON.stringify( DrillUp.g_EFGi_style[ style_id ] ));
	var controller = new Drill_EFGi_Controller( data );
	this._drill_EFGi_controllerTank[ slot_id ] = controller;
	
	// > 刷新统计
	$gameTemp._drill_EFGi_needRestatistics = true;
}
//==============================
// * 事件 - 去除控制器（接口）
//==============================
Game_CharacterBase.prototype.drill_EFGi_removeController = function( slot_id ){
	if( this._drill_EFGi_controllerTank == undefined ){ return; }
	if( this._drill_EFGi_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_EFGi_controllerTank[ slot_id ].drill_EFGi_destroy();
	this._drill_EFGi_controllerTank[ slot_id ] = null;
}
//==============================
// * 事件 - 去除全部控制器（接口）
//==============================
Game_CharacterBase.prototype.drill_EFGi_removeControllerAll = function(){
	if( this._drill_EFGi_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_EFGi_controllerTank.length; i++ ){
		this.drill_EFGi_removeController( i );
	}
	this._drill_EFGi_controllerTank = null;
}
//==============================
// * 事件 - 帧刷新
//==============================
var _drill_EFGi_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EFGi_c_update.call(this);
	if( this._drill_EFGi_controllerTank == undefined ){ return; }
	if( this._drill_EFGi_controllerTank.length == 0 ){ return; }
	
	// > 控制器帧刷新
	for( var i=0; i < this._drill_EFGi_controllerTank.length; i++ ){
		var controller = this._drill_EFGi_controllerTank[i];
		if( controller == undefined ){ continue; }
		controller.drill_EFGi_update();
	}
	
	// > 自动销毁 - 控制器
	var is_all_empty = true;
	for( var i=0; i < this._drill_EFGi_controllerTank.length; i++ ){
		var controller = this._drill_EFGi_controllerTank[i];
		if( controller == undefined ){ continue; }
		is_all_empty = false;
		if( controller.drill_EFGi_isDead() ){
			this._drill_EFGi_controllerTank[i] = null;
		}
	}
	if( is_all_empty == true ){
		this._drill_EFGi_controllerTank = null;
	}
}



//=============================================================================
// ** 外部控制
//=============================================================================
//==============================
// * 外部控制 - 创建贴图
//==============================
var _drill_EFGi_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_EFGi_update.call( this );
	if( this._character == undefined ){ return; }
	if( this._character._drill_EFGi_controllerTank == undefined ){ return; }
	if( this._character._drill_EFGi_controllerTank.length == 0 ){ return; }
	if( $gameTemp._drill_spritesetCreated != true ){ return; }
	
	// > 过滤镜像情况
	if( $gameTemp.drill_EFGi_isReflectionSprite( this ) ){ return; }
	
	// > 初始化
	if( this._drill_EFGi_childSprites == undefined ){
		this._drill_EFGi_childSprites = [];
	}
	
	// > 控制器遍历
	for( var i=0; i < this._character._drill_EFGi_controllerTank.length; i++ ){
		var controller = this._character._drill_EFGi_controllerTank[i];
		if( controller == undefined ){ continue; }
		
		// > 过滤生命周期结束情况
		if( controller.drill_EFGi_isDead() == true ){ continue; }
		
		// > 有绑定控制器的贴图时，跳过
		if( this.drill_EFGi_hasSpriteBinding( controller._drill_controllerSerial ) == true ){ continue; }
		
		// > 创建贴图
		var temp_sprite = new Drill_EFGi_Sprite();
		temp_sprite._drill_curSerial = controller._drill_controllerSerial;	//（标记序列号）
		temp_sprite.drill_EFGi_setController( controller );
		temp_sprite.drill_EFGi_setIndividualSprite( this );
		temp_sprite.drill_EFGi_initSprite();
		this._drill_EFGi_childSprites.push( temp_sprite );
		$gameTemp._drill_EFGi_spriteTank.push( temp_sprite );
		
		// > 添加贴图到层级
		var data = controller._drill_data;
		$gameTemp.drill_EFGi_layerAddSprite( temp_sprite, data['anim_index'], this );
		
	}
	
	// > 层级排序
	this.drill_EFGi_sortByZIndex_Individual();
	$gameTemp.drill_EFGi_sortByZIndex_Scene();
	
}
//==============================
// * 外部控制 - 是否含有绑定控制器的贴图
//==============================
Sprite_Character.prototype.drill_EFGi_hasSpriteBinding = function( serial ){
	for( var i=0; i < this._drill_EFGi_childSprites.length; i++){
		if( this._drill_EFGi_childSprites[i]._drill_curSerial == serial ){
			return true;
		}
	}
	return false;
}
//==============================
// * 外部控制 - 帧刷新 - 地图界面
//==============================
var _drill_EFGi_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_EFGi_smap_update.call(this);
	this.drill_EFGi_updateInScene();
}
Scene_Map.prototype.drill_EFGi_updateInScene = function() {
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_EFGi_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_EFGi_spriteTank[i];
		
		// > 自动销毁 - 贴图本身为空
		if( temp_sprite == undefined ){
			$gameTemp._drill_EFGi_spriteTank.splice(i,1);
			continue;
		}
		
		// > 自动销毁 - 控制器生命周期结束
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ||
			temp_controller.drill_EFGi_isDead() ){
			$gameTemp.drill_EFGi_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_EFGi_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};



//=============================================================================
// ** 行走图GIF控制器【Drill_EFGi_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制行走图GIF的数据类。
// **		子功能：	->帧刷新
// **						->显示/隐藏
// **						->暂停/继续
// **						> 平移
// **						> 旋转
// **						> 缩放
// **					->重设数据
// **						->序列号
// **					->GIF播放
// **					->随机位置
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_EFGi_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_EFGi_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_EFGi_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_EFGi_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_EFGi_Controller.prototype.drill_EFGi_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_EFGi_updateGIF();		//帧刷新 - GIF播放
	this.drill_EFGi_updatePosition();	//帧刷新 - 位置
	this.drill_EFGi_updateCheckNaN();	//帧刷新 - 校验值
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
Drill_EFGi_Controller.prototype.drill_EFGi_resetData = function( data ){
	this.drill_EFGi_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFGi_Controller.prototype.drill_EFGi_setVisible = function( visible ){
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
Drill_EFGi_Controller.prototype.drill_EFGi_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFGi_Controller.prototype.drill_EFGi_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_EFGi_Controller.prototype.drill_EFGi_isDead = function(){
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
Drill_EFGi_Controller.prototype.drill_initData = function(){
	var data = this._drill_data;
	
	// > 绑定
	if( data['visible'] == undefined ){ data['visible'] = true };				//显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };					//暂停情况
	
	// > 资源
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };						//资源 - GIF
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Map__characterLayer_gif/" };	//资源 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };							//资源 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };						//资源 - 是否倒放
	
	// > 贴图
	if( data['x'] == undefined ){ data['x'] = 0 };								//贴图 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };								//贴图 - 平移Y
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };				//贴图 - 混合模式
	if( data['anim_index'] == undefined ){ data['anim_index'] = "在行走图前面" };//贴图 - 行走图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };					//贴图 - 图片层级
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };					//贴图 - 自旋转速度（单位角度）
	
	// > 随机位置
	if( data['randomPos_enable'] == undefined ){ data['randomPos_enable'] = false };		//随机位置 - 是否启用随机位置
	if( data['randomPos_width'] == undefined ){ data['randomPos_width'] = 50 };				//随机位置 - 随机位置的范围宽度
	if( data['randomPos_height'] == undefined ){ data['randomPos_height'] = 50 };			//随机位置 - 随机位置的范围高度
	if( data['randomPos_autoChange'] == undefined ){ data['randomPos_autoChange'] = false };//随机位置 - 是否在每次播放GIF完毕后变化位置
	if( data['randomPos_gifFrame'] == undefined ){ data['randomPos_gifFrame'] = false };	//随机位置 - 是否随机GIF初始帧
	
	// > 3d效果
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };				//3d效果 - 整体缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };				//3d效果 - 整体缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };					//3d效果 - 整体斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };					//3d效果 - 整体斜切Y
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };		//3d效果 - 整体再旋转角度
	
}
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_EFGi_Controller.prototype.drill_initPrivateData = function(){
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	
	
	// > GIF
	this._drill_GIF_time = 0;			//GIF - 当前时间
	this._drill_GIF_index = 0;			//GIF - 当前索引
	
	
	// > 随机位置
	this._drill_randomPos_x = 0;		//随机位置 - 位置X
	this._drill_randomPos_y = 0;		//随机位置 - 位置Y
	this._drill_randomPos_lastInter = 0;//随机位置 - 上一次时间
	if( data['randomPos_enable'] == true ){
		this._drill_randomPos_x = Math.floor( data['randomPos_width'] *( Math.random()-0.5 ));
		this._drill_randomPos_y = Math.floor( data['randomPos_height']*( Math.random()-0.5 ));
	}
	if( data['randomPos_gifFrame'] == true ){
		this._drill_GIF_time = Math.floor( data['interval']*data['src_img_gif'].length * Math.random() );
	}
	
	
	// > 控制器 - 贴图属性
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_opacity = 255;
	this._drill_rotation = data['parentRotate'];	//（整体再旋转角度）
	
	// > 控制器 - 层级属性
	this._drill_layer_scaleX = data['scale_x'];
	this._drill_layer_scaleY = data['scale_y'];
	this._drill_layer_skewX = data['skew_x'];
	this._drill_layer_skewY = data['skew_y'];
	
	// > 控制器 - GIF属性
	this._drill_childCircle_rotation = 0;
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_EFGi_Controller.prototype.drill_EFGi_resetData_Private = function( data ){
	
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
// * 位置 - 帧刷新
//==============================
Drill_EFGi_Controller.prototype.drill_EFGi_updatePosition = function(){
	var data = this._drill_data;
	
	// > 位置平移
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	
	// > 随机位置
	xx += this._drill_randomPos_x;
	yy += this._drill_randomPos_y;
	
	this._drill_x = xx;
	this._drill_y = yy;
	
	// > 自旋转
	this._drill_childCircle_rotation += data['rotate'];
}

//==============================
// * GIF播放 - 帧刷新
//==============================
Drill_EFGi_Controller.prototype.drill_EFGi_updateGIF = function(){
	var data = this._drill_data;
	
	// > gif播放
	this._drill_GIF_time += 1;
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
	
	// > 每次播放结束后变化
	if( data['randomPos_enable'] == true ){
		var inter = Math.floor(this._drill_GIF_time / data['interval'] / data['src_img_gif'].length);
		if( this._drill_randomPos_lastInter != inter ){
			this._drill_randomPos_lastInter = inter;
			this._drill_randomPos_x = Math.floor( data['randomPos_width'] *( Math.random()-0.5 ));
			this._drill_randomPos_y = Math.floor( data['randomPos_height']*( Math.random()-0.5 ));
		}
	}
}

//==============================
// * 帧刷新 - 校验值
//==============================
Drill_EFGi_Controller.prototype.drill_EFGi_updateCheckNaN = function(){
	
	// > 校验值
	if( DrillUp.g_EFGi_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_EFGi_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图GIF】\n"+
				"检测到控制器参数_drill_x出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_EFGi_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图GIF】\n"+
				"检测到控制器参数_drill_y出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_EFGi_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图GIF】\n"+
				"检测到控制器参数_drill_opacity出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_EFGi_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图GIF】\n"+
				"检测到控制器参数_drill_scaleX出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_EFGi_checkNaN = false;
			alert(
				"【Drill_AnimationSurround.js 行走图 - 多层行走图GIF】\n"+
				"检测到控制器参数_drill_scaleY出现了NaN值，请及时检查你的函数。"
			);
		}
	}
}



//=============================================================================
// ** 行走图GIF贴图【Drill_EFGi_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	> 定义一个GIF贴图。
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
// * GIF贴图 - 定义
//==============================
function Drill_EFGi_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_EFGi_Sprite.prototype = Object.create(Sprite.prototype);
Drill_EFGi_Sprite.prototype.constructor = Drill_EFGi_Sprite;
//==============================
// * GIF贴图 - 初始化
//==============================
Drill_EFGi_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//物体对象
};
//==============================
// * GIF贴图 - 帧刷新
//==============================
Drill_EFGi_Sprite.prototype.update = function() {
	if( this.drill_EFGi_isReady() == false ){ return; }
	if( this.drill_EFGi_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_updateLayer();					//帧刷新 - 层级
	this.drill_updateChild();					//帧刷新 - GIF
}
//##############################
// * GIF贴图 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * GIF贴图 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//			
//			说明：	> 由于贴图随时会变换图层，贴图必须标记个体贴图。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
	this._character = this._drill_individualSprite._character;
};
//##############################
// * GIF贴图 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行初始化。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_initSprite = function(){
	this.drill_EFGi_initSprite_Private();
};
//##############################
// * GIF贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this._drill_individualSprite == undefined ){ return false; }
    return true;
};
//##############################
// * GIF贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_isOptimizationPassed = function(){
    return this.drill_EFGi_isOptimizationPassed_Private();
};
//##############################
// * GIF贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * GIF贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_EFGi_Sprite.prototype.drill_EFGi_destroy = function(){
	this.drill_EFGi_destroy_Private();
};
//==============================
// * GIF贴图 - 贴图初始化（私有）
//==============================
Drill_EFGi_Sprite.prototype.drill_EFGi_initSprite_Private = function(){
	
	// > 私有数据初始化
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
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_gif'][j], 0, true );
		this._drill_bitmapTank.push( bitmap );
	}
	
	// > GIF 贴图
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = this._drill_bitmapTank[0];
	this._drill_childGIFSprite = temp_sprite;
	
	// > GIF 层
	var temp_layer = new Sprite();
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_childGIFSprite );
	this.addChild( this._drill_layerSprite );
};
//==============================
// * GIF贴图 - 销毁（私有）
//==============================
Drill_EFGi_Sprite.prototype.drill_EFGi_destroy_Private = function(){
	
	// > 贴图销毁
	this._drill_layerSprite.removeChild( this._drill_childGIFSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childGIFSprite = null;
	this._drill_layerSprite = null;
	
	// > 指针清空
	this._drill_controller = null;				//控制器对象
	this._drill_individualSprite = null;		//个体贴图
	this._character = null;						//父对象
};
//==============================
// * 帧刷新 - 层级
//==============================
Drill_EFGi_Sprite.prototype.drill_updateLayer = function() {
	var data = this._drill_controller._drill_data;
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	
	
	// > 层级位置修正
	var cur_layer = this._drill_EFGi_curLayer;
	
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
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;	//（整体再旋转角度)
	this.visible = data['visible'];
	
	// > 贴图 - 层级属性
	this._drill_layerSprite.scale.x  = this._drill_controller._drill_layer_scaleX;
	this._drill_layerSprite.scale.y  = this._drill_controller._drill_layer_scaleY;
	this._drill_layerSprite.skew.x   = this._drill_controller._drill_layer_skewX;
	this._drill_layerSprite.skew.y   = this._drill_controller._drill_layer_skewY;
	
}
//==============================
// * 帧刷新 - GIF
//==============================
Drill_EFGi_Sprite.prototype.drill_updateChild = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - GIF属性
	this._drill_childGIFSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
	this._drill_childGIFSprite.rotation = this._drill_controller._drill_childCircle_rotation *Math.PI/180;
	
}
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_EFGi_Sprite.prototype.drill_EFGi_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	if( this.drill_EFGi_posIsInCamera( this._character._realX, this._character._realY ) == false ){
		this.visible = false;
		return false;
	}
	return true;
}
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_EFGi_Sprite.prototype.drill_EFGi_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert("【Drill_EventFrameGif.js 行走图 - 多层行走图GIF】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
			DrillUp.g_LCa_alert = false;
		}
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}

