//=============================================================================
// Drill_CoreOfString.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        系统 - 字符串核心
 * @author Drill_up
 * 
 * @Drill_LE_param "字符串-%d"
 * @Drill_LE_parentKey "---字符串组%d至%d---"
 * @Drill_LE_var "DrillUp.g_COSt_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfString +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你通过插件指令存储、操作字符串。与变量、开关用法相似。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 该插件为基础核心，可以作用于下列插件。
 * 可被扩展：
 *   - Drill_CoreOfNumberArray     系统-变量数组核心
 *     目标插件可以将数组输出成字符串，给该核心使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有窗口有效。
 * 2.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 指代字符：
 *   (1.该字符可以与变量字符组合"\str[\v[21]]"。
 *      通过变量来表示一串指定的字符串。
 *   (2.字符串内部可以也用\str[]字符进行多重嵌套，
 *      但是要注意不能死循环嵌套。
 *   (3.了解更多窗口字符，去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 设计：
 *   (1.你可以通过该插件来简化一个冗长的通用故事文本。
 *      比如：女王A喜欢吃甜点B，她在C城市里举办了甜点B盛宴，你有幸
 *      参加了宴会，并且得到了大量甜点B。（甜点B x10）
 *   (2.也可以用字符串来表示一个名字、一个通知、一个专有名词。
 *      游戏中该字符串随时会变，比如添加前缀后缀："光荣的量子妹(27级)"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 使用该插件后，你可以使用窗口字符来显示字符串内容：
 * 
 * 窗口字符：\str[1]      数字1表示对应配置的第1个字符串
 * 
 * 1.你可以在窗口、对话框中设置窗口字符，配置后将显示相应的字符串。
 *   (str全称为：String，即字符串)
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改字符串内容：
 * 
 * 插件指令：>字符串核心 : 字符串[1] : 使用弹出框修改 : 请输入
 * 插件指令：>字符串核心 : 字符串[1] : 修改字符串 : 某\c[2]字符串
 * 插件指令：>字符串核心 : 字符串[1] : 还原字符串
 * 
 * 1.插件指令修改字符串后，永久有效。
 * 2.由于字符串不能加英文空格，你可以用中文空格代替。
 * 3.第一条指令中"请输入"，会被作为弹出框的标题进行显示。
 * 
 * -----------------------------------------------------------------------------
 * ----知识点
 * 默认的常用脚本如下：
 *     var aa = $gameSwitches.value(21);       //获取21号开关值（true/false）
 *     var bb = $gameVariables.value(22);      //获取22号变量值（整数）
 *     $gameSwitches.setValue(21,false);       //设置21号开关值为false
 *     $gameVariables.setValue(22,100);        //设置22号变量值为100
 * 该核心的用法一样：
 *     var ss = $gameStrings.value(21);        //获取21号字符串
 *     $gameStrings.setValue(21,"量子妹");     //设置21号字符串为"量子妹"
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
 * 2.由于插件只执行一两次，不存在反复执行情况，所以几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 \str[\v[21]] 不生效的bug。感谢群友 孑然一身。
 * 
 * 
 * @param ---字符串组 1至20---
 * @default 
 * 
 * @param 字符串-1
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-2
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-3
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-4
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-5
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-6
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-7
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-8
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-9
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-10
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-11
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-12
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-13
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-14
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-15
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-16
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-17
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-18
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-19
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-20
 * @parent ---字符串组 1至20---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组21至40---
 * @default 
 * 
 * @param 字符串-21
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-22
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-23
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-24
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-25
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-26
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-27
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-28
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-29
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-30
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-31
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-32
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-33
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-34
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-35
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-36
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-37
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-38
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-39
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-40
 * @parent ---字符串组21至40---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组41至60---
 * @default 
 * 
 * @param 字符串-41
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-42
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-43
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-44
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-45
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-46
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-47
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-48
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-49
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-50
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-51
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-52
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-53
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-54
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-55
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-56
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-57
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-58
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-59
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-60
 * @parent ---字符串组41至60---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组61至80---
 * @default 
 * 
 * @param 字符串-61
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-62
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-63
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-64
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-65
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-66
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-67
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-68
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-69
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-70
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-71
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-72
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-73
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-74
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-75
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-76
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-77
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-78
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-79
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-80
 * @parent ---字符串组61至80---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组81至100---
 * @default 
 * 
 * @param 字符串-81
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-82
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-83
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-84
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-85
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-86
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-87
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-88
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-89
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-90
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-91
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-92
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-93
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-94
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-95
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-96
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-97
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-98
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-99
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-100
 * @parent ---字符串组81至100---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组101至120---
 * @default 
 * 
 * @param 字符串-101
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-102
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-103
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-104
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-105
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-106
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-107
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-108
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-109
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-110
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-111
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-112
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-113
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-114
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-115
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-116
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-117
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-118
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-119
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-120
 * @parent ---字符串组101至120---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组121至140---
 * @default 
 * 
 * @param 字符串-121
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-122
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-123
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-124
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-125
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-126
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-127
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-128
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-129
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-130
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-131
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-132
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-133
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-134
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-135
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-136
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-137
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-138
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-139
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-140
 * @parent ---字符串组121至140---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组141至160---
 * @default 
 * 
 * @param 字符串-141
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-142
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-143
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-144
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-145
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-146
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-147
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-148
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-149
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-150
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-151
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-152
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-153
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-154
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-155
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-156
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-157
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-158
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-159
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-160
 * @parent ---字符串组141至160---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组161至180---
 * @default 
 * 
 * @param 字符串-161
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-162
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-163
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-164
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-165
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-166
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-167
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-168
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-169
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-170
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-171
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-172
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-173
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-174
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-175
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-176
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-177
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-178
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-179
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-180
 * @parent ---字符串组161至180---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param ---字符串组181至200---
 * @default 
 * 
 * @param 字符串-181
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-182
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-183
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-184
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-185
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-186
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-187
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-188
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-189
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-190
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-191
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-192
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-193
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-194
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-195
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-196
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-197
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-198
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-199
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default 
 * 
 * @param 字符串-200
 * @parent ---字符串组181至200---
 * @type struct<DrillString>
 * @desc 字符串的内容配置。
 * @default
 * 
 */
/*~struct~DrillString:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的字符串==
 *
 * @param 字符串内容
 * @type note
 * @desc 字符串的内容，可以含有窗口字符，包括\str[]来嵌套其它的自定义字符串，但是要注意不能死循环嵌套。
 * @default ""
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COSt（Core_Of_String）
//		临时全局变量	无
//		临时局部变量	this._drill_COSt_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话管理层
//		★性能测试消耗	（太小，没有找到）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			字符串核心：
//				->脚本提供
//				->指代内容
//				->自我嵌套
//				->插件指令
//					->字符串输入框
//
//		★必要注意事项：
//			1.这里相对完整地复刻了 变量、开关 的程序结构，将字符串对象化。
//			  插件本身就相当于 核心功能扩展 。
//			
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfString = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfString');
	
	//==============================
	// * 变量获取 - 字符串
	//				(~struct~DrillString)
	//==============================
	DrillUp.drill_COSt_initString = function( dataFrom ) {
		var data = {};
		if( dataFrom["字符串内容"] != undefined && 
			dataFrom["字符串内容"] != "" ){
			data['context'] = JSON.parse( dataFrom["字符串内容"] );
		}else{
			data['context'] = "";
		}
		return data;
	}
	
	/*-----------------字符串------------------*/
	DrillUp.g_COSt_list_length = 200;
	DrillUp.g_COSt_list = [];
	for( var i = 0; i < DrillUp.g_COSt_list_length ; i++ ){
		if( DrillUp.parameters['字符串-' + String(i+1) ] != "" &&
			DrillUp.parameters['字符串-' + String(i+1) ] != undefined ){
			var temp = JSON.parse( DrillUp.parameters['字符串-' + String(i+1)] || {} );
			DrillUp.g_COSt_list[i] = DrillUp.drill_COSt_initString( temp );
		}else{
			DrillUp.g_COSt_list[i] = DrillUp.drill_COSt_initString( {} );
		}
	}
	
	
//=============================================================================
// * 全局管理器
//=============================================================================
//==============================
// * 管理器 - 定义
//==============================
var $gameStrings    = null;
//==============================
// * 管理器 - 初始化
//==============================
var _drill_COSt_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_drill_COSt_createGameObjects.call( this );
	$gameStrings    = new Game_Strings();
};
//==============================
// * 管理器 - 保存数据
//==============================
var _drill_COSt_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	var contents = _drill_COSt_makeSaveContents.call( this );
	contents.strings    = $gameStrings;
	return contents;
};
//==============================
// * 管理器 - 读取数据
//==============================
var _drill_COSt_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COSt_extractSaveContents.call( this,contents );
	if( contents.strings != undefined ){
		$gameStrings        = contents.strings;
	}
};
//==============================
// * 管理器 - 转义嵌套处理
//==============================
DataManager.drill_COSt_replaceChar = function( text ){
	var re = /\\[sS][tT][rR]\[(\d+)\]/;
	
	// > 引用嵌套
	var str_index = 0;
	var j = 0;
	for(j = 0; j < 100; j++ ){
		var arr = re.exec(text);
		if( arr ){
			str_index = Number(arr[1]);
			text = text.replace( re, $gameStrings.value( str_index ) );
		}else{
			break;
		}
	}
	
	// > 校验
	if( j >= 99 ){
		alert(
			"【Drill_CoreOfString.js 系统 - 字符串核心】\n"+
			"错误，id为"+String(str_index)+"的字符串在自我嵌套字符时出现死循环。"
		);
	}
	return text;
};
	

//=============================================================================
// ** 字符串【Game_Strings】
//			
//			实例：	$gameStrings
//			索引：	无
//			来源：	无（独立数据）
//			应用：	> 事件指令
//			功能：	> 提供基本的字符串数据存储功能。
//					> 字符串转义
//=============================================================================
//==============================
// * 变量 - 定义
//==============================
function Game_Strings() {
    this.initialize.apply(this, arguments);
}
//==============================
// * 变量 - 初始化
//==============================
Game_Strings.prototype.initialize = function() {
    this.clear();
    this.drill_COSt_init();
};
//==============================
// * 变量 - 清理全部
//==============================
Game_Strings.prototype.clear = function(){ this._data = []; };
//==============================
// * 变量 - 数据初始化
//==============================
Game_Strings.prototype.drill_COSt_init = function(){
	var temp_tank = [""];		//（第0个为空字符串）
	for( var i = 0; i < DrillUp.g_COSt_list.length; i++ ){
		var temp_str = DrillUp.g_COSt_list[i]['context'];
		temp_tank.push(temp_str);
	}
	this._data = temp_tank; 
};

//==============================
// * 变量 - 获取值
//==============================
Game_Strings.prototype.value = function( stringId ){
    return this._data[stringId] || "";
};
//==============================
// * 变量 - 设置值
//==============================
Game_Strings.prototype.setValue = function( stringId, value ){
    if( stringId > 0 ){
        this._data[stringId] = String(value);
    }
};
//==============================
// * 变量 - 获取转义的值
//==============================
Game_Strings.prototype.convertedValue = function( stringId ){
	var value = this._data[stringId];
	if(!value ){ return ""; }
	value = DataManager.drill_COSt_replaceChar( value );
    return value;
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_COSt_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COSt_pluginCommand.call(this, command, args);
	
	if( command === ">字符串核心" ){		//>字符串核心 : 字符串[1] : 修改字符串 : 某\c[2]字符串
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "修改字符串" ){	
				temp1 = temp1.replace("字符串[","");
				temp1 = temp1.replace("]","");
				$gameStrings.setValue( Number(temp1), temp2 );
			}
			if( type == "使用弹出框修改" ){	
				temp1 = temp1.replace("字符串[","");
				temp1 = temp1.replace("]","");
				var ss = prompt( temp2, $gameStrings.value(temp1) );
				if( ss != undefined ){
					$gameStrings.setValue( Number(temp1), ss );
				}
			}
		}
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "还原字符串" ){	
				temp1 = temp1.replace("字符串[","");
				temp1 = temp1.replace("]","");
				$gameStrings.setValue( Number(temp1), DrillUp.g_COSt_list[ Number(temp1)-1 ]['context'] );
			}
		}
	}
};
	
//=============================================================================
// ** 文本转义
//=============================================================================
//==============================
// ** 文本转义 - 指代字符 转换
//==============================
var _drill_COSt_convertExtraEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	
	// > 指代字符（含变量的）
    text = text.replace(/[\\]?\\STR\[\\V\[(\d+)\]\]/gi, function() {
		alert( arguments[1] );
        return $gameStrings.convertedValue( $gameVariables.value(parseInt(arguments[1])) );
    }.bind(this));
	
	// > 指代字符（提前转换）
    text = text.replace(/[\\]?\\STR\[(\d+)\]/gi, function() {
        return $gameStrings.convertedValue( parseInt(arguments[1]) );
    }.bind(this));
	
	var text = _drill_COSt_convertExtraEscapeCharacters.call( this, text );
	return text;
}


