//=============================================================================
// Drill_SceneShop.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        面板 - 全自定义商店界面
 * @author Drill_up
 * 
 * @Drill_LE_param "服务员-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_SSh_waitress_list_length"
 *
 * 
 * @help
 * =============================================================================
 * +++ Drill_SceneShop +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全自定义的商店界面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary    系统-窗口辅助核心
 *   - Drill_CoreOfWaitressSprite     主菜单-服务员核心
 *     必须基于上述插件才能显示控制窗口移动、服务员动作。
 * 被扩展：
 *   - Drill_ItemCategory             控件-物品类型★★v1.4及以上★★
 *     通过该插件，可以扩展更多物品类型。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以设置商店面板(界面)的内容。
 * 2.具体可以去看看 "18.面板 > 关于全自定义商店界面.docx"。
 *   文档中有相关图解，比纯文字容易理解。
 * 3.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Shop
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 结构/流程：
 *   (1.界面包含：7个窗口 + 1个按钮组 + 1个服务员
 *   (2.注意，购买流程 和 出售流程 是完全固定的业务逻辑，无法修改。
 * 窗口：
 *   (1.这里的所有窗口的信息都应该俱全，不建议使用y1000隐藏。
 *   (2.你需要考虑如何分配每个窗口的占用空间。
 *      具体可以去看看文档中流程的窗口显示情况介绍。
 * 价格变动：
 *   (1.价格公式为：原价 * 倍率 + 额外价格
 *   (2.倍率计算后，小数点后面只要存在位数，就会进1位。
 *      通过倍率计算/价格调整后的最小价格为1。
 *   (3.由于变量不能表示小数，这里的倍率变量取千分之一。
 *      假设变量[22]值为 1100 ，则倍率为 110.0%。
 *   (4.由于物品是可以批量购买多个的，所以该商店不支持越买越贵功能。
 * 物品兑换：
 *   (1.使用指令切换商店后，只是把 金钱 换成了 樱桃（38号物品）交易。
 *      倍率/额外价格还是原来的，你需要手动调整新的倍率/额外价格。
 *   (2.注意交换商店的出售功能，你需要调整额外价格，防止玩家用这个来
 *      刷钱。
 * 服务员：
 *   (1.数字表示设置的服务员的编号，0表示没有服务员。
 *      商店里默认会配置第1个服务员。
 *   (2.服务员可以对以下情况作出不同gif动作：
 *      "欢迎光临"：刚进入界面时触发。
 *      "购买一个物品"：玩家购买了一个物品时触发。
 *      "出售一个物品"：玩家出售了一个物品时触发。
 *      "余额不足"：玩家买不起时点击购买触发。
 *      "余额不足(交换物)"：玩家物品不足时点击购买触发。
 *   (3.服务员实际上只是一张变化的gif贴图，可以不是人物立绘。
 * 设计：
 *   (1.该商店需要使用事件指令"商店处理"后，才能进入固定的商店界面。
 *      并且，窗口配置后的样式是固定的。
 *      虽然在游戏中，结构不能临时改变，但是你可以换皮，比如使用插件
 *      指令开关菜单背景达到切换商店背景的效果，或者切换服务员。
 *      更多设计可以再去看看 "18.面板 > 关于全自定义商店界面.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__shop （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__shop文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-整体布局
 * 资源-帮助窗口
 * 资源-金钱窗口
 * 资源-购买窗口
 * 资源-持有数窗口
 * 资源-物品数量窗口
 * 资源-出售窗口
 * 资源-出售类型窗口
 *
 * 资源-购买按钮
 * 资源-出售按钮
 * 资源-离开按钮
 *
 * 服务员-1
 * 服务员-2
 * …………
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 价格变动
 * 你可以通过插件指令手动设置商店的购买/出售倍率。
 * 
 * 插件指令：>商店界面 : 购买倍率 : 1.05
 * 插件指令：>商店界面 : 购买倍率(变量) : 21
 * 插件指令：>商店界面 : 出售倍率 : 0.25
 * 插件指令：>商店界面 : 出售倍率(变量) : 21
 * 插件指令：>商店界面 : 倍率恢复默认
 * 
 * 插件指令：>商店界面 : 购买额外价格 : +10
 * 插件指令：>商店界面 : 购买额外价格(变量) : 21
 * 插件指令：>商店界面 : 出售额外价格 : -10
 * 插件指令：>商店界面 : 出售额外价格(变量) : 21
 * 插件指令：>商店界面 : 额外价格恢复默认
 *
 * 1.价格公式为：原价 * 倍率 + 额外价格
 *   可以去看看"18.面板 > 关于全自定义商店界面.docx"。
 * 2.默认购买倍率为全价1.00，出售倍率为半价0.50。
 *   设置"购买倍率"1.05表示这个物品的价格为105%。
 *   倍率计算后，小数点后面的位会被舍去。
 * 3.由于变量不能表示小数，这里根据变量的值取千分之一。
 *   假设变量[22]值为 1100 ，则倍率为 110.0%。
 * 4."额外价格"表示在倍率的基础上，额外调整的价格。
 *   价格可以为负数。
 * 5.倍率计算后，小数点后面只要存在位数，就会进1位。
 *   通过倍率计算/价格调整后的最小价格为1。
 * 6.由于物品是可以批量购买多个的，所以该商店不支持越买越贵功能。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 交换商店
 * 你可以通过插件指令手动设置商店的交换方式。
 *
 * 插件指令：>商店界面 : 开启交换商店 : 38 : \I[546]
 * 插件指令：>商店界面 : 关闭交换商店
 * 
 * 1."38"表示物品的id，"\I[546]"表示物品单位图标，你也可以填文字。
 * 2.商店只是把 金钱 换成了 樱桃（38号物品）交易。
 *   倍率/额外价格还是原来的，你需要手动调整新的倍率/额外价格。
 * 3.注意交换商店的出售功能，你需要调整额外价格，防止玩家用这个来刷钱。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 服务员
 * 你可以在进入商店页面前修改服务员：
 *
 * 插件指令：>商店界面 : 当前服务员 : 2
 * 
 * 1.数字表示设置的服务员的编号，0表示没有服务员。
 * 2.商店里默认会配置第1个服务员。
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
 * 测试结果：   菜单界面中，商店的基本元素消耗为：【21.03ms】
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
 * 添加了商店的物品交换功能。优化了点击按钮部分。
 * [v1.2]
 * 添加了出售类型窗口的对齐方式，并修复了窗口宽度的bug。
 * [v1.3]
 * 修复了价钱为0时界面会变成1的bug。规范了插件指令格式。
 * 将服务员添加了gif设置。并且添加了按钮的四种效果。
 * [v1.4]
 * 修复了插件指令切换服务员时出现的bug。
 * [v1.5]
 * 修改了插件的内部结构。
 * [v1.6]
 * 修改了插件关联的资源文件夹。
 * [v1.7]
 * 大幅度改进了内部结构，整理了插件说明。
 * 添加了"额外价格"的设置，加强了服务员的功能。
 * [v1.8]
 * 添加了drill指针的控制。
 * [v1.9]
 * 修复了玩家鼠标猛点按钮区域，可以反复购买/出售的bug。
 * [v2.0]
 * 修复了 金钱窗口的字体大小 无法修改的bug。
 * 修复了服务员无法正常播放动作的bug。
 * [v2.1]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 商店界面-整体布局
 * @require 1
 * @dir img/Menu__shop/
 * @type file
 *
 * @param 默认购买倍率
 * @parent ----杂项----
 * @desc 从商店购买物品价格的倍率，设置1.1表示为物品价格的1.1倍。
 * @default 1.000
 *
 * @param 默认出售倍率
 * @parent ----杂项----
 * @desc 从商店出售物品价格的倍率，设置0.6表示为物品价格的0.6倍。
 * @default 0.500
 *
 * @param ----服务员----
 * @default 
 *
 * @param 服务员-1
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-2
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-3
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-4
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-5
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-6
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-7
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-8
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-9
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-10
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-11
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-12
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-13
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-14
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-15
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-16
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-17
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-18
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-19
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-20
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-21
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-22
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-23
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-24
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-25
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-26
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-27
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-28
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-29
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-30
 * @parent ----服务员----
 * @type struct<DrillSShWaitress>
 * @desc 设置商店的服务员。
 * @default 
 * 
 *
 * @param ----帮助窗口----
 * @default 
 * 
 * @param 帮助窗口 X
 * @parent ----帮助窗口----
 * @desc 帮助窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 230
 *
 * @param 帮助窗口 Y
 * @parent ----帮助窗口----
 * @desc 帮助窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 515
 *
 * @param 帮助窗口宽度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 400
 *
 * @param 帮助窗口高度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 100
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
 * @default {"布局类型":"隐藏布局","---单张背景贴图---":"","资源-贴图":"商店界面-帮助窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * 
 * @param ----金钱窗口----
 * @default 
 * 
 * @param 金钱窗口 X
 * @parent ----金钱窗口----
 * @desc 金钱窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 10
 *
 * @param 金钱窗口 Y
 * @parent ----金钱窗口----
 * @desc 金钱窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 528
 *
 * @param 金钱窗口宽度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 200
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
 * @default {"移动类型":"弹性移动","移动时长":"40","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"80","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 金钱窗口布局
 * @parent ----金钱窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"商店界面-金钱窗口","贴图位置修正 X":"0","贴图位置修正 Y":"10"}
 * 
 *
 * @param ----选项按钮组----
 * @default 
 *
 * @param 平移-按钮起点 X
 * @parent ----选项按钮组----
 * @desc 按钮初始会出现在起点，x轴方向平移，单位像素。0为贴在最左边。
 * @default 660
 *
 * @param 平移-按钮起点 Y
 * @parent ----选项按钮组----
 * @desc 按钮初始会出现在起点，y轴方向平移，单位像素。0为贴在最上面。
 * @default 300
 *
 * @param 是否使用激活按钮移动效果
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用。如果不使用，按钮点击后，直接隐藏。
 * @default true
 *
 * @param 平移-激活的按钮 X
 * @parent 是否使用激活按钮移动效果
 * @desc 按钮被激活后，移动到指定位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 120
 *
 * @param 平移-激活的按钮 Y
 * @parent 是否使用激活按钮移动效果
 * @desc 按钮被激活后，移动到指定位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 135
 *
 * @param 未选中按钮透明度
 * @parent ----选项按钮组----
 * @type number
 * @min 1
 * @max 255
 * @desc 未选中的其它按钮默认的透明度。0为完全透明，255为完全不透明。(设置0会造成鼠标点不了，这里最低为1。)
 * @default 160
 *
 * @param 是否使用缩放效果
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回缩放。
 * @default true
 *
 * @param 是否使用闪烁效果
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回闪烁。
 * @default false
 *
 * @param 浮动偏移量
 * @parent ----选项按钮组----
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 是否使用左右浮动
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会左右浮动。
 * @default false
 *
 * @param 是否使用上下浮动
 * @parent ----选项按钮组----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会上下浮动。
 * @default false
 *
 * @param 资源-购买按钮
 * @desc 购买按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项购买
 * @require 1
 * @dir img/Menu__shop/
 * @type file
 *
 * @param 平移-购买按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-购买按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 210
 *
 * @param 资源-出售按钮
 * @desc 出售按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项出售
 * @require 1
 * @dir img/Menu__shop/
 * @type file
 *
 * @param 平移-出售按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-出售按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 295
 *
 * @param 资源-离开按钮
 * @desc 离开按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项离开
 * @require 1
 * @dir img/Menu__shop/
 * @type file
 *
 * @param 平移-离开按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-离开按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 380
 * 
 * 
 * @param ----购买窗口----
 * @default 
 * 
 * @param 购买窗口 X
 * @parent ----购买窗口----
 * @desc 购买窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param 购买窗口 Y
 * @parent ----购买窗口----
 * @desc 购买窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param 购买窗口宽度
 * @parent ----购买窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 370
 *
 * @param 购买窗口高度
 * @parent ----购买窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 340
 *
 * @param 购买窗口列数
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 购买窗口的列数。
 * @default 1
 *
 * @param 购买窗口字体大小
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 购买窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 购买窗口移动动画
 * @parent ----购买窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"25","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-80","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 购买窗口布局
 * @parent ----购买窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"商店界面-购买窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 购买窗口指针与边框
 * @parent ----购买窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 *
 * @param ----持有数窗口----
 * @default 
 * 
 * @param 持有数窗口 X
 * @parent ----持有数窗口----
 * @desc 持有数窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 10
 *
 * @param 持有数窗口 Y
 * @parent ----持有数窗口----
 * @desc 持有数窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 430
 *
 * @param 持有数窗口宽度
 * @parent ----持有数窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 200
 *
 * @param 持有数窗口高度
 * @parent ----持有数窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 80
 *
 * @param 持有数窗口字体大小
 * @parent ----持有数窗口----
 * @type number
 * @min 1
 * @desc 持有数窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 持有数窗口移动动画
 * @parent ----持有数窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"15","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 持有数窗口布局
 * @parent ----持有数窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"商店界面-持有数窗口","贴图位置修正 X":"0","贴图位置修正 Y":"10"}
 * 
 *
 * @param ----物品数量窗口----
 * @default 
 * 
 * @param 物品数量窗口 X
 * @parent ----物品数量窗口----
 * @desc 物品数量窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param 物品数量窗口 Y
 * @parent ----物品数量窗口----
 * @desc 物品数量窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 390
 *
 * @param 物品数量窗口宽度
 * @parent ----物品数量窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 370
 *
 * @param 物品数量窗口高度
 * @parent ----物品数量窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 130
 *
 * @param 物品数量窗口字体大小
 * @parent ----物品数量窗口----
 * @type number
 * @min 1
 * @desc 物品数量窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 物品数量窗口移动动画
 * @parent ----物品数量窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"20","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"40","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 物品数量窗口布局
 * @parent ----物品数量窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"商店界面-物品数量窗口","贴图位置修正 X":"0","贴图位置修正 Y":"-15"}
 * 
 *
 * @param ----出售窗口----
 * @default 
 * 
 * @param 出售窗口 X
 * @parent ----出售窗口----
 * @desc 出售窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param 出售窗口 Y
 * @parent ----出售窗口----
 * @desc 出售窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param 出售窗口宽度
 * @parent ----出售窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 370
 *
 * @param 出售窗口高度
 * @parent ----出售窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 340
 *
 * @param 出售窗口列数
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 出售窗口的列数。
 * @default 1
 *
 * @param 出售窗口字体大小
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 出售窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 出售窗口移动动画
 * @parent ----出售窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"25","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-80","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 出售窗口布局
 * @parent ----出售窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"商店界面-出售窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 出售窗口指针与边框
 * @parent ----出售窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 *
 * @param ----出售类型窗口----
 * @default 
 * 
 * @param 出售类型窗口 X
 * @parent ----出售类型窗口----
 * @desc 出售类型窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 15
 *
 * @param 出售类型窗口 Y
 * @parent ----出售类型窗口----
 * @desc 出售类型窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 180
 *
 * @param 出售类型窗口宽度
 * @parent ----出售类型窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 230
 *
 * @param 出售类型窗口高度
 * @parent ----出售类型窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 240
 * 
 * @param 出售类型窗口列数
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 出售类型窗口的列数。
 * @default 1
 *
 * @param 出售类型窗口字体大小
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 出售类型窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 出售类型窗口移动动画
 * @parent ----出售类型窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"20","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-80","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 出售类型窗口布局
 * @parent ----出售类型窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"商店界面-出售类型窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 出售类型对齐方式
 * @parent ----出售类型窗口----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center- 居中，right - 右对齐。
 * @default left
 * 
 * @param 出售类型窗口指针与边框
 * @parent ----出售类型窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
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
 * @dir img/Menu__shop/
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
/*~struct~DrillSShWaitress:
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
 * @type struct<DrillSShWaitressActDefault>
 * @desc 未发生任何情况时，服务员的动作。
 * @default {"资源-动作GIF":"[\"商店界面-服务员1_a\"]","帧间隔":"4","是否倒放":"false"}
 *
 * @param 行为-欢迎光临
 * @parent ---行为---
 * @desc 刚进入菜单时，服务员做出的动作。
 * @type struct<DrillSShWaitressAct>
 * @default 
 * 
 * @param 行为-购买一个物品
 * @parent ---行为---
 * @desc 玩家购买了一个物品时，服务员做出的动作。
 * @type struct<DrillSShWaitressAct>
 * @default 
 * 
 * @param 行为-出售一个物品
 * @parent ---行为---
 * @desc 玩家购买了一个物品时，服务员做出的动作。
 * @type struct<DrillSShWaitressAct>
 * @default 
 * 
 * @param 行为-余额不足
 * @parent ---行为---
 * @desc 玩家余额不足无法购买时，服务员做出的动作。
 * @type struct<DrillSShWaitressAct>
 * @default 
 * 
 * @param 行为-余额不足(交换物)
 * @parent ---行为---
 * @desc 玩家的交换物不足且无法购买时，服务员做出的动作。
 * @type struct<DrillSShWaitressAct>
 * @default 
 */
/*~struct~DrillSShWaitressAct:
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
 * @dir img/Menu__shop/
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
/*~struct~DrillSShWaitressActDefault:
 *
 * @param 资源-动作GIF
 * @desc 服务员的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default 
 * @require 1
 * @dir img/Menu__shop/
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
//		插件简称		SSh（Sence_Shop）
//		临时全局变量	DrillUp.g_SSh_xxx
//		临时局部变量	this._drill_SSh_xxx
//		存储数据变量	$gameSystem._drill_SSh_xxx
//		全局存储变量	无
//		覆盖重写方法	重写方法非常多，未带 drill_ 前缀的都是
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	在面板中记录
//		★性能测试消耗	7.42ms
//		★最坏情况		无
//		★备注			这个值不是很符合实际，这里应该把辅助核心的消耗加进来。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全自定义商店界面：
//				->商店界面（覆写函数）
//					->整体布局
//					->窗口排序
//				->窗口
//					->选项按钮组
//						> 购买
//						> 出售
//						> 离开
//					->帮助窗口
//					->金钱窗口
//						->新写窗口
//						> 金钱数
//						> 金钱单位（修改交换物/货币）
//					->购买窗口
//						> 执行购买
//						> 购买价格
//						> 选择数量
//					->出售窗口
//						> 执行出售
//						> 出售价格
//						> 选择数量
//					->物品数量窗口
//						> 键盘按键情况
//						> 鼠标选择情况
//					->持有数窗口
//					->出售类型窗口
//						->新写窗口
//				->服务员
//					->切换服务员
//					->动作
//						> 欢迎光临
//						> 购买一个物品
//						> 出售一个物品
//						> 余额不足
//				->特殊
//					->倍率/额外价格
//					->交换商店
// 
//		★私有类如下：
//			* Drill_SSh_GoldWindow【金钱窗口】
//			* Drill_SSh_SellCategoryWindow【出售类型窗口】
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.[2018/12/15]，默认本体的代码太烂，每个变量布局都被相互制约。
//			  各窗口初始化全被写死了，如果覆盖某些泛用窗口又会影响其他的菜单。
//			  所以这里采取的全是在初始化之后，修改窗口的各个参数。
//			  有些参数由于内部关系，必须在初始化前就设置好，所以窗口的格式都有一些不同的小变动。（本来想完全统一写法的，现在没办法控制了）
//			（目前知道的最好的方法是继承 window_selectable 并新写9个窗口，展开全部方法，然而现在已经都写出来，晚了）
//			（另外，调整坐标和画素材的我被这个弄炸了……）
//			2.[2020/3/14]，修改了部分结构，可以确定里面的结构有许多部件可以分离到核心中进行统一管理。
//			  但是考虑到该插件功能已经完好，并且不干扰其他插件的条件下，暂时不给这个插件添加太多无关的核心。
//			3. 整理了大部分的窗口。这里有三个待完成的部分：
//				> 选项按钮组的移动（暂时不动）
//				> 数量窗口的排布（强制了行间距，才不会出现绘制切割错位的问题，这里比较麻烦）
//				> 金钱窗口结构（这里虽然用的是自己写的Drill_SSh_GoldWindow，但是金币单位识别仍然存在问题。）
//			4.[2021/4/13]，最近将商店整体代码剖析了一遍。
//			  结构烂的确是情有可原的，因为商店本身的业务逻辑就是不小的工作量，使用简易window快速搭建的确是一个最好的方法。
//
//		★存在的问题：
//			1.商店界面有必要重构分析，因为商店继续下分可以分为各种不同的窗口面板。
//			  包括越买越贵的物品，宝物商店等。	（该问题不再解决，后期使用其他插件进行功能替代）
//	

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SceneShop = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneShop');

	
	//==============================
	// * 变量获取 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SSh_initMenuCursor = function( dataFrom ) {
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

	/*-----------------杂项------------------*/
    DrillUp.g_SSh_layout = String(DrillUp.parameters['资源-整体布局'] || "");
	DrillUp.g_SSh_buyingPer = Number(DrillUp.parameters['默认购买倍率'] || 1);
	DrillUp.g_SSh_sellingPer = Number(DrillUp.parameters['默认出售倍率'] || 0.5);
	
	/*-----------------选项按钮组------------------*/
	DrillUp.g_SSh_btn_start_X = Number(DrillUp.parameters['平移-按钮起点 X'] || 25);
	DrillUp.g_SSh_btn_start_Y = Number(DrillUp.parameters['平移-按钮起点 Y'] || 130); 
	DrillUp.g_SSh_btn_active_usable = String(DrillUp.parameters['是否使用激活按钮移动效果'] || "true") === "true";	
	DrillUp.g_SSh_btn_active_X = Number(DrillUp.parameters['平移-激活的按钮 X'] || 25);
	DrillUp.g_SSh_btn_active_Y = Number(DrillUp.parameters['平移-激活的按钮 Y'] || 130);   
    DrillUp.g_SSh_btn_unselect_opacity = Number(DrillUp.parameters['未选中按钮透明度'] || 160);
	DrillUp.g_SSh_btn_a_zoom = String(DrillUp.parameters['是否使用缩放效果'] || "true") == "true";	
	DrillUp.g_SSh_btn_a_flicker = String(DrillUp.parameters['是否使用闪烁效果'] || "false") == "true";	
    DrillUp.g_SSh_btn_a_float_var = Number(DrillUp.parameters['浮动偏移量'] || 15);
	DrillUp.g_SSh_btn_a_float_lr = String(DrillUp.parameters['是否使用左右浮动'] || "false") == "true";	
	DrillUp.g_SSh_btn_a_float_ud = String(DrillUp.parameters['是否使用上下浮动'] || "false") == "true";	
    DrillUp.g_SSh_btn_1 = String(DrillUp.parameters['资源-购买按钮'] || "");
	DrillUp.g_SSh_btn_1X = Number(DrillUp.parameters['平移-购买按钮 X'] || 370);
	DrillUp.g_SSh_btn_1Y = Number(DrillUp.parameters['平移-购买按钮 Y'] || 210);  
    DrillUp.g_SSh_btn_2 = String(DrillUp.parameters['资源-出售按钮'] || "");
	DrillUp.g_SSh_btn_2X = Number(DrillUp.parameters['平移-出售按钮 X'] || 370);
	DrillUp.g_SSh_btn_2Y = Number(DrillUp.parameters['平移-出售按钮 Y'] || 295);  
    DrillUp.g_SSh_btn_3 = String(DrillUp.parameters['资源-离开按钮'] || "");
	DrillUp.g_SSh_btn_3X = Number(DrillUp.parameters['平移-离开按钮 X'] || 370);
	DrillUp.g_SSh_btn_3Y = Number(DrillUp.parameters['平移-离开按钮 Y'] || 380);  
	
	/*-----------------帮助窗口参数------------------*/
	DrillUp.g_SSh_help_x = Number(DrillUp.parameters['帮助窗口 X'] || 30);
	DrillUp.g_SSh_help_y = Number(DrillUp.parameters['帮助窗口 Y'] || 120);
	DrillUp.g_SSh_help_width = Number(DrillUp.parameters['帮助窗口宽度'] || 220);
	DrillUp.g_SSh_help_height = Number(DrillUp.parameters['帮助窗口高度'] || 460);
	DrillUp.g_SSh_help_fontsize = Number(DrillUp.parameters['帮助窗口字体大小'] || 22);
	if( DrillUp.parameters['帮助窗口移动动画'] != "" &&
		DrillUp.parameters['帮助窗口移动动画'] != undefined ){
		DrillUp.g_SSh_help_slideAnim = JSON.parse( DrillUp.parameters['帮助窗口移动动画'] );
		DrillUp.g_SSh_help_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_help_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_help_slideAnim['slideTime'] = Number(DrillUp.g_SSh_help_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_help_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_help_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_help_slideAnim['slidePosType'] = String(DrillUp.g_SSh_help_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_help_slideAnim['slideX'] = Number(DrillUp.g_SSh_help_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_help_slideAnim['slideY'] = Number(DrillUp.g_SSh_help_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_help_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_help_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_help_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_help_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_help_slideAnim = {};
	}
	if( DrillUp.parameters['帮助窗口布局'] != "" &&
		DrillUp.parameters['帮助窗口布局'] != undefined ){
		DrillUp.g_SSh_help_layout = JSON.parse( DrillUp.parameters['帮助窗口布局'] );
		DrillUp.g_SSh_help_layout['layoutType'] = String(DrillUp.g_SSh_help_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_help_layout['layoutSrc'] = String(DrillUp.g_SSh_help_layout['资源-贴图'] || "");
		DrillUp.g_SSh_help_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_help_layout['layoutX'] = Number(DrillUp.g_SSh_help_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_help_layout['layoutY'] = Number(DrillUp.g_SSh_help_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_help_layout = {};
	}
	
	/*-----------------金钱窗口参数------------------*/
	DrillUp.g_SSh_gold_x = Number(DrillUp.parameters['金钱窗口 X'] || 30);
	DrillUp.g_SSh_gold_y = Number(DrillUp.parameters['金钱窗口 Y'] || 120);
	DrillUp.g_SSh_gold_width = Number(DrillUp.parameters['金钱窗口宽度'] || 220);
	DrillUp.g_SSh_gold_height = Number(DrillUp.parameters['金钱窗口高度'] || 460);
	DrillUp.g_SSh_gold_fontsize = Number(DrillUp.parameters['金钱窗口字体大小'] || 22);
	if( DrillUp.parameters['金钱窗口移动动画'] != "" &&
		DrillUp.parameters['金钱窗口移动动画'] != undefined ){
		DrillUp.g_SSh_gold_slideAnim = JSON.parse( DrillUp.parameters['金钱窗口移动动画'] );
		DrillUp.g_SSh_gold_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_gold_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_gold_slideAnim['slideTime'] = Number(DrillUp.g_SSh_gold_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_gold_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_gold_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_gold_slideAnim['slidePosType'] = String(DrillUp.g_SSh_gold_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_gold_slideAnim['slideX'] = Number(DrillUp.g_SSh_gold_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_gold_slideAnim['slideY'] = Number(DrillUp.g_SSh_gold_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_gold_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_gold_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_gold_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_gold_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_gold_slideAnim = {};
	}
	if( DrillUp.parameters['金钱窗口布局'] != "" &&
		DrillUp.parameters['金钱窗口布局'] != undefined ){
		DrillUp.g_SSh_gold_layout = JSON.parse( DrillUp.parameters['金钱窗口布局'] );
		DrillUp.g_SSh_gold_layout['layoutType'] = String(DrillUp.g_SSh_gold_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_gold_layout['layoutSrc'] = String(DrillUp.g_SSh_gold_layout['资源-贴图'] || "");
		DrillUp.g_SSh_gold_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_gold_layout['layoutX'] = Number(DrillUp.g_SSh_gold_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_gold_layout['layoutY'] = Number(DrillUp.g_SSh_gold_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_gold_layout = {};
	}
	
	/*-----------------购买窗口参数------------------*/
	DrillUp.g_SSh_buy_x = Number(DrillUp.parameters['购买窗口 X'] || 30);
	DrillUp.g_SSh_buy_y = Number(DrillUp.parameters['购买窗口 Y'] || 120);
	DrillUp.g_SSh_buy_width = Number(DrillUp.parameters['购买窗口宽度'] || 220);
	DrillUp.g_SSh_buy_height = Number(DrillUp.parameters['购买窗口高度'] || 460);
	DrillUp.g_SSh_buy_col = Number(DrillUp.parameters['购买窗口列数'] || 1);
	DrillUp.g_SSh_buy_fontsize = Number(DrillUp.parameters['购买窗口字体大小'] || 22);
	if( DrillUp.parameters['购买窗口移动动画'] != "" &&
		DrillUp.parameters['购买窗口移动动画'] != undefined ){
		DrillUp.g_SSh_buy_slideAnim = JSON.parse( DrillUp.parameters['购买窗口移动动画'] );
		DrillUp.g_SSh_buy_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_buy_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_buy_slideAnim['slideTime'] = Number(DrillUp.g_SSh_buy_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_buy_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_buy_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_buy_slideAnim['slidePosType'] = String(DrillUp.g_SSh_buy_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_buy_slideAnim['slideX'] = Number(DrillUp.g_SSh_buy_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_buy_slideAnim['slideY'] = Number(DrillUp.g_SSh_buy_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_buy_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_buy_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_buy_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_buy_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_buy_slideAnim = {};
	}
	if( DrillUp.parameters['购买窗口布局'] != "" && 
		DrillUp.parameters['购买窗口布局'] != undefined ){
		DrillUp.g_SSh_buy_layout = JSON.parse( DrillUp.parameters['购买窗口布局'] );
		DrillUp.g_SSh_buy_layout['layoutType'] = String(DrillUp.g_SSh_buy_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_buy_layout['layoutSrc'] = String(DrillUp.g_SSh_buy_layout['资源-贴图'] || "");
		DrillUp.g_SSh_buy_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_buy_layout['layoutX'] = Number(DrillUp.g_SSh_buy_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_buy_layout['layoutY'] = Number(DrillUp.g_SSh_buy_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_buy_layout = {};
	}
	if( DrillUp.parameters['购买窗口指针与边框'] != "" && 
		DrillUp.parameters['购买窗口指针与边框'] != undefined ){
		var cursor = JSON.parse( DrillUp.parameters['购买窗口指针与边框'] );
		DrillUp.g_SSh_buy_cursor = DrillUp.drill_SSh_initMenuCursor( cursor );
	}else{
		DrillUp.g_SSh_buy_cursor = null;
	}
	
	/*-----------------持有数窗口参数------------------*/
	DrillUp.g_SSh_status_x = Number(DrillUp.parameters['持有数窗口 X'] || 30);
	DrillUp.g_SSh_status_y = Number(DrillUp.parameters['持有数窗口 Y'] || 120);
	DrillUp.g_SSh_status_width = Number(DrillUp.parameters['持有数窗口宽度'] || 220);
	DrillUp.g_SSh_status_height = Number(DrillUp.parameters['持有数窗口高度'] || 460);
	DrillUp.g_SSh_status_fontsize = Number(DrillUp.parameters['持有数窗口字体大小'] || 22);
	if( DrillUp.parameters['持有数窗口移动动画'] != "" &&
		DrillUp.parameters['持有数窗口移动动画'] != undefined ){
		DrillUp.g_SSh_status_slideAnim = JSON.parse( DrillUp.parameters['持有数窗口移动动画'] );
		DrillUp.g_SSh_status_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_status_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_status_slideAnim['slideTime'] = Number(DrillUp.g_SSh_status_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_status_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_status_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_status_slideAnim['slidePosType'] = String(DrillUp.g_SSh_status_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_status_slideAnim['slideX'] = Number(DrillUp.g_SSh_status_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_status_slideAnim['slideY'] = Number(DrillUp.g_SSh_status_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_status_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_status_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_status_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_status_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_status_slideAnim = {};
	}
	if( DrillUp.parameters['持有数窗口布局'] != "" &&
		DrillUp.parameters['持有数窗口布局'] != undefined ){
		DrillUp.g_SSh_status_layout = JSON.parse( DrillUp.parameters['持有数窗口布局'] );
		DrillUp.g_SSh_status_layout['layoutType'] = String(DrillUp.g_SSh_status_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_status_layout['layoutSrc'] = String(DrillUp.g_SSh_status_layout['资源-贴图'] || "");
		DrillUp.g_SSh_status_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_status_layout['layoutX'] = Number(DrillUp.g_SSh_status_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_status_layout['layoutY'] = Number(DrillUp.g_SSh_status_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_status_layout = {};
	}
	
	/*-----------------物品数量窗口参数------------------*/
	DrillUp.g_SSh_number_x = Number(DrillUp.parameters['物品数量窗口 X'] || 30);
	DrillUp.g_SSh_number_y = Number(DrillUp.parameters['物品数量窗口 Y'] || 120);
	DrillUp.g_SSh_number_width = Number(DrillUp.parameters['物品数量窗口宽度'] || 220);
	DrillUp.g_SSh_number_height = Number(DrillUp.parameters['物品数量窗口高度'] || 460);
	DrillUp.g_SSh_number_fontsize = Number(DrillUp.parameters['物品数量窗口字体大小'] || 22);
	if( DrillUp.parameters['物品数量窗口移动动画'] != "" &&
		DrillUp.parameters['物品数量窗口移动动画'] != undefined ){
		DrillUp.g_SSh_number_slideAnim = JSON.parse( DrillUp.parameters['物品数量窗口移动动画'] );
		DrillUp.g_SSh_number_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_number_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_number_slideAnim['slideTime'] = Number(DrillUp.g_SSh_number_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_number_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_number_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_number_slideAnim['slidePosType'] = String(DrillUp.g_SSh_number_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_number_slideAnim['slideX'] = Number(DrillUp.g_SSh_number_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_number_slideAnim['slideY'] = Number(DrillUp.g_SSh_number_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_number_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_number_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_number_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_number_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_number_slideAnim = {};
	}
	if( DrillUp.parameters['物品数量窗口布局'] != "" &&
		DrillUp.parameters['物品数量窗口布局'] != undefined ){
		DrillUp.g_SSh_number_layout = JSON.parse( DrillUp.parameters['物品数量窗口布局'] );
		DrillUp.g_SSh_number_layout['layoutType'] = String(DrillUp.g_SSh_number_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_number_layout['layoutSrc'] = String(DrillUp.g_SSh_number_layout['资源-贴图'] || "");
		DrillUp.g_SSh_number_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_number_layout['layoutX'] = Number(DrillUp.g_SSh_number_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_number_layout['layoutY'] = Number(DrillUp.g_SSh_number_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_number_layout = {};
	}
	
	/*-----------------出售窗口参数------------------*/
	DrillUp.g_SSh_sell_x = Number(DrillUp.parameters['出售窗口 X'] || 30);
	DrillUp.g_SSh_sell_y = Number(DrillUp.parameters['出售窗口 Y'] || 120);
	DrillUp.g_SSh_sell_width = Number(DrillUp.parameters['出售窗口宽度'] || 220);
	DrillUp.g_SSh_sell_height = Number(DrillUp.parameters['出售窗口高度'] || 460);
	DrillUp.g_SSh_sell_col = Number(DrillUp.parameters['出售窗口列数'] || 1);
	DrillUp.g_SSh_sell_fontsize = Number(DrillUp.parameters['出售窗口字体大小'] || 22);
	if( DrillUp.parameters['出售窗口移动动画'] != "" &&
		DrillUp.parameters['出售窗口移动动画'] != undefined ){
		DrillUp.g_SSh_sell_slideAnim = JSON.parse( DrillUp.parameters['出售窗口移动动画'] );
		DrillUp.g_SSh_sell_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_sell_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_sell_slideAnim['slideTime'] = Number(DrillUp.g_SSh_sell_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_sell_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_sell_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_sell_slideAnim['slidePosType'] = String(DrillUp.g_SSh_sell_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_sell_slideAnim['slideX'] = Number(DrillUp.g_SSh_sell_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_sell_slideAnim['slideY'] = Number(DrillUp.g_SSh_sell_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_sell_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_sell_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_sell_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_sell_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_sell_slideAnim = {};
	}
	if( DrillUp.parameters['出售窗口布局'] != "" &&
		DrillUp.parameters['出售窗口布局'] != undefined ){
		DrillUp.g_SSh_sell_layout = JSON.parse( DrillUp.parameters['出售窗口布局'] );
		DrillUp.g_SSh_sell_layout['layoutType'] = String(DrillUp.g_SSh_sell_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_sell_layout['layoutSrc'] = String(DrillUp.g_SSh_sell_layout['资源-贴图'] || "");
		DrillUp.g_SSh_sell_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_sell_layout['layoutX'] = Number(DrillUp.g_SSh_sell_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_sell_layout['layoutY'] = Number(DrillUp.g_SSh_sell_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_sell_layout = {};
	}
	if( DrillUp.parameters['出售窗口指针与边框'] != "" && 
		DrillUp.parameters['出售窗口指针与边框'] != undefined ){
		var cursor = JSON.parse( DrillUp.parameters['出售窗口指针与边框'] );
		DrillUp.g_SSh_sell_cursor = DrillUp.drill_SSh_initMenuCursor( cursor );
	}else{
		DrillUp.g_SSh_sell_cursor = null;
	}
	
	/*-----------------出售类型窗口参数------------------*/
	DrillUp.g_SSh_category_x = Number(DrillUp.parameters['出售类型窗口 X'] || 30);
	DrillUp.g_SSh_category_y = Number(DrillUp.parameters['出售类型窗口 Y'] || 120);
	DrillUp.g_SSh_category_width = Number(DrillUp.parameters['出售类型窗口宽度'] || 220);
	DrillUp.g_SSh_category_height = Number(DrillUp.parameters['出售类型窗口高度'] || 460);
	DrillUp.g_SSh_category_col = Number(DrillUp.parameters['出售类型窗口列数'] || 1);
    DrillUp.g_SSh_category_align  = String(DrillUp.parameters['出售类型对齐方式'] || "left");
	DrillUp.g_SSh_category_fontsize = Number(DrillUp.parameters['出售类型窗口字体大小'] || 22);
	if( DrillUp.parameters['出售类型窗口移动动画'] != "" &&
		DrillUp.parameters['出售类型窗口移动动画'] != undefined ){
		DrillUp.g_SSh_category_slideAnim = JSON.parse( DrillUp.parameters['出售类型窗口移动动画'] );
		DrillUp.g_SSh_category_slideAnim['slideMoveType'] = String(DrillUp.g_SSh_category_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSh_category_slideAnim['slideTime'] = Number(DrillUp.g_SSh_category_slideAnim['移动时长'] || 20);
		DrillUp.g_SSh_category_slideAnim['slideDelay'] = Number(DrillUp.g_SSh_category_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSh_category_slideAnim['slidePosType'] = String(DrillUp.g_SSh_category_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSh_category_slideAnim['slideX'] = Number(DrillUp.g_SSh_category_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSh_category_slideAnim['slideY'] = Number(DrillUp.g_SSh_category_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSh_category_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSh_category_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSh_category_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSh_category_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSh_category_slideAnim = {};
	}
	if( DrillUp.parameters['出售类型窗口布局'] != "" &&
		DrillUp.parameters['出售类型窗口布局'] != undefined ){
		DrillUp.g_SSh_category_layout = JSON.parse( DrillUp.parameters['出售类型窗口布局'] );
		DrillUp.g_SSh_category_layout['layoutType'] = String(DrillUp.g_SSh_category_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSh_category_layout['layoutSrc'] = String(DrillUp.g_SSh_category_layout['资源-贴图'] || "");
		DrillUp.g_SSh_category_layout['layoutSrcFile'] = "img/Menu__shop/";
		DrillUp.g_SSh_category_layout['layoutX'] = Number(DrillUp.g_SSh_category_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSh_category_layout['layoutY'] = Number(DrillUp.g_SSh_category_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSh_category_layout = {};
	}
	if( DrillUp.parameters['出售类型窗口指针与边框'] != "" && 
		DrillUp.parameters['出售类型窗口指针与边框'] != undefined ){
		var cursor = JSON.parse( DrillUp.parameters['出售类型窗口指针与边框'] );
		DrillUp.g_SSh_category_cursor = DrillUp.drill_SSh_initMenuCursor( cursor );
	}else{
		DrillUp.g_SSh_category_cursor = null;
	}
	
	
	//==============================
	// * 变量获取 - 服务员行为
	//				（~struct~DrillSShWaitressAct）
	//==============================
	DrillUp.drill_SSh_convertWaitressAct = function( dataFrom ) {		//服务员行为数据转换
		var data = {};
		data['enable'] = String(dataFrom['是否启用该行为'] || "false") == "true" ;
		data['sustain'] = Number(dataFrom['动作持续时间'] || 60);
		data['delay'] = Number(dataFrom['动作延迟'] || 0);
		data['se'] = String(dataFrom['资源-动作声音'] || "");
		data['gif_src'] = JSON.parse( dataFrom['资源-动作GIF'] || []);
		data['gif_src_file'] = "img/Menu__shop/";
		data['gif_interval'] = Number(dataFrom['帧间隔'] || 4);
		data['gif_back_run'] = String(dataFrom['是否倒放'] || "false") == "true" ;
		data['gif_replay'] = String(dataFrom['GIF到末尾是否重播'] || "true") == "true" ;
		return data;
	}
	//==============================
	// * 变量获取 - 服务员
	//				（~struct~DrillSShWaitress）
	//==============================
	DrillUp.drill_SSh_convertWaitress = function( dataFrom ) {
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
			act_default['gif_src_file'] = "img/Menu__shop/";
			act_default['gif_interval'] = Number(act_default['帧间隔'] || 4);
			act_default['gif_back_run'] = String(act_default['是否倒放'] || "false") == "true" ;
			waitress['act-default'] = act_default;
		}else{
			waitress['act-default'] = {};
		}
		if( dataFrom['行为-欢迎光临'] != "" && 
			dataFrom['行为-欢迎光临'] != undefined ){
			var act = JSON.parse( dataFrom['行为-欢迎光临'] || {} );
			waitress['act-welcome'] = DrillUp.drill_SSh_convertWaitressAct( act );
		}else{
			waitress['act-welcome'] = {};
		}
		if( dataFrom['行为-购买一个物品'] != "" && 
			dataFrom['行为-购买一个物品'] != undefined ){
			var act = JSON.parse( dataFrom['行为-购买一个物品'] || {} );
			waitress['act-buyOne'] = DrillUp.drill_SSh_convertWaitressAct( act );
		}else{
			waitress['act-buyOne'] = {};
		}
		if( dataFrom['行为-出售一个物品'] != "" && 
			dataFrom['行为-出售一个物品'] != undefined ){
			var act = JSON.parse( dataFrom['行为-出售一个物品'] || {} );
			waitress['act-sellOne'] = DrillUp.drill_SSh_convertWaitressAct( act );
		}else{
			waitress['act-sellOne'] = {};
		}
		if( dataFrom['行为-余额不足'] != "" && 
			dataFrom['行为-余额不足'] != undefined ){
			var act = JSON.parse( dataFrom['行为-余额不足'] || {} );
			waitress['act-goldNotEnough'] = DrillUp.drill_SSh_convertWaitressAct( act );
		}else{
			waitress['act-goldNotEnough'] = {};
		}
		if( dataFrom['行为-余额不足(交换物)'] != "" && 
			dataFrom['行为-余额不足(交换物)'] != undefined ){
			var act = JSON.parse( dataFrom['行为-余额不足(交换物)'] || {} );
			waitress['act-itemNotEnough'] = DrillUp.drill_SSh_convertWaitressAct( act );
		}else{
			waitress['act-itemNotEnough'] = {};
		}
		return waitress;
	}
	
	/*-----------------服务员参数------------------*/
	DrillUp.g_SSh_waitress_list_length = 30;
	DrillUp.g_SSh_waitress_list = [];
	for (var i = 0; i < DrillUp.g_SSh_waitress_list_length ; i++ ) {
		if( DrillUp.parameters['服务员-' + String(i+1) ] != "" &&
			DrillUp.parameters['服务员-' + String(i+1) ] != undefined ){
			var waitress_params = JSON.parse(DrillUp.parameters['服务员-' + String(i+1)] );
			DrillUp.g_SSh_waitress_list[i] = DrillUp.drill_SSh_convertWaitress( waitress_params );
		}else{
			DrillUp.g_SSh_waitress_list[i] = DrillUp.drill_SSh_convertWaitress( {} );
		}
	};
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_SenceShop ){
	alert(
		"【Drill_SceneShop.js 面板 - 全自定义商店界面】\n注意，检测到重复的商店插件，请及时去掉旧插件。"
	);
}

if( Imported.Drill_CoreOfWindowAuxiliary && 
	Imported.Drill_CoreOfWaitressSprite ){
	


//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuShop = function(filename) {
    return this.loadBitmap('img/Menu__shop/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_SSh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SSh_pluginCommand.call(this, command, args);
	if( command === ">商店界面" ){
		if(args.length >= 2){
			var type = String(args[1]);
			if( args[3] != undefined ){ var temp1 = String(args[3]); }
			if( args[5] != undefined ){ var temp2 = String(args[5]); }
			
			/*-----------------倍率------------------*/
			if( type == "购买倍率" ){
				$gameSystem._drill_SSh_buy_rate = Number(temp1);
			}
			if( type == "出售倍率" ){
				$gameSystem._drill_SSh_sell_rate = Number(temp1);
			}
			if( type == "购买倍率变量" || type == "购买倍率(变量)" ){
				$gameSystem._drill_SSh_buy_rate = $gameVariables.value(Number(temp1)) / 1000;
			}
			if( type == "出售倍率变量" || type == "出售倍率(变量)" ){
				$gameSystem._drill_SSh_sell_rate = $gameVariables.value(Number(temp1)) / 1000;
			}
			if( type == "倍率恢复默认" ){
				$gameSystem._drill_SSh_buy_rate = DrillUp.g_SSh_buyingPer;
				$gameSystem._drill_SSh_sell_rate = DrillUp.g_SSh_sellingPer;
			}
			
			/*-----------------额外价格------------------*/
			if( type == "购买额外价格" ){
				$gameSystem._drill_SSh_buy_exPrize = Number(temp1);
			}
			if( type == "出售额外价格" ){
				$gameSystem._drill_SSh_sell_exPrize = Number(temp1);
			}
			if( type == "购买额外价格变量" || type == "购买额外价格(变量)" ){
				$gameSystem._drill_SSh_buy_exPrize = $gameVariables.value(Number(temp1));
			}
			if( type == "出售额外价格变量" || type == "出售额外价格(变量)" ){
				$gameSystem._drill_SSh_sell_exPrize = $gameVariables.value(Number(temp1));
			}
			if( type == "额外价格恢复默认" ){
				$gameSystem._drill_SSh_buy_exPrize = 0;
				$gameSystem._drill_SSh_sell_exPrize = 0;
			}
			
			/*-----------------交换商店------------------*/
			if( type == "开启交换商店" ){
				$gameSystem._drill_SSh_exchange_mode = true;
				$gameSystem._drill_SSh_exchange_item = temp1;
				$gameSystem._drill_SSh_exchange_unit = temp2;
			}
			if( type == "关闭交换商店" ){
				$gameSystem._drill_SSh_exchange_mode = false;
			}
			
			/*-----------------服务员------------------*/
			if( type == "当前服务员" ){
				$gameSystem._drill_SSh_waitress_id = Number(temp1);
			}
		}
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
DrillUp.g_SSh_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSh_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SSh_sys_initialize.call(this);
	this.drill_SSh_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSh_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SSh_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SSh_saveEnabled == true ){	
		$gameSystem.drill_SSh_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SSh_initSysData();
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
Game_System.prototype.drill_SSh_initSysData = function() {
	this.drill_SSh_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SSh_checkSysData = function() {
	this.drill_SSh_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SSh_initSysData_Private = function() {
	
	this._drill_SSh_buy_rate = DrillUp.g_SSh_buyingPer;		//购买倍率
	this._drill_SSh_buy_exPrize = 0;						//购买额外价格
	this._drill_SSh_sell_rate = DrillUp.g_SSh_sellingPer;	//出售倍率
	this._drill_SSh_sell_exPrize = 0;						//出售额外价格
	this._drill_SSh_exchange_mode = false;					//交换商店
	this._drill_SSh_exchange_item = 0;						//交换物品
	this._drill_SSh_exchange_unit = "";						//交换单位
	this._drill_SSh_waitress_id = 1;						//服务员
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SSh_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SSh_buy_rate == undefined ){
		this.drill_SSh_initSysData();
	}
	
};


//=============================================================================
// * 商店界面
//=============================================================================
//==============================
// * 商店 - 初始化
//==============================
var _drill_SSh_initialize = Scene_Shop.prototype.initialize;
Scene_Shop.prototype.initialize = function() {
	_drill_SSh_initialize.call(this);
	//暂无
};
//==============================
// * 商店 - 创建（覆写）
//==============================
Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	
    this.createHelpWindow();			//帮助窗口
    this.createGoldWindow();			//金钱窗口
    this.createCommandWindow();			//商店选项按钮窗口
    this.createDummyWindow();			//空白窗口
    this.createNumberWindow();			//物品数量窗口
    this.createStatusWindow();			//持有数窗口
    this.createBuyWindow();				//购买窗口
    this.createCategoryWindow();		//出售类型窗口（物品类型窗口）
    this.createSellWindow();			//出售窗口
	
	this._commandWindow.zIndex = 1;		//窗口显示先后顺序重配
	this._helpWindow.zIndex = 2;		//
	this._buyWindow.zIndex = 3;			//
	this._categoryWindow.zIndex = 4;	//
	this._sellWindow.zIndex = 5;		//
	this._numberWindow.zIndex = 6;		//
	this._statusWindow.zIndex = 7;		//
	this._goldWindow.zIndex = 8;		//
	this.drill_sortByZIndex();			//
	
	this.drill_SSh_createLayout();		//整体布局
	this.drill_SSh_createButtons();		//选项按钮组
	this.drill_SSh_createWaitress();	//服务员
};
//==============================
// * 创建 - 窗口排序
//==============================
Scene_Shop.prototype.drill_sortByZIndex = function() {
	this._windowLayer.children.sort(function(a, b){	//比较器
		if(!a.zIndex ){a.zIndex = 1;}
		if(!b.zIndex ){b.zIndex = 1;}
		return a.zIndex-b.zIndex;
	});
};
//==============================
// * 创建 - 整体布局
//==============================
Scene_Shop.prototype.drill_SSh_createLayout = function() {
	this._layout = new Sprite(ImageManager.load_MenuShop(DrillUp.g_SSh_layout));
	this._drill_SSh_field.addChild(this._layout);	
};
//==============================
// * 创建 - 空白窗口（覆写）
//==============================
Scene_Shop.prototype.createDummyWindow = function() {
    var wy = Graphics.boxHeight * 2;
    var wh = 0;
    this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
	this._dummyWindow.visible = false;
    this.addWindow(this._dummyWindow);
};
//==============================
// * 创建 - 服务员
//==============================
Scene_Shop.prototype.drill_SSh_createWaitress = function() {
	
	var waitress = {};
	if( $gameSystem._drill_SSh_waitress_id > 0 ){
		waitress = DrillUp.g_SSh_waitress_list[ $gameSystem._drill_SSh_waitress_id -1 ];
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
	this._drill_SSh_waitress = new Drill_SSh_WaitressSprite( waitress["act-default"], waitress );
	this._drill_SSh_waitress.drill_COWA_setButtonMove( data );									//辅助核心 - 控制按钮基本属性
	this._drill_SSh_waitress.drill_COWS_pushNewAct("act-welcome", waitress["act-welcome"]);		//服务员核心 - 初始化指令内容
	this._drill_SSh_waitress.drill_COWS_pushNewAct("act-buyOne", waitress["act-buyOne"]);
	this._drill_SSh_waitress.drill_COWS_pushNewAct("act-sellOne", waitress["act-sellOne"]);
	this._drill_SSh_waitress.drill_COWS_pushNewAct("act-goldNotEnough", waitress["act-goldNotEnough"]);
	this._drill_SSh_waitress.drill_COWS_pushNewAct("act-itemNotEnough", waitress["act-itemNotEnough"]);
	
	this._drill_SSh_waitress.drill_COWS_playAct("act-welcome");
	this._drill_SSh_field.addChild(this._drill_SSh_waitress);
}
//==============================
// * 商店 - 窗口最底层
//==============================
var _drill_SSh_createBackground = Scene_Shop.prototype.createBackground;
Scene_Shop.prototype.createBackground = function() {
	_drill_SSh_createBackground.call(this);
	this._drill_SSh_field = new Sprite();
	this.addChild(this._drill_SSh_field);	
}

//==============================
// * 商店 - 帧刷新
//==============================
var _drill_SSh_update = Scene_Shop.prototype.update;
Scene_Shop.prototype.update = function() { 
	_drill_SSh_update.call(this);
	
	this.drill_SSh_updateHelpWindow();				//帧刷新 - 帮助窗口
	this._goldWindow.drill_COWA_CPD_update();		//帧刷新 - 金钱窗口（长期显示）
    this.drill_SSh_updateButtons();					//帧刷新 - 选项按钮组
													//帧刷新 - 空白窗口
	this.drill_SSh_updateNumberWindow();			//帧刷新 - 物品数量窗口
	this._statusWindow.drill_COWA_CPD_update();		//帧刷新 - 持有数窗口（长期显示）
	this.drill_SSh_updateBuyWindow();				//帧刷新 - 购买窗口
	this.drill_SSh_updateCategoryWindow();			//帧刷新 - 出售类型窗口
	this.drill_SSh_updateSellWindow();				//帧刷新 - 出售窗口
	
	// > 输入监听
	this.drill_checkKeyTouch();			//（键盘按键监听）
    if (TouchInput.isTriggered()) {		//（鼠标点击图片监听）
		this.drill_checkImgTouch();
	};
	
	// > 服务员监听（识别金钱不足情况）
	if( this._buyWindow._drill_SSh_goldNotEnough == true ){	
		this._buyWindow._drill_SSh_goldNotEnough = false;
		if( $gameSystem._drill_SSh_exchange_mode == true ){
			this._drill_SSh_waitress.drill_COWS_playAct("act-itemNotEnough");
		}else{
			this._drill_SSh_waitress.drill_COWS_playAct("act-goldNotEnough");
		}
	}
}
//==============================
// * 帧刷新 - 键盘按键监听
//==============================
Scene_Shop.prototype.drill_checkKeyTouch = function() {
	
	//键盘 - 选项按钮组
	if( this._commandWindow.active ){
		if (Input.isRepeated("up")) {this._commandWindow.cursorLeft();SoundManager.playCursor();}
		else if (Input.isRepeated("down")) {this._commandWindow.cursorRight();SoundManager.playCursor();}
	}
}
//==============================
// * 帧刷新 - 鼠标点击图片监听
//==============================
Scene_Shop.prototype.drill_checkImgTouch = function() {
	
	//图片 - 选项按钮组
	if( this._commandWindow.active ){
		for( var i = 0; i < this._drill_SSh_buttons.length; i++ ){
			if( this.drill_SSh_isOnSprite(this._drill_SSh_buttons[i]) ){
				if(this._commandWindow._index != i){	//点击未激活按钮
					SoundManager.playCursor();
					this._commandWindow._index = i;
				}else{	//点击已激活按钮
					SoundManager.playOk();
					this._commandWindow.active = false;
					if( i == 0 ){
						this.commandBuy();
					}
					if( i == 1 ){
						this.commandSell();
					}
					if( i == 2 ){
						this.popScene();
					}
				}
			};
		};
	}
}
//==============================
// * 帧刷新 - 鼠标点击图片监听 - 范围判断
//==============================
Scene_Shop.prototype.drill_SSh_isOnSprite = function( sprite ){
	 if( sprite == null ){ return false };
	 if( sprite.bitmap == null ){ return false };
	 if( !sprite.bitmap.isReady() ){ return false };
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if( sprite.visible === false ){ return false };
	 if( sprite.opacity === 0 ){ return false };
	 if( TouchInput.x < sprite.x - cw ){ return false };
	 if( TouchInput.x > sprite.x + cw ){ return false };
	 if( TouchInput.y < sprite.y - ch ){ return false };
	 if( TouchInput.y > sprite.y + ch ){ return false };
	 return true;	
};


//=============================================================================
// ** 选项按钮组
//
//			说明：	> 原为 商店选项按钮窗口【Window_ShopCommand】。
//					> 只是隐藏了窗口，并未覆写功能。
//=============================================================================
//==============================
// * 选项按钮 - 选项窗口控制（覆写，直接隐藏）
//==============================
Scene_Shop.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ShopCommand(0, this._purchaseOnly);
	this._commandWindow.y = Graphics.boxHeight * 2
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};
//==============================
// * 选项按钮 - 初始化
//==============================
Scene_Shop.prototype.drill_SSh_createButtons = function() {
    this._drill_SSh_buttons = [];
	this._drill_SSh_buttons_data = [];		//建立按钮组
	
	var temp_btn_data1 = {};
	temp_btn_data1['bitmap'] = DrillUp.g_SSh_btn_1;
	temp_btn_data1['org_x'] = DrillUp.g_SSh_btn_1X;
	temp_btn_data1['org_y'] = DrillUp.g_SSh_btn_1Y;
	temp_btn_data1['Ani'] = 0;
	temp_btn_data1['start_x'] = DrillUp.g_SSh_btn_start_X;
	temp_btn_data1['start_y'] = DrillUp.g_SSh_btn_start_Y;
	temp_btn_data1['active_x'] = DrillUp.g_SSh_btn_active_X;
	temp_btn_data1['active_y'] = DrillUp.g_SSh_btn_active_Y;
	this._drill_SSh_buttons_data.push(temp_btn_data1);
	
	var temp_btn_data2 = {};
	temp_btn_data2['bitmap'] = DrillUp.g_SSh_btn_2;
	temp_btn_data2['org_x'] = DrillUp.g_SSh_btn_2X;
	temp_btn_data2['org_y'] = DrillUp.g_SSh_btn_2Y;
	temp_btn_data2['Ani'] = 0;
	temp_btn_data2['start_x'] = DrillUp.g_SSh_btn_start_X;
	temp_btn_data2['start_y'] = DrillUp.g_SSh_btn_start_Y;
	temp_btn_data2['active_x'] = DrillUp.g_SSh_btn_active_X;
	temp_btn_data2['active_y'] = DrillUp.g_SSh_btn_active_Y;
	this._drill_SSh_buttons_data.push(temp_btn_data2);
	
	var temp_btn_data3 = {};
	temp_btn_data3['bitmap'] = DrillUp.g_SSh_btn_3;
	temp_btn_data3['org_x'] = DrillUp.g_SSh_btn_3X;
	temp_btn_data3['org_y'] = DrillUp.g_SSh_btn_3Y;
	temp_btn_data3['Ani'] = 0;
	temp_btn_data3['start_x'] = DrillUp.g_SSh_btn_start_X;
	temp_btn_data3['start_y'] = DrillUp.g_SSh_btn_start_Y;
	temp_btn_data3['active_x'] = DrillUp.g_SSh_btn_active_X;
	temp_btn_data3['active_y'] = DrillUp.g_SSh_btn_active_Y;
	this._drill_SSh_buttons_data.push(temp_btn_data3);
	
    for( var i = 0; i < this._drill_SSh_buttons_data.length ; i++ ){
		temp_btn = new Sprite();
		temp_btn.anchor.x = 0.5;
		temp_btn.anchor.y = 0.5;
		temp_btn.bitmap = ImageManager.load_MenuShop(this._drill_SSh_buttons_data[i]['bitmap']);
		temp_btn.x = this._drill_SSh_buttons_data[i]['start_x'];
		temp_btn.y = this._drill_SSh_buttons_data[i]['start_y'];
		temp_btn.opacity = 255;
		
		this._drill_SSh_buttons.push(temp_btn);
		this._drill_SSh_field.addChild(temp_btn);
	};
	if( this._purchaseOnly ){ this._drill_SSh_buttons[1].visible = false }
};
//==============================
// * 选项按钮 - 右切换选项（覆写）
//==============================
Window_ShopCommand.prototype.cursorRight = function( wrap ){
    this._index += 1;
    if( this._index > 2 ){
		this._index = 0;
    }
	if( this._purchaseOnly && this._index == 1 ){
		this._index += 1;
	}
};
//==============================
// * 选项按钮 - 左切换选项（覆写）
//==============================
Window_ShopCommand.prototype.cursorLeft = function( wrap ){
    this._index -= 1;
    if( this._index < 0 ){
		this._index = 2;
    }
	if( this._purchaseOnly && this._index == 1 ){
		this._index -= 1;
	}
};
//==============================
// * 选项按钮 - 按钮变化效果
//==============================
Scene_Shop.prototype.drill_SSh_updateButtons = function() {
	for(var i = 0; i < this._drill_SSh_buttons.length; i++ ){
		var temp_btn = this._drill_SSh_buttons[i];
		var temp_btn_data = this._drill_SSh_buttons_data[i];
		//alert(JSON.stringify(temp_btn_data));
		
		// > 选择按钮时
		if( this._commandWindow.active ){
			
			// > 选择按钮时 - 当前选中的按钮
			if( this._commandWindow._index === i ){
				// > 缩放效果
				if( DrillUp.g_SSh_btn_a_zoom ){
					if (temp_btn_data['Ani'] === 0) {
						this.drill_SSh_scale_move_to(temp_btn,1.30, 0.01);
						if (temp_btn.scale.x >= 1.30) {
							temp_btn_data['Ani'] = 1; 
						};
					} else  {
						this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
						if (temp_btn.scale.x <= 1.00) {
							temp_btn_data['Ani'] = 0; 
						};				 
					};
				}
				// > 闪烁效果
				if( DrillUp.g_SSh_btn_a_flicker ){
					if (temp_btn_data['Ani'] === 0) {
						this.drill_SSh_opacity_move_to(temp_btn,255, 10);
						if (temp_btn.opacity >= 255) {
							temp_btn_data['Ani'] = 1; 
						};
					} else  {
						this.drill_SSh_opacity_move_to(temp_btn,30, 10);
						if (temp_btn.opacity <= 30) {
							temp_btn_data['Ani'] = 0; 
						};				 
					};
				}else{
					this.drill_SSh_opacity_move_to(temp_btn,255,20); 
				}
				
				// > 左右浮动效果
				var target_x = temp_btn_data['org_x'];
				var target_y = temp_btn_data['org_y'];
				var target_slow = false;
				if( DrillUp.g_SSh_btn_a_float_lr ){		//（距离判定）
					if( Math.abs(temp_btn.x - target_x) + Math.abs(temp_btn.y - target_y) < DrillUp.g_SSh_btn_a_float_var * 4.15 ){
						if (temp_btn_data['Ani'] === 0) {
							target_x = temp_btn_data['org_x'] + DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.x - target_x) <= 1) {
								temp_btn_data['Ani'] = 1; 
							};
						} else  {
							target_x = temp_btn_data['org_x'] - DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.x - target_x) <= 1) {
								temp_btn_data['Ani'] = 0; 
							};
						};
						target_slow = true;
					}
				}
				// > 按钮上下效果
				if( DrillUp.g_SSh_btn_a_float_ud ){		//（距离判定）
					if( Math.abs(temp_btn.x - target_x) + Math.abs(temp_btn.y - target_y) < DrillUp.g_SSh_btn_a_float_var * 4.15 ){
						if (temp_btn_data['Ani'] === 0) {
							target_y = temp_btn_data['org_y'] + DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.y - target_y) <= 1) {
								temp_btn_data['Ani'] = 1; 
							};
						} else  {
							target_y = temp_btn_data['org_y'] - DrillUp.g_SSh_btn_a_float_var;
							if ( Math.abs(temp_btn.y - target_y) <= 1) {
								temp_btn_data['Ani'] = 0; 
							};
						};
						target_slow = true;
					}
				}
				if( target_slow ){
					this.drill_SSh_button_move_to(temp_btn,target_x,target_y,1.2);
				}else{
					this.drill_SSh_button_move_to(temp_btn,target_x,target_y,7);
				}
				
			// > 选择按钮时 - 当前未选中的按钮（半隐藏）
			}else{
				temp_btn_data['Ani'] = 0
				this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_SSh_opacity_move_to(temp_btn,DrillUp.g_SSh_btn_unselect_opacity,4); 
				this.drill_SSh_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
			};
			
		// > 激活按钮时（移动效果）
		}else{
			if( DrillUp.g_SSh_btn_active_usable ){
				if( this._commandWindow._index === i ){	//激活的按钮
					temp_btn_data['Ani'] = 0; 
					this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
					this.drill_SSh_opacity_move_to(temp_btn,255,20); 
					this.drill_SSh_button_move_to(temp_btn,temp_btn_data['active_x'],temp_btn_data['active_y'],10);
					
				}else{		//未激活的按钮（隐藏）
					temp_btn_data['Ani'] = 0
					this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
					this.drill_SSh_opacity_move_to(temp_btn,0,15); 
					this.drill_SSh_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
				};
			}else{
				temp_btn_data['Ani'] = 0
				this.drill_SSh_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_SSh_opacity_move_to(temp_btn,0,15); 
				this.drill_SSh_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
			}
		}
	};
};

//==============================
// * 选项按钮 - 变化函数
//==============================
Scene_Shop.prototype.drill_SSh_button_move_to = function( sprite,x,y,speed ){
	var dx = sprite.x - x;
	var dy = sprite.y - y;
	if( dx < 0 ){ sprite.x += speed; }
	if( dx > 0 ){ sprite.x -= speed; }
	if( dy < 0 ){ sprite.y += speed; }
	if( dy > 0 ){ sprite.y -= speed; }
		
	if( Math.abs(dx) <= speed ){ sprite.x = x; }
	if( Math.abs(dy) <= speed ){ sprite.y = y; }
}
Scene_Shop.prototype.drill_SSh_opacity_move_to = function( sprite,o,speed ){
	var d_o = sprite.opacity - o;
	if( d_o < 0 ){ sprite.opacity += speed; }
	if( d_o > 0 ){ sprite.opacity -= speed; }
		
	if( Math.abs(d_o) <= speed ){ sprite.opacity = o; }
}
Scene_Shop.prototype.drill_SSh_scale_move_to = function( sprite,s,speed ){
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
	sprite.scale.y = sprite.scale.x;
}


//=============================================================================
// ** 帮助窗口
//=============================================================================
//==============================
// * 帮助窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createHelpWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_help_x,
		"y": DrillUp.g_SSh_help_y,
		"width": DrillUp.g_SSh_help_width,
		"height": DrillUp.g_SSh_help_height,
		"fontsize": DrillUp.g_SSh_help_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_help_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_help_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_help_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_help_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_help_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_help_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_help_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_help_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_help_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_help_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_help_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_help_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_help_layout['layoutSrcFile'],
	}
	this._helpWindow = new Window_Help(0,0,0,0);
	this._helpWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	
	this._helpWindow.close();
	this.addWindow(this._helpWindow);
}
//==============================
// * 帮助窗口 - 帧刷新
//==============================
Scene_Shop.prototype.drill_SSh_updateHelpWindow = function() {
	this._helpWindow.drill_COWA_CPD_update();
	
	//出售窗口 / 购买窗口 激活时显示
	if( this._sellWindow.active || 
		this._buyWindow.active || 
		this._numberWindow.active ){
		this._helpWindow.open();
	}else{
		this._helpWindow.close();
		if( this._helpWindow.openness <= 0 ){
			this._helpWindow.drill_COWA_CPD_resetMove();
		}
	}
}


//=============================================================================
// ** 金钱窗口
//=============================================================================
//==============================
// * 金钱窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createGoldWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_gold_x,
		"y": DrillUp.g_SSh_gold_y,
		"width": DrillUp.g_SSh_gold_width,
		"height": DrillUp.g_SSh_gold_height,
		"fontsize": DrillUp.g_SSh_gold_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_gold_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_gold_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_gold_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_gold_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_gold_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_gold_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_gold_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_gold_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_gold_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_gold_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_gold_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_gold_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_gold_layout['layoutSrcFile'],
	}
	this._goldWindow = new Drill_SSh_GoldWindow(0,0,0,0);
	this._goldWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性

	this._goldWindow.refresh();	
	this.addWindow(this._goldWindow);
};
//=============================================================================
// ** 金钱窗口【Drill_SSh_GoldWindow】
//
//=============================================================================
//==============================
// * 金钱窗口 - 定义
//==============================
function Drill_SSh_GoldWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SSh_GoldWindow.prototype = Object.create(Window_Base.prototype);
Drill_SSh_GoldWindow.prototype.constructor = Drill_SSh_GoldWindow;
//==============================
// * 金钱窗口 - 初始化
//==============================
Drill_SSh_GoldWindow.prototype.initialize = function(x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
};
//==============================
// * 金钱窗口 - 帧刷新
//==============================
Drill_SSh_GoldWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
};
//==============================
// * 金钱窗口 - 刷新内容
//==============================
Drill_SSh_GoldWindow.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	
	this.drill_drawCurrencyValue( this.value(), this.currencyUnit(), x, 0, width);	//货币单位，强制右对齐
};
//==============================
// * 金钱窗口 - 打开
//==============================
Drill_SSh_GoldWindow.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};
//==============================
// * 金钱窗口 - 数量值
//==============================
Drill_SSh_GoldWindow.prototype.value = function() {
	if( $gameSystem._drill_SSh_exchange_mode ){
		// > 交换物数
		return $gameParty.numItems( $dataItems[$gameSystem._drill_SSh_exchange_item ] );
	}else{
		// > 金币数
		return $gameParty.gold();
	}
};
//==============================
// * 金钱窗口 - 绘制货币内容
//==============================
Drill_SSh_GoldWindow.prototype.drill_drawCurrencyValue = function(value, unit, x, y, width) {
	if( $gameSystem._drill_SSh_exchange_mode ){
		// > 交换物绘制
		var unitWidth = Math.min(32, this.drill_COWA_getTextWidth(unit));
		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawTextEx(unit, x + width - unitWidth, y );
	}else{
		// > 金币绘制
		var unitWidth = Math.min(80, this.drill_COWA_getTextWidth(unit));
		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
	}
};
//==============================
// * 金钱窗口 - 货币单位
//==============================
Drill_SSh_GoldWindow.prototype.currencyUnit = function() {
	if( $gameSystem._drill_SSh_exchange_mode ){
		// > 交换物单位
		return this.convertEscapeCharacters($gameSystem._drill_SSh_exchange_unit);
	}else{
		// > 金币单位
		return TextManager.currencyUnit;
	}
};



//=============================================================================
// ** 购买窗口
//=============================================================================
//==============================
// * 购买窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createBuyWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_buy_x,
		"y": DrillUp.g_SSh_buy_y,
		"width": DrillUp.g_SSh_buy_width,
		"height": DrillUp.g_SSh_buy_height,
		"fontsize": DrillUp.g_SSh_buy_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_buy_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_buy_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_buy_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_buy_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_buy_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_buy_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_buy_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_buy_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_buy_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_buy_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_buy_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_buy_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_buy_layout['layoutSrcFile'],
	}
    this._buyWindow = new Window_ShopBuy(0, 0, 0, this._goods);
	this._buyWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._buyWindow.maxCols = function(){ return DrillUp.g_SSh_buy_col;}
	this._buyWindow.hide = function(){ return null;}			//禁止默认控制隐藏
	
	// > 兼容【Drill_MenuCursor 主菜单 - 多样式菜单指针】
	if( Imported.Drill_MenuCursor == true && DrillUp.g_SSh_buy_cursor != null ){
		this._buyWindow.drill_MCu_cursorEnabled = function(){
			return DrillUp.g_SSh_buy_cursor['MCu_enabled'];
		}
		this._buyWindow.drill_MCu_cursorStyleId = function(){
			if( DrillUp.g_SSh_buy_cursor['MCu_lock'] == true ){
				return DrillUp.g_SSh_buy_cursor['MCu_style'];
			}else{
				return $gameSystem._drill_MCu_style;
			}
		}
	}
	// > 兼容【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
	if( Imported.Drill_MenuCursorBorder == true && DrillUp.g_SSh_buy_cursor != null ){
		this._buyWindow.drill_MCB_glimmerRectVisible = function() {
			return DrillUp.g_SSh_buy_cursor['MCB_rectEnabled'];
		}
		this._buyWindow.drill_MCB_borderEnabled = function() {
			return DrillUp.g_SSh_buy_cursor['MCB_enabled'];
		}
		this._buyWindow.drill_MCB_borderStyleId = function() {
			if( DrillUp.g_SSh_buy_cursor['MCB_lock'] == true ){
				return DrillUp.g_SSh_buy_cursor['MCB_style'];
			}else{
				return $gameSystem._drill_MCB_style;
			}
		}
	}
	// > 兼容【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
	if( Imported.Drill_MenuScrollBar == true && DrillUp.g_SSh_buy_cursor != null ){
		this._buyWindow.drill_MSB_scrollBarEnabled = function() {
			return DrillUp.g_SSh_buy_cursor['MSB_enabled'];
		}
		this._buyWindow.drill_MSB_scrollBarStyleId = function() {
			if( DrillUp.g_SSh_buy_cursor['MSB_lock'] == true ){
				return DrillUp.g_SSh_buy_cursor['MSB_style'];
			}else{
				return $gameSystem._drill_MSB_style;
			}
		}
	}
	
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this._buyWindow.refresh();
	this._buyWindow.close();
    this.addWindow(this._buyWindow);
};
//==============================
// * 购买窗口 - 帧刷新
//==============================
Scene_Shop.prototype.drill_SSh_updateBuyWindow = function() {
	this._buyWindow.drill_COWA_CPD_update();
	
	// 窗口激活/物品数量激活 时显示
	if(  this._buyWindow.active ||
		(this._numberWindow.active && this._commandWindow._index === 0 ) ){
		this._buyWindow.open();
	}else{
		this._buyWindow.close();
		if( this._buyWindow.openness <= 0 ){
			this._buyWindow.drill_COWA_CPD_resetMove();
		}
	}
}	

//==============================
// * 购买窗口 - 执行购买（覆写）
//==============================
Scene_Shop.prototype.doBuy = function(number) {
	this._drill_SSh_waitress.drill_COWS_playAct("act-buyOne");
	if( $gameSystem._drill_SSh_exchange_mode ){
		$gameParty.loseItem($dataItems[$gameSystem._drill_SSh_exchange_item], number*this.buyingPrice() );
	}else{
		$gameParty.loseGold(number * this.buyingPrice() );
	}
    $gameParty.gainItem(this._item, number);
};
//==============================
// * 购买窗口 - 购买价格（覆写）
//==============================
Window_ShopBuy.prototype.price = function(item) {
	var price = this._price[this._data.indexOf(item)] || 0;
	if( price == 0 ){ return 0; }		//价格为0的不能卖
	
	var result = Math.ceil( price * $gameSystem._drill_SSh_buy_rate );
	result += $gameSystem._drill_SSh_buy_exPrize;
	return result;
};
//==============================
// * 购买窗口 - 金钱不足
//==============================
var _drill_SSh_buy_processOk = Window_ShopBuy.prototype.processOk;
Window_ShopBuy.prototype.processOk = function() {
	_drill_SSh_buy_processOk.call(this);
    if( !this.isCurrentItemEnabled() ){
        this._drill_SSh_goldNotEnough = true;
    }
};



//=============================================================================
// ** 持有数窗口
//=============================================================================
//==============================
// * 持有数窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createStatusWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_status_x,
		"y": DrillUp.g_SSh_status_y,
		"width": DrillUp.g_SSh_status_width,
		"height": DrillUp.g_SSh_status_height,
		"fontsize": DrillUp.g_SSh_status_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_status_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_status_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_status_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_status_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_status_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_status_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_status_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_status_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_status_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_status_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_status_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_status_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_status_layout['layoutSrcFile'],
	}
    this._statusWindow = new Window_ShopStatus(0, 0, 0, 0);
	this._statusWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._statusWindow.hide = function(){ return null;}		//禁止默认控制隐藏
	
    this._statusWindow.refresh();
    this.addWindow(this._statusWindow);
};
//==============================
// * 持有数窗口 - 内容刷新
//==============================
var _drill_SSh_Status_refresh = Window_ShopStatus.prototype.refresh;
Window_ShopStatus.prototype.refresh = function() {
	_drill_SSh_Status_refresh.call(this);
	this.drill_COWA_CPD_resetMove();
};


//=============================================================================
// ** 物品数量窗口
//=============================================================================
//==============================
// * 物品数量窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createNumberWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_number_x,
		"y": DrillUp.g_SSh_number_y,
		"width": DrillUp.g_SSh_number_width,
		"height": DrillUp.g_SSh_number_height,
		"fontsize": DrillUp.g_SSh_number_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_number_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_number_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_number_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_number_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_number_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_number_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_number_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_number_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_number_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_number_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_number_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_number_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_number_layout['layoutSrcFile'],
	}
    this._numberWindow = new Window_ShopNumber(0, 0, 0);
    this._numberWindow.lineHeight = function(){ return DrillUp.g_SSh_number_fontsize + 4;}		//强制修正间距
	this._numberWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
    this._numberWindow.hide = function(){ this._drill_SSh_enabled = false; return null;}
	
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
	this._numberWindow.close();
    this._numberWindow.refresh();
    this.addWindow(this._numberWindow);
};
//==============================
// * 物品数量窗口 - 帧刷新
//==============================
Scene_Shop.prototype.drill_SSh_updateNumberWindow = function() {
	this._numberWindow.drill_COWA_CPD_update();
	
	// 只激活时显示
	if( this._numberWindow.active ){
		this._numberWindow.open();	
		this._numberWindow._drill_SSh_enabled = true;
	}else{
		this._numberWindow.close();
		if( this._numberWindow.openness <= 0 ){
			this._numberWindow.drill_COWA_CPD_resetMove();
		}
	}
}	

//==============================
// * 物品数量窗口 - 总价计算（覆写）
//==============================
Window_ShopNumber.prototype.drawTotalPrice = function() {
    var total = this._price * this._number;
    var width = this.contentsWidth() - this.textPadding();
	
	if( $gameSystem._drill_SSh_exchange_mode ){
		// >交换物的 总价
		this.drawCurrencyValue(total, this.convertEscapeCharacters($gameSystem._drill_SSh_exchange_unit), 0, this.priceY(), width);
	}else{
		this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
	}
};
//==============================
// * 物品数量窗口 - 绘制货币内容
//==============================
var _drill_SSh_n_drawCurrencyValue = Window_ShopNumber.prototype.drawCurrencyValue;
Window_ShopNumber.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    if( $gameSystem._drill_SSh_exchange_mode ){
		var unitWidth = Math.min( 80, this.drill_COWA_getTextWidth(unit) );
		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawTextEx(unit, x + width - unitWidth + 5, y-5 );		//修改货币单位为图标
	}else{
		_drill_SSh_n_drawCurrencyValue.call(this,value, unit, x, y, width);
	}
};
//=============================================================================
// * 物品数量窗口 - bug修复
//
//				说明：	未激活物品数量窗口时，不允许再次购买/出售。
//=============================================================================
//==============================
// * 物品数量窗口 - bug修复 - 限制场景执行事件
//==============================
var _drill_SSh_onNumberOk = Scene_Shop.prototype.onNumberOk;
Scene_Shop.prototype.onNumberOk = function() {
	if( this._numberWindow._drill_SSh_enabled != true ){ 
		this.endNumberInput();
		this._goldWindow.refresh();
		this._statusWindow.refresh();
		return;
	}
	_drill_SSh_onNumberOk.call(this);
}
//==============================
// * 物品数量窗口 - bug修复 - 限制物品数量窗口事件
//==============================
var _drill_SSh_n_onButtonUp = Window_ShopNumber.prototype.onButtonUp;
Window_ShopNumber.prototype.onButtonUp = function() {
	if( this._drill_SSh_enabled != true ){ return; }
	_drill_SSh_n_onButtonUp.call(this);
};
var _drill_SSh_n_onButtonUp2 = Window_ShopNumber.prototype.onButtonUp2;
Window_ShopNumber.prototype.onButtonUp2 = function() {
	if( this._drill_SSh_enabled != true ){ return; }
	_drill_SSh_n_onButtonUp2.call(this);
};
var _drill_SSh_n_onButtonDown = Window_ShopNumber.prototype.onButtonDown;
Window_ShopNumber.prototype.onButtonDown = function() {
	if( this._drill_SSh_enabled != true ){ return; }
	_drill_SSh_n_onButtonDown.call(this);
};
var _drill_SSh_n_onButtonDown2 = Window_ShopNumber.prototype.onButtonDown2;
Window_ShopNumber.prototype.onButtonDown2 = function() {
	if( this._drill_SSh_enabled != true ){ return; }
	_drill_SSh_n_onButtonDown2.call(this);
};
var _drill_SSh_n_onButtonOk = Window_ShopNumber.prototype.onButtonOk;
Window_ShopNumber.prototype.onButtonOk = function() {
	if( this._drill_SSh_enabled != true ){ return; }
	_drill_SSh_n_onButtonOk.call(this);
};


//=============================================================================
// ** 出售窗口
//=============================================================================
//==============================
// * 出售窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createSellWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_sell_x,
		"y": DrillUp.g_SSh_sell_y,
		"width": DrillUp.g_SSh_sell_width,
		"height": DrillUp.g_SSh_sell_height,
		"fontsize": DrillUp.g_SSh_sell_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_sell_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_sell_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_sell_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_sell_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_sell_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_sell_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_sell_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_sell_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_sell_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_sell_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_sell_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_sell_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_sell_layout['layoutSrcFile'],
	}
    this._sellWindow = new Window_ShopSell(0, 0, 0, 0);
	this._sellWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._sellWindow.maxCols = function(){ return DrillUp.g_SSh_sell_col;}
	this._sellWindow.hide = function(){ return null;}			//禁止默认控制隐藏
	
	// > 兼容【Drill_MenuCursor 主菜单 - 多样式菜单指针】
	if( Imported.Drill_MenuCursor == true && DrillUp.g_SSh_sell_cursor != null ){
		this._sellWindow.drill_MCu_cursorEnabled = function(){
			return DrillUp.g_SSh_sell_cursor['MCu_enabled'];
		}
		this._sellWindow.drill_MCu_cursorStyleId = function(){
			if( DrillUp.g_SSh_sell_cursor['MCu_lock'] == true ){
				return DrillUp.g_SSh_sell_cursor['MCu_style'];
			}else{
				return $gameSystem._drill_MCu_style;
			}
		}
	}
	// > 兼容【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
	if( Imported.Drill_MenuCursorBorder == true && DrillUp.g_SSh_sell_cursor != null ){
		this._sellWindow.drill_MCB_glimmerRectVisible = function() {
			return DrillUp.g_SSh_sell_cursor['MCB_rectEnabled'];
		}
		this._sellWindow.drill_MCB_borderEnabled = function() {
			return DrillUp.g_SSh_sell_cursor['MCB_enabled'];
		}
		this._sellWindow.drill_MCB_borderStyleId = function() {
			if( DrillUp.g_SSh_sell_cursor['MCB_lock'] == true ){
				return DrillUp.g_SSh_sell_cursor['MCB_style'];
			}else{
				return $gameSystem._drill_MCB_style;
			}
		}
	}
	// > 兼容【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
	if( Imported.Drill_MenuScrollBar == true && DrillUp.g_SSh_sell_cursor != null ){
		this._sellWindow.drill_MSB_scrollBarEnabled = function() {
			return DrillUp.g_SSh_sell_cursor['MSB_enabled'];
		}
		this._sellWindow.drill_MSB_scrollBarStyleId = function() {
			if( DrillUp.g_SSh_sell_cursor['MSB_lock'] == true ){
				return DrillUp.g_SSh_sell_cursor['MSB_style'];
			}else{
				return $gameSystem._drill_MSB_style;
			}
		}
	}
	
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this._sellWindow.refresh();
	this._sellWindow.close();
    this.addWindow(this._sellWindow);
};
//==============================
// * 出售窗口 - 帧刷新
//==============================
Scene_Shop.prototype.drill_SSh_updateSellWindow = function() {
	this._sellWindow.drill_COWA_CPD_update();
	
	// 窗口激活/物品数量激活 时显示
	if(  this._sellWindow.active ||
		(this._numberWindow.active && this._commandWindow._index === 1 ) ){
		this._sellWindow.open();
	}else{
		this._sellWindow.close();
		if( this._sellWindow.openness <= 0 ){
			this._sellWindow.drill_COWA_CPD_resetMove();
		}
	}
}	
//==============================
// * 出售窗口 - 执行出售（覆写）
//==============================
Scene_Shop.prototype.doSell = function(number) {
	this._drill_SSh_waitress.drill_COWS_playAct("act-sellOne");
	if( $gameSystem._drill_SSh_exchange_mode ){
		$gameParty.gainItem($dataItems[$gameSystem._drill_SSh_exchange_item], number*this.sellingPrice() );
	}else{
		$gameParty.gainGold(number * this.sellingPrice());
	}
    $gameParty.loseItem(this._item, number);
};
//==============================
// * 出售窗口 - 出售价格（覆写）
//==============================
Scene_Shop.prototype.sellingPrice = function() {
	var price = this._item.price || 0;
	if( price == 0 ){ return 0; }		//价格为0的不能卖
	
	var result = Math.ceil( price * $gameSystem._drill_SSh_sell_rate );
	result += $gameSystem._drill_SSh_sell_exPrize;
	return result;
};


//=============================================================================
// ** 出售类型窗口
//=============================================================================
//==============================
// * 出售类型窗口 - 创建（覆写）
//==============================
Scene_Shop.prototype.createCategoryWindow = function() {
	var data = {
		"x": DrillUp.g_SSh_category_x,
		"y": DrillUp.g_SSh_category_y,
		"width": DrillUp.g_SSh_category_width,
		"height": DrillUp.g_SSh_category_height,
		"fontsize": DrillUp.g_SSh_category_fontsize,
		
		"slideMoveType": DrillUp.g_SSh_category_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSh_category_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSh_category_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSh_category_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSh_category_slideAnim['slideX'],
		"slideY": DrillUp.g_SSh_category_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSh_category_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSh_category_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSh_category_layout['layoutType'],
		"layoutX": DrillUp.g_SSh_category_layout['layoutX'],
		"layoutY": DrillUp.g_SSh_category_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSh_category_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSh_category_layout['layoutSrcFile'],
	}
    this._categoryWindow = new Drill_SSh_SellCategoryWindow();
	this._categoryWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._categoryWindow.maxCols = function(){ return DrillUp.g_SSh_category_col;}
	
	// > 兼容【Drill_MenuCursor 主菜单 - 多样式菜单指针】
	if( Imported.Drill_MenuCursor == true && DrillUp.g_SSh_category_cursor != null ){
		this._categoryWindow.drill_MCu_cursorEnabled = function(){
			return DrillUp.g_SSh_category_cursor['MCu_enabled'];
		}
		this._categoryWindow.drill_MCu_cursorStyleId = function(){
			if( DrillUp.g_SSh_category_cursor['MCu_lock'] == true ){
				return DrillUp.g_SSh_category_cursor['MCu_style'];
			}else{
				return $gameSystem._drill_MCu_style;
			}
		}
	}
	// > 兼容【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
	if( Imported.Drill_MenuCursorBorder == true && DrillUp.g_SSh_category_cursor != null ){
		this._categoryWindow.drill_MCB_glimmerRectVisible = function() {
			return DrillUp.g_SSh_category_cursor['MCB_rectEnabled'];
		}
		this._categoryWindow.drill_MCB_borderEnabled = function() {
			return DrillUp.g_SSh_category_cursor['MCB_enabled'];
		}
		this._categoryWindow.drill_MCB_borderStyleId = function() {
			if( DrillUp.g_SSh_category_cursor['MCB_lock'] == true ){
				return DrillUp.g_SSh_category_cursor['MCB_style'];
			}else{
				return $gameSystem._drill_MCB_style;
			}
		}
	}
	
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
    this._categoryWindow.refresh();
	this._categoryWindow.close();
    this.addWindow(this._categoryWindow);
};
//==============================
// * 出售类型窗口 - 帧刷新
//==============================
Scene_Shop.prototype.drill_SSh_updateCategoryWindow = function() {
	this._categoryWindow.drill_COWA_CPD_update();
	
	//只激活时显示
	if( this._categoryWindow.active ){
		this._categoryWindow.open();	
	}else{
		this._categoryWindow.close();
		if( this._categoryWindow.openness <= 0 ){
			this._categoryWindow.drill_COWA_CPD_resetMove();
		}
	}
}	
//=============================================================================
// ** 出售类型窗口【Drill_SSh_SellCategoryWindow】
//
//=============================================================================
//==============================
// * 出售类型窗口 - 定义
//==============================
function Drill_SSh_SellCategoryWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SSh_SellCategoryWindow.prototype = Object.create(Window_Command.prototype);
Drill_SSh_SellCategoryWindow.prototype.constructor = Drill_SSh_SellCategoryWindow;
//==============================
// * 出售类型窗口 - 初始化
//==============================
Drill_SSh_SellCategoryWindow.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};
//==============================
// * 出售类型窗口 - 帧刷新
//==============================
Drill_SSh_SellCategoryWindow.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};
//==============================
// * 出售类型窗口 - 类型列表
//==============================
Drill_SSh_SellCategoryWindow.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');
    this.addCommand(TextManager.keyItem, 'keyItem');
};
//==============================
// * 出售类型窗口 - 基本属性
//==============================
Drill_SSh_SellCategoryWindow.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};
Drill_SSh_SellCategoryWindow.prototype.itemTextAlign = function() {
    return DrillUp.g_SSh_category_align;
};


//=============================================================================
// ** 服务员
//=============================================================================
//==============================
// * 服务员 - 定义（继承 服务员核心）
//==============================
function Drill_SSh_WaitressSprite() {
	this.initialize.apply(this, arguments);
}
Drill_SSh_WaitressSprite.prototype = Object.create(Drill_COWS_WaitressSprite.prototype);
Drill_SSh_WaitressSprite.prototype.constructor = Drill_SSh_WaitressSprite;

//==============================
// * 服务员 - 初始化
//==============================
Drill_SSh_WaitressSprite.prototype.initialize = function( default_act_data, data ) {
	Drill_COWS_WaitressSprite.prototype.initialize.call(this, default_act_data);
	this._drill_data = data;
	this.opacity = 0;		//透明度
};
//==============================
// * 服务员 - 帧刷新
//==============================
Drill_SSh_WaitressSprite.prototype.update = function() {
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
		Imported.Drill_SceneShop = false;
		alert(
			"【Drill_SceneShop.js 面板 - 全自定义商店界面】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心" +
			"\n- Drill_CoreOfWaitressSprite 主菜单-服务员核心"
		);
}



