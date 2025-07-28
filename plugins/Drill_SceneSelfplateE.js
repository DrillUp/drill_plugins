//=============================================================================
// Drill_SceneSelfplateE.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        面板 - 全自定义信息面板E
 * @author Drill_up
 * 
 * @Drill_LE_param "阶段-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_SSpE_stepList_length"
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
 *   - Drill_CoreOfGlobalSave        管理器-全局存储核心
 *   - Drill_CoreOfScreenRoller      窗口字符-长画布贴图核心
 *     必须基于该插件才能建立长画布并播放内容。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SSpE
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.若要开始上手设计，去看看 "18.面板 > 关于全自定义信息面板.docx"。
 * 结构：
 *   (1.插件包含：1个长画布贴图
 *      进入面板后，可以滚动播放图片、文字、GIF。
 *   (2.如果你想开始绘制内容，见 "18.面板 > 关于长画布贴图核心.docx"。
 * 内容：
 *   (1.一个阶段的显示模式为GIF模式时，画面滚动到该阶段，GIF才开始播放。
 *      你可以设置GIF播放延迟，用于设计某个静态图片突然开始动了的效果。
 *   (2.内容遮罩控制内容的整体透明度，
 *      白色表示不透明部分，黑色表示透明部分。
 *   (3.一个阶段的显示模式为文本模式时，
 *      其文本内容支持所有窗口字符，包括动态的窗口字符。
 *      可以去看看文档 "23.窗口字符 > 关于窗口字符表.docx"。
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
 * ----可选设定 - 阶段设置
 * 你可以通过插件指令修改阶段设置：
 * 
 * 插件指令：>信息面板E : 显示阶段 : 阶段[1]
 * 插件指令：>信息面板E : 显示阶段 : 阶段变量[21]
 * 插件指令：>信息面板E : 隐藏阶段 : 阶段[1]
 * 插件指令：>信息面板E : 隐藏阶段 : 阶段变量[21]
 * 插件指令：>信息面板E : 显示全部阶段
 * 插件指令：>信息面板E : 隐藏全部阶段
 * 
 * 1.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
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
 * 测试结果：   在菜单界面中，基本元素消耗为：【5ms以下】
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
 * [v1.2]
 * 更新并兼容了新的窗口字符底层。
 * [v1.3]
 * 添加了阶段的显示与隐藏功能。
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
 * @desc 内容遮罩的图片资源。静态放置在内容上层，将遮住长画布的内容。
 * @default 信息面板E-内容遮罩
 * @require 1
 * @dir img/Menu__self/
 * @type file
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
 * 
 * @param ----面板跳转----
 * @default 
 *
 * @param 是否在主菜单窗口中显示
 * @parent ----面板跳转----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true-显示,false-不显示。
 * @default false
 *
 * @param 主菜单窗口显示名
 * @parent 是否在主菜单窗口中显示
 * @desc 主菜单显示的选项名。
 * @default 信息面板E
 *
 * @param 是否在标题窗口中显示
 * @parent ----面板跳转----
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
 * 
 * @param ----存储数据----
 * @default 
 *
 * @param 数据是否全局存储
 * @parent ----存储数据----
 * @type boolean
 * @on 全局存储
 * @off 正常存储
 * @desc true-存储在外部文件中,false-存储在普通存档文件中。(设置不会立即生效,要删旧档)
 * @default false
 *
 * @param 全局存储的文件路径
 * @parent ----存储数据----
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID,该插件的数据将存储到指定文件路径,具体看看"21.管理器 > 关于全局存储.docx"。
 * @default 1
 * 
 * 
 * @param ----滚动内容----
 * @default 
 *
 * @param 阶段-1
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-2
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-3
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-4
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-5
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-6
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-7
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-8
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-9
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-10
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-11
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-12
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-13
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-14
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-15
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-16
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-17
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-18
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-19
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-20
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-21
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-22
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-23
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-24
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-25
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-26
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-27
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-28
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-29
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-30
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-31
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-32
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-33
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-34
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-35
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-36
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-37
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-38
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-39
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 *
 * @param 阶段-40
 * @parent ----滚动内容----
 * @type struct<SSpEStep>
 * @desc 每个阶段的滚动内容设置。
 * @default 
 * 
 * 
 */
/*~struct~SSpEStep:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的滚动阶段==
 * 
 * 
 * @param 阶段高度
 * @type number
 * @min 0
 * @desc 当前阶段所占用长画布的高度，高度可以为0，0高度将会和下一个阶段的内容重合在一起。
 * @default 624
 *
 * @param 阶段滚动速度
 * @desc 当前阶段时滚动的速度，单位像素/帧。
 * @default 1.5
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
 * @desc 滚动到当前阶段时，可以播放指定BGM，也可以不操作。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 * 
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
 * @param 行高控制模式
 * @parent ---文本模式---
 * @type select
 * @option 默认补正
 * @value 默认补正
 * @option 自定义补正
 * @value 自定义补正
 * @option 锁定行高
 * @value 锁定行高
 * @option 关闭行高控制
 * @value 关闭行高控制
 * @desc 行高的控制模式。你也可以关闭行高控制，用窗口字符来修改行高设置。
 * @default 默认补正
 *
 * @param 自定义补正值
 * @parent 行高控制模式
 * @type number
 * @min 0
 * @desc 行高控制模式为"自定义补正"时，每行文本的行高补正值。（默认补正为36，因为默认字体就为28，所以补正值大）
 * @default 30
 *
 * @param 锁定行高值
 * @parent 行高控制模式
 * @type number
 * @min 0
 * @desc 行高控制模式为"锁定行高"时，锁定的行高值。
 * @default 30
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSpE（Scene_Selfplate_E）
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
//		★性能测试消耗	2025/7/27：
//							》3.9ms（drill_updateRoller）0.2ms（drill_updateMask）106.2ms（drill_createRoller）
//		★最坏情况		无
//		★备注			进入此面板后，前一场景的缓存全部清除，帧刷新也全部停止，有充足的计算资源给面板用。
//						因此不需要担心性能问题，但测一下性能也无伤大雅。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆全局存储
//			->☆存储数据
//			
//			->☆面板跳转之主菜单
//			->☆面板跳转之标题
//			->☆面板控制
//			
//			->信息面板E【Scene_Drill_SSpE】
//				->A主体
//				->B内容遮罩
//				->C长画布控制
//					->画布加速（ok键）
//					->退出窗口（cancel键）
//				->☆原型链规范（Scene_Drill_SSpE）
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 信息面板E【Scene_Drill_SSpE】
//		
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SSpE
//				信息面板E
//				Drill_SceneSelfplateE
//
//		★其它说明细节：
//			1.核心具备默认值，即使给的参数缺项，也不会造成插件报错。
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
	DrillUp.g_SSpE_PluginTip_curName = "Drill_SceneSelfplateE.js 面板-全自定义信息面板E";
	DrillUp.g_SSpE_PluginTip_baseList = [
		"Drill_CoreOfGlobalSave.js 管理器-全局存储核心",
		"Drill_CoreOfScreenRoller.js 窗口字符-长画布贴图核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_SSpE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_SSpE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_SSpE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_SSpE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_SSpE_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SceneSelfplateE = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateE');
	
	//==============================
	// * 静态数据 - 阶段
	//				（~struct~SSpEStep）
	//==============================
	DrillUp.drill_SSpE_initStep = function( dataFrom ){
		var data = {};
		
		// > B阶段
		data['stepVisible'] = String(dataFrom["阶段是否可见"] || "true") == "true";
		data['speed'] = Number(dataFrom["阶段滚动速度"] || 1.5);
		data['height'] = Number(dataFrom["阶段高度"] || 0);
		data['mode'] = String(dataFrom["显示模式"] || "单图模式");
		
		// > B阶段 - 单图模式
		data['img_src'] = String(dataFrom["资源-单图"] || "");
		data['img_src_file'] = "img/Menu__self/";
		data['img_x'] = Number(dataFrom["平移-单图 X"] || 0);
		data['img_y'] = Number(dataFrom["平移-单图 Y"] || 0);
		
		// > B阶段 - GIF模式
		if( dataFrom["资源-GIF"] != undefined &&
			dataFrom["资源-GIF"] != "" ){
			data['gif_src'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/Menu__self/";
		data['gif_x'] = Number(dataFrom["平移-GIF X"] || 0);
		data['gif_y'] = Number(dataFrom["平移-GIF Y"] || 0);
		data['gif_delay'] = Number(dataFrom["开始播放延迟"] || 60);
		data['gif_interval'] = Number(dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String(dataFrom["是否倒放"] || "false") == "true";
		data['gif_replay'] = String(dataFrom["GIF到末尾是否重播"] || "false") == "true";
		
		// > B阶段 - 文本模式
		if( dataFrom["文本内容"] != undefined &&
			dataFrom["文本内容"] != "" ){
			data['text_context'] = String( JSON.parse(dataFrom["文本内容"]) );
		}else{
			data['text_context'] = "";
		}
		data['text_fontSize'] = Number(dataFrom["文本字体大小"] || 24);
		data['text_align'] = String(dataFrom["文本对齐方式"] || "居中");
		data['text_lineheight_type'] = String(dataFrom["行高控制模式"] || "默认补正");
		data['text_lineheight_custom'] = Number(dataFrom["自定义补正值"] || 30);
		data['text_lineheight_lock'] = Number(dataFrom["锁定行高值"] || 30);
		data['text_x'] = Number(dataFrom["平移-文本 X"] || 0);
		data['text_y'] = Number(dataFrom["平移-文本 Y"] || 0);
		
		// > E音乐切换
		data['bgm_set'] = String(dataFrom["当前阶段BGM设置"] || "不操作");
		data['bgm_src'] = String(dataFrom["资源-BGM"] || "");
		
		return data;
	}
	
	/*-----------------阶段------------------*/
	DrillUp.g_SSpE_stepList_length = 40;
	DrillUp.g_SSpE_stepList = [];
	for( var i = 0; i < DrillUp.g_SSpE_stepList_length; i++ ){
		if( DrillUp.parameters["阶段-" + String(i+1) ] != undefined &&
			DrillUp.parameters["阶段-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["阶段-" + String(i+1) ]);
			DrillUp.g_SSpE_stepList[i] = DrillUp.drill_SSpE_initStep( data );
		}else{
			DrillUp.g_SSpE_stepList[i] = null;
		}
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_SSpE_layout = String(DrillUp.parameters["资源-整体布局"] || "");
    DrillUp.g_SSpE_contextMask = String(DrillUp.parameters["资源-内容遮罩"] || "");
    DrillUp.g_SSpE_opacityShow = String(DrillUp.parameters["是否初始阶段渐变显示"] || "true") == "true";
    DrillUp.g_SSpE_opacitySpeed = Number(DrillUp.parameters["渐变速度"] || 2);
	
	/*-----------------面板跳转------------------*/
	DrillUp.g_SSpE_add_to_menu = String(DrillUp.parameters["是否在主菜单窗口中显示"] || "true") === "true";	
    DrillUp.g_SSpE_menu_name = String(DrillUp.parameters["主菜单窗口显示名"] || "");
	DrillUp.g_SSpE_add_to_title = String(DrillUp.parameters["是否在标题窗口中显示"] || "false") === "true";	
    DrillUp.g_SSpE_title_name = String(DrillUp.parameters["标题窗口显示名"] || "");
	
	/*-----------------全局存储对象------------------*/
	DrillUp.g_SSpE_globalSetting_enabled = String(DrillUp.parameters["数据是否全局存储"] || "false") === "true";
    DrillUp.g_SSpE_globalSetting_fileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);
	DrillUp.global_SSpE_stepVisibleTank = null;
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave &&
	Imported.Drill_CoreOfScreenRoller ){
	
	
//=============================================================================
// ** ☆全局存储
//=============================================================================
//==============================
// * 『全局存储』 - 载入时检查数据 - 阶段显示情况
//==============================
DrillUp.drill_SSpE_gCheckData_enable = function(){
	for( var i = 0; i < DrillUp.g_SSpE_stepList.length; i++ ){
		var temp_data = DrillUp.g_SSpE_stepList[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpE_stepVisibleTank[i] == null ){
			if( temp_data == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpE_stepVisibleTank[i] = null;
			}else{							//（有内容配置，初始化默认）
				DrillUp.global_SSpE_stepVisibleTank[i] = temp_data['stepVisible'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 『全局存储』 - 载入
//==============================
	var global_fileId = DrillUp.g_SSpE_globalSetting_fileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "SSpE" );  //『全局存储执行函数』
	
	// > 显示情况
	if( DrillUp.global_SSpE_stepVisibleTank == null ){		//（游戏没关时，不会为null)
		var data = global_data["global_stepVisibleTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpE_stepVisibleTank = data;
		DrillUp.drill_SSpE_gCheckData_enable();				//（检查时自动赋新值）
	}
	
//==============================
// * 『全局存储』 - 存储
//==============================
StorageManager.drill_SSpE_saveData = function(){
	var file_id = DrillUp.g_SSpE_globalSetting_fileId;
	var data = {};
	data["global_stepVisibleTank"] = DrillUp.global_SSpE_stepVisibleTank;
	this.drill_COGS_saveData( file_id, "SSpE", data );  //『全局存储执行函数』
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SSpE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SSpE_sys_initialize.call(this);
	this.drill_SSpE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SSpE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SSpE_saveEnabled == true ){	
		$gameSystem.drill_SSpE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SSpE_initSysData();
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
Game_System.prototype.drill_SSpE_initSysData = function() {
	this.drill_SSpE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SSpE_checkSysData = function() {
	this.drill_SSpE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SSpE_initSysData_Private = function() {
	
	this._drill_SSpE_stepVisibleTank = [];				//阶段显示情况
	for( var i = 0; i < DrillUp.g_SSpE_stepList.length; i++ ){
		var temp_data = DrillUp.g_SSpE_stepList[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SSpE_stepVisibleTank[i] = temp_data['stepVisible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SSpE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SSpE_stepVisibleTank == undefined ){
		this.drill_SSpE_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_SSpE_stepList.length; i++ ){
		var temp_data = DrillUp.g_SSpE_stepList[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SSpE_stepVisibleTank[i] == undefined ){
				this._drill_SSpE_stepVisibleTank[i] = temp_data['stepVisible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_SSpE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_SSpE_pluginCommand.call(this, command, args);
	this.drill_SSpE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_SSpE_pluginCommand = function( command, args ){
	if( command === ">信息面板E" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "打开面板" ){
				SceneManager.push(Scene_Drill_SSpE);
			}
		}
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( temp1.indexOf("阶段变量[") != -1 ){
				temp1 = temp1.replace("阶段变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value(Number(temp1));
			}else if( temp1.indexOf("阶段[") != -1 ){
				temp1 = temp1.replace("阶段[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
			}
			if( type == "显示阶段" ){
				DrillUp.global_SSpE_stepVisibleTank[ Number(temp1)-1 ] = true;			//全局存储
				$gameSystem._drill_SSpE_stepVisibleTank[ Number(temp1)-1 ] = true;		//正常存储
				StorageManager.drill_SSpE_saveData();
			}
			if( type == "隐藏阶段" ){
				DrillUp.global_SSpE_stepVisibleTank[ Number(temp1)-1 ] = false;			//全局存储
				$gameSystem._drill_SSpE_stepVisibleTank[ Number(temp1)-1 ] = false;		//正常存储
				StorageManager.drill_SSpE_saveData();
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示全部阶段" ){
				for( var i = 0; i < DrillUp.g_SSpE_stepList.length; i++ ){
					DrillUp.global_SSpE_stepVisibleTank[i] = true;			//全局存储
					$gameSystem._drill_SSpE_stepVisibleTank[i] = true;		//正常存储
				}
				StorageManager.drill_SSpE_saveData();
			}
			if( type == "隐藏全部阶段" ){
				for( var i = 0; i < DrillUp.g_SSpE_stepList.length; i++ ){
					DrillUp.global_SSpE_stepVisibleTank[i] = false;			//全局存储
					$gameSystem._drill_SSpE_stepVisibleTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpE_saveData();
			}
		}
	}
}


//=============================================================================
// ** ☆面板跳转之主菜单
//
//			说明：	> 此模块专门关联主菜单选项，选项进入后跳转到 信息面板E 界面。
//					（插件完整的功能目录去看看：功能结构树）
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
// ** ☆面板跳转之标题
//
//			说明：	> 此模块专门关联标题选项，选项进入后跳转到 信息面板E 界面。
//					（插件完整的功能目录去看看：功能结构树）
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
// ** ☆面板控制
//
//			说明：	> 此模块专门将部分面板配置转移到 Game_Temp 方便随时调用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 面板控制 - 判断 显示情况
//==============================
Game_Temp.prototype.drill_SSpE_isVisible = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpE_globalSetting_enabled == true ){
		if( DrillUp.global_SSpE_stepVisibleTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpE_stepVisibleTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
};


//=============================================================================
// ** 信息面板E【Scene_Drill_SSpE】
// **
// **		作用域：	菜单界面
// **		主功能：	滚动画布界面的基本功能。
// **		子功能：
// **					->界面重要函数
// **						> 初始化（initialize）
// **						> 创建（create）
// **						> 帧刷新（update）
// **						x> 开始运行（start）
// **						x> 结束运行（stop）
// **						x> 忙碌状态（isBusy）
// **						> 析构函数（terminate）
// **						x> 判断加载完成（isReady）
// **						x> 判断是否激活/启动（isActive）
// **						x> 当前角色切换时（onActorChange）
// **						x> 创建 - 菜单背景（createBackground）
// **						x> 创建 - 帮助窗口（createHelpWindow）
// **					
// **					->A主体
// **					->B内容遮罩
// **					->C长画布控制
// **						->画布加速（ok键）
// **						->退出窗口（cancel键）
// **		界面成员：
// **					> ._drill_field				布局层
// **						> ._drill_rollerMask		内容遮罩
// **						> ._drill_rollerSprite		长画布贴图
// **					> ._drill_layout			整体布局贴图
// **				
// **		说明：	> 暂无。
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
// * 信息面板E - 初始化（继承）
//==============================
Scene_Drill_SSpE.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//==============================
// * 信息面板E - 创建（继承）
//==============================
Scene_Drill_SSpE.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.drill_createAttr();			//创建 - A主体
	this.drill_createMask();			//创建 - B内容遮罩
	this.drill_createRoller();			//创建 - C长画布控制
}
//==============================
// * 信息面板E - 帧刷新（继承）
//==============================
Scene_Drill_SSpE.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
										//帧刷新 - A主体（无）
	this.drill_updateMask();			//帧刷新 - B内容遮罩
	this.drill_updateRoller();			//帧刷新 - C长画布控制
}
//==============================
// * 信息面板E - 析构函数（继承）
//==============================
Scene_Drill_SSpE.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
	this._drill_rollerSprite.drill_sprite_destroy();
};

//==============================
// * A主体 - 创建
//==============================
Scene_Drill_SSpE.prototype.drill_createAttr = function() {
	
	// > 布局层（先画，其图层都被放在后面）
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);
	
	// > 整体布局贴图
	this._drill_layout = new Sprite( ImageManager.loadBitmap("img/Menu__self/", DrillUp.g_SSpE_layout, 0, true) );
	this.addChild(this._drill_layout);	
};

//==============================
// * B内容遮罩 - 创建
//==============================
Scene_Drill_SSpE.prototype.drill_createMask = function() {
	var mask_src = DrillUp.g_SSpE_contextMask;
	if( mask_src == undefined ){ return; }
	if( mask_src == "" ){ return; }
	this._drill_rollerMask = new Sprite( ImageManager.loadBitmap("img/Menu__self/", mask_src, 0, true) );
	this._drill_rollerMask_needResize = true;
	this._drill_field.addChild(this._drill_rollerMask);	
	this._drill_field.mask = this._drill_rollerMask;			//『遮罩赋值』
};
//==============================
// * B内容遮罩 - 帧刷新
//==============================
Scene_Drill_SSpE.prototype.drill_updateMask = function() {
	if( this._drill_rollerMask_needResize == true &&
		this._drill_rollerMask.bitmap.isReady() ){
		this._drill_rollerMask_needResize = false;
		
		var w = this._drill_rollerMask.bitmap.width;
		var h = this._drill_rollerMask.bitmap.height;
		this._drill_rollerMask.scale.x = Graphics.boxWidth / w;
		this._drill_rollerMask.scale.y = Graphics.boxHeight / h;
	}
}

//==============================
// * C长画布控制 - 创建
//==============================
Scene_Drill_SSpE.prototype.drill_createRoller = function() {
	
	// > 阶段列表
	var step_data = JSON.parse(JSON.stringify( DrillUp.g_SSpE_stepList ));
	for( var i = 0; i < step_data.length; i++ ){
		var temp_data = step_data[i];
		if( temp_data == undefined ){ continue; }
		temp_data['stepVisible'] = $gameTemp.drill_SSpE_isVisible( i );
	}
	
	// > 长画布贴图 - 数据
	var sprite_data = {
		"opacityShow": DrillUp.g_SSpE_opacityShow,		//开始时渐变显示 开关
		"opacitySpeed": DrillUp.g_SSpE_opacitySpeed,	//开始时渐变显示 速度
		"steps": step_data,								//阶段列表
	};
	
	// > 长画布贴图
	this._drill_rollerSprite = new Drill_COSR_Sprite( sprite_data );
	this._drill_field.addChild(this._drill_rollerSprite);	
	
	// > 长画布贴图 - 开始滚动
	this._drill_rollerSprite.drill_COSR_start();
};
//==============================
// * C长画布控制 - 帧刷新
//==============================
Scene_Drill_SSpE.prototype.drill_updateRoller = function() {
	
	// > 按键加速
	var b = TouchInput.isPressed() || Input.isPressed("ok");
	this._drill_rollerSprite.drill_COSR_speedUp(b);
	
	// > 按键退出
	if( TouchInput.isCancelled() || Input.isTriggered("cancel") ) {
		SoundManager.playCursor();
		SceneManager.pop();
	};	 
	
	// > 结束播放退出
	if( this._drill_rollerSprite.drill_COSR_isAtEnd() ){
		SceneManager.pop();
	}
}


//=============================================================================
// ** ☆原型链规范（Scene_Drill_SSpE）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 信息面板E（场景基类） - 初始化
//==============================
//Scene_Drill_SSpE.prototype.initialize = function() {
//    Scene_MenuBase.prototype.initialize.call(this);
//};
//==============================
// * 信息面板E（场景基类） - 创建
//==============================
//Scene_Drill_SSpE.prototype.create = function() {
//    Scene_MenuBase.prototype.create.call(this);
//};
//==============================
// * 信息面板E（场景基类） - 帧刷新
//==============================
//Scene_Drill_SSpE.prototype.update = function() {
//    Scene_MenuBase.prototype.update.call(this);
//};
//==============================
// * 信息面板E（场景基类） - 开始运行
//==============================
Scene_Drill_SSpE.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
//==============================
// * 信息面板E（场景基类） - 结束运行
//==============================
Scene_Drill_SSpE.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
};
//==============================
// * 信息面板E（场景基类） - 忙碌状态
//==============================
Scene_Drill_SSpE.prototype.isBusy = function() {
	return Scene_MenuBase.prototype.isBusy.call(this);
};
//==============================
// * 信息面板E（场景基类） - 析构函数
//==============================
//Scene_Drill_SSpE.prototype.terminate = function() {
//    Scene_MenuBase.prototype.terminate.call(this);
//};
//==============================
// * 信息面板E（场景基类） - 判断加载完成
//==============================
Scene_Drill_SSpE.prototype.isReady = function() {
	return Scene_MenuBase.prototype.isReady.call(this);
};
//==============================
// * 信息面板E（场景基类） - 判断是否激活/启动
//==============================
Scene_Drill_SSpE.prototype.isActive = function() {
	return Scene_MenuBase.prototype.isActive.call(this);
};

//==============================
// * 信息面板E（菜单界面基类） - 当前角色切换时
//==============================
Scene_Drill_SSpE.prototype.onActorChange = function() {
	Scene_MenuBase.prototype.onActorChange.call(this);
};
//==============================
// * 信息面板E（菜单界面基类） - 创建 - 菜单背景
//==============================
Scene_Drill_SSpE.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};
//==============================
// * 信息面板E（菜单界面基类） - 创建 - 帮助窗口
//==============================
Scene_Drill_SSpE.prototype.createHelpWindow = function() {
	Scene_MenuBase.prototype.createHelpWindow.call(this);
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneSelfplateE = false;
		var pluginTip = DrillUp.drill_SSpE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


