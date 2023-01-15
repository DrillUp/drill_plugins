//=============================================================================
// Drill_OperateKeys.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        键盘 - 键盘手柄按键修改器
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
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   直接修改游戏的所有 手柄与键盘 的逻辑按键。
 * 2.你需要了解基本的按键定义，去看看 "1.系统 > 关于输入设备核心.docx"。
 * 键盘与手柄:
 *   (1.物理按键：指真实世界键盘上/手柄上存在的按键，比如z,x,c,v键等。
 *      逻辑按键：指游戏中用于划分特定功能的按键，比如确定键,取消键,跳跃键等。
 *   (2.手柄因为键位少，所以固定了功能键的设置。
 *      键盘就可以完全灵活设置，任意一个或两个键都可以触发，并且几个键可以
 *      作用于同一个功能。
 *   (3.注意，该插件有可能覆盖掉其他插件的某些自定义按键设置，你需要调整一
 *      下插件先后位置。如果按键仍然不起效果，那么只能做插件取舍了。
 * 基本键/扩展键：
 *   (1.基本键和扩展键都属于 逻辑按键。
 *   (2.基本键的键位 相互 必须不重复，若重复则出现按键失效情况。
 *   (3.扩展键的键位 相互 可以重复，同一个键位表示多个逻辑按键，可节约按键，
 *      但是要注意对应键起效的时机，场景等情况。
 * 特殊键盘按键：
 *   (1.你可以设置特殊的键盘按键，可以填入以下字符关键字：
 *       Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
 *       ~ - = [ ] \ ; ' , . /
 *       Tab Shift Ctrl Alt 上 下 左 右 空格 Enter
 *       PageUp PageDown End Home Insert Delete
 *   (2.小键盘：
 *       Num0 Num1 Num2 Num3 Num4 Num5 Num6 Num7 Num8 Num9
 *       Num* Num+ Num- Num. Num/ NumEnter
 * 设计：
 *   (1.你可以通过插件指令设置方向键翻转，做成arpg的"混乱"状态效果。
 *      倒置效果在所有界面中都有效，包括 菜单界面 按键倒置。
 *      注意离开地图后，要随时恢复此效果，防止被永久翻转了。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过下列插件指令随机翻转方向键：
 *
 * 插件指令： >按键修改 : 倒置效果 : 方向翻转
 * 插件指令： >按键修改 : 倒置效果 : 方向右旋置换
 * 插件指令： >按键修改 : 倒置效果 : 方向随机混乱
 * 插件指令： >按键修改 : 倒置效果 : 恢复方向
 *
 * 1.对键盘和手柄都有效果，并且如果键盘有多个方向键，同样也起作用。
 * 2.这个效果在菜单界面也有效。
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
 * 测试方法：   直接去物体管理层、地图管理层、镜像管理层转一圈即可。
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
 * 
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
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的加速键。注意，基本键的键位不可重复。
 * @default X
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
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的上一页键。注意，基本键的键位不可重复。
 * @default LB
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
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄对应的游戏中的下一页键。注意，基本键的键位不可重复。
 * @default RB
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
 * @desc 手柄对应的游戏中的跳跃按键。需要"跳跃能力"插件。
 * @default LB
 *
 * @param 手柄-原地转向键
 * @parent ----手柄扩展键----
 * @type select
 * @option 十字键
 * @value 十字键
 * @option 功能键 + 十字键
 * @value 功能键 + 十字键
 * @desc 单独的十字键，表示必须要按住功能键才能走，否则只能原地转向。需要"原地转向能力"插件。
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
 * @desc 举起花盆对应的按键。需要"举起花盆能力"插件。
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
 * @desc 投掷花盆对应的按键。需要"举起花盆能力"插件。
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
 * @desc 放置炸弹对应的按键。需要"炸弹人-游戏核心"插件。
 * @default 功能键 + X
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
 * @default ["Ctrl","Alt"]
 *
 * @param ----键盘扩展键----
 * @default 
 *
 * @param 键盘-菜单键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边有空格。填入字符或者键盘特殊按键。
 * @default ["x","d","Esc","Num0"]
 *
 * @param 键盘-跳跃键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边有空格。填入字符或者键盘特殊按键。
 * @default ["q","a"]
 *
 * @param 键盘-原地转向键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 键盘对应的游戏中的原地转向键。只填入一个字符。按住相应字符，与上下左右配合，角色只原地转向。
 * @default ["w","s"]
 *
 * @param 键盘-举起花盆键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边有空格。填入字符或者键盘特殊按键。
 * @default ["z"]
 *
 * @param 键盘-投掷花盆键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边有空格。填入字符或者键盘特殊按键。
 * @default ["z"]
 *
 * @param 键盘-放置炸弹键
 * @parent ----键盘扩展键----
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边有空格。填入字符或者键盘特殊按键。
 * @default ["c"]
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		OKe（Operate_Keys）
//		临时全局变量	DrillUp.g_OKe_xxxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_OKe_pad
//						$gameSystem._drill_OKe_keyboard
//		全局存储变量	无
//		覆盖重写方法	Input.gamepadMapper 变量
//						Input.keyMapper 变量
//						Scene_Map.prototype.isMenuCalled
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	乱跑
//		★性能测试消耗	11.87ms  17.48ms（drill_OKe_isGamepadControling函数，Bomb判断占了9.32ms）
//		★最坏情况		无
//		★备注			不好测，低消耗有时候找的到，有时候找不到。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			手柄：
//				->改键
//				->基本键
//				->功能键控制（扩展键）
//				->按键倒置效果
//			键盘：
//				->改键
//				->基本键
//				->添加新键控制（扩展键）
//				->A+B两键控制
//				->按键倒置效果
//	
//		★必要注意事项：
//			1.互动之间如果有较复杂的接口，最好遵循下面的格式：
//				drill_canXxxx_Normal		面板-静态限制条件（无提示音，面板不收回）
//				drill_canXxxx_Conditional	面板-特殊限制条件（有提示音，面板收回）
//				drill_doXxxx				面板-执行操作
//				drill_isXxxxControl			按键-按下即可操作
//			  注意，面板和按键只做自己的事情，不额外调用插件的其它函数、变量。
//			  除了以上接口，其他函数放心改名/改动。
//			
//		★其它说明细节：
//			1.yep局限性：yep的按键功能比较健全，但是代价是不可将两个键设置在同一键位上。比如举起花盆与确定键 可重合 也可分离，yep无法做到这一点。
//			2.input特殊属性：'escape'键 =  'menu'键 + 'cancel'键
//			3.这里 手柄控制的原地转向 与 键盘的原地转向 设置有偏差。（手柄毕竟没有那么多键位）
//
//		★原理：
//			这里的映射关系颇为复杂，首先不能破坏原有的键位顺序（原有的菜单键又可分离可重合）
//			整合之后，还要考虑功能键情况。（毕竟组合按键能扩展很多东西，没想到这个比鼠标面板还要复杂。）
//			【rpg_core内核通过 isTriggered("jump") 关键字来映射按钮，多个按钮可以触发同一个关键字"jump"，但是反之不能。】
//			【为了使得同一个按钮可以触发不同情况，在不同功能写 isTriggered("jump")来判断就可以了。】	
//			如果键位少了，需要重新利用，添加新的字段，比如"jump"字段等。	
//		
//			$gameSystem._drill_OKe_pad 存储所有【手柄的】键位内容。
//				如果临时修改了键位，执行init方法即可。
//				['aaa']：当前key的键位【值】
//				['aaa_str']：当前key的键位【名】
//				['aaa_has_fn']：当前key是否存在功能键
//				['aaa_repeat']：当前key的重合键【名】
//			多出来的键位，会被另外命名"jump"字段。
//				
//			总体来说，非常绕，如果你要添加键位或者修改键位，依葫芦画瓢吧。
//			手柄是单个的，键盘更恶心，是数组……完全多对多。
//	
//			$gameSystem._drill_OKe_keyboard 存储所有【键盘的】键位内容。
//				['aaa']：json字段
//				['aaa']['A']：当前key的A键位【值】
//				['aaa']['B']：当前key的B键位【值】（没有则为-1）
//				['aaa']['AA']：当前key的A键位【名】
//				['aaa']['BB']：当前key的B键位【名】（没有则为""）
//			多出来的键位，会被另外命名"jump_A""jump_B"字段。
//	
//			所有键盘的功能键，都按照两个键位来处理，需要考虑一个键按一次，与两个键不同时机按一次的情况。
//
//		★存在的问题：
//			1.直接修改映射会屏蔽掉一些未知按键，比如debug时的ctrl的特权穿透键。
//			2.如果有新的按键内容加入，必须根据脚本依葫芦画瓢。没有合适的接口，只能硬编码。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_OperateKeys = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_OperateKeys');


	/*-----------------手柄 基本键------------------*/
    DrillUp.g_OKe_pad_ok = String(DrillUp.parameters['手柄-确定键'] || "A");
    DrillUp.g_OKe_pad_cancel = String(DrillUp.parameters['手柄-取消键'] || "B");
    DrillUp.g_OKe_pad_shift = String(DrillUp.parameters['手柄-加速键'] || "X");
    DrillUp.g_OKe_pad_pageup = String(DrillUp.parameters['手柄-上一页'] || "LB");
    DrillUp.g_OKe_pad_pagedown = String(DrillUp.parameters['手柄-下一页'] || "RB");
    DrillUp.g_OKe_pad_up = String(DrillUp.parameters['手柄-上'] || "上");
    DrillUp.g_OKe_pad_down = String(DrillUp.parameters['手柄-下'] || "下");
    DrillUp.g_OKe_pad_left = String(DrillUp.parameters['手柄-左'] || "左");
    DrillUp.g_OKe_pad_right = String(DrillUp.parameters['手柄-右'] || "右");
	
	/*-----------------手柄 扩展键------------------*/
    DrillUp.g_OKe_pad_fn = String(DrillUp.parameters['手柄-功能键'] || "RB");
    DrillUp.g_OKe_pad_menu = String(DrillUp.parameters['手柄-菜单键'] || "Y");
    DrillUp.g_OKe_pad_jump = String(DrillUp.parameters['手柄-跳跃键'] || "LB");
    DrillUp.g_OKe_pad_rotate = String(DrillUp.parameters['手柄-原地转向键'] || "功能键 + 十字键");
    DrillUp.g_OKe_pad_pick = String(DrillUp.parameters['手柄-举起花盆键'] || "A");
    DrillUp.g_OKe_pad_throw = String(DrillUp.parameters['手柄-投掷花盆键'] || "A");
    DrillUp.g_OKe_pad_bomb = String(DrillUp.parameters['手柄-放置炸弹键'] || "功能键 + X");

	/*-----------------键盘 基本键------------------*/
	if( DrillUp.parameters['键盘-确定键'] != "" ){ DrillUp.g_OKe_keyboard_ok = JSON.parse(DrillUp.parameters['键盘-确定键']); }else{ DrillUp.g_OKe_keyboard_ok = [];}
	if( DrillUp.parameters['键盘-取消键'] != "" ){ DrillUp.g_OKe_keyboard_cancel = JSON.parse(DrillUp.parameters['键盘-取消键']); }else{ DrillUp.g_OKe_keyboard_cancel = [];}
	if( DrillUp.parameters['键盘-加速键'] != "" ){ DrillUp.g_OKe_keyboard_shift = JSON.parse(DrillUp.parameters['键盘-加速键']); }else{ DrillUp.g_OKe_keyboard_shift = [];}
	if( DrillUp.parameters['键盘-上一页'] != "" ){ DrillUp.g_OKe_keyboard_pageup = JSON.parse(DrillUp.parameters['键盘-上一页']); }else{ DrillUp.g_OKe_keyboard_pageup = [];}
	if( DrillUp.parameters['键盘-下一页'] != "" ){ DrillUp.g_OKe_keyboard_pagedown = JSON.parse(DrillUp.parameters['键盘-下一页']); }else{ DrillUp.g_OKe_keyboard_pagedown = [];}
	if( DrillUp.parameters['键盘-上'] != "" ){ DrillUp.g_OKe_keyboard_up = JSON.parse(DrillUp.parameters['键盘-上']); }else{ DrillUp.g_OKe_keyboard_up = [];}
	if( DrillUp.parameters['键盘-下'] != "" ){ DrillUp.g_OKe_keyboard_down = JSON.parse(DrillUp.parameters['键盘-下']); }else{ DrillUp.g_OKe_keyboard_down = [];}
	if( DrillUp.parameters['键盘-左'] != "" ){ DrillUp.g_OKe_keyboard_left = JSON.parse(DrillUp.parameters['键盘-左']); }else{ DrillUp.g_OKe_keyboard_left = [];}
	if( DrillUp.parameters['键盘-右'] != "" ){ DrillUp.g_OKe_keyboard_right = JSON.parse(DrillUp.parameters['键盘-右']); }else{ DrillUp.g_OKe_keyboard_right = [];}
	if( DrillUp.parameters['键盘-辅助Tab键'] != "" ){ DrillUp.g_OKe_keyboard_tab = JSON.parse(DrillUp.parameters['键盘-辅助Tab键']); }else{ DrillUp.g_OKe_keyboard_tab = [];}
	if( DrillUp.parameters['键盘-游戏测试中Debug键'] != "" ){ DrillUp.g_OKe_keyboard_debug = JSON.parse(DrillUp.parameters['键盘-游戏测试中Debug键']); }else{ DrillUp.g_OKe_keyboard_debug = [];}
	if( DrillUp.parameters['键盘-游戏测试中穿墙键'] != "" ){ DrillUp.g_OKe_keyboard_control = JSON.parse(DrillUp.parameters['键盘-游戏测试中穿墙键']); }else{ DrillUp.g_OKe_keyboard_control = [];}
	
	/*-----------------键盘 扩展键------------------*/
	if( DrillUp.parameters['键盘-菜单键'] != "" ){ DrillUp.g_OKe_keyboard_menu = JSON.parse(DrillUp.parameters['键盘-菜单键']); }else{ DrillUp.g_OKe_keyboard_menu = [];}
	if( DrillUp.parameters['键盘-跳跃键'] != "" ){ DrillUp.g_OKe_keyboard_jump = JSON.parse(DrillUp.parameters['键盘-跳跃键']); }else{ DrillUp.g_OKe_keyboard_jump = [];}
	if( DrillUp.parameters['键盘-原地转向键'] != "" ){ DrillUp.g_OKe_keyboard_rotate = JSON.parse(DrillUp.parameters['键盘-原地转向键']); }else{ DrillUp.g_OKe_keyboard_rotate = [];}
	if( DrillUp.parameters['键盘-举起花盆键'] != "" ){ DrillUp.g_OKe_keyboard_pick = JSON.parse(DrillUp.parameters['键盘-举起花盆键']); }else{ DrillUp.g_OKe_keyboard_pick = [];}
	if( DrillUp.parameters['键盘-投掷花盆键'] != "" ){ DrillUp.g_OKe_keyboard_throw = JSON.parse(DrillUp.parameters['键盘-投掷花盆键']); }else{ DrillUp.g_OKe_keyboard_throw = [];}
	if( DrillUp.parameters['键盘-放置炸弹键'] != "" ){ DrillUp.g_OKe_keyboard_bomb = JSON.parse(DrillUp.parameters['键盘-放置炸弹键']); }else{ DrillUp.g_OKe_keyboard_bomb = [];}
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_OperateKeys_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_OperateKeys_pluginCommand.call(this,command, args);
	if( command === ">按键修改" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type === "倒置效果" ){
				$gameSystem._drill_Oke_isConvert = true;
				$gameSystem._drill_Oke_convertType = temp1;
				if( temp1 === "恢复方向" ){
					$gameSystem._drill_Oke_isConvert = false;
				}
				$gameSystem.drill_OKe_changeGamePadKeys();
				$gameSystem.drill_OKe_changeKeyBoardKeys();
			}
		}
	};
};

//=============================================================================
// ** 键位配置
//=============================================================================
	DrillUp.g_OKe_padMapper = {			// 【手柄物理按键映射】
										// （比如'A':0，表示物理手柄的A键(键位0)，对应了字符串"A"，不能重复）
		'A': 0,  
		'B': 1,  
		'X': 2,  
		'Y': 3,  
		'LB': 4, 
		'RB': 5, 
		'上': 12,  
		'下': 13,  
		'左': 14,   
		'右': 15,  
	};
	DrillUp.g_OKe_org_padMapper = {		// 【手柄逻辑按键映射】
		0: 'ok',        				// 手柄的A 			（确定键）
		1: 'cancel',    				// 手柄的B 			（取消键）
		2: 'shift',     				// 手柄的X 			（加速键）
		3: 'menu',      				// 手柄的Y 			（菜单键）
		4: 'pageup',    				// 手柄的LB 		（上一页）
		5: 'pagedown',  				// 手柄的RB 		（下一页）
		12: 'up',       				// 手柄的up			（上）
		13: 'down',     				// 手柄的down		（下）
		14: 'left',     				// 手柄的left		（左）
		15: 'right',    				// 手柄的right		（右）
	};
	
	DrillUp.g_OKe_keyboardMapper = {	// 【键盘物理按键映射】
										// （比如'ESC':27，表示物理键盘的ESC键(ASCII码27)，对应了字符串"ESC"，不能重复）
		'ESC':27,  'F1':112,  'F2':113,  'F3':114,  'F4':115,  'F5':116,  'F6':117,  'F7':118,  'F8':119,  'F9':120,  'F10':121,  'F11':122,  'F12':123,
		'~':192,  '0':48,  '1':49,  '2':50,  '3':51,  '4':52,  '5':53,  '6':54,  '7':55,  '8':56,  '9':57,  '-':189,  '=':187,
		'TAB':9,  'Q':81,  'W':87,  'E':69,  'R':82,  'T':84,  'Y':89,  'U':85,  'I':73,  'O':79,  'P':80,  '[':219,  ']':221,  '\\':220,
		'A':65,  'S':83,  'D':68,  'F':70,  'G':71,  'H':72,  'J':74,  'K':75,  'L':76,  ';':186,  "'":222,
		'SHIFT':16,  'Z':90,  'X':88,  'C':67,  'V':86,  'B':66,  'N':78,  'M':77,  ',':188,  '.':190,  '/':191,
		'CTRL':17,  'ALT':18,  '上':38,  '下':40,  '左':37,  '右':39,  '空格':32,  'ENTER':13,
		'PAGEUP':33,  'PAGEDOWN':34,  'END':35,  'HOME':36,  'INSERT':45,  'DELETE':46,  
		'NUM0':96,  'NUM1':97,  'NUM2':98,  'NUM3':99,  'NUM4':100,  'NUM5':101,  'NUM6':102,  'NUM7':103,  'NUM8':104,  'NUM9':105,  'NUM*':106,  'NUM+':107,  'NUMENTER':108,  'NUM-':109,  'NUM.':110,  'NUM/':111,  
	};
	DrillUp.g_OKe_org_keyMapper = {		// 【键盘逻辑按键映射】
		9: 'tab',       				// 键盘的tab		（辅助Tab键）
		13: 'ok',       				// 键盘的enter		（确定键）
		16: 'shift',    				// 键盘的shift		（加速键）
		17: 'control',  				// 键盘的control	（控制键）
		18: 'control',  				// 键盘的alt		（控制键）
		27: 'escape',   				// 键盘的escape		（离开键）
		32: 'ok',       				// 键盘的space		（确定键）
		33: 'pageup',   				// 键盘的pageup		（上一页）
		34: 'pagedown', 				// 键盘的pagedown	（下一页）
		37: 'left',     				// 键盘的left		（左）
		38: 'up',       				// 键盘的up			（上）
		39: 'right',    				// 键盘的right		（下）
		40: 'down',     				// 键盘的down		（右）
		45: 'escape',   				// 键盘的insert		（离开键）
		81: 'pageup',   				// 键盘的Q			（上一页）
		87: 'pagedown', 				// 键盘的W			（下一页）
		88: 'escape',   				// 键盘的X			（离开键）
		90: 'ok',       				// 键盘的Z			（确定键）
		96: 'escape',   				// 键盘的numpad 0	（离开键）
		98: 'down',     				// 键盘的numpad 2	（下）
		100: 'left',    				// 键盘的numpad 4	（左）
		102: 'right',   				// 键盘的numpad 6	（右）
		104: 'up',      				// 键盘的numpad 8	（上）
		120: 'debug'    				// 键盘的F9			（游戏测试中Debug键）
	};
	


//#############################################################################
// ** 【标准模块】存储数据
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
	
	this._drill_Oke_isConvert = false;
	this._drill_Oke_convertType = "";
	//alert(this.drill_OKe_getRandomString(4,["up","down","left","right"]));
	
    this.drill_OKe_gamePadKeysInit();		//手柄 - 键位初始化
    this.drill_OKe_changeGamePadKeys();		//手柄 - 键位改变
	this.drill_OKe_keyboardKeysInit();		//键盘 - 键位初始化
	this.drill_OKe_changeKeyBoardKeys();	//键盘 - 改变键位
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_OKe_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_Oke_convertType == undefined ){
		this.drill_OKe_initSysData();
	}
	
};

//==============================
// * 手柄 - 键位初始化
//==============================
Game_System.prototype.drill_OKe_gamePadKeysInit = function() {
	
	this._drill_OKe_pad = {}			
	var pad = this._drill_OKe_pad;
	var mapper = DrillUp.g_OKe_padMapper;
	
	/*----------获取基本键----------*/
	pad['ok'] = Number(mapper[DrillUp.g_OKe_pad_ok]);
	pad['cancel'] = Number(mapper[DrillUp.g_OKe_pad_cancel]);
	pad['shift'] = Number(mapper[DrillUp.g_OKe_pad_shift]);
	pad['pageup'] = Number(mapper[DrillUp.g_OKe_pad_pageup]);
	pad['pagedown'] = Number(mapper[DrillUp.g_OKe_pad_pagedown]);
	pad['up'] = Number(mapper[DrillUp.g_OKe_pad_up]);
	pad['down'] = Number(mapper[DrillUp.g_OKe_pad_down]);
	pad['left'] = Number(mapper[DrillUp.g_OKe_pad_left]);
	pad['right'] = Number(mapper[DrillUp.g_OKe_pad_right]);
	
	this._drill_OKe_gamepadMapper = {};		//预置插入基本键（判断重复）
	this._drill_OKe_gamepadMapper[ pad['ok'] ] = 'ok';
	this._drill_OKe_gamepadMapper[ pad['cancel'] ] = 'cancel';
	this._drill_OKe_gamepadMapper[ pad['shift'] ] = 'shift';
	this._drill_OKe_gamepadMapper[ pad['pageup'] ] = 'pageup';
	this._drill_OKe_gamepadMapper[ pad['pagedown'] ] = 'pagedown';
	this._drill_OKe_gamepadMapper[ pad['up'] ] = 'up';
	this._drill_OKe_gamepadMapper[ pad['down'] ] = 'down';
	this._drill_OKe_gamepadMapper[ pad['left'] ] = 'left';
	this._drill_OKe_gamepadMapper[ pad['right'] ] = 'right';
	if(Object.keys(this._drill_OKe_gamepadMapper).length < 9){
		alert("【Drill_OperateKeys.js  键盘 - 键盘手柄按键修改器】\n手柄检测到重复的基本键设置，一些按键可能会无法使用。");
	}
	
	/*----------获取扩展键----------*/
	pad['fn'] = Number(mapper[DrillUp.g_OKe_pad_fn]);
	if( DrillUp.g_OKe_pad_menu.indexOf('功能键') != -1 ){	//菜单键
		pad['menu_has_fn'] = true;
		pad['menu_str'] = String(DrillUp.g_OKe_pad_menu.split(' + ')[1]);
		pad['menu'] = Number(mapper[pad['menu_str']]);
	}else{
		pad['menu_has_fn'] = false;
		pad['menu_str'] = DrillUp.g_OKe_pad_menu;
		pad['menu'] = Number(mapper[pad['menu_str']]);
	}
	if( DrillUp.g_OKe_pad_jump.indexOf('功能键') != -1 ){	//跳跃键
		pad['jump_has_fn'] = true;
		pad['jump_str'] = String(DrillUp.g_OKe_pad_jump.split(' + ')[1]);
		pad['jump'] = Number(mapper[pad['jump_str']]);
	}else{
		pad['jump_has_fn'] = false;
		pad['jump_str'] = DrillUp.g_OKe_pad_jump;
		pad['jump'] = Number(mapper[pad['jump_str']]);
	}
	if( DrillUp.g_OKe_pad_rotate.indexOf('功能键') != -1 ){	//原地转向（比较特殊）
		pad['rotate_has_fn'] = true;
	}else{
		pad['rotate_has_fn'] = false;
	}
	if( DrillUp.g_OKe_pad_pick.indexOf('功能键') != -1 ){	//举起花盆
		pad['pick_has_fn'] = true;
		pad['pick_str'] = String(DrillUp.g_OKe_pad_pick.split(' + ')[1]);
		pad['pick'] = Number(mapper[pad['pick_str']]);
	}else{
		pad['pick_has_fn'] = false;
		pad['pick_str'] = DrillUp.g_OKe_pad_pick;
		pad['pick'] = Number(mapper[pad['pick_str']]);
	}
	if( DrillUp.g_OKe_pad_throw.indexOf('功能键') != -1 ){	//投掷花盆
		pad['throw_has_fn'] = true;
		pad['throw_str'] = String(DrillUp.g_OKe_pad_throw.split(' + ')[1]);
		pad['throw'] = Number(mapper[pad['throw_str']]);
	}else{
		pad['throw_has_fn'] = false;
		pad['throw_str'] = DrillUp.g_OKe_pad_throw;
		pad['throw'] = Number(mapper[pad['throw_str']]);
	}
	if( DrillUp.g_OKe_pad_bomb.indexOf('功能键') != -1 ){	//放置炸弹
		pad['bomb_has_fn'] = true;
		pad['bomb_str'] = String(DrillUp.g_OKe_pad_bomb.split(' + ')[1]);
		pad['bomb'] = Number(mapper[pad['bomb_str']]);
	}else{
		pad['bomb_has_fn'] = false;
		pad['bomb_str'] = DrillUp.g_OKe_pad_bomb;
		pad['bomb'] = Number(mapper[pad['bomb_str']]);
	}
	
	/*----------扩展键查重复----------*/
	pad['fn_repeat'] = '';			//功能键
	var temp_str = this._drill_OKe_gamepadMapper[pad['fn']];	//从基本键中获取字段
	if( temp_str != undefined  ){
		pad['fn_repeat'] = temp_str;
	}else{
		pad['fn_repeat'] = 'fn' ;
		this._drill_OKe_gamepadMapper[ pad['fn'] ] = 'fn';		//如果没有重合，新建一个key映射
	}
	
	pad['menu_repeat'] = '';		//菜单键
	var temp_str = this._drill_OKe_gamepadMapper[pad['menu']];	//从基本键中获取字段
	if( temp_str != undefined ){
		pad['menu_repeat'] = temp_str;
	}else{
		pad['menu_repeat'] = 'menu' ;
		this._drill_OKe_gamepadMapper[ pad['menu'] ] = 'menu';	//如果没有重合，新建一个key映射
	}
	
	pad['jump_repeat'] = '';		//跳跃键
	var temp_str = this._drill_OKe_gamepadMapper[pad['jump']];	//从基本键中获取字段
	if( temp_str != undefined ){
		pad['jump_repeat'] = temp_str;
	}else{
		pad['jump_repeat'] = 'jump' ;
		this._drill_OKe_gamepadMapper[ pad['jump'] ] = 'jump';	//如果没有重合，新建一个key映射
	}
	
	pad['pick_repeat'] = '';		//举起花盆
	var temp_str = this._drill_OKe_gamepadMapper[pad['pick']];	//从基本键中获取字段
	if( temp_str != undefined ){
		pad['pick_repeat'] = temp_str;
	}else{
		pad['pick_repeat'] = 'pick' ;
		this._drill_OKe_gamepadMapper[ pad['pick'] ] = 'pick';	//如果没有重合，新建一个key映射
	}
	
	pad['throw_repeat'] = '';		//投掷花盆
	var temp_str = this._drill_OKe_gamepadMapper[pad['throw']];	//从基本键中获取字段
	if( temp_str != undefined  ){
		pad['throw_repeat'] = temp_str;
	}else{
		pad['throw_repeat'] = 'throw' ;
		this._drill_OKe_gamepadMapper[ pad['throw'] ] = 'throw';	//如果没有重合，新建一个key映射
	}
	
	pad['bomb_repeat'] = '';		//放置炸弹
	var temp_str = this._drill_OKe_gamepadMapper[pad['bomb']];	//从基本键中获取字段
	if( temp_str != undefined  ){
		pad['bomb_repeat'] = temp_str;
	}else{
		pad['bomb_repeat'] = 'bomb' ;
		this._drill_OKe_gamepadMapper[ pad['bomb'] ] = 'bomb';	//如果没有重合，新建一个key映射
	}
	
}
//==============================
// * 手柄 - 键位改变
//==============================
Game_System.prototype.drill_OKe_changeGamePadKeys = function() {
	//alert(JSON.stringify(this._drill_OKe_gamepadMapper));
	
	var temp_mapper = JSON.parse(JSON.stringify( this._drill_OKe_gamepadMapper ));
	var result_mapper = JSON.parse(JSON.stringify( this._drill_OKe_gamepadMapper ));	//克隆新实例
	if( this._drill_Oke_isConvert ){
		for(var key in result_mapper){		//去除方向键
			if( result_mapper[key] == "up" ||
				result_mapper[key] == "down" ||
				result_mapper[key] == "left" ||
				result_mapper[key] == "right"){
				delete result_mapper[key];
			}
		}
		if( this._drill_Oke_convertType == "方向翻转" ){
			for(var key in temp_mapper){
				if(temp_mapper[key] == "up" ){ result_mapper[key] = "down";}
				if(temp_mapper[key] == "down" ){ result_mapper[key] = "up";}
				if(temp_mapper[key] == "left" ){ result_mapper[key] = "right";}
				if(temp_mapper[key] == "right" ){ result_mapper[key] = "left";}
			}
		}else if( this._drill_Oke_convertType == "方向右旋置换" ){
			for(var key in temp_mapper){
				if(temp_mapper[key] == "up" ){ result_mapper[key] = "left";}
				if(temp_mapper[key] == "down" ){ result_mapper[key] = "right";}
				if(temp_mapper[key] == "left" ){ result_mapper[key] = "up";}
				if(temp_mapper[key] == "right" ){ result_mapper[key] = "down";}
			}
		}else if( this._drill_Oke_convertType == "方向随机混乱" ){
			var r_string = this.drill_OKe_getRandomString(4,["up","down","left","right"]);
			for(var key in temp_mapper){
				if(temp_mapper[key] == "up" ){ result_mapper[key] = r_string[0];}
				if(temp_mapper[key] == "down" ){ result_mapper[key] = r_string[1];}
				if(temp_mapper[key] == "left" ){ result_mapper[key] = r_string[2];}
				if(temp_mapper[key] == "right" ){ result_mapper[key] = r_string[3];}
			}
		}
	}
	
	// > 键位赋值
	Input.gamepadMapper = result_mapper;
}

//==============================
// * 键盘 - 键位初始化
//==============================
Game_System.prototype.drill_OKe_keyboardKeysInit = function() {
		
	this._drill_OKe_keyboard = {}			
	var board = this._drill_OKe_keyboard;
	var mapper = DrillUp.g_OKe_keyboardMapper;
	
	/*----------获取基本键----------*/
	board['ok'] = DrillUp.g_OKe_keyboard_ok.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['cancel'] = DrillUp.g_OKe_keyboard_cancel.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['shift'] = DrillUp.g_OKe_keyboard_shift.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['pageup'] = DrillUp.g_OKe_keyboard_pageup.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['pagedown'] = DrillUp.g_OKe_keyboard_pagedown.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['up'] = DrillUp.g_OKe_keyboard_up.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['down'] = DrillUp.g_OKe_keyboard_down.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['left'] = DrillUp.g_OKe_keyboard_left.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['right'] = DrillUp.g_OKe_keyboard_right.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['tab'] = DrillUp.g_OKe_keyboard_tab.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['debug'] = DrillUp.g_OKe_keyboard_debug.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	board['control'] = DrillUp.g_OKe_keyboard_control.map( function(value,index,array){ return Number(mapper[ String(value).toUpperCase() ]); } , this)
	
	
	this._drill_OKe_keyboardMapper = {};		//预置插入基本键（判断重复）
	board['ok'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'ok'; }, this )
	board['cancel'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'cancel'; }, this )
	board['shift'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'shift'; }, this )
	board['pageup'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'pageup'; }, this )
	board['pagedown'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'pagedown'; }, this )
	board['up'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'up'; }, this )
	board['down'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'down'; }, this )
	board['left'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'left'; }, this )
	board['right'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'right'; }, this )
	board['tab'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'tab'; }, this )
	board['debug'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'debug'; }, this )
	board['control'].forEach( function(value,index,array){ this._drill_OKe_keyboardMapper[ value ] = 'control'; }, this )
	var count = 0;
	count += board['ok'].length;
	count += board['cancel'].length;
	count += board['shift'].length;
	count += board['pageup'].length;
	count += board['pagedown'].length;
	count += board['up'].length;
	count += board['down'].length;
	count += board['left'].length;
	count += board['right'].length;
	count += board['tab'].length;
	count += board['debug'].length;
	count += board['control'].length;
	if(Object.keys(this._drill_OKe_keyboardMapper).length < count ){
		alert("【Drill_OperateKeys.js  键盘 - 键盘手柄按键修改器】\n键盘检测到重复的基本键设置，一些按键可能会无法使用。");
	}
	
	/*----------获取扩展键----------*/
	//干脆，扩展键直接全部是两个键控制的，两个键同时按下才可以生效
	
	board['menu'] = DrillUp.g_OKe_keyboard_menu.map( function(value,index,array){ 
		var _map = {};
		var keys = value.split(/ \+ /);	//分离AB键
		if( keys.length == 1 ){
			_map.A = Number(mapper[keys[0].toUpperCase()]);
			_map.B = -1;
		}else{
			_map.A = Number(mapper[keys[0].toUpperCase()]);
			_map.B = Number(mapper[keys[1].toUpperCase()]);
		}
		//AB键两个检测是否在映射中存在（不存在，创建映射字段）
		if( _map.A == -1 ){ 
			_map.AA = "" 
		}else{
			if( this._drill_OKe_keyboardMapper[ _map.A ] == undefined ){ 
				if( _map.B == -1 ){
					_map.AA = 'menu_SA';	//单键时
				}else{
					_map.AA = 'menu_A';		//双键时
				}
				this._drill_OKe_keyboardMapper[ _map.A ] = _map.AA; 
			}else{
				if( this._drill_OKe_keyboardMapper[ _map.A ] == "cancel" ){	//菜单键合并的特殊情况
					this._drill_OKe_keyboardMapper[ _map.A ] = "escape"; 
				}
				_map.AA = this._drill_OKe_keyboardMapper[ _map.A ];
			}
		}
		if( _map.B == -1 ){ 
			_map.BB = "" 
		}else{
			if( this._drill_OKe_keyboardMapper[ _map.B ] == undefined ){ 
				_map.BB = 'menu_B';
				this._drill_OKe_keyboardMapper[ _map.B ] = _map.BB; 
			}else{
				if( this._drill_OKe_keyboardMapper[ _map.B ] == "cancel" ){	//菜单键合并的特殊情况
					this._drill_OKe_keyboardMapper[ _map.B ] = "escape"; 
				}
				_map.BB = this._drill_OKe_keyboardMapper[ _map.B ];
			}
		}
		return _map; 
	} , this);
	
	//后面的原理一样
	board['jump'] = DrillUp.g_OKe_keyboard_jump.map( function(value,index,array){ var _map = {};var keys = value.split(/ \+ /);if(keys.length == 1){ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = -1;}else{ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = Number(mapper[keys[1].toUpperCase()]);}if( _map.A == -1 ){ _map.AA = "" }else{if( this._drill_OKe_keyboardMapper[ _map.A ] == undefined ){if( _map.B == -1 ){_map.AA = 'jump_SA';}else{_map.AA = 'jump_A';};this._drill_OKe_keyboardMapper[ _map.A ] = _map.AA; }else{_map.AA = this._drill_OKe_keyboardMapper[ _map.A ];}}if( _map.B == -1 ){ _map.BB = "" }else{if( this._drill_OKe_keyboardMapper[ _map.B ] == undefined ){ _map.BB = 'jump_B';this._drill_OKe_keyboardMapper[ _map.B ] = _map.BB; }else{_map.BB = this._drill_OKe_keyboardMapper[ _map.B ];}}return _map; } , this);
	board['rotate'] = DrillUp.g_OKe_keyboard_rotate.map( function(value,index,array){ var _map = {};var keys = value.split(/ \+ /);if(keys.length == 1){ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = -1;}else{ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = Number(mapper[keys[1].toUpperCase()]);}if( _map.A == -1 ){ _map.AA = "" }else{if( this._drill_OKe_keyboardMapper[ _map.A ] == undefined ){if( _map.B == -1 ){_map.AA = 'rotate_SA';}else{_map.AA = 'rotate_A';};this._drill_OKe_keyboardMapper[ _map.A ] = _map.AA; }else{_map.AA = this._drill_OKe_keyboardMapper[ _map.A ];}}if( _map.B == -1 ){ _map.BB = "" }else{if( this._drill_OKe_keyboardMapper[ _map.B ] == undefined ){ _map.BB = 'rotate_B';this._drill_OKe_keyboardMapper[ _map.B ] = _map.BB; }else{_map.BB = this._drill_OKe_keyboardMapper[ _map.B ];}}return _map; } , this);
	board['pick'] = DrillUp.g_OKe_keyboard_pick.map( function(value,index,array){ var _map = {};var keys = value.split(/ \+ /);if(keys.length == 1){ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = -1;}else{ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = Number(mapper[keys[1].toUpperCase()]);}if( _map.A == -1 ){ _map.AA = "" }else{if( this._drill_OKe_keyboardMapper[ _map.A ] == undefined ){if( _map.B == -1 ){_map.AA = 'pick_SA';}else{_map.AA = 'pick_A';};this._drill_OKe_keyboardMapper[ _map.A ] = _map.AA; }else{_map.AA = this._drill_OKe_keyboardMapper[ _map.A ];}}if( _map.B == -1 ){ _map.BB = "" }else{if( this._drill_OKe_keyboardMapper[ _map.B ] == undefined ){ _map.BB = 'pick_B';this._drill_OKe_keyboardMapper[ _map.B ] = _map.BB; }else{_map.BB = this._drill_OKe_keyboardMapper[ _map.B ];}}return _map; } , this);
	board['throw'] = DrillUp.g_OKe_keyboard_throw.map( function(value,index,array){ var _map = {};var keys = value.split(/ \+ /);if(keys.length == 1){ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = -1;}else{ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = Number(mapper[keys[1].toUpperCase()]);}if( _map.A == -1 ){ _map.AA = "" }else{if( this._drill_OKe_keyboardMapper[ _map.A ] == undefined ){if( _map.B == -1 ){_map.AA = 'throw_SA';}else{_map.AA = 'throw_A';};this._drill_OKe_keyboardMapper[ _map.A ] = _map.AA; }else{_map.AA = this._drill_OKe_keyboardMapper[ _map.A ];}}if( _map.B == -1 ){ _map.BB = "" }else{if( this._drill_OKe_keyboardMapper[ _map.B ] == undefined ){ _map.BB = 'throw_B';this._drill_OKe_keyboardMapper[ _map.B ] = _map.BB; }else{_map.BB = this._drill_OKe_keyboardMapper[ _map.B ];}}return _map; } , this);
	board['bomb'] = DrillUp.g_OKe_keyboard_bomb.map( function(value,index,array){ var _map = {};var keys = value.split(/ \+ /);if(keys.length == 1){ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = -1;}else{ _map.A = Number(mapper[keys[0].toUpperCase()]); _map.B = Number(mapper[keys[1].toUpperCase()]);}if( _map.A == -1 ){ _map.AA = "" }else{if( this._drill_OKe_keyboardMapper[ _map.A ] == undefined ){if( _map.B == -1 ){_map.AA = 'bomb_SA';}else{_map.AA = 'bomb_A';};this._drill_OKe_keyboardMapper[ _map.A ] = _map.AA; }else{_map.AA = this._drill_OKe_keyboardMapper[ _map.A ];}}if( _map.B == -1 ){ _map.BB = "" }else{if( this._drill_OKe_keyboardMapper[ _map.B ] == undefined ){ _map.BB = 'bomb_B';this._drill_OKe_keyboardMapper[ _map.B ] = _map.BB; }else{_map.BB = this._drill_OKe_keyboardMapper[ _map.B ];}}return _map; } , this);
	
}
//==============================
// * 键盘 - 改变键位
//==============================
Game_System.prototype.drill_OKe_changeKeyBoardKeys = function() {
	//alert(JSON.stringify(this._drill_OKe_keyboardMapper));
	//alert(JSON.stringify(this._drill_OKe_keyboard));
	
	var temp_mapper = JSON.parse(JSON.stringify( this._drill_OKe_keyboardMapper ));
	var result_mapper = JSON.parse(JSON.stringify( this._drill_OKe_keyboardMapper ));	//克隆新实例
	if( this._drill_Oke_isConvert ){
		for(var key in result_mapper){		//去除方向键
			if( result_mapper[key] == "up" ||
				result_mapper[key] == "down" ||
				result_mapper[key] == "left" ||
				result_mapper[key] == "right"){
				delete result_mapper[key];
			}
		}
		if( this._drill_Oke_convertType == "方向翻转" ){
			for(var key in temp_mapper){
				if(temp_mapper[key] == "up" ){ result_mapper[key] = "down";}
				if(temp_mapper[key] == "down" ){ result_mapper[key] = "up";}
				if(temp_mapper[key] == "left" ){ result_mapper[key] = "right";}
				if(temp_mapper[key] == "right" ){ result_mapper[key] = "left";}
			}
		}else if( this._drill_Oke_convertType == "方向右旋置换" ){
			for(var key in temp_mapper){
				if(temp_mapper[key] == "up" ){ result_mapper[key] = "left";}
				if(temp_mapper[key] == "down" ){ result_mapper[key] = "right";}
				if(temp_mapper[key] == "left" ){ result_mapper[key] = "up";}
				if(temp_mapper[key] == "right" ){ result_mapper[key] = "down";}
			}
		}else if( this._drill_Oke_convertType == "方向随机混乱" ){
			var r_string = this.drill_OKe_getRandomString(4,["up","down","left","right"]);
			for(var key in temp_mapper){
				if(temp_mapper[key] == "up" ){ result_mapper[key] = r_string[0];}
				if(temp_mapper[key] == "down" ){ result_mapper[key] = r_string[1];}
				if(temp_mapper[key] == "left" ){ result_mapper[key] = r_string[2];}
				if(temp_mapper[key] == "right" ){ result_mapper[key] = r_string[3];}
			}
		}
	}
	
	// > 键位赋值
	Input.keyMapper = result_mapper;
}

//==============================
// * 工具 - 判断手柄控制
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
//==============================
// * 工具 - 随机抽取N个
//==============================
Game_System.prototype.drill_OKe_getRandomString = function( count, list ){
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
// * 进入菜单按键条件（覆写）
//=============================================================================
Scene_Map.prototype.isMenuCalled = function() {
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( $gameSystem._drill_OKe_pad['menu_has_fn'] ){
			return ( Input.isTriggered($gameSystem._drill_OKe_pad['menu_repeat']) 
			&& Input.isPressed($gameSystem._drill_OKe_pad['fn_repeat']) );
		}
		return Input.isTriggered($gameSystem._drill_OKe_pad['menu_repeat']);
	}else{
		
		// > 鼠标按下
		if( TouchInput.isCancelled() ){ return true; }
		
		// > 键盘
		if( $gameSystem._drill_OKe_keyboard['menu'].map( function(value,index,array){ 
				//alert(JSON.stringify(value));
				var b = false;
				if( value.BB == "" ){
					if(Input.isTriggered( value.AA )){
						b = true;
					}
				}else{
					if( (Input.isTriggered( value.AA ) && Input.isPressed( value.BB ) ) ||
						(Input.isPressed( value.AA ) && Input.isTriggered( value.BB ) )
						){		//按住A，然后按一下B  ||  按住B，然后按一下A
						b = true;
					}
				}
				return b; 
				
			}, this).indexOf(true) != -1
		){
			return true
		}
		return false;
	}
};

//=============================================================================
// * 【互动-举起花盆能力】按键条件
//=============================================================================
if( Imported.Drill_PickThrow ){
	//举起默认与确定键绑定，如果举起与确定键分离，则换为手动与举起的花盆互动。
	var _drill_OKe_pick_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
	Game_Player.prototype.triggerButtonAction = function() {
		var r = _drill_OKe_pick_triggerButtonAction.call(this);
		if(r == false){
			if(Input.drill_OKe_isGamepadControling()){	//手柄
				if ( Input.isTriggered($gameSystem._drill_OKe_pad['pick_repeat']) ) {
					this.checkEventTriggerHere([0]);
					if ($gameMap.setupStartingEvent()) {
						return true;
					}
					this.checkEventTriggerThere([0,1,2]);
					if ($gameMap.setupStartingEvent()) {
						return true;
					}
				}
			}else{	//键盘
				if( $gameSystem._drill_OKe_keyboard['pick'].map( function(value,index,array){ 
						var b = false;
						if( value.BB == "" ){
							if(Input.isTriggered( value.AA )){
								b = true;
							}
						}else{
							if( (Input.isTriggered( value.AA ) && Input.isPressed( value.BB ) ) ||
								(Input.isPressed( value.AA ) && Input.isTriggered( value.BB ) )
								){		//按住A，然后按一下B  ||  按住B，然后按一下A
								b = true;
							}
						}
						return b; 
					}, this).indexOf(true) != -1
				){
					return true
				}
				return false;
			}
		}
		return r;
	};
	
	Game_Player.prototype.drill_isPickControl = function() {
		if( TouchInput.isPressed() || Input.isPressed('ok') ){return true;}	//鼠标
		if(Input.drill_OKe_isGamepadControling()){	//手柄
			if( $gameSystem._drill_OKe_pad['pick_has_fn'] ){
				return ( Input.isPressed($gameSystem._drill_OKe_pad['pick_repeat']) 
				&& Input.isPressed($gameSystem._drill_OKe_pad['fn_repeat']) );
			}
			return Input.isPressed($gameSystem._drill_OKe_pad['pick_repeat']);
		}else{	//键盘
			if( $gameSystem._drill_OKe_keyboard['pick'].map( function(value,index,array){ 
					var b = true;
					if( value.AA != "" && !Input.isPressed( value.AA ) ){
						b = false;
					}
					if( value.BB != "" && !Input.isPressed( value.BB ) ){
						b = false;
					}
					return b; 
					
				}, this).indexOf(true) != -1
			){
				return true
			}
			return false;
		}
	}
	Game_Player.prototype.drill_isThrowControl = function() {
		if(Input.drill_OKe_isGamepadControling()){	//手柄
			if( $gameSystem._drill_OKe_pad['throw_has_fn'] ){
				return ( Input.isPressed($gameSystem._drill_OKe_pad['throw_repeat']) 
				&& Input.isPressed($gameSystem._drill_OKe_pad['fn_repeat']) );
			}
			return Input.isPressed($gameSystem._drill_OKe_pad['throw_repeat']);
		}else{	//键盘
			if( $gameSystem._drill_OKe_keyboard['throw'].map( function(value,index,array){ 
					var b = true;
					if( value.AA != "" && !Input.isPressed( value.AA ) ){
						b = false;
					}
					if( value.BB != "" && !Input.isPressed( value.BB ) ){
						b = false;
					}
					return b; 
					
				}, this).indexOf(true) != -1
			){
				return true
			}
			return false;
		}
	}
}

//=============================================================================
// * 【互动-跳跃能力】按键条件
//=============================================================================
if( Imported.Drill_Jump ){
	Game_Player.prototype.drill_isJumpControl = function() {
		if(DrillUp.g_jump_mouse || DrillUp.jump_mouse){ return true; }
		if(Input.drill_OKe_isGamepadControling()){	//手柄
			if( $gameSystem._drill_OKe_pad['jump_has_fn'] ){
				return ( Input.isPressed($gameSystem._drill_OKe_pad['jump_repeat']) 
				&& Input.isPressed($gameSystem._drill_OKe_pad['fn_repeat']) );
			}
			return Input.isPressed($gameSystem._drill_OKe_pad['jump_repeat']);
		}else{
			//键盘监听
			if( $gameSystem._drill_OKe_keyboard['jump'].map( function(value,index,array){ 
					var b = false;
					if( value.BB == "" ){
						if(Input.isTriggered( value.AA )){
							b = true;
						}
					}else{
						if( (Input.isTriggered( value.AA ) && Input.isPressed( value.BB ) ) ||
							(Input.isPressed( value.AA ) && Input.isTriggered( value.BB ) )
							){		//按住A，然后按一下B  ||  按住B，然后按一下A
							b = true;
						}
					}
					return b; 
				}, this).indexOf(true) != -1
			){
				return true
			}
			return false;
		}
	}
}

//=============================================================================
// * 【互动-原地转向能力】按键条件
//=============================================================================
if( Imported.Drill_RotateDirection ){
	Game_Player.prototype.drill_isRotateControl = function() {
		if(Input.drill_OKe_isGamepadControling()){	//手柄
			if( $gameSystem._drill_OKe_pad['rotate_has_fn'] ){
				return Input.isPressed( $gameSystem._drill_OKe_pad['fn_repeat'] ) && 
					( this.getInputDirection() == 2 ||
					 this.getInputDirection() == 4 ||
					 this.getInputDirection() == 6 ||
					 this.getInputDirection() == 8 
					);
			}else{
				return  !Input.isPressed( $gameSystem._drill_OKe_pad['fn_repeat'] ) && 
					( this.getInputDirection() == 2 ||
					 this.getInputDirection() == 4 ||
					 this.getInputDirection() == 6 ||
					 this.getInputDirection() == 8 
					);
			}
		}else{	//键盘
			if( $gameSystem._drill_OKe_keyboard['rotate'].map( function(value,index,array){ 
					return Input.isPressed( value.AA ) ;
				}, this).indexOf(true) != -1
			){
				return true && ( this.getInputDirection() == 2 ||
					 this.getInputDirection() == 4 ||
					 this.getInputDirection() == 6 ||
					 this.getInputDirection() == 8 
					);
			}
			return false;
		}
	}
}

//=============================================================================
// * 【炸弹人-游戏核心】按键条件
//=============================================================================
if( Imported.Drill_BombCore ){
	Game_Player.prototype.drill_isBombControl = function() {
		if(Input.drill_OKe_isGamepadControling()){	//手柄
			if( $gameSystem._drill_OKe_pad['bomb_has_fn'] ){
				return ( Input.isPressed($gameSystem._drill_OKe_pad['bomb_repeat']) 
				&& Input.isPressed($gameSystem._drill_OKe_pad['fn_repeat']) );
			}
			return Input.isPressed($gameSystem._drill_OKe_pad['bomb_repeat']);
		}else{
			//键盘监听
			return $gameSystem._drill_OKe_keyboard['bomb'].some( function(value,index,array){ 
				if( value.BB == "" ){
					if(Input.isTriggered( value.AA )){
						return true;
					}
					return false;
				}else{
					if( (Input.isTriggered( value.AA ) && Input.isPressed( value.BB ) ) ||
						(Input.isPressed( value.AA ) && Input.isTriggered( value.BB ) )
						){		//按住A，然后按一下B  ||  按住B，然后按一下A
						return true;
					}
					return false;
				}
			},this);
		}
	}
}
