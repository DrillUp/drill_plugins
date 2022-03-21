//=============================================================================
// Drill_EventAutoTrigger.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        物体触发 - 固定区域 & 玩家接近 & 条件触发
 * @author Drill_up
 * 
 * @Drill_LE_param "玩家触发-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_EAT_area_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventAutoTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得地图玩家能够自动触发 范围内+特定条件下 的事件的独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件必须依赖指定插件才能运行。
 * 基于：
 *   - Drill_CoreOfFixedArea        物体触发 - 固定区域核心★★v1.7及以上★★
 *     该插件需要固定区域才能进行区域触发。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.当前触发分为两种：玩家 与 被触发的事件。
 * 3.更多详细内容，去看看 "9.物体触发 > 关于物体触发-固定区域.docx"。
 * 传感器：
 *   (1.接近触发被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      当玩家的特定范围覆盖到事件时，独立开关会自动开启。
 *   (2.接近触发的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 开关大家族.docx"。
 * 区域主体：
 *   (1.该插件的区域主体是玩家，用于自动触发接近玩家区域的事件。
 *   (2.主动触发是一个区域范围，被触发是一个点，区域内符合条件的点会被触发。
 *      注意，这里玩家是主体，区域会一直跟着玩家，事件是点。
 * 细节：
 *   (1.玩家触发比较特殊，触发是连续不间断的。
 *   (2.你可以自定义条件关键字，用于连接玩家与不同的被触发的事件。
 * 设计：
 *   (1.玩家接近事件后，事件可以自己快速做出反应，比如逃跑/释放技能等。
 *   (2.你可以设计成某种接近后自动触发的开关，可见物体管理层的亮片。
 *      玩家需要在特定位置一次性点亮足够多的亮片，门才能被打开。
 *      亦或者，玩家须保持距离触发别的开关，一旦接近某事件门就立刻关上了。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 被触发
 * 如果你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>被触发 : 与玩家距离1 : 触发独立开关 : A
 * 事件注释：=>被触发 : 与玩家距离2 : 触发独立开关 : A
 * 事件注释：=>被触发 : 与玩家距离1 : 离开范围时自动OFF
 * 事件注释：=>被触发 : 与玩家距离2 : 离开范围时自动OFF
 *
 * 插件指令：>被触发 : 本事件 : 设置条件 : 与玩家距离1 : 触发独立开关 : A
 * 插件指令：>被触发 : 事件[10] : 设置条件 : 与玩家距离1 : 触发独立开关 : A
 * 插件指令：>被触发 : 事件变量[10] : 设置条件 : 与玩家距离1 : 触发独立开关 : A
 * 插件指令：>被触发 : 批量事件[10,11,12] : 设置条件 : 与玩家距离1 : 触发独立开关 : A
 * 
 * 插件指令：>被触发 : 本事件 : 设置条件 : 与玩家距离1 : 触发独立开关 : A
 * 插件指令：>被触发 : 本事件 : 设置条件 : 与玩家距离1 : 离开范围时自动OFF
 * 插件指令：>被触发 : 本事件 : 去除条件 : 与玩家距离1
 * 插件指令：>被触发 : 本事件 : 去除全部条件
 * 
 * 1.其中"与玩家距离1"是完全可以自定义的条件关键字。
 *   设置后，如果设置的玩家关键字与被动的对应上，将会触发开启独立开关。
 * 2.插件指令的 前半部分(本事件)和后半部分(设置条件)的参数可以随意组合。
 *   一共有4*4种组合方式。
 * 3.该插件注释与 条件触发 的注释结构一样，注意关键字的唯一性，不要混淆了。
 * 4.注意，因为该插件为连续触发，所以对范围进入与离开有监听。
 *   条件触发插件 为只触发一次情况，所以不具备该功能。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 玩家触发设置
 * 玩家是主动并且自动触发的，你可以对玩家的自动触发进行控制：
 * （注意，冒号左右有一个空格）
 *
 * 插件指令：>玩家接近主动触发 : 关闭触发 : 玩家触发[2]
 * 插件指令：>玩家接近主动触发 : 开启触发 : 玩家触发[2]
 *
 * 1.数字对应你在玩家范围中配置的触发，你也可以初始关闭某些触发，后期通过
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
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【59.74ms】
 *              100个事件的地图中，平均消耗为：【42.80ms】
 *               50个事件的地图中，平均消耗为：【28.62ms】
 * 测试方法2：  物体管理层的76个亮片，切换区域设置，边跑边测试。
 * 测试结果2：  200个事件的地图中，平均消耗为：【189.12ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件v1.2以前版本未优化到位，200个事件的消耗为【538.27ms】。
 *   如果未升级建议立即升级。
 * 3.在较好性能的游戏本中，200个事件的消耗只有27.94ms，流畅性自然比当前垃
 *   圾本要高的多了。高性能电脑固然支持清晰的画面和流畅的体验，但rmmv毕竟
 *   是2d游戏，如果2d游戏比3d游戏还卡，实在说不过去。
 * 4.玩家视野范围内出现大量事件时，消耗还是难以压下去。原先的49个亮片消耗
 *   并不多，60ms左右，而到了76个亮片时，消耗就骤然上升了。
 *   （另外，垃圾电脑的网页版运行只有3帧。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了多个被触发注释对应错误开关的bug。
 * [v1.2]
 * 添加了十字区域设置。
 * [v1.3]
 * 大幅度优化了内部算法结构，将538.27ms的消耗降低到59.74ms。
 * [v1.4]
 * 规范了插件指令，添加了批量事件功能。
 * [v1.5]
 * 分离了固定区域核心，优化了内部结构。
 * [v1.6]
 * 修复了筛选器的不能使用的bug，以及切换地图时事件仍然会触发开关A的bug。
 * [v1.7]
 * 修改了内部结构，以及注释说明。
 * 修复了接近触发时出现反复触发独立开关的bug。
 * [v1.8]
 * 实现了在循环地图边界时能正常触发的功能。
 * [v1.9]
 * 优化了部分计算方法，减少性能消耗。
 * [v2.0]
 * 优化了容器结构，减少性能消耗。
 * 
 * 
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，没有完全离开触发区域的事件也会被捕获到，并触发。
 * @default true
 * 
 * @param 玩家触发-1
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义玩家自动触发的设置。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离1","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"1","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-2
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离2","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"2","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-3
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离3","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"3","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-4
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离4","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"4","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-5
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离5","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"5","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-6
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离6","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"6","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-7
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离7","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"7","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-8
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离8","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"8","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-9
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-10
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-11
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-12
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-13
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-14
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-15
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-16
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-17
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-18
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-19
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-20
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-21
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-22
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-23
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-24
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-25
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-26
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-27
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-28
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-29
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-30
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-31
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-32
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-33
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-34
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-35
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-36
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-37
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-38
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-39
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-40
 * @parent ---玩家触发---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 */
/*~struct~ATriArea:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的玩家触发设置==
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
//		插件简称		EAT（Event_Auto_Trigger）
//		临时全局变量	DrillUp.g_EAT_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_EAT_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^3)			每帧	【直接for】
//						o(nlogn)+o(n^2)	每帧	【排序后】
//		性能测试因素	200个事件
//		性能测试消耗	538.27ms	【直接for】
//						59.74ms		【排序后】
//						269.32ms	【外加了固定区域+筛选器 76个亮片】
//		最坏情况		所有事件都在玩家范围内，并且所有事件都有"被触发"标签。
//		
//		2021-11-20优化	稍微优化了一下排序sort的处理方式。
//						在76个亮片中测试后： 87.01ms， 其中66.78ms（drill_EAT_playerTriggerRangeArea）20.24ms（drill_EAT_playerTriggerSelfArea）
//		2022-2-20优化	这里将非空容器单独分离出来，放到核心中。
//						能有效减少 复制新事件 造成的接近触发判定问题。
//		
//插件记录：
//		★大体框架与功能如下：
//			玩家接近触发：
//				->进入范围ON，离开自动OFF
//				->自定义区域触发方式
//				->优化，尽可能减少计算量
//				->固定区域核心交互
//			
//		★必要注意事项：
//			1.遍历关系如下：update -> player -> areas -> events -> points
//			  其中，update不可变，player只有1个，events经过排序优化。
//			  事件经过了两次指针存储：
//			2.为了更完美优化事件内容，一般多用【排序+break】，可以有效减少冗余的计算。
//			  与玩家接近的事件，最多十几个左右，所以每帧在200个事件中选出符合条件的事件最快的方法是排序。
//			  每次都 组装大数组 ，遍历，即使有条件设置，但是只要不break，仍然非常耗计算。
//			3.排序数组中的事件包括空值、已被销毁情况，你需要加条件区分。
//				
//		★其它说明细节：
//			1.该插件与【Drill_EventRangeTrigger】插件的"被触发"注释有交叉，但并不干扰对方，是独立的。
//			2.要使用独立开关判定，每次独立开关赋值都会刷新地图。
//			  离开范围需要off
//			  这里设置的所有被触发，都是直接跨 事件页 的，指定页被激活后，相关注释即可设定。
//			3.由于这里是持续触发，不需要存储上一次区域，所以内部结构不需要大幅度修改。
//			  这里要注意两个关系，一个是玩家位置的判定修正，另一个是触发敌人的判定修正。
//				
//		★存在的问题：
//			暂无
//	

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventAutoTrigger = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventAutoTrigger');

	
	DrillUp.g_EAT_fix = String(DrillUp.parameters['是否修正区域判定'] || "true") === "true";//几乎没有不修正的需求，所以直接修正
	
	DrillUp.g_EAT_area_max_x_range = 1;	//最大触发区域距离（优化用）
	DrillUp.g_EAT_area_max_y_range = 1;
	DrillUp.g_EAT_area_length = 40;
	DrillUp.g_EAT_area = [];
	for( var i = 0; i < DrillUp.g_EAT_area_length; i++ ){
		if( DrillUp.parameters["玩家触发-" + String(i+1) ] != "" ){
			DrillUp.g_EAT_area[i] = JSON.parse(DrillUp.parameters["玩家触发-" + String(i+1) ]);
			DrillUp.g_EAT_area[i]['enable'] = String(DrillUp.g_EAT_area[i]["初始是否开启"] || "true") == "true";
			DrillUp.g_EAT_area[i]['keyword'] = String(DrillUp.g_EAT_area[i]["触发关键字"]);
			DrillUp.g_EAT_area[i]['areaMode'] = String(DrillUp.g_EAT_area[i]["区域模式"]);
			
			DrillUp.g_EAT_area[i]['shapeMode'] = String(DrillUp.g_EAT_area[i]["形状区域"]);
			DrillUp.g_EAT_area[i]['shapeRange'] = Number(DrillUp.g_EAT_area[i]["形状区域范围"] || 1);
			DrillUp.g_EAT_area_max_x_range = Math.max(DrillUp.g_EAT_area[i]['shapeRange'],DrillUp.g_EAT_area_max_x_range);
			DrillUp.g_EAT_area_max_y_range = Math.max(DrillUp.g_EAT_area[i]['shapeRange'],DrillUp.g_EAT_area_max_y_range);
			
			var self_id = Number(DrillUp.g_EAT_area[i]["自定义区域编号"] || 1)  - 1;
			if( self_id > 0 ){
				var area = DrillUp.g_COFA_area_list[ self_id ]['points']
				for (var j = 0; j < area.length ; j++) {
					DrillUp.g_EAT_area_max_x_range = Math.max( area[j].x, DrillUp.g_EAT_area_max_x_range);
					DrillUp.g_EAT_area_max_y_range = Math.max( area[j].y, DrillUp.g_EAT_area_max_y_range);
				}
			}
			DrillUp.g_EAT_area[i]['self_id'] = self_id;
			DrillUp.g_EAT_area[i]['condition_enable'] = String(DrillUp.g_EAT_area[i]["是否开启筛选器"] || "true") == "true";
			DrillUp.g_EAT_area[i]['condition_id'] = Number(DrillUp.g_EAT_area[i]["筛选器编号"] || 1);
			
			//alert(JSON.stringify(DrillUp.g_EAT_area[i]));
		}else{
			DrillUp.g_EAT_area[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFixedArea ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EAT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EAT_pluginCommand.call(this, command, args);
	
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
					if( $gameMap.drill_EAT_isEventExist( e_ids[k] ) == false ){ continue; }
					var e = $gameMap.event( e_ids[k] );
					e._drill_EAT['tags'] = {};
				}
			}
		}
		if( e_ids && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "去除条件" ){
				for( var k=0; k < e_ids.length; k++ ){
					if( $gameMap.drill_EAT_isEventExist( e_ids[k] ) == false ){ continue; }
					var e = $gameMap.event( e_ids[k] );
					e._drill_EAT['tags'][temp2] = false;
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
						if( $gameMap.drill_EAT_isEventExist( e_ids[k] ) == false ){ continue; }
						var e = $gameMap.event( e_ids[k] );
						e._drill_EAT['tags'][temp2] = true;
						e._drill_EAT['self_switchs'][temp2] = temp4;
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
						if( $gameMap.drill_EAT_isEventExist( e_ids[k] ) == false ){ continue; }
						var e = $gameMap.event( e_ids[k] );
						e._drill_EAT['autoOff'][temp2] = true;
					}
				}
			}
		}
	}
	
	/*-----------------玩家接近主动触发------------------*/
	if( command === ">玩家接近主动触发" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("玩家触发[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) -1;
			if( type == "开启触发" ){
				$gameSystem._drill_EAT_enables[temp1] = true;
			}
			if( type == "关闭触发" ){
				$gameSystem._drill_EAT_enables[temp1] = false;
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EAT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventAutoTrigger.js 物体触发 - 固定区域&玩家接近&条件触发】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
}


//=============================================================================
// ** 事件
//=============================================================================	
//==============================
// ** 初始化
//==============================
var _drill_EAT_char_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	this._drill_EAT = {};				
	this._drill_EAT['tags'] = {};				//条件关键字（json串）
	this._drill_EAT['autoOff'] = {};			//自动off关键字（json串）
	this._drill_EAT['self_switchs'] = {};		//开启独立开关
	this._drill_EAT_isFirstBirth = true;		//第一次出生
	_drill_EAT_char_initialize.call( this,mapId, eventId );
};
//==============================
// ** 注释初始化
//==============================
var _drill_EAT_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EAT_event_setupPage.call(this);
    this.drill_EAT_setupPage();
};
Game_Event.prototype.drill_EAT_setupPage = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EAT_isFirstBirth ){ 
		this._drill_EAT_isFirstBirth = false;
		this.drill_EAT_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EAT_readPage( this.list() );
	}
};
//==============================
// * 读取注释
//==============================
Game_Event.prototype.drill_EAT_readPage = function( page_list ) {	
	page_list.forEach( function(l) {	//这里并不需要与另一个插件同步，因为他们仅仅是相同的注释有相同的效果而已
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>被触发"){	//=>被触发 : 击碎岩石 : 触发独立开关 : A
				if(args.length >= 4){
					if(args[1]){ var temp1 = String(args[1]); }
					if(args[3]){ var temp2 = String(args[3]); }
					if(args[5]){ var temp3 = String(args[5]); }
					if( temp2 == "触发独立开关" ){
						this._drill_EAT['tags'][temp1] = true;
						this._drill_EAT['self_switchs'][temp1] = temp3;
					}
					if( temp2 == "离开范围时自动OFF" ){
						this._drill_EAT['autoOff'][temp1] = true;
					}
				}
			};
		};
	}, this);
}

//=============================================================================
// * 存储变量初始化
//=============================================================================
var _drill_EAT_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EAT_system_initialize.call(this);
	this._drill_EAT_enables = [];					//玩家接近主动触发 开关
	for(var i=0; i<DrillUp.g_EAT_area.length ;i++ ){
		var area = DrillUp.g_EAT_area[i];
		if( area == undefined ){ 
			this._drill_EAT_enables.push( false );
		}else{
			this._drill_EAT_enables.push( area['enable'] );
		}
	}
};	

//=============================================================================
// * 地图界面
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_EAT_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_EAT_update.call(this,sceneActive);
	if( sceneActive && $gamePlayer != undefined ){
		this.drill_EAT_updateEventsOrderIndex();	//按玩家距离权值初始化
		this.drill_EAT_updateEventsSort();			//按玩家距离排序
		this.drill_EAT_updatePlayerTrigger();		//玩家触发
	}
};
//==============================
// * 帧刷新 - 按玩家距离排序（优化）
//==============================
Game_Map.prototype.drill_EAT_updateEventsOrderIndex = function() {
	
	// > 同步事件数组（事件数组变化了才同步）
	var availableEventTank = this.drill_COFA_getAvailableEventTank();
	if( this._drill_EAT_xy_events == undefined || this._drill_EAT_xy_events.length != availableEventTank.length ){
		this._drill_EAT_xy_events = availableEventTank.slice();
	}
	
	// > 设置权重
	for( var i=0; i < this._drill_EAT_xy_events.length; i++ ){
		var temp_event = this._drill_EAT_xy_events[i];
		
		// > 离玩家越远越后
		var distance = $gameMap.distance( temp_event._x, temp_event._y, $gamePlayer._x, $gamePlayer._y ); 
		temp_event._drill_EAT_orderIndex = distance;
	}
	
};
//==============================
// * 帧刷新 - 按玩家距离排序（优化）
//==============================
Game_Map.prototype.drill_EAT_updateEventsSort = function() {
	// > 排序
	this._drill_EAT_xy_events.sort(function(a, b){
		return a._drill_EAT_orderIndex - b._drill_EAT_orderIndex ;
	});
	//alert(this._drill_EAT_xy_events[0]._eventId);	//注意排序关系，第一个肯定是离玩家最近的事件
	//alert(this._drill_EAT_xy_events[1]._eventId);
	//alert(this._drill_EAT_xy_events[2]._eventId);
	//alert( $gameMap.distance(this._drill_EAT_xy_events[0]._realX,this._drill_EAT_xy_events[0]._realY,$gamePlayer._realX,$gamePlayer._realY ));
	//alert( $gameMap.distance(this._drill_EAT_xy_events[1]._realX,this._drill_EAT_xy_events[1]._realY,$gamePlayer._realX,$gamePlayer._realY ));
	//alert( $gameMap.distance(this._drill_EAT_xy_events[2]._realX,this._drill_EAT_xy_events[2]._realY,$gamePlayer._realX,$gamePlayer._realY ));
}

//==============================
// * 帧刷新 - 玩家触发
//==============================
Game_Map.prototype.drill_EAT_updatePlayerTrigger = function() {
	
	for(var i=0; i < DrillUp.g_EAT_area.length; i++ ){
		var a = DrillUp.g_EAT_area[i];
		if( a == undefined ){ continue; }
		
		// > 触发开关
		if( $gameSystem._drill_EAT_enables[i] != true ){ continue; }
			
		// > 筛选器对象
		var condition = null;
		if( a['condition_enable'] == true ){
			condition = DrillUp.g_COFA_condition_list[ a['condition_id']-1 ]; 
		}else{
			condition = {}
		}
		
		// > 自定义区域
		if( a['areaMode'] == "自定义区域"){
			this.drill_EAT_playerTriggerSelfArea( a['self_id'], condition, a['keyword'] );
			
		// > 形状区域
		}else{
			this.drill_EAT_playerTriggerRangeArea( a['shapeMode'],a['shapeRange'], condition, a['keyword'] );
		}
	}
}

//==============================
// * 玩家触发 - 形状区域（区域类型、区域范围、筛选器对象、条件关键字）
//==============================
Game_Map.prototype.drill_EAT_playerTriggerRangeArea = function( type, range, condition, tag ) {

	// > 位置修正
	var p_x = $gamePlayer._x;
	var p_y = $gamePlayer._y;
	if( DrillUp.g_EAT_fix ){
		p_x = Math.floor($gamePlayer._realX + 0.5);
		p_y = Math.floor($gamePlayer._realY + 0.5);
	}
	
	// > 获取范围内+已触发的事件
	var events = this.drill_EAT_getEventsInMaxRange();
	events = events.concat( this._drill_EAT_triggeredEvents.filter(	//并集
		function(v) { return events.indexOf(v) === -1}
	));
	
	// > 获取判定区域
	var cal_area = this.drill_COFA_getShapePointsWithCondition( p_x, p_y, type, range, condition );
	
	// > 触发区域
	this.drill_EAT_triggerArea( events, cal_area, tag);
}
//==============================
// * 玩家触发 - 自定义区域（自定义区域id、筛选器对象、条件关键字）
//==============================
Game_Map.prototype.drill_EAT_playerTriggerSelfArea = function( self_id, condition, tag ) {
	
	// > 获取范围内+已触发的事件
	var events = this.drill_EAT_getEventsInMaxRange();
	events = events.concat( this._drill_EAT_triggeredEvents.filter(	//并集
		function(v) { return events.indexOf(v) === -1}
	));
	
	// > 获取判定区域
	var cal_area = this.drill_COFA_getCustomPointsByPlayer( self_id );		//获取点集合（玩家）
	cal_area = this.drill_COFA_selectPoints( cal_area,condition );			//条件筛选
	
	// > 触发区域
	this.drill_EAT_triggerArea( events, cal_area, tag);
}
//==============================
// * 事件触发 - 触发区域（事件集合，实际区域[{x:21,y:31},{x:22,y:32}]，条件）
//==============================
Game_Map.prototype.drill_EAT_triggerArea = function( events, area, tag ) {
	
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event._drill_EAT['tags'][tag] == true ){		//大前提：事件含被触发标签
			
			var is_inArea = false;
			for( var j = 0; j < area.length ; j++ ){
				var temp_point = area[j];
				
				// > 判断
				if( temp_event.drill_EAT_isInPos( temp_point['x'], temp_point['y'] ) ){	
					
					var key = [this._mapId, temp_event._eventId, temp_event._drill_EAT['self_switchs'][tag] ];
					if( $gameSelfSwitches.value(key) !== true){
						$gameSelfSwitches.setValue(key,true);
						this.drill_EAT_triggeredEventsAdd(temp_event);	//记录需要自动off的所有事件
					}
					is_inArea = true;
					break;
				}
			}
			if( is_inArea == false && temp_event._drill_EAT['autoOff'][tag] == true ){	//自动off
				var key = [this._mapId, temp_event._eventId, temp_event._drill_EAT['self_switchs'][tag] ];
				if( $gameSelfSwitches.value(key) !== false){
					$gameSelfSwitches.setValue(key,false);
					this.drill_EAT_triggeredEventsRemove(temp_event);
				}
			}
		}
	}
}

//==============================
// * 优化 - 获取玩家最大触发范围内的所有事件
//==============================
Game_Map.prototype.drill_EAT_getEventsInMaxRange = function() {
	var result = [];
	for(var i=0; i < this._drill_EAT_xy_events.length ; i++){
		var temp_event = this._drill_EAT_xy_events[i];
		if( temp_event == undefined ){ break; }
		if( temp_event._drill_EAT_orderIndex == 99999 ){ break; }
		if( temp_event._drill_EAT_orderIndex > DrillUp.g_EAT_area_max_x_range+1 ){ break; }
		if( temp_event._drill_EAT_orderIndex > DrillUp.g_EAT_area_max_y_range+1 ){ break; }
		result.push( temp_event );
	}
	return result;
}
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_EAT_setValueWithOutChange = function( key, value ){
    if( value ){
        this._data[key] = true;
    }else{
        delete this._data[key];
    }
};
//==============================
// * 事件触发 - 判定位置
//==============================
Game_CharacterBase.prototype.drill_EAT_isInPos = function( x,y ){	

	// > 修正情况
	if( DrillUp.g_EAT_fix ){
		if( Math.abs( x - this._realX) <= 0.55 && 
			Math.abs( y - this._realY) <= 0.55 ){	//稍微扩大一点范围，可能会有未捕获到的区域误差
			return true;
		}else{
			return false;
		}
		
	// > 不修正
	}else{
		return this.pos( x,y );
	}
};


//=============================================================================
// * 事件标记容器
//=============================================================================
//==============================
// * 标记容器 - 初始化
//==============================
var _drill_EAT_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_EAT_initialize.call(this);
	this._drill_EAT_triggeredEvents = [];
}
//==============================
// * 标记容器 - 切换地图时清空
//==============================
var _drill_EAT_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	
	// > 切换地图时，清空所有触发过的独立开关
	if( this._drill_EAT_triggeredEvents.length > 0 ){
		this.drill_EAT_triggeredEventsClearAllSwitches();
	}
	
	// > 刷新
	_drill_EAT_setup.call(this,mapId);
	
	// > 容器初始化
	this._drill_EAT_triggeredEvents = [];
}

//==============================
// * 标记容器 - 添加已触发的事件
//==============================
Game_Map.prototype.drill_EAT_triggeredEventsAdd = function( temp_event ) {
	this._drill_EAT_triggeredEvents.push(temp_event);
}
//==============================
// * 标记容器 - 去除已触发的事件
//==============================
Game_Map.prototype.drill_EAT_triggeredEventsRemove = function( temp_event ) {
	for (var k=this._drill_EAT_triggeredEvents.length-1; k>=0; k-- ) {	
		if( this._drill_EAT_triggeredEvents[k] == temp_event){
			this._drill_EAT_triggeredEvents.splice(k,1);
			break;
		}
	}
}
//==============================
// * 标记容器 - 去除已触发的事件的所有标签对应的独立开关
//==============================
Game_Map.prototype.drill_EAT_triggeredEventsClearAllSwitches = function() {
	for( var i = 0;  i < this._drill_EAT_triggeredEvents.length; i++) {  
		var temp_event = this._drill_EAT_triggeredEvents[i];
		var temp_tags = Object.keys(temp_event._drill_EAT['tags']);
		for( var j = 0; j < temp_tags.length; j++ ){  
			if( temp_event._drill_EAT['tags'][temp_tags[j]] == true ){
				if( temp_event._drill_EAT['autoOff'][ temp_tags[j] ] == true ){	//自动off
					var key = [this._mapId, temp_event._eventId, temp_event._drill_EAT['self_switchs'][ temp_tags[j] ] ];
					if( $gameSelfSwitches.value(key) !== false){
						$gameSelfSwitches.setValue(key,false);
					}
				}
			}
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventAutoTrigger = false;
		alert(
			"【Drill_EventAutoTrigger.js 物体触发 - 固定区域&玩家接近&条件触发】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"
		);
}



