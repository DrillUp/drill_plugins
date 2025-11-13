//=============================================================================
// Drill_DialogTextBigImage.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        窗口字符 - 大图片字符
 * @author Drill_up
 * 
 * @Drill_LE_param "字符图-%d"
 * @Drill_LE_parentKey "---字符图组%d至%d---"
 * @Drill_LE_var "DrillUp.g_DTBI_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogTextBigImage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将任意大小的资源图片当成一个字符，绘制在窗口中。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     需要该核心才能将图片绘制在文本域中。
 * 可被扩展：
 *   - Drill_AssetsOfCurrency        管理器-货币素材库
 *     通过该插件，能绘制出货币的资源图片。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__textBigImg （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__main文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 字符图-1
 * 字符图-2
 * 字符图-3
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只对话框有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.大图片可以当成背景来用，
 *      但是要注意窗口、贴图的文本域大小，超出边缘的部分会被切割。
 * 预加载：
 *   (1.插件中的资源会被反复使用，所以插件默认所有资源都预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.该插件可以和 字符串核心 结合使用。
 *      因为字符串核心可以通过插件指令或者玩家手动编辑修改。
 *      所以二者功能结合后，可以通过修改 大图片字符，实现窗口说明中
 *      显示/切换不同图片的效果。
 *   (2.字符图还能设置"占用高宽"，能与窗口字符挤在一起。
 *      实现文本中穿插自定义图片的功能，与qq聊天功能类似。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来绘制大图片：
 * 
 * 窗口字符：\dimg[1]
 * 
 * 1."\dimg[1]"字符会把该插件配置的编号为1的资源图绘制出来，默认不占高宽。 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 高宽设置
 * 你需要使用下面的窗口字符来绘制大图片：
 * 
 * 窗口字符：\dimg[1:不占高宽]
 * 窗口字符：\dimg[1:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[1:占用高宽]
 * 
 * 1."\dimg[1:不占高宽:位置[10,-10]]"字符会把该插件配置的编号为1的资源图
 *   绘制到当前光标偏移 x 10像素 y -10像素 的位置。
 *   注意，不占高宽的情况下才能偏移。
 * 2.如果出现了多个"\dimg[]"，则后绘制的图片，能够遮挡先绘制的文字或图片。
 *   但不包括 字符块 。详细可以去看看 窗口字符管理层示例 阅后即焚 的效果。
 * 3.大图片字符也可以设置"占用高宽"，这样文本和图片就全挤在一起了。
 *   （dimg全称为：Drill_Image，即图片字符）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 货币素材库
 * 你可以使用素材库中的资源图片来绘制：
 * 
 * 窗口字符：\dimg[货币素材:小图:不占高宽]
 * 窗口字符：\dimg[货币素材:小图:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:小图:占用高宽]
 * 
 * 窗口字符：\dimg[货币素材:中型图:不占高宽]
 * 窗口字符：\dimg[货币素材:中型图:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:中型图:占用高宽]
 * 
 * 窗口字符：\dimg[货币素材:高清图:不占高宽]
 * 窗口字符：\dimg[货币素材:高清图:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:高清图:占用高宽]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>大图片字符 : DEBUG字符图测试 : 开启
 * 插件指令：>大图片字符 : DEBUG字符图测试 : 关闭
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
 * 测试方法：   窗口字符管理层以及在战斗界面和菜单界面进行测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行控制字符的图像绘制，绘制完毕后就结束了操作。
 *   所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了注释说明。
 * [v1.2]
 * 修改了插件的分类。
 * [v1.3]
 * 修复了部分情况下无法显示图片的问题。
 * [v1.4]
 * 更新并兼容了新的窗口字符底层。
 * 
 * 
 * 
 * @param ---字符图组 1至20---
 * @default 
 * 
 * @param 字符图-1
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-2
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-3
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-4
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-5
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-6
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-7
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-8
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-9
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-10
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-11
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-12
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-13
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-14
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-15
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-16
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-17
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-18
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-19
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-20
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组21至40---
 * @default 
 * 
 * @param 字符图-21
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-22
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-23
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-24
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-25
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-26
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-27
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-28
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-29
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-30
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-31
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-32
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-33
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-34
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-35
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-36
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-37
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-38
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-39
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-40
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组41至60---
 * @default 
 * 
 * @param 字符图-41
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-42
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-43
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-44
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-45
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-46
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-47
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-48
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-49
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-50
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-51
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-52
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-53
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-54
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-55
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-56
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-57
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-58
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-59
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-60
 * @parent ---字符图组41至60---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组61至80---
 * @default 
 * 
 * @param 字符图-61
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-62
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-63
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-64
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-65
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-66
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-67
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-68
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-69
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-70
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-71
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-72
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-73
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-74
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-75
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-76
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-77
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-78
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-79
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-80
 * @parent ---字符图组61至80---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组81至100---
 * @default 
 * 
 * @param 字符图-81
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-82
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-83
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-84
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-85
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-86
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-87
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-88
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-89
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-90
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-91
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-92
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-93
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-94
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-95
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-96
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-97
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-98
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-99
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-100
 * @parent ---字符图组81至100---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组101至120---
 * @default 
 * 
 * @param 字符图-101
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-102
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-103
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-104
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-105
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-106
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-107
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-108
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-109
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-110
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-111
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-112
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-113
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-114
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-115
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-116
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-117
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-118
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-119
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-120
 * @parent ---字符图组101至120---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组121至140---
 * @default 
 * 
 * @param 字符图-121
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-122
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-123
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-124
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-125
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-126
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-127
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-128
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-129
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-130
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-131
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-132
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-133
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-134
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-135
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-136
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-137
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-138
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-139
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-140
 * @parent ---字符图组121至140---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组141至160---
 * @default 
 * 
 * @param 字符图-141
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-142
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-143
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-144
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-145
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-146
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-147
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-148
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-149
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-150
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-151
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-152
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-153
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-154
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-155
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-156
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-157
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-158
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-159
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-160
 * @parent ---字符图组141至160---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组161至180---
 * @default 
 * 
 * @param 字符图-161
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-162
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-163
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-164
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-165
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-166
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-167
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-168
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-169
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-170
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-171
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-172
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-173
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-174
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-175
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-176
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-177
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-178
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-179
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-180
 * @parent ---字符图组161至180---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param ---字符图组181至200---
 * @default 
 * 
 * @param 字符图-181
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-182
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-183
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-184
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-185
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-186
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-187
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-188
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-189
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-190
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-191
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-192
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-193
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-194
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-195
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-196
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-197
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-198
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-199
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 * @param 字符图-200
 * @parent ---字符图组181至200---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DTBI（Dialog_Text_Big_Image）
//		临时全局变量	无
//		临时局部变量	this._drill_DTBI_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	1.20ms（所有插件最小值）
//		★最坏情况		暂无
//		★备注			在反复测试刷选项窗口时，帧数会降低到22帧，但是只是添加了渲染render的负担，过一下就好了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			
//			->☆窗口字符应用之效果字符
//				> \dimg[]
//			->☆字符图
//				->继承 再处理阶段
//				->获取文本宽度（半覆写）
//				->获取文本高度（半覆写）
//				->绘制基础字符（半覆写）
//					->绘制大图片
//			->☆DEBUG字符图测试
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
	DrillUp.g_DTBI_PluginTip_curName = "Drill_DialogTextBigImage.js 窗口字符-大图片字符";
	DrillUp.g_DTBI_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 系统-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DTBI_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DTBI_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DTBI_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DTBI_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DTBI_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_DTBI_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_DTBI_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_DTBI_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_DTBI_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogTextBigImage = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogTextBigImage');
	
	/*------------------字符图-------------------*/
	DrillUp.g_DTBI_list_length = 200;
	DrillUp.g_DTBI_list = [];
	for( var i = 0; i < DrillUp.g_DTBI_list_length; i++ ){
		DrillUp.g_DTBI_list[i] = String(DrillUp.parameters['字符图-' + String(i+1) ] || "");
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
//==============================
// * >>>>基于插件检测>>>> - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_DTBI_getPluginTip_NeedUpdate_drawText() );
}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DTBI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DTBI_pluginCommand.call(this, command, args);
	this.drill_DTBI_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DTBI_pluginCommand = function( command, args ){
	if( command === ">大图片字符" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG字符图测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DTBI_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DTBI_DebugEnabled = false;
				}
			}
		}
	}
};
	
	
//=============================================================================
// ** ☆预加载
//
//			说明：	> 用过的bitmap，全部标记不删除，防止刷菜单时重建导致浪费资源。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
DrillUp.g_DTBI_preloadEnabled = true;		//（预加载开关）
if( DrillUp.g_DTBI_preloadEnabled == true ){
	//==============================
	// * 预加载 - 初始化
	//==============================
	var _drill_DTBI_preload_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_drill_DTBI_preload_initialize.call(this);
		this.drill_DTBI_preloadInit();
	}
	//==============================
	// * 预加载 - 版本校验
	//==============================
	if( Utils.generateRuntimeId == undefined ){
		alert( DrillUp.drill_DTBI_getPluginTip_LowVersion() );
	}
	//==============================
	// * 预加载 - 执行资源预加载
	//
	//			说明：	> 遍历全部资源，提前预加载标记过的资源。
	//==============================
	Game_Temp.prototype.drill_DTBI_preloadInit = function() {
		this._drill_DTBI_cacheId = Utils.generateRuntimeId();	//资源缓存id
		this._drill_DTBI_preloadTank = [];						//bitmap容器
		for( var i = 0; i < DrillUp.g_DTBI_list.length; i++ ){
			var temp_data = DrillUp.g_DTBI_list[i];
			if( temp_data == undefined ){ continue; }
			
			this._drill_DTBI_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Menu__textBigImg/", temp_data, 0, true, this._drill_DTBI_cacheId ) 
			);
		}
	}
}


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置
//==============================
var _drill_DTBI_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_DTBI_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dimg" ){
		
		// > 『窗口字符定义』 - 大图片字符（\dimg[1]）
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@dbi[drawOrg:" + String(args[0]) + ":0:0]" );
			return;
		}
		
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			
			// > 『窗口字符定义』 - 大图片字符（\dimg[1:不占高宽]）
			if( temp2 == "不占高宽" ){
				this.drill_COWC_effect_submitCombined( "@@@dbi[drawOrg:" + temp1 + ":0:0]" );
				return;
			}
			
			// > 『窗口字符定义』 - 大图片字符（\dimg[1:占用高宽]）
			if( temp2 == "占用高宽" ){
				var imgIndex = Number(temp1) -1;
				var src_bitmap = $gameTemp._drill_DTBI_preloadTank[ imgIndex ];	//（『预加载直接赋值』直接从 预加载容器 中取出高宽值）
				this.drill_COWC_effect_submitCombined( "@@@dbi[drawOrg:" +temp1+ ":"+String(src_bitmap.width)+ ":"+String(src_bitmap.height)+ "]" );
				return;
			}
			
			// > 『窗口字符定义』 - 大图片字符（兼容旧字符）（\dimg[1:位置[10,-10]]）
			if( temp2.indexOf("位置[") != -1 ){
				temp2 = temp2.replace("位置[","");
				temp2 = temp2.replace("]","");
				var pos = temp2.split(/[,，]/);
				if( pos.length >= 2 ){
					this.drill_COWC_effect_submitCombined( "@@@dbi[drawOrg:" +temp1+ ":0:0:"+String(pos[0])+ ":"+String(pos[1])+ "]" );
					return;
				}
			}
		}
		
		if( args.length == 3 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			temp3 = temp3.replace("位置[","");
			temp3 = temp3.replace("]","");
			
			// > 『窗口字符定义』 - 大图片字符（\dimg[1:不占高宽:位置[10,-10]]）
			var pos = temp3.split(/[,，]/);
			if( pos.length >= 2 ){
				this.drill_COWC_effect_submitCombined( "@@@dbi[drawOrg:" +temp1+ ":0:0:"+String(pos[0])+ ":"+String(pos[1])+ "]" );
				return;
			}
		}
	}
	
	// > 【管理器 - 货币素材库】
	if( Imported.Drill_AssetsOfCurrency ){
		if( command == "dimg" && args.length >= 3 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			if( temp1 == "货币素材" ){
			
				if( args.length == 3 ){
						
					// > 『窗口字符定义』 - 大图片字符（\dimg[货币素材:小图:不占高宽]）
					if( temp3 == "不占高宽" ){
						if( temp2 == "小图" ){
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:1:0:0]" );
						}
						if( temp2 == "中型图" ){
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:2:0:0]" );
						}
						if( temp2 == "高清图" ){
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:3:0:0]" );
						}
						return;
					}
					
					// > 『窗口字符定义』 - 大图片字符（\dimg[货币素材:小图:占用高宽]）
					if( temp3 == "占用高宽" ){
						if( temp2 == "小图" ){
							var src_bitmap = $gameTemp.drill_AsOC_getDataSrcImg_Small();	//（『预加载直接赋值』直接从 预加载容器 中取出高宽值）
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:1:" +String(src_bitmap.width)+":"+String(src_bitmap.height)+ "]" );
						}
						if( temp2 == "中型图" ){
							var src_bitmap = $gameTemp.drill_AsOC_getDataSrcImg_Middle();	//（『预加载直接赋值』直接从 预加载容器 中取出高宽值）
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:2:" +String(src_bitmap.width)+":"+String(src_bitmap.height)+ "]" );
						}
						if( temp2 == "高清图" ){
							var src_bitmap = $gameTemp.drill_AsOC_getDataSrcImg_Big();		//（『预加载直接赋值』直接从 预加载容器 中取出高宽值）
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:3:" +String(src_bitmap.width)+":"+String(src_bitmap.height)+ "]" );
						}
						return;
					}
				}
				
				if( args.length == 4 ){
					var temp4 = String(args[3]);
					temp4 = temp4.replace("位置[","");
					temp4 = temp4.replace("]","");
					
					// > 『窗口字符定义』 - 大图片字符（\dimg[货币素材:小图:不占高宽:位置[10,-10]]）
					var pos = temp4.split(/[,，]/);
					if( pos.length >= 2 ){
						if( temp2 == "小图" ){
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:1:0:0"+String(pos[0])+ ":"+String(pos[1])+ "]" );
						}
						if( temp2 == "中型图" ){
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:2:0:0"+String(pos[0])+ ":"+String(pos[1])+ "]" );
						}
						if( temp2 == "高清图" ){
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:AsOC_currency:3:0:0"+String(pos[0])+ ":"+String(pos[1])+ "]" );
						}
						return;
					}
				}
			}
		}
	}
};


//=============================================================================
// ** ☆字符图
//			
//			说明：	> 此模块对 效果字符 进行转义，并绘制大图片。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 字符图 - 再处理阶段-配置阶段（继承）
//==============================
var _drill_DTBI_COCD_textBlock_processSecond = Game_Temp.prototype.drill_COCD_textBlock_processSecond;
Game_Temp.prototype.drill_COCD_textBlock_processSecond = function( command, args, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_DTBI_COCD_textBlock_processSecond.call( this, command, args, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dbi" ){
		if( args.length >= 4 ){
			var drawType = String(args[0]);
			if( drawType == "drawOrg" ){
				
				// > 『底层字符定义』 - 字符图（@@@dbi[drawOrg:1:0:0]） drill_big_image
				if( args.length == 4 ){
					cur_baseParam['DTBI_imgType'] = "org";
					cur_baseParam['DTBI_imgIndex'] = Number(args[1]) -1;	//（基础字符配置）
					cur_baseParam['DTBI_imgWidth'] = Number(args[2]);
					cur_baseParam['DTBI_imgHeight'] = Number(args[3]);
					cur_baseParam['DTBI_imgPosX'] = 0;
					cur_baseParam['DTBI_imgPosY'] = 0;
					this.drill_COCD_textBlock_submitSecond( "@" );			//（必须提交一个字符）
					return;
				}
				
				// > 『底层字符定义』 - 字符图（@@@dbi[drawOrg:1:0:0:4:4]） drill_big_image
				if( args.length == 6 ){
					cur_baseParam['DTBI_imgType'] = "org";
					cur_baseParam['DTBI_imgIndex'] = Number(args[1]) -1;	//（基础字符配置）
					cur_baseParam['DTBI_imgWidth'] = Number(args[2]);
					cur_baseParam['DTBI_imgHeight'] = Number(args[3]);
					cur_baseParam['DTBI_imgPosX'] = Number(args[4]);
					cur_baseParam['DTBI_imgPosY'] = Number(args[5]);
					this.drill_COCD_textBlock_submitSecond( "@" );			//（必须提交一个字符）
					return;
				}
			}
		}
		if( args.length >= 5 ){
			var drawType = String(args[0]);
			var imgType = String(args[1]);
			if( drawType == "drawAsset" ){
				
				// > 『底层字符定义』 - 字符图（@@@dbi[drawAsset:imgType:1:0:0]） drill_big_image
				if( args.length == 5 ){
					cur_baseParam['DTBI_imgType'] = imgType;
					cur_baseParam['DTBI_imgIndex'] = Number(args[2]);	//（基础字符配置）
					cur_baseParam['DTBI_imgWidth'] = Number(args[3]);
					cur_baseParam['DTBI_imgHeight'] = Number(args[4]);
					cur_baseParam['DTBI_imgPosX'] = 0;
					cur_baseParam['DTBI_imgPosY'] = 0;
					this.drill_COCD_textBlock_submitSecond( "@" );			//（必须提交一个字符）
					return;
				}
				
				// > 『底层字符定义』 - 字符图（@@@dbi[drawAsset:imgType:1:0:0:4:4]） drill_big_image
				if( args.length == 7 ){
					cur_baseParam['DTBI_imgType'] = imgType;
					cur_baseParam['DTBI_imgIndex'] = Number(args[2]);	//（基础字符配置）
					cur_baseParam['DTBI_imgWidth'] = Number(args[3]);
					cur_baseParam['DTBI_imgHeight'] = Number(args[4]);
					cur_baseParam['DTBI_imgPosX'] = Number(args[5]);
					cur_baseParam['DTBI_imgPosY'] = Number(args[6]);
					this.drill_COCD_textBlock_submitSecond( "@" );			//（必须提交一个字符）
					return;
				}
			}
		}
	}
}
//==============================
// * 字符图 - 基础字符 - 默认值（继承）
//==============================
var _drill_DTBI_COCD_drawBaseText_initParam = Game_Temp.prototype.drill_COCD_drawBaseText_initParam;
Game_Temp.prototype.drill_COCD_drawBaseText_initParam = function( baseParam ){
	_drill_DTBI_COCD_drawBaseText_initParam.call( this, baseParam );
	if( baseParam['DTBI_imgType'] == undefined ){ baseParam['DTBI_imgType'] = "" };			//绘制的字符图类型
	if( baseParam['DTBI_imgIndex'] == undefined ){ baseParam['DTBI_imgIndex'] = -1 };		//绘制的字符图索引
}
//==============================
// * 字符图 - 基础字符 - 获取文本宽度（半覆写）
//==============================
var _drill_DTBI_COCD_measureBaseTextWidth_Private = Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private = function( painter, text, baseParam ){
	
	// > 字符图时（直接返回零）
	if( baseParam['DTBI_imgIndex'] >= 0 ){
		return baseParam['DTBI_imgWidth'];
		
	// > 原函数
	}else{
		return _drill_DTBI_COCD_measureBaseTextWidth_Private.call( this, painter, text, baseParam );
	}
}
//==============================
// * 字符图 - 基础字符 - 获取文本高度（半覆写）
//==============================
var _drill_DTBI_COCD_measureBaseTextHeight_Private = Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private = function( painter, text, baseParam ){
	
	// > 字符图时（直接返回零）
	if( baseParam['DTBI_imgIndex'] >= 0 ){
		return baseParam['DTBI_imgHeight'];
		
	// > 原函数
	}else{
		return _drill_DTBI_COCD_measureBaseTextHeight_Private.call( this, painter, text, baseParam );
	}
}
//==============================
// * 字符图 - 基础字符 - 绘制基础字符（半覆写）
//==============================
var _drill_DTBI_COCD_drawBaseText_Private = Bitmap.prototype.drill_COCD_drawBaseText_Private;
Bitmap.prototype.drill_COCD_drawBaseText_Private = function( text, x, y, baseParam ){
	
	// > 字符图时
	if( baseParam['DTBI_imgIndex'] >= 0 ){
		
		// > 字符图时 - 『绘制过程定义』 - 字符图（@@@dbi[]）
		this.drill_DTBI_drawImg(
			baseParam['DTBI_imgType'],
			baseParam['DTBI_imgIndex'],
			x + baseParam['DTBI_imgPosX'],
			y + baseParam['DTBI_imgPosY'],
			baseParam
		);
		
	// > 原函数
	}else{
		_drill_DTBI_COCD_drawBaseText_Private.call( this, text, x, y, baseParam );
	}
}
//==============================
// * 字符图 - 绘制大图片
//==============================
Bitmap.prototype.drill_DTBI_drawImg = function( imgType, imgIndex, x, y, baseParam ){
    
	// > 资源加载
	var src_bitmap = null;
	if( imgType == "" || imgType == "org" ){
		src_bitmap = $gameTemp._drill_DTBI_preloadTank[ imgIndex ];	//（『预加载直接赋值』直接从 预加载容器 中取出并绘制）
	}
	// > 资源加载 - 【管理器 - 货币素材库】
	if( Imported.Drill_AssetsOfCurrency ){
		if( imgType == "AsOC_currency" ){
			if( imgIndex == 1 ){
				src_bitmap = $gameTemp.drill_AsOC_getDataSrcImg_Small();
			}
			if( imgIndex == 2 ){
				src_bitmap = $gameTemp.drill_AsOC_getDataSrcImg_Middle();
			}
			if( imgIndex == 3 ){
				src_bitmap = $gameTemp.drill_AsOC_getDataSrcImg_Big();
			}
		}
	}
	if( src_bitmap == null ){ return; }
	
	
	// > 执行绘制
	var pw = src_bitmap.width;
	var ph = src_bitmap.height;
	var sx = 0;
	var sy = 0;
	
	// > 执行绘制 - 占用时
	if( baseParam['DTBI_imgHeight'] > 0 ){
		y -= src_bitmap.height;
		
	// > 执行绘制 - 不占时
	}else{
		y -= baseParam['fontSize'] *DrillUp.g_COCD_textHeightPer;	//『手算高度』
	}
	
	// > 执行绘制
	this.blt(src_bitmap, sx, sy, pw, ph, x, y);
};


//=============================================================================
// ** ☆DEBUG字符图测试
//
//			说明：	> 此模块控制 DEBUG字符图测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG字符图测试 - 帧刷新（地图界面）
//==============================
var _drill_DTBI_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DTBI_debugMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DTBI_DebugEnabled == true ){
		$gameTemp._drill_DTBI_DebugEnabled = undefined;
		this.drill_DTBI_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_DTBI_DebugEnabled == false ){
		$gameTemp._drill_DTBI_DebugEnabled = undefined;
		if( this._drill_DTBI_DebugSprite != undefined ){
			this.removeChild(this._drill_DTBI_DebugSprite);
			this._drill_DTBI_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG字符图测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_DTBI_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DTBI_DebugSprite != undefined ){
		this.removeChild(this._drill_DTBI_DebugSprite);
		this._drill_DTBI_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( Graphics.boxWidth*0.75, Graphics.boxHeight*0.75 );
	var temp_sprite = new Sprite();
	temp_sprite.x = Graphics.boxWidth*0.5;
	temp_sprite.y = Graphics.boxHeight*0.5;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.bitmap.fillAll("rgba(0,0,0,0.5)");
	this.addChild( temp_sprite );	//（直接加在最顶层的上面）
	this._drill_DTBI_DebugSprite = temp_sprite;
	
	// > 绘制 - DEBUG显示画布范围
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 20;
	options['infoParam']['y'] = 20;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['baseParam'] = {};
	//options['baseParam']['drawDebugBaseRect'] = true;
	options['baseParam']['fontSize'] = 24;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_DTBI_PluginTip_curName + "】\n" + 
				"该插件能绘制大图片字符，图片可以作为底片，\n也可以与字符挤一起排列。\n" + 
				
				"》》大图片字符测试-不占高宽： \\fr\n" + 
				"    \\dimg[10]测试的字符（大图片可以作为背景用）\n    测试的字符\n    测试的字符\n\n\n" + 
				"》》大图片字符测试-占用高宽： \\fr\n" + 
				"    小爱丽丝\\dimg[5:占用高宽]量子妹 \\fr\n" + 
				"    小爱丽丝\\dimg[6:占用高宽]量子妹 \\fr\n" + 
				"    量子妹\\dimg[7:占用高宽]小爱丽丝 \\fr\n" + 
				"    小爱丽丝\\dimg[8:占用高宽]量子妹 \\fr\n" + 
				"    量子妹滑铲三连击\\dimg[6:占用高宽]\\dimg[6:占用高宽]\\dimg[6:占用高宽]抓住小爱丽丝 \\fr\n" ;
				
	temp_bitmap.drill_COWC_drawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	temp_sprite.drill_COWCSp_sprite_refreshAllSprite();
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogTextBigImage = false;
		var pluginTip = DrillUp.drill_DTBI_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


