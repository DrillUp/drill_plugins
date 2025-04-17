//=============================================================================
// Drill_CoreOfWindowCharacter.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        窗口字符 - 窗口字符核心
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
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件，才能运行，并作用于其他子插件。
 * 基于：
 *   - Drill_CoreOfCharDraw             系统-字符绘制核心
 *     需要该核心才能获取到具体字符的宽度。
 * 可作用于：
 *   - Drill_DialogTextAlign            窗口字符-文本居中
 *   - Drill_DialogCharOuterGlow        窗口字符-外发光效果
 *   - Drill_DialogCharOuterBorder      窗口字符-描边效果
 *   - Drill_DialogCharContinuedEffect  窗口字符-字符块持续动作效果
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
 *      消息输入字符：指逐个绘制时，每个字符显示、停顿等操作的字符。
 * 表达式：
 *   (1.表达式是一种优先级更高的指代字符。
 *      也就是说，表达式会最先被替换成其他字符串。
 * 细节：
 *   (1.窗口字符的转换/生效顺序如下：
 *      表达式 > 指代字符 > 效果字符 > 消息输入字符
 *   (2.该插件 旧版本 与YEP消息核心插件冲突。
 *      底层重写后，该插件与YEP消息核心插件不再冲突，但是YEP的窗口字符可能会失效。
 * 设计：
 *   (1.窗口字符核心提供了非常多的指代字符和效果字符。
 *      详细介绍可以去 窗口字符管理层示例 看看。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 字符应用B原版
 * 插件支持下列窗口字符：
 * 
 * 窗口字符：\v[1]        替换为第1个变量的值（0002变量，输入2，不要多余0）
 * 窗口字符：\n[1]        替换为第1个角色的名字
 * 窗口字符：\p[1]        替换为第1个玩家队员的名字(1表示领队,2表示第一个跟随者)
 * 窗口字符：\G           替换为货币单位（ 数据库>系统 中设置单位）
 * 窗口字符：\\           替换为'\'反斜杠字符本身。
 * 
 * 窗口字符：\c[0]        之后文字使用第0个颜色（默认颜色0-31，可扩展高级颜色）
 * 窗口字符：\i[1]        绘制第1个图标
 * 窗口字符：\{           将字体放大一级
 * 窗口字符：\}           将字体缩小一级
 * 
 * 窗口字符：\$           对话框中，打开金钱窗口(右上角出现一个金钱窗口,结束对话消失)
 * 窗口字符：\.           等待 15 帧，四分之一秒
 * 窗口字符：\|           等待 60 帧，一秒
 * 窗口字符：\!           等待按键输入
 * 窗口字符：\>           立刻显示后面文本（一行内）
 * 窗口字符：\<           取消立刻显示
 * 窗口字符：\^           显示文本后不等待输入
 * 
 * 1.窗口字符分为四种类型：
 *     表达式：       格式为<xxx>，优先级最高，能比指代字符、效果字符更先执行文本转换。
 *     指代字符：     格式为\xxx[]，能会被替换成指代的文本。
 *     效果字符：     格式为\xxx[]，能执行特定效果。
 *     消息输入字符： 格式为\xxx[]，能执行特定效果，并且有延迟控制功能。
 *   上述的字符被划成三组，分别为 指代字符、效果字符、消息输入字符，没有表达式。
 * 2."字符应用B原版"是指游戏编辑器默认具备的功能字符，详细可以看看文档介绍。
 * 3.注意，"\n[1]"中1表示领队，2表示第一个跟随者。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 字符应用A底层
 * 插件支持下列窗口字符：
 * 
 * 窗口字符：<br>             表示手动换行。
 * 窗口字符：<WordWrap>       表示自动换行。
 * 
 * 窗口字符：\px[5]           当前字符光标x偏移5像素，正数向右，负数向左。
 * 窗口字符：\py[5]           当前字符光标y偏移5像素，正数向上，负数向下。
 * 窗口字符：\pa[10]          缩小文本域的范围盒，四个方向压缩10像素。不能为负数，重复设置无效，按最后一个算。
 * 窗口字符：\pt[10]          缩小文本域的范围盒，上侧压缩10像素。不能为负数，重复设置无效，按最后一个算。
 * 窗口字符：\pb[10]          缩小文本域的范围盒，下侧压缩10像素。不能为负数，重复设置无效，按最后一个算。
 * 窗口字符：\pl[10]          缩小文本域的范围盒，左侧压缩10像素。不能为负数，重复设置无效，按最后一个算。
 * 窗口字符：\pr[10]          缩小文本域的范围盒，右侧压缩10像素。不能为负数，重复设置无效，按最后一个算。
 * 窗口字符：\fb[on]          之后的文本字体加粗。
 * 窗口字符：\fb[off]         之后的文本关闭字体加粗。
 * 窗口字符：\fi[on]          之后的文本字体倾斜。
 * 窗口字符：\fi[off]         之后的文本关闭字体倾斜。
 * 窗口字符：\fs[20]          之后的文本设置字体大小为20。
 * 窗口字符：\ff[GameFont]    之后的文本设置字体类型为GameFont。
 * 窗口字符：\fr              全重置字符，重置之后文本所有设置。
 * 
 * 1.窗口字符分为四种类型：
 *     表达式：       格式为<xxx>，优先级最高，能比指代字符、效果字符更先执行文本转换。
 *     指代字符：     格式为\xxx[]，能会被替换成指代的文本。
 *     效果字符：     格式为\xxx[]，能执行特定效果。
 *     消息输入字符： 格式为\xxx[]，能执行特定效果，并且有延迟控制功能。
 *   上述的字符应用A底层被划成两组，分别为 表达式、效果字符，没有 指代字符、消息输入字符。
 * 2.设置<br>表示手动换行，手动换行能与自动换行效果叠加。
 * 3.设置<WordWrap>表示自动换行，只要有一个自动换行符，则表示当前所有文本全都自动换行。
 *   该窗口的文本将会去除所有"\n"换行符，并根据窗口宽度自动换行。
 *   如果你需要在自动换行基础上强制换行，添加<br>手动换行即可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 字符应用C扩展
 * 插件支持下列窗口字符：
 * 
 * 窗口字符：\ac[1]       替换为第1个角色的职业名
 * 窗口字符：\an[1]       替换为第1个角色的昵称（小名）
 * 窗口字符：\pc[1]       替换为第1个玩家队员的职业名(1表示领队,2表示第一个跟随者)
 * 窗口字符：\pn[1]       替换为第1个玩家队员的昵称（小名）(1表示领队,2表示第一个跟随者)
 * 窗口字符：\nc[1]       替换为第1个职业的名字
 * 窗口字符：\ni[1]       替换为第1个物品的名字
 * 窗口字符：\nw[1]       替换为第1个武器的名字
 * 窗口字符：\na[1]       替换为第1个防具的名字
 * 窗口字符：\ns[1]       替换为第1个技能的名字
 * 窗口字符：\ne[1]       替换为第1个敌人的名字
 * 窗口字符：\nt[1]       替换为第1个状态的名字
 * 窗口字符：\ii[1]       替换为第1个物品的名字 + 图标
 * 窗口字符：\iw[1]       替换为第1个武器的名字 + 图标
 * 窗口字符：\ia[1]       替换为第1个防具的名字 + 图标
 * 窗口字符：\is[1]       替换为第1个技能的名字 + 图标
 * 窗口字符：\it[1]       替换为第1个状态的名字 + 图标
 * 
 * 1.窗口字符分为四种类型：
 *     表达式：       格式为<xxx>，优先级最高，能比指代字符、效果字符更先执行文本转换。
 *     指代字符：     格式为\xxx[]，能会被替换成指代的文本。
 *     效果字符：     格式为\xxx[]，能执行特定效果。
 *     消息输入字符： 格式为\xxx[]，能执行特定效果，并且有延迟控制功能。
 *   上述的字符只有一组，都是 指代字符 。
 * 2.注意，"\pc[1]"中1表示领队，2表示第一个跟随者。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 表达式(字符应用C扩展)
 * 该插件提供一些简单的表达式，如下：
 * （注意，冒号之间没有空格，并且是英文冒号。）
 * 
 * 窗口字符：<复制:2:文本>           将文本复制2次
 * 窗口字符：<复制:\v[21]:文本>      将文本复制变量21值的次数
 * 
 * 窗口字符：<单选:21:文本A:文本B>   根据开关21的值，on为文本A，off为文本B
 * 
 * 窗口字符：<分割线:单条:厚度[1]:颜色[0]>       画单条超长的分割线，建议单独给出一行来放分割线。
 * 窗口字符：<分割线:两条:厚度[1]:颜色[0]>       画两条超长的分割线，建议单独给出一行来放分割线。
 * 窗口字符：<分割线:三条:厚度[1]:颜色[0]>       画三条超长的分割线，建议单独给出一行来放分割线。
 * 
 * 1.表达式的优先级最高，能比指代字符、效果字符更先执行文本转换。
 * 2."复制"的中间填2，表示内容复制2个，
 *   比如，"ii<复制:2:aaa>ii" = "iiaaaaaaii"
 * 3."复制"的中间填\v[21]变量，表示根据变量值，复制指定变量的数量。
 *   比如"<复制:\v[21]:#>"，#号将会被复制变量21的值的数量。
 * 4."单选"的数字表示开关id，
 *   如果开关为on，则会输出结果A，如果开关为off，则输出结果B。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 消息输入字符(字符应用C扩展)
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\w[100]      等待 100 帧。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug字符
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\debug[显示字符方框]      之后的文本显示字符方框
 * 窗口字符：\debug[隐藏字符方框]      之后的文本取消显示字符方框
 * 窗口字符：\debug[显示单行标线]      之后的文本显示单行标线
 * 窗口字符：\debug[隐藏单行标线]      之后的文本取消显示单行标线
 * 窗口字符：\debug[显示范围盒]        该字符出现在任意位置都有效，显示范围盒
 * 窗口字符：\debug[隐藏范围盒]        该字符与"显示范围盒"同时存在时，最后一个生效
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的字符应用A底层测试 : 开启
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的字符应用A底层测试 : 关闭
 * 
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的字符应用B原版测试 : 开启
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的字符应用B原版测试 : 关闭
 * 
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的字符应用C扩展测试 : 开启
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的字符应用C扩展测试 : 关闭
 * 
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的逐个绘制测试 : 开启
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的逐个绘制测试 : 关闭
 * 
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
 * [v1.7]
 * 规范了 指代字符 的变色功能。
 * [v1.8]
 * 修复了自动换行时，第一行多出一个字的bug。
 * 修复了行高和字体大小计算时的误差bug。
 * [v1.9]
 * 分离了 对话加速键 的功能。
 * [v2.0]
 * 完全翻新了底层结构，基于 字符绘制核心 插件。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COWC（Core_Of_Window_Character）
//		临时全局变量	无
//		临时局部变量	this._drill_COWC_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	地图界面
//		★性能测试消耗	4.94ms（drawTextEx） 2.40ms（没有插件使用时）
//		★最坏情况		暂无
//		★备注			在反复测试刷选项窗口时，帧数会降低到22帧，但是只是添加了渲染render的负担，过一下就好了。
//		
//		★优化记录		2024/11/16：
//							优化失败，本来优化的是函数 drill_COWC_analysisOrgText_InBitmap 。
//							第一次优化：一开始直接优化 converted_text 和 rowBlock_list 两个，只要文本重复，就返回相同 单行块 结果。
//							第一次优化造成的bug：如果两次传入的文本都是 "\v[1]"，那么指代字符的结果根本就不刷新。
//							第二次优化：只优化 rowBlock_list ，如果 converted_text 转换后的文本重复，就返回相同 单行块 结果。
//							第二次优化造成的bug：画廊C中，每个选项会进行多次绘制，但碰巧有三个选项都是文本"已锁定"。
//												 结果造成了第一个选项显示，后两个选项被重叠了，看不见文本。（三个选项文本一模一样，但options的位置不一样，才出现此bug）
//							
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			
//			->☆流程介绍 标准模块
//				->绘制文本【标准函数】【Window_Base】
//				->绘制文本【标准函数】【Bitmap】
//			->☆可选流程介绍 标准模块
//				->获取最大宽度【标准函数】【Window_Base】
//				->获取总高度【标准函数】【Window_Base】
//				x->获取最大宽度【标准函数】【Bitmap】
//				x->获取总高度【标准函数】【Bitmap】
//				->DEBUG显示画布范围【标准函数】【Bitmap】
//			->☆流程实现
//				->窗口字符版本标记
//				->解析窗口字符（Window_Base）
//				->解析窗口字符（Bitmap）
//				->窗口字符转底层字符
//				->子窗口强制继承
//			->☆DEBUG流程测试
//			
//			--------------------------
//			
//			
//			->☆优先指代阶段 标准模块
//				->组合符配置【标准接口】【Game_Temp】
//				->组合符提交【标准函数】【Game_Temp】
//			->☆优先指代实现
//				->切割字符串
//					->搜索简单符（"\aaa"）
//					->搜索组合符（"\aaa[bbb]，最小闭包"）
//					->找到符号"["后面的"]"闭包位置
//				->执行字符转义
//					->简单符时（"\aaa"）
//					->组合符时（"\aaa[bbb]，最小闭包"）
//			->☆窗口字符应用之优先指代
//			
//			
//			->☆表达式阶段 标准模块
//				->表达式配置【标准接口】【Game_Temp】
//				->表达式提交【标准函数】【Game_Temp】
//			->☆表达式实现
//				->切割字符串
//				->执行表达式
//			->☆窗口字符应用之表达式（字符应用A底层）
//			->☆窗口字符应用之表达式（字符应用B原版）
//			->☆窗口字符应用之表达式（字符应用C扩展）
//				> 复制内容
//				> 单选内容
//			
//			
//			->☆指代字符阶段 标准模块
//				->简单符配置【标准接口】【Game_Temp】
//				->简单符提交【标准函数】【Game_Temp】
//				->组合符配置【标准接口】【Game_Temp】
//				->组合符提交【标准函数】【Game_Temp】
//			->☆指代字符实现
//				->切割字符串
//					->搜索简单符（"\aaa"）
//					->搜索组合符（"\aaa[bbb[ccc]]"）
//					->找到符号"["后面的"]"闭包位置
//				->执行字符转义
//					->简单符时（"\aaa"）
//					->组合符时（"\aaa[bbb[ccc]]"）
//			->☆窗口字符应用之指代字符（字符应用A底层）
//			->☆窗口字符应用之指代字符（字符应用B原版）
//			->☆窗口字符应用之指代字符（字符应用C扩展）
//				> 职业名称
//				> 昵称
//				> 物品/武器/护甲/技能名称
//				> 敌人名称
//				> 状态名称
//				> 图标+物品/武器/护甲/技能名
//				> 图标+状态名
//			
//			
//			->☆效果字符阶段 标准模块
//				->简单符配置【标准接口】【Game_Temp】
//				->简单符提交【标准函数】【Game_Temp】
//				->组合符配置【标准接口】【Game_Temp】
//				->组合符提交【标准函数】【Game_Temp】
//			->☆效果字符实现
//				->切割字符串
//					->搜索简单符（"\aaa"）
//					->搜索组合符（"\aaa[bbb[ccc]]"）
//					->找到符号"["后面的"]"闭包位置
//				->执行字符转义
//					->简单符时（"\aaa"）
//					->组合符时（"\aaa[bbb[ccc]]"）
//			->☆窗口字符应用之效果字符（字符应用A底层）
//			->☆窗口字符应用之效果字符（字符应用B原版）
//			->☆窗口字符应用之效果字符（字符应用C扩展）
//			
//			
//			->☆字符取色器
//				->获取文本颜色（开放函数）
//				->获取队伍选中角色时的矩形颜色（开放函数）
//				->获取窗口皮肤（开放函数）
//			->☆窗口标记
//				->窗口的默认配置
//					> 窗口类名
//					> 窗口默认向下偏移4像素
//					> 行上补正32像素
//				->类名标记
//					->获取（开放函数）
//					->是否在对话框中（开放函数）
//				->窗口字符的本事件
//					->获取（开放函数）
//			
//			
//			->☆管辖权（窗口字符）
//			->☆管辖权覆写函数（窗口字符）
//			
//			->☆管辖权（样式配置）
//			->☆管辖权覆写函数（样式配置）
//			
//			->☆管辖权（绘制指代）
//			->☆管辖权覆写函数（绘制指代）
//			
//			--------------------------
//			
//			
//			->☆逐个绘制流程介绍 标准模块
//				->逐个绘制初始化【标准函数】【Window_Base】
//				->逐个绘制初始化【标准函数】【Bitmap】
//				->逐个绘制帧刷新【标准函数】【Window_Base】
//				->逐个绘制帧刷新【标准函数】【Bitmap】
//			->☆逐个绘制可选流程介绍 标准模块
//				->是否正在绘制【标准函数】【Window_Base + Bitmap】
//				->是否正在等待【标准函数】【Window_Base + Bitmap】
//				->是否正在等待-指定类型【标准函数】【Window_Base + Bitmap】
//				->是否正在等待-获取类型【标准函数】【Window_Base + Bitmap】
//				->设置计时器间隔【标准函数】【Window_Base + Bitmap】
//				->设置绘制暂停【标准函数】【Window_Base + Bitmap】
//				->是否绘制暂停【标准函数】【Window_Base + Bitmap】
//				->设置绘制结束【标准函数】【Window_Base + Bitmap】
//				->是否绘制结束【标准函数】【Window_Base + Bitmap】
//			->☆逐个绘制流程实现
//				->5A流程标记
//				->5B计时器
//				->5C次刷新跳帧
//				->5D索引
//				->5E等待管理器
//				->5F立即等待
//				->5G等待按下
//				->5H按下跳帧
//			->☆逐个绘制全局容器
//				->是否处于逐个绘制流程中【标准函数】【Window_Base + Bitmap】
//				->获取当前画布序列号【标准函数】【Window_Base + Bitmap】
//				->根据序列号获取画布【标准函数】【Game_Temp】
//			
//			->☆逐个绘制阶段 标准模块
//				->每行开始时【标准接口】【Bitmap】
//				->每行结束时【标准接口】【Bitmap】
//				->每个字符开始时【标准接口】【Bitmap】
//				->每个字符结束时【标准接口】【Bitmap】
//				->流程开始时【标准接口】【Bitmap】
//				->流程结束时【标准接口】【Bitmap】
//			->☆窗口字符应用之消息输入字符
//			->☆DEBUG逐个绘制的底层字符应用
//			->☆DEBUG逐个绘制流程测试
//			
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于字符绘制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//			
//		★核心说明：
//			1.核心中含有 标准接口/标准函数 ，这是其它子插件的底座，无论核心内容怎么变，标准接口一定不能动。
//			  （然而 2024/9整月 进行了一次全推翻，动了43个插件）
//		
//		★必要注意事项：
//			1.该插件基于 文本绘制核心（h5的底层直接绘制），脚本层面上完全推翻了原来窗口字符的结构。
//			  除了设计思路上 表达式、指代字符、效果字符 有保留，其它全没了。（2024/9整月）
//				 '. .)( '.'
//				  (░░░░░)'
//				   ))░░(
//				  █▀▀▀▀▀█▄		"有时候再努力修bug，都是徒劳的"
//				  █░░░░░█ █
//				  ▀▄▄▄▄▄▀▀
//			1.名词术语 - 流程：
//				正规的流程：      指核心中所给的函数流程，按照该流程执行绘制函数，即符合正规的流程。
//				字符核心流程：    字符绘制核心 提供的标准函数，使用此函数表示走该流程。
//				字符主流程：      窗口字符核心 提供的标准函数，使用此函数表示走该流程。
//				字符逐个绘制流程：窗口字符核心 提供的标准函数，使用此函数表示走该流程。
//				字符贴图流程：    窗口字符贴图核心 提供的标准函数，使用此函数表示走该流程。
//				零散使用：        你可以不走正规的流程，也可以直接拆散用里面的函数，自己写一套。只是走正规的流程不容易出错，所以各核心才专门介绍流程函数。
//			  名词术语 - 字符绘制核心：
//				字符块：          基本的字符绘制单位，字符块可以有单个或多个字符，表示一次绘制。
//				单行块：          基本的行绘制单位，容纳一组字符块，表示一行绘制。且可以为空行。
//				基础字符：        指通过动态参数对象控制的字符，可见"baseParam"的参数。能直接使用h5画笔进行绘制。
//				底层字符：        指通过字符串控制的字符，"@@@xxx"和"@@@xxx[]"格式。需经历 样式阶段、再处理阶段、统计结束阶段 的解析，才能绘制的基础字符。
//				窗口字符：        指通过字符串控制的字符，"\xxx"、"\xxx[]"和"<xxx>"格式。需经历 优先指代阶段、表达式阶段、指代字符阶段、效果字符阶段、逐个绘制阶段 的解析，才能绘制的基础字符。
//				范围盒：          指绘制文本的实际范围，因为并不是所有文本都会在全画布范围内进行绘制。关键词"box"，范围能在上侧左侧右侧进行缩小，但文本会全部从下侧挤出。
//				字符拆散：        字符块可以有单个或多个字符，但有时多个字符不好处理，需要拆散。拆散分成 字符拆散-全部、字符拆散-当前行 两种拆散方法。
//				常规换行：        通过在字符串中添加底层字符（@@@-or）而实现的换行功能。
//				手动换行：        通过在字符串中添加底层字符（@@@-br）而实现的换行功能。
//				自动换行：        通过参数配置或添加底层字符（@@@-ws）而实现的换行功能。自动换行会无视常规换行（@@@-or），保留手动换行（@@@-br）。可见函数 自动换行处理，自动换行必然拆散全部字符。
//				图标字符：        属于底层字符，在再处理阶段解析，需要消耗一个字符块，并绘制出一个图标。
//				字符块贴图：      指能在画布上绘制可以动的贴图对象，由于该功能已强大到超出bitmap的掌控范围，所以单独在 窗口字符贴图核心 中控制。
//				全重置字符：      属于底层字符，在样式阶段解析，重置所有样式为 全局默认值。
//				全局默认值：      新建的所有贴图/窗口所使用的 默认值。（继承bitmap的"自带参数"或"准备绘制配置"的函数）子插件将其分成了 所有文本、对话框 两处的全局默认值配置。
//			  名词术语 - 窗口字符核心：
//				转义：            指将字符串转成其它字符串的过程。
//				转义字符：        在该核心中，特指 \ < > 用于转义的字符。
//				字符应用A底层：   指直连 底层字符应用 的窗口字符。
//				字符应用B原版：   指游戏编辑器默认定义的窗口字符。
//				字符应用C扩展：   指除了 字符应用A和B，该核心额外提供的窗口字符。
//				优先指代：        优先指代阶段用的字符，识别\xxx[]的字符串，最先转义成其它的字符。
//				表达式：          表达式阶段用的字符，识别<xxx>的字符串，并转义成其它的字符。
//				指代字符：        指代字符阶段用的字符，识别\xxx或\xxx[]的字符串，并转义成其它的字符。
//				效果字符：        效果字符阶段用的字符，识别\xxx或\xxx[]的字符串，并实现效果的字符。
//				消息输入字符：    消息输入阶段用的字符，识别\xxx或\xxx[]的字符串，并进行 逐个绘制 设置。
//				逐个绘制：        独立函数功能集，能拆散全部文本，且每隔几帧绘制一个常规字符。只有此功能集支持消息输入字符。
//		
//		★其它说明细节：
//			暂无
//		
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_COWC_PluginTip_curName = "Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心";
	DrillUp.g_COWC_PluginTip_baseList = ["Drill_CoreOfCharDraw.js 系统-字符绘制核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COWC_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COWC_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COWC_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COWC_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COWC_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfWindowCharacter = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWindowCharacter');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfCharDraw ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_COWC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COWC_pluginCommand.call(this, command, args);
	this.drill_COWC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_COWC_pluginCommand = function( command, args ){
	if( command === ">窗口字符核心" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG字符应用A底层测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COWC_BlockText_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COWC_BlockText_DebugEnabled = false;
				}
			}
			if( type == "DEBUG字符应用B原版测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COWC_OrgText_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COWC_OrgText_DebugEnabled = false;
				}
			}
			if( type == "DEBUG字符应用C扩展测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COWC_ExText_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COWC_ExText_DebugEnabled = false;
				}
			}
			
			if( type == "DEBUG窗口字符的逐个绘制测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COWC_timing_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COWC_timing_DebugEnabled = false;
				}
			}
		}
	}
};
	
	
	
//#############################################################################
// ** 【标准模块】☆流程介绍 标准模块
//#############################################################################
//##############################
// * 流程介绍『字符主流程』 - 绘制文本【标准函数】【Window_Base】
//			
//			参数：	> org_text 字符串                   （含 \v\c[] 的文本）
//					> options 动态参数对象              （参数集合，必须提供）
//					> options['infoParam']  动态参数对象（只读配置信息，可为空，相关参数见 文档 ）
//					> options['baseParam']  动态参数对象（基础字符配置，可为空，相关参数见 文档 ）
//					> options['blockParam'] 动态参数对象（底层单块配置，可为空，相关参数见 文档 ）
//					> options['rowParam']   动态参数对象（底层单行配置，可为空，相关参数见 文档 ）
//			返回：	> 无
//			
//			说明：	> 该函数是一次性全部绘制。
//					> 该函数建议直接调用，不建议自己拆散流程来使用。（字符绘制核心的可以拆散是因为其结构非常底层）
//					> 该函数封装了 窗口字符 的规则，支持\v\c[]窗口字符，并且@@@xxx的底层字符也能使用。
//##############################
Window_Base.prototype.drill_COWC_drawText = function( org_text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置【系统 - 字符绘制核心】
	var temp_bitmap = this.contents;
	temp_bitmap.drill_COWC_timing_setEnabled( false );
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
	$gameTemp.drill_COCD_initOptions( cur_options, temp_bitmap );
	
	// > 『字符主流程』 - 解析窗口字符（Window_Base）
	var rowBlock_list = this.drill_COWC_analysisOrgText_InWindow( org_text, cur_options );
	
	// > 『字符核心流程』 - 绘制 单行块列表【系统 - 字符绘制核心】
	for(var i = 0; i < rowBlock_list.length; i++){
		var rowBlock = rowBlock_list[i];
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock );
	}
	
	// > 『字符贴图流程』 - 刷新字符块贴图（可选）【窗口字符 - 窗口字符贴图核心】
	//	（父贴图执行）sprite.drill_COWCSp_sprite_refreshAllSprite();
};
//##############################
// * 流程介绍『字符主流程』 - 绘制文本【标准函数】【Bitmap】
//			
//			参数：	> org_text 字符串                   （含 \v\c[] 的文本）
//					> options 动态参数对象              （参数集合，必须提供）
//					> options['infoParam']  动态参数对象（只读配置信息，可为空，相关参数见 文档 ）
//					> options['baseParam']  动态参数对象（基础字符配置，可为空，相关参数见 文档 ）
//					> options['blockParam'] 动态参数对象（底层单块配置，可为空，相关参数见 文档 ）
//					> options['rowParam']   动态参数对象（底层单行配置，可为空，相关参数见 文档 ）
//			返回：	> 无
//			
//			说明：	> 该函数是一次性全部绘制。
//					> 该函数建议直接调用，不建议自己拆散流程来使用。（字符绘制核心的可以拆散是因为其结构非常底层）
//					> 该函数封装了 窗口字符 的规则，支持\v\c[]窗口字符，并且@@@xxx的底层字符也能使用。
//##############################
Bitmap.prototype.drill_COWC_drawText = function( org_text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置【系统 - 字符绘制核心】
	this.drill_COWC_timing_setEnabled( false );
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
	$gameTemp.drill_COCD_initOptions( cur_options, this );
	
	// > 『字符主流程』 - 解析窗口字符（Bitmap）
	var rowBlock_list = this.drill_COWC_analysisOrgText_InBitmap( org_text, cur_options );
	
	// > 『字符核心流程』 - 绘制 单行块列表【系统 - 字符绘制核心】
	for(var i = 0; i < rowBlock_list.length; i++){
		var rowBlock = rowBlock_list[i];
		this.drill_COCD_drawRowBlock( rowBlock );
	}
	
	// > 『字符贴图流程』 - 刷新字符块贴图（可选）【窗口字符 - 窗口字符贴图核心】
	//	（父贴图执行）sprite.drill_COWCSp_sprite_refreshAllSprite();
};

//#############################################################################
// ** 【标准模块】☆可选流程介绍 标准模块
//#############################################################################
//##############################
// * 可选流程介绍『字符主流程』 - 获取最大宽度【标准函数】【Window_Base】
//			
//			参数：	> org_text 字符串       （含 \v\c[] 的文本）
//					> options 动态参数对象  （参数集合，必须提供，与前面 主流程 一样）
//			返回：	> 数字                  （最大宽度）
//			
//			说明：	> 该函数会自动先解析窗口字符，然后返回结果值，可以反复调用。
//					> 该函数计算过程中，不会用到 canvasWidth 或 canvasHeight，因此参数可以赋任意值。
//##############################
Window_Base.prototype.drill_COWC_getOrgTextWidth = function( org_text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置【系统 - 字符绘制核心】
	var temp_bitmap = this.contents;
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
	$gameTemp.drill_COCD_initOptions( cur_options, temp_bitmap );
	
	// > 『字符主流程』 - 解析窗口字符（Window_Base）
	var rowBlock_list = this.drill_COWC_analysisOrgText_InWindow( org_text, cur_options );
	
	// > 最大宽度
	var max_width = 0;
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var cur_width = rowBlock.drill_rowBlock_getRowWidth();
		max_width = Math.max( cur_width, max_width );
	}
	return max_width;
};
//##############################
// * 可选流程介绍『字符主流程』 - 获取总高度【标准函数】【Window_Base】
//			
//			参数：	> org_text 字符串       （含 \v\c[] 的文本）
//					> options 动态参数对象  （参数集合，必须提供，与前面 主流程 一样）
//			返回：	> 数字                  （总高度）
//			
//			说明：	> 该函数会自动先解析窗口字符，然后返回结果值，可以反复调用。
//					> 该函数计算过程中，不会用到 canvasWidth 或 canvasHeight，因此参数可以赋任意值。
//##############################
Window_Base.prototype.drill_COWC_getOrgTextHeight = function( org_text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置【系统 - 字符绘制核心】
	var temp_bitmap = this.contents;
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
	$gameTemp.drill_COCD_initOptions( cur_options, temp_bitmap );
	
	// > 『字符主流程』 - 解析窗口字符（Window_Base）
	var rowBlock_list = this.drill_COWC_analysisOrgText_InWindow( org_text, cur_options );
	
	// > 总高度
	var height = 0;
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		height += rowBlock.drill_rowBlock_getRowHeight();
	}
	return height;
};
/*
	没有函数 获取最大宽度【标准函数】【Bitmap】
	没有函数 获取总高度【标准函数】【Bitmap】
	
	Window_Base的原因：
		之所以会提供下面两个函数，是因为窗口对象在 创建之后 才进行高宽变化，内容自适应。
		Window_Base.prototype.drill_COWC_getOrgTextWidth
		Window_Base.prototype.drill_COWC_getOrgTextHeight
	
	Bitmap的原因：
		画布对象完全不具备 创建之后 再变高宽的条件，而且画布是一次性直接创建。
		还不如直接写一个 拆散的流程函数，在创建画布之前，就把高宽的情况计算完毕。
		拆散的流程，可见插件 窗口字符贴图核心 的高宽计算。
*/
//##############################
// * 可选流程介绍『字符主流程』 - DEBUG显示画布范围【标准函数】【Bitmap】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 测试用函数，能显示画布的边界范围。
//##############################
Bitmap.prototype.drill_COWC_debug_drawRect = function(){
	this.drill_COWC_strokeRect( 0, 0, this.width, this.height, "#22aa22", 2, "miter" );
};

//=============================================================================
// ** ☆流程实现
//
//			说明：	> 该模块专门实现 字符主流程 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 流程实现 - 窗口字符版本标记
//==============================
var _drill_COWC_drawText_functionExist = true;
//==============================
// * 流程实现 - 解析窗口字符（Window_Base）（可继承）
//			
//			说明：	> 该函数被功能模块 窗口标记 继承，用于区分窗口类型用。（注意Bitmap没有此区分功能）
//==============================
Window_Base.prototype.drill_COWC_analysisOrgText_InWindow = function( org_text, options ){
	
	//	（通过继承此函数，来实现针对窗口的初始化设置）
	//	（可见函数 drill_COWC_initWindowOptions ）
	
	return this.contents.drill_COWC_analysisOrgText_InBitmap( org_text, options );
}
//==============================
// * 流程实现 - 解析窗口字符（Bitmap）
//==============================
Bitmap.prototype.drill_COWC_analysisOrgText_InBitmap = function( org_text, options ){
	/* 该函数条件十分多变，无法优化，只要尝试优化就会变成bug。可见 优化记录。 */
	
	// > 『字符主流程』 - 窗口字符转底层字符
	var converted_text = $gameTemp.drill_COWC_convertOrgText( org_text );
	
	// > 『字符核心流程』 - 解析底层字符【系统 - 字符绘制核心】
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( converted_text, options );
	
	return rowBlock_list;
}
//==============================
// * 流程实现 - 窗口字符转底层字符
//			
//			参数：	> org_text 字符串（转换前的含 \v\c[] 的文本）
//			返回：	> 字符串         （转换后的含 @@@xx 的文本）
//==============================
Game_Temp.prototype.drill_COWC_convertOrgText = function( org_text ){
	var result_text = org_text;
	
	// > 『转义字符兼容』 - 『底层字符定义』（@@@-ll）
	result_text = result_text.replace( /[\\][\\]/g, "@@@-ll" );		//（"\"反斜杠本身）
	// > 『转义字符兼容』 - 『窗口字符定义』字符应用B原版 - 立即显示单行（\>、\<）
	result_text = result_text.replace( /[\\][\>]/g, "@@@_s1" );		//（消息输入字符，立刻显示_单行，写在这里是防止错误">"转义）
	result_text = result_text.replace( /[\\][\<]/g, "@@@_s2" );		//（消息输入字符，取消立刻显示，写在这里是防止错误"<"转义）
	
	
	// > 窗口字符转底层字符 - 优先指代 阶段
	result_text = this.drill_COWC_convertFirstTransform( result_text ); //（此阶段结束后，会变成新的字符串）
	
	// > 窗口字符转底层字符 - 优先指代 阶段 - 『窗口字符定义』字符应用A底层 - 常规换行（\n、\r）
	result_text = result_text.replace( /[\n\r]/g, "@@@-or" );
	
	
	// > 『转义字符兼容』 - 第二次转换
	//		（由于 \ < > 三个字符在此处起重要作用，因此需要把奇怪组合的字符再进行一遍过滤）
	result_text = result_text.replace( /[\\][\\]/g, "@@@-ll" );
	result_text = result_text.replace( /[\\][\>]/g, "@@@_s1" );
	result_text = result_text.replace( /[\\][\<]/g, "@@@_s2" );
	
	
	// > 窗口字符转底层字符 - 表达式 阶段
	result_text = this.drill_COWC_convertExpression( result_text );
	
	// > 窗口字符转底层字符 - 指代字符 阶段
	result_text = this.drill_COWC_convertTransform( result_text );
	
	// > 窗口字符转底层字符 - 效果字符 阶段
	result_text = this.drill_COWC_convertEffect( result_text );
	
	
	// > 『转义字符兼容』 - 恢复字符
	result_text = result_text.replace( /@@@-ll/g, "\\" );
	
	return result_text;
}
//==============================
// * 流程实现 - 子窗口强制继承
//==============================
Window_Message.prototype.drill_COWC_drawText = function( org_text, options ){
	Window_Base.prototype.drill_COWC_drawText.call( this, org_text, options );
}
Window_Message.prototype.drill_COWC_analysisOrgText_InWindow = function( org_text, options ){
	return Window_Base.prototype.drill_COWC_analysisOrgText_InWindow.call( this, org_text, options );
}
Window_Message.prototype.drill_COWC_getOrgTextWidth = function( org_text, options ){
	return Window_Base.prototype.drill_COWC_getOrgTextWidth.call( this, org_text, options );
}
Window_Message.prototype.drill_COWC_getOrgTextHeight = function( org_text, options ){
	return Window_Base.prototype.drill_COWC_getOrgTextHeight.call( this, org_text, options );
}


//=============================================================================
// ** ☆DEBUG流程测试
//
//			说明：	> 此模块控制 DEBUG流程测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG流程测试 - 帧刷新（地图界面）
//==============================
var _drill_COWC_debugOrgTextMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COWC_debugOrgTextMap_update.call(this);
	
	// > 创建贴图（字符应用A底层）
	if( $gameTemp._drill_COWC_BlockText_DebugEnabled == true ){
		$gameTemp._drill_COWC_BlockText_DebugEnabled = undefined;
		this.drill_COWC_BlockText_createDebugWindow();
	}
	// > 销毁贴图（字符应用A底层）
	if( $gameTemp._drill_COWC_BlockText_DebugEnabled == false ){
		$gameTemp._drill_COWC_BlockText_DebugEnabled = undefined;
		if( this._drill_COWC_BlockText_DebugWindow != undefined ){
			this.removeChild(this._drill_COWC_BlockText_DebugWindow);
			this._drill_COWC_BlockText_DebugWindow = undefined;
		}
	}
	
	// > 创建贴图（字符应用B原版）
	if( $gameTemp._drill_COWC_OrgText_DebugEnabled == true ){
		$gameTemp._drill_COWC_OrgText_DebugEnabled = undefined;
		this.drill_COWC_OrgText_createDebugWindow();
	}
	// > 销毁贴图（字符应用B原版）
	if( $gameTemp._drill_COWC_OrgText_DebugEnabled == false ){
		$gameTemp._drill_COWC_OrgText_DebugEnabled = undefined;
		if( this._drill_COWC_OrgText_DebugWindow != undefined ){
			this.removeChild(this._drill_COWC_OrgText_DebugWindow);
			this._drill_COWC_OrgText_DebugWindow = undefined;
		}
	}
	
	// > 创建贴图（字符应用C扩展）
	if( $gameTemp._drill_COWC_ExText_DebugEnabled == true ){
		$gameTemp._drill_COWC_ExText_DebugEnabled = undefined;
		this.drill_COWC_ExText_createDebugWindow();
	}
	// > 销毁贴图（字符应用C扩展）
	if( $gameTemp._drill_COWC_ExText_DebugEnabled == false ){
		$gameTemp._drill_COWC_ExText_DebugEnabled = undefined;
		if( this._drill_COWC_ExText_DebugWindow != undefined ){
			this.removeChild(this._drill_COWC_ExText_DebugWindow);
			this._drill_COWC_ExText_DebugWindow = undefined;
		}
	}
}
//==============================
// * DEBUG流程测试 - 创建贴图（字符应用A底层）
//==============================
Scene_Map.prototype.drill_COWC_BlockText_createDebugWindow = function() {
	
	// > 销毁贴图
	if( this._drill_COWC_BlockText_DebugWindow != undefined ){
		this.removeChild(this._drill_COWC_BlockText_DebugWindow);
		this._drill_COWC_BlockText_DebugWindow = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 40, 736, 544 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_COWC_BlockText_DebugWindow = temp_window;
	
	// > 绘制 - DEBUG显示画布范围
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_COWC_PluginTip_curName + "】<br>" + 
				"此处的字符是指直连 字符绘制核心 功能的字符，脚本区分用的类型，了解即可。<br>" + 
				"当前测试所有 字符应用A底层 的效果，如下： <br>" + 
				"\\debug[显示字符方框]" + 
				
				"\\c[24]》字符应用A底层-表达式：\\fr<br>" + 
				"    < br >  手动换行  （这里不展示效果）  \\fr<br>" + 
				"    < WordWrap >  自动换行  （这里不展示效果）  \\fr<br>" + 
				
				"\\c[24]》字符应用A底层-指代字符：\\fr<br>" + 
				"    \\\\\\\\  两个斜杠表示单独的一个'\\'  \\fr<br>" + 
				
				"\\c[24]》字符应用A底层-效果字符：\\fr<br>" + 
				"    \\\\px[10]  字符X偏移  \\px[10]测试的字符  \\fr<br>" + 
				"    \\\\py[-10]  字符X偏移  \\py[-10]测试的字符  \\fr<br>" + 
				"    \\\\c[6]  文本颜色  \\c[6]测试的字符  \\fr<br>" + 
				"    \\\\fb[on] 和 \\\\fb[off]  字体加粗/关闭加粗  \\fb[on]测试的\\fb[off]字符  \\fr<br>" + 
				"    \\\\fi[on] 和 \\\\fi[off]  字体倾斜/关闭倾斜  \\fi[on]测试的\\fi[off]字符  \\fr<br>" + 
				"    \\\\fs[12]  修改字体大小  \\fs[12]测试的字符（字体大小最小为12像素）\\fr<br>" + 
				"    \\\\{ 和 \\\\}  缩放字体大小  测\\{试\\}的\\{字\\}符  \\fr<br>" + 
				"    \\\\ff[HappyFont]  字体名称  \\ff[HappyFont]测试的字符\\fs[16]（需字体管理器插件,否则不生效）\\fr<br>" + 
				"    \\\\i[9]  图标字符  测试的\\i[9]  \\fr<br>" + 
				
				"\\c[24]》字符应用A底层-效果字符全叠加：\\fr<br>" +
				"    \\\\px[3]\\\\py[3]\\\\c[24]\\\\ff[HappyFont]\\\\fi[on]\\\\{" + 
				"    \\px[3]\\py[3]\\c[24]\\ff[HappyFont]\\fi[on]\\{测试的字符全部叠加\\fr<br>" +
				
				"\\c[24]》字符应用A底层-消息输入字符：\\fr  无";
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	temp_window.drill_COWC_drawText( text, options );
}
//==============================
// * DEBUG流程测试 - 创建贴图（字符应用B原版）
//==============================
Scene_Map.prototype.drill_COWC_OrgText_createDebugWindow = function() {
	
	// > 销毁贴图
	if( this._drill_COWC_OrgText_DebugWindow != undefined ){
		this.removeChild(this._drill_COWC_OrgText_DebugWindow);
		this._drill_COWC_OrgText_DebugWindow = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 40, 736, 544 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_COWC_OrgText_DebugWindow = temp_window;
	
	// > 绘制 - DEBUG显示画布范围
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_COWC_PluginTip_curName + "】<br>" + 
				"字符应用B原版是指游戏编辑器默认具备的功能字符，详细可以看看文档介绍。<br>" + 
				"当前测试所有 字符应用B原版 的效果，如下： <br>" + 
				"\\debug[显示字符方框]" + 
				
				"\\c[24]》字符应用B原版-表达式：\\fr<br>" + 
				"    无<br>" + 
				
				"\\c[24]》字符应用B原版-指代字符：\\fr<br>" + 
				"    \\\\v[21]  变量21的值  '\\v[21]'  \\fr<br>" + 
				"    \\\\v[\\\\v[21]]  变量[变量21的值]的值  '\\v[\\v[21]]'  \\fr<br>" + 
				"    \\\\n[5]  角色5的名字  '\\n[5]'  \\fr<br>" + 
				"    \\\\p[1]  玩家领队(玩家队员1)的名字  '\\p[1]'  \\fr<br>" + 
				"    \\\\p[2]  玩家队员2的名字  '\\p[2]'  \\fr<br>" + 
				"    \\\\g  货币单位  '\\g'  \\fr<br>" + 
				"    \\\\\\\\  两个斜杠表示单独的一个'\\'  \\fr<br>" + 
				
				"\\c[24]》字符应用B原版-效果字符：\\fr<br>" + 
				"    \\\\c[6]  文本颜色  \\c[6]测试的字符  \\fr<br>" + 
				"    \\\\i[9]  图标字符  \\i[9]测试的字符  \\fr<br>" + 
				"    \\\\{ 和 \\\\}  缩放字体大小  测\\{试\\}的\\{字\\}符  \\fr<br>" + 
				
				"\\c[24]》字符应用B原版-消息输入字符：\\fr<br>" + 
				"    \\\\$  打开金钱窗口  （对话框专用，此处无法演示） <br>" + 
				"    \\\\.  等待0.25秒  （去看逐个绘制流程测试） <br>" + 
				"    \\\\|  等待1.00秒  （去看逐个绘制流程测试） <br>" + 
				"    \\\\!  等待按键输入  （去看逐个绘制流程测试） <br>" + 
				"    \\\\>  立刻显示一行内剩余文字  （去看逐个绘制流程测试） <br>" + 
				"    \\\\<  取消立刻显示  （去看逐个绘制流程测试） <br>" + 
				"    \\\\^  显示文本后不等待输入  （去看逐个绘制流程测试） <br>";
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	temp_window.drill_COWC_drawText( text, options );
	
}
//==============================
// * DEBUG流程测试 - 创建贴图（字符应用C扩展）
//==============================
Scene_Map.prototype.drill_COWC_ExText_createDebugWindow = function() {
	
	// > 销毁贴图
	if( this._drill_COWC_ExText_DebugWindow != undefined ){
		this.removeChild(this._drill_COWC_ExText_DebugWindow);
		this._drill_COWC_ExText_DebugWindow = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 40, 736, 544 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_COWC_ExText_DebugWindow = temp_window;
	
	// > 绘制 - DEBUG显示画布范围
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_COWC_PluginTip_curName + "】<br>" + 
				"此处的字符是指除了 字符应用A和B，该插件提供的额外的字符。<br>" + 
				"当前测试所有 字符应用C扩展 的效果，如下： <br>" + 
				"\\debug[显示字符方框]" + 
				
				"\\c[24]》字符应用C扩展-表达式：\\fr<br>" + 
				"    < 复制:2:文本 >  复制2次文本  '<复制:2:文本>'<br>" + 
				"    < 复制:\v[21]:文本 >  复制变量21次数的文本  '<复制:\v[21]:文本>'<br>" + 
				"    < 单选:21:文本A:文本B >  根据开关21的值，on为文本A，off为文本B  （这里不演示）<br>" + 
				
				"\\c[24]》字符应用C扩展-指代字符：\\fr<br>" + 
				"    \\\\ac[5]  角色5的职业名  '\\ac[5]'  <br>" + 
				"    \\\\an[5]  角色5的昵称（小名）  '\\an[5]'  <br>" + 
				"    \\\\pc[1]  玩家领队(玩家队员1)的职业名  '\\pc[1]'  <br>" + 
				"    \\\\pc[2]  玩家队员1的职业名  '\\pc[2]'  <br>" + 
				"    \\\\pn[2]  玩家队员1的昵称（小名）  '\\pn[2]'  <br>" + 
				"    \\\\nc[16]  第16个职业名  '\\nc[16]'  <br>" + 
				"    \\\\ni[1]  第1个物品名  '\\ni[1]'  <br>" + 
				"    \\\\nw[1]  第1个武器名  '\\nw[1]'  <br>" + 
				"    \\\\na[1]  第1个防具名  '\\na[1]'  <br>" + 
				"    \\\\ns[1]  第1个技能名  '\\ns[1]'  <br>" + 
				"    \\\\ne[1]  第1个敌人名  '\\ne[1]'  <br>" + 
				"    \\\\nt[1]  第1个状态名  '\\nt[1]'  <br>" + 
				"    \\\\ii[1]  第1个物品名+图标  '\\ii[1]'  <br>" + 
				"    \\\\iw[1]  第1个武器名+图标  '\\iw[1]'  <br>" + 
				"    \\\\ia[1]  第1个防具名+图标  '\\ia[1]'  <br>" + 
				"    \\\\is[1]  第1个技能名+图标  '\\is[1]'  <br>" + 
				"    \\\\it[1]  第1个状态名+图标  '\\it[1]'  <br>" + 
				
				"";
				
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	temp_window.drill_COWC_drawText( text, options );
}
//==============================
// * DEBUG流程测试 - 描边矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> color 字符串    （颜色）
//					> lineWidth 数字  （线宽）
//					> lineJoin 字符串 （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_COWC_strokeRect = function( x, y, width, height, color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.strokeStyle = color;			//（b.设置样式）
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
    painter.strokeRect(x, y, width, height);//（c.路径填充/描边，strokeRect）
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};



//#############################################################################
// ** 【标准模块】☆优先指代阶段 标准模块
//#############################################################################
//##############################
// * 优先指代阶段 - 组合符配置【标准接口】【Game_Temp】
//			
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，包含"\"）
//					> command 字符串    （当前字符的指令）
//					> args 字符串列表   （当前字符的参数列表）
//			返回：	> 无
//			
//			说明：	> 指代字符，可将 "\xxx[xxx]" 转成特定的字符串。
//					> 如果解析匹配成功，需要调用提交函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COWC_firstTransform_processCombined = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 优先指代阶段 - 组合符提交【标准函数】【Game_Temp】
//			
//			参数：	> resultString 字符串（转义后的字符）
//			返回：	> 无
//			
//			说明：	> 此函数只在 优先指代阶段+组合符 有效。
//##############################
Game_Temp.prototype.drill_COWC_firstTransform_submitCombined = function( resultString ){
	this._drill_COWC_firstTransform_success = true;
	this._drill_COWC_firstTransform_resultString = resultString;
}

//=============================================================================
// ** ☆优先指代实现
//
//			说明：	> 指代字符阶段在 表达式阶段 之后执行。详细可以看看 窗口字符的绘制流程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 优先指代实现 - 执行字符转义
//==============================
Game_Temp.prototype.drill_COWC_convertFirstTransform = function( text ){
	
	// > 切割字符串
	var text_list = this.drill_COWC_splitFirstTransformText( text );
	//alert( text_list );
	
	// > 执行字符转义
	var result_text = "";
	var need_orgText = false;
	for(var i = 0; i < text_list.length; i++ ){
		var cur_text = text_list[i];
		if( cur_text == "" ){ continue; }
		
		// > 普通字符串时
		if( cur_text.charAt(0) != "\\" ){
			result_text += cur_text;
			need_orgText = false;
			continue;
		}
		// > 强制输出原文
		if( need_orgText == true ){
			need_orgText = false;
			result_text += cur_text;
			continue;
		}
		// > 单个"\"字符时（这个字符后面，强制输出原文，不管是"\"还是"\aaa"）
		if( cur_text.length == 1 ){
			need_orgText = true;
			continue;
		}
		
		// > 简单符时（"\aaa"）
		if( cur_text.charAt( cur_text.length-1 ) != "]" ){
			//（不操作）
			result_text += cur_text;
		
		// > 组合符时（"\aaa[bbb]"，最小闭包）
		}else{
			var matched_index = result_text.length;
			var matched_str = cur_text;
			var left_index = cur_text.indexOf("[");
			var command = cur_text.substring( 1,left_index );
			var args = cur_text.substring( left_index+1,cur_text.length-1 ).split(/[:：]/g);
			
			
			// > 提交数据 初始化
			this._drill_COWC_firstTransform_success = false;
			this._drill_COWC_firstTransform_resultString = "";
			
			// > 执行 子函数
			this.drill_COWC_firstTransform_processCombined( matched_index, matched_str, command, args );
			
			// > 如果字符提交，则执行转义
			if( this._drill_COWC_firstTransform_success == true ){
				result_text += this._drill_COWC_firstTransform_resultString;
			}else{
				result_text += cur_text;
			}
		}
	}
	
	return result_text;
};
//==============================
// * 优先指代实现 - 切割字符串（最小闭包 切割）
//
//			说明：	> 识别 \aa[ss] 的闭包结构，遇到 \aaa[sss][ccc] 时，识别其中的 \aaa[sss] 。
//					> "\"为识别的终止符。
//==============================
Game_Temp.prototype.drill_COWC_splitFirstTransformText = function( text ){
	var result_list = [];			//结果列表
	var search_pos = 0;				//字符串索引位置（边切边找）
	var re = /[0-9a-zA-Z_!\-\{\}\$\.\|\^]/;
	
	// > 开始搜索
	for( var n = 0; n < text.length; n++ ){
		
		// > 找到 "\" 符号
		var cur_startPos = text.indexOf("\\", search_pos);
		if( cur_startPos == -1 ){ break; }	//（没有符号，直接跳出）
		
		// > 搜索简单符（"\aaa"）
		var cur_endPos = cur_startPos +1;
		for( var m = 0; m < text.length; m++ ){
			var ch = text.charAt( cur_endPos );
			if( re.test(ch) == true ){	//（是数字、字母、下划线则继续，见re的设置）
				cur_endPos += 1;
				continue;	//（注意这是在第二个for里面）
			}else{
				break;		//（注意这是在第二个for里面）
			}
		}
		
		// > 搜索组合符（"\aaa[bbb]"，最小闭包）
		if( text.charAt( cur_endPos ) == "[" ){
			var cur_leftPos = cur_endPos;
			
			// > 搜索组合符 - 找到括号闭包位置（最小闭包）【系统 - 字符绘制核心】
			var cur_rightPos = this.drill_COCD_getMinRightBracketPos( text, cur_leftPos, "[" ); 
			if( cur_rightPos != -1 ){
				cur_endPos = cur_rightPos +1;
			}else{
				//（不修改 cur_endPos 位置）
			}
		}
		
		// > 切割字符串 - 能切时
		var temp_text = text.substring( cur_startPos, cur_endPos );
		if( temp_text.length >= 2 ){
			var str = text.substring( search_pos, cur_startPos );
			if( str != "" ){ result_list.push( str ); }
			result_list.push( temp_text );
			search_pos = cur_endPos;
			
		// > 切割字符串 - 不能切时（从找到的"\"位置再前进一个字符）
		}else{
			var str = text.substring( search_pos, cur_startPos +1 );
			if( str != "" ){ result_list.push( str ); }		//（注意，由于不能切，列表中会出现长度为1的 "\" 字符串的情况）
			search_pos = cur_startPos +1;
		}
	}
	
	// > 最后一个字符串
	var str = text.substring(search_pos);
	if( str != "" ){ result_list.push( str ); }
	
	return result_list;
};

//=============================================================================
// ** ☆窗口字符应用之优先指代
//
//			说明：	> 指代字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之优先指代 - 组合符配置
//==============================
var _drill_COWC_COWC_firstTransform_processCombined_1 = Game_Temp.prototype.drill_COWC_firstTransform_processCombined;
Game_Temp.prototype.drill_COWC_firstTransform_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_firstTransform_processCombined_1.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用B原版 - 变量（\V[1]）『优先指代』
	if( command.toUpperCase() == "V" ){
		if( args.length == 1 ){
			var str = String( $gameVariables.value(Number(args[0])) );
			this.drill_COWC_firstTransform_submitCombined( str );
		}
	}
}



//#############################################################################
// ** 【标准模块】☆表达式阶段 标准模块
//#############################################################################
//##############################
// * 表达式阶段 - 表达式配置【标准接口】【Game_Temp】
//			
//			参数：	> matched_index 数字（当前的索引）
//					> matched_str 字符串（当前的完整结构，包含"<"和">"）
//					> command 字符串    （当前的指令）
//					> args 字符串列表   （当前的参数列表）
//			返回：	> 无
//			
//			说明：	> 表达式字符，可将 "<xxx:xxx:xxx>" 转成特定的字符串，此字符串比指代字符的优先级更高。
//					> 如果解析匹配成功，需要调用提交函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COWC_expression_process = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 表达式阶段 - 表达式提交【标准函数】【Game_Temp】
//			
//			参数：	> result_text 字符串 （表达式转换后的字符串）
//			返回：	> 无
//					
//			说明：	> 此函数只在 表达式阶段 有效。
//##############################
Game_Temp.prototype.drill_COWC_expression_submit = function( result_text ){
	this._drill_COWC_expression_success = true;
	this._drill_COWC_expression_resultText = result_text;
}

//=============================================================================
// ** ☆表达式实现
//
//			说明：	> 表达式阶段是最先执行的转义阶段。详细可以看看 窗口字符的绘制流程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 表达式实现 - 执行表达式
//==============================
Game_Temp.prototype.drill_COWC_convertExpression = function( text ){
	
	// > 切割字符串
	var text_list = this.drill_COWC_splitExpressionText( text );
	//alert( text_list );
	
	// > 执行表达式
	var result_text = "";
	for(var i = 0; i < text_list.length; i++ ){
		var cur_text = text_list[i];
		if( cur_text == "" ){ continue; }
		
		// > 普通字符串时
		if( cur_text.charAt(0) != "<" ){
			result_text += cur_text;
			continue;
		}
		
		// > "<xxx:xxx:xxx>" 格式的字符串时
		var matched_index = result_text.length;
		var matched_str = cur_text;
		var args = cur_text.substring( 1,cur_text.length-1 ).split(/[:：]/g);
		var command = args.shift();
		
		
		// > 提交数据 初始化
		this._drill_COWC_expression_success = false;
		this._drill_COWC_expression_resultText = "";
		this._drill_COWC_expression_curAllText = result_text;	//后台参数 - 当前执行时的全部文本
		this._drill_COWC_expression_removeCharNum = 0;			//后台参数 - 减去字符数
		
		// > 执行 子函数
		this.drill_COWC_expression_process( matched_index, matched_str, command, args );
		
		// > 如果字符提交，则执行转义
		if( this._drill_COWC_expression_success == true ){
			
			// > 减去字符
			if( this._drill_COWC_expression_removeCharNum > 0 ){ result_text = result_text.substring( 0, result_text.length - this._drill_COWC_expression_removeCharNum ); }
			
			result_text += this._drill_COWC_expression_resultText;
		}else{
			result_text += cur_text;
		}
	}
	return result_text;
};
//==============================
// * 表达式实现 - 切割字符串
//
//			说明：	> 该函数将识别字符块的 <xxx:xxx:xxx> 格式，切割字符串并形成字符串列表。
//					> 只要符合格式就切。
//==============================
Game_Temp.prototype.drill_COWC_splitExpressionText = function( text ){
	var result_list = [];
	var search_pos = 0;		//字符串索引位置（每次寻找下一个">"）
	var step_pos = 0;		//字符串索引位置（找成功时记录位置，找失败时不操作）
	
	// > 开始搜索
	for( var n = 0; n < text.length; n++ ){
		
		// > 先找到 ">" 符号
		var cur_largerPos = text.indexOf(">", search_pos);
		if( cur_largerPos == -1 ){ break; }
		
		// > 再反向找 "<" 符号
		var cur_lowerPos = text.lastIndexOf("<", cur_largerPos);
		if( cur_lowerPos == -1 ){		//没找到时，则继续找
			search_pos = cur_largerPos +1;
			continue;
		}
		if( cur_lowerPos < step_pos ){	//找到的是上一个符号，则继续找
			search_pos = cur_largerPos +1;
			continue;
		}
		
		// > 找到时，拆分字符串
		var str = text.substring( step_pos, cur_lowerPos );
		if( str != "" ){ result_list.push( str ); }
		var str = text.substring( cur_lowerPos, cur_largerPos +1 );
		if( str != "" ){ result_list.push( str ); }
		
		search_pos = cur_largerPos +1;
		step_pos = cur_largerPos +1;
	}
	
	// > 最后一个字符串
	var str = text.substring(step_pos);
	if( str != "" ){ result_list.push( str ); }
	
	return result_list;
}

//=============================================================================
// ** ☆窗口字符应用之表达式（字符应用A底层）
//
//			说明：	> 表达式阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之表达式（字符应用A底层） - 字符转换
//==============================
var _drill_COWC_COWC_expression_process_2 = Game_Temp.prototype.drill_COWC_expression_process;
Game_Temp.prototype.drill_COWC_expression_process = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_expression_process_2.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用A底层 - 手动换行（<br>）
	if( command.toUpperCase() == "BR" ){
		if( args.length == 0 ){
			this.drill_COWC_expression_submit( "@@@-br" );
		}
	}
	
	// > 『窗口字符定义』字符应用A底层 - 自动换行标记（<WordWrap>）
	if( command.toUpperCase() == "WORDWRAP" ){
		if( args.length == 0 ){
			this.drill_COWC_expression_submit( "@@@-ws" );
		}
	}
};

//=============================================================================
// ** ☆窗口字符应用之表达式（字符应用B原版）
//
//			说明：	> 表达式阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//	（无）

//=============================================================================
// ** ☆窗口字符应用之表达式（字符应用C扩展）
//
//			说明：	> 表达式阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之表达式（字符应用C扩展） - 字符转换
//==============================
var _drill_COWC_COWC_expression_process_4 = Game_Temp.prototype.drill_COWC_expression_process;
Game_Temp.prototype.drill_COWC_expression_process = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_expression_process_4.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用C扩展 - 复制内容（<复制:2:文本>、<复制:\v[21]:文本>）
	if( command == "复制" || command == "复" ){
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
			this.drill_COWC_expression_submit( result_str );
		}
	}
	
	// > 『窗口字符定义』字符应用C扩展 - 单选内容（<单选:21:文本A:文本B>）
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
			this.drill_COWC_expression_submit( result_str );
		}
	}
	
	// > 『窗口字符定义』字符应用C扩展 - 分割线（<分割线:单条:厚度[1]:颜色[1]>）
	if( command == "分割线" ){
		if( args.length == 3 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			var temp2 = String(args[2]);
			temp1 = temp1.replace("厚度[","");
			temp1 = temp1.replace("]","");
			temp2 = temp2.replace("颜色[","");
			temp2 = temp2.replace("]","");
			
			if( type == "单条" ){
				var result_str = "@@@-is[one:"+ temp1 +":"+ this.drill_COWC_effect_textColor(Number(temp2)) + "]";
				this.drill_COWC_expression_submit( result_str );
			}
			if( type == "两条" ){
				var result_str = "@@@-is[two:"+ temp1 +":"+ this.drill_COWC_effect_textColor(Number(temp2)) + "]";
				this.drill_COWC_expression_submit( result_str );
			}
			if( type == "三条" ){
				var result_str = "@@@-is[three:"+ temp1 +":"+ this.drill_COWC_effect_textColor(Number(temp2)) + "]";
				this.drill_COWC_expression_submit( result_str );
			}
		}
	}
};



//#############################################################################
// ** 【标准模块】☆指代字符阶段 标准模块
//#############################################################################
//##############################
// * 指代字符阶段 - 简单符配置【标准接口】【Game_Temp】
//			
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，包含"\"）
//			返回：	> 无
//			
//			说明：	> 指代字符，可将 "\xxx" 转成特定的字符串。
//					> 如果解析匹配成功，需要调用提交函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COWC_transform_processSimple = function( matched_index, matched_str ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 指代字符阶段 - 简单符提交【标准函数】【Game_Temp】
//			
//			参数：	> endCharIndex 数字  （简单符切割位置）
//					> resultString 字符串（转义后的字符）
//			返回：	> 无
//			
//			说明：	> 此函数只在 指代字符阶段+简单符 有效。
//##############################
Game_Temp.prototype.drill_COWC_transform_submitSimple = function( endCharIndex, resultString ){
	this._drill_COWC_transform_success = true;
	this._drill_COWC_transform_endCharIndex = endCharIndex;
	this._drill_COWC_transform_resultString = resultString;
}
//##############################
// * 指代字符阶段 - 组合符配置【标准接口】【Game_Temp】
//			
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，包含"\"）
//					> command 字符串    （当前字符的指令）
//					> args 字符串列表   （当前字符的参数列表）
//			返回：	> 无
//			
//			说明：	> 指代字符，可将 "\xxx[xxx]" 转成特定的字符串。
//					> 如果解析匹配成功，需要调用提交函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 指代字符阶段 - 组合符提交【标准函数】【Game_Temp】
//			
//			参数：	> resultString 字符串（转义后的字符）
//			返回：	> 无
//			
//			说明：	> 此函数只在 指代字符阶段+组合符 有效。
//##############################
Game_Temp.prototype.drill_COWC_transform_submitCombined = function( resultString ){
	this._drill_COWC_transform_success = true;
	this._drill_COWC_transform_resultString = resultString;
}

//=============================================================================
// ** ☆指代字符实现
//
//			说明：	> 指代字符阶段在 表达式阶段 之后执行。详细可以看看 窗口字符的绘制流程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 指代字符实现 - 执行字符转义
//==============================
Game_Temp.prototype.drill_COWC_convertTransform = function( text ){
	
	// > 切割字符串
	var text_list = this.drill_COWC_splitTransformText( text );
	//alert( text_list );
	
	// > 执行字符转义
	var result_text = "";
	var need_orgText = false;
	for(var i = 0; i < text_list.length; i++ ){
		var cur_text = text_list[i];
		if( cur_text == "" ){ continue; }
		
		// > 普通字符串时
		if( cur_text.charAt(0) != "\\" ){
			result_text += cur_text;
			need_orgText = false;
			continue;
		}
		// > 强制输出原文
		if( need_orgText == true ){
			need_orgText = false;
			result_text += cur_text;
			continue;
		}
		// > 单个"\"字符时（这个字符后面，强制输出原文，不管是"\"还是"\aaa"）
		if( cur_text.length == 1 ){
			need_orgText = true;
			continue;
		}
		
		// > 简单符时（"\aaa"）
		if( cur_text.charAt( cur_text.length-1 ) != "]" ){
			var matched_index = result_text.length;
			var matched_str = cur_text;
			
			
			// > 提交数据 初始化
			this._drill_COWC_transform_success = false;
			this._drill_COWC_transform_endCharIndex = -1;
			this._drill_COWC_transform_resultString = "";
			
			// > 执行 子函数
			this.drill_COWC_transform_processSimple( matched_index, matched_str );
			
			// > 如果字符提交，则执行转义
			//		（简单符需要切割，如\aaaa，其中的\aa被转义为bb，那么输出字符就是bbaa）
			if( this._drill_COWC_transform_success == true &&
				this._drill_COWC_transform_endCharIndex >= 2 ){
				result_text += this._drill_COWC_transform_resultString;
				result_text += matched_str.substring( this._drill_COWC_transform_endCharIndex );
			}else{
				result_text += cur_text;
			}
		
		// > 组合符时（"\aaa[bbb[ccc]]"）
		}else{
			var matched_index = result_text.length;
			var matched_str = cur_text;
			var left_index = cur_text.indexOf("[");
			var command = cur_text.substring( 1,left_index );
			var args = cur_text.substring( left_index+1,cur_text.length-1 ).split(/[:：]/g);
			
			
			// > 提交数据 初始化
			this._drill_COWC_transform_success = false;
			this._drill_COWC_transform_resultString = "";
			
			// > 执行 子函数
			this.drill_COWC_transform_processCombined( matched_index, matched_str, command, args );
			
			// > 如果字符提交，则执行转义
			if( this._drill_COWC_transform_success == true ){
				result_text += this._drill_COWC_transform_resultString;
			}else{
				result_text += cur_text;
			}
		}
	}
	
	return result_text;
};
//==============================
// * 指代字符实现 - 切割字符串（最大闭包 切割）
//==============================
Game_Temp.prototype.drill_COWC_splitTransformText = function( text ){
	var result_list = [];			//结果列表
	var search_pos = 0;				//字符串索引位置（边切边找）
	var re = /[0-9a-zA-Z_!\-\{\}\$\.\|\^]/;
	
	// > 开始搜索
	for( var n = 0; n < text.length; n++ ){
		
		// > 找到 "\" 符号
		var cur_startPos = text.indexOf("\\", search_pos);
		if( cur_startPos == -1 ){ break; }	//（没有符号，直接跳出）
		
		// > 搜索简单符（"\aaa"）
		var cur_endPos = cur_startPos +1;
		for( var m = 0; m < text.length; m++ ){
			var ch = text.charAt( cur_endPos );
			if( re.test(ch) == true ){	//（是数字、字母、下划线则继续，见re的设置）
				cur_endPos += 1;
				continue;	//（注意这是在第二个for里面）
			}else{
				break;		//（注意这是在第二个for里面）
			}
		}
		
		// > 搜索组合符（"\aaa[bbb[ccc]]"）
		if( text.charAt( cur_endPos ) == "[" ){
			var cur_leftPos = cur_endPos;
			
			// > 搜索组合符 - 找到括号闭包位置（最大闭包）【系统 - 字符绘制核心】
			var cur_rightPos = this.drill_COCD_getRightBracketPos( text, cur_leftPos, "[" ); 
			if( cur_rightPos != -1 ){
				cur_endPos = cur_rightPos +1;
			}else{
				//（不修改 cur_endPos 位置）
			}
		}
		
		// > 切割字符串 - 能切时
		var temp_text = text.substring( cur_startPos, cur_endPos );
		if( temp_text.length >= 2 ){
			var str = text.substring( search_pos, cur_startPos );
			if( str != "" ){ result_list.push( str ); }
			result_list.push( temp_text );
			search_pos = cur_endPos;
			
		// > 切割字符串 - 不能切时（从找到的"\"位置再前进一个字符）
		}else{
			var str = text.substring( search_pos, cur_startPos +1 );
			if( str != "" ){ result_list.push( str ); }		//（注意，由于不能切，列表中会出现长度为1的 "\" 字符串的情况）
			search_pos = cur_startPos +1;
		}
	}
	
	// > 最后一个字符串
	var str = text.substring(search_pos);
	if( str != "" ){ result_list.push( str ); }
	
	return result_list;
};

//=============================================================================
// ** ☆窗口字符应用之指代字符（字符应用A底层）
//
//			说明：	> 指代字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之指代字符（字符应用A底层） - 组合符配置
//==============================
var _drill_COWC_COWC_transform_processCombined_2 = Game_Temp.prototype.drill_COWC_transform_processCombined;
Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_transform_processCombined_2.call( this, matched_index, matched_str, command, args );
	//（暂无）
}

//=============================================================================
// ** ☆窗口字符应用之指代字符（字符应用B原版）
//
//			说明：	> 指代字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之指代字符（字符应用B原版） - 简单符配置
//==============================
var _drill_COWC_COWC_transform_processSimple_3 = Game_Temp.prototype.drill_COWC_transform_processSimple;
Game_Temp.prototype.drill_COWC_transform_processSimple = function( matched_index, matched_str ){
	_drill_COWC_COWC_transform_processSimple_3.call( this, matched_index, matched_str );
	
	// > 『窗口字符定义』字符应用B原版 - 货币单位（\G）
	if( matched_str.substring(0,2).toUpperCase() == "\\G" ){	//（注意，这里使用substring，\GA 需要被切成 \G 和 A ）
		this.drill_COWC_transform_submitSimple( 2, TextManager.currencyUnit );
	}
};
//==============================
// * 窗口字符应用之指代字符（字符应用B原版） - 组合符配置
//==============================
var _drill_COWC_COWC_transform_processCombined_3 = Game_Temp.prototype.drill_COWC_transform_processCombined;
Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_transform_processCombined_3.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用B原版 - 变量（\V[1]）
	if( command.toUpperCase() == "V" ){
		if( args.length == 1 ){
			var str = String( $gameVariables.value(Number(args[0])) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用B原版 - 角色名字（\N[1]）
	if( command.toUpperCase() == "N" ){
		if( args.length == 1 ){
			if( Number(args[0]) >= 1 ){
				var str = this.drill_COWC_actorName( Number(args[0]) );
				this.drill_COWC_transform_submitCombined( str );
			}
		}
	}
	// > 『窗口字符定义』字符应用B原版 - 玩家队员名字（\P[1]）
	if( command.toUpperCase() == "P" ){
		if( args.length == 1 ){
			if( Number(args[0]) >= 0 ){
				var str = this.drill_COWC_partyMemberName( Number(args[0]) );
				this.drill_COWC_transform_submitCombined( str );
			}
		}
	}
}
//==============================
// * 窗口字符应用之指代字符（字符应用B原版） - 角色名字（\N[1]）
//==============================
Game_Temp.prototype.drill_COWC_actorName = function( n ){
    var actor = $gameActors.actor(n);
	if( actor == undefined ){ return ""; }
    return actor.name();
};
//==============================
// * 窗口字符应用之指代字符（字符应用B原版） - 玩家队员名字（\P[1]）
//==============================
Game_Temp.prototype.drill_COWC_partyMemberName = function( n ){
    var member = $gameParty.members()[n -1];
	if( member == undefined ){ return ""; }
    return member.name();
};

//=============================================================================
// ** ☆窗口字符应用之指代字符（字符应用C扩展）
//
//			说明：	> 指代字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 组合符配置
//==============================
var _drill_COWC_COWC_transform_processCombined_4 = Game_Temp.prototype.drill_COWC_transform_processCombined;
Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_transform_processCombined_4.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用C扩展 - 职业名称（指定角色）（\AC[n]）
	if( command.toUpperCase() == "AC" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_actorClassName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 昵称（指定角色）（\AN[n]）
	if( command.toUpperCase() == "AN" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_actorNickname( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 -  职业名称（玩家队员）（\PC[n]）
	if( command.toUpperCase() == "PC" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_partyClassName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 昵称（玩家队员）（\PN[n]）
	if( command.toUpperCase() == "PN" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_partyNickname( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	
	// > 『窗口字符定义』字符应用C扩展 - 职业名称（\NC[n]）
	if( command.toUpperCase() == "NC" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_className( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 物品名称（\NI[n]）
	if( command.toUpperCase() == "NI" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_itemName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 武器名称（\NW[n]）
	if( command.toUpperCase() == "NW" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_weaponName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 护甲名称（\NA[n]）
	if( command.toUpperCase() == "NA" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_armorName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 技能名称（\NS[n]）
	if( command.toUpperCase() == "NS" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_skillName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 敌人名称（\NE[n]）
	if( command.toUpperCase() == "NE" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_enemyName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 状态名称（\NT[n]）
	if( command.toUpperCase() == "NT" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_stateName( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	
	// > 『窗口字符定义』字符应用C扩展 - 图标+物品名（\II[n]）
	if( command.toUpperCase() == "II" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_itemNameWithIcon( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 图标+武器名（\IW[n]）
	if( command.toUpperCase() == "IW" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_weaponNameWithIcon( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 图标+护甲名（\IA[n]）
	if( command.toUpperCase() == "IA" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_armorNameWithIcon( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 图标+技能名（\IS[n]）
	if( command.toUpperCase() == "IS" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_skillNameWithIcon( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
	// > 『窗口字符定义』字符应用C扩展 - 图标+状态名（\IT[n]）
	if( command.toUpperCase() == "IT" ){
		if( args.length == 1 ){
			var str = this.drill_COWC_stateNameWithIcon( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
		}
	}
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 角色职业名称（\AC[n]）
//==============================
Game_Temp.prototype.drill_COWC_actorClassName = function( n ){
    var actor = $gameActors.actor(n);
	if( actor == undefined ){ return ""; }
    return actor.currentClass().name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 角色昵称（\AN[n]）
//==============================
Game_Temp.prototype.drill_COWC_actorNickname = function( n ){
    var actor = $gameActors.actor(n);
	if( actor == undefined ){ return ""; }
    return actor.nickname();
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 玩家队员职业名称（\PC[n]）
//==============================
Game_Temp.prototype.drill_COWC_partyClassName = function( n ){
    var actor = $gameParty.members()[n -1];
	if( actor == undefined ){ return ""; }
    return actor.currentClass().name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 玩家队员昵称（\PN[n]）
//==============================
Game_Temp.prototype.drill_COWC_partyNickname = function( n ){
    var actor = $gameParty.members()[n -1];
	if( actor == undefined ){ return ""; }
    return actor.nickname();
};

//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 职业名称（\NC[n]）
//==============================
Game_Temp.prototype.drill_COWC_className = function( n ){
    var data = $dataClasses[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 物品名称（\NI[n]）
//==============================
Game_Temp.prototype.drill_COWC_itemName = function( n ){
    var data = $dataItems[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 武器名称（\NW[n]）
//==============================
Game_Temp.prototype.drill_COWC_weaponName = function( n ){
    var data = $dataWeapons[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 护甲名称（\NA[n]）
//==============================
Game_Temp.prototype.drill_COWC_armorName = function( n ){
    var data = $dataArmors[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 技能名称（\NS[n]）
//==============================
Game_Temp.prototype.drill_COWC_skillName = function( n ){
    var data = $dataSkills[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 敌人名称（\NE[n]）
//==============================
Game_Temp.prototype.drill_COWC_enemyName = function( n ){
    var data = $dataEnemies[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 状态名称（\NT[n]）
//==============================
Game_Temp.prototype.drill_COWC_stateName = function( n ){
    var data = $dataStates[ n ];
	if( data == undefined ){ return ""; }
    return data.name;
};

//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 图标+物品名（\II[n]）
//==============================
Game_Temp.prototype.drill_COWC_itemNameWithIcon = function( n ){
    var data = $dataItems[ n ];
	if( data == undefined ){ return ""; }
    return "@@@-ic[" + data.iconIndex + "]" + data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 图标+武器名（\IW[n]）
//==============================
Game_Temp.prototype.drill_COWC_weaponNameWithIcon = function( n ){
    var data = $dataWeapons[ n ];
	if( data == undefined ){ return ""; }
    return "@@@-ic[" + data.iconIndex + "]" + data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 图标+护甲名（\IA[n]）
//==============================
Game_Temp.prototype.drill_COWC_armorNameWithIcon = function( n ){
    var data = $dataArmors[ n ];
	if( data == undefined ){ return ""; }
    return "@@@-ic[" + data.iconIndex + "]" + data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 图标+技能名（\IS[n]）
//==============================
Game_Temp.prototype.drill_COWC_skillNameWithIcon = function( n ){
    var data = $dataSkills[ n ];
	if( data == undefined ){ return ""; }
    return "@@@-ic[" + data.iconIndex + "]" + data.name;
};
//==============================
// * 窗口字符应用之指代字符（字符应用C扩展） - 图标+状态名（\IT[n]）
//==============================
Game_Temp.prototype.drill_COWC_stateNameWithIcon = function( n ){
    var data = $dataStates[ n ];
	if( data == undefined ){ return ""; }
    return "@@@-ic[" + data.iconIndex + "]" + data.name;
};




//#############################################################################
// ** 【标准模块】☆效果字符阶段 标准模块
//#############################################################################
//##############################
// * 效果字符阶段 - 简单符配置【标准接口】【Game_Temp】
//			
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，包含"\"）
//			返回：	> 无
//			
//			说明：	> 效果字符，可将 "\xxx" 转成特定的字符串。
//					> 如果解析匹配成功，需要调用提交函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COWC_effect_processSimple = function( matched_index, matched_str ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 效果字符阶段 - 简单符提交【标准函数】【Game_Temp】
//			
//			参数：	> endCharIndex 数字 （简单符切割位置）
//			返回：	> 无
//			
//			说明：	> 此函数只在 效果字符阶段+简单符 有效。
//##############################
Game_Temp.prototype.drill_COWC_effect_submitSimple = function( endCharIndex, resultString ){
	this._drill_COWC_effect_success = true;
	this._drill_COWC_effect_endCharIndex = endCharIndex;
	this._drill_COWC_effect_resultString = resultString;
}
//##############################
// * 效果字符阶段 - 组合符配置【标准接口】【Game_Temp】
//			
//			参数：	> matched_index 数字（当前字符的索引）
//					> matched_str 字符串（当前字符的完整结构，包含"\"）
//					> command 字符串    （当前字符的指令）
//					> args 字符串列表   （当前字符的参数列表）
//			返回：	> 无
//			
//			说明：	> 效果字符，可将 "\xxx[xxx]" 转成特定的字符串。
//					> 如果解析匹配成功，需要调用提交函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 效果字符阶段 - 组合符提交【标准函数】【Game_Temp】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数只在 效果字符阶段+组合符 有效。
//##############################
Game_Temp.prototype.drill_COWC_effect_submitCombined = function( resultString ){
	this._drill_COWC_effect_success = true;
	this._drill_COWC_effect_resultString = resultString;
}


//=============================================================================
// ** ☆效果字符实现
//
//			说明：	> 效果字符是最后执行的阶段，处理各种剩下的 简单符 和 组合符。详细可以看看 窗口字符的绘制流程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 效果字符实现 - 执行字符转义
//==============================
Game_Temp.prototype.drill_COWC_convertEffect = function( text ){
	
	// > 切割字符串
	var text_list = this.drill_COWC_splitEffectText( text );
	//alert( text_list );
	
	// > 执行字符转义
	var result_text = "";
	var need_orgText = false;
	for(var i = 0; i < text_list.length; i++ ){
		var cur_text = text_list[i];
		if( cur_text == "" ){ continue; }
		
		// > 普通字符串时
		if( cur_text.charAt(0) != "\\" ){
			result_text += cur_text;
			need_orgText = false;
			continue;
		}
		// > 强制输出原文
		if( need_orgText == true ){
			need_orgText = false;
			result_text += cur_text;
			continue;
		}
		// > 单个"\"字符时（这个字符后面，强制输出原文，不管是"\"还是"\aaa"）
		if( cur_text.length == 1 ){
			need_orgText = true;
			continue;
		}
		
		// > 简单符时（"\aaa"）
		if( cur_text.charAt( cur_text.length-1 ) != "]" ){
			var matched_index = result_text.length;
			var matched_str = cur_text;
			
			
			// > 提交数据 初始化
			this._drill_COWC_effect_success = false;
			this._drill_COWC_effect_endCharIndex = -1;
			this._drill_COWC_effect_resultString = "";
			
			// > 执行 子函数
			this.drill_COWC_effect_processSimple( matched_index, matched_str );
			
			// > 如果字符提交，则执行转义
			//		（简单符需要切割，如\aaaa，其中的\aa被转义为@@@xxx，那么输出字符就是@@@xxxaa）
			if( this._drill_COWC_effect_success == true &&
				this._drill_COWC_effect_endCharIndex >= 2 ){
				result_text += this._drill_COWC_effect_resultString;
				result_text += matched_str.substring( this._drill_COWC_effect_endCharIndex );
			}else{
				result_text += cur_text;
			}
		
		// > 组合符时（"\aaa[bbb[ccc]]"）
		}else{
			var matched_index = result_text.length;
			var matched_str = cur_text;
			var left_index = cur_text.indexOf("[");
			var command = cur_text.substring( 1,left_index );
			var args = cur_text.substring( left_index+1,cur_text.length-1 ).split(/[:：]/g);
			
			
			// > 提交数据 初始化
			this._drill_COWC_effect_success = false;
			this._drill_COWC_effect_resultString = "";
			
			// > 执行 子函数
			this.drill_COWC_effect_processCombined( matched_index, matched_str, command, args );
			
			// > 如果字符提交，则执行转义
			if( this._drill_COWC_effect_success == true ){
				result_text += this._drill_COWC_effect_resultString;
			}else{
				result_text += cur_text;
			}
		}
	
	}
	
	return result_text;
};
//==============================
// * 效果字符实现 - 切割字符串
//==============================
Game_Temp.prototype.drill_COWC_splitEffectText = function( text ){
	
	// > 直接用 指代字符 的 切割字符串
	return this.drill_COWC_splitTransformText( text );
};


//=============================================================================
// ** ☆窗口字符应用之效果字符（字符应用A底层）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（字符应用A底层） - 简单符配置
//==============================
var _drill_COWC_COWC_effect_processSimple_2 = Game_Temp.prototype.drill_COWC_effect_processSimple;
Game_Temp.prototype.drill_COWC_effect_processSimple = function( matched_index, matched_str ){
	_drill_COWC_COWC_effect_processSimple_2.call( this, matched_index, matched_str );
	
	// > 『窗口字符定义』字符应用A底层 - 字体大小（\{）
	if( matched_str.substring(0,2).toUpperCase() == "\\{" ){	//（注意，这里使用substring，\FBA 需要被切成 \FB 和 A ）
		this.drill_COWC_effect_submitSimple( 2, "@@@-fs[add:" + String( this.drill_COWC_effect_fontSizeChangedValue() ) + "]" );
	}
	// > 『窗口字符定义』字符应用A底层 - 字体大小（\}）
	if( matched_str.substring(0,2).toUpperCase() == "\\}" ){
		this.drill_COWC_effect_submitSimple( 2, "@@@-fs[add:" + String( -1* this.drill_COWC_effect_fontSizeChangedValue() ) + "]" );
	}
	
	// > 『窗口字符定义』字符应用A底层 - 重置样式（\FR）
	if( matched_str.substring(0,3).toUpperCase() == "\\FR" ){
		this.drill_COWC_effect_submitSimple( 3, "@@@-fr" );
	}
}
//==============================
// * 窗口字符应用之效果字符（字符应用A底层） - 组合符配置
//==============================
var _drill_COWC_COWC_effect_processCombined_2 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_effect_processCombined_2.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用A底层 - 偏移量X（\PX[5]）
	if( command.toUpperCase() == "PX" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-px[" + Number(args[0]) + "]" );
		}
	}
	// > 『窗口字符定义』字符应用A底层 - 偏移量Y（\PY[5]）
	if( command.toUpperCase() == "PY" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-py[" + Number(args[0]) + "]" );
		}
	}
	// > 『窗口字符定义』字符应用A底层 - 额外量X（无）
	//	（脚本用，不开放）
	// > 『窗口字符定义』字符应用A底层 - 额外量Y（无）
	//	（脚本用，不开放）
	
	// > 『窗口字符定义』字符应用A底层 - 内边距 - 全部（\PA[10]）
	if( command.toUpperCase() == "PA" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-pa[" + Math.abs( Number(args[0]) ) + "]" );
		}
	}
	// > 『窗口字符定义』字符应用A底层 - 内边距 - 上（\PT[10]）
	if( command.toUpperCase() == "PT" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-pt[" + Math.abs( Number(args[0]) ) + "]" );
		}
	}
	// > 『窗口字符定义』字符应用A底层 - 内边距 - 下（\PB[10]）
	if( command.toUpperCase() == "PB" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-pb[" + Math.abs( Number(args[0]) ) + "]" );
		}
	}
	// > 『窗口字符定义』字符应用A底层 - 内边距 - 左（\PL[10]）
	if( command.toUpperCase() == "PL" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-pl[" + Math.abs( Number(args[0]) ) + "]" );
		}
	}
	// > 『窗口字符定义』字符应用A底层 - 内边距 - 右（\PR[10]）
	if( command.toUpperCase() == "PR" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-pr[" + Math.abs( Number(args[0]) ) + "]" );
		}
	}
	
	
	// > 『窗口字符定义』字符应用A底层 - 颜色（\C[0]）
	if( command.toUpperCase() == "C" ){
		if( args.length == 1 ){
			var color_index = Number(args[0]);
			var str = "@@@-tc[" + this.drill_COWC_effect_textColor( color_index ) + "]";
			this.drill_COWC_effect_submitCombined( str );
		}
	}
	
	// > 字符应用A底层 - 描边开关（@@@-oe[true]）
	//	（窗口字符在子插件中实现【窗口字符 - 描边效果】）
	
	// > 字符应用A底层 - 描边颜色（@@@-oc[rgb(255,255,255)]）
	//	（窗口字符在子插件中实现【窗口字符 - 描边效果】）
	
	// > 字符应用A底层 - 描边厚度（@@@-ow[4]）
	//	（窗口字符在子插件中实现【窗口字符 - 描边效果】）
	
	// > 『窗口字符定义』字符应用A底层 - 字体加粗（\FB[on]、\FB[off]）
	if( command.toUpperCase() == "FB" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@-fb[true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@-fb[false]" );
				return;
			}
		}
	}
	
	// > 『窗口字符定义』字符应用A底层 - 字体加粗（\FI[on]、\FI[off]）
	if( command.toUpperCase() == "FI" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@-fi[true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@-fi[false]" );
				return;
			}
		}
	}
	
	// > 『窗口字符定义』字符应用A底层 - 字体大小（\FS[20]）
	if( command.toUpperCase() == "FS" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-fs[" + Number(args[0]) + "]" );
			return;
		}
	}
	
	// > 『窗口字符定义』字符应用A底层 - 字体名称（\FF[GameFont]、\FN[GameFont]）
	//	（窗口字符在子插件中实现【窗口字符 - 字体管理器】）
	
	// > 『窗口字符定义』字符应用A底层 - 图标字符（\I[1]）
	if( command.toUpperCase() == "I" ){
		if( args.length == 1 ){
			var str = "@@@-ic[" + Number(args[0]) + "]";
			this.drill_COWC_effect_submitCombined( str );
			return;
		}
	}
	
	
	if( command.toUpperCase() == "DEBUG" ){
		if( args.length == 1 ){
			var type = String(args[0]);
			if( type == "显示字符方框" ||  //『窗口字符定义』字符应用A底层 - DEBUG（\debug[显示字符方框]）
				type == "隐藏字符方框" ||  //『窗口字符定义』字符应用A底层 - DEBUG（\debug[隐藏字符方框]）
				type == "显示单行标线" ||  //『窗口字符定义』字符应用A底层 - DEBUG（\debug[显示单行标线]）
				type == "隐藏单行标线" ||  //『窗口字符定义』字符应用A底层 - DEBUG（\debug[隐藏单行标线]）
				type == "显示范围盒" ||    //『窗口字符定义』字符应用A底层 - DEBUG（\debug[显示范围盒]）
				type == "隐藏范围盒" ){    //『窗口字符定义』字符应用A底层 - DEBUG（\debug[隐藏范围盒]）
				var str = "@@@-de[" + String(args[0]) + "]";
				this.drill_COWC_effect_submitCombined( str );
				return;
			}
		}
	}
}
//==============================
// * 窗口字符应用之效果字符（字符应用A底层） - 文本颜色（可继承）
//
//			说明：	> 该函数可由子插件自定义扩展。【窗口字符 - 颜色核心】
//==============================
Game_Temp.prototype.drill_COWC_effect_textColor = function( n ){
	return DrillUp.drill_COWC_getTextColor( n );
};
//==============================
// * 窗口字符应用之效果字符（字符应用A底层） - 字体大小变化值（可继承）
//
//			说明：	> 该函数可由子插件自定义扩展。【窗口字符 - 字符大小控制器】
//==============================
Game_Temp.prototype.drill_COWC_effect_fontSizeChangedValue = function(){
	return 6;
};
	
//=============================================================================
// ** ☆窗口字符应用之效果字符（字符应用B原版）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（字符应用B原版） - 组合符配置
//==============================
var _drill_COWC_COWC_effect_processCombined_3 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_effect_processCombined_3.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用B原版 - 字体大小（\{）
	//	（字符应用A底层 已经实现）
	
	// > 『窗口字符定义』字符应用B原版 - 字体大小（\}）
	//	（字符应用A底层 已经实现）
	
	// > 『窗口字符定义』字符应用B原版 - 颜色（\C[0]）
	//	（字符应用A底层 已经实现）
	
	// > 『窗口字符定义』字符应用B原版 - 图标字符（\I[1]）
	//	（字符应用A底层 已经实现）
}
	
//=============================================================================
// ** ☆窗口字符应用之效果字符（字符应用C扩展）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（字符应用C扩展） - 组合符配置
//==============================
var _drill_COWC_COWC_effect_processCombined_4 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_effect_processCombined_4.call( this, matched_index, matched_str, command, args );
	
	//（暂无）
}
	
	
	
//=============================================================================
// ** ☆字符取色器
//
//			说明：	> 该模块提供 取色器 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 字符取色器 - 获取文本颜色（开放函数）
//
//			说明：	> 该函数复刻来自 Window_Base.prototype.textColor 。
//					> 该函数在 DrillUp 静态类中，全局有效。
//==============================
DrillUp.drill_COWC_getTextColor = function( color_index ){
	var bitmap = DrillUp.drill_COWC_getCurrentWindowSkin();
    var px = 96 + (color_index % 8) * 12 + 6;
    var py = 144 + Math.floor(color_index / 8) * 12 + 6;
    return bitmap.getPixel(px, py);
}
//==============================
// * 字符取色器 - 获取队伍选中角色时的矩形颜色（开放函数）
//
//			说明：	> 该函数复刻来自 Window_Base.prototype.pendingColor 。
//					> 该函数在 DrillUp 静态类中，全局有效。
//==============================
DrillUp.drill_COWC_getPendingColor = function(){
	var bitmap = DrillUp.drill_COWC_getCurrentWindowSkin();
    return bitmap.getPixel(120, 120);
}
//==============================
// * 字符取色器 - 获取窗口皮肤（开放函数）
//
//			说明：	> 函数 Scene_Boot.prototype.loadSystemWindowImage 已经对该贴图进行了预加载，所以可以直接使用。
//==============================
DrillUp.drill_COWC_getCurrentWindowSkin = function(){
	return ImageManager.loadSystem('Window');
}
	
	
//=============================================================================
// ** ☆窗口标记
//
//			说明：	> 该模块提供 窗口标记 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口标记 - 解析窗口字符（Window_Base）
//==============================
var _drill_COWC_windowTag_analysisOrgText_InWindow = Window_Base.prototype.drill_COWC_analysisOrgText_InWindow;
Window_Base.prototype.drill_COWC_analysisOrgText_InWindow = function( org_text, options ){
	
	// > 窗口的默认配置
	this.drill_COWC_initWindowOptions( org_text, options );
	
	// > 原函数
	return _drill_COWC_windowTag_analysisOrgText_InWindow.call( this, org_text, options );
};
//==============================
// * 窗口标记 - 解析窗口字符（Window_Base） - 窗口的默认配置
//==============================
Window_Base.prototype.drill_COWC_initWindowOptions = function( org_text, options ){
	if( options['infoParam'] == undefined  ){ options['infoParam'] = {};  }
	if( options['baseParam'] == undefined  ){ options['baseParam'] = {};  }
	if( options['blockParam'] == undefined ){ options['blockParam'] = {}; }
	if( options['rowParam'] == undefined   ){ options['rowParam'] = {};   }
	
	// > 赋值 - 窗口类名
	options['infoParam']['parentWindow'] = this.contents._drill_COWC_parentWindow;	//（窗口类名）
	
	// > 赋值 - 『字符默认间距』 - 窗口默认向下偏移4像素（暂时不加，后续再看窗口是否需要）
	//if( options['blockParam']['paddingTop'] == undefined ){
	//	options['blockParam']['paddingTop'] = 4;
	//}
	
	// > 赋值 - 『字符默认间距』 - 行上补正32像素
	if( options['rowParam']['lineHeight_upCorrection'] == undefined ){
		options['rowParam']['lineHeight_upCorrection'] = 32;
	}
	
	// > 赋值 - DEBUG显示方框
	//options['rowParam']['drawDebugBoxRect'] = true;
};
//==============================
// * 窗口标记 - 类名标记
//==============================
var _drill_COWC_windowTag_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function(){
	
	// > 标记 - 创建前
	$gameTemp._drill_COWC_creatingBitmapInParentWindow = String(this.constructor.name);  //（窗口类名）
	
	// > 原函数
	_drill_COWC_windowTag_createContents.call( this );
	
	// > 标记 - 创建前
	$gameTemp._drill_COWC_creatingBitmapInParentWindow = undefined;
	
	// > 标记 - 创建后
    this.contents._drill_COWC_parentWindow = String(this.constructor.name);  //（窗口类名）
};
//==============================
// * 窗口标记 - 类名标记 - 获取（开放函数）
//
//			说明：	> 注意，该函数在类 Bitmap 中。
//					> Bitmap在创建时，通过 $gameTemp._drill_COWC_creatingBitmapInParentWindow 获取到父类名。
//==============================
Bitmap.prototype.drill_COWC_getParentWindowName = function(){
	var cur_windowName = $gameTemp._drill_COWC_creatingBitmapInParentWindow;
	if( cur_windowName == undefined ){ cur_windowName = this._drill_COWC_parentWindow; }
	return cur_windowName;
};
//==============================
// * 窗口标记 - 类名标记 - 是否在对话框中（开放函数）
//==============================
Bitmap.prototype.drill_COWC_isInMessageWindow = function(){
	var cur_windowName = this.drill_COWC_getParentWindowName();
	if( cur_windowName == "Window_Message" ){ return true; }
	if( cur_windowName == "Window_Gold" ){ return true; }
	if( cur_windowName == "Window_ChoiceList" ){ return true; }
	if( cur_windowName == "Window_NumberInput" ){ return true; }
	if( cur_windowName == "Window_EventItem" ){ return true; }
	return false;
};
//==============================
// * 窗口标记 - 『窗口字符的本事件』 - 获取（开放函数）
//==============================
Game_Temp.prototype.drill_COWC_getEvnetId_InInterpreter = function(){
	return this._drill_COWC_curInterpreterEventId;
};
//==============================
// * 窗口标记 - 『窗口字符的本事件』 - 最后继承
//==============================
var _drill_COWC_scene_initialize4 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COWC_scene_initialize4.call(this);		//（此方法放到最后再继承）
	
	//==============================
	// * 窗口标记 - 『窗口字符的本事件』 - 执行事件指令
	//==============================
	var _drill_COWC_executeCommand = Game_Interpreter.prototype.executeCommand;
	Game_Interpreter.prototype.executeCommand = function(){
		$gameTemp._drill_COWC_curInterpreterEventId = this._eventId;
		
		// > 原函数
		var succeed = _drill_COWC_executeCommand.call(this);
		
		$gameTemp._drill_COWC_curInterpreterEventId = undefined;
		return succeed;
	};
}
	
	
	
//=============================================================================
// ** ☆管辖权（窗口字符）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*  管辖 - 文本绘制
//==============================
// * E绘制『窗口字符核心』 - 绘制【基本文本】
//==============================
Window_Base.prototype.drawText = function( text, x, y, maxWidth, align ){
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};
//==============================
// * E绘制『窗口字符核心』 - 绘制【扩展文本】
//==============================
Window_Base.prototype.drawTextEx = function( text, x, y ){
    if( text ){
        var textState = { index: 0, x: x, y: y, left: x };			//光标准备
        textState.text = this.convertEscapeCharacters(text);		//指代字符转换
        textState.height = this.calcTextHeight(textState, false);	//高度计算
        this.resetFontSettings();									//重置字体（如果是一行行绘制，效果字符会中断）
        while (textState.index < textState.text.length ){	
            this.processCharacter(textState);						//绘制每个字符（包含效果字符的转义）
        }
        return textState.x - x;
    }else{
        return 0;
    }
};
*/
/*  管辖 - 高宽计算
//==============================
// * E绘制『窗口字符核心』 - 计算【基本文本】宽度
//==============================
Window_Base.prototype.textWidth = function( text ){
    return this.contents.measureTextWidth(text);
};
//==============================
// * E绘制『窗口字符核心』 - 计算【扩展文本】高度
//==============================
Window_Base.prototype.calcTextHeight = function( textState, all ){
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;

    for( var i = 0; i < maxLines; i++ ){
        var maxFontSize = this.contents.fontSize;
        var regExp = /\x1b[\{\}]/g;			//识别字体缩放的字符
        for( ;; ){
            var array = regExp.exec(lines[i]);
            if( array ){
                if( array[0] === '\x1b{' ){
                    this.makeFontBigger();
                }
                if( array[0] === '\x1b}' ){
                    this.makeFontSmaller();
                }
                if( maxFontSize < this.contents.fontSize ){
                    maxFontSize = this.contents.fontSize;
                }
            }else{
                break;
            }
        }
        textHeight += maxFontSize + 8;
    }

    this.contents.fontSize = lastFontSize;
    return textHeight;
};
*/
//=============================================================================
// ** ☆管辖权覆写函数（窗口字符）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
//==============================
// * 管辖权覆写函数 - 最后继承1级
//==============================
var _drill_COWC_scene_initialize2 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COWC_scene_initialize2.call(this);
	
	var _drill_COWC_baseOrg_drawText = Window_Base.prototype.drawText;
	var _drill_COWC_baseOrg_drawTextEx = Window_Base.prototype.drawTextEx;
	var _drill_COWC_baseOrg_textWidth = Window_Base.prototype.textWidth;
	var _drill_COWC_baseOrg_calcTextHeight = Window_Base.prototype.calcTextHeight;
	
	//==============================
	// * 管辖权覆写函数 - 绘制【基本文本】（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 覆盖其它非drill插件的影响，确保文本能完美绘制。
	//					> 所有窗口字符都不分 drawText 或 drawTextEx，全部统一转换。
	//					> 注意，drill插件如果想继承 Window_Base.prototype.drawText ，去继承函数 Window_Base.prototype.drill_COWC_org_drawText 即可。
	//==============================
	Window_Base.prototype.drawText = function( text, x, y, maxWidth, align ){
		this.drill_COWC_org_drawText( text, x, y, maxWidth, align );
	};
	//==============================
	// * 管辖权覆写函数 - 绘制【扩展文本】（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 覆盖其它非drill插件的影响，确保文本能完美绘制。
	//					> 所有窗口字符都不分 drawText 或 drawTextEx，全部统一转换。
	//					> 注意，drill插件如果想继承 Window_Base.prototype.drawTextEx ，去继承函数 Window_Base.prototype.drill_COWC_org_drawText 即可。
	//==============================
	Window_Base.prototype.drawTextEx = function( text, x, y ){
		this.drill_COWC_org_drawText( text, x, y, 3000, "left" );
		return this.drill_COWC_org_textWidth( text );	//（注意drawTextEx有返回值）
	};
	//==============================
	// * 管辖权覆写函数 - 计算【基本文本】宽度（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 覆盖其它非drill插件的影响，确保文本能完美绘制。
	//					> 注意，drill插件如果想继承 Window_Base.prototype.textWidth ，去继承函数 Window_Base.prototype.drill_COWC_org_textWidth 即可。
	//==============================
	Window_Base.prototype.textWidth = function( text ){
		return this.drill_COWC_org_textWidth( text );
	};
	//==============================
	// * 管辖权覆写函数 - 计算【扩展文本】高度（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 覆盖其它非drill插件的影响，确保文本能完美绘制。
	//					> 注意，drill插件如果想继承 Window_Base.prototype.calcTextHeight ，去继承函数 Window_Base.prototype.drill_COWC_org_calcTextHeight 即可。
	//==============================
	Window_Base.prototype.calcTextHeight = function( textState, all ){
		return this.drill_COWC_org_calcTextHeight( textState, all );
	};
	
	// > 不要覆写 对话框
	Window_Message.prototype.drawText = _drill_COWC_baseOrg_drawText;
	Window_Message.prototype.drawTextEx = _drill_COWC_baseOrg_drawTextEx;
	Window_Message.prototype.textWidth = _drill_COWC_baseOrg_textWidth;
	Window_Message.prototype.calcTextHeight = _drill_COWC_baseOrg_calcTextHeight;
};
//==============================
// * 管辖权覆写函数 - 绘制文本
//			
//			参数：	> text 字符串    （目标文本）
//					> x, y 数字      （文本位置）
//					> maxWidth 数字  （最大宽度值）
//					> align 字符串   （对齐方式，left/center/right）
//			返回：	> 无
//==============================
Window_Base.prototype.drill_COWC_org_drawText = function( text, x, y, maxWidth, align ){
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 参数准备 - 校验
	var org_text = text;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	org_text = String(org_text);	//（有些插件会扔一个数字进来）
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = x;
	options['infoParam']['y'] = y;
	options['infoParam']['canvasWidth']  = this.contentsWidth();  //this.width;
	options['infoParam']['canvasHeight'] = this.contentsHeight(); //this.height;
	
	// > 参数准备 - 准备绘制配置（特殊情况）
	options['rowParam'] = {};
	if( align == "center" || align == "right" ){
		options['rowParam']['alignHor_type'] = align;
		options['rowParam']['alignHor_maxWidth'] = maxWidth;
	}
	
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
};
//==============================
// * 管辖权覆写函数 - 绘制文本
//			
//			参数：	> text 字符串
//			返回：	> 数字
//==============================
Window_Base.prototype.drill_COWC_org_textWidth = function( text ){
	
	// > 『字符主流程』 - 获取最大宽度
	var options = {};
	return this.drill_COWC_getOrgTextWidth( text, options );
};
//==============================
// * 管辖权覆写函数 - 绘制文本
//			
//			参数：	> textState 动态参数对象
//					> all 布尔
//			返回：	> 数字
//==============================
Window_Base.prototype.drill_COWC_org_calcTextHeight = function( textState, all ){
	
	// > 『字符主流程』 - 获取总高度
	var options = {};
	return this.drill_COWC_getOrgTextHeight( textState['text'], options );
};



//=============================================================================
// ** ☆管辖权（样式配置）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * E绘制『窗口字符核心』 - 重置字体
//==============================
Window_Base.prototype.resetFontSettings = function(){
    this.contents.fontFace = this.standardFontFace();		//字体类型
    this.contents.fontSize = this.standardFontSize();		//字体大小
    this.resetTextColor();									//字体颜色
};
//==============================
// * E绘制『窗口字符核心』 - 扩展文本 - 指代字符转换
//==============================
Window_Base.prototype.convertEscapeCharacters = function( text ){
    text = text.replace(/\\/g, '\x1b');							//单个下划线转 Escape字符
    text = text.replace(/\x1b\x1b/g, '\\');						//两个下划线转 下划线字符
    text = text.replace(/\x1bV\[(\d+)\]/gi, function(){		//'\v[0]'转变量值
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function(){		//'\v[\v[0]]'二转变量值
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function(){		//'\n[5]'角色名字
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function(){		//'\p[1]'玩家队员名字
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);	//'\g'金钱单位
    return text;
};
//==============================
// * E绘制『窗口字符核心』 - 扩展文本 - 指代字符 - 角色名字
//==============================
Window_Base.prototype.actorName = function( n ){
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : '';
};
//==============================
// * E绘制『窗口字符核心』 - 扩展文本 - 指代字符 - 玩家队员名字
//==============================
Window_Base.prototype.partyMemberName = function( n ){
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : '';
};

//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 从当前光标开始绘制
//==============================
Window_Base.prototype.processCharacter = function( textState ){
    switch (textState.text[textState.index] ){
    case '\n':			//换行符
        this.processNewLine(textState);	
        break;
    case '\f':			//新建页符
        this.processNewPage(textState);	
        break;
    case '\x1b':		//效果字符（剩余的Escape字符）
        this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
        break;
    default:			//常规字符
        this.processNormalCharacter(textState);
        break;
    }
};
//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 常规字符
//==============================
Window_Base.prototype.processNormalCharacter = function( textState ){
    var c = textState.text[textState.index++];
    var w = this.textWidth(c);
    this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
};
//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 换行符
//==============================
Window_Base.prototype.processNewLine = function( textState ){
    textState.x = textState.left;
    textState.y += textState.height;
    textState.height = this.calcTextHeight(textState, false);
    textState.index++;
};
//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 新建页符（子类用属性）
//==============================
Window_Base.prototype.processNewPage = function( textState ){
    textState.index++;
};
//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 效果字符获取
//==============================
Window_Base.prototype.obtainEscapeCode = function( textState ){
    textState.index++;
    var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if( arr ){
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    }else{
        return '';
    }
};
//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 效果字符参数
//==============================
Window_Base.prototype.obtainEscapeParam = function( textState ){
    var arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
    if( arr ){
        textState.index += arr[0].length;
        return parseInt(arr[0].slice(1));
    }else{
        return '';
    }
};
//==============================
// * E绘制『窗口字符核心』 - 逐一绘制 - 效果字符功能
//==============================
Window_Base.prototype.processEscapeCharacter = function( code, textState ){
    switch (code ){
    case 'C':			//改变文本色
        this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
        break;
    case 'I':			//图标字符
        this.processDrawIcon(this.obtainEscapeParam(textState), textState);
        break;
    case '{':			//字体放大
        this.makeFontBigger();
        break;
    case '}':			//字体缩小
        this.makeFontSmaller();
        break;
    }
};
//==============================
// * E绘制『窗口字符核心』 - 效果字符 - 图标字符
//==============================
Window_Base.prototype.processDrawIcon = function( iconIndex, textState ){
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);		//（绘制图标时，预留2像素的内边距）
    textState.x += Window_Base._iconWidth + 4;
};
//==============================
// * E绘制『窗口字符核心』 - 效果字符 - 字体放大
//==============================
Window_Base.prototype.makeFontBigger = function(){
    if( this.contents.fontSize <= 96 ){
        this.contents.fontSize += 12;		//这里放大的幅度太大，后使用 Drill_DialogSpecialCharSize 插件调整。
    }
};
//==============================
// * E绘制『窗口字符核心』 - 效果字符 - 字体缩小
//==============================
Window_Base.prototype.makeFontSmaller = function(){
    if( this.contents.fontSize >= 24 ){
        this.contents.fontSize -= 12;		//这里缩小的幅度太大，后使用 Drill_DialogSpecialCharSize 插件调整。
    }
};
*/
//=============================================================================
// ** ☆管辖权覆写函数（样式配置）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
//
//	（暂无）（由于没有窗口会调用上述样式配置所以没有必要覆写）
//
	
	
	
//=============================================================================
// ** ☆管辖权（绘制指代）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/* 绘制指代 - 绘制图标
//==============================
// * E绘制『窗口字符核心』 - 效果字符 - 图标字符
//==============================
Window_Base.prototype.processDrawIcon = function( iconIndex, textState ){
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);		//（绘制图标时，预留2像素的内边距）
    textState.x += Window_Base._iconWidth + 4;
};
//==============================
// * E绘制『窗口字符核心』 - 绘制图标 - 执行绘制
//==============================
Window_Base.prototype.drawIcon = function( iconIndex, x, y ){
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
//==============================
// * E绘制『窗口字符核心』 - 绘制图标 - 角色状态图标
//==============================
Window_Base.prototype.drawActorIcons = function( actor, x, y, width ){
    width = width || 144;
    var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
    for( var i = 0; i < icons.length; i++ ){
        this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
    }
};
//==============================
// * E绘制『窗口字符核心』 - 绘制图标 - 物品名称与图标
//==============================
Window_Base.prototype.drawItemName = function( item, x, y, width ){
    width = width || 312;
    if( item ){
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};
*/
/* 绘制指代 - 绘制基本文本
//==============================
// * E绘制 - 绘制基本文本 - 货币单位
//
//			说明：	> 绘制 值+单位，比如"100G"。
//==============================
Window_Base.prototype.drawCurrencyValue = function( value, unit, x, y, width ){
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
};
*/
//=============================================================================
// ** ☆管辖权覆写函数（绘制指代）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
//==============================
// * 管辖权覆写函数 - 最后继承1级
//==============================
var _drill_COWC_scene_initialize3 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COWC_scene_initialize3.call(this);
	
	//==============================
	// * E绘制『窗口字符核心』 - 效果字符 - 图标字符
	//==============================
	// （该函数不覆写）
	
	//==============================
	// * E绘制『窗口字符核心』 - 绘制图标 - 执行绘制
	//==============================
	// （该函数不覆写）（因为该函数直接绘制一个图标，而且其它插件可能会用到）
	
	//==============================
	// * E绘制『窗口字符核心』 - 绘制图标 - 角色状态图标
	//==============================
	// （该函数不覆写）（因为是状态图标集的显示，不需要转窗口字符）
	
	//==============================
	// * E绘制『窗口字符核心』 - 绘制图标 - 物品名称与图标（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Base.prototype.drawItemName = function( item, x, y, width ){
		this.drill_COWC_org_drawItemName( item, x, y, width );
	};
	
	//==============================
	// * E绘制 - 绘制基本文本 - 货币单位 覆写函数
	//==============================
	Window_Base.prototype.drawCurrencyValue = function( value, unit, x, y, width ){
		this.drill_COWC_org_drawCurrencyValue( value, unit, x, y, width );
	};
}
//==============================
// * 管辖权覆写函数 - 绘制图标 - 物品名称与图标
//			
//			参数：	> item 动态参数对象
//					> x, y 数字
//					> width 数字
//			返回：	> 无
//==============================
Window_Base.prototype.drill_COWC_org_drawItemName = function( item, x, y, width ){
	width = width || 312;
	if( item ){  //（直接绘制 图标+文本 组合的文本）
		this.drawText( "\\i[" + String(item.iconIndex) + "]" + item.name, x, y, width);
	}
};
//==============================
// * 管辖权覆写函数 - 绘制基本文本 - 货币单位
//			
//			参数：	> value 数字
//					> unit 字符串
//					> x, y 数字
//					> width 数字
//			返回：	> 无
//			
//			说明：	> 绘制 值+单位，比如"100G"。该函数能被 货币素材库插件 改进。
//==============================
Window_Base.prototype.drill_COWC_org_drawCurrencyValue = function( value, unit, x, y, width ){
	
	// > 将"金币"转为图标【管理器 - 货币素材库】
	if( Imported.Drill_AssetsOfCurrency ){
		if( unit == $gameTemp.drill_AsOC_getDataText() ){
			var icon_id = $gameTemp.drill_AsOC_getDataIcon();
			if( icon_id > 0 ){
				unit = " \\i[" + String(icon_id) + "]";	//（多一个空格，留点间距）
			}else{
				unit = "\\c[" + String($gameTemp.drill_AsOC_getDataTextColor()) + "]" + unit;
			}
		}
	}
	
	var text = "";
	text += String( value );
	text += String( unit );
	this.drawText( text, x, y, width, 'right' ); //（右对齐时需要输入宽度值）
};






//#############################################################################
// ** 【标准模块】☆逐个绘制流程介绍 标准模块
//#############################################################################
//##############################
// * 逐个绘制流程介绍『字符逐个绘制流程』 - 逐个绘制初始化【标准函数】【Window_Base】
//			
//			参数：	> org_text 字符串                   （含 \v\c[] 的文本）
//					> options 动态参数对象              （参数集合，必须提供）
//					> options['infoParam']  动态参数对象（只读配置信息，可为空，相关参数见 文档 ）
//					> options['baseParam']  动态参数对象（基础字符配置，可为空，相关参数见 文档 ）
//					> options['blockParam'] 动态参数对象（底层单块配置，可为空，相关参数见 文档 ）
//					> options['rowParam']   动态参数对象（底层单行配置，可为空，相关参数见 文档 ）
//			返回：	> 无
//			
//			说明：	> 该函数是逐个绘制，在一个时间段内，多次绘制。
//					> 该函数建议直接调用，不建议自己拆散流程来使用。（字符绘制核心的可以拆散是因为其结构非常底层）
//					> 该函数封装了 窗口字符 的规则，支持\v\c[]窗口字符，并且@@@xxx的底层字符也能使用。
//##############################
Window_Base.prototype.drill_COWC_timing_initDrawText = function( org_text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置【系统 - 字符绘制核心】
	var temp_bitmap = this.contents;
	temp_bitmap.drill_COWC_timing_setEnabled( true );
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
	$gameTemp.drill_COCD_initOptions( cur_options, temp_bitmap );
	
	// > 『字符核心流程』 - 字符拆散
	cur_options['blockParam']['splitAll'] = true;			//（逐个绘制流程必须用）
	
	// > 『字符主流程』 - 解析窗口字符（Window_Base）
	var rowBlock_list = this.drill_COWC_analysisOrgText_InWindow( org_text, cur_options );
	
	// > 『字符逐个绘制流程』 - 数据初始化
	temp_bitmap.drill_COWC_timing_initData_private( rowBlock_list );
	
	// > 『字符贴图流程』 - 刷新字符块贴图（可选）【窗口字符 - 窗口字符贴图核心】
	//	（父贴图执行）sprite.drill_COWCSp_sprite_refreshAllSprite();
};
//##############################
// * 逐个绘制流程介绍『字符逐个绘制流程』 - 逐个绘制初始化【标准函数】【Bitmap】
//			
//			参数：	> org_text 字符串                   （含 \v\c[] 的文本）
//					> options 动态参数对象              （参数集合，必须提供）
//					> options['infoParam']  动态参数对象（只读配置信息，可为空，相关参数见 文档 ）
//					> options['baseParam']  动态参数对象（基础字符配置，可为空，相关参数见 文档 ）
//					> options['blockParam'] 动态参数对象（底层单块配置，可为空，相关参数见 文档 ）
//					> options['rowParam']   动态参数对象（底层单行配置，可为空，相关参数见 文档 ）
//			返回：	> 无
//			
//			说明：	> 该函数是逐个绘制，在一个时间段内，多次绘制。
//					> 该函数建议直接调用，不建议自己拆散流程来使用。（字符绘制核心的可以拆散是因为其结构非常底层）
//					> 该函数封装了 窗口字符 的规则，支持\v\c[]窗口字符，并且@@@xxx的底层字符也能使用。
//##############################
Bitmap.prototype.drill_COWC_timing_initDrawText = function( org_text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置【系统 - 字符绘制核心】
	this.drill_COWC_timing_setEnabled( true );
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
	$gameTemp.drill_COCD_initOptions( cur_options, this );
	
	// > 『字符核心流程』 - 字符拆散
	cur_options['blockParam']['splitAll'] = true;			//（逐个绘制流程必须用）
	
	// > 『字符主流程』 - 解析窗口字符（Bitmap）
	var rowBlock_list = this.drill_COWC_analysisOrgText_InBitmap( org_text, cur_options );
	
	// > 『字符逐个绘制流程』 - 数据初始化
	this.drill_COWC_timing_initData_private( rowBlock_list );
	
	// > 『字符贴图流程』 - 刷新字符块贴图（可选）【窗口字符 - 窗口字符贴图核心】
	//	（父贴图执行）sprite.drill_COWCSp_sprite_refreshAllSprite();
};
//##############################
// * 逐个绘制流程介绍『字符逐个绘制流程』 - 逐个绘制帧刷新【标准函数】【Window_Base】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Window_Base.prototype.drill_COWC_timing_updateTick = function(){
	var temp_bitmap = this.contents;
	temp_bitmap.drill_COWC_timing_updateTick_private();
};
//##############################
// * 逐个绘制流程介绍『字符逐个绘制流程』 - 逐个绘制帧刷新【标准函数】【Bitmap】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_updateTick = function(){
	this.drill_COWC_timing_updateTick_private();
};


//#############################################################################
// ** 【标准模块】☆逐个绘制可选流程介绍 标准模块
//#############################################################################
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 是否正在绘制【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 绘制过程的时候，才会保持true，其它情况都为false。
//##############################
Window_Base.prototype.drill_COWC_timing_isPlaying = function(){
	if( this.contents == undefined ){ return false; }
	return this.contents.drill_COWC_timing_isPlaying();
};
Bitmap.prototype.drill_COWC_timing_isPlaying = function(){
	return this._drill_COWC_timing_isTimingEnabled == true;
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 是否正在等待【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Window_Base.prototype.drill_COWC_timing_isWaiting = function(){
	if( this.contents == undefined ){ return false; }
	return this.contents.drill_COWC_timing_isWaiting();
};
Bitmap.prototype.drill_COWC_timing_isWaiting = function(){
	return this._drill_COWC_timing_waitingType != "";
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 是否正在等待-指定类型【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> type_name 字符串（pause/emergencyWait/inputWait）
//			返回：	> 布尔
//##############################
Window_Base.prototype.drill_COWC_timing_isWaitingInType = function( type_name ){
	if( this.contents == undefined ){ return false; }
	return this.contents.drill_COWC_timing_isWaitingInType( type_name );
};
Bitmap.prototype.drill_COWC_timing_isWaitingInType = function( type_name ){
	return this._drill_COWC_timing_waitingType == type_name;
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 是否正在等待-获取类型【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Window_Base.prototype.drill_COWC_timing_getWaitingType = function(){
	if( this.contents == undefined ){ return false; }
	return this.contents.drill_COWC_timing_getWaitingType();
};
Bitmap.prototype.drill_COWC_timing_getWaitingType = function(){
	return this._drill_COWC_timing_waitingType;
};

//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 设置计时器间隔【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> time 数字
//			返回：	> 无
//##############################
Window_Base.prototype.drill_COWC_timing_setPerTick = function( time ){
	if( this.contents == undefined ){ return; }
	this.contents.drill_COWC_timing_setPerTick( time );
};
Bitmap.prototype.drill_COWC_timing_setPerTick = function( time ){
	time = Number( time );
	if( isNaN(time) ){ return; }
	this._drill_COWC_timing_dataPerTick = time;
	this._drill_COWC_timing_perTick = time;
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 设置绘制暂停【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Window_Base.prototype.drill_COWC_timing_setPause = function( enabled ){
	if( this.contents == undefined ){ return; }
	this.contents.drill_COWC_timing_setPause( enabled );
};
Bitmap.prototype.drill_COWC_timing_setPause = function( enabled ){
	this._drill_COWC_timing_pause = enabled;
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 是否绘制暂停【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Window_Base.prototype.drill_COWC_timing_isPause = function(){
	if( this.contents == undefined ){ return false; }
	return this.contents.drill_COWC_timing_isPause();
};
Bitmap.prototype.drill_COWC_timing_isPause = function(){
	return this._drill_COWC_timing_pause;
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 设置绘制结束【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Window_Base.prototype.drill_COWC_timing_setEnd = function( enabled ){
	if( this.contents == undefined ){ return; }
	this.contents.drill_COWC_timing_setEnd( enabled );
};
Bitmap.prototype.drill_COWC_timing_setEnd = function( enabled ){
	this._drill_COWC_timing_end = enabled;
};
//##############################
// * 逐个绘制可选流程介绍『字符逐个绘制流程』 - 是否绘制结束【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 注意，绘制完毕 或 根本没绘制，返回值都一直为true。
//##############################
Window_Base.prototype.drill_COWC_timing_isEnd = function(){
	if( this.contents == undefined ){ return true; }
	return this.contents.drill_COWC_timing_isEnd();
};
Bitmap.prototype.drill_COWC_timing_isEnd = function(){
	return this._drill_COWC_timing_end;
};


//=============================================================================
// ** ☆逐个绘制流程实现
//
//			说明：	> 该模块专门实现 逐个绘制 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 逐个绘制流程实现 - 数据初始化（私有）
//==============================
Bitmap.prototype.drill_COWC_timing_initData_private = function( rowBlock_list ){
	
	// > 私有参数初始化
	this._drill_COWC_timing_end = false;						//5A流程标记 - 是否绘制结束
	this._drill_COWC_timing_rowBlockList = rowBlock_list;		//5A流程标记 - 单行块列表
	
	this._drill_COWC_timing_curTick = 0;						//5B计时器 - 当前计时器
	this._drill_COWC_timing_perTick = 3;						//5B计时器 - 计时器间隔
	if( this._drill_COWC_timing_dataPerTick != undefined ){		//5B计时器 - 计时器间隔（设置）
		this._drill_COWC_timing_perTick = this._drill_COWC_timing_dataPerTick;
	}
	
	this._drill_COWC_timing_tickRowSkip = undefined;			//5C次刷新跳帧 - 是否跳帧（立刻显示_单行）
	this._drill_COWC_timing_tickSkip = undefined;				//5C次刷新跳帧 - 是否跳帧（立刻显示_跨行）
	
	this._drill_COWC_timing_rowIndex = 0;						//5D索引 - 当前行索引
	this._drill_COWC_timing_textIndex = 0;						//5D索引 - 当前字符索引
	
	this._drill_COWC_timing_waitingType = "";					//5E等待管理器 - 当前等待类型
	this._drill_COWC_timing_pause = undefined;					//5E等待管理器 - 是否暂停
	
	this._drill_COWC_timing_inputWait_enabled = true;			//5G等待按下 - 开关（默认打开）
	this._drill_COWC_timing_inputWait_isWaiting = undefined;	//5G等待按下 - 等待阻塞
	
	this._drill_COWC_timing_inputTickSkip_enabled = undefined;	//5H按下跳帧 - 按下跳帧开关（默认关闭）
	this._drill_COWC_timing_inputTickSkip_keepSkip = undefined;	//5H按下跳帧 - 是否跳帧
	
	// > 逐个绘制阶段 - 流程开始时
	//		（窗口字符贴图核心 会继承此函数，并初始化字符块）
	this.drill_COWC_timing_allStart( rowBlock_list );
}
//==============================
// * 逐个绘制流程实现 - 帧刷新（私有）
//==============================
Bitmap.prototype.drill_COWC_timing_updateTick_private = function(){
	
	// > 帧刷新 - 次刷新
	this.drill_COWC_timing_tickMain();
	
	// > 帧刷新 - 次刷新 - 5C次刷新跳帧
	while( true ){
		if( this._drill_COWC_timing_end == true ){ break; }
		
		if( this.drill_COWC_timing_needSkip() == true ){	//（跳帧条件）
			this.drill_COWC_timing_tickMain();
		}else{
			break;
		}
	}
	
	
	// > 帧刷新 - 5G等待按下
	//		（注意，这个判定要放在帧刷新中，放在次刷新里面会有遗漏）
	if( this.drill_COWC_timing_isTriggered() ){
		this._drill_COWC_timing_inputWait_isWaiting = undefined;
	}
	
	// > 帧刷新 - 5H按下跳帧
	//		（注意，这个判定要放在帧刷新中，放在次刷新里面会有遗漏）
	if( this._drill_COWC_timing_inputTickSkip_enabled == true &&
		this._drill_COWC_timing_waitingType == "" ){
		if( this.drill_COWC_timing_isTriggered() ){
			this._drill_COWC_timing_inputTickSkip_keepSkip = true;	//（若按下，则开启跳帧）
		}
	}
	
	
	// > 帧刷新 - 5A流程标记
	if( this._drill_COWC_timing_end == true ){
		
		// > 逐个绘制阶段 - 流程结束时
		this.drill_COWC_timing_allEnd( this._drill_COWC_timing_rowBlockList );
		
		// > 弹出容器
		this.drill_COWC_timing_setEnabled( false );
	}
}
//==============================
// * 逐个绘制流程实现 - 帧刷新 按下条件（5G等待按下/5H按下跳帧）
//==============================
Bitmap.prototype.drill_COWC_timing_isTriggered = function(){
	return (Input.isRepeated('ok') || 
			Input.isRepeated('cancel') || 
			TouchInput.isRepeated());
}

//==============================
// * 逐个绘制流程实现 - 次刷新
//
//			说明：	> 这里都是绘制一个个常规字符。
//					> 这里与原版不一样，没有换行符、没有新建页符、没有效果字符。
//==============================
Bitmap.prototype.drill_COWC_timing_tickMain = function(){
	if( this._drill_COWC_timing_end == true ){ return; }
	
	// > 5B计时器 - 次数+1
	this._drill_COWC_timing_curTick += 1;
	
	// > 5B计时器 - 重置
	if( this._drill_COWC_timing_curTick >= this._drill_COWC_timing_perTick ){
		this._drill_COWC_timing_curTick = 0;
		
		// > 下一个字符
		this.drill_COWC_timing_tickTextBlock();
	}
}
//==============================
// * 逐个绘制流程实现 - 次刷新 - 5C次刷新跳帧 - 跳帧条件
//
//			说明：	> 该函数若一直返回true，则绘制过程会全程保持跳帧，直到 流程结束。
//					  也就是说，如果一直true，则 一帧内 会无限次数地执行 次刷新。
//==============================
Bitmap.prototype.drill_COWC_timing_needSkip = function(){
	if( this._drill_COWC_timing_tickRowSkip == true ){ return true; }				//是否跳帧（立刻显示_单行）
	if( this._drill_COWC_timing_tickSkip == true ){ return true; }					//是否跳帧（立刻显示_跨行）
	if( this._drill_COWC_timing_inputTickSkip_keepSkip == true ){ return true; }	//是否跳帧（5H按下跳帧）
	return false;
}
//==============================
// * 逐个绘制流程实现 - 次刷新 - 下一个字符
//
//			说明：	> 这里都是绘制一个个常规字符。
//					> 这里与原版不一样，没有换行符、没有新建页符、没有效果字符。
//==============================
Bitmap.prototype.drill_COWC_timing_tickTextBlock = function(){
	if( this._drill_COWC_timing_end == true ){ return; }
	
	var rowIndex = this._drill_COWC_timing_rowIndex;	//5D索引 - 行索引
	var textIndex = this._drill_COWC_timing_textIndex;	//5D索引 - 字符索引
	var to_nextRow = false;								//5D索引 - 推进下一行
	
	
	// > 单行块 非空时
	var rowBlock = this._drill_COWC_timing_rowBlockList[ rowIndex ];
	if( rowBlock != undefined ){
		
		// > 字符块 非空时
		var textBlock = rowBlock._drill_rb_textBlockList[ textIndex ];
		if( textBlock != undefined ){	//（如果当前行为空行，那么第一个字符绘制不出来）
			
			// > 5E等待管理器
			this._drill_COWC_timing_waitingType = "";
			this.drill_COWC_timing_tickWaitType( rowBlock, textBlock );
			if( this._drill_COWC_timing_waitingType != "" ){ return; }
			
			
			// > 逐个绘制阶段 - 每行开始时
			if( textIndex == 0 ){
				this.drill_COWC_timing_rowStart( rowBlock, this._drill_COWC_timing_rowIndex );
			}
			
			// > 绘制字符
			this.drill_COWC_timing_drawTextBlock( textBlock );
			
			
			// > 5D索引 - 字符索引+1
			textIndex += 1;
			
			// > 5D索引 - 字符索引末尾时
			if( textIndex > rowBlock._drill_rb_textBlockList.length ){
				to_nextRow = true;
			}
			
		// > 字符块 为空时
		}else{
			to_nextRow = true;
		}
		
	// > 单行块 为空时
	}else{
		to_nextRow = true;
	}
	
	
	// > 5D索引 - 推进下一行
	//		（推进下一行时，都会消耗一次tick。也就是说，换行会占一个字符的时间）
	if( to_nextRow == true ){
		
		// > 逐个绘制阶段 - 每行结束时
		if( rowBlock != undefined ){
			this.drill_COWC_timing_rowEnd( rowBlock, this._drill_COWC_timing_rowIndex, this._drill_COWC_timing_textIndex );
		}
		
		// > 5C次刷新跳帧 - 关闭跳帧（立刻显示_单行）
		this._drill_COWC_timing_tickRowSkip = undefined;
		
		// > 5D索引 - 行索引+1
		rowIndex += 1;
		textIndex = 0;
		
		// > 5D索引 - 是否绘制结束
		if( rowIndex > this._drill_COWC_timing_rowBlockList.length ){
			this._drill_COWC_timing_end = true;
			return;
		}
	}
	
	this._drill_COWC_timing_rowIndex = rowIndex;	//5D索引 - 行索引
	this._drill_COWC_timing_textIndex = textIndex;	//5D索引 - 字符索引
}
//==============================
// * 逐个绘制流程实现 - 次刷新 - 绘制字符
//==============================
Bitmap.prototype.drill_COWC_timing_drawTextBlock = function( textBlock ){
	
	// > 逐个绘制阶段 - 每个字符开始时
	this.drill_COWC_timing_textStart( textBlock, this._drill_COWC_timing_rowIndex, this._drill_COWC_timing_textIndex );
	
	// > 执行绘制
	this.drill_COWC_timing_textDraw( textBlock );
	
	// > 逐个绘制阶段 - 每个字符结束时
	this.drill_COWC_timing_textEnd( textBlock, this._drill_COWC_timing_rowIndex, this._drill_COWC_timing_textIndex );
}
//==============================
// * 逐个绘制流程实现 - 次刷新 - 绘制字符 - 执行绘制
//
//			说明：	> 有些字符可能会 不绘制/跳过绘制，所以这里另起一个函数控制。
//==============================
Bitmap.prototype.drill_COWC_timing_textDraw = function( textBlock ){
	this.drill_COCD_drawTextBlock( textBlock );
}

//==============================
// * 逐个绘制流程实现 - 次刷新 - 5E等待管理器
//==============================
Bitmap.prototype.drill_COWC_timing_tickWaitType = function( rowBlock, textBlock ){
	
	// > 5E等待管理器 - 是否暂停
	if( this._drill_COWC_timing_pause == true ){
		this._drill_COWC_timing_waitingType = "pause";
		return;
	}
	
	// > 5E等待管理器 - 5F立即等待
	this.drill_COWC_timing_tickEmergencyWait( textBlock );
	
	// > 5E等待管理器 - 5G等待按下
	this.drill_COWC_timing_tickInputWait( textBlock );
	
	// > 5E等待管理器 - 5H按下跳帧
	this.drill_COWC_timing_tickInputSkip( textBlock );
}
//==============================
// * 逐个绘制流程实现 - 5E等待管理器 - 5F立即等待
//==============================
Bitmap.prototype.drill_COWC_timing_tickEmergencyWait = function( textBlock ){
	
	// > 5F立即等待 锁
	//		（注意，由于等待变成了一个样式属性附着于下一个字符）
	//		（所以在绘制下一个字符之前，必须阻塞，然后等待延迟结束）
	if( this._drill_COWC_timing_emergencyWait_lastBlock != textBlock ){
		this._drill_COWC_timing_emergencyWait_lastBlock = textBlock;
		
		// > 绘制过程 - 等待（@@@_ww[]）
		var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
		if( cur_blockParam['waitTime'] != undefined ){
			var waitTime = cur_blockParam['waitTime'];
			waitTime -= this._drill_COWC_timing_perTick;				//（5B计时器 - 减去第一次进入等待的时间）
			if( waitTime > 0 ){
				this._drill_COWC_timing_curTick -= waitTime;			//（直接减到负数，就是延长时间）
				this._drill_COWC_timing_waitingType = "emergencyWait";	//（5E等待管理器 - 执行等待）
			}
		}
	}
}
//==============================
// * 逐个绘制流程实现 - 5E等待管理器 - 5G等待按下
//==============================
Bitmap.prototype.drill_COWC_timing_tickInputWait = function( textBlock ){
	if( this._drill_COWC_timing_inputWait_enabled != true ){ return; }
	
	// > 5G等待按下 锁
	if( this._drill_COWC_timing_inputWait_lastBlock != textBlock ){
		this._drill_COWC_timing_inputWait_lastBlock = textBlock;
		
		// > 绘制过程 - 等待按下（@@@_p2[true]）
		var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
		if( cur_blockParam['waitForInputEnabled'] == true ){
			this._drill_COWC_timing_inputWait_enabled = true;
		}
		if( cur_blockParam['waitForInputEnabled'] == false ){
			this._drill_COWC_timing_inputWait_enabled = undefined;
		}
		
		// > 绘制过程 - 等待按下（@@@_p1）
		if( cur_blockParam['waitForInputOnce'] == true ){
			this._drill_COWC_timing_inputWait_isWaiting = true;	//（等待阻塞）
		}
	}
	
	// > 5G等待按下 执行等待
	if( this._drill_COWC_timing_inputWait_isWaiting == true ){
		this._drill_COWC_timing_waitingType = "inputWait";		//（5E等待管理器 - 执行等待）
	}
};
//==============================
// * 逐个绘制流程实现 - 5E等待管理器 - 5H按下跳帧
//==============================
Bitmap.prototype.drill_COWC_timing_tickInputSkip = function( textBlock ){
	if( this._drill_COWC_timing_inputTickSkip_enabled != true ){ return; }
	
	// > 如果出现了任何等待，则停止跳帧
	if( this._drill_COWC_timing_waitingType != "" ){
		this._drill_COWC_timing_inputTickSkip_keepSkip = undefined;
	}
}


//=============================================================================
// ** ☆逐个绘制全局容器
//
//			说明：	> 该模块提供 逐个绘制全局容器 的功能，能根据序列号，直接获取到bitmap对象，子插件专用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//##############################
// * 逐个绘制全局容器『字符逐个绘制流程』 - 是否处于逐个绘制流程中【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Window_Base.prototype.drill_COWC_timing_isTimingEnabled = function(){
	return this.contents.drill_COWC_timing_isTimingEnabled();
};
Bitmap.prototype.drill_COWC_timing_isTimingEnabled = function(){
	if( this._drill_COWC_timing_isTimingEnabled == undefined ){ return false; }
	return this._drill_COWC_timing_isTimingEnabled;
};
//##############################
// * 逐个绘制全局容器『字符逐个绘制流程』 - 获取当前画布序列号【标准函数】【Window_Base + Bitmap】
//			
//			参数：	> 无
//			返回：	> 数字
//			
//			说明：	> 如果没有处于流程中，或者其他情况，会返回-1。
//##############################
Window_Base.prototype.drill_COWC_timing_getSerial = function(){
	return this.contents.drill_COWC_timing_getSerial();
};
Bitmap.prototype.drill_COWC_timing_getSerial = function(){
	if( this._drill_COWC_timing_isTimingEnabled != true ){ return -1; }
	if( this._drill_COWC_timing_serial == undefined ){ return -1; }
	return this._drill_COWC_timing_serial;
};
//##############################
// * 逐个绘制全局容器『字符逐个绘制流程』 - 根据序列号获取画布【标准函数】【Game_Temp】
//			
//			参数：	> serial 数字
//			返回：	> 对象
//			
//			说明：	> 如果 没有找到 或 已经结束了绘制，则返回空。
//##############################
Game_Temp.prototype.drill_COWC_timing_getBitmapBySerial = function( serial ){
	return this._drill_COWC_timing_bitmapTank[ serial ];
};
//==============================
// * 逐个绘制全局容器 - 容器初始化
//==============================
var _drill_COWC_timing_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_COWC_timing_temp_initialize.call(this);
	this._drill_COWC_timing_bitmapTank = {};
};
//==============================
// * 逐个绘制全局容器 - 容器标记（私有）
//==============================
Bitmap.prototype.drill_COWC_timing_setEnabled = function( enabled ){
	
	// > 标记去重
	if( this._drill_COWC_timing_isTimingEnabled == enabled ){ return; }
	this._drill_COWC_timing_isTimingEnabled = enabled;
	
	// > 加入时
	if( enabled == true ){
		this._drill_COWC_timing_serial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
		$gameTemp._drill_COWC_timing_bitmapTank[ this._drill_COWC_timing_serial ] = this;
		
	// > 清除时
	}else{
		$gameTemp._drill_COWC_timing_bitmapTank[ this._drill_COWC_timing_serial ] = undefined;
		this._drill_COWC_timing_serial = -1;
	}
}



//#############################################################################
// ** 【标准模块】☆逐个绘制阶段 标准模块
//#############################################################################
//##############################
// * 逐个绘制阶段 - 每行开始时【标准接口】【Bitmap】
//			
//			参数：	> rowBlock 对象  （单行块）
//					> row_index 数字 （当前行索引）
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_rowStart = function( rowBlock, row_index ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 逐个绘制阶段 - 每行结束时【标准接口】【Bitmap】
//			
//			参数：	> rowBlock 对象  （单行块）
//					> row_index 数字 （当前行索引）
//					> text_index 数字（当前字符索引）
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_rowEnd = function( rowBlock, row_index, text_index ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 逐个绘制阶段 - 每个字符开始时【标准接口】【Bitmap】
//			
//			参数：	> textBlock 对象 （字符块）
//					> row_index 数字 （当前行索引）
//					> text_index 数字（当前字符索引）
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 逐个绘制阶段 - 每个字符结束时【标准接口】【Bitmap】
//			
//			参数：	> textBlock 对象 （字符块）
//					> row_index 数字 （当前行索引）
//					> text_index 数字（当前字符索引）
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_textEnd = function( textBlock, row_index, text_index ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 逐个绘制阶段 - 流程开始时【标准接口】【Bitmap】
//			
//			参数：	> rowBlock_list 对象列表
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_allStart = function( rowBlock_list ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 逐个绘制阶段 - 流程结束时【标准接口】【Bitmap】
//			
//			参数：	> rowBlock_list 对象列表
//			返回：	> 无
//##############################
Bitmap.prototype.drill_COWC_timing_allEnd = function( rowBlock_list ){
	
	//（待子类继承写内容）
	
};


//=============================================================================
// ** ☆窗口字符应用之消息输入字符
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之消息输入字符 - 窗口字符 - 简单符配置
//==============================
var _drill_COWC_COWC_effect_processSimple_5 = Game_Temp.prototype.drill_COWC_effect_processSimple;
Game_Temp.prototype.drill_COWC_effect_processSimple = function( matched_index, matched_str ){
	_drill_COWC_COWC_effect_processSimple_5.call( this, matched_index, matched_str );
	
	// > 『窗口字符定义』字符应用B原版 - 等待15帧（\.）
	if( matched_str.substring(0,2).toUpperCase() == "\\." ){	//（注意，这里使用substring，\FBA 需要被切成 \FB 和 A ）
		this.drill_COWC_effect_submitSimple( 2, "@@@_ww[15]" );
	}
	// > 『窗口字符定义』字符应用B原版 - 等待60帧（\|）
	if( matched_str.substring(0,2).toUpperCase() == "\\|" ){
		this.drill_COWC_effect_submitSimple( 2, "@@@_ww[60]" );
	}
	
	// > 『窗口字符定义』字符应用B原版 - 等待按下（\!）
	if( matched_str.substring(0,2).toUpperCase() == "\\!" ){
		this.drill_COWC_effect_submitSimple( 2, "@@@_p1" );
	}
	// > 『窗口字符定义』字符应用B原版 - 等待按下开关（\^）
	if( matched_str.substring(0,2).toUpperCase() == "\\^" ){
		this.drill_COWC_effect_submitSimple( 2, "@@@_p2[false]" );
	}
}
//==============================
// * 窗口字符应用之消息输入字符 - 窗口字符 - 组合符配置
//==============================
var _drill_COWC_COWC_effect_processCombined_5 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_COWC_effect_processCombined_5.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』字符应用C扩展 - 等待100帧（\W[100]）
	if( command.toUpperCase() == "W" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@_ww[" + Number(args[0]) + "]" );
		}
	}
	
	// > 『窗口字符定义』字符应用C扩展 - 修改计时器间隔（\TI[100]）
	if( command.toUpperCase() == "TI" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@_ti[" + Number(args[0]) + "]" );
		}
	}
	
	// > 『窗口字符定义』字符应用C扩展 - 按下跳帧开关（\TS[ON]）
	if( command.toUpperCase() == "TS" ){
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@_ts[" + String(args[0]) + "]" );
		}
	}
}
//==============================
// * 窗口字符应用之消息输入字符 - 底层字符 - 样式阶段-配置阶段
//==============================
var _drill_COWC_COCD_textBlock_processStyle_5 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COWC_COCD_textBlock_processStyle_5.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 等待100帧（@@@_ww[100]） wait_wait（窗口字符包含\.和\|）
	if( command.toLowerCase() == "@@@_ww" ){
		if( args.length == 1 ){
			if( cur_blockParam['waitTime'] == undefined ){ 
				cur_blockParam['waitTime'] = 0;
			}
			cur_blockParam['waitTime'] += Number(args[0]);
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 修改计时器间隔（@@@_ti[3]） setPerTick
	if( command.toLowerCase() == "@@@_ti" ){
		if( args.length == 1 ){
			cur_blockParam['perTick'] = Number(args[0]);
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 按下跳帧开关（@@@_ts[true]） inputTickSkip
	if( command.toLowerCase() == "@@@_ts" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" ||
				String(args[0]).toUpperCase() == "TRUE" ){
				cur_blockParam['inputTickSkip'] = true;
			}else{
				cur_blockParam['inputTickSkip'] = false;
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	
	// > 『底层字符定义』 - 立刻显示_单行（@@@_s1） skip_1（窗口字符包含\>）
	if( command.toLowerCase() == "@@@_s1" ){
		if( args.length == 0 ){
			cur_blockParam['tickRowSkip'] = true;
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 取消 立刻显示_单行（@@@_s2） skip_2（窗口字符包含\<）
	if( command.toLowerCase() == "@@@_s2" ){
		if( args.length == 0 ){
			cur_blockParam['tickRowSkip'] = false;
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 立刻显示_跨行（@@@_s3） skip_3（脚本专用）
	if( command.toLowerCase() == "@@@_s3" ){
		if( args.length == 0 ){
			cur_blockParam['tickSkip'] = true;
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 取消 立刻显示_跨行（@@@_s4） skip_4（脚本专用）
	if( command.toLowerCase() == "@@@_s4" ){
		if( args.length == 0 ){
			cur_blockParam['tickSkip'] = false;
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 等待按下（@@@_p1） pause_1（窗口字符包含\!）
	if( command.toLowerCase() == "@@@_p1" ){
		if( args.length == 0 ){
			cur_blockParam['waitForInputOnce'] = true;
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 等待按下开关（@@@_p2[true]） pause_2（窗口字符包含\^）
	if( command.toLowerCase() == "@@@_p2" ){
		if( args.length == 1 ){
			cur_blockParam['waitForInputEnabled'] = (String(args[0]) == "true");
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
}
//==============================
// * 窗口字符应用之消息输入字符 - 底层字符 - 样式阶段-回滚样式
//==============================
var _drill_COWC_COCD_textBlock_restoreStyle_5 = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COWC_COCD_textBlock_restoreStyle_5.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 等待100帧（@@@_ww[100]）
	cur_blockParam['waitTime'] = undefined;
	
	// > 『底层字符样式回滚』 - 修改计时器间隔（@@@_ti[3]）
	cur_blockParam['perTick'] = undefined;
	
	// > 『底层字符样式回滚』 - 按下跳帧开关（@@@_ts[true]）
	cur_blockParam['inputTickSkip'] = undefined;
	
	
	// > 『底层字符样式回滚』 - 立刻显示_单行（@@@_s1、@@@_s2）
	cur_blockParam['tickRowSkip'] = undefined;
	// > 『底层字符样式回滚』 - 立刻显示_跨行（@@@_s3、@@@_s4）
	cur_blockParam['tickSkip'] = undefined;
	
	
	// > 『底层字符样式回滚』 - 等待按下（@@@_p1）
	cur_blockParam['waitForInputOnce'] = undefined;
	// > 『底层字符样式回滚』 - 等待按下（@@@_p2[true]）
	cur_blockParam['waitForInputEnabled'] = undefined;
}
//==============================
// * 窗口字符应用之消息输入字符 - 绘制过程 - 每个字符开始时
//==============================
var _drill_COWC_COWC_timing_textStart_5 = Bitmap.prototype.drill_COWC_timing_textStart;
Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
	_drill_COWC_COWC_timing_textStart_5.call( this, textBlock, row_index, text_index );
	/*
		这个过程已经处于 逐个绘制 中，且 <xxx>  \xxx  \xxx[xxx]  @@@xxx 全部都转换完毕。
		进入到此函数，至少与前面的字符解析过程相差1帧，具体看update情况。
	*/
	var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
	
	
	// > 『绘制过程定义』 - 等待（@@@_ww[]）
	//	（见函数 drill_COWC_timing_tickEmergencyWait ）
	
	
	// > 『绘制过程定义』 - 修改计时器间隔（@@@_ti[3]）
	if( cur_blockParam['perTick'] != undefined ){
		this.drill_COWC_timing_setPerTick( cur_blockParam['perTick'] );
	}
	
	// > 『绘制过程定义』 - 按下跳帧开关（@@@_ts[true]）
	if( cur_blockParam['inputTickSkip'] != undefined ){
		this._drill_COWC_timing_inputTickSkip_enabled = cur_blockParam['inputTickSkip'];
	}
	
	
	// > 『绘制过程定义』 - 立刻显示_单行（@@@_s1）
	if( cur_blockParam['tickRowSkip'] == true ){
		this._drill_COWC_timing_tickRowSkip = true;
	}
	// > 『绘制过程定义』 - 取消 立刻显示_单行（@@@_s2）
	if( cur_blockParam['tickRowSkip'] == false ){
		this._drill_COWC_timing_tickRowSkip = undefined;
	}
	// > 『绘制过程定义』 - 立刻显示_跨行（@@@_s3）
	if( cur_blockParam['tickSkip'] == true ){
		this._drill_COWC_timing_tickSkip = true;
	}
	// > 『绘制过程定义』 - 取消 立刻显示_跨行（@@@_s4）
	if( cur_blockParam['tickSkip'] == false ){
		this._drill_COWC_timing_tickSkip = undefined;
	}
	
	
	// > 『绘制过程定义』 - 等待按下（@@@_p1）
	//	（见函数 drill_COWC_timing_tickInputWait ）
	
	// > 『绘制过程定义』 - 等待按下（@@@_p2[true]）
	//	（见函数 drill_COWC_timing_tickInputWait ）
}
	
	
//=============================================================================
// ** ☆DEBUG逐个绘制的底层字符应用
//
//			说明：	> 此模块兼容 字符绘制核心 的 DEBUG底层字符应用 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG逐个绘制的底层字符应用 - 每行开始时
//==============================
var _drill_COWC_COWC_timing_rowStart = Bitmap.prototype.drill_COWC_timing_rowStart;
Bitmap.prototype.drill_COWC_timing_rowStart = function( rowBlock, row_index ){
	_drill_COWC_COWC_timing_rowStart.call( this, rowBlock, row_index );
	
	// > 绘制范围盒【系统 - 字符绘制核心】
	this.drill_COCD_drawDebugBoxRect( rowBlock );
	
	// > 绘制单行标线【系统 - 字符绘制核心】
	this.drill_COCD_drawDebugRowRect( rowBlock );
}
	
	
//=============================================================================
// ** ☆DEBUG逐个绘制流程测试
//
//			说明：	> 此模块控制 DEBUG逐个绘制流程测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG逐个绘制流程测试 - 帧刷新（地图界面）
//==============================
var _drill_COWC_timing_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COWC_timing_debugMap_update.call(this);
	
	// > 创建贴图（消息输入字符）
	if( $gameTemp._drill_COWC_timing_DebugEnabled == true ){
		$gameTemp._drill_COWC_timing_DebugEnabled = undefined;
		this.drill_COWC_timing_createDebugWindow();
	}
	
	// > 帧刷新贴图（消息输入字符）
	this.drill_COWC_timing_updateDebugWindow();
	
	// > 销毁贴图（消息输入字符）
	if( $gameTemp._drill_COWC_timing_DebugEnabled == false ){
		$gameTemp._drill_COWC_timing_DebugEnabled = undefined;
		if( this._drill_COWC_timing_DebugWindow != undefined ){
			this.removeChild(this._drill_COWC_timing_DebugWindow);
			this._drill_COWC_timing_DebugWindow = undefined;
		}
	}
}
//==============================
// * DEBUG逐个绘制流程测试 - 创建贴图（消息输入字符）
//==============================
Scene_Map.prototype.drill_COWC_timing_createDebugWindow = function() {
	
	// > 销毁贴图
	if( this._drill_COWC_timing_DebugWindow != undefined ){
		this.removeChild(this._drill_COWC_timing_DebugWindow);
		this._drill_COWC_timing_DebugWindow = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 140, 140, 536, 344 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_COWC_timing_DebugWindow = temp_window;
	
	// > 绘制 - DEBUG显示画布范围
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	// > 绘制 - 测试的字符
	var text =  "\\>【" + DrillUp.g_COWC_PluginTip_curName + "】<br>" + 
				"每个窗口字符可以逐个绘制。<br>" + 
				"当前测试所有 逐个绘制的窗口字符 的逐个绘制效果，如下： <br>" + 
				
				"\\c[24]》字符应用B原版-消息输入字符：\\fr<br>" + 
				"    \\\\.    等待 15 帧    测\\.试\\.的\\.字\\.符  \\fr<br>" + 
				"    \\\\|   等待 60 帧    测试的\\|字符  \\fr<br>" + 
				"    \\\\ >   立刻显示一行内后面文本    \\>测试的字符测试的字符  \\fr<br>" + 
				"    \\\\ <   取消立刻显示    （这里不展示效果）  \\fr<br>" + 
				"    \\\\!   等待输入    （现在按确定键两次）\\!按键后显示该文本  \\fr<br>" + 
				
				"\\c[24]》字符应用C扩展-消息输入字符：\\fr<br>" + 
				"    \\\\w[100]    等待 100 帧    测试的\\w[100]字符  \\fr<br>" + 
				
				"\\c[24]》字符块贴图：（需要 窗口字符贴图核心）\\fr<br>" + 
				"    \\dts[测试]  的  \\dts[字符]  \\fr<br>";
	
	// > 『字符逐个绘制流程』 - 设置计时器间隔
	temp_bitmap.drill_COWC_timing_setPerTick( 2 );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	temp_window.drill_COWC_timing_initDrawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_window.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * DEBUG逐个绘制流程测试 - 帧刷新贴图（消息输入字符）
//==============================
Scene_Map.prototype.drill_COWC_timing_updateDebugWindow = function() {
	
	// > 『字符逐个绘制流程』 - 逐个绘制帧刷新
	if( this._drill_COWC_timing_DebugWindow != undefined ){
		var temp_window = this._drill_COWC_timing_DebugWindow;
		temp_window.drill_COWC_timing_updateTick();
	}
}
	
	
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfWindowCharacter = false;
		var pluginTip = DrillUp.drill_COWC_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

