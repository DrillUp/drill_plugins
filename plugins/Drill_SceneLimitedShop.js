//=============================================================================
// Drill_SceneLimitedShop.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        面板 - 限量商店
 * @author Drill_up
 * 
 * @Drill_LE_param "限量商店-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_SLS_shop_list_length"
 * 
 * @Drill_LE_param "服务员-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_SLS_waitress_list_length"
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_SceneLimitedShop +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 只提供限量道具的商店界面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心
 *   - Drill_CoreOfWaitressSprite   主菜单-服务员核心
 *     必须基于上述插件才能显示控制窗口移动、服务员动作。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SLS
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.具体可以去看看 "18.面板 > 关于限量商店界面.docx"。
 *   文档中有相关图解，比纯文字容易理解。
 * 结构：
 *   (1.插件包含：4个窗口 + 1个按钮组 + 1个服务员
 *   (2.窗口的布局规划没有限制，去了解下 "17.主菜单 > 窗口与布局.docx"。
 *   (3.注意，购买流程 是完全固定的业务逻辑，无法修改。
 * 窗口：
 *   (1.这里的所有窗口的信息都应该俱全，不建议使用y1000隐藏。
 *   (2.你需要考虑如何分配每个窗口的占用空间。
 *      具体可以去看看文档中流程的窗口显示情况介绍。
 * 按钮组：
 *   (1.按钮组必须要至少3个活动点，即上限隐藏点、下限隐藏点、中间序列点。
 *      中间序列点可以有多个，用于陈列队列中的商品。
 *   (2.点击购买物品时，处于有效点的物品，为当前选中的物品。
 *      详细可以看看文档介绍。
 *   (3.按钮组暂 不支持 鼠标滑动滚动。
 * 价格：
 *   (1.限量商店不能控制一般商店的价格变动，但是可以设置多买涨价。
 *   (2.商店只能使用金钱进行购买，没有交换商店的功能。
 * 限量：
 *   (1.每个限量商店都是独立的商店，不同商店的实际库存不一样。
 *   (2.限量分为 背包限制 和 库存限制。
 *      背包限制会根据玩家持有的物品来决定。
 *      库存限制会根据商店持有的数量来决定。
 *   (3.你可以设置"是否显示限制的最大值"，
 *      最大值显示则为"1/5"，不显示则为"4"表示剩余数量。
 * 多买涨价：
 *   (1.由于商品是一个一个卖的，每次购买后，可以涨价。
 *      价格增量也可以为负数，越买越便宜。
 *   (2.注意，你不能放置一个价格为0的物品，该物品无法出售，即使库存充足。
 *   (3.背包限制的有两种涨价：永久涨价 和 按背包数量涨价。
 *      比如限量10个，买了10个，用2个，再买第11个。
 *      永久涨价的价格是第11个的涨幅价格，按背包数量涨价则是第9个价格。
 * 服务员：
 *   (1.配置商店时，可以直接配置服务员的id。
 *   (2.服务员可以对以下情况作出不同gif动作：
 *      "欢迎光临"：刚进入界面时触发。
 *      "购买一个物品"：玩家购买了一个物品时触发。
 *      "余额不足"：玩家买不起时点击购买触发。
 *      "库存不足"：库存限制的物品，在库存不足时触发。
 *      "背包满了"：背包限制的物品，在背包满了时触发。
 *      "全部卖完"：商店内所有库存的物品全部卖完时触发。
 *   (3.服务员实际上只是一张变化的gif贴图，可以不是人物立绘。
 *   (4.该插件配置有 限量商店 和 服务员 配置。
 *      找不到服务员的时候，记得 往下翻 参数列表，因为服务员配置在下面。
 * 存储数据：
 *   (1.插件中很多属性修改后永久有效，这些数据存入了存档中，
 *      如果读取旧存档，会出现旧存档中部分数据不一致的问题。
 *   (2.插件支持 空数据同步更新 的优化，
 *      详细去看看"21.管理器 > 数据更新与旧存档.docx"
 *   (3.效果为：新加了一个限量商店时，这个商店可以在旧存档中开放。
 *      并且具备相应的商品数量。
 *      但注意，编辑修改的商店商品数量，是不能同步到旧存档中的。
 * 设计：
 *   (1.该商店需要使用插件指令">限量商店"才能进入指定的限量商店。
 *      并且，窗口配置后的样式是固定的。
 *      虽然在游戏中，结构不能临时改变，但是你可以换皮，比如使用插件
 *      指令开关菜单背景达到切换商店背景的效果，或者切换服务员。
 *      更多设计可以再去看看 "18.面板 > 关于全自定义商店界面.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__limitShop （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__limitShop文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-整体布局
 * 资源-商品窗口
 * 资源-确认窗口
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开限量商店界面，需要使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>限量商店 : 限量商店[1] : 打开
 *
 * 1.数字表示配置的商店的序号。不同的商店的库存是不一样的。
 * 2.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 改变限量
 * 你可以使用用下面的插件指令，修改上限：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>限量商店 : 限量商店[1] : 添加上限 : 商品[1] : 数量[+5]
 * 插件指令：>限量商店 : 限量商店[1] : 添加上限 : 商品[1] : 数量[-5]
 * 
 * 1."商品[1]"表示配置的第1个商品。
 * 2."数量[+5]"表示添加上限。"数量[-5]"表示减少上限。
 *   如果类型为库存限制，上限 表示库存量，
 *   如果类型为背包限制，上限 表示最大购买量。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 库存信息获取
 * 你可以使用用下面的插件指令，获取库存信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>限量商店 : 限量商店[1] : 获取剩余库存 : 商品[1] : 变量[21]
 * 插件指令：>限量商店 : 限量商店[1] : 获取库存限制量 : 商品[1] : 变量[21]
 * 插件指令：>限量商店 : 限量商店[1] : 是否卖完 : 商品[1] : 开关[21]
 * 插件指令：>限量商店 : 限量商店[1] : 全部商品是否卖完 : 开关[21]
 * 
 * 1.上述指令仅限于 库存限制类型 的商店。
 *   使用插件指令时，注意一下商店的 限制类型。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 服务员
 * 你可以在进入商店页面前修改服务员：
 * 
 * 插件指令：>限量商店 : 限量商店[1] : 切换服务员 : 2
 * 插件指令：>限量商店 : 限量商店[1] : 隐藏服务员
 * 
 * 1.数字表示设置的服务员的id编号。
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
 * 时间复杂度： o(n^2)*o(场景元素) 每帧
 * 测试方法：   直接进入该信息面板进行测试。
 * 测试结果：   在菜单界面中，基本元素消耗为：【18.53ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为一个界面，在该插件的界面中，地图界面、战斗界面处于完全
 *   暂停状态，所以该界面占用的图形资源、计算资源充足，消耗也低。
 * 3.该界面中的元素数量有限，消耗也上不去。暂无与消耗相关的线性关系量。
 *   （地图的线性关系量：事件，因为50/100/200事件对于消耗影响较大。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了drill指针的控制。
 * [v1.2]
 * 修复了所有商品卖完后，再次购买出错的bug。添加了 库存全部卖完 动作。
 * 修复了服务员无法正常播放动作的bug。
 * [v1.3]
 * 添加了 空数据同步更新 的优化。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 限量商店-整体布局
 * @require 1
 * @dir img/Menu__limitShop/
 * @type file
 *
 * @param ----限量商店----
 * @default 
 *
 * @param 限量商店-1
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-2
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-3
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-4
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-5
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-6
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-7
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-8
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-9
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-10
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-11
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-12
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-13
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-14
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-15
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-16
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-17
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-18
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-19
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-20
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-21
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-22
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-23
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-24
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-25
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-26
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-27
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-28
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-29
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param 限量商店-30
 * @parent ----限量商店----
 * @type struct<DrillSLSshop>
 * @desc 每个限量商店都是独立的商店，不同商店的实际库存不一样。
 * @default 
 *
 * @param ----服务员----
 * @default 
 *
 * @param 服务员-1
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-2
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-3
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-4
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-5
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-6
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-7
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-8
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-9
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-10
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-11
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-12
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-13
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-14
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-15
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-16
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-17
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-18
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-19
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-20
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-21
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-22
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-23
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-24
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-25
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-26
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-27
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-28
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-29
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 * @param 服务员-30
 * @parent ----服务员----
 * @type struct<DrillSLSWaitress>
 * @desc 设置服务员的信息。
 * @default 
 *
 *
 * @param ----商品窗口----
 * @default 
 * 
 * @param 商品窗口 X
 * @parent ----商品窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 130
 *
 * @param 商品窗口 Y
 * @parent ----商品窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 75
 *
 * @param 商品窗口宽度
 * @parent ----商品窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 430
 *
 * @param 商品窗口高度
 * @parent ----商品窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 435
 *
 * @param 商品窗口列数
 * @parent ----商品窗口----
 * @type number
 * @min 1
 * @desc 商品窗口的列数。
 * @default 1
 *
 * @param 商品窗口字体大小
 * @parent ----商品窗口----
 * @type number
 * @min 1
 * @desc 商品窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 商品窗口移动动画
 * @parent ----商品窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"50","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 商品窗口布局
 * @parent ----商品窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"限量商店-选项窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 商品窗口行高
 * @parent ----商品窗口----
 * @type number
 * @min 1
 * @desc 商品窗口的选项的高度。
 * @default 64
 * 
 * @param 商品窗口指针与边框
 * @parent ----商品窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 *
 * @param ----商品按钮组----
 * @default 
 *
 * @param 按钮宽度
 * @parent ----商品按钮组----
 * @type number
 * @min 50
 * @desc 按钮控制文本绘制的区域，这里为宽度，你可以参考商品窗口的宽度。
 * @default 430
 *
 * @param 按钮高度
 * @parent ----商品按钮组----
 * @type number
 * @min 20
 * @desc 按钮控制文本绘制的区域，这里为高度，你可以参考商品窗口的行高。
 * @default 64
 *
 * @param 按钮字体大小
 * @parent ----商品按钮组----
 * @type number
 * @min 1
 * @desc 商品窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 * 
 * @param 键盘按键是否反向
 * @parent ----商品按钮组----
 * @type boolean
 * @on 反向
 * @off 不反向
 * @desc 注意，反向后，键盘按下，按钮向上滚动。相当于滚筒。
 * @default true
 * 
 * @param 上限隐藏点
 * @parent ----商品按钮组----
 * @desc 填入点的绝对坐标值，(10,10) 的格式。
 * @default (140,20)
 * 
 * @param 中间序列点列表
 * @parent ----商品按钮组----
 * @desc 填入点的绝对坐标值，(10,10) 的格式，用逗号隔开。
 * @default (140,90),(140,160),(110,260),(140,360),(140,430)
 * 
 * @param 下限隐藏点
 * @parent ----商品按钮组----
 * @desc 填入点的绝对坐标值，(10,10) 的格式。
 * @default (140,500)
 *
 * @param 有效点
 * @parent ----商品按钮组----
 * @type number
 * @min 1
 * @desc 这里设置中间序列点列表中，哪一个点为有效点，有效点详细介绍可以看看文档。
 * @default 3
 * 
 * @param 资源-激活的按钮
 * @parent ----商品按钮组----
 * @desc 服务员的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default 限量商店-单条商品
 * @require 1
 * @dir img/Menu__limitShop/
 * @type file
 * 
 * @param 资源-未激活的按钮
 * @parent ----商品按钮组----
 * @desc 服务员的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default 限量商店-单条商品-关闭
 * @require 1
 * @dir img/Menu__limitShop/
 * @type file
 *
 * @param 按钮移动动画
 * @parent ----商品按钮组----
 * @type struct<DrillWindowBtnMoving>
 * @desc 按钮移动的动画设置，按钮的目标点被序列点固定了，所以没有起点设置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0"}
 * 
 * 
 * 
 * @param ----确认窗口----
 * @default 
 * 
 * @param 确认窗口 X
 * @parent ----确认窗口----
 * @desc 确认窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 180
 *
 * @param 确认窗口 Y
 * @parent ----确认窗口----
 * @desc 确认窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 230
 *
 * @param 确认窗口宽度
 * @parent ----确认窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 450
 *
 * @param 确认窗口高度
 * @parent ----确认窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 130
 *
 * @param 确认窗口字体大小
 * @parent ----确认窗口----
 * @type number
 * @min 1
 * @desc 确认窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 确认窗口移动动画
 * @parent ----确认窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"15","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 确认窗口布局
 * @parent ----确认窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"限量商店-确认窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 用语-购买询问
 * @parent ----确认窗口----
 * @type note
 * @desc 确认窗口的购买询问，其中"<商品价格>"字符串会被替换成购买的商品的价格。
 * @default "是否花费<商品价格>\\G购买此商品？"
 * 
 * @param 用语-确认购买
 * @parent ----确认窗口----
 * @desc 确认窗口中，确认购买按钮的文本。
 * @default 是的！
 * 
 * @param 用语-取消购买
 * @parent ----确认窗口----
 * @desc 确认窗口中，取消购买按钮的文本。
 * @default 不对！不对！
 * 
 * @param 确认窗口指针与边框
 * @parent ----确认窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 * 
 * @param ----帮助窗口----
 * @default 
 * 
 * @param 帮助窗口 X
 * @parent ----帮助窗口----
 * @desc 帮助窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 80
 *
 * @param 帮助窗口 Y
 * @parent ----帮助窗口----
 * @desc 帮助窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 500
 *
 * @param 帮助窗口宽度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 540
 *
 * @param 帮助窗口高度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 120
 *
 * @param 帮助窗口字体大小
 * @parent ----帮助窗口----
 * @type number
 * @min 1
 * @desc 帮助窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 帮助窗口移动动画
 * @parent ----帮助窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"40","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"80","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 帮助窗口布局
 * @parent ----帮助窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"隐藏布局","---单张背景贴图---":"","资源-贴图":"限量商店-帮助窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * 
 * @param ----金钱窗口----
 * @default 
 * 
 * @param 金钱窗口 X
 * @parent ----金钱窗口----
 * @desc 金钱窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 590
 *
 * @param 金钱窗口 Y
 * @parent ----金钱窗口----
 * @desc 金钱窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 40
 *
 * @param 金钱窗口宽度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 210
 *
 * @param 金钱窗口高度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 80
 *
 * @param 金钱窗口字体大小
 * @parent ----金钱窗口----
 * @type number
 * @min 1
 * @desc 金钱窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 金钱窗口移动动画
 * @parent ----金钱窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"60","移动延迟":"45","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"-80","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 金钱窗口布局
 * @parent ----金钱窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"隐藏布局","---单张背景贴图---":"","资源-贴图":"限量商店-金钱窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 *
 */
/*~struct~DrillSLSshop:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的限量商店==
 * 
 * 
 * @param 商品列表
 * @type struct<DrillSLSitem>[]
 * @desc 出售的商品列表。
 * @default []
 *
 * @param 商店服务员
 * @type number
 * @min 0
 * @desc 该商店的服务员，填入配置的服务员id，0表示没有服务员。
 * @default 0
 * 
 * @param 卖完后是否隐藏商品
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc 如果不隐藏，将显示"已卖完"状态。
 * @default false
 *
 * @param 商品陈列模式
 * @type select
 * @option 窗口模式
 * @value 窗口模式
 * @option 按钮组模式
 * @value 按钮组模式
 * @desc 该商店的商品展出的方式。
 * @default 按钮组模式
 *
 */
/*~struct~DrillSLSitem:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的商品==
 *
 * @param ---商品---
 * @default 
 *
 * @param 商品类型
 * @parent ---商品---
 * @type select
 * @option 物品
 * @value 物品
 * @option 武器
 * @value 武器
 * @option 护甲
 * @value 护甲
 * @desc 当前商品的类型。
 * @default 物品
 *
 * @param 商品类型-物品
 * @parent ---商品---
 * @type item
 * @desc 如果类型为物品，则对应配置的物品id。
 * @default 0
 *
 * @param 商品类型-武器
 * @parent ---商品---
 * @type weapon
 * @desc 如果类型为武器，则对应配置的武器id。
 * @default 0
 *
 * @param 商品类型-护甲
 * @parent ---商品---
 * @type armor
 * @desc 如果类型为护甲，则对应配置的护甲id。
 * @default 0
 *
 * @param ---限量---
 * @default 
 * 
 * @param 商品是否限量
 * @parent ---限量---
 * @type boolean
 * @on 限量
 * @off 不限量
 * @desc true - 限量，false - 不限量
 * @default true
 *
 * @param 限量类型
 * @parent ---限量---
 * @type select
 * @option 背包限制
 * @value 背包限制
 * @option 库存限制
 * @value 库存限制
 * @desc 商品限制购买的类型。
 * @default 库存限制
 * 
 * @param 限制数量
 * @parent ---限量---
 * @type number
 * @min 1
 * @desc 指定商品的限制数量。
 * @default 5
 * 
 * @param 是否显示限制的最大值
 * @parent ---限量---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 最大值显示则为"1/5"，不显示则为"4"表示剩余数量。
 * @default true
 *
 * @param ---价格---
 * @default 
 * 
 * @param 商品是否指定价格
 * @parent ---价格---
 * @type boolean
 * @on 指定价格
 * @off 原价
 * @desc true - 指定价格，false - 原价
 * @default false
 * 
 * @param 指定价格
 * @parent ---价格---
 * @type number
 * @desc 指定该商品的价格。
 * @default 20
 *
 * @param ---多买涨价---
 * @default 
 * 
 * @param 商品是否多买涨价
 * @parent ---多买涨价---
 * @type boolean
 * @on 多买涨价
 * @off 不涨价
 * @desc true - 多买涨价，false - 不涨价
 * @default true
 * 
 * @param 价格倍率
 * @parent ---多买涨价---
 * @desc 商品每次购买后，价格的倍率。1.00表示购买后价格x1.00。
 * @default 1.00
 * 
 * @param 价格增量
 * @parent ---多买涨价---
 * @desc 商品每次购买后，价格的增量。也可以为负数，越买越便宜。
 * @default +50
 * 
 * @param 价格上限
 * @parent ---多买涨价---
 * @desc 该商品价格的价格上限。如果商品本身的价格比该值大，那么仍然使用该价格上限。
 * @default 999999999999999
 *
 * @param 涨价模式
 * @parent ---多买涨价---
 * @type select
 * @option 永久涨价
 * @value 永久涨价
 * @option 按背包数量涨价
 * @value 按背包数量涨价
 * @desc 比如限量10个，买了10个，用2个，再买第11个。永久涨价的价格是第11个的涨幅价格，按背包数量涨价则是第9个价格。
 * @default 永久涨价
 * 
 *
 */
/*~struct~DrillWindowMoving:
 *
 * @param 移动类型
 * @type select
 * @option 不移动
 * @value 不移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "1.系统 > 关于弹道.docx"。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param 起点-相对坐标 X
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param 起点-相对坐标 Y
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
/*~struct~DrillWindowBtnMoving:
 *
 * @param 移动类型
 * @type select
 * @option 瞬间移动
 * @value 瞬间移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "1.系统 > 关于弹道.docx"。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 */
/*~struct~DrillWindowLayout:
 *
 * @param 布局类型
 * @type select
 * @option 默认皮肤
 * @value 默认皮肤
 * @option 单张背景贴图
 * @value 单张背景贴图
 * @option 隐藏布局
 * @value 隐藏布局
 * @desc 窗口布局的类型。
 * @default 单张背景贴图
 *
 * @param ---单张背景贴图---
 * @default 
 *
 * @param 资源-贴图
 * @parent ---单张背景贴图---
 * @desc 窗口的背景贴图的资源。
 * @default 背景贴图
 * @require 1
 * @dir img/Menu__limitShop/
 * @type file
 *
 * @param 贴图位置修正 X
 * @parent ---单张背景贴图---
 * @desc 修正图片的位置用。以窗口的点为基准，负数向右，正数向左，单位像素。
 * @default 0
 *
 * @param 贴图位置修正 Y
 * @parent ---单张背景贴图---
 * @desc 修正图片的位置用。以窗口的点为基准，负数向上，正数向下，单位像素。
 * @default 0
 *
 */
/*~struct~DrillCursor:
 * 
 * @param 是否启用菜单指针
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，菜单指针可以指向你当前选中的项。需要Drill_MenuCursor插件支持。
 * @default true
 * 
 * @param 是否锁定菜单指针样式
 * @parent 是否启用菜单指针
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，窗口可以指定一个指针样式来装饰。需要Drill_MenuCursor插件支持。
 * @default false
 * 
 * @param 锁定的菜单指针样式
 * @parent 是否启用菜单指针
 * @type number
 * @min 1
 * @desc 锁定时，指定的指针样式id，具体见Drill_MenuCursor插件中对应的配置。
 * @default 1
 * 
 * @param 是否启用闪烁白矩形
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，你可以开关默认选项的白色闪烁矩形。需要Drill_MenuCursorBorder插件支持。
 * @default true
 * 
 * @param 是否启用菜单边框
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，菜单选项边框装饰当前选中的矩形项。需要Drill_MenuCursorBorder插件支持。
 * @default true
 * 
 * @param 是否锁定菜单边框样式
 * @parent 是否启用菜单边框
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，窗口可以指定一个选项边框样式来装饰。需要Drill_MenuCursorBorder插件支持。
 * @default false
 * 
 * @param 锁定的菜单边框样式
 * @parent 是否启用菜单边框
 * @type number
 * @min 1
 * @desc 锁定时，指定的矩形边框样式id，具体见Drill_MenuCursorBorder插件中对应的配置。
 * @default 1
 * 
 * @param 是否启用滚动条
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，你可以关闭装饰当前窗口的菜单滚动条。需要Drill_MenuScrollBar插件支持。
 * @default true
 * 
 * @param 是否锁定滚动条样式
 * @parent 是否启用滚动条
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，窗口可以指定一个滚动条样式来装饰。需要Drill_MenuScrollBar插件支持。
 * @default false
 * 
 * @param 锁定的滚动条样式
 * @parent 是否启用滚动条
 * @type number
 * @min 1
 * @desc 锁定时，指定的滚动条样式id，具体见Drill_MenuScrollBar插件中对应的配置。
 * @default 1
 *
 */
/*~struct~DrillSLSWaitress:
 * 
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的服务员==
 *
 * @param 服务员 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 550
 * 
 * @param 服务员 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 70
 *
 * @param 服务员移动动画
 * @type struct<DrillWindowMoving>
 * @desc 进入菜单时，服务员会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"50","移动延迟":"15","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"80","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param ---行为---
 * @default 
 *
 * @param 行为-默认
 * @parent ---行为---
 * @type struct<DrillSLSWaitressActDefault>
 * @desc 未发生任何情况时，服务员的动作。
 * @default {"资源-动作GIF":"[\"限量商店-服务员1_a\"]","帧间隔":"4","是否倒放":"false"}
 *
 * @param 行为-欢迎光临
 * @parent ---行为---
 * @desc 刚进入菜单时，服务员做出的动作。
 * @type struct<DrillSLSWaitressAct>
 * @default 
 * 
 * @param 行为-购买一个物品
 * @parent ---行为---
 * @desc 玩家购买了一个物品时，服务员做出的动作。
 * @type struct<DrillSLSWaitressAct>
 * @default 
 * 
 * @param 行为-余额不足
 * @parent ---行为---
 * @desc 玩家余额不足无法购买时，服务员做出的动作。
 * @type struct<DrillSLSWaitressAct>
 * @default 
 * 
 * @param 行为-库存不足
 * @parent ---行为---
 * @desc 库存限制的商品卖完时，服务员做出的动作。
 * @type struct<DrillSLSWaitressAct>
 * @default 
 * 
 * @param 行为-背包满了
 * @parent ---行为---
 * @desc 背包限制的商品卖满时，服务员做出的动作。
 * @type struct<DrillSLSWaitressAct>
 * @default 
 * 
 * @param 行为-库存全部卖完
 * @parent ---行为---
 * @desc 库存限制的全部商品卖完时，服务员做出的动作。
 * @type struct<DrillSLSWaitressAct>
 * @default 
 */
/*~struct~DrillSLSWaitressAct:
 * 
 * @param 是否启用该行为
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 动作持续时间
 * @type number
 * @min 1
 * @desc 服务员执行这个动作的持续时间。
 * @default 80
 * 
 * @param 动作延迟
 * @type number
 * @min 0
 * @desc 开始执行动作的额外延迟时间。（1秒60帧）
 * @default 0
 *
 * @param 资源-动作声音
 * @desc 服务员执行该动作发出的声音。
 * @default 
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param 资源-动作GIF
 * @desc 服务员动作的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default []
 * @require 1
 * @dir img/Menu__limitShop/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param GIF到末尾是否重播
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播
 * @default true
 * 
 */
/*~struct~DrillSLSWaitressActDefault:
 *
 * @param 资源-动作GIF
 * @desc 服务员的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default 
 * @require 1
 * @dir img/Menu__limitShop/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SLS（Scene_Limited_Shop）
//		临时全局变量	DrillUp.g_SLS_xxx
//		临时局部变量	this._drill_SLS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	在面板中记录
//		★性能测试消耗	4.92ms
//		★最坏情况		无
//		★备注			这个值不是很符合实际，这里应该把辅助核心的消耗加进来。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			限量商店：
//				->窗口
//					->商品窗口
//					->商品按钮组	x
//					->确认窗口
//					->帮助窗口
//					->金钱窗口
//				->服务员
//					->切换服务员
//					->欢迎光临
//					->购买一个物品
//					->余额不足
//					->库存不足
//					->背包满了
//					->玩家不买退出情况?
//					->买/卖的越多，服务员穿的越少?
//				->特殊
//					->库存控制
// 
//		★私有类如下：
//			* Drill_SLS_GoodsWindow【商品窗口】
//			* Drill_SLS_GoodsButtonWindow【商品按钮组】
//			* Drill_SLS_ConfirmWindow【确认窗口】
//			* Drill_SLS_GoldWindow【金钱窗口】
//			* Drill_SLS_WaitressSprite【服务员】
//
//		★必要注意事项：
//			1.注意，商品窗口的index和内容不一定完全匹配，多用index()函数。
//			  system的数据是【直接作为指针】放入窗口进行操作的，目前只有"limit_cur"被窗口赋值。
//			2.服务员的数据不是指针操作，通过拷贝隔离了数据。
//
//		★其它说明细节：
//			1.4个窗口基本结构直接使用辅助核心进行填入。该插件没有属性控制的多余操作。
//			  主要都是内容和流程。
//			2.商品窗口贴指定的商品序列，对照gamesystem数据进行刷新。
//			  帮助窗口链接了商品窗口，功能都是自带的。
//			  确认窗口固定只有两个按钮，且贴在底部。（注意open和close函数）
//			  金钱窗口只是单纯的绘制，流程中偶尔执行refresh。
//			3.服务员与窗口【完全独立】，只是流程中会插入一些动作: drill_COWS_playAct("")
//			4. 2020/3/22 
//				两个商店界面的整理，以及代码结构修改，花了整整9天的时间。
//				相当于平时2.5个星期的工作量。内容并不复杂，但就是太多了。
//				直接写定制代码大概需要3天，直接用插件定制商店需要花1天。
//				我的插件仅仅缩短了一般制作者2天的工作量。却花了9天来弥补，后期可能还需要更多维护。
//				可能，一个插件活着的意义就在于此吧。如果没有人去用它，那么它的生命也就失去了意义。
//			   2020/3/28
//				跑来把按钮组功能加上了，粗暴实现，没有对象化。
//				按钮的实现原理看文档就能明白，只是这里由于按钮应该是sprite还是window的问题纠结了很久。
//				文字滤镜和高级颜色必须要window才能实现，这种情况下，有点让人不安，毕竟窗口没有sprite那么灵活。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SceneLimitedShop = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneLimitedShop');


	//==============================
	// * 变量获取 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SLS_initMenuCursor = function( dataFrom ) {
		var data = {};
		//data['mog_enabled'] = String( dataFrom["是否启用mog菜单指针"] || "true") == "true";
		//data['mog_borderEnabled'] = String( dataFrom["是否启用mog菜单边框"] || "true") == "true";
		data['MCu_enabled'] = String( dataFrom["是否显示菜单指针"] || "true") == "true";
		data['MCu_lock'] = String( dataFrom["是否锁定菜单指针样式"] || "false") == "true";
		data['MCu_style'] = Number( dataFrom["锁定的菜单指针样式"] || 1);
		data['MCB_rectEnabled'] = String( dataFrom["是否启用闪烁白矩形"] || "true") == "true";
		data['MCB_enabled'] = String( dataFrom["是否启用菜单边框"] || "true") == "true";
		data['MCB_lock'] = String( dataFrom["是否锁定菜单边框样式"] || "false") == "true";
		data['MCB_style'] = Number( dataFrom["锁定的菜单边框样式"] || 1);
		data['MSB_enabled'] = String( dataFrom["是否启用滚动条"] || "true") == "true";
		data['MSB_lock'] = String( dataFrom["是否锁定滚动条样式"] || "false") == "true";
		data['MSB_style'] = Number( dataFrom["锁定的滚动条样式"] || 1);
		return data;
	}
	
    DrillUp.g_SLS_layout = String(DrillUp.parameters['资源-整体布局'] || "");
	
	/*-----------------商品窗口参数------------------*/
	DrillUp.g_SLS_goodsWin_x = Number(DrillUp.parameters['商品窗口 X'] || 130);
	DrillUp.g_SLS_goodsWin_y = Number(DrillUp.parameters['商品窗口 Y'] || 75);
	DrillUp.g_SLS_goodsWin_width = Number(DrillUp.parameters['商品窗口宽度'] || 430);
	DrillUp.g_SLS_goodsWin_height = Number(DrillUp.parameters['商品窗口高度'] || 435);
	DrillUp.g_SLS_goodsWin_col = Number(DrillUp.parameters['商品窗口列数'] || 1);
	DrillUp.g_SLS_goodsWin_fontsize = Number(DrillUp.parameters['商品窗口字体大小'] || 22);
	DrillUp.g_SLS_goodsWin_lineHeight = Number(DrillUp.parameters['商品窗口行高'] || 64);
	if( DrillUp.parameters['商品窗口移动动画'] != "" &&
		DrillUp.parameters['商品窗口移动动画'] != undefined ){
		DrillUp.g_SLS_goodsWin_slideAnim = JSON.parse( DrillUp.parameters['商品窗口移动动画'] );
		DrillUp.g_SLS_goodsWin_slideAnim['slideMoveType'] = String(DrillUp.g_SLS_goodsWin_slideAnim['移动类型'] || "弹性移动");
		DrillUp.g_SLS_goodsWin_slideAnim['slideTime'] = Number(DrillUp.g_SLS_goodsWin_slideAnim['移动时长'] || 30);
		DrillUp.g_SLS_goodsWin_slideAnim['slideDelay'] = Number(DrillUp.g_SLS_goodsWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SLS_goodsWin_slideAnim['slidePosType'] = String(DrillUp.g_SLS_goodsWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SLS_goodsWin_slideAnim['slideX'] = Number(DrillUp.g_SLS_goodsWin_slideAnim['起点-相对坐标 X'] || 0);
		DrillUp.g_SLS_goodsWin_slideAnim['slideY'] = Number(DrillUp.g_SLS_goodsWin_slideAnim['起点-相对坐标 Y'] || 50);
		DrillUp.g_SLS_goodsWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SLS_goodsWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SLS_goodsWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SLS_goodsWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SLS_goodsWin_slideAnim = {};
	}
	if( DrillUp.parameters['商品窗口布局'] != "" &&
		DrillUp.parameters['商品窗口布局'] != undefined ){
		DrillUp.g_SLS_goodsWin_layout = JSON.parse( DrillUp.parameters['商品窗口布局'] );
		DrillUp.g_SLS_goodsWin_layout['layoutType'] = String(DrillUp.g_SLS_goodsWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SLS_goodsWin_layout['layoutSrc'] = String(DrillUp.g_SLS_goodsWin_layout['资源-贴图'] || "");
		DrillUp.g_SLS_goodsWin_layout['layoutSrcFile'] = "img/Menu__limitShop/";
		DrillUp.g_SLS_goodsWin_layout['layoutX'] = Number(DrillUp.g_SLS_goodsWin_layout['贴图位置修正 X'] || 0);
		DrillUp.g_SLS_goodsWin_layout['layoutY'] = Number(DrillUp.g_SLS_goodsWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SLS_goodsWin_layout = {};
	}
	if( DrillUp.parameters['商品窗口指针与边框'] != "" && 
		DrillUp.parameters['商品窗口指针与边框'] != undefined ){
		var cursor = JSON.parse( DrillUp.parameters['商品窗口指针与边框'] );
		DrillUp.g_SLS_goodsWin_cursor = DrillUp.drill_SLS_initMenuCursor( cursor );
	}else{
		DrillUp.g_SLS_goodsWin_cursor = null;
	}
	
	/*-----------------商品按钮组参数------------------*/
	DrillUp.g_SLS_goodsBtn_width = Number(DrillUp.parameters['按钮宽度'] || 430);
	DrillUp.g_SLS_goodsBtn_height = Number(DrillUp.parameters['按钮高度'] || 64);
	DrillUp.g_SLS_goodsBtn_fontsize = Number(DrillUp.parameters['按钮字体大小'] || 22);
	DrillUp.g_SLS_goodsBtn_keyReverse = String(DrillUp.parameters['键盘按键是否反向'] || "true") === "true";
	DrillUp.g_SLS_goodsBtn_upPoint = String(DrillUp.parameters['上限隐藏点'] || "(0,0)");
	DrillUp.g_SLS_goodsBtn_centerPoints = String(DrillUp.parameters['中间序列点列表'] || "(0,0)");
	DrillUp.g_SLS_goodsBtn_downPoint = String(DrillUp.parameters['下限隐藏点'] || "(0,0)");
	DrillUp.g_SLS_goodsBtn_availableIndex = Number(DrillUp.parameters['有效点'] || 1);
	DrillUp.g_SLS_goodsBtn_btnActived = String(DrillUp.parameters['资源-激活的按钮'] || "");
	DrillUp.g_SLS_goodsBtn_btnDeactived = String(DrillUp.parameters['资源-未激活的按钮'] || "");
	if( DrillUp.parameters['按钮移动动画'] != "" &&
		DrillUp.parameters['按钮移动动画'] != undefined ){
		DrillUp.g_SLS_goodsBtn_slideAnim = JSON.parse( DrillUp.parameters['按钮移动动画'] );
		DrillUp.g_SLS_goodsBtn_slideAnim['slideMoveType'] = String(DrillUp.g_SLS_goodsBtn_slideAnim['移动类型'] || "弹性移动");
		DrillUp.g_SLS_goodsBtn_slideAnim['slideTime'] = Number(DrillUp.g_SLS_goodsBtn_slideAnim['移动时长'] || 30);
		DrillUp.g_SLS_goodsBtn_slideAnim['slideDelay'] = Number(DrillUp.g_SLS_goodsBtn_slideAnim['移动延迟'] || 0);
		//DrillUp.g_SLS_goodsBtn_slideAnim['slidePosType'] = String(DrillUp.g_SLS_goodsBtn_slideAnim['坐标类型'] || "相对坐标");
		//DrillUp.g_SLS_goodsBtn_slideAnim['slideX'] = Number(DrillUp.g_SLS_goodsBtn_slideAnim['起点-相对坐标 X'] || 0);
		//DrillUp.g_SLS_goodsBtn_slideAnim['slideY'] = Number(DrillUp.g_SLS_goodsBtn_slideAnim['起点-相对坐标 Y'] || 50);
		//DrillUp.g_SLS_goodsBtn_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SLS_goodsBtn_slideAnim['起点-绝对坐标 X'] || 0);
		//DrillUp.g_SLS_goodsBtn_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SLS_goodsBtn_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SLS_goodsBtn_slideAnim = {};
	}
	
	
	/*-----------------确认窗口参数------------------*/
	DrillUp.g_SLS_confirmWin_x = Number(DrillUp.parameters['确认窗口 X'] || 180);
	DrillUp.g_SLS_confirmWin_y = Number(DrillUp.parameters['确认窗口 Y'] || 230);
	DrillUp.g_SLS_confirmWin_width = Number(DrillUp.parameters['确认窗口宽度'] || 450);
	DrillUp.g_SLS_confirmWin_height = Number(DrillUp.parameters['确认窗口高度'] || 130);
	DrillUp.g_SLS_confirmWin_fontsize = Number(DrillUp.parameters['确认窗口字体大小'] || 22);
	var temp = String(DrillUp.parameters['用语-购买询问'] || "\"是否花费<商品价格>\\G购买此商品？\"");
	temp = temp.substring(1,temp.length-1);
	temp = temp.replace(/\\\\/g,"\\");
	temp = temp.split(/\\n/);
	DrillUp.g_SLS_confirmWin_question = temp;
	DrillUp.g_SLS_confirmWin_ok = String(DrillUp.parameters['用语-确认购买'] || "是的！");
	DrillUp.g_SLS_confirmWin_cancel = String(DrillUp.parameters['用语-取消购买'] || "不对！不对！");
	if( DrillUp.parameters['确认窗口移动动画'] != "" &&
		DrillUp.parameters['确认窗口移动动画'] != undefined ){
		DrillUp.g_SLS_confirmWin_slideAnim = JSON.parse( DrillUp.parameters['确认窗口移动动画'] );
		DrillUp.g_SLS_confirmWin_slideAnim['slideMoveType'] = String(DrillUp.g_SLS_confirmWin_slideAnim['移动类型'] || "弹性移动");
		DrillUp.g_SLS_confirmWin_slideAnim['slideTime'] = Number(DrillUp.g_SLS_confirmWin_slideAnim['移动时长'] || 15);
		DrillUp.g_SLS_confirmWin_slideAnim['slideDelay'] = Number(DrillUp.g_SLS_confirmWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SLS_confirmWin_slideAnim['slidePosType'] = String(DrillUp.g_SLS_confirmWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SLS_confirmWin_slideAnim['slideX'] = Number(DrillUp.g_SLS_confirmWin_slideAnim['起点-相对坐标 X'] || 0);
		DrillUp.g_SLS_confirmWin_slideAnim['slideY'] = Number(DrillUp.g_SLS_confirmWin_slideAnim['起点-相对坐标 Y'] || 100);
		DrillUp.g_SLS_confirmWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SLS_confirmWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SLS_confirmWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SLS_confirmWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SLS_confirmWin_slideAnim = {};
	}
	if( DrillUp.parameters['确认窗口布局'] != "" &&
		DrillUp.parameters['确认窗口布局'] != undefined ){
		DrillUp.g_SLS_confirmWin_layout = JSON.parse( DrillUp.parameters['确认窗口布局'] );
		DrillUp.g_SLS_confirmWin_layout['layoutType'] = String(DrillUp.g_SLS_confirmWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SLS_confirmWin_layout['layoutSrc'] = String(DrillUp.g_SLS_confirmWin_layout['资源-贴图'] || "");
		DrillUp.g_SLS_confirmWin_layout['layoutSrcFile'] = "img/Menu__limitShop/";
		DrillUp.g_SLS_confirmWin_layout['layoutX'] = Number(DrillUp.g_SLS_confirmWin_layout['贴图位置修正 X'] || 0);
		DrillUp.g_SLS_confirmWin_layout['layoutY'] = Number(DrillUp.g_SLS_confirmWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SLS_confirmWin_layout = {};
	}
	if( DrillUp.parameters['确认窗口指针与边框'] != "" && 
		DrillUp.parameters['确认窗口指针与边框'] != undefined ){
		var cursor = JSON.parse( DrillUp.parameters['确认窗口指针与边框'] );
		DrillUp.g_SLS_confirmWin_cursor = DrillUp.drill_SLS_initMenuCursor( cursor );
	}else{
		DrillUp.g_SLS_confirmWin_cursor = null;
	}
	
	/*-----------------帮助窗口参数------------------*/
	DrillUp.g_SLS_helpWin_x = Number(DrillUp.parameters['帮助窗口 X'] || 80);
	DrillUp.g_SLS_helpWin_y = Number(DrillUp.parameters['帮助窗口 Y'] || 500);
	DrillUp.g_SLS_helpWin_width = Number(DrillUp.parameters['帮助窗口宽度'] || 540);
	DrillUp.g_SLS_helpWin_height = Number(DrillUp.parameters['帮助窗口高度'] || 120);
	DrillUp.g_SLS_helpWin_fontsize = Number(DrillUp.parameters['帮助窗口字体大小'] || 22);
	if( DrillUp.parameters['帮助窗口移动动画'] != "" &&
		DrillUp.parameters['帮助窗口移动动画'] != undefined ){
		DrillUp.g_SLS_helpWin_slideAnim = JSON.parse( DrillUp.parameters['帮助窗口移动动画'] );
		DrillUp.g_SLS_helpWin_slideAnim['slideMoveType'] = String(DrillUp.g_SLS_helpWin_slideAnim['移动类型'] || "弹性移动");
		DrillUp.g_SLS_helpWin_slideAnim['slideTime'] = Number(DrillUp.g_SLS_helpWin_slideAnim['移动时长'] || 40);
		DrillUp.g_SLS_helpWin_slideAnim['slideDelay'] = Number(DrillUp.g_SLS_helpWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SLS_helpWin_slideAnim['slidePosType'] = String(DrillUp.g_SLS_helpWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SLS_helpWin_slideAnim['slideX'] = Number(DrillUp.g_SLS_helpWin_slideAnim['起点-相对坐标 X'] || 0);
		DrillUp.g_SLS_helpWin_slideAnim['slideY'] = Number(DrillUp.g_SLS_helpWin_slideAnim['起点-相对坐标 Y'] || 80);
		DrillUp.g_SLS_helpWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SLS_helpWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SLS_helpWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SLS_helpWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SLS_helpWin_slideAnim = {};
	}
	if( DrillUp.parameters['帮助窗口布局'] != "" &&
		DrillUp.parameters['帮助窗口布局'] != undefined ){
		DrillUp.g_SLS_helpWin_layout = JSON.parse( DrillUp.parameters['帮助窗口布局'] );
		DrillUp.g_SLS_helpWin_layout['layoutType'] = String(DrillUp.g_SLS_helpWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SLS_helpWin_layout['layoutSrc'] = String(DrillUp.g_SLS_helpWin_layout['资源-贴图'] || "");
		DrillUp.g_SLS_helpWin_layout['layoutSrcFile'] = "img/Menu__limitShop/";
		DrillUp.g_SLS_helpWin_layout['layoutX'] = Number(DrillUp.g_SLS_helpWin_layout['贴图位置修正 X'] || 0);
		DrillUp.g_SLS_helpWin_layout['layoutY'] = Number(DrillUp.g_SLS_helpWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SLS_helpWin_layout = {};
	}
	
	/*-----------------金钱窗口参数------------------*/
	DrillUp.g_SLS_goldWin_x = Number(DrillUp.parameters['金钱窗口 X'] || 590);
	DrillUp.g_SLS_goldWin_y = Number(DrillUp.parameters['金钱窗口 Y'] || 40);
	DrillUp.g_SLS_goldWin_width = Number(DrillUp.parameters['金钱窗口宽度'] || 210);
	DrillUp.g_SLS_goldWin_height = Number(DrillUp.parameters['金钱窗口高度'] || 80);
	DrillUp.g_SLS_goldWin_fontsize = Number(DrillUp.parameters['金钱窗口字体大小'] || 22);
	if( DrillUp.parameters['金钱窗口移动动画'] != "" &&
		DrillUp.parameters['金钱窗口移动动画'] != undefined ){
		DrillUp.g_SLS_goldWin_slideAnim = JSON.parse( DrillUp.parameters['金钱窗口移动动画'] );
		DrillUp.g_SLS_goldWin_slideAnim['slideMoveType'] = String(DrillUp.g_SLS_goldWin_slideAnim['移动类型'] || "弹性移动");
		DrillUp.g_SLS_goldWin_slideAnim['slideTime'] = Number(DrillUp.g_SLS_goldWin_slideAnim['移动时长'] || 60);
		DrillUp.g_SLS_goldWin_slideAnim['slideDelay'] = Number(DrillUp.g_SLS_goldWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SLS_goldWin_slideAnim['slidePosType'] = String(DrillUp.g_SLS_goldWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SLS_goldWin_slideAnim['slideX'] = Number(DrillUp.g_SLS_goldWin_slideAnim['起点-相对坐标 X'] || 0);
		DrillUp.g_SLS_goldWin_slideAnim['slideY'] = Number(DrillUp.g_SLS_goldWin_slideAnim['起点-相对坐标 Y'] || -80);
		DrillUp.g_SLS_goldWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SLS_goldWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SLS_goldWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SLS_goldWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SLS_goldWin_slideAnim = {};
	}
	if( DrillUp.parameters['金钱窗口布局'] != "" &&
		DrillUp.parameters['金钱窗口布局'] != undefined ){
		DrillUp.g_SLS_goldWin_layout = JSON.parse( DrillUp.parameters['金钱窗口布局'] );
		DrillUp.g_SLS_goldWin_layout['layoutType'] = String(DrillUp.g_SLS_goldWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SLS_goldWin_layout['layoutSrc'] = String(DrillUp.g_SLS_goldWin_layout['资源-贴图'] || "");
		DrillUp.g_SLS_goldWin_layout['layoutSrcFile'] = "img/Menu__limitShop/";
		DrillUp.g_SLS_goldWin_layout['layoutX'] = Number(DrillUp.g_SLS_goldWin_layout['贴图位置修正 X'] || 0);
		DrillUp.g_SLS_goldWin_layout['layoutY'] = Number(DrillUp.g_SLS_goldWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SLS_goldWin_layout = {};
	}
	
	
	//==============================
	// * 变量获取 - 限量商店
	//				（~struct~DrillSLSshop）
	//==============================
	DrillUp.drill_SLS_initShopData = function( dataFrom ) {
		var data = {};
		// > 商店
		data['autoHide'] = String( dataFrom['卖完后是否隐藏商品'] || "false") == "true" ;
		data['waitress_id'] = Number( dataFrom['商店服务员'] || 0);
		data['shopMode'] = String( dataFrom['商品陈列模式'] || "按钮组模式") ;
		
		data['list'] = [];
		if( dataFrom['商品列表'] != "" &&
			dataFrom['商品列表'] != undefined ){
			data['list_params'] = JSON.parse( dataFrom['商品列表'] );
		}else{
			data['list_params'] = [];
		}
		for( var j=0; j < data['list_params'].length; j++ ){
			var goods_params = data['list_params'][j];
			goods_params = JSON.parse( goods_params );
			var goods = {};
			// > 商品
			goods['type'] = String(goods_params['商品类型'] || "物品");
			goods['item_id'] = Number(goods_params['商品类型-物品'] || 0);
			goods['weapon_id'] = Number(goods_params['商品类型-武器'] || 0);
			goods['armor_id'] = Number(goods_params['商品类型-护甲'] || 0);
			goods['limit_enable'] = String(goods_params['商品是否限量'] || "true") == "true" ;
			goods['limit_type'] = String(goods_params['限量类型'] || "库存限制");
			goods['limit_num'] = Number(goods_params['限制数量'] || 5);
			goods['limit_cur'] = 0;			//库存初始化
			goods['limit_showMax'] = String(goods_params['是否显示限制的最大值'] || "true") == "true" ;
			goods['inc_lock'] = String(goods_params['商品是否指定价格'] || "false") == "true" ;
			goods['inc_locknum'] = Number(goods_params['指定价格'] || 50);
			goods['inc_enable'] = String(goods_params['商品是否多买涨价'] || "true") == "true" ;
			goods['inc_power'] = Number(goods_params['价格倍率'] || 1.00);
			goods['inc_add'] = Number(goods_params['价格增量'] || 50);
			goods['inc_upper'] = Number(goods_params['价格上限'] || 999999999999999);
			goods['inc_type'] = String(goods_params['涨价模式'] || "永久涨价");
			
			data['list'].push(goods);
		}
		return data;
	}
	
	/*-----------------商店数据参数------------------*/
	DrillUp.g_SLS_shop_list_length = 30;
	DrillUp.g_SLS_shop_list = [];
	for( var i = 0; i < DrillUp.g_SLS_shop_list_length ; i++ ){
		if( DrillUp.parameters['限量商店-' + String(i+1) ] != "" &&
			DrillUp.parameters['限量商店-' + String(i+1) ] != undefined ){
			var shop_params = JSON.parse(DrillUp.parameters['限量商店-' + String(i+1)] );
			DrillUp.g_SLS_shop_list[i] = DrillUp.drill_SLS_initShopData( shop_params );
		}else{
			DrillUp.g_SLS_shop_list[i] = null;
		}
	};
	
	//==============================
	// * 变量获取 - 服务员行为
	//				（~struct~DrillSLSWaitressAct）
	//==============================
	DrillUp.drill_SLS_convertWaitressAct = function( dataFrom ) {		//服务员行为数据转换
		var data = {};
		data['enable'] = String(dataFrom['是否启用该行为'] || "false") == "true" ;
		data['sustain'] = Number(dataFrom['动作持续时间'] || 60);
		data['delay'] = Number(dataFrom['动作延迟'] || 0);
		data['se'] = String(dataFrom['资源-动作声音'] || "");
		data['gif_src'] = JSON.parse( dataFrom['资源-动作GIF'] || []);
		data['gif_src_file'] = "img/Menu__limitShop/";
		data['gif_interval'] = Number(dataFrom['帧间隔'] || 4);
		data['gif_back_run'] = String(dataFrom['是否倒放'] || "false") == "true" ;
		data['gif_replay'] = String(dataFrom['GIF到末尾是否重播'] || "true") == "true" ;
		return data;
	}
	//==============================
	// * 变量获取 - 服务员
	//				（~struct~DrillSShWaitress）
	//==============================
	DrillUp.drill_SLS_convertWaitress = function( dataFrom ) {
		var waitress = {}
		waitress['x'] = Number(dataFrom['服务员 X'] || 580);
		waitress['y'] = Number(dataFrom['服务员 Y'] || 200);
		if( dataFrom['服务员移动动画'] != "" && 
			dataFrom['服务员移动动画'] != undefined ){
			var waitress_slide = JSON.parse( dataFrom['服务员移动动画'] );
			waitress['slideMoveType'] = String(waitress_slide['移动类型'] || "匀速移动");
			waitress['slideTime'] = Number(waitress_slide['移动时长'] || 20);
			waitress['slideDelay'] = Number(waitress_slide['移动延迟'] || 0);
			waitress['slidePosType'] = String(waitress_slide['坐标类型'] || "相对坐标");
			waitress['slideX'] = Number(waitress_slide['起点-相对坐标 X'] || -100);
			waitress['slideY'] = Number(waitress_slide['起点-相对坐标 Y'] || 0);
			waitress['slideAbsoluteX'] = Number(waitress_slide['起点-绝对坐标 X'] || 0);
			waitress['slideAbsoluteY'] = Number(waitress_slide['起点-绝对坐标 Y'] || 0);
		}
		if( dataFrom['行为-默认'] != "" && 
			dataFrom['行为-默认'] != undefined ){
			var act_default = JSON.parse( dataFrom['行为-默认'] || {} );
			act_default['gif_src'] = JSON.parse( act_default['资源-动作GIF'] || []);
			act_default['gif_src_file'] = "img/Menu__limitShop/";
			act_default['gif_interval'] = Number(act_default['帧间隔'] || 4);
			act_default['gif_back_run'] = String(act_default['是否倒放'] || "false") == "true" ;
			waitress['act-default'] = act_default;
		}else{
			waitress['act-default'] = {};
		}
		if( dataFrom['行为-欢迎光临'] != "" && 
			dataFrom['行为-欢迎光临'] != undefined ){
			var act = JSON.parse( dataFrom['行为-欢迎光临'] || {} );
			waitress['act-welcome'] = DrillUp.drill_SLS_convertWaitressAct( act );
		}else{
			waitress['act-welcome'] = {};
		}
		if( dataFrom['行为-购买一个物品'] != "" && 
			dataFrom['行为-购买一个物品'] != undefined ){
			var act = JSON.parse( dataFrom['行为-购买一个物品'] || {} );
			waitress['act-buyOne'] = DrillUp.drill_SLS_convertWaitressAct( act );
		}else{
			waitress['act-buyOne'] = {};
		}
		if( dataFrom['行为-余额不足'] != "" && 
			dataFrom['行为-余额不足'] != undefined ){
			var act = JSON.parse( dataFrom['行为-余额不足'] || {} );
			waitress['act-goldNotEnough'] = DrillUp.drill_SLS_convertWaitressAct( act );
		}else{
			waitress['act-goldNotEnough'] = {};
		}
		if( dataFrom['行为-库存不足'] != "" && 
			dataFrom['行为-库存不足'] != undefined ){
			var act = JSON.parse( dataFrom['行为-库存不足'] || {} );
			waitress['act-storeNotEnough'] = DrillUp.drill_SLS_convertWaitressAct( act );
		}else{
			waitress['act-storeNotEnough'] = {};
		}
		if( dataFrom['行为-背包满了'] != "" && 
			dataFrom['行为-背包满了'] != undefined ){
			var act = JSON.parse( dataFrom['行为-背包满了'] || {} );
			waitress['act-inventoryIsFull'] = DrillUp.drill_SLS_convertWaitressAct( act );
		}else{
			waitress['act-inventoryIsFull'] = {};
		}
		if( dataFrom['行为-库存全部卖完'] != "" && 
			dataFrom['行为-库存全部卖完'] != undefined ){
			var act = JSON.parse( dataFrom['行为-库存全部卖完'] || {} );
			waitress['act-allSoldOut'] = DrillUp.drill_SLS_convertWaitressAct( act );
		}else{
			waitress['act-allSoldOut'] = {};
		}
		return waitress;
	}
	
	/*-----------------服务员参数------------------*/
	DrillUp.g_SLS_waitress_list_length = 30;
	DrillUp.g_SLS_waitress_list = [];
	for (var i = 0; i < DrillUp.g_SLS_waitress_list_length ; i++ ) {
		if( DrillUp.parameters['服务员-' + String(i+1) ] != "" &&
			DrillUp.parameters['服务员-' + String(i+1) ] != undefined ){
			var waitress_params = JSON.parse(DrillUp.parameters['服务员-' + String(i+1)] );
			DrillUp.g_SLS_waitress_list[i] = DrillUp.drill_SLS_convertWaitress( waitress_params );
		}else{
			DrillUp.g_SLS_waitress_list[i] = null;
		}
	};
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary && 
	Imported.Drill_CoreOfWaitressSprite ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuLimitShop = function(filename) {
    return this.loadBitmap('img/Menu__limitShop/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_SLS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SLS_pluginCommand.call(this, command, args);
	if( command === ">限量商店" ){
		
		/*-----------------打开------------------*/
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "打开" ){			//打开
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) - 1;
				$gameSystem._drill_SLS_shopIndex = temp1;
				SceneManager.push(Scene_Drill_SLS);
			}
		}
		
		/*-----------------添加上限------------------*/
		if(args.length == 8){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "添加上限" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) - 1;
				temp2 = temp2.replace("商品[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2) - 1;
				temp3 = temp3.replace("数量[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				var shop_item = $gameSystem.drill_SLS_getShopItemData_WithCheck( temp1, temp2 );
				if( shop_item != null ){
					shop_item['limit_num'] += temp3;
					if( shop_item['limit_num'] < 0 ){
						shop_item['limit_num'] = 0;
					}
				}
			}
		}
		
		/*-----------------库存信息获取------------------*/
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "全部商品是否卖完" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) - 1;
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var b = $gameSystem.drill_SLS_isAllSoldOut( temp1 );
				$gameSwitches.setValue( temp2, b );
			}
		}
		if(args.length == 8){		//（这里没加 库存限制/背包限制 类型的识别）
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "是否卖完" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) - 1;
				temp2 = temp2.replace("商品[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2) - 1;
				temp3 = temp3.replace("开关[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				var shop_item = $gameSystem.drill_SLS_getShopItemData_WithCheck( temp1, temp2 );
				if( shop_item != null ){
					var b = (shop_item['limit_cur'] >= shop_item['limit_num']);
					$gameSwitches.setValue( temp3, b );
				}
			}
			if( type == "获取剩余库存" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) - 1;
				temp2 = temp2.replace("商品[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2) - 1;
				temp3 = temp3.replace("变量[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				var shop_item = $gameSystem.drill_SLS_getShopItemData_WithCheck( temp1, temp2 );
				if( shop_item != null ){
					$gameVariables.setValue( temp3, shop_item['limit_num']-shop_item['limit_cur'] );
				}
			}
			if( type == "获取库存限制量" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) - 1;
				temp2 = temp2.replace("商品[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2) - 1;
				temp3 = temp3.replace("变量[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				var shop_item = $gameSystem.drill_SLS_getShopItemData_WithCheck( temp1, temp2 );
				if( shop_item != null ){
					$gameVariables.setValue( temp3, shop_item['limit_num'] );
				}
			}
		}
		
		
		/*-----------------服务员------------------*/
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "切换服务员" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Math.max( Number(temp1) - 1, 0 );
				var shopData = $gameSystem._drill_SLS_shopDataList[ temp1 ];
				if( shopData == undefined ){
					alert(
						"【Drill_SceneLimitedShop.js 面板 - 限量商店】\n"+
						"错误，限量商店[" + (temp1+1) + "]的数据不存在。"
					);
					return;
				}
				shopData['waitress_id'] = Math.max( Number(temp2), 1 );
			}
		}
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "隐藏服务员" ){
				temp1 = temp1.replace("限量商店[","");
				temp1 = temp1.replace("]","");
				temp1 = Math.max( Number(temp1) - 1, 0 );
				var shopData = $gameSystem._drill_SLS_shopDataList[ temp1 ];
				if( shopData == undefined ){
					alert(
						"【Drill_SceneLimitedShop.js 面板 - 限量商店】\n"+
						"错误，限量商店[" + (temp1+1) + "]的数据不存在。"
					);
					return;
				}
				shopData['waitress_id'] = 0;
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SLS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SLS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SLS_sys_initialize.call(this);
	this.drill_SLS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SLS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SLS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SLS_saveEnabled == true ){	
		$gameSystem.drill_SLS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SLS_initSysData();
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
Game_System.prototype.drill_SLS_initSysData = function() {
	this.drill_SLS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SLS_checkSysData = function() {
	this.drill_SLS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SLS_initSysData_Private = function() {
	
	this._drill_SLS_shopIndex = 0;					//商店索引
	this._drill_SLS_shopDataList = [];				//商店数据
	for(var i = 0; i < DrillUp.g_SLS_shop_list.length; i++){
		var temp_data = DrillUp.g_SLS_shop_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SLS_shopDataList[i] = JSON.parse(JSON.stringify( temp_data ));
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SLS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SLS_shopDataList == undefined ){
		this.drill_SLS_initSysData();
		return;
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_SLS_shop_list.length; i++ ){
		var temp_data = DrillUp.g_SLS_shop_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SLS_shopDataList[i] == undefined ){
				this._drill_SLS_shopDataList[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
}
//==============================
// * 存储数据 - 获取商店数据
//==============================
Game_System.prototype.drill_SLS_getShopData = function( shop_index ){
	return this._drill_SLS_shopDataList[ shop_index ];
};
//==============================
// * 存储数据 - 获取商品数据
//==============================
Game_System.prototype.drill_SLS_getShopItemData = function( shop_index, item_index ){
	var shop = this._drill_SLS_shopDataList[ shop_index ];
	if( shop == undefined ){ return null; };
	if( shop['list'].length == 0 ){ return null; };
	return shop['list'][ item_index ];
};
//==============================
// * 存储数据 - 获取商品数据（含校验）
//==============================
Game_System.prototype.drill_SLS_getShopItemData_WithCheck = function( shop_index, item_index ){
	var data = this.drill_SLS_getShopItemData( shop_index, item_index );
	if( data == null ){
		alert( "【Drill_SceneLimitedShop.js 面板 - 限量商店】\n" +
				"插件指令错误，限量商店[" + String(shop_index+1) + "]不存在id为" +String(item_index+1)+ "的商品。");
		return null;
	}
	return data;
};
//==============================
// * 存储数据 - 指定商品是否卖完
//==============================
Game_System.prototype.drill_SLS_isItemSoldOut = function( shop_index, item_index ){
	var shop_item = this.drill_SLS_getShopItemData( shop_index, item_index );
	if( shop_item == undefined ){ return true; };	//（未定义的商店，算卖完了）
	return shop_item['limit_cur'] >= shop_item['limit_num'];
}
//==============================
// * 存储数据 - 是否全部卖完
//==============================
Game_System.prototype.drill_SLS_isAllSoldOut = function( shop_index ){
	var shop = this._drill_SLS_shopDataList[ shop_index ];
	if( shop == undefined ){ return true; };
	for(var i=0; i < shop['list'].length; i++ ){
		var b = this.drill_SLS_isItemSoldOut( shop_index, i );
		if( b == false ){
			return false;
		}
	}
	return true;
}

//=============================================================================
// * 临时数据
//=============================================================================
var _drill_SLS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_SLS_temp_initialize.call(this);
	this._drill_SLS_visibleList = [];			//可见的列表
};


//=============================================================================
// ** 限量商店【Scene_Drill_SLS】
//
//=============================================================================
//==============================
// * 限量商店 - 定义
//==============================
function Scene_Drill_SLS() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SLS.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SLS.prototype.constructor = Scene_Drill_SLS;
//==============================
// * 限量商店 - 初始化
//==============================
Scene_Drill_SLS.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	
	this._drill_shopIndex = $gameSystem._drill_SLS_shopIndex;
	this._drill_shopData = $gameSystem._drill_SLS_shopDataList[ this._drill_shopIndex ];
	this._drill_curBtnIndex = 0;
};
//==============================
// * 限量商店 - 创建
//==============================
Scene_Drill_SLS.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._drill_SLS_field = new Sprite();
	this.addChild(this._drill_SLS_field);	//布局（先画，其图层都被放在后面）
	
	this.createLayout();					//整体布局
	this.createHelpWindow();				//帮助窗口
	this.createGoldWindow();				//金钱窗口
	this.createGoodsWindow();				//商品窗口
	this.createGoodsBtn();					//商品按钮组
	this.createConfirmWindow();				//确认窗口
	this.createWaitress();					//服务员
};
//==============================
// * 限量商店 - 帧刷新
//==============================
Scene_Drill_SLS.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	this._window_goods.drill_COWA_CPD_update();			//商品窗口
	this._window_help.drill_COWA_CPD_update();			//帮助窗口
	this._window_gold.drill_COWA_CPD_update();			//金钱窗口
	this._window_confirm.drill_COWA_CPD_update();		//确认窗口
	
	
	if( this._drill_shopData['shopMode'] == "按钮组模式" ){
		for( var i=0; i < this._drill_btns.length; i++ ){	//商品按钮组
			this._drill_btns[i].drill_COWA_SBM_update();
		}
		this._window_goods.y = Graphics.boxHeight + 1000;
	}
	
	this.drill_updateIndex();							//商品选项侦听
	this.drill_updateButtonTouch();						//按钮监听
}

//==============================
// * 创建 - 整体布局
//==============================
Scene_Drill_SLS.prototype.createLayout = function() {
	this._drill_SLS_layout = new Sprite(ImageManager.load_MenuLimitShop(DrillUp.g_SLS_layout));
	this._drill_SLS_field.addChild(this._drill_SLS_layout);	
};
//==============================
// * 创建 - 商品窗口
//==============================
Scene_Drill_SLS.prototype.createGoodsWindow = function() {
	var shop = this._drill_shopData;
	var data = {
		"x": DrillUp.g_SLS_goodsWin_x,
		"y": DrillUp.g_SLS_goodsWin_y,
		"width": DrillUp.g_SLS_goodsWin_width,
		"height": DrillUp.g_SLS_goodsWin_height,
		"fontsize": DrillUp.g_SLS_goodsWin_fontsize,
		
		"slideMoveType": DrillUp.g_SLS_goodsWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SLS_goodsWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SLS_goodsWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SLS_goodsWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SLS_goodsWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SLS_goodsWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SLS_goodsWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SLS_goodsWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SLS_goodsWin_layout['layoutType'],
		"layoutX": DrillUp.g_SLS_goodsWin_layout['layoutX'],
		"layoutY": DrillUp.g_SLS_goodsWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SLS_goodsWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SLS_goodsWin_layout['layoutSrcFile'],
	}
	this._window_goods = new Drill_SLS_GoodsWindow(0, 0, 0, 0, this._drill_shopData);
	this._window_goods.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._window_goods.refresh();
	this._window_goods.initSelect();
	
	this._window_goods.setHandler('ok',   this.drill_SLS_chooseAItem.bind(this));	//流程 - 选择一个商品
	this._window_goods.setHandler('cancel',   this.popScene.bind(this));			//流程 - 退出界面事件
    this._window_goods.setHelpWindow(this._window_help);
	this.addChild(this._window_goods);
};
//==============================
// * 创建 - 商品窗口
//==============================
Scene_Drill_SLS.prototype.createGoodsBtn = function() {
	this._drill_btns = [];
	this._drill_btns_points = [];
	var shopData = this._drill_shopData;
	if( shopData['shopMode'] != "按钮组模式" ){ return; }
	
	// > 点列表初始化
	var points =	DrillUp.g_SLS_goodsBtn_upPoint + "," + 
					DrillUp.g_SLS_goodsBtn_centerPoints + "," +
					DrillUp.g_SLS_goodsBtn_downPoint;
	points = points.replace(/[ ]/g,"");
	points = points.replace(/[\(（]/g,"");
	points = points.replace(/[\)）]/g,"");
	points = points.split(/[,，]/g);
	for ( var j = 0; j < points.length ; j+=2 ) {
		var x = Number( points[j] );
		var y = Number( points[j+1] );
		this._drill_btns_points.push({ 'x':x,'y':y });
	}
			
	// > 按钮初始化
	var temp_layer = new Sprite();
	for(var i=0; i < shopData['list'].length; i++){
		var temp_item = shopData['list'][i];
		var data = {
			"x": this._drill_btns_points[this._drill_btns_points.length-1]['x'],	//以下限隐藏点为最初起点
			"y": this._drill_btns_points[this._drill_btns_points.length-1]['y'],
			"width": DrillUp.g_SLS_goodsBtn_width,
			"height": DrillUp.g_SLS_goodsBtn_height,
			"fontsize": DrillUp.g_SLS_goodsBtn_fontsize,
			
			"layoutType": "单张背景贴图",
			"layoutX": 0,
			"layoutY": 0,
			"layoutSrc": "",
			"layoutSrcFile": "img/Menu__limitShop/",
		}
		var temp_window = new Drill_SLS_GoodsButtonWindow(0,0,0,0,temp_item );
		temp_window.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性	
		
		this._drill_btns.push( temp_window );
		temp_layer.addChild( temp_window );
	}
	this._drill_btns_layer = temp_layer;
	this.addChild(temp_layer);
	
	this.drill_SLS_resetBtn();
};
//==============================
// * 创建 - 帮助窗口
//==============================
Scene_Drill_SLS.prototype.createHelpWindow = function() {
	var data = {
		"x": DrillUp.g_SLS_helpWin_x,
		"y": DrillUp.g_SLS_helpWin_y,
		"width": DrillUp.g_SLS_helpWin_width,
		"height": DrillUp.g_SLS_helpWin_height,
		"fontsize": DrillUp.g_SLS_helpWin_fontsize,
		
		"slideMoveType": DrillUp.g_SLS_helpWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SLS_helpWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SLS_helpWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SLS_helpWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SLS_helpWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SLS_helpWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SLS_helpWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SLS_helpWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SLS_helpWin_layout['layoutType'],
		"layoutX": DrillUp.g_SLS_helpWin_layout['layoutX'],
		"layoutY": DrillUp.g_SLS_helpWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SLS_helpWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SLS_helpWin_layout['layoutSrcFile'],
	}
	this._window_help = new Window_Help();
	this._window_help.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	
	this.addChild(this._window_help);
};
//==============================
// * 创建 - 金钱窗口
//==============================
Scene_Drill_SLS.prototype.createGoldWindow = function() {
	var data = {
		"x": DrillUp.g_SLS_goldWin_x,
		"y": DrillUp.g_SLS_goldWin_y,
		"width": DrillUp.g_SLS_goldWin_width,
		"height": DrillUp.g_SLS_goldWin_height,
		"fontsize": DrillUp.g_SLS_goldWin_fontsize,
		
		"slideMoveType": DrillUp.g_SLS_goldWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SLS_goldWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SLS_goldWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SLS_goldWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SLS_goldWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SLS_goldWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SLS_goldWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SLS_goldWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SLS_goldWin_layout['layoutType'],
		"layoutX": DrillUp.g_SLS_goldWin_layout['layoutX'],
		"layoutY": DrillUp.g_SLS_goldWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SLS_goldWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SLS_goldWin_layout['layoutSrcFile'],
	}
	this._window_gold = new Drill_SLS_GoldWindow(0, 0, 0, 0);
	this._window_gold.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._window_gold.refresh();
	
	this.addChild(this._window_gold);
};
//==============================
// * 创建 - 确认窗口
//==============================
Scene_Drill_SLS.prototype.createConfirmWindow = function() {
	var data = {
		"x": DrillUp.g_SLS_confirmWin_x,
		"y": DrillUp.g_SLS_confirmWin_y,
		"width": DrillUp.g_SLS_confirmWin_width,
		"height": DrillUp.g_SLS_confirmWin_height,
		"fontsize": DrillUp.g_SLS_confirmWin_fontsize,
		
		"slideMoveType": DrillUp.g_SLS_confirmWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SLS_confirmWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SLS_confirmWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SLS_confirmWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SLS_confirmWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SLS_confirmWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SLS_confirmWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SLS_confirmWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SLS_confirmWin_layout['layoutType'],
		"layoutX": DrillUp.g_SLS_confirmWin_layout['layoutX'],
		"layoutY": DrillUp.g_SLS_confirmWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SLS_confirmWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SLS_confirmWin_layout['layoutSrcFile'],
	}
	this._window_confirm = new Drill_SLS_ConfirmWindow(0, 0, 0, 0);
	this._window_confirm.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	
	this._window_confirm.setHandler('ok',   this.drill_SLS_selectConfirm.bind(this));		//流程 - 确认窗口选择一个选项
	this._window_confirm.setHandler('cancel',   this.drill_SLS_cancelConfirm.bind(this));	//流程 - 取消确认
	this._window_confirm.close();
	this.addChild(this._window_confirm);
};
//==============================
// * 创建 - 服务员
//==============================
Scene_Drill_SLS.prototype.createWaitress = function() {
	var shop = this._drill_shopData;
	var waitress = DrillUp.g_SLS_waitress_list[ shop['waitress_id'] -1 ];
	if( waitress == undefined ){
		waitress = DrillUp.drill_SLS_convertWaitress( {} );
	}
	var data = {
		"x": waitress['x'],
		"y": waitress['y'],
		
		"slideMoveType": waitress['slideMoveType'],
		"slideTime": waitress['slideTime'],
		"slideDelay": waitress['slideDelay'],
		"slidePosType": waitress['slidePosType'],
		"slideX": waitress['slideX'],
		"slideY": waitress['slideY'],
		"slideAbsoluteX": waitress['slideAbsoluteX'],
		"slideAbsoluteY": waitress['slideAbsoluteY'],
	}
	this._sprite_waitress = new Drill_SLS_WaitressSprite( waitress["act-default"], waitress );
	this._sprite_waitress.drill_COWA_setButtonMove( data );										//辅助核心 - 控制按钮基本属性
	this._sprite_waitress.drill_COWS_pushNewAct("act-welcome", waitress["act-welcome"]);		//服务员核心 - 初始化指令内容
	this._sprite_waitress.drill_COWS_pushNewAct("act-buyOne", waitress["act-buyOne"]);
	this._sprite_waitress.drill_COWS_pushNewAct("act-goldNotEnough", waitress["act-goldNotEnough"]);
	this._sprite_waitress.drill_COWS_pushNewAct("act-storeNotEnough", waitress["act-storeNotEnough"]);
	this._sprite_waitress.drill_COWS_pushNewAct("act-inventoryIsFull", waitress["act-inventoryIsFull"]);
	this._sprite_waitress.drill_COWS_pushNewAct("act-allSoldOut", waitress["act-allSoldOut"]);
	this._sprite_waitress.drill_COWS_playAct("act-welcome");
	
	this.addChild(this._sprite_waitress);
};

//==============================
// * 限量商店 - 修改按钮目标（切换选项时）
//==============================
Scene_Drill_SLS.prototype.drill_SLS_resetBtn = function() {
	var shop = this._drill_shopData;
	if( shop['shopMode'] != "按钮组模式" ){ return; }
	
	for(var i=0; i < this._drill_btns.length; i++){
		var temp_sprite = this._drill_btns[i];
		temp_sprite._drill_needHide = false;
		
		// > 计算每个按钮的下标差值
		var cur_index = this._drill_curBtnIndex;
		var diff = DrillUp.g_SLS_goodsBtn_availableIndex;	//有效点（其实是光标偏移量）
		var index = i - cur_index + diff;
		if( index < 0 ){ index = 0; }
		if( index >= this._drill_btns_points.length ){ index = this._drill_btns_points.length-1; }
		if( index == 0 || index == this._drill_btns_points.length-1 ){
			temp_sprite._drill_needHide = true;
		}
		
		// > 设置移动
		var data = {
			"x": this._drill_btns_points[index]['x'],	//目标点
			"y": this._drill_btns_points[index]['y'],
			
			"slideMoveType": DrillUp.g_SLS_goodsBtn_slideAnim['slideMoveType'],
			"slideTime": DrillUp.g_SLS_goodsBtn_slideAnim['slideTime'],
			"slideDelay": DrillUp.g_SLS_goodsBtn_slideAnim['slideDelay'],
			"slidePosType": "绝对坐标",
			"slideX": 0,
			"slideY": 0,
			"slideAbsoluteX": temp_sprite.x,	//所在点
			"slideAbsoluteY": temp_sprite.y,
		}
		temp_sprite.drill_COWA_setButtonMove( data );		//辅助核心 - 按钮移动（不包括透明度）
		temp_sprite.drill_SLS_redraw();						//刷新bitmap
	}
	
};
//==============================
// * 帧刷新 - 按钮监听
//==============================
Scene_Drill_SLS.prototype.drill_updateButtonTouch = function() {
	if( this._window_goods.active == false ){ return; }
	for(var i=0; i < this._drill_btns.length; i++){
		var temp_btn = this._drill_btns[i];
		if( this.drill_SLS_isOnTouchButton( temp_btn ) ){		//如果买完去掉商品，索引可能会乱
			if( this._window_goods._index == i ){
				this._window_goods.processOk();
			}else{
				this._window_goods.select(i);
				SoundManager.playCursor();
			}
			break;
		}
	}
}

//==============================
// * 帧刷新 - 窗口选项刷新
//==============================
Scene_Drill_SLS.prototype.drill_updateIndex = function() {
	if( $gameSystem._drill_SLS_context_index != undefined ){
		this._window_goods.select( $gameSystem._drill_SLS_context_index );
		$gameSystem._drill_SLS_context_index = null;		//设置选中页
	}
	if( this._window_goods._index == null || 
		this._window_goods._index > $gameTemp._drill_SLS_visibleList.length -1 ||
		this._window_goods._index < 0){ this._window_goods.select(0);}
	if( $gameTemp._drill_SLS_visibleList.length == 0 ){ return };	//如果选项全部为空，强制选择第一个
	
	if( this._drill_curBtnIndex != this._window_goods._index ){
		this._drill_curBtnIndex = this._window_goods._index;
		this.drill_SLS_resetBtn();
	}
}
//==============================
// * 流程 - 选择一个商品
//==============================
Scene_Drill_SLS.prototype.drill_SLS_chooseAItem = function() {
	
	// > 检查商品列表
	if( $gameTemp._drill_SLS_visibleList.length == 0 ){
		// 全部卖完
		this._sprite_waitress.drill_COWS_playAct("act-allSoldOut");
		SoundManager.playBuzzer();
		this._window_goods.activate();
		return ;
	}
	
	// > 检查库存
	if( this._window_goods.drill_SLS_isSoldOut(this._window_goods.index()) ){
		if( this._window_goods.drill_SLS_curLimitType() == "背包限制" ){
			// 背包满了
			this._sprite_waitress.drill_COWS_playAct("act-inventoryIsFull");
		}else{
			// 没库存
			this._sprite_waitress.drill_COWS_playAct("act-storeNotEnough");
		}
		SoundManager.playBuzzer();
		this._window_goods.activate();
		return ;
	}
	
	// > 检查金额
	var price = this._window_goods.drill_SLS_curPrice();
	if( price > $gameParty.gold() ){
		// 没钱
		this._sprite_waitress.drill_COWS_playAct("act-goldNotEnough");
		SoundManager.playBuzzer();
		this._window_goods.activate();
		return ;
	}
	
	// > 显示确认窗口
	this._window_confirm.refresh( price );
	this._window_confirm.drill_COWA_CPD_resetMove();
	this._window_confirm.open();
	this._window_confirm.activate();
	this._window_confirm.select(0);
};
//==============================
// * 流程 - 取消确认
//==============================
Scene_Drill_SLS.prototype.drill_SLS_cancelConfirm = function() {
	SoundManager.playCancel();
	this._window_confirm.close();
	this._window_goods.activate();
};
//==============================
// * 流程 - 确认窗口选择一个选项
//==============================
Scene_Drill_SLS.prototype.drill_SLS_selectConfirm = function() {
	if( this._window_confirm._index == 0 ){	
		// > 确认购买
		SoundManager.playShop();
		this.drill_SLS_buyOneItem();
		this._window_confirm.close();
		
		this._sprite_waitress.drill_COWS_playAct("act-buyOne");
		this._window_gold.refresh();
		this._window_goods.refresh();
		this._window_goods.activate();
		this.drill_SLS_resetBtn();
	}else{
		// > 取消购买
		this._window_confirm.close();
		this._window_goods.activate();
	}
};
//==============================
// * 流程 - 购买一个
//==============================
Scene_Drill_SLS.prototype.drill_SLS_buyOneItem = function() {
	// > 扣除金钱
	$gameParty.loseGold( this._window_goods.drill_SLS_curPrice() );
	
	// > 库存-1
	this._window_goods.drill_SLS_buyOne();
	
	// > 获得物品
	$gameParty.gainItem( this._window_goods.drill_SLS_curItem(), 1 );
};



//=============================================================================
// ** 商品窗口【Drill_SLS_GoodsWindow】
//
//=============================================================================
//==============================
// * 商品窗口 - 定义
//==============================
function Drill_SLS_GoodsWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SLS_GoodsWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SLS_GoodsWindow.prototype.constructor = Drill_SLS_GoodsWindow;
Drill_SLS_GoodsWindow.lastTopRow = 0;
Drill_SLS_GoodsWindow.lastIndex  = 0;
//==============================
// * 商品窗口 - 初始化
//==============================
Drill_SLS_GoodsWindow.prototype.initialize = function(x, y, width, height, shopData) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._drill_shopData = shopData;
	this._list = [];
	this._data = [];
	this.activate();
};

//==============================
// * 商品窗口 - 窗口数据
//==============================
Drill_SLS_GoodsWindow.prototype.maxCols = function() {
	return DrillUp.g_SLS_goodsWin_col;
};
Drill_SLS_GoodsWindow.prototype.maxItems = function() {
	return this._list ? this._list.length : 0;
};
//==============================
// * 商品窗口 - 帧刷新
//==============================
Drill_SLS_GoodsWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
};
//==============================
// * 商品窗口 - 设置选项（手动调用）
//==============================
Drill_SLS_GoodsWindow.prototype.initSelect = function() {
	if( Drill_SLS_GoodsWindow.lastIndex >= this._list.length ){
		Drill_SLS_GoodsWindow.lastIndex = this._list.length-1;
	}
	this.setTopRow(Drill_SLS_GoodsWindow.lastTopRow);
	this.select(Drill_SLS_GoodsWindow.lastIndex);
}
//==============================
// * 商品窗口 - 重绘内容（手动调用）
//==============================
Drill_SLS_GoodsWindow.prototype.refresh = function() {
	var shopData = this._drill_shopData;
	//alert(JSON.stringify(shopData));
	
	// > 可见的物品列表
	if( shopData['list'] == undefined ){ return; }
	$gameTemp._drill_SLS_visibleList = [];
	for(var i=0; i < shopData['list'].length; i++){
		var item_shop = shopData['list'][i];
		if( shopData['autoHide'] == true && item_shop['limit_cur'] >= item_shop['limit_num'] ){
			continue;		//只有库存才隐藏
		}
		$gameTemp._drill_SLS_visibleList.push( item_shop );
	}
	if( this._list.length !== $gameTemp._drill_SLS_visibleList.length ){
		this.select(0);
	}
	
	// > 绘制的物品列表
	this._list = [];
	this._data = [];
	for(var j=0; j< $gameTemp._drill_SLS_visibleList.length ;j++){
		var temp_item = $gameTemp._drill_SLS_visibleList[j];
		if( temp_item['type'] == "物品" ){
			var data = $dataItems[ temp_item['item_id'] ];
			if( data ){
				this._data.push( data );
				this._list.push( temp_item );
			}
		}
		if( temp_item['type'] == "武器" ){
			var data = $dataWeapons[ temp_item['weapon_id'] ];
			if( data ){
				this._data.push( data );
				this._list.push( temp_item );
			}
		}
		if( temp_item['type'] == "护甲" ){
			var data = $dataArmors[ temp_item['armor_id'] ];
			if( data ){
				this._data.push( data );
				this._list.push( temp_item );
			}
		}
	}
	this.createContents();
	this.drawAllItems();	//绘制选项内容
};

//==============================
// * 商品窗口 - 选项行高
//==============================
Drill_SLS_GoodsWindow.prototype.itemHeight = function() {
    return DrillUp.g_SLS_goodsWin_lineHeight;
};
//==============================
// * 商品窗口 - 绘制选项
//==============================
Drill_SLS_GoodsWindow.prototype.drawItem = function(index) {
    var item_data = this._data[index];
	var item_shop = this._list[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.drill_SLS_isEnabled(index));
	
	var itemVertical = rect.y + this.itemHeight()/2 - this.standardFontSize();	//居中位置
	var price = this.drill_SLS_price(index);					//价格
    var priceWidth = 96;										//价格文本宽度
	var pricePos = rect.x + rect.width - priceWidth - 2;		//价格位置x
	var store_cur = item_shop['limit_cur'];						//存量
	var store_max = item_shop['limit_num'];						//上限
	if( item_shop['limit_type'] == "背包限制" ){
		store_cur = $gameParty.numItems(item_data);
	}
	var store_str = String(store_cur) +"/"+ String(store_max);	//存量文本
	if( item_shop['limit_showMax'] == false ){
		store_str = String( store_max-store_cur );
	}
	
    this.drawItemName(item_data, rect.x, itemVertical, rect.width - priceWidth);
    this.drawText(store_str, pricePos, rect.y + 0, priceWidth, 'right');
	if( this.drill_SLS_isSoldOut(index) == false ){
		this.drawText(price, pricePos, rect.y + 32, priceWidth, 'right');		//没有库存后，不显示价格
	}
    
	this.changePaintOpacity(true);
};
//==============================
// * 商品窗口 - 退出事件
//==============================
Drill_SLS_GoodsWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Drill_SLS_GoodsWindow.lastTopRow = this.topRow();
	Drill_SLS_GoodsWindow.lastIndex = this.index();
};
//==============================
// * 商品窗口 - 物品可卖
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_isEnabled = function(index) {
	if( this._list.length == 0 ){ return false; }								//所有商品卖完
	if( this.drill_SLS_isSoldOut(index) ){ return false; }						//库存
	if( this.drill_SLS_price(index) > $gameParty.gold() ){ return false; }		//价格
    var item_data = this._data[index];
    return item_data && item_data.price > 0;
};
//==============================
// * 商品窗口 - 物品可卖
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_isSoldOut = function(index) {
	if( this._list.length == 0 ){ return false; }							//所有商品卖完
    var item_data = this._data[index];
	var item_shop = this._list[index];
	if( item_shop['limit_type'] == "背包限制" ){
		return $gameParty.numItems(item_data) >= item_shop['limit_num'];	//背包限制
	}
	return item_shop['limit_cur'] >= item_shop['limit_num'];	//库存限制
};
//==============================
// * 商品窗口 - 当前选中的物品价格
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_curPrice = function() {
	return this.drill_SLS_price(this.index());
}
//==============================
// * 商品窗口 - 当前选中的物品的限量类型
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_curLimitType = function() {
	var item_shop = this._list[this.index()];
	return item_shop['limit_type'];
}
//==============================
// * 商品窗口 - 物品价格
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_price = function(index) {
    var item_data = this._data[index];
	var item_shop = this._list[index];
	if( item_data == undefined ){ return 0; }
	if( item_shop == undefined ){ return 0; }
	var price = item_data.price || 0;
	if( price == 0 ){ return 0; }		//价格为0的不能卖
	
	// > 价格公式
	var result = price;
	if( item_shop['inc_lock'] == true ){
		result = item_shop['inc_locknum'];
	}
	if( item_shop['inc_enable'] == true ){
		if( item_shop['inc_type'] == "按背包数量涨价" ){
			// > 只按背包数量涨价
			for( var i=0; i < $gameParty.numItems(item_data); i++ ){
				result = result * item_shop['inc_power'] + item_shop['inc_add'];
			}
		}else{
			// > 永久涨价
			for( var i=0; i < item_shop['limit_cur']; i++ ){
				result = result * item_shop['inc_power'] + item_shop['inc_add'];
			}
		}
	}
	
	return Math.ceil(result);
};
//==============================
// * 商品窗口 - 刷新帮助信息
//==============================
Drill_SLS_GoodsWindow.prototype.updateHelp = function() {
	this.setHelpWindowItem(this.drill_SLS_curItem());
}
//==============================
// * 商品窗口 - 当前选中的商品
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_curItem = function() {
    return this._data[this.index()];
};
//==============================
// * 商品窗口 - 库存-1
//==============================
Drill_SLS_GoodsWindow.prototype.drill_SLS_buyOne = function() {
	this._list[this.index()]['limit_cur'] += 1;	//直接操作$gameSystem存储的指针
};
//==============================
// * 商品窗口 - 兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true && DrillUp.g_SLS_goodsWin_cursor != null ){
	Drill_SLS_GoodsWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SLS_goodsWin_cursor['MCu_enabled'];
	}
	Drill_SLS_GoodsWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SLS_goodsWin_cursor['MCu_lock'] == true ){
			return DrillUp.g_SLS_goodsWin_cursor['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 商品窗口 - 兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true && DrillUp.g_SLS_goodsWin_cursor != null ){
	Drill_SLS_GoodsWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SLS_goodsWin_cursor['MCB_rectEnabled'];
	}
	Drill_SLS_GoodsWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SLS_goodsWin_cursor['MCB_enabled'];
	}
	Drill_SLS_GoodsWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SLS_goodsWin_cursor['MCB_lock'] == true ){
			return DrillUp.g_SLS_goodsWin_cursor['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 商品窗口 - 兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true && DrillUp.g_SLS_goodsWin_cursor != null ){
	Drill_SLS_GoodsWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SLS_goodsWin_cursor['MSB_enabled'];
	}
	Drill_SLS_GoodsWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SLS_goodsWin_cursor['MSB_lock'] == true ){
			return DrillUp.g_SLS_goodsWin_cursor['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}



//=============================================================================
// ** 商品按钮组【Drill_SLS_GoodsButtonWindow】（考虑到物品滤镜，本质为window）
//			
//			说明：	> 由于按钮是只读数据的，必要时刷新。
//					  所以只看createGoodsBtn和drill_SLS_resetBtn即可
//=============================================================================
//==============================
// * 按钮 - 定义
//==============================
function Drill_SLS_GoodsButtonWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SLS_GoodsButtonWindow.prototype = Object.create(Window_Base.prototype);
Drill_SLS_GoodsButtonWindow.prototype.constructor = Drill_SLS_GoodsButtonWindow;
//==============================
// * 按钮 - 初始化
//==============================
Drill_SLS_GoodsButtonWindow.prototype.initialize = function(x, y, width, height, item ){
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._drill_item = item;					//物品数据（配置数据）
	if( item['type'] == "物品" ){
		this._drill_item_data = $dataItems[ item['item_id'] ];
	}
	if( item['type'] == "武器" ){
		this._drill_item_data = $dataWeapons[ item['weapon_id'] ];
	}
	if( item['type'] == "护甲" ){
		this._drill_item_data = $dataArmors[ item['armor_id'] ];
	}
	this._drill_needHide = false;	
	this._drill_textSprite = null;
}
//==============================
// * 按钮 - 帧刷新
//==============================
Drill_SLS_GoodsButtonWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	// > 透明度控制
	if( this._drill_needHide ){
		this.contentsOpacity -= 10;
		this._drill_COWA_layoutOpacity -= 10;
	}else{
		this.contentsOpacity += 10;
		this._drill_COWA_layoutOpacity += 10;
	}
};
//==============================
// * 按钮 - 去掉内边距
//==============================
Drill_SLS_GoodsButtonWindow.prototype.standardPadding = function() {
    return 0;
};
//==============================
// * 按钮 - 重绘内容（手动调用）
//==============================
Drill_SLS_GoodsButtonWindow.prototype.drill_SLS_redraw = function() {
	var temp_item = this._drill_item;
	var item_data = this._drill_item_data;
	//alert(JSON.stringify(temp_item));
	
	// > 重刷背景
	if( this.drill_SLS_isEnabled() ){
		this._drill_COWA_backSprite.bitmap = ImageManager.load_MenuLimitShop(DrillUp.g_SLS_goodsBtn_btnActived);
	}else{
		this._drill_COWA_backSprite.bitmap = ImageManager.load_MenuLimitShop(DrillUp.g_SLS_goodsBtn_btnDeactived);
	}
	
	// > 重绘文本（与商品窗口相似）
	this.createContents();
	var padding = 20;
    var rect = new Rectangle(padding,0,this.width-padding*2,this.height);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.drill_SLS_isEnabled());
	
	var itemVertical = rect.y + DrillUp.g_SLS_goodsBtn_height/2 - this.standardFontSize();	//居中位置
	var price = this.drill_SLS_price();							//价格
    var priceWidth = 96;										//价格文本宽度
	var pricePos = rect.x + rect.width - priceWidth - 2;		//价格位置x
	var store_cur = temp_item['limit_cur'];						//存量
	var store_max = temp_item['limit_num'];						//上限
	if( temp_item['limit_type'] == "背包限制" ){
		store_cur = $gameParty.numItems(item_data);
	}
	var store_str = String(store_cur) +"/"+ String(store_max);	//存量文本
	if( temp_item['limit_showMax'] == false ){
		store_str = String( store_max-store_cur );
	}
	
    this.drawItemName(item_data, rect.x, itemVertical, rect.width - priceWidth);
    this.drawText(store_str, pricePos, rect.y + 0, priceWidth, 'right');
	if( this.drill_SLS_isSoldOut() == false ){
		this.drawText(price, pricePos, rect.y + 32, priceWidth, 'right');		//没有库存后，不显示价格
	}
    
	this.changePaintOpacity(true);
};
//==============================
// * 按钮 - 按键反向
//==============================
var _drill_SLS_goods_processCursorMove = Drill_SLS_GoodsWindow.prototype.processCursorMove;
Drill_SLS_GoodsWindow.prototype.processCursorMove = function() {
	var shop = this._drill_shopData;
	if( shop['shopMode'] == "按钮组模式" ){ 
		if (this.isCursorMovable()) {
			var lastIndex = this.index();
			if( DrillUp.g_SLS_goodsBtn_keyReverse ){	//键盘反向
				if( Input.isRepeated('down') || Input.isRepeated('right') ){
					if( lastIndex == 0 ){
						this.select(this.maxRows()-1);
					}else{
						this.select(lastIndex - 1);
					}
				};
				if( Input.isRepeated('up') || Input.isRepeated('left') ){
					if( lastIndex == this.maxRows()-1 ){
						this.select(0);
					}else{
						this.select(lastIndex + 1);
					}
				};
			}else{
				if( Input.isRepeated('down') || Input.isRepeated('right') ){
					if( lastIndex == this.maxRows()-1 ){	//循环选择
						this.select(0);
					}else{
						this.select(lastIndex + 1);
					}
				};
				if( Input.isRepeated('up') || Input.isRepeated('left') ){
					if( lastIndex == 0 ){
						this.select(this.maxRows()-1);
					}else{
						this.select(lastIndex - 1);
					}
				};
			}
			if( this.index() !== lastIndex ){
				SoundManager.playCursor();
			}
		}
	}else{
		_drill_SLS_goods_processCursorMove.call( this );
	}
};
//==============================
// * 按钮 - 点击事件监听
//==============================
Scene_Drill_SLS.prototype.drill_SLS_isOnTouchButton = function( temp_window ){
	 if( temp_window == null ){ return false };
	 if( temp_window.contentsOpacity == 0 ){ return false };
	 if( !TouchInput.isTriggered() ){return false};		//需要确定是否为鼠标点击
	 var cw = temp_window.width;
	 var ch = temp_window.height;
	 if( TouchInput.x < temp_window.x + 0){return false};
	 if( TouchInput.x > temp_window.x + cw){return false};
	 if( TouchInput.y < temp_window.y + 0){return false};
	 if( TouchInput.y > temp_window.y + ch){return false};
	 return true;	
};
//==============================
// * 按钮 - 物品可卖（与商品窗口一样，只是去掉了index）
//==============================
Drill_SLS_GoodsButtonWindow.prototype.drill_SLS_isEnabled = function() {
	if( this.drill_SLS_isSoldOut() ){ return false; }						//库存
	if( this.drill_SLS_price() > $gameParty.gold() ){ return false; }		//价格
    var item_data = this._drill_item_data;
    return item_data && item_data.price > 0;
};
//==============================
// * 按钮 - 物品可卖（与商品窗口一样，只是去掉了index）
//==============================
Drill_SLS_GoodsButtonWindow.prototype.drill_SLS_isSoldOut = function() {
    var item_data = this._drill_item_data;
	var item_shop = this._drill_item;
	if( item_shop['limit_type'] == "背包限制" ){
		return $gameParty.numItems(item_data) >= item_shop['limit_num'];	//背包限制
	}
	return item_shop['limit_cur'] >= item_shop['limit_num'];	//库存限制
};
//==============================
// * 按钮 - 物品价格（与商品窗口一样，只是去掉了index）
//==============================
Drill_SLS_GoodsButtonWindow.prototype.drill_SLS_price = function() {
    var item_data = this._drill_item_data;
	var item_shop = this._drill_item;
	var price = item_data.price || 0;
	if( price == 0 ){ return 0; }		//价格为0的不能卖
	
	// > 价格公式
	var result = price;
	if( item_shop['inc_lock'] == true ){
		result = item_shop['inc_locknum'];
	}
	if( item_shop['inc_type'] == "按背包数量涨价" ){
		// > 只按背包数量涨价
		for( var i=0; i < $gameParty.numItems(item_data); i++ ){
			result = result * item_shop['inc_power'] + item_shop['inc_add'];
		}
	}else{
		// > 永久涨价
		for( var i=0; i < item_shop['limit_cur']; i++ ){
			result = result * item_shop['inc_power'] + item_shop['inc_add'];
		}
	}
	
	return Math.ceil(result);
};



//=============================================================================
// ** 确认窗口【Drill_SLS_ConfirmWindow】
//
//=============================================================================
//==============================
// * 确认窗口 - 定义
//==============================
function Drill_SLS_ConfirmWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SLS_ConfirmWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SLS_ConfirmWindow.prototype.constructor = Drill_SLS_ConfirmWindow;
//==============================
// * 确认窗口 - 初始化
//==============================
Drill_SLS_ConfirmWindow.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
};
//==============================
// * 确认窗口 - 窗口数据
//==============================
Drill_SLS_ConfirmWindow.prototype.maxCols = function() {
	return 2;
};
Drill_SLS_ConfirmWindow.prototype.maxItems = function() {
	return this._list ? this._list.length : 0;
};
//==============================
// * 确认窗口 - 帧刷新
//==============================
Drill_SLS_ConfirmWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
};
//==============================
// * 确认窗口 - 高度间隔
//==============================
Drill_SLS_ConfirmWindow.prototype.itemRect = function(index) {
	var rect = Window_Selectable.prototype.itemRect.call(this,index);
	rect.y += this.height - this.standardPadding() - this.standardFontSize() - rect.height;
	return rect;
}
//==============================
// * 确认窗口 - 重绘内容（手动调用）
//==============================
Drill_SLS_ConfirmWindow.prototype.refresh = function( price ) {
	this._list = [];
	this._list.push( DrillUp.g_SLS_confirmWin_ok );
	this._list.push( DrillUp.g_SLS_confirmWin_cancel );
	
	var str_list = [];
	for( var i=0; i < DrillUp.g_SLS_confirmWin_question.length; i++ ){
		var temp_str = DrillUp.g_SLS_confirmWin_question[i];
		temp_str = temp_str.replace( "<商品价格>",String(price) );
		str_list.push(temp_str);
	}
	
	this.createContents();
	this.drill_COWA_drawTextListEx(str_list);
	this.drawAllItems();	//绘制选项内容
}
//==============================
// * 确认窗口 - 绘制选项
//==============================
Drill_SLS_ConfirmWindow.prototype.drawItem = function(index) {
	var text = this._list[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
	
	this.drawText(text, rect.x, rect.y , rect.width, 'center');
};
//==============================
// * 确认窗口 - 兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true && DrillUp.g_SLS_confirmWin_cursor != null ){
	Drill_SLS_ConfirmWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SLS_confirmWin_cursor['MCu_enabled'];
	}
	Drill_SLS_ConfirmWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SLS_confirmWin_cursor['MCu_lock'] == true ){
			return DrillUp.g_SLS_confirmWin_cursor['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 确认窗口 - 兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true && DrillUp.g_SLS_confirmWin_cursor != null ){
	Drill_SLS_ConfirmWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SLS_confirmWin_cursor['MCB_rectEnabled'];
	}
	Drill_SLS_ConfirmWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SLS_confirmWin_cursor['MCB_enabled'];
	}
	Drill_SLS_ConfirmWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SLS_confirmWin_cursor['MCB_lock'] == true ){
			return DrillUp.g_SLS_confirmWin_cursor['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 确认窗口 - 兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true && DrillUp.g_SLS_confirmWin_cursor != null ){
	Drill_SLS_ConfirmWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SLS_confirmWin_cursor['MSB_enabled'];
	}
	Drill_SLS_ConfirmWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SLS_confirmWin_cursor['MSB_lock'] == true ){
			return DrillUp.g_SLS_confirmWin_cursor['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}


//=============================================================================
// ** 金钱窗口【Drill_SLS_GoldWindow】
//
//=============================================================================
//==============================
// * 金钱窗口 - 定义
//==============================
function Drill_SLS_GoldWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SLS_GoldWindow.prototype = Object.create(Window_Base.prototype);
Drill_SLS_GoldWindow.prototype.constructor = Drill_SLS_GoldWindow;
//==============================
// * 金钱窗口 - 初始化
//==============================
Drill_SLS_GoldWindow.prototype.initialize = function(x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
};
//==============================
// * 金钱窗口 - 帧刷新
//==============================
Drill_SLS_GoldWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
};
//==============================
// * 金钱窗口 - 刷新内容（覆写）
//==============================
Drill_SLS_GoldWindow.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	
	this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, x, 0, width);	//货币单位，强制右对齐
};


//=============================================================================
// ** 服务员【Drill_SLS_WaitressSprite】
//
//=============================================================================
//==============================
// * 服务员 - 定义（继承 服务员核心）
//==============================
function Drill_SLS_WaitressSprite() {
	this.initialize.apply(this, arguments);
}
Drill_SLS_WaitressSprite.prototype = Object.create(Drill_COWS_WaitressSprite.prototype);
Drill_SLS_WaitressSprite.prototype.constructor = Drill_SLS_WaitressSprite;
//==============================
// * 服务员 - 初始化
//==============================
Drill_SLS_WaitressSprite.prototype.initialize = function( default_act_data, data ) {
	Drill_COWS_WaitressSprite.prototype.initialize.call(this, default_act_data);
	this._drill_data = data;
	this.opacity = 0;		//透明度
};
//==============================
// * 服务员 - 帧刷新
//==============================
Drill_SLS_WaitressSprite.prototype.update = function() {
	Drill_COWS_WaitressSprite.prototype.update.call(this);
	
	// >透明度控制
	if( this._drill_data ){
		if( this._drill_time >= this._drill_data["slideDelay"] ){
			this.opacity += 255 / this._drill_data["slideTime"];
		}
	}
	
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneLimitedShop = false;
		alert(
			"【Drill_SceneLimitedShop.js 面板 - 限量商店】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心" +
			"\n- Drill_CoreOfWaitressSprite 主菜单-服务员核心"
		);
}


