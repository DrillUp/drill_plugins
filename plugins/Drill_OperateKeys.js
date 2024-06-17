//=============================================================================
// Drill_OperateKeys.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        键盘 - 键盘手柄按键修改器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_OperateKeys +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以修改 方向键、确定键、取消键、加速键 等逻辑按键。
 * ★★必须放在 "作用于" 的所有插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 你也可以对下列插件有选择地添加，实现特定的功能按键控制。
 * 作用于：
 *   - Drill_Jump               互动-跳跃能力
 *   - Drill_RotateDirection    互动-原地转向能力
 *   - Drill_PickThrow          互动-举起花盆能力
 *   - Drill_BombCore           炸弹人-游戏核心
 *   - Drill_SpeedGear          管理器-变速齿轮
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   直接修改游戏的所有 键盘与手柄 的逻辑按键。
 * 2.你需要了解基本的按键定义，去看看 "1.系统 > 关于输入设备核心.docx"。
 *   全部按键关系，可以去看看章节 按键关系表 。
 * 键盘与手柄:
 *   (1.物理按键：指真实世界键盘上/手柄上存在的按键，比如z,x,c,v键等。
 *      逻辑按键：指游戏中用于划分特定功能的按键，比如确定键,取消键,跳跃键等。
 *   (2.手柄使用 单键 或 功能键+单键 的设置。
 *      由于手柄的键位少，所以功能键只能固定一个。
 *   (3.键盘使用 单键 或 A键+B键 的设置。
 *      设置可以非常灵活，任意一个或两个键都可以触发相同功能。
 *   (4.注意，该插件有可能覆盖掉其他插件的某些自定义按键设置，你需要调整一
 *      下插件先后位置。如果按键仍然不起效果，那么只能做插件取舍了。
 * 基本键/扩展键：
 *   (1.基本键和扩展键都属于 逻辑按键。
 *   (2.基本键的键位 相互 必须不重复，若重复则出现按键失效情况。
 *   (3.扩展键的键位 相互 可以重复，同一个键位表示多个逻辑按键，可节约按键，
 *      但是要注意对应键起效的时机，场景等情况。
 * 键盘的物理按键：
 *   (1.你可以设置特殊的键盘按键，可以填入以下字符关键字：
 *       Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
 *       ~ - = [ ] \ ; ' , . /
 *       Tab Shift Ctrl Alt Backspace 上 下 左 右 空格 Enter
 *       PageUp PageDown End Home Insert Delete
 *   (2.小键盘：
 *       Num0 Num1 Num2 Num3 Num4 Num5 Num6 Num7 Num8 Num9
 *       Num* Num+ Num- Num. Num/ NumEnter
 *   (3.注意，如果你想配置键盘的 空格，那么要填"空格"，而不是" "。
 * 手柄的物理按键：
 *   (1.你可以设置手柄按键，可以填入以下字符关键字：
 *       A B X Y LB RB LT RT
 *       SELECT START 左摇杆按键 右摇杆按键 上 下 左 右
 * 加速键：
 *   (1.插件中有各种各样的加速键设置，详细可以去看看文档：
 *      "1.系统 > 关于输入设备核心.docx" 的 所有加速键 章节。
 * 设计：
 *   (1.你可以通过插件指令设置方向键翻转，做成arpg的"混乱"状态效果。
 *      倒置效果在所有界面中都有效，包括 菜单界面 按键倒置。
 *      注意离开地图后，要随时恢复此效果，防止被永久翻转了。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改手柄键位
 * 你可以通过下列插件指令修改键位：
 * 
 * 插件指令：>按键修改器 : 手柄-确定键 : 设置按键["A"]
 * 插件指令：>按键修改器 : 手柄-确定键 : 清空按键
 * 插件指令：>按键修改器 : 手柄-确定键 : 恢复默认
 * 
 * 插件指令：>按键修改器 : 手柄-确定键 : 设置按键["A"]
 * 插件指令：>按键修改器 : 手柄-取消键 : 设置按键["LB"]
 * 插件指令：>按键修改器 : 手柄-加速键 : 设置按键["X"]
 * 插件指令：>按键修改器 : 手柄-上一页 : 设置按键["LT"]
 * 插件指令：>按键修改器 : 手柄-下一页 : 设置按键["RT"]
 * 插件指令：>按键修改器 : 手柄-上 : 设置按键["上"]
 * 插件指令：>按键修改器 : 手柄-下 : 设置按键["下"]
 * 插件指令：>按键修改器 : 手柄-左 : 设置按键["左"]
 * 插件指令：>按键修改器 : 手柄-右 : 设置按键["右"]
 * 插件指令：>按键修改器 : 手柄-功能键 : 设置按键["RB"]
 * 插件指令：>按键修改器 : 手柄-菜单键 : 设置按键["Y"]
 * 插件指令：>按键修改器 : 手柄-跳跃键 : 设置按键["X"]
 * 插件指令：>按键修改器 : 手柄-原地转向键 : 设置按键["功能键 + 十字键"]
 * 插件指令：>按键修改器 : 手柄-举起花盆键 : 设置按键["A"]
 * 插件指令：>按键修改器 : 手柄-投掷花盆键 : 设置按键["A"]
 * 插件指令：>按键修改器 : 手柄-放置炸弹键 : 设置按键["功能键 + X"]
 * 
 * 插件指令：>按键修改器 : 手柄-全部恢复默认设置
 * 
 * 1.前半部分（手柄-确定键）和 后半部分（设置按键["A"]）
 *   的参数可以随意组合。一共有3*16种组合方式。
 * 2.手柄的键位只能一对一，修改后永久有效。
 *   按键必须是 参数配置中 可以用的物理按键，
 *   注意，基本键不能重复，扩展键可以重复。
 * 3.每个键位都需要用引号隔开，中文引号英文引号都可以。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改键盘键位
 * 你可以通过下列插件指令修改键位：
 * 
 * 插件指令：>按键修改器 : 键盘-确定键 : 全部键位["f","g","h"]
 * 插件指令：>按键修改器 : 键盘-确定键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-确定键 : 去除按键["f"]
 * 插件指令：>按键修改器 : 键盘-确定键 : 恢复默认
 * 
 * 插件指令：>按键修改器 : 键盘-确定键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-取消键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-加速键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-上一页 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-下一页 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-上 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-下 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-左 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-右 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-辅助Tab键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-游戏测试中Debug键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-游戏测试中穿墙键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-游戏测试中游戏加速键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-菜单键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-跳跃键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-原地转向键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-举起花盆键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-投掷花盆键 : 添加按键["f"]
 * 插件指令：>按键修改器 : 键盘-放置炸弹键 : 添加按键["f"]
 * 
 * 插件指令：>按键修改器 : 键盘-全部恢复默认设置
 * 
 * 1.前半部分（键盘-确定键）和 后半部分（添加按键["f"]）
 *   的参数可以随意组合。一共有3*19种组合方式。
 * 2.键盘的键位为一对多，是一个数组集合，修改后永久有效。
 *   按键大写小写都能被识别。
 *   注意，基本键不能重复，扩展键可以重复。
 * 3."全部键位[]"中填入多个键位，需要用逗号隔开，中文逗号英文逗号都可以。
 *   每个键位都需要用引号隔开，中文引号英文引号都可以。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 倒置效果
 * 你可以通过下列插件指令随机倒置方向键：
 *
 * 插件指令：>按键修改器 : 倒置效果 : 方向翻转
 * 插件指令：>按键修改器 : 倒置效果 : 方向右旋置换
 * 插件指令：>按键修改器 : 倒置效果 : 方向随机混乱
 * 插件指令：>按键修改器 : 倒置效果 : 恢复方向
 *
 * 1.设置后对 键盘和手柄 都有效果，并且键盘配置的多个方向键，同样也起倒置效果。
 *   倒置效果在菜单界面也有效。
 * 2.注意，倒置效果是独立的功能设置，
 *   "键盘-全部恢复默认设置" 和 "手柄-全部恢复默认设置" 不能恢复方向。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 键盘DEBUG
 * 你可以通过插件指令对键盘设备进行Debug操作。
 * 
 * 插件指令：>按键修改器 : 显示键盘DEBUG窗口-逻辑按键
 * 插件指令：>按键修改器 : 关闭键盘DEBUG窗口-逻辑按键
 * 
 * 1.注意，Debug窗口显示的为 逻辑按键。
 *   物理按键窗口去看插件 Drill_CoreOfInput 输入设备核心 。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 手柄DEBUG
 * 你可以通过插件指令对手柄设备进行Debug操作。
 * 
 * 插件指令：>按键修改器 : 显示手柄DEBUG窗口-逻辑按键
 * 插件指令：>按键修改器 : 关闭手柄DEBUG窗口-逻辑按键
 * 
 * 1.注意，Debug窗口显示的为 逻辑按键。
 *   物理按键窗口去看插件 Drill_CoreOfInput 输入设备核心 。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n^2)
 * 测试方法：   直接去键盘管理层转一圈即可。
 * 测试结果：   200个事件的地图中，消耗为：【10.92ms】
 *              100个事件的地图中，消耗为：【11.87ms】
 *               50个事件的地图中，消耗为：【11.34ms】
 * 测试方法2：  在其它界面中进行性能测试。
 * 测试结果2：  战斗界面中，消耗为：【10.17ms】
 *              菜单界面中，消耗为：【6.13ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 加入了放置炸弹按键设置。
 * [v1.2]
 * 修复了与跳跃插件相关时，长按鼠标却不自动跳跃的bug。
 * 修复了设置A + B两个键时，只按A键就起效的bug。
 * [v1.3]
 * 漏了esc键位设置，已加上。
 * [v1.4]
 * 把设定的所有键位都加上，防止其他插件使用特殊按键时没有效果。
 * [v1.5]
 * 添加了插件性能测试说明。
 * [v1.6]
 * 修复了tab物理按键无效的bug，感谢群友"sacredbless"。
 * [v1.7]
 * 修改了插件分类。
 * [v1.8]
 * 优化了旧存档的识别与兼容。
 * [v1.9]
 * 大幅度优化了内部结构，添加了 游戏测试时 按键加速的功能。
 * 
 * 
 * @param ----手柄基本键----
 * @default 
 *
 * @param 手柄-确定键
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的确定键。注意，基本键的键位不可重复。
 * @default A
 *
 * @param 手柄-取消键
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的取消键。注意，基本键的键位不可重复。
 * @default B
 *
 * @param 手柄-加速键
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的加速键。注意，基本键的键位不可重复。
 * @default LB
 *
 * @param 手柄-上一页
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的上一页键。注意，基本键的键位不可重复。
 * @default LT
 *
 * @param 手柄-下一页
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的下一页键。注意，基本键的键位不可重复。
 * @default RT
 *
 * @param 手柄-上
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的上键。注意，基本键的键位不可重复。
 * @default 上
 *
 * @param 手柄-下
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的下键。注意，基本键的键位不可重复。
 * @default 下
 *
 * @param 手柄-左
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的左键。注意，基本键的键位不可重复。
 * @default 左
 *
 * @param 手柄-右
 * @parent ----手柄基本键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的右键。注意，基本键的键位不可重复。
 * @default 右
 *
 *
 * @param ----手柄扩展键----
 * @default 
 *
 * @param 手柄-功能键
 * @parent ----手柄扩展键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @desc 手柄的功能键，用于扩展按键。
 * @default RB
 *
 * @param 手柄-菜单键
 * @parent ----手柄扩展键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 功能键 + A
 * @value 功能键 + A
 * @option 功能键 + B
 * @value 功能键 + B
 * @option 功能键 + X
 * @value 功能键 + X
 * @option 功能键 + Y
 * @value 功能键 + Y
 * @option 功能键 + LB
 * @value 功能键 + LB
 * @option 功能键 + RB
 * @value 功能键 + RB
 * @option 功能键 + LT
 * @value 功能键 + LT
 * @option 功能键 + RT
 * @value 功能键 + RT
 * @option 功能键 + SELECT
 * @value 功能键 + SELECT
 * @option 功能键 + START
 * @value 功能键 + START
 * @option 功能键 + 左摇杆按键
 * @value 功能键 + 左摇杆按键
 * @option 功能键 + 右摇杆按键
 * @value 功能键 + 右摇杆按键
 * @desc 手柄对应的游戏中的菜单键。
 * @default Y
 *
 * @param 手柄-跳跃键
 * @parent ----手柄扩展键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 功能键 + A
 * @value 功能键 + A
 * @option 功能键 + B
 * @value 功能键 + B
 * @option 功能键 + X
 * @value 功能键 + X
 * @option 功能键 + Y
 * @value 功能键 + Y
 * @option 功能键 + LB
 * @value 功能键 + LB
 * @option 功能键 + RB
 * @value 功能键 + RB
 * @option 功能键 + LT
 * @value 功能键 + LT
 * @option 功能键 + RT
 * @value 功能键 + RT
 * @option 功能键 + SELECT
 * @value 功能键 + SELECT
 * @option 功能键 + START
 * @value 功能键 + START
 * @option 功能键 + 左摇杆按键
 * @value 功能键 + 左摇杆按键
 * @option 功能键 + 右摇杆按键
 * @value 功能键 + 右摇杆按键
 * @desc 手柄对应的游戏中的跳跃按键。需要插件【互动-跳跃能力】。
 * @default X
 *
 * @param 手柄-原地转向键
 * @parent ----手柄扩展键----
 * @type select
 * @option 十字键
 * @value 十字键
 * @option 功能键 + 十字键
 * @value 功能键 + 十字键
 * @desc 单独的十字键，表示必须要按住功能键才能走，否则只能原地转向。需要插件【互动-原地转向能力】。
 * @default 功能键 + 十字键
 *
 * @param 手柄-举起花盆键
 * @parent ----手柄扩展键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 功能键 + A
 * @value 功能键 + A
 * @option 功能键 + B
 * @value 功能键 + B
 * @option 功能键 + X
 * @value 功能键 + X
 * @option 功能键 + Y
 * @value 功能键 + Y
 * @option 功能键 + LB
 * @value 功能键 + LB
 * @option 功能键 + RB
 * @value 功能键 + RB
 * @option 功能键 + LT
 * @value 功能键 + LT
 * @option 功能键 + RT
 * @value 功能键 + RT
 * @option 功能键 + SELECT
 * @value 功能键 + SELECT
 * @option 功能键 + START
 * @value 功能键 + START
 * @option 功能键 + 左摇杆按键
 * @value 功能键 + 左摇杆按键
 * @option 功能键 + 右摇杆按键
 * @value 功能键 + 右摇杆按键
 * @desc 举起花盆对应的按键。需要插件【互动-举起花盆能力】。
 * @default A
 *
 * @param 手柄-投掷花盆键
 * @parent ----手柄扩展键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 功能键 + A
 * @value 功能键 + A
 * @option 功能键 + B
 * @value 功能键 + B
 * @option 功能键 + X
 * @value 功能键 + X
 * @option 功能键 + Y
 * @value 功能键 + Y
 * @option 功能键 + LB
 * @value 功能键 + LB
 * @option 功能键 + RB
 * @value 功能键 + RB
 * @option 功能键 + LT
 * @value 功能键 + LT
 * @option 功能键 + RT
 * @value 功能键 + RT
 * @option 功能键 + SELECT
 * @value 功能键 + SELECT
 * @option 功能键 + START
 * @value 功能键 + START
 * @option 功能键 + 左摇杆按键
 * @value 功能键 + 左摇杆按键
 * @option 功能键 + 右摇杆按键
 * @value 功能键 + 右摇杆按键
 * @desc 投掷花盆对应的按键。需要插件【互动-举起花盆能力】。
 * @default A
 *
 * @param 手柄-放置炸弹键
 * @parent ----手柄扩展键----
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 功能键 + A
 * @value 功能键 + A
 * @option 功能键 + B
 * @value 功能键 + B
 * @option 功能键 + X
 * @value 功能键 + X
 * @option 功能键 + Y
 * @value 功能键 + Y
 * @option 功能键 + LB
 * @value 功能键 + LB
 * @option 功能键 + RB
 * @value 功能键 + RB
 * @option 功能键 + LT
 * @value 功能键 + LT
 * @option 功能键 + RT
 * @value 功能键 + RT
 * @option 功能键 + SELECT
 * @value 功能键 + SELECT
 * @option 功能键 + START
 * @value 功能键 + START
 * @option 功能键 + 左摇杆按键
 * @value 功能键 + 左摇杆按键
 * @option 功能键 + 右摇杆按键
 * @value 功能键 + 右摇杆按键
 * @desc 放置炸弹对应的按键。需要插件【炸弹人-游戏核心】。
 * @default 功能键 + X
 *
 *
 * @param ----键盘基本键----
 * @default 
 *
 * @param 键盘-确定键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["z","Enter","空格","NumEnter"]
 *
 * @param 键盘-取消键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["x","Esc","Num0"]
 *
 * @param 键盘-加速键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["Shift"]
 *
 * @param 键盘-上一页
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["q","a","PageUp"]
 *
 * @param 键盘-下一页
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["w","s","PageDown"]
 *
 * @param 键盘-上
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["上","Num8"]
 *
 * @param 键盘-下
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["下","Num2"]
 *
 * @param 键盘-左
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["左","Num4"]
 *
 * @param 键盘-右
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["右","Num6"]
 *
 * @param 键盘-辅助Tab键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 在游戏中并不起实际作用，而是辅助于其它插件的接口tab按键。
 * @default ["Tab"]
 *
 * @param 键盘-游戏测试中Debug键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["F9"]
 *
 * @param 键盘-游戏测试中穿墙键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。
 * @default ["Ctrl"]
 *
 * @param 键盘-游戏测试中游戏加速键
 * @parent ----键盘基本键----
 * @type text[]
 * @desc 只能填单个字符或者单个键盘特殊按键。注意，基本键的键位不可重复。需要插件【管理器-变速齿轮】。
 * @default ["Alt"]
 *
 *
 * @param ----键盘扩展键----
 * @default 
 *
 * @param 键盘-菜单键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边可有空格。填入字符或者键盘特殊按键。
 * @default ["x","d","Esc","Num0"]
 *
 * @param 键盘-跳跃键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边可有空格。填入字符或者键盘特殊按键。需要插件【互动-跳跃能力】。
 * @default ["q","a"]
 *
 * @param 键盘-原地转向键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 键盘对应的游戏中的原地转向键。只能 单键。按住相应字符，与上下左右配合，角色只原地转向。需要插件【互动-原地转向能力】。
 * @default ["w","s"]
 *
 * @param 键盘-举起花盆键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边可有空格。填入字符或者键盘特殊按键。需要插件【互动-举起花盆能力】。
 * @default ["z"]
 *
 * @param 键盘-投掷花盆键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边可有空格。填入字符或者键盘特殊按键。需要插件【互动-举起花盆能力】。
 * @default ["z"]
 *
 * @param 键盘-放置炸弹键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边可有空格。填入字符或者键盘特殊按键。需要插件【炸弹人-游戏核心】。
 * @default ["c"]
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		OKe（Operate_Keys）
//		临时全局变量	DrillUp.g_OKe_xxxx
//		临时局部变量	$gameTemp._drill_OKe_xxx
//		存储数据变量	$gameSystem._drill_OKe_xxx
//		全局存储变量	无
//		覆盖重写方法	Input.gamepadMapper 变量
//						Input.keyMapper 变量
//						Scene_Map.prototype.isMenuCalled
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	键盘管理层
//		★性能测试消耗	17.0ms（drill_OKe_isGamepadControling）2.2ms（drill_OKe_isBombTriggered）2.2ms（drill_bean_isTriggered）
//		★最坏情况		无
//		★备注			不好测，低消耗有时候找的到，有时候找不到。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆管辖权
//
//			->☆手柄键位控制
//				->物理按键映射
//				->映射数据
//					> 基本键
//					> 扩展键
//				->正向逻辑映射
//				->反向逻辑映射
//					->合并重复映射
//			->手柄配置 实体类【Drill_OKe_PadBean】
//
//			->☆键盘键位控制
//				->物理按键映射
//				->映射数据
//					> 基本键
//					> 扩展键
//				->正向逻辑映射
//				->反向逻辑映射
//					->合并重复映射
//			->键盘配置 实体类【Drill_OKe_KeyboardBean】
//
//			->☆逻辑按键条件判定
//				->按键判断
//					->手柄
//						->单键
//						->功能键+单键
//					->键盘
//						->单键
//						->A键+B键
//				->手柄功能键 按键阻塞
//					->不阻塞标记
//					> 确定键
//					> 取消键
//					> 上一页
//					> 下一页
//				> 菜单键
//				> 游戏加速键
//				> 跳跃键
//				> 原地转向键
//				> 举起花盆键
//				> 投掷花盆键
//				> 放置炸弹键
//
//			->☆倒置效果
//			->手柄DEBUG窗口【Drill_OKe_PadDebugWindow】
//			->键盘DEBUG窗口【Drill_OKe_KeyboardDebugWindow】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于输入设备核心（脚本）.docx
//		
//		★插件私有类：
//			* 手柄配置 实体类【Drill_OKe_PadBean】
//			* 键盘配置 实体类【Drill_OKe_KeyboardBean】
//		
//		★必要注意事项：
//			1.插件运行过程如下：
//				静态数据 > 映射数据 > 生成映射（反向逻辑映射/正向逻辑映射）
//			  首先，不能破坏原有的键位顺序。（原有的菜单键又可分离可重合）
//			  整合之后，还要考虑 功能键+单键 / A键+B键 情况。
//			  如果键位少了，需要重新利用，添加新的字段，比如"jump"字段等。	
//			2.【rpg_core内核通过 isTriggered("jump") 关键字来映射按钮，多个按钮可以触发同一个关键字"jump"，但是反之不能。】
//			  【为了使得同一个按钮可以触发不同情况，在不同功能写 isTriggered("jump")来判断就可以了。】	
//			3.要添加 自定义逻辑按键 ，继承此函数的方法即可，详细可以参考插件 Drill_OperateKeyCommonEvent 。
//			
//		★其它说明细节：
//			1.yep局限性：yep的按键功能比较健全，但是代价是不可将两个键设置在同一键位上。比如举起花盆与确定键 可重合 也可分离，yep无法做到这一点。
//			2.input特殊属性：'escape'键 =  'menu'键 + 'cancel'键
//			3.这里 手柄控制的原地转向 与 键盘的原地转向 设置有偏差。（手柄毕竟没有那么多键位）
//
//		★存在的问题：
//			1.问题：如果有新的按键内容加入，必须根据脚本依葫芦画瓢。没有合适的接口，只能硬编码。
//			  解决：【未解决】
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_OKe_PluginTip_curName = "Drill_OperateKeys.js 键盘-键盘手柄按键修改器";
	DrillUp.g_OKe_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 重复键检查
	//==============================
	DrillUp.drill_OKe_getPluginTip_HasRepeat_gamepad = function(){
		return "【" + DrillUp.g_OKe_PluginTip_curName + "】\n手柄检测到重复的基本键设置，一些按键可能会无法使用。";
	};
	//==============================
	// * 提示信息 - 报错 - 重复键检查
	//==============================
	DrillUp.drill_OKe_getPluginTip_HasRepeat_keyboard = function(){
		return "【" + DrillUp.g_OKe_PluginTip_curName + "】\n键盘检测到重复的基本键设置，一些按键可能会无法使用。";
	};
	//==============================
	// * 提示信息 - 报错 - 基本键检查
	//==============================
	DrillUp.drill_OKe_getPluginTip_IsBaseKey_gamepad = function( name ){
		return "【" + DrillUp.g_OKe_PluginTip_curName + "】\n手柄 基本键 "+name+"不能设置为 功能键+单键 的格式，只能为 单键 。";
	};
	//==============================
	// * 提示信息 - 报错 - 基本键检查
	//==============================
	DrillUp.drill_OKe_getPluginTip_IsBaseKey_keyboard = function( name ){
		return "【" + DrillUp.g_OKe_PluginTip_curName + "】\n键盘 基本键 "+name+"不能设置为 A键+B键 的格式，只能为 单键 。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_OperateKeys = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_OperateKeys');


	/*-----------------手柄 基本键------------------*/
    DrillUp.g_OKe_pad_ok = String(DrillUp.parameters['手柄-确定键'] || "A");
    DrillUp.g_OKe_pad_cancel = String(DrillUp.parameters['手柄-取消键'] || "B");
    DrillUp.g_OKe_pad_shift = String(DrillUp.parameters['手柄-加速键'] || "LB");
    DrillUp.g_OKe_pad_pageup = String(DrillUp.parameters['手柄-上一页'] || "LT");
    DrillUp.g_OKe_pad_pagedown = String(DrillUp.parameters['手柄-下一页'] || "RT");
    DrillUp.g_OKe_pad_up = String(DrillUp.parameters['手柄-上'] || "上");
    DrillUp.g_OKe_pad_down = String(DrillUp.parameters['手柄-下'] || "下");
    DrillUp.g_OKe_pad_left = String(DrillUp.parameters['手柄-左'] || "左");
    DrillUp.g_OKe_pad_right = String(DrillUp.parameters['手柄-右'] || "右");
	
	/*-----------------手柄 扩展键------------------*/
    DrillUp.g_OKe_pad_fn = String(DrillUp.parameters['手柄-功能键'] || "RB");
    DrillUp.g_OKe_pad_menu = String(DrillUp.parameters['手柄-菜单键'] || "Y");
    DrillUp.g_OKe_pad_jump = String(DrillUp.parameters['手柄-跳跃键'] || "X");
    DrillUp.g_OKe_pad_rotate = String(DrillUp.parameters['手柄-原地转向键'] || "功能键 + 十字键");
    DrillUp.g_OKe_pad_pick = String(DrillUp.parameters['手柄-举起花盆键'] || "A");
    DrillUp.g_OKe_pad_throw = String(DrillUp.parameters['手柄-投掷花盆键'] || "A");
    DrillUp.g_OKe_pad_bomb = String(DrillUp.parameters['手柄-放置炸弹键'] || "功能键 + X");
	
	
	/*-----------------键盘 基本键------------------*/
	if( DrillUp.parameters['键盘-确定键'] != undefined &&
		DrillUp.parameters['键盘-确定键'] != "" ){ 
		DrillUp.g_OKe_keyboard_ok = JSON.parse(DrillUp.parameters['键盘-确定键']);
	}else{
		DrillUp.g_OKe_keyboard_ok = [];
	}
	if( DrillUp.parameters['键盘-取消键'] != undefined &&
		DrillUp.parameters['键盘-取消键'] != "" ){ 
		DrillUp.g_OKe_keyboard_cancel = JSON.parse(DrillUp.parameters['键盘-取消键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_cancel = [];
	}
	if( DrillUp.parameters['键盘-加速键'] != undefined &&
		DrillUp.parameters['键盘-加速键'] != "" ){ 
		DrillUp.g_OKe_keyboard_shift = JSON.parse(DrillUp.parameters['键盘-加速键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_shift = [];
	}
	if( DrillUp.parameters['键盘-上一页'] != undefined &&
		DrillUp.parameters['键盘-上一页'] != "" ){ 
		DrillUp.g_OKe_keyboard_pageup = JSON.parse(DrillUp.parameters['键盘-上一页']); 
	}else{ 
		DrillUp.g_OKe_keyboard_pageup = [];
	}
	if( DrillUp.parameters['键盘-下一页'] != undefined &&
		DrillUp.parameters['键盘-下一页'] != "" ){ 
		DrillUp.g_OKe_keyboard_pagedown = JSON.parse(DrillUp.parameters['键盘-下一页']); 
	}else{ 
		DrillUp.g_OKe_keyboard_pagedown = [];
	}
	if( DrillUp.parameters['键盘-上'] != undefined && 
		DrillUp.parameters['键盘-上'] != "" ){ 
		DrillUp.g_OKe_keyboard_up = JSON.parse(DrillUp.parameters['键盘-上']); 
	}else{ 
		DrillUp.g_OKe_keyboard_up = [];
	}
	if( DrillUp.parameters['键盘-下'] != undefined && 
		DrillUp.parameters['键盘-下'] != "" ){ 
		DrillUp.g_OKe_keyboard_down = JSON.parse(DrillUp.parameters['键盘-下']); 
	}else{ 
		DrillUp.g_OKe_keyboard_down = [];
	}
	if( DrillUp.parameters['键盘-左'] != undefined && 
		DrillUp.parameters['键盘-左'] != "" ){ 
		DrillUp.g_OKe_keyboard_left = JSON.parse(DrillUp.parameters['键盘-左']); 
	}else{ 
		DrillUp.g_OKe_keyboard_left = [];
	}
	if( DrillUp.parameters['键盘-右'] != undefined && 
		DrillUp.parameters['键盘-右'] != "" ){ 
		DrillUp.g_OKe_keyboard_right = JSON.parse(DrillUp.parameters['键盘-右']); 
	}else{ 
		DrillUp.g_OKe_keyboard_right = [];
	}
	if( DrillUp.parameters['键盘-辅助Tab键'] != undefined && 
		DrillUp.parameters['键盘-辅助Tab键'] != "" ){ 
		DrillUp.g_OKe_keyboard_tab = JSON.parse(DrillUp.parameters['键盘-辅助Tab键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_tab = [];
	}
	if( DrillUp.parameters['键盘-游戏测试中Debug键'] != undefined && 
		DrillUp.parameters['键盘-游戏测试中Debug键'] != "" ){ 
		DrillUp.g_OKe_keyboard_debug = JSON.parse(DrillUp.parameters['键盘-游戏测试中Debug键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_debug = [];
	}
	if( DrillUp.parameters['键盘-游戏测试中穿墙键'] != undefined && 
		DrillUp.parameters['键盘-游戏测试中穿墙键'] != "" ){ 
		DrillUp.g_OKe_keyboard_control = JSON.parse(DrillUp.parameters['键盘-游戏测试中穿墙键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_control = [];
	}
	if( DrillUp.parameters['键盘-游戏测试中游戏加速键'] != undefined && 
		DrillUp.parameters['键盘-游戏测试中游戏加速键'] != "" ){ 
		DrillUp.g_OKe_keyboard_speedGear = JSON.parse(DrillUp.parameters['键盘-游戏测试中游戏加速键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_speedGear = [];
	}
	
	/*-----------------键盘 扩展键------------------*/
	if( DrillUp.parameters['键盘-菜单键'] != undefined && 
		DrillUp.parameters['键盘-菜单键'] != "" ){ 
		DrillUp.g_OKe_keyboard_menu = JSON.parse(DrillUp.parameters['键盘-菜单键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_menu = [];
	}
	if( DrillUp.parameters['键盘-跳跃键'] != undefined && 
		DrillUp.parameters['键盘-跳跃键'] != "" ){ 
		DrillUp.g_OKe_keyboard_jump = JSON.parse(DrillUp.parameters['键盘-跳跃键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_jump = [];
	}
	if( DrillUp.parameters['键盘-原地转向键'] != undefined && 
		DrillUp.parameters['键盘-原地转向键'] != "" ){ 
		DrillUp.g_OKe_keyboard_rotate = JSON.parse(DrillUp.parameters['键盘-原地转向键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_rotate = [];
	}
	if( DrillUp.parameters['键盘-举起花盆键'] != undefined && 
		DrillUp.parameters['键盘-举起花盆键'] != "" ){ 
		DrillUp.g_OKe_keyboard_pick = JSON.parse(DrillUp.parameters['键盘-举起花盆键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_pick = [];
	}
	if( DrillUp.parameters['键盘-投掷花盆键'] != undefined && 
		DrillUp.parameters['键盘-投掷花盆键'] != "" ){ 
		DrillUp.g_OKe_keyboard_throw = JSON.parse(DrillUp.parameters['键盘-投掷花盆键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_throw = [];
	}
	if( DrillUp.parameters['键盘-放置炸弹键'] != undefined && 
		DrillUp.parameters['键盘-放置炸弹键'] != "" ){ 
		DrillUp.g_OKe_keyboard_bomb = JSON.parse(DrillUp.parameters['键盘-放置炸弹键']); 
	}else{ 
		DrillUp.g_OKe_keyboard_bomb = [];
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_OKe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_OKe_pluginCommand.call(this,command, args);
	if( command === ">按键修改器" || command === ">按键修改" ){
		
		/*-----------------修改手柄键位------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "手柄-全部恢复默认设置" ){
				$gameSystem.drill_OKe_pad_setKeyStrAllDefault();
				$gameTemp.drill_OKe_gamePadKeys_RefreshData();		//手柄 - 映射数据 初始化
				$gameTemp.drill_OKe_gamePadKeys_RefreshMapper();	//手柄 - 映射数据 生成映射
				return;
			}
		}
		if( args.length >= 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1.indexOf("手柄-") != -1 ){
				var argStr_list = [];
				for(var i = 3; i < args.length; i++ ){	//（合并后面的空格）
					argStr_list.push( String(args[i]) );
				}
				var temp2 = argStr_list.join(" ");
				if( temp2.indexOf("设置按键[") != -1 ){
					temp2 = temp2.replace("设置按键[","");
					temp2 = temp2.replace("]","");
					temp2 = temp2.replace(/[\"“”]/g,"");
					
					if( temp1 == "手柄-确定键" ){ $gameSystem._drill_OKe_pad_ok = temp2; }
					if( temp1 == "手柄-取消键" ){ $gameSystem._drill_OKe_pad_cancel = temp2; }
					if( temp1 == "手柄-加速键" ){ $gameSystem._drill_OKe_pad_shift = temp2; }
					if( temp1 == "手柄-上一页" ){ $gameSystem._drill_OKe_pad_pageup = temp2; }
					if( temp1 == "手柄-下一页" ){ $gameSystem._drill_OKe_pad_pagedown = temp2; }
					if( temp1 == "手柄-上" ){ $gameSystem._drill_OKe_pad_up = temp2; }
					if( temp1 == "手柄-下" ){ $gameSystem._drill_OKe_pad_down = temp2; }
					if( temp1 == "手柄-左" ){ $gameSystem._drill_OKe_pad_left = temp2; }
					if( temp1 == "手柄-右" ){ $gameSystem._drill_OKe_pad_right = temp2; }
					
					if( temp1 == "手柄-功能键" ){ $gameSystem._drill_OKe_pad_fn = temp2; }
					if( temp1 == "手柄-菜单键" ){ $gameSystem._drill_OKe_pad_menu = temp2; }
					if( temp1 == "手柄-跳跃键" ){ $gameSystem._drill_OKe_pad_jump = temp2; }
					if( temp1 == "手柄-原地转向键" ){ $gameSystem._drill_OKe_pad_rotate = temp2; }
					if( temp1 == "手柄-举起花盆键" ){ $gameSystem._drill_OKe_pad_pick = temp2; }
					if( temp1 == "手柄-投掷花盆键" ){ $gameSystem._drill_OKe_pad_throw = temp2; }
					if( temp1 == "手柄-放置炸弹键" ){ $gameSystem._drill_OKe_pad_bomb = temp2; }
					
					$gameTemp.drill_OKe_gamePadKeys_RefreshData();		//手柄 - 映射数据 初始化
					$gameTemp.drill_OKe_gamePadKeys_RefreshMapper();	//手柄 - 映射数据 生成映射
				}
				if( temp2 == "清空按键" ){
					
					if( temp1 == "手柄-确定键" ){ $gameSystem._drill_OKe_pad_ok = ""; }
					if( temp1 == "手柄-取消键" ){ $gameSystem._drill_OKe_pad_cancel = ""; }
					if( temp1 == "手柄-加速键" ){ $gameSystem._drill_OKe_pad_shift = ""; }
					if( temp1 == "手柄-上一页" ){ $gameSystem._drill_OKe_pad_pageup = ""; }
					if( temp1 == "手柄-下一页" ){ $gameSystem._drill_OKe_pad_pagedown = ""; }
					if( temp1 == "手柄-上" ){ $gameSystem._drill_OKe_pad_up = ""; }
					if( temp1 == "手柄-下" ){ $gameSystem._drill_OKe_pad_down = ""; }
					if( temp1 == "手柄-左" ){ $gameSystem._drill_OKe_pad_left = ""; }
					if( temp1 == "手柄-右" ){ $gameSystem._drill_OKe_pad_right = ""; }
					
					if( temp1 == "手柄-功能键" ){ $gameSystem._drill_OKe_pad_fn = ""; }
					if( temp1 == "手柄-菜单键" ){ $gameSystem._drill_OKe_pad_menu = ""; }
					if( temp1 == "手柄-跳跃键" ){ $gameSystem._drill_OKe_pad_jump = ""; }
					if( temp1 == "手柄-原地转向键" ){ $gameSystem._drill_OKe_pad_rotate = ""; }
					if( temp1 == "手柄-举起花盆键" ){ $gameSystem._drill_OKe_pad_pick = ""; }
					if( temp1 == "手柄-投掷花盆键" ){ $gameSystem._drill_OKe_pad_throw = ""; }
					if( temp1 == "手柄-放置炸弹键" ){ $gameSystem._drill_OKe_pad_bomb = ""; }
					
					$gameTemp.drill_OKe_gamePadKeys_RefreshData();		//手柄 - 映射数据 初始化
					$gameTemp.drill_OKe_gamePadKeys_RefreshMapper();	//手柄 - 映射数据 生成映射
				}
				if( temp2 == "恢复默认" ){
					
					if( temp1 == "手柄-确定键" ){ $gameSystem._drill_OKe_pad_ok = DrillUp.g_OKe_pad_ok; }
					if( temp1 == "手柄-取消键" ){ $gameSystem._drill_OKe_pad_cancel = DrillUp.g_OKe_pad_cancel; }
					if( temp1 == "手柄-加速键" ){ $gameSystem._drill_OKe_pad_shift = DrillUp.g_OKe_pad_shift; }
					if( temp1 == "手柄-上一页" ){ $gameSystem._drill_OKe_pad_pageup = DrillUp.g_OKe_pad_pageup; }
					if( temp1 == "手柄-下一页" ){ $gameSystem._drill_OKe_pad_pagedown = DrillUp.g_OKe_pad_pagedown; }
					if( temp1 == "手柄-上" ){ $gameSystem._drill_OKe_pad_up = DrillUp.g_OKe_pad_up; }
					if( temp1 == "手柄-下" ){ $gameSystem._drill_OKe_pad_down = DrillUp.g_OKe_pad_down; }
					if( temp1 == "手柄-左" ){ $gameSystem._drill_OKe_pad_left = DrillUp.g_OKe_pad_left; }
					if( temp1 == "手柄-右" ){ $gameSystem._drill_OKe_pad_right = DrillUp.g_OKe_pad_right; }
					
					if( temp1 == "手柄-功能键" ){ $gameSystem._drill_OKe_pad_fn = DrillUp.g_OKe_pad_fn; }
					if( temp1 == "手柄-菜单键" ){ $gameSystem._drill_OKe_pad_menu = DrillUp.g_OKe_pad_menu; }
					if( temp1 == "手柄-跳跃键" ){ $gameSystem._drill_OKe_pad_jump = DrillUp.g_OKe_pad_jump; }
					if( temp1 == "手柄-原地转向键" ){ $gameSystem._drill_OKe_pad_rotate = DrillUp.g_OKe_pad_rotate; }
					if( temp1 == "手柄-举起花盆键" ){ $gameSystem._drill_OKe_pad_pick = DrillUp.g_OKe_pad_pick; }
					if( temp1 == "手柄-投掷花盆键" ){ $gameSystem._drill_OKe_pad_throw = DrillUp.g_OKe_pad_throw; }
					if( temp1 == "手柄-放置炸弹键" ){ $gameSystem._drill_OKe_pad_bomb = DrillUp.g_OKe_pad_bomb; }
					
					$gameTemp.drill_OKe_gamePadKeys_RefreshData();		//手柄 - 映射数据 初始化
					$gameTemp.drill_OKe_gamePadKeys_RefreshMapper();	//手柄 - 映射数据 生成映射
				}
				return;
			}
		}
		
		/*-----------------修改键盘键位------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "键盘-全部恢复默认设置" ){
				$gameSystem.drill_OKe_keyboard_setKeyStrAllDefault();
				$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
				$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
				return;
			}
		}
		if( args.length >= 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1.indexOf("键盘-") != -1 ){
				var argStr_list = [];
				for(var i = 3; i < args.length; i++ ){	//（合并后面的空格）
					argStr_list.push( String(args[i]) );
				}
				var temp2 = argStr_list.join(" ");
				if( temp2.indexOf("全部键位[") != -1 ){
					temp2 = temp2.replace("全部键位[","");
					temp2 = temp2.replace("]","");
					temp2 = temp2.replace(/[\"“”]/g,"");
					var str_list = temp2.split(/[,，]/);
					
					if( temp1 == "键盘-确定键" ){ $gameSystem._drill_OKe_keyboard_ok = str_list; }
					if( temp1 == "键盘-取消键" ){ $gameSystem._drill_OKe_keyboard_cancel = str_list; }
					if( temp1 == "键盘-加速键" ){ $gameSystem._drill_OKe_keyboard_shift = str_list; }
					if( temp1 == "键盘-上一页" ){ $gameSystem._drill_OKe_keyboard_pageup = str_list; }
					if( temp1 == "键盘-下一页" ){ $gameSystem._drill_OKe_keyboard_pagedown = str_list; }
					if( temp1 == "键盘-上" ){ $gameSystem._drill_OKe_keyboard_up = str_list; }
					if( temp1 == "键盘-下" ){ $gameSystem._drill_OKe_keyboard_down = str_list; }
					if( temp1 == "键盘-左" ){ $gameSystem._drill_OKe_keyboard_left = str_list; }
					if( temp1 == "键盘-右" ){ $gameSystem._drill_OKe_keyboard_right = str_list; }
					if( temp1 == "键盘-辅助Tab键" ){ $gameSystem._drill_OKe_keyboard_tab = str_list; }
					if( temp1 == "键盘-游戏测试中Debug键" ){ $gameSystem._drill_OKe_keyboard_debug = str_list; }
					if( temp1 == "键盘-游戏测试中穿墙键" ){ $gameSystem._drill_OKe_keyboard_control = str_list; }
					if( temp1 == "键盘-游戏测试中游戏加速键" ){ $gameSystem._drill_OKe_keyboard_speedGear = str_list; }
					
					if( temp1 == "键盘-菜单键" ){ $gameSystem._drill_OKe_keyboard_menu = str_list; }
					if( temp1 == "键盘-跳跃键" ){ $gameSystem._drill_OKe_keyboard_jump = str_list; }
					if( temp1 == "键盘-原地转向键" ){ $gameSystem._drill_OKe_keyboard_rotate = str_list; }
					if( temp1 == "键盘-举起花盆键" ){ $gameSystem._drill_OKe_keyboard_pick = str_list; }
					if( temp1 == "键盘-投掷花盆键" ){ $gameSystem._drill_OKe_keyboard_throw = str_list; }
					if( temp1 == "键盘-放置炸弹键" ){ $gameSystem._drill_OKe_keyboard_bomb = str_list; }
					
					$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
					$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
				}
				if( temp2.indexOf("添加按键[") != -1 ){
					temp2 = temp2.replace("添加按键[","");
					temp2 = temp2.replace("]","");
					temp2 = temp2.replace(/[\"“”]/g,"");
					
					if( temp1 == "键盘-确定键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_ok, temp2 ); }
					if( temp1 == "键盘-取消键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_cancel, temp2 ); }
					if( temp1 == "键盘-加速键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_shift, temp2 ); }
					if( temp1 == "键盘-上一页" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_pageup, temp2 ); }
					if( temp1 == "键盘-下一页" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_pagedown, temp2 ); }
					if( temp1 == "键盘-上" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_up, temp2 ); }
					if( temp1 == "键盘-下" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_down, temp2 ); }
					if( temp1 == "键盘-左" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_left, temp2 ); }
					if( temp1 == "键盘-右" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_right, temp2 ); }
					if( temp1 == "键盘-辅助Tab键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_tab, temp2 ); }
					if( temp1 == "键盘-游戏测试中Debug键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_debug, temp2 ); }
					if( temp1 == "键盘-游戏测试中穿墙键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_control, temp2 ); }
					if( temp1 == "键盘-游戏测试中游戏加速键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_speedGear, temp2 ); }
					
					if( temp1 == "键盘-菜单键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_menu, temp2 ); }
					if( temp1 == "键盘-跳跃键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_jump, temp2 ); }
					if( temp1 == "键盘-原地转向键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_rotate, temp2 ); }
					if( temp1 == "键盘-举起花盆键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_pick, temp2 ); }
					if( temp1 == "键盘-投掷花盆键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_throw, temp2 ); }
					if( temp1 == "键盘-放置炸弹键" ){ DrillUp.drill_OKe_addStringInList( $gameSystem._drill_OKe_keyboard_bomb, temp2 ); }
					
					$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
					$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
				}
				if( temp2.indexOf("去除按键[") != -1 ){
					temp2 = temp2.replace("去除按键[","");
					temp2 = temp2.replace("]","");
					temp2 = temp2.replace(/[\"“”]/g,"");
					
					if( temp1 == "键盘-确定键" ){ $gameSystem._drill_OKe_keyboard_ok = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_ok, temp2 ); }
					if( temp1 == "键盘-取消键" ){ $gameSystem._drill_OKe_keyboard_cancel = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_cancel, temp2 ); }
					if( temp1 == "键盘-加速键" ){ $gameSystem._drill_OKe_keyboard_shift = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_shift, temp2 ); }
					if( temp1 == "键盘-上一页" ){ $gameSystem._drill_OKe_keyboard_pageup = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_pageup, temp2 ); }
					if( temp1 == "键盘-下一页" ){ $gameSystem._drill_OKe_keyboard_pagedown = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_pagedown, temp2 ); }
					if( temp1 == "键盘-上" ){ $gameSystem._drill_OKe_keyboard_up = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_up, temp2 ); }
					if( temp1 == "键盘-下" ){ $gameSystem._drill_OKe_keyboard_down = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_down, temp2 ); }
					if( temp1 == "键盘-左" ){ $gameSystem._drill_OKe_keyboard_left = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_left, temp2 ); }
					if( temp1 == "键盘-右" ){ $gameSystem._drill_OKe_keyboard_right = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_right, temp2 ); }
					if( temp1 == "键盘-辅助Tab键" ){ $gameSystem._drill_OKe_keyboard_tab = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_tab, temp2 ); }
					if( temp1 == "键盘-游戏测试中Debug键" ){ $gameSystem._drill_OKe_keyboard_debug = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_debug, temp2 ); }
					if( temp1 == "键盘-游戏测试中穿墙键" ){ $gameSystem._drill_OKe_keyboard_control = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_control, temp2 ); }
					if( temp1 == "键盘-游戏测试中游戏加速键" ){ $gameSystem._drill_OKe_keyboard_speedGear = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_speedGear, temp2 ); }
					
					if( temp1 == "键盘-菜单键" ){ $gameSystem._drill_OKe_keyboard_menu = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_menu, temp2 ); }
					if( temp1 == "键盘-跳跃键" ){ $gameSystem._drill_OKe_keyboard_jump = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_jump, temp2 ); }
					if( temp1 == "键盘-原地转向键" ){ $gameSystem._drill_OKe_keyboard_rotate = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_rotate, temp2 ); }
					if( temp1 == "键盘-举起花盆键" ){ $gameSystem._drill_OKe_keyboard_pick = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_pick, temp2 ); }
					if( temp1 == "键盘-投掷花盆键" ){ $gameSystem._drill_OKe_keyboard_throw = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_throw, temp2 ); }
					if( temp1 == "键盘-放置炸弹键" ){ $gameSystem._drill_OKe_keyboard_bomb = DrillUp.drill_OKe_removeStringInList( $gameSystem._drill_OKe_keyboard_bomb, temp2 ); }
					
					$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
					$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
				}
				if( temp2 == "恢复默认" ){
					
					if( temp1 == "键盘-确定键" ){ $gameSystem._drill_OKe_keyboard_ok = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_ok )); }
					if( temp1 == "键盘-取消键" ){ $gameSystem._drill_OKe_keyboard_cancel = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_cancel )); }
					if( temp1 == "键盘-加速键" ){ $gameSystem._drill_OKe_keyboard_shift = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_shift )); }
					if( temp1 == "键盘-上一页" ){ $gameSystem._drill_OKe_keyboard_pageup = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_pageup )); }
					if( temp1 == "键盘-下一页" ){ $gameSystem._drill_OKe_keyboard_pagedown = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_pagedown )); }
					if( temp1 == "键盘-上" ){ $gameSystem._drill_OKe_keyboard_up = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_up )); }
					if( temp1 == "键盘-下" ){ $gameSystem._drill_OKe_keyboard_down = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_down )); }
					if( temp1 == "键盘-左" ){ $gameSystem._drill_OKe_keyboard_left = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_left )); }
					if( temp1 == "键盘-右" ){ $gameSystem._drill_OKe_keyboard_right = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_right )); }
					if( temp1 == "键盘-辅助Tab键" ){ $gameSystem._drill_OKe_keyboard_tab = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_tab )); }
					if( temp1 == "键盘-游戏测试中Debug键" ){ $gameSystem._drill_OKe_keyboard_debug = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_debug )); }
					if( temp1 == "键盘-游戏测试中穿墙键" ){ $gameSystem._drill_OKe_keyboard_control = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_control )); }
					if( temp1 == "键盘-游戏测试中游戏加速键" ){ $gameSystem._drill_OKe_keyboard_speedGear = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_speedGear )); }
					
					if( temp1 == "键盘-菜单键" ){ $gameSystem._drill_OKe_keyboard_menu = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_menu )); }
					if( temp1 == "键盘-跳跃键" ){ $gameSystem._drill_OKe_keyboard_jump = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_jump )); }
					if( temp1 == "键盘-原地转向键" ){ $gameSystem._drill_OKe_keyboard_rotate = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_rotate )); }
					if( temp1 == "键盘-举起花盆键" ){ $gameSystem._drill_OKe_keyboard_pick = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_pick )); }
					if( temp1 == "键盘-投掷花盆键" ){ $gameSystem._drill_OKe_keyboard_throw = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_throw )); }
					if( temp1 == "键盘-放置炸弹键" ){ $gameSystem._drill_OKe_keyboard_bomb = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_bomb )); }
					
					$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
					$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
				}
				return;
			}
		}
		
		/*-----------------倒置效果------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "倒置效果" ){
				
				if( temp1 == "恢复方向" ){
					$gameSystem._drill_OKe_pad_convertType = "";
					$gameSystem._drill_OKe_keyboard_convertType = "";
				}else{
					$gameSystem._drill_OKe_pad_convertType = temp1;
					$gameSystem._drill_OKe_keyboard_convertType = temp1;
				}
				
				$gameTemp.drill_OKe_gamePadKeys_RefreshData();			//手柄 - 映射数据 初始化
				$gameTemp.drill_OKe_gamePadKeys_RefreshMapper();		//手柄 - 映射数据 生成映射
				
				$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
				$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
				return;
			}
		}
		
		/*-----------------手柄DEBUG------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示手柄DEBUG窗口-逻辑按键" || type == "显示手柄Debug窗口-逻辑按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_OKe_padDebugWindow == undefined ){
					var temp_window = new Drill_OKe_PadDebugWindow();
					spriteset.addChild( temp_window );
					spriteset._drill_OKe_padDebugWindow = temp_window;
				}
			}
			if( type == "关闭手柄DEBUG窗口-逻辑按键" || type == "关闭手柄Debug窗口-逻辑按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_OKe_padDebugWindow != undefined ){
					spriteset.removeChild( spriteset._drill_OKe_padDebugWindow );
					spriteset._drill_OKe_padDebugWindow = null;
				}
			}
		}
		
		/*-----------------键盘DEBUG------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示键盘DEBUG窗口-逻辑按键" || type == "显示键盘Debug窗口-逻辑按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_OKe_keyboardDebugWindow == undefined ){
					var temp_window = new Drill_OKe_KeyboardDebugWindow();
					spriteset.addChild( temp_window );
					spriteset._drill_OKe_keyboardDebugWindow = temp_window;
				}
			}
			if( type == "关闭键盘DEBUG窗口-逻辑按键" || type == "关闭键盘Debug窗口-逻辑按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_OKe_keyboardDebugWindow != undefined ){
					spriteset.removeChild( spriteset._drill_OKe_keyboardDebugWindow );
					spriteset._drill_OKe_keyboardDebugWindow = null;
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 添加指定字符串（不重复添加）
//==============================
DrillUp.drill_OKe_addStringInList = function( str_list, tar_str ){
	for(var i = 0; i < str_list.length; i++ ){
		if( str_list[i] == tar_str ){
			return;
		}
	}
	str_list.push( tar_str );	//（由于是指针对象，此操作有效果）
}
//==============================
// * 插件指令 - 去除指定字符串
//==============================
DrillUp.drill_OKe_removeStringInList = function( str_list, tar_str ){
	for(var i = str_list.length-1; i >= 0; i-- ){
		if( str_list[i] == tar_str ){
			str_list.splice( i, 1 );	//（由于是指针对象，此操作有效果）
			break;
		}
	}
	return str_list;
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_OKe_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OKe_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_OKe_sys_initialize.call(this);
	this.drill_OKe_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OKe_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_OKe_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_OKe_saveEnabled == true ){	
		$gameSystem.drill_OKe_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_OKe_initSysData();
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
Game_System.prototype.drill_OKe_initSysData = function() {
	this.drill_OKe_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_OKe_checkSysData = function() {
	this.drill_OKe_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_OKe_initSysData_Private = function() {
	
	this._drill_OKe_pad_convertType = "";		//（手柄 倒置效果）
	this._drill_OKe_keyboard_convertType = "";	//（键盘 倒置效果）
	
	// > 手柄 全部设为默认值
	this.drill_OKe_pad_setKeyStrAllDefault();
	// > 键盘 全部设为默认值
	this.drill_OKe_keyboard_setKeyStrAllDefault();
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_OKe_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_OKe_pad_ok == undefined ||
		this._drill_OKe_keyboard_ok == undefined ){
		this.drill_OKe_initSysData();
	}
};
//==============================
// * 存储数据 - 手柄 全部设为默认值
//==============================
Game_System.prototype.drill_OKe_pad_setKeyStrAllDefault = function() {
	
	// > 手柄 基本键
	this._drill_OKe_pad_ok = DrillUp.g_OKe_pad_ok;
	this._drill_OKe_pad_cancel = DrillUp.g_OKe_pad_cancel;
	this._drill_OKe_pad_shift = DrillUp.g_OKe_pad_shift;
	this._drill_OKe_pad_pageup = DrillUp.g_OKe_pad_pageup;
	this._drill_OKe_pad_pagedown = DrillUp.g_OKe_pad_pagedown;
	this._drill_OKe_pad_up = DrillUp.g_OKe_pad_up;
	this._drill_OKe_pad_down = DrillUp.g_OKe_pad_down;
	this._drill_OKe_pad_left = DrillUp.g_OKe_pad_left;
	this._drill_OKe_pad_right = DrillUp.g_OKe_pad_right;
	
	// > 手柄 扩展键
	this._drill_OKe_pad_fn = DrillUp.g_OKe_pad_fn;
	this._drill_OKe_pad_menu = DrillUp.g_OKe_pad_menu;
	this._drill_OKe_pad_jump = DrillUp.g_OKe_pad_jump;
	this._drill_OKe_pad_rotate = DrillUp.g_OKe_pad_rotate;
	this._drill_OKe_pad_pick = DrillUp.g_OKe_pad_pick;
	this._drill_OKe_pad_throw = DrillUp.g_OKe_pad_throw;
	this._drill_OKe_pad_bomb = DrillUp.g_OKe_pad_bomb;
};
//==============================
// * 存储数据 - 键盘 全部设为默认值
//==============================
Game_System.prototype.drill_OKe_keyboard_setKeyStrAllDefault = function() {
	
	// > 键盘 基本键
	this._drill_OKe_keyboard_ok = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_ok ));
	this._drill_OKe_keyboard_cancel = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_cancel ));
	this._drill_OKe_keyboard_shift = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_shift ));
	this._drill_OKe_keyboard_pageup = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_pageup ));
	this._drill_OKe_keyboard_pagedown = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_pagedown ));
	this._drill_OKe_keyboard_up = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_up ));
	this._drill_OKe_keyboard_down = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_down ));
	this._drill_OKe_keyboard_left = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_left ));
	this._drill_OKe_keyboard_right = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_right ));
	this._drill_OKe_keyboard_tab = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_tab ));
	this._drill_OKe_keyboard_debug = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_debug ));
	this._drill_OKe_keyboard_control = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_control ));
	this._drill_OKe_keyboard_speedGear = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_speedGear ));
	
	// > 键盘 扩展键
	this._drill_OKe_keyboard_menu = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_menu ));
	this._drill_OKe_keyboard_jump = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_jump ));
	this._drill_OKe_keyboard_rotate = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_rotate ));
	this._drill_OKe_keyboard_pick = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_pick ));
	this._drill_OKe_keyboard_throw = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_throw ));
	this._drill_OKe_keyboard_bomb = JSON.parse(JSON.stringify( DrillUp.g_OKe_keyboard_bomb ));
};


//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 键盘/手柄 - 常量
//==============================
Input.keyRepeatWait = 24;			//长按间隔（单位帧）
Input.keyRepeatInterval = 6;		//双击间隔（单位帧）
Input.keyMapper = {		// 【键盘逻辑按键映射】
    9: 'tab',       	// 键盘的tab		（辅助Tab键）
    13: 'ok',       	// 键盘的enter		（确定键）
    16: 'shift',    	// 键盘的shift		（加速键）
    17: 'control',  	// 键盘的control	（控制键）
    18: 'control',  	// 键盘的alt		（控制键）
    27: 'escape',   	// 键盘的escape		（离开键）
    32: 'ok',       	// 键盘的space		（确定键）
    33: 'pageup',   	// 键盘的pageup		（上一页）
    34: 'pagedown', 	// 键盘的pagedown	（下一页）
    37: 'left',     	// 键盘的left		（左）
    38: 'up',       	// 键盘的up			（上）
    39: 'right',    	// 键盘的right		（下）
    40: 'down',     	// 键盘的down		（右）
    45: 'escape',   	// 键盘的insert		（离开键）
    81: 'pageup',   	// 键盘的Q			（上一页）
    87: 'pagedown', 	// 键盘的W			（下一页）
    88: 'escape',   	// 键盘的X			（离开键）
    90: 'ok',       	// 键盘的Z			（确定键）
    96: 'escape',   	// 键盘的numpad 0	（离开键）
    98: 'down',     	// 键盘的numpad 2	（下）
    100: 'left',    	// 键盘的numpad 4	（左）
    102: 'right',   	// 键盘的numpad 6	（右）
    104: 'up',      	// 键盘的numpad 8	（上）
    120: 'debug'    	// 键盘的F9			（游戏测试中Debug键）
};
Input.gamepadMapper = {	// 【手柄逻辑按键映射】
    0: 'ok',        	// 手柄的A 			（确定键）
    1: 'cancel',    	// 手柄的B 			（取消键）
    2: 'shift',     	// 手柄的X 			（加速键）
    3: 'menu',      	// 手柄的Y 			（菜单键）
    4: 'pageup',    	// 手柄的LB 		（上一页）
    5: 'pagedown',  	// 手柄的RB 		（下一页）
    12: 'up',       	// 手柄的up			（上）
    13: 'down',     	// 手柄的down		（下）
    14: 'left',     	// 手柄的left		（左）
    15: 'right',    	// 手柄的right		（右）
};
*/



//=============================================================================
// ** ☆手柄键位控制
//
//			说明：	> 此模块专门控制 手柄键位，建立 映射数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 手柄 - 常量
//==============================
	DrillUp.g_OKe_pad_PhysicalMapper = {	// 【手柄物理按键表】【全部大写】（Drill_CoreOfInput也有一模一样的按键表）
											// （此映射为 常量，不可修改）
											// （比如'A':0，表示物理手柄的A键(键位0)，对应了字符串"A"，不能重复）
		'A': 0,
		'B': 1,
		'X': 2,
		'Y': 3,
		'LB': 4,
		'RB': 5,
		'LT': 6,
		'RT': 7,
		'SELECT': 8,
		'START': 9,
		'左摇杆按键': 10,
		'右摇杆按键': 11,
		'上': 12,
		'下': 13,
		'左': 14,
		'右': 15,
	};
	DrillUp.g_OKe_pad_LogicMapper = {		// 【手柄逻辑按键映射】
											// （此映射为 Input.gamepadMapper 的备份，参考用）
		0: 'ok',        					// 手柄的A 			（确定键）
		1: 'cancel',    					// 手柄的B 			（取消键）
		2: 'shift',     					// 手柄的X 			（加速键）
		3: 'menu',      					// 手柄的Y 			（菜单键）
		4: 'pageup',    					// 手柄的LB 		（上一页）
		5: 'pagedown',  					// 手柄的RB 		（下一页）
		12: 'up',       					// 手柄的up			（上）
		13: 'down',     					// 手柄的down		（下）
		14: 'left',     					// 手柄的left		（左）
		15: 'right',    					// 手柄的right		（右）
	};
//==============================
// * 手柄 - 常量 - 获取物理按键（字符串 -> 数字）
//
//			说明：	> 返回 手柄 的按键名称对应的数字，如果没有则返回null。
//==============================
DrillUp.drill_OKe_pad_getPhysicalKeyNum = function( key_name ){
	var value = DrillUp.g_OKe_pad_PhysicalMapper[ key_name.toUpperCase() ];
	if( value == undefined ){ return null; }
	return Number( value );
}
//==============================
// * 手柄 - 常量 - 获取物理按键（数字 -> 字符串）
//
//			说明：	> 返回 手柄 的数字对应的按键名称，如果没有则返回null。
//==============================
DrillUp.drill_OKe_pad_getPhysicalKeyStr = function( key_num ){
	var keys = Object.keys( DrillUp.g_OKe_pad_PhysicalMapper );
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];
		if( DrillUp.g_OKe_pad_PhysicalMapper[key] == key_num ){
			return key;
		}
	}
	return null;
}


//==============================
// * 手柄 - 映射数据 生成绑定
//==============================
var _drill_SG_pad_create = Scene_Base.prototype.create;
Scene_Base.prototype.create = function() {
    _drill_SG_pad_create.call(this);
	
	if( $gameTemp ){
		$gameTemp._drill_OKe_pad_BeanTank = {};
		$gameTemp.drill_OKe_gamePadKeys_RefreshData();		//手柄 - 映射数据 初始化
		$gameTemp._drill_OKe_pad_LogicMapperInverse = {};
		$gameTemp._drill_OKe_pad_LogicMapperForward = {};
		$gameTemp.drill_OKe_gamePadKeys_RefreshMapper();	//手柄 - 映射数据 生成映射
	}
};
//==============================
// * 手柄 - 映射数据 初始化
//
//			说明：	> 映射数据 一对一，一个数据 data_xxx 只对应一个逻辑键位。
//					> 映射数据有 单键 和 功能键+单键 的设置，详细见 drill_bean_setNameAndStrValue_Extend 。
//					> 如果要继承此函数，添加 映射数据-扩展键 的设置即可。（可见 Drill_OperateKeyCommonEvent ）
//==============================
Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshData = function() {
	
	// > 映射数据 - 基本键
	var bean_tank = {};
	bean_tank['data_ok'] = new Drill_OKe_PadBean();
	bean_tank['data_ok'].drill_bean_setNameAndStrValue_Base( "ok", $gameSystem._drill_OKe_pad_ok );
	bean_tank['data_cancel'] = new Drill_OKe_PadBean();
	bean_tank['data_cancel'].drill_bean_setNameAndStrValue_Base( "cancel", $gameSystem._drill_OKe_pad_cancel );
	bean_tank['data_shift'] = new Drill_OKe_PadBean();
	bean_tank['data_shift'].drill_bean_setNameAndStrValue_Base( "shift", $gameSystem._drill_OKe_pad_shift );
	bean_tank['data_pageup'] = new Drill_OKe_PadBean();
	bean_tank['data_pageup'].drill_bean_setNameAndStrValue_Base( "pageup", $gameSystem._drill_OKe_pad_pageup );
	bean_tank['data_pagedown'] = new Drill_OKe_PadBean();
	bean_tank['data_pagedown'].drill_bean_setNameAndStrValue_Base( "pagedown", $gameSystem._drill_OKe_pad_pagedown );
	bean_tank['data_up'] = new Drill_OKe_PadBean();
	bean_tank['data_up'].drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_up );
	bean_tank['data_down'] = new Drill_OKe_PadBean();
	bean_tank['data_down'].drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_down );
	bean_tank['data_left'] = new Drill_OKe_PadBean();
	bean_tank['data_left'].drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_left );
	bean_tank['data_right'] = new Drill_OKe_PadBean();
	bean_tank['data_right'].drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_right );
	
	// > 映射数据 - 基本键 - 正向逻辑映射
	var pad_F = {};
	var keys = Object.keys( bean_tank );
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];		//（这里的key，是'data_xxx'键）
		
		var temp_value = bean_tank[key]._drill_value;
		var temp_name = bean_tank[key]._drill_name;
		pad_F[ temp_value ] = temp_name;
	}
	
	// > 映射数据 - 基本键 - 正向逻辑映射 - 校验重复
	if( Object.keys( pad_F ).length < 9 ){
		alert( DrillUp.drill_OKe_getPluginTip_HasRepeat_gamepad() );
	}
	
	
	// > 映射数据 - 扩展键 - 功能键
	bean_tank['data_fn'] = new Drill_OKe_PadBean();
	bean_tank['data_fn'].drill_bean_setNameAndStrValue_Base( "fn", $gameSystem._drill_OKe_pad_fn );
	
	// > 映射数据 - 扩展键 - 菜单键
	bean_tank['data_menu'] = new Drill_OKe_PadBean();
	bean_tank['data_menu'].drill_bean_setNameAndStrValue_Extend( "menu", $gameSystem._drill_OKe_pad_menu );
	
	// > 映射数据 - 扩展键 - 跳跃键【互动-跳跃能力】
	bean_tank['data_jump'] = new Drill_OKe_PadBean();
	bean_tank['data_jump'].drill_bean_setNameAndStrValue_Extend( "jump", $gameSystem._drill_OKe_pad_jump );
	
	// > 映射数据 - 扩展键 - 原地转向键【互动-原地转向能力】
	bean_tank['data_rotate'] = new Drill_OKe_PadBean();
	bean_tank['data_rotate'].drill_bean_setNameAndStrValue_Extend( "rotate", null );
	if( $gameSystem._drill_OKe_pad_rotate.indexOf('功能键') != -1 ){		//（单独标记 功能键）
		bean_tank['data_rotate'].drill_bean_setHasFn( true );
	}else{
		bean_tank['data_rotate'].drill_bean_setHasFn( false );
	}
	
	// > 映射数据 - 扩展键 - 举起花盆键【互动-举起花盆能力】
	bean_tank['data_pick'] = new Drill_OKe_PadBean();
	bean_tank['data_pick'].drill_bean_setNameAndStrValue_Extend( "pick", $gameSystem._drill_OKe_pad_pick );
	
	// > 映射数据 - 扩展键 - 投掷花盆键【互动-举起花盆能力】
	bean_tank['data_throw'] = new Drill_OKe_PadBean();
	bean_tank['data_throw'].drill_bean_setNameAndStrValue_Extend( "throw", $gameSystem._drill_OKe_pad_throw );
	
	// > 映射数据 - 扩展键 - 放置炸弹键【炸弹人-游戏核心】
	bean_tank['data_bomb'] = new Drill_OKe_PadBean();
	bean_tank['data_bomb'].drill_bean_setNameAndStrValue_Extend( "bomb", $gameSystem._drill_OKe_pad_bomb );
	
	
	// > 映射数据 - 赋值
	this._drill_OKe_pad_BeanTank = bean_tank;
}
//==============================
// * 手柄 - 映射数据 生成映射
//
//			说明：	> 此处根据映射数据，生成 反向逻辑映射 和 正向逻辑映射。
//					> 如果要继承此函数，添加 合并重复映射-扩展键 的设置即可。（可见 Drill_OperateKeyCommonEvent ）
//==============================
Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshMapper = function() {
	
	// > 反向逻辑映射 - 生成
	//	（注意，此处的复制是对象复制，不能使用 JSON.parse(JSON.stringify( ))，会丢失对象数据结构 ）
	var pad_I = {};
	var keys = Object.keys( this._drill_OKe_pad_BeanTank );
	for(var i = 0; i < keys.length; i++ ){
		var key = keys[i];
		var org_bean = this._drill_OKe_pad_BeanTank[key];
		
		// > 条件过滤
		if( org_bean._drill_enabled == false ){ continue; }
		if( org_bean._drill_value === "" ){ continue; }	//（用全等于符号，因为 == 0 与 == "" 相同）
		
		var new_bean = new Drill_OKe_PadBean();
		new_bean.drill_bean_copyFrom( org_bean );
		pad_I[ key ] = new_bean;
	}
	
	// > 正向逻辑映射 - 生成
	var pad_F = {};
	var keys = Object.keys( pad_I );
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];		//（这里的key，是'data_xxx'键）
		var bean = pad_I[key];
		
		var temp_name = bean._drill_name;
		var temp_value = bean._drill_value;
		if( temp_value == undefined ){ continue; }
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){ continue; }	//（重复的不要覆盖，比如ok不能被花盆键覆盖）
		pad_F[ temp_value ] = temp_name;
	}
	
	
	// > 合并重复映射 - 扩展键 - 功能键
	if( pad_I['data_fn'] != undefined ){
		var temp_value = pad_I['data_fn']._drill_value;
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){
			pad_I['data_fn']._drill_name = f_name;			//（若重复，则关联重复key）
		}
	}
	
	// > 合并重复映射 - 扩展键 - 菜单键
	if( pad_I['data_menu'] != undefined ){
		var temp_value = pad_I['data_menu']._drill_value;
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){
			pad_I['data_menu']._drill_name = f_name;		//（若重复，则关联重复key）
		}
	}
	
	// > 合并重复映射 - 扩展键 - 跳跃键
	if( pad_I['data_jump'] != undefined ){
		var temp_value = pad_I['data_jump']._drill_value;
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){
			pad_I['data_jump']._drill_name = f_name;		//（若重复，则关联重复key）
		}
	}
	
	// > 合并重复映射 - 扩展键 - 举起花盆键
	if( pad_I['data_pick'] != undefined ){
		var temp_value = pad_I['data_pick']._drill_value;
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){
			pad_I['data_pick']._drill_name = f_name;		//（若重复，则关联重复key）
		}
	}
	
	// > 合并重复映射 - 扩展键 - 投掷花盆键
	if( pad_I['data_throw'] != undefined ){
		var temp_value = pad_I['data_throw']._drill_value;
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){
			pad_I['data_throw']._drill_name = f_name;		//（若重复，则关联重复key）
		}
	}
	
	// > 合并重复映射 - 扩展键 - 放置炸弹键
	if( pad_I['data_bomb'] != undefined ){
		var temp_value = pad_I['data_bomb']._drill_value;
		var f_name = pad_F[ temp_value ];
		if( f_name != undefined ){
			pad_I['data_bomb']._drill_name = f_name;		//（若重复，则关联重复key）
		}
	}
	
	
	// > 反向逻辑映射 - 赋值
	this._drill_OKe_pad_LogicMapperInverse = pad_I;
	
	
	// > 正向逻辑映射 - 赋值
	Input.gamepadMapper = pad_F;
	this._drill_OKe_pad_LogicMapperForward = pad_F;
	
	
	//alert(JSON.stringify(this._drill_OKe_pad_LogicMapperInverse));
	//alert(JSON.stringify(this._drill_OKe_pad_LogicMapperForward));
}
//==============================
// * 手柄 - 工具 - 判断手柄控制
//==============================
Input.drill_OKe_isGamepadControling = function() {
	if( navigator.getGamepads ){
		var gamepads = navigator.getGamepads();
		if( gamepads ){
			for( var i = 0; i < gamepads.length; i++ ){
				var gamepad = gamepads[i];
				if( gamepad && gamepad.connected ){ return true; }
			}
		}
	}
	return false;
};


//=============================================================================
// ** 手柄配置 实体类【Drill_OKe_PadBean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的 手柄配置 数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **						->复制对象
// **					->手动赋值
// **						->启用/关闭
// **						->设置键值（基本键）
// **						->设置键值（扩展键）
// **						->设置功能键附加
// **		
// **		说明：	> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 手柄实体类 - 定义
//==============================
function Drill_OKe_PadBean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 手柄实体类 - 初始化
//==============================
Drill_OKe_PadBean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 手柄实体类 - 启用/关闭【开放函数】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Drill_OKe_PadBean.prototype.drill_bean_setEnabled = function( enabled ){
	this._drill_enabled = enabled;
};
//##############################
// * 手柄实体类 - 设置键值（基本键）【开放函数】
//			
//			参数：	> name 字符串     （键）
//					> str_value 字符串（值）
//			返回：	> 无
//			
//			说明：	> str_value为 物理映射 对应的字符串。比如：'A': 0, 'B': 1 …… 的字符串。
//					> 此处设置 基本键 ，只能为 单键。
//##############################
Drill_OKe_PadBean.prototype.drill_bean_setNameAndStrValue_Base = function( name, str_value ){
	if( str_value == null ){ return; }
	if( str_value == "" ){ this._drill_value = ""; return; }
	
	// > 基本键检查
	if( str_value != "+" &&
		str_value.indexOf("+") != -1 ){		//（indexOf 参数不能写正则对象）
		alert( DrillUp.drill_OKe_getPluginTip_IsBaseKey_gamepad( name ) );
		return;
	}
	
	this._drill_name = name;
	this._drill_value = DrillUp.drill_OKe_pad_getPhysicalKeyNum( str_value );
	this._drill_has_fn = false;
};
//##############################
// * 手柄实体类 - 设置键值（扩展键）【开放函数】
//			
//			参数：	> name 字符串     （键）
//					> str_value 字符串（值）
//			返回：	> 无
//			
//			说明：	> str_value为 物理映射 对应的字符串。比如：'A': 0, 'B': 1 …… 的字符串。
//					> 此处设置 扩展键 ，可为 单键 或 功能键+单键 。
//##############################
Drill_OKe_PadBean.prototype.drill_bean_setNameAndStrValue_Extend = function( name, str_value ){
	if( str_value == null ){ return; }
	if( str_value == "" ){ this._drill_value = ""; return; }
	
	this._drill_name = name;
	
	if( str_value.indexOf("+") != -1 ){		//（分离 功能键+单键）
		str_value = String( str_value.split(/[ \+]+/)[1] );
		this._drill_value = DrillUp.drill_OKe_pad_getPhysicalKeyNum( str_value );
		this._drill_has_fn = true;
	}else{
		this._drill_value = DrillUp.drill_OKe_pad_getPhysicalKeyNum( str_value );
		this._drill_has_fn = false;
	}
};
//##############################
// * 手柄实体类 - 设置功能键附加【开放函数】
//			
//			参数：	> has_fn 布尔
//			返回：	> 无
//##############################
Drill_OKe_PadBean.prototype.drill_bean_setHasFn = function( has_fn ){
	this._drill_has_fn = has_fn;
};
//##############################
// * 手柄实体类 - 复制对象【开放函数】
//			
//			参数：	> bean 手柄实体类
//			返回：	> 无
//			
//			说明：	> 复制Bean对象，注意不要用 JSON.parse(JSON.stringify( )) 。
//##############################
Drill_OKe_PadBean.prototype.drill_bean_copyFrom = function( bean ){
	
	this._drill_enabled = bean._drill_enabled;		//实体类 - 开关
	
	this._drill_name = bean._drill_name;			//实体类 - 键
	this._drill_value = bean._drill_value;      	//实体类 - 值
	this._drill_has_fn = bean._drill_has_fn;    	//实体类 - 功能键
};
//==============================
// * 手柄实体类 - 私有数据初始化
//==============================
Drill_OKe_PadBean.prototype.drill_bean_initData = function(){
	
	this._drill_enabled = true;				//实体类 - 开关
	
	this._drill_name = "";					//实体类 - 键
	this._drill_value = null;				//实体类 - 值
	this._drill_has_fn = false;				//实体类 - 功能键
};




//=============================================================================
// ** ☆键盘键位控制
//
//			说明：	> 此模块专门控制 键盘键位，建立 映射数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 键盘 - 常量
//==============================
	DrillUp.g_OKe_keyboard_PhysicalMapper = {	// 【键盘物理按键表】【全部大写】（Drill_CoreOfInput也有一模一样的按键表）
												// （此映射为 常量，不可修改）
												// （比如'ESC':27，表示物理键盘的ESC键(ASCII码27)，对应了字符串"ESC"，不能重复）
		//
		  'ESC':27,  'F1':112,  'F2':113,  'F3':114,  'F4':115,  'F5':116,  'F6':117,  'F7':118,  'F8':119,  'F9':120,  'F10':121,  'F11':122,  'F12':123,
		//          '!':49,  '@':50,  '#':51,  '$':52,  '%':53,  '^':54,  '&':55,  '*':56,  '(':57,  ')':48,  '_':189,  '+':187,
		  '~':192,  '1':49,  '2':50,  '3':51,  '4':52,  '5':53,  '6':54,  '7':55,  '8':56,  '9':57,  '0':48,  '-':189,  '=':187, 'BACKSPACE':8,
		//                                                                                                     '{':219,  '}':221,  '|':220,
		  'TAB':9,  'Q':81,  'W':87,  'E':69,  'R':82,  'T':84,  'Y':89,  'U':85,  'I':73,  'O':79,  'P':80,  '[':219,  ']':221,  '\\':220,
		//                                                                                           ':':186,  '"':222,
				    'A':65,  'S':83,  'D':68,  'F':70,  'G':71,  'H':72,  'J':74,  'K':75,  'L':76,  ';':186,  "'":222,
		//                                                                           '<':188,  '>':190,  '?':191,
		  'SHIFT':16, 'Z':90,  'X':88,  'C':67,  'V':86,  'B':66,  'N':78,  'M':77,  ',':188,  '.':190,  '/':191,
		//
		'CTRL':17,  'ALT':18,  '上':38,  '下':40,  '左':37,  '右':39,  '空格':32,  'ENTER':13,
		//
		'PAGEUP':33,  'PAGEDOWN':34,  'END':35,  'HOME':36,  'INSERT':45,  'DELETE':46,  
		//
		'NUM0':96,  'NUM1':97,  'NUM2':98,  'NUM3':99,  'NUM4':100,  'NUM5':101,  'NUM6':102,  'NUM7':103,  'NUM8':104,  'NUM9':105,  'NUM*':106,  'NUM+':107,  'NUMENTER':108,  'NUM-':109,  'NUM.':110,  'NUM/':111,  
	};
	DrillUp.g_OKe_keyboard_LogicMapper = {		// 【键盘逻辑按键映射】
												// （此映射为 Input.keyMapper 的备份，参考用）
		9: 'tab',       						// 键盘的tab		（辅助Tab键）
		13: 'ok',       						// 键盘的enter		（确定键）
		16: 'shift',    						// 键盘的shift		（加速键）
		17: 'control',  						// 键盘的control	（控制键）
		18: 'control',  						// 键盘的alt		（控制键）
		27: 'escape',   						// 键盘的escape		（离开键）
		32: 'ok',       						// 键盘的space		（确定键）
		33: 'pageup',   						// 键盘的pageup		（上一页）
		34: 'pagedown', 						// 键盘的pagedown	（下一页）
		37: 'left',     						// 键盘的left		（左）
		38: 'up',       						// 键盘的up			（上）
		39: 'right',    						// 键盘的right		（下）
		40: 'down',     						// 键盘的down		（右）
		45: 'escape',   						// 键盘的insert		（离开键）
		81: 'pageup',   						// 键盘的Q			（上一页）
		87: 'pagedown', 						// 键盘的W			（下一页）
		88: 'escape',   						// 键盘的X			（离开键）
		90: 'ok',       						// 键盘的Z			（确定键）
		96: 'escape',   						// 键盘的numpad 0	（离开键）
		98: 'down',     						// 键盘的numpad 2	（下）
		100: 'left',    						// 键盘的numpad 4	（左）
		102: 'right',   						// 键盘的numpad 6	（右）
		104: 'up',      						// 键盘的numpad 8	（上）
		120: 'debug'    						// 键盘的F9			（游戏测试中Debug键）
	};
//==============================
// * 键盘 - 常量 - 获取物理按键（字符串 -> 数字）
//
//			说明：	> 返回 键盘 的按键名称对应的数字，如果没有则返回null。
//==============================
DrillUp.drill_OKe_keyboard_getPhysicalKeyNum = function( key_name ){
	if( key_name == "2" ){ return 50; }
	var value = DrillUp.g_OKe_keyboard_PhysicalMapper[ key_name.toUpperCase() ];
	if( value == undefined ){ return null; }
	return Number( value );
}
//==============================
// * 键盘 - 常量 - 获取物理按键（数字 -> 字符串）
//
//			说明：	> 返回 键盘 的数字对应的按键名称，如果没有则返回null。
//==============================
DrillUp.drill_OKe_keyboard_getPhysicalKeyStr = function( key_num ){
	var keys = Object.keys( DrillUp.g_OKe_keyboard_PhysicalMapper );
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];
		if( DrillUp.g_OKe_keyboard_PhysicalMapper[key] == key_num ){
			return key;
		}
	}
	return null;
}


//==============================
// * 键盘 - 映射数据 生成绑定
//==============================
var _drill_SG_keyboard_create = Scene_Base.prototype.create;
Scene_Base.prototype.create = function() {
    _drill_SG_keyboard_create.call(this);
	
	if( $gameTemp ){
		$gameTemp._drill_OKe_keyboard_BeanTank = {};
		$gameTemp.drill_OKe_keyboardKeys_RefreshData();			//键盘 - 映射数据 初始化
		$gameTemp._drill_OKe_keyboard_LogicMapperInverse = {};
		$gameTemp._drill_OKe_keyboard_LogicMapperForward = {};
		$gameTemp.drill_OKe_keyboardKeys_RefreshMapper();		//键盘 - 映射数据 生成映射
	}
};
//==============================
// * 键盘 - 映射数据 批量赋值 基本键
//==============================
Game_Temp.prototype.drill_OKe_keyboard_getBeanList_Base = function( name, keyStr_list ){
	var result_list = [];
	for(var i=0; i < keyStr_list.length; i++ ){
		var keyStr = keyStr_list[i];
		var bean = new Drill_OKe_KeyboardBean();
		bean.drill_bean_setNameAndStrValue_Base( name, keyStr );
		result_list.push( bean );
	}
	return result_list;
}
//==============================
// * 键盘 - 映射数据 批量赋值 扩展键
//==============================
Game_Temp.prototype.drill_OKe_keyboard_getBeanList_Extend = function( name, keyStr_list ){
	var result_list = [];
	for(var i=0; i < keyStr_list.length; i++ ){
		var keyStr = keyStr_list[i];
		var bean = new Drill_OKe_KeyboardBean();
		bean.drill_bean_setNameAndStrValue_Extend( name, keyStr );
		result_list.push( bean );
	}
	return result_list;
}
//==============================
// * 键盘 - 映射数据 初始化
//
//			说明：	> 映射数据 多对一，多个数据 dataList_xxx 都对应一个逻辑键位。
//					> 映射数据有 单键 和 A键+B键 的设置，详细见 drill_bean_setNameAndStrValue_Extend 。
//					> 如果要继承此函数，添加 映射数据-扩展键 的设置即可。（可见 Drill_OperateKeyCommonEvent ）
//==============================
Game_Temp.prototype.drill_OKe_keyboardKeys_RefreshData = function() {
	
	// > 映射数据 - 基本键
	var bean_tank = {};
	bean_tank['dataList_ok'] = this.drill_OKe_keyboard_getBeanList_Base( "ok", $gameSystem._drill_OKe_keyboard_ok );
	bean_tank['dataList_cancel'] = this.drill_OKe_keyboard_getBeanList_Base( "cancel", $gameSystem._drill_OKe_keyboard_cancel );
	bean_tank['dataList_shift'] = this.drill_OKe_keyboard_getBeanList_Base( "shift", $gameSystem._drill_OKe_keyboard_shift );
	bean_tank['dataList_pageup'] = this.drill_OKe_keyboard_getBeanList_Base( "pageup", $gameSystem._drill_OKe_keyboard_pageup );
	bean_tank['dataList_pagedown'] = this.drill_OKe_keyboard_getBeanList_Base( "pagedown", $gameSystem._drill_OKe_keyboard_pagedown );
	bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_up );
	bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_down );
	bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_left );
	bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_right );
	bean_tank['dataList_tab'] = this.drill_OKe_keyboard_getBeanList_Base( "tab", $gameSystem._drill_OKe_keyboard_tab );
	bean_tank['dataList_debug'] = this.drill_OKe_keyboard_getBeanList_Base( "debug", $gameSystem._drill_OKe_keyboard_debug );
	bean_tank['dataList_control'] = this.drill_OKe_keyboard_getBeanList_Base( "control", $gameSystem._drill_OKe_keyboard_control );
	bean_tank['dataList_speedGear'] = this.drill_OKe_keyboard_getBeanList_Base( "speedGear", $gameSystem._drill_OKe_keyboard_speedGear );
	
	// > 映射数据 - 基本键 - 正向逻辑映射
	var count = 0;
	var board_F = {};
	var keys = Object.keys( bean_tank );
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];		//（这里的key，是'dataList_xxx'键）
		
		var temp_beanList = bean_tank[key];
		for(var i=0; i < temp_beanList.length; i++){
			var temp_bean = temp_beanList[i];
			var temp_name = temp_bean._drill_nameA;		//（基本键 只能单键）
			var temp_value = temp_bean._drill_valueA;
			board_F[ temp_value ] = temp_name;
		}
		count += temp_beanList.length;
	}
	
	// > 映射数据 - 基本键 - 正向逻辑映射 - 校验重复
	if( Object.keys( board_F ).length < count ){
		alert( DrillUp.drill_OKe_getPluginTip_HasRepeat_keyboard() );
	}
	
	
	// > 映射数据 - 扩展键 - 菜单键
	bean_tank['dataList_menu'] = this.drill_OKe_keyboard_getBeanList_Extend( "menu", $gameSystem._drill_OKe_keyboard_menu );
	
	// > 映射数据 - 扩展键 - 跳跃键【互动-跳跃能力】
	bean_tank['dataList_jump'] = this.drill_OKe_keyboard_getBeanList_Extend( "jump", $gameSystem._drill_OKe_keyboard_jump );
	
	// > 映射数据 - 扩展键 - 原地转向键【互动-原地转向能力】
	bean_tank['dataList_rotate'] = this.drill_OKe_keyboard_getBeanList_Extend( "rotate", $gameSystem._drill_OKe_keyboard_rotate );
	
	// > 映射数据 - 扩展键 - 举起花盆键【互动-举起花盆能力】
	bean_tank['dataList_pick'] = this.drill_OKe_keyboard_getBeanList_Extend( "pick", $gameSystem._drill_OKe_keyboard_pick );
	
	// > 映射数据 - 扩展键 - 投掷花盆键【互动-举起花盆能力】
	bean_tank['dataList_throw'] = this.drill_OKe_keyboard_getBeanList_Extend( "throw", $gameSystem._drill_OKe_keyboard_throw );
	
	// > 映射数据 - 扩展键 - 放置炸弹键【炸弹人-游戏核心】
	bean_tank['dataList_bomb'] = this.drill_OKe_keyboard_getBeanList_Extend( "bomb", $gameSystem._drill_OKe_keyboard_bomb );
	
	
	// > 映射数据 - 赋值
	this._drill_OKe_keyboard_BeanTank = bean_tank;
}
//==============================
// * 键盘 - 映射数据 生成映射
//
//			说明：	> 此处根据映射数据，生成 反向逻辑映射 和 正向逻辑映射。
//					> 该函数没必要继承，因为前面的 初始化 函数已经简化了所有配置。
//==============================
Game_Temp.prototype.drill_OKe_keyboardKeys_RefreshMapper = function() {
	
	// > 反向逻辑映射 - 生成
	//	（注意，此处的复制是对象复制，不能使用 JSON.parse(JSON.stringify( ))，会丢失对象数据结构 ）
	var board_I = {};
	var keys = Object.keys( this._drill_OKe_keyboard_BeanTank );
	for(var i = 0; i < keys.length; i++ ){
		var key = keys[i];
		var org_beanList = this._drill_OKe_keyboard_BeanTank[key];
		var new_beanList = [];
		for(var j = 0; j < org_beanList.length; j++ ){
			var org_bean = org_beanList[j];
			
			// > 条件过滤
			if( org_bean._drill_enabled == false ){ continue; }
			if( org_bean._drill_valueA === "" ){ continue; }	//（用全等于符号，因为 == 0 与 == "" 相同）
			
			var new_bean = new Drill_OKe_KeyboardBean();
			new_bean.drill_bean_copyFrom( org_bean );
			new_beanList.push( new_bean );
		}
		board_I[ key ] = new_beanList;
	}
	
	// > 正向逻辑映射 - 生成
	var board_F = {};
	var keys = Object.keys( board_I );
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];		//（这里的key，是'dataList_xxx'键）
		
		var temp_beanList = board_I[key];
		for(var i=0; i < temp_beanList.length; i++){
			var bean = temp_beanList[i];
			
			// > A键
			var temp_name = bean._drill_nameA;
			var temp_value = bean._drill_valueA;
			if( temp_value == undefined ){ continue; }
			var f_name = board_F[ temp_value ];
			if( f_name != undefined ){ continue; }	//（重复的不要覆盖）
			board_F[ temp_value ] = temp_name;
		}
		for(var i=0; i < temp_beanList.length; i++){
			var bean = temp_beanList[i];
		
			// > B键
			var temp_name = bean._drill_nameB;
			var temp_value = bean._drill_valueB;
			if( temp_value == undefined ){ continue; }
			var f_name = board_F[ temp_value ];
			if( f_name != undefined ){ continue; }	//（重复的不要覆盖）
			board_F[ temp_value ] = temp_name;
		}
	}
	
	// > 合并重复映射
	for(var k = 0; k < keys.length; k++ ){
		var key = keys[k];		//（这里的key，是'dataList_xxx'键）
		
		var temp_beanList = board_I[key];
		for(var i=0; i < temp_beanList.length; i++){
			var bean = temp_beanList[i];
			
			// > 合并重复映射 - A键
			var temp_value = bean._drill_valueA;
			if( temp_value == undefined ){ continue; }
			var f_name = board_F[ temp_value ];
			if( f_name != undefined ){
				bean._drill_nameA = f_name;				//（若重复，则关联重复key）
			}
		}
		for(var i=0; i < temp_beanList.length; i++){
			var bean = temp_beanList[i];
			
			// > 合并重复映射 - B键
			var temp_value = bean._drill_valueB;
			if( temp_value == undefined ){ continue; }
			var f_name = board_F[ temp_value ];
			if( f_name != undefined ){
				bean._drill_nameB = f_name;				//（若重复，则关联重复key）
			}
		}
	}
	
	//// > 菜单键合并的特殊情况
	//if( this._drill_OKe_keyboard_LogicMapperForward[ _map.A ] == "cancel" ){
	//	this._drill_OKe_keyboard_LogicMapperForward[ _map.A ] = "escape"; 
	//}
	
	
	// > 反向逻辑映射 - 赋值
	this._drill_OKe_keyboard_LogicMapperInverse = board_I;
	
	
	// > 正向逻辑映射 - 赋值
	Input.keyMapper = board_F;
	this._drill_OKe_keyboard_LogicMapperForward = board_F;
	
	
	//alert(JSON.stringify(this._drill_OKe_keyboard_LogicMapperInverse));
	//alert(JSON.stringify(this._drill_OKe_keyboard_LogicMapperForward));
}


//=============================================================================
// ** 键盘配置 实体类【Drill_OKe_KeyboardBean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的 手柄配置 数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **						->复制对象
// **					->手动赋值
// **						->启用/关闭
// **						->设置键值（基本键）
// **						->设置键值（扩展键）
// **						->是否触发按键
// **						->是否按下按键
// **		
// **		说明：	> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 键盘实体类 - 定义
//==============================
function Drill_OKe_KeyboardBean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 键盘实体类 - 初始化
//==============================
Drill_OKe_KeyboardBean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 键盘实体类 - 启用/关闭【开放函数】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Drill_OKe_KeyboardBean.prototype.drill_bean_setEnabled = function( enabled ){
	this._drill_enabled = enabled;
};
//##############################
// * 键盘实体类 - 设置键值（基本键）【开放函数】
//			
//			参数：	> name 字符串     （键）
//					> str_value 字符串（值）
//			返回：	> 无
//			
//			说明：	> str_value为 物理映射 对应的字符串。比如：'TAB':9, 'Z':90, 'X':88, …… 的字符串。
//					> 此处设置 基本键 ，只能为 单键。
//##############################
Drill_OKe_KeyboardBean.prototype.drill_bean_setNameAndStrValue_Base = function( name, str_value ){
	if( str_value == null ){ return; }
	if( str_value == "" ){ this._drill_value = ""; return; }
	
	// > 基本键检查
	if( str_value != "+" &&
		str_value.indexOf("+") != -1 ){		//（indexOf 参数不能写正则对象）
		alert( DrillUp.drill_OKe_getPluginTip_IsBaseKey_keyboard( name ) );
		return;
	}
	
	this._drill_nameA = name;
	this._drill_nameB = "";
	this._drill_valueA = DrillUp.drill_OKe_keyboard_getPhysicalKeyNum( str_value.toUpperCase() );
	this._drill_valueB = null;
};
//##############################
// * 键盘实体类 - 设置键值（扩展键）【开放函数】
//			
//			参数：	> name 字符串     （键）
//					> str_value 字符串（值）
//			返回：	> 无
//			
//			说明：	> str_value为 物理映射 对应的字符串。比如：'ESC':27, 'F1':112, 'F2':113 …… 的字符串。
//					> 此处设置 扩展键 ，可为 单键 或 A键+B键 。
//##############################
Drill_OKe_KeyboardBean.prototype.drill_bean_setNameAndStrValue_Extend = function( name, str_value ){
	if( str_value == null ){ return; }
	if( str_value == "" ){ this._drill_value = ""; return; }
	
	var str_value = str_value.split(/[ \+]+/);	//（分离 A键+B键）
	if( str_value.length == 1 ){
		this._drill_nameA = name + "_S";
		this._drill_nameB = "";
		this._drill_valueA = DrillUp.drill_OKe_keyboard_getPhysicalKeyNum( str_value[0].toUpperCase() );
		this._drill_valueB = null;
	}else if( str_value.length >= 2 ){
		this._drill_nameA = name + "_TA";
		this._drill_nameB = name + "_TB";
		this._drill_valueA = DrillUp.drill_OKe_keyboard_getPhysicalKeyNum( str_value[0].toUpperCase() );
		this._drill_valueB = DrillUp.drill_OKe_keyboard_getPhysicalKeyNum( str_value[1].toUpperCase() );
	}
};
//##############################
// * 键盘实体类 - 是否触发按键【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_OKe_KeyboardBean.prototype.drill_bean_isTriggered = function(){
	if( this._drill_enabled != true ){ return false; }
	
	// > 键盘 - A键+B键
	if( this._drill_valueB != undefined ){
		if( (Input.isTriggered( this._drill_nameA ) && Input.isPressed( this._drill_nameB )) ||
			(Input.isPressed( this._drill_nameA ) && Input.isTriggered( this._drill_nameB ))
			){		//（按住A，然后按一下B  ||  按住B，然后按一下A）
			return true;
		}
		
	// > 键盘 - 单键
	}else{
		if( Input.isTriggered( this._drill_nameA ) ){
			return true;
		}
	}
	return false; 
};
//##############################
// * 键盘实体类 - 是否按下按键【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_OKe_KeyboardBean.prototype.drill_bean_isPressed = function(){
	if( this._drill_enabled != true ){ return false; }
	
	// > 键盘 - A+B
	if( this._drill_valueB != undefined ){
		if( Input.isPressed( this._drill_nameA ) && 
			Input.isPressed( this._drill_nameB ) ){
			return true;
		}
		
	// > 键盘 - 单键
	}else{
		if( Input.isPressed( this._drill_nameA ) ){
			return true;
		}
	}
	return false; 
};
//##############################
// * 键盘实体类 - 复制对象【开放函数】
//			
//			参数：	> bean 键盘实体类
//			返回：	> 无
//			
//			说明：	> 复制Bean对象，注意不要用 JSON.parse(JSON.stringify( )) 。
//##############################
Drill_OKe_KeyboardBean.prototype.drill_bean_copyFrom = function( bean ){
	
	this._drill_enabled = bean._drill_enabled;		//实体类 - 开关
	
	this._drill_nameA = bean._drill_nameA;			//实体类 - 键A
	this._drill_nameB = bean._drill_nameB;      	//实体类 - 键B
	this._drill_valueA = bean._drill_valueA;    	//实体类 - 值A
	this._drill_valueB = bean._drill_valueB;    	//实体类 - 值B
};
//==============================
// * 键盘实体类 - 私有数据初始化
//==============================
Drill_OKe_KeyboardBean.prototype.drill_bean_initData = function(){
	
	this._drill_enabled = true;				//实体类 - 开关
	
	this._drill_nameA = "";					//实体类 - 键A
	this._drill_nameB = "";					//实体类 - 键B
	this._drill_valueA = null;				//实体类 - 值A
	this._drill_valueB = null;				//实体类 - 值B
};



//=============================================================================
// ** ☆逻辑按键条件判定
//
//			说明：	> 此模块专门提供 逻辑按键 条件判定，基于前面的映射数据。
//					  注意，不提供其他操作，只提供 逻辑按键 是否按下的条件判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 手柄功能键 - 按键阻塞 - 按下[一帧]
//
//			说明：	> 如果 功能键 被按下，那么禁止触发下列 逻辑按键。
//==============================
var _drill_OKe_isTriggered = Input.isTriggered;
Input.isTriggered = function( keyName ){
	var succeed = _drill_OKe_isTriggered.call( this, keyName );
	if( succeed == true ){
		if( keyName == "ok" ||		//（这些键位为 基本键 ，不存在按住 功能键+单键 的情况。）
			keyName == "cancel" ||
			keyName == "pageup" ||
			keyName == "pagedown" ){
			
			// > 不阻塞标记
			if( this._drill_OKe_pad_isInFnOnce == true ){
				this._drill_OKe_pad_isInFnOnce = false;
				return succeed;
			}
			
			var bean_fn = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_fn'];
			if( bean_fn != undefined ){
				if( Input.isPressed( bean_fn._drill_name ) == true ){
					return false;
				}
			}
		}
	}
	return succeed;
}
//==============================
// * 手柄功能键 - 按键阻塞 - 双击[一帧]
//
//			说明：	> 如果 功能键 被按下，那么禁止触发下列 逻辑按键。
//==============================
var _drill_OKe_isRepeated = Input.isRepeated;
Input.isRepeated = function( keyName ){
	var succeed = _drill_OKe_isRepeated.call( this, keyName );
	if( succeed == true ){
		if( keyName == "ok" ||		//（这些键位为 基本键 ，不存在按住 功能键+单键 的情况。）
			keyName == "cancel" ||
			keyName == "pageup" ||
			keyName == "pagedown" ){
			
			// > 不阻塞标记
			if( this._drill_OKe_pad_isInFnOnce == true ){
				this._drill_OKe_pad_isInFnOnce = false;
				return succeed;
			}
			
			var bean_fn = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_fn'];
			if( bean_fn != undefined ){
				if( Input.isPressed( bean_fn._drill_name ) == true ){
					return false;
				}
			}
		}
	}
	return succeed;
}

//==============================
// * 菜单键 - 按键判断
//==============================
Game_Temp.prototype.drill_OKe_isMenuTriggered = function(){
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( this._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
		var bean = this._drill_OKe_pad_LogicMapperInverse['data_menu'];
		var bean_fn = this._drill_OKe_pad_LogicMapperInverse['data_fn'];
		if( bean == undefined ){ return false; }
		if( bean_fn == undefined ){ return false; }
		
		// > 手柄 - 功能键+单键
		if( bean._drill_has_fn == true ){
			Input._drill_OKe_pad_isInFnOnce = true;	//（不阻塞标记）
			return  Input.isTriggered( bean._drill_name ) == true && 
					Input.isPressed( bean_fn._drill_name ) == true;
		}
		
		// > 手柄 - 单键
		return Input.isTriggered( bean._drill_name ) == true && 
			   Input.isPressed( bean_fn._drill_name ) == false;
		
	// > 键盘
	}else{
		if( this._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse['dataList_menu'];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isTriggered() ){
				return true;
			}
		}
		return false;
	}
}
//==============================
// * 菜单键 - 具体判断（覆写）
//==============================
Scene_Map.prototype.isMenuCalled = function() {
	
	// > 鼠标/触屏
	if( TouchInput.isCancelled() ){ return true; }
	
	// > 键盘/手柄
	return $gameTemp.drill_OKe_isMenuTriggered();
};


//==============================
// * 游戏加速键 - 按键判断
//
//			说明：	> 来自插件【管理器-变速齿轮】的函数。
//==============================
Game_Temp.prototype.drill_OKe_isSpeedGearPressed = function(){
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		//（无）
		return false;
		
	// > 键盘
	}else{
		if( this._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse['dataList_speedGear'];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isPressed() ){
				return true;
			}
		}
		return false;
	}
}


//==============================
// * 跳跃键 - 按键判断
//==============================
Game_Temp.prototype.drill_OKe_isJumpTriggered = function(){
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( this._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
		var bean = this._drill_OKe_pad_LogicMapperInverse['data_jump'];
		var bean_fn = this._drill_OKe_pad_LogicMapperInverse['data_fn'];
		if( bean == undefined ){ return false; }
		if( bean_fn == undefined ){ return false; }
		
		// > 手柄 - 功能键+单键
		if( bean._drill_has_fn == true ){
			Input._drill_OKe_pad_isInFnOnce = true;	//（不阻塞标记）
			return  Input.isTriggered( bean._drill_name ) == true && 
					Input.isPressed( bean_fn._drill_name ) == true;
		}
		
		// > 手柄 - 单键
		return Input.isTriggered( bean._drill_name ) == true && 
			   Input.isPressed( bean_fn._drill_name ) == false;
	
	// > 键盘
	}else{
		if( this._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse['dataList_jump'];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isTriggered() ){
				return true;
			}
		}
		return false;
	}
}
//==============================
// * 跳跃键 - 具体判断
//
//			说明：	> 来自插件【互动-跳跃能力】的函数。
//==============================
if( Imported.Drill_Jump ){
	Game_Player.prototype.drill_isJumpControl = function() {
		
		// > 鼠标/触屏
		if( DrillUp.g_jump_mouse || DrillUp.jump_mouse ){ return true; }
		
		// > 键盘/手柄
		return $gameTemp.drill_OKe_isJumpTriggered();
	}
}


//==============================
// * 原地转向键 - 具体判断
//
//			说明：	> 来自插件【互动-原地转向能力】的函数。
//==============================
if( Imported.Drill_RotateDirection ){
	Game_Player.prototype.drill_isRotateControl = function() {
		
		// > 手柄（只功能键）
		if( Input.drill_OKe_isGamepadControling() ){
			if( $gameTemp._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
			var bean = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_rotate'];
			var bean_fn = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_fn'];
			if( bean == undefined ){ return false; }
			if( bean_fn == undefined ){ return false; }
			if( bean._drill_has_fn == true ){
				return Input.isPressed( bean_fn._drill_name ) == true && 
					( this.getInputDirection() == 2 ||
					  this.getInputDirection() == 4 ||
					  this.getInputDirection() == 6 ||
					  this.getInputDirection() == 8 );
			}else{
				return Input.isPressed( bean_fn._drill_name ) == false && 
					( this.getInputDirection() == 2 ||
					  this.getInputDirection() == 4 ||
					  this.getInputDirection() == 6 ||
					  this.getInputDirection() == 8 );
			}
		
		// > 键盘（只单键）
		}else{
			if( $gameTemp._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
			var bean_tank = $gameTemp._drill_OKe_keyboard_LogicMapperInverse['dataList_rotate'];
			for( var i=0; i < bean_tank.length; i++ ){
				var bean = bean_tank[i];
				if( bean == undefined ){ continue; }
				if( bean.drill_bean_isPressed() && 
					( this.getInputDirection() == 2 ||
					  this.getInputDirection() == 4 ||
					  this.getInputDirection() == 6 ||
					  this.getInputDirection() == 8 )
					){
					return true;
				}
			}
			return false;
		}
	}
}


//==============================
// * 花盆键 - 举起花盆键 - 按键判断
//==============================
Game_Temp.prototype.drill_OKe_isPickTriggered = function(){
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( this._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
		var bean = this._drill_OKe_pad_LogicMapperInverse['data_pick'];
		var bean_fn = this._drill_OKe_pad_LogicMapperInverse['data_fn'];
		if( bean == undefined ){ return false; }
		if( bean_fn == undefined ){ return false; }
		
		// > 手柄 - 功能键+单键
		if( bean._drill_has_fn == true ){
			Input._drill_OKe_pad_isInFnOnce = true;	//（不阻塞标记）
			return  Input.isTriggered( bean._drill_name ) == true && 
					Input.isPressed( bean_fn._drill_name ) == true;
		}
		
		// > 手柄 - 单键
		return Input.isTriggered( bean._drill_name ) == true && 
			   Input.isPressed( bean_fn._drill_name ) == false;
	
	// > 键盘
	}else{
		if( this._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse['dataList_pick'];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isTriggered() ){
				return true;
			}
		}
		return false;
	}
}
//==============================
// * 花盆键 - 投掷花盆键 - 按键判断
//==============================
Game_Temp.prototype.drill_OKe_isThrowTriggered = function(){
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( this._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
		var bean = this._drill_OKe_pad_LogicMapperInverse['data_throw'];
		var bean_fn = this._drill_OKe_pad_LogicMapperInverse['data_fn'];
		if( bean == undefined ){ return false; }
		if( bean_fn == undefined ){ return false; }
		
		// > 手柄 - 功能键+单键
		if( bean._drill_has_fn == true ){
			Input._drill_OKe_pad_isInFnOnce = true;	//（不阻塞标记）
			return  Input.isTriggered( bean._drill_name ) == true && 
					Input.isPressed( bean_fn._drill_name ) == true;
		}
		
		// > 手柄 - 单键
		return Input.isTriggered( bean._drill_name ) == true && 
			   Input.isPressed( bean_fn._drill_name ) == false;
	
	// > 键盘
	}else{
		if( this._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse['dataList_throw'];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isTriggered() ){
				return true;
			}
		}
		return false;
	}
}
//==============================
// * 花盆键 - 举起花盆键 - 具体判断
//
//			说明：	> 来自插件【互动-举起花盆能力】的函数。
//==============================
if( Imported.Drill_PickThrow ){
	Game_Player.prototype.drill_isPickControl = function() {
		
		// > 鼠标/触屏
		if( TouchInput.isPressed() || Input.isPressed('ok') ){ return true; }
		
		// > 键盘/手柄
		return $gameTemp.drill_OKe_isPickTriggered();
	}
}
//==============================
// * 花盆键 - 投掷花盆键 - 具体判断
//
//			说明：	> 来自插件【互动-举起花盆能力】的函数。
//==============================
if( Imported.Drill_PickThrow ){
	Game_Player.prototype.drill_isThrowControl = function() {
		
		// > 键盘/手柄
		return $gameTemp.drill_OKe_isThrowTriggered();
	}
}
//==============================
// * 花盆键 - 屏蔽 事件触发
//
//			说明：	> 举起默认与确定键绑定，如果举起与确定键分离，则换为手动与举起的花盆互动。
//==============================
if( Imported.Drill_PickThrow ){
	var _drill_OKe_pick_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
	Game_Player.prototype.triggerButtonAction = function() {
		var r = _drill_OKe_pick_triggerButtonAction.call(this);
		if( r == false ){
			
			// > 手柄
			if( Input.drill_OKe_isGamepadControling() ){
				if( $gameTemp._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
				var bean = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_pick'];
				var bean_fn = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_fn'];
				if( bean == undefined ){ return false; }
				if( bean_fn == undefined ){ return false; }
				if( Input.isTriggered( bean._drill_name ) ){
					
					this.checkEventTriggerHere([0]);
					if( $gameMap.setupStartingEvent() ){
						return true;
					}
					this.checkEventTriggerThere([0,1,2]);
					if( $gameMap.setupStartingEvent() ){
						return true;
					}
				}
				
			// > 键盘
			}else{
				if( $gameTemp._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
				var bean_tank = $gameTemp._drill_OKe_keyboard_LogicMapperInverse['dataList_pick'];
				for( var i=0; i < bean_tank.length; i++ ){
					var bean = bean_tank[i];
					if( bean == undefined ){ continue; }
					if( bean.drill_bean_isTriggered() ){
						return true;
					}
				}
				return false;
			}
		}
		return r;
	};
}


//==============================
// * 放置炸弹键 - 按键判断
//==============================
Game_Temp.prototype.drill_OKe_isBombTriggered = function(){
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( this._drill_OKe_pad_LogicMapperInverse == undefined ){ return false; }
		var bean = this._drill_OKe_pad_LogicMapperInverse['data_bomb'];
		var bean_fn = this._drill_OKe_pad_LogicMapperInverse['data_fn'];
		if( bean == undefined ){ return false; }
		if( bean_fn == undefined ){ return false; }
		
		// > 手柄 - 功能键+单键
		if( bean._drill_has_fn == true ){
			Input._drill_OKe_pad_isInFnOnce = true;	//（不阻塞标记）
			return  Input.isTriggered( bean._drill_name ) == true && 
					Input.isPressed( bean_fn._drill_name ) == true;
		}
		
		// > 手柄 - 单键
		return Input.isTriggered( bean._drill_name ) == true && 
			   Input.isPressed( bean_fn._drill_name ) == false;
	
	// > 键盘
	}else{
		if( this._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return false; }
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse['dataList_bomb'];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isTriggered() ){
				return true;
			}
		}
		return false;
	}
}
//==============================
// * 放置炸弹键 - 具体判断
//
//			说明：	> 来自插件【炸弹人-游戏核心】的函数。
//==============================
if( Imported.Drill_BombCore ){
	Game_Player.prototype.drill_isBombControl = function() {
		return $gameTemp.drill_OKe_isBombTriggered();
	}
}



//=============================================================================
// ** ☆倒置效果
//
//			说明：	> 此模块专门提供 键盘、手柄 的倒置效果功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 倒置效果 - 手柄
//
//			说明：	> 此处 继承 映射数据初始化 函数，只修改 映射数据 。
//==============================
var _drill_OKe_gamePadKeys_RefreshData_convert = Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshData;
Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshData = function(){
	_drill_OKe_gamePadKeys_RefreshData_convert.call( this );
	
	var bean_tank = this._drill_OKe_pad_BeanTank;		//（由于是指针对象，此操作能直接修改到数据）
	
	if( $gameSystem._drill_OKe_pad_convertType == "方向翻转" ){
		var bean = bean_tank['data_up'];
		bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_down );
		var bean = bean_tank['data_down'];
		bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_up );
		var bean = bean_tank['data_left'];
		bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_right );
		var bean = bean_tank['data_right'];
		bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_left );
		
	}else if( $gameSystem._drill_OKe_pad_convertType == "方向右旋置换" ){
		var bean = bean_tank['data_up'];
		bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_left );
		var bean = bean_tank['data_down'];
		bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_right );
		var bean = bean_tank['data_left'];
		bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_up );
		var bean = bean_tank['data_right'];
		bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_down );
		
	}else if( $gameSystem._drill_OKe_pad_convertType == "方向随机混乱" ){
		var r_string = this.drill_OKe_getRandomString(4,["up","down","left","right"]);
		var bean = bean_tank['data_up'];
		if( r_string[0] == "up" ){ bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_up ); }
		if( r_string[0] == "down" ){ bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_down ); }
		if( r_string[0] == "left" ){ bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_left ); }
		if( r_string[0] == "right" ){ bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_right ); }
		var bean = bean_tank['data_down'];
		if( r_string[1] == "up" ){ bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_up ); }
		if( r_string[1] == "down" ){ bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_down ); }
		if( r_string[1] == "left" ){ bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_left ); }
		if( r_string[1] == "right" ){ bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_right ); }
		var bean = bean_tank['data_left'];
		if( r_string[2] == "up" ){ bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_up ); }
		if( r_string[2] == "down" ){ bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_down ); }
		if( r_string[2] == "left" ){ bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_left ); }
		if( r_string[2] == "right" ){ bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_right ); }
		var bean = bean_tank['data_right'];
		if( r_string[3] == "up" ){ bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_up ); }
		if( r_string[3] == "down" ){ bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_down ); }
		if( r_string[3] == "left" ){ bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_left ); }
		if( r_string[3] == "right" ){ bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_right ); }
		
	}else{	//（恢复方向）
		var bean = bean_tank['data_up'];
		bean.drill_bean_setNameAndStrValue_Base( "up", $gameSystem._drill_OKe_pad_up );
		var bean = bean_tank['data_down'];
		bean.drill_bean_setNameAndStrValue_Base( "down", $gameSystem._drill_OKe_pad_down );
		var bean = bean_tank['data_left'];
		bean.drill_bean_setNameAndStrValue_Base( "left", $gameSystem._drill_OKe_pad_left );
		var bean = bean_tank['data_right'];
		bean.drill_bean_setNameAndStrValue_Base( "right", $gameSystem._drill_OKe_pad_right );
	}
}
//==============================
// * 倒置效果 - 键盘
//
//			说明：	> 此处 继承 映射数据初始化 函数，只修改 映射数据 。
//==============================
var _drill_OKe_keyboardKeys_RefreshData_convert = Game_Temp.prototype.drill_OKe_keyboardKeys_RefreshData;
Game_Temp.prototype.drill_OKe_keyboardKeys_RefreshData = function(){
	_drill_OKe_keyboardKeys_RefreshData_convert.call( this );
	
	var bean_tank = this._drill_OKe_keyboard_BeanTank;	//（由于是指针对象，此操作能直接修改到数据）
	
	if( $gameSystem._drill_OKe_keyboard_convertType == "方向翻转" ){
		bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_down );
		bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_up );
		bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_right );
		bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_left );
		
	}else if( $gameSystem._drill_OKe_keyboard_convertType == "方向右旋置换" ){
		bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_left );
		bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_right );
		bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_up );
		bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_down );
		
	}else if( $gameSystem._drill_OKe_keyboard_convertType == "方向随机混乱" ){
		var r_string = this.drill_OKe_getRandomString(4,["up","down","left","right"]);
		bean_tank['dataList_up'] = [];
		if( r_string[0] == "up" ){ 
			bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_up );
		}
		if( r_string[0] == "down" ){ 
			bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_down );
		}
		if( r_string[0] == "left" ){ 
			bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_left );
		}
		if( r_string[0] == "right" ){ 
			bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_right );
		}
		bean_tank['dataList_down'] = [];
		if( r_string[1] == "up" ){ 
			bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_up );
		}
		if( r_string[1] == "down" ){ 
			bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_down );
		}
		if( r_string[1] == "left" ){ 
			bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_left );
		}
		if( r_string[1] == "right" ){ 
			bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_right );
		}
		bean_tank['dataList_left'] = [];
		if( r_string[2] == "up" ){ 
			bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_up );
		}
		if( r_string[2] == "down" ){ 
			bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_down );
		}
		if( r_string[2] == "left" ){ 
			bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_left );
		}
		if( r_string[2] == "right" ){ 
			bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_right );
		}
		bean_tank['dataList_right'] = [];
		if( r_string[3] == "up" ){ 
			bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_up );
		}
		if( r_string[3] == "down" ){ 
			bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_down );
		}
		if( r_string[3] == "left" ){ 
			bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_left );
		}
		if( r_string[3] == "right" ){ 
			bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_right );
		}
		
	}else{	//（恢复方向）
		bean_tank['dataList_up'] = this.drill_OKe_keyboard_getBeanList_Base( "up", $gameSystem._drill_OKe_keyboard_up );
		bean_tank['dataList_down'] = this.drill_OKe_keyboard_getBeanList_Base( "down", $gameSystem._drill_OKe_keyboard_down );
		bean_tank['dataList_left'] = this.drill_OKe_keyboard_getBeanList_Base( "left", $gameSystem._drill_OKe_keyboard_left );
		bean_tank['dataList_right'] = this.drill_OKe_keyboard_getBeanList_Base( "right", $gameSystem._drill_OKe_keyboard_right );
	}
}
//==============================
// * 倒置效果 - 工具 - 随机抽取N个
//==============================
Game_Temp.prototype.drill_OKe_getRandomString = function( count, list ){
	var list_from = JSON.parse(JSON.stringify( list ));
	var list_result = [];
	for(var i=0; i < count ; i++){
		var index = Math.floor(Math.random() * list_from.length);
		list_result.push(list_from[index]);
		list_from.splice(index,1);
	}
	return list_result;
}



//=============================================================================
// ** 手柄DEBUG窗口【Drill_OKe_PadDebugWindow】
//			
//			作用域：	地图界面、战斗界面、菜单界面
//			主功能：	定义一个窗口，用于描述 手柄设备 的内容信息。
//			子功能：	->设备绑定
//						->内容显示
//						
//			说明：	> 临时的调试窗口。
//=============================================================================
//==============================
// * 手柄DEBUG窗口 - 定义
//==============================
function Drill_OKe_PadDebugWindow() {
    this.initialize.apply(this, arguments);
};
Drill_OKe_PadDebugWindow.prototype = Object.create(Window_Base.prototype);
Drill_OKe_PadDebugWindow.prototype.constructor = Drill_OKe_PadDebugWindow;
//==============================
// * 手柄DEBUG窗口 - 初始化
//==============================
Drill_OKe_PadDebugWindow.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - 400, 8, 400, 305);	//（固定矩形范围）
	this.drill_window_initChild();		//初始化子功能
};
//==============================
// * 手柄DEBUG窗口 - 帧刷新
//==============================
Drill_OKe_PadDebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_window_updateContext();	//帧刷新 - 内容
};
//==============================
// * 手柄DEBUG窗口 - 窗口属性
//==============================
Drill_OKe_PadDebugWindow.prototype.lineHeight = function(){ return 18; };
Drill_OKe_PadDebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * 手柄DEBUG窗口 - 初始化子功能
//==============================
Drill_OKe_PadDebugWindow.prototype.drill_window_initChild = function() {
	
	// > 上一次内容
	this._drill_lastContext = "";
	
	// > 图片层级
	this.zIndex = 999;
	
	// > 窗口内容刷新
    this.contents.clear();
	this.createContents();
};
//==============================
// * 手柄DEBUG窗口 - 帧刷新内容
//==============================
Drill_OKe_PadDebugWindow.prototype.drill_window_updateContext = function() {
	if( $gameTemp._drill_OKe_pad_LogicMapperInverse == undefined ){ return; }
	
	// > 内容设置
	var context = "";
	context += "\\c[24]手柄逻辑按键（基本键）：\\c[0]";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'ok' ) ? "\\c[6]" : "\\c[7]");
	context += "  确定键  ";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'cancel' ) ? "\\c[6]" : "\\c[7]");
	context += "  取消键  ";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'shift' ) ? "\\c[6]" : "\\c[7]");
	context += "  加速键  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'pageup' ) ? "\\c[6]" : "\\c[7]");
	context += "  上一页  ";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'pagedown' ) ? "\\c[6]" : "\\c[7]");
	context += "  下一页  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'up' ) ? "\\c[6]" : "\\c[7]");
	context += "  上  ";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'down' ) ? "\\c[6]" : "\\c[7]");
	context += "  下  ";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'left' ) ? "\\c[6]" : "\\c[7]");
	context += "  左  ";
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( 'right' ) ? "\\c[6]" : "\\c[7]");
	context += "  右  ";
	context += "\n";
	var temp_bean;
	temp_bean = $gameTemp._drill_OKe_pad_LogicMapperInverse['data_fn'];
	context += (Input.drill_OKe_isGamepadControling() == true && Input.isPressed( temp_bean._drill_name ) ? "\\c[6]" : "\\c[7]");
	context += "  手柄功能键  ";
	context += "\n";
	context += "\\c[24]手柄逻辑按键（扩展键）：\\c[0]";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == true && $gameTemp.drill_OKe_isMenuTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  菜单键[一帧]  ";
	context += (Input.drill_OKe_isGamepadControling() == true && $gameTemp.drill_OKe_isJumpTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  跳跃键[一帧]  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == true && $gameTemp.drill_OKe_isPickTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  举起花盆键[一帧]  ";
	context += (Input.drill_OKe_isGamepadControling() == true && $gameTemp.drill_OKe_isThrowTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  投掷花盆键[一帧]  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == true && $gameTemp.drill_OKe_isBombTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  放置炸弹键[一帧]  ";
	context += "\n";
	context += "\\c[0]（按键后会变为亮黄色。注意逻辑按键能被改键）";
	context += "\n";
	
	// > 内容校验
	if( this._drill_lastContext == context ){ return; }
	this._drill_lastContext = context;
	
	// > 绘制设置
	if( Imported.Drill_CoreOfWindowAuxiliary ){
		var context_list = context.split("\n");
		var options = {
			'width':this.width,
			'lineheight':18,
			'align':"左对齐",
		};
		this.drill_COWA_drawTextListEx( context_list, options);
	}else{
		this.drawText("缺少核心插件，无法显示文本。", 2, 2, this.width, 'left');
		this.drawText("需要 Drill_CoreOfWindowAuxiliary 窗口辅助核心。", 2, 22, this.width, 'left');
	}
};


//=============================================================================
// ** 键盘DEBUG窗口【Drill_OKe_KeyboardDebugWindow】
//			
//			作用域：	地图界面、战斗界面、菜单界面
//			主功能：	定义一个窗口，用于描述 键盘设备 的内容信息。
//			子功能：	->设备绑定
//						->内容显示
//						
//			说明：	> 临时的调试窗口。
//=============================================================================
//==============================
// * 键盘DEBUG窗口 - 定义
//==============================
function Drill_OKe_KeyboardDebugWindow() {
    this.initialize.apply(this, arguments);
};
Drill_OKe_KeyboardDebugWindow.prototype = Object.create(Window_Base.prototype);
Drill_OKe_KeyboardDebugWindow.prototype.constructor = Drill_OKe_KeyboardDebugWindow;
//==============================
// * 键盘DEBUG窗口 - 初始化
//==============================
Drill_OKe_KeyboardDebugWindow.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - 400, 8, 400, 305);	//（固定矩形范围）
	this.drill_window_initChild();		//初始化子功能
};
//==============================
// * 键盘DEBUG窗口 - 帧刷新
//==============================
Drill_OKe_KeyboardDebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_window_updateContext();	//帧刷新 - 内容
};
//==============================
// * 键盘DEBUG窗口 - 窗口属性
//==============================
Drill_OKe_KeyboardDebugWindow.prototype.lineHeight = function(){ return 18; };
Drill_OKe_KeyboardDebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * 键盘DEBUG窗口 - 初始化子功能
//==============================
Drill_OKe_KeyboardDebugWindow.prototype.drill_window_initChild = function() {
	
	// > 上一次内容
	this._drill_lastContext = "";
	
	// > 图片层级
	this.zIndex = 999;
	
	// > 窗口内容刷新
    this.contents.clear();
	this.createContents();
};
//==============================
// * 键盘DEBUG窗口 - 帧刷新内容
//==============================
Drill_OKe_KeyboardDebugWindow.prototype.drill_window_updateContext = function() {
	if( $gameTemp._drill_OKe_keyboard_LogicMapperInverse == undefined ){ return; }
	
	// > 内容设置
	var context = "";
	context += "\\c[24]键盘逻辑按键（基本键）：\\c[0]";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'ok' ) ? "\\c[6]" : "\\c[7]");
	context += "  确定键  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'cancel' ) ? "\\c[6]" : "\\c[7]");
	context += "  取消键  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'shift' ) ? "\\c[6]" : "\\c[7]");
	context += "  加速键  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'pageup' ) ? "\\c[6]" : "\\c[7]");
	context += "  上一页  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'pagedown' ) ? "\\c[6]" : "\\c[7]");
	context += "  下一页  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'up' ) ? "\\c[6]" : "\\c[7]");
	context += "  上  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'down' ) ? "\\c[6]" : "\\c[7]");
	context += "  下  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'left' ) ? "\\c[6]" : "\\c[7]");
	context += "  左  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'right' ) ? "\\c[6]" : "\\c[7]");
	context += "  右  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'tab' ) ? "\\c[6]" : "\\c[7]");
	context += "  辅助Tab键  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'debug' ) ? "\\c[6]" : "\\c[7]");
	context += "  游戏测试中Debug键  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'control' ) ? "\\c[6]" : "\\c[7]");
	context += "  游戏测试中穿墙键  ";
	context += (Input.drill_OKe_isGamepadControling() == false && Input.isPressed( 'speedGear' ) ? "\\c[6]" : "\\c[7]");
	context += "  游戏测试中游戏加速键  ";
	context += "\n";
	context += "\\c[24]键盘逻辑按键（扩展键）：\\c[0]";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && $gameTemp.drill_OKe_isMenuTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  菜单键[一帧]  ";
	context += (Input.drill_OKe_isGamepadControling() == false && $gameTemp.drill_OKe_isJumpTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  跳跃键[一帧]  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && $gameTemp.drill_OKe_isPickTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  举起花盆键[一帧]  ";
	context += (Input.drill_OKe_isGamepadControling() == false && $gameTemp.drill_OKe_isThrowTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  投掷花盆键[一帧]  ";
	context += "\n";
	context += (Input.drill_OKe_isGamepadControling() == false && $gameTemp.drill_OKe_isBombTriggered() ? "\\c[6]" : "\\c[7]");
	context += "  放置炸弹键[一帧]  ";
	context += "\n";
	context += "\\c[0]（按键后会变为亮黄色。注意逻辑按键能被改键）";
	context += "\n";
	
	// > 内容校验
	if( this._drill_lastContext == context ){ return; }
	this._drill_lastContext = context;
	
	// > 绘制设置
	if( Imported.Drill_CoreOfWindowAuxiliary ){
		var context_list = context.split("\n");
		var options = {
			'width':this.width,
			'lineheight':18,
			'align':"左对齐",
		};
		this.drill_COWA_drawTextListEx( context_list, options);
	}else{
		this.drawText("缺少核心插件，无法显示文本。", 2, 2, this.width, 'left');
		this.drawText("需要 Drill_CoreOfWindowAuxiliary 窗口辅助核心。", 2, 22, this.width, 'left');
	}
};


