//=============================================================================
// Drill_CoreOfWindowCharacter.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        窗口字符 - 窗口字符核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfWindowCharacter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 给各 子插件 提供基本的窗口字符功能定义，并且自带一些基本的窗口字符。
 * ★★必须基于 窗口辅助核心 插件★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件，才能运行，并作用于其他子插件。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary      系统-窗口辅助核心★★v1.9及以上★★
 *     需要该核心才能获取到具体字符的宽度。
 * 可作用于：
 *   - Drill_DialogTextAlign            窗口字符-文本居中
 *   - Drill_DialogCharContinuedEffect  窗口字符-字符块持续动作效果
 *   - Drill_DialogCharOuterGlow        窗口字符-外发光效果
 *   - Drill_DialogCharOuterGlow        窗口字符-描边效果
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 窗口字符：
 *   (1.窗口字符指绘制在窗口中的字符。窗口字符分为下面三种：
 *      指代字符：指在窗口中显示时，会被替换成特定字符串的字符。
 *      效果字符：指在窗口中显示时，执行特定效果切换的字符。
 *      消息输入字符：指控制对话框消息显示、停顿等操作的字符。
 *   (2.窗口字符块：指多个窗口字符组合的结构。
 *      比如"\dCOWCfv[某文字]"表示将三个字符作为一个字符块来执行
 *      反转效果。如果你想让三个字符分别执行左右反转，这样写：
 *      "\dCOWCfv[某]\dCOWCfv[文]\dCOWCfv[字]"
 * 表达式：
 *   (1.表达式是一种优先级更高的指代字符。
 *      也就是说，表达式会最先被替换成其他字符串。
 * 自动换行：
 *   (1.插件可以添加<WordWrap>表达式来实现窗口内所有字符自动换行。
 *      自动换行支持所有 窗口字符 的换行，包括跳动的效果字符。
 *   (2.如果在自动换行中，需要强制换行，添加表达式<br>即可。
 * 细节：
 *   (1.窗口字符的转换/生效顺序如下：
 *      表达式 > 指代字符 > 效果字符 > 消息输入字符
 *   (2.该插件是后期许多子插件使用 窗口字符 的基础核心，覆盖了很多底层。
 *      不建议使用其它操作 窗口字符 相关的插件，可能会产生冲突。
 * 快进键：
 *   (1.该插件支持快进键的设置，按快进键时，能够快速跳过对话框中的对话。
 * 设计：
 *   (1.窗口字符核心提供了非常多的指代字符和效果字符。
 *      详细介绍可以去 对话管理层 看看围成一圈的小爱丽丝的对话演示。
 *   (2.一般的窗口字符中可以嵌套指代字符，比如"\c[\v[21]]"。
 *      这是因为 指代字符\v[21] 会先转成数字，再进行\c[]的效果。
 *      但是注意，效果字符一般都不能嵌套。
 *      比如 翻转字符的功能"\dCOWCfv[\c[2]某文字]"，这种写法无效。
 *      必须分开写："\c[2]\dCOWCfv[某文字]"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 默认字符
 * 游戏中默认支持下列字符（不需要插件也可以用）：
 * 
 * 窗口字符：\v[n]        替换为第n个变量的值（0002变量，输入2，不要多余0）
 * 窗口字符：\n[n]        替换为第n个角色的名字
 * 窗口字符：\p[n]        替换为第n个队伍成员的名字(1表示领队,2表示第一个跟随者)
 * 窗口字符：\G           替换为货币单位（ 数据库>系统 中设置单位）
 * 窗口字符：\\           替换为'\'反斜杠字符本身。
 * 
 * 窗口字符：\c[n]        之后文字使用第n个颜色（默认颜色0-31，可扩展高级颜色）
 * 窗口字符：\i[n]        绘制第n个图标
 * 窗口字符：\{           将字体放大一级
 * 窗口字符：\}           将字体缩小一级
 * 窗口字符：\$           打开金钱窗口(对话中右上角出现一个金钱窗口,结束对话消失)
 * 
 * 窗口字符：\.           对话框中等待 15 帧，四分之一秒
 * 窗口字符：\|           对话框中等待 60 帧，一秒
 * 窗口字符：\!           对话框中等待按键输入
 * 窗口字符：\>           对话框中立刻显示后面文字（一行内）
 * 窗口字符：\<           对话框中取消立刻显示
 * 窗口字符：\^           对话框中显示文本后不等待输入
 * 
 * 1.上述都是默认游戏中自带的字符，分为三种：
 *   指代字符：指在窗口中显示时，会被替换成特定字符串的字符。
 *   效果字符：指在窗口中显示时，执行特定效果切换的字符。
 *   消息输入字符：指控制对话框消息显示、停顿等操作的字符。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 可用窗口字符
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\ac[n]       替换为第n个角色的职业名
 * 窗口字符：\an[n]       替换为第n个角色的昵称（小名）
 * 窗口字符：\pc[n]       替换为第n个队伍成员的职业名
 * 窗口字符：\pn[n]       替换为第n个队伍成员的昵称（小名）
 * 窗口字符：\nc[n]       替换为第n个职业的名字
 * 窗口字符：\ni[n]       替换为第n个物品的名字
 * 窗口字符：\nw[n]       替换为第n个武器的名字
 * 窗口字符：\na[n]       替换为第n个防具的名字
 * 窗口字符：\ns[n]       替换为第n个技能的名字
 * 窗口字符：\nt[n]       替换为第n个状态的名字
 * 窗口字符：\ii[n]       替换为第n个物品的名字 + 图标
 * 窗口字符：\iw[n]       替换为第n个武器的名字 + 图标
 * 窗口字符：\ia[n]       替换为第n个防具的名字 + 图标
 * 窗口字符：\is[n]       替换为第n个技能的名字 + 图标
 * 窗口字符：\it[n]       替换为第n个状态的名字 + 图标
 * 
 * 窗口字符：\fr          重设之后文字的字体为默认。
 * 窗口字符：\fb          之后的文字字体加粗。（如果要还原，就加 \fr ）
 * 窗口字符：\fi          之后的文字字体倾斜。（如果要还原，就加 \fr ）
 * 窗口字符：\fs[n]       指定之后的文字字体大小为n。
 * 窗口字符：\px[n]       设置当前字符光标偏移的x值，单位像素。
 * 窗口字符：\py[n]       设置当前字符光标偏移的y值，单位像素。
 * 窗口字符：\af[n]       该字符把对话框脸图 换成第n个角色脸图。    (只对话框有效)
 * 窗口字符：\pf[n]       该字符把对话框脸图 换成第n个队伍成员脸图。(只对话框有效)
 * 
 * 窗口字符：\w[n]        对话框中等待 n 帧。
 * 
 * 1.上述为插件提供的窗口字符，分为三种：
 *   指代字符：指在窗口中显示时，会被替换成特定字符串的字符。
 *   效果字符：指在窗口中显示时，执行特定效果切换的字符。
 *   消息输入字符：指控制对话框消息显示、停顿等操作的字符。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 字符块
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\dCOWCf[某文字]
 * 窗口字符：\dCOWC[字符块:文本[某文字]]
 * 
 * 1."\dCOWCf[某文字]"表示"某文字" 作为一个字符块显示，
 *   与"\dCOWC[字符块:文本[某文字]]"的指令意思一样，只是前者是简写。
 * 2.字符块 常用于在文本变色时、消息输入时，将多个字符作为一个整体显示。
 *   反转字符、子插件的跳动字符，都基于字符块。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 翻转字符
 * 使用该插件后，你可以使用下列窗口字符：
 * （注意，冒号之间没有空格，并且是英文冒号。）
 * 
 * 窗口字符：\dCOWCfv[某文字]
 * 窗口字符：\dCOWCfh[某文字]
 * 窗口字符：\dCOWC[横向翻转:文本[某文字]]
 * 窗口字符：\dCOWC[纵向翻转:文本[某文字]]
 * 
 * 1."\dCOWCfv[某文字]"表示内部的文字 横向翻转，
 *   与"\dCOWC[横向翻转:文本[某文字]]"的指令意思一样，只是前者是简写。
 * 2.如果你要每个字的单独翻转，则需要写很多窗口字符，如下：
 *   "\dCOWCfv[某]\dCOWCfv[文]\dCOWCfv[字]"
 * 3.注意，该指令的内部文本不能嵌套其他窗口字符，因为嵌套的效果不会叠加。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 表达式
 * 该插件提供一些简单的表达式，如下：
 * （注意，冒号之间没有空格，并且是英文冒号。）
 * 
 * 窗口字符：<复制:2:文字>
 * 窗口字符：<复制:\v[21]:文字>
 *
 * 窗口字符：<单选:21:结果A:结果B>
 * 
 * 1.上述表达式，仅在 信息面板A 系列子插件 中有效。
 * 2."复制"的中间填2，表示内容复制2个，
 *   比如，"ii<复制:2:aaa>ii" = "iiaaaaaaii"
 * 3."复制"的中间填\v[21]变量，表示根据变量值，复制指定变量的数量。
 *   比如"<复制:\v[21]:#>"，#号将会被复制变量21的值的数量。
 * 4."单选"的数字表示开关id，
 *   如果开关为on，则会输出结果A，如果开关为off，则输出结果B。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 分割线
 * 子插件的部分窗口中支持一些简单的表达式，如下：
 * （注意，冒号之间没有空格，并且是英文冒号。）
 *
 * 窗口字符：\dCOWCsep[颜色[1]:厚度[2]]
 * 
 * 5."\dCOWCsep"表示分割线，中间的数字表示颜色数字，后面的数字表示分隔线厚度。
 *   比如"<分隔:0:1>"，整行会变成一条厚度为1，颜色为0（白色）的分隔线。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自动换行
 * 该插件提供自动换行的表达式，如下：
 * 
 * 窗口字符：<WordWrap>
 * 窗口字符：<br>
 * 
 * 1.设置<WordWrap>后，该窗口的文本将会去除所有换行符，并根据窗口宽度自动换行。
 *   如果你需要在自动换行基础上强制换行，添加<br>即可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 快进键
 * 你可以使用下列插件指令：
 * 
 * 插件指令：>窗口字符核心 : 启用快进键
 * 插件指令：>窗口字符核心 : 关闭快进键
 * 
 * 1.快进键按下后，对话框的文本显示速度转为瞬间显示，能够跳过非常多的文本剧情。
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在绘制窗口字符时才会工作，绘制过程产生的消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化字符外框厚度为0时，不绘制外框的功能。
 * 优化了部分参数配置。
 * [v1.2]
 * 添加了设置单纯的 字符块 的窗口字符。
 * [v1.3]
 * 修改了插件的分类。分离了描边的窗口字符功能。
 * [v1.4]
 * 优化了对话文字速度的关系。
 * [v1.5]
 * 优化了字符块的结构。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ---消息快进---
 * @desc 
 *
 * @param 初始是否启用快进键
 * @parent ---消息快进---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 启用 - true，关闭 - false。
 * @default true
 *
 * @param 快进键
 * @parent ---消息快进---
 * @type select
 * @option 基本键-加速键
 * @value shift
 * @option 基本键-上一页
 * @value pageup
 * @option 基本键-下一页
 * @value pagedown
 * @desc 按住快进键，可以快速跳过对话框中的非常多的文字信息。（键位修改可以去看看插件 键盘-键盘手柄按键修改器）
 * @default pagedown
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COWC（Core_Of_Window_Character）
//		临时全局变量	无
//		临时局部变量	this._drill_COWC_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_Message.prototype.updateMessage
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话管理层
//		★性能测试消耗	4.94ms（drawTextEx） 2.40ms（没有插件使用时）
//		★最坏情况		暂无
//		★备注			在反复测试刷选项窗口时，帧数会降低到22帧，但是只是添加了渲染render的负担，过一下就好了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			窗口字符核心：
//				->表达式阶段
//					->标准模块
//						->表达式转义【标准接口】
//						->提交转义【标准函数】
//					->表达式应用
//				->转义字符阶段
//					->标准模块
//						->简单符【标准接口】
//						->组合符【标准接口】
//						->提交转义【标准函数】
//					->执行转义
//					->字符分析
//					->转义字符应用
//						> 职业名称
//						> 昵称
//						> 物品/武器/护甲/技能名称
//						> 敌人名称
//						> 状态名称
//						> 图标+物品/武器/护甲/技能名
//						> 图标+状态名
//				->效果字符阶段
//					->标准模块
//						->简单符【标准接口】
//						->组合符【标准接口】
//						->当前行【标准接口】
//						->提交效果【标准函数】
//					->执行效果
//					->字符分析
//					->找到 闭包右括号 字符位置
//					->效果字符应用
//						> 字体加粗/切换斜体
//						> 脸图切换
//						> 重置字体
//				->窗口的画布
//					->标准模块
//						->画笔同步【标准接口】
//						->添加字符块【标准函数】
//						->清除字符块【标准函数】
//						->获取字符块【标准函数】
//					->画布标记
//					->创建字符块贴图
//				->自动换行
//					->标准模块
//						->执行换行【标准函数】
//					->计算标记
//					->记录索引和宽度
//				->消息快进
//					->按键监听
//					->跳过 等待按键输入字符 的功能
//
//		★必要注意事项：
//			1.窗口字符的绘制流程如下：
//				表达式阶段 -> 表达式【标准接口】 ->
//				转义字符阶段 -> 简单符【标准接口】 -> 组合符【标准接口】 -> 
//				效果字符阶段 -> 换行符【标准接口】 -> 简单符【标准接口】 -> 组合符【标准接口】
//			  如果上一个符号没有执行 submit 函数，则会转移到下一个接口进行识别。
//			  如果 转义字符阶段 转义出了 临时的换行符、效果字符，这些临时字符可以在效果字符中被识别。
//			
//		★其它说明细节：
//			暂无
//			
//		★核心接口说明：
//			1.核心中含有 标准接口/标准函数 ，这是其它子插件的底座，无论核心内容怎么变，标准接口一定不能动。
//			2.消息快进 是一个附属的小功能，不具备标准接口。
//		
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfWindowCharacter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWindowCharacter');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_COWC_fastForwardEnabled = String(DrillUp.parameters["初始是否启用快进键"] || "true") == "true"; 
	DrillUp.g_COWC_fastForwardKey = String(DrillUp.parameters["快进键"] || "pagedown"); 
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 启动时校验
//=============================================================================
var _drill_COWC_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COWC_scene_initialize.call(this);
	
	if( Imported.YEP_MessageCore ){
		alert(
			"【Drill_CoreOfWindowCharacter.js 窗口字符 - 窗口字符核心】\n"+
			"检测到你开启了 YEP_MessageCore插件。\n"+
			"请及时关闭该插件，该插件与 窗口字符核心 兼容性冲突。"
		);
	}
};


//#############################################################################
// ** 标准接口（表达式阶段）
//
//			说明：	即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 表达式阶段 - 表达式转义【标准接口】
//				
//			参数：	> matched_index 数字（当前的索引）
//					> matched_str 字符串（当前的完整结构，不含"<"和">"）
//					> command 字符串    （当前的指令）
//					> args 字符串列表   （当前的参数列表）
//					> this._drill_COWC_exp_curData 动态参数对象（后续更新在该对象提供更多数据）
//			返回：	> 无
//
//			说明：	> 表达式字符，可将 "<xxx:xxx:xxx>" 转成特定的字符串，此字符串比转义字符的优先级更高。
//					> 如果成功转义，需要调用函数： this.drill_COWC_charSubmit_Expression("");
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Window_Base.prototype.drill_COWC_processNewExpressionChar = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 表达式阶段 - 提交转义【标准函数】
//
//			参数：	> str 字符串（转义后的字符串）
//			返回：	> 无
//					
//			说明：	> 此函数只在 表达式阶段 有效。
//##############################
Window_Base.prototype.drill_COWC_charSubmit_Expression = function( str ){
	this._drill_COWC_exp_success = true;
	this._drill_COWC_exp_str = str;
}
//##############################
// * 表达式阶段 - 子窗口强制继承
//##############################
Window_Message.prototype.drill_COWC_processNewExpressionChar = function( matched_index, matched_str, command, args ){
	Window_Base.prototype.drill_COWC_processNewExpressionChar.call( this, matched_index, matched_str, command, args );
}

//#############################################################################
// ** 标准接口（转义字符阶段）
//#############################################################################
//##############################
// * 转义字符阶段 - 简单符【标准接口】
//				
//			参数：	> matched_index 数字（当前字符的索引）
//					> command 字符串    （当前字符的指令）
//					> this._drill_COWC_tran_curData 动态参数对象（后续更新在该对象提供更多数据）
//			返回：	> 无
//
//			说明：	> 转义字符，可将 "\xxx" 转成特定的字符串。
//					> 如果成功转义，需要调用函数： this.drill_COWC_charSubmit_Transform("");
//					  未调用此函数的字符，会进入后面阶段多次解析。
//			示例：	> 暂无
//##############################
Window_Base.prototype.drill_COWC_processNewTransformChar_Simple = function( matched_index, command ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 转义字符阶段 - 组合符【标准接口】
//				
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，不含"\"）
//					> command 字符串    （当前字符的指令）
//					> args 字符串列表   （当前字符的参数列表）
//					> this._drill_COWC_tran_curData 动态参数对象（后续更新在该对象提供更多数据）
//			返回：	> 无
//
//			说明：	> 转义字符，可将 "\xxx[xxx]" 转成特定的字符串。
//					> 如果成功转义，需要调用函数： this.drill_COWC_charSubmit_Transform("");
//					  未调用此函数的字符，会进入后面阶段多次解析。
//			示例：	> 具体应用，可见当前插件的函数： _drill_COWC_processNewTransformChar_Combined_2
//##############################
Window_Base.prototype.drill_COWC_processNewTransformChar_Combined = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 转义字符阶段 - 提交转义【标准函数】
//
//			参数：	> str 字符串（转义后的字符串）
//			返回：	> 无
//					
//			说明：	> 此函数只在 转义字符阶段 有效。
//##############################
Window_Base.prototype.drill_COWC_charSubmit_Transform = function( str ){
	this._drill_COWC_tran_success = true;
	this._drill_COWC_tran_str = str;
}
//##############################
// * 转义字符阶段 - 子窗口强制继承
//##############################
Window_Message.prototype.drill_COWC_processNewTransformChar_Simple = function( matched_index, command ){
	Window_Base.prototype.drill_COWC_processNewTransformChar_Simple.call( this, matched_index, command );
}
Window_Message.prototype.drill_COWC_processNewTransformChar_Combined = function( matched_index, matched_str, command, args ){
	Window_Base.prototype.drill_COWC_processNewTransformChar_Combined.call( this, matched_index, matched_str, command, args );
}

//#############################################################################
// ** 标准接口（效果字符阶段）
//#############################################################################
//##############################
// * 效果字符阶段 - 简单符【标准接口】
//				
//			参数：	> matched_index 数字（当前字符的索引）
//					> command 字符串    （当前字符的指令）
//					> this._drill_COWC_effect_curData 动态参数对象（后续更新在该对象提供更多数据）
//					> this._drill_COWC_effect_curData['x']（当前绘制的光标x位置，0表示在画布左上角）
//					> this._drill_COWC_effect_curData['y']（当前绘制的光标y位置，0表示在画布左上角）
//					> this._drill_COWC_effect_curData['left']（起始光标x位置）
//					> this._drill_COWC_effect_curData['top']（起始光标y位置）
//			返回：	> 无
//
//			说明：	> 效果字符，可将 "\xxx" 识别，并执行该函数。
//					> 如果成功转义，需要调用函数： this.drill_COWC_charSubmit_Effect(0,0);
//					  未调用此函数的字符，会进入后面阶段多次解析。
//					> 注意，你要留意 this.drill_COWA_isCalculating() 字符计算宽度的情况，注意捕获此情况，防止造成多余操作。
//			示例：	> 具体应用，可见当前插件的函数： _drill_COWC_processNewEffectChar_Simple_2
//##############################
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 效果字符阶段 - 组合符【标准接口】
//				
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，不含"\"）
//					> command 字符串    （当前字符的指令）
//					> args 字符串列表   （当前字符的参数列表）
//					> this._drill_COWC_effect_curData 动态参数对象（后续更新在该对象提供更多数据）
//					> this._drill_COWC_effect_curData['x']（当前绘制的光标x位置，0表示在画布左上角）
//					> this._drill_COWC_effect_curData['y']（当前绘制的光标y位置，0表示在画布左上角）
//					> this._drill_COWC_effect_curData['left']（起始光标x位置）
//					> this._drill_COWC_effect_curData['top']（起始光标y位置）
//			返回：	> 无
//
//			说明：	> 效果字符，可将 "\xxx[xxx]" 识别，并执行该函数。
//					> 如果成功转义，需要调用函数： this.drill_COWC_charSubmit_Effect(0,0);
//					  未调用此函数的字符，会进入后面阶段多次解析。
//					> 注意，你要留意 this.drill_COWA_isCalculating() 字符计算宽度的情况，注意捕获此情况，防止造成多余操作。
//			示例：	> 具体应用，可见当前插件的函数： _drill_COWC_processNewEffectChar_Combined_2
//					> 具体应用，也可见插件： 大图片字符
//##############################
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 效果字符阶段 - 提交效果【标准函数】
//					
//			参数：	> width 数字（当前效果字符的宽度）
//					> offsetY 数字（当前光标Y偏移位置）
//			返回：	> 无
//					
//			说明：	> 此函数只在 效果字符阶段 有效。
//##############################
Window_Base.prototype.drill_COWC_charSubmit_Effect = function( width, offsetY ){
	this._drill_COWC_effect_success = true;
	this._drill_COWC_effect_width = width;
	this._drill_COWC_effect_offsetY = offsetY;
	
	this._drill_COWC_widthAccumulation += width;		//额外累加字符宽度（宽度计算用）
}
//##############################
// * 效果字符阶段 - 子窗口强制继承
//##############################
Window_Message.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	Window_Base.prototype.drill_COWC_processNewEffectChar_Simple.call( this, matched_index, command );
}
Window_Message.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	Window_Base.prototype.drill_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
}

//#############################################################################
// ** 标准接口（当前行）
//#############################################################################
//##############################
// * 当前行 - 执行当前行【标准接口】
//					
//			参数：	> line_index  （当前行索引，从0开始）
//					> line_text   （当前行的文本内容）
//					> this._drill_COWC_effect_curData（后续更新可能会在这提供更多数据，但接口和参数名 不再改变 ）
//					> this._drill_COWC_effect_curData['x']（当前绘制的光标x位置，0表示在画布左上角）
//					> this._drill_COWC_effect_curData['y']（当前绘制的光标y位置，0表示在画布左上角）
//			返回：	> 无
//					
//			说明：	> 仅限 扩展文本绘制 才会触发。（一般文本绘制是直接整套绘制，无法捕获）
//##############################
Window_Base.prototype.drill_COWC_processNewLine = function( line_index, line_text ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 当前行 - 获取当前行宽度【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字（当前行宽度，包含对扩展文本的计算）
//			
//			说明：	> 此函数只在 效果字符阶段 有效。
//					> 尽量使用该接口来反复获取，如果自己计算，可能会额外消耗更多性能。
//##############################
Window_Base.prototype.drill_COWC_getCurLineWidth = function(){
	return this.drill_COWC_getCurLineWidth_Private();
}
//##############################
// * 当前行 - 获取当前行高度【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字（当前行高度，包含对扩展文本的计算）
//			
//			说明：	> 此函数只在 效果字符阶段 有效。
//					> 尽量使用该接口来反复获取，如果自己计算，可能会额外消耗更多性能。
//##############################
Window_Base.prototype.drill_COWC_getCurLineHeight = function(){
	return this.drill_COWC_getCurLineHeight_Private();
}
//##############################
// * 当前行 - 子窗口强制继承
//##############################
Window_Message.prototype.drill_COWC_processNewLine = function( line_index, line_text ){
	Window_Base.prototype.drill_COWC_processNewLine.call( this, line_index, line_text );
}

//#############################################################################
// ** 标准接口（字符块）
//#############################################################################
//##############################
// * 字符块 - 画笔同步【标准接口】
//					
//			参数：	> bitmap_from 贴图（画笔来源）
//					> bitmap_to   贴图（画笔同步到的对象）
//			返回：	> 无
//					
//			说明：	> 如果你定义了某些的效果字符，在画布中绘制有某些属性，需要在字符块中也同步，则需继承此函数。
//					  可以参考 描边、外发光 插件。
//##############################
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 字符块 - 添加字符块【标准函数】
//			
//			参数：	> tar_sprite 贴图
//			返回：	> 无
//			
//			说明：	> 可以加入任意贴图，加入即表示注册为 窗口字符块 的贴图。
//##############################
Window_Base.prototype.drill_COWC_addSprite = function( tar_sprite ){
	this.drill_COWC_addSprite_Private( tar_sprite );
}
//##############################
// * 字符块 - 清除字符块（单个）【标准函数】
//			
//			参数：	> tar_sprite 贴图
//			返回：	> 无
//			
//			说明：	> 不建议 子插件 使用此函数。
//					> 窗口字符核心会根据矩形清除自动删除字符块，手动删有些不合适。
//##############################
Window_Base.prototype.drill_COWC_removeSprite = function( tar_sprite ){
	this.drill_COWC_removeSprite_Private( tar_sprite );
}
//##############################
// * 字符块 - 清除字符块（所有）【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			返回：	> 注意，字符串清除后会执行 delete 函数，如果你的子插件有其它容器存放了 字符块 。
//					  要记得继承此函数，一并清理子插件的容器。
//##############################
Window_Base.prototype.drill_COWC_clearAllSprite = function(){
	this.drill_COWC_clearAllSprite_Private();
}
//##############################
// * 字符块 - 清除字符块（指定区域）【标准函数】
//			
//			参数：	> rect 矩形（四个参数的格式：x，y，width，height）
//			返回：	> 无
//			
//			说明：	> 字符放置后，处于固定的矩形范围。指定区域与落脚点矩形相交后，就会被捕获。
//					> 注意，字符串清除后会执行 delete 函数，如果你的子插件有其它容器存放了 字符块 。
//					  要记得继承此函数，一并清理子插件的容器。
//##############################
Window_Base.prototype.drill_COWC_clearSpriteInRect = function( rect ){
	this.drill_COWC_clearSpriteInRect_Private( rect );
}
//##############################
// * 字符块 - 获取字符块（所有）【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图列表（该窗口 所有字符块贴图）
//##############################
Window_Base.prototype.drill_COWC_getAllSprite = function(){
	return this.drill_COWC_getAllSprite_Private();
}
//##############################
// * 字符块 - 获取字符块（指定区域）【标准函数】
//			
//			参数：	> rect 矩形（四个参数的格式：x，y，width，height）
//			返回：	> 贴图列表（该窗口 符合条件的字符块贴图）
//			
//			说明：	> 字符放置后，处于固定的矩形范围。指定区域与落脚点矩形相交后，就会被捕获。
//##############################
Window_Base.prototype.drill_COWC_getSpriteInRect = function( rect ){
	return this.drill_COWC_getSpriteInRect_Private();
}

//#############################################################################
// ** 标准接口（自动换行）
//#############################################################################
//##############################
// * 自动换行 - 执行换行【标准接口】
//			
//			参数：	> text 字符串（可以是扩展文本，可含"\n"换行符，但不能是"\x1bn"）
//					> max_width 数字（每行最大宽度）
//			返回：	> 字符串
//			
//			说明：	> 此方法将去除全部"\n"换行符，并重新在指定位置插入"\n"换行符。
//					  注意，你必须留意"\n"变成"\x1b"的情况，此函数不支持"\x1bn"的换行。
//					> 此函数对 扩展文本 也有效。
//##############################
Window_Base.prototype.drill_COWC_setWordWrap = function( text, max_width ){
	return this.drill_COWC_setWordWrap_Private( text, max_width );
}



//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_COWC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COWC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COWC_sys_initialize.call(this);
	this.drill_COWC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COWC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COWC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COWC_saveEnabled == true ){	
		$gameSystem.drill_COWC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COWC_initSysData();
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
Game_System.prototype.drill_COWC_initSysData = function() {
	this.drill_COWC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COWC_checkSysData = function() {
	this.drill_COWC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COWC_initSysData_Private = function() {

	this._drill_COWC_fastForwardEnabled = DrillUp.g_COWC_fastForwardEnabled;	//消息快进 - 功能开关
	this._drill_COWC_fastForwardKey = DrillUp.g_COWC_fastForwardKey;			//消息快进 - 快进键
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COWC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COWC_fastForwardKey == undefined ){
		this.drill_COWC_initSysData();
	}

};

    
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_COWC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
    _drill_COWC_pluginCommand.call(this, command, args);
    if( command === ">窗口字符核心" ){    //>窗口字符核心 : 启用快进键
        if( args.length == 2 ){
            var type = String(args[1]);
            if( type == "启用快进键" ){
                $gameSystem._drill_COWC_fastForwardEnabled = true;
            }
            if( type == "关闭快进键" ){
                $gameSystem._drill_COWC_fastForwardEnabled = false;
            }
        }
    }

}

//=============================================================================
// * 表达式阶段（执行）
//=============================================================================
//==============================
// * 表达式 - 执行
//==============================
var _drill_COWC_convertEscapeCharacters_exp = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function( text ){
	text = this.drill_COWC_Expression(text);		//转义 - 表达式
	return _drill_COWC_convertEscapeCharacters_exp.call( this, text );
};
//==============================
// * 表达式 - 执行表达式
//==============================
Window_Base.prototype.drill_COWC_Expression = function( text ){
	var data_list = this.drill_COWC_Expression_Analysis( text );
	
	for(var i = data_list.length-1; i >= 0; i-- ){	//（倒序，防止截取时错位）
		var data = data_list[i];
		
		// > 提交数据 初始化
		this._drill_COWC_exp_success = false;
		this._drill_COWC_exp_str = "";
		
		// > 可用参数 初始化
		this._drill_COWC_exp_curData = {};
		
		// > 执行 子函数
		this.drill_COWC_processNewExpressionChar( data['index_start'], data['matched'], data['command'], data['args'] );
		
		// > 如果字符提交，则执行转义
		if( this._drill_COWC_exp_success == true ){
			var text_a = text.substring( 0, data['index_start'] );
			var text_b = text.substring( data['index_end'] );
			text = text_a + this._drill_COWC_exp_str + text_b;
		}
	}
	return text;
};
//=============================================================================
// * 表达式阶段（字符分析）
//=============================================================================
//==============================
// * 表达式 - 获取简单符列表
//
//			说明：	识别任意获取<xxx:xxx:xxx>的格式。
//					如果没有任何内容，则返回空数组。
//==============================
Window_Base.prototype.drill_COWC_Expression_Analysis = function( text ){
	var re = /<([^<>]*)>/g;	
	var data_list = [];
	
	while( true ){
		var re_data = re.exec(text);		//（每执行一次exec，位置都会向前推进）
		if( re_data == null ){ break; }
		
		var data = {};
		data['index_start'] = Number(re.lastIndex) - re_data[0].length;	//正则匹配的起点
		data['index_end'] = Number(re.lastIndex);						//正则匹配的终点
		data['matched'] = re_data[0];									//正则匹配的原字符串
		var args = String( re_data[1] ).split(":");
		data['command'] = args.shift();									//表达式 指令
		data['args'] = args;											//表达式 参数
		
		data_list.push( data );
	}
	return data_list;
}


//=============================================================================
// * 转义字符阶段（执行）
//=============================================================================
//==============================
// * 转义字符 - 执行
//==============================
var _drill_COWC_convertEscapeCharacters_tran = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function( text ){
	var result_text = _drill_COWC_convertEscapeCharacters_tran.call( this, text );
	result_text = this.drill_COWC_Tran_Simple(result_text);		//转义 - 执行简单符
	result_text = this.drill_COWC_Tran_Combined(result_text);	//转义 - 执行简单符
	return result_text;
};
//==============================
// * 转义字符 - 执行简单符
//==============================
Window_Base.prototype.drill_COWC_Tran_Simple = function( text ){
	var data_list = this.drill_COWC_Tran_SimpleAnalysis( text );
	
	for(var i = data_list.length-1; i >= 0; i-- ){	//（倒序，防止截取时错位）
		var data = data_list[i];
		
		// > 提交数据 初始化
		this._drill_COWC_tran_success = false;
		this._drill_COWC_tran_str = "";
		
		// > 可用参数 初始化
		this._drill_COWC_tran_curData = {};
		
		// > 执行 子函数
		this.drill_COWC_processNewTransformChar_Simple( data['index_start'], data['command'] );
		
		// > 如果字符提交，则执行转义
		if( this._drill_COWC_tran_success == true ){
			var text_a = text.substring( 0, data['index_start'] );
			var text_b = text.substring( data['index_end'] );
			text = text_a + this._drill_COWC_tran_str + text_b;
		}
	}
	return text;
};
//==============================
// * 转义字符 - 执行组合符
//==============================
Window_Base.prototype.drill_COWC_Tran_Combined = function( text ){
	var data_list = this.drill_COWC_Tran_CombinedAnalysis( text );
	
	for(var i = data_list.length-1; i >= 0; i-- ){	//（倒序，防止截取时错位）
		var data = data_list[i];
		
		// > 提交数据 初始化
		this._drill_COWC_tran_success = false;
		this._drill_COWC_tran_str = "";
		
		// > 可用参数 初始化
		this._drill_COWC_tran_curData = {};
		
		// > 执行 子函数
		this.drill_COWC_processNewTransformChar_Combined( data['index_start'], data['matched'], data['command'], data['args'] );
		
		// > 如果字符提交，则执行转义
		if( this._drill_COWC_tran_success == true ){
			var text_a = text.substring( 0, data['index_start'] );
			var text_b = text.substring( data['index_end'] );
			text = text_a + this._drill_COWC_tran_str + text_b;
		}
	}
	return text;
}
//=============================================================================
// * 转义字符阶段（字符分析）
//=============================================================================
//==============================
// * 转义字符 - 获取简单符列表
//
//			说明：	识别任意获取\aaa的格式。
//					如果没有任何内容，则返回空数组。
//==============================
Window_Base.prototype.drill_COWC_Tran_SimpleAnalysis = function( text ){
	var re = /\x1b([A-Z]+)/gi ;	//（获取\aass）格式，不能有空格和额外中括号
	var data_list = [];
	
	while( true ){
		var re_data = re.exec(text);		//（每执行一次exec，位置都会向前推进）
		if( re_data == null ){ break; }
		
		var data = {};
		data['index_start'] = Number(re.lastIndex) - re_data[1].length;	//正则匹配的起点
		data['index_end'] = Number(re.lastIndex);						//正则匹配的终点
		data['matched'] = re_data[1];									//正则匹配的原字符串
		data['command'] = re_data[1];									//窗口字符 指令
		data['args'] = [];												//窗口字符 参数
		
		data_list.push( data );
	}
	return data_list;
}
//==============================
// * 转义字符 - 获取组合符列表
//
//			说明：	识别任意获取\aaa[aaa[aaa]]的格式。" "、"\"为识别的终止符。中括号最多两个 [a[] []]
//					如果没有任何内容，则返回空数组。
//==============================
Window_Base.prototype.drill_COWC_Tran_CombinedAnalysis = function( text ){
	/*
		放弃使用复杂的正则表达式
		（放弃）var re = /\x1b([A-Z]+\[[^ \x1b]*\])/gi ;	
		（放弃）var re = /\x1b([A-Z]+\[[^ \x1b\]]*\]{0,1}[^ \x1b\[\]]*\])/gi ;	//（获取\aaa[aaa[aaa]:bb[bbb]]sss）格式，不能有空格和额外中括号
	*/
	var re = /\x1b([A-Z]+)/gi ;
	var data_list = [];
	
	while( true ){
		var re_data = re.exec(text);		//（每次从简单字符后，找中括号，确保中括号完美闭合）
		if( re_data == null ){ break; }
		
		// > 向前找 闭包右括号 字符位置
		var last_index = Number(re.lastIndex);
		var index_start = last_index - re_data[1].length;
		var data_str = text.substring( last_index );
		var ch_index = this.drill_COWC_indexOfRightBracket( data_str );
		if( ch_index == -1 ){ continue; }	//（找不到闭包，则继续下一个组合符检索）
		
		// > 解析指令
		var arg_str = text.substring( last_index+1, last_index+ch_index );
		var result = {};
		result['index_start'] = index_start;													//正则匹配的起点
		result['index_end'] = last_index + ch_index+1;											//正则匹配的终点
		result['matched'] =  text.substring( result['index_start'], result['index_end'] );		//正则匹配的原字符串
		result['command'] = String(re_data[1]);     						//窗口字符 指令
		result['args'] = arg_str.split(":");								//窗口字符 参数（暂不考虑中文冒号）
		
		data_list.push( result );
	}
	
	return data_list;
}


//=============================================================================
// ** 效果字符阶段（执行）
//=============================================================================
//==============================
// * 效果字符 - 执行
//==============================
var _drill_COWC_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function( code, textState ){
	_drill_COWC_processEscapeCharacter.call( this, code, textState );
	this.drill_COWC_Effect_Simple( code, textState );
	this.drill_COWC_Effect_Combined( code, textState );
};
//==============================
// * 效果字符 - 执行简单符
//==============================
Window_Base.prototype.drill_COWC_Effect_Simple = function( code, textState ){
	var index_start = textState['index']-code.length-1;		//（进入processEscapeCharacter时，已经执行了 obtainEscapeCode ）
	var code_org = textState['text'].substring( textState['index']-code.length, textState['index'] );
	
	// > 提交数据 初始化
	this._drill_COWC_effect_success = false;
	this._drill_COWC_effect_width = 0;
	this._drill_COWC_effect_offsetY = 0;
	
	// > 可用参数 初始化
	this._drill_COWC_effect_curData = {};
	this._drill_COWC_effect_curData['x'] = textState['x'];				//可用参数 - 当前X
	this._drill_COWC_effect_curData['y'] = textState['y'];				//可用参数 - 当前Y
	this._drill_COWC_effect_curData['left'] = textState['left'];		//可用参数 - 起始X
	this._drill_COWC_effect_curData['top'] = textState['top'] || 0;		//可用参数 - 起始Y
	this._drill_COWC_effect_curData['index'] = index_start;				//可用参数 - 当前索引（也就是index_start）
	//this._drill_COWC_effect_curData['rowIndex'] ;						//可用参数 - 当前所处行
	
	// > 执行 子函数
	this.drill_COWC_processNewEffectChar_Simple( index_start, code_org );
	
	// > 如果字符提交，则执行效果
	if( this._drill_COWC_effect_success == true ){
		textState['index'] += 0;							//（直接跳过整段效果字符组）
		textState['x'] += this._drill_COWC_effect_width;	//（光标偏移）
		textState['y'] += this._drill_COWC_effect_offsetY;
	}
};
//==============================
// * 效果字符 - 执行组合符
//==============================
Window_Base.prototype.drill_COWC_Effect_Combined = function( code, textState ){
	var data = this.drill_COWC_Effect_CombinedAnalysis( code, textState );
	if( data == null ){ return; }
	
	// > 提交数据 初始化
	this._drill_COWC_effect_success = false;
	this._drill_COWC_effect_width = 0;
	this._drill_COWC_effect_offsetY = 0;
	
	// > 可用参数 初始化
	this._drill_COWC_effect_curData = {};
	this._drill_COWC_effect_curData['x'] = textState['x'];				//可用参数 - 当前X
	this._drill_COWC_effect_curData['y'] = textState['y'];				//可用参数 - 当前Y
	this._drill_COWC_effect_curData['left'] = textState['left'];		//可用参数 - 起始X
	this._drill_COWC_effect_curData['top'] = textState['top'] || 0;		//可用参数 - 起始Y
	this._drill_COWC_effect_curData['index'] = data['index_start'];		//可用参数 - 当前索引（也就是index_start）
	
	// > 执行 子函数
	this.drill_COWC_processNewEffectChar_Combined( data['index_start'], data['matched'], data['command'], data['args'] );
	
	// > 如果字符提交，则执行效果
	if( this._drill_COWC_effect_success == true ){
		var index_diff = data['matched'].length - data['command'].length -1 ;
		textState['index'] += index_diff;					//（直接跳过整段效果字符组）
		textState['x'] += this._drill_COWC_effect_width;	//（光标偏移）
		textState['y'] += this._drill_COWC_effect_offsetY;
	}
};
//=============================================================================
// * 效果字符阶段（字符分析）
//=============================================================================
//==============================
// * 效果字符 - 获取单个组合符
//
//			说明：	> 识别 \aa[ss[dd]] 的闭包结构，遇到 \aaa[sss][ccc] 时，识别其中的 \aaa[sss] 。
//					> 如果没有任何内容，则返回null。
//					> 【特别注意】：执行该函数时已经执行了 obtainEscapeCode 并解析出了code，这时候光标 textState['index'] 的位置正好卡在 \aaaa[sss] 中左括号的位置。
//==============================
Window_Base.prototype.drill_COWC_Effect_CombinedAnalysis = function( code, textState ){
	var index_start = textState['index']-code.length-1;		//（进入processEscapeCharacter时，已经执行了 obtainEscapeCode ）
	var code_org = textState['text'].substring( textState['index']-code.length, textState['index'] );
	
	// > 向前找 闭包右括号 字符位置
	var data_str = textState['text'].substring( textState['index'] );
	var ch_index = this.drill_COWC_indexOfRightBracket( data_str );
	if( ch_index == -1 ){ return null; }
	
	// > 解析指令
	var matched_str = textState['text'].substring( index_start );
	var arg_str = data_str.substring( 1, ch_index );
	var result = {};
	result['index_start'] = index_start;															//正则匹配的起点
	result['index_end'] = index_start + code.length+1 + ch_index+1;									//正则匹配的终点
	result['matched'] = textState['text'].substring( result['index_start'], result['index_end'] );	//正则匹配的原字符串
	result['command'] = code_org;     						//窗口字符 指令
	result['args'] = arg_str.split(":");					//窗口字符 参数（暂不考虑中文冒号）
	
	return result;
};

//=============================================================================
// * 窗口字符 - 找到 闭包右括号 字符位置
//
//			说明：	> 字符串的第一个字符必须是左括号，否则返回-1。
//					> 在找位置前，必须先截取字符串，并且确保截取的第一个字符是"["。
//=============================================================================
Window_Base.prototype.drill_COWC_indexOfRightBracket = function( text ){
	if( text.length == 0 ){ return -1; }
	if( text.charAt(0) != "[" ){ return -1; }
	var ch_leftCount = 1;
	var ch_rightCount = 0;
	for(var i = 1; i < text.length; i++ ){
		var ch = text.charAt(i);
		if( ch == "[" ){ ch_leftCount += 1; }
		if( ch == "]" ){ ch_rightCount += 1; }
		
		// > 出现新的分隔符时，直接跳过
		if( ch == "\x1b" ){ return -1; }
		
		// > 括号闭包时，结束查找
		if( ch_leftCount == ch_rightCount ){
			return i;
		}
	}
	return -1;
};

//=============================================================================
// * 效果字符阶段（当前行）
//=============================================================================
//==============================
// * 当前行标记 - 画布标记
//==============================
var _drill_COWC_createContents2 = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function(){
	_drill_COWC_createContents2.call( this );
	this.drill_COWC_resetLineNum();							//清理标记
}
//==============================
// * 当前行标记 - 画布清理
//==============================
var _drill_COWC_bitmap_clear = Bitmap.prototype.clear;
Bitmap.prototype.clear = function(){
	_drill_COWC_bitmap_clear.call(this);
	if( this._drill_COWC_window != undefined ){
		this._drill_COWC_window.drill_COWC_resetLineNum();	//清理标记
	}
}
//==============================
// * 当前行 - 清理标记
//==============================
Window_Base.prototype.drill_COWC_resetLineNum = function(){
	this._drill_COWC_lineIndex = 0;
	this._drill_COWC_lineText = "";
	this._drill_COWC_lineWidth = 0;
	this._drill_COWC_lineHeight = 0;
}
//==============================
// * 当前行 - 捕获 - 绘制扩展文本
//==============================
var _drill_COWC_line_drawTextEx = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function( text, x, y ){
	
	// > 第一行
	if( text && this.drill_COWA_isCalculating() == false ){
		var data = {};
		data['text'] = text;
		data['index'] = 0;
		data['x'] = x;
		data['y'] = y;
		this.drill_COWC_prepareNewLine( data );
	}
	
	// > 原函数
	return _drill_COWC_line_drawTextEx.call( this, text, x, y );
}
//==============================
// * 当前行 - 捕获 - 绘制扩展文本（窗口辅助核心中的 副本）
//==============================
var _drill_COWC_line_drawTextEx2 = Window_Base.prototype.drill_COWA_drawTextEx_Copyed;
Window_Base.prototype.drill_COWA_drawTextEx_Copyed = function( text, x, y ){
	
	// > 第一行
	if( text && this.drill_COWA_isCalculating() == false ){
		var data = {};
		data['text'] = text;
		data['index'] = 0;
		data['x'] = x;
		data['y'] = y;
		this.drill_COWC_prepareNewLine( data );
	}
	
	// > 原函数
	return _drill_COWC_line_drawTextEx2.call( this, text, x, y );
}
//==============================
// * 当前行 - 捕获 - 对话框新建页
//==============================
var _drill_COWC_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function( textState ){
	_drill_COWC_newPage.call( this, textState );
	if( this.drill_COWA_isCalculating() == true ){ return; }
	
	// > 第一行
	var data = {};
	data['text'] = textState['text'];
	data['index'] = textState['index'];
	data['x'] = textState['x'];
	data['y'] = textState['y'];
	this.drill_COWC_prepareNewLine( data );
}
//==============================
// * 当前行 - 捕获 - 换行符
//==============================
var _drill_COWC_processNewLine = Window_Base.prototype.processNewLine;
Window_Base.prototype.processNewLine = function( textState ){
	_drill_COWC_processNewLine.call( this, textState );
	if( this.drill_COWA_isCalculating() == true ){ return; }
	
	// > 第二行以后
	var data = {};
	data['text'] = textState['text'];
	data['index'] = textState['index'];
	data['x'] = textState['x'];
	data['y'] = textState['y'];
	this.drill_COWC_prepareNewLine( data );
}
//==============================
// * 当前行 - 换行准备
//==============================
Window_Base.prototype.drill_COWC_prepareNewLine = function( data ){
	
	// > 基本参数 准备
	var text = data['text'];
	var charIndex_cur = data['index'];
	var charIndex_next = text.indexOf( "\n", charIndex_cur );
	if( charIndex_next == -1 ){
		if( charIndex_cur == 0 ){
			this._drill_COWC_lineText = text;
		}else{
			this._drill_COWC_lineText = text.substring( charIndex_cur );
		}
	}else{
		this._drill_COWC_lineText = text.substring( charIndex_cur, charIndex_next );
	}
	
	// > 可用参数 初始化
	this._drill_COWC_effect_curData = {};
	this._drill_COWC_effect_curData['x'] = data['x'];
	this._drill_COWC_effect_curData['y'] = data['y'];
	
	// > 执行换行
	this.drill_COWC_processNewLine( this._drill_COWC_lineIndex, this._drill_COWC_lineText );
	
	// > 行+1
	this._drill_COWC_lineIndex += 1;
	this._drill_COWC_lineWidth = 0;
	this._drill_COWC_lineHeight = 0;
}
//==============================
// * 当前行 - 子窗口强制继承
//==============================
Window_Message.prototype.drill_COWC_prepareNewLine = function( data ){
	Window_Base.prototype.drill_COWC_prepareNewLine.call( this, data );
}
//==============================
// * 当前行 - 获取当前行宽度
//
//			说明：	获取一次后，记录宽度。
//==============================
Window_Base.prototype.drill_COWC_getCurLineWidth_Private = function(){
	if( this._drill_COWC_lineWidth > 0 ){ return this._drill_COWC_lineWidth; }
	this._drill_COWC_lineWidth = this.drill_COWA_getTextExWidth( this._drill_COWC_lineText );
	return this._drill_COWC_lineWidth;
}
//==============================
// * 当前行 - 获取当前行高度
//
//			说明：	获取一次后，记录高度。
//==============================
Window_Base.prototype.drill_COWC_getCurLineHeight_Private = function(){
	if( this._drill_COWC_lineHeight > 0 ){ return this._drill_COWC_lineHeight; }
	this._drill_COWC_lineHeight = this.drill_COWA_getTextExHeight( this._drill_COWC_lineText );
	return this._drill_COWC_lineHeight;
}


//=============================================================================
// ** 表达式应用
//=============================================================================
//==============================
// * 表达式应用 - 字符转换（简单符）
//==============================
var _drill_COWC_processNewExpressionChar_2 = Window_Base.prototype.drill_COWC_processNewExpressionChar;
Window_Base.prototype.drill_COWC_processNewExpressionChar = function( matched_index, matched_str, command, args ){
	_drill_COWC_processNewExpressionChar_2.call( this, matched_index, matched_str, command, args );
	
	// > 复制内容（<复制:2:某文字> 或 <复制:\v[21]:某文字>）
	if( command == "复" || command == "复制" ){
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			
			var result_str = "";
			var num = 0;
			var num_str = temp1;	//（变量复制文字）
			if( num_str.slice(0,2) == "\\v" || num_str.slice(0,2) == "\\V" ){
				num = Number(num_str.slice(3,num_str.length-1));
				num = $gameVariables.value(num);
			}else{
				num = Number(temp1);
			}
			for(var j =0; j < num; j++){
				result_str += temp2;
			}
			this.drill_COWC_charSubmit_Expression( result_str );
		}
	}
	
	// > 单选内容（ <单选:21:某文字A:某文字B> ）
	if( command == "单选" ){
		if( args.length == 3 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			
			var result_str = "";
			var s_id = Number(temp1);
			if( $gameSwitches.value(s_id) == true ){
				result_str = temp2;
			}else{
				result_str = temp3;
			}
			this.drill_COWC_charSubmit_Expression( result_str );
		}
	}
};


//=============================================================================
// ** 转义字符应用
//=============================================================================
//==============================
// * 转义字符应用 - 字符转换
//==============================
var _drill_COWC_processNewTransformChar_Combined_2 = Window_Base.prototype.drill_COWC_processNewTransformChar_Combined;
Window_Base.prototype.drill_COWC_processNewTransformChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_processNewTransformChar_Combined_2.call( this, matched_index, matched_str, command, args );
	
	// > 职业名称（指定角色）（\AC[n]）
	if( command.toUpperCase() == "AC" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_actorClassName( Number(args[0]) );
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 昵称（指定角色）（\AN[n]）
	if( command.toUpperCase() == "AN" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_actorNickname( Number(args[0]) );
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 职业名称（队伍成员）（\PC[n]）
	if( command.toUpperCase() == "PC" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_partyClassName( Number(args[0]) );
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 昵称（队伍成员）（\PN[n]）
	if( command.toUpperCase() == "PN" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_partyNickname( Number(args[0]) );
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	
	// > 职业名称（\NC[n]）
	if( command.toUpperCase() == "NC" ){
		if( args.length == 1 ){
			var str = $dataClasses[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 物品名称（\NI[n]）
	if( command.toUpperCase() == "NI" ){
		if( args.length == 1 ){
			var str = $dataItems[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 武器名称（\NW[n]）
	if( command.toUpperCase() == "NW" ){
		if( args.length == 1 ){
			var str = $dataWeapons[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 护甲名称（\NA[n]）
	if( command.toUpperCase() == "NA" ){
		if( args.length == 1 ){
			var str = $dataArmors[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 技能名称（\NS[n]）
	if( command.toUpperCase() == "NS" ){
		if( args.length == 1 ){
			var str = $dataSkills[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 敌人名称（\NE[n]）
	if( command.toUpperCase() == "NE" ){
		if( args.length == 1 ){
			var str = $dataEnemies[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 状态名称（\NT[n]）
	if( command.toUpperCase() == "NT" ){
		if( args.length == 1 ){
			var str = $dataStates[ Number(args[0]) ].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	
	// > 图标+物品名（\II[n]）
	if( command.toUpperCase() == "II" ){
		if( args.length == 1 ){
			var n = Number(args[0]);
			var str = '\x1bI[' + $dataItems[n].iconIndex + ']' + $dataItems[n].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 图标+武器名（\IW[n]）
	if( command.toUpperCase() == "IW" ){
		if( args.length == 1 ){
			var n = Number(args[0]);
			var str = '\x1bI[' + $dataWeapons[n].iconIndex + ']' + $dataWeapons[n].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 图标+护甲名（\IA[n]）
	if( command.toUpperCase() == "IA" ){
		if( args.length == 1 ){
			var n = Number(args[0]);
			var str = '\x1bI[' + $dataArmors[n].iconIndex + ']' + $dataArmors[n].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 图标+技能名（\IS[n]）
	if( command.toUpperCase() == "IS" ){
		if( args.length == 1 ){
			var n = Number(args[0]);
			var str = '\x1bI[' + $dataSkills[n].iconIndex + ']' + $dataSkills[n].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
	// > 图标+状态名（\IT[n]）
	if( command.toUpperCase() == "IT" ){
		if( args.length == 1 ){
			var n = Number(args[0]);
			var str = '\x1bI[' + $dataStates[n].iconIndex + ']' + $dataStates[n].name;
			this.drill_COWC_charSubmit_Transform( str );
		}
	}
};

//==============================
// * 转义字符应用 - 职业名称（指定角色）
//==============================
Window_Base.prototype.drill_COWC_actorClassName = function( n ){
    var actor = $gameActors.actor(n);
	if( actor == undefined ){ return ""; }
    return actor.currentClass().name;
};
//==============================
// * 转义字符应用 - 昵称（指定角色）
//==============================
Window_Base.prototype.drill_COWC_actorNickname = function( n ){
    var actor = $gameActors.actor(n);
	if( actor == undefined ){ return ""; }
    return actor.nickname();
};
//==============================
// * 转义字符应用 - 职业名称（队伍成员）
//==============================
Window_Base.prototype.drill_COWC_partyClassName = function(n) {
    var actor = $gameParty.members()[n - 1];
	if( actor == undefined ){ return ""; }
    return actor.currentClass().name;
};
//==============================
// * 转义字符应用 - 昵称（队伍成员）
//==============================
Window_Base.prototype.drill_COWC_partyNickname = function(n) {
    var actor = $gameParty.members()[n - 1];
	if( actor == undefined ){ return ""; }
    return actor.nickname();
};



//=============================================================================
// ** 效果字符 - 字体加粗
//=============================================================================
//==============================
// * 字体加粗 - bitmap标记
//==============================
var _drill_COWC_bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function( width, height ){
	_drill_COWC_bitmap_initialize.call(this, width, height);
	this._drill_COWC_fontBold = false;
};
//==============================
// * 字体加粗 - 执行加粗
//==============================
var _drill_COWC_bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
	
	// > 加粗设置
    if( this._drill_COWC_fontBold == true ){
		return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
	}
	
	// > 斜体设置（核心中默认）
    return _drill_COWC_bitmap_makeFontNameText.call(this);
};

//=============================================================================
// ** 效果字符 - 脸图切换
//=============================================================================
//==============================
// * 脸图切换 - 字符转换
//==============================
var _drill_COWC_processNewEffectChar_Combined_face = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_processNewEffectChar_Combined_face.call( this, matched_index, matched_str, command, args );

	if( this instanceof Window_Message ){
		if( command.toUpperCase() == "AF" ){	//（想办法实时绘制/换脸图）
			if( args.length == 1 ){
				var temp1 = String(args[0]);
				var actor = $gameActors.actor( Number(temp1) );
				$gameMessage.setFaceImage( actor.faceName(), actor.faceIndex() );
				this.drill_COWC_clearContentsRect( 0, 0, Window_Base._faceWidth, Window_Base._faceHeight );	//（擦掉脸图区域）
				this.loadMessageFace();						//（再次读取新脸图）
				this.drill_COWC_charSubmit_Effect(0,0);
			}
		}
		if( command.toUpperCase() == "PF" ){
			if( args.length == 1 ){
				var temp1 = String(args[0]);
				var actor = $gameParty.members()[ Number(temp1) -1 ];
				$gameMessage.setFaceImage( actor.faceName(), actor.faceIndex() );
				this.drill_COWC_clearContentsRect( 0, 0, Window_Base._faceWidth, Window_Base._faceHeight );	//（擦掉脸图区域）
				this.loadMessageFace();						//（再次读取新脸图）
				this.drill_COWC_charSubmit_Effect(0,0);
			}
		}
	}
};

//=============================================================================
// ** 效果字符 - 重置字体
//=============================================================================
var _drill_COWC_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	_drill_COWC_resetFontSettings.call(this);
    //this.contents.fontFace = this.standardFontFace();			//原函数 - 字体类型
    //this.contents.fontSize = this.standardFontSize();			//原函数 - 字体大小
    //this.resetTextColor();									//原函数 - 字体颜色
	
	this.contents._drill_COWC_fontBold = false;					//标记 - 加粗
	this.contents.fontItalic = false;							//标记 - 斜体
};

//=============================================================================
// ** 效果字符应用
//=============================================================================
//==============================
// * 效果字符应用 - 字符转换（简单符）
//==============================
var _drill_COWC_processNewEffectChar_Simple_2 = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_COWC_processNewEffectChar_Simple_2.call( this, matched_index, command );
	
	// > 重置字体（\FR）
	if( command.toUpperCase() == "FR" ){
		this.resetFontSettings();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
	// > 切换加粗（\FB）
	if( command.toUpperCase() == "FB" ){
		this.contents._drill_COWC_fontBold = !this.contents._drill_COWC_fontBold;		
		this.drill_COWC_charSubmit_Effect(0,0);
	}
	// > 切换斜体（\FI）
	if( command.toUpperCase() == "FI" ){
		this.contents.fontItalic = !this.contents.fontItalic;
		this.drill_COWC_charSubmit_Effect(0,0);
	}
}
//==============================
// * 效果字符应用 - 字符转换（组合符）
//==============================
var _drill_COWC_processNewEffectChar_Combined_2 = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_processNewEffectChar_Combined_2.call( this, matched_index, matched_str, command, args );
	
	// > 字体大小（\FS）
	if( command.toUpperCase() == "FS" ){
		if( args.length == 1 ){
			this.contents.fontSize = Number(args[0]);
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	// > 偏移X（\PX）
	if( command.toUpperCase() == "PX" ){
		if( args.length == 1 ){
			var xx = Number(args[0]);
			this.drill_COWC_charOffsetX(xx);	//（光标偏移X）
		}
	}
	// > 偏移Y（\PY）
	if( command.toUpperCase() == "PY" ){
		if( args.length == 1 ){
			var yy = Number(args[0]);
			this.drill_COWC_charOffsetY(yy);	//（光标偏移Y）
		}
	}
	
	// > 分割线（\dCOWCsep[颜色[1]:厚度[2]]）
	if( command == "dCOWCsep" ){
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			temp1 = temp1.replace("颜色[","");
			temp1 = temp1.replace("]","");
			temp2 = temp2.replace("厚度[","");
			temp2 = temp2.replace("]","");
			
			//（固定出现该字符时将整行都绘制）
			var l_width = this.width;
			var l_height = Number(temp2);
			var l_xx = this._drill_COWC_effect_curData['x'];
			var l_yy = this._drill_COWC_effect_curData['y'] + this.standardFontSize()/2 - Number(l_height)/2;
			var l_color = Number(temp1);
			this.contents.fillRect( l_xx, l_yy, l_width, l_height, this.textColor(l_color) );
			this.drill_COWC_charSubmit_Effect( l_width, 0 );
		}
	}
}
//==============================
// * 效果字符应用 - 字符转换（组合符）
//
//			说明：	注意，这里是Window_Message对话框类的继承。
//==============================
var _drill_COWC_processNewEffectChar_Combined_3 = Window_Message.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Message.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_processNewEffectChar_Combined_3.call( this, matched_index, matched_str, command, args );
	
	// > 等待n帧（\W）
	if( command.toUpperCase() == "W" ){
		if( args.length == 1 ){
			this.startWait( Number(args[0]) );
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
}
//==============================
// * 效果字符应用 - 光标偏移X（\PX 效果字符专用）
//
//			说明：	居中插件 会需要记录此函数的变化。
//==============================
Window_Base.prototype.drill_COWC_charOffsetX = function( xx ){
	this.drill_COWC_charSubmit_Effect(xx,0);
}
//==============================
// * 效果字符应用 - 光标偏移Y（\PY 效果字符专用）
//==============================
Window_Base.prototype.drill_COWC_charOffsetY = function( yy ){
	this.drill_COWC_charSubmit_Effect(0,yy);
}
//==============================
// * 效果字符应用 - 光标偏移Y - 高度变化
//==============================
var _drill_COWC_COWA_getTextExHeight_Private = Window_Base.prototype.drill_COWA_getTextExHeight_Private;
Window_Base.prototype.drill_COWA_getTextExHeight_Private = function( text ){
	var hh = _drill_COWC_COWA_getTextExHeight_Private.call( this, text );
	var data = text.match( /PY\[(\d+)\]/i );
	if( data != null ){
		if( data[1] != "" ){
			hh += Number( data[1] );	//（由于是强制偏移Y轴，因此和输入的行高累加）
		}
	}
	return hh;
}


//=============================================================================
// ** 窗口的画布
//=============================================================================
//=============================
// * 窗口的画布 - 初始化
//=============================
var _drill_COWC_w_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
	_drill_COWC_w_initialize.call(this, x, y, width, height);
	this._drill_COWC_spriteTank = [];		//字符块列表
}
//==============================
// * 窗口的画布 - 去除矩形区域的画
//==============================
Window_Base.prototype.drill_COWC_clearContentsRect = function( x, y, width, height ){
	this.contents.clearRect( x, y, width, height );
}
//==============================
// * 窗口的画布 - 画布标记
//==============================
var _drill_COWC_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function(){
	if( this.contents != undefined ){
		this.contents._drill_COWC_window = null;	//去掉指针
	}
	_drill_COWC_createContents.call( this );
	this.drill_COWC_clearAllSprite();				//清除所有字符块
	this.contents._drill_COWC_window = this;		//标记指针
}
//==============================
// * 窗口的画布 - 关闭时画布标记
//==============================
var _drill_COWC_close = Window_Base.prototype.close;
Window_Base.prototype.close = function(){
    if( !this.isClosed() ){
		this.drill_COWC_clearAllSprite();			//清除所有字符块
    }
	_drill_COWC_close.call( this );
}
//==============================
// * 窗口的画布 - 画布清理
//==============================
var _drill_COWC_bitmap_clearRect = Bitmap.prototype.clearRect;
Bitmap.prototype.clearRect = function( x, y, width, height ){
	_drill_COWC_bitmap_clearRect.call( this, x, y, width, height );
	if( this._drill_COWC_window != undefined ){
		var rect = {'x':x, 'y':y, 'width':width, 'height':height};
		this._drill_COWC_window.drill_COWC_clearSpriteInRect( rect );	//（清理范围内的字符块）
	}
}
//=============================
// * 字符块 - 添加字符块
//			
//			说明：	可以加入任意贴图，加入即表示注册为 窗口字符块 的贴图。
//=============================
Window_Base.prototype.drill_COWC_addSprite_Private = function( tar_sprite ){
	if( this._drill_COWC_spriteTank == undefined ){ return; }
	if( this.drill_COWA_isCalculating() == true ){ return; }	//（计算宽度时，禁止添加字符块）
	
	// > 销毁标记
	if( tar_sprite._drill_COWC_destroyed == true ){ return; }
	tar_sprite._drill_COWC_destroyed = false;
	
	this._drill_COWC_spriteTank.push(tar_sprite);
	this._windowContentsSprite.addChild(tar_sprite);
};
//=============================
// * 字符块 - 清除字符块（单个）
//			
//			说明：	不建议 子插件 使用此函数。
//					窗口字符核心会根据矩形清除自动删除字符块，手动删有些不合适。
//=============================
Window_Base.prototype.drill_COWC_removeSprite_Private = function( tar_sprite ){
	if( this._drill_COWC_spriteTank == undefined ){ return; }
	if( this._drill_COWC_spriteTank.length == 0 ){ return; }
	
	for(var i=this._drill_COWC_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = this._drill_COWC_spriteTank[i];
		if( temp_sprite == tar_sprite ){
			
			// > 销毁标记
			tar_sprite._drill_COWC_destroyed = true;
			
			this._windowContentsSprite.removeChild(temp_sprite);
			this._drill_COWC_spriteTank.splice(i,1);
			break;
		}
	}
};
//=============================
// * 字符块 - 清除字符块（所有）
//=============================
Window_Base.prototype.drill_COWC_clearAllSprite_Private = function() {
	if( this._drill_COWC_spriteTank == undefined ){ return; }
	if( this._drill_COWC_spriteTank.length == 0 ){ return; }
	
	for(var i=this._drill_COWC_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = this._drill_COWC_spriteTank[i];
		
		// > 销毁标记
		temp_sprite._drill_COWC_destroyed = true;
			
		this._windowContentsSprite.removeChild(temp_sprite);
		this._drill_COWC_spriteTank.splice(i,1);
	}
};
//=============================
// * 字符块 - 清除字符块（指定区域）
//
//			说明：	字符放置后，处于固定的矩形范围。指定区域与落脚点矩形相交后，就会被捕获。
//=============================
Window_Base.prototype.drill_COWC_clearSpriteInRect_Private = function( rect ){
	if( this._drill_COWC_spriteTank == undefined ){ return; }
	if( this._drill_COWC_spriteTank.length == 0 ){ return; }
	
	var rectSprite_list = this.drill_COWC_getSpriteInRect_Private( rect );
	for(var i = this._drill_COWC_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = this._drill_COWC_spriteTank[i];
		
		// > 删除列表中 对应的贴图
		for( var j=0; j < rectSprite_list.length; j++ ){
			if( temp_sprite == rectSprite_list[j] ){
				
				// > 销毁标记
				temp_sprite._drill_COWC_destroyed = true;
				
				this._windowContentsSprite.removeChild(temp_sprite);
				this._drill_COWC_spriteTank.splice(i,1);
				break;
			}
		}
	}
};
//=============================
// * 字符块 - 获取字符块（所有）
//=============================
Window_Base.prototype.drill_COWC_getAllSprite_Private = function(){
	if( this._drill_COWC_spriteTank == undefined ){ return []; }
	return this._drill_COWC_spriteTank;
};
//=============================
// * 字符块 - 获取字符块（指定区域）
//
//			说明：	字符放置后，处于固定的矩形范围。指定区域与落脚点矩形相交后，就会被捕获。
//=============================
Window_Base.prototype.drill_COWC_getSpriteInRect_Private = function( rect ){
	if( this._drill_COWC_spriteTank == undefined ){ return []; }
	
	var result_list = [];
	for(var i = 0; i < this._drill_COWC_spriteTank.length; i++){
		var temp_sprite = this._drill_COWC_spriteTank[i];
		
		var x1 = temp_sprite.x;
		var y1 = temp_sprite.y;
		var x2 = temp_sprite.x + temp_sprite.bitmap.width;
		var y2 = temp_sprite.y + temp_sprite.bitmap.height;
		var x3 = rect.x;
		var y3 = rect.y;
		var x4 = rect.x + rect.width;
		var y4 = rect.y + rect.height;
		
		var minx = Math.max(x1, x3);
		var miny = Math.max(y1, y3);
		var maxx = Math.min(x2, x4);
		var maxy = Math.min(y2, y4);
		
		if( minx <= maxx && miny <= maxy ){
			result_list.push( temp_sprite );
		}
	}
	return result_list;
};
//==============================
// * 字符块 - 创建字符块贴图（接口）
//
//			说明：	> 子插件中，你可以调用此接口获得一个写好字的贴图。
//					> 你也可以自己模仿下面的函数，创建一个自定义贴图。
//==============================
Window_Base.prototype.drill_COWC_createBlockSprite = function( text ){
	var text_width = this.drill_COWA_getTextWidth( text );		//（直接通过 核心接口 获取 纯文本宽度）
	var text_height = this.drill_COWA_getTextHeight( text );	//（直接通过 核心接口 获取 纯文本高度）
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = new Bitmap( text_width +2, text_height +2 );
	temp_sprite.bitmap.textColor = this.contents.textColor;
	temp_sprite.bitmap.paintOpacity = this.contents.paintOpacity;
	temp_sprite.bitmap.fontSize = this.contents.fontSize;
	temp_sprite.bitmap['drill_elements_drawText'] = true;		//（高级渐变颜色 偏移标记）
	
	// > 画笔同步
	this.drill_COWC_drawSynchronization( this.contents, temp_sprite.bitmap );
	
	temp_sprite.bitmap.drawText( text, 0, 0, text_width, text_height );
	temp_sprite._drill_width = text_width;
	temp_sprite._drill_height = text_height;
	return temp_sprite;
}
//==============================
// * 效果字符应用 - 字符转换（组合符）
//==============================
var _drill_COWC_processNewEffectChar_Combined_4 = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_processNewEffectChar_Combined_4.call( this, matched_index, matched_str, command, args );
	
	if( command == "dCOWCf" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			var text_width = this.drill_COWA_getTextWidth( temp1 );
			if( this.drill_COWA_isCalculating() == false ){
				var temp_sprite = this.drill_COWC_createBlockSprite( temp1 );
				temp_sprite.x = this._drill_COWC_effect_curData['x'];
				temp_sprite.y = this._drill_COWC_effect_curData['y'];
				this.drill_COWC_addSprite( temp_sprite );
			}
			this.drill_COWC_charSubmit_Effect( text_width, 0 );
		}
	}
	if( command == "dCOWCfv" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			var text_width = this.drill_COWA_getTextWidth( temp1 );
			if( this.drill_COWA_isCalculating() == false ){
				var temp_sprite = this.drill_COWC_createBlockSprite( temp1 );
				temp_sprite.x = this._drill_COWC_effect_curData['x'] + temp_sprite._drill_width;
				temp_sprite.y = this._drill_COWC_effect_curData['y'];
				temp_sprite.scale.x = -1;
				this.drill_COWC_addSprite( temp_sprite );
			}
			this.drill_COWC_charSubmit_Effect( text_width, 0 );
		}
	}
	if( command == "dCOWCfh" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			var text_width = this.drill_COWA_getTextWidth( temp1 );
			if( this.drill_COWA_isCalculating() == false ){
				var temp_sprite = this.drill_COWC_createBlockSprite( temp1 );
				temp_sprite.x = this._drill_COWC_effect_curData['x'];
				temp_sprite.y = this._drill_COWC_effect_curData['y'] + temp_sprite._drill_height;
				temp_sprite.scale.y = -1;
				this.drill_COWC_addSprite( temp_sprite );
			}
			this.drill_COWC_charSubmit_Effect( text_width, 0 );
		}
	}
	if( command == "dCOWC" ){
		if( args.length == 2 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			if( type == "字符块" ){
				temp1 = temp1.replace("文本[","");
				temp1 = temp1.replace("]","");
				var text_width = this.drill_COWA_getTextWidth( temp1 );
				if( this.drill_COWA_isCalculating() == false ){
					var temp_sprite = this.drill_COWC_createBlockSprite( temp1 );
					temp_sprite.x = this._drill_COWC_effect_curData['x'];
					temp_sprite.y = this._drill_COWC_effect_curData['y'];
					this.drill_COWC_addSprite( temp_sprite );
				}
				this.drill_COWC_charSubmit_Effect( text_width, 0 );
			}
			if( type == "横向翻转" ){
				temp1 = temp1.replace("文本[","");
				temp1 = temp1.replace("]","");
				var text_width = this.drill_COWA_getTextWidth( temp1 );
				if( this.drill_COWA_isCalculating() == false ){
					var temp_sprite = this.drill_COWC_createBlockSprite( temp1 );
					temp_sprite.x = this._drill_COWC_effect_curData['x'] + temp_sprite._drill_width;
					temp_sprite.y = this._drill_COWC_effect_curData['y'];
					temp_sprite.scale.x = -1;
					this.drill_COWC_addSprite( temp_sprite );
				}
				this.drill_COWC_charSubmit_Effect( text_width, 0 );
			}
			if( type == "纵向翻转" ){
				temp1 = temp1.replace("文本[","");
				temp1 = temp1.replace("]","");
				var text_width = this.drill_COWA_getTextWidth( temp1 );
				if( this.drill_COWA_isCalculating() == false ){
					var temp_sprite = this.drill_COWC_createBlockSprite( temp1 );
					temp_sprite.x = this._drill_COWC_effect_curData['x'];
					temp_sprite.y = this._drill_COWC_effect_curData['y'] + temp_sprite._drill_height;
					temp_sprite.scale.y = -1;
					this.drill_COWC_addSprite( temp_sprite );
				}
				this.drill_COWC_charSubmit_Effect( text_width, 0 );
			}
		}
	}
}


//=============================================================================
// ** 自动换行
//=============================================================================
//==============================
// * 计算标记 - 计算文本宽度前（继承 窗口辅助核心）
//==============================
var _drill_COWC_COWA_calculateExWidth_Before = Window_Base.prototype.drill_COWA_calculateExWidth_Before;
Window_Base.prototype.drill_COWA_calculateExWidth_Before = function(){
	_drill_COWC_COWA_calculateExWidth_Before.call(this);
	
	this._drill_COWC_wordWrap_tempX = 0;		//自动换行 - 当前字符位置X
	this._drill_COWC_wordWrap_indexList = [];	//自动换行 - 索引列表（用于 自动换行断行 用）
	this._drill_COWC_wordWrap_widthList = [];	//自动换行 - 字符宽度列表
	
	this._drill_COWC_widthAccumulation = 0;		//额外累加字符宽度
}
//==============================
// * 计算标记 - 推进字符时
//==============================
var _drill_COWC_processCharacter = Window_Base.prototype.processCharacter;
Window_Base.prototype.processCharacter = function( textState ){
	_drill_COWC_processCharacter.call( this, textState );
	
	// > 排除计算宽度情况
	if( this.drill_COWA_isCalculating() != true ){ return; }
	
	// > 记录索引和宽度
	this._drill_COWC_wordWrap_indexList.push( textState['index'] );
	this._drill_COWC_wordWrap_widthList.push( textState['x'] - this._drill_COWC_wordWrap_tempX );
	this._drill_COWC_wordWrap_tempX = textState['x'];
}
//==============================
// * 计算标记 - 计算文本宽度后（继承 窗口辅助核心）
//==============================
var _drill_COWC_COWA_calculateExWidth_After = Window_Base.prototype.drill_COWA_calculateExWidth_After;
Window_Base.prototype.drill_COWA_calculateExWidth_After = function(){
	_drill_COWC_COWA_calculateExWidth_After.call(this);
	
	// > 宽度额外累加
	//		（ this._drill_COWC_widthAccumulation不需要累加 ）
	//		（ 因为 光标偏移 textState['x'] += this._drill_COWC_effect_width 时，已经算作宽度了）
	//this._drill_COWA_calculatedExWidth += this._drill_COWC_widthAccumulation;
}
//==============================
// * 自动换行 - 换行捕获
//==============================
var _drill_COWC_convertEscapeCharacters_2 = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function( text ){
	
	// > 排除计算宽度情况
	if( this.drill_COWA_isCalculating() != true ){
		
		var max_width = this.contents.width;
		if( this instanceof Window_Message ){	//（注意脸图会挤压宽度）
			if( $gameMessage.faceName() != "" ){
				max_width -= (Window_Base._faceWidth + 20);
				this._drill_COWC_messageFaceWidthSubtracted = true;		//（脸图宽度减去标记）
			}
		}
		
		// > 在"\n"变成"\x1b"前，强制变换
		text = this.drill_COWC_setWordWrap_Private( text, max_width );
	}
	
	// > 原函数
	return _drill_COWC_convertEscapeCharacters_2.call( this, text );
}
//==============================
// * 自动换行 - 执行换行
//			
//			说明：	此方法将去除全部"\n"换行符，并重新在指定位置插入"\n"换行符。
//					此函数对 扩展文本 也有效。
//==============================
Window_Base.prototype.drill_COWC_setWordWrap_Private = function( text, max_width ){
	/*
		自动换行计算（需要提前统计所有窗口字符，去掉所有换行符）：
			0	4	6	12	14	15	18	19	（依次字符索引）
			26	26	26	25	13	26	10	26	（依次字符宽度）
		假设窗口宽度为80，则第一行 截止在 索引6 位置（26+26+26 < 80）。 在 索引6 的后面，预备插入一个换行符。
		然后第二行宽度从索引6继续，截止在 索引18 位置（25+13+26+10 < 80）。在 索引18 的后面，预备插入一个换行符。
		以此类推。
		确认所有 索引位置 后。倒序插入换行符。
	*/
	
	// > 没有标记，则跳过
	if( text.match(/\<WordWrap\>/i) == null ){ return text; }
	
	// > 去掉标记
	text = text.replace(/\<WordWrap\>/gi, '');	//去掉标记
	text = text.replace(/[\n]/gi, '');			//去掉所有换行符
	
	// > 标记强制换行符
	var re = /\<br\>/gi ;
	var br_index = 0;
	var br_indexList = [];
	while( true ){
		var re_data = re.exec(text);		//（每次从简单字符后，找中括号，确保中括号完美闭合）
		if( re_data == null ){ break; }
		br_indexList.push( Number(re.lastIndex) );
	}
	br_indexList.push( text.length * 2 );
	text = text.replace(/\<br\>/gi, '');		//去掉换行符
	
	// > 缩小两个内边距的划分范围
	max_width -= this.standardPadding() * 2;
	
	// > 寻找插入点
	var all_width = this.drill_COWA_getTextExWidth( text );
	var index_pos = [];
	var cur_width = 0;
	for( var i = 0; i < this._drill_COWC_wordWrap_indexList.length; i++ ){
		var index = this._drill_COWC_wordWrap_indexList[i];
		var width = this._drill_COWC_wordWrap_widthList[i];
		
		// > 如果单个字符的宽度超过了单行，则直接加入标记
		if( width >= max_width ){
			index_pos.push( index );
			cur_width = 0;
			continue;
		}
		
		// > 如果遇到强制换行符，加入标记
		if( i == br_indexList[ br_index ] - (br_index+1)*4 -1 ){
			br_index += 1;
			index_pos.push( index );
			cur_width = 0;
			continue;
		}
		
		// > 如果累计宽度超过了行，则加入标记
		if( cur_width + width >= max_width ){
			cur_width = 0 + width;
			index_pos.push( index );
			
		// > 若未超过，则累加宽度
		}else{
			cur_width += width;
		}
	}
	
	// > 插入换行符（倒序插入）
	for( var i = index_pos.length-1; i >= 0; i-- ){
		var index = index_pos[i];
		text = text.slice(0,index) + "\n" + text.slice(index);
	}
	
	return text;
}


//=============================================================================
// ** 消息快进按键
//=============================================================================
//=============================
// * 消息快进 - 按键监听
//=============================
Window_Message.prototype.drill_COWC_isFastForward = function() {
	if( $gameSystem._drill_COWC_fastForwardEnabled != true ){
		return false;
	}
	return Input.isPressed( $gameSystem._drill_COWC_fastForwardKey );
}
//=============================
// * 消息快进 - 帧刷新输入
//=============================
var _drill_COWC_msg_updateInput = Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if( this.pause && this.drill_COWC_isFastForward() ){
		if( !this._textState ){
			this.pause = false;
			this.terminateMessage();
		}
    }
	return _drill_COWC_msg_updateInput.call(this);
}
//=============================
// * 消息快进 - 强制快速显示
//=============================
var _drill_COWC_msg_updateShowFast = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if( this.drill_COWC_isFastForward() ){
		this._showFast = true;
	}
	_drill_COWC_msg_updateShowFast.call(this);
}
//=============================
// * 消息快进 - 禁止等待
//=============================
var _drill_COWC_msg_updateWait = Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if( this.drill_COWC_isFastForward() ){
		return false;
	}
	return _drill_COWC_msg_updateWait.call(this);
}
//=============================
// * 消息快进 - 等待时间归零
//=============================
var _drill_COWC_msg_startWait = Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function( count ){
	_drill_COWC_msg_startWait.call( this, count );
    if( this.drill_COWC_isFastForward() ){
		this._waitCount = 0;
	}
}
//=============================
// * 消息快进 - 跳过 等待按键输入字符 的功能
//=============================
var _drill_COWC_msg_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function( code, textState ){
	if( code == "!" && this.drill_COWC_isFastForward() ){
		this.startPause();
		return;
	}
	_drill_COWC_msg_processEscapeCharacter.call( this, code, textState );
}

//=============================================================================
// ** 核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 等待消息显示（覆写）
//
//			说明：	拆分此函数，转为更适合扩展的结构。
//==============================
Window_Message.prototype.updateMessage = function(){
    if( this._textState ){
        while( !this.isEndOfText(this._textState) ){
			
			// > 执行新建页
            if( this.needsNewPage(this._textState) ){
                this.newPage(this._textState);
            }
			
			// > 按确定键 瞬间显示当前页
            this.updateShowFast();
			
			// > 绘制下一个字符
            this.processCharacter(this._textState);
			
			// > 跳出字符绘制情况
            if( this.drill_COWC_canBreakProcess() == true ){ break; }
        }
		
		// > 绘制完 全部字符 时
        if( this.isEndOfText(this._textState) ){
            this.onEndOfText();
        }
        return true;
    }else{
        return false;
    }
}
//==============================
// * 核心漏洞修复 - 跳出字符绘制情况（false继续绘制，true跳出绘制）
//==============================
Window_Message.prototype.drill_COWC_canBreakProcess = function(){
	
	// > 瞬间显示时，跳出
	if( this._showFast == false && this._lineShowFast == false ){ return true; }
	
	// > 等待输入时，跳出
	if( this.pause == true ){ return true; }
	
	// > 等待字符时，跳出
	if( this._waitCount > 0 ){ return true; }
	
	return false;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfWindowCharacter = false;
		alert(
			"【Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}


