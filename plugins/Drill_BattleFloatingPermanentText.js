//=============================================================================
// Drill_BattleFloatingPermanentText.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        战斗UI - 永久漂浮文字
 * @author Drill_up
 * 
 * @Drill_LE_param "永久漂浮样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BFPT_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleFloatingPermanentText +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在战斗界面生成并控制永久存在的漂浮文字。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       数学模型-弹道核心★★v2.1及以上★★
 *   - Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心★★v2.0及以上★★
 * 可扩展：
 *   - Drill_CoreOfString           系统-字符串核心
 *     可以在漂浮文字中，绑定并显示自定义的字符串。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗的各个层级。
 * 2.更多详细内容，去看看文档 "13.UI > 大家族-漂浮文字.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 细节：
 *   (1.漂浮文字本质上是一个窗口，可以显示窗口外框。
 *   (2.你可以将漂浮文字放置在战斗层级的 下层、上层、图片层、
 *      最顶层 中。
 *   (3.漂浮文字支持所有窗口字符，比如：
 *       \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      其他窗口字符可见插件 窗口字符-窗口字符核心 的说明，
 *      或者去看看文档 "23.窗口字符 > 关于窗口字符.docx"。
 *   (4.注意，永久漂浮文字的"清除"指令一般用不到，也不建议经常使用。
 *      因为会存在一个情况：你在并行事件中，对漂浮文字进行操作。
 *      出现了交叉等待时间，先"清除"，后"修改样式属性-内容文本"，会造成报错。
 * 弹道：
 *   (1.漂浮文字的弹道支持情况如下：
 *        极坐标模式    x
 *        直角坐标模式  x
 *        轨道锚点模式  x
 *        两点式        √
 *   (2.永久漂浮文字移动时，必须设置移动到指定的点位置。
 * 逐个绘制：
 *   (1.该文本域 支持 消息输入字符。
 *   (2.该文本域的绘制方式为 逐个绘制，即在一段时间内持续绘制文本。
 *      持续绘制时如果重置文本，则会重新 逐个绘制 。
 *   (3.该插件可以通过 配置样式 或 插件指令 来启用逐个绘制。
 * 设计：
 *   (1.由于这类漂浮文字是可以长期存在的对象，你可以设置成某种提示性标语。
 *      或者任务清单提示、无边框的属性参数面板等。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 资源路径：img/Battle__ui （Battle后面有两个下划线）
 * 先确保项目img文件夹下是否有system文件夹。
 * 先确保项目img文件夹下是否有Battle__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 物品框样式-1 资源-自定义窗口皮肤（system文件夹）
 * 物品框样式-1 资源-自定义背景图片（Map__ui文件夹）
 * 物品框样式-2 资源-自定义窗口皮肤（system文件夹）
 * 物品框样式-2 资源-自定义背景图片（Map__ui文件夹）
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 创建
 * 你可以通过插件指令控制临时漂浮内容集合：
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 创建 : 样式[1]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 清除
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 修改样式属性-刷新内容文本
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 修改样式属性-内容文本 : 文本[这是一段文字]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 修改样式属性-内容文本 : 字符串[1]
 * 
 * 1.创建漂浮文字后，将永久存在，且能被存入存档中。
 *   如果"漂浮文字[1]"已存在内容，那么再次"创建"会清掉之前的内容。
 * 2.注意，这里的"清除"指令一般用不到，也不建议经常使用。
 *   因为会存在一个情况：你在并行事件中，对漂浮文字进行操作。
 *   出现了交叉等待时间，先"清除"，后"修改样式属性-内容文本"，会造成报错。
 * 3.如果你的内容文本中含有变量值\v[21]，显示后将不会自动刷新值。
 *   你需要手动刷新内容文本，显示的变量值才会变化。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 移动
 * 你可以通过插件指令控制临时漂浮内容集合：
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 瞬间移动 : 位置[100,200]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 增减速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 弹性移动 : 位置[100,200] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 抛物线移动 : 位置[100,200] : 时间[20]
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 位置变量[25,26] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 相对位置[-100,0] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 相对位置变量[25,26] : 时间[20]
 * 
 * 1.前半部分（匀速移动）和后半部分（相对位置[-100,0]）的参数可以随意组合。
 *   一共有5*4种组合方式。
 * 2.漂浮文字可以根据移动类型随意移动到指定位置，
 *   具体移动说明可以去看看 "32.数学模型 > 关于弹道.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 透明度变化
 * 你可以通过插件指令控制临时漂浮内容集合：
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 瞬间变化 : 透明度[255]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 匀速变化 : 透明度[255] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 增减速变化 : 透明度[255] : 时间[20]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 弹性变化 : 透明度[255] : 时间[20]
 * 
 * 1.注意，透明度变化 和 移动 用法相似，但是指令不一样，注意区分。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 空格支持
 * 插件指令下面的写法也是有效的：
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 修改样式属性-内容文本 : 文本[任务： 1 - 2]
 * 
 * 1.你可以在该插件指令中的文本使用空格。
 *   从原则上来说，脚本会将插件指令的空格分开，所以含空格的写法是不推荐的。
 * 2.建议使用 字符串 来控制，字符串不仅支持空格，还支持 换行符 。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 定时重绘
 * 你可以通过插件指令，设置定时重绘：
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 开启定时重绘
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 关闭定时重绘
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 设置定时重绘 : 间隔时间[60]
 * 
 * 1.定时重绘主要用于 指代字符、表达式 的实时变化，比如"\v[21]"变量。
 *   注意，只有在不同的时间会变成其它文本的文本，才需要刷新。
 *   普通文本没必要刷新。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逐个绘制
 * 你可以通过插件指令，设置定时重绘：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 启用逐个绘制
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 关闭逐个绘制
 * 
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 修改逐个绘制设置 : 间隔时间[4]
 * 插件指令：>战斗永久漂浮文字 : 漂浮文字[1] : 重新逐个绘制
 * 
 * 1.显示图片后，需要手动"启用逐个绘制"。
 *   删除图片会自动关闭逐个绘制。
 *   注意，定时重绘 和 逐个绘制 功能相互不兼容，开启这个会自动关闭另一个功能。
 * 2.插件指令最好先 "启用逐个绘制" 然后 "设置文本"，或者样式中直接开启。
 *   因为"设置文本"默认一次性绘制，执行后瞬间就出来了，所以最好先 "启用逐个绘制"。
 *   当然，你也可以把开启放后面，然后再执行一次 "重新逐个绘制"，也能实现一样的效果。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在战斗中建立5个永久漂浮文字。
 * 测试结果：   战斗界面中的平均消耗为：【16.68ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于永久飘浮文字是一个个创建的，且数量也固定，不多，所以
 *   相对消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * [v1.4]
 * 添加了漂浮文字外框设置色调的功能。
 * [v1.5]
 * 修复了使用自定义窗口皮肤时文字变黑的bug。
 * [v1.6]
 * 更新并兼容了新的窗口字符底层。
 * 
 * 
 * 
 * @param DEBUG-是否提示找不到配置数据
 * @type boolean
 * @on 提示
 * @off 关闭提示
 * @desc true - 提示，false - 关闭提示。如果你知道存在此问题但不想弹出此提示，可在配置中关闭此提示。
 * @default true
 * 
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 永久漂浮样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param ---样式组21至40---
 * @default 
 * 
 * @param 永久漂浮样式-21
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-22
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-23
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-24
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-25
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-26
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-27
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-28
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-29
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-30
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-31
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-32
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-33
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-34
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-35
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-36
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-37
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-38
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-39
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-40
 * @parent ---样式组21至40---
 * @type struct<DrillBFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default
 * 
 */
/*~struct~DrillBFPTStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的永久漂浮样式==
 * 
 * 
 * @param ---常规---
 * @default 
 *
 * @param 平移-漂浮文字 X
 * @parent ---常规---
 * @desc 漂浮文字的初始x轴位置，0表示贴在最左边。
 * @default 400
 *
 * @param 平移-漂浮文字 Y
 * @parent ---常规---
 * @desc 漂浮文字的初始y轴位置，0表示贴在最上面。
 * @default 300
 *
 * @param 漂浮文字透明度
 * @parent ---常规---
 * @type number
 * @min 0
 * @max 255
 * @desc 漂浮文字的透明度，0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 默认内容文本
 * @parent ---常规---
 * @type note
 * @desc 漂浮文字默认绑定的内容。
 * @default "一段永久的漂浮文字"
 * 
 * 
 * @param ---层级---
 * @default 
 *
 * @param UI基准
 * @parent ---层级---
 * @type select
 * @option 相对于战斗场景
 * @value 相对于战斗场景
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 配置了 战斗镜头插件 此设置才有效。相对于镜头的漂浮文字，会与镜头位置保持一致。相对于战斗场景的漂浮文字，会与战斗坐标保持一致。
 * @default 相对于镜头
 *
 * @param 战斗层级
 * @parent ---层级---
 * @type select
 * @option 下层
 * @value 下层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 窗口所在的战斗层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 战斗图片层级
 * @parent ---层级---
 * @type number
 * @min 0
 * @desc 窗口在同一个战斗层级时，先后排序的位置，0表示最后面。
 * @default 90
 * 
 * 
 * @param ---窗口皮肤---
 * @default 
 * 
 * @param 布局模式
 * @parent ---窗口皮肤---
 * @type select
 * @option 默认窗口皮肤
 * @value 默认窗口皮肤
 * @option 自定义窗口皮肤
 * @value 自定义窗口皮肤
 * @option 自定义背景图片
 * @value 自定义背景图片
 * @option 黑底背景
 * @value 黑底背景
 * @desc 窗口背景布局的模式。
 * @default 黑底背景
 *
 * @param 布局透明度
 * @parent 布局模式
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 0
 *
 * @param 资源-自定义窗口皮肤
 * @parent 布局模式
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 资源-自定义背景图片
 * @parent 布局模式
 * @desc 背景图片布局的资源。
 * @default (需配置)永久漂浮文字-自定义背景图片
 * @require 1
 * @dir img/Battle__ui/
 * @type file
 *
 * @param 平移-自定义背景图片 X
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 是否锁定窗口色调
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 锁定
 * @off 默认色调
 * @desc true - 锁定，false - 默认色调，你可以单独锁定该窗口的色调。
 * @default false
 *
 * @param 窗口色调-红
 * @parent 是否锁定窗口色调
 * @desc 范围为：-255 至 255，与默认游戏中窗口色调配置的值一样。
 * @default 0
 *
 * @param 窗口色调-绿
 * @parent 是否锁定窗口色调
 * @desc 范围为：-255 至 255，与默认游戏中窗口色调配置的值一样。
 * @default 0
 *
 * @param 窗口色调-蓝
 * @parent 是否锁定窗口色调
 * @desc 范围为：-255 至 255，与默认游戏中窗口色调配置的值一样。
 * @default 0
 * 
 * 
 * @param ---窗口属性---
 * @default 
 *
 * @param 窗口中心锚点
 * @parent ---窗口属性---
 * @type select
 * @option 左上角
 * @value 左上角
 * @option 右上角
 * @value 右上角
 * @option 左下角
 * @value 左下角
 * @option 右下角
 * @value 右下角
 * @option 正上方
 * @value 正上方
 * @option 正下方
 * @value 正下方
 * @option 正左方
 * @value 正左方
 * @option 正右方
 * @value 正右方
 * @option 正中心
 * @value 正中心
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 左上角
 *
 * @param 窗口内边距
 * @parent ---窗口属性---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口属性---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent ---窗口属性---
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent ---窗口属性---
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 * 
 * 
 * @param ---定时重绘---
 * @default 
 *
 * @param 是否启用定时重绘
 * @parent ---定时重绘---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。如果文本会实时变化，则需要开定时重绘。
 * @default false
 *
 * @param 定时重绘间隔时间
 * @parent ---定时重绘---
 * @type number
 * @min 1
 * @desc 文本定时重绘的间隔时间，单位帧。（1秒60帧）
 * @default 45
 * 
 * 
 * @param ---逐个绘制---
 * @default 
 * 
 * @param 是否启用逐个绘制
 * @parent ---逐个绘制---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。逐个绘制启用后，文本中可以使用消息输入字符。
 * @default false
 * 
 * @param 逐个绘制间隔时间
 * @parent ---逐个绘制---
 * @type number
 * @min 1
 * @desc 启用逐个绘制时，绘制的间隔时间，单位 帧/个。
 * @default 4
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BFPT (Gauge_Floating_Text)
//		临时全局变量	DrillUp.g_BFPT_xxx
//		临时局部变量	this._drill_BFPT_xxx
//		存储数据变量	$gameSystem._drill_BFPT_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	3.75ms（未工作时，update）
//		★最坏情况		配置大量永久漂浮文字。
//		★备注			由于数量不多，消耗稳定。
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
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			->☆存储数据
//				->创建
//				->清除
//				->移动设置
//				->透明度设置
//			
//			->☆数据容器
//			
//			->战斗永久 漂浮文字窗口【Drill_BFPT_Window】
//				->A主体
//				->B窗口弹道
//				->C窗口皮肤
//				->D窗口内容
//					->定时重绘
//					->逐个绘制
//		
//		
//		★家谱：
//			大家族-漂浮文字
//		
//		★脚本文档：
//			13.UI > 大家族-漂浮文字（脚本）.docx
//		
//		★插件私有类：
//			* 战斗永久 漂浮文字窗口【Drill_BFPT_Window】
//		
//		★必要注意事项：
//			1.所有子插件功能介绍去看看："13.UI > 大家族-漂浮文字（脚本）.docx"。
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
	DrillUp.g_BFPT_PluginTip_curName = "Drill_BattleFloatingPermanentText.js 战斗UI-永久漂浮文字";
	DrillUp.g_BFPT_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BFPT_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BFPT_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BFPT_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BFPT_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BFPT_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_BFPT_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_BFPT_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少支持的插件
	//==============================
	DrillUp.drill_BFPT_getPluginTip_NoSupportPlugin = function(){
		return "【" + DrillUp.g_BFPT_PluginTip_curName + "】\n缺少 字符串核心 插件，插件指令执行失败。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到配置数据
	//==============================
	DrillUp.drill_BFPT_getPluginTip_DataNotFind = function( text_id ){
		return "【" + DrillUp.g_BFPT_PluginTip_curName + "】（此提示可在插件中关闭）\n" +   //『可关闭提示信息』
				"插件指令错误，你需要先创建 漂浮文字["+text_id+"] 对象，再操作该对象。\n" + 
				"比如：'>战斗永久漂浮文字 : 漂浮文字["+text_id+"] : 创建 : 样式[样式id]' ";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_BFPT_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_BFPT_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_BattleFloatingPermanentText = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleFloatingPermanentText');
	
	
	//==============================
	// * 静态数据 - 永久漂浮样式
	//				（~struct~DrillBFPTStyle）
	//==============================
	DrillUp.drill_BFPT_initContext = function( dataFrom ) {
		var data = {};
		
		// > 常规
		data['x'] = Number( dataFrom["平移-漂浮文字 X"] || 400);
		data['y'] = Number( dataFrom["平移-漂浮文字 Y"] || 300);
		data['opacity'] = Number( dataFrom["漂浮文字透明度"] || 255);
		if( dataFrom["默认内容文本"] != undefined && 
			dataFrom["默认内容文本"] != "" ){
			data['context'] = JSON.parse( dataFrom["默认内容文本"] );
		}else{
			data['context'] = "";
		}
		
		// > 层级
		data['window_benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['window_battle_layer'] = String( dataFrom["战斗层级"] || "图片层");
		data['window_battle_zIndex'] = Number( dataFrom["战斗图片层级"] || 40);
		
		// > 窗口皮肤
		data['window_type'] = String( dataFrom["布局模式"] || "黑底背景");
		data['window_opacity'] = Number( dataFrom["布局透明度"] || 0);
		data['window_sys_src'] = String( dataFrom["资源-自定义窗口皮肤"] || "");
		data['window_pic_src'] = String( dataFrom["资源-自定义背景图片"] || "");
		data['window_pic_x'] = Number( dataFrom["平移-自定义背景图片 X"] || 0);
		data['window_pic_y'] = Number( dataFrom["平移-自定义背景图片 Y"] || 0);
		data['window_tone_lock'] = String( dataFrom["是否锁定窗口色调"] || "false") == "true";
		data['window_tone_r'] = Number( dataFrom["窗口色调-红"] || 0);
		data['window_tone_g'] = Number( dataFrom["窗口色调-绿"] || 0);
		data['window_tone_b'] = Number( dataFrom["窗口色调-蓝"] || 0);
		
		// > 窗口属性
		data['window_anchor'] = String( dataFrom["窗口中心锚点"] || "左上角" );
		data['window_padding'] = Number( dataFrom["窗口内边距"] || 18);
		data['window_fontsize'] = Number( dataFrom["窗口字体大小"] || 22);
		data['window_ex_width'] = Number( dataFrom["窗口附加宽度"] || 0);
		data['window_ex_height'] = Number( dataFrom["窗口附加高度"] || 0);
		
		// > 定时重绘
		data['timedRedraw_enabled'] = String( dataFrom["是否启用定时重绘"] || "false") == "true";
		data['timedRedraw_time'] = Number( dataFrom["定时重绘间隔时间"] || 45);
		
		// > 逐个绘制
		data['timing_enabled'] = String( dataFrom["是否启用逐个绘制"] || "false") == "true";
		data['timing_interval'] = Number( dataFrom["逐个绘制间隔时间"] || 4);
		data['timing_needRedraw'] = undefined;
		if( data['timing_enabled'] == true ){ data['timedRedraw_enabled'] = false; }	//（功能互斥）
		
		return data;
	}
	
	/*-----------------永久漂浮样式集合------------------*/
	DrillUp.g_BFPT_style_length = 40;
	DrillUp.g_BFPT_style = [];
	for( var i = 0; i < DrillUp.g_BFPT_style_length; i++ ){
		if( DrillUp.parameters["永久漂浮样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["永久漂浮样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["永久漂浮样式-" + String(i+1) ]);
			DrillUp.g_BFPT_style[i] = DrillUp.drill_BFPT_initContext( temp );
			DrillUp.g_BFPT_style[i]['inited'] = true;
		}else{
			DrillUp.g_BFPT_style[i] = DrillUp.drill_BFPT_initContext( {} );
			DrillUp.g_BFPT_style[i]['inited'] = false;
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_BFPT_TipEnabled_DataNotFind = String(DrillUp.parameters["DEBUG-是否提示找不到配置数据"] || "true") === "true";



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_BFPT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_BFPT_pluginCommand.call(this, command, args);
	this.drill_BFPT_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_BFPT_pluginCommand = function( command, args ){
	if( command === ">战斗永久漂浮文字" ){
		
		/*-----------------对象获取------------------*/
		var text_id = null;
		if(args.length >= 2){	
			text_id = String(args[1]);
			text_id = text_id.replace("漂浮文字[","");
			text_id = text_id.replace("]","");
			text_id = Number(text_id);
		}
		
		/*-----------------创建/清除------------------*/
		if( text_id != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "创建" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem.drill_BFPT_create( text_id, temp1 );
			}	
		}
		if( text_id != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "清除" ){
				$gameSystem.drill_BFPT_remove( text_id );
			}	
		}
		
		/*-----------------修改样式属性------------------*/
		if( text_id != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "修改样式属性-刷新内容文本" || type == "刷新内容文本" ){
				if( $gameTemp._drill_BFPT_windowTank[ text_id ] != null ){
					$gameTemp._drill_BFPT_windowTank[ text_id ].drill_initMessage();
				}
			}	
		}
		if( text_id != null && args.length >= 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改样式属性-内容文本" || type == "修改内容文本" ){
				var data = $gameSystem._drill_BFPT_dataTank[ text_id ];
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				
				if( temp1.indexOf("字符串[") != -1 ){
					if( Imported.Drill_CoreOfString ){
						temp1 = temp1.replace("字符串[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameStrings.value( Number(temp1) );
						
						data['context'] = temp1;
						if( $gameTemp._drill_BFPT_windowTank[ text_id ] != null ){
							$gameTemp._drill_BFPT_windowTank[ text_id ].drill_initMessage();
						}
					}else{
						alert( DrillUp.drill_BFPT_getPluginTip_NoSupportPlugin() );
					}
				}else{	
					var data_str = "";		//（支持空格的多行结构）
					for(var m = 5; m < args.length ; m++ ){
						data_str += String(args[ m ]);
						if( m < args.length-1 ){  data_str += " "; }
					}
					if( data_str.indexOf("文本[") != -1 ){
						data_str = data_str.replace("文本[","");
						data_str = data_str.replace(/\]$/,"");	//（去掉末尾的]）
					}
					data['context'] = data_str;
					if( $gameTemp._drill_BFPT_windowTank[ text_id ] != null ){
						$gameTemp._drill_BFPT_windowTank[ text_id ].drill_initMessage();
					}
				}
			}
		}
		
		/*-----------------移动方式------------------*/
		if( text_id != null && args.length >= 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间移动" || type == "匀速移动" || type == "增减速移动" || type == "弹性移动" || type == "抛物线移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				var data = $gameSystem._drill_BFPT_dataTank[ text_id ];
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				var pos = [];
				if( temp1.indexOf("相对位置变量[") != -1 ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					var m_data = {
						"x": data['x'] + Number(pos[0]),
						"y": data['y'] + Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_BFPT_moveTo( text_id, m_data );
					
				}else if( temp1.indexOf("相对位置[") != -1 ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					var m_data = {
						"x": data['x'] + Number(pos[0]),
						"y": data['y'] + Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_BFPT_moveTo( text_id, m_data );
					
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					var m_data = {
						"x":Number(pos[0]),
						"y":Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_BFPT_moveTo( text_id, m_data );
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					var m_data = {
						"x":Number(pos[0]),
						"y":Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_BFPT_moveTo( text_id, m_data );
				}
			}
		}
		
		/*-----------------透明度------------------*/
		if( text_id != null && args.length >= 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间变化" || type == "匀速变化" || type == "增减速变化" || type == "弹性变化" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				var data = $gameSystem._drill_BFPT_dataTank[ text_id ];
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				var pos = [];
				if( temp1.indexOf("透明度[") != -1 ){
					temp1 = temp1.replace("透明度[","");
					temp1 = temp1.replace("]","");
					var o_data = {
						"opacity":Number(temp1),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_BFPT_opacityTo( text_id, o_data );
				}
			}
		}
		
		/*-----------------定时重绘------------------*/
		if( text_id != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "开启定时重绘" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timedRedraw_enabled'] = true;
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timing_enabled'] = false;		//（功能互斥）
			}
			if( type == "关闭定时重绘" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timedRedraw_enabled'] = false;
			}
		}
		if( text_id != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置定时重绘" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				if( temp1.indexOf("间隔时间[") != -1 ){
					temp1 = temp1.replace("间隔时间[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BFPT_dataTank[ text_id ]['timedRedraw_time'] = Number(temp1);
				}
			}
		}
		
		/*-----------------逐个绘制------------------*/
		if( text_id != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "启用逐个绘制" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timing_enabled'] = true;
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timedRedraw_enabled'] = false;	//（功能互斥）
			}
			if( type == "关闭逐个绘制" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timing_enabled'] = false;
			}
		}
		if( text_id != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改逐个绘制设置" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				if( temp1.indexOf("间隔时间[") != -1 ){
					temp1 = temp1.replace("间隔时间[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BFPT_dataTank[ text_id ]['timing_interval'] = Number(temp1);
				}
			}
		}
		if( text_id != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "重新逐个绘制" ){
				if( this.drill_BFPT_isDataExist( text_id ) == false ){ return; }
				$gameSystem._drill_BFPT_dataTank[ text_id ]['timing_needRedraw'] = true;
			}
		}
	};
};
//==============================
// * 插件指令 - 对象检查
//==============================
Game_Interpreter.prototype.drill_BFPT_isDataExist = function( text_id ){
	if( isNaN( Number(text_id) ) ){
		return false;
	}
	var data = $gameSystem._drill_BFPT_dataTank[ Number(text_id) ];
	if( data == undefined ){
		if( DrillUp.g_BFPT_TipEnabled_DataNotFind == true ){  //『可关闭提示信息』
			alert( DrillUp.drill_BFPT_getPluginTip_DataNotFind( text_id ) );
		}
		return false;
	}
	return true;
}


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_BFPT_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_BFPT_preload_initialize.call(this);
	this.drill_BFPT_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_BFPT_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_BFPT_preloadInit = function() {
	this._drill_BFPT_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_BFPT_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_BFPT_style.length; i++ ){
		var temp_data = DrillUp.g_BFPT_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > 『窗口皮肤的预加载』
		if( temp_data['window_type'] == "自定义窗口皮肤" ){
			this._drill_BFPT_preloadTank.push( 
				ImageManager.reserveBitmap( "img/system/", temp_data['window_sys_src'], 0, true, this._drill_BFPT_cacheId ) 
			);
		}
		if( temp_data['window_type'] == "自定义背景图片" ){
			this._drill_BFPT_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Battle__ui/", temp_data['window_pic_src'], 0, true, this._drill_BFPT_cacheId ) 
			);
		}
	}
}


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_BFPT_layerAddSprite = function( sprite, layer_index ){
	this.drill_BFPT_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BFPT_layerRemoveSprite = function( sprite ){
	this.drill_BFPT_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_BFPT_sortByZIndex = function () {
    this.drill_BFPT_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_BFPT_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BFPT_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BFPT_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BFPT_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BFPT_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BFPT_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BFPT_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BFPT_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BFPT_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BFPT_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_BFPT_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_BFPT_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BFPT_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_BFPT_layerCameraMoving_Private = function( xx, yy, layer, option ){
		
	if( option['window_benchmark'] == "相对于战斗场景" ){
		
		// > 战斗参照 -> 战斗参照
		if( layer == "下层" || layer == "上层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
		
		// > 战斗参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			xx += this._spriteset._baseSprite.x;
			yy += this._spriteset._baseSprite.y;
			
			// > 战斗镜头位移（在图层内）
			if( Imported.Drill_BattleCamera ){
				var offset_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPosOffset();
				xx += offset_pos.x;
				yy += offset_pos.y;
			}else{
				xx += this._spriteset._battleField.x;
				yy += this._spriteset._battleField.y;
			}
			return {'x':xx, 'y':yy };
		}
		
	}else{
		
		// > 镜头参照 -> 镜头参照
		if( layer == "下层" || layer == "上层" ){
			xx -= this._spriteset._baseSprite.x;
			yy -= this._spriteset._baseSprite.y;
			
			// > 战斗镜头位移（在图层内）
			if( Imported.Drill_BattleCamera ){
				var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
				xx -= camera_pos.x;
				yy -= camera_pos.y;
			}else{
				xx -= this._spriteset._battleField.x;
				yy -= this._spriteset._battleField.y;
			}
			return {'x':xx, 'y':yy };
		}
		
		// > 镜头参照 -> 战斗参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
	}
	return {'x':xx, 'y':yy };
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BFPT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BFPT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BFPT_sys_initialize.call(this);
	this.drill_BFPT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BFPT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BFPT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BFPT_saveEnabled == true ){	
		$gameSystem.drill_BFPT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BFPT_initSysData();
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
Game_System.prototype.drill_BFPT_initSysData = function() {
	this.drill_BFPT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BFPT_checkSysData = function() {
	this.drill_BFPT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BFPT_initSysData_Private = function() {
	
	this._drill_BFPT_dataTank = [];					//漂浮文字数据总容器
	this._drill_BFPT_dataTank_moveBuffer = [];		//漂浮文字变化容器
	this._drill_BFPT_dataTank_opacityBuffer = [];	//漂浮文字变化容器
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BFPT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BFPT_dataTank == undefined ){
		this.drill_BFPT_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令使用时才赋值）
};

//==============================
// * 存储数据 - 创建
//==============================
Game_System.prototype.drill_BFPT_create = function( slot_id, style_id ){
	if( $gameTemp._drill_BFPT_dataTank_state[ slot_id ] == "binded" ||
		$gameTemp._drill_BFPT_dataTank_state[ slot_id ] == "remove" ){		//（还没来得及删的情况）
		$gameTemp._drill_BFPT_dataTank_state[ slot_id ] = "rebuild";
	}else{
		$gameTemp._drill_BFPT_dataTank_state[ slot_id ] = null;
	}
	
	// > 数据
	this._drill_BFPT_dataTank[ slot_id ] = JSON.parse(JSON.stringify( DrillUp.g_BFPT_style[ style_id ] ));		//深拷贝

	// > 私有数据
	this._drill_BFPT_dataTank[ slot_id ]['m_cur_time'] = 0;				//当前时间（移动）
	this._drill_BFPT_dataTank[ slot_id ]['m_tar_time'] = 0;				//目标事件
	this._drill_BFPT_dataTank[ slot_id ]['o_cur_time'] = 0;				//当前时间（透明度）
	this._drill_BFPT_dataTank[ slot_id ]['o_tar_time'] = 0;				//目标事件
	this._drill_BFPT_dataTank[ slot_id ]['_drill_COBa_x'] = [];			//弹道位置列表x
	this._drill_BFPT_dataTank[ slot_id ]['_drill_COBa_y'] = [];			//弹道位置列表y
	this._drill_BFPT_dataTank[ slot_id ]['_drill_COBa_opacity'] = [];	//弹道透明度列表
};
//==============================
// * 存储数据 - 清除
//==============================
Game_System.prototype.drill_BFPT_remove = function( slot_id, style_id ){
	$gameTemp._drill_BFPT_dataTank_state[ slot_id ] = "remove";		//（并非瞬间删除，而是需要等一帧）
};
//==============================
// * 位置 - 移动设置
//==============================
Game_System.prototype.drill_BFPT_moveTo = function( slot_id, m_data ){
	var data = this._drill_BFPT_dataTank[ slot_id ];
	if( data == undefined ){	//（如果还没来得及创建，则放入变化容器中）
		this._drill_BFPT_dataTank_moveBuffer[ slot_id ] = m_data;
	}
	data['m_cur_time'] = 0;
	data['m_tar_time'] = m_data["time"];
	
	//   移动（movement）
	m_data['movementNum'] = 1;									//对象数量
	m_data['movementTime'] = m_data["time"];					//时长
	m_data['movementMode'] = "两点式";							//移动模式
	//   两点式（twoPoint）
	m_data['twoPointType'] = m_data["type"];					//两点式 - 类型（匀速移动/弹性移动/…）
	m_data['twoPointDifferenceX'] = m_data["x"] - data['x'];	//两点式 - 距离差值x
	m_data['twoPointDifferenceY'] = m_data["y"] - data['y'];	//两点式 - 距离差值y
	
	// > 弹道（坐标）
	$gameTemp.drill_COBa_setBallisticsMove( m_data );								//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( data, 0 , data['x'], data['y'] );		//弹道核心 - 推演
	
};
//==============================
// * 位置 - 透明度设置
//==============================
Game_System.prototype.drill_BFPT_opacityTo = function( slot_id, o_data ){
	var data = this._drill_BFPT_dataTank[ slot_id ];
	if( data == undefined ){	//（如果还没来得及创建，则放入变化容器中）
		this._drill_BFPT_dataTank_opacityBuffer[ slot_id ] = o_data;
	}
	data['o_cur_time'] = 0;
	data['o_tar_time'] = o_data["time"];
	
	//   透明度（opacity）
	o_data['opacityNum'] = 1;									//对象数量
	o_data['opacityTime'] = o_data["time"];						//时长
	o_data['opacityMode'] = "目标值模式";						//移动模式
	//   目标值模式（target）
	o_data['targetType'] = o_data["type"];								//目标值模式 - 类型（匀速变化/弹性变化/…）
	o_data['targetDifference'] = o_data["opacity"] - data['opacity'];	//目标值模式 - 距离差值
	
	// > 弹道（透明度）
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );							//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( data, 0 , data['opacity'] );			//弹道核心 - 推演
	
};


//=============================================================================
// ** ☆数据容器
//			
//			说明：	> 此模块专门管理 窗口 的创建、销毁、移动弹道、透明度弹道。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 战斗 - 切换战斗时
//==============================
var _drill_BFPT_battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {	
	_drill_BFPT_battle_initialize.call(this);
	$gameTemp._drill_BFPT_windowTank = [];			//漂浮文字容器
	$gameTemp._drill_BFPT_dataTank_state = [];		//漂浮文字状态
};
//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_BFPT_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_BFPT_battle_update.call(this);
	this.drill_BFPT_updateSpriteDelete();			//帧刷新 - 贴图删除监听
	this.drill_BFPT_updateCommandCreate();			//帧刷新 - 贴图建立监听
	this.drill_BFPT_updateDataMoving();				//帧刷新 - 数据移动
	this.drill_BFPT_updateDataOpacity();			//帧刷新 - 数据透明度
};
//==============================
// * 帧刷新 - 贴图建立监听
//==============================
Scene_Battle.prototype.drill_BFPT_updateCommandCreate = function() {
	for( var i = 0; i < $gameSystem._drill_BFPT_dataTank.length; i++ ){
		var data = $gameSystem._drill_BFPT_dataTank[i];
		if( data == undefined ){ continue; }
		if( data['inited'] == false ){ continue; }
		
		if( $gameTemp._drill_BFPT_dataTank_state[i] == undefined ){ 	//（根据状态判断创建情况）
			
			// > 创建
			$gameTemp._drill_BFPT_dataTank_state[i] = "binded";
			var temp_window = new Drill_BFPT_Window( data );
			temp_window.zIndex = data['window_battle_zIndex'];
			$gameTemp._drill_BFPT_windowTank[i] = temp_window;
			
			// > 层级初始化
			this.drill_BFPT_layerAddSprite( temp_window, data['window_battle_layer'] );
			
			// > 层级排序
			this.drill_BFPT_sortByZIndex();
		}
	}
}
//==============================
// * 帧刷新 - 贴图删除监听
//==============================
Scene_Battle.prototype.drill_BFPT_updateSpriteDelete = function() {
	for( var i = $gameTemp._drill_BFPT_windowTank.length-1; i >= 0; i-- ){
		var temp_sprite = $gameTemp._drill_BFPT_windowTank[i];
		
		// > 删除
		if( $gameTemp._drill_BFPT_dataTank_state[i] == "remove" ){
			$gameTemp._drill_BFPT_dataTank_state[i] = null;
			$gameSystem._drill_BFPT_dataTank[i] = null;				//（清除状态和数据）
		}
		// > 重建
		if( $gameTemp._drill_BFPT_dataTank_state[i] == "rebuild" ){
			$gameTemp._drill_BFPT_dataTank_state[i] = null;			//（只清状态）
		}
		
		// > 去除贴图
		if( $gameTemp._drill_BFPT_dataTank_state[i] == null ){
			if( temp_sprite == undefined ){ continue; }
			
			// > 从层中去除
			this.drill_BFPT_layerRemoveSprite( temp_sprite );
			
			// > 从容器中去除
			$gameTemp._drill_BFPT_windowTank[i] = null;
		}
	}
}
//==============================
// * 帧刷新 - 数据移动
//
//			说明：	这里直接在数据中，对弹道位置进行操作，能被存储。
//==============================
Scene_Battle.prototype.drill_BFPT_updateDataMoving = function() {
	for( var i = 0; i < $gameSystem._drill_BFPT_dataTank.length; i++ ){
		var data = $gameSystem._drill_BFPT_dataTank[i];
		if( data == undefined ){ continue; }
		if( data['inited'] == false ){ continue; }
		if( data['_drill_COBa_x'].length == 0 ){ continue; }
		
		// > 位移
		var xx = 0;
		var yy = 0;
		
		// > 窗口的锚点
		//	（在贴图中变化）
		
		// > 弹道位移
		data['m_cur_time'] += 1;
		if( data['m_cur_time'] < 0 ){ data['m_cur_time'] = 0; }
		if( data['m_cur_time'] > data['_drill_COBa_x'].length-1 ){
			data['m_cur_time'] = data['_drill_COBa_x'].length-1;
		}
		xx += data['_drill_COBa_x'][ data['m_cur_time'] ];		//播放弹道轨迹
		yy += data['_drill_COBa_y'][ data['m_cur_time'] ];
	
	
		// > 层级与镜头的位移（参照设置与 window_benchmark 有关）
		var option = {
			"window_benchmark": data['window_benchmark'],
		};
		var pos = this.drill_BFPT_layerCameraMoving(xx, yy, data['window_battle_layer'], option );
		xx = pos['x'];
		yy = pos['y'];
	
		
		data['x'] = xx;
		data['y'] = yy;
	}
	
	// > 插件指令延迟缓冲
	for( var i = 0; i < $gameSystem._drill_BFPT_dataTank_moveBuffer.length; i++ ){
		var m_data = $gameSystem._drill_BFPT_dataTank_moveBuffer[i];
		if( m_data == undefined ){ continue; }
		
		$gameSystem.drill_BFPT_moveTo( i, m_data );
		$gameSystem._drill_BFPT_dataTank_moveBuffer[i] = null;
	}
}
//==============================
// * 帧刷新 - 数据透明度
//
//			说明：	这里直接在数据中，对弹道透明度进行操作，能被存储。
//==============================
Scene_Battle.prototype.drill_BFPT_updateDataOpacity = function() {
	for( var i = 0; i < $gameSystem._drill_BFPT_dataTank.length; i++ ){
		var data = $gameSystem._drill_BFPT_dataTank[i];
		if( data == undefined ){ continue; }
		if( data['inited'] == false ){ continue; }
		if( data['_drill_COBa_opacity'].length == 0 ){ continue; }
		
		// > 根据轨迹进行播放
		data['o_cur_time'] += 1;
		if( data['o_cur_time'] < 0 ){ data['o_cur_time'] = 0; }
		if( data['o_cur_time'] > data['_drill_COBa_opacity'].length-1 ){
			data['o_cur_time'] = data['_drill_COBa_opacity'].length-1;
		}
		var oo = data['_drill_COBa_opacity'][ data['o_cur_time'] ];	//播放弹道轨迹
		
		data['opacity'] = Math.floor(oo);
	}
	
	// > 插件指令延迟缓冲
	for( var i = 0; i < $gameSystem._drill_BFPT_dataTank_opacityBuffer.length; i++ ){
		var o_data = $gameSystem._drill_BFPT_dataTank_opacityBuffer[i];
		if( o_data == undefined ){ continue; }
		
		$gameSystem.drill_BFPT_opacityTo( i, o_data );		//（update函数中，$gameSystem肯定完成了初始化，将缓冲内容重新执行即可）
		$gameSystem._drill_BFPT_dataTank_opacityBuffer[i] = null;
	}
}


//=============================================================================
// ** 战斗永久 漂浮文字窗口【Drill_BFPT_Window】
// **		
// **		作用域：	战斗界面
// **		主功能：	定义一个窗口，能随时改变文本内容和高宽。
// **		子功能：	
// **					->窗口『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **						->初始化数据
// **						->初始化对象
// **					
// **					->A主体
// **						->中心锚点
// **						x->UI基准
// **					->B窗口弹道
// **						->外部控制（drill_BFPT_updateDataMoving）
// **					->C窗口皮肤
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **					->D窗口内容
// **						->窗口字符
// **						->文本域自适应
// **						->定时重绘
// **						->逐个绘制
// **					
// **		说明：	> 该窗口在游戏中创建后永久存在，需要手动销毁。
// **				> 窗口的结构从 Drill_MPFP_Window 借鉴来，但是除了贴图内容，其他部分变化非常大。
//=============================================================================
//==============================
// * 漂浮文字窗口 - 定义
//==============================
function Drill_BFPT_Window() {
    this.initialize.apply(this, arguments);
};
Drill_BFPT_Window.prototype = Object.create(Window_Base.prototype);
Drill_BFPT_Window.prototype.constructor = Drill_BFPT_Window;
//==============================
// * 漂浮文字窗口 - 初始化
//==============================
Drill_BFPT_Window.prototype.initialize = function( data ){
	this._drill_data = data;			//（直接传指针）
	
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_BFPT_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateAttr();			//帧刷新 - A主体
	this.drill_updateBallistics();		//帧刷新 - B窗口弹道
	this.drill_updateSkin();			//帧刷新 - C窗口皮肤
	this.drill_updateMessage();			//帧刷新 - D窗口内容
}
//==============================
// * 漂浮文字窗口 - 初始化数据『独立贴图』
//==============================
Drill_BFPT_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 漂浮文字窗口 - 初始化对象『独立贴图』
//==============================
Drill_BFPT_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();					//初始化对象 - A主体
	this.drill_initBallistics();			//初始化对象 - B窗口弹道
	this.drill_initSkin();					//初始化对象 - C窗口皮肤
	this.drill_initMessage();				//初始化对象 - D窗口内容
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_BFPT_Window.prototype.standardPadding = function(){ return this._drill_data['window_padding']; };			//窗口内边距
Drill_BFPT_Window.prototype.standardFontSize = function(){ return this._drill_data['window_fontsize']; };		//窗口字体大小


//==============================
// * A主体 - 初始化对象
//==============================
Drill_BFPT_Window.prototype.drill_initAttr = function() {
	var data = this._drill_data;
	
	// > 私有属性初始化
	this.x = 0;
	this.y = Graphics.boxHeight*2;
	this.contentsOpacity = 0;			//文本域 透明度
	this.opacity = 0;					//背景容器层 透明度
	
	this._drill_windowWidth = 0;		//窗口宽度
	this._drill_windowHeight = 0;		//窗口高度
	this._drill_curTime = 0;			//当前生命周期（暂未用到）
	
	// > 中心锚点
	this._drill_windowAnchorX = 0;			//中心锚点x
	this._drill_windowAnchorY = 0;			//中心锚点y
	if( data['window_anchor'] == "左上角" ){ this._drill_windowAnchorX = 0.0; this._drill_windowAnchorY = 0.0; }
	if( data['window_anchor'] == "右上角" ){ this._drill_windowAnchorX = 1.0; this._drill_windowAnchorY = 0.0; }
	if( data['window_anchor'] == "左下角" ){ this._drill_windowAnchorX = 0.0; this._drill_windowAnchorY = 1.0; }
	if( data['window_anchor'] == "右下角" ){ this._drill_windowAnchorX = 1.0; this._drill_windowAnchorY = 1.0; }
	if( data['window_anchor'] == "正上方" ){ this._drill_windowAnchorX = 0.5; this._drill_windowAnchorY = 0.0; }
	if( data['window_anchor'] == "正下方" ){ this._drill_windowAnchorX = 0.5; this._drill_windowAnchorY = 1.0; }
	if( data['window_anchor'] == "正左方" ){ this._drill_windowAnchorX = 0.0; this._drill_windowAnchorY = 0.5; }
	if( data['window_anchor'] == "正右方" ){ this._drill_windowAnchorX = 1.0; this._drill_windowAnchorY = 0.5; }
	if( data['window_anchor'] == "正中心" ){ this._drill_windowAnchorX = 0.5; this._drill_windowAnchorY = 0.5; }

	// > UI基准初始位置
	//	（无）
}
//==============================
// * A主体 - 初始化对象
//==============================
Drill_BFPT_Window.prototype.drill_updateAttr = function() {
	
	// > 主体 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B窗口弹道 - 初始化对象
//==============================
Drill_BFPT_Window.prototype.drill_initBallistics = function() {
	//（无）
}
//==============================
// * B窗口弹道 - 帧刷新
//
//			说明：	窗口的弹道由外部控制，见：drill_BFPT_updateDataMoving 。
//==============================
Drill_BFPT_Window.prototype.drill_updateBallistics = function() {
	var data = this._drill_data;
	
	// > 位置 设置
	var xx = data['x'];		//（坐标被外层 移动弹道 控制）
	var yy = data['y'];
	xx -= this._drill_windowWidth * this._drill_windowAnchorX;		//（锚点偏移）
	yy -= this._drill_windowHeight * this._drill_windowAnchorY;
	this.x = xx;
	this.y = yy;
	
	// > 透明度 设置
	var oo = data['opacity'];
	this.contentsOpacity = oo;			//文本域 透明度
	this.opacity = oo;					//背景容器层 透明度
}


//==============================
// * C窗口皮肤 - 初始化对象『窗口皮肤』
//
//			说明：	> 此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_BFPT_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 初始化皮肤样式『窗口皮肤』
	var data = this._drill_data;
	this.drill_resetData_Skin( data );
}
//==============================
// * C窗口皮肤 - 重设数据『窗口皮肤』
//
//			说明：	> data对象中的参数【可以缺项】。
//==============================
Drill_BFPT_Window.prototype.drill_resetData_Skin = function( data ){
	
	// > 插件自定义值『窗口皮肤』
	var window_pic_file1 = "img/Battle__ui/";
	var window_pic_file2 = "img/system/";
	
	// > 默认值
	if( data['window_type'] == undefined ){ data['window_type'] = "默认窗口皮肤" };		//布局模式（默认窗口皮肤/自定义窗口皮肤/自定义背景图片/黑底背景）
	if( data['window_opacity'] == undefined ){ data['window_opacity'] = 255 };			//布局透明度
	if( data['window_sys_src'] == undefined ){ data['window_sys_src'] = "" };			//资源-自定义窗口皮肤
	if( data['window_pic_src'] == undefined ){ data['window_pic_src'] = "" };			//资源-自定义背景图片
	if( data['window_pic_x'] == undefined ){ data['window_pic_x'] = 0 };				//背景图片X
	if( data['window_pic_y'] == undefined ){ data['window_pic_y'] = 0 };				//背景图片Y
	
	if( data['window_tone_lock'] == undefined ){ data['window_tone_lock'] = false };	//是否锁定窗口色调
	if( data['window_tone_r'] == undefined ){ data['window_tone_r'] = 0 };				//窗口色调-红
	if( data['window_tone_g'] == undefined ){ data['window_tone_g'] = 0 };				//窗口色调-绿
	if( data['window_tone_b'] == undefined ){ data['window_tone_b'] = 0 };				//窗口色调-蓝
	
	
	// > 窗口皮肤 - 私有变量初始化
	this._drill_skin_type = data['window_type'];
	this._drill_skin_opacity = data['window_opacity'];
	
	this._drill_skinBackground_width = 0;
	this._drill_skinBackground_height = 0;
	if( data['window_type'] == "自定义背景图片" && data['window_pic_src'] != "" ){
		this._drill_skin_pic_bitmap = ImageManager.loadBitmap( window_pic_file1, data['window_pic_src'], 0, true );
		this._drill_skin_pic_x = data['window_pic_x'];
		this._drill_skin_pic_y = data['window_pic_y'];
	}else{
		this._drill_skin_pic_bitmap = ImageManager.loadEmptyBitmap();
	}
	
	if( data['window_type'] == "自定义窗口皮肤" && data['window_sys_src'] != "" ){
		this._drill_skin_sys_bitmap = ImageManager.loadBitmap( window_pic_file2, data['window_sys_src'], 0, true );
	}else{
		this._drill_skin_sys_bitmap = this._drill_skin_defaultSkin;
	}
	
	this._drill_skin_tone_lock = data['window_tone_lock'];
	this._drill_skin_tone_r = data['window_tone_r'];
	this._drill_skin_tone_g = data['window_tone_g'];
	this._drill_skin_tone_b = data['window_tone_b'];
	
	
	// > 窗口皮肤 - 贴图初始化
	if( this._drill_skinBackground == undefined ){
		this._drill_skinBackground = new Sprite();
		this._windowSpriteContainer.addChild(this._drill_skinBackground);	//（ _windowSpriteContainer 为窗口的最底层贴图）
	}
	
	
	// > 窗口皮肤 - 布局模式
	if( this._drill_skin_type == "默认窗口皮肤" || this._drill_skin_type == "默认窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = 0;							//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;
		
		
	}else if( this._drill_skin_type == "自定义窗口皮肤" || this._drill_skin_type == "系统窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_sys_bitmap;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = 0;							//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;
		
		
	}else if( this._drill_skin_type == "自定义背景图片" || this._drill_skin_type == "图片窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = 0;								//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = 0;							//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = this._drill_skin_opacity;	//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = this._drill_skin_pic_bitmap;
		this._drill_skinBackground.x = this._drill_skin_pic_x;
		this._drill_skinBackground.y = this._drill_skin_pic_y;
		
		
	}else if( this._drill_skin_type == "黑底背景" || this._drill_skin_type == "黑底布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = 0;								//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = 0;							//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = this._drill_skin_opacity;	//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;	//（帧刷新中会自动建立黑色画布）
	}
	
	
	// > 窗口皮肤 - 层级排序
	this._drill_skinBackground.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
}
//==============================
// * C窗口皮肤 - 帧刷新『窗口皮肤』
//==============================
Drill_BFPT_Window.prototype.drill_updateSkin = function() {
	this.drill_updateSkin_skinBackground();		//帧刷新 - 高宽变化
												//帧刷新 - 透明度锁定（无）
}
//==============================
// * C窗口皮肤 - 帧刷新 - 高宽变化『窗口皮肤』
//==============================
Drill_BFPT_Window.prototype.drill_updateSkin_skinBackground = function() {
	if( this._drill_windowWidth == undefined ){ return; }
	if( this._drill_windowHeight == undefined ){ return; }
	
	// > 高宽变化 - 锁
	if( this._drill_skinBackground_width  == this._drill_windowWidth &&
		this._drill_skinBackground_height == this._drill_windowHeight ){
		return;
	}
	this._drill_skinBackground_width = this._drill_windowWidth;
	this._drill_skinBackground_height = this._drill_windowHeight;
	
	// > 高宽变化 - 背景图片（重置中心锚点）
	if( this._drill_skin_type == "自定义背景图片" || this._drill_skin_type == "图片窗口布局" ){
		var xx = this._drill_skin_pic_x;
		var yy = this._drill_skin_pic_y;
		var anchor_x = this._drill_windowAnchorX || 0;
		var anchor_y = this._drill_windowAnchorY || 0;
		xx += this._drill_windowWidth  * anchor_x;
		yy += this._drill_windowHeight * anchor_y;
		this._drill_skinBackground.x = xx;
		this._drill_skinBackground.y = yy;
		this._drill_skinBackground.anchor.x = anchor_x;
		this._drill_skinBackground.anchor.y = anchor_y;
	}
	
	// > 高宽变化 - 黑底背景（重建黑色画布）
	if( this._drill_skin_type == "黑底背景" || this._drill_skin_type == "黑底布局" ){
		this._drill_skinBackground_BlackBitmap = new Bitmap(this._drill_windowWidth, this._drill_windowHeight);
		this._drill_skinBackground_BlackBitmap.fillRect(0, 0 , this._drill_windowWidth, this._drill_windowHeight, "#000000");
		this._drill_skinBackground.bitmap = this._drill_skinBackground_BlackBitmap;
	}
}
//==============================
// * C窗口皮肤 - 帧刷新色调『窗口皮肤』
//
//			说明：	> setTone可以反复调用赋值，因为函数内有变化监听锁。
//==============================
var _drill_BFPT_updateTone = Drill_BFPT_Window.prototype.updateTone;
Drill_BFPT_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_BFPT_updateTone.call( this );
}


//==============================
// * D窗口内容 - 初始化对象
//==============================
Drill_BFPT_Window.prototype.drill_initMessage = function(){
	this._drill_BFPT_curTime = 0;
	
	var context = this._drill_data['context'];
	this.drill_refreshMessage( context );
}
//==============================
// * D窗口内容 - 帧刷新
//==============================
Drill_BFPT_Window.prototype.drill_updateMessage = function(){
	
	var data = this._drill_data;
	if( data['timedRedraw_enabled'] == true ){
		
		// > 『定时重绘』 时间+1
		this._drill_BFPT_curTime += 1;
		
		// > 『定时重绘』 执行
		if( this._drill_BFPT_curTime % data['timedRedraw_time'] == 1 ){	//（不要在0值刷新，可能会浪费刷很多次）
			var context = data['context'];
			this.drill_refreshMessage( context );
		}
	}
	if( data['timing_enabled'] == true ){
		
		// > 逐个绘制 - 重新逐个绘制
		if( data['timing_needRedraw'] != undefined ){
			data['timing_needRedraw'] = undefined;
			var context = data['context'];
			this.drill_refreshMessage( context );	//（刷新文本）
		}
		
		// > 逐个绘制 - 『字符逐个绘制流程』 - 逐个绘制帧刷新【窗口字符 - 窗口字符核心】
		if( this.contents != undefined ){
			this.contents.drill_COWC_timing_updateTick();
		}
	}
}
//==============================
// * D窗口内容 - 刷新内容
//==============================
Drill_BFPT_Window.prototype.drill_refreshMessage = function( context ){

	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = context;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 1;	//『窗口字符差1像素的切割问题』
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth']  = 100;	//（此参数暂时不用，先给个非零值）
	options['infoParam']['canvasHeight'] = 100;
	
	// > 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = this.standardFontSize();	//（使用当前窗口的字体大小）
	
	// > 参数准备 - 『字符主流程』 - 获取文本高宽【窗口字符 - 窗口字符核心】
	var ww = this.drill_COWC_getOrgTextWidth( org_text, options );
	var hh = this.drill_COWC_getOrgTextHeight( org_text, options );
	ww = Math.ceil(ww);
	hh = Math.ceil(hh);
	options['infoParam']['canvasWidth']  = ww;
	options['infoParam']['canvasHeight'] = hh;
	
	
	// > 自适应 - 设置窗口高宽
	ww += this.standardPadding() * 2;		//（使用当前窗口的内边距）
	hh += this.standardPadding() * 2;
	ww += 2;								//『窗口字符差1像素的切割问题』
	this._drill_windowWidth = ww;
	this._drill_windowHeight = hh;
	this.width = this._drill_windowWidth;		//（窗口宽度）
	this.height = this._drill_windowHeight;		//（窗口高度）
	
	// > 自适应 - 重建画布（自适应高宽需要重建）
	this.createContents();
	temp_bitmap = this.contents;			//（临时画布重新绑定）
	
	
	var data = this._drill_data;
	if( data['timing_enabled'] != true ){
		
		// > 『字符主流程』 - DEBUG显示画布范围【窗口字符 - 窗口字符核心】
		//temp_bitmap.drill_COWC_debug_drawRect();
		
		// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
		this.drill_COWC_drawText( org_text, options );
		
	}else{
		
		// > 『字符逐个绘制流程』 - 设置计时器间隔【窗口字符 - 窗口字符核心】
		var interval = data['timing_interval'];
		if( interval == undefined || interval < 1 ){
			interval = 4;
		}
		temp_bitmap.drill_COWC_timing_setPerTick( interval );
			
		// > 『字符逐个绘制流程』 - 逐个绘制初始化【窗口字符 - 窗口字符核心】
		temp_bitmap.drill_COWC_timing_initDrawText( org_text, options );
		
	}
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * D窗口内容 - 刷新内容 - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_BFPT_getPluginTip_NeedUpdate_drawText() );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleFloatingPermanentText = false;
		var pluginTip = DrillUp.drill_BFPT_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
