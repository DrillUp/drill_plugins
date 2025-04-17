//=============================================================================
// Drill_CoreOfColor.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        窗口字符 - 颜色核心
 * @author Drill_up
 * 
 * @Drill_LE_editForbidden
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfColor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可使得你添加自定义的文本颜色和文本高级颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件，才能运行，并作用于其他子插件。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 可作用于：
 *   - Drill_ActorTextColor          UI-角色文本颜色
 *   - Drill_EnemyTextColor          UI-敌人文本颜色
 *   - Drill_ItemTextColor           UI-物品+技能文本颜色
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   对所有窗口有效。
 * 2.如果想了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 *   如果想了解高级颜色设置方法，去看看 "23.窗口字符 > 关于颜色核心.docx"。
 * 细节：
 *   (1.由于颜色固定只能配置99种，高级颜色固定99种，渐变固定6种，
 *      如果超过了99，会出现数组错位，所以该插件被禁止修改最大值。
 *   (2.需要说明的是，颜色核心只能提供 静态 的文本渐变色功能。
 *      动态的颜色变换，需要通过滤镜才能实现，
 *      见插件 UI - 物品+技能文本的滤镜效果 。
 * 设计：
 *   (1.大部分文本都支持渐变色，你可以用此来突出对话中的关键字。
 *   (2.你可以使用 高级渐变色+字体+窗口字符效果，组合出漂亮的艺术文字。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用窗口字符调整 自定义颜色：
 * 
 * 窗口字符：\c[0]        之后文字显示为默认颜色。
 * 窗口字符：\c[1]        之后文字显示为默认颜色。
 * 窗口字符：\c[2]        之后文字显示为默认颜色。
 * 
 * 窗口字符：\c[101]      之后文字显示为普通颜色。
 * 窗口字符：\c[102]      之后文字显示为普通颜色。
 * 窗口字符：\c[103]      之后文字显示为普通颜色。
 * 
 * 窗口字符：\c[201]      之后文字显示为高级渐变颜色。
 * 窗口字符：\c[202]      之后文字显示为高级渐变颜色。
 * 窗口字符：\c[203]      之后文字显示为高级渐变颜色。
 * 
 * 1.游戏中有默认32种颜色窗口字符，即 \c[0] - \c[31] 。
 * 2.颜色和高级颜色固定99种自定义设置。
 *   "\c[101] - \c[199]"对应了 颜色1 至 颜色99。
 *   "\c[201] - \c[299]"对应了 高级颜色1 至 高级颜色99。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>颜色核心 : 所有文本 : 修改颜色 : 颜色[0]
 * 插件指令：>颜色核心 : 所有文本 : 恢复默认颜色
 * 
 * 插件指令：>颜色核心 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>颜色核心 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>颜色核心 : 对话框 : 修改颜色 : 颜色[0]
 * 插件指令：>颜色核心 : 对话框 : 恢复默认颜色
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   并且 全重置字符\fr 执行重置时，也会重置为 此设置的值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2.你可以修改 默认颜色 为 201 高级颜色，同样对所有贴图/窗口有效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 临时颜色
 * 你可以使用窗口字符设置临时颜色，也可以暂存读取颜色：
 * 
 * 窗口字符：\cc[#ffffff]       之后的文本使用此临时普通颜色。
 * 窗口字符：\cc[save]          暂存当前文本颜色。
 * 窗口字符：\cc[load]          之后的文本使用暂存的颜色。
 * 
 * 窗口字符：\cc[reset]         之后的文本只恢复默认颜色。
 * 窗口字符：\fr                全重置字符，重置之后文本所有设置，包括恢复默认颜色。
 * 
 * 1.由于普通颜色非常多，通过序号来定义比较麻烦，
 *   你可以使用 "\cc[#ffffff]" 直接定义普通颜色来使用。
 * 2.窗口字符 是一个一个顺序绘制上去的，存在先后顺序。
 *   如果你有 插播的字符串 要临时变色，可以先暂存之前的颜色，在最后恢复颜色。
 *   使用 "\cc[save]xxxxxx\cc[load]" 即可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逐个字符变色
 * 你可以使用下面窗口字符实现逐个字符变色：
 * 
 * 窗口字符：\clc[#00ff00:#0000ff:10]
 * 窗口字符：\clc[#00ff00:#0000ff:当前行字数]
 * 
 * 1."\clc"可以使得后面的字符每个字变一种普通颜色，合起来看起来像渐变。
 *   参数分别为 起始颜色、终止颜色、过渡的字数 。
 * 2."当前行字数"即当前行 常规字符 的字数。
 *    注意，当前行字数统计不含 效果字符、字符块 的数量。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug字符
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\debug[显示高级颜色框]      之后的高级颜色显示方框
 * 窗口字符：\debug[隐藏高级颜色框]      之后的高级颜色取消显示方框
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 关于颜色
 * 默认配置有：
 *  #FF4444 赤     #FF784C 橙
 *  #FFFF40 黄     #80FF80 绿
 *  #98F5FF 青     #40C0F0 蓝
 *  #8080FF 紫     #FF69B4 粉
 *  #8B4C39 棕     #797979 灰
 *  #FFFFFF 黑     #000000 白
 *
 * 颜色代码大写小写字母都可以识别。
 * 如果你想配置更完美的颜色，推荐去这个网址找到你想要的颜色代码：
 * http://tool.oschina.net/commons?type=3
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
 * 时间复杂度： o(n^2)
 * 测试方法：   在各个界面中以正常游戏流程进行测试。
 * 测试结果：   战斗界面的角色文本，消耗为：【5ms以下】
 *              地图界面的角色文本，消耗为：【5ms以下】
 *              菜单界面的角色文本，消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件计算量都非常小，消耗可以完全不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了最大值编辑器的设置。
 * [v1.2]
 * 优化了内部结构以及注释。
 * [v1.3]
 * 修复了高级渐变色的角度bug，支持了0-360的角度设置。
 * [v1.4]
 * 修改了插件的分类。
 * [v1.5]
 * 添加了 颜色暂存、普通颜色 的窗口字符功能。
 * [v1.6]
 * 添加了 插件指令 固定对话框的 文本色功能。
 * [v1.7]
 * 优化了渐变色的结构，修复了部分渐变色只显示白色的bug。
 * [v1.8]
 * 更新并兼容了新的窗口字符底层。
 * 
 * 
 * 
 * 
 * 
 * @param ---全局默认值---
 * @desc 
 * 
 * @param 所有文本-默认颜色
 * @parent ---全局默认值---
 * @type number
 * @min 0
 * @desc 所有文本默认的颜色。默认可填0，对应"\c[0]"。
 * @default 0
 * 
 * @param 对话框颜色模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 自定义模式
 * 
 * @param 对话框-颜色
 * @parent 对话框颜色模式
 * @type number
 * @min 0
 * @desc 对话框模式为"自定义模式"时生效。对话框的颜色。默认可填0，对应"\c[0]"。
 * @default 0
 * 
 * 
 * @param ---DEBUG测试---
 * @desc 
 * 
 * @param DEBUG-强制显示全部高级颜色框
 * @parent ---DEBUG测试---
 * @type boolean
 * @on 强制显示
 * @off 关闭
 * @desc true - 强制显示，false - 关闭。注意，所有高级颜色都会显示框。
 * @default false
 * 
 * 
 * 
 * @param ---普通颜色---
 * @default 
 * 
 * @param 颜色-1
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==赤==","颜色代码":"#FF4444"}
 * 
 * @param 颜色-2
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==橙==","颜色代码":"#FF784C"}
 * 
 * @param 颜色-3
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黄==","颜色代码":"#FFFF40"}
 * 
 * @param 颜色-4
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==绿==","颜色代码":"#80FF80"}
 * 
 * @param 颜色-5
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==青==","颜色代码":"#98F5FF"}
 * 
 * @param 颜色-6
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==蓝==","颜色代码":"#40C0F0"}
 * 
 * @param 颜色-7
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==紫==","颜色代码":"#8080FF"}
 * 
 * @param 颜色-8
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==粉==","颜色代码":"#FF69B4"}
 * 
 * @param 颜色-9
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==棕==","颜色代码":"#8B4C39"}
 * 
 * @param 颜色-10
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==灰==","颜色代码":"#797979"}
 * 
 * @param 颜色-11
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黑==","颜色代码":"#000000"}
 * 
 * @param 颜色-12
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白==","颜色代码":"#FFFFFF"}
 * 
 * @param 颜色-13
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-14
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-15
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-16
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-17
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-18
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-19
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-20
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-21
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-22
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-23
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-24
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-25
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-26
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-27
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-28
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-29
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-30
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-31
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-32
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-33
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-34
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-35
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-36
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-37
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-38
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-39
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-40
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-41
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-42
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-43
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-44
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-45
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-46
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-47
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-48
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-49
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-50
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-51
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-52
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-53
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-54
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-55
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-56
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-57
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-58
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-59
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-60
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-61
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-62
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-63
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-64
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-65
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-66
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-67
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-68
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-69
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-70
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-71
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-72
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-73
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-74
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-75
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-76
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-77
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-78
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-79
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-80
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-81
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-82
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-83
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-84
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-85
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-86
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-87
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-88
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-89
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-90
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-91
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-92
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-93
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-94
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-95
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-96
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-97
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-98
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-99
 * @parent ---普通颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * 
 * 
 * @param ---高级颜色---
 * @default 
 * 
 * @param 高级颜色-1
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白红纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#FF3333","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-2
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白橙纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#FF573C","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-3
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白黄纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#FFFF20","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-4
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白绿纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#27FF27","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-5
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白青纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#88EDFF","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-6
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白蓝纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#21A9F4","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-7
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白紫纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#8330FF","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-8
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白粉纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#FF69B4","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-9
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白棕纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#7B3C29","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-10
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白灰纵向渐变==","渐变方向":"0","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#797979","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-11
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-12
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"--白红横向渐变--","渐变方向":"90","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#FF2222","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-13
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"--白绿横向渐变--","渐变方向":"90","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#40FF40","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-14
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"--白蓝横向渐变--","渐变方向":"90","渐变节点-1":"0.20","渐变节点颜色-1":"#FFFFFF","渐变节点-2":"1.00","渐变节点颜色-2":"#40A0F0","渐变节点-3":"","渐变节点颜色-3":"","渐变节点-4":"","渐变节点颜色-4":"","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-15
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-16
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡红斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#ff8e8e","渐变节点-2":"0.49","渐变节点颜色-2":"#ff8e8e","渐变节点-3":"0.51","渐变节点颜色-3":"#db4646","渐变节点-4":"1.00","渐变节点颜色-4":"#db4646","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-17
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡橙斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#FFB079","渐变节点-2":"0.49","渐变节点颜色-2":"#FFB079","渐变节点-3":"0.51","渐变节点颜色-3":"#DF6816","渐变节点-4":"1.00","渐变节点颜色-4":"#DF6816","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-18
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡黄斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#F9F0C0","渐变节点-2":"0.49","渐变节点颜色-2":"#F9F0C0","渐变节点-3":"0.51","渐变节点颜色-3":"#D9C23D","渐变节点-4":"1.00","渐变节点颜色-4":"#D9C23D","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-19
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡绿斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#A9F1A8","渐变节点-2":"0.49","渐变节点颜色-2":"#A9F1A8","渐变节点-3":"0.51","渐变节点颜色-3":"#34A558","渐变节点-4":"1.00","渐变节点颜色-4":"#34A558","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-20
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡青斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#B1D9FA","渐变节点-2":"0.49","渐变节点颜色-2":"#B1D9FA","渐变节点-3":"0.51","渐变节点颜色-3":"#2292C6","渐变节点-4":"1.00","渐变节点颜色-4":"#2292C6","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-21
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡蓝斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#618FD5","渐变节点-2":"0.49","渐变节点颜色-2":"#618FD5","渐变节点-3":"0.51","渐变节点颜色-3":"#2260BC","渐变节点-4":"1.00","渐变节点颜色-4":"#2260BC","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-22
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡紫斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#B95DE3","渐变节点-2":"0.49","渐变节点颜色-2":"#B95DE3","渐变节点-3":"0.51","渐变节点颜色-3":"#8B22BC","渐变节点-4":"1.00","渐变节点颜色-4":"#8B22BC","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-23
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==淡灰斜向渐变==","渐变方向":"340","渐变节点-1":"0.00","渐变节点颜色-1":"#B2B2B2","渐变节点-2":"0.49","渐变节点颜色-2":"#B2B2B2","渐变节点-3":"0.51","渐变节点颜色-3":"#7F7F7F","渐变节点-4":"1.00","渐变节点颜色-4":"#7F7F7F","渐变节点-5":"","渐变节点颜色-5":"","渐变节点-6":"","渐变节点颜色-6":""}
 * 
 * @param 高级颜色-24
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-25
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-26
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-27
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-28
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-29
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-30
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-31
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-32
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-33
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-34
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-35
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-36
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-37
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-38
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-39
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-40
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-41
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-42
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-43
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-44
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-45
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-46
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-47
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-48
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-49
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-50
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-51
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-52
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-53
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-54
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-55
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-56
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-57
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-58
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-59
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-60
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-61
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-62
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-63
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-64
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-65
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-66
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-67
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-68
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-69
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-70
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-71
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-72
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-73
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-74
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-75
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-76
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-77
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-78
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-79
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-80
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-81
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-82
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-83
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-84
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-85
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-86
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-87
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-88
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-89
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-90
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-91
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-92
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-93
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-94
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-95
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-96
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-97
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-98
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 高级颜色-99
 * @parent ---高级颜色---
 * @type struct<GradientColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 *
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
/*~struct~GradientColor:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的高级颜色==
 * 
 * @param 渐变方向
 * @type number
 * @min 0
 * @max 360
 * @desc 渐变的方向角度，单位度。0度为从下往上，90度为从左往右。
 * @default 0
 *
 * @param 渐变节点-1
 * @desc 渐变的节点值，范围在 0.00 - 1.00 之间。
 * @default 0.00
 * 
 * @param 渐变节点颜色-1
 * @desc 节点位置的颜色。
 * @default #FFFFFF
 *
 * @param 渐变节点-2
 * @desc 渐变的节点值，范围在 0.00 - 1.00 之间。
 * @default 1.00
 * 
 * @param 渐变节点颜色-2
 * @desc 节点位置的颜色。
 * @default #FF4444
 *
 * @param 渐变节点-3
 * @desc 渐变的节点值，范围在 0.00 - 1.00 之间。
 * @default 
 * 
 * @param 渐变节点颜色-3
 * @desc 节点位置的颜色。
 * @default 
 *
 * @param 渐变节点-4
 * @desc 渐变的节点值，范围在 0.00 - 1.00 之间。
 * @default 
 * 
 * @param 渐变节点颜色-4
 * @desc 节点位置的颜色。
 * @default 
 *
 * @param 渐变节点-5
 * @desc 渐变的节点值，范围在 0.00 - 1.00 之间。
 * @default 
 * 
 * @param 渐变节点颜色-5
 * @desc 节点位置的颜色。
 * @default 
 *
 * @param 渐变节点-6
 * @desc 渐变的节点值，范围在 0.00 - 1.00 之间。
 * @default 
 * 
 * @param 渐变节点颜色-6
 * @desc 节点位置的颜色。
 * @default 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COC (Core_Of_Color)
//		临时全局变量	DrillUp.g_COC_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_Base.prototype.normalColor
//						Window_Message.prototype.normalColor
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	菜单界面的物品
//		★性能测试消耗	3.70ms
//		★最坏情况		暂无
//		★备注			能够在性能列表中找到消耗，但是很小。
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
//				> \C[0]       （可大小写）
//				> \CC[#eeeeff]（可大小写）
//				> \CC[save]   （可大小写）
//				> \CC[load]   （可大小写）
//				> \CC[oSave]  （可大小写）
//				> \CC[oLoad]  （可大小写）
//				> \CC[reset]  （可大小写）
//				> \clc[#00ff00:#0000ff:当前行字数] （只能小写）
//				> \clc[#00ff00:#0000ff:10]         （只能小写）
//			->☆全局默认值
//				->自带参数（继承）
//					> this.textColor
//			->☆重置控制
//				->全重置字符（继承）
//				->自定义重置字符
//					> @@@dcc[reset]
//			
//			->☆管辖权
//			->☆管辖权覆写函数
//			
//			->☆高级颜色绘制
//				->数学工具-求相交的两点
//			->☆颜色暂存
//				> @@@dcc[save]
//				> @@@dcc[load]
//				> @@@dcc[oSave]
//				> @@@dcc[oLoad]
//			->☆逐个字符变色
//				> @@@dcc[linear:#0f0:#00f:10]
//				> @@@dcc[linear:#0f0:#00f]
//			
//			->☆颜色工具
//				->字符串转RGB（开放函数）
//				->RGB转字符串（开放函数）
//				->字符串转RGBA（开放函数）
//				->RGBA转字符串（开放函数）
//			->☆DEBUG颜色测试
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
//		★核心说明：
//			1.该插件把颜色配置进行了统一。
//			  支持了 .textColor(100) 和 .textColor(200) 的颜色变化。
//			  没有对外接口。
//		
//		★必要注意事项：
//			1.变色由两个核心函数组成。
//				_drill_COC_textColor			 \c[200]的颜色操作
//				_drill_COC_bitmap_drawTextBody	 渐变颜色识别函数
//
//		★其它说明细节：
//			1.高级颜色格式为："drill__45__0.0__#00ff00__1.0__#0000ff" 
//			（见drill_COC_initSeniorColor）
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
	DrillUp.g_COC_PluginTip_curName = "Drill_CoreOfColor.js 窗口字符-颜色核心";
	DrillUp.g_COC_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COC_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COC_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COC_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COC_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COC_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 日志 - 无效参数
	//==============================
	DrillUp.drill_COC_getPluginTip_ColorError1 = function( n ){
		return "【" + DrillUp.g_COC_PluginTip_curName + "】\n普通颜色接受到一个无效的参数："+n+"。";
	};
	//==============================
	// * 提示信息 - 日志 - 无效参数
	//==============================
	DrillUp.drill_COC_getPluginTip_ColorError2 = function( n ){
		return "【" + DrillUp.g_COC_PluginTip_curName + "】\n高级颜色接受到一个无效的参数："+n+"。";
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_COC_getPluginTip_ColorNotFind1 = function( n ){
		return "【" + DrillUp.g_COC_PluginTip_curName + "】\n你没有在 颜色-"+n+" 中配置颜色，而你在游戏中使用了它。";
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_COC_getPluginTip_ColorNotFind2 = function( n ){
		return "【" + DrillUp.g_COC_PluginTip_curName + "】\n你没有在 高级颜色-"+n+" 中配置颜色，而你在游戏中使用了它。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_COC_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_COC_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfColor = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfColor');
	
	//==============================
	// * 静态数据 - 普通颜色
	//				（~struct~CommonColor）
	//==============================
	DrillUp.drill_COC_initCommonColor = function( dataFrom ) {
		var data = {};
		data['color'] = String( dataFrom["颜色代码"] || "#ffffff" );
		return data;
	}
	//==============================
	// * 静态数据 - 高级颜色
	//				（~struct~GradientColor）
	//==============================
	DrillUp.drill_COC_initSeniorColor = function( dataFrom ){
		var temp_text = "drill__";
		temp_text += String( dataFrom["渐变方向"] || "" );
		for( var j = 0; j < 6; j++ ){
			if( dataFrom[ "渐变节点颜色-"+String(j+1) ] != "" ){
				temp_text += "__" + String(dataFrom[ "渐变节点-"+String(j+1) ] );
				temp_text += "__" + String(dataFrom[ "渐变节点颜色-"+String(j+1) ] );
			}
		}
		data['color'] = temp_text;
		return data;
	}
	
	/*-----------------普通颜色------------------*/
	DrillUp.g_COC_color_list_length = 99;
	DrillUp.g_COC_color_list = [];
	for (var i = 0; i < DrillUp.g_COC_color_list_length; i++) {
		if( DrillUp.parameters["颜色-" + String(i+1) ] != undefined &&
			DrillUp.parameters["颜色-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["颜色-" + String(i+1) ]);
			DrillUp.g_COC_color_list[i] = DrillUp.drill_COC_initCommonColor( data );
		}else{
			DrillUp.g_COC_color_list[i] = {};
		}
	}
	
	/*-----------------高级颜色------------------*/
	DrillUp.g_COC_seniorColor_list_length = 99;
	DrillUp.g_COC_seniorColor_list = [];
	for (var i = 0; i < DrillUp.g_COC_seniorColor_list_length; i++) {
		if( DrillUp.parameters["高级颜色-" + String(i+1) ] != undefined &&
			DrillUp.parameters["高级颜色-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["高级颜色-" + String(i+1) ]);
			DrillUp.g_COC_seniorColor_list[i] = DrillUp.drill_COC_initSeniorColor( data );
		}else{
			DrillUp.g_COC_seniorColor_list[i] = {};
		}
	}
	
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_COC_globalColorId = Number(DrillUp.parameters["所有文本-默认颜色"] || 0); 
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_COC_dialogMode = String(DrillUp.parameters["对话框颜色模式"] || "与所有文本一致"); 
	DrillUp.g_COC_dialogColorId = Number(DrillUp.parameters["对话框-颜色"] || 0); 
	
	/*-----------------杂项------------------*/
    DrillUp.g_COC_seniorColorDebugAll = String(DrillUp.parameters["DEBUG-强制显示全部高级颜色框"] || "false") === "true";
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//==============================
// * 基于插件检测 - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_COC_getPluginTip_NeedUpdate_drawText() );
}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_COC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COC_pluginCommand.call(this, command, args);
	this.drill_COC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_COC_pluginCommand = function( command, args ){
	if( command === ">颜色核心" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_COC_globalColorId = temp2;
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认颜色" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_COC_globalColorId = DrillUp.g_COC_globalColorId;
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
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					if( temp1 == "修改模式" ){
						$gameSystem._drill_COC_dialogMode = temp2;
					}
					if( temp1 == "修改颜色" ){
						$gameSystem._drill_COC_dialogColorId = temp2;
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认颜色" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_COC_dialogColorId = DrillUp.g_COC_dialogColorId;
					}
				}
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG颜色核心字符测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COC_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COC_DebugEnabled = false;
					
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
DrillUp.g_COC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COC_sys_initialize.call(this);
	this.drill_COC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COC_saveEnabled == true ){	
		$gameSystem.drill_COC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COC_initSysData();
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
Game_System.prototype.drill_COC_initSysData = function() {
	this.drill_COC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COC_checkSysData = function() {
	this.drill_COC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COC_initSysData_Private = function() {
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_COC_globalColorId = DrillUp.g_COC_globalColorId;		//所有文本 - 颜色
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_COC_dialogMode = DrillUp.g_COC_dialogMode;				//对话框 - 模式
	this._drill_COC_dialogColorId = DrillUp.g_COC_dialogColorId;		//对话框 - 颜色
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COC_dialogColorId == undefined ){
		this.drill_COC_initSysData();
	}
};
	


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 字符转换（组合符）
//==============================
var _drill_COC_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COC_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 颜色（\C[0] ~ \C[31]）
	//	（该功能在核心插件中实现【窗口字符 - 窗口字符核心】）
	
	// > 『窗口字符定义』 - 颜色（\C[101] ~ \C[199]）
	//	（该功能见函数 drill_COC_getColor ）
	
	// > 『窗口字符定义』 - 颜色（\C[201] ~ \C[299]）
	//	（该功能见函数 drill_COC_getColor ）
	
	if( command.toUpperCase() == "CC" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			
			// > 『窗口字符定义』 - 颜色配置 - 自定义重置字符（\CC[RESET]）
			if( temp1.toUpperCase() == "RESET" ){
				this.drill_COWC_effect_submitCombined( "@@@dcc[reset]" );
				return;
			}
			
			// > 『窗口字符定义』 - 颜色配置 - 暂存颜色（\CC[SAVE]）
			if( temp1.toUpperCase() == "SAVE" ){
				this.drill_COWC_effect_submitCombined( "@@@dcc[save]" );
				return;
			}
			// > 『窗口字符定义』 - 颜色配置 - 读取颜色（\CC[LOAD]）
			if( temp1.toUpperCase() == "LOAD" ){
				this.drill_COWC_effect_submitCombined( "@@@dcc[load]" );
				return;
			}
			// > 『窗口字符定义』 - 颜色配置 - 暂存颜色-脚本专用（\CC[OSAVE]）
			if( temp1.toUpperCase() == "OSAVE" ){
				this.drill_COWC_effect_submitCombined( "@@@dcc[oSave]" );
				return;
			}
			// > 『窗口字符定义』 - 颜色配置 - 读取颜色-脚本专用（\CC[OLOAD]）
			if( temp1.toUpperCase() == "OLOAD" ){
				this.drill_COWC_effect_submitCombined( "@@@dcc[oLoad]" );
				return;
			}
			
			// > 『窗口字符定义』 - 颜色配置 - 颜色（\CC[#eeeeff]）
			var str = "@@@-tc[" + temp1 + "]";
			this.drill_COWC_effect_submitCombined( str );
			return;
		}
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			
			// > 『窗口字符定义』 - 颜色配置 - DEBUG（\CC[DEBUG:显示高级颜色框]、\CC[DEBUG:隐藏高级颜色框]）
			if( temp1.toUpperCase() == "DEBUG" ){
				this.drill_COWC_effect_submitCombined( "@@@dcc[debug:" + temp2 + "]" );
				return;
			}
		}
	}
	
	if( command == "clc" ){
		if( args.length == 3 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			
			// > 『窗口字符定义』 - 逐个字符变色（\clc[#00ff00:#0000ff:当前行字数]）
			if( temp3 == "当前行字数" ){
				this.drill_COWC_effect_submitCombined( "@@@-sr@@@dcc[linear:" +temp1+ ":" +temp2+ "]" );
			
			// > 『窗口字符定义』 - 逐个字符变色（\clc[#00ff00:#0000ff:10]）
			}else{
				this.drill_COWC_effect_submitCombined( "@@@-sr@@@dcc[linear:" +temp1+ ":" +temp2+ ":" +Number(temp3)+ "]" );
			}
		}
	}
}
//==============================
// * 窗口字符应用之效果字符 - 文本颜色（覆写）
//
//			参数：	> n 数字   （颜色ID）
//			返回：	> 字符串   （颜色字符串，如"#eeeeff"）
//==============================
Game_Temp.prototype.drill_COWC_effect_textColor = function( n ){
	return DrillUp.drill_COC_getColor( n );
};


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处专门窗口相关控制操作。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 自带参数（继承）
//
//			说明：	> 由于 Bitmap 中存放了参数 textColor，所以需要初始化赋值。
//					  核心会使用上述参数，并在函数 drill_COCD_initOptions 中执行绘制配置。
//==============================
var _drill_COC_COCD_initBitmapDefault = Bitmap.prototype.drill_COCD_org_initBitmapDefault;
Bitmap.prototype.drill_COCD_org_initBitmapDefault = function(){
	_drill_COC_COCD_initBitmapDefault.call(this);
	this.drill_COC_initBitmapDefault();
}
//==============================
// * 全局默认值 - 自带参数初始化
//==============================
Bitmap.prototype.drill_COC_initBitmapDefault = function(){
	if( $gameSystem == undefined ){ return; }
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_colorCode = DrillUp.drill_COC_getColor( $gameSystem._drill_COC_globalColorId );
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( this.drill_COWC_isInMessageWindow() == true ){
		if( $gameSystem._drill_COC_dialogMode == "自定义模式" ){
			cur_colorCode = DrillUp.drill_COC_getColor( $gameSystem._drill_COC_dialogColorId );
		}
	}
	
	// > 『全局默认值』 - 使用值
	this.textColor = cur_colorCode;
};
//==============================
// * 全局默认值 - 获取颜色（开放函数）
//
//			说明：	> 返回如"#eeeeff"的颜色代码。
//					> 此处的 n=1 等同于 \c[101]，等同于 <普通颜色:1> 。
//==============================
DrillUp.drill_COC_getColor = function( n ){
	if( n > 200 ){			// 高级颜色（\c[200] - \c[299]）
		return DrillUp.drill_COC_getSeniorColor( n-201 );
	}else if(n > 100){		// 颜色（\c[100] - \c[199]）
		return DrillUp.drill_COC_getCommonColor( n-101 );
	}else{					// 默认颜色（\c[0] - \c[31]）
		return DrillUp.drill_COWC_getTextColor( n );	//获取文本颜色【窗口字符 - 窗口字符核心】
	}
}
//==============================
// * 全局默认值 - 获取颜色 - 普通颜色
//
//			说明：	> 返回如"#eeeeff"的颜色代码。
//					> 此处的 n=1 等同于 \c[101]，等同于 <普通颜色:1> 。
//==============================
DrillUp.drill_COC_getCommonColor = function( n ){
	if( DrillUp.g_COC_color_list[n] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorError1( n ) ); return "#ffffff" }
	if( DrillUp.g_COC_color_list[n]['color'] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorNotFind1( n ) ); return "#ffffff" }
	return DrillUp.g_COC_color_list[n]['color'];
}
//==============================
// * 全局默认值 - 获取颜色 - 高级颜色
//
//			说明：	> 返回如"#eeeeff"的颜色代码。
//					> 此处的 n=1 等同于 \c[201]，等同于 <高级颜色:1> 。
//==============================
DrillUp.drill_COC_getSeniorColor = function( n ){
	if( DrillUp.g_COC_seniorColor_list[n] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorError2( n ) ); return "#ffffff" }
	if( DrillUp.g_COC_seniorColor_list[n]['color'] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorNotFind2( n ) ); return "#ffffff" }
	return DrillUp.g_COC_seniorColor_list[n]['color'];
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
// （不需要继承，因为 drill_COCD_textBlock_fontReset 中已经实现了赋值fr_xxx）
//==============================
// * 重置控制 - 全重置字符 - 执行
//==============================
Game_Temp.prototype.drill_COC_reset = function( cur_infoParam, cur_baseParam, cur_blockParam ){
	if( cur_baseParam['fr_textColor'] != undefined ){ cur_baseParam['textColor'] = cur_baseParam['fr_textColor']; }
};
//==============================
// * 重置控制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COC_COCD_textBlock_processStyle_1 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COC_COCD_textBlock_processStyle_1.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 自定义重置字符（@@@dcc[reset]） drill_core_color
	if( command == "@@@dcc" ){		//（大小写敏感）
		if( args.length == 1 ){
			if( String(args[0]) == "reset" ){
				this.drill_COC_reset( cur_infoParam, cur_baseParam, cur_blockParam );
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
};

	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * D窗口皮肤『颜色核心』 - 取色器 - 获取皮肤中的颜色
//
//			说明：	> 颜色取自窗口皮肤中的特定像素点。
//==============================
Window_Base.prototype.textColor = function( n ){
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};
//==============================
// * D窗口皮肤『颜色核心』 - 取色器 - 获取指定含义的颜色
//==============================
Window_Base.prototype.normalColor    = function(){ return this.textColor(0);  };	//普通文本的颜色
Window_Base.prototype.systemColor    = function(){ return this.textColor(16); };	//系统文本的颜色（比如角色属性的文本）
Window_Base.prototype.crisisColor    = function(){ return this.textColor(17); };	//临死数字的颜色
Window_Base.prototype.deathColor     = function(){ return this.textColor(18); };	//死亡数字的颜色
Window_Base.prototype.gaugeBackColor = function(){ return this.textColor(19); };
Window_Base.prototype.hpGaugeColor1  = function(){ return this.textColor(20); };
Window_Base.prototype.hpGaugeColor2  = function(){ return this.textColor(21); };
Window_Base.prototype.mpGaugeColor1  = function(){ return this.textColor(22); };
Window_Base.prototype.mpGaugeColor2  = function(){ return this.textColor(23); };
Window_Base.prototype.mpCostColor    = function(){ return this.textColor(23); };
Window_Base.prototype.powerUpColor   = function(){ return this.textColor(24); };
Window_Base.prototype.powerDownColor = function(){ return this.textColor(25); };
Window_Base.prototype.tpGaugeColor1  = function(){ return this.textColor(28); };
Window_Base.prototype.tpGaugeColor2  = function(){ return this.textColor(29); };
Window_Base.prototype.tpCostColor    = function(){ return this.textColor(29); };
//==============================
// * D窗口皮肤『颜色核心』 - 取色器 - 获取队伍选中角色时的矩形颜色
//
//			说明：	> 该函数只被 Window_MenuStatus.prototype.drawItemBackground 用到了。
//					  该函数返回的颜色是 闪烁白矩形 区域内的颜色。
//==============================
Window_Base.prototype.pendingColor = function(){
    return this.windowskin.getPixel(120, 120);
};
//==============================
// * D窗口皮肤『颜色核心』 - 取色器 - 获取属性增减的文本颜色
//==============================
Window_Base.prototype.paramchangeTextColor = function( change ){
    if( change > 0 ){
        return this.powerUpColor();
    }else if( change < 0 ){
        return this.powerDownColor();
    }else{
        return this.normalColor();
    }
};
//==============================
// * D窗口皮肤『颜色核心』 - 半透明（置灰的文字用）
//==============================
Window_Base.prototype.translucentOpacity = function(){
    return 160;
};
//==============================
// * D窗口皮肤『颜色核心』 - 切换半透明（是否置灰）
//==============================
Window_Base.prototype.changePaintOpacity = function( enabled ){
    this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();
};
//==============================
// * D窗口皮肤『颜色核心』 - 改变文本色
//==============================
Window_Base.prototype.changeTextColor = function( color ){
    this.contents.textColor = color;
};
//==============================
// * D窗口皮肤『颜色核心』 - 重置字体颜色
//==============================
Window_Base.prototype.resetTextColor = function(){
    this.changeTextColor(this.normalColor());
};
*/
	

//=============================================================================
// ** ☆管辖权覆写函数
//
//			说明：	> 此处将 管辖权覆写函数 功能统一为 开放函数 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管辖权覆写函数 - 获取文本颜色（覆写）
//
//			参数：	> n 数字   （颜色ID）
//			返回：	> 字符串   （颜色字符串，如"#eeeeff"）
//==============================
Window_Base.prototype.textColor = function( n ){
	return DrillUp.drill_COC_getColor( n );
};
//==============================
// * 管辖权覆写函数 - 获取队伍选中角色时的矩形颜色（覆写）
//
//			参数：	> 无
//			返回：	> 字符串   （颜色字符串，如"#eeeeff"）
//==============================
Window_Base.prototype.pendingColor = function(){
	return DrillUp.drill_COWC_getPendingColor();	//获取队伍选中角色时的矩形颜色【窗口字符 - 窗口字符核心】
};
//==============================
// * 管辖权覆写函数 - 窗口默认颜色（覆写）
//==============================
Window_Base.prototype.normalColor = function(){
	return this.textColor( $gameSystem._drill_COC_globalColorId );
};
//==============================
// * 管辖权覆写函数 - 对话框默认颜色（覆写）
//==============================
Window_Message.prototype.normalColor = function(){
	return this.textColor( $gameSystem._drill_COC_dialogColorId );
};



//=============================================================================
// ** ☆高级颜色绘制
//
//			说明：	> 在文本绘制时，解析高级颜色并使用渐变。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 高级颜色绘制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COC_senior_COCD_textBlock_processStyle_1 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COC_senior_COCD_textBlock_processStyle_1.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dcc" ){		//（大小写敏感）
		if( args.length == 2 ){
			if( String(args[0]) == "debug" ){
				
				// > 『底层字符定义』 - 高级颜色绘制（@@@dcc[debug:显示高级颜色框]） drill_core_color
				if( String(args[1]) == "显示高级颜色框" ){
					cur_baseParam['COC_seniorColorDebug'] = true;
					this.drill_COCD_textBlock_submitStyle();
					return;
				}
				
				// > 『底层字符定义』 - 高级颜色绘制（@@@dcc[debug:隐藏高级颜色框]） drill_core_color
				if( String(args[1]) == "隐藏高级颜色框" ){
					cur_baseParam['COC_seniorColorDebug'] = false;
					this.drill_COCD_textBlock_submitStyle();
					return;
				}
			}
		}
	}
};
//==============================
// * 高级颜色绘制 - 绘制绑定
//==============================
var _drill_COC_COCD_drawBaseText_body = Game_Temp.prototype.drill_COCD_drawBaseText_body;
Game_Temp.prototype.drill_COCD_drawBaseText_body = function( painter, text, tx, ty, baseParam ){
	
	// > 高级颜色（渐变色）
	if( baseParam['textColor'] != undefined && 
		baseParam['textColor'] != "" && 
		baseParam['textColor'].indexOf("drill__") != -1 ){
		
		// > 渐变数据
		//		（比如："drill__45__0.0__#00ff00__1.0__#0000ff" ）
		var str_args = baseParam['textColor'].substring(7).split('__');
		var angle = Number( str_args[0] );
		var stop_valueList = [];
		var stop_colorList = [];
		for(var i = 1; i < str_args.length; i += 2 ){
			var stop_value = String( str_args[i] );
			var stop_color = String( str_args[i+1] );
			if( stop_value == "" ){ break; }
			if( stop_color == "" ){ break; }
			stop_valueList.push( stop_value );
			stop_colorList.push( stop_color );
		}
		
		// > 绘制高级颜色
		this.drill_COC_drawSeniorText_body( painter, text, tx, ty, baseParam, angle, stop_valueList, stop_colorList );
		
		
	// > 普通颜色
	}else{
		_drill_COC_COCD_drawBaseText_body.call( this, painter, text, tx, ty, baseParam );
	}
};
//==============================
// * 高级颜色绘制 - 绘制高级颜色
//==============================
Game_Temp.prototype.drill_COC_drawSeniorText_body = function( painter, text, tx, ty, baseParam, angle, stop_valueList, stop_colorList ){

	// > 获取高宽
	var width  = this.drill_COCD_measureBaseTextWidth( text, baseParam );		//宽度（直接计算）
	var height = this.drill_COCD_measureBaseTextHeight( text, baseParam );		//高度（直接计算）
	var xx = tx;			//（修正位置，即矩形的左上角位置）
	var yy = ty - height;	//
	
	// > 求相交的两点
	var result = this.drill_COC_Math2D_getTwoIntersectionPointInGradRect( xx, yy, width, height, angle );
	if( result == null ){ return; }
	
	/*
	// > 特殊偏移设置
	//		（可能是nwjs的bug，只要是在Bitmap中设置渐变绘制，都会出现此偏移问题）
	if( Utils.isNwjs() && this['drill_elements_drawText'] == true ){
		result.x1 -= tx;
		result.y1 -= tx;
		result.x2 -= ty;
		result.y2 -= ty;
	}
	*/
	
	// > 绘制渐变文字
	var grad = painter.createLinearGradient( result.x1, result.y1, result.x2, result.y2 );
	for( var i = 0; i < stop_valueList.length; i++ ){
		grad.addColorStop( parseFloat(stop_valueList[i]), String(stop_colorList[i]) );
	}
    painter.save();								//（a.存储上一个画笔状态）
	
	painter.fillStyle = grad;					//（b.设置样式）
	
	painter.fillText(text, tx, ty);				//（c.路径填充/描边，fillRect）
	
    painter.restore();							//（d.回滚上一个画笔状态）
	
	
	// > 『绘制过程定义』 - 高级颜色绘制（@@@dcc[debug:显示高级颜色框]、@@@dcc[debug:隐藏高级颜色框]）
	if( DrillUp.g_COC_seniorColorDebugAll == true ||
		baseParam['COC_seniorColorDebug'] == true ){
		
		// > DEBUG - 渐变矩阵范围
		painter.save();										//（a.存储上一个画笔状态）
		
		painter.strokeStyle = "#ff0";						//（b.设置样式）
		painter.lineWidth = 2;
		
		painter.strokeRect( xx, yy, width, height);	//（c.路径填充/描边，strokeRect）
	
		painter.restore();									//（d.回滚上一个画笔状态）
		
		
		// > DEBUG - 中心点
		painter.save();												//（a.存储上一个画笔状态）
		
		painter.fillStyle = "#f00";									//（b.设置样式）
		
		painter.fillRect( xx+width*0.5 -2, yy+height*0.5 -2, 4, 4 );//（c.路径填充/描边，fillRect）
		
		painter.restore();											//（d.回滚上一个画笔状态）
		
		
		/*
		// > DEBUG - 特殊偏移设置
		if( Utils.isNwjs() && this['drill_elements_drawText'] == true ){
			result.x1 -= tx;
			result.y1 -= tx;
			result.x2 -= ty;
			result.y2 -= ty;
		}
		*/
		
		// > DEBUG - 渐变点
		painter.save();											//（a.存储上一个画笔状态）
		
		painter.fillStyle = "#f0f";								//（b.设置样式）
		
		painter.fillRect( result.x1 -2, result.y1 -2, 4, 4 );	//（c.路径填充/描边，fillRect）
		painter.fillRect( result.x2 -2, result.y2 -2, 4, 4 );
		
		painter.restore();										//（d.回滚上一个画笔状态）
	}
};
//==============================
// * 高级颜色绘制 - 数学工具 - 求相交的两点（矩形与一根穿过矩形中心的任意角度直线）
//			
//			参数：	> x, y, width, height 矩形范围
//					> angle 数字                    （直线角度）
//			返回：	> {'x1':0,'y1':0,'x2':1,'y2':1} （相交的两点）
//					> null                          （无解）
//			
//			说明：	> 该函数主要用于计算渐变节点位置。
//					> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_COC_Math2D_getTwoIntersectionPointInGradRect = function( x,y,width,height, angle ){
	
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
// ** ☆颜色暂存
//
//			说明：	> 在文本绘制时，解析高级颜色并使用渐变。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 颜色暂存 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COC_COCD_textBlock_processStyle_2 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COC_COCD_textBlock_processStyle_2.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@dcc" ){
		if( args.length == 1 ){
			
			// > 『底层字符定义』 - 颜色暂存 - 存储（@@@dcc[save]） drill_core_color
			if( String(args[0]) == "save" ){
				cur_baseParam['COC_savedColor'] = cur_baseParam['textColor'];
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 颜色暂存 - 读取（@@@dcc[load]） drill_core_color
			if( String(args[0]) == "load" ){
				if( cur_baseParam['COC_savedColor'] != undefined ){
					cur_baseParam['textColor'] = cur_baseParam['COC_savedColor'];
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
			// > 『底层字符定义』 - 颜色暂存 - 脚本用存储（@@@dcc[oSave]） drill_core_color
			if( String(args[0]) == "oSave" ){	//（与save一样，但是脚本专用）
				cur_baseParam['COC_otherSavedColor'] = cur_baseParam['textColor'];
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 颜色暂存 - 脚本用读取（@@@dcc[oLoad]） drill_core_color
			if( String(args[0]) == "oLoad" ){	//（与load一样，但是脚本专用）
				if( cur_baseParam['COC_otherSavedColor'] != undefined ){
					cur_baseParam['textColor'] = cur_baseParam['COC_otherSavedColor'];
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
};
//==============================
// * 逐个字符变色 - 样式阶段-回滚样式（继承）
//==============================
var _drill_COC_COCD_textBlock_restoreStyle_2 = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COC_COCD_textBlock_restoreStyle_2.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 颜色暂存 - 存储（@@@dcc[save]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 颜色暂存 - 读取（@@@dcc[load]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 颜色暂存 - 脚本用存储（@@@dcc[oSave]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 颜色暂存 - 脚本用读取（@@@dcc[oLoad]）
	//	（不操作）
};


//=============================================================================
// ** ☆逐个字符变色
//
//			说明：	> 此模块专门提供 普通颜色的多个文字 变色功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 逐个字符变色 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COC_COCD_textBlock_processStyle_3 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COC_COCD_textBlock_processStyle_3.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dcc" ){		//（大小写敏感）
	
		// > 『底层字符定义』 - 逐个字符变色（@@@dcc[linear:#0f0:#00f]） drill_core_color
		if( args.length == 3 ){
			if( String(args[0]) == "linear" ){
				cur_blockParam['COC_linearEnabled'] = true;
				cur_blockParam['COC_linearStart'] = String(args[1]);
				cur_blockParam['COC_linearEnd'] = String(args[2]);
				cur_blockParam['COC_linearCount'] = null;	//（这个时候 cur_infoParam 中还没有统计数据）
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
		
		// > 『底层字符定义』 - 逐个字符变色（@@@dcc[linear:#0f0:#00f:10]） drill_core_color
		if( args.length == 4 ){
			if( String(args[0]) == "linear" ){
				cur_blockParam['COC_linearEnabled'] = true;
				cur_blockParam['COC_linearStart'] = String(args[1]);
				cur_blockParam['COC_linearEnd'] = String(args[2]);
				cur_blockParam['COC_linearCount'] = String(args[3]);
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
};
//==============================
// * 逐个字符变色 - 样式阶段-回滚样式（继承）
//==============================
var _drill_COC_COCD_textBlock_restoreStyle_3 = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COC_COCD_textBlock_restoreStyle_3.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 逐个字符变色（@@@dcc[linear:#0f0:#00f]、@@@dcc[linear:#0f0:#00f:10]）
	cur_blockParam['COC_linearEnabled'] = undefined;
	cur_blockParam['COC_linearStart'] = undefined;
	cur_blockParam['COC_linearEnd'] = undefined;
	cur_blockParam['COC_linearCount'] = undefined;
};
//==============================
// * 逐个字符变色 - 统计结束阶段（继承）
//==============================
var _drill_COC_COCD_total_processAfterTotal = Game_Temp.prototype.drill_COCD_total_processAfterTotal;
Game_Temp.prototype.drill_COCD_total_processAfterTotal = function( rowBlock_list, infoParam ){
	_drill_COC_COCD_total_processAfterTotal.call( this, rowBlock_list, infoParam );
	
	// > 『绘制过程定义』 - 逐个字符变色（@@@dcc[linear:#0f0:#00f]、@@@dcc[linear:#0f0:#00f:10]）
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		var linearEnabled = false;
		var linearIndex = 0;
		var linearCount = 0;
		var org_rgb = null;
		var inc_rgb = null;
		
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var baseParam = textBlock.drill_textBlock_getBaseParam();
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			
			// > 开始计数
			//		（COC_linearEnabled只会出现一次，如果出现多次，可能是核心中 回滚样式 功能出了问题）
			if( blockParam['COC_linearEnabled'] == true ){
				linearEnabled = true;
				linearIndex = 0;
				linearCount = blockParam['COC_linearCount'];
				if( linearCount == null ){
					linearCount = rowParam['total_rowCharCount'] - j;	//（当前行的剩余字数）
				}
				var rgb1 = $gameTemp.drill_COC_color_StringToRGB( blockParam['COC_linearStart'] );
				var rgb2 = $gameTemp.drill_COC_color_StringToRGB( blockParam['COC_linearEnd'] );
				org_rgb = rgb1;
				var inc_r = (rgb2['r'] - rgb1['r'])/(linearCount-1);
				var inc_g = (rgb2['g'] - rgb1['g'])/(linearCount-1);
				var inc_b = (rgb2['b'] - rgb1['b'])/(linearCount-1);
				inc_rgb = { 'r':inc_r, 'g':inc_g, 'b':inc_b };
			}
			
			// > 逐个字符变色
			if( linearEnabled == true ){
				var r = Math.floor( org_rgb['r'] + inc_rgb['r'] * linearIndex );
				var g = Math.floor( org_rgb['g'] + inc_rgb['g'] * linearIndex );
				var b = Math.floor( org_rgb['b'] + inc_rgb['b'] * linearIndex );
				var color_str = "rgb("+r+","+g+","+b+")";
				baseParam['textColor'] = color_str;
				//alert( linearIndex + " - " + color_str );
				
				// > 索引+1
				linearIndex += 1;
				if( linearIndex >= linearCount ){
					linearEnabled = false;
				}
			}
		}
	}
}



//=============================================================================
// ** ☆颜色工具
//
//			说明：	> 此模块专门提供 颜色工具 函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 颜色工具 - 字符串转RGB（开放函数）
//			
//			参数：	> color_string 字符串 （颜色）
//			返回：	> 动态参数对象        （如 {"r":255,"g":255,"b":255} ）
//			
//			说明：	> 颜色的格式支持 十六进制表示法、RGB表示法 。
//==============================
Game_Temp.prototype.drill_COC_color_StringToRGB = function( color_string ){
	color_string = color_string.toLowerCase();
	
	// > 格式"#eeeeff"情况
	if( color_string.charAt(0) == "#" ){
		color_string = color_string.substring(1);
		
		// > 格式"#eef"情况
		if( color_string.length == 3 ){
			color_string = color_string[0]+color_string[0] +color_string[1]+color_string[1] +color_string[2]+color_string[2];
		}
		if( /^[0-9a-f]{6}$/.test(color_string) ){
			var color_obj = {};
			color_obj['r'] = parseInt( color_string.substr(0,2), 16 );
			color_obj['g'] = parseInt( color_string.substr(2,2), 16 );
			color_obj['b'] = parseInt( color_string.substr(4,2), 16 );
			return color_obj;
		}
	}
	// > 格式"rgb(255,255,255)"情况
	if( color_string.charAt(0) == "r" ){
		color_string = color_string.replace( /[ rgba\(\)（）]/g, "" );
		var str_list = color_string.split( /[,，]+/ );
		if( str_list.length < 3 ){ return null; }
		var color_obj = {};
		color_obj['r'] = Number( str_list[0] );
		color_obj['g'] = Number( str_list[1] );
		color_obj['b'] = Number( str_list[2] );
		return color_obj;
	}
	return null;
}
//==============================
// * 颜色工具 - RGB转字符串（开放函数）
//			
//			参数：	> r,g,b 数字 （颜色）
//			返回：	> 字符串     （如"rgb(255,255,255)"）
//==============================
Game_Temp.prototype.drill_COC_color_RGBToString = function( r, g, b ){
	return "rgb(" + String(r) + "," + String(g) + "," + String(b) + ")";
}
//==============================
// * 颜色工具 - 字符串转RGBA（开放函数）
//			
//			参数：	> color_string 字符串 （颜色）
//			返回：	> 动态参数对象        （如 {"r":255,"g":255,"b":255,"a":1.0} ）
//			
//			说明：	> 颜色的格式支持 十六进制表示法、RGB表示法 。
//					> 注意，a的取值为0~1。
//==============================
Game_Temp.prototype.drill_COC_color_StringToRGBA = function( color_string ){
	color_string = color_string.toLowerCase();
	
	// > 格式"#eeeeff"情况
	if( color_string.charAt(0) == "#" ){
		color_string = color_string.substring(1);
		
		// > 格式"#eef"情况
		if( color_string.length == 3 ){
			color_string = color_string[0]+color_string[0] +color_string[1]+color_string[1] +color_string[2]+color_string[2];
		}
		if( /^[0-9a-f]{6}$/.test(color_string) ){
			var color_obj = {};
			color_obj['r'] = parseInt( color_string.substr(0,2), 16 );
			color_obj['g'] = parseInt( color_string.substr(2,2), 16 );
			color_obj['b'] = parseInt( color_string.substr(4,2), 16 );
			color_obj['a'] = 1;
			return color_obj;
		}
	}
	// > 格式"rgb(255,255,255,1.0)"情况
	if( color_string.charAt(0) == "r" ){
		color_string = color_string.replace( /[ rgba\(\)（）]/g, "" );
		var str_list = color_string.split( /[,，]+/ );
		if( str_list.length < 4 ){ return null; }
		var color_obj = {};
		color_obj['r'] = Number( str_list[0] );
		color_obj['g'] = Number( str_list[1] );
		color_obj['b'] = Number( str_list[2] );
		color_obj['a'] = Number( str_list[3] );
		return color_obj;
	}
	return null;
}
//==============================
// * 颜色工具 - RGBA转字符串（开放函数）
//			
//			参数：	> r,g,b,a 数字 （颜色）
//			返回：	> 字符串       （如"rgba(255,255,255,1.0)"）
//			
//			说明：	> 注意，a的取值为0~1。
//==============================
Game_Temp.prototype.drill_COC_color_RGBAToString = function( r, g, b, a ){
	return "rgba(" + String(r) + "," + String(g) + "," + String(b) + "," + String(a) + ")";
}


//=============================================================================
// ** ☆DEBUG颜色测试
//
//			说明：	> 此模块控制 DEBUG颜色测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG颜色测试 - 帧刷新（地图界面）
//==============================
var _drill_COC_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COC_debug_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COC_DebugEnabled == true ){
		$gameTemp._drill_COC_DebugEnabled = undefined;
		this.drill_COC_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_COC_DebugEnabled == false ){
		$gameTemp._drill_COC_DebugEnabled = undefined;
		if( this._drill_COC_DebugSprite != undefined ){
			this.removeChild(this._drill_COC_DebugSprite);
			this._drill_COC_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG颜色测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_COC_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COC_DebugSprite != undefined ){
		this.removeChild(this._drill_COC_DebugSprite);
		this._drill_COC_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 40, 736, 544 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_COC_DebugSprite = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
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
												//（但是fr重置之后，仍然需要再次修改字体大小）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_COC_PluginTip_curName + "】\n" + 
				"》当前测试 颜色核心 的功能效果。\n" + 
				"如果不做任何操作，则使用 全局默认值-所有文本 的颜色配置。\n" + 
				"若插件配置了所有文本开启颜色，那么此段文本也会对应有颜色效果。\n" + 
				
				"》普通颜色如下：\n" + 
				"\\\\c[101]  颜色（赤）  \\c[101]测试的字符 \\CC[reset]\n" + 
				"\\\\c[102]  颜色（橙）  \\c[102]测试的字符 \\CC[reset]\n" + 
				"\\\\c[103]  颜色（黄）  \\c[103]测试的字符 \\CC[reset]\n" + 
				"\\\\c[104]  颜色（绿）  \\c[104]测试的字符 \\CC[reset]\n" + 
				
				"》高级颜色如下：\n" + 
				"\\\\c[202]  颜色（渐变橙）  \\c[202]测试的字符 \\CC[reset]\n" + 
				"\\\\c[203]  颜色（渐变黄）  \\c[203]测试的字符 \\CC[reset]\n" + 
				"\\\\c[204]  颜色（渐变绿）  \\c[204]测试的字符 \\CC[reset]\n" + 
				"\\\\c[212]  颜色（横渐变红）  \\c[212]测试的字符 \\CC[reset]\n" + 
				"\\\\c[213]  颜色（横渐变绿）  \\c[213]测试的字符 \\CC[reset]\n" + 
				"\\\\c[214]  颜色（横渐变蓝）  \\c[214]测试的字符 \\CC[reset]\n" + 
				"\\\\CC[DEBUG:显示高级颜色框]  显示/隐藏高级颜色框  \\CC[DEBUG:显示高级颜色框]\\c[201]测试的字符\\c[203]测试字符\\c[204]测试的\\CC[DEBUG:隐藏高级颜色框]字符 \\CC[reset]\n" + 
				
				"》自定义颜色如下：\n" + 
				"\\\\cc[#ff00ff]  颜色（紫红）  \\cc[#ff00ff]测试的字符 \\CC[reset]\n" + 
				
				"》暂存颜色测试：\n" + 
				"\\\\cc[save] 和 \\\\cc[load]  暂存颜色/读取颜色  \\c[201]现在是红色，\\cc[save]存储\\c[6]并改色，现在\\cc[load]恢复颜色 \\CC[reset]\n" + 
				
				"》逐个字符变色测试：\n" + 
				"\\\\clc[#aaffaa:#aaaaff:10]  逐个字符变色  \\clc[#aaffaa:#aaaaff:10]这是一串测试渐变效果的字符 \\CC[reset]\n" + 
				"\\\\clc[#aaffaa:#aaaaff:当前行字数]  逐个字符变色  \\clc[#aaffaa:#aaaaff:当前行字数]这是一串测试渐变效果的字符 \\CC[reset]\n" + 
				
				"\n";
	
	temp_window.drill_COWC_drawText( text, options );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfColor = false;
		var pluginTip = DrillUp.drill_COC_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


