//=============================================================================
// Drill_LayerParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        地图 - 多层地图粒子
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
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfParticle        系统-粒子核心
 *   - Drill_CoreOfBallistics      数学模型-弹道核心★★v2.2及以上★★
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     地图粒子可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图层级。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 3.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-地图界面）.docx"。
 * 4.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
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
 *      地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 上层
 *      < 图片对象层 < 图片层 < 对话框集合 < 最顶层
 *   (3.处于最顶层，可以把地图界面的对话框、窗口也给挡住。
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
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.你可以通过插件指令手动修改透明度，来设计某些区域的实时粒子效果，
 *      比如进入浴室后，显现热气的泡泡；进入草丛，显现萤火虫光粒。
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
 * ----可选设定 - 修改单属性
 * 你可以通过插件指令手动修改各个属性：
 * 
 * 插件指令：>地图粒子 : 粒子[2] : 显示
 * 插件指令：>地图粒子 : 粒子变量[21] : 显示
 * 插件指令：>地图粒子 : 批量粒子[7,8] : 显示
 * 插件指令：>地图粒子 : 批量粒子变量[21,22] : 显示
 *
 * 插件指令：>地图粒子 : 粒子[2] : 显示
 * 插件指令：>地图粒子 : 粒子[2] : 隐藏
 * 插件指令：>地图粒子 : 粒子[2] : 暂停
 * 插件指令：>地图粒子 : 粒子[2] : 继续
 * 插件指令：>地图粒子 : 粒子[2] : 切换混合模式[0]
 * 插件指令：>地图粒子 : 粒子[2] : 切换地图层级[下层]
 * 插件指令：>地图粒子 : 粒子[2] : 切换图片层级[10]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 缩放X变量%[21] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 修改单属性 : 缩放Y变量%[21] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[2] : 立即还原所有单属性
 * 
 * 1.前半部分（粒子变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有4*16种组合方式。
 * 2.注意，如果你想永久保持插件指令的改变结果，则需要开启 参数存储 。
 *   参数存储默认关闭，即 插件指令 的所有改变在读取存档后都会复原。
 * 3.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 4.粒子修改"旋转"时，表示每个粒子都在自旋转的基础上，再旋转一定角度。
 *   粒子修改"缩放"时，表示每个粒子都在配置的缩放的基础上，再缩放额外比例。
 * 5.注意，修改属性不会对 第二层粒子 生效。
 * 6.由于底层变化较大，插件不再支持以前版本的旧指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到-立即归位
 * 
 * 1.前半部分（粒子[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.移动的初始位置以显示在地图界面的具体位置为基准，在基准位置上再进行移动到。
 *   指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取属性
 * 你可以通过插件指令来获取 地图粒子 的属性值：
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>地图粒子 : 粒子变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 缩放X : 变量%[21]
 * 插件指令：>地图粒子 : 粒子[11] : 获取属性 : 缩放Y : 变量%[21]
 * 
 * 1.前半部分（粒子[11]）和 后半部分（获取属性 : 位置X : 变量[21]）
 *   的参数可以随意组合。一共有2*6种组合方式。
 * 2."变量%["表示该变量获取到属性时，会乘以100倍。因为变量只能存整数。
 *   比如缩放值为1.2时，则获取到： 1.2 * 100 = 120。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 上述的插件指令中，部分插件指令可以延迟执行：
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 批量粒子[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 批量粒子变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 缩放X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 修改单属性(延迟) : 缩放Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（粒子[11]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*14种组合方式。
 * 2.设置延迟指令后，指令会被暂存到延迟队列中，等待延迟时间结束之后，执行指令。
 *   "立即取消全部延迟指令"可以清空排在队列中的所有延迟指令。
 * 3.此功能可以简化 并行事件 的设计，你可以在串行事件中执行延迟，延迟后并行变化贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 上述的插件指令中，移动到的插件指令也可以延迟执行：
 * 
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图粒子 : 粒子[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（粒子[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*7种组合方式。
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
 *   粒子多出来的消耗。
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
 * [v1.4]
 * 结合粒子核心，加强了粒子相关功能。
 * [v1.5]
 * 加强了插件结构，添加了修改单属性、移动到功能。
 * [v1.6]
 * 添加了延迟指令功能。
 * [v1.7]
 * 添加了粒子 彩虹化 功能。
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
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-2
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-3
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-4
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-5
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-6
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-7
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-8
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-9
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-10
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-11
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-12
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-13
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-14
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-15
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-16
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-17
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-18
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-19
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-20
 * @parent ---粒子层组 1至20---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组21至40---
 * @default
 *
 * @param 粒子层-21
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-22
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-23
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-24
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-25
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-26
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-27
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-28
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-29
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-30
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-31
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-32
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-33
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-34
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-35
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-36
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-37
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-38
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-39
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-40
 * @parent ---粒子层组21至40---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组41至60---
 * @default
 *
 * @param 粒子层-41
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-42
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-43
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-44
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-45
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-46
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-47
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-48
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-49
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-50
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-51
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-52
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-53
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-54
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-55
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-56
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-57
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-58
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-59
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-60
 * @parent ---粒子层组41至60---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组61至80---
 * @default
 *
 * @param 粒子层-61
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-62
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-63
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-64
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-65
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-66
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-67
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-68
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-69
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-70
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-71
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-72
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-73
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-74
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-75
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-76
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-77
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-78
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-79
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-80
 * @parent ---粒子层组61至80---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组81至100---
 * @default
 *
 * @param 粒子层-81
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-82
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-83
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-84
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-85
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-86
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-87
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-88
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-89
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-90
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-91
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-92
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-93
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-94
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-95
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-96
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-97
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-98
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-99
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-100
 * @parent ---粒子层组81至100---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组101至120---
 * @default
 *
 * @param 粒子层-101
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-102
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-103
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-104
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-105
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-106
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-107
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-108
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-109
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-110
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-111
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-112
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-113
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-114
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-115
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-116
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-117
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-118
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-119
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-120
 * @parent ---粒子层组101至120---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组121至140---
 * @default
 *
 * @param 粒子层-121
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-122
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-123
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-124
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-125
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-126
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-127
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-128
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-129
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-130
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-131
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-132
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-133
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-134
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-135
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-136
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-137
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-138
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-139
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-140
 * @parent ---粒子层组121至140---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组141至160---
 * @default
 *
 * @param 粒子层-141
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-142
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-143
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-144
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-145
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-146
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-147
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-148
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-149
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-150
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-151
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-152
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-153
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-154
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-155
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-156
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-157
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-158
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-159
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-160
 * @parent ---粒子层组141至160---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组161至180---
 * @default
 *
 * @param 粒子层-161
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-162
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-163
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-164
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-165
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-166
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-167
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-168
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-169
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-170
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-171
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-172
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-173
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-174
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-175
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-176
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-177
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-178
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-179
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-180
 * @parent ---粒子层组161至180---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子层组181至200---
 * @default
 *
 * @param 粒子层-181
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-182
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-183
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-184
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-185
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-186
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-187
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-188
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-189
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-190
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-191
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-192
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-193
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-194
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-195
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-196
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-197
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-198
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-199
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子层-200
 * @parent ---粒子层组181至200---
 * @type struct<LPaMapParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 */
/*~struct~LPaMapParticle:
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
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
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
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
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
 * @default 96
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
 * @default 固定角度
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
 * @default (需配置)地图临时粒子小爆炸直线拖尾贴图
 * @require 1
 * @dir img/Map__layer/
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
//		★性能测试消耗	15.32ms（drill_LPa_resetParticles）
//		★最坏情况		大量粒子+动态遮罩被使用。
//		★备注			在垃圾笔记本上测试，只有4帧，可能是因为动态遮罩的缘故。
//						（在高配笔记本上，也会突然从60帧降到30帧）
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			->☆存储数据
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆数据容器
//				->全地图数据时
//				->单地图数据时
//				->非当前地图数据时
//			->☆控制器与贴图
//				->界面创建
//				->控制器与镜头
//					> 图块平移
//					> 位移比
//					> 循环积累值
//					->控制器帧刷新
//				->基础特性
//				->动态遮罩
//					->创建
//					->延迟创建
//				->销毁
//			
//			->粒子控制器【Drill_LPa_Controller】
//				->贴图长宽赋值
//				->2A镜头参数
//					->位移比
//				->2B指令叠加变化
//				->2C延迟指令
//			->粒子贴图【Drill_LPa_Sprite】
//				->2B指令叠加变化-控制器用
//				->2C延迟指令
//			->粒子贴图（第二层）【Drill_LPa_SecSprite】
//			
//			
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//			17.主菜单 > 多层组合装饰（界面装饰-地图界面）（脚本）.docx
//		
//		★插件私有类：
//			* 粒子控制器【Drill_LPa_Controller】
//			* 粒子贴图【Drill_LPa_Sprite】
//			* 粒子贴图（第二层）【Drill_LPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.插件的地图层级/图片层级与多个插件共享。【必须自写 层级排序 标准函数】
//			3.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			4.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//
//		★其它说明细节：
//			1.粒子分成粒子层，位移比变化时，影响到 粒子层 下面的 每个粒子。
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
	DrillUp.g_LPa_PluginTip_curName = "Drill_LayerParticle.js 地图-多层地图粒子";
	DrillUp.g_LPa_PluginTip_baseList = [
		"Drill_CoreOfParticle.js 系统-粒子核心",
		"Drill_CoreOfBallistics.js 数学模型-弹道核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_LPa_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_LPa_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LPa_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_LPa_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LPa_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_LPa_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_LPa_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_LPa_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerParticle');

	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~LPaMapParticle）
	//==============================
	DrillUp.drill_LPa_initParticle = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Map__layer/";
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		data['x'] = 0;		//（控制器位置与镜头位置吻合）
		data['y'] = 0;
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["地图层级"] || "上层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		//		（详细需要参考 drill_controller_initData，以及粒子核心的样式数据）
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		data['par_birthMode'] = String( dataFrom["粒子出现模式"] || "随机出现");
		data['par_birthX'] = Number( dataFrom["粒子固定点 X"] || 0);
		data['par_birthY'] = Number( dataFrom["粒子固定点 Y"] || 0);
		data['par_birthRange'] = Number( dataFrom["粒子固定点范围"] || 96);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_layerIndex'] = String( dataFrom["第二层粒子地图层级"] || "上层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Map__layer/";
		
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
	DrillUp.g_LPa_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------粒子------------------*/
	DrillUp.g_LPa_layers_length = 200;
	DrillUp.g_LPa_layers = [];
	for( var i = 0; i < DrillUp.g_LPa_layers_length; i++ ){
		if( DrillUp.parameters["粒子层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子层-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["粒子层-" + String(i+1) ]);
			DrillUp.g_LPa_layers[i] = DrillUp.drill_LPa_initParticle( temp );
		}else{
			DrillUp.g_LPa_layers[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle &&
	Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_LPa_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LPa_pluginCommand.call(this, command, args);
	this.drill_LPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LPa_pluginCommand = function( command, args ){
	if( command === ">地图粒子" ){ // >地图粒子 : 粒子[1] : 显示
		
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量粒子[") != -1 ){
				unit = unit.replace("批量粒子[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_LPa_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量粒子变量[") != -1 ){
				unit = unit.replace("批量粒子变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_LPa_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("粒子变量[") != -1 ){
				unit = unit.replace("粒子变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_LPa_dataTank_curController[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("粒子[") != -1 ){
				unit = unit.replace("粒子[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_LPa_dataTank_curController[ controller_id -1 ];
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
			if( type.indexOf("切换混合模式[") != -1 ){
				type = type.replace("切换混合模式[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setBlendMode( Number(type) );
				}
			}
			if( type.indexOf("切换地图层级[") != -1 ){
				type = type.replace("切换地图层级[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setLayerIndex( String(type) );
				}
			}
			if( type.indexOf("切换图片层级[") != -1 ){
				type = type.replace("切换图片层级[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setZIndex( Number(type) );
				}
			}
		}
		
		/*-----------------获取属性------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "获取属性" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("变量%[","");
				temp2 = temp2.replace("]","");
				if( temp1 == "位置X" ){
					//$gameVariables.setValue( Number(temp2), controllers[0]._drill_x );
				}
				if( temp1 == "位置Y" ){
					//$gameVariables.setValue( Number(temp2), controllers[0]._drill_y );
				}
				if( temp1 == "透明度" ){
					//$gameVariables.setValue( Number(temp2), controllers[0]._drill_opacity );
				}
				if( temp1 == "旋转" ){
					//$gameVariables.setValue( Number(temp2), controllers[0]._drill_rotationChange );
				}
				if( temp1 == "缩放X" ){
					//$gameVariables.setValue( Number(temp2), controllers[0]._drill_scaleX *100 );
				}
				if( temp1 == "缩放Y" ){
					//$gameVariables.setValue( Number(temp2), controllers[0]._drill_scaleY *100 );
				}
			}
		}
		
		/*-----------------2B指令叠加变化------------------*/
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
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改单属性" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
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
					var num_list = this.drill_LPa_getArgNumList(temp1);
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
					var num_list = this.drill_LPa_getArgNumList(temp1);
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
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"增减速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
		}
		
		/*-----------------2C延迟指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即取消全部延迟指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_clearDelayingCommand();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var delay_time = String(args[5]);
			if( type == "显示(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setVisible", [true], delay_time
					);
				}
			}
			if( type == "隐藏(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setVisible", [false], delay_time
					);
				}
			}
			if( type == "暂停(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setPause", [true], delay_time
					);
				}
			}
			if( type == "继续(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setPause", [false], delay_time
					);
				}
			}
			if( type == "还原所有单属性(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_commandChange_restoreAttr", [], delay_time
					);
				}
			}
			if( type == "移动到(延迟)-延迟归位" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_commandChange_restoreMove", [], delay_time
					);
				}
			}
		}
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var delay_time = String(args[9]);
			if( type == "修改单属性(延迟)" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "匀速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "弹性变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_LPa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
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
Game_Interpreter.prototype.drill_LPa_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr != undefined && arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量%") ){	//（将变量值赋值给目标，需要*0.01）
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i]))*0.01 ); }
			return result_list;
		}else if( data_name.contains("变量") ){
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


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_LPa_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_LPa_preload_initialize.call(this);
	this.drill_LPa_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_LPa_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_LPa_preloadInit = function(){
	this._drill_LPa_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_LPa_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_LPa_layers.length; i++ ){
		var temp_data = DrillUp.g_LPa_layers[i];
		if( temp_data == undefined ){ continue; }			//『控制器与贴图的样式』 - 校验+直接跳出（预加载）
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_LPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], 0, true, this._drill_LPa_cacheId ) 
		);
		this._drill_LPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['second_src_img'], 0, true, this._drill_LPa_cacheId ) 
		);
		this._drill_LPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['trailing_src_img_file'], temp_data['trailing_src_img'], 0, true, this._drill_LPa_cacheId ) 
		);
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
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
Game_System.prototype.initialize = function(){
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
Game_System.prototype.drill_LPa_initSysData = function(){
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
Game_System.prototype.drill_LPa_checkSysData = function(){
	this.drill_LPa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LPa_initSysData_Private = function(){
	
	this._drill_LPa_dataTank_curController = [];	//当前地图容器（与 g_LPa_layers 依次对应，容器允许出现null值）
	for( var i = 0; i < DrillUp.g_LPa_layers.length; i++){
		var temp_data = DrillUp.g_LPa_layers[i];
		if( temp_data == undefined ){ continue; }	//『控制器与贴图的样式』 - 校验+直接跳出
		
		// > 控制器 - 匹配全地图数据时（直接存储，每次地图刷新时，不刷新 全地图数据）
		if( temp_data['mapToAll'] == true ){
			var temp_controller = new Drill_LPa_Controller( temp_data );	//『控制器与贴图的样式』 - 创建控制器
			this._drill_LPa_dataTank_curController[i] = temp_controller;
		}
		
		// > 控制器 - 匹配单地图数据时
		//	（见 drill_LPa_initMapdata ）
		
		// > 控制器 - 不匹配时
		//	（见 drill_LPa_initMapdata ）
	}
	
	// > 刷新当前地图『$gameSystem优先初始化』
	if( $gameMap != undefined ){
		$gameMap.drill_LPa_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LPa_checkSysData_Private = function(){
	
	// > 旧存档数据自动补充
	if( this._drill_LPa_dataTank_curController == undefined ){
		this.drill_LPa_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_LPa_layers.length; i++ ){
		var temp_data = DrillUp.g_LPa_layers[i];	//『控制器与贴图的样式』 - 校验+直接跳出（存储数据检查）
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LPa_dataTank_curController[i] == undefined ){
				var temp_controller = new Drill_LPa_Controller( temp_data );
				this._drill_LPa_dataTank_curController[i] = temp_controller;
			
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
	this.drill_LPa_layerRemoveSprite_Private( sprite );
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
Spriteset_Map.prototype.createParallax = function(){
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
Spriteset_Map.prototype.createTilemap = function(){
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
Spriteset_Map.prototype.createDestination = function(){
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
Spriteset_Map.prototype.createPictures = function(){
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
Scene_Map.prototype.createAllWindows = function(){
	_drill_LPa_map_createAllWindows.call(this);	//对话框集合 < 最顶层
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
			if( this.__drill_zIndex == undefined ){ return 20250701; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LPa_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_LPa_layerRemoveSprite_Private = function( sprite ) {
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
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
// ** ☆数据容器
//
//			说明：	> 此模块管理 当前地图中装饰对象 的数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 数据容器 - 初始化绑定
//==============================
var _drill_LPa_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LPa_setup.call( this, mapId );
	this.drill_LPa_initMapdata();
}
//==============================
// * 数据容器 - 初始化
//==============================
Game_Map.prototype.drill_LPa_initMapdata = function(){
	
	// > 刷新当前地图容器
	for( var i = 0; i < DrillUp.g_LPa_layers.length ;i++){
		var temp_data = DrillUp.g_LPa_layers[i];
		if( temp_data == undefined ){	//『控制器与贴图的样式』 - 校验+直接跳出
			$gameSystem._drill_LPa_dataTank_curController[i] = null;
			continue;
		}
		
		// > 控制器 - 匹配全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 控制器 - 匹配单地图数据时
		}else if( temp_data['map'] == this.mapId() ){
			var temp_controller = new Drill_LPa_Controller( temp_data );		//『控制器与贴图的样式』 - 创建控制器
			$gameSystem._drill_LPa_dataTank_curController[i] = temp_controller;	//（重刷数据）
			
		// > 控制器 - 不匹配时
		}else{
			$gameSystem._drill_LPa_dataTank_curController[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}


//=============================================================================
// ** ☆控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器与贴图 - 容器初始化
//==============================
var _drill_LPa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_LPa_temp_initialize2.call(this);
	this._drill_LPa_spriteTank = [];			//贴图容器
};
//==============================
// * 控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_LPa_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function(){
	_drill_LPa_smap_terminate.call(this);
	$gameTemp._drill_LPa_spriteTank = [];		//贴图容器
};
//==============================
// * 控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_LPa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_LPa_smap_update.call(this);
	this.drill_LPa_updateControllerCamera();	//帧刷新 - 控制器与镜头
	this.drill_LPa_updateAttr();				//帧刷新 - 基础特性
	this.drill_LPa_updateMask();				//帧刷新 - 动态遮罩
	this.drill_LPa_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（地图界面）
//==============================
var _drill_LPa_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_LPa_smap_createAllWindows.call(this);
	this.drill_LPa_create();
};
//==============================
// * 控制器与贴图 - 界面创建
//==============================
Scene_Map.prototype.drill_LPa_create = function(){
	$gameTemp._drill_LPa_spriteTank = [];			//贴图容器（不允许出现null值）
	
	for(var i = 0; i < $gameSystem._drill_LPa_dataTank_curController.length; i++){
		var temp_controller = $gameSystem._drill_LPa_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		var data = temp_controller._drill_data;
		
		
		// > 创建贴图
		var temp_sprite = new Drill_LPa_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 双层效果
		if( data['second_enable'] == true ){
			
			// > 双层效果 - 创建贴图
			var temp_secSprite = new Drill_LPa_SecSprite( temp_sprite );
			
			// > 双层效果 - 添加贴图到层级（先添加）
			$gameTemp._drill_LPa_spriteTank.push( temp_secSprite );
			this.drill_LPa_layerAddSprite( temp_secSprite, data['second_layerIndex'] );
				
			// > 双层效果 - 创建动态遮罩
			if( data['visible'] == true ){
				this.drill_LPa_createMaskSprite( temp_controller, temp_secSprite );
				temp_secSprite['_mask_inited'] = true;
				
			// > 双层效果 - 创建动态遮罩（延迟创建）
			}else{
				temp_secSprite['_mask_inited'] = false;
			}
		}
		
		
		// > 添加贴图到层级
		$gameTemp._drill_LPa_spriteTank.push( temp_sprite );
		this.drill_LPa_layerAddSprite( temp_sprite, data['layerIndex'] );
		
		// > 创建动态遮罩
		if( data['visible'] == true ){
			this.drill_LPa_createMaskSprite( temp_controller, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
	}
		
	// > 层级排序
	this.drill_LPa_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 帧刷新 控制器与镜头
//==============================
Scene_Map.prototype.drill_LPa_updateControllerCamera = function(){
	for(var i = 0; i < $gameSystem._drill_LPa_dataTank_curController.length; i++ ){
		var temp_controller = $gameSystem._drill_LPa_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
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
		
		// > 镜头位移结果 - 贴图归位
		//		（保持与地图的初始点一致，因为位移主体是粒子，而不是粒子层）
		//		（这里不能用adjust，因为如果你一直向前移动，贴图会越来越远）
		xx -= cameraXAcc;
		yy -= cameraYAcc;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var option = {
			"XPer": s_data['XPer'],
			"YPer": s_data['YPer'],
			"tile_x": s_data['tile_x'],
			"tile_y": s_data['tile_y'],
			"cameraXAcc": cameraXAcc,
			"cameraYAcc": cameraYAcc,
		};
		var pos = this.drill_LPa_layerCameraMoving(xx, yy, s_data['layerIndex'], option );
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
// * 控制器与贴图 - 帧刷新 基础特性
//==============================
Scene_Map.prototype.drill_LPa_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_LPa_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LPa_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite instanceof Drill_LPa_SecSprite ){ continue; }	//（排除第二层粒子情况）
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		var temp_data = temp_controller._drill_data;
		
		// > 基础特性 - 混合模式（无）
		
		// > 基础特性 - 地图层级
		if( temp_sprite.layerIndex != temp_data['layerIndex'] ){
			temp_sprite.layerIndex =  temp_data['layerIndex'];
			this.drill_LPa_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
			has_layerChange = true;
		}
		// > 基础特性 - 图片层级
		if( temp_sprite.zIndex != temp_data['zIndex'] ){
			temp_sprite.zIndex =  temp_data['zIndex'];
			has_layerChange = true;
		}
	};
	
	// > 层级排序
	if( has_layerChange == true ){
		this.drill_LPa_sortByZIndex();
	}
}
//==============================
// * 动态遮罩 - 创建
//==============================
Scene_Map.prototype.drill_LPa_createMaskSprite = function( temp_controller, temp_sprite ){
	var data = temp_controller._drill_data;
	if( data['dynamicMask_enabled'] != true ){ return; }
	
	if( Imported.Drill_LayerDynamicMaskA && data['dynamicMask_bind'] == "动态遮罩板A" ){
		var temp_mask = this.drill_LDMA_getMaskSprite();
		this._drill_SenceTopArea.addChild(temp_mask);
		temp_sprite.mask = temp_mask;		//『遮罩赋值』
	}
	if( Imported.Drill_LayerDynamicMaskB && data['dynamicMask_bind'] == "动态遮罩板B" ){
		var temp_mask = this.drill_LDMB_getMaskSprite();
		this._drill_SenceTopArea.addChild(temp_mask);
		temp_sprite.mask = temp_mask;		//『遮罩赋值』
	}
}
//==============================
// * 动态遮罩 - 帧刷新
//==============================
Scene_Map.prototype.drill_LPa_updateMask = function(){
	
	// > 粒子层
	for(var i=0; i < $gameTemp._drill_LPa_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LPa_spriteTank[i];
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_controller._drill_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LPa_createMaskSprite( temp_controller, temp_sprite );
		}
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 销毁
//==============================
Scene_Map.prototype.drill_LPa_updateDestroy = function(){
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_LPa_dataTank_curController.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_LPa_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_LPa_dataTank_curController.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_LPa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_LPa_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_LPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_LPa_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};



//=============================================================================
// ** 粒子控制器【Drill_LPa_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个专门控制动画粒子的数据类。
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
// **					->B粒子群弹道
// **					->C随机因子
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					->2A镜头参数
// **					->2B指令叠加变化
// **						> 主体贴图-移动到
// **						> 主体贴图-透明度
// **						> 粒子贴图组-旋转
// **						> 粒子贴图组-缩放X
// **						> 粒子贴图组-缩放Y
// **					->2C延迟指令
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_LPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_LPa_Controller.prototype = Object.create(Drill_COPa_Controller.prototype);
Drill_LPa_Controller.prototype.constructor = Drill_LPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_LPa_Controller.prototype.initialize = function( data ){
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
Drill_LPa_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - 2C延迟指令 - 时间流逝
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
																//帧刷新 - 2A镜头参数
	this.drill_controller_updateCommandChange();				//帧刷新 - 2B指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - 2C延迟指令 - 执行延迟指令
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
Drill_LPa_Controller.prototype.drill_controller_resetData = function( data ){
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
Drill_LPa_Controller.prototype.drill_controller_setVisible = function( visible ){
    Drill_COPa_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_LPa_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LPa_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LPa_Controller.prototype.drill_controller_isDead = function(){
	return Drill_COPa_Controller.prototype.drill_controller_isDead.call( this );
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_LPa_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	var data = this._drill_data;
	data['blendMode'] = blendMode;
};
//##############################
// * 控制器 - 切换地图层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_LPa_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	var data = this._drill_data;
	data['layerIndex'] = layerIndex;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_LPa_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	var data = this._drill_data;
	data['zIndex'] = zIndex;
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
Drill_LPa_Controller.prototype.drill_controller_initData = function(){
	Drill_COPa_Controller.prototype.drill_controller_initData.call( this );
	var data = this._drill_data;
	
	// > 贴图
	data['src_img_file'] = "img/Map__layer/";
	data['trailing_src_img_file'] = "img/Map__layer/";
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "图片层" };								//贴图 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//贴图 - 图片层级（贴图用）
	
	// > D粒子变化
	data['par_holdingBirthPosition'] = false;															//D粒子变化 - 粒子是否滞留
	
	// > E粒子重设
	if( data['par_birthMode'] == undefined ){ data['par_birthMode'] = "随机出现" };						//E粒子重设 - 粒子出现模式
	if( data['par_birthX'] == undefined ){ data['par_birthX'] = 0 };									//E粒子重设 - 粒子固定点 X
	if( data['par_birthY'] == undefined ){ data['par_birthY'] = 0 };									//E粒子重设 - 粒子固定点 Y
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };							//E粒子重设 - 粒子出现范围
	
	// > F双层效果
	if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "上层" };					//F双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };								//F双层效果 - 第二层粒子图片层级
	
	// > I粒子生命周期
	data['par_lifeType'] = "跳过产生过程";
	
	// > 2A镜头参数（无）
	
	// > 2B指令叠加变化（无）
	
	// > 2C延迟指令（无）
	
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_LPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initCamera();				//初始化子功能 - 2A镜头参数
	this.drill_controller_initCommandChange();		//初始化子功能 - 2B指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - 2C延迟指令
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initAttr = function(){
	Drill_COPa_Controller.prototype.drill_controller_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_LPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initBallistics = function(){
	Drill_COPa_Controller.prototype.drill_controller_initBallistics.call( this );
}
//==============================
// * C随机因子 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initRandom = function(){
	Drill_COPa_Controller.prototype.drill_controller_initRandom.call( this );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initTransform = function(){
	Drill_COPa_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initReset = function(){
	//this._drill_curSpriteOutline = [];		//（出界重置）
	Drill_COPa_Controller.prototype.drill_controller_initReset.call( this );
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_LPa_Controller.prototype.drill_controller_updateReset = function(){
	Drill_COPa_Controller.prototype.drill_controller_updateReset.call( this );
}
//==============================
// * E粒子重设 - 判断粒子死亡
//==============================
Drill_LPa_Controller.prototype.drill_controller_isParticleDead = function( i ){
	//if( this._drill_curSpriteOutline[i] == true ){ return true; }	//（出界重置）
	return Drill_COPa_Controller.prototype.drill_controller_isParticleDead.call( this, i );
}
//==============================
// * E粒子重设 - 执行重设 - 位置
//
//			说明：	> 起始点为 一个矩形内随机出现 。
//==============================	
Drill_LPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	var xx = 0;
	var yy = 0;
	var margin = this.drill_controller_getBitmapMargin();
	var ww = margin['ww'];
	var hh = margin['hh'];
	var ran1 = this.drill_controller_curRandom( cur_iteration*i +41*i );
	var ran2 = this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
	
	if( data['par_birthMode'] == "随机出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "左侧出现" ){
		xx = 0 - ww*0.5;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "右侧出现" ){
		xx = Graphics.boxWidth + ww*0.5;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "顶部出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = 0 - hh*0.5;
	}
	if( data['par_birthMode'] == "底部出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = Graphics.boxHeight + hh*0.5;
	}
	if( data['par_birthMode'] == "固定点范围出现" ){
		angle = 360 * ran1;
		radius = data['par_birthRange'] * ran2;
		xx = radius * Math.cos( angle *Math.PI/180 );
		yy = radius * Math.sin( angle *Math.PI/180 );
	}
	
	// > 要把当前镜头位置考虑进去『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $gameMap != undefined && $dataMap != undefined ){
		xx += $gameMap.adjustX(0) * $gameMap.tileWidth();
		yy += $gameMap.adjustY(0) * $gameMap.tileHeight();
	}
	
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
	
	// > 重置后，关闭 出界重置
	//this._drill_curSpriteOutline[i] = false;
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
//==============================
// * 2A镜头参数 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initCamera = function(){
	//this._drill_cameraXAcc = 0;			//循环积累值（不存）
	//this._drill_cameraYAcc = 0;
	
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
}
// > 强制更新提示 锁
DrillUp.g_LPa_alert = true;
//==============================
// * 2A镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LPa_Controller.prototype.drill_controller_getCameraXAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPa_alert == true ){ 
			alert( DrillUp.drill_LPa_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LPa_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
	}else{
		return $gameMap.displayX() * $gameMap.tileWidth();
	}
}
//==============================
// * 2A镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LPa_Controller.prototype.drill_controller_getCameraYAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPa_alert == true ){ 
			alert( DrillUp.drill_LPa_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LPa_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
	}else{
		return $gameMap.displayY() * $gameMap.tileHeight();
	}
}


//==============================
// * 2B指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_LPa_Controller.prototype.drill_controller_initCommandChange = function(){
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
	
}
//==============================
// * 2B指令叠加变化 - 帧刷新
//==============================
Drill_LPa_Controller.prototype.drill_controller_updateCommandChange = function(){
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	
	// > 帧刷新 - 缩放X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleX_data" );
	// > 帧刷新 - 缩放Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleY_data" );
	
}
//==============================
// * 2B指令叠加变化 - 立即还原所有单属性
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 移动到
	//	（这里不含）
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
}
//==============================
// * 2B指令叠加变化 - 立即归位
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * 2B指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", 0, 0,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * 2B指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * 2B指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * 2B指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * 2B指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_LPa_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * 2C延迟指令 - 初始化子功能
//==============================
Drill_LPa_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * 2C延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_LPa_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		
		// > 时间-1
		dc_data['left_time'] -= 1;
		
	}
	
	// > 执行延迟指令（暂停/继续）
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			if( method == "drill_controller_setPause" ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
}
//==============================
// * 2C延迟指令 - 帧刷新 - 执行延迟指令
//==============================
Drill_LPa_Controller.prototype.drill_controller_updateDelayingCommand = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 执行延迟指令
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			
			if( method == "drill_controller_setVisible" ){
				this.drill_controller_setVisible( paramList[0] );
			
			}else if( method == "drill_controller_commandChange_setOpacity" ){
				this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
				
			}else if( method == "drill_controller_commandChange_setScaleX" ){
				this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setScaleY" ){
				this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_restoreAttr" ){
				this.drill_controller_commandChange_restoreAttr();
			
			}else if( method == "drill_controller_commandChange_setMove" ){
				this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
			}else if( method == "drill_controller_commandChange_restoreMove" ){
				this.drill_controller_commandChange_restoreMove();
			}
		}
	}
	
	// > 销毁延迟指令
	for(var i = this._drill_curDelayingCommandTank.length-1; i >= 0; i-- ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			this._drill_curDelayingCommandTank.splice( i, 1 );
		}
	}
}
//==============================
// * 2C延迟指令 - 设置指令（开放函数）
//==============================
Drill_LPa_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setRotate" &&
		
		method != "drill_controller_commandChange_setScaleX" &&
		method != "drill_controller_commandChange_setScaleY" &&
		method != "drill_controller_commandChange_restoreAttr" &&
		
		method != "drill_controller_commandChange_setMove" &&
		method != "drill_controller_commandChange_restoreMove"
	){ return; }
	
	var dc_data = {};
	dc_data['method'] = method;
	dc_data['paramList'] = paramList;
	dc_data['left_time'] = delay_time;
	this._drill_curDelayingCommandTank.push( dc_data );
}
//==============================
// * 2C延迟指令 - 清空全部（开放函数）
//==============================
Drill_LPa_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}



//=============================================================================
// ** 粒子贴图【Drill_LPa_Sprite】
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
// **					->C对象绑定
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					->2B指令叠加变化-控制器用
// **					->2C延迟指令
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_LPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_LPa_Sprite.prototype = Object.create(Drill_COPa_Sprite.prototype);
Drill_LPa_Sprite.prototype.constructor = Drill_LPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_LPa_Sprite.prototype.initialize = function(){
    Drill_COPa_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_LPa_Sprite.prototype.update = function(){
	Drill_COPa_Sprite.prototype.update.call(this);
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	this.drill_sprite_updateCommandChange();		//帧刷新 - 2B指令叠加变化-控制器用
													//帧刷新 - 2C延迟指令（无）
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_LPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_LPa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initChild.call( this );
	this.drill_sprite_initCommandChange();		//初始化子功能 - 2B指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - 2C延迟指令
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_LPa_Sprite.prototype.drill_sprite_isReady = function(){
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
Drill_LPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
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
Drill_LPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
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
Drill_LPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroySelf.call( this );
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private.call( this );
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initAttr = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_LPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	
	this.layerIndex = this._drill_controller._drill_data['layerIndex'];
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_updateAttr_Position = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
	var xx = 0;
	var yy = 0;
	
	// > 层级位置修正
	//		（镜头位移结果，见函数 drill_LPa_updateControllerCamera ）
	xx += this._drill_controller._drill_cameraResultSpriteX;
	yy += this._drill_controller._drill_cameraResultSpriteY;
	
	this._drill_x += xx;
	this._drill_y += yy;
};
//==============================
// * A主体 - 帧刷新 - 可见
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Visible.call( this );
};
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initBallistics = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * B粒子群弹道 - 推演弹道
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initTransform = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initTransform.call( this );
}
//==============================
// * D粒子变化 - 帧刷新 - 位置
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	
	
	// > 出界重置
	//if( this._drill_par_x < 0 - ww ){ this._drill_controller._drill_curSpriteOutline[i] = true; }
	//if( this._drill_par_x > Graphics.boxWidth + ww ){ this._drill_controller._drill_curSpriteOutline[i] = true; }
	//if( this._drill_par_y < 0 - hh ){ this._drill_controller._drill_curSpriteOutline[i] = true; }
	//if( this._drill_par_y > Graphics.boxHeight + hh ){ this._drill_controller._drill_curSpriteOutline[i] = true; }
	
	
	// > 粒子过边界时（直接取余，不要重置）
	var cameraXAcc = this._drill_controller.drill_controller_getCameraXAcc();
	var cameraYAcc = this._drill_controller.drill_controller_getCameraYAcc();
	var margin = this._drill_controller.drill_controller_getBitmapMargin();
	var ww = margin['ww'];
	var hh = margin['hh'];
	var bww = Graphics.boxWidth + ww*2;
	var bhh = Graphics.boxHeight + hh*2;
	
	
	// > 边界取余 - 对齐位置
	this._drill_par_x -= cameraXAcc;
	this._drill_par_y -= cameraYAcc;
	
	// > 边界取余
	this._drill_par_x %= bww;
	this._drill_par_x += bww;
	this._drill_par_x %= bww;
	this._drill_par_x -= ww;
	this._drill_par_y %= bww;
	this._drill_par_y += bww;
	this._drill_par_y %= bww;
	this._drill_par_y -= hh;
	
	// > 边界取余 - 恢复位置
	this._drill_par_x += cameraXAcc;
	this._drill_par_y += cameraYAcc;
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initReset = function(){
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
//==============================
// * 2B指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	
	// > 贴图参数 - 缩放X
	this["_drill_command_scaleX_spriteData"] = undefined;
	// > 贴图参数 - 缩放Y
	this["_drill_command_scaleY_spriteData"] = undefined;
}
//==============================
// * 2B指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller._drill_data;
	var controller = this._drill_controller;
	
	// > 移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动到 - 贴图赋值
	if( controller[CDataName] != undefined ){
		this.x += controller[CDataName]['cur_valueA'];
		this.y += controller[CDataName]['cur_valueB'];
		//for(var i = 0; i < data['par_count']; i++ ){
		//	var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的移动）
		//	par_sprite.x += controller[CDataName]['cur_valueA'];
		//	par_sprite.y += controller[CDataName]['cur_valueB'];
		//}
	}
	
	
	// > 透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 透明度 - 贴图赋值（覆盖）
	if( controller[CDataName] != undefined ){
		this.opacity = controller[CDataName]['cur_value'];
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值
	if( controller[CDataName] != undefined ){
		for(var i = 0; i < data['par_count']; i++ ){
			var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的旋转）
			par_sprite.rotation += controller[CDataName]['cur_value'] *Math.PI /180;
		}
	}
	
	
	// > 缩放X - 帧刷新
	var CDataName = "_drill_command_scaleX_data";
	var SDataName = "_drill_command_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		for(var i = 0; i < data['par_count']; i++ ){
			var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的缩放）
			par_sprite.scale.x *= controller[CDataName]['cur_value'];
		}
	}
	
	
	// > 缩放Y - 帧刷新
	var CDataName = "_drill_command_scaleY_data";
	var SDataName = "_drill_command_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		for(var i = 0; i < data['par_count']; i++ ){
			var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的缩放）
			par_sprite.scale.y *= controller[CDataName]['cur_value'];
		}
	}
}


//==============================
// * 2C延迟指令 - 初始化子功能
//==============================
Drill_LPa_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}



//=============================================================================
// ** 粒子贴图（第二层）【Drill_LPa_SecSprite】
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
function Drill_LPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_LPa_SecSprite.prototype = Object.create(Drill_COPa_SecSprite.prototype);
Drill_LPa_SecSprite.prototype.constructor = Drill_LPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_LPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_LPa_SecSprite.prototype.update = function(){
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
Drill_LPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
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
Drill_LPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
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
Drill_LPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
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
Drill_LPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private.call( this );
}

//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_initAttr = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
};
//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_initBallistics = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics.call( this );
};
//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_initTransform = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform.call( this );
}
//==============================
// * D粒子变化（第二层） - 帧刷新 - 位置
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_updateTransform_Position = function( i, time ) {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform_Position.call( this, i, time );
	
	
	// > 粒子过边界时（直接取余，不要重置）
	var cameraXAcc = this._drill_controller.drill_controller_getCameraXAcc();
	var cameraYAcc = this._drill_controller.drill_controller_getCameraYAcc();
	var margin = this._drill_controller.drill_controller_getBitmapMargin();
	var ww = margin['ww'];
	var hh = margin['hh'];
	var bww = Graphics.boxWidth + ww*2;
	var bhh = Graphics.boxHeight + hh*2;
	
	
	// > 边界取余 - 对齐位置
	this._drill_parSec_x -= cameraXAcc;
	this._drill_parSec_y -= cameraYAcc;
	
	// > 边界取余
	this._drill_parSec_x %= bww;
	this._drill_parSec_x += bww;
	this._drill_parSec_x %= bww;
	this._drill_parSec_x -= ww;
	this._drill_parSec_y %= bww;
	this._drill_parSec_y += bww;
	this._drill_parSec_y %= bww;
	this._drill_parSec_y -= hh;
	
	// > 边界取余 - 恢复位置
	this._drill_parSec_x += cameraXAcc;
	this._drill_parSec_y += cameraYAcc;
	
}
//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_LPa_SecSprite.prototype.drill_spriteSec_initReset = function(){
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
		Imported.Drill_LayerParticle = false;
		var pluginTip = DrillUp.drill_LPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

