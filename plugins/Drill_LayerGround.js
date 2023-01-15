//=============================================================================
// Drill_LayerGround.js
//=============================================================================

/*:
 * @plugindesc [v2.3]        地图 - 多层地图背景
 * @author Drill_up
 * 
 * @Drill_LE_param "背景层-%d"
 * @Drill_LE_parentKey "---背景层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LG_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerGround +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个背景。
 * ★★必须放在 mog多层天气效果 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     地图背景可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   可以在地图的五个层级放多层不同的背景。
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
 *   (1.你可以将背景放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 《 下层 《 图块层 《 中层 《 事件/玩家层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.最顶层的背景，可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 *   (5.如果你设置了背景在 中层 ，你会发现背景可能会切割图块画的
 *      树木。这是因为树木图块上方能够挡住事件，而下方被事件遮挡。
 *      根据图层的先后关系，背景的切割树木现象是正常情况。
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
 *   (2.操作隐藏的背景 或者 操作其他地图的背景，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 *   (3.该插件不能控制默认配置的远景的相关属性。
 * 旧版本：
 *   (1.该插件经过了多次迭代，已经与1.2及以前版本使用方法有很大差异。
 * 设计：
 *   (1.你可以给地图的装饰画一层额外的阴影，并设置在地图背景中。
 *   (2.背景可以设置多层并添加到同一张地图中，
 *      因此你完全可以把背景看成是ps中的图层，先在ps中设计好多个图层
 *      的作用。比如阴影层、照明光线层等，完成后再进行图层添加，不用
 *      急着合并所有图层。
 *   (3.通过地图背景+动态遮罩板，你可以制作一种玻璃罩，比如花园玻璃房，
 *      玩家进入后顶部的玻璃罩可以透视。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 背景层1 资源-背景
 * 背景层2 资源-背景
 * 背景层3 资源-背景
 * ……
 *
 * 所有素材都放在Map__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图背景的各个属性：
 * 
 * 插件指令：>地图背景 : 背景[11] : 显示
 * 插件指令：>地图背景 : 背景变量[21] : 显示
 *
 * 插件指令：>地图背景 : 背景[11] : 显示
 * 插件指令：>地图背景 : 背景[11] : 隐藏
 * 插件指令：>地图背景 : 背景[11] : 变混合模式 : 混合模式[2]
 * 插件指令：>地图背景 : 背景[11] : 变坐标 : 变化时间[60] : 位置[100,100]
 * 插件指令：>地图背景 : 背景[11] : 变坐标 : 变化时间[60] : 位置变量[25,26]
 * 插件指令：>地图背景 : 背景[11] : 变透明 : 变化时间[60] : 透明度[255]
 * 插件指令：>地图背景 : 背景[11] : 变透明 : 变化时间[60] : 透明度变量[21]
 * 插件指令：>地图背景 : 背景[11] : 变速度 : 变化时间[60] : 速度[1.0,-1.0]
 * 插件指令：>地图背景 : 背景[11] : 变速度 : 变化时间[60] : 速度变量[21,22]
 * 
 * 1.前半部分（背景变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有2*9种组合方式。
 * 2."变坐标"的变化效果可以与速度叠加。
 * 3."速度[1.0,-1.0]"表示x轴向左（正左负右），y轴向下（正上负下）。
 * 4."混合模式"为瞬间切换，可以去看看"0.基本定义 > 混合模式.docx"。
 * 5.插件指令的变化是永久性的。
 *   如果你想瞬间切换，设置时长为0即可。
 * 6.背景被隐藏 或者 操作不在当前地图的背景，插件指令仍然有效。
 *
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>地图背景 : 11 : 显示
 * 插件指令(旧)：>地图背景 : 11 : 隐藏
 * 插件指令(旧)：>地图背景 : 11 : 变坐标 : 60 : 100 : 100
 * 插件指令(旧)：>地图背景 : 11 : 变透明 : 60 : 255
 * 插件指令(旧)：>地图背景 : 11 : 变速度 : 60 : 1.0 : 1.0
 * 插件指令(旧)：>地图背景 : 11 : 变混合模式 : 2
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
 * 测试方法：   在地图中放置多个背景，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【22.59ms】
 *              100个事件的地图中，平均消耗为：【19.04ms】
 *               50个事件的地图中，平均消耗为：【17.57ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.从原理上来说，多层背景只是固定放置的贴图，但由于事件数量会挤占
 *   部分计算资源，所以消耗会稍微增大一些。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了与mog的事件头顶文字插件 MOG_EventText 相互冲突的bug。
 * [v1.2]
 * 将覆写变为多继承，使得兼容 TerraxLighting 光照插件。
 * [v1.3]
 * 大幅度修改了地图背景的层设置，与前版本插件使用方法不太一样。
 * 添加了变化功能、镜头位移比、五个地图层级设置。
 * [v1.4]
 * 优化了内部结构。并且添加了 位移图块偏移 设置。
 * [v1.5]
 * 修改了插件关联的资源文件夹。
 * [v1.6]
 * 修复了背景处于中层时，会和事件、图块相互闪烁的bug。
 * [v1.7]
 * 修复了非循环地图中，移动镜头时位移比没有效果的bug。
 * 修改了插件指令结构。
 * [v1.8]
 * 修复了玩家移动时，出现1像素的轻微漂移的问题。
 * [v1.9]
 * 添加了 参数存储 功能开关，以及动态遮罩功能。
 * [v2.0]
 * 添加了背景的浮动效果设置。
 * [v2.1]
 * 梳理优化了位移比的结构。
 * [v2.2]
 * 优化了与地图活动镜头的兼容结构。
 * [v2.3]
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
 * @param ---背景层组 1至20---
 * @default
 *
 * @param 背景层-1
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-2
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-3
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-4
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-5
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-6
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-7
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-8
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-9
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-10
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-11
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-12
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-13
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-14
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-15
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-16
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-17
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-18
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-19
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-20
 * @parent ---背景层组 1至20---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组21至40---
 * @default
 *
 * @param 背景层-21
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-22
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-23
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-24
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-25
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-26
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-27
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-28
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-29
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-30
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-31
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-32
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-33
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-34
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-35
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-36
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-37
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-38
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-39
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-40
 * @parent ---背景层组21至40---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组41至60---
 * @default
 *
 * @param 背景层-41
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-42
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-43
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-44
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-45
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-46
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-47
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-48
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-49
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-50
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-51
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-52
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-53
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-54
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-55
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-56
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-57
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-58
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-59
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-60
 * @parent ---背景层组41至60---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组61至80---
 * @default
 *
 * @param 背景层-61
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-62
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-63
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-64
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-65
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-66
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-67
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-68
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-69
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-70
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-71
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-72
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-73
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-74
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-75
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-76
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-77
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-78
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-79
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-80
 * @parent ---背景层组61至80---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组81至100---
 * @default
 *
 * @param 背景层-81
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-82
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-83
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-84
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-85
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-86
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-87
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-88
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-89
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-90
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-91
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-92
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-93
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-94
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-95
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-96
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-97
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-98
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-99
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-100
 * @parent ---背景层组81至100---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组101至120---
 * @default
 *
 * @param 背景层-101
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-102
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-103
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-104
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-105
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-106
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-107
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-108
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-109
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-110
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-111
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-112
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-113
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-114
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-115
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-116
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-117
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-118
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-119
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-120
 * @parent ---背景层组101至120---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组121至140---
 * @default
 *
 * @param 背景层-121
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-122
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-123
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-124
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-125
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-126
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-127
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-128
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-129
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-130
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-131
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-132
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-133
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-134
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-135
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-136
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-137
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-138
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-139
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-140
 * @parent ---背景层组121至140---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组141至160---
 * @default
 *
 * @param 背景层-141
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-142
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-143
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-144
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-145
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-146
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-147
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-148
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-149
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-150
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-151
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-152
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-153
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-154
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-155
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-156
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-157
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-158
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-159
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-160
 * @parent ---背景层组141至160---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组161至180---
 * @default
 *
 * @param 背景层-161
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-162
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-163
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-164
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-165
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-166
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-167
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-168
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-169
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-170
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-171
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-172
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-173
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-174
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-175
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-176
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-177
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-178
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-179
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-180
 * @parent ---背景层组161至180---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组181至200---
 * @default
 *
 * @param 背景层-181
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-182
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-183
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-184
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-185
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-186
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-187
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-188
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-189
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-190
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-191
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-192
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-193
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-194
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-195
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-196
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-197
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-198
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-199
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-200
 * @parent ---背景层组181至200---
 * @type struct<LGMapBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 */
/*~struct~LGMapBackground:
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
 * @desc 你可以设置作用到所有地图。注意，设置后直接对所有地图有效，使用前一定要想好想清楚了。
 * @default false
 * 
 * @param 所属地图
 * @parent 是否作用到所有地图
 * @type number
 * @min 1
 * @desc 该背景将放在指定对应的地图id中。
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
 * @param 资源-背景
 * @parent ---贴图---
 * @desc 背景的图片资源。
 * @default (需配置)地图背景
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 平移-背景 X
 * @parent ---贴图---
 * @desc x轴方向平移，正数向左，负数向右，单位像素。0为贴在最左边。这里表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @parent ---贴图---
 * @desc y轴方向平移，正数向上，负数向下，单位像素。0为贴在最上面。这里表示进入地图时图片的初始位置。
 * @default 0
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
 * @param 背景X速度
 * @parent ---贴图---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @parent ---贴图---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
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
 * @desc 背景在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，背景和镜头的位移一致。设置0.00则背景不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，背景和镜头的位移一致。设置0.00则背景不随镜头移动，紧贴地图。负数则反向移动。
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
 * @desc 设置后，背景会被 地图动态遮罩 遮住，通过特定的 透视镜 才能看到该背景的部分图像。
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
//		插件简称		LG（Layer_Ground）
//		临时全局变量	DrillUp.g_LG_xxx
//		临时局部变量	this._drill_LG_xxx
//		存储数据变量	$gameSystem._drill_LG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	17.57ms  5.02ms（updateBase）
//		★最坏情况		暂无
//		★备注			放较多背景贴图好像对性能影响不大，对话管理层能持续17帧，而物体管理层只有6帧。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多层地图背景：
//				->基本属性
//					->地图层级
//						->添加贴图到层级【标准函数】
//						->层级与镜头的位移【标准函数】
//						->图片层级排序【标准函数】
//					->简单持续平移
//					->镜头位移比
//				->可修改的属性
//					->显示隐藏
//					->坐标、速度、透明、混合模式
//					x->色调、缩放、斜切
//				
//				->贴边循环背景	x
//				->波形移动？	x
//
//			地图界面全层级关系：
//				Spriteset： LowerLayer：	地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 鼠标目的地 < 上层 < 天气层
//							UpperLayer：	< 图片对象层 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< 对话框集合 < 滚动文本画布 < 最顶层【_drill_SenceTopArea】
//
//		★必要注意事项：
//			1.插件的地图层级/图片层级与多个插件共享。【必须自写 层级排序 标准函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//
//		★其它说明细节：
//			1.不要通过覆写创建函数来穿插远景和前景，直接在插入点抱方法的大腿。
//			2.循环时，_displayY会舍去取余，你需要控制图片的位置偏移的取余量不变。
//			3.默认所有窗口都在 _windowLayer 中，通过addWindow添加。
//			  而最顶层就在 _windowLayer 的后面，作为另外一个父类层。
//		
//		★特殊情况：
//			1.在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。
//			  这是 this.isActive() 控制的帧刷新过滤造成的。现在已经去掉。
//			（此active的真实意义和机制暂时未知，所以这里只能当做一个特殊情况记录下来。）
//		
//		★存在的问题：
//			1.地图数据已全部转成$gameSystem数据，包括实时变化的数据，但是没有实际测试效果和误差。
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerGround = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerGround');

	//==============================
	// * 变量获取 - 背景
	//				（~struct~LGMapBackground）
	//==============================
	DrillUp.drill_LG_backgroundInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['speedX'] = Number( dataFrom["背景X速度"] || 0);
		data['speedY'] = Number( dataFrom["背景Y速度"] || 0);
		
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
		data['cur_speedX'] = 0;				//当前x位置（速度累加的结果）
		data['cur_speedY'] = 0;				//
		data['cameraXAcc'] = 0;				//镜头基点（循环积累值）（像素单位）
		data['cameraYAcc'] = 0;				//
		data['cameraExtraX'] = 0;			//镜头缩放的额外偏移
		data['cameraExtraY'] = 0;			//
		//data['loopX'] = 0;				//循环地图中，走动循环的次数
		//data['loopY'] = 0;				//
		//data['loopFixX'] = 0;				//循环地图中，把displayX取余的部分加回（图块单位）
		//data['loopFixY'] = 0;				//
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LG_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------背景------------------*/
	DrillUp.g_LG_layers_length = 200;
	DrillUp.g_LG_layers = [];
	for( var i = 0; i < DrillUp.g_LG_layers_length; i++ ){
		if( DrillUp.parameters['背景层-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['背景层-' + String(i+1) ]);
			DrillUp.g_LG_layers[i] = DrillUp.drill_LG_backgroundInit( temp );
		}else{
			DrillUp.g_LG_layers[i] = null;		//（强制设为空值，节约存储资源）
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
var _drill_LG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LG_pluginCommand.call(this, command, args);
	if( command === ">地图背景" ){ // >地图背景 : 背景[1] : 显示
		
		if(args.length >= 2){
			var id = -1;
			var temp1 = String(args[1]);
			if( temp1.indexOf("背景[") != -1 ){
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1);
			}
			if( temp1.indexOf("背景变量[") != -1 ){
				temp1 = temp1.replace("背景变量[","");
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
					if( type == "显示" || type == "隐藏" ){
						changing['type'] = type;
						$gameSystem._drill_LG_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 6){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "变混合模式" ){
						var num_list = this.drill_LG_getArgNumList(temp2);
						changing['type'] = type;
						changing['data1'] = num_list[0];
						$gameSystem._drill_LG_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 8){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					if( type == "变坐标" ){
						var num_list2 = this.drill_LG_getArgNumList(temp2);
						var num_list3 = this.drill_LG_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LG_dataTank_changing.push(changing);
						return;
					}
					if( type == "变透明" ){
						var num_list2 = this.drill_LG_getArgNumList(temp2);
						var num_list3 = this.drill_LG_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						$gameSystem._drill_LG_dataTank_changing.push(changing);
						return;
					}
					if( type == "变速度" ){
						var num_list2 = this.drill_LG_getArgNumList(temp2);
						var num_list3 = this.drill_LG_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LG_dataTank_changing.push(changing);
						return;
					}
				}
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">地图背景" ){ // >地图背景 : 1 : 显示
		if(args.length >= 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( /^\d+$/.test(temp1) == false ){ return; }	//（判断数字）
			var changing = {};
			changing['destroy'] = false;
			changing['time'] = 0;
			changing['id'] = temp1;
			changing['type'] = type;
			if( args[5] != undefined ){ changing['data1'] = Number(args[5]); }
			if( args[7] != undefined ){ changing['data2'] = Number(args[7]); }
			if( args[9] != undefined ){ changing['data3'] = Number(args[9]); }
			$gameSystem._drill_LG_dataTank_changing.push(changing);
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_LG_getArgNumList = function( arg_str ){
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
//DrillUp.g_LG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LG_sys_initialize.call(this);
	this.drill_LG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LG_saveEnabled == true ){	
		$gameSystem.drill_LG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LG_initSysData();
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
Game_System.prototype.drill_LG_initSysData = function() {
	this.drill_LG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LG_checkSysData = function() {
	this.drill_LG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LG_initSysData_Private = function() {
	
	this._drill_LG_dataTank_changing = [];		//插件指令变化容器
	this._drill_LG_dataTank_curData = [];		//当前地图容器（与 g_LG_layers/_drill_LG_layerTank 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_LG_layers.length; i++){
		var temp_data = DrillUp.g_LG_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['mapToAll'] == true ){		//全地图数据直接存储（每次地图刷新时，不刷新 全地图数据）
			var data = JSON.parse(JSON.stringify( temp_data ));
			this._drill_LG_dataTank_curData[i] = data;
		}
	}
	
	// > 刷新当前地图
	if( $gameMap ){
		$gameMap.drill_LG_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LG_dataTank_curData == undefined ){
		this.drill_LG_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LG_layers.length; i++ ){
		var temp_data = DrillUp.g_LG_layers[i];
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LG_dataTank_curData[i] == undefined ){
				this._drill_LG_dataTank_curData[i] = JSON.parse(JSON.stringify( temp_data ));
			
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
var _drill_LG_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LG_setup.call( this, mapId );
	this.drill_LG_initMapdata();
}
Game_Map.prototype.drill_LG_initMapdata = function() {
	
	// > 刷新当前地图容器
	for(var i = 0; i< DrillUp.g_LG_layers.length ;i++){
		var temp_data = DrillUp.g_LG_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LG_dataTank_curData[i] = null;
			continue;
		}
		
		// > 全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 单地图数据时
		}else if( temp_data['map'] == this._mapId ){
			var data = JSON.parse(JSON.stringify( temp_data ));
			$gameSystem._drill_LG_dataTank_curData[i] = data;	//（重刷数据）
			
		// > 其它情况时
		}else{
			$gameSystem._drill_LG_dataTank_curData[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}
DrillUp.g_LG_alert = true;
//==============================
// * 玩家 - 帧刷新 镜头位置
//
//			说明：	注意，玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LG_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LG_player_update.call( this, sceneActive );
	
	// （移动时，像素会提前偏移1像素，可以确定不是 this._displayX 的问题，因为 x - floor(x) 的差值小于0.0001）
	// 该问题已解决，刷新的时机早了，要等玩家updateScroll之后才刷。
	
	for(var i = 0; i< $gameSystem._drill_LG_dataTank_curData.length ;i++){
		var data = $gameSystem._drill_LG_dataTank_curData[i];
		if( data == undefined ){ continue; }
		
		// > 镜头基点（循环积累值）
		if( Imported.Drill_LayerCamera ){
			if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LG_alert == true ){ 
				alert("【Drill_LayerGround.js 地图 - 多层地图背景】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
				DrillUp.g_LG_alert = false;
				return; 
			}
			data['cameraXAcc'] = $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
			data['cameraYAcc'] = $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
			
		// > 镜头基点
		}else{
			data['cameraXAcc'] = $gameMap.displayX() * $gameMap.tileWidth();
			data['cameraYAcc'] = $gameMap.displayY() * $gameMap.tileHeight();
		}
		//data['cameraXAcc'] = ($gameMap.displayX() + data['loopFixX']) * $gameMap.tileWidth();
		//data['cameraYAcc'] = ($gameMap.displayY() + data['loopFixY']) * $gameMap.tileHeight();
	}
};
/*	（旧代码）
//==============================
// * 镜头滚动 - 向下滚动
//==============================
var _drill_LG_Map_scrollDown = Game_Map.prototype.scrollDown;
Game_Map.prototype.scrollDown = function(distance) {
    if (this.isLoopVertical() && this._displayY + distance >= $dataMap.height) {
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curData.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curData[i];
			if( data['map'] == this._mapId ){
				data['loopY'] += 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixY'] = data.loopY * $dataMap.height;
			}
		}
	}
    _drill_LG_Map_scrollDown.call(this, distance);
};
//==============================
// * 镜头滚动 - 向上滚动
//==============================
var _drill_LG_Map_scrollUp = Game_Map.prototype.scrollUp;
Game_Map.prototype.scrollUp = function(distance) {
    if (this.isLoopVertical() && this._displayY - distance <= 0 ) {
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curData.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curData[i];
			if( data['map'] == this._mapId ){
				data['loopY'] -= 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixY'] = data.loopY * $dataMap.height;
			}
		}
	}
    _drill_LG_Map_scrollUp.call(this, distance);
};
//==============================
// * 镜头滚动 - 向左滚动
//==============================
var _drill_LG_Map_scrollLeft = Game_Map.prototype.scrollLeft;
Game_Map.prototype.scrollLeft = function(distance) {
    if (this.isLoopHorizontal() && this._displayX - distance <= 0) {
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curData.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curData[i];
			if( data['map'] == this._mapId ){
				data['loopX'] -= 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixX'] = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LG_Map_scrollLeft.call(this, distance);
};
//==============================
// * 镜头滚动 - 向右滚动
//==============================
var _drill_LG_Map_scrollRight = Game_Map.prototype.scrollRight;
Game_Map.prototype.scrollRight = function(distance) {
    if (this.isLoopHorizontal() && this._displayX + distance >= $dataMap.width) {
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curData.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curData[i];
			if( data['map'] == this._mapId ){
				data['loopX'] += 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixX'] = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LG_Map_scrollRight.call(this, distance);
};
*/

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
Scene_Map.prototype.drill_LG_layerAddSprite = function (sprite, layer_index) {
    this.drill_LG_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LG_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_LG_sortByZIndex = function () {
    this.drill_LG_sortByZIndex_Private();
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
Scene_Map.prototype.drill_LG_layerCameraMoving = function( x, y, layer, option ){
    return this.drill_LG_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LG_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LG_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LG_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LG_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LG_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LG_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LG_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LG_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LG_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LG_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LG_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LG_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_LG_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
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
var _drill_LG_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LG_layer_createAllWindows2.call(this);
	this.drill_LG_create();	
};
Scene_Map.prototype.drill_LG_create = function() {
	this._drill_LG_spriteTank = [];		//（允许出现null值）
	
	var data_tank = $gameSystem._drill_LG_dataTank_curData;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		
		// > 贴图属性
		var temp_sprite = new TilingSprite();
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);		//（填满游戏窗口）
		temp_sprite.bitmap = ImageManager.load_MapLayer( temp_data['src_img'] );
		temp_sprite.origin.x = temp_data['x'];
		temp_sprite.origin.y = temp_data['y'];
		temp_sprite.opacity = temp_data['opacity'];
		temp_sprite.blendMode = temp_data['blendMode'];
		temp_sprite.layer_index = temp_data['layer_index'];
		temp_sprite.zIndex = temp_data['zIndex'];
		temp_sprite['_time'] = 0;
		
		// > 创建动态遮罩
		if( temp_data['visible'] == true ){
			this.drill_LG_createMaskSprite( temp_data, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
		// > 地图层级
		this._drill_LG_spriteTank[i] = temp_sprite;
		this.drill_LG_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
	}
	this.drill_LG_sortByZIndex();		//排序
}
//==============================
// * 地图界面 - 创建动态遮罩
//==============================
Scene_Map.prototype.drill_LG_createMaskSprite = function( temp_data, temp_sprite ){
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
var _drill_LG_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LG_scene_update.call(this);
	
	this.drill_LG_updateBase();				//基本属性（在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。）
	this.drill_LG_updateResize();			//缩放属性
	
	if( this.isActive() == true ){
		this.drill_LG_updateChange();		//变化属性（该变化必须等 isActive 激活后执行，不然在变化时，会闪……目前原因不明，但也没必要深究了）
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LG_updateBase = function() {
	var sprite_tank = this._drill_LG_spriteTank;
	var data_tank = $gameSystem._drill_LG_dataTank_curData;
	
	for(var i=0; i< sprite_tank.length; i++){
		var temp_sprite = sprite_tank[i];
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite.bitmap.isReady() ){
			
			// > 属性实时变化
			temp_sprite.visible = temp_data['visible'];
			temp_sprite.opacity = temp_data['opacity'];
			temp_sprite.blendMode = temp_data['blendMode'];
			
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
			var pos = this.drill_LG_layerCameraMoving( xx, yy, temp_data['layer_index'], temp_data );
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
			this.drill_LG_createMaskSprite( temp_data, temp_sprite );
		}
		
	}
	
};
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LG_updateChange = function() {
	var change_tank = $gameSystem._drill_LG_dataTank_changing;	//（只变数据，不变sprite）
	var data_tank = $gameSystem._drill_LG_dataTank_curData;
	
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
Scene_Map.prototype.drill_LG_updateResize = function(){
	
	// > 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera != true ){ return; }
	
	// > 值相同时，不刷新
	var layer_sprite = this._spriteset._baseSprite;
	if( this._drill_LG_LCa_rotation == layer_sprite.rotation &&
		this._drill_LG_LCa_scale_x == layer_sprite.scale.x &&
		this._drill_LG_LCa_scale_y == layer_sprite.scale.y ){
		return;
	}
	this._drill_LG_LCa_rotation = layer_sprite.rotation;
	this._drill_LG_LCa_scale_x = layer_sprite.scale.x;
	this._drill_LG_LCa_scale_y = layer_sprite.scale.y;
	
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
	for(var i=0; i < this._drill_LG_spriteTank.length; i++){
		var temp_sprite = this._drill_LG_spriteTank[i];
		var temp_data = $gameSystem._drill_LG_dataTank_curData[i];
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


