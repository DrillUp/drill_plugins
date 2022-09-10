//=============================================================================
// Drill_GaugeOfBufferTimeBar.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        UI - 缓冲时间条
 * @author Drill_up
 * 
 * @Drill_LE_param "时间条样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GOBTB_data_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeOfBufferTimeBar +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置一个时间条，时间结束后会自己消失。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGaugeMeter       系统-参数条核心
 *     必须基于该插件，才可以绘制时间条。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   放置在 地图上层 。
 * 2.更多内容可以去看看文档 "13.UI > 关于缓冲时间条与数字.docx"。
 *   其中也有时间条"从零开始设计"的教程。
 * 细节：
 *   (1.时间条样式 = 1个参数条样式 + 2个外框。
 *   (2.时间条创建后，是一个单独的个体，通过id区分。
 *      你可以创建多个时间条并绑定到同一事件上。
 *   (3.参数条对应的参数为时间，单位帧。
 * 参数条：
 *   (1.参数值：　取决于插件指令，表示剩余时间值。
 *      遮罩：　　可自定义。
 *      旋转：　　可自定义。
 *      段上限：　取决于插件指令，可多段。
 *      流动效果：可自定义。
 *      凹槽条：　可自定义。
 *      弹出条：　可自定义。
 *      粒子：　　可自定义。
 *      游标：　　可自定义。
 *      加满动画：关闭。
 *   (2.参数条样式配置在 参数条核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 时间条物体：
 *   (1.时间条物体表示一个放置在地图界面中的独立物体，具有自己的贴图和
 *      时间计时器。
 *   (2.时间条物体绑定事件或玩家之后，时间参数开始正式计时，
 *      当时间达到持续时间后自动消失。计时期间不受其他条件影响。
 *   (3.如果创建了id相同的时间条物体，那么后一个物体会覆盖掉前一个物体。
 * 设计：
 *   (1.你可以用来制作 按钮按下后开始计时 的时间条表示。
 *      或者某些短期技能施法的 前摇时间、冷却时间 的时间条表示。
 *      但注意，插件功能非常局限单一，只能简单的并行显示一个条。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__bufferTimeBar （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__bufferTimeBar文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 样式1 资源-外框背景
 * 样式1 资源-外框前景
 * 样式2 ……
 * ……
 * 
 * 除了外框资源，参数条和参数数字的资源非常多，你需要仔细给你的
 * 文件分门别类。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你必须通过下列插件指令来设置时间条：
 * 
 * 插件指令：>缓冲时间条 : 创建时间条[1] : 样式[3] : 持续时间[60] : 段上限[60]
 * 插件指令：>缓冲时间条 : 删除时间条[1]
 * 
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 绑定于物体 : 玩家
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 绑定于物体 : 本事件
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 绑定于物体 : 事件[10]
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 绑定于物体 : 事件变量[21]
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 绑定于图块 : 位置[10,10]
 * 
 * 1."时间条[n]"中的n表示时间条的id，
 *   "样式[3]"对应该插件配置的时间条样式。
 *   注意，时间条样式 = 1个参数条样式 + 2个外框。
 * 2.时间条创建后，是一个单独的个体，通过id区分。
 *   你可以创建多个时间条并绑定到同一事件上。
 *   如果"时间条[1]"已经创建，再执行一次创建，则会将原来的去掉，而覆盖新的。
 * 3.如果创建了id相同的时间条物体，那么后一个物体会覆盖掉前一个物体。
 * 4.持续时间的单位为帧，如果要60秒，则需填"持续时间[3600]"。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以控制时间条的部分内容：
 * 
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 暂停计时器
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 恢复计时器
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 结束时间播放
 * 
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 设置时间值 : 时间[50]
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 增加时间值 : 时间[+10]
 * 
 * 插件指令：>缓冲时间条 : 控制时间条[1] : 修改整体位置平移 : 位置[20,-20]
 * 
 * 1.如果时间条未被创建，这上述指令都没有效果。
 * 2.设置"暂停计时器"后，时间条将会一直处于暂停状态，且不会消失。
 *   必须恢复才能继续计时，计时结束自动消失。
 * 3.设置"结束时间播放"后，时间流动将会停止，并逐渐消失。
 * 4."修改整体位置平移"用于控制单独的时间条位置，
 *   大部分的时间条是重叠在一起的，需要额外分配位置。
 * 5."设置/增加时间值"会影响段的情况，比如段上限180，时间+180，那么时间条
 *   会立即增加一段。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 根据事件控制
 * 你可以能够设置根据某事件来控制时间条：
 * 
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 暂停计时器
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 恢复计时器
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 结束时间播放
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 设置时间值 : 时间[50]
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 增加时间值 : 时间[+10]
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 修改整体位置平移 : 位置[20,-20]
 * 
 * 插件指令：>缓冲时间条 : 本事件 : 所有条 : 暂停计时器
 * 插件指令：>缓冲时间条 : 事件[10] : 所有条 : 暂停计时器
 * 插件指令：>缓冲时间条 : 事件变量[21] : 所有条 : 暂停计时器
 * 
 * 1.如果这个事件没有绑定任何 时间条，则没有效果。
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
 * 时间复杂度： o(n^3)*o(物体数)*o(贴图处理) 每帧
 * 测试方法：   同时开启7个时间条物体，在下列情况下测试。
 * 测试结果：   200个事件的地图中，消耗为：【52.86ms】
 *              100个事件的地图中，消耗为：【46.33ms】
 *               50个事件的地图中，消耗为：【22.52ms】
 * 测试方法2：  同时开7个弹出条开启的时间条物体，在持续时间内制造了210个弹出条。
 * 测试结果3：  测出消耗为：【143.48ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.可视化管理层平均fps14，同时开7个参数条，帧数无明显下降，
 *   大概fps12。只有缓冲时间条+弹出条时，fps直接降到1。
 * 3.由于弹出条在参数减少时才出现，而时间正好是持续减少的量，
 *   自然会造成大量的消耗计算。所以使用时注意。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了插件指令在没有创建时间条时，执行 恢复计时器 出错的bug。
 * [v1.2]
 * 添加了 根据事件 来修改控制参数条的插件指令。
 * 
 * 
 * 
 *
 * @param ---时间条样式组---
 * @default
 *
 * @param 时间条样式-1
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-原始--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"1","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-2
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-游标--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"2","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-3
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-游标(多段复位)--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"3","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-4
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-波形线--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"4","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-5
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-波形线+游标--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"5","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-6
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-波形线+游标(多段复位)--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"6","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-7
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-胶囊--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"7","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间胶囊风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-8
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-垂直胶囊--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"8","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间胶囊风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"90","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"90"}
 *
 * @param 时间条样式-9
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-斜向胶囊--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"9","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间胶囊风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"225","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"225"}
 *
 * @param 时间条样式-10
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-雕花--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"10","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间雕花风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-11
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-雕花（倒流）--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"10","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间雕花风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-12
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-白火花--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"12","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-13
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-黑火花--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"13","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-14
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-火花A--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"14","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-15
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-火花B--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"15","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-16
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-火花C--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"16","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-17
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-火花D--","---时间条---":"","渐变时长":"20","时间条流动方式":"逐渐缩短","图片层级":"12","---参数条---":"","参数条样式":"17","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间精简风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 *
 * @param 时间条样式-18
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default {"标签":"--时间条-进度计--","---时间条物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间条流动方式":"逐渐加满","图片层级":"12","---参数条---":"","参数条样式":"18","偏移-参数条 X":"0","偏移-参数条 Y":"0","---外框---":"","资源-外框背景":"时间进度计风格-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间条样式-19
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-20
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-21
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-22
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-23
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-24
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-25
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-26
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-27
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-28
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-29
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-30
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-31
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-32
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-33
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-34
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-35
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-36
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-37
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-38
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-39
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 *
 * @param 时间条样式-40
 * @parent ---时间条样式组---
 * @type struct<BufferTimeBar>
 * @desc 配置参数条的样式信息。
 * @default 
 * 
 */
/*~struct~BufferTimeBar:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的时间条--
 *
 * @param ---时间条物体---
 * @desc 
 *
 * @param 平移-整体 X
 * @parent ---时间条物体---
 * @desc 以事件头顶为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-整体 Y
 * @parent ---时间条物体---
 * @desc 以事件头顶为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * @param 渐变时长
 * @parent ---时间条物体---
 * @type number
 * @min 1
 * @desc 整个时间条显现/消失的时长。
 * @default 20
 *
 * @param 时间条流动方式
 * @parent ---时间条物体---
 * @type select
 * @option 逐渐加满
 * @value 逐渐加满
 * @option 逐渐缩短
 * @value 逐渐缩短
 * @desc 时间条的流动方式。
 * @default 逐渐加满
 *
 * @param 图片层级
 * @parent ---时间条物体---
 * @desc 时间条所处在的图片层级。
 * @default 12
 *
 * @param ---参数条---
 * @desc 
 *
 * @param 参数条样式
 * @parent ---参数条---
 * @type number
 * @min 0
 * @desc 参数条核心中对应的样式，对应时间条本体。
 * @default 0
 *
 * @param 偏移-参数条 X
 * @parent ---参数条---
 * @desc 以时间条物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-参数条 Y
 * @parent ---参数条---
 * @desc 以时间条物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * @param ---外框---
 * @desc 
 *
 * @param 资源-外框背景
 * @parent ---外框---
 * @desc 时间条的外框图片资源。外框背景处于参数条下方。
 * @default (需配置)时间条外框-默认背景
 * @require 1
 * @dir img/Special__bufferTimeBar/
 * @type file
 *
 * @param 偏移-外框背景 X
 * @parent ---外框---
 * @desc 以时间条物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-外框背景 Y
 * @parent ---外框---
 * @desc 以时间条物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 外框背景旋转角度
 * @parent ---外框---
 * @type number
 * @min 0
 * @desc 外框背景的旋转角度，单位角度。中心锚点在左上角。（顺时针，90度朝下，270度朝上）
 * @default 0
 *
 * @param 资源-外框前景
 * @parent ---外框---
 * @desc 时间条的外框图片资源。外框前景处于参数条上方。
 * @default (需配置)时间条外框-默认前景
 * @require 1
 * @dir img/Special__bufferTimeBar/
 * @type file
 *
 * @param 偏移-外框前景 X
 * @parent ---外框---
 * @desc 以时间条物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-外框前景 Y
 * @parent ---外框---
 * @desc 以时间条物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 外框前景旋转角度
 * @parent ---外框---
 * @type number
 * @min 0
 * @desc 外框背景的旋转角度，单位角度。中心锚点在左上角。（顺时针，90度朝下，270度朝上）
 * @default 0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GOBTB（Gauge_Of_Buffer_Time_Bar）
//		临时全局变量	DrillUp.g_GOBTB_xxx
//		临时局部变量	this._drill_GOBTB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(物体数)*o(贴图处理) 每帧
//		★性能测试因素	可视化管理层
//		★性能测试消耗	52.86ms 43.67ms 143.48ms （火花弹出条大量并发，208.17ms）
//		★最坏情况		时间条样式中大量使用了弹出条设置。
//		★备注			不考虑弹出条，本身的消耗相对不大，可以开很多，而且不出问题，开启流动的效果也十分流畅。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			缓冲时间条：
//				->物体
//					->创建、控制、删除
//					->绑定于物体、图块
//					->时间倒流、暂停
//					->整体位置	
//				->外框
//				->参数条
//					->重建缓冲
//					->段上限
//					->设置时间值
//					->增加时间值
//
//		★私有类如下：
//			* Drill_GOBTB_GameTimeBar 【时间条物体】
//			* Drill_GOBTB_TimeBarSprite 【时间条贴图】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			3.由于容器特殊，根据物体数组单独存放，一个萝卜一个坑，贴图与物体对象一致，也是一个萝卜一个坑。
//			  物体的数据统一放在data中控制，包括 私有对象数据 。
//			
//		★其它说明细节：
//			1.这个插件让我比较意外，结构比我想的要麻烦的多，毕竟它是一个game_obj，要存的结构。
//			  （这里的物体，和照明插件中的伪事件相似。）
//			2.注意，"level_max"参数，这个是参数条核心里面一个重要的变量，直接贯穿当前整个插件。
//			  
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeOfBufferTimeBar = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeOfBufferTimeBar');
	
	
	//==============================
	// * 变量获取 - 时间条样式
	//				（~struct~BufferTimeBar）
	//==============================
	DrillUp.drill_GOBTB_initParam = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["平移-整体 X"] || 0 );
		data['y'] = Number( dataFrom["平移-整体 Y"] || 0 );
		data['opacityTime'] = Number( dataFrom["渐变时长"] || 20 );
		data['flowingType'] = String( dataFrom["时间条流动方式"] || "逐渐加满" );
		data['zIndex'] = Number( dataFrom["图片层级"] || 0 );
		data['meter_id'] = Number( dataFrom["参数条样式"] || 0 );
		data['meter_x'] = Number( dataFrom["偏移-参数条 X"] || 0 );
		data['meter_y'] = Number( dataFrom["偏移-参数条 Y"] || 0 );
		data['frameLower_img'] = String( dataFrom["资源-外框背景"] || "" );
		data['frameLower_x'] = Number( dataFrom["偏移-外框背景 X"] || 0 );
		data['frameLower_y'] = Number( dataFrom["偏移-外框背景 Y"] || 0 );
		data['frameLower_rotation'] = Number( dataFrom["外框背景旋转角度"] || 0 );
		data['frameUpper_img'] = String( dataFrom["资源-外框前景"] || "" );
		data['frameUpper_x'] = Number( dataFrom["偏移-外框前景 X"] || 0 );
		data['frameUpper_y'] = Number( dataFrom["偏移-外框前景 Y"] || 0 );
		data['frameUpper_rotation'] = Number( dataFrom["外框前景旋转角度"] || 0 );
		return data;
	}
	
	
	/*-----------------时间条样式------------------*/
	DrillUp.g_GOBTB_data_list_length = 40;
	DrillUp.g_GOBTB_data_list = [];
	for (var i = 0; i < DrillUp.g_GOBTB_data_list_length; i++) {
		if( DrillUp.parameters["时间条样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["时间条样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["时间条样式-" + String(i+1) ]);
			DrillUp.g_GOBTB_data_list[i] = DrillUp.drill_GOBTB_initParam( temp );
		}else{
			DrillUp.g_GOBTB_data_list[i] = {};
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGaugeMeter ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialBufferTimeBar = function(filename) {
    return this.loadBitmap('img/Special__bufferTimeBar/', filename, 0, true);
};

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GOBTB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GOBTB_pluginCommand.call(this, command, args);
	if (command === ">缓冲时间条") {
		
		/*-----------------创建/删除------------------*/
		if(args.length == 8){ 	//	>缓冲时间条 : 创建时间条[1] : 样式[3] : 持续时间[60] : 段上限[60]
			var bar_id = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( bar_id.indexOf("创建时间条[") != -1 ){
				bar_id = bar_id.replace("创建时间条[","");
				bar_id = bar_id.replace("]","");
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("持续时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("段上限[","");
				temp3 = temp3.replace("]","");
				
				var timeBar = $gameMap.drill_GOBTB_createTimeBar( Number(bar_id), Number(temp1)-1, Number(temp2), Number(temp3)  );
				
				// > 默认绑定于本事件
				timeBar.drill_GOBTB_bindEvent( this._eventId );
				return;
			}
		}
		
		/*-----------------对象组获取 - 时间条------------------*/
		var bar_id = null;
		if( args.length >= 2 ){
			var obj_str = String(args[1]);
			if( obj_str.indexOf("控制时间条[") != -1 ){
				obj_str = obj_str.replace("控制时间条[","");
				obj_str = obj_str.replace("]","");
				bar_id = Number(obj_str);
			}
		}
		
		/*-----------------控制时间条------------------*/
		if( bar_id != null && args.length == 6 ){ 	//	>缓冲时间条 : 控制时间条[1] : 绑定于物体 : 本事件
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "绑定于物体" ){
				var e_id = null;
				if( temp2 == "玩家" ){
					e_id = -2;
				}
				if( temp2 == "本事件" ){
					e_id = this._eventId;
				}
				if( temp2.indexOf("事件[") != -1 ){
					temp2 = temp2.replace("事件[","");
					temp2 = temp2.replace("]","");
					e_id = Number(temp2);
				}
				if( temp2.indexOf("事件变量[") != -1 ){
					temp2 = temp2.replace("事件变量[","");
					temp2 = temp2.replace("]","");
					e_id = $gameVariables.value(Number(temp2));
				}
				
				if( e_id ){
					if( $gameMap.drill_GOBTB_isEventExist( e_id ) == false ){ return; }
					var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
					if( timeBar ){
						timeBar.drill_GOBTB_bindEvent( e_id );
					}
				}
				return;
			}
			
			if( temp1 == "绑定于图块" ){
				if( temp2.indexOf("位置[") != -1 ){
					temp2 = temp2.replace("位置[","");
					temp2 = temp2.replace("]","");
					var temp_arr = temp2.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
						if( timeBar ){
							timeBar.drill_GOBTB_bindTile( Number(temp_arr[0]),Number(temp_arr[1]) );
						}
					}
				}
				return;
			}
		}
		
		/*-----------------可选设定 控制------------------*/
		if( bar_id != null && args.length == 4 ){ 			//	>缓冲时间条 : 控制时间条[1] : 暂停计时器
			var temp1 = String(args[3]);
			if( temp1 == "暂停计时器" ){
				var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
				if( timeBar ){
					timeBar._drill_timeBlocked = true;
				}
				return;
			}
			if( temp1 == "恢复计时器" ){
				var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
				if( timeBar ){
					timeBar._drill_timeBlocked = false;
				}
				return;
			}
			if( temp1 == "结束时间播放" ){
				var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
				if( timeBar ){
					timeBar._drill_timeBlocked = false;
					timeBar._drill_data['life_time'] = timeBar._drill_cur_time;		//结束时间 立即变成当前时间
				}
				return;
			}
		}
		if( bar_id != null && args.length == 6 ){ 	
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "修改整体位置平移" ){
				if( temp2.indexOf("位置[") != -1 ){
					temp2 = temp2.replace("位置[","");
					temp2 = temp2.replace("]","");
					var temp_arr = temp2.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
						if( timeBar ){
							timeBar._drill_data['x'] = Number(temp_arr[0]);
							timeBar._drill_data['y'] = Number(temp_arr[1]);
						}
					}
				}
				return;
			}
			
			if( temp1 == "设置时间值" ){
				if( temp2.indexOf("时间[") != -1 ){
					temp2 = temp2.replace("时间[","");
					temp2 = temp2.replace("]","");
					var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
					if( timeBar ){
						timeBar._drill_cur_time = Number(temp2);
					}
				}
				return;
			}
			if( temp1 == "增加时间值" ){
				if( temp2.indexOf("时间[") != -1 ){
					temp2 = temp2.replace("时间[","");
					temp2 = temp2.replace("]","");
					var timeBar = $gameMap.drill_GOBTB_getTimeBarById( Number(bar_id) );
					if( timeBar ){
						timeBar._drill_cur_time += Number(temp2);
					}
				}
				return;
			}
		}
		
		/*-----------------对象组获取 - 事件------------------*/
		var e_id = null;
		if( args.length >= 2 ){
			var obj_str = String(args[1]);
			if( obj_str == "本事件" ){
				e_id = this._eventId;
				
			}else if( obj_str.indexOf("事件变量[") != -1 ){
				obj_str = obj_str.replace("事件变量[","");
				obj_str = obj_str.replace("]","");
				e_id = $gameVariables.value(Number(obj_str));
			
			}else if( obj_str.indexOf("事件[") != -1 ){
				obj_str = obj_str.replace("事件[","");
				obj_str = obj_str.replace("]","");
				e_id = Number(obj_str);
			}
		}
		
		/*-----------------事件 控制------------------*/
		if( e_id != null && args.length == 6 ){ 
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "所有条" && temp2 == "暂停计时器" ){
				var timeBar_list = $gameMap.drill_GOBTB_getTimeBarListByEventId( e_id );
				for( var i=0; i < timeBar_list.length; i++ ){
					timeBar_list[i]._drill_timeBlocked = true;
				}
				return;
			}
			if( temp1 == "所有条" && temp2 == "恢复计时器" ){
				var timeBar_list = $gameMap.drill_GOBTB_getTimeBarListByEventId( e_id );
				for( var i=0; i < timeBar_list.length; i++ ){
					timeBar_list[i]._drill_timeBlocked = false;
				}
				return;
			}
			if( temp1 == "所有条" && temp2 == "结束时间播放" ){
				var timeBar_list = $gameMap.drill_GOBTB_getTimeBarListByEventId( e_id );
				for(var i=0; i < timeBar_list.length; i++ ){
					var timeBar = timeBar_list[i];
					timeBar._drill_timeBlocked = false;
					timeBar._drill_data['life_time'] = timeBar._drill_cur_time;		//结束时间 立即变成当前时间
				}
				return;
			}
		}
		if( e_id != null && args.length == 8 ){ 	
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( temp1 == "所有条" && temp2 == "修改整体位置平移" ){
				if( temp3.indexOf("位置[") != -1 ){
					temp3 = temp3.replace("位置[","");
					temp3 = temp3.replace("]","");
					var temp_arr = temp3.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var timeBar_list = $gameMap.drill_GOBTB_getTimeBarListByEventId( e_id );
						for(var i=0; i < timeBar_list.length; i++ ){
							var timeBar = timeBar_list[i];
							timeBar._drill_data['x'] = Number(temp_arr[0]);
							timeBar._drill_data['y'] = Number(temp_arr[1]);
						}
					}
				}
				return;
			}
			if( temp1 == "所有条" && temp2 == "设置时间值" ){
				if( temp3.indexOf("时间[") != -1 ){
					temp3 = temp3.replace("时间[","");
					temp3 = temp3.replace("]","");
					var timeBar_list = $gameMap.drill_GOBTB_getTimeBarListByEventId( e_id );
					for(var i=0; i < timeBar_list.length; i++ ){
						var timeBar = timeBar_list[i];
						timeBar._drill_cur_time = Number(temp3);
					}
				}
				return;
			}
			if( temp1 == "所有条" && temp2 == "增加时间值" ){
				if( temp3.indexOf("时间[") != -1 ){
					temp3 = temp3.replace("时间[","");
					temp3 = temp3.replace("]","");
					var timeBar_list = $gameMap.drill_GOBTB_getTimeBarListByEventId( e_id );
					for(var i=0; i < timeBar_list.length; i++ ){
						var timeBar = timeBar_list[i];
						timeBar._drill_cur_time += Number(temp3);
					}
				}
				return;
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_GOBTB_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	if( e_id == -2 ){ return true; }	//玩家
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_GaugeOfBufferTimeBar.js UI - 缓冲时间条】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 时间条物体【Drill_GOBTB_GameTimeBar】
//
//=============================================================================
//==============================
// * 时间条物体 - 定义
//==============================
function Drill_GOBTB_GameTimeBar() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 时间条物体 - 初始化
//==============================
Drill_GOBTB_GameTimeBar.prototype.initialize = function( data ) {
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	var data = this._drill_data;
	//alert(JSON.stringify(data));
	
	// > 默认值
	if( data['x'] == undefined ){ data['x'] = 0 };											//主体 - x
	if( data['y'] == undefined ){ data['y'] = 0 };											//主体 - y
	if( data['opacityTime'] == undefined ){ data['opacityTime'] = 30 };						//主体 - 渐变时长
	if( data['flowingType'] == undefined ){ data['flowingType'] = "逐渐加满" };				//主体 - 时间条流动方式
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };								//主体 - 图片层级
	if( data['meter_id'] == undefined ){ data['meter_id'] = 0 };							//参数条 - id
	if( data['meter_x'] == undefined ){ data['meter_x'] = 0 };								//参数条 - x
	if( data['meter_y'] == undefined ){ data['meter_y'] = 0 };								//参数条 - y
	if( data['frameLower_img'] == undefined ){ data['frameLower_img'] = 0 };				//外框 - 背景资源
	if( data['frameLower_x'] == undefined ){ data['frameLower_x'] = 0 };					//外框 - 背景x
	if( data['frameLower_y'] == undefined ){ data['frameLower_y'] = 0 };					//外框 - 背景y
	if( data['frameLower_rotation'] == undefined ){ data['frameLower_rotation'] = 0 };		//外框 - 旋转角度
	if( data['frameUpper_img'] == undefined ){ data['frameUpper_img'] = 0 };				//外框 - 前景资源
	if( data['frameUpper_x'] == undefined ){ data['frameUpper_x'] = 0 };					//外框 - 前景x
	if( data['frameUpper_y'] == undefined ){ data['frameUpper_y'] = 0 };					//外框 - 前景y
	if( data['frameUpper_rotation'] == undefined ){ data['frameUpper_rotation'] = 0 };		//外框 - 旋转角度
	
	// > 插件指令控制值
	if( data['level_max'] == undefined ){ data['level_max'] = 30 };							//参数条 - 段上限
	if( data['life_time'] == undefined ){ data['life_time'] = 30 };							//主体 - 持续时间
	if( data['bind_eventId'] == undefined ){ data['bind_eventId'] = -1 };					//定位 - 绑定的事件
	if( data['bind_tileX'] == undefined ){ data['bind_tileX'] = -1 };						//定位 - 绑定的图块x
	if( data['bind_tileY'] == undefined ){ data['bind_tileY'] = -1 };						//定位 - 绑定的图块y
	
	
	// > 私有对象初始化
	this._drill_enable = true;					//启用
	this._drill_cur_time = 0;					//当前时间
	this._drill_opacity = 0;					//透明度
	this._drill_meterValue = 0;					//参数条值
	this._drill_timeStarted = false;			//时间开始
	this._drill_timeBlocked = false;			//时间暂停
}

//==============================
// * 时间条物体 - 帧刷新
//==============================
Drill_GOBTB_GameTimeBar.prototype.update = function() {
	var data = this._drill_data;
	if( this._drill_enable == false ){ return; }
	
	// > 时间增加
	if( this._drill_timeStarted == true &&
		this._drill_timeBlocked == false &&
		this.isDead() == false ){
		this._drill_cur_time += 1;
	}
	
	// > 透明度
	if( this._drill_cur_time <= data['opacityTime'] ){
		this._drill_opacity = 255 * this._drill_cur_time / data['opacityTime'] ;
	}
	if( this._drill_cur_time >= data['life_time'] ){
		this._drill_opacity = 255 - 255 * ( this._drill_cur_time - data['life_time'] )/ data['opacityTime'] ;
	}
	
	// > 参数条值
	if( data['flowingType'] == "逐渐加满" ){
		this._drill_meterValue = this._drill_cur_time; 
		if( this.isTimeEnded() ){ this._drill_meterValue = data['life_time']; }
	}
	if( data['flowingType'] == "逐渐缩短" ){ 
		this._drill_meterValue = data['life_time'] - this._drill_cur_time; 
		if( this.isTimeEnded() ){ this._drill_meterValue = 0; }
	}
	
	// > 销毁对象
	if( this.isDead() ){
		data['bind_eventId'] = -1;
		data['bind_tileX'] = -1;
		data['bind_tileY'] = -1;
	}
}
//==============================
// * 时间条物体 - 时间结束
//==============================
Drill_GOBTB_GameTimeBar.prototype.isTimeEnded = function() {
	var data = this._drill_data;
	return this._drill_cur_time > data['life_time'];
}
//==============================
// * 时间条物体 - 寿命
//==============================
Drill_GOBTB_GameTimeBar.prototype.isDead = function() {
	var data = this._drill_data;
	return this._drill_cur_time > data['life_time'] + data['opacityTime'];
}
//==============================
// * 时间条物体 - 绑定于物体
//==============================
Drill_GOBTB_GameTimeBar.prototype.drill_GOBTB_bindEvent = function( event_id ) {
	var data = this._drill_data;
	data['bind_eventId'] = event_id;
	this._drill_timeStarted = true;
}
//==============================
// * 时间条物体 - 绑定于图块
//==============================
Drill_GOBTB_GameTimeBar.prototype.drill_GOBTB_bindTile = function( tileX, tileY ) {
	var data = this._drill_data;
	data['bind_tileX'] = tileX;
	data['bind_tileY'] = tileY;
	this._drill_timeStarted = true;
}

//=============================================================================
// ** 时间条物体容器
//=============================================================================
//==============================
// * 容器 - 切换地图时
//==============================
Game_Map.prototype.drill_GOBTB_resetTimeBars = function() {
	this._drill_GOBTB_timeBarTank = [];
};
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_GOBTB_timeBar_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_GOBTB_timeBar_update.call(this,sceneActive);
	if( sceneActive ){
		this.drill_GOBTB_updateTimeBar();
	}
};
Game_Map.prototype.drill_GOBTB_updateTimeBar = function() {
	for(var i = 0; i < this._drill_GOBTB_timeBarTank.length; i++ ){
		var tb = this._drill_GOBTB_timeBarTank[i];
		if( tb == null ){ continue; }
		
		// > 帧刷新
		tb.update();
		
		// > 过时间销毁（销毁不会主动去掉贴图，而是重刷时，贴图会被清理）
		if( tb.isDead() ){
			this.drill_GOBTB_deleteTimeBar(i);
		}
	}
}
//==============================
// * 容器 - 创建物体
//==============================
Game_Map.prototype.drill_GOBTB_createTimeBar = function( bar_id, barSprite_id, life_time, level_max ) {
	this._drill_GOBTB_timeBarTank[ bar_id ] = null;
	
	// > 时间条 样式+配置 初始化
	var data = DrillUp.g_GOBTB_data_list[ barSprite_id ];
	data['life_time'] = life_time;
	data['level_max'] = level_max;		
	
	// > 创建时间条
	var obj = new Drill_GOBTB_GameTimeBar( data );
	this._drill_GOBTB_timeBarTank[ bar_id ] = obj;
	$gameTemp._drill_GOBTB_needRestatistics = true;
	return obj;
};
//==============================
// * 容器 - 获取物体
//==============================
Game_Map.prototype.drill_GOBTB_getTimeBarById = function( bar_id ){
	return this._drill_GOBTB_timeBarTank[ bar_id ];
}
//==============================
// * 容器 - 获取物体（根据事件）
//==============================
Game_Map.prototype.drill_GOBTB_getTimeBarListByEventId = function( e_id ){
	var result = [];
	for( var i=0; i < this._drill_GOBTB_timeBarTank.length; i++ ){
		var timeBar = this._drill_GOBTB_timeBarTank[i];
		if( timeBar == undefined ){ continue; }
		if( timeBar._drill_data['bind_eventId'] == -1 ){ continue; }
		if( timeBar._drill_data['bind_eventId'] != e_id ){ continue; }
		result.push( timeBar );
	}
	return result;
}
//==============================
// * 容器 - 删除物体
//==============================
Game_Map.prototype.drill_GOBTB_deleteTimeBar = function( bar_id ) {
	this._drill_GOBTB_timeBarTank[ bar_id ] = null;
	$gameTemp._drill_GOBTB_needRestatistics = true;
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_GOBTB_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GOBTB_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Spriteset_Map.prototype.drill_GOBTB_sortByZIndex = function() {
	this._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// ** 贴图容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_GOBTB_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_GOBTB_temp_initialize.call(this);
	this._drill_GOBTB_spriteTank = [];
	this._drill_GOBTB_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_GOBTB_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_GOBTB_spriteTank = [];
	$gameTemp._drill_GOBTB_needRestatistics = true;
	this.drill_GOBTB_resetTimeBars();
	_drill_GOBTB_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_GOBTB_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_GOBTB_spriteTank = [];
	$gameTemp._drill_GOBTB_needRestatistics = true;
	_drill_GOBTB_smap_createCharacters.call(this);
}
//==============================
// ** 容器 - 帧刷新
//==============================
var _drill_GOBTB_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GOBTB_scene_update.call(this);
	if( this.isActive() ){
		this.drill_GOBTB_updateRestatistics();		//帧刷新 - 刷新统计
	}
};
//==============================
// ** 容器 - 帧刷新 - 刷新统计
//==============================
Scene_Map.prototype.drill_GOBTB_updateRestatistics = function() {
	if( !$gameTemp._drill_GOBTB_needRestatistics ){ return }
	$gameTemp._drill_GOBTB_needRestatistics = false;
	
	// > 创建时间条贴图
	for(var i=0; i< $gameMap._drill_GOBTB_timeBarTank.length; i++){
		
		// > 非时间条物体时跳过
		var temp_bar = $gameMap._drill_GOBTB_timeBarTank[i];
		if( temp_bar == null ){ continue; }
		
		// > 指向同一个物体时跳过
		var temp_sprite = $gameTemp._drill_GOBTB_spriteTank[i];
		if( temp_sprite != null && temp_sprite._timeBar == temp_bar ){ continue; }
		
		// > 销毁旧贴图
		if( temp_sprite != null ){
			temp_sprite.drill_destroy();	//（执行内部销毁）
			this._spriteset._drill_mapUpArea.removeChild( temp_sprite );
		}
		
		// > 新建贴图
		temp_sprite = new Drill_GOBTB_TimeBarSprite( temp_bar );
		temp_sprite.zIndex = temp_bar._drill_data['zIndex'];	//图片层级
		this._spriteset._drill_mapUpArea.addChild( temp_sprite );
		$gameTemp._drill_GOBTB_spriteTank[i] = temp_sprite;
	}
	this._spriteset.drill_GOBTB_sortByZIndex();
}


//=============================================================================
// ** 时间条贴图【Drill_GOBTB_TimeBarSprite】
//					
//			代码：	> 范围 - 该类显示一个参数条和前景背景。
//					> 结构 - [合并/ ●分离 /混乱] 数据与贴图分离，_timeBar为指向的物体。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 重复添加物体时销毁旧贴图。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 时间条贴图 - 定义
//==============================
function Drill_GOBTB_TimeBarSprite() {
    this.initialize.apply(this, arguments);
};
Drill_GOBTB_TimeBarSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_GOBTB_TimeBarSprite.prototype.constructor = Drill_GOBTB_TimeBarSprite;
//==============================
// * 初始化-设置
//==============================
Drill_GOBTB_TimeBarSprite.prototype.initialize = function( timeBar ) {
    Sprite_Base.prototype.initialize.call(this);
	this._timeBar = timeBar;								//指向时间条物体
	this._meterId = timeBar._drill_data['meter_id'] -1 ; 	//参数条id（记得-1）
	
	this.drill_createBackLayout();
	this.drill_createMeter();
	this.drill_createFrontLayout();
};
//==============================
// * 创建 - 参数条
//==============================
Drill_GOBTB_TimeBarSprite.prototype.drill_createMeter = function() {
	var data = this._timeBar._drill_data;
	
	// > 参数条 数据初始化
	var temp_data = JSON.parse(JSON.stringify( DrillUp.g_COGM_list[ this._meterId ] ));
	temp_data['level_max'] = data['level_max'];			//段上限
	temp_data['x'] = data['meter_x'];					//x
	temp_data['y'] = data['meter_y'];					//y
	temp_data['anchor_x'] = 0.5;						//中心锚点x
	temp_data['anchor_y'] = 0.5;						//中心锚点y
	temp_data['filling_enable'] = false;				//（时间条不需要加满动画）
	
	// > 参数条 贴图初始化
	var temp_sprite = new Drill_COGM_MeterSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_meterSprite = temp_sprite;
}
//==============================
// * 创建 - 背景外框
//==============================
Drill_GOBTB_TimeBarSprite.prototype.drill_createBackLayout = function() {
	var data = this._timeBar._drill_data;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBufferTimeBar( data['frameLower_img'] );
	temp_sprite.x = data['frameLower_x'];
	temp_sprite.y = data['frameLower_y'];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.rotation = data['frameLower_rotation'] / 180 * Math.PI;
	this.addChild( temp_sprite );
	this._drill_backSprite = temp_sprite;
}
//==============================
// * 创建 - 前景外框
//==============================
Drill_GOBTB_TimeBarSprite.prototype.drill_createFrontLayout = function() {
	var data = this._timeBar._drill_data;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBufferTimeBar( data['frameUpper_img'] );
	temp_sprite.x = data['frameUpper_x'];
	temp_sprite.y = data['frameUpper_y'];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.rotation = data['frameUpper_rotation'] / 180 * Math.PI;
	this.addChild( temp_sprite );
	this._drill_frontSprite = temp_sprite;
}
//==============================
// * 销毁 - 执行销毁
//==============================
Drill_GOBTB_TimeBarSprite.prototype.drill_destroy = function() {
	
	// > 参数条销毁
	this._drill_meterSprite.drill_COGM_destroy();
	
	// > 层级销毁
	this.removeChild( this._drill_meterSprite );
	this.removeChild( this._drill_backSprite );
	this.removeChild( this._drill_frontSprite );
	this._drill_meterSprite = null;
	this._drill_backSprite = null;
	this._drill_frontSprite = null;
}

//==============================
// * 帧刷新
//==============================
Drill_GOBTB_TimeBarSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	if( this._timeBar && this._timeBar.isDead() == false ){
		this.visible = true;
		this.drill_GOBTB_updatePos();			//确定位置
		this.drill_GOBTB_updateTimeValue();		//时间数据
	}else{
		this.visible = false;
	}
}
//==============================
// * 帧刷新 - 时间数据
//==============================
Drill_GOBTB_TimeBarSprite.prototype.drill_GOBTB_updateTimeValue = function() {
	
	// > 刷新参数条
	this._drill_meterSprite.drill_COGM_reflashValue( this._timeBar._drill_meterValue );
}

//==============================
// * 帧刷新 - 确定位置
//==============================
Drill_GOBTB_TimeBarSprite.prototype.drill_GOBTB_updatePos = function() {
	var data = this._timeBar._drill_data;
	
	// > 位置
	if( data['bind_eventId'] > 0 ){
		var org_x = data['x'] ;
		var org_y = data['y'] - 48 - 24 ;
		var ev = $gameMap.event( data['bind_eventId'] );
		this.x = org_x + ev.screenX();
		this.y = org_y + ev.screenY();
		
	}else if( data['bind_eventId'] == -2 ){
		var org_x = data['x'] ;
		var org_y = data['y'] - 48 ;
		this.x = org_x + $gamePlayer.screenX();
		this.y = org_y + $gamePlayer.screenY();
		
	}else if( data['bind_tileX'] != -1 ) {
		var org_x = data['x'] ;
		var org_y = data['y'] ;
		this.x = org_x + ($gameMap.adjustX(data['bind_tileX']) +0.5) * $gameMap.tileWidth();
		this.y = org_y + ($gameMap.adjustY(data['bind_tileY']) +0.5) * $gameMap.tileHeight();
	}
	
	// > 透明度
	this.opacity = this._timeBar._drill_opacity;
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeOfBufferTimeBar = false;
		alert(
			"【Drill_GaugeOfBufferTimeBar.js  UI - 缓冲时间条】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGaugeMeter 系统-参数条核心"
		);
}



