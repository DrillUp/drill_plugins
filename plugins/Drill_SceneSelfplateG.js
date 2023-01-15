//=============================================================================
// Drill_SceneSelfplateG.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        面板 - 全自定义信息面板G
 * @author Drill_up
 * 
 * @Drill_LE_param "内容-%d"
 * @Drill_LE_parentKey "---内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_SSpG_context_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_SceneSelfplateG +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的信息面板G。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心★★v1.3及以上★★
 *     必须基于该插件才能显示描述内容。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SSpG
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.若要开始上手设计，去看看 "18.面板 > 关于全自定义信息面板.docx"。
 * 结构：
 *   (1.插件包含：1个选项窗口 + 1个文本描述窗口 + 1个描述图 + 4个箭头
 *                + 流程锁定
 *      选项窗口中，每个选项都会改变 描述图和描述窗口 的内容。
 *      该插件比面板C多了流程锁定功能。
 *   (2.窗口的布局规划没有限制，去了解下 "17.主菜单 > 窗口与布局.docx"。
 * 全局存储：
 *   (1.该插件控制的选项显示/隐藏可以设置存储在全局文件中。
 *      如果游戏中修改了显示/隐藏，则永久有效，不保存也有效。
 *   (2.注意，如果配置显示/隐藏不起作用，记得删掉存档再看看。
 *   (3.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 * 窗口：
 *   (1.如果你只要一个单独的描述窗口：
 *      设置一个选项，然后把选项窗口设置y1000看不见即可。
 *   (2.如果你要做像任务激活那种形式：
 *      设置两个选项，一个激活，一个未激活（灰色），
 *      通过插件指令显示/隐藏两个按钮,只显示一个,使其看起来像一个选项。
 *   (3.注意，信息面板具有当前页记忆，如果你修改了一些选项，你需要用插
 *      件指令设置一下当前选中页。
 * 内容：
 *   (1.每篇内容可以单独控制行间距，居中对齐等功能。
 *   (2.选项窗口和描述窗口支持所有文本的特殊字符：
 *       \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      其他特殊字符可见插件 窗口字符-窗口字符核心 的说明，
 *      或者去看看文档 "23.窗口字符 > 关于窗口字符.docx"。
 *   (3.内容可以包含表达式，用于特殊的功能显示。
 *      表达式介绍见"系统-窗口辅助核心"插件。
 * 内容锁定：
 *   (1.你可以将某个内容锁定，锁定项将会只显示锁定信息。
 *      但注意前提是内容正在显示，没有隐藏。
 *   (2.内容锁定时，可以选择锁定内容或描述图。
 *      如果你想让锁定时描述图不显示，可以配置空的锁定图片。
 * 箭头：
 *   (1.上下左右箭头会根据选项矩阵中，所处的位置自动显示隐藏。
 *      选项窗口2列且含5个选项，那么矩阵就为2x3。
 * 流程锁定：
 *   (1.只有在末尾页按退出键才能退出。
 *      只有在末尾页才会出现结束按钮。
 *   (2.未在末尾页时，玩家的退出键被占用，只能翻页。
 *      并且，菜单返回按钮 也会被强制屏蔽。
 *   (3.流程锁定适用于 强制的新手教程 或者 必经的故事插曲 。
 *      要求玩家必须全部浏览一遍才能结束。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__self （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__self文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-整体布局           （默认为 信息面板G-整体布局）
 * 资源-锁定的描述图       （默认为 信息面板G-锁定描述图）
 * 选项窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 描述窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 
 * 内容1 资源-描述图片     （默认为 空）
 * 内容2 资源-描述图片     （默认为 空）
 * 内容3 资源-描述图片     （默认为 空）
 * ……
 * 
 * 资源-左箭头
 * 资源-右箭头
 * 资源-上箭头
 * 资源-下箭头
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义信息面板，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>信息面板G : 打开面板
 *
 * 插件指令：>信息面板G : 显示选项 : 1
 * 插件指令：>信息面板G : 隐藏选项 : 1
 * 插件指令：>信息面板G : 显示全部
 * 插件指令：>信息面板G : 隐藏全部
 * 
 * 插件指令：>信息面板G : 锁定选项 : 1
 * 插件指令：>信息面板G : 解锁选项 : 1
 * 插件指令：>信息面板G : 锁定全部
 * 插件指令：>信息面板G : 解锁全部
 *
 * 1.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 选中页
 * 你可以控制选项窗口当前选中第N页。（选项有3个，表示有3页）
 * 
 * 插件指令：>信息面板G : 选中页 : N
 * 
 * 1.信息面板具有当前页记忆，如果你修改了一些选项，你需要用该指令
 *   设置一下当前选中页。
 * 2.不存在第0页，如果选中页大于页数，将选择最末尾的页。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 末尾页
 * 你可以指定某一页为末尾页。
 * 
 * 插件指令：>信息面板G : 末尾页 : 最后一页
 * 插件指令：>信息面板G : 末尾页 : 3
 * 
 * 1."1"表示第1页，"3"表示第3页。
 *   "最后一页"表示打开菜单后，显示的选项中，最后的一个。
 *   注意，如果只有3个选项，末尾页却设为6，那么将以最后一页为准。
 * 2.只有在末尾页按退出键才能退出。
 *   只有在末尾页才会出现结束按钮。
 *   你可以设置只有某页才可以退出，后面的页反而不能退出。
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
 * 测试结果：   在菜单界面中，基本元素消耗为：【15.85ms】
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
 * 改进了内容锁定功能。
 * [v1.2]
 * 添加了选项窗口名称居中的功能。
 * [v1.3]
 * 添加了 长文本选项 功能的支持。以及 菜单指针/边框 的控制关闭功能。
 * [v1.4]
 * 添加了drill指针的控制。
 * [v1.5]
 * 优化了全局存储的结构，减小了存储的数据容量。
 * [v1.6]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.7]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 信息面板G-整体布局
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
 * @default 信息面板G
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
 * @default 信息面板G
 *
 * @param 数据是否全局存储
 * @parent 是否在标题窗口中显示
 * @type boolean
 * @on 全局存储
 * @off 正常存储
 * @desc true-存储在全局游戏中,false-普通存档,控制该面板的解锁隐藏的状态数据存储位置。(设置不会立即生效,要删旧档)
 * @default false
 *
 * @param 全局存储的文件路径
 * @parent 是否在标题窗口中显示
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID，该插件的数据将存储到指定的文件路径中，具体去 全局存储核心 看看。
 * @default 1
 *
 * @param ----锁定内容----
 * @default 
 *
 * @param 内容锁定方式
 * @parent ----锁定内容----
 * @type select
 * @option 锁定描述图和描述内容
 * @value 锁定描述图和描述内容
 * @option 只锁定描述图
 * @value 只锁定描述图
 * @option 只锁定描述内容
 * @value 只锁定描述内容
 * @desc 内容锁定的方式。
 * @default 锁定描述图和描述内容
 *
 * @param 用语-锁定的选项名
 * @parent ----锁定内容----
 * @desc 选项被锁定时，信息面板显示的选项名。
 * @default \c[7]---未知---
 *
 * @param 用语-锁定的选项内容
 * @parent ----锁定内容----
 * @type note
 * @desc 选项被锁定时，信息面板显示的内容。
 * @default "该内容的描述已被隐藏。"
 *
 * @param 资源-锁定的描述图
 * @parent ----锁定内容----
 * @desc 选项被锁定时，信息面板显示的描述图。
 * @default 信息面板G-锁定描述图
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * 
 * @param ----流程锁定----
 * @default 
 *
 * @param 末尾页
 * @parent ----流程锁定----
 * @type number
 * @min 0
 * @desc 处于流程锁定的那一页，0表示最后一页。你可以设置只有某页才可以退出，后面的页反而不能退出。
 * @default 0
 * 
 * @param 翻页音效
 * @parent ----流程锁定----
 * @desc 投掷花盆时，播放的音效。
 * @default Book1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param 资源-结束按钮
 * @parent ----流程锁定----
 * @desc 流程锁定按钮的图片资源。
 * @default 信息面板G-结束按钮
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * @param 平移-结束按钮 X
 * @parent ----流程锁定----
 * @desc x轴方向平移，单位像素。0为箭头的中心贴在最左边。
 * @default 408
 *
 * @param 平移-结束按钮 Y
 * @parent ----流程锁定----
 * @desc y轴方向平移，单位像素。0为箭头的中心贴在最上边。
 * @default 525
 * 
 * 
 * @param ----按键箭头----
 * @default 
 *
 * @param 资源-左箭头
 * @parent ----按键箭头----
 * @desc 左箭头的图片资源。
 * @default 信息面板G-左箭头
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 平移-左箭头 X
 * @parent ----按键箭头----
 * @desc x轴方向平移，单位像素。0为箭头的中心贴在最左边。
 * @default 60
 *
 * @param 平移-左箭头 Y
 * @parent ----按键箭头----
 * @desc y轴方向平移，单位像素。0为箭头的中心贴在最上边。
 * @default 312
 *
 * @param 资源-右箭头
 * @parent ----按键箭头----
 * @desc 右箭头的图片资源。
 * @default 信息面板G-右箭头
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 平移-右箭头 X
 * @parent ----按键箭头----
 * @desc x轴方向平移，单位像素。0为箭头的中心贴在最左边。
 * @default 750
 *
 * @param 平移-右箭头 Y
 * @parent ----按键箭头----
 * @desc y轴方向平移，单位像素。0为箭头的中心贴在最上边。
 * @default 312
 *
 * @param 资源-上箭头
 * @parent ----按键箭头----
 * @desc 上箭头的图片资源。
 * @default 信息面板G-上箭头
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 平移-上箭头 X
 * @parent ----按键箭头----
 * @desc x轴方向平移，单位像素。0为箭头的中心贴在最左边。
 * @default 408
 *
 * @param 平移-上箭头 Y
 * @parent ----按键箭头----
 * @desc y轴方向平移，单位像素。0为箭头的中心贴在最上边。
 * @default 35
 *
 * @param 资源-下箭头
 * @parent ----按键箭头----
 * @desc 下箭头的图片资源。
 * @default 信息面板G-下箭头
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 平移-下箭头 X
 * @parent ----按键箭头----
 * @desc x轴方向平移，单位像素。0为箭头的中心贴在最左边。
 * @default 408
 *
 * @param 平移-下箭头 Y
 * @parent ----按键箭头----
 * @desc y轴方向平移，单位像素。0为箭头的中心贴在最上边。
 * @default 585
 *
 * @param 是否使用缩放效果
 * @parent ----按键箭头----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，箭头会来回缩放。
 * @default false
 *
 * @param 是否使用闪烁效果
 * @parent ----按键箭头----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，箭头会来回闪烁。
 * @default false
 *
 * @param 浮动偏移量
 * @parent ----按键箭头----
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 10
 *
 * @param 是否使用左右浮动
 * @parent ----按键箭头----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，只对左右箭头有效，箭头会左右浮动。
 * @default true
 *
 * @param 是否使用上下浮动
 * @parent ----按键箭头----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，只对上下箭头有效，箭头会上下浮动。
 * @default true
 *
 *
 * @param ----选项窗口----
 * @default 
 * 
 * @param 选项窗口 X
 * @parent ----选项窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 选项窗口 Y
 * @parent ----选项窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 1000
 *
 * @param 选项窗口宽度
 * @parent ----选项窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 816
 *
 * @param 选项窗口高度
 * @parent ----选项窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 80
 *
 * @param 选项窗口列数
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口的列数。
 * @default 10
 *
 * @param 每条选项高度
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 每条选项的高度。（宽度无法调整，宽度固定根据 列数和窗口宽度 自适应。）
 * @default 36
 * 
 * @param 是否启用选项内容
 * @parent ----选项窗口----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，每条选项将会显示长文本的选项内容。
 * @default false
 * 
 * @param 选项窗口对齐方式
 * @parent ----选项窗口----
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 选项文本的对齐方式。
 * @default 左对齐
 *
 * @param 选项窗口字体大小
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 选项窗口移动动画
 * @parent ----选项窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-100","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 选项窗口布局
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"信息面板G-选项窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 选项窗口指针与边框
 * @parent ----选项窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 * @param ----描述窗口----
 * @default 
 * 
 * @param 描述窗口 X
 * @parent ----描述窗口----
 * @desc 描述窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 75
 *
 * @param 描述窗口 Y
 * @parent ----描述窗口----
 * @desc 描述窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 360
 *
 * @param 描述窗口宽度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 660
 *
 * @param 描述窗口高度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 495
 *
 * @param 描述窗口字体大小
 * @parent ----描述窗口----
 * @type number
 * @min 1
 * @desc 描述窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 描述窗口移动动画
 * @parent ----描述窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"100","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 描述窗口布局
 * @parent ----描述窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 是否重播描述窗口移动动画
 * @parent ----描述窗口----
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播。切换选项时，重播描述窗口的移动动画。
 * @default true
 *
 * @param ----描述图----
 * @default 
 * 
 * @param 描述图 X
 * @parent ----描述图----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 104
 *
 * @param 描述图 Y
 * @parent ----描述图----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 70
 * 
 * @param 描述图移动动画
 * @parent ----描述图----
 * @type struct<DrillWindowMoving>
 * @desc 描述图会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 是否重播描述图移动动画
 * @parent ----描述图----
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播。切换选项时，重播描述图的移动动画。
 * @default true
 * 
 * @param 是否瞬间显示描述图
 * @parent ----描述图----
 * @type boolean
 * @on 瞬间显示
 * @off 渐变出现
 * @desc true - 瞬间显示，false - 渐变出现。
 * @default false
 *
 *
 * @param ----内容----
 * @default 
 *
 * @param ---内容组 1至20---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-1
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-2
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-3
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-4
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-5
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-6
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-7
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-8
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-9
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-10
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-11
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-12
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-13
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-14
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-15
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-16
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-17
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-18
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-19
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-20
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组21至40---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-21
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-22
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-23
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-24
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-25
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-26
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-27
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-28
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-29
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-30
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-31
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-32
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-33
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-34
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-35
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-36
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-37
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-38
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-39
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-40
 * @parent ---内容组21至40---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组41至60---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-41
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-42
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-43
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-44
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-45
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-46
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-47
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-48
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-49
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-50
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-51
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-52
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-53
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-54
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-55
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-56
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-57
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-58
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-59
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-60
 * @parent ---内容组41至60---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组61至80---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-61
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-62
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-63
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-64
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-65
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-66
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-67
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-68
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-69
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-70
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-71
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-72
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-73
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-74
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-75
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-76
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-77
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-78
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-79
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-80
 * @parent ---内容组61至80---
 * @type struct<DrillSSpG>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 */
/*~struct~DrillSSpG:
 * 
 * @param 选项名
 * @desc 当前的选项名字。
 * @default 未命名选项
 * 
 * @param ---选项内容---
 * @default 
 *
 * @param 是否初始显示
 * @parent ---选项内容---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 是否初始锁定
 * @parent ---选项内容---
 * @type boolean
 * @on 锁定
 * @off 解锁
 * @desc true - 锁定，false - 解锁
 * @default false
 * 
 * @param 选项内容
 * @parent ---选项内容---
 * @type note
 * @desc 每个选项显示的长文本内容。（只有窗口模式有效，且需要启用 选项内容 。）
 * @default "长文本选项描述"
 *
 * @param ---描述内容---
 * @default 
 *
 * @param 资源-描述图片
 * @parent ---描述内容---
 * @desc 该选项下的显示的描述图片。
 * @default 
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * @param 描述内容
 * @parent ---描述内容---
 * @type note
 * @desc 该选项下的描述窗口显示的内容。
 * @default "没有描述"
 *
 * @param 描述内容对齐方式
 * @parent ---描述内容---
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 文本的对齐方式。
 * @default 左对齐
 *
 * @param 描述内容是否自适应行间距
 * @parent ---描述内容---
 * @type boolean
 * @on 自适应
 * @off 固定行间距
 * @desc true - 自适应，false - 固定行间距
 * @default true
 *
 * @param 描述内容固定行间距
 * @parent 描述内容是否自适应行间距
 * @type number
 * @min 1
 * @desc 如果你选择了手动行间距，这里将使得每行的文字的行间距都是固定值。
 * @default 28
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
 * @dir img/Menu__self/
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
 * @param ---drill插件---
 * @default 
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
 * @param ---mog插件---
 * @default 
 * 
 * @param 是否启用mog菜单指针
 * @parent ---mog插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，使用 MOG_MenuCursor 菜单指针插件（旧插件），可以装饰选项窗口，你也可以关闭装饰。
 * @default true
 * 
 * @param 是否启用mog菜单边框
 * @parent ---mog插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，使用 MOG_CursorBorder 菜单边框插件（旧插件），可以装饰选项窗口，你也可以关闭装饰。
 * @default true
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSpG（Scene_Selfplate_A）
//		临时全局变量	DrillUp.g_SSpG_xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_SSpG_context_list
//		全局存储变量	DrillUp.global_SSpG_enableTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	15.85ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全自定义面板：
//				->窗口
//					->选项窗口、详细窗口、描述图片
//					->当前选项
//					->全局存储
//					->描述图全加载
//				->四箭头
//				->箭头点击事件
//				->流程锁定
//					->末尾页
//					->屏蔽返回按钮
//
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SSpG
//				信息面板G
//				Drill_SceneSelfplateG
//
//		★其它说明细节：
//			1.【全局和存档两种数据都有保存，开关只用于切换显示哪种数据】。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SceneSelfplateG = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateG');
	
	
	//==============================
	// * 变量获取 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SSpG_initMenuCursor = function( dataFrom ) {
		var data = {};
		data['mog_enabled'] = String( dataFrom["是否启用mog菜单指针"] || "true") == "true";
		data['mog_borderEnabled'] = String( dataFrom["是否启用mog菜单边框"] || "true") == "true";
		data['MCu_enabled'] = String( dataFrom["是否启用菜单指针"] || "true") == "true";
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
	//==============================
	// * 变量获取 - 内容
	//				（~struct~DrillSSpG）
	//==============================
	DrillUp.drill_SSpG_initContext = function( dataFrom ) {
		var data = {};
		
		// > 选项名处理
		var temp = String(dataFrom['选项名']);
		temp = temp.replace(/\\\\/g,"\\");
		data['name'] = temp;
		
		// > 选项内容处理
		var temp = String(dataFrom['选项内容'] || " "+temp+" ");
		temp = temp.substring(1,temp.length-1);
		temp = temp.replace(/\\\\/g,"\\");		//（未分段，只是单长串字符串，包含 \\n ）
		data['nameEx'] = temp;
		
		// > 显示处理
		data['enabled'] = (dataFrom['是否初始显示'] || "false") == "true" ;
		
		// > 锁定处理
		data['locked'] = (dataFrom['是否初始锁定'] || "false") == "true" ;
		
		// > 描述图片处理
		data['pic'] = (dataFrom['资源-描述图片'] || "");
		
		// > 描述内容处理
		var temp = String(dataFrom['描述内容']);
		temp = temp.substring(1,temp.length-1);
		temp = temp.replace(/\\\\/g,"\\");
		temp = temp.split(/\\n/);
		data['context'] = temp;
		data['contextAlign'] = String(dataFrom['描述内容对齐方式'] || "左对齐");
		data['contextAutoLineheight'] = String(dataFrom['描述内容是否自适应行间距'] || "true") === "true";	
		data['contextLineheight'] = Number(dataFrom['描述内容固定行间距'] || 28);
		
		return data;
	}

	/*-----------------杂项------------------*/
    DrillUp.g_SSpG_layout = String(DrillUp.parameters['资源-整体布局'] || "");
	DrillUp.g_SSpG_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.g_SSpG_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.g_SSpG_add_to_title = String(DrillUp.parameters['是否在标题窗口中显示'] || "false") === "true";	
    DrillUp.g_SSpG_title_name = String(DrillUp.parameters['标题窗口显示名'] || "");
	DrillUp.g_SSpG_title_data_global = String(DrillUp.parameters['数据是否全局存储'] || "false") === "true";	
    DrillUp.g_SSpG_title_data_fileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);	
	
	/*-----------------箭头------------------*/
	DrillUp.g_SSpG_arrowLeft = String(DrillUp.parameters['资源-左箭头'] || "");
	DrillUp.g_SSpG_arrowRight = String(DrillUp.parameters['资源-右箭头'] || "");
	DrillUp.g_SSpG_arrowUp = String(DrillUp.parameters['资源-上箭头'] || "");
	DrillUp.g_SSpG_arrowDown = String(DrillUp.parameters['资源-下箭头'] || "");
	DrillUp.g_SSpG_arrowLeft_X = Number(DrillUp.parameters['平移-左箭头 X'] || 60);
	DrillUp.g_SSpG_arrowLeft_Y = Number(DrillUp.parameters['平移-左箭头 Y'] || 300);
	DrillUp.g_SSpG_arrowRight_X = Number(DrillUp.parameters['平移-右箭头 X'] || 750);
	DrillUp.g_SSpG_arrowRight_Y = Number(DrillUp.parameters['平移-右箭头 Y'] || 300);
	DrillUp.g_SSpG_arrowUp_X = Number(DrillUp.parameters['平移-上箭头 X'] || 408);
	DrillUp.g_SSpG_arrowUp_Y = Number(DrillUp.parameters['平移-上箭头 Y'] || 35);
	DrillUp.g_SSpG_arrowDown_X = Number(DrillUp.parameters['平移-下箭头 X'] || 408);
	DrillUp.g_SSpG_arrowDown_Y = Number(DrillUp.parameters['平移-下箭头 Y'] || 560);
	DrillUp.g_SSpG_arrow_zoom = String(DrillUp.parameters['是否使用缩放效果'] || "false") === "true";	
	DrillUp.g_SSpG_arrow_flicker = String(DrillUp.parameters['是否使用闪烁效果'] || "false") === "true";	
	DrillUp.g_SSpG_arrow_float_val = Number(DrillUp.parameters['浮动偏移量'] || 10);
	DrillUp.g_SSpG_arrow_float_lr = String(DrillUp.parameters['是否使用左右浮动'] || "true") === "true";	
	DrillUp.g_SSpG_arrow_float_ud = String(DrillUp.parameters['是否使用上下浮动'] || "true") === "true";	
	
	/*-----------------流程锁定------------------*/
	DrillUp.g_SSpG_end_page = Number(DrillUp.parameters['末尾页'] || 0);
	DrillUp.g_SSpG_end_se = String(DrillUp.parameters['翻页音效'] || "");	
	DrillUp.g_SSpG_end_src = String(DrillUp.parameters['资源-结束按钮'] || "");
	DrillUp.g_SSpG_end_x = Number(DrillUp.parameters['平移-结束按钮 X'] || 0);
	DrillUp.g_SSpG_end_y = Number(DrillUp.parameters['平移-结束按钮 Y'] || 0);
	
	/*-----------------选项窗口------------------*/
	DrillUp.g_SSpG_selWin_x = Number(DrillUp.parameters['选项窗口 X'] || 30);
	DrillUp.g_SSpG_selWin_y = Number(DrillUp.parameters['选项窗口 Y'] || 120);
	DrillUp.g_SSpG_selWin_width = Number(DrillUp.parameters['选项窗口宽度'] || 220);
	DrillUp.g_SSpG_selWin_height = Number(DrillUp.parameters['选项窗口高度'] || 460);
	DrillUp.g_SSpG_selWin_col = Number(DrillUp.parameters['选项窗口列数'] || 1);
	DrillUp.g_SSpG_selWin_itemHeight = Number(DrillUp.parameters['每条选项高度'] || 36);
	DrillUp.g_SSpG_selWin_nameExEnabled = String(DrillUp.parameters['是否启用选项内容'] || "false") == "true";
    DrillUp.g_SSpG_selWin_align = String(DrillUp.parameters['选项窗口对齐方式'] || "左对齐");
	DrillUp.g_SSpG_selWin_fontsize = Number(DrillUp.parameters['选项窗口字体大小'] || 22);
	if( DrillUp.parameters['选项窗口移动动画'] != undefined ){
		DrillUp.g_SSpG_selWin_slideAnim = JSON.parse( DrillUp.parameters['选项窗口移动动画'] );
		DrillUp.g_SSpG_selWin_slideAnim['slideMoveType'] = String(DrillUp.g_SSpG_selWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpG_selWin_slideAnim['slideTime'] = Number(DrillUp.g_SSpG_selWin_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpG_selWin_slideAnim['slideDelay'] = Number(DrillUp.g_SSpG_selWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpG_selWin_slideAnim['slidePosType'] = String(DrillUp.g_SSpG_selWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpG_selWin_slideAnim['slideX'] = Number(DrillUp.g_SSpG_selWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpG_selWin_slideAnim['slideY'] = Number(DrillUp.g_SSpG_selWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpG_selWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpG_selWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpG_selWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpG_selWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpG_selWin_slideAnim = {};
	}
	if( DrillUp.parameters['选项窗口布局'] != undefined ){
		DrillUp.g_SSpG_selWin_layout = JSON.parse( DrillUp.parameters['选项窗口布局'] );
		DrillUp.g_SSpG_selWin_layout['layoutType'] = String(DrillUp.g_SSpG_selWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSpG_selWin_layout['layoutSrc'] = String(DrillUp.g_SSpG_selWin_layout['资源-贴图'] || "");
		DrillUp.g_SSpG_selWin_layout['layoutSrcFile'] = "img/Menu__self/";
		DrillUp.g_SSpG_selWin_layout['layoutX'] = Number(DrillUp.g_SSpG_selWin_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSpG_selWin_layout['layoutY'] = Number(DrillUp.g_SSpG_selWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSpG_selWin_layout = {};
	}
	if( DrillUp.parameters['选项窗口指针与边框'] != "" &&
		DrillUp.parameters['选项窗口指针与边框'] != undefined ){
		var cursor = JSON.parse( DrillUp.parameters['选项窗口指针与边框'] );
		DrillUp.g_SSpG_selWin_cursor = DrillUp.drill_SSpG_initMenuCursor( cursor );
	}else{
		DrillUp.g_SSpG_selWin_cursor = DrillUp.drill_SSpG_initMenuCursor( {} );
	}

	/*-----------------描述窗口------------------*/
	DrillUp.g_SSpG_descWin_x = Number(DrillUp.parameters['描述窗口 X'] || 285);
	DrillUp.g_SSpG_descWin_y = Number(DrillUp.parameters['描述窗口 Y'] || 100);
	DrillUp.g_SSpG_descWin_width = Number(DrillUp.parameters['描述窗口宽度'] || 510);
	DrillUp.g_SSpG_descWin_height = Number(DrillUp.parameters['描述窗口高度'] || 360);
	DrillUp.g_SSpG_descWin_fontsize = Number(DrillUp.parameters['描述窗口字体大小'] || 22);
	DrillUp.g_SSpG_descWin_replay = String(DrillUp.parameters['是否重播描述窗口移动动画'] || "true") === "true";	
	if( DrillUp.parameters['描述窗口移动动画'] != undefined ){
		DrillUp.g_SSpG_descWin_slideAnim = JSON.parse( DrillUp.parameters['描述窗口移动动画'] );
		DrillUp.g_SSpG_descWin_slideAnim['slideMoveType'] = String(DrillUp.g_SSpG_descWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpG_descWin_slideAnim['slideTime'] = Number(DrillUp.g_SSpG_descWin_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpG_descWin_slideAnim['slideDelay'] = Number(DrillUp.g_SSpG_descWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpG_descWin_slideAnim['slidePosType'] = String(DrillUp.g_SSpG_descWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpG_descWin_slideAnim['slideX'] = Number(DrillUp.g_SSpG_descWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpG_descWin_slideAnim['slideY'] = Number(DrillUp.g_SSpG_descWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpG_descWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpG_descWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpG_descWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpG_descWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpG_descWin_slideAnim = {};
	}
	if( DrillUp.parameters['描述窗口布局'] != undefined ){
		DrillUp.g_SSpG_descWin_layout = JSON.parse( DrillUp.parameters['描述窗口布局'] );
		DrillUp.g_SSpG_descWin_layout['layoutType'] = String(DrillUp.g_SSpG_descWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSpG_descWin_layout['layoutSrc'] = String(DrillUp.g_SSpG_descWin_layout['资源-贴图'] || "");
		DrillUp.g_SSpG_descWin_layout['layoutSrcFile'] = "img/Menu__self/";
		DrillUp.g_SSpG_descWin_layout['layoutX'] = Number(DrillUp.g_SSpG_descWin_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSpG_descWin_layout['layoutY'] = Number(DrillUp.g_SSpG_descWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSpG_descWin_layout = {};
	}

	/*-----------------描述图------------------*/
	DrillUp.g_SSpG_descPic_x = Number(DrillUp.parameters['描述图 X'] || 285);
	DrillUp.g_SSpG_descPic_y = Number(DrillUp.parameters['描述图 Y'] || 480);
	DrillUp.g_SSpG_descPic_replay = String(DrillUp.parameters['是否重播描述图移动动画'] || "true") === "true";	
	DrillUp.g_SSpG_descPic_showInstant = String(DrillUp.parameters['是否瞬间显示描述图'] || "false") === "true";	
	if( DrillUp.parameters['描述图移动动画'] != undefined ){
		DrillUp.g_SSpG_descPic_slideAnim = JSON.parse( DrillUp.parameters['描述图移动动画'] );
		DrillUp.g_SSpG_descPic_slideAnim['slideMoveType'] = String(DrillUp.g_SSpG_descPic_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpG_descPic_slideAnim['slideTime'] = Number(DrillUp.g_SSpG_descPic_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpG_descPic_slideAnim['slideDelay'] = Number(DrillUp.g_SSpG_descPic_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpG_descPic_slideAnim['slidePosType'] = String(DrillUp.g_SSpG_descPic_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpG_descPic_slideAnim['slideX'] = Number(DrillUp.g_SSpG_descPic_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpG_descPic_slideAnim['slideY'] = Number(DrillUp.g_SSpG_descPic_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpG_descPic_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpG_descPic_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpG_descPic_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpG_descPic_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpG_descPic_slideAnim = {};
	}
	
	/*-----------------内容------------------*/
	DrillUp.g_SSpG_context_list_length = 80;
	DrillUp.g_SSpG_context_list = [];
	for( var i = 1; i <= DrillUp.g_SSpG_context_list_length ; i++ ){
		if( DrillUp.parameters['内容-' + String(i) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['内容-' + String(i)] );
			DrillUp.g_SSpG_context_list[i] = DrillUp.drill_SSpG_initContext( data );
			DrillUp.g_SSpG_context_list[i]['index'] = i;
		}else{
			DrillUp.g_SSpG_context_list[i] = null;
		}
	};
	
	/*-----------------锁定内容------------------*/
	DrillUp.g_SSpG_locked_name = String(DrillUp.parameters['用语-锁定的选项名'] || "");
	DrillUp.g_SSpG_locked_name = DrillUp.g_SSpG_locked_name.replace(/\\\\/g,"\\");
	DrillUp.g_SSpG_locked_context = String(DrillUp.parameters['用语-锁定的选项内容'] || "");
	DrillUp.g_SSpG_locked_context = DrillUp.g_SSpG_locked_context.substring(1,DrillUp.g_SSpG_locked_context.length-1);
	DrillUp.g_SSpG_locked_context = DrillUp.g_SSpG_locked_context.replace(/\\\\/g,"\\");
	DrillUp.g_SSpG_locked_context = DrillUp.g_SSpG_locked_context.split(/\\n/);
	DrillUp.g_SSpG_locked_type = String(DrillUp.parameters['内容锁定方式'] || "锁定描述图和描述内容");
	DrillUp.g_SSpG_locked_pic = String(DrillUp.parameters['资源-锁定的描述图'] || "");
	
	/*-----------------全局存储对象------------------*/
	DrillUp.global_SSpG_enableTank = null;
	DrillUp.global_SSpG_lockTank = null;
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 全局存储
//=============================================================================
//==============================
// * 全局 - 检查数据 - 显示情况
//==============================
DrillUp.drill_SSpG_gCheckData_enable = function(){
	for( var i = 1; i <= DrillUp.g_SSpG_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SSpG_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpG_enableTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpG_enableTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				DrillUp.global_SSpG_enableTank[i] = temp_c['enabled'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 全局 - 检查数据 - 锁定情况
//==============================
DrillUp.drill_SSpG_gCheckData_lock = function(){
	for( var i = 1; i <= DrillUp.g_SSpG_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SSpG_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpG_lockTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpG_lockTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				DrillUp.global_SSpG_lockTank[i] = temp_c['locked'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 全局 - 读取
//==============================
	var global_fileId = DrillUp.g_SSpG_title_data_fileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "SSpG" );
	
	// > 显示情况
	if( DrillUp.global_SSpG_enableTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_enableTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpG_enableTank = data;
		DrillUp.drill_SSpG_gCheckData_enable();				//（检查时自动赋新值）
	}
	// > 锁定情况
	if( DrillUp.global_SSpG_lockTank == null ){	
		var data = global_data["global_lockTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpG_lockTank = data;
		DrillUp.drill_SSpG_gCheckData_lock();
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_SSpG_saveData = function(){
	var file_id = DrillUp.g_SSpG_title_data_fileId;
	var data = {};
	data["global_enableTank"] = DrillUp.global_SSpG_enableTank;
	data["global_lockTank"] = DrillUp.global_SSpG_lockTank;
	this.drill_COGS_saveData( file_id, "SSpG", data );
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SSpG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SSpG_sys_initialize.call(this);
	this.drill_SSpG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SSpG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SSpG_saveEnabled == true ){	
		$gameSystem.drill_SSpG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SSpG_initSysData();
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
Game_System.prototype.drill_SSpG_initSysData = function() {
	this.drill_SSpG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SSpG_checkSysData = function() {
	this.drill_SSpG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SSpG_initSysData_Private = function() {
	
	this._drill_SSpG_enableTank = [];				//显示情况
	this._drill_SSpG_lockTank = [];					//锁定情况
	for(var i = 0; i < DrillUp.g_SSpG_context_list.length; i++){
		var temp_data = DrillUp.g_SSpG_context_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SSpG_enableTank[i] = temp_data['enabled'];
		this._drill_SSpG_lockTank[i] = temp_data['locked'];
	}
	
	this._drill_SSpG_end_page = DrillUp.g_SSpG_end_page;	//末尾页
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SSpG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SSpG_enableTank == undefined ||
		this._drill_SSpG_end_page == undefined ){
		this.drill_SSpG_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_SSpG_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpG_context_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SSpG_enableTank[i] == undefined ){
				this._drill_SSpG_enableTank[i] = temp_data['enabled'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_SSpG_lockTank[i] == undefined ){
				this._drill_SSpG_lockTank[i] = temp_data['locked'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};



//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuSelfDef = function(filename) {
    return this.loadBitmap('img/Menu__self/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_SSpG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SSpG_pluginCommand.call(this, command, args);
	if( command === ">信息面板G" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SSpG);
			}
			if( type == "显示全部" ){
				for( var i = 1; i <= DrillUp.g_SSpG_context_list_length; i++){
					DrillUp.global_SSpG_enableTank[i] = true;			//全局存储
					$gameSystem._drill_SSpG_enableTank[i] = true;		//正常存储
				}
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "隐藏全部" ){
				for( var i = 1; i <= DrillUp.g_SSpG_context_list_length; i++){
					DrillUp.global_SSpG_enableTank[i] = false;			//全局存储
					$gameSystem._drill_SSpG_enableTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "锁定全部" ){
				for( var i = 1; i <= DrillUp.g_SSpG_context_list_length; i++){
					DrillUp.global_SSpG_lockTank[i] = true;				//全局存储
					$gameSystem._drill_SSpG_lockTank[i] = true;			//正常存储
				}
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "解锁全部" ){
				for( var i = 1; i <= DrillUp.g_SSpG_context_list_length; i++){
					DrillUp.global_SSpG_lockTank[i] = false;			//全局存储
					$gameSystem._drill_SSpG_lockTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpG_saveData();
			}
		}
		
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "显示选项" ){
				DrillUp.global_SSpG_enableTank[ Number(temp1) ] = true;			//全局存储
				$gameSystem._drill_SSpG_enableTank[ Number(temp1) ] = true;		//正常存储
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "隐藏选项" ){
				DrillUp.global_SSpG_enableTank[ Number(temp1) ] = false;		//全局存储
				$gameSystem._drill_SSpG_enableTank[ Number(temp1) ] = false;	//正常存储
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "锁定选项" ){
				DrillUp.global_SSpG_lockTank[ Number(temp1) ] = true;			//全局存储
				$gameSystem._drill_SSpG_lockTank[ Number(temp1) ] = true;		//正常存储
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "解锁选项" ){
				DrillUp.global_SSpG_lockTank[ Number(temp1) ] = false;			//全局存储
				$gameSystem._drill_SSpG_lockTank[ Number(temp1) ] = false;		//正常存储
				StorageManager.drill_SSpG_saveData();
			}
			if( type == "选中页" ){
				$gameSystem._drill_SSpG_context_index = Number(temp1) -1;
			}
			if( type == "末尾页" ){
				if( temp1 == "最后一页" ){					//只正常存储
					$gameSystem._drill_SSpG_end_page = 0;
				}else{
					$gameSystem._drill_SSpG_end_page = Number(temp1);
				}
			}
		}
	}
	
};

//=============================================================================
// * Scene_Menu 主菜单按钮
//=============================================================================
var _drill_SSpG_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SSpG_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SSpG',   this.drill_SSpG_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SSpG_menuCommand = function() {
    SceneManager.push(Scene_Drill_SSpG);
};
var _drill_SSpG_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SSpG_addOriginalCommands.call(this);
	if( DrillUp.g_SSpG_add_to_menu ){
		this.addCommand(DrillUp.g_SSpG_menu_name, 'Drill_SSpG', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _drill_SSpG_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SSpG_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SSpG',  this.drill_SSpG_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SSpG_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SSpG);
};
var _drill_SSpG_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SSpG_title_makeCommandList.call(this);
	if( DrillUp.g_SSpG_add_to_title ){
		this.addCommand( DrillUp.g_SSpG_title_name ,'Drill_SSpG');
	}
};	

//=============================================================================
// * 临时数据
//=============================================================================
//==============================
// * 临时 - 初始化
//==============================
var _drill_SSpG_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_SSpG_temp_initialize.call(this);
	this._drill_SSpG_visibleList = [];			//可见的列表
};
//==============================
// * 临时 - 判断 锁定情况
//==============================
Game_Temp.prototype.drill_SSpG_isLocked = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpG_title_data_global == true ){
		if( DrillUp.global_SSpG_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpG_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}
//==============================
// * 临时 - 判断 显示情况
//==============================
Game_Temp.prototype.drill_SSpG_isEnabled = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpG_title_data_global == true ){
		if( DrillUp.global_SSpG_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpG_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}


//=============================================================================
// ** 信息面板G【Scene_Drill_SSpG】
//
//			主功能：	信息面板的基本功能。
//			子功能：
//						->基本功能
//							> 继承属性
//							> 初始化
//							> 创建
//							> 帧刷新
//						->选项变化
//							->重设窗口起点
//							->描述图片刷新
//							->（描述窗口刷新在自身中进行）
//							->刷新箭头
//						->流程
//							->翻下一页
//							->退出窗口（末尾页才生效）
//							->返回按钮（末尾页才生效）
//			主要成员：
//						> ._window_select			选项窗口
//						> ._window_desc				描述窗口
//						> ._sprite_descPic			描述图片
//						> ._arrow_left				左箭头 
//		                > ._arrow_right				右箭头
//                      > ._arrow_up 				上箭头
//                      > ._arrow_down 				下箭头
//
//			说明：	> 实时锁定退出键、鼠标按键，确保必须看到末尾页才能离开。
//=============================================================================
//==============================
// * 信息面板G - 定义
//==============================
function Scene_Drill_SSpG() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SSpG.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SSpG.prototype.constructor = Scene_Drill_SSpG;
//==============================
// * 信息面板G - 初始化
//==============================
Scene_Drill_SSpG.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._cur_index = -1;
};
//==============================
// * 信息面板G - 创建
//==============================
Scene_Drill_SSpG.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);	//布局（先画，其图层都被放在后面）
	this.drill_createLayout();
	this.drill_createDescPic();
	this.drill_createSelect();
	this.drill_createDesc();
	this.drill_createArrow();
	this.drill_createEndButton();
};
//==============================
// * 信息面板G - 帧刷新
//==============================
Scene_Drill_SSpG.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	this._window_select.drill_COWA_CPD_update();
	this._window_desc.drill_COWA_CPD_update();
	this.drill_updateDescPic();
	this.drill_updateIndex();
	
	this.drill_updateArrow();
	this.drill_updateEndButton();
	this.drill_updateBackBtnControl();
	
    if (TouchInput.isTriggered()) {		//鼠标点击图片监听
		this.drill_checkImgTouch();
		this.drill_checkEndButtonTouch();
	};
}

//==============================
// * 创建 - 整体布局
//==============================
Scene_Drill_SSpG.prototype.drill_createLayout = function() {
	this._drill_layout = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_layout));
	this._drill_field.addChild(this._drill_layout);	
};
//==============================
// * 创建 - 选项窗口
//==============================
Scene_Drill_SSpG.prototype.drill_createSelect = function() {
	var data = {
		"x": DrillUp.g_SSpG_selWin_x,
		"y": DrillUp.g_SSpG_selWin_y,
		"width": DrillUp.g_SSpG_selWin_width,
		"height": DrillUp.g_SSpG_selWin_height,
		"fontsize": DrillUp.g_SSpG_selWin_fontsize,
		
		"slideMoveType": DrillUp.g_SSpG_selWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpG_selWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpG_selWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpG_selWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpG_selWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpG_selWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpG_selWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpG_selWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSpG_selWin_layout['layoutType'],
		"layoutX": DrillUp.g_SSpG_selWin_layout['layoutX'],
		"layoutY": DrillUp.g_SSpG_selWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSpG_selWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSpG_selWin_layout['layoutSrcFile'],
	}
	this._window_select = new Drill_SSpG_SelectWindow(0, 0, 0, 0);
	this._window_select.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._window_select.refresh();
	this._window_select.drill_initSelect();
	
	this._window_select.setHandler('cancel',   this.popScene.bind(this));//绑定退出界面事件
	this.addChild(this._window_select);
};
//==============================
// * 创建 - 描述窗口
//==============================
Scene_Drill_SSpG.prototype.drill_createDesc = function() {
	var data = {
		"x": DrillUp.g_SSpG_descWin_x,
		"y": DrillUp.g_SSpG_descWin_y,
		"width": DrillUp.g_SSpG_descWin_width,
		"height": DrillUp.g_SSpG_descWin_height,
		"fontsize": DrillUp.g_SSpG_descWin_fontsize,
		
		"slideMoveType": DrillUp.g_SSpG_descWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpG_descWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpG_descWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpG_descWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpG_descWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpG_descWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpG_descWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpG_descWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSpG_descWin_layout['layoutType'],
		"layoutX": DrillUp.g_SSpG_descWin_layout['layoutX'],
		"layoutY": DrillUp.g_SSpG_descWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSpG_descWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSpG_descWin_layout['layoutSrcFile'],
	}
	this._window_desc = new Drill_SSpG_DescWindow(0, 0, 0, 0);
	this._window_desc.drill_COWA_changeParamData( data );		//辅助核心 - 控制窗口基本属性
	
	this.addChild(this._window_desc);
};
//==============================
// * 创建 - 描述图片
//==============================
Scene_Drill_SSpG.prototype.drill_createDescPic = function() {
	var data = {
		"x": DrillUp.g_SSpG_descPic_x,
		"y": DrillUp.g_SSpG_descPic_y,
		
		"slideMoveType": DrillUp.g_SSpG_descPic_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpG_descPic_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpG_descPic_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpG_descPic_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpG_descPic_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpG_descPic_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpG_descPic_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpG_descPic_slideAnim['slideAbsoluteY'],
	}
	this._sprite_descPic = new Sprite();
	this._sprite_descPic.drill_COWA_setButtonMove( data );		//辅助核心 - 控制按钮贴图基本属性
	this._drill_field.addChild(this._sprite_descPic);	
	
	this._sprite_descPic._drill_bitmaps = [];
};

//==============================
// * 信息面板G - 重设窗口起点（切换选项时）
//==============================
Scene_Drill_SSpG.prototype.drill_resetPosition = function() {
	
	// > 刷新描述窗口
	if( DrillUp.g_SSpG_descWin_replay ){
		this._window_desc.drill_COWA_CPD_resetMove();		//辅助核心 - 重播窗口动画
	}
	
	// > 刷新描述图
	if( DrillUp.g_SSpG_descPic_replay ){
		this._sprite_descPic.drill_COWA_SBM_resetMove();	//辅助核心 - 重播按钮贴图动画
	}
};
//==============================
// * 信息面板G - 描述图片刷新
//==============================
Scene_Drill_SSpG.prototype.drill_refreshDescPic = function( cur_index ) {
	var temp_list = $gameTemp._drill_SSpG_visibleList;		//可见项列表
	
	// > 资源全加载
	var src_tank = this._sprite_descPic._drill_bitmaps;	//资源bitmap容器
	if( src_tank.length == 0 ){
		src_tank[0] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_locked_pic);
		for( var i=0; i < temp_list.length; i++ ){
			var temp_c = temp_list[i];
			if( temp_c == null ){ continue; }
			if( temp_c == "" ){ continue; }
			
			var context_realIndex = temp_c['index'];
			src_tank[ i+1 ] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_context_list[ context_realIndex ]["pic"]);	
		}
		this._sprite_descPic._drill_bitmaps = src_tank;
	}
	
	// > 切换描述图
	var temp_c = temp_list[ cur_index ];					//当前选项
	var context_realIndex = temp_c['index'];
	
	if( $gameTemp.drill_SSpG_isLocked( context_realIndex ) == true && 
	   (DrillUp.g_SSpG_locked_type == "锁定描述图和描述内容" || 
		DrillUp.g_SSpG_locked_type == "只锁定描述图" ) ){
			
		this._sprite_descPic.bitmap = src_tank[ 0 ];			//锁定描述图
	}else{
		this._sprite_descPic.bitmap = src_tank[ cur_index+1 ];	//当前描述图
	}
	
	if( DrillUp.g_SSpG_descPic_showInstant == false ){
		this._sprite_descPic.opacity = 0;
	}
}
//==============================
// * 帧刷新 - 描述图片
//==============================
Scene_Drill_SSpG.prototype.drill_updateDescPic = function() {
	if( DrillUp.g_SSpG_descPic_showInstant == false ){
		this._sprite_descPic.opacity += 255/DrillUp.g_SSpG_descPic_slideAnim['slideTime'];
	}
}
//==============================
// * 帧刷新 - 窗口选项刷新
//==============================
Scene_Drill_SSpG.prototype.drill_updateIndex = function() {
	if( $gameSystem._drill_SSpG_context_index != undefined ){
		var temp = $gameSystem._drill_SSpG_context_index;
		$gameSystem._drill_SSpG_context_index = null;	//（激活后清空）
		if( temp < 0 ){ temp = 0; };
		if( temp > $gameTemp._drill_SSpG_visibleList.length -1 ){ temp = $gameTemp._drill_SSpG_visibleList.length -1; };
		this._window_select.select( temp );				//（设置选中页）
	}
	if( this._window_select._index == null || 
		this._window_select._index > $gameTemp._drill_SSpG_visibleList.length -1 ||
		this._window_select._index < 0){ this._window_select.select(0);}
	if( $gameTemp._drill_SSpG_visibleList.length == 0 ){ return };	//如果选项全部为空，强制选择第一个
	
	if( this._cur_index != this._window_select._index ){
		this._cur_index = this._window_select._index;
		this.drill_resetPosition();
		this._window_desc.drill_refreshDesc(this._cur_index);
		this.drill_refreshDescPic(this._cur_index);
		this.drill_refreshArrow(this._cur_index);
	}
}

//==========================================================================================
// * 箭头
//==========================================================================================
//==============================
// * 帧刷新 - 箭头 - 窗口点击事件
//==============================
Scene_Drill_SSpG.prototype.drill_checkImgTouch = function() {
	
	//图片 - 箭头
	if (this.drill_isOnArrow( this._arrow_left) ) { this._window_select.cursorLeft(); SoundManager.drill_SSpG_playCursor();}
	if (this.drill_isOnArrow( this._arrow_right) ) { this._window_select.cursorRight(); SoundManager.drill_SSpG_playCursor();}
	if (this.drill_isOnArrow( this._arrow_up) ) { this._window_select.cursorUp();SoundManager.drill_SSpG_playCursor(); }
	if (this.drill_isOnArrow( this._arrow_down) ) { this._window_select.cursorDown();SoundManager.drill_SSpG_playCursor(); }
}
//==============================
// * 帧刷新 - 箭头 - 鼠标点击图片范围判断
//==============================
Scene_Drill_SSpG.prototype.drill_isOnArrow = function(sprite_arrow) {
	if( sprite_arrow.bitmap == null ){ return false };
	if(!sprite_arrow.bitmap.isReady() ){ return false };
	if( sprite_arrow.visible === false ){ return false };
	var pw = sprite_arrow.bitmap.width /2 + 20;
	var ph = sprite_arrow.bitmap.height /2 + 20;
	
	 if (TouchInput.x < sprite_arrow._org_x - pw) {return false};
	 if (TouchInput.x > sprite_arrow._org_x + pw) {return false};
	 if (TouchInput.y < sprite_arrow._org_y - ph) {return false};
	 if (TouchInput.y > sprite_arrow._org_y + ph) {return false};
	 return true;	
};
//==============================
// * 帧刷新 - 箭头 - 箭头高亮范围
//==============================
Scene_Drill_SSpG.prototype.drill_isOnHoverArrow = function(sprite_arrow) {
	if( sprite_arrow.bitmap == null ){ return false };
	if(!sprite_arrow.bitmap.isReady() ){ return false };
	if( sprite_arrow.visible === false ){ return false };
	var pw = sprite_arrow.bitmap.width /2 + 20;
	var ph = sprite_arrow.bitmap.height /2 + 20;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x < sprite_arrow._org_x - pw) {return false};
	if ( _x > sprite_arrow._org_x + pw) {return false};
	if ( _y < sprite_arrow._org_y - ph) {return false};
	if ( _y > sprite_arrow._org_y + ph) {return false};
	return true;	
}

//==============================
// * 创建 - 箭头
//==============================
Scene_Drill_SSpG.prototype.drill_createArrow = function() {
	this._arrow_linear = 0;
	this._arrow_dir = 1 / 12 ;
	this._arrow_left = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_arrowLeft));
	this._arrow_right = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_arrowRight));
	this._arrow_up = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_arrowUp));
	this._arrow_down = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_arrowDown));
	this._arrow_left._org_x = DrillUp.g_SSpG_arrowLeft_X ; 
	this._arrow_left._org_y = DrillUp.g_SSpG_arrowLeft_Y ;
	this._arrow_right._org_x = DrillUp.g_SSpG_arrowRight_X ;
	this._arrow_right._org_y = DrillUp.g_SSpG_arrowRight_Y ;
	this._arrow_up._org_x = DrillUp.g_SSpG_arrowUp_X ; 
	this._arrow_up._org_y = DrillUp.g_SSpG_arrowUp_Y ; 
	this._arrow_down._org_x = DrillUp.g_SSpG_arrowDown_X ;
	this._arrow_down._org_y = DrillUp.g_SSpG_arrowDown_Y ;
	this._arrow_left.anchor.x = 0.5;
	this._arrow_left.anchor.y = 0.5;
	this._arrow_right.anchor.x = 0.5;
	this._arrow_right.anchor.y = 0.5;
	this._arrow_up.anchor.x = 0.5;
	this._arrow_up.anchor.y = 0.5;
	this._arrow_down.anchor.x = 0.5;
	this._arrow_down.anchor.y = 0.5;
	this._drill_field.addChild(this._arrow_left);	
	this._drill_field.addChild(this._arrow_right);	
	this._drill_field.addChild(this._arrow_up);	
	this._drill_field.addChild(this._arrow_down);	
};
//==============================
// * 帧刷新 - 箭头
//==============================
Scene_Drill_SSpG.prototype.drill_updateArrow = function() {
	//线性变化量
	this._arrow_linear += this._arrow_dir;
	if( this._arrow_linear > 1 ){
		this._arrow_dir = -1 / 12 ;
	}else if( this._arrow_linear < -1 ){
		this._arrow_dir = 1 / 12 ;
	}
	//左右浮动
	if( DrillUp.g_SSpG_arrow_float_lr ){
		this._arrow_left.x = this._arrow_left._org_x + this._arrow_linear* DrillUp.g_SSpG_arrow_float_val ; 	
		this._arrow_left.y = this._arrow_left._org_y ; 
		this._arrow_right.x = this._arrow_right._org_x - this._arrow_linear* DrillUp.g_SSpG_arrow_float_val ; 
		this._arrow_right.y = this._arrow_right._org_y ;
	}
	//上下浮动
	if( DrillUp.g_SSpG_arrow_float_ud ){
		this._arrow_up.x = this._arrow_up._org_x;
		this._arrow_up.y = this._arrow_up._org_y + this._arrow_linear* DrillUp.g_SSpG_arrow_float_val ; 	
		this._arrow_down.x = this._arrow_down._org_x;
		this._arrow_down.y = this._arrow_down._org_y - this._arrow_linear* DrillUp.g_SSpG_arrow_float_val ; 	
	}
	//缩放
	if( DrillUp.g_SSpG_arrow_zoom ){
		this._arrow_left.scale.x = 1 + this._arrow_linear * 0.3 ;
		this._arrow_left.scale.y = 1 + this._arrow_linear * 0.3 ;
		this._arrow_right.scale.x= 1 + this._arrow_linear * 0.3 ;
		this._arrow_right.scale.y= 1 + this._arrow_linear * 0.3 ;
		this._arrow_up.scale.x =   1 + this._arrow_linear * 0.3 ;
		this._arrow_up.scale.y =   1 + this._arrow_linear * 0.3 ;
		this._arrow_down.scale.x = 1 + this._arrow_linear * 0.3 ;
		this._arrow_down.scale.y = 1 + this._arrow_linear * 0.3 ;
	}
	//闪烁
	this._arrow_left.opacity = 180 ;
	this._arrow_right.opacity= 180 ;
	this._arrow_up.opacity =   180 ;
	this._arrow_down.opacity = 180 ;
	if( DrillUp.g_SSpG_arrow_flicker ){
		this._arrow_left.opacity = 56+ this._arrow_linear * 200 ;
		this._arrow_right.opacity= 56+ this._arrow_linear * 200 ;
		this._arrow_up.opacity =   56+ this._arrow_linear * 200 ;
		this._arrow_down.opacity = 56+ this._arrow_linear * 200 ;
	}
	if( this.drill_isOnHoverArrow(this._arrow_left) ){ this._arrow_left.opacity = 255; }
	if( this.drill_isOnHoverArrow(this._arrow_right) ){ this._arrow_right.opacity = 255; }
	if( this.drill_isOnHoverArrow(this._arrow_up) ){ this._arrow_up.opacity = 255; }
	if( this.drill_isOnHoverArrow(this._arrow_down) ){ this._arrow_down.opacity = 255; }
}
//==============================
// * 信息面板G - 刷新箭头
//==============================
Scene_Drill_SSpG.prototype.drill_refreshArrow = function(index) {
	//箭头显示
	var l_visible = true;
	var r_visible = true;
	var u_visible = true;
	var d_visible = true;
	if( index % DrillUp.g_SSpG_selWin_col == 0 ){
		l_visible = false;
	}
	if( index % DrillUp.g_SSpG_selWin_col == DrillUp.g_SSpG_selWin_col-1 ||
		index == $gameTemp._drill_SSpG_visibleList.length -1 ){
		r_visible = false;
	}
	if( index <= DrillUp.g_SSpG_selWin_col-1 ){
		u_visible = false;
	}
	if( index > $gameTemp._drill_SSpG_visibleList.length -1 - DrillUp.g_SSpG_selWin_col ){
		d_visible = false;
	}
	this._arrow_left.visible = l_visible;
	this._arrow_right.visible = r_visible;
	this._arrow_up.visible = u_visible;
	this._arrow_down.visible = d_visible;
}

//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}



//==========================================================================================
// ** 选项窗口【Drill_SSpG_SelectWindow】
//
//==========================================================================================
//==============================
// * 选项窗口 - 定义
//==============================
function Drill_SSpG_SelectWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SSpG_SelectWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SSpG_SelectWindow.prototype.constructor = Drill_SSpG_SelectWindow;
Drill_SSpG_SelectWindow.lastTopRow = 0;
Drill_SSpG_SelectWindow.lastIndex  = 0;
//==============================
// * 选项窗口 - 初始化
//==============================
Drill_SSpG_SelectWindow.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.activate();
	this.drill_initSelect();
};

//==============================
// * 选项窗口 - 窗口数据
//==============================
Drill_SSpG_SelectWindow.prototype.maxCols = function() {
	return DrillUp.g_SSpG_selWin_col;
};
Drill_SSpG_SelectWindow.prototype.maxItems = function() {
	return this._list ? this._list.length : 0;
};
Drill_SSpG_SelectWindow.prototype.itemHeight = function() {
	return DrillUp.g_SSpG_selWin_itemHeight;
};

//==============================
// * 选项窗口 - 帧刷新
//==============================
Drill_SSpG_SelectWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	//...（暂无）
};

//==============================
// * 选项窗口 - 重绘内容
//==============================
Drill_SSpG_SelectWindow.prototype.refresh = function() {
	$gameTemp._drill_SSpG_visibleList = [];
	for(var i=1; i<= DrillUp.g_SSpG_context_list_length ;i++){
		var temp_c = DrillUp.g_SSpG_context_list[i];
		if( temp_c == null ){ continue; }
		
		if( $gameTemp.drill_SSpG_isEnabled( i ) == true ){
			$gameTemp._drill_SSpG_visibleList.push( temp_c );
		}
	}
	
	// > 待绘制的字符串
	this._list = [];
	for( var j=0; j< $gameTemp._drill_SSpG_visibleList.length ;j++ ){
		var temp_c = $gameTemp._drill_SSpG_visibleList[j];
		var context_realIndex = temp_c['index'];
		
		// > 选项锁定
		if( $gameTemp.drill_SSpG_isLocked( context_realIndex ) == true ){
			this._list.push( DrillUp.g_SSpG_locked_name );
			continue;
		}
		
		// > 长文本选项
		if( DrillUp.g_SSpG_selWin_nameExEnabled == true ){
			this._list.push( temp_c['nameEx'] );
			continue;
		}
		
		this._list.push( temp_c['name'] );
	}
	
	
	this.createContents();
	this.drawAllItems();	//绘制选项内容
};
//==============================
// * 选项窗口 - 设置选项
//==============================
Drill_SSpG_SelectWindow.prototype.drill_initSelect = function() {
	if( Drill_SSpG_SelectWindow.lastIndex >= this._list.length ){
		Drill_SSpG_SelectWindow.lastIndex = this._list.length-1;
	}
	this.setTopRow(Drill_SSpG_SelectWindow.lastTopRow);
	this.select(Drill_SSpG_SelectWindow.lastIndex);
}
//==============================
// * 选项窗口 - 绘制选项
//==============================
Drill_SSpG_SelectWindow.prototype.drawItem = function(index) {
    var name_str = this._list[index];
	var name_str_list = name_str.split(/\\n/);
	var rect = this.itemRectForText(index);
	
	// > 绘制内容
	var op = {
		"align":DrillUp.g_SSpG_selWin_align,
		"autoLineheight":true,
		"x": rect.x,
		"y": rect.y,
		"width": rect.width,
	}
	this.drill_COWA_drawTextListEx_notClean(name_str_list,op);
};
//==============================
// * 选项窗口 - 退出事件
//==============================
Drill_SSpG_SelectWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Drill_SSpG_SelectWindow.lastTopRow = this.topRow();
	Drill_SSpG_SelectWindow.lastIndex = this.index();
};
//==============================
// * 选项窗口 - 兼容 - mog菜单指针插件
//==============================
if( Imported.MOG_MenuCursor == true ){
	var _drill_SSpG_mog_set_mcursor_data = Drill_SSpG_SelectWindow.prototype.need_set_mcursor_data;
	Drill_SSpG_SelectWindow.prototype.need_set_mcursor_data = function() {
		if( DrillUp.g_SSpG_selWin_cursor['mog_enabled'] == false ){
			return false;
		}
		return _drill_SSpG_mog_set_mcursor_data.call(this);
	}
}
//==============================
// * 选项窗口 - 兼容 - mog菜单边框插件
//==============================
if( Imported.MOG_CursorBorder == true ){
	var _drill_SSpG_mog_createSprSelMenu = Drill_SSpG_SelectWindow.prototype.createSprSelMenu;
	Drill_SSpG_SelectWindow.prototype.createSprSelMenu = function() {
		if( DrillUp.g_SSpG_selWin_cursor['mog_borderEnabled'] == false ){
			return ;
		}
		_drill_SSpG_mog_createSprSelMenu.call(this);
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true ){
	Drill_SSpG_SelectWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SSpG_selWin_cursor['MCu_enabled'];
	}
	Drill_SSpG_SelectWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SSpG_selWin_cursor['MCu_lock'] == true ){
			return DrillUp.g_SSpG_selWin_cursor['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true ){
	Drill_SSpG_SelectWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SSpG_selWin_cursor['MCB_rectEnabled'];
	}
	Drill_SSpG_SelectWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SSpG_selWin_cursor['MCB_enabled'];
	}
	Drill_SSpG_SelectWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SSpG_selWin_cursor['MCB_lock'] == true ){
			return DrillUp.g_SSpG_selWin_cursor['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true ){
	Drill_SSpG_SelectWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SSpG_selWin_cursor['MSB_enabled'];
	}
	Drill_SSpG_SelectWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SSpG_selWin_cursor['MSB_lock'] == true ){
			return DrillUp.g_SSpG_selWin_cursor['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}


//==========================================================================================
// ** 显示窗口【Drill_SSpG_DescWindow】
//
//==========================================================================================
//==============================
// * 显示窗口 - 定义
//==============================
function Drill_SSpG_DescWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SSpG_DescWindow.prototype = Object.create(Window_Base.prototype);
Drill_SSpG_DescWindow.prototype.constructor = Drill_SSpG_DescWindow;
//==============================
// * 显示窗口 - 初始化
//==============================
Drill_SSpG_DescWindow.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x,y,width,height);
	//...（暂无）
};
//==============================
// * 显示窗口 - 帧刷新
//==============================
Drill_SSpG_DescWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	//...（暂无）
};
//==============================
// * 显示窗口 - 重绘内容
//==============================
Drill_SSpG_DescWindow.prototype.drill_refreshDesc = function( cur_index ) {
	var temp_list = $gameTemp._drill_SSpG_visibleList;		//可见项列表
	var temp_c = temp_list[ cur_index ];					//当前选项
	
	// > 切换描述内容
	var context_list = "";
	var context_realIndex = temp_c['index'];
	
	if( $gameTemp.drill_SSpG_isLocked( context_realIndex ) == true && 
	   (DrillUp.g_SSpG_locked_type == "锁定描述图和描述内容" || 
		DrillUp.g_SSpG_locked_type == "只锁定描述内容" ) ){
			
		context_list = DrillUp.g_SSpG_locked_context;		//锁定内容
	}else{
		context_list = temp_c['context'];				//当前内容
	}
	
	// > 绘制内容
	var op = {
		"align":temp_c['contextAlign'],
		"autoLineheight":temp_c['contextAutoLineheight'],
		"lineheight":temp_c['contextLineheight'],
	}
	this.drill_COWA_drawTextListEx(context_list,op);
}


//==========================================================================================
// * 末尾页
//==========================================================================================
//==============================
// * 末尾页 - 判断
//==============================
Drill_SSpG_SelectWindow.prototype.drill_isInEndPage = function() {
	if( $gameSystem._drill_SSpG_end_page != 0 && $gameSystem._drill_SSpG_end_page <= this.maxItems() ){
		return this.index() == $gameSystem._drill_SSpG_end_page - 1;
	}
	return this.index() >= this.maxItems()-1 ;
}
Scene_Drill_SSpG.prototype.drill_isInEndPage = function() {
	return this._window_select.drill_isInEndPage();
}

//==========================================================================================
// * 流程锁定
//==========================================================================================
//==============================
// * 流程锁定 - 退出键
//==============================
var _drill_SSpG_processCancel = Drill_SSpG_SelectWindow.prototype.processCancel;
Drill_SSpG_SelectWindow.prototype.processCancel = function() {
	if( !this.drill_isInEndPage() ){		//非末尾页，只翻页
		this.cursorRight();
		SoundManager.drill_SSpG_playCursor();
		return ;
	}
	_drill_SSpG_processCancel.call(this);
};
//==============================
// * 流程锁定 - 按键
//==============================
Drill_SSpG_SelectWindow.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		var lastIndex = this.index();
		if (Input.isRepeated('down')) {
			this.cursorDown(Input.isTriggered('down'));
		}
		if (Input.isRepeated('up')) {
			this.cursorUp(Input.isTriggered('up'));
		}
		if (Input.isRepeated('right')) {
			this.cursorRight(Input.isTriggered('right'));
		}
		if (Input.isRepeated('left')) {
			this.cursorLeft(Input.isTriggered('left'));
		}
		if (this.index() !== lastIndex) {
			SoundManager.drill_SSpG_playCursor();
		}
	}
};
Drill_SSpG_SelectWindow.prototype.processPageup = function() {
    // 置空函数
};
Drill_SSpG_SelectWindow.prototype.processPagedown = function() {
    // 置空函数
};
//==============================
// * 流程锁定 - 末尾页退出
//==============================
var _drill_SSpG_drill_createSelect = Scene_Drill_SSpG.prototype.drill_createSelect;
Scene_Drill_SSpG.prototype.drill_createSelect = function() {
	_drill_SSpG_drill_createSelect.call(this);
	this._window_select.setHandler('cancel', this.drill_quit.bind(this) );		//覆盖退出功能
}
Scene_Drill_SSpG.prototype.drill_quit = function() {
	if( !this.drill_isInEndPage() ){ return ; }
	this.popScene();
}
//==============================
// * 流程锁定 - 捕获返回按钮
//==============================
Scene_Drill_SSpG.prototype.drill_updateBackBtnControl = function() { 
	if( this._drill_MBB_sprites_layer == undefined ){ return; }
	
	for(var i=0; i < this._drill_MBB_sprites_layer.length; i++){
		var temp_layer = this._drill_MBB_sprites_layer[i];
		temp_layer.visible = this.drill_isInEndPage();
	}
}
//==============================
// * 翻页声音
//==============================
SoundManager.drill_SSpG_playCursor = function() {
	var se = {};
    se.name = DrillUp.g_SSpG_end_se;
    se.pitch = 100;
    se.volume = 100;
	AudioManager.playStaticSe(se);
}
//==========================================================================================
// * 结束按钮
//==========================================================================================
//==============================
// * 创建 - 结束按钮
//==============================
Scene_Drill_SSpG.prototype.drill_createEndButton = function() {
	this._end_button = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpG_end_src));
	this._end_button._org_x = DrillUp.g_SSpG_end_x ; 
	this._end_button._org_y = DrillUp.g_SSpG_end_y ;
	this._drill_field.addChild(this._end_button);	
}
//==============================
// * 帧刷新 - 结束按钮
//==============================
Scene_Drill_SSpG.prototype.drill_updateEndButton = function() {
	// > 位置
	this._end_button.x = this._end_button._org_x;
	this._end_button.y = this._end_button._org_y;
	this._end_button.anchor.x = 0.5;
	this._end_button.anchor.y = 0.5;
	this._end_button.visible = this.drill_isInEndPage();
	
	// > 高亮
	this._end_button.opacity = 180 ;
	if( this.drill_isOnHoverArrow(this._end_button) ){ this._end_button.opacity = 255; }
}
//==============================
// * 帧刷新 - 箭头 - 窗口点击事件
//==============================
Scene_Drill_SSpG.prototype.drill_checkEndButtonTouch = function() {
	if (this.drill_isOnArrow( this._end_button ) ) {
		SoundManager.playOk();
		this.popScene();
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneSelfplateG = false;
		alert(
			"【Drill_SceneSelfplateG.js 面板 - 全自定义信息面板G】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

