//=============================================================================
// Drill_LayerParticleRain.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        地图 - 多层地图数字雨
 * @author Drill_up
 * 
 * @Drill_LE_param "数字雨层-%d"
 * @Drill_LE_parentKey "---数字雨层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LPR_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerParticleRain +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一层或者多层数字雨效果。
 * ★★必须放在 mog多层天气效果 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     地图数字雨可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图层级。
 * 2.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-地图界面）.docx"。
 * 地图绑定：
 *   (1.每个配置绑定到一个指定的地图，可以多个配置绑定到同一个地图。
 *      注意配置中"所属地图"参数，"所属地图"要与你的地图id相对应。
 *   (2.留意游戏编辑器下方的状态栏，地图id、坐标、缩放比例、事件id
 *      都有信息显示。
 * 地图层级：
 *   (1.你可以将贴图放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 《 下层 《 图块层 《 中层 《 事件/玩家层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.处于最顶层，可以把地图界面的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 *   (5.如果你设置了数字雨在 中层 ，你会发现数字雨可能会切割图块画的
 *      树木。这是因为树木图块上方能够挡住事件，而下方被事件遮挡。
 *      根据图层的先后关系，数字雨的切割树木现象是正常情况。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让远景看起
 *      来真的像”远景”，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.需要注意的是，地图远景和镜头位移比固定是0.00，所以地图远景
 *      每次调整都感觉不像远景，你需要换掉适合的含位移比的图层。
 *   (3.注意，位移比是根据 镜头 移动而移动，不是根据玩家移动而移动。
 *   (4.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 细节：
 *   (1.数字雨的结构有三层： 数字雨配置 > 雨滴配置 > 字符粒子。
 *      数字雨由多个雨滴形成，雨滴由一长串字符粒子形成。
 *   (2.插件指令操作的变化结果，是永久性的。
 *   (3.操作隐藏的数字雨 或者 操作其他地图的数字雨，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 * 设计：
 *   (1.数字雨的 顺序串列表 可以自定义随机或顺序播放。
 *      你可以设置一个固定的顺序，来作为某些解谜密码的提示。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 数字雨层1 资源-字符粒子
 * 数字雨层1 资源-扩展字符粒子
 * 数字雨层1 资源-叠加高光
 * 数字雨层2 资源-粒子
 * 数字雨层2 资源-扩展字符粒子
 * 数字雨层2 资源-叠加高光
 * ……
 *
 * 所有素材都放在Map__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图数字雨的各个属性：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 显示
 * 插件指令：>地图数字雨 : 数字雨变量[21] : 显示
 *
 * 插件指令：>地图数字雨 : 数字雨[11] : 显示
 * 插件指令：>地图数字雨 : 数字雨[11] : 隐藏
 * 插件指令：>地图数字雨 : 数字雨[11] : 变混合模式 : 混合模式[2]
 * 插件指令：>地图数字雨 : 数字雨[11] : 变透明 : 变化时间[60] : 透明度[255]
 * 插件指令：>地图数字雨 : 数字雨[11] : 变透明 : 变化时间[60] : 透明度变量[21]
 * 
 * 1.前半部分（数字雨变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有2*4种组合方式。
 * 2."混合模式"为瞬间切换，可以去看看"0.基本定义 > 混合模式.docx"。
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
 * 时间复杂度： o(n^4)*o(贴图处理) 每帧
 * 测试方法：   放置三层数字雨，16,18,24个雨滴，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【43.19ms】
 *              100个事件的地图中，平均消耗为：【31.02ms】
 *               50个事件的地图中，平均消耗为：【23.55ms】
 * 测试方法2：  放置三层数字雨，66,68,72个雨滴，进行性能测试。
 * 测试结果2：  200个事件的地图中，平均消耗为：【102.05ms】
 *              100个事件的地图中，平均消耗为：【85.21ms】
 *               50个事件的地图中，平均消耗为：【67.48ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.数字雨的雨滴离开屏幕边界后，会进行相关属性重置，会产生部分
 *   额外的消耗。
 * 3.雨滴暴多时，电脑意外地能承受住渲染，不会卡死。
 *   少量雨滴时大概24帧，大量雨滴时只有9帧左右。
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
 * @param ---数字雨层组 1至20---
 * @default
 *
 * @param 数字雨层-1
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-2
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-3
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-4
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-5
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-6
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-7
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-8
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-9
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-10
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-11
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-12
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-13
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-14
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-15
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-16
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-17
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-18
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-19
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-20
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组21至40---
 * @default
 *
 * @param 数字雨层-21
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-22
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-23
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-24
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-25
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-26
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-27
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-28
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-29
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-30
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-31
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-32
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-33
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-34
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-35
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-36
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-37
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-38
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-39
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-40
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组41至60---
 * @default
 *
 * @param 数字雨层-41
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-42
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-43
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-44
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-45
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-46
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-47
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-48
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-49
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-50
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-51
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-52
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-53
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-54
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-55
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-56
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-57
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-58
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-59
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-60
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组61至80---
 * @default
 *
 * @param 数字雨层-61
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-62
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-63
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-64
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-65
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-66
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-67
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-68
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-69
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-70
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-71
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-72
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-73
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-74
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-75
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-76
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-77
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-78
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-79
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-80
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组81至100---
 * @default
 *
 * @param 数字雨层-81
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-82
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-83
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-84
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-85
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-86
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-87
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-88
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-89
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-90
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-91
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-92
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-93
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-94
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-95
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-96
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-97
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-98
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-99
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-100
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组101至120---
 * @default
 *
 * @param 数字雨层-101
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-102
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-103
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-104
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-105
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-106
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-107
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-108
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-109
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-110
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-111
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-112
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-113
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-114
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-115
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-116
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-117
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-118
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-119
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-120
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组121至140---
 * @default
 *
 * @param 数字雨层-121
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-122
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-123
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-124
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-125
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-126
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-127
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-128
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-129
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-130
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-131
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-132
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-133
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-134
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-135
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-136
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-137
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-138
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-139
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-140
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组141至160---
 * @default
 *
 * @param 数字雨层-141
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-142
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-143
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-144
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-145
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-146
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-147
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-148
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-149
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-150
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-151
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-152
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-153
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-154
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-155
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-156
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-157
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-158
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-159
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-160
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组161至180---
 * @default
 *
 * @param 数字雨层-161
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-162
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-163
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-164
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-165
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-166
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-167
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-168
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-169
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-170
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-171
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-172
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-173
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-174
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-175
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-176
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-177
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-178
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-179
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-180
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组181至200---
 * @default
 *
 * @param 数字雨层-181
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-182
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-183
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-184
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-185
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-186
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-187
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-188
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-189
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-190
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-191
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-192
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-193
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-194
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-195
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-196
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-197
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-198
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-199
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 数字雨层-200
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapRain>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 */
/*~struct~LPRMapRain:
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
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
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
 * @param ---字符粒子---
 * @desc 
 *
 * @param 资源-字符粒子
 * @parent ---字符粒子---
 * @desc 粒子的图片资源。该资源会被划分成14份，表示0123456789+-x/ 详细去看看文档"17.主菜单 > 多层组合装饰（界面装饰）.docx"
 * @default (需配置)数字雨-默认数字
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 资源-扩展字符粒子
 * @parent ---字符粒子---
 * @desc 粒子的图片资源。该资源会被划分成14份，表示abcdefghijklmn 详细去看看文档"17.主菜单 > 多层组合装饰（界面装饰）.docx"
 * @default (需配置)数字雨-默认扩展数字
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 顺序串列表
 * @parent ---字符粒子---
 * @desc 填"0123456789+-x/"对应字符粒子资源中的14个字符，填"abcdefghijklmn"对应扩展字符粒子的14个字符。详细看文档.
 * @default 0123456789+-x/
 *
 * @param 顺序串播放模式
 * @parent ---字符粒子---
 * @type select
 * @option 字符全随机
 * @value 字符全随机
 * @option 顺序播放字符
 * @value 顺序播放字符
 * @desc 指在顺序串列表中，字符播放的模式。
 * @default 字符全随机
 *
 * @param 资源-叠加高光
 * @parent ---字符粒子---
 * @desc 粒子的图片资源。
 * @default (需配置)数字雨-默认叠加高光
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 叠加高光混合模式
 * @parent ---字符粒子---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-变亮。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 1
 * 
 * 
 * @param ---雨滴效果---
 * @desc 
 *
 * @param 雨滴数量
 * @parent ---雨滴效果---
 * @type number
 * @min 1
 * @desc 界面中的雨滴数量。
 * @default 12
 *
 * @param 雨滴生命周期
 * @parent ---雨滴效果---
 * @type number
 * @min 5
 * @desc 一个雨滴从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 480
 *
 * @param 雨滴出现模式
 * @parent ---雨滴效果---
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
 * @param 雨滴固定点 X
 * @parent 雨滴出现模式
 * @desc 选择"固定点范围出现"时，雨滴出现的点位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 雨滴固定点 Y
 * @parent 雨滴出现模式
 * @desc 选择"固定点范围出现"时，雨滴出现的点位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 雨滴固定点范围
 * @parent 雨滴出现模式
 * @type number
 * @min 0
 * @desc 选择"固定点范围出现"时，以该点为圆心，指定半径的圆形区域内会出现雨滴，半径单位像素。
 * @default 120
 *
 * @param 雨滴缩放模式
 * @parent ---雨滴效果---
 * @type select
 * @option 固定缩放值
 * @value 固定缩放值
 * @option 缩放值+波动量
 * @value 缩放值+波动量
 * @desc 雨滴出现后，缩放的模式设置。
 * @default 固定缩放值
 * 
 * @param 雨滴缩放值
 * @parent 雨滴缩放模式
 * @desc 雨滴的缩放大小，1.0 表示 100%。
 * @default 1.0
 * 
 * @param 雨滴缩放随机波动量
 * @parent 雨滴缩放模式
 * @desc 雨滴缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
 * 
 * 
 * @param ---雨滴移动---
 * @default 
 *
 * @param 雨滴拖尾数量
 * @parent ---雨滴移动---
 * @type number
 * @min 1
 * @max 30
 * @desc 雨滴显现后，拖尾的粒子数量。
 * @default 8
 *
 * @param 雨滴前进方向
 * @parent ---雨滴移动---
 * @type select
 * @option 向左
 * @value 向左
 * @option 向右
 * @value 向右
 * @option 向上
 * @value 向上
 * @option 向下
 * @value 向下
 * @desc 雨滴前进的方向，只能上下左右单向间断前进。
 * @default 向左
 *
 * @param 雨滴前进补正偏移量
 * @parent ---雨滴移动---
 * @desc 雨滴会每次前进一个数字的宽度，这里为这个宽度的额外量。可为负数。
 * @default 0
 *
 * @param 雨滴前进帧间隔
 * @parent ---雨滴移动---
 * @type number
 * @min 1
 * @desc 雨滴每次前进的间隔时间。
 * @default 4
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
//		插件简称		LPR（Layer_ParticleRain）
//		临时全局变量	DrillUp.g_LPR_xxx
//		临时局部变量	this._drill_LPR_xxx
//		存储数据变量	$gameSystem._drill_LPR_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^4)*o(贴图处理) 每帧
//		★性能测试因素	战斗管理层
//		★性能测试消耗	25.02ms（drill_LPR_updateBase）23.55ms（drill_pushForward）
//		★最坏情况		大量雨滴+动态遮罩被使用。
//		★备注			在浏览器中勉强能维持3帧，不过在窗口里面，能保持24帧。（对应UI管理层的25帧，初始点的31帧，还算消耗不大）
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆地图层级
//			
//			->…………
//			
//			多层地图数字雨：
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
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰-地图界面）（脚本）.docx
//		
//		★插件私有类：
//			* 雨滴贴图【Drill_LPR_RaindropSprite】
//		
//		★必要注意事项：
//			1.插件的地图层级/图片层级与多个插件共享。【必须自写 层级排序 标准函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3. 注意，有三层数据结构：
//				配置的数字雨 > 多雨滴 > 单雨滴
//			  多雨滴的数据由 $gameSystem._drill_LPR_dataTank_curData 容器控制。
//			  单雨滴的数据由贴图 Drill_LPR_RaindropSprite 自身控制。
//			4.留意 "重点关注" 的代码部分。
//
//		★其它说明细节：
//			1.位移比变化时，影响到 数字雨层 下面的 每个雨滴。
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
	DrillUp.g_LPR_PluginTip_curName = "Drill_LayerParticleRain.js 地图-多层地图数字雨";
	DrillUp.g_LPR_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LPR_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerParticleRain = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerParticleRain');

	//==============================
	// * 静态数据 - 粒子
	//				（~struct~LPRMapRain）
	//==============================
	DrillUp.drill_LPR_rainInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layer_index'] = String( dataFrom["地图层级"] || "上层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		
		// > 字符粒子
		data['char_img'] = String( dataFrom["资源-字符粒子"] || "");
		data['char_imgExtend'] = String( dataFrom["资源-扩展字符粒子"] || "");
		data['char_file'] = "img/Map__layer/";
		data['char_randomSeq'] = String( dataFrom["顺序串列表"] || "0123456789+-x/");
		data['char_mode'] = String( dataFrom["顺序串播放模式"] || "字符全随机");
		data['char_light'] = String( dataFrom["资源-叠加高光"] || "");
		data['char_lightBlendMode'] = Number( dataFrom["叠加高光混合模式"] || 1);
		
		// > 雨滴效果
		data['raindrop_count'] = Number( dataFrom["雨滴数量"] || 0);
		data['raindrop_life'] = Number( dataFrom["雨滴生命周期"] || 360);
		data['raindrop_birthMode'] = String( dataFrom["雨滴出现模式"] || "随机出现");
		data['raindrop_birthX'] = Number( dataFrom["雨滴固定点 X"] || 0);
		data['raindrop_birthY'] = Number( dataFrom["雨滴固定点 Y"] || 0);
		data['raindrop_birthRange'] = Number( dataFrom["雨滴固定点范围"] || 120);
		data['raindrop_scaleMode'] = String( dataFrom["雨滴缩放模式"] || "固定缩放值");
		data['raindrop_scaleBase'] = Number( dataFrom["雨滴缩放值"] || 1.0);
		data['raindrop_scaleRandom'] = Number( dataFrom["雨滴缩放随机波动量"] || 0.2);
		
		// > 雨滴移动
		data['move_trailingCount'] = Number( dataFrom["雨滴拖尾数量"] || 8);
		data['move_dirMode'] = String( dataFrom["雨滴前进方向"] || "向左");
		data['move_space'] = Number( dataFrom["雨滴前进补正偏移量"] || 0);
		data['move_interval'] = Number( dataFrom["雨滴前进帧间隔"] || 4);
		
		// > 动态遮罩
		data['dynamicMask_enabled'] = String( dataFrom["是否启用地图动态遮罩"] || "false") == "true";
		data['dynamicMask_bind'] = String( dataFrom["关联的动态遮罩板"] || "动态遮罩板A");
		
		// > 私有变量初始化
		data['cameraXAcc'] = 0;					//镜头基点（循环积累值）（像素单位）
		data['cameraYAcc'] = 0;					//
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LPR_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------数字雨------------------*/
	DrillUp.g_LPR_layers_length = 200;
	DrillUp.g_LPR_layers = [];
	for( var i = 0; i < DrillUp.g_LPR_layers_length; i++ ){
		if( DrillUp.parameters["数字雨层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["数字雨层-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["数字雨层-" + String(i+1) ]);
			DrillUp.g_LPR_layers[i] = DrillUp.drill_LPR_rainInit( temp );
		}else{
			DrillUp.g_LPR_layers[i] = null;		//（强制设为空值，节约存储资源）
		}
	}

	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_LPR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LPR_pluginCommand.call(this, command, args);
	if( command === ">地图数字雨" ){ // >地图数字雨 : 数字雨[1] : 显示
	
		/*-----------------对象组获取------------------*/
		var obj_index = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1.indexOf("数字雨[") != -1 ){
				temp1 = temp1.replace("数字雨[","");
				temp1 = temp1.replace("]","");
				obj_index = Number(temp1);
			}
			if( temp1.indexOf("数字雨变量[") != -1 ){
				temp1 = temp1.replace("数字雨变量[","");
				temp1 = temp1.replace("]","");
				obj_index = $gameVariables.value(Number(temp1));
			}
		}
			
		/*-----------------执行指令------------------*/
		if( obj_index != null ){
			var changing = {};
			changing['obj_index'] = obj_index;
			changing['time'] = 0;
			changing['destroy'] = false;
			
			if( args.length == 4 ){
				var type = String(args[3]);
				if( type == "显示" || type == "隐藏" ){
					changing['type'] = type;
					$gameSystem._drill_LPR_dataTank_changing.push(changing);
					return;
				}
			}
			if( args.length == 6 ){
				var type = String(args[3]);
				var temp2 = String(args[5]);
				if( type == "变混合模式" ){
					var num_list = this.drill_LPR_getArgNumList(temp2);
					changing['type'] = type;
					changing['data1'] = num_list[0];
					$gameSystem._drill_LPR_dataTank_changing.push(changing);
					return;
				}
			}
			if( args.length == 8 ){
				var type = String(args[3]);
				var temp2 = String(args[5]);
				var temp3 = String(args[7]);
				if( type == "变透明" ){
					var num_list2 = this.drill_LPR_getArgNumList(temp2);
					var num_list3 = this.drill_LPR_getArgNumList(temp3);
					changing['type'] = type;
					changing['data1'] = num_list2[0];
					changing['data2'] = num_list3[0];
					$gameSystem._drill_LPR_dataTank_changing.push(changing);
					return;
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_LPR_getArgNumList = function( arg_str ){
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
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
//DrillUp.g_LPR_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LPR_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LPR_sys_initialize.call(this);
	this.drill_LPR_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LPR_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LPR_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LPR_saveEnabled == true ){	
		$gameSystem.drill_LPR_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LPR_initSysData();
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
Game_System.prototype.drill_LPR_initSysData = function() {
	this.drill_LPR_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LPR_checkSysData = function() {
	this.drill_LPR_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LPR_initSysData_Private = function() {
	
	this._drill_LPR_dataTank_changing = [];			//插件指令变化容器（不允许出现null值）
	this._drill_LPR_lastDirection = 2;				//当前镜头移动方向
	this._drill_LPR_dataTank_curData = [];			//当前地图容器（与 g_LPR_layers/_drill_LPR_layerTank 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_LPR_layers.length; i++){
		var temp_data = DrillUp.g_LPR_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['mapToAll'] == true ){		//全地图数据直接存储（每次地图刷新时，不刷新 全地图数据）
			var data = JSON.parse(JSON.stringify( temp_data ));
			this._drill_LPR_dataTank_curData[i] = data;
		}
	}
	
	// > 刷新当前地图『$gameSystem优先初始化』
	if( $gameMap != undefined ){
		$gameMap.drill_LPR_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LPR_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LPR_dataTank_curData == undefined ){
		this.drill_LPR_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LPR_layers.length; i++ ){
		var temp_data = DrillUp.g_LPR_layers[i];
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LPR_dataTank_curData[i] == undefined ){
				this._drill_LPR_dataTank_curData[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】地图层级 ☆地图层级
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
Scene_Map.prototype.drill_LPR_layerAddSprite = function( sprite, layer_index ){
	this.drill_LPR_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LPR_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_LPR_sortByZIndex = function() {
	this.drill_LPR_sortByZIndex_Private();
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
Scene_Map.prototype.drill_LPR_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_LPR_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LPR_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LPR_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LPR_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LPR_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LPR_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LPR_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LPR_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LPR_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LPR_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LPR_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
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
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LPR_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LPR_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_LPR_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
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
// ** 地图
//=============================================================================
//==============================
// ** 地图 - 初始化
//==============================
var _drill_LPR_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LPR_setup.call( this, mapId );
	this.drill_LPR_initMapdata();
}
Game_Map.prototype.drill_LPR_initMapdata = function() {
	
	// > 刷新当前地图容器
	for(var i = 0; i< DrillUp.g_LPR_layers.length ;i++){
		var temp_data = DrillUp.g_LPR_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LPR_dataTank_curData[i] = null;
			continue;
		}
		
		// > 全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 单地图数据时
		}else if( temp_data['map'] == this.mapId() ){
			var data = JSON.parse(JSON.stringify( temp_data ));
			$gameSystem._drill_LPR_dataTank_curData[i] = data;	//（重刷数据）
			
		// > 其它情况时
		}else{
			$gameSystem._drill_LPR_dataTank_curData[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}
// > 强制更新提示 锁
DrillUp.g_LPa_alert = true;
//==============================
// * 玩家 - 帧刷新 镜头位置
//
//			说明：	注意，玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LPR_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LPR_player_update.call( this, sceneActive );
	
	// （移动时，像素会提前偏移1像素，可以确定不是 this._displayX 的问题，因为 x - floor(x) 的差值小于0.0001）
	// 该问题已解决，刷新的时机早了，要等玩家updateScroll之后才刷。
	
	for(var i = 0; i< $gameSystem._drill_LPR_dataTank_curData.length ;i++){
		var data = $gameSystem._drill_LPR_dataTank_curData[i];
		if( data == undefined ){ continue; }
		
		// > 镜头基点
		if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】循环积累值
		
			// > 强制更新提示
			if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPa_alert == true ){ 
				alert( DrillUp.drill_LPR_getPluginTip_NeedUpdate_Camera() );
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


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图界面 - 创建
//==============================
var _drill_LPR_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LPR_layer_createAllWindows2.call(this);
	this.drill_LPR_create();	
};
Scene_Map.prototype.drill_LPR_create = function() {
	this._drill_LPR_layerTank = [];				//数字雨层（与 _drill_LPR_dataTank_curData 依次对应，允许出现null值）
	this._drill_LPR_particleTank = [];			//粒子容器（不允许出现null值）
	this._drill_LPR_particleDataTank = [];		//粒子数据容器（不允许出现null值）
	
	var data_tank = $gameSystem._drill_LPR_dataTank_curData;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		
		// > 数字雨层
		var temp_layer = new Sprite();
		temp_layer.visible = temp_data['visible'];		//层 - 显示情况
		temp_layer.opacity = temp_data['opacity'];		//层 - 透明度
		temp_layer.blendMode = temp_data['blendMode'];	//层 - 混合模式
		temp_layer.zIndex = temp_data['zIndex'];		//层 - 图片层级
		
		// > 数字雨层 - 创建动态遮罩
		if( temp_layer.visible == true ){
			this.drill_LPR_createMaskSprite( temp_data, temp_layer );
			temp_layer['_mask_inited'] = true;
			
		// > 数字雨层 - 创建动态遮罩（延迟创建）
		}else{
			temp_layer['_mask_inited'] = false;
		}
		
		// > 粒子集合
		for( var j = 0; j < temp_data['raindrop_count']; j++ ){	
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
			var temp_sprite = new Drill_LPR_RaindropSprite( temp_sprite_data );
			temp_sprite['_parentIndex'] = i;
			temp_sprite['_curIndex'] = j;
			
			this._drill_LPR_particleTank.push(temp_sprite);
			this._drill_LPR_particleDataTank.push(temp_sprite_data);
			temp_layer.addChild(temp_sprite);
			
			// > 粒子初始化
			this.drill_LPR_resetParticleRains(this._drill_LPR_particleDataTank.length-1);
			
			// > 初始化时粒子位置随机
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = Math.randomInt(Graphics.boxHeight);
			temp_sprite.drill_setStartPosition( xx, yy );
			temp_sprite.drill_refreshSpriteImmediate();
		}
		
		// > 数字雨层 - 地图层级
		this._drill_LPR_layerTank[i] = temp_layer;
		this.drill_LPR_layerAddSprite( temp_layer, temp_data['layer_index'] );
	}
	this.drill_LPR_sortByZIndex();		//排序
}
//==============================
// * 地图界面 - 创建动态遮罩
//==============================
Scene_Map.prototype.drill_LPR_createMaskSprite = function( temp_data, temp_sprite ){
	if( temp_data['dynamicMask_enabled'] != true ){ return; }
	
	if( Imported.Drill_LayerDynamicMaskA && temp_data['dynamicMask_bind'] == "动态遮罩板A" ){
		var temp_mask = this.drill_LDMA_getMaskSprite();
		this._drill_SenceTopArea.addChild(temp_mask);
		temp_sprite.mask = temp_mask;		//『遮罩赋值』
	}
	if( Imported.Drill_LayerDynamicMaskB && temp_data['dynamicMask_bind'] == "动态遮罩板B" ){
		var temp_mask = this.drill_LDMB_getMaskSprite();
		this._drill_SenceTopArea.addChild(temp_mask);
		temp_sprite.mask = temp_mask;		//『遮罩赋值』
	}
}


//==============================
// * 地图界面 - 帧刷新
//==============================
var _drill_LPR_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LPR_scene_update.call(this);
	
	this.drill_LPR_updateBase();			//基本属性（在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。）
	
	if( this.isActive() == true ){
		this.drill_LPR_updateChange();		//变化属性（该变化必须等 isActive 激活后执行，不然在变化时，会闪……目前原因不明，但也没必要深究了）
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LPR_updateBase = function() {
	var sprite_layer_tank = this._drill_LPR_layerTank;
	var data_tank = $gameSystem._drill_LPR_dataTank_curData;
	
	// > 数字雨层
	for(var i=0; i< sprite_layer_tank.length; i++){
		var temp_sprite = sprite_layer_tank[i];
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
			
		// > 属性实时变化
		temp_sprite.visible = temp_data['visible'];			//层 - 显示情况
		temp_sprite.opacity = temp_data['opacity'];         //层 - 透明度
		temp_sprite.blendMode = temp_data['blendMode'];     //层 - 混合模式
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LPR_createMaskSprite( temp_data, temp_sprite );
		}
	}
	
	// > 粒子贴图
	for(var i = 0; i < this._drill_LPR_particleTank.length; i++ ){
		var spr = this._drill_LPR_particleTank[i];
		var data = this._drill_LPR_particleDataTank[i];
		var p_data = $gameSystem._drill_LPR_dataTank_curData[ spr['_parentIndex'] ];
		data['cameraXAcc'] = p_data['cameraXAcc'];
		data['cameraYAcc'] = p_data['cameraYAcc'];
		
		// > 位移（地图参照）
		var xx = 0;
		var yy = 0;
		xx += spr._drill_startX;					//（重点关注）
		yy += spr._drill_startY;
		xx += spr._drill_startCameraX;				//（粒子生成时，镜头的位置）
		yy += spr._drill_startCameraY;
		
		xx -= data['cameraXAcc'];						//（注意，这里不能用adjust，因为如果你一直向前移动，贴图会越来越远）
		yy -= data['cameraYAcc'];
		xx += data['tile_x'] * $gameMap.tileWidth();
		yy += data['tile_y'] * $gameMap.tileHeight();
		xx += spr._drill_movingX * spr.scale.x;		//（移动的位置是成比例的）
		yy += spr._drill_movingY * spr.scale.y;
		
		
		// > 层级与镜头的位移（地图参照）
		var pos = this.drill_LPR_layerCameraMoving( xx, yy, data['layer_index'], data );
		xx = pos['x'];
		yy = pos['y'];
		
		
		spr.x = xx;
		spr.y = yy;
		
		// > 过界刷新
    	if( this.drill_LPR_isNeedResetParticleRains(i) ){
			this.drill_LPR_resetParticleRains(i);
		};
	};
	
	
};
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LPR_updateChange = function() {
	var change_tank = $gameSystem._drill_LPR_dataTank_changing;	//（只变数据，不变sprite）
	var data_tank = $gameSystem._drill_LPR_dataTank_curData;
	
	for(var j=0; j< change_tank.length; j++){
		var temp_change = change_tank[j];
		var temp_data = data_tank[ temp_change['obj_index'] -1 ];
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
Scene_Map.prototype.drill_LPR_isNeedResetParticleRains = function( i ){
	var spr = this._drill_LPR_particleTank[i];
	var data = this._drill_LPR_particleDataTank[i];
	
	// > 销毁判断
	if( spr.drill_isNeedDestroy() ){ return true };
	
	return false;
};

//==============================
// * 粒子 - 重设起始点
//==============================	
Scene_Map.prototype.drill_LPR_resetParticleRains = function( i ){
	var spr = this._drill_LPR_particleTank[i];
	var data = this._drill_LPR_particleDataTank[i];
	var p_data = $gameSystem._drill_LPR_dataTank_curData[ spr['_parentIndex'] ];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	// > 雨滴出现模式
	if( data['raindrop_birthMode'] == "随机出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['raindrop_birthMode'] == "左侧出现" ){
		data['start_x'] = 0 - ww*0.1;
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['raindrop_birthMode'] == "右侧出现" ){
		data['start_x'] = Graphics.boxWidth + ww*0.1;
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['raindrop_birthMode'] == "顶部出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = 0 - hh*0.1;
	}
	if( data['raindrop_birthMode'] == "底部出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = Graphics.boxHeight + hh*0.1;
	}
	if( data['raindrop_birthMode'] == "固定点范围出现" ){
		data['start_x'] = data['raindrop_birthX'] + data['raindrop_birthRange'] * Math.cos( 2*Math.PI*Math.random() );
		data['start_y'] = data['raindrop_birthY'] + data['raindrop_birthRange'] * Math.sin( 2*Math.PI*Math.random() );
	}
	
	// > 粒子位置重置
	spr.visible = false;
	spr.drill_resetPrivateData();					//重刷数据（重点关注）
	spr.drill_setStartPosition( data['start_x'], data['start_y'] );
	
	// > 粒子缩放模式
	if( data['raindrop_scaleMode'] == "固定缩放值" ){
		spr.scale.x = data['raindrop_scaleBase'];
		spr.scale.y = data['raindrop_scaleBase'];
	}
	if( data['raindrop_scaleMode'] == "缩放值+波动量" ){
		var ran = Math.random();
		spr.scale.x = data['raindrop_scaleBase'] + (ran - 0.5) * data['raindrop_scaleRandom'];
		spr.scale.y = data['raindrop_scaleBase'] + (ran - 0.5) * data['raindrop_scaleRandom'];
	}
		
	// > 其它边沿固定出现（30%的几率，重点关注）
	if( data['raindrop_birthMode'] == "左侧出现" && Math.random() < 0.3 ){
		if( $gameSystem._drill_LPR_lastDirection == 6 ){		//（右侧出现）
			var xx = 0 - ww*0.1;
			var yy = Math.randomInt(Graphics.boxHeight);
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 8 ){	//（顶部出现）
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = 0 - hh*0.1;
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 2 ){	//（底部出现）
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = Graphics.boxHeight + hh*0.1;
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}
	}
	if( data['raindrop_birthMode'] == "右侧出现" && Math.random() < 0.3 ){
		if( $gameSystem._drill_LPR_lastDirection == 4 ){		//（左侧出现）
			var xx = 0 - ww*0.1;
			var yy = Math.randomInt(Graphics.boxHeight);
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 8 ){	//（顶部出现）
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = 0 - hh*0.1;
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 2 ){	//（底部出现）
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = Graphics.boxHeight + hh*0.1;
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}
	}
	if( data['raindrop_birthMode'] == "顶部出现" && Math.random() < 0.3 ){
		if( $gameSystem._drill_LPR_lastDirection == 4 ){		//（左侧出现）
			var xx = 0 - ww*0.1;
			var yy = Math.randomInt(Graphics.boxHeight);
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 6 ){	//（右侧出现）
			var xx = 0 - ww*0.1;
			var yy = Math.randomInt(Graphics.boxHeight);
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 2 ){	//（底部出现）
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = Graphics.boxHeight + hh*0.1;
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}
	}
	if( data['raindrop_birthMode'] == "底部出现" && Math.random() < 0.3 ){
		if( $gameSystem._drill_LPR_lastDirection == 4 ){		//（左侧出现）
			var xx = 0 - ww*0.1;
			var yy = Math.randomInt(Graphics.boxHeight);
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 6 ){	//（右侧出现）
			var xx = 0 - ww*0.1;
			var yy = Math.randomInt(Graphics.boxHeight);
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}else if( $gameSystem._drill_LPR_lastDirection == 8 ){	//（顶部出现）
			var xx = Math.randomInt(Graphics.boxWidth);
			var yy = 0 - hh*0.1;
			spr.drill_setStartPosition( xx, yy );
			spr.drill_refreshSpriteImmediate();
		}
	}
	
};


//=============================================================================
// * 雨滴贴图【Drill_LPR_RaindropSprite】
//			
//			
//			作用域：	地图界面
//			主功能：	定义 一个雨滴（单束字符粒子） 的贴图。
//			子功能：
//						->基本属性
//							> 起始位置（_drill_startX）
//						->生命周期
//							->过界判断
//							->过界后立即死亡
//						->帧刷新
//							> 移动位置
//							> 透明度递减
//						->字符粒子
//							> 分割方式（与参数数字一样，横向14份）
//							> 向前推进（_drill_movingX）
//						->边框问题（父类解决）
//							->粒子有30%的几率出现在镜头正在移动的边沿
//					
//			说明：	> 粒子被销毁的条件见：drill_isNeedDestroy。
//					  必须等到所有 字符粒子 透明归零后，才算销毁。
//					> 注意这里只描述 单束字符粒子 。
//					  如果重刷菜单，贴图会归位，且消除拖尾轨迹。
//					> 坐标的实际信息可以自己移动也可被父类控制。
//			
// 			代码：	> 范围 - 仅用于单束字符粒子的变换。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。注意，_drill_LPR_dataTank_changing是外部强制干涉的贴图属性，并非该类内部的控制属性。
//					> 数量 - [单个/ ●多个 ]
//					> 创建 - [一次性/ ●自延迟 /外部延迟] 需要等资源加载后，才用高宽进行切割。
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 数字雨在界面刷新后创建固定数额，不考虑销毁情况。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 样式设置后固定，不可修改。
//=============================================================================
//==============================
// * 雨滴贴图 - 定义
//==============================
function Drill_LPR_RaindropSprite() {
    this.initialize.apply(this, arguments);
};
Drill_LPR_RaindropSprite.prototype = Object.create(Sprite.prototype);
Drill_LPR_RaindropSprite.prototype.constructor = Drill_LPR_RaindropSprite;
//==============================
// * 雨滴贴图 - 初始化
//==============================
Drill_LPR_RaindropSprite.prototype.initialize = function( data ){
	Sprite.prototype.initialize.call(this);
	this._drill_data = data;			//（只读数据）
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
}
//==============================
// * 雨滴贴图 - 帧刷新
//==============================
Drill_LPR_RaindropSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this._drill_lifeTime += 1;          //帧刷新 - 生命周期
	this.drill_updateVisible();			//帧刷新 - 可见
	this.drill_updateCharOpacity();		//帧刷新 - 字符粒子 - 透明度
	this.drill_updateCharPosition();	//帧刷新 - 字符粒子 - 移动
}
//==============================
// * 初始化 - 数据
//==============================
Drill_LPR_RaindropSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	if( data['raindrop_life'] == undefined ){ data['raindrop_life'] = 360 };			//雨滴生命周期
	
	if( data['char_img'] == undefined ){ data['char_img'] = "" };						//字符粒子 - 资源 - 字符粒子
	if( data['char_imgExtend'] == undefined ){ data['char_imgExtend'] = "" };			//字符粒子 - 资源 - 扩展字符粒子
	if( data['char_light'] == undefined ){ data['char_light'] = "" };					//字符粒子 - 资源 - 叠加高光
	if( data['char_file'] == undefined ){ data['char_file'] = "img/Map__layer/" };		//字符粒子 - 资源文件夹
	if( data['char_randomSeq'] == undefined ){ data['char_randomSeq'] = "01" };			//字符粒子 - 顺序串列表
	if( data['char_mode'] == undefined ){ data['char_mode'] = "字符全随机" };			//字符粒子 - 顺序串播放模式
	if( data['char_lightBlendMode'] == undefined ){ data['char_lightBlendMode'] = 1 };	//字符粒子 - 叠加高光混合模式
		
	if( data['move_trailingCount'] == undefined ){ data['move_trailingCount'] = 10 };	//雨滴移动 - 雨滴拖尾数量
	if( data['move_dirMode'] == undefined ){ data['move_dirMode'] = "向左" };			//雨滴移动 - 雨滴前进方向
	if( data['move_space'] == undefined ){ data['move_space'] = 0 };					//雨滴移动 - 雨滴前进补正偏移量
	if( data['move_interval'] == undefined ){ data['move_interval'] = 6 };				//雨滴移动 - 雨滴前进帧间隔
	
}
//==============================
// * 初始化 - 对象
//==============================
Drill_LPR_RaindropSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this.drill_resetPrivateData();
	
	// > 资源对象准备
	this._drill_srcBitmap = ImageManager.loadBitmap(data['char_file'], data['char_img'], 0, true);
	this._drill_srcBitmapEx = ImageManager.loadBitmap(data['char_file'], data['char_imgExtend'], 0, true);
	this._drill_lightBitmap = ImageManager.loadBitmap(data['char_file'], data['char_light'], 0, true);
	
	// > 主体属性
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = false;
	//this.x = 0;		//（坐标信息被转移到 this._drill_movingX 中，由父类定向控制）
	//this.y = 0;
	
	
    // > 字符粒子容器
	this._drill_parSpriteTank = [];	
	for(var i = 0; i < data['move_trailingCount']; i++ ){
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = this._drill_srcBitmap;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.opacity = 0;
		this.addChild( temp_sprite );
		this._drill_parSpriteTank.push(temp_sprite);
	}
	
	// > 叠加高光
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = this._drill_lightBitmap;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.opacity = 0;
	temp_sprite.blendMode = data['char_lightBlendMode'];
	this.addChild( temp_sprite );
	this._drill_lightSprite = temp_sprite;
	
};
//==============================
// * 初始化 - 重刷私有数据
//==============================
Drill_LPR_RaindropSprite.prototype.drill_resetPrivateData = function() {
	var data = this._drill_data;	
	this._drill_isOutFrame = false;													//过界判断（暂存标记）
	this._drill_lifeTime = Math.floor( data['raindrop_life']/4*Math.random() );		//生命周期（加一点点随机，打乱粒子顺序）

	this._drill_movingTime = 0;						//字符粒子 - 移动时间
	this._drill_startX = 0;							//字符粒子 - 起始位置X
	this._drill_startY = 0;							//字符粒子 - 起始位置Y
	this._drill_startCameraX = data['cameraXAcc'];		//字符粒子 - 起始时镜头位置X
	this._drill_startCameraY = data['cameraYAcc'];		//字符粒子 - 起始时镜头位置Y
	this._drill_movingX = 0;						//字符粒子 - 推进的位置X
	this._drill_movingY = 0;						//字符粒子 - 推进的位置Y
	this._drill_movingParIndex = 0;					//字符粒子 - 当前推进粒子的索引
};
//==============================
// * 初始化 - 设置起始位置（接口）
//==============================
Drill_LPR_RaindropSprite.prototype.drill_setStartPosition = function( x, y ){
	this._drill_startX = x;				//字符粒子 - 起始位置X
	this._drill_startY = y;				//字符粒子 - 起始位置Y
}

////==============================
//// * 过界判断 - 获取绝对坐标X（依次累加父类位置）
////==============================
//Drill_LPR_RaindropSprite.prototype.absoluteX = function(){
//    var x = 0;
//    var object = this;
//    while( object ){
//        x += object.x;
//        object = object.parent;
//    }
//    return x;
//};
////==============================
//// * 过界判断 - 获取绝对坐标Y（依次累加父类位置）
////==============================
//Drill_LPR_RaindropSprite.prototype.absoluteY = function(){
//    var y = 0;
//    var object = this;
//    while( object ){
//        y += object.y;
//        object = object.parent;
//    }
//    return y;
//};
//==============================
// * 过界判断 - 判断
//==============================
Drill_LPR_RaindropSprite.prototype.drill_isOutFrame = function() {
	var xx = this.x;
	var yy = this.y;
	var rect = new PIXI.Rectangle( 0, 0, Graphics.boxWidth, Graphics.boxHeight );
	rect.pad( Graphics.boxWidth*0.5, Graphics.boxHeight*0.5 );
	if( rect.contains(xx,yy) ){
		return false;
	}
	return true;
}

//==============================
// * 生命周期 - 立即刷新雨滴和拖尾（接口）
//==============================
Drill_LPR_RaindropSprite.prototype.drill_refreshSpriteImmediate = function(){
		
	// > 推进n次
	for(var i = 0; i < this._drill_parSpriteTank.length; i++ ){
		this.drill_pushForwardFlow();
	}
	
	// > 重设透明度
	for(var i = 0; i < this._drill_parSpriteTank.length; i++ ){
		var temp_sprite = this._drill_parSpriteTank[i];
		temp_sprite.opacity = 255 * i / this._drill_parSpriteTank.length;
	}
}
//==============================
// * 生命周期 - 判断生命（接口）
//==============================
Drill_LPR_RaindropSprite.prototype.drill_isDead = function () {
	
	// > 过界后立即死亡
	if( this._drill_isOutFrame == true ){ return true; }
	
	// > 判断生命
	if( this._drill_lifeTime > this._drill_data['raindrop_life'] ){ return true; }
	
    return false;
}
//==============================
// * 生命周期 - 判断销毁（接口）
//==============================
Drill_LPR_RaindropSprite.prototype.drill_isNeedDestroy = function () {
	
	// > 透明度未归零，不能销毁
	for(var i = 0; i < this._drill_parSpriteTank.length; i++ ){
		var temp_sprite = this._drill_parSpriteTank[i];
		if( temp_sprite.opacity > 0 ){
			return false;
		}
	}
    return this.drill_isDead();
}
//==============================
// * 生命周期 - 可见
//==============================
Drill_LPR_RaindropSprite.prototype.drill_updateVisible = function () {
	if( this._drill_srcBitmap.isReady() ){
	    this.visible = true;
	}
}

//==============================
// * 字符粒子 - 宽度
//==============================
Drill_LPR_RaindropSprite.prototype.drill_parWidth = function () {
    if( this._drill_srcBitmap.isReady() != true ){ return 0; }
    return this._drill_srcBitmap.width / 14;
}
//==============================
// * 字符粒子 - 高度
//==============================
Drill_LPR_RaindropSprite.prototype.drill_parHeight = function () {
    if( this._drill_srcBitmap.isReady() != true ){ return 0; }
    return this._drill_srcBitmap.height;
}
//==============================
// * 字符粒子 - 帧刷新透明度
//==============================
Drill_LPR_RaindropSprite.prototype.drill_updateCharOpacity = function () {
	var data = this._drill_data;
	
	// > 透明度递减 - 字符粒子
	for(var i = 0; i < this._drill_parSpriteTank.length; i++ ){
		var temp_sprite = this._drill_parSpriteTank[i];
		temp_sprite.opacity -= 255 / (data['move_interval'] * data['move_trailingCount']);
	}
	
	// > 透明度递减 - 高光
	this._drill_lightSprite.opacity -= 255 / (data['move_interval'] + 1);	//（帧间隔时间内 瞬间亮一下）
}
//==============================
// * 字符粒子 - 帧刷新移动
//==============================
Drill_LPR_RaindropSprite.prototype.drill_updateCharPosition = function () {
	var data = this._drill_data;
	
	// > 生命周期结束后不再推进
	if( this.drill_isDead() == true ){ return; }
	
	// > 时间+1
	this._drill_movingTime += 1;
	
	// > 推进帧间隔
	var time = this._drill_movingTime % data['move_interval'];
	if( time == 0 ){
		
		// > 向前推进
		this.drill_pushForwardFlow();
	
		// > 推进后记录过界情况标记
		this._drill_isOutFrame = this.drill_isOutFrame();
	}
	
	// > 位置设置（重点关注）
	//this.x = this._drill_startX + this._drill_movingX;	//（此部分被父类控制）		
	//this.y = this._drill_startY + this._drill_movingY;
}
//==============================
// * 字符粒子 - 向前推进（单次流程）
//==============================
Drill_LPR_RaindropSprite.prototype.drill_pushForwardFlow = function(){
    if( this._drill_srcBitmap.isReady() != true ){ return; }
	var data = this._drill_data;
	
	// > 播放字符
	var next_char = 0;
	if( data['char_mode'] == "顺序播放字符" ){
		var time_total = this._drill_movingTime / data['move_interval'];
		var ch_index = time_total % data['char_randomSeq'].length;
		next_char = data['char_randomSeq'].charAt( ch_index );
		
	}else{					// "字符全随机"
		var ch_index = Math.floor( Math.random()*data['char_randomSeq'].length );
		next_char = data['char_randomSeq'].charAt( ch_index );
	}
	
	// > 执行推进
	this.drill_pushForward( next_char, data['move_dirMode'] );
}
//==============================
// * 字符粒子 - 向前推进（接口）
//
//			说明：	使用 指定字符，并向 指定方向 前推进一格。
//==============================
Drill_LPR_RaindropSprite.prototype.drill_pushForward = function( next_char, next_direction ){
	var data = this._drill_data;
	
	// > 当前字符贴图
	this._drill_movingParIndex += 1;
	if( this._drill_movingParIndex >= this._drill_parSpriteTank.length ){
		this._drill_movingParIndex = 0;
	}
	var last_parSprite = this._drill_parSpriteTank[ this._drill_movingParIndex ];
	
	// > 设置字符贴图
	var ww = Math.floor( this.drill_parWidth() );
	var hh = Math.floor( this.drill_parHeight() );
	var frame_index = this.drill_getFrameIndexByChar( next_char );
	if( frame_index >= 14 ){
		last_parSprite.bitmap = this._drill_srcBitmapEx;
		last_parSprite.setFrame( (frame_index-14)*ww, 0, ww, hh );
	}else{
		last_parSprite.bitmap = this._drill_srcBitmap;
		last_parSprite.setFrame( frame_index*ww, 0, ww, hh );
	}
	
	
	// > 设置粒子位置
	if( next_direction == "向左" ){
		var offset = ww + data['move_space'];
		
		// > 所有粒子反方向推
		for(var i = 0; i < this._drill_parSpriteTank.length; i++){
			var parSprite = this._drill_parSpriteTank[i];
			parSprite.x += offset;
		}
		
		// > 当前粒子归位
		last_parSprite.x = 0;
		last_parSprite.y = 0;
		
		// > 雨滴推进
		this._drill_movingX -= offset;
	}
	if( next_direction == "向右" ){
		var offset = ww + data['move_space'];
		
		// > 所有粒子反方向推
		for(var i = 0; i < this._drill_parSpriteTank.length; i++){
			var parSprite = this._drill_parSpriteTank[i];
			parSprite.x -= offset;
		}
		
		// > 当前粒子归位
		last_parSprite.x = 0;
		last_parSprite.y = 0;
		
		// > 雨滴推进
		this._drill_movingX += offset;
	}
	if( next_direction == "向上" ){
		var offset = hh + data['move_space'];
		
		// > 所有粒子反方向推
		for(var i = 0; i < this._drill_parSpriteTank.length; i++){
			var parSprite = this._drill_parSpriteTank[i];
			parSprite.y += offset;
		}
		
		// > 当前粒子归位
		last_parSprite.x = 0;
		last_parSprite.y = 0;
		
		// > 雨滴推进
		this._drill_movingY -= offset;
	}
	if( next_direction == "向下" ){
		var offset = hh + data['move_space'];
		
		// > 所有粒子反方向推
		for(var i = 0; i < this._drill_parSpriteTank.length; i++){
			var parSprite = this._drill_parSpriteTank[i];
			parSprite.y -= offset;
		}
		
		// > 当前粒子归位
		last_parSprite.x = 0;
		last_parSprite.y = 0;
		
		// > 雨滴推进
		this._drill_movingY += offset;
	}
	
	
	// > 设置透明度
	last_parSprite.opacity = 255;
	this._drill_lightSprite.opacity = 255;
}
//==============================
// * 字符粒子 - 获取框架索引位置
//
//			说明：	按照 参数数字结构 "0123456789+-x/abcdefghijklmn" 的顺序获取索引。
//==============================
Drill_LPR_RaindropSprite.prototype.drill_getFrameIndexByChar = function( temp_char ){
	if( temp_char == undefined ){ return 0; }
	temp_char = temp_char.toLowerCase();
	var frame_index = 0;
	
	if( temp_char == "0" ){
		frame_index = 0;
	}else if( temp_char == "1" ){
		frame_index = 1;
	}else if( temp_char == "2" ){
		frame_index = 2;
	}else if( temp_char == "3" ){
		frame_index = 3;
	}else if( temp_char == "4" ){
		frame_index = 4;
	}else if( temp_char == "5" ){
		frame_index = 5;
	}else if( temp_char == "6" ){
		frame_index = 6;
	}else if( temp_char == "7" ){
		frame_index = 7;
	}else if( temp_char == "8" ){
		frame_index = 8;
	}else if( temp_char == "9" ){
		frame_index = 9;
	}else if( temp_char == "+" ){
		frame_index = 10;
	}else if( temp_char == "-" ){
		frame_index = 11;
	}else if( temp_char == "x" || temp_char == "*" ){
		frame_index = 12;
	}else if( temp_char == "/" ){
		frame_index = 13;
		
	}else if( temp_char == "a" ){
		frame_index = 14;
	}else if( temp_char == "b" ){
		frame_index = 15;
	}else if( temp_char == "c" ){
		frame_index = 16;
	}else if( temp_char == "d" ){
		frame_index = 17;
	}else if( temp_char == "e" ){
		frame_index = 18;
	}else if( temp_char == "f" ){
		frame_index = 19;
	}else if( temp_char == "g" ){
		frame_index = 20;
	}else if( temp_char == "h" ){
		frame_index = 21;
	}else if( temp_char == "i" ){
		frame_index = 22;
	}else if( temp_char == "j" ){
		frame_index = 23;
	}else if( temp_char == "k" ){
		frame_index = 24;
	}else if( temp_char == "l" ){
		frame_index = 25;
	}else if( temp_char == "m" ){
		frame_index = 26;
	}else if( temp_char == "n" ){
		frame_index = 27;
	}
	return frame_index;
}
	