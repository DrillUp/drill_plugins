//=============================================================================
// Drill_BombCore.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        炸弹人 - 游戏核心
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BombCore +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 炸弹人游戏的核心插件。
 * 定义了 玩家操作、阵营、炸弹、AI决策树 的基本设置。
 * ★★必须放在"基于"的所有的插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须拥有下列插件作为基础，才能运行。
 * 基于：
 *   - Drill_EventDuplicator      物体管理-事件复制器
 *   - Drill_EventThrough         体积-事件穿透关系
 *   - Drill_CoreOfFixedArea      物体触发-固定区域核心
 *   - Drill_EventLaserTrigger    物体触发-可变激光区域&条件触发 ★★v1.2以上★★
 *   - Drill_EventLaserAnimation  物体触发-可变激光区域&播放并行动画 ★★v1.2以上★★
 *   - Drill_CoreOfMoveRoute      移动路线-移动路线核心★★v1.7以上★★
 * 可被扩展：
 *   - Drill_OperateKeys          键盘-键盘手柄按键修改器★★v1.1以上★★
 *     通过该插件你可以设置键盘、手柄按键，放置炸弹。
 *   - Drill_OperateHud           鼠标-鼠标辅助操作面板★★v1.3以上★★
 *     通过该插件你可以设置鼠标、触屏，放置炸弹。
 *   - Drill_LayerIllumination    地图-自定义照明效果
 *     如果有该插件，炸弹能够在黑暗中产生光亮，没有该插件也无妨。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   对事件、玩家有效。
 * 2.更多详细介绍，去看看 "29.炸弹人 > 关于炸弹人游戏.docx"。
 * 3.插件需要将指定 地形标志 或 图块R区域 设为禁止炸弹区，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 功能点：
 *   (1.该核心能实现基本的炸弹人游戏功能。
 *      后面会有一些其它方向扩展的插件，都基于该核心。
 *   (2.考虑到模块独立化原则，以下内容，核心【不包含】且不考虑：
 *      - 生命值   - 自定义炸弹   - 精确移动速度
 *      - 道具     - 推炸弹能力
 *      这些后续会在其他炸弹人类型插件中实现。
 * 能力：
 *   (1.能力包含：火力、炸弹数。
 *      能力决定了这个事件放置炸弹的火力，以及一次性放最多的数量。
 *   (2.所有事件都可以设置这两种能力，包括炸弹自己。
 * 阵营：
 *   (1. v1.3之前版本只分玩家和敌人，这里改进了结构，分不同的阵营。
 *   (2."仇恨单位"、"忽视单位"、"可炸物"可以分别定义敌人、任务NPC、以及
 *      木箱。除此以外的关键字，你可以用来给队伍进行分边。
 *   (3.你需要 手动添加 ："=>事件穿透关系 : 穿透标签 : 炸弹人-角色"。
 *      确保只有玩家与敌人相互才可以穿透。无关事件、炸弹、其他物体都会堵路。
 *   (4.如果你想做爆炸能穿透，但是玩家无法通过的区域。
 *      根据 体积-事件穿透关系 插件，你可以在指定位置放事件作为透明墙。
 *     （爆炸波不能穿透地形，只能穿透事件）
 * 炸弹：
 *   (1.核心中的炸弹，都为"标准炸弹"，与"自定义炸弹"区分。
 *   (2.标准炸弹不分敌我，统一触发范围内事件的独立开关。
 *      主动触发的关键字固定为："炸弹人-爆炸"。
 *     （含有该标签的事件且在范围内，都会被炸到）
 *   (3.同一个位置不能放两个炸弹。
 *   (4.已爆炸的炸弹会立即引爆范围内的炸弹。
 *   (5.低火力的炸弹拥有堵住爆炸波的能力。
 *   (6.爆炸并不是持续的，但爆炸会在爆炸前、爆炸后触发一共两次。
 *      第一次在爆炸动画开始播放的第1帧。第二次触发在14帧后。
 *   (7.如果你担心太多爆炸动画严重影响性能，你可以制作极其简单的爆炸动画，
 *      或者直接设置爆炸动画为空。
 *   (8.跳跃过程中可以放置炸弹，并且放的是玩家当前位置的正下方。
 * AI决策：
 *   (1.通过移动路线的设置，决定了事件该如何放置炸弹、躲避炸弹的思维。
 *      "29.炸弹人 > 关于炸弹人游戏.docx"中有AI决策的详细解读。
 *   (2.AI能够识别自定义炸弹，可以去看看插件：炸弹人-自定义炸弹。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 能力
 * 你可以定义事件使用炸弹的能力：
 * 
 * 事件注释：=>炸弹人核心 : 火力 : 1
 * 事件注释：=>炸弹人核心 : 炸弹数 : 1
 * 
 * 1.能力属性注释跨事件页。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 阵营
 * 如果你定义了一个炸弹人相关事件，那么该事件可以具备以下属性：
 * 
 * 事件注释：=>炸弹人核心 : 阵营 : 仇恨单位
 * 事件注释：=>炸弹人核心 : 阵营 : 忽视单位
 * 事件注释：=>炸弹人核心 : 阵营 : 可炸物
 * 事件注释：=>炸弹人核心 : 阵营 : A队
 * 事件注释：=>炸弹人核心 : 阵营 : B队
 * 事件注释：=>炸弹人核心 : 阵营 : A队,B队,C队
 * 
 * 1.阵营属性表示 会被谁攻击 的属性。
 *   "仇恨单位"阵营，会被所有人敌对，"仇恨单位"也会主动攻击"仇恨单位"。
 *   "忽视单位"阵营，会被所有人忽视，即使"忽视单位"会主动攻击其他人。
 *   "可炸物"阵营，也会被所有人敌对，但是优先级最低，只有没敌人时，才会
 *   被攻击。
 * 2."A队"是除了上面固定之外的可自定义的字符串，相同阵营的单位不会相互攻击。
 *   一个事件可以同时拥有多个阵营属性，如果事件同时拥有"A队"和"B队"的属性，
 *   那么"A队"和"B队"都不会攻击他。
 * 3.阵营属性注释不跨事件页，如果切换事件页则会被默认置为"忽视单位"。
 *   另外，阵营注释多写不叠加，多个阵营必须用逗号隔开写区分。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - AI决策
 * 通过设置敌人的移动路线指令，来控制基本的AI：
 * 
 * 移动路线指令：>躲避炸弹Lv0
 * 移动路线指令：>躲避炸弹Lv1
 * 移动路线指令：>寻找目标Lv0
 * 移动路线指令：>寻找目标Lv1
 * 移动路线指令：>强迫放置炸弹
 * 
 * 1.寻找目标动作，会去寻找可以炸的物体，物体来判断是否放置炸弹。
 *   含敌人属性"对手"也是目标物体。
 * 2.如果事件不能放炸弹，或者炸弹数量不够，即使 强迫放置炸弹，也没有效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 控制台操作
 * 你可以使用下面插件指令控制：
 * 
 * 插件指令：>炸弹人控制台 : 关闭放置炸弹
 * 插件指令：>炸弹人控制台 : 开启放置炸弹
 * 插件指令：>炸弹人控制台 : 创建炸弹 : 10 : 10 : 1 : 150
 * 
 * 插件指令：>炸弹人控制台 : 玩家 : 阵营 : 仇恨单位
 * 插件指令：>炸弹人控制台 : 本事件 : 阵营 : 仇恨单位
 * 插件指令：>炸弹人控制台 : 事件[1] : 阵营 : 仇恨单位
 * 插件指令：>炸弹人控制台 : 事件变量[1] : 阵营 : 仇恨单位
 * 
 * 插件指令：>炸弹人控制台 : 事件[1] : 阵营 : 仇恨单位
 * 插件指令：>炸弹人控制台 : 事件[1] : 阵营 : 忽视单位
 * 插件指令：>炸弹人控制台 : 事件[1] : 阵营 : 可炸物
 * 插件指令：>炸弹人控制台 : 事件[1] : 阵营 : A队,B队
 * 插件指令：>炸弹人控制台 : 事件[1] : 火力 : 增加 : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 火力 : 减少 : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 火力 : 设置 : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 火力 : 增加(变量) : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 火力 : 减少(变量) : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 火力 : 设置(变量) : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 炸弹数 : 增加 : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 炸弹数 : 减少 : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 炸弹数 : 设置 : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 炸弹数 : 增加(变量) : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 炸弹数 : 减少(变量) : 1
 * 插件指令：>炸弹人控制台 : 事件[1] : 炸弹数 : 设置(变量) : 1
 *
 * 1.创建炸弹的四个参数分别为：x位置，y位置，火力，引爆时间
 * 2.无论是减少还是设置，火力值最低为1，炸弹数最低为1。
 * 3.前半部分：玩家、本事件、事件、事件变量是可以相互替换的。
 *   玩家也可以设置"可炸物阵营"，这样被攻击的优先级会降到最低。
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
 * 时间复杂度： o(n) 每帧
 * 测试方法：   去各管理层放置10个火力9的炸弹，测试。（爆炸前）
 * 测试结果：   200个事件的地图中，平均消耗为：【25.26ms】
 *              100个事件的地图中，平均消耗为：【20.27ms】
 *               50个事件的地图中，平均消耗为：【12.44ms】
 * 测试方法2：  去各管理层放置10个火力9的炸弹，测试。（爆炸时）
 * 测试结果2：  200个事件的地图中，平均消耗为：【288.98ms】
 *              100个事件的地图中，平均消耗为：【268.44ms】
 *               50个事件的地图中，平均消耗为：【252.01ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.放置炸弹、AI躲避并不会消耗多少性能。
 *   但是在炸弹爆炸的一瞬间，因为播放了大量爆炸动画，所以造成一个
 *   时间段内大量掉帧的情况。
 *   （不过满屏幕的爆炸还是挺壮观的，手机可能会当场去世。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修正了爆炸持续的判定，优化了ai有时候自己站住不动的bug。
 * [v1.2]
 * 添加了禁止炸弹区域设置。
 * [v1.3]
 * 优化了底层结构，添加了阵营功能，插件性能说明。
 * 并且在炸弹游戏中途保存并读取时，不会出现炸弹指针错误。
 * 注意，该版本修改了大部分指令的格式，旧版本指令不再支持。
 * [v1.4]
 * 给炸弹添加了自定义照明效果。
 * [v1.5]
 * 添加了与鼠标操作面板的交互内容。
 * [v1.6]
 * 修复了lv1激活出错的bug，改进了移动路线结构。
 * [v1.7]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param ----能力----
 * @default 
 *
 * @param 玩家初始炸弹火力
 * @parent ----能力----
 * @type number
 * @min 1
 * @desc 初始的炸弹火力，单位图块。
 * @default 1
 *
 * @param 玩家初始炸弹数量
 * @parent ----能力----
 * @type number
 * @min 1
 * @desc 初始玩家的炸弹数量。
 * @default 1
 *
 * @param 事件默认炸弹火力
 * @parent ----能力----
 * @type number
 * @min 1
 * @desc 事件默认初始的炸弹火力，单位图块。
 * @default 1
 *
 * @param 事件默认炸弹数量
 * @parent ----能力----
 * @type number
 * @min 1
 * @desc 事件默认初始的炸弹数量。
 * @default 1
 * 
 * @param ----标准炸弹----
 * @default 
 *
 * @param 资源-炸弹图像
 * @parent ----标准炸弹----
 * @desc 默认炸弹图像的资源。
 * @default $炸弹
 * @require 1
 * @dir img/characters/
 * @type file
 * 
 * @param 资源-放置声音
 * @parent ----标准炸弹----
 * @desc 默认放置炸弹的声音资源。
 * @default Equip1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param 资源-爆炸声音
 * @parent ----标准炸弹----
 * @desc 默认炸弹爆炸的声音资源。
 * @default Boom
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param 爆炸动画
 * @parent ----标准炸弹----
 * @type animation
 * @desc 炸弹的爆炸动画。
 * @default 80
 *
 * @param 计时炸弹时间
 * @parent ----标准炸弹----
 * @type number
 * @min 1
 * @desc 从炸弹放置到爆炸所需的时间，单位帧。（1秒60帧）
 * @default 150
 *
 * @param 爆炸持续时间
 * @parent ----标准炸弹----
 * @type number
 * @min 1
 * @max 30
 * @desc 炸弹爆炸到爆炸结束的时间，单位帧。爆炸一共触发两次，第一次在动画开始的第1帧，第二次在持续时间的末尾帧。
 * @default 14
 *
 * @param 禁止炸弹区
 * @parent ----标准炸弹----
 * @desc 指定标记的R区域将被禁止放置炸弹，可以设置多个。（1-255）
 * @type number[]
 * @min 1
 * @max 255
 * @default ["11"]
 *
 * @param 是否启用炸弹照明
 * @parent ----标准炸弹----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 你可以控制标准炸弹的照明设置。注意，只对标准炸弹。
 * @default true
 *
 * @param 火花光源id
 * @parent 是否启用炸弹照明
 * @type number
 * @min 0
 * @desc 标准炸弹放置时，火花闪烁对应的光源。对应插件 地图-自定义照明效果 中的配置。0表示关闭。
 * @default 19
 *
 * @param 爆炸动态光源id
 * @parent 是否启用炸弹照明
 * @type number
 * @min 0
 * @desc 标准炸弹爆炸时，一瞬间明亮的光源。对应插件 地图-自定义照明效果 中的配置。0表示关闭。
 * @default 20
 *
 * @param 爆炸动态光源持续时间
 * @parent 是否启用炸弹照明
 * @type number
 * @min 0
 * @desc 标准炸弹爆炸时，明亮光源的持续时间。
 * @default 60
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BoC （Bomb_Core）
//		临时全局变量	DrillUp.g_BoC_xxx
//		临时局部变量	this._drill_BoC_xxxx
//		存储数据变量	$gameSystem._drill_BoC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^4) + o(n^2)*o(图形处理)
//		★性能测试因素	炸弹人管理层150个事件
//		★性能测试消耗	12.44ms ~ 20.27ms
//		★最坏情况		放很多炸弹，炸弹的动画会极大影响性能。
//		★备注			单纯放置炸弹并没有加大负荷，只是在爆炸时负荷超大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			指令与数据
//				->能力 - 炸弹火力
//				->能力 - 炸弹数量
//				->阵营 - 仇恨单位
//				->阵营 - 忽视单位
//				->阵营 - 可炸物
//				->炸弹 - 可炸物
//				->事件注释、插件指令
//			玩家
//				->按键放置炸弹
//			事件
//				->炸弹剩余数量
//			阵营
//				->事件容器（炸弹/仇恨单位/忽视单位/可炸物/自定义阵营）
//				->获取敌人
//				->穿透标签（用户手动添加）
//			炸弹
//				->炸弹数据+事件
//				->爆炸范围被阻挡
//				->自定义注释AI识别
//			爆炸区域判定
//				->判定 - 每3帧刷新一次
//				->判定 - 爆炸时间以最短的为准
//				->判定 - 炸弹会立即引爆其他炸弹
//			AI决策树
//				->躲避炸弹Lv0
//				->躲避炸弹Lv1
//				->寻找目标Lv0
//				->寻找目标Lv1
//				->强迫放置炸弹
//			其它
//				->位移判定问题（基于的插件中修改）
//
//		★私有类如下：
//			暂无（依附于各个类，作为扩展函数使用）
//
//		★必要注意事项：
//			1.互动之间如果有较复杂的接口，必须遵循下面的格式：
//				drill_canXxxx_Normal()			静态约束条件（无提示音）
//				drill_canXxxx_Conditional()		外力限制条件（有提示音）
//				drill_doXxxx()					执行操作
//				drill_isXxxxControl()			键盘按键条件
//			  面板通过上述四个接口 主动调用 能力插件中的函数。
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//				容器（$gameTemp._xxx）中存放了两种事件集合：炸弹集合、阵营集合
//			3.关于爆炸区域判定优化算法：
//				想法1：建立一个与地图等效的大数组列。数值为时间，帧刷新减一，降到0为止。
//				想法2：每次帧刷新都建立一个实时的炸弹数组，根据炸弹属性减一，并且判断炸弹影响到的其他炸弹。
//			  实际消耗为：192ms和28ms。想法2更好，而且还能够方便编写根据炸弹影响到的其它炸弹的方法。
//			  【目前爆炸区域判定的算法是最优解，不要尝试推翻】
//	
//		★其它说明细节：
//			1.可以通过设置移动路线，控制玩家放炸弹。
//			2.炸弹锁定了同步镜像。（你别画有方向的炸弹就好。）
//			3.事件的数据结构：
//				._drill_BoC.attr		//能力属性
//				._drill_BoC.group		//阵营属性
//				._drill_BoC.bomb		//炸弹属性
//			  需要注意，阵营可以有多个，是数组[]，剩余炸弹也是数组，存放炸弹的id。
//			4.【错误的正则：split(/,，/) 正确的正则：split(/[,，]/)】
//				激光区域的['dirs']的方向找了半天的问题，才发现是自己把自己坑了。
//
//		★不考虑的方面：
//			1.敌人的生命值在这里完全不考虑（高级ai再考虑）
//			2.自定义炸弹的样子，形状，火力，这里完全不考虑（只设计标准炸弹即可）
//			3.道具完全不考虑
//			4.推炸弹完全不考虑
//			5.移动速度目前不计影响，但是后面高级AI需要把这个考虑进去。
//			6.AI识别禁止炸弹区，并且利用区域躲避。这个也需要高级AI。
//		
//		★存在的问题：
//			1.小爱丽丝寻找目标时，靠近敌人时不识别堵路情况。
//			  这样会出现两个对手在隔一个堵路时而相互观望的情况。（已解决）
//			2.切换了地图后，炸弹放置就爆炸问题（事件复制器的坑，复制前需要清除独立开关。）
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BombCore = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BombCore');
	
	DrillUp.g_BoC_playerFire = Number(DrillUp.parameters["玩家初始炸弹火力"] || 1);
	DrillUp.g_BoC_playerBombNum = Number(DrillUp.parameters["玩家初始炸弹数量"] || 1);
	DrillUp.g_BoC_eventFire = Number(DrillUp.parameters["事件默认炸弹火力"] || 1);
	DrillUp.g_BoC_eventBombNum = Number(DrillUp.parameters["事件默认炸弹数量"] || 1);

	DrillUp.g_BoC_bombImg = String(DrillUp.parameters["资源-炸弹图像"] || "" );
	DrillUp.g_BoC_bombPutSound = String(DrillUp.parameters["资源-放置声音"] || "" );
	DrillUp.g_BoC_bombBoomSound = String(DrillUp.parameters["资源-爆炸声音"] || "" );
	DrillUp.g_BoC_bombAnim = Number(DrillUp.parameters["爆炸动画"] || 80);
	DrillUp.g_BoC_bombTime = Number(DrillUp.parameters["计时炸弹时间"] || 150);
	DrillUp.g_BoC_bombInterval = Number(DrillUp.parameters["爆炸持续时间"] || 18);
	if(  DrillUp.parameters["禁止炸弹区"] != undefined && DrillUp.parameters["禁止炸弹区"] != "" ){
		DrillUp.g_BoC_bombForbiddenArea = (JSON.parse( DrillUp.parameters["禁止炸弹区"])).map(function(n){ return Number(n) });
	}else{
		DrillUp.g_BoC_bombForbiddenArea = [];
	}
	DrillUp.g_BoC_bombLight = String(DrillUp.parameters["是否启用炸弹照明"] || "true") == "true";
	DrillUp.g_BoC_bombLightFrame = Number(DrillUp.parameters["火花光源id"] || 19);
	DrillUp.g_BoC_bombLightBlast = Number(DrillUp.parameters["爆炸动态光源id"] || 20);
	DrillUp.g_BoC_bombLightBlastSustain = Number(DrillUp.parameters["爆炸动态光源持续时间"] || 60);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventDuplicator &&
	Imported.Drill_EventThrough &&
	Imported.Drill_CoreOfFixedArea &&
	Imported.Drill_EventLaserTrigger &&
	Imported.Drill_EventLaserAnimation &&
	Imported.Drill_CoreOfMoveRoute
){

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_BoC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BoC_pluginCommand.call(this, command, args);
	if( command === ">炸弹人控制台" ){
		
		if( args.length == 10 ){
			var type = String(args[1]);
			var temp1 = Number(args[3]);
			var temp2 = Number(args[5]);
			var temp3 = Number(args[7]);
			var temp4 = Number(args[9]);
			
			if( type == "创建炸弹" ){
				var input_data = {
					'x':temp1,
					'y':temp2,
					'fire':temp3,
					'time':temp4,
					'bomber':"控制台(事件)",
					'bomber_obj':null
				}
				$gameMap.drill_BoC_putBomb(input_data);
			}
		}
		if( args.length == 6 ){			//>炸弹人控制台 : 玩家 : 阵营 : 仇恨单位
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			
			var character = null;
			if( temp1 == "玩家" ){
				character = $gamePlayer;
			}
			if( temp1 == "本事件" ){
				var e_id = this._eventId;
				character = $gameMap.event(e_id);
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				var e_id = Number(temp1);
				if( $gameMap.drill_BoC_isEventExist( e_id ) == false ){ return; }
				character = $gameMap.event(e_id);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				var e_id = $gameVariables.value(Number(temp1));
				if( $gameMap.drill_BoC_isEventExist( e_id ) == false ){ return; }
				character = $gameMap.event(e_id);
			}
			
			if( type == "阵营" ){
				character._drill_BoC.group['character'] = temp2.split(/[,，]/);
				$gameTemp._drill_BoC_needRestatistics_Group = true;
			}
		}
		if( args.length == 8 ){			//>炸弹人控制台 : 事件[1] : 火力 : 增加 : 1
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = Number(args[7]);
			
			var character = null;
			if( temp1 == "玩家" ){
				character = $gamePlayer;
			}
			if( temp1 == "本事件" ){
				var e_id = this._eventId;
				character = $gameMap.event(e_id);
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				var e_id = Number(temp1);
				if( $gameMap.drill_BoC_isEventExist( e_id ) == false ){ return; }
				character = $gameMap.event(e_id);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				var e_id = $gameVariables.value(Number(temp1));
				if( $gameMap.drill_BoC_isEventExist( e_id ) == false ){ return; }
				character = $gameMap.event(e_id);
			}
			
			if( type == "火力" ){
				if( temp2 == "增加" ){
					var value = character._drill_BoC.attr['fire'] + temp3;
					value = Math.max(value,1);
					character._drill_BoC.attr['fire'] = value;
				}
				if( temp2 == "减少" ){
					var value = character._drill_BoC.attr['fire'] - temp3;
					value = Math.max(value,1);
					character._drill_BoC.attr['fire'] = value;
				}
				if( temp2 == "设置" ){
					var value = temp3;
					value = Math.max(value,1);
					character._drill_BoC.attr['fire'] = value;
				}
				if( temp2 == "增加(变量)" ){
					var value = character._drill_BoC.attr['fire'] + $gameVariables.value( temp3 );
					value = Math.max(value,1);
					character._drill_BoC.attr['fire'] = value;
				}
				if( temp2 == "减少(变量)" ){
					var value = character._drill_BoC.attr['fire'] - $gameVariables.value( temp3 );
					value = Math.max(value,1);
					character._drill_BoC.attr['fire'] = value;
				}
				if( temp2 == "设置(变量)" ){
					var value = $gameVariables.value( temp3 );
					value = Math.max(value,1);
					character._drill_BoC.attr['fire'] = value;
				}
			}
			
			if( type == "炸弹数" ){
				if( temp2 == "增加" ){
					var value = character._drill_BoC.attr['bombNum'] + temp3;
					value = Math.max(value,1);
					character._drill_BoC.attr['bombNum'] = value;
				}
				if( temp2 == "减少" ){
					var value = character._drill_BoC.attr['bombNum'] - temp3;
					value = Math.max(value,1);
					character._drill_BoC.attr['bombNum'] = value;
				}
				if( temp2 == "设置" ){
					var value = temp3;
					value = Math.max(value,1);
					character._drill_BoC.attr['bombNum'] = value;
				}
				if( temp2 == "增加(变量)" ){
					var value = character._drill_BoC.attr['bombNum'] + $gameVariables.value( temp3 );
					value = Math.max(value,1);
					character._drill_BoC.attr['bombNum'] = value;
				}
				if( temp2 == "减少(变量)" ){
					var value = character._drill_BoC.attr['bombNum'] - $gameVariables.value( temp3 );
					value = Math.max(value,1);
					character._drill_BoC.attr['bombNum'] = value;
				}
				if( temp2 == "设置(变量)" ){
					var value = $gameVariables.value( temp3 );
					value = Math.max(value,1);
					character._drill_BoC.attr['bombNum'] = value;
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "关闭放置炸弹" ){
				$gameSystem._drill_BoC_canPutBomb = false;
			}
			if( type == "开启放置炸弹" ){
				$gameSystem._drill_BoC_canPutBomb = true;
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_BoC_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_BombCore.js 炸弹人 - 游戏核心】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BoC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BoC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BoC_sys_initialize.call(this);
	this.drill_BoC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BoC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BoC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BoC_saveEnabled == true ){	
		$gameSystem.drill_BoC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BoC_initSysData();
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
Game_System.prototype.drill_BoC_initSysData = function() {
	this.drill_BoC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BoC_checkSysData = function() {
	this.drill_BoC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BoC_initSysData_Private = function() {
	this._drill_BoC_canPutBomb = true;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BoC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BoC_canPutBomb == undefined ){
		this.drill_BoC_initSysData();
	}
	
};


//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 事件 - 切换事件页 
//==============================
var _drill_BoC_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_BoC_setupPage.call(this);
	
    this.drill_BoC_setupAttr();
    this.drill_BoC_setupGroup();
    this.drill_BoC_setupBomb();
};
//==============================
// * 事件 - 能力属性初始化 
//==============================
Game_Event.prototype.drill_BoC_setupAttr = function() {
	this._drill_BoC.attr['bombTank'] = [];	//清空炸弹集合
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>炸弹人核心"){		//=>炸弹人核心 : 火力 : 1
				if(args.length == 4){
					var type = String(args[1]);
					var temp1 = Number(args[3]);
					if( type == "火力" ){
						this._drill_BoC.attr['fire'] = Number(temp1);
					}
					if( type == "炸弹数" ){
						this._drill_BoC.attr['bombNum'] = Number(temp1);
					}
				}
			};
		};
	}, this);};
};
//==============================
// * 事件 - 阵营属性初始化 
//==============================
Game_Event.prototype.drill_BoC_setupGroup = function() {
	this._drill_BoC.group['character'] = ["忽视单位"];
	
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>炸弹人核心"){	//=>炸弹人核心 : 阵营 : 仇恨单位
				if(args.length == 4){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "阵营" ){
						this._drill_BoC.group['character'] = temp1.split(/[,，]/);
					}
				}
			};
		};
	}, this);};
	$gameTemp._drill_BoC_needRestatistics_Group = true;
};
//==============================
// * 事件 - 炸弹属性初始化 
//==============================
Game_Event.prototype.drill_BoC_setupBomb = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>炸弹人核心"){		//=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 东,南,西,北 : 2 : 炸弹人-爆炸

				if(args.length == 4){
					var bomb_ai = String(args[1]);
					var temp1 = Number(args[3]);
					if( bomb_ai == "AI识别爆炸时长" ){
						this._drill_BoC.bomb['timeTotal'] = temp1 ;
						this._drill_BoC.bomb['time'] = temp1 ;
					}
				}
				/*-----------------可变激光区域------------------*/
				if(args.length == 10){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = Number(args[7]);
					var temp3 = String(args[9]);
					if( type == "可变激光区域" ){
						this._drill_BoC.bomb['triggerType'] = "可变激光区域";
						this._drill_BoC.bomb['dirs'] = temp1.split(/[,，]/);
						this._drill_BoC.bomb['fire'] = temp2 ;
						this._drill_BoC.bomb['condition'] = temp3;		//条件（暂时没用上，AI对于炸弹，全认）
					}
				}
				if(args.length == 8){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					if( type == "可变激光区域" && temp1 == "穿透类型" ){
						this._drill_BoC.bomb['through'].push( temp2 );
						this._drill_BoC.bomb['options'] = { "through": this._drill_BoC.bomb['through'] };
					}
				}
				/*-----------------固定区域------------------*/
				if(args.length == 10){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = Number(args[7]);
					var temp3 = String(args[9]);
					if( type == "固定区域" ){
						if( temp1 == "菱形区域" || temp1 == "方形区域"  || temp1 == "圆形区域"  || 
							temp1 == "十字区域" || temp1 == "横条区域"  || temp1 == "竖条区域" ){
							this._drill_BoC.bomb['triggerType'] = "固定区域";
							this._drill_BoC.bomb['areaType'] = temp1;
							this._drill_BoC.bomb['range'] = temp2;
							this._drill_BoC.bomb['condition'] = temp3;		//条件（暂时没用上，AI对于炸弹，全认）
						}
						if( temp1 == "自定义区域" ){
							this._drill_BoC.bomb['triggerType'] = "固定区域";
							this._drill_BoC.bomb['areaType'] = temp1;
							this._drill_BoC.bomb['self_id'] = temp2 - 1;
							this._drill_BoC.bomb['condition'] = temp3;		//条件（暂时没用上，AI对于炸弹，全认）
						}
					}
				}
				if(args.length == 8){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = Number(args[7]);
					if( type == "固定区域" ){
						if( temp1 == "含筛选器" ){
							this._drill_BoC.bomb['areaCondition'] = DrillUp.g_COFA_condition_list[ temp2-1 ];
						}
					}
				}
				
				/*-----------------炸弹自身属性------------------*/
				if(args.length >= 2){
					var bomb_ai = String(args[1]);
					if( bomb_ai == "AI识别爆炸区域" || bomb_ai == "AI识别爆炸时长" ){
						this._drill_BoC.bomb['isBomb'] = true;
						$gameTemp._drill_BoC_needRestatistics_Bombs = true;		//炸弹集刷新
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 物体（敌人事件、玩家 的父类）
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_BoC_c_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	_drill_BoC_c_initialize.call(this);
	this._drill_BoC = {};
	this._drill_BoC.attr = {};		//能力属性
	this._drill_BoC.group = {};		//阵营属性
	this._drill_BoC.bomb = {};		//炸弹属性
	this._drill_BoC.attr['fire'] = DrillUp.g_BoC_eventFire;			//初始火力
	this._drill_BoC.attr['bombNum'] = DrillUp.g_BoC_eventBombNum;	//初始炸弹数
	this._drill_BoC.attr['bombTank'] = [];							//炸弹记录器
	this._drill_BoC.group['character'] = ["忽视单位"];				//阵营
	this._drill_BoC.bomb['isBomb'] = false;							//是否为炸弹
	this._drill_BoC.bomb['timeTotal'] = DrillUp.g_BoC_bombTime;		//爆炸总时间
	this._drill_BoC.bomb['time'] = DrillUp.g_BoC_bombTime;			//爆炸时长
	this._drill_BoC.bomb['fire'] = 1;								//火力
	this._drill_BoC.bomb['triggerType'] = "可变激光区域";			//
	this._drill_BoC.bomb['dirs'] = ['东','南','西','北'];			//
	this._drill_BoC.bomb['through'] = [];							//爆炸穿透类型
	this._drill_BoC.bomb['options'] = {};							//其它设置
}
//==============================
// * 物体 - 炸弹剩余数量
//==============================
Game_CharacterBase.prototype.drill_BoC_hasBomb = function() {
	if( !this._drill_BoC.attr['bombTank'] ){ return false }
	var count = this._drill_BoC.attr['bombTank'].filter( function(value,index,array){ return $gameMap.event(value) != undefined && $gameMap.event(value)._erased == false; } ).length;
	return count < this._drill_BoC.attr['bombNum'];
}
//==============================
// * 物体 - 放置炸弹（返回炸弹id）
//==============================
Game_CharacterBase.prototype.drill_BoC_characterPutBomb = function() {
	if( this.drill_BoC_hasBomb() ){
		var input_data = {
			'x':this._x,
			'y':this._y,
			'fire':this._drill_BoC.attr['fire'],
			'time':null,
			'bomber':"事件",
			'bomber_obj':this
		}
		if( this.constructor.name == "Game_Player" ){		//玩家需要流畅性，事件需要时机准确性
			input_data = {
				'x':Math.floor(this._realX + 0.5),
				'y':Math.floor(this._realY + 0.5),
				'fire':this._drill_BoC.attr['fire'],
				'time':null,
				'bomber':"玩家",
				'bomber_obj':this
			}
		}
		var b_id = $gameMap.drill_BoC_putBomb(input_data);
		if( b_id != -1 ){
			this._drill_BoC.attr['bombTank'].push(b_id);
		}
		return b_id;
	}else{
		return -1;
	}
}

//=============================================================================
// ** 玩家
//=============================================================================
//==============================
// * 玩家初始化
//==============================
var _drill_BoC_p_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_drill_BoC_p_initialize.call(this);
	this._drill_BoC.group['character'] = ["仇恨单位"];				//阵营
	this._drill_BoC.attr['fire'] = DrillUp.g_BoC_playerFire;		//火力
	this._drill_BoC.attr['bombNum'] = DrillUp.g_BoC_playerBombNum;	//炸弹数
	this._drill_BoC.attr['bombTank'] = [];							//放置的炸弹id集合

}
//==============================
// * 放置炸弹
//==============================
var _drill_BoC_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	if( this.drill_isBombControl() ){			//放置炸弹按钮按下
		this.drill_doBomb();
	}
	_drill_BoC_moveByInput.call(this);
};
//==============================
// * 玩家 - 切换地图时，刷新炸弹
//==============================
var _drill_BoC_m_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_BoC_m_setup.call(this,mapId);
	$gamePlayer._drill_BoC.attr['bombTank'] = [];
}

//==============================
// * 放置炸弹 - 静态约束条件
//				
//				程序执行流程中，必须禁止该能力的条件，一般不播放错误音。
//==============================
Game_Player.prototype.drill_canBomb_Normal = function() {
	if( !this.drill_BoC_hasBomb() ){ return false };			//没有炸弹可以放置
    return true;
}
//==============================
// * 放置炸弹 - 外力限制条件
//				
//				由能力关闭、封印、数量限制等因素造成的，一般会播放错误提示音。
//==============================
Game_Player.prototype.drill_canBomb_Conditional = function() {
	if( !$gameSystem._drill_BoC_canPutBomb ){ return false };					//能力被关闭
	if( !$gameMap.drill_BoC_isBombCanPut( this.x,this.y ) ){ return false };	//禁止放置炸弹
    return true;
};
//==============================
// * 放置炸弹 - 执行操作
//==============================
Game_Player.prototype.drill_doBomb = function() {
	var b_id = this.drill_BoC_characterPutBomb();
	if( b_id == -1 ){
		SoundManager.playBuzzer();
	}
}
//==============================
// * 放置炸弹 - 键盘按键条件（Drill_OperateKeys来覆写）
//==============================
Game_Player.prototype.drill_isBombControl = function() {
	return false;
}

//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_BoC_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_BoC_temp_initialize.call(this);
	this._drill_BoC_bombs = [];					//炸弹容器
	this._drill_BoC_group_custom = [];			//阵营(自定义)容器
	this._drill_BoC_group_destructible = [];	//阵营(可炸物)容器
	this._drill_BoC_group_hostile = [];			//阵营(仇恨单位)容器
												//阵营(忽视单位)不统计
	this._drill_BoC_needRestatistics_Group = true;
	this._drill_BoC_needRestatistics_Bombs = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_BoC_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_BoC_bombs = [];
	$gameTemp._drill_BoC_group_custom = [];
	$gameTemp._drill_BoC_group_destructible = [];
	$gameTemp._drill_BoC_group_hostile = [];
	$gameTemp._drill_BoC_needRestatistics_Group = true;
	$gameTemp._drill_BoC_needRestatistics_Bombs = true;
	_drill_BoC_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_BoC_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_BoC_bombs = [];
	$gameTemp._drill_BoC_group_custom = [];
	$gameTemp._drill_BoC_group_destructible = [];
	$gameTemp._drill_BoC_group_hostile = [];
	$gameTemp._drill_BoC_needRestatistics_Group = true;
	$gameTemp._drill_BoC_needRestatistics_Bombs = true;
	_drill_BoC_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_BoC_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_BoC_map_update.call(this,sceneActive);
	
	this.drill_BoC_updateRestatistics_Group();
	this.drill_BoC_updateRestatistics_Bombs();
};
//==============================
// ** 帧刷新 - 刷新统计（阵营）
//==============================
Game_Map.prototype.drill_BoC_updateRestatistics_Group = function() {
	if( !$gameTemp._drill_BoC_needRestatistics_Group ){ return }
	$gameTemp._drill_BoC_needRestatistics_Group = false;
	
	var events = this.events()
	events.push($gamePlayer);
	$gameTemp._drill_BoC_group_custom = [];
	$gameTemp._drill_BoC_group_destructible = [];
	$gameTemp._drill_BoC_group_hostile = [];
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event._drill_BoC.group['character'].indexOf("忽视单位") !== -1 ){
			//不记录
		}else if( temp_event._drill_BoC.group['character'].indexOf("仇恨单位") !== -1 ){
			$gameTemp._drill_BoC_group_hostile.push(temp_event);
		}else if( temp_event._drill_BoC.group['character'].indexOf("可炸物") !== -1 ){
			$gameTemp._drill_BoC_group_destructible.push(temp_event);
		}else {
			$gameTemp._drill_BoC_group_custom.push(temp_event);
		}
	}
}
//==============================
// ** 帧刷新 - 刷新统计（炸弹）
//==============================
Game_Map.prototype.drill_BoC_updateRestatistics_Bombs = function() {
	// > 去掉被移除的炸弹
	for (var i = $gameTemp._drill_BoC_bombs.length-1; i >=0; i--) {
		if( $gameTemp._drill_BoC_bombs[i]._erased ){
			$gameTemp._drill_BoC_bombs.splice(i,1);
		}
	}
	
	// > 刷新炸弹（添加时）
	if( !$gameTemp._drill_BoC_needRestatistics_Bombs ){ return }
	$gameTemp._drill_BoC_needRestatistics_Bombs = false;
	
	var events = this.events();
	$gameTemp._drill_BoC_bombs = [];
	for (var i = 0; i < events.length; i++) {  		//未被清除的炸弹
		var temp_event = events[i];
		if( temp_event._drill_BoC.bomb['isBomb'] == true && 
			temp_event._erased == false ){
			$gameTemp._drill_BoC_bombs.push(temp_event);
		}
	}
}
//=============================================================================
// ** 阵营
//=============================================================================
//==============================
// ** 阵营 - 获取所有敌人（单阵营）
//==============================
Game_Map.prototype.drill_BoC_getEnemyByOneTag = function( group_tag ) {
	var result = [];
	for(var i=0; i < $gameTemp._drill_BoC_group_hostile.length ; i++){		//仇恨单位组
		result.push($gameTemp._drill_BoC_group_hostile[i]);
	}
	for(var i=0; i < $gameTemp._drill_BoC_group_custom.length ; i++){		//不同分组单位组
		var character = $gameTemp._drill_BoC_group_custom[i];
		if( $gameTemp._drill_BoC_group_hostile.indexOf(this) !== -1 ){		//重复的不添加
			continue;
		}
		if( character._drill_BoC.group['character'].indexOf(group_tag) == -1 ){
			result.push(character);
		}
	}
	return result;
}
//==============================
// ** 阵营 - 获取所有敌人（多阵营）
//==============================
Game_Map.prototype.drill_BoC_getEnemyByTagList = function( group_tag_list ) {
	if( !group_tag_list || group_tag_list.length == 0 ){ return [] }
	
	var result = this.drill_BoC_getEnemyByOneTag( group_tag_list[0] );
	for(var j = 1; j < group_tag_list.length ; j++){
		var tag = group_tag_list[j];
		var enemys = this.drill_BoC_getEnemyByOneTag( tag );	//取交集
		result = result.filter(function(v){
            return enemys.indexOf(v) !== -1;
        })
	}
	return result;
}
//==============================
// ** 阵营 - 获取可炸物
//==============================
Game_Map.prototype.drill_BoC_getDestructible = function() {
	return $gameTemp._drill_BoC_group_destructible;
}
//==============================
// ** 阵营 - 获取阵营所有人
//==============================
Game_Map.prototype.drill_BoC_getGroupUnit = function( group_tag ) {
	var result = [];
	for(var i=0; i < $gameTemp._drill_BoC_group_custom.length ; i++){
		var character = $gameTemp._drill_BoC_group_custom[i];
		if( character._drill_BoC.group['character'].indexOf(group_tag) !== -1 ){
			result.push(character);
		}
	}
	return result;
}
//==============================
// ** 阵营 - 获取阵营人数
//==============================
Game_Map.prototype.drill_BoC_getGroupUnitCount = function( group_tag ) {
	var result = 0;
	for(var i=0; i < $gameTemp._drill_BoC_group_custom.length ; i++){
		var character = $gameTemp._drill_BoC_group_custom[i];
		if( character._drill_BoC.group['character'].indexOf(group_tag) !== -1 ){
			result += 1;
		}
	}
	return result;
}


//=============================================================================
// * 	放置炸弹
//
//		功能：		通过调用主函数，快速建立一个炸弹。
//		可选项：	input_data中的数据可调，见 drill_BoC_createEventDataTemplate 中的数据初始化。（你也可以传递一些特殊参数，用于继承函数时使用）
//		主函数：	var b_id = $gameMap.drill_BoC_putBomb( input_data );
//=============================================================================
//==============================
// * 炸弹 - 放置总流程
//==============================
Game_Map.prototype.drill_BoC_putBomb = function( input_data ) {
	if( $gameSystem._drill_BoC_canPutBomb == false ){ return -1; }
	
	var data = $gameMap.drill_BoC_createEventDataTemplate(input_data);	//获取炸弹事件数据
	
	if( this.drill_BoC_isBombCanPut( input_data['x'],input_data['y'] ) ){	//验证炸弹是否能放
		var e = $gameMap.drill_newEvent_createEvent(data);	//新建炸弹事件
		
		//炸弹的基本属性，在new时就setpage了，这里都通过注释设置（跳转至：事件 - 炸弹属性初始化）
		// e._drill_BoC.bomb['isBomb'] = true;
		// e._drill_BoC.bomb['timeTotal'] = 164;		//总时间
		// e._drill_BoC.bomb['time'] = 164;			//剩余时间
		// e._drill_BoC.bomb['fire'] = 1;				//标记炸弹
		// e._drill_BoC.bomb['triggerType'] = "可变激光区域";
		// e._drill_BoC.bomb['dirs'] = ['东','南','西','北'];
		// e._drill_BoC.bomb['options'] = {"through":["炸弹人-角色","炸弹人-透明墙"]};
		// $gameTemp._drill_BoC_needRestatistics_Bombs = true;		//炸弹集刷新
		
		if(data['putSound']){	//放置音效
			var se = {};
			se.name = data['putSound'];
			se.pitch = 100;
			se.volume = 100;
			AudioManager.playSe(se);
		}
		return e._eventId;
	}else{
		return -1;
	}
}
//==============================
// * 炸弹 - 获取
//==============================
Game_Map.prototype.drill_BoC_Bombs = function() {
    return $gameTemp._drill_BoC_bombs;
}
//==============================
// * 炸弹 - 帧刷新
//==============================
Game_Map.prototype.drill_BoC_updateBombTime = function() {
	var bombs = this.drill_BoC_Bombs();
	for(var i=0; i < bombs.length; i++){
		bombs[i]._drill_BoC.bomb['time'] -= 1;
	}
}
//==============================
// * 炸弹 - 是否可放置
//==============================
Game_Map.prototype.drill_BoC_isBombCanPut = function( x, y ) {
	if( !this.isPassable(x, y, 2) && !this.isPassable(x, y, 4) && !this.isPassable(x, y, 6) && !this.isPassable(x, y, 8) ){ return false; }	//完全不可通行
	if( this.drill_ETh_eventsXyNtEx2(x, y, ['炸弹人-角色']).length > 0 ){ return false; }		//含有阻塞事件
	if( DrillUp.g_BoC_bombForbiddenArea.contains($gameMap.regionId(x, y)) ){ return false; }	//禁止炸弹区
	return true;
}
//==============================
// * 炸弹 - 标准炸弹的事件模板数据
//==============================
Game_Map.prototype.drill_BoC_createEventDataTemplate = function( input_data ){
	
	// > 输入数据初始化
	var _fire = input_data['fire'] || DrillUp.g_BoC_eventFire;
	var _anim = input_data['anim'] || DrillUp.g_BoC_bombAnim;
	var _img = input_data['img'] || DrillUp.g_BoC_bombImg;
	var _boomSound = input_data['boomSound'] || DrillUp.g_BoC_bombBoomSound;
	var _interval = input_data['interval'] || DrillUp.g_BoC_bombInterval;
	var _time = input_data['time'] || DrillUp.g_BoC_bombTime;
	var _putSound = input_data['putSound'] || DrillUp.g_BoC_bombPutSound;
	var _x = input_data['x'] || 0;
	var _y = input_data['y'] || 0;
	if( DrillUp.g_BoC_bombLight == true ){
		var _light_a = DrillUp.g_BoC_bombLightFrame;
		var _light_b = DrillUp.g_BoC_bombLightBlast;
		var _light_time = DrillUp.g_BoC_bombLightBlastSustain;
	}else{
		var _light_a = 0;
		var _light_b = 0;
		var _light_time = 1;
	}

	// > 新建模板数据（id在创建事件时才赋值）
	var new_event_data = {
		"name":"定时炸弹",
		"note":"",
		"meta":{},	//镜像反射的查找meta的bug修复（其实一直不知道meta的作用）
		"pages":[{
			//>>第一页
			"conditions":{
				"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":false,"switch1Id":1,"switch1Valid":false,"switch2Id":1,"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0
			},
			"image":{
				"tileId":0,
				"characterName": _img,
				"direction": 8 ,
				"pattern": 1 ,
				"characterIndex":0
			},
			"list":[
				{"code":108,"indent":0,"parameters":["=>被触发 : 炸弹人-爆炸 : 触发独立开关 : A"]},		//连锁爆炸条件
				{"code":108,"indent":0,"parameters":["=>图块同步镜像 : 锁定镜像朝向"]},					//图块同步镜像
				{"code":108,"indent":0,"parameters":["=>自定义照明 : 物体照明 : 照明["+_light_a+"]"]},	//自定义照明效果
				{"code":108,"indent":0,"parameters":["=>炸弹人核心 : AI识别爆炸时长 : "+(_time+_interval) ]},
				{"code":108,"indent":0,"parameters":["=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 东,南,西,北 : "+ _fire +" : 炸弹人-爆炸" ]},
				{"code":108,"indent":0,"parameters":["=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 穿透类型 : 炸弹人-角色" ]},
				{"code":108,"indent":0,"parameters":["=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 穿透类型 : 炸弹人-透明墙" ]},
				{"code":230,"indent":0,"parameters":[ _time ]},		//延时条件
				{"code":123,"indent":0,"parameters":["A",0]},		//爆炸独立开关
				{"code":0,"indent":0,"parameters":[]}				//终止符
			],
			"moveFrequency":3,
			"moveRoute":{
				"list":[{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false
			},
			"moveSpeed":3,
			"moveType":0,
			"directionFix":true,	//固定朝向
			"priorityType":1,		//优先级（与人物相同）
			"stepAnime":true,		//踏步动画
			"through":false,		//穿透
			"trigger":4,			//触发条件（并行处理）
			"walkAnime":false		//步行动画
		},{
			//>>第二页
			"conditions":{
				"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":true,"switch1Id":1,"switch1Valid":false,"switch2Id":1,
				"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0
			},
			"image":{
				"tileId":0,
				"characterName": _img,
				"direction":8,
				"pattern":1,
				"characterIndex":0
			},
			"list":[
				{"code":250,"indent":0,"parameters":[{"name": _boomSound,"volume":100,"pitch":100,"pan":0}]},
				{"code":108,"indent":0,"parameters":["=>自定义照明 : 物体照明 : 关闭照明"]},
				{"code":356,"indent":0,"parameters":[">主动触发 : 可变激光区域 : 开启穿透 : 炸弹人-角色,炸弹人-透明墙"]},
				{"code":356,"indent":0,"parameters":[">主动触发 : 本事件 : 可变激光区域 : 东,南,西,北 : " + _fire + " : 炸弹人-爆炸"]},
				{"code":356,"indent":0,"parameters":[">物体范围动画 : 可变激光区域 : 上一次触发的 : 动画[" +_anim+ "]" ]},
				{"code":356,"indent":0,"parameters":[">物体范围动画 : 可变激光区域 : 在上一个起始点播放动画 : 动画[" +_anim+ "]" ]},
				//{"code":356,"indent":0,"parameters":[">物体范围动画 : 可变激光区域 : 在上一个终止点播放动画 : 动画[" +_anim+ "]" ]},
				{"code":356,"indent":0,"parameters":[">主动触发 : 可变激光区域 : 关闭穿透"]},
				{"code":356,"indent":0,"parameters":[">自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间["+_light_time+"] : 本事件 : 照明["+_light_b+"]" ]},
				{"code":225,"indent":0,"parameters":[3,7,20,false]},	//震动屏幕
				{"code":230,"indent":0,"parameters":[ _interval ]},		//延时间隔
				{"code":356,"indent":0,"parameters":[">主动触发 : 可变激光区域 : 上一次事件的 : 本事件 : 炸弹人-爆炸"]}, //隔一段时间，再次触发
				//{"code":214,"indent":0,"parameters":[]},				//暂时消除事件
				{"code":356,"indent":0,"parameters":[">事件管理核心 : 本事件 : 彻底删除"]},
				{"code":0,"indent":0,"parameters":[]}
			],
			"moveFrequency":3,
			"moveRoute":{
				"list":[{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false
			},
			"moveSpeed":3,
			"moveType":0,
			"directionFix":true,	//固定朝向
			"priorityType":0,		//优先级（在人物下方）
			"stepAnime":true,		//踏步动画
			"through":false,		//穿透
			"trigger":4,			//触发条件（并行处理）
			"walkAnime":false		//步行动画
		}],
		"x": _x,
		"y": _y,
		"putSound":_putSound
	};
	
	return new_event_data;
};

//=============================================================================
// ** 爆炸区域判定
//=============================================================================
//==============================
// * 爆炸区域判定 - 初始化
//==============================
var _drill_BoC_gamemap_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_BoC_gamemap_initialize.call(this);
	this._drill_BoC_explodeArea = [];			//爆炸范围
	this._drill_BoC_explodeDelay = 0;			//判定延迟刷新
}
//==============================
// * 爆炸区域判定 - 帧刷新
//==============================
var _drill_BoC_gamemap_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    if (sceneActive) {
		this.drill_BoC_updateBombTime();
		this.drill_BoC_updateExplodeArea();
	}
	_drill_BoC_gamemap_update.call(this,sceneActive);
}
//==============================
// * 爆炸区域判定 - 全图判定刷新
//==============================
Game_Map.prototype.drill_BoC_updateExplodeArea = function() {
	this._drill_BoC_explodeDelay ++;
	if(this._drill_BoC_explodeDelay >= 3 ){	//延迟刷新
		this._drill_BoC_explodeDelay = 0;
		
		var all_bomb = this.drill_BoC_Bombs();
		this._drill_BoC_explodeArea = this.drill_BoC_getAllExplodeArea(all_bomb);
	}
}
//==============================
// * 爆炸区域判定 - 获取全图的爆炸时间点（设置、炸弹爆炸时才刷新全部时间点）
//==============================
Game_Map.prototype.drill_BoC_getAllExplodeArea = function(all_bomb) {
	var all_area = [];
	
	// > 1.爆炸时间点初始化（根据炸弹区域，实时重组）
	for(var i=0; i<all_bomb.length; i++){
		var bomb_ev = all_bomb[i];
		var area = this.drill_BoC_getBombArea(bomb_ev);
		bomb_ev._drill_BoC.bomb['area'] = area;
		for(var j=0; j< area.length ; j++ ){
			var point = area[j];
			point['bomb_id'] = bomb_ev._eventId;
			point['time'] = bomb_ev._drill_BoC.bomb['time'];
			all_area.push(point);
		}
	}
	// > 2.爆炸波及到其它炸弹时（同时引爆），这个炸弹的全部点 以最短的时间为准
	for(var j=0; j<all_area.length ; j++ ){
		var point = all_area[j];
		for(var k=0; k<all_bomb.length; k++){
			var bomb_ev = all_bomb[k];
			
			if( point['bomb_id'] != bomb_ev._eventId && point['x'] == bomb_ev._x && point['y'] == bomb_ev._y){
				var b_area = bomb_ev._drill_BoC.bomb['area'];
				for(var n=0; n<b_area.length; n++){
					if( b_area[n]['time'] > point['time'] ){
						b_area[n]['time'] = point['time'];
					}
				}
			}
		}
	}
	
	// > 3.相同区域交叉时，留下时间短的那个（根据时间最小排序，然后倒序去掉与前一个相同的区域）
	all_area.sort(function(a, b){
		if( a.x != b.x ){ return a.x - b.x; }
		if( a.y != b.y ){ return a.y - b.y; }
		return a.time - b.time
	});
	for(var i=all_area.length-1; i>=0; i-- ){
		if( i!=0 ){
			var last = all_area[i-1];
			var cur = all_area[i];
			if( cur.x == last.x && cur.y == last.y ){
				all_area.splice(i,1);
			}
		}
	}
	//if( all_area.length > 9 ){
	//	alert(JSON.stringify(all_area));
	//}
	
	return all_area;
}
//==============================
// * 爆炸区域判定 - 获取单个炸弹的范围
//==============================
Game_Map.prototype.drill_BoC_getBombArea = function(bomb) {
	if( bomb._drill_BoC.bomb['triggerType'] == "可变激光区域" ){
		var dirs = bomb._drill_BoC.bomb['dirs'];
		var fire = bomb._drill_BoC.bomb['fire'];
		var options = bomb._drill_BoC.bomb['options'];
		return this.drill_getLaserArea( bomb._x, bomb._y, dirs, fire, options);
	}
	if( bomb._drill_BoC.bomb['triggerType'] == "固定区域" ){
		if( bomb._drill_BoC.bomb['areaType'] == "自定义区域" ){
			var self_id = bomb._drill_BoC.bomb['self_id'];
			var areaCondition = bomb._drill_BoC.bomb['areaCondition'];
			if( areaCondition == undefined ){
				areaCondition = {};
			}
			return this.drill_COFA_getCustomPointsByIdWithCondition( bomb._eventId, self_id, areaCondition );
		}else{
			var type = bomb._drill_BoC.bomb['areaType'];
			var range = bomb._drill_BoC.bomb['range'];
			var areaCondition = bomb._drill_BoC.bomb['areaCondition'];
			if( areaCondition == undefined ){
				areaCondition = {};
			}
			return this.drill_COFA_getShapePointsWithCondition(  bomb._x, bomb._y, type, range, areaCondition );
		}
	}
	return [];
}

//=============================================================================
// ** AI决策树
//=============================================================================
//==============================
// * 指令 - 执行移动路线指令（继承）
//==============================
var _drill_BoC_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	_drill_BoC_routeCommand.call( this, command, args );
	if( command == ">躲避炸弹Lv0" ){
		this.drill_BoC_avoidBombAI_Lv0();
	}
	if( command == ">躲避炸弹Lv1" ){
		this.drill_BoC_avoidBombAI_Lv1();
	}
	if( command == ">寻找目标Lv0" ){
		this.drill_BoC_findTargetAI_Lv0();
	}
	if( command == ">寻找目标Lv1" ){
		this.drill_BoC_findTargetAI_Lv1();
	}
	if( command == ">强迫放置炸弹" ){
		this.drill_BoC_putBombAI();
	}
};
//==============================
// * AI - 放置炸弹
//==============================
Game_Character.prototype.drill_BoC_putBombAI = function() {
	this.drill_BoC_characterPutBomb();
}
//==============================
// * AI - 躲避炸弹Lv0
//		 （决策树见文档说明）
//==============================
Game_Character.prototype.drill_BoC_avoidBombAI_Lv0 = function() {
	
	// >>脚下区域判定
	if( ! this.drill_BoC_isInExplodeArea(this._x, this._y) ){
		return;		//如果脚下是安全的，完全不理会
	}
	
	// >>可移动区域判定
	var passableDir = this.drill_BoC_getPassableDirs(this._x, this._y);
	if( passableDir.length == 0 ){		//被堵死
		this._waitCount = 11;
		this.turnRandom();//随机旋转
		return;
	}
	
	// >>新的安全区域判定
	var safeDir = [];
	for( var i=0; i<passableDir.length; i++ ){
		if( !this.drill_BoC_isInExplodeAreaDir(this._x, this._y, passableDir[i]) ){
			safeDir.push(passableDir[i]);
		}
	}
	if( safeDir.length == 0 ){		//当前范围内没有安全区域
		this.moveStraight(passableDir[ Math.floor( Math.random() * passableDir.length ) ]);	//随机向可移动位置移动
		return;
	}
	
	this.moveStraight(safeDir[ Math.floor( Math.random() * safeDir.length ) ]);	//随机向安全区移动
}
//==============================
// * AI - 躲避炸弹Lv1
//		 （决策树见文档说明）
//==============================
Game_Character.prototype.drill_BoC_avoidBombAI_Lv1 = function() {
	
	// >>脚下区域判定
	if( ! this.drill_BoC_isInExplodeArea(this._x, this._y) ){
		return;		//如果脚下是安全的，完全不理会
	}
	
	// >>可移动区域判定
	var passableDir = this.drill_BoC_getPassableDirs(this._x, this._y);
	if( passableDir.length == 0 ){		//被堵死
		this._waitCount = 14;
		this.turnRandom();//随机旋转
		return;
	}
	
	// >>新的安全区域判定
	var safeDir = [];
	for( var i=0; i<passableDir.length; i++ ){
		if( !this.drill_BoC_isInExplodeAreaDir(this._x, this._y, passableDir[i]) ){
			safeDir.push(passableDir[i]);
		}
	}
	if( safeDir.length == 0 ){		//当前范围内没有安全区域
		// >>爆炸时间区域判定
		var lateFootTime = this.drill_BoC_isInExplodeAreaTime(this._x, this._y);
		var lateDirData = [];
		for( var i=0; i<passableDir.length; i++ ){
			var dir_data = {};
			dir_data.time = this.drill_BoC_isInExplodeAreaDirTime(this._x, this._y, passableDir[i] );
			dir_data.dir = passableDir[i];
			lateDirData.push( dir_data );
		}
		lateDirData.sort(function(a, b){
			if( a.time != b.time ){ return b.time - a.time; }	//数值大的优先
			return Math.floor( Math.random()*3 - 2 );	//时间相同，则随机排序
		});
		if( lateDirData.length == 0 || lateFootTime > lateDirData[0].time ){
			//原地等待
		}else{
			this.moveStraight(lateDirData[0].dir);	//向爆炸时间长的位置移动
		}
		return;
	}
	
	// >>选择安全区堵路少的方向
	var blockLessData = [];
	for( var i=0; i<safeDir.length; i++ ){
		var x2 = $gameMap.roundXWithDirection(this._x, safeDir[i]);
		var y2 = $gameMap.roundYWithDirection(this._y, safeDir[i]);
		var lessData = {};
		lessData.count = this.drill_BoC_getPassableDirs(x2, y2).length;
		lessData.dir = safeDir[i];
		blockLessData.push(lessData);
	}
	blockLessData.sort(function(a, b){
		if( a.count != b.count ){ return b.count - a.count; }	//数值大的优先
		return Math.floor( Math.random()*3 - 2 );	//时间相同，则随机排序
	});
	if( blockLessData.length > 0 ){
		this.moveStraight(blockLessData[0].dir);
	}
}
//==============================
// * AI - 寻找目标Lv0
//		 （决策树见文档说明）
//==============================
Game_Character.prototype.drill_BoC_findTargetAI_Lv0 = function() {
	
	// >>脚下区域判定
	if( this.drill_BoC_isInExplodeArea(this._x, this._y) || !this.drill_BoC_hasBomb() ){
		return;		//如果脚下不安全/没有炸弹，停止寻找目标
	}
	
	// >>可移动区域判定
	var passableDir = this.drill_BoC_getPassableDirs(this._x, this._y);
	if( passableDir.length == 0 ){		//被堵死
		this._waitCount = 14;
		this.turnRandom();//随机旋转
		return;
	}
	
	// >>可炸物搜寻
	var dests = this.drill_BoC_getAllTarget();
	dests = dests.filter( //搜寻距离<=2的可炸物
		function(value,index,array){
			return $gameMap.distance(value._x,value._y,this._x,this._y) <= 2;
		} ,this);
	if( dests.length == 0 ){
		this.moveStraight(passableDir[ Math.floor( Math.random() * passableDir.length ) ]);	//随机向可移动位置移动
		return;
	}
	
	// >>可炸物是否在5图块内
	var near_dests = dests.filter(
		function(value,index,array){
			return $gameMap.distance(value._x,value._y,this._x,this._y) <= 1;
		} ,this);
	if( near_dests.length == 0 ){
		//靠近随机可炸物
		var dest_character = dests[Math.floor( Math.random() * dests.length )];
		
		var dir = 0;
		var sx = this.deltaXFrom(dest_character.x);
		var sy = this.deltaYFrom(dest_character.y);
		if ( Math.random() > 0.5 ) {
			if( sx !== 0 ){
				dir = sx > 0 ? 4 : 6;
				if( !this.canPass( this._x, this._y, dir) ){	//如果堵路，选其他方向
					dir = Math.random()*41%20 > 10 ? 8 : 2;
				}
			}
		} else {
			if( sy !== 0 ){
				dir = sy > 0 ? 8 : 2;
				if( !this.canPass( this._x, this._y, dir) ){	//如果堵路，选其他方向
					dir = Math.random()*41%20 > 10 ? 4 : 6;
				}
			}
		}
		if( this.drill_BoC_isInExplodeAreaDir( this._x, this._y, dir) ){
			return;	//如果有爆炸，等待
		}
		this.moveStraight(dir);
		return;
	}else{
		//放置炸弹
		this.drill_BoC_putBombAI();
		
	}
}
//==============================
// * AI - 寻找目标Lv1
//		 （决策树见文档说明）
//==============================
Game_Character.prototype.drill_BoC_findTargetAI_Lv1 = function() {
	
	// >>脚下区域判定
	if( this.drill_BoC_isInExplodeArea(this._x, this._y) || !this.drill_BoC_hasBomb() ){
		return;		//如果脚下不安全/没有炸弹，停止寻找目标
	}
	
	// >>可炸物搜寻
	var dests = this.drill_BoC_getAllTarget();
	dests = dests.filter( //搜寻距离<=2的可炸物
		function(value,index,array){
			return $gameMap.distance(value._x,value._y,this._x,this._y) <= 2;
		} ,this);
	if( dests.length == 0 ){
		// >>选择安全区堵路少的方向
		var passableDir = this.drill_BoC_getPassableDirs(this._x, this._y);
		var safeDir = [];
		for( var i=0; i<passableDir.length; i++ ){
			if( !this.drill_BoC_isInExplodeAreaDir(this._x, this._y, passableDir[i]) ){
				safeDir.push(passableDir[i]);
			}
		}
		var blockLessData = [];
		for( var i=0; i<safeDir.length; i++ ){
			var x2 = $gameMap.roundXWithDirection(this._x, safeDir[i]);
			var y2 = $gameMap.roundYWithDirection(this._y, safeDir[i]);
			var lessData = {};
			lessData.count = this.drill_BoC_getPassableDirs(x2, y2).length;
			lessData.dir = safeDir[i];
			blockLessData.push(lessData);
		}
		blockLessData.sort(function(a, b){
			if( a.count != b.count ){ return b.count - a.count; }	//数值大的优先
			return Math.floor( Math.random()*3 - 2 );	//时间相同，则随机排序
		});
		if( blockLessData.length > 0 ){
			this.moveStraight(blockLessData[0].dir);
		}
		return;
	}
	
	// >>5图块内是否安全
	if (this.drill_BoC_isInExplodeArea( $gameMap.roundX(this._x + 1), this._y ) ||
		this.drill_BoC_isInExplodeArea( $gameMap.roundX(this._x - 1), this._y ) ||
		this.drill_BoC_isInExplodeArea( this._x , $gameMap.roundY(this._y + 1)) ||
		this.drill_BoC_isInExplodeArea( this._x , $gameMap.roundY(this._y - 1)) ){
			
		//发呆
		return;
	}
	
	// >>可炸物是否在5图块内
	var near_dests = dests.filter(
		function(value,index,array){
			return $gameMap.distance(value._x,value._y,this._x,this._y) <= 1;
		} ,this);
	if( near_dests.length == 0 ){
		//靠近随机可炸物
		var dest_character = dests[Math.floor( Math.random() * dests.length )];
		
		var dir = 0;
		var sx = this.deltaXFrom(dest_character.x);
		var sy = this.deltaYFrom(dest_character.y);
		if ( Math.random() > 0.5 ) {
			if( sx !== 0 ){
				dir = sx > 0 ? 4 : 6;
				if( !this.canPass( this._x, this._y, dir) ){	//如果堵路，选其他方向
					dir = Math.random()*41%20 > 10 ? 8 : 2;
				}
			}
		} else {
			if( sy !== 0 ){
				dir = sy > 0 ? 8 : 2;
				if( !this.canPass( this._x, this._y, dir) ){	//如果堵路，选其他方向
					dir = Math.random()*41%20 > 10 ? 4 : 6;
				}
			}
		}
		if( this.drill_BoC_isInExplodeAreaDir( this._x, this._y, dir) ){
			return;	//如果有爆炸，等待
		}
		this.moveStraight(dir);
		return;
	}
		
	//放置炸弹
	this.drill_BoC_putBombAI();
	
}

//==============================
// * AI - 获取指定区域的可通行区域
//==============================
Game_CharacterBase.prototype.drill_BoC_getPassableDirs = function(x, y) {
	var passableDir = [];
	if( this.canPass(x, y, 2) ){ passableDir.push(2); }	//下
	if( this.canPass(x, y, 4) ){ passableDir.push(4); }	//左
	if( this.canPass(x, y, 6) ){ passableDir.push(6); }	//右
	if( this.canPass(x, y, 8) ){ passableDir.push(8); }	//上
	return passableDir;
}
//==============================
// * AI - 获取全部目标（不区分敌人、玩家、可炸物）
//==============================
Game_CharacterBase.prototype.drill_BoC_getAllTarget = function() {
	var targets = $gameMap.drill_BoC_getDestructible();
	targets = targets.concat($gameMap.drill_BoC_getEnemyByTagList( this._drill_BoC.group['character'] ));
	targets.splice(targets.indexOf(this),1);		//排除自己
	return targets;
}
//==============================
// * AI - 是否为爆炸区域（前进一步的位置）
//==============================
Game_CharacterBase.prototype.drill_BoC_isInExplodeAreaDir = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
	return this.drill_BoC_isInExplodeArea(x2,y2);
}
//==============================
// * AI - 是否为爆炸区域（脚下）
//==============================
Game_CharacterBase.prototype.drill_BoC_isInExplodeArea = function(x, y) {
	for(var i= 0; i<$gameMap._drill_BoC_explodeArea.length ;i++){
		if( $gameMap._drill_BoC_explodeArea[i].x == x && $gameMap._drill_BoC_explodeArea[i].y == y ){
			return true;
		}
	}
	return false;
}
//==============================
// * AI - 剩余爆炸时间（前进一步的位置）
//==============================
Game_CharacterBase.prototype.drill_BoC_isInExplodeAreaDirTime = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
	return this.drill_BoC_isInExplodeAreaTime(x2,y2);
}
//==============================
// * AI - 剩余爆炸时间（脚下位置）
//==============================
Game_CharacterBase.prototype.drill_BoC_isInExplodeAreaTime = function(x, y) {
	for(var i= 0; i<$gameMap._drill_BoC_explodeArea.length ;i++){
		if( $gameMap._drill_BoC_explodeArea[i].x == x && $gameMap._drill_BoC_explodeArea[i].y == y ){
			return $gameMap._drill_BoC_explodeArea[i].time ;
		}
	}
	return -1;
}

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BombCore = false;
		alert(
			"【Drill_BombCore.js 炸弹人 - 游戏核心】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventDuplicator 物体管理-事件复制器"+
			"\n- Drill_EventThrough 体积-事件穿透关系"+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"+
			"\n- Drill_EventLaserTrigger 物体触发-可变激光区域&条件"+
			"\n- Drill_EventLaserAnimation 物体触发-可变激光区域&播放并行动画"+
			"\n- Drill_CoreOfMoveRoute 移动路线-移动路线核心"
		);
}

