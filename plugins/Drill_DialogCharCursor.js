//=============================================================================
// Drill_DialogCharCursor.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        窗口字符 - 逐个绘制的文本光标
 * @author Drill_up
 * 
 * @Drill_LE_param "文本光标样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DCCu_style_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogCharCursor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在逐个绘制过程中，显示文本光标。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics              数学模型-弹道核心★★v1.5以上★★
 *   - Drill_CoreOfWindowCharacterSprite   窗口字符-窗口字符贴图核心
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__dialogCursor （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__dialogCursor文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 文本光标样式1 资源-文本光标
 * 文本光标样式2 资源-文本光标
 * 文本光标样式3 资源-文本光标
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   只作用于所有窗口字符。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于逐个绘制的文本光标.docx"。
 * 细节：
 *   (1.文本光标：文本域中确定下一个字符位置的竖线。
 *      每绘制一个新的字符，光标都会前进到下一个位置，并且光标可以换行。
 *   (2.文本光标只会在 文本域 进行 逐个绘制时 显示。
 * 设计：
 *   (1.如果要单独设计一个文本光标，没有必要，因为现有的4个基本能满足。
 *      文本光标需要结合实际应用场景来控制，关闭文本光标也是一种设计思路。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dDCCu[on]         之后的文本开启 文本光标。
 * 窗口字符：\dDCCu[off]        之后的文本关闭 文本光标。
 * 窗口字符：\dDCCu[set:1]      之后的文本开启并使用样式1的 文本光标。
 * 窗口字符：\dDCCu[reset]      之后的文本开启并使用默认样式的 文本光标。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCCu[set:1]光标\|测试\dDCCu[off]"，包裹的字符将会显示自定义文本光标。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>逐个绘制的文本光标 : 所有文本 : 文本光标开关 : 开启
 * 插件指令：>逐个绘制的文本光标 : 所有文本 : 文本光标开关 : 关闭
 * 插件指令：>逐个绘制的文本光标 : 所有文本 : 修改样式 : 样式[1]
 * 插件指令：>逐个绘制的文本光标 : 所有文本 : 恢复默认设置
 * 
 * 插件指令：>逐个绘制的文本光标 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>逐个绘制的文本光标 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>逐个绘制的文本光标 : 对话框 : 文本光标开关 : 开启
 * 插件指令：>逐个绘制的文本光标 : 对话框 : 文本光标开关 : 关闭
 * 插件指令：>逐个绘制的文本光标 : 对话框 : 修改样式 : 样式[1]
 * 插件指令：>逐个绘制的文本光标 : 对话框 : 恢复默认设置
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2.只有开了 逐个绘制 的文本域，才能看到文本光标。
 *   因为常规情况下的文本全是一次性绘制，根本看不到文本光标。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>逐个绘制的文本光标 : DEBUG文本光标测试 : 开启
 * 插件指令：>逐个绘制的文本光标 : DEBUG文本光标测试 : 关闭
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
 * 时间复杂度： o(n)
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【7.00ms】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该函数只在 逐个绘制 时生效并执行，地图界面的对话框经常使用此功能。
 *   所以地图界面的消耗会多一点点。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * 
 * @param ---全局默认值---
 * @desc 
 *
 * @param 所有文本-默认是否显示文本光标
 * @parent ---全局默认值---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后 逐个绘制时 会显示文本光标，此开关也可以通过插件指令控制。
 * @default false
 * 
 * @param 所有文本-默认文本光标样式
 * @parent ---全局默认值---
 * @type number
 * @min 1
 * @desc 逐个绘制时显示的光标样式。
 * @default 1
 * 
 * 
 * @param 对话框光标模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 自定义模式
 *
 * @param 对话框-是否显示文本光标
 * @parent 对话框光标模式
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后 逐个绘制时 会显示文本光标，此开关也可以通过插件指令控制。
 * @default true
 * 
 * @param 对话框-文本光标样式
 * @parent 对话框光标模式
 * @type number
 * @min 1
 * @desc 逐个绘制时显示的光标样式。
 * @default 4
 * 
 * 
 * @param ---文本光标样式集---
 * @default 
 * 
 * @param 文本光标样式-1
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-2
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-3
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-4
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-5
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-6
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-7
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-8
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-9
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-10
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-11
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-12
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-13
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-14
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-15
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-16
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-17
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-18
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-19
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-20
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-21
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-22
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-23
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-24
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-25
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-26
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-27
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-28
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-29
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-30
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-31
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-32
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-33
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-34
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-35
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-36
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-37
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-38
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-39
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 * @param 文本光标样式-40
 * @parent ---文本光标样式集---
 * @type struct<DrillDCCuStyle>
 * @desc 文本域光标的详细配置信息。
 * @default 
 * 
 */
/*~struct~DrillDCCuStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的文本光标样式==
 * 
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 偏移-文本光标 X
 * @parent ---常规---
 * @desc 以光标的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 偏移-文本光标 Y
 * @parent ---常规---
 * @desc 以光标的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 初始角度
 * @parent ---常规---
 * @type number
 * @min 0
 * @min 360
 * @desc 光标初始的旋转角度。
 * @default 0
 * 
 * @param 资源-文本光标
 * @parent ---常规---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default ["(需配置)光标"]
 * @require 1
 * @dir img/Special__dialogCursor/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---常规---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 每次绘制字符时是否重播GIF
 * @parent ---常规---
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播
 * @default false
 *
 * @param 混合模式
 * @parent ---常规---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 * 
 * 
 * @param ---位置---
 * @desc 
 *
 * @param 光标所在字符矩形位置
 * @parent ---位置---
 * @type select
 * @option 矩形中心
 * @value 矩形中心
 * @option 矩形左侧
 * @value 矩形左侧
 * @option 矩形右侧
 * @value 矩形右侧
 * @option 矩形上侧
 * @value 矩形上侧
 * @option 矩形下侧
 * @value 矩形下侧
 * @option 矩形左上角
 * @value 矩形左上角
 * @option 矩形左下角
 * @value 矩形左下角
 * @option 矩形右上角
 * @value 矩形右上角
 * @option 矩形右下角
 * @value 矩形右下角
 * @desc 光标所处的矩形的位置。矩形是指当前显示字符的矩形范围。
 * @default 矩形右侧
 * 
 * 
 * @param ---自变化效果---
 * @desc 
 *
 * @param 浮动效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @desc 当前选中的按钮，会来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 7.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 8
 *
 * @param 闪烁效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回闪烁。
 * @default 关闭
 * 
 * @param 闪烁速度
 * @parent 闪烁效果
 * @desc 闪烁明亮变化的速度。
 * @default 6.0
 * 
 * @param 闪烁幅度范围
 * @parent 闪烁效果
 * @type number
 * @min 1
 * @max 255
 * @desc 闪烁变化的透明度幅度范围。
 * @default 35
 *
 * @param 间断闪烁效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回闪烁。
 * @default 关闭
 * 
 * @param 间断闪烁亮起时间
 * @parent 间断闪烁效果
 * @type number
 * @min 1
 * @desc 闪烁变化的透明度幅度范围。
 * @default 6
 * 
 * @param 间断闪烁熄灭时间
 * @parent 间断闪烁效果
 * @type number
 * @min 1
 * @desc 闪烁变化的透明度幅度范围。
 * @default 4
 * 
 * @param 摇晃效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前选中的按钮，会来回摇晃。
 * @default 关闭
 * 
 * @param 摇晃速度
 * @parent 摇晃效果
 * @desc 来回摇晃变化的速度。
 * @default 8.0
 * 
 * @param 摇晃幅度范围
 * @parent 摇晃效果
 * @type number
 * @min 1
 * @desc 来回摇晃的幅度范围。单位角度。
 * @default 12
 *
 * @param 缩放效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右缩放
 * @value 左右缩放
 * @option 上下缩放
 * @value 上下缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 当前选中的按钮，会来回缩放。
 * @default 关闭
 * 
 * @param 缩放速度
 * @parent 缩放效果
 * @desc 缩放大小变化的速度。
 * @default 8.0
 * 
 * @param 缩放幅度范围
 * @parent 缩放效果
 * @desc 缩放变化的比例幅度范围。
 * @default 0.2
 * 
 * @param 持续自旋转
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前选中的按钮，会来回摇晃。
 * @default 关闭
 * 
 * @param 自旋转速度
 * @parent 持续自旋转
 * @desc 自旋转的旋转速度，单位角度/帧。
 * @default 10.0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCCu (Dialog_Char_Cursor)
//		临时全局变量	DrillUp.g_DCCu_xxx
//		临时局部变量	this._drill_DCCu_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2025/4/30：
//							》7.0ms（Drill_DCCu_Sprite.update）3.7ms（Drill_DCCu_Controller.drill_controller_update）
//		★最坏情况		暂无
//		★备注			暂无
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
//			->☆预加载
//			
//			->☆窗口字符应用之效果字符
//				> \dDCCu[on]
//				> \dDCCu[off]
//				> \dDCCu[set:1]
//				> \dDCCu[reset]
//			->☆全局默认值
//				->准备绘制配置（继承）
//			x->☆重置控制
//			
//			->☆文本光标实现
//				> @@@dcu[true]
//				> @@@dcu[false]
//				> @@@dcu[set:1]
//				> @@@dcu[reset]
//				->刷新字符块贴图（继承）
//				->清空字符块贴图（继承）
//				->帧刷新控制器
//				->每个字符开始时（继承）
//				->流程结束时（继承）
//			->☆文本光标控制器容器
//			
//			->文本光标控制器【Drill_DCCu_Controller】
//				->A主体
//				->D播放GIF
//				->E自变化效果
//			->文本光标贴图【Drill_DCCu_Sprite】
//				->A主体
//				->C对象绑定
//				->D播放GIF
//				->E自变化效果
//			
//			->☆DEBUG文本光标测试
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
	DrillUp.g_DCCu_PluginTip_curName = "Drill_DialogCharCursor.js 窗口字符-逐个绘制的文本光标";
	DrillUp.g_DCCu_PluginTip_baseList = ["Drill_CoreOfWindowCharacterSprite.js 窗口字符-窗口字符贴图核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCCu_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCCu_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCCu_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCCu_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCCu_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_DCCu_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_DCCu_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_DCCu_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_DCCu_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogCharCursor = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogCharCursor');
	
	
	//==============================
	// * 静态数据 - 文本光标样式
	//				（~struct~DrillDCCuStyle）
	//==============================
	DrillUp.drill_DCCu_initCursorStyle = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['visible'] = false;		//（默认不显示，这会影响第一个字符输出时是否显示光标）
		data['pause'] = false;
		
		// > 贴图
		if( dataFrom["资源-文本光标"] != "" &&
			dataFrom["资源-文本光标"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-文本光标"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Special__dialogCursor/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['char_replay'] = String( dataFrom["每次绘制字符时是否重播GIF"] || "false") == "true";
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = "最顶层";
		data['zIndex'] = 100;
		
		// > A主体
		data['x'] = Number( dataFrom["偏移-文本光标 X"] || 0);
		data['y'] = Number( dataFrom["偏移-文本光标 Y"] || 0);
		data['rotate'] = Number( dataFrom["初始角度"] || 0);
		
		// > B光标目标
		data['move_rectPos'] = String( dataFrom["光标所在字符矩形位置"] || "矩形中心");
		
		// > D播放GIF
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_initFrame'] = Number( dataFrom["锁定帧数"] || 0);
		
		// > E自变化效果
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_flicker2'] = String( dataFrom["间断闪烁效果"] || "关闭");
		data['effect_flicker2OnTime'] = Number( dataFrom["间断闪烁亮起时间"] || 6);
		data['effect_flicker2OffTime'] = Number( dataFrom["间断闪烁熄灭时间"] || 4);
		
		data['effect_swing'] = String( dataFrom["摇晃效果"] || "关闭");
		data['effect_swingSpeed'] = Number( dataFrom["摇晃速度"] || 4.0);
		data['effect_swingRange'] = Number( dataFrom["摇晃幅度范围"] || 12);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		data['effect_rotating'] = String( dataFrom["持续自旋转"] || "关闭");
		data['effect_rotatingSpeed'] = Number( dataFrom["自旋转速度"] || 10);
		
		return data;
	}
	
	/*-----------------文本光标样式------------------*/
	DrillUp.g_DCCu_style_list_length = 40;
	DrillUp.g_DCCu_style_list = [];
	for( var i = 0; i < DrillUp.g_DCCu_style_list_length; i++ ){
		if( DrillUp.parameters['文本光标样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['文本光标样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['文本光标样式-' + String(i+1) ]);
			DrillUp.g_DCCu_style_list[i] = DrillUp.drill_DCCu_initCursorStyle( data );
		}else{
			DrillUp.g_DCCu_style_list[i] = undefined;
		}
	}
	
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_DCCu_globalEnabled = String(DrillUp.parameters["所有文本-默认是否显示文本光标"] || "false") == "true"; 
	DrillUp.g_DCCu_globalStyleId = Number(DrillUp.parameters["所有文本-默认文本光标样式"] || 1);
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_DCCu_dialogMode = String(DrillUp.parameters["对话框光标模式"] || "与所有文本一致"); 
	DrillUp.g_DCCu_dialogEnabled = String(DrillUp.parameters["对话框-是否显示文本光标"] || "true") == "true"; 
	DrillUp.g_DCCu_dialogStyleId = Number(DrillUp.parameters["对话框-文本光标样式"] || 3);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacterSprite ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DCCu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCCu_pluginCommand.call(this, command, args);
	this.drill_DCCu_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCCu_pluginCommand = function( command, args ){
	if( command === ">逐个绘制的文本光标" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("样式[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "文本光标开关" ){
						if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
							$gameSystem._drill_DCCu_globalEnabled = true;
						}
						if( temp2 == "关闭" || temp2 == "禁用" ){
							$gameSystem._drill_DCCu_globalEnabled = false;
						}
					}
					if( temp1 == "修改样式" ){
						$gameSystem._drill_DCCu_globalStyleId = Number(temp2);
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCCu_globalEnabled = DrillUp.g_DCCu_globalEnabled;
						$gameSystem._drill_DCCu_globalStyleId = DrillUp.g_DCCu_globalStyleId;
					}
				}
			}
		}
		
		/*-----------------『全局默认值』对话框（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("样式[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改模式" ){
						$gameSystem._drill_DCCu_dialogMode = temp2;
					}
					if( temp1 == "文本光标开关" ){
						if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
							$gameSystem._drill_DCCu_dialogEnabled = true;
						}
						if( temp2 == "关闭" || temp2 == "禁用" ){
							$gameSystem._drill_DCCu_dialogEnabled = false;
						}
					}
					if( temp1 == "修改样式" ){
						$gameSystem._drill_DCCu_dialogStyleId = Number(temp2);
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCCu_dialogMode = DrillUp.g_DCCu_dialogMode;
						$gameSystem._drill_DCCu_dialogEnabled = DrillUp.g_DCCu_dialogEnabled;
						$gameSystem._drill_DCCu_dialogStyleId = DrillUp.g_DCCu_dialogStyleId;
					}
				}
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG文本光标测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCCu_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCCu_DebugEnabled = false;
				}
			}
			if( type == "DEBUG文本光标测试2" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCCu_Debug2Enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCCu_Debug2Enabled = false;
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
DrillUp.g_DCCu_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCCu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DCCu_sys_initialize.call(this);
	this.drill_DCCu_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCCu_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DCCu_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DCCu_saveEnabled == true ){	
		$gameSystem.drill_DCCu_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DCCu_initSysData();
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
Game_System.prototype.drill_DCCu_initSysData = function() {
	this.drill_DCCu_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DCCu_checkSysData = function() {
	this.drill_DCCu_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DCCu_initSysData_Private = function() {
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_DCCu_globalEnabled = DrillUp.g_DCCu_globalEnabled;		//所有文本 - 开关
	this._drill_DCCu_globalStyleId = DrillUp.g_DCCu_globalStyleId;		//所有文本 - 样式
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_DCCu_dialogMode = DrillUp.g_DCCu_dialogMode;			//对话框 - 模式
	this._drill_DCCu_dialogEnabled = DrillUp.g_DCCu_dialogEnabled;		//对话框 - 开关
	this._drill_DCCu_dialogStyleId = DrillUp.g_DCCu_dialogStyleId;		//对话框 - 样式
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCCu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCCu_globalEnabled == undefined ){
		this.drill_DCCu_initSysData();
	}
};


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_DCCu_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_DCCu_preload_initialize.call(this);
	this.drill_DCCu_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_DCCu_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_DCCu_preloadInit = function(){
	this._drill_DCCu_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_DCCu_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_DCCu_style_list.length; i++ ){
		var temp_data = DrillUp.g_DCCu_style_list[i];
		if( temp_data == undefined ){ continue; }
		
		for( var j = 0; j < temp_data['src_img_gif'].length; j++ ){
			this._drill_DCCu_preloadTank.push( 
				ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][j], 0, false, this._drill_DCCu_cacheId ) 
			);
		}
	}
}



//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置（继承）
//==============================
var _drill_COWC_DCCu_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DCCu_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDCCu" ){
		
		// > 『窗口字符定义』 - 文本光标 - 开启（\dDCCu[on]）
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" ){
				this.drill_COWC_effect_submitCombined( "@@@dcu[true]" );
				return;
			}
		}
		// > 『窗口字符定义』 - 文本光标 - 关闭（\dDCCu[off]）
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "OFF" ){
				this.drill_COWC_effect_submitCombined( "@@@dcu[false]" );
				return;
			}
		}
		// > 『窗口字符定义』 - 文本光标 - 设置样式（\dDCCu[set:1]）
		if( args.length == 2 ){
			if( String(args[0]).toUpperCase() == "SET" ){
				this.drill_COWC_effect_submitCombined( "@@@dcu[set:" + String(args[1]) + "]" );
				return;
			}
		}
		// > 『窗口字符定义』 - 文本光标 - 恢复样式（\dDCCu[reset]）
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "RESET" ){
				this.drill_COWC_effect_submitCombined( "@@@dcu[reset]" );
				return;
			}
		}
	}
};


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处提供 全局默认值，使得可以作用于所有文本。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 准备绘制配置（继承）
//
//			说明：	> 由于 Bitmap 没有存放相关参数，所以直接继承函数 drill_COCD_initOptions 进行初始化。
//==============================
var _drill_DCCu_COCD_drawTextInit = Game_Temp.prototype.drill_COCD_initOptions;
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	_drill_DCCu_COCD_drawTextInit.call( this, o_data, o_bitmap );
	if( $gameSystem == undefined ){ return; }
	
	// > 逐个绘制时 才执行
	if( o_bitmap == undefined ){ return; }
	if( o_bitmap.drill_COWC_timing_isPlaying() != true ){ return; }
	
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_enabled = $gameSystem._drill_DCCu_globalEnabled;					//开关
	var cur_styleId = $gameSystem._drill_DCCu_globalStyleId;					//样式
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( o_bitmap != undefined &&
		o_bitmap.drill_COWC_isInMessageWindow() ){
		
		if( $gameSystem._drill_DCCu_dialogMode == "自定义模式" ){
			cur_enabled = $gameSystem._drill_DCCu_dialogEnabled;				//开关
			cur_styleId = $gameSystem._drill_DCCu_dialogStyleId;				//样式
		}
	}
	
	// > 『全局默认值』 - 使用值
	if( o_data['blockParam']['DCCu_Visible'] == undefined ){ o_data['blockParam']['DCCu_Visible'] = cur_enabled; }
	if( o_data['blockParam']['DCCu_StyleId'] == undefined ){ o_data['blockParam']['DCCu_StyleId'] = cur_styleId; }
}



//=============================================================================
// ** ☆文本光标实现
//
//			说明：	> 此处对 字符绘制核心 底层进行扩展，支持光标功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 文本光标实现 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_DCCu_textBlock_processStyle_2 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_DCCu_textBlock_processStyle_2.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dcu" ){	//（大小写敏感）
		var type = "";
		if( args.length >= 1 ){
			type = String(args[0]);
		}
		
		// > 『底层字符定义』 - 文本光标 - 开启（@@@dcu[true]） drill_char_cursor
		if( type == "true" ){
			if( args.length == 1 ){
				cur_blockParam['DCCu_Visible'] = true;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		// > 『底层字符定义』 - 文本光标 - 关闭（@@@dcu[true]） drill_char_cursor
		if( type == "false" ){
			if( args.length == 1 ){
				cur_blockParam['DCCu_Visible'] = false;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		// > 『底层字符定义』 - 文本光标 - 设置样式（@@@dcu[set:1]） drill_char_cursor
		if( type == "set" ){
			if( args.length == 2 ){
				cur_blockParam['DCCu_Visible'] = true;
				cur_blockParam['DCCu_StyleId'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		// > 『底层字符定义』 - 文本光标 - 恢复样式（@@@dcu[reset]） drill_char_cursor
		if( type == "reset" ){
			if( args.length == 1 ){
				cur_blockParam['DCCu_Visible'] = true;
				cur_blockParam['DCCu_StyleId'] = $gameSystem._drill_DCCu_globalStyleId;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}

//==============================
// * 文本光标实现 - 刷新字符块贴图（继承）
//==============================
var _drill_DCCu_COWCSp_sprite_refreshAllSprite = Sprite.prototype.drill_COWCSp_sprite_refreshAllSprite;
Sprite.prototype.drill_COWCSp_sprite_refreshAllSprite = function(){
	
	// > 必须先创建
	//		（因为要添加到 添加自定义子贴图容器 中）
	//		（只要开了逐个绘制，就必然 创建贴图）
	if( this.bitmap != undefined &&
		this.bitmap.drill_COWC_timing_isPlaying() == true ){	//（『字符逐个绘制流程』 - 是否处于逐个绘制流程中）
		
		this.drill_DCCu_createLayer();
	}
	
	// > 原函数
	_drill_DCCu_COWCSp_sprite_refreshAllSprite.call( this );
}
//==============================
// * 文本光标实现 - 清空字符块贴图（继承）
//==============================
var _drill_DCCu_COWCSp_sprite_clearAllSprite = Sprite.prototype.drill_COWCSp_sprite_clearAllSprite;
Sprite.prototype.drill_COWCSp_sprite_clearAllSprite = function(){
	_drill_DCCu_COWCSp_sprite_clearAllSprite.call( this );
	//（原函数会执行 removeChild ）
	
	this.drill_DCCu_removeLayer();
}
//==============================
// * 文本光标实现 - 创建
//==============================
Sprite.prototype.drill_DCCu_createLayer = function(){
	
	// > 创建 文本光标控制器
	var controller = new Drill_DCCu_Controller();
	var serial = this.bitmap.drill_COWC_timing_getSerial();
	$gameTemp.drill_DCCu_addController( serial, controller );
	
	// > 创建 文本光标贴图
	var temp_sprite = new Drill_DCCu_Sprite();
	temp_sprite.drill_sprite_setController( controller );
	temp_sprite.drill_sprite_initChild();
	
	
	// > 『字符贴图流程』 - 添加自定义子贴图【窗口字符 - 窗口字符贴图核心】
	this.drill_COWCSp_sprite_addCustomSprite( temp_sprite );
	
	// > 指针关联
	this._drill_DCCu_controller = controller;
	this._drill_DCCu_sprite = temp_sprite;
	this.bitmap._drill_DCCu_inBitmapSprite = temp_sprite;
}
//==============================
// * 文本光标实现 - 移除
//==============================
Sprite.prototype.drill_DCCu_removeLayer = function(){
	
	if( this._drill_DCCu_sprite != undefined ){
		
		// > 『字符贴图流程』 - 移除自定义子贴图【窗口字符 - 窗口字符贴图核心】
		this.drill_COWCSp_sprite_removeCustomSprite( this._drill_DCCu_sprite );
		
		// > 移除 指针关联
		this._drill_DCCu_sprite = undefined;
	}
	if( this.bitmap != undefined &&
		this.bitmap._drill_DCCu_inBitmapSprite != undefined ){
		this.bitmap._drill_DCCu_inBitmapSprite = undefined;
	}
	if( this._drill_DCCu_controller != undefined ){
		this._drill_DCCu_controller = undefined;
	}
}
//==============================
// * 文本光标实现 - 帧刷新（继承）
//==============================
var _drill_DCCu_sprite_update = Sprite.prototype.update;
Sprite.prototype.update = function(){
	_drill_DCCu_sprite_update.call( this );
	
	// > 帧刷新控制器
	if( this._drill_DCCu_controller != undefined ){
		this._drill_DCCu_controller.drill_controller_update();
	}
}
//==============================
// * 文本光标实现 - 每个字符开始时（继承）
//==============================
var _drill_DCCu_COWC_timing_textStart = Bitmap.prototype.drill_COWC_timing_textStart;
Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
	_drill_DCCu_COWC_timing_textStart.call( this, textBlock, row_index, text_index );
	
	// > 『字符逐个绘制流程』 - 获取当前画布序列号
	var serial = this.drill_COWC_timing_getSerial();
	var controller = $gameTemp.drill_DCCu_getController( serial );
	if( controller != undefined ){
		
		// > 获取字符的配置
		var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
		var visible = cur_blockParam['DCCu_Visible'];		//『绘制过程定义』 - 开启（@@@dcu[true]）
		if( visible == undefined ){ visible = false; }
		var style_id = cur_blockParam['DCCu_StyleId'];		//『绘制过程定义』 - 设置样式（@@@dcu[set:1]）
		if( style_id == undefined ){ style_id = $gameSystem._drill_DCCu_globalStyleId; }
		
		// > 控制器赋值
		controller.drill_controller_setStyleId( style_id );	//（先赋值样式，再赋值其它，因为样式刷新会覆盖参数）
		controller.drill_controller_setPosRect(
			textBlock.drill_textBlock_getX(),
			textBlock.drill_textBlock_getY(),
			textBlock.drill_textBlock_getWidth(),
			textBlock.drill_textBlock_getHeight()
		);
		controller.drill_controller_setVisible( visible );
	}
}
//==============================
// * 文本光标实现 - 流程结束时（继承）
//==============================
var _drill_DCCu_COWC_timing_allEnd = Bitmap.prototype.drill_COWC_timing_allEnd;
Bitmap.prototype.drill_COWC_timing_allEnd = function( rowBlock_list ){
	_drill_DCCu_COWC_timing_allEnd.call( this, rowBlock_list );
	
	// > 『字符逐个绘制流程』 - 获取当前画布序列号
	var serial = this.drill_COWC_timing_getSerial();
	var controller = $gameTemp.drill_DCCu_getController( serial );
	if( controller != undefined ){
		controller.drill_controller_destroy();	//销毁
	}
}


//=============================================================================
// ** ☆文本光标控制器容器
//
//			说明：	> 每个画布对应一个控制器，通过画布的序列号来关联控制器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_DCCu_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_DCCu_temp_initialize.call(this);
	this._drill_DCCu_controllerTank = {};
};
//==============================
// * 容器 - 添加控制器
//==============================
Game_Temp.prototype.drill_DCCu_addController = function( serial, controller ){
	this._drill_DCCu_controllerTank[ serial ] = controller;
};
//==============================
// * 容器 - 获取控制器
//==============================
Game_Temp.prototype.drill_DCCu_getController = function( serial ){
	return this._drill_DCCu_controllerTank[ serial ];
};




//=============================================================================
// ** 文本光标控制器【Drill_DCCu_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个专门控制光标的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					
// **					->A主体
// **					->B光标前进
// **						->当前目标矩形
// **					->D播放GIF
// **						->设置帧
// **						->锁定帧/解锁帧
// **						->单次播放
// **					->E自变化效果
// **						> 主体贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>摇晃效果
// **						> GIF层>缩放效果
// **						> GIF层>持续自旋转
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_DCCu_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_DCCu_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_DCCu_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	this.drill_controller_initChange();										//初始化子功能 - B光标前进（特殊）
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_DCCu_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();				//帧刷新 - A主体
	this.drill_controller_updateChange();			//帧刷新 - B光标前进
	this.drill_controller_updateGIF();				//帧刷新 - D播放GIF
	this.drill_controller_updateEffect();			//帧刷新 - E自变化效果
	this.drill_controller_updateCheckNaN();			//帧刷新 - A主体 - 校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_DCCu_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_DCCu_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_DCCu_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_DCCu_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_DCCu_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * A主体 - 设置样式【标准函数】
//
//			参数：	> style_id 数字
//			返回：	> 无
//##############################
Drill_DCCu_Controller.prototype.drill_controller_setStyleId = function( style_id ){
	if( this._drill_curStyleId == style_id ){ return; }
	this._drill_curStyleId = style_id;
	if( style_id > 0 ){
		
		// > 『控制器与贴图的样式』 - 校验+提示信息（自变化）
		var cur_styleId   = style_id;
		var cur_styleData = DrillUp.g_DCCu_style_list[ style_id -1 ];
		if( cur_styleData == undefined ){
			alert( DrillUp.drill_DCCu_getPluginTip_StyleNotFind(cur_styleId) );
			return;
		}
		
		// > 『控制器与贴图的样式』 - 重设数据
		this.drill_controller_resetData( cur_styleData );
	}
};
//##############################
// * B光标前进 - 设置当前目标矩形【标准函数】
//
//			参数：	> x, y, width, height 矩形范围
//			返回：	> 无
//##############################
Drill_DCCu_Controller.prototype.drill_controller_setPosRect = function( x, y, width, height ){
	if( width  == 0 ){ return; }
	if( height == 0 ){ return; }
	this._drill_rect_enabled = true;
	this._drill_rect_x = x;
	this._drill_rect_y = y;
	this._drill_rect_width = width;
	this._drill_rect_height = height;
	
	// > 重播GIF
	var data = this._drill_data;
	if( data['char_replay'] == true ){
		this.drill_controller_GIF_setFrame( 0 );
	}
};

//##############################
// * D播放GIF - 设置帧【标准函数】
//
//			参数：	> cur_frame 数字（当前帧）
//			返回：	> 无
//			
//			说明：	> 从帧数0开始计数。
//##############################
Drill_DCCu_Controller.prototype.drill_controller_GIF_setFrame = function( cur_frame ){
	var data = this._drill_data;
	
	// > 设置帧
	this._drill_GIF_time = cur_frame * data['interval'];
	if( this._drill_GIF_time < 0 ){ this._drill_GIF_time = 0; }
	
	// > 刷新索引
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
};
//##############################
// * D播放GIF - 锁定帧/解锁帧【标准函数】
//
//			参数：	> locked 布尔
//			返回：	> 无
//##############################
Drill_DCCu_Controller.prototype.drill_controller_GIF_setLocked = function( locked ){
	var data = this._drill_data;
	data['gif_lock'] = locked;
	this._drill_GIF_oncePlay = false;
};
//##############################
// * D播放GIF - 单次播放【标准函数】
//
//			参数：	> once_type 字符串（forwardRun正向播放/backRun反向播放）
//			返回：	> 无
//##############################
Drill_DCCu_Controller.prototype.drill_controller_GIF_setOncePlay = function( once_type ){
	var data = this._drill_data;
	this._drill_GIF_oncePlay = true;
	this._drill_GIF_onceType = once_type;
	this._drill_GIF_time = 0;
	this._drill_GIF_onceTarTime = data['src_img_gif'].length * data['interval'];
};

//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_DCCu_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };									//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };										//控制器 - 暂停情况
	
	// > 贴图
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };								//贴图 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Special__dialogCursor/" };	//贴图 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };									//贴图 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };								//贴图 - 是否倒放
	if( data['char_replay'] == undefined ){ data['char_replay'] = false };							//贴图 - 每次绘制字符时是否重播GIF
	
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//贴图 - 混合模式
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//贴图 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//贴图 - 图像-模糊边缘
	
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "最顶层" };							//贴图 - 地图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };													//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//A主体 - 平移Y
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };										//A主体 - 初始角度
	
	// > B光标前进
	if( data['move_rectPos'] == undefined ){ data['move_rectPos'] = "矩形中心" };					//B光标前进 - 指针所在矩形位置
	
	// > D播放GIF
	if( data['gif_lock'] == undefined ){ data['gif_lock'] = false };								//D播放GIF - 初始是否锁定帧
	if( data['gif_initFrame'] == undefined ){ data['gif_initFrame'] = 0 };							//D播放GIF - 锁定帧数
	
	// > E自变化效果
	//	（见 静态数据）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_DCCu_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	//this.drill_controller_initChange();		//初始化子功能 - B光标前进（特殊，只在类创建时执行一次，重刷指针样式时不执行）
	this.drill_controller_refreshChange();		//初始化子功能 - B光标前进
	this.drill_controller_initGIF();			//初始化子功能 - D播放GIF
	this.drill_controller_initEffect();			//初始化子功能 - E自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_DCCu_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	
	// > 帧刷新一次（切换样式后，光标位置会归位，帧刷新能将光标重置到新位置）
	this.drill_controller_update();
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_DCCu_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	//this._drill_curStyleId = 0;		//常规 - 当前样式（这个参数不要赋值，防止被反复重刷）
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_DCCu_Controller.prototype.drill_controller_updateAttr = function() {
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_DCCu_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_DCCu_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_DCCu_checkNaN = false;
			alert( DrillUp.drill_DCCu_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_DCCu_checkNaN = false;
			alert( DrillUp.drill_DCCu_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_DCCu_checkNaN = false;
			alert( DrillUp.drill_DCCu_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_DCCu_checkNaN = false;
			alert( DrillUp.drill_DCCu_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_DCCu_checkNaN = false;
			alert( DrillUp.drill_DCCu_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}


//==============================
// * B光标前进 - 初始化子功能
//==============================
Drill_DCCu_Controller.prototype.drill_controller_initChange = function() {
	
	// > 贴图 - 位置
	this._drill_rect_enabled = false;
	this._drill_rect_x = 0;
	this._drill_rect_y = 0;
	this._drill_rect_width = 0;
	this._drill_rect_height = 0;
}
//==============================
// * B光标前进 - 刷新子功能
//==============================
Drill_DCCu_Controller.prototype.drill_controller_refreshChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	this._drill_x = 0;
	this._drill_y = 0;
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	
	// > 透明度
	this._drill_opacity = 255;
	
	// > 贴图 - 旋转
	this._drill_rotation = data['rotate'];		//父贴图（整体再旋转角度）
}
//==============================
// * B光标前进 - 帧刷新
//==============================
Drill_DCCu_Controller.prototype.drill_controller_updateChange = function(){
	var data = this._drill_data;
	
	// > 可见控制
	this._drill_visible = data['visible'];
	if( this._drill_rect_enabled != true ){
		this._drill_visible = false;
		return;
	}
	
	// > 位置
	var xx = this._drill_rect_x;
	var yy = this._drill_rect_y;
	xx += data['x'];	//（偏移值）
	yy += data['y'];
	
	xx += this._drill_rect_width *0.5;	//（先将位置挪到 矩形中心）
	yy -= this._drill_rect_height *0.5;
	if( data['move_rectPos'] == "矩形左侧" ){
		xx -= this._drill_rect_width *0.5;
	}else if( data['move_rectPos'] == "矩形右侧" ){
		xx += this._drill_rect_width *0.5;
	}else if( data['move_rectPos'] == "矩形上侧" ){
		yy -= this._drill_rect_height *0.5;
	}else if( data['move_rectPos'] == "矩形下侧" ){
		yy += this._drill_rect_height *0.5;
	}else if( data['move_rectPos'] == "矩形左上角" ){
		xx -= this._drill_rect_width *0.5;
		yy -= this._drill_rect_height *0.5;
	}else if( data['move_rectPos'] == "矩形左下角" ){
		xx -= this._drill_rect_width *0.5;
		yy += this._drill_rect_height *0.5;
	}else if( data['move_rectPos'] == "矩形右上角" ){
		xx += this._drill_rect_width *0.5;
		yy -= this._drill_rect_height *0.5;
	}else if( data['move_rectPos'] == "矩形右下角" ){
		xx += this._drill_rect_width *0.5;
		yy += this._drill_rect_height *0.5;
	}
	
	this._drill_x = xx;
	this._drill_y = yy;
}


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_DCCu_Controller.prototype.drill_controller_initGIF = function() {
	var data = this._drill_data;
	
	// > 播放GIF
	this.drill_controller_GIF_setFrame( data['gif_initFrame'] -1 );		//播放GIF - 当前时间
	this._drill_GIF_index = 0;											//播放GIF - 当前索引
	
	// > 单次播放
	this._drill_GIF_oncePlay = false;
	this._drill_GIF_onceType = "forwardRun";	//（forwardRun正向播放/backRun反向播放）
	this._drill_GIF_onceTarTime = 0;
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_DCCu_Controller.prototype.drill_controller_updateGIF = function(){
	var data = this._drill_data;
	
	// > 单次播放
	if( this._drill_GIF_oncePlay == true ){
		
		// > 播放GIF
		var inter = this._drill_GIF_time;
		inter = inter / data['interval'];
		inter = Math.floor(inter);
		inter = inter % data['src_img_gif'].length;
		if( this._drill_GIF_onceType == "backRun" ){
			inter = data['src_img_gif'].length - 1 - inter;
		}
		this._drill_GIF_index = Math.floor(inter);
		
		// > 时间+1（放后面）
		this._drill_GIF_time += 1;
		
		// > 播放完毕后，锁定帧
		if( this._drill_GIF_time > this._drill_GIF_onceTarTime ){
			this._drill_GIF_oncePlay = false;
			this.drill_controller_GIF_setLocked( true );
		}
		return;
	}
	
	
	// > 锁定帧时（注意，锁定帧时 _drill_GIF_index 不刷新）
	if( data['gif_lock'] == true ){ return; }
	
	// > 播放GIF
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
	
	// > 时间+1（放后面）
	this._drill_GIF_time += 1;
}


//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_DCCu_Controller.prototype.drill_controller_initEffect = function() {
	var data = this._drill_data;
	this._drill_curEffectTime = 0;
	
	this._drill_childGIF_rotation = 0;									//子贴图（自旋转）
	this._drill_childGIF_rotateSpeed = data['effect_rotatingSpeed'];	//子贴图（自旋转速度）
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_DCCu_Controller.prototype.drill_controller_updateEffect = function(){
	var data = this._drill_data;
	this._drill_curEffectTime += 1;
	
	// > 贴图 - 旋转（子贴图）
	if( data['effect_rotating'] == "开启" ){
		this._drill_childGIF_rotation += this._drill_childGIF_rotateSpeed;
	}
}



//=============================================================================
// ** 文本光标贴图【Drill_DCCu_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个文本光标贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					
// **					->A主体
// **					->B光标前进
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D播放GIF
// **					->E自变化效果
// **						> 主体贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>摇晃效果
// **						> GIF层>缩放效果
// **						> GIF层>持续自旋转
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个 ] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 直接隐藏，不考虑销毁。
// **				> 样式 - [不可修改/ ●自变化 /外部变化] 
//=============================================================================
//==============================
// * 文本光标贴图 - 定义
//==============================
function Drill_DCCu_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_DCCu_Sprite.prototype = Object.create(Sprite.prototype);
Drill_DCCu_Sprite.prototype.constructor = Drill_DCCu_Sprite;
//==============================
// * 文本光标贴图 - 初始化
//==============================
Drill_DCCu_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 文本光标贴图 - 帧刷新
//==============================
Drill_DCCu_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B光标前进
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateGIF();					//帧刷新 - D播放GIF
	this.drill_sprite_updateEffect();				//帧刷新 - E自变化效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_DCCu_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_DCCu_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B光标前进
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initGIF();				//初始化子功能 - D播放GIF
	this.drill_sprite_initEffect();				//初始化子功能 - E自变化效果
};

//##############################
// * 文本光标贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_DCCu_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 文本光标贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_DCCu_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;		//（由于场景复杂，且指针只有一个，此处不优化）
};
//##############################
// * 文本光标贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_DCCu_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 文本光标贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_DCCu_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 文本光标贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 文本光标贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childGIFSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childGIFSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B光标前进
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - D播放GIF
	//	（无）
	
};
//==============================
// * 文本光标贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = false;
	this.blendMode = data['blendMode'];
	this.layerIndex = data['layerIndex'];
	this.zIndex = data['zIndex'];
	
	
	// > 资源对象组
	this._drill_bitmapTank = [];
	for(var j = 0; j < data['src_img_gif'].length; j++ ){
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_gif'][j], data['tint'], data['smooth'] );
		this._drill_bitmapTank.push( bitmap );
	}
	
	// > GIF 贴图
	var temp_sprite = new Sprite(); 
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.blendMode = data['blendMode'];
	temp_sprite.bitmap = this._drill_bitmapTank[0];
	this._drill_childGIFSprite = temp_sprite;
	
	// > GIF 层
	var temp_layer = new Sprite();		//GIF样式两层容器
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	temp_layer.blendMode = data['blendMode'];
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_childGIFSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 序列号不一致时，重刷贴图
	if( this._drill_curSerial != this._drill_controller._drill_controllerSerial ){
		
		// > 销毁子功能
		this.drill_sprite_destroyChild();
		
		// > 初始化子功能
		this.drill_sprite_initChild();
		
		this._drill_curSerial =  this._drill_controller._drill_controllerSerial;
	}
	
	// > 可见
	this.visible = this._drill_controller._drill_visible;
	if( this.drill_sprite_isNeedDestroy() ){
		this.visible = false;	//（直接隐藏，不考虑销毁）
		return;
	}
	
	// > 缩放
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	
	// > 透明度
	this.opacity = this._drill_controller._drill_opacity;
	
	// > 旋转
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;	//（整体再旋转角度)
	this._drill_childGIFSprite.rotation = this._drill_controller._drill_childGIF_rotation *Math.PI/180;
}


//==============================
// * B光标前进 - 初始化子功能
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B光标前进 - 帧刷新
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置 - 层级位置修正
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	this.x = xx;
	this.y = yy;
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_initGIF = function(){
	var data = this._drill_controller._drill_data;
	//	（无）
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_updateGIF = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图Bitmap
	this._drill_childGIFSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
}

//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_initEffect = function() {
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_DCCu_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller._drill_data;
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
		this.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x -= value;
		this.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 间断闪烁效果
	if( data['effect_flicker2'] == "开启" ){
		var time1 = data['effect_flicker2OnTime'];
		var time2 = data['effect_flicker2OffTime'];
		if( (cur_time % (time1 + time2)) < time1 ){
			this.opacity = 255;
		}else{
			this.opacity = 0;
		}
	}
	// > 摇晃效果
	if( data['effect_swing'] == "开启" ){
		var speed = data['effect_swingSpeed'];
		var range = data['effect_swingRange'];
		var value = range / 180 * Math.PI * Math.sin( cur_time * speed /180*Math.PI );
		this.rotation += value;
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
		this._drill_layerSprite.scale.y += value;
	}
	// > 持续自旋转
	//	（见 drill_sprite_updateAttr ）
}



//=============================================================================
// ** ☆DEBUG文本光标测试
//
//			说明：	> 此模块控制 DEBUG文本光标测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG文本光标测试 - 帧刷新（地图界面）
//==============================
var _drill_DCCu_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DCCu_debug_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCCu_DebugEnabled == true ){
		$gameTemp._drill_DCCu_DebugEnabled = undefined;
		this.drill_DCCu_createDebugSprite();
	}
	if( $gameTemp._drill_DCCu_Debug2Enabled == true ){
		$gameTemp._drill_DCCu_Debug2Enabled = undefined;
		this.drill_DCCu_createDebug2Sprite();
	}
	
	// > 帧刷新贴图
	this.drill_DCCu_updateDebugWindow();
	
	// > 销毁贴图
	if( $gameTemp._drill_DCCu_DebugEnabled == false ){
		$gameTemp._drill_DCCu_DebugEnabled = undefined;
		if( this._drill_DCCu_DebugSprite_1 != undefined ){
			this.removeChild(this._drill_DCCu_DebugSprite_1);
			this._drill_DCCu_DebugSprite_1 = undefined;
		}
		if( this._drill_DCCu_DebugSprite_2 != undefined ){
			this.removeChild(this._drill_DCCu_DebugSprite_2);
			this._drill_DCCu_DebugSprite_2 = undefined;
		}
		if( this._drill_DCCu_DebugSprite_3 != undefined ){
			this.removeChild(this._drill_DCCu_DebugSprite_3);
			this._drill_DCCu_DebugSprite_3 = undefined;
		}
		if( this._drill_DCCu_DebugSprite_4 != undefined ){
			this.removeChild(this._drill_DCCu_DebugSprite_4);
			this._drill_DCCu_DebugSprite_4 = undefined;
		}
	}
	if( $gameTemp._drill_DCCu_Debug2Enabled == false ){
		$gameTemp._drill_DCCu_Debug2Enabled = undefined;
		if( this._drill_DCCu_Debug2Sprite != undefined ){
			this.removeChild(this._drill_DCCu_Debug2Sprite);
			this._drill_DCCu_Debug2Sprite = undefined;
		}
	}
}
//==============================
// * DEBUG文本光标测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_DCCu_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCCu_DebugSprite_1 != undefined ){
		this.removeChild(this._drill_DCCu_DebugSprite_1);
		this._drill_DCCu_DebugSprite_1 = undefined;
	}
	if( this._drill_DCCu_DebugSprite_2 != undefined ){
		this.removeChild(this._drill_DCCu_DebugSprite_2);
		this._drill_DCCu_DebugSprite_2 = undefined;
	}
	if( this._drill_DCCu_DebugSprite_3 != undefined ){
		this.removeChild(this._drill_DCCu_DebugSprite_3);
		this._drill_DCCu_DebugSprite_3 = undefined;
	}
	if( this._drill_DCCu_DebugSprite_4 != undefined ){
		this.removeChild(this._drill_DCCu_DebugSprite_4);
		this._drill_DCCu_DebugSprite_4 = undefined;
	}
	
	// > 创建贴图1
	var temp_sprite_1 = new Sprite();
	temp_sprite_1.x = 100;
	temp_sprite_1.y = 20;
	this.addChild( temp_sprite_1 );	//（直接加在最顶层的上面）
	this._drill_DCCu_DebugSprite_1 = temp_sprite_1;
	
	var temp_bitmap_1 = new Bitmap(600,120);
	temp_bitmap_1.fillRect( 0, 0, this.width, this.height, "#000000" );
	temp_sprite_1.bitmap = temp_bitmap_1;
	
	// > 创建贴图2
	var temp_sprite_2 = new Sprite();
	temp_sprite_2.x = 100;
	temp_sprite_2.y = 160;
	this.addChild( temp_sprite_2 );	//（直接加在最顶层的上面）
	this._drill_DCCu_DebugSprite_2 = temp_sprite_2;
	
	var temp_bitmap_2 = new Bitmap(600,120);
	temp_bitmap_2.fillRect( 0, 0, this.width, this.height, "#000000" );
	temp_sprite_2.bitmap = temp_bitmap_2;
	
	// > 创建贴图3
	var temp_sprite_3 = new Sprite();
	temp_sprite_3.x = 100;
	temp_sprite_3.y = 300;
	this.addChild( temp_sprite_3 );	//（直接加在最顶层的上面）
	this._drill_DCCu_DebugSprite_3 = temp_sprite_3;
	
	var temp_bitmap_3 = new Bitmap(600,120);
	temp_bitmap_3.fillRect( 0, 0, this.width, this.height, "#000000" );
	temp_sprite_3.bitmap = temp_bitmap_3;
	
	// > 创建贴图4
	var temp_sprite_4 = new Sprite();
	temp_sprite_4.x = 100;
	temp_sprite_4.y = 440;
	this.addChild( temp_sprite_4 );	//（直接加在最顶层的上面）
	this._drill_DCCu_DebugSprite_4 = temp_sprite_4;
	
	var temp_bitmap_4 = new Bitmap(600,120);
	temp_bitmap_4.fillRect( 0, 0, this.width, this.height, "#000000" );
	temp_sprite_4.bitmap = temp_bitmap_4;
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap_1.width;
	options['infoParam']['canvasHeight'] = temp_bitmap_1.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了）
	
	
	// > 绘制 - 测试的字符
	var text =  "\\dDCCu[set:1]【" + DrillUp.g_DCCu_PluginTip_curName + "】\n" + 
				"》当前测试 文本光标样式1 的效果，接下来会等待6秒。\\w[240]\n" + 
				"绘制结束后光标会消失。\n";
	
	// > 『字符逐个绘制流程』 - 设置计时器间隔
	temp_bitmap_1.drill_COWC_timing_setPerTick( 8 );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	temp_bitmap_1.drill_COWC_timing_initDrawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_sprite_1.drill_COWCSp_sprite_refreshAllSprite();
	}
	
	
	// > 绘制 - 测试的字符
	var text =  "\\dDCCu[set:2]【" + DrillUp.g_DCCu_PluginTip_curName + "】\n" + 
				"》当前测试 文本光标样式2 的效果，接下来会等待6秒。\\w[240]\n" + 
				"绘制结束后光标会消失。\n";
	
	// > 『字符逐个绘制流程』 - 设置计时器间隔
	temp_bitmap_2.drill_COWC_timing_setPerTick( 8 );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	temp_bitmap_2.drill_COWC_timing_initDrawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_sprite_2.drill_COWCSp_sprite_refreshAllSprite();
	}
	
	
	// > 绘制 - 测试的字符
	var text =  "\\dDCCu[set:3]【" + DrillUp.g_DCCu_PluginTip_curName + "】\n" + 
				"》当前测试 文本光标样式3 的效果，接下来会等待6秒。\\w[240]\n" + 
				"绘制结束后光标会消失。\n";
	
	// > 『字符逐个绘制流程』 - 设置计时器间隔
	temp_bitmap_3.drill_COWC_timing_setPerTick( 8 );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	temp_bitmap_3.drill_COWC_timing_initDrawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_sprite_3.drill_COWCSp_sprite_refreshAllSprite();
	}
	
	
	// > 绘制 - 测试的字符
	var text =  "\\dDCCu[set:4]【" + DrillUp.g_DCCu_PluginTip_curName + "】\n" + 
				"》当前测试 文本光标样式4 的效果，接下来会等待6秒。\\w[240]\n" + 
				"绘制结束后光标会消失。\n";
	
	// > 『字符逐个绘制流程』 - 设置计时器间隔
	temp_bitmap_4.drill_COWC_timing_setPerTick( 8 );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	temp_bitmap_4.drill_COWC_timing_initDrawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_sprite_4.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * DEBUG文本光标测试 - 创建贴图2（底层字符）
//==============================
Scene_Map.prototype.drill_DCCu_createDebug2Sprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCCu_Debug2Sprite != undefined ){
		this.removeChild(this._drill_DCCu_Debug2Sprite);
		this._drill_DCCu_Debug2Sprite = undefined;
	}
	
	// > 创建贴图
	var temp_sprite = new Sprite();
	temp_sprite.x = 50;
	temp_sprite.y = 60;
	this.addChild( temp_sprite );	//（直接加在最顶层的上面）
	this._drill_DCCu_Debug2Sprite = temp_sprite;
	
	// > 绘制 - DEBUG显示画布范围
	var temp_bitmap = new Bitmap(716,500);
	temp_bitmap.fillRect( 0, 0, this.width, this.height, "#000000" );
	temp_bitmap.drill_COWC_debug_drawRect();
	temp_sprite.bitmap = temp_bitmap;
	
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
	
	//options['baseParam']['textColor'] = "#8bc3ea";
	options['baseParam']['textColor'] = "#ffffff";
	options['baseParam']['fontFace'] = "Courier New";
	
	// > 绘制 - 测试的字符
	var text =  "\\dDCCu[set:2]\\>╔══════════════════════════════════════════════════════════════╗<br>" + 
				"\\>║  DRILL BIOS Configuration (C) 2024-2025, Small Alice Happy.  ║<br>" + 
				"\\>╠════════════════════════════════╤═════════════════════════════╣<br>" + 
				"\\>║ Main Processor   : 00386DX     │ Base Memory Size  : 640 KB  ║<br>" + 
				"\\>║ Numeric Processor: None        │ Ext. Memory Size  : 7424 KB ║<br>" + 
				"\\>║ Floppy Drive A   : 1.44MB,3½\"  │ Hard Disk C       : 47      ║<br>" + 
				"\\>║ Floppy Drive B   : 1.2 MB,5¼\"  │ Hard Disk D       : None    ║<br>" + 
				"\\>║ Display Type     : VGA/PGA/EGA │ Serial Port(s)    : 3F8,2F8 ║<br>" + 
				"\\>║ DRILL BIOS Date  : 2025/2/27   │ Parallel Port(s)  : 378     ║<br>" + 
				"\\>╚════════════════════════════════╧═════════════════════════════╝<br>" + 
				"128KB CACHE MEMORY<br>" + 
				"40MHZ CPU Clock<br>" + 
				"正在启动 Drill-DOS操作系统 \\|.\\|.\\|.<br><br>" + 
				"<br>";
	
	// > 『字符逐个绘制流程』 - 设置计时器间隔
	temp_bitmap.drill_COWC_timing_setPerTick( 4 );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	temp_bitmap.drill_COWC_timing_initDrawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		temp_sprite.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * DEBUG文本光标测试 - 帧刷新贴图
//==============================
Scene_Map.prototype.drill_DCCu_updateDebugWindow = function() {
	
	// > 『字符逐个绘制流程』 - 逐个绘制帧刷新
	if( this._drill_DCCu_DebugSprite_1 != undefined ){
		var temp_bitmap = this._drill_DCCu_DebugSprite_1.bitmap;
		temp_bitmap.drill_COWC_timing_updateTick();
	}
	if( this._drill_DCCu_DebugSprite_2 != undefined ){
		var temp_bitmap = this._drill_DCCu_DebugSprite_2.bitmap;
		temp_bitmap.drill_COWC_timing_updateTick();
	}
	if( this._drill_DCCu_DebugSprite_3 != undefined ){
		var temp_bitmap = this._drill_DCCu_DebugSprite_3.bitmap;
		temp_bitmap.drill_COWC_timing_updateTick();
	}
	if( this._drill_DCCu_DebugSprite_4 != undefined ){
		var temp_bitmap = this._drill_DCCu_DebugSprite_4.bitmap;
		temp_bitmap.drill_COWC_timing_updateTick();
	}
	
	// > 『字符逐个绘制流程』 - 逐个绘制帧刷新
	if( this._drill_DCCu_Debug2Sprite != undefined ){
		var temp_bitmap = this._drill_DCCu_Debug2Sprite.bitmap;
		temp_bitmap.drill_COWC_timing_updateTick();
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharCursor = false;
		var pluginTip = DrillUp.drill_DCCu_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

