//=============================================================================
// Drill_BattleFloatingNum.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        战斗UI - 临时漂浮参数数字
 * @author Drill_up
 * 
 * @Drill_LE_param "漂浮数字样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BFN_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleFloatingNum +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在战斗界面快速生成漂浮的参数数字。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v1.7及以上★★
 *   - Drill_CoreOfGaugeNumber      系统-参数数字核心★★v1.2及以上★★
 * 可作用于：
 *   - Drill_X_GaugeForFloorDamage  图块-地形伤害漂浮数字[扩展]
 *     该插件能够使得目标插件在地形伤害/治愈时，弹出相应的数字。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗的各个层级。
 * 2.更多详细内容，去看看文档 "1.系统 > 关于参数数字.docx"。
 *   临时对象相关内容，去看看文档 "13.UI > 关于临时对象与模板.docx"。
 * 细节：
 *   (1.漂浮数字是一个基于 参数数字核心 样式的贴图，具体数字配置方式
 *      可以去看看参数数字核心。
 *   (2.你可以将漂浮数字放置在战斗层级的 下层、上层、图片层、
 *      最顶层 中。
 *   (3.漂浮文字只是临时性的贴图，不建议设计为长期滞留的贴图。
 * 弹道：
 *   (1.漂浮数字的弹道支持情况如下：
 *        极坐标模式    √
 *        直角坐标模式  √
 *        轨道锚点模式  √
 *        两点式        x  (不适合)
 *   (2.单个漂浮数字的轨迹完全可以通过弹道设置进行设计。
 *      具体配置方式可以看看 "1.系统 > 关于弹道.docx"。
 * 参数数字：
 *   (1.参数值：　取决于插件指令的值。
 *      旋转：　　可自定义。
 *      滚动效果：固定为瞬间变化。
 *      符号：　　可自定义。
 *      前缀后缀：可自定义。
 *      对齐方式：可自定义。
 *      额定值：　关闭。
 *      额定符号：关闭。
 *      时间格式：关闭。
 *   (2.参数数字样式配置在 参数数字核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 设计：
 *   (1.你可以控制显示一些简单的数字，用来表示 +1 -1 这些漂浮数据。
 *      由于插件的局限性，暂时不能显示复杂的伤害、加成等数据。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 简单指令
 * 你可以通过插件指令快速生成对象：
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[500]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+a50]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+\v[21]]
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+10] : 样式[1]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+10] : 样式[1] : 弹道[2]
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置[100,200] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置变量[25,26] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方[1] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-敌方变量[21] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-我方[1] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-我方变量[21] : 文本[+10]
 * 插件指令：>战斗临时漂浮参数数字 : 简单临时对象 : 位置-鼠标 : 文本[+10]
 * 
 * 1.前半部分（位置-敌方[1]）和 后半部分（文本[+10]）
 *   的参数可以随意组合。一共有3*9种组合方式。
 * 2.临时对象创建后，持续时间结束会自动清掉。
 * 3."+10"、"500"、"+a50"都为 自定义的文本符号。
 *   参数数字核心会将指定的 符号字符串 转换为对应的贴图数字。
 *   文本中"\v[21]"表示变量id对应的值。
 * 4.如果配置中没有写"样式"或"弹道"，则使用默认的样式/弹道。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 高级指令
 * 你可以通过插件指令控制临时对象的具体参数：
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 初始化 : 样式[1] : 弹道[1]
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-内容文本 : 文本[a50]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-内容文本 : 字符串[21]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-额外位置偏移 : 偏移[-10,20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-UI基准 : 相对于战斗场景
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-UI基准 : 相对于镜头
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-战斗层级 : 下层
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-战斗层级 : 上层
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-战斗层级 : 图片层
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-战斗层级 : 最顶层
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改样式属性-图片层级 : 图片层级[4]
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-极坐标模式-初速度 : 速度[1.0]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-极坐标模式-固定方向 : 角度[90.0]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-极坐标模式-固定方向 : 角度变量[21]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-极坐标模式-扇形朝向 : 角度[90.0]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-极坐标模式-扇形朝向 : 角度变量[21]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-直角坐标模式-X轴初速度 : 速度[1.0]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-直角坐标模式-Y轴初速度 : 速度[1.0]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 修改弹道属性-轨道锚点模式-轨道初速度 : 速度[1.0]
 * 
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置[100,200] : 持续时间[20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置变量[25,26] : 持续时间[20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置-敌方[1] : 持续时间[20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置-敌方变量[21] : 持续时间[20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置-我方[1] : 持续时间[20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置-我方变量[21] : 持续时间[20]
 * 插件指令：>战斗临时漂浮参数数字 : 临时对象 : 创建 : 位置-鼠标 : 持续时间[20]
 * 
 * 1.插件指令需要先后执行： 初始化、修改样式属性、修改弹道属性、创建 。
 *   如果 样式属性/弹道属性 不需要变化，直接先后执行： 初始化、创建 即可。
 *   临时对象创建之后，将不再受控制。
 * 2.注意你配置的 弹道 的 模式与类型 ，比如 速度类型、方向类型，
 *   并不是修改了任意属性就都会生效，还要看配置的类型是否用到了该参数。
 *   比如 "修改弹道属性-固定方向"，只在 方向类型 为 固定方向 的情况下才有效。
 * 3.临时对象创建后，持续时间结束会自动清掉。
 * 4."修改样式属性-内容文本"中的"字符串"对应字符串核心中指定编号的自定义文本。
 *   字符串必须是参数数字能识别的文本："0123456789+-x/"或"abcdefghijklmn"。
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
 * 测试方法：   在战斗界面建立36个参数数字并播放。
 * 测试结果：   战斗界面中，平均消耗为：【32.80ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.漂浮数字的持续时间结束后会被立即清除，所以持续使用插件指令
 *   创建对象不会造成消耗累积。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
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
 * @default 4
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
 * @param 漂浮数字样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==参数数字==","---层级---":"","UI基准":"相对于战斗场景","战斗层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"37","偏移-参数数字 X":"0","偏移-参数数字 Y":"0"}
 * 
 * @param 漂浮数字样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==参数数字(相对于镜头)==","---层级---":"","UI基准":"相对于镜头","战斗层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"37","偏移-参数数字 X":"0","偏移-参数数字 Y":"0"}
 * 
 * @param 漂浮数字样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==加生命==","---层级---":"","UI基准":"相对于战斗场景","战斗层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"37","偏移-参数数字 X":"0","偏移-参数数字 Y":"0"}
 * 
 * @param 漂浮数字样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==加魔法==","---层级---":"","UI基准":"相对于战斗场景","战斗层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"38","偏移-参数数字 X":"0","偏移-参数数字 Y":"0"}
 * 
 * @param 漂浮数字样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==扣生命==","---层级---":"","UI基准":"相对于战斗场景","战斗层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"39","偏移-参数数字 X":"0","偏移-参数数字 Y":"0"}
 * 
 * @param 漂浮数字样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==扣魔法==","---层级---":"","UI基准":"相对于战斗场景","战斗层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"40","偏移-参数数字 X":"0","偏移-参数数字 Y":"0"}
 * 
 * @param 漂浮数字样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillBFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * 
 * @param ---弹道组 1至20---
 * @default 
 * 
 * @param 漂浮数字弹道-1
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-匀速向上==","消失方式":"线性消失","移动模式":"极坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"固定方向","固定方向":"270","扇形朝向":"270.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"0.0","X轴速度随机波动量":"0.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"-1.5","Y轴速度随机波动量":"0.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 漂浮数字弹道-2
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-匀速向上(小幅度随机)==","消失方式":"线性消失","移动模式":"极坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.5","速度随机波动量":"1.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"扇形范围方向(随机)","固定方向":"270.0","扇形朝向":"270.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"1.0","X轴速度随机波动量":"2.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"1.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 漂浮数字弹道-3
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-减速向上==","消失方式":"线性消失","移动模式":"极坐标模式","---极坐标模式---":"","速度类型":"初速度+波动量+加速度+最大最小","初速度":"3.0","速度随机波动量":"0.0","加速度":"-0.2","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"固定方向","固定方向":"270","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"0.0","X轴速度随机波动量":"0.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"-1.5","Y轴速度随机波动量":"0.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 漂浮数字弹道-4
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-抛物线==","消失方式":"线性消失","移动模式":"直角坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"初速度+波动量","X轴初速度":"0.0","X轴速度随机波动量":"3.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"初速度+波动量+加速度+最大最小","Y轴初速度":"-12.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.4","Y轴最大速度":"99.0","Y轴最小速度":"-20.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 漂浮数字弹道-5
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==常规-螺旋锚点轨道==","消失方式":"等一半时间后线性消失","移动模式":"轨道锚点模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"1.0","X轴速度随机波动量":"2.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"1.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(51,5),(64,47),(-8,69),(-70,18),(-45,-48),(28,-59),(97,-18),(111,44),(47,101),(-41,104),(-100,56),(-108,-19),(-72,-85),(25,-110),(134,-68)","轨道速度类型":"只初速度","轨道初速度":"5.5","轨道速度随机波动量":"0.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 漂浮数字弹道-6
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-7
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-8
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-9
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-10
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-11
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-12
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-13
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-14
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-15
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-16
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-17
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-18
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-19
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮数字弹道-20
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFNBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillBFNStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的漂浮数字==
 *
 * @param ---层级---
 * @desc 
 *
 * @param UI基准
 * @parent ---层级---
 * @type select
 * @option 相对于战斗场景
 * @value 相对于战斗场景
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的漂浮参数数字，会与镜头位置保持一致。相对于战斗的，会与战斗坐标保持一致。
 * @default 相对于战斗场景
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
 * @desc 漂浮数字所在的战斗层级。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---层级---
 * @desc 时间数字所处在的图片层级。
 * @default 12
 *
 * @param ---参数数字---
 * @desc 
 *
 * @param 参数数字样式
 * @parent ---参数数字---
 * @type number
 * @min 0
 * @desc 参数数字核心中对应的样式，对应时间数字本体。
 * @default 0
 *
 * @param 偏移-参数数字 X
 * @parent ---参数数字---
 * @desc 以时间数字物体的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-参数数字 Y
 * @parent ---参数数字---
 * @desc 以时间数字物体的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 */
/*~struct~DrillBFNBallistic:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的运动模式==
 * 
 * 
 * @param 消失方式
 * @type select
 * @option 瞬间消失
 * @value 瞬间消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 漂浮数字的消失方式。
 * @default 线性消失
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
 * @desc 描述漂浮数字运动的模式。
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
 * @desc 描述漂浮数字速度的模式。
 * @default 只初速度
 * 
 * @param 初速度
 * @parent 速度类型
 * @desc 漂浮数字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param 速度随机波动量
 * @parent 速度类型
 * @desc 漂浮数字速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param 加速度
 * @parent 速度类型
 * @desc 漂浮数字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 最大速度
 * @parent 速度类型
 * @desc 漂浮数字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param 最小速度
 * @parent 速度类型
 * @desc 漂浮数字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 路程计算公式
 * @parent 速度类型
 * @type note
 * @desc 漂浮数字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
 * @desc 描述漂浮数字速度的模式。
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
 * @desc 类型为"方向计算公式"时。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
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
 * @desc 描述漂浮数字速度的模式。
 * @default 只初速度
 * 
 * @param X轴初速度
 * @parent X轴速度类型
 * @desc 漂浮数字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param X轴速度随机波动量
 * @parent X轴速度类型
 * @desc 漂浮数字速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param X轴加速度
 * @parent X轴速度类型
 * @desc 漂浮数字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴最大速度
 * @parent X轴速度类型
 * @desc 漂浮数字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param X轴最小速度
 * @parent X轴速度类型
 * @desc 漂浮数字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴路程计算公式
 * @parent X轴速度类型
 * @type note
 * @desc 漂浮数字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
 * @desc 描述漂浮数字速度的模式。
 * @default 只初速度
 * 
 * @param Y轴初速度
 * @parent Y轴速度类型
 * @desc 漂浮数字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param Y轴速度随机波动量
 * @parent Y轴速度类型
 * @desc 漂浮数字速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 * 
 * @param Y轴加速度
 * @parent Y轴速度类型
 * @desc 漂浮数字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴最大速度
 * @parent Y轴速度类型
 * @desc 漂浮数字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param Y轴最小速度
 * @parent Y轴速度类型
 * @desc 漂浮数字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴路程计算公式
 * @parent Y轴速度类型
 * @type note
 * @desc 漂浮数字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
 * @desc 子弹的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BFN (Battle_Floating_Num)
//		临时全局变量	DrillUp.g_BFN_xxx
//		临时局部变量	this._drill_BFN_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	敌群-临时对象
//		★性能测试消耗	107.2ms（Drill_BFN_NumberSprite.update）
//						32.8ms（drill_initNumberSprite）19.2ms（drill_initBallistics）
//		★最坏情况		大量插件指令不停地执行创建。
//		★备注			测试时36个贴图，直接update，造成了107.2ms的消耗。（不太确定此消耗是否准确）
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
//			->☆单位贴图
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
//			->数字贴图【Drill_BFN_NumberSprite】
//				->参数数字
//				->弹道核心
//				->透明度控制
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 数字贴图【Drill_BFN_NumberSprite】
//		
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的漂浮数字如果放在 下层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//
//		★其它说明细节：
//			1.漂浮文字与 缓冲数字物体 不一样，不需要长期存储显示，所以也长用于短期的数字显示。
//			2.移动镜头时，漂浮数字会被移走，因为漂浮数字只在最开始时锁定战斗位置，并不绑定于战斗。
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
	DrillUp.g_BFN_PluginTip_curName = "Drill_BattleFloatingNum.js 战斗UI-临时漂浮参数数字";
	DrillUp.g_BFN_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 系统-弹道核心",
		"Drill_CoreOfGaugeNumber.js 系统-参数数字核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BFN_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BFN_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BFN_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BFN_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BFN_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到配置1
	//==============================
	DrillUp.drill_BFN_getPluginTip_DataNotFind1 = function( data_id ){
		return "【" + DrillUp.g_BFN_PluginTip_curName + "】\n插件指令错误，漂浮数字样式["+data_id+"]不存在或未配置。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到配置2
	//==============================
	DrillUp.drill_BFN_getPluginTip_DataNotFind2 = function( data_id ){
		return "【" + DrillUp.g_BFN_PluginTip_curName + "】\n插件指令错误，漂浮数字弹道["+data_id+"]不存在或未配置。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 内容文本为空
	//==============================
	DrillUp.drill_BFN_getPluginTip_DataIsEmpty = function(){
		return "【" + DrillUp.g_BFN_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，内容文本为空，将不显示任何文本。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 未初始化
	//==============================
	DrillUp.drill_BFN_getPluginTip_BufferIsNull = function(){
		return "【" + DrillUp.g_BFN_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，未执行临时对象的初始化指令。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleFloatingNum = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleFloatingNum');
	
	
	//==============================
	// * 静态数据 - 漂浮数字参数
	//				（~struct~DrillBFNStyle）
	//==============================
	DrillUp.drill_BFN_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 层级
		data['benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['layerIndex'] = String( dataFrom["战斗层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 参数数字
		data['symbol_id'] = Number( dataFrom["参数数字样式"] || 0);
		data['symbol_x'] = Number( dataFrom["偏移-参数数字 X"] || 0);
		data['symbol_y'] = Number( dataFrom["偏移-参数数字 Y"] || 0);
		
		// > 弹道轨迹
		if( dataFrom["贴图弹道"] != undefined &&
			dataFrom["贴图弹道"] != "" ){
			var ballistics_data = JSON.parse( dataFrom["贴图弹道"] );
			data['ballistics'] = DrillUp.drill_BFN_initBallistics( ballistics_data );
		}else{
			data['ballistics'] = {};
		}
		
		data['offsetEx_x'] = 0;	//（额外位置偏移，注意此配置在样式中）
		data['offsetEx_y'] = 0;
		return data;
	}
	//==============================
	// * 静态数据 - 漂浮数字弹道
	//				（~struct~DrillBFNBallistic）
	//==============================
	DrillUp.drill_BFN_initBallistics = function( dataFrom ) {
		var data = {};
		
		// > 透明度（opacity）
		data['opacity_mode'] = String( dataFrom["消失方式"] || "瞬间消失");
		
		// > 移动（movement）
		data['movementNum'] = 1;
		data['movementTime'] = 20;
		data['movementDelay'] = 0;
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
		data['polarDirType'] = String( dataFrom["方向类型"] || "只初速度" );
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
	DrillUp.g_BFN_simple_defaultStyleId = Number(DrillUp.parameters["简单指令的默认样式"] || 1); 
	DrillUp.g_BFN_simple_defaultBallisticsId = Number(DrillUp.parameters["简单指令的默认弹道"] || 1); 
	DrillUp.g_BFN_simple_defaultTime = Number(DrillUp.parameters["简单指令的默认持续时间"] || 60); 
	
	/*----------------漂浮数字样式-----------------*/
	DrillUp.g_BFN_style_length = 20;
	DrillUp.g_BFN_style = [];
	for (var i = 0; i < DrillUp.g_BFN_style_length; i++) {
		if( DrillUp.parameters["漂浮数字样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["漂浮数字样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["漂浮数字样式-" + String(i+1) ]);
			DrillUp.g_BFN_style[i] = DrillUp.drill_BFN_initStyle( data );
			DrillUp.g_BFN_style[i]['id'] = i+1;
			DrillUp.g_BFN_style[i]['inited'] = true;
		}else{
			DrillUp.g_BFN_style[i] = DrillUp.drill_BFN_initStyle( {} );
			DrillUp.g_BFN_style[i]['id'] = i+1;
			DrillUp.g_BFN_style[i]['inited'] = false;
		}
	}
	
	/*-----------------漂浮数字弹道------------------*/
	DrillUp.g_BFN_ballistics_length = 20;
	DrillUp.g_BFN_ballistics = [];
	for( var i = 0; i < DrillUp.g_BFN_ballistics_length; i++ ){
		if( DrillUp.parameters["漂浮数字弹道-" + String(i+1) ] != undefined &&
			DrillUp.parameters["漂浮数字弹道-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["漂浮数字弹道-" + String(i+1) ]);
			DrillUp.g_BFN_ballistics[i] = DrillUp.drill_BFN_initBallistics( temp );
			DrillUp.g_BFN_ballistics[i]['id'] = i+1;
			DrillUp.g_BFN_ballistics[i]['inited'] = true;
		}else{
			DrillUp.g_BFN_ballistics[i] = DrillUp.drill_BFN_initBallistics( {} );
			DrillUp.g_BFN_ballistics[i]['id'] = i+1;
			DrillUp.g_BFN_ballistics[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfGaugeNumber ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_BFN_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BFN_pluginCommand.call(this, command, args);
	if( command === ">战斗临时漂浮参数数字" ){
		
		
		/*-----------------简单指令------------------*/
		if( args.length >= 6 ){		//（考虑变化参数数量情况）
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
					var temp_sprite = $gameTemp.drill_BFN_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-敌方[") != -1 || temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方[","");
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFN_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方变量[") != -1 || temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-我方变量[","");
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFN_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方[") != -1 || temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("位置-我方[","");
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFN_getActorSpriteByIndex(temp1-1);
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
					$gameTemp.drill_BFN_createSimple( pos, temp2, style_id, ballistics_id );
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
				$gameTemp.drill_BFN_setBuffer( temp1, temp2 );
			}
		}
		
		/*-----------------高级指令 - 修改样式属性------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" ){
				
				if( type == "修改样式属性-内容文本" ){			//（文本不能含空格）
					if( temp1.indexOf("字符串[") != -1 ){
						if( Imported.Drill_CoreOfString ){
							temp1 = temp1.replace("字符串[","");
							temp1 = temp1.replace("]","");
							temp1 = $gameStrings.value( Number(temp1) );
							$gameTemp.drill_BFN_setStyle_context( temp1 );
						}
						
					}else{
						if( temp1.indexOf("文本[") != -1 ){
							temp1 = temp1.replace("文本[","");
							temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
						}
						$gameTemp.drill_BFN_setStyle_context( temp1 );
					}
				}
				if( type == "修改样式属性-额外位置偏移" ){
					temp1 = temp1.replace("偏移[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						$gameTemp.drill_BFN_setStyle_offset( Number(temp1[0]), Number(temp1[1]) );
					}
				}
				if( type == "修改样式属性-UI基准" ){
					$gameTemp.drill_BFN_setStyle_benchmark( temp1 );
				}
				if( type == "修改样式属性-战斗层级" ){
					$gameTemp.drill_BFN_setStyle_layerIndex( temp1 );
				}
				if( type == "修改样式属性-图片层级" ){
					temp1 = temp1.replace("图片层级[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFN_setStyle_zIndex( Number(temp1) );
				}
				if( type == "修改弹道属性-极坐标模式-初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFN_setBallistics_polarSpeedBase( Number(temp1) );
				}
				if( type == "修改弹道属性-极坐标模式-固定方向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFN_setBallistics_polarDirFixed( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFN_setBallistics_polarDirFixed( temp1 );
					}
				}
				if( type == "修改弹道属性-极坐标模式-扇形朝向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFN_setBallistics_polarDirSectorFace( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFN_setBallistics_polarDirSectorFace( temp1 );
					}
				}
				if( type == "修改弹道属性-直角坐标模式-X轴初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFN_setBallistics_cartXSpeedBase( Number(temp1) );
				}
				if( type == "修改弹道属性-直角坐标模式-Y轴初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFN_setBallistics_cartYSpeedBase( Number(temp1) );
				}
				if( type == "修改弹道属性-轨道锚点模式-轨道初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFN_setBallistics_trackSpeedBase( Number(temp1) );
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
					var temp_sprite = $gameTemp.drill_BFN_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-敌方[") != -1 || temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方[","");
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFN_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方变量[") != -1 || temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-我方变量[","");
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFN_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方[") != -1 || temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("位置-我方[","");
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFN_getActorSpriteByIndex(temp1-1);
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
					temp2 = temp2.replace("持续时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameTemp.drill_BFN_createByBuffer( pos, temp2 );
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 获取鼠标位置（输入设备核心的片段）
//==============================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}


//#############################################################################
// ** 【标准模块】单位贴图 ☆单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BFN_getEnemySpriteTank = function(){
	return this.drill_BFN_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFN_getEnemySpriteByIndex = function( index ){
	return this.drill_BFN_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_BFN_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_BFN_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BFN_getActorSpriteTank = function(){
	return this.drill_BFN_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFN_getActorSpriteByIndex = function( index ){
	return this.drill_BFN_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFN_getActorSpriteByActorId = function( actor_id ){
	return this.drill_BFN_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 单位贴图（接口实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_BFN_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_BFN_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BFN_getEnemySpriteTank_Private();
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
Game_Temp.prototype.drill_BFN_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_BFN_getEnemySpriteTank_Private();
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
Game_Temp.prototype.drill_BFN_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_BFN_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BFN_getActorSpriteTank_Private();
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
Game_Temp.prototype.drill_BFN_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_BFN_getActorSpriteTank_Private();
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
Scene_Battle.prototype.drill_BFN_layerAddSprite = function( sprite, layer_index ){
	this.drill_BFN_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BFN_layerRemoveSprite = function( sprite ){
	this.drill_BFN_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_BFN_sortByZIndex = function () {
    this.drill_BFN_sortByZIndex_Private();
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
Scene_Battle.prototype.drill_BFN_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BFN_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BFN_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BFN_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BFN_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BFN_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BFN_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BFN_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BFN_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BFN_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_BFN_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_BFN_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BFN_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Battle.prototype.drill_BFN_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	if( option['benchmark'] == "相对于战斗" || option['benchmark'] == "相对于战斗场景" ){
		
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
var _drill_BFN_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BFN_temp_initialize.call(this);
	this._drill_BFN_commandBuffer = null;		//临时对象
	this._drill_BFN_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 临时对象 - 容器销毁
//==============================
var _drill_BFN_temp_terminate2 = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_BFN_temp_terminate2.call(this);
	this._drill_BFN_commandBuffer = null;		//临时对象
	this._drill_BFN_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 『临时对象』 - 简单指令
//==============================
Game_Temp.prototype.drill_BFN_createSimple = function( pos, text, style_id, ballistics_id, sustain_time ){
	if( style_id == undefined ){ style_id = DrillUp.g_BFN_simple_defaultStyleId -1; }
	if( ballistics_id == undefined ){ ballistics_id = DrillUp.g_BFN_simple_defaultBallisticsId -1; }
	if( sustain_time == undefined ){ sustain_time = DrillUp.g_BFN_simple_defaultTime; }
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFN_style[ style_id ] ));
	data['b_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFN_ballistics[ ballistics_id ] ));
	
	// > 临时对象设置
	data['b_data']['movementNum'] = 1;
	data['b_data']['movementTime'] = sustain_time;
	data['param_x'] = pos[0];
	data['param_y'] = pos[1];
	data['param_context'] = "";
	
	// > 内容文本初始化
	text = text.replace(/\\[vV]\[(\d+)\]/gi, function() {	// 变量转换（\v[2]）
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));
	text = text.replace(/\\[vV]\[(\d+)\]/gi, function() {
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));
	data['param_context'] = text;
	
	this._drill_BFN_commandSeq.push( data );
};
//==============================
// * 『临时对象』 - 高级指令 初始化
//==============================
Game_Temp.prototype.drill_BFN_setBuffer = function( style_id, ballistics_id ){
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFN_style[ style_id ] ));
	data['b_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFN_ballistics[ ballistics_id ] ));
	
	// > 临时对象设置
	data['param_x'] = 0;
	data['param_y'] = 0;
	data['param_context'] = "";
	
	this._drill_BFN_commandBuffer = data;
};
//==============================
// * 『临时对象』 - 高级指令 创建
//==============================
Game_Temp.prototype.drill_BFN_createByBuffer = function( pos, time ){
	var data = this._drill_BFN_commandBuffer;
	if( data == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	data = JSON.parse(JSON.stringify( data ));
	
	// > 临时对象设置
	data['b_data']['movementNum'] = 1;
	data['b_data']['movementTime'] = time;
	data['param_x'] = pos[0];
	data['param_y'] = pos[1];
	
	// > 内容文本初始化
	var text = data['param_context'];
	if( text == "" ){										// 空文本 提示错误
		alert( DrillUp.drill_BFN_getPluginTip_DataIsEmpty() );
		return;
	}
	text = text.replace(/\\[vV]\[(\d+)\]/gi, function() {	// 变量转换（\v[2]）
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));
	text = text.replace(/\\[vV]\[(\d+)\]/gi, function() {
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));
	data['param_context'] = text;
	
	this._drill_BFN_commandSeq.push( data );
};
//==============================
// * 临时对象 - 修改样式属性-内容文本
//==============================
Game_Temp.prototype.drill_BFN_setStyle_context = function( context ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['param_context'] = context;
};
//==============================
// * 临时对象 - 修改样式属性-额外位置偏移
//==============================
Game_Temp.prototype.drill_BFN_setStyle_offset = function( xx, yy ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['s_data']['offsetEx_x'] = xx;
	this._drill_BFN_commandBuffer['s_data']['offsetEx_y'] = yy;
};
//==============================
// * 临时对象 - 修改样式属性-UI基准
//==============================
Game_Temp.prototype.drill_BFN_setStyle_benchmark = function( benchmark ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['s_data']['benchmark'] = benchmark;
};
//==============================
// * 临时对象 - 修改样式属性-战斗层级
//==============================
Game_Temp.prototype.drill_BFN_setStyle_layer = function( layer ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['s_data']['layerIndex'] = layer;
};
//==============================
// * 临时对象 - 修改样式属性-图片层级
//==============================
Game_Temp.prototype.drill_BFN_setStyle_zIndex = function( zIndex ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['s_data']['zIndex'] = zIndex;
};
//==============================
// * 临时对象 - 修改弹道属性-极坐标模式-初速度
//==============================
Game_Temp.prototype.drill_BFN_setBallistics_polarSpeedBase = function( polarSpeedBase ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['b_data']['polarSpeedBase'] = polarSpeedBase;
};
//==============================
// * 临时对象 - 修改弹道属性-极坐标模式-固定方向
//==============================
Game_Temp.prototype.drill_BFN_setBallistics_polarDirFixed = function( polarDirFixed ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['b_data']['polarDirFixed'] = polarDirFixed;
};
//==============================
// * 临时对象 - 修改弹道属性-极坐标模式-扇形朝向
//==============================
Game_Temp.prototype.drill_BFN_setBallistics_polarDirSectorFace = function( polarDirSectorFace ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['b_data']['polarDirSectorFace'] = polarDirSectorFace;
};
//==============================
// * 临时对象 - 修改弹道属性-直角坐标模式-X轴初速度
//==============================
Game_Temp.prototype.drill_BFN_setBallistics_cartXSpeedBase = function( cartXSpeedBase ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['b_data']['cartXSpeedBase'] = cartXSpeedBase;
};
//==============================
// * 临时对象 - 修改弹道属性-直角坐标模式-Y轴初速度
//==============================
Game_Temp.prototype.drill_BFN_setBallistics_cartYSpeedBase = function( cartYSpeedBase ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['b_data']['cartYSpeedBase'] = cartYSpeedBase;
};
//==============================
// * 临时对象 - 修改弹道属性-轨道锚点模式-轨道初速度
//==============================
Game_Temp.prototype.drill_BFN_setBallistics_trackSpeedBase = function( trackSpeedBase ){
	if( this._drill_BFN_commandBuffer == undefined ){ alert( DrillUp.drill_BFN_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFN_commandBuffer['b_data']['trackSpeedBase'] = trackSpeedBase;
};


//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门管理 参数数字贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 贴图容器 初始化
//==============================
var _drill_BFN_battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {	
	_drill_BFN_battle_initialize.call(this);
	this._drill_BFN_spriteTank = [];			//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
var _drill_BFN_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_BFN_battle_update.call(this);
	this.drill_BFN_updateCommandCreate();			//帧刷新 - 指令建立贴图
	this.drill_BFN_updatePosition();				//帧刷新 - 贴图位置
	this.drill_BFN_updateNumberSpriteDelete();		//帧刷新 - 贴图删除
};
//==============================
// * 贴图控制 - 帧刷新 指令建立贴图
//==============================
Scene_Battle.prototype.drill_BFN_updateCommandCreate = function() {
	
	// > 没有指令时，不要进入此函数
	//		（层级排序不要暴露在帧刷新中，会浪费计算资源）
	if( $gameTemp._drill_BFN_commandSeq.length == 0 ){ return; }
	
	for( var i = $gameTemp._drill_BFN_commandSeq.length-1; i >= 0; i-- ){
		var data = $gameTemp._drill_BFN_commandSeq[i];
		var s_data = data['s_data'];
		var b_data = data['b_data'];
		
		// > 校验数据
		if( s_data['inited'] == false ){
			alert( DrillUp.drill_BFN_getPluginTip_DataNotFind1( s_data['id'] ) );
			return;
		}
		if( b_data['inited'] == false ){
			alert( DrillUp.drill_BFN_getPluginTip_DataNotFind2( b_data['id'] ) );
			return;
		}
		
		// > 创建贴图
		var temp_sprite = new Drill_BFN_NumberSprite( data );
		this._drill_BFN_spriteTank.push( temp_sprite );
		this.drill_BFN_layerAddSprite( temp_sprite, s_data['layerIndex'] );
		
		// > 出栈
		$gameTemp._drill_BFN_commandSeq.splice( i, 1 );
	}
	
	// > 层级排序
	this.drill_BFN_sortByZIndex();
}
//==============================
// * 贴图控制 - 帧刷新 贴图位置
//==============================
Scene_Battle.prototype.drill_BFN_updatePosition = function() {
	for( var i = 0; i < this._drill_BFN_spriteTank.length; i++ ){
		var temp_sprite = this._drill_BFN_spriteTank[i];
		var s_data = temp_sprite._drill_data['s_data'];
		if( temp_sprite['_drill_COBa_x'].length == 0 ){ continue; }
		
		// > 位移
		var xx = 0;
		var yy = 0;
		
		// > 参数数字偏移
		xx += s_data['symbol_x'];
		yy += s_data['symbol_y'];
		
		// > 额外位置偏移
		xx += s_data['offsetEx_x'];
		yy += s_data['offsetEx_y'];
		
		
		// > 弹道位移
		var time = temp_sprite._drill_curTime;
		if( time < 0 ){ time = 0; }
		if( time > temp_sprite['_drill_COBa_x'].length-1 ){
			time = temp_sprite['_drill_COBa_x'].length-1;
		}
		xx += temp_sprite['_drill_COBa_x'][time];		//播放弹道轨迹
		yy += temp_sprite['_drill_COBa_y'][time];
		
		
		// > 层级与镜头的位移
		var option = {
			"benchmark": s_data['benchmark'],
		};
		var pos = this.drill_BFN_layerCameraMoving(xx, yy, s_data['layerIndex'], option );
		xx = pos['x'];
		yy = pos['y'];
		
		
		temp_sprite.x = Math.floor(xx);
		temp_sprite.y = Math.floor(yy);
	}
}
//==============================
// * 贴图控制 - 帧刷新 贴图删除
//==============================
Scene_Battle.prototype.drill_BFN_updateNumberSpriteDelete = function() {
	for( var i = this._drill_BFN_spriteTank.length-1; i >= 0; i-- ){
		var temp_sprite = this._drill_BFN_spriteTank[i];
		if( temp_sprite.drill_isDead() ){
			
			// > 执行内部销毁
			temp_sprite.drill_destroy();
			
			// > 从层中去除
			this.drill_BFN_layerRemoveSprite( temp_sprite );
			
			// > 从容器中去除
			this._drill_BFN_spriteTank.splice( i, 1 );
		}
	}
}



//=============================================================================
// ** 数字贴图【Drill_BFN_NumberSprite】
// **
// **		作用域：	战斗界面
// **		主功能：	> 定义一个 数字贴图 。
// **		子功能：	->贴图
// **						->UI基准
// **						->镜头与位置
// **					->弹道
// **					->参数数字
// **				
// **		代码：	> 范围 - 该类只显示一个参数数字贴图。
// **				> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并。
// **				> 数量 - [单个/ ●多个 ] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 数字贴图通过 drill_isDead 在外部即时销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
// **
// **		说明：	> 该贴图下面放了一个 参数数字贴图 ，贴图自身主要处理 镜头与位置。
//=============================================================================
//==============================
// * 数字贴图 - 定义
//==============================
function Drill_BFN_NumberSprite() {
    this.initialize.apply(this, arguments);
}
Drill_BFN_NumberSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_BFN_NumberSprite.prototype.constructor = Drill_BFN_NumberSprite;
//==============================
// * 数字贴图 - 初始化
//==============================
Drill_BFN_NumberSprite.prototype.initialize = function( data ) {
	Sprite_Base.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	this.drill_initSprite();								//初始化对象
};
//==============================
// * 数字贴图 - 帧刷新
//==============================
Drill_BFN_NumberSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	this._drill_curTime += 1;
	this.drill_updateOpacity();		//帧刷新 - 透明度
};
//==============================
// * 数字贴图 - 是否可被销毁（开放函数）
//==============================
Drill_BFN_NumberSprite.prototype.drill_isDead = function() {
	var b_data = this._drill_data['b_data'];
	return this._drill_curTime > b_data['movementTime'];
};
//==============================
// * 数字贴图 - 初始化对象
//==============================
Drill_BFN_NumberSprite.prototype.drill_initSprite = function() {
	var s_data = this._drill_data['s_data'];
	var b_data = this._drill_data['b_data'];
	
	
	// > 私有对象初始化
	this._drill_curTime = 0;				//当前时间
	
	// > 自身属性初始化
	this.x = this._drill_data['param_x'];
	this.y = this._drill_data['param_y'];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.opacity = 255;
	this.zIndex = s_data['zIndex'];			//图片层级
	
	
	this.drill_initBallistics();			//初始化弹道
	this.drill_initNumberSprite();			//创建参数数字
};
//==============================
// * 数字贴图 - 初始化对象 - 初始化弹道
//==============================
Drill_BFN_NumberSprite.prototype.drill_initBallistics = function() {
	var s_data = this._drill_data['s_data'];
	var b_data = this._drill_data['b_data'];
	
	// > 弹道初始化（移动）
	$gameTemp.drill_COBa_setBallisticsMove( b_data );										//弹道核心 - 移动初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, this._drill_data['param_x'], this._drill_data['param_y'] );	//弹道核心 - 移动推演
	
	// > 弹道初始化（透明度）
	var orgOpacity = 255;
	var ballistics_opacity = {};
	ballistics_opacity['opacityMode'] = "目标值模式";
	if( b_data['opacity_mode'] == "不消失" ){				//（透明度这里直接固定配置内容）
		ballistics_opacity['opacityTime'] = b_data['movementTime'];				//
		ballistics_opacity['opacityDelay'] = 0;									//
		ballistics_opacity['targetType'] = "瞬间变化";							//
		ballistics_opacity['targetDifference'] = 0;								//（透明度不变化）
	}
	if( b_data['opacity_mode'] == "线性消失" ){		
		ballistics_opacity['opacityTime'] = b_data['movementTime'];				//
		ballistics_opacity['opacityDelay'] = 0;									//
		ballistics_opacity['targetType'] = "匀速变化";							//
		ballistics_opacity['targetDifference'] = 0 - orgOpacity;				//
	}
	if( b_data['opacity_mode'] == "等一半时间后线性消失" ){	
		ballistics_opacity['opacityTime'] = b_data['movementTime']/2;			//
		ballistics_opacity['opacityDelay'] = b_data['movementTime']/2;			//
		ballistics_opacity['targetType'] = "匀速变化";							//
		ballistics_opacity['targetDifference'] = 0 - orgOpacity;				//
	}
	$gameTemp.drill_COBa_setBallisticsOpacity( ballistics_opacity );			//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, orgOpacity );			//弹道核心 - 透明度推演
	
};
//==============================
// * 数字贴图 - 初始化对象 - 创建参数数字
//==============================
Drill_BFN_NumberSprite.prototype.drill_initNumberSprite = function() {
	var s_data = this._drill_data['s_data'];
	
	// > 参数数字数据
	this._drill_symbol_data = DrillUp.drill_COGN_getCopyedData( s_data['symbol_id'] -1 );
	this._drill_symbol_data['rolling_mode'] = "瞬间变化";			//固定为瞬间变化
	this._drill_symbol_data['specified_enable'] = false;			//关闭额定值
	this._drill_symbol_data['specified_visible'] = false;			//关闭额定值显示
	
	// > 参数数字 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( this._drill_symbol_data );
	this.addChild( temp_sprite );
	this._drill_symbolSprite = temp_sprite;
	
	// > 刷新数字数据
	this._drill_symbolSprite.drill_COGN_reflashString( this._drill_data['param_context'] );
};
//==============================
// * 销毁 - 执行销毁
//==============================
Drill_BFN_NumberSprite.prototype.drill_destroy = function() {
	
	// > 参数数字销毁
	this._drill_symbolSprite.drill_COGN_destroy();
	
	// > 层级销毁
	this.removeChild( this._drill_symbolSprite );
	this._drill_symbolSprite = null;
};

//==============================
// * 帧刷新 - 透明度
//==============================
Drill_BFN_NumberSprite.prototype.drill_updateOpacity = function() {
	if( this['_drill_COBa_opacity'] == undefined ){ return; }
	
	// > 透明度弹道
	var time = this._drill_curTime;
	if( time < 0 ){ time = 0; }
	if( time > this['_drill_COBa_opacity'].length-1 ){
		time = this['_drill_COBa_opacity'].length-1;
	}
	this.opacity = this['_drill_COBa_opacity'][time];
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleFloatingNum = false;
		var pluginTip = DrillUp.drill_BFN_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

