//=============================================================================
// Drill_TitleScene.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        标题 - 全自定义标题界面
 * @author Drill_up
 * 
 * @Drill_LE_param "布局样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TSc_style_list_length"
 * 
 * @Drill_LE_param "背景音乐-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TSc_bgm_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleScene +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全自定义的标题界面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心★★v2.2及以上★★
 *     必须基于该插件才能显示内容。
 * 可扩展：
 *   - Drill_CoreOfSelectableButton 系统-按钮组核心★★v1.8及以上★★
 *     如果有按钮组核心，则可以使用 按钮组模式 的选项。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.该面板属于菜单面板，可以被标题背景、标题魔法圈等插件作用到。
 *   该面板关键字为：Scene_Title
 * 3.更多内容可以去看看 "20.标题 > 关于全自定义标题界面.docx"。
 * 结构：
 *   (1.插件包含：1个标题贴图 + 1个选项窗口
 *      该插件只控制标题界面的功能部件。
 *   (2.窗口的布局规划没有限制，去看看 "17.主菜单 > 窗口与布局.docx"。
 * 全局存储：
 *   (1.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 *   (2.该插件控制的背景音乐/布局样式编号将存储在全局文件中。
 *      如果游戏中修改了编号，则永久有效，不保存也有效。
 * 参数修改不生效：
 *   (1.注意，如果配置某些参数不起作用，记得 删掉存档 再看看。
 *      比如修改按钮组的坐标不生效，就要删掉旧存档在打开才可以。
 *      此问题在群友之间反复出现，一定要注意看文档和插件说明啊。
 * 多主题切换：
 *   (1.通过该插件，你可以使用插件指令全局切换 音乐与样式。
 *   (2.萌新注意：
 *      如果你想做多种切换的标题界面的功能，去参考示例中地图为
 *      初始点，id为14，名为"标题变换"的事件。
 * 多主题按钮组：
 *   (1.你可以通过插件指令，修改按钮组的 位置、样式、默认贴图。
 *      标题按钮组的 样式 在 按钮组核心 中设置。
 *   (2.注意，如果你想切换多主题，那么就需要配置 "按钮贴图序列" 为空。
 *      因为暂时只能修改默认贴图，不能修改关键字对应的序列贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 布局样式-1 资源-贴图
 * 布局样式-2 资源-贴图
 * 布局样式-3 资源-贴图
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以修改选项窗口的布局设置：
 * 
 * 插件指令：>标题界面 : 修改布局样式 : 样式[1]
 * 插件指令：>标题界面 : 修改背景音乐 : 音乐[1]
 * 
 * 插件指令：>标题界面 : 标题选项按钮组 : 改变位置[608,312]
 * 插件指令：>标题界面 : 标题选项按钮组 : 改变样式[10]
 * 插件指令：>标题界面 : 标题选项按钮组 : 改变默认按钮贴图[1]
 *
 * 1."样式[1]"对应配置的样式的编号。
 *   "音乐[1]"对应配置的音乐的编号。
 * 2.注意，插件指令做出的改变是全局的。如果不起作用，需要删掉旧存档再看看。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在标题界面中测试性能。
 * 测试结果：   菜单界面中，平均消耗为：【8.48ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.在开启按钮组的模式下，消耗一样很低，可能是由于在标题界面中，
 *   计算资源非常充足，所以并不会消耗太多计算量。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令格式。
 * [v1.2]
 * 该插件是"Drill_TitleWindow 标题窗口"的重写版本。
 * 重新编写了插件结构，并添加了去掉标题的功能。
 * [v1.3]
 * 添加了按钮组核心的支持。以及部分选项去掉的设置。
 * [v1.4]
 * 添加了外部干扰插件的检测。
 * [v1.5]
 * 修复了去掉标题界面后，玩家在失败界面后，仍然可以回到标题界面的bug。
 * [v1.6]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.7]
 * 更新并兼容了新的窗口字符底层。
 * 
 * 
 * 
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID,该插件的数据将存储到指定文件路径,具体看看"21.管理器 > 关于全局存储.docx"。
 * @default 1
 * 
 * 
 * @param ---杂项---
 * @default 
 *
 * @param 是否自动隐藏'继续'选项
 * @parent ---杂项---
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc true - 隐藏，false - 不隐藏。没有任何存档并开始游戏时，自动隐藏继续按钮。
 * @default true
 *
 * @param 是否隐藏'设置'选项
 * @parent ---杂项---
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc true - 隐藏，false - 不隐藏。隐藏'设置'按钮。
 * @default false
 *
 * @param 是否添加退出选项
 * @parent ---杂项---
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default true
 *
 * @param 用语-退出选项
 * @parent 是否添加退出选项
 * @desc 退出选项的用语显示文本。（新游戏、继续等其他选项，在 数据库>用语 中设置。）
 * @default 退出
 * 
 * 
 * @param ---标题贴图---
 * @default 
 *
 * @param 是否显示标题文字
 * @parent ---标题贴图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 标题文字 X
 * @parent ---标题贴图---
 * @desc x轴方向平移，单位像素。0为文字中心贴在正中间。正数向右，负数向左。
 * @default 0
 *
 * @param 标题文字 Y
 * @parent ---标题贴图---
 * @desc y轴方向平移，单位像素。0为文字中心贴在最上面。正数向下，负数向上。
 * @default 156
 *
 * @param 标题文字字体大小
 * @parent ---标题贴图---
 * @type number
 * @min 1
 * @desc 标题文字的字体大小。
 * @default 72
 *
 * @param 标题文字描边厚度
 * @parent ---标题贴图---
 * @type number
 * @min 0
 * @desc 标题文字的描黑边的厚度，单位像素。
 * @default 8
 * 
 * 
 * 
 * @param ---标题选项---
 * @default 
 * 
 * @param 标题选项模式
 * @parent ---标题选项---
 * @type select
 * @option 按钮组模式
 * @value 按钮组模式
 * @option 窗口模式
 * @value 窗口模式
 * @desc 标题选项的模式。按钮组模式需要 Drill_CoreOfSelectableButton 按钮组核心支持。
 * @default 窗口模式
 * 
 * @param 标题选项按钮组
 * @parent ---标题选项---
 * @desc 标题选项为 按钮组模式 时，标题选项按钮组的配置数据。
 * @type struct<DrillTScCommandButton>
 * @default {}
 * 
 * @param 标题选项窗口
 * @parent ---标题选项---
 * @desc 标题选项为 窗口模式 时，标题选项窗口的配置数据。
 * @type struct<DrillTScCommandWindow>
 * @default {}
 * 
 * 
 * 
 * @param ---背景音乐---
 * @default
 *
 * @param 初始播放的音乐
 * @parent ---背景音乐---
 * @type number
 * @min 1
 * @desc 第一次进入标题界面时，播放的音乐的id。
 * @default 1
 *
 * @param 背景音乐-1
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-2
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-3
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-4
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-5
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-6
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-7
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-8
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-9
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-10
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-11
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-12
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-13
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-14
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-15
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-16
 * @parent ---背景音乐---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
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
 * @default (需配置)标题界面背景贴图
 * @require 1
 * @dir img/titles1/
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
/*~struct~DrillTScCommandWindow:
 * 
 * @param 选项窗口 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 270
 * 
 * @param 选项窗口 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 285
 *
 * @param 选项窗口宽度
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 270
 *
 * @param 选项窗口高度
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 320
 *
 * @param 选项窗口列数
 * @type number
 * @min 1
 * @desc 选项窗口的列数。
 * @default 1
 *
 * @param 选项对齐方式
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center - 居中，right - 右对齐。
 * @default center
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
 * @default {"移动类型":"弹性移动","移动时长":"45","移动延迟":"10","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"60","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 选项窗口初始布局样式
 * @type number
 * @min 1
 * @desc 选项窗口使用的布局样式。
 * @default 1
 * 
 * @param 布局样式-1
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"默认皮肤","---单张背景贴图---":"","资源-贴图":"","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 *
 * @param 布局样式-2
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-3
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-4
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-5
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-6
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-7
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-8
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-9
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-10
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * 
 * 
 */
/*~struct~DrillTScCommandButton:
 * 
 * @param 平移-按钮组 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 408
 * 
 * @param 平移-按钮组 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 312
 * 
 * @param 按钮组样式
 * @type number
 * @min 0
 * @desc 按钮组对应的样式配置，对应 按钮组核心 的样式id。
 * @default 10
 * 
 * @param ---按钮贴图---
 * @desc 
 *
 * @param DEBUG-按钮关键字搜索
 * @parent ---按钮贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 如果你实在找不到关键字，但是有默认按钮显示了，你可以开启这个，进入主菜单，会按顺序显示所有按钮的关键字。
 * @default false
 * 
 * @param 按钮贴图序列
 * @parent ---按钮贴图---
 * @type struct<DrillTScCommandButtonSeq>[]
 * @desc 按钮贴图通过 菜单按钮关键字 绑定，根据指定关键字的按钮，显示相应的按钮贴图。
 * @default []
 * 
 * @param ---多种主题按钮---
 * @desc 
 *
 * @param 初始的默认按钮贴图
 * @parent ---多种主题按钮---
 * @type number
 * @min 1
 * @desc 第一次进入标题界面时，显示默认列表中的贴图的编号。
 * @default 1
 *
 * @param 默认按钮贴图列表
 * @parent ---多种主题按钮---
 * @desc 默认按钮贴图的图片资源。
 * @default ["(需配置)标题界面按钮"]
 * @require 1
 * @dir img/titles1/
 * @type file[]
 * 
 * 
 */
/*~struct~DrillTScCommandButtonSeq:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的按钮关键字对应==
 * 
 * @param 指定按钮
 * @type select
 * @option 新游戏(Button_newGame)
 * @value 新游戏
 * @option 继续(Button_continue)
 * @value 继续
 * @option 选项(Button_options)
 * @value 选项
 * @option 退出(Button_Drill_TSc_Quit)
 * @value 退出
 * @option 自定义(Button_……)
 * @value 自定义
 * @desc 按钮的关键字。
 * @default 自定义
 * 
 * @param 关键字
 * @parent 指定按钮
 * @desc 按钮贴图是通过 菜单按钮关键字 绑定的。加前缀"Button_"或者不加都可以，比如：Button_item。
 * @default Button_xxx
 * 
 * @param 按钮贴图
 * @desc 自定义按钮的图片资源。
 * @default (需配置)标题界面按钮
 * @require 1
 * @dir img/titles1/
 * @type file
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TSc (Title_Scene)
//		临时全局变量	DrillUp.g_TSc_xxx
//		临时局部变量	this._drill_TSc_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TSc_styleId
//		覆盖重写方法	Scene_Title.prototype.drawGameTitle
//						Scene_Title.prototype.createCommandWindow
//						Scene_Title.prototype.playTitleMusic
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	在标题界面中测试
//		★性能测试消耗	
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
//			->☆插件指令
//			->☆全局存储
//			->☆原型链规范（Scene_Title）
//			
//			->☆标题界面控制
//				->面板
//					->2A背景前景（继承）
//					->2C音乐（继承）
//				->3A主体
//				->3B按钮组
//				->3C选项窗口
//				->3D选项管理
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.本来打算把标题变成图片按钮的，但是由于各个插件都可以添加到标题，
//			  复杂度太高，干脆还是保持原来的窗口模式。
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
	DrillUp.g_TSc_PluginTip_curName = "Drill_TitleScene.js 标题-全自定义标题界面";
	DrillUp.g_TSc_PluginTip_baseList = [
		"Drill_CoreOfGlobalSave.js 管理器-全局存储核心",
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_TSc_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_TSc_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_TSc_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_TSc_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_TSc_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 缺少插件
	//==============================
	DrillUp.drill_TSc_getPluginTip_NoSupportPlugin = function(){
		return "【" + DrillUp.g_TSc_PluginTip_curName + "】\n你未添加 按钮组核心 插件，请及时添加。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少配置
	//==============================
	DrillUp.drill_TSc_getPluginTip_NoSupportData_window = function(){
		return "【" + DrillUp.g_TSc_PluginTip_curName + "】\n你未配置 标题选项窗口 参数，请及时配置。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少配置
	//==============================
	DrillUp.drill_TSc_getPluginTip_NoSupportData_btn = function(){
		return "【" + DrillUp.g_TSc_PluginTip_curName + "】\n你未配置 标题选项按钮组 参数，请及时配置。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少配置
	//==============================
	DrillUp.drill_TSc_getPluginTip_NoSupportData_style = function( style_id ){
		return "【" + DrillUp.g_TSc_PluginTip_curName + "】\n你未配置 按钮组核心样式 "+ style_id +" 参数，请及时配置。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少配置
	//==============================
	DrillUp.drill_TSc_getPluginTip_NoSupportData_src = function(){
		return "【" + DrillUp.g_TSc_PluginTip_curName + "】\n你未配置 标题选项按钮组 > 默认按钮贴图列表，需要至少一个默认按钮贴图（全透明的图片也行）。因为鼠标需要依据此贴图的大小作为接触范围来切换选项。";
	};
	//==============================
	// * 提示信息 - 报错 - 兼容冲突
	//==============================
	DrillUp.drill_TSc_getPluginTip_CompatibilityOther = function(){
		return  "【" + DrillUp.g_TSc_PluginTip_curName + "】\n"+
				"检测到你开启了 TitleCommandPosition插件 或 基于该插件写的派生插件 。\n"+
				"请及时关闭该插件，该插件与 全自定义标题界面 的控制造成干扰。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_TitleScene = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleScene');
	
	
	//==============================
	// * 静态数据 - 标题选项 - 标题选项按钮组（必须写在前面）
	//				（~struct~DrillTScCommandButton）
	//==============================
	DrillUp.drill_TSc_initCommandButton = function( dataFrom ){
		var data = {};
		data['style_id'] = Number( dataFrom["按钮组样式"] || 0);
		
		data['debug_search'] = String( dataFrom["DEBUG-按钮关键字搜索"] || "false") == "true";
		
		// > 按钮组 - 3A主体
		data['x'] = Number( dataFrom["平移-按钮组 X"] || 0);
		data['y'] = Number( dataFrom["平移-按钮组 Y"] || 0);
		
		// > 按钮组 - B父窗口
		data['btn_constructor'] = "Window_Command";
		
		// > 按钮组 - B父窗口（资源）
		data['btn_src_file'] = "img/titles1/";
		if( dataFrom["按钮贴图序列"] != undefined &&
			dataFrom["按钮贴图序列"] != "" ){
			var seq = JSON.parse( dataFrom["按钮贴图序列"] );
			data['btn_src'] = [];
			data['btn_srcKeyword'] = [];
			for( var i=0; i < seq.length; i++ ){
				var seq_data = JSON.parse( seq[i] );
				var keyword = ""
				var tarWord = String( seq_data["指定按钮"] );
				if( tarWord == "新游戏" ){ keyword = "newGame";
				}else if( tarWord == "继续" ){ keyword = "continue";
				}else if( tarWord == "选项" ){ keyword = "options";
				}else if( tarWord == "退出" ){ keyword = "Drill_TSc_Quit";
				}else{
					keyword = String( seq_data["关键字"] );
					keyword = keyword.replace("Button_","");
					keyword = keyword.replace("button_","");
				}
				data['btn_srcKeyword'].push( keyword );
				data['btn_src'].push( String( seq_data["按钮贴图"] ));
			}
		}else{
			data['btn_src'] = [];
			data['btn_srcKeyword'] = [];
		}
		
		// > 默认按钮贴图（['btn_src_default']）
		data['btn_src_default_id'] = Number( dataFrom["初始的默认按钮贴图"] || 1);
		if( dataFrom["默认按钮贴图列表"] != undefined &&
			dataFrom["默认按钮贴图列表"] != "" ){
			data['btn_src_default_tank'] = JSON.parse( dataFrom["默认按钮贴图列表"] );
		}else{
			data['btn_src_default_tank'] = [];
		}
		if( DrillUp.g_TSc_command_mode == "按钮组模式" &&
			data['btn_src_default_tank'].length == 0 ){
			alert( DrillUp.drill_TSc_getPluginTip_NoSupportData_src() );
		}
		
		// > 按钮组 - F激活
		data['active_enableMouseOk'] = true;	//（鼠标ok点击 开启）
		data['active_hide'] = false;			//（激活后是否瞬间隐藏，克隆选中按钮用）
		data['active_out'] = false;				//（激活后不出列）
		
		return data;
	}
	
	//==============================
	// * 静态数据 - 标题选项 - 标题选项窗口（必须写在前面）
	//				（~struct~DrillTScCommandWindow）
	//==============================
	DrillUp.drill_TSc_initCommandWindow = function( dataFrom ){
		
		DrillUp.g_TSc_selWin_x = Number(dataFrom["选项窗口 X"] || 30);
		DrillUp.g_TSc_selWin_y = Number(dataFrom["选项窗口 Y"] || 120);
		DrillUp.g_TSc_selWin_width = Number(dataFrom["选项窗口宽度"] || 220);
		DrillUp.g_TSc_selWin_height = Number(dataFrom["选项窗口高度"] || 460);
		DrillUp.g_TSc_selWin_fontsize = Number(dataFrom["选项窗口字体大小"] || 22);
		DrillUp.g_TSc_selWin_col = Number(dataFrom["选项窗口列数"] || 1);
		DrillUp.g_TSc_selWin_align = String(dataFrom["选项对齐方式"] || "center");
		
		// ~struct~DrillWindowMoving: 窗口移动动画（窗口辅助核心-通用）
		if( dataFrom["选项窗口移动动画"] != undefined && 
			dataFrom["选项窗口移动动画"] != "" ){
			DrillUp.g_TSc_selWin_slideAnim = JSON.parse( dataFrom["选项窗口移动动画"] );
			DrillUp.g_TSc_selWin_slideAnim['slideMoveType'] = String(DrillUp.g_TSc_selWin_slideAnim["移动类型"] || "匀速移动");
			DrillUp.g_TSc_selWin_slideAnim['slideTime'] = Number(DrillUp.g_TSc_selWin_slideAnim["移动时长"] || 20);
			DrillUp.g_TSc_selWin_slideAnim['slideDelay'] = Number(DrillUp.g_TSc_selWin_slideAnim["移动延迟"] || 0);
			DrillUp.g_TSc_selWin_slideAnim['slidePosType'] = String(DrillUp.g_TSc_selWin_slideAnim["坐标类型"] || "相对坐标");
			DrillUp.g_TSc_selWin_slideAnim['slideX'] = Number(DrillUp.g_TSc_selWin_slideAnim["起点-相对坐标 X"] || -100);
			DrillUp.g_TSc_selWin_slideAnim['slideY'] = Number(DrillUp.g_TSc_selWin_slideAnim["起点-相对坐标 Y"] || 0);
			DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_TSc_selWin_slideAnim["起点-绝对坐标 X"] || 0);
			DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_TSc_selWin_slideAnim["起点-绝对坐标 Y"] || 0);
		}else{
			DrillUp.g_TSc_selWin_slideAnim = {};
		}
		
		// ~struct~DrillWindowLayout: 窗口布局（窗口辅助核心-通用）
		DrillUp.g_TSc_selWin_styleId = Number(dataFrom["选项窗口初始布局样式"] || 1);
		DrillUp.g_TSc_style_list_length = 10;
		DrillUp.g_TSc_style_list = [];
		for( var i = 0; i < DrillUp.g_TSc_style_list_length; i++ ){
			if( dataFrom["布局样式-"+String(i+1)] != undefined &&
				dataFrom["布局样式-"+String(i+1)] != "" ){
				DrillUp.g_TSc_style_list[i] = JSON.parse( dataFrom["布局样式-" + String(i+1)] );
				DrillUp.g_TSc_style_list[i]['layoutType'] = String(DrillUp.g_TSc_style_list[i]["布局类型"] || "默认皮肤");
				DrillUp.g_TSc_style_list[i]['layoutSrc'] = String(DrillUp.g_TSc_style_list[i]["资源-贴图"] || "");
				DrillUp.g_TSc_style_list[i]['layoutSrcFile'] = "img/titles1/";
				DrillUp.g_TSc_style_list[i]['layoutX'] = Number(DrillUp.g_TSc_style_list[i]["贴图位置修正 X"] || -100);
				DrillUp.g_TSc_style_list[i]['layoutY'] = Number(DrillUp.g_TSc_style_list[i]["贴图位置修正 Y"] || 0);
			}else{
				DrillUp.g_TSc_style_list[i] = {};
			}
		};
	}
	
	/*----------------标题选项-----------------*/
	DrillUp.g_TSc_command_mode = String(DrillUp.parameters["标题选项模式"] || "按钮组模式");
	if( DrillUp.g_TSc_command_mode == "按钮组模式" && 	// 按钮组校验
		!Imported.Drill_CoreOfSelectableButton ){
		DrillUp.g_TSc_command_mode = "窗口模式";
		alert( DrillUp.drill_TSc_getPluginTip_NoSupportPlugin() );
	}
	if( DrillUp.parameters["标题选项窗口"] != undefined &&
		DrillUp.parameters["标题选项窗口"] != "" &&
		DrillUp.parameters["标题选项窗口"] != "{}" ){
		var data = JSON.parse( DrillUp.parameters["标题选项窗口"] );
		DrillUp.drill_TSc_initCommandWindow( data ); // 直接执行静态数据
	}else{
		if( DrillUp.g_TSc_command_mode == "窗口模式" ){
			alert( DrillUp.drill_TSc_getPluginTip_NoSupportData_window() );
		}
	}
	if( DrillUp.parameters["标题选项按钮组"] != undefined &&
		DrillUp.parameters["标题选项按钮组"] != "" &&
		DrillUp.parameters["标题选项按钮组"] != "{}" ){
		var data = JSON.parse( DrillUp.parameters["标题选项按钮组"] );
		DrillUp.g_TSc_command_button = DrillUp.drill_TSc_initCommandButton( data );
	}else{
		if( DrillUp.g_TSc_command_mode == "按钮组模式" ){
			alert( DrillUp.drill_TSc_getPluginTip_NoSupportData_btn() );
		}
		DrillUp.g_TSc_command_button = {};
	}
	
	
	
	/*----------------杂项-----------------*/
	DrillUp.g_TSc_continueAutoHide = String(DrillUp.parameters["是否自动隐藏'继续'选项"] || "true") === "true";
	DrillUp.g_TSc_optionHide = String(DrillUp.parameters["是否隐藏'设置'选项"] || "false") === "true";
	DrillUp.g_TSc_quit_option = String(DrillUp.parameters["是否添加退出选项"] || "true") === "true";
	DrillUp.g_TSc_quit_text = String(DrillUp.parameters["用语-退出选项"] || "退出");
    DrillUp.g_TSc_dataFileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);
	
	/*----------------标题贴图-----------------*/
	DrillUp.g_TSc_text_visible = String(DrillUp.parameters["是否显示标题文字"] || "true") === "true";	
	DrillUp.g_TSc_text_x = Number(DrillUp.parameters["标题文字 X"] || 30);
	DrillUp.g_TSc_text_y = Number(DrillUp.parameters["标题文字 Y"] || 120);
	DrillUp.g_TSc_text_fontsize = Number(DrillUp.parameters["标题文字字体大小"] || 72);
	DrillUp.g_TSc_text_outlineWidth = Number(DrillUp.parameters["标题文字描边厚度"] || 8);
	
	/*-----------------背景音乐------------------*/
	DrillUp.g_TSc_bgmId = Number(DrillUp.parameters["初始播放的音乐"] || 1);
	DrillUp.g_TSc_bgm_list_length = 16;
	DrillUp.g_TSc_bgm_list= [];
	for (var i = 0; i < DrillUp.g_TSc_bgm_list_length; i++) {
		DrillUp.g_TSc_bgm_list[i] = String(DrillUp.parameters["背景音乐-" + String(i + 1)] || "");
	};
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave && 
	Imported.Drill_CoreOfWindowAuxiliary ){
	
//==============================
// * 基于插件检测 - 外部影响插件
//==============================
if( typeof(_Window_TitleCommand_updatePlacement) != "undefined" ){
	alert( DrillUp.drill_TSc_getPluginTip_CompatibilityOther() );
};


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_TSc_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_TSc_pluginCommand.call(this, command, args);
	this.drill_TSc_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_TSc_pluginCommand = function( command, args ){
	if( command === ">标题界面" || command === ">标题窗口" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type === "修改布局样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				DrillUp.global_TSc_styleId = Number(temp1) - 1;
				StorageManager.drill_TSc_saveData();
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type === "修改背景音乐" ){
				temp1 = temp1.replace("音乐[","");
				temp1 = temp1.replace("]","");
				DrillUp.global_TSc_bgmId = Number(temp1) - 1;
				StorageManager.drill_TSc_saveData();
			}
		}
			
		/*-----------------标题选项按钮组------------------*/
		if( type == "标题选项按钮组" ){
			if( temp1.indexOf("改变位置[") != -1 ){
				temp1 = temp1.replace("改变位置[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					DrillUp.global_TSc_commandButton_x =  Number(temp_arr[0]);
					DrillUp.global_TSc_commandButton_y =  Number(temp_arr[1]);
					StorageManager.drill_TSc_saveData();
				}
			}
			if( temp1.indexOf("改变样式[") != -1 ){
				temp1 = temp1.replace("改变样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				DrillUp.global_TSc_commandButton_index = temp1 - 1;
				StorageManager.drill_TSc_saveData();
			}
			if( temp1.indexOf("改变默认按钮贴图[") != -1 ){
				temp1 = temp1.replace("改变默认按钮贴图[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				DrillUp.global_TSc_commandButton_defaultId = temp1 - 1;
				StorageManager.drill_TSc_saveData();
			}
		}
	}
};


//=============================================================================
// ** ☆全局存储
//=============================================================================
//==============================
// * 『全局存储』 - 载入
//
//			说明：	这里全局存储的是单一固定数据，不需要数据检查。
//==============================
	var global_fileId = DrillUp.g_TSc_dataFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TSc" );  //『全局存储执行函数』
	
	// > 布局样式ID
	if( DrillUp.global_TSc_styleId == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_styleId"];
		if( data == undefined ){ data = DrillUp.g_TSc_selWin_styleId-1 };
		DrillUp.global_TSc_styleId = data;
	}
	// > 初始播放的音乐
	if( DrillUp.global_TSc_bgmId == null ){
		var data = global_data["global_bgmId"];
		if( data == undefined ){ data = DrillUp.g_TSc_bgmId-1 };
		DrillUp.global_TSc_bgmId = data;
	}
	// > 按钮组位置
	if( DrillUp.global_TSc_commandButton_x == null ){
		var data = global_data["global_commandButton_x"];
		if( data == undefined ){ data = DrillUp.g_TSc_command_button['x'] };
		DrillUp.global_TSc_commandButton_x = data;
	}
	if( DrillUp.global_TSc_commandButton_y == null ){
		var data = global_data["global_commandButton_y"];
		if( data == undefined ){ data = DrillUp.g_TSc_command_button['y'] };
		DrillUp.global_TSc_commandButton_y = data;
	}
	// > 按钮组样式
	if( DrillUp.global_TSc_commandButton_index == null ){
		var data = global_data["global_commandButton_index"];
		if( data == undefined ){ data = DrillUp.g_TSc_command_button['style_id']-1 };
		DrillUp.global_TSc_commandButton_index = data;
	}
	// > 初始的默认按钮贴图
	if( DrillUp.global_TSc_commandButton_defaultId == null ){
		var data = global_data["global_commandButton_defaultId"];
		if( data == undefined ){ data = DrillUp.g_TSc_command_button['btn_src_default_id']-1 };
		DrillUp.global_TSc_commandButton_defaultId = data;
	}
	
//==============================
// * 『全局存储』 - 存储
//==============================
StorageManager.drill_TSc_saveData = function(){
	var file_id = DrillUp.g_TSc_dataFileId;
	var data = {};
	data["global_styleId"] = DrillUp.global_TSc_styleId;
	data["global_bgmId"] = DrillUp.global_TSc_bgmId;
	data["global_commandButton_x"] = DrillUp.global_TSc_commandButton_x;
	data["global_commandButton_y"] = DrillUp.global_TSc_commandButton_y;
	data["global_commandButton_index"] = DrillUp.global_TSc_commandButton_index;
	data["global_commandButton_defaultId"] = DrillUp.global_TSc_commandButton_defaultId;
	this.drill_COGS_saveData( file_id, "TSc", data );  //『全局存储执行函数』
};


//=============================================================================
// ** ☆原型链规范（Scene_Title）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 标题界面（场景基类） - 初始化
//==============================
//Scene_Title.prototype.initialize = function() {
//    Scene_Base.prototype.initialize.call(this);
//};
//==============================
// * 标题界面（场景基类） - 创建
//==============================
//Scene_Title.prototype.create = function() {
//    Scene_Base.prototype.create.call(this);
//};
//==============================
// * 标题界面（场景基类） - 帧刷新
//==============================
//Scene_Title.prototype.update = function() {
//    Scene_Base.prototype.update.call(this);
//};
//==============================
// * 标题界面（场景基类） - 开始运行
//==============================
//Scene_Title.prototype.start = function() {
//    Scene_Base.prototype.start.call(this);
//};
//==============================
// * 标题界面（场景基类） - 结束运行
//==============================
Scene_Title.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
};
//==============================
// * 标题界面（场景基类） - 忙碌状态
//==============================
//Scene_Title.prototype.isBusy = function() {
//	return Scene_Base.prototype.isBusy.call(this);
//};
//==============================
// * 标题界面（场景基类） - 析构函数
//==============================
//Scene_Title.prototype.terminate = function() {
//    Scene_Base.prototype.terminate.call(this);
//};
//==============================
// * 标题界面（场景基类） - 判断加载完成
//==============================
Scene_Title.prototype.isReady = function() {
	return Scene_Base.prototype.isReady.call(this);
};
//==============================
// * 标题界面（场景基类） - 判断是否激活/启动
//==============================
Scene_Title.prototype.isActive = function() {
	return Scene_Base.prototype.isActive.call(this);
};



//=============================================================================
// ** ☆标题界面控制
//			
//			作用域：	菜单界面
//			主功能：	信息面板的基本功能。
//			子功能：
//						->界面重要函数
//							x> 初始化（initialize）
//							> 创建（create）
//							> 帧刷新（update）
//							x> 开始运行（start）
//							x> 结束运行（stop）
//							x> 忙碌状态（isBusy）
//							x> 析构函数（terminate）
//							x> 判断加载完成（isReady）
//							x> 判断是否激活/启动（isActive）
//							x> 当前角色切换时（onActorChange）
//							x> 创建 - 菜单背景（createBackground）
//							x> 创建 - 帮助窗口（createHelpWindow）
//						
//						->面板
//							->2A背景前景（继承）
//							->2C音乐（继承）
//						->3A主体
//						->3B按钮组
//						->3C选项窗口
//						->3D选项管理
//			界面成员：
//						> ._backSprite1							背景1
//						> ._backSprite2							背景2
//						> ._commandWindow						标题选项窗口
//						> ._gameTitleSprite						标题前景贴图
//						> ._drill_field							内容层
//							>._drill_TSc_commandButtonSprite		按钮组贴图
//						> ._drill_outerLayer					外层
//			
//			说明：	> 此处专门控制 标题界面 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 标题界面控制 - 创建（继承）
//==============================
var _drill_TSc_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	_drill_TSc_create.call(this);
	this.drill_TSc_createAttr();				//创建 - 3A主体
	this.drill_TSc_createButton();				//创建 - 3B按钮组
												//创建 - 3C选项窗口（无）
												//创建 - 3D选项管理（无）
};
//==============================
// * 标题界面控制 - 帧刷新（继承）
//==============================
var _drill_TSc_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() { 
	_drill_TSc_update.call(this);
												//帧刷新 - 3A主体（无）
	this.drill_TSc_updateButton_OrgWindow();	//帧刷新 - 3B按钮组 - 原装窗口
	this.drill_TSc_updateButton_Btns();			//帧刷新 - 3B按钮组 - 标题选项按钮
												//帧刷新 - 3C选项窗口（无）
												//帧刷新 - 3D选项管理（无）
};

//==============================
// * 2A背景前景 - 创建前景 - 绘制文本（覆写）
//==============================
Scene_Title.prototype.drawGameTitle = function() {
	var x = DrillUp.g_TSc_text_x;
	var y = DrillUp.g_TSc_text_y;
	var maxWidth = Graphics.width;
	var text = $dataSystem.gameTitle;
	this._gameTitleSprite.bitmap.outlineColor = 'black';
	this._gameTitleSprite.bitmap.outlineWidth = DrillUp.g_TSc_text_outlineWidth;
	this._gameTitleSprite.bitmap.fontSize = DrillUp.g_TSc_text_fontsize;
	this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, DrillUp.g_TSc_text_fontsize/2, 'center');
	this._gameTitleSprite.visible = DrillUp.g_TSc_text_visible;
};
//==============================
// * 2C音乐 - 播放音乐（覆写）
//==============================
Scene_Title.prototype.playTitleMusic = function() {
	var bgm = {};
	bgm.name = DrillUp.g_TSc_bgm_list[ DrillUp.global_TSc_bgmId ];		//全局存储的音乐id
	bgm.pitch = 100;
	bgm.volume = 100;
	$dataSystem.titleBgm = bgm;
	
	AudioManager.playBgm($dataSystem.titleBgm);
	AudioManager.stopBgs();
	AudioManager.stopMe();
};

//==============================
// * 3A主体 - 创建
//==============================
Scene_Title.prototype.drill_TSc_createAttr = function() {
	this._drill_contextLayer = new Sprite();		//内容层
	this.addChild( this._drill_contextLayer );
	this._drill_outerLayer = new Sprite();			//外层
	this.addChild( this._drill_outerLayer );
};

//==============================
// * 3B按钮组 - 创建
//==============================
Scene_Title.prototype.drill_TSc_createButton = function() {
	if( DrillUp.g_TSc_command_mode != "按钮组模式" ){ return; }
	
	// > 参数监听
	var data_org = DrillUp.g_TSc_command_button;
	if( data_org['debug_search'] == true ){
		alert( "标题选项按钮集：\n" + JSON.stringify( this._commandWindow._list ));
	}
	
	// > 准备按钮组参数
	var data_style = JSON.parse(JSON.stringify( DrillUp.g_COSB_btn[DrillUp.global_TSc_commandButton_index] ));	//深拷贝数据
	if( data_style == undefined ){
		alert( DrillUp.drill_TSc_getPluginTip_NoSupportData_style( DrillUp.global_TSc_commandButton_index+1 ) );
	}else{
		var keys = Object.keys(data_org);
		for(var i = 0; i < keys.length; i++){	//（传入值）
			var key = keys[i];
			data_style[key] = data_org[key];
		}
		data_style['x'] = DrillUp.global_TSc_commandButton_x;
		data_style['y'] = DrillUp.global_TSc_commandButton_y;
		data_style['btn_src_default'] = data_style['btn_src_default_tank'][ DrillUp.global_TSc_commandButton_defaultId ];
	}
	
	// > 建立按钮组层
	var temp_sprite = new Drill_COSB_LayerSprite( data_style, this._commandWindow );
	this._drill_contextLayer.addChild( temp_sprite );
	this._drill_TSc_commandButtonSprite = temp_sprite;
}
//==============================
// * 3B按钮组 - 帧刷新 - 原装窗口
//==============================
Scene_Title.prototype.drill_TSc_updateButton_OrgWindow = function() {
	if( DrillUp.g_TSc_command_mode == "按钮组模式" ){
		this._commandWindow.y = Graphics.boxHeight * 2;
	}
	if( DrillUp.g_TSc_command_mode == "窗口模式" ){
		//（不操作，动画自己会帧刷新）
	}
}
//==============================
// * 3B按钮组 - 帧刷新 - 标题选项按钮
//==============================
Scene_Title.prototype.drill_TSc_updateButton_Btns = function() { 
	if( DrillUp.g_TSc_command_mode != "按钮组模式" ){ return; }
	
	// （暂无操作）（按钮组核心已经全部包揽）
}


//==============================
// * 3C选项窗口 - 属性 - 列数（覆写）
//==============================
Window_TitleCommand.prototype.maxCols = function() {
	return DrillUp.g_TSc_selWin_col;
};
//==============================
// * 3C选项窗口 - 属性 - 子项数量
//==============================
// （不操作）
//==============================
// * 3C选项窗口 - 属性 - 子项间距
//==============================
// （不操作）
//==============================
// * 3C选项窗口 - 属性 - 子项宽度
//==============================
// （不操作）
//==============================
// * 3C选项窗口 - 属性 - 子项高度
//==============================
// （不操作）
//==============================
// * 3C选项窗口 - 属性 - 3A命令窗口属性 - 对齐方式
//==============================
Window_TitleCommand.prototype.itemTextAlign = function() {
	return DrillUp.g_TSc_selWin_align;
};
//==============================
// * 3C选项窗口 - 初始化
//==============================
var _drill_title_window_createCommandWindow_init = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_drill_title_window_createCommandWindow_init.call(this);
	var i = DrillUp.global_TSc_styleId;		//全局存储的样式id
	var data = {
		"x": DrillUp.g_TSc_selWin_x,
		"y": DrillUp.g_TSc_selWin_y,
		"width": DrillUp.g_TSc_selWin_width,
		"height": DrillUp.g_TSc_selWin_height,
		"fontsize": DrillUp.g_TSc_selWin_fontsize,
		
		"slideMoveType": DrillUp.g_TSc_selWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_TSc_selWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_TSc_selWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_TSc_selWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_TSc_selWin_slideAnim['slideX'],
		"slideY": DrillUp.g_TSc_selWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_TSc_style_list[i]['layoutType'],
		"layoutX": DrillUp.g_TSc_style_list[i]['layoutX'],
		"layoutY": DrillUp.g_TSc_style_list[i]['layoutY'],
		"layoutSrc": DrillUp.g_TSc_style_list[i]['layoutSrc'],
		"layoutSrcFile": DrillUp.g_TSc_style_list[i]['layoutSrcFile'],
	}
	this._commandWindow.drill_COWA_changeParamData( data ); //『辅助核心初始化』-窗口基本属性
	this._commandWindow.hide = function(){ return null; };
	this._commandWindow.refresh();
	this._commandWindow.open();
	this._commandWindow.drill_COWA_resetAttrMove(); //『辅助核心动画』-重播窗口动画
	this._commandWindow.drill_COWA_resetAttrOpacity(); //『辅助核心动画』-重播窗口动画
};


//==============================
// * 3D选项管理 - 最后继承1级
//==============================
var _drill_TSc_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_TSc_scene_initialize.call(this);
	
	//==============================
	// * 3D选项管理 - 退出选项
	//==============================
	var _drill_TSc_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		_drill_TSc_createCommandWindow.call(this);
		this._commandWindow.setHandler('Drill_TSc_Quit',  this.drill_TSc_commandQuit.bind(this));
	};
	Scene_Title.prototype.drill_TSc_commandQuit = function() {
		this._commandWindow.close();
		//SceneManager.pop();
		SceneManager.exit();
	};
	var _drill_TSc_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		_drill_TSc_makeCommandList.call(this);
		if( DrillUp.g_TSc_quit_option == true ){ //（是否添加退出选项）
			this.addCommand(DrillUp.g_TSc_quit_text, 'Drill_TSc_Quit');
		}
	};
	//==============================
	// * 3D选项管理 - 继续选项/设置选项
	//==============================
	var _drill_TSc_makeCommandList2 = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		_drill_TSc_makeCommandList2.call(this);
		
		// > 隐藏'继续'选项
		if( DrillUp.g_TSc_continueAutoHide == true &&
			this.isContinueEnabled() == false ){
				
			var index = this.findSymbol('continue');
			this._list.splice( index, 1 );
		}
		
		// > 隐藏'设置'选项
		if( DrillUp.g_TSc_optionHide == true ){
			
			var index = this.findSymbol('options');
			this._list.splice( index, 1 );
		}
	};
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleScene = false;
		var pluginTip = DrillUp.drill_TSc_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}




