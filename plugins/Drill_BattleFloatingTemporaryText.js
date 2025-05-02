//=============================================================================
// Drill_BattleFloatingTemporaryText.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        战斗UI - 临时漂浮文字
 * @author Drill_up
 * 
 * @Drill_LE_param "临时漂浮样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BFTT_style_length"
 * 
 * @Drill_LE_param "临时漂浮弹道-%d"
 * @Drill_LE_parentKey "---弹道组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BFTT_ballistics_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleFloatingTemporaryText +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在战斗界面快速生成临时的漂浮文字。
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
 *   临时对象相关内容，去看看文档 "13.UI > 关于临时对象与模板.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 细节：
 *   (1.漂浮文字本质上是一个窗口，可以显示窗口外框。
 *   (2.你可以将漂浮文字放置在战斗层级的 下层、上层、图片层、
 *      最顶层 中。
 *   (3.漂浮文字只是临时性的贴图，不建议设计为长期滞留的文字，
 *      刷菜单可以刷掉漂浮文字。
 * 弹道：
 *   (1.漂浮文字的弹道支持情况如下：
 *        极坐标模式    √
 *        直角坐标模式  √
 *        轨道锚点模式  √
 *        两点式        x
 *   (2.单个漂浮文字的轨迹完全可以通过弹道设置进行设计。
 *      具体配置方式可以看看 "32.数学模型 > 关于弹道.docx"。
 * 逐个绘制：
 *   (1.该文本域 支持 消息输入字符。
 *   (2.该文本域的绘制方式为 逐个绘制，即在一段时间内持续绘制文本。
 *      持续绘制时如果重置文本，则会重新 逐个绘制 。
 *   (3.该插件只能通过 配置样式 来启用逐个绘制。
 * 设计：
 *   (1.你可以添加一些简单的字符串，用来表示 "生命+10" 这些漂浮文字。
 *      也可以用来表现某些技能释放的漂浮文字提示。
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
 * ----激活条件 - 简单指令
 * 你可以通过插件指令快速生成对象：
 * 
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-敌方[1] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-敌方[1] : 文本[一段文字] : 样式[1]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-敌方[1] : 文本[一段文字] : 样式[1] : 弹道[1]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-敌方[1] : 文本[一段文字] : 样式[1] : 弹道[1] : 持续时间[20]
 * 
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置[100,200] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置变量[25,26] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-敌方[1] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-敌方变量[21] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-我方[1] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-我方变量[21] : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 简单临时对象 : 位置-鼠标 : 文本[一段文字]
 * 
 * 1.前半部分（位置-敌方[1]）和 后半部分（文本[一段文字]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.临时对象创建后，持续时间结束会自动清掉。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 高级指令
 * 你可以通过插件指令控制临时对象的具体参数：
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 初始化 : 样式[1] : 弹道[1]
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-内容文本 : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-内容文本 : 字符串[21]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-额外位置偏移 : 偏移[-10,20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-UI基准 : 相对于战斗场景
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-UI基准 : 相对于镜头
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-战斗层级 : 下层
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-战斗层级 : 上层
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-战斗层级 : 图片层
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-战斗层级 : 最顶层
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-图片层级 : 图片层级[4]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-布局透明度 : 透明度[255]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-布局透明度 : 透明度变量[21]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-锁定窗口色调 : 开启锁定
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-锁定窗口色调 : 关闭锁定
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-窗口色调 : 色调[0,0,0]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-窗口附加宽度 : 值[+5]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-窗口附加高度 : 值[+5]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-逐个绘制 : 开启
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-逐个绘制 : 关闭
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-开始移动前延迟时间 : 时长[60]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-移动结束后等待时间 : 时长[60]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-极坐标模式-初速度 : 速度[1.0]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-极坐标模式-固定方向 : 角度[90.0]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-极坐标模式-固定方向 : 角度变量[21]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-极坐标模式-扇形朝向 : 角度[90.0]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-极坐标模式-扇形朝向 : 角度变量[21]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-直角坐标模式-X轴初速度 : 速度[1.0]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-直角坐标模式-Y轴初速度 : 速度[1.0]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改弹道属性-轨道锚点模式-轨道初速度 : 速度[1.0]
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置[100,200] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置变量[25,26] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置-鼠标 : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置-敌方[1] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置-敌方变量[21] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置-我方[1] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置-我方变量[21] : 持续时间[20]
 * 
 * 1.插件指令需要先后执行： 初始化、修改样式属性、修改弹道属性、创建 。
 *   如果 样式属性/弹道属性 不需要变化，直接先后执行： 初始化、创建 即可。
 *   临时对象创建之后，将不再受控制。
 * 2.注意你配置的 弹道 的 模式与类型 ，比如 速度类型、方向类型，
 *   并不是修改了任意属性就都会生效，还要看配置的类型是否用到了该参数。
 *   比如 "修改弹道属性-固定方向"，只在 方向类型 为 固定方向 的情况下才有效。
 * 3.临时对象创建后，持续时间结束会自动清掉。
 * 4."位置-敌方[2]"指敌人的具体位置，这个位置随时可能会变化，
 *   比如漂浮的小爱丽丝，其位置一直上下漂浮变化。
 * 5."修改样式属性-内容文本"中的"字符串"对应字符串核心中指定编号的自定义文本。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 空格支持
 * 插件指令下面的写法也是有效的：
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改样式属性-内容文本 : 文本[药水 + 1]
 * 
 * 1.你可以在该插件指令中的文本使用空格。
 *   从原则上来说，脚本会将插件指令的空格分开，所以含空格的写法是不推荐的。
 * 2.建议使用 字符串 来控制，字符串不仅支持空格，还支持 换行符 。
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
 * 测试方法：   在战斗时连续创建10个左右的临时飘浮文字。
 * 测试结果1：  在战斗界面中，平均消耗为：【16.71ms】
 * 测试结果2：  创建飘浮文字一小段时间内，平均消耗为：【23.17ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.注意，由于飘浮文字是实时创建的，创建时会在短时间内产生较高的
 *   消耗。创建后消耗便趋于稳定。
 * 3.所以你需要尽量少在同一帧时间内创造大量飘浮文字，可能会卡。
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
 * 大幅度改进了 插件指令 结构，完善了 临时对象 的设置。
 * [v1.4]
 * 添加了漂浮文字外框设置色调的功能。
 * [v1.5]
 * 修复了使用自定义窗口皮肤时文字变黑的bug。
 * [v1.6]
 * 更新并兼容了新的窗口字符底层。
 *
 *
 *
 * @param 简单指令的默认样式
 * @type number
 * @min 1
 * @desc 简单指令若未配置样式时，则使用默认样式。默认样式对应配置样式的编号。
 * @default 1
 * 
 * @param 简单指令的默认弹道
 * @type number
 * @min 1
 * @desc 简单指令若未配置弹道时，则使用默认弹道。默认样式对应配置样式的弹道。
 * @default 1
 * 
 * @param 简单指令的默认持续时间
 * @type number
 * @min 1
 * @desc 简单指令若未配置持续时间时，则使用默认的持续时间。
 * @default 120
 * 
 * 
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 临时漂浮样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==文字（相对于战斗）==","--常规--":"","默认内容文本":"\"\"","--层级--":"","UI基准":"相对于战斗场景","战斗层级":"图片层","战斗图片层级":"80","--窗口--":"","布局模式":"黑底背景","布局透明度":"0","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","窗口中心锚点":"正中心","窗口内边距":"10","窗口字体大小":"22","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 临时漂浮样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==文字（相对于镜头）==","--常规--":"","默认内容文本":"\"\"","--层级--":"","UI基准":"相对于镜头","战斗层级":"图片层","战斗图片层级":"80","--窗口--":"","布局模式":"黑底背景","布局透明度":"0","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","窗口中心锚点":"正中心","窗口内边距":"10","窗口字体大小":"22","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 临时漂浮样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==带框文字（相对于战斗）==","--常规--":"","默认内容文本":"\"\"","--层级--":"","UI基准":"相对于战斗场景","战斗层级":"图片层","战斗图片层级":"80","--窗口--":"","布局模式":"默认窗口皮肤","布局透明度":"255","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","窗口中心锚点":"正中心","窗口内边距":"10","窗口字体大小":"22","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 临时漂浮样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==带框文字（相对于战斗）==","--常规--":"","默认内容文本":"\"\"","--层级--":"","UI基准":"相对于镜头","战斗层级":"图片层","战斗图片层级":"80","--窗口--":"","布局模式":"默认窗口皮肤","布局透明度":"255","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","窗口中心锚点":"正中心","窗口内边距":"10","窗口字体大小":"22","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 临时漂浮样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 *
 * @param ---弹道组 1至20---
 * @default 
 * 
 * @param 临时漂浮弹道-1
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-匀速向上==","开始移动前延迟时间":"0","移动结束后等待时间":"0","透明度模式":"先显现后消失","移动模式":"极坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"固定方向","固定方向":"270","扇形朝向":"270.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"0.0","X轴速度随机波动量":"0.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"-1.5","Y轴速度随机波动量":"0.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-2
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-匀速向上(小幅度随机)==","开始移动前延迟时间":"0","移动结束后等待时间":"0","透明度模式":"先显现后消失","移动模式":"极坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.5","速度随机波动量":"1.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"扇形范围方向(随机)","固定方向":"270.0","扇形朝向":"270.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"1.0","X轴速度随机波动量":"2.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"1.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-3
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-减速向上==","开始移动前延迟时间":"0","移动结束后等待时间":"0","透明度模式":"先显现后消失","移动模式":"极坐标模式","---极坐标模式---":"","速度类型":"初速度+波动量+加速度+最大最小","初速度":"3.0","速度随机波动量":"0.0","加速度":"-0.2","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"固定方向","固定方向":"270","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"0.0","X轴速度随机波动量":"0.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"-1.5","Y轴速度随机波动量":"0.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-4
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-抛物线==","开始移动前延迟时间":"0","移动结束后等待时间":"0","透明度模式":"先显现后消失","移动模式":"直角坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"初速度+波动量","X轴初速度":"0.0","X轴速度随机波动量":"3.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"初速度+波动量+加速度+最大最小","Y轴初速度":"-12.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.4","Y轴最大速度":"99.0","Y轴最小速度":"-20.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-5
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-螺旋锚点轨道==","开始移动前延迟时间":"0","移动结束后等待时间":"0","透明度模式":"匀速消失","移动模式":"轨道锚点模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"1.0","X轴速度随机波动量":"2.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"1.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(51,5),(64,47),(-8,69),(-70,18),(-45,-48),(28,-59),(97,-18),(111,44),(47,101),(-41,104),(-100,56),(-108,-19),(-72,-85),(25,-110),(134,-68)","轨道速度类型":"只初速度","轨道初速度":"5.5","轨道速度随机波动量":"0.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-6
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-7
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-8
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-9
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-10
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-11
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-12
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-13
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-14
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-15
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-16
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-17
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-18
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-19
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-20
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillBFTTStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的临时漂浮样式==
 * 
 * 
 * @param ---常规---
 * @default 
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
 * @default 80
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
 * @default 
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
/*~struct~DrillBFTTBallistic:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的临时漂浮弹道==
 *
 * 
 * @param 开始移动前延迟时间
 * @type number
 * @min 0
 * @desc 漂浮文字开始移动前的延迟时间，单位帧。（1秒60帧）
 * @default 0
 * 
 * @param 移动结束后等待时间
 * @type number
 * @min 0
 * @desc 漂浮文字移动结束后的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 *  
 * @param 透明度模式
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 逐渐显现
 * @value 逐渐显现
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 等一半时间后逐渐消失
 * @value 等一半时间后逐渐消失
 * @option 前一半时间先显现再保持
 * @value 前一半时间先显现再保持
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 漂浮文字的消失方式。
 * @default 逐渐消失
 *
 * 
 * @param 移动模式
 * @type select
 * @option 直角坐标模式
 * @value 直角坐标模式
 * @option 极坐标模式
 * @value 极坐标模式
 * @option 轨道锚点模式
 * @value 轨道锚点模式
 * @desc 描述漂浮文字运动的模式。
 * @default 极坐标模式
 * 
 * @param ---极坐标模式---
 * @desc 
 *
 * @param 速度类型
 * @parent ---极坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 只初速度
 * 
 * @param 初速度
 * @parent 速度类型
 * @desc 漂浮文字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param 速度随机波动量
 * @parent 速度类型
 * @desc 漂浮文字速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param 加速度
 * @parent 速度类型
 * @desc 漂浮文字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 最大速度
 * @parent 速度类型
 * @desc 漂浮文字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param 最小速度
 * @parent 速度类型
 * @desc 漂浮文字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 路程计算公式
 * @parent 速度类型
 * @type note
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "32.数学模型 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * @param 方向类型
 * @parent ---极坐标模式---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向计算公式
 * @value 方向计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 固定方向
 * 
 * @param 固定方向
 * @parent 方向类型
 * @desc 类型为"固定方向"时，固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
 * @default 90.0
 * 
 * @param 扇形朝向
 * @parent 方向类型
 * @desc 类型为"扇形范围方向"时，扇形的朝向角度。0朝右，90朝下，180朝左，270朝上。
 * @default 45.0
 * 
 * @param 扇形角度
 * @parent 方向类型
 * @desc 类型为"扇形范围方向"时，扇形弧的角度数。
 * @default 90.0
 * 
 * @param 方向计算公式
 * @parent 方向类型
 * @type note
 * @desc 类型为"方向计算公式"时。可使用 变量和常量 来设计公式，具体看看文档 "32.数学模型 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * @param ---直角坐标模式---
 * @desc 
 * 
 * @param 直角坐标整体旋转
 * @parent ---直角坐标模式---
 * @desc 将下面设计好的xy公式，进行整体旋转，单位角度。
 * @default 0.0
 *
 * @param X轴速度类型
 * @parent ---直角坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 只初速度
 * 
 * @param X轴初速度
 * @parent X轴速度类型
 * @desc 漂浮文字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param X轴速度随机波动量
 * @parent X轴速度类型
 * @desc 漂浮文字速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param X轴加速度
 * @parent X轴速度类型
 * @desc 漂浮文字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴最大速度
 * @parent X轴速度类型
 * @desc 漂浮文字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param X轴最小速度
 * @parent X轴速度类型
 * @desc 漂浮文字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴路程计算公式
 * @parent X轴速度类型
 * @type note
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "32.数学模型 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 *
 * @param Y轴速度类型
 * @parent ---直角坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 只初速度
 * 
 * @param Y轴初速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param Y轴速度随机波动量
 * @parent Y轴速度类型
 * @desc 漂浮文字速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param Y轴加速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴最大速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param Y轴最小速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴路程计算公式
 * @parent Y轴速度类型
 * @type note
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "32.数学模型 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * 
 * @param ---轨道锚点模式---
 * @desc 
 * 
 * @param 轨道锚点整体旋转
 * @parent ---轨道锚点模式---
 * @desc 将下面设计好的锚点，进行整体旋转，单位角度。
 * @default 0.0
 * 
 * @param 锚点列表
 * @parent ---轨道锚点模式---
 * @desc 锚点列表。
 * @default (0,0),(100,0)
 *
 * @param 轨道速度类型
 * @parent ---轨道锚点模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述子弹速度的模式。
 * @default 只初速度
 * 
 * @param 轨道初速度
 * @parent 轨道速度类型
 * @desc 子弹的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param 轨道速度随机波动量
 * @parent 轨道速度类型
 * @desc 子弹速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param 轨道加速度
 * @parent 轨道速度类型
 * @desc 子弹的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 轨道最大速度
 * @parent 轨道速度类型
 * @desc 子弹的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param 轨道最小速度
 * @parent 轨道速度类型
 * @desc 子弹的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 轨道路程计算公式
 * @parent 轨道速度类型
 * @type note
 * @desc 子弹的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "32.数学模型 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BFTT (Gauge_Floating_Temporary_Text)
//		临时全局变量	DrillUp.g_BFTT_xxx
//		临时局部变量	this._drill_BFTT_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	战斗场景
//		★性能测试消耗	5.01ms（未工作时，update）
//		★最坏情况		使用临时漂浮文字添加了大量窗口。
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
//				->简单指令
//				->高级指令
//			->☆预加载
//			->☆场景容器之单位贴图
//				->获取 - 敌人容器指针【标准函数】
//				->获取 - 根据敌方索引【标准函数】
//				->获取 - 根据敌人ID【标准函数】
//				->获取 - 角色容器指针【标准函数】
//				->获取 - 根据我方索引【标准函数】
//				->获取 - 根据角色ID【标准函数】
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆临时对象
//				->高级指令 初始化
//				->高级指令 创建
//				->修改样式属性
//				->修改弹道属性
//			->☆贴图控制
//			
//			->战斗临时 漂浮文字窗口【Drill_BFTT_Window】
//				->A主体
//				->B窗口弹道
//				->C窗口皮肤
//				->D窗口内容
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
//			* 战斗临时 漂浮文字窗口【Drill_BFTT_Window】
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
	DrillUp.g_BFTT_PluginTip_curName = "Drill_BattleFloatingTemporaryText.js 战斗UI-临时漂浮文字";
	DrillUp.g_BFTT_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BFTT_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BFTT_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BFTT_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BFTT_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BFTT_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_BFTT_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_BFTT_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少支持的插件
	//==============================
	DrillUp.drill_BFTT_getPluginTip_NoSupportPlugin = function(){
		return "【" + DrillUp.g_BFTT_PluginTip_curName + "】\n缺少 字符串核心 插件，插件指令执行失败。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 内容文本为空
	//==============================
	DrillUp.drill_BFTT_getPluginTip_DataIsEmpty = function(){
		return "【" + DrillUp.g_BFTT_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，内容文本为空，将不显示任何文本。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 未初始化
	//==============================
	DrillUp.drill_BFTT_getPluginTip_BufferIsNull = function(){
		return "【" + DrillUp.g_BFTT_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，未执行临时对象的初始化指令。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_BFTT_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_BFTT_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_BattleFloatingTemporaryText = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleFloatingTemporaryText');
	
	
	//==============================
	// * 静态数据 - 临时漂浮样式
	//				（~struct~DrillBFTTStyle）
	//==============================
	DrillUp.drill_BFTT_initContext = function( dataFrom ) {
		var data = {};
		
		// > 常规
		if( dataFrom["默认内容文本"] != undefined && 
			dataFrom["默认内容文本"] != "" ){
			data['context'] = JSON.parse( dataFrom["默认内容文本"] );
		}else{
			data['context'] = "";
		}
		
		// > 层级
		data['window_benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['window_battle_layer'] = String( dataFrom["战斗层级"] || "");
		data['window_battle_zIndex'] = Number( dataFrom["战斗图片层级"] || 10);
		
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
		
		// > 逐个绘制
		data['timing_enabled'] = String( dataFrom["是否启用逐个绘制"] || "false") == "true";
		data['timing_interval'] = Number( dataFrom["逐个绘制间隔时间"] || 4);
		
		data['offsetEx_x'] = 0;	//（额外位置偏移，注意此配置在样式中）
		data['offsetEx_y'] = 0;
		return data;
	}
	//==============================
	// * 静态数据 - 弹道样式
	//				（~struct~DrillBFTTBallistic）
	//==============================
	DrillUp.drill_BFTT_initBallistics = function( dataFrom ) {
		var data = {};
		
		// > 透明度（opacity）
		data['opacity_type'] = String( dataFrom["透明度模式"] || "等一半时间后逐渐消失" );
		
		// > 移动（movement）
		data['movementNum'] = 1;
		data['movementTime'] = 20;
		data['movementDelay'] = Number( dataFrom["开始移动前延迟时间"] || 0);
		data['movementEndDelay'] = Number( dataFrom["移动结束后等待时间"] || 0);
		data['movementMode'] = String( dataFrom["移动模式"] || "极坐标模式" );
		//   极坐标（polar）
		data['polarSpeedType'] = String( dataFrom["速度类型"] || "只初速度" );
		data['polarSpeedBase'] = Number( dataFrom["初速度"] || 0.0);
		data['polarSpeedRandom'] = Number( dataFrom["速度随机波动量"] || 0.0);
		data['polarSpeedInc'] = Number( dataFrom["加速度"] || 0);
		data['polarSpeedMax'] = Number( dataFrom["最大速度"] || 0);
		data['polarSpeedMin'] = Number( dataFrom["最小速度"] || 0);
		var temp_str = String( dataFrom["路程计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['polarDistanceFormula'] = temp_str;
		data['polarDirType'] = String( dataFrom["方向类型"] || "固定方向" );
		data['polarDirFixed'] = Number( dataFrom["固定方向"] || 0);
		data['polarDirSectorFace'] = Number( dataFrom["扇形朝向"] || 0);
		data['polarDirSectorDegree'] = Number( dataFrom["扇形角度"] || 0);
		temp_str = String( dataFrom["方向计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['polarDirFormula'] = temp_str;
		//   直角坐标（cartesian）
		data['cartRotation'] = Number( dataFrom["直角坐标整体旋转"] || 0.0);
		data['cartXSpeedType'] = String( dataFrom["X轴速度类型"] || "只初速度" );
		data['cartXSpeedBase'] = Number( dataFrom["X轴初速度"] || 0.0);
		data['cartXSpeedRandom'] = Number( dataFrom["X轴速度随机波动量"] || 0.0);
		data['cartXSpeedInc'] = Number( dataFrom["X轴加速度"] || 0);
		data['cartXSpeedMax'] = Number( dataFrom["X轴最大速度"] || 0);
		data['cartXSpeedMin'] = Number( dataFrom["X轴最小速度"] || 0);
		temp_str = String( dataFrom["X轴路程计算公式"] || "return 0" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['cartXDistanceFormula'] = temp_str;
		data['cartYSpeedType'] = String( dataFrom["Y轴速度类型"] || "只初速度" );
		data['cartYSpeedBase'] = Number( dataFrom["Y轴初速度"] || 0.0);
		data['cartYSpeedRandom'] = Number( dataFrom["Y轴速度随机波动量"] || 0.0);
		data['cartYSpeedInc'] = Number( dataFrom["Y轴加速度"] || 0);
		data['cartYSpeedMax'] = Number( dataFrom["Y轴最大速度"] || 0);
		data['cartYSpeedMin'] = Number( dataFrom["Y轴最小速度"] || 0);
		temp_str = String( dataFrom["Y轴路程计算公式"] || "return 0" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['cartYDistanceFormula'] = temp_str;
		//   轨道锚点（track）
		data['trackRotation'] = Number( dataFrom["轨道锚点整体旋转"] || 0.0);
		var temp_str = String( dataFrom["锚点列表"] || "" );
		data['trackPointTank'] = DrillUp.drill_COBa_convertStringToPointList( temp_str );
		data['trackSpeedType'] = String( dataFrom["轨道速度类型"] || "只初速度" );
		data['trackSpeedBase'] = Number( dataFrom["轨道初速度"] || 0.0);
		data['trackSpeedRandom'] = Number( dataFrom["轨道速度随机波动量"] || 0.0);
		data['trackSpeedInc'] = Number( dataFrom["轨道加速度"] || 0);
		data['trackSpeedMax'] = Number( dataFrom["轨道最大速度"] || 0);
		data['trackSpeedMin'] = Number( dataFrom["轨道最小速度"] || 0);
		var temp_str = String( dataFrom["轨道路程计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		//   两点式（twoPoint）（关闭）
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_BFTT_simple_defaultStyleId = Number(DrillUp.parameters["简单指令的默认样式"] || 1); 
	DrillUp.g_BFTT_simple_defaultBallisticsId = Number(DrillUp.parameters["简单指令的默认弹道"] || 1); 
	DrillUp.g_BFTT_simple_defaultTime = Number(DrillUp.parameters["简单指令的默认持续时间"] || 60); 
	
	/*-----------------临时漂浮样式集合------------------*/
	DrillUp.g_BFTT_style_length = 20;
	DrillUp.g_BFTT_style = [];
	for( var i = 0; i < DrillUp.g_BFTT_style_length; i++ ){
		if( DrillUp.parameters["临时漂浮样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["临时漂浮样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["临时漂浮样式-" + String(i+1) ]);
			DrillUp.g_BFTT_style[i] = DrillUp.drill_BFTT_initContext( temp );
		}else{
			DrillUp.g_BFTT_style[i] = DrillUp.drill_BFTT_initContext( {} );
		}
	}
	
	/*-----------------临时漂浮弹道------------------*/
	DrillUp.g_BFTT_ballistics_length = 20;
	DrillUp.g_BFTT_ballistics = [];
	for( var i = 0; i < DrillUp.g_BFTT_ballistics_length; i++ ){
		if( DrillUp.parameters["临时漂浮弹道-" + String(i+1) ] != undefined &&
			DrillUp.parameters["临时漂浮弹道-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["临时漂浮弹道-" + String(i+1) ]);
			DrillUp.g_BFTT_ballistics[i] = DrillUp.drill_BFTT_initBallistics( temp );
		}else{
			DrillUp.g_BFTT_ballistics[i] = DrillUp.drill_BFTT_initBallistics( {} );
		}
	}


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
var _drill_BFTT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_BFTT_pluginCommand.call(this, command, args);
	this.drill_BFTT_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_BFTT_pluginCommand = function( command, args ){
	if( command === ">战斗临时漂浮文字" ){
		
		
		/*-----------------简单指令------------------*/
		if( args.length >= 6 ){		//（考虑变化参数数量情况，但不考虑 文本含空格 情况）
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "简单临时对象" ){
				
				var pos = null;
				if( temp1.indexOf("位置-敌方变量[") != -1 || temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方变量[","");
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFTT_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-敌方[") != -1 || temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方[","");
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFTT_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方变量[") != -1 || temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-我方变量[","");
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFTT_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方[") != -1 || temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("位置-我方[","");
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFTT_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
				}else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
				}else if( temp1 == "位置-鼠标" || temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				
				if( pos != null ){
					if( temp2.indexOf("文本[") != -1 ){
						temp2 = temp2.replace("文本[","");
						temp2 = temp2.replace(/\]$/,"");	//（去掉末尾的]）
					}
					var style_id = args[7];
					var ballistics_id = args[9];
					var sustain_time = args[11];
					if( style_id != undefined ){
						style_id = style_id.replace("样式[","");
						style_id = style_id.replace("]","");
						style_id = Number(style_id)-1; 
					}
					if( ballistics_id != undefined ){
						ballistics_id = ballistics_id.replace("弹道[","");
						ballistics_id = ballistics_id.replace("]","");
						ballistics_id = Number(ballistics_id)-1;
					}
					if( sustain_time != undefined ){
						sustain_time = sustain_time.replace("持续时间[","");
						sustain_time = sustain_time.replace("]","");
						sustain_time = Number(sustain_time);
					}
					$gameTemp.drill_BFTT_createSimple( pos, temp2, style_id, ballistics_id, sustain_time );
				}
			}
		}
		
		
		/*-----------------高级指令 - 初始化------------------*/
		if( args.length == 8 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( unit == "临时对象" && type == "初始化" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				temp2 = temp2.replace("弹道[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2)-1;
				$gameTemp.drill_BFTT_setBuffer( temp1, temp2 );
			}
		}
		
		/*-----------------高级指令 - 修改样式属性------------------*/
		if( args.length >= 6 ){		//（考虑变化参数数量情况）
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" ){
				
				if( type == "修改样式属性-内容文本" || type == "修改内容文本" ){
					if( temp1.indexOf("字符串[") != -1 ){
						if( Imported.Drill_CoreOfString ){
							temp1 = temp1.replace("字符串[","");
							temp1 = temp1.replace("]","");
							temp1 = $gameStrings.value( Number(temp1) );
							$gameTemp.drill_BFTT_setStyle_context( temp1 );
						}else{
							alert( DrillUp.drill_BFTT_getPluginTip_NoSupportPlugin() );
						}
					}else{
						var data_str = "";	//（支持空格的多行结构）
						for(var m = 5; m < args.length ; m++ ){
							data_str += String(args[ m ]);
							if( m < args.length-1 ){  data_str += " "; }
						}
						if( data_str.indexOf("文本[") != -1 ){
							data_str = data_str.replace("文本[","");
							data_str = data_str.replace(/\]$/,"");	//（去掉末尾的]）
						}
						$gameTemp.drill_BFTT_setStyle_context( data_str );
						
					}
				}
			}
		}
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" ){
				
				if( type == "修改样式属性-额外位置偏移" || type == "修改额外位置偏移" ){
					temp1 = temp1.replace("偏移[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						$gameTemp.drill_BFTT_setStyle_offset( Number(temp1[0]), Number(temp1[1]) );
					}
				}
				if( type == "修改样式属性-UI基准" ){
					$gameTemp.drill_BFTT_setStyle_benchmark( temp1 );
				}
				if( type == "修改样式属性-战斗层级" ){
					$gameTemp.drill_BFTT_setStyle_layer( temp1 );
				}
				if( type == "修改样式属性-图片层级" ){
					temp1 = temp1.replace("图片层级[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setStyle_zIndex( Number(temp1) );
				}
				if( type == "修改样式属性-布局透明度" ){
					if( temp1.indexOf("透明度变量[") != -1 ){
						temp1 = temp1.replace("透明度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFTT_setStyle_opacity( temp1 );
					}
					else if( temp1.indexOf("透明度[") != -1 ){
						temp1 = temp1.replace("透明度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFTT_setStyle_opacity( temp1 );
					}
				}
				if( type == "修改样式属性-锁定窗口色调" ){
					if( temp1 == "开启锁定" ){
						$gameTemp.drill_BFTT_setStyle_toneLock( true );
					}
					if( temp1 == "关闭锁定" ){
						$gameTemp.drill_BFTT_setStyle_toneLock( false );
					}
				}
				if( type == "修改样式属性-窗口色调" ){
					temp1 = temp1.replace("色调[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 3 ){
						$gameTemp.drill_BFTT_setStyle_tone( Number(temp1[0]), Number(temp1[1]), Number(temp1[2]) );
					}
				}
				if( type == "修改样式属性-窗口附加宽度" ){
					temp1 = temp1.replace("值[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setStyle_exWidth( Number(temp1) );
				}
				if( type == "修改样式属性-窗口附加高度" ){
					temp1 = temp1.replace("值[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setStyle_exHeight( Number(temp1) );
				}
				if( type == "修改样式属性-逐个绘制" ){
					if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
						$gameTemp.drill_BFTT_setStyle_timingEnabled( true );
					}
					if( temp1 == "关闭" || temp1 == "禁用" ){
						$gameTemp.drill_BFTT_setStyle_timingEnabled( false );
					}
				}
			}
		}
		
		/*-----------------高级指令 - 修改弹道属性------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" ){
				
				if( type == "修改弹道属性-开始移动前延迟时间" ){
					temp1 = temp1.replace("时长[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setBallistics_movementDelay( Number(temp1) );
				}
				if( type == "修改弹道属性-移动结束后等待时间" ){
					temp1 = temp1.replace("时长[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setBallistics_movementEndDelay( Number(temp1) );
				}
				if( type == "修改弹道属性-极坐标模式-初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setBallistics_polarSpeedBase( Number(temp1) );
				}
				if( type == "修改弹道属性-极坐标模式-固定方向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFTT_setBallistics_polarDirFixed( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFTT_setBallistics_polarDirFixed( temp1 );
					}
				}
				if( type == "修改弹道属性-极坐标模式-扇形朝向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFTT_setBallistics_polarDirSectorFace( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFTT_setBallistics_polarDirSectorFace( temp1 );
					}
				}
				if( type == "修改弹道属性-直角坐标模式-X轴初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setBallistics_cartXSpeedBase( Number(temp1) );
				}
				if( type == "修改弹道属性-直角坐标模式-Y轴初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setBallistics_cartYSpeedBase( Number(temp1) );
				}
				if( type == "修改弹道属性-轨道锚点模式-轨道初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFTT_setBallistics_trackSpeedBase( Number(temp1) );
				}
			}
		}
		
		/*-----------------高级指令 - 创建------------------*/
		if( args.length == 8 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( unit == "临时对象" && type == "创建" ){
				
				var pos = null;
				if( temp1.indexOf("位置-敌方变量[") != -1 || temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方变量[","");
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFTT_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-敌方[") != -1 || temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方[","");
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFTT_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方变量[") != -1 || temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-我方变量[","");
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFTT_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}else{
						//（第一人称下，获取不到我方角色的位置）
					}
				}else if( temp1.indexOf("位置-我方[") != -1 || temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("位置-我方[","");
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFTT_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}else{
						//（第一人称下，获取不到我方角色的位置）
					}
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
				}else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
				}else if( temp1 == "位置-鼠标" || temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				
				if( pos != null ){
					temp2 = temp2.replace("持续时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameTemp.drill_BFTT_createByBuffer( pos, temp2 );
				}
			}
		}
		
	};
};


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_BFTT_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_BFTT_preload_initialize.call(this);
	this.drill_BFTT_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_BFTT_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_BFTT_preloadInit = function() {
	this._drill_BFTT_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_BFTT_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_BFTT_style.length; i++ ){
		var temp_data = DrillUp.g_BFTT_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > 『窗口皮肤的预加载』
		if( temp_data['window_type'] == "自定义窗口皮肤" ){
			this._drill_BFTT_preloadTank.push( 
				ImageManager.reserveBitmap( "img/system/", temp_data['window_sys_src'], 0, true, this._drill_BFTT_cacheId ) 
			);
		}
		if( temp_data['window_type'] == "自定义背景图片" ){
			this._drill_BFTT_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Battle__ui/", temp_data['window_pic_src'], 0, true, this._drill_BFTT_cacheId ) 
			);
		}
	}
}


//#############################################################################
// ** 【标准模块】单位贴图容器 ☆场景容器之单位贴图
//#############################################################################
//##############################
// * 单位贴图容器 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BFTT_getEnemySpriteTank = function(){
	return this.drill_BFTT_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图容器 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFTT_getEnemySpriteByIndex = function( index ){
	return this.drill_BFTT_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图容器 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_BFTT_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_BFTT_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图容器 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BFTT_getActorSpriteTank = function(){
	return this.drill_BFTT_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图容器 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFTT_getActorSpriteByIndex = function( index ){
	return this.drill_BFTT_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图容器 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFTT_getActorSpriteByActorId = function( actor_id ){
	return this.drill_BFTT_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 场景容器之单位贴图（实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_BFTT_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_BFTT_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BFTT_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.index() == index ){
			return enemy_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌人ID（私有）
//==============================
Game_Temp.prototype.drill_BFTT_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_BFTT_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return []; }
	var result_list = [];
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.enemyId() == enemy_id ){
			result_list.push( enemy_sprite );
		}
	}
	return result_list;
};
//==============================
// * 单位贴图容器 - 获取 - 角色容器指针（私有）
//==============================
Game_Temp.prototype.drill_BFTT_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_BFTT_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BFTT_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.index() == index ){
			return actor_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据角色ID（私有）
//==============================
Game_Temp.prototype.drill_BFTT_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_BFTT_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.actorId() == actor_id ){
			return actor_sprite;
		}
	}
	return null;
};



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
Scene_Battle.prototype.drill_BFTT_layerAddSprite = function( sprite, layer_index ){
	this.drill_BFTT_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BFTT_layerRemoveSprite = function( sprite ){
	this.drill_BFTT_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_BFTT_sortByZIndex = function () {
    this.drill_BFTT_sortByZIndex_Private();
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
Scene_Battle.prototype.drill_BFTT_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BFTT_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BFTT_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BFTT_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BFTT_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BFTT_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BFTT_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BFTT_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BFTT_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BFTT_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Battle.prototype.drill_BFTT_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_BFTT_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BFTT_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Battle.prototype.drill_BFTT_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	if( option['window_benchmark'] == "相对于战斗" || option['window_benchmark'] == "相对于战斗场景" ){
		
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


//=============================================================================
// ** ☆临时对象
//			
//			说明：	> 此模块专门管理 插件指令控制的临时对象 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 临时对象 - 容器初始化
//==============================
var _drill_BFTT_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BFTT_temp_initialize2.call(this);
	this._drill_BFTT_commandBuffer = null;		//临时对象
	this._drill_BFTT_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 临时对象 - 容器销毁
//==============================
var _drill_BFTT_temp_terminate2 = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_BFTT_temp_terminate2.call(this);
	$gameTemp._drill_BFTT_commandBuffer = null;		//临时对象
	$gameTemp._drill_BFTT_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 『临时对象』 - 简单指令
//==============================
Game_Temp.prototype.drill_BFTT_createSimple = function( pos, text, style_id, ballistics_id, sustain_time ){
	if( style_id == undefined ){ style_id = DrillUp.g_BFTT_simple_defaultStyleId -1; }
	if( ballistics_id == undefined ){ ballistics_id = DrillUp.g_BFTT_simple_defaultBallisticsId -1; }
	if( sustain_time == undefined ){ sustain_time = DrillUp.g_BFTT_simple_defaultTime; }
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFTT_style[ style_id ] ));
	data['b_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFTT_ballistics[ ballistics_id ] ));
	
	// > 临时对象设置
	data['b_data']['movementNum'] = 1;
	data['b_data']['movementTime'] = sustain_time;
	data['param_x'] = pos[0];
	data['param_y'] = pos[1];
	
	// > 内容文本初始化
	data['s_data']['context'] = text;
	
	this._drill_BFTT_commandSeq.push( data );
};
//==============================
// * 『临时对象』 - 高级指令 初始化
//==============================
Game_Temp.prototype.drill_BFTT_setBuffer = function( style_id, ballistics_id ){
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFTT_style[ style_id ] ));
	data['b_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFTT_ballistics[ ballistics_id ] ));
	
	// > 临时对象设置
	data['param_x'] = 0;
	data['param_y'] = 0;
	
	this._drill_BFTT_commandBuffer = data;
};
//==============================
// * 『临时对象』 - 高级指令 创建
//==============================
Game_Temp.prototype.drill_BFTT_createByBuffer = function( pos, time ){
	var data = this._drill_BFTT_commandBuffer;
	if( data == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	data = JSON.parse(JSON.stringify( data ));
	
	// > 临时对象设置
	data['b_data']['movementNum'] = 1;
	data['b_data']['movementTime'] = time;
	data['param_x'] = pos[0];
	data['param_y'] = pos[1];
	
	// > 内容文本初始化
	var text = data['s_data']['context'];
	if( text == "" ){										// 空文本 提示错误
		alert( DrillUp.drill_BFTT_getPluginTip_DataIsEmpty() );
		return;
	}
	//text = text.replace(/\\[vV]\[(\d+)\]/gi, function() {	// 不需要转，窗口绘制直接支持 \v[2]、\str[21]
	//	return $gameVariables.value(parseInt(arguments[1]));
	//}.bind(this));
	//text = text.replace(/\\[vV]\[(\d+)\]/gi, function() {
	//	return $gameVariables.value(parseInt(arguments[1]));
	//}.bind(this));
	data['s_data']['context'] = text;
	
	this._drill_BFTT_commandSeq.push( data );
};
//==============================
// * 临时对象 - 修改样式属性-内容文本
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_context = function( context ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['context'] = context;
};
//==============================
// * 临时对象 - 修改样式属性-额外位置偏移
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_offset = function( xx, yy ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['offsetEx_x'] = xx;
	this._drill_BFTT_commandBuffer['s_data']['offsetEx_y'] = yy;
};
//==============================
// * 临时对象 - 修改样式属性-UI基准
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_benchmark = function( benchmark ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_benchmark'] = benchmark;
};
//==============================
// * 临时对象 - 修改样式属性-战斗层级
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_layer = function( layer ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_battle_layer'] = layer;
};
//==============================
// * 临时对象 - 修改样式属性-图片层级
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_zIndex = function( zIndex ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_battle_zIndex'] = zIndex;
};
//==============================
// * 临时对象 - 修改样式属性-布局透明度
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_opacity = function( opacity ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_opacity'] = opacity;
};
//==============================
// * 临时对象 - 修改样式属性-锁定窗口色调
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_toneLock = function( locked ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_tone_lock'] = locked;
};
//==============================
// * 临时对象 - 修改样式属性-窗口色调
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_tone = function( r, g, b ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_tone_r'] = r;
	this._drill_BFTT_commandBuffer['s_data']['window_tone_g'] = g;
	this._drill_BFTT_commandBuffer['s_data']['window_tone_b'] = b;
};
//==============================
// * 临时对象 - 修改样式属性-窗口附加宽度
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_exWidth = function( width ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_ex_width'] = width;
};
//==============================
// * 临时对象 - 修改样式属性-窗口附加高度
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_exHeight = function( height ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['window_ex_height'] = height;
};
//==============================
// * 临时对象 - 修改样式属性-逐个绘制
//==============================
Game_Temp.prototype.drill_BFTT_setStyle_timingEnabled = function( enable ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['s_data']['timing_enabled'] = enable;
};
//==============================
// * 临时对象 - 修改弹道属性-开始移动前延迟时间
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_movementDelay = function( movementDelay ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['movementDelay'] = movementDelay;
};
//==============================
// * 临时对象 - 修改弹道属性-移动结束后等待时间
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_movementEndDelay = function( movementEndDelay ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['movementEndDelay'] = movementEndDelay;
};
//==============================
// * 临时对象 - 修改弹道属性-极坐标模式-初速度
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_polarSpeedBase = function( polarSpeedBase ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['polarSpeedBase'] = polarSpeedBase;
};
//==============================
// * 临时对象 - 修改弹道属性-极坐标模式-固定方向
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_polarDirFixed = function( polarDirFixed ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['polarDirFixed'] = polarDirFixed;
};
//==============================
// * 临时对象 - 修改弹道属性-极坐标模式-扇形朝向
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_polarDirSectorFace = function( polarDirSectorFace ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['polarDirSectorFace'] = polarDirSectorFace;
};
//==============================
// * 临时对象 - 修改弹道属性-直角坐标模式-X轴初速度
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_cartXSpeedBase = function( cartXSpeedBase ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['cartXSpeedBase'] = cartXSpeedBase;
};
//==============================
// * 临时对象 - 修改弹道属性-直角坐标模式-Y轴初速度
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_cartYSpeedBase = function( cartYSpeedBase ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['cartYSpeedBase'] = cartYSpeedBase;
};
//==============================
// * 临时对象 - 修改弹道属性-轨道锚点模式-轨道初速度
//==============================
Game_Temp.prototype.drill_BFTT_setBallistics_trackSpeedBase = function( trackSpeedBase ){
	if( this._drill_BFTT_commandBuffer == undefined ){ alert( DrillUp.drill_BFTT_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFTT_commandBuffer['b_data']['trackSpeedBase'] = trackSpeedBase;
};


//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门管理 漂浮文字窗口 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 贴图容器 初始化
//==============================
var _drill_BFTT_battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {	
	_drill_BFTT_battle_initialize.call(this);
	this._drill_BFTT_windowTank = [];			//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
var _drill_BFTT_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_BFTT_battle_update.call(this);
	if( this.isActive() ){
		this.drill_BFTT_updateWindowAddChild();			//帧刷新 - 指令建立贴图
		this.drill_BFTT_updateWindowDelete();			//帧刷新 - 贴图删除
		this.drill_BFTT_updateWindowPosition();			//帧刷新 - 位置
	}
};
//==============================
// * 贴图控制 - 帧刷新 指令建立贴图
//==============================
Scene_Battle.prototype.drill_BFTT_updateWindowAddChild = function() {
	for( var i = $gameTemp._drill_BFTT_commandSeq.length-1; i >= 0; i-- ){
		var temp_data = $gameTemp._drill_BFTT_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		// > 层级初始化
		var temp_window = new Drill_BFTT_Window( temp_data );
		temp_window.zIndex = temp_data['s_data']['window_battle_zIndex'];
		this._drill_BFTT_windowTank.push( temp_window );
		
		// > 层级初始化
		this.drill_BFTT_layerAddSprite( temp_window, temp_data['s_data']['window_battle_layer'] );
		
		// > 层级排序
		this.drill_BFTT_sortByZIndex();
		
		// > 出栈
		$gameTemp._drill_BFTT_commandSeq.splice( i, 1 );
	}
}
//==============================
// * 贴图控制 - 帧刷新 贴图删除
//==============================
Scene_Battle.prototype.drill_BFTT_updateWindowDelete = function() {
	for( var i = this._drill_BFTT_windowTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_BFTT_windowTank[i];
		if( temp_window.drill_isDead() ){
			
			// > 从层中去除
			this.drill_BFTT_layerRemoveSprite( temp_window );
			
			// > 从容器中去除
			this._drill_BFTT_windowTank.splice( i, 1 );
		}
	}
}
//==============================
// * 贴图控制 - 帧刷新 位置
//==============================
Scene_Battle.prototype.drill_BFTT_updateWindowPosition = function() {
	for( var i = 0; i < this._drill_BFTT_windowTank.length; i++ ){
		var temp_window = this._drill_BFTT_windowTank[i];
		var s_data = temp_window._drill_data['s_data'];
		var b_data = temp_window._drill_data['b_data'];
		if( temp_window['_drill_COBa_x'].length == 0 ){ continue; }
			
		// > 位移
		var xx = 0;
		var yy = 0;
		
		// > 额外位置偏移
		xx += s_data['offsetEx_x'];
		yy += s_data['offsetEx_y'];
		
		// > 窗口的锚点
		xx -= temp_window._drill_windowWidth * temp_window._drill_windowAnchorX;
		yy -= temp_window._drill_windowHeight * temp_window._drill_windowAnchorY;
		
		// > 弹道位移
		var time = temp_window._drill_curTime;
		if( time < 0 ){ time = 0; }
		if( time > temp_window['_drill_COBa_x'].length-1 ){
			time = temp_window['_drill_COBa_x'].length-1;
		}
		xx += temp_window['_drill_COBa_x'][ time ];		//播放弹道轨迹
		yy += temp_window['_drill_COBa_y'][ time ];
	
	
		// > 层级与镜头的位移（参照设置与 window_benchmark 有关）
		var option = {
			"window_benchmark": s_data['window_benchmark'],
		};
		var pos = this.drill_BFTT_layerCameraMoving(xx, yy, s_data['window_battle_layer'], option );
		xx = pos['x'];
		yy = pos['y'];
	
		
		temp_window.x = xx;
		temp_window.y = yy;
	}
}


//=============================================================================
// ** 战斗临时 漂浮文字窗口【Drill_BFTT_Window】
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
// **						->移动弹道持续时间（延迟+移动时长+结束延迟）
// **						->透明度类型设置
// **					->C窗口皮肤
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **					->D窗口内容
// **						->窗口字符
// **						->文本域自适应
// **						->逐个绘制
// **					
// **		说明：	> 该窗口在游戏中实时创建，创建后将被销毁。
// **				> 窗口的结构从 Drill_MPFP_Window 借鉴来，但是除了贴图内容，其他部分变化非常大。
//=============================================================================
//==============================
// * 漂浮文字窗口 - 定义
//==============================
function Drill_BFTT_Window() {
    this.initialize.apply(this, arguments);
};
Drill_BFTT_Window.prototype = Object.create(Window_Base.prototype);
Drill_BFTT_Window.prototype.constructor = Drill_BFTT_Window;
//==============================
// * 漂浮文字窗口 - 初始化
//==============================
Drill_BFTT_Window.prototype.initialize = function( data ){
	this._drill_data = data;			//（直接传指针）
	
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_BFTT_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateAttr();			//帧刷新 - A主体
	this.drill_updateBallistics();		//帧刷新 - B窗口弹道
	this.drill_updateSkin();			//帧刷新 - C窗口皮肤
	this.drill_updateMessage();			//帧刷新 - D窗口内容
}
//==============================
// * 漂浮文字窗口 - 初始化数据『独立贴图』
//==============================
Drill_BFTT_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 漂浮文字窗口 - 初始化对象『独立贴图』
//==============================
Drill_BFTT_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();					//初始化对象 - A主体
	this.drill_initBallistics();			//初始化对象 - B窗口弹道
	this.drill_initSkin();					//初始化对象 - C窗口皮肤
	this.drill_initMessage();				//初始化对象 - D窗口内容
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_BFTT_Window.prototype.standardPadding = function(){ return this._drill_data['s_data']['window_padding']; };		//窗口内边距
Drill_BFTT_Window.prototype.standardFontSize = function(){ return this._drill_data['s_data']['window_fontsize']; };		//窗口字体大小
//==============================
// * 漂浮文字窗口 - 持续时间
//==============================
Drill_BFTT_Window.prototype.drill_isDead = function() {
	if( this._drill_destroyed == true ){ return true; }
	if( this._drill_curTime > this._drill_lifeTime ){ return true; }
	return false;
};


//==============================
// * A主体 - 初始化对象
//==============================
Drill_BFTT_Window.prototype.drill_initAttr = function() {
	var s_data = this._drill_data['s_data'];
	var b_data = this._drill_data['b_data'];
	
	// > 私有属性初始化
	this.x = 0;
	this.y = Graphics.boxHeight*2;
	this.contentsOpacity = 0;			//文本域 透明度
	this.opacity = 0;					//背景容器层 透明度
	
	this._drill_windowWidth = 0;		//窗口宽度
	this._drill_windowHeight = 0;		//窗口高度
	this._drill_curTime = 0;			//当前生命周期
	this._drill_lifeTime = 120;
	this._drill_destroyed = false;		//销毁标记（手动销毁用）
	
	// > 中心锚点
	this._drill_windowAnchorX = 0;			//中心锚点x
	this._drill_windowAnchorY = 0;			//中心锚点y
	if( s_data['window_anchor'] == "左上角" ){ this._drill_windowAnchorX = 0.0; this._drill_windowAnchorY = 0.0; }
	if( s_data['window_anchor'] == "右上角" ){ this._drill_windowAnchorX = 1.0; this._drill_windowAnchorY = 0.0; }
	if( s_data['window_anchor'] == "左下角" ){ this._drill_windowAnchorX = 0.0; this._drill_windowAnchorY = 1.0; }
	if( s_data['window_anchor'] == "右下角" ){ this._drill_windowAnchorX = 1.0; this._drill_windowAnchorY = 1.0; }
	if( s_data['window_anchor'] == "正上方" ){ this._drill_windowAnchorX = 0.5; this._drill_windowAnchorY = 0.0; }
	if( s_data['window_anchor'] == "正下方" ){ this._drill_windowAnchorX = 0.5; this._drill_windowAnchorY = 1.0; }
	if( s_data['window_anchor'] == "正左方" ){ this._drill_windowAnchorX = 0.0; this._drill_windowAnchorY = 0.5; }
	if( s_data['window_anchor'] == "正右方" ){ this._drill_windowAnchorX = 1.0; this._drill_windowAnchorY = 0.5; }
	if( s_data['window_anchor'] == "正中心" ){ this._drill_windowAnchorX = 0.5; this._drill_windowAnchorY = 0.5; }
	
	// > UI基准初始位置
	//	（无）
}
//==============================
// * A主体 - 初始化对象
//==============================
Drill_BFTT_Window.prototype.drill_updateAttr = function() {
	
	// > 主体 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B窗口弹道 - 初始化对象
//==============================
Drill_BFTT_Window.prototype.drill_initBallistics = function() {
	var b_data = this._drill_data['b_data'];
	b_data['orgX'] = this._drill_data['param_x'];
	b_data['orgY'] = this._drill_data['param_y'];
	b_data['orgOpacity'] = 255;
	this.drill_refreshBallistics( b_data );
}
//==============================
// * B窗口弹道 - 刷新弹道（开放函数）
//
//			说明：	> 需要单独赋值参数：orgX、orgY、orgOpacity。
//					> 此函数只刷新弹道，如果要重置你还需设置 _drill_curTime 为0。
//==============================
Drill_BFTT_Window.prototype.drill_refreshBallistics = function( b_data ){
	
	// > 重刷 当前生命周期
	this._drill_lifeTime = b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay'];
	
	
	// > 移动弹道
	var org_x = b_data['orgX'];
	var org_y = b_data['orgY'];
	$gameTemp.drill_COBa_setBallisticsMove( b_data );					//移动弹道 - 初始化数据
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, org_x, org_y );	//移动弹道 - 推演赋值
	
	
	// > 透明度弹道
	var org_opacity = b_data['orgOpacity'];
	var o_time = b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay'];
	var o_data = {};
	o_data['opacityNum'] = 1;											//对象数量
	o_data['opacityTime'] = o_time;
	o_data['opacityMode'] = "时间锚点模式";
	
	if( b_data['opacity_type'] == "逐渐消失" || b_data['opacity_type'] == "匀速消失" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( b_data['opacity_type'] == "逐渐显现" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':0} );
		o_data['anchorPointTank'].push( {'t':100,'o':org_opacity} );
	}
	else if( b_data['opacity_type'] == "保持原透明度" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':org_opacity} );
	}
	else if( b_data['opacity_type'] == "等一半时间后逐渐消失" || b_data['opacity_type'] == "等一半时间后匀速消失" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':50,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( b_data['opacity_type'] == "前一半时间先显现再保持" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':0} );
		o_data['anchorPointTank'].push( {'t':50,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':org_opacity} );
	}
	else if( b_data['opacity_type'] == "先显现后消失(慢速)" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':0} );
		o_data['anchorPointTank'].push( {'t':45,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':55,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( b_data['opacity_type'] == "先显现后消失" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':0} );
		o_data['anchorPointTank'].push( {'t':25,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':75,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( b_data['opacity_type'] == "先显现后消失(快速)" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':0} );
		o_data['anchorPointTank'].push( {'t':10,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':90,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( b_data['opacity_type'] == "一闪一闪" ){
		o_data['anchorPointTank'] = [];
		o_data['anchorPointTank'].push( {'t':0,'o':0} );
		o_data['anchorPointTank'].push( {'t':30,'o':org_opacity*0.5} );
		o_data['anchorPointTank'].push( {'t':35,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':40,'o':org_opacity*0.5} );
		o_data['anchorPointTank'].push( {'t':45,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':50,'o':org_opacity*0.5} );
		o_data['anchorPointTank'].push( {'t':70,'o':org_opacity*0.5} );
		o_data['anchorPointTank'].push( {'t':75,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':80,'o':org_opacity*0.5} );
		o_data['anchorPointTank'].push( {'t':85,'o':org_opacity} );
		o_data['anchorPointTank'].push( {'t':90,'o':org_opacity*0.5} );
		o_data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );				//透明度弹道 - 初始化数据
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, org_opacity );	//透明度弹道 - 推演赋值
}
//==============================
// * B窗口弹道 - 帧刷新 透明度
//==============================
Drill_BFTT_Window.prototype.drill_updateBallistics = function() {
	if( this['_drill_COBa_opacity'] == undefined ){ return; }
	if( this['_drill_COBa_opacity'].length == 0 ){ return; }
		
	// > 根据轨迹进行播放
	var time = this._drill_curTime;
	if( time < 0 ){ time = 0; }
	if( time > this['_drill_COBa_opacity'].length-1 ){
		time = this['_drill_COBa_opacity'].length-1;
	}
	var oo = this['_drill_COBa_opacity'][ time ];
	this.contentsOpacity = oo;			//文本域 透明度
	this.opacity = oo;					//背景容器层 透明度
}


//==============================
// * C窗口皮肤 - 初始化对象『窗口皮肤』
//
//			说明：	> 此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_BFTT_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 初始化皮肤样式『窗口皮肤』
	var s_data = this._drill_data['s_data'];
	this.drill_resetData_Skin( s_data );
}
//==============================
// * C窗口皮肤 - 重设数据『窗口皮肤』
//
//			说明：	> data对象中的参数【可以缺项】。
//==============================
Drill_BFTT_Window.prototype.drill_resetData_Skin = function( data ){
	
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
Drill_BFTT_Window.prototype.drill_updateSkin = function() {
	this.drill_updateSkin_skinBackground();		//帧刷新 - 高宽变化
												//帧刷新 - 透明度锁定（无）
}
//==============================
// * C窗口皮肤 - 帧刷新 - 高宽变化『窗口皮肤』
//==============================
Drill_BFTT_Window.prototype.drill_updateSkin_skinBackground = function() {
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
var _drill_BFTT_updateTone = Drill_BFTT_Window.prototype.updateTone;
Drill_BFTT_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_BFTT_updateTone.call( this );
}


//==============================
// * D窗口内容 - 初始化对象
//==============================
Drill_BFTT_Window.prototype.drill_initMessage = function(){
	var s_data = this._drill_data['s_data'];
	var context = s_data['context'];
	//（此处context不需要任何变化，\str和\v都有效）
	
	this.drill_refreshMessage( context );
}
//==============================
// * D窗口内容 - 帧刷新
//==============================
Drill_BFTT_Window.prototype.drill_updateMessage = function(){
	
	var s_data = this._drill_data['s_data'];
	if( s_data['timing_enabled'] == true ){
		
		// > 逐个绘制 - 『字符逐个绘制流程』 - 逐个绘制帧刷新【窗口字符 - 窗口字符核心】
		if( this.contents != undefined ){
			this.contents.drill_COWC_timing_updateTick();
		}
	}
}
//==============================
// * D窗口内容 - 刷新内容
//==============================
Drill_BFTT_Window.prototype.drill_refreshMessage = function( context ){

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
	
	
	var s_data = this._drill_data['s_data'];
	if( s_data['timing_enabled'] != true ){
		
		// > 『字符主流程』 - DEBUG显示画布范围【窗口字符 - 窗口字符核心】
		//temp_bitmap.drill_COWC_debug_drawRect();
		
		// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
		this.drill_COWC_drawText( org_text, options );
		
	}else{
		
		// > 『字符逐个绘制流程』 - 设置计时器间隔【窗口字符 - 窗口字符核心】
		var interval = s_data['timing_interval'];
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
	alert( DrillUp.drill_BFTT_getPluginTip_NeedUpdate_drawText() );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleFloatingTemporaryText = false;
		var pluginTip = DrillUp.drill_BFTT_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

