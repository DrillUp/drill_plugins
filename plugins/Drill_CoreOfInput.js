//=============================================================================
// Drill_CoreOfInput.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        系统 - 输入设备核心
 * @author Drill_up、汗先生
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfInput +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 提供输入设备的基本功能。鼠标、手柄、键盘、触屏 都是输入设备。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 该插件为基础核心，可以作用于下列插件。
 * 作用于：
 *   - Drill_SecretCode          键盘-秘籍输入器
 *   - Drill_OperateHud          鼠标-鼠标辅助操作面板
 *   - Drill_MiniPlateForEvent   鼠标-事件说明窗口
 *   - Drill_MiniPlateForState   鼠标-状态和buff说明窗口
 *   - Drill_MouseTriggerEvent   鼠标-鼠标触发事件
 *   - Drill_MouseTriggerPicture 鼠标-鼠标触发图片
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   主要改进游戏的输入设备控制，但仅限drill插件，不干扰其他插件。
 * 2.你需要去看看 "1.系统 > 关于输入设备核心（入门篇）.docx"。
 *   你需要去看看 "1.系统 > 关于输入设备核心（高级篇）.docx"。
 * 细节:
 *   (1.物理按键：指真实世界键盘上/手柄上存在的按键，比如z,x,c,v键等。
 *      逻辑按键：指游戏中用于划分特定功能的按键，比如确定键,取消键,跳跃键等。
 * 键盘的物理按键：
 *   (1.键盘的物理按键可以使用 字母、数字 的关键字，
 *      如 a b A B 1 2 等，字母大小写都可以。
 *   (2.你还可以设置特殊的键盘按键，填入以下字符关键字：
 *       Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
 *       ~ - = [ ] \ ; ' , . /
 *       Tab Shift Ctrl Alt Backspace 上 下 左 右 空格 Enter
 *       PageUp PageDown End Home Insert Delete
 *   (3.小键盘的关键字如下：
 *       Num0 Num1 Num2 Num3 Num4 Num5 Num6 Num7 Num8 Num9
 *       Num* Num+ Num- Num. Num/ NumEnter
 *   (4.注意，如果你想配置键盘的 空格，那么要填"空格"，而不是" "。
 * 手柄的物理按键：
 *   (1.你可以设置手柄按键，填入以下字符关键字：
 *       A B X Y LB RB LT RT
 *       SELECT START 左摇杆按键 右摇杆按键
 *       按键上 按键下 按键左 按键右
 *       左摇杆上 左摇杆下 左摇杆左 左摇杆右
 *       右摇杆上 右摇杆下 右摇杆左 右摇杆右
 *   (2.大部分游戏中，按键的上/下/左/右 等同于 左摇杆的上/下/左/右，
 *      但从物理按键的角度来看，二者是不同键位，设计时注意区分。
 *      另外，现在的手柄设计都主要以左摇杆来控制移动，按键反而很少用。
 * 鼠标的物理按键：
 *   (1.鼠标有三个键位：左键、中键/滚轮、右键。鼠标中键与鼠标滚轮是同一个键。
 *      鼠标滚轮的 上滚和下滚 只在特殊情况下能支持，需要看具体应用场景。
 * 触屏的物理按键：
 *   (1.触屏有两个键位：单指、双指。
 *      你可以开启触屏联动来控制多种鼠标键位操作。
 *      按下和释放的联动最好同时为true或false，不然逻辑会乱。
 *   (2.注意，触屏联动不是针对所有插件的触屏功能，而是仅限【drill插件】有效。
 *      只有禁用鼠标右键菜单和双指菜单，会影响到默认地图界面进入菜单的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 默认开关
 * 你可以通过插件指令控制部分配置。
 * 
 * 插件指令：>输入设备核心 : 战斗界面-键盘 : 开启
 * 插件指令：>输入设备核心 : 战斗界面-手柄 : 开启
 * 插件指令：>输入设备核心 : 战斗界面-鼠标 : 开启
 * 插件指令：>输入设备核心 : 战斗界面-触屏 : 开启
 * 
 * 插件指令：>输入设备核心 : 地图界面-键盘 : 开启
 * 插件指令：>输入设备核心 : 地图界面-手柄 : 开启
 * 插件指令：>输入设备核心 : 地图界面-键盘或手柄方向键移动 : 开启
 * 插件指令：>输入设备核心 : 地图界面-鼠标 : 开启
 * 插件指令：>输入设备核心 : 地图界面-触屏 : 开启
 * 插件指令：>输入设备核心 : 地图界面-鼠标左键移动 : 开启
 * 插件指令：>输入设备核心 : 地图界面-鼠标右键菜单 : 开启
 * 插件指令：>输入设备核心 : 地图界面-触屏双指菜单 : 开启
 * 
 * 插件指令：>输入设备核心 : 菜单界面-键盘 : 开启
 * 插件指令：>输入设备核心 : 菜单界面-手柄 : 开启
 * 插件指令：>输入设备核心 : 菜单界面-鼠标 : 开启
 * 插件指令：>输入设备核心 : 菜单界面-触屏 : 开启
 * 
 * 1.上述插件指令可以设置·"开启"或"关闭"，
 *   使用"启用"或"禁用"的名词也可以，指令效果是一样的。
 * 2.插件指令配置执行后，永久有效，且能够被存储到存档中。
 *   移动、菜单为游戏默认的控制设置，你可以手动关闭它，
 *   使用游戏其它的控制方式代替。
 * 3.注意，部分功能关闭后，要注意考虑什么时候恢复开启状态，
 *   如果没有恢复，会造成玩家在游戏中不能操作，属于恶性bug。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 键盘
 * 你可以通过插件指令对键盘设备进行操作。
 * 
 * 插件指令：>输入设备核心 : 显示键盘DEBUG窗口-物理按键
 * 插件指令：>输入设备核心 : 关闭键盘DEBUG窗口-物理按键
 * 
 * 1.Debug窗口显示 全部物理按键，能实时 点亮显示 按住的键盘按键。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 手柄
 * 你可以通过插件指令对手柄设备进行操作。
 * 
 * 插件指令：>输入设备核心 : 打印当前手柄信息
 * 
 * 插件指令：>输入设备核心 : 显示主手柄DEBUG窗口-物理按键
 * 插件指令：>输入设备核心 : 关闭主手柄DEBUG窗口-物理按键
 * 插件指令：>输入设备核心 : 显示全部手柄DEBUG窗口-物理按键
 * 插件指令：>输入设备核心 : 关闭全部手柄DEBUG窗口-物理按键
 * 
 * 1.Debug窗口显示 全部物理按键，能实时 点亮显示 按住的手柄按键。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 鼠标
 * 你可以通过插件指令对鼠标设备进行操作。
 * 
 * 插件指令：>输入设备核心 : 获取鼠标位置 : 变量[25,26]
 * 插件指令：>输入设备核心 : 获取鼠标图块位置 : 变量[25,26]
 * 
 * 插件指令：>输入设备核心 : 显示鼠标DEBUG窗口
 * 插件指令：>输入设备核心 : 关闭鼠标DEBUG窗口
 * 
 * 1.获取到的位置值会被赋值给"变量[]"。
 * 2."鼠标位置"为绝对坐标，(0,0)表示在左上角的位置。
 *   右下角位置值与游戏分辨率有关，为(宽度像素值,高度像素值)。
 * 3."鼠标图块位置"支持循环地图的图块位置。
 *   如果你写了持续获取图块位置来算差值的功能，要注意在循环边缘时，
 *   位置会从(0,10)突变为(60,10)。
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
 * 时间复杂度： o(n)*o(子插件调用次数) 每帧
 * 测试方法：   以正常流程进行游戏，记录三种界面下的消耗。
 * 测试结果：   地图界面，平均消耗为：【24.99ms】
 *              战斗界面，平均消耗为：【41.76ms】
 *              菜单界面，平均消耗为：【26.21ms】
 * 
 * 1.该核心在任何情况下都工作并消耗性能。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.在核心分离前，相同功能插件的消耗为菜单界面【55.27ms】战斗界面【62.38ms】。
 * 3.插件会根据玩家按键情况动态变化计算量，战斗界面按键比较频繁，所以消耗较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了注释说明。
 * [v1.2]
 * 优化了内部接口的结构。
 * [v1.3]
 * 给右键菜单功能添加了插件指令开关。
 * [v1.4]
 * 添加了控制 鼠标左键目的地移动 的功能。
 * [v1.5]
 * 修复了持续按键时，按键暂停的细节bug。
 * [v1.6]
 * 添加了开启/关闭键盘、手柄、鼠标、触屏的功能。
 * [v1.7]
 * 修复了触屏点击出错的bug。添加了 键盘或手柄方向键移动 开关功能。
 * [v1.8]
 * 优化了旧存档的识别与兼容。
 * [v1.9]
 * 添加了通过插件指令获取鼠标位置功能。
 * [v2.0]
 * 改进了手柄的物理按键连接，支持多手柄的物理按键监听。
 * 
 * 
 *
 * @param ---默认开关---
 * @default 
 *
 * @param 开关-战斗界面-键盘
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-战斗界面-手柄
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-战斗界面-鼠标
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-战斗界面-触屏
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 *
 * @param 开关-地图界面-键盘
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-地图界面-手柄
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-地图界面-键盘或手柄方向键移动
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。若设置关闭，则地图界面中键盘或手柄方向键移动的功能会被禁用。
 * @default true
 *
 * @param 开关-地图界面-鼠标
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-地图界面-触屏
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-地图界面-鼠标左键移动
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。若设置关闭，则地图界面中鼠标左键移动的功能会被禁用。
 * @default true
 *
 * @param 开关-地图界面-鼠标右键菜单
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。若设置关闭，则地图界面中鼠标右键直接进入菜单的功能会被禁用。
 * @default false
 *
 * @param 开关-地图界面-触屏双指菜单
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。若设置关闭，则地图界面中触屏按下两个手指后进入菜单的功能会被禁用。
 * @default false
 * 
 *
 * @param 开关-菜单界面-键盘
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-菜单界面-手柄
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-菜单界面-鼠标
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 开关-菜单界面-触屏
 * @parent ---默认开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 *
 * @param ---双击判定---
 * @default 
 * 
 * @param 键盘双击判定时长
 * @parent ---双击判定---
 * @type number
 * @min 4
 * @desc drill插件中，按下第一次键盘按键后，在设置的帧数内再按一次，被判定为双击。(1秒60帧)
 * @default 12
 * 
 * @param 手柄双击判定时长
 * @parent ---双击判定---
 * @type number
 * @min 4
 * @desc drill插件中，按下第一次手柄按键后，在设置的帧数内再按一次，被判定为双击。(1秒60帧)
 * @default 12
 * 
 * @param 鼠标双击判定时长
 * @parent ---双击判定---
 * @type number
 * @min 4
 * @desc drill插件中，按下第一次鼠标按键后，在设置的帧数内再按一次，被判定为双击。(1秒60帧)
 * @default 12
 *
 *
 * @param ---触屏联动---
 * @default 
 * 
 * @param 触屏按下>>鼠标左键按下
 * @parent ---触屏联动---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏按下能触发 drill插件中 鼠标左键按下功能。
 * @default false
 * 
 * @param 触屏按下>>鼠标中键按下
 * @parent ---触屏联动---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏按下能触发 drill插件中 鼠标中键按下功能。
 * @default true
 * 
 * @param 触屏按下>>鼠标右键按下
 * @parent ---触屏联动---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏按下能触发 drill插件中 鼠标右键按下功能。
 * @default true
 * 
 * @param 触屏释放>>鼠标左键释放
 * @parent ---触屏联动---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏释放能触发 drill插件中 鼠标左键释放功能。
 * @default false
 * 
 * @param 触屏释放>>鼠标中键释放
 * @parent ---触屏联动---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏释放能触发 drill插件中 鼠标中键释放功能。
 * @default true
 * 
 * @param 触屏释放>>鼠标右键释放
 * @parent ---触屏联动---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启联动绑定后，触屏释放能触发 drill插件中 鼠标右键释放功能。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COI (Core_Of_Input)
//		临时全局变量	DrillUp.g_COI_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)	每帧	【直接for】
//						o(n^2)	每帧	【自动打盹】
//		★性能测试因素	标题界面
//		★性能测试消耗	62.38ms		【直接for】（这个在标题界面就有很大的占比，需要优化）
//						27.21ms		【自动打盹】
//		★最坏情况		玩家一直按键，不停歇，则消耗将保持在62.38ms。
//						不过一般玩家不可能做到每半秒按一次，毕竟这又不是竞技游戏。
//		★备注			无
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
//
//			->☆默认开关
//				->各界面开关
//					->键盘
//					->手柄
//					->鼠标
//					->触屏
//				->特定设置
//					->键盘或手柄方向键移动
//					->鼠标左键移动
//					->鼠标右键菜单
//					->触屏双指菜单
//			->☆核心漏洞修复
//				->鼠标失去窗口焦点
//
//			->☆鼠标
//				->指针位置
//					->指针位置【标准函数】
//					->指针位置（包含出界情况）【标准函数】
//					->指针位置是否出界【标准函数】
//					->指针位置是否在天窗层【标准函数】
//					->指针位置（图块位置）【标准函数】
//				->物理按键
//					> 左键
//					> 中键/滚轮
//					> 右键
//				->物理按键条件判定
//					->左键按下[持续]
//					->左键按下[一帧]
//					->左键释放[一帧]
//					->左键双击[一帧]
//					->滚轮上滚[一帧]
//					->滚轮下滚[一帧]
//					->滚轮按下[持续]
//					->滚轮按下[一帧]
//					->滚轮释放[一帧]
//					->滚轮双击[一帧]
//					->右键按下[持续]
//					->右键按下[一帧]
//					->右键释放[一帧]
//					->右键双击[一帧]
//			->☆鼠标位置监听
//				->出界情况
//				->入界情况
//			->☆鼠标监听
//				->帧刷新
//				->鼠标按下
//				->鼠标释放
//				x->滚轮监听
//
//			->☆触屏
//				->触屏联动
//					->鼠标按下时
//					->鼠标释放时
//
//			->☆键盘
//				->物理按键
//				->物理按键条件判定
//					->键盘按下[持续]
//					->键盘按下[一帧]
//					->键盘释放[一帧]
//					->键盘双击[一帧]
//					->任意键按下[一帧]
//					->任意键释放[一帧]
//			->☆键盘监听
//				->帧刷新
//				->按下
//				->释放
//				->自动打盹
//
//			->☆手柄
//				->多个手柄
//					->主手柄
//				->物理按键
//				->物理按键条件判定
//					->手柄按下[持续]
//					->手柄按下[一帧]
//					->手柄释放[一帧]
//					->手柄双击[一帧]
//					->任意键按下[一帧]
//					->任意键释放[一帧]
//			->☆手柄监听
//				->帧刷新
//				->键位扫描 按下
//				->键位扫描 释放
//				->自动打盹
//
//			->鼠标DEBUG窗口【Drill_COI_MouseDebugWindow】
//			->键盘DEBUG窗口【Drill_COI_KeyboardDebugWindow】
//			->手柄DEBUG窗口【Drill_COI_PadDebugWindow】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于输入设备核心（脚本）.docx
//			14.鼠标 > 关于鼠标悬浮窗口（脚本）.docx
//		
//		★插件私有类：
//			* 鼠标DEBUG窗口【Drill_COI_MouseDebugWindow】
//			* 键盘DEBUG窗口【Drill_COI_KeyboardDebugWindow】
//			* 手柄DEBUG窗口【Drill_COI_PadDebugWindow】
//		
//		★核心说明：
//			1.核心提供一系列零散碎片函数。	
//				具体看看下面的类。鼠标、触屏、键盘、手柄。
//			2.鼠标/触屏/键盘/手柄 与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//		
//		★必要注意事项：
//			1.键盘/手柄按键自动打盹：键位触发后，如果超过一定时间，就认定为打盹。
//			  也就是说，玩家未操作键盘超过一定时间时，将不做多余计算。打盹状态下，键盘/手柄肯定都没有被按。
//			2.鼠标和触屏有很大的区别，电脑上基本很难测试触屏功能。
//			  鼠标只有一个，而触屏可以有两个以上的手指，来自于：touches（当前的触点） 和 changedTouches（事件的触点）
//			  【必须先锁定触屏的位置，再进行联动触发。】
//
//		★其它说明细节：
//			无
//
//		★存在的问题：
//			1.触屏双击触发有个小瑕疵，第一次按任意地方，只要第二次落在事件上，就算双击。
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_COI_PluginTip_curName = "Drill_CoreOfInput.js 系统-输入设备核心";
	DrillUp.g_COI_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfInput = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfInput');
	
	
	/*-----------------默认开关------------------*/
	DrillUp.g_COI_battle_keyboard = String(DrillUp.parameters['开关-战斗界面-键盘'] || "true") === "true";
	DrillUp.g_COI_battle_pad = String(DrillUp.parameters['开关-战斗界面-手柄'] || "true") === "true";
	DrillUp.g_COI_battle_mouse = String(DrillUp.parameters['开关-战斗界面-鼠标'] || "true") === "true";
	DrillUp.g_COI_battle_touchPad = String(DrillUp.parameters['开关-战斗界面-触屏'] || "true") === "true";
	
	DrillUp.g_COI_map_keyboard = String(DrillUp.parameters['开关-地图界面-键盘'] || "true") === "true";
	DrillUp.g_COI_map_pad = String(DrillUp.parameters['开关-地图界面-手柄'] || "true") === "true";
	DrillUp.g_COI_map_KPMove = String(DrillUp.parameters['开关-地图界面-键盘或手柄方向键移动'] || "true") === "true";
	DrillUp.g_COI_map_mouse = String(DrillUp.parameters['开关-地图界面-鼠标'] || "true") === "true";
	DrillUp.g_COI_map_touchPad = String(DrillUp.parameters['开关-地图界面-触屏'] || "true") === "true";
	DrillUp.g_COI_map_mouseLeftMove = String(DrillUp.parameters['开关-地图界面-鼠标左键移动'] || "true") === "true";
	DrillUp.g_COI_map_mouseRightMenu = String(DrillUp.parameters['开关-地图界面-鼠标右键菜单'] || "false") === "true";
	DrillUp.g_COI_map_touchPadMenu = String(DrillUp.parameters['开关-地图界面-触屏双指菜单'] || "false") === "true";
	
	DrillUp.g_COI_menu_keyboard = String(DrillUp.parameters['开关-菜单界面-键盘'] || "true") === "true";
	DrillUp.g_COI_menu_pad = String(DrillUp.parameters['开关-菜单界面-手柄'] || "true") === "true";
	DrillUp.g_COI_menu_mouse = String(DrillUp.parameters['开关-菜单界面-鼠标'] || "true") === "true";
	DrillUp.g_COI_menu_touchPad = String(DrillUp.parameters['开关-菜单界面-触屏'] || "true") === "true";
	
	/*-----------------双击判定------------------*/
	DrillUp.g_COI_mouse_judgeTime = Number(DrillUp.parameters['鼠标双击判定时长'] || 12); 
	DrillUp.g_COI_pads_judgeTime = Number(DrillUp.parameters['手柄双击判定时长'] || 12); 
	DrillUp.g_COI_keys_judgeTime = Number(DrillUp.parameters['键盘双击判定时长'] || 12); 

	/*-----------------触屏联动------------------*/
	DrillUp.g_COI_touchPad_l_down = String(DrillUp.parameters['触屏按下>>鼠标左键按下'] || "false") === "true";
	DrillUp.g_COI_touchPad_m_down = String(DrillUp.parameters['触屏按下>>鼠标中键按下'] || "true") === "true";
	DrillUp.g_COI_touchPad_r_down = String(DrillUp.parameters['触屏按下>>鼠标右键按下'] || "true") === "true";
	DrillUp.g_COI_touchPad_l_up = String(DrillUp.parameters['触屏释放>>鼠标左键释放'] || "false") === "true";
	DrillUp.g_COI_touchPad_m_up = String(DrillUp.parameters['触屏释放>>鼠标中键释放'] || "true") === "true";
	DrillUp.g_COI_touchPad_r_up = String(DrillUp.parameters['触屏释放>>鼠标右键释放'] || "true") === "true";
	


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_COI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COI_pluginCommand.call(this, command, args);
	if( command === ">输入设备核心" ){
		
		/*-----------------默认开关------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			
			if( type == "战斗界面-键盘" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Battle_setKeyboard( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Battle_setKeyboard( false );  }
			}
			if( type == "战斗界面-手柄" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Battle_setPad( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Battle_setPad( false ); }
			}
			if( type == "战斗界面-鼠标" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Battle_setMouse( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Battle_setMouse( false ); }
			}
			if( type == "战斗界面-触屏" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Battle_setTouchPad( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Battle_setTouchPad( false ); }
			}
			
			if( type == "地图界面-键盘" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setKeyboard( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setKeyboard( false ); }
			}
			if( type == "地图界面-手柄" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setPad( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setPad( false ); }
			}
			if( type == "地图界面-键盘或手柄方向键移动" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setKPMove( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setKPMove( false ); }
			}
			if( type == "地图界面-鼠标" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setMouse( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setMouse( false ); }
			}
			if( type == "地图界面-触屏" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setTouchPad( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setTouchPad( false ); }
			}
			if( type == "地图界面-鼠标左键移动" || type == "地图鼠标左键移动" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setMouseLeftMove( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setMouseLeftMove( false ); }
			}
			if( type == "地图界面-鼠标右键菜单" || type == "鼠标右键菜单" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setMouseRightMenu( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setMouseRightMenu( false ); }
			}
			if( type == "地图界面-触屏双指菜单" || type == "触屏双指菜单" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Map_setTouchPadMenu( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Map_setTouchPadMenu( false ); }
			}
			
			if( type == "菜单界面-键盘" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Menu_setKeyboard( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Menu_setKeyboard( false ); }
			}
			if( type == "菜单界面-手柄" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Menu_setPad( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Menu_setPad( false ); }
			}
			if( type == "菜单界面-鼠标" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Menu_setMouse( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Menu_setMouse( false ); }
			}
			if( type == "菜单界面-触屏" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){ $gameSystem.drill_COI_Menu_setTouchPad( true ); }
				if( temp2 == "关闭" || temp2 == "禁用" ){ $gameSystem.drill_COI_Menu_setTouchPad( false ); }
			}
		}
		
		/*-----------------鼠标------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "获取鼠标位置" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = temp2.split(/[,，]/);
				var pos = TouchInput.drill_COI_getMousePos();
				$gameVariables.setValue( Number(temp2[0]), pos['x'] );
				$gameVariables.setValue( Number(temp2[1]), pos['y'] );
			}
			if( type == "获取鼠标图块位置" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = temp2.split(/[,，]/);
				var pos = TouchInput.drill_COI_getMousePos_Tile();
				$gameVariables.setValue( Number(temp2[0]), pos['x'] );
				$gameVariables.setValue( Number(temp2[1]), pos['y'] );
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示鼠标DEBUG窗口" || type == "显示鼠标Debug窗口" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_mouseDebugWindow == undefined ){
					var temp_window = new Drill_COI_MouseDebugWindow();
					spriteset.addChild( temp_window );
					spriteset._drill_COI_mouseDebugWindow = temp_window;
				}
			}
			if( type == "关闭鼠标DEBUG窗口" || type == "关闭鼠标Debug窗口" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_mouseDebugWindow != undefined ){
					spriteset.removeChild( spriteset._drill_COI_mouseDebugWindow );
					spriteset._drill_COI_mouseDebugWindow = null;
				}
			}
		}
		
		/*-----------------键盘DEBUG------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示键盘DEBUG窗口-物理按键" || type == "显示键盘Debug窗口-物理按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_keyboardDebugWindow == undefined ){
					var temp_window = new Drill_COI_KeyboardDebugWindow();
					spriteset.addChild( temp_window );
					spriteset._drill_COI_keyboardDebugWindow = temp_window;
				}
			}
			if( type == "关闭键盘DEBUG窗口-物理按键" || type == "关闭键盘Debug窗口-物理按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_keyboardDebugWindow != undefined ){
					spriteset.removeChild( spriteset._drill_COI_keyboardDebugWindow );
					spriteset._drill_COI_keyboardDebugWindow = null;
				}
			}
		}
		
		/*-----------------手柄DEBUG------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "打印当前手柄信息" ){
				alert( Input.drill_COI_getPadInfo() );
			}
			if( type == "显示主手柄DEBUG窗口-物理按键" || type == "显示主手柄Debug窗口-物理按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_padDebugWindow1 == undefined ){
					var temp_window = new Drill_COI_PadDebugWindow();
					spriteset.addChild( temp_window );
					spriteset._drill_COI_padDebugWindow1 = temp_window;
				}
			}
			if( type == "关闭主手柄DEBUG窗口-物理按键" || type == "关闭主手柄Debug窗口-物理按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_padDebugWindow1 != undefined ){
					spriteset.removeChild( spriteset._drill_COI_padDebugWindow1 );
					spriteset._drill_COI_padDebugWindow1 = null;
				}
			}
			if( type == "显示全部手柄DEBUG窗口-物理按键" || type == "显示全部手柄Debug窗口-物理按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_padDebugWindow1 == undefined ){
					var temp_window = new Drill_COI_PadDebugWindow( 0 );
					spriteset.addChild( temp_window );
					spriteset._drill_COI_padDebugWindow1 = temp_window;
				}
				if( spriteset._drill_COI_padDebugWindow2 == undefined ){
					var temp_window = new Drill_COI_PadDebugWindow( 1 );
					spriteset.addChild( temp_window );
					spriteset._drill_COI_padDebugWindow2 = temp_window;
				}
				if( spriteset._drill_COI_padDebugWindow3 == undefined ){
					var temp_window = new Drill_COI_PadDebugWindow( 2 );
					spriteset.addChild( temp_window );
					spriteset._drill_COI_padDebugWindow3 = temp_window;
				}
				if( spriteset._drill_COI_padDebugWindow4 == undefined ){
					var temp_window = new Drill_COI_PadDebugWindow( 3 );
					spriteset.addChild( temp_window );
					spriteset._drill_COI_padDebugWindow4 = temp_window;
				}
			}
			if( type == "关闭全部手柄DEBUG窗口-物理按键" || type == "关闭全部手柄Debug窗口-物理按键" ){
				var spriteset = SceneManager._scene._spriteset;
				if( spriteset == undefined ){ return; }
				if( spriteset._drill_COI_padDebugWindow1 != undefined ){
					spriteset.removeChild( spriteset._drill_COI_padDebugWindow1 );
					spriteset._drill_COI_padDebugWindow1 = null;
				}
				if( spriteset._drill_COI_padDebugWindow2 != undefined ){
					spriteset.removeChild( spriteset._drill_COI_padDebugWindow2 );
					spriteset._drill_COI_padDebugWindow2 = null;
				}
				if( spriteset._drill_COI_padDebugWindow3 != undefined ){
					spriteset.removeChild( spriteset._drill_COI_padDebugWindow3 );
					spriteset._drill_COI_padDebugWindow3 = null;
				}
				if( spriteset._drill_COI_padDebugWindow4 != undefined ){
					spriteset.removeChild( spriteset._drill_COI_padDebugWindow4 );
					spriteset._drill_COI_padDebugWindow4 = null;
				}
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_COI_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COI_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COI_sys_initialize.call(this);
	this.drill_COI_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COI_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COI_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COI_saveEnabled == true ){	
		$gameSystem.drill_COI_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COI_initSysData();
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
Game_System.prototype.drill_COI_initSysData = function() {
	this.drill_COI_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COI_checkSysData = function() {
	this.drill_COI_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COI_initSysData_Private = function() {
	
	// > 默认开关（战斗界面）
	this._drill_COI_battle_keyboard = DrillUp.g_COI_battle_keyboard;			//战斗界面-键盘
	this._drill_COI_battle_pad = DrillUp.g_COI_battle_pad;						//战斗界面-手柄
	this._drill_COI_battle_mouse = DrillUp.g_COI_battle_mouse;					//战斗界面-鼠标
	this._drill_COI_battle_touchPad = DrillUp.g_COI_battle_touchPad;			//战斗界面-触屏
	
	// > 默认开关（地图界面）
	this._drill_COI_map_keyboard = DrillUp.g_COI_map_keyboard;					//地图界面-键盘
	this._drill_COI_map_pad = DrillUp.g_COI_map_pad;							//地图界面-手柄
	this._drill_COI_map_KPMove = DrillUp.g_COI_map_KPMove;						//地图界面-键盘或手柄方向键移动
	this._drill_COI_map_mouse = DrillUp.g_COI_map_mouse;						//地图界面-鼠标
	this._drill_COI_map_touchPad = DrillUp.g_COI_map_touchPad;					//地图界面-触屏
	this._drill_COI_map_mouseLeftMove = DrillUp.g_COI_map_mouseLeftMove;		//地图界面-鼠标左键移动
	this._drill_COI_map_mouseRightMenu = DrillUp.g_COI_map_mouseRightMenu;		//地图界面-鼠标右键菜单
	this._drill_COI_map_touchPadMenu = DrillUp.g_COI_map_touchPadMenu;			//地图界面-触屏双指菜单
	
	// > 默认开关（菜单界面）
	this._drill_COI_menu_keyboard = DrillUp.g_COI_menu_keyboard;				//菜单界面-键盘
	this._drill_COI_menu_pad = DrillUp.g_COI_menu_pad;							//菜单界面-手柄
	this._drill_COI_menu_mouse = DrillUp.g_COI_menu_mouse;						//菜单界面-鼠标
	this._drill_COI_menu_touchPad = DrillUp.g_COI_menu_touchPad;				//菜单界面-触屏
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COI_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COI_map_mouseLeftMove == undefined ){
		this.drill_COI_initSysData();
	}
	
};



//#############################################################################
// ** 【标准模块】默认开关 ☆默认开关
//
//			说明：	> 此模块提供 键盘/手柄/鼠标/触屏 的开关功能。
//					（插件完整的功能目录去看看：功能结构树）
//#############################################################################
//##############################
// * 默认开关 - 战斗界面 - 键盘启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Battle_setKeyboard = function( enable ){
	this._drill_COI_battle_keyboard = enable;
};
//##############################
// * 默认开关 - 战斗界面 - 手柄启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Battle_setPad = function( enable ){
	this._drill_COI_battle_pad = enable;
};
//##############################
// * 默认开关 - 战斗界面 - 鼠标启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Battle_setMouse = function( enable ){
	this._drill_COI_battle_mouse = enable;
};
//##############################
// * 默认开关 - 战斗界面 - 触屏启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Battle_setTouchPad = function( enable ){
	this._drill_COI_battle_touchPad = enable;
};

//##############################
// * 默认开关 - 地图界面 - 键盘启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setKeyboard = function( enable ){
	this._drill_COI_map_keyboard = enable;
};
//##############################
// * 默认开关 - 地图界面 - 手柄启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setPad = function( enable ){
	this._drill_COI_map_pad = enable;
};
//##############################
// * 默认开关 - 地图界面 - 键盘/手柄控制移动【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setKPMove = function( enable ){
	this._drill_COI_map_KPMove = enable;
};
//##############################
// * 默认开关 - 地图界面 - 鼠标启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setMouse = function( enable ){
	this._drill_COI_map_mouse = enable;
};
//##############################
// * 默认开关 - 地图界面 - 触屏启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setTouchPad = function( enable ){
	this._drill_COI_map_touchPad = enable;
};
//##############################
// * 默认开关 - 地图界面 - 鼠标左键移动【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setMouseLeftMove = function( enable ){
	this._drill_COI_map_mouseLeftMove = enable;
};
//##############################
// * 默认开关 - 地图界面 - 鼠标右键菜单【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setMouseRightMenu = function( enable ){
	this._drill_COI_map_mouseRightMenu = enable;
};
//##############################
// * 默认开关 - 地图界面 - 触屏双指菜单【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Map_setTouchPadMenu = function( enable ){
	this._drill_COI_map_touchPadMenu = enable;
};

//##############################
// * 默认开关 - 菜单界面 - 键盘启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Menu_setKeyboard = function( enable ){
	this._drill_COI_menu_keyboard = enable;
};
//##############################
// * 默认开关 - 菜单界面 - 手柄启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Menu_setPad = function( enable ){
	this._drill_COI_menu_pad = enable;
};
//##############################
// * 默认开关 - 菜单界面 - 鼠标启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Menu_setMouse = function( enable ){
	this._drill_COI_menu_mouse = enable;
};
//##############################
// * 默认开关 - 菜单界面 - 触屏启用/禁用【标准函数】
//				
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Game_System.prototype.drill_COI_Menu_setTouchPad = function( enable ){
	this._drill_COI_menu_touchPad = enable;
};
//=============================================================================
// ** 默认开关（接口实现）
//=============================================================================
//==============================
// * 默认开关 - 非菜单界面标记
//==============================
DrillUp.g_COI_isNotSceneMenu = [];
DrillUp.g_COI_isNotSceneMenu.push("Scene_Map");
DrillUp.g_COI_isNotSceneMenu.push("Scene_Battle");

//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标可用情况
//==============================
TouchInput.drill_COI_isMouseEnabled = function(){
	if( SceneManager._scene == undefined ){ return true; }
	var scene_name = SceneManager._scene.constructor.name;
	if( scene_name === "Scene_Map" ){
		if( $gameSystem && $gameSystem._drill_COI_map_mouse == false ){
			return false;
		}
	}
	if( scene_name === "Scene_Battle" ){
		if( $gameSystem && $gameSystem._drill_COI_battle_mouse == false ){
			return false;
		}
	}
	if( DrillUp.g_COI_isNotSceneMenu.contains(scene_name) == false ){//（如果不在 非菜单界面 列表中，则说明是菜单界面）
		if( $gameSystem && $gameSystem._drill_COI_menu_mouse == false ){
			return false;
		}
	}
	return true;
}
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏可用情况
//==============================
TouchInput.drill_COI_isTouchPadEnabled = function(){
	if( SceneManager._scene == undefined ){ return true; }
	var scene_name = SceneManager._scene.constructor.name;
	if( scene_name === "Scene_Map" ){
		if( $gameSystem && $gameSystem._drill_COI_map_touchPad == false ){
			return false;
		}
	}
	if( scene_name === "Scene_Battle" ){
		if( $gameSystem && $gameSystem._drill_COI_battle_touchPad == false ){
			return false;
		}
	}
	if( DrillUp.g_COI_isNotSceneMenu.contains(scene_name) == false ){//（如果不在 非菜单界面 列表中，则说明是菜单界面）
		if( $gameSystem && $gameSystem._drill_COI_menu_touchPad== false ){
			return false;
		}
	}
	return true;
}
//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标按下（dom 'mousedown'）
//==============================
var _drill_COI_DefaultSwitchBind__onMouseDown = TouchInput._onMouseDown;
TouchInput._onMouseDown = function( event ){
	if( this.drill_COI_isMouseEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onMouseDown.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标移动（dom 'mousemove'）
//==============================
var _drill_COI_DefaultSwitchBind__onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function( event ){
	if( this.drill_COI_isMouseEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onMouseMove.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标释放（dom 'mouseup'）
//==============================
var _drill_COI_DefaultSwitchBind__onMouseUp = TouchInput._onMouseUp;
TouchInput._onMouseUp = function( event ){
	if( this.drill_COI_isMouseEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onMouseUp.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标滚轮（dom 'wheel'）
//==============================
var _drill_COI_DefaultSwitchBind__onWheel = TouchInput._onWheel;
TouchInput._onWheel = function( event ){
	if( this.drill_COI_isMouseEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onWheel.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏开始（dom 'touchstart'）
//==============================
var _drill_COI_DefaultSwitchBind__onTouchStart = TouchInput._onTouchStart;
TouchInput._onTouchStart = function( event ){
	if( this.drill_COI_isTouchPadEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onTouchStart.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏移动（dom 'touchmove'）
//==============================
var _drill_COI_DefaultSwitchBind__onTouchMove = TouchInput._onTouchMove;
TouchInput._onTouchMove = function( event ){
	if( this.drill_COI_isTouchPadEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onTouchMove.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏结束（dom 'touchend'）
//==============================
var _drill_COI_DefaultSwitchBind__onTouchEnd = TouchInput._onTouchEnd;
TouchInput._onTouchEnd = function( event ){
	if( this.drill_COI_isTouchPadEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onTouchEnd.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏取消（dom 'touchcancel'）
//==============================
var _drill_COI_DefaultSwitchBind__onTouchCancel = TouchInput._onTouchCancel;
TouchInput._onTouchCancel = function( event ){
	if( this.drill_COI_isTouchPadEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onTouchCancel.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏点击（dom 'pointerdown'）
//==============================
var _drill_COI_DefaultSwitchBind__onPointerDown = TouchInput._onPointerDown;
TouchInput._onPointerDown = function( event ){
	if( this.drill_COI_isTouchPadEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onPointerDown.call( this, event );
}
//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标左键移动
//==============================
var _drill_COI_DefaultSwitch_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function(){	
	
	// > 若关闭则不执行
	if( $gameSystem && $gameSystem._drill_COI_map_mouseLeftMove == false ){ return; }
	
	// > 原函数
	_drill_COI_DefaultSwitch_processMapTouch.call(this);
};
//==============================
// * 默认开关 - 鼠标与触屏 - 鼠标右键菜单
//==============================
var _drill_COI_DefaultSwitch_onRightButtonDown = TouchInput._onRightButtonDown;
TouchInput._onRightButtonDown = function( event ){
	
	// > 若关闭则不执行
	if( ($gameSystem && $gameSystem._drill_COI_map_mouseRightMenu == false) && 
		SceneManager._scene.constructor.name === "Scene_Map" ){
		return;
	}
	
	// > 原函数
	_drill_COI_DefaultSwitch_onRightButtonDown.call(this,event);
};
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏双指菜单（标记）
//==============================
var _drill_COI_DefaultSwitch__onTouchStart = TouchInput._onTouchStart;
TouchInput._onTouchStart = function( event ){
	if( ($gameSystem && $gameSystem._drill_COI_map_touchPadMenu == false) && 
		SceneManager._scene.constructor.name === "Scene_Map" ){
		if( event.touches.length >= 2 ){
			this._drill_COI_forbid_menu = true;
		}
	}
	_drill_COI_DefaultSwitch__onTouchStart.call(this,event);
};
//==============================
// * 默认开关 - 鼠标与触屏 - 触屏双指菜单（延迟锁）
//==============================
var _drill_COI_DefaultSwitch__onCancel = TouchInput._onCancel;
TouchInput._onCancel = function( x, y ){
	if( this._drill_COI_forbid_menu === true ){
		this._drill_COI_forbid_menu = false;
		return ;
	}
	_drill_COI_DefaultSwitch__onCancel.call(this,x, y);
};

//==============================
// * 默认开关 - 键盘与手柄 - 键盘可用情况
//==============================
Input.drill_COI_isKeyboardEnabled = function(){
	if( SceneManager._scene == undefined ){ return true; }
	var scene_name = SceneManager._scene.constructor.name;
	if( scene_name === "Scene_Map" ){
		if( $gameSystem && $gameSystem._drill_COI_map_keyboard == false ){
			return false;
		}
	}
	if( scene_name === "Scene_Battle" ){
		if( $gameSystem && $gameSystem._drill_COI_battle_keyboard == false ){
			return false;
		}
	}
	if( DrillUp.g_COI_isNotSceneMenu.contains(scene_name) == false ){//（如果不在 非菜单界面 列表中，则说明是菜单界面）
		if( $gameSystem && $gameSystem._drill_COI_menu_keyboard == false ){
			return false;
		}
	}
	return true;
}
//==============================
// * 默认开关 - 键盘与手柄 - 手柄可用情况
//==============================
Input.drill_COI_isPadEnabled = function(){
	if( SceneManager._scene == undefined ){ return true; }
	var scene_name = SceneManager._scene.constructor.name;
	if( scene_name === "Scene_Map" ){
		if( $gameSystem && $gameSystem._drill_COI_map_pad == false ){
			return false;
		}
	}
	if( scene_name === "Scene_Battle" ){
		if( $gameSystem && $gameSystem._drill_COI_battle_pad == false ){
			return false;
		}
	}
	if( DrillUp.g_COI_isNotSceneMenu.contains(scene_name) == false ){//（如果不在 非菜单界面 列表中，则说明是菜单界面）
		if( $gameSystem && $gameSystem._drill_COI_menu_pad== false ){
			return false;
		}
	}
	return true;
}
//==============================
// * 默认开关 - 键盘与手柄 - 键盘按下（dom 'keydown'）
//==============================
var _drill_COI_DefaultSwitchBind__onKeyDown = Input._onKeyDown;
Input._onKeyDown = function( event ){
	if( this.drill_COI_isKeyboardEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onKeyDown.call( this, event );
}
//==============================
// * 默认开关 - 键盘与手柄 - 键盘释放（dom 'keyup'）
//==============================
var _drill_COI_DefaultSwitchBind__onKeyUp = Input._onKeyUp;
Input._onKeyUp = function( event ){
	if( this.drill_COI_isKeyboardEnabled() == false ){ return; }
	_drill_COI_DefaultSwitchBind__onKeyUp.call( this, event );
}
//==============================
// * 默认开关 - 键盘与手柄 - 手柄控制
//==============================
var _drill_COI_DefaultSwitch__updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function( gamepad ){
	if( this.drill_COI_isPadEnabled() == false ){ return; }
	_drill_COI_DefaultSwitch__updateGamepadState.call( this, gamepad );
}
//==============================
// * 默认开关 - 键盘与手柄 - 键盘或手柄方向键移动
//==============================
var _drill_COI_DefaultSwitch_getInputDirection = Game_Player.prototype.getInputDirection;
Game_Player.prototype.getInputDirection = function(){
	var scene_name = SceneManager._scene.constructor.name;
	if( scene_name === "Scene_Map" ){
		if( $gameSystem && $gameSystem._drill_COI_map_KPMove == false ){
			return 0;
		}
	}
	return _drill_COI_DefaultSwitch_getInputDirection.call(this);
}



//=============================================================================
// ** ☆核心漏洞修复
//			
//			说明：	> 此模块修复核心中的部分漏洞。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 核心漏洞修复 - 鼠标失去窗口焦点时
//==============================
var _drill_COI_Mouse__setupEventHandlers2 = TouchInput._setupEventHandlers;
TouchInput._setupEventHandlers = function(){
	_drill_COI_Mouse__setupEventHandlers2.call(this);
    window.addEventListener("blur", this.drill_COI_onLostFocus.bind(this));
};
//==============================
// * 核心漏洞修复 - 鼠标失去窗口焦点时 - 清理参数
//==============================
TouchInput.drill_COI_onLostFocus = function(){
    this.clear();
};



//=============================================================================
// ** ☆鼠标
//			
//			类型：	类扩展用函数集
//			功能：	获取鼠标指针、鼠标按键情况。
//			
//			用法：	var mouse_pos = TouchInput.drill_COI_getMousePos();					// 指针位置
//					var mouse_pos = TouchInput.drill_COI_getMousePos_WithOutside();		// 指针位置（包含出界情况）
//					var b = TouchInput.drill_COI_isMousePosInOutside();					// 指针位置是否出界
//					var b = TouchInput.drill_COI_isMousePosInOverstoryLayer();			// 指针位置是否在天窗层
//					var mouse_tilePos = TouchInput.drill_COI_getMousePos_Tile();		// 指针位置（图块位置）
//					
//					if( TouchInput.drill_isLeftPressed() ){ }							// 左键按下[持续]
//					if( TouchInput.drill_isLeftTriggered() ){ }							// 左键按下[一帧]
//					if( TouchInput.drill_isLeftReleased() ){ }							// 左键释放[一帧]
//					if( TouchInput.drill_isLeftDoubled() ){ }							// 左键双击[一帧]
//					if( TouchInput.drill_isWheelUp() ){ }								// 滚轮上滚[一帧]
//					if( TouchInput.drill_isWheelDown() ){ }								// 滚轮下滚[一帧]
//					if( TouchInput.drill_isMiddlePressed() ){ }							// 滚轮按下[持续]
//					if( TouchInput.drill_isMiddleTriggered() ){ }						// 滚轮按下[一帧]
//					if( TouchInput.drill_isMiddleReleased() ){ }						// 滚轮释放[一帧]
//					if( TouchInput.drill_isMiddleDoubled() ){ }							// 滚轮双击[一帧]
//					if( TouchInput.drill_isRightPressed() ){ }							// 右键按下[持续]
//					if( TouchInput.drill_isRightTriggered() ){ }						// 右键按下[一帧]
//					if( TouchInput.drill_isRightReleased() ){ }							// 右键释放[一帧]
//					if( TouchInput.drill_isRightDoubled() ){ }							// 右键双击[一帧]
//
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//##############################
// * 鼠标 - 指针位置【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）
//
//			说明：	> 坐标值为 镜头参照 。
//					> 返回的鼠标位置包括：
//						√ 游戏区域（在816x624范围内）
//						√ 天窗层区域（在游戏窗体内但不在816x624范围内）
//						x 出界情况（游戏窗体外）
//##############################
TouchInput.drill_COI_getMousePos = function(){
	return {'x': _drill_mouse_x, 'y': _drill_mouse_y };
}
//##############################
// * 鼠标 - 指针位置（包含出界情况）【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）
//
//			说明：	> 坐标值为 镜头参照 。
//					> 出界位置是指 鼠标出界/入界 的一瞬间记录的坐标。
//					  界限外的鼠标无法实时记录位置。但如果鼠标回到界限内，那么就能继续记录。
//					> 返回的鼠标位置包括：
//						√ 游戏区域（在816x624范围内）
//						√ 天窗层区域（在游戏窗体内但不在816x624范围内）
//						√ 出界情况（游戏窗体外）
//##############################
TouchInput.drill_COI_getMousePos_WithOutside = function(){
	return {'x': this._drill_COI_mouse_x_outside, 'y': this._drill_COI_mouse_y_outside };
}
//##############################
// * 鼠标 - 指针位置是否出界【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isMousePosInOutside = function(){
	return this._drill_COI_mouse_isOutside;
}
//##############################
// * 鼠标 - 指针位置是否在天窗层【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isMousePosInOverstoryLayer = function(){
	if( this._drill_COI_mouse_isOutside == true ){ return false; }
	if( _drill_mouse_x < 0 ){ return true; }
	if( _drill_mouse_y < 0 ){ return true; }
	if( _drill_mouse_x >= Graphics.boxWidth  ){ return true; }
	if( _drill_mouse_y >= Graphics.boxHeight ){ return true; }
	return false;
}
//##############################
// * 鼠标 - 指针位置（图块位置）【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）
//
//			说明：	> 指针位置转图块位置，图块位置只能在 游戏区域内 且 在有效地图范围内。
//##############################
TouchInput.drill_COI_getMousePos_Tile = function(){
	if( $gameMap == undefined ){ return {'x': -1, 'y': -1 }; }
	
	// > 指针位置
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	
	// > 指针位置 - 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){										//（需要 考虑镜头缩放后的指针位置范围变化）
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );		//（不需要 考虑图块缩放后变小的问题）
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );
	}
	
	// > 图块网格的坐标
	var xx = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
	var yy = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
	
	// > 图块坐标修正（循环地图情况）
	xx = $gameMap.roundX(xx);
	yy = $gameMap.roundY(yy);
	xx = Math.floor( xx );
	yy = Math.floor( yy );
	
	// > 有效地图范围内
	if( xx < 0 ){ xx = 0; }
	if( yy < 0 ){ yy = 0; }
	if( xx > $gameMap.width()-1  ){ xx = $gameMap.width()-1;  }
	if( yy > $gameMap.height()-1 ){ yy = $gameMap.height()-1; }
	
	return {'x': xx, 'y': yy };
}

//##############################
// * 鼠标 - 物理按键条件判定 - 左键按下[持续]
//
//			参数：	> 无
//			返回：	> 布尔
//
//			说明：	> 所有 物理按键条件判定 的鼠标函数，全都包括 触屏联动 的情况。
//##############################
TouchInput.drill_COI_isLeftPressed = function(){
	return this._drill_COI_leftPressed;
}
//##############################
// * 鼠标 - 物理按键条件判定 - 左键按下[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isLeftTriggered = function(){
	return (this._drill_COI_leftPressed && this._drill_COI_leftPressedTime == 1);
}
//##############################
// * 鼠标 - 物理按键条件判定 - 左键释放[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isLeftReleased = function(){
	return (!this._drill_COI_leftPressed && this._drill_COI_leftReleasedTime == 1);
}
//##############################
// * 鼠标 - 物理按键条件判定 - 左键双击[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isLeftDoubled = function(){
	return this._drill_COI_leftDoubledTime == 1;
}

//##############################
// * 鼠标 - 物理按键条件判定 - 滚轮上滚[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isWheelUp = function(){
	return TouchInput.wheelY <= -20;
}
//##############################
// * 鼠标 - 物理按键条件判定 - 滚轮下滚[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isWheelDown = function(){
	return TouchInput.wheelY >= 20;
}
//##############################
// * 鼠标 - 物理按键条件判定 - 滚轮按下[持续]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isMiddlePressed = function(){
	return this._drill_COI_middlePressed;
}
//##############################
// * 鼠标 - 物理按键条件判定 - 滚轮按下[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isMiddleTriggered = function(){
	return (this._drill_COI_middlePressed && this._drill_COI_middlePressedTime == 1);
}
//##############################
// * 鼠标 - 物理按键条件判定 - 滚轮释放[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isMiddleReleased = function(){
	return (!this._drill_COI_middlePressed && this._drill_COI_middleReleasedTime == 1);
}
//##############################
// * 鼠标 - 物理按键条件判定 - 滚轮双击[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isMiddleDoubled = function(){
	return this._drill_COI_middleDoubledTime == 1;
}

//##############################
// * 鼠标 - 物理按键条件判定 - 右键按下[持续]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isRightPressed = function(){
	return this._drill_COI_rightPressed;
}
//##############################
// * 鼠标 - 物理按键条件判定 - 右键按下[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isRightTriggered = function(){
	return (this._drill_COI_rightPressed && this._drill_COI_rightPressedTime == 1);
}
//##############################
// * 鼠标 - 物理按键条件判定 - 右键释放[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isRightReleased = function(){
	return (!this._drill_COI_rightPressed && this._drill_COI_rightReleasedTime == 1);
}
//##############################
// * 鼠标 - 物理按键条件判定 - 右键双击[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
TouchInput.drill_COI_isRightDoubled = function(){
	return this._drill_COI_rightDoubledTime == 1;
}
//==============================
// * 鼠标 - 相同函数兼容
//==============================
TouchInput.drill_isLeftPressed = TouchInput.drill_COI_isLeftPressed;
TouchInput.drill_isLeftTriggerd = TouchInput.drill_COI_isLeftTriggered;			//（错误拼写兼容）
TouchInput.drill_isLeftTriggered = TouchInput.drill_COI_isLeftTriggered;
TouchInput.drill_isLeftReleased = TouchInput.drill_COI_isLeftReleased;
TouchInput.drill_isLeftDoubled = TouchInput.drill_COI_isLeftDoubled;
TouchInput.drill_isWheelUp = TouchInput.drill_COI_isWheelUp;
TouchInput.drill_isWheelDown = TouchInput.drill_COI_isWheelDown;
TouchInput.drill_isMiddlePressed = TouchInput.drill_COI_isMiddlePressed;
TouchInput.drill_isMiddleTriggerd = TouchInput.drill_COI_isMiddleTriggered;		//（错误拼写兼容）
TouchInput.drill_isMiddleTriggered = TouchInput.drill_COI_isMiddleTriggered;
TouchInput.drill_isMiddleReleased = TouchInput.drill_COI_isMiddleReleased;
TouchInput.drill_isMiddleDoubled = TouchInput.drill_COI_isMiddleDoubled;
TouchInput.drill_isRightPressed = TouchInput.drill_COI_isRightPressed;
TouchInput.drill_isRightTriggerd = TouchInput.drill_COI_isRightTriggered;		//（错误拼写兼容）
TouchInput.drill_isRightTriggered = TouchInput.drill_COI_isRightTriggered;
TouchInput.drill_isRightReleased = TouchInput.drill_COI_isRightReleased;
TouchInput.drill_isRightDoubled = TouchInput.drill_COI_isRightDoubled;

//=============================================================================
// ** ☆鼠标位置监听
//			
//			说明：	> 此模块专门监听 指针位置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 指针位置 - 通用函数
//
//			说明：	> 注意这里没有 COI 关键词。
//==============================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义（该函数在许多插件都用到了）

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function( event ){			//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}
//==============================
// * 指针位置 - 监听初始化
//==============================
var _drill_COI_Mouse_clear = TouchInput.clear;
TouchInput.clear = function(){
	_drill_COI_Mouse_clear.call(this);
	this._drill_COI_mouse_isOutside = false;	//是否出界
	this._drill_COI_mouse_x_outside = 0;		//出界的位置X
	this._drill_COI_mouse_y_outside = 0;		//出界的位置Y
}
//==============================
// * 指针位置 - 出界入界情况绑定
//
//			说明：	> 浏览器无法获取到屏幕外的位置，只能在leave和enter的一瞬间知道一次位置。所以才有此处的绑定。
//==============================
var _drill_COI_Mouse__setupEventHandlers = TouchInput._setupEventHandlers;
TouchInput._setupEventHandlers = function(){
	_drill_COI_Mouse__setupEventHandlers.call(this);
    document.addEventListener("mouseleave", this.drill_COI_onMouseLeave.bind(this));
    document.addEventListener("mouseenter", this.drill_COI_onMouseEnter.bind(this));
};
//==============================
// * 指针位置 - 出界情况
//==============================
TouchInput.drill_COI_onMouseLeave = function( event ){
	this._drill_COI_mouse_isOutside = true;
	this._drill_COI_mouse_x_outside = Graphics.pageToCanvasX(event.pageX);
	this._drill_COI_mouse_y_outside = Graphics.pageToCanvasY(event.pageY);
};
//==============================
// * 指针位置 - 入界情况
//==============================
TouchInput.drill_COI_onMouseEnter = function( event ){
	this._drill_COI_mouse_isOutside = false;
};
//==============================
// * 指针位置 - 实时同步屏幕内的位置
//==============================
var _drill_COI_Mouse__onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function( event ){
	_drill_COI_Mouse__onMouseMove.call(this,event);
	this._drill_COI_mouse_x_outside = Graphics.pageToCanvasX(event.pageX);
	this._drill_COI_mouse_y_outside = Graphics.pageToCanvasY(event.pageY);
}

//=============================================================================
// ** ☆鼠标监听
//			
//			说明：	> 此模块专门监听 鼠标按键。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 鼠标监听 - 监听初始化
//==============================
TouchInput._drill_COI_leftPressed = false;				//是否按住
TouchInput._drill_COI_leftPressedTime = undefined;		//第一次按住为true的持续时间（按下时开始计时）
TouchInput._drill_COI_leftReleasedTime = undefined;		//第一次按住为false的持续时间（释放时开始计时）
TouchInput._drill_COI_leftDoubledTime = undefined;		//第二次按住为true的持续时间（按下时开始计时）
TouchInput._drill_COI_middlePressed = false;
TouchInput._drill_COI_middlePressedTime = undefined;
TouchInput._drill_COI_middleReleasedTime = undefined;
TouchInput._drill_COI_middleDoubledTime = undefined;
TouchInput._drill_COI_rightPressed = false;
TouchInput._drill_COI_rightPressedTime = undefined;
TouchInput._drill_COI_rightReleasedTime = undefined;
TouchInput._drill_COI_rightDoubledTime = undefined;
//==============================
// * 鼠标监听 - 鼠标按下
//
//			说明：	> 继承自函数 TouchInput._onMouseDown，原函数绑定了 dom 'mousedown'。
//					> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_mouse_pressed = TouchInput._onMouseDown;
TouchInput._onMouseDown = function( event ){	
	if( event.button === 0 ){			//左键
		var x = Graphics.pageToCanvasX(event.pageX);
		var y = Graphics.pageToCanvasY(event.pageY);
		if( Graphics.isInsideCanvas(x, y) ){
			this.drill_COI_onLeftDown( event );
		}
	}else if( event.button === 1 ){		//中键/滚轮
		var x = Graphics.pageToCanvasX(event.pageX);
		var y = Graphics.pageToCanvasY(event.pageY);
		if( Graphics.isInsideCanvas(x, y) ){
			this.drill_COI_onMiddleDown( event );
		}
	}else if( event.button === 2 ){		//右键
		var x = Graphics.pageToCanvasX(event.pageX);
		var y = Graphics.pageToCanvasY(event.pageY);
		if( Graphics.isInsideCanvas(x, y) ){
			this.drill_COI_onRightDown( event );
		}
	}
	
	// > 原函数
	_drill_COI_mouse_pressed.call(this,event);
};
//==============================
// * 鼠标监听 - 鼠标按下 - 左键
//==============================
TouchInput.drill_COI_onLeftDown = function( event ){
	
	// > 左键 被按下时，记录 是否按住
	this._drill_COI_leftPressed = true;
	
	// > 左键 被按下时，第二次按住为true的持续时间
	if( this._drill_COI_leftPressedTime != undefined &&
		this._drill_COI_leftPressedTime >= 1 ){
		this._drill_COI_leftDoubledTime = 0;
	}
	
	// > 左键 被按下时，第一次按住为true的持续时间
	this._drill_COI_leftPressedTime = 0;
}
//==============================
// * 鼠标监听 - 鼠标按下 - 中键/滚轮
//==============================
TouchInput.drill_COI_onMiddleDown = function( event ){
	
	// > 中键/滚轮 被按下时，记录 是否按住
	this._drill_COI_middlePressed = true;
	
	// > 中键/滚轮 被按下时，第二次按住为true的持续时间
	if( this._drill_COI_middlePressedTime != undefined &&
		this._drill_COI_middlePressedTime >= 1 ){
		this._drill_COI_middleDoubledTime = 0;
	}
	
	// > 中键/滚轮 被按下时，第一次按住为true的持续时间
	this._drill_COI_middlePressedTime = 0;
}
//==============================
// * 鼠标监听 - 鼠标按下 - 右键
//==============================
TouchInput.drill_COI_onRightDown = function( event ){
	
	// > 右键 被按下时，记录 是否按住
	this._drill_COI_rightPressed = true;
	
	// > 右键 被按下时，第二次按住为true的持续时间
	if( this._drill_COI_rightPressedTime != undefined &&
		this._drill_COI_rightPressedTime >= 1 ){
		this._drill_COI_rightDoubledTime = 0;		//双击
	}
	
	// > 右键 被按下时，第一次按住为true的持续时间
	this._drill_COI_rightPressedTime = 0;
}
//==============================
// * 鼠标监听 - 鼠标释放
//
//			说明：	> 继承自函数 TouchInput._onMouseUp，原函数绑定了 dom 'mouseup'。
//					> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_mouse_released = TouchInput._onMouseUp;
TouchInput._onMouseUp = function( event ){
	if( event.button === 0 ){			//左键
		this.drill_COI_onLeftUp( event );
	}else if( event.button === 1 ){		//中键/滚轮
		this.drill_COI_onMiddleUp( event );
	}else if( event.button === 2 ){		//右键
		this.drill_COI_onRightUp( event );
	}
	
	// > 原函数
	_drill_COI_mouse_released.call(this,event);
};
//==============================
// * 鼠标监听 - 鼠标释放 - 左键
//==============================
TouchInput.drill_COI_onLeftUp = function( event ){
	
	// > 左键 被释放时，记录 是否按住
	this._drill_COI_leftPressed = false;
	
	// > 左键 被释放时，第一次按住为false的持续时间
	this._drill_COI_leftReleasedTime = 0;
}
//==============================
// * 鼠标监听 - 鼠标释放 - 中键/滚轮
//==============================
TouchInput.drill_COI_onMiddleUp = function( event ){
	
	// > 中键/滚轮 被释放时，记录 是否按住
	this._drill_COI_middlePressed = false;
	
	// > 中键/滚轮 被释放时，第一次按住为false的持续时间
	this._drill_COI_middleReleasedTime = 0;
}
//==============================
// * 鼠标监听 - 鼠标释放 - 右键
//==============================
TouchInput.drill_COI_onRightUp = function( event ){
	
	// > 右键 被释放时，记录 是否按住
	this._drill_COI_rightPressed = false;
	
	// > 右键 被释放时，第一次按住为false的持续时间
	this._drill_COI_rightReleasedTime = 0;
}

//==============================
// * 鼠标监听 - 帧刷新绑定
//==============================
var _drill_COI_mouse_update = TouchInput.update;
TouchInput.update = function(){
	_drill_COI_mouse_update.call(this);
	this.drill_COI_updateMouseAction();
}
//==============================
// * 鼠标监听 - 帧刷新
//==============================
TouchInput.drill_COI_updateMouseAction = function(){
	var isPressed_left = this._drill_COI_leftPressed;
	var isPressed_middle = this._drill_COI_middlePressed;
	var isPressed_right = this._drill_COI_rightPressed;
	
	
	// > 左键 - 时间+1
	if( this._drill_COI_leftPressedTime != undefined && isPressed_left == true ){
		this._drill_COI_leftPressedTime += 1;
	}
	if( this._drill_COI_leftReleasedTime != undefined && isPressed_left == false ){
		this._drill_COI_leftReleasedTime += 1;
	}
	if( this._drill_COI_leftDoubledTime != undefined ){
		this._drill_COI_leftDoubledTime += 1;
	}
	
	// > 左键 - 释放时间超过一定值时，立即清空时间判定
	if( this._drill_COI_leftReleasedTime > DrillUp.g_COI_mouse_judgeTime ){
		this._drill_COI_leftPressedTime = undefined;
		this._drill_COI_leftReleasedTime = undefined;
		this._drill_COI_leftDoubledTime = undefined;
	}
	
	
	// > 中键/滚轮 - 时间+1
	if( this._drill_COI_middlePressedTime != undefined && isPressed_middle == true ){
		this._drill_COI_middlePressedTime += 1;
	}
	if( this._drill_COI_middleReleasedTime != undefined && isPressed_middle == false ){
		this._drill_COI_middleReleasedTime += 1;
	}
	if( this._drill_COI_middleDoubledTime != undefined ){
		this._drill_COI_middleDoubledTime += 1;
	}
	
	// > 中键/滚轮 - 释放时间超过一定值时，立即清空时间判定
	if( this._drill_COI_middleReleasedTime > DrillUp.g_COI_mouse_judgeTime ){
		this._drill_COI_middlePressedTime = undefined;
		this._drill_COI_middleReleasedTime = undefined;
		this._drill_COI_middleDoubledTime = undefined;
	}
	
	
	// > 右键 - 时间+1
	if( this._drill_COI_rightPressedTime != undefined && isPressed_right == true ){
		this._drill_COI_rightPressedTime += 1;
	}
	if( this._drill_COI_rightReleasedTime != undefined && isPressed_right == false ){
		this._drill_COI_rightReleasedTime += 1;
	}
	if( this._drill_COI_rightDoubledTime != undefined ){
		this._drill_COI_rightDoubledTime += 1;
	}
	
	// > 右键 - 释放时间超过一定值时，立即清空时间判定
	if( this._drill_COI_rightReleasedTime > DrillUp.g_COI_mouse_judgeTime ){
		this._drill_COI_rightPressedTime = undefined;
		this._drill_COI_rightReleasedTime = undefined;
		this._drill_COI_rightDoubledTime = undefined;
	}
}
/*
//==============================
// * 滚轮 - 滚轮监听
//==============================
var _drill_COI_Mouse_onWheel = TouchInput._onWheel;
TouchInput._onWheel = function( event ){
	//if( event.deltaY != 0 ){					//暂时用原函数
	//	this._drill_COI_wheel_delta = event.deltaY;
	//}
	_drill_COI_Mouse_onWheel.call(this,event);
};
*/



//=============================================================================
// ** ☆触屏
//		
//			类型：	类扩展用函数集
//			功能：	获取触屏指针、触屏按键数据。
//			
//			接口：	var xx = _drill_mouse_x;						// 触屏位置（全局变量，直接使用即可）
//					var yy = _drill_mouse_y;
//					if( TouchInput.drill_isLeftPressed() ){ }		// 左键按下[持续] （触屏联动）
//					if( TouchInput.drill_isLeftTriggered() ){ }		// 左键按下[一帧] （触屏联动）
//					if( TouchInput.drill_isLeftReleased() ){ }		// 左键释放[一帧] （触屏联动）
//					if( TouchInput.drill_isLeftDoubled() ){ }		// 左键双击[一帧] （触屏联动）
//					if( TouchInput.drill_isMiddlePressed() ){ }		// 滚轮按下[持续] （触屏联动）
//					if( TouchInput.drill_isMiddleTriggered() ){ }	// 滚轮按下[一帧] （触屏联动）
//					if( TouchInput.drill_isMiddleReleased() ){ }	// 滚轮释放[一帧] （触屏联动）
//					if( TouchInput.drill_isMiddleDoubled() ){ }		// 滚轮双击[一帧] （触屏联动）
//					if( TouchInput.drill_isRightPressed() ){ }		// 右键按下[持续] （触屏联动）
//					if( TouchInput.drill_isRightTriggered() ){ }	// 右键按下[一帧] （触屏联动）
//					if( TouchInput.drill_isRightReleased() ){ }		// 右键释放[一帧] （触屏联动）
//					if( TouchInput.drill_isRightDoubled() ){ }		// 右键双击[一帧] （触屏联动）
//					
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//					> 触屏的接口使用的与鼠标 一模一样 。
//					  通过触屏联动，可以使得触屏能够触发和鼠标按键一样的功能。但是仅限使用了上述条件的插件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 触屏 - 位置
//
//			说明：	> 注意这里没有 COI 关键词。
//==============================
if( typeof(_drill_touchPad_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_touchPad_getCurPos = TouchInput._onTouchMove;
	TouchInput._onTouchMove = function( event ){
		_drill_touchPad_getCurPos.call( this, event );	//触屏位置
			
		if( event.changedTouches && event.changedTouches[0] ){
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
	};
}
//==============================
// * 触屏 - 触屏联动 - 鼠标按下时
//
//			说明：	> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_touchPad_pressed = TouchInput._onTouchStart;
TouchInput._onTouchStart = function( event ){
	_drill_COI_touchPad_pressed.call( this, event );
	if( this._screenPressed == true ){
		if( event.changedTouches && event.changedTouches[0] ){	//强制触屏位移
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
		
		// > 触屏联动 - 鼠标按下 - 左键
		if( DrillUp.g_COI_touchPad_l_down == true ){ this.drill_COI_onLeftDown(null); }
		// > 触屏联动 - 鼠标按下 - 中键/滚轮
		if( DrillUp.g_COI_touchPad_m_down == true ){ this.drill_COI_onMiddleDown(null); }
		// > 触屏联动 - 鼠标按下 - 右键
		if( DrillUp.g_COI_touchPad_r_down == true ){ this.drill_COI_onRightDown(null); }
	}
};
//==============================
// * 触屏 - 触屏联动 - 鼠标释放时
//
//			说明：	> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_touchPad_released = TouchInput._onTouchEnd;
TouchInput._onTouchEnd = function( event ){
	_drill_COI_touchPad_released.call( this, event );
	if( this._screenPressed == false ){				//确认触屏结束后，直接生效
		if( event.changedTouches && event.changedTouches[0] ){	//强制触屏位移
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
		
		// > 触屏联动 - 鼠标释放 - 左键
		if( DrillUp.g_COI_touchPad_l_up == true ){ this.drill_COI_onLeftUp(null); }
		// > 触屏联动 - 鼠标释放 - 中键/滚轮
		if( DrillUp.g_COI_touchPad_m_up == true ){ this.drill_COI_onMiddleUp(null); }
		// > 触屏联动 - 鼠标释放 - 右键
		if( DrillUp.g_COI_touchPad_r_up == true ){ this.drill_COI_onRightUp(null); }
	}
};

	

//=============================================================================
// ** ☆键盘
//		
//			类型：	类扩展用函数集
//			功能：	获取键盘按键数据。
//			
//			接口：	if( Input.drill_isKeyPressed("a") ){ }			// A键按下[持续]
//					if( Input.drill_isKeyTriggered("a") ){ }		// A键按下[一帧]
//					if( Input.drill_isKeyReleased("a") ){ }			// A键释放[一帧]
//					if( Input.drill_isKeyDoubled("a") ){ }			// A键双击[一帧]
//					
//					if( Input.drill_isKeyPressed("b") ){ }			// B键按下[持续]
//					if( Input.drill_isKeyTriggered("b") ){ }		// B键按下[一帧]
//					if( Input.drill_isKeyReleased("b") ){ }			// B键释放[一帧]
//					if( Input.drill_isKeyDoubled("b") ){ }			// B键双击[一帧]
//					
//					……												// ……
//					
//					if( Input.drill_isAnyKeyTriggered() ){ }		// 任意键按下[一帧]
//					if( Input.drill_isAnyKeyReleased() ){ }			// 任意键释放[一帧]
//					
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//					> 输入的按键字符必须【小写】。
//					> 这里全为【物理按键】，如果要判断 逻辑按键 是否触发，去用原函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 键盘 - 物理按键
//==============================
DrillUp.g_COI_keys = {						// 【键盘物理按键表】【全部大写】（Drill_OperateKeys也有一模一样的按键表）
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

//##############################
// * 键盘 - 物理按键条件判定 - 键盘按下[持续]
//
//			参数：	> keyName 字符串（按键名，见 键盘物理按键表）
//			返回：	> 布尔
//##############################
Input.drill_COI_isKeyPressed = function( keyName ){
	return DrillUp.g_COI_keys_pressed[ keyName.toUpperCase() ] == true;		//	（持续按时，不要打盹）
}
//##############################
// * 键盘 - 物理按键条件判定 - 键盘按下[一帧]
//
//			参数：	> keyName 字符串（按键名，见 键盘物理按键表）
//			返回：	> 布尔
//##############################
Input.drill_COI_isKeyTriggered = function( keyName ){
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	return (DrillUp.g_COI_keys_pressed[ keyName.toUpperCase() ] == true && 
			DrillUp.g_COI_keys_pressedTime[ keyName.toUpperCase() ] == 1 );
}
//##############################
// * 键盘 - 物理按键条件判定 - 键盘释放[一帧]
//
//			参数：	> keyName 字符串（按键名，见 键盘物理按键表）
//			返回：	> 布尔
//##############################
Input.drill_COI_isKeyReleased = function( keyName ){
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	return (DrillUp.g_COI_keys_pressed[ keyName.toUpperCase() ] == false && 
			DrillUp.g_COI_keys_releasedTime[ keyName.toUpperCase() ] == 1 );
}
//##############################
// * 键盘 - 物理按键条件判定 - 键盘双击[一帧]
//
//			参数：	> keyName 字符串（按键名，见 键盘物理按键表）
//			返回：	> 布尔
//##############################
Input.drill_COI_isKeyDoubled = function( keyName ){
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	return DrillUp.g_COI_keys_doubleTime[ keyName.toUpperCase() ] == 1;
}

//##############################
// * 键盘 - 物理按键条件判定 - 任意键按下[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Input.drill_COI_isAnyKeyTriggered = function(){
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	for( var keyName in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys_pressed[keyName] == true && 
			DrillUp.g_COI_keys_pressedTime[keyName] == 1 ){
			return true;
		}
	}
	return false;
}
//##############################
// * 键盘 - 物理按键条件判定 - 任意键释放[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Input.drill_COI_isAnyKeyReleased = function(){
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return false }
	for( var keyName in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys_pressed[keyName] == false && 
			DrillUp.g_COI_keys_releasedTime[keyName] == 1 ){
			return true;
		}
	}
	return false;
}
//==============================
// * 键盘 - 相同函数兼容
//==============================
Input.drill_isKeyPressed = Input.drill_COI_isKeyPressed;
Input.drill_isKeyTriggerd = Input.drill_COI_isKeyTriggered;			//（错误拼写兼容）
Input.drill_isKeyTriggered = Input.drill_COI_isKeyTriggered;
Input.drill_isKeyReleased = Input.drill_COI_isKeyReleased;
Input.drill_isKeyDoubled = Input.drill_COI_isKeyDoubled;
Input.drill_isAnyKeyTriggerd = Input.drill_COI_isAnyKeyTriggered;	//（错误拼写兼容）
Input.drill_isAnyKeyTriggered = Input.drill_COI_isAnyKeyTriggered;
Input.drill_isAnyKeyReleased = Input.drill_COI_isAnyKeyReleased;


//=============================================================================
// ** ☆键盘监听
//			
//			说明：	> 此模块专门监听 键盘。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 键盘监听 - 监听初始化
//==============================
DrillUp.g_COI_keys_pressed = {};			//是否按住
DrillUp.g_COI_keys_pressedTime = {};		//第一次按住为true的持续时间（按下时开始计时）
DrillUp.g_COI_keys_releasedTime = {};		//第一次按住为false的持续时间（释放时开始计时）
DrillUp.g_COI_keys_doubleTime = {};			//第二次按住为true的持续时间（按下时开始计时）
for( var keyName in DrillUp.g_COI_keys ){
	DrillUp.g_COI_keys_pressed[keyName] = false;
	DrillUp.g_COI_keys_pressedTime[keyName] = undefined;
	DrillUp.g_COI_keys_releasedTime[keyName] = undefined;
	DrillUp.g_COI_keys_doubleTime[keyName] = undefined;
}
DrillUp.g_COI_keys_listenerTime = 0;		//自动打盹（键盘没任何操作时，停止帧刷新）
//==============================
// * 键盘监听 - 按下
//
//			说明：	> 继承自函数 Input._onKeyDown，原函数绑定了 dom 'keydown'。
//					> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_key_pressed = Input._onKeyDown;
Input._onKeyDown = function( event ){
	
	// > 遍历 键盘按键
	var keyCode = event.keyCode;
	for( var keyName in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys[keyName] == keyCode ){
			
			// > key被按下时，按住不为false，说明重复按下，立即清空时间判定
			if( DrillUp.g_COI_keys_pressed[keyName] == true ){
				DrillUp.g_COI_keys_pressedTime[keyName] = undefined;
				DrillUp.g_COI_keys_releasedTime[keyName] = undefined;
				DrillUp.g_COI_keys_doubleTime[keyName] = undefined;
			}
			
			// > key被按下时，记录 是否按住
			DrillUp.g_COI_keys_pressed[keyName] = true;
			
			// > key被按下时，第二次按住为true的持续时间
			if( DrillUp.g_COI_keys_pressedTime[keyName] != undefined &&
				DrillUp.g_COI_keys_pressedTime[keyName] >= 1 ){
				DrillUp.g_COI_keys_doubleTime[keyName] = 0;
			}
			
			// > key被按下时，第一次按住为true的持续时间
			DrillUp.g_COI_keys_pressedTime[keyName] = 0;
			
			
			// > key被按下时，刷新 自动打盹
			DrillUp.g_COI_keys_listenerTime = DrillUp.g_COI_keys_judgeTime + 5;
			break;
		}
	}
	
	// > 原函数
	_drill_COI_key_pressed.call(this,event);
}
//==============================
// * 键盘监听 - 释放
//
//			说明：	> 继承自函数 Input._onKeyUp，原函数绑定了 dom 'keyup'。
//					> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_key_released = Input._onKeyUp;
Input._onKeyUp = function( event ){
	
	// > 遍历 键盘按键
	var keyCode = event.keyCode;
	for( var keyName in DrillUp.g_COI_keys ){
		if( DrillUp.g_COI_keys[keyName] == keyCode ){
			
			// > key被释放时，记录 是否按住
			DrillUp.g_COI_keys_pressed[keyName] = false;
			
			// > key被释放时，第一次按住为false的持续时间
			DrillUp.g_COI_keys_releasedTime[keyName] = 0;
			
			
			// > key被释放时，刷新 自动打盹
			DrillUp.g_COI_keys_listenerTime = DrillUp.g_COI_keys_judgeTime + 5;
			break;
		}
	}
	
	// > 原函数
	_drill_COI_key_released.call(this,event);
}

//==============================
// * 键盘监听 - 帧刷新绑定
//==============================
var _drill_COI_key_update = Input.update;
Input.update = function(){
	_drill_COI_key_update.call(this);
	this.drill_COI_updateKeysAction();
}
//==============================
// * 键盘监听 - 帧刷新
//==============================
Input.drill_COI_updateKeysAction = function(){
	
	// > 自动打盹
	if( DrillUp.g_COI_keys_listenerTime <= 0 ){ return; }
	DrillUp.g_COI_keys_listenerTime -= 1;
	
	// > 遍历 键盘按键
	for( var keyName in DrillUp.g_COI_keys ){
		var isPressed = DrillUp.g_COI_keys_pressed[keyName];
		
		// > 时间+1
		if( DrillUp.g_COI_keys_pressedTime[keyName] != undefined && isPressed == true ){
			DrillUp.g_COI_keys_pressedTime[keyName] += 1;
		}
		if( DrillUp.g_COI_keys_releasedTime[keyName] != undefined && isPressed == false ){
			DrillUp.g_COI_keys_releasedTime[keyName] += 1;
		}
		if( DrillUp.g_COI_keys_doubleTime[keyName] != undefined ){
			DrillUp.g_COI_keys_doubleTime[keyName] += 1;
		}
		
		// > 释放时间超过一定值时，立即清空时间判定
		if( DrillUp.g_COI_keys_releasedTime[keyName] > DrillUp.g_COI_keys_judgeTime ){
			DrillUp.g_COI_keys_pressedTime[keyName] = undefined;
			DrillUp.g_COI_keys_releasedTime[keyName] = undefined;
			DrillUp.g_COI_keys_doubleTime[keyName] = undefined;
		}
	}
}
	

	

//=============================================================================
// ** ☆手柄
//		
//			类型：	类扩展用函数集
//			功能：	获取手柄按键数据。
//			
//			接口：	if( Input.drill_isPadPressed("LB") ){ }			// LB键按下[持续]
//					if( Input.drill_isPadTriggered("LB") ){ }		// LB键按下[一帧]
//					if( Input.drill_isPadReleased("LB") ){ }		// LB键释放[一帧]
//					if( Input.drill_isPadDoubled("LB") ){ }			// LB键双击[一帧]
//					
//					if( Input.drill_isPadPressed("RB") ){ }			// RB键按下[持续]
//					if( Input.drill_isPadTriggered("RB") ){ }		// RB键按下[一帧]
//					if( Input.drill_isPadReleased("RB") ){ }		// RB键释放[一帧]
//					if( Input.drill_isPadDoubled("RB") ){ }			// RB键双击[一帧]
//					
//					……												// ……
//					
//					if( Input.drill_isAnyPadTriggered() ){ }		// 任意键按下[一帧]
//					if( Input.drill_isAnyPadReleased() ){ }			// 任意键释放[一帧]
//					
//					
//					if( Input.drill_isPadPressed("LB", 0) ){ }		// 第一个手柄 LB键按下[持续]
//					if( Input.drill_isPadTriggered("LB", 0) ){ }	// 第一个手柄 LB键按下[一帧]
//					if( Input.drill_isPadReleased("LB", 0) ){ }		// 第一个手柄 LB键释放[一帧]
//					if( Input.drill_isPadDoubled("LB", 0) ){ }		// 第一个手柄 LB键双击[一帧]
//					
//					if( Input.drill_isPadPressed("RB", 1) ){ }		// 第二个手柄 RB键按下[持续]
//					if( Input.drill_isPadTriggered("RB", 1) ){ }	// 第二个手柄 RB键按下[一帧]
//					if( Input.drill_isPadReleased("RB", 1) ){ }		// 第二个手柄 RB键释放[一帧]
//					if( Input.drill_isPadDoubled("RB", 1) ){ }		// 第二个手柄 RB键双击[一帧]
//					
//					……												// ……
//					
//			说明：	> 上述的判定可以放在update帧刷新中进行持续判定。
//				  	> 可能会出现多个手柄连接情况，这里只考虑一个手柄情况。
//				  	> 输入的按键字符必须对应 DrillUp.g_COI_pads 中的键。
//					> 这里全为【物理按键】，如果要判断 逻辑按键 是否触发，去用原函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 手柄 - 物理按键
//==============================
DrillUp.g_COI_pads = {						//【手柄物理按键表】【全部大写】（Drill_OperateKeys也有一模一样的按键表）
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
	'按键上': 12,
	'按键下': 13,
	'按键左': 14,
	'按键右': 15,
	'左摇杆上': 101, '上': 101,	//（兼容旧插件只写"上"的情况）
	'左摇杆下': 102, '下': 102,
	'左摇杆左': 103, '左': 103,
	'左摇杆右': 104, '右': 104,
	'右摇杆上': 105,
	'右摇杆下': 106,
	'右摇杆左': 107,
	'右摇杆右': 108,
};

//##############################
// * 手柄 - 物理按键条件判定 - 手柄按下[持续]
//
//			参数：	> padName  字符串（按键名，见 手柄物理按键表）
//					> padIndex 数字（手柄索引，多个手柄时可指定索引，为空则用 主手柄）
//			返回：	> 布尔
//##############################
Input.drill_COI_isPadPressed = function( padName, padIndex ){
	if( padIndex == undefined ){
		padIndex = DrillUp.g_COI_pads_mainPadIndex;
	}
	return DrillUp.g_COI_pads_pressed[padIndex][ padName.toUpperCase() ] == true;
}
//##############################
// * 手柄 - 物理按键条件判定 - 手柄按下[一帧]
//
//			参数：	> padName 字符串（按键名，见 手柄物理按键表）
//					> padIndex 数字（手柄索引，多个手柄时可指定索引，为空则用 主手柄）
//			返回：	> 布尔
//##############################
Input.drill_COI_isPadTriggered = function( padName, padIndex ){
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	if( padIndex == undefined ){
		padIndex = DrillUp.g_COI_pads_mainPadIndex;
	}
	return (DrillUp.g_COI_pads_pressed[padIndex][ padName.toUpperCase() ] == true && 
			DrillUp.g_COI_pads_pressedTime[padIndex][ padName.toUpperCase() ] == 1 );
}
//##############################
// * 手柄 - 物理按键条件判定 - 手柄释放[一帧]
//
//			参数：	> padName 字符串（按键名，见 手柄物理按键表）
//					> padIndex 数字（手柄索引，多个手柄时可指定索引，为空则用 主手柄）
//			返回：	> 布尔
//##############################
Input.drill_COI_isPadReleased = function( padName, padIndex ){
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	if( padIndex == undefined ){
		padIndex = DrillUp.g_COI_pads_mainPadIndex;
	}
	return (DrillUp.g_COI_pads_pressed[padIndex][ padName.toUpperCase() ] == false && 
			DrillUp.g_COI_pads_releasedTime[padIndex][ padName.toUpperCase() ] == 1 );
}
//##############################
// * 手柄 - 物理按键条件判定 - 手柄双击[一帧]
//
//			参数：	> padName 字符串（按键名，见 手柄物理按键表）
//					> padIndex 数字（手柄索引，多个手柄时可指定索引，为空则用 主手柄）
//			返回：	> 布尔
//##############################
Input.drill_COI_isPadDoubled = function( padName, padIndex ){
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	if( padIndex == undefined ){
		padIndex = DrillUp.g_COI_pads_mainPadIndex;
	}
	return DrillUp.g_COI_pads_doubleTime[padIndex][ padName.toUpperCase() ] == 1  ;
}

//##############################
// * 手柄 - 物理按键条件判定 - 任意键按下[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Input.drill_COI_isAnyPadTriggered = function(){
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	var padIndex = DrillUp.g_COI_pads_mainPadIndex;
	for( var padName in DrillUp.g_COI_pads ){
		if( DrillUp.g_COI_pads_pressed[padIndex][padName] == true && 
			DrillUp.g_COI_pads_pressedTime[padIndex][padName] == 1 ){
			return true;
		}
	}
	return false;
}
//##############################
// * 手柄 - 物理按键条件判定 - 任意键释放[一帧]
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Input.drill_COI_isAnyPadReleased = function(){
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return false }
	var padIndex = DrillUp.g_COI_pads_mainPadIndex;
	for( var padName in DrillUp.g_COI_pads ){
		if( DrillUp.g_COI_pads_pressed[padIndex][padName] == false && 
			DrillUp.g_COI_pads_releasedTime[padIndex][padName] == 1 ){
			return true;
		}
	}
	return false;
}
//==============================
// * 手柄 - 相同函数兼容
//==============================
Input.drill_isPadPressed = Input.drill_COI_isPadPressed;
Input.drill_isPadTriggerd = Input.drill_COI_isPadTriggered;			//（错误拼写兼容）
Input.drill_isPadTriggered = Input.drill_COI_isPadTriggered;
Input.drill_isPadReleased = Input.drill_COI_isPadReleased;
Input.drill_isPadDoubled = Input.drill_COI_isPadDoubled;
Input.drill_isAnyPadTriggerd = Input.drill_COI_isAnyPadTriggered;	//（错误拼写兼容）
Input.drill_isAnyPadTriggered = Input.drill_COI_isAnyPadTriggered;
Input.drill_isAnyPadReleased = Input.drill_COI_isAnyPadReleased;


//=============================================================================
// ** ☆手柄监听
//			
//			说明：	> 此模块专门监听 手柄。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 手柄监听 - 监听初始化
//
//			说明：	> 手柄有4个连接口，多个手柄连接时，主手柄才能控制玩家。
//==============================
DrillUp.g_COI_pads_pressed = [];			//是否按住
DrillUp.g_COI_pads_pressedTime = [];		//第一次按住为true的持续时间（按下时开始计时）
DrillUp.g_COI_pads_releasedTime = [];		//第一次按住为false的持续时间（释放时开始计时）
DrillUp.g_COI_pads_doubleTime = [];			//第二次按住为true的持续时间（按下时开始计时）
for(var i = 0; i < 8; i++){					//（虽然默认都是4个手柄接口，但这里预留8个位置，防止出现意外）
	DrillUp.g_COI_pads_pressed[i] = {};
	DrillUp.g_COI_pads_pressedTime[i] = {};
	DrillUp.g_COI_pads_releasedTime[i] = {};
	DrillUp.g_COI_pads_doubleTime[i] = {};
	for( var padName in DrillUp.g_COI_pads ){
		DrillUp.g_COI_pads_pressed[i][padName] = false;
		DrillUp.g_COI_pads_pressedTime[i][padName] = undefined;
		DrillUp.g_COI_pads_releasedTime[i][padName] = undefined;
		DrillUp.g_COI_pads_doubleTime[i][padName] = undefined;
	}
}
DrillUp.g_COI_pads_mainPadIndex = 0;		//主手柄
DrillUp.g_COI_pads_listenerTime = 0;		//自动打盹（手柄没任何操作时，停止帧刷新）
//==============================
// * 手柄监听 - 帧刷新绑定
//
//			说明：	> 此处与原功能【独立】，只依附绑定。以提供 物理按键 的开放函数。
//==============================
var _drill_COI_pad_update = Input.update;
Input.update = function(){
	_drill_COI_pad_update.call(this);
	
    if( navigator.getGamepads == undefined ){ return; }
    if( navigator.getGamepads() == undefined ){ return; }
	
	this.drill_COI_updateMainPadIndex();	//帧刷新 - 选择主手柄
	this.drill_COI_updatePadsPress();		//帧刷新 - 手柄列表
	this.drill_COI_updatePadsAction();		//帧刷新 - 手柄按键时间
}
//==============================
// * 手柄监听 - 帧刷新 - 选择主手柄
//==============================
Input.drill_COI_updateMainPadIndex = function(){
	var gamepad_list = navigator.getGamepads();
	for( var i = 0; i < gamepad_list.length; i++ ){
		var gamepad = gamepad_list[i];
		if( gamepad && gamepad.connected ){
			if( gamepad.buttons.length >= 16 ){		//（只要键位数量>=16的设备，就算能用的手柄）
				DrillUp.g_COI_pads_mainPadIndex = i;
				break;
			}
		}
	}
}
//==============================
// * 手柄监听 - 帧刷新 - 手柄列表
//
//			说明：	> 此函数与 Input._pollGamepads 功能相似，但是为独立功能。
//==============================
Input.drill_COI_updatePadsPress = function(){
	var gamepad_list = navigator.getGamepads();
	for( var i = 0; i < gamepad_list.length; i++ ){
		var gamepad = gamepad_list[i];
		if( gamepad && gamepad.connected ){
			this.drill_COI_updateOneGamepad(gamepad);
		}
	}
}
//==============================
// * 手柄监听 - 帧刷新 - 手柄列表（单个手柄）
//
//			说明：	> 此函数与 Input._updateGamepadState 功能相似，但是为独立功能。
//==============================
Input.drill_COI_updateOneGamepad = function( gamepad ){
	var padIndex = gamepad.index;
	
	// > 手柄按钮（对应物理按键 0~15）
    var buttons = gamepad.buttons;
    for( var i = 0; i < buttons.length; i++ ){
        var isPressed = buttons[i].pressed;
		var padCode = i;
		
		if( isPressed == true ){
			for( var padName in DrillUp.g_COI_pads ){
				if( DrillUp.g_COI_pads[padName] == padCode ){	//（此处会遍历0~15的值，101~108的值捕获不到）
					this.drill_COI_updatePadDown( padIndex, padName );
					break;
				}
			}
			
			//（持续按住时，不要打盹）
			DrillUp.g_COI_pads_listenerTime = DrillUp.g_COI_pads_judgeTime + 5;
		}else{
			for( var padName in DrillUp.g_COI_pads ){
				if( DrillUp.g_COI_pads[padName] == padCode ){
					this.drill_COI_updatePadUp( padIndex, padName );
					break;
				}
			}
		}
    }
	
	// > 手柄摇杆（对应物理按键101~108，但这里101~108的值并没有被实际用到，但至少不会被上面的函数捕获）
    var axes = gamepad.axes;
    if( axes[1] < -0.5 ){		//'左摇杆上': 101
		this.drill_COI_updatePadDown( padIndex, "左摇杆上" );
		this.drill_COI_updatePadDown( padIndex, "上" );		//（兼容旧插件只写"上"的情况）
    }else{
		this.drill_COI_updatePadUp( padIndex, "左摇杆上" );
		this.drill_COI_updatePadUp( padIndex, "上" );
	}
	if( axes[1] > 0.5 ){		//'左摇杆下': 102
		this.drill_COI_updatePadDown( padIndex, "左摇杆下" );
		this.drill_COI_updatePadDown( padIndex, "下" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "左摇杆下" );
		this.drill_COI_updatePadUp( padIndex, "下" );
	}
    if( axes[0] < -0.5 ){		//'左摇杆左': 103
		this.drill_COI_updatePadDown( padIndex, "左摇杆左" );
		this.drill_COI_updatePadDown( padIndex, "左" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "左摇杆左" );
		this.drill_COI_updatePadUp( padIndex, "左" );
	}
	if( axes[0] > 0.5 ){		//'左摇杆右': 104
		this.drill_COI_updatePadDown( padIndex, "左摇杆右" );
		this.drill_COI_updatePadDown( padIndex, "右" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "左摇杆右" );
		this.drill_COI_updatePadUp( padIndex, "右" );
	}
    if( axes[3] < -0.5 ){		//'右摇杆上': 105
		this.drill_COI_updatePadDown( padIndex, "右摇杆上" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "右摇杆上" );
	}
	if( axes[3] > 0.5 ){		//'右摇杆下': 106
		this.drill_COI_updatePadDown( padIndex, "右摇杆下" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "右摇杆下" );
	}
    if( axes[2] < -0.5 ){		//'右摇杆左': 107
		this.drill_COI_updatePadDown( padIndex, "右摇杆左" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "右摇杆左" );
	}
	if( axes[2] > 0.5 ){		//'右摇杆右': 108
		this.drill_COI_updatePadDown( padIndex, "右摇杆右" );
    }else{
		this.drill_COI_updatePadUp( padIndex, "右摇杆右" );
	}
}
//==============================
// * 手柄监听 - 帧刷新 - 手柄列表（单个手柄） - 按下
//==============================
Input.drill_COI_updatePadDown = function( padIndex, padName ){
	
	// > 按住状态变化才往下执行
	if( DrillUp.g_COI_pads_pressed[padIndex][padName] == true ){ return; }
	
	
	// > pad被按下时，记录 是否按住
	DrillUp.g_COI_pads_pressed[padIndex][padName] = true;
	
	// > pad被按下时，第二次按住为true的持续时间
	if( DrillUp.g_COI_pads_pressedTime[padIndex][padName] != undefined &&
		DrillUp.g_COI_pads_pressedTime[padIndex][padName] >= 1 ){
		DrillUp.g_COI_pads_doubleTime[padIndex][padName] = 0;		//双击
	}
	
	// > pad被按下时，第一次按住为true的持续时间
	DrillUp.g_COI_pads_pressedTime[padIndex][padName] = 0;
	
	
	// > pad被按下时，刷新 自动打盹
	DrillUp.g_COI_pads_listenerTime = DrillUp.g_COI_pads_judgeTime + 5;
}
//==============================
// * 手柄监听 - 帧刷新 - 手柄列表（单个手柄） - 释放
//==============================
Input.drill_COI_updatePadUp = function( padIndex, padName ){
	
	// > 按住状态变化才往下执行
	if( DrillUp.g_COI_pads_pressed[padIndex][padName] == false ){ return; }
	
	
	// > pad被释放时，记录 是否按住
	DrillUp.g_COI_pads_pressed[padIndex][padName] = false;
	
	// > pad被释放时，第一次按住为false的持续时间
	DrillUp.g_COI_pads_releasedTime[padIndex][padName] = 0;
	
	
	// > pad被释放时，刷新 自动打盹
	DrillUp.g_COI_pads_listenerTime = DrillUp.g_COI_pads_judgeTime + 5;
}
//==============================
// * 手柄监听 - 帧刷新 - 手柄按键时间
//==============================
Input.drill_COI_updatePadsAction = function(){
	
	// > 自动打盹
	if( DrillUp.g_COI_pads_listenerTime <= 0 ){ return; }
	DrillUp.g_COI_pads_listenerTime -= 1;
	
	// > 遍历 手柄按键时间
	for(var i = 0; i < DrillUp.g_COI_pads_pressed.length; i++){
		for( var padName in DrillUp.g_COI_pads ){
			var isPressed = DrillUp.g_COI_pads_pressed[i][padName];
			
			// > 时间+1
			if( DrillUp.g_COI_pads_pressedTime[i][padName] != undefined && isPressed == true ){
				DrillUp.g_COI_pads_pressedTime[i][padName] += 1;
			}
			if( DrillUp.g_COI_pads_releasedTime[i][padName] != undefined && isPressed == false ){
				DrillUp.g_COI_pads_releasedTime[i][padName] += 1;
			}
			if( DrillUp.g_COI_pads_doubleTime[i][padName] != undefined ){
				DrillUp.g_COI_pads_doubleTime[i][padName] += 1;
			}
			
			// > 释放时间超过一定值时，清理参数
			if( DrillUp.g_COI_pads_releasedTime[i][padName] > DrillUp.g_COI_pads_judgeTime ){
				DrillUp.g_COI_pads_pressedTime[i][padName] = undefined;
				DrillUp.g_COI_pads_releasedTime[i][padName] = undefined;
				DrillUp.g_COI_pads_doubleTime[i][padName] = undefined;
			}
		}
	}
}

//==============================
// * 手柄监听 - 打印当前手柄信息
//
//			说明：	> 此函数与手柄各参数无关，通过插件指令直接输出手柄信息。
//==============================
Input.drill_COI_getPadInfo = function(){
	var text = "【" + DrillUp.g_COI_PluginTip_curName + "】\n";
	
    if( navigator.getGamepads ){
        var gamepads = navigator.getGamepads();
        if( gamepads ){
			if( gamepads.length > 0 ){
				for( var i = 0; i < gamepads.length; i++ ){
					text += "【" + String(i+1) + "号位】："
					var gamepad = gamepads[i];
					if( gamepad && gamepad.connected ){
						if( gamepad.buttons.length >= 16 ){		//（只要键位数量>=16的设备，就算能用的手柄）
							text += "（手柄设备）";
						}else{
							text += "（未知设备）";
						}
						text += "\n    索引:";
						text += gamepad.index;
						text += "\n    标识:";
						text += gamepad.id;
						text += "\n    按钮数量:";
						text += gamepad.buttons.length;
						text += "\n    摇杆键数:";
						text += gamepad.axes.length;
					}else{
						text += "（未连接）";
					}
					text += "\n";
				}
			}else{
				text += "无法获取手柄管理器，navigator.getGamepads函数返回空数组。";
			}
        }else{
			text += "无法获取手柄管理器，navigator.getGamepads函数返回null值。";
		}
    }else{
		text += "无法获取手柄管理器，navigator.getGamepads未定义。";
	}
	return text;
}




//=============================================================================
// ** 鼠标DEBUG窗口【Drill_COI_MouseDebugWindow】
//			
//			作用域：	地图界面、战斗界面、菜单界面
//			主功能：	定义一个窗口，用于描述 鼠标设备 的内容信息。
//			子功能：	->设备绑定
//						->内容显示
//						
//			说明：	> 临时的调试窗口。
//=============================================================================
//==============================
// * 鼠标DEBUG窗口 - 定义
//==============================
function Drill_COI_MouseDebugWindow() {
    this.initialize.apply(this, arguments);
};
Drill_COI_MouseDebugWindow.prototype = Object.create(Window_Base.prototype);
Drill_COI_MouseDebugWindow.prototype.constructor = Drill_COI_MouseDebugWindow;
//==============================
// * 鼠标DEBUG窗口 - 初始化
//==============================
Drill_COI_MouseDebugWindow.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - 400, 8, 400, 160);	//（固定矩形范围）
	this.drill_window_initChild();		//初始化子功能
};
//==============================
// * 鼠标DEBUG窗口 - 帧刷新
//==============================
Drill_COI_MouseDebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_window_updateContext();	//帧刷新 - 内容
};
//==============================
// * 鼠标DEBUG窗口 - 窗口属性
//==============================
Drill_COI_MouseDebugWindow.prototype.lineHeight = function(){ return 18; };
Drill_COI_MouseDebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * 鼠标DEBUG窗口 - 初始化子功能
//==============================
Drill_COI_MouseDebugWindow.prototype.drill_window_initChild = function() {
	
	// > 上一次内容
	this._drill_lastContext = "";
	
	// > 图片层级
	this.zIndex = 999;
	
	// > 窗口内容刷新
    this.contents.clear();
	this.createContents();
};
//==============================
// * 鼠标DEBUG窗口 - 帧刷新内容
//==============================
Drill_COI_MouseDebugWindow.prototype.drill_window_updateContext = function() {
	
	var mouse_pos = TouchInput.drill_COI_getMousePos_WithOutside();
	var mouse_tilePos = TouchInput.drill_COI_getMousePos_Tile();
	
	// > 内容设置
	var context = "";
	context += "\\c[24]鼠标物理按键：\\c[0]";
	context += (TouchInput.drill_isLeftPressed() ? "\\c[6]" : "\\c[7]");
	context += "  左键\\c[0]  ";
	context += (TouchInput.drill_isMiddlePressed() ? "\\c[6]" : "\\c[7]");
	context += "  中键\\c[0]  ";
	context += (TouchInput.drill_isRightPressed() ? "\\c[6]" : "\\c[7]");
	context += "  右键\\c[0]  ";
	context += "\n";
	context += "　　　　　　　";
	context += (TouchInput.drill_isWheelUp() ? "\\c[6]" : "\\c[7]");
	context += "  上滚轮\\c[0]  ";
	context += (TouchInput.drill_isWheelDown() ? "\\c[6]" : "\\c[7]");
	context += "  下滚轮\\c[0]  ";
	context += "\n";
	context += "\\c[0]（按键后会变为亮黄色。注意物理按键与改键无关）";
	context += "\n";
	context += "\\c[24]鼠标位置：\\c[0]（" + mouse_pos['x'] + "," + mouse_pos['y'] + "）";
	if( TouchInput.drill_COI_isMousePosInOutside() == true ){
		context += "出界";
	}else{
		if( TouchInput.drill_COI_isMousePosInOverstoryLayer() == true ){
			context += "天窗层区域";
		}else{
			context += "游戏区域";
		}
	}
	context += "\n";
	context += "\\c[24]鼠标图块位置：\\c[0]（" + mouse_tilePos['x'] + "," + mouse_tilePos['y'] + "）";
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
// ** 键盘DEBUG窗口【Drill_COI_KeyboardDebugWindow】
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
function Drill_COI_KeyboardDebugWindow() {
    this.initialize.apply(this, arguments);
};
Drill_COI_KeyboardDebugWindow.prototype = Object.create(Window_Base.prototype);
Drill_COI_KeyboardDebugWindow.prototype.constructor = Drill_COI_KeyboardDebugWindow;
//==============================
// * 键盘DEBUG窗口 - 初始化
//==============================
Drill_COI_KeyboardDebugWindow.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - 816, 8, 816, 305);	//（固定矩形范围）
	this.drill_window_initChild();		//初始化子功能
};
//==============================
// * 键盘DEBUG窗口 - 帧刷新
//==============================
Drill_COI_KeyboardDebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_window_updateContext();	//帧刷新 - 内容
};
//==============================
// * 键盘DEBUG窗口 - 窗口属性
//==============================
Drill_COI_KeyboardDebugWindow.prototype.lineHeight = function(){ return 18; };
Drill_COI_KeyboardDebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * 键盘DEBUG窗口 - 初始化子功能
//==============================
Drill_COI_KeyboardDebugWindow.prototype.drill_window_initChild = function() {
	
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
Drill_COI_KeyboardDebugWindow.prototype.drill_window_updateContext = function() {
	
	var mouse_pos = TouchInput.drill_COI_getMousePos_WithOutside();
	var mouse_tilePos = TouchInput.drill_COI_getMousePos_Tile();
	
	// > 内容设置
	var context = "";
	context += "\\c[24]键盘物理按键：\\c[7]";
	context += "\n\\c[7]";
	context += (Input.drill_isKeyPressed('ESC') ? "\\c[6]" : "");
	context += " ESC ";
	context += (Input.drill_isKeyPressed('ESC') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F1') ? "\\c[6]" : "");
	context += " F1 ";
	context += (Input.drill_isKeyPressed('F1') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F2') ? "\\c[6]" : "");
	context += " F2 ";
	context += (Input.drill_isKeyPressed('F2') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F3') ? "\\c[6]" : "");
	context += " F3 ";
	context += (Input.drill_isKeyPressed('F3') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F4') ? "\\c[6]" : "");
	context += " F4 ";
	context += (Input.drill_isKeyPressed('F4') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F5') ? "\\c[6]" : "");
	context += " F5 ";
	context += (Input.drill_isKeyPressed('F5') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F6') ? "\\c[6]" : "");
	context += " F6 ";
	context += (Input.drill_isKeyPressed('F6') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F7') ? "\\c[6]" : "");
	context += " F7 ";
	context += (Input.drill_isKeyPressed('F7') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F8') ? "\\c[6]" : "");
	context += " F8 ";
	context += (Input.drill_isKeyPressed('F8') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F9') ? "\\c[6]" : "");
	context += " F9 ";
	context += (Input.drill_isKeyPressed('F9') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F10') ? "\\c[6]" : "");
	context += " F10 ";
	context += (Input.drill_isKeyPressed('F10') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F11') ? "\\c[6]" : "");
	context += " F11 ";
	context += (Input.drill_isKeyPressed('F11') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F12') ? "\\c[6]" : "");
	context += " F12 ";
	context += (Input.drill_isKeyPressed('F12') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('~') ? "\\c[6]" : "");
	context += " ~ ";
	context += (Input.drill_isKeyPressed('~') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('1') ? "\\c[6]" : "");
	context += " 1 ";
	context += (Input.drill_isKeyPressed('1') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('2') ? "\\c[6]" : "");
	context += " 2 ";
	context += (Input.drill_isKeyPressed('2') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('3') ? "\\c[6]" : "");
	context += " 3 ";
	context += (Input.drill_isKeyPressed('3') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('4') ? "\\c[6]" : "");
	context += " 4 ";
	context += (Input.drill_isKeyPressed('4') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('5') ? "\\c[6]" : "");
	context += " 5 ";
	context += (Input.drill_isKeyPressed('5') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('6') ? "\\c[6]" : "");
	context += " 6 ";
	context += (Input.drill_isKeyPressed('6') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('7') ? "\\c[6]" : "");
	context += " 7 ";
	context += (Input.drill_isKeyPressed('7') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('8') ? "\\c[6]" : "");
	context += " 8 ";
	context += (Input.drill_isKeyPressed('8') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('9') ? "\\c[6]" : "");
	context += " 9 ";
	context += (Input.drill_isKeyPressed('9') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('0') ? "\\c[6]" : "");
	context += " 0 ";
	context += (Input.drill_isKeyPressed('0') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('-') ? "\\c[6]" : "");
	context += " - ";
	context += (Input.drill_isKeyPressed('-') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('=') ? "\\c[6]" : "");
	context += " = ";
	context += (Input.drill_isKeyPressed('=') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('BACKSPACE') ? "\\c[6]" : "");
	context += " BACKSPACE ";
	context += (Input.drill_isKeyPressed('BACKSPACE') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('TAB') ? "\\c[6]" : "");
	context += " TAB ";
	context += (Input.drill_isKeyPressed('TAB') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('Q') ? "\\c[6]" : "");
	context += " Q ";
	context += (Input.drill_isKeyPressed('Q') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('W') ? "\\c[6]" : "");
	context += " W ";
	context += (Input.drill_isKeyPressed('W') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('E') ? "\\c[6]" : "");
	context += " E ";
	context += (Input.drill_isKeyPressed('E') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('R') ? "\\c[6]" : "");
	context += " R ";
	context += (Input.drill_isKeyPressed('R') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('T') ? "\\c[6]" : "");
	context += " T ";
	context += (Input.drill_isKeyPressed('T') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('Y') ? "\\c[6]" : "");
	context += " Y ";
	context += (Input.drill_isKeyPressed('Y') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('U') ? "\\c[6]" : "");
	context += " U ";
	context += (Input.drill_isKeyPressed('U') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('I') ? "\\c[6]" : "");
	context += " I ";
	context += (Input.drill_isKeyPressed('I') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('O') ? "\\c[6]" : "");
	context += " O ";
	context += (Input.drill_isKeyPressed('O') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('P') ? "\\c[6]" : "");
	context += " P ";
	context += (Input.drill_isKeyPressed('P') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('[') ? "\\c[6]" : "");
	context += " [ ";
	context += (Input.drill_isKeyPressed('[') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed(']') ? "\\c[6]" : "");
	context += " ] ";
	context += (Input.drill_isKeyPressed(']') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('\\') ? "\\c[6]" : "");
	context += " \\\\ ";
	context += (Input.drill_isKeyPressed('\\') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('A') ? "\\c[6]" : "");
	context += " A ";
	context += (Input.drill_isKeyPressed('A') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('S') ? "\\c[6]" : "");
	context += " S ";
	context += (Input.drill_isKeyPressed('S') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('D') ? "\\c[6]" : "");
	context += " D ";
	context += (Input.drill_isKeyPressed('D') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('F') ? "\\c[6]" : "");
	context += " F ";
	context += (Input.drill_isKeyPressed('F') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('G') ? "\\c[6]" : "");
	context += " G ";
	context += (Input.drill_isKeyPressed('G') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('H') ? "\\c[6]" : "");
	context += " H ";
	context += (Input.drill_isKeyPressed('H') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('J') ? "\\c[6]" : "");
	context += " J ";
	context += (Input.drill_isKeyPressed('J') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('K') ? "\\c[6]" : "");
	context += " K ";
	context += (Input.drill_isKeyPressed('K') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('L') ? "\\c[6]" : "");
	context += " L ";
	context += (Input.drill_isKeyPressed('L') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed(';') ? "\\c[6]" : "");
	context += " ; ";
	context += (Input.drill_isKeyPressed(';') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed("'") ? "\\c[6]" : "");
	context += " ' ";
	context += (Input.drill_isKeyPressed("'") ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('SHIFT') ? "\\c[6]" : "");
	context += " SHIFT ";
	context += (Input.drill_isKeyPressed('SHIFT') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('Z') ? "\\c[6]" : "");
	context += " Z ";
	context += (Input.drill_isKeyPressed('Z') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('X') ? "\\c[6]" : "");
	context += " X ";
	context += (Input.drill_isKeyPressed('X') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('C') ? "\\c[6]" : "");
	context += " C ";
	context += (Input.drill_isKeyPressed('C') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('V') ? "\\c[6]" : "");
	context += " V ";
	context += (Input.drill_isKeyPressed('V') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('B') ? "\\c[6]" : "");
	context += " B ";
	context += (Input.drill_isKeyPressed('B') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('N') ? "\\c[6]" : "");
	context += " N ";
	context += (Input.drill_isKeyPressed('N') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('M') ? "\\c[6]" : "");
	context += " M ";
	context += (Input.drill_isKeyPressed('M') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed(',') ? "\\c[6]" : "");
	context += " , ";
	context += (Input.drill_isKeyPressed(',') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('.') ? "\\c[6]" : "");
	context += " . ";
	context += (Input.drill_isKeyPressed('.') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('/') ? "\\c[6]" : "");
	context += " / ";
	context += (Input.drill_isKeyPressed('/') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('CTRL') ? "\\c[6]" : "");
	context += " CTRL ";
	context += (Input.drill_isKeyPressed('CTRL') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('ALT') ? "\\c[6]" : "");
	context += " ALT ";
	context += (Input.drill_isKeyPressed('ALT') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('上') ? "\\c[6]" : "");
	context += " 上 ";
	context += (Input.drill_isKeyPressed('上') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('下') ? "\\c[6]" : "");
	context += " 下 ";
	context += (Input.drill_isKeyPressed('下') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('左') ? "\\c[6]" : "");
	context += " 左 ";
	context += (Input.drill_isKeyPressed('左') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('右') ? "\\c[6]" : "");
	context += " 右 ";
	context += (Input.drill_isKeyPressed('右') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('空格') ? "\\c[6]" : "");
	context += " 空格 ";
	context += (Input.drill_isKeyPressed('空格') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('ENTER') ? "\\c[6]" : "");
	context += " ENTER ";
	context += (Input.drill_isKeyPressed('ENTER') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('PAGEUP') ? "\\c[6]" : "");
	context += " PAGEUP ";
	context += (Input.drill_isKeyPressed('PAGEUP') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('PAGEDOWN') ? "\\c[6]" : "");
	context += " PAGEDOWN ";
	context += (Input.drill_isKeyPressed('PAGEDOWN') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('END') ? "\\c[6]" : "");
	context += " END ";
	context += (Input.drill_isKeyPressed('END') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('HOME') ? "\\c[6]" : "");
	context += " HOME ";
	context += (Input.drill_isKeyPressed('HOME') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('INSERT') ? "\\c[6]" : "");
	context += " INSERT ";
	context += (Input.drill_isKeyPressed('INSERT') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('DELETE') ? "\\c[6]" : "");
	context += " DELETE ";
	context += (Input.drill_isKeyPressed('DELETE') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	
	context += (Input.drill_isKeyPressed('NUM0') ? "\\c[6]" : "");
	context += " NUM0 ";
	context += (Input.drill_isKeyPressed('NUM0') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM1') ? "\\c[6]" : "");
	context += " NUM1 ";
	context += (Input.drill_isKeyPressed('NUM1') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM2') ? "\\c[6]" : "");
	context += " NUM2 ";
	context += (Input.drill_isKeyPressed('NUM2') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM3') ? "\\c[6]" : "");
	context += " NUM3 ";
	context += (Input.drill_isKeyPressed('NUM3') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM4') ? "\\c[6]" : "");
	context += " NUM4 ";
	context += (Input.drill_isKeyPressed('NUM4') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM5') ? "\\c[6]" : "");
	context += " NUM5 ";
	context += (Input.drill_isKeyPressed('NUM5') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM6') ? "\\c[6]" : "");
	context += " NUM6 ";
	context += (Input.drill_isKeyPressed('NUM6') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM7') ? "\\c[6]" : "");
	context += " NUM7 ";
	context += (Input.drill_isKeyPressed('NUM7') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM8') ? "\\c[6]" : "");
	context += " NUM8 ";
	context += (Input.drill_isKeyPressed('NUM8') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM9') ? "\\c[6]" : "");
	context += " NUM9 ";
	context += (Input.drill_isKeyPressed('NUM9') ? "\\c[7]" : "");
	context += "\n\\c[7]";
	context += (Input.drill_isKeyPressed('NUM*') ? "\\c[6]" : "");
	context += " NUM* ";
	context += (Input.drill_isKeyPressed('NUM*') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM+') ? "\\c[6]" : "");
	context += " NUM+ ";
	context += (Input.drill_isKeyPressed('NUM+') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUMENTER') ? "\\c[6]" : "");
	context += " NUMENTER ";
	context += (Input.drill_isKeyPressed('NUMENTER') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM-') ? "\\c[6]" : "");
	context += " NUM- ";
	context += (Input.drill_isKeyPressed('NUM-') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM.') ? "\\c[6]" : "");
	context += " NUM. ";
	context += (Input.drill_isKeyPressed('NUM.') ? "\\c[7]" : "");
	context += (Input.drill_isKeyPressed('NUM/') ? "\\c[6]" : "");
	context += " NUM/ ";
	context += (Input.drill_isKeyPressed('NUM/') ? "\\c[7]" : "");
	context += "\n";
	context += "\\c[0]（按键后会变为亮黄色。注意物理按键与改键无关）";
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
// ** 手柄DEBUG窗口【Drill_COI_PadDebugWindow】
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
function Drill_COI_PadDebugWindow() {
    this.initialize.apply(this, arguments);
};
Drill_COI_PadDebugWindow.prototype = Object.create(Window_Base.prototype);
Drill_COI_PadDebugWindow.prototype.constructor = Drill_COI_PadDebugWindow;
//==============================
// * 手柄DEBUG窗口 - 初始化
//==============================
Drill_COI_PadDebugWindow.prototype.initialize = function( padIndex ){
	var xx = Graphics.boxWidth-404;
	var yy = 4;
	if( padIndex == 0 ){ xx = 4; yy = 4; }
	if( padIndex == 1 ){ xx = Graphics.boxWidth-404; yy = 4; }
	if( padIndex == 2 ){ xx = 4; yy = 258; }
	if( padIndex == 3 ){ xx = Graphics.boxWidth-404; yy = 258; }
	if( padIndex == undefined ){ padIndex = DrillUp.g_COI_pads_mainPadIndex; }
	this._drill_COI_padIndex = padIndex;
	
    Window_Base.prototype.initialize.call(this, xx, yy, 400, 250);	//（固定矩形范围）
	
	this.drill_window_initChild();		//初始化子功能
};
//==============================
// * 手柄DEBUG窗口 - 帧刷新
//==============================
Drill_COI_PadDebugWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_window_updateContext();	//帧刷新 - 内容
};
//==============================
// * 手柄DEBUG窗口 - 窗口属性
//==============================
Drill_COI_PadDebugWindow.prototype.lineHeight = function(){ return 18; };
Drill_COI_PadDebugWindow.prototype.standardFontSize = function(){ return 16; };
//==============================
// * 手柄DEBUG窗口 - 初始化子功能
//==============================
Drill_COI_PadDebugWindow.prototype.drill_window_initChild = function() {
	
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
Drill_COI_PadDebugWindow.prototype.drill_window_updateContext = function() {
	var padIndex = this._drill_COI_padIndex;
	
	// > 内容设置
	var context = "";
	context += "\\c[24]手柄物理按键：\\c[0]";
	context += "【" + String(padIndex+1) + "号位】";
	if( padIndex == DrillUp.g_COI_pads_mainPadIndex ){
		context += "【主手柄】";
	}
	context += "\n";
	
	// > 状态检查
	var is_available = false;
    if( navigator.getGamepads ){
        var gamepad_list = navigator.getGamepads();
        if( gamepad_list ){
			if( gamepad_list.length > 0 ){
		
				var gamepad = gamepad_list[ padIndex ];
				if( gamepad && gamepad.connected ){
					if( gamepad.buttons.length >= 16 ){		//（只要键位数量>=16的设备，就算能用的手柄）
						context += "（手柄设备）" + gamepad.id + "\n";
						is_available = true;
					}else{
						context += "（未知设备）" + gamepad.id + "\n";
					}
				}else{
					context += "\\c[7]（未连接）\\c[0]\n";
				}
			}else{
				context += "无法获取手柄管理器，\n navigator.getGamepads函数返回空数组。\n";
			}
		}else{
			context += "无法获取手柄管理器，\n navigator.getGamepads函数返回null值。\n";
		}
	}else{
		context += "无法获取手柄管理器，\n navigator.getGamepads未定义。\n";
	}
	
	if( is_available == true ){
		context += (Input.drill_isPadPressed('A',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  A  ";
		context += (Input.drill_isPadPressed('B',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  B  ";
		context += (Input.drill_isPadPressed('X',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  X  ";
		context += (Input.drill_isPadPressed('Y',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  Y  ";
		context += (Input.drill_isPadPressed('LB',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  LB  ";
		context += (Input.drill_isPadPressed('RB',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  RB  ";
		context += (Input.drill_isPadPressed('LT',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  LT  ";
		context += (Input.drill_isPadPressed('RT',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  RT  ";
		context += "\n";
		context += (Input.drill_isPadPressed('SELECT',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  SELECT  ";
		context += (Input.drill_isPadPressed('START',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  START  ";
		context += "\n";
		context += (Input.drill_isPadPressed('左摇杆按键',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  左摇杆按键  ";
		context += (Input.drill_isPadPressed('右摇杆按键',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  右摇杆按键  ";
		context += "\n";
		context += (Input.drill_isPadPressed('按键上',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  按键上  ";
		context += (Input.drill_isPadPressed('按键下',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  按键下  ";
		context += (Input.drill_isPadPressed('按键左',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  按键左  ";
		context += (Input.drill_isPadPressed('按键右',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  按键右  ";
		context += "\n";
		context += (Input.drill_isPadPressed('左摇杆上',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  左摇杆上  ";
		context += (Input.drill_isPadPressed('左摇杆下',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  左摇杆下  ";
		context += (Input.drill_isPadPressed('左摇杆左',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  左摇杆左  ";
		context += (Input.drill_isPadPressed('左摇杆右',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  左摇杆右  ";
		context += "\n";
		context += (Input.drill_isPadPressed('右摇杆上',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  右摇杆上  ";
		context += (Input.drill_isPadPressed('右摇杆下',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  右摇杆下  ";
		context += (Input.drill_isPadPressed('右摇杆左',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  右摇杆左  ";
		context += (Input.drill_isPadPressed('右摇杆右',padIndex) ? "\\c[6]" : "\\c[7]");
		context += "  右摇杆右  ";
		context += "\n";
		context += "\\c[0]（按键后会变为亮黄色。注意物理按键与改键无关）";
		context += "\n";
	}
	
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
	
