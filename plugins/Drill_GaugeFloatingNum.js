//=============================================================================
// Drill_GaugeFloatingNum.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        地图UI - 临时漂浮参数数字
 * @author Drill_up
 * 
 * @Drill_LE_param "漂浮数字样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFN_button_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeFloatingNum +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面快速生成漂浮的参数数字。
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
 * 1.插件的作用域：地图界面。
 *   作用于地图的各个层级。
 * 细节：
 *   (1.漂浮数字是一个基于 参数数字核心 样式的贴图，具体数字配置方式
 *      可以去看看参数数字核心。
 *   (2.你可以将漂浮数字放置在地图层级的 下层、中层、上层、图片层、
 *      最顶层 中。
 *   (3.漂浮文字只是临时性的贴图，不建议设计为长期滞留的贴图，
 *      刷菜单、刷地图都可以刷掉漂浮文字。
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
 *   (2.默认参数数字具备 滚动效果 ，即从0上涨/下降到你设置的目标值。
 *      如果你想在出现时就直接显示目标值，在核心配置中关闭 滚动效果 即可。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制漂浮数字样式集合：
 * 
 * 插件指令：>地图漂浮数字 : 玩家 : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 本事件 : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 事件[10] : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 事件变量[21] : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 图块位置[10,10] : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 图块位置变量[25,26] : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 鼠标位置 : 样式[1] : +10 : 持续时间[20]
 * 
 * 插件指令：>地图漂浮数字 : 玩家 : 样式[1] : +10 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 玩家 : 样式[1] : 500 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 玩家 : 样式[1] : +a50 : 持续时间[20]
 * 插件指令：>地图漂浮数字 : 玩家 : 样式[1] : +\v[21] : 持续时间[20]
 * 
 * 1."+10"、"500"、"+a50"都为 自定义符号。
 *   参数数字核心会将指定的 符号字符串 转换为对应的贴图数字。
 * 2."\v[21]"表示变量id对应的值。
 * 3."位置"的单位是图块。
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
 * 测试方法：   在物体管理层等不同地图建立10个贴图进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【14.28ms】
 *              100个事件的地图中，平均消耗为：【10.31ms】
 *               50个事件的地图中，平均消耗为：【9.07ms】
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
 * [v1.1]
 * 添加了漂浮数字的变量值支持。
 * [v1.2]
 * 修复了弹道的多行 自定义公式 中无法执行且出错的bug。
 * 添加了锚点轨道模式。
 * [v1.3]
 * 修复了当参数数字处于下层/中层/上层时，镜头缩放时跟着被缩放的bug。
 * 修复了插件指令细节。
 * [v1.4]
 * 添加了部分指令解析的检查。
 * [v1.5]
 * 优化了与地图活动镜头的变换关系。
 *
 *
 * 
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 漂浮数字样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==一般漂浮数字==","---层级---":"","地图层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"1","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---弹道轨迹---":"","贴图弹道":"{\"标签\":\"==匀速上升==\",\"移动模式\":\"直角坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向计算公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"0.0\",\"X轴速度随机波动量\":\"0.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"-1.5\",\"Y轴速度随机波动量\":\"0.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}","消失方式":"线性消失"}
 * 
 * @param 漂浮数字样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==随机方向的漂浮数字==","---层级---":"","地图层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"1","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---弹道轨迹---":"","贴图弹道":"{\"标签\":\"==匀速随机朝向==\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.5\",\"速度随机波动量\":\"1.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(随机)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向计算公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}","消失方式":"线性消失"}
 * 
 * @param 漂浮数字样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default {"标签":"==抛物线下落数字==","---层级---":"","地图层级":"图片层","图片层级":"12","---参数数字---":"","参数数字样式":"1","偏移-参数数字 X":"0","偏移-参数数字 Y":"0","---弹道轨迹---":"","贴图弹道":"{\"标签\":\"==抛物线弹道==\",\"移动模式\":\"直角坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向计算公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"初速度+波动量\",\"X轴初速度\":\"0.0\",\"X轴速度随机波动量\":\"3.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"初速度+波动量+加速度+最大最小\",\"Y轴初速度\":\"-12.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.4\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"-20.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}","消失方式":"线性消失"}
 * 
 * @param 漂浮数字样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 漂浮数字样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillGFNStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGFNStyle:
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
 * @option 相对于地图
 * @value 相对于地图
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的漂浮参数数字，会与镜头位置保持一致。相对于地图的，会与地图坐标保持一致。
 * @default 相对于地图
 *
 * @param 地图层级
 * @parent ---层级---
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 漂浮数字所在的地图层级。
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
 * @param ---弹道轨迹---
 * @desc 
 *
 * @param 贴图弹道
 * @parent ---弹道轨迹---
 * @type struct<DrillGFNBallistic>
 * @desc 漂浮数字弹道运动轨迹的详细配置信息。
 * @default {}
 * 
 * @param 消失方式
 * @parent ---弹道轨迹---
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
 */
/*~struct~DrillGFNBallistic:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的运动模式==
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
 * @desc 描述漂浮数字速度的模式。
 * @default 四周扩散(线性)
 * 
 * @param 固定方向
 * @parent 方向类型
 * @desc 类型为固定方向时，漂浮数字固定方向的角度值。
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
 * @desc 漂浮数字的方向计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
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
//		插件简称		GFN (Gauge_Button)
//		临时全局变量	DrillUp.g_GFN_xxx
//		临时局部变量	this._drill_GFN_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	物体管理层
//		★性能测试消耗	9.07ms
//		★最坏情况		大量插件指令不停地执行漂浮文字创建。
//		★备注			暂无
//		
//		★优化记录
//			2022-10-6优化：
//				层级排序 被暴露在帧刷新中，浪费了40ms的计算资源。已优化。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			漂浮参数数字：
//				->结构
//					->参数数字
//					->弹道核心
//					->透明度控制
//				->插件指令添加
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的漂浮数字如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//
//		★其它说明细节：
//			1.漂浮文字与 缓冲数字物体 不一样，不需要长期存储显示，所以也长用于短期的数字显示。
//			2.移动镜头时，漂浮数字会被移走，因为漂浮数字只在最开始时锁定地图位置，并不绑定于地图。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeFloatingNum = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeFloatingNum');
	
	
	//==============================
	// * 变量获取 - 弹道样式（必须写在前面）
	//				（~struct~DrillGFNBallistic）
	//==============================
	DrillUp.drill_GFN_ballisticsInit = function( dataFrom ) {
		var data = {};
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
	//==============================
	// * 变量获取 - 漂浮数字参数（必须写在前面）
	//				（~struct~DrillGFNStyle）
	//==============================
	DrillUp.drill_GFN_initParam = function( dataFrom ) {
		var data = {};
		// > 层级
		data['layer_benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['layer_index'] = String( dataFrom["地图层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		// > 参数数字
		data['symbol_id'] = Number( dataFrom["参数数字样式"] || 0);
		data['symbol_x'] = Number( dataFrom["偏移-参数数字 X"] || 0);
		data['symbol_y'] = Number( dataFrom["偏移-参数数字 Y"] || 0);
		// > 弹道轨迹
		if( dataFrom["贴图弹道"] != undefined &&
			dataFrom["贴图弹道"] != "" ){
			var ballistics_data = JSON.parse( dataFrom["贴图弹道"] );
			data['ballistics'] = DrillUp.drill_GFN_ballisticsInit( ballistics_data );
		}else{
			data['ballistics'] = {};
		}
		data['opacity_mode'] = String( dataFrom["消失方式"] || "瞬间消失");
		
		return data;
	}
	
	
	/*----------------漂浮数字样式-----------------*/
	DrillUp.g_GFN_button_length = 20;
	DrillUp.g_GFN_button = [];
	for (var i = 0; i < DrillUp.g_GFN_button_length; i++) {
		if( DrillUp.parameters["漂浮数字样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["漂浮数字样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["漂浮数字样式-" + String(i+1) ]);
			DrillUp.g_GFN_button[i] = DrillUp.drill_GFN_initParam( data );
			DrillUp.g_GFN_button[i]['inited'] = true;
		}else{
			DrillUp.g_GFN_button[i] = DrillUp.drill_GFN_initParam( {} );
			DrillUp.g_GFN_button[i]['inited'] = false;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfGaugeNumber ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GFN_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFN_pluginCommand.call(this, command, args);
	if( command === ">地图漂浮数字" ){
		
		/*-----------------地图漂浮数字------------------*/
		if( args.length == 8 ){				//>地图漂浮数字 : 玩家 : 样式[1] : +10 : 持续时间[20]
			var pos_str = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			
			var pos = null;
			var e_pos = null;
			if( pos_str.indexOf("图块位置变量[") != -1 ){
				pos_str = pos_str.replace("图块位置变量[","");
				pos_str = pos_str.replace("]","");
				var temp_arr = pos_str.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					e_pos = [ $gameVariables.value(Number(temp_arr[0])),
							  $gameVariables.value(Number(temp_arr[1])) ];
				}
			}else if( pos_str.indexOf("图块位置[") != -1 ){
				pos_str = pos_str.replace("图块位置[","");
				pos_str = pos_str.replace("]","");
				var temp_arr = pos_str.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
				}
			}else if( pos_str.indexOf("事件变量[") != -1 ){
				pos_str = pos_str.replace("事件变量[","");
				pos_str = pos_str.replace("]","");
				var e_id = $gameVariables.value(Number(pos_str));
				if( $gameMap.drill_GFN_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_pos = [ e._realX, e._realY ];
			}else if( pos_str.indexOf("事件[") != -1 ){
				pos_str = pos_str.replace("事件[","");
				pos_str = pos_str.replace("]","");
				var e_id = Number(pos_str);
				if( $gameMap.drill_GFN_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_pos = [ e._realX, e._realY ];
			}else if( pos_str == "本事件" ){
				var e = $gameMap.event( this._eventId );
				e_pos = [ e._realX, e._realY ];
			}else if( pos_str == "玩家" ){
				e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
			}
			
			if( e_pos ){
				var tw = $gameMap.tileWidth();
				var th = $gameMap.tileHeight();
				pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
						Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
			}
				
			if( pos_str == "鼠标位置" ){
				pos = [ _drill_mouse_x, _drill_mouse_y ];
			}
			
			if( pos && temp2.indexOf("样式[") != -1 ){
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2) - 1;
				temp4 = temp4.replace("持续时间[","");
				temp4 = temp4.replace("]","");
				temp4 = Number(temp4);
				
				// > 变量转换
				temp3 = temp3.replace(/\\V\[(\d+)\]/gi, function() {
					return $gameVariables.value(parseInt(arguments[1]));
				}.bind(this));
				temp3 = temp3.replace(/\\V\[(\d+)\]/gi, function() {
					return $gameVariables.value(parseInt(arguments[1]));
				}.bind(this));
				temp3 = temp3.replace(/\\v\[(\d+)\]/gi, function() {
					return $gameVariables.value(parseInt(arguments[1]));
				}.bind(this));
				temp3 = temp3.replace(/\\v\[(\d+)\]/gi, function() {
					return $gameVariables.value(parseInt(arguments[1]));
				}.bind(this));
				
				var data = {
					'x': pos[0],
					'y': pos[1],
					'style_id': temp2,
					'symbol_data': temp3,
					'sustain_time': temp4,
				}
				$gameTemp._drill_GFN_commandSeq.push( data );
			}
		}
	};
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_GFN_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_GaugeFloatingNum.js 地图UI - 漂浮参数数字】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 缓冲数据初始化
//=============================================================================
var _drill_GFN_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFN_temp_initialize.call(this);
	this._drill_GFN_commandSeq = [];		//插件指令序列
}


//#############################################################################
// ** 【标准模块】地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_GFN_layerAddSprite = function( sprite, layer_index ){
	this.drill_GFN_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_GFN_layerRemoveSprite = function( sprite ){
	this.drill_GFN_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_GFN_sortByZIndex = function(){
    this.drill_GFN_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_GFN_layer_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GFN_layer_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_GFN_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GFN_layer_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_GFN_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GFN_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_GFN_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFN_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_GFN_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFN_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_GFN_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_GFN_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_mapDownArea.addChild( sprite );
	}
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 地图层级 - 删除贴图（私有）
//==============================
Scene_Map.prototype.drill_GFN_layerRemoveSprite_Private = function( sprite ) {
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};

//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_GFN_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFN_map_initialize.call(this);
	this._drill_GFN_spriteTank = [];				//漂浮数字容器
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GFN_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFN_map_update.call(this);
	this.drill_GFN_updateCommandCreate();			//插件指令建立贴图
	this.drill_GFN_updateNumberSpriteDelete();		//贴图删除
};
//==============================
// * 帧刷新 - 插件指令建立贴图
//==============================
Scene_Map.prototype.drill_GFN_updateCommandCreate = function() {
	
	// > 没有指令时，不要进入此函数
	//		（层级排序不要暴露在帧刷新中，会浪费计算资源）
	if( $gameTemp._drill_GFN_commandSeq.length == 0 ){ return; }
	
	for( var i = $gameTemp._drill_GFN_commandSeq.length-1; i >= 0; i-- ){
		var data = $gameTemp._drill_GFN_commandSeq[i];
		
		// > 检查指令
		var s_id = data['style_id'];
		if( s_id == undefined ){
			alert(
				"【Drill_GaugeFloatingNum.js 地图UI - 漂浮参数数字】\n"+
				"指令错误，漂浮数字样式不能为空。"
			);
			$gameTemp._drill_GFN_commandSeq.splice( i, 1 );
			continue;
		}
		if( DrillUp.g_GFN_button[ s_id ] == undefined || 
			DrillUp.g_GFN_button[ s_id ]['inited'] == false ){
			alert(
				"【Drill_GaugeFloatingNum.js 地图UI - 漂浮参数数字】\n"+
				"指令错误，漂浮数字样式["+ (s_id+1) +"]不存在或未配置。"
			);
			$gameTemp._drill_GFN_commandSeq.splice( i, 1 );
			continue;
		}
		
		var temp_sprite = new Drill_GFN_NumberSprite( data );
		
		// > 贴图层级
		this._drill_GFN_spriteTank.push( temp_sprite );
		this.drill_GFN_layerAddSprite( temp_sprite, temp_sprite._drill_data['layer_index'] );
		
		$gameTemp._drill_GFN_commandSeq.splice( i, 1 );
	}
	
	// > 层级排序
	this.drill_GFN_sortByZIndex();
}
//==============================
// * 帧刷新 - 贴图删除
//==============================
Scene_Map.prototype.drill_GFN_updateNumberSpriteDelete = function() {
	for( var i = this._drill_GFN_spriteTank.length-1; i >= 0; i-- ){
		var temp_sprite = this._drill_GFN_spriteTank[i];
		if( temp_sprite.drill_isDead() ){
			
			// > 执行内部销毁
			temp_sprite.drill_destroy();
			
			// > 从层中去除
			this.drill_GFN_layerRemoveSprite( temp_sprite );
			
			// > 从容器中去除
			this._drill_GFN_spriteTank.splice( i, 1 );
		}
	}
}
//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
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


//=============================================================================
// ** 数字贴图【Drill_GFN_NumberSprite】
//					
//			代码：	> 范围 - 该类只显示一个参数数字贴图。
//					> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 数字贴图通过 drill_isDead 在外部即时销毁。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 数字贴图 - 定义
//==============================
function Drill_GFN_NumberSprite() {
    this.initialize.apply(this, arguments);
}
Drill_GFN_NumberSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_GFN_NumberSprite.prototype.constructor = Drill_GFN_NumberSprite;
//==============================
// * 数字贴图 - 初始化
//==============================
Drill_GFN_NumberSprite.prototype.initialize = function( data ) {
	Sprite_Base.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();		//初始化数据
	this.drill_initSprite();	//初始化对象
};
//==============================
// * 数字贴图 - 帧刷新
//==============================
Drill_GFN_NumberSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 接口 - 是否可被销毁
//==============================
Drill_GFN_NumberSprite.prototype.drill_isDead = function() {
	var data = this._drill_data;
	return this._drill_cur_time > data['sustain_time'];
};
//==============================
// * 初始化 - 数据
//==============================
Drill_GFN_NumberSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	if( data['x'] == undefined ){ data['x'] = 0 };								//主体 - x
	if( data['y'] == undefined ){ data['y'] = 0 };								//主体 - y
	if( data['style_id'] == undefined ){ data['style_id'] = 0 };				//主体 - 样式id
	if( data['symbol_data'] == undefined ){ data['symbol_data'] = "0" };		//主体 - 显示的数字
	if( data['sustain_time'] == undefined ){ data['sustain_time'] = 30 };		//主体 - 持续时间
	
	// > 样式数据（见DrillUp.drill_GFN_initParam）
	var style_id = data['style_id'];
	var style_data = DrillUp.g_GFN_button[ style_id ];
	var keys = Object.keys( data );
	for(var i = 0; i < keys.length; i++){	//（传入值）
		var key = keys[i];
		style_data[key] = data[key];
	}
	this._drill_data = style_data;
	//alert(JSON.stringify( this._drill_data ));
	
	// > UI基准初始位置
	this._drill_orgPos_x = $gameMap.adjustX(0);
	this._drill_orgPos_y = $gameMap.adjustY(0);
};
//==============================
// * 初始化 - 对象
//==============================
Drill_GFN_NumberSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_cur_time = 0;					//当前时间
	this._drill_isHovering = false;				//状态 - 选中
	this._drill_isPressing = false;				//状态 - 被按下
	this._drill_status = data['status'];		//状态 - 激活
	this._drill_visible = data['visible'];		//状态 - 显示/隐藏
	
	// > 参数数字数据
	this._drill_symbol_data = {};
	if( this._drill_data['symbol_id'] ){
		var symbol_id = this._drill_data['symbol_id'];
		this._drill_symbol_data = DrillUp.drill_COGN_getCopyedData( symbol_id -1 );
	}
	this._drill_symbol_data['rolling_mode'] = "瞬间变化";			//固定为瞬间变化
	this._drill_symbol_data['specified_enable'] = false;			//关闭额定值
	this._drill_symbol_data['specified_visible'] = false;			//关闭额定值显示
	
	// > 弹道初始化（移动）
	data['ballistics']['movementTime'] = data['sustain_time'];		//（插件指令强制赋值）
	$gameTemp.drill_COBa_setBallisticsMove( data['ballistics'] );				//弹道核心 - 移动初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, data['x'], data['y'] );	//弹道核心 - 移动推演
	
	// > 弹道初始化（透明度）
	var orgOpacity = 255;
	var ballistics_opacity = {};
	ballistics_opacity['opacityMode'] = "目标值模式";
	
	if( data['opacity_mode'] == "不消失" ){				//（透明度这里直接固定配置内容）
		ballistics_opacity['opacityTime'] = data['sustain_time'];					//
		ballistics_opacity['opacityDelay'] = 0;										//
		ballistics_opacity['targetType'] = "瞬间变化";								//
		ballistics_opacity['targetDifference'] = 0;									//（透明度不变化）
	}
	if( data['opacity_mode'] == "线性消失" ){		
		ballistics_opacity['opacityTime'] = data['sustain_time'];					//
		ballistics_opacity['opacityDelay'] = 0;										//
		ballistics_opacity['targetType'] = "匀速变化";								//
		ballistics_opacity['targetDifference'] = 0 - orgOpacity;					//
	}
	if( data['opacity_mode'] == "等一半时间后线性消失" ){	
		ballistics_opacity['opacityTime'] = data['sustain_time']/2;					//
		ballistics_opacity['opacityDelay'] = data['sustain_time']/2;				//
		ballistics_opacity['targetType'] = "匀速变化";								//
		ballistics_opacity['targetDifference'] = 0 - orgOpacity;					//
	}
	$gameTemp.drill_COBa_setBallisticsOpacity( ballistics_opacity );			//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, orgOpacity );			//弹道核心 - 透明度推演
	
	
	// > 自身属性初始化
	this.x = data['x'];
	this.y = data['y'];
	this.opacity = orgOpacity;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = data['visible'];
	this.zIndex = data['zIndex'];		//图片层级
	
	this.drill_createNumber();			//创建参数数字
};
//==============================
// * 创建 - 参数数字
//==============================
Drill_GFN_NumberSprite.prototype.drill_createNumber = function() {
	var data = this._drill_data;
	
	// > 参数数字 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( this._drill_symbol_data );
	this.addChild( temp_sprite );
	this._drill_symbolSprite = temp_sprite;
	
	// > 刷新数字数据
	this._drill_symbolSprite.drill_COGN_reflashValue( data['symbol_data'] );
};
//==============================
// * 销毁 - 执行销毁
//==============================
Drill_GFN_NumberSprite.prototype.drill_destroy = function() {
	
	// > 参数数字销毁
	this._drill_symbolSprite.drill_COGN_destroy();
	
	// > 层级销毁
	this.removeChild( this._drill_symbolSprite );
	this._drill_symbolSprite = null;
};

//==============================
// * 帧刷新对象
//==============================
Drill_GFN_NumberSprite.prototype.drill_updateSprite = function() {
	
	this._drill_cur_time += 1;
	this.drill_updatePosition();		//镜头与位置
}
//==============================
// * 帧刷新 - 镜头与位置
//==============================
Drill_GFN_NumberSprite.prototype.drill_updatePosition = function() {
	var data = this._drill_data;
	
	// > 根据轨迹进行播放
	var time = this._drill_cur_time;
	if( time < 0 ){ time = 0; }
	if( time > this['_drill_COBa_x'].length-1 ){
		time = this['_drill_COBa_x'].length-1;
	}
	var xx = this['_drill_COBa_x'][time];		//播放弹道轨迹
	var yy = this['_drill_COBa_y'][time];
	xx += this._drill_data['symbol_x'];
	yy += this._drill_data['symbol_y'];
	
	// > UI基准偏移（相对于地图）
	if( data['layer_benchmark'] == "相对于地图" ){
		var pos_x = $gameMap.adjustX(0);
		var pos_y = $gameMap.adjustY(0);
		xx += $gameMap.deltaX( pos_x, this._drill_orgPos_x ) * $gameMap.tileWidth();
		yy += $gameMap.deltaY( pos_y, this._drill_orgPos_y ) * $gameMap.tileHeight();
	}
	
	// > 镜头缩放与位移【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		var layer = data['layer_index'];
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			this.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
			this.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
			//（暂不考虑缩放位移偏转）
		}
		if( layer == "图片层" || layer == "最顶层" ){
			xx = $gameSystem.drill_LCa_mapToCameraX( xx );
			yy = $gameSystem.drill_LCa_mapToCameraY( yy );
		}
	}
	
	this.x = Math.floor(xx);
	this.y = Math.floor(yy);
	this.opacity = this['_drill_COBa_opacity'][time];
	
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeFloatingNum = false;
		alert(
			"【Drill_GaugeFloatingNum.js 地图UI - 临时漂浮参数数字】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心" + 
			"\n- Drill_CoreOfGaugeNumber 系统-参数数字核心"
		);
}

