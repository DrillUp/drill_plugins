//=============================================================================
// Drill_DialogCharOuterGlow.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        窗口字符 - 外发光效果
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
 *   (1.使用描边的窗口字符包裹，可以实现字符的描边效果。
 *      外发光厚度为0表示不发光。
 * 设计：
 *   (1.你可以将描边效果与发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dDCOG[1]          之后的文字使用颜色1的外发光。
 * 窗口字符：\dDCOG[1:5:1:1]    之后的文字使用颜色1，厚度5，偏移(1,1)的外发光。
 * 窗口字符：\dDCOGr            之后的文字关闭外发光。
 * 
 * 窗口字符：\og[1]             与\dDCOG[1]一样，简写形式。
 * 窗口字符：\os[5]             之后的文字改变外发光厚度5，简写形式。
 * 窗口字符：\fr                重置之后文字所有设置。能恢复为默认外发光。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOG[1]发光\dDCOGr"，包裹的字符将会产生外发光效果。
 * 2.字符"\dDCOGr"只关闭外发光效果，字符"\fr"会重置所有设置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 对话框
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>外发光效果 : 固定对话框外发光 : 颜色[1] : 厚度[4] : 偏移[0,0]
 * 插件指令：>外发光效果 : 恢复对话框外发光
 * 插件指令：>外发光效果 : 固定对话框外发光颜色 : 颜色[1]
 * 插件指令：>外发光效果 : 固定对话框外发光厚度 : 厚度[4]
 * 插件指令：>外发光效果 : 固定对话框外发光偏移 : 偏移[0,0]
 * 
 * 1.插件指令设置后，对话框外发光的修改 永久有效。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2.外发光厚度为0表示不发光。
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
 * 2.由于发光字符只单次执行，所以几乎不考虑其消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 插件指令 固定对话框的 外发光功能。
 * 
 *
 * 
 * @param ---默认设置---
 * @desc 
 * 
 * @param 默认外发光颜色ID(全局)
 * @parent ---默认设置---
 * @type number
 * @min 1
 * @desc 默认外发光的颜色，对应当前外发光颜色的id。注意，对游戏中的所有窗口都有效。
 * @default 11
 * 
 * @param 默认外发光厚度(全局)
 * @parent ---默认设置---
 * @type number
 * @min 0
 * @desc 默认外发光的厚度，单位像素，0表示不发光。注意，对游戏中的所有窗口都有效。
 * @default 0
 * 
 * @param 默认外发光偏移 X(全局)
 * @parent ---默认设置---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。注意，对游戏中的所有窗口都有效。
 * @default 0
 * 
 * @param 默认外发光偏移 Y(全局)
 * @parent ---默认设置---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。注意，对游戏中的所有窗口都有效。
 * @default 0
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
//		★时间复杂度		o(n)  每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	
//		★最坏情况		
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			->☆插件指令
//			->☆存储数据
//			
//			->☆外发光
//
//
//		★家谱：
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
	DrillUp.drill_DCOG_getPluginTip_ColorError = function( n ){
		return "【" + DrillUp.g_DCOG_PluginTip_curName + "】\n外发光颜色接受到一个无效的参数："+n+"。";
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_DCOG_getPluginTip_ColorNotFind = function( n ){
		return "【" + DrillUp.g_DCOG_PluginTip_curName + "】\n你没有在 外发光颜色-"+n+" 中配置颜色，而你在游戏中使用了它。";
	};
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogCharOuterGlow = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogCharOuterGlow');
	
	
	//==============================
	// * 变量获取 - 外发光颜色
	//				（~struct~CommonColor）
	//==============================
	DrillUp.drill_DCOG_initCommonColor = function( dataFrom ){
		var data = {};
		data['color'] = String( dataFrom["颜色代码"] || "#FFFFFF" );
		return data;
	}
	//==============================
	// * 临时全局 - 获取外发光颜色
	//==============================
	DrillUp.drill_DCOG_getColor = function( n ){
		if( DrillUp.g_DCOG_color_list[n] == undefined ){ console.log( DrillUp.drill_DCOG_getPluginTip_ColorError( n ) ); return "#ffffff" }
		if( DrillUp.g_DCOG_color_list[n]['color'] == undefined ){ console.log( DrillUp.drill_DCOG_getPluginTip_ColorNotFind( n ) ); return "#ffffff" }
		return DrillUp.g_DCOG_color_list[n]['color'];
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCOG_shadowColorIndex = Number(DrillUp.parameters["默认外发光颜色ID(全局)"] || 1); 
	DrillUp.g_DCOG_shadowBlur = Number(DrillUp.parameters["默认外发光厚度(全局)"] || 0); 
	DrillUp.g_DCOG_shadowOffsetX = Number(DrillUp.parameters["默认外发光偏移 X(全局)"] || 0); 
	DrillUp.g_DCOG_shadowOffsetY = Number(DrillUp.parameters["默认外发光偏移 Y(全局)"] || 0); 
	
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
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复对话框外发光" ){
				$gameSystem._drill_DCOG_dialog_shadowColorIndex = DrillUp.g_DCOG_shadowColorIndex;
				$gameSystem._drill_DCOG_dialog_shadowBlur = DrillUp.g_DCOG_shadowBlur;
				$gameSystem._drill_DCOG_dialog_shadowOffsetX = DrillUp.g_DCOG_shadowOffsetX;
				$gameSystem._drill_DCOG_dialog_shadowOffsetY = DrillUp.g_DCOG_shadowOffsetY;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("颜色[","");
			temp1 = temp1.replace("厚度[","");
			temp1 = temp1.replace("偏移[","");
			temp1 = temp1.replace("]","");
			if( type == "固定对话框外发光颜色" ){
				$gameSystem._drill_DCOG_dialog_shadowColorIndex = Number(temp1)-1;
			}
			if( type == "固定对话框外发光厚度" ){
				$gameSystem._drill_DCOG_dialog_shadowBlur = Number(temp1);
			}
			if( type == "固定对话框外发光偏移" ){
				var temp_arr = temp1.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					$gameSystem._drill_DCOG_dialog_shadowOffsetX = Number(temp_arr[0]);
					$gameSystem._drill_DCOG_dialog_shadowOffsetY = Number(temp_arr[1]);
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			temp1 = temp1.replace("颜色[","");
			temp1 = temp1.replace("]","");
			temp2 = temp2.replace("厚度[","");
			temp2 = temp2.replace("]","");
			temp3 = temp3.replace("偏移[","");
			temp3 = temp3.replace("]","");
			if( type == "固定对话框外发光" ){
				$gameSystem._drill_DCOG_dialog_shadowColorIndex = Number(temp1)-1;
				$gameSystem._drill_DCOG_dialog_shadowBlur = Number(temp2);
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					$gameSystem._drill_DCOG_dialog_shadowOffsetX = Number(temp_arr[0]);
					$gameSystem._drill_DCOG_dialog_shadowOffsetY = Number(temp_arr[1]);
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
	
	this._drill_DCOG_shadowColorIndex = DrillUp.g_DCOG_shadowColorIndex;			//外发光颜色（全局默认）
	this._drill_DCOG_shadowBlur = DrillUp.g_DCOG_shadowBlur;						//外发光厚度（全局默认）
	this._drill_DCOG_shadowOffsetX = DrillUp.g_DCOG_shadowOffsetX;					//外发光偏移X（全局默认）
	this._drill_DCOG_shadowOffsetY = DrillUp.g_DCOG_shadowOffsetY;					//外发光偏移Y（全局默认）
	
	this._drill_DCOG_dialog_shadowColorIndex = DrillUp.g_DCOG_shadowColorIndex;		//外发光颜色（对话框）
	this._drill_DCOG_dialog_shadowBlur = DrillUp.g_DCOG_shadowBlur;					//外发光厚度（对话框）
	this._drill_DCOG_dialog_shadowOffsetX = DrillUp.g_DCOG_shadowOffsetX;			//外发光偏移X（对话框）
	this._drill_DCOG_dialog_shadowOffsetY = DrillUp.g_DCOG_shadowOffsetY;			//外发光偏移Y（对话框）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCOG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCOG_dialog_shadowColorIndex == undefined ){
		this.drill_DCOG_initSysData();
	}
	
};
	
	
//=============================================================================
// ** ☆外发光
//=============================================================================
//==============================
// * 外发光 - 字符转换（简单符）
//==============================
var _drill_DCOG_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_DCOG_processNewEffectChar_Simple.call( this, matched_index, command );
	
	// > 重置
	if( command == "dDCOGr" ){
		this.drill_DCOG_resetOuterGlow();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
}
//==============================
// * 外发光 - 字符转换（组合符）
//==============================
var _drill_DCOG_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DCOG_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	// > 设置外发光
	if( command == "dDCOG" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents._context.shadowBlur = $gameSystem._drill_DCOG_shadowBlur;
				this.contents._context.shadowOffsetX = $gameSystem._drill_DCOG_shadowOffsetX;
				this.contents._context.shadowOffsetY = $gameSystem._drill_DCOG_shadowOffsetY;
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		if( args.length == 4 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			var temp4 = String(args[3]);
			if( this.contents != undefined ){
				this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents._context.shadowBlur = Number(temp2);
				this.contents._context.shadowOffsetX = Number(temp3);
				this.contents._context.shadowOffsetY = Number(temp4);
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	
	// > 简写形式
	if( command.toLowerCase() == "og" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents._context.shadowBlur = $gameSystem._drill_DCOG_shadowBlur;
				this.contents._context.shadowOffsetX = $gameSystem._drill_DCOG_shadowOffsetX;
				this.contents._context.shadowOffsetY = $gameSystem._drill_DCOG_shadowOffsetY;
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	if( command.toLowerCase() == "os" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				this.contents._context.shadowBlur = Number(temp1);
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
};
//==============================
// * 外发光 - 画笔同步（继承）
//==============================
var _drill_COWC_DCOG_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_COWC_DCOG_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to._context.shadowColor = bitmap_from._context.shadowColor;
	bitmap_to._context.shadowBlur = bitmap_from._context.shadowBlur;
	bitmap_to._context.shadowOffsetX = bitmap_from._context.shadowOffsetX;
	bitmap_to._context.shadowOffsetY = bitmap_from._context.shadowOffsetY;
};
//==============================
// * 外发光 - 重置绑定
//==============================
var _drill_DCOG_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	_drill_DCOG_resetFontSettings.call(this);
	this.drill_DCOG_resetOuterGlow();
};
//==============================
// * 外发光 - 重置（全局默认）
//==============================
Window_Base.prototype.drill_DCOG_resetOuterGlow = function() {
	if( this.contents == undefined ){ return; }
	
	var color_index = $gameSystem._drill_DCOG_shadowColorIndex;
	if( color_index == 0 ){ color_index = 11; }
	this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( color_index );
	this.contents._context.shadowBlur = $gameSystem._drill_DCOG_shadowBlur;
	this.contents._context.shadowOffsetX = $gameSystem._drill_DCOG_shadowOffsetX;
	this.contents._context.shadowOffsetY = $gameSystem._drill_DCOG_shadowOffsetY;
};
//==============================
// * 外发光 - 重置（对话框）
//==============================
Window_Message.prototype.drill_DCOG_resetOuterGlow = function() {
	if( this.contents == undefined ){ return; }
	
	var color_index = $gameSystem._drill_DCOG_dialog_shadowColorIndex;
	if( color_index == 0 ){ color_index = 11; }
	this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( color_index );
	this.contents._context.shadowBlur = $gameSystem._drill_DCOG_dialog_shadowBlur;
	this.contents._context.shadowOffsetX = $gameSystem._drill_DCOG_dialog_shadowOffsetX;
	this.contents._context.shadowOffsetY = $gameSystem._drill_DCOG_dialog_shadowOffsetY;
};


/*
var _drill_DCOG__drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
	
    var context = this._context;
	context.shadowColor = "#00ffff";
	context.shadowBlur = 5;
	context.shadowOffsetX = 1;
	context.shadowOffsetY = 1;
	
	// > 原函数
	_drill_DCOG__drawTextOutline.call( this, text, tx, ty, maxWidth );
}*/


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharOuterGlow = false;
		var pluginTip = DrillUp.drill_DCOG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

