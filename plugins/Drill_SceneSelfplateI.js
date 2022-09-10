//=============================================================================
// Drill_SceneSelfplateI.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        面板 - 全自定义信息面板I
 * @author Drill_up
 * 
 * @Drill_LE_param "内容-%d"
 * @Drill_LE_parentKey "---内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_SSpI_context_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_SceneSelfplateI +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的信息面板I。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心★★v1.3及以上★★
 *     必须基于该插件才能显示描述内容。
 *   - Drill_CoreOfSelectableButton 系统-按钮组核心
 *     必须基于该插件才能使用按钮组。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SSpI
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.若要开始上手设计，去看看 "17.主菜单 > 关于全自定义信息面板.docx"。
 * 结构：
 *   (1.插件包含：1个选项窗口 + 1个按钮组 + 1个文本描述窗口 + 1个描述图
 *      选项窗口中，每个选项都会改变 描述图和描述窗口 的内容。
 *      该插件比面板A只多了按钮组功能。
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
 * 设计：
 *   (1.你可以在面板中写任何东西，比如做成新手教学手册、历史书、怪物掉
 *      宝介绍、指示牌内容等。
 *   (2.描述图没有大小限制，你可以做成一个大框架/背景图/人物立绘/说明
 *      书等。切换选项，对应切换不同的描述图。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__self （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__self文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-整体布局           （默认为 信息面板I-整体布局）
 * 资源-锁定的描述图       （默认为 信息面板I-锁定描述图）
 * 选项窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 描述窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 
 * 内容1 资源-描述图片     （默认为 空）
 * 内容2 资源-描述图片     （默认为 空）
 * 内容3 资源-描述图片     （默认为 空）
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义信息面板，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>信息面板I : 打开面板
 *
 * 插件指令：>信息面板I : 显示选项 : 1
 * 插件指令：>信息面板I : 隐藏选项 : 1
 * 插件指令：>信息面板I : 显示全部
 * 插件指令：>信息面板I : 隐藏全部
 * 
 * 插件指令：>信息面板I : 锁定选项 : 1
 * 插件指令：>信息面板I : 解锁选项 : 1
 * 插件指令：>信息面板I : 锁定全部
 * 插件指令：>信息面板I : 解锁全部
 *
 * 1.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 选中页
 * 你可以控制选项窗口当前选中第N页。（选项有3个，表示有3页）
 * 
 * 插件指令：>信息面板I : 选中页 : N
 * 
 * 1.信息面板具有当前页记忆，如果你修改了一些选项，你需要用该指令
 *   设置一下当前选中页。
 * 2.不存在第0页，如果选中页大于页数，将选择最末尾的页。
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
 * 测试结果：   在菜单界面中，基本元素消耗为：【14.89ms】
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
 * 添加了 长文本选项 功能的支持。以及 菜单指针/边框 的控制关闭功能。
 * [v1.2]
 * 添加了drill指针的控制。
 * [v1.3]
 * 优化了全局存储的结构，减小了存储的数据容量。
 * 修复了设置 按钮贴图序列 时无效的bug。
 * [v1.4]
 * 大幅度修改了全局存储的文件存储结构。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 信息面板I-整体布局
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
 * @default 信息面板I
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
 * @default 信息面板I
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
 * @default 信息面板I-锁定描述图
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * 
 * @param ----选项----
 * @desc
 *
 * @param 选项模式
 * @parent ----选项----
 * @type select
 * @option 按钮组模式
 * @value 按钮组模式
 * @option 窗口模式
 * @value 窗口模式
 * @desc 选项的模式。
 * @default 按钮组模式
 * 
 * @param 选项按钮组
 * @parent ----选项----
 * @desc 选项模式为 按钮组模式 时，选项按钮组的配置数据。
 * @type struct<DrillCommandButton>
 * @default {"平移-按钮组 X":"80","平移-按钮组 Y":"30","按钮组样式":"5","---按钮贴图---":"","默认按钮贴图":"信息面板I-默认按钮","按钮贴图序列":"[]"}
 * 
 * @param 选项窗口
 * @parent ----选项----
 * @desc 选项模式为 窗口模式 时，选项窗口的配置数据。
 * @type struct<DrillSelectWindow>
 * @default {"选项窗口 X":"0","选项窗口 Y":"0","选项窗口宽度":"816","选项窗口高度":"80","选项窗口列数":"24","选项窗口对齐方式":"左对齐","选项窗口字体大小":"22","选项窗口移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"30\",\"移动延迟\":\"0\",\"---起点---\":\"\",\"坐标类型\":\"相对坐标\",\"起点-相对坐标 X\":\"-100\",\"起点-相对坐标 Y\":\"0\",\"起点-绝对坐标 X\":\"0\",\"起点-绝对坐标 Y\":\"0\"}","选项窗口布局":"{\"布局类型\":\"默认皮肤\",\"---单张背景贴图---\":\"\",\"资源-贴图\":\"信息面板I-选项窗口\",\"贴图位置修正 X\":\"0\",\"贴图位置修正 Y\":\"0\"}"}
 *
 * 
 * @param ----描述窗口----
 * @default 
 * 
 * @param 描述窗口 X
 * @parent ----描述窗口----
 * @desc 描述窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 285
 *
 * @param 描述窗口 Y
 * @parent ----描述窗口----
 * @desc 描述窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 100
 *
 * @param 描述窗口宽度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 510
 *
 * @param 描述窗口高度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 360
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
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"信息面板I-描述窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
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
 * @default 285
 *
 * @param 描述图 Y
 * @parent ----描述图----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 480
 * 
 * @param 描述图移动动画
 * @parent ----描述图----
 * @type struct<DrillWindowMoving>
 * @desc 描述图会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
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
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-2
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-3
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-4
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-5
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-6
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-7
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-8
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-9
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-10
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-11
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-12
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-13
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-14
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-15
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-16
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-17
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-18
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-19
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-20
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组21至40---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-21
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-22
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-23
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-24
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-25
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-26
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-27
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-28
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-29
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-30
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-31
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-32
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-33
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-34
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-35
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-36
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-37
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-38
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-39
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-40
 * @parent ---内容组21至40---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组41至60---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-41
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-42
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-43
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-44
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-45
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-46
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-47
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-48
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-49
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-50
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-51
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-52
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-53
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-54
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-55
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-56
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-57
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-58
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-59
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-60
 * @parent ---内容组41至60---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组61至80---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-61
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-62
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-63
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-64
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-65
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-66
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-67
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-68
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-69
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-70
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-71
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-72
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-73
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-74
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-75
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-76
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-77
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-78
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-79
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-80
 * @parent ---内容组61至80---
 * @type struct<DrillSSpI>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 */
/*~struct~DrillSSpI:
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
 *
 */
/*~struct~DrillSelectWindow:
 * 
 * @param 选项窗口 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 选项窗口 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 选项窗口宽度
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 816
 *
 * @param 选项窗口高度
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 80
 *
 * @param 选项窗口列数
 * @type number
 * @min 1
 * @desc 选项窗口的列数。
 * @default 4
 *
 * @param 每条选项高度
 * @type number
 * @min 1
 * @desc 每条选项的高度。（宽度无法调整，宽度固定根据 列数和窗口宽度 自适应。）
 * @default 36
 * 
 * @param 是否启用选项内容
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，每条选项将会显示长文本的选项内容。
 * @default false
 * 
 * @param 选项窗口对齐方式
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 选项文本的对齐方式。
 * @default 居中
 *
 * @param 选项窗口字体大小
 * @type number
 * @min 1
 * @desc 选项窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 * 
 * @param 选项窗口移动动画
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-100","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 选项窗口布局
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"信息面板I-选项窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 选项窗口指针与边框
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
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
/*~struct~DrillCommandButton:
 * 
 * @param 平移-按钮组 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 80
 * 
 * @param 平移-按钮组 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 30
 * 
 * @param 按钮组样式
 * @type number
 * @min 0
 * @desc 按钮组对应的样式配置，对应 按钮组核心 的样式id。
 * @default 1
 * 
 * @param ---按钮贴图---
 * @desc 
 * 
 * @param 默认按钮贴图
 * @parent ---按钮贴图---
 * @desc 默认按钮的图片资源。
 * @default 信息面板I-默认按钮
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 按钮贴图序列
 * @parent ---按钮贴图---
 * @desc 自定义按钮的图片资源，对应每个内容编号。
 * @default []
 * @require 1
 * @dir img/Menu__self/
 * @type file[]
 * 
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSpI（Scene_Selfplate_A）
//		临时全局变量	DrillUp.g_SSpI_xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_SSpI_context_list
//		全局存储变量	DrillUp.global_SSpI_enableTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	14.89ms
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
//					->描述图预加载
//
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SSpI
//				信息面板I
//				Drill_SceneSelfplateI
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
　　Imported.Drill_SceneSelfplateI = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateI');
	
	
	//==============================
	// * 变量获取 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SSpI_initMenuCursor = function( dataFrom ) {
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
	// * 变量获取 - 选项窗口参数
	//				（~struct~DrillSelectWindow）
	//==============================
	DrillUp.drill_SSpI_initCommandWindow = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["选项窗口 X"] || 0);
		data['y'] = Number( dataFrom["选项窗口 Y"] || 0);
		data['width'] = Number( dataFrom["选项窗口宽度"] || 100);
		data['height'] = Number( dataFrom["选项窗口高度"] || 100);
		data['col'] = Number( dataFrom["选项窗口列数"] || 1);
		data['itemHeight'] = Number( dataFrom["每条选项高度"] || 36);
		data['nameExEnabled'] = String( dataFrom["是否启用选项内容"] || "false") == "true";
		data['align'] = String( dataFrom["选项窗口对齐方式"] || "左对齐");
		data['fontsize'] = Number( dataFrom["选项窗口字体大小"] || 22);
		if( dataFrom["选项窗口移动动画"] != "" &&
			dataFrom["选项窗口移动动画"] != undefined ){
			var slideAnim = JSON.parse( dataFrom["选项窗口移动动画"] );
			data['slideMoveType'] = String( slideAnim["移动类型"] || "匀速移动");
			data['slideTime'] = Number( slideAnim["移动时长"] || 20);
			data['slideDelay'] = Number( slideAnim["移动延迟"] || 0);
			data['slidePosType'] = String( slideAnim["坐标类型"] || "相对坐标");
			data['slideX'] = Number( slideAnim["起点-相对坐标 X"] || -100);
			data['slideY'] = Number( slideAnim["起点-相对坐标 Y"] || 0);
			data['slideAbsoluteX'] = Number( slideAnim["起点-绝对坐标 X"] || 0);
			data['slideAbsoluteY'] = Number( slideAnim["起点-绝对坐标 Y"] || 0);
		}
		if( dataFrom["选项窗口布局"] != "" &&
			dataFrom["选项窗口布局"] != undefined ){
			var layout = JSON.parse( dataFrom["选项窗口布局"] );
			data['layoutType'] = String( layout["布局类型"] || "默认皮肤");
			data['layoutSrc'] = String( layout["资源-贴图"] || "");
			data['layoutSrcFile'] = "img/Menu__self/";
			data['layoutX'] = Number( layout["贴图位置修正 X"] || -100);
			data['layoutY'] = Number( layout["贴图位置修正 Y"] || 0);
		}
		if( dataFrom["选项窗口指针与边框"] != "" &&
			dataFrom["选项窗口指针与边框"] != undefined ){
			var cursor = JSON.parse( dataFrom["选项窗口指针与边框"] );
			data['cursor'] = DrillUp.drill_SSpI_initMenuCursor( cursor );
		}else{
			data['cursor'] = DrillUp.drill_SSpI_initMenuCursor( {} );
		}
		return data;
	}
	//==============================
	// * 变量获取 - 选项按钮组
	//				（~struct~DrillCommandButton）
	//==============================
	DrillUp.drill_SSpI_initCommandButton = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["平移-按钮组 X"] || 0);
		data['y'] = Number( dataFrom["平移-按钮组 Y"] || 0);
		data['style_id'] = Number( dataFrom["按钮组样式"] || 0);
		data['btn_constructor'] = "Window_Selectable";
		data['btn_src_file'] = "img/Menu__self/";
		data['btn_src_default'] = String( dataFrom["默认按钮贴图"] || "");
		if( dataFrom["按钮贴图序列"] != "" &&
			dataFrom["按钮贴图序列"] != undefined ){
			data['btn_src'] = JSON.parse( dataFrom["按钮贴图序列"] );
		}else{
			data['btn_src'] = [];
		}
		data['btn_srcKeyword'] = [];
		data['active_enableMouseOk'] = false;	//（鼠标ok点击 关闭）
		return data;
	}
	//==============================
	// * 变量获取 - 内容
	//				（~struct~DrillSSpI）
	//==============================
	DrillUp.drill_SSpI_initContext = function( dataFrom ) {
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
    DrillUp.g_SSpI_layout = String(DrillUp.parameters['资源-整体布局'] || "");
	DrillUp.g_SSpI_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.g_SSpI_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.g_SSpI_add_to_title = String(DrillUp.parameters['是否在标题窗口中显示'] || "false") === "true";	
    DrillUp.g_SSpI_title_name = String(DrillUp.parameters['标题窗口显示名'] || "");
	DrillUp.g_SSpI_title_data_global = String(DrillUp.parameters['数据是否全局存储'] || "false") === "true";	
    DrillUp.g_SSpI_title_data_fileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);	
	
	/*-----------------选项------------------*/
	DrillUp.g_SSpI_command_mode = String(DrillUp.parameters["选项模式"] || "按钮组模式");
	if( DrillUp.parameters["选项窗口"] != undefined &&
		DrillUp.parameters["选项窗口"] != "" ){
		var data = JSON.parse( DrillUp.parameters["选项窗口"] );
		DrillUp.g_SSpI_command_window = DrillUp.drill_SSpI_initCommandWindow( data );
	}else{
		DrillUp.g_SSpI_command_window = DrillUp.drill_SSpI_initCommandWindow( {} );
	}
	if( DrillUp.parameters["选项按钮组"] != undefined &&
		DrillUp.parameters["选项按钮组"] != "" ){
		var data = JSON.parse( DrillUp.parameters["选项按钮组"] );
		DrillUp.g_SSpI_command_button = DrillUp.drill_SSpI_initCommandButton( data );
	}else{
		DrillUp.g_SSpI_command_button = DrillUp.drill_SSpI_initCommandButton( {} );
	}

	/*-----------------描述窗口------------------*/
	DrillUp.g_SSpI_descWin_x = Number(DrillUp.parameters['描述窗口 X'] || 285);
	DrillUp.g_SSpI_descWin_y = Number(DrillUp.parameters['描述窗口 Y'] || 100);
	DrillUp.g_SSpI_descWin_width = Number(DrillUp.parameters['描述窗口宽度'] || 510);
	DrillUp.g_SSpI_descWin_height = Number(DrillUp.parameters['描述窗口高度'] || 360);
	DrillUp.g_SSpI_descWin_fontsize = Number(DrillUp.parameters['描述窗口字体大小'] || 22);
	DrillUp.g_SSpI_descWin_replay = String(DrillUp.parameters['是否重播描述窗口移动动画'] || "true") === "true";	
	if( DrillUp.parameters['描述窗口移动动画'] != undefined ){
		DrillUp.g_SSpI_descWin_slideAnim = JSON.parse( DrillUp.parameters['描述窗口移动动画'] );
		DrillUp.g_SSpI_descWin_slideAnim['slideMoveType'] = String(DrillUp.g_SSpI_descWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpI_descWin_slideAnim['slideTime'] = Number(DrillUp.g_SSpI_descWin_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpI_descWin_slideAnim['slideDelay'] = Number(DrillUp.g_SSpI_descWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpI_descWin_slideAnim['slidePosType'] = String(DrillUp.g_SSpI_descWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpI_descWin_slideAnim['slideX'] = Number(DrillUp.g_SSpI_descWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpI_descWin_slideAnim['slideY'] = Number(DrillUp.g_SSpI_descWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpI_descWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpI_descWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpI_descWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpI_descWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpI_descWin_slideAnim = {};
	}
	if( DrillUp.parameters['描述窗口布局'] != undefined ){
		DrillUp.g_SSpI_descWin_layout = JSON.parse( DrillUp.parameters['描述窗口布局'] );
		DrillUp.g_SSpI_descWin_layout['layoutType'] = String(DrillUp.g_SSpI_descWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSpI_descWin_layout['layoutSrc'] = String(DrillUp.g_SSpI_descWin_layout['资源-贴图'] || "");
		DrillUp.g_SSpI_descWin_layout['layoutSrcFile'] = "img/Menu__self/";
		DrillUp.g_SSpI_descWin_layout['layoutX'] = Number(DrillUp.g_SSpI_descWin_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSpI_descWin_layout['layoutY'] = Number(DrillUp.g_SSpI_descWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSpI_descWin_layout = {};
	}

	/*-----------------描述图------------------*/
	DrillUp.g_SSpI_descPic_x = Number(DrillUp.parameters['描述图 X'] || 285);
	DrillUp.g_SSpI_descPic_y = Number(DrillUp.parameters['描述图 Y'] || 480);
	DrillUp.g_SSpI_descPic_replay = String(DrillUp.parameters['是否重播描述图移动动画'] || "true") === "true";	
	DrillUp.g_SSpI_descPic_showInstant = String(DrillUp.parameters['是否瞬间显示描述图'] || "false") === "true";	
	if( DrillUp.parameters['描述图移动动画'] != undefined ){
		DrillUp.g_SSpI_descPic_slideAnim = JSON.parse( DrillUp.parameters['描述图移动动画'] );
		DrillUp.g_SSpI_descPic_slideAnim['slideMoveType'] = String(DrillUp.g_SSpI_descPic_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpI_descPic_slideAnim['slideTime'] = Number(DrillUp.g_SSpI_descPic_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpI_descPic_slideAnim['slideDelay'] = Number(DrillUp.g_SSpI_descPic_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpI_descPic_slideAnim['slidePosType'] = String(DrillUp.g_SSpI_descPic_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpI_descPic_slideAnim['slideX'] = Number(DrillUp.g_SSpI_descPic_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpI_descPic_slideAnim['slideY'] = Number(DrillUp.g_SSpI_descPic_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpI_descPic_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpI_descPic_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpI_descPic_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpI_descPic_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpI_descPic_slideAnim = {};
	}
	
	/*-----------------内容------------------*/
	DrillUp.g_SSpI_context_list_length = 80;
	DrillUp.g_SSpI_context_list = [];
	for( var i = 1; i <= DrillUp.g_SSpI_context_list_length ; i++ ){
		if( DrillUp.parameters['内容-' + String(i) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['内容-' + String(i)] );
			DrillUp.g_SSpI_context_list[i] = DrillUp.drill_SSpI_initContext( data );
			DrillUp.g_SSpI_context_list[i]['index'] = i;
		}else{
			DrillUp.g_SSpI_context_list[i] = null;
		}
	};
	
	/*-----------------锁定内容------------------*/
	DrillUp.g_SSpI_locked_name = String(DrillUp.parameters['用语-锁定的选项名'] || "");
	DrillUp.g_SSpI_locked_name = DrillUp.g_SSpI_locked_name.replace(/\\\\/g,"\\");
	DrillUp.g_SSpI_locked_context = String(DrillUp.parameters['用语-锁定的选项内容'] || "");
	DrillUp.g_SSpI_locked_context = DrillUp.g_SSpI_locked_context.substring(1,DrillUp.g_SSpI_locked_context.length-1);
	DrillUp.g_SSpI_locked_context = DrillUp.g_SSpI_locked_context.replace(/\\\\/g,"\\");
	DrillUp.g_SSpI_locked_context = DrillUp.g_SSpI_locked_context.split(/\\n/);
	DrillUp.g_SSpI_locked_type = String(DrillUp.parameters['内容锁定方式'] || "锁定描述图和描述内容");
	DrillUp.g_SSpI_locked_pic = String(DrillUp.parameters['资源-锁定的描述图'] || "");
	
	/*-----------------全局存储对象------------------*/
	DrillUp.global_SSpI_enableTank = null;
	DrillUp.global_SSpI_lockTank = null;
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave &&
	Imported.Drill_CoreOfWindowAuxiliary &&
	Imported.Drill_CoreOfSelectableButton ){
	
	
//=============================================================================
// ** 全局存储
//=============================================================================
//==============================
// * 全局 - 检查数据 - 显示情况
//==============================
DrillUp.drill_SSpI_gCheckData_enable = function(){
	for( var i = 1; i <= DrillUp.g_SSpI_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SSpI_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpI_enableTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpI_enableTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				DrillUp.global_SSpI_enableTank[i] = temp_c['enabled'];
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
DrillUp.drill_SSpI_gCheckData_lock = function(){
	for( var i = 1; i <= DrillUp.g_SSpI_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SSpI_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SSpI_lockTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				DrillUp.global_SSpI_lockTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				DrillUp.global_SSpI_lockTank[i] = temp_c['locked'];
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
	var global_fileId = DrillUp.g_SSpI_title_data_fileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "SSpI" );
	
	// > 显示情况
	if( DrillUp.global_SSpI_enableTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_enableTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpI_enableTank = data;
		DrillUp.drill_SSpI_gCheckData_enable();				//（检查时自动赋新值）
	}
	// > 锁定情况
	if( DrillUp.global_SSpI_lockTank == null ){	
		var data = global_data["global_lockTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SSpI_lockTank = data;
		DrillUp.drill_SSpI_gCheckData_lock();
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_SSpI_saveData = function(){
	var file_id = DrillUp.g_SSpI_title_data_fileId;
	var data = {};
	data["global_enableTank"] = DrillUp.global_SSpI_enableTank;
	data["global_lockTank"] = DrillUp.global_SSpI_lockTank;
	this.drill_COGS_saveData( file_id, "SSpI", data );
};



//=============================================================================
// ** 正常存储
//=============================================================================
//==============================
// * 正常 - 初始化
//==============================
var _drill_SSpI_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {	
	_drill_SSpI_sys_initialize.call(this);
	this._drill_SSpI_enableTank = [];				//显示情况
	this._drill_SSpI_lockTank = [];					//锁定情况
};
//==============================
// * 正常 - 检查数据
//==============================
Game_System.prototype.drill_SSpI_sysCheckData = function() {
	if( this._drill_SSpI_enableTank == null ){ this._drill_SSpI_enableTank = []; }
	if( this._drill_SSpI_lockTank == null   ){ this._drill_SSpI_lockTank = []; }
	
	for( var i = 1; i <= DrillUp.g_SSpI_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SSpI_context_list[i];
		
		// > 指定数据为空时
		if( this._drill_SSpI_enableTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				this._drill_SSpI_enableTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				this._drill_SSpI_enableTank[i] = temp_c['enabled'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
	for( var i = 1; i <= DrillUp.g_SSpI_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SSpI_context_list[i];
		if( temp_c == null ){ continue; }
		
		// > 指定数据为空时
		if( this._drill_SSpI_lockTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				this._drill_SSpI_lockTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				this._drill_SSpI_lockTank[i] = temp_c['locked'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
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
var _drill_SSpI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SSpI_pluginCommand.call(this, command, args);
	
	if( command === ">信息面板I" ){
		$gameSystem.drill_SSpI_sysCheckData();	//（初始化）
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SSpI);
			}
			if( type == "显示全部" ){
				for( var i = 1; i <= DrillUp.g_SSpI_context_list_length; i++){
					DrillUp.global_SSpI_enableTank[i] = true;			//全局存储
					$gameSystem._drill_SSpI_enableTank[i] = true;		//正常存储
				}
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "隐藏全部" ){
				for( var i = 1; i <= DrillUp.g_SSpI_context_list_length; i++){
					DrillUp.global_SSpI_enableTank[i] = false;			//全局存储
					$gameSystem._drill_SSpI_enableTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "锁定全部" ){
				for( var i = 1; i <= DrillUp.g_SSpI_context_list_length; i++){
					DrillUp.global_SSpI_lockTank[i] = true;				//全局存储
					$gameSystem._drill_SSpI_lockTank[i] = true;			//正常存储
				}
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "解锁全部" ){
				for( var i = 1; i <= DrillUp.g_SSpI_context_list_length; i++){
					DrillUp.global_SSpI_lockTank[i] = false;			//全局存储
					$gameSystem._drill_SSpI_lockTank[i] = false;		//正常存储
				}
				StorageManager.drill_SSpI_saveData();
			}
		}
	}
	if( command === ">信息面板I" ){
		$gameSystem.drill_SSpI_sysCheckData();	//（初始化）
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "显示选项" ){
				DrillUp.global_SSpI_enableTank[ Number(temp1) ] = true;			//全局存储
				$gameSystem._drill_SSpI_enableTank[ Number(temp1) ] = true;		//正常存储
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "隐藏选项" ){
				DrillUp.global_SSpI_enableTank[ Number(temp1) ] = false;		//全局存储
				$gameSystem._drill_SSpI_enableTank[ Number(temp1) ] = false;	//正常存储
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "锁定选项" ){
				DrillUp.global_SSpI_lockTank[ Number(temp1) ] = true;			//全局存储
				$gameSystem._drill_SSpI_lockTank[ Number(temp1) ] = true;		//正常存储
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "解锁选项" ){
				DrillUp.global_SSpI_lockTank[ Number(temp1) ] = false;			//全局存储
				$gameSystem._drill_SSpI_lockTank[ Number(temp1) ] = false;		//正常存储
				StorageManager.drill_SSpI_saveData();
			}
			if( type == "选中页" ){
				$gameSystem._drill_SSpI_context_index = Number(temp1) -1;
			}
		}
	}
	
};

//=============================================================================
// * Scene_Menu 主菜单按钮
//=============================================================================
var _drill_SSpI_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SSpI_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SSpI',   this.drill_SSpI_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SSpI_menuCommand = function() {
    SceneManager.push(Scene_Drill_SSpI);
};
var _drill_SSpI_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SSpI_addOriginalCommands.call(this);
	if( DrillUp.g_SSpI_add_to_menu ){
		this.addCommand(DrillUp.g_SSpI_menu_name, 'Drill_SSpI', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _drill_SSpI_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SSpI_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SSpI',  this.drill_SSpI_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SSpI_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SSpI);
};
var _drill_SSpI_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SSpI_title_makeCommandList.call(this);
	if( DrillUp.g_SSpI_add_to_title ){
		this.addCommand( DrillUp.g_SSpI_title_name ,'Drill_SSpI');
	}
};	

//=============================================================================
// * 临时数据
//=============================================================================
//==============================
// * 临时 - 初始化
//==============================
var _drill_SSpI_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_SSpI_temp_initialize.call(this);
	this._drill_SSpI_visibleList = [];			//可见的列表
};
//==============================
// * 临时 - 判断 锁定情况
//==============================
Game_Temp.prototype.drill_SSpI_isLocked = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpI_title_data_global == true ){
		if( DrillUp.global_SSpI_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpI_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}
//==============================
// * 临时 - 判断 显示情况
//==============================
Game_Temp.prototype.drill_SSpI_isEnabled = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SSpI_title_data_global == true ){
		if( DrillUp.global_SSpI_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SSpI_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}


//=============================================================================
// ** 信息面板I【Scene_Drill_SSpI】
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
//						->流程
//							->退出窗口（cancel键）
//			主要成员：
//						> ._window_select						选项窗口
//						> ._drill_SSpI_commandButtonSprite		按钮组贴图
//						> ._window_desc							描述窗口
//						> ._sprite_descPic						描述图片
//
//			说明：	> 只多了个按钮组
//=============================================================================
//==============================
// * 信息面板I - 定义
//==============================
function Scene_Drill_SSpI() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SSpI.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SSpI.prototype.constructor = Scene_Drill_SSpI;
//==============================
// * 信息面板I - 初始化
//==============================
Scene_Drill_SSpI.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._cur_index = -1;
	$gameSystem.drill_SSpI_sysCheckData();
};
//==============================
// * 信息面板I - 创建
//============================== 
Scene_Drill_SSpI.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);	//布局（先画，其图层都被放在后面）
	this.drill_createLayout();
	this.drill_createDescPic();
	this.drill_createSelect();
	this.drill_createCommandButton();
	this.drill_createDesc();
};
//==============================
// * 信息面板I - 帧刷新
//==============================
Scene_Drill_SSpI.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	// > 选项
	if( DrillUp.g_SSpI_command_mode == "按钮组模式" ){
		this._window_select.y = Graphics.boxHeight * 2;
	}
	if( DrillUp.g_SSpI_command_mode == "窗口模式" ){
		this._window_select.drill_COWA_CPD_update();
	}
	
	this._window_desc.drill_COWA_CPD_update();
	this.drill_updateDescPic();
	this.drill_updateIndex();
}

//==============================
// * 创建 - 整体布局
//==============================
Scene_Drill_SSpI.prototype.drill_createLayout = function() {
	this._drill_layout = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpI_layout));
	this._drill_field.addChild(this._drill_layout);	
};
//==============================
// * 创建 - 选项窗口
//==============================
Scene_Drill_SSpI.prototype.drill_createSelect = function() {
	var data = DrillUp.g_SSpI_command_window;	//（直接读取选项窗口中的项）
	
	this._window_select = new Drill_SSpI_SelectWindow(0, 0, 0, 0);
	this._window_select.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._window_select.refresh();
	this._window_select.drill_initSelect();
	
	this._window_select.setHandler('cancel',   this.popScene.bind(this));//绑定退出界面事件
	this.addChild(this._window_select);
};
//==============================
// * 创建 - 选项按钮组
//==============================
Scene_Drill_SSpI.prototype.drill_createCommandButton = function() {
	if( DrillUp.g_SSpI_command_mode != "按钮组模式" ){ return; }
	
	// > 准备按钮组参数
	var data_org = DrillUp.g_SSpI_command_button;
	var data_style = DrillUp.drill_COSB_getCopyedBtnData( data_org['style_id']-1 );	//深拷贝数据
	for(var key in data_org){
		data_style[ key ] = data_org[ key ];
	}
	
	// > 建立按钮组层
	var temp_sprite = new Drill_COSB_LayerSprite( data_style, this._window_select );
	this.addChild( temp_sprite );
	this._drill_SSpI_commandButtonSprite = temp_sprite;
};
//==============================
// * 创建 - 描述窗口
//==============================
Scene_Drill_SSpI.prototype.drill_createDesc = function() {
	var data = {
		"x": DrillUp.g_SSpI_descWin_x,
		"y": DrillUp.g_SSpI_descWin_y,
		"width": DrillUp.g_SSpI_descWin_width,
		"height": DrillUp.g_SSpI_descWin_height,
		"fontsize": DrillUp.g_SSpI_descWin_fontsize,
		
		"slideMoveType": DrillUp.g_SSpI_descWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpI_descWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpI_descWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpI_descWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpI_descWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpI_descWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpI_descWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpI_descWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSpI_descWin_layout['layoutType'],
		"layoutX": DrillUp.g_SSpI_descWin_layout['layoutX'],
		"layoutY": DrillUp.g_SSpI_descWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSpI_descWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSpI_descWin_layout['layoutSrcFile'],
	}
	this._window_desc = new Drill_SSpI_DescWindow(0, 0, 0, 0);
	this._window_desc.drill_COWA_changeParamData( data );		//辅助核心 - 控制窗口基本属性
	
	this.addChild(this._window_desc);
};
//==============================
// * 创建 - 描述图片
//==============================
Scene_Drill_SSpI.prototype.drill_createDescPic = function() {
	var data = {
		"x": DrillUp.g_SSpI_descPic_x,
		"y": DrillUp.g_SSpI_descPic_y,
		
		"slideMoveType": DrillUp.g_SSpI_descPic_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpI_descPic_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpI_descPic_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpI_descPic_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpI_descPic_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpI_descPic_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpI_descPic_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpI_descPic_slideAnim['slideAbsoluteY'],
	}
	this._sprite_descPic = new Sprite();
	this._sprite_descPic.drill_COWA_setButtonMove( data );		//辅助核心 - 控制按钮贴图基本属性
	this._drill_field.addChild(this._sprite_descPic);	
	
	this._sprite_descPic._drill_bitmaps = [];
};

//==============================
// * 信息面板I - 重设窗口起点（切换选项时）
//==============================
Scene_Drill_SSpI.prototype.drill_resetPosition = function() {
	
	// > 刷新描述窗口
	if( DrillUp.g_SSpI_descWin_replay ){
		this._window_desc.drill_COWA_CPD_resetMove();		//辅助核心 - 重播窗口动画
	}
	
	// > 刷新描述图
	if( DrillUp.g_SSpI_descPic_replay ){
		this._sprite_descPic.drill_COWA_SBM_resetMove();	//辅助核心 - 重播按钮贴图动画
	}
};
//==============================
// * 信息面板I - 描述图片刷新
//==============================
Scene_Drill_SSpI.prototype.drill_refreshDescPic = function( cur_index ) {
	var temp_list = $gameTemp._drill_SSpI_visibleList;		//可见项列表
	
	// > 资源预加载
	var src_tank = this._sprite_descPic._drill_bitmaps;	//资源bitmap容器
	if( src_tank.length == 0 ){
		src_tank[0] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpI_locked_pic);
		for( var i=0; i < temp_list.length; i++ ){
			var temp_c = temp_list[i];
			if( temp_c == null ){ continue; }
			if( temp_c == "" ){ continue; }
			
			var context_realIndex = temp_c['index'];
			src_tank[ i+1 ] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpI_context_list[ context_realIndex ]["pic"]);	
		}
		this._sprite_descPic._drill_bitmaps = src_tank;
	}
	
	// > 切换描述图
	var temp_c = temp_list[ cur_index ];					//当前选项
	var context_realIndex = temp_c['index'];
	
	if( $gameTemp.drill_SSpI_isLocked( context_realIndex ) == true && 
	   (DrillUp.g_SSpI_locked_type == "锁定描述图和描述内容" || 
		DrillUp.g_SSpI_locked_type == "只锁定描述图" ) ){
			
		this._sprite_descPic.bitmap = src_tank[ 0 ];			//锁定描述图
	}else{
		this._sprite_descPic.bitmap = src_tank[ cur_index+1 ];	//当前描述图
	}
	
	if( DrillUp.g_SSpI_descPic_showInstant == false ){
		this._sprite_descPic.opacity = 0;
	}
}
//==============================
// * 帧刷新 - 描述图片
//==============================
Scene_Drill_SSpI.prototype.drill_updateDescPic = function() {
	if( DrillUp.g_SSpI_descPic_showInstant == false ){
		this._sprite_descPic.opacity += 255/DrillUp.g_SSpI_descPic_slideAnim['slideTime'];
	}
}
//==============================
// * 帧刷新 - 窗口选项刷新
//==============================
Scene_Drill_SSpI.prototype.drill_updateIndex = function() {
	if( $gameSystem._drill_SSpI_context_index != undefined ){
		var temp = $gameSystem._drill_SSpI_context_index;
		$gameSystem._drill_SSpI_context_index = null;	//（激活后清空）
		if( temp < 0 ){ temp = 0; };
		if( temp > $gameTemp._drill_SSpI_visibleList.length -1 ){ temp = $gameTemp._drill_SSpI_visibleList.length -1; };
		this._window_select.select( temp );				//（设置选中页）
	}
	if( this._window_select._index == null || 
		this._window_select._index > $gameTemp._drill_SSpI_visibleList.length -1 ||
		this._window_select._index < 0){ this._window_select.select(0);}
	if( $gameTemp._drill_SSpI_visibleList.length == 0 ){ return };	//如果选项全部为空，强制选择第一个
	
	if( this._cur_index != this._window_select._index ){
		this._cur_index = this._window_select._index;
		this.drill_resetPosition();
		this._window_desc.drill_refreshDesc(this._cur_index);
		this.drill_refreshDescPic(this._cur_index);
	}
}



//==========================================================================================
// ** 选项窗口【Drill_SSpI_SelectWindow】
//
//==========================================================================================
//==============================
// * 选项窗口 - 定义
//==============================
function Drill_SSpI_SelectWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SSpI_SelectWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SSpI_SelectWindow.prototype.constructor = Drill_SSpI_SelectWindow;
Drill_SSpI_SelectWindow.lastTopRow = 0;
Drill_SSpI_SelectWindow.lastIndex  = 0;
//==============================
// * 选项窗口 - 初始化
//==============================
Drill_SSpI_SelectWindow.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.activate();
	this.drill_initSelect();
};

//==============================
// * 选项窗口 - 窗口数据
//==============================
Drill_SSpI_SelectWindow.prototype.maxCols = function() {
	return DrillUp.g_SSpI_command_window['col'] || 1;
};
Drill_SSpI_SelectWindow.prototype.maxItems = function() {
	return this._list ? this._list.length : 0;
};
Drill_SSpI_SelectWindow.prototype.itemHeight = function() {
	return DrillUp.g_SSpI_command_window['itemHeight'] || this.lineHeight();
};

//==============================
// * 选项窗口 - 帧刷新
//==============================
Drill_SSpI_SelectWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	//...（暂无）
};

//==============================
// * 选项窗口 - 重绘内容
//==============================
Drill_SSpI_SelectWindow.prototype.refresh = function() {
	$gameTemp._drill_SSpI_visibleList = [];
	this._drill_COSB_indexList = [];							// 按钮组核心 - 交错索引列表
	this._drill_COSB_windowSelectable_refreshing = true;		// 按钮组核心 - 刷新标记
	for(var i=1; i<= DrillUp.g_SSpI_context_list_length ;i++){
		var temp_c = DrillUp.g_SSpI_context_list[i];
		if( temp_c == null ){ continue; }
		
		if( $gameTemp.drill_SSpI_isEnabled( i ) == true ){
			$gameTemp._drill_SSpI_visibleList.push( temp_c );
			this._drill_COSB_indexList.push( i-1 );
		}
	}
	
	// > 待绘制的字符串
	this._list = [];
	for( var j=0; j< $gameTemp._drill_SSpI_visibleList.length ;j++ ){
		var temp_c = $gameTemp._drill_SSpI_visibleList[j];
		var context_realIndex = temp_c['index'];
		
		// > 选项锁定
		if( $gameTemp.drill_SSpI_isLocked( context_realIndex ) == true ){
			this._list.push( DrillUp.g_SSpI_locked_name );
			continue;
		}
		
		// > 长文本选项
		if( DrillUp.g_SSpI_command_window['nameExEnabled'] == true ){
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
Drill_SSpI_SelectWindow.prototype.drill_initSelect = function() {
	if( Drill_SSpI_SelectWindow.lastIndex >= this._list.length ){
		Drill_SSpI_SelectWindow.lastIndex = this._list.length-1;
	}
	this.setTopRow(Drill_SSpI_SelectWindow.lastTopRow);
	this.select(Drill_SSpI_SelectWindow.lastIndex);
}
//==============================
// * 选项窗口 - 绘制选项
//==============================
Drill_SSpI_SelectWindow.prototype.drawItem = function(index) {
    var name_str = this._list[index];
	var name_str_list = name_str.split(/\\n/);
	var rect = this.itemRectForText(index);
	
	// > 绘制内容
	var op = {
		"align":DrillUp.g_SSpI_command_window['align'],
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
Drill_SSpI_SelectWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Drill_SSpI_SelectWindow.lastTopRow = this.topRow();
	Drill_SSpI_SelectWindow.lastIndex = this.index();
};
//==============================
// * 选项窗口 - 兼容 - mog菜单指针插件
//==============================
if( Imported.MOG_MenuCursor == true ){
	var _drill_SSpI_mog_set_mcursor_data = Drill_SSpI_SelectWindow.prototype.need_set_mcursor_data;
	Drill_SSpI_SelectWindow.prototype.need_set_mcursor_data = function() {
		if( DrillUp.g_SSpI_command_window['cursor']['mog_enabled'] == false ){
			return false;
		}
		return _drill_SSpI_mog_set_mcursor_data.call(this);
	}
}
//==============================
// * 选项窗口 - 兼容 - mog菜单边框插件
//==============================
if( Imported.MOG_CursorBorder == true ){
	var _drill_SSpI_mog_createSprSelMenu = Drill_SSpI_SelectWindow.prototype.createSprSelMenu;
	Drill_SSpI_SelectWindow.prototype.createSprSelMenu = function() {
		if( DrillUp.g_SSpI_command_window['cursor']['mog_borderEnabled'] == false ){
			return ;
		}
		_drill_SSpI_mog_createSprSelMenu.call(this);
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true ){
	Drill_SSpI_SelectWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SSpI_command_window['cursor']['MCu_enabled'];
	}
	Drill_SSpI_SelectWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SSpI_command_window['cursor']['MCu_lock'] == true ){
			return DrillUp.g_SSpI_command_window['cursor']['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true ){
	Drill_SSpI_SelectWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SSpI_command_window['cursor']['MCB_rectEnabled'];
	}
	Drill_SSpI_SelectWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SSpI_command_window['cursor']['MCB_enabled'];
	}
	Drill_SSpI_SelectWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SSpI_command_window['cursor']['MCB_lock'] == true ){
			return DrillUp.g_SSpI_command_window['cursor']['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true ){
	Drill_SSpI_SelectWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SSpI_command_window['cursor']['MSB_enabled'];
	}
	Drill_SSpI_SelectWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SSpI_command_window['cursor']['MSB_lock'] == true ){
			return DrillUp.g_SSpI_command_window['cursor']['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}


//==========================================================================================
// ** 显示窗口【Drill_SSpI_DescWindow】
//
//==========================================================================================
//==============================
// * 显示窗口 - 定义
//==============================
function Drill_SSpI_DescWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SSpI_DescWindow.prototype = Object.create(Window_Base.prototype);
Drill_SSpI_DescWindow.prototype.constructor = Drill_SSpI_DescWindow;
//==============================
// * 显示窗口 - 初始化
//==============================
Drill_SSpI_DescWindow.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x,y,width,height);
	//...（暂无）
};
//==============================
// * 显示窗口 - 帧刷新
//==============================
Drill_SSpI_DescWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	//...（暂无）
};
//==============================
// * 显示窗口 - 重绘内容
//==============================
Drill_SSpI_DescWindow.prototype.drill_refreshDesc = function( cur_index ) {
	var temp_list = $gameTemp._drill_SSpI_visibleList;		//可见项列表
	var temp_c = temp_list[ cur_index ];					//当前选项
	
	// > 切换描述内容
	var context_list = "";
	var context_realIndex = temp_c['index'];
	
	if( $gameTemp.drill_SSpI_isLocked( context_realIndex ) == true && 
	   (DrillUp.g_SSpI_locked_type == "锁定描述图和描述内容" || 
		DrillUp.g_SSpI_locked_type == "只锁定描述内容" ) ){
			
		context_list = DrillUp.g_SSpI_locked_context;		//锁定内容
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


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneSelfplateI = false;
		alert(
			"【Drill_SceneSelfplateI.js 面板 - 全自定义信息面板I】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心" +
			"\n- Drill_CoreOfSelectableButton 系统-按钮组核心"
		);
}

