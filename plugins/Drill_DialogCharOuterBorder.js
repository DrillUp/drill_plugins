//=============================================================================
// Drill_DialogCharOuterBorder.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        窗口字符 - 描边效果
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
 *      默认游戏设置中，所有字符都会有一层厚度为4的半透明黑色描边。
 * 设计：
 *   (1.你可以将描边效果与发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层示例 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dDCOB[1]      之后的文字使用描边颜色1。
 * 窗口字符：\dDCOB[1:4]    之后的文字使用描边颜色1，厚度4。
 * 窗口字符：\dDCOBr        之后的文字恢复描边设置。
 * 窗口字符：\dDCOBoff      之后的文字关闭描边效果。
 * 
 * 窗口字符：\oc[1]         之后的文字使用描边颜色1，简写形式。
 * 窗口字符：\ow[4]         之后的文字描边厚度为4，简写形式。
 * 窗口字符：\fr            重置之后文字所有设置。包括恢复描边设置。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOB[1]描边\dDCOBr"，包裹的字符将会产生自定义描边效果。
 * 2.字符"\dDCOBr"和"\fr"会恢复默认的描边效果，
 *   字符"\dDCOBoff"可以临时关闭外发光效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改描边设置：
 * 
 * 插件指令：>描边效果 : 所有文本 : 开启
 * 插件指令：>描边效果 : 所有文本 : 关闭
 * 插件指令：>描边效果 : 所有文本 : 修改设置 : 颜色[1] : 厚度[4]
 * 插件指令：>描边效果 : 所有文本 : 修改颜色 : 颜色[1]
 * 插件指令：>描边效果 : 所有文本 : 修改厚度 : 厚度[4]
 * 插件指令：>描边效果 : 所有文本 : 恢复默认设置
 * 
 * 插件指令：>描边效果 : 对话框 : 修改模式 : 自定义描边
 * 插件指令：>描边效果 : 对话框 : 修改模式 : 与所有文本的描边一致
 * 插件指令：>描边效果 : 对话框 : 修改模式 : 不描边
 * 插件指令：>描边效果 : 对话框 : 修改设置 : 颜色[1] : 厚度[4]
 * 插件指令：>描边效果 : 对话框 : 修改颜色 : 颜色[1]
 * 插件指令：>描边效果 : 对话框 : 修改厚度 : 厚度[4]
 * 插件指令：>描边效果 : 对话框 : 恢复默认设置
 * 
 * 1.插件指令设置后，其修改永久有效。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2."修改厚度 : 厚度[0]" 与 "修改模式 : 不描边" 的效果一样，
 *   都会关闭描边的功能。
 * 3."恢复默认设置"即恢复当前插件参数配置的情况，包括开启/关闭的状态设置。
 *   另外，游戏设置的默认为所有字符都有一层厚度为4的半透明黑色描边。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>描边效果 : 固定对话框描边颜色 : 颜色[1]
 * 插件指令(旧)：>描边效果 : 固定对话框描边厚度 : 厚度[0]
 * 插件指令(旧)：>描边效果 : 恢复对话框描边
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
 * @desc true - 开启，false - 关闭，开启后所有文本都描边。也可以通过插件指令开启或关闭。
 * @default true
 * 
 * @param 所有文本-描边颜色ID
 * @parent 是否对所有文本有效
 * @type number
 * @min 1
 * @desc 字符外框的颜色，当前插件配置的描边颜色的id。注意，对游戏中的所有文本都有效。
 * @default 11
 * 
 * @param 所有文本-描边厚度
 * @parent 是否对所有文本有效
 * @type number
 * @min 1
 * @desc 字符外框的厚度。(不允许设置厚度0)。注意，对游戏中的所有文本都有效。
 * @default 4
 *
 * @param 对话框描边模式
 * @parent ---常规---
 * @type select
 * @option 自定义描边
 * @value 自定义描边
 * @option 与所有文本的描边一致
 * @value 与所有文本的描边一致
 * @option 不描边
 * @value 不描边
 * @desc 对话框的描边模式。
 * @default 与所有文本的描边一致
 * 
 * @param 对话框-描边颜色ID
 * @parent 对话框描边模式
 * @type number
 * @min 1
 * @desc 字符外框的颜色，当前插件配置的描边颜色的id。
 * @default 11
 * 
 * @param 对话框-描边厚度
 * @parent 对话框描边模式
 * @type number
 * @min 1
 * @desc 字符外框的厚度。(不允许设置厚度0)。
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
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	2.3（drill_DCOB_getColor）0.9ms（drill_DCOB_resetOuterBorder）
//		★最坏情况		所有文本都描边（其实也不坏）
//		★备注			描边字符的消耗一直都不大，毕竟调用的是canvas的描边绘制功能。
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
//			->☆描边控制
//				->设置（开放函数）
//				->只修改颜色（开放函数）
//				->只修改厚度（开放函数）
//				->清除（开放函数）
//			->☆描边绑定
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
	//==============================
	// * 临时全局 - 获取描边颜色
	//
	//			说明：	> 此处设置与 颜色核心 相互独立，使用自己的颜色表。
	//					> 返回字符串，格式为 rgba(255,255,255,0.5)
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
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCOB_globalEnabled = String(DrillUp.parameters["是否对所有文本有效"] || "true") == "true"; 
	DrillUp.g_DCOB_globalColorIndex = Number(DrillUp.parameters["所有文本-描边颜色ID"] || 11) -1;	//（注意，index需要-1）
	DrillUp.g_DCOB_globalThickness = Number(DrillUp.parameters["所有文本-描边厚度"] || 4); 
	
	DrillUp.g_DCOB_dialogMode = String(DrillUp.parameters["对话框描边模式"] || "与所有文本的描边一致"); 
	DrillUp.g_DCOB_dialogColorIndex = Number(DrillUp.parameters["对话框-描边颜色ID"] || 11) -1; 	//（注意，index需要-1）
	DrillUp.g_DCOB_dialogThickness = Number(DrillUp.parameters["对话框-描边厚度"] || 4); 
	
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
		
		/*-----------------所有文本------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
						$gameSystem._drill_DCOB_globalEnabled = true;
					}
					if( temp1 == "关闭" || temp1 == "禁用" ){
						$gameSystem._drill_DCOB_globalEnabled = false;
					}
					if( temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOB_globalEnabled = DrillUp.g_DCOB_globalEnabled;
						$gameSystem._drill_DCOB_globalColorIndex = DrillUp.g_DCOB_globalColorIndex;
						$gameSystem._drill_DCOB_globalThickness = DrillUp.g_DCOB_globalThickness;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("厚度[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOB_globalColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						$gameSystem._drill_DCOB_globalThickness = Number(temp2);
					}
				}
				if( args.length == 8 ){
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
		
		/*-----------------对话框------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
				
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认设置" ){
						$gameSystem._drill_DCOB_dialogMode = DrillUp.g_DCOB_dialogMode;
						$gameSystem._drill_DCOB_dialogColorIndex = DrillUp.g_DCOB_dialogColorIndex;
						$gameSystem._drill_DCOB_dialogThickness = DrillUp.g_DCOB_dialogThickness;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("厚度[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改模式" ){
						$gameSystem._drill_DCOB_dialogMode = temp2;
					}
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_DCOB_dialogColorIndex = Number(temp2)-1;
					}
					if( temp1 == "修改厚度" ){
						if( Number(temp2) <= 0 ){	//（厚度为0时，关闭描边）
							$gameSystem._drill_DCOB_dialogMode = "不描边";
						}else{
							$gameSystem._drill_DCOB_dialogThickness = Number(temp2);
						}
					}
				}
				if( args.length == 8 ){
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
		
		/*-----------------旧指令------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复对话框描边" ){
				$gameSystem._drill_DCOB_dialogMode = DrillUp.g_DCOB_dialogMode;
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
					$gameSystem._drill_DCOB_dialogMode = "不描边";
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
	
	// > 所有文本
	this._drill_DCOB_globalEnabled = DrillUp.g_DCOB_globalEnabled;				//开关
	this._drill_DCOB_globalColorIndex = DrillUp.g_DCOB_globalColorIndex;		//字符外框颜色
	this._drill_DCOB_globalThickness = DrillUp.g_DCOB_globalThickness;			//字符外框厚度
	
	// > 对话框
	this._drill_DCOB_dialogMode = DrillUp.g_DCOB_dialogMode;					//模式
	this._drill_DCOB_dialogColorIndex = DrillUp.g_DCOB_dialogColorIndex;		//字符外框颜色
	this._drill_DCOB_dialogThickness = DrillUp.g_DCOB_dialogThickness;			//字符外框厚度
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCOB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCOB_dialogMode == undefined ){
		this.drill_DCOB_initSysData();
	}
	
};


//=============================================================================
// ** ☆效果字符应用
//=============================================================================
//==============================
// * 效果字符应用 - 字符转换（简单符）
//==============================
var _drill_DCOB_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_DCOB_processNewEffectChar_Simple.call( this, matched_index, command );
	
	// > 重置（\dDCOBr）
	if( command == "dDCOBr" ){
		this.drill_DCOB_resetOuterBorder();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
	// > 清除（\dDCOBoff）
	if( command == "dDCOBoff" ){
		this.contents.drill_DCOB_clearBorder();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
}
//==============================
// * 效果字符应用 - 字符转换（组合符）
//==============================
var _drill_COWC_DCOB_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DCOB_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDCOB" ){
		
		// > 只设置颜色（\dDCOB[1]）
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				var color = DrillUp.drill_DCOB_getColor( Number(temp1)-1 );
				this.contents.drill_DCOB_setBorderColor( color );
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		
		// > 全属性设置（\dDCOB[1:5]）
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			if( this.contents != undefined ){
				var color = DrillUp.drill_DCOB_getColor( Number(temp1)-1 );
				this.contents.drill_DCOB_setBorder(
					color,
					Number(temp2)
				);
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	
	// > 只设置颜色（\OC）
	if( command.toUpperCase() == "OC" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				var color = DrillUp.drill_DCOB_getColor( Number(temp1)-1 );
				this.contents.drill_DCOB_setBorderColor( color );
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	// > 只设置厚度（\OW）
	if( command.toUpperCase() == "OW" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( Number(temp1) == 0 ){	//（厚度为0时，直接关闭）
				this.contents.drill_DCOB_clearBorder();
			}else{
				if( this.contents != undefined ){
					this.contents.drill_DCOB_setBorderThickness( Number(temp1) );
				}
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
}


//=============================================================================
// ** ☆描边控制
//
//			说明：	> 此模块专门管理 描边的函数。
//					> 注意，只有这个模块才能使用关键词 outline， 其他地方不要直接设置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 描边控制 - 设置（开放函数）
//
//			说明：	> 注意outlineColor必须为 颜色字符串。
//==============================
Bitmap.prototype.drill_DCOB_setBorder = function( outlineColor, outlineWidth ){
	if( outlineWidth <= 0 ){ return; }
	if( outlineColor == "" ){ return; }
	this.outlineWidth = outlineWidth;
	this.outlineColor = outlineColor;
};
//==============================
// * 描边控制 - 只修改颜色（开放函数）
//
//			说明：	> 注意shadowColor必须为 颜色字符串。
//==============================
Bitmap.prototype.drill_DCOB_setBorderColor = function( outlineColor ){
	if( outlineColor == "" ){ return; }
	if( this.outlineWidth == undefined ||	//（若为null，则使用默认 所有文本 的设置）
		this.outlineWidth == 0 ){
		this.outlineWidth = $gameSystem._drill_DCOB_globalThickness;
	}
	this.outlineColor = outlineColor;
};
//==============================
// * 描边控制 - 只修改厚度（开放函数）
//==============================
Bitmap.prototype.drill_DCOB_setBorderThickness = function( outlineWidth ){
	if( outlineWidth <= 0 ){ return; }
	this.outlineWidth = outlineWidth;
	if( this.outlineColor == undefined ){	//（若为null，则使用默认 所有文本 的设置）
		this.outlineColor = DrillUp.drill_DCOB_getColor( $gameSystem._drill_DCOB_globalColorIndex );
	}
};
//==============================
// * 描边控制 - 清除（开放函数）
//==============================
Bitmap.prototype.drill_DCOB_clearBorder = function(){
	if( this.outlineColor == undefined ){ return; }
	this.outlineColor = null;
	this.outlineWidth = null;				//（注意，该参数赋值后，获取会返回0而不是null）
};
//==============================
// * 描边控制 - 画笔同步（继承）
//==============================
var _drill_COWC_DCOB_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_COWC_DCOB_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to.outlineColor = bitmap_from.outlineColor;
	bitmap_to.outlineWidth = bitmap_from.outlineWidth;
};
//==============================
// * 描边控制 - 初始化
//==============================
var _drill_DCOB_bitmap_initialize2 = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function( width, height ){
	_drill_DCOB_bitmap_initialize2.call( this, width, height );
	this.outlineColor = null;		//文本绘制 - 边线颜色（覆盖原设置）
	this.outlineWidth = null;		//文本绘制 - 边线厚度（覆盖原设置）
}
//==============================
// * 描边控制 - 绘制设置
//==============================
var _drill_DCOB__drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
	
	// > 没有颜色时，不绘制
	if( this.outlineColor == undefined ){ return; }
	
	// > 厚度小于等于0时，不绘制
	if( this.outlineWidth == undefined ){ return; }
	if( this.outlineWidth <= 0 ){ return; }
	
	// > 原函数
	_drill_DCOB__drawTextOutline.call( this, text, tx, ty, maxWidth );
}


//=============================================================================
// ** ☆描边绑定
//
//			说明：	> 此模块专门管理 描边 的窗口绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
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
	
	// > 所有文本-开关，关闭时，清理发光
	if( $gameSystem._drill_DCOB_globalEnabled != true ){
		this.contents.drill_DCOB_clearBorder();
		
	// > 所有文本-开关，开启时
	}else{	
		this.contents.drill_DCOB_setBorder(
			DrillUp.drill_DCOB_getColor( $gameSystem._drill_DCOB_globalColorIndex ),
			$gameSystem._drill_DCOB_globalThickness
		);
	}
};
//==============================
// * 描边绑定 - 重置（对话框）
//==============================
Window_Message.prototype.drill_DCOB_resetOuterBorder = function() {
	if( this.contents == undefined ){ return; }
	
	if( $gameSystem._drill_DCOB_dialogMode == "与所有文本的描边一致" ){
		Window_Base.prototype.drill_DCOB_resetOuterBorder.call(this);
		return;
	}
	
	if( $gameSystem._drill_DCOB_dialogMode == "自定义描边" ){
		this.contents.drill_DCOB_setBorder(
			DrillUp.drill_DCOB_getColor( $gameSystem._drill_DCOB_dialogColorIndex ),
			$gameSystem._drill_DCOB_dialogThickness
		);
		return;
	}
	
	if( $gameSystem._drill_DCOB_dialogMode == "不描边" ){
		this.contents.drill_DCOB_clearBorder();
		return;
	}
};


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
		var painter = this._context;
		var grad = painter.createLinearGradient( x_0,y_0, x_1,y_1 );
		for(var i = 1; i < color_strList.length; i += 2 ){
			var pos = String( color_strList[i] );
			var color = String( color_strList[i+1] );
			if( pos == "" ){ break; }
			if( color == "" ){ break; }
			grad.addColorStop( pos, color );
		}
		painter.save();								//（a.存储上一个画笔状态）
		
		painter.strokeStyle = grad;					//（b.设置样式）
		painter.lineWidth = 3;
		painter.lineJoin = 'round';
		
		painter.strokeText(text, tx, ty, maxWidth);	//（c.路径填充/描边，strokeText）
		
		painter.restore();							//（d.回滚上一个画笔状态）
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

