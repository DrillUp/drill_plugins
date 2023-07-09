//=============================================================================
// Drill_LayerGround.js
//=============================================================================

/*:
 * @plugindesc [v2.4]        地图 - 多层地图背景
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
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfBallistics      系统-弹道核心★★v2.2及以上★★
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
 *   (1.你可以将贴图放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 《 下层 《 图块层 《 中层 《 事件/玩家层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.处于最顶层，可以把地图界面最高层的对话框、窗口也给挡住。
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
 * 插件指令：>地图背景 : 批量背景[7,8] : 显示
 * 插件指令：>地图背景 : 批量背景变量[21,22] : 显示
 *
 * 插件指令：>地图背景 : 背景[11] : 显示
 * 插件指令：>地图背景 : 背景[11] : 隐藏
 * 插件指令：>地图背景 : 背景[11] : 暂停
 * 插件指令：>地图背景 : 背景[11] : 继续
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 混合模式[0]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 移动速度X[1.5] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 移动速度Y[1.5] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 立即还原所有单属性
 * 
 * 1.前半部分（背景变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有4*16种组合方式。
 * 2.注意，如果你想永久保持插件指令的改变结果，则需要开启 参数存储 。
 *   参数存储默认关闭，即 插件指令 的所有改变在读取存档后都会复原。
 * 3.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 4.地图背景的中心锚点在左上角，旋转效果不太好。
 * 5.由于底层变化较大，插件不再支持以前版本的旧指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>地图背景 : 背景[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图背景 : 背景[11] : 移动到-立即归位
 * 
 * 1.移动的初始位置以显示在地图界面的具体位置为基准，在基准位置上再进行移动到。
 *   指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
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
 * [v2.4]
 * 加强了插件结构，添加了修改单属性、移动到、自变化效果功能。
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
 * @desc 资源图像的色调值。
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
 * @param ---自变化效果---
 * @default 
 *
 * @param 浮动效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @option 左上右下斜向浮动
 * @value 左上右下斜向浮动
 * @option 右上左下斜向浮动
 * @value 右上左下斜向浮动
 * @desc 当前贴图，会来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 1.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 闪烁效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回闪烁。
 * @default 关闭
 * 
 * @param 闪烁速度
 * @parent 闪烁效果
 * @desc 闪烁明亮变化的速度。
 * @default 6.0
 * 
 * @param 闪烁幅度范围
 * @parent 闪烁效果
 * @type number
 * @min 1
 * @max 255
 * @desc 闪烁变化的透明度幅度范围。
 * @default 35
 *
 * @param 缩放效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右缩放
 * @value 左右缩放
 * @option 上下缩放
 * @value 上下缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 当前贴图，会来回缩放。
 * @default 关闭
 * 
 * @param 缩放速度
 * @parent 缩放效果
 * @desc 缩放大小变化的速度。
 * @default 1.0
 * 
 * @param 缩放幅度范围
 * @parent 缩放效果
 * @desc 缩放变化的比例幅度范围。
 * @default 0.2
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
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			->☆插件指令
//			->☆存储数据
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆数据容器
//				->匹配全地图数据时
//				->匹配单地图数据时
//				->不匹配时
//			->☆贴图控制
//				->控制器与镜头
//					> 图块平移
//					> 位移比
//					> 循环积累值
//				->动态遮罩
//					->创建
//					->延迟创建
//				->销毁
//			
//			->地图背景控制器【Drill_LG_Controller】
//				->A主体
//				->B基本变化
//				->C镜头参数
//				->D指令叠加变化
//				->E自变化效果
//			->地图背景贴图【Drill_LG_Sprite】
//				->A主体
//				->B基本变化
//				->C对象绑定
//				->D指令叠加变化
//				->E自变化效果
//
//
//		★家谱：
//			无
//		
//		★插件私有类：
//			* 地图背景控制器【Drill_LG_Controller】
//			* 地图背景贴图【Drill_LG_Sprite】
//		
//		★必要注意事项：
//			1. 地图界面全层级关系：
//				Spriteset： LowerLayer：	地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 鼠标目的地 < 上层 < 天气层
//							UpperLayer：	< 图片对象层 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< 对话框集合 < 滚动文本画布 < 最顶层【_drill_SenceTopArea】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//
//		★其它说明细节：
//			1.默认所有窗口都在 _windowLayer 中，通过addWindow添加。
//			  而最顶层就在 _windowLayer 的后面，作为另外一个父类层。
//			2.在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。
//			  这是 this.isActive() 控制的帧刷新过滤造成的。现在已经去掉。
//			（此active的真实意义和机制暂时未知，所以这里只能当做一个特殊情况记录下来。）
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
	DrillUp.g_LG_PluginTip_curName = "Drill_LayerGround.js 地图-多层地图背景";
	DrillUp.g_LG_PluginTip_baseList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LG_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LG_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LG_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LG_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LG_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LG_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_LG_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LG_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_LG_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆变量获取
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
		
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_img_file'] = "img/Map__layer/";
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['layerIndex'] = String( dataFrom["地图层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		
		// > B基本变化
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['speedX'] = Number( dataFrom["背景X速度"] || 0);
		data['speedY'] = Number( dataFrom["背景Y速度"] || 0);
		
		// > E自变化效果
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		
		
		// > 位移比
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		
		// > 动态遮罩
		data['dynamicMask_enabled'] = String( dataFrom["是否启用地图动态遮罩"] || "false") == "true";
		data['dynamicMask_bind'] = String( dataFrom["关联的动态遮罩板"] || "动态遮罩板A");
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LG_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------背景------------------*/
	DrillUp.g_LG_layers_length = 200;
	DrillUp.g_LG_layers = [];
	for( var i = 0; i < DrillUp.g_LG_layers_length; i++ ){
		if( DrillUp.parameters["背景层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["背景层-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["背景层-" + String(i+1) ]);
			DrillUp.g_LG_layers[i] = DrillUp.drill_LG_backgroundInit( temp );
		}else{
			DrillUp.g_LG_layers[i] = null;		//（强制设为空值，节约存储资源）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_LG_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_LG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LG_pluginCommand.call(this, command, args);
	if( command === ">地图背景" ){ // >地图背景 : 背景[1] : 显示
		
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量背景[") != -1 ){
				unit = unit.replace("批量背景[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_LG_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量背景变量[") != -1 ){
				unit = unit.replace("批量背景变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_LG_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("背景变量[") != -1 ){
				unit = unit.replace("背景变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_LG_dataTank_curController[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("背景[") != -1 ){
				unit = unit.replace("背景[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_LG_dataTank_curController[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
		}
		if( controllers == null ){ return; }
		
		/*-----------------常规指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "显示" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setVisible( true );
				}
			}
			if( type == "隐藏" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setVisible( false );
				}
			}
			if( type == "暂停" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPause( true );
				}
			}
			if( type == "继续" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPause( false );
				}
			}
		}
		
		/*-----------------D指令叠加变化------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即还原所有单属性" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_commandChange_restoreAttr();
				}
			}
			if( type == "移动到-立即归位" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_commandChange_restoreMove();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改单属性" ){
				if( temp1.indexOf("混合模式[") != -1 ){
					temp1 = temp1.replace("混合模式[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < controllers.length; k++ ){
						controllers[k]._drill_data['blendMode'] = Number(temp1);
					}
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改单属性" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				
				if( temp1.indexOf("移动速度X[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"匀速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"弹性变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_LG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"增减速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
		}
	}
	
};
//==============================
// * 插件指令 - 获取方括号中的数字
//
//			参数：	> arg_str 字符串
//			返回：	> 数字数组
//
//			说明：	> 能获取到字符串中的数字，且包含 变量 转换情况。
//==============================
Game_Interpreter.prototype.drill_LG_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr != undefined && arr.length >= 3 ){
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
	
	this._drill_LG_dataTank_curController = [];		//当前地图容器（与 g_LG_layers 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_LG_layers.length; i++){
		var temp_data = DrillUp.g_LG_layers[i];
		if( temp_data == undefined ){ continue; }
		
		// > 控制器 - 匹配全地图数据时（直接存储，每次地图刷新时，不刷新 全地图数据）
		if( temp_data['mapToAll'] == true ){
			var data = new Drill_LG_Controller( temp_data );
			this._drill_LG_dataTank_curController[i] = data;
		}
		
		// > 控制器 - 匹配单地图数据时
		//	（见 drill_LG_initMapdata ）
		
		// > 控制器 - 不匹配时
		//	（见 drill_LG_initMapdata ）
	}
	
	// > 刷新当前地图【$gameSystem优先初始化】
	if( $gameMap != undefined ){
		$gameMap.drill_LG_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LG_dataTank_curController == undefined ){
		this.drill_LG_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LG_layers.length; i++ ){
		var temp_data = DrillUp.g_LG_layers[i];
		
		
		// > 控制器 - 匹配全地图数据时
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LG_dataTank_curController[i] == undefined ){
				var temp_controller = new Drill_LG_Controller( temp_data );
				this._drill_LG_dataTank_curController[i] = temp_controller;
			
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



/*	（旧代码）
//data['loopX'] = 0;				//循环地图中，走动循环的次数
//data['loopY'] = 0;				//
//data['loopFixX'] = 0;				//循环地图中，把displayX取余的部分加回（图块单位）
//data['loopFixY'] = 0;				//
//==============================
// * 镜头滚动 - 向下滚动
//==============================
var _drill_LG_Map_scrollDown = Game_Map.prototype.scrollDown;
Game_Map.prototype.scrollDown = function(distance) {
    if (this.isLoopVertical() && this._displayY + distance >= $dataMap.height) {
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curController.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curController[i];
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
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curController.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curController[i];
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
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curController.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curController[i];
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
		for(var i =0; i<$gameSystem._drill_LG_dataTank_curController.length; i++){
			var data = $gameSystem._drill_LG_dataTank_curController[i];
			if( data['map'] == this._mapId ){
				data['loopX'] += 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixX'] = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LG_Map_scrollRight.call(this, distance);
};
*/




//=============================================================================
// ** ☆数据容器
//
//			说明：	> 此模块管理 当前地图中的控制器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 数据容器 - 初始化绑定
//==============================
var _drill_LG_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LG_setup.call( this, mapId );
	this.drill_LG_initMapdata();
}
//==============================
// * 数据容器 - 初始化
//==============================
Game_Map.prototype.drill_LG_initMapdata = function() {
	
	// > 刷新当前地图 控制器
	for(var i = 0; i< DrillUp.g_LG_layers.length ;i++){
		var temp_data = DrillUp.g_LG_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LG_dataTank_curController[i] = null;
			continue;
		}
		
		// > 控制器 - 匹配全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 控制器 - 匹配单地图数据时
		}else if( temp_data['map'] == this._mapId ){
			var temp_controller = new Drill_LG_Controller( temp_data );
			$gameSystem._drill_LG_dataTank_curController[i] = temp_controller;	//（重刷数据）
			
		// > 控制器 - 不匹配时
		}else{
			$gameSystem._drill_LG_dataTank_curController[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}
/*
//==============================
// * 数据容器 - 帧刷新绑定
//
//			说明：	> 玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LG_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LG_player_update.call( this, sceneActive );
	this.drill_LG_updateController();			//帧刷新 - 控制器
}
//==============================
// * 数据容器 - 帧刷新 控制器
//==============================
Game_Player.prototype.drill_LG_updateController = function() {
	for(var i = 0; i < $gameSystem._drill_LG_dataTank_curController.length; i++){
		var temp_controller = $gameSystem._drill_LG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器 - 帧刷新
		//temp_controller.drill_controller_update();
	}
};*/


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 容器初始化
//==============================
var _drill_LG_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_LG_temp_initialize2.call(this);
	this._drill_LG_spriteTank = [];				//贴图容器
};
//==============================
// * 贴图控制 - 销毁时（地图界面）
//==============================
var _drill_LG_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_LG_smap_terminate.call(this);
	$gameTemp._drill_LG_spriteTank = [];		//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新（地图界面）
//==============================
var _drill_LG_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_LG_smap_update.call(this);
	this.drill_LG_updateResizeRect();			//帧刷新 - 外包裹矩形
	this.drill_LG_updateControllerCamera();		//帧刷新 - 控制器与镜头
	this.drill_LG_updateMask();					//帧刷新 - 动态遮罩
	this.drill_LG_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 贴图控制 - 创建时（地图界面）
//==============================
var _drill_LG_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LG_smap_createAllWindows.call(this);
	this.drill_LG_create();						//创建
};
//==============================
// * 贴图控制 - 创建 
//==============================
Scene_Map.prototype.drill_LG_create = function() {
	$gameTemp._drill_LG_spriteTank = [];			//贴图容器（不允许出现null值）
	
	for(var i=0; i< $gameSystem._drill_LG_dataTank_curController.length; i++){
		var temp_controller = $gameSystem._drill_LG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		var data = temp_controller._drill_data;
		
		
		// > 创建贴图
		var temp_sprite = new Drill_LG_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级
		$gameTemp._drill_LG_spriteTank.push( temp_sprite );
		this.drill_LG_layerAddSprite( temp_sprite, data['layerIndex'] );
		
		// > 创建动态遮罩
		if( data['visible'] == true ){
			this.drill_LG_createMaskSprite( temp_controller, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
	}
	
	// > 层级排序
	this.drill_LG_sortByZIndex();
}
//==============================
// * 贴图控制 - 帧刷新 外包裹矩形
//==============================
Scene_Map.prototype.drill_LG_updateResizeRect = function(){
	
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
	if( isNaN(ww) ){ return; }
	if( isNaN(hh) ){ return; }
	var ox = (Graphics.boxWidth - ww)*0.5;
	var oy = (Graphics.boxHeight - hh)*0.5;
	
	// > 背景伸缩
	for(var i=0; i < $gameTemp._drill_LG_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LG_spriteTank[i];
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		var layer = temp_controller._drill_data['layerIndex'];
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			temp_sprite._drill_layerSprite.move( ox, oy, ww, hh );
			temp_controller._drill_cameraExtraX = ox;
			temp_controller._drill_cameraExtraY = oy;
		}
	}
}
//==============================
// * 贴图控制 - 帧刷新 控制器与镜头
//==============================
Scene_Map.prototype.drill_LG_updateControllerCamera = function() {
	for(var i = 0; i < $gameSystem._drill_LG_dataTank_curController.length; i++ ){
		var temp_controller = $gameSystem._drill_LG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器 - 帧刷新
		temp_controller.drill_controller_update();
		
		
		// > 镜头位移结果（地图参照）
		var s_data = temp_controller._drill_data;
		var xx = 0;
		var yy = 0;
		var cameraXAcc = temp_controller.drill_controller_getCameraXAcc();
		var cameraYAcc = temp_controller.drill_controller_getCameraYAcc();
		
		// > 镜头位移结果 - 图块平移
		xx += s_data['tile_x'] * $gameMap.tileWidth();
		yy += s_data['tile_y'] * $gameMap.tileHeight();
		
		// > 镜头位移结果 - 贴图归位（背景不需要归位）
		//xx -= cameraXAcc;
		//yy -= cameraYAcc;
		
		// > 镜头位移结果 - 外包裹矩形
		xx += temp_controller._drill_cameraExtraX;
		yy += temp_controller._drill_cameraExtraY;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var option = {
			"XPer": s_data['XPer'],
			"YPer": s_data['YPer'],
			"tile_x": s_data['tile_x'],
			"tile_y": s_data['tile_y'],
			"cameraXAcc": cameraXAcc,
			"cameraYAcc": cameraYAcc,
		};
		var pos = this.drill_LG_layerCameraMoving(xx, yy, s_data['layerIndex'], option );
		xx = pos['x'];
		yy = pos['y'];
		
		// > 镜头位移结果 - 镜头缩放与位移（此处是场景装饰，不需要考虑缩放）
		//	（无）
		
		// > 镜头位移结果 - 赋值
		//		（控制器位移与镜头位移 独立，这样在控制器暂停时，贴图也仍然能兼容镜头移动）
		temp_controller._drill_cameraResultSpriteX = xx;
		temp_controller._drill_cameraResultSpriteY = yy;
	}
}
//==============================
// * 贴图控制 - 动态遮罩 创建
//==============================
Scene_Map.prototype.drill_LG_createMaskSprite = function( temp_controller, temp_sprite ){
	var data = temp_controller._drill_data;
	if( data['dynamicMask_enabled'] != true ){ return; }
	
	if( Imported.Drill_LayerDynamicMaskA && data['dynamicMask_bind'] == "动态遮罩板A" ){
		var temp_mask = this.drill_LDMA_getMaskSprite();
		temp_sprite.mask = temp_mask;
		this._drill_SenceTopArea.addChild(temp_mask);
	}
	if( Imported.Drill_LayerDynamicMaskB && data['dynamicMask_bind'] == "动态遮罩板B" ){
		var temp_mask = this.drill_LDMB_getMaskSprite();
		temp_sprite.mask = temp_mask;
		this._drill_SenceTopArea.addChild(temp_mask);
	}
}
//==============================
// * 贴图控制 - 动态遮罩 帧刷新
//==============================
Scene_Map.prototype.drill_LG_updateMask = function() {
	for(var i=0; i < $gameTemp._drill_LG_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LG_spriteTank[i];
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_controller._drill_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LG_createMaskSprite( temp_controller, temp_sprite );
		}
	}
}
//==============================
// * 贴图控制 - 帧刷新 销毁
//==============================
Scene_Map.prototype.drill_LG_updateDestroy = function() {
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_LG_dataTank_curController.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_LG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_LG_dataTank_curController.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_LG_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_LG_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_LG_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_LG_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};



//=============================================================================
// ** 地图背景控制器【Drill_LG_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制地图背景的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **						->3d效果
// **					->B基本变化
// **					->C镜头参数
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（中心锚点为左上角）
// **						> 主体贴图>缩放X
// **						> 主体贴图>缩放Y
// **						> 主体贴图>斜切X（中心锚点为左上角）
// **						> 主体贴图>斜切Y（中心锚点为左上角）
// **					->E自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_LG_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_LG_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_LG_Controller.prototype.initialize = function( data ){
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
Drill_LG_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();					//帧刷新 - A主体
	this.drill_controller_updateChange_Position();		//帧刷新 - B基本变化 - 平移
														//帧刷新 - C镜头参数（无）
	this.drill_controller_updateCommandChange();		//帧刷新 - D指令叠加变化
	this.drill_controller_updateEffect();				//帧刷新 - E自变化效果
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
Drill_LG_Controller.prototype.drill_controller_resetData = function( data ){
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
Drill_LG_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_LG_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LG_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LG_Controller.prototype.drill_controller_isDead = function(){
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
Drill_LG_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };									//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };										//控制器 - 暂停情况
	
	// > 贴图
	if( data['src_img'] == undefined ){ data['src_img'] = "" };										//贴图 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Map__layer/" };			//贴图 - 文件夹
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//贴图 - 混合模式
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//贴图 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//贴图 - 图像-模糊边缘
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "上层" };							//贴图 - 地图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };													//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//A主体 - 平移Y
	
	// > B基本变化
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };									//B基本变化 - 透明度
	if( data['speedX'] == undefined ){ data['speedX'] = 0 };										//B基本变化 - 背景X速度
	if( data['speedY'] == undefined ){ data['speedY'] = 0 };										//B基本变化 - 背景Y速度
	
	// > C镜头参数（无）
	
	// > D指令叠加变化（无）
	
	// > E自变化效果
	//	（见 变量获取）
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_LG_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initChange();			//初始化子功能 - B基本变化
	this.drill_controller_initCamera();			//初始化子功能 - C镜头参数
	this.drill_controller_initCommandChange();	//初始化子功能 - D指令叠加变化
	this.drill_controller_initEffect();			//初始化子功能 - E自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_LG_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
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
Drill_LG_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_LG_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_LG_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_LG_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_LG_checkNaN = false;
			alert( DrillUp.drill_LG_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_LG_checkNaN = false;
			alert( DrillUp.drill_LG_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_LG_checkNaN = false;
			alert( DrillUp.drill_LG_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_LG_checkNaN = false;
			alert( DrillUp.drill_LG_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_LG_checkNaN = false;
			alert( DrillUp.drill_LG_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}

//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_LG_Controller.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_selfXAcc = 0;					//（自累积位移）
	this._drill_selfYAcc = 0;					//
	this._drill_selfXSpeed = data['speedX'];	//（自累积移动速度）
	this._drill_selfYSpeed = data['speedY'];	//
	
	// > 贴图 - 透明度
	this._drill_opacity = data['opacity'];
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_skewX = 0;
	this._drill_skewY = 0;
	
	// > 贴图 - 旋转
	this._drill_rotation = 0;
}
//==============================
// * B基本变化 - 帧刷新 位置
//==============================
Drill_LG_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 贴图 - 位置
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	
	// > 自累积位移
	this._drill_selfXAcc += this._drill_selfXSpeed;
	this._drill_selfYAcc += this._drill_selfYSpeed;
	xx += this._drill_selfXAcc;
	yy += this._drill_selfYAcc;
	
	this._drill_x = xx;
	this._drill_y = yy;
}


//==============================
// * C镜头参数 - 初始化子功能
//==============================
Drill_LG_Controller.prototype.drill_controller_initCamera = function() {
	var data = this._drill_data;
	
	//this._drill_cameraXAcc = 0;			//循环积累值（不存）
	//this._drill_cameraYAcc = 0;
	this._drill_cameraExtraX = 0;			//外包裹矩形 值
	this._drill_cameraExtraY = 0;			//
	
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
}
// > 强制更新提示 锁
DrillUp.g_LG_alert = true;
//==============================
// * C镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LG_Controller.prototype.drill_controller_getCameraXAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//【$gameSystem优先初始化】（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LG_alert == true ){ 
			alert( DrillUp.drill_LG_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LG_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
	}else{
		return $gameMap.displayX() * $gameMap.tileWidth();
	}
}
//==============================
// * C镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LG_Controller.prototype.drill_controller_getCameraYAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//【$gameSystem优先初始化】（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LG_alert == true ){ 
			alert( DrillUp.drill_LG_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LG_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
	}else{
		return $gameMap.displayY() * $gameMap.tileHeight();
	}
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A变化叠加器 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_LG_Controller.prototype.drill_controller_initCommandChange = function() {
	var data = this._drill_data;
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = null;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = null;
	
	// > 控制器参数 - 移动速度X
	this["_drill_command_speedX_data"] = null;
	// > 控制器参数 - 移动速度Y
	this["_drill_command_speedY_data"] = null;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = null;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = null;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = null;
	
	// > 控制器参数 - 斜切X
	this["_drill_command_skewX_data"] = null;
	// > 控制器参数 - 斜切Y
	this["_drill_command_skewY_data"] = null;
}
//==============================
// * D指令叠加变化 - 帧刷新
//==============================
Drill_LG_Controller.prototype.drill_controller_updateCommandChange = function(){
	var data = this._drill_data;
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 移动速度X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_speedX_data" );
	// > 帧刷新 - 移动速度Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_speedY_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	
	// > 帧刷新 - 缩放X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleX_data" );
	// > 帧刷新 - 缩放Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleY_data" );
	
	// > 帧刷新 - 斜切X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_skewX_data" );
	// > 帧刷新 - 斜切Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_skewY_data" );
}
//==============================
// * D指令叠加变化 - 立即还原所有单属性
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = null;
	
	// > 控制器参数 - 移动速度X
	this["_drill_command_speedX_data"] = null;
	// > 控制器参数 - 移动速度Y
	this["_drill_command_speedY_data"] = null;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = null;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = null;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = null;
	
	// > 控制器参数 - 斜切X
	this["_drill_command_skewX_data"] = null;
	// > 控制器参数 - 斜切Y
	this["_drill_command_skewY_data"] = null;
}
//==============================
// * D指令叠加变化 - 立即归位
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = null;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", 0, 0,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度X
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setSpeedX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedX_data", data['speedX'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度Y
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setSpeedY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedY_data", data['speedY'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_LG_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_LG_Controller.prototype.drill_controller_initEffect = function() {
	var data = this._drill_data;
	this._drill_curEffectTime = 0;
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_LG_Controller.prototype.drill_controller_updateEffect = function(){
	var data = this._drill_data;
	this._drill_curEffectTime += 1;
}



//=============================================================================
// ** 地图背景贴图【Drill_LG_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	> 定义一个背景贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B基本变化
// **						->层级位置修正
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（中心锚点为左上角）
// **						> 主体贴图>缩放X
// **						> 主体贴图>缩放Y
// **						> 主体贴图>斜切X（中心锚点为左上角）
// **						> 主体贴图>斜切Y（中心锚点为左上角）
// **					->E自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 贴图控制 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 背景贴图 - 定义
//==============================
function Drill_LG_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_LG_Sprite.prototype = Object.create(Sprite.prototype);
Drill_LG_Sprite.prototype.constructor = Drill_LG_Sprite;
//==============================
// * 背景贴图 - 初始化
//==============================
Drill_LG_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 背景贴图 - 帧刷新
//==============================
Drill_LG_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B基本变化
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateCommandChange();		//帧刷新 - D指令叠加变化
	this.drill_sprite_updateEffect();				//帧刷新 - E自变化效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_LG_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_LG_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B基本变化
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_sprite_initEffect();				//初始化子功能 - E自变化效果
};

//##############################
// * 背景贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_LG_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 背景贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_LG_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 背景贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_LG_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 背景贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_LG_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 背景贴图 - 贴图初始化（私有）
//==============================
Drill_LG_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 背景贴图 - 销毁子功能（私有）
//==============================
Drill_LG_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childCircleSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childCircleSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B基本变化
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 背景贴图 - 销毁自身（私有）
//==============================
Drill_LG_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LG_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.x = 0;
	this.y = 0;
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	// > 平铺贴图
	var temp_layer = new TilingSprite();
	temp_layer.move(0, 0, Graphics.width, Graphics.height);		//（填满游戏窗口）
	temp_layer.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], data['tint'], data['smooth'] );
	temp_layer.origin.x = data['x'];
	temp_layer.origin.y = data['y'];
	this._drill_layerSprite = temp_layer;
	
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_LG_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 贴图属性
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.skew.x = this._drill_controller._drill_skewX;
	this.skew.y = this._drill_controller._drill_skewY;
	this.opacity = this._drill_controller._drill_opacity;
	this.visible = data['visible'];
	
	//（背景旋转的中心锚点在左上角）
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;
}


//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_LG_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B基本变化 - 帧刷新
//==============================
Drill_LG_Sprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置 - 层级位置修正
	//		（镜头位移结果，见函数 drill_LG_updateControllerCamera ）
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	xx += this._drill_controller._drill_cameraResultSpriteX;
	yy += this._drill_controller._drill_cameraResultSpriteY;
	this._drill_layerSprite.origin.x = xx;
	this._drill_layerSprite.origin.y = yy;
	
	// > 透明度（无）
	
	// > 缩放（无）
	
	// > 旋转（无）
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A变化叠加器 贴图部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_LG_Sprite.prototype.drill_sprite_initCommandChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = null;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = null;
	
	// > 贴图参数 - 移动速度X
	this["_drill_command_speedX_spriteData"] = null;
	// > 贴图参数 - 移动速度Y
	this["_drill_command_speedY_spriteData"] = null;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = null;
	
	// > 贴图参数 - 缩放X
	this["_drill_command_scaleX_spriteData"] = null;
	// > 贴图参数 - 缩放Y
	this["_drill_command_scaleY_spriteData"] = null;
	
	// > 贴图参数 - 斜切X
	this["_drill_command_skewX_spriteData"] = null;
	// > 贴图参数 - 斜切Y
	this["_drill_command_skewY_spriteData"] = null;
}
//==============================
// * D指令叠加变化 - 帧刷新
//==============================
Drill_LG_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller._drill_data;
	var controller = this._drill_controller;
	
	// > 移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动到 - 贴图赋值
	if( controller[CDataName] != undefined ){
		this._drill_layerSprite.origin.x += controller[CDataName]['cur_valueA'];
		this._drill_layerSprite.origin.y += controller[CDataName]['cur_valueB'];
	}
	
	
	// > 透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 透明度 - 贴图赋值（覆盖）
	if( controller[CDataName] != undefined ){
		this.opacity = controller[CDataName]['cur_value'];
	}
	
	
	// > 移动速度X - 帧刷新
	var CDataName = "_drill_command_speedX_data";
	var SDataName = "_drill_command_speedX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_selfXSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_selfXSpeed = data['speedX'];	//（没有数据时，赋值为 初始值）
	}
	
	// > 移动速度Y - 帧刷新
	var CDataName = "_drill_command_speedY_data";
	var SDataName = "_drill_command_speedY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_selfYSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_selfYSpeed = data['speedY'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值
	if( controller[CDataName] != undefined ){
		controller._drill_rotation = controller[CDataName]['cur_value'];	//（整体再旋转角度）
	}else{
		controller._drill_rotation = 0;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放X - 帧刷新
	var CDataName = "_drill_command_scaleX_data";
	var SDataName = "_drill_command_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_scaleX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_scaleX = 1;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放Y - 帧刷新
	var CDataName = "_drill_command_scaleY_data";
	var SDataName = "_drill_command_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_scaleY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_scaleY = 1;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切X - 帧刷新
	var CDataName = "_drill_command_skewX_data";
	var SDataName = "_drill_command_skewX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_skewX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_skewX = 0;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切Y - 帧刷新
	var CDataName = "_drill_command_skewY_data";
	var SDataName = "_drill_command_skewY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_skewY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_skewY = 0;	//（没有数据时，赋值为 初始值）
	}
}


//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_LG_Sprite.prototype.drill_sprite_initEffect = function() {
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_LG_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller._drill_data;
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x += value;
		this._drill_layerSprite.origin.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x -= value;
		this._drill_layerSprite.origin.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.x += value;
		this.scale.y += value;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerGround = false;
		var pluginTip = DrillUp.drill_LG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


