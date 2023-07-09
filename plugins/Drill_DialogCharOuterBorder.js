//=============================================================================
// Drill_DialogCharOuterBorder.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        窗口字符 - 描边效果
 * @author Drill_up
 * 
 * @Drill_LE_param "颜色-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DCOB_color_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogCharOuterBorder +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置窗口字符的 描边效果。
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
 * 描边效果：
 *   (1.使用描边的窗口字符包裹，可以实现字符的描边效果。
 *      默认情况下，所有字符都会有一层厚度为4的半透明黑色描边。
 * 设计：
 *   (1.你可以将描边效果与发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dDCOB[1]      之后的文字使用描边颜色1。
 * 窗口字符：\dDCOB[1:4]    之后的文字使用描边颜色1，厚度4。
 * 
 * 窗口字符：\oc[1]         之后的文字使用描边颜色1，简写形式。
 * 窗口字符：\ow[4]         之后的文字描边厚度为4，简写形式。
 * 窗口字符：\fr            重置之后文字所有设置。能恢复为默认描边。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOB[1]描边\fr"，包裹的字符将会产生描边效果。
 * 2.你不想让文字带有描边效果，设置厚度0即可去掉。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 对话框
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>描边效果 : 固定对话框描边 : 颜色[1] : 厚度[4]
 * 插件指令：>描边效果 : 恢复对话框描边
 * 插件指令：>描边效果 : 固定对话框描边颜色 : 颜色[1]
 * 插件指令：>描边效果 : 固定对话框描边厚度 : 厚度[4]
 * 
 * 1.插件指令设置后，对话框描边的修改 永久有效。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
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
 * 2.由于描边字符只单次执行，所以几乎不考虑其消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * [v1.2]
 * 添加了 插件指令 固定对话框的 描边功能。
 * 
 *
 * 
 * @param ---默认设置---
 * @desc 
 * 
 * @param 默认描边颜色ID(全局)
 * @parent ---默认设置---
 * @type number
 * @min 1
 * @desc 默认字符外框的颜色，对应当前描边颜色的id。注意，对游戏中的所有窗口都有效。
 * @default 11
 * 
 * @param 默认描边厚度(全局)
 * @parent ---默认设置---
 * @type number
 * @min 0
 * @desc 默认字符外框的厚度。设为0时，则不绘制字符外框。注意，对游戏中的所有窗口都有效。
 * @default 4
 * 
 * @param ---描边颜色---
 * @default 
 * 
 * @param 颜色-1
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明赤==","颜色代码":"#FF4444","描边透明度":"120"}
 * 
 * @param 颜色-2
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明橙==","颜色代码":"#FF784C","描边透明度":"120"}
 * 
 * @param 颜色-3
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明黄==","颜色代码":"#FFFF40","描边透明度":"120"}
 * 
 * @param 颜色-4
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明绿==","颜色代码":"#80FF80","描边透明度":"120"}
 * 
 * @param 颜色-5
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明青==","颜色代码":"#98F5FF","描边透明度":"120"}
 * 
 * @param 颜色-6
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明蓝==","颜色代码":"#40C0F0","描边透明度":"120"}
 * 
 * @param 颜色-7
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明紫==","颜色代码":"#8080FF","描边透明度":"120"}
 * 
 * @param 颜色-8
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明粉==","颜色代码":"#FF69B4","描边透明度":"120"}
 * 
 * @param 颜色-9
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明棕==","颜色代码":"#8B4C39","描边透明度":"120"}
 * 
 * @param 颜色-10
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明灰==","颜色代码":"#797979","描边透明度":"120"}
 * 
 * @param 颜色-11
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明黑==","颜色代码":"#000000","描边透明度":"120"}
 * 
 * @param 颜色-12
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==半透明白==","颜色代码":"#FFFFFF","描边透明度":"120"}
 * 
 * @param 颜色-13
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-14
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-15
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-16
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-17
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-18
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-19
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-20
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-21
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-22
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-23
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-24
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-25
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-26
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-27
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-28
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-29
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-30
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-31
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-32
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-33
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-34
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-35
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-36
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-37
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-38
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-39
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-40
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-41
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-42
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-43
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-44
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-45
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-46
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-47
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-48
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-49
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-50
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-51
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-52
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-53
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-54
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-55
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-56
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-57
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-58
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-59
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-60
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-61
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-62
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-63
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-64
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-65
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-66
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-67
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-68
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-69
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-70
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-71
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-72
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-73
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-74
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-75
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-76
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-77
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-78
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-79
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-80
 * @parent ---描边颜色---
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
 * @param 描边透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 120
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCOB (Dialog_Char_Outer_Border)
//		临时全局变量	DrillUp.g_DCOB_xxx
//		临时局部变量	this._drill_DCOB_xxx
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
//			->☆描边绑定
//			->☆厚度设置
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
	DrillUp.g_DCOB_PluginTip_curName = "Drill_DialogCharOuterBorder.js 窗口字符-描边效果";
	DrillUp.g_DCOB_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCOB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCOB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCOB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCOB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCOB_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 日志 - 无效参数
	//==============================
	DrillUp.drill_DCOB_getPluginTip_ColorError = function( n ){
		return "【" + DrillUp.g_DCOB_PluginTip_curName + "】\n描边颜色接受到一个无效的参数："+n+"。";
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_DCOB_getPluginTip_ColorNotFind = function( n ){
		return "【" + DrillUp.g_DCOB_PluginTip_curName + "】\n你没有在 描边颜色-"+n+" 中配置颜色，而你在游戏中使用了它。";
	};
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogCharOuterBorder = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogCharOuterBorder');
	
	
	//==============================
	// * 变量获取 - 描边颜色
	//				（~struct~CommonColor）
	//==============================
	DrillUp.drill_DCOB_initCommonColor = function( dataFrom ){
		var data = {};
		data['color'] = String( dataFrom["颜色代码"] || "#000000" );
		data['opacity'] = Number( dataFrom["描边透明度"] || 120 );
		return data;
	}
	//==============================
	// * 临时全局 - 获取描边颜色
	//
	//			说明：	返回字符串，格式为 rgba(255,255,255,0.5)
	//==============================
	DrillUp.drill_DCOB_getColor = function( n ){
		if( DrillUp.g_DCOB_color_list[n-1] == undefined ){ console.log( DrillUp.drill_DCOB_getPluginTip_ColorError( n ) ); return "rgba(0,0,0,0.5)" }
		if( DrillUp.g_DCOB_color_list[n-1]['color'] == undefined ){ console.log( DrillUp.drill_DCOB_getPluginTip_ColorNotFind( n ) ); return "rgba(0,0,0,0.5)" }
		var str = DrillUp.g_DCOB_color_list[n-1]['color'];
		if( str.length == 7 ){
			var r = parseInt(str.substring(1, 3), 16);
			var g = parseInt(str.substring(3, 5), 16);
			var b = parseInt(str.substring(5, 7), 16);
			var a = DrillUp.g_DCOB_color_list[n]['opacity'] / 255;
			str = "rgba(" + r + "," + g + "," + b + ","+ a +")"
		}
		return str;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCOB_fontEdgeColorIndex = Number(DrillUp.parameters["默认描边颜色ID(全局)"] || 1); 
	DrillUp.g_DCOB_fontEdgeThickness = Number(DrillUp.parameters["默认描边厚度(全局)"] || 4); 
	
	/*-----------------描边颜色------------------*/
	DrillUp.g_DCOB_color_list_length = 80;
	DrillUp.g_DCOB_color_list = [];
	for( var i = 0; i < DrillUp.g_DCOB_color_list_length; i++ ){
		if( DrillUp.parameters['颜色-' + String(i+1) ] != undefined &&
			DrillUp.parameters['颜色-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['颜色-' + String(i+1) ]);
			DrillUp.g_DCOB_color_list[i] = DrillUp.drill_DCOB_initCommonColor( data );
		}else{
			DrillUp.g_DCOB_color_list[i] = {};
		}
	}
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_DCOB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DCOB_pluginCommand.call(this, command, args);
	if( command === ">描边效果" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复对话框描边" ){
				$gameSystem._drill_DCOB_dialog_fontEdgeColorIndex = DrillUp.g_DCOB_fontEdgeColorIndex;
				$gameSystem._drill_DCOB_dialog_fontEdgeThickness = DrillUp.g_DCOB_fontEdgeThickness;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("颜色[","");
			temp1 = temp1.replace("厚度[","");
			temp1 = temp1.replace("]","");
			if( type == "固定对话框描边颜色" ){
				$gameSystem._drill_DCOB_dialog_fontEdgeColorIndex = Number(temp1)-1;
			}
			if( type == "固定对话框描边厚度" ){
				$gameSystem._drill_DCOB_dialog_fontEdgeThickness = Number(temp1);
			}
		}
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("颜色[","");
			temp1 = temp1.replace("]","");
			temp2 = temp2.replace("厚度[","");
			temp2 = temp2.replace("]","");
			if( type == "固定对话框描边" ){
				$gameSystem._drill_DCOB_dialog_fontEdgeColorIndex = Number(temp1)-1;
				$gameSystem._drill_DCOB_dialog_fontEdgeThickness = Number(temp2);
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
DrillUp.g_DCOB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCOB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DCOB_sys_initialize.call(this);
	this.drill_DCOB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCOB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DCOB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DCOB_saveEnabled == true ){	
		$gameSystem.drill_DCOB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DCOB_initSysData();
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
Game_System.prototype.drill_DCOB_initSysData = function() {
	this.drill_DCOB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DCOB_checkSysData = function() {
	this.drill_DCOB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DCOB_initSysData_Private = function() {
	
	this._drill_DCOB_fontEdgeColorIndex = DrillUp.g_DCOB_fontEdgeColorIndex;			//字符外框颜色（全局默认）
	this._drill_DCOB_fontEdgeThickness = DrillUp.g_DCOB_fontEdgeThickness;				//字符外框厚度（全局默认）
	
	this._drill_DCOB_dialog_fontEdgeColorIndex = DrillUp.g_DCOB_fontEdgeColorIndex;		//字符外框颜色（对话框）
	this._drill_DCOB_dialog_fontEdgeThickness = DrillUp.g_DCOB_fontEdgeThickness;		//字符外框厚度（对话框）
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCOB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCOB_dialog_fontEdgeColorIndex == undefined ){
		this.drill_DCOB_initSysData();
	}
	
};


//=============================================================================
// ** ☆描边绑定
//=============================================================================
//==============================
// * 描边绑定 - 效果字符转换 - 组合符（继承）
//==============================
var _drill_COWC_DCOB_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DCOB_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	// > 描边（\dDCOB）
	if( command == "dDCOB" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
		    this.contents.outlineColor = DrillUp.drill_DCOB_getColor( Number(temp1) );
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
		    this.contents.outlineColor = DrillUp.drill_DCOB_getColor( Number(temp1) );
			this.contents.outlineWidth = Number( Number(temp1) );
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	// > 外框色（\OC）
	if( command.toUpperCase() == "OC" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
		    this.contents.outlineColor = DrillUp.drill_DCOB_getColor( Number(temp1) );
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	// > 外框厚度（\OW）
	if( command.toUpperCase() == "OW" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			this.contents.outlineWidth = Number( Number(temp1) );
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
}
//==============================
// * 描边绑定 - 画笔同步（继承）
//==============================
var _drill_COWC_DCOB_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_COWC_DCOB_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to.outlineColor = bitmap_from.outlineColor;
	bitmap_to.outlineWidth = bitmap_from.outlineWidth;
};
//==============================
// * 描边绑定 - 重置绑定
//==============================
var _drill_DCOB_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	_drill_DCOB_resetFontSettings.call(this);
	this.drill_DCOB_resetOuterBorder();
};
//==============================
// * 描边绑定 - 重置（全局默认）
//==============================
Window_Base.prototype.drill_DCOB_resetOuterBorder = function() {
	if( this.contents == undefined ){ return; }
	
	var color_index = $gameSystem._drill_DCOB_fontEdgeColorIndex;
	if( color_index == 0 ){ color_index = 11; }
	this.contents.outlineColor = DrillUp.drill_DCOB_getColor( color_index );
	this.contents.outlineWidth = $gameSystem._drill_DCOB_fontEdgeThickness;
};
//==============================
// * 描边绑定 - 重置（对话框）
//==============================
Window_Message.prototype.drill_DCOB_resetOuterBorder = function() {
	if( this.contents == undefined ){ return; }
	
	var color_index = $gameSystem._drill_DCOB_dialog_fontEdgeColorIndex;
	if( color_index == 0 ){ color_index = 11; }
	this.contents.outlineColor = DrillUp.drill_DCOB_getColor( color_index );
	this.contents.outlineWidth = $gameSystem._drill_DCOB_dialog_fontEdgeThickness;
};


//=============================================================================
// ** ☆厚度设置
//
//			说明：	> 此处对 厚度设置为0 时进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 厚度设置 - 初始化
//==============================
var _drill_DCOB_bitmap_initialize2 = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function( width, height ){
	_drill_DCOB_bitmap_initialize2.call( this, width, height );
	
	// > 标记 - 外框色
	//（初始无法修改）
	
	// > 标记 - 外框厚度
	if( $gameSystem != undefined &&
		$gameSystem._drill_DCOB_fontEdgeThickness != undefined ){
		this.outlineWidth = $gameSystem._drill_DCOB_fontEdgeThickness;
	}
}
//==============================
// * 厚度设置 - 绘制设置
//==============================
var _drill_DCOB__drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
	
	// > 厚度小于等于0时，直接不绘制
	if( this.outlineWidth <= 0 ){ return; }
	
	// > 原函数
	_drill_DCOB__drawTextOutline.call( this, text, tx, ty, maxWidth );
}

/*
//=============================================================================
// ** ☆颜色文本绘制（边框色）
//
//			说明：	> 在文本绘制时，解析高级颜色并使用渐变。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_DCOB_bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
	
	//// > 高级颜色（渐变色）
	//if( typeof(this.outlineColor) == "string" && 
	//	this.outlineColor != "" && 
	//	this.outlineColor.indexOf("drill__") != -1 ){
		
		// > 渐变数据
		//var color_strList = this.outlineColor.substring(7).split('__');
		var color_strList = [ 270, 0, "#ff0000", 0.2, "#00ff00", 0.5, "#ffff00", 1.0, "#0000ff" ]
		
		var width = this.measureTextWidth( text );		//宽度
		var height = this.fontSize *4/5 +1;				//高度（实际文字比字体大小要矮一点）
		
		var angle = Number(color_strList[0]);			//角度
		if( angle >= 360 ){ angle = angle % 360; }		//
		var radian = angle / 180 * Math.PI;				//弧度
		
		
		// > 长方形与渐变斜线 求相交的两点
		var midPoint = new Point( tx+width/2, ty-height/2 );
		var angle_lim = Math.atan(width/height);
		//  90度
		if( radian === Math.PI/2 ){				
			var x_0 = midPoint.x + width/2;
			var y_0 = midPoint.y;
			var x_1 = midPoint.x - width/2;
			var y_1 = midPoint.y;
		//  270度
		}else if( radian === Math.PI*3/2 ){
			var x_0 = midPoint.x - width/2;
			var y_0 = midPoint.y;
			var x_1 = midPoint.x + width/2;
			var y_1 = midPoint.y;
		}else if( radian <= angle_lim || radian > 2*Math.PI - angle_lim ){
			var x_0 = midPoint.x + height/2 * Math.tan(radian);
			var y_0 = midPoint.y - height/2;
			var x_1 = midPoint.x - height/2 * Math.tan(radian);
			var y_1 = midPoint.y + height/2;
		}else if( radian > angle_lim && radian <= Math.PI - angle_lim ){
			var x_0 = midPoint.x + width/2;
			var y_0 = midPoint.y - width/(2 * Math.tan(radian));
			var x_1 = midPoint.x - width/2;
			var y_1 = midPoint.y + width/(2 * Math.tan(radian));
		}else if( radian > Math.PI - angle_lim && radian <= Math.PI + angle_lim ){
			var x_0 = midPoint.x - height/2 * Math.tan(radian);
			var y_0 = midPoint.y + height/2;
			var x_1 = midPoint.x + height/2 * Math.tan(radian);
			var y_1 = midPoint.y - height/2;
		}else {
			var x_0 = midPoint.x - width/2;
			var y_0 = midPoint.y + width/(2 * Math.tan(radian));
			var x_1 = midPoint.x + width/2;
			var y_1 = midPoint.y - width/(2 * Math.tan(radian));
		}
		
		//// > DEBUG - 显示矩阵和点
		//this.fillRect( tx, ty-height, width, height, "#00ff00" );
		//this.drawCircle( x_0, y_0, 3, "#ffff00" );
		//this.drawCircle( x_1, y_1, 3, "#ffff00" );
		
		// > 特殊偏移设置
		//		（可能是nwjs的bug，只要是在Bitmap中设置渐变绘制，都会出现此偏移问题）
		if( Utils.isNwjs() && this['drill_elements_drawText'] == true ){
			y_0 -= height ;
			y_1 -= height ;
		}
		
		// > 绘制渐变文字
		var context = this._context;
		var grad = context.createLinearGradient( x_0,y_0, x_1,y_1 );
		for(var i = 1; i < color_strList.length; i += 2 ){
			var pos = String( color_strList[i] );
			var color = String( color_strList[i+1] );
			if( pos == "" ){ break; }
			if( color == "" ){ break; }
			grad.addColorStop( pos, color );
		}
		context.save();
		context.strokeStyle = grad;
		context.lineWidth = 3;
		context.lineJoin = 'round';
		context.strokeText(text, tx, ty, maxWidth);
		context.restore();
		this._setDirty();
		
		
	//// > 普通颜色
	//}else{
	//	_drill_DCOB_bitmap_drawTextOutline.call(this,text, tx, ty, maxWidth);
	//}
};
*/

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharOuterBorder = false;
		var pluginTip = DrillUp.drill_DCOB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

