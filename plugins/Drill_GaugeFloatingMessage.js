//=============================================================================
// Drill_GaugeFloatingMessage.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        地图UI - 临时漂浮消息
 * @author Drill_up
 * 
 * @Drill_LE_param "漂浮消息样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFM_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeFloatingMessage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以自定义设置浮出提示的漂浮消息。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       数学模型-弹道核心★★v2.1及以上★★
 *   - Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心
 *     如果文本超出了窗口最大宽度，则需要窗口字符核心来控制自动换行。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图的各个层级。
 * 2.更多详细内容，去看看文档 "13.UI > 大家族-漂浮文字.docx"。
 * 细节：
 *   (1.漂浮消息本质上是一个窗口，可以显示窗口外框或图片背景。
 *   (2.你可以将漂浮消息放置在地图层级的 图片层、最顶层 中。
 *   (3.漂浮消息的移动弹道由程序写死，并不能灵活改变。
 * 设计：
 *   (1.通过临时漂浮消息插件，可以实现事件的并行对话。
 *      而且还能描述一些NPC行为或者"[发条的响声]"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 资源路径：img/Map__ui （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有system文件夹。
 * 先确保项目img文件夹下是否有Map__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 漂浮消息样式-1 资源-自定义窗口皮肤（system文件夹）
 * 漂浮消息样式-1 资源-自定义背景图片（Map__ui文件夹）
 * 漂浮消息样式-2 资源-自定义窗口皮肤（system文件夹）
 * 漂浮消息样式-2 资源-自定义背景图片（Map__ui文件夹）
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令来添加消息：
 * 
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 文本[1]
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 文本[1] : 持续时间[60]
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 文本[1] : 持续时间变量[21]
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 字符串[21]
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 字符串[21] : 持续时间[60]
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 字符串[21] : 持续时间变量[21]
 * 
 * 1."字符串"对应 字符串核心 中指定编号的自定义文本，
 *   插件支持字符串的多行情况。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限时间
 * 你可以将上面插件指令的持续时间中，填"无限"：
 * 
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 文本[1] : 持续时间[无限]
 * 插件指令：>地图临时漂浮消息 : 添加消息 : 字符串[21] : 持续时间[无限]
 * 
 * 1.持续无限时间的漂浮消息，只在被新的消息挤出去时才会销毁。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令对插件进行开关控制：
 * 
 * 插件指令：>地图临时漂浮消息 : 启用
 * 插件指令：>地图临时漂浮消息 : 关闭
 * 插件指令：>地图临时漂浮消息 : 立刻清除全部消息
 * 插件指令：>地图临时漂浮消息 : 修改样式 : 样式[1]
 * 插件指令：>地图临时漂浮消息 : 恢复默认样式
 * 
 * 1."关闭"之后，只是不会继续出现新的漂浮消息漂浮文字。
 *   你需要执行"立刻清除全部消息"来清空所有漂浮文字。
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
 * 测试方法：   在UI管理层捡起大量物品，测试漂浮消息消耗。
 * 测试结果1：  200个事件的地图中，平均消耗为：【31.34ms】
 *              100个事件的地图中，平均消耗为：【12.50ms】
 *              50个事件的地图中，平均消耗为：【5.80ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.临时漂浮消息创建的窗口并不多，所以消耗比一般漂浮文字要少的多。
 *   由于一次性需要显示大量文本，绘制文本的这部分消耗分摊给了
 *   窗口字符核心。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了无限时间的插件指令。
 * [v1.2]
 * 修复了使用自定义窗口皮肤时文字变黑的bug。
 *
 *
 *
 * @param 初始是否开启
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 *
 * @param 默认样式
 * @type number
 * @min 1
 * @desc 简单指令若未配置样式时，则使用默认样式。默认样式对应配置样式的编号。
 * @default 1
 * 
 * 
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 漂浮消息样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==标准皮肤样式==","---常规---":"","总持续时长":"600","移动时间":"60","偏移-漂浮消息起点 X":"120","偏移-漂浮消息起点 Y":"0","漂浮消息间距":"2","推进方向":"向上","最大推进数量":"8","---漂浮消息---":"","获得时数字的颜色":"24","失去时数字的颜色":"18","获得物品时是否显示":"true","失去物品时是否显示":"true","物品表示方式":"图标+文本","获得武器时是否显示":"true","失去武器时是否显示":"true","武器表示方式":"图标+文本","获得护甲时是否显示":"true","失去护甲时是否显示":"true","护甲表示方式":"图标+文本","获得金钱时是否显示":"true","失去金钱时是否显示":"true","金钱表示方式":"图标+文本","---层级---":"","UI基准":"相对于镜头","地图层级":"图片层","地图图片层级":"80","---窗口皮肤---":"","布局模式":"默认窗口皮肤","布局透明度":"255","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"(需配置)临时漂浮文字-自定义背景图片","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","---窗口属性---":"","窗口中心锚点":"右下角","窗口是否自适应行间距":"true","窗口固定行间距":"24","窗口内边距":"10","窗口字体大小":"20","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 漂浮消息样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 漂浮消息样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillGFMStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGFMStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的漂浮消息样式==
 * 
 * 
 * @param ---常规---
 * @default 
 * 
 * @param 总持续时长
 * @parent ---常规---
 * @type number
 * @min 10
 * @desc 漂浮消息创建后，持续的总时长。单位帧。(1秒60帧)
 * @default 600
 * 
 * @param 平移-漂浮消息队列 X
 * @parent ---常规---
 * @desc 漂浮消息的基准位置。单位像素，0表示贴在最左边。
 * @default 408
 * 
 * @param 平移-漂浮消息队列 Y
 * @parent ---常规---
 * @desc 漂浮消息的基准位置。单位像素，0表示贴在最上面。
 * @default 440
 * 
 * @param 移动时间
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc 漂浮消息移动的时间。单位帧。(1秒60帧)
 * @default 60
 * 
 * @param 移动方式
 * @parent ---常规---
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 增减速移动
 * @value 增减速移动
 * @desc 漂浮消息移动的方式。
 * @default 匀速移动
 * 
 * @param 偏移-漂浮消息起点 X
 * @parent ---常规---
 * @desc 此处填 相对坐标。漂浮消息创建时，会从起点位置移动到原位置。
 * @default 120
 * 
 * @param 偏移-漂浮消息起点 Y
 * @parent ---常规---
 * @desc 此处填 相对坐标。漂浮消息创建时，会从起点位置移动到原位置。
 * @default 0
 * 
 * @param 漂浮消息间距
 * @parent ---常规---
 * @desc 同时获得多个物品时，漂浮消息之间的间距。单位像素，可为负数。
 * @default 2
 *
 * @param 推进方向
 * @parent ---常规---
 * @type select
 * @option 向上
 * @value 向上
 * @option 向下
 * @value 向下
 * @option 向左
 * @value 向左
 * @option 向右
 * @value 向右
 * @desc 漂浮消息推进的方向。
 * @default 向上
 * 
 * @param 最大推进数量
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc 在总持续时长结束前，队列能同时显示的漂浮消息的最大数量。
 * @default 8
 * 
 * 
 * @param ---层级---
 * @default 
 *
 * @param UI基准
 * @parent ---层级---
 * @type select
 * @option 相对于地图
 * @value 相对于地图
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的漂浮文字，会与镜头位置保持一致。相对于地图的漂浮文字，会与地图坐标保持一致。
 * @default 相对于地图
 *
 * @param 地图层级
 * @parent ---层级---
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 窗口所在的地图层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 地图图片层级
 * @parent ---层级---
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层级时，先后排序的位置，0表示最后面。
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
 * @default (需配置)临时漂浮文字-自定义背景图片
 * @require 1
 * @dir img/Map__ui/
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
 * @param 窗口最大宽度
 * @parent ---窗口属性---
 * @type number
 * @min 10
 * @desc 文本的宽度小于最大宽度，则正常播放文本。如果大于最大宽度，则自动换行。
 * @default 700
 *
 * @param 是否固定为最大宽度
 * @parent ---窗口属性---
 * @type boolean
 * @on 固定为宽度
 * @off 自适应宽度
 * @desc true - 固定为宽度，false - 自适应宽度
 * @default false
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
 * @default 正中心
 *
 * @param 窗口是否自适应行间距
 * @parent ---窗口属性---
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
 * @default 20
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GFM (Gauge_Floating_Treasure_Hud)
//		临时全局变量	DrillUp.g_GFM_xxx
//		临时局部变量	this._drill_GFM_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	UI管理层测试
//		★性能测试消耗	58.8ms（Drill_GFM_Window.initialize）12.5ms（Drill_GFM_Window.update）5.8ms（drill_GFM_updateWindowPosition）
//		★最坏情况		暂无
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
//			->☆预加载
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			->☆存储数据
//			
//			->☆文本容器
//				->塞入新文本（ drill_GFM_pushNewText( text ) ）
//			->☆排队控制
//			->文本分配器【Drill_GFM_Allocator】
//				->A主体
//				->B注册
//				->C位置分配
//					->窗口对象容器
//			
//			->☆贴图控制
//			->地图临时 漂浮文字窗口【Drill_GFM_Window】
//				->A主体
//				->B窗口弹道
//					->记录当前弹道位置
//					->生命周期结束前，降下透明度
//				->C窗口皮肤
//				->D窗口内容
//					->超出最大宽度自动换行
//			
//			
//		★家谱：
//			大家族-漂浮文字
//			
//		★脚本文档：
//			13.UI > 大家族-漂浮文字（脚本）.docx
//		
//		★插件私有类：
//			* 地图临时 漂浮文字窗口【Drill_GFM_Window】
//			
//		★必要注意事项：
//			1.所有子插件功能介绍去看看："13.UI > 大家族-漂浮文字（脚本）.docx"。
//			2.插件含分配器，需要排队，超时则销毁。
//			3.注册成功后进入窗口对象容器，每次会重新分配位置和弹道。
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
	DrillUp.g_GFM_PluginTip_curName = "Drill_GaugeFloatingMessage.js 地图UI-临时漂浮消息";
	DrillUp.g_GFM_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_GFM_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_GFM_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_GFM_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_GFM_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_GFM_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_GFM_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_GFM_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 缺少支持的插件
	//==============================
	DrillUp.drill_GFM_getPluginTip_NoSupportPlugin = function(){
		return "【" + DrillUp.g_GFM_PluginTip_curName + "】\n缺少 字符串核心 插件，插件指令执行失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeFloatingMessage = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeFloatingMessage');
	
	
	//==============================
	// * 静态数据 - 漂浮消息样式
	//				（~struct~DrillGFMStyle）
	//==============================
	DrillUp.drill_GFM_initContext = function( dataFrom ) {
		var data = {};
	
		// > 常规
		data['sustain'] = Number( dataFrom["总持续时长"] || 600);
		data['regist_x'] = Number( dataFrom["平移-漂浮消息队列 X"] || 408);
		data['regist_y'] = Number( dataFrom["平移-漂浮消息队列 Y"] || 440);
		data['regist_moveTime'] = Number( dataFrom["移动时间"] || 60);
		data['regist_moveType'] = String( dataFrom["移动方式"] || "匀速移动");
		data['regist_startX'] = Number( dataFrom["偏移-漂浮消息起点 X"] || 120);
		data['regist_startY'] = Number( dataFrom["偏移-漂浮消息起点 Y"] || 0);
		data['regist_space'] = Number( dataFrom["漂浮消息间距"] || 2);
		data['regist_pushDir'] = String( dataFrom["推进方向"] || "向上");
		data['regist_pushCount'] = Number( dataFrom["最大推进数量"] || 8);
		
		// > 层级
		data['window_benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['window_map_layer'] = String( dataFrom["地图层级"] || "");
		data['window_map_zIndex'] = Number( dataFrom["地图图片层级"] || 10);
		
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
		data['window_maxWidth'] = Number( dataFrom["窗口最大宽度"] || 700);
		data['window_isFixWidth'] = String(dataFrom["是否固定为最大宽度"] || "false") === "true";	
		data['window_anchor'] = String( dataFrom["窗口中心锚点"] || "左上角" );
		data['window_autoLineheight'] = String(dataFrom["窗口是否自适应行间距"] || "true") === "true";	
		data['window_lineheight'] = Number(dataFrom["窗口固定行间距"] || 28);
		data['window_padding'] = Number( dataFrom["窗口内边距"] || 18);
		data['window_fontsize'] = Number( dataFrom["窗口字体大小"] || 20);
		data['window_ex_width'] = Number( dataFrom["窗口附加宽度"] || 0);
		data['window_ex_height'] = Number( dataFrom["窗口附加高度"] || 0);
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_GFM_enabled = String(DrillUp.parameters["初始是否开启"] || "true") === "true";
	DrillUp.g_GFM_defaultStyleId = Number(DrillUp.parameters["默认样式"] || 1); 
	
	
	/*-----------------漂浮消息样式集合------------------*/
	DrillUp.g_GFM_style_length = 20;
	DrillUp.g_GFM_style = [];
	for( var i = 0; i < DrillUp.g_GFM_style_length; i++ ){
		if( DrillUp.parameters["漂浮消息样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["漂浮消息样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["漂浮消息样式-" + String(i+1) ]);
			DrillUp.g_GFM_style[i] = DrillUp.drill_GFM_initContext( temp );
		}else{
			DrillUp.g_GFM_style[i] = DrillUp.drill_GFM_initContext( {} );
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
var _drill_GFM_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFM_pluginCommand.call(this, command, args);
	if( command === ">地图临时漂浮消息" ){
		
		/*-----------------开关------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
				$gameSystem._drill_GFM_enabled = true;
			}
			if( type == "关闭" || type == "禁用" ){
				$gameSystem._drill_GFM_enabled = false;
			}
			if( type == "立刻清除全部消息" || type == "立刻清除全部信息" ){
				$gameTemp._drill_GFM_clearAllCurrentWindow = true;
			}
		}
		
		/*-----------------修改样式------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复默认样式" ){
				$gameSystem._drill_GFM_styleId = DrillUp.g_GFM_defaultStyleId;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_GFM_styleId = Number(temp1);
			}
		}
		
		/*-----------------添加消息------------------*/
		if( args.length >= 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "添加消息" ){
				
				var sustain_time = args[5];
				if( sustain_time != undefined ){
					if( sustain_time.indexOf("持续时间[") != -1 ){
						sustain_time = sustain_time.replace("持续时间[","");
						sustain_time = sustain_time.replace("]","");
						sustain_time = sustain_time.replace("无限","518400000");
						sustain_time = Number(sustain_time); 
					}
					if( sustain_time.indexOf("持续时间变量[") != -1 ){
						sustain_time = sustain_time.replace("持续时间变量[","");
						sustain_time = sustain_time.replace("]","");
						sustain_time = $gameVariables.value(Number(sustain_time));
					}
				}
				
				if( temp1.indexOf("字符串[") != -1 ){
					if( Imported.Drill_CoreOfString ){
						temp1 = temp1.replace("字符串[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameStrings.value( Number(temp1) );
						$gameTemp.drill_GFM_pushNewText( temp1, sustain_time );
					}else{
						alert( DrillUp.drill_GFM_getPluginTip_NoSupportPlugin() );
					}
				}else{
					if( temp1.indexOf("文本[") != -1 ){
						temp1 = temp1.replace("文本[","");
						temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					}
					$gameTemp.drill_GFM_pushNewText( temp1, sustain_time );
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
var _drill_GFM_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_GFM_preload_initialize.call(this);
	this.drill_GFM_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_GFM_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_GFM_preloadInit = function() {
	this._drill_GFM_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_GFM_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_GFM_style.length; i++ ){
		var temp_data = DrillUp.g_GFM_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > 『窗口皮肤的预加载』
		if( temp_data['window_type'] == "自定义窗口皮肤" ){
			this._drill_GFM_preloadTank.push( 
				ImageManager.reserveBitmap( "img/system/", temp_data['window_sys_src'], 0, true, this._drill_GFM_cacheId ) 
			);
		}
		if( temp_data['window_type'] == "自定义背景图片" ){
			this._drill_GFM_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Map__ui/", temp_data['window_pic_src'], 0, true, this._drill_GFM_cacheId ) 
			);
		}
	}
}



//#############################################################################
// ** 【标准模块】地图层级 ☆地图层级
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
Scene_Map.prototype.drill_GFM_layerAddSprite = function( sprite, layer_index ){
	this.drill_GFM_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_GFM_layerRemoveSprite = function( sprite ){
	this.drill_GFM_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_GFM_sortByZIndex = function () {
    this.drill_GFM_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_GFM_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_GFM_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_GFM_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GFM_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_GFM_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GFM_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_GFM_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GFM_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_GFM_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFM_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_GFM_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFM_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
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
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_GFM_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_GFM_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_GFM_layerAddSprite_Private = function( sprite, layer_index ){
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
// * 地图层级 - 层级与镜头的位移（私有）
//==============================
Scene_Map.prototype.drill_GFM_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 层级与镜头的位移
	if( option['window_benchmark'] == "相对于地图" ){
		
		// > 相对地图的偏移
		var pos_x = $gameMap.adjustX(0);
		var pos_y = $gameMap.adjustY(0);
		xx += $gameMap.deltaX( pos_x, option['orgPos_x'] ) * $gameMap.tileWidth();
		yy += $gameMap.deltaY( pos_y, option['orgPos_y'] ) * $gameMap.tileHeight();
		
		
		// > 地图参照 -> 地图参照
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
		
		// > 地图参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不需要变换）
			return {'x':xx, 'y':yy };
		}
	
	}else{
		
		// > 镜头参照 -> 地图参照
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			//（不需要变换）
			return {'x':xx, 'y':yy };
		}
		
		// > 镜头参照 -> 镜头参照
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
DrillUp.g_GFM_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GFM_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GFM_sys_initialize.call(this);
	this.drill_GFM_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GFM_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GFM_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_GFM_saveEnabled == true ){	
		$gameSystem.drill_GFM_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_GFM_initSysData();
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
Game_System.prototype.drill_GFM_initSysData = function() {
	this.drill_GFM_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_GFM_checkSysData = function() {
	this.drill_GFM_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_GFM_initSysData_Private = function() {
	
	this._drill_GFM_enabled = DrillUp.g_GFM_enabled;
	this._drill_GFM_styleId = DrillUp.g_GFM_defaultStyleId;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_GFM_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_GFM_styleId == undefined ){
		this.drill_GFM_initSysData();
	}
	
};



//=============================================================================
// ** ☆文本容器
//			
//			说明：	> 此模块专门管理 文本显示 的时机并发射漂浮文字。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 文本容器 - 初始化
//==============================
var _drill_GFM_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFM_temp_initialize2.call(this);
	this._drill_GFM_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 文本容器 - 销毁
//==============================
var _drill_GFM_temp_terminate2 = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_GFM_temp_terminate2.call(this);
	$gameTemp._drill_GFM_commandSeq = [];		//漂浮文字容器
};
//==============================
// * 文本容器 - 塞入新文本
//==============================
Game_Temp.prototype.drill_GFM_pushNewText = function( text, sustain_time ){
	
	// > 开关
	if( $gameSystem._drill_GFM_enabled != true ){ return; }
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_GFM_style[ $gameSystem._drill_GFM_styleId -1 ] ));
	data['b_data'] = {};
	
	// > 内容文本初始化
	data['s_data']['context'] = text;
	if( sustain_time != undefined ){
		data['s_data']['sustain'] = sustain_time;
	}
	
	this._drill_GFM_commandSeq.push( data );
};


//=============================================================================
// ** ☆排队控制
//			
//			说明：	> 此模块专门管理 漂浮文字窗口 的排队。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 排队控制 - 贴图容器 初始化
//==============================
var _drill_GFM_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFM_map_initialize.call(this);
	this._drill_GFM_windowQueueUpTank = [];							//排队容器
	var data = {
		//（暂无）
	}
	this._drill_GFM_windowAllocator = new Drill_GFM_Allocator( data );//分配器
};
//==============================
// * 排队控制 - 帧刷新
//==============================
var _drill_GFM_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFM_map_update.call(this);
	if( this.isActive() ){
		this.drill_GFM_updateWindowRegist();						//帧刷新 - 等候注册
		this.drill_GFM_updateTimeOut();								//帧刷新 - 排队超时（删除贴图）
		this._drill_GFM_windowAllocator.drill_allocator_update();	//帧刷新 - 分配器
	}
};
//==============================
// * 排队控制 - 帧刷新 等候注册
//==============================
Scene_Map.prototype.drill_GFM_updateWindowRegist = function() {
	for( var i = this._drill_GFM_windowQueueUpTank.length-1; i >= 0; i-- ){	//（倒序遍历）
		var temp_window = this._drill_GFM_windowQueueUpTank[i];
		var regist_data = this._drill_GFM_windowAllocator.drill_allocator_doRegist( temp_window );
		
		// > 注册失败，等待
		if( regist_data == null ){ return; }
		
		// > 注册成功
		//	（不操作，注册成功后，被分配器 帧刷新控制 移动与销毁）
		
		// > 从容器中去除
		this._drill_GFM_windowQueueUpTank.splice( i, 1 );
	}
}
//==============================
// * 排队控制 - 帧刷新 贴图删除（排队超时的）
//==============================
Scene_Map.prototype.drill_GFM_updateTimeOut = function() {
	for( var i = this._drill_GFM_windowQueueUpTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFM_windowQueueUpTank[i];
		if( temp_window._drill_curTime > 60 ){	//（最多排队等待60帧）
			
			// > 手动销毁
			temp_window._drill_destroyed = true;
			
			// > 从容器中去除
			this._drill_GFM_windowQueueUpTank.splice( i, 1 );
		}
	}
}



//=============================================================================
// ** 漂浮消息分配器【Drill_GFM_Allocator】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个分配器。
// **		子功能：	->分配器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B注册
// **						->执行注册
// **					->C位置分配
// **		
// **		说明：	> 由于该插件为临时的对象，且该类具有窗口对象容器，因此【不可存储】也不考虑存储。
// **				> 注意，该类不管 注册排队的队列，你需要自己建立容器让注册对象参与排队。
//=============================================================================
//==============================
// * 分配器 - 定义
//==============================
function Drill_GFM_Allocator(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 分配器 - 初始化
//==============================
Drill_GFM_Allocator.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_allocatorSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_allocator_initData();										//初始化数据
    this.drill_allocator_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_allocator_resetData( data );
}
//##############################
// * 分配器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_allocator_updateAttr();					//帧刷新 - A主体
	this.drill_allocator_updateRegist();				//帧刷新 - B注册
														//帧刷新 - C位置分配（无）
}
//##############################
// * 分配器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_resetData = function( data ){
	this.drill_allocator_resetData_Private( data );
};
//##############################
// * 分配器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 分配器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 分配器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * B注册 - 执行注册【标准函数】
//
//			参数：	> obj 对象
//			返回：	> 结果参数对象 （注册成功的返回数据）
//			
//			说明：	> 注册成功则返回 结果参数对象， 注册失败返回 null。
//					> 可放在帧刷新函数中实时调用。
//					  由于此功能基于 时间差阻塞，注册失败的对象，需要再次调用注册，直到注册成功。
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_doRegist = function( obj ){
	return this.drill_allocator_doRegist_Private( obj );
};

//##############################
// * 分配器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_GFM_Allocator.prototype.drill_allocator_initData = function(){
	var data = this._drill_data;
	
	// > 分配器
	if( data['pause'] == undefined ){ data['pause'] = false };				//分配器 - 暂停情况
	
	// > A主体
	//	（无）
	
	// > B注册
	//	（无）
	
	// > C位置分配
	//	（无，直接通过 样式 进行变化）
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_initChild = function(){
	this.drill_allocator_initAttr();			//初始化子功能 - A主体
	this.drill_allocator_initRegist();			//初始化子功能 - B注册
	this.drill_allocator_initTarget();			//初始化子功能 - C位置分配
}
//==============================
// * 分配器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_allocatorSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_allocator_initData();										//初始化数据
    this.drill_allocator_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B注册 - 初始化子功能
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_initRegist = function() {
	var data = this._drill_data;
	//（无）
}
//==============================
// * B注册 - 帧刷新
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_updateRegist = function() {
	var data = this._drill_data;
	//（无）
}
//==============================
// * B注册 - 执行注册（私有）
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_doRegist_Private = function( obj ){
	var data = this._drill_data;
	
	// > 暂停时，关闭注册
	if( data['pause'] == true ){ return null; }
	
	// > 被销毁，关闭注册
	if( this._drill_needDestroy == true ){ return null; }
	
	// > C位置分配 - 加入控制队列
	this._drill_windowTank.unshift( obj );
	var g_data = DrillUp.g_GFM_style[ $gameSystem._drill_GFM_styleId -1 ];
	obj._drill_COBa_curPosX = g_data['regist_x'] + g_data['regist_startX'];		//（设置 当前弹道位置 为起点位置）
	obj._drill_COBa_curPosY = g_data['regist_y'] + g_data['regist_startY'];
	
	// > C位置分配 - 刷新所有位置
	this.drill_allocator_targetRefresh();
	
	return true;	//（注册成功后不操作，因此只返回简单注册信息）
}


//==============================
// * C位置分配 - 初始化子功能
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_initTarget = function() {
	var data = this._drill_data;
	this._drill_windowTank = [];		//窗口对象容器
}
//==============================
// * C位置分配 - 刷新所有位置
//
//			说明：	> 此函数不能放帧刷新中执行。
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_targetRefresh = function(){
	var g_data = DrillUp.g_GFM_style[ $gameSystem._drill_GFM_styleId -1 ];
	
	// > 依次赋值
	for(var i = this._drill_windowTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_windowTank[i];
		
		// > 销毁的窗口，直接退掉
		if( temp_window.drill_isDead() ){
			this._drill_windowTank.splice( i, 1 );
			continue;
		}
		
		// > 越界的窗口 执行销毁流程
		if( i >= g_data['regist_pushCount'] ){
			
			// > 计算 - 移动弹道
			var b_data = this.drill_allocator_targetMovement( i, temp_window, g_data['regist_moveTime'] );
			
			// > 计算 - 透明度弹道
			var o_data = this.drill_allocator_targetOpacity( temp_window.contentsOpacity, 0, g_data['regist_moveTime'] );
			
			// > 修改生命周期（弹道必须要从0开始计数）
			temp_window._drill_lifeTime = g_data['regist_moveTime'];
			temp_window._drill_curTime = 0;
		
			// > 刷新弹道
			temp_window.drill_refreshBallistics( b_data, o_data );
			
			this._drill_windowTank.splice( i, 1 );
			continue;
		}
		
		
		// > 计算 - 移动弹道
		var b_data = this.drill_allocator_targetMovement( i, temp_window, g_data['regist_moveTime'] );
		
		// > 计算 - 透明度弹道
		var o_data = this.drill_allocator_targetOpacity( temp_window.contentsOpacity, 255, g_data['regist_moveTime'] );
	
		// > 修改生命周期（弹道必须要从0开始计数）
		temp_window._drill_lifeTime -= temp_window._drill_curTime;
		temp_window._drill_curTime = 0;
		
		// > 刷新弹道
		temp_window.drill_refreshBallistics( b_data, o_data );
	}
}
//==============================
// * C位置分配 - 获取 - 移动弹道数据
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_targetMovement = function( i, temp_window, sustain_time ){
	var g_data = DrillUp.g_GFM_style[ $gameSystem._drill_GFM_styleId -1 ];

	// > 计算 - 目标位置
	var tarX = g_data['regist_x'];
	var tarY = g_data['regist_y'];
	
	if( g_data['regist_pushDir'] == "向上" ){	//累积高度
		tarY -= this.drill_allocator_getAccumulateHeight( i, g_data['regist_space'] );
	}
	if( g_data['regist_pushDir'] == "向下" ){	//累积高度
		tarY += this.drill_allocator_getAccumulateHeight( i, g_data['regist_space'] );
	}
	if( g_data['regist_pushDir'] == "向左" ){	//累积宽度
		tarX -= this.drill_allocator_getAccumulateWidth( i, g_data['regist_space'] );
	}
	if( g_data['regist_pushDir'] == "向右" ){	//累积宽度
		tarX += this.drill_allocator_getAccumulateWidth( i, g_data['regist_space'] );
	}
	
	
	// > 计算 - 移动弹道
	var data = temp_window._drill_data;
	var b_data = temp_window._drill_data['b_data'];
	b_data['orgX'] = temp_window._drill_COBa_curPosX;	//（从窗口当前的位置开始算起）
	b_data['orgY'] = temp_window._drill_COBa_curPosY;
	
	b_data['movementNum'] = 1;
	b_data['movementTime'] = sustain_time;
	b_data['movementDelay'] = 0;
	b_data['movementEndDelay'] = 0;
	
	b_data['movementMode'] = "两点式";
	b_data['twoPointType'] = g_data['regist_moveType'];
	b_data['twoPointDifferenceX'] = tarX - b_data['orgX'];				//两点式 - 距离差值x（终点减起点）
	b_data['twoPointDifferenceY'] = tarY - b_data['orgY'];	            //两点式 - 距离差值y（终点减起点）
	
	return b_data;
}
//==============================
// * C位置分配 - 获取 - 累积宽度
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_getAccumulateWidth = function( i, space ){
	var result = 0;
	for(var j = 0; j < this._drill_windowTank.length; j++ ){
		var temp_window = this._drill_windowTank[j];
		if( j >= i ){
			result += temp_window.width * temp_window._drill_anchor_x;
			break;
		}
		result += temp_window.width;
		result += space;
	}
	return result;
}
//==============================
// * C位置分配 - 获取 - 累积高度
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_getAccumulateHeight = function( i, space ){
	var result = 0;
	for(var j = 0; j < this._drill_windowTank.length; j++ ){
		var temp_window = this._drill_windowTank[j];
		if( j >= i ){
			result += temp_window.height * temp_window._drill_anchor_y;
			break;
		}
		result += temp_window.height;
		result += space;
	}
	return result;
}
//==============================
// * C位置分配 - 获取 - 透明度弹道数据
//
//			参数：	> cur_opacity  当前透明度
//					> tar_opacity  目标透明度
//					> sustain_time 持续时间
//			说明：	> 线性变化透明度的弹道。
//==============================
Drill_GFM_Allocator.prototype.drill_allocator_targetOpacity = function( cur_opacity, tar_opacity, sustain_time ){
	var o_data = {};
	
	o_data['orgOpacity'] = cur_opacity;
	
	o_data['opacityNum'] = 1;
	o_data['opacityTime'] = sustain_time;
	
	o_data['opacityMode'] = "目标值模式";
	o_data['targetType'] = "匀速变化";
	o_data['targetDifference'] = tar_opacity - o_data['orgOpacity'];
	
	return o_data;
}



//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门管理 漂浮文字窗口 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 贴图容器 初始化
//==============================
var _drill_GFM_map_initialize2 = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFM_map_initialize2.call(this);
	this._drill_GFM_windowTank = [];								//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
var _drill_GFM_map_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFM_map_update2.call(this);
	if( this.isActive() ){
		this.drill_GFM_updateWindowAddChild();			//帧刷新 - 指令建立贴图
		this.drill_GFM_updateWindowDeleteCommand();	//帧刷新 - 清除指令
		this.drill_GFM_updateWindowDelete();			//帧刷新 - 贴图删除
		this.drill_GFM_updateWindowPosition();			//帧刷新 - 位置
	}
};
//==============================
// * 贴图控制 - 帧刷新 指令建立贴图
//==============================
Scene_Map.prototype.drill_GFM_updateWindowAddChild = function() {
	for( var i = $gameTemp._drill_GFM_commandSeq.length-1; i >= 0; i-- ){
		var temp_data = $gameTemp._drill_GFM_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		// > 层级初始化
		var temp_window = new Drill_GFM_Window( temp_data );
		temp_window.zIndex = temp_data['s_data']['window_map_zIndex'];
		this._drill_GFM_windowTank.push( temp_window );
		this._drill_GFM_windowQueueUpTank.unshift( temp_window );	//（头部塞入 延迟发射 的队列）
		
		// > 层级初始化
		this.drill_GFM_layerAddSprite( temp_window, temp_data['s_data']['window_map_layer'] );
		
		// > 层级排序
		this.drill_GFM_sortByZIndex();
		
		// > 出栈
		$gameTemp._drill_GFM_commandSeq.splice( i, 1 );
	}
}
//==============================
// * 贴图控制 - 帧刷新 清除指令
//==============================
Scene_Map.prototype.drill_GFM_updateWindowDeleteCommand = function() {
	if( $gameTemp._drill_GFM_clearAllCurrentWindow != true ){ return; }
	$gameTemp._drill_GFM_clearAllCurrentWindow = false;
	
	for( var i = 0; i < this._drill_GFM_windowTank.length; i++ ){
		var temp_window = this._drill_GFM_windowTank[i];
		
		// > 销毁标记
		temp_window._drill_destroyed = true;
	}
}
//==============================
// * 贴图控制 - 帧刷新 贴图删除
//==============================
Scene_Map.prototype.drill_GFM_updateWindowDelete = function() {
	for( var i = this._drill_GFM_windowTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFM_windowTank[i];
		if( temp_window.drill_isDead() ){
			
			// > 从层中去除
			this.drill_GFM_layerRemoveSprite( temp_window );
			
			// > 从容器中去除
			this._drill_GFM_windowTank.splice( i, 1 );
		}
	}
}
//==============================
// * 贴图控制 - 帧刷新 位置
//==============================
Scene_Map.prototype.drill_GFM_updateWindowPosition = function() {
	for( var i = 0; i < this._drill_GFM_windowTank.length; i++ ){
		var temp_window = this._drill_GFM_windowTank[i];
		var s_data = temp_window._drill_data['s_data'];
		var b_data = temp_window._drill_data['b_data'];
		if( temp_window['_drill_COBa_x'] == undefined ){ continue; }
		if( temp_window['_drill_COBa_x'].length == 0 ){ continue; }
			
		// > 位移
		var xx = 0;
		var yy = 0;
		
		// > 窗口的锚点
		xx -= temp_window._drill_width * temp_window._drill_anchor_x;
		yy -= temp_window._drill_height * temp_window._drill_anchor_y;
		
		// > 弹道位移
		var time = temp_window._drill_curTime;
		if( time < 0 ){ time = 0; }
		if( time > temp_window['_drill_COBa_x'].length-1 ){
			time = temp_window['_drill_COBa_x'].length-1;
		}
		temp_window._drill_COBa_curPosX = temp_window['_drill_COBa_x'][ time ];		//（记录当前弹道位置）
		temp_window._drill_COBa_curPosY = temp_window['_drill_COBa_y'][ time ];
		xx += temp_window._drill_COBa_curPosX;
		yy += temp_window._drill_COBa_curPosY;
		
		
		// > 层级与镜头的位移
		var option = {
			"window_benchmark": s_data['window_benchmark'],
			"orgPos_x": temp_window._drill_orgPos_x,
			"orgPos_y": temp_window._drill_orgPos_y,
		};
		var pos = this.drill_GFM_layerCameraMoving(xx, yy, s_data['window_map_layer'], option );
		xx = pos['x'];
		yy = pos['y'];
		
	
		// > 镜头缩放与位移
		if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】UI缩放与位移
			var layer = s_data['window_map_layer'];
			if( layer == "下层" || layer == "中层" || layer == "上层" ){
				temp_window.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
				temp_window.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
				//（暂不考虑缩放位移偏转）
			}
			if( layer == "图片层" || layer == "最顶层" ){
				if( s_data['window_benchmark'] == "相对于地图" ){
					var tar_pos = $gameSystem._drill_LCa_controller.drill_LCa_getCameraPos_OuterSprite( xx, yy );
					xx = tar_pos.x;
					yy = tar_pos.y;
					//xx = $gameSystem.drill_LCa_mapToCameraX( xx );
					//yy = $gameSystem.drill_LCa_mapToCameraY( yy );
				}
			}
		}
		
		temp_window.x = xx;
		temp_window.y = yy;
	}
}


//=============================================================================
// ** 地图临时 漂浮文字窗口【Drill_GFM_Window】
// **		
// **		索引：	无
// **		来源：	继承于Window_Base
// **		实例：	暂无
// **		应用：	暂无
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个面板，能随时改变内容和高宽，用于描述事件内置信息。
// **		子功能：	->窗口
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **					->A主体
// **						->中心锚点
// **						->UI基准
// **					->B窗口弹道
// **						->记录当前弹道位置
// **						->生命周期结束前，降下透明度
// **					->C窗口皮肤
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **					->D窗口内容
// **						->窗口字符
// **						->超出最大宽度自动换行
// **			
// **		说明：	> 该窗口在游戏中实时创建，创建后将被销毁。
// **				> 窗口的结构从 Drill_MPFP_Window 借鉴来，但是除了贴图内容，其他部分变化非常大。
//=============================================================================
//==============================
// * 漂浮文字窗口 - 定义
//==============================
function Drill_GFM_Window() {
    this.initialize.apply(this, arguments);
};
Drill_GFM_Window.prototype = Object.create(Window_Base.prototype);
Drill_GFM_Window.prototype.constructor = Drill_GFM_Window;
//==============================
// * 漂浮文字窗口 - 初始化
//==============================
Drill_GFM_Window.prototype.initialize = function( data ){
	this._drill_data = data;			//（直接传指针）
	
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_GFM_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateAttr();			//帧刷新 - A主体
	this.drill_updateBallistics();		//帧刷新 - B窗口弹道
	this.drill_updateSkin();			//帧刷新 - C窗口皮肤
										//帧刷新 - D窗口内容（无）
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_GFM_Window.prototype.lineHeight = function(){ return this._drill_data['s_data']['window_lineheight']; };			//窗口行间距
Drill_GFM_Window.prototype.standardPadding = function(){ return this._drill_data['s_data']['window_padding']; };		//窗口内边距
Drill_GFM_Window.prototype.standardFontSize = function(){ return this._drill_data['s_data']['window_fontsize']; };		//窗口字体大小
//==============================
// * 漂浮文字窗口 - 持续时间
//==============================
Drill_GFM_Window.prototype.drill_isDead = function() {
	if( this._drill_ballisticsInited == false ){ return false; }
	if( this._drill_destroyed == true ){ return true; }
	if( this._drill_curTime > this._drill_lifeTime ){ return true; }
	return false;
};
//==============================
// * 漂浮文字窗口 - 初始化数据
//==============================
Drill_GFM_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 漂浮文字窗口 - 初始化对象
//==============================
Drill_GFM_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();					//初始化对象 - A主体
	this.drill_initBallistics();			//初始化对象 - B窗口弹道
	this.drill_initSkin();					//初始化对象 - C窗口皮肤
	this.drill_initMessage();				//初始化对象 - D窗口内容
}


//==============================
// * A主体 - 初始化对象
//==============================
Drill_GFM_Window.prototype.drill_initAttr = function() {
	var s_data = this._drill_data['s_data'];
	var b_data = this._drill_data['b_data'];
	
	// > 私有属性初始化
	this.x = 0;
	this.y = Graphics.boxHeight*2;
	this.contentsOpacity = 0;			//文本域 透明度
	this.opacity = 0;					//背景容器层 透明度
	
	this._drill_width = 0;				//窗口宽度
	this._drill_height = 0;				//窗口高度
	this._drill_curTime = 0;			//当前生命周期
	this._drill_lifeTime = s_data['sustain'];
	this._drill_destroyed = false;		//销毁标记（手动销毁用）
	
	// > 中心锚点
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( s_data['window_anchor'] == "左上角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 0.0; }
	if( s_data['window_anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( s_data['window_anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( s_data['window_anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	if( s_data['window_anchor'] == "正上方" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.0; }
	if( s_data['window_anchor'] == "正下方" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 1.0; }
	if( s_data['window_anchor'] == "正左方" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 0.5; }
	if( s_data['window_anchor'] == "正右方" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.5; }
	if( s_data['window_anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	
	// > UI基准初始位置
	this._drill_orgPos_x = $gameMap.adjustX(0);
	this._drill_orgPos_y = $gameMap.adjustY(0);
}
//==============================
// * A主体 - 初始化对象
//==============================
Drill_GFM_Window.prototype.drill_updateAttr = function() {
	
	// > 主体 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B窗口弹道 - 初始化对象
//==============================
Drill_GFM_Window.prototype.drill_initBallistics = function() {
	this._drill_ballisticsInited = false;	//弹道初始化标记
	this._drill_COBa_curPosX = 0;			//当前弹道位置
	this._drill_COBa_curPosY = 0;			//
	//（排队控制 进行初始化）
}
//==============================
// * B窗口弹道 - 刷新弹道（开放函数）
//
//			说明：	> 移动弹道为 两点式。
//==============================
Drill_GFM_Window.prototype.drill_refreshBallistics = function( b_data, o_data ){
	this._drill_ballisticsInited = true;
	
	// > 移动弹道
	var org_x = b_data['orgX'];
	var org_y = b_data['orgY'];
	$gameTemp.drill_COBa_setBallisticsMove( b_data );					//移动弹道 - 初始化数据
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, org_x, org_y );	//移动弹道 - 推演赋值
	
	// > 透明度弹道
	var org_opacity = o_data['orgOpacity'];
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );				//透明度弹道 - 初始化数据
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, org_opacity );	//透明度弹道 - 推演赋值
}
//==============================
// * B窗口弹道 - 帧刷新 透明度
//==============================
Drill_GFM_Window.prototype.drill_updateBallistics = function() {
	if( this['_drill_COBa_opacity'] == undefined ){ return; }
	if( this['_drill_COBa_opacity'].length == 0 ){ return; }
	
	// > 根据轨迹进行播放
	var time = this._drill_curTime;
	if( time < 0 ){ time = 0; }
	if( time > this['_drill_COBa_opacity'].length-1 ){
		time = this['_drill_COBa_opacity'].length-1;
	}
	var oo = this['_drill_COBa_opacity'][ time ];
	
	// > 生命周期结束前，降下透明度
	var s_data = this._drill_data['s_data'];
	var out_time = this._drill_curTime + s_data['regist_moveTime'] - this._drill_lifeTime;
	if( out_time > 0 ){
		oo -= 255 / s_data['regist_moveTime'] * out_time;
	}
	
	this.contentsOpacity = oo;			//文本域 透明度
	this.opacity = oo;					//背景容器层 透明度
}


//==============================
// * C窗口皮肤 - 初始化对象
//
//			说明：	> 此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_GFM_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 布局模式
	var s_data = this._drill_data['s_data'];
	this.drill_resetData_Skin( s_data );
}
//==============================
// * C窗口皮肤 - 重设数据
//
//			说明：	> data对象中的参数【可以缺项】。
//==============================
Drill_GFM_Window.prototype.drill_resetData_Skin = function( data ){
	
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
		this._drill_skin_pic_bitmap = ImageManager.loadBitmap( "img/Map__ui/", data['window_pic_src'], 0, true );
		this._drill_skin_pic_x = data['window_pic_x'];
		this._drill_skin_pic_y = data['window_pic_y'];
	}else{
		this._drill_skin_pic_bitmap = ImageManager.loadEmptyBitmap();
	}
	
	if( data['window_type'] == "自定义窗口皮肤" && data['window_sys_src'] != "" ){
		this._drill_skin_sys_bitmap = ImageManager.loadBitmap( "img/system/", data['window_sys_src'], 0, true );
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
		this._drill_skinBackground.opacity = this._drill_skin_opacity;	//背景容器层 - 背景图片 透明度]
		
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
// * C窗口皮肤 - 帧刷新
//==============================
Drill_GFM_Window.prototype.drill_updateSkin = function() {
	
	if( this._drill_skin_type == "自定义背景图片" || this._drill_skin_type == "图片窗口布局" ){
		
		// > 高宽改变锁
		if( this._drill_skinBackground_width  == this._drill_width &&
			this._drill_skinBackground_height == this._drill_height ){
			return;
		}
		this._drill_skinBackground_width = this._drill_width;
		this._drill_skinBackground_height = this._drill_height;
		
		// > 背景图片与中心锚点
		var xx = this._drill_skin_pic_x;
		var yy = this._drill_skin_pic_y;
		xx += this._drill_width * this._drill_anchor_x;
		yy += this._drill_height * this._drill_anchor_y;
		this._drill_skinBackground.x = xx;
		this._drill_skinBackground.y = yy;
		this._drill_skinBackground.anchor.x = this._drill_anchor_x;
		this._drill_skinBackground.anchor.y = this._drill_anchor_y;
	}
	
	if( this._drill_skin_type == "黑底背景" || this._drill_skin_type == "黑底布局" ){
		
		// > 高宽改变锁
		if( this._drill_skinBackground_width  == this._drill_width &&
			this._drill_skinBackground_height == this._drill_height ){
			return;
		}
		this._drill_skinBackground_width = this._drill_width;
		this._drill_skinBackground_height = this._drill_height;
		
		// > 改变时新建黑色画布
		this._drill_skinBackground_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_skinBackground_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");
		this._drill_skinBackground.bitmap = this._drill_skinBackground_BlackBitmap;
	}
}
//==============================
// * C窗口皮肤 - 帧刷新色调
//
//			说明：	setTone可以反复调用赋值，有变化监听的锁。
//==============================
var _drill_GFM_updateTone = Drill_GFM_Window.prototype.updateTone;
Drill_GFM_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_GFM_updateTone.call( this );
}


//==============================
// * D窗口内容 - 初始化对象
//==============================
Drill_GFM_Window.prototype.drill_initMessage = function(){
	var s_data = this._drill_data['s_data'];
	var context = s_data['context'];
	var context_list = context.split("\n");
	
	// > 窗口高宽 - 计算（文本域自适应）
	var options = {};
	options['autoLineheight'] = s_data['window_autoLineheight'];
	options['lineheight'] = s_data['window_lineheight'];
	this.drill_COWA_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	
	// > 未超出宽度，正常播放
	if( ww < s_data['window_maxWidth'] ){
		this.drill_refreshMessage( context_list );
		return;
	}
	
	// > 超出了最大宽度，强制自动换行，再播放
	context = "<WordWrap>" + context;
	context = this.drill_COWC_setWordWrap( context, s_data['window_maxWidth'] );	//（重新分配自动换行）
	context_list = context.split("\n");
	this.drill_refreshMessage( context_list );
}
//==============================
// * D窗口内容 - 刷新内容
//==============================
Drill_GFM_Window.prototype.drill_refreshMessage = function( context_list ){
	var s_data = this._drill_data['s_data'];
	if( context_list.length == 0 ){ return; }
	
	
	// > 窗口高宽 - 计算（文本域自适应）
	var options = {};
	options['autoLineheight'] = s_data['window_autoLineheight'];
	options['lineheight'] = s_data['window_lineheight'];
	this.drill_COWA_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	if( s_data['window_isFixWidth'] == true ){	//（固定宽度情况）
		ww = s_data['window_maxWidth'];
	}
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
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeFloatingMessage = false;
		var pluginTip = DrillUp.drill_GFM_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

