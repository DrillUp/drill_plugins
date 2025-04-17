//=============================================================================
// Drill_PictureShortcut.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        图片 - 快捷变换操作
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
 * 使得你可以通过插件指令控制各种图片的变换操作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfPicture            图片-图片优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.你可以了解一下基础文档： "0.基本定义 > 贴图.docx"
 *   以及基础文档： "0.基本定义 > 显示与透明度.docx"
 *   然后可以去看看 "16.图片 > 关于图片优化核心.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 *   (2.默认图片资源 不执行 预加载，如果图片过大，显示时会闪，
 *      这是因为图片需要时间加载，未加载完成时为空图片。
 *   (3.你可以将需要用的图片设置到该插件中，进入游戏后会进行预加载。
 *      在切换单属性时，资源就不会出现闪的情况了。
 *   (4.注意，游戏不会一次性将全部资源都预加载，因为那样会占用大量的
 *      内存，而且影响性能。大部分贴图都是按需载入，比如切换菜单、地
 *      图时，会弹出loading提示，那个时候，就是大量加载图片时的缓冲。
 * 单属性：
 *   (1."修改单属性"的操作都是并行的，你可能需要手动加等待时间。
 *   (2.你可以同时执行多条"修改单属性"的指令，并且重复指令可以叠加执行。
 *   (3.你还可以通过"获取属性"指令，来判断图片移动、放大到什么程度。
 *   (4.插件的功能容易受到其他图片插件的干扰。
 *      如果其他插件固定了某个单属性，则该插件的相关功能可能会失效。
 * 中心锚点：
 *   (1.图片的中心锚点是可以修改的，默认有左上(0,0)和中心(0.5,0.5)
 *      的设置。中心锚点会影响部分动作效果。
 *   (2.修改中心锚点时，如果图片还未加载出来，直接执行修改指令即可，
 *      如果图片已加载出来了，建议设置"保持位置"。
 *   (3.不要在 插件指令 执行任何变换时，同时执行 修改锚点+保持位置。
 * 设计：
 *   (1.缩放可以变为负数，负数为图片的反转效果。
 *   (2.快捷变换操作中 弹性移动、增减速移动 的非常常用，用于galgame肖像的
 *      入场离场，比一般的匀速移动的效果要好。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 单属性操作
 * 你需要通过下面插件指令来执行图片操作：
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片变量[21] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 批量图片[4,5] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 批量图片变量[21,22] : 修改单属性 : 透明度[255] : 时间[60]
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 预加载资源[1]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 预加载资源变量[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 混合模式[0]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 位置X[100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 位置Y[100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对位置X[+100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对位置Y[+100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对透明度[+25] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对旋转[+45] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对缩放X[-0.2] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对缩放Y[-0.2] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对斜切X[+0.5] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改单属性 : 相对斜切Y[+0.5] : 时间[60]
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
 * 你可以通过插件指令来获取图片的属性值：
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>图片快捷变换操作 : 图片变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 缩放X : 变量%[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 缩放Y : 变量%[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 斜切X : 变量%[21]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 获取属性 : 斜切Y : 变量%[21]
 * 
 * 1.前半部分（图片[1]）和 后半部分（获取属性 : 位置X : 变量[21]）
 *   的参数可以随意组合。一共有2*8种组合方式。
 * 2."变量%["表示该变量获取到属性时，会乘以100倍。因为变量只能存整数。
 *   比如缩放值为1.2时，则获取到： 1.2 * 100 = 120。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你需要通过下面插件指令来执行图片操作：
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片变量[21] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 批量图片[4,5] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 批量图片变量[21,22] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-匀速移动 : 相对位置[-10,-10] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-匀速移动 : 相对位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-弹性移动 : 相对位置[-10,-10] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-弹性移动 : 相对位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-增减速移动 : 相对位置[-10,-10] : 时间[60]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 移动到-增减速移动 : 相对位置变量[25,26] : 时间[60]
 * 
 * 1.前半部分（图片[1]）和 后半部分（移动到-弹性移动）的参数
 *   可以随意组合。一共有4*12种组合方式。
 * 2.旧版本的指令"匀速移动到"、"弹性移动到"、"增减速移动到"也可以用。
 *   意思与"移动到-匀速移动"、"移动到-弹性移动"、"移动到-增减速移动"一样。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>图片快捷变换操作 : 图片[1] : 匀速移动到 : 位置[100,100] : 时间[60]
 * 插件指令(旧)：>图片快捷变换操作 : 图片[1] : 弹性移动到 : 位置[100,100] : 时间[60]
 * 插件指令(旧)：>图片快捷变换操作 : 图片[1] : 增减速移动到 : 位置[100,100] : 时间[60]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改中心锚点
 * 你可以通过插件指令手动修改中心锚点：
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>图片快捷变换操作 : 图片变量[21] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>图片快捷变换操作 : 批量图片[4,5] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>图片快捷变换操作 : 批量图片变量[21,22] : 修改中心锚点 : 锚点[0.5,1.0]
 * 
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>图片快捷变换操作 : 图片[1] : 修改中心锚点(保持位置) : 锚点[0.5,1.0]
 * 
 * 1.前半部分（图片[1]）和 后半部分（修改中心锚点 : 锚点[0.5,1.0]）的参数
 *   可以随意组合。一共有4*2种组合方式。
 * 2.修改中心锚点时，如果图片还未加载出来，直接执行修改指令即可，
 *   如果图片已加载出来了，建议设置"保持位置"。
 * 3.注意，由于中心锚点会影响缩放、旋转效果，
 *   最好在图片创建后，修改一次中心锚点，就不要再动了。
 *   不要在 图片进行任何变换 的时候，同时执行 "修改中心锚点(保持位置)"。
 *   容易引起坐标计算错位。
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
 * 测试方法：   图片管理层放置10个图片，控制多个并测试。
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
 * [v1.7]
 * 将原先的功能分离出 层级与堆叠级，优化了插件结构。
 * 
 * 
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
//		★性能测试因素	图片管理层
//		★性能测试消耗	9.80ms 3.77ms
//		★最坏情况		暂无
//		★备注			由于是辅助图片操作，找到的消耗都非常小，图片贴图本体的消耗目前没找到。
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
//			->☆叠加变化容器
//				->基础特性
//					>  资源名
//					x> 可见
//					>  混合模式
//					x> 层级
//					x> 堆叠级
//				->变换特性『变换特性-单贴图』
//					> 锚点X
//					> 锚点Y
//					> 位置X
//					> 位置Y
//					> 缩放X
//					> 缩放Y
//					> 透明度
//					> 斜切X
//					> 斜切Y
//					> 旋转
//					> 转速
//			
//			->☆预加载
//			->☆预加载图片的属性
//			->☆预加载图片控制
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 图片资源切换脚本说明.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
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
	DrillUp.g_PSh_PluginTip_curName = "Drill_PictureShortcut.js 图片-快捷变换操作";
	DrillUp.g_PSh_PluginTip_baseList = [
		"Drill_CoreOfPicture.js 图片-图片优化核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PSh_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PSh_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PSh_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PSh_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PSh_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PSh_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PSh_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_PSh_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_PSh_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureShortcut = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureShortcut');
	
	
	/*-----------------预加载资源------------------*/
	DrillUp.g_PSh_pics_length = 200;
	DrillUp.g_PSh_pics = [];
	for (var i = 0; i < DrillUp.g_PSh_pics_length; i++) {
		DrillUp.g_PSh_pics[i] = String(DrillUp.parameters['预加载资源-' + String(i+1) ] || "");
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfPicture ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PSh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PSh_pluginCommand.call( this, command, args );
	this.drill_PSh_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PSh_pluginCommand = function( command, args ){
	if( command == ">图片快捷变换操作" || command == ">图片快捷操作" ){ 
		
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
		
		/*-----------------修改中心锚点------------------*/
		if( pics != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改中心锚点" ){
				temp1 = temp1.replace("锚点[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					for( var k=0; k < pics.length; k++ ){	//（直接用 图片优化核心 提供的函数）
						pics[k].drill_COPi_setAnchor( Number(temp_arr[0]), Number(temp_arr[1]) );
					}
				}
			}
			if( type == "修改中心锚点(保持位置)" ){
				temp1 = temp1.replace("锚点[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					for( var k=0; k < pics.length; k++ ){	//（直接用 图片优化核心 提供的函数）
						pics[k].drill_COPi_setAnchorWithKeepPosition( Number(temp_arr[0]), Number(temp_arr[1]) );
					}
				}
			}
		}
		
		/*-----------------移动到------------------*/
		if( pics != null && args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			
			var type_str = null;
			if( type == "移动到-匀速移动" || type == "匀速移动到" ){
				type_str = "uniformMove";
			}
			if( type == "移动到-弹性移动" || type == "弹性移动到" ){
				type_str = "elasticMove";
			}
			if( type == "移动到-增减速移动" || type == "增减速移动到" ){
				type_str = "smoothMove";
			}
			if( type_str != null ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("相对位置变量[") != -1  ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":type_str,
								"valueX":$gameVariables.value( Number(temp_arr[0]) ),
								"valueY":$gameVariables.value( Number(temp_arr[1]) ),
								"time":Number(temp2),
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._drill_PSh_commandChangeTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("相对位置[") != -1  ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":type_str,
								"valueX":Number(temp_arr[0]),
								"valueY":Number(temp_arr[1]),
								"time":Number(temp2),
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._drill_PSh_commandChangeTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置变量[") != -1  ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":type_str,
								"valueX":$gameVariables.value( Number(temp_arr[0]) ) - pics[k]._x,
								"valueY":$gameVariables.value( Number(temp_arr[1]) ) - pics[k]._y,
								"time":Number(temp2),
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._drill_PSh_commandChangeTank.push(data);
						}
					}
				}
				else if( temp1.indexOf("位置[") != -1  ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length > 1 ){
						for( var k=0; k < pics.length; k++ ){
							var data = {
								"type":type_str,
								"valueX":Number(temp_arr[0]) - pics[k]._x,
								"valueY":Number(temp_arr[1]) - pics[k]._y,
								"time":Number(temp2),
								"cur_speedX":0,
								"cur_speedY":0,
							}
							pics[k]._drill_PSh_commandChangeTank.push(data);
						}
					}
				}
			}
		}	
		
		/*-----------------单属性操作------------------*/
		if( pics != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改单属性" ){
				if( temp1.indexOf("混合模式[") != -1  ){
					temp1 = temp1.replace("混合模式[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"blendMode",
							"value":Number(temp1),
							"time":1,
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				if( temp1.indexOf("预加载资源[") != -1  ){
					temp1 = temp1.replace("预加载资源[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"preload",
							"value":Number(temp1) - 1,
							"time":1,
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				if( temp1.indexOf("预加载资源变量[") != -1  ){
					temp1 = temp1.replace("预加载资源变量[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"preload",
							"value":$gameVariables.value(Number(temp1)) - 1,
							"time":1,
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
			}
		}	
		if( pics != null && args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改单属性" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("相对位置X[") != -1  ){
					temp1 = temp1.replace("相对位置X[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativePosX",
							"value":Number(temp1) ,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对位置Y[") != -1  ){
					temp1 = temp1.replace("相对位置Y[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativePosY",
							"value":Number(temp1) ,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("位置X[") != -1  ){
					temp1 = temp1.replace("位置X[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"posX",
							"value":Number(temp1) - pics[k]._x,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("位置Y[") != -1  ){
					temp1 = temp1.replace("位置Y[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"posY",
							"value":Number(temp1) - pics[k]._y,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对透明度[") != -1  ){
					temp1 = temp1.replace("相对透明度[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativeOpacity",
							"value":Number(temp1),
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("透明度[") != -1  ){
					temp1 = temp1.replace("透明度[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"opacity",
							"value":Number(temp1) - pics[k]._opacity,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对旋转[") != -1  ){
					temp1 = temp1.replace("相对旋转[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativeAngle",
							"value":Number(temp1),
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("旋转[") != -1  ){
					temp1 = temp1.replace("旋转[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"angle",
							"value":Number(temp1) - pics[k]._angle,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对缩放X[") != -1  ){
					temp1 = temp1.replace("相对缩放X[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativeScaleX",
							"value":Number(temp1)*100,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("缩放X[") != -1  ){
					temp1 = temp1.replace("缩放X[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"scaleX",
							"value":Number(temp1)*100 - pics[k]._scaleX,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对缩放Y[") != -1  ){
					temp1 = temp1.replace("相对缩放Y[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativeScaleY",
							"value":Number(temp1)*100,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("缩放Y[") != -1  ){
					temp1 = temp1.replace("缩放Y[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"scaleY",
							"value":Number(temp1)*100 - pics[k]._scaleY,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对斜切X[") != -1  ){
					temp1 = temp1.replace("相对斜切X[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativeSkewX",
							"value":Number(temp1)*100,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("斜切X[") != -1  ){
					temp1 = temp1.replace("斜切X[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"skewX",
							"value":Number(temp1)*100 - pics[k]._drill_skewX,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("相对斜切Y[") != -1  ){
					temp1 = temp1.replace("相对斜切Y[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"relativeSkewY",
							"value":Number(temp1)*100 ,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
				else if( temp1.indexOf("斜切Y[") != -1  ){
					temp1 = temp1.replace("斜切Y[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						var data = {
							"type":"skewY",
							"value":Number(temp1)*100 - pics[k]._drill_skewY,
							"time":Number(temp2),
						}
						pics[k]._drill_PSh_commandChangeTank.push(data);
					}
				}
			}
		}	
	
		/*-----------------获取属性------------------*/
		if( pics != null && args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "获取属性" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("变量%[","");	//（直接从图片数据中拿值，所以%只是区分哪些乘了100倍而已）
				temp2 = temp2.replace("]","");
				if( temp1 == "位置X" ){
					$gameVariables.setValue( Number(temp2), pics[0]._x );
				}
				if( temp1 == "位置Y" ){
					$gameVariables.setValue( Number(temp2), pics[0]._y );
				}
				if( temp1 == "透明度" ){
					$gameVariables.setValue( Number(temp2), pics[0]._opacity );
				}
				if( temp1 == "旋转" ){
					$gameVariables.setValue( Number(temp2), pics[0]._angle );
				}
				if( temp1 == "缩放X" ){
					$gameVariables.setValue( Number(temp2), pics[0]._scaleX );
				}
				if( temp1 == "缩放Y" ){
					$gameVariables.setValue( Number(temp2), pics[0]._scaleY );
				}
				if( temp1 == "斜切X" ){
					$gameVariables.setValue( Number(temp2), pics[0]._drill_skewX );
				}
				if( temp1 == "斜切Y" ){
					$gameVariables.setValue( Number(temp2), pics[0]._drill_skewY );
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSh_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PSh_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - STG兼容『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_PSh_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PSh_pluginCommand.call(this, command, args);
		this.drill_PSh_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PSh_pluginCommand = Game_Interpreter.prototype.drill_PSh_pluginCommand;
};



//=============================================================================
// ** ☆叠加变化容器
//
//			说明：	> 此模块专门管理 变化过程 ，变化过程可以叠加，放在容器中统一管理。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 叠加变化容器 - 初始化
//==============================
var _drill_PSh_p_commandChange_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_PSh_p_commandChange_initialize.call(this);
	this._drill_PSh_commandChangeTank = [];
}
//==============================
// * 叠加变化容器 - 帧刷新
//==============================
var _drill_PSh_p_commandChange_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_drill_PSh_p_commandChange_update.call(this);
	this.drill_PSh_updateCommandChange_Execute();		//指令执行
	this.drill_PSh_updateCommandChange_Remove();		//去除指令
}
//==============================
// * 叠加变化容器 - 帧刷新 - 执行指令
//==============================
Game_Picture.prototype.drill_PSh_updateCommandChange_Execute = function() {
	for( var i=0; i < this._drill_PSh_commandChangeTank.length; i++ ){
		var command = this._drill_PSh_commandChangeTank[i];
		
		// > 目标时间修正
		if( command["time"] == undefined ){ command["time"] = 1; }
		if( command["time"] <= 0 ){ command["time"] = 1; }
		
		// > 计时器 初始化
		if( command["cur_time"] == undefined ){ command["cur_time"] = 0; }
		
		// > 计时器 +1
		command["cur_time"] += 1;
		if( command["cur_time"] >= command["time"]){ command["needDestroy"] = true; }
		
		
		// > 执行单条指令
		this.drill_PSh_updateCommandChange_ExecuteOne( command );
	}
}
//==============================
// * 叠加变化容器 - 帧刷新 - 去除指令
//==============================
Game_Picture.prototype.drill_PSh_updateCommandChange_Remove = function() {
	for( var i = this._drill_PSh_commandChangeTank.length-1; i >= 0; i-- ){
		var command = this._drill_PSh_commandChangeTank[i];
		if( command["needDestroy"] == true ){
			this._drill_PSh_commandChangeTank.splice(i,1);
		}
	}
}
//==============================
// * 叠加变化容器 - 帧刷新 - 执行单条指令
//
//			说明：	> 这里都直接操作 图片 的基本属性。直接相加，而不是额外叠加。
//==============================
Game_Picture.prototype.drill_PSh_updateCommandChange_ExecuteOne = function( command ){
	
	// > 预加载资源
	//	（见 预加载图片控制 ）
	
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
	
	// > 相对缩放X
	if( command["type"] == "relativeScaleX" ){
		this._scaleX += command["value"]/command["time"];
	}
	// > 相对缩放Y
	if( command["type"] == "relativeScaleY" ){
		this._scaleY += command["value"]/command["time"];
	}
	// > 缩放X
	if( command["type"] == "scaleX" ){
		this._scaleX += command["value"]/command["time"];
	}
	// > 缩放Y
	if( command["type"] == "scaleY" ){
		this._scaleY += command["value"]/command["time"];
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
	
	// > 相对斜切X
	if( command["type"] == "relativeSkewX" ){
		this._drill_skewX += command["value"]/command["time"];
	}
	// > 相对斜切Y
	if( command["type"] == "relativeSkewY" ){
		this._drill_skewY += command["value"]/command["time"];
	}
	// > 斜切X
	if( command["type"] == "skewX" ){
		this._drill_skewX += command["value"]/command["time"];
	}
	// > 斜切Y
	if( command["type"] == "skewY" ){
		this._drill_skewY += command["value"]/command["time"];
	}
	
	// > 移动到-匀速移动
	if( command["type"] == "uniformMove" ){
		this._x += command["valueX"] / command["time"];
		this._y += command["valueY"] / command["time"];
	}
	// > 移动到-弹性移动
	if( command["type"] == "elasticMove" ){
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
	// > 移动到-增减速移动
	if( command["type"] == "smoothMove" ){
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
	
	
	
//=============================================================================
// ** ☆预加载
//
//			说明：	> 标记bitmap不删除，防止刷菜单时重建导致浪费资源。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
DrillUp.g_PSh_preloadEnabled = true;		//（预加载开关）
if( DrillUp.g_PSh_preloadEnabled == true ){
	//==============================
	// * 预加载 - 初始化
	//==============================
	var _drill_PSh_preload_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_drill_PSh_preload_initialize.call(this);
		this.drill_PSh_preloadInit();
	}
	//==============================
	// * 预加载 - 版本校验
	//==============================
	if( Utils.generateRuntimeId == undefined ){
		alert( DrillUp.drill_PSh_getPluginTip_LowVersion() );
	}
	//==============================
	// * 预加载 - 执行资源预加载
	//
	//			说明：	> 遍历全部资源，提前预加载标记过的资源。
	//==============================
	Game_Temp.prototype.drill_PSh_preloadInit = function() {
		this._drill_PSh_cacheId = Utils.generateRuntimeId();	//图片缓存id
		this._drill_PSh_preloadTank = [];						//图片贴图容器
		for( var i=0; i < DrillUp.g_PSh_pics.length; i++ ){
			var temp_bitmap = ImageManager.reservePicture( DrillUp.g_PSh_pics[i], 0, this._drill_PSh_cacheId );
			this._drill_PSh_preloadTank.push(temp_bitmap);
		}
	}
}


//=============================================================================
// ** ☆预加载图片的属性
//
//			说明：	> 此模块专门管理 图片的属性 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载图片的属性 - 初始化
//==============================
var _drill_PSh_p_pre_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PSh_preIndex = undefined;			//（要放前面，不然会盖掉子类的设置）
	_drill_PSh_p_pre_initialize.call(this);
}
//==============================
// * 预加载图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PSh_removeData = function(){
	this._drill_PSh_preIndex = undefined;
}
//==============================
// * 预加载图片的属性 - 设置图片
//==============================
Game_Picture.prototype.drill_PSh_setDataPreIndex = function( pre_index ){
	this._drill_PSh_preIndex = pre_index;
}
//==============================
// * 预加载图片的属性 - 消除图片
//==============================
var _drill_PSh_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PSh_p_erase.call( this );
	this.drill_PSh_removeData();			//（删除数据）
}
//==============================
// * 预加载图片的属性 - 消除图片（command235）
//==============================
var _drill_PSh_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PSh_removeData();		//（删除数据）
	}
	_drill_PSh_p_erasePicture.call( this, pictureId );
}
//==============================
// * 预加载图片的属性 - 显示图片（对应函数showPicture）
//==============================
var _drill_PSh_p_pre_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	
	// > 预加载设置
	this._drill_PSh_preIndex = undefined;
	
	// > 原函数
	_drill_PSh_p_pre_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
}


//=============================================================================
// ** ☆预加载图片控制
//
//			说明：	> 此模块专门管理 图片控制 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载图片控制 - 贴图 设置图片
//
//			说明：	> 由于一帧内 先刷新 图片的属性，后刷新 贴图的属性。
//					  所以修改图片的属性后，不能立即操作贴图bitmap。『图片bitmap切换慢一帧』
//==============================
Sprite_Picture.prototype.drill_PSh_setBitmap = function( pre_index ){
	var bitmap = $gameTemp._drill_PSh_preloadTank[ pre_index ];	//『预加载直接赋值』
	if( bitmap == undefined ){ return; }
	this.bitmap = bitmap;
	this._pictureName = '';		//（复原后，防止刷不出来name了）
}
//==============================
// * 预加载图片控制 - 贴图 去除图片
//==============================
Sprite_Picture.prototype.drill_PSh_removeBitmap = function(){
	this._pictureName = '';
	this.bitmap = null;
}
//==============================
// * 预加载图片控制 - 贴图 帧刷新
//==============================
var _drill_PSh_sp_pre_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
    var picture = this.picture();
    if( picture != undefined &&
		picture._drill_PSh_preIndex != undefined ){
		this.drill_PSh_setBitmap( picture._drill_PSh_preIndex );
		return;
	}
	
	// > 原函数
	_drill_PSh_sp_pre_updateBitmap.call(this);
}
//==============================
// * 预加载图片控制 - 单条指令（继承）
//==============================
var _drill_PSh_p_pre_updateCommandChange_ExecuteOne = Game_Picture.prototype.drill_PSh_updateCommandChange_ExecuteOne;
Game_Picture.prototype.drill_PSh_updateCommandChange_ExecuteOne = function( command ){
	_drill_PSh_p_pre_updateCommandChange_ExecuteOne.call( this, command );
	
	// > 预加载资源
	if( command["type"] == "preload" ){
		this.drill_PSh_setDataPreIndex( command["value"] );
		command["needDestroy"] = true;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureShortcut = false;
		var pluginTip = DrillUp.drill_PSh_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


