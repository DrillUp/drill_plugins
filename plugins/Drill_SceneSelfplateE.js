//=============================================================================
// Drill_SceneSelfplateE.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        面板 - 全自定义信息面板E
 * @author Drill_up
 * 
 * @Drill_LE_param "阶段-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_SSpE_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_SceneSelfplateE +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的信息面板E。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfScreenRoller    系统-滚轴核心
 *     必须基于该插件才能滚轴播放内容。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SSpE
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.若要开始上手设计，去看看 "18.面板 > 关于全自定义信息面板.docx"。
 * 结构：
 *   (1.插件包含：1个滚轴式长画布
 *      进入面板后，以滚动图片、文字、GIF的方式播放。
 *   (2.如果你想开始绘制内容，见 "18.面板 > 关于滚轴式长画布.docx"。
 * 内容：
 *   (1.当滚动到指定阶段时，该阶段的gif才开始播放。
 *      你还可以设置开始播放的额外延迟时间。
 *   (2.内容遮罩控制内容的整体透明度，白色表示不透明部分，黑色表示
 *      透明部分。
 *   (3.内容支持所有文本的特殊字符：
 *       \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      其他特殊字符可见插件 窗口字符-窗口字符核心 的说明，
 *      或者去看看文档 "23.窗口字符 > 关于窗口字符.docx"。
 *   (4.内容可以包含表达式，用于特殊的功能显示。
 *      表达式介绍见"系统-窗口辅助核心"插件。
 * 设计：
 *   (1.该面板为一个超长画布，适合图文故事背景、卷轴书画、名单列表，
 *      但不太适合描述灵活多变的内容。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__self （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__self文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 * 
 * 资源-整体布局
 * 资源-内容遮罩
 * 
 * 阶段-1 资源-单图
 * 阶段-1 资源-GIF
 * 阶段-2 资源-单图
 * 阶段-2 资源-GIF
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义信息面板，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>信息面板E : 打开面板
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
 * 测试结果：   在菜单界面中，基本元素消耗为：【13.65ms】
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
 * 修复了修改游戏分辨率时，遮罩挡住字幕的问题。
 * 遮罩资源会根据游戏分辨率自动缩放。
 * 
 *
 * @param ----杂项----
 * @default 
 * 
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 整体布局的图片资源。静态放置在面板最上层，一般为面板的框架图像。
 * @default 信息面板E-整体布局
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 资源-内容遮罩
 * @parent ----杂项----
 * @desc 内容遮罩的图片资源。静态放置在内容上层，将遮住滚轴的面板内容。
 * @default 信息面板E-内容遮罩
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 是否添加到主菜单
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default false
 *
 * @param 主菜单显示名
 * @parent 是否添加到主菜单
 * @desc 主菜单显示的选项名。
 * @default 信息面板E
 *
 * @param 是否在标题窗口中显示
 * @parent ----杂项----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true-显示,false-不显示。注意数据存储的位置，如果是正常存储，标题将打开上一存档的数据。没有存档则会报错。
 * @default false
 *
 * @param 标题窗口显示名
 * @parent 是否在标题窗口中显示
 * @desc 标题窗口显示的名称。
 * @default 信息面板E
 *
 * @param 是否初始阶段渐变显示
 * @parent ----杂项----
 * @type boolean
 * @on 渐变显示
 * @off 立即显示
 * @desc true - 渐变显示，false - 立即显示
 * @default true
 * 
 * @param 渐变速度
 * @parent 是否初始阶段渐变显示
 * @desc 初始阶段渐变中，渐变显示的速度。
 * @default 2
 *
 * @param ----滚动内容----
 * @default 
 *
 * @param 阶段-1
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-2
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-3
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-4
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-5
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-6
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-7
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-8
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-9
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-10
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-11
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-12
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-13
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-14
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-15
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-16
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-17
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-18
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-19
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-20
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-21
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-22
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-23
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-24
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-25
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-26
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-27
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-28
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-29
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-30
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-31
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-32
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-33
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-34
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-35
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-36
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-37
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-38
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-39
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-40
 * @parent ----滚动内容----
 * @type struct<CreditsRollLevel>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 * 
 * 
 */
/*~struct~CreditsRollLevel:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的滚动阶段==
 * 
 *
 * @param 阶段高度
 * @type number
 * @min 0
 * @desc 当前阶段所占用滚轴的高度，高度可以为0，0高度将会和下一个阶段的内容重合在一起。
 * @default 624
 *
 * @param 阶段滚动速度
 * @desc 当前阶段时滚动的速度，单位像素/帧。
 * @default 1.5
 * 
 * @param 显示模式
 * @type select
 * @option 单图模式
 * @value 单图模式
 * @option GIF模式
 * @value GIF模式
 * @option 文本模式
 * @value 文本模式
 * @desc 当前阶段显示的模式。
 * @default 单图模式
 * 
 * @param ---单图模式---
 * @desc 
 * 
 * @param 资源-单图
 * @parent ---单图模式---
 * @default 
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * @param 平移-单图 X
 * @parent ---单图模式---
 * @desc x轴方向平移，单位像素。0为贴在中间，正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-单图 Y
 * @parent ---单图模式---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 * 
 * @param ---GIF模式---
 * @desc 
 * 
 * @param 资源-GIF
 * @parent ---GIF模式---
 * @desc png图片资源组，多张构成gif。
 * @default []
 * @require 1
 * @dir img/Menu__self/
 * @type file[]
 * 
 * @param 平移-GIF X
 * @parent ---GIF模式---
 * @desc x轴方向平移，单位像素。0为贴在中间，正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-GIF Y
 * @parent ---GIF模式---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 * 
 * @param 开始播放延迟
 * @parent ---GIF模式---
 * @type number
 * @min 0
 * @desc 当滚动到当前阶段时，gif才开始播放。这里设置开始播放的额外延迟时间。（1秒60帧）
 * @default 60
 *
 * @param 帧间隔
 * @parent ---GIF模式---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---GIF模式---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param GIF到末尾是否重播
 * @parent ---GIF模式---
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播
 * @default true
 * 
 * @param ---文本模式---
 * @desc 
 * 
 * @param 文本内容
 * @parent ---文本模式---
 * @type note
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default ""
 *
 * @param 文本字体大小
 * @parent ---文本模式---
 * @type number
 * @min 1
 * @desc 文本中的字体大小。
 * @default 24
 *
 * @param 文本对齐方式
 * @parent ---文本模式---
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 文本的对齐方式。
 * @default 居中
 *
 * @param 是否激活表达式
 * @parent ---文本模式---
 * @type boolean
 * @on 激活
 * @off 关闭
 * @desc true - 激活，false - 关闭
 * @default true
 *
 * @param 文本是否自适应行间距
 * @parent ---文本模式---
 * @type boolean
 * @on 自适应
 * @off 固定行间距
 * @desc true - 自适应，false - 固定行间距
 * @default true
 *
 * @param 文本固定行间距
 * @parent 文本是否自适应行间距
 * @type number
 * @min 1
 * @desc 如果你选择了手动行间距，这里将使得每行的文字的行间距都是固定值。
 * @default 28
 * 
 * @param 平移-文本 X
 * @parent ---文本模式---
 * @desc x轴方向平移，单位像素。0为贴在中间，正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-文本 Y
 * @parent ---文本模式---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 当前阶段BGM设置
 * @type select
 * @option 播放新的BGM
 * @value 播放新的BGM
 * @option 不操作
 * @value 不操作
 * @option 暂停之前的BGM
 * @value 暂停之前的BGM
 * @desc 当前阶段设置BGM。
 * @default 不操作
 *
 * @param 资源-BGM
 * @parent 当前阶段BGM设置
 * @desc 设置播放新的BGM时，配置的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSpE（Scene_Credits）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	13.65ms  10.97ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			信息面板E：
//				->内容遮罩
//				->滚轴窗口
//				->加速滚轴按键
//				->退出滚轴按键
//
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SSpE
//				信息面板E
//				Drill_SceneSelfplateE
//
//		★其它说明细节：
//			1.滚轴核心自动添补了所有默认值，即使缺项，也不会造成插件报错。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SceneSelfplateE = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateE');
	
	/*-----------------杂项------------------*/
    DrillUp.g_SSpE_layout = String(DrillUp.parameters['资源-整体布局'] || "");
    DrillUp.g_SSpE_contextMask = String(DrillUp.parameters['资源-内容遮罩'] || "");
	DrillUp.g_SSpE_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.g_SSpE_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.g_SSpE_add_to_title = String(DrillUp.parameters['是否在标题窗口中显示'] || "false") === "true";	
    DrillUp.g_SSpE_title_name = String(DrillUp.parameters['标题窗口显示名'] || "");
    DrillUp.g_SSpE_opacityShow = String(DrillUp.parameters['是否初始阶段渐变显示'] || "true") == "true";
    DrillUp.g_SSpE_opacitySpeed = Number(DrillUp.parameters['渐变速度'] || 2);

	/*-----------------阶段------------------*/
	DrillUp.g_SSpE_list_length = 40;
	DrillUp.g_SSpE_list = [];
	for (var i = 0; i < DrillUp.g_SSpE_list_length; i++) {
		if( DrillUp.parameters['阶段-' + String(i+1) ] != "" &&
			DrillUp.parameters['阶段-' + String(i+1) ] != undefined ){
			DrillUp.g_SSpE_list[i] = JSON.parse(DrillUp.parameters['阶段-' + String(i+1) ]);
			DrillUp.g_SSpE_list[i]['height'] = Number(DrillUp.g_SSpE_list[i]["阶段高度"] || 0);
			DrillUp.g_SSpE_list[i]['speed'] = Number(DrillUp.g_SSpE_list[i]["阶段滚动速度"] || 1.5);
			DrillUp.g_SSpE_list[i]['mode'] = String(DrillUp.g_SSpE_list[i]["显示模式"] || "单图模式");
			DrillUp.g_SSpE_list[i]['img_src'] = String(DrillUp.g_SSpE_list[i]["资源-单图"] || "");
			DrillUp.g_SSpE_list[i]['img_src_file'] = "img/Menu__self/";
			DrillUp.g_SSpE_list[i]['img_x'] = Number(DrillUp.g_SSpE_list[i]["平移-单图 X"] || 0);
			DrillUp.g_SSpE_list[i]['img_y'] = Number(DrillUp.g_SSpE_list[i]["平移-单图 Y"] || 0);
			DrillUp.g_SSpE_list[i]['gif_src'] = JSON.parse(DrillUp.g_SSpE_list[i]["资源-GIF"]);
			DrillUp.g_SSpE_list[i]['gif_src_file'] = "img/Menu__self/";
			DrillUp.g_SSpE_list[i]['gif_x'] = Number(DrillUp.g_SSpE_list[i]["平移-GIF X"] || 0);
			DrillUp.g_SSpE_list[i]['gif_y'] = Number(DrillUp.g_SSpE_list[i]["平移-GIF Y"] || 0);
			DrillUp.g_SSpE_list[i]['gif_delay'] = Number(DrillUp.g_SSpE_list[i]["开始播放延迟"] || 60);
			DrillUp.g_SSpE_list[i]['gif_interval'] = Number(DrillUp.g_SSpE_list[i]["帧间隔"] || 4);
			DrillUp.g_SSpE_list[i]['gif_back_run'] = String(DrillUp.g_SSpE_list[i]["是否倒放"] || "false") == "true";
			DrillUp.g_SSpE_list[i]['gif_replay'] = String(DrillUp.g_SSpE_list[i]["GIF到末尾是否重播"] || "false") == "true";
			//描述内容处理
			var temp = String(DrillUp.g_SSpE_list[i]["文本内容"] || "");
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
			temp = temp.split(/\\n/);
			DrillUp.g_SSpE_list[i]['text_context'] = temp;
			DrillUp.g_SSpE_list[i]['text_fontSize'] = Number(DrillUp.g_SSpE_list[i]["文本字体大小"] || 24);
			DrillUp.g_SSpE_list[i]['text_align'] = String(DrillUp.g_SSpE_list[i]["文本对齐方式"] || "居中");
			DrillUp.g_SSpE_list[i]['text_convertEnabled'] = String(DrillUp.g_SSpE_list[i]["是否激活表达式"] || "true") === "true";	
			DrillUp.g_SSpE_list[i]['text_autoLineheight'] = String(DrillUp.g_SSpE_list[i]["文本是否自适应行间距"] || "true") === "true";	
			DrillUp.g_SSpE_list[i]['text_lineheight'] = Number(DrillUp.g_SSpE_list[i]["文本固定行间距"] || 28);
			DrillUp.g_SSpE_list[i]['text_x'] = Number(DrillUp.g_SSpE_list[i]["平移-文本 X"] || 0);
			DrillUp.g_SSpE_list[i]['text_y'] = Number(DrillUp.g_SSpE_list[i]["平移-文本 Y"] || 0);
			DrillUp.g_SSpE_list[i]['bgm_set'] = String(DrillUp.g_SSpE_list[i]["当前阶段BGM设置"] || "不操作");
			DrillUp.g_SSpE_list[i]['bgm_src'] = String(DrillUp.g_SSpE_list[i]["资源-BGM"] || "");
		}else{
			DrillUp.g_SSpE_list[i] = {};
		}
	}

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfScreenRoller ){
	
	
//=============================================================================
// ** 图片路径管理器
//=============================================================================
ImageManager.load_MenuSelfDef = function(filename) {
    return this.loadBitmap('img/Menu__self/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_SSpE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SSpE_pluginCommand.call(this, command, args);
	
	if (command === ">信息面板E") {
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SSpE);
			}
		}
	}
}

//=============================================================================
// * Scene_Menu 主菜单按钮
//=============================================================================
var _drill_SSpE_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SSpE_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SSpE',   this.drill_SSpE_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SSpE_menuCommand = function() {
    SceneManager.push(Scene_Drill_SSpE);
};
var _drill_SSpE_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SSpE_addOriginalCommands.call(this);
	if( DrillUp.g_SSpE_add_to_menu ){
		this.addCommand(DrillUp.g_SSpE_menu_name, 'Drill_SSpE', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _drill_SSpE_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SSpE_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SSpE',  this.drill_SSpE_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SSpE_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SSpE);
};
var _drill_SSpE_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SSpE_title_makeCommandList.call(this);
	if( DrillUp.g_SSpE_add_to_title ){
		this.addCommand( DrillUp.g_SSpE_title_name ,'Drill_SSpE');
	}
};	


//=============================================================================
// ** 信息面板E【Scene_Drill_SSpE】
//
//			主功能：	滚动画布界面的基本功能。
//			子功能：
//						->基本功能
//							> 继承属性
//							> 初始化
//							> 创建
//							> 帧刷新
//						->滚轴画布
//						->流程
//							->画布加速（ok键）
//							->退出窗口（cancel键）
//			主要成员：
//						> ._drill_roller			滚轴画布
//						> ._drill_contextMask		内容遮罩
//					
//			说明：	暂无。
//=============================================================================
//==============================
// * 信息面板E - 定义
//==============================
function Scene_Drill_SSpE() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SSpE.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SSpE.prototype.constructor = Scene_Drill_SSpE;
//==============================
// * 信息面板E - 初始化
//==============================
Scene_Drill_SSpE.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	//...（暂无）
};
//==============================
// * 信息面板E - 创建
//==============================
Scene_Drill_SSpE.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);	//内容层（先画，其图层都被放在后面）
	
	this.drill_createLayout();			//整体布局
	this.drill_createContextMask();		//内容遮罩
	this.drill_createRoller();			//建立滚轴
}

//==============================
// * 信息面板E - 帧刷新
//==============================
Scene_Drill_SSpE.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	this.drill_updateMask();			//遮罩缩放
	this.drill_updateQuit();			//退出监听
}

//==============================
// * 创建 - 整体布局
//==============================
Scene_Drill_SSpE.prototype.drill_createLayout = function() {
	this._drill_layout = new Sprite( ImageManager.load_MenuSelfDef(DrillUp.g_SSpE_layout) );
	this.addChild(this._drill_layout);	
};
//==============================
// * 创建 - 内容遮罩
//==============================
Scene_Drill_SSpE.prototype.drill_createContextMask = function() {
	this._drill_contextMask = new Sprite( ImageManager.load_MenuSelfDef(DrillUp.g_SSpE_contextMask) );
	this._drill_contextMask_needResize = true;
	this._drill_contextMask_resized = false;
	this._drill_field.addChild(this._drill_contextMask);	
	this._drill_field.mask = this._drill_contextMask;	
};
//==============================
// * 创建 - 建立滚轴
//==============================
Scene_Drill_SSpE.prototype.drill_createRoller = function() {
	var data = {
		"opacityShow":DrillUp.g_SSpE_opacityShow,
		"opacitySpeed":DrillUp.g_SSpE_opacitySpeed,
		"steps":DrillUp.g_SSpE_list,
	};
	this._drill_roller = new Drill_COSR_Sprite( data );
	this._drill_field.addChild(this._drill_roller);	
	
	this._drill_roller.drill_COSR_start();	//启动
};


//==============================
// * 帧刷新 - 遮罩缩放
//==============================
Scene_Drill_SSpE.prototype.drill_updateMask = function() {
	if( this._drill_contextMask_needResize == true &&
		this._drill_contextMask.bitmap.isReady() ){
		this._drill_contextMask_needResize = false;
		
		var w = this._drill_contextMask.bitmap.width;
		var h = this._drill_contextMask.bitmap.height;
		this._drill_contextMask.scale.x = Graphics.boxWidth / w;
		this._drill_contextMask.scale.y = Graphics.boxHeight / h;
	}
}
//==============================
// * 帧刷新 - 退出
//==============================
Scene_Drill_SSpE.prototype.drill_updateQuit = function() {
	
	// > 按键加速
	var b = TouchInput.isPressed() || Input.isPressed("ok");
	this._drill_roller.drill_COSR_speedUp(b);
	
	// > 按键退出
	if( TouchInput.isCancelled() || Input.isTriggered("cancel") ) {
		SoundManager.playCursor();
		SceneManager.pop();
	};	 
	
	// > 结束播放退出
	if( this._drill_roller.drill_COSR_isAtEnd() ){
		SceneManager.pop();
	}
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneSelfplateE = false;
		alert(
			"【Drill_SceneSelfplateE.js 面板 - 全自定义信息面板E】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfScreenRoller 系统-滚轴核心"
		);
}


