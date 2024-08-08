//=============================================================================
// Drill_CoreOfColor.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        窗口字符 - 颜色核心
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
 * 可使得窗口中的字符变为自定义的颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件，才能运行，并作用于其他子插件。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v1.7及以上★★
 * 可作用于：
 *   - Drill_ActorTextColor          UI-角色文本颜色
 *   - Drill_EnemyTextColor          UI-敌人文本颜色
 *   - Drill_ItemTextColor           UI-物品+技能文本颜色
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   作用于任何显示文本的地方。
 * 2.如果想了解高级颜色设置方法，去看看 "23.窗口字符 > 关于颜色核心.docx"。
 * 3.如果想了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
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
 * ----可选设定 - 颜色窗口字符
 * 你可以使用窗口字符调整 自定义颜色：
 * 
 * 窗口字符：\c[101]
 * 窗口字符：\c[102]
 * 
 * 窗口字符：\c[201]
 * 窗口字符：\c[202]
 * 
 * 1.游戏中有默认32种颜色窗口字符，即 \c[0] - \c[31] 。
 * 2.颜色和高级颜色固定99种自定义设置。
 *   "\c[101] - \c[199]"对应了 颜色1 至 颜色99。
 *   "\c[201] - \c[299]"对应了 高级颜色1 至 高级颜色99。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 普通颜色
 * 你可以使用窗口字符设置 普通颜色：
 * 
 * 窗口字符：\cc[#ffffff]
 * 窗口字符：\clc[#ffffff:#ffffff:10]
 * 窗口字符：\clc[#ffffff:#ffffff:当前行字数]
 * 
 * 1."\cc"由于普通颜色非常多，通过序号来定义比较麻烦，你可以使用 \cc 直接
 *   定义普通颜色来使用。
 * 2."\clc"可以使得后面的字符每个字变一种普通颜色，合起来看起来像渐变。
 *   分别表示 起始颜色、终止颜色、过渡的字数 。
 * 3."当前行字数"即当前行 一般字符 的字数。
 *    注意，当前行字数统计不含 效果字符、字符块 的数量。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 颜色暂存
 * 你可以使用窗口字符暂存颜色：
 * 
 * 窗口字符：\csave
 * 窗口字符：\cload
 * 
 * 1.窗口字符 是一个一个顺序绘制上去的，存在先后顺序。
 *   如果你有 插播的字符串 要临时变色，可以先暂存之前的颜色，在最后恢复颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 对话框
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>颜色核心 : 固定对话框文本色 : 文本色[0]
 * 插件指令：>颜色核心 : 恢复对话框文本色
 * 
 * 1.插件指令设置后，对话框文本颜色的修改 永久有效。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2.注意，"文本色[0]" 与 "\c[0]" 意思一样。
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
 * 
 * 
 * 
 * @param ---默认设置---
 * @desc 
 * 
 * @param 默认文本颜色(全局)
 * @parent ---默认设置---
 * @type number
 * @min 0
 * @desc 全局默认的文本颜色，对应"\c[0]"中的数字。注意，对游戏中的所有窗口都有效。
 * @default 0
 * 
 * @param 是否开启Debug模式
 * @parent ---默认设置---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 主要用于全选出文字绘制的块区域，识别高级渐变颜色的布局。
 * @default false
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
//		插件简称：		COC (Core_Of_Color)
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
//			->☆管辖权
//			->☆插件指令
//			->☆存储数据
//			->☆效果字符应用
//			
//			->☆文本颜色
//			->☆颜色文本绘制
//			->☆文本颜色绑定
//			->☆逐个字符变色
//			->☆颜色工具
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
//			1.Bitmap.drill_elements_drawText用于控制颜色渐变的位置修正。（目前不理解为啥bitmap绘制渐变时会产生brush偏移的情况。）
//			2.高级颜色格式为： drill__90__0.0__#ffffff__0.5__#ff99ff__1.0__#ff55ff
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
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
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
		data['color'] = String( dataFrom["颜色代码"] || "#FFFFFF" );
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
	//==============================
	// * 临时全局 - 获取普通颜色（开放函数）
	//
	//			说明：	> 返回如"#ffffff"的颜色代码。
	//					> 此处的 n=1 等同于 \c[101]，等同于 <普通颜色:1> 。
	//==============================
	DrillUp.drill_COC_getColor = function( n ) {
		if( DrillUp.g_COC_color_list[n] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorError1( n ) ); return "#ffffff" }
		if( DrillUp.g_COC_color_list[n]['color'] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorNotFind1( n ) ); return "#ffffff" }
		return DrillUp.g_COC_color_list[n]['color'];
	}
	//==============================
	// * 临时全局 - 获取高级颜色
	//
	//			说明：	> 返回如"#ffffff"的颜色代码。
	//					> 此处的 n=1 等同于 \c[201]，等同于 <高级颜色:1> 。
	//==============================
	DrillUp.drill_COC_getSeniorColor = function( n ) {
		if( DrillUp.g_COC_seniorColor_list[n] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorError2( n ) ); return "#ffffff" }
		if( DrillUp.g_COC_seniorColor_list[n]['color'] == undefined ){ console.log( DrillUp.drill_COC_getPluginTip_ColorNotFind2( n ) ); return "#ffffff" }
		return DrillUp.g_COC_seniorColor_list[n]['color'];
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_COC_fontColorIndex = Number(DrillUp.parameters["默认文本颜色(全局)"] || 0); 
	DrillUp.g_COC_debugMode = String(DrillUp.parameters["是否开启Debug模式"] || "false") == "true"; 
	
	/*-----------------普通颜色------------------*/
	DrillUp.g_COC_color_list_length = 99;
	DrillUp.g_COC_color_list = [];
	for (var i = 0; i < DrillUp.g_COC_color_list_length; i++) {
		if( DrillUp.parameters['颜色-' + String(i+1) ] != undefined &&
			DrillUp.parameters['颜色-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['颜色-' + String(i+1) ]);
			DrillUp.g_COC_color_list[i] = DrillUp.drill_COC_initCommonColor( data );
		}else{
			DrillUp.g_COC_color_list[i] = {};
		}
	}
	
	/*-----------------高级颜色------------------*/
	DrillUp.g_COC_seniorColor_list_length = 99;
	DrillUp.g_COC_seniorColor_list = [];
	for (var i = 0; i < DrillUp.g_COC_seniorColor_list_length; i++) {
		if( DrillUp.parameters['高级颜色-' + String(i+1) ] != undefined &&
			DrillUp.parameters['高级颜色-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['高级颜色-' + String(i+1) ]);
			DrillUp.g_COC_seniorColor_list[i] = DrillUp.drill_COC_initSeniorColor( data );
		}else{
			DrillUp.g_COC_seniorColor_list[i] = {};
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
	
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
// * D窗口皮肤『颜色核心』 - 取色器 - 定义的颜色函数
//==============================
Window_Base.prototype.normalColor    = function(){ return this.textColor(0); };
Window_Base.prototype.systemColor    = function(){ return this.textColor(16); };
Window_Base.prototype.crisisColor    = function(){ return this.textColor(17); };
Window_Base.prototype.deathColor     = function(){ return this.textColor(18); };
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
// * D窗口皮肤『颜色核心』 - 取色器 - 背景颜色
//==============================
Window_Base.prototype.pendingColor = function(){
    return this.windowskin.getPixel(120, 120);
};
//==============================
// * D窗口皮肤『颜色核心』 - 取色器 - 属性增减的文本颜色
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
// * D窗口皮肤『颜色核心』 - 半透明（置灰的文字）
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
// ** ☆插件指令
//=============================================================================
var _drill_COC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COC_pluginCommand.call(this, command, args);
	if( command === ">颜色核心" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复对话框文本色" ){
				$gameSystem._drill_COC_dialog_fontColorIndex = DrillUp.g_COC_fontColorIndex;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("文本色[","");
			temp1 = temp1.replace("]","");
			if( type == "固定对话框文本色" ){
				$gameSystem._drill_COC_dialog_fontColorIndex = Number(temp1);
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
	
	this._drill_COC_fontColorIndex = DrillUp.g_COC_fontColorIndex;				//字符文本色（全局默认）
	
	this._drill_COC_dialog_fontColorIndex = DrillUp.g_COC_fontColorIndex;		//字符文本色（对话框）
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COC_dialog_fontColorIndex == undefined ){
		this.drill_COC_initSysData();
	}
	
};
	

//=============================================================================
// ** ☆效果字符应用
//=============================================================================
//==============================
// * 效果字符应用 - 字符转换（简单符）
//==============================
var _drill_COC_COWC_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_COC_COWC_processNewEffectChar_Simple.call( this, matched_index, command );
	
	if( command == "csave" ){
		this._drill_COC_tempColor = this.contents.textColor;
		this.drill_COWC_charSubmit_Effect( 0, 0 );
	}
	if( command == "cload" ){
		if( this._drill_COC_tempColor != undefined ){
			this.contents.textColor = this._drill_COC_tempColor;
		}
		this.drill_COWC_charSubmit_Effect( 0, 0 );
	}
}
//==============================
// * 效果字符应用 - 字符转换（组合符）
//==============================
var _drill_COC_COWC_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_COC_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	if( command == "cc" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			this.drill_COC_setColor_Code( temp1 );	//（文本颜色）
			this.drill_COWC_charSubmit_Effect( 0, 0 );
		}
	}
	if( command == "clc" ){
		if( args.length == 3 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			if( temp3 == "当前行字数" ){
				this.drill_COC_setColorLinearCode( temp1, temp2, null );
			}else{
				this.drill_COC_setColorLinearCode( temp1, temp2, Number(temp3) );
			}
			this.drill_COWC_charSubmit_Effect( 0, 0 );
		}
	}
}
//==============================
// * 效果字符应用 - 当前行
//==============================
var _drill_COC_COWC_processNewLine = Window_Base.prototype.drill_COWC_processNewLine;
Window_Base.prototype.drill_COWC_processNewLine = function( line_index, line_text ){
	_drill_COC_COWC_processNewLine.call( this, line_index, line_text );
	
	// > 得到当前行字数
	this._drill_COC_curLineNormalCharacterCount = this.drill_COWC_getCurLineNormalCharCount();
	
	// > 清除 逐个字符变色 设置
	this._drill_COC_linearCodeData = null;
}


//=============================================================================
// ** ☆文本颜色
//
//			说明：	> 此处将 文本颜色 功能统一为 开放函数 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 文本颜色 - 设置颜色代码（开放函数）
//
//			说明：	普通颜色(#开头)和高级颜色(drill开头)都可以。
//==============================
Window_Base.prototype.drill_COC_setColor_Code = function( color ){
	this.contents.textColor = color;
};
//==============================
// * 文本颜色 - 设置颜色ID（开放函数）
//==============================
Window_Base.prototype.drill_COC_setColor_Id = function( id ){
	if( typeof id != "number" ){ return; }
	this.contents.textColor = this.textColor( id );
};
//==============================
// * 文本颜色 - 获取颜色代码 根据ID
//
//			说明：	调用此函数时，可以写："var color = this.textColor(101)"。
//==============================
var _drill_COC_textColor = Window_Base.prototype.textColor;
Window_Base.prototype.textColor = function( n ){
	if( n > 200 ){			// 高级颜色（\c[200] - \c[299]）
		return DrillUp.drill_COC_getSeniorColor( n-201 );
	}else if(n > 100){		// 颜色（\c[100] - \c[199]）
		return DrillUp.drill_COC_getColor( n-101 );
	}else{					// 默认颜色（\c[0] - \c[31]）
		return _drill_COC_textColor.call(this,n);
	}
};

//=============================================================================
// ** ☆颜色文本绘制
//
//			说明：	> 在文本绘制时，解析高级颜色并使用渐变。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 颜色文本绘制 - 绘制绑定
//==============================
var _drill_COC_bitmap_drawTextBody = Bitmap.prototype._drawTextBody;
Bitmap.prototype._drawTextBody = function( text, tx, ty, maxWidth ){
	
	// > 高级颜色（渐变色）
	if( typeof(this.textColor) == "string" && 
		this.textColor != "" && 
		this.textColor.indexOf("drill__") != -1 ){
		
		// > 渐变数据
		//		（比如："drill__45__0.0__#ffffff__1.0__#000000" ）
		var str_args = this.textColor.substring(7).split('__');
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
		this.drill_COC__drawSeniorTextBody( text, tx, ty, maxWidth, angle, stop_valueList, stop_colorList );
		this._setDirty();
		
		
	// > 普通颜色
	}else{
		_drill_COC_bitmap_drawTextBody.call(this,text, tx, ty, maxWidth);
	}
};
//==============================
// * 颜色文本绘制 - 绘制高级颜色
//==============================
Bitmap.prototype.drill_COC__drawSeniorTextBody = function( text, tx, ty, maxWidth, angle, stop_valueList, stop_colorList ){
	if( angle >= 360 ){ angle = angle % 360; }		//角度
	var radian = angle / 180 * Math.PI;				//弧度
	
	var width = this.measureTextWidth( text );		//宽度
	if( width > maxWidth ){ width = maxWidth; }		//
	var height = this.fontSize -4;					//高度（实际文字比字体大小要矮一点）
	
	
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
	
	// > 特殊偏移设置
	//		（可能是nwjs的bug，只要是在Bitmap中设置渐变绘制，都会出现此偏移问题）
	if( Utils.isNwjs() && this['drill_elements_drawText'] == true ){
		x_0 -= tx;
		x_1 -= tx;
		y_0 -= ty;
		y_1 -= ty;
	}
	
	// > 绘制渐变文字
	var painter = this._context;
	var grad = painter.createLinearGradient( x_0, y_0, x_1, y_1 );
	for( var i = 0; i < stop_valueList.length; i++ ){
		grad.addColorStop( parseFloat(stop_valueList[i]), String(stop_colorList[i]) );
	}
    painter.save();								//（a.存储上一个画笔状态）
	
	painter.fillStyle = grad;					//（b.设置样式）
	
	painter.fillText(text, tx, ty, maxWidth);	//（c.路径填充/描边，fillRect）
	
    painter.restore();							//（d.回滚上一个画笔状态）
	
	
	// > DEBUG
	if( DrillUp.g_COC_debugMode == true ){
		
		// > DEBUG - 渐变矩阵范围
		painter.save();										//（a.存储上一个画笔状态）
		
		painter.strokeStyle = "#ffff00";					//（b.设置样式）
		painter.lineWidth = 2;
		
		painter.strokeRect( tx, ty-height, width, height);	//（c.路径填充/描边，strokeRect）
	
		painter.restore();									//（d.回滚上一个画笔状态）
		
		
		// > DEBUG - 中心点
		painter.save();											//（a.存储上一个画笔状态）
		
		painter.fillStyle = "#ff0000";							//（b.设置样式）
		
		painter.fillRect( midPoint.x -2, midPoint.y -2, 4, 4 );	//（c.路径填充/描边，fillRect）
		
		painter.restore();										//（d.回滚上一个画笔状态）
		
		
		// > DEBUG - 特殊偏移设置
		if( Utils.isNwjs() && this['drill_elements_drawText'] == true ){
			x_0 += tx;
			x_1 += tx;
			y_0 += ty;
			y_1 += ty;
		}
		
		// > DEBUG - 渐变点
		painter.save();								//（a.存储上一个画笔状态）
		
		painter.fillStyle = "#ff00ff";				//（b.设置样式）
		
		painter.fillRect( x_0 -2, y_0 -2, 4, 4);	//（c.路径填充/描边，fillRect）
		painter.fillRect( x_1 -2, y_1 -2, 4, 4);
		
		painter.restore();							//（d.回滚上一个画笔状态）
	}
};


//=============================================================================
// ** ☆文本颜色绑定
//
//			说明：	> 此模块管理 默认文本色 的配置，其中包含插件指令 固定对话框文本色 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 文本颜色绑定 - 画笔同步（继承）
//==============================
var _drill_COWC_COC_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_COWC_COC_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to.color = bitmap_from.color;
};
/*
//==============================
// * 文本颜色绑定 - 重置绑定
//==============================
var _drill_COC_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	_drill_COC_resetFontSettings.call(this);
	this.drill_COC_resetTextColor();
};
//==============================
// * 文本颜色绑定 - 重置（全局默认）
//==============================
Window_Base.prototype.drill_COC_resetTextColor = function() {
	if( this.contents == undefined ){ return; }
	this.contents.color = this.textColor( $gameSystem._drill_COC_fontColorIndex );
};
//==============================
// * 文本颜色绑定 - 重置（对话框）
//==============================
Window_Message.prototype.drill_COC_resetTextColor = function() {
	if( this.contents == undefined ){ return; }
	this.contents.color = this.textColor( $gameSystem._drill_COC_dialog_fontColorIndex );
};*/
//==============================
// * 文本颜色绑定 - 默认颜色（覆写）
//==============================
Window_Base.prototype.normalColor = function(){
	return this.textColor( $gameSystem._drill_COC_fontColorIndex );
};
//==============================
// * 文本颜色绑定 - 默认颜色（对话框）（覆写）
//==============================
Window_Message.prototype.normalColor = function(){
	return this.textColor( $gameSystem._drill_COC_dialog_fontColorIndex );
};


//=============================================================================
// ** ☆逐个字符变色
//
//			说明：	> 此模块专门提供 普通颜色的多个文字 变色功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 逐个变色 - 初始化（开放函数）
//==============================
Window_Base.prototype.drill_COC_setColorLinearCode = function( color1, color2, char_num ){
	if( color1.slice(0,1) != "#" ){ return; }
	if( color2.slice(0,1) != "#" ){ return; }
    this.contents.textColor = color1;
	
	// > 如果为空，则获取到 当前行字数
	if( char_num == undefined ){
		char_num = this._drill_COC_curLineNormalCharacterCount;
	}
	if( char_num <= 1 ){ return; }
	
	// > 数据标记
	var rgb1 = $gameTemp.drill_COC_color_StringToRGB( color1 );
	var rgb2 = $gameTemp.drill_COC_color_StringToRGB( color2 );
	var data = {};
	data['cur_index'] = -1;
	data['tar_index'] = char_num;
	data['org_r'] = rgb1['r'];
	data['org_g'] = rgb1['g'];
	data['org_b'] = rgb1['b'];
	data['inc_r'] = (rgb2['r'] - rgb1['r'])/(char_num-1);
	data['inc_g'] = (rgb2['g'] - rgb1['g'])/(char_num-1);
	data['inc_b'] = (rgb2['b'] - rgb1['b'])/(char_num-1);
	this._drill_COC_linearCodeData = data;
};
//==============================
// * 逐个变色 - 逐一绘制 - 一般字符
//==============================
var _drill_COC_processNormalCharacter = Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function( textState ){
	_drill_COC_processNormalCharacter.call( this,textState );
	if( this.drill_COWA_isCalculating() == true ){ return; }	//（排除 计算文本高度/宽度 情况）
	
	if( this._drill_COC_linearCodeData != undefined ){
		var data = this._drill_COC_linearCodeData;
		data['cur_index'] += 1;
		
		// > 设置颜色
		var r = Math.floor( data['org_r'] + data['inc_r'] * data['cur_index'] );
		var g = Math.floor( data['org_g'] + data['inc_g'] * data['cur_index'] );
		var b = Math.floor( data['org_b'] + data['inc_b'] * data['cur_index'] );
		var str = "rgb("+r+","+g+","+b+")";
		this.drill_COC_setColor_Code( str );
		
		// > 结束后 销毁标记
		if( data['cur_index'] > data['tar_index'] ){
			this._drill_COC_linearCodeData = null;
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
	
	// > 格式"#ffffff"情况
	if( color_string.charAt(0) == "#" ){
		color_string = color_string.substring(1);
		
		// > 格式"#fff"情况
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
	
	// > 格式"#ffffff"情况
	if( color_string.charAt(0) == "#" ){
		color_string = color_string.substring(1);
		
		// > 格式"#fff"情况
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
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfColor = false;
		var pluginTip = DrillUp.drill_COC_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

