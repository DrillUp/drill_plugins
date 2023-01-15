//=============================================================================
// Drill_SceneGalleryB.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        面板 - 全自定义画廊B
 * @author Drill_up
 * 
 * @Drill_LE_param "内容-%d"
 * @Drill_LE_parentKey "---内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_SGaB_context_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_SceneGalleryB +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的画廊B。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput            系统-输入设备核心★★v1.5及以上★★
 *     必须基于该插件才能控制查看图片细节。
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
 *   该面板关键字为：Scene_Drill_SGaB
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.若要从零开始上手，去看看 "18.面板 > 关于全自定义画廊.docx"。
 * 结构：
 *   (1.插件包含：1个选项窗口 + 1个按钮组 + 1个文本描述窗口
 *       + 1个完成度窗口 + 1个缩略图 + 1个原图查看器
 *      选项窗口中，每个选项都会改变 缩略图和描述窗口 的内容。
 *      该画廊与 画廊A 一模一样。
 *   (2.窗口的布局规划没有限制，去了解下 "17.主菜单 > 窗口与布局.docx"。
 * 流程：
 *   (1.流程是程序内部无法改变的固定业务逻辑结构。
 *      插件具备两个固定流程，一般模式流程 和 单图模式流程。
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
 *   (3.注意，画廊具有当前页记忆，如果你修改了一些选项，你需要用插
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
 *   (1.该面板默认定义为一种可收集画的画廊面板。
 *      但由于该面板插件可复制很多个，所以你可以将画廊用于其它功能，
 *      比如只用图片查看器功能，做成可以看CG大图的剧情画册。
 *      或者 做成玩家行囊里的 大地图、世界地图 。
 *      具体去看看 "18.面板 > 关于全自定义画廊.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__picturegallery （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__picturegallery文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-整体布局           （默认为 画廊B-整体布局）
 * 资源-锁定的描述图       （默认为 画廊B-锁定描述图）
 * 选项窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 描述窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 
 * 内容1 资源-缩略图     （默认为 空）
 * 内容2 资源-缩略图     （默认为 空）
 * 内容3 资源-缩略图     （默认为 空）
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义画廊，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>画廊B : 打开面板
 * 插件指令：>画廊B : 打开面板(单图查看模式) : 内容[1]
 *
 * 插件指令：>画廊B : 显示选项 : 1
 * 插件指令：>画廊B : 隐藏选项 : 1
 * 插件指令：>画廊B : 显示全部
 * 插件指令：>画廊B : 隐藏全部
 * 
 * 插件指令：>画廊B : 锁定选项 : 1
 * 插件指令：>画廊B : 解锁选项 : 1
 * 插件指令：>画廊B : 锁定全部
 * 插件指令：>画廊B : 解锁全部
 *
 * 1.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 * 2.按照单图模式打开时，选定的内容是被强制播放的，不管是否隐藏，
 *   是否上锁，都会打开图片，并直接进入原图。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 选中页
 * 你可以控制选项窗口当前选中第N页。（选项有3个，表示有3页）
 * 
 * 插件指令：>画廊B : 选中页 : N
 * 
 * 1.画廊具有当前页记忆，如果你修改了一些选项，你需要用该指令
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
 * 时间复杂度： o(n^3)*o(场景元素) 每帧
 * 测试方法：   直接进入该画廊进行测试。
 * 测试结果：   在菜单界面中，基本元素消耗为：【20.64ms】
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
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 画廊的整体布局。
 * @default 画廊B-整体布局
 * @require 1
 * @dir img/Menu__picturegallery/
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
 * @default 画廊B
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
 * @default 画廊B
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
 * 
 * @param ----原图查看器----
 * @default 
 *
 * @param 原图显现时长
 * @parent ----原图查看器----
 * @type number
 * @min 1
 * @desc 原图显现或消失所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 资源-帮助图
 * @parent ----原图查看器----
 * @desc 画廊的帮助信息图，在玩家展开大图时显现。
 * @default 画廊B-帮助图
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 * 
 * @param 偏移-帮助图 X
 * @parent ----原图查看器----
 * @desc 帮助图的位置。x轴方向平移，单位像素。0为贴在正中心。
 * @default 0
 *
 * @param 偏移-帮助图 Y
 * @parent ----原图查看器----
 * @desc 帮助图的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 帮助图移动时长
 * @parent ----原图查看器----
 * @type number
 * @min 1
 * @desc 帮助图显现或消失所需的时间，单位帧。（1秒60帧）
 * @default 40
 *
 * @param 帮助图持续时间
 * @parent ----原图查看器----
 * @type number
 * @min 1
 * @desc 帮助图显现后，持续显示的时间，单位帧。（1秒60帧）
 * @default 180
 *
 * @param 单图模式时是否隐藏整体布局
 * @parent ----原图查看器----
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc true - 隐藏，false - 不隐藏
 * @default true
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
 * @default 窗口模式
 * 
 * @param 选项按钮组
 * @parent ----选项----
 * @desc 选项模式为 按钮组模式 时，选项按钮组的配置数据。
 * @type struct<DrillCommandButton>
 * @default {"平移-按钮组 X":"70","平移-按钮组 Y":"180","按钮组样式":"6","---按钮贴图---":"","默认按钮贴图":"画廊B-默认按钮","按钮贴图序列":"[]"}
 * 
 * @param 选项窗口
 * @parent ----选项----
 * @desc 选项模式为 窗口模式 时，选项窗口的配置数据。
 * @type struct<DrillSelectWindow>
 * @default {"选项窗口 X":"50","选项窗口 Y":"160","选项窗口宽度":"210","选项窗口高度":"360","选项窗口列数":"1","每条选项高度":"36","是否启用选项内容":"false","选项窗口对齐方式":"左对齐","选项窗口字体大小":"20","选项窗口移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"30\",\"移动延迟\":\"0\",\"---起点---\":\"\",\"坐标类型\":\"相对坐标\",\"起点-相对坐标 X\":\"-60\",\"起点-相对坐标 Y\":\"0\",\"起点-绝对坐标 X\":\"0\",\"起点-绝对坐标 Y\":\"0\"}","选项窗口布局":"{\"布局类型\":\"默认皮肤\",\"---单张背景贴图---\":\"\",\"资源-贴图\":\"画廊B-选项窗口\",\"贴图位置修正 X\":\"0\",\"贴图位置修正 Y\":\"0\"}","选项窗口指针与边框":"{}","是否启用选项小缩略图":"false","选项小缩略图缩放模式":"等比缩放"}
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
 * @default 420
 *
 * @param 描述窗口宽度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 450
 *
 * @param 描述窗口高度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 180
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
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 描述窗口布局
 * @parent ----描述窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"默认皮肤","---单张背景贴图---":"","资源-贴图":"","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 是否重播描述窗口移动动画
 * @parent ----描述窗口----
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播。切换选项时，重播描述窗口的移动动画。
 * @default true
 *
 * @param ----缩略图----
 * @default 
 * 
 * @param 缩略图 X
 * @parent ----缩略图----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 285
 *
 * @param 缩略图 Y
 * @parent ----缩略图----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 60
 *
 * @param 缩略图宽度
 * @parent ----缩略图----
 * @type number
 * @min 1
 * @desc 描述窗口的字体大小。图标无法根据字体大小变化。
 * @default 450
 *
 * @param 缩略图高度
 * @parent ----缩略图----
 * @type number
 * @min 1
 * @desc 描述窗口的字体大小。图标无法根据字体大小变化。
 * @default 340
 *
 * @param 缩略图缩放模式
 * @parent ----缩略图----
 * @type select
 * @option 等比缩放
 * @value 等比缩放
 * @option 拉伸缩放
 * @value 拉伸缩放
 * @desc 缩略图的缩放模式。
 * @default 等比缩放
 * 
 * @param 缩略图移动动画
 * @parent ----缩略图----
 * @type struct<DrillWindowMoving>
 * @desc 缩略图会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 是否重播缩略图移动动画
 * @parent ----缩略图----
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播。切换选项时，重播缩略图的移动动画。
 * @default true
 * 
 * @param 是否瞬间显示缩略图
 * @parent ----缩略图----
 * @type boolean
 * @on 瞬间显示
 * @off 渐变出现
 * @desc true - 瞬间显示，false - 渐变出现。
 * @default false
 *
 * 
 * @param ----完成度窗口----
 * @default 
 * 
 * @param 完成度窗口 X
 * @parent ----完成度窗口----
 * @desc 完成度窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 50
 *
 * @param 完成度窗口 Y
 * @parent ----完成度窗口----
 * @desc 完成度窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 530
 *
 * @param 完成度窗口宽度
 * @parent ----完成度窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 210
 *
 * @param 完成度窗口高度
 * @parent ----完成度窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 70
 *
 * @param 完成度窗口字体大小
 * @parent ----完成度窗口----
 * @type number
 * @min 1
 * @desc 完成度窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 完成度用语
 * @parent ----完成度窗口----
 * @desc 完成度窗口内容的用语。
 * @default 完成度：
 *
 * @param 完成度窗口移动动画
 * @parent ----完成度窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 完成度窗口布局
 * @parent ----完成度窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"默认皮肤","---单张背景贴图---":"","资源-贴图":"","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 *
 *
 * @param ----锁定内容----
 * @default 
 *
 * @param 内容锁定方式
 * @parent ----锁定内容----
 * @type select
 * @option 锁定缩略图和描述内容
 * @value 锁定缩略图和描述内容
 * @option 只锁定缩略图
 * @value 只锁定缩略图
 * @option 只锁定描述内容
 * @value 只锁定描述内容
 * @desc 内容锁定的方式。
 * @default 锁定缩略图和描述内容
 *
 * @param 用语-锁定的选项名
 * @parent ----锁定内容----
 * @desc 选项被锁定时，画廊显示的选项名。
 * @default \c[7]--未知图片--
 *
 * @param 用语-锁定的选项内容
 * @parent ----锁定内容----
 * @type note
 * @desc 选项被锁定时，画廊显示的内容。
 * @default "该图片的描述已被隐藏。"
 *
 * @param 资源-上锁的缩略图
 * @parent ----锁定内容----
 * @desc 选项被锁定时，画廊显示的缩略图。
 * @default 画廊B-上锁的缩略图
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
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
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-2
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-3
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-4
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-5
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-6
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-7
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-8
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-9
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-10
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-11
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-12
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-13
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-14
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-15
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-16
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-17
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-18
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-19
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-20
 * @parent ---内容组 1至20---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param ---内容组21至40---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-21
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-22
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-23
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-24
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-25
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-26
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-27
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-28
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-29
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-30
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-31
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-32
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-33
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-34
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-35
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-36
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-37
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-38
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-39
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-40
 * @parent ---内容组21至40---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param ---内容组41至60---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-41
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-42
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-43
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-44
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-45
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-46
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-47
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-48
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-49
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-50
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-51
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-52
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-53
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-54
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-55
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-56
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-57
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-58
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-59
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-60
 * @parent ---内容组41至60---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param ---内容组61至80---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-61
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-62
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-63
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-64
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-65
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-66
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-67
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-68
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-69
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-70
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-71
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-72
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-73
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-74
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-75
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-76
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-77
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-78
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-79
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 * @param 内容-80
 * @parent ---内容组61至80---
 * @type struct<DrillSGaB>
 * @desc 添加新的内容，每个选项对应 一个描述和一张画廊图片。
 * @default 
 *
 */
/*~struct~DrillSGaB:
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
 * @desc true - 显示，false - 隐藏，如果不显示，则该画的选项不会在界面中出现。
 * @default true
 *
 * @param 是否初始锁定
 * @parent ---选项内容---
 * @type boolean
 * @on 锁定
 * @off 解锁
 * @desc true - 锁定，false - 解锁，如果锁定，则该画的选项会在界面中出现，并且上锁。
 * @default false
 * 
 * @param 选项内容
 * @parent ---选项内容---
 * @type note
 * @desc 每个选项显示的长文本内容。（只有窗口模式有效，且需要启用 选项内容 。）
 * @default "长文本选项描述"
 *
 * @param ---画廊内容---
 * @default 
 *
 * @param 资源-画廊图片
 * @parent ---画廊内容---
 * @desc 该选项下的显示的画廊的图片。
 * @default 
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 * 
 * @param 画廊描述内容
 * @parent ---画廊内容---
 * @type note
 * @desc 该选项下的描述窗口显示的内容。
 * @default "没有描述"
 *
 * @param 画廊描述内容对齐方式
 * @parent ---画廊内容---
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
 * @param 画廊描述内容是否自适应行间距
 * @parent ---画廊内容---
 * @type boolean
 * @on 自适应
 * @off 固定行间距
 * @desc true - 自适应，false - 固定行间距
 * @default true
 *
 * @param 画廊描述内容固定行间距
 * @parent 画廊描述内容是否自适应行间距
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
 * @default 
 * @require 1
 * @dir img/Menu__picturegallery/
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
 * @default {"布局类型":"默认皮肤","---单张背景贴图---":"","资源-贴图":"","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 选项窗口指针与边框
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 * @param 是否启用选项小缩略图
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，每条选项将会小的缩略图。
 * @default false
 *
 * @param 选项小缩略图缩放模式
 * @parent 是否启用选项小缩略图
 * @type select
 * @option 等比缩放
 * @value 等比缩放
 * @option 拉伸缩放
 * @value 拉伸缩放
 * @desc 小缩略图的缩放模式。
 * @default 等比缩放
 * 
 * @param 是否涂黑小缩略图背景
 * @parent 是否启用选项小缩略图
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，每条选项的缩略图背景，将被涂黑。
 * @default false
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
 * @default 画廊B-默认按钮
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 *
 * @param 按钮贴图序列
 * @parent ---按钮贴图---
 * @desc 自定义按钮的图片资源，对应每个内容编号。
 * @default []
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file[]
 * 
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SGaB（Scene_Gallery_A）
//		临时全局变量	DrillUp.g_SGaB_xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_SGaB_context_list
//		全局存储变量	DrillUp.global_SGaB_enableTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(场景元素) 每帧
//		★性能测试因素	直接进入画廊进行测试。
//		★性能测试消耗	20.64ms（Scene_Drill_SGaB.prototype.update函数） 12.14ms（Scene_Drill_SGaB.prototype.drill_updateImgExpandHelp函数）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全自定义画廊：
//				->部件
//					->选项
//						->选项窗口模式
//							> 标准属性
//							> 选项图片（小图）
//						->按钮组模式
//							> 标准属性
//					->详细窗口
//					->完成度窗口
//					->缩略图（中图）
//						> 等比缩放
//						> 拉伸缩放
//						->点击缩略图进入查看器
//					->原图查看器
//						->原图（大图）
//							> 键盘移动
//							> 鼠标拖拽
//							> 自适应模式
//						->帮助图
//						->原图查看器窗口
//				->结构
//					->主菜单按钮
//					->标题选项
//					->全局存储
//					->选项显示
//					->选项锁定
//				->指令
//					->打开面板
//					->打开面板（单图查看模式）
//					->选中页
//				->特殊
//					->原图全部全加载
//			
//		★私有类如下：
//			* Scene_Drill_SGaB				画廊B
//			* Drill_SGaB_SelectWindow		选项窗口
//			* Drill_SGaB_DescWindow			显示窗口
//			* Drill_SGaB_CompletionWindow	完成度窗口
//			* Drill_SGaB_ImgExpandWindow	原图查看器窗口
//
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SGaB
//				画廊B
//				Drill_SceneGalleryB
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
　　Imported.Drill_SceneGalleryB = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneGalleryB');
	
	
	//==============================
	// * 变量获取 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SGaB_initMenuCursor = function( dataFrom ) {
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
	// * 变量获取 - 移动动画
	//				（~struct~DrillWindowMoving）
	//==============================
	DrillUp.drill_SGaB_initWindowMoving = function( dataFrom ) {
		var data = {};
		data['slideMoveType'] = String( dataFrom["移动类型"] || "匀速移动");
		data['slideTime'] = Number( dataFrom["移动时长"] || 20);
		data['slideDelay'] = Number( dataFrom["移动延迟"] || 0);
		data['slidePosType'] = String( dataFrom["坐标类型"] || "相对坐标");
		data['slideX'] = Number( dataFrom["起点-相对坐标 X"] || 0);
		data['slideY'] = Number( dataFrom["起点-相对坐标 Y"] || 0);
		data['slideAbsoluteX'] = Number( dataFrom["起点-绝对坐标 X"] || 0);
		data['slideAbsoluteY'] = Number( dataFrom["起点-绝对坐标 Y"] || 0);
		return data;
	}
	//==============================
	// * 变量获取 - 布局
	//				（~struct~DrillWindowLayout）
	//==============================
	DrillUp.drill_SGaB_initWindowLayout = function( dataFrom ) {
		var data = {};
		data['layoutType'] = String( dataFrom["布局类型"] || "默认皮肤");
		data['layoutSrc'] = String( dataFrom["资源-贴图"] || "");
		data['layoutSrcFile'] = "img/Menu__picturegallery/";
		data['layoutX'] = Number( dataFrom["贴图位置修正 X"] || 0);
		data['layoutY'] = Number( dataFrom["贴图位置修正 Y"] || 0);
		return data;
	}
	//==============================
	// * 变量获取 - 选项窗口参数
	//				（~struct~DrillSelectWindow）
	//==============================
	DrillUp.drill_SGaB_initCommandWindow = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["选项窗口 X"] || 50);
		data['y'] = Number( dataFrom["选项窗口 Y"] || 160);
		data['width'] = Number( dataFrom["选项窗口宽度"] || 210);
		data['height'] = Number( dataFrom["选项窗口高度"] || 360);
		data['col'] = Number( dataFrom["选项窗口列数"] || 1);
		data['itemHeight'] = Number( dataFrom["每条选项高度"] || 36);
		data['nameExEnabled'] = String( dataFrom["是否启用选项内容"] || "false") == "true";
		data['align'] = String( dataFrom["选项窗口对齐方式"] || "左对齐");
		data['fontsize'] = Number( dataFrom["选项窗口字体大小"] || 20);
		if( dataFrom["选项窗口移动动画"] != "" &&
			dataFrom["选项窗口移动动画"] != undefined ){
			var slideAnim = JSON.parse( dataFrom["选项窗口移动动画"] );
			var slideAnim_data = DrillUp.drill_SGaB_initWindowMoving( slideAnim );
			for(var key in slideAnim_data){		//（注意，这里的 移动动画参数 是平铺的）
				data[ key ] = slideAnim_data[ key ];
			}
		}
		if( dataFrom["选项窗口布局"] != "" &&
			dataFrom["选项窗口布局"] != undefined ){
			var layout = JSON.parse( dataFrom["选项窗口布局"] );
			var layout_data = DrillUp.drill_SGaB_initWindowLayout( layout );
			for(var key in layout_data){		//（注意，这里的 布局参数 是平铺的）
				data[ key ] = layout_data[ key ];
			}
		}
		if( dataFrom["选项窗口指针与边框"] != "" &&
			dataFrom["选项窗口指针与边框"] != undefined ){
			var cursor = JSON.parse( dataFrom["选项窗口指针与边框"] );
			data['cursor'] = DrillUp.drill_SGaB_initMenuCursor( cursor );
		}else{
			data['cursor'] = DrillUp.drill_SGaB_initMenuCursor( {} );
		}
		data['icon_enabled'] = String( dataFrom["是否启用选项小缩略图"] || "false") == "true";
		data['icon_mode'] = String( dataFrom["选项小缩略图缩放模式"] || "等比缩放");
		data['icon_black'] = String( dataFrom["是否涂黑小缩略图背景"] || "false") == "true";
		return data;
	}
	//==============================
	// * 变量获取 - 选项按钮组
	//				（~struct~DrillCommandButton）
	//==============================
	DrillUp.drill_SGaB_initCommandButton = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["平移-按钮组 X"] || 70);
		data['y'] = Number( dataFrom["平移-按钮组 Y"] || 180);
		data['style_id'] = Number( dataFrom["按钮组样式"] || 0);
		data['btn_constructor'] = "Window_Selectable";
		data['btn_src_file'] = "img/Menu__picturegallery/";
		data['btn_src_default'] = String( dataFrom["默认按钮贴图"] || "");
		if( dataFrom["按钮贴图序列"] != "" &&
			dataFrom["按钮贴图序列"] != undefined ){
			data['btn_src'] = JSON.parse( dataFrom["按钮贴图序列"] );
		}else{
			data['btn_src'] = [];
		}
		data['btn_srcKeyword'] = [];
		data['active_enableMouseOk'] = true;	//（鼠标ok点击 关闭）
		return data;
	}
	//==============================
	// * 变量获取 - 内容
	//				（~struct~DrillSGaB）
	//==============================
	DrillUp.drill_SGaB_initContext = function( dataFrom ) {
		var data = {};
		
		// > 选项名处理
		data['name'] = String( dataFrom["选项名"] || "" );
		
		// > 选项内容处理
		if( dataFrom["选项内容"] != "" &&
			dataFrom["选项内容"] != undefined ){
			data['nameEx'] = JSON.parse( dataFrom["选项内容"] );
		}else{
			data['nameEx'] = "";
		}
		
		// > 显示处理
		data['enabled'] = (dataFrom["是否初始显示"] || "false") == "true" ;
		
		// > 锁定处理
		data['locked'] = (dataFrom["是否初始锁定"] || "false") == "true" ;
		
		// > 画廊图片
		data['pic'] = (dataFrom["资源-画廊图片"] || "");
		
		// > 画廊描述内容处理
		if( dataFrom["画廊描述内容"] != "" &&
			dataFrom["画廊描述内容"] != undefined ){
			data['context'] = JSON.parse( dataFrom["画廊描述内容"] );
		}else{
			data['context'] = "";
		}
		data['contextAlign'] = String(dataFrom["画廊描述内容对齐方式"] || "左对齐");
		data['contextAutoLineheight'] = String(dataFrom["画廊描述内容是否自适应行间距"] || "true") === "true";	
		data['contextLineheight'] = Number(dataFrom["画廊描述内容固定行间距"] || 28);
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_SGaB_layout = String(DrillUp.parameters["资源-整体布局"] || "");
	DrillUp.g_SGaB_add_to_menu = String(DrillUp.parameters["是否添加到主菜单"] || "true") === "true";	
    DrillUp.g_SGaB_menu_name = String(DrillUp.parameters["主菜单显示名"] || "");
	DrillUp.g_SGaB_add_to_title = String(DrillUp.parameters["是否在标题窗口中显示"] || "false") === "true";	
    DrillUp.g_SGaB_title_name = String(DrillUp.parameters["标题窗口显示名"] || "");
	DrillUp.g_SGaB_title_data_global = String(DrillUp.parameters["数据是否全局存储"] || "false") === "true";	
    DrillUp.g_SGaB_title_data_fileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);	
	
	
	/*-----------------原图查看器------------------*/
	DrillUp.g_SGaB_imgExpandPic_slideTime = Number(DrillUp.parameters["原图显现时长"] || 20);
	DrillUp.g_SGaB_imgExpandHelp_src = String(DrillUp.parameters["资源-帮助图"] || "");
	DrillUp.g_SGaB_imgExpandHelp_x = Number(DrillUp.parameters["偏移-帮助图 X"] || 0);
	DrillUp.g_SGaB_imgExpandHelp_y = Number(DrillUp.parameters["偏移-帮助图 Y"] || 0);
	DrillUp.g_SGaB_imgExpandHelp_slideTime = Number(DrillUp.parameters["帮助图移动时长"] || 40);
	DrillUp.g_SGaB_imgExpandHelp_sustain = Number(DrillUp.parameters["帮助图持续时间"] || 180);
	DrillUp.g_SGaB_singlePicture_hide = String(DrillUp.parameters["单图模式时是否隐藏整体布局"] || "true") === "true";	
	
	
	/*-----------------选项------------------*/
	DrillUp.g_SGaB_command_mode = String(DrillUp.parameters["选项模式"] || "窗口模式");
	if( DrillUp.parameters["选项窗口"] != "" &&
		DrillUp.parameters["选项窗口"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["选项窗口"] );
		DrillUp.g_SGaB_command_window = DrillUp.drill_SGaB_initCommandWindow( data );
	}else{
		DrillUp.g_SGaB_command_window = DrillUp.drill_SGaB_initCommandWindow( {} );
	}
	if( DrillUp.parameters["选项按钮组"] != "" &&
		DrillUp.parameters["选项按钮组"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["选项按钮组"] );
		DrillUp.g_SGaB_command_button = DrillUp.drill_SGaB_initCommandButton( data );
	}else{
		DrillUp.g_SGaB_command_button = DrillUp.drill_SGaB_initCommandButton( {} );
	}

	/*-----------------描述窗口------------------*/
	DrillUp.g_SGaB_descWin_x = Number(DrillUp.parameters["描述窗口 X"] || 285);
	DrillUp.g_SGaB_descWin_y = Number(DrillUp.parameters["描述窗口 Y"] || 420);
	DrillUp.g_SGaB_descWin_width = Number(DrillUp.parameters["描述窗口宽度"] || 450);
	DrillUp.g_SGaB_descWin_height = Number(DrillUp.parameters["描述窗口高度"] || 180);
	DrillUp.g_SGaB_descWin_fontsize = Number(DrillUp.parameters["描述窗口字体大小"] || 22);
	DrillUp.g_SGaB_descWin_replay = String(DrillUp.parameters["是否重播描述窗口移动动画"] || "true") === "true";	
	if( DrillUp.parameters["描述窗口移动动画"] != "" &&
		DrillUp.parameters["描述窗口移动动画"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["描述窗口移动动画"] );
		DrillUp.g_SGaB_descWin_slideAnim = DrillUp.drill_SGaB_initWindowMoving( data );
	}else{
		DrillUp.g_SGaB_descWin_slideAnim = DrillUp.drill_SGaB_initWindowMoving( {} );
	}
	if( DrillUp.parameters["描述窗口布局"] != "" &&
		DrillUp.parameters["描述窗口布局"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["描述窗口布局"] );
		DrillUp.g_SGaB_descWin_layout = DrillUp.drill_SGaB_initWindowLayout( data );
	}else{
		DrillUp.g_SGaB_descWin_layout = DrillUp.drill_SGaB_initWindowLayout( {} );
	}

	/*-----------------缩略图------------------*/
	DrillUp.g_SGaB_Thumbnail_x = Number(DrillUp.parameters["缩略图 X"] || 285);
	DrillUp.g_SGaB_Thumbnail_y = Number(DrillUp.parameters["缩略图 Y"] || 60);
	DrillUp.g_SGaB_Thumbnail_width = Number(DrillUp.parameters["缩略图宽度"] || 450);
	DrillUp.g_SGaB_Thumbnail_height = Number(DrillUp.parameters["缩略图高度"] || 340);
	DrillUp.g_SGaB_Thumbnail_mode = String(DrillUp.parameters["缩略图缩放模式"] || "等比缩放");
	DrillUp.g_SGaB_Thumbnail_replay = String(DrillUp.parameters["是否重播缩略图移动动画"] || "true") === "true";	
	DrillUp.g_SGaB_Thumbnail_showInstant = String(DrillUp.parameters["是否瞬间显示缩略图"] || "false") === "true";	
	if( DrillUp.parameters["缩略图移动动画"] != "" &&
		DrillUp.parameters["缩略图移动动画"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["缩略图移动动画"] );
		DrillUp.g_SGaB_Thumbnail_slideAnim = DrillUp.drill_SGaB_initWindowMoving( data );
	}else{
		DrillUp.g_SGaB_Thumbnail_slideAnim = DrillUp.drill_SGaB_initWindowMoving( {} );
	}
	
	/*-----------------完成度窗口------------------*/
	DrillUp.g_SGaB_compWin_x = Number(DrillUp.parameters["完成度窗口 X"] || 50);
	DrillUp.g_SGaB_compWin_y = Number(DrillUp.parameters["完成度窗口 Y"] || 530);
	DrillUp.g_SGaB_compWin_width = Number(DrillUp.parameters["完成度窗口宽度"] || 210);
	DrillUp.g_SGaB_compWin_height = Number(DrillUp.parameters["完成度窗口高度"] || 70);
	DrillUp.g_SGaB_compWin_fontsize = Number(DrillUp.parameters["完成度窗口字体大小"] || 22);
	DrillUp.g_SGaB_compWin_word = String(DrillUp.parameters["完成度用语"] || "完成度：");
	if( DrillUp.parameters["完成度窗口移动动画"] != "" &&
		DrillUp.parameters["完成度窗口移动动画"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["完成度窗口移动动画"] );
		DrillUp.g_SGaB_compWin_slideAnim = DrillUp.drill_SGaB_initWindowMoving( data );
	}else{
		DrillUp.g_SGaB_compWin_slideAnim = DrillUp.drill_SGaB_initWindowMoving( {} );
	}
	if( DrillUp.parameters["完成度窗口布局"] != "" &&
		DrillUp.parameters["完成度窗口布局"] != undefined ){
		var data = JSON.parse( DrillUp.parameters["完成度窗口布局"] );
		DrillUp.g_SGaB_compWin_layout = DrillUp.drill_SGaB_initWindowLayout( data );
	}else{
		DrillUp.g_SGaB_compWin_layout = DrillUp.drill_SGaB_initWindowLayout( {} );
	}
	
	/*-----------------锁定内容------------------*/
	DrillUp.g_SGaB_locked_name = String(DrillUp.parameters["用语-锁定的选项名"] || "");
	DrillUp.g_SGaB_locked_name = DrillUp.g_SGaB_locked_name.replace(/\\\\/g,"\\");		//（消除单串字符"\\"过多情况）
	if( DrillUp.parameters["用语-锁定的选项内容"] != "" &&
		DrillUp.parameters["用语-锁定的选项内容"] != undefined ){
		DrillUp.g_SGaB_locked_context = JSON.parse( DrillUp.parameters["用语-锁定的选项内容"] );
	}else{
		DrillUp.g_SGaB_locked_context = "";
	}
	DrillUp.g_SGaB_locked_type = String(DrillUp.parameters["内容锁定方式"] || "锁定缩略图和描述内容");
	DrillUp.g_SGaB_locked_pic = String(DrillUp.parameters["资源-上锁的缩略图"] || "");
	
	/*-----------------内容------------------*/
	DrillUp.g_SGaB_context_list_length = 80;
	DrillUp.g_SGaB_context_list = [];
	for( var i = 1; i <= DrillUp.g_SGaB_context_list_length ; i++ ){
		if( DrillUp.parameters["内容-" + String(i) ] != "" &&
			DrillUp.parameters["内容-" + String(i) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["内容-" + String(i)] );
			DrillUp.g_SGaB_context_list[i] = DrillUp.drill_SGaB_initContext( data );
			DrillUp.g_SGaB_context_list[i]['index'] = i;
		}else{
			DrillUp.g_SGaB_context_list[i] = null;
		}
	};
	
	/*-----------------全局存储对象------------------*/
	DrillUp.global_SGaB_enableTank = null;
	DrillUp.global_SGaB_lockTank = null;
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfGlobalSave &&
	Imported.Drill_CoreOfWindowAuxiliary &&
	Imported.Drill_CoreOfSelectableButton ){
	
	
//=============================================================================
// ** 全局存储
//=============================================================================
//==============================
// * 全局 - 检查数据 - 显示情况
//==============================
DrillUp.drill_SGaB_gCheckData_enable = function(){
	for( var i = 1; i <= DrillUp.g_SGaB_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SGaB_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SGaB_enableTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				DrillUp.global_SGaB_enableTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				DrillUp.global_SGaB_enableTank[i] = temp_c['enabled'];
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
DrillUp.drill_SGaB_gCheckData_lock = function(){
	for( var i = 1; i <= DrillUp.g_SGaB_context_list_length ; i++ ){
		var temp_c = DrillUp.g_SGaB_context_list[i];
		
		// > 指定数据为空时
		if( DrillUp.global_SGaB_lockTank[i] == null ){
			if( temp_c == null ){		//（无内容配置，跳过）
				DrillUp.global_SGaB_lockTank[i] = null;
			}else{						//（有内容配置，初始化默认）
				DrillUp.global_SGaB_lockTank[i] = temp_c['locked'];
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
	var global_fileId = DrillUp.g_SGaB_title_data_fileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "SGaB" );
	
	// > 显示情况
	if( DrillUp.global_SGaB_enableTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_enableTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SGaB_enableTank = data;
		DrillUp.drill_SGaB_gCheckData_enable();				//（检查时自动赋新值）
	}
	// > 锁定情况
	if( DrillUp.global_SGaB_lockTank == null ){	
		var data = global_data["global_lockTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_SGaB_lockTank = data;
		DrillUp.drill_SGaB_gCheckData_lock();
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_SGaB_saveData = function(){
	var file_id = DrillUp.g_SGaB_title_data_fileId;
	var data = {};
	data["global_enableTank"] = DrillUp.global_SGaB_enableTank;
	data["global_lockTank"] = DrillUp.global_SGaB_lockTank;
	this.drill_COGS_saveData( file_id, "SGaB", data );
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SGaB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SGaB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SGaB_sys_initialize.call(this);
	this.drill_SGaB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SGaB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SGaB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SGaB_saveEnabled == true ){	
		$gameSystem.drill_SGaB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SGaB_initSysData();
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
Game_System.prototype.drill_SGaB_initSysData = function() {
	this.drill_SGaB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SGaB_checkSysData = function() {
	this.drill_SGaB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SGaB_initSysData_Private = function() {
	
	this._drill_SGaB_enableTank = [];				//显示情况
	this._drill_SGaB_lockTank = [];					//锁定情况
	for(var i = 0; i < DrillUp.g_SGaB_context_list.length; i++){
		var temp_data = DrillUp.g_SGaB_context_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SGaB_enableTank[i] = temp_data['enabled'];
		this._drill_SGaB_lockTank[i] = temp_data['locked'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SGaB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SGaB_enableTank == undefined ){
		this.drill_SGaB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_SGaB_context_list.length; i++ ){
		var temp_data = DrillUp.g_SGaB_context_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SGaB_enableTank[i] == undefined ){
				this._drill_SGaB_enableTank[i] = temp_data['enabled'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_SGaB_lockTank[i] == undefined ){
				this._drill_SGaB_lockTank[i] = temp_data['locked'];
			
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
ImageManager.load_MenuGallery = function(filename) {
    return this.loadBitmap('img/Menu__picturegallery/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_SGaB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SGaB_pluginCommand.call(this, command, args);
	if( command === ">画廊B" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SGaB);
			}
			if( type == "显示全部" ){
				for( var i = 1; i <= DrillUp.g_SGaB_context_list_length; i++){
					DrillUp.global_SGaB_enableTank[i] = true;			//全局存储
					$gameSystem._drill_SGaB_enableTank[i] = true;		//正常存储
				}
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "隐藏全部" ){
				for( var i = 1; i <= DrillUp.g_SGaB_context_list_length; i++){
					DrillUp.global_SGaB_enableTank[i] = false;			//全局存储
					$gameSystem._drill_SGaB_enableTank[i] = false;		//正常存储
				}
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "锁定全部" ){
				for( var i = 1; i <= DrillUp.g_SGaB_context_list_length; i++){
					DrillUp.global_SGaB_lockTank[i] = true;				//全局存储
					$gameSystem._drill_SGaB_lockTank[i] = true;			//正常存储
				}
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "解锁全部" ){
				for( var i = 1; i <= DrillUp.g_SGaB_context_list_length; i++){
					DrillUp.global_SGaB_lockTank[i] = false;			//全局存储
					$gameSystem._drill_SGaB_lockTank[i] = false;		//正常存储
				}
				StorageManager.drill_SGaB_saveData();
			}
		}
		
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "显示选项" ){
				DrillUp.global_SGaB_enableTank[ Number(temp1) ] = true;			//全局存储
				$gameSystem._drill_SGaB_enableTank[ Number(temp1) ] = true;		//正常存储
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "隐藏选项" ){
				DrillUp.global_SGaB_enableTank[ Number(temp1) ] = false;		//全局存储
				$gameSystem._drill_SGaB_enableTank[ Number(temp1) ] = false;	//正常存储
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "锁定选项" ){
				DrillUp.global_SGaB_lockTank[ Number(temp1) ] = true;			//全局存储
				$gameSystem._drill_SGaB_lockTank[ Number(temp1) ] = true;		//正常存储
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "解锁选项" ){
				DrillUp.global_SGaB_lockTank[ Number(temp1) ] = false;			//全局存储
				$gameSystem._drill_SGaB_lockTank[ Number(temp1) ] = false;		//正常存储
				StorageManager.drill_SGaB_saveData();
			}
			if( type == "选中页" ){
				$gameSystem._drill_SGaB_context_index = Number(temp1) -1;
			}
			if( type == "打开面板(单图查看模式)" ){
				temp1 = temp1.replace("内容[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameTemp._drill_SGaB_isSinglePictureMode = true;
				$gameTemp._drill_SGaB_isSinglePictureIndex = temp1;		//（不需要-1）
				SceneManager.push(Scene_Drill_SGaB);
			}
		}
	}
	
};

//=============================================================================
// * Scene_Menu 主菜单按钮
//=============================================================================
var _drill_SGaB_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SGaB_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SGaB',   this.drill_SGaB_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SGaB_menuCommand = function() {
    SceneManager.push(Scene_Drill_SGaB);
};
var _drill_SGaB_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SGaB_addOriginalCommands.call(this);
	if( DrillUp.g_SGaB_add_to_menu ){
		this.addCommand(DrillUp.g_SGaB_menu_name, 'Drill_SGaB', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _drill_SGaB_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SGaB_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SGaB',  this.drill_SGaB_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SGaB_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SGaB);
};
var _drill_SGaB_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SGaB_title_makeCommandList.call(this);
	if( DrillUp.g_SGaB_add_to_title ){
		this.addCommand( DrillUp.g_SGaB_title_name ,'Drill_SGaB');
	}
};	

//=============================================================================
// * 临时数据
//=============================================================================
//==============================
// * 临时 - 初始化
//==============================
var _drill_SGaB_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_SGaB_temp_initialize.call(this);
	
	this._drill_SGaB_isSinglePictureMode = false;	//单图查看模式（插件指令标记）
	this._drill_SGaB_isSinglePictureIndex = 0;		//单图id
	this._drill_SGaB_visibleDataList = [];			//可见的列表
};
//==============================
// * 临时 - 判断 锁定情况
//==============================
Game_Temp.prototype.drill_SGaB_isLocked = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SGaB_title_data_global == true ){
		if( DrillUp.global_SGaB_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SGaB_lockTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}
//==============================
// * 临时 - 判断 显示情况
//==============================
Game_Temp.prototype.drill_SGaB_isEnabled = function( context_realIndex ){
	
	// > 全局存储控制
	if( DrillUp.g_SGaB_title_data_global == true ){
		if( DrillUp.global_SGaB_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
		
	// > 正常存储控制
	}else{
		if( $gameSystem._drill_SGaB_enableTank[ context_realIndex ] == true ){
			return true;
		}else{
			return false;
		}
	}
}


//=============================================================================
// ** 画廊B【Scene_Drill_SGaB】
//
//			主功能：	画廊的基本功能。
//			子功能：
//						->基本功能
//							> 继承属性
//							> 初始化
//							> 创建
//							> 帧刷新
//							> 析构函数（关闭单图模式）
//						->选项变化
//							->重设窗口起点
//							->缩略图刷新
//							->（描述窗口刷新在自身中进行）
//						->流程
//							->退出窗口（cancel键）
//							->选项窗口按钮确认（ok键，进入大图）
//							->离开原图查看器（cancel键，离开大图）
//						->流程（单图模式）
//							->退出窗口（cancel键，直接从大图退出）
//			主要成员：
//						> ._window_select						选项窗口
//						> ._drill_SGaB_commandButtonSprite		按钮组贴图
//						> ._window_desc							描述窗口
//						> ._sprite_thumbnail					缩略图
//						> ._window_comp							完成度窗口
//						> ._window_imgExpand					原图查看器 窗口
//						> ._sprite_imgExpand_pic				原图查看器 贴图
//						> ._sprite_imgExpand_help				原图查看器 帮助贴图
//					
//			说明：	> 注意单图模式和非单图模式的流程情况。
//=============================================================================
//==============================
// * 画廊B - 定义
//==============================
function Scene_Drill_SGaB() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SGaB.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SGaB.prototype.constructor = Scene_Drill_SGaB;
//==============================
// * 画廊B - 初始化
//==============================
Scene_Drill_SGaB.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._cur_index = -1;
};
//==============================
// * 画廊B - 创建
//============================== 
Scene_Drill_SGaB.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

	// > 创建布局层（先画，其图层都被放在后面）
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);

	this.drill_loadAllSrc();				//创建 - 资源全加载
	this.drill_createLayout();				//创建 - 整体布局
	this.drill_createSelect();				//创建 - 选项窗口
	this.drill_createCommandButton();		//创建 - 选项按钮组
	this.drill_createDesc();				//创建 - 描述窗口
	this.drill_createThumbnail();			//创建 - 缩略图
	this.drill_createComp();				//创建 - 完成度窗口
	this.drill_createImgExpandSprite();		//创建 - 原图查看器贴图
	this.drill_createImgExpandHelp();		//创建 - 原图查看器帮助
	this.drill_createImgExpandWindow();		//创建 - 原图查看器窗口
	
	this.drill_createSinglePictureMode();	//创建 - 单图查看模式
};
//==============================
// * 画廊B - 帧刷新
//==============================
Scene_Drill_SGaB.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	// > 选项模式
	if( DrillUp.g_SGaB_command_mode == "按钮组模式" ){
		this._window_select.y = Graphics.boxHeight * 2;
	}
	if( DrillUp.g_SGaB_command_mode == "窗口模式" ){
		this._window_select.drill_COWA_CPD_update();
	}
	if( this._drill_needDelayRefreshSelectWindow == true &&
		this.drill_isAllBitmapLoaded() == true ){
		this._drill_needDelayRefreshSelectWindow = false;
		this._window_select.refresh();
	}
	
	this._window_desc.drill_COWA_CPD_update();	//帧刷新 - 描述窗口
	this.drill_updateThumbnail();				//帧刷新 - 缩略图
	this.drill_updateIndex();					//帧刷新 - 窗口选项
	this.drill_updateImgExpandSprite();			//帧刷新 - 原图查看器
	this.drill_updateImgExpandHelp();			//帧刷新 - 原图查看器帮助
	
	this.drill_updateSinglePictureMode();		//帧刷新 - 单图查看模式
}
//==============================
// * 画廊B - 析构函数
//==============================
Scene_Drill_SGaB.prototype.terminate = function() { 
	Scene_MenuBase.prototype.terminate.call(this);	
	$gameTemp._drill_SGaB_isSinglePictureMode = false;	//（关闭单图模式）
}

//==============================
// * 创建 - 资源全加载
//==============================
Scene_Drill_SGaB.prototype.drill_loadAllSrc = function() {
	this._drill_needDelayRefreshSelectWindow = true;
	this._drill_SGaB_bitmaps = [];
	for(var i=0; i < DrillUp.g_SGaB_context_list.length; i++){
		var data = DrillUp.g_SGaB_context_list[i];	//（直接一次性加载全部原图）
		if( data == null ){ continue; }
		this._drill_SGaB_bitmaps.push( ImageManager.load_MenuGallery(data['pic']) );
	}
};
//==============================
// * 判断 - 资源全加载
//==============================
Scene_Drill_SGaB.prototype.drill_isAllBitmapLoaded = function() {
	for(var i=0; i < this._drill_SGaB_bitmaps.length; i++){
		if( this._drill_SGaB_bitmaps[i].isReady() != true ){
			return false;
		}
	}
	return true;
};
//==============================
// * 创建 - 整体布局
//==============================
Scene_Drill_SGaB.prototype.drill_createLayout = function() {
	this._drill_layout = new Sprite(ImageManager.load_MenuGallery(DrillUp.g_SGaB_layout));

	// > 单图查看模式
	if( $gameTemp._drill_SGaB_isSinglePictureMode == true &&
		DrillUp.g_SGaB_singlePicture_hide == true ){
		//（单图模式则直接不添加）
	}else{
		this._drill_field.addChild(this._drill_layout);	
	}
};
//==============================
// * 创建 - 选项窗口
//==============================
Scene_Drill_SGaB.prototype.drill_createSelect = function() {
	var data = DrillUp.g_SGaB_command_window;	//（直接读取选项窗口中的项）
	
	this._window_select = new Drill_SGaB_SelectWindow(0, 0, 0, 0);
	this._window_select.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._window_select.refresh();
	this._window_select.drill_initSelect();
	
	this._window_select.setHandler('ok', this.drill_selectOk.bind(this));	//绑定确定选择选项
	this._window_select.setHandler('cancel', this.popScene.bind(this));		//绑定退出界面事件
	this.addChild(this._window_select);
};
//==============================
// * 创建 - 选项按钮组
//==============================
Scene_Drill_SGaB.prototype.drill_createCommandButton = function() {
	if( DrillUp.g_SGaB_command_mode != "按钮组模式" ){ return; }
	
	// > 准备按钮组参数
	var data_org = DrillUp.g_SGaB_command_button;
	var data_style = DrillUp.drill_COSB_getCopyedBtnData( data_org['style_id']-1 );	//深拷贝数据
	for(var key in data_org){
		data_style[ key ] = data_org[ key ];
	}
	
	// > 建立按钮组层
	var temp_sprite = new Drill_COSB_LayerSprite( data_style, this._window_select );
	this.addChild( temp_sprite );
	this._drill_SGaB_commandButtonSprite = temp_sprite;
};
//==============================
// * 创建 - 描述窗口
//==============================
Scene_Drill_SGaB.prototype.drill_createDesc = function() {
	var data = {
		"x": DrillUp.g_SGaB_descWin_x,
		"y": DrillUp.g_SGaB_descWin_y,
		"width": DrillUp.g_SGaB_descWin_width,
		"height": DrillUp.g_SGaB_descWin_height,
		"fontsize": DrillUp.g_SGaB_descWin_fontsize,
		
		"slideMoveType": DrillUp.g_SGaB_descWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SGaB_descWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SGaB_descWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SGaB_descWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SGaB_descWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SGaB_descWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SGaB_descWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SGaB_descWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SGaB_descWin_layout['layoutType'],
		"layoutX": DrillUp.g_SGaB_descWin_layout['layoutX'],
		"layoutY": DrillUp.g_SGaB_descWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SGaB_descWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SGaB_descWin_layout['layoutSrcFile'],
	}
	this._window_desc = new Drill_SGaB_DescWindow(0, 0, 0, 0);
	this._window_desc.drill_COWA_changeParamData( data );		//辅助核心 - 控制窗口基本属性
	
	this.addChild(this._window_desc);
};
//==============================
// * 创建 - 缩略图
//==============================
Scene_Drill_SGaB.prototype.drill_createThumbnail = function() {
	var data = {
		"x": DrillUp.g_SGaB_Thumbnail_x,
		"y": DrillUp.g_SGaB_Thumbnail_y,
		
		"slideMoveType": DrillUp.g_SGaB_Thumbnail_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SGaB_Thumbnail_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SGaB_Thumbnail_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SGaB_Thumbnail_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SGaB_Thumbnail_slideAnim['slideX'],
		"slideY": DrillUp.g_SGaB_Thumbnail_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SGaB_Thumbnail_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SGaB_Thumbnail_slideAnim['slideAbsoluteY'],
	}
	this._sprite_thumbnail = new Sprite();
	this._sprite_thumbnail.drill_COWA_setButtonMove( data );		//辅助核心 - 控制按钮贴图基本属性
	this._drill_field.addChild(this._sprite_thumbnail);	
	
	this._sprite_thumbnail._drill_bitmaps = [];
};
//==============================
// * 创建 - 完成度窗口
//==============================
Scene_Drill_SGaB.prototype.drill_createComp = function() {
	var data = {
		"x": DrillUp.g_SGaB_compWin_x,
		"y": DrillUp.g_SGaB_compWin_y,
		"width": DrillUp.g_SGaB_compWin_width,
		"height": DrillUp.g_SGaB_compWin_height,
		"fontsize": DrillUp.g_SGaB_compWin_fontsize,
		
		"slideMoveType": DrillUp.g_SGaB_compWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SGaB_compWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SGaB_compWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SGaB_compWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SGaB_compWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SGaB_compWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SGaB_compWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SGaB_compWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SGaB_compWin_layout['layoutType'],
		"layoutX": DrillUp.g_SGaB_compWin_layout['layoutX'],
		"layoutY": DrillUp.g_SGaB_compWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SGaB_compWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SGaB_compWin_layout['layoutSrcFile'],
	}
	this._window_comp = new Drill_SGaB_CompletionWindow(0, 0, 0, 0);
	this._window_comp.drill_COWA_changeParamData( data );		//辅助核心 - 控制窗口基本属性
	this._window_comp.drill_refresh();							//（绘制完成度信息）
	
	// > 单图查看模式
	if( $gameTemp._drill_SGaB_isSinglePictureMode == true ){
		//（单图模式则直接不添加）
	}else{
		this.addChild(this._window_comp);
	}
	
};
//==============================
// * 创建 - 原图查看器 窗口
//==============================
Scene_Drill_SGaB.prototype.drill_createImgExpandWindow = function() {
	
	this._window_imgExpand = new Drill_SGaB_ImgExpandWindow(0, 0, 0, 0);
	this._window_imgExpand.refresh();
	this._window_imgExpand.y = Graphics.boxHeight * 2;
	
	this._window_imgExpand.setHandler('cancel', this.drill_expandCancel.bind(this));	//绑定关闭原图查看器
	this.addChild(this._window_imgExpand);
};
//==============================
// * 创建 - 原图查看器 贴图
//==============================
Scene_Drill_SGaB.prototype.drill_createImgExpandSprite = function() {

	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite['cur_time'] = 0;		//（移动时间标记）
	this._sprite_imgExpand_pic = temp_sprite;
	this.addChild(this._sprite_imgExpand_pic);	
	this.drill_expandHoming();			//（归位）
	
	this._sprite_imgExpand_isInAdaptionMode = false;		//自适应模式
};
//==============================
// * 创建 - 原图查看器 帮助贴图
//==============================
Scene_Drill_SGaB.prototype.drill_createImgExpandHelp = function() {
	
	var temp_sprite = new Sprite();
	temp_sprite.x = Graphics.boxWidth * 0.5;
	temp_sprite.y = Graphics.boxHeight * 0;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0;
	temp_sprite.bitmap = ImageManager.load_MenuGallery( DrillUp.g_SGaB_imgExpandHelp_src );
	temp_sprite['cur_time'] = 0;		//（移动时间标记）
	temp_sprite['sustain_time'] = 0;	//（持续时间标记）
	this._sprite_imgExpand_help = temp_sprite;
	this.addChild(this._sprite_imgExpand_help);	
};
//==============================
// * 创建 - 单图查看模式
//==============================
Scene_Drill_SGaB.prototype.drill_createSinglePictureMode = function() {
	if( $gameTemp._drill_SGaB_isSinglePictureMode != true ){ return; }
	
	this.drill_selectOk();		//（强制走确认流程）
};


//==============================
// * 画廊B - 重设窗口起点（切换选项时）
//==============================
Scene_Drill_SGaB.prototype.drill_resetPosition = function() {
	
	// > 刷新描述窗口
	if( DrillUp.g_SGaB_descWin_replay ){
		this._window_desc.drill_COWA_CPD_resetMove();		//辅助核心 - 重播窗口动画
	}
	
	// > 刷新缩略图
	if( DrillUp.g_SGaB_Thumbnail_replay ){
		this._sprite_thumbnail.drill_COWA_SBM_resetMove();	//辅助核心 - 重播按钮贴图动画
	}
};
//==============================
// * 画廊B - 缩略图刷新
//==============================
Scene_Drill_SGaB.prototype.drill_refreshThumbnail = function( cur_index ) {
	var data_list = $gameTemp._drill_SGaB_visibleDataList;		//可见项列表
	
	// > 资源全加载
	var src_tank = this._sprite_thumbnail._drill_bitmaps;	//资源bitmap容器
	if( src_tank.length == 0 ){
		src_tank[0] = ImageManager.load_MenuGallery(DrillUp.g_SGaB_locked_pic);
		for( var i=0; i < data_list.length; i++ ){
			var data = data_list[i];
			if( data == null ){ continue; }
			if( data == "" ){ continue; }
			
			src_tank[ i+1 ] = ImageManager.load_MenuGallery( data['pic'] );	
		}
		this._sprite_thumbnail._drill_bitmaps = src_tank;
	}
	
	// > 切换缩略图
	var data = data_list[ cur_index ];					//当前选项
	var context_realIndex = data['index'];
	
	if( $gameTemp.drill_SGaB_isLocked( context_realIndex ) == true && 
	   (DrillUp.g_SGaB_locked_type == "锁定缩略图和描述内容" || 
		DrillUp.g_SGaB_locked_type == "只锁定缩略图" ) ){
			
		this._sprite_thumbnail.bitmap = src_tank[ 0 ];			//锁定缩略图
	}else{
		this._sprite_thumbnail.bitmap = src_tank[ cur_index+1 ];	//当前缩略图
	}
	
	// > 瞬间显示
	if( DrillUp.g_SGaB_Thumbnail_showInstant == false ){
		this._sprite_thumbnail.opacity = 0;
	}
}
//==============================
// * 画廊B流程 - 选项窗口按钮确认
//==============================
Scene_Drill_SGaB.prototype.drill_selectOk = function() {
	
	// > 获取选中的内容
	var temp_data = $gameTemp._drill_SGaB_visibleDataList[ this._window_select.index() ];
	if(!temp_data ){ 
		this._window_select.activate();
		this._window_imgExpand.deactivate();
		return; 
	}
	
	// > 锁定时，不允许执行
	var realIndex = temp_data['index'];
	if( $gameTemp.drill_SGaB_isLocked( realIndex ) == true ){
		SoundManager.playBuzzer();
		this._window_select.activate();
		this._window_imgExpand.deactivate();
		return;
	}
	
	// > 展开原图查看器
	this._window_select.deactivate(); 
	this._window_imgExpand.activate(); 
	
	// > 设置 原图
	this.drill_expandHoming();		//（归位）
	this._sprite_imgExpand_pic.bitmap = ImageManager.load_MenuGallery( temp_data['pic'] );	
	
	// > 帮助图 持续时间归零
	this._sprite_imgExpand_help['sustain_time'] = 0;
};
//==============================
// * 画廊B流程 - 原图居中归位
//==============================
Scene_Drill_SGaB.prototype.drill_expandHoming = function() {
	this._sprite_imgExpand_pic['dragging'] = false;				//（清理鼠标拖拽标记）
	this._sprite_imgExpand_pic['lastX'] = 0;
	this._sprite_imgExpand_pic['lastY'] = 0;
	this._sprite_imgExpand_pic['offsetX'] = 0;
	this._sprite_imgExpand_pic['offsetY'] = 0;
	this._sprite_imgExpand_pic.x = Graphics.boxWidth * 0.5;		//（位置居中）
	this._sprite_imgExpand_pic.y = Graphics.boxHeight * 0.5;
};
//==============================
// * 画廊B流程 - 离开原图查看器
//==============================
Scene_Drill_SGaB.prototype.drill_expandCancel = function() {
	
	// > 单图查看模式
	if( $gameTemp._drill_SGaB_isSinglePictureMode == true ){
		this.popScene();		//（离开界面）
		
	// > 一般模式
	}else{
		this._window_select.activate(); 	//（恢复选项窗口）
		this._window_imgExpand.deactivate();
	
	}
};


//==============================
// * 帧刷新 - 窗口选项
//==============================
Scene_Drill_SGaB.prototype.drill_updateIndex = function() {
	if( $gameSystem._drill_SGaB_context_index != undefined ){
		var temp = $gameSystem._drill_SGaB_context_index;
		$gameSystem._drill_SGaB_context_index = null;	//（激活后清空）
		if( temp < 0 ){ temp = 0; };
		if( temp > $gameTemp._drill_SGaB_visibleDataList.length -1 ){ temp = $gameTemp._drill_SGaB_visibleDataList.length -1; };
		this._window_select.select( temp );				//（设置选中页）
	}
	if( this._window_select._index == null || 
		this._window_select._index > $gameTemp._drill_SGaB_visibleDataList.length -1 ||
		this._window_select._index < 0){ this._window_select.select(0);}
	if( $gameTemp._drill_SGaB_visibleDataList.length == 0 ){ return };	//如果选项全部为空，强制选择第一个
	
	if( this._cur_index != this._window_select._index ){
		this._cur_index = this._window_select._index;
		this.drill_resetPosition();
		this._window_desc.drill_refreshDesc(this._cur_index);
		this.drill_refreshThumbnail(this._cur_index);
	}
}
//==============================
// * 帧刷新 - 缩略图
//==============================
Scene_Drill_SGaB.prototype.drill_updateThumbnail = function() {
	if( this._sprite_thumbnail.bitmap == undefined ){ return; }
	if( this._sprite_thumbnail.bitmap.isReady() == false ){ return; }
	
	// > 单图查看模式
	if( $gameTemp._drill_SGaB_isSinglePictureMode == true ){
		this._sprite_thumbnail.visible = false;		//（不显示）
		return;
	}
	
	// > 透明度
	if( DrillUp.g_SGaB_Thumbnail_showInstant == false ){
		this._sprite_thumbnail.opacity += 255/DrillUp.g_SGaB_Thumbnail_slideAnim['slideTime'];
	}
	
	// > 缩放控制
	var ww = this._sprite_thumbnail.bitmap.width;
	var hh = this._sprite_thumbnail.bitmap.height;
	var rxx = 0;
	var ryy = 0;
	if( DrillUp.g_SGaB_Thumbnail_mode == "等比缩放" ){
		var pw = DrillUp.g_SGaB_Thumbnail_width / ww;
		var ph = DrillUp.g_SGaB_Thumbnail_height / hh;
		if( pw > ph ){ pw = ph; }			
		this._sprite_thumbnail.scale.x = pw;
		this._sprite_thumbnail.scale.y = pw;
		rxx = (DrillUp.g_SGaB_Thumbnail_width - ww * pw)*0.5;
		ryy = (DrillUp.g_SGaB_Thumbnail_height - hh * pw)*0.5;
	}else{	//（拉伸缩放）
		var pw = DrillUp.g_SGaB_Thumbnail_width / ww;
		var ph = DrillUp.g_SGaB_Thumbnail_height / hh;
		this._sprite_thumbnail.scale.x = pw;
		this._sprite_thumbnail.scale.y = ph;
	}
	
	// > 位置控制
	this._sprite_thumbnail.x = DrillUp.g_SGaB_Thumbnail_x + rxx;
	this._sprite_thumbnail.y = DrillUp.g_SGaB_Thumbnail_y + ryy;
	
	// > 鼠标点击缩略图
	if( this._window_select.active == true &&
		TouchInput.drill_isLeftTriggerd() ){
		
		var pw = ww * this._sprite_thumbnail.scale.x;
		var ph = hh * this._sprite_thumbnail.scale.y;
		
		var _x = _drill_mouse_x;
		var _y = _drill_mouse_y;
		if( _x >= this._sprite_thumbnail.x - 10 &&
			_x <= this._sprite_thumbnail.x + pw + 10 &&
			_y >= this._sprite_thumbnail.y - 10 &&
			_y <= this._sprite_thumbnail.y + ph + 10 ){
			SoundManager.playOk();
			this.drill_selectOk();
		};
	}
}
//==============================
// * 帧刷新 - 原图查看器
//==============================
Scene_Drill_SGaB.prototype.drill_updateImgExpandSprite = function() {
	if( this._sprite_imgExpand_pic.bitmap == undefined ){ return; }
	if( this._sprite_imgExpand_pic.bitmap.isReady() == false ){ return; }
	var ww = this._sprite_imgExpand_pic.bitmap.width;	//（高宽获取）
	var hh = this._sprite_imgExpand_pic.bitmap.height;
	
	// > 移动时间
	if( this._window_imgExpand.active == true ){
		this._sprite_imgExpand_pic['cur_time'] += 1;
	}else{
		this._sprite_imgExpand_pic['cur_time'] -= 1;
	}
	this._sprite_imgExpand_pic['cur_time'] = this._sprite_imgExpand_pic['cur_time'].clamp( 0, DrillUp.g_SGaB_imgExpandHelp_slideTime );
	
	// > 透明度控制
	this._sprite_imgExpand_pic.opacity = 255 * this._sprite_imgExpand_pic['cur_time'] / DrillUp.g_SGaB_imgExpandPic_slideTime;
	
	
	// > 自适应模式 按键
	if( Input.isTriggered('pagedown') || TouchInput.drill_isMiddleTriggerd() ){
		this._sprite_imgExpand_isInAdaptionMode = !this._sprite_imgExpand_isInAdaptionMode;
		SoundManager.playOk();
	}
	
	// > 自适应模式 缩放固定
	if( this._sprite_imgExpand_isInAdaptionMode == true ){
		this.drill_expandHoming();		//（归位）
		var sx = Graphics.boxWidth / ww;
		var sy = Graphics.boxHeight / hh;
		if( sx > sy ){ sx = sy; }			
		if( sx < 1 ){
			this._sprite_imgExpand_pic.scale.x = sx;
			this._sprite_imgExpand_pic.scale.y = sx;
		}else{
			this._sprite_imgExpand_pic.scale.x = 1.0;
			this._sprite_imgExpand_pic.scale.y = 1.0;
		}
		return;
	}else{
		this._sprite_imgExpand_pic.scale.x = 1.0;
		this._sprite_imgExpand_pic.scale.y = 1.0;
	}
	
	
	// > 位置控制
	var xx = Graphics.boxWidth * 0.5;
	var yy = Graphics.boxHeight * 0.5;
	
	// > 位置控制 键盘（逻辑按键）
	if( Input.isPressed('up') ){
		this._sprite_imgExpand_pic['offsetY'] += 5;
	}
	if( Input.isPressed('down') ){
		this._sprite_imgExpand_pic['offsetY'] -= 5;
	}
	if( Input.isPressed('left') ){
		this._sprite_imgExpand_pic['offsetX'] += 5;
	}
	if( Input.isPressed('right') ){
		this._sprite_imgExpand_pic['offsetX'] -= 5;
	}
	
	// > 位置控制 鼠标
	var diffX = _drill_mouse_x - this._sprite_imgExpand_pic['lastX'];
	var diffY = _drill_mouse_y - this._sprite_imgExpand_pic['lastY'];
	if( TouchInput.drill_isLeftReleased() ){
		this._sprite_imgExpand_pic['dragging'] = false;
		this._sprite_imgExpand_pic['lastX'] = 0;
		this._sprite_imgExpand_pic['lastY'] = 0;
		this._sprite_imgExpand_pic['offsetX'] += diffX;
		this._sprite_imgExpand_pic['offsetY'] += diffY;
	}
	
	// > 位置控制 不能跨边界（offsetX）
	var bww = (ww - Graphics.boxWidth)*0.5;
	var bhh = (hh - Graphics.boxHeight)*0.5;
	this._sprite_imgExpand_pic['offsetX'] = this._sprite_imgExpand_pic['offsetX'].clamp( -1*bww, bww );
	this._sprite_imgExpand_pic['offsetY'] = this._sprite_imgExpand_pic['offsetY'].clamp( -1*bhh, bhh );
	
	// > 位置控制 不能跨边界（拖拽时）
	if( this._sprite_imgExpand_pic['dragging'] == true ){
		var dx = diffX + this._sprite_imgExpand_pic['offsetX'];
		var dy = diffY + this._sprite_imgExpand_pic['offsetY'];
		dx = dx.clamp( -1*bww, bww );
		dy = dy.clamp( -1*bhh, bhh );
		xx += dx;
		yy += dy;
	}else{
		xx += this._sprite_imgExpand_pic['offsetX'];
		yy += this._sprite_imgExpand_pic['offsetY'];
	}
	
	// > 位置控制 赋值
	this._sprite_imgExpand_pic.x = xx;
	this._sprite_imgExpand_pic.y = yy;
	
	// > 位置控制 鼠标（按下时记录拖拽点）
	if( TouchInput.drill_isLeftTriggerd() ){
		this._sprite_imgExpand_pic['dragging'] = true;
		this._sprite_imgExpand_pic['lastX'] = _drill_mouse_x;
		this._sprite_imgExpand_pic['lastY'] = _drill_mouse_y;
	}
}
//==============================
// * 帧刷新 - 原图查看器 帮助图
//==============================
Scene_Drill_SGaB.prototype.drill_updateImgExpandHelp = function() {
	if( this._sprite_imgExpand_help.bitmap == undefined ){ return; }
	if( this._sprite_imgExpand_help.bitmap.isReady() == false ){ return; }
	
	// > 移动时间
	if( this._window_imgExpand.active == true &&
		this._sprite_imgExpand_help['sustain_time'] < DrillUp.g_SGaB_imgExpandHelp_sustain ){
		this._sprite_imgExpand_help['cur_time'] += 1;
	}else{
		this._sprite_imgExpand_help['cur_time'] -= 1;
	}
	this._sprite_imgExpand_help['cur_time'] = this._sprite_imgExpand_help['cur_time'].clamp( 0, DrillUp.g_SGaB_imgExpandHelp_slideTime );
	
	// > 持续时间
	if( this._sprite_imgExpand_help['cur_time'] == DrillUp.g_SGaB_imgExpandHelp_slideTime ){
		this._sprite_imgExpand_help['sustain_time'] += 1;
	}
	if( this._sprite_imgExpand_help['sustain_time'] > 0 ){
		this._sprite_imgExpand_help['sustain_time'] += 1;
	}
	
	// > 透明度控制
	this._sprite_imgExpand_help.opacity = 255 * this._sprite_imgExpand_help['cur_time'] / DrillUp.g_SGaB_imgExpandHelp_slideTime;
	
	// > 位置控制
	var xx = Graphics.boxWidth * 0.5;
	var yy = 0;
	var hh = this._sprite_imgExpand_help.bitmap.height;
	xx += DrillUp.g_SGaB_imgExpandHelp_x;
	yy += DrillUp.g_SGaB_imgExpandHelp_y;
	yy -= hh;		//（从上方下滑动画）
	yy += hh * this._sprite_imgExpand_help['cur_time'] / DrillUp.g_SGaB_imgExpandHelp_slideTime;
	this._sprite_imgExpand_help.x = xx;
	this._sprite_imgExpand_help.y = yy;
}
//==============================
// * 帧刷新 - 单图查看模式
//==============================
Scene_Drill_SGaB.prototype.drill_updateSinglePictureMode = function() {
	if( $gameTemp._drill_SGaB_isSinglePictureMode != true ){ return; }
	
	this._window_select.y = Graphics.boxHeight * 2;
	this._window_desc.y = Graphics.boxHeight * 2;
}


//==========================================================================================
// ** 选项窗口【Drill_SGaB_SelectWindow】
//
//==========================================================================================
//==============================
// * 选项窗口 - 定义
//==============================
function Drill_SGaB_SelectWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SGaB_SelectWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SGaB_SelectWindow.prototype.constructor = Drill_SGaB_SelectWindow;
Drill_SGaB_SelectWindow.lastTopRow = 0;
Drill_SGaB_SelectWindow.lastIndex  = 0;
//==============================
// * 选项窗口 - 初始化
//==============================
Drill_SGaB_SelectWindow.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.activate();
	this.drill_initSelect();
};

//==============================
// * 选项窗口 - 窗口数据
//==============================
Drill_SGaB_SelectWindow.prototype.maxCols = function() {
	return DrillUp.g_SGaB_command_window['col'] || 1;
};
Drill_SGaB_SelectWindow.prototype.maxItems = function() {
	return this._list ? this._list.length : 0;
};
Drill_SGaB_SelectWindow.prototype.itemHeight = function() {
	return DrillUp.g_SGaB_command_window['itemHeight'] || this.lineHeight();
};

//==============================
// * 选项窗口 - 帧刷新
//==============================
Drill_SGaB_SelectWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	//...（暂无）
};

//==============================
// * 选项窗口 - 重绘内容
//==============================
Drill_SGaB_SelectWindow.prototype.refresh = function() {
	
	// > 单图查看模式
	if( $gameTemp._drill_SGaB_isSinglePictureMode == true ){
		$gameTemp._drill_SGaB_visibleDataList = [];
		this._drill_COSB_indexList = [];							// 按钮组核心 - 交错索引列表
		this._drill_COSB_windowSelectable_refreshing = true;		// 按钮组核心 - 刷新标记
		
		var index = $gameTemp._drill_SGaB_isSinglePictureIndex;
		$gameTemp._drill_SGaB_visibleDataList.push( DrillUp.g_SGaB_context_list[index] );
		this._drill_COSB_indexList.push( index-1 );
		
		this._list = [""];
		this.createContents();
		this.drawAllItems();	//绘制选项内容
		
		
	// > 一般模式
	}else{
		$gameTemp._drill_SGaB_visibleDataList = [];
		this._drill_COSB_indexList = [];							// 按钮组核心 - 交错索引列表
		this._drill_COSB_windowSelectable_refreshing = true;		// 按钮组核心 - 刷新标记
		for(var i=1; i<= DrillUp.g_SGaB_context_list_length ;i++){
			var temp_c = DrillUp.g_SGaB_context_list[i];
			if( temp_c == null ){ continue; }
			
			if( $gameTemp.drill_SGaB_isEnabled( i ) == true ){
				$gameTemp._drill_SGaB_visibleDataList.push( temp_c );
				this._drill_COSB_indexList.push( i-1 );
			}
		}
		
		// > 待绘制的字符串
		this._list = [];
		for( var j=0; j< $gameTemp._drill_SGaB_visibleDataList.length ;j++ ){
			var temp_c = $gameTemp._drill_SGaB_visibleDataList[j];
			var context_realIndex = temp_c['index'];
			
			// > 选项锁定
			if( $gameTemp.drill_SGaB_isLocked( context_realIndex ) == true ){
				this._list.push( DrillUp.g_SGaB_locked_name );
				continue;
			}
			
			// > 长文本选项
			if( DrillUp.g_SGaB_command_window['nameExEnabled'] == true ){
				this._list.push( temp_c['nameEx'] );
				continue;
			}
			
			this._list.push( temp_c['name'] );
		}
		
		this.createContents();
		this.drawAllItems();	//绘制选项内容
	}
};
//==============================
// * 选项窗口 - 设置选项
//==============================
Drill_SGaB_SelectWindow.prototype.drill_initSelect = function() {
	if( Drill_SGaB_SelectWindow.lastIndex >= this._list.length ){
		Drill_SGaB_SelectWindow.lastIndex = this._list.length-1;
	}
	this.setTopRow(Drill_SGaB_SelectWindow.lastTopRow);
	this.select(Drill_SGaB_SelectWindow.lastIndex);
}
//==============================
// * 选项窗口 - 绘制选项
//==============================
Drill_SGaB_SelectWindow.prototype.drawItem = function( index ){
    var name_str = this._list[index];
	var name_str_list = name_str.split(/\\n/);
	var rect = this.itemRectForText(index);
	
	// > 绘制小缩略图
	if( DrillUp.g_SGaB_command_window['icon_enabled'] == true ){
		var temp_data = $gameTemp._drill_SGaB_visibleDataList[ index ];
		var bitmap = null;
		
		// > 锁定时，显示锁定小缩略图
		var realIndex = temp_data['index'];
		if( $gameTemp.drill_SGaB_isLocked( realIndex ) == true ){
			bitmap = ImageManager.load_MenuGallery( DrillUp.g_SGaB_locked_pic );
		}else{
			bitmap = ImageManager.load_MenuGallery( temp_data['pic'] );	//（注意全加载问题）
		}
		
		if( bitmap != null && bitmap.isReady() == true ){
			var ww = bitmap.width;
			var hh = bitmap.height;
			
			if( DrillUp.g_SGaB_command_window['icon_black'] == true ){
				this.contents.fillRect( rect.x, rect.y, rect.width, rect.height, "#000000" );
			}
			
			if( DrillUp.g_SGaB_command_window['icon_mode'] == "等比缩放" ){
				var pw = rect.width / ww;
				var ph = rect.height / hh;
				if( pw > ph ){ pw = ph; }
				var rxx = (rect.width - ww * pw)*0.5;
				var ryy = (rect.height - hh * pw)*0.5;
				this.contents.blt(bitmap, 0, 0, ww, hh, rect.x + rxx, rect.y + ryy, ww*pw, hh*pw );
			}else{	//（拉伸缩放）
				var pw = rect.width / ww;
				var ph = rect.height / hh;
				if( pw > ph ){ pw = ph; }
				this.contents.blt(bitmap, 0, 0, ww, hh, rect.x, rect.y, ww*pw, hh*pw );
			}
		}
	}
	
	// > 绘制内容
	var op = {
		"align":DrillUp.g_SGaB_command_window['align'],
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
Drill_SGaB_SelectWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Drill_SGaB_SelectWindow.lastTopRow = this.topRow();
	Drill_SGaB_SelectWindow.lastIndex = this.index();
};
//==============================
// * 选项窗口 - 兼容 - mog菜单指针插件
//==============================
if( Imported.MOG_MenuCursor == true ){
	var _drill_SGaB_mog_set_mcursor_data = Drill_SGaB_SelectWindow.prototype.need_set_mcursor_data;
	Drill_SGaB_SelectWindow.prototype.need_set_mcursor_data = function() {
		if( DrillUp.g_SGaB_command_window['cursor']['mog_enabled'] == false ){
			return false;
		}
		return _drill_SGaB_mog_set_mcursor_data.call(this);
	}
}
//==============================
// * 选项窗口 - 兼容 - mog菜单边框插件
//==============================
if( Imported.MOG_CursorBorder == true ){
	var _drill_SGaB_mog_createSprSelMenu = Drill_SGaB_SelectWindow.prototype.createSprSelMenu;
	Drill_SGaB_SelectWindow.prototype.createSprSelMenu = function() {
		if( DrillUp.g_SGaB_command_window['cursor']['mog_borderEnabled'] == false ){
			return ;
		}
		_drill_SGaB_mog_createSprSelMenu.call(this);
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true ){
	Drill_SGaB_SelectWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SGaB_command_window['cursor']['MCu_enabled'];
	}
	Drill_SGaB_SelectWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SGaB_command_window['cursor']['MCu_lock'] == true ){
			return DrillUp.g_SGaB_command_window['cursor']['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true ){
	Drill_SGaB_SelectWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SGaB_command_window['cursor']['MCB_rectEnabled'];
	}
	Drill_SGaB_SelectWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SGaB_command_window['cursor']['MCB_enabled'];
	}
	Drill_SGaB_SelectWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SGaB_command_window['cursor']['MCB_lock'] == true ){
			return DrillUp.g_SGaB_command_window['cursor']['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 选项窗口 - 兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true ){
	Drill_SGaB_SelectWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SGaB_command_window['cursor']['MSB_enabled'];
	}
	Drill_SGaB_SelectWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SGaB_command_window['cursor']['MSB_lock'] == true ){
			return DrillUp.g_SGaB_command_window['cursor']['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}


//==========================================================================================
// ** 显示窗口【Drill_SGaB_DescWindow】
//
//==========================================================================================
//==============================
// * 显示窗口 - 定义
//==============================
function Drill_SGaB_DescWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SGaB_DescWindow.prototype = Object.create(Window_Base.prototype);
Drill_SGaB_DescWindow.prototype.constructor = Drill_SGaB_DescWindow;
//==============================
// * 显示窗口 - 初始化
//==============================
Drill_SGaB_DescWindow.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x,y,width,height);
	//...（暂无）
};
//==============================
// * 显示窗口 - 帧刷新
//==============================
Drill_SGaB_DescWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	//...（暂无）
};
//==============================
// * 显示窗口 - 重绘内容
//==============================
Drill_SGaB_DescWindow.prototype.drill_refreshDesc = function( cur_index ) {
	var temp_list = $gameTemp._drill_SGaB_visibleDataList;		//可见项列表
	var temp_c = temp_list[ cur_index ];					//当前选项
	
	// > 切换描述内容
	var context_list = [];
	var context_realIndex = temp_c['index'];
	
	if( $gameTemp.drill_SGaB_isLocked( context_realIndex ) == true && 
	   (DrillUp.g_SGaB_locked_type == "锁定缩略图和描述内容" || 
		DrillUp.g_SGaB_locked_type == "只锁定描述内容" ) ){
			
		context_list.push( DrillUp.g_SGaB_locked_context );	//锁定内容
	}else{
		context_list = temp_c['context'].split("\n");		//当前内容
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
// ** 完成度窗口【Drill_SGaB_CompletionWindow】
//
//==========================================================================================
//==============================
// * 完成度窗口 - 定义
//==============================
function Drill_SGaB_CompletionWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SGaB_CompletionWindow.prototype = Object.create(Window_Base.prototype);
Drill_SGaB_CompletionWindow.prototype.constructor = Drill_SGaB_CompletionWindow;
//==============================
// * 完成度窗口 - 初始化
//==============================
Drill_SGaB_CompletionWindow.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x,y,width,height);
	//...（暂无）
};
//==============================
// * 完成度窗口 - 帧刷新
//==============================
Drill_SGaB_CompletionWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	//...（暂无）
};
//==============================
// * 完成度窗口 - 重绘内容
//==============================
Drill_SGaB_CompletionWindow.prototype.drill_refresh = function(){
	var temp_list = $gameTemp._drill_SGaB_visibleDataList;		//可见项列表
	
	// > 上锁的数量
	var locked_count = 0;
	for( var i=0; i < temp_list.length; i++ ){
		var temp_c = temp_list[ i ];	
		var context_realIndex = temp_c['index'];
		if( $gameTemp.drill_SGaB_isLocked( context_realIndex ) == true ){
			locked_count += 1;
		}
	}
	
	// > 切换描述内容
	var context = "";
	context = DrillUp.g_SGaB_compWin_word + String( temp_list.length - locked_count ) + "/" + String( temp_list.length );
	
	// > 绘制内容
	var op = {
		"align":"居中",
		"autoLineheight":true,
	}
	this.drill_COWA_drawTextListEx( [ context ],op);
}


//==========================================================================================
// ** 原图查看器窗口【Drill_SGaB_ImgExpandWindow】
//
//			说明：	这个窗口只是用于阻塞流程关系，在展开原图查看器时，提供取消返回选项的功能。
//==========================================================================================
//==============================
// * 原图查看器窗口 - 定义
//==============================
function Drill_SGaB_ImgExpandWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SGaB_ImgExpandWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SGaB_ImgExpandWindow.prototype.constructor = Drill_SGaB_ImgExpandWindow;
//==============================
// * 原图查看器窗口 - 初始化
//==============================
Drill_SGaB_ImgExpandWindow.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
};
//==============================
// * 原图查看器窗口 - 窗口数据
//==============================
Drill_SGaB_ImgExpandWindow.prototype.maxCols = function(){ return 1; };
Drill_SGaB_ImgExpandWindow.prototype.maxItems = function(){ return 1; };
//==============================
// * 原图查看器窗口 - 帧刷新
//==============================
Drill_SGaB_ImgExpandWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	//...（暂无）
};
//==============================
// * 原图查看器窗口 - 退出事件
//==============================
Drill_SGaB_ImgExpandWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	//...（暂无）
};
//==============================
// * 原图查看器窗口 - 阻塞
//==============================
Drill_SGaB_ImgExpandWindow.prototype.cursorPagedown = function(){}
Drill_SGaB_ImgExpandWindow.prototype.cursorPageup = function(){}
Drill_SGaB_ImgExpandWindow.prototype.scrollDown = function(){}
Drill_SGaB_ImgExpandWindow.prototype.scrollUp = function(){}




//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneGalleryB = false;
		alert(
			"【Drill_SceneGalleryB.js 面板 - 全自定义画廊B】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput  系统-输入设备核心" +
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"+
			"\n- Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心" +
			"\n- Drill_CoreOfSelectableButton 系统-按钮组核心"
		);
}

