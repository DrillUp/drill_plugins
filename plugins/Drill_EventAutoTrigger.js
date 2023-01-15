//=============================================================================
// Drill_EventAutoTrigger.js
//=============================================================================

/*:
 * @plugindesc [v2.2]        物体触发 - 固定区域 & 玩家接近 & 条件触发
 * @author Drill_up
 * 
 * @Drill_LE_param "玩家触发-%d"
 * @Drill_LE_parentKey "---玩家触发组%d至%d---"
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
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFixedArea        物体触发-固定区域核心★★v1.8及以上★★
 *     该插件需要固定区域才能进行区域触发。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.更多相关内容，去看看 "9.物体触发 > 关于玩家接近触发.docx"。
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
 *   (1.玩家触发 是连续不间断的。
 *   (2.你可以自定义条件关键字，用于连接玩家与不同的被触发事件。
 * 多次优化：
 *   (1.插件的每个版本都在优化性能，从最初的368.27ms消耗（v1.2版本以前），
 *      到后来的优化排序的189.12ms消耗（v2.0版本以前），再到现在使用棋盘
 *      算法的再次优化，降低到80.58ms的消耗。
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
 * 测试结果：   200个事件的地图中，平均消耗为：【41.20ms】
 *              100个事件的地图中，平均消耗为：【32.18ms】
 *               50个事件的地图中，平均消耗为：【28.62ms】
 * 测试方法2：  物体管理层的76个亮片，切换区域设置，边跑边测试。
 * 测试结果2：  200个事件的地图中，平均消耗为：【80.58ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件v1.2以前版本：
 *   未优化到位，200个事件的消耗为【538.27ms】。
 *   如果未升级建议立即升级。
 * 3.在较好性能的游戏本中，200个事件的消耗只有27.94ms，流畅性自然比当前垃
 *   圾本要高的多了。高性能电脑固然支持清晰的界面和流畅的体验，但这里毕竟
 *   是2d游戏，如果2d游戏比3d游戏还卡，实在说不过去。
 * 4.插件v2.0以前版本：
 *   玩家视野范围内出现大量事件时，消耗还是难以压下去。
 *   76个亮片时，消耗高达189.12ms。（另外，垃圾电脑的网页版运行只有3帧。）
 * 5.现阶段版本：
 *   插件引入了棋盘算法，大幅度优化了算法筛选机制。
 *   76个亮片时，消耗平衡在80.58ms左右。（减少了一半的消耗）
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
 * [v2.1]
 * 使用了棋盘算法再次大幅度优化内部结构，减少了一半的性能消耗。
 * [v2.2]
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
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，没有完全离开触发区域的事件也会被捕获到，并触发。
 * @default true
 * 
 * @param ---玩家触发组 1至20---
 * @desc 
 * 
 * @param 玩家触发-1
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义玩家自动触发的设置。
 * @default {"标签":"==与玩家距离1==","初始是否开启":"true","触发关键字":"与玩家距离1","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"1","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-2
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离2==","初始是否开启":"true","触发关键字":"与玩家距离2","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"2","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-3
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离3==","初始是否开启":"true","触发关键字":"与玩家距离3","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"3","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-4
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离4==","初始是否开启":"true","触发关键字":"与玩家距离4","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"4","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-5
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离5==","初始是否开启":"true","触发关键字":"与玩家距离5","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"5","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-6
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离6==","初始是否开启":"true","触发关键字":"与玩家距离6","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"6","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-7
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离7==","初始是否开启":"true","触发关键字":"与玩家距离7","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"7","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-8
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default {"标签":"==与玩家距离8==","初始是否开启":"true","触发关键字":"与玩家距离8","区域模式":"形状区域","形状区域":"菱形区域","形状区域范围":"8","自定义区域编号":"1","是否开启筛选器":"false","筛选器编号":"1"}
 *
 * @param 玩家触发-9
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-10
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-11
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-12
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-13
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-14
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-15
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-16
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-17
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-18
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-19
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-20
 * @parent ---玩家触发组 1至20---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param ---玩家触发组21至40---
 * @desc 
 *
 * @param 玩家触发-21
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-22
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-23
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-24
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-25
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-26
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-27
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-28
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-29
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-30
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-31
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-32
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-33
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-34
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-35
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-36
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-37
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-38
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-39
 * @parent ---玩家触发组21至40---
 * @type struct<ATriArea>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 玩家触发-40
 * @parent ---玩家触发组21至40---
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
 * @param DEBUG-是否显示区域
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，当在DEBUG调试时，该区域将显示出来。
 * @default false
 * 
 * @param DEBUG-区域颜色
 * @parent DEBUG-是否显示区域
 * @desc 当开启DEBUG调试时，该区域显示的颜色。
 * @default #00ff00
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
//<<<<<<<<性能记录<<<<<<<<
//
//		
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)			每帧	【直接for】
//						o(nlogn)+o(n^2)	每帧	【排序后】
//						o(nlogn)+o(n^2)	每帧	【棋盘算法】（直接减少了n的基数）
//		★性能测试因素	200个事件
//		★性能测试消耗	> 538.27ms	【直接for】
//						> 59.74ms	【排序后】
//						  269.32ms	【排序后，外加 固定区域+筛选器 76个亮片】
//						> 28.20ms	【棋盘算法】
//						  80.58ms	【棋盘算法，外加 固定区域+筛选器 76个亮片】
//		★最坏情况		所有事件都在玩家范围内，并且所有事件都有"被触发"条件。
//		★备注			暂无
//		
//		★优化记录
//			2021-11-20优化
//				稍微优化了一下排序sort的处理方式。（可能由于函数分散，所以没测准）
//				在76个亮片中测试后： 87.01ms， 其中66.78ms（drill_EAT_playerTriggerRangeArea）20.24ms（drill_EAT_playerTriggerSelfArea）
//			2022-2-20优化
//				这里将非空容器单独分离出来，放到核心中。
//				能有效减少 复制新事件 造成的接近触发判定问题。
//			2022-5-4优化
//				使用了棋盘算法
//				在76个亮片中测试后： 
//				棋盘算法（垃圾本）：80.58ms（drill_EAT_updatePlayerTrigger）持续在1帧的位置。
//				棋盘算法（高配本）：80.70ms（drill_EAT_checkerboardTriggered）持续在15帧的位置。
//				坐标遍历算法（垃圾本）：145.67ms（drill_EAT_playerTriggerRangeArea）垃圾本持续在0帧和1帧波动，明显棋盘算法没出现0帧的情况。
//		
//<<<<<<<<插件记录<<<<<<<<
//		
//		★大体框架与功能如下：
//			玩家接近触发：
//				->指令
//					->插件指令
//					->事件注释
//				->玩家接近棋盘
//					->创建棋盘
//						->形状区域
//						->自定义区域
//					->最大触发距离
//						->正方形棋盘（考虑到朝向变化）
//				->排序
//					->离玩家最大距离
//				->玩家触发
//					->棋盘内
//						> 棋盘点数据
//						> 棋盘筛选器
//						> 玩家触发 - 开关
//						> 玩家触发 - 关键字
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
//				->事件已触发容器
//					->记录事件
//			
//		★必要注意事项：
//			1.当前使用了棋盘算法。
//			  你可以在固定区域里面自定义一大堆的区域，这些区域都应该被压缩到一个棋盘里面，
//			  事件进入玩家的范围，根据棋盘的分布，找到相应的自定义区域，然后按条件依次触发开关。
//			2.插件有三个对象： 玩家，棋盘范围，目标事件
//			  触发有只有一种：目标事件进入棋盘范围 -> 目标事件开开关
//			  玩家是棋盘范围的所有者，但不与棋盘范围交互。
//				
//		★其它说明细节：
//			1.该插件与【Drill_EventRangeTrigger】插件的"被触发"注释有交叉，但并不干扰对方，是独立的。
//			2.由于这里是持续触发，不需要存储上一次区域，所以内部结构不需要大幅度修改。
//			  这里要注意两个关系，一个是玩家位置的判定修正，另一个是触发敌人的判定修正。
//		
//		★旧版本日志：
//			1.直接for遍历
//			  关系如下：update -> player -> areas -> events -> points
//			  其中，update不可变，player只有1个，events经过排序优化。
//			  事件经过了两次指针存储：
//			2.排序法：
//			  为了更完美优化事件内容，一般多用【排序+break】，可以有效减少冗余的计算。
//			  与玩家接近的事件，最多十几个左右，所以每帧在200个事件中选出符合条件的事件最快的方法是排序。
//			  每次都 组装大数组 ，遍历，即使有条件设置，但是只要不break，仍然非常耗计算。
//			  排序数组中的事件包括空值、已被销毁情况，你需要加条件区分。
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
	
	
	//==============================
	// * 变量获取 - 玩家触发
	//				（~struct~ATriArea）
	//==============================
	DrillUp.drill_EAT_areaInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['keyword'] = String( dataFrom["触发关键字"] || "");
		data['areaMode'] = String( dataFrom["区域模式"] || "形状区域");
		
		// > 形状区域
		data['shapeMode'] = String( dataFrom["形状区域"] || "方形区域");
		data['shapeRange'] = Number( dataFrom["形状区域范围"] || 1);
		
		// > 自定义区域
		data['self_id'] = Number( dataFrom["自定义区域编号"] || 1);
		
		// > 筛选器
		data['condition_enable'] = String( dataFrom["是否开启筛选器"] || "true") == "true";
		data['condition_id'] = Number( dataFrom["筛选器编号"] || 1);
		
		// > DEBUG
		data['debug_enabled'] = String( dataFrom["DEBUG-是否显示区域"] || "false") == "true";
		data['debug_color'] = String( dataFrom["DEBUG-区域颜色"] || "#ffff00");
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_EAT_debugEnabled = String(DrillUp.parameters['DEBUG-触发区域显示'] || "false") === "true";
	DrillUp.g_EAT_fix = String(DrillUp.parameters['是否修正区域判定'] || "true") === "true";//几乎没有不修正的需求，所以直接修正
	
	/*-----------------玩家触发组------------------*/
	DrillUp.g_EAT_area_length = 40;
	DrillUp.g_EAT_area = [];
	for( var i = 0; i < DrillUp.g_EAT_area_length; i++ ){
		if( DrillUp.parameters["玩家触发-" + String(i+1) ] != "" &&
			DrillUp.parameters["玩家触发-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["玩家触发-" + String(i+1) ]);
			DrillUp.g_EAT_area[i] = DrillUp.drill_EAT_areaInit( data );
			DrillUp.g_EAT_area[i]['id'] = i;
		}else{
			DrillUp.g_EAT_area[i] = null;
		}
	}
	
	/*-----------------检查关键字 重复情况------------------*/
	DrillUp.g_EAT_area_keyWordList = [];
	for(var i = 0; i < DrillUp.g_EAT_area.length; i++ ){
		var area = DrillUp.g_EAT_area[i];
		if( area == undefined ){ continue; }
		if( DrillUp.g_EAT_area_keyWordList.contains(area['keyword']) ){
			alert(
				"【Drill_EventAutoTrigger.js 物体触发 - 固定区域 & 玩家接近 & 条件触发】\n"+
				"错误，玩家触发-"+String(i+1)+"的触发关键字，与之前的设置重复，你需要手动修改确保 触发关键字 唯一。"
			);
			continue;
		}
		DrillUp.g_EAT_area_keyWordList.push( area['keyword'] );
	}
	
	//==============================
	// * 数据 - 根据触发关键字获取事件触发
	//==============================
	DrillUp.drill_EAT_getAreaByKeyword = function( keyword ){
		for(var i=0; i < this.g_EAT_area.length; i++){
			var area = this.g_EAT_area[i];
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
					e.drill_EAT_removeAllTag();
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
					e.drill_EAT_removeTag( temp2 );
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
						e.drill_EAT_addTag( temp2, temp4 );
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
						e.drill_EAT_setAutoOff( temp2, true );
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
		alert( "【Drill_EventAutoTrigger.js 物体触发 - 固定区域 & 玩家接近 & 条件触发】\n" +
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
var _drill_EAT_ev_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	this._drill_EAT_isFirstBirth = true;	//第一次出生
	_drill_EAT_ev_initialize.call( this,mapId, eventId );
};
//==============================
// * 事件注释 - 注释初始化
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
// * 事件注释 - 读取注释
//==============================
Game_Event.prototype.drill_EAT_readPage = function( page_list ) {	
	page_list.forEach( function(l) {	//这里并不需要与另一个插件同步，因为他们仅仅是相同的注释有相同的效果而已
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>被触发" ){	//=>被触发 : 击碎岩石 : 触发独立开关 : A
				if(args.length == 4){
					var temp1 = String(args[1]);
					var type = String(args[3]);
					if( type == "离开范围时自动OFF" ){
						this.drill_EAT_setAutoOff( temp1, true );
					}
				}
				if(args.length == 6){
					var temp1 = String(args[1]);
					var type = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "触发独立开关" ){
						this.drill_EAT_addTag( temp1, temp2 );
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
DrillUp.g_EAT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EAT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EAT_sys_initialize.call(this);
	this.drill_EAT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EAT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EAT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EAT_saveEnabled == true ){	
		$gameSystem.drill_EAT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EAT_initSysData();
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
Game_System.prototype.drill_EAT_initSysData = function() {
	this.drill_EAT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EAT_checkSysData = function() {
	this.drill_EAT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EAT_initSysData_Private = function() {
	
	this._drill_EAT_enables = [];					//玩家接近主动触发 开关
	for(var i=0; i<DrillUp.g_EAT_area.length; i++ ){
		var area = DrillUp.g_EAT_area[i];
		if( area == undefined ){
			this._drill_EAT_enables.push( false );
		}else{
			this._drill_EAT_enables.push( area['enable'] );
		}
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EAT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EAT_enables == undefined ){
		this.drill_EAT_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	(因为默认已经赋值 false 了，无法根据空来检查)
};


//=============================================================================
// ** 玩家接近 棋盘
//
//			说明：	> 棋盘中按照 点列表 依次塞入 玩家触发id和其它条件。
//					> 注意，棋盘中不含筛选器情况，从棋盘中拿到点后，要手动操作一下筛选器。
//=============================================================================
//==============================
// * 棋盘 - 初始化
//==============================
var _drill_EAT_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function(){
	_drill_EAT_initMembers.call(this);
	this._drill_EAT_checkerboard = {};
	this._drill_EAT_checkerboard['matrix'] = null;			//棋盘矩阵
	this._drill_EAT_checkerboard['matrix_inited'] = false;	//棋盘初始化标记
	this._drill_EAT_checkerboard['max_x'] = 1;				//最大触发距离X（注意，不是棋盘宽度）
	this._drill_EAT_checkerboard['max_y'] = 1;				//最大触发距离Y（注意，不是棋盘高度）
	this._drill_EAT_checkerboard['c_x'] = 0;				//棋盘中心点X
	this._drill_EAT_checkerboard['c_y'] = 0;				//棋盘中心点Y
};
//==============================
// * 棋盘 - 创建棋盘
//
//			说明：	只读数据，然后依次将数据塞入棋盘中。
//==============================
Game_Player.prototype.drill_EAT_createCheckerboard = function( EAT_area_list ){
	if( this._drill_EAT_checkerboard['matrix_inited'] == true ){ return; }
	this._drill_EAT_checkerboard['matrix_inited'] = true;
	
	// > 最大触发距离初始化
	this.drill_EAT_initMaxRange( EAT_area_list );
	
	// > 棋盘中心点
	var x_range = this._drill_EAT_checkerboard['max_x'];
	var y_range = this._drill_EAT_checkerboard['max_y'];
	this._drill_EAT_checkerboard['c_x'] = x_range;
	this._drill_EAT_checkerboard['c_y'] = y_range;
	var x_length = x_range*2 +1;
	var y_length = y_range*2 +1;
	
	// > 构建棋盘
	this._drill_EAT_checkerboard['matrix'] = [];	
	for(var x=0; x < x_length; x++){
		this._drill_EAT_checkerboard['matrix'][x] = [];
		for(var y=0; y < y_length; y++){
			this._drill_EAT_checkerboard['matrix'][x][y] = [];
		}
	}
		
	// > 插入区域信息
	for( var i = 0; i < EAT_area_list.length; i++ ){
		var area_data = EAT_area_list[i];
		if( area_data == undefined ){ continue; }
		
		if( area_data['areaMode'] == "形状区域" ){
			
			// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
			var area_ptr = {};
			area_ptr['id'] = area_data['id'];		//玩家触发id
			area_ptr['direction'] = 0;				//朝向条件（0表示无条件，2/4/6/8表示特定朝向）
			
			// > 区域准备
			var cal_area = $gameMap.drill_COFA_getShapePoints( 
				this._drill_EAT_checkerboard['c_x'], 
				this._drill_EAT_checkerboard['c_y'], 
				area_data['shapeMode'], area_data['shapeRange']
			);
			
			// > 将 棋盘点数据 塞入棋盘
			for(var x=0; x < x_length; x++){
				for(var y=0; y < y_length; y++){
					for(var k=0; k < cal_area.length; k++){
						var point = cal_area[k];
						if( point['x'] == x && point['y'] == y ){
							this._drill_EAT_checkerboard['matrix'][x][y].push( area_ptr );
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
			var cal_area_2 = $gameMap.drill_COFA_getCustomPoints( this._drill_EAT_checkerboard['c_x'], this._drill_EAT_checkerboard['c_y'], 2, def_area['points'] );
			var cal_area_4 = $gameMap.drill_COFA_getCustomPoints( this._drill_EAT_checkerboard['c_x'], this._drill_EAT_checkerboard['c_y'], 4, def_area['points'] );
			var cal_area_6 = $gameMap.drill_COFA_getCustomPoints( this._drill_EAT_checkerboard['c_x'], this._drill_EAT_checkerboard['c_y'], 6, def_area['points'] );
			var cal_area_8 = $gameMap.drill_COFA_getCustomPoints( this._drill_EAT_checkerboard['c_x'], this._drill_EAT_checkerboard['c_y'], 8, def_area['points'] );
			
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
								
								this._drill_EAT_checkerboard['matrix'][x][y].push( area_ptr );
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
							
							this._drill_EAT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
					for(var k=0; k < cal_area_4.length; k++){
						var point = cal_area_4[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 4;				//朝向条件
							
							this._drill_EAT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
					for(var k=0; k < cal_area_6.length; k++){
						var point = cal_area_6[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 6;				//朝向条件
							
							this._drill_EAT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
					for(var k=0; k < cal_area_8.length; k++){
						var point = cal_area_8[k];
						if( point['x'] == x && point['y'] == y ){
							
							// > 棋盘点数据（注意，只放与棋盘相关条件的数据）
							var area_ptr = {};
							area_ptr['id'] = area_data['id'];		//事件触发id
							area_ptr['direction'] = 8;				//朝向条件
							
							this._drill_EAT_checkerboard['matrix'][x][y].push( area_ptr );
						}
					}
				}
			};
			
		}
	}
	
	// > 区域块可视化
	$gameTemp._drill_EAT_DEBUG_spriteNeedRefresh = true;
}
//==============================
// * 棋盘 - 最大触发距离初始化
//
//			说明：	此函数针对 棋盘的max_x和max_y参数进行初始化。
//==============================
Game_Player.prototype.drill_EAT_initMaxRange = function( EAT_area_list ){
	this._drill_EAT_checkerboard['max_x'] = 1;		//最大触发距离（优化用）
	this._drill_EAT_checkerboard['max_y'] = 1;
	
	for( var i = 0; i < EAT_area_list.length; i++ ){
		var area_data = EAT_area_list[i];
		if( area_data == undefined ){ continue; }
		
		if( area_data['areaMode'] == "形状区域" ){
			this._drill_EAT_checkerboard['max_x'] = Math.max( area_data['shapeRange'], this._drill_EAT_checkerboard['max_x'] );
			this._drill_EAT_checkerboard['max_y'] = Math.max( area_data['shapeRange'], this._drill_EAT_checkerboard['max_y'] );
		}
		if( area_data['areaMode'] == "自定义区域" ){
			var self_id = area_data['self_id'];
			if( self_id <= 0 ){ continue; }
			var area = DrillUp.g_COFA_area_list[ self_id-1 ]['points'];
			for( var j = 0; j < area.length; j++ ){
				this._drill_EAT_checkerboard['max_x'] = Math.max( Math.abs(area[j].x), this._drill_EAT_checkerboard['max_x'] );
				this._drill_EAT_checkerboard['max_y'] = Math.max( Math.abs(area[j].y), this._drill_EAT_checkerboard['max_y'] );
			}
		}
	}
	
	// > 考虑到朝向变化问题，这里设为正方形
	if( this._drill_EAT_checkerboard['max_x'] < this._drill_EAT_checkerboard['max_y'] ){
		this._drill_EAT_checkerboard['max_x'] = this._drill_EAT_checkerboard['max_y'];
	}else{
		this._drill_EAT_checkerboard['max_y'] = this._drill_EAT_checkerboard['max_x'];
	}
}

//=============================================================================
// ** 玩家接近 棋盘变化控制
//=============================================================================
//==============================
// * 棋盘变化 - 创建
//==============================
var _drill_EAT_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_EAT_setup.call( this, mapId );
	$gamePlayer.drill_EAT_createCheckerboard( DrillUp.g_EAT_area );	//创建棋盘（只创建一次，一次全创建）
}



//=============================================================================
// ** 排序（最大距离）
//
//			说明：	> 这里的距离不是指 曼哈顿距离，而是 横向/纵向距离 的最大值。
//					> 此部分 只提供一个功能：【获取矩形范围内的所有物体】。
//					> （暂不考虑四叉树算法）
//=============================================================================
//==============================
// * 排序 - 帧刷新
//==============================
var _drill_EAT_update_sort = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EAT_update_sort.call( this,sceneActive );
	if( sceneActive && $gamePlayer != undefined ){
		this.drill_EAT_updateEventsTank();			//帧刷新 - 容器变化
		this.drill_EAT_updateEventsOrderIndex();	//帧刷新 - 排序权值
		this.drill_EAT_updateEventsSort();			//帧刷新 - 执行排序
	}
};
//==============================
// * 排序 - 帧刷新容器变化
//==============================
Game_Map.prototype.drill_EAT_updateEventsTank = function() {
	
	// > 临时排序数组 初始化
	if( this._drill_EAT_xy_events == undefined ){
		this._drill_EAT_xy_events = this.drill_COFA_getAvailableEventTank_Copyed();
	}
	
	// > 临时排序数组 同步（事件数组变化了才同步）
	var aTank_ptr = this.drill_COFA_getAvailableEventTank_Pointer();
	if( this._drill_EAT_xy_events.length != aTank_ptr.length ){
		this._drill_EAT_xy_events = this.drill_COFA_getAvailableEventTank_Copyed();
	}
};
//==============================
// * 排序 - 帧刷新排序权值
//==============================
Game_Map.prototype.drill_EAT_updateEventsOrderIndex = function() {
	
	// > 设置权重
	for( var i=0; i < this._drill_EAT_xy_events.length; i++ ){
		var temp_event = this._drill_EAT_xy_events[i];
		
		// > 离玩家 最大横向距离
		var dx = Math.abs( this.deltaX(temp_event._x, $gamePlayer._x) );
		var dy = Math.abs( this.deltaY(temp_event._y, $gamePlayer._y) );
		temp_event._drill_EAT_orderIndex = Math.max( dx, dy );
	}
	
};
//==============================
// * 排序 - 帧刷新执行排序
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
};
//==============================
// * 排序 - 获取 矩形范围 内的所有事件
//==============================
Game_Map.prototype.drill_EAT_getEventsInMaxRange = function() {
	var result = [];
	for(var i=0; i < this._drill_EAT_xy_events.length; i++ ){
		var temp_event = this._drill_EAT_xy_events[i];	//（容器中事件全部非空）
		if( temp_event._drill_EAT_orderIndex > Math.max( $gamePlayer._drill_EAT_checkerboard['max_x'], $gamePlayer._drill_EAT_checkerboard['max_y']) ){ break; }
		result.push( temp_event );
	}
	return result;
};


//=============================================================================
// ** 玩家触发
//=============================================================================
//==============================
// * 玩家触发 - 帧刷新
//==============================
var _drill_EAT_update_trigger = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EAT_update_trigger.call( this,sceneActive );
	if( sceneActive && $gamePlayer != undefined ){
		this.drill_EAT_updatePlayerTrigger();		//帧刷新 - 事件触发棋盘
	}
};
//==============================
// * 帧刷新 - 事件触发棋盘
//==============================
Game_Map.prototype.drill_EAT_updatePlayerTrigger = function() {
	if( $gamePlayer._drill_EAT_checkerboard == undefined ){ return; }
	if( $gamePlayer._drill_EAT_checkerboard['matrix'] == undefined ){ return; }
	var c_board = $gamePlayer._drill_EAT_checkerboard;
	
	// > 相关事件
	var events = this.drill_EAT_getEventsInMaxRange();
	events = events.concat( this._drill_EAT_triggeredEvents.filter(	//并集
		function(v) { return events.indexOf(v) === -1}
	));
	
	// > 事件确定
	for(var i=0; i < events.length; i++ ){
		var tar_event = events[i];
		
		// > 位置修正
		var dx;
		var dy;
		if( DrillUp.g_EAT_fix ){
			dx = Math.floor( this.deltaX(tar_event._realX, $gamePlayer._realX) +0.55 );
			dy = Math.floor( this.deltaY(tar_event._realY, $gamePlayer._realY) +0.55 );
		}else{
			dx = this.deltaX(tar_event._x, $gamePlayer._x);
			dy = this.deltaY(tar_event._y, $gamePlayer._y);
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
			this.drill_EAT_checkerboardTriggered( tar_event, $gamePlayer, area_ptr_list );
			
			
		// > 事件在棋盘外（注意，棋盘真实形状是所有形状的组合，不一定是方形）
		}else{
			this.drill_EAT_autoOffAllTag( tar_event );		//（自关标记 的全关）
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
Game_Map.prototype.drill_EAT_checkerboardTriggered = function( tar_event, org_event, area_ptr_list ){
	
	var tar_inTag_list = [];	//（记录 自关标记）
	for(var k=0; k < area_ptr_list.length; k++ ){
		var area_ptr = area_ptr_list[k];
		
		// > 棋盘点数据 条件（条件必须符合特定的方向）
		var pass = false;
		if( area_ptr['direction'] == 0 ){
			pass = true;
		}
		if( area_ptr['direction'] > 0 &&
			area_ptr['direction'] == org_event._direction ){
			pass = true;
		}
		if( pass == false ){
			continue;
		}
		
		// > 接近触发数据
		var area = DrillUp.g_EAT_area[ area_ptr['id'] ];
		if( area == undefined ){ continue; }		//（注意这一步，不可能为空）
		
		// > 大前提：触发条件必须开启
		if( $gameSystem._drill_EAT_enables[ area_ptr['id'] ] != true ){ continue; }
		
		// > 棋盘筛选器
		var condition = null;
		if( area['condition_enable'] == true ){
			condition = DrillUp.g_COFA_condition_list[ area['condition_id']-1 ]; 
		}else{
			condition = {}
		}
		if( this.drill_COFA_isPointMatched(tar_event,condition) == false ){ continue; }	//（筛选器 - 单点条件匹配）
		
		// > 触发 主动事件
		//（无）
		// > 触发 目标事件
		if( tar_event.drill_EAT_hasTag( area['keyword'] ) == true ){
			this.drill_EAT_triggerTag( tar_event, area['keyword'], true );
			tar_inTag_list.push( area['keyword'] );
		}
		
		// > 捕获测试（捕获到的目标事件，触发了什么条件）
		//alert( area['keyword'] );
	}		
	
	// > 选择性关闭 自关标记（主动事件）
	//（无）
	// > 选择性关闭 自关标记（目标事件）
	this.drill_EAT_autoOffAllTagWithoutInTag( tar_event, tar_inTag_list );
}
//==============================
// * 开关触发 - 选择性关闭 自关标记（子流程）
//
//			参数：	> e 对象（目标事件）
//					> inTag_list 字符串数组（排除列表）
//			说明：	> 只关闭含 自关标记 的条件。
//					> 关闭除 inTag_list 中以外的自关标记。
//					> 如果两个条件指向了同一个开关，条件A符合棋盘，条件B不符合棋盘，那么这个开关不要关。
//					> 所以这里获取 自关标记的开关 和 触发的开关，取差集，然后关闭过滤的独立开关即可。
//==============================
Game_Map.prototype.drill_EAT_autoOffAllTagWithoutInTag = function( e, inTag_list ){
	var offTag_list = e.drill_EAT_getAutoOffTagList();
	var offSwitch_list = e.drill_EAT_getTagSwitchList(offTag_list);
	var inSwitch_list = e.drill_EAT_getTagSwitchList(inTag_list);
	
	for(var k=0; k < offSwitch_list.length; k++ ){
		var switch_name = offSwitch_list[k];
		if( inSwitch_list.contains( switch_name ) ){
			continue;
		}
		this.drill_EAT_triggerSwitch( e, switch_name, false );
	}
}
//==============================
// * 开关触发 - 关闭所有 自关标记 的独立开关（子流程）
//
//			说明：	> 直接全关，不做比较。
//==============================
Game_Map.prototype.drill_EAT_autoOffAllTag = function( e ){
	var offTag_list = e.drill_EAT_getAutoOffTagList();
	for(var k=0; k < offTag_list.length; k++ ){
		this.drill_EAT_triggerTag( e, offTag_list[k], false );
	}
}
//==============================
// * 开关触发 - 触发指定事件的条件（子流程）
//==============================
Game_Map.prototype.drill_EAT_triggerTag = function( e, tag, enabled ){
	
	// > 不含条件则跳过
	if( e.drill_EAT_hasTag( tag ) != true ){ return; }
	
	var switchName = e.drill_EAT_getTagSwitch( tag );
	this.drill_EAT_triggerSwitch( e, switchName, enabled );
}
//==============================
// * 开关触发 - 执行触发（基函数）
//
//			说明：	> 由于独立开关受 Game_Map 控制，因此该函数不能转移到 事件类 中。
//					> 开关触发因为受到 事件条件 的限制关系，所以被分成了多个 子流程 函数。
//==============================
Game_Map.prototype.drill_EAT_triggerSwitch = function( e, switchName, enabled ){
	
	// > 开启独立开关
	if( enabled == true ){
		var key = [this._mapId, e._eventId, switchName ];
		if( $gameSelfSwitches.value(key) !== true){
			$gameSelfSwitches.setValue(key,true);
			this.drill_EAT_triggeredEventsAdd( e );		//（记录需要 自关标记 的事件）
		}
		
	// > 关闭独立开关
	}else{
		var key = [this._mapId, e._eventId, switchName ];
		if( $gameSelfSwitches.value(key) !== false){
			$gameSelfSwitches.setValue(key,false);
			this.drill_EAT_triggeredEventsRemove( e );	//（开关关闭后，去除 自关标记 标记）
		}
	}
}


//=============================================================================
// ** 事件条件数据
//
//			说明：	> 事件条件与独立开关 的数据，单独绑定在事件身上。
//					  这里只是一个访问器的结构。
//					> 此设置与 事件接近 的结构一致。
//=============================================================================
//==============================
// * 事件条件 - 初始化
//==============================
var _drill_EAT_ev_initialize2 = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	
	// > 参数初始化
	this._drill_EAT = {};				
	this._drill_EAT['tags'] = {};				//条件 - 条件集
	this._drill_EAT['tags_switches'] = {};		//条件 - 对应的独立开关
	this._drill_EAT['tags_autoOff'] = {};		//条件 - 自关标记设置
	
	// > 原函数
	_drill_EAT_ev_initialize2.call( this, mapId, eventId );
};
//==============================
// * 事件条件 - 添加条件
//==============================
Game_Event.prototype.drill_EAT_addTag = function( tag_name, switch_name ){
	if( DrillUp.g_EAT_area_keyWordList.contains(tag_name) == false ){ return; }//（关键字对不上，则不添加）
	this._drill_EAT['tags'][ tag_name ] = true;
	this._drill_EAT['tags_switches'][ tag_name ] = switch_name;
};
//==============================
// * 事件条件 - 设置条件自关标记
//==============================
Game_Event.prototype.drill_EAT_setAutoOff = function( tag_name, enabled ){
	if( DrillUp.g_EAT_area_keyWordList.contains(tag_name) == false ){ return; }//（关键字对不上，则不添加）
	this._drill_EAT['tags_autoOff'][ tag_name ] = enabled;
};
//==============================
// * 事件条件 - 去除条件
//==============================
Game_Event.prototype.drill_EAT_removeTag = function( tag_name ){
	this._drill_EAT['tags'][ tag_name ] = null;
	this._drill_EAT['tags_switches'][ tag_name ] = null;
	this._drill_EAT['tags_autoOff'][ tag_name ] = null;
};
//==============================
// * 事件条件 - 去除全部条件
//==============================
Game_Event.prototype.drill_EAT_removeAllTag = function(){
	this._drill_EAT['tags'] = {};
	this._drill_EAT['tags_switches'] = {};
	this._drill_EAT['tags_autoOff'] = {};
};
//==============================
// * 获取 - 判断条件
//==============================
Game_Event.prototype.drill_EAT_hasTag = function( tag_name ){
	return this._drill_EAT['tags'][ tag_name ] == true;
};
//==============================
// * 获取 - 获取全部条件
//==============================
Game_Event.prototype.drill_EAT_getAllTag = function(){
	return Object.keys( this._drill_EAT['tags'] );
};
//==============================
// * 获取 - 获取自关标记的条件
//==============================
Game_Event.prototype.drill_EAT_getAutoOffTagList = function(){
	return Object.keys( this._drill_EAT['tags_autoOff'] );
};
//==============================
// * 获取 - 判断条件是否自关标记
//
//			说明：	注意，先判断是否存在条件，再获取对应的自关标记情况。
//==============================
Game_Event.prototype.drill_EAT_isTagAutoOff = function( tag_name ){
	return this._drill_EAT['tags_autoOff'][ tag_name ] == true;
};
//==============================
// * 获取 - 条件对应的独立开关
//
//			说明：	注意，先判断是否存在条件，再获取对应的独立开关。
//==============================
Game_Event.prototype.drill_EAT_getTagSwitch = function( tag_name ){
	return this._drill_EAT['tags_switches'][ tag_name ];
};
//==============================
// * 获取 - 条件对应的独立开关列表
//
//			说明：	> 返回的独立开关不重复。
//					> 注意，先判断是否存在条件，再获取对应的独立开关。
//==============================
Game_Event.prototype.drill_EAT_getTagSwitchList = function( tag_name_list ){
	var result = [];
	for(var i=0; i < tag_name_list.length; i++){
		var switch_name = this._drill_EAT['tags_switches'][ tag_name_list[i] ];
		if( result.contains(switch_name) ){ continue; }
		result.push(switch_name);
	}
	return result;
};


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
var _drill_EAT_initialize2 = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_EAT_initialize2.call(this);
	this._drill_EAT_triggeredEvents = [];
}
//==============================
// * 已触发容器 - 切换地图时清空
//==============================
var _drill_EAT_setup2 = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	
	// > 切换地图时，清空所有触发过的独立开关
	if( this._drill_EAT_triggeredEvents.length > 0 ){
		this.drill_EAT_triggeredEventsClearAllSwitches();
	}
	
	// > 刷新
	_drill_EAT_setup2.call(this,mapId);
	
	// > 容器初始化
	this._drill_EAT_triggeredEvents = [];
}

//==============================
// * 已触发容器 - 添加 已触发的事件
//==============================
Game_Map.prototype.drill_EAT_triggeredEventsAdd = function( temp_event ){
	this._drill_EAT_triggeredEvents.push(temp_event);
}
//==============================
// * 已触发容器 - 去除 已触发的事件
//==============================
Game_Map.prototype.drill_EAT_triggeredEventsRemove = function( temp_event ){
	for( var k=this._drill_EAT_triggeredEvents.length-1; k>=0; k-- ){
		if( this._drill_EAT_triggeredEvents[k] == temp_event){
			this._drill_EAT_triggeredEvents.splice(k,1);
			break;
		}
	}
}
//==============================
// * 已触发容器 - 去除 已触发的事件 的所有条件对应的独立开关
//==============================
Game_Map.prototype.drill_EAT_triggeredEventsClearAllSwitches = function() {
	for( var i = 0;  i < this._drill_EAT_triggeredEvents.length; i++ ){
		var temp_event = this._drill_EAT_triggeredEvents[i];
		var temp_tags = temp_event.drill_EAT_getAllTag();
		for( var j = 0; j < temp_tags.length; j++ ){
			var tag = temp_tags[j];
			if( temp_event.drill_EAT_hasTag( tag ) == true ){
				
				var sw = temp_event.drill_EAT_getTagSwitch( tag );
				var key = [this._mapId, temp_event._eventId, sw ];
				if( $gameSelfSwitches.value(key) !== false){
					$gameSelfSwitches.setValue(key,false);
				}
				//// > 自动off标记
				//if( temp_event.drill_EAT_isTagAutoOff( tag ) == true ){
				//}
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
Scene_Map.prototype.drill_EAT_layerAddSprite = function( sprite, layer_index ){
	this.drill_EAT_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_EAT_layerRemoveSprite = function( sprite ){
	this.drill_EAT_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_EAT_sortByZIndex = function () {
    this.drill_EAT_sortByZIndex_Private();
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
Scene_Map.prototype.drill_EAT_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_EAT_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 中层
//==============================
var _drill_EAT_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_EAT_layer_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_EAT_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_EAT_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_EAT_sortByZIndex_Private = function () {
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_EAT_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_EAT_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 层级与镜头的位移（私有）
//			
//			说明：	当前的xx，yy的参照系是 地图参照 。
//==============================
Scene_Map.prototype.drill_EAT_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
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
var _drill_EAT_DEBUG_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_EAT_DEBUG_update.call(this);
	
	if( DrillUp.g_EAT_debugEnabled != true ){ return; }
	
	this.drill_EAT_DEBUG_updateRebuild();	//帧刷新 - 重建
	this.drill_EAT_DEBUG_updateSprite();	//帧刷新 - 贴图
};
//==============================
// * 区域块可视化 - 帧刷新重建
//==============================
Scene_Map.prototype.drill_EAT_DEBUG_updateRebuild = function() {
	if( $gameTemp._drill_EAT_DEBUG_spriteNeedRefresh != true ){ return; }
	$gameTemp._drill_EAT_DEBUG_spriteNeedRefresh = false;
	
	// > 初始化
	if( this._drill_EAT_spriteTank == undefined ){
		this._drill_EAT_spriteTank = [];
	}
	
	// > 清除旧贴图
	for(var i=0; i < this._drill_EAT_spriteTank.length; i++ ){
		var temp_sprite = this._drill_EAT_spriteTank[i];
		this.drill_EAT_layerRemoveSprite( temp_sprite );
	}
	
	// > 创建贴图
	this._drill_EAT_spriteTank = [];
	for(var i=0; i < DrillUp.g_EAT_area.length; i++){
		var temp_area = DrillUp.g_EAT_area[i];
		if( temp_area == undefined ){
			this._drill_EAT_spriteTank.push( null );
			continue;
		}
		if( temp_area['debug_enabled'] == false ){
			this._drill_EAT_spriteTank.push( null );
			continue;
		}
		
		// > 贴图属性
		var data = {};
		data['color'] = temp_area['debug_color'];
		data['width'] = $gamePlayer._drill_EAT_checkerboard['matrix'].length;
		data['height'] = $gamePlayer._drill_EAT_checkerboard['matrix'][0].length;
		data['point_list'] = [];
		var temp_sprite = new Drill_COFA_DebugSprite( data );
		temp_sprite['layer_index'] = "中层";
		temp_sprite.zIndex = i;
		
		// > 地图层级
		this._drill_EAT_spriteTank.push( temp_sprite );
		this.drill_EAT_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
		
	}
	
	// > 贴图排序
	this.drill_EAT_sortByZIndex();
};
//==============================
// * 区域块可视化 - 帧刷新贴图
//==============================
Scene_Map.prototype.drill_EAT_DEBUG_updateSprite = function() {
	if( this._drill_EAT_spriteTank == undefined ){ return; }
	for(var i=0; i < this._drill_EAT_spriteTank.length; i++){
		var temp_sprite = this._drill_EAT_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		
		// > 位移（地图参照）
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		
		var xx = 0;
		var yy = 0;
		if( DrillUp.g_EAT_fix ){
			xx = Math.floor( $gamePlayer._realX +0.55 );
			yy = Math.floor( $gamePlayer._realY +0.55 );
		}else{
			xx = $gamePlayer._x;
			yy = $gamePlayer._y;
		}
		xx = Math.round( $gameMap.adjustX( xx ) * tw + tw / 2);
		yy = Math.round( $gameMap.adjustY( yy ) * th + th / 2);
		
		
		// > 层级与镜头的位移
		var pos = this.drill_EAT_layerCameraMoving( xx, yy, temp_sprite['layer_index'], {} );
		temp_sprite.x = pos['x'];
		temp_sprite.y = pos['y'];
		
		
		// > 图块点变化
		var area_data = DrillUp.g_EAT_area[ i ];
		if( area_data == undefined ){ continue; }
		$gamePlayer.drill_EAT_DEBUG_refreshPointList( area_data, temp_sprite );
		
	}
}
//==============================
// * 区域块可视化 - 区域绘制
//==============================
Game_Player.prototype.drill_EAT_DEBUG_refreshPointList = function( area_data, temp_sprite ){
	
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
		cal_area = this.drill_EAT_DEBUG_adjustPoints( cal_area );
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
			cal_area = this.drill_EAT_DEBUG_adjustPoints( cal_area );
			temp_sprite.drill_changePointList( cal_area );
		}else{										//与事件朝向一致（四个方向）
			var cal_area = $gameMap.drill_COFA_getCustomPointsWithCondition( 	//（使用绝对坐标，获取到符合条件的点）
				this.x, 
				this.y, 
				this._direction, def_area['points'], condition
			);
			cal_area = this.drill_EAT_DEBUG_adjustPoints( cal_area );
			temp_sprite.drill_changePointList( cal_area );
		}
	}
}
//==============================
// * 区域块可视化 - 点位置修正
//==============================
Game_Player.prototype.drill_EAT_DEBUG_adjustPoints = function( point_list ){
	var result_list = [];
	for(var i=0; i < point_list.length; i++ ){
		var xx = point_list[i].x;
		var yy = point_list[i].y;
		
		// > 去掉事件的绝对位置
		xx -= this.x;
		yy -= this.y;
		
		// > 加上棋盘的偏移位置
		xx += this._drill_EAT_checkerboard['c_x'];
		yy += this._drill_EAT_checkerboard['c_y'];
		
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
		Imported.Drill_EventAutoTrigger = false;
		alert(
			"【Drill_EventAutoTrigger.js 物体触发 - 固定区域 & 玩家接近 & 条件触发】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"
		);
}



