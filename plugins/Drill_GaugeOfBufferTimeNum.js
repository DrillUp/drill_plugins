//=============================================================================
// Drill_GaugeOfBufferTimeNum.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        UI - 缓冲时间数字
 * @author Drill_up
 * 
 * @Drill_LE_param "时间数字样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GOBTN_data_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeOfBufferTimeNum +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置一个时间数字，时间结束后会自己消失。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGaugeNumber       系统-参数数字核心
 *     必须基于该插件，才可以绘制时间数字。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   放置在 地图上层 。
 * 2.更多内容可以去看看文档 "13.UI > 关于缓冲时间条与数字.docx"。
 *   其中也有时间数字"从零开始设计"的教程。
 * 细节：
 *   (1.时间数字样式 = 1个参数数字样式 + 2个外框。
 *   (2.时间数字创建后，是一个单独的个体，通过id区分。
 *      你可以创建多个时间数字并绑定到同一事件上。
 *   (3.参数数字对应的参数为时间，单位帧。
 * 参数数字：
 *   (1.参数值：　取决于插件指令，表示剩余时间值。
 *      旋转：　　可自定义。
 *      滚动效果：可自定义。
 *      符号：　　可自定义。
 *      前缀后缀：可自定义。
 *      对齐方式：可自定义。
 *      额定值：　取决于插件指令，表示上限时间值。
 *      额定符号：可自定义。
 *      时间格式：可自定义。
 *   (2.参数数字样式配置在 参数数字核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 时间数字物体：
 *   (1.时间数字物体表示一个放置在地图界面中的独立物体，具有自己的贴图和
 *      时间计时器。
 *   (2.时间数字物体绑定事件或玩家之后，时间参数开始正式计时，
 *      当时间达到持续时间后自动消失。计时期间不受其他条件影响。
 *   (3.如果创建了id相同的时间数字物体，那么后一个物体会覆盖掉前一个物体。
 * 显示值倍率：
 *   (1.显示值倍率是时间数字的内部内容，数字核心没有此参数。
 *   (2.显示值倍率表示显示的时间数字的比。
 *      比如，实际消耗了270帧，倍率0.5时，显示的数字为 270 * 0.5 = 135。
 * 设计：
 *   (1.你可以制作 百分比进度 的数字进度条，比如玩家必须在某个迷宫中
 *      守卫固定的时间时，用百分比表示剩余时间和进度。
 *      但注意，插件功能非常局限单一，只能简单的并行显示一个数字。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__bufferTimeNum （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__bufferTimeNum文件夹。
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
 * 你必须通过下列插件指令来设置时间数字：
 * 
 * 插件指令：>缓冲时间数字 : 创建时间数字[1] : 样式[3] : 持续时间[60] : 显示值倍率[1.00]
 * 插件指令：>缓冲时间数字 : 删除时间数字[1]
 * 
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 绑定于物体 : 玩家
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 绑定于物体 : 本事件
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 绑定于物体 : 事件[10]
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 绑定于物体 : 事件变量[21]
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 绑定于图块 : 位置[10,10]
 * 
 * 1."时间数字[n]"中的n表示时间数字的id，
 *   "样式[3]"对应该插件配置的时间数字样式。
 *   注意，时间数字样式 = 1个参数数字样式 + 2个外框。
 * 2.时间数字创建后，是一个单独的个体，通过id区分。
 *   你可以创建多个时间数字并绑定到同一事件上。
 *   如果"时间数字[1]"已经创建，再执行一次创建，则会将原来的去掉，而覆盖新的。
 * 3.如果创建了id相同的时间数字物体，那么后一个物体会覆盖掉前一个物体。
 * 4.持续时间的单位为帧，如果要60秒，则需填"持续时间[3600]"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以控制时间数字的部分内容：
 * 
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 暂停计时器
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 恢复计时器
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 结束时间播放
 * 
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 设置时间值 : 时间[50]
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 增加时间值 : 时间[+10]
 * 
 * 插件指令：>缓冲时间数字 : 控制时间数字[1] : 修改整体位置平移 : 位置[20,-20]
 * 
 * 1.如果时间数字未被创建，这上述指令都没有效果。
 * 2.设置"暂停计时器"后，时间数字将会一直处于暂停状态，且不会消失。
 *   必须恢复才能继续计时，计时结束自动消失。
 * 3.设置"结束时间播放"后，时间流动将会停止，并逐渐消失。
 * 4."修改整体位置平移"用于控制单独的时间数字位置，
 *   大部分的时间数字是重叠在一起的，需要额外分配位置。
 * 5."设置/增加时间值"会与显示值倍率叠加，比如显示值倍率0.5，时间+10，那么实际
 *   数字只+5。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 根据事件控制
 * 你可以能够设置根据某事件来控制时间数字：
 * 
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 暂停计时器
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 恢复计时器
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 结束时间播放
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 设置时间值 : 时间[50]
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 增加时间值 : 时间[+10]
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 修改整体位置平移 : 位置[20,-20]
 * 
 * 插件指令：>缓冲时间数字 : 本事件 : 所有数字 : 暂停计时器
 * 插件指令：>缓冲时间数字 : 事件[10] : 所有数字 : 暂停计时器
 * 插件指令：>缓冲时间数字 : 事件变量[21] : 所有数字 : 暂停计时器
 * 
 * 1.如果这个事件没有绑定任何 时间数字，则没有效果。
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
 * 测试方法：   在可视化管理层，同时开7个时间数字物体。
 * 测试结果：   200个事件的地图中，消耗为：【32.82ms】
 *              100个事件的地图中，消耗为：【28.24ms】
 *               50个事件的地图中，消耗为：【27.01ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.同时开很多数字都不会有卡顿影响，fps帧率也稳定，并且能够流畅
 *   看到数字变化。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了插件指令在没有创建时间数字时，执行 恢复计时器 出错的bug。
 * [v1.2]
 * 添加了 根据事件 来修改控制参数数字的插件指令。
 * 
 * 
 *
 * @param ---时间数字样式组---
 * @default
 *
 * @param 时间数字样式-1
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-左对齐--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"1","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字光晕-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-2
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-右对齐--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"2","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字光晕-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-3
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-居中--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"3","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字光晕-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-4
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-限宽挤扁--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"10","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"4","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-5
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-限宽挤压--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"10","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"5","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-6
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"6","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-7
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+限额--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"7","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-8
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+只参数红--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"8","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-9
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+限宽--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"9","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-10
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+递减--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递减滚动","图片层级":"12","---参数数字---":"","参数数字样式":"10","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-11
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-斜向--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"11","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字光晕-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"45","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-12
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-扩展符号--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"12","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字光晕-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-13
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-百分比--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"13","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字光晕-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-14
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 * @param 时间数字样式-15
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-点阵板--","---时间数字物体---":"","平移-整体 X":"0","平移-整体 Y":"0","渐变时长":"20","时间数字滚动方式":"递增滚动","图片层级":"12","---参数数字---":"","参数数字样式":"15","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---外框---":"","资源-外框背景":"时间数字点阵板-背景","偏移-外框背景 X":"0","偏移-外框背景 Y":"0","外框背景旋转角度":"0","资源-外框前景":"","偏移-外框前景 X":"0","偏移-外框前景 Y":"0","外框前景旋转角度":"0"}
 * 
 * @param 时间数字样式-16
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 * @param 时间数字样式-17
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 * @param 时间数字样式-18
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-19
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-20
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-21
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-22
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-23
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-24
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-25
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-26
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-27
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-28
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-29
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-30
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-31
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-32
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-33
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-34
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-35
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-36
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-37
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-38
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-39
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 时间数字样式-40
 * @parent ---时间数字样式组---
 * @type struct<BufferTimeNum>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 */
/*~struct~BufferTimeNum:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的时间数字--
 *
 * @param ---时间数字物体---
 * @desc 
 *
 * @param 平移-整体 X
 * @parent ---时间数字物体---
 * @desc 以事件头顶为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-整体 Y
 * @parent ---时间数字物体---
 * @desc 以事件头顶为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * @param 渐变时长
 * @parent ---时间数字物体---
 * @type number
 * @min 1
 * @desc 整个时间数字显现/消失的时长。
 * @default 20
 *
 * @param 时间数字滚动方式
 * @parent ---时间数字物体---
 * @type select
 * @option 递增滚动
 * @value 递增滚动
 * @option 递减滚动
 * @value 递减滚动
 * @desc 时间数字的流动方式。
 * @default 递增滚动
 *
 * @param 图片层级
 * @parent ---时间数字物体---
 * @desc 时间数字所处在的图片层级。
 * @default 12
 *
 * @param ---参数数字---
 * @desc 
 *
 * @param 参数数字样式
 * @parent ---参数数字---
 * @type number
 * @min 0
 * @desc 参数数字核心中对应的样式，对应时间数字本体。
 * @default 0
 *
 * @param 偏移-参数数字 X
 * @parent ---参数数字---
 * @desc 以时间数字物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-参数数字 Y
 * @parent ---参数数字---
 * @desc 以时间数字物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * @param ---外框---
 * @desc 
 *
 * @param 资源-外框背景
 * @parent ---外框---
 * @desc 时间数字的外框图片资源。外框背景处于参数数字下方。
 * @default (需配置)时间数字外框-默认背景
 * @require 1
 * @dir img/Special__bufferTimeNum/
 * @type file
 *
 * @param 偏移-外框背景 X
 * @parent ---外框---
 * @desc 以时间数字物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-外框背景 Y
 * @parent ---外框---
 * @desc 以时间数字物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
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
 * @desc 时间数字的外框图片资源。外框前景处于参数数字上方。
 * @default (需配置)时间数字外框-默认前景
 * @require 1
 * @dir img/Special__bufferTimeNum/
 * @type file
 *
 * @param 偏移-外框前景 X
 * @parent ---外框---
 * @desc 以时间数字物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-外框前景 Y
 * @parent ---外框---
 * @desc 以时间数字物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
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
//		插件简称		GOBTN（Gauge_Of_Buffer_Time_Num）
//		临时全局变量	DrillUp.g_GOBTN_xxx
//		临时局部变量	this._drill_GOBTN_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(物体数)*o(贴图处理) 每帧
//		★性能测试因素	可视化管理层
//		★性能测试消耗	27.01ms 28.24ms
//		★最坏情况		暂无
//		★备注			同时开很多数字都不会有卡顿影响，并且能够稳定地进行数字变化。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			缓冲时间数字：
//				->物体
//					->创建、控制、删除
//					->绑定于物体、图块
//					->时间倒流、暂停
//					->整体位置	
//				->外框
//				->参数数字
//					->重建缓冲
//					->显示值倍率
//					->设置时间值
//					->增加时间值
//
//		★私有类如下：
//			* Drill_GOBTN_GameTimeNum 【时间数字物体】
//			* Drill_GOBTN_TimeNumSprite 【时间数字贴图】
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
//			2."time_ratio"参数，用于控制。
//			  
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeOfBufferTimeNum = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeOfBufferTimeNum');
	
	
	//==============================
	// * 变量获取 - 时间数字样式
	//				（~struct~BufferTimeNum）
	//==============================
	DrillUp.drill_GOBTN_initParam = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["平移-整体 X"] || 0 );
		data['y'] = Number( dataFrom["平移-整体 Y"] || 0 );
		data['opacityTime'] = Number( dataFrom["渐变时长"] || 20 );
		data['flowingType'] = String( dataFrom["时间数字滚动方式"] || "递增滚动" );
		data['zIndex'] = Number( dataFrom["图片层级"] || 0 );
		data['symbol_id'] = Number( dataFrom["参数数字样式"] || 0 );
		data['symbol_x'] = Number( dataFrom["偏移-参数数字 X"] || 0 );
		data['symbol_y'] = Number( dataFrom["偏移-参数数字 Y"] || 0 );
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
	
	
	/*-----------------时间数字样式------------------*/
	DrillUp.g_GOBTN_data_list_length = 40;
	DrillUp.g_GOBTN_data_list = [];
	for (var i = 0; i < DrillUp.g_GOBTN_data_list_length; i++) {
		if( DrillUp.parameters["时间数字样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["时间数字样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["时间数字样式-" + String(i+1) ]);
			DrillUp.g_GOBTN_data_list[i] = DrillUp.drill_GOBTN_initParam( temp );
		}else{
			DrillUp.g_GOBTN_data_list[i] = {};
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGaugeNumber ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialBufferTimeNum = function(filename) {
    return this.loadBitmap('img/Special__bufferTimeNum/', filename, 0, true);
};

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GOBTN_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GOBTN_pluginCommand.call(this, command, args);
	if( command === ">缓冲时间数字" ){
		
		/*-----------------创建/删除------------------*/
		if( args.length == 8){ 	//	>缓冲时间数字 : 创建时间数字[1] : 样式[3] : 持续时间[60] : 显示值倍率[60]
			var bar_id = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( bar_id.indexOf("创建时间数字[") != -1 ){
				bar_id = bar_id.replace("创建时间数字[","");
				bar_id = bar_id.replace("]","");
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("持续时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("显示值倍率[","");
				temp3 = temp3.replace("]","");
				
				var timeNum = $gameMap.drill_GOBTN_createTimeNum( Number(bar_id), Number(temp1)-1, Number(temp2), Number(temp3)  );
				
				// > 默认绑定于本事件
				timeNum.drill_GOBTN_bindEvent( this._eventId );
				return;
			}
		}
		
		/*-----------------对象组获取 - 时间数字------------------*/
		var bar_id = null;
		if( args.length >= 2 ){
			var obj_str = String(args[1]);
			if( obj_str.indexOf("控制时间数字[") != -1 ){
				obj_str = obj_str.replace("控制时间数字[","");
				obj_str = obj_str.replace("]","");
				bar_id = Number(obj_str);
			}
		}
		
		/*-----------------控制时间数字------------------*/
		if( bar_id != null && args.length == 6 ){ 	//	>缓冲时间数字 : 控制时间数字[1] : 绑定于物体 : 本事件
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
					if( $gameMap.drill_GOBTN_isEventExist( e_id ) == false ){ return; }
					var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
					if( timeNum ){
						timeNum.drill_GOBTN_bindEvent( e_id );
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
						var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
						if( timeNum ){
							timeNum.drill_GOBTN_bindTile( Number(temp_arr[0]),Number(temp_arr[1]) );
						}
					}
				}
				return;
			}
		}
		
		/*-----------------可选设定 控制------------------*/
		if( bar_id != null && args.length == 4 ){ 			//	>缓冲时间数字 : 控制时间数字[1] : 暂停计时器
			var temp1 = String(args[3]);
			if( temp1 == "暂停计时器" ){
				var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
				if( timeNum ){
					timeNum._drill_timeBlocked = true;
				}
				return;
			}
			if( temp1 == "恢复计时器" ){
				var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
				if( timeNum ){
					timeNum._drill_timeBlocked = false;
				}
				return;
			}
			if( temp1 == "结束时间播放" ){
				var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
				if( timeNum ){
					timeNum._drill_timeBlocked = false;
					timeNum._drill_data['life_time'] = timeNum._drill_cur_time;		//结束时间 立即变成当前时间
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
						var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
						if( timeNum ){
							timeNum._drill_data['x'] = Number(temp_arr[0]);
							timeNum._drill_data['y'] = Number(temp_arr[1]);
						}
					}
				}
				return;
			}
			
			if( temp1 == "设置时间值" ){
				if( temp2.indexOf("时间[") != -1 ){
					temp2 = temp2.replace("时间[","");
					temp2 = temp2.replace("]","");
					var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
					if( timeNum ){
						timeNum._drill_cur_time = Number(temp2);
					}
				}
				return;
			}
			if( temp1 == "增加时间值" ){
				if( temp2.indexOf("时间[") != -1 ){
					temp2 = temp2.replace("时间[","");
					temp2 = temp2.replace("]","");
					var timeNum = $gameMap.drill_GOBTN_getTimeNumById( Number(bar_id) );
					if( timeNum ){
						timeNum._drill_cur_time += Number(temp2);
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
			if( temp1 == "所有数字" && temp2 == "暂停计时器" ){
				var timeNum_list = $gameMap.drill_GOBTN_getTimeNumListByEventId( e_id );
				for( var i=0; i < timeNum_list.length; i++ ){
					timeNum_list[i]._drill_timeBlocked = true;
				}
				return;
			}
			if( temp1 == "所有数字" && temp2 == "恢复计时器" ){
				var timeNum_list = $gameMap.drill_GOBTN_getTimeNumListByEventId( e_id );
				for( var i=0; i < timeNum_list.length; i++ ){
					timeNum_list[i]._drill_timeBlocked = false;
				}
				return;
			}
			if( temp1 == "所有数字" && temp2 == "结束时间播放" ){
				var timeNum_list = $gameMap.drill_GOBTN_getTimeNumListByEventId( e_id );
				for(var i=0; i < timeNum_list.length; i++ ){
					var timeNum = timeNum_list[i];
					timeNum._drill_timeBlocked = false;
					timeNum._drill_data['life_time'] = timeNum._drill_cur_time;		//结束时间 立即变成当前时间
				}
				return;
			}
		}
		if( e_id != null && args.length == 8 ){ 	
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( temp1 == "所有数字" && temp2 == "修改整体位置平移" ){
				if( temp3.indexOf("位置[") != -1 ){
					temp3 = temp3.replace("位置[","");
					temp3 = temp3.replace("]","");
					var temp_arr = temp3.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var timeNum_list = $gameMap.drill_GOBTN_getTimeNumListByEventId( e_id );
						for(var i=0; i < timeNum_list.length; i++ ){
							var timeNum = timeNum_list[i];
							timeNum._drill_data['x'] = Number(temp_arr[0]);
							timeNum._drill_data['y'] = Number(temp_arr[1]);
						}
					}
				}
				return;
			}
			if( temp1 == "所有数字" && temp2 == "设置时间值" ){
				if( temp3.indexOf("时间[") != -1 ){
					temp3 = temp3.replace("时间[","");
					temp3 = temp3.replace("]","");
					var timeNum_list = $gameMap.drill_GOBTN_getTimeNumListByEventId( e_id );
					for(var i=0; i < timeNum_list.length; i++ ){
						var timeNum = timeNum_list[i];
						timeNum._drill_cur_time = Number(temp3);
					}
				}
				return;
			}
			if( temp1 == "所有数字" && temp2 == "增加时间值" ){
				if( temp3.indexOf("时间[") != -1 ){
					temp3 = temp3.replace("时间[","");
					temp3 = temp3.replace("]","");
					var timeNum_list = $gameMap.drill_GOBTN_getTimeNumListByEventId( e_id );
					for(var i=0; i < timeNum_list.length; i++ ){
						var timeNum = timeNum_list[i];
						timeNum._drill_cur_time += Number(temp3);
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
Game_Map.prototype.drill_GOBTN_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	if( e_id == -2 ){ return true; }	//玩家
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_GaugeOfBufferTimeNum.js UI - 缓冲时间数字】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 时间数字物体【Drill_GOBTN_GameTimeNum】
//
//=============================================================================
//==============================
// * 时间数字物体 - 定义
//==============================
function Drill_GOBTN_GameTimeNum() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 时间数字物体 - 初始化
//==============================
Drill_GOBTN_GameTimeNum.prototype.initialize = function( data ) {
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	var data = this._drill_data;
	//alert(JSON.stringify(data));
	
	// > 默认值
	if( data['x'] == undefined ){ data['x'] = 0 };											//主体 - x
	if( data['y'] == undefined ){ data['y'] = 0 };											//主体 - y
	if( data['opacityTime'] == undefined ){ data['opacityTime'] = 30 };						//主体 - 渐变时长
	if( data['flowingType'] == undefined ){ data['flowingType'] = "递增滚动" };				//主体 - 时间数字滚动方式
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };								//主体 - 图片层级
	if( data['symbol_id'] == undefined ){ data['symbol_id'] = 0 };							//参数数字 - id
	if( data['symbol_x'] == undefined ){ data['symbol_x'] = 0 };							//参数数字 - x
	if( data['symbol_y'] == undefined ){ data['symbol_y'] = 0 };							//参数数字 - y
	if( data['frameLower_img'] == undefined ){ data['frameLower_img'] = 0 };				//外框 - 背景资源
	if( data['frameLower_x'] == undefined ){ data['frameLower_x'] = 0 };					//外框 - 背景x
	if( data['frameLower_y'] == undefined ){ data['frameLower_y'] = 0 };					//外框 - 背景y
	if( data['frameLower_rotation'] == undefined ){ data['frameLower_rotation'] = 0 };		//外框 - 旋转角度
	if( data['frameUpper_img'] == undefined ){ data['frameUpper_img'] = 0 };				//外框 - 前景资源
	if( data['frameUpper_x'] == undefined ){ data['frameUpper_x'] = 0 };					//外框 - 前景x
	if( data['frameUpper_y'] == undefined ){ data['frameUpper_y'] = 0 };					//外框 - 前景y
	if( data['frameUpper_rotation'] == undefined ){ data['frameUpper_rotation'] = 0 };		//外框 - 旋转角度
	
	// > 插件指令控制值
	if( data['life_time'] == undefined ){ data['life_time'] = 30 };							//主体 - 持续时间
	if( data['time_ratio'] == undefined ){ data['time_ratio'] = 1.0 };						//主体 - 显示值倍率
	if( data['bind_eventId'] == undefined ){ data['bind_eventId'] = -1 };					//定位 - 绑定的事件
	if( data['bind_tileX'] == undefined ){ data['bind_tileX'] = -1 };						//定位 - 绑定的图块x
	if( data['bind_tileY'] == undefined ){ data['bind_tileY'] = -1 };						//定位 - 绑定的图块y
	
	
	// > 私有对象初始化
	this._drill_enable = true;					//启用
	this._drill_cur_time = 0;					//当前时间
	this._drill_opacity = 0;					//透明度
	this._drill_symbolValue = 0;				//参数数字值
	this._drill_timeStarted = false;			//时间开始
	this._drill_timeBlocked = false;			//时间暂停
}

//==============================
// * 时间数字物体 - 帧刷新
//==============================
Drill_GOBTN_GameTimeNum.prototype.update = function() {
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
	else if( this._drill_cur_time >= data['life_time'] ){
		this._drill_opacity = 255 - 255 * ( this._drill_cur_time - data['life_time'] )/ data['opacityTime'] ;
	}else{
		this._drill_opacity = 255;
	}
	
	// > 参数数字值
	if( data['flowingType'] == "递增滚动" ){
		this._drill_symbolValue = this._drill_cur_time; 
		if( this.isTimeEnded() ){ this._drill_symbolValue = data['life_time']; }
		this._drill_symbolValue = Math.round( this._drill_symbolValue * data['time_ratio'] );
	}
	if( data['flowingType'] == "递减滚动" ){ 
		this._drill_symbolValue = data['life_time'] - this._drill_cur_time; 
		if( this.isTimeEnded() ){ this._drill_symbolValue = 0; }
		this._drill_symbolValue = Math.round( this._drill_symbolValue * data['time_ratio'] );
	}
	
	// > 销毁对象
	if( this.isDead() ){
		data['bind_eventId'] = -1;
		data['bind_tileX'] = -1;
		data['bind_tileY'] = -1;
	}
}
//==============================
// * 时间数字物体 - 时间结束
//==============================
Drill_GOBTN_GameTimeNum.prototype.isTimeEnded = function() {
	var data = this._drill_data;
	return this._drill_cur_time > data['life_time'];
}
//==============================
// * 时间数字物体 - 寿命
//==============================
Drill_GOBTN_GameTimeNum.prototype.isDead = function() {
	var data = this._drill_data;
	return this._drill_cur_time > data['life_time'] + data['opacityTime'];
}
//==============================
// * 时间数字物体 - 绑定于物体
//==============================
Drill_GOBTN_GameTimeNum.prototype.drill_GOBTN_bindEvent = function( event_id ) {
	var data = this._drill_data;
	data['bind_eventId'] = event_id;
	this._drill_timeStarted = true;
}
//==============================
// * 时间数字物体 - 绑定于图块
//==============================
Drill_GOBTN_GameTimeNum.prototype.drill_GOBTN_bindTile = function( tileX, tileY ) {
	var data = this._drill_data;
	data['bind_tileX'] = tileX;
	data['bind_tileY'] = tileY;
	this._drill_timeStarted = true;
}

//=============================================================================
// ** 时间数字物体容器
//=============================================================================
//==============================
// * 容器 - 切换地图时
//==============================
Game_Map.prototype.drill_GOBTN_resetTimeNums = function() {
	this._drill_GOBTN_timeNumTank = [];
};
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_GOBTN_timeNum_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_GOBTN_timeNum_update.call(this,sceneActive);
	if( sceneActive ){
		this.drill_GOBTN_updateTimeNum();
	}
};
Game_Map.prototype.drill_GOBTN_updateTimeNum = function() {
	for(var i = 0; i < this._drill_GOBTN_timeNumTank.length; i++ ){
		var tb = this._drill_GOBTN_timeNumTank[i];
		if( tb == null ){ continue; }
		
		// > 帧刷新
		tb.update();
		
		// > 过时间销毁（销毁不会主动去掉贴图，而是重刷时，贴图会被清理）
		if( tb.isDead() ){
			this.drill_GOBTN_deleteTimeNum(i);
		}
	}
}
//==============================
// * 容器 - 创建物体
//==============================
Game_Map.prototype.drill_GOBTN_createTimeNum = function( bar_id, barSprite_id, life_time, time_ratio ) {
	this._drill_GOBTN_timeNumTank[ bar_id ] = null;
	
	// > 时间数字 样式+配置 初始化
	var data = DrillUp.g_GOBTN_data_list[ barSprite_id ];
	data['life_time'] = life_time;
	data['time_ratio'] = time_ratio;		
	
	// > 创建时间数字
	var obj = new Drill_GOBTN_GameTimeNum( data );
	this._drill_GOBTN_timeNumTank[ bar_id ] = obj;
	$gameTemp._drill_GOBTN_needRestatistics = true;
	return obj;
};
//==============================
// * 容器 - 获取物体
//==============================
Game_Map.prototype.drill_GOBTN_getTimeNumById = function( bar_id ){
	return this._drill_GOBTN_timeNumTank[ bar_id ];
}
//==============================
// * 容器 - 获取物体（根据事件）
//==============================
Game_Map.prototype.drill_GOBTN_getTimeNumListByEventId = function( e_id ){
	var result = [];
	for( var i=0; i < this._drill_GOBTN_timeNumTank.length; i++ ){
		var timeNum = this._drill_GOBTN_timeNumTank[i];
		if( timeNum == undefined ){ continue; }
		if( timeNum._drill_data['bind_eventId'] == -1 ){ continue; }
		if( timeNum._drill_data['bind_eventId'] != e_id ){ continue; }
		result.push( timeNum );
	}
	return result;
}
//==============================
// * 容器 - 删除物体
//==============================
Game_Map.prototype.drill_GOBTN_deleteTimeNum = function( bar_id ) {
	this._drill_GOBTN_timeNumTank[ bar_id ] = null;
	$gameTemp._drill_GOBTN_needRestatistics = true;
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_GOBTN_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GOBTN_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Spriteset_Map.prototype.drill_GOBTN_sortByZIndex = function() {
	this._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// ** 贴图容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_GOBTN_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_GOBTN_temp_initialize.call(this);
	this._drill_GOBTN_spriteTank = [];
	this._drill_GOBTN_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_GOBTN_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_GOBTN_spriteTank = [];
	$gameTemp._drill_GOBTN_needRestatistics = true;
	this.drill_GOBTN_resetTimeNums();
	_drill_GOBTN_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_GOBTN_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_GOBTN_spriteTank = [];
	$gameTemp._drill_GOBTN_needRestatistics = true;
	_drill_GOBTN_smap_createCharacters.call(this);
}
//==============================
// ** 容器 - 帧刷新
//==============================
var _drill_GOBTN_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GOBTN_scene_update.call(this);
	if( this.isActive() ){
		this.drill_GOBTN_updateRestatistics();		//帧刷新 - 刷新统计
	}
};
//==============================
// ** 容器 - 帧刷新 - 刷新统计
//==============================
Scene_Map.prototype.drill_GOBTN_updateRestatistics = function() {
	if( !$gameTemp._drill_GOBTN_needRestatistics ){ return }
	$gameTemp._drill_GOBTN_needRestatistics = false;
	
	// > 创建时间数字贴图
	for(var i=0; i< $gameMap._drill_GOBTN_timeNumTank.length; i++){
		
		// > 非时间数字物体时跳过
		var temp_bar = $gameMap._drill_GOBTN_timeNumTank[i];
		if( temp_bar == null ){ continue; }
		
		// > 指向同一个物体时跳过
		var temp_sprite = $gameTemp._drill_GOBTN_spriteTank[i];
		if( temp_sprite != null && temp_sprite._timeNum == temp_bar ){ continue; }
		
		// > 销毁旧贴图
		if( temp_sprite != null ){
			temp_sprite.drill_destroy();	//（执行内部销毁）
			this._spriteset._drill_mapUpArea.removeChild( temp_sprite );
		}
		
		// > 新建贴图
		temp_sprite = new Drill_GOBTN_TimeNumSprite( temp_bar );
		temp_sprite.zIndex = temp_bar._drill_data['zIndex'];	//图片层级
		this._spriteset._drill_mapUpArea.addChild( temp_sprite );
		$gameTemp._drill_GOBTN_spriteTank[i] = temp_sprite;
	}
	this._spriteset.drill_GOBTN_sortByZIndex();
}


//=============================================================================
// ** 时间数字贴图【Drill_GOBTN_TimeNumSprite】
//					
//			代码：	> 范围 - 该类显示一个参数数字和前景背景。
//					> 结构 - [合并/ ●分离 /混乱] 数据与贴图分离，_timeNum为指向的物体。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 重复添加物体时销毁旧贴图。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 时间数字贴图 - 定义
//==============================
function Drill_GOBTN_TimeNumSprite() {
    this.initialize.apply(this, arguments);
};
Drill_GOBTN_TimeNumSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_GOBTN_TimeNumSprite.prototype.constructor = Drill_GOBTN_TimeNumSprite;
//==============================
// * 初始化-设置
//==============================
Drill_GOBTN_TimeNumSprite.prototype.initialize = function( timeNum ) {
    Sprite_Base.prototype.initialize.call(this);
	this._timeNum = timeNum;								//指向时间数字物体
	this._symbolId = timeNum._drill_data['symbol_id'] -1 ; 	//参数数字id（记得-1）
	
	this.drill_createBackLayout();
	this.drill_createNumber();
	this.drill_createFrontLayout();
};
//==============================
// * 创建 - 参数数字
//==============================
Drill_GOBTN_TimeNumSprite.prototype.drill_createNumber = function() {
	var data = this._timeNum._drill_data;
	
	// > 参数数字 数据初始化
	var temp_data = JSON.parse(JSON.stringify( DrillUp.g_COGN_list[ this._symbolId ] ));
	temp_data['x'] = data['symbol_x'];					//x
	temp_data['y'] = data['symbol_y'];					//y
	
	// > 参数数字 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_symbolSprite = temp_sprite;
}
//==============================
// * 创建 - 背景外框
//==============================
Drill_GOBTN_TimeNumSprite.prototype.drill_createBackLayout = function() {
	var data = this._timeNum._drill_data;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBufferTimeNum( data['frameLower_img'] );
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
Drill_GOBTN_TimeNumSprite.prototype.drill_createFrontLayout = function() {
	var data = this._timeNum._drill_data;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBufferTimeNum( data['frameUpper_img'] );
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
Drill_GOBTN_TimeNumSprite.prototype.drill_destroy = function() {
	
	// > 参数条销毁
	this._drill_symbolSprite.drill_COGN_destroy();
	
	// > 层级销毁
	this.removeChild( this._drill_symbolSprite );
	this.removeChild( this._drill_backSprite );
	this.removeChild( this._drill_frontSprite );
	this._drill_symbolSprite = null;
	this._drill_backSprite = null;
	this._drill_frontSprite = null;
}

//==============================
// * 帧刷新
//==============================
Drill_GOBTN_TimeNumSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	if( this._timeNum && this._timeNum.isDead() == false ){
		this.visible = true;
		this.drill_GOBTN_updatePos();			//确定位置
		this.drill_GOBTN_updateTimeValue();		//时间数据
	}else{
		this.visible = false;
	}
}
//==============================
// * 帧刷新 - 时间数据
//==============================
Drill_GOBTN_TimeNumSprite.prototype.drill_GOBTN_updateTimeValue = function() {
	
	// > 刷新参数数字
	this._drill_symbolSprite.drill_COGN_reflashValue( this._timeNum._drill_symbolValue );
}

//==============================
// * 帧刷新 - 确定位置
//==============================
Drill_GOBTN_TimeNumSprite.prototype.drill_GOBTN_updatePos = function() {
	var data = this._timeNum._drill_data;
	
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
	this.opacity = this._timeNum._drill_opacity;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeOfBufferTimeNum = false;
		alert(
			"【Drill_GaugeOfBufferTimeNum.js  UI - 缓冲时间数字】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGaugeNumber 系统-参数数字核心"
		);
}



