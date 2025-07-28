//=============================================================================
// Drill_SceneSelfplateH.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        面板 - 全自定义信息面板H
 * @author Drill_up
 * 
 * @Drill_LE_param "内容-%d"
 * @Drill_LE_parentKey "---内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_SSpH_context_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_SceneSelfplateH +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的信息面板H。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave        管理器-全局存储核心
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心★★v2.2及以上★★
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     必须基于该插件才能显示描述内容。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SSpH
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
 *      件指令设置一下当前选中选项。
 * 内容：
 *   (1.每个对应的描述内容，都能设置行高、居中等设置。
 *   (2.选项窗口和描述窗口支持下列字符：
 *       \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      除了这些，其他的如 表达式、指代字符、效果字符 也都支持，
 *      你可以去看看文档 "23.窗口字符 > 关于窗口字符.docx" 。
 * 内容锁定：
 *   (1.你可以将某个内容锁定，锁定项将会只显示锁定信息。
 *      但注意前提是选项没有被隐藏。
 *   (2.内容锁定时，可以选择锁定内容或描述图。
 *      如果你想让锁定时描述图不显示，可以配置空的锁定图片。
 * 箭头：
 *   (1.上下左右箭头会根据 选项矩阵所处位置 自动显示隐藏。
 *      比如选项窗口为2列，包含5个选项，那么矩阵就为2x3。
 *      再比如选项窗口为2列，包含8个选项，那么矩阵就为2x4。
 * 流程锁定：
 *   (1.只有在末尾选项按退出键才能退出。
 *      只有在末尾选项才会出现结束按钮。
 *   (2.未在末尾选项时，玩家的退出键被占用，只能翻页。
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
 * 资源-整体布局           （默认为 信息面板H-整体布局）
 * 资源-锁定的描述图       （默认为 信息面板H-锁定描述图）
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
 * 插件指令：>信息面板H : 打开面板
 *
 * 插件指令：>信息面板H : 显示选项 : 选项[1]
 * 插件指令：>信息面板H : 显示选项 : 选项变量[21]
 * 插件指令：>信息面板H : 隐藏选项 : 选项[1]
 * 插件指令：>信息面板H : 隐藏选项 : 选项变量[21]
 * 插件指令：>信息面板H : 显示全部选项
 * 插件指令：>信息面板H : 隐藏全部选项
 * 
 * 插件指令：>信息面板H : 锁定选项 : 选项[1]
 * 插件指令：>信息面板H : 锁定选项 : 选项变量[21]
 * 插件指令：>信息面板H : 解锁选项 : 选项[1]
 * 插件指令：>信息面板H : 解锁选项 : 选项变量[21]
 * 插件指令：>信息面板H : 锁定全部选项
 * 插件指令：>信息面板H : 解锁全部选项
 *
 * 1.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 选中选项
 * 你可以控制选项窗口当前选中第N页。（选项有3个，表示有3页）
 * 
 * 插件指令：>信息面板H : 选中选项 : 选项[1]
 * 插件指令：>信息面板H : 选中选项 : 选项变量[21]
 * 
 * 1.信息面板具有当前页记忆，如果你修改了一些选项，你需要用该指令
 *   设置一下当前选中的选项。
 * 2.不存在第0个选项，如果选中选项大于页数，将选择最末尾的选项。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 末尾选项
 * 你可以指定某一页为末尾选项。
 * 
 * 插件指令：>信息面板H : 设置末尾选项 : 最后
 * 插件指令：>信息面板H : 设置末尾选项 : 选项[3]
 * 插件指令：>信息面板H : 设置末尾选项 : 选项变量[3]
 * 
 * 1."1"表示第1页，"3"表示第3页。
 *   "最后一页"表示打开菜单后，显示的选项中，最后的一个。
 *   注意，如果只有3个选项，末尾选项却设为6，那么将以最后一页为准。
 * 2.只有在末尾选项按退出键才能退出。
 *   只有在末尾选项才会出现结束按钮。
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
 * [v1.8]
 * 优化了插件指令。
 * [v1.9]
 * 添加了 按钮声音设置。
 * [v2.0]
 * 添加了窗口选项的未读功能。
 * 更新并兼容了新的窗口字符底层。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 信息面板H-整体布局
 * @require 1
 * @dir img/Menu__self/
 * @type file
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
 * @default 信息面板H
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
 * @default 信息面板H
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
 * @default 信息面板H-锁定描述图
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * 
 * @param ----流程锁定----
 * @default 
 *
 * @param 末尾选项
 * @parent ----流程锁定----
 * @type number
 * @min 0
 * @desc 处于流程锁定的那一页，0表示最后一页。你可以设置只有某页才可以退出，后面的页反而不能退出。
 * @default 0
 *
 * @param 资源-结束按钮
 * @parent ----流程锁定----
 * @desc 流程锁定按钮的图片资源。
 * @default 信息面板H-结束按钮
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
 * @param 结束按钮是否使用默认音效
 * @parent ----流程锁定----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，默认悬停无音效，点击时播放 系统选择 音效。
 * @default true
 *
 * @param 结束按钮悬停音效
 * @parent 结束按钮是否使用默认音效
 * @type struct<SSpHSound>
 * @desc 声音的详细配置信息。
 * @default {"资源-声音":"(需配置)默认声音","音量":"80","音调":"100","声像":"0"}
 *
 * @param 结束按钮点击音效
 * @parent 结束按钮是否使用默认音效
 * @type struct<SSpHSound>
 * @desc 声音的详细配置信息。
 * @default {"资源-声音":"(需配置)默认声音","音量":"80","音调":"100","声像":"0"}
 * 
 * 
 * @param ----按键箭头----
 * @default 
 *
 * @param 资源-左箭头
 * @parent ----按键箭头----
 * @desc 左箭头的图片资源。
 * @default 信息面板H-左箭头
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
 * @default 信息面板H-右箭头
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
 * @default 信息面板H-上箭头
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
 * @default 信息面板H-下箭头
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
 * @param 箭头是否使用默认音效
 * @parent ----按键箭头----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，默认悬停无音效，点击时播放 系统选择 音效。
 * @default true
 *
 * @param 箭头悬停音效
 * @parent 箭头是否使用默认音效
 * @type struct<SSpHSound>
 * @desc 声音的详细配置信息。
 * @default {"资源-声音":"(需配置)默认声音","音量":"80","音调":"100","声像":"0"}
 *
 * @param 箭头点击音效
 * @parent 箭头是否使用默认音效
 * @type struct<SSpHSound>
 * @desc 声音的详细配置信息。
 * @default {"资源-声音":"(需配置)默认声音","音量":"80","音调":"100","声像":"0"}
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
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"信息面板H-选项窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 选项窗口指针与边框
 * @parent ----选项窗口----
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 * 
 * @param ----未读提示----
 * @default 
 *
 * @param 是否启用未读提示
 * @parent ----未读提示----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。未读提示只在选项窗口中有效。
 * @default true
 *
 * @param 未读提示字体大小
 * @parent ----未读提示----
 * @type number
 * @min 0
 * @desc 未读提示的字体大小。
 * @default 18
 *
 * @param 未读提示是否放右下角
 * @parent ----未读提示----
 * @type boolean
 * @on 放右下角
 * @off 默认左上角
 * @desc true - 放右下角，false - 默认左上角
 * @default true
 * 
 * @param 用语-未读提示信息
 * @parent ----未读提示----
 * @type note
 * @desc 未读提示的文本内容，可以使用各种窗口字符。
 * @default "\\c[6]新"
 * 
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
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-2
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-3
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-4
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-5
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-6
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-7
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-8
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-9
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-10
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-11
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-12
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-13
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-14
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-15
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-16
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-17
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-18
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-19
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-20
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组21至40---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-21
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-22
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-23
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-24
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-25
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-26
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-27
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-28
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-29
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-30
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-31
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-32
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-33
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-34
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-35
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-36
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-37
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-38
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-39
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-40
 * @parent ---内容组21至40---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组41至60---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-41
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-42
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-43
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-44
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-45
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-46
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-47
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-48
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-49
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-50
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-51
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-52
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-53
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-54
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-55
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-56
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-57
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-58
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-59
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-60
 * @parent ---内容组41至60---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组61至80---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-61
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-62
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-63
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-64
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-65
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-66
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-67
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-68
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-69
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-70
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-71
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-72
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-73
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-74
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-75
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-76
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-77
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-78
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-79
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-80
 * @parent ---内容组61至80---
 * @type struct<DrillSSpH>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 */
/*~struct~DrillSSpH:
 * 
 * @param 选项名
 * @desc 当前的选项名字。
 * @default 未命名选项
 * 
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
 * @param 行高控制模式
 * @parent ---描述内容---
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
 * @default 自定义补正
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
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "32.数学模型 > 关于弹道.docx"。
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
/*~struct~SSpHSound:
 * 
 * @param 资源-声音
 * @desc 声音的资源文件。
 * @default (需配置)默认声音
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param 音量
 * @type number
 * @min 0
 * @max 100
 * @desc 声音的音量大小，范围为 0至100 。
 * @default 80
 * 
 * @param 音调
 * @type number
 * @min 50
 * @max 150
 * @desc 声音的音调值，范围为 50至150 。
 * @default 100
 * 
 * @param 声像
 * @desc 声音的左右声像，范围为 -100至100 。
 * @default 0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSpH（Scene_Selfplate_A）
//		临时全局变量	DrillUp.g_SSpH_xxx
//		临时局部变量	this._drill_SSpH_xxx
//		存储数据变量	$gameSystem._drill_SSpH_context_list
//		全局存储变量	DrillUp.global_SSpH_enableTank
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
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆全局存储
//			->☆存储数据
//			->☆插件指令
//			
//			->☆面板跳转之主菜单
//			->☆面板跳转之标题
//			->☆面板控制
//			
//			->信息面板H【Scene_Drill_SSpH】
//				->A主体
//				->B选项窗口
//				->C描述窗口
//				->D描述图片
//				->E箭头
//				->F流程（流程锁定）
//				->☆原型链规范（Scene_Drill_SSpH）
//				->☆箭头
//					->帧刷新 贴图
//					->帧刷新 点击
//			
//			->选项窗口【Drill_SSpH_SelectWindow】
//				->G子项（覆写）
//				->2A选中
//				->2B绘制选项
//				->2C已读情况
//				->2D兼容
//			->显示窗口【Drill_SSpH_DescWindow】
//				->窗口行高
//				->对齐方式
//				->绘制文本
//
//			->☆流程锁定
//				->末尾选项
//				->返回按钮控制
//				->结束按钮
//			->☆按钮声音控制
//				->箭头
//				->结束按钮
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 信息面板H【Scene_Drill_SSpH】
//			* 选项窗口【Drill_SSpH_SelectWindow】
//			* 显示窗口【Drill_SSpH_DescWindow】
//		
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SSpH
//				信息面板H
//				Drill_SceneSelfplateH
//
//		★其它说明细节：
//			1.【全局和存档两种数据都有保存，开关只用于切换显示哪种数据】。
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
	DrillUp.g_SSpH_PluginTip_curName = "Drill_SceneSelfplateH.js 面板-全自定义信息面板H";
	DrillUp.g_SSpH_PluginTip_baseList = [
		"Drill_CoreOfGlobalSave.js 管理器-全局存储核心",
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心",
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_SSpH_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_SSpH_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_SSpH_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_SSpH_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_SSpH_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_SSpH_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_SSpH_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SceneSelfplateH = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateH');
	
	
	//==============================
	// * 静态数据 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SSpH_initMenuCursor = function( dataFrom ){
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
	// * 静态数据 - 内容
	//				（~struct~DrillSSpH）
	//==============================
	DrillUp.drill_SSpH_initContext = function( dataFrom ){
		var data = {};
		
		// > 选项名处理
		var temp = String(dataFrom["选项名"]);
		temp = temp.replace(/\\\\/g,"\\");	//（为了支持\\n的写法）
		data['name'] = temp;
		
		// > 选项内容处理
		if( dataFrom["选项内容"] != undefined &&
			dataFrom["选项内容"] != "" ){
			data['nameEx'] = JSON.parse( dataFrom["选项内容"] );
		}else{
			data['nameEx'] = "";
		}
		
		// > 显示情况
		data['enabled'] = String(dataFrom["是否初始显示"] || "false") == "true" ;
		
		// > 锁定情况
		data['locked'] = String(dataFrom["是否初始锁定"] || "false") == "true" ;
		
		// > 已读情况
		data['watched'] = false;
		
		// > 描述图片处理
		data['pic'] = String(dataFrom["资源-描述图片"] || "");
		
		// > 描述内容处理
		if( dataFrom["描述内容"] != undefined &&
			dataFrom["描述内容"] != "" ){
			data['context'] = JSON.parse( dataFrom["描述内容"] );
		}else{
			data['context'] = "";
		}
		data['context_align'] = String(dataFrom["描述内容对齐方式"] || "左对齐");
		data['context_lineheight_type'] = String(DrillUp.parameters["行高控制模式"] || "默认补正");
		data['context_lineheight_custom'] = Number(DrillUp.parameters["自定义补正值"] || 30);
		data['context_lineheight_lock'] = Number(DrillUp.parameters["锁定行高值"] || 30);
		
		return data;
	}
	//==============================
	// * 静态数据 - 声音
	//				（~struct~SSpHSound）
	//==============================
	DrillUp.drill_SSpH_initSound = function( dataFrom ){
		var data = {};
		data['name'] = String( dataFrom["资源-声音"] || "");	//『完整声音数据』
		data['volume'] = Number( dataFrom["音量"] || 100);
		data['pitch'] = Number( dataFrom["音调"] || 100);
		data['pan'] = Number( dataFrom["声像"] || 0);
		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_SSpH_layout = String(DrillUp.parameters["资源-整体布局"] || "");
	
	/*-----------------面板跳转------------------*/
	DrillUp.g_SSpH_add_to_menu = String(DrillUp.parameters["是否在主菜单窗口中显示"] || "true") === "true";	
    DrillUp.g_SSpH_menu_name = String(DrillUp.parameters["主菜单窗口显示名"] || "");
	DrillUp.g_SSpH_add_to_title = String(DrillUp.parameters["是否在标题窗口中显示"] || "false") === "true";	
    DrillUp.g_SSpH_title_name = String(DrillUp.parameters["标题窗口显示名"] || "");
	
	/*-----------------箭头------------------*/
	DrillUp.g_SSpH_arrowLeft = String(DrillUp.parameters["资源-左箭头"] || "");
	DrillUp.g_SSpH_arrowRight = String(DrillUp.parameters["资源-右箭头"] || "");
	DrillUp.g_SSpH_arrowUp = String(DrillUp.parameters["资源-上箭头"] || "");
	DrillUp.g_SSpH_arrowDown = String(DrillUp.parameters["资源-下箭头"] || "");
	DrillUp.g_SSpH_arrowLeft_X = Number(DrillUp.parameters["平移-左箭头 X"] || 60);
	DrillUp.g_SSpH_arrowLeft_Y = Number(DrillUp.parameters["平移-左箭头 Y"] || 300);
	DrillUp.g_SSpH_arrowRight_X = Number(DrillUp.parameters["平移-右箭头 X"] || 750);
	DrillUp.g_SSpH_arrowRight_Y = Number(DrillUp.parameters["平移-右箭头 Y"] || 300);
	DrillUp.g_SSpH_arrowUp_X = Number(DrillUp.parameters["平移-上箭头 X"] || 408);
	DrillUp.g_SSpH_arrowUp_Y = Number(DrillUp.parameters["平移-上箭头 Y"] || 35);
	DrillUp.g_SSpH_arrowDown_X = Number(DrillUp.parameters["平移-下箭头 X"] || 408);
	DrillUp.g_SSpH_arrowDown_Y = Number(DrillUp.parameters["平移-下箭头 Y"] || 560);
	DrillUp.g_SSpH_arrow_zoom = String(DrillUp.parameters["是否使用缩放效果"] || "false") === "true";	
	DrillUp.g_SSpH_arrow_flicker = String(DrillUp.parameters["是否使用闪烁效果"] || "false") === "true";	
	DrillUp.g_SSpH_arrow_float_val = Number(DrillUp.parameters["浮动偏移量"] || 10);
	DrillUp.g_SSpH_arrow_float_lr = String(DrillUp.parameters["是否使用左右浮动"] || "true") === "true";
	DrillUp.g_SSpH_arrow_float_ud = String(DrillUp.parameters["是否使用上下浮动"] || "true") === "true";
	DrillUp.g_SSpH_arrowClickDefaultEnabled = String(DrillUp.parameters["箭头是否使用默认音效"] || "true") === "true";
	if( DrillUp.parameters["箭头悬停音效"] != undefined && 
		DrillUp.parameters["箭头悬停音效"] != "" ){
		var temp = JSON.parse(DrillUp.parameters["箭头悬停音效"]);
		DrillUp.g_SSpH_arrowHoverSound = DrillUp.drill_SSpH_initSound( temp );
	}else{
		DrillUp.g_SSpH_arrowHoverSound = null;
	}
	if( DrillUp.parameters["箭头点击音效"] != undefined && 
		DrillUp.parameters["箭头点击音效"] != "" ){
		var temp = JSON.parse(DrillUp.parameters["箭头点击音效"]);
		DrillUp.g_SSpH_arrowClickSound = DrillUp.drill_SSpH_initSound( temp );
	}else{
		DrillUp.g_SSpH_arrowClickSound = null;
	}
	
	/*-----------------流程锁定------------------*/
	DrillUp.g_SSpH_end_page = Number(DrillUp.parameters["末尾选项"] || DrillUp.parameters["末尾页"] || 0);
	DrillUp.g_SSpH_end_src = String(DrillUp.parameters["资源-结束按钮"] || "");
	DrillUp.g_SSpH_end_x = Number(DrillUp.parameters["平移-结束按钮 X"] || 0);
	DrillUp.g_SSpH_end_y = Number(DrillUp.parameters["平移-结束按钮 Y"] || 0);
	DrillUp.g_SSpH_endClickDefaultEnabled = String(DrillUp.parameters["结束按钮是否使用默认音效"] || "true") === "true";
	if( DrillUp.parameters["结束按钮悬停音效"] != undefined && 
		DrillUp.parameters["结束按钮悬停音效"] != "" ){
		var temp = JSON.parse(DrillUp.parameters["结束按钮悬停音效"]);
		DrillUp.g_SSpH_endHoverSound = DrillUp.drill_SSpH_initSound( temp );
	}else{
		DrillUp.g_SSpH_endHoverSound = null;
	}
	if( DrillUp.parameters["结束按钮点击音效"] != undefined && 
		DrillUp.parameters["结束按钮点击音效"] != "" ){
		var temp = JSON.parse(DrillUp.parameters["结束按钮点击音效"]);
		DrillUp.g_SSpH_endClickSound = DrillUp.drill_SSpH_initSound( temp );
	}else{
		DrillUp.g_SSpH_endClickSound = null;
	}
	
	/*-----------------选项窗口------------------*/
	DrillUp.g_SSpH_selWin_x = Number(DrillUp.parameters["选项窗口 X"] || 30);
	DrillUp.g_SSpH_selWin_y = Number(DrillUp.parameters["选项窗口 Y"] || 120);
	DrillUp.g_SSpH_selWin_width = Number(DrillUp.parameters["选项窗口宽度"] || 220);
	DrillUp.g_SSpH_selWin_height = Number(DrillUp.parameters["选项窗口高度"] || 460);
	DrillUp.g_SSpH_selWin_col = Number(DrillUp.parameters["选项窗口列数"] || 1);
	DrillUp.g_SSpH_selWin_itemHeight = Number(DrillUp.parameters["每条选项高度"] || 36);
	DrillUp.g_SSpH_selWin_nameExEnabled = String(DrillUp.parameters["是否启用选项内容"] || "false") == "true";
    DrillUp.g_SSpH_selWin_align = String(DrillUp.parameters["选项窗口对齐方式"] || "左对齐");
	DrillUp.g_SSpH_selWin_fontsize = Number(DrillUp.parameters["选项窗口字体大小"] || 22);
	if( DrillUp.parameters["选项窗口移动动画"] != undefined &&
		DrillUp.parameters["选项窗口移动动画"] != "" ){
		DrillUp.g_SSpH_selWin_slideAnim = JSON.parse( DrillUp.parameters["选项窗口移动动画"] );
		DrillUp.g_SSpH_selWin_slideAnim['slideMoveType'] = String(DrillUp.g_SSpH_selWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpH_selWin_slideAnim['slideTime'] = Number(DrillUp.g_SSpH_selWin_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpH_selWin_slideAnim['slideDelay'] = Number(DrillUp.g_SSpH_selWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpH_selWin_slideAnim['slidePosType'] = String(DrillUp.g_SSpH_selWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpH_selWin_slideAnim['slideX'] = Number(DrillUp.g_SSpH_selWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpH_selWin_slideAnim['slideY'] = Number(DrillUp.g_SSpH_selWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpH_selWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpH_selWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpH_selWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpH_selWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpH_selWin_slideAnim = {};
	}
	if( DrillUp.parameters["选项窗口布局"] != undefined &&
		DrillUp.parameters["选项窗口布局"] != "" ){
		DrillUp.g_SSpH_selWin_layout = JSON.parse( DrillUp.parameters["选项窗口布局"] );
		DrillUp.g_SSpH_selWin_layout['layoutType'] = String(DrillUp.g_SSpH_selWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSpH_selWin_layout['layoutSrc'] = String(DrillUp.g_SSpH_selWin_layout['资源-贴图'] || "");
		DrillUp.g_SSpH_selWin_layout['layoutSrcFile'] = "img/Menu__self/";
		DrillUp.g_SSpH_selWin_layout['layoutX'] = Number(DrillUp.g_SSpH_selWin_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSpH_selWin_layout['layoutY'] = Number(DrillUp.g_SSpH_selWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSpH_selWin_layout = {};
	}
	if( DrillUp.parameters["选项窗口指针与边框"] != undefined &&
		DrillUp.parameters["选项窗口指针与边框"] != "" ){
		var cursor = JSON.parse( DrillUp.parameters["选项窗口指针与边框"] );
		DrillUp.g_SSpH_selWin_cursor = DrillUp.drill_SSpH_initMenuCursor( cursor );
	}else{
		DrillUp.g_SSpH_selWin_cursor = DrillUp.drill_SSpH_initMenuCursor( {} );
	}

	/*-----------------描述窗口------------------*/
	DrillUp.g_SSpH_descWin_x = Number(DrillUp.parameters["描述窗口 X"] || 285);
	DrillUp.g_SSpH_descWin_y = Number(DrillUp.parameters["描述窗口 Y"] || 100);
	DrillUp.g_SSpH_descWin_width = Number(DrillUp.parameters["描述窗口宽度"] || 510);
	DrillUp.g_SSpH_descWin_height = Number(DrillUp.parameters["描述窗口高度"] || 360);
	DrillUp.g_SSpH_descWin_fontsize = Number(DrillUp.parameters["描述窗口字体大小"] || 22);
	DrillUp.g_SSpH_descWin_replay = String(DrillUp.parameters["是否重播描述窗口移动动画"] || "true") === "true";	
	if( DrillUp.parameters["描述窗口移动动画"] != undefined &&
		DrillUp.parameters["描述窗口移动动画"] != "" ){
		DrillUp.g_SSpH_descWin_slideAnim = JSON.parse( DrillUp.parameters["描述窗口移动动画"] );
		DrillUp.g_SSpH_descWin_slideAnim['slideMoveType'] = String(DrillUp.g_SSpH_descWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpH_descWin_slideAnim['slideTime'] = Number(DrillUp.g_SSpH_descWin_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpH_descWin_slideAnim['slideDelay'] = Number(DrillUp.g_SSpH_descWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpH_descWin_slideAnim['slidePosType'] = String(DrillUp.g_SSpH_descWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpH_descWin_slideAnim['slideX'] = Number(DrillUp.g_SSpH_descWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpH_descWin_slideAnim['slideY'] = Number(DrillUp.g_SSpH_descWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpH_descWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpH_descWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpH_descWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpH_descWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpH_descWin_slideAnim = {};
	}
	if( DrillUp.parameters["描述窗口布局"] != undefined &&
		DrillUp.parameters["描述窗口布局"] != "" ){
		DrillUp.g_SSpH_descWin_layout = JSON.parse( DrillUp.parameters["描述窗口布局"] );
		DrillUp.g_SSpH_descWin_layout['layoutType'] = String(DrillUp.g_SSpH_descWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSpH_descWin_layout['layoutSrc'] = String(DrillUp.g_SSpH_descWin_layout['资源-贴图'] || "");
		DrillUp.g_SSpH_descWin_layout['layoutSrcFile'] = "img/Menu__self/";
		DrillUp.g_SSpH_descWin_layout['layoutX'] = Number(DrillUp.g_SSpH_descWin_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSpH_descWin_layout['layoutY'] = Number(DrillUp.g_SSpH_descWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSpH_descWin_layout = {};
	}

	/*-----------------描述图------------------*/
	DrillUp.g_SSpH_descPic_x = Number(DrillUp.parameters["描述图 X"] || 285);
	DrillUp.g_SSpH_descPic_y = Number(DrillUp.parameters["描述图 Y"] || 480);
	DrillUp.g_SSpH_descPic_replay = String(DrillUp.parameters["是否重播描述图移动动画"] || "true") === "true";	
	DrillUp.g_SSpH_descPic_showInstant = String(DrillUp.parameters["是否瞬间显示描述图"] || "false") === "true";	
	if( DrillUp.parameters["描述图移动动画"] != undefined &&
		DrillUp.parameters["描述图移动动画"] != "" ){
		DrillUp.g_SSpH_descPic_slideAnim = JSON.parse( DrillUp.parameters["描述图移动动画"] );
		DrillUp.g_SSpH_descPic_slideAnim['slideMoveType'] = String(DrillUp.g_SSpH_descPic_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpH_descPic_slideAnim['slideTime'] = Number(DrillUp.g_SSpH_descPic_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpH_descPic_slideAnim['slideDelay'] = Number(DrillUp.g_SSpH_descPic_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpH_descPic_slideAnim['slidePosType'] = String(DrillUp.g_SSpH_descPic_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpH_descPic_slideAnim['slideX'] = Number(DrillUp.g_SSpH_descPic_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpH_descPic_slideAnim['slideY'] = Number(DrillUp.g_SSpH_descPic_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpH_descPic_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpH_descPic_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpH_descPic_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpH_descPic_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpH_descPic_slideAnim = {};
	}
	
	/*-----------------内容------------------*/
	DrillUp.g_SSpH_context_list_length = 80;
	DrillUp.g_SSpH_context_list = [];
	for( var i = 0; i < DrillUp.g_SSpH_context_list_length; i++ ){
		if( DrillUp.parameters["内容-" + String(i+1) ] != undefined &&
			DrillUp.parameters["内容-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["内容-" + String(i+1)] );
			DrillUp.g_SSpH_context_list[i] = DrillUp.drill_SSpH_initContext( data );
			DrillUp.g_SSpH_context_list[i]['index'] = i;
		}else{
			DrillUp.g_SSpH_context_list[i] = null;
		}
	};
	
	/*-----------------锁定内容------------------*/
	DrillUp.g_SSpH_locked_name = String(DrillUp.parameters["用语-锁定的选项名"] || "");
	DrillUp.g_SSpH_locked_name = DrillUp.g_SSpH_locked_name.replace(/\\\\/g,"\\");	//（为了支持\\n的写法）
	if( DrillUp.parameters["用语-锁定的选项内容"] != undefined && 
		DrillUp.parameters["用语-锁定的选项内容"] != "" ){
		DrillUp.g_SSpH_locked_context = JSON.parse( DrillUp.parameters["用语-锁定的选项内容"] );
	}else{
		DrillUp.g_SSpH_locked_context = "";
	}
	DrillUp.g_SSpH_locked_type = String(DrillUp.parameters["内容锁定方式"] || "锁定描述图和描述内容");
	DrillUp.g_SSpH_locked_pic = String(DrillUp.parameters["资源-锁定的描述图"] || "");
	
	/*-----------------未读提示------------------*/
	DrillUp.g_SSpH_watch_enabled = String(DrillUp.parameters["是否启用未读提示"] || "true") === "true";	
	DrillUp.g_SSpH_watch_fontsize = Number(DrillUp.parameters["未读提示字体大小"] || 20);
	DrillUp.g_SSpH_watch_setCorner = String(DrillUp.parameters["未读提示是否放右下角"] || "true") == "true";
	if( DrillUp.parameters["用语-未读提示信息"] != undefined && 
		DrillUp.parameters["用语-未读提示信息"] != "" ){
		DrillUp.g_SSpH_watch_text = JSON.parse( DrillUp.parameters["用语-未读提示信息"] );
	}else{
		DrillUp.g_SSpH_watch_text = "";
	}
	
	/*-----------------全局存储对象------------------*/
	DrillUp.g_SSpH_globalSetting_enabled = String(DrillUp.parameters["数据是否全局存储"] || "false") === "true";
    DrillUp.g_SSpH_globalSetting_fileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);
	DrillUp.global_SSpH_enableTank = null;
	DrillUp.global_SSpH_lockTank = null;
	DrillUp.global_SSpH_watchedTank = null;
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave &&
	Imported.Drill_CoreOfWindowAuxiliary &&
	Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆全局存储
//=============================================================================
//==============================
// * 『全局存储』 - 载入时检查数据 - 显示情况
//==============================
DrillUp.drill_SSpH_gCheckData_enable = function(){
	for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpH_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpH_enableTank[i] == null ){
			if( temp_data == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpH_enableTank[i] = null;
			}else{							//（有内容配置，初始化默认）
				DrillUp.global_SSpH_enableTank[i] = temp_data['enabled'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 『全局存储』 - 载入时检查数据 - 锁定情况
//==============================
DrillUp.drill_SSpH_gCheckData_lock = function(){
	for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpH_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpH_lockTank[i] == null ){
			if( temp_data == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpH_lockTank[i] = null;
			}else{							//（有内容配置，初始化默认）
				DrillUp.global_SSpH_lockTank[i] = temp_data['locked'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 『全局存储』 - 载入时检查数据 - 已读情况
//==============================
DrillUp.drill_SSpH_gCheckData_watched = function(){
	for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpH_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpH_watchedTank[i] == null ){
			if( temp_data == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpH_watchedTank[i] = null;
			}else{							//（有内容配置，初始化默认）
				DrillUp.global_SSpH_watchedTank[i] = temp_data['watched'];
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
	var global_fileId = DrillUp.g_SSpH_globalSetting_fileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "SSpH" );  //『全局存储执行函数』
	
	// > 显示情况
	if( DrillUp.global_SSpH_enableTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_enableTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpH_enableTank = data;
		DrillUp.drill_SSpH_gCheckData_enable();				//（检查时自动赋新值）
	}
	// > 锁定情况
	if( DrillUp.global_SSpH_lockTank == null ){	
		var data = global_data["global_lockTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpH_lockTank = data;
		DrillUp.drill_SSpH_gCheckData_lock();
	}
	// > 已读情况
	if( DrillUp.global_SSpH_watchedTank == null ){	
		var data = global_data["global_watchedTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpH_watchedTank = data;
		DrillUp.drill_SSpH_gCheckData_watched();
	}
	
//==============================
// * 『全局存储』 - 存储
//==============================
StorageManager.drill_SSpH_saveData = function(){
	var file_id = DrillUp.g_SSpH_globalSetting_fileId;
	var data = {};
	data["global_enableTank"] = DrillUp.global_SSpH_enableTank;
	data["global_lockTank"] = DrillUp.global_SSpH_lockTank;
	data["global_watchedTank"] = DrillUp.global_SSpH_watchedTank;
	this.drill_COGS_saveData( file_id, "SSpH", data );  //『全局存储执行函数』
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SSpH_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpH_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SSpH_sys_initialize.call(this);
	this.drill_SSpH_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpH_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SSpH_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SSpH_saveEnabled == true ){	
		$gameSystem.drill_SSpH_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SSpH_initSysData();
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
Game_System.prototype.drill_SSpH_initSysData = function() {
	this.drill_SSpH_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SSpH_checkSysData = function() {
	this.drill_SSpH_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SSpH_initSysData_Private = function() {
	
	this._drill_SSpH_enableTank = [];				//显示情况
	this._drill_SSpH_lockTank = [];					//锁定情况
	this._drill_SSpH_watchedTank = [];				//已读情况
	for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpH_context_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SSpH_enableTank[i] = temp_data['enabled'];
		this._drill_SSpH_lockTank[i] = temp_data['locked'];
		this._drill_SSpH_watchedTank[i] = temp_data['watched'];
	}
	
	this._drill_SSpH_end_page = DrillUp.g_SSpH_end_page;	//末尾选项
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SSpH_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SSpH_enableTank == undefined ||
		this._drill_SSpH_end_page == undefined ){
		this.drill_SSpH_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpH_context_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SSpH_enableTank[i] == undefined ){
				this._drill_SSpH_enableTank[i] = temp_data['enabled'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_SSpH_lockTank[i] == undefined ){
				this._drill_SSpH_lockTank[i] = temp_data['locked'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_SSpH_watchedTank[i] == undefined ){
				this._drill_SSpH_watchedTank[i] = temp_data['watched'];
			
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
var _drill_SSpH_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_SSpH_pluginCommand.call(this, command, args);
	this.drill_SSpH_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_SSpH_pluginCommand = function( command, args ){
	if( command === ">信息面板H" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "打开面板" ){
				SceneManager.push(Scene_Drill_SSpH);
			}
		}
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( temp1.indexOf("选项变量[") != -1 ){
				temp1 = temp1.replace("选项变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value(Number(temp1));
			}else if( temp1.indexOf("选项[") != -1 ){
				temp1 = temp1.replace("选项[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
			}
			if( type == "显示选项" ){
				DrillUp.global_SSpH_enableTank[ Number(temp1)-1 ] = true;			//全局存储
				$gameSystem._drill_SSpH_enableTank[ Number(temp1)-1 ] = true;		//正常存储
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "隐藏选项" ){
				DrillUp.global_SSpH_enableTank[ Number(temp1)-1 ] = false;			//全局存储
				$gameSystem._drill_SSpH_enableTank[ Number(temp1)-1 ] = false;		//正常存储
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "锁定选项" ){
				DrillUp.global_SSpH_lockTank[ Number(temp1)-1 ] = true;				//全局存储
				$gameSystem._drill_SSpH_lockTank[ Number(temp1)-1 ] = true;			//正常存储
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "解锁选项" ){
				DrillUp.global_SSpH_lockTank[ Number(temp1)-1 ] = false;			//全局存储
				$gameSystem._drill_SSpH_lockTank[ Number(temp1)-1 ] = false;		//正常存储
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "选中选项" || type == "选中页" ){
				$gameSystem._drill_SSpH_context_index = Number(temp1) -1;
			}
			if( type == "设置末尾选项" || type == "末尾页" ){
				if( temp1 == "最后" || temp1 == "最后一页" ){		//只正常存储
					$gameSystem._drill_SSpH_end_page = 0;
				}else{
					$gameSystem._drill_SSpH_end_page = Number(temp1)-1;
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示全部选项" || type == "显示全部" ){
				for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
					DrillUp.global_SSpH_enableTank[i] = true;			//全局存储
					$gameSystem._drill_SSpH_enableTank[i] = true;		//正常存储
				}
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "隐藏全部选项" || type == "隐藏全部" ){
				for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
					DrillUp.global_SSpH_enableTank[i] = false;			//全局存储
					$gameSystem._drill_SSpH_enableTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "锁定全部选项" || type == "锁定全部" ){
				for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
					DrillUp.global_SSpH_lockTank[i] = true;				//全局存储
					$gameSystem._drill_SSpH_lockTank[i] = true;			//正常存储
				}
				StorageManager.drill_SSpH_saveData();
			}
			if( type == "解锁全部选项" || type == "解锁全部" ){
				for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
					DrillUp.global_SSpH_lockTank[i] = false;			//全局存储
					$gameSystem._drill_SSpH_lockTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpH_saveData();
			}
		}
	}
	
};



//=============================================================================
// ** ☆面板跳转之主菜单
//
//			说明：	> 此模块专门关联主菜单选项，选项进入后跳转到 信息面板H 界面。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_SSpH_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SSpH_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SSpH',   this.drill_SSpH_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SSpH_menuCommand = function() {
    SceneManager.push(Scene_Drill_SSpH);
};
var _drill_SSpH_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SSpH_addOriginalCommands.call(this);
	if( DrillUp.g_SSpH_add_to_menu ){
		this.addCommand(DrillUp.g_SSpH_menu_name, 'Drill_SSpH', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** ☆面板跳转之标题
//
//			说明：	> 此模块专门关联标题选项，选项进入后跳转到 信息面板H 界面。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================	
var _drill_SSpH_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SSpH_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SSpH',  this.drill_SSpH_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SSpH_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SSpH);
};
var _drill_SSpH_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SSpH_title_makeCommandList.call(this);
	if( DrillUp.g_SSpH_add_to_title ){
		this.addCommand( DrillUp.g_SSpH_title_name ,'Drill_SSpH');
	}
};	


//=============================================================================
// ** ☆面板控制
//
//			说明：	> 此模块专门将部分面板配置转移到 Game_Temp 方便随时调用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 面板控制 - 初始化
//==============================
var _drill_SSpH_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_SSpH_temp_initialize.call(this);
	this._drill_SSpH_visibleContextDataList = [];
};
//==============================
// * 面板控制 - 判断 锁定情况
//==============================
Game_Temp.prototype.drill_SSpH_isLocked = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpH_globalSetting_enabled == true ){
		if( DrillUp.global_SSpH_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpH_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}
//==============================
// * 面板控制 - 判断 显示情况
//==============================
Game_Temp.prototype.drill_SSpH_isEnabled = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpH_globalSetting_enabled == true ){
		if( DrillUp.global_SSpH_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpH_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}
//==============================
// * 面板控制 - 判断 已读情况
//==============================
Game_Temp.prototype.drill_SSpH_isWatched = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpH_globalSetting_enabled == true ){
		if( DrillUp.global_SSpH_watchedTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpH_watchedTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
};
//==============================
// * 面板控制 - 资源文件夹
//==============================
ImageManager.load_MenuSelfDef = function(filename) {
    return this.loadBitmap('img/Menu__self/', filename, 0, true);
};



//=============================================================================
// ** 信息面板H【Scene_Drill_SSpH】
// **
// **		作用域：	菜单界面
// **		主功能：	信息面板的基本功能。
// **		子功能：
// **					->界面重要函数
// **						> 初始化（initialize）
// **						> 创建（create）
// **						> 帧刷新（update）
// **						x> 开始运行（start）
// **						x> 结束运行（stop）
// **						x> 忙碌状态（isBusy）
// **						x> 析构函数（terminate）
// **						x> 判断加载完成（isReady）
// **						x> 判断是否激活/启动（isActive）
// **						x> 当前角色切换时（onActorChange）
// **						x> 创建 - 菜单背景（createBackground）
// **						x> 创建 - 帮助窗口（createHelpWindow）
// **					
// **					->A主体
// **					->B选项窗口
// **						x->选项按钮组
// **						->选项变化时
// **							->重播窗口动画
// **							->重绘内容
// **							->重播贴图动画
// **							->切换描述图
// **					->C描述窗口
// **					->D描述图片
// **						->显现效果
// **					->E箭头
// **					->F流程（流程锁定）
// **						->翻下一页
// **						->退出窗口（末尾选项才生效）
// **						->返回按钮（末尾选项才生效）
// **		界面成员：
// **					> ._drill_field				布局层
// **						> ._window_select			选项窗口
// **						> ._window_desc				描述窗口
// **						> ._sprite_descPic			描述图片
// **						> ._arrow_left				左箭头 
// **						> ._arrow_right				右箭头
// **						> ._arrow_up 				上箭头
// **						> ._arrow_down 				下箭头
// **					> ._drill_layout			整体布局贴图
// **
// **		说明：	> 实时锁定退出键、鼠标按键，确保必须看到末尾选项才能离开。
//=============================================================================
//==============================
// * 信息面板H - 定义
//==============================
function Scene_Drill_SSpH() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SSpH.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SSpH.prototype.constructor = Scene_Drill_SSpH;
//==============================
// * 信息面板H - 初始化（继承）
//==============================
Scene_Drill_SSpH.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._drill_curSelectedIndex = -1;
	this._drill_lastSelectedIndex = -1;
};
//==============================
// * 信息面板H - 创建（继承）
//==============================
Scene_Drill_SSpH.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.drill_createAttr();			//创建 - A主体
	this.drill_createDescPic();			//创建 - D描述图片
	this.drill_createSelect();			//创建 - B选项窗口
	this.drill_createDesc();			//创建 - C描述窗口
	this.drill_createArrow();			//创建 - E箭头
	this.drill_createEndButton();		//创建 - F流程
};
//==============================
// * 信息面板H - 帧刷新（继承）
//==============================
Scene_Drill_SSpH.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
										//帧刷新 - A主体（无）
	this.drill_updateSelect();			//帧刷新 - B选项窗口
	this.drill_updateSelectChanged();	//帧刷新 - B选项窗口 - 选项变化时
	this.drill_updateDesc();			//帧刷新 - C描述窗口
	this.drill_updateDescPic();			//帧刷新 - D描述图片
	
	this.drill_updateArrowHover();		//帧刷新 - E箭头 - 箭头高亮
	this.drill_updateArrowSprite();		//帧刷新 - E箭头 - 箭头贴图
	this.drill_updateArrowTouch();		//帧刷新 - E箭头 - 箭头点击
	this.drill_updateArrowLastHover();	//帧刷新 - E箭头 - 箭头上一次高亮
	
	this.drill_updateEndBtnHover();		//帧刷新 - F流程 - 结束按钮高亮
	this.drill_updateEndBtnSprite();	//帧刷新 - F流程 - 结束按钮贴图
	this.drill_updateEndBtnTouch();		//帧刷新 - F流程 - 结束按钮点击
	this.drill_updateEndBtnLastHover();	//帧刷新 - F流程 - 结束按钮上一次高亮
	
	this.drill_updateBackBtnControl();	//帧刷新 - F流程 - 返回按钮控制
}

//==============================
// * A主体 - 创建
//==============================
Scene_Drill_SSpH.prototype.drill_createAttr = function() {
	
	// > 布局层（先画，其图层都被放在后面）
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);
	
	// > 整体布局贴图
	this._drill_layout = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_layout));
	this.addChild(this._drill_layout);
};

//==============================
// * B选项窗口 - 创建
//==============================
Scene_Drill_SSpH.prototype.drill_createSelect = function() {
	var data = {
		"x": DrillUp.g_SSpH_selWin_x,
		"y": DrillUp.g_SSpH_selWin_y,
		"width": DrillUp.g_SSpH_selWin_width,
		"height": DrillUp.g_SSpH_selWin_height,
		"fontsize": DrillUp.g_SSpH_selWin_fontsize,
		
		"slideMoveType": DrillUp.g_SSpH_selWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpH_selWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpH_selWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpH_selWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpH_selWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpH_selWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpH_selWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpH_selWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSpH_selWin_layout['layoutType'],
		"layoutX": DrillUp.g_SSpH_selWin_layout['layoutX'],
		"layoutY": DrillUp.g_SSpH_selWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSpH_selWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSpH_selWin_layout['layoutSrcFile'],
	}
	this._window_select = new Drill_SSpH_SelectWindow(0, 0, 0, 0);
	this._window_select.drill_COWA_changeParamData( data ); //『辅助核心初始化』-窗口基本属性
	this._window_select.refresh();
	this._window_select.drill_window_initSelect();
	
	this._window_select.setHandler('cancel',   this.popScene.bind(this));//绑定退出界面事件
	this._drill_field.addChild(this._window_select);
};
//==============================
// * B选项窗口 - 帧刷新
//==============================
Scene_Drill_SSpH.prototype.drill_updateSelect = function() {
	
	// > 初始化 - 插件指令选中
	var max_index = $gameTemp._drill_SSpH_visibleContextDataList.length -1;
	if( $gameSystem._drill_SSpH_context_index != undefined ){
		var index = $gameSystem._drill_SSpH_context_index;
		if( index < 0 ){ index = 0; };
		if( index > max_index ){ index = max_index; };
		this._window_select.select( index );			//（设置选中选项）
		$gameSystem._drill_SSpH_context_index = null;	//（激活后清空）
	}
	
	// > 初始化 - 默认选中
	if( this._window_select._index == null ){ this._window_select.select(0); }
	if( this._window_select._index < 0 ){ this._window_select.select(0); }
	if( this._window_select._index > max_index ){ this._window_select.select(max_index); }
	
};
//==============================
// * B选项窗口 - 帧刷新 - 选项变化时
//==============================
Scene_Drill_SSpH.prototype.drill_updateSelectChanged = function() {
	if( $gameTemp._drill_SSpH_visibleContextDataList.length == 0 ){ return };
	
	// > 选项变化时
	if( this._drill_curSelectedIndex != this._window_select._index ){
		this._drill_curSelectedIndex  = this._window_select._index;
		
		// > 描述窗口 - 重播窗口动画
		if( DrillUp.g_SSpH_descWin_replay ){
			this._window_desc.drill_COWA_resetAttrMove(); //『辅助核心动画』-重播窗口动画
			this._window_desc.drill_COWA_resetAttrOpacity(); //『辅助核心动画』-重播窗口动画
		}
		// > 描述窗口 - 重绘内容
		this._window_desc.drill_refreshDescText(this._drill_curSelectedIndex);
		
		// > 描述图 - 重播贴图动画
		if( DrillUp.g_SSpH_descPic_replay ){
			this._sprite_descPic.drill_COWA_resetAttrMove(); //『辅助核心动画』-重播贴图动画
		}
		// > 描述图 - 切换描述图
		this.drill_refreshDescPic(this._drill_curSelectedIndex);
		
		// > 选项窗口 - 已读情况
		this._window_select.drill_window_watchedChanged(this._drill_lastSelectedIndex);
		
		// > 箭头
		this.drill_refreshArrow(this._drill_curSelectedIndex);
		
		this._drill_lastSelectedIndex = this._drill_curSelectedIndex;
	}
}

//==============================
// * C描述窗口 - 创建
//==============================
Scene_Drill_SSpH.prototype.drill_createDesc = function() {
	var data = {
		"x": DrillUp.g_SSpH_descWin_x,
		"y": DrillUp.g_SSpH_descWin_y,
		"width": DrillUp.g_SSpH_descWin_width,
		"height": DrillUp.g_SSpH_descWin_height,
		"fontsize": DrillUp.g_SSpH_descWin_fontsize,
		
		"slideMoveType": DrillUp.g_SSpH_descWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpH_descWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpH_descWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpH_descWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpH_descWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpH_descWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpH_descWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpH_descWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSpH_descWin_layout['layoutType'],
		"layoutX": DrillUp.g_SSpH_descWin_layout['layoutX'],
		"layoutY": DrillUp.g_SSpH_descWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSpH_descWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSpH_descWin_layout['layoutSrcFile'],
	}
	this._window_desc = new Drill_SSpH_DescWindow(0, 0, 0, 0);
	this._window_desc.drill_COWA_changeParamData( data ); //『辅助核心初始化』-窗口基本属性
	
	this._drill_field.addChild(this._window_desc);
};
//==============================
// * C描述窗口 - 帧刷新
//==============================
Scene_Drill_SSpH.prototype.drill_updateDesc = function() {
	//（不操作，动画自己会帧刷新）
};

//==============================
// * D描述图片 - 创建
//==============================
Scene_Drill_SSpH.prototype.drill_createDescPic = function() {
	var data = {
		"x": DrillUp.g_SSpH_descPic_x,
		"y": DrillUp.g_SSpH_descPic_y,
		
		"slideMoveType": DrillUp.g_SSpH_descPic_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpH_descPic_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpH_descPic_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpH_descPic_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpH_descPic_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpH_descPic_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpH_descPic_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpH_descPic_slideAnim['slideAbsoluteY'],
	}
	this._sprite_descPic = new Sprite();
	this._sprite_descPic.drill_COWA_setAttrMove( data ); //『辅助核心初始化』-贴图基本属性
	this._drill_field.addChild(this._sprite_descPic);	
	
	this._sprite_descPic._drill_bitmaps = [];
};
//==============================
// * D描述图片 - 帧刷新
//==============================
Scene_Drill_SSpH.prototype.drill_updateDescPic = function() {
	
	// > 显现效果
	if( DrillUp.g_SSpH_descPic_showInstant == false ){
		this._sprite_descPic.opacity += 255/DrillUp.g_SSpH_descPic_slideAnim['slideTime'];
	}
}
//==============================
// * D描述图片 - 切换描述图
//==============================
Scene_Drill_SSpH.prototype.drill_refreshDescPic = function( cur_index ){
	
	// > 资源全加载
	var src_tank = this._sprite_descPic._drill_bitmaps;	//资源bitmap容器
	if( src_tank.length == 0 ){
		src_tank[0] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_locked_pic);
		for( var i = 0; i < $gameTemp._drill_SSpH_visibleContextDataList.length; i++ ){
			var temp_data = $gameTemp._drill_SSpH_visibleContextDataList[i];
			if( temp_data == null ){ continue; }
			if( temp_data == "" ){ continue; }
			
			var context_realIndex = temp_data['index'];
			src_tank[ i+1 ] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_context_list[ context_realIndex ]["pic"]);	
		}
		this._sprite_descPic._drill_bitmaps = src_tank;
	}
	
	// > 切换描述图
	var temp_curData = $gameTemp._drill_SSpH_visibleContextDataList[ cur_index ];	//（当前选项）
	if( $gameTemp.drill_SSpH_isLocked( temp_curData['index'] ) == true && 
		(DrillUp.g_SSpH_locked_type == "锁定描述图和描述内容" || 
		 DrillUp.g_SSpH_locked_type == "只锁定描述图" ) ){
		this._sprite_descPic.bitmap = src_tank[ 0 ];			//锁定描述图
	}else{
		this._sprite_descPic.bitmap = src_tank[ cur_index+1 ];	//当前描述图
	}
	
	// > 显现效果 重置
	if( DrillUp.g_SSpH_descPic_showInstant == false ){
		this._sprite_descPic.opacity = 0;
	}
}


//=============================================================================
// ** ☆原型链规范（Scene_Drill_SSpH）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 信息面板H（场景基类） - 初始化
//==============================
//Scene_Drill_SSpH.prototype.initialize = function() {
//    Scene_MenuBase.prototype.initialize.call(this);
//};
//==============================
// * 信息面板H（场景基类） - 创建
//==============================
//Scene_Drill_SSpH.prototype.create = function() {
//    Scene_MenuBase.prototype.create.call(this);
//};
//==============================
// * 信息面板H（场景基类） - 帧刷新
//==============================
//Scene_Drill_SSpH.prototype.update = function() {
//    Scene_MenuBase.prototype.update.call(this);
//};
//==============================
// * 信息面板H（场景基类） - 开始运行
//==============================
Scene_Drill_SSpH.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
//==============================
// * 信息面板H（场景基类） - 结束运行
//==============================
Scene_Drill_SSpH.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
};
//==============================
// * 信息面板H（场景基类） - 忙碌状态
//==============================
Scene_Drill_SSpH.prototype.isBusy = function() {
	return Scene_MenuBase.prototype.isBusy.call(this);
};
//==============================
// * 信息面板H（场景基类） - 析构函数
//==============================
Scene_Drill_SSpH.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};
//==============================
// * 信息面板H（场景基类） - 判断加载完成
//==============================
Scene_Drill_SSpH.prototype.isReady = function() {
	return Scene_MenuBase.prototype.isReady.call(this);
};
//==============================
// * 信息面板H（场景基类） - 判断是否激活/启动
//==============================
Scene_Drill_SSpH.prototype.isActive = function() {
	return Scene_MenuBase.prototype.isActive.call(this);
};

//==============================
// * 信息面板H（菜单界面基类） - 当前角色切换时
//==============================
Scene_Drill_SSpH.prototype.onActorChange = function() {
	Scene_MenuBase.prototype.onActorChange.call(this);
};
//==============================
// * 信息面板H（菜单界面基类） - 创建 - 菜单背景
//==============================
Scene_Drill_SSpH.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};
//==============================
// * 信息面板H（菜单界面基类） - 创建 - 帮助窗口
//==============================
Scene_Drill_SSpH.prototype.createHelpWindow = function() {
	Scene_MenuBase.prototype.createHelpWindow.call(this);
};


//=============================================================================
// ** ☆箭头
//
//			说明：	> 此模块专门提供 箭头按钮功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * E箭头 - 创建
//==============================
Scene_Drill_SSpH.prototype.drill_createArrow = function() {
	
	// > 参数初始化
	this._arrow_changeValue = 0;		//线性变化值
	this._arrow_changeSpeed = 0.08;		//线性变化速度
	this._arrow_hoverType = 0;			//高亮对象（0：无，4：左箭头，6：右箭头，8：上箭头，2：下箭头）
	this._arrow_lastHoverType = 0;		//高亮对象（上一次的）
	
	this._arrow_left = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_arrowLeft));
	this._arrow_right = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_arrowRight));
	this._arrow_up = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_arrowUp));
	this._arrow_down = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_arrowDown));
	this._arrow_left._org_x = DrillUp.g_SSpH_arrowLeft_X ; 
	this._arrow_left._org_y = DrillUp.g_SSpH_arrowLeft_Y ;
	this._arrow_right._org_x = DrillUp.g_SSpH_arrowRight_X ;
	this._arrow_right._org_y = DrillUp.g_SSpH_arrowRight_Y ;
	this._arrow_up._org_x = DrillUp.g_SSpH_arrowUp_X ; 
	this._arrow_up._org_y = DrillUp.g_SSpH_arrowUp_Y ; 
	this._arrow_down._org_x = DrillUp.g_SSpH_arrowDown_X ;
	this._arrow_down._org_y = DrillUp.g_SSpH_arrowDown_Y ;
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
// * E箭头 - 帧刷新 贴图
//==============================
Scene_Drill_SSpH.prototype.drill_updateArrowSprite = function() {
	this._arrow_left.opacity  = 180;
	this._arrow_right.opacity = 180;
	this._arrow_up.opacity    = 180;
	this._arrow_down.opacity  = 180;
	
	// > 线性变化值
	this._arrow_changeValue += this._arrow_changeSpeed;
	if( this._arrow_changeValue > 1 ){
		this._arrow_changeSpeed = -0.08;
	}else if( this._arrow_changeValue < -1 ){
		this._arrow_changeSpeed = 0.08;
	}
	
	// > 左右浮动
	if( DrillUp.g_SSpH_arrow_float_lr ){
		this._arrow_left.x = this._arrow_left._org_x + this._arrow_changeValue* DrillUp.g_SSpH_arrow_float_val ; 	
		this._arrow_left.y = this._arrow_left._org_y ; 
		this._arrow_right.x = this._arrow_right._org_x - this._arrow_changeValue* DrillUp.g_SSpH_arrow_float_val ; 
		this._arrow_right.y = this._arrow_right._org_y ;
	}
	// > 上下浮动
	if( DrillUp.g_SSpH_arrow_float_ud ){
		this._arrow_up.x = this._arrow_up._org_x;
		this._arrow_up.y = this._arrow_up._org_y + this._arrow_changeValue* DrillUp.g_SSpH_arrow_float_val ; 	
		this._arrow_down.x = this._arrow_down._org_x;
		this._arrow_down.y = this._arrow_down._org_y - this._arrow_changeValue* DrillUp.g_SSpH_arrow_float_val ; 	
	}
	// > 缩放
	if( DrillUp.g_SSpH_arrow_zoom ){
		this._arrow_left.scale.x = 1 + this._arrow_changeValue * 0.3 ;
		this._arrow_left.scale.y = 1 + this._arrow_changeValue * 0.3 ;
		this._arrow_right.scale.x= 1 + this._arrow_changeValue * 0.3 ;
		this._arrow_right.scale.y= 1 + this._arrow_changeValue * 0.3 ;
		this._arrow_up.scale.x =   1 + this._arrow_changeValue * 0.3 ;
		this._arrow_up.scale.y =   1 + this._arrow_changeValue * 0.3 ;
		this._arrow_down.scale.x = 1 + this._arrow_changeValue * 0.3 ;
		this._arrow_down.scale.y = 1 + this._arrow_changeValue * 0.3 ;
	}
	// > 闪烁
	if( DrillUp.g_SSpH_arrow_flicker ){
		this._arrow_left.opacity = 56 + this._arrow_changeValue * 200 ;
		this._arrow_right.opacity= 56 + this._arrow_changeValue * 200 ;
		this._arrow_up.opacity =   56 + this._arrow_changeValue * 200 ;
		this._arrow_down.opacity = 56 + this._arrow_changeValue * 200 ;
	}
	
	// > 高亮时，固定透明度
	if( this._arrow_hoverType == 4 ){ this._arrow_left.opacity = 255; }
	if( this._arrow_hoverType == 6 ){ this._arrow_right.opacity = 255; }
	if( this._arrow_hoverType == 8 ){ this._arrow_up.opacity = 255; }
	if( this._arrow_hoverType == 2 ){ this._arrow_down.opacity = 255; }
}
//==============================
// * E箭头 - 帧刷新 点击
//==============================
Scene_Drill_SSpH.prototype.drill_updateArrowTouch = function() {
    if( TouchInput.isTriggered() ){
		if( this._arrow_hoverType == 4 ){ this._window_select.cursorLeft();  SoundManager.drill_SSpH_playClick_Arrow(); }
		if( this._arrow_hoverType == 6 ){ this._window_select.cursorRight(); SoundManager.drill_SSpH_playClick_Arrow(); }
		if( this._arrow_hoverType == 8 ){ this._window_select.cursorUp();    SoundManager.drill_SSpH_playClick_Arrow(); }
		if( this._arrow_hoverType == 2 ){ this._window_select.cursorDown();  SoundManager.drill_SSpH_playClick_Arrow(); }
	}
}
//==============================
// * E箭头 - 帧刷新 高亮
//==============================
Scene_Drill_SSpH.prototype.drill_updateArrowHover = function() {
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	var hoverType = 0;
	if( this.drill_isOnHover(xx,yy,this._arrow_left)  ){ hoverType = 4; }
	if( this.drill_isOnHover(xx,yy,this._arrow_right) ){ hoverType = 6; }
	if( this.drill_isOnHover(xx,yy,this._arrow_up)    ){ hoverType = 8; }
	if( this.drill_isOnHover(xx,yy,this._arrow_down)  ){ hoverType = 2; }
	this._arrow_hoverType = hoverType;
}
//==============================
// * E箭头 - 帧刷新 上一次高亮
//==============================
Scene_Drill_SSpH.prototype.drill_updateArrowLastHover = function() {
	this._arrow_lastHoverType = this._arrow_hoverType;
}
//==============================
// * E箭头 - 是否鼠标悬停
//==============================
Scene_Drill_SSpH.prototype.drill_isOnHover = function( x, y, temp_sprite ){
	if( temp_sprite == undefined ){ return false };
	if( temp_sprite.bitmap == undefined ){ return false };
	if(!temp_sprite.bitmap.isReady() ){ return false };
	if( temp_sprite.visible === false ){ return false };
	
	var pw = temp_sprite.bitmap.width  *0.5 + 20;
	var ph = temp_sprite.bitmap.height *0.5 + 20;
	if( x < temp_sprite._org_x - pw ){ return false };
	if( x > temp_sprite._org_x + pw ){ return false };
	if( y < temp_sprite._org_y - ph ){ return false };
	if( y > temp_sprite._org_y + ph ){ return false };
	return true;	
};
//==============================
// * E箭头 - 窗口选项刷新 箭头显示
//==============================
Scene_Drill_SSpH.prototype.drill_refreshArrow = function( index ){
	var l_visible = true;
	var r_visible = true;
	var u_visible = true;
	var d_visible = true;
	if( index % DrillUp.g_SSpH_selWin_col == 0 ){
		l_visible = false;
	}
	if( index % DrillUp.g_SSpH_selWin_col == DrillUp.g_SSpH_selWin_col-1 ||
		index == $gameTemp._drill_SSpH_visibleContextDataList.length -1 ){
		r_visible = false;
	}
	if( index <= DrillUp.g_SSpH_selWin_col-1 ){
		u_visible = false;
	}
	if( index > $gameTemp._drill_SSpH_visibleContextDataList.length -1 - DrillUp.g_SSpH_selWin_col ){
		d_visible = false;
	}
	this._arrow_left.visible = l_visible;
	this._arrow_right.visible = r_visible;
	this._arrow_up.visible = u_visible;
	this._arrow_down.visible = d_visible;
}
//==============================
// * E箭头 - 获取鼠标位置（输入设备核心的片段）
//==============================
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
// ** 选项窗口【Drill_SSpH_SelectWindow】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个选项窗口，能进行选项切换。
// **		子功能：	
// **					->窗口
// **						->帧刷新
// **					->G子项（覆写）
// **					->2A选中
// **					->2B绘制选项
// **					->2C已读情况
// **					->2D兼容
// **
// **		说明：	> 该插件专用。
//==========================================================================================
//==============================
// * 选项窗口 - 定义
//==============================
function Drill_SSpH_SelectWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SSpH_SelectWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SSpH_SelectWindow.prototype.constructor = Drill_SSpH_SelectWindow;
//==============================
// * 选项窗口 - 初始化
//==============================
Drill_SSpH_SelectWindow.prototype.initialize = function( x, y, width, height ){
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.activate();
	this.drill_window_initSelect();
};
//==============================
// * 选项窗口 - 帧刷新
//==============================
Drill_SSpH_SelectWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	//（无）
};

//==============================
// * G子项 - 属性 - 列数（覆写）
//==============================
Drill_SSpH_SelectWindow.prototype.maxCols = function() {
	return DrillUp.g_SSpH_selWin_col;
};
//==============================
// * G子项 - 属性 - 子项数量（覆写）
//==============================
Drill_SSpH_SelectWindow.prototype.maxItems = function() {
	return this._drill_selectionNameList ? this._drill_selectionNameList.length : 0;
};
//==============================
// * G子项 - 属性 - 子项间距
//==============================
// （不操作）
//==============================
// * G子项 - 属性 - 子项宽度
//==============================
// （不操作）
//==============================
// * G子项 - 属性 - 子项高度（覆写）
//==============================
Drill_SSpH_SelectWindow.prototype.itemHeight = function() {
	return DrillUp.g_SSpH_selWin_itemHeight;
};
//==============================
// * G子项 - 重画所有子项（覆写）
//==============================
Drill_SSpH_SelectWindow.prototype.refresh = function() {
	
	// > 重刷可见项列表
	$gameTemp._drill_SSpH_visibleContextDataList = [];
	for( var i = 0; i < DrillUp.g_SSpH_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpH_context_list[i];
		if( temp_data == null ){ continue; }
		
		if( $gameTemp.drill_SSpH_isEnabled( i ) == true ){
			$gameTemp._drill_SSpH_visibleContextDataList.push( temp_data );
		}
	}
	
	// > 选项显示的文本（与可见项一对一）
	this._drill_selectionNameList = [];
	for( var j = 0; j < $gameTemp._drill_SSpH_visibleContextDataList.length ;j++ ){
		var temp_data = $gameTemp._drill_SSpH_visibleContextDataList[j];
		var context_realIndex = temp_data['index'];
		
		// > 选项锁定
		if( $gameTemp.drill_SSpH_isLocked( context_realIndex ) == true ){
			this._drill_selectionNameList[j] = String(DrillUp.g_SSpH_locked_name);
			continue;
		}
		
		// > 选项长文本
		if( DrillUp.g_SSpH_selWin_nameExEnabled == true ){
			this._drill_selectionNameList[j] = String(temp_data['nameEx']);
			continue;
		}
		
		// > 选项名
		this._drill_selectionNameList[j] = String(temp_data['name']);
	}
	
	// > 绘制选项内容
	this.createContents();
	this.drill_window_drawAllItem();
	
	// > 选项兼容（._list 是 Window_Command 的参数，Window_Selectable 没有此参数，但为了兼容这里赋值一下）
	this._list = this._drill_selectionNameList;
};

//==============================
// * 2A选中 - 参数初始化
//==============================
Drill_SSpH_SelectWindow.g_drill_lastTopRow = 0;
Drill_SSpH_SelectWindow.g_drill_lastIndex  = 0;
//==============================
// * 2A选中 - 设置选项
//==============================
Drill_SSpH_SelectWindow.prototype.drill_window_initSelect = function() {
	if( Drill_SSpH_SelectWindow.g_drill_lastIndex >= this._drill_selectionNameList.length ){
		Drill_SSpH_SelectWindow.g_drill_lastIndex = this._drill_selectionNameList.length-1;
	}
	this.setTopRow(Drill_SSpH_SelectWindow.g_drill_lastTopRow);
	this.select(Drill_SSpH_SelectWindow.g_drill_lastIndex);
}
//==============================
// * 2A选中 - 退出时暂存选项（继承）
//==============================
Drill_SSpH_SelectWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Drill_SSpH_SelectWindow.g_drill_lastTopRow = this.topRow();
	Drill_SSpH_SelectWindow.g_drill_lastIndex = this.index();
};

//==============================
// * 2B绘制选项 - 绘制所有
//
//			说明：	> 该函数是一个单独定义的函数，参考了 Window_Selectable.prototype.drawAllItems 结构。
//==============================
Drill_SSpH_SelectWindow.prototype.drill_window_drawAllItem = function(){
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 原函数
    var topIndex = this.topIndex();
    for( var i = 0; i < this.maxPageItems(); i++ ){
        var index = topIndex + i;
        if( index < this.maxItems() ){
            this.drill_window_drawItem(index);
            this.drill_window_drawNewTag(index);
        }
    }
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
};
//==============================
// * 2B绘制选项 - 绘制单个
//
//			说明：	> 该函数是一个单独定义的函数，参考了 Window_Selectable.prototype.drawItem 结构。
//==============================
Drill_SSpH_SelectWindow.prototype.drill_window_drawItem = function( index ){
	var rect = this.itemRectForText(index);
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = this._drill_selectionNameList[index];
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = rect.x,
	options['infoParam']['y'] = rect.y,
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['rowParam'] = {};
	options['rowParam']['alignHor_maxWidth'] = rect.width;
	options['rowParam']['alignVer_maxHeight'] = rect.height;
	
	options['rowParam']['alignHor_type'] = DrillUp.g_SSpH_selWin_align;	//（对齐方式）
	
	// > 清空画布（这里在连续绘制选项，不要清空）
	//temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
};

//==============================
// * 2C已读情况 - 绘制新标签
//==============================
Drill_SSpH_SelectWindow.prototype.drill_window_drawNewTag = function( index ){
	if( DrillUp.g_SSpH_watch_enabled != true ){ return; }
	
	var temp_data = $gameTemp._drill_SSpH_visibleContextDataList[index];	//（当前选项）
	if( temp_data == undefined ){ return; }
	var rect = this.itemRectForText(index);
	var context_realIndex = temp_data['index'];
	
	// > 已读则跳出
	if( $gameTemp.drill_SSpH_isWatched( context_realIndex ) == true ){ return; }
	// > 锁定则跳出
	if( $gameTemp.drill_SSpH_isLocked( context_realIndex ) == true ){ return; }
	
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = DrillUp.g_SSpH_watch_text;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = rect.x,
	options['infoParam']['y'] = rect.y,
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['rowParam'] = {};
	options['rowParam']['alignHor_maxWidth'] = rect.width;
	options['rowParam']['alignVer_maxHeight'] = rect.height;
	if( DrillUp.g_SSpH_watch_setCorner == true ){
		options['rowParam']['alignHor_type'] = "right";	//（右下角）
		options['rowParam']['alignVer_type'] = "bottom";
	}
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = DrillUp.g_SSpH_watch_fontsize;
	
	// > 清空画布（这里在连续绘制选项，不要清空）
	//temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
};
//==============================
// * 2C已读情况 - 选项变化时
//
//			说明：	> 注意选项变化时，要传入上一次选项的索引。因为当前索引不算已读，上一次索引才算已读。
//==============================
Drill_SSpH_SelectWindow.prototype.drill_window_watchedChanged = function( last_index ){
	if( DrillUp.g_SSpH_watch_enabled != true ){ return; }
	
	var temp_data = $gameTemp._drill_SSpH_visibleContextDataList[ last_index ];	//（当前选项）
	if( temp_data == undefined ){ return; }
	var context_realIndex = temp_data['index'];
	
	// > 锁定则跳出
	if( $gameTemp.drill_SSpH_isLocked( context_realIndex ) == true ){ return; }
	
	// > 新标签 数据变化
	if( $gameTemp.drill_SSpH_isWatched( context_realIndex ) != true ){
		DrillUp.global_SSpH_watchedTank[ context_realIndex ] = true;
		$gameSystem._drill_SSpH_watchedTank[ context_realIndex ] = true;
		this.createContents();				//（强制重绘）
		this.drill_window_drawAllItem();	//（强制重绘）
	}
};

//==============================
// * 2D兼容 - mog菜单指针插件
//==============================
if( Imported.MOG_MenuCursor == true ){
	var _drill_SSpH_mog_set_mcursor_data = Drill_SSpH_SelectWindow.prototype.need_set_mcursor_data;
	Drill_SSpH_SelectWindow.prototype.need_set_mcursor_data = function() {
		if( DrillUp.g_SSpH_selWin_cursor['mog_enabled'] == false ){
			return false;
		}
		return _drill_SSpH_mog_set_mcursor_data.call(this);
	}
}
//==============================
// * 2D兼容 - mog菜单边框插件
//==============================
if( Imported.MOG_CursorBorder == true ){
	var _drill_SSpH_mog_createSprSelMenu = Drill_SSpH_SelectWindow.prototype.createSprSelMenu;
	Drill_SSpH_SelectWindow.prototype.createSprSelMenu = function() {
		if( DrillUp.g_SSpH_selWin_cursor['mog_borderEnabled'] == false ){
			return ;
		}
		_drill_SSpH_mog_createSprSelMenu.call(this);
	}
}
//==============================
// * 2D兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true ){
	Drill_SSpH_SelectWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SSpH_selWin_cursor['MCu_enabled'];
	}
	Drill_SSpH_SelectWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SSpH_selWin_cursor['MCu_lock'] == true ){
			return DrillUp.g_SSpH_selWin_cursor['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 2D兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true ){
	Drill_SSpH_SelectWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SSpH_selWin_cursor['MCB_rectEnabled'];
	}
	Drill_SSpH_SelectWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SSpH_selWin_cursor['MCB_enabled'];
	}
	Drill_SSpH_SelectWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SSpH_selWin_cursor['MCB_lock'] == true ){
			return DrillUp.g_SSpH_selWin_cursor['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 2D兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true ){
	Drill_SSpH_SelectWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SSpH_selWin_cursor['MSB_enabled'];
	}
	Drill_SSpH_SelectWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SSpH_selWin_cursor['MSB_lock'] == true ){
			return DrillUp.g_SSpH_selWin_cursor['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}


//==========================================================================================
// ** 显示窗口【Drill_SSpH_DescWindow】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个窗口，用于绘制段落文本。
// **		子功能：	
// **					->窗口
// **					->窗口行高
// **					->对齐方式
// **					->绘制文本
// **
// **		说明：	> 该插件专用。
//==========================================================================================
//==============================
// * 显示窗口 - 定义
//==============================
function Drill_SSpH_DescWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SSpH_DescWindow.prototype = Object.create(Window_Base.prototype);
Drill_SSpH_DescWindow.prototype.constructor = Drill_SSpH_DescWindow;
//==============================
// * 显示窗口 - 初始化
//==============================
Drill_SSpH_DescWindow.prototype.initialize = function( x, y, width, height ){
    Window_Base.prototype.initialize.call(this, x,y,width,height);
	//（无）
};
//==============================
// * 显示窗口 - 帧刷新
//==============================
Drill_SSpH_DescWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	//（无）
};
//==============================
// * 显示窗口 - 重绘内容
//==============================
Drill_SSpH_DescWindow.prototype.drill_refreshDescText = function( cur_index ){
	var temp_data = $gameTemp._drill_SSpH_visibleContextDataList[ cur_index ];	//（当前选项）
	if( temp_data == undefined ){ return; }
	
	// > 切换描述内容
	var context = "";
	if( $gameTemp.drill_SSpH_isLocked( temp_data['index'] ) == true && 
		(DrillUp.g_SSpH_locked_type == "锁定描述图和描述内容" || 
		 DrillUp.g_SSpH_locked_type == "只锁定描述内容" ) ){
		context = DrillUp.g_SSpH_locked_context;	//锁定内容
	}else{
		context = temp_data['context'];				//当前内容
	}
	
	// > 窗口行高
	var cur_lineHeight = 0;
	if( temp_data['context_lineheight_type'] == "默认补正" ){
		cur_lineHeight = 30;
	}
	if( temp_data['context_lineheight_type'] == "自定义补正" ){
		cur_lineHeight = temp_data['context_lineheight_custom'];
	}
	if( temp_data['context_lineheight_type'] == "锁定行高" ){
		cur_lineHeight = temp_data['context_lineheight_lock'];
	}
	if( temp_data['context_lineheight_type'] == "关闭行高控制" ){
		cur_lineHeight = 0;
	}
	
	// > 对齐方式
	var cur_align = "left";
	if( temp_data['context_align'] == "居中" ){ cur_align = "center"; }
	if( temp_data['context_align'] == "右对齐" ){ cur_align = "right"; }
	
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = context;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['blockParam'] = {};							//『自定义字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = cur_lineHeight;
	
	options['rowParam']['alignHor_type'] = cur_align;	//（对齐方式）
	
	// > 清空画布（固定高宽只需要清空）
	temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * 显示窗口 - 刷新内容 - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_SSpH_getPluginTip_NeedUpdate_drawText() );
}


//=============================================================================
// ** ☆流程锁定
//
//			说明：	> 此模块专门提供 流程锁定功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 流程锁定 - 判断 末尾选项
//==============================
Scene_Drill_SSpH.prototype.drill_isInEndPage = function() {
	return this._window_select.drill_isInEndPage();
}
//==============================
// * 流程锁定 - 判断 末尾选项
//==============================
Drill_SSpH_SelectWindow.prototype.drill_isInEndPage = function() {
	if( $gameSystem._drill_SSpH_end_page != 0 && $gameSystem._drill_SSpH_end_page <= this.maxItems() ){
		return this.index() == $gameSystem._drill_SSpH_end_page - 1;
	}
	return this.index() >= this.maxItems()-1 ;
}
//==============================
// * 流程锁定 - 退出键
//==============================
var _drill_SSpH_processCancel_1 = Drill_SSpH_SelectWindow.prototype.processCancel;
Drill_SSpH_SelectWindow.prototype.processCancel = function() {
	if( !this.drill_isInEndPage() ){		//非末尾选项，只翻页
		this.cursorRight();
		SoundManager.drill_SSpH_playClick_Arrow();
		return ;
	}
	_drill_SSpH_processCancel_1.call(this);
};
//==============================
// * 流程锁定 - 退出键 - 按键的声音
//==============================
var _drill_SSpH_processCancel_2 = Drill_SSpH_SelectWindow.prototype.processCancel;
Drill_SSpH_SelectWindow.prototype.processCancel = function() {
	$gameTemp._drill_SSpH_cancelSound = true;
	
	// > 原函数
	_drill_SSpH_processCancel_2.call(this);
	
	$gameTemp._drill_SSpH_cancelSound = undefined;
};
//==============================
// * 流程锁定 - 退出键 - 按键的声音（继承）
//==============================
var _drill_SSpH_playCancel = SoundManager.playCancel;
SoundManager.playCancel = function(){
	if( $gameTemp._drill_SSpH_cancelSound == true ){
		this.drill_SSpH_playClick_EndBtn();	//（结束按钮的点击声音）
		return;
	}
	
	// > 原函数
	_drill_SSpH_playCancel.call(this);
};
//==============================
// * 流程锁定 - 按键
//==============================
Drill_SSpH_SelectWindow.prototype.processCursorMove = function() {
	if( this.isCursorMovable() ){
		var lastIndex = this.index();
		if( Input.isRepeated('down') ){
			this.cursorDown(Input.isTriggered('down'));
		}
		if( Input.isRepeated('up') ){
			this.cursorUp(Input.isTriggered('up'));
		}
		if( Input.isRepeated('right') ){
			this.cursorRight(Input.isTriggered('right'));
		}
		if( Input.isRepeated('left') ){
			this.cursorLeft(Input.isTriggered('left'));
		}
		if( this.index() !== lastIndex ){
			SoundManager.drill_SSpH_playClick_Arrow();
		}
	}
};
//==============================
// * 流程锁定 - 按键屏蔽
//==============================
Drill_SSpH_SelectWindow.prototype.processPageup = function() {
    // 置空函数
};
Drill_SSpH_SelectWindow.prototype.processPagedown = function() {
    // 置空函数
};
//==============================
// * 流程锁定 - 末尾选项退出
//==============================
var _drill_SSpH_drill_createSelect = Scene_Drill_SSpH.prototype.drill_createSelect;
Scene_Drill_SSpH.prototype.drill_createSelect = function() {
	_drill_SSpH_drill_createSelect.call(this);
	this._window_select.setHandler('cancel', this.drill_quit.bind(this) );		//覆盖退出功能
}
Scene_Drill_SSpH.prototype.drill_quit = function() {
	if( !this.drill_isInEndPage() ){ return ; }
	this.popScene();
}
//==============================
// * 流程锁定 - 帧刷新 返回按钮控制
//==============================
Scene_Drill_SSpH.prototype.drill_updateBackBtnControl = function() { 
	if( this._drill_MBB_sprites_layer == undefined ){ return; }
	
	for(var i=0; i < this._drill_MBB_sprites_layer.length; i++){
		var temp_layer = this._drill_MBB_sprites_layer[i];
		temp_layer.visible = this.drill_isInEndPage();
	}
}

//==============================
// * 流程锁定 - 结束按钮 - 创建
//==============================
Scene_Drill_SSpH.prototype.drill_createEndButton = function() {
	
	// > 参数初始化
	this._end_isHover = false;			//是否高亮
	this._end_isLastHover = false;		//是否高亮（上一次的）
	
	this._end_button = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpH_end_src));
	this._end_button._org_x = DrillUp.g_SSpH_end_x ; 
	this._end_button._org_y = DrillUp.g_SSpH_end_y ;
	this._drill_field.addChild(this._end_button);	
}
//==============================
// * 流程锁定 - 结束按钮 - 帧刷新 贴图
//==============================
Scene_Drill_SSpH.prototype.drill_updateEndBtnSprite = function() {
	
	// > 位置
	this._end_button.x = this._end_button._org_x;
	this._end_button.y = this._end_button._org_y;
	this._end_button.anchor.x = 0.5;
	this._end_button.anchor.y = 0.5;
	this._end_button.visible = this.drill_isInEndPage();
	
	// > 高亮
	this._end_button.opacity = 180;
	if( this._end_isHover == true ){ this._end_button.opacity = 255; }
}
//==============================
// * 流程锁定 - 结束按钮 - 帧刷新 点击
//==============================
Scene_Drill_SSpH.prototype.drill_updateEndBtnTouch = function() {
    if( TouchInput.isTriggered() ){
		if( this._end_isHover == true ){
			SoundManager.drill_SSpH_playClick_EndBtn();
			this.popScene();
		}
	}
}
//==============================
// * 流程锁定 - 结束按钮 - 帧刷新 高亮
//==============================
Scene_Drill_SSpH.prototype.drill_updateEndBtnHover = function() {
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	this._end_isHover = this.drill_isOnHover(xx,yy,this._end_button);
}
//==============================
// * 流程锁定 - 结束按钮 - 帧刷新 上一次高亮
//==============================
Scene_Drill_SSpH.prototype.drill_updateEndBtnLastHover = function() {
	this._end_isLastHover = this._end_isHover;
}


//=============================================================================
// ** ☆按钮声音控制『音效模块』
//
//			说明：	> 此模块控制 按钮的声音。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 箭头 - 监听高亮声音
//==============================
var _drill_SSpH_drill_updateArrowHover = Scene_Drill_SSpH.prototype.drill_updateArrowHover;
Scene_Drill_SSpH.prototype.drill_updateArrowHover = function() {
	_drill_SSpH_drill_updateArrowHover.call(this);
	
	// > 切换高亮时
	if( this._arrow_hoverType != this._arrow_lastHoverType ){
		
		// > 如果是失去高亮，则不播放
		if( this._arrow_hoverType == 0 ){ return; }
		
		// > 播放声音
		SoundManager.drill_SSpH_playHover_Arrow();
	}
}
//==============================
// * 箭头 - 高亮声音
//==============================
SoundManager.drill_SSpH_playHover_Arrow = function() {
	if( DrillUp.g_SSpH_arrowClickDefaultEnabled == true ){
		//（不操作）
	}else{
		if( DrillUp.g_SSpH_arrowHoverSound != null ){
			AudioManager.playStaticSe( DrillUp.g_SSpH_arrowHoverSound );
		}
	}
}
//==============================
// * 箭头 - 点击声音
//==============================
SoundManager.drill_SSpH_playClick_Arrow = function() {
	if( DrillUp.g_SSpH_arrowClickDefaultEnabled == true ){
		SoundManager.playCursor();
	}else{
		if( DrillUp.g_SSpH_arrowClickSound != null ){
			AudioManager.playStaticSe( DrillUp.g_SSpH_arrowClickSound );
		}
	}
}

//==============================
// * 结束按钮 - 监听高亮声音
//==============================
var _drill_SSpH_drill_updateEndBtnHover = Scene_Drill_SSpH.prototype.drill_updateEndBtnHover;
Scene_Drill_SSpH.prototype.drill_updateEndBtnHover = function() {
	_drill_SSpH_drill_updateEndBtnHover.call(this);
	
	// > 切换高亮时
	if( this._end_isHover != this._end_isLastHover ){
		
		// > 如果是失去高亮，则不播放
		if( this._end_isHover == false ){ return; }
		
		// > 播放声音
		SoundManager.drill_SSpH_playHover_EndBtn();
	}
}
//==============================
// * 结束按钮 - 高亮声音
//==============================
SoundManager.drill_SSpH_playHover_EndBtn = function() {
	if( DrillUp.g_SSpH_endClickDefaultEnabled == true ){
		SoundManager.playCursor();
	}else{
		if( DrillUp.g_SSpH_endHoverSound != null ){
			AudioManager.playStaticSe( DrillUp.g_SSpH_endHoverSound );
		}
	}
}
//==============================
// * 结束按钮 - 点击声音
//==============================
SoundManager.drill_SSpH_playClick_EndBtn = function() {
	if( DrillUp.g_SSpH_endClickDefaultEnabled == true ){
		SoundManager.playOk();
	}else{
		if( DrillUp.g_SSpH_endClickSound != null ){
			AudioManager.playStaticSe( DrillUp.g_SSpH_endClickSound );
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneSelfplateH = false;
		var pluginTip = DrillUp.drill_SSpH_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

