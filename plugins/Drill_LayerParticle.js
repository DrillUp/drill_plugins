//=============================================================================
// Drill_LayerParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        地图 - 多层地图粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子层-%d"
 * @Drill_LE_parentKey "---粒子层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LPa_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个粒子。
 * ★★必须放在 mog多层天气效果 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     地图粒子可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   可以在地图的五个层级放多层不同的粒子。
 * 2.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 地图绑定：
 *   (1.每个配置绑定到一个指定的地图，可以多个配置绑定到同一个地图。
 *      注意配置中"所属地图"参数，"所属地图"要与你的地图id相对应。
 *   (2.留意游戏编辑器下方的状态栏，地图id、坐标、缩放比例、事件id
 *      都有信息显示。
 * 地图层级：
 *   (1.你可以将粒子放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 《 下层 《 图块层 《 中层 《 事件/玩家层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.最顶层的粒子，可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 *   (5.如果你设置了粒子在 中层 ，你会发现粒子可能会切割图块画的
 *      树木。这是因为树木图块上方能够挡住事件，而下方被事件遮挡。
 *      根据图层的先后关系，粒子的切割树木现象是正常情况。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让远景看起
 *      来真的像”远景”，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.需要注意的是，地图远景和镜头位移比固定是0.00，所以地图远景
 *      每次调整都感觉不像远景，你需要换掉适合的含位移比的图层。
 *   (3.注意，位移比是根据 镜头 移动而移动，不是根据玩家移动而移动。
 *   (4.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 *   (2.操作隐藏的粒子 或者 操作其他地图的粒子，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 * 设计：
 *   (1.你可以通过插件指令手动修改透明度，来设计某些区域的实时粒子效果，
 *      比如进入浴室后，显现热气气泡；进入草丛，显现萤火虫光粒。
 *   (2.地图粒子支持双层效果，你可以使用双层叠加的资源图片来模拟粒子的
 *      白色描边效果。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 粒子层1 资源-粒子
 * 粒子层2 资源-粒子
 * 粒子层3 资源-粒子
 * ……
 *
 * 所有素材都放在Map__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图粒子的各个属性：
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 显示
 * 插件指令：>地图粒子 : 粒子变量[21] : 显示
 *
 * 插件指令：>地图粒子 : 粒子[11] : 显示
 * 插件指令：>地图粒子 : 粒子[11] : 隐藏
 * 插件指令：>地图粒子 : 粒子[11] : 变混合模式 : 混合模式[2]
 * 插件指令：>地图粒子 : 粒子[11] : 变透明 : 变化时间[60] : 透明度[255]
 * 插件指令：>地图粒子 : 粒子[11] : 变透明 : 变化时间[60] : 透明度变量[21]
 * 
 * 1.前半部分（粒子变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有2*5种组合方式。
 * 2."变坐标"的变化效果可以与速度叠加。
 * 3."速度[1.0,-1.0]"表示x轴向左（正左负右），y轴向下（正上负下）。
 * 4."混合模式"为瞬间切换，可以去看看"0.基本定义 > 混合模式.docx"。
 * 3.插件指令的变化是永久性的。并且跨地图执行也仍然有效。
 *   如果你想瞬间切换，设置时长为0即可。
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
 * 测试方法：   在地图中放置多个粒子，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【28.12ms】
 *              100个事件的地图中，平均消耗为：【20.11ms】
 *               50个事件的地图中，平均消耗为：【15.32ms】
 * 测试方法2：  在地图中放置5个粒子，并绑定动态遮罩，进行性能测试。
 * 测试结果2：  测试出来的消耗为：【75.77ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.粒子离开屏幕边界后，会进行相关属性重置，这部分是相对于背景和
 *   魔法圈多出来的消耗。
 * 3.粒子绑定了动态遮罩后，由于每个粒子都需要考虑遮罩影响，所以
 *   性能消耗立刻变多了。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 梳理优化了位移比的结构。
 * [v1.2]
 * 优化了与地图活动镜头的兼容结构。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param 是否开启参数存储
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 一般建议 关闭 存储。注意，此开关详细介绍去看看文档说明。
 * @default false
 * 
 * @param ---粒子层组 1至20---
 * @default
 *
 * @param 粒子层-1
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-2
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-3
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-4
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-5
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-6
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-7
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-8
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-9
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-10
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-11
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-12
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-13
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-14
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-15
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-16
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-17
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-18
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-19
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-20
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组21至40---
 * @default
 *
 * @param 粒子层-21
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-22
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-23
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-24
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-25
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-26
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-27
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-28
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-29
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-30
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-31
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-32
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-33
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-34
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-35
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-36
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-37
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-38
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-39
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-40
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组41至60---
 * @default
 *
 * @param 粒子层-41
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-42
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-43
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-44
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-45
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-46
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-47
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-48
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-49
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-50
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-51
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-52
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-53
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-54
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-55
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-56
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-57
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-58
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-59
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-60
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组61至80---
 * @default
 *
 * @param 粒子层-61
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-62
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-63
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-64
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-65
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-66
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-67
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-68
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-69
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-70
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-71
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-72
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-73
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-74
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-75
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-76
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-77
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-78
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-79
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-80
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组81至100---
 * @default
 *
 * @param 粒子层-81
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-82
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-83
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-84
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-85
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-86
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-87
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-88
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-89
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-90
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-91
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-92
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-93
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-94
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-95
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-96
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-97
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-98
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-99
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-100
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组101至120---
 * @default
 *
 * @param 粒子层-101
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-102
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-103
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-104
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-105
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-106
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-107
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-108
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-109
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-110
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-111
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-112
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-113
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-114
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-115
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-116
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-117
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-118
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-119
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-120
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组121至140---
 * @default
 *
 * @param 粒子层-121
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-122
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-123
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-124
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-125
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-126
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-127
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-128
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-129
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-130
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-131
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-132
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-133
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-134
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-135
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-136
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-137
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-138
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-139
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-140
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组141至160---
 * @default
 *
 * @param 粒子层-141
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-142
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-143
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-144
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-145
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-146
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-147
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-148
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-149
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-150
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-151
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-152
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-153
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-154
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-155
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-156
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-157
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-158
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-159
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-160
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组161至180---
 * @default
 *
 * @param 粒子层-161
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-162
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-163
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-164
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-165
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-166
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-167
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-168
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-169
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-170
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-171
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-172
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-173
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-174
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-175
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-176
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-177
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-178
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-179
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-180
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组181至200---
 * @default
 *
 * @param 粒子层-181
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-182
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-183
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-184
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-185
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-186
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-187
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-188
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-189
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-190
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-191
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-192
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-193
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-194
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-195
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-196
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-197
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-198
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-199
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-200
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapBackground>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 */
/*~struct~LPaMapBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图层==
 * 
 * @param ---绑定---
 * @desc 
 *
 * @param 是否作用到所有地图
 * @parent ---绑定---
 * @type boolean
 * @on 作用到所有
 * @off 作用于指定地图
 * @desc 你可以设置作用到所有地图。注意，设置后直接对所有地图有效，使用前一定要想好想清楚了。
 * @default false
 * 
 * @param 所属地图
 * @parent 是否作用到所有地图
 * @type number
 * @min 1
 * @desc 该粒子将放在指定对应的地图id中。
 * @default 1
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
 * @default (需配置)地图粒子
 * @require 1
 * @dir img/Map__layer/
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
 * @param 地图层级
 * @parent ---贴图---
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 地图所在的层级位置，具体关系看看插件说明。
 * @default 下层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，粒子和镜头的位移一致。设置0.00则粒子不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，粒子和镜头的位移一致。设置0.00则粒子不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移图块偏移 X
 * @parent ---贴图---
 * @desc 与位移比相关，图片的中心点所在的图块X偏移量。单位图块，可为小数。
 * @default 0
 *
 * @param 位移图块偏移 Y
 * @parent ---贴图---
 * @desc 与位移比相关，图片的中心点所在的图块Y偏移量。单位图块，可为小数。
 * @default 0
 * 
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
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。x轴方向平移，单位像素。0为贴在最左边。
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
 * @default (需配置)第二层粒子
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 第二层粒子地图层级
 * @parent ---双层效果---
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 地图所在的层级位置，具体关系看看插件说明。
 * @default 下层
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 3
 * 
 * 
 * @param ---动态遮罩---
 * @desc 
 *
 * @param 是否启用地图动态遮罩
 * @parent ---动态遮罩---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 设置后，粒子会被 地图动态遮罩 遮住，通过特定的 透视镜 才能看到该粒子的部分图像。
 * @default false
 *
 * @param 关联的动态遮罩板
 * @parent ---动态遮罩---
 * @type select
 * @option 动态遮罩板A
 * @value 动态遮罩板A
 * @option 动态遮罩板B
 * @value 动态遮罩板B
 * @desc 关联绑定的动态遮罩板。
 * @default 动态遮罩板A
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LPa（Layer_Particle）
//		临时全局变量	DrillUp.g_LPa_xxx
//		临时局部变量	this._drill_LPa_xxx
//		存储数据变量	$gameSystem._drill_LPa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	特效管理层（6个背景，5个粒子，动态遮罩板B）
//		★性能测试消耗	15.32ms（drill_LPa_resetParticles）75.77ms（drill_LPa_updateBase）
//		★最坏情况		大量粒子+动态遮罩被使用。
//		★备注			在垃圾笔记本上测试，只有4帧，可能是因为动态遮罩的缘故。
//						（在高配笔记本上，也会突然从60帧降到30帧）
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多层地图粒子：
//				->基本属性
//					->地图层级
//						->添加贴图到层级【标准函数】
//						->层级与镜头的位移【标准函数】
//						->图片层级排序【标准函数】
//					->镜头位移比
//				->可修改的属性
//					->显示隐藏
//					->透明、混合模式
//					x->坐标、速度、色调、缩放、斜切
//
//		★必要注意事项：
//			1.插件的地图层级/图片层级与多个插件共享。【必须自写 层级排序 标准函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//
//		★其它说明细节：
//			1.粒子分成粒子层，位移比变化时，影响到 粒子层 下面的 每个粒子。
//		
//		★存在的问题：
//			暂无
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerParticle = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerParticle');

	//==============================
	// * 变量获取 - 粒子
	//				（~struct~LPaMapBackground）
	//==============================
	DrillUp.drill_LPa_backgroundInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layer_index'] = String( dataFrom["地图层级"] || "上层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		
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
		data['second_layerIndex'] = String( dataFrom["第二层粒子地图层级"] || "上层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		// > 动态遮罩
		data['dynamicMask_enabled'] = String( dataFrom["是否启用地图动态遮罩"] || "false") == "true";
		data['dynamicMask_bind'] = String( dataFrom["关联的动态遮罩板"] || "动态遮罩板A");
		
		// > 私有变量初始化
		data['cameraXAcc'] = 0;					//镜头基点（循环积累值）（像素单位）
		data['cameraYAcc'] = 0;					//
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LPa_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------粒子------------------*/
	DrillUp.g_LPa_layers_length = 200;
	DrillUp.g_LPa_layers = [];
	for( var i = 0; i < DrillUp.g_LPa_layers_length; i++ ){
		if( DrillUp.parameters["粒子层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子层-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["粒子层-" + String(i+1) ]);
			DrillUp.g_LPa_layers[i] = DrillUp.drill_LPa_backgroundInit( temp );
		}else{
			DrillUp.g_LPa_layers[i] = null;		//（强制设为空值，节约存储资源）
		}
	}


//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapLayer = function(filename) {
    return this.loadBitmap('img/Map__layer/', filename, 0, true);
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LPa_pluginCommand.call(this, command, args);
	if( command === ">地图粒子" ){ // >地图粒子 : 粒子[1] : 显示
	
		/*-----------------对象组获取------------------*/
		var obj_id = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1.indexOf("粒子[") != -1 ){
				temp1 = temp1.replace("粒子[","");
				temp1 = temp1.replace("]","");
				obj_id = Number(temp1);
			}
			if( temp1.indexOf("粒子变量[") != -1 ){
				temp1 = temp1.replace("粒子变量[","");
				temp1 = temp1.replace("]","");
				obj_id = $gameVariables.value(Number(temp1));
			}
		}
			
		/*-----------------执行指令------------------*/
		if( obj_id != null ){
			var changing = {};
			changing['id'] = obj_id;
			changing['time'] = 0;
			changing['destroy'] = false;
			
			if( args.length == 4 ){
				var type = String(args[3]);
				if( type == "显示" || type == "隐藏" ){
					changing['type'] = type;
					$gameSystem._drill_LPa_dataTank_changing.push(changing);
					return;
				}
			}
			if( args.length == 6 ){
				var type = String(args[3]);
				var temp2 = String(args[5]);
				if( type == "变混合模式" ){
					var num_list = this.drill_LPa_getArgNumList(temp2);
					changing['type'] = type;
					changing['data1'] = num_list[0];
					$gameSystem._drill_LPa_dataTank_changing.push(changing);
					return;
				}
			}
			if( args.length == 8 ){
				var type = String(args[3]);
				var temp2 = String(args[5]);
				var temp3 = String(args[7]);
				if( type == "变坐标" ){
					var num_list2 = this.drill_LPa_getArgNumList(temp2);
					var num_list3 = this.drill_LPa_getArgNumList(temp3);
					changing['type'] = type;
					changing['data1'] = num_list2[0];
					changing['data2'] = num_list3[0];
					changing['data3'] = num_list3[1];
					$gameSystem._drill_LPa_dataTank_changing.push(changing);
					return;
				}
				if( type == "变透明" ){
					var num_list2 = this.drill_LPa_getArgNumList(temp2);
					var num_list3 = this.drill_LPa_getArgNumList(temp3);
					changing['type'] = type;
					changing['data1'] = num_list2[0];
					changing['data2'] = num_list3[0];
					$gameSystem._drill_LPa_dataTank_changing.push(changing);
					return;
				}
				if( type == "变速度" ){
					var num_list2 = this.drill_LPa_getArgNumList(temp2);
					var num_list3 = this.drill_LPa_getArgNumList(temp3);
					changing['type'] = type;
					changing['data1'] = num_list2[0];
					changing['data2'] = num_list3[0];
					changing['data3'] = num_list3[1];
					$gameSystem._drill_LPa_dataTank_changing.push(changing);
					return;
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_LPa_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量") ){
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i])) ); }
			return result_list;
		}else{
			for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
			return result_list;
		}
	}else{
	// > 没有方括号
		var data_list = arg_str.split(",");
		var result_list = [];
		for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
		return result_list;
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
//DrillUp.g_LPa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LPa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LPa_sys_initialize.call(this);
	this.drill_LPa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LPa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LPa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LPa_saveEnabled == true ){	
		$gameSystem.drill_LPa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LPa_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_LPa_initSysData = function() {
	this.drill_LPa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LPa_checkSysData = function() {
	this.drill_LPa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LPa_initSysData_Private = function() {
	
	this._drill_LPa_dataTank_changing = [];		//插件指令变化容器
	this._drill_LPa_dataTank_curData = [];		//当前地图容器（与 g_LPa_layers/_drill_LPa_layerTankOrg/_drill_LPa_layerTankSec 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_LPa_layers.length; i++){
		var temp_data = DrillUp.g_LPa_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['mapToAll'] == true ){		//全地图数据直接存储（每次地图刷新时，不刷新 全地图数据）
			var data = JSON.parse(JSON.stringify( temp_data ));
			this._drill_LPa_dataTank_curData[i] = data;
		}
	}
	
	// > 刷新当前地图
	if( $gameMap ){
		$gameMap.drill_LPa_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LPa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LPa_dataTank_curData == undefined ){
		this.drill_LPa_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LPa_layers.length; i++ ){
		var temp_data = DrillUp.g_LPa_layers[i];
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LPa_dataTank_curData[i] == undefined ){
				this._drill_LPa_dataTank_curData[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 地图
//=============================================================================
//==============================
// ** 地图 - 初始化
//==============================
var _drill_LPa_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LPa_setup.call( this, mapId );
	this.drill_LPa_initMapdata();
}
Game_Map.prototype.drill_LPa_initMapdata = function() {
	
	// > 刷新当前地图容器
	for(var i = 0; i< DrillUp.g_LPa_layers.length ;i++){
		var temp_data = DrillUp.g_LPa_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LPa_dataTank_curData[i] = null;
			continue;
		}
		
		// > 全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 单地图数据时
		}else if( temp_data['map'] == this._mapId ){
			var data = JSON.parse(JSON.stringify( temp_data ));
			$gameSystem._drill_LPa_dataTank_curData[i] = data;	//（重刷数据）
			
		// > 其它情况时
		}else{
			$gameSystem._drill_LPa_dataTank_curData[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}
DrillUp.g_LPa_alert = true;
//==============================
// * 玩家 - 帧刷新 镜头位置
//
//			说明：	注意，玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LPa_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LPa_player_update.call( this, sceneActive );
	
	// （移动时，像素会提前偏移1像素，可以确定不是 this._displayX 的问题，因为 x - floor(x) 的差值小于0.0001）
	// 该问题已解决，刷新的时机早了，要等玩家updateScroll之后才刷。
	
	for(var i = 0; i< $gameSystem._drill_LPa_dataTank_curData.length ;i++){
		var data = $gameSystem._drill_LPa_dataTank_curData[i];
		if( data == undefined ){ continue; }
		
		// > 镜头基点（循环积累值）
		if( Imported.Drill_LayerCamera ){
			if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPa_alert == true ){ 
				alert("【Drill_LayerParticle.js 地图 - 多层地图粒子】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
				DrillUp.g_LPa_alert = false;
				return; 
			}
			data['cameraXAcc'] = $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
			data['cameraYAcc'] = $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
			
		// > 镜头基点
		}else{
			data['cameraXAcc'] = $gameMap.displayX() * $gameMap.tileWidth();
			data['cameraYAcc'] = $gameMap.displayY() * $gameMap.tileHeight();
		}
	}
};


//#############################################################################
// ** 【标准模块】地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_LPa_layerAddSprite = function (sprite, layer_index) {
    this.drill_LPa_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LPa_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_LPa_sortByZIndex = function () {
    this.drill_LPa_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_LPa_layerCameraMoving = function( x, y, layer, option ){
    return this.drill_LPa_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LPa_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LPa_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LPa_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LPa_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LPa_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LPa_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LPa_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LPa_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LPa_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LPa_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LPa_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_mapDownArea.addChild( sprite );
	}
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 地图层级 - 层级与镜头的位移（私有）
//==============================
Scene_Map.prototype.drill_LPa_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 位移比
	var x_per = option['XPer'];
	var y_per = option['YPer'];
	
	xx -= option['tile_x'] * $gameMap.tileWidth() * x_per;
	yy -= option['tile_y'] * $gameMap.tileHeight() * y_per;
	//		（*0 表示紧贴地图；*1表示减回去了，紧贴镜头。）
	
	xx += option['cameraXAcc'] * x_per;
	yy += option['cameraYAcc'] * y_per;
	//		（*0 表示不跟镜头移动，紧贴地图；*1表示紧贴镜头。）
	
	
	// > 地图参照 -> 地图参照
	if( layer == "下层" || layer == "中层" || layer == "上层" ){
		return {'x':xx, 'y':yy };
	}
	// > 地图参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		xx -= this._spriteset._baseSprite.x;	//（由于 Spriteset_Map 的 _baseSprite 坐标始终是(0,0)，所以两个参照没有区别。）
		yy -= this._spriteset._baseSprite.y;
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图界面 - 创建
//==============================
var _drill_LPa_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LPa_layer_createAllWindows2.call(this);
	this.drill_LPa_create();	
};
Scene_Map.prototype.drill_LPa_create = function() {
	this._drill_LPa_layerTankOrg = [];			//粒子层（与 _drill_LPa_dataTank_curData 依次对应，允许出现null值）
	this._drill_LPa_particleTankOrg = [];		//粒子容器（不允许出现null值）
	this._drill_LPa_particleDataTank = [];		//粒子数据容器（不允许出现null值）
	this._drill_LPa_layerTankSec = [];			//第二层（与 _drill_LPa_dataTank_curData 依次对应，允许出现null值）
	this._drill_LPa_particleTankSec = [];		//第二层粒子容器（不允许出现null值）
	
	var data_tank = $gameSystem._drill_LPa_dataTank_curData;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		
		// > 粒子层
		var temp_layer = new Sprite();
		temp_layer.visible = temp_data['visible'];		//层 - 显示情况
		temp_layer.opacity = temp_data['opacity'];		//层 - 透明度
		temp_layer.blendMode = temp_data['blendMode'];	//层 - 混合模式
		temp_layer.zIndex = temp_data['zIndex'];		//层 - 图片层级
		
		// > 粒子层 - 创建动态遮罩
		if( temp_layer.visible == true ){
			this.drill_LPa_createMaskSprite( temp_data, temp_layer );
			temp_layer['_mask_inited'] = true;
			
		// > 粒子层 - 创建动态遮罩（延迟创建）
		}else{
			temp_layer['_mask_inited'] = false;
		}
		
		// > 粒子集合
		for( var j = 0; j < temp_data['par_count'] ; j++ ){	
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = ImageManager.load_MapLayer(temp_sprite_data['src_img']);
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite['_parentIndex'] = i;
			
			this._drill_LPa_particleTankOrg.push(temp_sprite);
			this._drill_LPa_particleDataTank.push(temp_sprite_data);
			temp_layer.addChild(temp_sprite);
			
			// > 粒子初始化
			this.drill_LPa_resetParticles(this._drill_LPa_particleDataTank.length-1);
			temp_sprite['_time'] = Math.floor( temp_sprite_data['par_life'] * Math.random() );
		}
		
		// > 粒子层 - 地图层级
		this._drill_LPa_layerTankOrg[i] = temp_layer;
		this.drill_LPa_layerAddSprite(temp_layer, temp_data['layer_index']);
		
		// > 双层效果
		if( temp_data['second_enable'] == true ){
			
			// > 第二层
			var temp_layerSec = new Sprite();
			temp_layerSec.visible = temp_layer.visible;			//层 - 显示情况
			temp_layerSec.opacity = temp_layer.opacity;			//层 - 透明度
			temp_layerSec.blendMode = temp_layer.blendMode;		//层 - 混合模式
			temp_layerSec.zIndex = temp_data['second_zIndex'];	//层 - 图片层级
			temp_layerSec._followingLayer = temp_layer;			//（跟随绑定）
			
			// > 第二层 - 创建动态遮罩
			temp_layerSec['_secMask_inited'] = false;
			
			// > 粒子集合
			for( var j = 0; j < temp_layer.children.length; j++ ){	
				var org_sprite = temp_layer.children[j];
				var temp_sprite = new Sprite();
				temp_sprite.bitmap = ImageManager.load_MapLayer(temp_data['second_src_img']);
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				
				temp_sprite.scale.x = org_sprite.scale.x;		//粒子 - 大小
				temp_sprite.scale.y = org_sprite.scale.y;		//粒子 - 大小
				temp_sprite.opacity = 0;						//粒子 - 透明度
				temp_sprite._followingSprite = org_sprite;		//（跟随绑定）
				
				this._drill_LPa_particleTankSec.push(temp_sprite);
				temp_layerSec.addChild(temp_sprite);
			}
			
			// > 第二层 - 地图层级
			this._drill_LPa_layerTankSec[i] = temp_layerSec;
			this.drill_LPa_layerAddSprite(temp_layerSec, temp_data['second_layerIndex']);
		}
	}
	this.drill_LPa_sortByZIndex();		//排序
}
//==============================
// * 地图界面 - 创建动态遮罩
//==============================
Scene_Map.prototype.drill_LPa_createMaskSprite = function( temp_data, temp_sprite ){
	if( temp_data['dynamicMask_enabled'] != true ){ return; }
	
	if( Imported.Drill_LayerDynamicMaskA && temp_data['dynamicMask_bind'] == "动态遮罩板A" ){
		var temp_mask = this.drill_LDMA_getMaskSprite();
		temp_sprite.mask = temp_mask;
		this._drill_SenceTopArea.addChild(temp_mask);
	}
	if( Imported.Drill_LayerDynamicMaskB && temp_data['dynamicMask_bind'] == "动态遮罩板B" ){
		var temp_mask = this.drill_LDMB_getMaskSprite();
		temp_sprite.mask = temp_mask;
		this._drill_SenceTopArea.addChild(temp_mask);
	}
}


//==============================
// * 地图界面 - 帧刷新
//==============================
var _drill_LPa_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LPa_scene_update.call(this);
	
	this.drill_LPa_updateBase();				//基本属性（在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。）
	
	if( this.isActive() == true ){
		this.drill_LPa_updateChange();		//变化属性（该变化必须等 isActive 激活后执行，不然在变化时，会闪……目前原因不明，但也没必要深究了）
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LPa_updateBase = function() {
	
	// > 粒子层
	for(var i=0; i< this._drill_LPa_layerTankOrg.length; i++){
		var temp_sprite = this._drill_LPa_layerTankOrg[i];
		var temp_data = $gameSystem._drill_LPa_dataTank_curData[i];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
			
		// > 属性实时变化
		temp_sprite.visible = temp_data['visible'];			//层 - 显示情况
		temp_sprite.opacity = temp_data['opacity'];         //层 - 透明度
		temp_sprite.blendMode = temp_data['blendMode'];     //层 - 混合模式
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LPa_createMaskSprite( temp_data, temp_sprite );
		}
	}
	
	// > 粒子贴图
	for(var i = 0; i < this._drill_LPa_particleTankOrg.length; i++ ){
		var spr = this._drill_LPa_particleTankOrg[i];
		var data = this._drill_LPa_particleDataTank[i];
		var p_data = $gameSystem._drill_LPa_dataTank_curData[ spr['_parentIndex'] ];
		spr['_time'] += 1;
		data['cameraXAcc'] = p_data['cameraXAcc'];
		data['cameraYAcc'] = p_data['cameraYAcc'];

	    // > 位移（地图参照）
		var xx = 0;
		var yy = 0;
		xx += data['start_x'];
		yy += data['start_y'];
		xx += data['start_cameraX'];			//（粒子生成时，镜头的位置）
		yy += data['start_cameraY'];
		
		xx -= data['cameraXAcc'];					//（注意，这里不能用adjust，因为如果你一直向前移动，贴图会越来越远）
		yy -= data['cameraYAcc'];
		xx += data['tile_x'] * $gameMap.tileWidth();
		yy += data['tile_y'] * $gameMap.tileHeight();
		xx += spr['_time'] * data['cur_speed'] * Math.cos( data['start_dir'] );
		yy += spr['_time'] * data['cur_speed'] * Math.sin( data['start_dir'] );
		
		
		// > 层级与镜头的位移（地图参照）
		var pos = this.drill_LPa_layerCameraMoving( xx, yy, data['layer_index'], data );
		xx = pos['x'];
		yy = pos['y'];
		
		
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
    	if( this.drill_LPa_isNeedResetParticles(i) ){
			this.drill_LPa_resetParticles(i);
		};
	};
	
	
	// > 粒子层（第二层）
	for(var i=0; i< this._drill_LPa_layerTankSec.length; i++){
		var temp_sprite = this._drill_LPa_layerTankSec[i];
		if( temp_sprite == undefined ){ continue; }
			
		// > 属性实时变化
		temp_sprite.visible = temp_sprite._followingLayer.visible;			//层 - 显示情况
		temp_sprite.opacity = temp_sprite._followingLayer.opacity;          //层 - 透明度
		temp_sprite.blendMode = temp_sprite._followingLayer.blendMode;      //层 - 混合模式
		
		// > 创建动态遮罩（根据父类情况创建）
		if( temp_sprite['_secMask_inited'] == false ){
			if( temp_sprite._followingLayer['_mask_inited'] == true ){
				temp_sprite.mask = temp_sprite._followingLayer.mask;
				temp_sprite['_secMask_inited'] = true;
			}
		}
	}
	
	// > 粒子贴图（第二层）
	for(var i = 0; i < this._drill_LPa_particleTankSec.length; i++ ){
		var spr_sec = this._drill_LPa_particleTankSec[i];
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
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LPa_updateChange = function() {
	var change_tank = $gameSystem._drill_LPa_dataTank_changing;	//（只变数据，不变sprite）
	var data_tank = $gameSystem._drill_LPa_dataTank_curData;
	
	for(var j=0; j< change_tank.length; j++){
		var temp_change = change_tank[j];
		var temp_data = data_tank[ temp_change.id -1 ];
		if( temp_data == undefined ){ continue; }
		if( temp_change.destroy == false ){
			temp_change.time += 1;
			
			if( temp_change.type == "显示" ){
				temp_data['visible'] = true;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "隐藏" ){
				temp_data['visible'] = false;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "变混合模式" ){
				temp_data['blendMode'] = temp_change.data1;
				temp_change.destroy = true;
			}
			
			//if( temp_change.type == "变坐标" ){
			//	if( temp_change.time == 1 ){
			//		temp_change._dest = Math.max( temp_change.data1,1 );
			//		temp_change._x = temp_change.data2 - temp_data['x'];
			//		temp_change._y = temp_change.data3 - temp_data['y'];
			//	}
			//	if( temp_change.time <= temp_change._dest ){
			//		temp_data['x'] += temp_change._x / temp_change._dest;
			//		temp_data['y'] += temp_change._y / temp_change._dest;
			//	}
			//	if( temp_change.time >= temp_change._dest ){
			//		temp_change.destroy = true;
			//	}
			//}
			
			if( temp_change.type == "变透明" ){
				if( temp_change.time == 1 ){
					temp_change._dest = Math.max( temp_change.data1,1 );
					temp_change._opacity = temp_change.data2 - temp_data['opacity'];
				}
				temp_data['opacity'] += temp_change._opacity / temp_change._dest;
				if( temp_change.time >= temp_change._dest ){
					temp_change.destroy = true;
				}
			}
			
			//if( temp_change.type == "变速度" ){
			//	if( temp_change.time == 1 ){
			//		temp_change._dest = Math.max( temp_change.data1,1 );
			//		temp_change._speedX = temp_change.data2 - temp_data['speedX'];
			//		temp_change._speedY = temp_change.data3 - temp_data['speedY'];
			//	}
			//	temp_data['speedX'] += temp_change._speedX / temp_change._dest;
			//	temp_data['speedY'] += temp_change._speedY / temp_change._dest;
			//	if( temp_change.time >= temp_change._dest ){
			//		temp_change.destroy = true;
			//	}
			//}
		}
	}
	
	// > 清除变化集
	for(var j = change_tank.length-1; j >= 0; j--){
		if( change_tank[j].destroy == true ){
			change_tank.splice(j, 1);
		}
	}
}

//==============================
// * 粒子 - 重设条件
//==============================	
Scene_Map.prototype.drill_LPa_isNeedResetParticles = function( i ){
	var spr = this._drill_LPa_particleTankOrg[i];
	var data = this._drill_LPa_particleDataTank[i];
	var p_data = $gameSystem._drill_LPa_dataTank_curData[ spr['_parentIndex'] ];
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
Scene_Map.prototype.drill_LPa_resetParticles = function( i ){
	var spr = this._drill_LPa_particleTankOrg[i];
	var data = this._drill_LPa_particleDataTank[i];
	var p_data = $gameSystem._drill_LPa_dataTank_curData[ spr['_parentIndex'] ];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	spr['_time'] = 0;
	spr.rotation = 2*Math.PI*Math.random();
	
	// > 粒子出现模式
	data['start_cameraX'] = p_data['cameraXAcc'];
	data['start_cameraY'] = p_data['cameraYAcc'];
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
		data['start_dir'] = this.drill_LPa_getPointToPointDegree( data['start_x'],data['start_y'], data['par_birthX'],data['par_birthY'] );
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
Scene_Map.prototype.drill_LPa_getPointToPointDegree = function( x1,y1,x2,y2 ){
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
