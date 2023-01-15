//=============================================================================
// Drill_EventClosingTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体触发 - 固定区域 & 事件接近 & 条件触发
 * @author Drill_up
 * 
 * @Drill_LE_param "事件触发-%d"
 * @Drill_LE_parentKey "---事件触发组%d至%d---"
 * @Drill_LE_var "DrillUp.g_ECT_area_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventClosingTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得地图事件能够自动触发 范围内+特定条件下 的事件的独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFixedArea        物体触发 - 固定区域核心★★v1.7及以上★★
 *     该插件需要固定区域才能进行区域触发。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.更多相关内容，去看看 "9.物体触发 > 关于事件接近触发.docx"。
 *   触发区域相关，去看看 "9.物体触发 > 关于物体触发-固定区域.docx"。
 * 传感器：
 *   (1.接近触发被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      当玩家的特定范围覆盖到事件时，独立开关会自动开启。
 *   (2.接近触发的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 区域主体：
 *   (1.该插件的区域主体是玩家，用于自动触发接近玩家区域的事件。
 *   (2.主动触发是一个区域范围，被触发是一个点，区域内符合条件的点会被触发。
 *      注意，这里玩家是主体，区域会一直跟着玩家，事件是点。
 * 区域可视化：
 *   (1.该插件提供了DEBUG区域显示功能，显示的区域能根据朝向和筛选器而变化。
 *      注意，仅用于测试查看用，并且DEBUG显示非常消耗性能，要记得随时关闭。
 * 细节：
 *   (1.事件触发 是连续不间断的。
 *   (2.你可以自定义条件关键字，用于连接事件与其他的被触发事件。
 * 设计：
 *   (1.目标事件触发 指目标事件进入范围后，触发目标事件的独立开关。
 *      比如，目标事件 进入主动事件范围内的雷区/尖刺地形，能够触发目标事件，
 *      让其执行事件页，受到相应的范围伤害。
 *      在比如，玩家操作一个人偶事件，让人偶代替玩家实现"玩家接近"的功能。
 *   (2.主动事件触发 指玩家/目标事件进入范围后触发 主动事件自身 的独立开关。
 *      你可以理解为事件看到有人来了，于是做出反应。只有用 筛选器 或 区域触
 *      发锁，才能让 主动事件 选择性忽视看见某些人。
 *      比如，某些潜入关卡的设计，守卫的视野范围会经过筛选器，筛选掉阴暗的
 *      角落图块，以便玩家藏身。若玩家被守卫看见，则激活独立开关，执行玩家
 *      被抓的事件流程。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件接近范围
 * 如果你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>事件接近范围 : 添加范围 : 与本事件距离1
 * 事件注释：=>事件接近范围 : 添加范围 : 事件触发[1]
 * 
 * 1.事件身上可以添加很多范围注释，用于应对多种触发方式。
 * 2.注释中的范围，你可以写对应的序号，也可以直接写关键字。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 被触发
 * 如果你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>被触发 : 事件前1格 : 触发独立开关 : A
 * 事件注释：=>被触发 : 事件前2格 : 触发独立开关 : A
 * 事件注释：=>被触发 : 事件前1格 : 离开范围时自动OFF
 * 事件注释：=>被触发 : 事件前2格 : 离开范围时自动OFF
 *
 * 插件指令：>被触发 : 本事件 : 设置条件 : 事件前1格 : 触发独立开关 : A
 * 插件指令：>被触发 : 事件[10] : 设置条件 : 事件前1格 : 触发独立开关 : A
 * 插件指令：>被触发 : 事件变量[10] : 设置条件 : 事件前1格 : 触发独立开关 : A
 * 插件指令：>被触发 : 批量事件[10,11,12] : 设置条件 : 事件前1格 : 触发独立开关 : A
 * 
 * 插件指令：>被触发 : 本事件 : 设置条件 : 事件前1格 : 触发独立开关 : A
 * 插件指令：>被触发 : 本事件 : 设置条件 : 事件前1格 : 离开范围时自动OFF
 * 插件指令：>被触发 : 本事件 : 去除条件 : 事件前1格
 * 插件指令：>被触发 : 本事件 : 去除全部条件
 * 
 * 1.其中"事件前1格"是完全可以自定义的条件关键字。
 *   设置后，如果设置的条件关键字与被动的对应上，将会触发开启独立开关。
 * 2.插件指令的 前半部分(本事件)和后半部分(设置条件)的参数可以随意组合。
 *   一共有4*4种组合方式。
 * 3.该插件注释与 条件触发 的注释结构一样，注意关键字的唯一性，不要混淆了。
 * 4.注意，因为该插件为连续触发，所以对范围进入与离开有监听。
 *   条件触发插件 为只触发一次情况，所以不具备该功能。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 事件触发设置
 * 你可以对事件的自动触发进行全控制：
 * （注意，冒号左右有一个空格）
 *
 * 插件指令：>事件接近主动触发 : 关闭触发 : 事件触发[2]
 * 插件指令：>事件接近主动触发 : 开启触发 : 事件触发[2]
 *
 * 1.数字对应你在事件范围中配置的触发，你也可以初始关闭某些触发，后期通过
 *   插件指令开启。
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
 * 时间复杂度： o(nlogn)+o(n^2) 每帧
 * 测试方法：   在遇敌管理层进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【43.24ms】
 *              100个事件的地图中，平均消耗为：【30.46ms】
 *               50个事件的地图中，平均消耗为：【24.21ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.事件接近插件开发出来的时间比较晚，（玩家接近已经v2.1版本）
 *   因此直接使用了 玩家接近 的棋盘算法思路。相对性能消耗较少。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param DEBUG-触发区域显示
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后，事件的触发区域将会被显示出来，用于排查触发问题。
 * @default false
 * 
 * @param DEBUG-第一个区域颜色
 * @parent DEBUG-触发区域显示
 * @desc 当开启DEBUG调试时，事件添加范围后，第一个区域的显示颜色。
 * @default #00ffff
 * 
 * @param DEBUG-第二个区域颜色
 * @parent DEBUG-触发区域显示
 * @desc 当开启DEBUG调试时，事件添加范围后，第二个区域的显示颜色。
 * @default #ff00ff
 * 
 * @param DEBUG-第三个区域颜色
 * @parent DEBUG-触发区域显示
 * @desc 当开启DEBUG调试时，事件添加范围后，第三个区域的显示颜色。
 * @default #ffff00
 * 
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，没有完全离开触发区域的事件也会被捕获到，并触发。
 * @default true
 * 
 * @param ---事件触发组 1至20---
 * @desc 
 * 
 * @param 事件触发-1
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default {"标签":"==事件前1格==","初始是否开启":"true","触发关键字":"事件前1格","区域模式":"自定义区域","形状区域":"方形区域","形状区域范围":"1","自定义区域编号":"11","区域触发锁":"只玩家才能触发","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 事件触发-2
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default {"标签":"==事件前2格==","初始是否开启":"true","触发关键字":"事件前2格","区域模式":"自定义区域","形状区域":"方形区域","形状区域范围":"1","自定义区域编号":"12","区域触发锁":"只玩家才能触发","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 事件触发-3
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default {"标签":"==事件前3格==","初始是否开启":"true","触发关键字":"事件前3格","区域模式":"自定义区域","形状区域":"方形区域","形状区域范围":"1","自定义区域编号":"13","区域触发锁":"只玩家才能触发","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 事件触发-4
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default {"标签":"==事件前4格==","初始是否开启":"true","触发关键字":"事件前4格","区域模式":"自定义区域","形状区域":"方形区域","形状区域范围":"1","自定义区域编号":"14","区域触发锁":"只玩家才能触发","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 事件触发-5
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default {"标签":"==事件前5格==","初始是否开启":"true","触发关键字":"事件前5格","区域模式":"自定义区域","形状区域":"方形区域","形状区域范围":"1","自定义区域编号":"15","区域触发锁":"只玩家才能触发","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 事件触发-6
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default {"标签":"==事件小扇形==","初始是否开启":"true","触发关键字":"事件小扇形","区域模式":"自定义区域","形状区域":"方形区域","形状区域范围":"1","自定义区域编号":"2","区域触发锁":"只玩家才能触发","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 事件触发-7
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-8
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-9
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-10
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-11
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-12
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-13
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-14
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-15
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-16
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-17
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-18
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-19
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-20
 * @parent ---事件触发组 1至20---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 * 
 * @param ---事件触发组21至40---
 * @desc 
 *
 * @param 事件触发-21
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-22
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-23
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-24
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-25
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-26
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-27
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-28
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-29
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-30
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-31
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-32
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-33
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-34
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-35
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-36
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-37
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-38
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-39
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 *
 * @param 事件触发-40
 * @parent ---事件触发组21至40---
 * @type struct<ATriArea>
 * @desc 编辑事件的接近触发设置。
 * @default 
 */
/*~struct~ATriArea:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的事件触发设置==
 *
 * @param 初始是否开启
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 触发关键字
 * @desc 触发的条件关键字。范围内+条件关键字 同时满足即可触发事件。
 * @default 关键字
 * 
 * @param 区域模式
 * @type select
 * @option 形状区域
 * @value 形状区域
 * @option 自定义区域
 * @value 自定义区域
 * @desc 选择不同的区域将对应下面不同的配置。
 * @default 形状区域
 * 
 * @param 区域触发锁
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 只玩家才能触发
 * @value 只玩家才能触发
 * @option 只事件才能触发
 * @value 只事件才能触发
 * @desc 选择不同的区域将对应下面不同的配置。
 * @default 只玩家才能触发
 * 
 * @param 形状区域
 * @parent 区域模式
 * @type select
 * @option 方形区域
 * @value 方形区域
 * @option 菱形区域
 * @value 菱形区域
 * @option 圆形区域
 * @value 圆形区域
 * @option 十字区域
 * @value 十字区域
 * @option 横条区域
 * @value 横条区域
 * @option 竖条区域
 * @value 竖条区域
 * @desc 选择不同的区域将对应下面不同的配置。
 * @default 方形区域
 *
 * @param 形状区域范围
 * @parent 区域模式
 * @type number
 * @min 0
 * @desc 方形或菱形区域的范围。
 * @default 1
 * 
 * @param 自定义区域编号
 * @parent 区域模式
 * @type number
 * @min 1
 * @desc 对应固定区域核心中对应的自定义区域。
 * @default 1
 *
 * @param 是否开启筛选器
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default false
 * 
 * @param 筛选器编号
 * @parent 是否开启筛选器
 * @type number
 * @min 1
 * @desc 对应固定区域核心中对应的自定义区域。
 * @default 1
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ECT（Event_Auto_Trigger）
//		临时全局变量	DrillUp.g_ECT_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_ECT_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(nlogn)+o(n^2)	每帧	【棋盘算法】
//		★性能测试因素1	对话管理层，6个有棋盘且挤在附近的事件
//		★性能测试消耗1	24.21ms（drill_ECT_updateEventTrigger）
//		★性能测试因素2	遇敌管理层，12个有棋盘的事件
//		★性能测试消耗2	23.15ms（drill_ECT_updateEventTrigger）30.46ms（drill_ECT_getEventsInRange）
//		★最坏情况		设置了大量事件，并在棋盘范围内触发。
//		★备注			高配本和低配本都能保持正常的低消耗。
//		
//		★优化记录		暂无
//		
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件接近触发：
//				->指令
//					->插件指令
//					->事件注释
//				->主动事件 接近棋盘
//					->创建棋盘
//						->形状区域
//						->自定义区域
//					->最大触发距离
//						->正方形棋盘（考虑到朝向变化）
//				->排序（折半查找）
//					->X轴排序
//					->Y轴排序
//				->主动事件 触发
//					->棋盘内
//						> 棋盘点数据
//						> 棋盘筛选器
//						> 主动事件触发 - 开关
//						> 主动事件触发 - 关键字
//						> 目标事件触发 - 开关
//						> 目标事件触发 - 关键字
//					->棋盘外
//					->子流程
//						->选择性关闭 自关标记
//						->关闭所有 自关标记
//						->触发指定事件的条件
//					->执行触发
//				->事件条件数据
//					> 条件集
//					> 对应的独立开关
//					> 自关标记
//					->玩家对象排除
//				->事件已触发容器
//					->记录事件
//			
//		★必要注意事项：
//			1.这里的算法，与 事件接近触发 中的算法同步，具体去看 事件接近触发 插件。
//			2.插件有三个对象： 主动事件，棋盘范围，目标事件
//			  触发有两种：	目标事件进入棋盘范围 -> 目标事件开开关
//							目标事件进入棋盘范围 -> 主动事件开开关
//			  主动事件自身是棋盘范围的所有者，但不与棋盘范围交互。
//			3.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			
//		★其它说明细节：
//			暂无
//				
//		★存在的问题：
//			暂无
//	

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventClosingTrigger = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventClosingTrigger');
	
	
	//==============================
	// * 变量获取 - 事件触发
	//				（~struct~ATriArea）
	//==============================
	DrillUp.drill_ECT_areaInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['keyword'] = String( dataFrom["触发关键字"] || "");
		data['triggerMode'] = String( dataFrom["区域触发锁"] || "只玩家才能触发");
		data['areaMode'] = String( dataFrom["区域模式"] || "形状区域");
		
		// > 形状区域
		data['shapeMode'] = String( dataFrom["形状区域"] || "方形区域");
		data['shapeRange'] = Number( dataFrom["形状区域范围"] || 1);
		
		// > 自定义区域
		data['self_id'] = Number( dataFrom["自定义区域编号"] || 1);
		
		// > 筛选器
		data['condition_enable'] = String( dataFrom["是否开启筛选器"] ||  "true") == "true";
		data['condition_id'] = Number( dataFrom["筛选器编号"] || 1);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_ECT_debugEnabled = String(DrillUp.parameters['DEBUG-触发区域显示'] || "false") === "true";
	DrillUp.g_ECT_debugColor1 = String(DrillUp.parameters['DEBUG-第一个区域颜色'] || "#00ffff");
	DrillUp.g_ECT_debugColor2 = String(DrillUp.parameters['DEBUG-第二个区域颜色'] || "#ff00ff");
	DrillUp.g_ECT_debugColor3 = String(DrillUp.parameters['DEBUG-第三个区域颜色'] || "#ffff00");
	DrillUp.g_ECT_fix = String(DrillUp.parameters['是否修正区域判定'] || "true") === "true";//几乎没有不修正的需求，所以直接修正
	
	/*-----------------事件触发组------------------*/
	DrillUp.g_ECT_area_length = 40;
	DrillUp.g_ECT_area = [];
	for( var i = 0; i < DrillUp.g_ECT_area_length; i++ ){
		if( DrillUp.parameters["事件触发-" + String(i+1) ] != "" &&
			DrillUp.parameters["事件触发-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["事件触发-" + String(i+1) ]);
			DrillUp.g_ECT_area[i] = DrillUp.drill_ECT_areaInit( data );
			DrillUp.g_ECT_area[i]['id'] = i;
		}else{
			DrillUp.g_ECT_area[i] = null;
		}
	}
	
	/*-----------------检查关键字 重复情况------------------*/
	DrillUp.g_ECT_area_keyWordList = [];
	for(var i = 0; i < DrillUp.g_ECT_area.length; i++ ){
		var area = DrillUp.g_ECT_area[i];
		if( area == undefined ){ continue; }
		if( DrillUp.g_ECT_area_keyWordList.contains(area['keyword']) ){
			alert(
				"【Drill_EventClosingTrigger.js 物体触发 - 固定区域 & 事件接近 & 条件触发】\n"+
				"错误，事件触发-"+String(i+1)+"的触发关键字，与之前的设置重复，你需要手动修改确保 触发关键字 唯一。"
			);
			continue;
		}
		DrillUp.g_ECT_area_keyWordList.push( area['keyword'] );
	}
	
	//==============================
	// * 数据 - 根据触发关键字获取事件触发
	//==============================
	DrillUp.drill_ECT_getAreaByKeyword = function( keyword ){
		for(var i=0; i < this.g_ECT_area.length; i++){
			var area = this.g_ECT_area[i];
			if( area == undefined ){ continue; }
			if( area['keyword'] == keyword ){
				return area;
			}
		}
		return null;
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFixedArea ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ECT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ECT_pluginCommand.call(this, command, args);
	
	/*-----------------被触发------------------*/
	if( command === ">被触发" ){
		var e_ids = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( unit == "本事件" ){
				e_ids = [ this._eventId ];
			}else if( unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}else if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}else if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
		}
		
		if( e_ids && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除全部条件" ){
				for( var k=0; k < e_ids.length; k++ ){
					if( $gameMap.drill_ECT_isEventExist( e_ids[k] ) == false ){ continue; }
					var e = $gameMap.event( e_ids[k] );
					e.drill_ECT_removeAllTag();
				}
			}
		}
		if( e_ids && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "去除条件" ){
				for( var k=0; k < e_ids.length; k++ ){
					if( $gameMap.drill_ECT_isEventExist( e_ids[k] ) == false ){ continue; }
					var e = $gameMap.event( e_ids[k] );
					e.drill_ECT_removeTag( temp2 );
				}
			}
		}
		if( e_ids && args.length == 10 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			var temp4 = String(args[9]);
			if( type == "设置条件" ){
				if( temp3 == "触发独立开关"){
					for( var k=0; k < e_ids.length; k++ ){
						if( $gameMap.drill_ECT_isEventExist( e_ids[k] ) == false ){ continue; }
						var e = $gameMap.event( e_ids[k] );
						e.drill_ECT_addTag( temp2, temp4 );
					}
				}
			}
		}
		if( e_ids && args.length == 8 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "设置条件" ){
				if( temp3 == "离开范围时自动OFF"){
					for( var k=0; k < e_ids.length; k++ ){
						if( $gameMap.drill_ECT_isEventExist( e_ids[k] ) == false ){ continue; }
						var e = $gameMap.event( e_ids[k] );
						e.drill_ECT_setAutoOff( temp2, true );
					}
				}
			}
		}
	}
	
	/*-----------------事件接近主动触发------------------*/
	if( command === ">事件接近主动触发" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("事件触发[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) -1;
			if( type == "开启触发" ){
				$gameSystem._drill_ECT_enables[temp1] = true;
			}
			if( type == "关闭触发" ){
				$gameSystem._drill_ECT_enables[temp1] = false;
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ECT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventClosingTrigger.js 物体触发 - 固定区域&事件接近&条件触发】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
}


//=============================================================================
// ** 事件注释
//=============================================================================	
//==============================
// * 事件注释 - 标记
//==============================
var _drill_ECT_ev_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	this._drill_ECT_isFirstBirth = true;	//第一次出生
	_drill_ECT_ev_initialize.call( this,mapId, eventId );
};
//==============================
// * 事件注释 - 注释初始化
//==============================
var _drill_ECT_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ECT_event_setupPage.call(this);
    this.drill_ECT_setupPage();
};
Game_Event.prototype.drill_ECT_setupPage = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_ECT_isFirstBirth ){ 
		this._drill_ECT_isFirstBirth = false;
		this.drill_ECT_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_ECT_readPage( this.list() );
	}
};
//==============================
// * 事件注释 - 读取注释
//==============================
Game_Event.prototype.drill_ECT_readPage = function( page_list ) {	
	page_list.forEach( function(l) {	//这里并不需要与另一个插件同步，因为他们仅仅是相同的注释有相同的效果而已
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>事件接近范围" ){	//=>事件接近范围 : 添加范围 : 与本事件距离1
				if(args.length == 4){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "添加范围" ){
						if( temp1.indexOf("事件触发[") != -1 ){
							temp1 = temp1.replace("事件触发[","");
							temp1 = temp1.replace("]","");
							temp1 = Number(temp1) -1;
							var area = DrillUp.g_ECT_area[ temp1 ];
							this.drill_ECT_addArea( area );
						}else{
							var area = DrillUp.drill_ECT_getAreaByKeyword( temp1 );
							this.drill_ECT_addArea( area );
						}
					}
				}
			}
			if( command == "=>被触发" ){	//=>被触发 : 击碎岩石 : 触发独立开关 : A
				if(args.length == 4){
					var temp1 = String(args[1]);
					var type = String(args[3]);
					if( type == "离开范围时自动OFF" ){
						this.drill_ECT_setAutoOff( temp1, true );
					}
				}
				if(args.length == 6){
					var temp1 = String(args[1]);
					var type = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "触发独立开关" ){
						this.drill_ECT_addTag( temp1, temp2 );
					}
				}
			};
		};
	}, this);
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ECT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ECT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ECT_sys_initialize.call(this);
	this.drill_ECT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ECT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ECT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ECT_saveEnabled == true ){	
		$gameSystem.drill_ECT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ECT_initSysData();
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
Game_System.prototype.drill_ECT_initSysData = function() {
	this.drill_ECT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ECT_checkSysData = function() {
	this.drill_ECT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ECT_initSysData_Private = function() {
	
	this._drill_ECT_enables = [];					//事件接近主动触发 开关
	for(var i=0; i<DrillUp.g_ECT_area.length; i++ ){
		var area = DrillUp.g_ECT_area[i];
		if( area == undefined ){ 
			this._drill_ECT_enables.push( false );
		}else{
			this._drill_ECT_enables.push( area['enable'] );
		}
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ECT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ECT_enables == undefined ){
		this.drill_ECT_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	(因为默认已经赋值 false 了，无法根据空来检查)
};


//=============================================================================
// ** 事件接近 棋盘
//
//			说明：	> 棋盘中按照 点列表 依次塞入 事件触发id和其它条件。
//					> 注意，棋盘中不含筛选器情况，从棋盘中拿到点后，要手动操作一下筛选器。
//=============================================================================
//==============================
// * 棋盘 - 初始化
//==============================
var _drill_ECT_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){
	_drill_ECT_initMembers.call(this);
	this._drill_ECT_checkerboard = {};
	this._drill_ECT_checkerboard['matrix'] = null;			//棋盘矩阵
	this._drill_ECT_checkerboard['max_x'] = 1;				//最大触发距离X（注意，不是棋盘宽度）
	this._drill_ECT_checkerboard['max_y'] = 1;				//最大触发距离Y（注意，不是棋盘高度）
	this._drill_ECT_checkerboard['c_x'] = 0;				//棋盘中心点X
	this._drill_ECT_checkerboard['c_y'] = 0;				//棋盘中心点Y
};
//==============================
// * 棋盘 - 创建棋盘
//
//			说明：	只读数据，然后依次将数据塞入棋盘中。
//==============================
Game_Event.prototype.drill_ECT_createCheckerboard = function( ECT_area_list ){
	
	// > 最大触发距离初始化
	this.drill_ECT_initMaxRange( ECT_area_list );
	
	// > 棋盘中心点
	var x_range = this._drill_ECT_checkerboard['max_x'];
	var y_range = this._drill_ECT_checkerboard['max_y'];
	this._drill_ECT_checkerboard['c_x'] = x_range;
	this._drill_ECT_checkerboard['c_y'] = y_range;
	var x_length = x_range*2 +1;
	var y_length = y_range*2 +1;
	
	// > 构建棋盘
	this._drill_ECT_checkerboard['matrix'] = [];	
	for(var x=0; x < x_length; x++){
		this._drill_ECT_checkerboard['matrix'][x] = [];
		for(var y=0; y < y_length; y++){
			this._drill_ECT_checkerboard['matrix'][x][y] = [];
		}
	}
		
	// > 插入区域信息
	for( var i = 0; i < ECT_area_list.length; i++ ){
		var area_data = ECT_area_list[i];
		if( area_data == undefined ){ continue; }
		
		if( area_data['areaMode'] == "形状区域" ){
			
			// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
			var area_ptr = {};
			area_ptr['id'] = area_data['id'];	//事件触发id
			area_ptr['direction'] = 0;			//朝向条件（0表示无条件，2/4/6/8表示特定朝向）
			
			// > 区域准备
			var cal_area = $gameMap.drill_COFA_getShapePoints( 
				this._drill_ECT_checkerboard['c_x'], 
				this._drill_ECT_checkerboard['c_y'], 
				area_data['shapeMode'], area_data['shapeRange']
			);
			
			// > 将 棋盘点数据 塞入棋盘
			for(var x=0; x < x_length; x++){
				for(var y=0; y < y_length; y++){
					for(var k=0; k < cal_area.length; k++){
						var point = cal_area[k];
						if( point['x'] == x && point['y'] == y ){
							this._drill_ECT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
				}
			};
		}
		if( area_data['areaMode'] == "自定义区域" ){
			var self_id = area_data['self_id'];
			if( self_id <= 0 ){ continue; }
			
			// > 区域准备（四个方向）
			var def_area = DrillUp.g_COFA_area_list[ self_id-1 ];
			var cal_area_2 = $gameMap.drill_COFA_getCustomPoints( this._drill_ECT_checkerboard['c_x'], this._drill_ECT_checkerboard['c_y'], 2, def_area['points'] );
			var cal_area_4 = $gameMap.drill_COFA_getCustomPoints( this._drill_ECT_checkerboard['c_x'], this._drill_ECT_checkerboard['c_y'], 4, def_area['points'] );
			var cal_area_6 = $gameMap.drill_COFA_getCustomPoints( this._drill_ECT_checkerboard['c_x'], this._drill_ECT_checkerboard['c_y'], 6, def_area['points'] );
			var cal_area_8 = $gameMap.drill_COFA_getCustomPoints( this._drill_ECT_checkerboard['c_x'], this._drill_ECT_checkerboard['c_y'], 8, def_area['points'] );
			
			// > 将 棋盘点数据 塞入棋盘
			for(var x=0; x < x_length; x++){
				for(var y=0; y < y_length; y++){
					
					// > 关闭朝向（固定向右）
					if( def_area['consistent'] == false ){
						for(var k=0; k < cal_area_6.length; k++){
							var point = cal_area_6[k];
							if( point['x'] == x && point['y'] == y ){
								
								// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
								var area_ptr = {};
								area_ptr['id'] = area_data['id'];	//事件触发id
								area_ptr['direction'] = 0;			//朝向条件
								
								this._drill_ECT_checkerboard['matrix'][x][y].push( area_ptr );
							}
						}
						continue;
					}
					
					// > 与事件朝向一致（四个方向）
					for(var k=0; k < cal_area_2.length; k++){
						var point = cal_area_2[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 2;				//朝向条件
							
							this._drill_ECT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
					for(var k=0; k < cal_area_4.length; k++){
						var point = cal_area_4[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 4;				//朝向条件
							
							this._drill_ECT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
					for(var k=0; k < cal_area_6.length; k++){
						var point = cal_area_6[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 6;				//朝向条件
							
							this._drill_ECT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
					for(var k=0; k < cal_area_8.length; k++){
						var point = cal_area_8[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 8;				//朝向条件
							
							this._drill_ECT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
				}
			};
			
		}
	}
}
//==============================
// * 棋盘 - 最大触发距离初始化
//
//			说明：	此函数针对 棋盘的max_x和max_y参数进行初始化。
//==============================
Game_Event.prototype.drill_ECT_initMaxRange = function( ECT_area_list ){
	this._drill_ECT_checkerboard['max_x'] = 1;		//最大触发距离（优化用）
	this._drill_ECT_checkerboard['max_y'] = 1;
	
	for( var i = 0; i < ECT_area_list.length; i++ ){
		var area_data = ECT_area_list[i];
		if( area_data == undefined ){ continue; }
		
		if( area_data['areaMode'] == "形状区域" ){
			this._drill_ECT_checkerboard['max_x'] = Math.max( area_data['shapeRange'], this._drill_ECT_checkerboard['max_x'] );
			this._drill_ECT_checkerboard['max_y'] = Math.max( area_data['shapeRange'], this._drill_ECT_checkerboard['max_y'] );
		}
		if( area_data['areaMode'] == "自定义区域" ){
			var self_id = area_data['self_id'];
			if( self_id <= 0 ){ continue; }
			var area = DrillUp.g_COFA_area_list[ self_id-1 ]['points'];
			for( var j = 0; j < area.length; j++ ){
				this._drill_ECT_checkerboard['max_x'] = Math.max( Math.abs(area[j].x), this._drill_ECT_checkerboard['max_x'] );
				this._drill_ECT_checkerboard['max_y'] = Math.max( Math.abs(area[j].y), this._drill_ECT_checkerboard['max_y'] );
			}
		}
	}
	
	// > 考虑到朝向变化问题，这里设为正方形
	if( this._drill_ECT_checkerboard['max_x'] < this._drill_ECT_checkerboard['max_y'] ){
		this._drill_ECT_checkerboard['max_x'] = this._drill_ECT_checkerboard['max_y'];
	}else{
		this._drill_ECT_checkerboard['max_y'] = this._drill_ECT_checkerboard['max_x'];
	}
}

//=============================================================================
// ** 事件接近 棋盘变化控制
//=============================================================================
//==============================
// * 棋盘变化 - 初始化
//==============================
var _drill_ECT_initMembers2 = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){
	_drill_ECT_initMembers2.call(this);
	this._drill_ECT_areaTank = [];
	this._drill_ECT_areaNeedRefresh = false;
}
//==============================
// * 棋盘变化 - 添加棋盘
//==============================
Game_Event.prototype.drill_ECT_addArea = function( ECT_area ){
	if( ECT_area == undefined ){ return; }
	if( this._drill_ECT_areaTank.contains( ECT_area ) ){ return; }
	this._drill_ECT_areaTank.push( ECT_area );
	this._drill_ECT_areaNeedRefresh = true;
}
//==============================
// * 棋盘变化 - 帧刷新
//==============================
var _drill_ECT_ev_update = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
	_drill_ECT_ev_update.call(this);
	
	// > 创建棋盘
	if( this._drill_ECT_areaNeedRefresh == false ){ return; }
	this._drill_ECT_areaNeedRefresh = false;
	this.drill_ECT_createCheckerboard( this._drill_ECT_areaTank );
	$gameTemp._drill_ECT_bindNeedRestatistics = true;
}
//==============================
// * 棋盘变化 - 是否含棋盘
//==============================
Game_Event.prototype.drill_ECT_hasCheckerboard = function(){
	return this._drill_ECT_areaTank.length > 0;
}

//=============================================================================
// ** 含棋盘事件 的 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ECT_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_ECT_temp_initialize.call(this);
	this.drill_ECT_clearTemp();
	this._drill_ECT_bindNeedRestatistics = true;
};
Game_Temp.prototype.drill_ECT_clearTemp = function() {	
	this._drill_ECT_bindTank = [];			//棋盘事件容器
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_ECT_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp.drill_ECT_clearTemp();
	$gameTemp._drill_ECT_bindNeedRestatistics = true;
	_drill_ECT_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_ECT_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp.drill_ECT_clearTemp();
	$gameTemp._drill_ECT_bindNeedRestatistics = true;
	_drill_ECT_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_ECT_update_bind = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_ECT_update_bind.call(this,sceneActive);
	this.drill_ECT_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_ECT_updateRestatistics = function() {
	if( $gameTemp._drill_ECT_bindNeedRestatistics == false ){ return }
	$gameTemp._drill_ECT_bindNeedRestatistics = false;
	
	// > 统计棋盘事件
	$gameTemp._drill_ECT_bindTank = [];
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){  
		var temp_event = events[i];
		if( temp_event.drill_ECT_hasCheckerboard() == true ){
			$gameTemp._drill_ECT_bindTank.push(temp_event);
		}
	}
	
	// > Debug贴图重建
	$gameTemp._drill_ECT_DEBUG_spriteNeedRefresh = true;
}



//=============================================================================
// ** 排序（XY轴折半查找）
//
//			说明：	> 分成两组容器，按X轴排序 和 按Y轴排序，通过折半查找，找到指定事件范围内的其它事件。
//					> 此部分 只提供一个功能：【获取矩形范围内的所有物体】。
//					> （暂不考虑四叉树算法）
//=============================================================================
//==============================
// * 排序 - 帧刷新
//==============================
var _drill_ECT_update_sort = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ECT_update_sort.call( this,sceneActive );
	if( sceneActive ){
		this.drill_ECT_updateEventsTank();			//帧刷新 - 容器变化
		this.drill_ECT_updateEventsSort();			//帧刷新 - 执行排序
	}
};
//==============================
// * 排序 - 帧刷新容器变化
//==============================
Game_Map.prototype.drill_ECT_updateEventsTank = function() {
	
	// > 临时排序数组 初始化
	if( this._drill_ECT_x_events == undefined ){
		this._drill_ECT_x_events = this.drill_COFA_getAvailableEventTank_Copyed();
	}
	if( this._drill_ECT_y_events == undefined ){
		this._drill_ECT_y_events = this.drill_COFA_getAvailableEventTank_Copyed();
	}
	
	// > 临时排序数组 同步（事件数组变化了才同步）
	var aTank_ptr = this.drill_COFA_getAvailableEventTank_Pointer();
	if( this._drill_ECT_x_events.length != aTank_ptr.length ){
		this._drill_ECT_x_events = this.drill_COFA_getAvailableEventTank_Copyed();
	}
	if( this._drill_ECT_y_events.length != aTank_ptr.length ){
		this._drill_ECT_y_events = this.drill_COFA_getAvailableEventTank_Copyed();
	}
};
//==============================
// * 排序 - 帧刷新执行排序
//==============================
Game_Map.prototype.drill_ECT_updateEventsSort = function() {
	
	// > 排序
	this._drill_ECT_x_events.sort(function(a, b){
		return a._x - b._x ;
	});
	this._drill_ECT_y_events.sort(function(a, b){
		return a._y - b._y ;
	});
	
};
//==============================
// * 排序 - 获取 矩形范围 内的所有事件
//==============================
Game_Map.prototype.drill_ECT_getEventsInRange = function( c_x, c_y, max_x_count, max_y_count ){
	if( this._drill_ECT_x_events.length == 0 ){ return []; }
	var result = [];
	
	// > 折半查找（x轴）
	var i_low = 0;									//符合条件的最小索引
	var i_high = this._drill_ECT_x_events.length-1;	//符合条件的最大索引
	var x_min = c_x - max_x_count;					//目标X轴最小值
	var x_max = c_x + max_x_count;				//目标X轴最大值
	
	// 举例：
	// 		1 2 2 2 4 5 5 5 9，折半找范围2~5，low在1和2之间，high在5和9之间。
	//		low 在遇到 2==2 时，右边部分折半去掉（high = mid-1）
	//		high在遇到 5==5 时，左边部分折半去掉（low  = mid+1）
	var temp_low = 0;
	var temp_high = this._drill_ECT_x_events.length-1;
	for(var k = 0; k < 10; k++){
		var mid = Math.floor( (temp_low+temp_high)/2 );
		if( temp_low >= temp_high ){	//（两指针贴合后，得到结果）
			i_low = temp_high;
			break; 
		}
		if( this._drill_ECT_x_events[mid].x < x_min ){
			temp_low = mid + 1;			//（中间段事件的位置 比 值小，low向前缩）
		}
		if( this._drill_ECT_x_events[mid].x >= x_min){
			temp_high = mid - 1;		//（中间段事件的位置 比 值大，high向后缩）
		}
	}
	var temp_low = i_low;
	var temp_high = this._drill_ECT_x_events.length-1;
	for(var k = 0; k < 10; k++){
		var mid = Math.floor( (temp_low+temp_high)/2 );
		if( temp_low >= temp_high ){	//（两指针贴合后，得到结果）
			i_high = temp_low;
			break; 
		}
		if( this._drill_ECT_x_events[mid].x <= x_max ){
			temp_low = mid + 1;			//（中间段事件的位置 比 值小，low向前缩）
		}
		if( this._drill_ECT_x_events[mid].x > x_max){
			temp_high = mid - 1;		//（中间段事件的位置 比 值大，high向后缩）
		}
	}
	var x_tank = [];
	for(var i = i_low; i <= i_high; i++){		//（两指针的边界）
		var ev = this._drill_ECT_x_events[i];
		if( ev == undefined ){ continue }		//（数组越界的不算）
		x_tank.push( ev );
	}
	
	// > 折半查找（y轴）
	var j_low = 0;									//符合条件的最小索引
	var j_high = this._drill_ECT_y_events.length-1;	//符合条件的最大索引
	var y_min = c_y - max_y_count;					//目标X轴最小值
	var y_max = c_y + max_y_count;					//目标X轴最大值
	
	var temp_low = 0;
	var temp_high = this._drill_ECT_y_events.length-1;
	for(var k = 0; k < 10; k++){
		var mid = Math.floor( (temp_low+temp_high)/2 );
		if( temp_low >= temp_high ){	//（两指针贴合后，得到结果）
			j_low = temp_high;
			break; 
		}
		if( this._drill_ECT_y_events[mid].y < y_min ){
			temp_low = mid + 1;			//（中间段事件的位置 比 值小，low向前缩）
		}
		if( this._drill_ECT_y_events[mid].y >= y_min){
			temp_high = mid - 1;		//（中间段事件的位置 比 值大，high向后缩）
		}
	}
	var temp_low = j_low;
	var temp_high = this._drill_ECT_y_events.length-1;
	for(var k = 0; k < 10; k++){
		var mid = Math.floor( (temp_low+temp_high)/2 );
		if( temp_low >= temp_high ){	//（两指针贴合后，得到结果）
			j_high = temp_low;
			break; 
		}
		if( this._drill_ECT_y_events[mid].y <= y_max ){
			temp_low = mid + 1;			//（中间段事件的位置 比 值小，low向前缩）
		}
		if( this._drill_ECT_y_events[mid].y > y_max){
			temp_high = mid - 1;		//（中间段事件的位置 比 值大，high向后缩）
		}
	}
	var y_tank = []
	for(var j = j_low; j <= j_high; j++){		//（两指针的边界）
		var ev = this._drill_ECT_y_events[j];
		if( ev == undefined ){ continue }		//（数组越界的不算）
		y_tank.push( ev );
	}
	
	// > 两者取交集
	var result = [];
	for(var i=0; i < x_tank.length; i++ ){
		var temp_event = x_tank[i];
		if( temp_event == undefined ){ 	//（注意这一步，不可能为空）
			return [];
		}
		if( y_tank.contains(temp_event) == false ){ continue; }
		result.push( temp_event );
	}
	
	// > 捕获测试（查找出自身和其它事件的数量时）
	//if( result.length >= 2 ){
	//	var str = "";		//（注意，事件的边不可能超过 搜索范围。若有，说明指针错位了）
	//	str += "搜索X范围："+ x_min + "~" + x_max + "\n";
	//	str += "搜索Y范围："+ y_min + "~" + y_max + "\n";
	//	str += "事件X边："+ x_tank[0].x + "~" + x_tank[x_tank.length-1].x + "\n";
	//	str += "事件Y边："+ y_tank[0].y + "~" + y_tank[y_tank.length-1].y + "\n";
	//	alert( str );
	//	var str = "";
	//	for( var i=0;i<result.length;i++ ){ str += String(result[i]._eventId)+"," }
	//	alert("捕获的事件：" + str );
	//}
	
	return result;
};


//=============================================================================
// ** 事件接近触发
//=============================================================================
//==============================
// * 事件接近触发 - 帧刷新
//==============================
var _drill_ECT_update_trigger = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ECT_update_trigger.call( this,sceneActive );
	if( sceneActive ){
		for(var i=0; i < $gameTemp._drill_ECT_bindTank.length; i++ ){
			var e = $gameTemp._drill_ECT_bindTank[i];
			this.drill_ECT_updateEventTrigger( e );		//帧刷新 - 事件触发棋盘
		}
	}
};
//==============================
// * 帧刷新 - 事件触发棋盘
//==============================
Game_Map.prototype.drill_ECT_updateEventTrigger = function( org_event ){
	var c_board = org_event._drill_ECT_checkerboard;
	
	// > 相关事件
	var events = this.drill_ECT_getEventsInRange( org_event.x, org_event.y, c_board['max_x'], c_board['max_y'] );
	events = events.concat( this._drill_ECT_triggeredEvents.filter(	//并集
		function(v) { return events.indexOf(v) === -1}
	));
	
	// > 玩家作为 目标事件 也包括进来
	events.push( $gamePlayer );
	
	// > 目标事件触发
	for(var i=0; i < events.length; i++ ){
		var tar_event = events[i];
		
		// > 不含事件自身
		if( tar_event == org_event ){ continue; }
		
		// > 位置修正
		var dx;
		var dy;
		if( DrillUp.g_ECT_fix ){
			dx = Math.floor( this.deltaX(tar_event._realX, org_event._realX) +0.55 );
			dy = Math.floor( this.deltaY(tar_event._realY, org_event._realY) +0.55 );
		}else{
			dx = this.deltaX(tar_event._x, org_event._x);
			dy = this.deltaY(tar_event._y, org_event._y);
		}
		dx += c_board['c_x'];
		dy += c_board['c_y'];
		
		// > 事件在棋盘内（注意，棋盘真实形状是所有形状的组合，不一定是方形）
		var matrix = c_board['matrix'];
		if( dx >= 0 && dx < matrix.length &&
			dy >= 0 && dy < matrix[0].length ){
			
			// > 棋盘内触发
			var area_ptr_list = matrix[ dx ][ dy ];
			if( area_ptr_list == undefined ){ continue; }	//（注意这一步，不可能为空）
			this.drill_ECT_checkerboardTriggered( tar_event, org_event, area_ptr_list );
			
			// > 捕获测试（在事件范围内放炸弹，确保棋盘的矩形是与事件对齐的）
			//if( org_event._eventId == 61 ){
			//	alert("棋盘矩形范围有事件");
			//}
			
			
		// > 事件在棋盘外（注意，棋盘真实形状是所有形状的组合，不一定是方形）
		}else{
			// > 只关 org_event 对应的 自关标记
			this.drill_ECT_autoOffAllTagWithInTag( tar_event, org_event.drill_ECT_getAutoOffTagList() );
			//this.drill_ECT_autoOffAllTag( tar_event );
		}
		
	}
}
//==============================
// * 帧刷新 - 棋盘内触发
//
//			参数：	> tar_event 对象（目标事件，即进入范围的事件）
//					> org_event 对象（主动事件，即范围的所有者）
//					> area_ptr_list 对象列表（棋盘点数据）
//==============================
Game_Map.prototype.drill_ECT_checkerboardTriggered = function( tar_event, org_event, area_ptr_list ){
	
	var tar_inTag_list = [];	//（记录 自关标记）
	var org_inTag_list = [];
	for(var k=0; k < area_ptr_list.length; k++ ){
		var area_ptr = area_ptr_list[k];
		
		// > 棋盘点数据 条件（条件必须符合特定的方向）
		var pass = false;
		if( area_ptr['direction'] == 0 ){
			pass = true;
		}
		if( area_ptr['direction'] > 0 &&	//（取反向朝向，目前不明原因）
			area_ptr['direction'] == org_event._direction ){
			pass = true;
		}
		if( pass == false ){
			continue;
		}
		
		// > 接近触发数据
		var area = DrillUp.g_ECT_area[ area_ptr['id'] ];
		if( area == undefined ){ continue; }		//（注意这一步，不可能为空）
		
		// > 大前提：触发条件必须开启
		if( $gameSystem._drill_ECT_enables[ area_ptr['id'] ] != true ){ continue; }
		
		// > 棋盘筛选器
		var condition = null;
		if( area['condition_enable'] == true ){
			condition = DrillUp.g_COFA_condition_list[ area['condition_id']-1 ]; 
		}else{
			condition = {}
		}
		if( this.drill_COFA_isPointMatched(tar_event,condition) == false ){ continue; }	//（筛选器 - 单点条件匹配）
		
		
		// > 区域触发锁
		if( area['triggerMode'] == "关闭" ){
			//（不操作）
		}
		if( area['triggerMode'] == "只玩家才能触发" ){
			if( tar_event != $gamePlayer ){ continue; }
		}
		if( area['triggerMode'] == "只事件才能触发" ){
			if( tar_event == $gamePlayer ){ continue; }
		}
		
		
		// > 触发 主动事件
		if( org_event.drill_ECT_hasTag( area['keyword'] ) == true ){
			this.drill_ECT_triggerTag( org_event, area['keyword'], true );
			org_inTag_list.push( area['keyword'] );
		}
		
		// > 触发 目标事件
		if( tar_event.drill_ECT_hasTag( area['keyword'] ) == true ){
			this.drill_ECT_triggerTag( tar_event, area['keyword'], true );
			tar_inTag_list.push( area['keyword'] );
		}
		
		// > 捕获测试（捕获到的目标事件，触发了什么条件）
		//if( org_event.drill_ECT_hasTag( area['keyword'] ) == true ){
		//	alert( area['keyword'] );
		//}
		//if( org_event._eventId == 61 ){
		//	alert( area['id'] );
		//	alert( area['keyword'] );
		//}
	}		
		
	// > 选择性关闭 自关标记（主动事件）
	this.drill_ECT_autoOffAllTagWithoutInTag( org_event, org_inTag_list );
	// > 选择性关闭 自关标记（目标事件）
	this.drill_ECT_autoOffAllTagWithoutInTag( tar_event, tar_inTag_list );
}
//==============================
// * 开关触发 - 选择性关闭 自关标记（子流程）
//
//			参数：	> e 对象                （目标事件）
//					> inTag_list 字符串数组 （包含列表）
//			说明：	> 只关闭含 自关标记 的条件。
//					> 关闭 inTag_list 的自关标记。
//==============================
Game_Map.prototype.drill_ECT_autoOffAllTagWithInTag = function( e, inTag_list ){
	var offTag_list = e.drill_ECT_getAutoOffTagList();
	var offSwitch_list = e.drill_ECT_getTagSwitchList(offTag_list);
	var inSwitch_list = e.drill_ECT_getTagSwitchList(inTag_list);
	
	for(var k=0; k < offSwitch_list.length; k++ ){
		var switch_name = offSwitch_list[k];
		if( inSwitch_list.contains( switch_name ) ){
			this.drill_ECT_triggerSwitch( e, switch_name, false );
		}
	}
}
//==============================
// * 开关触发 - 选择性关闭 自关标记（子流程）
//
//			参数：	> e 对象                （目标事件）
//					> inTag_list 字符串数组 （排除列表）
//			说明：	> 只关闭含 自关标记 的条件。
//					> 关闭除 inTag_list 中以外的自关标记。
//					> 如果两个条件指向了同一个开关，条件A符合棋盘，条件B不符合棋盘，那么这个开关不要关。
//					> 所以这里获取 自关标记的开关 和 触发的开关，取差集，然后关闭过滤的独立开关即可。
//==============================
Game_Map.prototype.drill_ECT_autoOffAllTagWithoutInTag = function( e, inTag_list ){
	var offTag_list = e.drill_ECT_getAutoOffTagList();
	var offSwitch_list = e.drill_ECT_getTagSwitchList(offTag_list);
	var inSwitch_list = e.drill_ECT_getTagSwitchList(inTag_list);
	
	for(var k=0; k < offSwitch_list.length; k++ ){
		var switch_name = offSwitch_list[k];
		if( inSwitch_list.contains( switch_name ) ){
			continue;
		}
		this.drill_ECT_triggerSwitch( e, switch_name, false );
	}
}
//==============================
// * 开关触发 - 关闭所有 自关标记（子流程）
//
//			说明：	> 直接全关，不做比较。
//==============================
Game_Map.prototype.drill_ECT_autoOffAllTag = function( e ){
	var offTag_list = e.drill_ECT_getAutoOffTagList();
	for(var k=0; k < offTag_list.length; k++ ){
		this.drill_ECT_triggerTag( e, offTag_list[k], false );
	}
}
//==============================
// * 开关触发 - 触发指定事件的条件（子流程）
//==============================
Game_Map.prototype.drill_ECT_triggerTag = function( e, tag, enabled ){
	
	// > 不含条件则跳过
	if( e.drill_ECT_hasTag( tag ) != true ){ return; }
	
	var switchName = e.drill_ECT_getTagSwitch( tag );
	this.drill_ECT_triggerSwitch( e, switchName, enabled );
}
//==============================
// * 开关触发 - 执行触发（基函数）
//
//			说明：	> 由于独立开关受 Game_Map 控制，因此该函数不能转移到 事件类 中。
//					> 开关触发因为受到 事件条件 的限制关系，所以被分成了多个 子流程 函数。
//==============================
Game_Map.prototype.drill_ECT_triggerSwitch = function( e, switchName, enabled ){
	
	// > 开启独立开关
	if( enabled == true ){
		var key = [this._mapId, e._eventId, switchName ];
		if( $gameSelfSwitches.value(key) !== true){
			$gameSelfSwitches.setValue(key,true);
			this.drill_ECT_triggeredEventsAdd( e );		//（记录需要 自关标记 的事件）
		}
		
	// > 关闭独立开关
	}else{
		var key = [this._mapId, e._eventId, switchName ];
		if( $gameSelfSwitches.value(key) !== false){
			$gameSelfSwitches.setValue(key,false);
			this.drill_ECT_triggeredEventsRemove( e );	//（开关关闭后，去除 自关标记 标记）
		}
	}
}


//=============================================================================
// ** 事件条件数据
//
//			说明：	> 事件条件与独立开关 的数据，单独绑定在事件身上。
//					  这里只是一个访问器的结构。
//					> 此设置与 事件接近 的结构一致。
//					> 玩家对象是特例，需要覆写排除掉。
//=============================================================================
//==============================
// * 事件条件 - 初始化
//==============================
var _drill_ECT_ev_initialize2 = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	
	// > 参数初始化
	this._drill_ECT = {};				
	this._drill_ECT['tags'] = {};				//条件 - 条件集
	this._drill_ECT['tags_switches'] = {};		//条件 - 对应的独立开关
	this._drill_ECT['tags_autoOff'] = {};		//条件 - 自关标记
	
	// > 原函数
	_drill_ECT_ev_initialize2.call( this, mapId, eventId );
};
//==============================
// * 事件条件 - 添加条件
//==============================
Game_Event.prototype.drill_ECT_addTag = function( tag_name, switch_name ){
	if( DrillUp.g_ECT_area_keyWordList.contains(tag_name) == false ){ return; }//（关键字对不上，则不添加）
	this._drill_ECT['tags'][ tag_name ] = true;
	this._drill_ECT['tags_switches'][ tag_name ] = switch_name;
};
//==============================
// * 事件条件 - 设置自关标记
//==============================
Game_Event.prototype.drill_ECT_setAutoOff = function( tag_name, enabled ){
	if( DrillUp.g_ECT_area_keyWordList.contains(tag_name) == false ){ return; }//（关键字对不上，则不添加）
	this._drill_ECT['tags_autoOff'][ tag_name ] = enabled;
};
//==============================
// * 事件条件 - 去除条件
//==============================
Game_Event.prototype.drill_ECT_removeTag = function( tag_name ){
	this._drill_ECT['tags'][ tag_name ] = null;
	this._drill_ECT['tags_switches'][ tag_name ] = null;
	this._drill_ECT['tags_autoOff'][ tag_name ] = null;
};
//==============================
// * 事件条件 - 去除全部条件
//==============================
Game_Event.prototype.drill_ECT_removeAllTag = function(){
	this._drill_ECT['tags'] = {};
	this._drill_ECT['tags_switches'] = {};
	this._drill_ECT['tags_autoOff'] = {};
};
//==============================
// * 获取 - 判断条件
//==============================
Game_Event.prototype.drill_ECT_hasTag = function( tag_name ){
	return this._drill_ECT['tags'][ tag_name ] == true;
};
//==============================
// * 获取 - 获取全部条件
//==============================
Game_Event.prototype.drill_ECT_getAllTag = function(){
	return Object.keys( this._drill_ECT['tags'] );
};
//==============================
// * 获取 - 获取 含自关标记 的条件
//==============================
Game_Event.prototype.drill_ECT_getAutoOffTagList = function(){
	return Object.keys( this._drill_ECT['tags_autoOff'] );
};
//==============================
// * 获取 - 判断条件是否自关标记
//
//			说明：	注意，先判断是否存在条件，再获取对应的自关标记情况。
//==============================
Game_Event.prototype.drill_ECT_isTagAutoOff = function( tag_name ){
	return this._drill_ECT['tags_autoOff'][ tag_name ] == true;
};
//==============================
// * 获取 - 条件对应的独立开关
//
//			说明：	注意，先判断是否存在条件，再获取对应的独立开关。
//==============================
Game_Event.prototype.drill_ECT_getTagSwitch = function( tag_name ){
	return this._drill_ECT['tags_switches'][ tag_name ];
};
//==============================
// * 获取 - 条件对应的独立开关列表
//
//			说明：	> 返回的独立开关不重复。
//					> 注意，先判断是否存在条件，再获取对应的独立开关。
//==============================
Game_Event.prototype.drill_ECT_getTagSwitchList = function( tag_name_list ){
	var result = [];
	for(var i=0; i < tag_name_list.length; i++){
		var switch_name = this._drill_ECT['tags_switches'][ tag_name_list[i] ];
		if( result.contains(switch_name) ){ continue; }
		result.push(switch_name);
	}
	return result;
};
//==============================
// * 玩家获取 - 判断条件
//==============================
Game_Player.prototype.drill_ECT_hasTag = function( tag_name ){ return false; };
//==============================
// * 玩家获取 - 获取全部条件
//==============================
Game_Player.prototype.drill_ECT_getAllTag = function(){ return []; };
//==============================
// * 玩家获取 - 获取自关标记的条件
//==============================
Game_Player.prototype.drill_ECT_getAutoOffTagList = function(){ return []; };
//==============================
// * 玩家获取 - 判断条件是否自关标记
//==============================
Game_Player.prototype.drill_ECT_isTagAutoOff = function( tag_name ){ return false; };
//==============================
// * 玩家获取 - 条件对应的独立开关
//==============================
Game_Player.prototype.drill_ECT_getTagSwitch = function( tag_name ){ return ""; };
//==============================
// * 玩家获取 - 条件对应的独立开关列表
//==============================
Game_Player.prototype.drill_ECT_getTagSwitchList = function( tag_name ){ return []; };


//=============================================================================
// ** 事件已触发容器
//
//			说明：	> 接近触发后，触发ON的事件都会被捕获在该容器中。OFF时去掉。
//					  这里只是一个访问器的结构。
//					> 此设置与 事件接近 的结构一致。
//=============================================================================
//==============================
// * 已触发容器 - 初始化
//==============================
var _drill_ECT_initialize2 = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_ECT_initialize2.call(this);
	this._drill_ECT_triggeredEvents = [];
}
//==============================
// * 已触发容器 - 切换地图时清空
//==============================
var _drill_ECT_setup2 = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	
	// > 切换地图时，清空所有触发过的独立开关
	if( this._drill_ECT_triggeredEvents.length > 0 ){
		this.drill_ECT_triggeredEventsClearAllSwitches();
	}
	
	// > 刷新
	_drill_ECT_setup2.call(this,mapId);
	
	// > 容器初始化
	this._drill_ECT_triggeredEvents = [];
}

//==============================
// * 已触发容器 - 添加 已触发的事件
//==============================
Game_Map.prototype.drill_ECT_triggeredEventsAdd = function( temp_event ) {
	this._drill_ECT_triggeredEvents.push(temp_event);
}
//==============================
// * 已触发容器 - 去除 已触发的事件
//==============================
Game_Map.prototype.drill_ECT_triggeredEventsRemove = function( temp_event ) {
	for (var k=this._drill_ECT_triggeredEvents.length-1; k>=0; k-- ) {	
		if( this._drill_ECT_triggeredEvents[k] == temp_event){
			this._drill_ECT_triggeredEvents.splice(k,1);
			break;
		}
	}
}
//==============================
// * 已触发容器 - 去除 已触发的事件 的所有条件对应的独立开关
//==============================
Game_Map.prototype.drill_ECT_triggeredEventsClearAllSwitches = function() {
	for( var i = 0;  i < this._drill_ECT_triggeredEvents.length; i++ ){
		var temp_event = this._drill_ECT_triggeredEvents[i];
		var temp_tags = temp_event.drill_ECT_getAllTag();
		for( var j = 0; j < temp_tags.length; j++ ){
			var tag = temp_tags[j];
			if( temp_event.drill_ECT_hasTag( tag ) == true ){
				
				var sw = temp_event.drill_ECT_getTagSwitch( tag );
				var key = [this._mapId, temp_event._eventId, sw ];
				if( $gameSelfSwitches.value(key) !== false){
					$gameSelfSwitches.setValue(key,false);
				}
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，中层/上层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_ECT_layerAddSprite = function( sprite, layer_index ){
	this.drill_ECT_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_ECT_layerRemoveSprite = function( sprite ){
	this.drill_ECT_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_ECT_sortByZIndex = function () {
    this.drill_ECT_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x'] （移动后的坐标X）
//                  > pos['y'] （移动后的坐标Y）
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_ECT_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_ECT_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 中层
//==============================
var _drill_ECT_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_ECT_layer_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_ECT_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_ECT_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_ECT_sortByZIndex_Private = function () {
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_ECT_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
}
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_ECT_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 层级与镜头的位移（私有）
//==============================
Scene_Map.prototype.drill_ECT_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 地图参照 -> 地图参照
	if( layer == "下层" || layer == "中层" || layer == "上层" ){
		return {'x':xx, 'y':yy };
	}
	
	// > 地图参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		//（不需要变换）
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}

//=============================================================================
// ** DEBUG - 区域块可视化
//
//			说明：	> 此项默认关闭，尽可能不消耗更多性能。
//=============================================================================
//==============================
// * 区域块可视化 - 帧刷新
//==============================
var _drill_ECT_DEBUG_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_ECT_DEBUG_update.call(this);
	
	if( DrillUp.g_ECT_debugEnabled != true ){ return; }
	
	this.drill_ECT_DEBUG_updateRebuild();	//帧刷新 - 重建
	this.drill_ECT_DEBUG_updateSprite();	//帧刷新 - 贴图
};
//==============================
// * 区域块可视化 - 帧刷新重建
//==============================
Scene_Map.prototype.drill_ECT_DEBUG_updateRebuild = function() {
	if( $gameTemp._drill_ECT_DEBUG_spriteNeedRefresh != true ){ return; }
	$gameTemp._drill_ECT_DEBUG_spriteNeedRefresh = false;
	
	// > 初始化
	if( this._drill_ECT_spriteTank == undefined ){
		this._drill_ECT_spriteTank = [];
		this._drill_ECT_spriteTank_2 = [];
		this._drill_ECT_spriteTank_3 = [];
	}
	
	// > 清除旧贴图
	for(var i=0; i < this._drill_ECT_spriteTank.length; i++ ){
		var temp_sprite = this._drill_ECT_spriteTank[i];
		this.drill_ECT_layerRemoveSprite( temp_sprite );
	}
	for(var i=0; i < this._drill_ECT_spriteTank_2.length; i++ ){
		var temp_sprite = this._drill_ECT_spriteTank_2[i];
		this.drill_ECT_layerRemoveSprite( temp_sprite );
	}
	for(var i=0; i < this._drill_ECT_spriteTank_3.length; i++ ){
		var temp_sprite = this._drill_ECT_spriteTank_3[i];
		this.drill_ECT_layerRemoveSprite( temp_sprite );
	}
	
	// > 创建贴图
	this._drill_ECT_spriteTank = [];
	for(var i=0; i < $gameTemp._drill_ECT_bindTank.length; i++){
		var temp_event = $gameTemp._drill_ECT_bindTank[i];
		
		// > 贴图属性
		var data = {};
		data['color'] = DrillUp.g_ECT_debugColor1;
		data['width'] = temp_event._drill_ECT_checkerboard['matrix'].length;
		data['height'] = temp_event._drill_ECT_checkerboard['matrix'][0].length;
		data['point_list'] = [];
		var temp_sprite = new Drill_COFA_DebugSprite( data );
		temp_sprite['layer_index'] = "中层";
		temp_sprite.zIndex = i;
		
		// > 地图层级
		this._drill_ECT_spriteTank.push( temp_sprite );
		this.drill_ECT_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
		
		
		// > 第二个区域
		var temp_sprite = null;
		if( temp_event._drill_ECT_areaTank.length >= 2 ){
			data['color'] = DrillUp.g_ECT_debugColor2;
			var temp_sprite = new Drill_COFA_DebugSprite( data );
			temp_sprite['layer_index'] = "中层";
			temp_sprite.zIndex = i;
			this.drill_ECT_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
		}
		this._drill_ECT_spriteTank_2.push( temp_sprite );
		
		// > 第三个区域
		var temp_sprite = null;
		if( temp_event._drill_ECT_areaTank.length >= 3 ){
			data['color'] = DrillUp.g_ECT_debugColor3;
			var temp_sprite = new Drill_COFA_DebugSprite( data );
			temp_sprite['layer_index'] = "中层";
			temp_sprite.zIndex = i;
			this.drill_ECT_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
		}
		this._drill_ECT_spriteTank_3.push( temp_sprite );
	}
	
	// > 贴图排序
	this.drill_ECT_sortByZIndex();
};
//==============================
// * 区域块可视化 - 帧刷新贴图
//==============================
Scene_Map.prototype.drill_ECT_DEBUG_updateSprite = function() {
	if( this._drill_ECT_spriteTank == undefined ){ return; }
	for(var i=0; i < this._drill_ECT_spriteTank.length; i++){
		var temp_sprite = this._drill_ECT_spriteTank[i];
		var temp_event = $gameTemp._drill_ECT_bindTank[i];
		
		// > 位移（地图参照）
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		
		var xx = 0;
		var yy = 0;
		if( DrillUp.g_ECT_fix ){
			xx = Math.floor( temp_event._realX +0.55 );
			yy = Math.floor( temp_event._realY +0.55 );
		}else{
			xx = temp_event._x;
			yy = temp_event._y;
		}
		xx = Math.round( $gameMap.adjustX( xx ) * tw + tw / 2);
		yy = Math.round( $gameMap.adjustY( yy ) * th + th / 2);
		
		
		// > 层级与镜头的位移
		var pos = this.drill_ECT_layerCameraMoving( xx, yy, temp_sprite['layer_index'], {} );
		temp_sprite.x = pos['x'];
		temp_sprite.y = pos['y'];
		
		
		// > 图块点变化
		var area_data = temp_event._drill_ECT_areaTank[ 0 ];
		if( area_data == undefined ){ continue; }
		temp_event.drill_ECT_DEBUG_refreshPointList( area_data, temp_sprite );
		
		var temp_sprite_2 = this._drill_ECT_spriteTank_2[i];
		if( temp_sprite_2 == undefined ){ continue; }
		temp_sprite_2.x = temp_sprite.x;
		temp_sprite_2.y = temp_sprite.y;
		var area_data = temp_event._drill_ECT_areaTank[ 1 ];
		if( area_data == undefined ){ continue; }
		temp_event.drill_ECT_DEBUG_refreshPointList( area_data, temp_sprite_2 );
		
		var temp_sprite_3 = this._drill_ECT_spriteTank_3[i];
		if( temp_sprite_3 == undefined ){ continue; }
		temp_sprite_3.x = temp_sprite.x;
		temp_sprite_3.y = temp_sprite.y;
		var area_data = temp_event._drill_ECT_areaTank[ 2 ];
		if( area_data == undefined ){ continue; }
		temp_event.drill_ECT_DEBUG_refreshPointList( area_data, temp_sprite_3 );
	}
}
//==============================
// * 区域块可视化 - 区域绘制
//==============================
Game_Event.prototype.drill_ECT_DEBUG_refreshPointList = function( area_data, temp_sprite ){
	
	// > 筛选器
	var condition = null;
	if( area_data['condition_enable'] == true ){
		condition = DrillUp.g_COFA_condition_list[ area_data['condition_id']-1 ]; 
	}else{
		condition = {}
	}
	
	// > 区域触发
	if( area_data['areaMode'] == "形状区域" ){
		var cal_area = $gameMap.drill_COFA_getShapePointsWithCondition( 	//（使用绝对坐标，获取到符合条件的点）
			this.x, 
			this.y, 
			area_data['shapeMode'], area_data['shapeRange'], condition
		);
		cal_area = this.drill_ECT_DEBUG_adjustPoints( cal_area );
		temp_sprite.drill_changePointList( cal_area );
	}
	if( area_data['areaMode'] == "自定义区域" ){
		var self_id = area_data['self_id'];
		if( self_id <= 0 ){ return; }
		
		var def_area = DrillUp.g_COFA_area_list[ self_id-1 ];
		if( def_area['consistent'] == false ){		//关闭朝向（固定向右）
			var cal_area = $gameMap.drill_COFA_getCustomPointsWithCondition( 	//（使用绝对坐标，获取到符合条件的点）
				this.x, 
				this.y, 
				6, def_area['points'], condition
			);
			cal_area = this.drill_ECT_DEBUG_adjustPoints( cal_area );
			temp_sprite.drill_changePointList( cal_area );
		}else{										//与事件朝向一致（四个方向）
			var cal_area = $gameMap.drill_COFA_getCustomPointsWithCondition( 	//（使用绝对坐标，获取到符合条件的点）
				this.x, 
				this.y, 
				this._direction, def_area['points'], condition
			);
			cal_area = this.drill_ECT_DEBUG_adjustPoints( cal_area );
			temp_sprite.drill_changePointList( cal_area );
		}
	}
}
//==============================
// * 区域块可视化 - 点位置修正
//==============================
Game_Event.prototype.drill_ECT_DEBUG_adjustPoints = function( point_list ){
	var result_list = [];
	for(var i=0; i < point_list.length; i++ ){
		var xx = point_list[i].x;
		var yy = point_list[i].y;
		
		// > 去掉事件的绝对位置
		xx -= this.x;
		yy -= this.y;
		
		// > 加上棋盘的偏移位置
		xx += this._drill_ECT_checkerboard['c_x'];
		yy += this._drill_ECT_checkerboard['c_y'];
		
		// > 循环地图情况
		xx = $gameMap.roundX( xx );
		yy = $gameMap.roundY( yy );
		
		var p = { 'x':xx, 'y':yy };
		result_list.push( p );
	}
	return result_list;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventClosingTrigger = false;
		alert(
			"【Drill_EventClosingTrigger.js 物体触发 - 固定区域 & 事件接近 & 条件触发】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"
		);
}



