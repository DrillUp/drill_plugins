//=============================================================================
// Drill_DialogCharOuterGlow.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        窗口字符 - 外发光效果
 * @author Drill_up
 * 
 * @Drill_LE_param "颜色-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DCOG_color_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogCharOuterGlow +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给窗口字符添加 外发光效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心★★v1.3及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   只作用于所有窗口字符。
 * 2.了解更多内容，可以去看看 "23.窗口字符 > 关于字符描边与外发光.docx"。
 * 发光效果：
 *   (1.使用描边的窗口字符包裹，可以实现字符的发光效果。
 * 设计：
 *   (1.你可以将描边效果与发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层示例 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dDCOG[1]          之后的文字使用颜色1的外发光。
 * 窗口字符：\dDCOG[1:5:1:1]    之后的文字使用颜色1，厚度5，偏移(1,1)的外发光。
 * 窗口字符：\dDCOGr            之后的文字恢复外发光设置。
 * 窗口字符：\dDCOGoff          之后的文字关闭外发光效果。
 * 
 * 窗口字符：\og[1]             与\dDCOG[1]一样，简写形式。
 * 窗口字符：\os[5]             之后的文字改变外发光厚度5，简写形式。
 * 窗口字符：\fr                重置之后文字所有设置。包括恢复外发光设置。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOG[1]发光\dDCOGr"，包裹的字符将会产生自定义外发光效果。
 * 2.字符"\dDCOGr"和"\fr"会恢复默认的外发光效果，
 *   字符"\dDCOGoff"可以临时关闭外发光效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改外发光设置：
 * 
 * 插件指令：>外发光效果 : 所有文本 : 开启
 * 插件指令：>外发光效果 : 所有文本 : 关闭
 * 插件指令：>外发光效果 : 所有文本 : 修改设置 : 颜色[1] : 厚度[4] : 偏移[0,0]
 * 插件指令：>外发光效果 : 所有文本 : 修改颜色 : 颜色[1]
 * 插件指令：>外发光效果 : 所有文本 : 修改厚度 : 厚度[4]
 * 插件指令：>外发光效果 : 所有文本 : 修改偏移 : 偏移[0,0]
 * 插件指令：>外发光效果 : 所有文本 : 恢复默认设置
 * 
 * 插件指令：>外发光效果 : 对话框 : 修改模式 : 自定义外发光
 * 插件指令：>外发光效果 : 对话框 : 修改模式 : 与所有文本的外发光一致
 * 插件指令：>外发光效果 : 对话框 : 修改模式 : 不发光
 * 插件指令：>外发光效果 : 对话框 : 修改设置 : 颜色[1] : 厚度[4] : 偏移[0,0]
 * 插件指令：>外发光效果 : 对话框 : 修改颜色 : 颜色[1]
 * 插件指令：>外发光效果 : 对话框 : 修改厚度 : 厚度[4]
 * 插件指令：>外发光效果 : 对话框 : 修改偏移 : 偏移[0,0]
 * 插件指令：>外发光效果 : 对话框 : 恢复默认设置
 * 
 * 1.插件指令设置后，其修改永久有效。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2."修改厚度 : 厚度[0]" 与 "修改模式 : 不发光" 的效果一样，
 *   都会关闭发光的功能。
 * 3."恢复默认设置"即恢复当前插件参数配置的情况，包括开启/关闭的状态设置。
 *   另外，游戏设置的默认为所有字符都不发光。
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
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.字符的发光效果只在每次绘制字符时执行，而且只单次执行，
 *   所以几乎不考虑其消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 插件指令 固定对话框的 外发光功能。
 * [v1.2]
 * 完善了作用于所有文本的功能。
 * 
 *
 * 
 * @param ---常规---
 * @desc 
 *
 * @param 是否对所有文本有效
 * @parent ---常规---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，开启后所有文本都发光。也可以通过插件指令开启或关闭。
 * @default false
 * 
 * @param 所有文本-外发光颜色ID
 * @parent 是否对所有文本有效
 * @type number
 * @min 1
 * @desc 外发光颜色对应当前插件配置的外发光颜色的id。注意，对游戏中的所有文本都有效。
 * @default 11
 * 
 * @param 所有文本-外发光厚度
 * @parent 是否对所有文本有效
 * @type number
 * @min 1
 * @desc 外发光的厚度，单位像素。(不允许设置厚度0) 注意，对游戏中的所有文本都有效。
 * @default 6
 * 
 * @param 所有文本-外发光偏移 X
 * @parent 是否对所有文本有效
 * @desc x轴方向平移，单位像素。正数向右，负数向左。注意，对游戏中的所有文本都有效。
 * @default 0
 * 
 * @param 所有文本-外发光偏移 Y
 * @parent 是否对所有文本有效
 * @desc y轴方向平移，单位像素。正数向下，负数向上。注意，对游戏中的所有文本都有效。
 * @default 0
 *
 * @param 对话框外发光模式
 * @parent ---常规---
 * @type select
 * @option 自定义外发光
 * @value 自定义外发光
 * @option 与所有文本的外发光一致
 * @value 与所有文本的外发光一致
 * @option 不发光
 * @value 不发光
 * @desc 对话框的描边模式。
 * @default 与所有文本的外发光一致
 * 
 * @param 对话框-外发光颜色ID
 * @parent 对话框外发光模式
 * @type number
 * @min 1
 * @desc 外发光颜色对应当前配置的外发光颜色的id。
 * @default 11
 * 
 * @param 对话框-外发光厚度
 * @parent 对话框外发光模式
 * @type number
 * @min 1
 * @desc 外发光的厚度，单位像素。(不允许设置厚度0)
 * @default 6
 * 
 * @param 对话框-外发光偏移 X
 * @parent 对话框外发光模式
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 1
 * 
 * @param 对话框-外发光偏移 Y
 * @parent 对话框外发光模式
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 1
 * 
 * 
 * @param ---外发光颜色---
 * @default 
 * 
 * @param 颜色-1
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==赤==","颜色代码":"#FF4444"}
 * 
 * @param 颜色-2
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==橙==","颜色代码":"#FF784C"}
 * 
 * @param 颜色-3
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黄==","颜色代码":"#FFFF40"}
 * 
 * @param 颜色-4
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==绿==","颜色代码":"#80FF80"}
 * 
 * @param 颜色-5
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==青==","颜色代码":"#98F5FF"}
 * 
 * @param 颜色-6
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==蓝==","颜色代码":"#40C0F0"}
 * 
 * @param 颜色-7
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==紫==","颜色代码":"#8080FF"}
 * 
 * @param 颜色-8
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==粉==","颜色代码":"#FF69B4"}
 * 
 * @param 颜色-9
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==棕==","颜色代码":"#8B4C39"}
 * 
 * @param 颜色-10
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==灰==","颜色代码":"#797979"}
 * 
 * @param 颜色-11
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黑==","颜色代码":"#000000"}
 * 
 * @param 颜色-12
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白==","颜色代码":"#FFFFFF"}
 * 
 * @param 颜色-13
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-14
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-15
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-16
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-17
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-18
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-19
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-20
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-21
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-22
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-23
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-24
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-25
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-26
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-27
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-28
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-29
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-30
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-31
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-32
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-33
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-34
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-35
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-36
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-37
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-38
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-39
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-40
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-41
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-42
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-43
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-44
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-45
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-46
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-47
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-48
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-49
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-50
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-51
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-52
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-53
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-54
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-55
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-56
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-57
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-58
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-59
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-60
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-61
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-62
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-63
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-64
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-65
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-66
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-67
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-68
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-69
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-70
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-71
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-72
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-73
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-74
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-75
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-76
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-77
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-78
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-79
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-80
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default
 * 
 */
/*~struct~CommonColor:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的颜色==
 * 
 * @param 颜色代码
 * @desc 颜色对应的字符串代码。
 * @default #FFFFFF
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCOG (Dialog_Char_Outer_Glow)
//		临时全局变量	DrillUp.g_DCOG_xxx
//		临时局部变量	this._drill_DCOG_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	4.6ms（drill_DCOG_clearGlow）0.8ms（Bitmap.drill_DCOG_setGlow）
//		★最坏情况		所有文本都发光
//		★备注			以前测出了发光字符占了很多消耗，可能是因为厚度设0的问题。
//						但现在是通过发光开关控制，目前没有出现高消耗情况。
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
//			
//			->☆效果字符应用
//			->☆外发光控制
//				->设置（开放函数）
//				->只修改颜色（开放函数）
//				->只修改厚度（开放函数）
//				->清除（开放函数）
//			->☆外发光绑定
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
	DrillUp.g_DCOG_PluginTip_curName = "Drill_DialogCharOuterGlow.js 窗口字符-外发光效果";
	DrillUp.g_DCOG_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCOG_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCOG_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCOG_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCOG_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCOG_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 日志 - 无效参数
	//==============================
	DrillUp.drill_DCOG_getPluginTip_ColorError = function( index ){
		return "【" + DrillUp.g_DCOG_PluginTip_curName + "】\n外发光颜色接受到一个无效的参数："+(index+1)+"。";
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_DCOG_getPluginTip_ColorNotFind = function( index ){
		return "【" + DrillUp.g_DCOG_PluginTip_curName + "】\n你没有在 外发光颜色-"+(index+1)+" 中配置颜色，而你在游戏中使用了它。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogCharOuterGlow = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogCharOuterGlow');
	
	
	//==============================
	// * 静态数据 - 外发光颜色
	//				（~struct~CommonColor）
	//==============================
	DrillUp.drill_DCOG_initCommonColor = function( dataFrom ){
		var data = {};
		data['color'] = String( dataFrom["颜色代码"] || "#FFFFFF" );
		return data;
	}
	//==============================
	// * 临时全局 - 获取外发光颜色
	//
	//			说明：	> 此处设置与 颜色核心 相互独立，使用自己的颜色表。
	//==============================
	DrillUp.drill_DCOG_getColor = function( index ){
		if( DrillUp.g_DCOG_color_list[index] == undefined ){ console.log( DrillUp.drill_DCOG_getPluginTip_ColorError( index ) ); return "#ffffff" }
		if( DrillUp.g_DCOG_color_list[index]['color'] == undefined ){ console.log( DrillUp.drill_DCOG_getPluginTip_ColorNotFind( index ) ); return "#ffffff" }
		return DrillUp.g_DCOG_color_list[index]['color'];
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCOG_globalEnabled = String(DrillUp.parameters["是否对所有文本有效"] || "true") == "true"; 
	DrillUp.g_DCOG_globalColorIndex = Number(DrillUp.parameters["所有文本-外发光颜色ID"] || 11) -1; 
	DrillUp.g_DCOG_globalBlur = Number(DrillUp.parameters["所有文本-外发光厚度"] || 6); 
	DrillUp.g_DCOG_globalOffsetX = Number(DrillUp.parameters["所有文本-外发光偏移 X"] || 0); 
	DrillUp.g_DCOG_globalOffsetY = Number(DrillUp.parameters["所有文本-外发光偏移 Y"] || 0); 
	
	DrillUp.g_DCOG_dialogMode = String(DrillUp.parameters["对话框外发光模式"] || "与所有文本的外发光一致"); 
	DrillUp.g_DCOG_dialogColorIndex = Number(DrillUp.parameters["对话框-外发光颜色ID"] || 11) -1; 
	DrillUp.g_DCOG_dialogBlur = Number(DrillUp.parameters["对话框-外发光厚度"] || 6); 
	DrillUp.g_DCOG_dialogOffsetX = Number(DrillUp.parameters["对话框-外发光偏移 X"] || 1); 
	DrillUp.g_DCOG_dialogOffsetY = Number(DrillUp.parameters["对话框-外发光偏移 Y"] || 1); 
	
	/*-----------------外发光颜色------------------*/
	DrillUp.g_DCOG_color_list_length = 80;
	DrillUp.g_DCOG_color_list = [];
	for( var i = 0; i < DrillUp.g_DCOG_color_list_length; i++ ){
		if( DrillUp.parameters['颜色-' + String(i+1) ] != undefined &&
			DrillUp.parameters['颜色-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['颜色-' + String(i+1) ]);
			DrillUp.g_DCOG_color_list[i] = DrillUp.drill_DCOG_initCommonColor( data );
		}else{
			DrillUp.g_DCOG_color_list[i] = {};
		}
	}
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_DCOG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DCOG_pluginCommand.call(this, command, args);
	if( command === ">外发光效果" ){
		
		/*-----------------所有文本------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
						$gameSystem._drill_DCOG_globalEnabled = true;
					}
					if( temp1 == "关闭" || temp1 == "禁用" ){
						$gameSystem._drill_DCOG_globalEnabled = false;
					}
					if( temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOG_globalEnabled = DrillUp.g_DCOG_globalEnabled;
						$gameSystem._drill_DCOG_globalColorIndex = DrillUp.g_DCOG_globalColorIndex;
						$gameSystem._drill_DCOG_globalBlur = DrillUp.g_DCOG_globalBlur;
						$gameSystem._drill_DCOG_globalOffsetX = DrillUp.g_DCOG_globalOffsetX;
						$gameSystem._drill_DCOG_globalOffsetY = DrillUp.g_DCOG_globalOffsetY;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("厚度[","");
					temp2 = temp2.replace("偏移[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOG_globalColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						$gameSystem._drill_DCOG_globalBlur = Number(temp2);
					}
					if( temp1 == "修改偏移" ){
						var temp_arr = temp2.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							$gameSystem._drill_DCOG_globalOffsetX = Number(temp_arr[0]);
							$gameSystem._drill_DCOG_globalOffsetY = Number(temp_arr[1]);
						}
					}
				}
				if( args.length == 10 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					var temp4 = String(args[9]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("]","");
					temp3 = temp3.replace("厚度[","");
					temp3 = temp3.replace("]","");
					temp4 = temp4.replace("偏移[","");
					temp4 = temp4.replace("]","");
					if( temp1 == "修改设置" ){
						$gameSystem._drill_DCOG_globalColorIndex = Number(temp2)-1;
						$gameSystem._drill_DCOG_globalBlur = Number(temp3);
						var temp_arr = temp4.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							$gameSystem._drill_DCOG_globalOffsetX = Number(temp_arr[0]);
							$gameSystem._drill_DCOG_globalOffsetY = Number(temp_arr[1]);
						}
					}
				}
			}
		}
		
		
		/*-----------------对话框------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
			
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOG_dialogMode = DrillUp.g_DCOG_dialogMode;
						$gameSystem._drill_DCOG_dialogColorIndex = DrillUp.g_DCOG_dialogColorIndex;
						$gameSystem._drill_DCOG_dialogBlur = DrillUp.g_DCOG_dialogBlur;
						$gameSystem._drill_DCOG_dialogOffsetX = DrillUp.g_DCOG_dialogOffsetX;
						$gameSystem._drill_DCOG_dialogOffsetY = DrillUp.g_DCOG_dialogOffsetY;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("厚度[","");
					temp2 = temp2.replace("偏移[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改模式" ){
						$gameSystem._drill_DCOG_dialogMode = temp2;
					}
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOG_dialogColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						if( Number(temp2) <= 0 ){	//（厚度为0时，关闭发光）
							$gameSystem._drill_DCOG_dialogMode = "不发光";
						}else{
							$gameSystem._drill_DCOG_dialogBlur = Number(temp2);
						}
					}
					if( temp1 == "修改偏移" ){
						var temp_arr = temp2.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							$gameSystem._drill_DCOG_dialogOffsetX = Number(temp_arr[0]);
							$gameSystem._drill_DCOG_dialogOffsetY = Number(temp_arr[1]);
						}
					}
				}
				if( args.length == 10 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					var temp4 = String(args[9]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("]","");
					temp3 = temp3.replace("厚度[","");
					temp3 = temp3.replace("]","");
					temp4 = temp4.replace("偏移[","");
					temp4 = temp4.replace("]","");
					if( temp1 == "修改设置" ){
						$gameSystem._drill_DCOG_dialogColorIndex = Number(temp2)-1;
						$gameSystem._drill_DCOG_dialogBlur = Number(temp3);
						var temp_arr = temp4.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							$gameSystem._drill_DCOG_dialogOffsetX = Number(temp_arr[0]);
							$gameSystem._drill_DCOG_dialogOffsetY = Number(temp_arr[1]);
						}
					}
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
DrillUp.g_DCOG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCOG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DCOG_sys_initialize.call(this);
	this.drill_DCOG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCOG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DCOG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DCOG_saveEnabled == true ){	
		$gameSystem.drill_DCOG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DCOG_initSysData();
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
Game_System.prototype.drill_DCOG_initSysData = function() {
	this.drill_DCOG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DCOG_checkSysData = function() {
	this.drill_DCOG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DCOG_initSysData_Private = function() {
	
	// > 所有文本
	this._drill_DCOG_globalEnabled = DrillUp.g_DCOG_globalEnabled;				//开关
	this._drill_DCOG_globalColorIndex = DrillUp.g_DCOG_globalColorIndex;		//外发光颜色
	this._drill_DCOG_globalBlur = DrillUp.g_DCOG_globalBlur;					//外发光厚度
	this._drill_DCOG_globalOffsetX = DrillUp.g_DCOG_globalOffsetX;				//外发光偏移X
	this._drill_DCOG_globalOffsetY = DrillUp.g_DCOG_globalOffsetY;				//外发光偏移Y
	
	// > 对话框
	this._drill_DCOG_dialogMode = DrillUp.g_DCOG_dialogMode;					//开关
	this._drill_DCOG_dialogColorIndex = DrillUp.g_DCOG_dialogColorIndex;		//外发光颜色
	this._drill_DCOG_dialogBlur = DrillUp.g_DCOG_dialogBlur;					//外发光厚度
	this._drill_DCOG_dialogOffsetX = DrillUp.g_DCOG_dialogOffsetX;				//外发光偏移X
	this._drill_DCOG_dialogOffsetY = DrillUp.g_DCOG_dialogOffsetY;				//外发光偏移Y
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCOG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCOG_dialogMode == undefined ){
		this.drill_DCOG_initSysData();
	}
	
};
	
	
//=============================================================================
// ** ☆效果字符应用
//=============================================================================
//==============================
// * 效果字符应用 - 字符转换（简单符）
//==============================
var _drill_DCOG_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_DCOG_processNewEffectChar_Simple.call( this, matched_index, command );
	
	// > 重置（\dDCOGr）
	if( command == "dDCOGr" ){
		this.drill_DCOG_resetOuterGlow();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
	// > 清除（\dDCOGoff）
	if( command == "dDCOGoff" ){
		this.contents.drill_DCOG_clearGlow();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
}
//==============================
// * 效果字符应用 - 字符转换（组合符）
//==============================
var _drill_DCOG_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DCOG_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDCOG" ){
		
		// > 只设置颜色（\dDCOG[1]）
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				var color = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents.drill_DCOG_setGlowColor( color );
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		
		// > 全属性设置（\dDCOG[1:5:0:0]）
		if( args.length == 4 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			var temp4 = String(args[3]);
			if( this.contents != undefined ){
				var color = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents.drill_DCOG_setGlow(
					color,
					Number(temp2),
					Number(temp3),
					Number(temp4),
				);
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	
	// > 只设置颜色（\og[1]）
	if( command.toLowerCase() == "og" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				var color = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents.drill_DCOG_setGlowColor( color );
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	// > 只设置厚度（\og[5]）
	if( command.toLowerCase() == "os" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( Number(temp1) == 0 ){	//（厚度为0时，直接关闭）
				this.contents.drill_DCOG_clearGlow();
			}else{
				if( this.contents != undefined ){
					this.contents.drill_DCOG_setGlowBlur( Number(temp1) );
				}
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
};


//=============================================================================
// ** ☆外发光控制
//
//			说明：	> 此模块专门管理 外发光的函数。
//					> 注意，只有这个模块才能使用关键词 shadow， 其他地方不要直接设置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 外发光控制 - 设置（开放函数）
//
//			说明：	> 注意shadowColor必须为 颜色字符串。
//==============================
Bitmap.prototype.drill_DCOG_setGlow = function( shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY ){
	if( shadowBlur <= 0 ){ return; }
	if( shadowColor == "" ){ return; }
	if( this._context == undefined ){ return; }
	this._context.shadowOffsetX = shadowOffsetX;
	this._context.shadowOffsetY = shadowOffsetY;
	this._context.shadowBlur = shadowBlur;
	this._context.shadowColor = shadowColor;
};
//==============================
// * 外发光控制 - 只修改颜色（开放函数）
//
//			说明：	> 注意shadowColor必须为 颜色字符串。
//==============================
Bitmap.prototype.drill_DCOG_setGlowColor = function( shadowColor ){
	if( shadowColor == "" ){ return; }
	if( this._context == undefined ){ return; }
	if( this._context.shadowOffsetX == undefined ){		//（若为null，则使用默认 所有文本 的设置）
		this._context.shadowOffsetX = $gameSystem._drill_DCOG_globalOffsetX;
	}
	if( this._context.shadowOffsetY == undefined ){
		this._context.shadowOffsetY = $gameSystem._drill_DCOG_globalOffsetY;
	}
	if( this._context.shadowBlur == undefined ||
		this._context.shadowBlur == 0 ){
		this._context.shadowBlur = $gameSystem._drill_DCOG_globalBlur;
	}
	this._context.shadowColor = shadowColor;
};
//==============================
// * 外发光控制 - 只修改厚度（开放函数）
//==============================
Bitmap.prototype.drill_DCOG_setGlowBlur = function( shadowBlur ){
	if( shadowBlur <= 0 ){ return; }
	if( this._context == undefined ){ return; }
	if( this._context.shadowOffsetX == undefined ){		//（若为null，则使用默认 所有文本 的设置）
		this._context.shadowOffsetX = $gameSystem._drill_DCOG_globalOffsetX;
	}
	if( this._context.shadowOffsetY == undefined ){
		this._context.shadowOffsetY = $gameSystem._drill_DCOG_globalOffsetY;
	}
	this._context.shadowBlur = shadowBlur;
	if( this._context.shadowColor == undefined ){
		this._context.shadowColor = DrillUp.drill_DCOG_getColor( $gameSystem._drill_DCOG_globalColorIndex );
	}
};
//==============================
// * 外发光控制 - 清除（开放函数）
//
//			说明：	> 暂时测试不出shadowBlur设为0是否能关闭外发光，但是设为null肯定是好一些。
//==============================
Bitmap.prototype.drill_DCOG_clearGlow = function(){
	if( this._context == undefined ){ return; }
	if( this._context.shadowColor == undefined ){ return; }
	this._context.shadowColor = null;
	this._context.shadowBlur = null;		//（注意，该参数赋值后，获取会返回0而不是null）
	this._context.shadowOffsetX = null;
	this._context.shadowOffsetY = null;
};
//==============================
// * 外发光控制 - 画笔同步（继承）
//==============================
var _drill_COWC_DCOG_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_COWC_DCOG_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to._context.shadowColor = bitmap_from._context.shadowColor;
	bitmap_to._context.shadowBlur = bitmap_from._context.shadowBlur;
	bitmap_to._context.shadowOffsetX = bitmap_from._context.shadowOffsetX;
	bitmap_to._context.shadowOffsetY = bitmap_from._context.shadowOffsetY;
};


//=============================================================================
// ** ☆外发光绑定
//
//			说明：	> 此模块专门管理 外发光 的窗口绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 外发光绑定 - 重置绑定
//==============================
var _drill_DCOG_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	_drill_DCOG_resetFontSettings.call(this);
	this.drill_DCOG_resetOuterGlow();
};
//==============================
// * 外发光绑定 - 重置（全局默认）
//==============================
Window_Base.prototype.drill_DCOG_resetOuterGlow = function() {
	if( this.contents == undefined ){ return; }
	
	// > 所有文本-开关，关闭时，清理发光
	if( $gameSystem._drill_DCOG_globalEnabled != true ){
		this.contents.drill_DCOG_clearGlow();
		
	// > 所有文本-开关，开启时
	}else{	
		this.contents.drill_DCOG_setGlow(
			DrillUp.drill_DCOG_getColor( $gameSystem._drill_DCOG_globalColorIndex ),
			$gameSystem._drill_DCOG_globalBlur,
			$gameSystem._drill_DCOG_globalOffsetX,
			$gameSystem._drill_DCOG_globalOffsetY
		);
	}
};
//==============================
// * 外发光绑定 - 重置（对话框）
//==============================
Window_Message.prototype.drill_DCOG_resetOuterGlow = function() {
	if( this.contents == undefined ){ return; }
	
	if( $gameSystem._drill_DCOG_dialogMode == "与所有文本的外发光一致" ){
		Window_Base.prototype.drill_DCOG_resetOuterGlow.call(this);
		return;
	}
	
	if( $gameSystem._drill_DCOG_dialogMode == "自定义外发光" ){
		this.contents.drill_DCOG_setGlow(
			DrillUp.drill_DCOG_getColor( $gameSystem._drill_DCOG_dialogColorIndex ),
			$gameSystem._drill_DCOG_dialogBlur,
			$gameSystem._drill_DCOG_dialogOffsetX,
			$gameSystem._drill_DCOG_dialogOffsetY
		);
		return;
	}
	
	if( $gameSystem._drill_DCOG_dialogMode == "不发光" ){
		this.contents.drill_DCOG_clearGlow();
		return;
	}
};

/*
//==============================
// * 外发光绑定 - 直接绑定
//==============================
var _drill_DCOG__drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
	
	this.drill_DCOG_setGlow(
		"#00ffff",
		5,
		1,
		1
	);
	
	// > 原函数
	_drill_DCOG__drawTextOutline.call( this, text, tx, ty, maxWidth );
}
*/


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharOuterGlow = false;
		var pluginTip = DrillUp.drill_DCOG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

