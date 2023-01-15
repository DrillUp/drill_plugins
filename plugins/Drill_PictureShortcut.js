//=============================================================================
// Drill_PictureShortcut.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        图片 - 快捷操作
 * @author Drill_up
 * 
 * @Drill_LE_param "预加载资源-%d"
 * @Drill_LE_parentKey "---预加载资源组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PSh_pics_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureShortcut +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令控制各种图片的基本/高级操作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.你可以了解一下文档： "0.基本定义 > 贴图.docx"
 *   以及文档： "0.基本定义 > 显示与透明度.docx"
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 预加载资源：
 *   (1.图片资源并不是预加载的，如果图片过大，显示时会闪，这是因
 *      为图片需要时间加载，未加载完成时为空图片。
 *   (2.你可以将需要用的图片放入该插件，进入游戏后会进行预加载。
 *      在切换单属性时，资源不会出现闪的情况。
 *   (3.科普一下，游戏不会一次性将全部资源都预加载，因为那样会占用大量
 *      的内存，而且影响性能。大部分贴图都是按需载入，比如切换菜单、地
 *      图时，会弹出loading提示，那个时候，就是大量加载图片时的缓冲。
 * 单属性：
 *   (1."修改单属性"的操作都是并行的，你可能需要手动加等待时间。
 *   (2.你可以同时执行多条"修改单属性"的指令，并且重复指令可以叠加执行。
 *   (3.你还可以通过"获取属性"指令，来判断图片移动、放大到什么程度。
 *   (4.插件的功能容易受到其他图片插件的干扰。
 *      如果其他插件固定了某个单属性，则该插件的相关功能可能会失效。
 * 图片层级：
 *   (1.图片可以切换两个层级：图片层 和 最顶层。
 *      最顶层能够挡住 对话框和UI ，地图界面、战斗界面都有效。
 *   (2.新建的图片处于图片层，根据id大小进行排序，小的在后大的在前。
 *      切换到最顶层后，最顶层的图片之间的排序关系不变。
 * 中心锚点：
 *   (1.中心锚点会极大地影响 缩放、旋转 的变化方式。
 *      你可以通过插件指令"显示中心锚点"查看锚点的位置。
 *   (2.图片的中心锚点是可以修改的，默认有左上(0,0)和中心(0.5,0.5)
 *      的设置。中心锚点会影响部分动作效果。
 *   (3.修改中心锚点时，如果图片还未加载出来，直接执行修改指令即可，
 *      如果图片已加载出来了，建议设置"保持位置"。
 * 设计：
 *   (1.缩放可以变为负数，负数为图片的反转效果。
 *   (2.快捷操作中 弹性移动、增减速移动 的非常常用，用于galgame肖像的
 *      入场离场，比一般的匀速移动的效果要好。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 单属性操作
 * 你需要通过下面插件指令来执行图片快捷操作：
 * 
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片变量[21] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷操作 : 批量图片[4,5] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷操作 : 批量图片变量[21,22] : 修改单属性 : 透明度[255] : 时间[60]
 * 
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 预加载资源[1]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 预加载资源变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 混合模式[0]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 位置X[100] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 位置Y[100] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对位置X[+100] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对位置Y[+100] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对透明度[+25] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对旋转[+45] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对缩放X[-0.2] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对缩放Y[-0.2] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对斜切X[+0.5] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改单属性 : 相对斜切Y[+0.5] : 时间[60]
 * 
 * 1.前半部分（图片[1]）和 后半部分（修改单属性 : 位置X[100] : 时间[60]）
 *   的参数可以随意组合。一共有4*19种组合方式。
 * 2.你可以同时执行 多条 "修改单属性"的指令，并且重复指令可以叠加执行。
 *   设置"时间[0]"与设置"时间[1]"一样，在下一帧才能瞬间切换。
 * 3.所有"相对"参数都可以填正数 +10 ，也可以填负数 -10。
 *   表示根据当前属性，进行适当的增减变化。
 * 4."缩放"默认为 1.0， 表示 100% 缩放程度。
 *   "斜切"默认为 0.0。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取属性
 * 你需要通过插件指令来获取图片的属性值：
 * 
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>图片快捷操作 : 图片变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 缩放X : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 缩放Y : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 斜切X : 变量[21]
 * 插件指令：>图片快捷操作 : 图片[1] : 获取属性 : 斜切Y : 变量[21]
 * 
 * 1.前半部分（图片[1]）和 后半部分（获取属性 : 位置X : 变量[21]）
 *   的参数可以随意组合。一共有2*8种组合方式。
 * 2.由于变量只能存整数，所以获取属性时，会乘以100倍。
 *   比如缩放值为1.2时，变量获取到： 1.2 * 100 = 120。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 特殊操作
 * 你需要通过下面插件指令来执行图片快捷操作：
 * 
 * 插件指令：>图片快捷操作 : 图片[1] : 切换图片层级 : 图片层
 * 插件指令：>图片快捷操作 : 图片变量[21] : 切换图片层级 : 图片层
 * 插件指令：>图片快捷操作 : 批量图片[4,5] : 切换图片层级 : 图片层
 * 插件指令：>图片快捷操作 : 批量图片变量[21,22] : 切换图片层级 : 图片层
 * 
 * 插件指令：>图片快捷操作 : 图片[1] : 弹性移动到 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 弹性移动到 : 位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 弹性移动到 : 相对位置[-10,-10] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 弹性移动到 : 相对位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 增减速移动到 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 增减速移动到 : 位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 增减速移动到 : 相对位置[-10,-10] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 增减速移动到 : 相对位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷操作 : 图片[1] : 切换图片层级 : 图片层
 * 插件指令：>图片快捷操作 : 图片[1] : 切换图片层级 : 最顶层
 * 插件指令：>图片快捷操作 : 图片[1] : 显示中心锚点
 * 插件指令：>图片快捷操作 : 图片[1] : 隐藏中心锚点
 * 插件指令：>图片快捷操作 : 图片[1] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>图片快捷操作 : 图片[1] : 修改中心锚点 : 锚点[0.5,1.0] : 保持位置
 * 
 * 1.前半部分（图片[1]）和 后半部分（切换图片层级 : 图片层）的参数
 *   可以随意组合。一共有4*14种组合方式。
 * 2.图片可以切换两个层级：图片层 和 最顶层。
 *   最顶层能够挡住 对话框和UI ，地图界面、战斗界面都有效。
 * 3.修改中心锚点时，如果图片还未加载出来，直接执行修改指令即可，
 *   如果图片已加载出来了，建议设置"保持位置"。
 * 4."显示中心锚点"是用来帮助查看校对图片锚点用的测试指令，默认隐藏。
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
 * 工作类型：   持续执行
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   放置10个图片，在不同的地图中控制多个并测试。
 * 测试结果：   战斗界面中，平均消耗为：【6.77ms】
 *              200个事件的地图中，平均消耗为：【12.41ms】
 *              100个事件的地图中，平均消耗为：【10.15ms】
 *               50个事件的地图中，平均消耗为：【9.80ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在特定时间内控制图片的基本属性，未执行指令时，不影响
 *   图片任何内容。所以消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令图片检查。
 * [v1.2]
 * 添加了插件指令变量设置。
 * [v1.3]
 * 修复了弹性移动时差一点点偏移的bug，添加了 增减速移动到 的功能。
 * [v1.4]
 * 优化了部分内容的兼容性。
 * [v1.5]
 * 优化了数学缩短锚点的计算公式。
 * [v1.6]
 * 修复了预加载有时候失效的bug。
 * 
 * 
 * 
 * @param 最顶层时图片层级
 * @type number
 * @min 0
 * @desc 当图片处于最顶层时，图片和其它贴图先后排序的位置，0表示最后面。
 * @default 10
 * 
 * @param ---预加载资源组 1至20---
 * @default 
 *
 * @param 预加载资源-1
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-2
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-3
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-4
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-5
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-6
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-7
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-8
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-9
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-10
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-11
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-12
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-13
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-14
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-15
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-16
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-17
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-18
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-19
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-20
 * @parent ---预加载资源组 1至20---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组21至40---
 * @default 
 *
 * @param 预加载资源-21
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-22
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-23
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-24
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-25
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-26
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-27
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-28
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-29
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-30
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-31
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-32
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-33
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-34
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-35
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-36
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-37
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-38
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-39
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-40
 * @parent ---预加载资源组21至40---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组41至60---
 * @default 
 *
 * @param 预加载资源-41
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-42
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-43
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-44
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-45
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-46
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-47
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-48
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-49
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-50
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-51
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-52
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-53
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-54
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-55
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-56
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-57
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-58
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-59
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-60
 * @parent ---预加载资源组41至60---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组61至80---
 * @default 
 *
 * @param 预加载资源-61
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-62
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-63
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-64
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-65
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-66
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-67
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-68
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-69
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-70
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-71
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-72
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-73
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-74
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-75
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-76
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-77
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-78
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-79
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-80
 * @parent ---预加载资源组61至80---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组81至100---
 * @default 
 *
 * @param 预加载资源-81
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-82
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-83
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-84
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-85
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-86
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-87
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-88
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-89
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-90
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-91
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-92
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-93
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-94
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-95
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-96
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-97
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-98
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-99
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-100
 * @parent ---预加载资源组81至100---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 *
 * @param ---预加载资源组101至120---
 * @default 
 *
 * @param 预加载资源-101
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-102
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-103
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-104
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-105
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-106
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-107
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-108
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-109
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-110
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-111
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-112
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-113
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-114
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-115
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-116
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-117
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-118
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-119
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-120
 * @parent ---预加载资源组101至120---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组121至140---
 * @default 
 *
 * @param 预加载资源-121
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-122
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-123
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-124
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-125
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-126
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-127
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-128
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-129
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-130
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-131
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-132
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-133
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-134
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-135
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-136
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-137
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-138
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-139
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-140
 * @parent ---预加载资源组121至140---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组141至160---
 * @default 
 *
 * @param 预加载资源-141
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-142
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-143
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-144
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-145
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-146
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-147
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-148
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-149
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-150
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-151
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-152
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-153
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-154
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-155
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-156
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-157
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-158
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-159
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-160
 * @parent ---预加载资源组141至160---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组161至180---
 * @default 
 *
 * @param 预加载资源-161
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-162
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-163
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-164
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-165
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-166
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-167
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-168
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-169
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-170
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-171
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-172
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-173
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-174
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-175
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-176
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-177
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-178
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-179
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-180
 * @parent ---预加载资源组161至180---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ---预加载资源组181至200---
 * @default 
 *
 * @param 预加载资源-181
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-182
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-183
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-184
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-185
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-186
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-187
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-188
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-189
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-190
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-191
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-192
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-193
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-194
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-195
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-196
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-197
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-198
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-199
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 预加载资源-200
 * @parent ---预加载资源组181至200---
 * @desc 将图片放入预加载资源中，进入游戏后会提前加载，使用时不会出现闪烁情况。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PSh（Picture_Shortcut）
//		临时全局变量	DrillUp.g_PSh_xxx
//		临时局部变量	this._drill_PSh_xxx
//		存储数据变量	$gameSystem._drill_PSh_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	9.80ms 3.77ms
//		★最坏情况		暂无
//		★备注			由于是辅助图片操作，找到的消耗都非常小，图片贴图本体的消耗目前没找到。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			快捷操作：
//				->基本
//					->预加载资源
//					->修改单属性
//					->获取属性
//				->特殊
//					->切换图片层级
//					->弹性移动到
//					->增减速移动到
//					->修改中心锚点
//					->显示中心锚点
//
//		★必要注意事项：
//			1.Game_Picture的缩放和斜切，都是100倍的值。
//			  插件所有内容都是在【增量】上进行的，可能会受到其他图片插件干扰。
//			2.【getFixPointInAnchor含有正负号修正】。具体原因不明，可以确定只能在当前插件适应，
//			  因为插件是增量控制坐标的。其他插件都是固定帧初始值，所以修正反而出问题。
//
//		★其它说明细节：
//			1.图片的锚点不是固定的，可能会到处变，注意控制锚点。
//			2.写之前真没注意到居然有那么多内容。
//			  虽然叫快捷操作，但是真的写战斗对话指令的时候，好像也快不起来。
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureShortcut = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureShortcut');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PSh_top_zIndex = Number(DrillUp.parameters['最顶层时图片层级'] || 10);
	
	/*-----------------预加载资源------------------*/
	DrillUp.g_PSh_pics_length = 200;
	DrillUp.g_PSh_pics = [];
	for (var i = 0; i < DrillUp.g_PSh_pics_length; i++) {
		DrillUp.g_PSh_pics[i] = String(DrillUp.parameters['预加载资源-' + String(i+1) ] || "");
	}
	
	
//=============================================================================
// ** 资源预加载
//=============================================================================
//==============================
// * 资源预加载 - 初始化
//==============================
var _drill_PSh_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PSh_temp_initialize.call(this);
	this._drill_PSh_cacheId = Utils.generateRuntimeId();	//图片缓存id
    this._drill_PSh_preloadTank = [];						//图片贴图容器
	for( var i=0; i < DrillUp.g_PSh_pics.length; i++ ){
		var temp_bitmap = ImageManager.reservePicture( DrillUp.g_PSh_pics[i], 0, this._drill_PSh_cacheId );
		this._drill_PSh_preloadTank.push(temp_bitmap);
	}
}
//==============================
// * 图片贴图 - 切换资源
//==============================
var _drill_PSh_sp_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
    var picture = this.picture();
    if( picture && picture._drill_nameId != -1 ){
		this.bitmap = $gameTemp._drill_PSh_preloadTank[ picture._drill_nameId ];
	}else{
		_drill_PSh_sp_updateBitmap.call(this);
	}
}


//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PSh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_Drill_PSh_pluginCommand.call( this, command, args );
	if( command == ">图片快捷操作" ){ 
		
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PSh_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PSh_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PSh_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PSh_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		
		/*-----------------切换图片层级------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "切换图片层级" && (temp1 == "图片层" || temp1 == "最顶层" ) ){
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k]._Drill_PSh_layer = temp1;
					}
				}
			}
		}	
		
		/*-----------------修改中心锚点------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "显示中心锚点" ){
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k]._drill_showAnchor = true;
					}
				}
			}
			if( type == "隐藏中心锚点" ){
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k]._drill_showAnchor = false;
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改中心锚点" ){
				temp1 = temp1.replace("锚点[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( pics != null && temp_arr.length > 1 ){
					for( var k=0; k < pics.length; k++ ){
						pics[k]._origin = 100;
						pics[k]._anchorX = Number(temp_arr[0]);
						pics[k]._anchorY = Number(temp_arr[1]);
					}
				}
			}
		}	
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改中心锚点" && temp2 == "保持位置" ){
				temp1 = temp1.replace("锚点[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( pics != null && temp_arr.length > 1 ){
					for( var k=0; k < pics.length; k++ ){
						var tarX = Number(temp_arr[0]);
						var tarY = Number(temp_arr[1]);
						var point = $gameTemp.drill_PSh_getFixPointInAnchor(
										pics[k]._anchorX, pics[k]._anchorY,
										tarX, tarY,
										pics[k]._drill_width, pics[k]._drill_height,
										pics[k]._angle / 180 * Math.PI,
										pics[k]._scaleX*0.01 , pics[k]._scaleY*0.01 
									);
						pics[k]._origin = 100;
						pics[k]._x += point.x;
						pics[k]._y += point.y;
						pics[k]._x += pics[k]._drill_width  *(tarX - pics[k]._anchorX);	//（锚点的偏移）
						pics[k]._y += pics[k]._drill_height *(tarY - pics[k]._anchorY);
						pics[k]._anchorX = tarX;
						pics[k]._anchorY = tarY;
					}
				}
			}
		}	
		
		/*-----------------弹性移动到------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "弹性移动到" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("相对位置变量[") != -1  ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeElasticMove",
								"valueX":$gameVariables.value( Number(temp_arr[0]) ),
								"valueY":$gameVariables.value( Number(temp_arr[1]) ),
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对位置[") != -1  ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeElasticMove",
								"valueX":Number(temp_arr[0]),
								"valueY":Number(temp_arr[1]),
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置变量[") != -1  ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"elasticMove",
								"valueX":$gameVariables.value( Number(temp_arr[0]) ) - pics[k]._x,
								"valueY":$gameVariables.value( Number(temp_arr[1]) ) - pics[k]._y,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置[") != -1  ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"elasticMove",
								"valueX":Number(temp_arr[0]) - pics[k]._x,
								"valueY":Number(temp_arr[1]) - pics[k]._y,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
			}
			if( type == "增减速移动到" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("相对位置变量[") != -1  ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeSmoothMove",
								"valueX":$gameVariables.value( Number(temp_arr[0]) ),
								"valueY":$gameVariables.value( Number(temp_arr[1]) ),
								"time":Number(temp2),
								"cur_time":0,
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对位置[") != -1  ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeSmoothMove",
								"valueX":Number(temp_arr[0]),
								"valueY":Number(temp_arr[1]),
								"time":Number(temp2),
								"cur_time":0,
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置变量[") != -1  ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"smoothMove",
								"valueX":$gameVariables.value( Number(temp_arr[0]) ) - pics[k]._x,
								"valueY":$gameVariables.value( Number(temp_arr[1]) ) - pics[k]._y,
								"time":Number(temp2),
								"cur_time":0,
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置[") != -1  ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( pics != null && temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"smoothMove",
								"valueX":Number(temp_arr[0]) - pics[k]._x,
								"valueY":Number(temp_arr[1]) - pics[k]._y,
								"time":Number(temp2),
								"cur_time":0,
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
			}
		}	
		
		/*-----------------单属性操作------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改单属性" ){
				if( temp1.indexOf("混合模式[") != -1  ){
					temp1 = temp1.replace("混合模式[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"blendMode",
								"value":Number(temp1),
								"time":1,
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				if( temp1.indexOf("预加载资源[") != -1  ){
					temp1 = temp1.replace("预加载资源[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"preload",
								"value":Number(temp1) - 1,
								"time":1,
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				if( temp1.indexOf("预加载资源变量[") != -1  ){
					temp1 = temp1.replace("预加载资源变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"preload",
								"value":$gameVariables.value(Number(temp1)) - 1,
								"time":1,
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
			}
		}	
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改单属性" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("相对位置X[") != -1  ){
					temp1 = temp1.replace("相对位置X[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativePosX",
								"value":Number(temp1) ,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对位置Y[") != -1  ){
					temp1 = temp1.replace("相对位置Y[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativePosY",
								"value":Number(temp1) ,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置X[") != -1  ){
					temp1 = temp1.replace("位置X[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"posX",
								"value":Number(temp1) - pics[k]._x,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置Y[") != -1  ){
					temp1 = temp1.replace("位置Y[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"posY",
								"value":Number(temp1) - pics[k]._y,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对透明度[") != -1  ){
					temp1 = temp1.replace("相对透明度[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeOpacity",
								"value":Number(temp1),
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("透明度[") != -1  ){
					temp1 = temp1.replace("透明度[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"opacity",
								"value":Number(temp1) - pics[k]._opacity,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对旋转[") != -1  ){
					temp1 = temp1.replace("相对旋转[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeAngle",
								"value":Number(temp1),
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("旋转[") != -1  ){
					temp1 = temp1.replace("旋转[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"angle",
								"value":Number(temp1) - pics[k]._angle,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对缩放X[") != -1  ){
					temp1 = temp1.replace("相对缩放X[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeScaleX",
								"value":Number(temp1)*100,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("缩放X[") != -1  ){
					temp1 = temp1.replace("缩放X[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"scaleX",
								"value":Number(temp1)*100 - pics[k]._scaleX,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对缩放Y[") != -1  ){
					temp1 = temp1.replace("相对缩放Y[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeScaleY",
								"value":Number(temp1)*100,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("缩放Y[") != -1  ){
					temp1 = temp1.replace("缩放Y[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"scaleY",
								"value":Number(temp1)*100 - pics[k]._scaleY,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对斜切X[") != -1  ){
					temp1 = temp1.replace("相对斜切X[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeSkewX",
								"value":Number(temp1)*100,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("斜切X[") != -1  ){
					temp1 = temp1.replace("斜切X[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"skewX",
								"value":Number(temp1)*100 - pics[k]._skewX,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对斜切Y[") != -1  ){
					temp1 = temp1.replace("相对斜切Y[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"relativeSkewY",
								"value":Number(temp1)*100 ,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("斜切Y[") != -1  ){
					temp1 = temp1.replace("斜切Y[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":"skewY",
								"value":Number(temp1)*100 - pics[k]._skewY,
								"time":Number(temp2),
								"cur_time":0,
							}
							pics[k]._Drill_PSh_commandTank.push(data);
						}
					}
				}
			}
		}	
	
		/*-----------------获取属性------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "获取属性" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				if( temp1 == "位置X" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._x );
					}
				}
				if( temp1 == "位置Y" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._y );
					}
				}
				if( temp1 == "透明度" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._opacity );
					}
				}
				if( temp1 == "旋转" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._angle );
					}
				}
				if( temp1 == "缩放X" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._scaleX );
					}
				}
				if( temp1 == "缩放Y" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._scaleY );
					}
				}
				if( temp1 == "斜切X" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._skewX );
					}
				}
				if( temp1 == "斜切Y" ){
					if( pics != null ){
						$gameVariables.setValue( Number(temp2), pics[0]._skewY );
					}
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSh_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureShortcut.js 图片 - 快捷操作】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 图片基本操作
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _Drill_PSh_p_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_Drill_PSh_p_initialize.call(this);
	
	this._skewX = 0;							//斜切X
	this._skewY = 0;							//斜切Y
	
	this._Drill_PSh_layer = "图片层";			//所在层级
	this._Drill_PSh_commandTank = [];			//指令容器
}
//==============================
// * 图片 - 帧刷新
//==============================
var _Drill_PSh_p_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Drill_PSh_p_update.call(this);
	this.drill_PSh_updateCommandExecute();		//指令执行
	this.drill_PSh_updateCommandRemove();		//去除指令
}
//==============================
// * 帧刷新 - 指令执行
//==============================
Game_Picture.prototype.drill_PSh_updateCommandExecute = function() {
	for( var i=0; i < this._Drill_PSh_commandTank.length; i++ ){
		var command = this._Drill_PSh_commandTank[i];
		
		if( command["time"] <= 0 ){ command["time"] = 1; }
		
		// > 计时器
		command["cur_time"] += 1;
		if( command["cur_time"] >= command["time"]){ command["needDestroy"] = true; }
		
		// > 预加载资源
		if( command["type"] == "preload" ){
			this._drill_nameId = command["value"];
			command["needDestroy"] = true;
		}
		// > 混合模式
		if( command["type"] == "blendMode" ){
			this._blendMode = command["value"];
			command["needDestroy"] = true;
		}
		
		// > 相对位置X
		if( command["type"] == "relativePosX" ){
			this._x += command["value"]/command["time"];
		}
		// > 相对位置Y
		if( command["type"] == "relativePosY" ){
			this._y += command["value"]/command["time"];
		}
		// > 位置X
		if( command["type"] == "posX" ){
			this._x += command["value"]/command["time"];
		}
		// > 位置Y
		if( command["type"] == "posY" ){
			this._y += command["value"]/command["time"];
		}
		// > 相对透明度
		if( command["type"] == "relativeOpacity" ){
			this._opacity += command["value"]/command["time"];
		}
		// > 透明度
		if( command["type"] == "opacity" ){
			this._opacity += command["value"]/command["time"];
		}
		// > 相对旋转
		if( command["type"] == "relativeAngle" ){
			this._angle += command["value"]/command["time"];
		}
		// > 旋转
		if( command["type"] == "angle" ){
			this._angle += command["value"]/command["time"];
		}
		// > 相对缩放X
		if( command["type"] == "relativeScaleX" ){
			this._scaleX += command["value"]/command["time"];
		}
		// > 缩放X
		if( command["type"] == "scaleX" ){
			this._scaleX += command["value"]/command["time"];
		}
		// > 相对缩放Y
		if( command["type"] == "relativeScaleY" ){
			this._scaleY += command["value"]/command["time"];
		}
		// > 缩放Y
		if( command["type"] == "scaleY" ){
			this._scaleY += command["value"]/command["time"];
		}
		// > 相对斜切X
		if( command["type"] == "relativeSkewX" ){
			this._skewX += command["value"]/command["time"];
		}
		// > 斜切X
		if( command["type"] == "skewX" ){
			this._skewX += command["value"]/command["time"];
		}
		// > 相对斜切Y
		if( command["type"] == "relativeSkewY" ){
			this._skewY += command["value"]/command["time"];
		}
		// > 斜切Y
		if( command["type"] == "skewY" ){
			this._skewY += command["value"]/command["time"];
		}
		// > 弹性移动到
		if( command["type"] == "relativeElasticMove" || command["type"] == "elasticMove" ){
			var time = command["cur_time"];
			var time_last = command["cur_time"]-1;	//上一帧时间
			
			var xa = 2*command["valueX"] / command["time"] / command["time"];	//由于是增量，抛物线需要减去上一次的路径
			var diff_x1 = xa*command["time"]*time - xa * time * time /2;
			var diff_x2 = xa*command["time"]*time - xa * time_last * time_last /2;	
			this._x -= diff_x1 - diff_x2;
			
			var ya = 2*command["valueY"] / command["time"] / command["time"];
			var diff_y1 = ya*command["time"]*time - ya * time * time /2;
			var diff_y2 = ya*command["time"]*time - ya * time_last * time_last /2;
			this._y -= diff_y1 - diff_y2;
		}
		// > 增减速移动到
		if( command["type"] == "relativeSmoothMove" || command["type"] == "smoothMove" ){
			var time = command["cur_time"] -1;
			
			var xa = 4*command["valueX"] / command["time"] / command["time"];
			if( time < (command["time"]-1) * 0.5 ){ command["cur_speedX"] += xa; }
			if( time > (command["time"]-1) * 0.5 ){ command["cur_speedX"] -= xa; }
			this._x += command["cur_speedX"];
			
			var ya = 4*command["valueY"] / command["time"] / command["time"];
			if( time < (command["time"]-1) * 0.5 ){ command["cur_speedY"] += ya; }
			if( time > (command["time"]-1) * 0.5 ){ command["cur_speedY"] -= ya; }
			this._y += command["cur_speedY"];
		}
	}
}
//==============================
// * 帧刷新 - 去除指令
//==============================
Game_Picture.prototype.drill_PSh_updateCommandRemove = function() {
	for( var i = this._Drill_PSh_commandTank.length-1; i >= 0; i-- ){
		var command = this._Drill_PSh_commandTank[i];
		if( command["needDestroy"] == true ){
			this._Drill_PSh_commandTank.splice(i,1);
		}
	}
}
//==============================
// * 图片贴图 - 斜切控制
//==============================
var _Drill_PSh_sp_updateScale = Sprite_Picture.prototype.updateScale;
Sprite_Picture.prototype.updateScale = function() {
	_Drill_PSh_sp_updateScale.call(this);
    var picture = this.picture();
	if( this.skew == undefined ){ return; }
    this.skew.x = picture._skewX * 0.01;
    this.skew.y = picture._skewY * 0.01;
};


//=============================================================================
// ** 图片贴图初始化
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PSh_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    _drill_PSh_sp_initialize.call(this,pictureId);
    this.zIndex = DrillUp.g_PSh_top_zIndex;		//图片层级
	this._Drill_PSh_sp_layer = "图片层";		//地图/战斗层级
}
//==============================
// * 图片贴图容器 - 初始化
//==============================
var _drill_PSh_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PSh_temp_initialize2.call(this);
    this._drill_PSh_picSpriteTank = [];			//图片贴图容器
}
//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 地图 - 最顶层
//==============================
var _drill_PSh_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_PSh_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 地图 - 层级排序
//==============================
Scene_Map.prototype.drill_PSh_sortByZIndex = function() {
	this._spriteset._pictureContainer.children.sort(function(a, b){return a._pictureId-b._pictureId});		//图片排序
	this._drill_SenceTopArea.children.sort(function(a, b){
		if( a.zIndex == b.zIndex ){ return a._pictureId-b._pictureId };
		return a.zIndex-b.zIndex;
	});
};
//==============================
// * 地图 - 捕获图片贴图
//==============================
var _drill_PSh_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_PSh_layer_createPictures.call(this);
	this.drill_PSh_catchPictureSprite();
}
Spriteset_Map.prototype.drill_PSh_catchPictureSprite = function() {
	var sprite_list = this._pictureContainer.children;
	$gameTemp._drill_PSh_picSpriteTank = [];
	for( var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite instanceof Sprite_Picture ){		//mog_weather放了一个图层，不是Sprite_Picture
			$gameTemp._drill_PSh_picSpriteTank.push( temp_sprite );
		}
	}
}
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_PSh_layer_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_PSh_layer_update.call(this);	
	this.drill_PSh_updatePicLayer();
}
Scene_Map.prototype.drill_PSh_updatePicLayer = function() {
	var sprite_tank = $gameTemp._drill_PSh_picSpriteTank;
	for( var i=0; i < sprite_tank.length; i++ ){
		var temp_sprite = sprite_tank[i];
		if(!temp_sprite ){ continue; }
		var temp_picture = temp_sprite.picture();
		if(!temp_picture ){ continue; }
		
		// > 检查层级变化
		if( temp_sprite._Drill_PSh_sp_layer == temp_picture._Drill_PSh_layer ){ continue; }
		temp_sprite._Drill_PSh_sp_layer = temp_picture._Drill_PSh_layer;
			
		// > 转移层级
		if( temp_picture._Drill_PSh_layer == "图片层" ){
			this._spriteset._pictureContainer.addChild( temp_sprite );
		}
		if( temp_picture._Drill_PSh_layer == "最顶层" ){
			this._drill_SenceTopArea.addChild( temp_sprite );
		}
		this.drill_PSh_sortByZIndex();
	}
}
//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// ** 战斗 - 最顶层
//==============================
var _drill_PSh_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_PSh_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 战斗 - 层级排序
//==============================
Scene_Battle.prototype.drill_PSh_sortByZIndex = function() {
	this._spriteset._pictureContainer.children.sort(function(a, b){return a._pictureId-b._pictureId});		//图片排序
	this._drill_SenceTopArea.children.sort(function(a, b){
		if( a.zIndex == b.zIndex ){ return a._pictureId-b._pictureId };
		return a.zIndex-b.zIndex;
	});
};
//==============================
// * 地图 - 捕获图片贴图
//==============================
var _drill_PSh_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_PSh_battle_createPictures.call(this);
	this.drill_PSh_catchPictureSprite();
}
Spriteset_Battle.prototype.drill_PSh_catchPictureSprite = Spriteset_Map.prototype.drill_PSh_catchPictureSprite;
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_PSh_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_PSh_battle_update.call(this);	
	this.drill_PSh_updatePicLayer();
}
Scene_Battle.prototype.drill_PSh_updatePicLayer = Scene_Map.prototype.drill_PSh_updatePicLayer;



//=============================================================================
// ** 锚点控制
//=============================================================================
//==============================
// * 图片 - 锚点初始化
//==============================
var _Drill_PSh_p_initialize2 = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_Drill_PSh_p_initialize2.call(this);
	this._drill_nameId = -1;		//预加载设置
	this._last_origin = 0;			//上一个origin捕获
	this._anchorX = 0;				//锚点X
	this._anchorY = 0;				//锚点Y
	this._drill_width = 0;			//图片宽度
	this._drill_height = 0;			//图片高度
	this._drill_showAnchor = false;	//锚点图形
}
//==============================
// * 图片 - 控制 - 显示图片
//==============================
var _Drill_PSh_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
	
	// > 预加载设置
	this._drill_nameId = -1;
	
	// > origin切换时控制
	if( this._last_origin != origin ){
		this._last_origin = origin;
		if( origin == 0 ){
			this._anchorX = 0;		
			this._anchorY = 0;		
		}else if( origin == 1 ){
			this._anchorX = 0.5;	
			this._anchorY = 0.5;	
		}
	}
	
	// > origin设置100后，不会再进行修改
	if( this._origin == 100 ){
		_Drill_PSh_p_show.call(this, name, 100, x, y, scaleX, scaleY, opacity, blendMode);
	}else{
		_Drill_PSh_p_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	}
}
//==============================
// * 图片 - 控制 - 移动图片
//==============================
var _Drill_PSh_p_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
	
	// > origin切换时控制
	if( this._last_origin != origin ){
		this._last_origin = origin;
		if( origin == 0 ){
			this._anchorX = 0;		
			this._anchorY = 0;		
		}else if( origin == 1 ){
			this._anchorX = 0.5;	
			this._anchorY = 0.5;	
		}
	}
	
	// > origin设置100后，不会再进行修改
	if( this._origin == 100 ){
		_Drill_PSh_p_move.call(this, 100, x, y, scaleX, scaleY, opacity, blendMode, duration);
	}else{
		_Drill_PSh_p_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
	}
}
//==============================
// * 图片贴图 - 锚点显示
//==============================
Sprite_Picture.prototype.drill_PSh_createAnchorSprite = function(){
	
	// > 锚点图形初始化
	var temp_sprite = new Sprite();
	var temp_bitmap = new Bitmap(16,16);
	temp_bitmap.drawCircle(8,8,8,"#f00");
	temp_bitmap.drawCircle(8,8,6,"#ff0");
	temp_bitmap.drawCircle(8,8,4,"#fff");
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.x = -8;
	temp_sprite.y = -8;
	temp_sprite.anchor.x = 0;
	temp_sprite.anchor.y = 0;
	temp_sprite.visible = false;
	
	this._drill_PSh_anchorSprite = temp_sprite;
	this.addChild( temp_sprite );
}
//==============================
// * 图片贴图 - 锚点锁定
//==============================
var _Drill_PSh_sp_updateOrigin = Sprite_Picture.prototype.updateOrigin;
Sprite_Picture.prototype.updateOrigin = function() {
	var picture = this.picture();
    
	// > 高宽获取
	if( this.bitmap && this.bitmap.isReady() ){
		picture._drill_width = this.bitmap.width;
		picture._drill_height = this.bitmap.height;
	}
	
	// > 锚点图形创建监听
	if( picture._drill_showAnchor == true && 
		this._drill_PSh_anchorSprite == undefined ){
		this.drill_PSh_createAnchorSprite();
	}
	// > 锚点图形显示
	if( this._drill_PSh_anchorSprite != undefined ){
		this._drill_PSh_anchorSprite.visible = picture._drill_showAnchor;
	}
	
	// > 锚点锁定
    if( picture.origin() === 100 ){
        this.anchor.x = picture._anchorX;
        this.anchor.y = picture._anchorY;
    }else{
		_Drill_PSh_sp_updateOrigin.call(this);
    }
};

//=============================================================================
// * 数学 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	修正 旋转+缩放 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					旋转值和缩放值可为负数。
//=============================================================================
Game_Temp.prototype.drill_PSh_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图中心锚点 
					target_anchor_x,target_anchor_y, 	//新的中心锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y ) {		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	// > 先缩放
	var sww = ww*scale_x;
	var shh = hh*scale_y;
	
	// > 后旋转
	var r = Math.sqrt( Math.pow(sww,2) + Math.pow(shh,2) );
	var p_degree = Math.atan(shh/sww);	
	p_degree = Math.PI - p_degree;
	if( sww < 0 ){
		p_degree = Math.PI + p_degree;
	}
	
	// > 变换的偏移量
	xx += r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy += r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
	
	// > 锚点偏移量
	xx += ww;
	yy += hh;
	
	return { "x":xx, "y":yy };
}


