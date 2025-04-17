//=============================================================================
// Drill_DialogCharOuterBorder.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        窗口字符 - 描边效果
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
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于所有窗口。
 * 2.了解更多内容，可以去看看 "23.窗口字符 > 关于字符描边与外发光.docx"。
 * 描边效果：
 *   (1.使用该插件的窗口字符，可以实现字符的描边效果。
 *      游戏初始设置中，所有文本都默认有一层厚度为4的半透明黑色描边。
 * 设计：
 *   (1.你可以将描边效果与外发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层示例 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\oe[on]         之后的文本开启描边效果，简写形式。
 * 窗口字符：\oe[off]        之后的文本关闭描边效果，简写形式。
 * 窗口字符：\oc[1]          之后的文本使用描边颜色1，简写形式。
 * 窗口字符：\ow[4]          之后的文本描边厚度为4，简写形式。
 * 窗口字符：\fr             全重置字符，重置之后文本所有设置，包括恢复默认描边。
 * 
 * 窗口字符：\dDCOB[on]      之后的文本开启描边效果。
 * 窗口字符：\dDCOB[off]     之后的文本关闭描边效果。
 * 窗口字符：\dDCOB[1]       之后的文本使用描边颜色1。
 * 窗口字符：\dDCOB[1:4]     之后的文本使用描边颜色1，厚度4。
 * 窗口字符：\dDCOB[reset]   之后的文本只恢复默认描边。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOB[1]描边\dDCOB[reset]"，包裹的字符将会产生自定义描边效果。
 * 2.字符"\dDCOB[reset]"和"\fr"会恢复默认的描边效果，
 *   字符"\dDCOB[off]"可以临时关闭描边效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>描边效果 : 所有文本 : 描边开关 : 开启
 * 插件指令：>描边效果 : 所有文本 : 描边开关 : 关闭
 * 插件指令：>描边效果 : 所有文本 : 修改颜色 : 颜色[1]
 * 插件指令：>描边效果 : 所有文本 : 修改厚度 : 厚度[4]
 * 插件指令：>描边效果 : 所有文本 : 恢复默认描边
 * 
 * 插件指令：>描边效果 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>描边效果 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>描边效果 : 对话框 : 描边开关 : 开启
 * 插件指令：>描边效果 : 对话框 : 描边开关 : 关闭
 * 插件指令：>描边效果 : 对话框 : 修改颜色 : 颜色[1]
 * 插件指令：>描边效果 : 对话框 : 修改厚度 : 厚度[4]
 * 插件指令：>描边效果 : 对话框 : 恢复默认描边
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   并且 全重置字符\fr 执行重置时，也会重置为 此设置的值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2."修改厚度 : 厚度[0]" 与 "描边开关 : 关闭" 的效果一样，
 *   都会关闭描边的功能。
 * 3."恢复默认描边"即恢复当前插件参数配置的情况，包括开启/关闭的状态设置。
 *   另外，游戏设置的默认为所有字符都有一层厚度为4的半透明黑色描边。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>描边效果 : 固定对话框描边颜色 : 颜色[1]
 * 插件指令(旧)：>描边效果 : 固定对话框描边厚度 : 厚度[4]
 * 插件指令(旧)：>描边效果 : 固定对话框描边厚度 : 厚度[0]
 * 插件指令(旧)：>描边效果 : 恢复对话框描边
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>描边效果 : DEBUG描边效果字符测试 : 开启
 * 插件指令：>描边效果 : DEBUG描边效果字符测试 : 关闭
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
 * 2.字符的描边效果只在每次绘制字符时执行，而且只单次执行，
 *   所以几乎不考虑其消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * [v1.2]
 * 添加了 插件指令 固定对话框的 描边功能。
 * [v1.3]
 * 完善了作用于所有文本的功能。
 * [v1.4]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 *
 * 
 * @param ---全局默认值---
 * @desc 
 *
 * @param 所有文本-默认是否描边
 * @parent ---全局默认值---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后所有文本会描边，描边开关也可以通过插件指令控制。
 * @default true
 * 
 * @param 所有文本-默认描边颜色ID
 * @parent ---全局默认值---
 * @type number
 * @min 1
 * @desc 所有字符的 默认描边颜色，需填入当前插件配置的描边颜色id。
 * @default 11
 * 
 * @param 所有文本-默认描边厚度
 * @parent ---全局默认值---
 * @type number
 * @min 1
 * @desc 所有字符的 默认描边厚度。(不允许设置厚度0)
 * @default 4
 * 
 * 
 * @param 对话框描边模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 自定义模式
 *
 * @param 对话框-是否描边
 * @parent 对话框描边模式
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 对话框模式为"自定义模式"时生效。开启后对话框文本会描边，描边开关也可以通过插件指令控制。
 * @default true
 * 
 * @param 对话框-描边颜色ID
 * @parent 对话框描边模式
 * @type number
 * @min 1
 * @desc 对话框模式为"自定义模式"时生效。对话框字符的描边颜色，需填入当前插件配置的描边颜色id。
 * @default 11
 * 
 * @param 对话框-描边厚度
 * @parent 对话框描边模式
 * @type number
 * @min 1
 * @desc 对话框模式为"自定义模式"时生效。对话框字符的描边厚度。(不允许设置厚度0)。
 * @default 4
 * 
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
 * @default {"标记":"==全黑==","颜色代码":"#000000","描边透明度":"255"}
 * 
 * @param 颜色-14
 * @parent ---描边颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==全白==","颜色代码":"#FFFFFF","描边透明度":"255"}
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
 * @desc 颜色对应的字符串代码，格式为"#FFFFFF"，大写小写字母都可以识别。
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
//				> \OE[on]
//				> \OE[off]
//				> \OC[0]
//				> \OW[0]
//				> \dDCOB[reset]
//				> \dDCOB[on]
//				> \dDCOB[off]
//				> \dDCOB[1]
//				> \dDCOB[1:5]
//			->☆全局默认值
//				->自带参数（继承）
//					> this.outlineEnabled
//					> this.outlineColor
//					> this.outlineWidth
//			->☆重置控制
//				->全重置字符（继承）
//				->自定义重置字符
//					> @@@dob[reset]
//			
//			->☆DEBUG描边测试
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于字符绘制核心（脚本）.docx
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
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
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
	DrillUp.drill_DCOB_getPluginTip_ColorError = function( index ){
		return "【" + DrillUp.g_DCOB_PluginTip_curName + "】\n描边颜色接受到一个无效的参数："+(index+1)+"。";
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_DCOB_getPluginTip_ColorNotFind = function( index ){
		return "【" + DrillUp.g_DCOB_PluginTip_curName + "】\n你没有在 描边颜色-"+(index+1)+" 中配置颜色，而你在游戏中使用了它。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogCharOuterBorder = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogCharOuterBorder');
	
	
	//==============================
	// * 静态数据 - 描边颜色
	//				（~struct~CommonColor）
	//==============================
	DrillUp.drill_DCOB_initCommonColor = function( dataFrom ){
		var data = {};
		data['color'] = String( dataFrom["颜色代码"] || "#000000" );
		data['opacity'] = Number( dataFrom["描边透明度"] || 120 );
		return data;
	}
	
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
	
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_DCOB_globalEnabled = String(DrillUp.parameters["所有文本-默认是否描边"] || "true") == "true"; 
	DrillUp.g_DCOB_globalColorIndex = Number(DrillUp.parameters["所有文本-默认描边颜色ID"] || 11) -1;	//（注意，index需要-1）
	DrillUp.g_DCOB_globalThickness = Number(DrillUp.parameters["所有文本-默认描边厚度"] || 4); 
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_DCOB_dialogMode = String(DrillUp.parameters["对话框描边模式"] || "与所有文本一致"); 
	DrillUp.g_DCOB_dialogEnabled = String(DrillUp.parameters["对话框-是否描边"] || "true") == "true"; 
	DrillUp.g_DCOB_dialogColorIndex = Number(DrillUp.parameters["对话框-描边颜色ID"] || 11) -1; 	//（注意，index需要-1）
	DrillUp.g_DCOB_dialogThickness = Number(DrillUp.parameters["对话框-描边厚度"] || 4); 
	
	
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
var _drill_DCOB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCOB_pluginCommand.call(this, command, args);
	this.drill_DCOB_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCOB_pluginCommand = function( command, args ){
	if( command === ">描边效果" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("厚度[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "描边开关" ){
						if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
							$gameSystem._drill_DCOB_globalEnabled = true;
						}
						if( temp2 == "关闭" || temp2 == "禁用" ){
							$gameSystem._drill_DCOB_globalEnabled = false;
						}
					}
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOB_globalColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						$gameSystem._drill_DCOB_globalThickness = Number(temp2);
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认描边" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOB_globalEnabled = DrillUp.g_DCOB_globalEnabled;
						$gameSystem._drill_DCOB_globalColorIndex = DrillUp.g_DCOB_globalColorIndex;
						$gameSystem._drill_DCOB_globalThickness = DrillUp.g_DCOB_globalThickness;
					}
				}
				if( args.length == 8 ){		//>描边效果 : 所有文本 : 修改设置 : 颜色[1] : 厚度[4]
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("]","");
					temp3 = temp3.replace("厚度[","");
					temp3 = temp3.replace("]","");
					if( temp1 == "修改设置" ){
						$gameSystem._drill_DCOB_globalColorIndex = Number(temp2)-1;
						$gameSystem._drill_DCOB_globalThickness = Number(temp3);
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
					temp2 = temp2.replace("]","");
					if( temp1 == "修改模式" ){
						$gameSystem._drill_DCOB_dialogMode = temp2;
					}
					if( temp1 == "描边开关" ){
						if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
							$gameSystem._drill_DCOB_dialogEnabled = true;
						}
						if( temp2 == "关闭" || temp2 == "禁用" ){
							$gameSystem._drill_DCOB_dialogEnabled = false;
						}
					}
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOB_dialogColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						$gameSystem._drill_DCOB_dialogThickness = Number(temp1);
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认描边" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOB_dialogEnabled = DrillUp.g_DCOB_dialogEnabled;
						$gameSystem._drill_DCOB_dialogColorIndex = DrillUp.g_DCOB_dialogColorIndex;
						$gameSystem._drill_DCOB_dialogThickness = DrillUp.g_DCOB_dialogThickness;
					}
				}
				if( args.length == 8 ){		//>描边效果 : 对话框 : 修改设置 : 颜色[1] : 厚度[4]
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("]","");
					temp3 = temp3.replace("厚度[","");
					temp3 = temp3.replace("]","");
					if( temp1 == "修改设置" ){
						$gameSystem._drill_DCOB_dialogColorIndex = Number(temp2)-1;
						$gameSystem._drill_DCOB_dialogThickness = Number(temp3);
					}
				}
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG描边效果字符测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCOB_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCOB_DebugEnabled = false;
					
				}
			}
		}
		
		/*-----------------旧指令------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复对话框描边" ){
				$gameSystem._drill_DCOB_dialogMode = DrillUp.g_DCOB_dialogMode;
				$gameSystem._drill_DCOB_dialogEnabled = DrillUp.g_DCOB_dialogEnabled;
				$gameSystem._drill_DCOB_dialogColorIndex = DrillUp.g_DCOB_dialogColorIndex;
				$gameSystem._drill_DCOB_dialogThickness = DrillUp.g_DCOB_dialogThickness;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("颜色[","");
			temp1 = temp1.replace("厚度[","");
			temp1 = temp1.replace("]","");
			if( type == "固定对话框描边颜色" ){
				$gameSystem._drill_DCOB_dialogColorIndex = Number(temp1)-1;
			}
			if( type == "固定对话框描边厚度" ){
				if( Number(temp1) <= 0 ){	//（厚度为0时，关闭描边）
					$gameSystem._drill_DCOB_dialogEnabled = false;
				}else{
					$gameSystem._drill_DCOB_dialogThickness = Number(temp1);
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
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_DCOB_globalEnabled = DrillUp.g_DCOB_globalEnabled;				//所有文本 - 开关
	this._drill_DCOB_globalColorIndex = DrillUp.g_DCOB_globalColorIndex;		//所有文本 - 颜色
	this._drill_DCOB_globalThickness = DrillUp.g_DCOB_globalThickness;			//所有文本 - 厚度
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_DCOB_dialogMode = DrillUp.g_DCOB_dialogMode;					//对话框 - 模式
	this._drill_DCOB_dialogEnabled = DrillUp.g_DCOB_dialogEnabled;				//对话框 - 开关
	this._drill_DCOB_dialogColorIndex = DrillUp.g_DCOB_dialogColorIndex;		//对话框 - 颜色
	this._drill_DCOB_dialogThickness = DrillUp.g_DCOB_dialogThickness;			//对话框 - 厚度
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCOB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCOB_dialogEnabled == undefined ){
		this.drill_DCOB_initSysData();
	}
};



//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 窗口字符 - 组合符配置（继承）
//==============================
var _drill_COWC_DCOB_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DCOB_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 描边开关（\OE[on]、\OE[off]）
	if( command.toUpperCase() == "OE" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@-oe[true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@-oe[false]" );
				return;
			}
			return;
		}
	}
	
	// > 『窗口字符定义』 - 描边颜色（\OC[0]）
	if( command.toUpperCase() == "OC" ){
		if( args.length == 1 ){
			var color_str = DrillUp.drill_DCOB_getColor( Number(args[0])-1 );
			this.drill_COWC_effect_submitCombined( "@@@-oc[" + color_str + "]" );
			return;
		}
	}
	
	// > 『窗口字符定义』 - 描边厚度（\OW[0]）
	if( command.toUpperCase() == "OW" ){
		if( args.length == 1 ){
			var width = Number(args[0]);
			this.drill_COWC_effect_submitCombined( "@@@-ow[" + width + "]" );
			return;
		}
	}
	
	if( command == "dDCOB" ){
		
		// > 『窗口字符定义』 - 描边配置 - 自定义重置字符（\dDCOB[reset]）
		if( args.length == 1 ){
			if( String(args[0]) == "reset" ){
				this.drill_COWC_effect_submitCombined( "@@@dob[reset]" );
				return;
			}
		}
		
		// > 『窗口字符定义』 - 描边配置 - 开关（\dDCOB[on]、\dDCOB[off]）
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@-oe[true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@-oe[false]" );
				return;
			}
		}
		
		// > 『窗口字符定义』 - 描边配置 - 颜色（\dDCOB[1]）
		if( args.length == 1 ){
			var color_str = DrillUp.drill_DCOB_getColor( Number(args[0])-1 );
			this.drill_COWC_effect_submitCombined( "@@@-oc[" + color_str + "]" );
			return;
		}
		
		// > 『窗口字符定义』 - 描边配置 - 颜色+厚度（\dDCOB[1:5]）
		if( args.length == 2 ){
			var color_str = DrillUp.drill_DCOB_getColor( Number(args[0])-1 );
			var width = Number(args[1]);
			this.drill_COWC_effect_submitCombined( "@@@-oc[" + color_str + "]" + "@@@-ow[" + width + "]" );
			return;
		}
	}
}
//==============================
// * 窗口字符应用之效果字符 - 底层字符
//==============================
//（已在 字符绘制核心 中实现，见函数 Game_Temp.prototype.drill_COCD_initOptions ）
//（已在 字符绘制核心 中实现，见函数 Game_Temp.prototype.drill_COCD_drawBaseText_initParam ）
//（已在 字符绘制核心 中实现，见函数 Game_Temp.prototype.drill_COCD_drawBaseText_outline ）
//（已在 字符绘制核心 中实现，见函数 Game_Temp.prototype.drill_COCD_textBlock_processStyle ）


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处提供 全局默认值，使得描边可以作用于所有文本。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 自带参数（继承）
//
//			说明：	> 由于 Bitmap 中存放了参数 outlineEnabled、outlineColor、outlineWidth，所以需要初始化赋值。
//					  核心会使用上述参数，并在函数 drill_COCD_initOptions 中执行绘制配置。
//==============================
var _drill_DCOB_COCD_initBitmapDefault = Bitmap.prototype.drill_COCD_org_initBitmapDefault;
Bitmap.prototype.drill_COCD_org_initBitmapDefault = function(){
	_drill_DCOB_COCD_initBitmapDefault.call(this);
	this.drill_DCOB_initBitmapDefault();
}
//==============================
// * 全局默认值 - 自带参数初始化
//==============================
Bitmap.prototype.drill_DCOB_initBitmapDefault = function(){
	if( $gameSystem == undefined ){ return; }
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_enabled = $gameSystem._drill_DCOB_globalEnabled;									//开关
	var cur_color = DrillUp.drill_DCOB_getColor( $gameSystem._drill_DCOB_globalColorIndex );	//颜色
	var cur_width = $gameSystem._drill_DCOB_globalThickness;									//厚度
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( this.drill_COWC_isInMessageWindow() == true ){
		
		if( $gameSystem._drill_DCOB_dialogMode == "自定义模式" ){
			cur_enabled = $gameSystem._drill_DCOB_dialogEnabled;									//开关
			cur_color = DrillUp.drill_DCOB_getColor( $gameSystem._drill_DCOB_dialogColorIndex );	//颜色
			cur_width = $gameSystem._drill_DCOB_dialogThickness;									//厚度
		}
	}
	
	// > 『全局默认值』 - 使用值
	this.outlineEnabled = cur_enabled;
	this.outlineColor = cur_color;
	this.outlineWidth = cur_width;
};
//==============================
// * 全局默认值 - 获取描边颜色（开放函数）
//
//			说明：	> 此处设置与 颜色核心 相互独立，使用自己的颜色表。
//					> 返回字符串，格式如"rgba(255,255,255,0.5)"。
//==============================
DrillUp.drill_DCOB_getColor = function( index ){
	if( DrillUp.g_DCOB_color_list[index] == undefined ){ console.log( DrillUp.drill_DCOB_getPluginTip_ColorError( index ) ); return "rgba(0,0,0,0.5)" }
	if( DrillUp.g_DCOB_color_list[index]['color'] == undefined ){ console.log( DrillUp.drill_DCOB_getPluginTip_ColorNotFind( index ) ); return "rgba(0,0,0,0.5)" }
	var str = DrillUp.g_DCOB_color_list[index]['color'];
	if( str.length == 7 ){
		var r = parseInt(str.substring(1, 3), 16);
		var g = parseInt(str.substring(3, 5), 16);
		var b = parseInt(str.substring(5, 7), 16);
		var a = DrillUp.g_DCOB_color_list[index]['opacity'] / 255;
		str = "rgba(" + r + "," + g + "," + b + ","+ a +")"
	}
	return str;
};


//=============================================================================
// ** ☆重置控制
//
//			说明：	> 此处兼容 重置 功能，包括 全重置字符 的效果。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 重置控制 - 全重置字符（继承）
//==============================
// （不需要继承，因为 drill_COCD_textBlock_fontReset 中已经实现了赋值fr_xxx）
//==============================
// * 重置控制 - 全重置字符 - 执行
//==============================
Game_Temp.prototype.drill_DCOB_reset = function( cur_infoParam, cur_baseParam, cur_blockParam ){
	cur_baseParam['outlineEnabled'] = cur_baseParam['fr_outlineEnabled'];
	cur_baseParam['outlineColor']   = cur_baseParam['fr_outlineColor'];
	cur_baseParam['outlineWidth']   = cur_baseParam['fr_outlineWidth'];
};
//==============================
// * 重置控制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_DCOB_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_DCOB_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 自定义重置字符（@@@dob[reset]） drill_outer_border
	if( command == "@@@dob" ){		//（大小写敏感）
		if( args.length == 1 ){
			if( String(args[0]) == "reset" ){
				this.drill_DCOB_reset( cur_infoParam, cur_baseParam, cur_blockParam );
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
};



//=============================================================================
// ** ☆DEBUG描边测试
//
//			说明：	> 此模块控制 DEBUG描边测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG描边测试 - 帧刷新（地图界面）
//==============================
var _drill_DCOB_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DCOB_debug_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCOB_DebugEnabled == true ){
		$gameTemp._drill_DCOB_DebugEnabled = undefined;
		this.drill_DCOB_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_DCOB_DebugEnabled == false ){
		$gameTemp._drill_DCOB_DebugEnabled = undefined;
		if( this._drill_DCOB_DebugSprite != undefined ){
			this.removeChild(this._drill_DCOB_DebugSprite);
			this._drill_DCOB_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG描边测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_DCOB_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCOB_DebugSprite != undefined ){
		this.removeChild(this._drill_DCOB_DebugSprite);
		this._drill_DCOB_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 40, 736, 544 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DCOB_DebugSprite = temp_window;
	
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
	var text =  "【" + DrillUp.g_DCOB_PluginTip_curName + "】\n" + 
				"》当前测试 描边 的功能效果。\n" + 
				"如果不做任何操作，则使用 全局默认值-所有文本 的描边配置。\n" + 
				"若插件配置了所有文本开启描边，那么此段文本也会对应有描边效果。\n" + 
				
				"》描边颜色如下：\n" + 
				"\\\\oc[1]  描边（赤）  \\oc[1]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[2]  描边（橙）  \\oc[2]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[3]  描边（黄）  \\oc[3]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[4]  描边（绿）  \\oc[4]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[5]  描边（青）  \\oc[5]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[6]  描边（蓝）  \\oc[6]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[7]  描边（紫）  \\oc[7]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[8]  描边（粉）  \\oc[8]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[9]  描边（棕）  \\oc[9]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[10]  描边（灰）  \\oc[10]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[11]  描边（黑）  \\oc[11]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[12]  描边（白）  \\oc[12]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[13]  描边（全黑）  \\oc[13]测试的字符 \\dDCOB[reset]\n" + 
				"\\\\oc[14]  描边（全白）  \\oc[14]测试的字符 \\dDCOB[reset]\n" + 
				"可以看出，描边的颜色如果不透明，会特别显眼。\n" + 
				
				"》描边临时关闭/开启：\n" + 
				"\\\\oe[on]或\\\\oe[off]  \\oc[6]测试\\oe[off]的一段\\oe[on]字符 \n";
	
	temp_window.drill_COWC_drawText( text, options );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharOuterBorder = false;
		var pluginTip = DrillUp.drill_DCOB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

