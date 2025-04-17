//=============================================================================
// Drill_DialogCharOuterGlow.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        窗口字符 - 外发光效果
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
 * 使得你可以设置窗口字符的 外发光效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   只作用于所有窗口字符。
 * 2.了解更多内容，可以去看看 "23.窗口字符 > 关于字符描边与外发光.docx"。
 * 外发光效果：
 *   (1.使用该插件的窗口字符，可以实现字符的外发光效果。
 *      游戏初始设置中，所有文本没有任何外发光效果。
 * 设计：
 *   (1.你可以将描边效果与外发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层示例 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\oo[on]            之后的文本开启外发光效果，简写形式。
 * 窗口字符：\oo[off]           之后的文本关闭外发光效果，简写形式。
 * 窗口字符：\og[1]             之后的文本使用颜色1的外发光，简写形式。
 * 窗口字符：\os[5]             之后的文本改变外发光厚度5，简写形式。
 * 窗口字符：\fr                全重置字符，重置之后文本所有设置，包括恢复默认外发光。
 * 
 * 窗口字符：\dDCOG[on]         之后的文本开启外发光效果。
 * 窗口字符：\dDCOG[off]        之后的文本关闭外发光效果。
 * 窗口字符：\dDCOG[1]          之后的文本使用颜色1的外发光。
 * 窗口字符：\dDCOG[1:5:1:1]    之后的文本使用颜色1，厚度5，偏移(1,1)的外发光。
 * 窗口字符：\dDCOG[reset]      之后的文本只恢复默认外发光。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOG[1]发光\dDCOG[reset]"，包裹的字符将会产生自定义外发光效果。
 * 2.字符"\dDCOG[reset]"和"\fr"会恢复默认的外发光效果，
 *   字符"\dDCOG[off]"可以临时关闭外发光效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>外发光效果 : 所有文本 : 外发光开关 : 开启
 * 插件指令：>外发光效果 : 所有文本 : 外发光开关 : 关闭
 * 插件指令：>外发光效果 : 所有文本 : 修改颜色 : 颜色[1]
 * 插件指令：>外发光效果 : 所有文本 : 修改厚度 : 厚度[4]
 * 插件指令：>外发光效果 : 所有文本 : 修改偏移 : 偏移[0,0]
 * 插件指令：>外发光效果 : 所有文本 : 修改设置 : 颜色[1] : 厚度[4] : 偏移[0,0]
 * 插件指令：>外发光效果 : 所有文本 : 恢复默认外发光
 * 
 * 插件指令：>外发光效果 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>外发光效果 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>外发光效果 : 对话框 : 外发光开关 : 开启
 * 插件指令：>外发光效果 : 对话框 : 外发光开关 : 关闭
 * 插件指令：>外发光效果 : 对话框 : 修改颜色 : 颜色[1]
 * 插件指令：>外发光效果 : 对话框 : 修改厚度 : 厚度[4]
 * 插件指令：>外发光效果 : 对话框 : 修改偏移 : 偏移[0,0]
 * 插件指令：>外发光效果 : 对话框 : 修改设置 : 颜色[1] : 厚度[4] : 偏移[0,0]
 * 插件指令：>外发光效果 : 对话框 : 恢复默认外发光
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   并且 全重置字符\fr 执行重置时，也会重置为 此设置的值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2."修改厚度 : 厚度[0]" 与 "修改模式 : 不发光" 的效果一样，
 *   都会关闭发光的功能。
 * 3."恢复默认外发光"即恢复当前插件参数配置的情况，包括开启/关闭的状态设置。
 *   另外，游戏设置的默认为所有字符都不发光。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>外发光效果 : DEBUG外发光效果字符测试 : 开启
 * 插件指令：>外发光效果 : DEBUG外发光效果字符测试 : 关闭
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
 * [v1.3]
 * 区分了所有文本和对话框的外发光设置。
 * [v1.4]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 *
 * 
 * @param ---全局默认值---
 * @desc 
 *
 * @param 所有文本-默认是否外发光
 * @parent ---全局默认值---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后所有文本会外发光，外发光开关也可以通过插件指令控制。
 * @default false
 * 
 * @param 所有文本-默认外发光颜色ID
 * @parent ---全局默认值---
 * @type number
 * @min 1
 * @desc 所有字符的 默认外发光颜色，需填入当前插件配置的外发光颜色id。
 * @default 11
 * 
 * @param 所有文本-默认外发光厚度
 * @parent ---全局默认值---
 * @type number
 * @min 1
 * @desc 所有字符的 默认外发光厚度。(不允许设置厚度0)
 * @default 6
 * 
 * @param 所有文本-默认外发光偏移 X
 * @parent ---全局默认值---
 * @desc 所有字符的 默认x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 所有文本-默认外发光偏移 Y
 * @parent ---全局默认值---
 * @desc 所有字符的 默认y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * 
 * @param 对话框外发光模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 与所有文本一致
 *
 * @param 对话框-是否外发光
 * @parent 对话框外发光模式
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 对话框模式为"自定义模式"时生效。开启后所有文本会外发光，外发光开关也可以通过插件指令控制。
 * @default false
 * 
 * @param 对话框-外发光颜色ID
 * @parent 对话框外发光模式
 * @type number
 * @min 1
 * @desc 对话框模式为"自定义模式"时生效。对话框字符的外发光颜色，需填入当前插件配置的外发光颜色id。
 * @default 11
 * 
 * @param 对话框-外发光厚度
 * @parent 对话框外发光模式
 * @type number
 * @min 1
 * @desc 对话框模式为"自定义模式"时生效。对话框字符的外发光厚度。(不允许设置厚度0)
 * @default 6
 * 
 * @param 对话框-外发光偏移 X
 * @parent 对话框外发光模式
 * @desc 对话框模式为"自定义模式"时生效。对话框字符x轴方向平移，单位像素。正数向右，负数向左。
 * @default 1
 * 
 * @param 对话框-外发光偏移 Y
 * @parent 对话框外发光模式
 * @desc 对话框模式为"自定义模式"时生效。对话框字符y轴方向平移，单位像素。正数向下，负数向上。
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
 * @default {"标记":"==赤==","颜色代码":"#ff3333"}
 * 
 * @param 颜色-2
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==橙==","颜色代码":"#ffbe55"}
 * 
 * @param 颜色-3
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黄==","颜色代码":"#ffff88"}
 * 
 * @param 颜色-4
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==绿==","颜色代码":"#80ff80"}
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
 * @default {"标记":"==蓝==","颜色代码":"#6067ff"}
 * 
 * @param 颜色-7
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==紫==","颜色代码":"#a180ff"}
 * 
 * @param 颜色-8
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==粉==","颜色代码":"#ffbfbf"}
 * 
 * @param 颜色-9
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==棕==","颜色代码":"#ccac86"}
 * 
 * @param 颜色-10
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==灰==","颜色代码":"#c0c0c0"}
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
 * @desc 颜色对应的字符串代码，格式为"#FFFFFF"，大写小写字母都可以识别。
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
//		★性能测试消耗	
//		★最坏情况		
//		★备注			
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
//			->☆窗口字符应用之效果字符
//				> \OO[on]
//				> \OO[off]
//				> \OG[1]
//				> \OS[5]
//				> \dDCOG[reset]
//				> \dDCOG[on]
//				> \dDCOG[off]
//				> \dDCOG[1]
//				> \dDCOG[1:5:0:0]
//			->☆全局默认值
//				->准备绘制配置（继承）
//			->☆重置控制
//				->全重置字符（继承）
//				->自定义重置字符
//					> @@@dog[reset]
//			
//			->☆外发光的底层字符实现
//				> @@@dog[true]
//				> @@@dog[false]
//				> @@@dog[color:#eeeeff]
//				> @@@dog[blur:2]
//				> @@@dog[pos:1,1]
//				> @@@dog[reset]
//			
//			->☆DEBUG外发光测试
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
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
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
	
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_DCOG_globalEnabled = String(DrillUp.parameters["所有文本-默认是否外发光"] || "false") == "true"; 
	DrillUp.g_DCOG_globalColorIndex = Number(DrillUp.parameters["所有文本-默认外发光颜色ID"] || 11) -1; 	//（注意，index需要-1）
	DrillUp.g_DCOG_globalBlur = Number(DrillUp.parameters["所有文本-默认外发光厚度"] || 6); 
	DrillUp.g_DCOG_globalOffsetX = Number(DrillUp.parameters["所有文本-默认外发光偏移 X"] || 0); 
	DrillUp.g_DCOG_globalOffsetY = Number(DrillUp.parameters["所有文本-默认外发光偏移 Y"] || 0); 
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_DCOG_dialogMode = String(DrillUp.parameters["对话框外发光模式"] || "与所有文本一致"); 
	DrillUp.g_DCOG_dialogEnabled = String(DrillUp.parameters["对话框-是否外发光"] || "false") == "true"; 
	DrillUp.g_DCOG_dialogColorIndex = Number(DrillUp.parameters["对话框-外发光颜色ID"] || 11) -1; 	//（注意，index需要-1）
	DrillUp.g_DCOG_dialogBlur = Number(DrillUp.parameters["对话框-外发光厚度"] || 6); 
	DrillUp.g_DCOG_dialogOffsetX = Number(DrillUp.parameters["对话框-外发光偏移 X"] || 1); 
	DrillUp.g_DCOG_dialogOffsetY = Number(DrillUp.parameters["对话框-外发光偏移 Y"] || 1); 
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DCOG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCOG_pluginCommand.call(this, command, args);
	this.drill_DCOG_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCOG_pluginCommand = function( command, args ){
	if( command === ">外发光效果" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("厚度[","");
					temp2 = temp2.replace("偏移[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "外发光开关" ){
						if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
							$gameSystem._drill_DCOG_globalEnabled = true;
						}
						if( temp2 == "关闭" || temp2 == "禁用" ){
							$gameSystem._drill_DCOG_globalEnabled = false;
						}
					}
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
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认外发光" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOG_globalEnabled = DrillUp.g_DCOG_globalEnabled;
						$gameSystem._drill_DCOG_globalColorIndex = DrillUp.g_DCOG_globalColorIndex;
						$gameSystem._drill_DCOG_globalBlur = DrillUp.g_DCOG_globalBlur;
						$gameSystem._drill_DCOG_globalOffsetX = DrillUp.g_DCOG_globalOffsetX;
						$gameSystem._drill_DCOG_globalOffsetY = DrillUp.g_DCOG_globalOffsetY;
					}
				}
				if( args.length == 10 ){	//>外发光效果 : 所有文本 : 修改设置 : 颜色[1] : 厚度[4] : 偏移[0,0]
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
		
		/*-----------------『全局默认值』对话框（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
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
					if( temp1 == "外发光开关" ){
						if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
							$gameSystem._drill_DCOG_dialogEnabled = true;
						}
						if( temp2 == "关闭" || temp2 == "禁用" ){
							$gameSystem._drill_DCOG_dialogEnabled = false;
						}
					}
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOG_dialogColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						$gameSystem._drill_DCOG_dialogBlur = Number(temp2);
					}
					if( temp1 == "修改偏移" ){
						var temp_arr = temp2.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							$gameSystem._drill_DCOG_dialogOffsetX = Number(temp_arr[0]);
							$gameSystem._drill_DCOG_dialogOffsetY = Number(temp_arr[1]);
						}
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认外发光" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOG_dialogEnabled = DrillUp.g_DCOG_dialogEnabled;
						$gameSystem._drill_DCOG_dialogColorIndex = DrillUp.g_DCOG_dialogColorIndex;
						$gameSystem._drill_DCOG_dialogBlur = DrillUp.g_DCOG_dialogBlur;
						$gameSystem._drill_DCOG_dialogOffsetX = DrillUp.g_DCOG_dialogOffsetX;
						$gameSystem._drill_DCOG_dialogOffsetY = DrillUp.g_DCOG_dialogOffsetY;
					}
				}
				if( args.length == 10 ){	//>外发光效果 : 对话框 : 修改设置 : 颜色[1] : 厚度[4] : 偏移[0,0]
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
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG外发光效果字符测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCOG_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCOG_DebugEnabled = false;
					
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
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_DCOG_globalEnabled = DrillUp.g_DCOG_globalEnabled;				//所有文本 - 开关
	this._drill_DCOG_globalColorIndex = DrillUp.g_DCOG_globalColorIndex;		//所有文本 - 颜色
	this._drill_DCOG_globalBlur = DrillUp.g_DCOG_globalBlur;					//所有文本 - 厚度
	this._drill_DCOG_globalOffsetX = DrillUp.g_DCOG_globalOffsetX;				//所有文本 - 偏移X
	this._drill_DCOG_globalOffsetY = DrillUp.g_DCOG_globalOffsetY;				//所有文本 - 偏移Y
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_DCOG_dialogMode = DrillUp.g_DCOG_dialogMode;					//对话框 - 模式
	this._drill_DCOG_dialogEnabled = DrillUp.g_DCOG_dialogEnabled;				//对话框 - 开关
	this._drill_DCOG_dialogColorIndex = DrillUp.g_DCOG_dialogColorIndex;		//对话框 - 颜色
	this._drill_DCOG_dialogBlur = DrillUp.g_DCOG_dialogBlur;					//对话框 - 厚度
	this._drill_DCOG_dialogOffsetX = DrillUp.g_DCOG_dialogOffsetX;				//对话框 - 偏移X
	this._drill_DCOG_dialogOffsetY = DrillUp.g_DCOG_dialogOffsetY;				//对话框 - 偏移Y
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCOG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCOG_dialogEnabled == undefined ){
		this.drill_DCOG_initSysData();
	}
};

	
	
//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置（继承）
//==============================
var _drill_COWC_DCOG_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DCOG_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 外发光开关（\OO[on]、\OO[off]）
	if( command.toUpperCase() == "OO" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@dog[true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@dog[false]" );
				return;
			}
			return;
		}
	}
	
	// > 『窗口字符定义』 - 外发光颜色（\OG[1]）
	if( command.toUpperCase() == "OG" ){
		if( args.length == 1 ){
			var color_str = DrillUp.drill_DCOG_getColor( Number(args[0])-1 );
			this.drill_COWC_effect_submitCombined( "@@@dog[color:" + color_str + "]" );
		}
	}
	
	// > 『窗口字符定义』 - 外发光厚度（\OS[5]）
	if( command.toUpperCase() == "OS" ){
		if( args.length == 1 ){
			var blur = Number(args[0]);
			this.drill_COWC_effect_submitCombined( "@@@dog[blur:" + blur + "]" );
		}
	}
	
	if( command == "dDCOG" ){
		
		// > 『窗口字符定义』 - 外发光配置 - 自定义重置字符（\dDCOG[reset]）
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "RESET" ){
				this.drill_COWC_effect_submitCombined( "@@@dog[reset]" );
				return;
			}
		}
		
		// > 『窗口字符定义』 - 外发光配置 - 开关（\dDCOG[on]、\dDCOG[off]）
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@dog[true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@dog[false]" );
				return;
			}
		}
		
		// > 『窗口字符定义』 - 外发光配置 - 颜色（\dDCOG[1]）
		if( args.length == 1 ){
			var color_str = DrillUp.drill_DCOG_getColor( Number(args[0])-1 );
			this.drill_COWC_effect_submitCombined( "@@@dog[color:" + color_str + "]" );
			return;
		}
		
		// > 『窗口字符定义』 - 外发光配置 - 颜色+厚度+偏移（\dDCOG[1:5:0:0]）
		if( args.length == 4 ){
			var color_str = DrillUp.drill_DCOG_getColor( Number(args[0])-1 );
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			var temp4 = String(args[3]);
			this.drill_COWC_effect_submitCombined(
				"@@@dog[color:" +color_str+ "]" + 
				"@@@dog[blur:" +temp2+ "]" + 
				"@@@dog[pos:" +temp3+":"+temp4+ "]"
			);
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
var _drill_DCOG_COCD_drawTextInit = Game_Temp.prototype.drill_COCD_initOptions;
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	_drill_DCOG_COCD_drawTextInit.call( this, o_data, o_bitmap );
	if( $gameSystem == undefined ){ return; }
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_enabled = $gameSystem._drill_DCOG_globalEnabled;									//开关
	var cur_color = DrillUp.drill_DCOG_getColor( $gameSystem._drill_DCOG_globalColorIndex );	//颜色
	var cur_blur = $gameSystem._drill_DCOG_globalBlur;											//厚度
	var cur_offsetX = $gameSystem._drill_DCOG_globalOffsetX;									//偏移X
	var cur_offsetY = $gameSystem._drill_DCOG_globalOffsetY;									//偏移Y
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( o_bitmap != undefined &&
		o_bitmap.drill_COWC_isInMessageWindow() ){
		
		if( $gameSystem._drill_DCOG_dialogMode == "自定义模式" ){
			cur_enabled = $gameSystem._drill_DCOG_dialogEnabled;									//开关
			cur_color = DrillUp.drill_DCOG_getColor( $gameSystem._drill_DCOG_dialogColorIndex );	//颜色
			cur_blur = $gameSystem._drill_DCOG_dialogBlur;											//厚度
			cur_offsetX = $gameSystem._drill_DCOG_dialogOffsetX;									//偏移X
			cur_offsetY = $gameSystem._drill_DCOG_dialogOffsetY;									//偏移Y
		}
	}
	
	// > 『全局默认值』 - 使用值
	if( o_data['baseParam']['glowEnabled'] == undefined ){ o_data['baseParam']['glowEnabled'] = cur_enabled; }
	if( o_data['baseParam']['glowColor']   == undefined ){ o_data['baseParam']['glowColor']   = cur_color;   }
	if( o_data['baseParam']['glowBlur']    == undefined ){ o_data['baseParam']['glowBlur']    = cur_blur;    }
	if( o_data['baseParam']['glowOffsetX'] == undefined ){ o_data['baseParam']['glowOffsetX'] = cur_offsetX; }
	if( o_data['baseParam']['glowOffsetY'] == undefined ){ o_data['baseParam']['glowOffsetY'] = cur_offsetY; }
	
	// > 重置控制 - 使用值
	//		（在全局默认值之后赋值，这样其它插件就不用管fr_xxx参数有没有值，要不要赋值的问题了）
	if( o_data['baseParam']['fr_glowEnabled'] == undefined ){ o_data['baseParam']['fr_glowEnabled'] = o_data['baseParam']['glowEnabled']; }
	if( o_data['baseParam']['fr_glowColor']   == undefined ){ o_data['baseParam']['fr_glowColor']   = o_data['baseParam']['glowColor'];   }
	if( o_data['baseParam']['fr_glowBlur']    == undefined ){ o_data['baseParam']['fr_glowBlur']    = o_data['baseParam']['glowBlur'];    }
	if( o_data['baseParam']['fr_glowOffsetX'] == undefined ){ o_data['baseParam']['fr_glowOffsetX'] = o_data['baseParam']['glowOffsetX']; }
	if( o_data['baseParam']['fr_glowOffsetY'] == undefined ){ o_data['baseParam']['fr_glowOffsetY'] = o_data['baseParam']['glowOffsetY']; }
}
//==============================
// * 全局默认值 - 获取外发光颜色（开放函数）
//
//			说明：	> 此处设置与 颜色核心 相互独立，使用自己的颜色表。
//					> 返回字符串，格式如"#eeeeff"。
//==============================
DrillUp.drill_DCOG_getColor = function( index ){
	if( DrillUp.g_DCOG_color_list[index] == undefined ){ console.log( DrillUp.drill_DCOG_getPluginTip_ColorError( index ) ); return "#ffffff" }
	if( DrillUp.g_DCOG_color_list[index]['color'] == undefined ){ console.log( DrillUp.drill_DCOG_getPluginTip_ColorNotFind( index ) ); return "#ffffff" }
	return DrillUp.g_DCOG_color_list[index]['color'];
}


//=============================================================================
// ** ☆重置控制
//
//			说明：	> 此处兼容 重置 功能，包括 全重置字符 的效果。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 重置控制 - 全重置字符（继承）
//==============================
var _drill_COCD_DCOG_textBlock_fontReset = Game_Temp.prototype.drill_COCD_textBlock_fontReset;
Game_Temp.prototype.drill_COCD_textBlock_fontReset = function( cur_infoParam, cur_baseParam, cur_blockParam ){
	_drill_COCD_DCOG_textBlock_fontReset.call( this, cur_infoParam, cur_baseParam, cur_blockParam );
	this.drill_DCOG_reset( cur_infoParam, cur_baseParam, cur_blockParam );
};
//==============================
// * 重置控制 - 全重置字符 - 执行
//==============================
Game_Temp.prototype.drill_DCOG_reset = function( cur_infoParam, cur_baseParam, cur_blockParam ){
	if( cur_baseParam['fr_glowEnabled'] != undefined ){ cur_baseParam['glowEnabled'] = cur_baseParam['fr_glowEnabled']; }
	if( cur_baseParam['fr_glowColor']   != undefined ){ cur_baseParam['glowColor']   = cur_baseParam['fr_glowColor'];   }
	if( cur_baseParam['fr_glowBlur']    != undefined ){ cur_baseParam['glowBlur']    = cur_baseParam['fr_glowBlur'];    }
	if( cur_baseParam['fr_glowOffsetX'] != undefined ){ cur_baseParam['glowOffsetX'] = cur_baseParam['fr_glowOffsetX']; }
	if( cur_baseParam['fr_glowOffsetY'] != undefined ){ cur_baseParam['glowOffsetY'] = cur_baseParam['fr_glowOffsetY']; }
};
//==============================
// * 重置控制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_DCOG_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_DCOG_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 自定义重置字符（@@@dog[reset]） drill_outer_glow
	if( command == "@@@dog" ){	//（大小写敏感）
		if( args.length == 1 ){
			if( String(args[0]) == "reset" ){
				this.drill_DCOG_reset( cur_infoParam, cur_baseParam, cur_blockParam );
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
};


//=============================================================================
// ** ☆外发光的底层字符实现
//
//			说明：	> 此处对 字符绘制核心 底层进行扩展，支持外发光功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 外发光的底层字符实现 - 默认值（私有）
//
//			说明：	> 该函数可以放帧刷新中反复执行。
//==============================
var _drill_COCD_DCOG_drawBaseText_initParam = Game_Temp.prototype.drill_COCD_drawBaseText_initParam;
Game_Temp.prototype.drill_COCD_drawBaseText_initParam = function( baseParam ){
	_drill_COCD_DCOG_drawBaseText_initParam.call( this, baseParam );
	if( baseParam['glowEnabled'] == undefined ){ baseParam['glowEnabled'] = false };
	if( baseParam['glowColor'] == undefined ){ baseParam['glowColor'] = DrillUp.drill_DCOG_getColor( DrillUp.g_DCOG_globalColorIndex ) };
	if( baseParam['glowBlur'] == undefined ){ baseParam['glowBlur'] = DrillUp.g_DCOG_globalBlur };
	if( baseParam['glowOffsetX'] == undefined ){ baseParam['glowOffsetX'] = DrillUp.g_DCOG_globalOffsetX };
	if( baseParam['glowOffsetY'] == undefined ){ baseParam['glowOffsetY'] = DrillUp.g_DCOG_globalOffsetY };
}
//==============================
// * 外发光的底层字符实现 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_DCOG_textBlock_processStyle_2 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_DCOG_textBlock_processStyle_2.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dog" ){	//（大小写敏感）
		var type = "";
		if( args.length >= 1 ){
			type = String(args[0]);
		}
		
		// > 『底层字符定义』 - 外发光 - 开关（@@@dog[true]） drill_outer_glow
		if( type == "true" ){
			if( args.length == 1 ){
				cur_baseParam['glowEnabled'] = true;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		
		// > 『底层字符定义』 - 外发光 - 开关（@@@dog[false]） drill_outer_glow
		if( type == "false" ){
			if( args.length == 1 ){
				cur_baseParam['glowEnabled'] = false;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		
		// > 『底层字符定义』 - 外发光 - 颜色（@@@dog[color:#eeeeff]） drill_outer_glow
		if( type == "color" ){
			if( args.length == 2 ){
				cur_baseParam['glowEnabled'] = true;		//（修改了就立即生效）
				cur_baseParam['glowColor'] = String(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		
		// > 『底层字符定义』 - 外发光 - 厚度（@@@dog[blur:2]） drill_outer_glow
		if( type == "blur" ){
			if( args.length == 2 ){
				if( Number(args[1]) <= 0 ){
					cur_baseParam['glowEnabled'] = false;	//（厚度为0视作关闭开关）
				}else{
					cur_baseParam['glowEnabled'] = true;	//（修改了就立即生效）
					cur_baseParam['glowBlur'] = Number(args[1]);
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
		
		// > 『底层字符定义』 - 外发光 - 偏移（@@@dog[pos:1,1]） drill_outer_glow
		if( type == "pos" ){
			if( args.length == 3 ){
				cur_baseParam['glowEnabled'] = true;		//（修改了就立即生效）
				cur_baseParam['glowOffsetX'] = Number(args[1]);
				cur_baseParam['glowOffsetY'] = Number(args[2]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}
//==============================
// * 外发光的底层字符实现 - 绘制基础字符 - 文本本体（继承）
//==============================
var _drill_COCD_DCOG_drawBaseText_body = Game_Temp.prototype.drill_COCD_drawBaseText_body;
Game_Temp.prototype.drill_COCD_drawBaseText_body = function( painter, text, tx, ty, baseParam ){
	
	if( baseParam['glowEnabled'] == true ){
		painter.shadowColor = baseParam['glowColor'];
		painter.shadowBlur = baseParam['glowBlur'];
		painter.shadowOffsetX = baseParam['glowOffsetX'];
		painter.shadowOffsetY = baseParam['glowOffsetY'];
	}
	
	// > 原函数
	_drill_COCD_DCOG_drawBaseText_body.call( this, painter, text, tx, ty, baseParam );
	
	painter.shadowColor = null;
	painter.shadowBlur = null;
	painter.shadowOffsetX = null;
	painter.shadowOffsetY = null;
}



//=============================================================================
// ** ☆DEBUG外发光测试
//
//			说明：	> 此模块控制 DEBUG外发光测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG外发光测试 - 帧刷新（地图界面）
//==============================
var _drill_DCOG_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DCOG_debug_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCOG_DebugEnabled == true ){
		$gameTemp._drill_DCOG_DebugEnabled = undefined;
		this.drill_DCOG_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_DCOG_DebugEnabled == false ){
		$gameTemp._drill_DCOG_DebugEnabled = undefined;
		if( this._drill_DCOG_DebugSprite != undefined ){
			this.removeChild(this._drill_DCOG_DebugSprite);
			this._drill_DCOG_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG外发光测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_DCOG_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCOG_DebugSprite != undefined ){
		this.removeChild(this._drill_DCOG_DebugSprite);
		this._drill_DCOG_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 40, 736, 544 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DCOG_DebugSprite = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#ff2222", 2, "miter" );
	
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
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_DCOG_PluginTip_curName + "】\n" + 
				"》当前测试 外发光 的功能效果。\n" + 
				"如果不做任何操作，则使用 全局默认值-所有文本 的外发光配置。\n" + 
				"若插件配置了所有文本开启外发光，那么此段文本也会对应有外发光效果。\n" + 
				
				"》外发光颜色如下：\n" + 
				"\\\\og[1]  外发光（赤）  \\og[1]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[2]  外发光（橙）  \\og[2]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[3]  外发光（黄）  \\og[3]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[4]  外发光（绿）  \\og[4]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[5]  外发光（青）  \\og[5]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[6]  外发光（蓝）  \\og[6]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[7]  外发光（紫）  \\og[7]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[8]  外发光（粉）  \\og[8]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[9]  外发光（棕）  \\og[9]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[10]  外发光（灰）  \\og[10]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[11]  外发光（黑）  \\og[11]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\og[12]  外发光（白）  \\og[12]测试的字符 \\dDCOG[reset]\n" + 
				
				"》外发光厚度如下：\n" + 
				"\\\\os[20]  外发光（赤+加宽）  \\og[1]\\os[20]测试的字符 \\dDCOG[reset]\n" + 
				"\\\\os[20]  外发光（白+加宽）  \\og[12]\\os[20]测试的字符 \\dDCOG[reset]\n" + 
				"可以看出，外发光如果加宽，颜色会被减淡，\n" + 
				"并且由于外发光亮度很低，需要 亮红、亮橙、亮黄 之类的颜色，才能隐约看出发光效果。\n" + 
				"当然，将描边和外发光叠加使用也是一个突出发光的有效办法。\n" + 
				
				"》外发光临时关闭/开启：\n" + 
				"\\\\oo[on]或\\\\oo[off]  \\og[12]\\os[20]测试\\oo[off]的一段\\oo[on]字符\\oo[off]      \\\\dDCOG[5:8:10:-16]  \\dDCOG[5:8:10:-16]发光偏移很远的字符 \n";
	
	temp_window.drill_COWC_drawText( text, options );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharOuterGlow = false;
		var pluginTip = DrillUp.drill_DCOG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

