//=============================================================================
// Drill_BattleFloatingTemporaryText.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        战斗UI - 临时漂浮文字
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
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v1.7及以上★★
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心
 * 可扩展：
 *   - Drill_CoreOfString           系统-字符串核心
 *     可以在漂浮文字中，绑定并显示自定义的字符串。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗的各个层级。
 * 2.更多详细内容，去看看文档 "13.UI > 关于漂浮文字.docx"。
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
 *      具体配置方式可以看看 "1.系统 > 关于弹道.docx"。
 * 设计：
 *   (1.你可以添加一些简单的字符串，用来表示 "生命+10" 这些漂浮文字。
 *      也可以用来表现某些技能释放的漂浮文字提示。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 创建
 * 你可以通过插件指令控制永久漂浮内容集合：
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 初始化 : 样式[1] : 弹道[1]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改内容文本 : 字符串[1]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改内容文本 : 文本[一段文字]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改额外位置偏移 : 偏移[-10,20]
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置[100,200] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 位置变量[25,26] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 相对位置[-100,0] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 相对位置变量[25,26] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 鼠标位置 : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 敌方位置[1] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 敌方变量位置[21] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 我方位置[1] : 持续时间[20]
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 创建 : 我方变量位置[21] : 持续时间[20]
 * 
 * 1.临时漂浮文字可以在很多位置创建。
 *   但是注意，切换菜单会清掉漂浮文字。
 * 2."敌方位置[2]"指敌人的具体位置，这个位置随时可能会变化，
 *   比如漂浮的小爱丽丝，其位置一直上下漂浮变化。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 空格支持
 * 插件指令下面的写法也是有效的：
 * 
 * 插件指令：>战斗临时漂浮文字 : 临时对象 : 修改内容文本 : 文本[药水 + 1]
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
 *
 *
 *
 *
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 临时漂浮样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillBFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
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
 * @default {"标签":"==弹道-下移然后等待4秒==","开始移动前延迟时间":"0","移动结束后等待时间":"240","透明度模式":"先显现后消失","移动模式":"直角坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"0.0","X轴速度随机波动量":"0.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"1.5","Y轴速度随机波动量":"0.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-2
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==弹道-下移然后等待2秒==","开始移动前延迟时间":"0","移动结束后等待时间":"120","透明度模式":"先显现后消失","移动模式":"直角坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"只初速度","X轴初速度":"0.0","X轴速度随机波动量":"0.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"只初速度","Y轴初速度":"1.5","Y轴速度随机波动量":"0.0","Y轴加速度":"0.0","Y轴最大速度":"99.0","Y轴最小速度":"0.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-3
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==抛物线弹道==","开始移动前延迟时间":"0","移动结束后等待时间":"0","透明度模式":"等一半时间后匀速消失","移动模式":"直角坐标模式","---极坐标模式---":"","速度类型":"只初速度","初速度":"1.0","速度随机波动量":"2.0","加速度":"0.0","最大速度":"99.0","最小速度":"0.0","路程计算公式":"\"return 0.0\"","方向类型":"四周扩散(线性)","固定方向":"90.0","扇形朝向":"45.0","扇形角度":"90.0","方向计算公式":"\"return 0.0\"","---直角坐标模式---":"","直角坐标整体旋转":"0.0","X轴速度类型":"初速度+波动量","X轴初速度":"0.0","X轴速度随机波动量":"3.0","X轴加速度":"0.0","X轴最大速度":"99.0","X轴最小速度":"0.0","X轴路程计算公式":"\"return 0.0\"","Y轴速度类型":"初速度+波动量+加速度+最大最小","Y轴初速度":"-12.0","Y轴速度随机波动量":"2.0","Y轴加速度":"0.4","Y轴最大速度":"99.0","Y轴最小速度":"-20.0","Y轴路程计算公式":"\"return 0.0\"","---轨道锚点模式---":"","轨道锚点整体旋转":"0.0","锚点列表":"(0,0),(100,0)","轨道速度类型":"只初速度","轨道初速度":"1.0","轨道速度随机波动量":"2.0","轨道加速度":"0.0","轨道最大速度":"99.0","轨道最小速度":"0.0","轨道路程计算公式":"\"return 0.0\""}
 * 
 * @param 临时漂浮弹道-4
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-5
 * @parent ---弹道组 1至20---
 * @type struct<DrillBFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
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
 * @param --常规--
 * @default 
 * 
 * @param 默认内容文本
 * @parent --常规--
 * @type note
 * @desc 漂浮文字默认绑定的内容。
 * @default "一段永久的漂浮文字"
 * 
 * 
 * @param --层级--
 * @default 
 *
 * @param UI基准
 * @parent --层级--
 * @type select
 * @option 相对于战斗场景
 * @value 相对于战斗场景
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 配置了 战斗镜头插件 此设置才有效。相对于镜头的漂浮文字，会与镜头位置保持一致。相对于战斗场景的漂浮文字，会与战斗坐标保持一致。
 * @default 相对于镜头
 *
 * @param 战斗层级
 * @parent --层级--
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
 * @parent --层级--
 * @type number
 * @min 0
 * @desc 窗口在同一个战斗层级时，先后排序的位置，0表示最后面。
 * @default 80
 * 
 * 
 * @param --窗口--
 * @default 
 * 
 * @param 布局模式
 * @parent --窗口--
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
 * @dir img/system/
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
 * @param 窗口中心锚点
 * @parent --窗口--
 * @type select
 * @option 左上角
 * @value 左上角
 * @option 右上角
 * @value 右上角
 * @option 正中心
 * @value 正中心
 * @option 左下角
 * @value 左下角
 * @option 右下角
 * @value 右下角
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 左上角
 *
 * @param 窗口是否自适应行间距
 * @parent --窗口--
 * @type boolean
 * @on 自适应
 * @off 固定行间距
 * @desc true - 自适应，false - 固定行间距
 * @default true
 *
 * @param 窗口固定行间距
 * @parent 窗口是否自适应行间距
 * @type number
 * @min 1
 * @desc 如果你取消了自适应行间距，这里将使得每行的文字的行间距都是固定值。（默认：36）
 * @default 24
 *
 * @param 窗口内边距
 * @parent --窗口--
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent --窗口--
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent --窗口--
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent --窗口--
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
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
 * @option 匀速消失
 * @value 匀速消失
 * @option 等一半时间后匀速消失
 * @value 等一半时间后匀速消失
 * @option 先显现后消失
 * @value 先显现后消失
 * @desc 漂浮文字的消失方式。
 * @default 匀速消失
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
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * @param 方向类型
 * @parent ---极坐标模式---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 四周扩散(抖动)
 * @value 四周扩散(抖动)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向计算公式
 * @value 方向计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 四周扩散(线性)
 * 
 * @param 固定方向
 * @parent 方向类型
 * @desc 类型为固定方向时，漂浮文字固定方向的角度值。
 * @default 90.0
 * 
 * @param 扇形朝向
 * @parent 方向类型
 * @desc 类型为扇形范围方向时，扇形的朝向角度。
 * @default 45.0
 * 
 * @param 扇形角度
 * @parent 方向类型
 * @desc 类型为扇形范围方向时，扇形弧的角度数。
 * @default 90.0
 * 
 * @param 方向计算公式
 * @parent 方向类型
 * @type note
 * @desc 漂浮文字的方向计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
//		★大体框架与功能如下：
//			漂浮参数数字：
//				->结构
//					->窗口字符
//					->文本域自适应
//					->弹道核心（绑定移动）
//					->透明度类型设置
//				->插件指令添加
//				->单位贴图
//					->获取 - 敌人容器指针【标准函数】
//					->获取 - 根据敌方索引【标准函数】
//					->获取 - 根据敌人ID【标准函数】
//					->获取 - 角色容器指针【标准函数】
//					->获取 - 根据我方索引【标准函数】
//					->获取 - 根据角色ID【标准函数】
//				->战斗层级
//					->添加贴图到层级【标准函数】
//					->去除贴图【标准函数】
//					->图片层级排序【标准函数】
//					->层级与镜头的位移【标准函数】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的漂浮文字如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//			3.这里的漂浮文字都是临时的，可以切菜单刷掉。
//
//		★其它说明细节：
//			1.注意，图片层以下时，移动镜头时，漂浮文字会被移走，
//			  因为漂浮文字只在最开始时锁定战斗位置，并不绑定于战斗。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleFloatingTemporaryText = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleFloatingTemporaryText');
	
	
	//==============================
	// * 变量获取 - 临时漂浮样式
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
		// > 窗口
		data['window_type'] = String( dataFrom["布局模式"] || "黑底背景");
		data['window_opacity'] = Number( dataFrom["布局透明度"] || 0);
		data['window_sys_src'] = String( dataFrom["资源-自定义窗口皮肤"] || "");
		data['window_pic_src'] = String( dataFrom["资源-自定义背景图片"] || "");
		data['window_pic_x'] = Number( dataFrom["平移-自定义背景图片 X"] || 0);
		data['window_pic_y'] = Number( dataFrom["平移-自定义背景图片 Y"] || 0);
		data['window_anchor'] = String( dataFrom["窗口中心锚点"] || "左上角" );
		data['window_autoLineheight'] = String(dataFrom["窗口是否自适应行间距"] || "true") === "true";	
		data['window_lineheight'] = Number(dataFrom["窗口固定行间距"] || 28);
		data['window_padding'] = Number( dataFrom["窗口内边距"] || 18);
		data['window_fontsize'] = Number( dataFrom["窗口字体大小"] || 22);
		data['window_ex_width'] = Number( dataFrom["窗口附加宽度"] || 0);
		data['window_ex_height'] = Number( dataFrom["窗口附加高度"] || 0);
		
		data['offset_x'] = 0;
		data['offset_y'] = 0;
		return data;
	}
	//==============================
	// * 变量获取 - 弹道样式
	//				（~struct~DrillBFTTBallistic）
	//==============================
	DrillUp.drill_BFTT_initBallistics = function( dataFrom ) {
		var data = {};
		
		// > 透明度（opacity）
		data['opacity_type'] = String( dataFrom["透明度模式"] || "等一半时间后匀速消失" );
		
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
	Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_BFTT_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BFTT_pluginCommand.call(this, command, args);
	if(command === ">战斗临时漂浮文字"){
		
		/*-----------------初始化------------------*/
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
		if( args.length >= 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" && type == "修改内容文本" ){
				
				if( temp1.indexOf("字符串[") != -1 ){
					if( Imported.Drill_CoreOfString ){
						temp1 = temp1.replace("字符串[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameStrings.value( Number(temp1) );
						$gameTemp.drill_BFTT_setBufferContext( temp1 );
					}else{
						alert( "【Drill_BattleFloatingTemporaryText.js 战斗UI - 临时漂浮文字】\n" +
								"缺少 字符串核心 插件，插件指令执行失败。");
					}
					
				}else{	
					
					var data_str = "";		//（支持空格的多行结构）
					for(var m = 5; m < args.length ; m++ ){
						data_str += String(args[ m ]);
						if( m < args.length-1 ){  data_str += " "; }
					}
					data_str = data_str.replace("文本[","");
					data_str = data_str.replace(/\]$/,"");	//（去掉末尾的]）
					$gameTemp.drill_BFTT_setBufferContext( data_str );
					
				}
			}
			if( unit == "临时对象" && type == "修改额外位置偏移" ){
				temp1 = temp1.replace("偏移[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.split(/[,，]/);
				if( temp1.length >= 2 ){
					$gameTemp.drill_BFTT_setOffset( Number(temp1[0]), Number(temp1[1]) );
				}
			}
		}
		
		/*-----------------创建------------------*/
		if( args.length == 8 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( unit == "临时对象" && type == "创建" ){
				
				var pos = null;
				if( temp1.indexOf("相对位置变量[") != -1 ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					
				}else if( temp1.indexOf("相对位置[") != -1 ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
							
				}else if( temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFTT_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFTT_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
					
				}else if( temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFTT_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("我方位置[") != -1 ){
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
							
				}else if( temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				
				if( pos != null ){
					temp2 = temp2.replace("持续时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameTemp.drill_BFTT_create( pos, temp2 );
				}
			}
		}
		
	};
};


//#############################################################################
// ** 【标准模块】单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
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
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
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
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
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
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
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
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
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
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
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
// ** 单位贴图（接口实现）
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
// ** 【标准模块】战斗层级
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


//=============================================================================
// ** 缓冲数据
//=============================================================================
//==============================
// ** 缓冲数据 - 初始化
//==============================
var _drill_BFTT_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BFTT_temp_initialize2.call(this);
	
	this._drill_BFTT_commandBuffer = null;		//临时对象
	this._drill_BFTT_commandSeq = [];			//漂浮文字容器
};
//==============================
// ** 缓冲数据 - 设置临时对象
//==============================
Game_Temp.prototype.drill_BFTT_setBuffer = function( style_id, ballistics_id ){
	
	var s_data = JSON.parse(JSON.stringify( DrillUp.g_BFTT_style[ style_id ] ));			//深拷贝
	var b_data = JSON.parse(JSON.stringify( DrillUp.g_BFTT_ballistics[ ballistics_id ] ));	//深拷贝
	
	var data = {};
	data['s_data'] = s_data;
	data['b_data'] = b_data;
	this._drill_BFTT_commandBuffer = data;
};
//==============================
// ** 缓冲数据 - 修改内容文本
//==============================
Game_Temp.prototype.drill_BFTT_setBufferContext = function( context ){
	this._drill_BFTT_commandBuffer['s_data']['context'] = context;
};
//==============================
// ** 缓冲数据 - 修改额外位置偏移
//==============================
Game_Temp.prototype.drill_BFTT_setOffset = function( xx, yy ){
	this._drill_BFTT_commandBuffer['s_data']['offset_x'] = xx;
	this._drill_BFTT_commandBuffer['s_data']['offset_y'] = yy;
};
//==============================
// ** 缓冲数据 - 创建
//==============================
Game_Temp.prototype.drill_BFTT_create = function( pos, time ){
	var data = this._drill_BFTT_commandBuffer;
	if( data == undefined ){ return; }
	
	data['b_data']['movementNum'] = 1;						//对象数量
	data['b_data']['movementTime'] = time;					//时长
	data['b_data']['temp_org_x'] = pos[0];
	data['b_data']['temp_org_y'] = pos[1];
	
	this._drill_BFTT_commandSeq.push( data );
};


//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 战斗 - 初始化
//==============================
var _drill_BFTT_battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {	
	_drill_BFTT_battle_initialize.call(this);
	this._drill_BFTT_windowTank = [];
};
//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_BFTT_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_BFTT_battle_update.call(this);
	if( this.isActive() ){
		this.drill_BFTT_updateWindowAddChild();			//帧刷新 - 插件指令建立贴图
		this.drill_BFTT_updateWindowDelete();			//帧刷新 - 贴图删除
		this.drill_BFTT_updateWindowPosition();			//帧刷新 - 位置
	}
};
//==============================
// * 帧刷新 - 插件指令设置贴图
//==============================
Scene_Battle.prototype.drill_BFTT_updateWindowAddChild = function() {
	for( var i = $gameTemp._drill_BFTT_commandSeq.length-1; i >= 0; i-- ){
		var temp_data = $gameTemp._drill_BFTT_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		// > 层级初始化
		var s_data = temp_data['s_data'];
		var b_data = temp_data['b_data'];
		var temp_window = new Drill_BFTT_Window( s_data, b_data );
		temp_window.zIndex = s_data['window_battle_zIndex'];
		this._drill_BFTT_windowTank.push( temp_window );
		
		// > 层级初始化
		this.drill_BFTT_layerAddSprite( temp_window, s_data['window_battle_layer'] );
		
		// > 层级排序
		this.drill_BFTT_sortByZIndex();
		
		// > 出栈
		$gameTemp._drill_BFTT_commandSeq.splice( i, 1 );
	}
}
//==============================
// * 帧刷新 - 贴图删除
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
// * 帧刷新 - 帧刷新位置
//==============================
Scene_Battle.prototype.drill_BFTT_updateWindowPosition = function() {
	for( var i = 0; i < this._drill_BFTT_windowTank.length; i++ ){
		var temp_window = this._drill_BFTT_windowTank[i];
		var s_data = temp_window._drill_style_data;
		var b_data = temp_window._drill_ballistics_data;
		if( temp_window['_drill_COBa_x'].length == 0 ){ continue; }
			
		// > 位移
		var xx = 0;
		var yy = 0;
		xx += s_data['offset_x'];
		yy += s_data['offset_y'];
		
		// > 窗口的锚点
		xx -= temp_window._drill_width * temp_window._drill_anchor_x;
		yy -= temp_window._drill_height * temp_window._drill_anchor_y;
		
		// > 弹道位移
		var time = temp_window._drill_time;
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
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Battle下的 _drill_BFTT_windowTank 列表
//			应用：	暂无 
//			
//			作用域：	战斗界面
//			主功能：	定义一个面板，能随时改变内容和高宽，用于描述事件内置信息。
//			子功能：
//						->贴图内容
//							->文本层
//							->背景
//								> 默认窗口皮肤
//								> 自定义窗口皮肤
//								> 自定义背景图片
//								> 黑底背景
//						->位置
//							->战斗UI基准
//							->战斗镜头修正
//							->窗口的锚点
//						->持续时间
//							->移动弹道持续时间（延迟+移动时长+结束延迟）
//							->透明度变化
//				
//			说明：	> 该窗口在游戏中实时创建，创建后将被销毁。
//					> 窗口与 Drill_GFTT_Window 相似。
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
Drill_BFTT_Window.prototype.initialize = function( s_data, b_data ){
	this._drill_style_data = s_data;			//样式数据（直接传指针）
	this._drill_ballistics_data = b_data;		//弹道数据（直接传指针）
	
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
	
	this.drill_refreshMessageFromData();	//刷新内容
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_BFTT_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this._drill_time += 1;
	this.drill_updateOpacity();			//帧刷新 - 透明度
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_BFTT_Window.prototype.lineHeight = function(){ return this._drill_style_data['window_lineheight']; };			//窗口行间距
Drill_BFTT_Window.prototype.standardPadding = function(){ return this._drill_style_data['window_padding']; };			//窗口内边距
Drill_BFTT_Window.prototype.standardFontSize = function(){ return this._drill_style_data['window_fontsize']; };		//窗口字体大小
//==============================
// * 漂浮文字窗口 - 持续时间
//==============================
Drill_BFTT_Window.prototype.drill_isDead = function() {
	var b_data = this._drill_ballistics_data;
	return this._drill_time > (b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay']);
};
//==============================
// * 初始化 - 数据
//==============================
Drill_BFTT_Window.prototype.drill_initData = function() {
	var s_data = this._drill_style_data;
	var b_data = this._drill_ballistics_data;
	
	// > 皮肤设置
	this._drill_window_sys_bitmap = ImageManager.loadSystem( s_data['window_sys_src'] );
	this._drill_window_pic_bitmap = ImageManager.loadSystem( s_data['window_pic_src'] );
	
	
	// > 私有属性初始化
	this.x = 0;
	this.y = Graphics.boxHeight*2;
	this.contentsOpacity = 0;
	this._drill_time = 0;
	this._drill_width = 0;
	this._drill_height = 0;
	
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( s_data['window_anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( s_data['window_anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( s_data['window_anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( s_data['window_anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > 移动弹道初始化
	$gameTemp.drill_COBa_setBallisticsMove( b_data );												//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0 , b_data['temp_org_x'], b_data['temp_org_y'] );	//弹道核心 - 推演
	
	// > 透明度弹道初始化
	var org_opacity = 255;
	var o_time = b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay'];
	var o_data = {};
	o_data['opacityNum'] = 1;											//对象数量
	if( b_data['opacity_type'] == "匀速消失" ){
		o_data['opacityMode'] = "目标值模式";								//移动模式
		o_data['targetType'] = "匀速变化";									//目标值模式 - 类型（匀速变化/弹性变化/…）
		o_data['targetDifference'] = 0 - org_opacity;						//目标值模式 - 距离差值
		o_data['opacityTime'] = o_time;	
		o_data['opacityDelay'] = 0;		
		o_data['opacityEndDelay'] = 0;	
	}
	if( b_data['opacity_type'] == "等一半时间后匀速消失" ){
		o_data['opacityMode'] = "目标值模式";								//移动模式
		o_data['targetType'] = "匀速变化";									//目标值模式 - 类型（匀速变化/弹性变化/…）
		o_data['targetDifference'] = 0 - org_opacity;						//目标值模式 - 距离差值
		o_data['opacityTime'] = o_time * 0.5;	
		o_data['opacityDelay'] = o_time * 0.5;		
		o_data['opacityEndDelay'] = 0;	
	}
	if( b_data['opacity_type'] == "先显现后消失" ){
		o_data['opacityMode'] = "时间锚点模式";			
		o_data['opacityTime'] = o_time;		
		o_data['anchorPointTank'] = [];	
		o_data['anchorPointTank'].push( {'t':0,'o':0} );		//（四分之一时间显现，而后四分之一消失）
		o_data['anchorPointTank'].push( {'t':25,'o':255} );		
		o_data['anchorPointTank'].push( {'t':75,'o':255} );		
		o_data['anchorPointTank'].push( {'t':100,'o':0} );		
	}
	
	// > 弹道（透明度）
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );							//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0 , org_opacity );			
	
}
//==============================
// * 初始化 - 对象
//==============================
Drill_BFTT_Window.prototype.drill_initSprite = function() {
	this.drill_createBackground();		//创建背景
	this.drill_sortBottomByZIndex();	//底层层级排序
	
	// > 窗口属性
	this.createContents();
    this.contents.clear();
}
//==============================
// * 创建 - 背景
//==============================
Drill_BFTT_Window.prototype.drill_createBackground = function() {
	var s_data = this._drill_style_data;
	this._drill_background = new Sprite();
	
	// > 图层顺序处理
	this._drill_background.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	// > 信息框布局
	if( s_data['window_type'] == "默认窗口皮肤" ){
		
		// > 透明度
		this.opacity = s_data['window_opacity'];
		this._drill_background.bitmap = null;
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = s_data['window_opacity'];
		this._windowFrameSprite.opacity = s_data['window_opacity'];
		
		
	}else if( s_data['window_type'] == "自定义窗口皮肤" ){
		
		// > 皮肤设置
		this.windowskin = this._drill_window_sys_bitmap;
		
		// > 透明度
		this._drill_background.bitmap = null;
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = s_data['window_opacity'];
		this._windowFrameSprite.opacity = s_data['window_opacity'];
		
		
	}else if( s_data['window_type'] == "自定义背景图片" ){
		
		// > bimap建立
		this._drill_background.bitmap = this._drill_window_pic_bitmap;
		this._drill_background.x = s_data['window_pic_x'];
		this._drill_background.y = s_data['window_pic_y'];
		
		// > 透明度
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		
		
	}else if( s_data['window_type'] == "黑底背景" ){
		
		// > bimap建立
		//（需延迟设置，见后面）
		
		// > 透明度
		this._drill_background.bitmap = null;
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}
//==============================
// ** 底层层级排序
//==============================
Drill_BFTT_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//==============================
// * 帧刷新 - 位置
//==============================
Drill_BFTT_Window.prototype.drill_updateOpacity = function() {
	var s_data = this._drill_style_data;
	var b_data = this._drill_ballistics_data;
	if( this['_drill_COBa_opacity'].length == 0 ){ return; }
		
	// > 根据轨迹进行播放
	var time = this._drill_time;
	if( time < 0 ){ time = 0; }
	if( time > this['_drill_COBa_opacity'].length-1 ){
		time = this['_drill_COBa_opacity'].length-1;
	}
	var oo = this['_drill_COBa_opacity'][ time ];
	this.contentsOpacity = oo;
}
//==============================
// * 激活 - 刷新内容
//==============================
Drill_BFTT_Window.prototype.drill_refreshMessageFromData = function(){
	var s_data = this._drill_style_data;
	this.drill_refreshMessage( s_data['context'].split("\n") );
}
//==============================
// * 激活 - 刷新内容
//==============================
Drill_BFTT_Window.prototype.drill_refreshMessage = function( context_list ){
	var s_data = this._drill_style_data;
	var b_data = this._drill_ballistics_data;
	if( context_list.length == 0 ){ return; }
	
	// > 窗口高宽 - 计算
	var options = {};
	options['autoLineheight'] = s_data['window_autoLineheight'];
	options['lineheight'] = s_data['window_lineheight'];
	this.drill_COWA_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += s_data['window_ex_width'] || 0;		//（附加高宽）
	hh += s_data['window_ex_height'] || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
	
	
	if( s_data['window_type'] == "黑底背景" ){
		this._drill_background_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");	//（背景黑框）
		this._drill_background.bitmap = this._drill_background_BlackBitmap;
	}
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleFloatingTemporaryText = false;
		alert(
			"【Drill_BattleFloatingTemporaryText.js 战斗UI - 临时漂浮文字】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心" + 
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

