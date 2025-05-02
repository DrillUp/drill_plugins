//=============================================================================
// Drill_DialogCharBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        窗口字符 - 字符块的背景
 * @author Drill_up
 * 
 * @Drill_LE_param "贴图背景样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DCBa_style_list_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_DialogCharBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件能给 字符块贴图 绘制自定义背景。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacterSprite   窗口字符-窗口字符贴图核心
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于字符块贴图。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 设计：
 *   (1.你可以将一些需要标记的字符，
 *      先设置"\dts[]"变成字符块，再加上"\dDCBa[]"添加字符块背景。
 *      实现对特定文本的背景标注。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\dDCBa[set:1]      之后的字符块贴图，使用背景样式1。
 * 窗口字符：\dDCBa[off]        之后的字符块贴图，关闭背景设置。
 * 
 * 1.上述字符只对 字符块贴图 有效。
 *   被上述窗口字符包裹的 字符块贴图，都能设置背景样式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>字符块的背景 : DEBUG背景样式测试 : 开启
 * 插件指令：>字符块的背景 : DEBUG背景样式测试 : 关闭
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
 * 测试方法：   去各个管理层跑一圈测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只作用于字符块贴图，且是单次执行，所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ---贴图背景样式集---
 * @default 
 * 
 * @param 贴图背景样式-1
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角红色白边背景==","背景是否填充":"true","背景颜色":"#FF4444","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-2
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角橙色白边背景==","背景是否填充":"true","背景颜色":"#FF784C","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-3
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角黄色白边背景==","背景是否填充":"true","背景颜色":"#FFFF40","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-4
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角绿色白边背景==","背景是否填充":"true","背景颜色":"#80FF80","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-5
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角青色白边背景==","背景是否填充":"true","背景颜色":"#98F5FF","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-6
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角蓝色白边背景==","背景是否填充":"true","背景颜色":"#40C0F0","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-7
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角紫色白边背景==","背景是否填充":"true","背景颜色":"#8080FF","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-8
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角粉色白边背景==","背景是否填充":"true","背景颜色":"#FF69B4","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-9
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角棕色白边背景==","背景是否填充":"true","背景颜色":"#8B4C39","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-10
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==直角灰色白边背景==","背景是否填充":"true","背景颜色":"#797979","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-11
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角红色白边背景==","背景是否填充":"true","背景颜色":"#FF4444","是否再加一层渐变色":"false","渐变颜色":"#880000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-12
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角橙色白边背景==","背景是否填充":"true","背景颜色":"#FF784C","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-13
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角黄色白边背景==","背景是否填充":"true","背景颜色":"#FFFF40","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-14
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角绿色白边背景==","背景是否填充":"true","背景颜色":"#80FF80","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-15
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角青色白边背景==","背景是否填充":"true","背景颜色":"#98F5FF","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-16
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角蓝色白边背景==","背景是否填充":"true","背景颜色":"#40C0F0","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-17
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角紫色白边背景==","背景是否填充":"true","背景颜色":"#8080FF","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-18
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角粉色白边背景==","背景是否填充":"true","背景颜色":"#FF69B4","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-19
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角棕色白边背景==","背景是否填充":"true","背景颜色":"#8B4C39","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-20
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角灰色白边背景==","背景是否填充":"true","背景颜色":"#797979","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-21
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角红渐变白边背景==","背景是否填充":"true","背景颜色":"#FF4444","是否再加一层渐变色":"true","渐变颜色":"#880000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-22
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角橙渐变白边背景==","背景是否填充":"true","背景颜色":"#FF784C","是否再加一层渐变色":"true","渐变颜色":"#884400","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-23
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角黄渐变白边背景==","背景是否填充":"true","背景颜色":"#FFFF40","是否再加一层渐变色":"true","渐变颜色":"#666600","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-24
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角绿渐变白边背景==","背景是否填充":"true","背景颜色":"#80FF80","是否再加一层渐变色":"true","渐变颜色":"#008800","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-25
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角青渐变白边背景==","背景是否填充":"true","背景颜色":"#98F5FF","是否再加一层渐变色":"true","渐变颜色":"#006666","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-26
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角蓝渐变白边背景==","背景是否填充":"true","背景颜色":"#40C0F0","是否再加一层渐变色":"true","渐变颜色":"#333388","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-27
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角紫渐变白边背景==","背景是否填充":"true","背景颜色":"#8080FF","是否再加一层渐变色":"true","渐变颜色":"#662299","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-28
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角粉渐变白边背景==","背景是否填充":"true","背景颜色":"#FF69B4","是否再加一层渐变色":"true","渐变颜色":"#994444","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-29
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角棕渐变白边背景==","背景是否填充":"true","背景颜色":"#8B4C39","是否再加一层渐变色":"true","渐变颜色":"#443300","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-30
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角灰渐变白边背景==","背景是否填充":"true","背景颜色":"#797979","是否再加一层渐变色":"true","渐变颜色":"#222222","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-31
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角红框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FF4444","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-32
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角橙框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FF784C","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-33
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角黄框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFF40","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-34
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角绿框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#80FF80","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-35
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角青框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#98F5FF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-36
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角蓝框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#40C0F0","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-37
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角紫框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#8080FF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-38
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角黑框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#000000","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-39
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角白框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-40
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==圆角灰框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#797979","背景描边厚度":"1","背景是否设置圆角":"true","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-41
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形红框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FF4444","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-42
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形橙框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FF784C","背景描边厚度":"1","额外左侧描边厚度":"0","额外右侧描边厚度":"6","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-43
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形黄框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFF40","背景描边厚度":"1","额外左侧描边厚度":"0","额外右侧描边厚度":"0","额外上侧描边厚度":"6","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-44
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形绿框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#80FF80","背景描边厚度":"1","额外左侧描边厚度":"0","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"6","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-45
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形青框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#98F5FF","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-46
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形蓝框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#40C0F0","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-47
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形紫框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#8080FF","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-48
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形黑框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#000000","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-49
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形白框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#FFFFFF","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-50
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default {"标记":"==方形灰框==","背景是否填充":"false","背景颜色":"#000000","是否再加一层渐变色":"false","渐变颜色":"#000000","渐变方向":"0","背景是否描边":"true","背景描边颜色":"#797979","背景描边厚度":"1","额外左侧描边厚度":"6","额外右侧描边厚度":"0","额外上侧描边厚度":"0","额外下侧描边厚度":"0","背景是否设置圆角":"false","背景圆角半径":"4"}
 * 
 * @param 贴图背景样式-51
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-52
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-53
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-54
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-55
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-56
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-57
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-58
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-59
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-60
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-61
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-62
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-63
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-64
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-65
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-66
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-67
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-68
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-69
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-70
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-71
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-72
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-73
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-74
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-75
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-76
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-77
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-78
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-79
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default 
 * 
 * @param 贴图背景样式-80
 * @parent ---贴图背景样式集---
 * @type struct<DCBaStyle>
 * @desc 字符块的背景样式设置。
 * @default
 * 
 */
/*~struct~DCBaStyle:
 * 
 * @param 标记
 * @desc 用于区分样式的说明注释，脚本中不起作用。
 * @default ==新的贴图背景样式==
 *
 *
 * @param 背景是否填充
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 * 
 * @param 背景颜色
 * @parent 背景是否填充
 * @desc 颜色对应的字符串代码，格式可以为"#000000"，格式也可以为"rgba(0,0,0,1.0)"。
 * @default #000000
 * 
 * @param 是否再加一层渐变色
 * @parent 背景是否填充
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 * 
 * @param 渐变颜色
 * @parent 是否再加一层渐变色
 * @desc 颜色对应的字符串代码，格式可以为"#000000"，格式也可以为"rgba(0,0,0,1.0)"。
 * @default #000000
 * 
 * @param 渐变方向
 * @parent 是否再加一层渐变色
 * @type number
 * @min 0
 * @max 360
 * @desc 渐变的方向角度，单位度。0度为从下往上，90度为从左往右。
 * @default 0
 *
 *
 * @param 背景是否描边
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 * 
 * @param 背景描边颜色
 * @parent 背景是否描边
 * @desc 颜色对应的字符串代码，格式可以为"#000000"，格式也可以为"rgba(0,0,0,1.0)"。
 * @default #000000
 *
 * @param 背景描边厚度
 * @parent 背景是否描边
 * @type number
 * @min 0
 * @desc 背景描边的厚度，单位像素。
 * @default 1
 *
 * @param 额外左侧描边厚度
 * @parent 背景是否描边
 * @type number
 * @min 0
 * @desc 在描边的基础上，额外再描边的厚度，单位像素。注意圆角时会变方形。
 * @default 0
 *
 * @param 额外右侧描边厚度
 * @parent 背景是否描边
 * @type number
 * @min 0
 * @desc 在描边的基础上，额外再描边的厚度，单位像素。注意圆角时会变方形。
 * @default 0
 *
 * @param 额外上侧描边厚度
 * @parent 背景是否描边
 * @type number
 * @min 0
 * @desc 在描边的基础上，额外再描边的厚度，单位像素。注意圆角时会变方形。
 * @default 0
 *
 * @param 额外下侧描边厚度
 * @parent 背景是否描边
 * @type number
 * @min 0
 * @desc 在描边的基础上，额外再描边的厚度，单位像素。注意圆角时会变方形。
 * @default 0
 *
 *
 * @param 背景是否设置圆角
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 背景圆角半径
 * @parent 背景是否设置圆角
 * @type number
 * @min 0
 * @desc 背景圆角的半径，单位像素。
 * @default 4
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCBa（Dialog_Char_Background）
//		临时全局变量	DrillUp.g_DCBa_xxx
//		临时局部变量	this._drill_DCBa_xxx
//		存储数据变量	$gameSystem._drill_DCBa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	2025/4/30：
//							》未找到，单次执行太快。消耗可能都在核心函数中。
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
//			
//			->☆贴图背景
//				->样式阶段-配置阶段（继承）
//				->贴图设置（继承）
//				->几何绘制
//					->描边矩形
//					->填充矩形
//					->填充+描边矩形
//					->描边圆角矩形
//					->填充圆角矩形
//					->填充+描边圆角矩形
//				->获取高级渐变色
//					->数学工具-求相交的两点
//			->☆窗口字符应用之效果字符
//				> \dDCBa[set:1]
//				> \dDCBa[off]
//			
//			->☆DEBUG贴图流程测试
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
//			1. 2024/11/4：今天，我看的番剧《宝石宠物2》第33集，女主樱居然主动向男主裕马告白了。
//			   这一集先是刀女主，然后又突然甜炸了，搞得我心情久久不能平复。
//			   放一个心形，祝福女主男主终成眷属，喜欢的过程居然那么幸福。
//				            .★*★.
//				.*‘ *★.  .*　　  *
//				★       '       .’
//				 *.             *
//				   ‘★.       ★’
//				       ‘*.★ '
//			   这个插件功能也完成的差不多了，纪念一下。
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
	DrillUp.g_DCBa_PluginTip_curName = "Drill_DialogCharBackground.js 窗口字符-字符块的背景";
	DrillUp.g_DCBa_PluginTip_baseList = ["Drill_CoreOfWindowCharacterSprite.js 窗口字符-窗口字符贴图核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCBa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCBa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCBa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCBa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCBa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_DCBa_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_DCBa_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogCharBackground = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogCharBackground');
	
	
	//==============================
	// * 静态数据 - 贴图背景样式集
	//				（~struct~DCBaStyle）
	//==============================
	DrillUp.drill_DCBa_initStyle = function( dataFrom ){
		var data = {};
		
		data['fillEnabled'] = String( dataFrom["背景是否填充"] || "false") == "true";
		data['fillColor'] = String( dataFrom["背景颜色"] || "#000000" );
		data['gradEnabled'] = String( dataFrom["是否再加一层渐变色"] || "false") == "true";
		data['gradColor'] = String( dataFrom["渐变颜色"] || "#000000" );
		data['gradAngle'] = Number( dataFrom["渐变方向"] || 0 );
		
		data['strokeEnabled'] = String( dataFrom["背景是否描边"] || "false") == "true";
		data['strokeColor'] = String( dataFrom["背景描边颜色"] || "#000000" );
		data['strokeWidth'] = Number( dataFrom["背景描边厚度"] || 1 );
		data['strokeExLWidth'] = Number( dataFrom["额外左侧描边厚度"] || 0 );
		data['strokeExRWidth'] = Number( dataFrom["额外右侧描边厚度"] || 0 );
		data['strokeExUWidth'] = Number( dataFrom["额外上侧描边厚度"] || 0 );
		data['strokeExDWidth'] = Number( dataFrom["额外下侧描边厚度"] || 0 );
		
		data['radiusEnabled'] = String( dataFrom["背景是否设置圆角"] || "false") == "true";
		data['radiusValue'] = Number( dataFrom["背景圆角半径"] || 4 );
		
		return data;
	}
	
	/*-----------------贴图背景样式集------------------*/
	DrillUp.g_DCBa_style_list_length = 80;
	DrillUp.g_DCBa_style_list = [];
	for( var i = 0; i < DrillUp.g_DCBa_style_list_length; i++ ){
		if( DrillUp.parameters['贴图背景样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['贴图背景样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['贴图背景样式-' + String(i+1) ]);
			DrillUp.g_DCBa_style_list[i] = DrillUp.drill_DCBa_initStyle( data );
		}else{
			DrillUp.g_DCBa_style_list[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacterSprite ){
	
//==============================
// * >>>>基于插件检测>>>> - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_DCBa_getPluginTip_NeedUpdate_drawText() );
}


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DCBa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCBa_pluginCommand.call(this, command, args);
	this.drill_DCBa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCBa_pluginCommand = function( command, args ){
	if( command === ">字符块的背景" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG背景样式测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCBa_Sprite_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCBa_Sprite_DebugEnabled = false;
				}
			}
		}
	}
};
	
	
//=============================================================================
// ** ☆贴图背景
//
//			说明：	> 该模块提供 贴图背景，即对 画布 的背景修改。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图背景 - 样式阶段-配置阶段（继承）
//==============================
var _drill_DCBa_bg_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_DCBa_bg_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@dcb" ){
		if( args.length == 2 ){
			
			// > 『底层字符定义』 - 贴图背景 - 背景是否填充（@@@dcb[fillEnabled:true]） drill_character_background
			if( String(args[0]) == "fillEnabled" ){
				if( String(args[1]) == "true" ){
					cur_baseParam['sprite_DCBa_fillEnabled'] = true;
				}else{
					cur_baseParam['sprite_DCBa_fillEnabled'] = undefined;
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 背景颜色（@@@dcb[fillColor:#eeeeff]） drill_character_background
			if( String(args[0]) == "fillColor" ){
				cur_baseParam['sprite_DCBa_fillColor'] = String(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 渐变 - 是否再加一层渐变色（@@@dcb[fillEnabled:true]） drill_character_background
			if( String(args[0]) == "gradEnabled" ){
				if( String(args[1]) == "true" ){
					cur_baseParam['sprite_DCBa_gradEnabled'] = true;
				}else{
					cur_baseParam['sprite_DCBa_gradEnabled'] = undefined;
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 渐变 - 渐变颜色（@@@dcb[fillColor:#eeeeff]） drill_character_background
			if( String(args[0]) == "gradColor" ){
				cur_baseParam['sprite_DCBa_gradColor'] = String(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 渐变 - 渐变方向（@@@dcb[fillColor:#eeeeff]） drill_character_background
			if( String(args[0]) == "gradAngle" ){
				cur_baseParam['sprite_DCBa_gradAngle'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
			// > 『底层字符定义』 - 贴图背景 - 背景是否描边（@@@dcb[strokeEnabled:true]） drill_character_background
			if( String(args[0]) == "strokeEnabled" ){
				if( String(args[1]) == "true" ){
					cur_baseParam['sprite_DCBa_strokeEnabled'] = true;
				}else{
					cur_baseParam['sprite_DCBa_strokeEnabled'] = undefined;
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 背景边框颜色（@@@dcb[strokeColor:#eeeeff]） drill_character_background
			if( String(args[0]) == "strokeColor" ){
				cur_baseParam['sprite_DCBa_strokeColor'] = String(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 背景边框厚度（@@@dcb[strokeWidth:2]） drill_character_background
			if( String(args[0]) == "strokeWidth" ){
				cur_baseParam['sprite_DCBa_strokeWidth'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 额外左侧描边厚度（@@@dcb[strokeExLWidth:2]） drill_character_background
			if( String(args[0]) == "strokeExLWidth" ){
				cur_baseParam['sprite_DCBa_strokeExLWidth'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 额外右侧描边厚度（@@@dcb[strokeExRWidth:2]） drill_character_background
			if( String(args[0]) == "strokeExRWidth" ){
				cur_baseParam['sprite_DCBa_strokeExRWidth'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 额外上侧描边厚度（@@@dcb[strokeExUWidth:2]） drill_character_background
			if( String(args[0]) == "strokeExUWidth" ){
				cur_baseParam['sprite_DCBa_strokeExUWidth'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 额外下侧描边厚度（@@@dcb[strokeExDWidth:2]） drill_character_background
			if( String(args[0]) == "strokeExDWidth" ){
				cur_baseParam['sprite_DCBa_strokeExDWidth'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
			// > 『底层字符定义』 - 贴图背景 - 背景是否设置圆角（@@@dcb[radiusEnabled:true]） drill_character_background
			if( String(args[0]) == "radiusEnabled" ){
				if( String(args[1]) == "true" ){
					cur_baseParam['sprite_DCBa_radiusEnabled'] = true;
				}else{
					cur_baseParam['sprite_DCBa_radiusEnabled'] = undefined;
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 贴图背景 - 背景圆角半径（@@@dcb[radiusValue:2]） drill_character_background
			if( String(args[0]) == "radiusValue" ){
				cur_baseParam['sprite_DCBa_radiusValue'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}
//==============================
// * 贴图背景 - 贴图设置（继承）
//==============================
var _drill_DCBa_COWCSp_sprite_createBitmap = Bitmap.prototype.drill_COWCSp_sprite_createBitmap;
Bitmap.prototype.drill_COWCSp_sprite_createBitmap = function( width, height, text, baseParam ){
	var new_bitmap = _drill_DCBa_COWCSp_sprite_createBitmap.call( this, width, height, text, baseParam );
	
	// > 贴图设置 - 渐变色控制
	var fill_color = baseParam['sprite_DCBa_fillColor'];
	if( baseParam['sprite_DCBa_gradEnabled'] == true ){
		
		// > 渐变色控制 - 准备渐变节点
		var temp_stop_valueList = [];
		var temp_stop_colorList = [];
		temp_stop_valueList.push(0);
		temp_stop_colorList.push(baseParam['sprite_DCBa_fillColor']);
		temp_stop_valueList.push(1);
		temp_stop_colorList.push(baseParam['sprite_DCBa_gradColor']);
		
		// > 渐变色控制 - 渐变设置
		fill_color = $gameTemp.drill_DCBa_getGradFillColor(
						new_bitmap._context,
						0,0,new_bitmap.width,new_bitmap.height,
						baseParam['sprite_DCBa_gradAngle'],
						temp_stop_valueList, temp_stop_colorList
					 );
	}
	
	// > 贴图设置 - 圆角控制
	var radiusEnabled = baseParam['sprite_DCBa_radiusEnabled'];
	if( baseParam['sprite_DCBa_radiusValue'] <= 0 ){
		radiusEnabled = false;
	}
	if( radiusEnabled ){
		
		// > 贴图设置 - 描边圆角矩形
		if( baseParam['sprite_DCBa_fillEnabled'] != true &&
			baseParam['sprite_DCBa_strokeEnabled'] == true ){
			new_bitmap.drill_DCBa_strokeRoundedRect(
				0,0,new_bitmap.width,new_bitmap.height,
				baseParam['sprite_DCBa_radiusValue'],
				baseParam['sprite_DCBa_strokeColor'],
				baseParam['sprite_DCBa_strokeWidth'] );
		}
		// > 贴图设置 - 填充圆角矩形
		if( baseParam['sprite_DCBa_fillEnabled'] == true &&
			baseParam['sprite_DCBa_strokeEnabled'] != true ){
			new_bitmap.drill_DCBa_fillRoundedRect(
				0,0,new_bitmap.width,new_bitmap.height,
				baseParam['sprite_DCBa_radiusValue'],
				fill_color );
		}
		// > 贴图设置 - 填充+描边圆角矩形
		if( baseParam['sprite_DCBa_fillEnabled'] == true &&
			baseParam['sprite_DCBa_strokeEnabled'] == true ){
			new_bitmap.drill_DCBa_drawRoundedRect(
				0,0,new_bitmap.width,new_bitmap.height,
				baseParam['sprite_DCBa_radiusValue'],
				fill_color,
				baseParam['sprite_DCBa_strokeColor'],
				baseParam['sprite_DCBa_strokeWidth'] );
		}
	}else{
		
		// > 贴图设置 - 描边矩形
		if( baseParam['sprite_DCBa_fillEnabled'] != true &&
			baseParam['sprite_DCBa_strokeEnabled'] == true ){
			new_bitmap.drill_DCBa_strokeRect(
				0,0,new_bitmap.width,new_bitmap.height,
				baseParam['sprite_DCBa_strokeColor'],
				baseParam['sprite_DCBa_strokeWidth'],
				"miter" );
		}
		// > 贴图设置 - 填充矩形
		if( baseParam['sprite_DCBa_fillEnabled'] == true &&
			baseParam['sprite_DCBa_strokeEnabled'] != true ){
			new_bitmap.drill_DCBa_fillRect(
				0,0,new_bitmap.width,new_bitmap.height,
				fill_color,
				"miter" );
		}
		// > 贴图设置 - 填充+描边矩形
		if( baseParam['sprite_DCBa_fillEnabled'] == true &&
			baseParam['sprite_DCBa_strokeEnabled'] == true ){
			new_bitmap.drill_DCBa_drawRect(
				0,0,new_bitmap.width,new_bitmap.height,
				fill_color,
				baseParam['sprite_DCBa_strokeColor'],
				baseParam['sprite_DCBa_strokeWidth'],
				"miter" );
		}
	}
	
	if( baseParam['sprite_DCBa_strokeEnabled'] == true ){
		
		// > 额外左侧描边
		if( baseParam['sprite_DCBa_strokeExLWidth'] > 0 ){
			var thickness = baseParam['sprite_DCBa_strokeExLWidth']+1;
			new_bitmap.drill_DCBa_fillRect(
				0,0,thickness,new_bitmap.height,
				baseParam['sprite_DCBa_strokeColor'],
				"miter" );
		}
		// > 额外右侧描边
		if( baseParam['sprite_DCBa_strokeExRWidth'] > 0 ){
			var thickness = baseParam['sprite_DCBa_strokeExRWidth']+1;
			new_bitmap.drill_DCBa_fillRect(
				new_bitmap.width-thickness,0,thickness,new_bitmap.height,
				baseParam['sprite_DCBa_strokeColor'],
				"miter" );
		}
		// > 额外上侧描边
		if( baseParam['sprite_DCBa_strokeExUWidth'] > 0 ){
			var thickness = baseParam['sprite_DCBa_strokeExUWidth']+1;
			new_bitmap.drill_DCBa_fillRect(
				0,0,new_bitmap.width,thickness,
				baseParam['sprite_DCBa_strokeColor'],
				"miter" );
		}
		// > 额外下侧描边
		if( baseParam['sprite_DCBa_strokeExDWidth'] > 0 ){
			var thickness = baseParam['sprite_DCBa_strokeExDWidth']+1;
			new_bitmap.drill_DCBa_fillRect(
				0,new_bitmap.height-thickness,new_bitmap.width,thickness,
				baseParam['sprite_DCBa_strokeColor'],
				"miter" );
		}
	}
	
	return new_bitmap;
}
//==============================
// * 贴图背景 - 几何绘制 - 描边矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> color 字符串    （颜色）
//					> lineWidth 数字  （线宽）
//					> lineJoin 字符串 （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_DCBa_strokeRect = function( x, y, width, height, color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.strokeStyle = color;			//（b.设置样式）
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
	x += 1;									//（c.为了让圆角在贴边时不突兀，全部向内缩1像素，并且描边也向内缩）
	y += 1;
	width  -= 2;
	height -= 2;
	x += lineWidth*0.5;
	y += lineWidth*0.5;
	width  -= lineWidth;
	height -= lineWidth;
	
    painter.strokeRect(x, y, width, height);//（c.路径填充/描边，strokeRect）
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * 贴图背景 - 几何绘制 - 填充矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> color 字符串   （颜色）
//			说明：	> 此函数复刻自 Bitmap.prototype.fillRect 。
//==============================
Bitmap.prototype.drill_DCBa_fillRect = function( x, y, width, height, color ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = color;				//（b.设置样式）
	
	x += 1;									//（c.为了让圆角在贴边时不突兀，全部向内缩1像素，并且描边也向内缩）
	y += 1;
	width  -= 2;
	height -= 2;
	
    painter.fillRect(x, y, width, height);	//（c.路径填充/描边，fillRect）
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * 贴图背景 - 几何绘制 - 填充+描边矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串     （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_DCBa_drawRect = function( x, y, width, height, fill_color, stroke_color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;			//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
	x += 1;									//（c.为了让圆角在贴边时不突兀，全部向内缩1像素，并且描边也向内缩）
	y += 1;
	width  -= 2;
	height -= 2;
	x += lineWidth*0.5;
	y += lineWidth*0.5;
	width  -= lineWidth;
	height -= lineWidth;
	
    painter.fillRect(x, y, width, height);	//（c.路径填充/描边，fillRect）
    painter.strokeRect(x, y, width, height);
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};

//==============================
// * 贴图背景 - 几何绘制 - 描边圆角矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> radius 数字     （圆角半径）
//					> color 字符串    （颜色）
//					> lineWidth 数字  （线宽）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_DCBa_strokeRoundedRect = function( x, y, width, height, radius, color, lineWidth ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.strokeStyle = color;			//（b.设置样式）
	painter.lineWidth = lineWidth;
	
	x += 1;									//（c.为了让圆角在贴边时不突兀，全部向内缩1像素，并且描边也向内缩）
	y += 1;
	width  -= 2;
	height -= 2;
	x += lineWidth*0.5;
	y += lineWidth*0.5;
	width  -= lineWidth;
	height -= lineWidth;
	
	painter.beginPath();					//（c.路径填充/描边，注意 beginPath + stroke）
    painter.moveTo( x+radius, y );
    painter.lineTo( x+width-radius, y );
    painter.arcTo(  x+width, y, x+width, y+radius, radius );
    painter.lineTo( x+width, y+height-radius );
    painter.arcTo(  x+width, y+height, x+width-radius, y+height, radius );
    painter.lineTo( x+radius, y+height );
    painter.arcTo(  x, y+height, x, y+height-radius, radius );
    painter.lineTo( x, y+radius );
    painter.arcTo(  x, y, x+radius, y, radius );
	painter.stroke();
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * 贴图背景 - 几何绘制 - 填充圆角矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> radius 数字    （圆角半径）
//					> color 字符串   （颜色）
//			说明：	> 此函数复刻自 Bitmap.prototype.fillRect 。
//==============================
Bitmap.prototype.drill_DCBa_fillRoundedRect = function( x, y, width, height, radius, color ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = color;				//（b.设置样式）
	
	x += 1;									//（c.为了让圆角在贴边时不突兀，全部向内缩1像素，并且描边也向内缩）
	y += 1;
	width  -= 2;
	height -= 2;
	
	painter.beginPath();					//（c.路径填充/描边，注意 beginPath + fill）
    painter.moveTo( x+radius, y );
    painter.lineTo( x+width-radius, y );
    painter.arcTo(  x+width, y, x+width, y+radius, radius );
    painter.lineTo( x+width, y+height-radius );
    painter.arcTo(  x+width, y+height, x+width-radius, y+height, radius );
    painter.lineTo( x+radius, y+height );
    painter.arcTo(  x, y+height, x, y+height-radius, radius );
    painter.lineTo( x, y+radius );
    painter.arcTo(  x, y, x+radius, y, radius );
	painter.fill();
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * 贴图背景 - 几何绘制 - 填充+描边圆角矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> radius 数字         （圆角半径）
//					> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_DCBa_drawRoundedRect = function( x, y, width, height, radius, fill_color, stroke_color, lineWidth ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;			//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	
	x += 1;									//（c.为了让圆角在贴边时不突兀，全部向内缩1像素，并且描边也向内缩）
	y += 1;
	width  -= 2;
	height -= 2;
	x += lineWidth*0.5;
	y += lineWidth*0.5;
	width  -= lineWidth;
	height -= lineWidth;
	
	painter.beginPath();					//（c.路径填充/描边，注意 beginPath + fill + stroke）
    painter.moveTo( x+radius, y );
    painter.lineTo( x+width-radius, y );
    painter.arcTo(  x+width, y, x+width, y+radius, radius );
    painter.lineTo( x+width, y+height-radius );
    painter.arcTo(  x+width, y+height, x+width-radius, y+height, radius );
    painter.lineTo( x+radius, y+height );
    painter.arcTo(  x, y+height, x, y+height-radius, radius );
    painter.lineTo( x, y+radius );
    painter.arcTo(  x, y, x+radius, y, radius );
	painter.fill();
	painter.stroke();
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};

//==============================
// * 贴图背景 - 获取高级渐变色（开放函数）
//			
//			参数：	> painter 对象              （画笔）
//					> x, y, width, height 矩形范围
//					> angle 数字                （渐变方向，角度）
//					> stop_valueList 数字列表   （渐变节点值，0.0~1.0）
//					> stop_colorList 字符串列表 （渐变颜色）
//			说明：	> 该函数与 颜色核心 的高级渐变色相似，但是实现上有差异，所以不能混用。
//==============================
Game_Temp.prototype.drill_DCBa_getGradFillColor = function( painter, x,y,width,height, angle, stop_valueList, stop_colorList ){
	
	// > 求相交的两点
	var result = this.drill_DCBa_Math2D_getTwoIntersectionPointInGradRect( x,y,width,height, angle );
	if( result == null ){ return null; }
	
	// > 获取渐变色
	var grad_color = painter.createLinearGradient( result.x1,result.y1, result.x2,result.y2 );
	for( var i = 0; i < stop_valueList.length; i++ ){
		grad_color.addColorStop( parseFloat(stop_valueList[i]), String(stop_colorList[i]) );
	}
	return grad_color;
};
//==============================
// * 贴图背景 - 数学工具 - 求相交的两点（矩形与一根穿过矩形中心的任意角度直线）
//			
//			参数：	> x, y, width, height 矩形范围
//					> angle 数字                    （直线角度）
//			返回：	> {'x1':0,'y1':0,'x2':1,'y2':1} （相交的两点）
//					> null                          （无解）
//			
//			说明：	> 该函数主要用于计算渐变节点位置。
//					> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_DCBa_Math2D_getTwoIntersectionPointInGradRect = function( x,y,width,height, angle ){
	
	// > 检查是否为合法矩形
	if( width  <= 0 ){ return null; }
	if( height <= 0 ){ return null; }
	
	// > 角度转弧度
	if( angle >= 360 ){ angle = angle % 360; }		//角度值（确保在 0~360 范围内）
	var radian = angle / 180 * Math.PI;				//弧度值
	
	// > 求相交的两点
	var c_x = x + width*0.5;					//（中心点）
	var c_y = y + height*0.5;					//
	var angle_lim = Math.atan(width/height);	//（对角线斜率）
	
	// > 求相交的两点 - 等于90度时
	if( radian === Math.PI*0.5 ){
		var x1 = c_x + width*0.5;
		var y1 = c_y;
		var x2 = c_x - width*0.5;
		var y2 = c_y;
	// > 求相交的两点 - 等于270度时
	}else if( radian === Math.PI*1.5 ){
		var x1 = c_x - width*0.5;
		var y1 = c_y;
		var x2 = c_x + width*0.5;
		var y2 = c_y;
	// > 求相交的两点 - 与矩形右侧线相交时 （假设对角线形成为45度，则表示 0度~45度 或 315度~360度 的范围）
	}else if( radian <= angle_lim || radian > Math.PI*2 - angle_lim ){
		var x1 = c_x + height*0.5 * Math.tan(radian);
		var y1 = c_y - height*0.5;
		var x2 = c_x - height*0.5 * Math.tan(radian);
		var y2 = c_y + height*0.5;
	// > 求相交的两点 - 与矩形上侧线相交时（假设对角线形成为45度，则表示 45度~135度 的范围）
	}else if( radian > angle_lim && radian <= Math.PI - angle_lim ){
		var x1 = c_x + width*0.5;
		var y1 = c_y - width/(2 * Math.tan(radian));
		var x2 = c_x - width*0.5;
		var y2 = c_y + width/(2 * Math.tan(radian));
	// > 求相交的两点 - 与矩形左侧线相交时（假设对角线形成为45度，则表示 135度~225度 的范围）
	}else if( radian > Math.PI - angle_lim && radian <= Math.PI + angle_lim ){
		var x1 = c_x - height*0.5 * Math.tan(radian);
		var y1 = c_y + height*0.5;
		var x2 = c_x + height*0.5 * Math.tan(radian);
		var y2 = c_y - height*0.5;
	// > 求相交的两点 - 与矩形下侧线相交时（假设对角线形成为45度，则表示 225度~315度 的范围）
	}else {
		var x1 = c_x - width*0.5;
		var y1 = c_y + width/(2 * Math.tan(radian));
		var x2 = c_x + width*0.5;
		var y2 = c_y - width/(2 * Math.tan(radian));
	}
	
	return {'x1':x1,'y1':y1,'x2':x2,'y2':y2};
}


//=============================================================================
// ** ☆窗口字符应用之效果字符
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置
//==============================
var _drill_DCBa_COWC_effect_processCombined_3 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_DCBa_COWC_effect_processCombined_3.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDCBa" ){
		if( args.length == 2 ){
			
			// > 『窗口字符定义』字符块 - 设置背景样式（\dDCBa[set:10]）
			if( String(args[0]) == "set" ){
				
				// > 样式校验
				var style_data = DrillUp.g_DCBa_style_list[ Number(args[1]) -1 ];
				if( style_data == undefined ){
					this.drill_COWC_effect_submitCombined( "" );
					return;
				}
				var style_str = "";
				
				// > 背景是否填充
				if( style_data['fillEnabled'] == true ){
					style_str += "@@@dcb[fillEnabled:true]";
					style_str += "@@@dcb[fillColor:"+style_data['fillColor']+"]";
				}else{
					style_str += "@@@dcb[fillEnabled:false]";
				}
				
				// > 背景是否加渐变
				if( style_data['gradEnabled'] == true ){
					style_str += "@@@dcb[gradEnabled:true]";
					style_str += "@@@dcb[gradColor:"+style_data['gradColor']+"]";
					style_str += "@@@dcb[gradAngle:"+style_data['gradAngle']+"]";
				}else{
					style_str += "@@@dcb[gradEnabled:false]";
				}
				
				// > 背景是否描边
				if( style_data['strokeEnabled'] == true ){
					style_str += "@@@dcb[strokeEnabled:true]";
					style_str += "@@@dcb[strokeColor:"+style_data['strokeColor']+"]";
					style_str += "@@@dcb[strokeWidth:"+String(style_data['strokeWidth'])+"]";
					style_str += "@@@dcb[strokeExLWidth:"+String(style_data['strokeExLWidth'])+"]";
					style_str += "@@@dcb[strokeExRWidth:"+String(style_data['strokeExRWidth'])+"]";
					style_str += "@@@dcb[strokeExUWidth:"+String(style_data['strokeExUWidth'])+"]";
					style_str += "@@@dcb[strokeExDWidth:"+String(style_data['strokeExDWidth'])+"]";
					
				}else{
					style_str += "@@@dcb[strokeEnabled:false]";
				}
				
				// > 背景是否设置圆角
				if( style_data['radiusEnabled'] == true ){
					style_str += "@@@dcb[radiusEnabled:true]";
					style_str += "@@@dcb[radiusValue:"+String(style_data['radiusValue'])+"]";
				}else{
					style_str += "@@@dcb[radiusEnabled:false]";
				}
				
				this.drill_COWC_effect_submitCombined( style_str );
				return;
			}
		}
		if( args.length == 1 ){
			
			// > 『窗口字符定义』字符块 - 重置背景样式（\dDCBa[off]）
			if( String(args[0]).toUpperCase() == "OFF" ){
				this.drill_COWC_effect_submitCombined( "@@@dcb[fillEnabled:false]@@@dcb[strokeEnabled:false]@@@dcb[radiusEnabled:false]" );
				return;
			}
		}
	}
}


//=============================================================================
// ** ☆DEBUG贴图流程测试
//
//			说明：	> 此模块控制 DEBUG贴图流程测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG贴图流程测试 - 帧刷新（地图界面）
//==============================
var _drill_DCBa_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DCBa_debugMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCBa_Sprite_DebugEnabled == true ){
		$gameTemp._drill_DCBa_Sprite_DebugEnabled = undefined;
		this.drill_DCBa_Text_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_DCBa_Sprite_DebugEnabled == false ){
		$gameTemp._drill_DCBa_Sprite_DebugEnabled = undefined;
		if( this._drill_DCBa_Sprite_DebugSprite != undefined ){
			this.removeChild(this._drill_DCBa_Sprite_DebugSprite);
			this._drill_DCBa_Sprite_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG贴图流程测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_DCBa_Text_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCBa_Sprite_DebugSprite != undefined ){
		this.removeChild(this._drill_DCBa_Sprite_DebugSprite);
		this._drill_DCBa_Sprite_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
	var temp_sprite = new Sprite();
	temp_sprite.x = Graphics.boxWidth*0.5;
	temp_sprite.y = Graphics.boxHeight*0.5;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.bitmap.fillAll("rgba(0,0,0,0.5)");
	this.addChild( temp_sprite );	//（直接加在最顶层的上面）
	this._drill_DCBa_Sprite_DebugSprite = temp_sprite;
	
	// > 绘制 - DEBUG显示画布范围
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 20;
	options['infoParam']['y'] = 8;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['baseParam'] = {};
	//options['baseParam']['drawDebugBaseRect'] = true;
	//options['baseParam']['sprite_debugRect'] = true;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_DCBa_PluginTip_curName + "】<br>" + 
				"该插件主要给字符块贴图对象，添加自定义的背景。<br>" + 
				
				"》》贴图测试-不含内边距： \\fr\n" + 
				"    \\\\dDCBa[set:1]\\\\dts[测试的贴图]  直角红色白边  \\dDCBa[set:1]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    \\\\dDCBa[set:2]\\\\dts[测试的贴图]  直角橙色白边  \\dDCBa[set:2]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    \\\\dDCBa[set:3]\\\\dts[测试的贴图]  直角黄色白边  \\dDCBa[set:3]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				
				"》》贴图测试-含内边距（上下3像素，左右6像素）： \\fr\n" + 
				"\\dtsp[3:6]" + 
				"    内边距\\\\dtsp[3:6] + 样式1至10的直角白边（红橙黄绿青蓝紫粉棕灰）依次为：   \\fr\n" + 
				"    \\dDCBa[set:1]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:2]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:3]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:4]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:5]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    \\dDCBa[set:6]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:7]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:8]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:9]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:10]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    内边距\\\\dtsp[3:6] + 样式11至20的圆角白边（红橙黄绿青蓝紫粉棕灰）依次为：   \\fr\n" + 
				"    \\dDCBa[set:11]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:12]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:13]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:14]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:15]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    \\dDCBa[set:16]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:17]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:18]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:19]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:20]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    内边距\\\\dtsp[3:6] + 样式21至30的圆角白边（红橙黄绿青蓝紫粉棕灰+渐变）依次为：   \\fr\n" + 
				"    \\dDCBa[set:21]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:22]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:23]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:24]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:25]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    \\dDCBa[set:26]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:27]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:28]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:29]\\dts[测试的贴图]\\dDCBa[off] \\dDCBa[set:30]\\dts[测试的贴图]\\dDCBa[off] \\fr\n" + 
				"    内边距\\\\dtsp[3:6] + 样式31至40的圆角框（红橙黄绿青蓝紫黑白灰）依次为：   \\fr\n" + 
				"    \\dDCBa[set:31]\\dts[贴图] \\dDCBa[set:32]\\dts[贴图] \\dDCBa[set:33]\\dts[贴图] \\dDCBa[set:34]\\dts[贴图] \\dDCBa[set:35]\\dts[贴图] \\dDCBa[set:36]\\dts[贴图] \\dDCBa[set:37]\\dts[贴图] \\dDCBa[set:38]\\dts[贴图] \\dDCBa[set:39]\\dts[贴图] \\dDCBa[set:40]\\dts[贴图] \\dDCBa[off] \\fr\n" + 
				"    内边距\\\\dtsp[3:6] + 样式41至50的方角框（红橙黄绿青蓝紫黑白灰）依次为：   \\fr\n" + 
				"    \\dDCBa[set:41]\\dts[贴图] \\dDCBa[set:42]\\dts[贴图] \\dDCBa[set:43]\\dts[贴图] \\dDCBa[set:44]\\dts[贴图] \\dDCBa[set:45]\\dts[贴图] \\dDCBa[set:46]\\dts[贴图] \\dDCBa[set:47]\\dts[贴图] \\dDCBa[set:48]\\dts[贴图] \\dDCBa[set:49]\\dts[贴图] \\dDCBa[set:50]\\dts[贴图] \\dDCBa[off] \\fr\n" + 
				"\\dtsp[0:0]" + 
				
				"》》贴图测试-混合其它字符： \\fr\n" + 
				"\\dtsp[3:6]" + 
				"  \\\\dtsp[3:6]\\\\dDCBa[set:11]\\\\dts[不同\\\\{字体大小\\\\}的字符]  \\dDCBa[set:11]\\dts[不同\\{字体大小\\}的字符]\\dDCBa[off] \\fr\n" + 
				"  \\\\dtsp[3:6]\\\\dDCBa[set:11]\\\\dts[测试换行< br >第二行的字符]  \\dDCBa[set:11]\\dts[测试换行<br>第二行的字符]\\dDCBa[off] \\fr\n" + 
				"  \\\\dtsp[3:6]\\\\dDCBa[set:21]\\\\dts[\\\\dta[横切居中]标题< br >较长的正文内容]  \\dDCBa[set:21]\\dts[\\dta[横切居中]标题<br>较长的正文内容]\\dDCBa[off] \\fr\n" + 
				"\\dtsp[0:0]";
				
	temp_bitmap.drill_COWC_drawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	temp_sprite.drill_COWCSp_sprite_refreshAllSprite();
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharBackground = false;
		var pluginTip = DrillUp.drill_DCBa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


