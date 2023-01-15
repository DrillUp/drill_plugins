//=============================================================================
// Drill_LayerTiledGif.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        地图 - 多层地图平铺GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "平铺GIF-%d"
 * @Drill_LE_parentKey "---平铺GIF组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LTG_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerTiledGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个平铺GIF。
 * ★★必须放在 mog多层天气效果 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     平铺GIF可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   可以在地图的五个层级放多层不同的平铺GIF。
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
 *   (1.你可以将平铺GIF放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 《 下层 《 图块层 《 中层 《 事件/玩家层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.最顶层的平铺GIF，可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 *   (5.如果你设置了平铺GIF在 中层 ，你会发现平铺GIF可能会切割图块画的
 *      树木。这是因为树木图块上方能够挡住事件，而下方被事件遮挡。
 *      根据图层的先后关系，平铺GIF的切割树木现象是正常情况。
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
 *   (2.操作隐藏的平铺GIF 或者 操作其他地图的平铺GIF，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 * 设计：
 *   (1.配置 作用于所有地图 并且 放置到最顶层 后，可通过插件指令实现转
 *      场动画的效果。
 *      具体去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer_gif （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer_gif文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 平铺GIF1 资源-平铺GIF
 * 平铺GIF2 资源-平铺GIF
 * 平铺GIF3 资源-平铺GIF
 * ……
 *
 * 所有素材都放在Map__layer_gif文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图平铺GIF的各个属性：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 显示
 * 插件指令：>地图平铺GIF : 平铺GIF变量[21] : 显示
 *
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 显示
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 隐藏
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变坐标 : 变化时间[60] : 位置[100,100]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变坐标 : 变化时间[60] : 位置变量[25,26]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变透明 : 变化时间[60] : 透明度[255]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变透明 : 变化时间[60] : 透明度变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变速度 : 变化时间[60] : 速度[1.0,-1.0]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变速度 : 变化时间[60] : 速度变量[21,22]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 变混合模式 : 混合模式[2]
 * 
 * 1.前半部分（平铺GIF[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有2*9种组合方式。
 * 2."变坐标"的变化效果可以与速度叠加。
 * 3."速度[1.0,-1.0]"表示x轴向左（正左负右），y轴向下（正上负下）。
 * 4.混合模式为瞬间切换，去看看"0.基本定义 > 混合模式.docx"。
 * 5.插件指令的变化是永久性的。
 *   如果你想瞬间切换，设置时长为0即可。
 * 6.平铺GIF被隐藏 或者 操作不在当前地图的平铺GIF，插件指令仍然有效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - GIF播放
 * 你可以通过插件指令手动修改地图平铺GIF的各个属性：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 锁定帧
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 解锁帧
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 设置帧 : 当前帧[1]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 设置帧 : 当前帧变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 正向播放一次并停留在末尾帧
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 反向播放一次并停留在起始帧
 * 
 * 1."设置帧"的 当前帧，1表示第1帧。
 * 2.你可以设置GIF锁定在某一帧，帧数与资源配置的id对应。
 * 3."正向播放一次并停留在末尾帧"表示强制该GIF播放重头到尾播放一次。
 *   播放完毕后，自动锁定到末尾帧。
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
 * 测试方法：   在地图中放置8个平铺GIF，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【25.81ms】
 *              100个事件的地图中，平均消耗为：【18.98ms】
 *               50个事件的地图中，平均消耗为：【17.37ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.这些平铺GIF在隐藏或透明度为0的时候，由于图像未工作，所以不会
 *   造成多少消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了玩家移动时，出现1像素的轻微漂移的问题。
 * [v1.2]
 * 添加了 参数存储 功能开关，以及动态遮罩功能。
 * [v1.3]
 * 添加了平铺GIF的浮动效果设置。
 * [v1.4]
 * 梳理优化了位移比的结构。
 * [v1.5]
 * 优化了与地图活动镜头的兼容结构。
 * [v1.6]
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
 * @param ---平铺GIF组 1至20---
 * @default
 *
 * @param 平铺GIF-1
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-2
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-3
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-4
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-5
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-6
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-7
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-8
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-9
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-10
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-11
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-12
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-13
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-14
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-15
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-16
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-17
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-18
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-19
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-20
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组21至40---
 * @default
 *
 * @param 平铺GIF-21
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-22
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-23
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-24
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-25
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-26
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-27
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-28
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-29
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-30
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-31
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-32
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-33
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-34
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-35
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-36
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-37
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-38
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-39
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-40
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组41至60---
 * @default
 *
 * @param 平铺GIF-41
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-42
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-43
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-44
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-45
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-46
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-47
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-48
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-49
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-50
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-51
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-52
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-53
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-54
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-55
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-56
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-57
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-58
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-59
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-60
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组61至80---
 * @default
 *
 * @param 平铺GIF-61
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-62
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-63
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-64
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-65
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-66
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-67
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-68
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-69
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-70
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-71
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-72
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-73
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-74
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-75
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-76
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-77
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-78
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-79
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-80
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组81至100---
 * @default
 *
 * @param 平铺GIF-81
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-82
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-83
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-84
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-85
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-86
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-87
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-88
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-89
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-90
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-91
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-92
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-93
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-94
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-95
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-96
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-97
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-98
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-99
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-100
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组101至120---
 * @default
 *
 * @param 平铺GIF-101
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-102
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-103
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-104
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-105
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-106
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-107
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-108
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-109
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-110
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-111
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-112
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-113
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-114
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-115
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-116
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-117
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-118
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-119
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-120
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组121至140---
 * @default
 *
 * @param 平铺GIF-121
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-122
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-123
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-124
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-125
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-126
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-127
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-128
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-129
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-130
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-131
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-132
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-133
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-134
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-135
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-136
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-137
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-138
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-139
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-140
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组141至160---
 * @default
 *
 * @param 平铺GIF-141
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-142
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-143
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-144
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-145
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-146
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-147
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-148
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-149
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-150
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-151
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-152
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-153
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-154
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-155
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-156
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-157
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-158
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-159
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-160
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组161至180---
 * @default
 *
 * @param 平铺GIF-161
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-162
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-163
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-164
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-165
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-166
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-167
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-168
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-169
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-170
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-171
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-172
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-173
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-174
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-175
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-176
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-177
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-178
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-179
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-180
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组181至200---
 * @default
 *
 * @param 平铺GIF-181
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-182
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-183
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-184
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-185
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-186
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-187
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-188
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-189
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-190
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-191
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-192
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-193
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-194
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-195
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-196
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-197
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-198
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-199
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-200
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~LTGMapTiledGif:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图层==
 * 
 * @param ---绑定---
 * @default 
 *
 * @param 是否作用到所有地图
 * @parent ---绑定---
 * @type boolean
 * @on 作用到所有
 * @off 作用于指定地图
 * @desc 部分平铺GIF可以用作于场景变换，这个场景变化可以应用到所有地图。
 * @default false
 * 
 * @param 所属地图
 * @parent 是否作用到所有地图
 * @type number
 * @min 1
 * @desc 该平铺GIF将放在指定对应的地图id中。
 * @default 1
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
 * @param 初始是否锁定帧
 * @parent ---贴图---
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定
 * @default false
 * 
 * @param 锁定帧数
 * @parent 初始是否锁定帧
 * @type number
 * @min 1
 * @desc 该平铺GIF在游戏初始时锁定的帧数id，对应 资源 中的序号。
 * @default 1
 * 
 * @param 资源-平铺GIF
 * @parent ---贴图---
 * @desc 平铺GIF的图片资源。
 * @default ["(需配置)地图平铺GIF"]
 * @require 1
 * @dir img/Map__layer_gif/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 3
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
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
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 平移-平铺GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-平铺GIF Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。0为贴在最上面。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平铺GIF-X速度
 * @parent ---贴图---
 * @desc 平铺GIF按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 平铺GIF-Y速度
 * @parent ---贴图---
 * @desc 平铺GIF按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
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
 * @desc 平铺GIF在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动，紧贴地图。负数则反向移动。
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
 * @param ---浮动效果---
 * @default 
 *
 * @param 是否开启浮动效果
 * @parent ---浮动效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 浮动模式
 * @parent ---浮动效果---
 * @type select
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @option 左上右下斜向浮动
 * @value 左上右下斜向浮动
 * @option 右上左下斜向浮动
 * @value 右上左下斜向浮动
 * @desc 来回浮动的模式。
 * @default 上下浮动
 * 
 * @param 浮动周期
 * @parent ---浮动效果---
 * @type number
 * @min 1
 * @desc 浮动一个来回的周期时间，单位帧。(1秒60帧)
 * @default 240
 *
 * @param 浮动偏移量
 * @parent ---浮动效果---
 * @type number
 * @min 1
 * @desc 浮动范围的偏移位置量，单位像素。
 * @default 20
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
 * @desc 设置后，平铺GIF会被 地图动态遮罩板 遮住，通过特定的 透视镜 才能看到该平铺GIF的部分图像。
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LTG（Layer_Ground）
//		临时全局变量	DrillUp.g_LTG_xxx
//		临时局部变量	this._drill_LTG_xxx
//		存储数据变量	$gameSystem._drill_LTG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	初始点 转 菜单管理层
//		★性能测试消耗	9.86ms,7.51ms（drill_LTG_updateBase）
//		★最坏情况		无
//		★备注			垃圾电脑播放时，相对流畅。似乎不可见的时候，消耗几乎没有，因为这里配置了10多层，消耗却不大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多层地图平铺GIF：
//				->基本属性
//					->地图层级、图片层级（多插件相互作用）
//					->GIF播放
//					->简单持续平移
//					->镜头位移比
//				->可修改的属性
//					->显示隐藏
//					->坐标、速度、透明、混合模式
//					x->色调、缩放、斜切
//					->GIF帧数插件指令
//						->播放一次
//
//			地图界面全层级关系：
//				Spriteset： LowerLayer：	地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 鼠标目的地 < 上层 < 天气层
//							UpperLayer：	< 图片对象层 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< 对话框集合 < 滚动文本画布 < 最顶层【_drill_SenceTopArea】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//
//		★其它说明细节：
//			1.具备和 地图多层背景 一模一样的功能，并在其基础上添加了gif播放功能。
//				
//		★存在的问题：
//			暂无
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerTiledGif = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerTiledGif');

	//==============================
	// * 变量获取 - 平铺GIF
	//				（~struct~LTGMapTiledGif）
	//==============================
	DrillUp.drill_LTG_tiledGIFInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		if( dataFrom["资源-平铺GIF"] != "" &&
			dataFrom["资源-平铺GIF"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-平铺GIF"] );
		}else{
			data['src_img'] = [];
		}
		data['interval'] = Number( dataFrom["帧间隔"] || 3);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_time'] = ( Number( dataFrom["锁定帧数"] || 0) -1) * data['interval'];
		data['x'] = Number( dataFrom["平移-平铺GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-平铺GIF Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['speedX'] = Number( dataFrom["平铺GIF-X速度"] || 0);
		data['speedY'] = Number( dataFrom["平铺GIF-Y速度"] || 0);
		
		data['layer_index'] = String( dataFrom["地图层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		
		// > 浮动效果
		data['float_enabled'] = String( dataFrom["是否开启浮动效果"] || "false") == "true";
		data['float_mode'] = String( dataFrom["浮动模式"] || "上下浮动");
		data['float_period'] = Number( dataFrom["浮动周期"] || 240);
		data['float_range'] = Number( dataFrom["浮动偏移量"] || 20);
		
		// > 动态遮罩
		data['dynamicMask_enabled'] = String( dataFrom["是否启用地图动态遮罩"] || "false") == "true";
		data['dynamicMask_bind'] = String( dataFrom["关联的动态遮罩板"] || "动态遮罩板A");
		
		// > 私有变量初始化
		data['cur_speedX'] = 0;					//当前x位置（速度累加的结果）
		data['cur_speedY'] = 0;					//
		data['cameraXAcc'] = 0;					//镜头基点（循环积累值）（像素单位）
		data['cameraYAcc'] = 0;					//
		data['cameraExtraX'] = 0;				//镜头缩放的额外偏移
		data['cameraExtraY'] = 0;				//
		data['gif_p_playing'] = false;			//gif - 播放一次
		data['gif_p_playType'] = "forwardRun";	//gif - 播放是否反向
		data['gif_p_curTime'] = 0;				//gif - 当前时间
		data['gif_p_tarTime'] = 0;				//gif - 目标时间
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LTG_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------平铺GIF------------------*/
	DrillUp.g_LTG_layers_length = 200;
	DrillUp.g_LTG_layers = [];
	for( var i = 0; i < DrillUp.g_LTG_layers_length; i++ ){
		if( DrillUp.parameters['平铺GIF-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['平铺GIF-' + String(i+1) ]);
			DrillUp.g_LTG_layers[i] = DrillUp.drill_LTG_tiledGIFInit( temp );
		}else{
			DrillUp.g_LTG_layers[i] = null;		//（强制设为空值，节约存储资源）
		}
	}


//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapLayerGIF = function(filename) {
    return this.loadBitmap('img/Map__layer_gif/', filename, 0, true);
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LTG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LTG_pluginCommand.call(this, command, args);
	if( command === ">地图平铺GIF" ){ // >地图平铺GIF : 平铺GIF[1] : 显示
	
		if(args.length >= 2){
			var id = -1;
			var temp1 = String(args[1]);
			if( temp1.indexOf("平铺GIF[") != -1 ){
				temp1 = temp1.replace("平铺GIF[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1);
			}
			if( temp1.indexOf("平铺GIF变量[") != -1 ){
				temp1 = temp1.replace("平铺GIF变量[","");
				temp1 = temp1.replace("]","");
				id = $gameVariables.value(Number(temp1));
			}
			
			if( id != -1 ){
				var changing = {};
				changing['id'] = id;
				changing['time'] = 0;
				changing['destroy'] = false;
				
				if(args.length == 4){
					var type = String(args[3]);
					if( type == "显示" || type == "隐藏" ||
						type == "锁定帧" || type == "解锁帧" || 
						type == "正向播放一次并停留在末尾帧" || 
						type == "反向播放一次并停留在起始帧"	){
						changing['type'] = type;
						$gameSystem._drill_LTG_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 6){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "变混合模式" ){
						var num_list = this.drill_LTG_getArgNumList(temp2);
						changing['type'] = type;
						changing['data1'] = num_list[0];
						$gameSystem._drill_LTG_dataTank_changing.push(changing);
						return;
					}
					if( type == "设置帧" ){
						var num_list = this.drill_LTG_getArgNumList(temp2);
						changing['type'] = type;
						changing['data1'] = num_list[0];
						$gameSystem._drill_LTG_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 8){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					if( type == "变坐标" ){
						var num_list2 = this.drill_LTG_getArgNumList(temp2);
						var num_list3 = this.drill_LTG_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LTG_dataTank_changing.push(changing);
						return;
					}
					if( type == "变透明" ){
						var num_list2 = this.drill_LTG_getArgNumList(temp2);
						var num_list3 = this.drill_LTG_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						$gameSystem._drill_LTG_dataTank_changing.push(changing);
						return;
					}
					if( type == "变速度" ){
						var num_list2 = this.drill_LTG_getArgNumList(temp2);
						var num_list3 = this.drill_LTG_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LTG_dataTank_changing.push(changing);
						return;
					}
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_LTG_getArgNumList = function( arg_str ){
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
//DrillUp.g_LTG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LTG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LTG_sys_initialize.call(this);
	this.drill_LTG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LTG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LTG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LTG_saveEnabled == true ){	
		$gameSystem.drill_LTG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LTG_initSysData();
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
Game_System.prototype.drill_LTG_initSysData = function() {
	this.drill_LTG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LTG_checkSysData = function() {
	this.drill_LTG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LTG_initSysData_Private = function() {
	
	this._drill_LTG_dataTank_changing = [];		//插件指令变化容器
	this._drill_LTG_dataTank_curData = [];		//当前地图容器（与 g_LTG_layers/_drill_LTG_layerTank 依次对应，容器允许出现null值）
	for(var i = 0; i< DrillUp.g_LTG_layers.length ;i++){
		var temp_data = DrillUp.g_LTG_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['mapToAll'] == true ){		//全地图数据直接存储（每次地图刷新时，不刷新 全地图数据）
			var data = JSON.parse(JSON.stringify( temp_data ));
			this._drill_LTG_dataTank_curData[i] = data;
		}
	}
	
	// > 刷新当前地图
	if( $gameMap ){
		$gameMap.drill_LTG_initMapdata();
	}
};	
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LTG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LTG_dataTank_curData == undefined ){
		this.drill_LTG_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LTG_layers.length; i++ ){
		var temp_data = DrillUp.g_LTG_layers[i];
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LTG_dataTank_curData[i] == undefined ){
				this._drill_LTG_dataTank_curData[i] = JSON.parse(JSON.stringify( temp_data ));
			
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
var _drill_LTG_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LTG_setup.call( this, mapId );
	this.drill_LTG_initMapdata();
}
Game_Map.prototype.drill_LTG_initMapdata = function() {
	
	// > 刷新当前地图容器
	for(var i = 0; i< DrillUp.g_LTG_layers.length ;i++){
		var temp_data = DrillUp.g_LTG_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LTG_dataTank_curData[i] = null;
			continue;
		}
		
		// > 全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 单地图数据时
		}else if( temp_data['map'] == this._mapId ){
			var data = JSON.parse(JSON.stringify( temp_data ));
			$gameSystem._drill_LTG_dataTank_curData[i] = data;	//（重刷数据）
			
		// > 其它情况时
		}else{
			$gameSystem._drill_LTG_dataTank_curData[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}
DrillUp.g_LPa_alert = true;
//==============================
// * 玩家 - 帧刷新 镜头位置
//
//			说明：	注意，玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LTG_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LTG_player_update.call( this, sceneActive );
	
	for(var i = 0; i< $gameSystem._drill_LTG_dataTank_curData.length ;i++){
		var data = $gameSystem._drill_LTG_dataTank_curData[i];
		if( data == undefined ){ continue; }
		
		// > 镜头基点（循环积累值）
		if( Imported.Drill_LayerCamera ){
			if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPa_alert == true ){ 
				alert("【Drill_LayerTiledGif.js 地图 - 多层地图平铺GIF】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
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
Scene_Map.prototype.drill_LTG_layerAddSprite = function (sprite, layer_index) {
    this.drill_LTG_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LTG_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_LTG_sortByZIndex = function () {
    this.drill_LTG_sortByZIndex_Private();
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
Scene_Map.prototype.drill_LTG_layerCameraMoving = function( x, y, layer, option ){
    return this.drill_LTG_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LTG_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LTG_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LTG_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LTG_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LTG_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LTG_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LTG_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LTG_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LTG_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LTG_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LTG_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LTG_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_LTG_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 位移比
	//		（这里是位移比配置是反的，可能是因为 TilingSprite 的缘故。）
	var x_per = 1.0 - option['XPer'];
	var y_per = 1.0 - option['YPer'];
	
	xx -= option['tile_x'] * $gameMap.tileWidth() * x_per;
	yy -= option['tile_y'] * $gameMap.tileHeight() * y_per;
	//		（*0 表示紧贴地图；*1表示减回去了，紧贴镜头。）
	
	xx += option['cameraXAcc'] * x_per;
	yy += option['cameraYAcc'] * y_per;
	//		（*0 表示不跟镜头移动，紧贴地图；*1表示紧贴镜头。）
	
	
	// > 镜头缩放的额外偏移
	xx += option['cameraExtraX'];
	yy += option['cameraExtraY'];
	
	
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
var _drill_LTG_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LTG_layer_createAllWindows2.call(this);
	this.drill_LTG_create();	
};
Scene_Map.prototype.drill_LTG_create = function() {
	this._drill_LTG_spriteTank = [];		//（允许出现null值）
	
	var data_tank = $gameSystem._drill_LTG_dataTank_curData;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		
		// > 贴图属性
		var temp_sprite = new TilingSprite();
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);		//（填满游戏窗口）
		temp_sprite._drill_src_bitmaps = [];
		for(var j = 0; j < temp_data['src_img'].length ; j++){
			temp_sprite._drill_src_bitmaps.push(ImageManager.load_MapLayerGIF(temp_data['src_img'][j]));
		}
		temp_sprite.bitmap = temp_sprite._drill_src_bitmaps[0] ;
		temp_sprite.origin.x = temp_data['x'];
		temp_sprite.origin.y = temp_data['y'];
		temp_sprite.opacity = temp_data['opacity'];
		temp_sprite.blendMode = temp_data['blendMode'];
		temp_sprite.layer_index = temp_data['layer_index'];
		temp_sprite.zIndex = temp_data['zIndex'];
		temp_sprite['_time'] = 0;
		
		// > 创建动态遮罩
		if( temp_data['visible'] == true ){
			this.drill_LTG_createMaskSprite( temp_data, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
		// > 地图层级
		this._drill_LTG_spriteTank[i] = temp_sprite;
		this.drill_LTG_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
	}
	this.drill_LTG_sortByZIndex();		//排序
}
//==============================
// * 地图界面 - 创建动态遮罩
//==============================
Scene_Map.prototype.drill_LTG_createMaskSprite = function( temp_data, temp_sprite ){
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
var _drill_LTG_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LTG_scene_update.call(this);
	
	this.drill_LTG_updateBase();			//基本属性（在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。）
	this.drill_LTG_updateResize();			//缩放属性
	
	if( this.isActive() == true ){
		this.drill_LTG_updateChange();		//变化属性（该变化必须等 isActive 激活后执行，不然在变化时，会闪……目前原因不明，但也没必要深究了）
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LTG_updateBase = function() {
	var sprite_tank = this._drill_LTG_spriteTank;
	var data_tank = $gameSystem._drill_LTG_dataTank_curData;
	
	for(var i=0; i< sprite_tank.length; i++){
		var temp_sprite = sprite_tank[i];
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite['_drill_src_bitmaps'].length != 0 ){
			
			// > 属性实时变化
			temp_sprite.visible = temp_data['visible'];
			temp_sprite.opacity = temp_data['opacity'];
			temp_sprite.blendMode = temp_data['blendMode'];
			
			// > 播放gif(正常循环)
			if( temp_data['gif_p_playing'] == false ){
				
				if( temp_data['gif_lock'] != true ){
					temp_data['gif_time'] += 1;
				}
				var inter = temp_data['gif_time'];
				inter = inter / temp_data['interval'];
				inter = inter % temp_sprite['_drill_src_bitmaps'].length;
				if( temp_data['back_run'] ){
					inter = temp_sprite['_drill_src_bitmaps'].length - 1 - inter;
				}
				inter = Math.floor(inter);
				temp_sprite.bitmap = temp_sprite['_drill_src_bitmaps'][inter];
			
			// > 播放gif(播放一次)
			}else{
				temp_data['gif_p_curTime'] += 1;
				
				var inter = temp_data['gif_p_curTime'];
				inter = inter / temp_data['interval'];
				inter = inter % temp_sprite['_drill_src_bitmaps'].length;
				if( temp_data['gif_p_playType'] == "backRun" ){
					inter = temp_sprite['_drill_src_bitmaps'].length - 1 - inter;
				}
				inter = Math.floor(inter);
				temp_sprite.bitmap = temp_sprite['_drill_src_bitmaps'][inter];
				
				if( temp_data['gif_p_curTime'] >= temp_data['gif_p_tarTime'] ){
					temp_data['gif_p_playing'] = false;
					temp_data['gif_time'] = inter * temp_data['interval'];
					temp_data['gif_lock'] = true;
				}
			}
			
		    // > 时间+1
			temp_sprite['_time'] += 1;
			var time = temp_sprite['_time'];

		    // > 位移（地图参照）
			var xx = 0;
			var yy = 0;
			xx += temp_data['x'];
			yy += temp_data['y'];
			xx += temp_data['tile_x'] * $gameMap.tileWidth();
			yy += temp_data['tile_y'] * $gameMap.tileHeight();
			//（不含镜头的偏移）
			
			// > 背景速度
			temp_data['cur_speedX'] += temp_data['speedX'];
			temp_data['cur_speedY'] += temp_data['speedY'];
			xx += temp_data['cur_speedX'];
			yy += temp_data['cur_speedY'];
			
			
			// > 层级与镜头的位移（地图参照）
			var pos = this.drill_LTG_layerCameraMoving( xx, yy, temp_data['layer_index'], temp_data );
			xx = pos['x'];
			yy = pos['y'];
			
			
			// > 浮动效果
			if( temp_data['float_enabled'] == true ){
				if( temp_data['float_mode'] == "左右浮动" ){
					xx += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				}
				if( temp_data['float_mode'] == "上下浮动" ){
					yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				}
				if( temp_data['float_mode'] == "左上右下斜向浮动" ){
					xx += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
					yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				}
				if( temp_data['float_mode'] == "右上左下斜向浮动" ){
					xx -= temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
					yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				}
			}
			
			temp_sprite.origin.x = xx;
			temp_sprite.origin.y = yy;
		}
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LTG_createMaskSprite( temp_data, temp_sprite );
		}
	}
	
};
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LTG_updateChange = function() {
	var change_tank = $gameSystem._drill_LTG_dataTank_changing;	//（只变数据，不变sprite）
	var data_tank = $gameSystem._drill_LTG_dataTank_curData;
	
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
			
			if( temp_change.type == "变坐标" ){
				if( temp_change.time == 1 ){
					temp_change._dest = Math.max( temp_change.data1,1 );
					temp_change._x = temp_change.data2 - temp_data['x'];
					temp_change._y = temp_change.data3 - temp_data['y'];
				}
				if( temp_change.time <= temp_change._dest ){
					temp_data['x'] += temp_change._x / temp_change._dest;
					temp_data['y'] += temp_change._y / temp_change._dest;
				}
				if( temp_change.time >= temp_change._dest ){
					temp_change.destroy = true;
				}
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
			
			if( temp_change.type == "变速度" ){
				if( temp_change.time == 1 ){
					temp_change._dest = Math.max( temp_change.data1,1 );
					temp_change._speedX = temp_change.data2 - temp_data['speedX'];
					temp_change._speedY = temp_change.data3 - temp_data['speedY'];
				}
				temp_data['speedX'] += temp_change._speedX / temp_change._dest;
				temp_data['speedY'] += temp_change._speedY / temp_change._dest;
				if( temp_change.time >= temp_change._dest ){
					temp_change.destroy = true;
				}
			}
			
			if( temp_change.type == "设置帧" || temp_change.type == "设置当前帧" ){
				temp_data['gif_time'] = ( temp_change.data1 - 1 ) * temp_data['interval'];
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "锁定帧" ){
				temp_data['gif_lock'] = true;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "解锁帧" ){
				temp_data['gif_lock'] = false;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "正向播放一次并停留在末尾帧" ){
				temp_data['gif_p_playing'] = true;
				temp_data['gif_p_playType'] = "forwardRun";
				temp_data['gif_p_curTime'] = 0;
				temp_data['gif_p_tarTime'] = ( temp_data['src_img'].length - 1 ) * temp_data['interval'] ;
				temp_data['gif_lock'] = false;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "反向播放一次并停留在起始帧" ){
				temp_data['gif_p_playing'] = true;
				temp_data['gif_p_playType'] = "backRun";
				temp_data['gif_p_curTime'] = 0;
				temp_data['gif_p_tarTime'] = ( temp_data['src_img'].length - 1 ) * temp_data['interval'] ;
				temp_data['gif_lock'] = false;
				temp_change.destroy = true;
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
//=============================================================================
// * 镜头兼容（兼容缩放、旋转的外包裹矩形）
//=============================================================================
Scene_Map.prototype.drill_LTG_updateResize = function(){
	
	// > 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera != true ){ return; }
	
	// > 值相同时，不刷新
	var layer_sprite = this._spriteset._baseSprite;
	if( this._drill_LTG_LCa_rotation == layer_sprite.rotation &&
		this._drill_LTG_LCa_scale_x == layer_sprite.scale.x &&
		this._drill_LTG_LCa_scale_y == layer_sprite.scale.y ){
		return;
	}
	this._drill_LTG_LCa_rotation = layer_sprite.rotation;
	this._drill_LTG_LCa_scale_x = layer_sprite.scale.x;
	this._drill_LTG_LCa_scale_y = layer_sprite.scale.y;
	
	// > 外包裹矩形
	var rect = $gameTemp.drill_LCa_getTileTransformRect( 
					0,0,Graphics.boxWidth,Graphics.boxHeight,
					layer_sprite.rotation,
					layer_sprite.scale.x,
					layer_sprite.scale.y
				);
	var ww = rect.width;
	var hh = rect.height;
	if( ww > 6000 ){ ww = 6000; }	//（定义矩形的上限值）
	if( hh > 6000 ){ hh = 6000; }
	var ox = (Graphics.boxWidth - ww)*0.5;
	var oy = (Graphics.boxHeight - hh)*0.5;
	
	// > 背景伸缩
	for(var i=0; i < this._drill_LTG_spriteTank.length; i++){
		var temp_sprite = this._drill_LTG_spriteTank[i];
		var temp_data = $gameSystem._drill_LTG_dataTank_curData[i];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
		if( temp_data['layer_index'] == "下层" ||
			temp_data['layer_index'] == "中层" || 
			temp_data['layer_index'] == "上层" ){
			temp_sprite.move( ox, oy, ww, hh );
			temp_data['cameraExtraX'] = ox;
			temp_data['cameraExtraY'] = oy;
		}
	}
}


